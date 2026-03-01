#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract all translatable strings from cache.json and generate to_translate.json.

Usage:
  python extract_strings.py [cache.json_path]

If no path is given, it looks for:
  ../resources/app/meteor_extracted/app/artificial/babel/cache.json

This script will:
1. Read all translation entries from cache.json
2. Exclude entries that already have zh-CN translations
3. Exclude bitmapInfo, parser, and placeholder entries
4. Write remaining untranslated strings to to_translate.json
"""
import json
import sys
import os
import re

def extract(cache_path):
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Load cache
    print(f"  Reading cache: {cache_path}")
    with open(cache_path, 'r', encoding='utf-8') as f:
        cache = json.load(f)

    # Load existing translations
    trans_path = os.path.join(script_dir, 'translations_zh.json')
    existing_keys = set()
    if os.path.exists(trans_path):
        with open(trans_path, 'r', encoding='utf-8') as f:
            existing = json.load(f)
        existing_keys = set(existing.keys())
        print(f"  Existing translations: {len(existing_keys)}")

    # Extract all strings
    all_strings = {}
    skipped = {'no_en': 0, 'already_translated': 0, 'bitmapInfo': 0, 'parser': 0, 'placeholder': 0}

    for ns, keys in cache.items():
        if not isinstance(keys, dict):
            continue
        for key, entry in keys.items():
            if not isinstance(entry, list) or len(entry) < 2:
                continue

            full_key = f"{ns}|||{key}"
            trans_obj = entry[1]

            # Skip if already has zh-CN in cache or in our translations file
            if full_key in existing_keys:
                skipped['already_translated'] += 1
                continue
            if 'zh' in trans_obj and 'cn' in trans_obj['zh']:
                skipped['already_translated'] += 1
                continue

            # Get English text
            en_text = None
            if 'en' in trans_obj:
                en_data = trans_obj['en']
                if isinstance(en_data, dict):
                    if 'best' in en_data and isinstance(en_data['best'], dict):
                        en_text = en_data['best'].get('text')
                    elif 'us' in en_data and isinstance(en_data['us'], dict):
                        en_text = en_data['us'].get('text')

            if not en_text:
                skipped['no_en'] += 1
                continue

            # Skip bitmapInfo
            if key == 'bitmapInfo':
                skipped['bitmapInfo'] += 1
                continue

            # Skip parser (text parser needs English input)
            if 'Parser' in ns:
                skipped['parser'] += 1
                continue

            # Skip placeholder "message" text
            if en_text == 'message':
                skipped['placeholder'] += 1
                continue

            all_strings[full_key] = en_text

    # Write output
    out_path = os.path.join(script_dir, 'to_translate.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(all_strings, f, ensure_ascii=False, indent=2)

    print(f"  Extracted: {len(all_strings)} strings to translate")
    print(f"  Skipped: {skipped}")
    print(f"  Saved to: {out_path}")

if __name__ == '__main__':
    if len(sys.argv) >= 2:
        cache_path = sys.argv[1]
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        game_dir = os.path.dirname(script_dir)
        cache_path = os.path.join(game_dir, 'resources', 'app', 'meteor_extracted',
                                  'app', 'artificial', 'babel', 'cache.json')

    if not os.path.exists(cache_path):
        print(f"Error: cache.json not found at {cache_path}")
        print("Please run the install patch first to extract game files, or provide the path as argument.")
        sys.exit(1)

    extract(cache_path)
