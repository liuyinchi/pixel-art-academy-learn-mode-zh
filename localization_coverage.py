#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Coverage statistics for the Chinese localization patch."""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


if sys.stdout and sys.stdout.encoding and sys.stdout.encoding.lower() in ("gbk", "gb2312", "cp936"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr and sys.stderr.encoding and sys.stderr.encoding.lower() in ("gbk", "gb2312", "cp936"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent
DEFAULT_CACHE = ROOT / "backup" / "cache.json.bak"
DEFAULT_SOURCE_PACKAGES = ROOT / "backup" / "packages_bak"
DEFAULT_PATCHED_PACKAGES = ROOT.parent / "resources" / "app" / "meteor_extracted" / "packages"
DEFAULT_INSTALLED_CACHE = (
    ROOT.parent / "resources" / "app" / "meteor_extracted" / "app" / "artificial" / "babel" / "cache.json"
)

PLACEHOLDER_KEYS = {
    "message",
    "description",
    "displayName",
    "shortName",
    "fullName",
    "unlockInstructions",
    "directive",
    "instructions",
    "name",
    "title",
    "hint",
    "text",
    "label",
}

HARDCODED_TARGET_PACKAGES = [
    "retronator_pixelartacademy-learnmode.js",
    "retronator_pixelartacademy-learnmode-app.js",
    "retronator_pixelartacademy-learnmode-intro.js",
    "retronator_pixelartacademy-learnmode-design.js",
    "retronator_pixelartacademy-learnmode-pixelartfundamentals.js",
    "retronator_pixelartacademy-pixelpad.js",
    "retronator_pixelartacademy-pixelpad-drawing.js",
    "retronator_pixelartacademy-pixelpad-instructions.js",
    "retronator_pixelartacademy-pixelpad-music.js",
    "retronator_pixelartacademy-pixelpad-notifications.js",
    "retronator_pixelartacademy-pixelpad-pico8.js",
    "retronator_pixelartacademy-pixelpad-pixeltosh.js",
    "retronator_pixelartacademy-pixelpad-todo.js",
    "retronator_pixelartacademy-pixelpad-studyplan.js",
    "retronator_pixelartacademy-tutorials.js",
    "retronator_pixelartacademy-challenges.js",
    "retronator_pixelartacademy-pixeltosh.js",
    "retronator_pixelartacademy-pixeltosh-pinball.js",
    "retronator_pixelartacademy-pixeltosh-drawquickly.js",
    "retronator_pixelartacademy-pixeltosh-writer.js",
    "retronator_pixelartacademy-pico8.js",
    "retronator_pixelartacademy-pico8-invasion.js",
    "retronator_pixelartacademy-pico8-jungle.js",
    "retronator_pixelartacademy-pico8-snake.js",
    "retronator_pixelartacademy.js",
    "retronator_pixelartacademy-practice.js",
    "retronator_pixelartacademy-studyguide.js",
    "retronator_pixelartacademy-learning.js",
    "retronator_pixelartacademy-music.js",
    "retronator_pixelartacademy-publication.js",
]

METHOD_NAMES = [
    "directive",
    "instructions",
    "description",
    "name",
    "shortName",
    "fullName",
    "title",
    "label",
    "text",
    "message",
    "hint",
    "studyPlanDirective",
]
METHODS_RE = "|".join(METHOD_NAMES)
PAT_STATIC = re.compile(
    r"static\s+(" + METHODS_RE + r')\(\)\s*\{\s*\n\s*return\s+"((?:[^"\\]|\\.)*)"\s*;'
)
PAT_TEMPLATE = re.compile(
    r'return\s+"\\n\s+((?:[^"\\]|\\[^u"]|\\u[0-9a-fA-F]{4})*)\\n\s*"\s*;'
)
PAT_HTML_RAW = re.compile(r"HTML\.Raw\('((?:[^'\\]|\\.)*)'\)")
TAG_TEXT_RE = re.compile(r">([^<]+)<")


def load_json(path: str | Path, default):
    path = Path(path)
    if not path.exists():
        return default
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def has_cjk(text: str) -> bool:
    return any("\u4e00" <= ch <= "\u9fff" for ch in str(text))


def english_text(trans_obj: dict) -> str | None:
    en_data = trans_obj.get("en") if isinstance(trans_obj, dict) else None
    if not isinstance(en_data, dict):
        return None
    for region in ("best", "us"):
        region_data = en_data.get(region)
        if isinstance(region_data, dict) and region_data.get("text"):
            return region_data["text"]
    return None


def is_placeholder_entry(key: str, trans_obj: dict) -> bool:
    return key in PLACEHOLDER_KEYS and key == english_text(trans_obj)


def has_cache_zh(trans_obj: dict) -> bool:
    zh = trans_obj.get("zh") if isinstance(trans_obj, dict) else None
    if not isinstance(zh, dict):
        return False
    cn = zh.get("cn")
    best = zh.get("best")
    return (
        isinstance(cn, dict)
        and bool(cn.get("text"))
        or isinstance(best, dict)
        and bool(best.get("text"))
    )


def cache_entries(cache: dict) -> dict[str, str]:
    entries = {}
    for namespace, keys in cache.items():
        if not isinstance(keys, dict):
            continue
        for key, entry in keys.items():
            if not isinstance(entry, list) or len(entry) < 2:
                continue
            trans_obj = entry[1]
            if not isinstance(trans_obj, dict):
                continue
            en_text = english_text(trans_obj)
            if not en_text:
                continue
            if key == "bitmapInfo" or "Parser" in namespace:
                continue
            if is_placeholder_entry(key, trans_obj):
                continue
            entries[f"{namespace}|||{key}"] = en_text
    return entries


def cache_coverage(cache_path: str | Path, translations_path: str | Path) -> dict:
    cache_path = Path(cache_path)
    if not cache_path.exists():
        return {"available": False, "path": str(cache_path)}

    cache = load_json(cache_path, {})
    translations = load_json(translations_path, {})
    entries = cache_entries(cache)
    covered = 0
    missing = []

    for full_key in entries:
        namespace, key = full_key.split("|||", 1)
        trans_obj = cache.get(namespace, {}).get(key, [None, {}])[1]
        translated = bool(translations.get(full_key)) or has_cache_zh(trans_obj)
        if translated:
            covered += 1
        else:
            missing.append(full_key)

    entry_keys = set(entries)
    stale = sorted(key for key in translations if key not in entry_keys)
    return {
        "available": True,
        "path": str(cache_path),
        "covered": covered,
        "total": len(entries),
        "missing": missing,
        "missing_by_source": _count_by_prefix(missing),
        "stale": stale,
    }


def extract_hardcoded_entries(packages_dir: str | Path) -> dict[str, str]:
    packages_dir = Path(packages_dir)
    entries = {}
    if not packages_dir.is_dir():
        return entries

    for filename in HARDCODED_TARGET_PACKAGES:
        path = packages_dir / filename
        if not path.exists():
            continue
        content = path.read_text(encoding="utf-8", errors="replace")
        found = {}

        for match in PAT_STATIC.finditer(content):
            raw_text = match.group(2)
            cleaned = raw_text.replace("\\n", "\n").strip()
            if not has_cjk(cleaned) and len(cleaned) >= 3 and re.search(r"[a-zA-Z]{2}", cleaned):
                found[raw_text] = cleaned

        for match in PAT_TEMPLATE.finditer(content):
            raw_text = match.group(1).strip()
            cleaned = raw_text.replace("\\n", "\n").strip()
            if not has_cjk(cleaned) and len(cleaned) >= 5 and re.search(r"[a-zA-Z]{3}", cleaned):
                found[raw_text] = cleaned

        for match in PAT_HTML_RAW.finditer(content):
            html_content = match.group(1)
            for text_match in TAG_TEXT_RE.finditer(html_content):
                raw_in_file = text_match.group(1)
                cleaned = raw_in_file.replace("\\n", " ").replace("\\'", "'").strip()
                if has_cjk(cleaned) or len(cleaned) < 2:
                    continue
                if not re.search(r"[a-zA-Z]{2}", cleaned):
                    continue
                if re.search(r"[{};=]", cleaned):
                    continue
                found[cleaned] = cleaned

        for raw, cleaned in found.items():
            entries[f"{filename}|||{raw}"] = cleaned

    return entries


def hardcoded_coverage(packages_dir: str | Path, translations_path: str | Path, skipped_path: str | Path) -> dict:
    packages_dir = Path(packages_dir)
    if not packages_dir.is_dir():
        return {"available": False, "path": str(packages_dir)}

    entries = extract_hardcoded_entries(packages_dir)
    translations = load_json(translations_path, {})
    skipped = load_json(skipped_path, {})
    translated = []
    intentionally_kept = []
    missing = []

    for key in entries:
        if translations.get(key):
            translated.append(key)
        elif key in skipped:
            intentionally_kept.append(key)
        else:
            missing.append(key)

    entry_keys = set(entries)
    return {
        "available": True,
        "path": str(packages_dir),
        "covered": len(translated) + len(intentionally_kept),
        "translated": len(translated),
        "skipped": len(intentionally_kept),
        "total": len(entries),
        "missing": missing,
        "missing_by_source": _count_by_prefix(missing),
        "stale_translations": sorted(key for key in translations if key not in entry_keys),
        "stale_skipped": sorted(key for key in skipped if key not in entry_keys),
    }


def manual_patch_coverage(
    packages_dir: str | Path,
    patches_path: str | Path,
    source_packages_dir: str | Path | None = None,
) -> dict:
    packages_dir = Path(packages_dir)
    source_packages_dir = Path(source_packages_dir) if source_packages_dir else None
    patches_path = Path(patches_path)
    if not packages_dir.is_dir() or not patches_path.exists():
        return {"available": False, "path": str(packages_dir)}

    patches = load_json(patches_path, [])
    covered = []
    missing = []
    stale = []
    file_missing = []

    for index, patch in enumerate(patches, 1):
        filename = patch.get("file")
        find_text = patch.get("find", "")
        replace_text = patch.get("replace", "")
        label = patch.get("comment") or find_text[:60] or f"patch #{index}"
        key = f"{filename}|||{label}"

        if not filename:
            stale.append(key)
            continue
        path = packages_dir / filename
        source_path = source_packages_dir / filename if source_packages_dir else None
        source_content = None
        if source_path and source_path.exists():
            source_content = source_path.read_text(encoding="utf-8", errors="replace")

        if not path.exists():
            file_missing.append(key)
            continue
        content = path.read_text(encoding="utf-8", errors="replace")
        if replace_text and replace_text in content:
            covered.append(key)
        elif find_text and find_text in content:
            missing.append(key)
        elif source_content is not None and find_text and find_text in source_content:
            covered.append(key)
        else:
            stale.append(key)

    applicable_total = len(covered) + len(missing) + len(file_missing)
    needs_review = missing + stale + file_missing
    return {
        "available": True,
        "path": str(packages_dir),
        "covered": len(covered),
        "total": applicable_total,
        "rule_count": len(patches),
        "missing": missing,
        "stale": stale,
        "file_missing": file_missing,
        "missing_by_source": _count_by_prefix(needs_review),
    }


def build_coverage_report(
    cache_path: str | Path,
    packages_source_dir: str | Path,
    packages_patched_dir: str | Path,
    translations_path: str | Path,
    hardcoded_path: str | Path,
    skipped_path: str | Path,
    manual_patches_path: str | Path,
) -> dict:
    return {
        "cache": cache_coverage(cache_path, translations_path),
        "hardcoded": hardcoded_coverage(packages_source_dir, hardcoded_path, skipped_path),
        "manual": manual_patch_coverage(packages_patched_dir, manual_patches_path, packages_source_dir),
    }


def _count_by_prefix(keys: list[str]) -> dict[str, int]:
    counts = {}
    for key in keys:
        source = key.split("|||", 1)[0]
        counts[source] = counts.get(source, 0) + 1
    return dict(sorted(counts.items(), key=lambda item: (-item[1], item[0])))


def _percent(covered: int, total: int) -> float:
    return 100.0 if total == 0 else covered / total * 100


def _line(label: str, section: dict) -> str:
    if not section.get("available"):
        return f"{label}: 不可用"
    covered = section.get("covered", 0)
    total = section.get("total", 0)
    return f"{label}: {covered}/{total}  ({_percent(covered, total):.1f}%)"


def format_coverage_report(report: dict, hotspot_limit: int = 10) -> str:
    lines = [
        "=== 汉化覆盖率 ===",
        _line("cache.json       ", report.get("cache", {})),
        _line("hardcoded JS     ", report.get("hardcoded", {})),
        _line("manual patches   ", report.get("manual", {})),
    ]

    hardcoded = report.get("hardcoded", {})
    if hardcoded.get("available"):
        lines.append(
            "hardcoded 明细: "
            f"已汉化 {hardcoded.get('translated', 0)}，"
            f"保留英文 {hardcoded.get('skipped', 0)}，"
            f"未覆盖 {len(hardcoded.get('missing', []))}"
        )
    manual = report.get("manual", {})
    if manual.get("available"):
        lines.append(
            "manual 明细: "
            f"规则 {manual.get('rule_count', manual.get('total', 0))}，"
            f"适用 {manual.get('total', 0)}，"
            f"需复核 {len(manual.get('missing', [])) + len(manual.get('stale', [])) + len(manual.get('file_missing', []))}"
        )

    hotspots = []
    for name, section in report.items():
        if not section.get("available"):
            continue
        for source, count in section.get("missing_by_source", {}).items():
            hotspots.append((count, name, source))
    hotspots.sort(key=lambda item: (-item[0], item[1], item[2]))

    lines.extend(["", "未覆盖/需复核热点 (按数量):"])
    if hotspots:
        for count, name, source in hotspots[:hotspot_limit]:
            prefix = "cache" if name == "cache" else "hardcoded" if name == "hardcoded" else "manual"
            lines.append(f"- {prefix}:{source}: {count} 条")
    else:
        lines.append("- 暂无")

    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Report Chinese localization coverage.")
    parser.add_argument("--cache", default=str(DEFAULT_CACHE if DEFAULT_CACHE.exists() else DEFAULT_INSTALLED_CACHE))
    parser.add_argument(
        "--source-packages",
        default=str(DEFAULT_SOURCE_PACKAGES if DEFAULT_SOURCE_PACKAGES.is_dir() else DEFAULT_PATCHED_PACKAGES),
        help="unpatched JS packages used as the hardcoded-string baseline",
    )
    parser.add_argument(
        "--patched-packages",
        default=str(DEFAULT_PATCHED_PACKAGES),
        help="patched JS packages used to verify manual_patches.json coverage",
    )
    parser.add_argument("--translations", default=str(ROOT / "translations_zh.json"))
    parser.add_argument("--hardcoded", default=str(ROOT / "hardcoded_zh.json"))
    parser.add_argument("--skipped", default=str(ROOT / "hardcoded_skipped.json"))
    parser.add_argument("--manual-patches", default=str(ROOT / "manual_patches.json"))
    parser.add_argument("--hotspots", type=int, default=10)
    args = parser.parse_args(argv)

    report = build_coverage_report(
        args.cache,
        args.source_packages,
        args.patched_packages,
        args.translations,
        args.hardcoded,
        args.skipped,
        args.manual_patches,
    )
    print(format_coverage_report(report, hotspot_limit=args.hotspots))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
