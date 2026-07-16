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

from localization_coverage import build_coverage_report, format_coverage_report


ROOT = Path(__file__).resolve().parent
BACKUP_PACKAGES = ROOT / "backup" / "packages_bak"
CACHE_BACKUP = ROOT / "backup" / "cache.json.bak"
TMP_PACKAGES = ROOT / ".localization_verify_packages"
MANUAL_PATCHES = ROOT / "manual_patches.json"
TRANSLATIONS = ROOT / "translations_zh.json"
HARDCODED = ROOT / "hardcoded_zh.json"
HARDCODED_SKIPPED = ROOT / "hardcoded_skipped.json"


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


def verify_chess_translation_tables(failures: list[str]) -> None:
    with TRANSLATIONS.open("r", encoding="utf-8") as f:
        translations = json.load(f)
    with HARDCODED.open("r", encoding="utf-8") as f:
        hardcoded = json.load(f)

    chess_cache = {
        key: value
        for key, value in translations.items()
        if ".Chess" in key or "Chess." in key
    }
    require(
        len(chess_cache) >= 329,
        "Chess translation cache contains the complete current course set",
        failures,
    )

    expected_cache = {
        "PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Chess.DrawQueen|||directive": "绘制后精灵图",
        "PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Checkmate|||displayName": "将死",
        "PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.EnPassant|||displayName": "吃过路兵",
        "PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Castling|||displayName": "王车易位",
        "PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Stalemate|||displayName": "逼和",
    }
    require(
        all(translations.get(key) == value for key, value in expected_cache.items()),
        "Chess translation cache uses the expected Chinese terminology",
        failures,
    )

    chess_hardcoded = [
        key for key in hardcoded
        if key.startswith("retronator_pixelartacademy-pixeltosh-chess.js|||")
    ]
    require(
        len(chess_hardcoded) >= 144,
        "Chess hardcoded fallback translations are present",
        failures,
    )


def simulate_manual_patches(failures: list[str]) -> Path | None:
    if not BACKUP_PACKAGES.is_dir():
        fail(f"Missing backup packages: {BACKUP_PACKAGES}")
        failures.append("missing backup packages")
        return None

    if TMP_PACKAGES.exists():
        shutil.rmtree(TMP_PACKAGES)
    shutil.copytree(BACKUP_PACKAGES, TMP_PACKAGES)

    import patch_hardcoded
    import patch_manual

    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        patch_hardcoded.patch(str(TMP_PACKAGES), str(HARDCODED))
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

    drawing = read_text(packages / "retronator_pixelartacademy-pixelpad-drawing.js")
    cover_marker = "PAA.PixelPad.Apps.Drawing.PaletteSelection.Page.Cover = function ()"
    before_cover, _, after_cover = drawing.partition(cover_marker)
    cover_module = after_cover.split('}},"separator"', 1)[0] if after_cover else ""
    require(
        "\n    localizedCategory(category) {" in cover_module,
        f"{label}: palette selector cover defines localizedCategory",
        failures,
    )
    require(
        "localizedCategory(category)" not in before_cover,
        f"{label}: localizedCategory was not inserted into an earlier class",
        failures,
    )
    require(
        'Spacebars.mustache(view.lookup("localizedCategory"), view.lookup("category"))' in cover_module,
        f"{label}: palette selector cover uses localized category labels",
        failures,
    )
    require("'未命名'" in drawing, f"{label}: untitled artwork fallback is localized", failures)
    require("你确定要删除这个作品吗？" in drawing, f"{label}: artwork delete dialog is localized", failures)
    require('text: "删除"' in drawing and 'text: "取消"' in drawing, f"{label}: artwork delete dialog buttons are localized", failures)
    require(
        '{"1-bit Black and White": "1 位黑白", "Black": "黑色"}[palette.name] || palette.name' in drawing,
        f"{label}: artwork summary palette names are localized",
        failures,
    )
    readability_must_have = [
        'static localizedLabel(label) {',
        '"airplane": "飞机"',
        '}, "图像 ", Blaze.View("lookup:number"',
        '})), "：", Blaze.View("lookup:label"',
        'summary: "完美"',
        'summary: "优秀"',
        'summary: "良好"',
        'summary: "尚可"',
        'summary: "较差"',
        'summary: "有问题"',
        'summary: "无法判断"',
        'explanation: "图像尺寸太小，我难以辨认主体。"',
        'unrecognizableExplanation = "请添加更多细节，以便区分主体。";',
    ]
    readability_must_not_have = [
        '}, "Image ", Blaze.View("lookup:number"',
        'summary: "Inconclusive"',
        'This could maybe be confused with ',
        'Draw more details to distinguish the subject.',
        "I'm having trouble distinguish the subject at this small size.",
    ]
    require(
        all(item in drawing for item in readability_must_have),
        f"{label}: readability analysis results and subject labels are localized",
        failures,
    )
    require(
        not any(item in drawing for item in readability_must_not_have),
        f"{label}: readability analysis key English leftovers are gone",
        failures,
    )

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

    challenges = read_text(packages / "retronator_pixelartacademy-challenges.js")
    icon_book_must_have = [
        'return "\u56fe\u6807\u56fe\u5f62\u624b\u518c";',
        'return "\u56fe\u6807\u56fe\u5f62\u624b\u518c \u2014 \u81ea\u7136";',
        "<h1>\u76ee\u5f55</h1>",
        "<h2>\u56fe\u6807\u56fe\u5f62\u624b\u518c</h2>",
        'title: \'\u4ea4\u901a\'',
        "airplane: '\u98de\u673a'",
        '<div class="pixeltosh emphasized">Pixeltosh \u53ca\u66f4\u591a</div>',
    ]
    icon_book_must_not_have = [
        'return "The Graphics Book of Icons";',
        'return "The Graphics Book of Icons \u2014 Nature";',
        "<h1>Contents</h1>",
        "<h2>The Graphics Book of Icons</h2>",
        "<div class=\"pixeltosh emphasized\">Pixeltosh &amp; more</div>",
    ]
    require(
        all(item in challenges for item in icon_book_must_have),
        f"{label}: icon book table of contents and cover text are localized",
        failures,
    )
    require(
        not any(item in challenges for item in icon_book_must_not_have),
        f"{label}: icon book key English leftovers are gone",
        failures,
    )

    drawquickly = read_text(packages / "retronator_pixelartacademy-pixeltosh-drawquickly.js")
    drawquickly_must_have = [
        "对新手来说，对着参考图自由绘画可能有点难",
        "localizedComplexity(complexity)",
        "已完成：",
        "localizedThing(thing)",
        "<h1>写实绘画</h1>",
        "系统会给你一张参考图来临摹。",
        "得分：",
        "时间到！",
    ]
    drawquickly_must_not_have = [
        "Freehand drawing from reference can be hard",
        "It's OK if you're not happy",
        "<h1>Realistic Drawing</h1>",
        "You will be given a reference to draw.",
        "Simplify the subject to get done in time!",
        "Completed: ",
        "Score: ",
        "Time's up!",
    ]
    require(
        all(item in drawquickly for item in drawquickly_must_have),
        f"{label}: Draw Quickly realistic mode key text is localized",
        failures,
    )
    require(
        not any(item in drawquickly for item in drawquickly_must_not_have),
        f"{label}: Draw Quickly realistic mode key English leftovers are gone",
        failures,
    )

    learnmode_app = read_text(packages / "retronator_pixelartacademy-learnmode-app.js")
    steam_cloud_must_have = [
        "Steam 云存档现已可用",
        "启用 Steam 云同步后",
        "停用 Steam 云同步后",
        "使用 Steam 云存档",
        "创建新存档",
        "选择要编辑的存档",
        "选择要加载的存档",
        "停用 Steam 云存档",
        "启用 Steam 云存档",
        "正在加载……",
    ]
    steam_cloud_must_not_have = [
        "Steam Cloud saves are now available",
        "Enabling Steam Cloud will sync",
        "Disabling Steam Cloud will make",
        "Use Steam Cloud",
        "Create a new save game",
        "Choose a save game to edit",
        "Choose a save game to load",
        "Disable Steam Cloud",
        "Enable Steam Cloud",
        "Loading …",
    ]
    require(
        all(item in learnmode_app for item in steam_cloud_must_have),
        f"{label}: Steam Cloud and save-game UI has key Chinese text",
        failures,
    )
    require(
        not any(item in learnmode_app for item in steam_cloud_must_not_have),
        f"{label}: Steam Cloud and save-game key English leftovers are gone",
        failures,
    )

    chess = read_text(packages / "retronator_pixelartacademy-pixeltosh-chess.js")
    chess_must_have = [
        "caption: '文件'",
        "caption: '视图'",
        "caption: '音频'",
        "caption: '主题'",
        "caption: '对弈'",
        "name: '课程'",
        "name: '谜题'",
        "name: '对弈'",
        "关于国际象棋学院……",
        "棋盘坐标",
        "总是升变为后",
        "你觉得能在国际象棋中击败我吗？",
        ">购买<",
        "选择棋盘样式",
        "将兵升变为",
        "完成课程",
    ]
    chess_must_not_have = [
        "caption: 'File'",
        "caption: 'View'",
        "caption: 'Audio'",
        "caption: 'Theme'",
        "caption: 'Play'",
        "name: 'Lessons'",
        "name: 'Puzzles'",
        "name: 'Play'",
        'return "About Chess Academy ..";',
        'return "Board Coordinates";',
        'return "Always Promote to Queen";',
        "Do you think you can beat me at chess?",
        ">Buy<",
        ">Choose board style<",
        ">Promote pawn to<",
        ">Complete lesson<",
    ]
    require(
        all(item in chess for item in chess_must_have),
        f"{label}: Chess menus, actions, and lesson controls have key Chinese text",
        failures,
    )
    require(
        not any(item in chess for item in chess_must_not_have),
        f"{label}: Chess key menu and control English leftovers are gone",
        failures,
    )

    fundamentals = read_text(packages / "retronator_pixelartacademy-learnmode-pixelartfundamentals.js")
    require(
        'return "绘制后精灵图";' in fundamentals
        and 'return "Draw queen sprites";' not in fundamentals,
        f"{label}: Draw queen sprites goal is localized",
        failures,
    )


def print_coverage(packages: Path) -> None:
    cache_source = CACHE_BACKUP
    if not cache_source.exists():
        cache_source = ROOT.parent / "resources" / "app" / "meteor_extracted" / "app" / "artificial" / "babel" / "cache.json"
    packages_source = BACKUP_PACKAGES if BACKUP_PACKAGES.is_dir() else packages
    report = build_coverage_report(
        cache_source,
        packages_source,
        packages,
        TRANSLATIONS,
        HARDCODED,
        HARDCODED_SKIPPED,
        MANUAL_PATCHES,
    )
    print()
    print(format_coverage_report(report))


def main() -> int:
    failures: list[str] = []
    validate_json(failures)
    verify_chess_translation_tables(failures)

    simulated = simulate_manual_patches(failures)
    if simulated:
        verify_packages(simulated, failures, "simulated install")
        print_coverage(simulated)

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
