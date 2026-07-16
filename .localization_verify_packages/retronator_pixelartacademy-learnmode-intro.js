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
var PixelArtAcademy = Package['retronator:pixelartacademy-learnmode'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-learnmode-intro":{"intro.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/intro.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Intro = function () {
  class Intro extends LOI.Adventure.Episode {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro';
    }
    static fullName() {
      return "像素艺术工具";
    }
    static chapters() {
      return [this.Tutorial];
    }
    static scenes() {
      return [this.PixelPad, this.Apps, this.Systems, this.Editors, this.ChallengesDrawing, this.TutorialsDrawing, this.Pico8Cartridges, this.Workbench];
    }
    static startSection() {
      return this.Start;
    }
    static pico8Enabled() {
      return LM.Intro.Tutorial.Goals.Snake.activeOrCompleted();
    }
  }
  ;
  Intro.initialize();
  return Intro;
}.call(this);
if (Meteor.isServer) {
  LOI.initializePackage({
    id: 'retronator_pixelartacademy-learnmode-intro',
    assets: Assets
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"scenes":{"pixelpad.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/scenes/pixelpad.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.PixelPad = function () {
  class PixelPad extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.PixelPad';
    }
    static location() {
      return LM.Locations.Play;
    }
    things() {
      return [LM.PixelPad];
    }
  }
  ;
  PixelPad.initialize();
  return PixelPad;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"apps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/scenes/apps.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Apps = function () {
  class Apps extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Apps';
    }
    static location() {
      return PAA.PixelPad.Apps;
    }
    things() {
      return [LM.Intro.Tutorial.Goals.ToDoTasks.completed() ? PAA.PixelPad.Apps.Drawing : void 0, LM.Intro.Tutorial.Goals.PixelArtSoftware.Basics.completed() ? PAA.PixelPad.Apps.StudyPlan : void 0, LM.Intro.pico8Enabled() ? PAA.PixelPad.Apps.Pico8 : void 0];
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
// packages/retronator_pixelartacademy-learnmode-intro/scenes/systems.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Systems = function () {
  class Systems extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Systems';
    }
    static location() {
      return PAA.PixelPad.Systems;
    }
    things() {
      return [PAA.PixelPad.Systems.ToDo, PAA.PixelPad.Systems.Notifications, PAA.PixelPad.Apps.Drawing.Editor.getEditor() instanceof PAA.PixelPad.Apps.Drawing.Editor.Desktop ? PAA.Tutorials.Drawing.Instructions.Desktop : void 0, PAA.PixelPad.Apps.StudyPlan.getApp() ? PAA.Tutorials.Planning.Instructions.StudyPlan : void 0];
    }
  }
  ;
  Systems.initialize();
  return Systems;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"editors.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/scenes/editors.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Editors = function () {
  class Editors extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Editors';
    }
    static location() {
      return PAA.PixelPad.Apps.Drawing.Editors;
    }
    constructor() {
      super(...arguments);
    }
    things() {
      return [PAA.PixelPad.Apps.Drawing.Editor.Desktop];
    }
  }
  ;
  Editors.initialize();
  return Editors;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"challengesdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/scenes/challengesdrawing.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.ChallengesDrawing = function () {
  class ChallengesDrawing extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.DrawingChallenges';
    }
    static location() {
      return PAA.Practice.Challenges.Drawing;
    }
    constructor() {
      super(...arguments);

      // Add/remove the reference selection asset to the copy reference challenge.
      this._referenceSelectionAutorun = Tracker.autorun(() => {
        var assets, assetsChanged, referenceSelection, referenceSelectionId, remainingAssetsCount;
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        assets = PAA.Challenges.Drawing.PixelArtSoftware.state('assets') || [];
        remainingAssetsCount = PAA.Challenges.Drawing.PixelArtSoftware.remainingCopyReferenceClasses().length;
        referenceSelectionId = PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.id();
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
          return PAA.Challenges.Drawing.PixelArtSoftware.state('assets', assets);
        });
      });
    }
    destroy() {
      var ref;
      super.destroy(...arguments);
      this._referenceSelectionAutorun.stop();
      return (ref = this._pixelArtSoftware) != null ? ref.destroy() : void 0;
    }
    things() {
      var things;
      things = [];
      if (LM.Intro.Tutorial.Goals.PixelArtSoftware.available()) {
        if (PAA.Tutorials.Drawing.PixelArtTools.Basics.completed()) {
          if (this._pixelArtSoftware == null) {
            this._pixelArtSoftware = Tracker.nonreactive(() => {
              return new PAA.Challenges.Drawing.PixelArtSoftware();
            });
          }
          things.push(this._pixelArtSoftware);
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

},"tutorialsdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/scenes/tutorialsdrawing.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.TutorialsDrawing = function () {
  class TutorialsDrawing extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.TutorialsDrawing';
    }
    static location() {
      return PAA.Practice.Tutorials.Drawing;
    }
    destroy() {
      var ref, ref1, ref2, ref3, ref4;
      super.destroy(...arguments);
      if ((ref = this._archive) != null) {
        ref.destroy();
      }
      if ((ref1 = this._pixelArtTools) != null) {
        ref1.destroy();
      }
      if ((ref2 = this._tutorialBasics) != null) {
        ref2.destroy();
      }
      if ((ref3 = this._tutorialColors) != null) {
        ref3.destroy();
      }
      return (ref4 = this._tutorialHelpers) != null ? ref4.destroy() : void 0;
    }
    things() {
      var location, things;
      things = [];
      if (LM.Intro.Tutorial.Goals.PixelArtSoftware.addedAndAvailable()) {
        if (LM.Intro.Tutorial.Goals.PixelArtSoftware.active()) {
          location = things;
        } else {
          // Prepare portfolio folders.
          if (this._pixelArtTools == null) {
            this._pixelArtTools = Tracker.nonreactive(() => {
              return new this.constructor.PixelArtTools();
            });
          }
          if (this._archive == null) {
            this._archive = Tracker.nonreactive(() => {
              return new PAA.PixelPad.Apps.Drawing.Portfolio.Archive();
            });
          }

          // Reset previously added things.
          this._pixelArtTools.things = [];
          this._archive.things = [this._pixelArtTools];

          // Place tutorials to the archive.
          things.push(this._archive);
          location = this._pixelArtTools.things;
        }

        // Player needs the Desktop editor selected for the tutorial to display.
        if (PAA.PixelPad.Apps.Drawing.state('editorId') === PAA.PixelPad.Apps.Drawing.Editor.Desktop.id()) {
          if (this._tutorialBasics == null) {
            this._tutorialBasics = Tracker.nonreactive(() => {
              return new PAA.Tutorials.Drawing.PixelArtTools.Basics();
            });
          }
          location.push(this._tutorialBasics);
          if (this._tutorialBasics.completed()) {
            if (this._tutorialColors == null) {
              this._tutorialColors = Tracker.nonreactive(() => {
                return new PAA.Tutorials.Drawing.PixelArtTools.Colors();
              });
            }
            if (this._tutorialHelpers == null) {
              this._tutorialHelpers = Tracker.nonreactive(() => {
                return new PAA.Tutorials.Drawing.PixelArtTools.Helpers();
              });
            }
            location.push(this._tutorialColors, this._tutorialHelpers);
          }
        }
      }
      return things;
    }
  }
  ;
  TutorialsDrawing.initialize();
  TutorialsDrawing.PixelArtTools = function () {
    class PixelArtTools extends PAA.PixelPad.Apps.Drawing.Portfolio.Folder {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.TutorialsDrawing.PixelArtTools';
      }
      static displayName() {
        return "Pixel art tools";
      }
    }
    ;
    PixelArtTools.initialize();
    return PixelArtTools;
  }.call(this);
  return TutorialsDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pico8cartridges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/scenes/pico8cartridges.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Pico8Cartridges = function () {
  class Pico8Cartridges extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Pico8Cartridges';
    }
    static location() {
      return PAA.Pico8.Cartridges;
    }
    constructor() {
      super(...arguments);
    }
    things() {
      return [LM.Intro.pico8Enabled() ? PAA.Pico8.Cartridges.Snake : void 0];
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
// packages/retronator_pixelartacademy-learnmode-intro/scenes/workbench.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Workbench = function () {
  class Workbench extends LOI.Adventure.Scene {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Workbench';
    }
    static location() {
      return PAA.Practice.Project.Workbench;
    }
    destroy() {
      var ref;
      super.destroy(...arguments);
      return (ref = this._snake) != null ? ref.destroy() : void 0;
    }
    things() {
      var projectId, ref, ref1, things;
      things = [];
      if (LM.Intro.Tutorial.Goals.Snake.available()) {
        if (projectId = PAA.Pico8.Cartridges.Snake.Project.state('activeProjectId')) {
          if (((ref = this._snake) != null ? ref.projecId : void 0) !== projectId) {
            if ((ref1 = this._snake) != null) {
              ref1.destroy();
            }
            this._snake = Tracker.nonreactive(() => {
              return new PAA.Pico8.Cartridges.Snake.Project(projectId);
            });
          }
          things.push(this._snake);
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

}},"start":{"start.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/start/start.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Start = function () {
  class Start extends LOI.Adventure.Section {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Start';
    }
    static scenes() {
      return [];
    }
    static started() {
      return true;
    }
    static finished() {
      return true;
    }
  }
  ;
  Start.initialize();
  return Start;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tutorial":{"tutorial.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/tutorial.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial = function () {
  class Tutorial extends LM.Chapter {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial';
    }
    static fullName() {
      return "教程";
    }
    static number() {
      return 1;
    }
    static sections() {
      return [];
    }
    static courses() {
      return [LM.Intro.Tutorial.Content.Course];
    }
    constructor() {
      super(...arguments);

      // Automatically select the Desktop editor.
      Tracker.autorun(computation => {
        if (PAA.PixelPad.Apps.Drawing.state('editorId')) {
          computation.stop();
          return;
        }
        return PAA.PixelPad.Apps.Drawing.state('editorId', PAA.PixelPad.Apps.Drawing.Editor.Desktop.id());
      });
      // Add intro goals to the Study Plan app.
      this._initializeStudyPlanAutorun = Tracker.autorun(computation => {
        var pixelArtSoftwareId, toDoTasksId;
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        if (PAA.PixelPad.Apps.StudyPlan.state('goals')) {
          return;
        }
        toDoTasksId = LM.Intro.Tutorial.Goals.ToDoTasks.id();
        pixelArtSoftwareId = LM.Intro.Tutorial.Goals.PixelArtSoftware.id();
        return PAA.PixelPad.Apps.StudyPlan.state.set({
          goals: {
            ["".concat(toDoTasksId)]: {
              connections: [{
                goalId: pixelArtSoftwareId,
                direction: PAA.PixelPad.Apps.StudyPlan.GoalConnectionDirections.Forward
              }]
            },
            ["".concat(pixelArtSoftwareId)]: {}
          },
          camera: {
            scale: 1,
            origin: {
              x: 100,
              y: 0
            }
          }
        });
      });

      // Create the snake project when the play task has been completed.
      this.snakePlayTask = this.getTask(LM.Intro.Tutorial.Goals.Snake.Play);
      this.snakeDrawTask = this.getTask(LM.Intro.Tutorial.Goals.Snake.Draw);
      this._createSnakeProjectAutorun = Tracker.autorun(async computation => {
        if (!this.snakePlayTask.completed()) {
          return;
        }
        if (PAA.Pico8.Cartridges.Snake.Project.state('activeProjectId')) {
          return;
        }
        if (this.snakeDrawTask.completed()) {
          return;
        }
        await PAA.Pico8.Cartridges.Snake.Project.start();

        // Reset high score to force replay.
        return PAA.Pico8.Cartridges.Snake.state('highScore', 0);
      });
    }
    destroy() {
      super.destroy(...arguments);
      this._initializeStudyPlanAutorun.stop();
      return this._createSnakeProjectAutorun.stop();
    }
    finished() {
      // Tutorial ends when you complete the snake game goal.
      return this.getGoal(LM.Intro.Tutorial.Goals.Snake).completed() || false;
    }
  }
  ;
  Tutorial.initialize();
  return Tutorial;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goals":{"goals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/goals/goals.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Goals = class Goals {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"todotasks.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/goals/todotasks.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Goals.ToDoTasks = function () {
  var Goal;
  class ToDoTasks extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.ToDoTasks';
    }
    static displayName() {
      return "To-do tasks";
    }
    static chapter() {
      return LM.Intro.Tutorial;
    }
    static tasks() {
      return [this.OpenInstructions];
    }
    static finalTasks() {
      return [this.OpenInstructions];
    }
  }
  ;
  Goal = ToDoTasks;
  ToDoTasks.OpenInstructions = function () {
    var Task;
    class OpenInstructions extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.ToDoTasks.OpenInstructions';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "点击此处阅读任务说明";
      }
      static instructions() {
        return "这个记事本将跟踪您当前的任务。\n您随时可以点击某个任务来了解如何完成它。\n\n点击箭头返回任务列表。";
      }
      static studyPlanDirective() {
        return "了解待办任务";
      }
      static instructions() {
        return "主屏幕上的记事本将跟踪您当前的任务。\n您随时可以点击某个任务来了解如何完成它。";
      }
      static interests() {
        return ['to-do tasks'];
      }
      static studyPlanBuilding() {
        return 'SimCityResidential1';
      }
      constructor() {
        super(...arguments);
        this._instructionsWereOpened = false;
        this._instructionsWereOpenedAndClosed = new ReactiveField(false);
        this.startInstructionsAutorun();
      }
      startInstructionsAutorun() {
        return this._instructionsAutorun = Tracker.autorun(computation => {
          var pixelPad, selectedTask, toDoSystem;
          if (!LOI.adventure.ready()) {
            return;
          }
          if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
            return;
          }
          if (!(toDoSystem = _.find(pixelPad.os.currentSystems(), system => {
            return system instanceof PAA.PixelPad.Systems.ToDo;
          }))) {
            return;
          }
          if (!toDoSystem.isCreated()) {
            return;
          }
          selectedTask = toDoSystem.selectedTask();
          if (selectedTask) {
            // Wait for instructions to be opened.
            this._instructionsWereOpened = true;
          }

          // Wait for instructions to close after they've been opened.
          if (this._instructionsWereOpened && !selectedTask) {
            this._instructionsWereOpenedAndClosed(true);
            return computation.stop();
          }
        });
      }
      destroy() {
        super.destroy(...arguments);
        return this._instructionsAutorun.stop();
      }
      completedConditions() {
        return this._instructionsWereOpenedAndClosed();
      }
      activeNotificationId() {
        return this.constructor.ActiveNotification.id();
      }
      reset() {
        super.reset(...arguments);
        this._instructionsWereOpened = false;
        this._instructionsWereOpenedAndClosed(false);
        return this.startInstructionsAutorun();
      }
    }
    ;
    OpenInstructions.initialize();
    Task = OpenInstructions;
    OpenInstructions.ActiveNotification = function () {
      class ActiveNotification extends PAA.PixelPad.Systems.Notifications.Notification {
        static id() {
          return "".concat(Task.id(), ".ActiveNotification");
        }
        static message() {
          return "点击下方的笔记本查看您的待办任务。\n\n随时点击我来听听我的想法！";
        }
        static priority() {
          return 1;
        }
      }
      ;
      ActiveNotification.initialize();
      return ActiveNotification;
    }.call(this);
    return OpenInstructions;
  }.call(this);
  ToDoTasks.initialize();
  return ToDoTasks;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelartsoftware.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/goals/pixelartsoftware.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Goals.PixelArtSoftware = function () {
  var Goal;
  class PixelArtSoftware extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware';
    }
    static displayName() {
      return "Pixel art software";
    }
    static chapter() {
      return LM.Intro.Tutorial;
    }
    static tasks() {
      return [this.Basics, this.CopyReference, this.ColorTools, this.Helpers];
    }
    static finalTasks() {
      return [this.CopyReference];
    }
  }
  ;
  Goal = PixelArtSoftware;

  // Main path
  PixelArtSoftware.Basics = function () {
    class Basics extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.Basics';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "学习基础像素艺术工具";
      }
      static instructions() {
        return "在绘画应用中，完成基础教程，\n学习如何使用基本的绘画工具。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static requiredInterests() {
        return ['to-do tasks'];
      }
      static studyPlanBuilding() {
        return 'SimCityResidential2';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtTools.Basics.completed();
      }
    }
    ;
    Basics.initialize();
    return Basics;
  }.call(this);
  PixelArtSoftware.Helpers = function () {
    class Helpers extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.Helpers';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解辅助工具";
      }
      static instructions() {
        return "在绘画应用中，完成辅助工具教程，\n熟悉缩放和画线等额外工具。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Basics];
      }
      static groupNumber() {
        return -1;
      }
      static studyPlanBuilding() {
        return 'SimCityCommercial2';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtTools.Helpers.completed();
      }
    }
    ;
    Helpers.initialize();
    return Helpers;
  }.call(this);
  PixelArtSoftware.ColorTools = function () {
    class ColorTools extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.ColorTools';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "了解切换颜色";
      }
      static instructions() {
        return "在绘画应用中，完成颜色教程，\n学习如何在不同颜色之间切换。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Basics];
      }
      static groupNumber() {
        return 1;
      }
      static studyPlanBuilding() {
        return 'SimCityIndustrial3';
      }
      static completedConditions() {
        return PAA.Tutorials.Drawing.PixelArtTools.Colors.completed();
      }
    }
    ;
    ColorTools.initialize();
    return ColorTools;
  }.call(this);
  PixelArtSoftware.CopyReference = function () {
    var Task;
    class CopyReference extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.CopyReference';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "完成像素艺术软件挑战";
      }
      static instructions() {
        return "在绘画应用的挑战部分，选择一个像素艺术\n精灵图并复制它，以展示您已掌握像素艺术软件的使用。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static interests() {
        return ['pixel art software'];
      }
      static predecessors() {
        return [Goal.Basics, Goal.Helpers, Goal.ColorTools];
      }
      static predecessorsCompleteType() {
        return this.PredecessorsCompleteTypes.Any;
      }
      static studyPlanBuilding() {
        return 'SimCityCommercial1';
      }
      static completedConditions() {
        return PAA.Challenges.Drawing.PixelArtSoftware.completed();
      }
      activeNotificationId() {
        return this.constructor.ActiveNotification.id();
      }
    }
    ;
    CopyReference.initialize();
    Task = CopyReference;
    CopyReference.ActiveNotification = function () {
      class ActiveNotification extends PAA.PixelPad.Systems.Notifications.Notification {
        static id() {
          return "".concat(Task.id(), ".ActiveNotification");
        }
        static message() {
          return "您可以按任意顺序完成待办任务！\n\n使用学习计划来探索您的选择。";
        }
        static displayStyle() {
          return this.DisplayStyles.Always;
        }
      }
      ;
      ActiveNotification.initialize();
      return ActiveNotification;
    }.call(this);
    return CopyReference;
  }.call(this);
  PixelArtSoftware.initialize();
  return PixelArtSoftware;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"snake.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/goals/snake.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Goals.Snake = function () {
  var Goal;
  class Snake extends PAA.Learning.Goal {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.Snake';
    }
    static displayName() {
      return "Snake game";
    }
    static chapter() {
      return LM.Intro.Tutorial;
    }
    reset() {
      PAA.Pico8.Cartridges.state('Snake', null);
      return super.reset(...arguments);
    }
    static tasks() {
      return [this.Play, this.Draw, this.PlayAgain];
    }
    static finalTasks() {
      return [this.PlayAgain];
    }
  }
  ;
  Goal = Snake;
  Snake.Play = function () {
    class Play extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.Snake.Play';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "玩游戏";
      }
      static instructions() {
        return "在 PICO-8 应用中，尝试玩贪吃蛇游戏。注意包含的艺术资源（绿色的蛇和棕色的食物）。\n获得一些分数以继续。";
      }
      static interests() {
        return ['pico-8', 'video game'];
      }
      static requiredInterests() {
        return ['pixel art software'];
      }
      static studyPlanBuilding() {
        return 'SimCityIndustrial1';
      }
      static completedConditions() {
        // Require score of 1 or higher. Since we reset the high score when the
        // snake project is created, we also keep this task completed based on that.
        return PAA.Pico8.Cartridges.Snake.state('highScore') >= 1 || PAA.Pico8.Cartridges.Snake.Project.state('activeProjectId');
      }
    }
    ;
    Play.initialize();
    return Play;
  }.call(this);
  Snake.Draw = function () {
    class Draw extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.Snake.Draw';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "绘制贪吃蛇精灵图";
      }
      static instructions() {
        return "在绘画应用的项目部分找到贪吃蛇的艺术资源。\n重绘蛇身和食物的精灵图。";
      }
      static icon() {
        return PAA.Learning.Task.Icons.Drawing;
      }
      static predecessors() {
        return [Goal.Play];
      }
      static studyPlanBuilding() {
        return 'SimCityCommercial4';
      }
      static completedConditions() {
        var asset, bitmap, i, len, project, projectId, ref;
        if (!(projectId = PAA.Pico8.Cartridges.Snake.Project.state('activeProjectId'))) {
          return;
        }
        if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
          return;
        }
        ref = project.assets;
        for (i = 0, len = ref.length; i < len; i++) {
          asset = ref[i];
          if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
            return;
          }
          // We know the player has changed the bitmap if the history position is not zero.
          if (!bitmap.historyPosition) {
            return;
          }
        }
        return true;
      }
      onActiveDisplayed() {
        // Reset high score again to force replay, in case the player continued to play the game after the first time.
        return PAA.Pico8.Cartridges.Snake.state('highScore', 0);
      }
    }
    ;
    Draw.initialize();
    return Draw;
  }.call(this);
  Snake.PlayAgain = function () {
    class PlayAgain extends PAA.Learning.Task.Automatic {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Goals.Snake.PlayAgain';
      }
      static goal() {
        return Goal;
      }
      static directive() {
        return "查看精灵图效果";
      }
      static instructions() {
        return "替换游戏精灵图后，再次运行 PICO-8，看看您的艺术作品在游戏中是什么样子。进行任何更新直到\n您满意。获得更多分数以完成项目。";
      }
      static interests() {
        return ['Learn Mode tutorial project'];
      }
      static predecessors() {
        return [Goal.Draw];
      }
      static studyPlanBuilding() {
        return 'TransportTycoonCinema';
      }
      static completedConditions() {
        return PAA.Pico8.Cartridges.Snake.state('highScore') >= 1;
      }
    }
    ;
    PlayAgain.initialize();
    return PlayAgain;
  }.call(this);
  Snake.initialize();
  return Snake;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"content":{"content.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/content/content.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Content = class Content {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"course.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/content/course.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Content.Course = function () {
  class Course extends LM.Content.Course {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Course';
    }
    static displayName() {
      return "Pixel art tools";
    }
    static description() {
      return "学习基本的像素艺术工具并为您的第一个游戏创作艺术。";
    }
    static tags() {
      return [LM.Content.Tags.Free];
    }
    static contents() {
      return [LM.Intro.Tutorial.Content.Goals, LM.Intro.Tutorial.Content.DrawingTutorials, LM.Intro.Tutorial.Content.DrawingChallenges, LM.Intro.Tutorial.Content.Projects, LM.Intro.Tutorial.Content.Apps];
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
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/content/apps.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Content.Apps = function () {
  class Apps extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Apps';
    }
    static displayName() {
      return "Apps";
    }
    static unlockInstructions() {
      return "学习如何使用待办任务来解锁应用。";
    }
    static contents() {
      return [this.Drawing, this.Pico8];
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this,
        units: "apps"
      });
    }
    status() {
      var toDoTasksGoal;
      toDoTasksGoal = PAA.Learning.Goal.getAdventureInstanceForId(LM.Intro.Tutorial.Goals.ToDoTasks.id());
      if (toDoTasksGoal.completed()) {
        return this.constructor.Status.Unlocked;
      } else {
        return this.constructor.Status.Locked;
      }
    }
  }
  ;
  Apps.initialize();
  Apps.Drawing = function () {
    class Drawing extends LM.Content.AppContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Apps.Drawing';
      }
      status() {
        return LM.Content.Status.Unlocked;
      }
    }
    ;
    Drawing.appClass = PAA.PixelPad.Apps.Drawing;
    Drawing.initialize();
    return Drawing;
  }.call(this);
  Apps.Pico8 = function () {
    class Pico8 extends LM.Content.AppContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Apps.Pico8';
      }
      static unlockInstructions() {
        return "完成像素画软件挑战以解锁 PICO-8 应用。";
      }
      status() {
        var pixelArtSoftwareGoal;
        pixelArtSoftwareGoal = PAA.Learning.Goal.getAdventureInstanceForId(LM.Intro.Tutorial.Goals.PixelArtSoftware.id());
        if (pixelArtSoftwareGoal.completed()) {
          return this.constructor.Status.Unlocked;
        } else {
          return this.constructor.Status.Locked;
        }
      }
    }
    ;
    Pico8.appClass = PAA.PixelPad.Apps.Pico8;
    Pico8.initialize();
    return Pico8;
  }.call(this);
  return Apps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/content/goals.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Content.Goals = function () {
  class Goals extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Goals';
    }
    static displayName() {
      return "Study goals";
    }
    static unlockInstructions() {
      return "学习如何使用待办任务来解锁学习目标。";
    }
    static contents() {
      return [this.PixelArtSoftware, this.Snake];
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
      var toDoTasksGoal;
      toDoTasksGoal = PAA.Learning.Goal.getAdventureInstanceForId(LM.Intro.Tutorial.Goals.ToDoTasks.id());
      if (toDoTasksGoal.completed()) {
        return this.constructor.Status.Unlocked;
      } else {
        return this.constructor.Status.Locked;
      }
    }
  }
  ;
  Goals.initialize();
  Goals.Snake = function () {
    class Snake extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Goals.Snake';
      }
      static unlockInstructions() {
        return "完成像素画软件挑战以解锁贪吃蛇游戏学习目标。";
      }
      status() {
        var pixelArtSoftwareGoal;
        pixelArtSoftwareGoal = PAA.Learning.Goal.getAdventureInstanceForId(LM.Intro.Tutorial.Goals.PixelArtSoftware.id());
        if (pixelArtSoftwareGoal.completed()) {
          return this.constructor.Status.Unlocked;
        } else {
          return this.constructor.Status.Locked;
        }
      }
    }
    ;
    Snake.goalClass = LM.Intro.Tutorial.Goals.Snake;
    Snake.initialize();
    return Snake;
  }.call(this);
  Goals.PixelArtSoftware = function () {
    class PixelArtSoftware extends LM.Content.GoalContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Goals.PixelArtSoftware';
      }
    }
    ;
    PixelArtSoftware.goalClass = LM.Intro.Tutorial.Goals.PixelArtSoftware;
    PixelArtSoftware.initialize();
    return PixelArtSoftware;
  }.call(this);
  return Goals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawingtutorials.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/content/drawingtutorials.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Intro.Tutorial.Content.DrawingTutorials = function () {
  class DrawingTutorials extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingTutorials';
    }
    static displayName() {
      return "Drawing tutorials";
    }
    static unlockInstructions() {
      return "学习如何使用待办任务来解锁绘画教程。";
    }
    static contents() {
      return [this.Basics, this.Colors, this.Helpers];
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
      var toDoTasksGoal;
      toDoTasksGoal = PAA.Learning.Goal.getAdventureInstanceForId(LM.Intro.Tutorial.Goals.ToDoTasks.id());
      if (toDoTasksGoal.completed()) {
        return this.constructor.Status.Unlocked;
      } else {
        return this.constructor.Status.Locked;
      }
    }
  }
  ;
  DrawingTutorials.initialize();
  DrawingTutorials.Basics = function () {
    class Basics extends LM.Content.DrawingTutorialContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingTutorials.Basics';
      }
    }
    ;
    Basics.tutorialClass = PAA.Tutorials.Drawing.PixelArtTools.Basics;
    Basics.initialize();
    return Basics;
  }.call(this);
  DrawingTutorials.Colors = function () {
    class Colors extends LM.Content.DrawingTutorialContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingTutorials.Colors';
      }
      static unlockInstructions() {
        return "完成基础教程以解锁颜色教程。";
      }
      status() {
        if (!PAA.Tutorials.Drawing.PixelArtTools.Basics.completed()) {
          return LM.Content.Status.Locked;
        }
        return super.status(...arguments);
      }
    }
    ;
    Colors.tutorialClass = PAA.Tutorials.Drawing.PixelArtTools.Colors;
    Colors.initialize();
    return Colors;
  }.call(this);
  DrawingTutorials.Helpers = function () {
    class Helpers extends LM.Content.DrawingTutorialContent {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingTutorials.Helpers';
      }
      static unlockInstructions() {
        return "完成基础教程以解锁辅助工具教程。";
      }
      status() {
        if (!PAA.Tutorials.Drawing.PixelArtTools.Basics.completed()) {
          return LM.Content.Status.Locked;
        }
        return super.status(...arguments);
      }
    }
    ;
    Helpers.tutorialClass = PAA.Tutorials.Drawing.PixelArtTools.Helpers;
    Helpers.initialize();
    return Helpers;
  }.call(this);
  return DrawingTutorials;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawingchallenges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/content/drawingchallenges.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA, PixelArtSoftware;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PixelArtSoftware = PAA.Challenges.Drawing.PixelArtSoftware;
LM.Intro.Tutorial.Content.DrawingChallenges = function () {
  class DrawingChallenges extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingChallenges';
    }
    static displayName() {
      return "Drawing challenges";
    }
    static unlockInstructions() {
      return "完成像素画工具：基础教程以解锁绘画挑战。";
    }
    static contents() {
      return [this.CopyReference];
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this,
        weight: 0.1,
        totalUnits: "artworks",
        totalRecursive: true
      });
    }
    status() {
      if (PAA.Tutorials.Drawing.PixelArtTools.Basics.completed()) {
        return LM.Content.Status.Unlocked;
      } else {
        return LM.Content.Status.Locked;
      }
    }
  }
  ;
  DrawingChallenges.initialize();
  DrawingChallenges.CopyReference = function () {
    class CopyReference extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingChallenges.CopyReference';
      }
      static displayName() {
        return "Copy a reference";
      }
      static contents() {
        return [this.SmallMonochrome, this.SmallColored, this.BigMonochrome, this.BigColored];
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ManualProgress({
          content: this,
          units: "sprites",
          completed: () => {
            return PixelArtSoftware.completed();
          },
          unitsCount: () => {
            return _.values(PixelArtSoftware.copyReferenceClasses).length;
          },
          completedUnitsCount: () => {
            var assets;
            assets = PixelArtSoftware.state('assets') || [];
            return _.filter(assets, asset => {
              return asset.completed;
            }).length;
          },
          requiredUnitsCount: () => {
            return 1;
          }
        });
      }
      status() {
        return LM.Content.Status.Unlocked;
      }
    }
    ;
    CopyReference.initialize();
    CopyReference.SpritesGroup = function () {
      class SpritesGroup extends LM.Content {
        constructor() {
          super(...arguments);
          this.progress = new LM.Content.Progress.ManualProgress({
            content: this,
            units: "sprites",
            completed: () => {
              return this.progress.completedUnitsCount() >= 1;
            },
            unitsCount: () => {
              var id;
              return function () {
                var results;
                results = [];
                for (id in PixelArtSoftware.copyReferenceClasses) {
                  if (this._assetBelongsToGroup(id)) {
                    results.push(id);
                  }
                }
                return results;
              }.call(this).length;
            },
            completedUnitsCount: () => {
              var assets;
              assets = PixelArtSoftware.state('assets') || [];
              return _.filter(assets, asset => {
                return this._assetBelongsToGroup(asset.id) && asset.completed;
              }).length;
            },
            requiredUnitsCount: () => {
              return 1;
            }
          });
        }
        _assetBelongsToGroup(assetId) {
          return _.last(assetId.split('.')).substring(0, 2) === this.constructor.prefixFilter;
        }
      }
      ;
      SpritesGroup.prefixFilter = null; // Override with the class name prefix that defines this group.

      return SpritesGroup;
    }.call(this);
    CopyReference.SmallMonochrome = function () {
      class SmallMonochrome extends CopyReference.SpritesGroup {
        static id() {
          return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingChallenges.CopyReference.SmallMonochrome';
        }
        static displayName() {
          return "Small monochrome sprites";
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
      }
      ;
      SmallMonochrome.initialize();
      SmallMonochrome.prefixFilter = 'MS';
      return SmallMonochrome;
    }.call(this);
    CopyReference.SmallColored = function () {
      class SmallColored extends CopyReference.SpritesGroup {
        static id() {
          return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingChallenges.CopyReference.SmallColored';
        }
        static displayName() {
          return "Small colored sprites";
        }
        static unlockInstructions() {
          return "完成颜色教程以解锁彩色精灵图。";
        }
        status() {
          if (PAA.Tutorials.Drawing.PixelArtTools.Colors.completed()) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      SmallColored.initialize();
      SmallColored.prefixFilter = 'CS';
      return SmallColored;
    }.call(this);
    CopyReference.BigMonochrome = function () {
      class BigMonochrome extends CopyReference.SpritesGroup {
        static id() {
          return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingChallenges.CopyReference.BigMonochrome';
        }
        static displayName() {
          return "Big monochrome sprites";
        }
        static unlockInstructions() {
          return "完成辅助工具教程以解锁大型精灵图。";
        }
        status() {
          if (PAA.Tutorials.Drawing.PixelArtTools.Helpers.completed()) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      BigMonochrome.initialize();
      BigMonochrome.prefixFilter = 'MB';
      return BigMonochrome;
    }.call(this);
    CopyReference.BigColored = function () {
      class BigColored extends CopyReference.SpritesGroup {
        static id() {
          return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.DrawingChallenges.CopyReference.BigColored';
        }
        static displayName() {
          return "Big colored sprites";
        }
        static unlockInstructions() {
          return "完成颜色和辅助工具教程以解锁大型彩色精灵图。";
        }
        status() {
          if (PAA.Tutorials.Drawing.PixelArtTools.Colors.completed() && PAA.Tutorials.Drawing.PixelArtTools.Helpers.completed()) {
            return LM.Content.Status.Unlocked;
          } else {
            return LM.Content.Status.Locked;
          }
        }
      }
      ;
      BigColored.initialize();
      BigColored.prefixFilter = 'CB';
      return BigColored;
    }.call(this);
    return CopyReference;
  }.call(this);
  return DrawingChallenges;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"projects.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-intro/tutorial/content/projects.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA, PixelArtSoftware;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PixelArtSoftware = PAA.Challenges.Drawing.PixelArtSoftware;
LM.Intro.Tutorial.Content.Projects = function () {
  class Projects extends LM.Content {
    static id() {
      return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Projects';
    }
    static displayName() {
      return "Projects";
    }
    static unlockInstructions() {
      return "解锁 PICO-8 应用以获取项目访问权限。";
    }
    static contents() {
      return [this.Snake];
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
      var pixelArtSoftwareGoal;
      pixelArtSoftwareGoal = PAA.Learning.Goal.getAdventureInstanceForId(LM.Intro.Tutorial.Goals.PixelArtSoftware.id());
      if (pixelArtSoftwareGoal.completed()) {
        return this.constructor.Status.Unlocked;
      } else {
        return this.constructor.Status.Locked;
      }
    }
  }
  ;
  Projects.initialize();
  Projects.Snake = function () {
    class Snake extends LM.Content {
      static id() {
        return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Projects.Snake';
      }
      static displayName() {
        return "Snake";
      }
      static unlockInstructions() {
        return "在 PICO-8 上的贪吃蛇游戏中获得一些分数以解锁贪吃蛇项目。";
      }
      static contents() {
        return [this.Body, this.Food];
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.ContentProgress({
          content: this,
          units: "sprites"
        });
      }
      status() {
        if (LM.Intro.Tutorial.Goals.Snake.Play.completedConditions()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Locked;
        }
      }
    }
    ;
    Snake.initialize();
    Snake.Body = function () {
      class Body extends LM.Content.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Projects.Snake.Body';
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
      }
      ;
      Body.projectClass = PAA.Pico8.Cartridges.Snake.Project;
      Body.assetClass = PAA.Pico8.Cartridges.Snake.Body;
      Body.initialize();
      return Body;
    }.call(this);
    Snake.Food = function () {
      class Food extends LM.Content.AssetContent {
        static id() {
          return 'PixelArtAcademy.LearnMode.Intro.Tutorial.Content.Projects.Snake.Food';
        }
        status() {
          return LM.Content.Status.Unlocked;
        }
      }
      ;
      Food.projectClass = PAA.Pico8.Cartridges.Snake.Project;
      Food.assetClass = PAA.Pico8.Cartridges.Snake.Food;
      Food.initialize();
      return Food;
    }.call(this);
    return Snake;
  }.call(this);
  return Projects;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/intro.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/pixelpad.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/apps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/systems.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/editors.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/challengesdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/tutorialsdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/pico8cartridges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/scenes/workbench.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/start/start.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/tutorial.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/goals/goals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/goals/todotasks.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/goals/pixelartsoftware.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/goals/snake.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/content/content.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/content/course.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/content/apps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/content/goals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/content/drawingtutorials.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/content/drawingchallenges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-intro/tutorial/content/projects.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-learnmode-intro", {
  PixelArtAcademy: PixelArtAcademy
});

})();
