#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将翻译后的汇总文件合并回 translations_zh.json 和 hardcoded_zh.json。

用法:
  python merge_all_translations.py 待翻译汇总.json

直接在 待翻译汇总.json 上翻译即可，不需要另存为。
合并时会自动跳过仍为英文（未翻译）的条目，只采纳包含中文的条目。
"""
import json
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def main():
    if len(sys.argv) < 2:
        print("用法: python merge_all_translations.py 待翻译汇总.json")
        print()
        print("  直接在 待翻译汇总.json 上翻译后保存，然后运行本脚本合并。")
        print("  未翻译的英文条目会自动跳过，只采纳包含中文的条目。")
        sys.exit(1)

    path = sys.argv[1]
    if not os.path.isabs(path):
        path = os.path.join(SCRIPT_DIR, path)
    if not os.path.exists(path):
        print(f"错误: 文件不存在: {path}")
        sys.exit(1)

    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    cache = data.get('cache', {})
    hardcoded = data.get('hardcoded', {})

    def has_chinese(text):
        """Check if text contains at least one CJK character."""
        return any('\u4e00' <= ch <= '\u9fff' for ch in str(text))

    # 合并 cache → translations_zh.json
    trans_path = os.path.join(SCRIPT_DIR, 'translations_zh.json')
    existing_trans = {}
    if os.path.exists(trans_path):
        with open(trans_path, 'r', encoding='utf-8') as f:
            existing_trans = json.load(f)
    added_cache = 0
    for key, value in cache.items():
        if not value or not str(value).strip():
            continue
        if '|||' not in key:
            continue
        if not has_chinese(value):
            continue
        existing_trans[key] = value
        added_cache += 1
    with open(trans_path, 'w', encoding='utf-8') as f:
        json.dump(existing_trans, f, ensure_ascii=False, indent=2)
    print(f"  translations_zh.json: 新增 {added_cache} 条翻译，当前共 {len(existing_trans)} 条")

    # 合并 hardcoded → hardcoded_zh.json
    hc_path = os.path.join(SCRIPT_DIR, 'hardcoded_zh.json')
    existing_hc = {}
    if os.path.exists(hc_path):
        with open(hc_path, 'r', encoding='utf-8') as f:
            existing_hc = json.load(f)
    added_hc = 0
    for key, value in hardcoded.items():
        if not value or not str(value).strip():
            continue
        if '|||' not in key:
            continue
        if not has_chinese(value):
            continue
        existing_hc[key] = value
        added_hc += 1
    with open(hc_path, 'w', encoding='utf-8') as f:
        json.dump(existing_hc, f, ensure_ascii=False, indent=2)
    print(f"  hardcoded_zh.json: 新增 {added_hc} 条翻译，当前共 {len(existing_hc)} 条")

    skipped = len(cache) + len(hardcoded) - added_cache - added_hc
    if skipped > 0:
        print(f"  跳过 {skipped} 条（未翻译或人名/专有名词）")

    print("\n  请重新运行「安装汉化.bat」以应用汉化。")


if __name__ == '__main__':
    main()
