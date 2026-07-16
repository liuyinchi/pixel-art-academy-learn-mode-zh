//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var FataMorgana = Package['retronator:fatamorgana'].FataMorgana;
var LandsOfIllusions = Package['retronator:landsofillusions'].LandsOfIllusions;
var PixelArtAcademy = Package['retronator:pixelartacademy-learnmode'].PixelArtAcademy;
var PixelArtDatabase = Package['retronator:pixelartdatabase'].PixelArtDatabase;
var Artificial = Package['retronator:artificialengines'].Artificial;
var _ = Package['retronator:artificialengines']._;
var THREE = Package['retronator:artificialengines'].THREE;
var Ammo = Package['retronator:artificialengines'].Ammo;
var Retronator = Package['retronator:retronator-accounts'].Retronator;
var Spacebars = Package.spacebars.Spacebars;
var Tracker = Package['peerlibrary:server-autorun'].Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var DDP = Package['ddp-client'].DDP;
var Random = Package.random.Random;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var check = Package.check.check;
var Match = Package.check.Match;
var EJSON = Package.ejson.EJSON;
var HTTP = Package.http.HTTP;
var fetch = Package.fetch.fetch;
var OAuth = Package.oauth.OAuth;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package.modules.meteorBabelHelpers;
var Log = Package.logging.Log;
var Document = Package['retronator:peerdb'].Document;
var Template = Package['retronator:blaze-components'].Template;
var BlazeComponent = Package['retronator:blaze-components'].BlazeComponent;
var BlazeComponentDebug = Package['retronator:blaze-components'].BlazeComponentDebug;
var CommonComponent = Package['retronator:blaze-common-component'].CommonComponent;
var CommonMixin = Package['retronator:blaze-common-component'].CommonMixin;
var ReactiveField = Package['peerlibrary:reactive-field'].ReactiveField;
var ComputedField = Package['peerlibrary:computed-field'].ComputedField;
var Picker = Package['meteorhacks:picker'].Picker;
var Injected = Package['meteorhacks:inject-initial'].Injected;
var Inject = Package['meteorhacks:inject-initial'].Inject;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Promise = Package.promise.Promise;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Accounts = Package['accounts-base'].Accounts;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare, group, scale, onLoadHandler;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad-drawing":{"drawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/drawing.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, AM, LM, LOI, PAA;
AC = Artificial.Control;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PAA.PixelPad.Apps.Drawing = function () {
  class Drawing extends PAA.PixelPad.App {
    // editorId: which editor component to use for editing sprites in the app
    // externalSoftware: which external software the player is using to edit sprites
    // artworks: array of manually created artworks
    //   artworkId: the ID of the artwork document
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing';
    }
    static url() {
      return 'drawing';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "绘画";
    }
    static description() {
      return "这是用于绘制像素艺术的应用。";
    }
    static canEdit() {
      // Editor needs to be selected.
      if (!this.state('editorId')) {
        return;
      }
      // Player must have completed the reference copy challenge with a built-in editor.
      return PAA.Practice.Project.Asset.Bitmap.state('canEdit');
    }
    static canUpload() {
      // External software needs to be selected.
      if (!this.state('externalSoftware')) {
        return;
      }

      // Player must have completed the reference copy challenge by uploading the result.
      return PAA.Practice.Project.Asset.Bitmap.state('canUpload');
    }
    static canCreateArtworks() {
      var ref;
      return (ref = PAA.Practice.Project.Asset.Bitmap.state('unlockedPixelArtEvaluationCriteria')) != null ? ref.length : void 0;
    }
    constructor() {
      super(...arguments);
      this.portfolio = new ReactiveField(null);
      this.clipboard = new ReactiveField(null);
      this.paletteSelection = new ReactiveField(null);
      this.editor = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      // Initialize components.
      this.portfolio(new this.constructor.Portfolio(this));
      this.clipboard(new this.constructor.Clipboard(this));

      // Pre-load palette selection audio since we're creating the palette selection component ad-hoc.
      PAA.PixelPad.Apps.Drawing.PaletteSelection.Audio.load(LOI.adventure.audioManager);
      this.autorun(computation => {
        var editorClass, editorId;
        if (!(editorId = this.state('editorId'))) {
          return;
        }
        editorClass = LOI.Adventure.Thing.getClassForId(editorId);
        return this.editor(new editorClass(this));
      });
      this.displayedAssetCustomComponent = new ComputedField(() => {
        var portfolio, ref;
        portfolio = this.portfolio();
        if (!portfolio.isCreated()) {
          return;
        }
        return (ref = portfolio.displayedAsset()) != null ? ref.asset.customComponent : void 0;
      });
      return this.autorun(computation => {
        var displayedAssetCustomComponent, editor, portfolio, ref, ref1;
        portfolio = this.portfolio();
        editor = this.editor();
        displayedAssetCustomComponent = this.displayedAssetCustomComponent();
        if (portfolio.isCreated() && portfolio.activeAsset()) {
          if (editor.active() || ((ref = this.paletteSelection()) != null ? ref.activatable.activating() : void 0) || ((ref1 = this.paletteSelection()) != null ? ref1.activatable.activated() : void 0)) {
            return this.setMaximumPixelPadSize({
              fullscreen: true
            });
          } else if (displayedAssetCustomComponent) {
            return displayedAssetCustomComponent.setPixelPadSize(this);
          } else {
            return this.setFixedPixelPadSize(200, 260);
          }
        } else {
          return this.setFixedPixelPadSize(332, 241);
        }
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      PAA.PixelPad.Apps.Drawing.PaletteSelection.Audio.unload();
      return this.editor().destroy();
    }
    onBackButton() {
      var portfolio, ref, ref1, result;
      // Relay to palette selection.
      result = (ref = this.paletteSelection()) != null ? ref.onBackButton() : void 0;
      if (result != null) {
        return result;
      }
      // Relay to editor.
      result = this.editor().onBackButton();
      if (result != null) {
        return result;
      }
      // Relay to clipboard.
      result = this.clipboard().onBackButton();
      if (result != null) {
        return result;
      }

      // Relay to displayed asset custom component.
      result = (ref1 = this.displayedAssetCustomComponent()) != null ? typeof ref1.onBackButton === "function" ? ref1.onBackButton() : void 0 : void 0;
      if (result != null) {
        return result;
      }
      portfolio = this.portfolio();
      // We only need to handle closing groups when not on an asset.
      if (portfolio.activeAsset()) {
        return;
      }
      // Close the groups showing assets.
      if (!portfolio.assetGroupIsActive()) {
        return;
      }
      portfolio.activeGroups(_.initial(portfolio.activeGroups()));
      // Inform that we've handled the back button.
      return true;
    }
    showPaletteSelection(paletteName) {
      var paletteSelection;
      paletteSelection = new this.constructor.PaletteSelection(paletteName);
      this.paletteSelection(paletteSelection);
      return new Promise((resolve, reject) => {
        var componentWasActivating;
        // Wait until palette selection has been activating and deactivating again.
        componentWasActivating = false;
        // Wait for the component to be rendered.
        return Tracker.afterFlush(() => {
          paletteSelection.activatable.activate();
          return Tracker.autorun(computation => {
            if (paletteSelection.activatable.activating()) {
              return componentWasActivating = true;
            } else if (paletteSelection.activatable.deactivating() && componentWasActivating) {
              return resolve(paletteSelection.selectedPalette);
            } else if (paletteSelection.activatable.deactivated() && componentWasActivating) {
              computation.stop();
              return this.paletteSelection(null);
            }
          });
        });
      });
    }
    inGameMusicMode() {
      var activeAsset, ref, ref1;
      // Play music in location when in the editor or if the asset requests it.
      if (activeAsset = (ref = this.portfolio()) != null ? ref.activeAsset() : void 0) {
        if (activeAsset.inGameMusicMode) {
          return activeAsset.inGameMusicMode();
        }
      }
      if ((ref1 = this.editor()) != null ? ref1.active() : void 0) {
        return LM.Interface.InGameMusicMode.InLocation;
      } else {
        return LM.Interface.InGameMusicMode.Direct;
      }
    }
    activeAsset() {
      var portfolio;
      portfolio = this.portfolio();
      if (!portfolio.isCreated()) {
        return;
      }
      return portfolio.activeAsset();
    }
    activeAssetClass() {
      if (this.activeAsset()) {
        return 'active-asset';
      }
    }
    editorVisibleClass() {
      if (this.editor().visible()) {
        return 'editor-visible';
      }
    }
    editorActiveClass() {
      if (this.editor().active()) {
        return 'editor-active';
      }
    }
    editorFocusedModeClass() {
      var base;
      if (typeof (base = this.editor()).focusedMode === "function" ? base.focusedMode() : void 0) {
        return 'editor-focused-mode';
      }
    }
    editorClass() {
      var ref;
      return (ref = this.editor()) != null ? ref.constructor.styleClass() : void 0;
    }
  }
  ;
  Drawing.register(Drawing.id());
  Drawing.initialize();
  return Drawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.drawing.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/template.drawing.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing");
Template["PixelArtAcademy.PixelPad.Apps.Drawing"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing app ", Spacebars.mustache(view.lookup("activeAssetClass")), " ", Spacebars.mustache(view.lookup("editorVisibleClass")), " ", Spacebars.mustache(view.lookup("editorActiveClass")), " ", Spacebars.mustache(view.lookup("editorFocusedModeClass")), " ", Spacebars.mustache(view.lookup("editorClass")) ];
    }
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("portfolio"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("clipboard"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("displayedAssetCustomComponent"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("editor"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("paletteSelection"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfolio":{"portfolio.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/portfolio.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AC,
  AE,
  AEc,
  AM,
  LM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AEc = Artificial.Echo;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PAA.PixelPad.Apps.Drawing.Portfolio = function () {
  class Portfolio extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio';
    }
    constructor(drawing) {
      super(...arguments);
      this.drawing = drawing;
      this.sectionHeight = 23;
      this.maxInitialGroupHeight = 19;
      this.reducedGroupHeight = 10;
      this.minMinimizedGroupHeight = 2;
      this.maxMinimizedGroupHeight = 5;
      this.inactiveSectionGroupHeight = 4;
      this.inactiveSectionLastGroupHeight = 19;
      this.activeGroupHeight = 150;
      this.groupsMaxTotalHeight = 180;
      this.sectionsMargin = 13;
      this.sectionsMaxTotalHeight = 241 - 2 * this.sectionsMargin;
    }
    sectionActiveClass() {
      var section;
      section = this.currentData();
      if (this.activeSection() === section) {
        return 'active';
      }
    }
    sectionSubgroupActiveClass() {
      var section;
      section = this.currentData();
      if (this.activeSection() === section && this.activeGroups().length) {
        return 'subgroup-active';
      }
    }
    assetGroupActiveClass() {
      if (this.assetGroupIsActive()) {
        return 'asset-group-active';
      }
    }
    groupSubgroupActiveClass() {
      var activeGroups, group;
      group = this.currentData();
      activeGroups = this.activeGroups();
      if (indexOf.call(this.activeGroups(), group) >= 0 && activeGroups[group.level + 1]) {
        return 'subgroup-active';
      }
    }
    sectionStyle() {
      var activeSection, height, section, style, width;
      section = this.currentData();
      activeSection = this.activeSection();
      width = this.sectionWidth(section);
      if (section === activeSection) {
        height = this.activeSectionHeight();
      } else {
        height = this.inactiveSectionHeight();
      }
      style = {
        width: "".concat(width, "rem"),
        height: "".concat(height, "rem")
      };
      return style;
    }
    sectionWidth(section) {
      return 292 - 4 * (this.sections().length - section.index);
    }
    groupStyle() {
      var activeGroups, activeSection, group, height, parent, section, width;
      group = this.currentData();
      section = this.parentDataWith('isSection');
      activeSection = this.activeSection();
      activeGroups = this.activeGroups();
      width = this.groupWidth(group, 0);
      if (section === activeSection) {
        height = this.groupHeight(group, activeGroups);
      } else {
        parent = this.parentDataWith('groups');
        if (group === _.last(parent.groups())) {
          height = this.inactiveSectionLastGroupHeight;
        } else {
          height = this.inactiveSectionGroupHeight;
        }
      }
      return {
        width: "".concat(width, "rem"),
        height: "".concat(height, "rem")
      };
    }
    groupHeight(group, activeGroups) {
      var activeSubGroup, subgroups;
      if (indexOf.call(activeGroups, group) >= 0) {
        if (group.assets) {
          // If the group has assets, it will display at active group height.
          return this.activeGroupHeight;
        }

        // The group must have other groups inside. See if a subgroup is active.
        subgroups = group.groups();
        if (activeSubGroup = activeGroups[group.level + 1]) {
          // A child asset group is active. We have other groups collapsed and the active group at its desired height.
          return this.activeGroupHeaderHeight() + (subgroups.length - 1) * this.inactiveGroupHeight() + this.groupHeight(activeSubGroup, activeGroups);
        } else {
          // No subgroup is active. We have the title of this group plus all sub groups.
          return this.maxInitialGroupHeight + subgroups.length * this.initialGroupHeight();
        }
      } else if (group.level === activeGroups.length) {
        return this.initialGroupHeight();
      } else {
        return this.inactiveGroupHeight();
      }
    }
    groupWidth(group, dataLevel) {
      var parent, parentDataLevel, parentWidth;
      parentDataLevel = dataLevel;
      while (true) {
        parentDataLevel++;
        if (!(parent = Template.parentData(parentDataLevel))) {
          return 0;
        }
        if (parent != null ? parent.groups : void 0) {
          break;
        }
      }
      parentWidth = parent.isSection ? this.sectionWidth(parent) : this.groupWidth(parent, parentDataLevel);
      return parentWidth - 18 - 3 * (parent.groups().length - group.index - 1);
    }
    groupActiveClass() {
      var group;
      group = this.currentData();
      if (indexOf.call(this.activeGroups(), group) >= 0) {
        return 'active';
      }
    }
    briefStyle() {
      var assetData, group, zIndex;
      assetData = this.currentData();
      group = this.parentDataWith('assets');
      zIndex = group.assets().length - assetData.index;
      return {
        zIndex: zIndex
      };
    }
    assetStyle() {
      var assetData, group, zIndex;
      assetData = this.currentData();
      group = this.parentDataWith('assets');
      zIndex = group.assets().length - assetData.index;
      return {
        zIndex: zIndex,
        width: "".concat(assetData.asset.width() * assetData.scale() + assetData.asset.portfolioBorderWidth() * 2, "rem")
      };
    }
    _assetScale(asset) {
      var displayScale, displaySize, divisor, effectiveScale, maxEffectiveSize, maxSize, maxWindowPixelSize, scale, size;
      maxSize = 70;
      size = Math.max(asset.width(), asset.height());
      displayScale = LOI.adventure.interface.display.scale();
      if (!asset.pixelArtScaling()) {
        // Without pixel art scaling, make the image fit into the 70px.
        maxWindowPixelSize = 70 * displayScale;
        displaySize = Math.min(size, maxWindowPixelSize);
        return displaySize / size / displayScale;
      }
      if (_.isNaN(size)) {
        // with pixel art scaling, scale the image as much as possible (up to 6) while remaining under 70px.
        return 1;
      }
      scale = 1;
      if (size > maxSize) {
        // The asset is bigger than our maximum size, so we will need to scale downwards. We start
        // operating in effective scale to still have integer magnification compared to window pixels.
        maxEffectiveSize = maxSize * displayScale;
        effectiveScale = displayScale;
        while (size * effectiveScale > maxEffectiveSize) {
          effectiveScale--;
        }
        if (effectiveScale > 0) {
          return effectiveScale / displayScale;
        }

        // We need to reduce scale below 1 effective pixel so we start dividing by integer amounts below 1.
        divisor = 1;
        while (size / divisor > maxEffectiveSize) {
          divisor++;
        }
        effectiveScale = 1 / divisor;
        return effectiveScale / displayScale;
      }
      while (scale < 6 && (scale + 1) * size < maxSize) {
        scale++;
      }
      return scale;
    }
    coverStyle() {
      var activeSectionHeight, inactiveSectionHeight, sections, sectionsCount, top;
      sections = this.sections();
      sectionsCount = sections.length;
      activeSectionHeight = this.activeSectionHeight();
      inactiveSectionHeight = this.inactiveSectionHeight();
      if (this.activeSection()) {
        top = this.sectionsMargin + (sectionsCount - 1) * inactiveSectionHeight + activeSectionHeight;
      } else {
        top = this.sectionsMargin + sectionsCount * inactiveSectionHeight;
      }
      return {
        top: "".concat(top, "rem")
      };
    }
    sectionsVisible() {
      // Only show sections when not in the editor to prevent updates while editing.
      return !this.drawing.editor().active();
    }
    assetHoveredClass() {
      var assetData;
      assetData = this.currentData();
      if (assetData === this.hoveredAsset()) {
        return 'hovered';
      }
    }
    assetLastHoveredClass() {
      var assetData;
      assetData = this.currentData();
      if (assetData === this.lastHoveredAsset()) {
        return 'last-hovered';
      }
    }
    assetActiveClass() {
      var assetData;
      assetData = this.currentData();
      if (assetData === this.activeAsset()) {
        return 'active';
      }
    }
    selectedEditorClass() {
      var editor, selectedEditorId;
      editor = this.currentData();
      selectedEditorId = this.drawing.state('editorId') || null;
      if (selectedEditorId === editor.id()) {
        return 'selected';
      }
    }
    selectedSoftwareClass() {
      var selectedSoftware, software;
      software = this.currentData();
      selectedSoftware = this.drawing.state('externalSoftware') || null;
      if (selectedSoftware === software.value) {
        return 'selected';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .section': this.onClickSection,
        'click .group-header': this.onClickGroupHeader,
        'click': this.onClick,
        'pointerenter .section': this.onPointerEnterSection,
        'pointerenter .group-name': this.onPointerEnterGroupName,
        'pointerenter .asset': this.onPointerEnterAsset,
        'pointerleave .asset': this.onPointerLeaveAsset,
        'click .brief': this.onClickBrief,
        'click .asset': this.onClickAsset,
        'click .pixel-boy .editor': this.onClickPixelPadEditor,
        'click .external .editor': this.onClickExternalEditor
      });
    }
    onClickSection(event) {
      var clickInsideContent, section;
      section = this.currentData();
      clickInsideContent = $(event.target).closest('.content').length > 0;
      if (section === this.activeSection()) {
        if (!clickInsideContent) {
          return this.activeSection(null);
        }
      } else {
        this.activeSection(section);
        if (!clickInsideContent) {
          // Reset group if we click on the name, but not one of the inner groups.
          // In that case the group handler will activate a new group in this new section.
          return this.activeGroups([]);
        }
      }
    }
    onClickGroupHeader(event) {
      var activeGroups, group, newActiveGroups, section;
      group = this.currentData();
      section = this.parentDataWith('isSection');

      // Only open the group if we have an active section or if the group is the only one in the section.
      if (!(this.activeSection() === section || section.groups().length === 1)) {
        return;
      }
      activeGroups = this.activeGroups();
      newActiveGroups = activeGroups.slice(0, group.level);
      if (group === _.last(activeGroups)) {
        return this.activeGroups(newActiveGroups);
      } else {
        newActiveGroups.push(group);
        return this.activeGroups(newActiveGroups);
      }
    }
    onClick(event) {
      // If we click outside the clipboard, close current asset.
      if (this.activeAsset() && !$(event.target).closest('.clipboard').length) {
        this.activeAsset(null);
        return;
      }
      // If we click outside a group, close current group.
      if (this.activeGroups().length && !$(event.target).closest('.group').length) {
        this.activeGroups([]);
        if (this.currentData() === this.activeSection()) {
          // Don't let section close as well, if we were clicking inside the current section.
          event.stopPropagation();
        }
        return;
      }
      if (this.activeSection() && !$(event.target).closest('.section').length) {
        // If we click outside a section, close current section.
        return this.activeSection(null);
      }
    }
    onPointerEnterSection(event) {
      var section;
      section = this.currentData();
      if (section === this.activeSection()) {
        return;
      }
      return this.audio.sectionHover();
    }
    onPointerEnterGroupName(event) {
      var activeSection, group, section;
      group = this.currentData();
      if (indexOf.call(this.activeGroups(), group) >= 0) {
        return;
      }
      if (!(activeSection = this.activeSection())) {
        return;
      }
      section = this.parentDataWith('groups');
      if (section !== activeSection) {
        return;
      }
      return this.audio.groupHover();
    }
    onPointerEnterAsset(event) {
      var assetData;
      assetData = this.currentData();
      this.hoveredAsset(assetData);
      this.lastHoveredAsset(assetData);
      this.audio.assetPan(AEc.getPanForElement(event.target));
      return this._assetHoverUnlessFirst(assetData);
    }
    onPointerLeaveAsset(event) {
      var assetData;
      assetData = this.hoveredAsset();
      this.hoveredAsset(null);
      if (assetData && !this.activeAsset()) {
        // Only trigger the hover sound when we're not leaving because of selecting an asset.
        return this._assetHoverUnlessFirst(assetData);
      }
    }
    _assetHoverUnlessFirst(assetData) {
      if (!assetData.index) {
        return;
      }
      return this.audio.assetHover();
    }
    onClickBrief(event) {
      return this._goToClickedAsset();
    }
    onClickAsset(event) {
      return this._goToClickedAsset();
    }
    _goToClickedAsset() {
      var assetData;
      assetData = this.currentData();

      // Check if there is a custom click handler.
      if (assetData.asset.onClick) {
        assetData.asset.onClick();
        return;
      }
      // Set active asset URL.
      return AB.Router.changeParameter('parameter3', assetData.asset.urlParameter());
    }
    onClickPixelPadEditor(event) {
      var editor;
      editor = this.currentData();
      return this.drawing.state('editorId', editor.id());
    }
    onClickExternalEditor(event) {
      var program;
      program = this.currentData();
      return this.drawing.state('externalSoftware', program.value);
    }
    onKeyDown(event) {
      var activeGroup, activeStep, asset, cheating, i, len, ref, ref1, ref2, results, stepArea, stepAreas;
      // To get into cheating mode, you have to have shift pressed (and alt released),
      // to prevent accidental cheating when quitting on windows with alf-F4.
      if (AC.Keyboard.isShortcutDown(event, {
        key: AC.Keys.f2,
        shift: true
      })) {
        if (!(asset = (ref = this.activeAsset()) != null ? ref.asset : void 0)) {
          return;
        }
        if (!(stepAreas = typeof asset.stepAreas === "function" ? asset.stepAreas() : void 0)) {
          if (typeof asset.solve === "function") {
            asset.solve();
          }
          event.preventDefault();
          return;
        }
        results = [];
        for (i = 0, len = stepAreas.length; i < len; i++) {
          stepArea = stepAreas[i];
          if (!!stepArea.completed()) {
            continue;
          }
          activeStep = stepArea.steps()[stepArea.activeStepIndex()];
          activeStep.solve();
          event.preventDefault();
          break;
        }
        return results;
      } else if (AC.Keyboard.isShortcutDown(event, {
        key: AC.Keys.f3,
        shift: true
      })) {
        if (!(asset = (ref1 = this.activeAsset()) != null ? ref1.asset : void 0)) {
          return;
        }
        if (typeof asset.solveAndComplete === "function") {
          asset.solveAndComplete();
        }
        return event.preventDefault();
      } else if (AC.Keyboard.isShortcutDown(event, {
        key: AC.Keys.f4,
        shift: true
      })) {
        console.log("Cheating commences …");
        if (!(activeGroup = _.last(this.activeGroups()))) {
          return;
        }
        if (!(((ref2 = activeGroup.thing) != null ? ref2.assets() : void 0) && activeGroup.thing.state('assets'))) {
          return;
        }
        cheating = () => {
          var assets, assetsData, cheatMore, uncompletedAsset, uncompletedAssetData;
          assets = activeGroup.thing.assets();
          assetsData = activeGroup.thing.state('assets');
          cheatMore = false;
          while (uncompletedAssetData = _.find(assetsData, assetData => {
            return !assetData.completed && _.find(assets, asset => {
              return asset.id() === assetData.id;
            });
          })) {
            console.log("Completing", uncompletedAssetData.id);
            uncompletedAsset = _.find(assets, asset => {
              return asset.id() === uncompletedAssetData.id;
            });
            uncompletedAsset.solve();
            uncompletedAssetData.completed = true;
            cheatMore = true;
          }
          if (cheatMore) {
            activeGroup.thing.state('assets', assetsData);
            return Meteor.setTimeout(cheating, 100);
          } else {
            return console.log("Cheating commenced!");
          }
        };
        cheating();
        return event.preventDefault();
      }
    }
  }
  ;
  Portfolio.Sections = {
    Tutorials: 'Tutorials',
    Challenges: 'Challenges',
    Projects: 'Projects',
    Artworks: 'Artworks'
  };

  // Subscriptions
  Portfolio.artworksWithAssets = new AB.Subscription({
    name: "".concat(Portfolio.id(), ".artworks")
  });
  Portfolio.Audio = new LOI.Assets.Audio.Namespace(Portfolio.id(), {
    variables: {
      sectionOpen: AEc.ValueTypes.Trigger,
      sectionClose: AEc.ValueTypes.Trigger,
      sectionHover: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      groupOpen: AEc.ValueTypes.Trigger,
      groupClose: AEc.ValueTypes.Trigger,
      groupHover: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      assetHover: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      assetPan: {
        valueType: AEc.ValueTypes.Number
      }
    }
  });
  return Portfolio;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfolio.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/template.portfolio.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-portfolio"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: "cover"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("coverStyle"));
  }), HTML.Raw('\n      <div class="handle"></div>\n      <div class="handle-shadow"></div>\n    ')), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("sectionsVisible"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "sections-area"
    }, "\n        ", HTML.UL({
      class: "sections"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("sections"));
    }, function() {
      return [ "\n            ", HTML.LI(HTML.Attrs({
        class: function() {
          return [ "section ", Spacebars.mustache(view.lookup("sectionActiveClass")), " ", Spacebars.mustache(view.lookup("sectionSubgroupActiveClass")), " ", Spacebars.mustache(view.lookup("assetGroupActiveClass")) ];
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("sectionStyle"));
      }), "\n              ", HTML.DIV({
        class: "section-name"
      }, Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("nameKey"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      })), "\n              ", HTML.UL({
        class: "groups"
      }, "\n                ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("groups"));
      }, function() {
        return [ "\n                  ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Group"));
        }), "\n                " ];
      }), "\n              "), "\n            "), "\n          " ];
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Group");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Group"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Group", (function() {
  var view = this;
  return HTML.LI(HTML.Attrs({
    class: function() {
      return [ "group content ", Spacebars.mustache(view.lookup("groupActiveClass")), " ", Spacebars.mustache(view.lookup("groupSubgroupActiveClass")), " ", Spacebars.mustache(view.lookup("styleClasses")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("groupStyle"));
  }), "\n    ", HTML.DIV({
    class: "group-header"
  }, "\n      ", HTML.DIV({
    class: "group-name"
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("content"), "completed"));
  }, function() {
    return HTML.Raw('\n        <div class="completed">✔︎</div>\n      ');
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("groups"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "groups"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("groups"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Group"));
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("assets"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "briefs"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("assets"));
    }, function() {
      return [ "\n          ", HTML.LI(HTML.Attrs({
        class: function() {
          return [ "brief ", Spacebars.mustache(view.lookup("assetHoveredClass")), " ", Spacebars.mustache(view.lookup("assetLastHoveredClass")), "  ", Spacebars.mustache(view.lookup("assetActiveClass")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("asset"), "styleClasses")) ];
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("briefStyle"));
      }), "\n            ", HTML.DIV({
        class: "asset-name"
      }, "\n              ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("asset"), "displayNameTranslation"));
      }, function() {
        return [ "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("asset"), "displayNameTranslation"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), "\n              " ];
      }, function() {
        return [ "\n                ", Blaze.View("lookup:asset.displayName", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("asset"), "displayName"));
        }), "\n              " ];
      }), "\n            "), "\n            ", HTML.DIV({
        class: "description"
      }, "\n              ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("asset"), "descriptionTranslation"));
      }, function() {
        return [ "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("asset"), "descriptionTranslation"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), "\n              " ];
      }, function() {
        return [ "\n                ", Blaze.View("lookup:asset.description", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("asset"), "description"));
        }), "\n              " ];
      }), "\n            "), "\n          "), "\n        " ];
    }), "\n      "), "\n      ", HTML.UL({
      class: "assets"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("assets"));
    }, function() {
      return [ "\n          ", HTML.LI(HTML.Attrs({
        class: function() {
          return [ "asset ", Spacebars.mustache(view.lookup("assetActiveClass")) ];
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("assetStyle"));
      }), "\n            ", Blaze._TemplateWith(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("asset"), "portfolioComponent"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("Render"));
      }), "\n          "), "\n        " ];
    }), "\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("noAssetsInstructions"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "no-assets-instructions"
      }, "\n          ", Blaze.View("lookup:noAssetsInstructions", function() {
        return Spacebars.mustache(view.lookup("noAssetsInstructions"));
      }), "\n        "), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfolio-initialize.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/portfolio-initialize.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Portfolio = function () {
  class Portfolio extends PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio {
    onCreated() {
      var sectionLocation, sectionLocations, sectionThingName;
      super.onCreated(...arguments);
      sectionLocations = {
        tutorial: new PAA.Practice.Tutorials.Drawing(),
        challenge: new PAA.Practice.Challenges.Drawing(),
        project: new PAA.Practice.Project.Workbench()
      };
      for (sectionThingName in sectionLocations) {
        sectionLocation = sectionLocations[sectionThingName];
        ((sectionThingName, sectionLocation) => {
          var section, sectionThings;
          sectionThings = new ComputedField(() => {
            var currentSituation;
            // Get things from the section location. Note: we expect things to be instances, so
            // they have to be added as instances in the workbench scene, and not as classes.
            currentSituation = new LOI.Adventure.Situation({
              location: sectionLocation
            });
            return currentSituation.things();
          }, (a, b) => {
            return _.isArray(a) && _.isArray(b) && a.length === b.length && _.intersection(a, b).length === a.length;
          });
          section = {
            nameKey: this.constructor.Sections["".concat(_.upperFirst(sectionThingName), "s")],
            groups: this._createGroupsField(sectionThings, 0),
            isSection: true
          };
          return this["".concat(sectionThingName, "sSection")] = section;
        })(sectionThingName, sectionLocation);
      }

      // Create artwork assets.
      this._artworkAssets = {};
      this._artworkAssetsDependency = new Tracker.Dependency();
      this._artworkIds = new ComputedField(() => {
        var artwork, artworks, i, len, results;
        if (!(artworks = PAA.PixelPad.Apps.Drawing.state('artworks'))) {
          return [];
        }
        results = [];
        for (i = 0, len = artworks.length; i < len; i++) {
          artwork = artworks[i];
          results.push(artwork.artworkId);
        }
        return results;
      });
      this._artworksDictionary = new AE.ReactiveDictionary(() => {
        var artworkIds, dictionary;
        artworkIds = this._artworkIds();
        dictionary = {};
        PADB.Artwork.documents.find({
          _id: {
            $in: artworkIds
          }
        }).forEach(artwork => {
          return dictionary[artwork._id] = dictionary;
        });
        return dictionary;
      }, {
        added: id => {
          this._artworkAssets[id] = new PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset(id);
          return this._artworkAssetsDependency.changed();
        },
        removed: id => {
          this._artworkAssets[id].destroy();
          delete this._artworkAssets[id];
          return this._artworkAssetsDependency.changed();
        }
      });

      // Create WIP artworks group.
      this._newArtworkAsset = new PAA.PixelPad.Apps.Drawing.Portfolio.NewArtwork();
      this._importArtworkAsset = new PAA.PixelPad.Apps.Drawing.Portfolio.ImportArtwork();
      this._wipArtworksGroup = {
        index: 0,
        name: () => {
          return "进行中的作品";
        },
        assets: new ComputedField(() => {
          var artwork, artworkIds, assetIndex, assets, i, len, wipArtworks;
          assets = [];

          // Get all WIP artworks.
          this._artworkAssetsDependency.depend();
          artworkIds = this._artworkIds();
          wipArtworks = PADB.Artwork.documents.fetch({
            _id: {
              $in: artworkIds
            },
            wip: true
          }, {
            sort: {
              startDate: 1
            }
          });
          for (assetIndex = i = 0, len = wipArtworks.length; i < len; assetIndex = ++i) {
            artwork = wipArtworks[assetIndex];
            ((artwork, assetIndex) => {
              var asset;
              if (!(asset = this._artworkAssets[artwork._id])) {
                return;
              }
              return assets.push({
                _id: asset.urlParameter(),
                index: assetIndex,
                asset: asset,
                scale: () => {
                  return this._assetScale(asset);
                }
              });
            })(artwork, assetIndex);
          }
          if (PAA.PixelPad.Apps.Drawing.canCreateArtworks()) {
            assets.push({
              _id: this._newArtworkAsset.urlParameter(),
              index: assets.length,
              asset: this._newArtworkAsset,
              scale: () => {
                return 1;
              }
            });
          }

          // TODO: Enable uploading of artworks.
          /*
          assets.push
          _id: @_importArtworkAsset.urlParameter()
          index: assets.length
          asset: @_importArtworkAsset
          scale: => 1
          */
          return assets;
        })
      };
      this.artworksSection = {
        nameKey: this.constructor.Sections.Artworks,
        isSection: true,
        groups: () => {
          var groups;
          groups = [];
          if (this._wipArtworksGroup.assets().length) {
            groups.push(this._wipArtworksGroup);
          }

          // TODO: Fetch all artworks.
          return groups;
        }
      };
      this.sections = new ComputedField(() => {
        var i, index, len, ref, section, sections;
        sections = [];
        if (this.tutorialsSection.groups().length) {
          sections.push(this.tutorialsSection);
        }
        if (this.challengesSection.groups().length) {
          sections.push(this.challengesSection);
        }
        if (this.projectsSection.groups().length) {
          sections.push(this.projectsSection);
        }
        if (this.artworksSection.groups().length) {
          sections.push(this.artworksSection);
        }
        // If the active section is not present anymore, close the section.
        if (this.activeSection && (ref = !this.activeSection(), indexOf.call(sections, ref) >= 0)) {
          this.activeSection(null);
          this.activeGroup(null);
          this.hoveredAsset(null);
          this.lastHoveredAsset(null);
        }
        for (index = i = 0, len = sections.length; i < len; index = ++i) {
          section = sections[index];
          // Update section indices.
          section.index = index;
        }
        return sections;
      });
      this.activeSection = new ReactiveField(null, (a, b) => {
        return a === b;
      });
      this.activeGroups = new ReactiveField([], (a, b) => {
        var group, i, index, len;
        if (a.length !== b.length) {
          return false;
        }
        for (index = i = 0, len = a.length; i < len; index = ++i) {
          group = a[index];
          if (group !== b[index]) {
            return false;
          }
        }
        return true;
      });
      // Clear stale active groups.
      this.autorun(computation => {
        var activeGroup, activeGroupIndex, activeGroups, activeSection, base, currentGroups, groupsWereRefreshed, i, len, name, newGroups, refreshedActiveGroups, sameNamedGroup;
        if (!(activeSection = this.activeSection())) {
          return;
        }
        if (!(activeGroups = this.activeGroups())) {
          return;
        }
        refreshedActiveGroups = _.clone(activeGroups);
        groupsWereRefreshed = false;
        newGroups = activeSection.groups();
        for (activeGroupIndex = i = 0, len = activeGroups.length; i < len; activeGroupIndex = ++i) {
          activeGroup = activeGroups[activeGroupIndex];
          currentGroups = newGroups;
          newGroups = typeof (base = newGroups[activeGroup.index]).groups === "function" ? base.groups() : void 0;
          if (indexOf.call(currentGroups, activeGroup) >= 0) {
            continue;
          }

          // See if we can find a group with the same name.
          name = activeGroup.name();
          sameNamedGroup = _.find(currentGroups, group => {
            return group.name() === name;
          });
          if (sameNamedGroup) {
            // We found the same group so it must have just re-created.
            refreshedActiveGroups[activeGroupIndex] = sameNamedGroup;
            groupsWereRefreshed = true;
            continue;
          }

          // Seems like the active group is not valid anymore. Return to highest valid level.
          refreshedActiveGroups = refreshedActiveGroups.slice(0, activeGroupIndex);
          groupsWereRefreshed = true;
          break;
        }
        if (groupsWereRefreshed) {
          return this.activeGroups(refreshedActiveGroups);
        }
      });
      this.hoveredAsset = new ReactiveField(null, (a, b) => {
        return a === b;
      });
      this.lastHoveredAsset = new ReactiveField(null, (a, b) => {
        return a === b;
      });
      this.activeAsset = new ReactiveField(null, (a, b) => {
        return a === b;
      });
      // Determine the active section, group, and asset based on the URL.
      this.autorun(computation => {
        var group, i, j, len, len1, ref, ref1, result, section, urlParameter;
        if (!(urlParameter = AB.Router.getParameter('parameter3'))) {
          this.activeAsset(null);
          return;
        }
        ref = this.sections();
        // Find the asset that uses this parameter.
        for (i = 0, len = ref.length; i < len; i++) {
          section = ref[i];
          ref1 = section.groups();
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            group = ref1[j];
            if (result = this._searchGroupForAssetWithUrlParameter(group, urlParameter, [group])) {
              this.activeSection(section);
              this.activeGroups(result.groups);
              this.activeAsset(result.asset);
              return;
            }
          }
        }
      });
      // Displayed asset retains its value until another asset gets activated
      this.displayedAsset = new ReactiveField(null, (a, b) => {
        return a === b;
      });
      this.autorun(computation => {
        var activeAsset;
        if (!(activeAsset = this.activeAsset())) {
          return;
        }
        return this.displayedAsset(activeAsset);
      });

      // Wire sounds on changes of sections and groups, but don't play two at once (group has priority).
      this.autorun(computation => {
        var section;
        // Depend on section changes.
        section = this.activeSection();
        if (this._updateGroupTimeout) {
          return;
        }
        return this._updateSectionTimeout = Meteor.setTimeout(() => {
          if (section) {
            this.audio.sectionOpen();
          } else {
            this.audio.sectionClose();
          }
          return this._updateSectionTimeout = null;
        }, 0);
      });

      // To isolate recreation of groups, we depend on group names.
      this.lastActiveGroupName = new ComputedField(() => {
        var ref;
        return (ref = _.last(this.activeGroups())) != null ? ref.name() : void 0;
      });
      this.autorun(computation => {
        var lastActiveGroup;
        this.lastActiveGroupName();
        lastActiveGroup = Tracker.nonreactive(() => {
          return _.last(this.activeGroups());
        });
        Meteor.clearTimeout(this._updateSectionTimeout);
        return this._updateGroupTimeout = Meteor.setTimeout(() => {
          if (lastActiveGroup) {
            this.audio.groupOpen();
          } else {
            this.audio.groupClose();
          }
          return this._updateGroupTimeout = null;
        }, 0);
      });
      this.assetGroupIsActive = new ComputedField(() => {
        var activeGroups, ref;
        if (!(activeGroups = this.activeGroups())) {
          return false;
        }
        return (ref = _.last(activeGroups)) != null ? ref.assets : void 0;
      });
      this.visibleGroupsCount = new ComputedField(() => {
        var activeGroups, activeSection, count, group, i, len;
        if (!(activeSection = this.activeSection())) {
          return 0;
        }
        count = activeSection.groups().length;
        if (!(activeGroups = this.activeGroups())) {
          return count;
        }
        for (i = 0, len = activeGroups.length; i < len; i++) {
          group = activeGroups[i];
          if (group.groups) {
            count += group.groups().length;
          }
        }
        return count;
      });
      this.lastActiveGroupGroupsCount = new ComputedField(() => {
        var activeGroups, activeSection, base;
        if (!(activeSection = this.activeSection())) {
          return 0;
        }
        activeGroups = this.activeGroups();
        if (activeGroups.length) {
          return (typeof (base = _.last(activeGroups)).groups === "function" ? base.groups().length : void 0) || 0;
        } else {
          return activeSection.groups().length;
        }
      });
      this.minimizableGroupsCount = new ComputedField(() => {
        return this.visibleGroupsCount() - this.lastActiveGroupGroupsCount();
      });
      this.minimalGroupsHeight = new ComputedField(() => {
        var activeGroups;
        if (!(activeGroups = this.activeGroups())) {
          return 0;
        }
        return activeGroups.length * this.maxInitialGroupHeight;
      });
      this.minimizableGroupHeight = new ComputedField(() => {
        var heightPerGroup, minimizableHeightSpace;
        minimizableHeightSpace = this.groupsMaxTotalHeight - this.minimalGroupsHeight() - this.maxInitialGroupHeight * this.lastActiveGroupGroupsCount();
        heightPerGroup = Math.floor(minimizableHeightSpace / this.minimizableGroupsCount());
        return Math.min(heightPerGroup, this.maxInitialGroupHeight);
      });
      this.minimizedGroupHeight = new ComputedField(() => {
        var heightPerGroup, minimizedHeightSpace;
        minimizedHeightSpace = this.groupsMaxTotalHeight - this.activeGroupHeight - this.minimalGroupsHeight();
        heightPerGroup = Math.floor(minimizedHeightSpace / (this.visibleGroupsCount() - 1));
        return _.clamp(heightPerGroup, this.minMinimizedGroupHeight, this.maxMinimizedGroupHeight);
      });
      this.initialGroupHeight = new ComputedField(() => {
        var heightPerGroup, initialHeightSpace, lastActiveGroupGroupsCount;
        if (!(lastActiveGroupGroupsCount = this.lastActiveGroupGroupsCount())) {
          return this.maxInitialGroupHeight;
        }
        initialHeightSpace = this.groupsMaxTotalHeight - this.minimalGroupsHeight() - this.minimizedGroupHeight() * this.minimizableGroupsCount();
        heightPerGroup = Math.floor(initialHeightSpace / lastActiveGroupGroupsCount);
        return Math.min(heightPerGroup, this.maxInitialGroupHeight);
      });
      this.inactiveGroupHeight = new ComputedField(() => {
        if (this.assetGroupIsActive()) {
          return this.minimizedGroupHeight();
        } else {
          return this.minimizableGroupHeight();
        }
      });
      this.activeGroupHeaderHeight = new ComputedField(() => {
        if (this.assetGroupIsActive()) {
          return this.reducedGroupHeight;
        } else {
          return this.maxInitialGroupHeight;
        }
      });
      this.activeSectionHeight = new ComputedField(() => {
        var activeGroups, activeSection, groups, height;
        if (!(activeSection = this.activeSection())) {
          return 0;
        }
        groups = activeSection.groups();
        activeGroups = this.activeGroups();
        if (activeGroups.length) {
          return height = this.sectionHeight + (groups.length - 1) * this.inactiveGroupHeight() + this.groupHeight(activeGroups[0], activeGroups);
        } else {
          return height = this.sectionHeight + groups.length * this.initialGroupHeight();
        }
      });
      return this.inactiveSectionHeight = new ComputedField(() => {
        var activeSectionHeight, heightForInactiveSections, sections, sectionsTotalHeight;
        if (!this.activeSection()) {
          return this.sectionHeight;
        }
        sections = this.sections();
        activeSectionHeight = this.activeSectionHeight();
        sectionsTotalHeight = (sections.length - 1) * this.sectionHeight + activeSectionHeight;
        if (sectionsTotalHeight > this.sectionsMaxTotalHeight) {
          // We need to decrease inactive section heights to make them all fit into maximum total height.
          heightForInactiveSections = this.sectionsMaxTotalHeight - activeSectionHeight;
          return heightForInactiveSections / (sections.length - 1);
        } else {
          return this.sectionHeight;
        }
      });
    }
    onRendered() {
      super.onRendered(...arguments);

      // Allow cheating with the function keys.
      return $(document).on('keydown.pixelartacademy-pixelpad-apps-drawing-portfolio', event => {
        return this.onKeyDown(event);
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      $(document).off('.pixelartacademy-pixelpad-apps-drawing-portfolio');
      this._artworksDictionary.stop();
      this._newArtworkAsset.destroy();
      return this._importArtworkAsset.destroy();
    }
    _createGroupsField(sectionThingsProvider, level) {
      return new ComputedField(() => {
        var folder, folderId, folderInstances, folderInstancesById, folders, groupIndex, groups, i, j, len, len1, name1, sectionThing, sectionThings;
        groups = [];
        // Get section things and separate folders of things from them.
        sectionThings = sectionThingsProvider();
        folders = _.remove(sectionThings, sectionThing => {
          return sectionThing instanceof PAA.PixelPad.Apps.Drawing.Portfolio.Folder;
        });

        // Turn things into groups.
        groupIndex = 0;
        for (i = 0, len = sectionThings.length; i < len; i++) {
          sectionThing = sectionThings[i];
          (sectionThing => {
            var assets;
            assets = new ComputedField(() => {
              var asset, assetIndex, j, len1, ref, results;
              ref = sectionThing.assets();
              results = [];
              for (assetIndex = j = 0, len1 = ref.length; j < len1; assetIndex = ++j) {
                asset = ref[assetIndex];
                if (asset.urlParameter()) {
                  results.push(((asset, assetIndex) => {
                    return {
                      _id: asset.urlParameter(),
                      index: assetIndex,
                      asset: asset,
                      scale: () => {
                        return this._assetScale(asset);
                      }
                    };
                  })(asset, assetIndex));
                }
              }
              return results;
            });
            groups.push({
              level: level,
              thing: sectionThing,
              index: groupIndex,
              name: () => {
                return sectionThing.fullName();
              },
              noAssetsInstructions: () => {
                return typeof sectionThing.noAssetsInstructions === "function" ? sectionThing.noAssetsInstructions() : void 0;
              },
              assets: assets,
              content: () => {
                return typeof sectionThing.content === "function" ? sectionThing.content() : void 0;
              }
            });
            return groupIndex++;
          })(sectionThing);
        }

        // Turn folders into groups, merged by folder ID.
        folderInstancesById = {};
        for (j = 0, len1 = folders.length; j < len1; j++) {
          folder = folders[j];
          if (folderInstancesById[name1 = folder.id()] == null) {
            folderInstancesById[name1] = [];
          }
          folderInstancesById[folder.id()].push(folder);
        }
        for (folderId in folderInstancesById) {
          folderInstances = folderInstancesById[folderId];
          (folderInstances => {
            var folderThings;
            // We join the contents of all instances together.
            folderThings = new ComputedField(() => {
              var folderInstance;
              return _.flatten(function () {
                var k, len2, results;
                results = [];
                for (k = 0, len2 = folderInstances.length; k < len2; k++) {
                  folderInstance = folderInstances[k];
                  results.push(folderInstance.things);
                }
                return results;
              }());
            });

            // We take the first instance to act as the provider of the information for this group.
            folder = folderInstances[0];
            (folder => {
              return groups.push({
                level: level,
                index: groupIndex,
                name: () => {
                  return folder.displayName();
                },
                groups: this._createGroupsField(folderThings, level + 1)
              });
            })(folder);
            return groupIndex++;
          })(folderInstances);
        }
        return groups;
      });
    }
    _searchGroupForAssetWithUrlParameter(group, urlParameter, currentGroups) {
      var assetData, i, j, len, len1, ref, ref1, result;
      if (group.assets) {
        ref = group.assets();
        for (i = 0, len = ref.length; i < len; i++) {
          assetData = ref[i];
          if (assetData.asset.urlParameter() === urlParameter) {
            return {
              groups: currentGroups,
              asset: assetData
            };
          }
        }
      }
      if (group.groups) {
        ref1 = group.groups();
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          group = ref1[j];
          if (result = this._searchGroupForAssetWithUrlParameter(group, urlParameter, [...currentGroups, group])) {
            return result;
          }
        }
      }
      return null;
    }
  }
  ;

  // We call register here because it is the last in the inheritance chain.
  Portfolio.register(Portfolio.id());
  Portfolio.ExternalSoftware = {
    Aseprite: 'Aseprite',
    PyxelEdit: 'Pyxel Edit',
    GraphicsGale: 'GraphicsGale',
    ProMotion: 'Pro Motion',
    GrafX2: 'GrafX2',
    Photoshop: 'Photoshop',
    GIMP: 'GIMP',
    Krita: 'Krita',
    Pixaki: 'Pixaki',
    Dottable: 'Dottable',
    Pixly: 'Pixly',
    PixelArtStudio: 'Pixel Art Studio'
  };
  return Portfolio;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/asset.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.Asset = class Asset {
  displayName() {
    throw new AE.NotImplementedException("You must specify the asset name.");
  }
  description() {
    return ''; // Override to provide a description of the asset.
  }
  styleClasses() {
    return ''; // Override to provide a string with class names for styling the asset.
  }
  editorStyleClasses() {
    return ''; // Override to provide a string with class names for styling the surrounding editor.
  }
  width() {
    throw new AE.NotImplementedException("You must specify the asset width.");
  }
  height() {
    throw new AE.NotImplementedException("You must specify the asset height.");
  }
  portfolioBorderWidth() {
    return 0;
  }
  pixelArtScaling() {
    return true;
  }
  portfolioComponent() {
    throw new AE.NotImplementedException("You must provide a component to render the asset in the portfolio.");
  }
  urlParameter() {
    throw new AE.NotImplementedException("You must provide the URL parameter to identify this asset.");
  }
  ready() {
    throw new AE.NotImplementedException("You must report when all asset's information is ready to be used.");
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"folder.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/folder.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.Folder = class Folder {
  static id() {
    throw new AE.NotImplementedException("You must specify the folder ID.");
  }
  static displayName() {
    throw new AE.NotImplementedException("You must specify the folder display name.");
  }
  static initialize() {
    // On the server, create this folder's translated name.
    if (Meteor.isServer) {
      return Document.startup(() => {
        var translationNamespace;
        if (Meteor.settings.startEmpty) {
          return;
        }
        translationNamespace = this.id();
        return AB.createTranslation(translationNamespace, 'displayName', this.displayName());
      });
    }
  }
  constructor() {
    var translationNamespace;
    // Subscribe to this asset's translations.
    translationNamespace = this.id();
    this._translationSubscription = AB.subscribeNamespace(translationNamespace);
    this.things = [];
  }
  destroy() {
    return this._translationSubscription.stop();
  }
  id() {
    return this.constructor.id();
  }
  displayName() {
    return AB.translate(this._translationSubscription, 'displayName').text;
  }
  displayNameTranslation() {
    return AB.translation(this._translationSubscription, 'displayName');
  }
  styleClasses() {
    return ''; // Override to provide a string with class names for styling the asset.
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"archive.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/archive.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.Archive = function () {
  class Archive extends PAA.PixelPad.Apps.Drawing.Portfolio.Folder {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Archive';
    }
    static displayName() {
      return "Archive";
    }
  }
  ;
  Archive.initialize();
  return Archive;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"forms":{"forms.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/forms/forms.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Portfolio.Forms = class Forms {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/forms/asset.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Asset = class Asset extends PAA.PixelPad.Apps.Drawing.Portfolio.Asset {
  // Id string for this asset used to identify the asset in code.
  static id() {
    throw new AE.NotImplementedException("You must specify asset's id.");
  }

  // String to represent the asset in the UI. Note that we can't use
  // 'name' since it's an existing property holding the class name.
  static displayName() {
    throw new AE.NotImplementedException("You must specify the asset name.");
  }

  // String with more information about what this asset represents.
  static description() {
    throw new AE.NotImplementedException("You must specify the asset's description.");
  }
  static initialize() {
    // On the server, create this assets's translated names.
    if (Meteor.isServer) {
      return Document.startup(() => {
        var i, len, property, ref, results, translationNamespace;
        if (Meteor.settings.startEmpty) {
          return;
        }
        translationNamespace = this.id();
        ref = ['displayName', 'description'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          property = ref[i];
          results.push(AB.createTranslation(translationNamespace, property, this[property]()));
        }
        return results;
      });
    }
  }
  constructor() {
    var translationNamespace;
    super(...arguments);

    // Subscribe to this asset's translations.
    translationNamespace = this.id();
    this._translationSubscription = AB.subscribeNamespace(translationNamespace);
  }
  destroy() {
    return this._translationSubscription.stop();
  }
  id() {
    return this.constructor.id();
  }
  displayName() {
    return AB.translate(this._translationSubscription, 'displayName').text;
  }
  displayNameTranslation() {
    return AB.translation(this._translationSubscription, 'displayName');
  }
  description() {
    return AB.translate(this._translationSubscription, 'description').text;
  }
  descriptionTranslation() {
    return AB.translation(this._translationSubscription, 'description');
  }
  width() {
    return 48;
  }
  height() {
    return 64;
  }
  ready() {
    return true;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"extras":{"extras.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/forms/extras/extras.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Extras = function () {
  class Extras extends AM.Component {
    constructor(options1) {
      super(...arguments);
      this.options = options1;
      this.properties = new ReactiveField(this.options.initialProperties || []);
      this.restrictedColorsError = new ReactiveField(false);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.extras = new ComputedField(() => {
        var extras, index, properties, property;
        properties = this.properties();
        extras = function () {
          var i, len, results;
          results = [];
          for (index = i = 0, len = properties.length; i < len; index = ++i) {
            property = properties[index];
            results.push({
              _id: Random.id(),
              index: index,
              type: property.type,
              value: property.value
            });
          }
          return results;
        }();

        // Add an extra for the new property.
        extras.push({
          _id: Random.id(),
          index: extras.length
        });
        return extras;
      });
      return this.blankExtras = new ComputedField(() => {
        var properties, ref;
        properties = this.properties();
        if (properties.length > 4) {
          return;
        }
        return function () {
          var results = [];
          for (var i = ref = properties.length; ref <= 5 ? i < 5 : i > 5; ref <= 5 ? i++ : i--) {
            results.push(i);
          }
          return results;
        }.apply(this);
      });
    }
    updatePropertyAtIndex(index, type, value) {
      var properties, property;
      properties = this.properties();
      property = {
        type,
        value
      };
      if (properties[index]) {
        properties[index] = property;
      } else {
        properties.push(property);
      }

      // Enforce mutually exclusive properties.
      if (type === this.constructor.Extra.Types.RestrictedColors) {
        _.remove(properties, property => {
          return property.type === this.constructor.Extra.Types.ColorPalette;
        });
      } else if (type === this.constructor.Extra.Types.ColorPalette) {
        _.remove(properties, property => {
          return property.type === this.constructor.Extra.Types.RestrictedColors;
        });
      }
      return this.properties(properties);
    }
    removePropertyAtIndex(index) {
      var properties;
      properties = this.properties();
      properties.splice(index, 1);
      return this.properties(properties);
    }
    validateRestrictedColors() {
      var properties;
      properties = this.properties();
      return this.restrictedColorsError(!_.find(properties, property => {
        return property.type === this.constructor.Extra.Types.RestrictedColors;
      }));
    }
  }
  ;
  Extras.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras');
  Extras.initializeDataComponent();
  Extras.Extra = function () {
    class Extra extends AM.Component {
      onCreated() {
        super.onCreated(...arguments);
        return this.extras = this.parentComponent();
      }
      updateType(newType) {
        var index, lastType, value;
        index = this.data().index;
        lastType = this.data().type;

        // Remove property when deselected.
        if (!newType) {
          return this.extras.removePropertyAtIndex(index);

          // Select defaults when changing the type.
        } else if (newType !== lastType) {
          switch (newType) {
            case this.constructor.Types.ColorPalette:
              value = LOI.Assets.Palette.SystemPaletteNames.Black;
              break;
            case this.constructor.Types.RestrictedColors:
              value = LOI.Assets.Palette.SystemPaletteNames.Black;
              break;
            case this.constructor.Types.PixelArtScaling:
              value = true;
              break;
            case this.constructor.Types.PixelArtEvaluation:
              value = true;
              break;
            case this.constructor.Types.CanvasBorder:
              value = true;
          }
          this.extras.updatePropertyAtIndex(index, newType, value);
          if (newType === this.constructor.Types.RestrictedColors) {
            return this.extras.validateRestrictedColors();
          }
        }
      }
      updateValue(newValue) {
        var index, type;
        index = this.data().index;
        type = this.data().type;
        if (newValue) {
          return this.extras.updatePropertyAtIndex(index, type, newValue);
        } else {
          // Remove the property.
          return this.extras.removePropertyAtIndex(index);
        }
      }
      events() {
        return super.events(...arguments).concat({
          'click .color-palette': this.onClickColorPalette
        });
      }
      async onClickColorPalette(event) {
        var drawing, extra, selectedPalette;
        extra = this.currentData();
        drawing = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
        selectedPalette = await drawing.showPaletteSelection(extra.value);
        if (selectedPalette) {
          return this.updateValue(selectedPalette.name);
        }
      }
    }
    ;
    Extra.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra');
    Extra.Types = {
      RestrictedColors: 'RestrictedColors',
      ColorPalette: 'ColorPalette',
      PixelArtScaling: 'PixelArtScaling',
      PixelArtEvaluation: 'PixelArtEvaluation',
      CanvasBorder: 'CanvasBorder'
    };
    Extra.TypeNames = {
      RestrictedColors: '受限颜色',
      ColorPalette: '调色板',
      PixelArtScaling: '像素画缩放',
      PixelArtEvaluation: '像素艺术评估',
      CanvasBorder: '画布边框'
    };
    Extra.MultiselectionTypes = [Extra.Types.ColorPalette];
    Extra.Type = function () {
      class Type extends AM.DataInputComponent {
        constructor() {
          super(...arguments);
          this.type = AM.DataInputComponent.Types.Select;
        }
        onCreated() {
          super.onCreated(...arguments);
          return this.extraComponent = this.parentComponent();
        }
        options() {
          var Extra, active, allowedTypes, existingProperty, multiSelection, name, options, properties, ref, type;
          options = [{
            name: '',
            value: null
          }];
          Extra = PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra;
          ref = Extra.TypeNames;
          for (type in ref) {
            name = ref[type];
            if (allowedTypes = this.extraComponent.extras.options.allowedTypes) {
              if (indexOf.call(allowedTypes, type) < 0) {
                continue;
              }
            }

            // Add the option if it's the currently active one, if it's a multi-selection one, or if it's not yet selected.
            active = this.data().type === type;
            multiSelection = indexOf.call(Extra.MultiselectionTypes, type) >= 0;
            properties = this.extraComponent.extras.properties();
            existingProperty = _.find(properties, function (property) {
              return property.type === type;
            });
            if (active || multiSelection || !existingProperty) {
              options.push({
                name: name,
                value: type
              });
            }
          }
          return options;
        }
        load() {
          return this.data().type;
        }
        save(value) {
          return this.extraComponent.updateType(value);
        }
      }
      ;
      Type.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra.Type');
      return Type;
    }.call(this);
    Extra.Value = class Value extends AM.DataInputComponent {
      onCreated() {
        super.onCreated(...arguments);
        return this.extraComponent = this.parentComponent();
      }
      load() {
        return this.data().value;
      }
      save(value) {
        return this.extraComponent.updateValue(value);
      }
    };
    Extra.PixelArtScaling = function () {
      class PixelArtScaling extends Extra.Value {
        constructor() {
          super(...arguments);
          this.type = AM.DataInputComponent.Types.Checkbox;
        }
      }
      ;
      PixelArtScaling.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra.PixelArtScaling');
      return PixelArtScaling;
    }.call(this);
    Extra.PixelArtEvaluation = function () {
      class PixelArtEvaluation extends Extra.Value {
        constructor() {
          super(...arguments);
          this.type = AM.DataInputComponent.Types.Checkbox;
        }
      }
      ;
      PixelArtEvaluation.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra.PixelArtEvaluation');
      return PixelArtEvaluation;
    }.call(this);
    Extra.CanvasBorder = function () {
      class CanvasBorder extends Extra.Value {
        constructor() {
          super(...arguments);
          this.type = AM.DataInputComponent.Types.Checkbox;
        }
      }
      ;
      CanvasBorder.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra.CanvasBorder');
      return CanvasBorder;
    }.call(this);
    Extra.Palette = function () {
      class Palette extends Extra.Value {
        constructor() {
          super(...arguments);
          this.type = AM.DataInputComponent.Types.Select;
        }
        options() {
          var i, len, options, palette, palettes;
          options = [{
            name: '',
            value: null
          }];
          palettes = LOI.Assets.Palette.documents.fetch({
            category: {
              $exists: true
            }
          }, {
            sort: {
              name: 1
            }
          });
          for (i = 0, len = palettes.length; i < len; i++) {
            palette = palettes[i];
            options.push({
              name: palette.name,
              value: palette.name
            });
          }
          return options;
        }
      }
      ;
      Palette.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra.Palette');
      return Palette;
    }.call(this);
    return Extra;
  }.call(this);
  return Extras;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.extras.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/forms/extras/template.extras.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-portfolio-forms-extras"
  }, HTML.Raw('\n    <div class="extras-title">\n      <span class="text">额外物品</span>\n    </div>\n    '), HTML.DIV({
    class: "extras"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("extras"));
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Forms", "Extras", "Extra"));
    }), "\n      " ];
  }), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("blankExtras"));
  }, function() {
    return HTML.Raw('\n        <div class="extra">\n          <div class="name"></div>\n          <div class="value"></div>\n        </div>\n      ');
  }), "\n    "), "\n  ");
}));

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra", (function() {
  var view = this;
  return HTML.DIV({
    class: "extra"
  }, "\n    ", HTML.DIV({
    class: "name"
  }, "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Forms", "Extras", "Extra", "Type"));
  }), "\n    "), "\n    ", HTML.DIV({
    class: "value"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "RestrictedColors");
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "color-palette"
    }, "\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Forms", "Extras", "Extra", "Palette"));
    }), "\n        "), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "ColorPalette");
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "color-palette"
    }, "\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Forms", "Extras", "Extra", "Palette"));
    }), "\n        "), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "PixelArtScaling");
  }, function() {
    return [ "\n        ", HTML.LABEL("\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Forms", "Extras", "Extra", "PixelArtScaling"));
    }), HTML.Raw('<span class="checkmark"></span>\n        ')), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "PixelArtEvaluation");
  }, function() {
    return [ "\n        ", HTML.LABEL("\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Forms", "Extras", "Extra", "PixelArtEvaluation"));
    }), HTML.Raw('<span class="checkmark"></span>\n        ')), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "CanvasBorder");
  }, function() {
    return [ "\n        ", HTML.LABEL("\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "Forms", "Extras", "Extra", "CanvasBorder"));
    }), HTML.Raw('<span class="checkmark"></span>\n        ')), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"artworkasset":{"artworkasset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/artworkasset.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset = class ArtworkAsset extends PAA.PixelPad.Apps.Drawing.Portfolio.Asset {
  constructor(artworkId) {
    super(...arguments);
    this.artworkId = artworkId;
    this.artwork = new ComputedField(() => {
      return PADB.Artwork.documents.findOne(this.artworkId);
    });
    this.document = new ComputedField(() => {
      var artwork, documentClassName, documentRepresentation, i, id, len, ref, url;
      if (!(artwork = this.artwork())) {
        return;
      }
      if (!(documentRepresentation = artwork.firstDocumentRepresentation())) {
        return;
      }
      // Extract the type and ID.
      url = new URL(Meteor.absoluteUrl(documentRepresentation.url));
      id = url.searchParams.get('id');
      ref = ['Sprite', 'Bitmap'];
      for (i = 0, len = ref.length; i < len; i++) {
        documentClassName = ref[i];
        if (_.startsWith(documentRepresentation.url, LOI.Assets[documentClassName].documentUrl())) {
          return LOI.Assets[documentClassName].getDocumentForId(id);
        }
      }
      return null;
    });
    this._palettesAutorun = Tracker.autorun(computation => {
      var document, paletteIds;
      if (!(document = this.document())) {
        return;
      }
      if (!(paletteIds = document.getAllPaletteIds())) {
        return;
      }
      return LOI.Assets.Palette.forIds.subscribeContent(paletteIds);
    });
    this.portfolioComponent = new this.constructor.PortfolioComponent(this);
    this.clipboardComponent = new this.constructor.ClipboardComponent(this);
    this.changeArtworkComponent = new this.constructor.ChangeArtwork(this);
    this.exportArtworkComponent = new this.constructor.ExportArtwork(this);
  }
  destroy() {
    return this._palettesAutorun.stop();
  }
  displayName() {
    var ref;
    return ((ref = this.artwork()) != null ? ref.title : void 0) || '未命名';
  }
  description() {
    var bounds, document, palette, parts;
    if (!(document = this.document())) {
      return;
    }
    parts = [];
    if (bounds = document.bounds) {
      parts.push("尺寸：".concat(bounds.width, "x").concat(bounds.height));
    }
    if (palette = document.palette) {
      palette.refresh();
      parts.push("调色板：".concat({"1-bit Black and White": "1 位黑白", "Black": "黑色"}[palette.name] || palette.name));
    }
    return parts.join(', ');
  }
  width() {
    var ref, ref1;
    return ((ref = this.document()) != null ? (ref1 = ref.bounds) != null ? ref1.width : void 0 : void 0) || 1;
  }
  height() {
    var ref, ref1;
    return ((ref = this.document()) != null ? (ref1 = ref.bounds) != null ? ref1.height : void 0 : void 0) || 1;
  }
  portfolioBorderWidth() {
    var ref, ref1;
    if ((ref = this.document()) != null ? (ref1 = ref.properties) != null ? ref1.canvasBorder : void 0 : void 0) {
      return 6;
    } else {
      return 0;
    }
  }
  pixelArtScaling() {
    var ref, ref1;
    return (ref = this.document()) != null ? (ref1 = ref.properties) != null ? ref1.pixelArtScaling : void 0 : void 0;
  }
  previewInfo() {
    if (!this.clipboardComponent.isCreated()) {
      return;
    }
    return this.clipboardComponent.callFirstWith(null, 'previewInfo');
  }
  urlParameter() {
    return this.artworkId;
  }
  ready() {
    // Asset is ready when the artwork document has been loaded.
    return this.document();
  }
  freeform() {
    var document, ref;
    if (!(document = this.document())) {
      return;
    }
    return !((ref = document.bounds) != null ? ref.fixed : void 0);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/portfoliocomponent/portfoliocomponent.c //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {
    constructor(artworkAsset) {
      super(...arguments);
      this.artworkAsset = artworkAsset;
    }
    canvasBorderClass() {
      var document;
      if (!(document = this.artworkAsset.document())) {
        return;
      }
      if (document.properties.canvasBorder) {
        return 'canvas-border';
      }
    }
    smoothScalingClass() {
      var document;
      if (!(document = this.artworkAsset.document())) {
        return;
      }
      if (!document.properties.pixelArtScaling) {
        return 'smooth-scaling';
      }
    }
    canvasStyle() {
      var assetData, scale, style;
      assetData = this.parentDataWith('scale');
      scale = assetData.scale();
      style = {
        width: "".concat(this.artworkAsset.width() * scale, "rem"),
        height: "".concat(this.artworkAsset.height() * scale, "rem")
      };
      return style;
    }
    bitmapImage() {
      var document;
      if (!(document = this.artworkAsset.document())) {
        return;
      }
      return new LOI.Assets.Components.BitmapImage({
        bitmapId: () => {
          return document._id;
        },
        loadPalette: true
      });
    }
  }
  ;
  PortfolioComponent.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/portfoliocomponent/template.portfolioco //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.PortfolioComponent");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.PortfolioComponent"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.PortfolioComponent", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-portfolio-artworkasset-portfoliocomponent ", Spacebars.mustache(view.lookup("canvasBorderClass")), " ", Spacebars.mustache(view.lookup("smoothScalingClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("canvasStyle"));
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("bitmapImage"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("bitmapImage"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"clipboardcomponent":{"clipboardcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/clipboardcomponent/clipboardcomponent.c //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ClipboardComponent = function () {
  class ClipboardComponent extends AM.Component {
    constructor(artworkAsset) {
      super(...arguments);
      this.artworkAsset = artworkAsset;
      this.changeArtworkActive = new ReactiveField(false);
      this.exportArtworkActive = new ReactiveField(false);
    }
    mixins() {
      return [PAA.Practice.Project.Asset.Bitmap.ClipboardComponent.PreviewInfoMixin];
    }
    onCreated() {
      super.onCreated(...arguments);
      this.drawing = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
      this.palette = new ComputedField(() => {
        var palette, ref;
        if (!(palette = (ref = this.artworkAsset.document()) != null ? ref.palette : void 0)) {
          return;
        }
        return LOI.Assets.Palette.documents.findOne(palette._id);
      });
      this.extras = new ComputedField(() => {
        var Extra, document, extras, propertyName, typePropertyName;
        if (!(document = this.artworkAsset.document())) {
          return;
        }
        extras = [];
        Extra = PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Extras.Extra;
        for (propertyName in document.properties) {
          typePropertyName = _.upperFirst(propertyName);
          if (typePropertyName === Extra.Types.PixelArtScaling) {
            // TODO: Remove when pixel art scaling is an option.
            continue;
          }
          if (Extra.Types[typePropertyName]) {
            extras.push(Extra.TypeNames[typePropertyName]);
          }
        }
        return extras.join(', ');
      });
      // Calculate asset size.
      return this.assetSize = new ComputedField(() => {
        var assetData, document, options, ref, ref1;
        if (!(document = this.artworkAsset.document())) {
          return;
        }
        if (!(assetData = this.drawing.portfolio().displayedAsset())) {
          return;
        }
        options = {
          border: (ref = document.properties) != null ? ref.canvasBorder : void 0,
          pixelArtScaling: (ref1 = document.properties) != null ? ref1.pixelArtScaling : void 0
        };
        return PAA.PixelPad.Apps.Drawing.Clipboard.calculateAssetSize(assetData.scale(), document.bounds, options);
      }, EJSON.equals);
    }
    onBackButton() {
      if (this.secondPageActive()) {
        this.closeSecondPage();

        // Inform that we've handled the back button.
        return true;
      }
    }
    changeArtwork() {
      this.changeArtworkActive(true);
      return this.drawing.clipboard().audio.secondPageOpen();
    }
    exportArtwork() {
      this.exportArtworkActive(true);
      return this.drawing.clipboard().audio.secondPageOpen();
    }
    closeSecondPage() {
      this.changeArtworkActive(false);
      this.exportArtworkActive(false);
      return this.drawing.clipboard().audio.secondPageClose();
    }
    secondPageActive() {
      return this.changeArtworkActive() || this.exportArtworkActive();
    }
    canEdit() {
      return PAA.PixelPad.Apps.Drawing.canEdit();
    }
    canExport() {
      var document, ref, ref1;
      // We can export if there's at least one layer.
      document = this.artworkAsset.document();
      return ((ref = document.layers) != null ? ref.length : void 0) || ((ref1 = document.layerGroups) != null ? ref1.length : void 0);
    }
    assetPlaceholderStyle() {
      var assetSize;
      if (!(assetSize = this.assetSize())) {
        return;
      }
      return {
        width: "".concat(assetSize.contentWidth + 2 * assetSize.borderWidth, "rem"),
        height: "".concat(assetSize.contentHeight + 2 * assetSize.borderWidth, "rem")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .edit-button': this.onClickEditButton,
        'click .export-button': this.onClickExportButton,
        'click .trash-button': this.onClickTrashButton,
        'click .property.extras': this.onClickPropertyExtras,
        'click .back-button': this.onClickBackButton,
        'click .asset-placeholder': this.onClickAssetPlaceholder
      });
    }
    onClickEditButton(event) {
      return AB.Router.changeParameter('parameter4', 'edit');
    }
    onClickExportButton(event) {
      return this.exportArtwork();
    }
    onClickTrashButton(event) {
      var dialog;
      dialog = new LOI.Components.Dialog({
        message: "你确定要删除这个作品吗？",
        buttons: [{
          text: "删除",
          value: true
        }, {
          text: "取消"
        }]
      });
      return LOI.adventure.showActivatableModalDialog({
        dialog: dialog,
        callback: () => {
          var artwork, artworks;
          if (!dialog.result) {
            return;
          }
          artwork = this.artworkAsset.artwork();

          // Remove artwork from the drawing app.
          artworks = PAA.PixelPad.Apps.Drawing.state('artworks');
          _.remove(artworks, artworkEntry => {
            return artworkEntry.artworkId === artwork._id;
          });
          PAA.PixelPad.Apps.Drawing.state('artworks', artworks);

          // Navigate away from the artwork.
          AB.Router.changeParameter('parameter3', null);

          // With a delay, remove the bitmap and the artwork from the database.
          return Meteor.setTimeout(() => {
            return PAA.Practice.Artworks.remove(artwork);
          }, 1000);
        }
      });
    }
    onClickPropertyExtras(event) {
      return this.changeArtwork();
    }
    onClickBackButton(event) {
      return this.closeSecondPage();
    }
    onClickAssetPlaceholder(event) {
      var artworkWithEmbeddedImage, bitmapCanvas, engineBitmap;
      engineBitmap = new LOI.Assets.Engine.PixelImage.Bitmap({
        asset: this.artworkAsset.document
      });
      if (!(bitmapCanvas = engineBitmap.getCanvas())) {
        // There are no pixels in the bitmap yet, so just return an empty 1px image.
        bitmapCanvas = new AM.Canvas(1, 1);
      }
      artworkWithEmbeddedImage = _.clone(this.artworkAsset.artwork());
      artworkWithEmbeddedImage.image = {
        src: bitmapCanvas.toDataURL('image/png'),
        pixelScale: 1
      };
      return LOI.adventure.interface.focusArtworks([artworkWithEmbeddedImage], {
        captionComponentClass: PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ArtworkCaption
      });
    }
  }
  ;
  ClipboardComponent.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ClipboardComponent');
  ClipboardComponent.initializeDataComponent();
  ClipboardComponent.Title = function () {
    class Title extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.realtime = false;
        this.placeholder = "未命名";
      }
      load() {
        var artwork;
        artwork = this.currentData();
        return artwork.title;
      }
      save(value) {
        var artwork;
        artwork = this.currentData();
        return PADB.Artwork.updateArtwork(artwork._id, {
          title: value
        });
      }
    }
    ;
    Title.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent.Title');
    return Title;
  }.call(this);
  return ClipboardComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.clipboardcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/clipboardcomponent/template.clipboardco //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ClipboardComponent");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ClipboardComponent"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ClipboardComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-portfolio-artworkasset-clipboardcomponent ", Spacebars.mustache(view.lookup("activeAssetClass")), " ", Spacebars.mustache(view.lookup("editorActiveClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("secondPageActive"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("changeArtworkActive"));
    }, function() {
      return [ "\n        ", Blaze._TemplateWith(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("artworkAsset"), "changeArtworkComponent"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("Render"));
      }), "\n      " ];
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("exportArtworkActive"));
    }, function() {
      return [ "\n        ", Blaze._TemplateWith(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("artworkAsset"), "exportArtworkComponent"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("Render"));
      }), "\n      " ];
    }), HTML.Raw('\n      <button class="page-first-turned back-button"></button>\n    ') ];
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "page-first"
    }, "\n        ", HTML.DIV({
      class: function() {
        return [ "asset-info ", Spacebars.mustache(view.lookup("styleClasses")) ];
      }
    }, "\n          ", Spacebars.With(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("artworkAsset"), "artwork"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: "name"
      }, Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "NewArtwork", "ClipboardComponent", "Title"));
      })), "\n          " ];
    }), "\n          ", Spacebars.With(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("artworkAsset"), "document"));
    }, function() {
      return [ "\n            ", HTML.UL({
        class: "properties"
      }, "\n              ", HTML.LI({
        class: "property dimensions"
      }, HTML.Raw('\n                <span class="property-name">尺寸</span>:\n                  '), Spacebars.With(function() {
        return Spacebars.call(view.lookup("bounds"));
      }, function() {
        return [ "\n                    ", Blaze.View("lookup:width", function() {
          return Spacebars.mustache(view.lookup("width"));
        }), "×", Blaze.View("lookup:height", function() {
          return Spacebars.mustache(view.lookup("height"));
        }), Blaze.If(function() {
          return Spacebars.call(view.lookup("freeform"));
        }, function() {
          return ",";
        }), "\n                  " ];
      }), "\n                  ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("artworkAsset"), "freeform"));
      }, function() {
        return "freeform";
      }), "\n              "), "\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("palette"));
      }, function() {
        return [ "\n                ", HTML.LI({
          class: "property palette"
        }, HTML.Raw('\n                  <span class="property-name">调色板</span>:\n                  '), Blaze.If(function() {
          return Spacebars.call(view.lookup("palette"));
        }, function() {
          return [ "\n                    ", Blaze.If(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("palette"), "lospecSlug"));
          }, function() {
            return [ "\n                      ", HTML.A({
              href: function() {
                return [ "https://lospec.com/palette-list/", Spacebars.mustache(Spacebars.dot(view.lookup("palette"), "lospecSlug")) ];
              },
              target: "_blank"
            }, Blaze.View("lookup:palette.name", function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("palette"), "name"));
            })), "\n                    " ];
          }, function() {
            return [ "\n                      ", Blaze.View("lookup:palette.name", function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("palette"), "name"));
            }), "\n                    " ];
          }), "\n                  " ];
        }), "\n                "), "\n              " ];
      }), "\n              ", HTML.LI({
        class: "property extras"
      }, HTML.Raw('\n                <span class="property-name">额外</span>:\n                '), Blaze.If(function() {
        return Spacebars.call(view.lookup("extras"));
      }, function() {
        return [ "\n                  ", Blaze.View("lookup:extras", function() {
          return Spacebars.mustache(view.lookup("extras"));
        }), "\n                " ];
      }, function() {
        return "\n                  None\n                ";
      }), "\n              "), "\n            "), "\n            ", HTML.UL({
        class: "actions"
      }, "\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("canEdit"));
      }, function() {
        return HTML.Raw('\n                <li class="action">\n                  <button class="button edit-button">编辑</button>\n                </li>\n              ');
      }), "\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("canExport"));
      }, function() {
        return HTML.Raw('\n                <li class="action">\n                  <button class="button export-button">导出</button>\n                </li>\n              ');
      }), HTML.Raw('\n              <li class="action">\n                <button class="button trash-button">删除</button>\n              </li>\n            ')), "\n          " ];
    }), "\n        "), "\n        ", HTML.DIV(HTML.Attrs({
      class: "asset-placeholder"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("assetPlaceholderStyle"));
    })), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"changeartwork":{"changeartwork.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/changeartwork/changeartwork.coffee      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AMu, Extras, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
Extras = PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Extras;
PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ChangeArtwork = function () {
  class ChangeArtwork extends AM.Component {
    constructor(artworkAsset) {
      super(...arguments);
      this.artworkAsset = artworkAsset;
    }
    onCreated() {
      var documentProperties, properties;
      super.onCreated(...arguments);
      documentProperties = this.artworkAsset.document().properties;
      properties = [];
      if (documentProperties.pixelArtEvaluation) {
        properties.push({
          type: Extras.Extra.Types.PixelArtEvaluation,
          value: true
        });
      }
      if (documentProperties.canvasBorder) {
        properties.push({
          type: Extras.Extra.Types.CanvasBorder,
          value: true
        });
      }
      return this.extras = new Extras({
        allowedTypes: [Extras.Extra.Types.CanvasBorder, Extras.Extra.Types.PixelArtEvaluation],
        initialProperties: properties
      });
    }
    events() {
      return super.events(...arguments).concat({
        'submit .change-artwork-form': this.onSubmitChangeArtworkForm
      });
    }
    onSubmitChangeArtworkForm(event) {
      var action, bitmap, freshProperties, i, len, newProperty, oldProperty, property, ref, refreshedProperties, updatePropertyAction, value;
      event.preventDefault();

      // Add properties.
      freshProperties = {
        pixelArtScaling: true
      };
      ref = this.extras.properties();
      for (i = 0, len = ref.length; i < len; i++) {
        property = ref[i];
        if (property.type === Extras.Extra.Types.PixelArtEvaluation) {
          // Convert from a boolean to an editable pixel art evaluation.
          freshProperties.pixelArtEvaluation = {
            editable: true
          };
        } else {
          freshProperties[_.camelCase(property.type)] = property.value;
        }
      }
      bitmap = this.artworkAsset.document();
      refreshedProperties = _.clone(bitmap.properties);
      action = null;
      // Remove old properties that are not selected anymore.
      for (oldProperty in refreshedProperties) {
        if (!!freshProperties[oldProperty]) {
          continue;
        }
        updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(bitmap._id, bitmap, oldProperty, null);
        if (action) {
          action.append(updatePropertyAction);
        } else {
          action = updatePropertyAction;
        }
      }

      // Add new properties that don't exist yet.
      for (newProperty in freshProperties) {
        value = freshProperties[newProperty];
        if (!!refreshedProperties[newProperty]) {
          continue;
        }
        updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(bitmap._id, bitmap, newProperty, value);
        if (action) {
          action.append(updatePropertyAction);
        } else {
          action = updatePropertyAction;
        }
      }
      if (action) {
        // Update the document if any changes were made.
        AMu.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, action, new Date());
      }

      // Navigate back to the first page.
      return this.artworkAsset.clipboardComponent.closeSecondPage();
    }
  }
  ;
  ChangeArtwork.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ChangeArtwork');
  ChangeArtwork.initializeDataComponent();
  return ChangeArtwork;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.changeartwork.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/changeartwork/template.changeartwork.js //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ChangeArtwork");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ChangeArtwork"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ChangeArtwork", (function() {
  var view = this;
  return HTML.FORM({
    class: "pixelartacademy-pixelpad-apps-drawing-portfolio-artworkasset-changeartwork pixelartacademy-pixelpad-apps-drawing-portfolio-forms-form change-artwork-form"
  }, HTML.Raw('\n    <div class="form-title">更改作品表单</div>\n    '), HTML.DIV({
    class: "properties"
  }, "\n      ", HTML.LABEL({
    class: "property title"
  }, HTML.Raw('\n        <span class="name">作品：</span>\n        '), HTML.SPAN({
    class: "value"
  }, Blaze.View("lookup:artworkAsset.artwork.title", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("artworkAsset"), "artwork", "title"));
  })), "\n      "), "\n    "), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("extras"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", HTML.DIV({
    class: "submit-area"
  }, HTML.Raw('\n      <div class="title">签名</div>\n      '), HTML.DIV({
    class: "button-area"
  }, "\n        ", HTML.BUTTON({
    class: "submit-button"
  }, "\n          ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("adventure"), "isAdventureMode"));
  }, function() {
    return [ "\n            ", Blaze.View("lookup:currentCharacter.avatar.fullName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentCharacter"), "avatar", "fullName"));
    }), "\n          " ];
  }, function() {
    return [ "\n            ", Blaze.View("lookup:currentProfile.displayName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProfile"), "displayName"));
    }), "\n          " ];
  }), "\n        "), HTML.Raw('\n        <div class="prompt">\n          点击上方的线<br>\n          以进行更改\n        </div>\n      ')), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"exportartwork":{"exportartwork.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/exportartwork/exportartwork.coffee      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  AMu,
  Extras,
  JSZip,
  LOI,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AB = Artificial.Base;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
Extras = PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Extras;
JSZip = require('jszip');
PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork = function () {
  class ExportArtwork extends AM.Component {
    constructor(artworkAsset) {
      super(...arguments);
      this.artworkAsset = artworkAsset;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.bounds = new ComputedField(() => {
        var document;
        if (!(document = this.artworkAsset.document())) {
          return;
        }
        return document.bounds;
      });
      this.originalScale = new ComputedField(() => {
        var bounds;
        if (!(bounds = this.bounds())) {
          return;
        }
        return {
          factor: 1,
          width: bounds.width,
          height: bounds.height
        };
      });
      this.scaleFactors = new ComputedField(() => {
        var bounds, factor, fiveKFactor, fiveKHeightFactor, fiveKWidthFactor, hdFactor, hdHeightFactor, hdWidthFactor, longerSide, minimumPublishingFactor, preview, publishing, shorterSide, wallpaper;
        if (!(bounds = this.bounds())) {
          return;
        }

        // Prioritize publishing online where one side has to be at least 1000 pixels.
        minimumPublishingFactor = Math.ceil(1000 / Math.max(bounds.width, bounds.height));
        publishing = [minimumPublishingFactor];

        // Add preview factors from 2 to 5 when they are lower than the minimum publishing factor.
        preview = function () {
          var i, results;
          results = [];
          for (factor = i = 2; i <= 5; factor = ++i) {
            if (factor < minimumPublishingFactor) {
              results.push(factor);
            }
          }
          return results;
        }();

        // Add wallpaper factors when bigger than the minimum publishing factor.
        longerSide = Math.max(bounds.width, bounds.height);
        shorterSide = Math.min(bounds.width, bounds.height);
        hdWidthFactor = Math.ceil(1920 / longerSide);
        hdHeightFactor = Math.ceil(1080 / shorterSide);
        hdFactor = Math.max(hdWidthFactor, hdHeightFactor);
        fiveKWidthFactor = Math.ceil(5120 / longerSide);
        fiveKHeightFactor = Math.ceil(2880 / shorterSide);
        fiveKFactor = Math.max(fiveKWidthFactor, fiveKHeightFactor);
        wallpaper = [];
        if (hdFactor > minimumPublishingFactor) {
          wallpaper.push(hdFactor);
        }
        if (fiveKFactor > minimumPublishingFactor) {
          wallpaper.push(fiveKFactor);
        }
        if (hdFactor > 5 && indexOf.call(publishing, 5) < 0 && indexOf.call(preview, 5) < 0) {
          // Add 5x and 10x where they fit.
          publishing.push(5);
        }
        if (minimumPublishingFactor > 10) {
          preview.push(10);
        }
        if (hdFactor > 10 && indexOf.call(publishing, 10) < 0 && indexOf.call(preview, 10) < 0) {
          publishing.push(10);
        }
        return {
          preview,
          publishing,
          wallpaper
        };
      });
      this.previewScales = new ComputedField(() => {
        var ref;
        return this._createScales((ref = this.scaleFactors()) != null ? ref.preview : void 0);
      });
      this.publishingScales = new ComputedField(() => {
        var ref;
        return this._createScales((ref = this.scaleFactors()) != null ? ref.publishing : void 0);
      });
      return this.wallpaperScales = new ComputedField(() => {
        var i, len, longerSide, ref, scale, scales;
        scales = this._createScales((ref = this.scaleFactors()) != null ? ref.wallpaper : void 0);
        for (i = 0, len = scales.length; i < len; i++) {
          scale = scales[i];
          longerSide = Math.max(scale.width, scale.height);
          scale.factorDescription = longerSide < 5120 ? 'HD' : '5K';
        }
        return scales;
      });
    }
    _createScales(factors) {
      var bounds, factor, i, len, results;
      if (!factors) {
        return;
      }
      if (!(bounds = this.bounds())) {
        return;
      }
      results = [];
      for (i = 0, len = factors.length; i < len; i++) {
        factor = factors[i];
        results.push({
          factor: factor,
          width: bounds.width * factor,
          height: bounds.height * factor
        });
      }
      return results;
    }
    events() {
      return super.events(...arguments).concat({
        'submit .export-artwork-form': this.onSubmitExportArtworkForm
      });
    }
    async onSubmitExportArtworkForm(event) {
      var $link, arrayBuffer, artwork, blob, blobPromises, blobs, canvas, canvases, engineBitmap, factor, factorInput, factors, fileBlob, filename, i, len, link, name, resizedCanvas, result, sourceCanvas, zip;
      event.preventDefault();

      // Navigate back to the first page.
      // HACK: We do this at the start since waiting on the Electron save dialog will throw a timeout error.
      this.artworkAsset.clipboardComponent.closeSecondPage();
      factors = function () {
        var i, len, ref, results;
        ref = this.$('.factor-input:checked');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          factorInput = ref[i];
          results.push(parseInt($(factorInput).data('factor')));
        }
        return results;
      }.call(this);
      engineBitmap = new LOI.Assets.Engine.PixelImage.Bitmap({
        asset: this.artworkAsset.document
      });
      sourceCanvas = engineBitmap.getCanvas();
      canvases = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = factors.length; i < len; i++) {
          factor = factors[i];
          resizedCanvas = new AM.ReadableCanvas(sourceCanvas.width * factor, sourceCanvas.height * factor);
          resizedCanvas.context.imageSmoothingEnabled = false;
          resizedCanvas.context.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, resizedCanvas.width, resizedCanvas.height);
          resizedCanvas._factor = factor;
          results.push(resizedCanvas);
        }
        return results;
      }();
      artwork = this.artworkAsset.artwork();
      name = artwork.title || "untitled";
      blobPromises = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = canvases.length; i < len; i++) {
          canvas = canvases[i];
          results.push((canvas => {
            return new Promise((resolve, reject) => {
              return canvas.toBlob(blob => {
                return resolve({
                  blob: blob,
                  fileName: "".concat(name, " x").concat(canvas._factor, ".png")
                });
              });
            });
          })(canvas));
        }
        return results;
      }.call(this);
      blobs = await Promise.all(blobPromises);
      if (blobs.length === 1) {
        // Download the single png directly.
        fileBlob = blobs[0].blob;
        filename = blobs[0].fileName;
      } else {
        // Create a ZIP file with all the images.
        zip = new JSZip();
        for (i = 0, len = blobs.length; i < len; i++) {
          blob = blobs[i];
          zip.file(blob.fileName, blob.blob);
        }

        // Generate the zip file blob.
        fileBlob = await zip.generateAsync({
          type: 'blob'
        });
        filename = "".concat(name, ".zip");
      }
      switch (AB.ApplicationEnvironment.type()) {
        case AB.ApplicationEnvironment.Types.Browser:
          $link = $('<a style="display: none">');
          $('body').append($link);
          link = $link[0];
          link.href = URL.createObjectURL(fileBlob);
          link.download = filename;
          link.click();
          return $link.remove();
        case AB.ApplicationEnvironment.Types.Electron:
          arrayBuffer = await fileBlob.arrayBuffer();
          result = await Desktop.call('dialogs', 'saveAs', arrayBuffer, {
            title: 'Save Artwork',
            defaultPath: filename,
            buttonLabel: 'Save'
          });
          if (result && result !== true) {
            throw new AE.ExternalException("Saving failed.", filename, result);
          }
      }
    }
  }
  ;
  ExportArtwork.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork');
  ExportArtwork.initializeDataComponent();
  return ExportArtwork;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.exportartwork.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/exportartwork/template.exportartwork.js //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork", (function() {
  var view = this;
  return HTML.FORM({
    class: "pixelartacademy-pixelpad-apps-drawing-portfolio-artworkasset-exportartwork pixelartacademy-pixelpad-apps-drawing-portfolio-forms-form export-artwork-form"
  }, HTML.Raw('\n    <div class="form-title">导出作品表单</div>\n    <div class="prompt">\n      选择您要导出的尺寸。\n    </div>\n    '), HTML.DIV({
    class: "scales"
  }, HTML.Raw('\n      <div class="category">\n        <span class="name">原始</span>\n        <span class="description">适合进一步编辑、游戏使用和备份。</span>\n      </div>\n      '), Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("originalScale"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "ArtworkAsset", "ExportArtwork", "Scale"));
    });
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("previewScales"), "length"));
  }, function() {
    return [ HTML.Raw('\n        <div class="category">\n          <span class="name">预览</span>\n          <span class="description">通用存储，有更好的预览效果。</span>\n        </div>\n        '), Blaze.Each(function() {
      return Spacebars.call(view.lookup("previewScales"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "ArtworkAsset", "ExportArtwork", "Scale"));
      }), "\n        " ];
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("publishingScales"), "length"));
  }, function() {
    return [ HTML.Raw('\n        <div class="category">\n          <span class="name">发布</span>\n          <span class="description">高分辨率，适合在线发布。</span>\n        </div>\n        '), Blaze.Each(function() {
      return Spacebars.call(view.lookup("publishingScales"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "ArtworkAsset", "ExportArtwork", "Scale"));
      }), "\n        " ];
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("wallpaperScales"), "length"));
  }, function() {
    return [ HTML.Raw('\n        <div class="category">\n          <span class="name">壁纸</span>\n          <span class="description">足够大以填满您的屏幕。</span>\n        </div>\n        '), Blaze.Each(function() {
      return Spacebars.call(view.lookup("wallpaperScales"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Portfolio", "ArtworkAsset", "ExportArtwork", "Scale"));
      }), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: "submit-area"
  }, HTML.Raw('\n      <div class="title">签名</div>\n      '), HTML.DIV({
    class: "button-area"
  }, "\n        ", HTML.BUTTON({
    class: "submit-button"
  }, "\n          ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("adventure"), "isAdventureMode"));
  }, function() {
    return [ "\n            ", Blaze.View("lookup:currentCharacter.avatar.fullName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentCharacter"), "avatar", "fullName"));
    }), "\n          " ];
  }, function() {
    return [ "\n            ", Blaze.View("lookup:currentProfile.displayName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProfile"), "displayName"));
    }), "\n          " ];
  }), "\n        "), HTML.Raw('\n        <div class="prompt">\n          点击上方的线<br>\n          以导出\n        </div>\n      ')), "\n    "), "\n  ");
}));

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork.Scale");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork.Scale"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ExportArtwork.Scale", (function() {
  var view = this;
  return HTML.LABEL({
    class: "scale"
  }, "\n    ", HTML.DIV({
    class: "selection"
  }, HTML.INPUT({
    type: "checkbox",
    class: "factor-input",
    "data-factor": function() {
      return Spacebars.mustache(view.lookup("factor"));
    }
  }), HTML.Raw('<span class="checkmark"></span>')), "\n    ", HTML.DIV({
    class: "factor"
  }, Blaze.View("lookup:factor", function() {
    return Spacebars.mustache(view.lookup("factor"));
  }), "x ", Blaze.If(function() {
    return Spacebars.call(view.lookup("factorDescription"));
  }, function() {
    return [ "(", Blaze.View("lookup:factorDescription", function() {
      return Spacebars.mustache(view.lookup("factorDescription"));
    }), ")" ];
  })), "\n    ", HTML.DIV({
    class: "dimensions"
  }, Blaze.View("lookup:width", function() {
    return Spacebars.mustache(view.lookup("width"));
  }), "×", Blaze.View("lookup:height", function() {
    return Spacebars.mustache(view.lookup("height"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"artworkcaption":{"artworkcaption.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/artworkcaption/artworkcaption.coffee    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ArtworkCaption = function () {
  class ArtworkCaption extends AM.Component {}
  ;
  ArtworkCaption.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ArtworkCaption');
  return ArtworkCaption;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.artworkcaption.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/artworkasset/artworkcaption/template.artworkcaption. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ArtworkCaption");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ArtworkCaption"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ArtworkAsset.ArtworkCaption", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-portfolio-artworkasset-artworkcaption"
  }, "\n    ", HTML.DIV({
    class: "title"
  }, Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"newartwork":{"newartwork.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/newartwork/newartwork.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Portfolio.NewArtwork = function () {
  class NewArtwork extends PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Asset {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork';
    }
    static type() {
      return this.Types.None;
    }
    static displayName() {
      return "New artwork";
    }
    static description() {
      return "创建一个新的艺术作品来绘制您想要的任何东西。";
    }
    constructor() {
      super(...arguments);
      this.portfolioComponent = new this.constructor.PortfolioComponent(this);
      this.clipboardComponent = new this.constructor.ClipboardComponent(this);
    }
    urlParameter() {
      return 'new';
    }
  }
  ;
  NewArtwork.initialize();
  return NewArtwork;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/newartwork/portfoliocomponent/portfoliocomponent.cof //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.NewArtwork.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {}
  ;
  PortfolioComponent.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/newartwork/portfoliocomponent/template.portfoliocomp //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.PortfolioComponent");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.PortfolioComponent"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.PortfolioComponent", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixelpad-apps-drawing-portfolio-newartwork-portfoliocomponent"></div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"clipboardcomponent":{"clipboardcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/newartwork/clipboardcomponent/clipboardcomponent.cof //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, Extras, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
Extras = PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Extras;
PAA.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent = function () {
  class ClipboardComponent extends AM.Component {
    onCreated() {
      super.onCreated(...arguments);
      this.autorun(computation => {
        return LOI.Assets.Palette.allCategorized.subscribeContent(this);
      });
      this.sizeType = new ReactiveField(this.constructor.SizeTypes.Fixed);
      this.widthError = new ReactiveField(false);
      this.heightError = new ReactiveField(false);
      this.sizeOutOfRangeError = new ReactiveField(false);
      return this.extras = new PAA.PixelPad.Apps.Drawing.Portfolio.Forms.Extras({
        allowedTypes: [Extras.Extra.Types.CanvasBorder, Extras.Extra.Types.RestrictedColors, Extras.Extra.Types.PixelArtEvaluation],
        initialProperties: [{
          type: Extras.Extra.Types.CanvasBorder,
          value: true
        }, {
          type: Extras.Extra.Types.RestrictedColors,
          value: LOI.Assets.Palette.SystemPaletteNames.Black
        }]
      });
    }
    validateWidth(value) {
      return this.widthError(this.validateDimension(value));
    }
    validateHeight(value) {
      return this.heightError(this.validateDimension(value));
    }
    validateDimension(value) {
      var maxSize;
      maxSize = this.maxSize();
      if (value > maxSize) {
        this.sizeOutOfRangeError(true);
      }
      return _.isNaN(value) || 0 <= value && value > maxSize;
    }
    errorClasses() {
      var errorClasses, field;
      errorClasses = function () {
        var i, len, ref, results;
        ref = ['width', 'height'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          field = ref[i];
          if (this["".concat(field, "Error")]()) {
            results.push("error-".concat(field));
          }
        }
        return results;
      }.call(this);
      if (this.sizeOutOfRangeError()) {
        errorClasses.push('error-size-out-of-range');
      }
      if (this.extras.restrictedColorsError()) {
        errorClasses.push('error-restricted-colors');
      }
      return errorClasses.join(' ');
    }
    maxSize() {
      return PAA.Practice.Artworks.maxSize;
    }
    events() {
      return super.events(...arguments).concat({
        'input .property.size .width input': this.onInputWidth,
        'input .property.size .height input': this.onInputHeight,
        'change .property.size .width input': this.onChangeWidth,
        'change .property.size .height input': this.onChangeHeight,
        'submit .new-artwork-form': this.onSubmitNewArtworkForm
      });
    }
    onInputWidth(event) {
      this.widthError(false);
      return this.sizeOutOfRangeError(false);
    }
    onInputHeight(event) {
      this.heightError(false);
      return this.sizeOutOfRangeError(false);
    }
    onChangeWidth(event) {
      return this.validateWidth($(event.target).val());
    }
    onChangeHeight(event) {
      return this.validateHeight($(event.target).val());
    }
    onSubmitNewArtworkForm(event) {
      var artwork, artworkInfo, artworks, data, getPaletteId, i, len, paletteColors, paletteId, properties, property, ref;
      event.preventDefault();
      data = new FormData(event.target);
      artworkInfo = {
        title: data.get('title')
      };
      if (this.sizeType() === this.constructor.SizeTypes.Fixed) {
        artworkInfo.size = {
          width: parseInt(data.get('width')),
          height: parseInt(data.get('height'))
        };
        this.validateWidth(artworkInfo.size.width);
        this.validateHeight(artworkInfo.size.height);
      }
      this.extras.validateRestrictedColors();
      if (this.errorClasses()) {
        return;
      }
      // Add properties.
      paletteColors = [];
      paletteId = null;
      properties = {
        pixelArtScaling: true
      };
      getPaletteId = function (name) {
        return LOI.Assets.Palette.documents.findOne({
          name
        })._id;
      };
      ref = this.extras.properties();
      for (i = 0, len = ref.length; i < len; i++) {
        property = ref[i];
        if (property.type === Extras.Extra.Types.ColorPalette) {
          paletteColors.push(getPaletteId(property.value));
        } else if (property.type === Extras.Extra.Types.RestrictedColors) {
          paletteId = getPaletteId(property.value);
        } else if (property.type === Extras.Extra.Types.PixelArtEvaluation) {
          // Convert from a boolean to an editable pixel art evaluation.
          properties.pixelArtEvaluation = {
            editable: true
          };
        } else {
          properties[_.camelCase(property.type)] = property.value;
        }
      }
      if (paletteColors.length > 0) {
        properties.paletteIds = paletteColors;
      }
      if (paletteId != null) {
        artworkInfo.paletteId = paletteId;
      }
      artworkInfo.properties = properties;
      artwork = PAA.Practice.Artworks.insert(artworkInfo);

      // Add artwork to the drawing app.
      artworks = PAA.PixelPad.Apps.Drawing.state('artworks') || [];
      artworks.push({
        artworkId: artwork._id
      });
      PAA.PixelPad.Apps.Drawing.state('artworks', artworks);

      // Navigate to the artwork.
      return AB.Router.changeParameter('parameter3', artwork._id);
    }
  }
  ;
  ClipboardComponent.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent');
  ClipboardComponent.initializeDataComponent();
  ClipboardComponent.SizeTypes = {
    Freeform: 'Freeform',
    Fixed: 'Fixed'
  };
  ClipboardComponent.SizeType = function () {
    class SizeType extends ClipboardComponent.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Select;
        this.propertyName = 'sizeType';
      }
      options() {
        var name, ref, results, value;
        ref = PAA.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent.SizeTypes;
        results = [];
        for (name in ref) {
          value = ref[name];
          results.push({
            name,
            value
          });
        }
        return results;
      }
    }
    ;
    SizeType.register('PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent.SizeType');
    return SizeType;
  }.call(this);
  return ClipboardComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.clipboardcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/newartwork/clipboardcomponent/template.clipboardcomp //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.NewArtwork.ClipboardComponent", (function() {
  var view = this;
  return HTML.FORM({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-portfolio-newartwork-clipboardcomponent pixelartacademy-pixelpad-apps-drawing-portfolio-forms-form new-artwork-form ", Spacebars.mustache(view.lookup("errorClasses")) ];
    }
  }, HTML.Raw('\n    <div class="form-title">购买订单表单</div>\n    '), HTML.DIV({
    class: "properties"
  }, HTML.Raw('\n      <label class="property title">\n        <span class="name">标题</span>\n        <span class="value"><input name="title" type="text" placeholder="请输入作品标题"></span>\n      </label>\n      '), HTML.LABEL({
    class: "property size"
  }, HTML.Raw('\n        <span class="name">尺寸</span>\n        '), HTML.SPAN({
    class: "value"
  }, "\n          \n          ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("sizeType"), "Fixed");
  }, function() {
    return [ "\n            ", HTML.SPAN({
      class: "dimensions"
    }, "\n              ", HTML.SPAN({
      class: "dimension width"
    }, "\n                ", HTML.INPUT({
      class: "dimension-value",
      name: "width",
      type: "number",
      min: "1",
      max: function() {
        return Spacebars.mustache(view.lookup("maxSize"));
      },
      placeholder: "宽度"
    }), "\n              "), HTML.Raw('\n              <span class="multiplication-symbol">&times;</span>\n              '), HTML.SPAN({
      class: "dimension height"
    }, "\n                ", HTML.INPUT({
      class: "dimension-value",
      name: "height",
      type: "number",
      min: "1",
      max: function() {
        return Spacebars.mustache(view.lookup("maxSize"));
      },
      placeholder: "高度"
    }), "\n              "), HTML.Raw('\n              <span class="unit">像素</span>\n            ')), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("extras"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", HTML.DIV({
    class: "submit-area"
  }, HTML.Raw('\n      <div class="title">签名</div>\n      '), HTML.DIV({
    class: "button-area"
  }, "\n        ", HTML.BUTTON({
    class: "submit-button"
  }, "\n          ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("adventure"), "isAdventureMode"));
  }, function() {
    return [ "\n            ", Blaze.View("lookup:currentCharacter.avatar.fullName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentCharacter"), "avatar", "fullName"));
    }), "\n          " ];
  }, function() {
    return [ "\n            ", Blaze.View("lookup:currentProfile.displayName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentProfile"), "displayName"));
    }), "\n          " ];
  }), "\n        "), HTML.Raw('\n        <div class="prompt">\n          点击上方的线<br>\n          以订购\n        </div>\n      ')), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("errorClasses"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "error-message"
    }, "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$or"), view.lookup("widthError"), view.lookup("heightError"));
    }, function() {
      return "请输入有效尺寸。";
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("sizeOutOfRangeError"));
    }, function() {
      return [ "最大尺寸为 ", Blaze.View("lookup:maxSize", function() {
        return Spacebars.mustache(view.lookup("maxSize"));
      }), "." ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("extras"), "restrictedColorsError"));
    }, function() {
      return "\n          该作品要求使用受限颜色。\n          此限制将在未来版本中移除。\n        ";
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"importartwork":{"importartwork.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/importartwork/importartwork.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Portfolio.ImportArtwork = function () {
  class ImportArtwork extends PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.Forms.Asset {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork';
    }
    static type() {
      return this.Types.None;
    }
    static displayName() {
      return "Import artwork";
    }
    static description() {
      return "导入使用外部软件创建的艺术作品。";
    }
    constructor() {
      super(...arguments);
      this.portfolioComponent = new this.constructor.PortfolioComponent(this);
      this.clipboardComponent = new this.constructor.ClipboardComponent(this);
    }
    urlParameter() {
      return 'import';
    }
  }
  ;
  ImportArtwork.initialize();
  return ImportArtwork;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/importartwork/portfoliocomponent/portfoliocomponent. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.PortfolioComponent';
    }
  }
  ;
  PortfolioComponent.register(PortfolioComponent.id());
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/importartwork/portfoliocomponent/template.portfolioc //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.PortfolioComponent");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.PortfolioComponent"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.PortfolioComponent", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixelpad-apps-drawing-portfolio-importartwork-portfoliocomponent"></div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"clipboardcomponent":{"clipboardcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/importartwork/clipboardcomponent/clipboardcomponent. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AMu, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.ClipboardComponent = function () {
  class ClipboardComponent extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.ClipboardComponent';
    }
    events() {
      return super.events(...arguments).concat({
        'click .upload-button': this.onClickUploadButton
      });
    }
    onClickUploadButton(event) {
      var $fileInput;
      event.preventDefault();
      $fileInput = $('<input type="file"/>');
      $fileInput.on('change', event => {
        var file, image, ref;
        if (!(file = (ref = $fileInput[0]) != null ? ref.files[0] : void 0)) {
          return;
        }
        image = new Image();
        image.onload = () => {
          return this._onImportImage(file.name, image);
        };
        return image.src = URL.createObjectURL(file);
      });
      return $fileInput.click();
    }
    _onImportImage(title, image) {
      var a, action, addLayerAction, artwork, artworkInfo, artworks, b, bitmap, bitmapId, canvas, documentRepresentation, g, i, imageData, j, pixel, pixelIndex, pixels, r, ref, ref1, strokeAction, url, x, y;
      artworkInfo = {
        title
      };
      artworkInfo.size = {
        width: image.width,
        height: image.height
      };
      artworkInfo.properties = {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          editable: true
        }
      };
      artwork = PAA.Practice.Artworks.insert(artworkInfo);

      // Add artwork to the drawing app.
      artworks = PAA.PixelPad.Apps.Drawing.state('artworks') || [];
      artworks.push({
        artworkId: artwork._id
      });
      PAA.PixelPad.Apps.Drawing.state('artworks', artworks);

      // Place the pixels.
      documentRepresentation = _.find(artwork.representations, representation => {
        return representation.type === PADB.Artwork.RepresentationTypes.Document;
      });

      // Extract the type and ID.
      url = new URL(Meteor.absoluteUrl(documentRepresentation.url));
      bitmapId = url.searchParams.get('id');
      canvas = new AM.ReadableCanvas(image);
      imageData = canvas.getFullImageData();
      pixels = [];
      for (x = i = 0, ref = imageData.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = imageData.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          pixelIndex = (x + y * imageData.width) * 4;

          // Skip transparent pixels.
          a = imageData.data[pixelIndex + 3];
          if (!a) {
            continue;
          }
          r = imageData.data[pixelIndex] / 255;
          g = imageData.data[pixelIndex + 1] / 255;
          b = imageData.data[pixelIndex + 2] / 255;
          pixel = {
            x: x,
            y: y,
            directColor: {
              r,
              g,
              b
            },
            alpha: 1
          };
          if (pixel) {
            pixels.push(pixel);
          }
        }
      }

      // Add the pixels.
      action = new AMu.Document.Versioning.Action(this.constructor.id());
      bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId);
      addLayerAction = new LOI.Assets.Bitmap.Actions.AddLayer(bitmapId, bitmap);
      AMu.Document.Versioning.executePartialAction(bitmap, addLayerAction);
      action.append(addLayerAction);
      strokeAction = new LOI.Assets.Bitmap.Actions.Stroke(bitmapId, bitmap, [0], pixels);
      AMu.Document.Versioning.executePartialAction(bitmap, strokeAction);
      action.append(strokeAction);
      AMu.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, action, new Date());
      AMu.Document.Versioning.clearHistory(bitmap);

      // Navigate to the artwork.
      return AB.Router.changeParameter('parameter3', artwork._id);
    }
  }
  ;
  ClipboardComponent.register(ClipboardComponent.id());
  ClipboardComponent.initializeDataComponent();
  return ClipboardComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.clipboardcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/portfolio/importartwork/clipboardcomponent/template.clipboardc //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.ClipboardComponent");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.ClipboardComponent"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Portfolio.ImportArtwork.ClipboardComponent", (function() {
  var view = this;
  return HTML.FORM({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-portfolio-importartwork-clipboardcomponent importartwork-form ", Spacebars.mustache(view.lookup("errorClasses")) ];
    }
  }, HTML.Raw('\n    <div class="form-title">导入作品表单</div>\n    <button class="upload-button">上传</button>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"clipboard":{"clipboard.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/clipboard/clipboard.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Clipboard = function () {
  class Clipboard extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Clipboard';
    }
    static calculateAssetSize(portfolioScale, bounds, options) {
      var borderWidth, contentHeight, contentWidth, displayScale, divisor, effectiveScale, fitScale, height, ref, ref1, scale, totalBorderWidth, width;
      borderWidth = options.border ? 7 : 0;
      totalBorderWidth = borderWidth * 2;
      width = (bounds != null ? bounds.width : void 0) || 1;
      height = (bounds != null ? bounds.height : void 0) || 1;
      displayScale = LOI.adventure.interface.display.scale();
      fitScale = (174 - totalBorderWidth) / width;
      if (options.fitToHeight) {
        fitScale = Math.min(fitScale, (options.fitToHeight - totalBorderWidth) / height);
      }
      if (options != null ? (ref = options.scaleLimits) != null ? ref.min : void 0 : void 0) {
        // Apply minimum and maximum scale if provided (it could be a non-integer).
        fitScale = Math.max(fitScale, options.scaleLimits.min);
      }
      if (options != null ? (ref1 = options.scaleLimits) != null ? ref1.max : void 0 : void 0) {
        fitScale = Math.min(fitScale, options.scaleLimits.max);
      }
      if (options != null ? options.pixelArtScaling : void 0) {
        if (portfolioScale < 1 || fitScale < 1) {
          // The asset was scaled down in the portfolio, so we will need to scale downwards. We start
          // operating in effective scale to still have integer magnification compared to window pixels.
          effectiveScale = displayScale;
          while (effectiveScale / displayScale > fitScale) {
            effectiveScale--;
          }
          if (effectiveScale > 0) {
            scale = effectiveScale / displayScale;
          } else {
            // We need to reduce scale below 1 effective pixel so we start dividing by integer amounts below 1.
            divisor = 1;
            while (1 / divisor / displayScale > fitScale) {
              divisor++;
            }
            effectiveScale = 1 / divisor;
            scale = Math.max(portfolioScale, effectiveScale / displayScale);
          }
        } else {
          // Asset in the clipboard should be bigger than in the portfolio.
          // 1 -> 2
          // 2 -> 3
          // 3 -> 4
          // 4 -> 5
          // 5 -> 6
          // 6 -> 8
          scale = Math.min(Math.floor(fitScale), Math.ceil(portfolioScale * 1.2));
        }
      } else {
        // Make the asset fit in the clipboard.
        scale = Math.min(1 / displayScale, fitScale);
      }
      contentWidth = width * scale;
      contentHeight = height * scale;
      return {
        contentWidth,
        contentHeight,
        borderWidth,
        scale
      };
    }
    constructor(drawing) {
      super(...arguments);
      this.drawing = drawing;
    }
    onCreated() {
      super.onCreated(...arguments);
      this._wasDisplayingAsset = null;
      return this.autorun(computation => {
        var displayingAsset;
        displayingAsset = this.drawing.portfolio().activeAsset() != null;
        if (displayingAsset && !this._wasDisplayingAsset) {
          this.audio.open();
        } else if (this._wasDisplayingAsset && !displayingAsset) {
          this.audio.close();
        }
        return this._wasDisplayingAsset = displayingAsset;
      });
    }
    asset() {
      var ref;
      return (ref = this.drawing.portfolio().displayedAsset()) != null ? ref.asset : void 0;
    }
    activeClass() {
      if (this.drawing.activeAsset() && !this.drawing.displayedAssetCustomComponent()) {
        return 'active';
      }
    }
    onBackButton() {
      var clipboardComponent, ref, result;
      // Relay to asset clipboard component.
      clipboardComponent = (ref = this.drawing.portfolio().displayedAsset()) != null ? ref.asset.clipboardComponent : void 0;
      result = clipboardComponent != null ? typeof clipboardComponent.onBackButton === "function" ? clipboardComponent.onBackButton() : void 0 : void 0;
      if (result != null) {
        return result;
      }
    }
  }
  ;
  Clipboard.register(Clipboard.id());
  Clipboard.Audio = new LOI.Assets.Audio.Namespace(Clipboard.id(), {
    variables: {
      open: AEc.ValueTypes.Trigger,
      close: AEc.ValueTypes.Trigger,
      secondPageOpen: AEc.ValueTypes.Trigger,
      secondPageClose: AEc.ValueTypes.Trigger
    }
  });
  return Clipboard;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.clipboard.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/clipboard/template.clipboard.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Clipboard");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Clipboard"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Clipboard", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-clipboard ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("editorActiveClass")) ];
    }
  }, HTML.Raw('\n    <div class="board"></div>\n    '), Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("asset"), "clipboardComponent"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"paletteselection":{"paletteselection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/paletteselection.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AE, AEc, AM, LOI, PAA, depthCompression, turnedAngle;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AC = Artificial.Control;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
depthCompression = 0.5;
turnedAngle = 30;
PAA.PixelPad.Apps.Drawing.PaletteSelection = function () {
  class PaletteSelection extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection';
    }
    static splitPaletteIntoColorRows(palette) {
      var colorIndex, colorRows, colors, colorsCount, colorsPerRow, colorsRemainder, i, j, k, l, len, len1, ramp, ref, ref1, ref2, ref3, rowColors, rowIndex, rowsCount, shade;
      colors = [];
      ref = palette.ramps;
      for (i = 0, len = ref.length; i < len; i++) {
        ramp = ref[i];
        ref1 = ramp.shades;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          shade = ref1[j];
          colors.push(THREE.Color.fromObject(shade));
        }
      }
      rowsCount = Math.ceil(colors.length / 10);
      colorsPerRow = Math.floor(colors.length / rowsCount);
      colorsRemainder = colors.length % rowsCount;
      colorRows = [];
      for (rowIndex = k = 0, ref2 = rowsCount; 0 <= ref2 ? k < ref2 : k > ref2; rowIndex = 0 <= ref2 ? ++k : --k) {
        rowColors = [];
        colorsCount = colorsPerRow;
        if (rowIndex < colorsRemainder) {
          colorsCount++;
        }
        for (colorIndex = l = 0, ref3 = colorsCount; 0 <= ref3 ? l < ref3 : l > ref3; colorIndex = 0 <= ref3 ? ++l : --l) {
          rowColors.push(colors.shift());
        }
        colorRows.push(rowColors);
      }
      return colorRows;
    }
    mixins() {
      return super.mixins(...arguments).concat(this.activatable);
    }
    constructor(initialTargetPaletteName) {
      super(...arguments);
      this.initialTargetPaletteName = initialTargetPaletteName;
      this.activatable = new LOI.Components.Mixins.Activatable();
      this.visible = new ReactiveField(false);
      this.currentPageIndex = new ReactiveField(0);
      this.targetPageIndex = new ReactiveField(null);
      this.manualPageRotation = 0;
      this._resetTargetPage();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(Artificial.Base.App);
      this.sections = new ComputedField(() => {
        var i, len, palette, section, sections, separatorPageIndex;
        if (!(palette = LOI.palette())) {
          return [];
        }
        sections = [{
          category: LOI.Assets.Palette.Categories.Basic,
          color: palette.color(LOI.Assets.Palette.Atari2600.hues.gray, 2)
        }, {
          category: LOI.Assets.Palette.Categories.Monoramp,
          color: palette.color(LOI.Assets.Palette.Atari2600.hues.purple, 3)
        }, {
          category: LOI.Assets.Palette.Categories.System,
          color: palette.color(LOI.Assets.Palette.Atari2600.hues.red, 3)
        }, {
          category: LOI.Assets.Palette.Categories.Modern,
          color: palette.color(LOI.Assets.Palette.Atari2600.hues.azure, 4)
        }];
        separatorPageIndex = 1;
        for (i = 0, len = sections.length; i < len; i++) {
          section = sections[i];
          section.palettes = LOI.Assets.Palette.documents.fetch({
            category: section.category
          }, {
            sort: {
              name: 1
            }
          });
          section.separatorPageIndex = separatorPageIndex;
          separatorPageIndex += section.palettes.length + 1;
          if (section.category === LOI.Assets.Palette.Categories.System) {
            // Sort palettes by number of colors except the systems palettes.
            continue;
          }
          section.palettes.sort((a, b) => {
            if (a.ramps.length === b.ramps.length) {
              return a.ramps[0].shades.length - b.ramps[0].shades.length;
            } else {
              return a.ramps.length - b.ramps.length;
            }
          });
        }
        return sections;
      });
      this.$pages = new ReactiveField([]);
      return $(document).on('keydown.pixelartacademy-pixelpad-apps-drawing-paletteselection', event => {
        return this.onKeyDown(event);
      });
    }
    onRendered() {
      super.onRendered(...arguments);

      // When sections change, update the pages.
      this.autorun(computation => {
        this.sections();
        return Tracker.afterFlush(() => {
          var $pages, i, index, len, offset, page;
          $pages = this.$('.page');
          this.$pages($pages);
          for (index = i = 0, len = $pages.length; i < len; index = ++i) {
            page = $pages[index];
            offset = Math.floor(index * depthCompression);
            $(page).css({
              zIndex: $pages.length - index,
              top: "".concat(offset - 26, "rem")
            });
          }
          return this.$('.pin').css({
            zIndex: $pages.length + 1
          });
        });
      });
      return this.app.addComponent(this);
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      $(document).off('.pixelartacademy-pixelpad-apps-drawing-paletteselection');
      return this.app.removeComponent(this);
    }
    onBackButton() {
      this.activatable.deactivate();

      // Inform that we've handled the back button.
      return true;
    }
    onActivate(finishedActivatingCallback) {
      this.audio.open();
      Meteor.setTimeout(() => {
        if (!this.activatable.activating()) {
          return;
        }
        return this.visible(true);
      }, 100);
      return Meteor.setTimeout(() => {
        if (!this.activatable.activating()) {
          return;
        }
        return finishedActivatingCallback();
      }, 1000);
    }
    onDeactivate(finishedDeactivatingCallback) {
      var $pages;
      this._resetTargetPage();
      this.visible(false);
      if (this.$('.page.turned').length) {
        $pages = this.$pages();
        this.audio.pagePan(AEc.getPanForElement($pages[0]));
        this.audio.slide();
      }
      this.$('.page').removeClass('turned').removeClass('manual-movement').css({
        transform: ''
      });
      this.audio.close();
      return Meteor.setTimeout(() => {
        return finishedDeactivatingCallback();
      }, 1000);
    }
    _getPaletteOnPage(pageIndex) {
      var i, len, paletteIndex, section, sections;
      if (!(sections = this.sections())) {
        return null;
      }
      for (i = 0, len = sections.length; i < len; i++) {
        section = sections[i];
        if (!(section.separatorPageIndex < pageIndex && pageIndex <= section.separatorPageIndex + section.palettes.length)) {
          continue;
        }
        paletteIndex = pageIndex - section.separatorPageIndex - 1;
        return section.palettes[paletteIndex];
      }
      return null;
    }
    previousPage() {
      var $pages, currentPageIndex;
      this._resetManualMovement();
      $pages = this.$pages();
      currentPageIndex = this.currentPageIndex();
      if (!currentPageIndex) {
        return;
      }
      currentPageIndex--;
      this.currentPageIndex(currentPageIndex);
      $pages.eq(currentPageIndex).removeClass('turned');
      return this._slidePage();
    }
    nextPage() {
      var $pages, currentPageIndex;
      this._resetManualMovement();
      $pages = this.$pages();
      currentPageIndex = this.currentPageIndex();
      if (currentPageIndex >= $pages.length - 1) {
        return;
      }
      this._slidePage();
      $pages.eq(currentPageIndex).addClass('turned');
      currentPageIndex++;
      return this.currentPageIndex(currentPageIndex);
    }
    _slidePage() {
      var $pages, currentPageIndex;
      $pages = this.$pages();
      currentPageIndex = this.currentPageIndex();
      this.audio.pagePan(AEc.getPanForElement($pages[currentPageIndex]));
      return this.audio.slide();
    }
    goToPage(targetPageIndex) {
      if (targetPageIndex === this.currentPageIndex()) {
        return;
      }
      return this.targetPageIndex(targetPageIndex);
    }
    _resetTargetPage() {
      this.targetPageIndex(null);
      this._pageTurnCooldownElapsed = 0;
      return this._pageTurnCooldownDuration = 0.3;
    }
    selectPalette(palette) {
      this.selectedPalette = palette;
      return this.activatable.deactivate();
    }
    visibleClass() {
      if (this.visible() && PAA.PixelPad.Apps.Drawing.PaletteSelection.Page.pageTemplateImageData()) {
        return 'visible';
      }
    }
    activeClass() {
      if (this.activatable.activated()) {
        return 'active';
      }
    }
    showPreviousPageButton() {
      return this.currentPageIndex();
    }
    showNextPageButton() {
      return this.currentPageIndex() < this.$pages().length - 1;
    }
    previousPageButtonStyle() {
      var currentPageIndex;
      currentPageIndex = this.currentPageIndex();
      return {
        bottom: "calc(50% + ".concat(25 - currentPageIndex * depthCompression, "rem)"),
        zIndex: this.$pages().length + 1
      };
    }
    nextPageButtonStyle() {
      var currentPageIndex;
      currentPageIndex = this.currentPageIndex();
      return {
        top: "calc(50% + ".concat(25 + currentPageIndex * depthCompression, "rem)"),
        zIndex: this.$pages().length + 1
      };
    }
    update(appTime) {
      this._updateTargetPage(appTime);
      return this._updatePaletteGlow(appTime);
    }
    _updateTargetPage(appTime) {
      var targetPageIndex;
      targetPageIndex = this.targetPageIndex();
      if (targetPageIndex == null) {
        return;
      }

      // Immediately after target is set and after the cooldown, move a page.
      if (!this._pageTurnCooldownElapsed || this._pageTurnCooldownElapsed >= this._pageTurnCooldownDuration) {
        this._pageTurnCooldownElapsed = 0;
        if (this._pageTurnCooldownDuration > 0.1) {
          this._pageTurnCooldownDuration -= 0.1;
        } else if (this._pageTurnCooldownDuration > 0.05) {
          this._pageTurnCooldownDuration -= 0.01;
        }
        // Note: We don't want to store current page index into a local variable
        // since it will get change with the call to next or previous page.
        if (targetPageIndex > this.currentPageIndex()) {
          this.nextPage();
        } else {
          this.previousPage();
        }
        if (this.currentPageIndex() === targetPageIndex) {
          this._resetTargetPage();
          return;
        }
      }
      return this._pageTurnCooldownElapsed += appTime.elapsedAppTime;
    }
    events() {
      return super.events(...arguments).concat({
        'click .previous.page-button': this.onPreviousPageButtonClick,
        'click .next.page-button': this.onNextPageButtonClick,
        'wheel': this.onWheel
      });
    }
    onPreviousPageButtonClick(event) {
      this.previousPage();
      return this._resetTargetPage();
    }
    onNextPageButtonClick(event) {
      this.nextPage();
      return this._resetTargetPage();
    }
    onWheel(event) {
      var $pages, atRest, currentPageIndex, ref, speed;
      if (!this.activatable.activated()) {
        return;
      }
      this._resetTargetPage();
      $pages = this.$pages();
      currentPageIndex = this.currentPageIndex();
      atRest = !this.manualPageRotation;
      this.manualPageRotation += event.originalEvent.deltaY;

      // Prevent turning further on the first and last pages.
      if (currentPageIndex === $pages.length - 1 && this.manualPageRotation > 0 || currentPageIndex === 0 && this.manualPageRotation < 0) {
        this._resetManualMovement();
        $pages.eq(currentPageIndex).removeClass('turned');
        return;
      }

      // When moving backwards from rest, we need to activate the previous page.
      if (atRest && this.manualPageRotation < 0) {
        currentPageIndex--;
        this.currentPageIndex(currentPageIndex);
        this.manualPageRotation += 90;
      }
      this.audio.pagePan(AEc.getPanForElement($pages[currentPageIndex]));
      if (0 < (ref = this.manualPageRotation) && ref < 90) {
        $pages.eq(currentPageIndex).addClass('manual-movement');
        $pages[currentPageIndex].style.transform = "rotateZ(-".concat(_.clamp(this.manualPageRotation, 0, 90), "deg)");
        this.audio.manualSlide(true);
      } else {
        this._resetManualMovement(true);
        this.audio.manualSlide(false);
        this.audio.slide();
      }
      if (this.manualPageRotation > turnedAngle) {
        $pages.eq(currentPageIndex).addClass('turned');
      } else {
        $pages.eq(currentPageIndex).removeClass('turned');
      }
      if (this.manualPageRotation >= 90) {
        this.manualPageRotation = 0;
        currentPageIndex++;
        this.currentPageIndex(currentPageIndex);
      } else if (this.manualPageRotation <= 0) {
        this.manualPageRotation = 0;
      }

      // Also reset the current page angle after the user pauses scrolling.
      if (this._debouncedReset == null) {
        this._debouncedReset = _.debounce(() => {
          var ref1;
          if (!this.activatable.activated()) {
            return;
          }
          if (!(0 < (ref1 = this.manualPageRotation) && ref1 < 90)) {
            return;
          }
          this._resetManualMovement(true);
          this._slidePage();
          currentPageIndex = this.currentPageIndex();
          if (this.manualPageRotation > turnedAngle && currentPageIndex < $pages.length - 1) {
            currentPageIndex++;
            this.currentPageIndex(currentPageIndex);
          }
          return this.manualPageRotation = 0;
        }, 1000);
      }
      this._debouncedReset();
      if (this._debouncedSlideEnd == null) {
        this._debouncedSlideEnd = _.debounce(() => {
          return this.audio.manualSlide(false);
        }, 50);
      }
      this._debouncedSlideEnd();

      // Play sliding audio corresponding to the scroll speed.
      speed = _.clamp(Math.abs(event.originalEvent.deltaY / 10), 1, 2);
      return this.audio.manualSlideSpeed(speed);
    }
    _resetManualMovement() {
      let rememberAccumulatedPageRotation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var $pages, currentPageIndex;
      currentPageIndex = this.currentPageIndex();
      $pages = this.$pages();
      $pages.eq(currentPageIndex).removeClass('manual-movement');
      $pages[currentPageIndex].style.transform = '';
      if (!rememberAccumulatedPageRotation) {
        return this.manualPageRotation = 0;
      }
    }
    onKeyDown(event) {
      var keyCode;
      // Only capture events when the interface is active.
      if (!LOI.adventure.interface.active()) {
        return;
      }
      keyCode = event.which;
      switch (keyCode) {
        case AC.Keys.up:
          this._resetTargetPage();
          return this.previousPage();
        case AC.Keys.down:
          this._resetTargetPage();
          return this.nextPage();
      }
    }
  }
  ;
  PaletteSelection.Audio = new LOI.Assets.Audio.Namespace(PaletteSelection.id(), {
    variables: {
      open: AEc.ValueTypes.Trigger,
      close: AEc.ValueTypes.Trigger,
      slide: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 50
      },
      manualSlide: AEc.ValueTypes.Boolean,
      manualSlideSpeed: AEc.ValueTypes.Number,
      pagePan: AEc.ValueTypes.Number
    }
  });
  return PaletteSelection;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.paletteselection.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/template.paletteselection.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-paletteselection ", Spacebars.mustache(view.lookup("visibleClass")), " ", Spacebars.mustache(view.lookup("activeClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: "overlay"
  }, "\n      ", HTML.DIV({
    class: "navigation"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showPreviousPageButton"));
  }, function() {
    return [ "\n          ", HTML.BUTTON(HTML.Attrs({
      class: "previous page-button"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("previousPageButtonStyle"));
    })), "\n        " ];
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showNextPageButton"));
  }, function() {
    return [ "\n          ", HTML.BUTTON(HTML.Attrs({
      class: "next page-button"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("nextPageButtonStyle"));
    })), "\n        " ];
  }), "\n      "), "\n      ", HTML.DIV({
    class: "fan-deck"
  }, HTML.Raw('\n        <div class="pin"></div>\n        '), Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "PaletteSelection", "Page", "Cover"));
  }), "\n        ", HTML.OL({
    class: "sections"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("sections"));
  }, function() {
    return [ "\n            ", HTML.LI({
      class: "section"
    }, "\n              ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "PaletteSelection", "Page", "Separator"));
    }), "\n              ", HTML.OL({
      class: "palettes"
    }, "\n                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("palettes"));
    }, function() {
      return [ "\n                  ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "PaletteSelection", "Page", "Palette"));
      }), "\n                " ];
    }), "\n              "), "\n            "), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), HTML.Raw('\n    <div class="background"></div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"paletteselection-paletteglow.coffee":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/paletteselection-paletteglow.coffee           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
let StackBlur;
module.link("stackblur-canvas", {
  "*"(v) {
    StackBlur = v;
  }
}, 0);
var AE, AM, AS, LOI, PAA, manualRotationBlendingRate, paletteGlowBlendingDuration;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AS = Artificial.Spectrum;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
paletteGlowBlendingDuration = 0.5;
manualRotationBlendingRate = 0.99;
PAA.PixelPad.Apps.Drawing.PaletteSelection = function () {
  class PaletteSelection extends PAA.PixelPad.Apps.Drawing.PaletteSelection {
    onCreated() {
      super.onCreated(...arguments);
      this.currentPalette = new ComputedField(() => {
        var currentPageIndex;
        if (!(currentPageIndex = this.currentPageIndex())) {
          return;
        }
        return this._getPaletteOnPage(currentPageIndex);
      });
      return this.nextPalette = new ComputedField(() => {
        var currentPageIndex;
        if (!(currentPageIndex = this.currentPageIndex())) {
          return;
        }
        return this._getPaletteOnPage(currentPageIndex + 1);
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.paletteGlowCanvas = new AM.ReadableCanvas(480, 360);
      this.$('.background').append(this.paletteGlowCanvas);
      this._paletteGlowImageData = this.paletteGlowCanvas.getFullImageData();
      this._sourcePalleteGlowImageData = this.paletteGlowCanvas.context.createImageData(480, 360);
      this._paletteGlowBlendingPalette = null;
      this._paletteGlowBlendingElapsedTime = 0;
      this._paletteGlowBlendingWasManual = false;
      this._paletteGlowImageDatas = {};

      // Render palette glows and go to the initial page.
      return this.autorun(computation => {
        var i, j, k, l, len, len1, len2, len3, palette, paletteIndex, ref, ref1, section, sections;
        if (!this.activatable.activated()) {
          return;
        }
        if (!(sections = this.sections())) {
          return;
        }
        for (i = 0, len = sections.length; i < len; i++) {
          section = sections[i];
          ref = section.palettes;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            palette = ref[j];
            this._createPaletteGlowImageDataForPalette(palette);
          }
        }
        if (!this.initialTargetPaletteName) {
          return;
        }
        for (k = 0, len2 = sections.length; k < len2; k++) {
          section = sections[k];
          ref1 = section.palettes;
          for (paletteIndex = l = 0, len3 = ref1.length; l < len3; paletteIndex = ++l) {
            palette = ref1[paletteIndex];
            if (palette.name === this.initialTargetPaletteName) {
              // To ensure smooth animation, delay the initial turning slightly.
              Meteor.setTimeout(() => {
                if (!this.activatable.activated()) {
                  return;
                }
                return this.goToPage(section.separatorPageIndex + paletteIndex + 1);
              }, 100);
              delete this.initialTargetPaletteName;
              return;
            }
          }
        }
      });
    }
    _createPaletteGlowImageDataForPalette(palette) {
      var bottom, channelOffset, color, colorIndex, colorRows, data, dataIndex, ditherAmount, ditherSize, ditherX, ditherY, i, j, k, l, left, len, len1, m, pixelOffset, quantizationFactor, ref, ref1, ref2, ref3, results, right, rowColors, rowIndex, top, value, valueOffset, x, y;
      if (this._paletteGlowImageDatas[palette.name]) {
        return;
      }
      this._paletteGlowImageDatas[palette.name] = this.paletteGlowCanvas.context.createImageData(480, 360);
      data = this._paletteGlowImageDatas[palette.name].data;
      colorRows = PAA.PixelPad.Apps.Drawing.PaletteSelection.splitPaletteIntoColorRows(palette);
      for (rowIndex = i = 0, len = colorRows.length; i < len; rowIndex = ++i) {
        rowColors = colorRows[rowIndex];
        for (colorIndex = j = 0, len1 = rowColors.length; j < len1; colorIndex = ++j) {
          color = rowColors[colorIndex];
          left = Math.floor(colorIndex / rowColors.length * 480);
          right = Math.min(479, Math.ceil((colorIndex + 1) / rowColors.length * 480));
          top = Math.floor(rowIndex / colorRows.length * 360);
          bottom = Math.min(359, Math.ceil((rowIndex + 1) / colorRows.length * 360));
          for (x = k = ref = left, ref1 = right; ref <= ref1 ? k <= ref1 : k >= ref1; x = ref <= ref1 ? ++k : --k) {
            for (y = l = ref2 = top, ref3 = bottom; ref2 <= ref3 ? l <= ref3 : l >= ref3; y = ref2 <= ref3 ? ++l : --l) {
              dataIndex = (y * 480 + x) * 4;
              data[dataIndex] = color.r * 255;
              data[dataIndex + 1] = color.g * 255;
              data[dataIndex + 2] = color.b * 255;
              data[dataIndex + 3] = 255;
            }
          }
        }
      }
      StackBlur.imageDataRGBA(this._paletteGlowImageDatas[palette.name], 0, 0, 480, 360, 150);
      ditherSize = 8;
      quantizationFactor = 16;
      if (this._paletteGlowDitherThresholdMap == null) {
        this._paletteGlowDitherThresholdMap = AS.PixelArt.getDitherThresholdMap(ditherSize);
      }
      results = [];
      for (y = m = 0; m < 360; y = ++m) {
        results.push(function () {
          var n, results1;
          results1 = [];
          for (x = n = 0; n < 480; x = ++n) {
            pixelOffset = (y * 480 + x) * 4;
            ditherX = x % ditherSize;
            ditherY = y % ditherSize;
            ditherAmount = this._paletteGlowDitherThresholdMap[ditherY][ditherX];
            results1.push(function () {
              var o, results2;
              results2 = [];
              for (channelOffset = o = 0; o <= 2; channelOffset = ++o) {
                valueOffset = pixelOffset + channelOffset;
                value = data[valueOffset];

                // Bring value to quantized range.
                value = value / 256 * quantizationFactor;

                // Add dither.
                value += ditherAmount - 0.5;

                // Quantize and scale back to byte range.
                results2.push(data[valueOffset] = Math.round(value) / quantizationFactor * 256);
              }
              return results2;
            }());
          }
          return results1;
        }.call(this));
      }
      return results;
    }
    _updatePaletteGlow(appTime) {
      var currentPalette, currentPaletteImageData, dataIndex, decayProportion, i, j, k, l, m, n, nextPalette, nextPaletteImageData, offset, proportion, targetData, targetValue, x, y;
      if (!this._paletteGlowImageDatas) {
        return;
      }
      targetData = this._paletteGlowImageData.data;
      if (this.manualPageRotation) {
        this._paletteGlowBlendingWasManual = true;
        currentPalette = this.currentPalette();
        nextPalette = this.nextPalette();
        if (currentPalette) {
          currentPaletteImageData = this._paletteGlowImageDatas[currentPalette.name];
        }
        if (nextPalette) {
          nextPaletteImageData = this._paletteGlowImageDatas[nextPalette.name];
        }
        proportion = _.clamp(this.manualPageRotation / 90, 0, 1);
        for (x = i = 0; i < 480; x = ++i) {
          for (y = j = 0; j < 360; y = ++j) {
            dataIndex = (y * 480 + x) * 4;
            decayProportion = 1 - Math.pow(1 - manualRotationBlendingRate, appTime.elapsedAppTime);
            for (offset = k = 0; k <= 2; offset = ++k) {
              targetValue = this._blendColor(currentPaletteImageData != null ? currentPaletteImageData.data[dataIndex + offset] : void 0, nextPaletteImageData != null ? nextPaletteImageData.data[dataIndex + offset] : void 0, proportion);
              targetData[dataIndex + offset] = this._blendColor(targetData[dataIndex + offset], targetValue, decayProportion);
            }
            targetValue = this._blendAlpha(currentPaletteImageData != null ? currentPaletteImageData.data[dataIndex + 3] : void 0, nextPaletteImageData != null ? nextPaletteImageData.data[dataIndex + 3] : void 0, proportion);
            targetData[dataIndex + 3] = this._blendAlpha(targetData[dataIndex + 3], targetValue, decayProportion);
          }
        }
      } else {
        currentPalette = this.currentPalette();
        if (currentPalette) {
          currentPaletteImageData = this._paletteGlowImageDatas[currentPalette.name];
        }
        if (currentPalette === this._paletteGlowBlendingPalette && !this._paletteGlowBlendingWasManual) {
          if (this._paletteGlowBlendingElapsedTime > paletteGlowBlendingDuration) {
            return;
          }

          // Continue blending from the source to the current palette.
          this._paletteGlowBlendingElapsedTime = Math.min(paletteGlowBlendingDuration, this._paletteGlowBlendingElapsedTime + appTime.elapsedAppTime);
          proportion = this._paletteGlowBlendingElapsedTime / paletteGlowBlendingDuration;
          for (x = l = 0; l < 480; x = ++l) {
            for (y = m = 0; m < 360; y = ++m) {
              dataIndex = (y * 480 + x) * 4;
              for (offset = n = 0; n <= 2; offset = ++n) {
                targetData[dataIndex + offset] = this._blendColor(this._sourcePalleteGlowImageData.data[dataIndex + offset], currentPaletteImageData != null ? currentPaletteImageData.data[dataIndex + offset] : void 0, proportion);
              }
              targetData[dataIndex + 3] = this._blendAlpha(this._sourcePalleteGlowImageData.data[dataIndex + 3], currentPaletteImageData != null ? currentPaletteImageData.data[dataIndex + 3] : void 0, proportion);
            }
          }
        } else {
          // Reset the source.
          this._sourcePalleteGlowImageData.data.set(this._paletteGlowImageData.data);
          this._paletteGlowBlendingPalette = this.currentPalette();
          this._paletteGlowBlendingElapsedTime = 0;
          this._paletteGlowBlendingWasManual = false;
        }
      }
      return this.paletteGlowCanvas.putFullImageData(this._paletteGlowImageData);
    }
    _blendColor(colorValue1, colorValue2, proportion) {
      if (colorValue2 == null) {
        return colorValue1;
      }
      if (colorValue1 == null) {
        return colorValue2;
      }
      return THREE.MathUtils.lerp(colorValue1, colorValue2, proportion);
    }
    _blendAlpha() {
      let alphaValue1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      let alphaValue2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      let proportion = arguments.length > 2 ? arguments[2] : undefined;
      return THREE.MathUtils.lerp(alphaValue1, alphaValue2, proportion);
    }
  }
  ;
  PaletteSelection.register(PaletteSelection.id());
  return PaletteSelection;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"page":{"page.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/page/page.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.PaletteSelection.Page = function () {
  class Page extends LOI.Component {
    constructor() {
      super(...arguments);
      this.width = 224;
      this.height = 53;
    }
    onCreated() {
      var pageTemplateImage;
      super.onCreated(...arguments);
      if (!this.constructor._pageTemplateImageDataLoading) {
        // Start the loading of the template.
        this.constructor._pageTemplateImageDataLoading = true;
        pageTemplateImage = new Image();
        pageTemplateImage.addEventListener('load', () => {
          return this.constructor.pageTemplateImageData(new AM.ReadableCanvas(pageTemplateImage).getFullImageData());
        });

        // Initiate the loading.
        pageTemplateImage.src = Meteor.absoluteUrl('/pixelartacademy/pixelpad/apps/drawing/paletteselection/page-template.png');
      }

      // Create the canvases
      this.bottomCanvas = new AM.ReadableCanvas(this.width, this.height);
      this.topCanvas = new AM.ReadableCanvas(this.width, this.height);
      this.bottomCanvas.className = 'bottom-canvas';
      this.topCanvas.className = 'top-canvas';
      this.bottomCanvasImageData = this.bottomCanvas.getFullImageData();
      this.topCanvasImageData = this.topCanvas.getFullImageData();

      // Apply the alpha channel.
      return this.autorun(computation => {
        var i, index, j, pageTemplateImageData, ref, ref1, x, y;
        if (!(pageTemplateImageData = this.constructor.pageTemplateImageData())) {
          return;
        }
        computation.stop();
        for (x = i = 0, ref = this.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
          for (y = j = 0, ref1 = this.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
            index = (y * this.width + x) * 4;
            if (!pageTemplateImageData.data[index + 3]) {
              continue;
            }
            this.bottomCanvasImageData.data[index + 3] = 255;
            this.topCanvasImageData.data[index + 3] = 255;
          }
        }
        this.bottomCanvas.putFullImageData(this.bottomCanvasImageData);
        return this.topCanvas.putFullImageData(this.topCanvasImageData);
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.$('.page').prepend(this.topCanvas).prepend(this.bottomCanvas);
    }
    applyCanvases() {
      var i, index, j, k, offset, ref, ref1, x, y;
      // Shade bottom canvas.
      for (x = i = 0, ref = this.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = this.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          index = (y * this.width + x) * 4;
          for (offset = k = 0; k <= 2; offset = ++k) {
            this.bottomCanvasImageData.data[index + offset] = this.topCanvasImageData.data[index + offset] * 0.5;
          }
        }
      }

      // Put data into canvases.
      this.bottomCanvas.putFullImageData(this.bottomCanvasImageData);
      return this.topCanvas.putFullImageData(this.topCanvasImageData);
    }
  }
  ;
  Page.pageTemplateImageData = new ReactiveField(null);
  return Page;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cover":{"cover.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/page/cover/cover.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.PaletteSelection.Page.Cover = function () {
  class Cover extends PAA.PixelPad.Apps.Drawing.PaletteSelection.Page {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Cover';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.paletteSelection = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.PaletteSelection);
      return this.autorun(computation => {
        var color, i, index, j, leftColor, palette, ref, ref1, rightColor, x, y;
        if (!(palette = LOI.palette())) {
          return;
        }
        computation.stop();
        leftColor = new THREE.Color(palette.color(LOI.Assets.Palette.Atari2600.hues.gray, 8));
        rightColor = new THREE.Color(palette.color(LOI.Assets.Palette.Atari2600.hues.blue, 3));
        for (x = i = 0, ref = this.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
          for (y = j = 0, ref1 = this.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
            index = (y * this.width + x) * 4;
            color = x < 60 ? leftColor : rightColor;
            this.topCanvasImageData.data[index] = color.r * 255;
            this.topCanvasImageData.data[index + 1] = color.g * 255;
            this.topCanvasImageData.data[index + 2] = color.b * 255;
          }
        }
        return this.applyCanvases();
      });
    }
    localizedCategory(category) {
      return {
        [LOI.Assets.Palette.Categories.Basic]: "基础",
        [LOI.Assets.Palette.Categories.Monoramp]: "单色阶",
        [LOI.Assets.Palette.Categories.System]: "系统",
        [LOI.Assets.Palette.Categories.Modern]: "现代"
      }[category] || category;
    }
    events() {
      return super.events(...arguments).concat({
        'click .menu-item': this.onClickMenuItem
      });
    }
    onClickMenuItem(event) {
      var section;
      section = this.currentData();
      return this.paletteSelection.goToPage(section.separatorPageIndex);
    }
  }
  ;
  Cover.register(Cover.id());
  return Cover;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.cover.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/page/cover/template.cover.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Cover");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Cover"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Cover", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-paletteselection-page-cover page"
  }, HTML.Raw('\n    <div class="title">\n      <div class="limited-palette">受限调色板</div>\n      <div class="selection">选择</div>\n    </div>\n    '), HTML.OL({
    class: "menu"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("sections"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "menu-item"
    }, Blaze.View("lookup:localizedCategory", function() {
      return Spacebars.mustache(view.lookup("localizedCategory"), view.lookup("category"));
    })), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"separator":{"separator.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/page/separator/separator.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.PaletteSelection.Page.Separator = function () {
  class Separator extends PAA.PixelPad.Apps.Drawing.PaletteSelection.Page {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Separator';
    }
    onCreated() {
      var i, index, j, ref, ref1, section, x, y;
      super.onCreated(...arguments);
      section = this.data();
      for (x = i = 0, ref = this.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = this.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          index = (y * this.width + x) * 4;
          this.topCanvasImageData.data[index] = section.color.r * 255;
          this.topCanvasImageData.data[index + 1] = section.color.g * 255;
          this.topCanvasImageData.data[index + 2] = section.color.b * 255;
        }
      }
      return this.applyCanvases();
    }
  }
  ;
  Separator.register(Separator.id());
  return Separator;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.separator.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/page/separator/template.separator.js          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Separator");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Separator"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Separator", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-paletteselection-page-separator page"
  }, "\n    ", HTML.DIV({
    class: "category"
  }, Blaze.View("lookup:category", function() {
    return Spacebars.mustache(view.lookup("category"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"palette":{"palette.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/page/palette/palette.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, AR, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AEc = Artificial.Echo;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.PaletteSelection.Page.Palette = function () {
  class Palette extends PAA.PixelPad.Apps.Drawing.PaletteSelection.Page {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Palette';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.darkestColor = new ReactiveField(null);
      this.brightestColor = new ReactiveField(null);
      this.accentColor = new ReactiveField(null);
      return Tracker.autorun(computation => {
        var accentColor, brightestColor, brightestColorLCh, brightestColorLuminance, color, colorHeight, colorIndex, colorRows, colorWidth, colors, darkestColor, darkestColorLuminance, horizontalRemainder, i, index, j, k, l, lch, len, len1, len2, len3, m, minimumHeight, minimumWidth, n, o, p, pageTemplateImageData, palette, pixelArtAcademyPalette, ramp, ref, ref1, ref2, ref3, ref4, ref5, rowColors, rowIndex, shade, sortedColors, startX, startY, totalHeight, totalWidth, verticalRemainder, x, y;
        if (!(pixelArtAcademyPalette = LOI.palette())) {
          return;
        }
        if (!(pageTemplateImageData = this.constructor.pageTemplateImageData())) {
          return;
        }
        computation.stop();
        colors = [];
        palette = this.data();
        ref = palette.ramps;
        for (i = 0, len = ref.length; i < len; i++) {
          ramp = ref[i];
          ref1 = ramp.shades;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            shade = ref1[j];
            color = THREE.Color.fromObject(shade);
            colors.push(color);
            lch = color.getLCh();
            color.luminance = lch.l;
            if (lch.l < darkestColorLuminance) {
              darkestColor = color;
              darkestColorLuminance = lch.l;
            }
            if (lch.l > brightestColorLuminance) {
              brightestColor = color;
              brightestColorLuminance = lch.l;
            }
          }
        }
        sortedColors = _.sortBy(colors, color => {
          return color.luminance;
        });
        darkestColor = sortedColors[0];
        if (colors.length === 1) {
          brightestColor = pixelArtAcademyPalette.color(LOI.Assets.Palette.Atari2600.hues.gray, 8);
          accentColor = pixelArtAcademyPalette.color(LOI.Assets.Palette.Atari2600.hues.gray, 7);
        } else {
          brightestColor = sortedColors[sortedColors.length - 1];
          if (colors.length === 2) {
            brightestColorLCh = color.getLCh();
            accentColor = new THREE.Color().setLCh(brightestColorLCh.l * 0.9, brightestColorLCh.c, brightestColorLCh.h);
          } else {
            accentColor = sortedColors[sortedColors.length - 2];
          }
        }
        this.darkestColor(darkestColor);
        this.brightestColor(brightestColor);
        this.accentColor(accentColor);
        for (x = k = 0, ref2 = this.width; 0 <= ref2 ? k < ref2 : k > ref2; x = 0 <= ref2 ? ++k : --k) {
          for (y = l = 0, ref3 = this.height; 0 <= ref3 ? l < ref3 : l > ref3; y = 0 <= ref3 ? ++l : --l) {
            index = (y * this.width + x) * 4;
            color = pageTemplateImageData.data[index] ? brightestColor : darkestColor;
            this.topCanvasImageData.data[index] = color.r * 255;
            this.topCanvasImageData.data[index + 1] = color.g * 255;
            this.topCanvasImageData.data[index + 2] = color.b * 255;
          }
        }
        colorRows = PAA.PixelPad.Apps.Drawing.PaletteSelection.splitPaletteIntoColorRows(palette);
        totalHeight = 40;
        minimumHeight = Math.floor(totalHeight / colorRows.length);
        verticalRemainder = totalHeight % colorRows.length;
        startY = 14;
        for (rowIndex = m = 0, len2 = colorRows.length; m < len2; rowIndex = ++m) {
          rowColors = colorRows[rowIndex];
          colorHeight = minimumHeight;
          if (rowIndex < verticalRemainder) {
            colorHeight++;
          }
          totalWidth = 192;
          minimumWidth = Math.floor(totalWidth / rowColors.length);
          horizontalRemainder = totalWidth % rowColors.length;
          startX = 23;
          for (colorIndex = n = 0, len3 = rowColors.length; n < len3; colorIndex = ++n) {
            color = rowColors[colorIndex];
            colorWidth = minimumWidth;
            if (colorIndex < horizontalRemainder) {
              colorWidth++;
            }
            for (x = o = 0, ref4 = colorWidth - 1; 0 <= ref4 ? o < ref4 : o > ref4; x = 0 <= ref4 ? ++o : --o) {
              for (y = p = 0, ref5 = colorHeight - 1; 0 <= ref5 ? p < ref5 : p > ref5; y = 0 <= ref5 ? ++p : --p) {
                index = ((y + startY) * this.width + startX + x) * 4;
                this.topCanvasImageData.data[index] = color.r * 255;
                this.topCanvasImageData.data[index + 1] = color.g * 255;
                this.topCanvasImageData.data[index + 2] = color.b * 255;
              }
            }
            startX += colorWidth;
          }
          startY += colorHeight;
        }
        return this.applyCanvases();
      });
    }
    localizedName() {
      return {
        "1-bit Black and White": "1 位黑白",
        "Black": "黑色"
      }[this.data().name] || this.data().name;
    }
    infoStyle() {
      var darkestColor;
      if (!(darkestColor = this.darkestColor())) {
        return;
      }
      return {
        color: "#".concat(darkestColor.getHexString())
      };
    }
    lospecLogoStyle() {
      return this._lospecLogoStyle(this.brightestColor());
    }
    lospecLogoHoverStyle() {
      return this._lospecLogoStyle(this.accentColor());
    }
    _lospecLogoStyle(color) {
      if (!color) {
        return;
      }
      return {
        backgroundColor: "#".concat(color.getHexString())
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .page': this.onClickPage
      });
    }
    onClickPage(event) {
      if ($(event.target).closest('.lospec-link').length) {
        return;
      }
      this.paletteSelection = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.PaletteSelection);
      return this.paletteSelection.selectPalette(this.data());
    }
  }
  ;
  Palette.register(Palette.id());
  return Palette;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.palette.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/paletteselection/page/palette/template.palette.js              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Palette");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Palette"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.PaletteSelection.Page.Palette", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-paletteselection-page-palette page"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: "info"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("infoStyle"));
  }), "\n      ", HTML.SPAN({
    class: "name"
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("lospecAuthor"));
  }, function() {
    return [ "\n        ", HTML.SPAN({
      class: "author-area"
    }, "作者：\n          ", HTML.SPAN({
      class: "author"
    }, Blaze.View("lookup:lospecAuthor", function() {
      return Spacebars.mustache(view.lookup("lospecAuthor"));
    })), "\n        "), "\n      " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("lospecSlug"));
  }, function() {
    return [ "\n      ", HTML.A({
      class: "lospec-link",
      href: function() {
        return [ "https://lospec.com/palette-list/", Spacebars.mustache(view.lookup("lospecSlug")) ];
      },
      target: "_blank"
    }, "\n        ", HTML.SPAN(HTML.Attrs({
      class: "logo normal"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("lospecLogoStyle"));
    })), "\n        ", HTML.SPAN(HTML.Attrs({
      class: "logo hover"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("lospecLogoHoverStyle"));
    })), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"editor":{"editor.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/editor.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AC,
  AE,
  AM,
  FM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor = function () {
  class Editor extends LOI.Adventure.Thing {
    static styleClass() {
      throw new AE.NotImplementedException("Editor must provide a style class name.");
    }
    static getEditor() {
      var currentApp, drawing, pixelPad;
      if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
        return;
      }
      if (!(currentApp = pixelPad.os.currentApp())) {
        return;
      }
      if (!(currentApp instanceof PAA.PixelPad.Apps.Drawing)) {
        return;
      }
      drawing = currentApp;
      return drawing.editor();
    }
    constructor(drawing1) {
      super(...arguments);
      this.drawing = drawing1;

      // Drawing becomes active when theme transition completes.
      // The theme should set this to true or false based on its needs.
      this.drawingActive = new ReactiveField(false);

      // Editor is visible as soon as entry theme transition starts and continues until the exit
      // theme transition ends. The theme should set this to true or false based on its needs.
      this.visible = new ReactiveField(false);
      // Allow to manually provide sprite data.
      this.manualSpriteData = new ReactiveField(null);
      // Allow to manually activate the editor.
      this.manuallyActivated = new ReactiveField(false);
    }
    onCreated() {
      var filterAsset, interfaceData;
      super.onCreated(...arguments);

      // We can only deal with bitmap assets.
      filterAsset = asset => {
        if ((asset != null ? typeof asset.document === "function" ? asset.document() : void 0 : void 0) instanceof LOI.Assets.Bitmap) {
          return asset;
        } else {
          return null;
        }
      };
      this.activeAsset = new ComputedField(() => {
        var ref;
        return filterAsset((ref = this.drawing.portfolio().activeAsset()) != null ? ref.asset : void 0);
      });
      this.displayedAsset = new ComputedField(() => {
        var ref;
        return filterAsset((ref = this.drawing.portfolio().displayedAsset()) != null ? ref.asset : void 0);
      });

      // We need an editor view with a dummy file that will load data straight from the drawing app.
      this._dummyEditorViewFiles = [{
        id: 0,
        documentClassId: LOI.Assets.Asset.id(),
        active: true
      }];
      interfaceData = this.defaultInterfaceData();
      interfaceData.activeFileId = 0;
      this.localInterfaceData = new ReactiveField(interfaceData);
      this.interface = new FM.Interface(this, {
        load: () => {
          return this.localInterfaceData();
        },
        save: (address, value) => {
          var localInterfaceData;
          localInterfaceData = this.localInterfaceData();
          _.nestedProperty(localInterfaceData, address, value);
          return this.localInterfaceData(localInterfaceData);
        },
        loaders: {
          ["".concat(LOI.Assets.Asset.id())]: PAA.PixelPad.Apps.Drawing.Editor.AssetLoader
        }
      });
      // Handle changes when drawing is active.
      this.autorun(computation => {
        var drawingActive, fileData, paused;
        if (!this.interface.isCreated()) {
          return;
        }
        if (!(fileData = this.interface.getActiveFileData())) {
          return;
        }
        drawingActive = this.drawingActive();
        paused = LOI.adventure.paused();
        return Tracker.nonreactive(() => {
          // Activate the interface only when drawing is active and the adventure is not paused.
          this.interface.active(drawingActive && !paused);

          // Enable the pixel grid when in the editor.
          return fileData.child('pixelGrid').set('enabled', drawingActive);
        });
      });

      // Invert UI colors for assets with dark backgrounds.
      this.autorun(computation => {
        var backgroundColor, fileData, invert, ref;
        if (!this.interface.isCreated()) {
          return;
        }
        if (!(fileData = this.interface.getActiveFileData())) {
          return;
        }
        invert = false;
        if (backgroundColor = (ref = this.displayedAsset()) != null ? typeof ref.backgroundColor === "function" ? ref.backgroundColor() : void 0 : void 0) {
          invert = backgroundColor.r < 0.5 && backgroundColor.g < 0.5 && backgroundColor.b < 0.5;
        }
        return Tracker.nonreactive(() => {
          return fileData.set('invertUIColors', invert);
        });
      });

      // Deactivate active tool when closing the editor and reactivate it when opening if it's still available.
      this.autorun(computation => {
        var activeTool, ref, tool;
        if (!this.interface.isCreated()) {
          return;
        }
        if (this.active()) {
          // The editor is opened.
          if (!this.interface.activeTool()) {
            // Reactivate the last tool, but switch to the arrow (default) if the last active tool is not allowed anymore.
            tool = (ref = this._lastActiveTool, indexOf.call(this.interface.tools(), ref) >= 0) ? this._lastActiveTool : this.interface.getOperator(LOI.Assets.Editor.Tools.Arrow);
            return Tracker.nonreactive(() => {
              return this.interface.activateTool(tool);
            });
          }
        } else {
          // The editor is being closed.
          if (activeTool = this.interface.activeTool()) {
            // Remember which tool was used and deactivate it.
            this._lastActiveTool = activeTool;
            return Tracker.nonreactive(() => {
              return this.interface.deactivateTool();
            });
          }
        }
      });

      // Set zoom levels based on display scale.
      this.autorun(computation => {
        var displayScale, displayedAsset, minimumScale, previewInfo, zoomLevels, zoomLevelsHelper;
        if (!this.interface.isCreated()) {
          return;
        }
        zoomLevels = [100, 200, 300, 400, 600, 800, 1200, 1600];
        displayScale = LOI.adventure.interface.display.scale();
        if (displayScale % 3 === 0) {
          zoomLevels = [100 / 3, 200 / 3, ...zoomLevels];
        } else {
          zoomLevels = [50, ...zoomLevels];
        }
        // Extend zoom levels down to preview scale if necessary.
        if (displayedAsset = this.displayedAsset()) {
          if (previewInfo = displayedAsset.previewInfo()) {
            minimumScale = previewInfo.scale * 100;
            while (Math.round(minimumScale) < Math.round(zoomLevels[0])) {
              zoomLevels.unshift(zoomLevels[0] / 2);
            }
          }
        }
        zoomLevelsHelper = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.ZoomLevels);
        return Tracker.nonreactive(() => {
          return zoomLevelsHelper(zoomLevels);
        });
      });

      // Select a default color if no color is set or the color is not available.
      this.autorun(computation => {
        var asset, hasRestrictedPalette, materialIndex, paintHelper, palette, paletteColor, paletteId, ref, ref1, ref2, setColor;
        if (!this.interface.isCreated()) {
          return;
        }
        if (!(asset = (ref = this.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0)) {
          return;
        }
        hasRestrictedPalette = asset.hasRestrictedPalette();
        paintHelper = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.Paint);
        paletteColor = paintHelper.paletteColor();
        if (materialIndex = paintHelper.materialIndex()) {
          // Find the indexed color of the material.
          paletteColor = (ref1 = asset.materials) != null ? ref1[materialIndex] : void 0;
          setColor = !paletteColor;
        }
        if (hasRestrictedPalette) {
          if (paletteId = paintHelper.paletteId()) {
            // We have a specified palette. Wait until information about the palette is available.
            if (!(palette = LOI.Assets.Palette.documents.findOne(paletteId))) {
              return;
            }
          } else {
            // We have a restricted palette color. Wait until information about the palette is available.
            if (!(palette = asset.getRestrictedPalette())) {
              return;
            }
          }
        }
        if (paletteColor) {
          // Only reset the color if the palette does not contain the current one.
          setColor = !(palette != null ? (ref2 = palette.ramps[paletteColor.ramp]) != null ? ref2.shades[paletteColor.shade] : void 0 : void 0);
        } else {
          // We need to set the color if we're in restricted palette or we have no direct color.
          setColor = hasRestrictedPalette || !paintHelper.directColor();
        }
        if (setColor) {
          return Tracker.nonreactive(() => {
            var foundColor, i, len, ramp, rampIndex, ref3;
            // For assets with restricted colors, set the first available palette color.
            if (hasRestrictedPalette) {
              if (palette) {
                foundColor = false;
                ref3 = palette.ramps;
                for (rampIndex = i = 0, len = ref3.length; i < len; rampIndex = ++i) {
                  ramp = ref3[rampIndex];
                  if (!(ramp.shades.length > 0)) {
                    continue;
                  }
                  paintHelper.setPaletteColor({
                    ramp: rampIndex,
                    shade: 0
                  });
                  foundColor = true;
                  break;
                }
                if (!foundColor) {
                  return paintHelper.setClearColor();
                }
              } else {
                return paintHelper.setClearColor();
              }
            } else {
              // Set a black direct color.
              return paintHelper.setDirectColor({
                r: 0,
                g: 0,
                b: 0
              });
            }
          });
        }
      });

      // React to completing assets.
      return this.autorun(computation => {
        var asset, completed;
        if (!(asset = this.activeAsset())) {
          return;
        }
        if (!asset.completed) {
          return;
        }
        completed = asset.completed();
        if (this.drawingActive() && completed && !this._assetWasCompleted) {
          this.drawing.os.audio.complete();
        }
        return this._assetWasCompleted = completed;
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return $(document).on('keydown.pixelartacademy-pixelpad-apps-drawing-editor', event => {
        return this.onKeyDown(event);
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor');
    }
    defaultInterfaceData() {
      throw new AE.NotImplementedException("Editor must provide default interface data.");
    }
    getShortcuts() {
      var isMacOS;
      isMacOS = AM.ShortcutHelper.currentPlatformConvention === AM.ShortcutHelper.PlatformConventions.MacOS;
      return {
        currentMappingId: 'default',
        default: {
          name: "Default",
          mapping: {
            ["".concat(LOI.Assets.SpriteEditor.Tools.ColorFill.id())]: {
              key: AC.Keys.g
            },
            ["".concat(LOI.Assets.SpriteEditor.Tools.ColorPicker.id())]: [{
              key: AC.Keys.i,
              holdKey: AC.Keys.alt
            }, {
              holdKey: AC.Keys.c
            }],
            ["".concat(LOI.Assets.SpriteEditor.Tools.Line.id())]: {
              key: AC.Keys.l
            },
            ["".concat(LOI.Assets.SpriteEditor.Tools.Rectangle.id())]: {
              key: AC.Keys.u
            },
            ["".concat(LOI.Assets.SpriteEditor.Tools.Ellipse.id())]: {
              shift: true,
              key: AC.Keys.u
            },
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas.id())]: {
              key: AC.Keys.h,
              holdKey: AC.Keys.space,
              holdButton: AC.Buttons.auxiliary
            },
            ["".concat(LOI.Assets.Editor.Actions.Undo.id())]: {
              commandOrControl: true,
              key: AC.Keys.z
            },
            ["".concat(LOI.Assets.Editor.Actions.Redo.id())]: [{
              commandOrControl: true,
              key: AC.Keys.y
            }, {
              commandOrControl: true,
              shift: true,
              key: AC.Keys.z
            }],
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomIn.id())]: [{
              commandOrControl: true,
              key: AC.Keys.equalSign
            }, {
              shift: true,
              commandOrControl: true,
              key: AC.Keys.equalSign
            }, {
              commandOrControl: true,
              key: AC.Keys.numPlus
            }],
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomOut.id())]: [{
              commandOrControl: true,
              key: AC.Keys.dash
            }, {
              commandOrControl: true,
              key: AC.Keys.numMinus
            }],
            ["".concat(LOI.Assets.SpriteEditor.Actions.BrushSizeIncrease.id())]: [{
              key: AC.Keys.equalSign
            }, {
              shift: true,
              key: AC.Keys.equalSign
            }, {
              key: AC.Keys.numPlus
            }],
            ["".concat(LOI.Assets.SpriteEditor.Actions.BrushSizeDecrease.id())]: [{
              key: AC.Keys.dash
            }, {
              key: AC.Keys.numMinus
            }]
          }
        }
      };
    }
    active() {
      return this.manuallyActivated() || AB.Router.getParameter('parameter4') === 'edit';
    }
    onBackButton() {
      if (!this.manuallyActivated()) {
        return;
      }
      this.manuallyActivated(false);
      // Inform that we've handled the back button.
      return true;
    }
    onKeyDown(event) {
      // Prevent the alt key opening the menu in the desktop version.
      if (!Meteor.isDesktop) {
        return;
      }
      if (!this.drawingActive()) {
        return;
      }
      if (event.keyCode === AC.Keys.alt) {
        return event.preventDefault();
      }
    }
  }
  ;
  Editor.ReferenceDisplayTypes = {
    Default: 'Default',
    SceneObject: 'SceneObject',
    Model: 'Model'
  };
  return Editor;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"editors.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/editors.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editors = function () {
  class Editors extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editors';
    }
  }
  ;
  Editors.initialize();
  return Editors;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetloader.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/assetloader.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, FM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.AssetLoader = class AssetLoader extends FM.Loader {
  constructor() {
    super(...arguments);
    this.drawing = this.interface.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
    this.portfolio = this.drawing.portfolio();
    this.editor = this.drawing.editor();
    this.asset = new ComputedField(() => {
      var asset, base, ref;
      asset = this.editor.manualSpriteData() || ((ref = this.portfolio.displayedAsset()) != null ? typeof (base = ref.asset).document === "function" ? base.document() : void 0 : void 0);

      // We can only deal with assets that can return pixels.
      if (asset instanceof LOI.Assets.Sprite || asset instanceof LOI.Assets.Bitmap) {
        return asset;
      } else {
        return null;
      }
    }, true);

    // Subscribe to the referenced palette as well.
    this.paletteIds = new ComputedField(() => {
      var ref;
      return (ref = this.asset()) != null ? ref.getAllPaletteIds() : void 0;
    }, true);
    this.autorun(computation => {
      var paletteIds;
      if (!(paletteIds = this.paletteIds())) {
        return;
      }
      return LOI.Assets.Palette.forIds.subscribeContent(paletteIds);
    });
    // We extract the custom palette separately to minimize reactivity.
    this.customPalette = new ComputedField(() => {
      var ref;
      return (ref = this.asset()) != null ? ref.customPalette : void 0;
    }, EJSON.equals);
    this.palettes = new ComputedField(() => {
      var customPalette, paletteIds;
      if (paletteIds = this.paletteIds()) {
        return LOI.Assets.Palette.documents.fetch({
          _id: {
            $in: paletteIds
          }
        });
      } else {
        // See if we have an embedded custom palette.
        if (customPalette = this.customPalette()) {
          return [customPalette];
        } else {
          return [];
        }
      }
    }, true);
    this.palette = new ComputedField(() => {
      return this.palettes()[0];
    }, true);
  }
  destroy() {
    super.destroy(...arguments);
    this.asset.stop();
    this.paletteIds.stop();
    this.palettes.stop();
    return this.palette.stop();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelcanvascomponents.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/pixelcanvascomponents.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, FM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.PixelCanvasComponents = function () {
  class PixelCanvasComponents extends FM.Helper {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.PixelCanvasComponents';
    }
    constructor() {
      super(...arguments);
      this.drawing = this.interface.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
      this.components = new ComputedField(() => {
        var assetComponents, components, displayedAsset, editor, editorActive, i, len, provider, providers;
        if (!(editor = this.drawing.editor())) {
          return;
        }
        if (!editor.isCreated()) {
          return;
        }
        editorActive = editor.active();
        // Add components from the displayed asset and editor.
        displayedAsset = editor.displayedAsset();
        providers = [displayedAsset, editor];
        components = [];
        for (i = 0, len = providers.length; i < len; i++) {
          provider = providers[i];
          // Add any custom components that are visible all the time.
          if (assetComponents = provider != null ? typeof provider.drawComponents === "function" ? provider.drawComponents() : void 0 : void 0) {
            components.push(...assetComponents);
          }

          // Add components visible only in the editor.
          if (editorActive) {
            if (assetComponents = provider != null ? typeof provider.editorDrawComponents === "function" ? provider.editorDrawComponents() : void 0 : void 0) {
              components.push(...assetComponents);
            }
          }
        }
        return components;
      }, true);
    }
    destroy() {
      super.destroy(...arguments);
      return this.components.stop();
    }
  }
  ;
  PixelCanvasComponents.initialize();
  return PixelCanvasComponents;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorhelp.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/colorhelp.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.ColorHelp = function () {
  class ColorHelp {
    static hintStyle() {
      return this.state('hintStyle') || this.HintStyle.Dots;
    }
    static errorStyle() {
      return this.state('errorStyle') || null;
    }
    static colorNamesMode() {
      var ref;
      return ((ref = this.state('colorNames')) != null ? ref.mode : void 0) || null;
    }
  }
  ;

  // hintStyle: the shape of the hints (dots by default)
  // errorStyle: how to display when a mismatch happened (or null if no error should be shown)
  // colorNames: how to show color names
  //   mode: mode selection when to show color names when hovering over a pixel or palette color (or null if no names should be shown)
  //   delayDuration: number of seconds required to hover
  ColorHelp.stateAddress = new LOI.StateAddress("things.PixelPad.Apps.Drawing.Editor.ColorHelp");
  ColorHelp.state = new LOI.StateObject({
    address: ColorHelp.stateAddress
  });
  ColorHelp.HintStyle = {
    Dots: 'Dots',
    Symbols: 'Symbols'
  };
  ColorHelp.ErrorStyle = {
    PixelOutline: 'PixelOutline',
    HintOutline: 'HintOutline',
    HintGlow: 'HintGlow'
  };
  ColorHelp.NamesMode = {
    ColorPicker: 'ColorPicker',
    Always: 'Always'
  };
  ColorHelp.symbols = "✚♥♦★\n☾▲▙◢\n⚑▶▛◣\n⌘▼▜◤\n▰◀▟#\n*◇▢◻▱\n↖◸←\n↗◹↑\n↘◺→\n↙◿↓\n☺☹+–=\n◈◬◉✙◍◎\n◘▤▥▣▩\n&%[]{}<>?✓✕\n▦▧▨◙◧◨◩◪\n◐◑◒◓◔◕\n↔↺↻▵▹▿◃\n◰◱◲◳\n⇐⇒⇔⇕⇖⇗⇘⇙\n◴◵◶◷◽◾\n0123456789\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n↕♣♠♫@♭♪✜\n☀☂☻☼♯✔☽\nabcdefghijklmnopqrstuvwxyz".match(/[^\s]/g);
  return ColorHelp;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tools":{"tools.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/tools/tools.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, LOI, PAA;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Tools = class Tools {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"movecanvas.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/tools/movecanvas.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas = function () {
  class MoveCanvas extends FM.Tool {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas';
    }
    static displayName() {
      return "Move canvas";
    }
    constructor() {
      super(...arguments);
      this.moving = new ReactiveField(false);
      this.display = this.interface.callAncestorWith('display');
      // Request realtime updates when moving the canvas.
      this.realtimeUpdating = this.moving;
    }
    onActivated() {
      var pointerState;
      pointerState = AC.Pointer.getState();
      if (pointerState.isButtonDown(AC.Buttons.auxiliary)) {
        this.startMoving();
        return;
      }

      // Listen for pointer down.
      return $(document).on("pointerdown.pixelartacademy-pixelpad-apps-drawing-editor-tools-move", event => {
        var $target;
        $target = $(event.target);
        // Only activate when we're moving from the pixel canvas.
        if (!$target.closest('.landsofillusions-assets-spriteeditor-pixelcanvas').length) {
          return;
        }
        this.startMoving();

        // Wire end of dragging on pointer up.
        return $(document).on("pointerup.pixelartacademy-pixelpad-apps-drawing-editor-tools-move-dragging", event => {
          return this.endMoving();
        });
      });
    }
    startMoving() {
      this.moving(true);
      this._pointerPosition = {
        x: event.clientX,
        y: event.clientY
      };
      return $(document).on("pointermove.pixelartacademy-pixelpad-apps-drawing-editor-tools-move-dragging", event => {
        var dragDelta, editor, origin, originDataField, scale;
        dragDelta = {
          x: event.clientX - this._pointerPosition.x,
          y: event.clientY - this._pointerPosition.y
        };
        editor = this.interface.getEditorForActiveFile();
        originDataField = editor.camera().originData();
        origin = originDataField.value();
        scale = editor.camera().effectiveScale();
        originDataField.value({
          x: origin.x - dragDelta.x / scale,
          y: origin.y - dragDelta.y / scale
        });
        return this._pointerPosition = {
          x: event.clientX,
          y: event.clientY
        };
      });
    }
    endMoving() {
      $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor-tools-move-dragging');
      return this.moving(false);
    }
    onDeactivated() {
      this.endMoving();
      return $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor-tools-move');
    }
  }
  ;
  MoveCanvas.initialize();
  return MoveCanvas;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"analyze.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/tools/analyze.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Tools.Analyze = function () {
  class Analyze extends FM.Tool {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Tools.Analyze';
    }
    static displayName() {
      return "Analyze";
    }
  }
  ;
  Analyze.initialize();
  return Analyze;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"desktop":{"desktop.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/desktop.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC,
  AE,
  AEc,
  AM,
  FM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AC = Artificial.Control;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Desktop = function () {
  class Desktop extends PAA.PixelPad.Apps.Drawing.Editor {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "桌面";
    }
    static styleClass() {
      return 'editor-desktop';
    }
    static compressPan(x) {
      var n;
      // Since desktop items go out of the screen, we don't want them to clamp to -1 and 1, but smoothly approach it.
      //    2
      // ──────── - 1
      // 1 + e⁻ⁿˣ

      // n is the initial slope factor (2 being about linear at the start).
      n = 2;
      return 2 / (1 + Math.exp(-n * x)) - 1;
    }
    constructor() {
      super(...arguments);
      this.focusedMode = new ReactiveField(false);
    }
    onCreated() {
      var handleView, historyActionRequirements, toolKeys, toolRequirements, viewId, viewsToolRequirements, zoomActionRequirements;
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(Artificial.Base.App);
      this.app.addComponent(this);
      this._dragTimeLeft = 0;

      // Reactively add views.
      handleView = (viewId, enabled) => {
        var applicationAreaData, existingViewIndex, view, views;
        if (!this.interface.isCreated()) {
          return;
        }
        applicationAreaData = this.interface.currentApplicationAreaData();
        views = applicationAreaData.get('views');
        existingViewIndex = _.findIndex(views, view => {
          return view.type === viewId;
        });
        if (enabled) {
          // Add the view if it's not yet added.
          if (existingViewIndex === -1) {
            view = {
              type: viewId
            };
            views.push(view);
            return Tracker.nonreactive(() => {
              return applicationAreaData.set('views', views);
            });
          }
        } else {
          // Remove the view if it's there.
          if (existingViewIndex > -1) {
            views.splice(existingViewIndex, 1);
            return Tracker.nonreactive(() => {
              return applicationAreaData.set('views', views);
            });
          }
        }
      };
      viewsToolRequirements = {
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Zoom.id())]: PAA.Practice.Software.Tools.ToolKeys.Zoom,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Palette.id())]: PAA.Practice.Software.Tools.ToolKeys.ColorSwatches,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.ColorFill.id())]: PAA.Practice.Software.Tools.ToolKeys.ColorFill,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.TestPaper.id())]: [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo],
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.id())]: PAA.Practice.Software.Tools.ToolKeys.References,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Ruler.id())]: [PAA.Practice.Software.Tools.ToolKeys.Line, PAA.Practice.Software.Tools.ToolKeys.Rectangle, PAA.Practice.Software.Tools.ToolKeys.Ellipse]
      };
      for (viewId in viewsToolRequirements) {
        toolKeys = viewsToolRequirements[viewId];
        ((viewId, toolKeys) => {
          if (!_.isArray(toolKeys)) {
            toolKeys = [toolKeys];
          }
          return this.autorun(computation => {
            var anyToolIsAvailable;
            anyToolIsAvailable = _.some(toolKeys, toolKey => {
              return this.toolIsAvailable(toolKey);
            });
            return handleView(viewId, anyToolIsAvailable);
          });
        })(viewId, toolKeys);
      }
      this.autorun(computation => {
        var pico8Cartridge, ref, ref1;
        pico8Cartridge = ((ref = this.displayedAsset()) != null ? (ref1 = ref.project) != null ? ref1.pico8Cartridge : void 0 : void 0) != null;
        return handleView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Pico8.id(), pico8Cartridge);
      });
      this.autorun(computation => {
        var assetRequiresPixelArtEvaluation, base, documentHasPixelArtEvaluation, ref, ref1, ref2, ref3;
        // Show pixel art evaluation if the document has it.
        documentHasPixelArtEvaluation = (ref = this.displayedAsset()) != null ? (ref1 = ref.document()) != null ? (ref2 = ref1.properties) != null ? ref2.pixelArtEvaluation : void 0 : void 0 : void 0;

        // Show pixel art evaluation if the asset requires it.
        assetRequiresPixelArtEvaluation = (ref3 = this.displayedAsset()) != null ? typeof (base = ref3.constructor).pixelArtEvaluation === "function" ? base.pixelArtEvaluation() : void 0 : void 0;
        // TODO: Show pixel art evaluation if the asset allows it and it was unlocked.
        return handleView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.id(), documentHasPixelArtEvaluation || assetRequiresPixelArtEvaluation);
      });
      this.autorun(computation => {
        var assetRequiresReadabilityAnalysis, base, documentHasReadabilityAnalysis, ref, ref1, ref2, ref3;
        // Show readability analysis if the document has it.
        documentHasReadabilityAnalysis = (ref = this.displayedAsset()) != null ? (ref1 = ref.document()) != null ? (ref2 = ref1.properties) != null ? ref2.readabilityAnalysis : void 0 : void 0 : void 0;

        // Show readability analysis if the asset requires it.
        assetRequiresReadabilityAnalysis = (ref3 = this.displayedAsset()) != null ? typeof (base = ref3.constructor).readabilityAnalysis === "function" ? base.readabilityAnalysis() : void 0 : void 0;
        return handleView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis.id(), documentHasReadabilityAnalysis || assetRequiresReadabilityAnalysis);
      });
      this.autorun(computation => {
        var base, publications, ref;
        // Show publications if the asset requires it.
        publications = (ref = this.displayedAsset()) != null ? typeof (base = ref.constructor).availablePublications === "function" ? base.availablePublications() : void 0 : void 0;
        return handleView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Publications.id(), publications != null ? publications.length : void 0);
      });

      // Reactively add tools and actions.
      toolRequirements = {
        ["".concat(LOI.Assets.SpriteEditor.Tools.Pencil.id())]: PAA.Practice.Software.Tools.ToolKeys.Pencil,
        ["".concat(LOI.Assets.SpriteEditor.Tools.HardEraser.id())]: PAA.Practice.Software.Tools.ToolKeys.Eraser,
        ["".concat(LOI.Assets.SpriteEditor.Tools.ColorFill.id())]: PAA.Practice.Software.Tools.ToolKeys.ColorFill,
        ["".concat(LOI.Assets.SpriteEditor.Tools.ColorPicker.id())]: PAA.Practice.Software.Tools.ToolKeys.ColorPicker,
        ["".concat(LOI.Assets.SpriteEditor.Tools.Line.id())]: PAA.Practice.Software.Tools.ToolKeys.Line,
        ["".concat(LOI.Assets.SpriteEditor.Tools.Rectangle.id())]: PAA.Practice.Software.Tools.ToolKeys.Rectangle,
        ["".concat(LOI.Assets.SpriteEditor.Tools.Ellipse.id())]: PAA.Practice.Software.Tools.ToolKeys.Ellipse,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas.id())]: PAA.Practice.Software.Tools.ToolKeys.MoveCanvas
      };
      this.autorun(computation => {
        var applicationAreaData, toolId, toolKey, toolboxViewIndex, tools, views;
        if (!this.interface.isCreated()) {
          return;
        }
        applicationAreaData = this.interface.currentApplicationAreaData();
        views = applicationAreaData.get('views');
        toolboxViewIndex = _.findIndex(views, view => {
          return view.type === FM.Toolbox.id();
        });
        tools = [LOI.Assets.Editor.Tools.Arrow.id()];
        for (toolId in toolRequirements) {
          toolKey = toolRequirements[toolId];
          if (this.toolIsAvailable(toolKey)) {
            tools.push(toolId);
          }
        }
        return Tracker.nonreactive(() => {
          return applicationAreaData.set("views.".concat(toolboxViewIndex, ".tools"), tools);
        });
      });
      historyActionRequirements = {
        ["".concat(LOI.Assets.Editor.Actions.Undo.id())]: PAA.Practice.Software.Tools.ToolKeys.Undo,
        ["".concat(LOI.Assets.Editor.Actions.Redo.id())]: PAA.Practice.Software.Tools.ToolKeys.Redo
      };
      this.autorun(computation => {
        var actionId, actions, applicationAreaData, testPaperViewIndex, toolKey, views;
        if (!this.interface.isCreated()) {
          return;
        }
        applicationAreaData = this.interface.currentApplicationAreaData();
        views = applicationAreaData.get('views');
        testPaperViewIndex = _.findIndex(views, view => {
          return view.type === PAA.PixelPad.Apps.Drawing.Editor.Desktop.TestPaper.id();
        });
        if (!(testPaperViewIndex > -1)) {
          return;
        }
        actions = function () {
          var results;
          results = [];
          for (actionId in historyActionRequirements) {
            toolKey = historyActionRequirements[actionId];
            if (this.toolIsAvailable(toolKey)) {
              results.push(actionId);
            }
          }
          return results;
        }.call(this);
        return Tracker.nonreactive(() => {
          return applicationAreaData.set("views.".concat(testPaperViewIndex, ".actions"), actions);
        });
      });
      zoomActionRequirements = {
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomIn.id())]: PAA.Practice.Software.Tools.ToolKeys.Zoom,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomOut.id())]: PAA.Practice.Software.Tools.ToolKeys.Zoom
      };
      this.autorun(computation => {
        var actionId, actions, applicationAreaData, toolKey, views, zoomViewIndex;
        if (!this.interface.isCreated()) {
          return;
        }
        applicationAreaData = this.interface.currentApplicationAreaData();
        views = applicationAreaData.get('views');
        zoomViewIndex = _.findIndex(views, view => {
          return view.type === PAA.PixelPad.Apps.Drawing.Editor.Desktop.Zoom.id();
        });
        if (!(zoomViewIndex > -1)) {
          return;
        }
        actions = function () {
          var results;
          results = [];
          for (actionId in zoomActionRequirements) {
            toolKey = zoomActionRequirements[actionId];
            if (this.toolIsAvailable(toolKey)) {
              results.push(actionId);
            }
          }
          return results;
        }.call(this);
        return Tracker.nonreactive(() => {
          return applicationAreaData.set("views.".concat(zoomViewIndex, ".actions"), actions);
        });
      });

      // Add or remove right-click for eraser.
      this.autorun(computation => {
        var rightClick;
        if (!this.interface.isCreated()) {
          return;
        }
        rightClick = LOI.settings.controls.rightClick.value();
        return Tracker.nonreactive(() => {
          var interfaceData, shortcut;
          shortcut = {
            holdButton: AC.Buttons.secondary
          };
          interfaceData = this.localInterfaceData();
          if (rightClick === LOI.Settings.Controls.RightClick.Eraser) {
            interfaceData.shortcuts.default.mapping[LOI.Assets.SpriteEditor.Tools.HardEraser.id()].push(shortcut);
          } else {
            _.remove(interfaceData.shortcuts.default.mapping[LOI.Assets.SpriteEditor.Tools.HardEraser.id()], existingShortcut => {
              return EJSON.equals(existingShortcut, shortcut);
            });
          }
          return this.localInterfaceData(interfaceData);
        });
      });

      // Listen for tool changes to play activation sounds.
      this._hadStoredTool = false;
      return Tracker.triggerOnDefinedChange(() => {
        if (!this.interface.isCreated()) {
          return;
        }
        return this.interface.activeToolId();
      }, (activeToolId, previousActiveToolId) => {
        var ref, toolbox;
        // Only sound on switching tools.
        if (!previousActiveToolId) {
          return;
        }

        // Don't sound when returning from a stored (hold key) tool.
        if (this._hadStoredTool) {
          this._hadStoredTool = false;
          return;
        }

        // If the tool was selected through the toolbox, the sound should come from the tool position.
        toolbox = this.interface.getView(FM.Toolbox);
        if ((toolbox != null ? (ref = toolbox.timeOfLastToolActivation()) != null ? ref.getTime() : void 0 : void 0) > Date.now() - 100) {
          this._prepareUpdatePan(activeToolId);
          this._updatePan();
        } else {
          // Otherwise, sound from the center by resetting the pan variables.
          this.audio.colorFillPan(0);
          this.audio.pencilPan(0);
          this.audio.colorPickerPan(0);
          this.audio.rulerPan(0);
        }

        // Trigger tool sound.
        switch (activeToolId) {
          case LOI.Assets.SpriteEditor.Tools.ColorFill.id():
            this.audio.colorFillActivate();
            break;
          case LOI.Assets.SpriteEditor.Tools.ColorPicker.id():
            this.audio.colorPickerActivate();
            break;
          case LOI.Assets.SpriteEditor.Tools.HardEraser.id():
            this.audio.eraserActivate();
            break;
          case LOI.Assets.SpriteEditor.Tools.Pencil.id():
            this.audio.pencilActivate();
            break;
          case LOI.Assets.SpriteEditor.Tools.Line.id():
            this.audio.rulerActivate();
            break;
          case LOI.Assets.SpriteEditor.Tools.Rectangle.id():
            this.audio.rulerActivate();
            break;
          case LOI.Assets.SpriteEditor.Tools.Ellipse.id():
            this.audio.rulerActivate();
        }
        return this._hadStoredTool = this.interface.storedTool();
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.autorun(() => {
        // Cancel any previous timeouts.
        Meteor.clearTimeout(this._activateDrawingTimeout);
        Meteor.clearTimeout(this._setEditorInvisibleTimeout);
        if (this.active()) {
          // Add the drawing active class with delay so that the initial transitions still happen slowly.
          this._activateDrawingTimeout = Meteor.setTimeout(() => {
            return this.drawingActive(true);
          }, 1000);

          // Immediately set the editor to be visible.
          return this.visible(true);
        } else {
          // Immediately remove the drawing active class so that the slow transitions kick in.
          this.drawingActive(false);
          // The editor become invisible after the transition.
          return this._setEditorInvisibleTimeout = Meteor.setTimeout(() => {
            return this.visible(false);
          }, 1000);
        }
      });

      // Trigger dragging of present items when the active status changes.
      Tracker.triggerOnDefinedChange(() => {
        if (this.active()) {
          return true;
        } else {
          return false;
        }
      }, active => {
        var toolsDelay;
        // Tools come in with a half a second delay when entering.
        toolsDelay = active ? 500 : 0;
        return this._dragPresentItems(active, !active, true, toolsDelay);
      });

      // Trigger dragging of present items (but not the asset since that doesn't move) when the focused mode changes.
      Tracker.triggerOnDefinedChange(this.focusedMode, focused => {
        return this._dragPresentItems(!focused, true, false, 0);
      });

      // Update pan for the first time if we're starting directly in the editor.
      this._prepareUpdatePan();
      return this._updatePan();
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.app.removeComponent(this);
    }
    editorDrawComponents() {
      var provider, providers;
      providers = [this.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation), this.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis)];
      return _.flatten(function () {
        var i, len, results;
        results = [];
        for (i = 0, len = providers.length; i < len; i++) {
          provider = providers[i];
          if (provider != null) {
            results.push(provider.editorDrawComponents());
          }
        }
        return results;
      }());
    }
    _dragPresentItems(visible, clipboardWithItems, mainDrag, toolsDelay) {
      var editorStyleClasses, ref;
      this._prepareUpdatePan();
      this._dragTimeLeft = 1;
      this._mainDrag = mainDrag;
      if (mainDrag) {
        this._dragEntering = visible;
        this.audio.artworkDrag(visible);
      }
      this.audio.clipboardDrag(visible);

      // Specify whether clipboard travels together with other items (it does when focused or when closing the editor).
      // When traveling separately, the clipboard plays at full volume and lets other items be louder as well.
      this.audio.clipboardWithItems(clipboardWithItems);
      if (editorStyleClasses = (ref = this.displayedAsset()) != null ? ref.editorStyleClasses() : void 0) {
        if (editorStyleClasses.indexOf('hidden-tools') > -1) {
          this.audio.toolsCount(0);
          return;
        }
      }
      return Meteor.setTimeout(() => {
        var base, displayedAsset, incrementToolCount, pixelArtEvaluation, readabilityAnalysis, ref1, ref2, ref3, toolsCount;
        toolsCount = 0;
        incrementToolCount = toolIsAvailable => {
          if (toolIsAvailable) {
            toolsCount++;
          }
          return toolIsAvailable;
        };
        displayedAsset = this.displayedAsset();
        if (incrementToolCount(this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.ColorFill))) {
          this.audio.colorFillDrag(visible);
        }
        if (incrementToolCount(this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.Pencil) || this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.Eraser))) {
          this.audio.pencilDrag(visible);
        }
        if (incrementToolCount((ref1 = this._getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.References)) != null ? ref1.displayComponent.enabled() : void 0)) {
          this.audio.referencesTrayDrag(visible);
        }
        if (incrementToolCount(this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.ColorPicker) && (!editorStyleClasses || editorStyleClasses.indexOf('hidden-color-picker') === -1))) {
          this.audio.colorPickerDrag(visible);
        }
        if (incrementToolCount(this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.Zoom))) {
          this.audio.zoomDrag(visible);
        }
        if (incrementToolCount(this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.ColorSwatches))) {
          this.audio.colorSwatchesDrag(visible);
        }
        if (incrementToolCount((displayedAsset != null ? (ref2 = displayedAsset.project) != null ? ref2.pico8Cartridge : void 0 : void 0) != null)) {
          this.audio.pico8Drag(visible);
        }
        if (pixelArtEvaluation = this._getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation)) {
          if (incrementToolCount(pixelArtEvaluation.paperDisplayed() && !pixelArtEvaluation.active())) {
            this.audio.pixelArtEvaluationDrag(visible);
          }
        }
        if (readabilityAnalysis = this._getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis)) {
          if (incrementToolCount(readabilityAnalysis.paperDisplayed() && !readabilityAnalysis.active())) {
            this.audio.readabilityAnalysisDrag(visible);
          }
        }
        if (incrementToolCount((displayedAsset != null ? typeof (base = displayedAsset.constructor).availablePublications === "function" ? base.availablePublications().length : void 0 : void 0) && !((ref3 = this._getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Publications)) != null ? ref3.active() : void 0))) {
          this.audio.publicationsDrag(visible);
        }
        if (incrementToolCount(this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.Line) || this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.Rectangle) || this.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.Ellipse))) {
          this.audio.rulerDrag(visible);
        }
        return this.audio.toolsCount(toolsCount);
      }, toolsDelay);
    }
    onBackButton() {
      var backButtonHandler, i, len, ref;
      ref = this.allChildComponentsWith('onBackButton');
      // Ask children components if they want to handle the back button.
      for (i = 0, len = ref.length; i < len; i++) {
        backButtonHandler = ref[i];
        if (backButtonHandler.onBackButton()) {
          return true;
        }
      }
      if (!this.focusedMode()) {
        // Turn off focused mode on back button.
        return super.onBackButton(...arguments);
      }
      this.focusedMode(false);
      // Inform that we've handled the back button.
      return true;
    }
    defaultInterfaceData() {
      var activeToolId, components, layouts, shortcuts, views;
      activeToolId = LOI.Assets.Editor.Tools.Arrow.id();
      components = {
        ["".concat(_.snakeCase(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelCanvas.id()))]: {
          components: [PAA.PixelPad.Apps.Drawing.Editor.PixelCanvasComponents.id()],
          scrollToZoom: {
            animate: {
              duration: 0.2
            }
          }
        },
        ["".concat(_.snakeCase(LOI.Assets.SpriteEditor.Helpers.Brush.id()))]: {
          round: true
        }
      };
      views = [{
        type: FM.Menu.id(),
        items: [PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.Focus.id(), LOI.Assets.SpriteEditor.Actions.BrushSizeIncrease.id(), LOI.Assets.SpriteEditor.Actions.BrushSizeDecrease.id()]
      }, {
        type: FM.Toolbox.id(),
        tools: []
      }, {
        type: FM.EditorView.id(),
        files: this._dummyEditorViewFiles,
        editor: {
          contentComponentId: PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelCanvas.id()
        }
      }];
      layouts = {
        currentLayoutId: 'main',
        main: {
          name: 'Main',
          applicationArea: {
            type: FM.MultiView.id(),
            views: views
          }
        }
      };
      shortcuts = _.defaultsDeep({
        default: {
          mapping: {
            ["".concat(LOI.Assets.SpriteEditor.Tools.HardEraser.id())]: [{
              key: AC.Keys.e
            }, {
              holdButton: AC.Buttons.fifth
            }],
            ["".concat(LOI.Assets.SpriteEditor.Tools.Pencil.id())]: {
              key: AC.Keys.b
            },
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.Focus.id())]: {
              key: AC.Keys.f
            }
          }
        }
      }, this.getShortcuts());
      // Return combined interface data.
      return {
        activeToolId,
        components,
        layouts,
        shortcuts
      };
    }
    drawingActiveClass() {
      if (this.drawingActive()) {
        return 'drawing-active';
      }
    }
    focusedModeClass() {
      if (this.focusedMode()) {
        return 'focused-mode';
      }
    }
    draggingClass() {
      var moveTool, pico8, references;
      if (!this.interface.isCreated()) {
        return;
      }
      moveTool = this.interface.getOperator(PAA.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas.id());
      references = this._getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.References);
      pico8 = this._getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Pico8);
      if (_.some([moveTool.moving(), references != null ? references.displayComponent.dragging() : void 0, pico8 != null ? pico8.dragging() : void 0])) {
        return 'dragging';
      }
    }
    resizingDirectionClass() {
      var ref, references;
      if (!(references = this._getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.References))) {
        return;
      }
      return (ref = references.displayComponent.resizingReference()) != null ? ref.resizingDirectionClass() : void 0;
    }
    toolIsAvailable(toolKey) {
      var availableKeys, ref;
      if (!(availableKeys = (ref = this.displayedAsset()) != null ? typeof ref.availableToolKeys === "function" ? ref.availableToolKeys() : void 0 : void 0)) {
        return true;
      }
      return indexOf.call(availableKeys, toolKey) >= 0;
    }
    _getView(viewClass) {
      if (!this.interface.isCreated()) {
        return;
      }
      return this.interface.getView(viewClass);
    }
    update(appTime) {
      var timeScale;
      if (!(this._dragTimeLeft > 0)) {
        return;
      }
      this._dragTimeLeft -= appTime.elapsedAppTime;
      if (this._mainDrag) {
        // Account for items being closer together when the editor is closed.
        timeScale = this._dragEntering ? 1 + this._dragTimeLeft : 2 - this._dragTimeLeft;
      }
      return this._updatePan(timeScale);
    }
    _prepareUpdatePan(activeToolId) {
      this._clipboard = $('.pixelartacademy-pixelpad-apps-drawing-clipboard')[0];
      this._canvas = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelcanvas .canvas')[0];
      this._colorFillGlass = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-colorfill .glass')[0];
      this._testPaper = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-testpaper')[0];
      this._pencil = $('.fatamorgana-toolbox .pencil')[0];
      this._eraser = $('.fatamorgana-toolbox .eraser')[0];
      this._colorPicker = $('.fatamorgana-toolbox .color-picker')[0];
      this._zoom = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-zoom')[0];
      this._palette = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-palette')[0];
      this._pico8 = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8')[0];
      this._pixelArtEvaluation = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation')[0];
      this._readabilityAnalysis = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-readabilityanalysis')[0];
      switch (activeToolId) {
        case LOI.Assets.SpriteEditor.Tools.Line.id():
          return $('.fatamorgana-toolbox .line')[0];
        case LOI.Assets.SpriteEditor.Tools.Rectangle.id():
          return this._ruler = $('.fatamorgana-toolbox .rectangle')[0];
        case LOI.Assets.SpriteEditor.Tools.Ellipse.id():
          return this._ruler = $('.fatamorgana-toolbox .ellipse')[0];
        default:
          return this._ruler = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-ruler')[0];
      }
    }
    _updatePan() {
      let timeScale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var adjustPan, pencil;
      adjustPan = pan => {
        return this.constructor.compressPan(timeScale * pan);
      };
      this.audio.clipboardPan(adjustPan(AEc.getPanForElement(this._clipboard)));
      this.audio.artworkPan(adjustPan(AEc.getPanForElement(this._canvas)));
      if (this._colorFillGlass) {
        this.audio.colorFillPan(adjustPan(AEc.getPanForElement(this._colorFillGlass)));
      }
      if (this._testPaper) {
        this.audio.testPaperPan(adjustPan(AEc.getPanForElement(this._testPaper)));
      }
      if (pencil = this._pencil || this._eraser) {
        this.audio.pencilPan(adjustPan(AEc.getPanForElement(pencil)));
      }
      if (this._colorPicker) {
        this.audio.colorPickerPan(adjustPan(AEc.getPanForElement(this._colorPicker)));
      }
      if (this._zoom) {
        this.audio.zoomPan(adjustPan(AEc.getPanForElement(this._zoom)));
      }
      if (this._palette) {
        this.audio.colorSwatchesPan(adjustPan(AEc.getPanForElement(this._palette)));
      }
      if (this._pico8) {
        this.audio.pico8Pan(adjustPan(AEc.getPanForElement(this._pico8)));
      }
      if (this._pixelArtEvaluation) {
        this.audio.pixelArtEvaluationPan(adjustPan(AEc.getPanForElement(this._pixelArtEvaluation)));
      }
      if (this._readabilityAnalysis) {
        this.audio.readabilityAnalysisPan(adjustPan(AEc.getPanForElement(this._readabilityAnalysis)));
      }
      if (this._ruler) {
        return this.audio.rulerPan(adjustPan(AEc.getPanForElement(this._ruler)));
      }
    }
  }
  ;
  Desktop.register(Desktop.id());
  Desktop.initialize();
  Desktop.Audio = new LOI.Assets.Audio.Namespace(Desktop.id(), {
    variables: {
      clipboardWithItems: AEc.ValueTypes.Boolean,
      clipboardDrag: AEc.ValueTypes.Boolean,
      clipboardPan: AEc.ValueTypes.Number,
      artworkDrag: AEc.ValueTypes.Boolean,
      artworkPan: AEc.ValueTypes.Number,
      toolsCount: AEc.ValueTypes.Number,
      colorFillDrag: AEc.ValueTypes.Boolean,
      colorFillPan: AEc.ValueTypes.Number,
      colorFillActivate: AEc.ValueTypes.Trigger,
      pencilDrag: AEc.ValueTypes.Boolean,
      pencilPan: AEc.ValueTypes.Number,
      pencilActivate: AEc.ValueTypes.Trigger,
      eraserActivate: AEc.ValueTypes.Trigger,
      testPaperPan: AEc.ValueTypes.Number,
      referencesTrayDrag: AEc.ValueTypes.Boolean,
      colorPickerDrag: AEc.ValueTypes.Boolean,
      colorPickerPan: AEc.ValueTypes.Number,
      colorPickerActivate: AEc.ValueTypes.Trigger,
      zoomDrag: AEc.ValueTypes.Boolean,
      zoomPan: AEc.ValueTypes.Number,
      colorSwatchesDrag: AEc.ValueTypes.Boolean,
      colorSwatchesPan: AEc.ValueTypes.Number,
      pico8Drag: AEc.ValueTypes.Boolean,
      pico8Pan: AEc.ValueTypes.Number,
      pixelArtEvaluationDrag: AEc.ValueTypes.Boolean,
      pixelArtEvaluationPan: AEc.ValueTypes.Number,
      readabilityAnalysisDrag: AEc.ValueTypes.Boolean,
      readabilityAnalysisPan: AEc.ValueTypes.Number,
      cursorPan: AEc.ValueTypes.Number,
      publicationsDrag: AEc.ValueTypes.Boolean,
      rulerDrag: AEc.ValueTypes.Boolean,
      rulerPan: AEc.ValueTypes.Number,
      rulerActivate: AEc.ValueTypes.Trigger,
      rulerActivateFilled: AEc.ValueTypes.Trigger
    }
  });
  return Desktop;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.desktop.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/template.desktop.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop pixelartacademy-pixelpad-apps-drawing-editor ", Spacebars.mustache(view.lookup("drawingActiveClass")), " ", Spacebars.mustache(view.lookup("focusedModeClass")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("displayedAsset"), "editorStyleClasses")), " ", Spacebars.mustache(view.lookup("draggingClass")), " ", Spacebars.mustache(view.lookup("resizingDirectionClass")) ];
    }
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("interface"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("drawingActive"));
  }, function() {
    return [ "\n      ", HTML.STYLE("\n        .landsofillusions-components-menu .toolbar, html.adventure .build-version {\n          opacity: 0 !important;\n          pointer-events: none;\n        }\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelcanvas":{"pixelcanvas.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelcanvas/pixelcanvas.coffee                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA, PAG;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAG = PAA.Practice.PixelArtEvaluation;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelCanvas = function () {
  class PixelCanvas extends LOI.Assets.SpriteEditor.PixelCanvas {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelCanvas';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.drawing = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
      this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);

      // Allow triggering asset style change.
      this.assetStyleChangeDependency = new Tracker.Dependency();

      // Do updates when asset changes.
      this.autorun(computation => {
        var portfolioAsset;
        if (!(portfolioAsset = this.drawing.portfolio().displayedAsset())) {
          return;
        }

        // Wait until the asset is ready.
        portfolioAsset.asset.ready();

        // Trigger asset style change after delay. We need this delay to allow for asset data in the
        // clipboard to update, which will change the position of the asset when attached to the clipboard.
        return Meteor.setTimeout(() => {
          return this.assetStyleChangeDependency.changed();
        });
      });
      this.clipboardComponent = new ComputedField(() => {
        var clipboardComponent, ref;
        if (!(clipboardComponent = (ref = this.desktop.displayedAsset()) != null ? ref.clipboardComponent : void 0)) {
          return;
        }
        if (!clipboardComponent.isCreated()) {
          return;
        }
        return clipboardComponent;
      });

      // Update camera scale.
      this.autorun(computation => {
        var camera, displayedAsset, previewInfo;
        if (!(camera = this.camera())) {
          return;
        }
        if (!(displayedAsset = this.desktop.displayedAsset())) {
          return;
        }
        if (!(previewInfo = displayedAsset.previewInfo())) {
          return;
        }

        // Dictate camera scale when not active and when setting for the first time.
        if (!(this.desktop.active() && this._initialScaleSet)) {
          Tracker.nonreactive(() => {
            return camera.setScale(previewInfo.scale);
          });
          return this._initialScaleSet = true;
        }
      });
      // Update border width.
      this.autorun(computation => {
        var borderWidth;
        borderWidth = this._borderWidth();

        // Make sure we were able to compute the new border (we don't
        // want the pixel canvas to update with temporary values).
        if (borderWidth == null) {
          return;
        }
        return Tracker.nonreactive(() => {
          return this.borderWidth(borderWidth);
        });
      });

      // Switch between full and framed display modes.
      this.autorun(computation => {
        var desktopActive;
        desktopActive = this.desktop.active();
        return Tracker.nonreactive(() => {
          var newDisplayMode;
          newDisplayMode = desktopActive ? LOI.Assets.SpriteEditor.PixelCanvas.DisplayModes.Framed : LOI.Assets.SpriteEditor.PixelCanvas.DisplayModes.Full;
          return this.displayMode(newDisplayMode);
        });
      });

      // Reset camera origin when entering the editor. We should wait until asset data exists in
      // case it's still being loaded (such as when entering directly into the editor via URL).
      this._assetDataExists = new ComputedField(() => {
        return this.assetData() != null;
      });
      return this.autorun(computation => {
        if (!this.desktop.active()) {
          return;
        }
        if (!this._assetDataExists()) {
          return;
        }
        return Tracker.nonreactive(() => {
          var assetData, originDataField;
          assetData = this.assetData();
          originDataField = this.camera().originData();
          if (assetData.bounds) {
            // The center of the image should be in the origin.
            return originDataField.value({
              x: (assetData.bounds.left + assetData.bounds.right + 1) / 2,
              y: (assetData.bounds.top + assetData.bounds.bottom + 1) / 2
            });
          } else {
            return originDataField.value({
              x: 0,
              y: 0
            });
          }
        });
      });
    }
    hiddenClass() {
      var ref;
      if ((ref = this.clipboardComponent()) != null ? typeof ref.secondPageActive === "function" ? ref.secondPageActive() : void 0 : void 0) {
        // Don't show the asset when clipboard is on the second page.
        return 'hidden';
      }
    }
    drawingAreaStyle() {
      var assetData, backgroundColor, borderWidth, displayedAsset, editorActive, height, offScreenStyle, previewInfo, scale, style, width;
      // Allow to be updated externally.
      this.assetStyleChangeDependency.depend();
      // If nothing else, we should move the asset off screen.
      offScreenStyle = {
        top: '-200rem'
      };
      if (!this.drawing.clipboard().isRendered()) {
        // Wait for clipboard to be rendered.
        return offScreenStyle;
      }
      if (!(displayedAsset = this.desktop.displayedAsset())) {
        // If we don't have size data, don't return anything so transition will start form first value.
        return offScreenStyle;
      }
      if (!(previewInfo = displayedAsset.previewInfo())) {
        return offScreenStyle;
      }
      if (!(assetData = displayedAsset.document())) {
        return offScreenStyle;
      }
      editorActive = this.desktop.active();
      if (editorActive) {
        if (!(scale = this.camera().scale())) {
          // When the editor is open, the size depends on the internal pixel canvas camera scale.
          return offScreenStyle;
        }
      } else {
        // When we're outside the editor, the scale comes from the preview.
        scale = previewInfo.scale;
      }
      if (editorActive) {
        // Let the parent implementation handle positioning.
        style = super.drawingAreaStyle(...arguments);
      } else {
        borderWidth = this._borderWidth() || 0;
        width = (assetData.bounds.width + 2 * borderWidth) * scale;
        height = (assetData.bounds.height + 2 * borderWidth) * scale;
        style = {
          width: "".concat(width, "rem"),
          height: "".concat(height, "rem"),
          left: previewInfo.position.left,
          top: previewInfo.position.top
        };
      }
      if (backgroundColor = typeof displayedAsset.backgroundColor === "function" ? displayedAsset.backgroundColor() : void 0) {
        style.backgroundColor = "#".concat(backgroundColor.getHexString());
        style.borderColor = style.backgroundColor;
      }
      return style;
    }
    _borderWidth() {
      var displayedAsset, previewInfo;
      if (!(displayedAsset = this.desktop.displayedAsset())) {
        return;
      }
      if (!(previewInfo = displayedAsset.previewInfo())) {
        return;
      }

      // Convert from display to asset pixels.
      return previewInfo.borderWidth / previewInfo.scale;
    }
    letterGrade() {
      var displayedAsset, pixelArtEvaluation, ref, ref1;
      if (!(displayedAsset = this.desktop.displayedAsset())) {
        return;
      }
      if (!(pixelArtEvaluation = (ref = displayedAsset.document()) != null ? (ref1 = ref.properties) != null ? ref1.pixelArtEvaluation : void 0 : void 0)) {
        return;
      }
      if (pixelArtEvaluation.displayed === false) {
        return;
      }
      if (pixelArtEvaluation.score == null) {
        return;
      }
      return PAG.getLetterGrade(pixelArtEvaluation.score);
    }
  }
  ;
  PixelCanvas.register(PixelCanvas.id());
  return PixelCanvas;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pixelcanvas.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelcanvas/template.pixelcanvas.js             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelCanvas");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelCanvas"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelCanvas", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-assets-spriteeditor-pixelcanvas pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelcanvas"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "drawing-area ", Spacebars.mustache(Spacebars.dot(view.lookup("desktop"), "displayedAsset", "styleClasses")), " ", Spacebars.mustache(view.lookup("hiddenClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("drawingAreaStyle"));
  }), "\n      ", HTML.DIV({
    class: "evaluation"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("desktop"), "displayedAsset", "completed"));
  }, function() {
    return [ "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("letterGrade"));
    }, function() {
      return [ "\n            ", HTML.SPAN({
        class: "grade"
      }, Blaze.View("lookup:letterGrade", function() {
        return Spacebars.mustache(view.lookup("letterGrade"));
      })), "\n          " ];
    }, function() {
      return HTML.Raw('\n            <span class="completed"></span>\n          ');
    }), "\n        " ];
  }, function() {
    return [ "\n          ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("desktop"), "displayedAsset", "started"));
    }, function() {
      return HTML.Raw('\n            <span class="started"></span>\n          ');
    }), "\n        " ];
  }), "\n      "), "\n      ", HTML.CANVAS(HTML.Attrs({
    class: "canvas"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("canvasStyle"));
  })), "\n    "), "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "tool-info ", Spacebars.mustache(view.lookup("toolInfoInvertColorsClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("toolInfoStyle"));
  }), Blaze.View("lookup:toolInfoText", function() {
    return Spacebars.mustache(view.lookup("toolInfoText"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"testpaper":{"testpaper.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/testpaper/testpaper.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, FM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.TestPaper = function () {
  class TestPaper extends FM.View {
    // actions: array of action IDs to include on the paper (used for undo/redo)
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.TestPaper';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
    }
    action() {
      var toolId;
      toolId = this.currentData();
      return this.interface.getOperator(toolId);
    }
    tooltip() {
      var action, name, shortcut;
      action = this.currentData();
      name = action.displayName();
      shortcut = action.currentShortcut();
      if (!shortcut) {
        return name;
      }
      if (_.isArray(shortcut)) {
        shortcut = shortcut[0];
      }
      shortcut = AM.ShortcutHelper.getShortcutString(shortcut);
      return "".concat(name, " (").concat(shortcut, ")");
    }
    actionClass() {
      var action;
      action = this.currentData();
      return _.kebabCase(action.displayName());
    }
    enabledClass() {
      var action, enabled;
      enabled = true;
      action = this.currentData();
      if (action.enabled) {
        enabled = _.propertyValue(action, 'enabled');
      }
      if (enabled) {
        return 'enabled';
      }
    }
    eraserEnabledClass() {
      if (this.desktop.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.Eraser)) {
        return 'eraser-enabled';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .action-button': this.onClickActionButton
      });
    }
    onClickActionButton(event) {
      var action;
      action = this.currentData();
      if (action.enabled && !action.enabled()) {
        return;
      }
      return action.execute(this);
    }
  }
  ;
  TestPaper.register(TestPaper.id());
  return TestPaper;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.testpaper.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/testpaper/template.testpaper.js                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.TestPaper");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.TestPaper"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.TestPaper", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-testpaper table-item ", Spacebars.mustache(view.lookup("eraserEnabledClass")) ];
    }
  }, "\n    ", HTML.UL({
    class: "actions"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("get"), "actions"));
  }, function() {
    return [ "\n        ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("action"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: function() {
          return [ "action ", Spacebars.mustache(view.lookup("actionClass")), " ", Spacebars.mustache(view.lookup("enabledClass")) ];
        },
        title: function() {
          return Spacebars.mustache(view.lookup("tooltip"));
        }
      }, "\n            ", HTML.BUTTON({
        class: "action-button"
      }, "\n              ", HTML.SPAN({
        class: "name"
      }, Blaze.View("lookup:displayName", function() {
        return Spacebars.mustache(view.lookup("displayName"));
      })), "\n            "), "\n          "), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"colorfill":{"colorfill.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/colorfill/colorfill.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, FM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.ColorFill = function () {
  class ColorFill extends FM.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ColorFill';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.paletteData = new ComputedField(() => {
        var ref, ref1;
        return (ref = this.interface.getLoaderForActiveFile()) != null ? (ref1 = ref.asset()) != null ? ref1.getRestrictedPalette() : void 0 : void 0;
      });
      this.paintHelper = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.Paint);
      return this.currentColor = new ComputedField(() => {
        var paletteColor, ref, ref1;
        if (!(paletteColor = this.paintHelper.paletteColor())) {
          return;
        }
        return (ref = this.paletteData()) != null ? (ref1 = ref.ramps[paletteColor.ramp]) != null ? ref1.shades[paletteColor.shade] : void 0 : void 0;
      });
    }
    colorStyle() {
      var active, color, colorData;
      // Get the color from the palette.
      colorData = this.currentColor();
      if (!colorData) {
        return;
      }
      color = THREE.Color.fromObject(colorData);
      active = this.interface.activeToolId() === LOI.Assets.SpriteEditor.Tools.ColorFill.id();
      return {
        backgroundColor: "#".concat(color.getHexString()),
        opacity: active ? 1 : 0.8
      };
    }
  }
  ;
  ColorFill.register(ColorFill.id());
  return ColorFill;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.colorfill.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/colorfill/template.colorfill.js                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ColorFill");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ColorFill"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ColorFill", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-colorfill table-item"
  }, "\n    ", HTML.DIV({
    class: "glass"
  }, "\n      ", HTML.DIV(HTML.Attrs({
    class: "color"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("colorStyle"));
  })), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"zoom":{"zoom.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/zoom/zoom.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Zoom = function () {
  class Zoom extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Zoom';
    }
    template() {
      return this.constructor.id();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.editor = new ComputedField(() => {
        return this.interface.getEditorForActiveFile();
      }, (a, b) => {
        return a === b;
      });
      this.zoomPercentage = new ComputedField(() => {
        var ref, ref1;
        return ((ref = this.interface.getEditorForActiveFile()) != null ? (ref1 = ref.camera()) != null ? ref1.targetScale() : void 0 : void 0) * 100;
      });
      this.zoomInPressed = new ReactiveField(false);
      return this.zoomOutPressed = new ReactiveField(false);
    }

    // Helpers
    zoomPercentageValue() {
      var zoomPercentage;
      if (!(zoomPercentage = this.zoomPercentage())) {
        return;
      }
      return Math.round(zoomPercentage);
    }
    zoomInPressedClass() {
      if (this.zoomInPressed()) {
        return 'pressed';
      }
    }
    zoomOutPressedClass() {
      if (this.zoomOutPressed()) {
        return 'pressed';
      }
    }

    // Events
    events() {
      return super.events(...arguments).concat({
        'change .zoom-percentage-input': this.onSubmitZoomPercentage,
        'pointerdown .zoom-in-button': this.onPointerDownZoomIn,
        'pointerdown .zoom-out-button': this.onPointerDownZoomOut,
        'click .zoom-in-button': this.onClickZoomIn,
        'click .zoom-out-button': this.onClickZoomOut
      });
    }
    onSubmitZoomPercentage(event) {
      var ref, ref1, zoom;
      event.preventDefault();
      try {
        zoom = parseInt($(event.target).val());
        return (ref = this.interface.getEditorForActiveFile()) != null ? (ref1 = ref.camera()) != null ? ref1.scaleTo(zoom / 100, 0.2) : void 0 : void 0;
      } catch (error) {}
    }
    onPointerDownZoomIn(event) {
      return this._triggerAudio(event, true);
    }
    onPointerDownZoomOut(event) {
      return this._triggerAudio(event, true);
    }
    onClickZoomIn(event) {
      this.interface.getOperator(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomIn).execute();
      return this._triggerAudio(event, false);
    }
    onClickZoomOut(event) {
      this.interface.getOperator(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomOut).execute();
      return this._triggerAudio(event, false);
    }
    _triggerAudio(event, buttonPressed) {
      this.audio.buttonPan(PAA.PixelPad.Apps.Drawing.Editor.Desktop.compressPan(AEc.getPanForElement(event.target)));
      return this.audio.buttonPressed(buttonPressed);
    }
  }
  ;
  Zoom.register(Zoom.id());
  Zoom.Audio = new LOI.Assets.Audio.Namespace(Zoom.id(), {
    // Loaded from the PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop namespace.
    subNamespace: true,
    variables: {
      buttonPressed: AEc.ValueTypes.Boolean,
      buttonPan: AEc.ValueTypes.Number
    }
  });
  return Zoom;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.zoom.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/zoom/template.zoom.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Zoom");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Zoom"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Zoom", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-zoom table-item"
  }, "\n    ", HTML.DIV({
    class: "zoom-display"
  }, "\n      ", HTML.INPUT({
    class: "zoom-percentage-input",
    value: function() {
      return Spacebars.mustache(view.lookup("zoomPercentageValue"));
    }
  }), "%\n    "), "\n    ", HTML.BUTTON({
    class: function() {
      return [ "zoom-in-button zoom-button ", Spacebars.mustache(view.lookup("zoomInPressedClass")) ];
    }
  }, "+"), "\n    ", HTML.BUTTON({
    class: function() {
      return [ "zoom-out-button zoom-button ", Spacebars.mustache(view.lookup("zoomOutPressedClass")) ];
    }
  }, "-"), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pico8":{"pico8.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pico8/pico8.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Pico8 = function () {
  class Pico8 extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Pico8';
    }
    constructor() {
      super(...arguments);
      this.active = new ReactiveField(false);
      this.dragging = new ReactiveField(false);
      this.positionOffset = new ReactiveField({
        x: 0,
        y: 0
      });
      this.device = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(Artificial.Base.App);
      this.app.addComponent(this);
      this._dragTimeLeft = 0;
      this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
      this.display = this.callAncestorWith('display');
      this.cartridge = new ComputedField(() => {
        var asset, ref;
        if (!(asset = this.desktop.activeAsset())) {
          return;
        }
        return (ref = asset.project) != null ? ref.pico8Cartridge : void 0;
      });

      // Create the PICO-8 device once audio context is available, so we can route it through the location mixer.
      this.autorun(computation => {
        var audioContext, audioOutputNode;
        if (!(audioContext = LOI.adventure.audioManager.context())) {
          return;
        }
        computation.stop();
        audioOutputNode = AEc.Node.Mixer.getOutputNodeForName('location', audioContext);
        return this.device(new PAA.Pico8.Device.Handheld({
          audioContext: audioContext,
          audioOutputNode: audioOutputNode,
          // Relay input/output calls to the cartridge.
          onInputOutput: (address, value) => {
            var ref;
            return (ref = this.cartridge()) != null ? typeof ref.onInputOutput === "function" ? ref.onInputOutput(address, value) : void 0 : void 0;
          },
          // Enable device interface when the editor is active.
          enabled: () => {
            return this.desktop.active();
          }
        }));
      });
      this.autorun(computation => {
        var cartridge, device, game;
        if (!(cartridge = this.cartridge())) {
          return;
        }
        if (!(game = cartridge.game())) {
          return;
        }
        if (!(device = this.device())) {
          return;
        }
        return device.loadGame(game, cartridge.projectId(), cartridge.startParameter());
      });

      // Drag handheld when activating and deactivating.
      Tracker.triggerOnDefinedChange(this.active, () => {
        this.audio.handheldDragLong();
        this._lastAudioDragTime = Date.now();
        return this._dragTimeLeft = 1;
      });

      // Automatically enter focused mode when active.
      this.autorun(computation => {
        return this.desktop.focusedMode(this.active());
      });

      // Automatically deactivate when exiting focused mode.
      return this.autorun(computation => {
        if (!this.desktop.focusedMode()) {
          return this.active(false);
        }
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return this._pico8 = $('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8')[0];
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.app.removeComponent(this);
    }
    activeClass() {
      if (this.active()) {
        return 'active';
      }
    }
    draggingClass() {
      if (this.dragging()) {
        return 'dragging';
      }
    }
    positionStyle() {
      var offset;
      if (!this.active()) {
        return;
      }
      offset = this.positionOffset();
      return {
        right: "calc(50% - ".concat(160 + offset.x, "rem)"),
        bottom: "calc(50% - ".concat(77 + offset.y, "rem)")
      };
    }
    update(appTime) {
      if (!(this._dragTimeLeft > 0)) {
        return;
      }
      this._dragTimeLeft -= appTime.elapsedAppTime;
      return this.desktop.audio.pico8Pan(PAA.PixelPad.Apps.Drawing.Editor.Desktop.compressPan(AEc.getPanForElement(this._pico8)));
    }
    events() {
      return super.events(...arguments).concat({
        'pointerenter .pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8': this.onPointerEnterPico8,
        'pointerleave .pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8': this.onPointerLeavePico8,
        'click': this.onClick,
        'pointerdown': this.onPointerDown
      });
    }
    onPointerEnterPico8(event) {
      return this._handheldDragTiny();
    }
    onPointerLeavePico8(event) {
      return this._handheldDragTiny();
    }
    _handheldDragTiny() {
      // Only play audio when hovering over a deactivated handheld.
      if (this.active()) {
        return;
      }

      // Don't play immediately after a different drag.
      if (Date.now() - this._lastAudioDragTime < 500) {
        return;
      }
      return this.audio.handheldDragTiny();
    }
    onClick(event) {
      // Don't handle the click right after we've been deactivated from dragging.
      if (this._draggingDeactivated) {
        this._draggingDeactivated = false;
        return;
      }
      if (this.active()) {
        return;
      }
      this.positionOffset({
        x: 0,
        y: 0
      });
      return this.active(true);
    }
    onPointerDown(event) {
      var $target;
      if (!this.active()) {
        return;
      }
      // Only react to clicks directly on the case or screen.
      $target = $(event.target);
      if (!($target.hasClass('pixelartacademy-pico8-device-handheld') || $target.closest('.screen').length)) {
        return;
      }
      this.dragging(true);
      this._moved = false;
      this._pointerPosition = {
        x: event.clientX,
        y: event.clientY
      };
      // Wire end of dragging on pointer up anywhere in the window.
      $(document).on("pointerup.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8", event => {
        $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8');
        this.dragging(false);
        // Close PICO-8 if we haven't moved.
        if (!this._moved) {
          this._draggingDeactivated = true;
          return this.active(false);
        }
      });
      return $(document).on("pointermove.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8", event => {
        var dragDelta, offset, scale;
        this._moved = true;
        scale = this.display.scale();
        dragDelta = {
          x: (event.clientX - this._pointerPosition.x) / scale,
          y: (event.clientY - this._pointerPosition.y) / scale
        };
        offset = this.positionOffset();
        this.positionOffset({
          x: offset.x + dragDelta.x,
          y: offset.y + dragDelta.y
        });
        return this._pointerPosition = {
          x: event.clientX,
          y: event.clientY
        };
      });
    }
  }
  ;
  Pico8.register(Pico8.id());
  Pico8.Audio = new LOI.Assets.Audio.Namespace(Pico8.id(), {
    // Loaded from the PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop namespace.
    subNamespace: true,
    variables: {
      handheldDragLong: AEc.ValueTypes.Trigger,
      handheldDragTiny: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      }
    }
  });
  return Pico8;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pico8.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pico8/template.pico8.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Pico8");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Pico8"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Pico8", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-pico8 table-item ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("draggingClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("positionStyle"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("device"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ruler":{"ruler.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/ruler/ruler.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, FM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Ruler = function () {
  class Ruler extends FM.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Ruler';
    }
    onCreated() {
      var activateAudio;
      super.onCreated(...arguments);
      this.desktop = this.interface.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
      activateAudio = filled => {
        if (!this.desktop.drawingActive()) {
          return;
        }
        if (filled) {
          return this.desktop.audio.rulerActivateFilled();
        } else {
          return this.desktop.audio.rulerActivate();
        }
      };
      Tracker.triggerOnDefinedChange(() => {
        return this.interface.getOperator(LOI.Assets.SpriteEditor.Tools.Rectangle).data.get('filled');
      }, activateAudio);
      Tracker.triggerOnDefinedChange(() => {
        return this.interface.getOperator(LOI.Assets.SpriteEditor.Tools.Ellipse).data.get('filled');
      }, activateAudio);
      this.paletteData = new ComputedField(() => {
        var ref, ref1;
        return (ref = this.interface.getLoaderForActiveFile()) != null ? (ref1 = ref.asset()) != null ? ref1.getRestrictedPalette() : void 0 : void 0;
      });
      this.paintHelper = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.Paint);
      return this.currentColor = new ComputedField(() => {
        var color, colorData, paletteColor, ref, ref1;
        if (!(paletteColor = this.paintHelper.paletteColor())) {
          return;
        }
        if (!(colorData = (ref = this.paletteData()) != null ? (ref1 = ref.ramps[paletteColor.ramp]) != null ? ref1.shades[paletteColor.shade] : void 0 : void 0)) {
          return;
        }
        color = THREE.Color.fromObject(colorData);
        color.multiplyScalar(255);
        return color;
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.lineIndicatorImage = new this.constructor.IndicatorImage(this, '/pixelartacademy/pixelpad/apps/drawing/editor/desktop/ruler-line.png', '.line.indicator', this.currentColor);
      this.rectangleIndicatorImage = new this.constructor.IndicatorImage(this, '/pixelartacademy/pixelpad/apps/drawing/editor/desktop/ruler-rectangle.png', '.rectangle .outlined.indicator', this.currentColor);
      this.filledRectangleIndicatorImage = new this.constructor.IndicatorImage(this, '/pixelartacademy/pixelpad/apps/drawing/editor/desktop/ruler-rectangle-filled.png', '.rectangle .filled.indicator', this.currentColor);
      this.ellipseIndicatorImage = new this.constructor.IndicatorImage(this, '/pixelartacademy/pixelpad/apps/drawing/editor/desktop/ruler-ellipse.png', '.ellipse .outlined.indicator', this.currentColor);
      return this.filledEllipseIndicatorImage = new this.constructor.IndicatorImage(this, '/pixelartacademy/pixelpad/apps/drawing/editor/desktop/ruler-ellipse-filled.png', '.ellipse .filled.indicator', this.currentColor);
    }
    onDestroyed() {
      var ref, ref1, ref2, ref3, ref4;
      super.onDestroyed(...arguments);
      if ((ref = this.lineIndicatorImage) != null) {
        ref.destroy();
      }
      if ((ref1 = this.rectangleIndicatorImage) != null) {
        ref1.destroy();
      }
      if ((ref2 = this.filledRectangleIndicatorImage) != null) {
        ref2.destroy();
      }
      if ((ref3 = this.ellipseIndicatorImage) != null) {
        ref3.destroy();
      }
      return (ref4 = this.filledEllipseIndicatorImage) != null ? ref4.destroy() : void 0;
    }
    rectangleFilledClass() {
      var rectangle;
      rectangle = this.interface.getOperator(LOI.Assets.SpriteEditor.Tools.Rectangle);
      if (rectangle.data.get('filled')) {
        return 'filled';
      }
    }
    ellipseFilledClass() {
      var ellipse;
      ellipse = this.interface.getOperator(LOI.Assets.SpriteEditor.Tools.Ellipse);
      if (ellipse.data.get('filled')) {
        return 'filled';
      }
    }
  }
  ;
  Ruler.register(Ruler.id());
  Ruler.IndicatorImage = function () {
    class IndicatorImage {
      constructor(ruler, url, parentSelector, currentColor) {
        var base, name, templateImage;
        this.ruler = ruler;
        this.url = url;
        this.parentSelector = parentSelector;
        this.currentColor = currentColor;
        if (!this.constructor.templateImageData[this.url]) {
          // Start the loading of the template.
          if ((base = this.constructor.templateImageData)[name = this.url] == null) {
            base[name] = new ReactiveField(null);
          }
          templateImage = new Image();
          templateImage.addEventListener('load', () => {
            return this.constructor.templateImageData[this.url](new AM.ReadableCanvas(templateImage).getFullImageData());
          });

          // Initiate the loading.
          templateImage.src = Meteor.absoluteUrl(this.url);
        }
        this.canvas = new ReactiveField(null);
        this.canvasImageData = new ReactiveField(null);

        // Create the canvas with template's alpha channel.
        this._createCanvasAutorun = Tracker.autorun(computation => {
          var canvas, canvasImageData, i, index, j, ref, ref1, templateImageData, x, y;
          if (!(templateImageData = this.constructor.templateImageData[this.url]())) {
            return;
          }
          computation.stop();
          canvas = new AM.ReadableCanvas(templateImageData.width, templateImageData.height);
          $(canvas).css({
            width: "".concat(templateImageData.width, "rem"),
            height: "".concat(templateImageData.height, "rem")
          });
          this.ruler.$(this.parentSelector).prepend(canvas);
          canvasImageData = canvas.getFullImageData();
          for (x = i = 0, ref = canvasImageData.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
            for (y = j = 0, ref1 = canvasImageData.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
              index = (y * canvasImageData.width + x) * 4;
              if (!templateImageData.data[index + 3]) {
                continue;
              }
              canvasImageData.data[index + 3] = 255;
            }
          }
          canvas.putFullImageData(canvasImageData);
          this.canvas(canvas);
          return this.canvasImageData(canvasImageData);
        });
        // Apply the color channel.
        this._changeColorAutorun = Tracker.autorun(computation => {
          var canvasImageData, color, i, index, j, ref, ref1, ref2, ref3, ref4, templateImageData, x, y;
          if (!(templateImageData = this.constructor.templateImageData[this.url]())) {
            return;
          }
          if (!(canvasImageData = this.canvasImageData())) {
            return;
          }
          color = this.currentColor();
          for (x = i = 0, ref = canvasImageData.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
            for (y = j = 0, ref1 = canvasImageData.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
              index = (y * canvasImageData.width + x) * 4;
              canvasImageData.data[index] = (ref2 = color != null ? color.r : void 0) != null ? ref2 : templateImageData.data[index];
              canvasImageData.data[index + 1] = (ref3 = color != null ? color.g : void 0) != null ? ref3 : templateImageData.data[index + 1];
              canvasImageData.data[index + 2] = (ref4 = color != null ? color.b : void 0) != null ? ref4 : templateImageData.data[index + 2];
            }
          }
          return this.canvas().putFullImageData(canvasImageData);
        });
      }
      destroy() {
        this._createCanvasAutorun.stop();
        return this._changeColorAutorun.stop();
      }
    }
    ;
    IndicatorImage.templateImageData = {};
    return IndicatorImage;
  }.call(this);
  return Ruler;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.ruler.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/ruler/template.ruler.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Ruler");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Ruler"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Ruler", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-ruler table-item"
  }, "\n    ", HTML.DIV({
    class: "line shape indicator"
  }, Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("lineIndicatorImage"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  })), "\n    ", HTML.DIV({
    class: function() {
      return [ "rectangle shape ", Spacebars.mustache(view.lookup("rectangleFilledClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: "outlined indicator"
  }, Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("rectangleIndicatorImage"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  })), "\n      ", HTML.DIV({
    class: "filled indicator"
  }, Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("filledRectangleIndicatorImage"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: function() {
      return [ "ellipse shape ", Spacebars.mustache(view.lookup("ellipseFilledClass")) ];
    }
  }, HTML.Raw('\n      <div class="outlined indicator"></div>\n      <div class="filled indicator"></div>\n    ')), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"palette":{"palette.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/palette/palette.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, LOI, PAA, _trayCanvasLeftMargin, _trayCanvasTopMargin, _trayContentHeight, _trayRampBottomMargin, _trayRampRightMargin, _trayRampWidth, _trayShadeSize;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
_trayContentHeight = 112;
_trayShadeSize = 11;
_trayRampWidth = 15;
_trayCanvasTopMargin = -2;
_trayCanvasLeftMargin = -1;
_trayRampBottomMargin = 6;
_trayRampRightMargin = 3;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Palette = function () {
  class Palette extends LOI.Assets.SpriteEditor.Palette {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette';
    }
    onCreated() {
      var paletteField;
      super.onCreated(...arguments);
      this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
      this.asset = new ComputedField(() => {
        var ref;
        return (ref = this.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0;
      });
      this.customPalette = new ComputedField(() => {
        var ref;
        return (ref = this.asset()) != null ? ref.customPalette : void 0;
      });
      this.paletteId = new ComputedField(() => {
        var ref, ref1;
        return (ref = this.asset()) != null ? (ref1 = ref.palette) != null ? ref1._id : void 0 : void 0;
      });
      paletteField = this.palette;
      this.palette = new ComputedField(() => {
        var i, index, j, len, len1, palette, ramp, ref, ref1, shade;
        if (!(palette = paletteField())) {
          return;
        }
        index = 0;
        ref = palette.ramps;
        for (i = 0, len = ref.length; i < len; i++) {
          ramp = ref[i];
          // Randomize palette for the tray.
          ramp.blendOffset = Math.random();
          ref1 = ramp.shades;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            shade = ref1[j];
            shade.rampShadesLength = ramp.shades.length;
            shade.offset = _.random(0, 2);
            shade.symbol = PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.symbols[index];
            index++;
          }
        }
        return palette;
      });

      // Reset display of all hints.
      this.autorun(computation => {
        var asset;
        if (this.desktop.active()) {
          return;
        }
        if (!(asset = this.desktop.activeAsset())) {
          return;
        }
        if (!(asset instanceof PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap)) {
          return;
        }
        if (!asset.initialized()) {
          return;
        }
        return asset.hintsEngineComponents.overlaid.displayAllColorErrors(false);
      });
      return this.colorHelp = new this.constructor.ColorHelp(this);
    }
    onBackButton() {
      if (!this.colorHelp.visible()) {
        return;
      }
      this.colorHelp.visible(false);

      // Inform that we've handled the back button.
      return true;
    }
    trayClass() {
      if (this.customPalette()) {
        return 'tray';
      }
    }
    swatchesClass() {
      if (this.paletteId()) {
        return 'swatches';
      }
    }
    paletteNameClass() {
      var palette;
      if (!(palette = this.paletteData())) {
        return;
      }
      return _.kebabCase(palette.name);
    }
    forceSymbolsVisibleClass() {
      if (this.colorHelp.visible()) {
        return 'force-symbols-visible';
      }
    }
    paletteStyle() {
      // We only need to style the custom palette tray.
      if (!this.customPalette()) {
        return;
      }

      // We only need to show the tray when drawing is active and we're not focused.
      if (!(this.desktop.drawingActive() && !this.desktop.focusedMode())) {
        return;
      }
      return {
        left: "calc(100% - ".concat(this._trayContentWidth() + 15, "rem)")
      };
    }
    colorsStyle() {
      // We only need to style the custom palette tray.
      if (!this.customPalette()) {
        return;
      }
      return {
        width: "".concat(this._trayContentWidth(), "rem")
      };
    }
    _trayContentWidth() {
      var columnHeight, i, len, palette, ramp, rampHeight, ref, verticalSeparation, width;
      if (!(palette = this.palette())) {
        return;
      }
      // Calculate the width of the palette.
      width = _trayRampWidth;
      columnHeight = 0;
      ref = palette.ramps;
      for (i = 0, len = ref.length; i < len; i++) {
        ramp = ref[i];
        if (!ramp.shades.length) {
          continue;
        }
        verticalSeparation = this.constructor.TrayRamp.getVerticalShadeSeparation(ramp.shades.length);
        rampHeight = (ramp.shades.length - 1) * verticalSeparation + _trayShadeSize;
        columnHeight += rampHeight + _trayRampBottomMargin;
        if (columnHeight > _trayContentHeight) {
          // We overflow into the new line.
          width += _trayRampRightMargin + _trayRampWidth;
          columnHeight = rampHeight + _trayRampBottomMargin;
        }
      }
      // Tray should be at least 32 wide.
      return width = Math.max(32, width);
    }
    shadeStyle() {
      var shade, verticalSeparation;
      if (!this.customPalette()) {
        return;
      }
      shade = this.currentData();
      verticalSeparation = this.constructor.TrayRamp.getVerticalShadeSeparation(shade.rampShadesLength);
      return {
        height: "".concat(verticalSeparation + 2, "rem"),
        marginLeft: "".concat(shade.offset, "rem")
      };
    }
    colorStyle() {
      // Custom palette tray doesn't use colors via style.
      if (this.customPalette()) {
        return;
      }
      return super.colorStyle(...arguments);
    }
    showColorSymbol() {
      return PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.hintStyle() === PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.HintStyle.Symbols;
    }
    colorSymbolStyle() {
      var shade;
      shade = this.currentData();
      return {
        color: "#".concat(shade.accentColor.getHexString())
      };
    }
    showColorHelp() {
      var asset;
      asset = this.interface.getEditorForActiveFile().desktop.activeAsset();
      return asset instanceof PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
    }
    events() {
      return super.events(...arguments).concat({
        'click .color-help-button': this.onClickColorHelpButton
      });
    }
    onClickColor(event) {
      super.onClickColor(...arguments);
      return this.audio.changeColor();
    }
    onClickColorHelpButton(event) {
      return this.colorHelp.visible(!this.colorHelp.visible());
    }
  }
  ;
  Palette.register(Palette.id());
  Palette.Audio = new LOI.Assets.Audio.Namespace(Palette.id(), {
    // Loaded from the PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop namespace.
    subNamespace: true,
    variables: {
      changeColor: AEc.ValueTypes.Trigger
    }
  });
  Palette.TrayRamp = function () {
    class TrayRamp extends AM.Component {
      static getVerticalShadeSeparation(numberOfShades) {
        if (numberOfShades === 1) {
          // Fit shades into the tray content height.
          return _trayShadeSize;
        }
        return Math.min(_trayShadeSize, Math.floor((_trayContentHeight - _trayRampBottomMargin - _trayShadeSize) / (numberOfShades - 1)));
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.autorun(computation => {
          var blendingChance, canvas, center, color, context, distanceToCenter, gradient, gradientX, gradientY, i, imageData, index, j, k, l, len, m, neighborB, neighborG, neighborR, neighborValue, pixelOffset, power, previousColor, previousPower, previousRowTotalPower, previousTotalPower, ramp, ref, ref1, ref2, ref3, ref4, rowTotalPower, shade, shadePower, totalPower, verticalSeparation, x, y;
          ramp = this.data();
          verticalSeparation = this.constructor.getVerticalShadeSeparation(ramp.shades.length);
          canvas = this.$('.canvas')[0];
          canvas.width = _trayRampWidth - _trayCanvasLeftMargin;
          canvas.height = (ramp.shades.length - 1) * verticalSeparation + _trayShadeSize - _trayCanvasTopMargin;
          context = canvas.getContext('2d', {
            willReadFrequently: true
          });
          imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          previousRowTotalPower = null;
          for (y = i = 0, ref = canvas.height; 0 <= ref ? i < ref : i > ref; y = 0 <= ref ? ++i : --i) {
            previousTotalPower = 0;
            rowTotalPower = [];
            for (x = j = 0, ref1 = canvas.width; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
              color = null;
              previousColor = null;
              previousPower = 0;
              totalPower = 0;
              ref2 = ramp.shades;
              for (index = k = 0, len = ref2.length; k < len; index = ++k) {
                shade = ref2[index];
                center = {
                  x: shade.offset + 7,
                  y: index * verticalSeparation + 6
                };
                distanceToCenter = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
                if (distanceToCenter > 10) {
                  continue;
                }
                power = 2 * Math.pow(distanceToCenter, 3) / Math.pow(10, 3) - 3 * Math.pow(distanceToCenter, 2) / Math.pow(10, 2) + 1;
                totalPower += power;
                if (totalPower > 0.34) {
                  color = shade.color;
                }
                if (color && previousColor) {
                  blendingChance = power / (power + previousPower);
                  color = 0.5 + 0.2 * Math.sin(2 * ramp.blendOffset + x * 0.6 + y * 0.2) < blendingChance ? shade.color : previousColor;
                }
                previousPower = power;
                previousColor = shade.color;
              }
              pixelOffset = (x + y * canvas.width) * 4;
              shadePower = 1;
              if (previousTotalPower || (previousRowTotalPower != null ? previousRowTotalPower[x] : void 0)) {
                gradientX = Math.max(0, previousTotalPower - totalPower);
                gradientY = Math.max(0, totalPower - ((previousRowTotalPower != null ? previousRowTotalPower[x] : void 0) || 0));
                gradient = 3 * gradientY + 5 * gradientX;
                if (0.5 < gradient) {
                  shadePower = 0.8;
                }
              }
              if (color) {
                imageData.data[pixelOffset] = Math.pow(color.r, shadePower) * 255;
                imageData.data[pixelOffset + 1] = Math.pow(color.g, shadePower) * 255;
                imageData.data[pixelOffset + 2] = Math.pow(color.b, shadePower) * 255;
              }
              imageData.data[pixelOffset + 3] = color ? 255 : 0;
              rowTotalPower.push(totalPower);
              previousTotalPower = totalPower;
            }
            previousRowTotalPower = rowTotalPower;
          }
          // Add cast shadow.
          for (y = l = 0, ref3 = canvas.height; 0 <= ref3 ? l < ref3 : l > ref3; y = 0 <= ref3 ? ++l : --l) {
            for (x = m = 0, ref4 = canvas.width - 1; 0 <= ref4 ? m < ref4 : m > ref4; x = 0 <= ref4 ? ++m : --m) {
              pixelOffset = (x + y * canvas.width) * 4;
              if (!(imageData.data[pixelOffset + 7] && !imageData.data[pixelOffset + 3])) {
                continue;
              }
              neighborR = Math.max(0, imageData.data[pixelOffset + 4] - 150);
              neighborG = Math.max(0, imageData.data[pixelOffset + 5] - 150);
              neighborB = Math.max(0, imageData.data[pixelOffset + 6] - 150);
              neighborValue = Math.max(neighborR, Math.max(neighborG, neighborB));
              imageData.data[pixelOffset] = 178;
              imageData.data[pixelOffset + 1] = 178;
              imageData.data[pixelOffset + 2] = 178;
              imageData.data[pixelOffset + 3] = 255 - neighborValue * 2;
            }
          }
          return context.putImageData(imageData, 0, 0);
        });
      }
    }
    ;
    TrayRamp.register('PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.TrayRamp');
    return TrayRamp;
  }.call(this);
  return Palette;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.palette.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/palette/template.palette.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-palette"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "palette table-item ", Spacebars.mustache(view.lookup("trayClass")), " ", Spacebars.mustache(view.lookup("swatchesClass")), " ", Spacebars.mustache(view.lookup("paletteNameClass")), " ", Spacebars.mustache(view.lookup("forceSymbolsVisibleClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("paletteStyle"));
  }), "\n      ", HTML.DIV(HTML.Attrs({
    class: "colors"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("colorsStyle"));
  }), "\n        ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("palette"), "ramps"));
  }, function() {
    return [ "\n          ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("shades"), "length"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: "ramp"
      }, "\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("customPalette"));
      }, function() {
        return [ "\n                ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "Palette", "TrayRamp"));
        }), "\n              " ];
      }), "\n              ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("shades"));
      }, function() {
        return [ "\n                ", HTML.DIV(HTML.Attrs({
          class: function() {
            return [ "shade ", Spacebars.mustache(view.lookup("activeColorClass")) ];
          }
        }, function() {
          return Spacebars.attrMustache(view.lookup("style"), view.lookup("shadeStyle"));
        }), "\n                  ", HTML.DIV(HTML.Attrs({
          class: "color"
        }, function() {
          return Spacebars.attrMustache(view.lookup("style"), view.lookup("colorStyle"));
        }), "\n                    ", Blaze.If(function() {
          return Spacebars.call(view.lookup("showColorSymbol"));
        }, function() {
          return [ "\n                      ", HTML.SPAN(HTML.Attrs({
            class: "symbol"
          }, function() {
            return Spacebars.attrMustache(view.lookup("style"), view.lookup("colorSymbolStyle"));
          }), Blaze.View("lookup:symbol", function() {
            return Spacebars.mustache(view.lookup("symbol"));
          })), "\n                    " ];
        }), "\n                  "), "\n                "), "\n              " ];
      }), "\n            "), "\n          " ];
    }), "\n        " ];
  }), "\n      "), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showColorHelp"));
  }, function() {
    return HTML.Raw('\n        <button class="color-help-button">帮助</button>\n      ');
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showColorHelp"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("colorHelp"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.TrayRamp");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.TrayRamp"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.TrayRamp", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixelpad-apps-drawing-editor-desktop-palette-trayramp">\n    <canvas class="canvas"></canvas>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorhelp":{"colorhelp.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/palette/colorhelp/colorhelp.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp = function () {
  class ColorHelp extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp';
    }
    constructor(palette) {
      super(...arguments);
      this.palette = palette;
      this.visible = new ReactiveField(false);
    }
    visibleClass() {
      if (this.visible()) {
        return 'visible';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .close-button': this.onClickCloseButton
      });
    }
    onClickCloseButton(event) {
      return this.visible(false);
    }
  }
  ;
  ColorHelp.register(ColorHelp.id());
  ColorHelp.DataInputComponent = class DataInputComponent extends AM.DataInputComponent {
    onCreated() {
      super.onCreated(...arguments);
      return this.colorHelp = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp);
    }
  };
  ColorHelp.OneTimeHelp = function () {
    class OneTimeHelp extends ColorHelp.DataInputComponent {
      static id() {
        return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp.OneTimeHelp';
      }
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Checkbox;
      }
      load() {
        var tutorialBitmap;
        if (!(tutorialBitmap = this.colorHelp.palette.interface.getEditorForActiveFile().desktop.activeAsset())) {
          return;
        }
        if (!tutorialBitmap.initialized()) {
          return;
        }
        return tutorialBitmap.hintsEngineComponents.overlaid.displayAllColorErrors();
      }
      save(value) {
        var tutorialBitmap;
        tutorialBitmap = this.colorHelp.palette.interface.getEditorForActiveFile().desktop.activeAsset();
        tutorialBitmap.hintsEngineComponents.overlaid.displayAllColorErrors(value);
        if (!value) {
          return;
        }
        tutorialBitmap.hintsEngineComponents.overlaid.displayColorHelpUpToPixelCoordinates({
          x: 0,
          y: 0
        });
        this.colorHelp.visible(false);
        return Meteor.setTimeout(() => {
          var bitmapData, displayHintsUpTo, hintDisplayDelay, pixelsCount;
          // Animate the display of hints in 1 second.
          bitmapData = tutorialBitmap.bitmap();
          pixelsCount = bitmapData.bounds.width * bitmapData.bounds.height;
          if (pixelsCount > 100) {
            hintDisplayDelay = 1000 / bitmapData.bounds.height;
          } else {
            hintDisplayDelay = 1000 / pixelsCount;
          }
          displayHintsUpTo = (x, y) => {
            if (pixelsCount > 100) {
              x = bitmapData.bounds.right;
            }
            tutorialBitmap.hintsEngineComponents.overlaid.displayColorHelpUpToPixelCoordinates({
              x,
              y
            });

            // Move to next pixel.
            x++;
            if (x > bitmapData.bounds.right) {
              x = bitmapData.bounds.left;
              y++;
              if (y > bitmapData.bounds.bottom) {
                return;
              }
            }
            return Meteor.setTimeout(() => {
              return displayHintsUpTo(x, y);
            }, hintDisplayDelay);
          };
          return displayHintsUpTo(bitmapData.bounds.left, bitmapData.bounds.top);
        }, 500);
      }
    }
    ;
    OneTimeHelp.register(OneTimeHelp.id());
    return OneTimeHelp;
  }.call(this);
  ColorHelp.ErrorStyle = function () {
    class ErrorStyle extends ColorHelp.DataInputComponent {
      static id() {
        return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp.ErrorStyle';
      }
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Radio;
        this.name = 'error-style';
      }
      options() {
        var errorStyle, options;
        options = [{
          value: null,
          name: 'None'
        }];
        for (errorStyle in PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.ErrorStyle) {
          options.push({
            value: errorStyle,
            name: this.constructor.Names[errorStyle]
          });
        }
        return options;
      }
      load() {
        return PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.errorStyle();
      }
      save(value) {
        return PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.state('errorStyle', value);
      }
    }
    ;
    ErrorStyle.register(ErrorStyle.id());
    ErrorStyle.Names = {
      PixelOutline: 'Pixel outline',
      HintOutline: 'Hint outline',
      HintGlow: 'Hint glow'
    };
    return ErrorStyle;
  }.call(this);
  ColorHelp.HintStyle = function () {
    class HintStyle extends ColorHelp.DataInputComponent {
      static id() {
        return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp.HintStyle';
      }
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Radio;
        this.name = 'hint-style';
      }
      options() {
        var hintStyle, results;
        results = [];
        for (hintStyle in PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.HintStyle) {
          results.push({
            value: hintStyle,
            name: this.constructor.Names[hintStyle]
          });
        }
        return results;
      }
      load() {
        return PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.hintStyle();
      }
      save(value) {
        return PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.state('hintStyle', value);
      }
    }
    ;
    HintStyle.register(HintStyle.id());
    HintStyle.Names = {
      Dots: 'Dots',
      Symbols: 'Symbols'
    };
    return HintStyle;
  }.call(this);
  return ColorHelp;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.colorhelp.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/palette/colorhelp/template.colorhelp.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Palette.ColorHelp", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-palette-colorhelp ", Spacebars.mustache(view.lookup("visibleClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return HTML.Raw('\n      <button class="close-button">x</button>\n    ');
  }), HTML.Raw('\n    <div class="title-area">\n      <div class="title">\n        颜色辅助请求表单\n      </div>\n    </div>\n    '), HTML.OL({
    class: "help-types"
  }, "\n      ", HTML.LI({
    class: "help-type one-time"
  }, HTML.Raw('\n        <span class="description">\n          获取一次性帮助\n        </span>\n        '), HTML.LABEL("\n          ", HTML.DIV({
    class: "checkbox"
  }, "\n            ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "Palette", "ColorHelp", "OneTimeHelp"));
  }), HTML.Raw('<span class="checkmark"></span>\n          ')), HTML.Raw('\n          <span class="instruction">\n            点击以一次性高亮不正确的颜色和缺失的像素\n          </span>\n        ')), HTML.Raw('\n        <div class="divider">\n          <hr>\n          <span class="or">或</span>\n        </div>\n      ')), "\n      ", HTML.LI({
    class: "help-type hint"
  }, HTML.Raw('\n        <span class="description">\n          颜色提示样式\n        </span>\n        '), Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "Palette", "ColorHelp", "HintStyle"));
  }), "\n      "), "\n      ", HTML.LI({
    class: "help-type error"
  }, HTML.Raw('\n        <span class="description">\n          不正确颜色警告\n        </span>\n        '), Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "Palette", "ColorHelp", "ErrorStyle"));
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"pixelartevaluation":{"pixelartevaluation.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/pixelartevaluation.coffee    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, AMu, FM, LOI, PAA, PAE;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation = function () {
  class PixelArtEvaluation extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation';
    }
    constructor() {
      super(...arguments);
      this.active = new ReactiveField(false);
      this._wasActive = false;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
      this.activeCriterion = new ReactiveField(null);
      this.contentHeight = new ReactiveField(0);
      this.bitmap = new ComputedField(() => {
        var ref;
        return (ref = this.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0;
      });
      this.bitmapObject = new ComputedField(() => {
        return this.bitmap();
      }, (a, b) => {
        return a === b;
      });
      this.asset = new ComputedField(() => {
        return this.interface.parent.activeAsset();
      }, (a, b) => {
        return a === b;
      });
      this.pixelArtEvaluation = new ComputedField(() => {
        var asset, bitmap, ref;
        if ((ref = this._pixelArtEvaluation) != null) {
          ref.destroy();
        }
        if (!(asset = this.asset())) {
          return;
        }

        // Try to reuse the pixel art evaluation instance from the asset.
        if (asset.initialized) {
          if (!asset.initialized()) {
            return;
          }
          if (asset.pixelArtEvaluationInstance) {
            this._pixelArtEvaluation = null;
            return asset.pixelArtEvaluationInstance();
          }
        }
        if (!(bitmap = this.bitmapObject())) {
          return;
        }
        return this._pixelArtEvaluation = new PAE(bitmap);
      });
      this.hoveredFilterValue = new ReactiveField(null);
      this.hoveredPixel = new ComputedField(() => {
        var pixelCanvas;
        pixelCanvas = this.interface.getEditorForActiveFile();
        return pixelCanvas.pointer().pixelCoordinate();
      });

      // Due to animation, the evaluation paper is fully displayed a second after it's activated.
      this.displayed = new ReactiveField(false);
      this.autorun(computation => {
        var active;
        active = this.active();
        if (active) {
          return this._displayedTimeout = Meteor.setTimeout(() => {
            return this.displayed(true);
          }, 1000);
        } else {
          Meteor.clearTimeout(this._displayedTimeout);
          return this.displayed(false);
        }
      });
      this.pixelArtEvaluationProperty = new ComputedField(() => {
        var ref, ref1;
        return (ref = this.bitmap()) != null ? (ref1 = ref.properties) != null ? ref1.pixelArtEvaluation : void 0 : void 0;
      });
      this.editable = new ComputedField(() => {
        var pixelArtEvaluationProperty;
        if (!(pixelArtEvaluationProperty = this.pixelArtEvaluationProperty())) {
          return;
        }
        return pixelArtEvaluationProperty.editable || pixelArtEvaluationProperty.unlockable;
      });
      this.enabledCriteria = new ComputedField(() => {
        var criterion, pixelArtEvaluationProperty, results;
        if (!(pixelArtEvaluationProperty = this.pixelArtEvaluationProperty())) {
          return [];
        }
        results = [];
        for (criterion in PAE.Criteria) {
          if (pixelArtEvaluationProperty[_.lowerFirst(criterion)]) {
            results.push(criterion);
          }
        }
        return results;
      });
      this.engineComponent = new PAE.EngineComponent({
        pixelArtEvaluation: () => {
          return this.pixelArtEvaluation();
        },
        pixelArtEvaluationProperty: () => {
          return this.pixelArtEvaluationProperty();
        },
        displayedCriteria: () => {
          var activeCriterion;
          if (!this.displayed()) {
            return [];
          }
          if (activeCriterion = this.activeCriterion()) {
            return [activeCriterion];
          } else {
            return this.enabledCriteria();
          }
        },
        filterValue: () => {
          if (this.displayed()) {
            return this.hoveredFilterValue();
          } else {
            return null;
          }
        },
        focusedPixel: () => {
          if (this.displayed()) {
            return this.hoveredPixel();
          } else {
            return null;
          }
        }
      });

      // Automatically enter focused mode when active.
      this.autorun(computation => {
        return this.desktop.focusedMode(this.active());
      });

      // Force the analyze tool when activated.
      this.autorun(computation => {
        var analyzeTool;
        if (!this.active()) {
          return;
        }
        analyzeTool = this.interface.getOperator(PAA.PixelPad.Apps.Drawing.Editor.Tools.Analyze);

        // We need to compare to the active tool ID since the active tool field won't have time to recompute yet.
        if (this.interface.activeTool() === analyzeTool) {
          return;
        }

        // Activate the analyze tool, storing the previous one.
        return Tracker.nonreactive(() => {
          // Note: We don't want to reactively read the stored tool
          // since it will be updated before the active tool recomputes.
          if (this.interface.storedTool() === analyzeTool) {
            return;
          }
          return this.interface.activateTool(analyzeTool, true);
        });
      });

      // Automatically deactivate when exiting focused mode.
      this.autorun(computation => {
        if (this.desktop.focusedMode()) {
          return;
        }
        this.deactivate();

        // Deactivate the analyze tool to restore the previous one.
        return Tracker.nonreactive(() => {
          return this.interface.deactivateTool();
        });
      });

      // Update evaluation where requested.
      return this.autorun(computation => {
        var evaluation, pixelArtEvaluation, pixelArtEvaluationProperty;
        if (!(pixelArtEvaluationProperty = this.pixelArtEvaluationProperty())) {
          return;
        }
        if (!(pixelArtEvaluation = this.pixelArtEvaluation())) {
          return;
        }
        evaluation = pixelArtEvaluation.evaluate(pixelArtEvaluationProperty);
        return Tracker.nonreactive(() => {
          var asset, historyLength, ref, ref1, updatePropertyAction;
          // Only update evaluation when we're at the end of history to prevent recalculation when undoing/redoing
          // (in case we change evaluation and this would cause new values—history is more important).
          asset = (ref = this.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0;
          historyLength = ((ref1 = asset.history) != null ? ref1.length : void 0) || AMu.Document.Versioning.ActionArchive.getHistoryLengthForDocument(asset._id);
          if (asset.historyPosition !== historyLength) {
            return;
          }
          // See if there was any change from the current data.
          if (_.objectContains(asset.properties.pixelArtEvaluation, evaluation)) {
            return;
          }
          pixelArtEvaluationProperty = _.merge({}, asset.properties.pixelArtEvaluation, evaluation);
          updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.constructor.id(), asset, 'pixelArtEvaluation', pixelArtEvaluationProperty);
          return asset.executeAction(updatePropertyAction, true);
        });
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.autorun(async computation => {
        var ref;
        if ((ref = this._resizeObserver) != null) {
          ref.disconnect();
        }
        if (!this.paperDisplayed()) {
          return;
        }
        await _.waitForFlush();
        this.$content = this.$('.content');
        this._resizeObserver = new ResizeObserver(() => {
          return this.contentHeight(this.$content.outerHeight());
        });
        return this._resizeObserver.observe(this.$content[0]);
      });
    }
    onDestroyed() {
      var ref, ref1;
      super.onDestroyed(...arguments);
      if ((ref = this._resizeObserver) != null) {
        ref.disconnect();
      }
      return (ref1 = this._pixelArtEvaluation) != null ? ref1.destroy() : void 0;
    }
    onBackButton() {
      if (!this.activeCriterion()) {
        return;
      }
      this.setCriterion(null);

      // Inform that we've handled the back button.
      return true;
    }
    editorDrawComponents() {
      return [this.engineComponent];
    }
    activate() {
      let criterion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._changeActive(true);
      return this.activeCriterion(criterion);
    }
    deactivate() {
      return this._changeActive(false);
    }

    // Use this to change the criterion when already active.
    setCriterion(criterion) {
      this.activeCriterion(criterion);
      return this.audio.flipPaper();
    }
    _changeActive(value) {
      this.active(value);
      if (value === this._wasActive) {
        return;
      }
      this._wasActive = value;
      if (!this.isRendered()) {
        return;
      }
      if (value) {
        this.audio.open();
      } else {
        this.audio.close();
      }
      return Tracker.nonreactive(() => {
        var camera, editor, origin, originDataField, originDeltaY, paperHeight, scale;
        editor = this.interface.getEditorForActiveFile();
        camera = editor.camera();
        scale = camera.effectiveScale();
        paperHeight = this.$('.paper').height() / scale;
        originDeltaY = paperHeight / 2;
        if (!value) {
          originDeltaY *= -1;
        }
        originDataField = camera.originData();
        origin = originDataField.value();
        return camera.translateTo({
          x: origin.x,
          y: origin.y + originDeltaY
        }, 1);
      });
    }
    activeClass() {
      if (this.active()) {
        return 'active';
      }
    }
    paperDisplayed() {
      var property;
      // Display the paper if the property is defined and we're not explicitly told to not display it.
      property = this.pixelArtEvaluationProperty();
      return property && property.displayed !== false;
    }
    contentPlaceholderStyle() {
      return {
        height: "".concat(this.contentHeight(), "px")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .paper': this.onClickPaper,
        'pointerenter .paper': this.onPointerEnterPaper,
        'pointerleave .paper': this.onPointerLeavePaper
      });
    }
    onClickPaper(event) {
      if (this.active()) {
        return;
      }
      return this.activate();
    }
    onPointerEnterPaper(event) {
      if (this.active()) {
        return;
      }
      this.audio.lift();
      return this._liftTime = Date.now();
    }
    onPointerLeavePaper(event) {
      if (this.active()) {
        return;
      }
      if (Date.now() - this._liftTime > 100) {
        return this.audio.release();
      }
    }
  }
  ;
  PixelArtEvaluation.register(PixelArtEvaluation.id());
  PixelArtEvaluation.Audio = new LOI.Assets.Audio.Namespace(PixelArtEvaluation.id(), {
    // Loaded from the PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop namespace.
    subNamespace: true,
    variables: {
      lift: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      release: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      open: AEc.ValueTypes.Trigger,
      close: AEc.ValueTypes.Trigger,
      flipPaper: AEc.ValueTypes.Trigger,
      checkmarkOn: AEc.ValueTypes.Trigger,
      checkmarkOff: AEc.ValueTypes.Trigger
    }
  });
  PixelArtEvaluation.CriterionEnabled = function () {
    class CriterionEnabled extends AM.DataInputComponent {
      static id() {
        return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.CriterionEnabled';
      }
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Checkbox;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.pixelArtEvaluation = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      }
      load() {
        var criterion;
        criterion = this.data();
        return _.nestedProperty(this.pixelArtEvaluation.pixelArtEvaluationProperty(), criterion.propertyPath);
      }
      save(value) {
        var asset, criterion, criterionData, criterionProperty, found, pixelArtEvaluationProperty, ref, subcriterion, updatePropertyAction;
        criterion = this.data();
        pixelArtEvaluationProperty = EJSON.clone(this.pixelArtEvaluation.pixelArtEvaluationProperty());
        if (value) {
          // Enable all subcriteria if they exist.
          criterionData = {};
          if (PAE.Subcriteria[criterion.id]) {
            for (subcriterion in PAE.Subcriteria[criterion.id]) {
              criterionData[_.lowerFirst(subcriterion)] = {};
            }
          }
          _.nestedProperty(pixelArtEvaluationProperty, criterion.propertyPath, criterionData);
        } else {
          _.deleteNestedProperty(pixelArtEvaluationProperty, criterion.propertyPath);

          // If this is a subcriteria, check that the parent even has any subcriteria left.
          if (criterion.parentId) {
            found = false;
            criterionProperty = _.lowerFirst(criterion.parentId);
            for (subcriterion in PAE.Subcriteria[criterion.parentId]) {
              if (pixelArtEvaluationProperty[criterionProperty][_.lowerFirst(subcriterion)]) {
                found = true;
              }
            }
            if (!found) {
              // No subcriteria are left, we can disable the whole criteria.
              delete pixelArtEvaluationProperty[criterionProperty];
            }
          }
        }
        asset = (ref = this.pixelArtEvaluation.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0;
        updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.constructor.id(), asset, 'pixelArtEvaluation', pixelArtEvaluationProperty);
        asset.executeAction(updatePropertyAction);
        if (value) {
          return this.pixelArtEvaluation.audio.checkmarkOn();
        } else {
          return this.pixelArtEvaluation.audio.checkmarkOff();
        }
      }
    }
    ;
    CriterionEnabled.register(CriterionEnabled.id());
    return CriterionEnabled;
  }.call(this);
  return PixelArtEvaluation;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pixelartevaluation.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/template.pixelartevaluation. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation table-item ", Spacebars.mustache(view.lookup("activeClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("paperDisplayed"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "paper"
    }, "\n        ", HTML.DIV(HTML.Attrs({
      class: "content-placeholder"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentPlaceholderStyle"));
    })), "\n        ", HTML.DIV({
      class: "content"
    }, "\n          ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("activeCriterion"));
    }, function() {
      return [ "\n            ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "Overview"));
      }), "\n          " ];
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("activeCriterion"), "PixelPerfectLines");
    }, function() {
      return [ "\n            ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "PixelPerfectLines"));
      }), "\n          " ];
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("activeCriterion"), "EvenDiagonals");
    }, function() {
      return [ "\n            ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "EvenDiagonals"));
      }), "\n          " ];
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("activeCriterion"), "SmoothCurves");
    }, function() {
      return [ "\n            ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "SmoothCurves"));
      }), "\n          " ];
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("activeCriterion"), "ConsistentLineWidth");
    }, function() {
      return [ "\n            ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "ConsistentLineWidth"));
      }), "\n          " ];
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"overview":{"overview.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/overview/overview.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc,
  AM,
  FM,
  LOI,
  Markup,
  PAA,
  PAE,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAE = PAA.Practice.PixelArtEvaluation;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.Overview = function () {
  class Overview extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.Overview';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.pixelArtEvaluation = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      this.editable = new ComputedField(() => {
        return this.pixelArtEvaluation.editable();
      });
      this.unlockable = new ComputedField(() => {
        var ref;
        return (ref = this.pixelArtEvaluation.pixelArtEvaluationProperty()) != null ? ref.unlockable : void 0;
      });
      return this.criteria = new ComputedField(() => {
        var criteria, criterion, criterionProperty, pixelArtEvaluationCriteria, pixelArtEvaluationProperty, ref;
        if (!(pixelArtEvaluationProperty = this.pixelArtEvaluation.pixelArtEvaluationProperty())) {
          return;
        }
        criteria = [];
        pixelArtEvaluationCriteria = pixelArtEvaluationProperty.allowedCriteria || PAA.Practice.Project.Asset.Bitmap.state('unlockedPixelArtEvaluationCriteria') || [];
        if (this.unlockable()) {
          // Note: We need to use concat since we don't want to modify the array we got from the state.
          pixelArtEvaluationCriteria = pixelArtEvaluationCriteria.concat(PAA.Practice.Project.Asset.Bitmap.state('unlockablePixelArtEvaluationCriteria') || []);
        }
        for (criterion in PAE.Criteria) {
          criterionProperty = _.lowerFirst(criterion);
          if (!(indexOf.call(pixelArtEvaluationCriteria, criterion) >= 0 || pixelArtEvaluationProperty[criterionProperty] != null)) {
            // Show only existing criteria when not editable (and unlocked otherwise so we can toggle them on and off).
            continue;
          }
          criteria.push({
            id: criterion,
            property: criterionProperty,
            propertyPath: criterionProperty,
            name: this.constructor.CriteriaNames[criterion],
            enabled: pixelArtEvaluationProperty[criterionProperty] != null,
            score: (ref = pixelArtEvaluationProperty[criterionProperty]) != null ? ref.score : void 0
          });
        }
        return criteria;
      });
    }
    scorePercentage(value) {
      return Markup.percentage(value);
    }
    hasFinalScore() {
      var ref;
      return ((ref = this.pixelArtEvaluation.pixelArtEvaluationProperty()) != null ? ref.score : void 0) != null;
    }
    letterGrade() {
      return PAE.getLetterGrade(this.pixelArtEvaluation.pixelArtEvaluationProperty().score);
    }
    events() {
      return super.events(...arguments).concat({
        'click .criterion .name-area, click .criterion .score': this.onClickCriterion
      });
    }
    onClickCriterion(event) {
      var criterion;
      criterion = this.currentData();
      return this.pixelArtEvaluation.setCriterion(criterion.id);
    }
  }
  ;
  Overview.register(Overview.id());
  Overview.CriteriaNames = {
    PixelPerfectLines: "完美像素线条",
    EvenDiagonals: "均匀对角线",
    SmoothCurves: "平滑曲线",
    ConsistentLineWidth: "一致线条宽度"
  };
  return Overview;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.overview.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/overview/template.overview.j //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.Overview");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.Overview"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.Overview", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation-overview"
  }, HTML.Raw('\n    <div class="title">\n      像素艺术评估\n    </div>\n    '), HTML.TABLE({
    class: "evaluation-breakdown"
  }, "\n      ", HTML.TR({
    class: "header-row"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editable"));
  }, function() {
    return HTML.Raw("\n          <th>必需</th>\n        ");
  }), HTML.Raw("\n        <th>标准</th>\n        <th>分数</th>\n      ")), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("criteria"));
  }, function() {
    return [ "\n        ", HTML.TR({
      class: function() {
        return [ "criterion ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
      }
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("editable"));
    }, function() {
      return [ "\n            ", HTML.TD({
        class: "required"
      }, "\n              ", HTML.LABEL({
        class: "checkmark-area"
      }, "\n                ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "CriterionEnabled"));
      }), HTML.Raw('<span class="checkmark"></span>\n              ')), "\n            "), "\n          " ];
    }), "\n          ", HTML.TD({
      class: "name-area"
    }, HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }))), "\n          ", HTML.TD({
      class: "score"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n              ", Blaze.View("lookup:scorePercentage", function() {
        return Spacebars.mustache(view.lookup("scorePercentage"), view.lookup("score"));
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n      " ];
  }), "\n      ", HTML.TR({
    class: "empty-row"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editable"));
  }, function() {
    return HTML.Raw("\n          <td></td>\n        ");
  }), HTML.Raw("\n        <td></td>\n        <td></td>\n      ")), "\n      ", HTML.TR({
    class: "final-score-row"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editable"));
  }, function() {
    return HTML.Raw("\n          <td></td>\n        ");
  }), HTML.Raw('\n        <td class="average">平均分</td>\n        '), HTML.TD({
    class: "score"
  }, "\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasFinalScore"));
  }, function() {
    return [ "\n            ", Blaze.View("lookup:scorePercentage", function() {
      return Spacebars.mustache(view.lookup("scorePercentage"), Spacebars.dot(view.lookup("pixelArtEvaluation"), "pixelArtEvaluationProperty", "score"));
    }), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasFinalScore"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "letter-grade"
    }, "\n        ", Blaze.View("lookup:letterGrade", function() {
      return Spacebars.mustache(view.lookup("letterGrade"));
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pixelperfectlines":{"pixelperfectlines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/pixelperfectlines/pixelperfe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, Markup, PAA, PAE;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAE = PAA.Practice.PixelArtEvaluation;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.PixelPerfectLines = function () {
  class PixelPerfectLines extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.PixelPerfectLines';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.pixelArtEvaluation = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      this.pixelPerfectLinesProperty = new ComputedField(() => {
        var ref, ref1, ref2;
        return (ref = this.pixelArtEvaluation.bitmap()) != null ? (ref1 = ref.properties) != null ? (ref2 = ref1.pixelArtEvaluation) != null ? ref2.pixelPerfectLines : void 0 : void 0 : void 0;
      });
      this.editable = new ComputedField(() => {
        var ref, ref1;
        return (ref = (ref1 = this.pixelPerfectLinesProperty()) != null ? ref1.editable : void 0) != null ? ref : this.pixelArtEvaluation.editable();
      });
      return this.criteria = new ComputedField(() => {
        var criteria, criterion, criterionProperty, editable, pixelPerfectLinesProperty, ref;
        pixelPerfectLinesProperty = this.pixelPerfectLinesProperty();
        editable = this.editable();
        criteria = [];
        for (criterion in PAE.Subcriteria.PixelPerfectLines) {
          criterionProperty = _.lowerFirst(criterion);
          if (!(editable || (pixelPerfectLinesProperty != null ? pixelPerfectLinesProperty[criterionProperty] : void 0) != null)) {
            // Show only existing criteria when not editable (and all otherwise so we can toggle them on and off).
            continue;
          }
          criteria.push({
            id: criterion,
            parentId: PAE.Criteria.PixelPerfectLines,
            property: criterionProperty,
            propertyPath: "pixelPerfectLines.".concat(criterionProperty),
            name: this.constructor.CriteriaNames[criterion],
            enabled: (pixelPerfectLinesProperty != null ? pixelPerfectLinesProperty[criterionProperty] : void 0) != null,
            count: pixelPerfectLinesProperty != null ? (ref = pixelPerfectLinesProperty[criterionProperty]) != null ? ref.count : void 0 : void 0
          });
        }
        return criteria;
      });
    }
    events() {
      return super.events(...arguments).concat({
        'pointerenter .criterion .count': this.onPointerEnterCriterion,
        'pointerleave .criterion .count': this.onPointerLeaveCriterion
      });
    }
    onPointerEnterCriterion(event) {
      var criterion;
      criterion = this.currentData();
      return this.pixelArtEvaluation.hoveredFilterValue(criterion.id);
    }
    onPointerLeaveCriterion(event) {
      return this.pixelArtEvaluation.hoveredFilterValue(null);
    }
  }
  ;
  PixelPerfectLines.register(PixelPerfectLines.id());
  PixelPerfectLines.CriteriaNames = {
    Doubles: "重叠像素",
    Corners: "拐角"
  };
  return PixelPerfectLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pixelperfectlines.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/pixelperfectlines/template.p //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.PixelPerfectLines");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.PixelPerfectLines"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.PixelPerfectLines", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation-pixelperfectlines"
  }, HTML.Raw('\n    <div class="title">\n      完美像素线条\n    </div>\n    '), HTML.TABLE({
    class: "evaluation-breakdown detailed"
  }, "\n      ", HTML.TR({
    class: "header-row"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editable"));
  }, function() {
    return HTML.Raw("\n          <th>必需</th>\n        ");
  }), HTML.Raw("\n        <th>标准</th>\n        <th>数量</th>\n      ")), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("criteria"));
  }, function() {
    return [ "\n        ", HTML.TR({
      class: function() {
        return [ "criterion ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
      }
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("editable"));
    }, function() {
      return [ "\n            ", HTML.TD({
        class: "required"
      }, "\n              ", HTML.LABEL({
        class: "checkmark-area"
      }, "\n                ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "CriterionEnabled"));
      }), HTML.Raw('<span class="checkmark"></span>\n              ')), "\n            "), "\n          " ];
    }), "\n          ", HTML.TD({
      class: "name-area"
    }, HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }))), "\n          ", HTML.TD({
      class: "count"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n              ", Blaze.View("lookup:count", function() {
        return Spacebars.mustache(view.lookup("count"));
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"evendiagonals":{"evendiagonals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/evendiagonals/evendiagonals. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, Markup, PAA, PAE;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAE = PAA.Practice.PixelArtEvaluation;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.EvenDiagonals = function () {
  class EvenDiagonals extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.EvenDiagonals';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.pixelArtEvaluation = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      this.evenDiagonalsProperty = new ComputedField(() => {
        var ref, ref1, ref2;
        return (ref = this.pixelArtEvaluation.bitmap()) != null ? (ref1 = ref.properties) != null ? (ref2 = ref1.pixelArtEvaluation) != null ? ref2.evenDiagonals : void 0 : void 0 : void 0;
      });
      this.editable = new ComputedField(() => {
        var ref, ref1;
        return (ref = (ref1 = this.evenDiagonalsProperty()) != null ? ref1.editable : void 0) != null ? ref : this.pixelArtEvaluation.editable();
      });
      return this.criteria = new ComputedField(() => {
        var categories, category, criteria, criterion, criterionProperty, editable, enabled, evenDiagonalsProperty, ref;
        evenDiagonalsProperty = this.evenDiagonalsProperty();
        editable = this.editable();
        criteria = [];
        for (criterion in PAE.Subcriteria.EvenDiagonals) {
          criterionProperty = _.lowerFirst(criterion);
          if (!(editable || (evenDiagonalsProperty != null ? evenDiagonalsProperty[criterionProperty] : void 0) != null)) {
            // Show only existing criteria when not editable (and all otherwise so we can toggle them on and off).
            continue;
          }
          if (enabled = (evenDiagonalsProperty != null ? evenDiagonalsProperty[criterionProperty] : void 0) != null) {
            categories = function () {
              var results;
              results = [];
              for (category in PAE.Line.Part.StraightLine[criterion]) {
                results.push({
                  id: category,
                  name: this.constructor.CategoryNames[criterion][category],
                  count: evenDiagonalsProperty[criterionProperty].counts[_.lowerFirst(category)]
                });
              }
              return results;
            }.call(this);
          } else {
            categories = null;
          }
          criteria.push({
            id: criterion,
            parentId: PAE.Criteria.EvenDiagonals,
            property: criterionProperty,
            propertyPath: "evenDiagonals.".concat(criterionProperty),
            name: this.constructor.CriteriaNames[criterion],
            enabled: enabled,
            score: evenDiagonalsProperty != null ? (ref = evenDiagonalsProperty[criterionProperty]) != null ? ref.score : void 0 : void 0,
            categories: categories
          });
        }
        return criteria;
      });
    }
    scorePercentage(value) {
      return Markup.percentage(value);
    }
    events() {
      return super.events(...arguments).concat({
        'pointerenter .category .count': this.onPointerEnterCategory,
        'pointerleave .category .count': this.onPointerLeaveCategory
      });
    }
    onPointerEnterCategory(event) {
      var category, criterion;
      category = this.currentData();
      criterion = Template.parentData();
      return this.pixelArtEvaluation.hoveredFilterValue({
        property: criterion.property,
        value: category.id
      });
    }
    onPointerLeaveCategory(event) {
      return this.pixelArtEvaluation.hoveredFilterValue(null);
    }
  }
  ;
  EvenDiagonals.register(EvenDiagonals.id());
  EvenDiagonals.CriteriaNames = {
    SegmentLengths: "线段长度",
    EndSegments: "端点线段"
  };
  EvenDiagonals.CategoryNames = {
    SegmentLengths: {
      Even: "均匀 (A)",
      Alternating: "交替 (A–C)",
      Broken: "不规则 (C–F)"
    },
    EndSegments: {
      Matching: "匹配 (A)",
      Shorter: "较短 (A–F)"
    }
  };
  return EvenDiagonals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.evendiagonals.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/evendiagonals/template.evend //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.EvenDiagonals");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.EvenDiagonals"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.EvenDiagonals", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation-evendiagonals"
  }, HTML.Raw('\n    <div class="title">\n      均匀对角线\n    </div>\n    '), HTML.TABLE({
    class: "evaluation-breakdown detailed"
  }, "\n      ", HTML.TR({
    class: "header-row"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editable"));
  }, function() {
    return HTML.Raw("\n          <th>必需</th>\n        ");
  }), HTML.Raw("\n        <th>标准</th>\n        <th>分数</th>\n      ")), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("criteria"));
  }, function() {
    return [ "\n        ", HTML.TR({
      class: function() {
        return [ "criterion ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
      }
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("editable"));
    }, function() {
      return [ "\n            ", HTML.TD({
        class: "required"
      }, "\n              ", HTML.LABEL({
        class: "checkmark-area"
      }, "\n                ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "CriterionEnabled"));
      }), HTML.Raw('<span class="checkmark"></span>\n              ')), "\n            "), "\n          " ];
    }), "\n          ", HTML.TD({
      class: "name-area"
    }, HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }))), "\n          ", HTML.TD({
      class: "score"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n              ", Blaze.View("lookup:scorePercentage", function() {
        return Spacebars.mustache(view.lookup("scorePercentage"), view.lookup("score"));
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n          ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("categories"));
      }, function() {
        return [ "\n            ", HTML.TR({
          class: function() {
            return [ "category ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
          }
        }, "\n              ", Blaze.If(function() {
          return Spacebars.call(view.lookup("editable"));
        }, function() {
          return HTML.Raw('\n                <td class="required"></td>\n              ');
        }), "\n              ", HTML.TD({
          class: "name-area"
        }, HTML.SPAN({
          class: "name"
        }, Blaze.View("lookup:name", function() {
          return Spacebars.mustache(view.lookup("name"));
        }))), "\n              ", HTML.TD({
          class: "count"
        }, Blaze.View("lookup:count", function() {
          return Spacebars.mustache(view.lookup("count"));
        })), "\n            "), "\n          " ];
      }), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"smoothcurves":{"smoothcurves.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/smoothcurves/smoothcurves.co //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, Markup, PAA, PAE;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAE = PAA.Practice.PixelArtEvaluation;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.SmoothCurves = function () {
  class SmoothCurves extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.SmoothCurves';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.pixelArtEvaluation = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      this.smoothCurvesProperty = new ComputedField(() => {
        var ref, ref1, ref2;
        return (ref = this.pixelArtEvaluation.bitmap()) != null ? (ref1 = ref.properties) != null ? (ref2 = ref1.pixelArtEvaluation) != null ? ref2.smoothCurves : void 0 : void 0 : void 0;
      });
      this.editable = new ComputedField(() => {
        var ref, ref1;
        return (ref = (ref1 = this.smoothCurvesProperty()) != null ? ref1.editable : void 0) != null ? ref : this.pixelArtEvaluation.editable();
      });
      return this.criteria = new ComputedField(() => {
        var categories, category, criteria, criterion, criterionProperty, editable, enabled, ref, smoothCurvesProperty;
        smoothCurvesProperty = this.smoothCurvesProperty();
        editable = this.editable();
        criteria = [];
        for (criterion in PAE.Subcriteria.SmoothCurves) {
          criterionProperty = _.lowerFirst(criterion);
          if (!(editable || (smoothCurvesProperty != null ? smoothCurvesProperty[criterionProperty] : void 0) != null)) {
            // Show only existing criteria when not editable (and all otherwise so we can toggle them on and off).
            continue;
          }
          if (enabled = (smoothCurvesProperty != null ? smoothCurvesProperty[criterionProperty] : void 0) != null) {
            categories = function () {
              var results;
              results = [];
              for (category in PAE.Line.Part.Curve[criterion]) {
                results.push({
                  id: category,
                  name: this.constructor.CategoryNames[criterion][category],
                  count: smoothCurvesProperty[criterionProperty].counts[_.lowerFirst(category)]
                });
              }
              return results;
            }.call(this);
          } else {
            categories = null;
          }
          criteria.push({
            id: criterion,
            parentId: PAE.Criteria.SmoothCurves,
            property: criterionProperty,
            propertyPath: "smoothCurves.".concat(criterionProperty),
            name: this.constructor.CriteriaNames[criterion],
            enabled: enabled,
            score: smoothCurvesProperty != null ? (ref = smoothCurvesProperty[criterionProperty]) != null ? ref.score : void 0 : void 0,
            categories: categories
          });
        }
        return criteria;
      });
    }
    scorePercentage(value) {
      return Markup.percentage(value);
    }
    events() {
      return super.events(...arguments).concat({
        'pointerenter .score, pointerenter .count': this.onPointerEnterScoreOrCount,
        'pointerleave .score, pointerleave .count': this.onPointerLeaveScoreOrCount
      });
    }
    onPointerEnterScoreOrCount(event) {
      var criterionOrCategory;
      criterionOrCategory = this.currentData();
      return this.pixelArtEvaluation.hoveredFilterValue(criterionOrCategory.id);
    }
    onPointerLeaveScoreOrCount(event) {
      return this.pixelArtEvaluation.hoveredFilterValue(null);
    }
  }
  ;
  SmoothCurves.register(SmoothCurves.id());
  SmoothCurves.CriteriaNames = {
    AbruptSegmentLengthChanges: '突变长度变化',
    StraightParts: '直线部分',
    InflectionPoints: '拐点'
  };
  SmoothCurves.CategoryNames = {
    AbruptSegmentLengthChanges: {
      Minor: '轻微 (B–D)',
      Major: '严重 (F)'
    },
    StraightParts: {
      End: '端部 (A-C)',
      Middle: '中部 (A-F)'
    },
    InflectionPoints: {
      Isolated: '孤立 (A)',
      Sparse: '稀疏 (B–D)',
      Dense: '密集 (F)'
    }
  };
  return SmoothCurves;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.smoothcurves.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/smoothcurves/template.smooth //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.SmoothCurves");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.SmoothCurves"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.SmoothCurves", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation-smoothcurves"
  }, HTML.Raw('\n    <div class="title">\n      平滑曲线\n    </div>\n    '), HTML.TABLE({
    class: "evaluation-breakdown detailed"
  }, "\n      ", HTML.TR({
    class: "header-row"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editable"));
  }, function() {
    return HTML.Raw("\n          <th>必需</th>\n        ");
  }), HTML.Raw("\n        <th>标准</th>\n        <th>分数</th>\n      ")), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("criteria"));
  }, function() {
    return [ "\n        ", HTML.TR({
      class: function() {
        return [ "criterion ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
      }
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("editable"));
    }, function() {
      return [ "\n            ", HTML.TD({
        class: "required"
      }, "\n              ", HTML.LABEL({
        class: "checkmark-area"
      }, "\n                ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "CriterionEnabled"));
      }), HTML.Raw('<span class="checkmark"></span>\n              ')), "\n            "), "\n          " ];
    }), "\n          ", HTML.TD({
      class: "name-area"
    }, HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }))), "\n          ", HTML.TD({
      class: "score"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n              ", Blaze.View("lookup:scorePercentage", function() {
        return Spacebars.mustache(view.lookup("scorePercentage"), view.lookup("score"));
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n          ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("categories"));
      }, function() {
        return [ "\n            ", HTML.TR({
          class: function() {
            return [ "category ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
          }
        }, "\n              ", Blaze.If(function() {
          return Spacebars.call(view.lookup("editable"));
        }, function() {
          return HTML.Raw('\n                <td class="required"></td>\n              ');
        }), "\n              ", HTML.TD({
          class: "name-area"
        }, HTML.SPAN({
          class: "name"
        }, Blaze.View("lookup:name", function() {
          return Spacebars.mustache(view.lookup("name"));
        }))), "\n              ", HTML.TD({
          class: "count"
        }, Blaze.View("lookup:count", function() {
          return Spacebars.mustache(view.lookup("count"));
        })), "\n            "), "\n          " ];
      }), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"consistentlinewidth":{"consistentlinewidth.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/consistentlinewidth/consiste //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, Markup, PAA, PAE;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAE = PAA.Practice.PixelArtEvaluation;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.ConsistentLineWidth = function () {
  class ConsistentLineWidth extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.ConsistentLineWidth';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.pixelArtEvaluation = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      this.consistentLineWidthProperty = new ComputedField(() => {
        var ref, ref1, ref2;
        return (ref = this.pixelArtEvaluation.bitmap()) != null ? (ref1 = ref.properties) != null ? (ref2 = ref1.pixelArtEvaluation) != null ? ref2.consistentLineWidth : void 0 : void 0 : void 0;
      });
      this.editable = new ComputedField(() => {
        var ref, ref1;
        return (ref = (ref1 = this.consistentLineWidthProperty()) != null ? ref1.editable : void 0) != null ? ref : this.pixelArtEvaluation.editable();
      });
      return this.criteria = new ComputedField(() => {
        var categories, category, consistentLineWidthProperty, criteria, criterion, criterionProperty, editable, enabled, name, ref;
        consistentLineWidthProperty = this.consistentLineWidthProperty();
        editable = this.editable();
        criteria = [];
        for (criterion in PAE.Subcriteria.ConsistentLineWidth) {
          criterionProperty = _.lowerFirst(criterion);
          if (!(editable || (consistentLineWidthProperty != null ? consistentLineWidthProperty[criterionProperty] : void 0) != null)) {
            // Show only existing criteria when not editable (and all otherwise so we can toggle them on and off).
            continue;
          }
          if (enabled = (consistentLineWidthProperty != null ? consistentLineWidthProperty[criterionProperty] : void 0) != null) {
            categories = function () {
              var ref, results;
              ref = this.constructor.CategoryNames[criterion];
              results = [];
              for (category in ref) {
                name = ref[category];
                results.push({
                  id: category,
                  name: name,
                  count: consistentLineWidthProperty[criterionProperty].counts[_.lowerFirst(category)]
                });
              }
              return results;
            }.call(this);
          } else {
            categories = null;
          }
          criteria.push({
            id: criterion,
            parentId: PAE.Criteria.ConsistentLineWidth,
            property: criterionProperty,
            propertyPath: "consistentLineWidth.".concat(criterionProperty),
            name: this.constructor.CriteriaNames[criterion],
            enabled: enabled,
            score: consistentLineWidthProperty != null ? (ref = consistentLineWidthProperty[criterionProperty]) != null ? ref.score : void 0 : void 0,
            categories: categories
          });
        }
        return criteria;
      });
    }
    scorePercentage(value) {
      return Markup.percentage(value);
    }
    events() {
      return super.events(...arguments).concat({
        'pointerenter .category .count': this.onPointerEnterCategory,
        'pointerleave .category .count': this.onPointerLeaveCategory
      });
    }
    onPointerEnterCategory(event) {
      var category, criterion;
      category = this.currentData();
      criterion = Template.parentData();
      return this.pixelArtEvaluation.hoveredFilterValue({
        criterion: criterion.id,
        value: category.id
      });
    }
    onPointerLeaveCategory(event) {
      return this.pixelArtEvaluation.hoveredFilterValue(null);
    }
  }
  ;
  ConsistentLineWidth.register(ConsistentLineWidth.id());
  ConsistentLineWidth.CriteriaNames = {
    IndividualConsistency: '单线宽度',
    GlobalConsistency: '统一线条类型'
  };
  ConsistentLineWidth.CategoryNames = {
    IndividualConsistency: {
      Consistent: "一致 (A)",
      Varying: "不一致 (B–F)"
    },
    GlobalConsistency: {
      Thin: '细线',
      Thick: '粗线',
      Wide: '宽线',
      Varying: '不一致'
    }
  };
  return ConsistentLineWidth;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.consistentlinewidth.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/consistentlinewidth/template //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.ConsistentLineWidth");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.ConsistentLineWidth"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.ConsistentLineWidth", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation-consistentlinewidth"
  }, HTML.Raw('\n    <div class="title">\n      一致线条宽度\n    </div>\n    '), HTML.TABLE({
    class: "evaluation-breakdown detailed"
  }, "\n      ", HTML.TR({
    class: "header-row"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("editable"));
  }, function() {
    return HTML.Raw("\n          <th>必需</th>\n        ");
  }), HTML.Raw("\n        <th>标准</th>\n        <th>分数</th>\n      ")), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("criteria"));
  }, function() {
    return [ "\n        ", HTML.TR({
      class: function() {
        return [ "criterion ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
      }
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("editable"));
    }, function() {
      return [ "\n            ", HTML.TD({
        class: "required"
      }, "\n              ", HTML.LABEL({
        class: "checkmark-area"
      }, "\n                ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "PixelArtEvaluation", "CriterionEnabled"));
      }), HTML.Raw('<span class="checkmark"></span>\n              ')), "\n            "), "\n          " ];
    }), "\n          ", HTML.TD({
      class: "name-area"
    }, HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }))), "\n          ", HTML.TD({
      class: "score"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n              ", Blaze.View("lookup:scorePercentage", function() {
        return Spacebars.mustache(view.lookup("scorePercentage"), view.lookup("score"));
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("enabled"));
    }, function() {
      return [ "\n          ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("categories"));
      }, function() {
        return [ "\n            ", HTML.TR({
          class: function() {
            return [ "category ", Spacebars.mustache(view.lookup("kebabCase"), Spacebars.dot(view.lookup("."), "id")) ];
          }
        }, "\n              ", Blaze.If(function() {
          return Spacebars.call(view.lookup("editable"));
        }, function() {
          return HTML.Raw('\n                <td class="required"></td>\n              ');
        }), "\n              ", HTML.TD({
          class: "name-area"
        }, HTML.SPAN({
          class: "name"
        }, Blaze.View("lookup:name", function() {
          return Spacebars.mustache(view.lookup("name"));
        }))), "\n              ", HTML.TD({
          class: "count"
        }, Blaze.View("lookup:count", function() {
          return Spacebars.mustache(view.lookup("count"));
        })), "\n            "), "\n          " ];
      }), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"readabilityanalysis":{"readabilityanalysis.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/readabilityanalysis/readabilityanalysis.coffee  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AEc, AM, AMu, FM, LOI, PAA, RA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
RA = PAA.Practice.ReadabilityAnalysis;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis = function () {
  class ReadabilityAnalysis extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis';
    }
    static localizedLabel(label) {
      return {
        "alarm clock": "闹钟",
        "airplane": "飞机",
        "ant": "蚂蚁",
        "apple": "苹果",
        "axe": "斧头",
        "banana": "香蕉",
        "bat": "蝙蝠",
        "bear": "熊",
        "bee": "蜜蜂",
        "bench": "长椅",
        "bicycle": "自行车",
        "bottle": "瓶子",
        "bread": "面包",
        "butterfly": "蝴蝶",
        "camel": "骆驼",
        "candle": "蜡烛",
        "cannon": "大炮",
        "car": "汽车",
        "castle": "城堡",
        "cat": "猫",
        "chair": "椅子",
        "church": "教堂",
        "couch": "沙发",
        "cow": "奶牛",
        "crab": "螃蟹",
        "cup": "杯子",
        "dog": "狗",
        "dolphin": "海豚",
        "door": "门",
        "duck": "鸭子",
        "elephant": "大象",
        "eyeglasses": "眼镜",
        "fan": "风扇",
        "fish": "鱼",
        "flower": "花",
        "frog": "青蛙",
        "giraffe": "长颈鹿",
        "guitar": "吉他",
        "hamburger": "汉堡",
        "hammer": "锤子",
        "harp": "竖琴",
        "hat": "帽子",
        "hedgehog": "刺猬",
        "helicopter": "直升机",
        "horse": "马",
        "hot air balloon": "热气球",
        "hourglass": "沙漏",
        "kangaroo": "袋鼠",
        "knife": "刀",
        "lion": "狮子",
        "lobster": "龙虾",
        "mouse": "老鼠",
        "mushroom": "蘑菇",
        "owl": "猫头鹰",
        "parrot": "鹦鹉",
        "pear": "梨",
        "penguin": "企鹅",
        "piano": "钢琴",
        "pickup truck": "皮卡",
        "pig": "猪",
        "pineapple": "菠萝",
        "pizza": "披萨",
        "rabbit": "兔子",
        "raccoon": "浣熊",
        "rhinoceros": "犀牛",
        "rifle": "步枪",
        "sailboat": "帆船",
        "saw": "锯子",
        "saxophone": "萨克斯管",
        "scissors": "剪刀",
        "scorpion": "蝎子",
        "shark": "鲨鱼",
        "sheep": "绵羊",
        "shoe": "鞋",
        "skyscraper": "摩天楼",
        "snail": "蜗牛",
        "snake": "蛇",
        "spider": "蜘蛛",
        "spoon": "勺子",
        "squirrel": "松鼠",
        "strawberry": "草莓",
        "swan": "天鹅",
        "sword": "剑",
        "table": "桌子",
        "teapot": "茶壶",
        "teddy bear": "泰迪熊",
        "tiger": "老虎",
        "tree": "树",
        "trumpet": "小号",
        "turtle": "乌龟",
        "umbrella": "雨伞",
        "violin": "小提琴",
        "windmill": "风车",
        "zebra": "斑马"
      }[label] || label;
    }
    constructor() {
      super(...arguments);
      this.debug = this.constructor.debug;
      this.active = new ReactiveField(false);
      this._wasActive = false;
      this.revealed = new ReactiveField(false);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
      this.contentHeight = new ReactiveField(0);
      this.bitmap = new ComputedField(() => {
        var ref;
        return (ref = this.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0;
      });
      this.bitmapObject = new ComputedField(() => {
        return this.bitmap();
      }, (a, b) => {
        return a === b;
      });
      this.asset = new ComputedField(() => {
        return this.interface.parent.activeAsset();
      }, (a, b) => {
        return a === b;
      });
      this.readabilityAnalysis = new ComputedField(() => {
        var asset, bitmap, ref;
        if ((ref = this._readabilityAnalysis) != null) {
          ref.destroy();
        }
        if (!(asset = this.asset())) {
          return;
        }

        // Try to reuse the readability analysis instance from the asset.
        if (asset.initialized) {
          if (!asset.initialized()) {
            return;
          }
          if (asset.readabilityAnalysisInstance) {
            this._readabilityAnalysis = null;
            return asset.readabilityAnalysisInstance();
          }
        }
        if (!(bitmap = this.bitmapObject())) {
          return;
        }
        return this._readabilityAnalysis = Tracker.nonreactive(() => {
          return new RA(bitmap);
        });
      });
      this.hoveredPixel = new ComputedField(() => {
        var pixelCanvas;
        pixelCanvas = this.interface.getEditorForActiveFile();
        return pixelCanvas.pointer().pixelCoordinate();
      });

      // Due to animation, the analysis paper is fully displayed a second after it's activated.
      this.displayed = new ReactiveField(false);
      this.autorun(computation => {
        var active;
        active = this.active();
        if (active) {
          return this._displayedTimeout = Meteor.setTimeout(() => {
            return this.displayed(true);
          }, 1000);
        } else {
          Meteor.clearTimeout(this._displayedTimeout);
          return this.displayed(false);
        }
      });
      this.readabilityAnalysisProperty = new ComputedField(() => {
        var ref, ref1;
        return (ref = this.bitmap()) != null ? (ref1 = ref.properties) != null ? ref1.readabilityAnalysis : void 0 : void 0;
      });
      this.engineComponent = new RA.EngineComponent({
        readabilityAnalysis: () => {
          var readabilityAnalysis;
          if (!(readabilityAnalysis = this.readabilityAnalysis())) {
            return;
          }
          readabilityAnalysis.depend();
          return readabilityAnalysis;
        }
      });

      // Automatically enter focused mode when active.
      this.autorun(computation => {
        return this.desktop.focusedMode(this.active());
      });

      // Automatically deactivate when exiting focused mode.
      this.autorun(computation => {
        if (this.desktop.focusedMode()) {
          return;
        }
        this.deactivate();

        // Deactivate the analyze tool to restore the previous one.
        return Tracker.nonreactive(() => {
          return this.interface.deactivateTool();
        });
      });

      // Update analysis where requested.
      this.readabilityAnalysisShouldBePerformed = new ComputedField(() => {
        return this.readabilityAnalysisProperty() != null;
      });
      this.recognition = new ReactiveField(null);

      // Store that the analysis was revealed on the document.
      // We do this non-versioned so that undo/redo doesn't change it.
      this.autorun(computation => {
        var bitmap, readabilityAnalysis, ref, ref1, update;
        if (!(bitmap = (ref = this.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0)) {
          return;
        }
        if (!(readabilityAnalysis = (ref1 = bitmap.properties) != null ? ref1.readabilityAnalysis : void 0)) {
          return;
        }
        update = {
          $set: {
            lastEditTime: new Date()
          }
        };
        if (this.revealed() && readabilityAnalysis.passes != null && !readabilityAnalysis.revealed) {
          _.extend(update.$set, {
            'properties.readabilityAnalysis.revealed': true
          });
        } else if (readabilityAnalysis.revealed && readabilityAnalysis.passes == null) {
          update.$unset = {
            'properties.readabilityAnalysis.revealed': true
          };
        } else {
          return;
        }
        return Tracker.nonreactive(() => {
          LOI.Assets.Bitmap.documents.update(bitmap._id, update);

          // Trigger reactivity.
          return LOI.Assets.Bitmap.versionedDocuments.reportNonVersionedChange(bitmap._id);
        });
      });
      return this.autorun(computation => {
        var readabilityAnalysis;
        if (!this.readabilityAnalysisShouldBePerformed()) {
          return;
        }
        if (!(readabilityAnalysis = this.readabilityAnalysis())) {
          return;
        }
        readabilityAnalysis.depend();
        if (!readabilityAnalysis.regions) {
          return;
        }
        return Tracker.nonreactive(() => {
          var asset, classifierName, criteriaPasses, historyLength, i, j, k, labelProbabilities, labelProbability, len, len1, len2, propertyLabelProbabilities, readabilityAnalysisProperty, recognition, ref, ref1, ref2, ref3, ref4, ref5, region, regionAnalysis, regionIndex, regionRecognition, updatePropertyAction;
          // Generate a report with probability percentages of 1% or more.
          readabilityAnalysisProperty = {};
          recognition = null;
          if (readabilityAnalysis.regions.length) {
            readabilityAnalysisProperty.regions = [];
            ref = readabilityAnalysis.regions;
            for (regionIndex = i = 0, len = ref.length; i < len; regionIndex = ++i) {
              region = ref[regionIndex];
              regionAnalysis = _.pick(region, 'targetLabel', 'bounds');
              readabilityAnalysisProperty.regions[regionIndex] = regionAnalysis;
              if (region.labels) {
                regionAnalysis.labels = {};
                ref1 = region.labels;
                for (classifierName in ref1) {
                  labelProbabilities = ref1[classifierName];
                  propertyLabelProbabilities = [];
                  regionAnalysis.labels[classifierName] = propertyLabelProbabilities;
                  for (j = 0, len1 = labelProbabilities.length; j < len1; j++) {
                    labelProbability = labelProbabilities[j];
                    if (labelProbability.probability >= 0.01) {
                      propertyLabelProbabilities.push({
                        label: labelProbability.label,
                        probabilityPercentage: Math.round(labelProbability.probability * 100)
                      });
                    }
                  }
                }
              }
            }

            // Run the analysis criteria.
            recognition = [];
            ref2 = readabilityAnalysisProperty.regions;
            for (regionIndex = k = 0, len2 = ref2.length; k < len2; regionIndex = ++k) {
              region = ref2[regionIndex];
              regionRecognition = this._regionRecognitionResult(region, region.bounds || readabilityAnalysis.bitmap.bounds);
              recognition.push(regionRecognition);
              if (regionRecognition) {
                region.recognition = {
                  passes: regionRecognition.passes
                };
              }

              // See if all criteria pass. If any of them are not set, we can't pass or fail yet.
              criteriaPasses = [(ref3 = region.recognition) != null ? ref3.passes : void 0];
              if (_.every(criteriaPasses, criterionPasses => {
                return criterionPasses != null;
              })) {
                region.passes = _.every(criteriaPasses);
              }
            }

            // See if all regions pass. If any of them are not set, we can't pass or fail yet.
            if (_.every(readabilityAnalysisProperty.regions, region => {
              return region.passes != null;
            })) {
              readabilityAnalysisProperty.passes = _.every(readabilityAnalysisProperty.regions, region => {
                return region.passes;
              });
            }
          }

          // Store analysis responses for output.
          this.recognition(recognition);

          // See if there was any change from the current data.
          asset = (ref4 = this.interface.getLoaderForActiveFile()) != null ? ref4.asset() : void 0;
          if (asset.properties.readabilityAnalysis.revealed) {
            readabilityAnalysisProperty.revealed = asset.properties.readabilityAnalysis.revealed;
          }
          if (EJSON.equals(asset.properties.readabilityAnalysis, readabilityAnalysisProperty)) {
            return;
          }

          // Only update analysis when we're at the end of history to prevent recalculation when undoing/redoing
          // (in case we change analysis and this would cause new values—history is more important).
          historyLength = ((ref5 = asset.history) != null ? ref5.length : void 0) || AMu.Document.Versioning.ActionArchive.getHistoryLengthForDocument(asset._id);
          if (asset.historyPosition !== historyLength) {
            return;
          }
          updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.constructor.id(), asset, 'readabilityAnalysis', readabilityAnalysisProperty);
          return asset.executeAction(updatePropertyAction, true);
        });
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.autorun(async computation => {
        var ref;
        if ((ref = this._resizeObserver) != null) {
          ref.disconnect();
        }
        if (!this.paperDisplayed()) {
          return;
        }
        await _.waitForFlush();
        this.$content = this.$('.content');
        this._resizeObserver = new ResizeObserver(() => {
          return this.contentHeight(this.$content.outerHeight() / LOI.adventure.interface.display.scale());
        });
        return this._resizeObserver.observe(this.$content[0]);
      });
    }
    onDestroyed() {
      var ref, ref1;
      super.onDestroyed(...arguments);
      if ((ref = this._resizeObserver) != null) {
        ref.disconnect();
      }
      if ((ref1 = this._readabilityAnalysis) != null) {
        ref1.destroy();
      }
      return this.readabilityAnalysis.stop();
    }
    editorDrawComponents() {
      return [this.engineComponent];
    }
    activate() {
      return this._changeActive(true);
    }
    deactivate() {
      return this._changeActive(false);
    }
    _changeActive(value) {
      this.active(value);
      if (value === this._wasActive) {
        return;
      }
      this._wasActive = value;
      if (!this.isRendered()) {
        return;
      }
      if (value) {
        this.audio.open();
        Meteor.setTimeout(() => {
          return this.revealed(true);
        }, 1000);
      } else {
        this.audio.close();
        this.revealed(false);
      }
      return Tracker.nonreactive(() => {
        var camera, editor, origin, originDataField, originDeltaY, paperHeight, scale;
        editor = this.interface.getEditorForActiveFile();
        camera = editor.camera();
        scale = camera.effectiveScale();
        paperHeight = this.$('.paper').height() / scale;
        originDeltaY = paperHeight / 2;
        if (!value) {
          originDeltaY *= -1;
        }
        originDataField = camera.originData();
        origin = originDataField.value();
        return camera.translateTo({
          x: origin.x,
          y: origin.y + originDeltaY
        }, 1);
      });
    }
    activeClass() {
      if (this.active()) {
        return 'active';
      }
    }
    revealedClass() {
      if (this.revealed()) {
        return 'revealed';
      }
    }
    paperDisplayed() {
      // Display the paper if the property is defined.
      return this.readabilityAnalysisProperty();
    }
    contentPlaceholderStyle() {
      return {
        height: "".concat(this.contentHeight(), "rem")
      };
    }
    pixeltoshClass() {
      var readabilityAnalysisProperty;
      if (!(readabilityAnalysisProperty = this.readabilityAnalysisProperty())) {
        return;
      }
      if (!readabilityAnalysisProperty.revealed) {
        return;
      }
      if (readabilityAnalysisProperty.passes) {
        return 'passes';
      } else {
        return 'fails';
      }
    }
    regions() {
      var classifierName, i, labelProbabilities, len, recognition, ref, region, regionIndex, regions, results;
      if (!(regions = (ref = this.readabilityAnalysisProperty()) != null ? ref.regions : void 0)) {
        return;
      }
      if (!(recognition = this.recognition())) {
        return;
      }
      results = [];
      for (regionIndex = i = 0, len = regions.length; i < len; regionIndex = ++i) {
        region = regions[regionIndex];
        results.push(_.extend({}, region, {
          index: regionIndex,
          number: regionIndex + 1,
          label: this.constructor.localizedLabel(region.targetLabel),
          recognition: recognition[regionIndex],
          classifierResults: function () {
            var ref1, results1;
            ref1 = region.labels;
            results1 = [];
            for (classifierName in ref1) {
              labelProbabilities = ref1[classifierName];
              results1.push({
                classifierName,
                labelProbabilities: labelProbabilities.slice(0, 5)
              });
            }
            return results1;
          }()
        }));
      }
      return results;
    }
    resultPassesClass(result) {
      if (result != null ? result.passes : void 0) {
        return 'passes';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .paper': this.onClickPaper,
        'pointerenter .paper': this.onPointerEnterPaper,
        'pointerleave .paper': this.onPointerLeavePaper
      });
    }
    onClickPaper(event) {
      if (this.active()) {
        return;
      }
      return this.activate();
    }
    onPointerEnterPaper(event) {
      if (this.active()) {
        return;
      }
      this.audio.lift();
      return this._liftTime = Date.now();
    }
    onPointerLeavePaper(event) {
      if (this.active()) {
        return;
      }
      if (Date.now() - this._liftTime > 100) {
        return this.audio.release();
      }
    }
  }
  ;
  ReadabilityAnalysis.register(ReadabilityAnalysis.id());
  ReadabilityAnalysis.debug = false;
  ReadabilityAnalysis.Audio = new LOI.Assets.Audio.Namespace(ReadabilityAnalysis.id(), {
    // Loaded from the PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop namespace.
    subNamespace: true,
    variables: {
      lift: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      release: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      open: AEc.ValueTypes.Trigger,
      close: AEc.ValueTypes.Trigger
    }
  });
  return ReadabilityAnalysis;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.readabilityanalysis.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/readabilityanalysis/template.readabilityanalysi //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-readabilityanalysis table-item ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("revealedClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("paperDisplayed"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "paper"
    }, HTML.Raw('\n        <div class="sheet"></div>\n        '), HTML.DIV(HTML.Attrs({
      class: "content-placeholder"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentPlaceholderStyle"));
    })), "\n        ", HTML.DIV({
      class: "content"
    }, "\n          ", HTML.DIV({
      class: "header"
    }, "\n            ", HTML.DIV({
      class: function() {
        return [ "pixeltosh ", Spacebars.mustache(view.lookup("pixeltoshClass")) ];
      }
    }), HTML.Raw('\n            <div class="title">Pixeltosh 可读性分析</div>\n          ')), "\n          ", HTML.DIV({
      class: "analysis"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("regions"), "length"));
    }, function() {
      return [ "\n              ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("regions"));
      }, function() {
        return [ "\n                ", HTML.DIV({
          class: "region"
        }, "\n                  ", HTML.DIV({
          class: "image"
        }, "\n                    ", HTML.SPAN({
          class: "title"
        }, "图像 ", Blaze.View("lookup:number", function() {
          return Spacebars.mustache(view.lookup("number"));
        })), "：", Blaze.View("lookup:label", function() {
          return Spacebars.mustache(view.lookup("label"));
        }), "\n                  "), "\n                  ", Spacebars.With(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("."), "recognition"));
        }, function() {
          return [ "\n                    ", HTML.DIV({
            class: function() {
              return [ "recognition result ", Spacebars.mustache(view.lookup("resultPassesClass"), view.lookup(".")) ];
            }
          }, "\n                      ", HTML.DIV({
            class: "summary"
          }, HTML.Raw('\n                        <span class="title">识别</span>: '), Blaze.View("lookup:summary", function() {
            return Spacebars.mustache(view.lookup("summary"));
          }), "\n                      "), "\n                      ", HTML.DIV({
            class: "exlpanation"
          }, "\n                        ", Blaze.View("lookup:explanation", function() {
            return Spacebars.mustache(view.lookup("explanation"));
          }), "\n                      "), "\n                    "), "\n                  " ];
        }, function() {
          return HTML.Raw('\n                    <div class="result">绘制主题以查看其可读性分析。</div>\n                  ');
        }), "\n                  ", Blaze.If(function() {
          return Spacebars.call(view.lookup("debug"));
        }, function() {
          return [ "\n                    ", HTML.DIV({
            class: "classification"
          }, "\n                      ", Blaze.Each(function() {
            return Spacebars.call(view.lookup("classifierResults"));
          }, function() {
            return [ "\n                        ", HTML.DIV({
              class: "classifier"
            }, "\n                          ", HTML.DIV({
              class: "name"
            }, Blaze.View("lookup:classifierName", function() {
              return Spacebars.mustache(view.lookup("classifierName"));
            }), " classifier"), "\n                          ", HTML.OL({
              class: "labels"
            }, "\n                            ", Blaze.Each(function() {
              return Spacebars.call(view.lookup("labelProbabilities"));
            }, function() {
              return [ "\n                              ", HTML.LI(Blaze.View("lookup:label", function() {
                return Spacebars.mustache(view.lookup("label"));
              }), ": ", Blaze.View("lookup:probabilityPercentage", function() {
                return Spacebars.mustache(view.lookup("probabilityPercentage"));
              }), "%"), "\n                            " ];
            }), "\n                          "), "\n                        "), "\n                      " ];
          }), "\n                    "), "\n                  " ];
        }), "\n                "), "\n              " ];
      }), "\n            " ];
    }, function() {
      return HTML.Raw('\n              <div class="result">决定您想绘制哪些主题以查看其可读性分析。</div>\n            ');
    }), "\n          "), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"readabilityanalysis-regionrecognitionresult.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/readabilityanalysis/readabilityanalysis-regionr //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  PAA,
  RA,
  indexOf = [].indexOf;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
RA = PAA.Practice.ReadabilityAnalysis;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis.prototype._regionRecognitionResult = function (region, bounds) {
  var adaptiveThreshold, adequateResult, bestOtherLabelProbabilities, bothFailingThreshold, checkIndex, checkLabel, clampedDrawingSize, classifierName, confidenceThreshold, copula, demonstrative, drawingSize, drawingSizeWeight, goodResult, greatResult, hasTopPlacement, highestDifference, highestOtherLabelProbabilities, i, labelProbabilities, labelProbability, labelString, len, otherIndex, perfectResult, poorResult, problematicResult, realisticDifference, realisticTopPlacement, ref, ref1, ref2, ref3, ref4, ref5, symbolicDifference, symbolicTopPlacement, targetProbabilityPercentage, targetProbabilityPercentages, unconfidentResult, unrecognizableExplanation;
  if (!region.labels) {
    return;
  }
  labelString = this.constructor.localizedLabel(region.targetLabel);

  // Create recognition results.
  perfectResult = {
    passes: true,
    summary: "完美",
    explanation: "毫无疑问，这是".concat(labelString, "。")
  };
  greatResult = {
    passes: true,
    summary: "优秀",
    explanation: "可以轻松识别为".concat(labelString, "。")
  };
  goodResult = {
    passes: true,
    summary: "良好",
    explanation: "这很可能是".concat(labelString, "。")
  };
  adequateResult = {
    passes: true,
    summary: "尚可",
    explanation: "这可能是".concat(labelString, "。")
  };

  // For results that don't pass, try to create some useful feedback, based on probabilities of other labels.

  // Determine target label probability, by classifier.
  targetProbabilityPercentages = {};
  ref1 = region.labels;
  for (classifierName in ref1) {
    labelProbabilities = ref1[classifierName];
    targetProbabilityPercentage = _.find(labelProbabilities, labelProbability => {
      return labelProbability.label === region.targetLabel;
    });
    targetProbabilityPercentages[classifierName] = (targetProbabilityPercentage != null ? targetProbabilityPercentage.probabilityPercentage : void 0) || 0;
  }

  // Determine highest probability from other labels, by classifier.
  highestOtherLabelProbabilities = {};
  ref2 = region.labels;
  for (classifierName in ref2) {
    labelProbabilities = ref2[classifierName];
    highestOtherLabelProbabilities[classifierName] = _.find(labelProbabilities, labelProbability => {
      return labelProbability.label !== region.targetLabel;
    });
  }

  // Determine joint probability of other labels (with realistic having 60% value compared to the symbolic).
  bestOtherLabelProbabilities = [...region.labels.symbolic];
  ref3 = region.labels.realistic;
  for (i = 0, len = ref3.length; i < len; i++) {
    labelProbability = ref3[i];
    bestOtherLabelProbabilities.push({
      label: labelProbability.label,
      probabilityPercentage: labelProbability.probabilityPercentage * 0.6
    });
  }

  // Sort from best to worst.
  bestOtherLabelProbabilities.sort((a, b) => {
    return b.probabilityPercentage - a.probabilityPercentage;
  });

  // Remove the worst of the symbolic/realistic pair.
  checkIndex = 0;
  while (checkIndex < bestOtherLabelProbabilities.length) {
    checkLabel = bestOtherLabelProbabilities[checkIndex].label;
    otherIndex = _.findIndex(bestOtherLabelProbabilities.slice(checkIndex + 1), labelProbability => {
      return labelProbability.label === checkLabel;
    });
    if (otherIndex >= 0) {
      bestOtherLabelProbabilities.splice(checkIndex + 1 + otherIndex, 1);
    }
    checkIndex++;
  }

  // Remove the target labels.
  _.remove(bestOtherLabelProbabilities, labelProbability => {
    return labelProbability.label === region.targetLabel;
  });

  // Certain thresholds depend on the size of the drawing since
  // smaller drawings are harder to draw and should be more forgiving.
  drawingSize = Math.min(bounds.width, bounds.height);
  clampedDrawingSize = _.clamp(drawingSize, 8, 16);
  drawingSizeWeight = THREE.MathUtils.inverseLerp(8, 16, clampedDrawingSize);
  adaptiveThreshold = (threshold8, threshold16) => {
    return THREE.MathUtils.lerp(threshold8, threshold16, drawingSizeWeight);
  };

  // Use the best other list to determine which other labels this drawing could be confused with, if their (weighted)
  // percentage is high enough. At smaller sizes, we want the system to have to be more confident since it's much
  // easier to misinterpret things.
  confidenceThreshold = adaptiveThreshold(90, 50);
  if (bestOtherLabelProbabilities.length >= 2 && bestOtherLabelProbabilities[1].probabilityPercentage > confidenceThreshold) {
    unrecognizableExplanation = "这可能会与".concat(this.constructor.localizedLabel(bestOtherLabelProbabilities[0].label), "或").concat(this.constructor.localizedLabel(bestOtherLabelProbabilities[1].label), "混淆。");
  } else if (bestOtherLabelProbabilities.length >= 1 && bestOtherLabelProbabilities[0].probabilityPercentage > confidenceThreshold) {
    unrecognizableExplanation = "这可能会与".concat(this.constructor.localizedLabel(bestOtherLabelProbabilities[0].label), "混淆。");
  } else {
    unrecognizableExplanation = "请添加更多细节，以便区分主体。";
    unconfidentResult = true;
  }
  if (drawingSize >= 16 || !unconfidentResult) {
    poorResult = {
      passes: false,
      summary: "较差",
      explanation: unrecognizableExplanation
    };
    problematicResult = {
      passes: false,
      summary: "有问题",
      explanation: unrecognizableExplanation
    };
  } else {
    poorResult = {
      passes: false,
      summary: "无法判断",
      explanation: "图像尺寸太小，我难以辨认主体。"
    };
    problematicResult = poorResult;
  }
  bothFailingThreshold = adaptiveThreshold(1, 10);

  // If both classifiers recognize the subject, this gives good–perfect results.
  if (targetProbabilityPercentages.symbolic >= 95 && targetProbabilityPercentages.realistic >= 95) {
    if (this.debug) {
      console.log("Perfect probability:", targetProbabilityPercentages.symbolic, targetProbabilityPercentages.realistic, ">= 95");
    }
    return perfectResult;
  } else if (targetProbabilityPercentages.symbolic >= 85 && targetProbabilityPercentages.realistic >= 85) {
    if (this.debug) {
      console.log("Great probability:", targetProbabilityPercentages.symbolic, targetProbabilityPercentages.realistic, ">= 85");
    }
    return greatResult;
  } else if (targetProbabilityPercentages.symbolic >= 75 && targetProbabilityPercentages.realistic >= 75) {
    if (this.debug) {
      console.log("Good probability:", targetProbabilityPercentages.symbolic, targetProbabilityPercentages.realistic, ">= 75");
    }
    return goodResult;

    // If both classifiers fail to recognize the subject, we do not pass recognition.
  } else if (targetProbabilityPercentages.symbolic < bothFailingThreshold && targetProbabilityPercentages.realistic < bothFailingThreshold) {
    if (this.debug) {
      console.log("No classifier sees the subject.");
    }
    return problematicResult;
  }

  // If the realistic classifier can at least vaguely recognize the subject, the symbolic one can give good results.
  if (targetProbabilityPercentages.realistic >= 10 && targetProbabilityPercentages.symbolic >= adaptiveThreshold(50, 95)) {
    if (this.debug) {
      console.log("Realistic poor, but symbolic good:", targetProbabilityPercentages.symbolic, targetProbabilityPercentages.realistic, ">=", adaptiveThreshold(50, 95));
    }
    return goodResult;
  }

  // None of the classifiers recognized the subject confidently (75% or more),
  // so see if one of them has a big enough margin to the best of the other labels.
  symbolicDifference = targetProbabilityPercentages.symbolic - (((ref4 = highestOtherLabelProbabilities.symbolic) != null ? ref4.probabilityPercentage : void 0) || 0);
  realisticDifference = targetProbabilityPercentages.realistic - (((ref5 = highestOtherLabelProbabilities.realistic) != null ? ref5.probabilityPercentage : void 0) || 0);
  highestDifference = Math.max(symbolicDifference, realisticDifference);

  // If both classifiers recognized the subject as the most probable, this is good.
  if (symbolicDifference > 0 && realisticDifference > 0) {
    if (this.debug) {
      console.log("1st place in both symbolic and realistic:", symbolicDifference, realisticDifference);
    }
    return goodResult;
  }

  // Big enough margin gives adequate–good results.
  if (highestDifference >= adaptiveThreshold(20, 50)) {
    if (this.debug) {
      console.log("1st place difference is big:", symbolicDifference, realisticDifference, ">=", adaptiveThreshold(20, 50));
    }
    return goodResult;
  } else if (highestDifference >= adaptiveThreshold(10, 25)) {
    if (this.debug) {
      console.log("1st place difference is medium:", symbolicDifference, realisticDifference, ">=", adaptiveThreshold(10, 25));
    }
    return adequateResult;
    // If at least one of the classifiers recognized the subject, this is adequate.
  } else if (symbolicDifference > 0 || realisticDifference > 0) {
    if (this.debug) {
      console.log("1st place difference exists:", symbolicDifference, realisticDifference, ">= 0");
    }
    return adequateResult;
  }

  // If the realistic classifier can recognize the subject, the symbolic one can give adequate results.
  if (targetProbabilityPercentages.realistic >= 1 && targetProbabilityPercentages.symbolic >= adaptiveThreshold(30, 75)) {
    if (this.debug) {
      console.log("Realistic exists, but symbolic is enough:", targetProbabilityPercentages.symbolic, targetProbabilityPercentages.realistic, adaptiveThreshold(30, 75));
    }
    return adequateResult;
  }

  // At small sizes, if at least one of the classifiers shows any probability for the target, this is adequate. We lower
  // the threshold as the probabilities become more specific, meaning, we need 2% if only 2 things are recognized, 3% if
  // 3, 4% if 4, etc.
  if (targetProbabilityPercentages.symbolic >= adaptiveThreshold(region.labels.symbolic.length, 50)) {
    if (this.debug) {
      console.log("Symbolic is probable enough:", targetProbabilityPercentages.symbolic, ">=", adaptiveThreshold(region.labels.symbolic.length, 50));
    }
    return adequateResult;
  }
  if (targetProbabilityPercentages.realistic >= adaptiveThreshold(region.labels.realistic.length, 50)) {
    if (this.debug) {
      console.log("Realistic is probable enough:", targetProbabilityPercentages.realistic, ">=", adaptiveThreshold(region.labels.realistic.length, 50));
    }
    return adequateResult;
  }

  // At small sizes, if the target is in one of the top spots, that is adequate.
  // Top 4 spots when 5 things are recognized, top 2 stops when 10, top 1 when 15.
  hasTopPlacement = labels => {
    var minimumPlace8, targetPlacement, targetPlacementIndex;
    minimumPlace8 = Math.max(1, Math.floor(4 - labels.length / 5));
    targetPlacementIndex = _.findIndex(labels, labelProbability => {
      return labelProbability.label === region.targetLabel;
    });
    if (!(targetPlacementIndex >= 0)) {
      return;
    }
    targetPlacement = targetPlacementIndex + 1;
    if (!(targetPlacement <= adaptiveThreshold(minimumPlace8, 1))) {
      return;
    }
    return {
      placement: targetPlacement,
      required: adaptiveThreshold(minimumPlace8, 1)
    };
  };
  if (symbolicTopPlacement = hasTopPlacement(region.labels.symbolic)) {
    if (this.debug) {
      console.log("Realistic placement in top", symbolicTopPlacement.required, "at", symbolicTopPlacement.placement);
    }
    return adequateResult;
  }
  if (realisticTopPlacement = hasTopPlacement(region.labels.realistic)) {
    if (this.debug) {
      console.log("Realistic placement in top", realisticTopPlacement.required, "at", realisticTopPlacement.placement);
    }
    return adequateResult;
  }
  if (this.debug) {
    // None of the classifiers recognized the subject as the most likely, so don't pass recognition.
    console.log("Probability is not high enough for positive classification.", targetProbabilityPercentages.symbolic, "<", adaptiveThreshold(region.labels.symbolic.length, 50), targetProbabilityPercentages.realistic, "<", adaptiveThreshold(region.labels.realistic.length, 50));
  }
  return poorResult;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"references":{"references.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/references.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, FM, LOI, PAA;
AM = Artificial.Mirage;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References = function () {
  class References extends FM.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
      return this.displayComponent = new PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent({
        assetData: () => {
          var ref;
          return (ref = this.interface.getLoaderForActiveFile()) != null ? ref.asset() : void 0;
        },
        editorActive: () => {
          return this.desktop.active();
        },
        editorSize: () => {
          return this.desktop.drawing.os.pixelPad.size();
        },
        assetOptions: () => {
          var ref, ref1;
          return (ref = this.desktop.displayedAsset()) != null ? typeof ref.editorOptions === "function" ? (ref1 = ref.editorOptions()) != null ? ref1.references : void 0 : void 0 : void 0;
        },
        defaults: () => {
          var ref;
          return (ref = this.desktop.displayedAsset()) != null ? typeof ref.referenceDefaults === "function" ? ref.referenceDefaults() : void 0 : void 0;
        }
      });
    }
  }
  ;
  References.register(References.id());
  return References;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.references.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/template.references.js               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-desktop-references"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("displayComponent"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"displaycomponent":{"displaycomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/displaycomponent.co //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent = function () {
  class DisplayComponent extends LOI.Assets.Components.References {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.opened = new ReactiveField(false);
      this.hideActive = new ReactiveField(false);
      // The dragging reference should end up displayed if our tray is closed and hide is not active.
      this.autorun(computation => {
        return this.draggingDisplayed(!this.opened() && !this.hideActive());
      });
      // Close the tray when clicking outside of it.
      $(document).on('click.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references', event => {
        if ($(event.target).closest('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references').length) {
          return;
        }
        this.opened(false);
        // Return true so we don't interfere with other click events.
        return true;
      });

      // Drag references tray when opening and closing.
      Tracker.triggerOnDefinedChange(this.opened, () => {
        this.audio.referencesTrayDragLong();
        return this._lastAudioDragTime = Date.now();
      });

      // Drag references tray when about to hide a reference.
      return Tracker.triggerOnDefinedChange(this.hideActive, () => {
        this.audio.referencesTrayDragShort();
        return this._lastAudioDragTime = Date.now();
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references');
    }
    enabledClass() {
      if (this.enabled()) {
        return 'enabled';
      }
    }
    openedClass() {
      if (this.opened()) {
        return 'opened';
      }
    }
    hideActiveClass() {
      if (this.hideActive()) {
        return 'hide-active';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'pointerenter .stored-references': this.onPointerEnterStoredReferences,
        'pointerleave .stored-references': this.onPointerLeaveStoredReferences,
        'click .stored-references': this.onClickStoredReferences
      });
    }
    onPointerLeaveStoredReferences(event) {
      return this._trayDragTiny();
    }
    onPointerEnterStoredReferences(event) {
      return this._trayDragTiny();
    }
    _trayDragTiny() {
      // Only play audio when hovering over closed tray.
      if (this.opened() || this.hideActive()) {
        return;
      }

      // Don't play immediately after a different drag.
      if (Date.now() - this._lastAudioDragTime < 500) {
        return;
      }
      return this.audio.referencesTrayDragTiny();
    }
    onClickStoredReferences(event) {
      var $target, opened;
      $target = $(event.target);
      opened = this.opened();
      // Don't react to clicks on references to prevent opening on drag end.
      if ($target.closest('.reference').length) {
        return;
      }
      if (opened) {
        // Only react to clicks directly on the stored references.
        if ($target.closest('.actions').length) {
          return;
        }
      }
      return this.opened(!opened);
    }
  }
  ;
  DisplayComponent.register(DisplayComponent.id());
  DisplayComponent.Audio = new LOI.Assets.Audio.Namespace(DisplayComponent.id(), {
    // Loaded from the PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop namespace.
    subNamespace: true,
    variables: {
      referencesTrayDragLong: AEc.ValueTypes.Trigger,
      referencesTrayDragShort: AEc.ValueTypes.Trigger,
      referencesTrayDragTiny: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 50
      }
    }
  });
  return DisplayComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.displaycomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/template.displaycom //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent ", Spacebars.mustache(view.lookup("enabledClass")), " ", Spacebars.mustache(view.lookup("openedClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "stored-references table-item ", Spacebars.mustache(view.lookup("hideActiveClass")) ];
    }
  }, "\n      ", HTML.UL({
    class: "references"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("storedReferences"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: "reference"
    }, "\n            ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "References", "DisplayComponent", "ReferenceInsert"));
    }), "\n          "), "\n        " ];
  }), "\n      "), "\n      ", HTML.DIV({
    class: "actions"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("assetOptions"), "upload", "enabled"));
  }, function() {
    return HTML.Raw('\n          <div class="upload action">\n            <button class="upload-button button">上传</button>\n          </div>\n        ');
  }), "\n        \n      "), "\n    "), "\n    ", HTML.DIV({
    class: "displayed-references"
  }, "\n      ", HTML.UL({
    class: "references"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("displayedReferences"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: "reference"
    }, "\n            ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "References", "DisplayComponent", "ReferenceInsert"));
    }), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.ReferenceInsert");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.ReferenceInsert"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.ReferenceInsert", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("displayOptions"), "type"));
  }, function() {
    return [ "\n    ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("displayOptions"), "type"), "SceneObject");
    }, function() {
      return [ "\n      ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "References", "DisplayComponent", "Reference", "SceneObject"));
      }), "\n    " ];
    }), "\n    ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("displayOptions"), "type"), "Model");
    }, function() {
      return [ "\n      ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "References", "DisplayComponent", "Reference", "Model"));
      }), "\n    " ];
    }), "\n  " ];
  }, function() {
    return [ "\n    ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Drawing", "Editor", "Desktop", "References", "DisplayComponent", "Reference", "Default"));
    }), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reference":{"reference.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/reference //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AP, LOI, PAA, PADB;
AB = Artificial.Babel;
AM = Artificial.Mirage;
AP = Artificial.Program;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PADB = PixelArtDatabase;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference = class Reference extends LOI.Assets.Components.References.Reference {
  constructor() {
    super(...arguments);
    this.trayWidth = 165;
    this.trayHeight = 190;
    this.trayHideActiveHeight = 10;
    // We need 13 pixels clearance so the reference doesn't appear when hovering over the tray.
    this.trayBorder = 13;
    // This represent the border around the reference as visible to the player.
    this.referenceBorder = 4;
    // We increase the resizing width beyond the visual border to make it easier to resize.
    this.resizingBorder = 6;
  }
  onCreated() {
    super.onCreated(...arguments);
    // Subscribe to artworks for this reference.
    this.autorun(computation => {
      var ref, reference, url;
      if (!(reference = this.data())) {
        return;
      }
      if (!(url = (ref = reference.image) != null ? ref.url : void 0)) {
        return;
      }
      return PADB.Artwork.forUrl.subscribe(this, url);
    });
    // Automatically scale and position the image when not displayed.
    this.hiddenScale = new ReactiveField(null);
    this.hiddenPosition = new ReactiveField(null, EJSON.equals);
    this.autorun(computation => {
      var displaySize, halfHeight, halfWidth, hash, imageSize, initialPosition, maxHeight, maxWidth, maxX, maxY, position, randomX, randomY, ref, reference, scale;
      if (!(reference = this.data())) {
        return;
      }
      if (!this.references.assetId()) {
        return;
      }
      if (!(imageSize = this.imageSize())) {
        return;
      }
      if (this.currentDisplayed()) {
        Tracker.nonreactive(() => {
          this.hiddenScale(null);
          return this.hiddenPosition(null);
        });
        return;
      }
      // Scale should be such that 100^2 pixels are covered, but any side is not larger than the tray.
      maxWidth = this.trayWidth - (this.trayBorder + this.referenceBorder) * 2;
      maxHeight = this.trayHeight - (this.trayBorder + this.referenceBorder) * 2;
      scale = Math.min(100 / Math.sqrt(imageSize.width * imageSize.height), Math.min(maxWidth / imageSize.width, maxHeight / imageSize.height));
      Tracker.nonreactive(() => {
        return this.hiddenScale(scale);
      });
      if (!(displaySize = this.displaySize(scale))) {
        return;
      }

      // Make sure reference is within the tray.
      halfWidth = displaySize.width / 2 + this.referenceBorder;
      halfHeight = displaySize.height / 2 + this.referenceBorder;
      maxX = this.trayWidth / 2 - halfWidth - this.trayBorder;
      maxY = this.trayHeight / 2 - halfHeight - this.trayBorder;
      if (!(initialPosition = _.propertyValue(reference, 'position'))) {
        // Generate a stably-random position from the reference's url.
        hash = AP.HashFunctions.getObjectHash((ref = reference.image) != null ? ref.url : void 0, AP.HashFunctions.circularShift5);
        randomX = ((hash & 0xFF00) >> 8) / 0xFF;
        randomY = (hash & 0x00FF) / 0xFF;
        initialPosition = {
          x: maxX * (2 * randomX - 1),
          y: maxY * (2 * randomY - 1)
        };
      }
      position = {
        x: _.clamp(initialPosition.x, -maxX, maxX),
        y: _.clamp(initialPosition.y, -maxY, maxY)
      };
      return Tracker.nonreactive(() => {
        return this.hiddenPosition(position);
      });
    });
    this.autorun(computation => {
      var displayScale, displaySize, draggingPosition, halfHeight, halfWidth, referenceScale;
      if (!(draggingPosition = this.draggingPosition())) {
        return;
      }
      referenceScale = this.currentDisplayed() ? this.currentScale() : this.hiddenScale();
      if (!(displaySize = this.displaySize(referenceScale))) {
        return;
      }
      halfWidth = displaySize.width / 2;
      halfHeight = displaySize.height / 2;
      // Close references when moving outside the tray.
      if (this.references.opened() && Math.abs(draggingPosition.x) + halfWidth > this.trayWidth / 2 || Math.abs(draggingPosition.y) + halfHeight > this.trayHeight / 2) {
        this.references.opened(false);
      }
      // Activate hide mode when nearing tray.
      displayScale = this.display.scale();
      return this.references.hideActive(!this.references.opened() && Math.abs(draggingPosition.x) < this.trayWidth / 2 && draggingPosition.y + this.parentOffset.top / displayScale - halfHeight < this.trayHideActiveHeight);
    });
    return this.caption = new ComputedField(() => {
      var artwork, author, authors, elements, image, ref, ref1, reference, year;
      reference = this.data();
      if ((ref = reference.displayOptions) != null ? ref.imageOnly : void 0) {
        return;
      }
      // Find an artwork that matches this reference.
      if (!(image = reference.image)) {
        return;
      }
      if (!(artwork = PADB.Artwork.forUrl.query(image.url).fetch()[0])) {
        return;
      }
      // Format as Title, Authors, Year.
      elements = [];
      if (artwork.title) {
        elements.push(artwork.title);
      }
      authors = function () {
        var i, len, ref1, results;
        ref1 = artwork.authors;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          author = ref1[i];
          results.push(author.displayName);
        }
        return results;
      }();
      if (authors.length) {
        elements.push(AB.Rules.English.createNounSeries(authors));
      }
      if (_.isDate(artwork.completionDate)) {
        year = artwork.completionDate.getFullYear();
      } else {
        year = (ref1 = artwork.completionDate) != null ? ref1.year : void 0;
      }
      if (year) {
        elements.push(year);
      }
      return elements.join(', ');
    });
  }
  currentPosition() {
    var displaySize, editorSize, hiddenPosition, maxX, maxY, position;
    if (hiddenPosition = this.hiddenPosition()) {
      return hiddenPosition;
    }
    position = super.currentPosition(...arguments);
    if (!(displaySize = this.displaySize())) {
      // Don't allow the reference to go off screen. We ensure enough of it is left
      // on screen (70px) that it doesn't get covered by items like the calculator.
      return hiddenPosition;
    }
    editorSize = this.references.options.editorSize();
    maxX = editorSize.width / 2 + displaySize.width / 2 - 70;
    maxY = editorSize.height / 2 + displaySize.height / 2 - 70;
    return {
      x: _.clamp(position.x, -maxX, maxX),
      y: _.clamp(position.y, -maxY, maxY)
    };
  }
  displaySize(scale) {
    var captionHeight, imageSize;
    if (!(imageSize = this.imageSize())) {
      return;
    }
    if (scale == null) {
      scale = this.currentScale();
    }
    captionHeight = this.isRendered() && this.caption() ? 10 : 0;
    return {
      width: imageSize.width * scale,
      height: imageSize.height * scale + captionHeight
    };
  }
  endDrag() {
    this.startUpdate();
    if (this.references.draggingDisplayed() && !this.currentDisplayed()) {
      // When displaying a reference, also set its scale from its hidden default.
      this.setScale(this.hiddenScale());
    }
    super.endDrag(...arguments);
    return this.references.hideActive(false);
  }
  onPointerDown(event) {
    var $pixelPad, pixelPadOffset;
    super.onPointerDown(...arguments);
    if (event.which !== 1) {
      return;
    }
    if (!this.resizingDirection()) {
      // Parent offset will be relative to PixelPad viewport so we need to remove it.
      $pixelPad = $('.pixelartacademy-pixelpad-os').eq(0);
      pixelPadOffset = $pixelPad.offset();
      this.parentOffset.left -= pixelPadOffset.left;
      return this.parentOffset.top -= pixelPadOffset.top;
    }
  }
  onPointerMove(event) {
    // Don't allow resizing when not displayed.
    if (!this.currentDisplayed()) {
      return;
    }
    return super.onPointerMove(...arguments);
  }
  referenceStyle() {
    var currentDisplayed, displaySize, distance, halfHeight, halfWidth, position, ref, scale, style;
    currentDisplayed = this.currentDisplayed();
    if (currentDisplayed) {
      style = super.referenceStyle(...arguments);
    } else {
      style = this.hiddenReferenceStyle();
    }
    // Push assets apart when we're not editing an asset.
    if (currentDisplayed && !this.references.options.editorActive()) {
      position = new THREE.Vector2(parseFloat(style.left), parseFloat(style.top));
      distance = new THREE.Vector2(240, 180).length();
      scale = (ref = this.resizingScale()) != null ? ref : this.currentScale();
      if (displaySize = this.displaySize(scale)) {
        halfWidth = displaySize.width / 2;
        halfHeight = displaySize.height / 2;
        distance += new THREE.Vector2(halfWidth, halfHeight).length();
      }
      position.normalize().multiplyScalar(distance);
      style.left = "".concat(position.x - ((displaySize != null ? displaySize.width : void 0) || 0) / 2, "rem");
      style.top = "".concat(position.y - ((displaySize != null ? displaySize.height : void 0) || 0) / 2, "rem");
    }
    return style;
  }
  hiddenReferenceStyle() {
    var displayScale, displaySize, position, scale;
    scale = this.hiddenScale();
    if (!(displaySize = this.displaySize(scale))) {
      return {
        // We calculate the display size using the potentially hidden scale.
        display: 'none'
      };
    }
    if (position = this.draggingPosition()) {
      // Add parent offset since we expect positioned fixed.
      displayScale = this.display.scale();
      position = {
        x: this.parentOffset.left / displayScale + position.x,
        y: this.parentOffset.top / displayScale + position.y
      };
    } else {
      if (!(position = this.hiddenPosition())) {
        return;
      }
    }
    return {
      left: "".concat(position.x - displaySize.width / 2, "rem"),
      top: "".concat(position.y - displaySize.height / 2, "rem"),
      width: "".concat(displaySize.width, "rem"),
      height: "".concat(displaySize.height, "rem")
    };
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"default":{"default.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/default/d //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AP, LOI, PAA, PADB;
AB = Artificial.Babel;
AM = Artificial.Mirage;
AP = Artificial.Program;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PADB = PixelArtDatabase;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Default = function () {
  class Default extends PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Default';
    }
    imageOnlyClass() {
      var ref, reference;
      reference = this.data();
      if ((ref = reference.displayOptions) != null ? ref.imageOnly : void 0) {
        return 'image-only';
      }
    }
  }
  ;
  Default.register(Default.id());
  return Default;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.default.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/default/t //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Default");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Default"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Default", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-default ", Spacebars.mustache(view.lookup("draggingClass")), " ", Spacebars.mustache(view.lookup("resizingDirectionClass")), " ", Spacebars.mustache(view.lookup("imageOnlyClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("referenceStyle"));
  }), "\n    ", HTML.DIV({
    class: "movement"
  }, "\n      ", HTML.FIGURE({
    class: "figure"
  }, "\n        ", HTML.IMG({
    class: "image",
    src: function() {
      return Spacebars.mustache(view.lookup("imageSource"));
    }
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("caption"));
  }, function() {
    return [ "\n          ", HTML.FIGCAPTION({
      class: "caption"
    }, Blaze.View("lookup:caption", function() {
      return Spacebars.mustache(view.lookup("caption"));
    })), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"sceneobject":{"sceneobject.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/sceneobje //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AP, LOI, PAA, PADB;
AB = Artificial.Babel;
AM = Artificial.Mirage;
AP = Artificial.Program;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PADB = PixelArtDatabase;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject = function () {
  class SceneObject extends PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject';
    }
    constructor() {
      super(...arguments);

      // Scene object references can't be resized.
      this.resizingBorder = 0;
    }
    displaySize(scale) {
      var imageSize, ref, reference;
      if (!(imageSize = this.imageSize())) {
        return;
      }
      reference = this.data();
      scale = ((ref = reference.displayOptions) != null ? ref.scale : void 0) || 1;
      return {
        width: imageSize.width * scale,
        height: imageSize.height * scale
      };
    }
    referenceStyle() {
      var displaySize, style;
      if (!(displaySize = this.displaySize())) {
        return {
          display: 'none'
        };
      }
      style = super.referenceStyle(...arguments);
      style.width = "".concat(displaySize.width, "rem");
      style.height = "".concat(displaySize.height, "rem");
      return style;
    }
    customShadowClass() {
      var ref, reference;
      reference = this.data();
      if ((ref = reference.displayOptions) != null ? ref.shadow : void 0) {
        return 'custom-shadow';
      }
    }
  }
  ;
  SceneObject.register(SceneObject.id());
  return SceneObject;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.sceneobject.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/sceneobje //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-sceneobject ", Spacebars.mustache(view.lookup("draggingClass")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("displayOptions"), "styleClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("referenceStyle"));
  }), "\n    ", HTML.DIV({
    class: "movement"
  }, "\n      ", HTML.DIV({
    class: "shadow "
  }, HTML.Raw('\n        <div class="rest"></div>\n        '), HTML.DIV({
    class: "hover"
  }, HTML.Raw('\n          <div class="cast-shadow"></div>\n          '), HTML.IMG({
    class: "ambient-occlusion",
    src: function() {
      return Spacebars.mustache(view.lookup("imageSource"));
    }
  }), "\n        "), "\n      "), "\n      ", HTML.FIGURE({
    class: "figure"
  }, "\n        ", HTML.IMG({
    class: "image",
    src: function() {
      return Spacebars.mustache(view.lookup("imageSource"));
    }
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cartridge":{"cartridge.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/sceneobje //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AP, LOI, PAA, PADB;
AB = Artificial.Babel;
AM = Artificial.Mirage;
AP = Artificial.Program;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PADB = PixelArtDatabase;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject.Cartridge = function () {
  class Cartridge {}
  ;
  Cartridge.Types = {
    NES: "NES",
    GameBoy: "GameBoy",
    GameBoyAdvance: "GameBoyAdvance",
    CD: "CD",
    NeoGeoPocket: "NeoGeoPocket",
    FloppyDisk: "FloppyDisk",
    Genesis: "Genesis"
  };
  return Cartridge;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"model":{"model.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/mod //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AP, LOI, PAA, PADB;
AB = Artificial.Babel;
AM = Artificial.Mirage;
AP = Artificial.Program;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PADB = PixelArtDatabase;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model = function () {
  class Model extends PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model';
    }
    constructor() {
      super(...arguments);
      this.rendererManager = new ReactiveField(null);
      this.sceneManager = new ReactiveField(null);
      this.cameraManager = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.viewportSize = new ComputedField(() => {
        var displayScale, displaySize, resizingScale, scale;
        scale = this.currentScale();
        resizingScale = this.resizingScale();
        if (resizingScale != null) {
          scale = resizingScale;
        }

        // We calculate the display size using the potentially resizing scale.
        if (!(displaySize = this.displaySize(scale))) {
          return;
        }
        if (!(displaySize.width && displaySize.height)) {
          return;
        }
        displayScale = this.display.scale();
        return {
          width: displaySize.width * displayScale,
          height: displaySize.height * displayScale
        };
      });

      // Initialize components.
      this.sceneManager(new this.constructor.SceneManager(this));
      this.cameraManager(new this.constructor.CameraManager(this));
      this.rendererManager(new this.constructor.RendererManager(this));

      // Update image size from the reference.
      return this.autorun(() => {
        var ref;
        return this.imageSize(((ref = this.data().displayOptions) != null ? ref.imageSize : void 0) || {
          width: 1000,
          height: 1000
        });
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$('.viewport').append(this.rendererManager().renderer.domElement);

      // Start rendering after the canvas has been flushed to the DOM.
      return Tracker.afterFlush(() => {
        // Make sure the component didn't get destroyed in the mean time.
        if (this.isDestroyed()) {
          return;
        }
        return this.rendererManager().startRendering();
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      this.rendererManager().destroy();
      return this.sceneManager().destroy();
    }
    hasInput() {
      var ref;
      return (ref = this.data().displayOptions) != null ? ref.input : void 0;
    }
    horizontalInputAreaClass() {
      var input, ref;
      if (!(input = (ref = this.data().displayOptions) != null ? ref.input : void 0)) {
        return;
      }
      if (!(input.rotate || input.meshVisibility || input.meshMorphing.horizontal)) {
        return;
      }
      return 'horizontal';
    }
    verticalInputAreaClass() {
      var input, ref;
      if (!(input = (ref = this.data().displayOptions) != null ? ref.input : void 0)) {
        return;
      }
      if (!(input.rotate || input.meshVisibility || input.meshMorphing.vertical)) {
        return;
      }
      return 'vertical';
    }
    events() {
      return super.events(...arguments).concat({
        'wheel .input-area': this.onPointerWheelInputArea
      });
    }
    onPointerDown(event) {
      var input, ref;
      if (event.which !== 1) {
        return;
      }
      // Handle input.
      if (input = (ref = this.data().displayOptions) != null ? ref.input : void 0) {
        if ($(event.target).closest('.input-area').length) {
          if (input.rotate) {
            this.cameraManager().startRotateCamera(event);
            return;
          } else if (input.meshVisibility) {
            this.sceneManager().startAdjustMeshVisibility(event);
            return;
          } else if (input.meshMorphing) {
            this.sceneManager().startAdjustMeshMorphing(event, input.meshMorphing);
            return;
          }
        }
      }
      return super.onPointerDown(...arguments);
    }
    onPointerWheelInputArea(event) {
      var ref;
      if ((ref = this.data().displayOptions) != null ? ref.input.zoom : void 0) {
        return this.cameraManager().changeDistanceByFactor(Math.pow(1.005, event.originalEvent.deltaY));
      }
    }
  }
  ;
  Model.register(Model.id());
  return Model;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.model.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/tem //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model ", Spacebars.mustache(view.lookup("draggingClass")), " ", Spacebars.mustache(view.lookup("resizingDirectionClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("referenceStyle"));
  }), "\n    ", HTML.DIV({
    class: "movement"
  }, "\n      ", HTML.FIGURE({
    class: "figure"
  }, "\n        ", HTML.DIV({
    class: "viewport"
  }, "\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasInput"));
  }, function() {
    return [ "\n            ", HTML.DIV({
      class: function() {
        return [ "input-area ", Spacebars.mustache(view.lookup("horizontalInputAreaClass")), " ", Spacebars.mustache(view.lookup("verticalInputAreaClass")) ];
      }
    }), "\n          " ];
  }), "\n        "), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("caption"));
  }, function() {
    return [ "\n          ", HTML.FIGCAPTION({
      class: "caption"
    }, Blaze.View("lookup:caption", function() {
      return Spacebars.mustache(view.lookup("caption"));
    })), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cameramanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/cam //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model.CameraManager = function () {
  class CameraManager {
    constructor(reference) {
      this.reference = reference;
      this.camera = new AE.ReactiveWrapper(null);
      this._properties = new ReactiveField({
        azimuthalAngle: 0,
        polarAngle: 0,
        radialDistance: 1
      });

      // Update camera type and field of view from the reference.
      this.reference.autorun(() => {
        var bottom, camera, fieldOfView, frustum, left, ref, right, top, zFar, zNear;
        camera = (ref = this.reference.data().displayOptions) != null ? ref.camera : void 0;
        zNear = (camera != null ? camera.zNear : void 0) || 0.01;
        zFar = (camera != null ? camera.zFar : void 0) || 100;
        if (fieldOfView = camera != null ? camera.fieldOfView : void 0) {
          this._camera = new THREE.PerspectiveCamera(fieldOfView, 1, zNear, zFar);
        } else if (frustum = camera != null ? camera.frustum : void 0) {
          left = frustum.left || -frustum.width / 2;
          right = frustum.right || frustum.width / 2;
          top = frustum.top || frustum.height / 2;
          bottom = frustum.bottom || -frustum.height / 2;
          this._camera = new THREE.OrthographicCamera(left, right, top, bottom, zNear, zFar);
        } else {
          this._camera = null;
        }
        return this.camera(this._camera);
      });

      // Update camera aspect ratio when canvas size changes.
      this.reference.autorun(() => {
        var camera, viewportSize;
        if (!(camera = this.camera())) {
          return;
        }
        if (!(viewportSize = this.reference.viewportSize())) {
          return;
        }
        camera.aspect = viewportSize.width / viewportSize.height;
        camera.updateProjectionMatrix();
        return this.camera.updated();
      });

      // Update camera properties from the reference.
      this.reference.autorun(() => {
        var cameraData, properties, ref, ref1, ref2, ref3;
        if (!(cameraData = (ref = this.reference.data().displayOptions) != null ? ref.camera : void 0)) {
          return;
        }
        properties = Tracker.nonreactive(() => {
          return this._properties();
        });
        properties.azimuthalAngle = (ref1 = cameraData.azimuthalAngle) != null ? ref1 : 0;
        properties.polarAngle = (ref2 = cameraData.polarAngle) != null ? ref2 : 0;
        properties.radialDistance = (ref3 = cameraData.radialDistance) != null ? ref3 : 1;
        return this._properties(properties);
      });
      // Update camera position when properties change.
      this.reference.autorun(() => {
        var camera, properties;
        if (!(camera = this.camera())) {
          return;
        }
        properties = this._properties();
        camera.position.setFromSphericalCoords(properties.radialDistance, properties.polarAngle, properties.azimuthalAngle);

        // Update rotation to look at the center.
        camera.rotation.set(-Math.PI / 2 + properties.polarAngle, properties.azimuthalAngle, 0, 'YXZ');
        return this.camera.updated();
      });
    }
    startRotateCamera(event) {
      var startClientCoordinatesX, startClientCoordinatesY, startProperties;
      startClientCoordinatesX = event.clientX;
      startClientCoordinatesY = event.clientY;
      startProperties = _.clone(this._properties());

      // Wire movement of the mouse anywhere in the window.
      $(document).on('pointermove.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager', event => {
        var dragDeltaX, dragDeltaY, properties, scale;
        scale = this.reference.display.scale();
        dragDeltaX = (event.clientX - startClientCoordinatesX) / scale / this.constructor.fullRotationDelta;
        dragDeltaY = (event.clientY - startClientCoordinatesY) / scale / this.constructor.fullRotationDelta;
        // Only react to mouse coordinate changes.
        properties = this._properties();
        properties.azimuthalAngle = startProperties.azimuthalAngle - dragDeltaX * Math.PI * 2;
        properties.polarAngle = startProperties.polarAngle - dragDeltaY * Math.PI * 2;
        return this._properties(properties);
      });
      // Wire end of dragging on pointer up anywhere in the window.
      return $(document).on('pointerup.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager', () => {
        var properties;
        $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager');
        properties = this._properties();
        return this.reference.changeDisplayOptions({
          camera: {
            azimuthalAngle: properties.azimuthalAngle,
            polarAngle: properties.polarAngle
          }
        });
      });
    }
    changeDistanceByFactor(factor) {
      var properties;
      properties = this._properties();
      properties.radialDistance = _.clamp(properties.radialDistance * factor, 0.1, 10);
      this._properties(properties);
      if (this._debouncedRadialDistanceUpdate == null) {
        this._debouncedRadialDistanceUpdate = _.debounce(radialDistance => {
          return this.reference.changeDisplayOptions({
            camera: {
              radialDistance
            }
          });
        }, 1000);
      }
      return this._debouncedRadialDistanceUpdate(properties.radialDistance);
    }
  }
  ;
  CameraManager.fullRotationDelta = 50; // display pixels

  return CameraManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"scenemanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/sce //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, _size;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
_size = new THREE.Vector3();
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model.SceneManager = function () {
  class SceneManager {
    constructor(reference) {
      this.reference = reference;
      this._scene = new THREE.Scene();
      this._scene.manager = this;
      this.scene = new AE.ReactiveWrapper(this._scene);
      this._modelSceneDependency = new Tracker.Dependency();
      this.meshVisibilityProperties = new ReactiveField({
        amountVisible: 1,
        sizePreference: 0
      });
      this.meshMorphingProperties = new ReactiveField({});
      this.environmentTexture = new ReactiveField(null);
      // Minimize reactivity.
      this.imageUrl = new AE.LiveComputedField(() => {
        var ref;
        return (ref = this.reference.data()) != null ? ref.image.url : void 0;
      });
      this.environment = new AE.LiveComputedField(() => {
        var ref, ref1;
        return (ref = this.reference.data()) != null ? (ref1 = ref.displayOptions) != null ? ref1.environment : void 0 : void 0;
      }, EJSON.equals);
      this.background = new AE.LiveComputedField(() => {
        var ref, ref1;
        return (ref = this.reference.data()) != null ? (ref1 = ref.displayOptions) != null ? ref1.background : void 0 : void 0;
      }, EJSON.equals);
      this.meshVisibility = new AE.LiveComputedField(() => {
        var ref, ref1;
        return (ref = this.reference.data()) != null ? (ref1 = ref.displayOptions) != null ? ref1.meshVisibility : void 0 : void 0;
      }, EJSON.equals);

      // Update scene based on the reference url.
      this.reference.autorun(() => {
        var imageUrl;
        if (!(imageUrl = this.imageUrl())) {
          return;
        }
        return PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model.Loader.load(imageUrl, data => {
          if (this._modelScene) {
            this._scene.remove(this._modelScene);
          }
          this._modelScene = data.scene;
          this._scene.add(this._modelScene);
          this.scene.updated();
          return this._modelSceneDependency.changed();
        });
      });

      // Update mesh visibility properties from the reference.
      this.reference.autorun(() => {
        var meshVisibility, properties, ref, ref1;
        if (!(meshVisibility = this.meshVisibility())) {
          return;
        }
        properties = Tracker.nonreactive(() => {
          return this.meshVisibilityProperties();
        });
        properties.amountVisible = (ref = meshVisibility.amountVisible) != null ? ref : 1;
        properties.sizePreference = (ref1 = meshVisibility.sizePreference) != null ? ref1 : 0;
        return this.meshVisibilityProperties(properties);
      });

      // Update mesh visibility.
      this.reference.autorun(() => {
        var i, j, len, len1, meshIndex, meshVisibility, meshVisibilityProperties, orderedMesh, orderedMeshes, priorityWeight, sizeWeight, visibleCount;
        if (!(meshVisibility = this.meshVisibility())) {
          return;
        }
        this._modelSceneDependency.depend();
        meshVisibilityProperties = this.meshVisibilityProperties();

        // Collect all the meshes.
        orderedMeshes = [];
        this._scene.traverse(object => {
          var coordinate, include, size, sizeMeasurementAxes;
          if (!object.isMesh) {
            return;
          }
          object.geometry.computeBoundingBox();
          object.geometry.boundingBox.getSize(_size);
          sizeMeasurementAxes = meshVisibility.sizeMeasurementAxes || {
            x: true,
            y: true,
            z: true
          };
          size = 1;
          for (coordinate in sizeMeasurementAxes) {
            include = sizeMeasurementAxes[coordinate];
            if (include) {
              size *= _size[coordinate];
            }
          }
          return orderedMeshes.push({
            mesh: object,
            size: size,
            priorityOrder: orderedMeshes.length + 1
          });
        });
        orderedMeshes.sort((a, b) => {
          return b.size - a.size;
        });
        sizeWeight = meshVisibilityProperties.sizePreference;
        priorityWeight = 1 - sizeWeight;
        for (meshIndex = i = 0, len = orderedMeshes.length; i < len; meshIndex = ++i) {
          orderedMesh = orderedMeshes[meshIndex];
          orderedMesh.sizeOrder = meshIndex + 1;
          orderedMesh.weightedOrder = orderedMesh.priorityOrder * priorityWeight + orderedMesh.sizeOrder * sizeWeight;
        }
        orderedMeshes.sort((a, b) => {
          return a.weightedOrder - b.weightedOrder;
        });
        visibleCount = 1 + (orderedMeshes.length - 1) * meshVisibilityProperties.amountVisible;
        for (meshIndex = j = 0, len1 = orderedMeshes.length; j < len1; meshIndex = ++j) {
          orderedMesh = orderedMeshes[meshIndex];
          orderedMesh.mesh.visible = meshIndex < visibleCount;
        }
        return this.scene.updated();
      });

      // Update mesh morphing properties from the reference.
      this.reference.autorun(() => {
        var meshMorphing, properties, ref;
        if (!(meshMorphing = (ref = this.reference.data().displayOptions) != null ? ref.meshMorphing : void 0)) {
          return;
        }
        properties = Tracker.nonreactive(() => {
          return this.meshMorphingProperties();
        });
        _.extend(properties, meshMorphing);
        return this.meshMorphingProperties(properties);
      });

      // Update mesh morphing.
      this.reference.autorun(() => {
        var meshMorphingProperties;
        this._modelSceneDependency.depend();
        meshMorphingProperties = this.meshMorphingProperties();
        this._scene.traverse(object => {
          var morphInfluenceIndex, morphKey, ref;
          if (!object.isMesh) {
            return;
          }
          ref = object.morphTargetDictionary;
          for (morphKey in ref) {
            morphInfluenceIndex = ref[morphKey];
            if (meshMorphingProperties[morphKey] != null) {
              object.morphTargetInfluences[morphInfluenceIndex] = meshMorphingProperties[morphKey];
            }
          }
        });

        // Explicit return to avoid result collection.
        return this.scene.updated();
      });

      // Update environment.
      this.reference.autorun(() => {
        var cachedTexture, environmentUrl, ref;
        if (!(environmentUrl = (ref = this.environment()) != null ? ref.url : void 0)) {
          return;
        }
        if (cachedTexture = this.constructor._textureCache[environmentUrl]) {
          this.environmentTexture(cachedTexture);
          return;
        }
        return new THREE.HDRLoader().load(environmentUrl, texture => {
          var ref1;
          if ((ref1 = this._environmentTexture) != null) {
            ref1.dispose();
          }
          this._environmentTexture = texture;
          this._environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
          this._environmentTexture.magFilter = THREE.LinearFilter;
          this.constructor._textureCache[environmentUrl] = this._environmentTexture;
          return this.environmentTexture(this._environmentTexture);
        });
      });
      this.reference.autorun(() => {
        this._scene.environment = this.environmentTexture();
        return this.scene.updated();
      });
      this.reference.autorun(() => {
        var environmentRotation, ref;
        if (!(environmentRotation = (ref = this.environment()) != null ? ref.rotation : void 0)) {
          return;
        }
        this._scene.environmentRotation.set(environmentRotation.x || 0, environmentRotation.y || 0, environmentRotation.z || 0, environmentRotation.order);
        return this.scene.updated();
      });

      // Update background.
      this.reference.autorun(() => {
        var background;
        if (!(background = this.background())) {
          return;
        }
        if (background.color) {
          this._scene.background = new THREE.Color(background.color);
        } else if (background.environment) {
          this._scene.background = this.environmentTexture();
        }
        return this.scene.updated();
      });
    }
    destroy() {
      this.imageUrl.stop();
      this.environment.stop();
      return this.background.stop();
    }
    startAdjustMeshVisibility(event) {
      var startClientCoordinatesX, startClientCoordinatesY, startProperties;
      startClientCoordinatesX = event.clientX;
      startClientCoordinatesY = event.clientY;
      startProperties = _.clone(this.meshVisibilityProperties());

      // Wire movement of the mouse anywhere in the window.
      $(document).on('pointermove.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager', event => {
        var dragDeltaX, dragDeltaY, properties, scale;
        scale = this.reference.display.scale();
        dragDeltaX = (event.clientX - startClientCoordinatesX) / scale / this.constructor.fullMeshVisibilityAdjustmentDelta;
        dragDeltaY = (event.clientY - startClientCoordinatesY) / scale / this.constructor.fullMeshVisibilityAdjustmentDelta;
        // Only react to mouse coordinate changes.
        properties = this.meshVisibilityProperties();
        properties.amountVisible = _.clamp(startProperties.amountVisible + dragDeltaX, 0, 1);
        properties.sizePreference = _.clamp(startProperties.sizePreference + dragDeltaY, 0, 1);
        return this.meshVisibilityProperties(properties);
      });
      // Wire end of dragging on pointer up anywhere in the window.
      return $(document).on('pointerup.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager', () => {
        var properties;
        $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager');
        properties = this.meshVisibilityProperties();
        return this.reference.changeDisplayOptions({
          meshVisibility: properties
        });
      });
    }
    startAdjustMeshMorphing(event, morphAxes) {
      var axis, morphKey, startClientCoordinatesX, startClientCoordinatesY, startProperties;
      startClientCoordinatesX = event.clientX;
      startClientCoordinatesY = event.clientY;
      startProperties = _.clone(this.meshMorphingProperties());
      for (axis in morphAxes) {
        morphKey = morphAxes[axis];
        if (startProperties[morphKey] == null) {
          startProperties[morphKey] = 0;
        }
      }

      // Wire movement of the mouse anywhere in the window.
      $(document).on('pointermove.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager', event => {
        var dragDeltaX, dragDeltaY, properties, scale;
        scale = this.reference.display.scale();

        // Only react to mouse coordinate changes.
        properties = this.meshMorphingProperties();
        if (morphAxes.horizontal) {
          dragDeltaX = (event.clientX - startClientCoordinatesX) / scale / this.constructor.fullMeshMorphingAdjustmentDelta;
          properties[morphAxes.horizontal] = _.clamp(startProperties[morphAxes.horizontal] + dragDeltaX, 0, 1);
        }
        if (morphAxes.vertical) {
          dragDeltaY = (event.clientY - startClientCoordinatesY) / scale / this.constructor.fullMeshMorphingAdjustmentDelta;
          properties[morphAxes.vertical] = _.clamp(startProperties[morphAxes.vertical] + dragDeltaY, 0, 1);
        }
        return this.meshMorphingProperties(properties);
      });
      // Wire end of dragging on pointer up anywhere in the window.
      return $(document).on('pointerup.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager', () => {
        var properties;
        $(document).off('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-references-displaycomponent-reference-model-cameramanager');
        properties = this.meshMorphingProperties();
        return this.reference.changeDisplayOptions({
          meshMorphing: properties
        });
      });
    }
  }
  ;
  SceneManager._textureCache = {};
  SceneManager.fullMeshVisibilityAdjustmentDelta = 50; // display pixels

  SceneManager.fullMeshMorphingAdjustmentDelta = 50; // display pixels

  return SceneManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"renderermanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/ren //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AS, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AS = Artificial.Spectrum;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model.RendererManager = class RendererManager {
  constructor(reference) {
    this.reference = reference;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.outputEncoding = THREE.LinearEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this._rendererUpdatedDependency = new Tracker.Dependency();

    // Resize the renderer when viewport size changes.
    this.reference.autorun(() => {
      var viewportSize;
      if (!(viewportSize = this.reference.viewportSize())) {
        return;
      }
      this.renderer.setSize(viewportSize.width, viewportSize.height);
      return this._rendererUpdatedDependency.changed();
    });
    // Update exposure from the reference.
    this.reference.autorun(() => {
      var exposureValue, ref;
      exposureValue = ((ref = this.reference.data().displayOptions) != null ? ref.exposureValue : void 0) || 0;
      this.renderer.toneMappingExposure = Math.pow(2, exposureValue);
      return this._rendererUpdatedDependency.changed();
    });
  }
  destroy() {
    this.renderer.dispose();
    return this.renderer.forceContextLoss();
  }
  startRendering() {
    // Start the reactive redraw routine.
    return this.reference.autorun(() => {
      var camera, scene;
      // Render when renderer changes.
      this._rendererUpdatedDependency.depend();
      // Render when scene or camera changes.
      scene = this.reference.sceneManager().scene.withUpdates();
      camera = this.reference.cameraManager().camera.withUpdates();
      return this.renderer.render(scene, camera);
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"loader-client.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/loa //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.Model.Loader = function () {
  var dracoLoader;
  class Loader {
    static load(path, onLoadHandler) {
      var model;
      // See if we've already come across this path.
      if (model = this.models[path]) {
        // See if this model was already loaded.
        if (model.loaded) {
          // Simply pass the loaded data to the handler.
          onLoadHandler(model.data);
        } else {
          // Add the handler to the waiting list.
          model.waitingOnLoadHandlers.push(onLoadHandler);
        }
        return;
      }
      // We need to start loading this model.
      model = {
        waitingOnLoadHandlers: [onLoadHandler]
      };
      this.models[path] = model;
      return this.gltfLoader.load(path, loadedData => {
        var i, len, ref, results;
        model = this.models[path];
        model.data = loadedData;
        model.loaded = true;
        ref = model.waitingOnLoadHandlers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          onLoadHandler = ref[i];
          results.push(onLoadHandler(model.data));
        }
        return results;
      });
    }
  }
  ;
  Loader.gltfLoader = new THREE.GLTFLoader();
  dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('/artificial/everywhere/three/draco/');
  Loader.gltfLoader.setDRACOLoader(dracoLoader);
  Loader.models = {};
  return Loader;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},"publications":{"publications.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/publications/publications.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, AMu, FM, LOI, PAA, PAE;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Publications = function () {
  class Publications extends LOI.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Publications';
    }
    constructor() {
      super(...arguments);
      this.active = new ReactiveField(false);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.designConstants = {
        revealedHeight: 6,
        verticalPadding: 30,
        horizontalPadding: 30
      };
      this.desktop = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
      this.publicationReferenceIds = new ComputedField(() => {
        var asset, availablePublications, base, currentSituation, unlockedPublications;
        if (!(asset = this.desktop.activeAsset())) {
          return;
        }
        if (!(availablePublications = typeof (base = asset.constructor).availablePublications === "function" ? base.availablePublications() : void 0)) {
          return;
        }
        currentSituation = new LOI.Adventure.Situation({
          location: PAA.Publication.Location
        });
        unlockedPublications = currentSituation.things();
        return _.intersection(availablePublications, unlockedPublications);
      }, EJSON.equals);
      this.autorun(computation => {
        var publicationReferenceIds;
        if (!(publicationReferenceIds = this.publicationReferenceIds())) {
          return;
        }
        PAA.Publication.forReferenceIds.subscribeContent(this, publicationReferenceIds);
        return PAA.Publication.forReferenceIds.subscribe(this, publicationReferenceIds);
      });
      this.currentPublicationIndex = new ReactiveField(0);
      this._publicationComponents = {};
      this.publications = new ComputedField(() => {
        var activeOffset, base, i, index, len, name, publication, publicationInfo, publicationReferenceIds, publications, randomOffset, referenceId, results;
        if (!(publicationReferenceIds = this.publicationReferenceIds())) {
          return;
        }
        Tracker.nonreactive(() => {
          return this.currentPublicationIndex(0);
        });
        publications = function () {
          var i, len, results;
          results = [];
          for (i = 0, len = publicationReferenceIds.length; i < len; i++) {
            referenceId = publicationReferenceIds[i];
            results.push(PAA.Publication.documents.findOne({
              referenceId
            }));
          }
          return results;
        }();
        randomOffset = () => {
          if (index === publications.length - 1) {
            return 0;
          } else {
            return Math.floor(Math.random() * 5 + 5) * Math.sign(Math.random() - 0.5);
          }
        };
        activeOffset = 0;
        results = [];
        for (index = i = 0, len = publications.length; i < len; index = ++i) {
          publication = publications[index];
          if (!publication) {
            continue;
          }
          if ((base = this._publicationComponents)[name = publication._id] == null) {
            base[name] = new PAA.Publication.Component(publication._id);
          }
          publicationInfo = {
            publication: publication,
            index: index,
            component: this._publicationComponents[publication._id],
            offset: {
              x: randomOffset(),
              y: randomOffset()
            },
            activeOffset: activeOffset
          };
          activeOffset += publication.design.size.width + this.designConstants.horizontalPadding;
          results.push(publicationInfo);
        }
        return results;
      });
      this.currentPublication = new ComputedField(() => {
        var publications;
        if (!(publications = this.publications())) {
          return;
        }
        return publications[this.currentPublicationIndex()];
      });
      this.activeDisplayed = new ReactiveField(false);

      // Automatically enter focused mode when active.
      this.autorun(computation => {
        return this.desktop.focusedMode(this.active());
      });

      // Automatically deactivate when exiting focused mode.
      this.autorun(computation => {
        if (this.desktop.focusedMode()) {
          return;
        }
        return this.deactivate();
      });

      // Automatically deactivate if the editor deactivates.
      return this.autorun(computation => {
        if (this.desktop.active()) {
          return;
        }
        return this.deactivate();
      });
    }
    onBackButton() {
      var currentPublication;
      if (!(currentPublication = this.currentPublication())) {
        return;
      }
      return currentPublication.component.back();
    }
    activate() {
      if (this.active()) {
        return;
      }
      this.active(true);
      this.audio.lift();
      this.currentPublication().component.enable();
      return this._activeDisplayedTimeout = Meteor.setTimeout(() => {
        return this.activeDisplayed(true);
      }, 1000);
    }
    deactivate() {
      var currentPublicationComponent, ref;
      if (!this.active()) {
        return;
      }
      this.active(false);
      this.audio.release();
      if (currentPublicationComponent = (ref = this.currentPublication()) != null ? ref.component : void 0) {
        currentPublicationComponent.close();
        currentPublicationComponent.disable();
      }
      Meteor.clearTimeout(this._activeDisplayedTimeout);
      return this.activeDisplayed(false);
    }
    moveToPublicationIndex(index) {
      var publications;
      if (!(publications = this.publications())) {
        return;
      }
      publications[this.currentPublicationIndex()].component.disable();
      this.currentPublicationIndex(index);
      return publications[index].component.enable();
    }
    activeClass() {
      if (this.active()) {
        return 'active';
      }
    }
    publicationStyle() {
      var currentPublication, left, publication;
      publication = this.currentData();
      currentPublication = this.currentPublication();
      if (this.active()) {
        left = publication.activeOffset - currentPublication.activeOffset;
        if (currentPublication.component.opened() && publication !== currentPublication) {
          if (publication.index < currentPublication.index) {
            left -= 480;
          } else {
            left += 480;
          }
        }
        return {
          top: "-100%",
          left: "".concat(left, "rem")
        };
      } else {
        return {
          left: "".concat(publication.offset.x, "rem"),
          top: "-".concat(this.designConstants.revealedHeight + this.designConstants.verticalPadding + publication.offset.y, "rem")
        };
      }
    }
    showPublicationSelectButtons() {
      var ref;
      return this.active() && !((ref = this.currentPublication()) != null ? ref.component.opened() : void 0);
    }
    canMoveLeft() {
      return this.currentPublicationIndex();
    }
    canMoveRight() {
      return this.currentPublicationIndex() < this.publications().length - 1;
    }
    publicationSelectButtonStyle() {
      var currentPublication;
      if (!(currentPublication = this.currentPublication())) {
        return;
      }
      return {
        width: "calc(50% - ".concat(currentPublication.publication.design.size.width / 2, "rem)")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .publication': this.onClickPublication,
        'click .previous-publication-button': this.onClickPreviousPublicationButton,
        'click .next-publication-button': this.onClickNextPublicationButton,
        'pointerenter .publications': this.onPointerEnterPublications,
        'pointerleave .publications': this.onPointerLeavePublications
      });
    }
    onClickPublication(event) {
      if (this.active()) {
        return;
      }
      return this.activate();
    }
    onClickPreviousPublicationButton(event) {
      var currentPublicationIndex;
      if (!(currentPublicationIndex = this.currentPublicationIndex())) {
        return;
      }
      return this.moveToPublicationIndex(currentPublicationIndex - 1);
    }
    onClickNextPublicationButton(event) {
      var currentPublicationIndex;
      currentPublicationIndex = this.currentPublicationIndex();
      if (!(currentPublicationIndex < this.publications().length)) {
        return;
      }
      return this.moveToPublicationIndex(currentPublicationIndex + 1);
    }
    onPointerEnterPublications(event) {
      if (this.active()) {
        return;
      }
      return this.audio.drag();
    }
    onPointerLeavePublications(event) {
      if (this.active()) {
        return;
      }
      return this.audio.drag();
    }
  }
  ;
  Publications.register(Publications.id());
  Publications.Audio = new LOI.Assets.Audio.Namespace(Publications.id(), {
    // Loaded from the PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop namespace.
    subNamespace: true,
    variables: {
      drag: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      lift: AEc.ValueTypes.Trigger,
      release: AEc.ValueTypes.Trigger
    }
  });
  return Publications;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.publications.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/publications/template.publications.js           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Publications");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Publications"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Publications", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-desktop-publications table-item ", Spacebars.mustache(view.lookup("activeClass")) ];
    }
  }, "\n    ", HTML.UL({
    class: "publications"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("publications"));
  }, function() {
    return [ "\n        ", HTML.LI(HTML.Attrs({
      class: "publication"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("publicationStyle"));
    }), "\n          ", Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "component"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showPublicationSelectButtons"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveLeft"));
    }, function() {
      return [ "\n        ", HTML.BUTTON(HTML.Attrs({
        class: "publication-select-button previous-publication-button"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("publicationSelectButtonStyle"));
      })), "\n      " ];
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveRight"));
    }, function() {
      return [ "\n        ", HTML.BUTTON(HTML.Attrs({
        class: "publication-select-button next-publication-button"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("publicationSelectButtonStyle"));
      })), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"newpartinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/publications/newpartinstruction.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, AMu, FM, InterfaceMarking, LOI, Markup, PAA;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Publications.NewPartInstruction = function () {
  class NewPartInstruction extends PAA.PixelPad.Systems.Instructions.Instruction {
    static id() {
      return "PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Publications.NewPartInstruction";
    }
    static activeConditions() {
      var currentPartsSituation, editor, i, len, publicationInfo, publicationsView, ref, unlockedPartIds;
      // Show when there is an unread publication part among the displayed publications.
      if (!(editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor())) {
        return;
      }
      if (!editor.drawingActive()) {
        return;
      }
      if (!(publicationsView = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Publications))) {
        return;
      }
      if (publicationsView.active()) {
        return;
      }
      currentPartsSituation = new LOI.Adventure.Situation({
        location: PAA.Publication.Part.Location
      });
      unlockedPartIds = currentPartsSituation.things();
      ref = publicationsView.publications();
      for (i = 0, len = ref.length; i < len; i++) {
        publicationInfo = ref[i];
        if (publicationInfo.publication.hasUnreadUnlockedContents(unlockedPartIds)) {
          return true;
        }
      }
      return false;
    }
    static activeDisplayState() {
      // We only have markup without a message.
      return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
    }
    markup() {
      var arrowBase, markup, textBase;
      markup = [];
      arrowBase = InterfaceMarking.arrowBase();
      textBase = InterfaceMarking.textBase();
      markup.push({
        interface: {
          selector: '.pixelartacademy-publication-component .publication',
          delay: 1,
          bounds: {
            x: 40,
            y: -40,
            width: 100,
            height: 40
          },
          markings: [{
            line: _.extend({}, arrowBase, {
              points: [{
                x: 90,
                y: -30
              }, {
                x: 100,
                y: -7,
                bezierControlPoints: [{
                  x: 90,
                  y: -25
                }, {
                  x: 90,
                  y: -20
                }]
              }]
            }),
            text: _.extend({}, textBase, {
              position: {
                x: 90,
                y: -32,
                origin: Markup.TextOriginPosition.BottomCenter
              },
              value: "new article unlocked"
            })
          }]
        }
      });
      return markup;
    }
  }
  ;
  NewPartInstruction.initialize();
  return NewPartInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"actions":{"actions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/actions/actions.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, LOI, PAA;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions = class Actions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"focus.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/actions/focus.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.Focus = function () {
  class Focus extends FM.Action {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Actions.Focus';
    }
    static displayName() {
      return "Focus mode";
    }
    constructor() {
      super(...arguments);
      this.desktop = this.interface.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Desktop);
    }
    active() {
      return this.desktop.focusedMode();
    }
    execute() {
      return this.desktop.focusedMode(!this.desktop.focusedMode());
    }
  }
  ;
  Focus.initialize();
  return Focus;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"zoom.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/desktop/actions/zoom.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA, Zoom;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Zoom = class Zoom extends FM.Action {
  enabled() {
    return this.interface.activeFileId() != null && this.newZoomLevel();
  }
  constructor() {
    super(...arguments);
    this.zoomLevels = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.ZoomLevels);
    this.zoomPercentage = new ComputedField(() => {
      var ref, ref1;
      return ((ref = this.interface.getEditorForActiveFile()) != null ? (ref1 = ref.camera()) != null ? ref1.targetScale() : void 0 : void 0) * 100;
    });
  }
  execute() {
    var newZoomLevel, ref, ref1;
    if (!(newZoomLevel = this.newZoomLevel())) {
      return;
    }
    return (ref = this.interface.getEditorForActiveFile()) != null ? (ref1 = ref.camera()) != null ? ref1.scaleTo(newZoomLevel / 100, 0.2) : void 0 : void 0;
  }
};
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomIn = function () {
  class ZoomIn extends Zoom {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomIn';
    }
    static displayName() {
      return "Zoom in";
    }
    newZoomLevel() {
      var i, len, percentage, ref, zoomLevel;
      percentage = this.zoomPercentage();
      ref = this.zoomLevels();
      for (i = 0, len = ref.length; i < len; i++) {
        zoomLevel = ref[i];
        if (Math.round(zoomLevel) > Math.round(percentage)) {
          return zoomLevel;
        }
      }
      return null;
    }
  }
  ;
  ZoomIn.initialize();
  return ZoomIn;
}.call(this);
PAA.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomOut = function () {
  class ZoomOut extends Zoom {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Desktop.Actions.ZoomOut';
    }
    static displayName() {
      return "Zoom out";
    }
    newZoomLevel() {
      var i, percentage, ref, zoomLevel;
      percentage = this.zoomPercentage();
      ref = this.zoomLevels();
      for (i = ref.length - 1; i >= 0; i += -1) {
        zoomLevel = ref[i];
        if (Math.round(zoomLevel) < Math.round(percentage)) {
          return zoomLevel;
        }
      }
      return null;
    }
  }
  ;
  ZoomOut.initialize();
  return ZoomOut;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"easel":{"easel.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/easel.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC,
  AE,
  AM,
  FM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AC = Artificial.Control;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Easel = function () {
  class Easel extends PAA.PixelPad.Apps.Drawing.Editor {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel';
    }
    static version() {
      return '0.1.0-wip';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "画架";
    }
    static styleClass() {
      return 'editor-easel';
    }
    constructor() {
      super(...arguments);
      this.displayMode = new ReactiveField(this.constructor.DisplayModes.Normal);
      this._lastZoomedInScale = 1;
      this._lastZoomedInOrigin = {
        x: 0,
        y: 0
      };
    }
    onCreated() {
      var actionRequirements, handleView, toolKeys, toolRequirements, viewId, viewsToolRequirements;
      super.onCreated(...arguments);

      // Reactively add views.
      handleView = (viewId, enabled) => {
        var applicationAreaData, existingViewIndex, view, views;
        if (!this.interface.isCreated()) {
          return;
        }
        applicationAreaData = this.interface.currentApplicationAreaData();
        views = applicationAreaData.get('views');
        existingViewIndex = _.findIndex(views, view => {
          return view.type === viewId;
        });
        if (enabled) {
          // Add the view if it's not yet added.
          if (existingViewIndex === -1) {
            view = {
              type: viewId
            };
            views.push(view);
            return Tracker.nonreactive(() => {
              return applicationAreaData.set('views', views);
            });
          }
        } else {
          // Remove the view if it's there.
          if (existingViewIndex > -1) {
            views.splice(existingViewIndex, 1);
            return Tracker.nonreactive(() => {
              return applicationAreaData.set('views', views);
            });
          }
        }
      };
      viewsToolRequirements = {};
      for (viewId in viewsToolRequirements) {
        toolKeys = viewsToolRequirements[viewId];
        ((viewId, toolKeys) => {
          if (!_.isArray(toolKeys)) {
            toolKeys = [toolKeys];
          }
          return this.autorun(computation => {
            var anyToolIsAvailable;
            anyToolIsAvailable = _.some(toolKeys, toolKey => {
              return this.toolIsAvailable(toolKey);
            });
            return handleView(viewId, anyToolIsAvailable);
          });
        })(viewId, toolKeys);
      }

      // Reactively add tools and actions.
      toolRequirements = {
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Square.id())]: PAA.Practice.Software.Tools.ToolKeys.Brush,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Pixel.id())]: PAA.Practice.Software.Tools.ToolKeys.Pencil,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Round.id())]: PAA.Practice.Software.Tools.ToolKeys.Brush,
        ["".concat(LOI.Assets.SpriteEditor.Tools.ColorFill.id())]: PAA.Practice.Software.Tools.ToolKeys.ColorFill,
        ["".concat(LOI.Assets.SpriteEditor.Tools.ColorPicker.id())]: PAA.Practice.Software.Tools.ToolKeys.ColorPicker,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas.id())]: PAA.Practice.Software.Tools.ToolKeys.MoveCanvas
      };
      actionRequirements = {
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Actions.DisplayMode.id())]: PAA.Practice.Software.Tools.ToolKeys.Zoom,
        ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Actions.ClearPaint.id())]: PAA.Practice.Software.Tools.ToolKeys.ClearColor
      };
      this.autorun(computation => {
        var actionId, actions, applicationAreaData, layoutViewIndex, toolId, toolKey, tools, views;
        if (!this.interface.isCreated()) {
          return;
        }
        applicationAreaData = this.interface.currentApplicationAreaData();
        views = applicationAreaData.get('views');
        layoutViewIndex = _.findIndex(views, view => {
          return view.type === PAA.PixelPad.Apps.Drawing.Editor.Easel.Layout.id();
        });
        tools = [LOI.Assets.Editor.Tools.Arrow.id()];
        for (toolId in toolRequirements) {
          toolKey = toolRequirements[toolId];
          if (this.toolIsAvailable(toolKey)) {
            tools.push(toolId);
          }
        }
        actions = function () {
          var results;
          results = [];
          for (actionId in actionRequirements) {
            toolKey = actionRequirements[actionId];
            if (this.toolIsAvailable(toolKey)) {
              results.push(actionId);
            }
          }
          return results;
        }.call(this);
        return Tracker.nonreactive(() => {
          applicationAreaData.set("views.".concat(layoutViewIndex, ".toolbox.tools"), tools);
          return applicationAreaData.set("views.".concat(layoutViewIndex, ".actions"), actions);
        });
      });

      // Reset camera when entering the editor. Make sure the default camera info is available.
      this._defaultCameraInfoAvailable = new ComputedField(() => {
        var base, layoutView, pixelCanvas, ref;
        if (((ref = this.activeAsset()) != null ? typeof (base = ref.clipboardComponent).assetSize === "function" ? base.assetSize() : void 0 : void 0) == null) {
          // Wait until the clipboard is created so that we have the correct scale.
          return false;
        }

        // Wait until the pixel canvas set the clipboard scale.
        pixelCanvas = this.getPixelCanvas();
        if (!pixelCanvas.clipboardCameraScaleSet()) {
          return false;
        }

        // Wait until the default camera origin is available.
        layoutView = this.getLayoutView();
        if (!layoutView.defaultCameraOrigin()) {
          return false;
        }
        return true;
      });
      this.autorun(computation => {
        if (!this.interface.isCreated()) {
          return;
        }
        if (!this.active()) {
          return;
        }
        if (!this._defaultCameraInfoAvailable()) {
          return;
        }
        return Tracker.nonreactive(() => {
          return this._applyDefaultCamera();
        });
      });

      // Automatically enter zoomed-in mode when moving the canvas
      // in normal mode and the layout can't compensate for its position.
      this.autorun(computation => {
        var layoutView, moveTool;
        if (!this.interface.isCreated()) {
          return;
        }
        if (this.displayMode() !== this.constructor.DisplayModes.Normal) {
          return;
        }
        moveTool = this.interface.getOperator(PAA.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas.id());
        if (!moveTool.moving()) {
          return;
        }
        layoutView = this.getLayoutView();
        if (!layoutView.frameOffset().outOfBounds) {
          return;
        }

        // Enter zoomed-in mode while preserving current scale.
        return this.enterZoomedInDisplayMode(false);
      });

      // Automatically enter zoomed-in mode if camera scale doesn't match the default scale.
      return this.autorun(computation => {
        var base, clipboardAssetSize, displayedAsset, pixelCanvas;
        if (!this.interface.isCreated()) {
          return;
        }
        if (this.displayMode() !== this.constructor.DisplayModes.Normal) {
          return;
        }
        if (!(displayedAsset = this.displayedAsset())) {
          return;
        }
        if (!displayedAsset.clipboardComponent.isCreated()) {
          return;
        }
        if (!(clipboardAssetSize = typeof (base = displayedAsset.clipboardComponent).assetSize === "function" ? base.assetSize() : void 0)) {
          return;
        }

        // Depend on camera scale changes.
        pixelCanvas = this.getPixelCanvas();
        pixelCanvas.camera().scale();

        // Give the camera scale a chance to update when display modes are being changed.
        return Tracker.afterFlush(() => {
          var scale;
          scale = pixelCanvas.camera().scale();
          if (scale === clipboardAssetSize.scale) {
            return;
          }

          // Enter zoomed-in mode while preserving current scale.
          return this.enterZoomedInDisplayMode(false);
        });
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.autorun(() => {
        if (this.active()) {
          // Add the drawing active class with delay so that the initial transitions still happen slowly.
          return Meteor.setTimeout(() => {
            return this.drawingActive(true);
          }, 1000);
        } else {
          // Immediately remove the drawing active class so that the slow transitions kick in.
          return this.drawingActive(false);
        }
      });
    }
    getLayoutView() {
      return this._getView(PAA.PixelPad.Apps.Drawing.Editor.Easel.Layout);
    }
    getPixelCanvas() {
      return this._getView(PAA.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas);
    }
    cycleDisplayMode() {
      var displayMode;
      displayMode = this.displayMode();
      switch (displayMode) {
        case this.constructor.DisplayModes.Normal:
          return this.enterZoomedInDisplayMode();
        case this.constructor.DisplayModes.ZoomedIn:
          return this.enterFocusedDisplayMode();
        case this.constructor.DisplayModes.Focused:
          return this.enterNormalDisplayMode();
      }
    }
    enterNormalDisplayMode() {
      this._saveLastZoomedInCamera();
      this._applyDefaultCamera();
      return this.displayMode(this.constructor.DisplayModes.Normal);
    }
    enterZoomedInDisplayMode() {
      let restoreLastCamera = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (this.displayMode() === this.constructor.DisplayModes.Normal && restoreLastCamera) {
        this._applyLastZoomedInCamera();
      }
      return this.displayMode(this.constructor.DisplayModes.ZoomedIn);
    }
    enterFocusedDisplayMode() {
      if (this.displayMode() === this.constructor.DisplayModes.Normal) {
        this._applyLastZoomedInCamera();
      }
      return this.displayMode(this.constructor.DisplayModes.Focused);
    }
    _applyLastZoomedInCamera() {
      var camera, pixelCanvas;
      pixelCanvas = this.getPixelCanvas();
      camera = pixelCanvas.camera();
      camera.setScale(this._lastZoomedInScale);
      return camera.setOrigin(this._lastZoomedInOrigin);
    }
    _saveLastZoomedInCamera() {
      var camera, pixelCanvas;
      pixelCanvas = this.getPixelCanvas();
      camera = pixelCanvas.camera();
      this._lastZoomedInScale = camera.scale();
      return this._lastZoomedInOrigin = camera.origin();
    }
    _applyDefaultCamera() {
      var camera, clipboardAssetSize, defaultCameraOrigin, defaultCameraScale, layoutView, pixelCanvas;
      clipboardAssetSize = this.activeAsset().clipboardComponent.assetSize();

      // Set the scale to clipboard's calculated scale.
      defaultCameraScale = clipboardAssetSize.scale;

      // Set the origin to layout's calculated default.
      layoutView = this.getLayoutView();
      defaultCameraOrigin = layoutView.defaultCameraOrigin();

      // Set the camera properties.
      pixelCanvas = this.getPixelCanvas();
      camera = pixelCanvas.camera();
      camera.setOrigin(defaultCameraOrigin);
      return camera.setScale(defaultCameraScale);
    }
    onBackButton() {
      var displayMode;
      // Cycle back display modes on back button.
      displayMode = this.displayMode();
      if (displayMode === this.constructor.DisplayModes.Normal) {
        return super.onBackButton(...arguments);
      }
      if (displayMode === this.constructor.DisplayModes.ZoomedIn) {
        this.enterNormalDisplayMode();
      } else {
        this.enterZoomedInDisplayMode();
      }
      // Inform that we've handled the back button.
      return true;
    }
    defaultInterfaceData() {
      var activeToolId, components, layouts, shortcuts, views;
      activeToolId = LOI.Assets.Editor.Tools.Arrow.id();
      components = {
        ["".concat(_.snakeCase(PAA.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas.id()))]: {
          components: [PAA.PixelPad.Apps.Drawing.Editor.PixelCanvasComponents.id()]
        },
        ["".concat(_.snakeCase(LOI.Assets.SpriteEditor.Helpers.Brush.id()))]: {
          diameter: 5,
          round: true
        }
      };
      views = [{
        type: FM.Menu.id(),
        items: [LOI.Assets.Editor.Actions.Undo.id(), LOI.Assets.Editor.Actions.Redo.id(), LOI.Assets.SpriteEditor.Actions.BrushSizeIncrease.id(), LOI.Assets.SpriteEditor.Actions.BrushSizeDecrease.id(), LOI.Assets.SpriteEditor.Actions.ZoomIn.id(), LOI.Assets.SpriteEditor.Actions.ZoomOut.id()]
      }, {
        type: PAA.PixelPad.Apps.Drawing.Editor.Easel.Layout.id(),
        toolbox: {
          type: FM.Toolbox.id(),
          tools: []
        },
        colorFill: {
          type: PAA.PixelPad.Apps.Drawing.Editor.Easel.ColorFill.id()
        }
      }, {
        type: FM.EditorView.id(),
        files: this._dummyEditorViewFiles,
        editor: {
          contentComponentId: PAA.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas.id()
        }
      }];
      layouts = {
        currentLayoutId: 'main',
        main: {
          name: 'Main',
          applicationArea: {
            type: FM.MultiView.id(),
            views: views
          }
        }
      };
      shortcuts = _.defaultsDeep({
        default: {
          mapping: {
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Square.id())]: {
              key: AC.Keys.b
            },
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Pixel.id())]: {
              key: AC.Keys.b
            },
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Round.id())]: {
              key: AC.Keys.b
            },
            ["".concat(PAA.PixelPad.Apps.Drawing.Editor.Easel.Actions.DisplayMode.id())]: {
              key: AC.Keys.f
            }
          }
        }
      }, this.getShortcuts());
      // Return combined interface data.
      return {
        activeToolId,
        components,
        layouts,
        shortcuts
      };
    }
    drawingActiveClass() {
      if (this.drawingActive()) {
        return 'drawing-active';
      }
    }
    displayModeClass() {
      return "".concat(_.kebabCase(this.displayMode()), "-mode");
    }
    draggingClass() {
      var moveTool;
      if (!this.interface.isCreated()) {
        return;
      }
      moveTool = this.interface.getOperator(PAA.PixelPad.Apps.Drawing.Editor.Tools.MoveCanvas.id());
      if (_.some([moveTool.moving()])) {
        return 'dragging';
      }
    }
    toolIsAvailable(toolKey) {
      var availableKeys, ref;
      if (!(availableKeys = (ref = this.displayedAsset()) != null ? typeof ref.availableToolKeys === "function" ? ref.availableToolKeys() : void 0 : void 0)) {
        return true;
      }
      return indexOf.call(availableKeys, toolKey) >= 0;
    }
    _getView(viewClass) {
      if (!this.interface.isCreated()) {
        return;
      }
      return this.interface.allChildComponentsOfType(viewClass)[0];
    }
  }
  ;
  Easel.register(Easel.id());
  Easel.initialize();
  Easel.DisplayModes = {
    Normal: 'Normal',
    ZoomedIn: 'ZoomedIn',
    Focused: 'Focused'
  };
  return Easel;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.easel.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/template.easel.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-drawing-editor-easel pixelartacademy-pixelpad-apps-drawing-editor ", Spacebars.mustache(view.lookup("drawingActiveClass")), " ", Spacebars.mustache(view.lookup("displayModeClass")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("displayedAsset"), "editorStyleClasses")), " ", Spacebars.mustache(view.lookup("draggingClass")), " ", Spacebars.mustache(view.lookup("resizingDirectionClass")) ];
    }
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("interface"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("active"));
  }, function() {
    return [ "\n      ", HTML.STYLE("\n        .pixelartacademy-pixelpad-os-root::before {\n          opacity: 0;\n          transition: opacity 0s;\n          pointer-events: none;\n        }\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", HTML.STYLE("\n        .pixelartacademy-pixelpad-os-root::before {\n          opacity: 1;\n          transition: opacity 0.2s 1s;\n        }\n      "), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("drawingActive"));
  }, function() {
    return [ "\n      ", HTML.STYLE("\n        html.adventure .build-version {\n          opacity: 0 !important;\n          pointer-events: none;\n        }\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout":{"layout.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/layout/layout.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, FM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Layout = function () {
  class Layout extends FM.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Layout';
    }
    onCreated() {
      var frameBottom, frameLeft, layoutMaximumOffset, movableStandMaximumBottom, movableStandMinimumOffset;
      super.onCreated(...arguments);
      this.easel = this.interface.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Easel);
      frameLeft = 87; // rem
      frameBottom = 49; // rem
      this.movableStandMinimumBottom = 16; // rem
      movableStandMaximumBottom = 130; // rem
      movableStandMinimumOffset = frameBottom + this.movableStandMinimumBottom;
      layoutMaximumOffset = 45; // rem
      this.camera = new ComputedField(() => {
        var ref;
        return (ref = this.easel.getPixelCanvas()) != null ? ref.camera() : void 0;
      });
      this.pixelPadSize = new ComputedField(() => {
        return this.easel.drawing.getMaximumPixelPadSize({
          fullscreen: true
        });
      }, EJSON.equals);
      this.layoutAdjustedMaximumOffset = new ComputedField(() => {
        var currentHeight, maxOverlayHeight, safeAreaHeight;
        // Proportionally adjust how much we offset the layout based on how much over safe area height we are.
        safeAreaHeight = LOI.adventure.interface.display.safeAreaHeight();
        maxOverlayHeight = safeAreaHeight * 1.5;
        currentHeight = this.pixelPadSize().height;
        return layoutMaximumOffset * ((currentHeight - safeAreaHeight) / (maxOverlayHeight - safeAreaHeight));
      });
      this.assetSize = new ReactiveField(null, EJSON.equals);
      this.defaultDrawingArea = new ReactiveField(null, EJSON.equals);
      this.defaultCameraOrigin = new ReactiveField(null, EJSON.equals);
      this.frameOffset = new ReactiveField(null, EJSON.equals);
      return this.autorun(computation => {
        var assetBottom, assetSize, assetTop, borderWidth, camera, centerRelativeToCameraOrigin, clipboardAssetSize, defaultAssetOrigin, defaultCameraOrigin, defaultDrawingArea, displayedAsset, drawingAreaBottom, drawingAreaBottomCanvas, drawingAreaBottomRelativeToCenter, drawingAreaCanvasBounds, frameCenter, frameOffset, height, layoutAdjustedMaximumOffset, layoutBottom, movableStandBottom, outOfBounds, pixelPadSize, remainingOffset, scale, totalOffset, width;
        if (!(displayedAsset = this.easel.displayedAsset())) {
          return;
        }
        if (!displayedAsset.clipboardComponent.isCreated()) {
          return;
        }
        if (!(clipboardAssetSize = displayedAsset.clipboardComponent.assetSize())) {
          return;
        }
        if (!(camera = this.camera())) {
          return;
        }
        pixelPadSize = this.pixelPadSize();
        scale = clipboardAssetSize.scale;
        borderWidth = clipboardAssetSize.borderWidth;
        drawingAreaCanvasBounds = camera.drawingAreaCanvasBounds.toObject();

        // Calculate asset size.
        width = drawingAreaCanvasBounds.width * scale + 2 * borderWidth;
        height = drawingAreaCanvasBounds.height * scale + 2 * borderWidth;
        assetSize = {
          width,
          height
        };
        this.assetSize(assetSize);

        // Calculate default drawing area.
        totalOffset = (pixelPadSize.height - assetSize.height) / 2;
        layoutBottom = 0;
        movableStandBottom = this.movableStandMinimumBottom;
        if (totalOffset < movableStandMinimumOffset) {
          assetBottom = movableStandMinimumOffset;
        } else {
          assetBottom = totalOffset;

          // Raise layout to the max.
          remainingOffset = totalOffset - movableStandMinimumOffset;
          layoutAdjustedMaximumOffset = this.layoutAdjustedMaximumOffset();
          if (remainingOffset <= layoutAdjustedMaximumOffset) {
            layoutBottom = remainingOffset;
            assetBottom = totalOffset;
          } else {
            layoutBottom = layoutAdjustedMaximumOffset;
            remainingOffset -= layoutAdjustedMaximumOffset;

            // Raise movable stand to achieve total offset.
            movableStandBottom += remainingOffset;
          }
        }
        assetTop = pixelPadSize.height - assetBottom - assetSize.height;
        frameCenter = pixelPadSize.width / 2 + frameLeft;
        defaultDrawingArea = {
          bottom: assetBottom - borderWidth,
          top: assetTop + borderWidth,
          left: frameCenter - assetSize.width / 2 + borderWidth,
          right: frameCenter + assetSize.width / 2 - borderWidth
        };
        this.defaultDrawingArea(defaultDrawingArea);

        // Calculate default camera origin.
        defaultAssetOrigin = {
          x: defaultDrawingArea.left - drawingAreaCanvasBounds.left * scale,
          y: defaultDrawingArea.top - drawingAreaCanvasBounds.top * scale
        };
        defaultCameraOrigin = {
          x: (pixelPadSize.width / 2 - defaultAssetOrigin.x) / scale,
          y: (pixelPadSize.height / 2 - defaultAssetOrigin.y) / scale
        };
        this.defaultCameraOrigin(defaultCameraOrigin);

        // Calculate frame offset.

        // Calculate drawing area canvas bottom in pixel canvas display coordinates.
        drawingAreaBottomCanvas = drawingAreaCanvasBounds.bottom;
        centerRelativeToCameraOrigin = camera.origin();
        drawingAreaBottomRelativeToCenter = (drawingAreaBottomCanvas - centerRelativeToCameraOrigin.y) * scale;
        drawingAreaBottom = drawingAreaBottomRelativeToCenter + pixelPadSize.height / 2;

        // Calculate the offset of the asset from the bottom of the PixelPad.
        totalOffset = pixelPadSize.height - (drawingAreaBottom + borderWidth);

        // Determine how much each movable part needs to be offset.
        layoutBottom = 0;
        movableStandBottom = this.movableStandMinimumBottom;
        outOfBounds = false;
        if (totalOffset < movableStandMinimumOffset) {
          assetBottom = movableStandMinimumOffset;
          outOfBounds = true;
        } else {
          assetBottom = totalOffset;

          // Raise layout to the max.
          remainingOffset = totalOffset - movableStandMinimumOffset;
          layoutAdjustedMaximumOffset = this.layoutAdjustedMaximumOffset();
          if (remainingOffset <= layoutAdjustedMaximumOffset) {
            layoutBottom = remainingOffset;
            assetBottom = totalOffset;
          } else {
            layoutBottom = layoutAdjustedMaximumOffset;
            remainingOffset -= layoutAdjustedMaximumOffset;

            // Raise movable stand to achieve total offset, up to the maximum.
            movableStandBottom += remainingOffset;
            if (movableStandBottom > movableStandMaximumBottom) {
              movableStandBottom = movableStandMaximumBottom;
              outOfBounds = true;
            }
          }
        }
        assetTop = pixelPadSize.height - assetBottom - assetSize.height;
        frameOffset = {
          layoutBottom,
          movableStandBottom,
          assetTop,
          outOfBounds
        };
        return this.frameOffset(frameOffset);
      });
    }
    displayMode() {
      return this.easel.displayMode();
    }
    colorFillEnabled() {
      return this.easel.toolIsAvailable(PAA.Practice.Software.Tools.ToolKeys.ColorFill);
    }
    colorFillData() {
      var layoutData;
      layoutData = this.data();
      return layoutData.child("colorFill");
    }
    toolboxData() {
      var layoutData;
      layoutData = this.data();
      return layoutData.child("toolbox");
    }
    action() {
      var toolId;
      toolId = this.currentData();
      return this.interface.getOperator(toolId);
    }
    actionClass() {
      var action;
      action = this.currentData();
      return _.kebabCase(action.displayName());
    }
    actionEnabledClass() {
      var action, enabled;
      enabled = true;
      action = this.currentData();
      if (action.enabled) {
        enabled = _.propertyValue(action, 'enabled');
      }
      if (enabled) {
        return 'enabled';
      }
    }
    actionTooltip() {
      var action, name, shortcut;
      action = this.currentData();
      name = action.displayName();
      shortcut = action.currentShortcut();
      if (!shortcut) {
        return name;
      }
      if (_.isArray(shortcut)) {
        shortcut = shortcut[0];
      }
      shortcut = AM.ShortcutHelper.getShortcutString(shortcut);
      return "".concat(name, " (").concat(shortcut, ")");
    }
    assetPlaceholderStyle() {
      var assetSize;
      if (!(assetSize = this.assetSize())) {
        return;
      }
      return {
        left: "".concat(-assetSize.width / 2, "rem"),
        width: "".concat(assetSize.width, "rem"),
        height: "".concat(assetSize.height, "rem")
      };
    }
    layoutStyle() {
      var frameOffset;
      if (!(frameOffset = this.frameOffset())) {
        return;
      }
      return {
        bottom: "".concat(frameOffset.layoutBottom, "rem")
      };
    }
    movableStandStyle() {
      var bottom, frameOffset;
      if (!(frameOffset = this.frameOffset())) {
        return;
      }
      bottom = this._canvasHeld() ? frameOffset.movableStandBottom : this.movableStandMinimumBottom;
      return {
        bottom: "".concat(bottom, "rem")
      };
    }
    movableStandTopStyle() {
      var assetSize, bottom;
      if (!(assetSize = this.assetSize())) {
        return;
      }
      bottom = this._canvasHeld() ? assetSize.height - 3 : 190;
      return {
        bottom: "".concat(bottom, "rem")
      };
    }
    _canvasHeld() {
      var normalDisplayMode;
      normalDisplayMode = this.easel.displayMode() === PAA.PixelPad.Apps.Drawing.Editor.Easel.DisplayModes.Normal;
      return this.easel.active() && normalDisplayMode;
    }
    events() {
      return super.events(...arguments).concat({
        'click .action-button': this.onClickActionButton
      });
    }
    onClickActionButton(event) {
      var action;
      action = this.currentData();
      if (action.enabled && !action.enabled()) {
        return;
      }
      return action.execute(this);
    }
  }
  ;
  Layout.register(Layout.id());
  return Layout;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.layout.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/layout/template.layout.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Layout");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Layout"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Layout", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-easel-layout"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("layoutStyle"));
  }), "\n    ", HTML.DIV({
    class: "frame"
  }, HTML.Raw('\n      <div class="frame-bottom"></div>\n      '), HTML.DIV({
    class: "tray"
  }, HTML.Raw('\n        <div class="tray-back"></div>\n        <div class="tray-front"></div>\n        '), Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("toolboxData"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("FataMorgana"), "Area"));
    });
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("colorFillEnabled"));
  }, function() {
    return [ "\n          ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("colorFillData"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("FataMorgana"), "Area"));
      });
    }), "\n        " ];
  }), "\n        ", HTML.UL({
    class: "actions"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("get"), "actions"));
  }, function() {
    return [ "\n            ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("action"));
    }, function() {
      return [ "\n              ", HTML.LI({
        class: function() {
          return [ "action ", Spacebars.mustache(view.lookup("actionClass")), " ", Spacebars.mustache(view.lookup("actionEnabledClass")) ];
        },
        title: function() {
          return Spacebars.mustache(view.lookup("actionTooltip"));
        }
      }, "\n                ", HTML.BUTTON({
        class: "action-button"
      }, "\n                  ", HTML.SPAN({
        class: "name"
      }, Blaze.View("lookup:displayName", function() {
        return Spacebars.mustache(view.lookup("displayName"));
      })), "\n                "), "\n              "), "\n            " ];
    }), "\n          " ];
  }), "\n        "), "\n      "), HTML.Raw('\n      <div class="frame-top-back"></div>\n      '), HTML.DIV(HTML.Attrs({
    class: "movable-stand"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("movableStandStyle"));
  }), HTML.Raw('\n        <div class="movable-stand-bottom"></div>\n        '), HTML.DIV(HTML.Attrs({
    class: "movable-stand-top"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("movableStandTopStyle"));
  })), "\n        ", HTML.DIV(HTML.Attrs({
    class: "asset-placeholder"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("assetPlaceholderStyle"));
  })), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pixelcanvas":{"pixelcanvas.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/pixelcanvas/pixelcanvas.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas = function () {
  class PixelCanvas extends LOI.Assets.SpriteEditor.PixelCanvas {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas';
    }
    template() {
      return this.constructor.id();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.drawing = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
      this.easel = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Easel);

      // Allow triggering asset style change.
      this.assetStyleChangeDependency = new Tracker.Dependency();

      // Do updates when asset changes.
      this.autorun(computation => {
        var portfolioAsset;
        if (!(portfolioAsset = this.drawing.portfolio().displayedAsset())) {
          return;
        }

        // Wait until the asset is ready.
        portfolioAsset.asset.ready();

        // Trigger asset style change after delay. We need this delay to allow for asset data in the
        // clipboard to update, which will change the position of the asset when attached to the clipboard.
        return Meteor.setTimeout(() => {
          return this.assetStyleChangeDependency.changed();
        });
      });
      this.clipboardComponent = new ComputedField(() => {
        var clipboardComponent, ref;
        if (!(clipboardComponent = (ref = this.easel.displayedAsset()) != null ? ref.clipboardComponent : void 0)) {
          return;
        }
        if (!clipboardComponent.isCreated()) {
          return;
        }
        return clipboardComponent;
      });

      // Update camera scale.
      this.clipboardCameraScaleSet = new ReactiveField(false);
      this.autorun(computation => {
        var camera, clipboardAssetScale, clipboardAssetSize, displayedAsset, normalDisplayMode;
        if (!(camera = this.camera())) {
          return;
        }
        if (!(displayedAsset = this.easel.displayedAsset())) {
          return;
        }
        if (!displayedAsset.clipboardComponent.isCreated()) {
          return;
        }
        if (!(clipboardAssetSize = displayedAsset.clipboardComponent.assetSize())) {
          return;
        }

        // Dictate camera scale when asset is on clipboard and normal display mode.
        clipboardAssetScale = clipboardAssetSize.scale;
        normalDisplayMode = this.easel.displayMode() === PAA.PixelPad.Apps.Drawing.Editor.Easel.DisplayModes.Normal;
        if (!this.easel.active() || normalDisplayMode || displayedAsset !== this._previousDisplayedAsset || clipboardAssetScale !== this._previousClipboardSpriteScale) {
          Tracker.nonreactive(() => {
            camera.setScale(clipboardAssetScale);
            return this.clipboardCameraScaleSet(true);
          });
        }
        this._previousDisplayedAsset = displayedAsset;
        return this._previousClipboardSpriteScale = clipboardAssetScale;
      });

      // Switch between full and framed display modes.
      return this.autorun(computation => {
        var easelActive;
        easelActive = this.easel.active();
        return Tracker.nonreactive(() => {
          var newDisplayMode;
          newDisplayMode = easelActive ? LOI.Assets.SpriteEditor.PixelCanvas.DisplayModes.Framed : LOI.Assets.SpriteEditor.PixelCanvas.DisplayModes.Full;
          return this.displayMode(newDisplayMode);
        });
      });
    }
    hiddenClass() {
      var ref;
      if ((ref = this.clipboardComponent()) != null ? typeof ref.secondPageActive === "function" ? ref.secondPageActive() : void 0 : void 0) {
        // Don't show the asset when clipboard is on the second page.
        return 'hidden';
      }
    }
    drawingAreaStyle() {
      var $assetPlaceholder, $clipboard, activeAsset, activeZoomedIn, assetData, assetOffset, backgroundColor, borderWidth, clipboardAssetSize, displayScale, displayedAsset, editorActive, height, left, offScreenStyle, positionOrigin, scale, style, top, width;
      // Allow to be updated externally.
      this.assetStyleChangeDependency.depend();
      // If nothing else, we should move the asset off screen.
      offScreenStyle = {
        top: '-200rem'
      };
      if (!this.drawing.clipboard().isRendered()) {
        // Wait for clipboard to be rendered.
        return offScreenStyle;
      }
      if (!(displayedAsset = this.easel.displayedAsset())) {
        // If we don't have size data, don't return anything so transition will start form first value.
        return offScreenStyle;
      }
      if (!displayedAsset.clipboardComponent.isCreated()) {
        return offScreenStyle;
      }
      if (!(clipboardAssetSize = displayedAsset.clipboardComponent.assetSize())) {
        return offScreenStyle;
      }
      if (!(assetData = displayedAsset.document())) {
        return offScreenStyle;
      }
      editorActive = this.easel.active();
      activeZoomedIn = editorActive && this.easel.displayMode() !== PAA.PixelPad.Apps.Drawing.Editor.Easel.DisplayModes.Normal;
      if (activeZoomedIn) {
        if (!(scale = this.camera().scale())) {
          // When the editor is open and zoomed in, the size depends on the internal pixel canvas camera scale.
          return offScreenStyle;
        }
      } else {
        // When we're on the clipboard or in normal display mode, the size depends on the size provided by the asset's clipboard component.
        scale = clipboardAssetSize.scale;
      }
      width = assetData.bounds.width * scale;
      height = assetData.bounds.height * scale;
      displayScale = LOI.adventure.interface.display.scale();
      // Resize the border proportionally to its clipboard size
      borderWidth = clipboardAssetSize.borderWidth / clipboardAssetSize.scale * scale;
      if (editorActive) {
        // Let the parent implementation handle positioning.
        style = super.drawingAreaStyle(...arguments);

        // Remove the border.
        style.left = "".concat(style.left.substring(0, style.left.length - 1), " - ").concat(borderWidth, "rem)");
        style.top = "".concat(style.top.substring(0, style.top.length - 1), " - ").concat(borderWidth, "rem)");
      } else {
        $assetPlaceholder = $('.pixelartacademy-pixelpad-apps-drawing-clipboard .asset-placeholder');
        if (!$assetPlaceholder.length) {
          // Force re-measure after the asset placeholder is visible again.
          Meteor.setTimeout(() => {
            return this.assetStyleChangeDependency.changed();
          });
          return {};
        }
        assetOffset = $assetPlaceholder.offset();
        $clipboard = $('.pixelartacademy-pixelpad-apps-drawing-clipboard');
        positionOrigin = $clipboard.offset();
        // Make these measurements relative to clipboard center.
        positionOrigin.left += $clipboard.width() / 2;
        left = assetOffset.left - positionOrigin.left;
        left = "calc(50% + ".concat(left, "px)");
        // Top is relative to center only when we have an active asset.
        activeAsset = this.easel.activeAsset();
        if (activeAsset) {
          positionOrigin.top += $clipboard.height() / 2;
        }
        top = assetOffset.top - positionOrigin.top;
        if (activeAsset) {
          top = "calc(50% + ".concat(top, "px)");
        } else {
          // Clipboard is hidden up, so move the asset up and relative to top.
          top -= 265 * displayScale;
        }
        style = {
          width: "".concat(width, "rem"),
          height: "".concat(height, "rem"),
          left: left,
          top: top
        };
      }
      style.borderWidth = "".concat(borderWidth, "rem");
      if (backgroundColor = typeof displayedAsset.backgroundColor === "function" ? displayedAsset.backgroundColor() : void 0) {
        style.backgroundColor = "#".concat(backgroundColor.getHexString());
        style.borderColor = style.backgroundColor;
      }
      return style;
    }
  }
  ;
  PixelCanvas.register(PixelCanvas.id());
  return PixelCanvas;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pixelcanvas.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/pixelcanvas/template.pixelcanvas.js               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.PixelCanvas", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-assets-spriteeditor-pixelcanvas pixelartacademy-pixelpad-apps-drawing-editor-easel-pixelcanvas"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "drawing-area ", Spacebars.mustache(Spacebars.dot(view.lookup("easel"), "displayedAsset", "styleClasses")), " ", Spacebars.mustache(view.lookup("hiddenClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("drawingAreaStyle"));
  }), "\n      ", HTML.CANVAS(HTML.Attrs({
    class: "canvas"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("canvasStyle"));
  })), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"colorfill":{"colorfill.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/colorfill/colorfill.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, FM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.PixelPad.Apps.Drawing.Editor.Easel.ColorFill = function () {
  class ColorFill extends FM.View {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.ColorFill';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.paintHelper = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.Paint);
      return this.currentColor = new ComputedField(() => {
        return this.paintHelper.getColor();
      });
    }
    colorStyle() {
      var active, color;
      // Get the color from the palette.
      color = this.currentColor();
      if (!color) {
        return;
      }
      active = this.interface.activeToolId() === LOI.Assets.SpriteEditor.Tools.ColorFill.id();
      return {
        backgroundColor: "#".concat(color.getHexString()),
        opacity: active ? 1 : 0.8
      };
    }
  }
  ;
  ColorFill.register(ColorFill.id());
  return ColorFill;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.colorfill.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/colorfill/template.colorfill.js                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.ColorFill");
Template["PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.ColorFill"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.ColorFill", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-drawing-editor-easel-colorfill"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: "color top"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("colorStyle"));
  })), "\n    ", HTML.DIV(HTML.Attrs({
    class: "color bottom"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("colorStyle"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tools":{"tools.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/tools/tools.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, LOI, PAA;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools = class Tools {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"brush":{"brush.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/brush.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush = class Brush extends LOI.Assets.SpriteEditor.Tools.Tool {
  extraToolClasses() {
    return 'brush';
  }
  constructor() {
    super(...arguments);
    this.drawLine = new ReactiveField(false);
    this.drawStraight = new ReactiveField(false);
    this.lastCoordinates = new ReactiveField(null);
    this.currentCoordinates = new ReactiveField(null);
    this.lastStrokeCoordinates = new ReactiveField(null);
    this.secondToLastStrokeCoordinates = new ReactiveField(null);
    this.lockedCoordinate = new ReactiveField(null);
    this.perfectAngleDegrees = new ReactiveField(null);
    this.paintHelper = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.Paint);
    this.brushHelper = this.interface.getHelper(LOI.Assets.SpriteEditor.Helpers.Brush);
    this.changedArea = new ReactiveField(null);
  }
  onActivated() {
    this.processStroke();
    return this._cursorChangesAutorun = this.autorun(computation => {
      var ref;
      // React to cursor changes.
      if (!((ref = this.editor()) != null ? ref.cursor().cursorArea() : void 0)) {
        return;
      }
      return Tracker.nonreactive(() => {
        return this.processStroke();
      });
    });
  }
  onDeactivated() {
    return this._cursorChangesAutorun.stop();
  }
  cursorType() {
    return LOI.Assets.SpriteEditor.PixelCanvas.Cursor.Types.AntiAliasedBrush;
  }
  infoText() {
    var angle;
    if (!this.drawLine()) {
      return;
    }
    if (!(angle = this.perfectAngleDegrees())) {
      return;
    }
    return "".concat(angle, "\xB0");
  }
  onKeyDown(event) {
    var keyboardState;
    super.onKeyDown(...arguments);
    if (event.which === AC.Keys.shift) {
      // See if we've already started drawing.
      if (this.pointerState.mainButton) {
        // We're already mid-stroke so we want to detect in which direction to lock the coordinate.
        this.lockedCoordinate(null);
        return this.drawStraight(true);
      } else {
        // When not drawing, shift triggers line drawing, but make sure no other modifiers are
        // pressed, since that would mean we're probably in the middle of executing a shortcut.
        keyboardState = AC.Keyboard.getState();
        if (!(keyboardState.isCommandOrControlDown() || keyboardState.isKeyDown(AC.Keys.alt))) {
          this.drawLine(true);
          return this.updateChangedArea();
        }
      }
    } else if (this.drawLine()) {
      // React to any modifier changes when line drawing.
      return this.updateChangedArea();
    }
  }
  onKeyUp(event) {
    super.onKeyUp(...arguments);
    if (event.which === AC.Keys.shift) {
      this.drawStraight(false);
      this.drawLine(false);
      return this.updateChangedArea();
    } else if (this.drawLine()) {
      // React to any modifier changes when line drawing.
      return this.updateChangedArea();
    }
  }
  onPointerDown(event) {
    super.onPointerDown(...arguments);
    // Register that the stroke has just started.
    this._strokeStarted = true;
    this._strokeActive = true;
    // If pointer down and move happen in the same frame (such as when using a stylus), allow the cursor to fully update.
    return Tracker.afterFlush(() => {
      return this.processStroke();
    });
  }
  onPointerUp(event) {
    var assetData;
    super.onPointerUp(...arguments);
    if (!this._strokeActive) {
      return;
    }
    // End stroke.
    this.lastStrokeCoordinates(null);
    this.secondToLastStrokeCoordinates(null);
    this.drawStraight(false);
    this.updateChangedArea();
    assetData = this.editor().assetData();
    this.endStroke(assetData);
    return this._strokeActive = false;
  }
  processStroke() {
    var currentCoordinates, cursorArea, newPixelCoordinates, ref;
    currentCoordinates = this.currentCoordinates();
    if (!(cursorArea = (ref = this.editor()) != null ? ref.cursor().cursorArea() : void 0)) {
      return;
    }
    if (cursorArea.position) {
      newPixelCoordinates = _.clone(cursorArea.position.centerCoordinates);
      if (this.drawStraight()) {
        _.extend(newPixelCoordinates, this.lockedCoordinate());
      }
    }
    // Update coordinates if they are new.
    if (!EJSON.equals(currentCoordinates, newPixelCoordinates)) {
      this.currentCoordinates(newPixelCoordinates);
    }
    return this.updateChangedArea();
  }
  updateChangedArea() {
    var assetData, bezierMidPoint, brushCoordinates, brushX, brushY, column, currentPixelCoordinates, cursorArea, drawStraight, i, j, k, keyboardState, lastPixelCoordinates, lastStrokeCoordinates, len, len1, len2, lockedCoordinate, midPoint, offset, pixel, pixelCoordinates, ray, ref, row, secondToLastStrokeCoordinates, tangentDirection, value, x, y;
    return;

    // Calculate which pixels the tool would fill.
    if (!(currentPixelCoordinates = this.currentCoordinates())) {
      return;
    }
    currentPixelCoordinates = new THREE.Vector2().copy(currentPixelCoordinates);
    lastPixelCoordinates = new THREE.Vector2().copy(this.lastCoordinates() || currentPixelCoordinates);
    lastStrokeCoordinates = new THREE.Vector2().copy(this.lastStrokeCoordinates() || currentPixelCoordinates);
    secondToLastStrokeCoordinates = new THREE.Vector2().copy(this.secondToLastStrokeCoordinates() || lastStrokeCoordinates);
    keyboardState = AC.Keyboard.getState();
    pixelCoordinates = [];
    drawStraight = this.drawStraight();
    if (this.pointerState.mainButton && drawStraight) {
      if (!(lockedCoordinate = this.lockedCoordinate())) {
        // Calculate which direction to lock to.
        if (currentPixelCoordinates.x === lastPixelCoordinates.x) {
          // Lock to vertical straight lines.
          lockedCoordinate = {
            x: lastPixelCoordinates.x
          };
        } else {
          lockedCoordinate = {
            y: lastPixelCoordinates.y
          };
        }
        this.lockedCoordinate(lockedCoordinate);
      }
    }
    if (this.drawLine()) {
      if (keyboardState.isMetaDown()) {
        // Draw perfect pixel art line.
        pixelCoordinates = this.perfectLine(lastPixelCoordinates, currentPixelCoordinates);
        // Match current coordinates to the ending perfect coordinates.
        this.currentCoordinates(_.last(pixelCoordinates));
      } else {
        this.perfectAngleDegrees(null);
      }
    } else {
      // Apply locked coordinate.
      // Draw bresenham line from last coordinates (which persist after end of stroke).
      // Bresenham.line lastPixelCoordinates.x, lastPixelCoordinates.y, currentPixelCoordinates.x, currentPixelCoordinates.y, (x, y) => pixelCoordinates.push {x, y}
      if (drawStraight) {} else {
        // Draw bezier curve from last stroke coordinates (which resets after end of stroke).
        // Draw bresenham line from last stroke coordinates (which resets after end of stroke).
        // Bresenham.line lastStrokeCoordinates.x, lastStrokeCoordinates.y, currentPixelCoordinates.x, currentPixelCoordinates.y, (x, y) => pixelCoordinates.push {x, y}
        tangentDirection = new THREE.Vector2().subVectors(currentPixelCoordinates, secondToLastStrokeCoordinates).normalize();
        midPoint = lastStrokeCoordinates.clone().add(currentPixelCoordinates).multiplyScalar(0.5);
        // Project mid-point to the tangent going from last point.
        ray = new THREE.Ray(lastStrokeCoordinates, tangentDirection);
        bezierMidPoint = new THREE.Vector2();
        ray.closestPointToPoint(midPoint, bezierMidPoint);
        bezierMidPoint.round();
      }
    }
    // Bresenham.quadBezier lastStrokeCoordinates.x, lastStrokeCoordinates.y, bezierMidPoint.x, bezierMidPoint.y, currentPixelCoordinates.x, currentPixelCoordinates.y, (x, y) => pixelCoordinates.push {x, y}

    // Apply the brush mask to coordinates.
    cursorArea = this.editor().cursor().cursorArea();
    offset = cursorArea.position.centerOffset;
    brushCoordinates = {};
    for (i = 0, len = pixelCoordinates.length; i < len; i++) {
      pixel = pixelCoordinates[i];
      ref = cursorArea.shape;
      for (x = j = 0, len1 = ref.length; j < len1; x = ++j) {
        column = ref[x];
        for (y = k = 0, len2 = column.length; k < len2; y = ++k) {
          value = column[y];
          if (!value) {
            continue;
          }
          brushX = pixel.x - offset + x;
          brushY = pixel.y - offset + y;
          if (brushCoordinates[brushX] == null) {
            brushCoordinates[brushX] = {};
          }
          brushCoordinates[brushX][brushY] = {
            x: brushX,
            y: brushY
          };
        }
      }
    }
    // Collect created pixels.
    pixelCoordinates = [];
    for (x in brushCoordinates) {
      row = brushCoordinates[x];
      for (y in row) {
        pixel = row[y];
        pixelCoordinates.push(pixel);
      }
    }
    // TODO: Apply symmetry.
    // symmetryXOrigin = @options.editor().symmetryXOrigin?()
    //if symmetryXOrigin?
    //  mirroredX = -@pointerState.x + 2 * symmetryXOrigin
    //  xCoordinates.push [mirroredX, -1]
    assetData = this.editor().assetData();
    this.pixels(this.createPixelsFromCoordinates(assetData, pixelCoordinates));
    return this.applyTool();
  }
  applyTool() {
    var absolutePixel, absolutePixels, assetData, currentPixelCoordinates, i, layer, layerIndex, layerOrigin, len, ref, ref1, ref2, ref3, ref4, ref5, relativePixel, relativePixels;
    if (!this.pointerState.mainButton) {
      return;
    }
    assetData = this.editor().assetData();
    layerIndex = this.paintHelper.layerIndex();
    layer = (ref = assetData.layers) != null ? ref[layerIndex] : void 0;
    layerOrigin = {
      x: (layer != null ? (ref1 = layer.origin) != null ? ref1.x : void 0 : void 0) || 0,
      y: (layer != null ? (ref2 = layer.origin) != null ? ref2.y : void 0 : void 0) || 0
    };
    absolutePixels = this.pixels();
    relativePixels = [];
    for (i = 0, len = absolutePixels.length; i < len; i++) {
      absolutePixel = absolutePixels[i];
      // If we have fixed bounds, make sure we're inside.
      if ((ref3 = assetData.bounds) != null ? ref3.fixed : void 0) {
        if (!(assetData.bounds.left <= (ref4 = absolutePixel.x) && ref4 <= assetData.bounds.right && assetData.bounds.top <= (ref5 = absolutePixel.y) && ref5 <= assetData.bounds.bottom)) {
          continue;
        }
      }
      // Pixel must be in relative coordinates.
      relativePixel = _.clone(absolutePixel);
      relativePixel.x -= layerOrigin.x;
      relativePixel.y -= layerOrigin.y;
      relativePixels.push(relativePixel);
    }
    this.applyPixels(assetData, layerIndex, relativePixels, this._strokeStarted);
    // Save start of current stroke segment to allow smoothing.
    this.secondToLastStrokeCoordinates(this.lastStrokeCoordinates());
    // Save last absolute pixel as the end of the stroke.
    currentPixelCoordinates = this.currentCoordinates();
    this.lastCoordinates(currentPixelCoordinates);
    return this.lastStrokeCoordinates(currentPixelCoordinates);
  }
  startOfStrokeProcessed() {
    return this._strokeStarted = false;
  }
  applyPixels(assetData, layerIndex, relativePixels, strokeStarted) {}

  // Override to process new pixels being added to the stroke.
  endStroke(assetData) {}
};

// Override to process the end of the stroke.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"square.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/square.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Square = function () {
  class Square extends PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brushes.Square';
    }
    static displayName() {
      return "Square brush";
    }
    onActivated() {
      super.onActivated(...arguments);
      return this.brushHelper.setRound(false);
    }
  }
  ;
  Square.initialize();
  return Square;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixel.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/pixel.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Pixel = function () {
  class Pixel extends LOI.Assets.SpriteEditor.Tools.Pencil {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brushes.Pixel';
    }
    static displayName() {
      return "Pixel brush";
    }
    extraToolClasses() {
      return 'brush';
    }
    onActivated() {
      super.onActivated(...arguments);
      this.brushHelper.setRound(true);

      // Have our separate size for the pixel brush.
      this._previousToolBrushDiameter = this.brushHelper.diameter();
      return this.brushHelper.setDiameter(this._lastBrushDiameter || 1);
    }
    onDeactivated() {
      super.onDeactivated(...arguments);

      // Restore the previous brush size for other tools.
      this._lastBrushDiameter = this.brushHelper.diameter();
      return this.brushHelper.setDiameter(this._previousToolBrushDiameter);
    }
  }
  ;
  Pixel.initialize();
  return Pixel;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"round.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/round.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush.Round = function () {
  class Round extends PAA.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brush {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Tools.Brushes.Round';
    }
    static displayName() {
      return "Round brush";
    }
    onActivated() {
      super.onActivated(...arguments);
      return this.brushHelper.setRound(true);
    }
  }
  ;
  Round.initialize();
  return Round;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"actions":{"actions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/actions/actions.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, LOI, PAA;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Actions = class Actions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"displaymode.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/actions/displaymode.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Actions.DisplayMode = function () {
  class DisplayMode extends FM.Action {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Actions.DisplayMode';
    }
    static displayName() {
      return "Cycle display mode";
    }
    constructor() {
      super(...arguments);
      this.easel = this.interface.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing.Editor.Easel);
    }
    execute() {
      return this.easel.cycleDisplayMode();
    }
  }
  ;
  DisplayMode.initialize();
  return DisplayMode;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"clearpaint.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-drawing/editor/easel/actions/clearpaint.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Drawing.Editor.Easel.Actions.ClearPaint = function () {
  class ClearPaint extends FM.Action {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Drawing.Editor.Easel.Actions.ClearPaint';
    }
    static displayName() {
      return "Clear paint";
    }
  }
  ;
  ClearPaint.initialize();
  return ClearPaint;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"node_modules":{"jszip":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixelpad-drawing/node_modules/jszip/package.json                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "jszip",
  "version": "3.10.1",
  "browser": {
    "./lib/index": "./dist/jszip.min.js",
    "readable-stream": "./lib/readable-stream-browser.js"
  },
  "main": "./lib/index"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":"/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/node_modules/jszip/dist/jszip.min.js"},"dist":{"jszip.min.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixelpad-drawing/node_modules/jszip/dist/jszip.min.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"stackblur-canvas":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixelpad-drawing/node_modules/stackblur-canvas/package.json          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "stackblur-canvas",
  "version": "2.4.0",
  "main": "dist/stackblur.js",
  "module": "dist/stackblur-es.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dist":{"stackblur.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixelpad-drawing/node_modules/stackblur-canvas/dist/stackblur.js     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.StackBlur = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /* eslint-disable no-bitwise -- used for calculations */

  /* eslint-disable unicorn/prefer-query-selector -- aiming at
    backward-compatibility */

  /**
  * StackBlur - a fast almost Gaussian Blur For Canvas
  *
  * In case you find this class useful - especially in commercial projects -
  * I am not totally unhappy for a small donation to my PayPal account
  * mario@quasimondo.de
  *
  * Or support me on flattr:
  * {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
  *
  * @module StackBlur
  * @author Mario Klingemann
  * Contact: mario@quasimondo.com
  * Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
  * Twitter: @quasimondo
  *
  * @copyright (c) 2010 Mario Klingemann
  *
  * Permission is hereby granted, free of charge, to any person
  * obtaining a copy of this software and associated documentation
  * files (the "Software"), to deal in the Software without
  * restriction, including without limitation the rights to use,
  * copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the
  * Software is furnished to do so, subject to the following
  * conditions:
  *
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  * OTHER DEALINGS IN THE SOFTWARE.
  */
  var mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
  var shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
  /**
   * @param {string|HTMLImageElement} img
   * @param {string|HTMLCanvasElement} canvas
   * @param {Float} radius
   * @param {boolean} blurAlphaChannel
   * @param {boolean} useOffsetWidth
   * @returns {undefined}
   */

  function processImage(img, canvas, radius, blurAlphaChannel, useOffsetWidth) {
    if (typeof img === 'string') {
      img = document.getElementById(img);
    }

    if (!img || !('naturalWidth' in img)) {
      return;
    }

    var dimensionType = useOffsetWidth ? 'offset' : 'natural';
    var w = img[dimensionType + 'Width'];
    var h = img[dimensionType + 'Height'];

    if (typeof canvas === 'string') {
      canvas = document.getElementById(canvas);
    }

    if (!canvas || !('getContext' in canvas)) {
      return;
    }

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w;
    canvas.height = h;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h);

    if (isNaN(radius) || radius < 1) {
      return;
    }

    if (blurAlphaChannel) {
      processCanvasRGBA(canvas, 0, 0, w, h, radius);
    } else {
      processCanvasRGB(canvas, 0, 0, w, h, radius);
    }
  }
  /**
   * @param {string|HTMLCanvasElement} canvas
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @throws {Error|TypeError}
   * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
   */


  function getImageDataFromCanvas(canvas, topX, topY, width, height) {
    if (typeof canvas === 'string') {
      canvas = document.getElementById(canvas);
    }

    if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) {
      throw new TypeError('Expecting canvas with `getContext` method ' + 'in processCanvasRGB(A) calls!');
    }

    var context = canvas.getContext('2d');

    try {
      return context.getImageData(topX, topY, width, height);
    } catch (e) {
      throw new Error('unable to access image data: ' + e);
    }
  }
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {undefined}
   */


  function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
    if (isNaN(radius) || radius < 1) {
      return;
    }

    radius |= 0;
    var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
    imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
    canvas.getContext('2d').putImageData(imageData, topX, topY);
  }
  /**
   * @param {ImageData} imageData
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {ImageData}
   */


  function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
    var pixels = imageData.data;
    var div = 2 * radius + 1; // const w4 = width << 2;

    var widthMinus1 = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    var stackStart = new BlurStack();
    var stack = stackStart;
    var stackEnd;

    for (var i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();

      if (i === radiusPlus1) {
        stackEnd = stack;
      }
    }

    stack.next = stackStart;
    var stackIn = null,
        stackOut = null,
        yw = 0,
        yi = 0;
    var mulSum = mulTable[radius];
    var shgSum = shgTable[radius];

    for (var y = 0; y < height; y++) {
      stack = stackStart;
      var pr = pixels[yi],
          pg = pixels[yi + 1],
          pb = pixels[yi + 2],
          pa = pixels[yi + 3];

      for (var _i = 0; _i < radiusPlus1; _i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      var rInSum = 0,
          gInSum = 0,
          bInSum = 0,
          aInSum = 0,
          rOutSum = radiusPlus1 * pr,
          gOutSum = radiusPlus1 * pg,
          bOutSum = radiusPlus1 * pb,
          aOutSum = radiusPlus1 * pa,
          rSum = sumFactor * pr,
          gSum = sumFactor * pg,
          bSum = sumFactor * pb,
          aSum = sumFactor * pa;

      for (var _i2 = 1; _i2 < radiusPlus1; _i2++) {
        var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
        var r = pixels[p],
            g = pixels[p + 1],
            b = pixels[p + 2],
            a = pixels[p + 3];
        var rbs = radiusPlus1 - _i2;
        rSum += (stack.r = r) * rbs;
        gSum += (stack.g = g) * rbs;
        bSum += (stack.b = b) * rbs;
        aSum += (stack.a = a) * rbs;
        rInSum += r;
        gInSum += g;
        bInSum += b;
        aInSum += a;
        stack = stack.next;
      }

      stackIn = stackStart;
      stackOut = stackEnd;

      for (var x = 0; x < width; x++) {
        var paInitial = aSum * mulSum >> shgSum;
        pixels[yi + 3] = paInitial;

        if (paInitial !== 0) {
          var _a2 = 255 / paInitial;

          pixels[yi] = (rSum * mulSum >> shgSum) * _a2;
          pixels[yi + 1] = (gSum * mulSum >> shgSum) * _a2;
          pixels[yi + 2] = (bSum * mulSum >> shgSum) * _a2;
        } else {
          pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
        }

        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        aSum -= aOutSum;
        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        aOutSum -= stackIn.a;

        var _p = x + radius + 1;

        _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
        rInSum += stackIn.r = pixels[_p];
        gInSum += stackIn.g = pixels[_p + 1];
        bInSum += stackIn.b = pixels[_p + 2];
        aInSum += stackIn.a = pixels[_p + 3];
        rSum += rInSum;
        gSum += gInSum;
        bSum += bInSum;
        aSum += aInSum;
        stackIn = stackIn.next;
        var _stackOut = stackOut,
            _r = _stackOut.r,
            _g = _stackOut.g,
            _b = _stackOut.b,
            _a = _stackOut.a;
        rOutSum += _r;
        gOutSum += _g;
        bOutSum += _b;
        aOutSum += _a;
        rInSum -= _r;
        gInSum -= _g;
        bInSum -= _b;
        aInSum -= _a;
        stackOut = stackOut.next;
        yi += 4;
      }

      yw += width;
    }

    for (var _x = 0; _x < width; _x++) {
      yi = _x << 2;

      var _pr = pixels[yi],
          _pg = pixels[yi + 1],
          _pb = pixels[yi + 2],
          _pa = pixels[yi + 3],
          _rOutSum = radiusPlus1 * _pr,
          _gOutSum = radiusPlus1 * _pg,
          _bOutSum = radiusPlus1 * _pb,
          _aOutSum = radiusPlus1 * _pa,
          _rSum = sumFactor * _pr,
          _gSum = sumFactor * _pg,
          _bSum = sumFactor * _pb,
          _aSum = sumFactor * _pa;

      stack = stackStart;

      for (var _i3 = 0; _i3 < radiusPlus1; _i3++) {
        stack.r = _pr;
        stack.g = _pg;
        stack.b = _pb;
        stack.a = _pa;
        stack = stack.next;
      }

      var yp = width;
      var _gInSum = 0,
          _bInSum = 0,
          _aInSum = 0,
          _rInSum = 0;

      for (var _i4 = 1; _i4 <= radius; _i4++) {
        yi = yp + _x << 2;

        var _rbs = radiusPlus1 - _i4;

        _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
        _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
        _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
        _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
        _rInSum += _pr;
        _gInSum += _pg;
        _bInSum += _pb;
        _aInSum += _pa;
        stack = stack.next;

        if (_i4 < heightMinus1) {
          yp += width;
        }
      }

      yi = _x;
      stackIn = stackStart;
      stackOut = stackEnd;

      for (var _y = 0; _y < height; _y++) {
        var _p2 = yi << 2;

        pixels[_p2 + 3] = _pa = _aSum * mulSum >> shgSum;

        if (_pa > 0) {
          _pa = 255 / _pa;
          pixels[_p2] = (_rSum * mulSum >> shgSum) * _pa;
          pixels[_p2 + 1] = (_gSum * mulSum >> shgSum) * _pa;
          pixels[_p2 + 2] = (_bSum * mulSum >> shgSum) * _pa;
        } else {
          pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
        }

        _rSum -= _rOutSum;
        _gSum -= _gOutSum;
        _bSum -= _bOutSum;
        _aSum -= _aOutSum;
        _rOutSum -= stackIn.r;
        _gOutSum -= stackIn.g;
        _bOutSum -= stackIn.b;
        _aOutSum -= stackIn.a;
        _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
        _rSum += _rInSum += stackIn.r = pixels[_p2];
        _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
        _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
        _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
        stackIn = stackIn.next;
        _rOutSum += _pr = stackOut.r;
        _gOutSum += _pg = stackOut.g;
        _bOutSum += _pb = stackOut.b;
        _aOutSum += _pa = stackOut.a;
        _rInSum -= _pr;
        _gInSum -= _pg;
        _bInSum -= _pb;
        _aInSum -= _pa;
        stackOut = stackOut.next;
        yi += width;
      }
    }

    return imageData;
  }
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {undefined}
   */


  function processCanvasRGB(canvas, topX, topY, width, height, radius) {
    if (isNaN(radius) || radius < 1) {
      return;
    }

    radius |= 0;
    var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
    imageData = processImageDataRGB(imageData, topX, topY, width, height, radius);
    canvas.getContext('2d').putImageData(imageData, topX, topY);
  }
  /**
   * @param {ImageData} imageData
   * @param {Integer} topX
   * @param {Integer} topY
   * @param {Integer} width
   * @param {Integer} height
   * @param {Float} radius
   * @returns {ImageData}
   */


  function processImageDataRGB(imageData, topX, topY, width, height, radius) {
    var pixels = imageData.data;
    var div = 2 * radius + 1; // const w4 = width << 2;

    var widthMinus1 = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    var stackStart = new BlurStack();
    var stack = stackStart;
    var stackEnd;

    for (var i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();

      if (i === radiusPlus1) {
        stackEnd = stack;
      }
    }

    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;
    var mulSum = mulTable[radius];
    var shgSum = shgTable[radius];
    var p, rbs;
    var yw = 0,
        yi = 0;

    for (var y = 0; y < height; y++) {
      var pr = pixels[yi],
          pg = pixels[yi + 1],
          pb = pixels[yi + 2],
          rOutSum = radiusPlus1 * pr,
          gOutSum = radiusPlus1 * pg,
          bOutSum = radiusPlus1 * pb,
          rSum = sumFactor * pr,
          gSum = sumFactor * pg,
          bSum = sumFactor * pb;
      stack = stackStart;

      for (var _i5 = 0; _i5 < radiusPlus1; _i5++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack = stack.next;
      }

      var rInSum = 0,
          gInSum = 0,
          bInSum = 0;

      for (var _i6 = 1; _i6 < radiusPlus1; _i6++) {
        p = yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6) << 2);
        rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _i6);
        gSum += (stack.g = pg = pixels[p + 1]) * rbs;
        bSum += (stack.b = pb = pixels[p + 2]) * rbs;
        rInSum += pr;
        gInSum += pg;
        bInSum += pb;
        stack = stack.next;
      }

      stackIn = stackStart;
      stackOut = stackEnd;

      for (var x = 0; x < width; x++) {
        pixels[yi] = rSum * mulSum >> shgSum;
        pixels[yi + 1] = gSum * mulSum >> shgSum;
        pixels[yi + 2] = bSum * mulSum >> shgSum;
        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
        rInSum += stackIn.r = pixels[p];
        gInSum += stackIn.g = pixels[p + 1];
        bInSum += stackIn.b = pixels[p + 2];
        rSum += rInSum;
        gSum += gInSum;
        bSum += bInSum;
        stackIn = stackIn.next;
        rOutSum += pr = stackOut.r;
        gOutSum += pg = stackOut.g;
        bOutSum += pb = stackOut.b;
        rInSum -= pr;
        gInSum -= pg;
        bInSum -= pb;
        stackOut = stackOut.next;
        yi += 4;
      }

      yw += width;
    }

    for (var _x2 = 0; _x2 < width; _x2++) {
      yi = _x2 << 2;

      var _pr2 = pixels[yi],
          _pg2 = pixels[yi + 1],
          _pb2 = pixels[yi + 2],
          _rOutSum2 = radiusPlus1 * _pr2,
          _gOutSum2 = radiusPlus1 * _pg2,
          _bOutSum2 = radiusPlus1 * _pb2,
          _rSum2 = sumFactor * _pr2,
          _gSum2 = sumFactor * _pg2,
          _bSum2 = sumFactor * _pb2;

      stack = stackStart;

      for (var _i7 = 0; _i7 < radiusPlus1; _i7++) {
        stack.r = _pr2;
        stack.g = _pg2;
        stack.b = _pb2;
        stack = stack.next;
      }

      var _rInSum2 = 0,
          _gInSum2 = 0,
          _bInSum2 = 0;

      for (var _i8 = 1, yp = width; _i8 <= radius; _i8++) {
        yi = yp + _x2 << 2;
        _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
        _gSum2 += (stack.g = _pg2 = pixels[yi + 1]) * rbs;
        _bSum2 += (stack.b = _pb2 = pixels[yi + 2]) * rbs;
        _rInSum2 += _pr2;
        _gInSum2 += _pg2;
        _bInSum2 += _pb2;
        stack = stack.next;

        if (_i8 < heightMinus1) {
          yp += width;
        }
      }

      yi = _x2;
      stackIn = stackStart;
      stackOut = stackEnd;

      for (var _y2 = 0; _y2 < height; _y2++) {
        p = yi << 2;
        pixels[p] = _rSum2 * mulSum >> shgSum;
        pixels[p + 1] = _gSum2 * mulSum >> shgSum;
        pixels[p + 2] = _bSum2 * mulSum >> shgSum;
        _rSum2 -= _rOutSum2;
        _gSum2 -= _gOutSum2;
        _bSum2 -= _bOutSum2;
        _rOutSum2 -= stackIn.r;
        _gOutSum2 -= stackIn.g;
        _bOutSum2 -= stackIn.b;
        p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
        _rSum2 += _rInSum2 += stackIn.r = pixels[p];
        _gSum2 += _gInSum2 += stackIn.g = pixels[p + 1];
        _bSum2 += _bInSum2 += stackIn.b = pixels[p + 2];
        stackIn = stackIn.next;
        _rOutSum2 += _pr2 = stackOut.r;
        _gOutSum2 += _pg2 = stackOut.g;
        _bOutSum2 += _pb2 = stackOut.b;
        _rInSum2 -= _pr2;
        _gInSum2 -= _pg2;
        _bInSum2 -= _pb2;
        stackOut = stackOut.next;
        yi += width;
      }
    }

    return imageData;
  }
  /**
   *
   */


  var BlurStack =
  /**
   * Set properties.
   */
  function BlurStack() {
    _classCallCheck(this, BlurStack);

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  };

  exports.BlurStack = BlurStack;
  exports.canvasRGB = processCanvasRGB;
  exports.canvasRGBA = processCanvasRGBA;
  exports.image = processImage;
  exports.imageDataRGB = processImageDataRGB;
  exports.imageDataRGBA = processImageDataRGBA;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/template.drawing.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/portfolio.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/template.portfolio.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/portfolio-initialize.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/folder.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/archive.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/forms/forms.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/forms/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/forms/extras/extras.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/forms/extras/template.extras.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/artworkasset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/clipboardcomponent/clipboardcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/clipboardcomponent/template.clipboardcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/changeartwork/changeartwork.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/changeartwork/template.changeartwork.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/exportartwork/exportartwork.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/exportartwork/template.exportartwork.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/artworkcaption/artworkcaption.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/artworkasset/artworkcaption/template.artworkcaption.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/newartwork/newartwork.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/newartwork/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/newartwork/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/newartwork/clipboardcomponent/clipboardcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/newartwork/clipboardcomponent/template.clipboardcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/importartwork/importartwork.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/importartwork/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/importartwork/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/importartwork/clipboardcomponent/clipboardcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/portfolio/importartwork/clipboardcomponent/template.clipboardcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/clipboard/clipboard.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/clipboard/template.clipboard.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/paletteselection.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/template.paletteselection.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/paletteselection-paletteglow.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/page/page.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/page/cover/cover.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/page/cover/template.cover.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/page/separator/separator.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/page/separator/template.separator.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/page/palette/palette.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/paletteselection/page/palette/template.palette.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/editor.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/editors.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/assetloader.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/pixelcanvascomponents.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/colorhelp.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/tools/tools.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/tools/movecanvas.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/tools/analyze.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/desktop.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/template.desktop.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelcanvas/pixelcanvas.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelcanvas/template.pixelcanvas.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/testpaper/testpaper.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/testpaper/template.testpaper.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/colorfill/colorfill.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/colorfill/template.colorfill.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/zoom/zoom.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/zoom/template.zoom.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pico8/pico8.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pico8/template.pico8.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/ruler/ruler.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/ruler/template.ruler.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/palette/palette.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/palette/template.palette.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/palette/colorhelp/colorhelp.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/palette/colorhelp/template.colorhelp.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/pixelartevaluation.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/template.pixelartevaluation.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/overview/overview.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/overview/template.overview.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/pixelperfectlines/pixelperfectlines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/pixelperfectlines/template.pixelperfectlines.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/evendiagonals/evendiagonals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/evendiagonals/template.evendiagonals.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/smoothcurves/smoothcurves.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/smoothcurves/template.smoothcurves.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/consistentlinewidth/consistentlinewidth.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/pixelartevaluation/consistentlinewidth/template.consistentlinewidth.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/readabilityanalysis/readabilityanalysis.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/readabilityanalysis/template.readabilityanalysis.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/readabilityanalysis/readabilityanalysis-regionrecognitionresult.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/references.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/template.references.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/displaycomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/template.displaycomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/reference.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/default/default.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/default/template.default.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/sceneobject/sceneobject.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/sceneobject/template.sceneobject.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/sceneobject/cartridge/cartridge.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/model.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/template.model.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/cameramanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/scenemanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/renderermanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/references/displaycomponent/reference/model/loader-client.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/publications/publications.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/publications/template.publications.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/publications/newpartinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/actions/focus.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/desktop/actions/zoom.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/easel.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/template.easel.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/layout/layout.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/layout/template.layout.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/pixelcanvas/pixelcanvas.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/pixelcanvas/template.pixelcanvas.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/colorfill/colorfill.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/colorfill/template.colorfill.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/tools/tools.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/brush.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/square.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/pixel.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/tools/brush/round.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/actions/displaymode.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-drawing/editor/easel/actions/clearpaint.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad-drawing", {
  PixelArtAcademy: PixelArtAcademy
});

})();
