#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将 JS 文件切分成小块，附带提示词，方便喂给 AI 进行翻译。

用法:
  python prepare_for_ai.py                        # 处理所有目标文件
  python prepare_for_ai.py <filename.js>           # 只处理指定文件
  python prepare_for_ai.py <filename.js> 300       # 自定义每块行数(默认500)

输出:
  ai_chunks/ 目录下生成编号的 .txt 文件，每个文件可以直接粘贴给 AI。
"""
import json
import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PACKAGES_DIR = os.path.join(SCRIPT_DIR, '..', 'resources', 'app', 'meteor_extracted', 'packages')

# 所有目标 JS 文件
TARGET_PACKAGES = [
    'retronator_pixelartacademy-learnmode.js',
    'retronator_pixelartacademy-learnmode-app.js',
    'retronator_pixelartacademy-learnmode-intro.js',
    'retronator_pixelartacademy-learnmode-design.js',
    'retronator_pixelartacademy-learnmode-pixelartfundamentals.js',
    'retronator_pixelartacademy-pixelpad.js',
    'retronator_pixelartacademy-pixelpad-drawing.js',
    'retronator_pixelartacademy-pixelpad-instructions.js',
    'retronator_pixelartacademy-pixelpad-music.js',
    'retronator_pixelartacademy-pixelpad-notifications.js',
    'retronator_pixelartacademy-pixelpad-pico8.js',
    'retronator_pixelartacademy-pixelpad-pixeltosh.js',
    'retronator_pixelartacademy-pixelpad-todo.js',
    'retronator_pixelartacademy-pixelpad-studyplan.js',
    'retronator_pixelartacademy-tutorials.js',
    'retronator_pixelartacademy-challenges.js',
    'retronator_pixelartacademy-pixeltosh.js',
    'retronator_pixelartacademy-pixeltosh-pinball.js',
    'retronator_pixelartacademy-pixeltosh-drawquickly.js',
    'retronator_pixelartacademy-pixeltosh-writer.js',
    'retronator_pixelartacademy-pico8.js',
    'retronator_pixelartacademy-pico8-invasion.js',
    'retronator_pixelartacademy-pico8-jungle.js',
    'retronator_pixelartacademy-pico8-snake.js',
    'retronator_pixelartacademy.js',
    'retronator_pixelartacademy-practice.js',
    'retronator_pixelartacademy-studyguide.js',
    'retronator_pixelartacademy-learning.js',
    'retronator_pixelartacademy-music.js',
    'retronator_pixelartacademy-publication.js',
]

# AI 提示词模板
PROMPT_TEMPLATE = """你是一位游戏汉化专家。以下是游戏 "Pixel Art Academy Learn Mode" 的 JavaScript 代码片段。

文件: {filename}
行号: {start_line} - {end_line}

请完成以下任务:
1. 找出代码中所有**用户可见的英文界面文本**（菜单、按钮、提示、描述、标签等）
2. 将它们翻译成**简体中文**
3. 输出为 JSON 格式，可以直接添加到 manual_patches.json

**不要翻译**:
- CSS 类名、变量名、方法名、事件名
- 人名（如 Retro, Reuben 等）
- 专有名词（如 Pixel Art Academy, PICO-8, PixelTosh 等）
- URL、文件路径
- 纯代码逻辑（如 "function", "return" 等关键字）
- 已经是中文的文本

**输出格式**（JSON 数组）:
[
  {{
    "file": "{filename}",
    "find": "文件中的原样文本（足够长以确保唯一性）",
    "replace": "替换后的中文文本",
    "comment": "简短说明"
  }}
]

**重要规则**:
- "find" 必须是文件中的**原样文本**，直接复制代码中的字符串
- 如果 find 中包含 \\n（反斜杠+n），JSON 里要写成 \\\\n
- 如果 find 中包含双引号，JSON 里要写成 \\"
- 如果同一文本出现多次且翻译相同，添加 "replace_all": true
- 如果没有找到需要翻译的文本，输出空数组 []

===== 代码开始 =====
{code}
===== 代码结束 =====
"""


def has_english_string(line):
    """检查一行是否可能包含用户可见的英文字符串"""
    # 匹配双引号或单引号内含英文字母的字符串
    if re.search(r'"[^"]*[a-zA-Z]{2,}[^"]*"', line):
        return True
    if re.search(r"'[^']*[a-zA-Z]{2,}[^']*'", line):
        return True
    return False


def load_already_translated():
    """加载已翻译/已跳过的字符串，用于标注"""
    translated = set()

    # hardcoded_zh.json
    path = os.path.join(SCRIPT_DIR, 'hardcoded_zh.json')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            d = json.load(f)
        for key in d:
            parts = key.split('|||', 1)
            if len(parts) == 2:
                translated.add(parts[1].strip())

    # hardcoded_skipped.json
    path = os.path.join(SCRIPT_DIR, 'hardcoded_skipped.json')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            d = json.load(f)
        for key in d:
            parts = key.split('|||', 1)
            if len(parts) == 2:
                translated.add(parts[1].strip())

    # manual_patches.json
    path = os.path.join(SCRIPT_DIR, 'manual_patches.json')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            patches = json.load(f)
        for p in patches:
            translated.add(p.get('find', ''))

    return translated


def smart_extract(lines, chunk_size=500, context_lines=3):
    """
    智能提取：只提取包含英文字符串的行及其上下文。
    如果提取后的内容仍然很大，回退到按固定行数切分。
    """
    # 找出所有包含英文字符串的行号
    english_lines = set()
    for i, line in enumerate(lines):
        if has_english_string(line):
            english_lines.add(i)

    if not english_lines:
        return []  # 没有英文字符串

    # 扩展上下文
    context_ranges = []
    for line_no in sorted(english_lines):
        start = max(0, line_no - context_lines)
        end = min(len(lines), line_no + context_lines + 1)
        context_ranges.append((start, end))

    # 合并重叠的范围
    merged = [context_ranges[0]]
    for start, end in context_ranges[1:]:
        prev_start, prev_end = merged[-1]
        if start <= prev_end + 1:  # 合并相邻或重叠的范围
            merged[-1] = (prev_start, max(prev_end, end))
        else:
            merged.append((start, end))

    # 将合并后的范围组成块（如果太大就拆分）
    chunks = []
    current_chunk_lines = []
    current_chunk_start = None

    for range_start, range_end in merged:
        segment = lines[range_start:range_end]

        if current_chunk_lines and len(current_chunk_lines) + len(segment) + 1 > chunk_size:
            # 当前块已满，保存并开始新块
            chunks.append((current_chunk_start, current_chunk_start + len(current_chunk_lines) - 1, current_chunk_lines))
            current_chunk_lines = []
            current_chunk_start = None

        if not current_chunk_lines:
            current_chunk_start = range_start + 1  # 1-based line number

        if current_chunk_lines:
            current_chunk_lines.append(f"... (省略第 {current_chunk_lines[-1].split('→')[0].strip() if '→' in current_chunk_lines[-1] else '?'} 到 {range_start + 1} 行) ...")

        for i, line in enumerate(segment):
            line_no = range_start + i + 1  # 1-based
            current_chunk_lines.append(f"{line_no:>6}→{line}")

    if current_chunk_lines:
        chunks.append((current_chunk_start, current_chunk_start + len(current_chunk_lines) - 1, current_chunk_lines))

    return chunks


def split_fixed(lines, chunk_size=500):
    """按固定行数切分"""
    chunks = []
    for i in range(0, len(lines), chunk_size):
        chunk_lines = lines[i:i + chunk_size]
        start = i + 1
        end = i + len(chunk_lines)
        numbered = [f"{i + j + 1:>6}→{line}" for j, line in enumerate(chunk_lines)]
        chunks.append((start, end, numbered))
    return chunks


def main():
    # 解析参数
    target_file = None
    chunk_size = 500

    if len(sys.argv) >= 2:
        target_file = sys.argv[1]
    if len(sys.argv) >= 3:
        chunk_size = int(sys.argv[2])

    # 确定要处理的文件
    if target_file:
        files_to_process = [target_file]
    else:
        files_to_process = TARGET_PACKAGES

    # 创建输出目录
    output_dir = os.path.join(SCRIPT_DIR, 'ai_chunks')
    os.makedirs(output_dir, exist_ok=True)

    # 清空旧文件
    for f in os.listdir(output_dir):
        if f.endswith('.txt'):
            os.remove(os.path.join(output_dir, f))

    chunk_index = 0
    total_files = 0
    total_chunks = 0

    for filename in files_to_process:
        filepath = os.path.join(PACKAGES_DIR, filename)
        if not os.path.exists(filepath):
            print(f"  跳过: {filename} (文件不存在)")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.read().splitlines()

        # 智能提取
        chunks = smart_extract(lines, chunk_size=chunk_size)

        if not chunks:
            print(f"  跳过: {filename} (未发现英文字符串)")
            continue

        total_files += 1
        print(f"  {filename}: {len(lines)} 行 → {len(chunks)} 块")

        for start, end, chunk_lines in chunks:
            chunk_index += 1
            total_chunks += 1

            code_text = '\n'.join(chunk_lines)
            prompt = PROMPT_TEMPLATE.format(
                filename=filename,
                start_line=start,
                end_line=end,
                code=code_text
            )

            output_file = os.path.join(output_dir, f'chunk_{chunk_index:03d}_{filename[:50]}.txt')
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(prompt)

    print(f"\n完成! 共处理 {total_files} 个文件，生成 {total_chunks} 个块")
    print(f"输出目录: {output_dir}")
    print(f"\n使用方法:")
    print(f"  1. 打开 ai_chunks/ 目录中的 .txt 文件")
    print(f"  2. 将内容粘贴给 AI（ChatGPT / DeepSeek / Claude 等）")
    print(f"  3. 将 AI 返回的 JSON 保存到一个文件（如 ai_output.json）")
    print(f"  4. 运行: python merge_ai_output.py ai_output.json")
    print(f"  5. 自动合并到 manual_patches.json")


if __name__ == '__main__':
    main()
