#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将 AI 输出的翻译结果合并到 manual_patches.json。

用法:
  python merge_ai_output.py <ai_output.json>            # 合并单个文件
  python merge_ai_output.py <file1.json> <file2.json>   # 合并多个文件
  python merge_ai_output.py ai_chunks/*.json             # 合并目录下所有文件

AI 输出格式（JSON 数组）:
  [
    {
      "file": "retronator_pixelartacademy-learnmode.js",
      "find": "原文",
      "replace": "中文翻译",
      "comment": "说明"
    },
    ...
  ]

也支持 AI 直接输出一个对象（会自动转为数组）。
"""
import json
import os
import re
import sys
import glob

# Fix Windows console encoding for Chinese + special characters
if sys.stdout.encoding and sys.stdout.encoding.lower() in ('gbk', 'gb2312', 'cp936'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MANUAL_PATCHES_FILE = os.path.join(SCRIPT_DIR, 'manual_patches.json')
PACKAGES_DIR = os.path.join(SCRIPT_DIR, '..', 'resources', 'app', 'meteor_extracted', 'packages')


def has_chinese(text):
    """检查文本是否包含中文字符"""
    return bool(re.search(r'[\u4e00-\u9fff]', str(text)))


def extract_json_from_text(text):
    """
    从文本中提取 JSON 数组。
    AI 有时会在 JSON 前后加入说明文字或 markdown 代码块，这里做容错处理。
    """
    text = text.strip()

    # 尝试去掉 markdown 代码块标记
    if text.startswith('```'):
        # 去掉首行 ```json 或 ```
        lines = text.split('\n')
        start = 1
        end = len(lines)
        for i in range(len(lines) - 1, 0, -1):
            if lines[i].strip() == '```':
                end = i
                break
        text = '\n'.join(lines[start:end]).strip()

    # 尝试直接解析
    try:
        data = json.loads(text)
        if isinstance(data, list):
            return data
        if isinstance(data, dict):
            return [data]
        return []
    except json.JSONDecodeError:
        pass

    # 尝试找到第一个 [ 和最后一个 ]
    first_bracket = text.find('[')
    last_bracket = text.rfind(']')
    if first_bracket >= 0 and last_bracket > first_bracket:
        try:
            data = json.loads(text[first_bracket:last_bracket + 1])
            if isinstance(data, list):
                return data
        except json.JSONDecodeError:
            pass

    print(f"  警告: 无法解析 JSON 内容")
    return []


def validate_patch(patch, packages_dir):
    """验证一个 patch 条目是否有效"""
    errors = []

    if 'file' not in patch:
        errors.append("缺少 'file' 字段")
    if 'find' not in patch:
        errors.append("缺少 'find' 字段")
    if 'replace' not in patch:
        errors.append("缺少 'replace' 字段")

    if errors:
        return False, errors

    # 检查 replace 是否包含中文（翻译后应该有中文）
    if not has_chinese(patch['replace']):
        errors.append(f"'replace' 不含中文: {patch['replace'][:40]}")

    # 检查 find 字符串是否存在于目标文件中
    filepath = os.path.join(packages_dir, patch['file'])
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        if patch['find'] not in content:
            # 可能文件已经被打过补丁了，检查 replace 是否在文件中
            if patch['replace'] in content:
                errors.append(f"已经翻译过 (replace 已存在于文件中)")
            else:
                errors.append(f"'find' 在目标文件中未找到: {patch['find'][:50]}...")
    else:
        errors.append(f"文件不存在: {patch['file']}")

    return len(errors) == 0, errors


def load_existing_patches():
    """加载现有的 manual_patches.json"""
    if os.path.exists(MANUAL_PATCHES_FILE):
        with open(MANUAL_PATCHES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []


def is_duplicate(new_patch, existing_patches):
    """检查是否是重复的 patch"""
    for p in existing_patches:
        if p.get('file') == new_patch.get('file') and p.get('find') == new_patch.get('find'):
            return True
    return False


def main():
    if len(sys.argv) < 2:
        print("用法: python merge_ai_output.py <ai_output.json> [更多文件...]")
        print("      python merge_ai_output.py ai_chunks/*.json")
        sys.exit(1)

    # 收集所有输入文件
    input_files = []
    for arg in sys.argv[1:]:
        expanded = glob.glob(arg)
        if expanded:
            input_files.extend(expanded)
        else:
            input_files.append(arg)

    # 加载现有 patches
    existing = load_existing_patches()
    print(f"现有 manual_patches.json: {len(existing)} 条")

    # 处理所有输入文件
    all_new_patches = []
    for input_file in input_files:
        if not os.path.exists(input_file):
            print(f"\n跳过: {input_file} (文件不存在)")
            continue

        print(f"\n处理: {input_file}")
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()

        patches = extract_json_from_text(text)
        print(f"  解析到 {len(patches)} 条翻译")

        valid_count = 0
        skip_count = 0
        error_count = 0

        for patch in patches:
            # 检查重复
            if is_duplicate(patch, existing) or is_duplicate(patch, all_new_patches):
                print(f"    跳过 (重复): {patch.get('comment', patch.get('find', '?')[:30])}")
                skip_count += 1
                continue

            # 验证
            is_valid, errors = validate_patch(patch, PACKAGES_DIR)
            if is_valid:
                all_new_patches.append(patch)
                valid_count += 1
                comment = patch.get('comment', patch.get('find', '?')[:30])
                print(f"    ✓ {comment}")
            else:
                error_count += 1
                comment = patch.get('comment', patch.get('find', '?')[:30])
                print(f"    ✗ {comment}")
                for err in errors:
                    print(f"      → {err}")

        print(f"  结果: {valid_count} 有效, {skip_count} 重复, {error_count} 无效")

    if not all_new_patches:
        print("\n没有新的有效翻译需要添加。")
        return

    # 合并并保存
    merged = existing + all_new_patches
    with open(MANUAL_PATCHES_FILE, 'w', encoding='utf-8') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f"\n完成! manual_patches.json: {len(existing)} → {len(merged)} 条 (+{len(all_new_patches)} 新增)")
    print(f"\n下一步:")
    print(f"  1. 检查 manual_patches.json 确认翻译正确")
    print(f"  2. 运行: .\\apply_patch.ps1 install  重新安装补丁")


if __name__ == '__main__':
    main()
