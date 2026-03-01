#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inject Chinese translations into cache.json"""
import json, sys, os

def inject(cache_path, trans_path):
    print(f"  Reading translations: {trans_path}")
    with open(trans_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    print(f"  Reading cache: {cache_path}")
    with open(cache_path, 'r', encoding='utf-8') as f:
        cache = json.load(f)

    injected = 0
    skipped = 0

    for full_key, zh_text in translations.items():
        parts = full_key.split('|||', 1)
        if len(parts) != 2:
            continue
        ns, key = parts

        if ns not in cache or key not in cache[ns]:
            skipped += 1
            continue

        entry = cache[ns][key]  # [docId, translationsObj]
        trans_obj = entry[1]

        # Inject zh-CN translation
        trans_obj["zh"] = {
            "cn": {"text": zh_text, "quality": 0},
            "best": {"text": zh_text, "quality": 0, "languageRegion": "zh-CN"}
        }
        injected += 1

    print(f"  Writing cache: {injected} injected, {skipped} skipped")
    with open(cache_path, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, separators=(',', ':'))

    return injected

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python inject_translations.py <cache.json> <translations_zh.json>")
        sys.exit(1)
    inject(sys.argv[1], sys.argv[2])
