#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将翻译好的 hardcoded_to_translate.json 合并到 hardcoded_zh.json。

用法:
  python merge_hardcoded.py
"""
import json
import os
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def has_chinese(text):
    return bool(re.search(r'[\u4e00-\u9fff]', str(text)))


def main():
    src_path = os.path.join(SCRIPT_DIR, 'hardcoded_to_translate.json')
    dst_path = os.path.join(SCRIPT_DIR, 'hardcoded_zh.json')

    if not os.path.exists(src_path):
        print(f"错误: 找不到 {src_path}")
        return

    with open(src_path, 'r', encoding='utf-8') as f:
        new_trans = json.load(f)

    existing = {}
    if os.path.exists(dst_path):
        with open(dst_path, 'r', encoding='utf-8') as f:
            existing = json.load(f)

    added = 0
    skipped = 0
    for key, value in new_trans.items():
        if '|||' not in key:
            skipped += 1
            continue
        if not value or not value.strip():
            skipped += 1
            continue
        # 只采纳包含中文的翻译（跳过还是英文的）
        if not has_chinese(value):
            skipped += 1
            continue
        existing[key] = value
        added += 1

    with open(dst_path, 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)

    print(f"  新增: {added} 条")
    print(f"  跳过: {skipped} 条（未翻译）")
    print(f"  hardcoded_zh.json 当前共: {len(existing)} 条")
    print()
    print("  请重新运行安装补丁以应用汉化。")


if __name__ == '__main__':
    main()
