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
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pico8-snake":{"snake.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/retronator_pixelartacademy-pico8-snake/snake.coffee                                        //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pico8.Cartridges.Snake = function () {
  class Snake extends PAA.Pico8.Cartridge {
    // highScore: the top result the player has achieved
    static id() {
      return 'PixelArtAcademy.Pico8.Cartridges.Snake';
    }
    static gameSlug() {
      return 'snake';
    }
    static projectClass() {
      return this.Project;
    }
    onInputOutput(address, value) {
      var highScore;
      // Read score from address 1.
      if (!(address === 1 && value != null)) {
        return;
      }
      highScore = this.state('highScore') || 0;
      if (!(value > highScore)) {
        return;
      }
      return this.state('highScore', value);
    }
  }
  ;
  Snake.initialize();

  // Assets
  Snake.Body = function () {
    class Body extends PAA.Practice.Project.Asset.Bitmap {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Snake.Body';
      }
      static displayName() {
        return "Snake body";
      }
      static description() {
        return "蛇身体的一个单位。蛇吃的每个食物会为蛇增加一个这样的单位，使其变长。";
      }
      static fixedDimensions() {
        return {
          width: 8,
          height: 8
        };
      }
      static restrictedPaletteName() {
        return LOI.Assets.Palette.SystemPaletteNames.Pico8;
      }
      static backgroundColor() {
        return {
          paletteColor: {
            ramp: 10,
            shade: 0
          }
        };
      }
    }
    ;
    Body.initialize();
    return Body;
  }.call(this);
  Snake.Food = function () {
    class Food extends PAA.Practice.Project.Asset.Bitmap {
      static id() {
        return 'PixelArtAcademy.Pico8.Cartridges.Snake.Food';
      }
      static displayName() {
        return "Food";
      }
      static description() {
        return "蛇吃了会变长的食物。";
      }
      static fixedDimensions() {
        return {
          width: 8,
          height: 8
        };
      }
      static restrictedPaletteName() {
        return LOI.Assets.Palette.SystemPaletteNames.Pico8;
      }
      static backgroundColor() {
        return {
          paletteColor: {
            ramp: 10,
            shade: 0
          }
        };
      }
    }
    ;
    Food.initialize();
    return Food;
  }.call(this);
  return Snake;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/retronator_pixelartacademy-pico8-snake/project.coffee                                      //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, PAA;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.Pico8.Cartridges.Snake.Project = function () {
  class Project extends PAA.Practice.Project.Thing {
    // activeProjectId: ID of the project that is currently active
    static id() {
      return 'PixelArtAcademy.Pico8.Cartridges.Snake.Project';
    }
    static fullName() {
      return "贪吃蛇游戏";
    }
    constructor() {
      super(...arguments);
      this.assets = new ComputedField(() => {
        return [new PAA.Pico8.Cartridges.Snake.Body(this), new PAA.Pico8.Cartridges.Snake.Food(this)];
      }, true);
      this.pico8Cartridge = new PAA.Pico8.Cartridges.Snake();
    }
    destroy() {
      this.assets.stop();
      return this.pico8Cartridge.destroy();
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.Intro.Tutorial))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.Intro.Tutorial.Content.Projects.Snake);
    }
  }
  ;
  Project.initialize();
  return Project;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project-startend.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/retronator_pixelartacademy-pico8-snake/project-startend.coffee                             //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA, Snake;
AE = Artificial.Everywhere;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Snake = PAA.Pico8.Cartridges.Snake;
PAA.Pico8.Cartridges.Snake.Project = class Project extends PAA.Pico8.Cartridges.Snake.Project {
  static start() {
    if (Snake.Project.state('activeProjectId')) {
      // Make sure the player doesn't have an already active project.
      throw new AE.InvalidOperationException("Profile already has an active Snake project.");
    }
    return new Promise((resolve, reject) => {
      return Tracker.autorun(computation => {
        var bodyBitmapData, bodyBitmapId, bodyLayer, createCommonBitmapData, creationTime, foodBitmapData, foodBitmapId, foodLayer, i, j, k, l, pico8Palette, pixelFormat, profileId, projectId, x, y;
        LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Pico8);
        if (!(pico8Palette = LOI.Assets.Palette.documents.findOne({
          name: LOI.Assets.Palette.SystemPaletteNames.Pico8
        }))) {
          return;
        }
        computation.stop();
        // Create two pre-made sprites.
        profileId = LOI.adventure.profileId();
        creationTime = new Date();
        pixelFormat = new LOI.Assets.Bitmap.PixelFormat('flags', 'paletteColor');
        createCommonBitmapData = function () {
          return {
            versioned: true,
            profileId: profileId,
            creationTime: creationTime,
            lastEditTime: creationTime,
            bounds: {
              left: 0,
              right: 7,
              top: 0,
              bottom: 7,
              x: 0,
              y: 0,
              width: 8,
              height: 8,
              fixed: true
            },
            pixelFormat: pixelFormat,
            palette: {
              _id: pico8Palette._id
            }
          };
        };
        // Create green snake body.
        bodyBitmapData = createCommonBitmapData();
        bodyLayer = new LOI.Assets.Bitmap.Layer(bodyBitmapData, bodyBitmapData, {
          bounds: bodyBitmapData.bounds
        });
        for (x = i = 0; i <= 7; x = ++i) {
          for (y = j = 0; j <= 7; y = ++j) {
            bodyLayer.setPixel(x, y, {
              paletteColor: {
                ramp: 3,
                shade: 0
              }
            });
          }
        }
        _.extend(bodyBitmapData, {
          name: Snake.Body.displayName(),
          layers: [bodyLayer.toPlainObject()]
        });
        bodyBitmapId = LOI.Assets.Bitmap.documents.insert(bodyBitmapData);
        // Create brown food.
        foodBitmapData = createCommonBitmapData();
        foodLayer = new LOI.Assets.Bitmap.Layer(foodBitmapData, foodBitmapData, {
          bounds: foodBitmapData.bounds
        });
        for (x = k = 2; k <= 5; x = ++k) {
          for (y = l = 2; l <= 5; y = ++l) {
            foodLayer.setPixel(x, y, {
              paletteColor: {
                ramp: 4,
                shade: 0
              }
            });
          }
        }
        _.extend(foodBitmapData, {
          name: Snake.Food.displayName(),
          layers: [foodLayer.toPlainObject()]
        });
        foodBitmapId = LOI.Assets.Bitmap.documents.insert(foodBitmapData);
        // Create the project.
        projectId = PAA.Practice.Project.documents.insert({
          startTime: creationTime,
          lastEditTime: creationTime,
          type: Snake.Project.id(),
          profileId: profileId,
          assets: [{
            id: Snake.Body.id(),
            type: Snake.Body.type(),
            bitmapId: bodyBitmapId
          }, {
            id: Snake.Food.id(),
            type: Snake.Food.type(),
            bitmapId: foodBitmapId
          }]
        });
        // Write the project ID into profile's game state.
        Snake.Project.state('activeProjectId', projectId);
        return resolve();
      });
    });
  }
  static end() {
    var endTime, projectId;
    // Make sure the player has an active project.
    projectId = Snake.Project.state('activeProjectId');
    if (!projectId) {
      throw new AE.InvalidOperationException("Profile does not have an active Snake project.");
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
    return Snake.Project.state('activeProjectId', null);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pico8-snake/snake.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-snake/project.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pico8-snake/project-startend.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pico8-snake", {
  PixelArtAcademy: PixelArtAcademy
});

})();
