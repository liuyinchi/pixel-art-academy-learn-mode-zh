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
var PixelArtAcademy = Package['retronator:pixelartacademy-pixelpad-notifications'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-learnmode-design":{"design.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/design.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Design = function () {
  class Design extends LOI.Adventure.Episode {
    // unlocked: boolean whether this episode's content is instantly available
    // invasionUnlocked: boolean whether the invasion project is instantly available
    static id() {
      return 'PixelArtAcademy.LearnMode.Design';
    }
    static fullName() {
      return "设计";
    }
    static chapters() {
      return [this.Fundamentals];
    }
    static startSection() {
      return this.Start;
    }
    static invasionEnabled() {
      if (LM.Design.state('invasionUnlocked')) {
        // Allow cheating.
        return true;
      }
      if (!LM.Design.Fundamentals.Goals.Invasion.activeOrCompleted()) {
        return false;
      }
      return LM.Design.Fundamentals.Goals.ShapeLanguage.completed();
    }
  }
  ;
  Design.initialize();
  return Design;
}.call(this);
if (Meteor.isServer) {
  LOI.initializePackage({
    id: 'retronator_pixelartacademy-learnmode-design',
    assets: Assets
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"start":{"start.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/start/start.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Design.Start = function () {
  class Start extends LOI.Adventure.Section {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Start';
    }
    static scenes() {
      return [];
    }
    static started() {
      return true;
    }
    static finished() {
      if (!LOI.adventureInitialized()) {
        return;
      }
      if (LM.Design.state('unlocked')) {
        // Allow cheating.
        return true;
      }

      // Design starts after the element of art shape lesson is completed.
      return PAA.Tutorials.Drawing.ElementsOfArt.Shape.completed();
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
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/fundamentals.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LM, LOI, PAA;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals = function () {
  class Fundamentals extends LM.Chapter {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals';
    }
    static fullName() {
      return "形状";
    }
    static number() {
      return 1;
    }
    static sections() {
      return [];
    }
    static scenes() {
      return [this.TutorialsDrawing, this.Workbench, this.Pico8Cartridges, this.PixeltoshFiles, this.Publications, this.Publications.Parts, this.Apps];
    }
    static courses() {
      return [LM.Design.Fundamentals.Content.Course];
    }
    constructor() {
      super(...arguments);

      // Create the invasion project when it is enabled.
      this._createInvasionProjectAutorun = Tracker.autorun(computation => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        if (!LM.Design.invasionEnabled()) {
          return;
        }
        if (PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId')) {
          return;
        }
        return PAA.Pico8.Cartridges.Invasion.Project.start();
      });
    }
    destroy() {
      super.destroy(...arguments);
      return this._createInvasionProjectAutorun.stop();
    }
  }
  ;
  Fundamentals.initialize();
  return Fundamentals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goals":{"goals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/goals/goals.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Goals = class Goals {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shapelanguage.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/goals/shapelanguage.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Goals.ShapeLanguage = function () {
  var Goal;
  class ShapeLanguage extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Goals.ShapeLanguage';
    }
    static displayName() {
      return "Shape language";
    }
    static chapter() {
      return LM.Design.Fundamentals;
    }
    static tasks() {
      return [this.Learn];
    }
    static finalTasks() {
      return [this.Learn];
    }
  }
  ;
  Goal = ShapeLanguage;
  ShapeLanguage.Learn = function () {
    class Learn extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Goals.ShapeLanguage.Learn';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "学习形状语言";
      }
      static instructions() {
        return "在绘画应用中，完成形状语言教程，了解基本形状传达的特征。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['shape language'];
      }
      static requiredInterests() {
        return ['shape'];
      }
      static studyPlanBuilding() {
        return 'SimCityResidential3';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.Design.ShapeLanguage.completed();
      }
    }
    ;
    Learn.initialize();
    return Learn;
  }.call(this);
  ShapeLanguage.initialize();
  return ShapeLanguage;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"invasion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/goals/invasion.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Goals.Invasion = function () {
  var Goal;
  class Invasion extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Goals.Invasion';
    }
    static displayName() {
      return "Invasion game";
    }
    static chapter() {
      return LM.Design.Fundamentals;
    }
    static tasks() {
      return [this.Start, this.Run, this.DrawDefender, this.DrawDefenderProjectile, this.DrawInvader, this.DrawInvaderProjectile, this.Play];
    }
    static finalTasks() {
      return [this.Play];
    }
  }
  ;
  Goal = Invasion;
  Invasion.Start = function () {
    class Start extends PAA.Learning.Task.Automatic {
      static id() {
        return "".concat(Goal.id(), ".Start");
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "开始入侵设计文档";
      }
      static instructions() {
        return "在 Pixeltosh 应用中，打开 Invasion 驱动器并打开入侵设计文档文件。";
      }
      static interests() {
        return ['game design'];
      }
      static requiredInterests() {
        return ['shape language'];
      }
      static studyPlanBuilding() {
        return 'SimCityIndustrial2';
      }
      static completedConditions() {
        var activeProjectId, project, ref;
        // Require an entity to be added to the design.
        if (!(activeProjectId = PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId'))) {
          return;
        }
        if (!(project = PAA.Practice.Project.documents.findOne(activeProjectId))) {
          return;
        }
        return (ref = project.design.entities) != null ? ref.length : void 0;
      }
    }
    ;
    Start.initialize();
    return Start;
  }.call(this);
  Invasion.Run = function () {
    class Run extends PAA.Learning.Task.Automatic {
      static id() {
        return "".concat(Goal.id(), ".Run");
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "运行入侵游戏卡带";
      }
      static instructions() {
        return "在 PICO-8 应用中，运行入侵的第一个版本。\n注意游戏中的第一个艺术资源，想象您希望它是什么样子。";
      }
      static interests() {
        return ['pico-8', 'video game'];
      }
      static predecessors() {
        return [Goal.Start];
      }
      static studyPlanBuilding() {
        return 'SimCityIndustrial4';
      }
      static completedConditions() {
        // Require the cartridge to have run.
        return PAA.Pico8.Cartridges.Invasion.state('cartridgeRan');
      }
      reset() {
        super.reset(...arguments);
        return PAA.Pico8.Cartridges.Invasion.state('cartridgeRan', false);
      }
    }
    ;
    Run.initialize();
    return Run;
  }.call(this);
  Invasion.Draw = class Draw extends PAA.Learning.Task.Automatic {
    static assetId() {
      throw new AE.NotImplementedException("Draw task has to specify which asset needs to be drawn.");
    }
    static goal() {
      return Goal;
    }
    static icon() {
      return PAA.Learning.Task.Icons.Drawing;
    }
    static completedConditions() {
      var asset, bitmap, project, projectId;
      if (!(projectId = PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId'))) {
        return;
      }
      if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
        return;
      }
      if (!(asset = _.find(project.assets, asset => {
        return asset.id === this.assetId();
      }))) {
        return;
      }
      if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
        return;
      }
      // We know the player has changed the bitmap if the history position is not zero.
      if (!bitmap.historyPosition) {
        return;
      }
      return true;
    }
  };
  Invasion.DrawDefender = function () {
    class DrawDefender extends Invasion.Draw {
      static id() {
        return "".concat(Goal.id(), ".DrawDefender");
      }
      static assetId() {
        return PAA.Pico8.Cartridges.Invasion.Defender.id();
      }
      static directive() {
        return "绘制防御者精灵图";
      }
      static instructions() {
        return "在入侵设计文档中添加防御者实体后，前往绘画应用完成玩家单位的精灵图。";
      }
      static predecessors() {
        return [Goal.Run];
      }
      static groupNumber() {
        return -1;
      }
      static studyPlanBuilding() {
        return 'SimCityOffice1';
      }
    }
    ;
    DrawDefender.initialize();
    return DrawDefender;
  }.call(this);
  Invasion.DrawProjectile = class DrawProjectile extends Invasion.Draw {
    static onActive() {
      super.onActive(...arguments);

      // Make sure we get a fresh start on the levels completed. We do this in this step
      // instead of the next since completedConditions can otherwise run before onActive.
      return PAA.Pico8.Cartridges.Invasion.state('highestLevelCompleted', null);
    }
  };
  Invasion.DrawDefenderProjectile = function () {
    class DrawDefenderProjectile extends Invasion.DrawProjectile {
      static id() {
        return "".concat(Goal.id(), ".DrawDefenderProjectile");
      }
      static assetId() {
        return PAA.Pico8.Cartridges.Invasion.DefenderProjectile.id();
      }
      static directive() {
        return "绘制防御者子弹精灵图";
      }
      static instructions() {
        return "在入侵设计文档中添加防御者子弹实体后，\n前往绘画应用完成您可以发射的子弹的精灵图。\n也可以选择更改爆炸效果。";
      }
      static predecessors() {
        return [Goal.DrawDefender];
      }
      static groupNumber() {
        return -1;
      }
      static studyPlanBuilding() {
        return 'SimCityCommercial4';
      }
    }
    ;
    DrawDefenderProjectile.initialize();
    return DrawDefenderProjectile;
  }.call(this);
  Invasion.DrawInvader = function () {
    class DrawInvader extends Invasion.Draw {
      static id() {
        return "".concat(Goal.id(), ".DrawInvader");
      }
      static assetId() {
        return PAA.Pico8.Cartridges.Invasion.Invader.id();
      }
      static directive() {
        return "绘制侵略者精灵图";
      }
      static instructions() {
        return "在入侵设计文档中添加侵略者实体后，\n前往绘画应用完成敌军的精灵图。";
      }
      static predecessors() {
        return [Goal.Run];
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCitySubway';
      }
    }
    ;
    DrawInvader.initialize();
    return DrawInvader;
  }.call(this);
  Invasion.DrawInvaderProjectile = function () {
    class DrawInvaderProjectile extends Invasion.DrawProjectile {
      static id() {
        return "".concat(Goal.id(), ".DrawInvaderProjectile");
      }
      static assetId() {
        return PAA.Pico8.Cartridges.Invasion.InvaderProjectile.id();
      }
      static directive() {
        return "绘制侵略者子弹精灵图";
      }
      static instructions() {
        return "在入侵设计文档中添加侵略者子弹实体后，\n前往绘画应用完成敌弹的精灵图。\n也可以选择更改爆炸效果。";
      }
      static predecessors() {
        return [Goal.DrawInvader];
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCityWaterPump';
      }
    }
    ;
    DrawInvaderProjectile.initialize();
    return DrawInvaderProjectile;
  }.call(this);
  Invasion.Play = function () {
    class Play extends PAA.Learning.Task.Automatic {
      static id() {
        return "".concat(Goal.id(), ".Play");
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "阻止入侵";
      }
      static instructions() {
        return "在防御者和侵略者相互射击的情况下，在 PICO-8 上运行入侵游戏，通过消灭所有侵略者来完成游戏的一个关卡。";
      }
      static predecessors() {
        return [Goal.DrawDefenderProjectile, Goal.DrawInvaderProjectile];
      }
      static studyPlanBuilding() {
        return 'SimCityResidential4';
      }
      static completedConditions() {
        // Require the player to complete level 1.
        return PAA.Pico8.Cartridges.Invasion.state('highestLevelCompleted') >= 1;
      }
      reset() {
        super.reset(...arguments);
        return PAA.Pico8.Cartridges.Invasion.state('highestLevelCompleted', null);
      }
    }
    ;
    Play.initialize();
    return Play;
  }.call(this);
  Invasion.initialize();
  return Invasion;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"scenes":{"tutorialsdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/scenes/tutorialsdrawing.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.TutorialsDrawing = function () {
  class TutorialsDrawing extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.TutorialsDrawing';
    }
    static location() {
      return PAA.Practice.Tutorials.Drawing;
    }
    destroy() {
      var ref, ref1;
      super.destroy(...arguments);
      if ((ref = this._archive) != null) {
        ref.destroy();
      }
      return (ref1 = this._tutorialShapeLanguage) != null ? ref1.destroy() : void 0;
    }
    things() {
      var location, things;
      things = [];
      if (LM.Design.Fundamentals.Goals.ShapeLanguage.addedAndAvailable()) {
        if (LM.Design.Fundamentals.Goals.ShapeLanguage.active()) {
          location = things;
        } else {
          if (this._archive == null) {
            this._archive = Tracker.nonreactive(() => {
              return new PAA.PixelPad.Apps.Drawing.Portfolio.Archive();
            });
          }

          // Reset previously added things.
          this._archive.things = [];

          // Place tutorials to the archive.
          things.push(this._archive);
          location = this._archive.things;
        }
        if (this._tutorialShapeLanguage == null) {
          this._tutorialShapeLanguage = Tracker.nonreactive(() => {
            return new PAA.Tutorials.Drawing.Design.ShapeLanguage();
          });
        }
        location.push(this._tutorialShapeLanguage);
      }
      return things;
    }
  }
  ;
  TutorialsDrawing.initialize();
  return TutorialsDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pico8cartridges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/scenes/pico8cartridges.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Pico8Cartridges = function () {
  class Pico8Cartridges extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Pico8Cartridges';
    }
    static location() {
      return PAA.Pico8.Cartridges;
    }
    constructor() {
      super(...arguments);
    }
    things() {
      return [LM.Design.Fundamentals.Goals.Invasion.Start.completed() ? PAA.Pico8.Cartridges.Invasion : void 0];
    }
  }
  ;
  Pico8Cartridges.initialize();
  return Pico8Cartridges;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workbench.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/scenes/workbench.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Workbench = function () {
  class Workbench extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Workbench';
    }
    static location() {
      return PAA.Practice.Project.Workbench;
    }
    destroy() {
      var ref;
      super.destroy(...arguments);
      return (ref = this._invasion) != null ? ref.destroy() : void 0;
    }
    things() {
      var projectId, ref, ref1, things;
      things = [];
      if (LM.Design.Fundamentals.Goals.Invasion.available()) {
        if (projectId = PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId')) {
          if (LM.Design.Fundamentals.Goals.Invasion.Start.completed()) {
            if (((ref = this._invasion) != null ? ref.projectId : void 0) !== projectId) {
              if ((ref1 = this._invasion) != null) {
                ref1.destroy();
              }
              this._invasion = Tracker.nonreactive(() => {
                return new PAA.Pico8.Cartridges.Invasion.Project(projectId);
              });
            }
            things.push(this._invasion);
          }
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

},"pixeltoshfiles.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/scenes/pixeltoshfiles.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.PixeltoshFiles = function () {
  class PixeltoshFiles extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.PixeltoshFiles';
    }
    static location() {
      return PAA.Pixeltosh.OS.FileSystem;
    }
    things() {
      var invasionEnabled;
      if (!this._invasionDisk) {
        this._invasionDisk = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pico8.Cartridges.Invasion.id(), ".Disk"),
          path: '入侵',
          type: PAA.Pixeltosh.OS.FileSystem.FileTypes.Disk
        });
        this._invasionDisk.options.disk = this._invasionDisk;
      }
      if (this._invasionDesignDocument == null) {
        this._invasionDesignDocument = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pico8.Cartridges.Invasion, ".DesignDocument"),
          path: '入侵/入侵设计文档',
          type: PAA.Pixeltosh.Programs.Writer.TextDocument,
          disk: this._invasionDisk,
          data: () => {
            return {
              documentComponentId: PAA.Pico8.Cartridges.Invasion.DesignDocument.id(),
              projectId: PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId')
            };
          }
        });
      }
      invasionEnabled = LM.Design.invasionEnabled();
      return [invasionEnabled ? this._invasionDisk : void 0, invasionEnabled ? this._invasionDesignDocument : void 0];
    }
  }
  ;
  PixeltoshFiles.initialize();
  return PixeltoshFiles;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/scenes/publications.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Publications = function () {
  class Publications extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Publications';
    }
    static location() {
      return PAA.Publication.Location;
    }
    static getChronoscopeIds() {
      var IssueIds, activeInvasionProjectId, content, i, invasionProject, j, len, len1, publication, publicationPart, publicationParts, publications, ref, ref1, ref2, referenceId, theme;
      publications = [];
      publicationParts = [];
      activeInvasionProjectId = PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId');
      if (activeInvasionProjectId) {
        if (invasionProject = PAA.Practice.Project.documents.findOne(activeInvasionProjectId)) {
          if (theme = (ref = invasionProject.design) != null ? ref.theme : void 0) {
            IssueIds = LM.Design.Fundamentals.Publications.Chronoscope.IssueIDs;
            if (IssueIds[theme]) {
              publications.push(IssueIds[theme]);
            } else if (theme === PAA.Pico8.Cartridges.Invasion.DesignDocument.Options.Themes.Everything) {
              publications.push(..._.values(IssueIds));
            }
          }
        }
      }
      for (i = 0, len = publications.length; i < len; i++) {
        referenceId = publications[i];
        if (!(publication = PAA.Publication.documents.findOne({
          referenceId
        }))) {
          continue;
        }
        ref1 = publication.contents;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          content = ref1[j];
          referenceId = content.part.referenceId;
          if (!(publicationPart = PAA.Publication.Part.documents.findOne({
            referenceId
          }))) {
            continue;
          }
          if (((ref2 = publicationPart.design) != null ? ref2.class : void 0) === 'unlocked') {
            publicationParts.push(referenceId);
          }
        }
      }
      return {
        publications,
        publicationParts
      };
    }
    things() {
      return this.constructor.getChronoscopeIds().publications;
    }
  }
  ;
  Publications.initialize();
  Publications.Parts = function () {
    class Parts extends LOI.Adventure.Scene {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.PublicationParts';
      }
      static location() {
        return PAA.Publication.Part.Location;
      }
      things() {
        return Publications.getChronoscopeIds().publicationParts;
      }
    }
    ;
    Parts.initialize();
    return Parts;
  }.call(this);
  return Publications;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"apps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/scenes/apps.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Apps = function () {
  class Apps extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Apps';
    }
    static location() {
      return PAA.PixelPad.Apps;
    }
    things() {
      return [];
    }
  }
  ;
  Apps.initialize();
  return Apps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"content":{"content.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/content/content.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Content = class Content {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"course.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/content/course.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Content.Course = function () {
  class Course extends LM.Content.Course {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Course';
    }
    static displayName() {
      return "Design fundamentals";
    }
    static description() {
      return "学习设计的主要概念和原则，有意识地塑造您的创作。";
    }
    static tags() {
      return [LM.Content.Tags.BaseGame, LM.Content.Tags.WIP];
    }
    static contents() {
      return [LM.Design.Fundamentals.Content.Goals, LM.Design.Fundamentals.Content.DrawingTutorials, LM.Design.Fundamentals.Content.Projects];
    }
  }
  ;
  Course.initialize();
  return Course;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/content/goals.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Content.Goals = function () {
  class Goals extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Goals';
    }
    static displayName() {
      return "Study goals";
    }
    static contents() {
      return [this.ShapeLanguage, this.Invasion];
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
  Goals.ShapeLanguage = function () {
    class ShapeLanguage extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Goals.ShapeLanguage';
      }
      static unlockInstructions() {
        return "完成艺术元素：形状教程以解锁形状语言学习目标。";
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
    ShapeLanguage.goalClass = LM.Design.Fundamentals.Goals.ShapeLanguage;
    ShapeLanguage.initialize();
    return ShapeLanguage;
  }.call(this);
  Goals.Invasion = function () {
    class Invasion extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Goals.Invasion';
      }
      static unlockInstructions() {
        return "完成形状语言教程以开始制作入侵游戏。";
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ManualProgress({
          content: this,
          units: "sprites",
          completed: () => {
            var ref;
            return (ref = this._goal()) != null ? ref.completed() : void 0;
          },
          requiredUnitsCount: 7,
          requiredCompletedUnitsCount: () => {
            var completedCount, drawingTaskClass, i, len, taskClasses;
            taskClasses = [LM.Design.Fundamentals.Goals.Invasion.Start, LM.Design.Fundamentals.Goals.Invasion.Run, LM.Design.Fundamentals.Goals.Invasion.DrawDefender, LM.Design.Fundamentals.Goals.Invasion.DrawDefenderProjectile, LM.Design.Fundamentals.Goals.Invasion.DrawInvader, LM.Design.Fundamentals.Goals.Invasion.DrawInvaderProjectile, LM.Design.Fundamentals.Goals.Invasion.Play];
            completedCount = 0;
            for (i = 0, len = taskClasses.length; i < len; i++) {
              drawingTaskClass = taskClasses[i];
              if (drawingTaskClass.completed()) {
                completedCount++;
              }
            }
            return completedCount;
          },
          unitsCount: () => {
            var ref;
            return (ref = this._goal()) != null ? ref.tasks().length : void 0;
          },
          completedUnitsCount: () => {
            var ref;
            return _.filter((ref = this._goal()) != null ? ref.tasks() : void 0, function (task) {
              return task.completed();
            }).length;
          }
        });
      }
      status() {
        if (LM.Design.Fundamentals.Goals.ShapeLanguage.completed()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Invasion.goalClass = LM.Design.Fundamentals.Goals.Invasion;
    Invasion.initialize();
    return Invasion;
  }.call(this);
  return Goals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawingtutorials.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/content/drawingtutorials.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Content.DrawingTutorials = function () {
  class DrawingTutorials extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.DrawingTutorials';
    }
    static displayName() {
      return "Drawing tutorials";
    }
    static tags() {
      return [LM.Content.Tags.WIP];
    }
    static contents() {
      return [this.ShapeLanguage, this.ColorSchemes, this.Composition];
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
  DrawingTutorials.ShapeLanguage = function () {
    class ShapeLanguage extends LM.Content.DrawingTutorialContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.DrawingTutorials.ShapeLanguage';
      }
    }
    ;
    ShapeLanguage.tutorialClass = PAA.Tutorials.Drawing.Design.ShapeLanguage;
    ShapeLanguage.initialize();
    return ShapeLanguage;
  }.call(this);
  DrawingTutorials.ColorSchemes = function () {
    class ColorSchemes extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.DrawingTutorials.ColorSchemes';
      }
      static displayName() {
        return "Color schemes";
      }
    }
    ;
    ColorSchemes.initialize();
    return ColorSchemes;
  }.call(this);
  DrawingTutorials.Composition = function () {
    class Composition extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.DrawingTutorials.Composition';
      }
      static displayName() {
        return "Composition";
      }
    }
    ;
    Composition.initialize();
    return Composition;
  }.call(this);
  return DrawingTutorials;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"projects.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/content/projects.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var InvasionDesignDocument,
  LM,
  PAA,
  PixelArtSoftware,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PixelArtSoftware = PAA.Challenges.Drawing.PixelArtSoftware;
InvasionDesignDocument = PAA.Pico8.Cartridges.Invasion.DesignDocument;
LM.Design.Fundamentals.Content.Projects = function () {
  class Projects extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects';
    }
    static displayName() {
      return "Projects";
    }
    static tags() {
      return [LM.Content.Tags.WIP];
    }
    static contents() {
      return [this.Invasion, this.Maze];
    }
    status() {
      return LM.Content.Status.Unlocked;
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
  }
  ;
  Projects.initialize();
  Projects.Invasion = function () {
    class Invasion extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion';
      }
      static displayName() {
        return "Invasion";
      }
      static contents() {
        return [this.Defender, this.Invader, this.DefenderProjectile, this.InvaderProjectile, this.DefenderProjectileExplosion, this.InvaderProjectileExplosion, this.Shield];
      }
      static unlockInstructions() {
        return "运行入侵 PICO-8 卡带以解锁入侵项目。";
      }
      constructor() {
        var countCompletedAssets;
        super(...arguments);
        countCompletedAssets = assetClasses => {
          var asset, assetClass, assetId, bitmap, completedCount, i, len, project, projectId;
          if (!(projectId = PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId'))) {
            return 0;
          }
          if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
            return 0;
          }
          completedCount = 0;
          for (i = 0, len = assetClasses.length; i < len; i++) {
            assetClass = assetClasses[i];
            assetId = assetClass.id();
            if (!(asset = _.find(project.assets, asset => {
              return asset.id === assetId;
            }))) {
              continue;
            }
            if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
              continue;
            }
            if (bitmap.historyPosition) {
              // We know the player has changed the bitmap if the history position is not zero.
              completedCount++;
            }
          }
          return completedCount;
        };
        this.progress = new LM.Content.Progress.ManualProgress({
          content: this,
          units: "sprites",
          completed: () => {
            return this.progress.requiredCompletedUnitsCount() === this.progress.requiredUnitsCount();
          },
          requiredUnitsCount: 4,
          requiredCompletedUnitsCount: () => {
            var requiredAssetClasses;
            requiredAssetClasses = [PAA.Pico8.Cartridges.Invasion.Defender, PAA.Pico8.Cartridges.Invasion.DefenderProjectile, PAA.Pico8.Cartridges.Invasion.Invader, PAA.Pico8.Cartridges.Invasion.InvaderProjectile];
            return countCompletedAssets(requiredAssetClasses);
          },
          unitsCount: 7,
          completedUnitsCount: () => {
            var allAssetClasses;
            allAssetClasses = [PAA.Pico8.Cartridges.Invasion.Defender, PAA.Pico8.Cartridges.Invasion.DefenderProjectile, PAA.Pico8.Cartridges.Invasion.DefenderProjectileExplosion, PAA.Pico8.Cartridges.Invasion.Invader, PAA.Pico8.Cartridges.Invasion.InvaderProjectile, PAA.Pico8.Cartridges.Invasion.InvaderProjectileExplosion, PAA.Pico8.Cartridges.Invasion.Shield];
            return countCompletedAssets(allAssetClasses);
          }
        });
      }
      status() {
        if (LM.Design.Fundamentals.Goals.Invasion.Run.completed()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Invasion.initialize();
    Invasion.AssetContent = function () {
      class AssetContent extends LM.Content.AssetContent {
        status() {
          var entities, project, projectId, ref;
          if (!(projectId = PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId'))) {
            return LM.Content.Status.Unavailable;
          }
          if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
            return LM.Content.Status.Unavailable;
          }
          if (!(entities = project.design.entities)) {
            return LM.Content.Status.Unavailable;
          }
          if (ref = this.constructor.unlockingEntity, indexOf.call(entities, ref) >= 0) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      AssetContent.unlockingEntity = null; // Override which entity unlocks the asset.

      return AssetContent;
    }.call(this);
    Invasion.Defender = function () {
      class Defender extends Invasion.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion.Defender';
        }
        static unlockInstructions() {
          return "在入侵设计文档中添加防御者实体以解锁防御者精灵图。";
        }
      }
      ;
      Defender.projectClass = PAA.Pico8.Cartridges.Invasion.Project;
      Defender.assetClass = PAA.Pico8.Cartridges.Invasion.Defender;
      Defender.unlockingEntity = InvasionDesignDocument.Options.Entities.Defender;
      Defender.initialize();
      return Defender;
    }.call(this);
    Invasion.Invader = function () {
      class Invader extends Invasion.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion.Invader';
        }
        static unlockInstructions() {
          return "在入侵设计文档中添加入侵者实体以解锁入侵者精灵图。";
        }
      }
      ;
      Invader.projectClass = PAA.Pico8.Cartridges.Invasion.Project;
      Invader.assetClass = PAA.Pico8.Cartridges.Invasion.Invader;
      Invader.unlockingEntity = InvasionDesignDocument.Options.Entities.Invader;
      Invader.initialize();
      return Invader;
    }.call(this);
    Invasion.DefenderProjectile = function () {
      class DefenderProjectile extends Invasion.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion.DefenderProjectile';
        }
        static unlockInstructions() {
          return "在入侵设计文档中添加防御者弹丸实体以解锁防御者弹丸精灵图。";
        }
      }
      ;
      DefenderProjectile.projectClass = PAA.Pico8.Cartridges.Invasion.Project;
      DefenderProjectile.assetClass = PAA.Pico8.Cartridges.Invasion.DefenderProjectile;
      DefenderProjectile.unlockingEntity = InvasionDesignDocument.Options.Entities.DefenderProjectile;
      DefenderProjectile.initialize();
      return DefenderProjectile;
    }.call(this);
    Invasion.InvaderProjectile = function () {
      class InvaderProjectile extends Invasion.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion.InvaderProjectile';
        }
        static unlockInstructions() {
          return "在入侵设计文档中添加入侵者弹丸实体以解锁入侵者弹丸精灵图。";
        }
      }
      ;
      InvaderProjectile.projectClass = PAA.Pico8.Cartridges.Invasion.Project;
      InvaderProjectile.assetClass = PAA.Pico8.Cartridges.Invasion.InvaderProjectile;
      InvaderProjectile.unlockingEntity = InvasionDesignDocument.Options.Entities.InvaderProjectile;
      InvaderProjectile.initialize();
      return InvaderProjectile;
    }.call(this);
    Invasion.DefenderProjectileExplosion = function () {
      class DefenderProjectileExplosion extends Invasion.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion.DefenderProjectileExplosion';
        }
        static unlockInstructions() {
          return "在入侵设计文档中添加防御者弹丸实体以解锁防御者弹丸爆炸精灵图。";
        }
      }
      ;
      DefenderProjectileExplosion.projectClass = PAA.Pico8.Cartridges.Invasion.Project;
      DefenderProjectileExplosion.assetClass = PAA.Pico8.Cartridges.Invasion.DefenderProjectileExplosion;
      DefenderProjectileExplosion.unlockingEntity = InvasionDesignDocument.Options.Entities.DefenderProjectile;
      DefenderProjectileExplosion.initialize();
      return DefenderProjectileExplosion;
    }.call(this);
    Invasion.InvaderProjectileExplosion = function () {
      class InvaderProjectileExplosion extends Invasion.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion.InvaderProjectileExplosion';
        }
        static unlockInstructions() {
          return "在入侵设计文档中添加入侵者弹丸实体以解锁入侵者弹丸爆炸精灵图。";
        }
      }
      ;
      InvaderProjectileExplosion.projectClass = PAA.Pico8.Cartridges.Invasion.Project;
      InvaderProjectileExplosion.assetClass = PAA.Pico8.Cartridges.Invasion.InvaderProjectileExplosion;
      InvaderProjectileExplosion.unlockingEntity = InvasionDesignDocument.Options.Entities.InvaderProjectile;
      InvaderProjectileExplosion.initialize();
      return InvaderProjectileExplosion;
    }.call(this);
    Invasion.Shield = function () {
      class Shield extends Invasion.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Invasion.Shield';
        }
        static unlockInstructions() {
          return "在入侵设计文档中添加护盾实体以解锁护盾精灵图。";
        }
      }
      ;
      Shield.projectClass = PAA.Pico8.Cartridges.Invasion.Project;
      Shield.assetClass = PAA.Pico8.Cartridges.Invasion.Shield;
      Shield.unlockingEntity = InvasionDesignDocument.Options.Entities.Shield;
      Shield.initialize();
      return Shield;
    }.call(this);
    return Invasion;
  }.call(this);
  Projects.Maze = function () {
    class Maze extends LM.Content.FutureContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Content.Projects.Maze';
      }
      static displayName() {
        return "Maze";
      }
    }
    ;
    Maze.initialize();
    return Maze;
  }.call(this);
  return Projects;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publications":{"publications.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/publications/publications.coffee                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
// Publications class is already added as a scene.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chronoscope":{"chronoscope.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-design/fundamentals/publications/chronoscope/chronoscope.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA, i, lineNumber;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Design.Fundamentals.Publications.Chronoscope = function () {
  class Chronoscope {
    static id() {
      return 'PixelArtAcademy.LearnMode.Design.Fundamentals.Publications.Chronoscope';
    }
  }
  ;
  Chronoscope.IssueIDs = {
    ScienceFiction: "".concat(Chronoscope.id(), ".ScienceFiction")
  };
  return Chronoscope;
}.call(this);
if (Meteor.isClient) {
  PAA.Publication.Article.CustomClass.registerClass("chronoscope-cover-specialeditiontitle");
  for (lineNumber = i = 1; i <= 2; lineNumber = ++i) {
    PAA.Publication.Article.CustomClass.registerClass("chronoscope-cover-line chronoscope-cover-line-".concat(lineNumber));
  }
  PAA.Publication.Article.CustomClass.registerClass("chronoscope-tableofcontents-imprint");
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

require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/design.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/start/start.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/fundamentals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/goals/goals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/goals/shapelanguage.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/goals/invasion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/scenes/tutorialsdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/scenes/pico8cartridges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/scenes/workbench.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/scenes/pixeltoshfiles.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/scenes/publications.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/scenes/apps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/content/content.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/content/course.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/content/goals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/content/drawingtutorials.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/content/projects.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/publications/publications.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-design/fundamentals/publications/chronoscope/chronoscope.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-learnmode-design", {
  PixelArtAcademy: PixelArtAcademy
});

})();
