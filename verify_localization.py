#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Offline localization smoke test for the Pixel Art Academy Learn Mode patch.

The test never writes to the installed game. It copies backup/packages_bak to a
temporary folder, applies manual_patches.json, and checks high-risk UI strings
and code hooks that have broken before.
"""
from __future__ import annotations

import contextlib
import io
import json
import shutil
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
BACKUP_PACKAGES = ROOT / "backup" / "packages_bak"
TMP_PACKAGES = ROOT / ".localization_verify_packages"
MANUAL_PATCHES = ROOT / "manual_patches.json"
TRANSLATIONS = ROOT / "translations_zh.json"
HARDCODED = ROOT / "hardcoded_zh.json"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def section(text: str, start: str, end: str) -> str:
    return text.split(start, 1)[1].split(end, 1)[0]


def ok(message: str) -> None:
    print(f"[OK] {message}")


def fail(message: str) -> None:
    print(f"[FAIL] {message}")


def require(condition: bool, message: str, failures: list[str]) -> None:
    if condition:
        ok(message)
    else:
        fail(message)
        failures.append(message)


def validate_json(failures: list[str]) -> None:
    for path in (MANUAL_PATCHES, TRANSLATIONS, HARDCODED):
        try:
            with path.open("r", encoding="utf-8") as f:
                json.load(f)
        except Exception as error:  # pragma: no cover - CLI diagnostic path
            fail(f"{path.name} is not valid JSON: {error}")
            failures.append(path.name)
        else:
            ok(f"{path.name} parses")


def simulate_manual_patches(failures: list[str]) -> Path | None:
    if not BACKUP_PACKAGES.is_dir():
        fail(f"Missing backup packages: {BACKUP_PACKAGES}")
        failures.append("missing backup packages")
        return None

    if TMP_PACKAGES.exists():
        shutil.rmtree(TMP_PACKAGES)
    shutil.copytree(BACKUP_PACKAGES, TMP_PACKAGES)

    import patch_manual

    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        patch_manual.patch(str(TMP_PACKAGES), str(MANUAL_PATCHES))

    log = output.getvalue()
    unsafe_lines = [line for line in log.splitlines() if "UNSAFE" in line]
    require(not unsafe_lines, "manual patches have no unsafe skips", failures)
    if unsafe_lines:
        for line in unsafe_lines[:20]:
            print(f"       {line}")

    return TMP_PACKAGES


def verify_packages(packages: Path, failures: list[str], label: str) -> None:
    studyplan = read_text(packages / "retronator_pixelartacademy-pixelpad-studyplan.js")
    studyplan_before_interests = studyplan.split("StudyPlan.Interests = function ()", 1)[0]
    interests_section = section(
        studyplan,
        "StudyPlan.Interests = function ()",
        "/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////",
    )

    require(
        "\n    localizedInterestName(interest) {" in interests_section,
        f"{label}: gained-interests panel defines localizedInterestName",
        failures,
    )
    require(
        "localizedInterestName(interest)" not in studyplan_before_interests,
        f"{label}: localizedInterestName was not inserted into an earlier class",
        failures,
    )
    require(
        "this.localizedInterestName(interest)" in interests_section,
        f"{label}: gained-interests sorting uses localized display names",
        failures,
    )

    menu = read_text(packages / "retronator_landsofillusions-ui.js")
    require(
        '<button class="menu-button">\u83dc\u5355</button>' in menu,
        f"{label}: top-right Menu button is localized",
        failures,
    )

    pixeltosh = read_text(packages / "retronator_pixelartacademy-pixeltosh.js")
    require("caption: '\u6587\u4ef6'" in pixeltosh, f"{label}: Pixeltosh File menu is localized", failures)
    require('return "\u5173\u95ed";' in pixeltosh, f"{label}: Pixeltosh Close action is localized", failures)
    require('return "\u9000\u51fa";' in pixeltosh, f"{label}: Pixeltosh Quit action is localized", failures)

    invasion = read_text(packages / "retronator_pixelartacademy-pico8-invasion.js")
    must_have = [
        "\u9632\u5fa1\u8005\u4f1a",
        "\u8d77\u59cb\u4f4d\u7f6e\u5728",
        "\u5165\u4fb5\u8005\u751f\u6210\u5728",
        "\u2014 \u901f\u5ea6\uff1a",
        "\u9632\u5fa1\u8005\uff0816\u00d716 \u50cf\u7d20\uff09",
    ]
    must_not_have = [
        "A defender moves",
        "They appear",
        "Every once in a while, a random invader shoots a projectile",
        " pixels per move",
        "Defender (16\u00d716 pixels)",
    ]
    require(all(item in invasion for item in must_have), f"{label}: Invasion document has key Chinese text", failures)
    require(not any(item in invasion for item in must_not_have), f"{label}: Invasion document key English leftovers are gone", failures)


def main() -> int:
    failures: list[str] = []
    validate_json(failures)

    simulated = simulate_manual_patches(failures)
    if simulated:
        verify_packages(simulated, failures, "simulated install")

    installed = ROOT.parent / "resources" / "app" / "meteor_extracted" / "packages"
    if installed.is_dir():
        verify_packages(installed, failures, "installed game")
    else:
        print("[WARN] Installed extracted packages not found; skipping live install checks.")

    if failures:
        print(f"\n{len(failures)} localization check(s) failed.")
        return 1

    print("\nAll localization smoke checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
