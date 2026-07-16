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
var PixelArtAcademy = Package['retronator:pixelartacademy-pico8'].PixelArtAcademy;
var LandsOfIllusions = Package['retronator:landsofillusions'].LandsOfIllusions;
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
var __coffeescriptShare, object;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pico8-invasion":{"invasion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/invasion.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pico8.Cartridges.Invasion = function () {
  class Invasion extends PAA.Pico8.Cartridge {
    // cartridgeRan: whether the cartridge has ever been started
    // highestLevelCompleted: the highest level the player completed
    // highScore: the top result the player has achieved
    static id() {
      return 'PixelArtAcademy.Pico8.Cartridges.Invasion';
    }
    static gameSlug() {
      return 'invasion';
    }
    static projectClass() {
      return this.Project;
    }
    startParameter() {
      return PAA.Pico8.Cartridges.Invasion.DesignDocument.designStringForProjectId(this.projectId());
    }
    onInputOutput(address, value) {
      var highScore, highestLevelCompleted;
      if (value == null) {
        return;
      }
      switch (address) {
        // Running the cartridge
        case 1:
          return this.state('cartridgeRan', true);
        // Level completed
        case 2:
          highestLevelCompleted = this.state('highestLevelCompleted') || 0;
          if (!(value > highestLevelCompleted)) {
            return;
          }
          return this.state('highestLevelCompleted', value);

        // Score achieved
        case 3:
          return this._newScore = value;
        case 4:
          this._newScore += value << 8;
          highScore = this.state('highScore') || 0;
          if (!(this._newScore > highScore)) {
            return;
          }
          return this.state('highScore', this._newScore);
      }
    }
  }
  ;
  Invasion.initialize();

  // Assets
  Invasion.Sprite = class Sprite extends PAA.Practice.Project.Asset.Bitmap {
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Pico8;
    }
    static backgroundColor() {
      return {
        paletteColor: {
          ramp: 0,
          shade: 0
        }
      };
    }
    static availablePublications() {
      return LM.Design.Fundamentals.Publications.getChronoscopeIds().publications;
    }
  };
  Invasion.Defender = function () {
    class Defender extends Invasion.Sprite {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Invasion.Defender';
      }
      static displayName() {
        return "Defender";
      }
      static description() {
        return "负责防御入侵的玩家单位。";
      }
      static fixedDimensions() {
        return {
          width: 16,
          height: 16
        };
      }
      static imageUrl() {
        return '/pixelartacademy/pico8/cartridges/invasion/sprites/defender.png';
      }
    }
    ;
    Defender.initialize();
    return Defender;
  }.call(this);
  Invasion.DefenderProjectile = function () {
    class DefenderProjectile extends Invasion.Sprite {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Invasion.DefenderProjectile';
      }
      static displayName() {
        return "Defender projectile";
      }
      static description() {
        return "防御者向侵略者发射的投射物。";
      }
      static fixedDimensions() {
        return {
          width: 8,
          height: 8
        };
      }
      static imageUrl() {
        return '/pixelartacademy/pico8/cartridges/invasion/sprites/defender-projectile.png';
      }
    }
    ;
    DefenderProjectile.initialize();
    return DefenderProjectile;
  }.call(this);
  Invasion.DefenderProjectileExplosion = function () {
    class DefenderProjectileExplosion extends Invasion.Sprite {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Invasion.DefenderProjectileExplosion';
      }
      static displayName() {
        return "Defender projectile explosion";
      }
      static description() {
        return "防御者投射物击中某物时出现的爆炸。";
      }
      static fixedDimensions() {
        return {
          width: 8,
          height: 8
        };
      }
      static imageUrl() {
        return '/pixelartacademy/pico8/cartridges/invasion/sprites/defender-projectile-explosion.png';
      }
    }
    ;
    DefenderProjectileExplosion.initialize();
    return DefenderProjectileExplosion;
  }.call(this);
  Invasion.Invader = function () {
    class Invader extends Invasion.Sprite {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Invasion.Invader';
      }
      static displayName() {
        return "Invader";
      }
      static description() {
        return "攻击防御者的敌人单位。";
      }
      static fixedDimensions() {
        return {
          width: 16,
          height: 16
        };
      }
      static imageUrl() {
        return '/pixelartacademy/pico8/cartridges/invasion/sprites/invader.png';
      }
    }
    ;
    Invader.initialize();
    return Invader;
  }.call(this);
  Invasion.InvaderProjectile = function () {
    class InvaderProjectile extends Invasion.Sprite {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Invasion.InvaderProjectile';
      }
      static displayName() {
        return "Invader projectile";
      }
      static description() {
        return "侵略者向防御者发射的投射物。";
      }
      static fixedDimensions() {
        return {
          width: 8,
          height: 8
        };
      }
      static imageUrl() {
        return '/pixelartacademy/pico8/cartridges/invasion/sprites/invader-projectile.png';
      }
    }
    ;
    InvaderProjectile.initialize();
    return InvaderProjectile;
  }.call(this);
  Invasion.InvaderProjectileExplosion = function () {
    class InvaderProjectileExplosion extends Invasion.Sprite {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Invasion.InvaderProjectileExplosion';
      }
      static displayName() {
        return "Invader projectile explosion";
      }
      static description() {
        return "侵略者投射物击中某物时出现的爆炸。";
      }
      static fixedDimensions() {
        return {
          width: 8,
          height: 8
        };
      }
      static imageUrl() {
        return '/pixelartacademy/pico8/cartridges/invasion/sprites/invader-projectile-explosion.png';
      }
    }
    ;
    InvaderProjectileExplosion.initialize();
    return InvaderProjectileExplosion;
  }.call(this);
  Invasion.Shield = function () {
    class Shield extends Invasion.Sprite {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Invasion.Shield';
      }
      static displayName() {
        return "Shield";
      }
      static description() {
        return "阻挡投射物直到被摧毁的障碍物。";
      }
      static fixedDimensions() {
        return {
          width: 24,
          height: 24
        };
      }
      static imageUrl() {
        return '/pixelartacademy/pico8/cartridges/invasion/sprites/shield.png';
      }
    }
    ;
    Shield.initialize();
    return Shield;
  }.call(this);
  return Invasion;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/project.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.Pico8.Cartridges.Invasion.Project = function () {
  class Project extends PAA.Practice.Project.Thing {
    // activeProjectId: ID of the project that is currently active

    // Project document fields
    // design: the design options
    //   theme: a theme ID used to provide references
    //   [entities]: an array of entity IDs added to the game
    //   defender:
    //     movement: whether the defender moves horizontally, vertically, or in all 4 directions
    //     startingAlignment: where does the defender appear
    //       horizontal, vertical
    // designDocument: data related to the display of the design document
    //   [writtenUnits]: an array of unit IDs that have already been written
    static id() {
      return 'PixelArtAcademy.Pico8.Cartridges.Invasion.Project';
    }
    static fullName() {
      return "入侵游戏";
    }
    constructor() {
      super(...arguments);
      this.pico8Cartridge = new PAA.Pico8.Cartridges.Invasion();
      this._assets = {};
      this._assetsUpdatedDependency = new Tracker.Dependency();
      this._designDocumentAsset = Tracker.nonreactive(() => {
        return new PAA.Pico8.Cartridges.Invasion.DesignDocument.Asset(this);
      });
      this.autorun(computation => {
        var activeProjectId, asset, assetClass, assetId, i, len, project, ref, ref1;
        if (!(activeProjectId = PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId'))) {
          return;
        }
        if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
          return;
        }
        ref = project.assets;
        for (i = 0, len = ref.length; i < len; i++) {
          asset = ref[i];
          if (!!this._assets[asset.id]) {
            continue;
          }
          assetClass = PAA.Practice.Project.Asset.getClassForId(asset.id);
          this._assets[asset.id] = Tracker.nonreactive(() => {
            return new assetClass(this);
          });
        }
        ref1 = this._assets;
        for (assetId in ref1) {
          asset = ref1[assetId];
          if (!!_.find(project.assets, projectAsset => {
            return projectAsset.id === assetId;
          })) {
            continue;
          }
          asset.destroy();
          delete this._assets[assetId];
        }
        return this._assetsUpdatedDependency.changed();
      });
      this.pico8Cartridge = new PAA.Pico8.Cartridges.Invasion();
    }
    destroy() {
      var asset, assetId, ref, results;
      super.destroy(...arguments);
      this.pico8Cartridge.destroy();
      this._designDocumentAsset.destroy();
      ref = this._assets;
      results = [];
      for (assetId in ref) {
        asset = ref[assetId];
        results.push(asset.destroy());
      }
      return results;
    }
    assets() {
      this._assetsUpdatedDependency.depend();
      return [..._.values(this._assets), this._designDocumentAsset];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(LM.Design.Fundamentals))) {
        return;
      }
      return chapter.getContent(LM.Design.Fundamentals.Content.Projects.Invasion);
    }
  }
  ;
  Project.initialize();
  return Project;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project-startend.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/project-startend.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Invasion, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Invasion = PAA.Pico8.Cartridges.Invasion;
PAA.Pico8.Cartridges.Invasion.Project = class Project extends PAA.Pico8.Cartridges.Invasion.Project {
  static start() {
    var creationTime, profileId, projectId;
    if (Invasion.Project.state('activeProjectId')) {
      // Make sure the player doesn't have an already active project.
      throw new AE.InvalidOperationException("Profile already has an active Invasion project.");
    }
    profileId = LOI.adventure.profileId();
    creationTime = new Date();

    // Create the project.
    projectId = PAA.Practice.Project.documents.insert({
      startTime: creationTime,
      lastEditTime: creationTime,
      type: PAA.Pico8.Cartridges.Invasion.Project.id(),
      profileId: profileId,
      assets: [],
      design: {
        entities: []
      },
      designDocument: {
        writtenUnits: []
      }
    });

    // Write the project ID into profile's game state.
    return Invasion.Project.state('activeProjectId', projectId);
  }
  static end() {
    var endTime, projectId;
    // Make sure the player has an active project.
    projectId = Invasion.Project.state('activeProjectId');
    if (!projectId) {
      throw new AE.InvalidOperationException("Profile does not have an active Invasion project.");
    }
    // End the project.
    endTime = new Date();
    projectId = PAA.Practice.Project.documents.update(projectId, {
      $set: {
        endTime: endTime,
        lastEditTime: endTime
      }
    });
    // Remove project ID from profile's game state.
    return Invasion.Project.state('activeProjectId', null);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"designdocument":{"designdocument.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/designdocument.coffee                             //
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
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pico8.Cartridges.Invasion.DesignDocument = function () {
  class DesignDocument extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument';
    }
    static designStringForProjectId(projectId) {
      var design, project;
      project = PAA.Practice.Project.documents.findOne(projectId);
      design = _.defaultsDeep({}, project.design, this.DesignDefaults);
      return this._designStringsForObject(design, '').join('\n');
    }
    static _designStringsForObject(object, path) {
      var i, index, item, key, keyPath, len, options, results, value, valueStrings;
      if (_.isArray(object)) {
        results = [];
        for (i = 0, len = object.length; i < len; i++) {
          item = object[i];
          results.push(this._designStringsForObject(item, path ? "".concat(path, ".0") : "0"));
        }
        return results;
      } else if (_.isObject(object)) {
        valueStrings = function () {
          var results1;
          results1 = [];
          for (key in object) {
            value = object[key];
            keyPath = path ? "".concat(path, ".").concat(key) : key;
            if (_.isArray(value) || _.isObject(value)) {
              results1.push(["".concat(key, "={"), ...this._designStringsForObject(value, keyPath), "}"]);
            } else {
              // See if we can replace the value with a number.
              if (options = _.nestedProperty(this.DesignSchema, keyPath)) {
                index = _.values(options).indexOf(value);
                if (index > -1) {
                  value = index + 1;
                }
              }
              results1.push(["".concat(key, "=").concat(value)]);
            }
          }
          return results1;
        }.call(this);
        return _.flatten(valueStrings);
      } else {
        if (options = _.nestedProperty(this.DesignSchema, path)) {
          index = _.values(options).indexOf(object);
          if (index > -1) {
            object = index + 1;
          }
        }
        return object;
      }
    }
    onCreated() {
      super.onCreated(...arguments);
      LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Macintosh);
      this.display = this.callAncestorWith('display');
      this.pixelPadOS = this.ancestorComponentOfType(PAA.PixelPad.OS);
      this.window = this.ancestorComponentOfType(PAA.Pixeltosh.OS.Interface.Window);
      this.projectId = new ComputedField(() => {
        return PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId');
      });
      this.project = new ComputedField(() => {
        var projectId;
        if (!(projectId = this.projectId())) {
          return;
        }
        return PAA.Practice.Project.documents.findOne(projectId);
      });
      this.design = new ComputedField(() => {
        var ref;
        return (ref = this.project()) != null ? ref.design : void 0;
      });
      this.writtenUnits = new ComputedField(() => {
        var ref;
        return (ref = this.project()) != null ? ref.designDocument.writtenUnits : void 0;
      });
      this.animating = new ReactiveField(false);
      return this.skipAnimation = new ReactiveField(false);
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.autorun(computation => {
        var writtenUnits;
        if (!(writtenUnits = this.writtenUnits())) {
          return;
        }
        // Depend on design changes.
        this.design();
        return Tracker.afterFlush(() => {
          var child, elements, existingNode, expandedChildren, i, len, parent, ref, ref1, ref2, text, textElements;
          elements = this.$('article').toArray();
          textElements = [];
          while (elements.length) {
            parent = elements.shift();
            if (((ref = parent.style) != null ? ref.visibility : void 0) === 'hidden') {
              // Skip auto-resize measuring divs.
              continue;
            }
            if ((ref1 = parent.dataset) != null ? ref1.unit : void 0) {
              if (parent._unit == null) {
                parent._unit = parent.dataset.unit;
              }
            }
            expandedChildren = [];
            ref2 = parent.childNodes;
            for (i = 0, len = ref2.length; i < len; i++) {
              child = ref2[i];
              if (child._unit == null) {
                child._unit = parent._unit;
              }
              if (child.nodeType === Node.TEXT_NODE) {
                text = child.textContent.replace(/\s+/g, ' ');

                // If this is a new node, make sure it's not empty.
                // Old nodes can be empty since they were cleared to be written out.
                existingNode = _.find(this._textElements, textElement => {
                  return textElement.node === child;
                });
                if (!(text.length && text !== ' ' || existingNode)) {
                  continue;
                }
                textElements.push({
                  text: text,
                  element: parent,
                  textNode: child,
                  node: child
                });
              } else if (child.classList.contains('choice')) {
                textElements.push({
                  choice: true,
                  element: child,
                  node: child
                });
              } else if (child.classList.contains('chosen-choice')) {
                text = child.textContent;
                textElements.push({
                  text: text,
                  element: parent,
                  textNode: child.firstChild,
                  node: child
                });
              } else if (child.classList.contains('asset-image')) {
                textElements.push({
                  assetImage: true,
                  element: child,
                  node: child
                });
              } else if (child.tagName === 'INPUT') {
                text = child.value;
                textElements.push({
                  text: text,
                  element: parent,
                  input: child,
                  node: child
                });
              } else {
                expandedChildren.push(child);
              }
            }
            elements.unshift(...expandedChildren);
          }
          return this.writeTextElements(textElements, writtenUnits);
        });
      });
    }
    async writeTextElements(textElements, writtenUnits) {
      var $bitmapImage, $input, character, currentInsertionIndex, currentUnit, found, height, i, index, initialTextElement, input, inputType, j, k, l, len, len1, len2, m, matchedTextElement, nextTextElement, nodeIsSame, previousTextElement, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, removeIndex, revealHeight, scale, searchIndex, siblingIsSame, text, textElement, textIsSame, textNode, waitDuration;
      if (!textElements.length) {
        return;
      }
      if (this._textElements == null) {
        this._textElements = [];
      }
      if (this._cursor == null) {
        this._cursor = $('<span class="cursor"></span>')[0];
      }
      ref = this._textElements;
      // Mark all non-written existing elements as potentially removed.
      for (i = 0, len = ref.length; i < len; i++) {
        textElement = ref[i];
        if (!textElement.written) {
          textElement.removed = true;
        }
      }

      // Find existing and new text elements.
      this._newCurrentTextElementIndex = null;
      currentInsertionIndex = 0;
      for (index = j = 0, len1 = textElements.length; j < len1; index = ++j) {
        textElement = textElements[index];
        // See if this text element has already been added.
        found = false;
        for (searchIndex = k = ref1 = currentInsertionIndex, ref2 = this._textElements.length; ref1 <= ref2 ? k < ref2 : k > ref2; searchIndex = ref1 <= ref2 ? ++k : --k) {
          if (!(nodeIsSame = textElement.node === this._textElements[searchIndex].node)) {
            textIsSame = textElement.text && textElement.text === this._textElements[searchIndex].text;
            siblingIsSame = ((ref3 = textElements[index - 1]) != null ? ref3.node : void 0) === ((ref4 = this._textElements[searchIndex - 1]) != null ? ref4.node : void 0) || ((ref5 = textElements[index + 1]) != null ? ref5.node : void 0) === ((ref6 = this._textElements[searchIndex + 1]) != null ? ref6.node : void 0);
          }
          if (!(nodeIsSame || textIsSame && siblingIsSame)) {
            continue;
          }
          // We found the match, so don't remove this element.
          matchedTextElement = this._textElements[searchIndex];
          found = true;
          matchedTextElement.removed = false;

          // Update the text to latest unless it's already been blanked.
          if (((ref7 = textElement.text) != null ? ref7.length : void 0) && (ref8 = textElement.text) !== ' ' && ref8 !== matchedTextElement.text) {
            matchedTextElement.text = textElement.text;
          }

          // Move to next element.
          currentInsertionIndex = searchIndex + 1;
          break;
        }
        if (found) {
          continue;
        }

        // This is a new text element.
        this._textElements.splice(currentInsertionIndex, 0, textElement);

        // If this unit wasn't written previously, blank it out and set for writing.
        if (ref9 = textElement.node._unit, indexOf.call(writtenUnits, ref9) >= 0) {
          textElement.written = true;
        } else {
          if (this._newCurrentTextElementIndex == null) {
            this._newCurrentTextElementIndex = currentInsertionIndex;
          }
          if (textElement.textNode) {
            textElement.textNode.textContent = ' ';
          } else if (textElement.choice || textElement.assetImage) {
            textElement.element.classList.add('hidden');
          } else if (textElement.input) {
            textElement.input.value = '';
            textElement.input.classList.add('hidden');
          }
        }
        currentInsertionIndex++;
      }

      // Remove any unmatched elements.
      removeIndex = 0;
      while (removeIndex < this._textElements.length) {
        if (this._textElements[removeIndex].removed) {
          this._textElements.splice(removeIndex, 1);
          if (removeIndex < this._currentTextElementIndex) {
            this._currentTextElementIndex--;
          }
          if (this._newCurrentTextElementIndex != null && this._newCurrentTextElementIndex < this._newCurrentTextElementIndex) {
            this._newCurrentTextElementIndex--;
          }
        } else {
          removeIndex++;
        }
      }

      // Nothing to do if no new elements were inserted.
      if (this._newCurrentTextElementIndex == null) {
        return;
      }

      // Start writing unless we're already doing it.
      if (this.animating()) {
        return;
      }
      this.animating(true);

      // Place cursor at the start and wait a bit before writing.
      this._currentTextElementIndex = this._newCurrentTextElementIndex;
      initialTextElement = this._textElements[this._currentTextElementIndex];
      initialTextElement.element.prepend(this._cursor);
      await _.waitForNextFrame();
      await this.window.scrollToElement(initialTextElement.element);
      await _.waitForSeconds(0.5);
      this.skipAnimation(false);

      // Iterate over all text elements.
      while (this._currentTextElementIndex < this._textElements.length) {
        previousTextElement = this._textElements[this._currentTextElementIndex - 1];
        textElement = this._textElements[this._currentTextElementIndex];
        nextTextElement = this._textElements[this._currentTextElementIndex + 1];
        if (textElement.written) {
          this._currentTextElementIndex++;
          continue;
        }
        if (textElement.choice) {
          textElement.element.classList.remove('hidden');
          this._cursor.remove();
          await this.window.scrollToElement(textElement.element, {
            animate: !this.skipAnimation(),
            skipAnimation: this.skipAnimation
          });
          while (textElement.element.parentElement) {
            await _.waitForNextFrame();
          }
          this.skipAnimation(false);
        } else if (textElement.assetImage) {
          textElement.element.classList.remove('hidden');
          $bitmapImage = $(textElement.element).find('.landsofillusions-assets-components-bitmapimage');
          scale = this.display.scale();
          height = $bitmapImage.height() / scale;
          textElement.element.style.height = "".concat(height, "rem");
          $bitmapImage.height(0);
          this._cursor.remove();
          await this.window.scrollToElement(textElement.element, {
            animate: !this.skipAnimation(),
            skipAnimation: this.skipAnimation
          });
          textElement.element.style.visibility = '';
          for (revealHeight = l = 4, ref10 = height; l <= ref10; revealHeight = l += 4) {
            $bitmapImage.height("".concat(revealHeight, "rem"));
            await _.waitForSeconds(0.1);
            if (this.skipAnimation()) {
              break;
            }
          }
          $bitmapImage.height('auto');
          textElement.element.style.height = '';
        } else {
          // Wait before starting to type in a new element.
          if ((previousTextElement != null ? previousTextElement.element : void 0) !== textElement.element) {
            if (!this.skipAnimation()) {
              await _.waitForSeconds(0.5);
            }
          }
          text = textElement.text[0];
          if (textElement.input) {
            input = textElement.input;
            $input = $(input);
            inputType = input.type;
            input.type = 'text';
            input.classList.remove('hidden');
            input.after(this._cursor);
            input.value = text;
            // Trigger auto-resizing of the input.
            $input.trigger('input');
          } else {
            textNode = textElement.textNode;
            textNode.textContent = text;
            textNode.after(this._cursor);
          }
          ref11 = textElement.text.slice(1);
          for (m = 0, len2 = ref11.length; m < len2; m++) {
            character = ref11[m];
            text += character;
            if (textElement.input) {
              input.value = text;
              $input.trigger('input');
            } else {
              textNode.textContent = text;
            }
            if (!this.skipAnimation()) {
              await this.window.scrollToElement(this._cursor, {
                animate: !this.skipAnimation(),
                skipAnimation: this.skipAnimation
              });
              waitDuration = _.endsWith(text, '. ') ? 0.5 : 0.03;
              await _.waitForSeconds(waitDuration);
            }
          }
          if (textElement.input) {
            input.type = inputType;
          }
        }

        // See if this was the last element of this unit.
        currentUnit = textElement.element._unit;
        if (currentUnit && (nextTextElement != null ? nextTextElement.element._unit : void 0) !== currentUnit) {
          // Mark that we've written it.
          PAA.Practice.Project.documents.update(this.projectId(), {
            $set: {
              lastEditTime: Date.now()
            },
            $addToSet: {
              'designDocument.writtenUnits': currentUnit
            }
          });
        }
        textElement.written = true;
        if (this._newCurrentTextElementIndex) {
          this._currentTextElementIndex = this._newCurrentTextElementIndex;
          this._newCurrentTextElementIndex = null;
        } else {
          this._currentTextElementIndex++;
        }
      }
      this.animating(false);
      if (!this.skipAnimation()) {
        await _.waitForSeconds(1);
      }
      if (!this.animating()) {
        return this._cursor.remove();
      }
    }
    getDesignValue(property) {
      return _.nestedProperty(this.design(), property);
    }
    setDesignValue(property, value) {
      return PAA.Practice.Project.documents.update(this.projectId(), {
        $set: {
          lastEditTime: Date.now(),
          ["design.".concat(property)]: value
        }
      });
    }
    animatingClass() {
      if (this.animating()) {
        return 'animating';
      }
    }
    assetBitmap(entity) {
      var assetId;
      assetId = "PixelArtAcademy.Pico8.Cartridges.Invasion.".concat(entity);
      return new LOI.Assets.Components.BitmapImage({
        bitmapId: () => {
          var asset, project;
          if (!(project = this.project())) {
            return;
          }
          if (!(asset = _.find(project.assets, asset => {
            return asset.id === assetId;
          }))) {
            return;
          }
          return asset.bitmapId;
        },
        scale: 4,
        targetPalette: () => {
          return LOI.Assets.Palette.documents.findOne({
            name: LOI.Assets.Palette.SystemPaletteNames.Macintosh
          });
        },
        backgroundColor: PAA.Pico8.Cartridges.Invasion.Sprite.backgroundColor
      });
    }
    events() {
      return super.events(...arguments).concat({
        'click': this.onClick,
        'click .asset-image': this.onClickAssetImage
      });
    }
    onClick(event) {
      var $target;
      $target = $(event.target);
      if ($target.closest('.choice').length) {
        return;
      }
      if ($target.closest('.chosen-choice').length) {
        return;
      }
      if ($target.closest('.entities').length) {
        return;
      }
      if ($target.closest('.entities-add').length) {
        return;
      }
      return this.skipAnimation(true);
    }
    onClickAssetImage(event) {
      var $target, asset, entity, project;
      $target = $(event.currentTarget);
      entity = $target.data('entity');

      // Find the bitmap ID for this entity.
      project = this.project();
      asset = _.find(project.assets, asset => {
        return asset.id === "PixelArtAcademy.Pico8.Cartridges.Invasion.".concat(entity);
      });
      return this.pixelPadOS.go(PAA.PixelPad.Apps.Drawing.url(), asset.bitmapId);
    }
  }
  ;
  DesignDocument.Property = class Property extends AM.DataInputComponent {
    constructor() {
      super(...arguments);
      this.type = AM.DataInputComponent.Types.Number;
      this.autoResizeInput = true;
      this.realtime = false;
      this.customAttributes = {
        step: this.step(),
        min: this.min()
      };
    }
    onCreated() {
      super.onCreated(...arguments);
      this.designDocument = this.parentComponent();
      return this.display = this.callAncestorWith('display');
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$input = this.$('input');
      return this.autorun(computation => {
        var scale;
        scale = this.display.scale();
        this.autoResizeInputPadding = 6 * scale;
        return this.$input.trigger('input');
      });
    }
    property() {
      throw new AE.NotImplementedException('Property must define its design property field.');
    }
    step() {
      return 'any'; // Override to provide a different default step.
    }
    min() {
      return null; // Override if a property has a minimum value.
    }
    load() {
      var property, value;
      property = this.property();
      value = this.designDocument.getDesignValue(property);
      // Note: We can't use @ to reference the DesignDocument class since DesignDefaults get added in the child.
      if (value == null) {
        value = _.nestedProperty(PAA.Pico8.Cartridges.Invasion.DesignDocument.DesignDefaults, property);
      }
      if (this.isRendered()) {
        Tracker.afterFlush(() => {
          return this.$input.trigger('input');
        });
      }
      return value;
    }
    save(value) {
      var float, property;
      property = this.property();
      float = parseFloat(value);
      return this.designDocument.setDesignValue(property, _.isFinite(float) ? float : void 0);
    }
  };
  return DesignDocument;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.designdocument.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/template.designdocument.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument");
Template["PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument"] = new Template("Template.PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pico8-cartridges-invasion-designdocument ", Spacebars.mustache(view.lookup("animatingClass")) ];
    }
  }, "\n    ", HTML.ARTICLE(HTML.Raw('\n      <hgroup class="title" data-unit="title">\n        <h1>入侵</h1>\n        <p>设计文档</p>\n      </hgroup>\n      <h2 data-unit="game-concept-header">1. 游戏概念</h2>\n      '), HTML.P({
    "data-unit": "game-concept"
  }, "\n        《入侵》是一款单屏射击游戏，灵感来自\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("themeChoice"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
    });
  }), "。\n        玩家需要发射子弹，击退一支由电脑控制的入侵者舰队。\n      "), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("design"), "theme"));
  }, function() {
    return [ HTML.Raw('\n        <h2 data-unit="game-elements-header">2. 游戏元素</h2>\n        <h3 data-unit="entities-header">2.a. 实体</h3>\n        '), Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasEntity"), "Defender");
    }, function() {
      return HTML.Raw('\n          <p data-unit="entities-defender">防御者：玩家控制的单位。</p>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasEntity"), "Invader");
    }, function() {
      return HTML.Raw('\n          <p data-unit="entities-invader">侵略者：电脑控制的敌人单位。</p>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasEntity"), "DefenderProjectile");
    }, function() {
      return HTML.Raw('\n          <p data-unit="entities-defender-projectile">防御者投射物：防御者向侵略者发射的投射物。</p>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasEntity"), "InvaderProjectile");
    }, function() {
      return HTML.Raw('\n          <p data-unit="entities-invader-projectile">侵略者投射物：侵略者向防御者发射的投射物。</p>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("hasEntity"), "Shield");
    }, function() {
      return HTML.Raw('\n          <p data-unit="entities-shield">护盾：阻挡投射物的障碍物。</p>\n        ');
    }), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Entities"));
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("hasEntities"));
    }, function() {
      return [ HTML.Raw('\n          <h3 data-unit="game-flow-header">2.b. 游戏流程</h3>\n          '), Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Defender");
      }, function() {
        return [ "\n            ", HTML.P({
          "data-unit": "game-flow-defender"
        }, "\n              防御者会", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowDefenderMovementChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), "，\n              起始位置在", Blaze.If(function() {
          return Spacebars.call(view.lookup("gameFlowDefenderStartingAlignmentPrepositionOn"));
        }, function() {
          return "";
        }, function() {
          return "";
        }), "", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowDefenderStartingAlignmentChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), ".\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "DefenderProjectile");
      }, function() {
        return [ "\n            ", HTML.P({
          "data-unit": "game-flow-defender-projectiles"
        }, "\n              玩家按下开火键，向", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowDefenderProjectilesDirectionChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), "发射投射物，轨迹为", Blaze.If(function() {
          return Spacebars.call(view.lookup("gameFlowDefenderProjectilesOrientationVertical"));
        }, function() {
          return "垂直";
        }, function() {
          return "水平";
        }), "线。\n              投射物击中侵略者时，侵略者会", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowDefenderProjectilesInvadersDeathTypeChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), "，玩家获得分数。\n              如果所有侵略者都被消灭，游戏会进入新关卡，侵略者会", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowDefenderProjectilesInvadersLevelUpChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), ".\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Invader");
      }, function() {
        return [ "\n            ", HTML.P({
          "data-unit": "game-flow-invaders"
        }, "\n              入侵者生成在", Blaze.If(function() {
          return Spacebars.call(view.lookup("gameFlowInvadersStartingAlignmentPrepositionOn"));
        }, function() {
          return "";
        }, function() {
          return "";
        }), "", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowInvadersFormationStartingAlignmentChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), "。\n              它们会", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowInvadersFormationAppearingChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), Blaze.If(function() {
          return Spacebars.call(view.lookup("gameFlowInvadersFormationAppearingOneByOne"));
        }, function() {
          return [ "\n                按", Blaze._TemplateWith(function() {
            return Spacebars.call(view.lookup("gameFlowInvadersFormationSpawnOrder"));
          }, function() {
            return Spacebars.include(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
            });
          }), "出现，游戏流程", Blaze._TemplateWith(function() {
            return Spacebars.call(view.lookup("gameFlowInvadersPostponeGameplayChoice"));
          }, function() {
            return Spacebars.include(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
            });
          }) ];
        }), "。\n              入侵者", Blaze.If(function() {
          return Spacebars.call(view.lookup("gameFlowInvadersMove"));
        }, function() {
          return [ "\n                会", Blaze._TemplateWith(function() {
            return Spacebars.call(view.lookup("gameFlowInvadersFormationMovementOrientationChoice"));
          }, function() {
            return Spacebars.include(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
            });
          }), "移动，\n                并且", Blaze._TemplateWith(function() {
            return Spacebars.call(view.lookup("gameFlowInvadersFormationAttackDirectionChoice"));
          }, function() {
            return Spacebars.include(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
            });
          }), Blaze.If(function() {
            return Spacebars.call(view.lookup("gameFlowInvadersFormationAttack"));
          }, function() {
            return "在到达屏幕边缘时";
          }), "。\n                在阵型内部，它们", Blaze._TemplateWith(function() {
            return Spacebars.call(view.lookup("gameFlowInvadersFormationMovementTypeChoice"));
          }, function() {
            return Spacebars.include(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
            });
          }), ",\n                ", Blaze.If(function() {
            return Spacebars.dataMustache(view.lookup("$is"), view.lookup("gameFlowInvadersFormationMovementType"), "All");
          }, function() {
            return "\n                  以恒定速度。\n                ";
          }, function() {
            return "\n                  随着侵略者被消灭而越来越快。\n                ";
          }), "\n              " ];
        }, function() {
          return "\n                站着不动。\n              ";
        }), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "InvaderProjectile");
      }, function() {
        return [ "\n            ", HTML.P({
          "data-unit": "game-flow-invader-projectiles"
        }, "\n              每隔一段时间，随机一个侵略者会向", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowInvaderProjectilesDirectionChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), "发射投射物。\n              如果防御者被敌方投射物击中，它会", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowInvaderProjectilesDefenderDeathTypeChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), "，玩家失去一条生命。生命全部耗尽时，游戏结束。\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Shield");
      }, function() {
        return [ "\n            ", HTML.P({
          "data-unit": "game-flow-shields"
        }, "\n              为了帮助玩家，护盾会放置在关卡的", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("gameFlowShieldsSideChoice"));
        }, function() {
          return Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Choice"));
          });
        }), "侧。它们会在被投射物、侵略者或防御者击中时瓦解。\n            "), "\n          " ];
      }), HTML.Raw('\n          <h3 data-unit="properties-header">2.c. 属性</h3>\n          '), Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "InvaderProjectile");
      }, function() {
        return [ HTML.Raw('\n            <p data-unit="properties-invader-projectiles">\n              玩家\n            </p>\n            '), HTML.UL({
          class: "properties"
        }, "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invader-projectiles"
        }, "— 初始生命数：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "Lives"));
        })), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Defender");
      }, function() {
        return [ HTML.Raw('\n            <p data-unit="properties-defender">\n              防御者\n            </p>\n            '), HTML.UL({
          class: "properties"
        }, "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-defender"
        }, "— 速度：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "DefenderSpeed"));
        }), " 像素/移动"), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "DefenderProjectile");
      }, function() {
        return [ HTML.Raw('\n            <p data-unit="properties-defender-projectile">\n              防御者投射物\n            </p>\n            '), HTML.UL({
          class: "properties"
        }, "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-defender-projectiles"
        }, "— 速度：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "DefenderProjectilesSpeed"));
        }), " 像素/移动"), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-defender-projectiles"
        }, "— 最大数量：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "DefenderProjectilesMaxCount"));
        })), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Invader");
      }, function() {
        return [ HTML.Raw('\n            <p data-unit="properties-invaders">\n              侵略者\n            </p>\n            '), HTML.UL({
          class: "properties"
        }, "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invaders"
        }, "— 网格行数：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationRows"));
        })), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invaders"
        }, "— 网格列数：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationColumns"));
        })), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invaders"
        }, "— 水平间距：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationHorizontalSpacing"));
        }), " 像素"), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invaders"
        }, "— 垂直间距：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationVerticalSpacing"));
        }), " 像素"), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invaders"
        }, "— 水平速度：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationHorizontalSpeed"));
        }), " 像素/移动"), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invaders"
        }, "— 垂直速度：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationVerticalSpeed"));
        }), " 像素/移动"), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invaders"
        }, "— 生成延迟：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationSpawnDelay"));
        }), " 秒/侵略者"), "\n              ", Blaze.If(function() {
          return Spacebars.dataMustache(view.lookup("hasEntity"), "InvaderProjectile");
        }, function() {
          return [ "\n                ", HTML.LI({
            class: "property",
            "data-unit": "properties-invader-projectiles"
          }, "— 第 1 关全员时射击延迟：", Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationShootingTimeoutFull"));
          }), " seconds"), "\n                ", HTML.LI({
            class: "property",
            "data-unit": "properties-invader-projectiles"
          }, "— 第 1 关剩最后一个时射击延迟：", Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationShootingTimoutEmpty"));
          }), " seconds"), "\n                ", HTML.LI({
            class: "property",
            "data-unit": "properties-invader-projectiles"
          }, "— 每关全员射击延迟减少：-", Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationTimeoutFullDecreasePerLevel"));
          }), " 秒/关"), "\n                ", HTML.LI({
            class: "property",
            "data-unit": "properties-invader-projectiles"
          }, "— 射击延迟随机性：", Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersFormationShootingVariability"));
          }), "%"), "\n              " ];
        }), "\n              ", Blaze.If(function() {
          return Spacebars.dataMustache(view.lookup("hasEntity"), "DefenderProjectile");
        }, function() {
          return [ "\n                ", HTML.LI({
            class: "property",
            "data-unit": "properties-invaders-defender-projectiles"
          }, "— 第 1 关得分：", Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersScorePerInvader"));
          }), " per invader"), "\n                ", HTML.LI({
            class: "property",
            "data-unit": "properties-invaders-defender-projectiles"
          }, "— 每关得分增量：+", Spacebars.include(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvadersScoreIncreasePerInvaderPerLevel"));
          }), " / 每个侵略者/每关"), "\n              " ];
        }), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "InvaderProjectile");
      }, function() {
        return [ HTML.Raw('\n            <p data-unit="properties-invader-projectiles">\n              侵略者投射物\n            </p>\n            '), HTML.UL({
          class: "properties"
        }, "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invader-projectiles"
        }, "— 速度：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvaderProjectilesSpeed"));
        }), " 像素/移动"), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-invader-projectiles"
        }, "— 最大数量：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "InvaderProjectilesMaxCount"));
        })), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Shield");
      }, function() {
        return [ HTML.Raw('\n            <p data-unit="properties-shields">\n              护盾\n            </p>\n            '), HTML.UL({
          class: "properties"
        }, "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-shields"
        }, "— 数量：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "ShieldsAmount"));
        })), "\n              ", HTML.LI({
          class: "property",
          "data-unit": "properties-shields"
        }, "— 间距：", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pico8", "Cartridges", "Invasion", "DesignDocument", "ShieldsSpacing"));
        }), " 像素"), "\n            "), "\n          " ];
      }), HTML.Raw('\n          <h2 data-unit="art-header">3. 美术</h2>\n          '), Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Defender");
      }, function() {
        return [ "\n            ", HTML.P({
          class: "asset",
          "data-unit": "art-defender"
        }, "\n              防御者（16×16 像素）\n              ", HTML.DIV({
          class: "asset-image",
          "data-entity": "Defender",
          "data-cursor": "pointer"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.dataMustache(view.lookup("assetBitmap"), "Defender");
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n              "), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Invader");
      }, function() {
        return [ "\n            ", HTML.P({
          class: "asset",
          "data-unit": "art-invader"
        }, "\n              侵略者（16×16 像素）\n              ", HTML.DIV({
          class: "asset-image",
          "data-entity": "Invader",
          "data-cursor": "pointer"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.dataMustache(view.lookup("assetBitmap"), "Invader");
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n              "), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "DefenderProjectile");
      }, function() {
        return [ "\n            ", HTML.P({
          class: "asset",
          "data-unit": "art-defender-projectile"
        }, "\n              防御者投射物（8×8 像素）\n              ", HTML.DIV({
          class: "asset-image",
          "data-entity": "DefenderProjectile",
          "data-cursor": "pointer"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.dataMustache(view.lookup("assetBitmap"), "DefenderProjectile");
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n              "), "\n            "), "\n            ", HTML.P({
          class: "asset",
          "data-unit": "art-defender-projectile"
        }, "\n              防御者投射物爆炸（8×8 像素）\n              ", HTML.DIV({
          class: "asset-image",
          "data-entity": "DefenderProjectileExplosion",
          "data-cursor": "pointer"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.dataMustache(view.lookup("assetBitmap"), "DefenderProjectileExplosion");
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n              "), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "InvaderProjectile");
      }, function() {
        return [ "\n            ", HTML.P({
          class: "asset",
          "data-unit": "art-invader-projectile"
        }, "\n              侵略者投射物（8×8 像素）\n              ", HTML.DIV({
          class: "asset-image",
          "data-entity": "InvaderProjectile",
          "data-cursor": "pointer"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.dataMustache(view.lookup("assetBitmap"), "InvaderProjectile");
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n              "), "\n            "), "\n            ", HTML.P({
          class: "asset",
          "data-unit": "art-invader-projectile"
        }, "\n              侵略者投射物爆炸（8×8 像素）\n              ", HTML.DIV({
          class: "asset-image",
          "data-entity": "InvaderProjectileExplosion",
          "data-cursor": "pointer"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.dataMustache(view.lookup("assetBitmap"), "InvaderProjectileExplosion");
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n              "), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("hasEntity"), "Shield");
      }, function() {
        return [ "\n            ", HTML.P({
          class: "asset",
          "data-unit": "art-shield"
        }, "\n              护盾（24×24 像素）\n              ", HTML.DIV({
          class: "asset-image",
          "data-entity": "Shield",
          "data-cursor": "pointer"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.dataMustache(view.lookup("assetBitmap"), "Shield");
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n              "), "\n            "), "\n          " ];
      }), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"designdocument-design.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/designdocument-design.coffee                      //
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
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pico8.Cartridges.Invasion.DesignDocument = function () {
  var Component;
  class DesignDocument extends PAA.Pico8.Cartridges.Invasion.DesignDocument {
    hasEntity(entity) {
      return indexOf.call(this.getDesignValue('entities') || [], entity) >= 0;
    }
    hasEntities() {
      var ref;
      return (ref = this.getDesignValue('entities')) != null ? ref.length : void 0;
    }
    themeChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.Themes;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'theme'
      };
    }
    gameFlowDefenderMovementChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.GameFlow.Defender.Movements;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'defender.movement'
      };
    }
    gameFlowDefenderStartingAlignmentPrepositionOn() {
      var horizontalAlignment, verticalAlignment;
      if (!(horizontalAlignment = this.getDesignValue('defender.startingAlignment.horizontal'))) {
        return;
      }
      if (!(verticalAlignment = this.getDesignValue('defender.startingAlignment.vertical'))) {
        return;
      }
      return this._gameFlowStartingAlignmentPrepositionOn(horizontalAlignment, verticalAlignment);
    }
    _gameFlowStartingAlignmentPrepositionOn(horizontalAlignment, verticalAlignment) {
      var center, middle;
      // We need 'at' (insted of 'in') when we are at a side and not in the corner/center.
      center = horizontalAlignment === this.constructor.Options.HorizontalAlignments.Center;
      middle = verticalAlignment === this.constructor.Options.VerticalAlignments.Middle;
      return (center || middle) && !(center && middle);
    }
    gameFlowDefenderStartingAlignmentChoice() {
      return this._gameFlowStartingAlignmentChoice('defender');
    }
    _gameFlowStartingAlignmentChoice(property) {
      var alignments, options, text, value;
      options = function () {
        var ref, results;
        ref = this.constructor.Texts.GameFlow.StartingAlignments;
        results = [];
        for (value in ref) {
          text = ref[value];
          alignments = value.match(/[A-Z][a-z]*/g);
          results.push({
            value: value,
            text: text,
            designValues: {
              ["".concat(property, ".startingAlignment.horizontal")]: alignments[1],
              ["".concat(property, ".startingAlignment.vertical")]: alignments[0]
            }
          });
        }
        return results;
      }.call(this);
      return {
        options: options,
        value: () => {
          var horizontalAlignment, verticalAlignment;
          if (!(horizontalAlignment = this.getDesignValue("".concat(property, ".startingAlignment.horizontal")))) {
            return;
          }
          if (!(verticalAlignment = this.getDesignValue("".concat(property, ".startingAlignment.vertical")))) {
            return;
          }
          return "".concat(verticalAlignment).concat(horizontalAlignment);
        }
      };
    }
    gameFlowDefenderProjectilesDirectionChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.Directions;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'defenderProjectiles.direction'
      };
    }
    gameFlowDefenderProjectilesOrientationVertical() {
      var defenderProjectilesDirection;
      defenderProjectilesDirection = this.getDesignValue('defenderProjectiles.direction');
      return defenderProjectilesDirection === this.constructor.Options.Directions.Up || defenderProjectilesDirection === this.constructor.Options.Directions.Down;
    }
    gameFlowDefenderProjectilesInvadersDeathTypeChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.GameFlow.DefenderProjectiles.InvaderDeathTypes;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'invaders.deathType'
      };
    }
    gameFlowDefenderProjectilesInvadersLevelUpChoice() {
      var options;
      options = [{
        value: 'IncreaseShootingFrequency',
        text: this.constructor.Texts.GameFlow.DefenderProjectiles.LevelUp.IncreaseShootingFrequency,
        designValues: {
          "invaders.formation.shooting.timeoutFullDecreasePerLevel": this.constructor.DesignDefaults.invaders.formation.shooting.timeoutFullDecreasePerLevel,
          "invaders.scoreIncreasePerInvaderPerLevel": 0
        }
      }, {
        value: 'IncreaseScore',
        text: this.constructor.Texts.GameFlow.DefenderProjectiles.LevelUp.IncreaseScore,
        designValues: {
          "invaders.formation.shooting.timeoutFullDecreasePerLevel": 0,
          "invaders.scoreIncreasePerInvaderPerLevel": this.constructor.DesignDefaults.invaders.scoreIncreasePerInvaderPerLevel
        }
      }, {
        value: 'StayTheSame',
        text: this.constructor.Texts.GameFlow.DefenderProjectiles.LevelUp.StayTheSame,
        designValues: {
          "invaders.formation.shooting.timeoutFullDecreasePerLevel": 0,
          "invaders.scoreIncreasePerInvaderPerLevel": 0
        }
      }];
      return {
        options: options,
        value: () => {
          var scoreIncreasePerInvaderPerLevel, timeoutFullDecreasePerLevel;
          timeoutFullDecreasePerLevel = this.getDesignValue('invaders.formation.shooting.timeoutFullDecreasePerLevel');
          scoreIncreasePerInvaderPerLevel = this.getDesignValue('invaders.scoreIncreasePerInvaderPerLevel');
          if (timeoutFullDecreasePerLevel) {
            return 'IncreaseShootingFrequency';
          }
          if (scoreIncreasePerInvaderPerLevel) {
            return 'IncreaseScore';
          }
          if (timeoutFullDecreasePerLevel === 0 && scoreIncreasePerInvaderPerLevel === 0) {
            return 'StayTheSame';
          }
          return null;
        }
      };
    }
    gameFlowInvadersStartingAlignmentPrepositionOn() {
      var horizontalAlignment, verticalAlignment;
      if (!(horizontalAlignment = this.getDesignValue('invaders.formation.startingAlignment.horizontal'))) {
        return;
      }
      if (!(verticalAlignment = this.getDesignValue('invaders.formation.startingAlignment.vertical'))) {
        return;
      }
      return this._gameFlowStartingAlignmentPrepositionOn(horizontalAlignment, verticalAlignment);
    }
    gameFlowInvadersFormationStartingAlignmentChoice() {
      return this._gameFlowStartingAlignmentChoice('invaders.formation');
    }
    gameFlowInvadersFormationAppearingChoice() {
      var options;
      options = [{
        value: 'All',
        text: this.constructor.Texts.GameFlow.Invaders.Formation.Appearing.All,
        designValues: {
          "invaders.formation.spawnDelay": 0
        }
      }, {
        value: 'Individual',
        text: this.constructor.Texts.GameFlow.Invaders.Formation.Appearing.Individual,
        designValues: {
          "invaders.formation.spawnDelay": this.constructor.DesignDefaults.invaders.formation.spawnDelay
        }
      }];
      return {
        options: options,
        value: () => {
          var spawnDelay;
          spawnDelay = this.getDesignValue('invaders.formation.spawnDelay');
          if (spawnDelay == null) {
            return;
          }
          if (spawnDelay) {
            return 'Individual';
          } else {
            return 'All';
          }
        }
      };
    }
    gameFlowInvadersFormationAppearingOneByOne() {
      return this.getDesignValue('invaders.formation.spawnDelay');
    }
    gameFlowInvadersFormationSpawnOrder() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.GameFlow.Invaders.Formation.SpawnOrder;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'invaders.formation.spawnOrder'
      };
    }
    gameFlowInvadersPostponeGameplayChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.PostponeGameplay;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'postponeGameplay'
      };
    }
    gameFlowInvadersMove() {
      var horizontalSpeed, verticalSpeed;
      horizontalSpeed = this.getDesignValue('invaders.formation.horizontalSpeed');
      verticalSpeed = this.getDesignValue('invaders.formation.verticalSpeed');
      return !(horizontalSpeed === 0 && verticalSpeed === 0);
    }
    gameFlowInvadersFormationMovementOrientationChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.GameFlow.Invaders.Formation.MovementOrientations;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'invaders.formation.movementOrientation'
      };
    }
    gameFlowInvadersFormationAttackDirectionChoice() {
      var movementOrientation, options;
      movementOrientation = this.getDesignValue('invaders.formation.movementOrientation');
      if (movementOrientation === this.constructor.Options.Orientations.Horizontal) {
        options = [{
          value: 'Up',
          text: this.constructor.Texts.GameFlow.Invaders.Formation.AttackDirections.Up,
          designValues: {
            'invaders.formation.attackDirection': this.constructor.Options.Directions.Up,
            'invaders.formation.verticalSpeed': this.constructor.DesignDefaults.invaders.formation.verticalSpeed
          }
        }, {
          value: 'Down',
          text: this.constructor.Texts.GameFlow.Invaders.Formation.AttackDirections.Down,
          designValues: {
            'invaders.formation.attackDirection': this.constructor.Options.Directions.Down,
            'invaders.formation.verticalSpeed': this.constructor.DesignDefaults.invaders.formation.verticalSpeed
          }
        }, {
          value: 'NoVertical',
          text: this.constructor.Texts.GameFlow.Invaders.Formation.AttackDirections.NoVertical,
          designValues: {
            'invaders.formation.attackDirection': this.constructor.Options.Directions.Down,
            'invaders.formation.verticalSpeed': 0
          }
        }];
      } else {
        options = [{
          value: 'Left',
          text: this.constructor.Texts.GameFlow.Invaders.Formation.AttackDirections.Left,
          designValues: {
            'invaders.formation.attackDirection': this.constructor.Options.Directions.Left,
            'invaders.formation.horizontalSpeed': this.constructor.DesignDefaults.invaders.formation.horizontalSpeed
          }
        }, {
          value: 'Right',
          text: this.constructor.Texts.GameFlow.Invaders.Formation.AttackDirections.Right,
          designValues: {
            'invaders.formation.attackDirection': this.constructor.Options.Directions.Right,
            'invaders.formation.horizontalSpeed': this.constructor.DesignDefaults.invaders.formation.horizontalSpeed
          }
        }, {
          value: 'NoHorizontal',
          text: this.constructor.Texts.GameFlow.Invaders.Formation.AttackDirections.NoHorizontal,
          designValues: {
            'invaders.formation.attackDirection': this.constructor.Options.Directions.Left,
            'invaders.formation.horizontalSpeed': 0
          }
        }];
      }
      return {
        options: options,
        value: () => {
          var attackDirection, horizontalSpeed, verticalSpeed;
          if (!(movementOrientation = this.getDesignValue('invaders.formation.movementOrientation'))) {
            return;
          }
          attackDirection = this.getDesignValue('invaders.formation.attackDirection');
          horizontalSpeed = this.getDesignValue('invaders.formation.horizontalSpeed');
          verticalSpeed = this.getDesignValue('invaders.formation.verticalSpeed');
          if (movementOrientation === this.constructor.Options.Orientations.Horizontal) {
            if (verticalSpeed == null) {
              return;
            }
            if (verticalSpeed === 0) {
              return 'NoVertical';
            }
            if (!attackDirection) {
              return;
            }
            if (attackDirection === this.constructor.Options.Directions.Up) {
              return 'Up';
            } else {
              return 'Down';
            }
          } else {
            if (horizontalSpeed == null) {
              return;
            }
            if (horizontalSpeed === 0) {
              return 'NoHorizontal';
            }
            if (!attackDirection) {
              return;
            }
            if (attackDirection === this.constructor.Options.Directions.Left) {
              return 'Left';
            } else {
              return 'Right';
            }
          }
        }
      };
    }
    gameFlowInvadersFormationAttack() {
      var horizontalSpeed, movementOrientation, verticalSpeed;
      if (!(movementOrientation = this.getDesignValue('invaders.formation.movementOrientation'))) {
        return true;
      }
      if (movementOrientation === this.constructor.Options.Orientations.Horizontal) {
        verticalSpeed = this.getDesignValue('invaders.formation.verticalSpeed');
        if (verticalSpeed == null) {
          return true;
        }
        return verticalSpeed !== 0;
      } else {
        horizontalSpeed = this.getDesignValue('invaders.formation.horizontalSpeed');
        if (horizontalSpeed == null) {
          return true;
        }
        return horizontalSpeed !== 0;
      }
    }
    gameFlowInvadersFormationMovementTypeChoice() {
      var allOption, horizontalSpeed, individualOption, movementOrientation, noHorizontal, noVertical, options, text, value, verticalSpeed;
      options = function () {
        var ref, results;
        ref = this.constructor.Texts.GameFlow.Invaders.Formation.MovementTypes;
        results = [];
        for (value in ref) {
          text = ref[value];
          results.push({
            value,
            text
          });
        }
        return results;
      }.call(this);
      horizontalSpeed = this.getDesignValue('invaders.formation.horizontalSpeed');
      verticalSpeed = this.getDesignValue('invaders.formation.verticalSpeed');
      noHorizontal = horizontalSpeed === 0;
      noVertical = verticalSpeed === 0;
      individualOption = _.find(options, option => {
        return option.value === this.constructor.Options.Invaders.Formation.MovementTypes.Individual;
      });
      individualOption.designValues = {
        'invaders.formation.movementType': this.constructor.Options.Invaders.Formation.MovementTypes.Individual,
        'invaders.formation.horizontalSpeed': noHorizontal ? 0 : this.constructor.DesignDefaults.invaders.formation.horizontalSpeed,
        'invaders.formation.verticalSpeed': noVertical ? 0 : this.constructor.DesignDefaults.invaders.formation.verticalSpeed
      };
      movementOrientation = this.getDesignValue('invaders.formation.movementOrientation');
      allOption = _.find(options, option => {
        return option.value === this.constructor.Options.Invaders.Formation.MovementTypes.All;
      });
      allOption.designValues = {
        'invaders.formation.movementType': this.constructor.Options.Invaders.Formation.MovementTypes.All,
        'invaders.formation.horizontalSpeed': noHorizontal ? 0 : this.constructor.DesignDefaults.invaders.formation.horizontalSpeed / (movementOrientation === this.constructor.Options.Orientations.Horizontal ? 10 : 1),
        'invaders.formation.verticalSpeed': noVertical ? 0 : this.constructor.DesignDefaults.invaders.formation.verticalSpeed / (movementOrientation === this.constructor.Options.Orientations.Vertical ? 10 : 1)
      };
      return {
        options: options,
        property: 'invaders.formation.movementType'
      };
    }
    gameFlowInvadersFormationMovementType() {
      return this.getDesignValue('invaders.formation.movementType');
    }
    gameFlowInvaderProjectilesDirectionChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.Directions;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'invaderProjectiles.direction'
      };
    }
    gameFlowInvaderProjectilesDefenderDeathTypeChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.GameFlow.InvaderProjectiles.DefenderDeathTypes;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'defender.deathType'
      };
    }
    gameFlowShieldsSideChoice() {
      var text, value;
      return {
        options: function () {
          var ref, results;
          ref = this.constructor.Texts.Sides;
          results = [];
          for (value in ref) {
            text = ref[value];
            results.push({
              value,
              text
            });
          }
          return results;
        }.call(this),
        property: 'shields.side'
      };
    }
  }
  ;
  DesignDocument.register(DesignDocument.id());
  DesignDocument.Options = {
    Directions: {
      Up: 'Up',
      Down: 'Down',
      Left: 'Left',
      Right: 'Right'
    },
    Orientations: {
      Horizontal: 'Horizontal',
      Vertical: 'Vertical'
    },
    HorizontalAlignments: {
      Left: 'Left',
      Center: 'Center',
      Right: 'Right'
    },
    VerticalAlignments: {
      Top: 'Top',
      Middle: 'Middle',
      Bottom: 'Bottom'
    },
    Sides: {
      Top: 'Top',
      Bottom: 'Bottom',
      Left: 'Left',
      Right: 'Right'
    },
    Themes: {
      ScienceFiction: 'ScienceFiction',
      DeepSea: 'DeepSea',
      CosmicHorror: 'CosmicHorror',
      MicroscopicWorld: 'MicroscopicWorld',
      Everything: 'Everything'
    },
    Entities: {
      Defender: 'Defender',
      Invader: 'Invader',
      DefenderProjectile: 'DefenderProjectile',
      InvaderProjectile: 'InvaderProjectile',
      Shield: 'Shield'
    },
    PostponeGameplay: {
      None: 'None',
      UntilSpawnedAll: 'UntilSpawnedAll'
    },
    DeathTypes: {
      Disappear: 'Disappear',
      Explode: 'Explode'
    },
    Defender: {
      Movements: {
        Horizontal: 'Horizontal',
        Vertical: 'Vertical',
        AllDirections: 'AllDirections'
      }
    },
    Invaders: {
      Formation: {
        SpawnOrder: {
          Ordered: 'Ordered',
          Random: 'Random'
        },
        MovementTypes: {
          Individual: 'Individual',
          All: 'All'
        }
      }
    }
  };
  DesignDocument.Texts = {
    Directions: {
      Up: '向上',
      Down: '向下',
      Left: '向左',
      Right: '向右'
    },
    Sides: {
      Top: '上方',
      Bottom: '下方',
      Left: '左侧',
      Right: '右侧'
    },
    Themes: {
      ScienceFiction: "科幻",
      DeepSea: "深海",
      CosmicHorror: "宇宙恐怖",
      MicroscopicWorld: "微观世界",
      Everything: "什么都有一点"
    },
    PostponeGameplay: {
      None: '立即开始',
      UntilSpawnedAll: '在此期间暂停'
    },
    GameFlow: {
      StartingAlignments: {
        TopLeft: '左上角',
        TopCenter: '上边',
        TopRight: '右上角',
        MiddleLeft: '左边',
        MiddleCenter: '中心',
        MiddleRight: '右边',
        BottomLeft: '左下角',
        BottomCenter: '下边',
        BottomRight: '右下角'
      },
      Defender: {
        Movements: {
          Horizontal: '左右',
          Vertical: '上下',
          AllDirections: "四个方向"
        }
      },
      DefenderProjectiles: {
        InvaderDeathTypes: {
          Disappear: '消失',
          Explode: '爆炸'
        },
        LevelUp: {
          IncreaseShootingFrequency: '更频繁射击',
          IncreaseScore: '分值提高',
          StayTheSame: '保持不变'
        }
      },
      Invaders: {
        Formation: {
          Appearing: {
            Individual: '逐个',
            All: '一次全部'
          },
          SpawnOrder: {
            Sequential: '顺序',
            Random: '随机顺序'
          },
          MovementTypes: {
            Individual: '逐个',
            All: '同步'
          },
          MovementOrientations: {
            Horizontal: '左右',
            Vertical: '上下'
          },
          AttackDirections: {
            Up: '向上推进',
            Down: '向下推进',
            Left: '向左推进',
            Right: '向右推进',
            NoHorizontal: '不水平移动',
            NoVertical: '不垂直移动'
          }
        }
      },
      InvaderProjectiles: {
        DefenderDeathTypes: {
          Disappear: '消失',
          Explode: '爆炸'
        },
        LevelUp: {
          IncreaseShootingFrequency: '更频繁射击',
          IncreaseScore: '分值提高',
          StayTheSame: '保持不变'
        }
      }
    }
  };
  DesignDocument.DesignSchema = {
    theme: DesignDocument.Options.Themes,
    entities: [DesignDocument.Options.Entities],
    postponeGameplay: DesignDocument.Options.PostponeGameplay,
    defender: {
      movement: DesignDocument.Options.Defender.Movements,
      startingAlignment: {
        horizontal: DesignDocument.Options.HorizontalAlignments,
        vertical: DesignDocument.Options.VerticalAlignments
      },
      deathType: DesignDocument.Options.DeathTypes
    },
    defenderProjectiles: {
      direction: DesignDocument.Options.Directions
    },
    invaders: {
      formation: {
        startingAlignment: {
          horizontal: DesignDocument.Options.HorizontalAlignments,
          vertical: DesignDocument.Options.VerticalAlignments
        },
        spawnOrder: DesignDocument.Options.Invaders.Formation.SpawnOrder,
        movementType: DesignDocument.Options.Invaders.Formation.MovementTypes,
        movementOrientation: DesignDocument.Options.Orientations,
        attackDirection: DesignDocument.Options.Directions
      },
      deathType: DesignDocument.Options.DeathTypes
    },
    invaderProjectiles: {
      direction: DesignDocument.Options.Directions
    },
    shields: {
      side: DesignDocument.Options.Sides
    }
  };
  DesignDocument.DesignDefaults = {
    lives: 3,
    postponeGameplay: DesignDocument.Options.PostponeGameplay.UntilSpawnedAll,
    defender: {
      movement: DesignDocument.Options.Defender.Movements.Horizontal,
      startingAlignment: {
        horizontal: DesignDocument.Options.HorizontalAlignments.Left,
        vertical: DesignDocument.Options.VerticalAlignments.Bottom
      },
      speed: 1,
      deathType: DesignDocument.Options.DeathTypes.Explode
    },
    defenderProjectiles: {
      direction: DesignDocument.Options.Directions.Up,
      speed: 2,
      maxCount: 1
    },
    invaders: {
      formation: {
        rows: 3,
        columns: 7,
        horizontalSpacing: 2,
        verticalSpacing: 2,
        startingAlignment: {
          horizontal: DesignDocument.Options.HorizontalAlignments.Center,
          vertical: DesignDocument.Options.VerticalAlignments.Top
        },
        spawnOrder: DesignDocument.Options.Invaders.Formation.SpawnOrder.Ordered,
        spawnDelay: 0.01,
        movementType: DesignDocument.Options.Invaders.Formation.MovementTypes.Individual,
        movementOrientation: DesignDocument.Options.Orientations.Horizontal,
        attackDirection: DesignDocument.Options.Directions.Down,
        horizontalSpeed: 2,
        verticalSpeed: 8,
        shooting: {
          timeoutFull: 3,
          timeoutFullDecreasePerLevel: 0.5,
          timeoutEmpty: 1,
          variability: 0.25
        }
      },
      scorePerInvader: 10,
      scoreIncreasePerInvaderPerLevel: 10,
      deathType: DesignDocument.Options.DeathTypes.Explode
    },
    invaderProjectiles: {
      direction: DesignDocument.Options.Directions.Down,
      speed: 1,
      maxCount: 3
    },
    shields: {
      amount: 4,
      spacing: 16,
      side: DesignDocument.Options.Sides.Bottom
    }
  };
  Component = DesignDocument;
  DesignDocument.Lives = function () {
    class Lives extends DesignDocument.Property {
      property() {
        return 'lives';
      }
      min() {
        return 1;
      }
    }
    ;
    Lives.register("".concat(Component.id(), ".Lives"));
    return Lives;
  }.call(this);
  DesignDocument.DefenderSpeed = function () {
    class DefenderSpeed extends DesignDocument.Property {
      property() {
        return 'defender.speed';
      }
      step() {
        return 0.1;
      }
      min() {
        return 0;
      }
    }
    ;
    DefenderSpeed.register("".concat(Component.id(), ".DefenderSpeed"));
    return DefenderSpeed;
  }.call(this);
  DesignDocument.DefenderProjectilesSpeed = function () {
    class DefenderProjectilesSpeed extends DesignDocument.Property {
      property() {
        return 'defenderProjectiles.speed';
      }
      step() {
        return 0.1;
      }
      min() {
        return 0;
      }
    }
    ;
    DefenderProjectilesSpeed.register("".concat(Component.id(), ".DefenderProjectilesSpeed"));
    return DefenderProjectilesSpeed;
  }.call(this);
  DesignDocument.DefenderProjectilesMaxCount = function () {
    class DefenderProjectilesMaxCount extends DesignDocument.Property {
      property() {
        return 'defenderProjectiles.maxCount';
      }
      min() {
        return 0;
      }
    }
    ;
    DefenderProjectilesMaxCount.register("".concat(Component.id(), ".DefenderProjectilesMaxCount"));
    return DefenderProjectilesMaxCount;
  }.call(this);
  DesignDocument.InvadersFormationRows = function () {
    class InvadersFormationRows extends DesignDocument.Property {
      property() {
        return 'invaders.formation.rows';
      }
      min() {
        return 1;
      }
    }
    ;
    InvadersFormationRows.register("".concat(Component.id(), ".InvadersFormationRows"));
    return InvadersFormationRows;
  }.call(this);
  DesignDocument.InvadersFormationColumns = function () {
    class InvadersFormationColumns extends DesignDocument.Property {
      property() {
        return 'invaders.formation.columns';
      }
      min() {
        return 1;
      }
    }
    ;
    InvadersFormationColumns.register("".concat(Component.id(), ".InvadersFormationColumns"));
    return InvadersFormationColumns;
  }.call(this);
  DesignDocument.InvadersFormationHorizontalSpacing = function () {
    class InvadersFormationHorizontalSpacing extends DesignDocument.Property {
      property() {
        return 'invaders.formation.horizontalSpacing';
      }
    }
    ;
    InvadersFormationHorizontalSpacing.register("".concat(Component.id(), ".InvadersFormationHorizontalSpacing"));
    return InvadersFormationHorizontalSpacing;
  }.call(this);
  DesignDocument.InvadersFormationVerticalSpacing = function () {
    class InvadersFormationVerticalSpacing extends DesignDocument.Property {
      property() {
        return 'invaders.formation.verticalSpacing';
      }
    }
    ;
    InvadersFormationVerticalSpacing.register("".concat(Component.id(), ".InvadersFormationVerticalSpacing"));
    return InvadersFormationVerticalSpacing;
  }.call(this);
  DesignDocument.InvadersFormationHorizontalSpeed = function () {
    class InvadersFormationHorizontalSpeed extends DesignDocument.Property {
      property() {
        return 'invaders.formation.horizontalSpeed';
      }
      step() {
        return 0.1;
      }
      min() {
        return 0;
      }
    }
    ;
    InvadersFormationHorizontalSpeed.register("".concat(Component.id(), ".InvadersFormationHorizontalSpeed"));
    return InvadersFormationHorizontalSpeed;
  }.call(this);
  DesignDocument.InvadersFormationVerticalSpeed = function () {
    class InvadersFormationVerticalSpeed extends DesignDocument.Property {
      property() {
        return 'invaders.formation.verticalSpeed';
      }
      step() {
        return 0.1;
      }
      min() {
        return 0;
      }
    }
    ;
    InvadersFormationVerticalSpeed.register("".concat(Component.id(), ".InvadersFormationVerticalSpeed"));
    return InvadersFormationVerticalSpeed;
  }.call(this);
  DesignDocument.InvadersFormationSpawnDelay = function () {
    class InvadersFormationSpawnDelay extends DesignDocument.Property {
      property() {
        return 'invaders.formation.spawnDelay';
      }
      step() {
        return 0.01;
      }
      min() {
        return 0;
      }
    }
    ;
    InvadersFormationSpawnDelay.register("".concat(Component.id(), ".InvadersFormationSpawnDelay"));
    return InvadersFormationSpawnDelay;
  }.call(this);
  DesignDocument.InvadersFormationShootingTimeoutFull = function () {
    class InvadersFormationShootingTimeoutFull extends DesignDocument.Property {
      property() {
        return 'invaders.formation.shooting.timeoutFull';
      }
      step() {
        return 0.1;
      }
      min() {
        return 0;
      }
    }
    ;
    InvadersFormationShootingTimeoutFull.register("".concat(Component.id(), ".InvadersFormationShootingTimeoutFull"));
    return InvadersFormationShootingTimeoutFull;
  }.call(this);
  DesignDocument.InvadersFormationShootingTimoutEmpty = function () {
    class InvadersFormationShootingTimoutEmpty extends DesignDocument.Property {
      property() {
        return 'invaders.formation.shooting.timeoutEmpty';
      }
      step() {
        return 0.1;
      }
      min() {
        return 0;
      }
    }
    ;
    InvadersFormationShootingTimoutEmpty.register("".concat(Component.id(), ".InvadersFormationShootingTimoutEmpty"));
    return InvadersFormationShootingTimoutEmpty;
  }.call(this);
  DesignDocument.InvadersFormationTimeoutFullDecreasePerLevel = function () {
    class InvadersFormationTimeoutFullDecreasePerLevel extends DesignDocument.Property {
      property() {
        return 'invaders.formation.shooting.timeoutFullDecreasePerLevel';
      }
      step() {
        return 0.1;
      }
    }
    ;
    InvadersFormationTimeoutFullDecreasePerLevel.register("".concat(Component.id(), ".InvadersFormationTimeoutFullDecreasePerLevel"));
    return InvadersFormationTimeoutFullDecreasePerLevel;
  }.call(this);
  DesignDocument.InvadersFormationShootingVariability = function () {
    class InvadersFormationShootingVariability extends DesignDocument.Property {
      property() {
        return 'invaders.formation.shooting.variability';
      }
      min() {
        return 0;
      }
      load() {
        return Math.round(super.load() * 100);
      }
      save(value) {
        return super.save(value / 100);
      }
    }
    ;
    InvadersFormationShootingVariability.register("".concat(Component.id(), ".InvadersFormationShootingVariability"));
    return InvadersFormationShootingVariability;
  }.call(this);
  DesignDocument.InvadersScorePerInvader = function () {
    class InvadersScorePerInvader extends DesignDocument.Property {
      property() {
        return 'invaders.scorePerInvader';
      }
    }
    ;
    InvadersScorePerInvader.register("".concat(Component.id(), ".InvadersScorePerInvader"));
    return InvadersScorePerInvader;
  }.call(this);
  DesignDocument.InvadersScoreIncreasePerInvaderPerLevel = function () {
    class InvadersScoreIncreasePerInvaderPerLevel extends DesignDocument.Property {
      property() {
        return 'invaders.scoreIncreasePerInvaderPerLevel';
      }
    }
    ;
    InvadersScoreIncreasePerInvaderPerLevel.register("".concat(Component.id(), ".InvadersScoreIncreasePerInvaderPerLevel"));
    return InvadersScoreIncreasePerInvaderPerLevel;
  }.call(this);
  DesignDocument.InvaderProjectilesSpeed = function () {
    class InvaderProjectilesSpeed extends DesignDocument.Property {
      property() {
        return 'invaderProjectiles.speed';
      }
      step() {
        return 0.1;
      }
      min() {
        return 0;
      }
    }
    ;
    InvaderProjectilesSpeed.register("".concat(Component.id(), ".InvaderProjectilesSpeed"));
    return InvaderProjectilesSpeed;
  }.call(this);
  DesignDocument.InvaderProjectilesMaxCount = function () {
    class InvaderProjectilesMaxCount extends DesignDocument.Property {
      property() {
        return 'invaderProjectiles.maxCount';
      }
      min() {
        return 0;
      }
    }
    ;
    InvaderProjectilesMaxCount.register("".concat(Component.id(), ".InvaderProjectilesMaxCount"));
    return InvaderProjectilesMaxCount;
  }.call(this);
  DesignDocument.ShieldsAmount = function () {
    class ShieldsAmount extends DesignDocument.Property {
      property() {
        return 'shields.amount';
      }
      min() {
        return 0;
      }
    }
    ;
    ShieldsAmount.register("".concat(Component.id(), ".ShieldsAmount"));
    return ShieldsAmount;
  }.call(this);
  DesignDocument.ShieldsSpacing = function () {
    class ShieldsSpacing extends DesignDocument.Property {
      property() {
        return 'shields.spacing';
      }
    }
    ;
    ShieldsSpacing.register("".concat(Component.id(), ".ShieldsSpacing"));
    return ShieldsSpacing;
  }.call(this);
  return DesignDocument;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/asset.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, DesignDocument, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
DesignDocument = PAA.Pico8.Cartridges.Invasion.DesignDocument;
DesignDocument.Asset = function () {
  class Asset extends PAA.PixelPad.Apps.Drawing.Portfolio.Asset {
    static id() {
      return 'PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Asset';
    }
    static type() {
      return this.Types.None;
    }
    static displayName() {
      return "Design Document";
    }
    static description() {
      return "指定入侵游戏的设计。";
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
      this.portfolioComponent = new DesignDocument.PortfolioComponent(this);
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
      return 63;
    }
    height() {
      return 85;
    }
    ready() {
      return true;
    }
    urlParameter() {
      return 'designdocument';
    }
    onClick() {
      var pixelPad;
      pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad);
      pixelPad.os.go(PAA.PixelPad.Apps.Pixeltosh.url());
      return Tracker.autorun(function (computation) {
        var file, pixeltoshOS, writer;
        if (!(pixeltoshOS = PAA.PixelPad.Apps.Pixeltosh.getOS())) {
          return;
        }
        computation.stop();
        writer = pixeltoshOS.getProgram(PAA.Pixeltosh.Programs.Writer);
        file = pixeltoshOS.fileSystem.getFileForPath('入侵/入侵设计文档');
        return pixeltoshOS.loadProgram(writer, file);
      });
    }
  }
  ;
  Asset.initialize();
  return Asset;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"choice":{"choice.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/choice/choice.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pico8.Cartridges.Invasion.DesignDocument.Choice = function () {
  class Choice extends AM.Component {
    static id() {
      return "PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Choice";
    }
    onCreated() {
      super.onCreated(...arguments);
      this.designDocument = this.parentComponent();
      this.value = new ComputedField(() => {
        var choice;
        choice = this.data();
        if (choice.value) {
          return choice.value();
        } else if (choice.property) {
          return this.designDocument.getDesignValue(choice.property);
        }
      });
      return this.manualEditing = new ReactiveField(false);
    }
    editing() {
      return this.manualEditing() || this.chosenChoiceText() == null;
    }
    chosenChoiceText() {
      var choice, option, value;
      choice = this.data();
      value = this.value();
      if (!(option = _.find(choice.options, option => {
        return value === option.value;
      }))) {
        return;
      }
      return option.text;
    }
    chosenChoiceCursor() {
      if (this.designDocument.animating()) {
        return 'default';
      } else {
        return 'pointer';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .option': this.onClickOption,
        'click .chosen-choice': this.onClickChosenChoice
      });
    }
    onClickOption(event) {
      var choice, option, property, ref, value;
      choice = this.data();
      option = this.currentData();
      if (option.designValues) {
        ref = option.designValues;
        for (property in ref) {
          value = ref[property];
          this.designDocument.setDesignValue(property, value);
        }
      } else if (choice.property) {
        this.designDocument.setDesignValue(choice.property, option.value);
      }
      return this.manualEditing(false);
    }
    onClickChosenChoice(event) {
      if (this.designDocument.animating()) {
        return;
      }
      this.manualEditing(true);
      return Tracker.afterFlush(() => {
        return this.designDocument.window.scrollToElement(this.$('.choice')[0]);
      });
    }
  }
  ;
  Choice.register(Choice.id());
  return Choice;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.choice.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/choice/template.choice.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Choice");
Template["PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Choice"] = new Template("Template.PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Choice", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("editing"));
  }, function() {
    return [ "\n    …\n    ", HTML.UL({
      class: "choice",
      "data-cursor": "default"
    }, "\n      ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("options"));
    }, function() {
      return [ "\n        ", HTML.LI({
        class: "option-area"
      }, HTML.BUTTON({
        class: "option"
      }, Blaze.View("lookup:text", function() {
        return Spacebars.mustache(view.lookup("text"));
      }))), "\n      " ];
    }), "\n    "), "\n  " ];
  }, function() {
    return HTML.SPAN({
      class: "chosen-choice",
      "data-cursor": function() {
        return Spacebars.mustache(view.lookup("chosenChoiceCursor"));
      }
    }, Blaze.View("lookup:chosenChoiceText", function() {
      return Spacebars.mustache(view.lookup("chosenChoiceText"));
    }));
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"entities":{"entities.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/entities/entities.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AM,
  DesignDocument,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Base;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DesignDocument = PAA.Pico8.Cartridges.Invasion.DesignDocument;
DesignDocument.Entities = function () {
  class Entities extends AM.Component {
    static id() {
      return "PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Entities";
    }
    onCreated() {
      super.onCreated(...arguments);
      this.designDocument = this.parentComponent();
      this.value = new ComputedField(() => {
        var choice;
        choice = this.data();
        if (choice.value) {
          return choice.value();
        } else if (choice.property) {
          return this.designDocument.getDesignValue(choice.property);
        }
      });
      this.addingEntity = new ReactiveField(false);
      this.assetClasses = [PAA.Pico8.Cartridges.Invasion.Defender, PAA.Pico8.Cartridges.Invasion.DefenderProjectile, PAA.Pico8.Cartridges.Invasion.DefenderProjectileExplosion, PAA.Pico8.Cartridges.Invasion.Invader, PAA.Pico8.Cartridges.Invasion.InvaderProjectile, PAA.Pico8.Cartridges.Invasion.InvaderProjectileExplosion, PAA.Pico8.Cartridges.Invasion.Shield];
      this.projectThing = new ComputedField(() => {
        var projectId, ref;
        if ((ref = this._projectThing) != null) {
          ref.destroy();
        }
        if (!(projectId = this.designDocument.projectId())) {
          return;
        }
        this._projectThing = Tracker.nonreactive(() => {
          return new PAA.Pico8.Cartridges.Invasion.Project(projectId);
        });
        return this._projectThing;
      });
      this._assets = [];
      return this.assets = new ComputedField(() => {
        var entity, entityClass, i, len, projectThing, ref;
        ref = this._assets;
        for (i = 0, len = ref.length; i < len; i++) {
          entity = ref[i];
          entity.destroy();
        }
        if (!(projectThing = this.projectThing())) {
          return;
        }
        this._assets = function () {
          var j, len1, ref1, results;
          ref1 = this.assetClasses;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            entityClass = ref1[j];
            results.push(Tracker.nonreactive(() => {
              return new entityClass(projectThing);
            }));
          }
          return results;
        }.call(this);
        return this._assets;
      });
    }
    onDestroyed() {
      var entity, i, len, ref, results;
      super.onDestroyed(...arguments);
      this._projectThing.destroy();
      ref = this._assets;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        entity = ref[i];
        results.push(entity.destroy());
      }
      return results;
    }
    canAddEntity() {
      var asset, bitmap, i, len, optionalAssetIds, project, ref, ref1;
      if (!(project = this.designDocument.project())) {
        return;
      }
      if (!project.assets) {
        return;
      }
      optionalAssetIds = [PAA.Pico8.Cartridges.Invasion.DefenderProjectileExplosion.id(), PAA.Pico8.Cartridges.Invasion.InvaderProjectileExplosion.id()];
      ref = project.assets;
      for (i = 0, len = ref.length; i < len; i++) {
        asset = ref[i];
        if (!(ref1 = asset.id, indexOf.call(optionalAssetIds, ref1) < 0)) {
          continue;
        }
        if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
          return;
        }

        // We know the player has changed the bitmap if the history position is not zero.
        if (!bitmap.historyPosition) {
          return;
        }
      }
      if (!this.availableEntities().length) {
        return;
      }
      return true;
    }
    availableEntities() {
      var assets, defender, defenderProjectile, entities, hasDefender, hasDefenderProjectile, hasInvader, hasInvaderProjectile, hasShield, invader, invaderProjectile, project, ref, ref1, ref2, ref3, ref4, shield;
      if (!(project = this.designDocument.project())) {
        return;
      }
      assets = this.assets();
      defender = _.find(assets, asset => {
        return asset.id() === PAA.Pico8.Cartridges.Invasion.Defender.id();
      });
      invader = _.find(assets, asset => {
        return asset.id() === PAA.Pico8.Cartridges.Invasion.Invader.id();
      });
      defenderProjectile = _.find(assets, asset => {
        return asset.id() === PAA.Pico8.Cartridges.Invasion.DefenderProjectile.id();
      });
      invaderProjectile = _.find(assets, asset => {
        return asset.id() === PAA.Pico8.Cartridges.Invasion.InvaderProjectile.id();
      });
      shield = _.find(assets, asset => {
        return asset.id() === PAA.Pico8.Cartridges.Invasion.Shield.id();
      });
      hasDefender = (ref = DesignDocument.Options.Entities.Defender, indexOf.call(project.design.entities, ref) >= 0);
      hasInvader = (ref1 = DesignDocument.Options.Entities.Invader, indexOf.call(project.design.entities, ref1) >= 0);
      hasDefenderProjectile = (ref2 = DesignDocument.Options.Entities.DefenderProjectile, indexOf.call(project.design.entities, ref2) >= 0);
      hasInvaderProjectile = (ref3 = DesignDocument.Options.Entities.InvaderProjectile, indexOf.call(project.design.entities, ref3) >= 0);
      hasShield = (ref4 = DesignDocument.Options.Entities.Shield, indexOf.call(project.design.entities, ref4) >= 0);
      entities = [!hasDefender ? defender : void 0, !hasInvader ? invader : void 0, hasDefender && !hasDefenderProjectile ? defenderProjectile : void 0, hasInvader && !hasInvaderProjectile ? invaderProjectile : void 0, (hasDefenderProjectile || hasInvaderProjectile) && !hasShield ? shield : void 0];
      return _.without(entities, void 0);
    }
    chosenText() {
      var choice, option, value;
      choice = this.data();
      value = this.value();
      option = _.find(choice.options, option => {
        return value === option.value;
      });
      if (!option) {
        console.warn("No option found for value", value, choice);
        return;
      }
      return option.text;
    }
    events() {
      return super.events(...arguments).concat({
        'click .add-entity-button': this.onClickAddEntityButton,
        'click .entity-button': this.onClickEntityButton
      });
    }
    onClickAddEntityButton(event) {
      this.addingEntity(true);
      return Tracker.afterFlush(() => {
        return this.designDocument.window.scrollToElement(this.$('.pixelartacademy-pico8-cartridges-invasion-designdocument-entities')[0]);
      });
    }
    onClickEntityButton(event) {
      var asset, assetId, defenderProjectileExplosion, entities, entityId, invaderProjectileExplosion;
      asset = this.currentData();
      assetId = asset.id();
      this.addingEntity(false);
      entityId = _.last(assetId.split('.'));
      entities = this.designDocument.getDesignValue('entities') || [];
      if (indexOf.call(entities, entityId) >= 0) {
        return;
      }
      entities.push(entityId);
      this.designDocument.setDesignValue('entities', entities);
      this._addAsset(asset);

      // Projectiles also require the explosion assets to be added.
      if (assetId === PAA.Pico8.Cartridges.Invasion.DefenderProjectile.id()) {
        defenderProjectileExplosion = _.find(this.assets(), asset => {
          return asset.id() === PAA.Pico8.Cartridges.Invasion.DefenderProjectileExplosion.id();
        });
        this._addAsset(defenderProjectileExplosion);
      }
      if (assetId === PAA.Pico8.Cartridges.Invasion.InvaderProjectile.id()) {
        invaderProjectileExplosion = _.find(this.assets(), asset => {
          return asset.id() === PAA.Pico8.Cartridges.Invasion.InvaderProjectileExplosion.id();
        });
        return this._addAsset(invaderProjectileExplosion);
      }
    }
    async _addAsset(asset) {
      var assetId, assetImage, bitmapData, bitmapId, creationTime, height, imageUrl, layer, pico8Palette, projectId, width;
      assetId = asset.id();

      // Create the asset bitmap.
      projectId = this.designDocument.projectId();

      // Load the asset image.
      imageUrl = asset.constructor.imageUrl();
      assetImage = await new Promise(resolve => {
        var image;
        image = new Image();
        image.addEventListener('load', () => {
          return resolve(image);
        }, false);

        // Initiate the loading.
        return image.src = Meteor.absoluteUrl(imageUrl);
      });

      // Load the PICO-8 palette.
      pico8Palette = await new Promise(resolve => {
        return Tracker.autorun(computation => {
          var palette;
          LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Pico8);
          if (!(palette = LOI.Assets.Palette.documents.findOne({
            name: LOI.Assets.Palette.SystemPaletteNames.Pico8
          }))) {
            return;
          }
          computation.stop();
          return resolve(palette);
        });
      });
      // Create a bitmap out of the image.
      creationTime = new Date();
      width = assetImage.width;
      height = assetImage.height;
      bitmapData = {
        versioned: true,
        profileId: LOI.adventure.profileId(),
        creationTime: creationTime,
        lastEditTime: creationTime,
        name: asset.displayName(),
        bounds: {
          fixed: true,
          left: 0,
          right: width - 1,
          top: 0,
          bottom: height - 1
        },
        pixelFormat: new LOI.Assets.Bitmap.PixelFormat('flags', 'paletteColor'),
        palette: {
          _id: pico8Palette._id
        }
      };
      layer = new LOI.Assets.Bitmap.Layer(bitmapData, bitmapData, {
        bounds: {
          x: 0,
          y: 0,
          width: width,
          height: height
        }
      });
      layer.importImage(assetImage, pico8Palette);
      bitmapData.layers = [layer.toPlainObject()];
      bitmapId = LOI.Assets.Bitmap.documents.insert(bitmapData);
      // Add the bitmap to the project assets.
      return PAA.Practice.Project.documents.update(projectId, {
        $push: {
          assets: {
            id: assetId,
            type: asset.constructor.type(),
            bitmapId: bitmapId
          }
        },
        $set: {
          lastEditTime: creationTime
        }
      });
    }
  }
  ;
  Entities.register(Entities.id());
  return Entities;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.entities.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/entities/template.entities.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Entities");
Template["PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Entities"] = new Template("Template.PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.Entities", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pico8-cartridges-invasion-designdocument-entities"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("addingEntity"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "entities",
      "data-cursor": "default"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("availableEntities"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "entity"
      }, HTML.BUTTON({
        class: "entity-button"
      }, Blaze.View("lookup:displayName", function() {
        return Spacebars.mustache(view.lookup("displayName"));
      }))), "\n        " ];
    }), "\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canAddEntity"));
    }, function() {
      return HTML.Raw('\n        <p data-unit="entities-add">\n          <button class="add-entity-button" data-cursor="pointer">添加实体</button>\n        </p>\n      ');
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/portfoliocomponent/portfoliocomponent.coffee      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, DesignDocument, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
DesignDocument = PAA.Pico8.Cartridges.Invasion.DesignDocument;
DesignDocument.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {}
  ;
  PortfolioComponent.register('PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pico8-invasion/designdocument/portfoliocomponent/template.portfoliocomponent.js //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.PortfolioComponent");
Template["PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.PortfolioComponent"] = new Template("Template.PixelArtAcademy.Pico8.Cartridges.Invasion.DesignDocument.PortfolioComponent", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pico8-cartridges-invasion-designdocument-portfoliocomponent"></div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/invasion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/project.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/project-startend.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/designdocument.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/template.designdocument.js");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/designdocument-design.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/choice/choice.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/choice/template.choice.js");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/entities/entities.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/entities/template.entities.js");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-invasion/designdocument/portfoliocomponent/template.portfoliocomponent.js");

/* Exports */
Package._define("retronator:pixelartacademy-pico8-invasion", {
  PixelArtAcademy: PixelArtAcademy
});

})();
