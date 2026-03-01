#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
一键提取所有未翻译条目（cache + 硬编码），生成单一待翻译文件。

用法:
  python extract_all_missing.py

会依次执行:
  1. extract_strings.py  → 更新 to_translate.json（cache 中未翻译）
  2. extract_hardcoded.py → 更新 hardcoded_to_translate.json（JS 硬编码未翻译）
  3. 合并为 待翻译汇总.json，便于一次性翻译

翻译完成后保存为 待翻译汇总_zh.json（格式不变，仅把英文 value 改为中文），
然后运行: python merge_all_translations.py 待翻译汇总_zh.json
"""
import json
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def main():
    game_dir = os.path.dirname(SCRIPT_DIR)
    cache_path = os.path.join(
        game_dir, 'resources', 'app', 'meteor_extracted',
        'app', 'artificial', 'babel', 'cache.json'
    )
    packages_dir = os.path.join(
        game_dir, 'resources', 'app', 'meteor_extracted', 'packages'
    )

    if not os.path.exists(cache_path):
        print(f"错误: 未找到 cache.json，请先运行「安装汉化.bat」或「更新后重新汉化.bat」解包游戏。")
        print(f"  路径: {cache_path}")
        sys.exit(1)
    if not os.path.isdir(packages_dir):
        print(f"错误: 未找到 packages 目录。")
        print(f"  路径: {packages_dir}")
        sys.exit(1)

    print("[1/3] 提取 cache 中未翻译条目 …")
    import extract_strings
    extract_strings.extract(cache_path)

    print("\n[2/3] 提取 JS 硬编码中未翻译条目 …")
    import extract_hardcoded
    extract_hardcoded.extract(packages_dir)

    print("\n[3/3] 合并为 待翻译汇总.json …")
    cache_missing = {}
    hardcoded_missing = {}
    to_translate_path = os.path.join(SCRIPT_DIR, 'to_translate.json')
    hardcoded_to_translate_path = os.path.join(SCRIPT_DIR, 'hardcoded_to_translate.json')
    if os.path.exists(to_translate_path):
        with open(to_translate_path, 'r', encoding='utf-8') as f:
            cache_missing = json.load(f)
    if os.path.exists(hardcoded_to_translate_path):
        with open(hardcoded_to_translate_path, 'r', encoding='utf-8') as f:
            hardcoded_missing = json.load(f)

    combined = {
        "cache": cache_missing,
        "hardcoded": hardcoded_missing
    }
    out_path = os.path.join(SCRIPT_DIR, '待翻译汇总.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(combined, f, ensure_ascii=False, indent=2)

    total = len(cache_missing) + len(hardcoded_missing)
    print(f"\n  已生成: {out_path}")
    print(f"  cache 待翻译: {len(cache_missing)} 条")
    print(f"  硬编码待翻译: {len(hardcoded_missing)} 条")
    print(f"  合计: {total} 条")
    if total > 0:
        print("\n  下一步: 打开 待翻译汇总.json，将英文 value 翻译成中文，直接保存")
        print("  然后运行: python merge_all_translations.py 待翻译汇总.json")
        print("  最后重新运行「安装汉化.bat」应用汉化。")
        print("  （或直接双击「补充翻译.bat」一键完成以上步骤）")


if __name__ == '__main__':
    main()
