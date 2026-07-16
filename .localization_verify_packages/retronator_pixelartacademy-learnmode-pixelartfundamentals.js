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
var LandsOfIllusions = Package['retronator:landsofillusions'].LandsOfIllusions;
var PixelArtAcademy = Package['retronator:pixelartacademy-publication'].PixelArtAcademy;
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
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-learnmode-pixelartfundamentals":{"pixelartfundamentals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/pixelartfundamentals.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals = function () {
  class PixelArtFundamentals extends LOI.Adventure.Episode {
    // unlocked: boolean whether this episode's content is instantly available
    // pinballUnlocked: boolean whether the pinball project is instantly available
    // drawQuicklyUnlocked: boolean whether the Draw Quickly game is instantly available
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals';
    }
    static fullName() {
      return "像素艺术基础";
    }
    static chapters() {
      return [this.Fundamentals];
    }
    static scenes() {
      return [this.Apps, this.Systems];
    }
    static startSection() {
      return this.Start;
    }
    static pixeltoshEnabled() {
      if (this.pinballEnabled() || this.drawQuicklyEnabled()) {
        // Allow cheating.
        return true;
      }
      return PAA.Tutorials.Drawing.ElementsOfArt.Line.completed();
    }
    static pinballEnabled() {
      if (LM.PixelArtFundamentals.state('pinballUnlocked')) {
        // Allow cheating.
        return true;
      }
      if (!LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.activeOrCompleted()) {
        return false;
      }
      return LM.PixelArtFundamentals.Fundamentals.Goals.Jaggies.SmoothCurves.completed();
    }
    static drawQuicklyEnabled() {
      if (LM.PixelArtFundamentals.state('drawQuicklyUnlocked')) {
        // Allow cheating.
        return true;
      }
      if (!LM.PixelArtFundamentals.Fundamentals.Goals.Simplification.activeOrCompleted()) {
        return false;
      }
      return PAA.Tutorials.Drawing.Simplification.completed();
    }
    static chessEnabled() {
      if (LM.PixelArtFundamentals.state('chessUnlocked')) {
        // Allow cheating.
        return true;
      }
      if (!LM.PixelArtFundamentals.Fundamentals.Goals.Chess.activeOrCompleted()) {
        return false;
      }
      return LM.PixelArtFundamentals.Fundamentals.Goals.Size.completed();
    }
  }
  ;
  PixelArtFundamentals.initialize();
  return PixelArtFundamentals;
}.call(this);
if (Meteor.isServer) {
  LOI.initializePackage({
    id: 'retronator_pixelartacademy-learnmode-pixelartfundamentals',
    assets: Assets
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"scenes":{"apps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/scenes/apps.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Apps = function () {
  class Apps extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Apps';
    }
    static location() {
      return PAA.PixelPad.Apps;
    }
    things() {
      return [LOI.adventure.currentTapeSelectors().length ? PAA.PixelPad.Apps.Music : void 0];
    }
  }
  ;
  Apps.initialize();
  return Apps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"systems.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/scenes/systems.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Systems = function () {
  class Systems extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Systems';
    }
    static location() {
      return PAA.PixelPad.Systems;
    }
    things() {
      return [PAA.PixelPad.Systems.Music];
    }
  }
  ;
  Systems.initialize();
  return Systems;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"start":{"start.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/start/start.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Start = function () {
  class Start extends LOI.Adventure.Section {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Start';
    }
    static scenes() {
      return [];
    }
    static started() {
      return true;
    }
    static finished() {
      var tutorial;
      if (!LOI.adventureInitialized()) {
        return;
      }
      if (LM.PixelArtFundamentals.state('unlocked')) {
        // Allow cheating.
        return true;
      }
      if (!(tutorial = Tracker.nonreactive(() => {
        return LOI.adventure.getCurrentChapter(LM.Intro.Tutorial);
      }))) {
        // Pixel art fundamentals start after the intro is finished.
        return false;
      }
      return tutorial.finished();
    }
  }
  ;
  Start.initialize();
  return Start;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"fundamentals":{"fundamentals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/fundamentals.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LM, LOI, PAA, Pinball;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Chess = PAA.Pixeltosh.Programs.Chess;
LM.PixelArtFundamentals.Fundamentals = function () {
  class Fundamentals extends LM.Chapter {
    // openedPinballMachine: boolean whether the player has opened the Pinball Machine file.
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals';
    }
    static fullName() {
      return "像素艺术基础";
    }
    static number() {
      return 1;
    }
    static sections() {
      return [];
    }
    static scenes() {
      return [this.Apps, this.TutorialsDrawing, this.ChallengesDrawing, this.PixeltoshPrograms, this.PixeltoshFiles, this.Workbench, this.MusicTapes, this.Publications, this.Publications.Parts, this.Pico8Cartridges];
    }
    static courses() {
      return [LM.PixelArtFundamentals.Fundamentals.Content.Course];
    }
    constructor() {
      super(...arguments);

      // Create the pinball project when the application is enabled.
      this._createPinballProjectAutorun = Tracker.autorun(computation => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        if (!LM.PixelArtFundamentals.pinballEnabled()) {
          return;
        }
        if (Pinball.Project.state('activeProjectId')) {
          return;
        }
        return Pinball.Project.start();
      });
      // Create the chess projects when the content is unlocked.
      this._createChess2DProjectAutorun = Tracker.autorun(computation => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        if (LM.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional.getAdventureInstance().status() !== LM.Content.Status.Unlocked) {
          return;
        }
        if (Chess.Project.TwoDimensional.state('activeProjectId')) {
          return;
        }
        return Chess.Project.TwoDimensional.start();
      });

      // Create assets for the pieces the player owns.
      this._createChessAssetsAutorun = Tracker.autorun(computation => {
        var blackAsset, blackAssetId, count, ownedPieceTypeCounts, pieceType, project, projectId, results, whiteAsset, whiteAssetData, whiteAssetId, whiteBitmap;
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        if (!(projectId = Chess.Project.TwoDimensional.state('activeProjectId'))) {
          return;
        }
        if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
          return;
        }
        if (!(ownedPieceTypeCounts = Chess.state('ownedPieceTypeCounts'))) {
          return;
        }
        results = [];
        for (pieceType in ownedPieceTypeCounts) {
          count = ownedPieceTypeCounts[pieceType];
          if (!count) {
            continue;
          }
          // Add the white piece asset as soon as a piece is owned.
          whiteAsset = Chess.Assets.TwoDimensional[pieceType].White;
          whiteAssetId = whiteAsset.id();
          whiteAssetData = _.find(project.assets, asset => {
            return asset.id === whiteAssetId;
          });
          if (!whiteAssetData) {
            whiteAsset.addToProject(projectId);
            continue;
          }

          // Add the black piece after the white piece asset is drawn.
          blackAsset = Chess.Assets.TwoDimensional[pieceType].Black;
          blackAssetId = blackAsset.id();
          if (_.find(project.assets, asset => {
            return asset.id === blackAssetId;
          })) {
            continue;
          }
          if (!(whiteBitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(whiteAssetData.bitmapId))) {
            continue;
          }
          if (!whiteBitmap.historyPosition) {
            continue;
          }
          results.push(blackAsset.addToProject(projectId));
        }
        return results;
      });
    }
    destroy() {
      super.destroy(...arguments);
      this._createPinballProjectAutorun.stop();
      this._createChess2DProjectAutorun.stop();
      return this._createChessAssetsAutorun.stop();
    }
  }
  ;
  Fundamentals.initialize();
  return Fundamentals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"scenes":{"tutorialsdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/tutorialsdrawing.coffee      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.TutorialsDrawing = function () {
  class TutorialsDrawing extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.TutorialsDrawing';
    }
    static location() {
      return PAA.Practice.Tutorials.Drawing;
    }
    destroy() {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
      super.destroy(...arguments);
      if ((ref = this._archive) != null) {
        ref.destroy();
      }
      if ((ref1 = this._pixelArtFundamentals) != null) {
        ref1.destroy();
      }
      if ((ref2 = this._tutorialLine) != null) {
        ref2.destroy();
      }
      if ((ref3 = this._tutorialShape) != null) {
        ref3.destroy();
      }
      if ((ref4 = this._tutorialPixelArtLines) != null) {
        ref4.destroy();
      }
      if ((ref5 = this._tutorialPixelArtDiagonals) != null) {
        ref5.destroy();
      }
      if ((ref6 = this._tutorialPixelArtCurves) != null) {
        ref6.destroy();
      }
      if ((ref7 = this._tutorialPixelArtLineWidth) != null) {
        ref7.destroy();
      }
      if ((ref8 = this._tutorialSimplification) != null) {
        ref8.destroy();
      }
      return (ref9 = this._tutorialSize) != null ? ref9.destroy() : void 0;
    }
    things() {
      var location, ref, things;
      things = [];
      if (LM.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.activeAndAvailable()) {
        if (this._tutorialLine == null) {
          this._tutorialLine = Tracker.nonreactive(() => {
            return new PAA.Tutorials.Drawing.ElementsOfArt.Line();
          });
        }
        things.push(this._tutorialLine);
        if (this._tutorialLine.completed()) {
          if (this._tutorialShape == null) {
            this._tutorialShape = Tracker.nonreactive(() => {
              return new PAA.Tutorials.Drawing.ElementsOfArt.Shape();
            });
          }
          things.push(this._tutorialShape);
        }
      }

      // Prepare portfolio folders.
      if (this._pixelArtFundamentals == null) {
        this._pixelArtFundamentals = Tracker.nonreactive(() => {
          return new this.constructor.PixelArtFundamentals();
        });
      }
      if (this._archive == null) {
        this._archive = Tracker.nonreactive(() => {
          return new PAA.PixelPad.Apps.Drawing.Portfolio.Archive();
        });
      }

      // Reset previously added things.  
      this._pixelArtFundamentals.things = [];
      this._archive.things = [];
      if (LM.PixelArtFundamentals.Fundamentals.Goals.Jaggies.addedAndAvailable()) {
        if (LM.PixelArtFundamentals.Fundamentals.Goals.Jaggies.active()) {
          location = things;
        } else {
          location = this._pixelArtFundamentals.things;
        }
        if (this._tutorialPixelArtLines == null) {
          this._tutorialPixelArtLines = Tracker.nonreactive(() => {
            return new PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines();
          });
        }
        location.push(this._tutorialPixelArtLines);
        if ((ref = this._tutorialPixelArtLines) != null ? ref.completed() : void 0) {
          if (this._tutorialPixelArtDiagonals == null) {
            this._tutorialPixelArtDiagonals = Tracker.nonreactive(() => {
              return new PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals();
            });
          }
          location.push(this._tutorialPixelArtDiagonals);
          if (this._tutorialPixelArtCurves == null) {
            this._tutorialPixelArtCurves = Tracker.nonreactive(() => {
              return new PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves();
            });
          }
          location.push(this._tutorialPixelArtCurves);
          if (this._tutorialPixelArtLineWidth == null) {
            this._tutorialPixelArtLineWidth = Tracker.nonreactive(() => {
              return new PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth();
            });
          }
          location.push(this._tutorialPixelArtLineWidth);
        }
      }
      if (LM.PixelArtFundamentals.Fundamentals.Goals.Size.addedAndAvailable()) {
        if (LM.PixelArtFundamentals.Fundamentals.Goals.Size.active()) {
          location = things;
        } else {
          location = this._pixelArtFundamentals.things;
        }
        if (this._tutorialSize == null) {
          this._tutorialSize = Tracker.nonreactive(() => {
            return new PAA.Tutorials.Drawing.PixelArtFundamentals.Size();
          });
        }
        location.push(this._tutorialSize);
      }
      if (this._pixelArtFundamentals.things.length) {
        // Add pixel art fundamentals folder if needed.
        this._archive.things.push(this._pixelArtFundamentals);
      }
      if (LM.PixelArtFundamentals.Fundamentals.Goals.Simplification.addedAndAvailable()) {
        if (LM.PixelArtFundamentals.Fundamentals.Goals.Simplification.active()) {
          location = things;
        } else {
          location = this._archive.things;
        }
        if (this._tutorialSimplification == null) {
          this._tutorialSimplification = Tracker.nonreactive(() => {
            return new PAA.Tutorials.Drawing.Simplification();
          });
        }
        location.push(this._tutorialSimplification);
      }
      if (this._archive.things.length) {
        // Add archive folders if needed.
        things.push(this._archive);
      }
      return things;
    }
  }
  ;
  TutorialsDrawing.initialize();
  TutorialsDrawing.PixelArtFundamentals = function () {
    class PixelArtFundamentals extends PAA.PixelPad.Apps.Drawing.Portfolio.Folder {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.TutorialsDrawing.PixelArtFundamentals';
      }
      static displayName() {
        return "Pixel art fundamentals";
      }
    }
    ;
    PixelArtFundamentals.initialize();
    return PixelArtFundamentals;
  }.call(this);
  return TutorialsDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"challengesdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/challengesdrawing.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.ChallengesDrawing = function () {
  class ChallengesDrawing extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.DrawingChallenges';
    }
    static location() {
      return PAA.Practice.Challenges.Drawing;
    }
    constructor() {
      super(...arguments);

      // Add/remove the reference selection asset to the pixel art line art challenge.
      this._referenceSelectionAutorun = Tracker.autorun(() => {
        var assets, assetsChanged, referenceSelection, referenceSelectionId, remainingAssetsCount;
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        assets = PAA.Challenges.Drawing.PixelArtLineArt.state('assets') || [];
        remainingAssetsCount = PAA.Challenges.Drawing.PixelArtLineArt.remainingDrawLineArtClasses().length;
        referenceSelectionId = PAA.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.id();
        referenceSelection = _.find(assets, asset => {
          return asset.id === referenceSelectionId;
        });
        if (remainingAssetsCount > 0 && !referenceSelection) {
          assets.unshift({
            id: referenceSelectionId
          });
          assetsChanged = true;
        }
        if (remainingAssetsCount === 0 && referenceSelection) {
          _.pull(assets, referenceSelection);
          assetsChanged = true;
        }
        if (!assetsChanged) {
          return;
        }
        return Tracker.nonreactive(() => {
          return PAA.Challenges.Drawing.PixelArtLineArt.state('assets', assets);
        });
      });
    }
    destroy() {
      var ref, ref1;
      super.destroy(...arguments);
      this._referenceSelectionAutorun.stop();
      if ((ref = this._pixelArtLineArt) != null) {
        ref.destroy();
      }
      return (ref1 = this._pixelArtReadability) != null ? ref1.destroy() : void 0;
    }
    things() {
      var things;
      things = [];
      if (LM.PixelArtFundamentals.Fundamentals.Goals.Jaggies.available()) {
        if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.completed()) {
          if (this._pixelArtLineArt == null) {
            this._pixelArtLineArt = Tracker.nonreactive(() => {
              return new PAA.Challenges.Drawing.PixelArtLineArt();
            });
          }
          things.push(this._pixelArtLineArt);
        }
      }
      if (LM.PixelArtFundamentals.Fundamentals.Goals.Size.available()) {
        if (PAA.Tutorials.Drawing.PixelArtFundamentals.Size.completed()) {
          if (this._pixelArtReadability == null) {
            this._pixelArtReadability = Tracker.nonreactive(() => {
              return new PAA.Challenges.Drawing.PixelArtReadability();
            });
          }
          things.push(this._pixelArtReadability);
        }
      }
      return things;
    }
  }
  ;
  ChallengesDrawing.initialize();
  return ChallengesDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"apps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/apps.coffee                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Apps = function () {
  class Apps extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Apps';
    }
    static location() {
      return PAA.PixelPad.Apps;
    }
    things() {
      return [LM.PixelArtFundamentals.pixeltoshEnabled() ? PAA.PixelPad.Apps.Pixeltosh : void 0];
    }
  }
  ;
  Apps.initialize();
  return Apps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixeltoshprograms.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/pixeltoshprograms.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.PixeltoshPrograms = function () {
  class PixeltoshPrograms extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.PixeltoshPrograms';
    }
    static location() {
      return PAA.Pixeltosh.Programs;
    }
    things() {
      return [LM.PixelArtFundamentals.pinballEnabled() ? PAA.Pixeltosh.Programs.Pinball : void 0, LM.PixelArtFundamentals.drawQuicklyEnabled() ? PAA.Pixeltosh.Programs.DrawQuickly : void 0, LM.PixelArtFundamentals.chessEnabled() ? PAA.Pixeltosh.Programs.Chess : void 0];
    }
  }
  ;
  PixeltoshPrograms.initialize();
  return PixeltoshPrograms;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixeltoshfiles.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/pixeltoshfiles.coffee        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.PixeltoshFiles = function () {
  class PixeltoshFiles extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.PixeltoshFiles';
    }
    static location() {
      return PAA.Pixeltosh.OS.FileSystem;
    }
    things() {
      var chessEnabled, drawQuciklyEnabled, pinballEnabled;
      if (!this._pinballDisk) {
        this._pinballDisk = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pixeltosh.Programs.Pinball.id(), ".Disk"),
          path: '弹球创作套件',
          type: PAA.Pixeltosh.OS.FileSystem.FileTypes.Disk
        });
        this._pinballDisk.options.disk = this._pinballDisk;
      }
      if (this._pinballProgram == null) {
        this._pinballProgram = new PAA.Pixeltosh.OS.FileSystem.File({
          id: PAA.Pixeltosh.Programs.Pinball.id(),
          path: '弹球创作套件/弹球创作套件',
          type: PAA.Pixeltosh.Programs.Pinball,
          disk: this._pinballDisk
        });
      }
      if (this._pinballMachine == null) {
        this._pinballMachine = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pixeltosh.Programs.Pinball.id(), ".PinballMachine"),
          path: '弹球创作套件/我的弹球机',
          type: PAA.Pixeltosh.Programs.Pinball.Project,
          disk: this._pinballDisk,
          data: () => {
            return PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId');
          }
        });
      }
      if (this._moonShot == null) {
        this._moonShot = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pixeltosh.Programs.Pinball.id(), ".DemoMachines.MoonShot"),
          path: '弹球创作套件/演示机器/月球发射',
          type: PAA.Pixeltosh.Programs.Pinball.Project,
          disk: this._pinballDisk,
          data: () => {
            return 'ewzE9QPCPPLnxHvpi';
          }
        });
      }
      pinballEnabled = LM.PixelArtFundamentals.pinballEnabled();
      if (!this._drawQuicklyDisk) {
        this._drawQuicklyDisk = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pixeltosh.Programs.DrawQuickly.id(), ".Disk"),
          path: '快速绘制',
          type: PAA.Pixeltosh.OS.FileSystem.FileTypes.Disk
        });
        this._drawQuicklyDisk.options.disk = this._drawQuicklyDisk;
      }
      if (this._drawQuciklyProgram == null) {
        this._drawQuciklyProgram = new PAA.Pixeltosh.OS.FileSystem.File({
          id: PAA.Pixeltosh.Programs.DrawQuickly.id(),
          path: '快速绘制/快速绘制',
          type: PAA.Pixeltosh.Programs.DrawQuickly,
          disk: this._drawQuicklyDisk
        });
      }
      drawQuciklyEnabled = LM.PixelArtFundamentals.drawQuicklyEnabled();
      if (!this._chessDisk) {
        this._chessDisk = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pixeltosh.Programs.Chess.id(), ".Disk"),
          path: 'Chess Academy',
          type: PAA.Pixeltosh.OS.FileSystem.FileTypes.Disk
        });
        this._chessDisk.options.disk = this._chessDisk;
      }
      if (this._chessProgram == null) {
        this._chessProgram = new PAA.Pixeltosh.OS.FileSystem.File({
          id: PAA.Pixeltosh.Programs.Chess.id(),
          path: 'Chess Academy/Chess Academy',
          type: PAA.Pixeltosh.Programs.Chess,
          disk: this._chessDisk
        });
      }
      chessEnabled = LM.PixelArtFundamentals.chessEnabled();
      return [pinballEnabled ? this._pinballDisk : void 0, pinballEnabled ? this._pinballProgram : void 0, pinballEnabled ? this._pinballMachine : void 0, pinballEnabled ? this._moonShot : void 0, drawQuciklyEnabled ? this._drawQuicklyDisk : void 0, drawQuciklyEnabled ? this._drawQuciklyProgram : void 0, chessEnabled ? this._chessDisk : void 0, chessEnabled ? this._chessProgram : void 0];
    }
  }
  ;
  PixeltoshFiles.initialize();
  return PixeltoshFiles;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workbench.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/workbench.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, LM, LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Chess = PAA.Pixeltosh.Programs.Chess;
LM.PixelArtFundamentals.Fundamentals.Workbench = function () {
  class Workbench extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Workbench';
    }
    static location() {
      return PAA.Practice.Project.Workbench;
    }
    destroy() {
      var ref;
      super.destroy(...arguments);
      return (ref = this._pinball) != null ? ref.destroy() : void 0;
    }
    things() {
      var activeChess2DProjectId, activePinballProjectId, openPinballMachineTask, pinballProjectEnabled, ref, ref1, ref2, ref3, things;
      things = [];
      if (LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.available()) {
        // Pinball project appears after Pinball Creation Kit was run for the first time.
        openPinballMachineTask = PAA.Learning.Task.getAdventureInstanceForId(LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.OpenPinballMachine.id());
        pinballProjectEnabled = openPinballMachineTask.completed();
        activePinballProjectId = Pinball.Project.state('activeProjectId');
        if (pinballProjectEnabled && activePinballProjectId) {
          if (((ref = this._pinball) != null ? ref.projectId : void 0) !== activePinballProjectId) {
            if ((ref1 = this._pinball) != null) {
              ref1.destroy();
            }
            this._pinball = Tracker.nonreactive(() => {
              return new Pinball.Project(activePinballProjectId);
            });
          }
          things.push(this._pinball);
        }
      }
      if (Chess.state('ownedPieceTypeCounts')) {
        if (activeChess2DProjectId = Chess.Project.TwoDimensional.state('activeProjectId')) {
          if (((ref2 = this._chess2D) != null ? ref2.projectId : void 0) !== activeChess2DProjectId) {
            if ((ref3 = this._chess2D) != null) {
              ref3.destroy();
            }
            this._chess2D = Tracker.nonreactive(() => {
              return new Chess.Project.TwoDimensional(activeChess2DProjectId);
            });
          }
          things.push(this._chess2D);
        }
      }
      return things;
    }
  }
  ;
  Workbench.initialize();
  return Workbench;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"musictapes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/musictapes.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.MusicTapes = function () {
  class MusicTapes extends LOI.Adventure.Scene {
    // displayedNotificationIds: a list of notification IDs that have already been displayed.
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.MusicTapes';
    }
    static location() {
      return PAA.Music.Tapes;
    }
    things() {
      var tapes;
      tapes = [];

      // Tapes for Elements of art: line.
      if (PAA.Tutorials.Drawing.ElementsOfArt.Line.completed()) {
        tapes.push({
          artist: 'Extent of the Jam',
          title: 'musicdisk01'
        });
        tapes.push({
          artist: 'Shnabubula',
          title: 'Finding the Groove'
        });
      }
      // Tape for Elements of art: shape.
      if (PAA.Tutorials.Drawing.ElementsOfArt.Shape.completed()) {
        tapes.push({
          artist: 'HOME',
          title: 'Resting State'
        });
      }

      // Tape for Pixel art lines.
      if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.completed()) {
        tapes.push({
          artist: 'glaciære',
          'sides.0.title': 'shower'
        });
      }

      // Tape for Pixel art diagonals.
      if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.completed()) {
        tapes.push({
          artist: 'Revolution Void',
          title: 'The Politics of Desire'
        });
      }

      // Tape for Pixel art curves.
      if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.completed()) {
        tapes.push({
          artist: 'State Azure',
          title: 'Stellar Descent'
        });
      }

      // Tape for Pixel art line width.
      if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.completed()) {
        tapes.push({
          artist: 'Three Chain Links',
          'sides.0.title': 'The Happiest Days Of Our Lives'
        });
      }

      // Tape for Simplification.
      if (LM.PixelArtFundamentals.Fundamentals.Goals.Simplification.Tutorial.completed()) {
        tapes.push({
          artist: 'Holizna',
          title: 'Be Happy With Who You Are'
        });
      }

      // Tape for Shape language.
      if (LM.Design.Fundamentals.Goals.ShapeLanguage.Learn.completed()) {
        tapes.push({
          artist: 'Joseph Sacco',
          'sides.0.title': 'Lostalgia'
        });
      }
      return tapes;
    }
  }
  ;
  MusicTapes.initialize();
  MusicTapes.NotificationsProvider = function () {
    class NotificationsProvider extends PAA.PixelPad.Systems.Notifications.Provider {
      static id() {
        return "".concat(MusicTapes.id(), ".NotificationsProvider");
      }
      availableNotificationIds() {
        var artist, className, displayedNotificationIds, potentialNotificationIds, ref, tapeSelectors;
        // See which tapes are available.
        tapeSelectors = LOI.adventure.currentTapeSelectors();
        potentialNotificationIds = [];
        ref = this.constructor.NotificationArtists;
        for (className in ref) {
          artist = ref[className];
          if (!_.find(tapeSelectors, tape => {
            return tape.artist === artist;
          })) {
            continue;
          }
          potentialNotificationIds.push(MusicTapes[className].id());
        }

        // Remove all notifications that were already displayed.
        displayedNotificationIds = LM.PixelArtFundamentals.Fundamentals.MusicTapes.state('displayedNotificationIds') || [];
        return _.difference(potentialNotificationIds, displayedNotificationIds);
      }
    }
    ;
    NotificationsProvider.initialize();
    NotificationsProvider.NotificationArtists = {
      FirstTapes: 'Shnabubula',
      HOME: 'HOME',
      Glaciaere: 'glaciære',
      RevolutionVoid: 'Revolution Void',
      StateAzure: 'State Azure',
      ThreeChainLinks: 'Three Chain Links',
      Holizna: 'Holizna',
      JosephSacco: 'Joseph Sacco'
    };
    return NotificationsProvider;
  }.call(this);
  MusicTapes.Notification = class Notification extends PAA.PixelPad.Systems.Notifications.Notification {
    static displayedId() {
      // Override if the notification fulfills a different ID.
      return this.id();
    }
    static displayStyle() {
      return this.DisplayStyles.Always;
    }
    static retroClasses() {
      return {
        body: PAA.PixelPad.Systems.Notifications.Retro.BodyClasses.Walkman
      };
    }
    displayedId() {
      return this.constructor.displayedId();
    }
    updateLastDisplayedTime() {
      var displayedNotificationIds;
      super.updateLastDisplayedTime(...arguments);
      displayedNotificationIds = LM.PixelArtFundamentals.Fundamentals.MusicTapes.state('displayedNotificationIds') || [];
      displayedNotificationIds.push(this.displayedId());
      return LM.PixelArtFundamentals.Fundamentals.MusicTapes.state('displayedNotificationIds', displayedNotificationIds);
    }
  };
  MusicTapes.FirstTapes = function () {
    class FirstTapes extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".FirstTapes");
      }
      static message() {
        return "现在可以播放更多音乐了！\n\n在音乐应用中，您会找到 Extent of the Jam 的优秀 DOS chiptune，还有 Shnabubula 的钢琴即兴曲，它们一下就把我带回《The Sims》的建造模式。";
      }
    }
    ;
    FirstTapes.initialize();
    return FirstTapes;
  }.call(this);
  MusicTapes.HOME = function () {
    class HOME extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".HOME");
      }
      static message() {
        return "嘿，我弄到了一盒 HOME（也就是开创寒潮风格的出色小孩）的演示带！\n\n您可以在音乐应用中找到它。";
      }
    }
    ;
    HOME.initialize();
    return HOME;
  }.call(this);
  MusicTapes.Glaciaere = function () {
    class Glaciaere extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".Glaciaere");
      }
      static message() {
        return "我为您带来了一盒新的磁带，包含 Glaciære 的两张蒸汽波专辑。\n\n您可以在音乐应用中找到它。";
      }
    }
    ;
    Glaciaere.initialize();
    return Glaciaere;
  }.call(this);
  MusicTapes.RevolutionVoid = function () {
    class RevolutionVoid extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".RevolutionVoid");
      }
      static message() {
        return "是时候放克起来了！您现在可以在音乐应用中播放 Revolution Void 了。";
      }
    }
    ;
    RevolutionVoid.initialize();
    return RevolutionVoid;
  }.call(this);
  MusicTapes.StateAzure = function () {
    class StateAzure extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".StateAzure");
      }
      static message() {
        return "如果您想要一些轻松的氛围音乐，我有一盒来自 State Azure 的很长很长的磁带。";
      }
    }
    ;
    StateAzure.initialize();
    return StateAzure;
  }.call(this);
  MusicTapes.ThreeChainLinks = function () {
    class ThreeChainLinks extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".ThreeChainLinks");
      }
      static message() {
        return "我为您准备了更多音乐，来自 Three Chain Links 的两张专辑。\n他创作受80年代和老式视频游戏启发的很酷的东西。";
      }
    }
    ;
    ThreeChainLinks.initialize();
    return ThreeChainLinks;
  }.call(this);
  MusicTapes.Holizna = function () {
    class Holizna extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".Holizna");
      }
      static message() {
        return "是时候伴着 Holizna 振奋的 lo-fi 节拍，放松地画画了。\n\n您可以在音乐应用中播放这盒新磁带。";
      }
    }
    ;
    Holizna.initialize();
    return Holizna;
  }.call(this);
  MusicTapes.JosephSacco = function () {
    class JosephSacco extends MusicTapes.Notification {
      static id() {
        return "".concat(MusicTapes.id(), ".JosephSacco");
      }
      static message() {
        return "音乐应用新增了一盒 Joseph Sacco 的磁带，\n如果您想来点 synthwave，把自己带进复古未来世界的话。";
      }
    }
    ;
    JosephSacco.initialize();
    return JosephSacco;
  }.call(this);
  return MusicTapes;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/publications.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Publications = function () {
  class Publications extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications';
    }
    static location() {
      return PAA.Publication.Location;
    }
    static getUnlockedIds() {
      var activeProjectId, activeProjectIds, asset, assetClass, i, j, len, len1, project, publicationParts, publications, ref, unlockedPublicationParts, unlockedPublications;
      publications = [];
      publicationParts = [];
      activeProjectIds = [PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'), PAA.Pixeltosh.Programs.Chess.Project.TwoDimensional.state('activeProjectId'), PAA.Pixeltosh.Programs.Chess.Project.ThreeDimensional.state('activeProjectId')];
      for (i = 0, len = activeProjectIds.length; i < len; i++) {
        activeProjectId = activeProjectIds[i];
        if (!activeProjectId) {
          continue;
        }
        if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
          continue;
        }
        ref = project.assets;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          asset = ref[j];
          assetClass = PAA.Practice.Project.Asset.getClassForId(asset.id);
          if (unlockedPublications = typeof assetClass.unlockedPublications === "function" ? assetClass.unlockedPublications() : void 0) {
            publications = _.union(publications, unlockedPublications);
          }
          if (unlockedPublicationParts = typeof assetClass.unlockedPublicationParts === "function" ? assetClass.unlockedPublicationParts() : void 0) {
            publicationParts = _.union(publicationParts, unlockedPublicationParts);
          }
        }
      }
      return {
        publications,
        publicationParts
      };
    }
    things() {
      return this.constructor.getUnlockedIds().publications;
    }
  }
  ;
  Publications.initialize();
  Publications.Parts = function () {
    class Parts extends LOI.Adventure.Scene {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.PublicationParts';
      }
      static location() {
        return PAA.Publication.Part.Location;
      }
      things() {
        return Publications.getUnlockedIds().publicationParts;
      }
    }
    ;
    Parts.initialize();
    return Parts;
  }.call(this);
  return Publications;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pico8cartridges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/pico8cartridges.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Pico8Cartridges = function () {
  class Pico8Cartridges extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.PixelArtFundamentals.Fundamentals.Pico8Cartridges';
    }
    static location() {
      return PAA.Pico8.Cartridges;
    }
    constructor() {
      super(...arguments);
    }
    things() {
      var Size;
      Size = PAA.Tutorials.Drawing.PixelArtFundamentals.Size;
      return [Size.isAssetCompleted(Size.SmallestRecognizableSize) ? PAA.Pico8.Cartridges.Jungle : void 0];
    }
  }
  ;
  Pico8Cartridges.initialize();
  return Pico8Cartridges;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"goals":{"goals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/goals.coffee                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Goals = class Goals {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"elementsofart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/elementsofart.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt = function () {
  var Goal;
  class ElementsOfArt extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt';
    }
    static displayName() {
      return "Elements of art";
    }
    static chapter() {
      return LM.PixelArtFundamentals.Fundamentals;
    }
    static tasks() {
      return [this.Line, this.Shape, this.Color, this.Form, this.Space, this.Value, this.Texture];
    }
    static finalTasks() {
      return [this.Space, this.Texture];
    }
    static finalTasksCompleteType() {
      return this.FinalTasksCompleteTypes.All;
    }
  }
  ;
  Goal = ElementsOfArt;
  ElementsOfArt.Line = function () {
    var Task;
    class Line extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Line';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解线条";
      }
      static instructions() {
        return "在绘画应用中，完成艺术元素：线条教程，了解最基础的艺术元素。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['line'];
      }
      static requiredInterests() {
        return ['Learn Mode tutorial project'];
      }
      static studyPlanBuilding() {
        return 'SimCityWindTurbine';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.ElementsOfArt.Line.completed();
      }
    }
    ;
    Line.initialize();
    Task = Line;
    return Line;
  }.call(this);
  ElementsOfArt.Shape = function () {
    var Task;
    class Shape extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Shape';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解形状";
      }
      static instructions() {
        return "在绘画应用中，完成艺术元素：形状教程，学习如何用形状来绘画。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Line];
      }
      static interests() {
        return ['shape'];
      }
      static groupNumber() {
        return -1;
      }
      static studyPlanBuilding() {
        return 'SimCityOffice2';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.ElementsOfArt.Shape.completed();
      }
    }
    ;
    Shape.initialize();
    Task = Shape;
    return Shape;
  }.call(this);
  ElementsOfArt.Color = function () {
    var Task;
    class Color extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Color';
      }
      static goal() {
        return Goal;
      }
      static completable() {
        return false;
      }
      static directive() {
        return "了解颜色";
      }
      static instructions() {
        return "在绘画应用中，完成艺术元素：颜色教程，学习如何为形状赋予颜色。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Shape];
      }
      static interests() {
        return ['color'];
      }
      static requiredInterests() {
        return ['future tech'];
      }
      static groupNumber() {
        return -1;
      }
      static studyPlanBuilding() {
        return 'SimCityChurch';
      }
      static completedConditions() {
        // TODO: Tie to tutorial completion.
        return false;
      }
    }
    ;
    Color.initialize();
    Task = Color;
    return Color;
  }.call(this);
  ElementsOfArt.Form = function () {
    var Task;
    class Form extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Form';
      }
      static goal() {
        return Goal;
      }
      static completable() {
        return false;
      }
      static directive() {
        return "了解形态";
      }
      static instructions() {
        return "在绘画应用中，完成艺术元素：形态教程，了解物体的三维特性。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Line];
      }
      static interests() {
        return ['form'];
      }
      static requiredInterests() {
        return ['sketching'];
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCityOffice1';
      }
      static completedConditions() {
        // TODO: Tie to tutorial completion.
        return false;
      }
    }
    ;
    Form.initialize();
    Task = Form;
    return Form;
  }.call(this);
  ElementsOfArt.Space = function () {
    var Task;
    class Space extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Space';
      }
      static goal() {
        return Goal;
      }
      static completable() {
        return false;
      }
      static directive() {
        return "了解空间";
      }
      static instructions() {
        return "在绘画应用中，完成艺术元素：空间教程，了解艺术作品中元素的分布。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Form];
      }
      static interests() {
        return ['space'];
      }
      static requiredInterests() {
        return ['scene'];
      }
      static studyPlanBuilding() {
        return 'SimCityOffice3';
      }
      static groupNumber() {
        return 2;
      }
      static completedConditions() {
        // TODO: Tie to tutorial completion.
        return false;
      }
    }
    ;
    Space.initialize();
    Task = Space;
    return Space;
  }.call(this);
  ElementsOfArt.Value = function () {
    var Task;
    class Value extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Value';
      }
      static goal() {
        return Goal;
      }
      static completable() {
        return false;
      }
      static directive() {
        return "了解明暗";
      }
      static instructions() {
        return "在绘画应用中，完成艺术元素：明暗教程，学习如何表现素描。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Form];
      }
      static interests() {
        return ['value'];
      }
      static requiredInterests() {
        return ['lighting'];
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCityCommercial3';
      }
      static completedConditions() {
        // TODO: Tie to tutorial completion.
        return false;
      }
    }
    ;
    Value.initialize();
    Task = Value;
    return Value;
  }.call(this);
  ElementsOfArt.Texture = function () {
    var Task;
    class Texture extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Texture';
      }
      static goal() {
        return Goal;
      }
      static completable() {
        return false;
      }
      static directive() {
        return "了解质感";
      }
      static instructions() {
        return "在绘画应用中，完成艺术元素：质感教程，了解详细的材质。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Color, Goal.Value];
      }
      static interests() {
        return ['texture'];
      }
      static studyPlanBuilding() {
        return 'SimCityPark';
      }
      static completedConditions() {
        // TODO: Tie to tutorial completion.
        return false;
      }
    }
    ;
    Texture.initialize();
    Task = Texture;
    return Texture;
  }.call(this);
  ElementsOfArt.initialize();
  return ElementsOfArt;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"jaggies.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/jaggies.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Goals.Jaggies = function () {
  var Goal;
  class Jaggies extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies';
    }
    static displayName() {
      return "Pixel art fundamentals: jaggies";
    }
    static chapter() {
      return LM.PixelArtFundamentals.Fundamentals;
    }
    static tasks() {
      return [this.Lines, this.PixelPerfectLines, this.Diagonals, this.EvenDiagonals, this.Curves, this.SmoothCurves, this.LineWidth, this.ConsistentLineWidth];
    }
    static finalTasks() {
      return [this.PixelPerfectLines, this.EvenDiagonals, this.SmoothCurves, this.ConsistentLineWidth];
    }
  }
  ;
  Goal = Jaggies;
  Jaggies.Lines = function () {
    class Lines extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.Lines';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解像素艺术中的线条";
      }
      static instructions() {
        return "在绘画应用中，完成像素艺术线条教程，了解锯齿。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static requiredInterests() {
        return ['line'];
      }
      static interests() {
        return ['jaggy'];
      }
      static studyPlanBuilding() {
        return 'SimCityCommercial2';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.completed();
      }
    }
    ;
    Lines.initialize();
    return Lines;
  }.call(this);
  Jaggies.Diagonals = function () {
    class Diagonals extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.Diagonals';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解像素艺术中的对角线";
      }
      static instructions() {
        return "在绘画应用中，完成像素艺术对角线教程，了解不同角度如何影响锯齿的图案。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Lines];
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCityResidential1';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.completed();
      }
    }
    ;
    Diagonals.initialize();
    return Diagonals;
  }.call(this);
  Jaggies.Curves = function () {
    class Curves extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.Curves';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解像素艺术中的曲线";
      }
      static instructions() {
        return "在绘画应用中，完成像素艺术曲线教程，了解什么使线条看起来平滑。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Lines];
      }
      static groupNumber() {
        return 2;
      }
      static studyPlanBuilding() {
        return 'SimCityResidential2';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.completed();
      }
    }
    ;
    Curves.initialize();
    return Curves;
  }.call(this);
  Jaggies.LineWidth = function () {
    class LineWidth extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.LineWidth';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解像素艺术中的线条宽度";
      }
      static instructions() {
        return "在绘画应用中，完成像素艺术线条宽度教程，了解如何实现不同的线条粗细。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Lines];
      }
      static groupNumber() {
        return 3;
      }
      static studyPlanBuilding() {
        return 'SimCityResidential3';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.completed();
      }
    }
    ;
    LineWidth.initialize();
    return LineWidth;
  }.call(this);
  Jaggies.PixelPerfectLines = function () {
    class PixelPerfectLines extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.PixelPerfectLines';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "用完美像素线条绘制同人艺术";
      }
      static instructions() {
        return "在绘画应用的像素艺术线稿挑战中选择一个参考图。\n完成绘制，在像素艺术评估纸上启用完美像素线条标准，获得80%或以上的分数（同时保留双点和小角，如要求所示）。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['pixel-perfect line'];
      }
      static predecessors() {
        return [Goal.Lines];
      }
      static level() {
        return 3;
      }
      static studyPlanBuilding() {
        return 'SimCityChurch';
      }
      static completedConditions() {
        return PAA.Challenges.Drawing.PixelArtLineArt.completedPixelPerfectLines();
      }
      activeNotificationId() {
        return Goal.WIPNotification.id();
      }
    }
    ;
    PixelPerfectLines.initialize();
    return PixelPerfectLines;
  }.call(this);
  Jaggies.EvenDiagonals = function () {
    class EvenDiagonals extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.EvenDiagonals';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "用均匀对角线绘制同人艺术";
      }
      static instructions() {
        return "在绘画应用的像素艺术线稿挑战中选择一个参考图。\n完成绘制，在像素艺术评估纸上启用均匀对角线标准，在至少10条线段长度均匀的线的情况下获得80%或以上的分数。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['even diagonal (pixel art)'];
      }
      static predecessors() {
        return [Goal.Diagonals];
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCityResidential4';
      }
      static completedConditions() {
        return PAA.Challenges.Drawing.PixelArtLineArt.completedEvenDiagonals();
      }
      activeNotificationId() {
        return Goal.WIPNotification.id();
      }
    }
    ;
    EvenDiagonals.initialize();
    return EvenDiagonals;
  }.call(this);
  Jaggies.SmoothCurves = function () {
    class SmoothCurves extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.SmoothCurves';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "用平滑曲线绘制同人艺术";
      }
      static instructions() {
        return "在绘画应用的像素艺术线稿挑战中选择一个参考图。\n完成绘制，在像素艺术评估纸上启用平滑曲线标准，在总评分和突变长度、直线部分以及拐点各项都获得80%或以上的分数。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['smooth curve (pixel art)'];
      }
      static predecessors() {
        return [Goal.Curves];
      }
      static groupNumber() {
        return 2;
      }
      static studyPlanBuilding() {
        return 'SimCityPark';
      }
      static completedConditions() {
        return PAA.Challenges.Drawing.PixelArtLineArt.completedSmoothCurves();
      }
      activeNotificationId() {
        return Goal.WIPNotification.id();
      }
    }
    ;
    SmoothCurves.initialize();
    return SmoothCurves;
  }.call(this);
  Jaggies.ConsistentLineWidth = function () {
    class ConsistentLineWidth extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Jaggies.ConsistentLineWidth';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "用一致的线条宽度风格绘制同人艺术";
      }
      static instructions() {
        return "在绘画应用的像素艺术线稿挑战中选择一个参考图。\n完成绘制，在像素艺术评估纸上启用一致线条宽度标准，在单个线条宽度一致性或统一线条宽度类型方面获得80%或以上的分数。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['line width (pixel art)'];
      }
      static predecessors() {
        return [Goal.LineWidth];
      }
      static groupNumber() {
        return 3;
      }
      static studyPlanBuilding() {
        return 'SimCityResidential1';
      }
      static completedConditions() {
        return PAA.Challenges.Drawing.PixelArtLineArt.completedConsistentLineWidth();
      }
      activeNotificationId() {
        return Goal.WIPNotification.id();
      }
    }
    ;
    ConsistentLineWidth.initialize();
    return ConsistentLineWidth;
  }.call(this);
  Jaggies.initialize();
  Jaggies.WIPNotification = function () {
    class WIPNotification extends PAA.PixelPad.Systems.Notifications.Notification {
      static id() {
        return "".concat(Goal.id(), ".WIPNotification");
      }
      static message() {
        return "像素艺术评估功能正在不断改进，还处于实验阶段。\n\n不要过分在意它的分数。相信您的艺术判断，胜过直接遵循它的建议。";
      }
      static displayStyle() {
        return this.DisplayStyles.Always;
      }
      static retroClasses() {
        return {
          head: PAA.PixelPad.Systems.Notifications.Retro.HeadClasses.HardHat,
          body: PAA.PixelPad.Systems.Notifications.Retro.BodyClasses.Wrench
        };
      }
      static retroClassesDisplayed() {
        return {
          head: PAA.PixelPad.Systems.Notifications.Retro.HeadClasses.HardHatPuffed,
          face: PAA.PixelPad.Systems.Notifications.Retro.FaceClasses.Yikes
        };
      }
    }
    ;
    WIPNotification.initialize();
    return WIPNotification;
  }.call(this);
  return Jaggies;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"simplification.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/simplification.coffee         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Goals.Simplification = function () {
  var Goal;
  class Simplification extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Simplification';
    }
    static displayName() {
      return "Simplification";
    }
    static chapter() {
      return LM.PixelArtFundamentals.Fundamentals;
    }
    static tasks() {
      return [this.Tutorial, this.Challenge];
    }
    static finalTasks() {
      return [this.Challenge];
    }
  }
  ;
  Goal = Simplification;
  Simplification.Tutorial = function () {
    var Task;
    class Tutorial extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Simplification.Tutorial';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解简化";
      }
      static instructions() {
        return "在绘画应用中，完成简化教程，学习如何有意识地简化您的绘画。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static requiredInterests() {
        return ['shape'];
      }
      static studyPlanBuilding() {
        return 'TransportTycoonHouse1';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.Simplification.completed();
      }
    }
    ;
    Tutorial.initialize();
    Task = Tutorial;
    return Tutorial;
  }.call(this);
  Simplification.Challenge = function () {
    var Task;
    class Challenge extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Simplification.Challenge';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "快速绘制";
      }
      static instructions() {
        return "在 Pixeltosh 应用中，启动快速绘制游戏，尝试符号绘制和写实绘制。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Tutorial];
      }
      static interests() {
        return ['simplification'];
      }
      static studyPlanBuilding() {
        return 'SimCityResidential6';
      }
      static completedConditions() {
        return PAA.Pixeltosh.Programs.DrawQuickly.SymbolicDrawing.getBestScore() && PAA.Pixeltosh.Programs.DrawQuickly.RealisticDrawing.getDrawnThings().length;
      }
    }
    ;
    Challenge.initialize();
    Task = Challenge;
    return Challenge;
  }.call(this);
  Simplification.initialize();
  return Simplification;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"size.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/size.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Goals.Size = function () {
  var Goal;
  class Size extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Size';
    }
    static displayName() {
      return "Pixel art fundamentals: size";
    }
    static chapter() {
      return LM.PixelArtFundamentals.Fundamentals;
    }
    static tasks() {
      return [this.Learn, this.Icon32, this.Icon16, this.Icon8, this.Icons];
    }
    static finalTasks() {
      return [this.Icons];
    }
  }
  ;
  Goal = Size;
  Size.Learn = function () {
    class Learn extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Size.Learn';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解像素艺术尺寸";
      }
      static instructions() {
        return "在绘画应用中，完成像素艺术尺寸教程，了解决定像素艺术做多大需要考虑哪些因素。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static requiredInterests() {
        return ['simplification', 'smooth curve (pixel art)'];
      }
      static studyPlanBuilding() {
        return 'SimCityCommercial3';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Size.completed();
      }
    }
    ;
    Learn.initialize();
    return Learn;
  }.call(this);
  Size.Icon = class Icon extends PAA.Learning.Task.Automatic {
    static goal() {
      return Goal;
    }
    static size() {
      throw new AE.NotImplementedException("Icon task must define the size of the icon.");
    }
    static sizeString() {
      var size;
      size = this.size();
      return "".concat(size, "\xD7").concat(size);
    }
    static instructions() {
      return "In the Drawing app, pick a subject in the Pixel art readability challenge and choose the ".concat(this.sizeString(), " size.\nComplete and refine your drawing until the Pixeltosh correctly guesses your icon in the readability analysis.");
    }
    static icon() {
      return PAA.Learning.Task.Icons.Drawing;
    }
    static predecessors() {
      return [Goal.Learn];
    }
    static completedConditions() {
      var ref;
      return ((ref = PAA.Challenges.Drawing.PixelArtReadability.state('completedCounts')) != null ? ref[this.size()] : void 0) >= 1;
    }
    activeNotificationId() {
      return Goal.ReadabilityAnalysisNotification.id();
    }
  };
  Size.Icon8 = function () {
    class Icon8 extends Size.Icon {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Size.Icon8';
      }
      static size() {
        return 8;
      }
      static directive() {
        return "Draw an ".concat(this.sizeString(), " icon (hard)");
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCityResidential1';
      }
    }
    ;
    Icon8.initialize();
    return Icon8;
  }.call(this);
  Size.Icon16 = function () {
    class Icon16 extends Size.Icon {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Size.Icon16';
      }
      static size() {
        return 16;
      }
      static directive() {
        return "Draw a ".concat(this.sizeString(), " icon (medium)");
      }
      static studyPlanBuilding() {
        return 'TransportTycoonCinema';
      }
    }
    ;
    Icon16.initialize();
    return Icon16;
  }.call(this);
  Size.Icon32 = function () {
    class Icon32 extends Size.Icon {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Size.Icon32';
      }
      static size() {
        return 32;
      }
      static directive() {
        return "Draw a ".concat(this.sizeString(), " icon (easy)");
      }
      static groupNumber() {
        return -1;
      }
      static studyPlanBuilding() {
        return 'SimCityOffice3';
      }
    }
    ;
    Icon32.initialize();
    return Icon32;
  }.call(this);
  Size.Icons = function () {
    class Icons extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Size.Icons';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "绘制至少5个图标";
      }
      static instructions() {
        return "在像素画可读性挑战中，绘制至少5个任意尺寸的图标。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['size (pixel art)'];
      }
      static studyPlanBuilding() {
        return 'SimCityIndustrial3';
      }
      static completedConditions() {
        return PAA.Challenges.Drawing.PixelArtReadability.startedTotalCount() >= 5;
      }
      static predecessors() {
        return [Goal.Icon8, Goal.Icon16, Goal.Icon32];
      }
      activeNotificationId() {
        return Goal.ReadabilityAnalysisNotification.id();
      }
    }
    ;
    Icons.initialize();
    return Icons;
  }.call(this);
  Size.initialize();
  Size.ReadabilityAnalysisNotification = function () {
    class ReadabilityAnalysisNotification extends PAA.PixelPad.Systems.Notifications.Notification {
      static id() {
        return "".concat(Goal.id(), ".ReadabilityAnalysisNotification");
      }
      static message() {
        return "不要过分听 Pixeltosh 对可读性的分析。\n它已经尽力了，但归根结底也只是一台没有想象力的老电脑。\n\n相信自己的判断，也把像素画展示给其他人看看，才能知道它是否易于辨认。";
      }
      static displayStyle() {
        return this.DisplayStyles.Always;
      }
      static retroClasses() {
        return {
          head: PAA.PixelPad.Systems.Notifications.Retro.HeadClasses.Smirk
        };
      }
    }
    ;
    ReadabilityAnalysisNotification.initialize();
    return ReadabilityAnalysisNotification;
  }.call(this);
  return Size;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pinball":{"pinball.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/pinball/pinball.coffee        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Goals.Pinball = function () {
  var Goal;
  class Pinball extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Pinball';
    }
    static displayName() {
      return "Pinball";
    }
    static chapter() {
      return LM.PixelArtFundamentals.Fundamentals;
    }
    static tasks() {
      return [this.OpenPinballMachine, this.DrawBall, this.PlayBall, this.DrawPlayfield, this.PlayPlayfield, this.DrawGobbleHole, this.PlayGobbleHole, this.AddPins, this.DrawBallTrough, this.PlayBallTrough, this.DrawBumper, this.PlayBumper, this.DrawGate, this.PlayGate, this.RemoveGobbleHoles, this.DrawFlipper, this.PlayFlipper, this.DrawLowerThird, this.ActiveBumpers, this.DrawUpperThird, this.DrawSpinningTarget, this.PlaySpinningTarget];
    }
    static finalTasks() {
      return [this.PlaySpinningTarget];
    }
    reset() {
      super.reset(...arguments);
      return PAA.Pixeltosh.Programs.Pinball.Project.end();
    }
  }
  ;
  Pinball.initialize();
  Goal = Pinball;
  Pinball.Task = class Task extends PAA.Learning.Task.Automatic {
    static playfieldHasPart(partClass) {
      var activeProjectId, partData, playfieldPartId, project, ref;
      if (!(activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'))) {
        return;
      }
      if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
        return;
      }
      ref = project.playfield;
      for (playfieldPartId in ref) {
        partData = ref[playfieldPartId];
        if (partData.type === partClass.id()) {
          return true;
        }
      }
      return false;
    }
    activeNotificationId() {
      return Goal.WIPNotification.id();
    }
  };
  Pinball.RedrawPlayfieldTask = class RedrawPlayfieldTask extends Pinball.Task {
    onActive() {
      var activeProjectId, asset, bitmap, project;
      // Note: 'return unless' should not be necessary at this point, but since of legacy bugs some assets
      // might be missing and won't be fixed until the pinball machine is opened on the Pixeltosh.
      if (!(activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'))) {
        return;
      }
      if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
        return;
      }
      if (!(asset = _.find(project.assets, asset => {
        return asset.id === PAA.Pixeltosh.Programs.Pinball.Assets.Playfield.id();
      }))) {
        return;
      }
      if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
        return;
      }
      return this._historyPositionOnActive = bitmap.historyPosition;
    }
    completedConditions() {
      var activeProjectId, asset, bitmap, project;
      if (!this.active()) {
        return;
      }
      if (!(activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'))) {
        return;
      }
      if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
        return;
      }
      if (!(asset = _.find(project.assets, asset => {
        return asset.id === PAA.Pixeltosh.Programs.Pinball.Assets.Playfield.id();
      }))) {
        return;
      }
      if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
        return;
      }

      // Wait until the history position has changed.
      if (this._historyPositionOnActive == null) {
        return;
      }
      return bitmap.historyPosition !== this._historyPositionOnActive;
    }
  };
  Pinball.WIPNotification = function () {
    class WIPNotification extends PAA.PixelPad.Systems.Notifications.Notification {
      static id() {
        return "".concat(Goal.id(), ".WIPNotification");
      }
      static message() {
        return "弹球项目还有很多不足之处。我会尽最大努力修复您遇到的任何破坏性漏洞。\n\n我也希望能抽出时间加入更好的说明和更多的球台部件！如果您也想要的话请告诉我！";
      }
      static displayStyle() {
        return this.DisplayStyles.IfIdle;
      }
      static retroClasses() {
        return {
          head: PAA.PixelPad.Systems.Notifications.Retro.HeadClasses.HardHat,
          body: PAA.PixelPad.Systems.Notifications.Retro.BodyClasses.Wrench
        };
      }
      static retroClassesDisplayed() {
        return {
          head: PAA.PixelPad.Systems.Notifications.Retro.HeadClasses.HardHatPuffed,
          face: PAA.PixelPad.Systems.Notifications.Retro.FaceClasses.Yikes
        };
      }
    }
    ;
    WIPNotification.initialize();
    return WIPNotification;
  }.call(this);
  return Pinball;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetstask.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/pinball/assetstask.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Goal, LM, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Goal = LM.PixelArtFundamentals.Fundamentals.Goals.Pinball;
Goal.AssetsTask = class AssetsTask extends Goal.Task {
  static unlockedAssets() {
    throw new AE.NotImplementedException("Asset task must return an array of assets it unlocks.");
  }
  static onActive() {
    var activeProjectId, createAssetBitmapPromises, project, unlockedAsset, unlockedAssetId;
    // Add assets to the project if needed.
    activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId');
    project = PAA.Practice.Project.documents.findOne(activeProjectId);
    createAssetBitmapPromises = function () {
      var i, len, ref, results;
      ref = this.unlockedAssets();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        unlockedAsset = ref[i];
        unlockedAssetId = unlockedAsset.id();
        if (_.find(project.assets, asset => {
          return asset.id === unlockedAssetId;
        })) {
          continue;
        }
        results.push((unlockedAsset => {
          return new Promise(async resolve => {
            var bitmapId;
            bitmapId = await this._createAssetBitmap(unlockedAsset);
            return resolve({
              id: unlockedAsset.id(),
              type: unlockedAsset.type(),
              bitmapId: bitmapId
            });
          });
        })(unlockedAsset));
      }
      return results;
    }.call(this);
    if (!createAssetBitmapPromises.length) {
      return;
    }
    return Promise.all(createAssetBitmapPromises).then(newAssets => {
      return PAA.Practice.Project.documents.update(activeProjectId, {
        $push: {
          assets: {
            $each: newAssets
          }
        },
        $set: {
          lastEditTime: new Date()
        }
      });
    });
  }
  static _createAssetBitmap(asset) {
    return new Promise(async (resolve, reject) => {
      var imagePromises, imageUrl, imageUrls, macintoshPalette;
      // Load all the images.
      imageUrls = asset.imageUrls();
      if (!_.isArray(imageUrls)) {
        imageUrls = [imageUrls];
      }
      imagePromises = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = imageUrls.length; i < len; i++) {
          imageUrl = imageUrls[i];
          results.push(new Promise(resolve => {
            var image;
            image = new Image();
            image.addEventListener('load', () => {
              return resolve(image);
            }, false);

            // Initiate the loading.
            return image.src = Meteor.absoluteUrl(imageUrl);
          }));
        }
        return results;
      }.call(this);

      // Load the macintosh palette.
      macintoshPalette = await new Promise(resolve => {
        return Tracker.autorun(computation => {
          var palette;
          LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Macintosh);
          if (!(palette = LOI.Assets.Palette.documents.findOne({
            name: LOI.Assets.Palette.SystemPaletteNames.Macintosh
          }))) {
            return;
          }
          computation.stop();
          return resolve(palette);
        });
      });

      // Create a bitmap out of the images.
      return Promise.all(imagePromises).then(imageResults => {
        var bitmapData, creationTime, height, imageResult, layer, width;
        creationTime = new Date();
        width = imageResults[0].width;
        height = imageResults[0].height;
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
            _id: macintoshPalette._id
          }
        };
        bitmapData.layers = function () {
          var i, len, results;
          results = [];
          for (i = 0, len = imageResults.length; i < len; i++) {
            imageResult = imageResults[i];
            layer = new LOI.Assets.Bitmap.Layer(bitmapData, bitmapData, {
              bounds: {
                x: 0,
                y: 0,
                width: width,
                height: height
              }
            });
            layer.importImage(imageResult, macintoshPalette);
            results.push(layer.toPlainObject());
          }
          return results;
        }();
        return resolve(LOI.Assets.Bitmap.documents.insert(bitmapData));
      });
    });
  }
  static completedConditions() {
    var activeProjectId, asset, bitmap, project, requiredAssetId;
    if (!(activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'))) {
      return;
    }
    if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
      return;
    }
    // The player must have drawn the first of the unlocked assets.
    requiredAssetId = this.unlockedAssets()[0].id();
    if (!(asset = _.find(project.assets, asset => {
      return asset.id === requiredAssetId;
    }))) {
      return;
    }
    if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
      return;
    }

    // We know the player has changed the bitmap if the history position is not zero.
    return bitmap.historyPosition;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tasks.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/pinball/tasks.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Goal, LM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Goal = LM.PixelArtFundamentals.Fundamentals.Goals.Pinball;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Goal.OpenPinballMachine = function () {
  class OpenPinballMachine extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".OpenPinballMachine");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "打开您的弹球机";
    }
    static instructions() {
      return "在 Pixeltosh 应用中，打开弹球创作套件驱动器并打开「我的弹球机」文件。";
    }
    static interests() {
      return ['pinball', 'video game'];
    }
    static requiredInterests() {
      return ['smooth curve (pixel art)'];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonWarehouse';
    }
    static completedConditions() {
      return LM.PixelArtFundamentals.Fundamentals.state('openedPinballMachine');
    }
    reset() {
      super.reset(...arguments);
      return LM.PixelArtFundamentals.Fundamentals.state('openedPinballMachine', false);
    }
  }
  ;
  OpenPinballMachine.initialize();
  return OpenPinballMachine;
}.call(this);
Goal.DrawBall = function () {
  var Task;
  class DrawBall extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawBall");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制球";
    }
    static instructions() {
      return "在绘画应用中，找到弹球项目并将球精灵图变成一个圆形。";
    }
    static predecessors() {
      return [Goal.OpenPinballMachine];
    }
    static studyPlanBuilding() {
      return 'SimCityIndustrial3';
    }
    static unlockedAssets() {
      return [Pinball.Assets.Ball, Pinball.Assets.Plunger];
    }
  }
  ;
  DrawBall.initialize();
  Task = DrawBall;
  DrawBall.RedrawBall = function () {
    class RedrawBall extends PAA.Pixeltosh.Instructions.Instruction {
      static id() {
        return "".concat(Task.id(), ".RedrawBall");
      }
      static message() {
        return "哦不！看起来球是一个立方体！在绘画应用中将其改为球体，这样它才能滚动。";
      }
      static activeConditions() {
        var os, program;
        if (!Task.getAdventureInstance().active()) {
          return;
        }

        // Show when we're in the active Pinball program.
        if (!(os = PAA.PixelPad.Apps.Pixeltosh.getOS())) {
          return;
        }
        program = os.activeProgram();
        if (!(program instanceof PAA.Pixeltosh.Programs.Pinball)) {
          return;
        }
        return program.projectId() === PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId');
      }
      static delayDuration() {
        return 5;
      }
      faceClass() {
        return PAA.Pixeltosh.Instructions.FaceClasses.OhNo;
      }
    }
    ;
    RedrawBall.initialize();
    return RedrawBall;
  }.call(this);
  return DrawBall;
}.call(this);
Goal.PlayBall = function () {
  class PlayBall extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayBall");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "试试新球";
    }
    static instructions() {
      return "回到弹球机，测试新球在球台上的移动方式。";
    }
    static predecessors() {
      return [Goal.DrawBall];
    }
    static studyPlanBuilding() {
      return 'SimCityIndustrial4';
    }
    static completedConditions() {
      var ballTravelExtents;
      if (!(ballTravelExtents = Pinball.state('ballTravelExtents'))) {
        return;
      }

      // The ball must have reached into the top third.
      return ballTravelExtents.z.min < Pinball.SceneManager.shortPlayfieldDepth / 3;
    }
    reset() {
      super.reset(...arguments);
      return Pinball.resetBallExtents();
    }
  }
  ;
  PlayBall.initialize();
  return PlayBall;
}.call(this);
Goal.DrawPlayfield = function () {
  class DrawPlayfield extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawPlayfield");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "更改球台";
    }
    static instructions() {
      return "在弹球项目中，在球台顶部画一条曲线，将球从发射道重新导向主球台区域。";
    }
    static predecessors() {
      return [Goal.PlayBall];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonDepot';
    }
    static onActive() {
      super.onActive(...arguments);

      // Make sure we get a fresh start on the extents in case the ball bounced out of the shooter lane by chance.
      // We do this in this step instead of the next since completedConditions can otherwise run before onActive.
      return Pinball.resetBallExtents();
    }
    static unlockedAssets() {
      return [Pinball.Assets.Playfield];
    }
  }
  ;
  DrawPlayfield.initialize();
  return DrawPlayfield;
}.call(this);
Goal.PlayPlayfield = function () {
  class PlayPlayfield extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayPlayfield");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "测试新球台";
    }
    static instructions() {
      return "回到 Pixeltosh，用足够的力量发射球，使其绕过新画的曲线。";
    }
    static predecessors() {
      return [Goal.DrawPlayfield];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonFlats4';
    }
    static completedConditions() {
      var ballTravelExtents;
      if (!(ballTravelExtents = Pinball.state('ballTravelExtents'))) {
        return;
      }

      // The ball must have reached into the left third.
      return ballTravelExtents.x.min < Pinball.SceneManager.playfieldWidth / 3;
    }
    reset() {
      super.reset(...arguments);
      return Pinball.resetBallExtents();
    }
  }
  ;
  PlayPlayfield.initialize();
  return PlayPlayfield;
}.call(this);
Goal.DrawGobbleHole = function () {
  class DrawGobbleHole extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawGobbleHole");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制吞食孔";
    }
    static instructions() {
      return "在弹球项目中，将吞食孔精灵图重绘为您想要的任何形状。";
    }
    static predecessors() {
      return [Goal.PlayPlayfield];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouses2';
    }
    static unlockedAssets() {
      return [Pinball.Assets.GobbleHole];
    }
  }
  ;
  DrawGobbleHole.initialize();
  return DrawGobbleHole;
}.call(this);
Goal.PlayGobbleHole = function () {
  class PlayGobbleHole extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayGobbleHole");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "得分";
    }
    static instructions() {
      return "使用弹球创作套件的编辑模式在球台上放置一个（或多个）吞食孔，然后玩到您在记分板上获得一些分数。";
    }
    static predecessors() {
      return [Goal.DrawGobbleHole];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouses3';
    }
    static completedConditions() {
      return this.playfieldHasPart(Pinball.Parts.GobbleHole) && Pinball.state('highScore');
    }
    reset() {
      super.reset(...arguments);
      return LM.PixelArtFundamentals.Fundamentals.state('highScore', 0);
    }
  }
  ;
  PlayGobbleHole.initialize();
  return PlayGobbleHole;
}.call(this);
Goal.AddPins = function () {
  class AddPins extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".AddPins");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "添加插销";
    }
    static instructions() {
      return "在球台上添加插销，使球的轨迹更有趣。\n您可以通过两种方式做到这一点。在编辑模式下，将单个插销拖到球台上。\n或者直接在球台精灵图上绘制1×1或2×2像素的点。";
    }
    static predecessors() {
      return [Goal.PlayGobbleHole];
    }
    static groupNumber() {
      return -1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouse3';
    }
    static completedConditions() {
      var activeProjectId, isolatedPointFound, partData, pixelArtEvaluation, playfieldAsset, playfieldBitmap, playfieldPartId, project, ref, ref1;
      if (!(activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'))) {
        return;
      }
      if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
        return;
      }
      ref = project.playfield;
      // See if there are any pin parts on the playfield.
      for (playfieldPartId in ref) {
        partData = ref[playfieldPartId];
        if (partData.type === Pinball.Parts.Pin.id()) {
          return true;
        }
      }

      // Alternatively, pins could be drawn as isolated points on the playfield bitmap.
      // HACK: To prevent lag with running the evaluation, only do this when the editor is not active.
      if ((ref1 = PAA.PixelPad.Apps.Drawing.Editor.getEditor()) != null ? ref1.drawingActive() : void 0) {
        return;
      }
      if (!(playfieldAsset = _.find(project.assets, asset => {
        return asset.id === Pinball.Assets.Playfield.id();
      }))) {
        return;
      }
      if (!(playfieldBitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(playfieldAsset.bitmapId))) {
        return;
      }
      pixelArtEvaluation = new PAA.Practice.PixelArtEvaluation(playfieldBitmap);
      isolatedPointFound = _.find(pixelArtEvaluation.layers[0].points, point => {
        return !point.neighbors.length;
      });
      pixelArtEvaluation.destroy();
      return isolatedPointFound;
    }
  }
  ;
  AddPins.initialize();
  return AddPins;
}.call(this);
Goal.DrawBallTrough = function () {
  class DrawBallTrough extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawBallTrough");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制排水道";
    }
    static instructions() {
      return "与吞食孔类似，排水道是一个接住球的区域，但不记分。\n您可以将其用作额外的孔洞形状，通常出现在球台底部。";
    }
    static predecessors() {
      return [Goal.PlayGobbleHole];
    }
    static groupNumber() {
      return 1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonOffice2';
    }
    static unlockedAssets() {
      return [Pinball.Assets.BallTrough];
    }
  }
  ;
  DrawBallTrough.initialize();
  return DrawBallTrough;
}.call(this);
Goal.PlayBallTrough = function () {
  class PlayBallTrough extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayBallTrough");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "添加排水道";
    }
    static instructions() {
      return "将排水道放置在球台上。\n此外，您可以重绘球台来将球引导到底部的排水道。";
    }
    static predecessors() {
      return [Goal.DrawBallTrough];
    }
    static groupNumber() {
      return 1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonFlats3';
    }
    static completedConditions() {
      return this.playfieldHasPart(Pinball.Parts.BallTrough);
    }
  }
  ;
  PlayBallTrough.initialize();
  return PlayBallTrough;
}.call(this);
Goal.DrawBumper = function () {
  class DrawBumper extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawBumper");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制缓冲器";
    }
    static instructions() {
      return "为缓冲器精灵图绘制一个设计。弹簧将沿着轮廓放置，把球弹开。";
    }
    static predecessors() {
      return [Goal.AddPins, Goal.PlayBallTrough];
    }
    static studyPlanBuilding() {
      return 'SimCityCommercial4';
    }
    static unlockedAssets() {
      return [Pinball.Assets.Bumper];
    }
  }
  ;
  DrawBumper.initialize();
  return DrawBumper;
}.call(this);
Goal.PlayBumper = function () {
  class PlayBumper extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayBumper");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "在球台上放置缓冲器";
    }
    static instructions() {
      return "如需要的话，移除一些部件在球台上腾出空间。\n放置多个缓冲器，并在设置选项卡上调整它们弹簧的弹性。";
    }
    static predecessors() {
      return [Goal.DrawBumper];
    }
    static studyPlanBuilding() {
      return 'SimCityResidential6';
    }
    static completedConditions() {
      return this.playfieldHasPart(Pinball.Parts.Bumper);
    }
  }
  ;
  PlayBumper.initialize();
  return PlayBumper;
}.call(this);
Goal.DrawGate = function () {
  class DrawGate extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawGate");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制门";
    }
    static instructions() {
      return "为了防止球返回发射道，我们需要一个门。\n在弹球项目中，根据需要修改门精灵图。";
    }
    static predecessors() {
      return [Goal.PlayBumper];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouse4';
    }
    static unlockedAssets() {
      return [Pinball.Assets.Gate];
    }
  }
  ;
  DrawGate.initialize();
  return DrawGate;
}.call(this);
Goal.PlayGate = function () {
  class PlayGate extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayGate");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "在发射道上添加门";
    }
    static instructions() {
      return "将门放置在发射道的出口处并旋转它，使球可以出去但不能进来。";
    }
    static predecessors() {
      return [Goal.DrawGate];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonPark1';
    }
    static completedConditions() {
      return this.playfieldHasPart(Pinball.Parts.Gate);
    }
  }
  ;
  PlayGate.initialize();
  return PlayGate;
}.call(this);
Goal.RemoveGobbleHoles = function () {
  class RemoveGobbleHoles extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".RemoveGobbleHoles");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "移除吞食孔";
    }
    static instructions() {
      return "机械弹球机的时代即将结束。\n有了新的得分方式，从球台上移除吞食孔，为挡板腾出空间。";
    }
    static predecessors() {
      return [Goal.PlayGate];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouse2';
    }
    static completedConditions() {
      return !this.playfieldHasPart(Pinball.Parts.GobbleHole);
    }
  }
  ;
  RemoveGobbleHoles.initialize();
  return RemoveGobbleHoles;
}.call(this);
Goal.DrawFlipper = function () {
  class DrawFlipper extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawFlipper");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制挡板";
    }
    static instructions() {
      return "挡板来了！为左挡板绘制一个您想要的形状，这是它在静止状态下的样子。";
    }
    static predecessors() {
      return [Goal.RemoveGobbleHoles];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouse1';
    }
    static unlockedAssets() {
      return [Pinball.Assets.Flipper];
    }
  }
  ;
  DrawFlipper.initialize();
  return DrawFlipper;
}.call(this);
Goal.PlayFlipper = function () {
  class PlayFlipper extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayFlipper");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "玩挡板";
    }
    static instructions() {
      return "在球台底部添加两个挡板。使用编辑菜单将左挡板翻转成右挡板。\n在设置选项卡上，调整角度范围以适合您的挡板。";
    }
    static predecessors() {
      return [Goal.DrawFlipper];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonChurch';
    }
    static completedConditions() {
      var activeProjectId, leftFound, partData, playfieldPartId, project, ref, rightFound;
      if (!(activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'))) {
        return;
      }
      if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
        return;
      }
      leftFound = false;
      rightFound = false;
      ref = project.playfield;
      for (playfieldPartId in ref) {
        partData = ref[playfieldPartId];
        if (partData.type === Pinball.Parts.Flipper.id()) {
          if (partData.flipped) {
            rightFound = true;
          } else {
            leftFound = true;
          }
        }
      }
      return leftFound && rightFound;
    }
  }
  ;
  PlayFlipper.initialize();
  return PlayFlipper;
}.call(this);
Goal.DrawLowerThird = function () {
  class DrawLowerThird extends Goal.RedrawPlayfieldTask {
    static id() {
      return "".concat(Goal.id(), ".DrawLowerThird");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "现代化下半部分";
    }
    static instructions() {
      return "有了挡板后，为球台的下三分之一绘制一个更现代化的布局。\n典型的布局包括外车道和内车道，以及弹射器。\n编辑球台精灵图，直到您对设计的玩法感到满意。";
    }
    static predecessors() {
      return [Goal.PlayFlipper];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonFlats4';
    }
  }
  ;
  DrawLowerThird.initialize();
  return DrawLowerThird;
}.call(this);
Goal.ActiveBumpers = function () {
  class ActiveBumpers extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".ActiveBumpers");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "给缓冲器一些弹力";
    }
    static instructions() {
      return "您现在可以将静态缓冲器转变为主动缓冲器。\n选择您在球台上放置的缓冲器，然后点击编辑器中的设置选项卡。\n点击主动选项将其变成一个会用力将球弹开的缓冲器，增加游戏的乐趣。\n如果愿意，也可以借此机会更新您的缓冲器绘制。";
    }
    static predecessors() {
      return [Goal.DrawLowerThird];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouses4';
    }
    static completedConditions() {
      var activeProjectId, partData, playfieldPartId, project, ref;
      // Find a bumper with active set to true.
      if (!(activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId'))) {
        return;
      }
      if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
        return;
      }
      ref = project.playfield;
      for (playfieldPartId in ref) {
        partData = ref[playfieldPartId];
        if (partData.type === Pinball.Parts.Bumper.id() && partData.active) {
          return true;
        }
      }
      return false;
    }
  }
  ;
  ActiveBumpers.initialize();
  return ActiveBumpers;
}.call(this);
Goal.DrawUpperThird = function () {
  class DrawUpperThird extends Goal.RedrawPlayfieldTask {
    static id() {
      return "".concat(Goal.id(), ".DrawUpperThird");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "简化上半部分";
    }
    static instructions() {
      return "在您的球台精灵图上，使用平滑曲线绘制车道，使球可以穿过球台的上部。\n将车道的入口和出口对准挡板的方向。\n上半部分通常还为多个缓冲器提供一个地方，在它们之间弹球。";
    }
    static predecessors() {
      return [Goal.ActiveBumpers];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonShops1';
    }
  }
  ;
  DrawUpperThird.initialize();
  return DrawUpperThird;
}.call(this);
Goal.DrawSpinningTarget = function () {
  class DrawSpinningTarget extends Goal.AssetsTask {
    static id() {
      return "".concat(Goal.id(), ".DrawSpinningTarget");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制旋转目标";
    }
    static instructions() {
      return "为旋转目标精灵图绘制一个设计。您也可以根据需要调整其大小。";
    }
    static predecessors() {
      return [Goal.DrawUpperThird];
    }
    static studyPlanBuilding() {
      return 'SimCityWaterPump';
    }
    static unlockedAssets() {
      return [Pinball.Assets.SpinningTarget];
    }
  }
  ;
  DrawSpinningTarget.initialize();
  return DrawSpinningTarget;
}.call(this);
Goal.PlaySpinningTarget = function () {
  class PlaySpinningTarget extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlaySpinningTarget");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "让目标旋转";
    }
    static instructions() {
      return "在球台上添加一个或多个旋转目标。\n根据击中它们的难度设置分数，玩游戏以获得大量分数升级。";
    }
    static predecessors() {
      return [Goal.DrawSpinningTarget];
    }
    static studyPlanBuilding() {
      return 'SimCityWindTurbine';
    }
    static completedConditions() {
      return this.playfieldHasPart(Pinball.Parts.SpinningTarget);
    }
  }
  ;
  PlaySpinningTarget.initialize();
  return PlaySpinningTarget;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"chess":{"chess.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/chess/chess.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Goals.Chess = function () {
  var Goal;
  class Chess extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Goals.Chess';
    }
    static displayName() {
      return "Chess";
    }
    static chapter() {
      return LM.PixelArtFundamentals.Fundamentals;
    }
    static tasks() {
      return [this.TwoDimensional, this.ThreeDimensional, this.BuyPawn, this.DrawWhitePawn, this.DrawBlackPawn, this.PawnLessons, this.BuyBishop, this.DrawBishop, this.BuySecondBishop, this.BuyKnight, this.DrawKnight, this.BuySecondKnight, this.BuyRook, this.DrawRook, this.BuySecondRook, this.BuyQueen, this.DrawQueen, this.BuyKing, this.DrawKing, this.KingLessons, this.BuyPawns, this.PlayGame];
    }
    static finalTasks() {
      return [this.PlayGame];
    }
    reset() {
      super.reset(...arguments);
      PAA.Pixeltosh.Programs.Chess.state('boardDisplayType', null);
      PAA.Pixeltosh.Programs.Chess.state('projectId2D', null);
      PAA.Pixeltosh.Programs.Chess.state('currency', null);
      PAA.Pixeltosh.Programs.Chess.state('ownedPieceTypeCounts', null);
      PAA.Pixeltosh.Programs.Chess.state('pendingRewards', null);
      PAA.Pixeltosh.Programs.Chess.state('playStarted', null);
      PAA.Pixeltosh.Programs.Chess.state('Lessons', null);
      PAA.Pixeltosh.Programs.Chess.state('Rewards', null);
      return PAA.Pixeltosh.Programs.Chess.Project.TwoDimensional.end();
    }
  }
  ;
  Chess.initialize();
  Goal = Chess;
  Chess.Task = class Task extends PAA.Learning.Task.Automatic {};
  return Chess;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tasks.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/chess/tasks.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Chess, Goal, LM, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Goal = LM.PixelArtFundamentals.Fundamentals.Goals.Chess;
Chess = PAA.Pixeltosh.Programs.Chess;
Goal.TwoDimensional = function () {
  class TwoDimensional extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".TwoDimensional");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "选择 2D 棋盘";
    }
    static instructions() {
      return "在 Pixeltosh 应用中打开国际象棋学院驱动器，并运行国际象棋学院程序。\n选择 2D 棋盘样式开始。";
    }
    static groupNumber() {
      return -1;
    }
    static requiredInterests() {
      return ['size (pixel art)'];
    }
    static studyPlanBuilding() {
      return 'CountyLineSign';
    }
    static completedConditions() {
      return Chess.state('boardDisplayType') === Chess.BoardDisplayTypes.TwoDimensional;
    }
  }
  ;
  TwoDimensional.initialize();
  return TwoDimensional;
}.call(this);
Goal.ThreeDimensional = function () {
  class ThreeDimensional extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".ThreeDimensional");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "选择 3D 棋盘";
    }
    static instructions() {
      return "在 Pixeltosh 应用中打开国际象棋学院驱动器，并运行国际象棋学院程序。\n选择 3D 棋盘样式开始。";
    }
    static groupNumber() {
      return 1;
    }
    static requiredInterests() {
      return ['form'];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonDepot';
    }
    static completedConditions() {
      return Chess.state('boardDisplayType') === Chess.BoardDisplayTypes.ThreeDimensional;
    }
  }
  ;
  ThreeDimensional.initialize();
  return ThreeDimensional;
}.call(this);
Goal.BuyPawn = function () {
  class BuyPawn extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuyPawn");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买一枚兵";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院中点击购买按钮打开商店，并购买一枚兵。";
    }
    static predecessors() {
      return [Goal.TwoDimensional, Goal.ThreeDimensional];
    }
    static predecessorsCompleteType() {
      return this.PredecessorsCompleteTypes.Any;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouses1';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Pawn);
    }
  }
  ;
  BuyPawn.initialize();
  return BuyPawn;
}.call(this);
Goal.DrawWhitePawn = function () {
  class DrawWhitePawn extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".DrawWhitePawn");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制一枚白兵";
    }
    static instructions() {
      return "在绘画应用中找到 2D 或 3D 国际象棋项目，并绘制一枚白兵。";
    }
    static predecessors() {
      return [Goal.BuyPawn];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouse4';
    }
    static completedConditions() {
      return Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Pawn, Chess.Piece.Colors.White);
    }
  }
  ;
  DrawWhitePawn.initialize();
  return DrawWhitePawn;
}.call(this);
Goal.DrawBlackPawn = function () {
  class DrawBlackPawn extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".DrawBlackPawn");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制一枚黑兵";
    }
    static instructions() {
      return "在绘画应用中使用剪贴板选项复制白兵，再将其重新着色为深色，从而绘制一枚黑兵。";
    }
    static predecessors() {
      return [Goal.DrawWhitePawn];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouses2';
    }
    static completedConditions() {
      return Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Pawn, Chess.Piece.Colors.Black);
    }
  }
  ;
  DrawBlackPawn.initialize();
  return DrawBlackPawn;
}.call(this);
Goal.PawnLessons = function () {
  class PawnLessons extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PawnLessons");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "完成兵的课程";
    }
    static instructions() {
      return "返回国际象棋学院并完成兵规则课程，直到你拥有足够货币购买一种新棋子。";
    }
    static predecessors() {
      return [Goal.DrawBlackPawn];
    }
    static studyPlanBuilding() {
      return 'TransportTycoonBusStation';
    }
    static completedConditions() {
      return Chess.currency() >= 3;
    }
  }
  ;
  PawnLessons.initialize();
  return PawnLessons;
}.call(this);
Goal.BuyKnight = function () {
  class BuyKnight extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuyKnight");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买一枚马";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院商店中购买一枚马。";
    }
    static predecessors() {
      return [Goal.PawnLessons];
    }
    static groupNumber() {
      return -3;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonPark2';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Knight);
    }
  }
  ;
  BuyKnight.initialize();
  return BuyKnight;
}.call(this);
Goal.DrawKnight = function () {
  class DrawKnight extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".DrawKnight");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制马精灵图";
    }
    static instructions() {
      return "在绘画应用中绘制白马和黑马。你可以复制白兵图稿，作为新棋子的基础。";
    }
    static predecessors() {
      return [Goal.BuyKnight];
    }
    static groupNumber() {
      return -3;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouses3';
    }
    static completedConditions() {
      return Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Knight, Chess.Piece.Colors.White) && Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Knight, Chess.Piece.Colors.Black);
    }
  }
  ;
  DrawKnight.initialize();
  return DrawKnight;
}.call(this);
Goal.BuySecondKnight = function () {
  class BuySecondKnight extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuySecondKnight");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买第二枚马";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院中购买第二枚马。";
    }
    static predecessors() {
      return [Goal.DrawKnight];
    }
    static groupNumber() {
      return -3;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonPark1';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Knight) === 2;
    }
  }
  ;
  BuySecondKnight.initialize();
  return BuySecondKnight;
}.call(this);
Goal.BuyBishop = function () {
  class BuyBishop extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuyBishop");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买一枚象";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院商店中购买一枚象。";
    }
    static predecessors() {
      return [Goal.PawnLessons];
    }
    static groupNumber() {
      return -2;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonChurch';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Bishop);
    }
  }
  ;
  BuyBishop.initialize();
  return BuyBishop;
}.call(this);
Goal.DrawBishop = function () {
  class DrawBishop extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".DrawBishop");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制象精灵图";
    }
    static instructions() {
      return "在绘画应用中绘制白象和黑象。你可以复制之前的棋子图稿，作为新棋子的基础。";
    }
    static predecessors() {
      return [Goal.BuyBishop];
    }
    static groupNumber() {
      return -2;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonFlats1';
    }
    static completedConditions() {
      return Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Bishop, Chess.Piece.Colors.White) && Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Bishop, Chess.Piece.Colors.Black);
    }
  }
  ;
  DrawBishop.initialize();
  return DrawBishop;
}.call(this);
Goal.BuySecondBishop = function () {
  class BuySecondBishop extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuySecondBishop");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买第二枚象";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院中再购买一枚象。";
    }
    static predecessors() {
      return [Goal.DrawBishop];
    }
    static groupNumber() {
      return -2;
    }
    static studyPlanBuilding() {
      return 'SimCityChurch';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Bishop) === 2;
    }
  }
  ;
  BuySecondBishop.initialize();
  return BuySecondBishop;
}.call(this);
Goal.BuyRook = function () {
  class BuyRook extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuyRook");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买一枚车";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院商店中购买一枚车。";
    }
    static predecessors() {
      return [Goal.PawnLessons];
    }
    static groupNumber() {
      return -1;
    }
    static studyPlanBuilding() {
      return 'SimCityOffice3';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Rook);
    }
  }
  ;
  BuyRook.initialize();
  return BuyRook;
}.call(this);
Goal.DrawRook = function () {
  class DrawRook extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".DrawRook");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制车精灵图";
    }
    static instructions() {
      return "在绘画应用中绘制白车和黑车。你可以复制之前的棋子图稿，作为新棋子的基础。";
    }
    static predecessors() {
      return [Goal.BuyRook];
    }
    static groupNumber() {
      return -1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonHouses4';
    }
    static completedConditions() {
      return Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Rook, Chess.Piece.Colors.White) && Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Rook, Chess.Piece.Colors.Black);
    }
  }
  ;
  DrawRook.initialize();
  return DrawRook;
}.call(this);
Goal.BuySecondRook = function () {
  class BuySecondRook extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuySecondRook");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买第二枚车";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院中再购买一枚车。";
    }
    static predecessors() {
      return [Goal.DrawRook];
    }
    static groupNumber() {
      return -1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonOffice1';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Rook) === 2;
    }
  }
  ;
  BuySecondRook.initialize();
  return BuySecondRook;
}.call(this);
Goal.BuyQueen = function () {
  class BuyQueen extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuyQueen");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买一枚后";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院商店中购买一枚后。";
    }
    static predecessors() {
      return [Goal.PawnLessons];
    }
    static groupNumber() {
      return 0;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonOffice4';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Queen);
    }
  }
  ;
  BuyQueen.initialize();
  return BuyQueen;
}.call(this);
Goal.DrawQueen = function () {
  class DrawQueen extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".DrawQueen");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制后精灵图";
    }
    static instructions() {
      return "在绘画应用中绘制白后和黑后。你可以复制之前的棋子图稿，作为新棋子的基础。";
    }
    static predecessors() {
      return [Goal.BuyQueen];
    }
    static groupNumber() {
      return 0;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonShops2';
    }
    static completedConditions() {
      return Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Queen, Chess.Piece.Colors.White) && Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.Queen, Chess.Piece.Colors.Black);
    }
  }
  ;
  DrawQueen.initialize();
  return DrawQueen;
}.call(this);
Goal.BuyKing = function () {
  class BuyKing extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuyKing");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买一枚王";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院商店中购买一枚王。";
    }
    static predecessors() {
      return [Goal.PawnLessons];
    }
    static groupNumber() {
      return 1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonOffice3';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.King);
    }
  }
  ;
  BuyKing.initialize();
  return BuyKing;
}.call(this);
Goal.DrawKing = function () {
  class DrawKing extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".DrawKing");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "绘制王精灵图";
    }
    static instructions() {
      return "在绘画应用中绘制白王和黑王。你可以复制之前的棋子图稿，作为新棋子的基础。";
    }
    static predecessors() {
      return [Goal.BuyKing];
    }
    static groupNumber() {
      return 1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonTheater';
    }
    static completedConditions() {
      return Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.King, Chess.Piece.Colors.White) && Chess.assetIsDrawnInEitherDimension(Chess.Piece.Types.King, Chess.Piece.Colors.Black);
    }
  }
  ;
  DrawKing.initialize();
  return DrawKing;
}.call(this);
Goal.KingLessons = function () {
  class KingLessons extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".KingLessons");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "完成王的课程";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院中，通过王的课程学习棋局如何获胜与失败。";
    }
    static predecessors() {
      return [Goal.DrawKing];
    }
    static groupNumber() {
      return 1;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonFlats2';
    }
    static completedConditions() {
      return Chess.Lessons.Categories.King.completed();
    }
  }
  ;
  KingLessons.initialize();
  return KingLessons;
}.call(this);
Goal.BuyPawns = function () {
  class BuyPawns extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".BuyPawns");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "购买全部 8 枚兵";
    }
    static instructions() {
      return "在 Pixeltosh 的国际象棋学院中集齐整套兵。";
    }
    static predecessors() {
      return [Goal.PawnLessons];
    }
    static groupNumber() {
      return 2;
    }
    static studyPlanBuilding() {
      return 'TransportTycoonWarehouse';
    }
    static completedConditions() {
      return Chess.ownedPiecesCount(Chess.Piece.Types.Pawn) === 8;
    }
  }
  ;
  BuyPawns.initialize();
  return BuyPawns;
}.call(this);
Goal.PlayGame = function () {
  class PlayGame extends Goal.Task {
    static id() {
      return "".concat(Goal.id(), ".PlayGame");
    }
    static goal() {
      return Goal;
    }
    static directive() {
      return "进行一盘完整的国际象棋";
    }
    static instructions() {
      return "购买全部棋子后，你现在可以进行一盘完整的国际象棋。\n\n在 Pixeltosh 的国际象棋学院中，从侧边栏的“课程”选项卡切换到“对弈”选项卡，并使用任意设置开始一局游戏。";
    }
    static interests() {
      return ['chess', 'video game'];
    }
    static predecessors() {
      return [Goal.BuySecondKnight, Goal.BuySecondBishop, Goal.BuySecondRook, Goal.DrawQueen, Goal.KingLessons, Goal.BuyPawns];
    }
    static studyPlanBuilding() {
      return 'TransportTycoon';
    }
    static completedConditions() {
      return Chess.state('playStarted');
    }
  }
  ;
  PlayGame.initialize();
  return PlayGame;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"content":{"content.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/content.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Content = class Content {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"course.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/course.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Content.Course = function () {
  class Course extends LM.Content.Course {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Course';
    }
    static displayName() {
      return "Pixel art fundamentals";
    }
    static description() {
      return "学习基本的像素艺术概念，如锯齿、混叠和抖动。";
    }
    static tags() {
      return [LM.Content.Tags.BaseGame, LM.Content.Tags.WIP];
    }
    static contents() {
      return [LM.PixelArtFundamentals.Fundamentals.Content.Goals, LM.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials, LM.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges, LM.PixelArtFundamentals.Fundamentals.Content.Projects, LM.PixelArtFundamentals.Fundamentals.Content.Apps, LM.PixelArtFundamentals.Fundamentals.Content.DrawingEditors];
    }
  }
  ;
  Course.initialize();
  return Course;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"apps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/apps.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Content.Apps = function () {
  class Apps extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Apps';
    }
    static displayName() {
      return "Apps";
    }
    static tags() {
      return [LM.Content.Tags.WIP];
    }
    static contents() {
      return [this.Music, this.Pixeltosh, this.Pixelvision, this.PixelKid, this.PixelFriend, this.StudyPlan];
    }
    status() {
      return LM.Content.Status.Unlocked;
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this,
        units: "apps"
      });
    }
  }
  ;
  Apps.initialize();
  Apps.StudyPlan = function () {
    class StudyPlan extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Apps.StudyPlan';
      }
      static displayName() {
        return "Study Plan";
      }
    }
    ;
    StudyPlan.initialize();
    return StudyPlan;
  }.call(this);
  Apps.Pixeltosh = function () {
    class Pixeltosh extends LM.Content.AppContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Apps.Pixeltosh';
      }
      static unlockInstructions() {
        return "完成艺术元素：线条教程以解锁 Pixeltosh 应用。";
      }
      status() {
        if (LM.PixelArtFundamentals.pixeltoshEnabled()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Pixeltosh.appClass = PAA.PixelPad.Apps.Pixeltosh;
    Pixeltosh.initialize();
    return Pixeltosh;
  }.call(this);
  Apps.Pixelvision = function () {
    class Pixelvision extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Apps.PixelVision';
      }
      static displayName() {
        return "Pixelvision";
      }
    }
    ;
    Pixelvision.initialize();
    return Pixelvision;
  }.call(this);
  Apps.PixelKid = function () {
    class PixelKid extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Apps.PixelKid';
      }
      static displayName() {
        return "Pixel Kid";
      }
    }
    ;
    PixelKid.initialize();
    return PixelKid;
  }.call(this);
  Apps.PixelFriend = function () {
    class PixelFriend extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Apps.PixelFriend';
      }
      static displayName() {
        return "Pixel Friend";
      }
    }
    ;
    PixelFriend.initialize();
    return PixelFriend;
  }.call(this);
  Apps.Music = function () {
    class Music extends LM.Content.AppContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Apps.Music';
      }
      static unlockInstructions() {
        return "完成像素画工具课程以解锁音乐应用。";
      }
      status() {
        if (LM.PixelArtFundamentals.Start.finished()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Music.appClass = PAA.PixelPad.Apps.Music;
    Music.initialize();
    return Music;
  }.call(this);
  return Apps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/goals.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Content.Goals = function () {
  class Goals extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Goals';
    }
    static displayName() {
      return "Study goals";
    }
    static tags() {
      return [LM.Content.Tags.WIP];
    }
    static contents() {
      return [this.ElementsOfArt, this.Jaggies, this.Pinball, this.Simplification, this.Chess];
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this,
        weight: 2,
        requiredUnits: "goals",
        totalUnits: "tasks",
        totalRecursive: true
      });
    }
    status() {
      return this.constructor.Status.Unlocked;
    }
  }
  ;
  Goals.initialize();
  Goals.ElementsOfArt = function () {
    class ElementsOfArt extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Goals.ElementsOfArt';
      }
      static tags() {
        return [LM.Content.Tags.WIP];
      }
    }
    ;
    ElementsOfArt.goalClass = LM.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt;
    ElementsOfArt.initialize();
    return ElementsOfArt;
  }.call(this);
  Goals.Jaggies = function () {
    class Jaggies extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Goals.Jaggies';
      }
      static unlockInstructions() {
        return "完成艺术元素：线条教程以学习像素画线条。";
      }
      status() {
        var ref;
        if ((ref = LM.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Line.getAdventureInstance()) != null ? ref.completed() : void 0) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Jaggies.goalClass = LM.PixelArtFundamentals.Fundamentals.Goals.Jaggies;
    Jaggies.initialize();
    return Jaggies;
  }.call(this);
  Goals.Pinball = function () {
    class Pinball extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Goals.Pinball';
      }
      static tags() {
        return [LM.Content.Tags.WIP];
      }
      static unlockInstructions() {
        return "完成平滑曲线挑战以开始创建你自己的弹珠台。";
      }
      status() {
        if (LM.PixelArtFundamentals.pinballEnabled()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Pinball.goalClass = LM.PixelArtFundamentals.Fundamentals.Goals.Pinball;
    Pinball.initialize();
    return Pinball;
  }.call(this);
  Goals.Simplification = function () {
    class Simplification extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Goals.Simplification';
      }
      static unlockInstructions() {
        return "完成艺术元素：形状教程以解锁简化学习目标。";
      }
      status() {
        if (LM.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt.Shape.completed()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Simplification.goalClass = LM.PixelArtFundamentals.Fundamentals.Goals.Simplification;
    Simplification.initialize();
    return Simplification;
  }.call(this);
  Goals.Chess = function () {
    class Chess extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Goals.Chess';
      }
      static unlockInstructions() {
        return "Complete the Pixel art readability challenge to start drawing chess pieces.";
      }
      status() {
        if (LM.PixelArtFundamentals.Fundamentals.Goals.Size.completed()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Chess.goalClass = LM.PixelArtFundamentals.Fundamentals.Goals.Chess;
    Chess.initialize();
    return Chess;
  }.call(this);
  return Goals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawingtutorials.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/drawingtutorials.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials = function () {
  class DrawingTutorials extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials';
    }
    static displayName() {
      return "Drawing tutorials";
    }
    static tags() {
      return [LM.Content.Tags.WIP];
    }
    static contents() {
      return [this.ElementsOfArt, this.PixelArt, this.Simplification, this.GraphicalProjections];
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this,
        weight: 3,
        requiredUnits: "tutorials",
        totalUnits: "tutorial steps",
        totalRecursive: true
      });
    }
    status() {
      return this.constructor.Status.Unlocked;
    }
  }
  ;
  DrawingTutorials.initialize();
  DrawingTutorials.ElementsOfArt = function () {
    class ElementsOfArt extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt';
      }
      static displayName() {
        return "Elements of art";
      }
      static tags() {
        return [LM.Content.Tags.WIP];
      }
      static contents() {
        return [this.Line, this.Shape, this.Form, this.Space, this.Value, this.Color, this.Texture];
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ContentProgress({
          content: this,
          requiredUnits: "tutorials",
          totalUnits: "tutorial steps",
          totalRecursive: true
        });
      }
      status() {
        return this.constructor.Status.Unlocked;
      }
    }
    ;
    ElementsOfArt.initialize();
    ElementsOfArt.Line = function () {
      class Line extends LM.Content.DrawingTutorialContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Line';
        }
      }
      ;
      Line.tutorialClass = PAA.Tutorials.Drawing.ElementsOfArt.Line;
      Line.initialize();
      return Line;
    }.call(this);
    ElementsOfArt.Shape = function () {
      class Shape extends LM.Content.DrawingTutorialContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Shape';
        }
      }
      ;
      Shape.tutorialClass = PAA.Tutorials.Drawing.ElementsOfArt.Shape;
      Shape.initialize();
      return Shape;
    }.call(this);
    ElementsOfArt.Form = function () {
      class Form extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Form';
        }
        static displayName() {
          return "Elements of art: form";
        }
      }
      ;
      Form.initialize();
      return Form;
    }.call(this);
    ElementsOfArt.Space = function () {
      class Space extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Space';
        }
        static displayName() {
          return "Elements of art: space";
        }
      }
      ;
      Space.initialize();
      return Space;
    }.call(this);
    ElementsOfArt.Value = function () {
      class Value extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Value';
        }
        static displayName() {
          return "Elements of art: value";
        }
      }
      ;
      Value.initialize();
      return Value;
    }.call(this);
    ElementsOfArt.Color = function () {
      class Color extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Color';
        }
        static displayName() {
          return "Elements of art: color";
        }
      }
      ;
      Color.initialize();
      return Color;
    }.call(this);
    ElementsOfArt.Texture = function () {
      class Texture extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Texture';
        }
        static displayName() {
          return "Elements of art: texture";
        }
      }
      ;
      Texture.initialize();
      return Texture;
    }.call(this);
    return ElementsOfArt;
  }.call(this);
  DrawingTutorials.PixelArt = function () {
    class PixelArt extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt';
      }
      static displayName() {
        return "Pixel art";
      }
      static tags() {
        return [LM.Content.Tags.WIP];
      }
      static contents() {
        return [this.Lines, this.Diagonals, this.Curves, this.LineWidth, this.Shapes, this.Size, this.Rotation, this.LimitedPalettes, this.TechnicalLimitations, this.Aliasing, this.Dithering];
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ContentProgress({
          content: this,
          requiredUnits: "tutorials",
          totalUnits: "tutorial steps",
          totalRecursive: true
        });
      }
      status() {
        return this.constructor.Status.Unlocked;
      }
    }
    ;
    PixelArt.initialize();
    PixelArt.Lines = function () {
      class Lines extends LM.Content.DrawingTutorialContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Lines';
        }
      }
      ;
      Lines.tutorialClass = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines;
      Lines.initialize();
      return Lines;
    }.call(this);
    PixelArt.Diagonals = function () {
      class Diagonals extends LM.Content.DrawingTutorialContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Diagonals';
        }
      }
      ;
      Diagonals.tutorialClass = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals;
      Diagonals.initialize();
      return Diagonals;
    }.call(this);
    PixelArt.Curves = function () {
      class Curves extends LM.Content.DrawingTutorialContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Curves';
        }
      }
      ;
      Curves.tutorialClass = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves;
      Curves.initialize();
      return Curves;
    }.call(this);
    PixelArt.LineWidth = function () {
      class LineWidth extends LM.Content.DrawingTutorialContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.LineWidth';
        }
      }
      ;
      LineWidth.tutorialClass = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth;
      LineWidth.initialize();
      return LineWidth;
    }.call(this);
    PixelArt.Shapes = function () {
      class Shapes extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Shapes';
        }
        static displayName() {
          return "Pixel art shapes";
        }
      }
      ;
      Shapes.initialize();
      return Shapes;
    }.call(this);
    PixelArt.Size = function () {
      class Size extends LM.Content.DrawingTutorialContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Size';
        }
      }
      ;
      Size.tutorialClass = PAA.Tutorials.Drawing.PixelArtFundamentals.Size;
      Size.initialize();
      return Size;
    }.call(this);
    PixelArt.Rotation = function () {
      class Rotation extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Rotation';
        }
        static displayName() {
          return "Pixel art rotation";
        }
      }
      ;
      Rotation.initialize();
      return Rotation;
    }.call(this);
    PixelArt.LimitedPalettes = function () {
      class LimitedPalettes extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.LimitedPalettes';
        }
        static displayName() {
          return "Limited palettes";
        }
      }
      ;
      LimitedPalettes.initialize();
      return LimitedPalettes;
    }.call(this);
    PixelArt.TechnicalLimitations = function () {
      class TechnicalLimitations extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.TechnicalLimitations';
        }
        static displayName() {
          return "Technical limitations";
        }
      }
      ;
      TechnicalLimitations.initialize();
      return TechnicalLimitations;
    }.call(this);
    PixelArt.Aliasing = function () {
      class Aliasing extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Aliasing';
        }
        static displayName() {
          return "Aliasing";
        }
      }
      ;
      Aliasing.initialize();
      return Aliasing;
    }.call(this);
    PixelArt.Dithering = function () {
      class Dithering extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Dithering';
        }
        static displayName() {
          return "Dithering";
        }
      }
      ;
      Dithering.initialize();
      return Dithering;
    }.call(this);
    return PixelArt;
  }.call(this);
  DrawingTutorials.Simplification = function () {
    class Simplification extends LM.Content.DrawingTutorialContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.Simplification';
      }
    }
    ;
    Simplification.tutorialClass = PAA.Tutorials.Drawing.Simplification;
    Simplification.initialize();
    return Simplification;
  }.call(this);
  DrawingTutorials.GraphicalProjections = function () {
    class GraphicalProjections extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.GraphicalProjections';
      }
      static displayName() {
        return "Graphical projections";
      }
      static contents() {
        return [this.Multiview, this.PixelIsometric];
      }
      status() {
        return this.constructor.Status.Unlocked;
      }
    }
    ;
    GraphicalProjections.initialize();
    GraphicalProjections.Multiview = function () {
      class Multiview extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.GraphicalProjections.Multiview';
        }
        static displayName() {
          return "Multiview";
        }
      }
      ;
      Multiview.initialize();
      return Multiview;
    }.call(this);
    GraphicalProjections.PixelIsometric = function () {
      class PixelIsometric extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.GraphicalProjections.PixelIsometric';
        }
        static displayName() {
          return "Pixel isometric";
        }
      }
      ;
      PixelIsometric.initialize();
      return PixelIsometric;
    }.call(this);
    return GraphicalProjections;
  }.call(this);
  return DrawingTutorials;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawingchallenges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/drawingchallenges.coffee    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM,
  PAA,
  PixelArtSoftware,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PixelArtSoftware = PAA.Challenges.Drawing.PixelArtSoftware;
LM.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges = function () {
  class DrawingChallenges extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges';
    }
    static displayName() {
      return "Drawing challenges";
    }
    static contents() {
      return [this.PixelArtLineArt, this.PixelArtReadability, this.DrawQuickly];
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this,
        weight: 3,
        units: "challenges"
      });
    }
    status() {
      return this.constructor.Status.Unlocked;
    }
  }
  ;
  DrawingChallenges.initialize();
  DrawingChallenges.PixelArtLineArt = function () {
    class PixelArtLineArt extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtLineArt';
      }
      static displayName() {
        return "Pixel art line art";
      }
      static contents() {
        return [this.PixelPerfectLines, this.EvenDiagonals, this.SmoothCurves, this.ConsistentLineWidth];
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ContentProgress({
          content: this,
          weight: 3,
          units: "evaluation criteria"
        });
      }
      status() {
        if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.completed()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
      static unlockInstructions() {
        return "Complete the Pixel art lines tutorial to unlock the Pixel art line art challenge.";
      }
    }
    ;
    PixelArtLineArt.initialize();
    PixelArtLineArt.CompletedCriteria = class CompletedCriteria extends LM.Content {
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ManualProgress({
          content: this,
          completed: () => {
            var ref, unlockedPixelArtEvaluationCriteria;
            if (!(unlockedPixelArtEvaluationCriteria = PAA.Practice.Project.Asset.Bitmap.state('unlockedPixelArtEvaluationCriteria'))) {
              return;
            }
            return ref = this.constructor.criterion(), indexOf.call(unlockedPixelArtEvaluationCriteria, ref) >= 0;
          }
        });
      }
    };
    PixelArtLineArt.PixelPerfectLines = function () {
      class PixelPerfectLines extends PixelArtLineArt.CompletedCriteria {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtLineArt.PixelPerfectLines';
        }
        static displayName() {
          return "Pixel-perfect lines";
        }
        static unlockInstructions() {
          return "完成像素画线条教程以解锁完美像素线条评估。";
        }
        static criterion() {
          return PAA.Practice.PixelArtEvaluation.Criteria.PixelPerfectLines;
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
      }
      ;
      PixelPerfectLines.initialize();
      return PixelPerfectLines;
    }.call(this);
    PixelArtLineArt.EvenDiagonals = function () {
      class EvenDiagonals extends PixelArtLineArt.CompletedCriteria {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtLineArt.EvenDiagonals';
        }
        static displayName() {
          return "Even diagonals";
        }
        static unlockInstructions() {
          return "完成像素画对角线教程以解锁均匀对角线评估。";
        }
        static criterion() {
          return PAA.Practice.PixelArtEvaluation.Criteria.EvenDiagonals;
        }
        status() {
          if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.completed()) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      EvenDiagonals.initialize();
      return EvenDiagonals;
    }.call(this);
    PixelArtLineArt.SmoothCurves = function () {
      class SmoothCurves extends PixelArtLineArt.CompletedCriteria {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtLineArt.SmoothCurves';
        }
        static displayName() {
          return "Smooth curves";
        }
        static unlockInstructions() {
          return "完成像素画曲线教程以解锁平滑曲线评估。";
        }
        static criterion() {
          return PAA.Practice.PixelArtEvaluation.Criteria.SmoothCurves;
        }
        status() {
          if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.completed()) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      SmoothCurves.initialize();
      return SmoothCurves;
    }.call(this);
    PixelArtLineArt.ConsistentLineWidth = function () {
      class ConsistentLineWidth extends PixelArtLineArt.CompletedCriteria {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtLineArt.ConsistentLineWidth';
        }
        static displayName() {
          return "Consistent line width";
        }
        static unlockInstructions() {
          return "完成像素画线条宽度教程以解锁一致的线条宽度评估。";
        }
        static criterion() {
          return PAA.Practice.PixelArtEvaluation.Criteria.ConsistentLineWidth;
        }
        status() {
          if (PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.completed()) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      ConsistentLineWidth.initialize();
      return ConsistentLineWidth;
    }.call(this);
    return PixelArtLineArt;
  }.call(this);
  DrawingChallenges.DrawQuickly = function () {
    class DrawQuickly extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly';
      }
      static displayName() {
        return "Draw quickly";
      }
      static unlockInstructions() {
        return "完成简化教程以解锁 Pixeltosh 上的快速绘画游戏。";
      }
      static contents() {
        return [this.SymbolicDrawing, this.RealisticDrawing];
      }
      status() {
        if (LM.PixelArtFundamentals.drawQuicklyEnabled()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ContentProgress({
          content: this,
          units: "modes"
        });
      }
    }
    ;
    DrawQuickly.initialize();
    DrawQuickly.SymbolicDrawing = function () {
      class SymbolicDrawing extends LM.Content {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.SymbolicDrawing';
        }
        static displayName() {
          return "Symbolic drawing";
        }
        static contents() {
          return [this.Easy, this.Medium, this.Hard];
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ManualProgress({
            content: this,
            weight: 3,
            units: "combined score",
            completed: () => {
              return this.progress.completedUnitsCount() >= 1;
            },
            unitsCount: () => {
              return 90;
            },
            completedUnitsCount: () => {
              var content;
              return _.sum(function () {
                var i, len, ref, results;
                ref = this.availableContents();
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                  content = ref[i];
                  results.push(content.progress.completedUnitsCount());
                }
                return results;
              }.call(this));
            },
            requiredUnitsCount: () => {
              return 1;
            }
          });
        }
      }
      ;
      SymbolicDrawing.initialize();
      SymbolicDrawing.DifficultyLevel = class DifficultyLevel extends LM.Content {
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ManualProgress({
            content: this,
            units: "combined score",
            completed: () => {
              return this.progress.completedUnitsCount() >= 1;
            },
            unitsCount: () => {
              return 30;
            },
            completedUnitsCount: () => {
              var DrawQuickly, SpeedProperties, fastScore, mediumScore, slowScore;
              DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
              SpeedProperties = DrawQuickly.SymbolicDrawing.SpeedProperties;
              slowScore = DrawQuickly.SymbolicDrawing.getBestScoreForDifficultyAndSpeed(this.constructor.difficulty, SpeedProperties.Slow);
              mediumScore = DrawQuickly.SymbolicDrawing.getBestScoreForDifficultyAndSpeed(this.constructor.difficulty, SpeedProperties.Medium);
              fastScore = DrawQuickly.SymbolicDrawing.getBestScoreForDifficultyAndSpeed(this.constructor.difficulty, SpeedProperties.Fast);

              // Faster times ripple back to slower times.
              mediumScore = Math.max(mediumScore, fastScore);
              slowScore = Math.max(slowScore, mediumScore);
              return slowScore + mediumScore + fastScore;
            },
            requiredUnitsCount: () => {
              return 1;
            }
          });
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
      };
      SymbolicDrawing.Easy = function () {
        class Easy extends SymbolicDrawing.DifficultyLevel {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.SymbolicDrawing.Easy';
          }
          static displayName() {
            return "Easy";
          }
        }
        ;
        Easy.difficulty = 'easy';
        Easy.initialize();
        return Easy;
      }.call(this);
      SymbolicDrawing.Medium = function () {
        class Medium extends SymbolicDrawing.DifficultyLevel {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.SymbolicDrawing.Medium';
          }
          static displayName() {
            return "Medium";
          }
        }
        ;
        Medium.difficulty = 'medium';
        Medium.initialize();
        return Medium;
      }.call(this);
      SymbolicDrawing.Hard = function () {
        class Hard extends SymbolicDrawing.DifficultyLevel {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.SymbolicDrawing.Hard';
          }
          static displayName() {
            return "Hard";
          }
        }
        ;
        Hard.difficulty = 'hard';
        Hard.initialize();
        return Hard;
      }.call(this);
      return SymbolicDrawing;
    }.call(this);
    DrawQuickly.RealisticDrawing = function () {
      class RealisticDrawing extends LM.Content {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.RealisticDrawing';
        }
        static displayName() {
          return "Realistic drawing";
        }
        static contents() {
          return [this.Simple, this.Medium, this.Complex];
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ManualProgress({
            content: this,
            units: "subjects",
            completed: () => {
              return this.progress.completedUnitsCount() >= 1;
            },
            unitsCount: () => {
              var content;
              return _.sum(function () {
                var i, len, ref, results;
                ref = this.availableContents();
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                  content = ref[i];
                  results.push(content.progress.unitsCount());
                }
                return results;
              }.call(this));
            },
            completedUnitsCount: () => {
              var content;
              return _.sum(function () {
                var i, len, ref, results;
                ref = this.availableContents();
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                  content = ref[i];
                  results.push(content.progress.completedUnitsCount());
                }
                return results;
              }.call(this));
            },
            requiredUnitsCount: () => {
              return 1;
            }
          });
        }
      }
      ;
      RealisticDrawing.initialize();
      RealisticDrawing.ComplexityLevel = class ComplexityLevel extends LM.Content {
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ManualProgress({
            content: this,
            units: "subjects",
            completed: () => {
              return this.progress.completedUnitsCount() >= 1;
            },
            unitsCount: () => {
              return PAA.Pixeltosh.Programs.DrawQuickly.RealisticDrawing.thingsByComplexity[this.constructor.complexity].length;
            },
            completedUnitsCount: () => {
              return PAA.Pixeltosh.Programs.DrawQuickly.RealisticDrawing.getDrawnThingsForComplexity(this.constructor.complexity).length;
            },
            requiredUnitsCount: () => {
              return 1;
            }
          });
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
      };
      RealisticDrawing.Simple = function () {
        class Simple extends RealisticDrawing.ComplexityLevel {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.RealisticDrawing.Simple';
          }
          static displayName() {
            return "Simple";
          }
        }
        ;
        Simple.complexity = 'simple';
        Simple.initialize();
        return Simple;
      }.call(this);
      RealisticDrawing.Medium = function () {
        class Medium extends RealisticDrawing.ComplexityLevel {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.RealisticDrawing.Medium';
          }
          static displayName() {
            return "Medium";
          }
        }
        ;
        Medium.complexity = 'medium';
        Medium.initialize();
        return Medium;
      }.call(this);
      RealisticDrawing.Complex = function () {
        class Complex extends RealisticDrawing.ComplexityLevel {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.DrawQuickly.RealisticDrawing.Complex';
          }
          static displayName() {
            return "Complex";
          }
        }
        ;
        Complex.complexity = 'complex';
        Complex.initialize();
        return Complex;
      }.call(this);
      return RealisticDrawing;
    }.call(this);
    return DrawQuickly;
  }.call(this);
  DrawingChallenges.PixelArtReadability = function () {
    class PixelArtReadability extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtReadability';
      }
      static displayName() {
        return "Pixel art readability";
      }
      static unlockInstructions() {
        return "完成像素画尺寸教程以解锁像素画可读性挑战。";
      }
      static contents() {
        return [this.Icon8, this.Icon16, this.Icon32];
      }
      status() {
        if (PAA.Tutorials.Drawing.PixelArtFundamentals.Size.completed()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ManualProgress({
          content: this,
          units: "started icons",
          completedUnitsCount: () => {
            return PAA.Challenges.Drawing.PixelArtReadability.startedTotalCount();
          },
          unitsCount: () => {
            return 94 * 3;
          },
          requiredUnitsCount: () => {
            return 5;
          },
          completed: () => {
            return this.progress.completedUnitsCount() >= this.progress.requiredUnitsCount();
          }
        });
      }
    }
    ;
    PixelArtReadability.initialize();
    PixelArtReadability.Icon = class Icon extends LM.Content {
      static size() {
        throw new AE.NotImplementedException("Icon content must define the size of the icon.");
      }
      static sizeString() {
        var size;
        size = this.size();
        return "".concat(size, "\xD7").concat(size);
      }
      static displayName() {
        return "".concat(this.sizeString(), " icon");
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ManualProgress({
          content: this,
          requiredUnits: "completed icons",
          totalUnits: "started icons",
          completedUnitsCount: () => {
            var ref;
            return ((ref = PAA.Challenges.Drawing.PixelArtReadability.state('startedCounts')) != null ? ref[this.constructor.size()] : void 0) || 0;
          },
          unitsCount: () => {
            return 94;
          },
          requiredCompletedUnitsCount: () => {
            var ref;
            return ((ref = PAA.Challenges.Drawing.PixelArtReadability.state('completedCounts')) != null ? ref[this.constructor.size()] : void 0) || 0;
          },
          requiredUnitsCount: () => {
            return 1;
          },
          completed: () => {
            return this.progress.requiredCompletedUnitsCount() >= this.progress.requiredUnitsCount();
          }
        });
      }
      status() {
        return LM.Content.Status.Unlocked;
      }
    };
    PixelArtReadability.Icon8 = function () {
      class Icon8 extends PixelArtReadability.Icon {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtReadability.Icon8';
        }
        static size() {
          return 8;
        }
      }
      ;
      Icon8.initialize();
      return Icon8;
    }.call(this);
    PixelArtReadability.Icon16 = function () {
      class Icon16 extends PixelArtReadability.Icon {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtReadability.Icon16';
        }
        static size() {
          return 16;
        }
      }
      ;
      Icon16.initialize();
      return Icon16;
    }.call(this);
    PixelArtReadability.Icon32 = function () {
      class Icon32 extends PixelArtReadability.Icon {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtReadability.Icon32';
        }
        static size() {
          return 32;
        }
      }
      ;
      Icon32.initialize();
      return Icon32;
    }.call(this);
    return PixelArtReadability;
  }.call(this);
  return DrawingChallenges;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"projects.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/projects.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA, PixelArtSoftware;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PixelArtSoftware = PAA.Challenges.Drawing.PixelArtSoftware;
LM.PixelArtFundamentals.Fundamentals.Content.Projects = function () {
  class Projects extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects';
    }
    static displayName() {
      return "Projects";
    }
    static tags() {
      return [LM.Content.Tags.WIP];
    }
    static contents() {
      return [this.Pinball, this.Chess, this.PixelPaint, this.CityBuilder, this.BlockBreaker];
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this,
        weight: 2,
        totalUnits: "artworks",
        totalRecursive: true
      });
    }
    status() {
      return LM.Content.Status.Unlocked;
    }
  }
  ;
  Projects.initialize();
  Projects.Pinball = function () {
    class Pinball extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball';
      }
      static displayName() {
        return "Pinball";
      }
      static tags() {
        return [LM.Content.Tags.WIP];
      }
      static unlockInstructions() {
        return "完成平滑曲线挑战以开始弹珠台项目。";
      }
      static contents() {
        return [this.Ball, this.Playfield, this.GobbleHole, this.BallTrough, this.Bumper, this.Gate, this.Flipper, this.SpinningTarget];
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ContentProgress({
          content: this,
          units: "pinball parts"
        });
      }
      status() {
        if (LM.PixelArtFundamentals.pinballEnabled()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Pinball.initialize();
    Pinball.Part = function () {
      class Part extends LM.Content {
        static displayName() {
          return this.asset.displayName();
        }
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ProjectAssetProgress({
            content: this,
            project: PAA.Pixeltosh.Programs.Pinball.Project,
            asset: this.constructor.asset
          });
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
      }
      ;
      Part.asset = null; // Override which project asset this sprite is.

      return Part;
    }.call(this);
    Pinball.Ball = function () {
      class Ball extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.Ball';
        }
      }
      ;
      Ball.asset = PAA.Pixeltosh.Programs.Pinball.Assets.Ball;
      Ball.initialize();
      return Ball;
    }.call(this);
    Pinball.Playfield = function () {
      class Playfield extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.Playfield';
        }
      }
      ;
      Playfield.asset = PAA.Pixeltosh.Programs.Pinball.Assets.Playfield;
      Playfield.initialize();
      return Playfield;
    }.call(this);
    Pinball.GobbleHole = function () {
      class GobbleHole extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.GobbleHole';
        }
      }
      ;
      GobbleHole.asset = PAA.Pixeltosh.Programs.Pinball.Assets.GobbleHole;
      GobbleHole.initialize();
      return GobbleHole;
    }.call(this);
    Pinball.BallTrough = function () {
      class BallTrough extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.BallTrough';
        }
      }
      ;
      BallTrough.asset = PAA.Pixeltosh.Programs.Pinball.Assets.BallTrough;
      BallTrough.initialize();
      return BallTrough;
    }.call(this);
    Pinball.Bumper = function () {
      class Bumper extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.Bumper';
        }
      }
      ;
      Bumper.asset = PAA.Pixeltosh.Programs.Pinball.Assets.Bumper;
      Bumper.initialize();
      return Bumper;
    }.call(this);
    Pinball.Gate = function () {
      class Gate extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.Gate';
        }
      }
      ;
      Gate.asset = PAA.Pixeltosh.Programs.Pinball.Assets.Gate;
      Gate.initialize();
      return Gate;
    }.call(this);
    Pinball.Flipper = function () {
      class Flipper extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.Flipper';
        }
      }
      ;
      Flipper.asset = PAA.Pixeltosh.Programs.Pinball.Assets.Flipper;
      Flipper.initialize();
      return Flipper;
    }.call(this);
    Pinball.SpinningTarget = function () {
      class SpinningTarget extends Pinball.Part {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball.SpinningTarget';
        }
      }
      ;
      SpinningTarget.asset = PAA.Pixeltosh.Programs.Pinball.Assets.SpinningTarget;
      SpinningTarget.initialize();
      return SpinningTarget;
    }.call(this);
    return Pinball;
  }.call(this);
  Projects.BlockBreaker = function () {
    class BlockBreaker extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.BlockBreaker';
      }
      static displayName() {
        return "Block breaker";
      }
    }
    ;
    BlockBreaker.initialize();
    return BlockBreaker;
  }.call(this);
  Projects.Chess = function () {
    class Chess extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess';
      }
      static displayName() {
        return "Chess";
      }
      static tags() {
        return [LM.Content.Tags.WIP];
      }
      static contents() {
        return [this.TwoDimensional, this.ThreeDimensional];
      }
      status() {
        return LM.Content.Status.Unlocked;
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ContentProgress({
          content: this,
          units: 'chess sets'
        });
      }
    }
    ;
    Chess.initialize();
    Chess.PieceType = class PieceType extends LM.Content {
      constructor() {
        var pieceTypeClass;
        super(...arguments);
        pieceTypeClass = this.constructor;
        this.progress = new LM.Content.Progress.ManualProgress({
          content: this,
          completed: function () {
            return this.completedUnitsCount() === 2;
          },
          completedUnitsCount: function () {
            var blackAsset, blackBitmap, count, project, projectId, whiteAsset, whiteBitmap;
            if (!(projectId = pieceTypeClass.project.state('activeProjectId'))) {
              return;
            }
            if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
              return;
            }
            count = 0;
            if (whiteAsset = _.find(project.assets, asset => {
              return asset.id === pieceTypeClass.whiteAsset.id();
            })) {
              if (whiteBitmap = LOI.Assets.Bitmap.documents.findOne(whiteAsset.bitmapId)) {
                if (whiteBitmap.historyPosition) {
                  count++;
                }
              }
            }
            if (blackAsset = _.find(project.assets, asset => {
              return asset.id === pieceTypeClass.blackAsset.id();
            })) {
              if (blackBitmap = LOI.Assets.Bitmap.documents.findOne(blackAsset.bitmapId)) {
                if (blackBitmap.historyPosition) {
                  count++;
                }
              }
            }
            return count;
          },
          requiredUnitsCount: function () {
            return 2;
          },
          units: 'colors'
        });
      }
      status() {
        return LM.Content.Status.Unlocked;
      }
    };
    Chess.TwoDimensional = function () {
      class TwoDimensional extends LM.Content {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional';
        }
        static displayName() {
          return "2D";
        }
        static unlockInstructions() {
          return "Complete the Pixel art fundamentals: size goal to start the 2D chess project.";
        }
        static contents() {
          return [this.Pawn, this.Knight, this.Bishop, this.Rook, this.Queen, this.King];
        }
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ContentProgress({
            content: this,
            units: "chess pieces"
          });
        }
        status() {
          if (LM.PixelArtFundamentals.Fundamentals.Goals.Size.completed()) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      TwoDimensional.initialize();
      TwoDimensional.PieceType = function () {
        class PieceType extends Chess.PieceType {}
        ;
        PieceType.project = PAA.Pixeltosh.Programs.Chess.Project.TwoDimensional;
        return PieceType;
      }.call(this);
      TwoDimensional.Pawn = function () {
        class Pawn extends TwoDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional.Pawn';
          }
          static displayName() {
            return "Pawn";
          }
        }
        ;
        Pawn.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Pawn.White;
        Pawn.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Pawn.Black;
        Pawn.initialize();
        return Pawn;
      }.call(this);
      TwoDimensional.Knight = function () {
        class Knight extends TwoDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional.Knight';
          }
          static displayName() {
            return "Knight";
          }
        }
        ;
        Knight.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Knight.White;
        Knight.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Knight.Black;
        Knight.initialize();
        return Knight;
      }.call(this);
      TwoDimensional.Bishop = function () {
        class Bishop extends TwoDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional.Bishop';
          }
          static displayName() {
            return "Bishop";
          }
        }
        ;
        Bishop.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Bishop.White;
        Bishop.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Bishop.Black;
        Bishop.initialize();
        return Bishop;
      }.call(this);
      TwoDimensional.Rook = function () {
        class Rook extends TwoDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional.Rook';
          }
          static displayName() {
            return "Rook";
          }
        }
        ;
        Rook.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Rook.White;
        Rook.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Rook.Black;
        Rook.initialize();
        return Rook;
      }.call(this);
      TwoDimensional.Queen = function () {
        class Queen extends TwoDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional.Queen';
          }
          static displayName() {
            return "Queen";
          }
        }
        ;
        Queen.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Queen.White;
        Queen.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.Queen.Black;
        Queen.initialize();
        return Queen;
      }.call(this);
      TwoDimensional.King = function () {
        class King extends TwoDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional.King';
          }
          static displayName() {
            return "King";
          }
        }
        ;
        King.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.King.White;
        King.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.TwoDimensional.King.Black;
        King.initialize();
        return King;
      }.call(this);
      return TwoDimensional;
    }.call(this);
    Chess.ThreeDimensional = function () {
      class ThreeDimensional extends LM.Content.FutureContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional';
        }
        static displayName() {
          return "3D";
        }
        static unlockInstructions() {
          return "Complete the Elements of art: form task to start the 3D chess project.";
        }
        static contents() {
          return [this.Pawn, this.Knight, this.Bishop, this.Rook, this.Queen, this.King];
        }
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ContentProgress({
            content: this,
            units: "chess pieces"
          });
        }
        status() {
          if (false) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      ThreeDimensional.initialize();
      ThreeDimensional.PieceType = function () {
        class PieceType extends Chess.PieceType {}
        ;
        PieceType.project = PAA.Pixeltosh.Programs.Chess.Project.ThreeDimensional;
        return PieceType;
      }.call(this);
      ThreeDimensional.Pawn = function () {
        class Pawn extends ThreeDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional.Pawn';
          }
          static displayName() {
            return "Pawn";
          }
        }
        ;
        Pawn.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Pawn.White;
        Pawn.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Pawn.Black;
        Pawn.initialize();
        return Pawn;
      }.call(this);
      ThreeDimensional.Knight = function () {
        class Knight extends ThreeDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional.Knight';
          }
          static displayName() {
            return "Knight";
          }
        }
        ;
        Knight.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Knight.White;
        Knight.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Knight.Black;
        Knight.initialize();
        return Knight;
      }.call(this);
      ThreeDimensional.Bishop = function () {
        class Bishop extends ThreeDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional.Bishop';
          }
          static displayName() {
            return "Bishop";
          }
        }
        ;
        Bishop.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Bishop.White;
        Bishop.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Bishop.Black;
        Bishop.initialize();
        return Bishop;
      }.call(this);
      ThreeDimensional.Rook = function () {
        class Rook extends ThreeDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional.Rook';
          }
          static displayName() {
            return "Rook";
          }
        }
        ;
        Rook.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Rook.White;
        Rook.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Rook.Black;
        Rook.initialize();
        return Rook;
      }.call(this);
      ThreeDimensional.Queen = function () {
        class Queen extends ThreeDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional.Queen';
          }
          static displayName() {
            return "Queen";
          }
        }
        ;
        Queen.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Queen.White;
        Queen.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.Queen.Black;
        Queen.initialize();
        return Queen;
      }.call(this);
      ThreeDimensional.King = function () {
        class King extends ThreeDimensional.PieceType {
          static id() {
            return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional.King';
          }
          static displayName() {
            return "King";
          }
        }
        ;
        King.whiteAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.King.White;
        King.blackAsset = PAA.Pixeltosh.Programs.Chess.Assets.ThreeDimensional.King.Black;
        King.initialize();
        return King;
      }.call(this);
      return ThreeDimensional;
    }.call(this);
    return Chess;
  }.call(this);
  Projects.PixelPaint = function () {
    class PixelPaint extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.PixelPaint';
      }
      static displayName() {
        return "PixelPaint";
      }
    }
    ;
    PixelPaint.initialize();
    return PixelPaint;
  }.call(this);
  Projects.CityBuilder = function () {
    class CityBuilder extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.CityBuilder';
      }
      static displayName() {
        return "City builder";
      }
    }
    ;
    CityBuilder.initialize();
    return CityBuilder;
  }.call(this);
  return Projects;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawingeditors.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/drawingeditors.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Content.DrawingEditors = function () {
  class DrawingEditors extends LM.Content.FutureContent {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingEditors';
    }
    static displayName() {
      return "Drawing editors";
    }
    static contents() {
      return [this.Easel, this.PixelPaint];
    }
  }
  ;
  DrawingEditors.initialize();
  DrawingEditors.Easel = function () {
    class Easel extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingEditors.Easel';
      }
      static displayName() {
        return "Easel";
      }
    }
    ;
    Easel.initialize();
    return Easel;
  }.call(this);
  DrawingEditors.PixelPaint = function () {
    class PixelPaint extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingEditors.PixelPaint';
      }
      static displayName() {
        return "PixelPaint";
      }
    }
    ;
    PixelPaint.initialize();
    return PixelPaint;
  }.call(this);
  return DrawingEditors;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"pinballmagazine":{"pinballmagazine.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/publications/pinballmagazine/pinbal //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA, i, lineNumber;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
if (Meteor.isClient) {
  for (lineNumber = i = 1; i <= 3; lineNumber = ++i) {
    PAA.Publication.Article.CustomClass.registerClass("pinballmagazine-cover-line pinballmagazine-cover-line-".concat(lineNumber));
  }
  PAA.Publication.Article.CustomClass.registerClass("pinballmagazine-lead-paragraph");
  PAA.Publication.Article.CustomClass.registerClass("pinballmagazine-lead-image-credit");
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"sixtyfoursquares":{"sixtyfoursquares.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-pixelartfundamentals/fundamentals/publications/sixtyfoursquares/sixty //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA, i, j, lineNumber;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares = function () {
  class SixtyFourSquares {
    static id() {
      return 'PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares';
    }
  }
  ;
  SixtyFourSquares.IssueIDs = {
    ArtOfTheBoard: "".concat(SixtyFourSquares.id(), ".ArtOfTheBoard")
  };
  return SixtyFourSquares;
}.call(this);
if (Meteor.isClient) {
  PAA.Publication.Article.CustomClass.registerClass("sixtyfoursquares-cover-specialeditiontitle");
  PAA.Publication.Article.CustomClass.registerClass("sixtyfoursquares-cover-specialeditiondescription");
  for (lineNumber = i = 1; i <= 3; lineNumber = ++i) {
    PAA.Publication.Article.CustomClass.registerClass("sixtyfoursquares-cover-article sixtyfoursquares-cover-article-".concat(lineNumber));
  }
  for (lineNumber = j = 1; j <= 4; lineNumber = ++j) {
    PAA.Publication.Article.CustomClass.registerClass("sixtyfoursquares-cover-line sixtyfoursquares-cover-line-".concat(lineNumber));
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/pixelartfundamentals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/scenes/apps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/scenes/systems.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/start/start.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/fundamentals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/tutorialsdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/challengesdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/apps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/pixeltoshprograms.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/pixeltoshfiles.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/workbench.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/musictapes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/publications.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/scenes/pico8cartridges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/goals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/elementsofart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/jaggies.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/simplification.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/size.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/pinball/pinball.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/pinball/assetstask.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/pinball/tasks.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/chess/chess.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/goals/chess/tasks.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/content.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/course.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/apps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/goals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/drawingtutorials.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/drawingchallenges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/projects.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/content/drawingeditors.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/publications/pinballmagazine/pinballmagazine.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-pixelartfundamentals/fundamentals/publications/sixtyfoursquares/sixtyfoursquares.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-learnmode-pixelartfundamentals", {
  PixelArtAcademy: PixelArtAcademy
});

})();
