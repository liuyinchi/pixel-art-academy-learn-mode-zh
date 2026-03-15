#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Apply manual find-and-replace patches to JS files.

This handles strings that cannot be auto-extracted by extract_hardcoded.py,
such as inline template text, anonymous function returns, etc.

Usage:
  python patch_manual.py <packages_dir> [manual_patches.json]

The manual_patches.json file should be a list of patch objects:
  [
    {
      "file": "target_filename.js",
      "find": "exact string to find in the file",
      "replace": "replacement string",
      "replace_all": false,          // optional, default false
      "comment": "human-readable note" // optional
    },
    ...
  ]
"""
import json
import os
import re
import sys

# Fix Windows console encoding for Chinese + special characters
if sys.stdout.encoding and sys.stdout.encoding.lower() in ('gbk', 'gb2312', 'cp936'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')


def is_safe_replacement(content, find_str, replace_str):
    """
    安全检查：确保替换不会破坏 JS 代码标识符。
    检查 find 在文件中每个出现位置的前后字符，如果紧邻字母/数字/下划线，
    说明 find 是某个变量名/方法名的一部分，替换会导致 JS 报错。
    """
    warnings = []
    pos = 0
    while True:
        pos = content.find(find_str, pos)
        if pos < 0:
            break
        # 检查前一个字符
        if pos > 0:
            before = content[pos - 1]
            if before.isalnum() or before == '_':
                ctx = content[max(0, pos - 20):pos + len(find_str) + 20]
                warnings.append(f"前方紧邻代码字符 '{before}': ...{ctx.strip()}...")
        # 检查后一个字符
        after_pos = pos + len(find_str)
        if after_pos < len(content):
            after = content[after_pos]
            if after.isalnum() or after == '_':
                ctx = content[max(0, pos - 20):after_pos + 20]
                warnings.append(f"后方紧邻代码字符 '{after}': ...{ctx.strip()}...")
        pos += 1
    return warnings


def patch(packages_dir, patches_path):
    with open(patches_path, 'r', encoding='utf-8') as f:
        patches = json.load(f)

    print(f"  Manual patches loaded: {len(patches)}")

    # Group by file
    by_file = {}
    for p in patches:
        fn = p['file']
        if fn not in by_file:
            by_file[fn] = []
        by_file[fn].append(p)

    total_patched = 0
    total_skipped_unsafe = 0

    for filename, file_patches in by_file.items():
        filepath = os.path.join(packages_dir, filename)
        if not os.path.exists(filepath):
            print(f"  Warning: {filename} not found, skipping")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        patched = 0
        for p in file_patches:
            find_str = p['find']
            replace_str = p['replace']
            replace_all = p.get('replace_all', False)
            comment = p.get('comment', find_str[:40])

            if find_str not in content:
                print(f"    Skip (not found / already patched): {comment}")
                continue

            # 安全检查：find 是否嵌在代码标识符中
            warnings = is_safe_replacement(content, find_str, replace_str)
            if warnings:
                print(f"    ⚠ UNSAFE - 跳过 (find 可能嵌在变量名中): {comment}")
                for w in warnings[:2]:
                    print(f"      → {w}")
                print(f"      修复方法: 让 find 包含更多上下文 (如引号、冒号、空格)")
                total_skipped_unsafe += 1
                continue

            if replace_all:
                count = content.count(find_str)
                content = content.replace(find_str, replace_str)
                patched += count
                print(f"    Patched ({count}x): {comment}")
            else:
                content = content.replace(find_str, replace_str, 1)
                patched += 1
                print(f"    Patched: {comment}")

        if patched > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  {filename}: {patched} manual patches applied")
            total_patched += patched
        else:
            print(f"  {filename}: no patches applied (already patched or text changed)")

    if total_skipped_unsafe > 0:
        print(f"  ⚠ {total_skipped_unsafe} patches skipped (unsafe - find too short)")
    print(f"  Total: {total_patched} manual patches applied")
    return total_patched


if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))

    if len(sys.argv) < 2:
        print("Usage: python patch_manual.py <packages_dir> [manual_patches.json]")
        sys.exit(1)

    packages_dir = sys.argv[1]
    patches_path = (
        sys.argv[2] if len(sys.argv) > 2
        else os.path.join(script_dir, 'manual_patches.json')
    )

    patch(packages_dir, patches_path)
