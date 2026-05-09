#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动补充翻译：提取新增英文 → 调用 OpenAI 兼容接口筛选/翻译 → 合并到翻译表。

配置环境变量：
  PAA_TRANSLATE_API_KEY   必填，API key
  PAA_TRANSLATE_BASE_URL  可选，默认 https://api.openai.com/v1
  PAA_TRANSLATE_MODEL     可选，默认 gpt-4o-mini

也兼容 OPENAI_API_KEY / OPENAI_BASE_URL / OPENAI_MODEL。
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

if sys.stdout.encoding and sys.stdout.encoding.lower() in ('gbk', 'gb2312', 'cp936'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def load_json(path, default):
    if not os.path.exists(path):
        return default
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')


def has_chinese(text):
    return any('\u4e00' <= ch <= '\u9fff' for ch in str(text))


def extract_missing():
    game_dir = os.path.dirname(SCRIPT_DIR)
    cache_path = os.path.join(
        game_dir, 'resources', 'app', 'meteor_extracted',
        'app', 'artificial', 'babel', 'cache.json'
    )
    packages_dir = os.path.join(game_dir, 'resources', 'app', 'meteor_extracted', 'packages')

    if not os.path.exists(cache_path):
        raise FileNotFoundError(f'未找到 cache.json，请先运行「安装汉化.bat」或「更新后重新汉化.bat」: {cache_path}')
    if not os.path.isdir(packages_dir):
        raise FileNotFoundError(f'未找到 packages 目录，请先解包游戏: {packages_dir}')

    print('[1/3] 提取新增英文...')
    import extract_strings
    import extract_hardcoded

    extract_strings.extract(cache_path)
    extract_hardcoded.extract(packages_dir)

    cache_missing = load_json(os.path.join(SCRIPT_DIR, 'to_translate.json'), {})
    hardcoded_missing = load_json(os.path.join(SCRIPT_DIR, 'hardcoded_to_translate.json'), {})
    return {
        'cache': cache_missing,
        'hardcoded': hardcoded_missing,
    }


def chunk_entries(data, max_chars):
    entries = []
    for section in ('cache', 'hardcoded'):
        for key, value in data.get(section, {}).items():
            entries.append((section, key, value))

    chunks = []
    current = {'cache': {}, 'hardcoded': {}}
    current_size = 0
    for section, key, value in entries:
        item_size = len(key) + len(str(value)) + 16
        if current_size and current_size + item_size > max_chars:
            chunks.append(current)
            current = {'cache': {}, 'hardcoded': {}}
            current_size = 0
        current[section][key] = value
        current_size += item_size
    if current_size:
        chunks.append(current)
    return chunks


def get_api_config():
    api_key = os.environ.get('PAA_TRANSLATE_API_KEY') or os.environ.get('OPENAI_API_KEY')
    base_url = os.environ.get('PAA_TRANSLATE_BASE_URL') or os.environ.get('OPENAI_BASE_URL') or 'https://api.openai.com/v1'
    model = os.environ.get('PAA_TRANSLATE_MODEL') or os.environ.get('OPENAI_MODEL') or 'gpt-4o-mini'
    return api_key, base_url.rstrip('/'), model


def extract_json_object(text):
    text = text.strip()
    fence = re.search(r'```(?:json)?\s*(.*?)\s*```', text, re.S | re.I)
    if fence:
        text = fence.group(1).strip()
    start = text.find('{')
    end = text.rfind('}')
    if start < 0 or end < start:
        raise ValueError('AI 返回内容中没有找到 JSON 对象')
    return json.loads(text[start:end + 1])


def chat_completion(api_key, base_url, model, messages, timeout, use_response_format=True):
    payload = {
        'model': model,
        'messages': messages,
        'temperature': 0.1,
    }
    if use_response_format:
        payload['response_format'] = {'type': 'json_object'}

    request = urllib.request.Request(
        f'{base_url}/chat/completions',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        body = json.loads(response.read().decode('utf-8'))
    return body['choices'][0]['message']['content']


def translate_chunk(chunk, chunk_index, total_chunks, api_key, base_url, model, timeout):
    system_prompt = (
        '你是一位游戏汉化专家，负责 Pixel Art Academy Learn Mode 的简体中文本地化。'
        '只翻译玩家可见的英文文本。人名、游戏名、曲名、素材名、代码标识符、URL、文件路径保持原文。'
        '如果某条不是玩家可见文本或应保留英文，把 value 设为 null。'
        '保留 key、换行、占位符、%%name%%、{name}、HTML 实体和专有名词。'
        '只输出 JSON 对象，不要解释。'
    )
    user_prompt = (
        f'这是第 {chunk_index}/{total_chunks} 批待处理文本。'
        '请返回完全相同结构的 JSON：{"cache": {...}, "hardcoded": {...}}。'
        '每个 key 必须原样保留；value 是简体中文翻译，或 null。\n\n'
        + json.dumps(chunk, ensure_ascii=False, indent=2)
    )
    messages = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': user_prompt},
    ]

    try:
        content = chat_completion(api_key, base_url, model, messages, timeout, use_response_format=True)
    except urllib.error.HTTPError as e:
        # Some OpenAI-compatible services do not support response_format.
        if e.code != 400:
            raise
        content = chat_completion(api_key, base_url, model, messages, timeout, use_response_format=False)

    translated = extract_json_object(content)
    return {
        'cache': translated.get('cache', {}),
        'hardcoded': translated.get('hardcoded', {}),
    }


def merge_translation_result(original, translated):
    translations_path = os.path.join(SCRIPT_DIR, 'translations_zh.json')
    hardcoded_path = os.path.join(SCRIPT_DIR, 'hardcoded_zh.json')
    skipped_path = os.path.join(SCRIPT_DIR, 'hardcoded_skipped.json')

    translations = load_json(translations_path, {})
    hardcoded = load_json(hardcoded_path, {})
    skipped = load_json(skipped_path, {})

    added_cache = 0
    added_hardcoded = 0
    added_skipped = 0

    for key, value in translated.get('cache', {}).items():
        if key not in original.get('cache', {}):
            continue
        if isinstance(value, str) and value.strip() and has_chinese(value):
            translations[key] = value
            added_cache += 1

    for key, value in translated.get('hardcoded', {}).items():
        if key not in original.get('hardcoded', {}):
            continue
        if isinstance(value, str) and value.strip() and has_chinese(value):
            hardcoded[key] = value
            added_hardcoded += 1
        else:
            skipped[key] = original['hardcoded'][key]
            added_skipped += 1

    save_json(translations_path, translations)
    save_json(hardcoded_path, hardcoded)
    save_json(skipped_path, skipped)

    return added_cache, added_hardcoded, added_skipped


def main():
    parser = argparse.ArgumentParser(description='自动提取并翻译新增汉化文本')
    parser.add_argument('--dry-run', action='store_true', help='只提取并统计，不调用 AI，不写入翻译表')
    parser.add_argument('--max-chars', type=int, default=9000, help='每批发送给 AI 的最大字符数')
    parser.add_argument('--timeout', type=int, default=120, help='API 请求超时时间（秒）')
    args = parser.parse_args()

    try:
        missing = extract_missing()
    except FileNotFoundError as e:
        print(f'[错误] {e}')
        return 1

    total = len(missing['cache']) + len(missing['hardcoded'])
    print(f'  cache 待处理: {len(missing["cache"])} 条')
    print(f'  硬编码待处理: {len(missing["hardcoded"])} 条')
    print(f'  合计: {total} 条')

    if total == 0:
        print('\n当前没有需要翻译的新增内容。')
        return 0

    if args.dry_run:
        print('\n--dry-run 模式：已停止在提取阶段。')
        return 0

    api_key, base_url, model = get_api_config()
    if not api_key:
        print('\n[错误] 未配置 AI 翻译接口。')
        print('请先设置环境变量，例如：')
        print('  setx PAA_TRANSLATE_API_KEY "你的 API key"')
        print('  setx PAA_TRANSLATE_BASE_URL "https://api.openai.com/v1"')
        print('  setx PAA_TRANSLATE_MODEL "gpt-4o-mini"')
        print('\n也可以使用任何 OpenAI 兼容接口，例如把 BASE_URL/MODEL 改成你的服务。')
        return 2

    chunks = chunk_entries(missing, args.max_chars)
    translated_all = {'cache': {}, 'hardcoded': {}}

    print('\n[2/3] 调用 AI 筛选并翻译...')
    for index, chunk in enumerate(chunks, 1):
        print(f'  翻译第 {index}/{len(chunks)} 批...')
        for attempt in range(1, 4):
            try:
                translated = translate_chunk(chunk, index, len(chunks), api_key, base_url, model, args.timeout)
                translated_all['cache'].update(translated.get('cache', {}))
                translated_all['hardcoded'].update(translated.get('hardcoded', {}))
                break
            except Exception as e:
                if attempt == 3:
                    print(f'[错误] 第 {index} 批翻译失败: {e}')
                    return 3
                print(f'    失败，重试 {attempt}/2: {e}')
                time.sleep(2 * attempt)

    print('\n[3/3] 合并翻译...')
    added_cache, added_hardcoded, added_skipped = merge_translation_result(missing, translated_all)
    print(f'  translations_zh.json 新增/更新: {added_cache} 条')
    print(f'  hardcoded_zh.json 新增/更新: {added_hardcoded} 条')
    print(f'  hardcoded_skipped.json 新增/更新: {added_skipped} 条')
    print('\n自动补充翻译完成。接下来会重新应用汉化补丁。')
    return 0


if __name__ == '__main__':
    sys.exit(main())
