#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scan patched JavaScript packages for likely user-facing English leftovers.

This is a heuristic audit tool. It intentionally reports candidates for human
review instead of auto-changing code, because some English strings are internal
IDs, routes, package names, brand names, or file paths that must remain English.

Usage:
  python scan_untranslated_ui.py
  python scan_untranslated_ui.py --packages-dir path/to/packages --max 80
"""
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
DEFAULT_PACKAGES = ROOT.parent / "resources" / "app" / "meteor_extracted" / "packages"
REPORT_PATH = ROOT / "untranslated_ui_report.json"

TARGET_PACKAGES = [
    "retronator_landsofillusions-ui.js",
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
    "retronator_pixelartacademy-pixeltosh-chess.js",
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

VISIBLE_PROPERTY_RE = re.compile(
    r"\b(message|text|caption|title|label|placeholder|hint|name)\s*:\s*"
    r"([\"'])((?:\\.|(?!\2).)*)\2"
)
RETURN_RE = re.compile(r"\breturn\s+([\"'])((?:\\.|(?!\1).)*)\1\s*;")
HTML_RAW_RE = re.compile(r"HTML\.Raw\('((?:[^'\\]|\\.)*)'\)", re.S)
TAG_TEXT_RE = re.compile(r">(.*?)<", re.S)
PLACEHOLDER_ATTR_RE = re.compile(r"placeholder=\\?\"([^\"\\]*(?:\\.[^\"\\]*)*)\\?\"")

BRAND_OR_ALLOWED = {
    "AB",
    "AI",
    "API",
    "App Store",
    "DLC",
    "HTML",
    "ID",
    "JavaScript",
    "Learn Mode",
    "MENU",
    "PAA",
    "PICO-8",
    "Pixel Art Academy",
    "PixelTosh",
    "Pixeltosh",
    "Retropolis",
    "Retronator",
    "Steam",
    "URL",
    "ZX",
}

SKIP_SUBSTRINGS = (
    "://",
    "__cordova",
    "node_modules",
    "meteor://",
    "PixelArtAcademy.",
    "LandsOfIllusions.",
    "Artificial.",
    "retronator:",
    ".coffee",
    ".js",
    ".png",
    ".jpg",
    ".gif",
    ".ttf",
    ".css",
)


def decode_js_text(text: str) -> str:
    text = text.replace(r"\/", "/")
    text = text.replace(r"\'", "'").replace(r"\"", '"')
    text = text.replace(r"\n", " ").replace(r"\t", " ")
    return re.sub(r"\s+", " ", text).strip()


def has_cjk(text: str) -> bool:
    return any("\u4e00" <= ch <= "\u9fff" for ch in text)


def is_probably_internal(text: str) -> bool:
    if not text or has_cjk(text):
        return True
    if not re.search(r"[A-Za-z]{2,}", text):
        return True
    if any(part in text for part in SKIP_SUBSTRINGS):
        return True
    if text in BRAND_OR_ALLOWED:
        return True
    if re.fullmatch(r"[a-z][a-z0-9-]{2,}", text):
        return True
    if re.fullmatch(r"[A-Za-z0-9_.:/-]+", text) and ("." in text or "/" in text or "_" in text):
        return True
    if re.fullmatch(r"[A-Z0-9 +-]{2,}", text):
        return True
    return False


def add_candidate(candidates: list[dict], filename: str, content: str, index: int, kind: str, raw_text: str) -> None:
    text = decode_js_text(raw_text)
    if is_probably_internal(text):
        return
    line = content.count("\n", 0, index) + 1
    line_start = content.rfind("\n", 0, index) + 1
    line_end = content.find("\n", index)
    if line_end < 0:
        line_end = len(content)
    context = content[line_start:line_end].strip()
    candidates.append(
        {
            "file": filename,
            "line": line,
            "kind": kind,
            "text": text,
            "context": context[:300],
        }
    )


def scan_file(path: Path) -> list[dict]:
    content = path.read_text(encoding="utf-8", errors="replace")
    candidates: list[dict] = []

    for match in VISIBLE_PROPERTY_RE.finditer(content):
        add_candidate(candidates, path.name, content, match.start(3), f"property:{match.group(1)}", match.group(3))

    for match in RETURN_RE.finditer(content):
        nearby = content[max(0, match.start() - 120):match.start()]
        if re.search(r"(displayName|description|title|label|message|hint|instructions|directive)\s*\(\)\s*\{", nearby):
            add_candidate(candidates, path.name, content, match.start(2), "return:user-facing-method", match.group(2))

    for match in PLACEHOLDER_ATTR_RE.finditer(content):
        add_candidate(candidates, path.name, content, match.start(1), "attribute:placeholder", match.group(1))

    for raw_match in HTML_RAW_RE.finditer(content):
        raw_html = raw_match.group(1)
        for text_match in TAG_TEXT_RE.finditer(raw_html):
            raw_text = text_match.group(1)
            absolute_index = raw_match.start(1) + text_match.start(1)
            add_candidate(candidates, path.name, content, absolute_index, "html-text", raw_text)

    # De-duplicate repeated template strings.
    seen = set()
    unique = []
    for item in candidates:
        key = (item["file"], item["line"], item["kind"], item["text"])
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)
    return unique


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--packages-dir", default=str(DEFAULT_PACKAGES))
    parser.add_argument("--max", type=int, default=120, help="maximum candidates to print")
    parser.add_argument("--json", default=str(REPORT_PATH), help="JSON report path")
    args = parser.parse_args()

    packages = Path(args.packages_dir)
    if not packages.is_dir():
        print(f"Error: packages directory not found: {packages}")
        return 1

    all_candidates = []
    for filename in TARGET_PACKAGES:
        path = packages / filename
        if path.exists():
            all_candidates.extend(scan_file(path))

    all_candidates.sort(key=lambda item: (item["file"], item["line"], item["text"]))
    report_path = Path(args.json)
    report_path.write_text(json.dumps(all_candidates, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Found {len(all_candidates)} possible untranslated UI strings.")
    print(f"Report: {report_path}")
    for item in all_candidates[: args.max]:
        print(f"{item['file']}:{item['line']} [{item['kind']}] {item['text']}")
    if len(all_candidates) > args.max:
        print(f"... {len(all_candidates) - args.max} more in report")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
