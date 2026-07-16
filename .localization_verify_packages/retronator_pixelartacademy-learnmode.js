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
var LandsOfIllusions = Package['retronator:landsofillusions-ui'].LandsOfIllusions;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-learnmode":{"learnmode.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/learnmode.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI;
LOI = LandsOfIllusions;
PixelArtAcademy.LearnMode = function () {
  class LearnMode {
    constructor() {
      // Create the learn-mode url capture.
      Retronator.App.addPublicPage('pixelart.academy/learn-mode/:parameter1?/:parameter2?/:parameter3?/:parameter4?/:parameter5?', this.constructor.Adventure);
    }
  }
  ;
  LearnMode.debug = false;
  return LearnMode;
}.call(this);
if (Meteor.isServer) {
  LOI.initializePackage({
    id: 'retronator:pixelartacademy-learnmode',
    assets: Assets
  });

  // Export assets in the pixelartacademy folder.
  LOI.Assets.addToExport('pixelartacademy');
}
if (Meteor.isClient) {
  window.LM = PixelArtAcademy.LearnMode;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"region.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/region.coffee                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.LearnMode.Region = function () {
  class Region extends LOI.Adventure.Region {
    static id() {
      return 'PixelArtAcademy.LearnMode';
    }
    static scenes() {
      return [];
    }
  }
  ;
  Region.initialize();
  return Region;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"spacebars.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/spacebars.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LM, LOI;
LOI = LandsOfIllusions;
AB = Artificial.Base;
LM = PixelArtAcademy.LearnMode;
Template.registerHelper('isLearnMode', function () {
  // See if the router handler is Learn Mode adventure.
  return AB.Router.currentRouteName() === LM.Adventure.id();
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"adventure":{"adventure.coffee":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/adventure/adventure.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
let semver;
module.link("semver", {
  default(v) {
    semver = v;
  }
}, 0);
var AB, LM, LOI, PAA, Persistence;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
LM.Adventure = function () {
  // The adventure component that is served from pixelart.academy/learn-mode.
  class Adventure extends PAA.Adventure {
    static id() {
      return 'PixelArtAcademy.LearnMode.Adventure';
    }
    static title() {
      return "像素艺术学院：学习模式";
    }
    static description() {
      return "在 Retronator 的教育游戏中学习像素艺术基础。";
    }
    static rootUrl() {
      return '/learn-mode';
    }
    static menuItemsClass() {
      return LM.Menu.Items;
    }
    static menuExtrasClass() {
      return LM.Menu.Extras;
    }
    static interfaceClass() {
      return LM.Interface;
    }
    static episodeClasses() {
      return [LM.Intro, LM.PixelArtFundamentals, LM.Design];
    }
    static lastNewLessonsVersion() {
      return '0.25.0';
    }
    titleSuffix() {
      return ' // Pixel Art Academy: Learn Mode';
    }
    title() {
      var ref;
      if (LOI.adventureInitialized() && ((ref = this.currentLocation()) != null ? typeof ref.isLandingPage === "function" ? ref.isLandingPage() : void 0 : void 0)) {
        // On the landing page return the default title.
        return this.constructor.title();
      }
      return super.title(...arguments);
    }
    template() {
      return 'LandsOfIllusions.Adventure';
    }
    startingPoint() {
      return {
        locationId: LM.Locations.MainMenu.id(),
        timelineId: LOI.TimelineIds.RealLife
      };
    }
    usesLocalState() {
      return true;
    }
    globalClasses() {
      return [];
    }
    episodeClasses() {
      return this.constructor.episodeClasses();
    }
    async startNewGame() {
      var gameState;
      await super.startNewGame(...arguments);
      if (gameState = LOI.adventure.gameState()) {
        // Automatically acknowledge the lessons in the current version on start.
        gameState.acknowledgedNewLessonsVersion = this.constructor.lastNewLessonsVersion();
        return LOI.adventure.gameState.updated();
      }
    }
    async loadGame() {
      var acknowledgedNewLessonsVersion, gameState, lastNewLessonsVersion;
      await super.loadGame(...arguments);
      await _.waitForFlush();
      this.interface.prepareLocation();

      // Warn the user that new lessons were added.
      if (gameState = LOI.adventure.gameState()) {
        acknowledgedNewLessonsVersion = gameState.acknowledgedNewLessonsVersion || '0.0.0';
        lastNewLessonsVersion = this.constructor.lastNewLessonsVersion();
        if (semver.lt(acknowledgedNewLessonsVersion, lastNewLessonsVersion)) {
          // Disable loading audio when deciding on a popup dialogs.
          LOI.adventure.menu.loadGame.audio.load(false);
          return await LOI.adventure.showDialogMessage("New tutorial lessons have been added since you last played the game. If anything in the game seems missing,\ncomplete the new lessons first to get back to where you were.\n\nUse the Progress screen in the Menu to see which tutorials you're missing.", () => {
            gameState.acknowledgedNewLessonsVersion = lastNewLessonsVersion;
            return LOI.adventure.gameState.updated();
          });
        }
      }
    }
    quitGame() {
      var profile;
      // Store the last loaded profile so we can load it with the continue button.
      profile = this.profile();
      // We need to make sure profile has syncing since we could be quitting a just started game that was not saved.
      if (profile.hasSyncing()) {
        localStorage.setItem(this.constructor.lastLoadedProfileIdLocalStorageKey, profile._id);
      }
      return super.quitGame(...arguments);
    }
    showLoading() {
      // Don't show the loading screen if the interface is already indicating we're waiting.
      if (LOI.adventure.interface.waiting()) {
        return;
      }
      return super.showLoading(...arguments);
    }
    inAudioMenu() {
      var ref, ref1;
      if (!LOI.adventureInitialized()) {
        return;
      }
      if (LOI.adventure.menu.visible()) {
        return LOI.adventure.menu.items.inAudio();
      } else if (this.interface.audio.focusPoint.value() === LM.Interface.FocusPoints.MainMenu) {
        return (ref = LOI.adventure.currentLocation()) != null ? (ref1 = ref.menuItems) != null ? ref1.inAudio() : void 0 : void 0;
      }
    }
  }
  ;
  Adventure.register(Adventure.id());
  Adventure.lastLoadedProfileIdLocalStorageKey = 'LandsOfIllusions.Adventure.lastLoadedProfileId';
  return Adventure;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"chapter":{"chapter.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/chapter/chapter.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LM, LOI, PAA, Persistence;
AM = Artificial.Mummification;
Persistence = AM.Document.Persistence;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Chapter = class Chapter extends PAA.Chapter {
  static courses() {
    // Override to provide any course classes that the chapter oversees.
    return [];
  }
  constructor() {
    var course, courseClass;
    super(...arguments);
    // Handle courses content for this chapter.
    this.courses = function () {
      var i, len, ref, results;
      ref = this.constructor.courses();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        courseClass = ref[i];
        results.push(new courseClass());
      }
      return results;
    }.call(this);
    this.contents = _.flatten(function () {
      var i, len, ref, results;
      ref = this.courses;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        course = ref[i];
        results.push(course.allContents());
      }
      return results;
    }.call(this));
  }
  destroy() {
    var course, i, len, ref, results;
    super.destroy(...arguments);
    ref = this.courses;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      course = ref[i];
      results.push(course.destroy());
    }
    return results;
  }
  getCourse(courseClass) {
    return _.find(this.courses, course => {
      return course instanceof courseClass;
    });
  }
  getContent(contentClass) {
    return _.find(this.contents, content => {
      return content instanceof contentClass;
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"interface":{"interface.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/interface/interface.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, AEc, AM, AMe, LM, LOI;
AC = Artificial.Control;
AE = Artificial.Everywhere;
AEc = Artificial.Echo;
AMe = Artificial.Melody;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Interface = function () {
  class Interface extends LOI.Interface {
    static id() {
      return 'PixelArtAcademy.LearnMode.Interface';
    }
    onCreated() {
      super.onCreated(...arguments);
      if (LM.debug) {
        console.log("Learn Mode interface is being created.");
      }

      // Create pixel scaling display.
      this.display = new AM.Display({
        safeAreaWidth: 320,
        safeAreaHeight: 241,
        maxDisplayWidth: 480,
        maxDisplayHeight: 360,
        minScale: LOI.settings.graphics.minimumScale.value,
        maxScale: LOI.settings.graphics.maximumScale.value,
        debug: false
      });
      this.studio = new this.constructor.Studio();
      this.introFadeComplete = new ReactiveField(false);
      this.introFadeFast = new ReactiveField(false);
      this.waiting = new ReactiveField(true);

      // Manually load Audio since audio manager wasn't available when calling super.
      this.constructor.Audio.load(LOI.adventure.audioManager);

      // Play ambient in play mode, but not in the menus, except in the audio sections. We have an additional extended
      // silence during quitting when the game transitions from the play to the main menu location and audio would still
      // be played as the adventure menu fades out before location switch.
      this.quitting = new ReactiveField(false);
      this.audioOffInMenus = new ComputedField(() => {
        var ref, ref1;
        if (this.audio.focusPoint.value() === this.constructor.FocusPoints.Play) {
          if (LOI.adventure.menu.visible()) {
            return !LOI.adventure.menu.items.inAudioSubmenus();
          } else {
            return this.quitting();
          }
        } else {
          return !((ref = LOI.adventure.currentLocation()) != null ? (ref1 = ref.menuItems) != null ? ref1.inAudioSubmenus() : void 0 : void 0);
        }
      });
      this.autorun(computation => {
        return this.audio.playAmbient(!this.audioOffInMenus());
      });

      // Allow for focusing artworks.
      return this.focusedArtworks = new ReactiveField(null);
    }
    onRendered() {
      super.onRendered(...arguments);

      // Wait until adventure is ready.
      return this.autorun(computation => {
        if (!LOI.adventure.ready()) {
          return;
        }
        computation.stop();
        if (LOI.adventure.currentLocationId() === LM.Locations.MainMenu.id()) {
          // We're starting in the menu (such as when no profile has been stored as active yet), so simply fade it in.
          Meteor.setTimeout(() => {
            var mainMenu;
            mainMenu = LOI.adventure.currentLocation();
            mainMenu.fadeIn();
            this.audio.focusPoint(this.constructor.FocusPoints.MainMenu);
            return this.waiting(false);
          }, 1000);
        } else if (LOI.adventure.currentLocationId() === LM.Locations.Play.id()) {
          // We're starting directly in play so we have to make the studio focus on the top and open the PixelPad.
          this.studio.setFocus(this.constructor.Studio.FocusPoints.Play);
          this.audio.focusPoint(this.constructor.FocusPoints.Play);
          Tracker.nonreactive(() => {
            return this._openPixelPad();
          });

          // We want a fast transition since there is no waiting for the menu fade.
          this.introFadeFast(true);
        }
        return this.introFadeComplete(true);
      });
    }
    prepareLocation() {
      if (LOI.adventure.currentLocationId() === LM.Locations.Play.id()) {
        // We're supposed to be in play so we have to make the studio focus on the top and open the PixelPad.
        this.studio.setFocus(this.constructor.Studio.FocusPoints.Play);
        this.audio.focusPoint(this.constructor.FocusPoints.Play);
        return this._openPixelPad();
      } else {
        this.studio.setFocus(this.constructor.Studio.FocusPoints.MainMenu);
        return this.audio.focusPoint(this.constructor.FocusPoints.MainMenu);
      }
    }
    goToPlay(loadProfileId) {
      var mainMenu;
      mainMenu = LOI.adventure.currentLocation();
      mainMenu.fadeOut();
      this.audio.focusPoint(this.constructor.FocusPoints.Play);
      return Meteor.setTimeout(async () => {
        var profile;
        // Move the focus point.
        await this.studio.moveFocus({
          focusPoint: this.constructor.Studio.FocusPoints.Play,
          speedFactor: loadProfileId ? 2.5 : 1.5
        });
        if (loadProfileId) {
          // Start loading the game after the animation has finished to prevent lag.
          await LOI.adventure.menu.loadGame.show(loadProfileId, false);
        } else {
          // We are starting a new game, show the save dialog.
          await LOI.adventure.menu.saveGame.show();
        }

        // If the player decided to cancel or the load didn't succeed, send them back to the menu.
        profile = LOI.adventure.profile();
        if (!(profile != null ? profile.hasSyncing() : void 0)) {
          if (profile) {
            LOI.adventure.quitGame({
              callback: () => {
                LOI.adventure.interface.goToMainMenu();

                // Notify that we've handled the quitting sequence.
                return true;
              }
            });
          } else {
            LOI.adventure.interface.goToMainMenu();
          }
          return;
        }
        if (!loadProfileId) {
          // We have a profile loaded with syncing, so we can safely continue to play.
          LOI.adventure.goToLocation(LM.Locations.Play);
        }
        return this._openPixelPad();
      }, 750);
    }
    _openPixelPad() {
      // Open the PixelPad when it becomes available.
      return this.autorun(computation => {
        var pixelPad;
        if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
          return;
        }
        computation.stop();
        pixelPad.open();
        return this.waiting(false);
      });
    }
    async goToMainMenu() {
      var mainMenu;
      this.audio.focusPoint(this.constructor.FocusPoints.MainMenu);
      await this.studio.moveFocus({
        focusPoint: this.constructor.Studio.FocusPoints.MainMenu,
        speedFactor: 2
      });
      mainMenu = LOI.adventure.currentLocation();
      mainMenu.fadeIn();
      return this.waiting(false);
    }
    startWaiting() {
      return this.waiting(true);
    }
    focusArtworks(artworks, options) {
      // Start display.
      return this.focusedArtworks({
        artworks: artworks,
        options: _.defaults({}, options, {
          scrollParentSelector: '.focused-artworks'
        })
      });
    }
    unfocusArtworks() {
      // Stop display.
      return this.focusedArtworks(null);
    }
    active() {
      // The Learn Mode interface is inactive when adventure is paused.
      if (LOI.adventure.paused()) {
        return;
      }

      // Inactive when the menu is opened.
      if (LOI.adventure.menu.visible()) {
        return;
      }
      return true;
    }
    introFadeCompleteClass() {
      if (this.introFadeComplete()) {
        return 'complete';
      }
    }
    introFadeFastClass() {
      if (this.introFadeFast()) {
        return 'fast';
      }
    }
    waitingOverlayVisibleClass() {
      if (this.waiting()) {
        return 'visible';
      }
    }
    artworksStreamOptions() {
      return this.focusedArtworks().options;
    }
    events() {
      return super.events(...arguments).concat({
        'click .focused-artworks': this.onClickFocusedArtworks
      });
    }
    onClickFocusedArtworks(event) {
      return this.unfocusArtworks();
    }
  }
  ;
  Interface.register(Interface.id());
  Interface.Audio = new LOI.Assets.Audio.Namespace(Interface.id(), {
    variables: {
      focusPoint: AEc.ValueTypes.String,
      playAmbient: AEc.ValueTypes.Boolean,
      inGameMusicInLocation: AEc.ValueTypes.Boolean
    }
  });
  Interface.FocusPoints = {
    Play: 'Play',
    MainMenu: 'MainMenu'
  };
  Interface.InGameMusicMode = {
    Direct: 'Direct',
    InLocation: 'InLocation',
    Off: 'Off'
  };
  return Interface;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.interface.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/interface/template.interface.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Interface");
Template["PixelArtAcademy.LearnMode.Interface"] = new Template("Template.PixelArtAcademy.LearnMode.Interface", (function() {
  var view = this;
  return [ HTML.STYLE("\n    html {\n      font-size: ", Blaze.View("lookup:display.scale", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("display"), "scale"));
  }), "px;\n    }\n  "), "\n  ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("display"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ", HTML.DIV({
    class: "pixelartacademy-learnmode-interface"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("studio"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", HTML.DIV({
    class: "location"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("location"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    "), "\n    ", HTML.DIV({
    class: "items"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("activeItems"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("."));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: function() {
      return [ "intro-fade ", Spacebars.mustache(view.lookup("introFadeCompleteClass")), " ", Spacebars.mustache(view.lookup("introFadeFastClass")) ];
    }
  }), "\n    ", HTML.DIV({
    class: function() {
      return [ "waiting-overlay ", Spacebars.mustache(view.lookup("waitingOverlayVisibleClass")) ];
    }
  }), "\n  "), "\n  ", Spacebars.With(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("focusedArtworks"), "artworks"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "focused-artworks"
    }, "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("artworksStreamOptions"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtDatabase"), "Components", "Stream"));
      });
    }), "\n    "), "\n  " ];
  }) ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interface-music.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/interface/interface-music.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  AEc,
  AM,
  AMe,
  LM,
  LOI,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AEc = Artificial.Echo;
AMe = Artificial.Melody;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Interface = class Interface extends LM.Interface {
  onCreated() {
    var previouslyAvailableCompositionClasses;
    super.onCreated(...arguments);
    this._previousDynamicSoundtrackComposition = null;
    this.currentDynamicSoundtrackComposition = new ReactiveField(null);

    // Play the composition when we are in play, unless the music system is playing a track or we're in the music app.
    this._previousDynamicSoundtrackPlayback = null;
    this.currentDynamicSoundtrackPlayback = new ReactiveField(null);
    this.dynamicSoundtrackPlaying = new ComputedField(() => {
      var currentApp, pixelPad;
      if (!LOI.adventure.ready()) {
        return;
      }
      if (LOI.adventure.currentLocationId() !== LM.Locations.Play.id()) {
        return false;
      }
      if (PAA.PixelPad.Systems.Music.state('playing')) {
        return false;
      }
      if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
        return;
      }
      if (!(currentApp = pixelPad.os.currentApp())) {
        return;
      }
      return !(currentApp instanceof PAA.PixelPad.Apps.Music);
    });
    this.autorun(computation => {
      var currentDynamicSoundtrackComposition, dynamicSoundtrackPlaying;
      dynamicSoundtrackPlaying = this.dynamicSoundtrackPlaying();
      currentDynamicSoundtrackComposition = this.currentDynamicSoundtrackComposition();
      if (dynamicSoundtrackPlaying == null) {
        return;
      }
      return Tracker.nonreactive(() => {
        var currentDynamicSoundtrackPlayback, ref, startMusicWhenReady, startPlaybackWaitDuration;
        currentDynamicSoundtrackPlayback = this.currentDynamicSoundtrackPlayback();
        if (dynamicSoundtrackPlaying) {
          // Check if the right composition is already playing.
          if (((ref = this._previousDynamicSoundtrackPlayback) != null ? ref.composition : void 0) === currentDynamicSoundtrackComposition && LOI.adventure.music.isPlayingPlayback(this._previousDynamicSoundtrackPlayback)) {
            // It is, we simply need to resume it.
            return LOI.adventure.music.resume(PAA.Music.FadeDurations.InGameMusicModeOffFadeIn);
          } else {
            startPlaybackWaitDuration = PAA.Music.StartTimeoutDuration;

            // It is not. If we have a different composition playing, we need to fade it out.
            if (this._previousDynamicSoundtrackPlayback) {
              if (LOI.adventure.music.isPlayingPlayback(this._previousDynamicSoundtrackPlayback)) {
                LOI.adventure.music.stopPlayback(PAA.Music.FadeDurations.DynamicSoundtrackSongChangeFadeOut);
              }
              startPlaybackWaitDuration += PAA.Music.FadeDurations.DynamicSoundtrackSongChangeFadeOut;

              // Destroy the playback and composition after the fade out and some grace time.
              this._destroyCurrentDynamicSoundtrack(PAA.Music.FadeDurations.DynamicSoundtrackSongChangeFadeOut);
            }

            // Create new playback.
            this._previousDynamicSoundtrackComposition = currentDynamicSoundtrackComposition;
            this._previousDynamicSoundtrackPlayback = new AMe.Playback(LOI.adventure.audioManager, currentDynamicSoundtrackComposition);
            this.currentDynamicSoundtrackPlayback(this._previousDynamicSoundtrackPlayback);
            startMusicWhenReady = () => {
              // If the composition playback is not yet ready, retry in 0.1s.
              if (!(this._previousDynamicSoundtrackComposition.ready() && this._previousDynamicSoundtrackPlayback.ready())) {
                this._musicStartTimeout = Meteor.setTimeout(startMusicWhenReady, 100);
                return;
              }

              // The song is now ready. play it!
              LOI.adventure.music.startPlayback(this._previousDynamicSoundtrackPlayback);
              return this._musicStartTimeout = null;
            };

            // Start the music after a short amount of silence.
            Meteor.clearTimeout(this._musicStartTimeout);
            return this._musicStartTimeout = Meteor.setTimeout(startMusicWhenReady, startPlaybackWaitDuration * 1000);
          }
        } else if (LOI.adventure.music.isPlayingPlayback(currentDynamicSoundtrackPlayback)) {
          Meteor.clearTimeout(this._musicStartTimeout);
          if (LOI.adventure.currentLocationId() === LM.Locations.Play.id()) {
            // While in play, we only need to pause the music so it can continue while being temporarily disabled.
            return LOI.adventure.music.pause(PAA.Music.FadeDurations.InGameMusicModeOffFadeOut);
          } else {
            // Outside of play we completely stop the music so it gets restarted the next time around.
            LOI.adventure.music.stopPlayback(PAA.Music.FadeDurations.InGameMusicModeOffFadeOut);
            // Destroy the playback and composition after the fade out and some grace time.
            return this._destroyCurrentDynamicSoundtrack(PAA.Music.FadeDurations.InGameMusicModeOffFadeOut);
          }
        }
      });
    });

    // Control how to play the in-game music.
    this.autorun(computation => {
      var inGameMusicMode, pixelPad, ref;
      // In the music effects settings menu, always play the music in location.
      if (LOI.adventure.menu.visible() && LOI.adventure.menu.items.inMusicEffectsSettings()) {
        this.audio.inGameMusicInLocation(true);
        return;
      }
      pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad);
      inGameMusicMode = pixelPad != null ? (ref = pixelPad.os.currentApp()) != null ? typeof ref.inGameMusicMode === "function" ? ref.inGameMusicMode() : void 0 : void 0 : void 0;
      if (inGameMusicMode !== this.constructor.InGameMusicMode.Off) {
        switch (LOI.settings.audio.inGameMusicOutput.value()) {
          case LOI.Settings.Audio.InGameMusicOutput.InLocation:
            inGameMusicMode = this.constructor.InGameMusicMode.InLocation;
            break;
          case LOI.Settings.Audio.InGameMusicOutput.Direct:
            inGameMusicMode = this.constructor.InGameMusicMode.Direct;
        }
      }
      if (inGameMusicMode !== this.constructor.InGameMusicMode.Off) {
        return this.audio.inGameMusicInLocation(inGameMusicMode === this.constructor.InGameMusicMode.InLocation);
      }
    });

    // Pause music when apps require it to be off.
    this.inGameMusicModeOff = new ComputedField(() => {
      var pixelPad, ref;
      pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad);
      return (pixelPad != null ? (ref = pixelPad.os.currentApp()) != null ? typeof ref.inGameMusicMode === "function" ? ref.inGameMusicMode() : void 0 : void 0 : void 0) === this.constructor.InGameMusicMode.Off;
    });
    this.autorun(computation => {
      if (this.inGameMusicModeOff()) {
        return LOI.adventure.music.pause(PAA.Music.FadeDurations.InGameMusicModeOffFadeOut);
      } else {
        return LOI.adventure.music.resume(PAA.Music.FadeDurations.InGameMusicModeOffFadeIn);
      }
    });

    // Pause music in the menus, except on the audio screen.
    this.autorun(computation => {
      if (this.audioOffInMenus()) {
        return LOI.adventure.music.pause(PAA.Music.FadeDurations.MenuFadeOut);
      } else {
        return LOI.adventure.music.resume(PAA.Music.FadeDurations.MenuFadeIn);
      }
    });

    // Start the correct dynamic soundtrack composition.
    this.drawingAppDeterminedCompositionClass = new ComputedField(computation => {
      var activeGroup, activeThing, course, currentApp, drawing, pixelPad, portfolio;
      if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
        return;
      }
      if (!(currentApp = pixelPad.os.currentApp())) {
        return;
      }
      if (!(currentApp instanceof PAA.PixelPad.Apps.Drawing)) {
        return;
      }

      // In the drawing app, see which episode the content is coming from.
      drawing = currentApp;

      // Wait until an asset is activated.
      if (!(portfolio = drawing.portfolio())) {
        return;
      }
      if (!portfolio.activeAsset()) {
        return;
      }
      activeGroup = _.last(portfolio.activeGroups());
      activeThing = activeGroup.thing;
      if (!(course = activeThing != null ? activeThing.content().course : void 0)) {
        return;
      }
      if (course instanceof LM.Intro.Tutorial.Content.Course) {
        // Intro
        return LM.Compositions.PixelArtTools;
      } else if (course instanceof LM.PixelArtFundamentals.Fundamentals.Content.Course) {
        // Pixel art fundamentals
        if (activeThing instanceof PAA.Tutorials.Drawing.ElementsOfArt) {
          return LM.Compositions.ElementsOfArt;
        } else if (activeThing instanceof PAA.Tutorials.Drawing.Simplification) {
          return LM.Compositions.ElementsOfArt;
        } else if (activeThing instanceof PAA.Tutorials.Drawing.PixelArtFundamentals) {
          return LM.Compositions.PixelArtFundamentals;
        }
      } else if (course instanceof LM.Design.Fundamentals.Content.Course) {
        // Design fundamentals
        if (activeThing instanceof PAA.Tutorials.Drawing.Design) {
          return LM.Compositions.ElementsOfArt;
        } else if (activeThing instanceof PAA.Pico8.Cartridges.Invasion.Project) {
          return LM.Compositions.PixelArtFundamentals;
        }
      }
    });
    previouslyAvailableCompositionClasses = [];
    return this.autorun(computation => {
      var currentChapters, currentLocationId, drawingAppDeterminedCompositionClass;
      drawingAppDeterminedCompositionClass = this.drawingAppDeterminedCompositionClass();
      currentChapters = LOI.adventure.currentChapters();
      currentLocationId = LOI.adventure.currentLocationId();
      return Tracker.nonreactive(() => {
        var availableCompositionClasses, availableCourses, chapter, compositionClass, course, currentDynamicSoundtrackComposition, desiredCompositionClass, i, j, len, len1;
        // Outside of play, there is no dynamic composition.
        if (currentLocationId !== LM.Locations.Play.id()) {
          this.currentDynamicSoundtrackComposition(null);
          previouslyAvailableCompositionClasses = [];
          return;
        }
        currentDynamicSoundtrackComposition = this.currentDynamicSoundtrackComposition();
        if (drawingAppDeterminedCompositionClass) {
          // When the drawing app is able to determine the composition class, we use that.
          desiredCompositionClass = drawingAppDeterminedCompositionClass;
        } else {
          // Otherwise we leave the composition playing unless no composition is
          // playing, or if a new composition is available that wasn't previously.
          availableCourses = _.flatten(function () {
            var i, len, results;
            results = [];
            for (i = 0, len = currentChapters.length; i < len; i++) {
              chapter = currentChapters[i];
              results.push(chapter.courses);
            }
            return results;
          }());
          availableCompositionClasses = [];
          for (i = 0, len = availableCourses.length; i < len; i++) {
            course = availableCourses[i];
            if (course instanceof LM.Intro.Tutorial.Content.Course) {
              availableCompositionClasses.push(LM.Compositions.PixelArtTools);
            } else if (course instanceof LM.PixelArtFundamentals.Fundamentals.Content.Course) {
              availableCompositionClasses.push(LM.Compositions.ElementsOfArt);
              if (LM.PixelArtFundamentals.Fundamentals.Goals.Jaggies.activeAndAvailableOrCompleted()) {
                availableCompositionClasses.push(LM.Compositions.PixelArtFundamentals);
              }
            }
          }
          for (j = 0, len1 = availableCompositionClasses.length; j < len1; j++) {
            compositionClass = availableCompositionClasses[j];
            if (indexOf.call(previouslyAvailableCompositionClasses, compositionClass) < 0 || !currentDynamicSoundtrackComposition) {
              desiredCompositionClass = compositionClass;
            }
          }
          previouslyAvailableCompositionClasses = availableCompositionClasses;
          if (!desiredCompositionClass) {
            return;
          }
        }
        if (currentDynamicSoundtrackComposition instanceof desiredCompositionClass) {
          return;
        }
        return this.currentDynamicSoundtrackComposition(new desiredCompositionClass(LOI.adventure.audioManager));
      });
    });
  }
  onDestroyed() {
    var ref, ref1;
    super.onDestroyed(...arguments);
    if ((ref = this._currentDynamicSoundtrackComposition) != null) {
      ref.destroy();
    }
    return (ref1 = this._currentDynamicSoundtrackPlayback) != null ? ref1.destroy() : void 0;
  }
  _destroyCurrentDynamicSoundtrack(fadeOutDuration) {
    var previousDynamicSoundtrackComposition, previousDynamicSoundtrackPlayback;
    // Destroy the playback and composition after the fade out and some grace time.
    previousDynamicSoundtrackComposition = this._previousDynamicSoundtrackComposition;
    previousDynamicSoundtrackPlayback = this._previousDynamicSoundtrackPlayback;
    if (!this._previousDynamicSoundtrackComposition) {
      return;
    }
    this._previousDynamicSoundtrackComposition = null;
    this._previousDynamicSoundtrackPlayback = null;
    return Meteor.setTimeout(() => {
      previousDynamicSoundtrackPlayback.destroy();
      return previousDynamicSoundtrackComposition.destroy();
    }, fadeOutDuration * 1100);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"studio":{"studio.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/interface/studio/studio.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI;
AE = Artificial.Everywhere;
AB = Artificial.Base;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Interface.Studio = function () {
  class Studio extends AM.Component {
    static id() {
      return 'PixelArtAcademy.LearnMode.Interface.Studio';
    }
    template() {
      return this.constructor.id();
    }
    static version() {
      return '0.0.1';
    }
    constructor() {
      super(...arguments);
      this.horizontalParallaxFactor = 0;
      this.verticalParallaxFactor = 0.25;
      this.targetFocusPoint = new ReactiveField(this.constructor.FocusPoints.MainMenu);
      this._focusPoint = _.clone(this.targetFocusPoint());
      this.sceneSize = {
        width: 480,
        height: 400
      };
    }
    onRendered() {
      var $element, element;
      super.onRendered(...arguments);
      this.app = this.ancestorComponentOfType(AB.App);
      this.app.addComponent(this);
      this.$scene = this.$('.scene');
      this._parallaxItems = function () {
        var i, len, ref, results;
        ref = this.$('.scene *[data-depth]');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
          $element = $(element);
          results.push({
            $element: $element,
            depth: $element.data('depth'),
            origin: {
              x: $element.data('originX'),
              y: $element.data('originY')
            }
          });
        }
        return results;
      }.call(this);
      this._moveFocusEnabled = false;
      this._moveFocusDuration = 0;
      this._moveFocusTime = 0;
      this._moveFocusCompleteCallback = null;

      // Update scene style when viewport changes.
      return this.autorun(computation => {
        return this._updateSceneStyle();
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.app.removeComponent(this);
    }
    setFocus(targetFocusPoint) {
      this._focusPoint = _.clone(targetFocusPoint);
      this.targetFocusPoint(targetFocusPoint);
      if (!this.isRendered()) {
        return;
      }
      this._moveFocusEnabled = false;
      return this._updateSceneStyle();
    }
    moveFocus(targetFocusPointOrOptions) {
      var duration, speedFactor, targetFocusPoint;
      if (targetFocusPointOrOptions.focusPoint) {
        targetFocusPoint = targetFocusPointOrOptions.focusPoint;
        speedFactor = targetFocusPointOrOptions.speedFactor || 1;
      } else {
        targetFocusPoint = targetFocusPointOrOptions;
        speedFactor = 1;
      }

      // We clamp the focus point so that it won't get clamped later.
      this._startingFocusPoint = this._clampFocusPoint(this._focusPoint);
      this.targetFocusPoint(targetFocusPoint);
      targetFocusPoint = this._clampFocusPoint(targetFocusPoint);
      this._moveFocusDelta = {
        x: targetFocusPoint.x - this._startingFocusPoint.x,
        y: targetFocusPoint.y - this._startingFocusPoint.y
      };
      duration = 0.03 / speedFactor * Math.sqrt(Math.pow(this._moveFocusDelta.x * this.sceneSize.width, 2) + Math.pow(this._moveFocusDelta.y * this.sceneSize.height, 2));
      this._moveFocusEnabled = true;
      this._moveFocusDuration = duration;
      this._moveFocusTime = 0;
      return new Promise((resolve, reject) => {
        return this._moveFocusResolve = resolve;
      });
    }
    _clampFocusPoint(focusPoint) {
      var halfHeight, halfWidth, scale, viewport;
      viewport = LOI.adventure.interface.display.viewport();
      scale = LOI.adventure.interface.display.scale();
      halfWidth = viewport.viewportBounds.width() / scale / 2;
      halfHeight = viewport.viewportBounds.height() / scale / 2;
      return {
        x: _.clamp(focusPoint.x, halfWidth / this.sceneSize.width, (this.sceneSize.width - halfWidth) / this.sceneSize.width),
        y: _.clamp(focusPoint.y, halfHeight / this.sceneSize.height, (this.sceneSize.height - halfHeight) / this.sceneSize.height)
      };
    }
    _updateSceneStyle(parallaxOnly) {
      var focusFactorX, focusFactorY, i, left, len, parallaxItem, ref, results, scale, scrollableHeight, scrollableWidth, top, viewport;
      viewport = LOI.adventure.interface.display.viewport();
      scale = LOI.adventure.interface.display.scale();
      if (!parallaxOnly) {
        this.$('.pixelartacademy-learnmode-interface-studio').css(viewport.viewportBounds.toDimensions());
      }
      scrollableWidth = this.sceneSize.width * scale - viewport.viewportBounds.width();
      scrollableHeight = this.sceneSize.height * scale - viewport.viewportBounds.height();
      focusFactorX = _.clamp((this._focusPoint.x * this.sceneSize.width * scale - viewport.viewportBounds.width() / 2) / scrollableWidth, 0, 1);
      focusFactorY = _.clamp((this._focusPoint.y * this.sceneSize.height * scale - viewport.viewportBounds.height() / 2) / scrollableHeight, 0, 1);
      if (_.isNaN(focusFactorX)) {
        focusFactorX = this._focusPoint.x;
      }
      if (_.isNaN(focusFactorY)) {
        focusFactorY = this._focusPoint.y;
      }
      left = -scrollableWidth * focusFactorX;
      top = -scrollableHeight * focusFactorY;
      this.$scene.css("transform", "translate3d(".concat(left, "px, ").concat(top, "px, 0)"));
      ref = this._parallaxItems;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        parallaxItem = ref[i];
        left = (parallaxItem.origin.x - focusFactorX) * parallaxItem.depth * scrollableWidth * this.horizontalParallaxFactor;
        top = (parallaxItem.origin.y - focusFactorY) * parallaxItem.depth * scrollableHeight * this.verticalParallaxFactor;
        results.push(parallaxItem.$element.css("transform", "translate3d(".concat(left, "px, ").concat(top, "px, 0)")));
      }
      return results;
    }
    artworkClasses(artworkField) {
      var classes;
      classes = [_.kebabCase(artworkField), 'artwork'];
      return classes.join(' ');
    }
    draw(appTime) {
      var progress;
      if (!this._moveFocusEnabled) {
        return;
      }
      this._moveFocusTime += appTime.elapsedAppTime;
      progress = Math.min(1, this._moveFocusTime / this._moveFocusDuration);
      progress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      this._focusPoint.x = this._startingFocusPoint.x + this._moveFocusDelta.x * progress;
      this._focusPoint.y = this._startingFocusPoint.y + this._moveFocusDelta.y * progress;
      this._updateSceneStyle(true);
      if (progress === 1) {
        this._moveFocusEnabled = false;
        return this._moveFocusResolve();
      }
    }
  }
  ;
  Studio.register(Studio.id());
  Studio.FocusPoints = {
    Play: {
      x: 0.5,
      y: 0
    },
    MainMenu: {
      x: 0.5,
      y: 1
    }
  };
  return Studio;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.studio.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/interface/studio/template.studio.js                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Interface.Studio");
Template["PixelArtAcademy.LearnMode.Interface.Studio"] = new Template("Template.PixelArtAcademy.LearnMode.Interface.Studio", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-interface-studio"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "scene ", Spacebars.mustache(view.lookup("highlightingActiveClass")) ];
    }
  }, HTML.Raw('\n      <div class="studio" data-origin-x="0" data-origin-y="0" data-depth="0"></div>\n      '), HTML.DIV({
    class: "background",
    "data-origin-x": "0",
    "data-origin-y": "0",
    "data-depth": "0"
  }, "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "inAMoment");
    }
  }), HTML.Raw('\n        <div class="drawing-board"></div>\n        '), HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "evilIsLoveSpelledBackwards");
    }
  }), HTML.Raw('\n        <div class="drawing-board-clamps"></div>\n        '), HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "night21");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "withersFamily");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "skogsra");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "kaley");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return [ Spacebars.mustache(view.lookup("artworkClasses"), "aquaticBotanical"), " aquatic-iii aquatic-v botanical-iii botanical-v aquatic-ii botanical-ix" ];
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "cardinalCity");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "cardinalCityTools");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "desert");
    }
  }), "\n      "), HTML.Raw('\n      <div class="easel-left" data-origin-x="0" data-origin-y="0" data-depth="0.1"></div>\n      <div class="table-left" data-origin-x="0" data-origin-y="0" data-depth="0.15"></div>\n      <div class="furniture-midback" data-origin-x="0" data-origin-y="0" data-depth="0.15"></div>\n      <div class="stands" data-origin-x="0" data-origin-y="0" data-depth="0.2"></div>\n      <div class="furniture-middle" data-origin-x="0" data-origin-y="0" data-depth="0.3"></div>\n      '), HTML.DIV({
    class: "furniture-middle-artworks",
    "data-origin-x": "0",
    "data-origin-y": "0",
    "data-depth": "0.3"
  }, "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "inventory");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "survivor");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "day9");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "angel");
    }
  }), "\n      "), HTML.Raw('\n      <div class="tables-front" data-origin-x="0" data-origin-y="1" data-depth="0.9"></div>\n      '), HTML.DIV({
    class: "tables-front-artworks",
    "data-origin-x": "0",
    "data-origin-y": "1",
    "data-depth": "0.9"
  }, "\n        ", HTML.DIV({
    class: function() {
      return Spacebars.mustache(view.lookup("artworkClasses"), "kuria");
    }
  }), "\n        ", HTML.DIV({
    class: function() {
      return [ "neukom-wip-1 neukom-wip-2 neukom-wip-3 ", Spacebars.mustache(view.lookup("artworkClasses"), "neukom") ];
    }
  }), "\n      "), HTML.Raw('\n      <div class="chair-front" data-origin-x="0" data-origin-y="1" data-depth="1"></div>\n    ')), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"content":{"content.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/content.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  LM,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content = function () {
  class Content {
    static getClassForId(id) {
      this._contentClassesUpdatedDependency.depend();
      return this._contentClassesById[id];
    }
    static removeClassForId(id) {
      delete this._contentClassesById[id];
      return this._contentClassesUpdatedDependency.depend();
    }

    // Id string for this content used to identify the content in code.
    static id() {
      throw new AE.NotImplementedException("You must specify content's id.");
    }

    // The type that identifies the content class individual content inherits from.
    static type() {
      return 'Content';
    }

    // String to represent the course in the UI. Note that we can't use
    // 'name' since it's an existing property holding the class name.
    static displayName() {
      throw new AE.NotImplementedException("You must specify the content name.");
    }

    // Override to provide a string that shortly describes the content as seen in the courses preview screen.
    static description() {
      return null;
    }

    // Override to provide tags for this course.
    static tags() {
      return [];
    }

    // Optional instructions how to unlock this content.
    static unlockInstructions() {
      return null;
    }

    // Override to provide any children content classes that are part of this content.
    static contents() {
      return [];
    }
    static availableContents() {
      var content, i, len, ref, ref1, results;
      ref = this.contents();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        if (ref1 = LM.Content.Tags.Future, indexOf.call(content.tags(), ref1) < 0) {
          results.push(content);
        }
      }
      return results;
    }
    static initialize() {
      // Store content class by ID.
      this._contentClassesById[this.id()] = this;
      this._contentClassesUpdatedDependency.changed();
      // On the server, after document observers are started, perform initialization.
      if (Meteor.isServer) {
        return Document.startup(() => {
          var i, len, property, ref, results, translationNamespace, value;
          if (Meteor.settings.startEmpty) {
            return;
          }
          // Create this avatar's translated names.
          translationNamespace = this.id();
          ref = ['displayName', 'description', 'unlockInstructions'];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            property = ref[i];
            value = this[property]();
            if (value != null) {
              results.push(AB.createTranslation(translationNamespace, property, value));
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      }
    }
    static getAdventureInstanceForId(contentId) {
      var chapter, content, episode, i, j, k, len, len1, len2, ref, ref1, ref2;
      ref = LOI.adventure.episodes();
      for (i = 0, len = ref.length; i < len; i++) {
        episode = ref[i];
        ref1 = episode.chapters;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          chapter = ref1[j];
          ref2 = chapter.contents;
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            content = ref2[k];
            if (content.id() === contentId) {
              return content;
            }
          }
        }
      }
      console.warn("Unknown content requested.", contentId);
      return null;
    }
    static getAdventureInstance() {
      return this.getAdventureInstanceForId(this.id());
    }
    constructor(parent) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var base, content, contentClass, i, len, ref, translationNamespace;
      this.parent = parent;
      this.options = options;
      this.course = this.options.course;
      // By default the content is related to the current profile.
      if ((base = this.options).profileId == null) {
        base.profileId = () => {
          return LOI.adventure.profileId();
        };
      }
      // Create all the children contents.
      this._contents = [];
      ref = this.constructor.contents();
      for (i = 0, len = ref.length; i < len; i++) {
        contentClass = ref[i];
        content = new contentClass(this, this.options);
        this._contents.push(content);
      }
      // Subscribe to this content's translations.
      translationNamespace = this.id();
      this._translationSubscription = AB.subscribeNamespace(translationNamespace);
    }
    destroy() {
      this._translationSubscription.stop();
      return this.progress.destroy();
    }
    id() {
      return this.constructor.id();
    }
    type() {
      return this.constructor.type();
    }
    displayName() {
      var fallback, translated;
      translated = AB.translate(this._translationSubscription, 'displayName');
      if (translated.text === 'DISPLAYNAME' || translated.text === 'displayName') {
        try {
          fallback = this.constructor.displayName();
        } catch (error) {
          fallback = null;
        }
        if (fallback === 'DISPLAYNAME' || fallback === 'displayName') {
          return null;
        }
        return fallback;
      }
      return translated.text;
    }
    displayNameTranslation() {
      return AB.translation(this._translationSubscription, 'displayName');
    }
    description() {
      var fallback, translated;
      translated = AB.translate(this._translationSubscription, 'description');
      if (!translated.language || translated.text === 'description') {
        try {
          fallback = this.constructor.description();
        } catch (error) {
          fallback = null;
        }
        if (fallback === 'description') {
          return null;
        }
        return fallback;
      }
      return translated.text;
    }
    descriptionTranslation() {
      return AB.existingTranslation(this._translationSubscription, 'description');
    }
    tags() {
      return this.constructor.tags();
    }
    unlockInstructions() {
      if (!this.constructor.unlockInstructions()) {
        return;
      }
      return AB.translate(this._translationSubscription, 'unlockInstructions').text;
    }
    unlockInstructionsTranslation() {
      if (!this.constructor.unlockInstructions()) {
        return;
      }
      return AB.translation(this._translationSubscription, 'unlockInstructions');
    }
    contents() {
      return this._contents;
    }
    availableContents() {
      var content, i, len, ref, ref1, results;
      ref = this._contents;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        if (ref1 = LM.Content.Tags.Future, indexOf.call(content.tags(), ref1) < 0) {
          results.push(content);
        }
      }
      return results;
    }
    allContents() {
      var content;
      return _.flatten([this, ...function () {
        var i, len, ref, results;
        ref = this._contents;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(content.allContents());
        }
        return results;
      }.call(this)]);
    }
    status() {
      throw new AE.NotImplementedException("Content must provide its status.");
    }
    available() {
      return this.parent.unlocked() && this.status() !== this.constructor.Status.Unavailable;
    }
    unlocked() {
      return this.parent.unlocked() && this.status() === this.constructor.Status.Unlocked;
    }
    locked() {
      return this.parent.locked() || this.status() === this.constructor.Status.Locked;
    }
    completed() {
      if (!this.unlocked()) {
        return;
      }
      return this.progress.completed();
    }
    completedRatio() {
      if (!this.unlocked()) {
        return 0;
      }
      return this.progress.completedRatio();
    }
    requiredCompletedRatio() {
      var base;
      if (!this.unlocked()) {
        return;
      }
      if (this.progress.completed()) {
        return 1;
      }
      return typeof (base = this.progress).requiredCompletedRatio === "function" ? base.requiredCompletedRatio() : void 0;
    }

    // How deep this content is below the course (which is at depth 1).
    depth() {
      var content, depth;
      content = this;
      depth = 1;
      while (!(content instanceof LM.Content.Course)) {
        content = content.parent;
        depth++;
      }
      return depth;
    }
  }
  ;
  Content.Status = {
    Unavailable: 'Unavailable',
    Locked: 'Locked',
    Unlocked: 'Unlocked'
  };
  Content.Tags = {
    WIP: 'WIP',
    Future: 'Future'
  };
  Content._contentClassesById = {};
  Content._contentClassesUpdatedDependency = new Tracker.Dependency();
  return Content;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goalcontent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/goalcontent.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.GoalContent = function () {
  class GoalContent extends LM.Content {
    static type() {
      return 'GoalContent';
    }
    static displayName() {
      return null; // The name will match the goal's name.
    }
    static contents() {
      return this._contents;
    }
    static initialize() {
      var taskClass;
      super.initialize(...arguments);
      return this._contents = function () {
        var i, len, ref, results;
        ref = this.goalClass.tasks();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          taskClass = ref[i];
          results.push((taskClass => {
            var TaskClass, id;
            id = "".concat(this.goalClass.id(), "-").concat(taskClass.id());
            TaskClass = function () {
              class TaskClass extends LM.Content.TaskContent {
                static id() {
                  return id;
                }
              }
              ;
              TaskClass.taskClass = taskClass;
              return TaskClass;
            }.call(this);
            TaskClass.initialize();
            return TaskClass;
          })(taskClass));
        }
        return results;
      }.call(this);
    }
    _goal() {
      return PAA.Learning.Goal.getAdventureInstanceForId(this.constructor.goalClass.id());
    }
    displayName() {
      return this._goal().displayName();
    }
    displayNameTranslation() {
      return this._goal().displayNameTranslation();
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.GoalProgress({
        content: this,
        goalClass: this.constructor.goalClass,
        totalUnits: "tasks"
      });
    }
    status() {
      return LM.Content.Status.Unlocked;
    }
  }
  ;
  GoalContent.goalClass = null; // Override to set which goal this content represents.

  LM.Content.TaskContent = function () {
    class TaskContent extends LM.Content {
      static type() {
        return 'TaskContent';
      }
      static displayName() {
        return null; // The name will match the task's directive.
      }
      static tags() {
        if (this.taskClass.completable()) {
          return [];
        } else {
          return [LM.Content.Tags.Future];
        }
      }
      constructor() {
        super(...arguments);
        this.progress = new LM.Content.Progress.TaskProgress({
          content: this,
          taskClass: this.constructor.taskClass
        });
      }
      status() {
        if (this.constructor.taskClass.completable()) {
          return LM.Content.Status.Unlocked;
        } else {
          return LM.Content.Status.Unavailable;
        }
      }
      _task() {
        return PAA.Learning.Task.getAdventureInstanceForId(this.constructor.taskClass.id());
      }
      displayName() {
        return this._task().directive();
      }
      displayNameTranslation() {
        return this._task().directiveTranslation();
      }
    }
    ;
    TaskContent.taskClass = null;
    return TaskContent;
  }.call(this);
  return GoalContent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"appcontent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/appcontent.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.AppContent = function () {
  class AppContent extends LM.Content {
    static type() {
      return 'AppContent';
    }
    static displayName() {
      return this.appClass.fullName();
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ManualProgress({
        content: this,
        completed: () => {
          return true;
        }
      });
    }
  }
  ;
  AppContent.appClass = null; // Override to set which app this content represents.

  return AppContent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawingtutorialcontent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/drawingtutorialcontent.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.DrawingTutorialContent = function () {
  class DrawingTutorialContent extends LM.Content {
    static type() {
      return 'DrawingTutorialContent';
    }
    static displayName() {
      return this.tutorialClass.fullName();
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Content.Progress.ManualProgress({
        content: this,
        units: "steps",
        completed: () => {
          return this.constructor.tutorialClass.completed();
        },
        unitsCount: () => {
          return this.constructor.tutorialClass.assetsCount();
        },
        completedUnitsCount: () => {
          return this.constructor.tutorialClass.completedAssetsCount();
        },
        completedRatio: () => {
          return this.constructor.tutorialClass.completedRatio();
        },
        requiredUnitsCount: () => {
          return this.constructor.tutorialClass.requiredAssetsCount();
        },
        requiredCompletedUnitsCount: () => {
          return this.constructor.tutorialClass.requiredCompletedAssetsCount();
        },
        requiredCompletedRatio: () => {
          return this.constructor.tutorialClass.requiredCompletedRatio();
        }
      });
    }
    status() {
      return LM.Content.Status.Unlocked;
    }
  }
  ;
  DrawingTutorialContent.tutorialClass = null; // Override to set which tutorial this content represents.

  return DrawingTutorialContent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetcontent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/assetcontent.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.AssetContent = function () {
  class AssetContent extends LM.Content {
    static type() {
      return 'AssetContent';
    }
    static displayName() {
      return null; // The name will match the asset's name.
    }
    constructor() {
      var assetTranslationNamespace;
      super(...arguments);

      // Stop previous translation and subscribe to the asset directly.
      assetTranslationNamespace = this.constructor.assetClass.id();
      this._assetTranslationSubscription = AB.subscribeNamespace(assetTranslationNamespace);
      this.progress = new LM.Content.Progress.ProjectAssetProgress({
        content: this,
        project: this.constructor.projectClass,
        asset: this.constructor.assetClass
      });
    }
    destroy() {
      super.destroy(...arguments);
      return this._assetTranslationSubscription.stop();
    }
    displayName() {
      return AB.translate(this._assetTranslationSubscription, 'displayName').text;
    }
    displayNameTranslation() {
      return AB.translation(this._assetTranslationSubscription, 'displayName');
    }
  }
  ;
  AssetContent.projectClass = null; // Override which project this asset belongs to.

  AssetContent.assetClass = null; // Override which project asset this sprite is.

  return AssetContent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"futurecontent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/futurecontent.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.FutureContent = class FutureContent extends LM.Content {
  static tags() {
    return [LM.Content.Tags.Future];
  }
  constructor() {
    super(...arguments);
    this.progress = new LM.Content.Progress.ManualProgress({
      content: this,
      completed: () => {
        return false;
      }
    });
  }
  status() {
    return LM.Content.Status.Unavailable;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"course.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/course.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  LM,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Course = function () {
  class Course {
    static getClassForId(id) {
      this._courseClassesUpdatedDependency.depend();
      return this._courseClassesById[id];
    }
    static removeClassForId(id) {
      delete this._courseClassesById[id];
      return this._courseClassesUpdatedDependency.depend();
    }
    static getClasses() {
      this._courseClassesUpdatedDependency.depend();
      return _.values(this._courseClassesById);
    }

    // Id string for this course used to identify the course in code.
    static id() {
      throw new AE.NotImplementedException("You must specify course's id.");
    }

    // String to represent the course in the UI. Note that we can't use
    // 'name' since it's an existing property holding the class name.
    static displayName() {
      throw new AE.NotImplementedException("You must specify the course name.");
    }

    // Override to provide a string that shortly describes the content as seen in the courses preview/progress screen.
    static description() {
      throw new AE.NotImplementedException("You must specify the course description.");
    }

    // Override to provide tags for this course.
    static tags() {
      return [];
    }

    // Override to provide content classes that are included in this course.
    static contents() {
      return [];
    }
    static availableContents() {
      var content, i, len, ref, ref1, results;
      ref = this.contents();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        if (ref1 = LM.Content.Tags.Future, indexOf.call(content.tags(), ref1) < 0) {
          results.push(content);
        }
      }
      return results;
    }
    static initialize() {
      // Store course class by ID.
      this._courseClassesById[this.id()] = this;
      this._courseClassesUpdatedDependency.changed();
      // On the server, after document observers are started, perform initialization.
      if (Meteor.isServer) {
        return Document.startup(() => {
          var i, len, property, ref, results, translationNamespace;
          if (Meteor.settings.startEmpty) {
            return;
          }
          // Create this course's translated names.
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
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var base, content, contentClass, i, len, ref, translationNamespace;
      this.options = options;
      // By default the content is related to the current profile.
      if ((base = this.options).profileId == null) {
        base.profileId = () => {
          return LOI.adventure.profileId();
        };
      }
      this.options.course = this;
      // Create all the contents.
      this._contents = [];
      ref = this.constructor.contents();
      for (i = 0, len = ref.length; i < len; i++) {
        contentClass = ref[i];
        content = new contentClass(this, this.options);
        this._contents.push(content);
      }
      // Subscribe to this course's translations.
      translationNamespace = this.id();
      this._translationSubscription = AB.subscribeNamespace(translationNamespace);
      this.progress = new LM.Content.Progress.ContentProgress({
        content: this
      });
    }
    destroy() {
      var content, i, len, ref, results;
      this._translationSubscription.stop();
      this.progress.destroy();
      ref = this._contents;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        results.push(content.destroy());
      }
      return results;
    }
    id() {
      return this.constructor.id();
    }
    type() {
      return 'Course';
    }
    displayName() {
      var fallback, translated;
      translated = AB.translate(this._translationSubscription, 'displayName');
      if (translated.text === 'DISPLAYNAME' || translated.text === 'displayName') {
        try {
          fallback = this.constructor.displayName();
        } catch (error) {
          fallback = null;
        }
        if (fallback === 'DISPLAYNAME' || fallback === 'displayName') {
          return null;
        }
        return fallback;
      }
      return translated.text;
    }
    displayNameTranslation() {
      return AB.translation(this._translationSubscription, 'displayName');
    }
    description() {
      var fallback, translated;
      translated = AB.translate(this._translationSubscription, 'description');
      if (!translated.language || translated.text === 'description') {
        try {
          fallback = this.constructor.description();
        } catch (error) {
          fallback = null;
        }
        if (fallback === 'description') {
          return null;
        }
        return fallback;
      }
      return translated.text;
    }
    descriptionTranslation() {
      return AB.translation(this._translationSubscription, 'description');
    }
    tags() {
      return this.constructor.tags();
    }
    contents() {
      return this._contents;
    }
    availableContents() {
      var content, i, len, ref, ref1, results;
      ref = this._contents;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        if (ref1 = LM.Content.Tags.Future, indexOf.call(content.tags(), ref1) < 0) {
          results.push(content);
        }
      }
      return results;
    }
    allContents() {
      var content;
      return _.flatten(function () {
        var i, len, ref, results;
        ref = this._contents;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(content.allContents());
        }
        return results;
      }.call(this));
    }
    available() {
      var ref;
      return ref = LM.Content.Tags.Future, indexOf.call(this.tags(), ref) < 0; // TODO: Add purchased status
    }
    unlocked() {
      var ref;
      return ref = LM.Content.Tags.Future, indexOf.call(this.tags(), ref) < 0; // TODO: Add purchased status
    }
    locked() {
      var ref;
      return ref = LM.Content.Tags.Future, indexOf.call(this.tags(), ref) >= 0; // TODO: Add purchased status
    }
    completed() {
      return this.progress.completed();
    }
    completedRatio() {
      return this.progress.completedRatio();
    }

    // The course is at the top of the content hierarchy.
    depth() {
      return 1;
    }
  }
  ;
  Course.Status = {
    Unavailable: 'Unavailable',
    Available: 'Available',
    Purchased: 'Purchased'
  };
  Course._courseClassesById = {};
  Course._courseClassesUpdatedDependency = new Tracker.Dependency();
  return Course;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tags.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/tags.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Tags = function () {
  class Tags {
    static id() {
      return 'PixelArtAcademy.LearnMode.Content.Tags';
    }
    static getDisplayNameForKey(key) {
      return this._getTranslationForKey(key, 'displayName');
    }
    static getDescriptionForKey(key) {
      return this._getTranslationForKey(key, 'description');
    }
    static _getTranslationForKey(key, property) {
      return AB.translate(this._translationSubscription, "".concat(key, ".").concat(property)).text;
    }
    static initialize(translations) {
      var translationNamespace;
      translationNamespace = this.id();
      // On the server, after document observers are started, perform initialization.
      if (Meteor.isServer) {
        Document.startup(() => {
          var property, results, tag, tagTranslations, value;
          if (Meteor.settings.startEmpty) {
            return;
          }
          // Create translations.
          results = [];
          for (tag in translations) {
            tagTranslations = translations[tag];
            results.push(function () {
              var results1;
              results1 = [];
              for (property in tagTranslations) {
                value = tagTranslations[property];
                results1.push(AB.createTranslation(translationNamespace, "".concat(tag, ".").concat(property), value));
              }
              return results1;
            }());
          }
          return results;
        });
      }
      // On the client, subscribe to the translations.
      if (Meteor.isClient) {
        return this._translationSubscription = AB.subscribeNamespace(translationNamespace);
      }
    }
  }
  ;
  Tags.Free = 'Free';
  Tags.BaseGame = 'BaseGame';
  Tags.DLC = 'DLC';
  Tags.WIP = 'WIP';
  Tags.Future = 'Future';
  return Tags;
}.call(this);
LM.Content.Tags.initialize({
  Free: {
    displayName: "免费",
    description: "此课程作为游戏演示免费提供。"
  },
  BaseGame: {
    displayName: "基础游戏",
    description: "此课程包含在游戏基础版本中。"
  },
  DLC: {
    displayName: "DLC",
    description: "此课程可作为下载内容购买。"
  },
  DLCAppStore: {
    displayName: "DLC",
    description: "此课程可作为应用内购买。"
  },
  WIP: {
    displayName: "开发中",
    description: "此内容目前正在开发中。拥有 alpha 访问权限的玩家可以在未完成状态下体验。"
  },
  Future: {
    displayName: "未来",
    description: "此内容计划在未来开发。其设计将随工作进展而变化。"
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"progress":{"progress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/progress.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress = class Progress {
  constructor(options) {
    var base;
    this.options = options;
    this.content = this.options.content;
    // By default the progress is related to the current profile.
    if ((base = this.options).profileId == null) {
      base.profileId = () => {
        return LOI.adventure.profileId();
      };
    }
    // Automatically update the progress entry after initialization has finished.
    Meteor.setTimeout(() => {
      if (this._destroyed) {
        return;
      }
      return this._upsertEntryAutorun = Tracker.autorun(computation => {
        var completedRatio, completedUnitsCount, entry, existingEntry, requiredCompletedRatio, requiredCompletedUnitsCount, selector;
        if (!LOI.adventureInitialized()) {
          return;
        }
        // Only do it for currently active profile.
        if (this.options.profileId() !== LOI.adventure.profileId()) {
          return;
        }
        // Only do it when active.
        if (!this.active()) {
          return;
        }
        // Only make an entry if there was any progress.
        if (!(completedRatio = this.completedRatio())) {
          return;
        }
        selector = {
          contentId: this.content.id(),
          profileId: this.options.profileId()
        };
        existingEntry = LM.Content.Progress.Entry.documents.findOne(selector);
        if ((existingEntry != null ? existingEntry.completedRatio : void 0) === completedRatio) {
          return;
        }
        entry = _.extend({
          lastEditTime: new Date(),
          completedRatio: completedRatio
        }, selector);
        if (completedUnitsCount = typeof this.completedUnitsCount === "function" ? this.completedUnitsCount() : void 0) {
          entry.completedUnitsCount = completedUnitsCount;
        }
        if (requiredCompletedRatio = typeof this.requiredCompletedRatio === "function" ? this.requiredCompletedRatio() : void 0) {
          entry.requiredCompletedRatio = requiredCompletedRatio;
        }
        if (requiredCompletedUnitsCount = typeof this.requiredCompletedRatio === "function" ? this.requiredCompletedRatio() : void 0) {
          entry.requiredCompletedUnitsCount = requiredCompletedUnitsCount;
        }
        return LM.Content.Progress.Entry.documents.upsert(selector, entry);
      });
    });
  }
  destroy() {
    var ref;
    if ((ref = this._upsertEntryAutorun) != null) {
      ref.stop();
    }
    return this._destroyed = true;
  }
  completed() {
    throw new AE.NotImplementedException("Progress must provide if the content has been completed or not.");
  }
  completedRatio() {
    throw new AE.NotImplementedException("Progress must provide the ratio towards full completion of the content.");
  }
  totalUnits() {
    return this.options.totalUnits || this.options.units;
  }
  requiredUnits() {
    return this.options.requiredUnits || this.options.units;
  }
  entry() {
    return this.constructor.Entry.documents.findOne({
      contentId: this.content.id(),
      profileId: this.options.profileId()
    });
  }
  weight() {
    return this.options.weight || 1;
  }
  active() {
    // Content needs to be available and unlocked.
    if (!(this.content.available() && this.content.unlocked())) {
      return;
    }
    // Progress is active until it is 100%.
    return this.completedRatio() < 1;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"manualprogress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/manualprogress.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress.ManualProgress = class ManualProgress extends LM.Content.Progress {
  constructor(options) {
    super(...arguments);
    this.options = options;
  }
  completed() {
    return this.options.completed();
  }

  // Total units
  unitsCount() {
    return _.propertyValue(this.options, 'unitsCount');
  }
  completedUnitsCount() {
    var base;
    return typeof (base = this.options).completedUnitsCount === "function" ? base.completedUnitsCount() : void 0;
  }
  completedRatio() {
    var completedUnitsCount, unitsCount;
    if (this.options.completedRatio) {
      return this.options.completedRatio();
    }
    completedUnitsCount = this.completedUnitsCount();
    unitsCount = this.unitsCount();
    if (completedUnitsCount != null && unitsCount != null) {
      return completedUnitsCount / unitsCount;
    } else {
      if (this.options.completed()) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  // Required units
  requiredUnitsCount() {
    return _.propertyValue(this.options, 'requiredUnitsCount');
  }
  requiredCompletedUnitsCount() {
    var base, ref;
    return (ref = typeof (base = this.options).requiredCompletedUnitsCount === "function" ? base.requiredCompletedUnitsCount() : void 0) != null ? ref : this.completedUnitsCount();
  }
  requiredCompletedRatio() {
    var requiredCompletedUnitsCount, requiredUnitsCount;
    if (this.options.requiredCompletedRatio) {
      return this.options.requiredCompletedRatio();
    }
    requiredCompletedUnitsCount = this.requiredCompletedUnitsCount();
    requiredUnitsCount = this.requiredUnitsCount();
    if (!(requiredCompletedUnitsCount != null && requiredUnitsCount != null)) {
      return;
    }
    return requiredCompletedUnitsCount / requiredUnitsCount;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unitprogress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/unitprogress.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress.UnitProgress = class UnitProgress extends LM.Content.Progress {
  constructor(options) {
    super(...arguments);
    this.options = options;
  }
  completed() {
    if (this.requiredUnitsCount()) {
      return this.requiredCompletedUnitsCount() >= this.requiredUnitsCount();
    }
    return this.completedUnitsCount() > this.unitsCount();
  }

  // Total units
  unitsCount() {
    return _.propertyValue(this.options, 'unitsCount');
  }
  completedUnitsCount() {
    return this.options.completedUnitsCount();
  }
  completedRatio() {
    return this.completedUnitsCount() / this.unitsCount();
  }

  // Required units
  requiredUnitsCount() {
    return _.propertyValue(this.options, 'requiredUnitsCount');
  }
  requiredCompletedUnitsCount() {
    var base, ref;
    return (ref = typeof (base = this.options).requiredCompletedUnitsCount === "function" ? base.requiredCompletedUnitsCount() : void 0) != null ? ref : this.options.completedUnitsCount();
  }
  requiredCompletedRatio() {
    if (this.requiredUnitsCount()) {
      return this.requiredCompletedUnitsCount() / this.requiredUnitsCount();
    } else {
      return null;
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contentprogress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/contentprogress.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress.ContentProgress = class ContentProgress extends LM.Content.Progress {
  constructor(options) {
    var content;
    super(...arguments);
    this.options = options;
    this._weights = function () {
      var i, len, ref, results;
      ref = this.content.availableContents();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        results.push(content.progress.weight());
      }
      return results;
    }.call(this);
  }
  completed() {
    var content;
    return _.every(function () {
      var i, len, ref, results;
      ref = this.content.availableContents();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        results.push(content.completed());
      }
      return results;
    }.call(this));
  }

  // Total units
  unitsCount() {
    var content;
    if (this.options.recursive || this.options.totalRecursive) {
      return _.sum(function () {
        var base, i, len, ref, results;
        ref = this.content.availableContents();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(typeof (base = content.progress).unitsCount === "function" ? base.unitsCount() : void 0);
        }
        return results;
      }.call(this));
    } else {
      return this.content.availableContents().length;
    }
  }
  completedUnitsCount() {
    var content;
    if (this.options.recursive || this.options.totalRecursive) {
      return _.sum(function () {
        var base, i, len, ref, results;
        ref = this.content.availableContents();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(typeof (base = content.progress).completedUnitsCount === "function" ? base.completedUnitsCount() : void 0);
        }
        return results;
      }.call(this));
    } else {
      return _.filter(this.content.availableContents(), content => {
        return content.completed();
      }).length;
    }
  }
  completedRatio() {
    var content;
    if (this.options.recursive || this.options.totalRecursive) {
      return this.completedUnitsCount() / this.unitsCount();
    } else {
      return this._weightedAverage(function () {
        var i, len, ref, results;
        ref = this.content.availableContents();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(content.completedRatio() || 0);
        }
        return results;
      }.call(this));
    }
  }

  // Required units
  requiredUnitsCount() {
    var content;
    if (this.options.recursive || this.options.requiredRecursive) {
      return _.sum(function () {
        var base, i, len, ref, results;
        ref = this.content.availableContents();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(typeof (base = content.progress).requiredUnitsCount === "function" ? base.requiredUnitsCount() : void 0);
        }
        return results;
      }.call(this));
    } else {
      return this.content.availableContents().length;
    }
  }
  requiredCompletedUnitsCount() {
    var content;
    if (this.options.recursive || this.options.requiredRecursive) {
      return _.sum(function () {
        var base, i, len, ref, results;
        ref = this.content.availableContents();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(typeof (base = content.progress).requiredCompletedUnitsCount === "function" ? base.requiredCompletedUnitsCount() : void 0);
        }
        return results;
      }.call(this));
    } else {
      return _.filter(this.content.availableContents(), content => {
        return content.completed();
      }).length;
    }
  }
  requiredCompletedRatio() {
    var content;
    if (this.options.recursive || this.options.requiredRecursive) {
      return this.requiredCompletedUnitsCount() / this.requiredUnitsCount();
    } else {
      return this._weightedAverage(function () {
        var i, len, ref, results;
        ref = this.content.availableContents();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          content = ref[i];
          results.push(content.requiredCompletedRatio() || 0);
        }
        return results;
      }.call(this));
    }
  }
  _weightedAverage(values) {
    var i, index, len, totalValue, totalWeight, value, weight;
    totalWeight = 0;
    totalValue = 0;
    for (index = i = 0, len = values.length; i < len; index = ++i) {
      value = values[index];
      if (!(value != null)) {
        continue;
      }
      weight = this._weights[index];
      totalValue += value * weight;
      totalWeight += weight;
    }
    return totalValue / totalWeight;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goalprogress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/goalprogress.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress.GoalProgress = class GoalProgress extends LM.Content.Progress {
  constructor(options) {
    super(...arguments);
    this.options = options;
  }
  completed() {
    var ref;
    // The goal can be completed (with optional tasks left) or all the
    // completable tasks are completed (when the goal can't be completed).
    return ((ref = this._goal()) != null ? ref.completed() : void 0) || this.completedRatio() === 1;
  }
  _goal() {
    return PAA.Learning.Goal.getAdventureInstanceForId(this.options.goalClass.id());
  }

  // Total units
  unitsCount() {
    var ref;
    return (ref = this._goal()) != null ? ref.completableTasks().length : void 0;
  }
  completedUnitsCount() {
    var ref;
    return _.filter((ref = this._goal()) != null ? ref.tasks() : void 0, function (task) {
      return task.completed();
    }).length;
  }
  completedRatio() {
    return this.completedUnitsCount() / this.unitsCount();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"taskprogress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/taskprogress.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress.TaskProgress = class TaskProgress extends LM.Content.Progress {
  constructor(options) {
    super(...arguments);
    this.options = options;
  }
  completed() {
    var ref;
    return (ref = this._task()) != null ? ref.completed() : void 0;
  }
  _task() {
    return PAA.Learning.Task.getAdventureInstanceForId(this.options.taskClass.id());
  }

  // Total units
  completedRatio() {
    if (this.completed()) {
      return 1;
    } else {
      return 0;
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"projectassetprogress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/projectassetprogress.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress.ProjectAssetProgress = class ProjectAssetProgress extends LM.Content.Progress {
  constructor(options) {
    super(...arguments);
    this.options = options;
  }
  completed() {
    var asset, bitmap, project, projectId;
    if (!(projectId = this.options.project.state('activeProjectId'))) {
      return;
    }
    if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
      return;
    }
    if (!(asset = _.find(project.assets, asset => {
      return asset.id === this.options.asset.id();
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

  // Total units
  completedRatio() {
    if (this.completed()) {
      return 1;
    } else {
      return 0;
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"entry.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/content/progress/entry.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Content.Progress.Entry = function () {
  // An entry that is created or updated when a player makes progress in course content.
  // Note that these are public documents and should contain no sensitive information.
  class Entry extends AM.Document {
    static id() {
      return 'PixelArtAcademy.LearnMode.Content.Progress.Entry';
    }
  }
  ;

  // profileId: the profile that made progress
  // lastEditTime: the time when progress was made
  // contentId: content ID of the course content this is an entry for
  // completedRatio: progress ratio towards fully completing this content
  // completedUnitsCount: optional number of units completed in this content
  // requiredCompletedRatio: optional progress ratio towards completing just the requirements of this content
  // requiredCompletedUnitsCount: optional number of required units completed in this content
  Entry.Meta({
    name: Entry.id()
  });
  Entry.enablePersistence();
  return Entry;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"menu":{"menu.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/menu.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Menu = class Menu {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"items":{"items.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/items/items.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, Persistence;
AE = Artificial.Everywhere;
AB = Artificial.Base;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
LM.Menu.Items = function () {
  class Items extends LOI.Components.Menu.Items {
    template() {
      return 'PixelArtAcademy.LearnMode.Menu.Items';
    }
    constructor() {
      super(...arguments);
      this.progress = new LM.Menu.Progress();
    }
    onCreated() {
      super.onCreated(...arguments);

      // On desktop we have to ask the window for its full-screen status.
      if (Meteor.isDesktop) {
        this._isFullscreen = new ReactiveField(false);
        // Listen to fullscreen changes.
        Desktop.on('window', 'isFullscreen', (event, isFullscreen) => {
          this._isFullscreen(isFullscreen);
          return LOI.settings.graphics.preferFullscreen.value(isFullscreen);
        });

        // Request initial value.
        return Desktop.send('window', 'isFullscreen');
      }
    }
    continueVisible() {
      var profileId;
      if (!this.options.landingPage) {
        // Continue is visible when we're not on the landing page and if there is a last loaded game.
        return true;
      }
      if (!(profileId = localStorage.getItem(LOI.adventure.constructor.lastLoadedProfileIdLocalStorageKey))) {
        return;
      }
      return Persistence.Profile.documents.findOne(profileId);
    }
    loadVisible() {
      var loadGame;
      // Load game in Learn Mode is visible only on the landing page if there are any profiles to load.
      loadGame = LOI.adventure.menu.loadGame;
      return this.options.landingPage && loadGame.isCreated() && loadGame.profiles();
    }
    progressVisible() {
      // Progress is shown when we're not on the landing page.
      return !this.options.landingPage;
    }
    isFullscreen() {
      if (Meteor.isDesktop) {
        return this._isFullscreen();
      } else {
        return super.isFullscreen(...arguments);
      }
    }
    inGameMusicOutput() {
      return LOI.settings.audio.inGameMusicOutput.value();
    }
    inLocationMusicVolumeDecrease() {
      return 1 - LOI.settings.audio.inLocationMusicVolume.value();
    }
    inLocationMusicBandpassQ() {
      return LOI.settings.audio.inLocationMusicBandpassQ.value();
    }
    extrasVisible() {
      // Extras are visible only on the landing page.
      return this.options.landingPage;
    }
    quitToMenuVisible() {
      // We quit to menu when we're not on the landing page.
      return !this.options.landingPage;
    }
    events() {
      return super.events(...arguments).concat({
        // Main menu
        'click .main-menu .progress': this.onClickMainMenuProgress,
        'click .main-menu .extras': this.onClickMainMenuExtras,
        'click .main-menu .quit-to-menu': this.onClickMainMenuQuitToMenu,
        // Display
        'click .display .fullscreen': this.onClickDisplayFullscreen,
        // Audio
        'click .audio .in-game-music': this.onClickAudioInGameMusic,
        'click .audio .music-effects-settings': this.onClickAudioMusicEffectsSettings,
        // Music effects settings
        'input .music-effects-settings .in-location-music-volume-decrease': this.onInputMusicEffectsSettingsInLocationMusicVolumeDecrease,
        'input .music-effects-settings .in-location-music-bandpass-q': this.onInputMusicEffectsSettingsInLocationMusicBandpassQ,
        'click .music-effects-settings .back-to-audio': this.onClickMusicEffectsSettingsBackToAudio,
        // Extras
        'click .extras .courses': this.onClickExtrasCourses,
        'click .extras .credits': this.onClickExtrasCredits,
        'click .extras .back-to-menu': this.onClickExtrasBackToMenu
      });
    }
    async onClickMainMenuContinue(event) {
      var profileId;
      if (this.options.landingPage) {
        LOI.adventure.interface.startWaiting();
        // Load last loaded game.
        if (!(profileId = localStorage.getItem(LOI.adventure.constructor.lastLoadedProfileIdLocalStorageKey))) {
          return;
        }
        if (LOI.debug) {
          console.log("Loading last loaded profile ID", profileId);
        }
        return await LOI.adventure.interface.goToPlay(profileId);
      } else {
        return LOI.adventure.menu.hideMenu();
      }
    }
    onClickMainMenuNew(event) {
      LOI.adventure.interface.startWaiting();
      return LOI.adventure.startNewGame().then(() => {
        return LOI.adventure.interface.goToPlay();
      });
    }
    onClickMainMenuProgress(event) {
      return this.progress.show();
    }
    onClickMainMenuExtras(event) {
      return this.currentScreen(this.constructor.Screens.Extras);
    }
    onClickMainMenuQuitToMenu(event) {
      var dialog;
      // Check if the profile is being synced.
      if (LOI.adventure.profile().hasSyncing()) {
        return this._quitGame();
      } else {
        // Notify the player that they will lose the current game state.
        dialog = new LOI.Components.Dialog({
          message: "如果不保存就退出，你将失去当前的游戏进度。",
          buttons: [{
            text: "退出",
            value: true
          }, {
            text: "取消"
          }]
        });
        return LOI.adventure.showActivatableModalDialog({
          dialog: dialog,
          callback: () => {
            if (dialog.result) {
              return this._quitGame();
            }
          }
        });
      }
    }
    _quitGame() {
      LOI.adventure.interface.startWaiting();
      LOI.adventure.menu.hideMenu();
      LOI.adventure.deactivateActiveItem();
      LOI.adventure.interface.quitting(true);
      return Meteor.setTimeout(() => {
        return LOI.adventure.quitGame({
          callback: () => {
            LOI.adventure.interface.goToMainMenu();
            LOI.adventure.interface.quitting(false);

            // Notify that we've handled the quitting sequence.
            return true;
          }
        });
      }, 500);
    }
    onClickMainMenuQuit(event) {
      if (Meteor.isDesktop) {
        return Desktop.send('desktop', 'closeApp');
      }
    }
    onClickMainMenuFullscreen(event) {
      var fullscreen;
      if (Meteor.isDesktop) {
        fullscreen = !this._isFullscreen();
        Desktop.send('window', 'setFullscreen', fullscreen);
        this._isFullscreen(fullscreen);
        LOI.settings.graphics.preferFullscreen.value(fullscreen);
      } else {
        super.onClickMainMenuFullscreen(...arguments);
      }

      // Do a late UI resize to accommodate any fullscreen transitions.
      return Meteor.setTimeout(() => {
        return LOI.adventure.interface.resize();
      }, 1000);
    }
    onClickDisplayFullscreen(event) {
      // Act the same as the main menu fullscreen button.
      return this.onClickMainMenuFullscreen(event);
    }
    onClickAudioInGameMusic(event) {
      var value;
      switch (LOI.settings.audio.inGameMusicOutput.value()) {
        case LOI.Settings.Audio.InGameMusicOutput.Dynamic:
          value = LOI.Settings.Audio.InGameMusicOutput.InLocation;
          break;
        case LOI.Settings.Audio.InGameMusicOutput.InLocation:
          value = LOI.Settings.Audio.InGameMusicOutput.Direct;
          break;
        case LOI.Settings.Audio.InGameMusicOutput.Direct:
          value = LOI.Settings.Audio.InGameMusicOutput.Dynamic;
      }
      return LOI.settings.audio.inGameMusicOutput.value(value);
    }
    onClickAudioMusicEffectsSettings(event) {
      return this.currentScreen(this.constructor.Screens.MusicEffectsSettings);
    }
    onInputMusicEffectsSettingsInLocationMusicVolumeDecrease(event) {
      var value;
      value = parseFloat($(event.target).val());
      return LOI.settings.audio.inLocationMusicVolume.value(1 - value);
    }
    onInputMusicEffectsSettingsInLocationMusicBandpassQ(event) {
      var value;
      value = parseFloat($(event.target).val());
      return LOI.settings.audio.inLocationMusicBandpassQ.value(value);
    }
    onClickMusicEffectsSettingsBackToAudio(event) {
      return this.currentScreen(this.constructor.Screens.Audio);
    }
    onClickSettingsBackToMenu(event) {
      return this.currentScreen(this.constructor.Screens.MainMenu);
    }
    onClickExtrasCourses(event) {
      return this.progress.show();
    }
    onClickExtrasCredits(event) {
      return LM.Menu.Credits.show();
    }
    onClickExtrasBackToMenu(event) {
      return this.goToMainMenu();
    }
  }
  ;
  Items.register('PixelArtAcademy.LearnMode.Menu.Items');
  return Items;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.items.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/items/template.items.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Items");
Template["PixelArtAcademy.LearnMode.Menu.Items"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Items", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-menu-items landsofillusions-components-menu-items"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inMainMenu"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "main-menu menu"
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("continueVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="continue actionable">继续</span></li>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("newVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="new actionable">开始新游戏</span></li>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("loadVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="load actionable">载入游戏</span></li>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isBrowser"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Fullscreen"));
      }), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("progressVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="progress actionable">进度</span></li>\n        ');
    }), HTML.Raw('\n        <li class="menu-item"><span class="settings actionable">设置</span></li>\n        '), Blaze.If(function() {
      return Spacebars.call(view.lookup("extrasVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="extras actionable">额外内容</span></li>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("quitToMenuVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="quit-to-menu actionable">退出到菜单</span></li>\n        ');
    }, function() {
      return [ "\n          ", Blaze.If(function() {
        return Spacebars.call(view.lookup("isElectron"));
      }, function() {
        return HTML.Raw('\n            <li class="menu-item"><span class="quit actionable">退出</span></li>\n          ');
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inSettings"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "settings menu"
    }, HTML.Raw('\n        <!-- li class="language menu-item">\n          Language: English\n        </li -->\n        <li class="menu-item"><span class="actionable display">显示</span></li>\n        <li class="menu-item"><span class="actionable audio">音频</span></li>\n        <li class="menu-item"><span class="actionable controls">操控</span></li>\n        '), Blaze.If(function() {
      return Spacebars.call(view.lookup("isBrowser"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="actionable permissions">权限</span></li>\n        ');
    }), HTML.Raw('\n        <li class="menu-item"><span class="back-to-menu actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inDisplay"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "display menu"
    }, "\n        ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("isBrowser"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Fullscreen"));
      }), "\n        " ];
    }), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "GraphicsScale"));
    }), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "CRTEmulation"));
    }), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "SlowCPUEmulation"));
    }), HTML.Raw('\n        <li class="menu-item"><span class="back-to-settings actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inAudio"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "audio menu"
    }, "\n        ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "enabled actionable"
    }, "\n          音频：\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("audioEnabled"), "On");
    }, function() {
      return "开启";
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("audioEnabled"), "Fullscreen");
    }, function() {
      return "全屏时";
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("audioEnabled"), "Off");
    }, function() {
      return "关闭";
    }), "\n        ")), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "VolumeControls"));
    }), "\n        ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "in-game-music actionable"
    }, "\n          音乐效果：\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("inGameMusicOutput"), "Dynamic");
    }, function() {
      return "自动";
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("inGameMusicOutput"), "InLocation");
    }, function() {
      return "收音机";
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("inGameMusicOutput"), "Direct");
    }, function() {
      return "关闭";
    }), "\n        ")), HTML.Raw('\n        <li class="menu-item"><span class="music-effects-settings actionable">音乐效果设置</span></li>\n        <li class="menu-item"><span class="back-to-settings actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inMusicEffectsSettings"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "music-effects-settings menu"
    }, "\n        ", HTML.LI({
      class: "menu-item"
    }, "\n          收音机效果音量降低：", HTML.INPUT({
      class: "in-location-music-volume-decrease",
      type: "range",
      min: "0",
      max: "0.7",
      step: "0.05",
      value: function() {
        return Spacebars.mustache(view.lookup("inLocationMusicVolumeDecrease"));
      }
    }), "\n        "), "\n        ", HTML.LI({
      class: "menu-item"
    }, "\n          收音机效果频率降低：", HTML.INPUT({
      class: "in-location-music-bandpass-q",
      type: "range",
      min: "0",
      max: "0.5",
      step: "0.05",
      value: function() {
        return Spacebars.mustache(view.lookup("inLocationMusicBandpassQ"));
      }
    }), "\n        "), HTML.Raw('\n        <li class="menu-item"><span class="back-to-audio actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inControls"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "controls menu"
    }, "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "RightClick"));
    }), HTML.Raw('\n        <li class="menu-item"><span class="back-to-settings actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inExtras"));
  }, function() {
    return HTML.Raw('\n      <ul class="extras menu">\n        <li class="menu-item"><span class="courses actionable">路线图</span></li>\n        <li class="menu-item"><a class="actionable" href="https://discord.gg/mngNfvTwG6" target="_blank">加入 Discord</a></li>\n        <li class="menu-item"><span class="credits actionable">制作人员</span></li>\n        <li class="menu-item"><span class="back-to-menu actionable">返回</span></li>\n      </ul>\n    ');
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permissions"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"extras":{"extras.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/extras/extras.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, Persistence;
AE = Artificial.Everywhere;
AB = Artificial.Base;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
LM.Menu.Extras = function () {
  class Extras extends LOI.Components.Menu.Items {}
  ;
  Extras.register('PixelArtAcademy.LearnMode.Menu.Extras');
  return Extras;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.extras.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/extras/template.extras.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Extras");
Template["PixelArtAcademy.LearnMode.Menu.Extras"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Extras", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-menu-extras"
  }, "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("currentProfile"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "landsofillusions-components-savesystem profile"
    }, "\n        ", HTML.DIV({
      class: function() {
        return [ "floppy ", Spacebars.mustache(view.lookup("syncedStorageClasses")) ];
      }
    }, HTML.Raw('\n          <div class="shutter"></div>\n          '), HTML.DIV({
      class: "label"
    }, "\n            ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "LoadGame", "SaveGameName"));
    }), "\n          "), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"progress":{"progress.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/progress.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, PAA;
AB = Artificial.Base;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Menu.Progress = function () {
  var i, len, ref, url;
  class Progress extends AM.Component {
    static id() {
      return 'PixelArtAcademy.LearnMode.Menu.Progress';
    }
    static inGameUrl() {
      return 'progress';
    }
    static inPreviewUrl() {
      return 'courses';
    }
    static version() {
      return '0.1.0';
    }
    static completionDisplayType() {
      return this.state('completionDisplayType') || this.CompletionDisplayTypes.RequiredUnits;
    }
    template() {
      return this.constructor.id();
    }
    mixins() {
      return [this.activatable];
    }
    constructor() {
      super(...arguments);
      this.activatable = new LOI.Components.Mixins.Activatable();
    }
    inGame() {
      return LOI.adventure.profileId();
    }
    inPreview() {
      return !this.inGame();
    }
    url() {
      if (this.inGame()) {
        return this.constructor.inGameUrl();
      } else {
        return this.constructor.inPreviewUrl();
      }
    }
    show() {
      return LOI.adventure.showActivatableModalDialog({
        dialog: this
      });
    }
    onDeactivate(finishedDeactivatingCallback) {
      return Meteor.setTimeout(() => {
        return finishedDeactivatingCallback();
      }, 500);
    }
    courses() {
      var chapter, courses, episode;
      if (!LOI.adventureInitialized()) {
        return;
      }
      if (this.inPreview()) {
        // Show all courses.
        courses = function () {
          var j, len1, ref1, results;
          ref1 = LOI.adventure.episodes();
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            episode = ref1[j];
            results.push(function () {
              var k, len2, ref2, results1;
              ref2 = episode.chapters;
              results1 = [];
              for (k = 0, len2 = ref2.length; k < len2; k++) {
                chapter = ref2[k];
                results1.push(chapter.courses);
              }
              return results1;
            }());
          }
          return results;
        }();
        return _.flattenDeep(courses);
      } else {
        // Show only accessible courses.
        return _.flatten(function () {
          var j, len1, ref1, results;
          ref1 = LOI.adventure.currentChapters();
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            chapter = ref1[j];
            results.push(chapter.courses);
          }
          return results;
        }());
      }
    }
  }
  ;
  Progress.register(Progress.id());
  Progress.CompletionDisplayTypes = {
    RequiredUnits: 'RequiredUnits',
    TotalPercentage: 'TotalPercentage'
  };
  Progress.stateAddress = new LOI.StateAddress("things.".concat(Progress.id()));
  Progress.state = new LOI.StateObject({
    address: Progress.stateAddress
  });
  ref = [Progress.inGameUrl(), Progress.inPreviewUrl()];
  for (i = 0, len = ref.length; i < len; i++) {
    url = ref[i];
    LOI.Adventure.registerDirectRoute("/".concat(url), () => {
      if (!_.find(LOI.adventure.modalDialogs(), modalDialog => {
        return modalDialog.dialog instanceof LM.Menu.Progress;
      })) {
        // Route to progress unless progress is already shown. Note that a progress instance is created both from the main
        // adventure menu items as well as from the Learn Mode main menu, which creates a variant of the menu for the
        // landing page.
        return LOI.adventure.menu.items.progress.show();
      }
    });
  }
  Progress.Completionist = function () {
    class Completionist extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Checkbox;
      }
      load() {
        return LM.Menu.Progress.state('completionDisplayType') === LM.Menu.Progress.CompletionDisplayTypes.TotalPercentage;
      }
      save(value) {
        return LM.Menu.Progress.state('completionDisplayType', value ? LM.Menu.Progress.CompletionDisplayTypes.TotalPercentage : LM.Menu.Progress.CompletionDisplayTypes.RequiredUnits);
      }
    }
    ;
    Completionist.register('PixelArtAcademy.LearnMode.Menu.Progress.Completionist');
    return Completionist;
  }.call(this);
  return Progress;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.progress.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/template.progress.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Progress");
Template["PixelArtAcademy.LearnMode.Menu.Progress"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Progress", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-menu-progress"
  }, "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
  }, function() {
    return "\n    ";
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "viewport-area"
    }, "\n        ", HTML.DIV({
      class: "progress-area"
    }, "\n          ", HTML.DIV({
      class: "courses-area"
    }, HTML.Raw('\n            <h1 class="title">课程</h1>\n            '), Blaze.If(function() {
      return Spacebars.call(view.lookup("inPreview"));
    }, function() {
      return HTML.Raw('\n              <div class="preview-description">\n                <p>\n                  这是已发布课程的概览以及未来课程的大致路线图。\n                  设计将随着开发进展而变化。\n                </p>\n                <p>由于新内容的开发高度不可预测，因此不提供时间估计。\n                  本游戏主要由一人开发，\n                  所以请期待缓慢但稳定的进展。\n                </p>\n                <p>\n                  点击预览按钮以了解每个课程的更多信息。\n                </p>\n              </div>\n            ');
    }), "\n            ", HTML.UL({
      class: "courses contents"
    }, "\n              ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("courses"));
    }, function() {
      return [ "\n                ", HTML.LI({
        class: "course content"
      }, Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content"));
      })), "\n              " ];
    }), "\n            "), "\n          "), "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("inGame"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: "settings"
      }, HTML.Raw('\n              <h1 class="title">设置</h1>\n              '), HTML.LABEL({
        class: "completionist",
        title: "显示向难以捉摸的100%迈进的进度。"
      }, "\n                ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Completionist"));
      }), HTML.Raw('\n                <span class="label">启用完成主义模式</span>\n              ')), "\n            "), "\n          " ];
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"content":{"content.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/content/content.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  LM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Base;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Menu.Progress.Content = function () {
  class Content extends AM.Component {
    static id() {
      return 'PixelArtAcademy.LearnMode.Menu.Progress.Content';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.progress = this.ancestorComponentOfType(LM.Menu.Progress);
      return this.contentsDisplayed = new ReactiveField(this._defaultContentsDisplayed());
    }
    onRendered() {
      super.onRendered(...arguments);
      // Automatically update whether the contents are displayed when completion display type changes until changed manually.
      this._automaticContentDisplayedUpdateAutorun = this.autorun(computation => {
        var content;
        content = this.data();
        if (!content.contents().length) {
          return;
        }
        // Depend on completion display type.
        LM.Menu.Progress.completionDisplayType();
        return Tracker.nonreactive(() => {
          return this._setContentsDisplayed(this._defaultContentsDisplayed(), 1);
        });
      });

      // Set initial fully-displayed class.
      this.$contents = this.$('.contents').eq(0);
      if (this.contentsDisplayed()) {
        return this.$contents.addClass('fully-displayed');
      }
    }
    _defaultContentsDisplayed() {
      var content, ref;
      // Never automatically show content in preview mode.
      if (this.progress.inPreview()) {
        return;
      }

      // Don't automatically show future content.
      content = this.data();
      if (ref = LM.Content.Tags.Future, indexOf.call(content.tags(), ref) >= 0) {
        return;
      }
      switch (LM.Menu.Progress.completionDisplayType()) {
        case LM.Menu.Progress.CompletionDisplayTypes.RequiredUnits:
          return content.unlocked() && !content.completed();
        case LM.Menu.Progress.CompletionDisplayTypes.TotalPercentage:
          return content.unlocked() && content.completedRatio() < 1;
      }
    }
    _setContentsDisplayed(newContentsDisplayed, durationFactor) {
      var currentContentsDisplayed, currentHeight, currentVisibleHeight, display, fullHeight, fullVisibleHeight, scale, targetHeight, viewportHeight;
      currentContentsDisplayed = this.contentsDisplayed();
      if (newContentsDisplayed === currentContentsDisplayed) {
        return;
      }
      this.$contents.velocity('stop', true);
      display = LOI.adventure.interface.display;
      scale = display.scale();
      viewportHeight = LOI.adventure.interface.display.viewport().viewportBounds.height();
      fullHeight = this.$contents[0].scrollHeight;
      fullVisibleHeight = Math.min(viewportHeight, fullHeight);
      currentHeight = this.$contents.outerHeight();
      currentVisibleHeight = Math.min(viewportHeight, currentHeight);
      if (currentContentsDisplayed) {
        targetHeight = 0;
      } else {
        targetHeight = fullVisibleHeight;
      }
      this.$contents.removeClass('fully-displayed');
      this.$contents.velocity({
        height: [targetHeight, currentVisibleHeight]
      }, {
        duration: durationFactor * Math.min(500, Math.abs(targetHeight - currentVisibleHeight) / scale * 4),
        complete: () => {
          if (targetHeight > 0) {
            this.$contents.css({
              height: 'auto'
            });
            return this.$contents.addClass('fully-displayed');
          }
        }
      });
      return this.contentsDisplayed(newContentsDisplayed);
    }
    unavailableClass() {
      var content;
      // Only show unavailable status when in game.
      if (!this.progress.inGame()) {
        return;
      }
      content = this.data();
      if (!content.available()) {
        return 'unavailable';
      }
    }
    lockedClass() {
      var content;
      // Only show locked status when in game.
      if (!this.progress.inGame()) {
        return;
      }
      content = this.data();
      if (content.locked()) {
        return 'locked';
      }
    }
    contentDepthClass() {
      var content;
      content = this.data();
      return "depth-".concat(content.depth());
    }
    completedClass() {
      var content;
      content = this.data();
      if (content.completed()) {
        return 'completed';
      }
    }
    contentsDisplayedClass() {
      if (this.contentsDisplayed()) {
        return 'displayed';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .title-area': this.onClickTitleArea
      });
    }
    onClickTitleArea(event) {
      var content, contentDiv, targetContentDiv;
      // Only react to the immediate title.
      contentDiv = this.$('.pixelartacademy-learnmode-menu-progress-content')[0];
      targetContentDiv = this.$(event.target).closest('.pixelartacademy-learnmode-menu-progress-content')[0];
      if (contentDiv !== targetContentDiv) {
        return;
      }
      // Only react if there if we have any contents.
      content = this.data();
      if (!content.contents().length) {
        return;
      }
      // Prevent automatic changes from now on.
      this._automaticContentDisplayedUpdateAutorun.stop();
      // Toggle whether the contents are displayed.
      return this._setContentsDisplayed(!this.contentsDisplayed(), 1);
    }
  }
  ;
  Content.register(Content.id());
  return Content;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.content.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/content/template.content.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Progress.Content");
Template["PixelArtAcademy.LearnMode.Menu.Progress.Content"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Progress.Content", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-learnmode-menu-progress-content ", Spacebars.mustache(view.lookup("unavailableClass")), " ", Spacebars.mustache(view.lookup("lockedClass")), " ", Spacebars.mustache(view.lookup("contentDepthClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "component ", Spacebars.mustache(view.lookup("completedClass")) ];
    }
  }, "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "Course");
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "DefaultContent"));
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "Content");
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "DefaultContent"));
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "AppContent");
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "AppContent"));
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "GoalContent");
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "DefaultContent"));
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "TaskContent");
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "DefaultContent"));
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "DrawingTutorialContent");
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "DefaultContent"));
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "AssetContent");
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "DefaultContent"));
    }), "\n      " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("contents"), "length"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: function() {
        return [ "contents ", Spacebars.mustache(view.lookup("contentsDisplayedClass")) ];
      }
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("contents"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "content"
      }, Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content"));
      })), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Progress.Content.TitleArea");
Template["PixelArtAcademy.LearnMode.Menu.Progress.Content.TitleArea"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Progress.Content.TitleArea", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "title-area ", Spacebars.mustache(view.lookup("hasContentsClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: "title-with-tags"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("depth"), 1);
  }, function() {
    return [ "\n        ", HTML.H1({
      class: "title"
    }, Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    })), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("depth"), 2);
  }, function() {
    return [ "\n        ", HTML.H2({
      class: "title"
    }, Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    })), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("depth"), 3);
  }, function() {
    return [ "\n        ", HTML.H3({
      class: "title"
    }, Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    })), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("depth"), 4);
  }, function() {
    return [ "\n        ", HTML.H4({
      class: "title"
    }, Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    })), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("depth"), 5);
  }, function() {
    return [ "\n        ", HTML.H5({
      class: "title"
    }, Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    })), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("depth"), 6);
  }, function() {
    return [ "\n        ", HTML.H6({
      class: "title"
    }, Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    })), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("tags"), "length"));
  }, function() {
    return [ "\n        ", HTML.UL({
      class: "tags"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("tags"));
    }, function() {
      return [ "\n            ", HTML.LI({
        class: function() {
          return [ "tag ", Spacebars.mustache(view.lookup("tagClass")) ];
        }
      }, "\n              ", Blaze.View("lookup:displayName", function() {
        return Spacebars.mustache(view.lookup("displayName"));
      }), "\n              ", HTML.DIV({
        class: "description"
      }, Blaze.View("lookup:description", function() {
        return Spacebars.mustache(view.lookup("description"));
      })), "\n            "), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showPreview"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "preview ", Spacebars.mustache(view.lookup("previewVisibleClass")) ];
      }
    }, HTML.Raw('\n        <button class="button">预览</button>\n      ')), "\n    " ];
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "Completion"));
    }), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Progress.Content.Completion");
Template["PixelArtAcademy.LearnMode.Menu.Progress.Content.Completion"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Progress.Content.Completion", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("showCompletion"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "completion"
    }, "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("completionistMode"));
    }, function() {
      return [ "\n        ", HTML.SPAN(HTML.Attrs({
        class: "total-percentage"
      }, function() {
        return Spacebars.attrMustache(view.lookup("totalPercentageTitleAttribute"));
      }), "\n          ", Blaze.View("lookup:percentageString", function() {
        return Spacebars.mustache(view.lookup("percentageString"), Spacebars.dot(view.lookup("."), "progress", "completedRatio"));
      }), "\n        "), "\n      " ];
    }, function() {
      return [ "\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("showRequiredUnits"));
      }, function() {
        return [ "\n          ", HTML.SPAN(HTML.Attrs({
          class: "required-units"
        }, function() {
          return Spacebars.attrMustache(view.lookup("requiredUnitsTitleAttribute"));
        }), "\n            ", Blaze.View("lookup:..progress.requiredCompletedUnitsCount", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress", "requiredCompletedUnitsCount"));
        }), "/", Blaze.View("lookup:..progress.requiredUnitsCount", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress", "requiredUnitsCount"));
        }), "\n          "), "\n        " ];
      }), "\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("showCompletedContentsCount"));
      }, function() {
        return [ "\n          ", HTML.SPAN(HTML.Attrs({
          class: "completed-contents-count"
        }, function() {
          return Spacebars.attrMustache(view.lookup("completedContentsCountTitleAttribute"));
        }), "\n            ", Blaze.View("lookup:completedContentsCount", function() {
          return Spacebars.mustache(view.lookup("completedContentsCount"));
        }), "/", Blaze.View("lookup:availableContents.length", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("availableContents"), "length"));
        }), "\n          "), "\n        " ];
      }), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"component.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/content/component.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, PAA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Menu.Progress.Content.Component = class Component extends AM.Component {
  onCreated() {
    super.onCreated(...arguments);
    this.progress = this.ancestorComponentOfType(LM.Menu.Progress);
    this.progressContent = this.ancestorComponentOfType(LM.Menu.Progress.Content);
    return this.tags = new ComputedField(() => {
      var content, i, len, ref, results, tag, translationKey;
      content = this.data();
      ref = content.tags();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        tag = ref[i];
        translationKey = tag;
        if (tag === LM.Content.Tags.DLC && AB.DistributionPlatform.isAppStore) {
          // Apply any translation key overrides.
          translationKey = 'DLCAppStore';
        }
        results.push({
          // Create the tag information.
          tagClass: _.kebabCase(tag),
          displayName: LM.Content.Tags.getDisplayNameForKey(translationKey),
          description: LM.Content.Tags.getDescriptionForKey(translationKey)
        });
      }
      return results;
    });
  }
  hasContentsClass() {
    var content;
    content = this.data();
    if (content.contents().length > 0) {
      return 'has-contents';
    }
  }
  showPreview() {
    var content;
    // Show preview only in the courses preview.
    if (!this.progress.inPreview()) {
      return;
    }

    // Show when the content has any child content.
    content = this.data();
    return content.contents().length;
  }
  previewVisibleClass() {
    if (!this.progressContent.contentsDisplayed()) {
      // The preview text is visible when the content is not expanded.
      return 'visible';
    }
  }
  showCompletion() {
    var content;
    // Only show completion in game.
    if (!this.progress.inGame()) {
      return;
    }
    // Show completion when the content has been unlocked.
    content = this.data();
    return content.unlocked();
  }
  showRequiredUnits() {
    var content;
    content = this.data();
    return content.progress.requiredUnits() && (!content.completed() || content.contents().length);
  }
  showCompletedContentsCount() {
    var content;
    content = this.data();
    return content.contents().length && !this.showRequiredUnits();
  }
  completionistMode() {
    return LM.Menu.Progress.state('completionDisplayType') === LM.Menu.Progress.CompletionDisplayTypes.TotalPercentage;
  }
  totalPercentageTitleAttribute() {
    var base, base1, completedUnitsCount, content, units, unitsCount;
    content = this.data();
    if (!(units = content.progress.totalUnits())) {
      return;
    }
    completedUnitsCount = typeof (base = content.progress).completedUnitsCount === "function" ? base.completedUnitsCount() : void 0;
    unitsCount = typeof (base1 = content.progress).unitsCount === "function" ? base1.unitsCount() : void 0;
    if (!(completedUnitsCount != null && unitsCount != null)) {
      return;
    }
    return {
      title: "".concat(completedUnitsCount, "/").concat(unitsCount, " ").concat(units)
    };
  }
  requiredUnitsTitleAttribute() {
    var base, base1, content, requiredCompletedRatio, requiredCompletedUnitsCount, requiredUnitsCount, units;
    content = this.data();
    if (!(units = content.progress.requiredUnits())) {
      return;
    }
    requiredCompletedUnitsCount = typeof (base = content.progress).requiredCompletedUnitsCount === "function" ? base.requiredCompletedUnitsCount() : void 0;
    requiredUnitsCount = typeof (base1 = content.progress).requiredUnitsCount === "function" ? base1.requiredUnitsCount() : void 0;
    if (!(requiredCompletedUnitsCount != null && requiredUnitsCount != null)) {
      return;
    }
    requiredCompletedRatio = content.progress.requiredCompletedRatio();
    return {
      title: "".concat(requiredCompletedUnitsCount, "/").concat(requiredUnitsCount, " ").concat(units, " (").concat(this.percentageString(requiredCompletedRatio), ")")
    };
  }
  completedContentsCountTitleAttribute() {
    var completedContentsCount, completedRatio, content, contents;
    content = this.data();
    if (!(contents = content.availableContents())) {
      return;
    }
    completedContentsCount = this.completedContentsCount();
    completedRatio = completedContentsCount / contents.length;
    return {
      title: "".concat(completedContentsCount, "/").concat(contents.length, " sections (").concat(this.percentageString(completedRatio), ")")
    };
  }
  percentageString(ratio) {
    return "".concat(Math.floor(ratio * 100), "%");
  }
  completedContentsCount() {
    var content, contents;
    content = this.data();
    if (!(contents = content.availableContents())) {
      return;
    }
    return _.filter(contents, content => {
      return content.completed();
    }).length;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"defaultcontent":{"defaultcontent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/content/defaultcontent/defaultcontent.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, PAA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Menu.Progress.Content.DefaultContent = function () {
  class DefaultContent extends LM.Menu.Progress.Content.Component {
    static id() {
      return 'PixelArtAcademy.LearnMode.Menu.Progress.Content.DefaultContent';
    }
    showUnlockInstructions() {
      var content;
      // Only show when in game.
      if (!this.progress.inGame()) {
        return;
      }

      // Show when locked.
      content = this.data();
      return !content.unlocked();
    }
  }
  ;
  DefaultContent.register(DefaultContent.id());
  return DefaultContent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.defaultcontent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/content/defaultcontent/template.defaultcontent.js       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Progress.Content.DefaultContent");
Template["PixelArtAcademy.LearnMode.Menu.Progress.Content.DefaultContent"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Progress.Content.DefaultContent", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-menu-progress-content-defaultcontent"
  }, "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "TitleArea"));
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("description"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "description"
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("description"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showUnlockInstructions"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("unlockInstructionsTranslation"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "unlock-instructions"
      }, "\n          ", Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("unlockInstructionsTranslation"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      }), "\n        "), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"appcontent":{"appcontent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/content/appcontent/appcontent.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, PAA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Menu.Progress.Content.AppContent = function () {
  class AppContent extends LM.Menu.Progress.Content.Component {
    static id() {
      return 'PixelArtAcademy.LearnMode.Menu.Progress.Content.AppContent';
    }
    iconUrl() {
      var appContent;
      appContent = this.data();
      return appContent.constructor.appClass.iconUrl();
    }
  }
  ;
  AppContent.register(AppContent.id());
  return AppContent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.appcontent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/progress/content/appcontent/template.appcontent.js               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Progress.Content.AppContent");
Template["PixelArtAcademy.LearnMode.Menu.Progress.Content.AppContent"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Progress.Content.AppContent", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-menu-progress-content-appcontent"
  }, "\n    ", HTML.DIV({
    class: "icon-area"
  }, "\n      ", HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("iconUrl"));
    },
    class: "icon"
  }), "\n    "), "\n    ", HTML.DIV({
    class: "info"
  }, "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "Menu", "Progress", "Content", "TitleArea"));
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("progress"), "inGame"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "instructions"
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("unlocked"));
    }, function() {
      return "\n            您已解锁该应用。\n          ";
    }, function() {
      return [ "\n            ", Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("unlockInstructionsTranslation"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      }), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"credits":{"credits.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/credits/credits.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, PAA;
AB = Artificial.Base;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Menu.Credits = function () {
  class Credits extends AM.Component {
    static id() {
      return 'PixelArtAcademy.LearnMode.Menu.Credits';
    }
    static url() {
      return 'credits';
    }
    static version() {
      return '0.1.0';
    }
    static show() {
      return LOI.adventure.showActivatableModalDialog({
        dialog: new LM.Menu.Credits()
      });
    }
    mixins() {
      return [this.activatable];
    }
    constructor() {
      super(...arguments);
      this.activatable = new LOI.Components.Mixins.Activatable();
      this.initialAutoScrollTimeout = 1;
      this.autoScrollTimeout = 0.1;
      this.scrollSpeed = 20; // rem / s
    }
    onCreated() {
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(Artificial.Base.App);
      this.app.addComponent(this);
      return this._autoScrollTimeoutLeft = this.initialAutoScrollTimeout;
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.$creditsArea = this.$('.credits-area');
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.app.removeComponent(this);
    }
    onDeactivate(finishedDeactivatingCallback) {
      return Meteor.setTimeout(() => {
        return finishedDeactivatingCallback();
      }, 500);
    }
    draw(appTime) {
      var scale;
      if (this._autoScrollTimeoutLeft >= 0) {
        this._autoScrollTimeoutLeft -= appTime.elapsedAppTime;
        this._scrollTop = this.$creditsArea.scrollTop();
        return;
      }
      scale = LOI.adventure.interface.display.scale();
      this._scrollTop += this.scrollSpeed * appTime.elapsedAppTime * scale;
      return this.$creditsArea.scrollTop(this._scrollTop);
    }
    events() {
      return super.events(...arguments).concat({
        'wheel': this.onWheel
      });
    }
    onWheel(event) {
      return this._autoScrollTimeoutLeft = this.autoScrollTimeout;
    }
  }
  ;
  Credits.register(Credits.id());
  LOI.Adventure.registerDirectRoute("/".concat(Credits.url()), () => {
    if (!_.find(LOI.adventure.modalDialogs(), modalDialog => {
      return modalDialog.dialog instanceof Credits;
    })) {
      return Credits.show();
    }
  });
  return Credits;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.credits.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/menu/credits/template.credits.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Menu.Credits");
Template["PixelArtAcademy.LearnMode.Menu.Credits"] = new Template("Template.PixelArtAcademy.LearnMode.Menu.Credits", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-menu-credits"
  }, "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
  }, function() {
    return "\n    ";
  }, function() {
    return HTML.Raw('\n      <div class="viewport-area">\n        <div class="credits-area">\n          <div class="credits">\n            <div class="presented-by">\n              <span class="retronator">Retronator</span>\n              呈现\n            </div>\n            <h1>\n              <span class="pixel-art-academy">Pixel Art Academy</span>\n              <span class="learn-mode">学习模式</span>\n            </h1>\n            <h2>制作人</h2>\n            <ul>\n              <li>Matej \'Retro\' Jan</li>\n            </ul>\n            <h2>原创音乐</h2>\n            <ul>\n              <li>Anna Eichenauer</li>\n              <li>Dmitry \'C-jeff\' Zhemkov</li>\n            </ul>\n            <h2>游戏测试</h2>\n            <ul>\n              <li>Johanna Josefsson</li>\n              <li>Rémi Fusade</li>\n              <li>Marie Dudda</li>\n              <li>Anna Eichenauer</li>\n              <li>Henrik Tietjens</li>\n              <li>Hjalte Tagmose</li>\n              <li>Lucas Mayor</li>\n              <li>Brian Kane</li>\n              <li>Mareike Rescheleit</li>\n              <li>zeme</li>\n              <li>Glen Bourgonjon</li>\n              <li>Dan Schumacher</li>\n              <li>Kika Petrović</li>\n              <li>Dr. Julie Rolla</li>\n              <li>Dr. Sarah Al Abdullatif</li>\n              <li>Vee Rose</li>\n              <li>Sean Chilelli</li>\n            </ul>\n            <h2>额外编程</h2>\n            <ul>\n              <li>Objectsforheads</li>\n              <li>Kika Petrović</li>\n            </ul>\n            <h2>额外音乐</h2>\n            <ul>\n              <li class="author-with-details"><span class="author">Extent of the Jam</span><span class="details">musicdisk01</span></li>\n              <li class="author-with-details"><span class="author">glaciære</span><span class="details">shower</span></li>\n              <li class="author-with-details"><span class="author">glaciære</span><span class="details">two months of moments</span></li>\n              <li class="author-with-details"><span class="author">Holizna</span><span class="details">Be Happy With Who You Are</span></li>\n              <li class="author-with-details"><span class="author">HOME</span><span class="details">Resting State</span></li>\n              <li class="author-with-details"><span class="author">Joseph Sacco</span><span class="details">Lostalgia</span></li>\n              <li class="author-with-details"><span class="author">Joseph Sacco</span><span class="details">Shortwave</span></li>\n              <li class="author-with-details"><span class="author">Revolution Void</span><span class="details">The Politics of Desire</span></li>\n              <li class="author-with-details"><span class="author">Shnabubula</span><span class="details">Finding the Groove</span></li>\n              <li class="author-with-details"><span class="author">State Azure</span><span class="details">Stellar Descent</span></li>\n              <li class="author-with-details"><span class="author">Three Chain Links</span><span class="details">Interface</span></li>\n              <li class="author-with-details"><span class="author">Three Chain Links</span><span class="details">The Happiest Days Of Our Lives</span></li>\n            </ul>\n            <h2>额外字体设计</h2>\n            <ul>\n              <li class="author-with-details"><span class="author">Craig Kroeger</span><span class="details">Uni 05, Schoenecker, Italic, Header 8, Header 17</span></li>\n              <li class="author-with-details"><span class="author">Font End Dev</span><span class="details">Pixolde, Typecast</span></li>\n              <li class="author-with-details"><span class="author">Nikos Giannakopoulos</span><span class="details">Acme, Kyrou</span></li>\n              <li class="author-with-details"><span class="author">Marco Milone</span><span class="details">Talk-to-three-headed-monkey</span></li>\n              <li class="author-with-details"><span class="author">maumorgo</span><span class="details">ebook roman</span></li>\n              <li class="author-with-details"><span class="author">Sam Keddy</span><span class="details">Thintel</span></li>\n              <li class="author-with-details"><span class="author">Vasily \'Daymarius\' Draigo</span><span class="details">Pixel Georgia</span></li>\n            </ul>\n            <h2>额外音效</h2>\n            <ul>\n              <li class="author-with-details"><span class="author">Aesterial Arts</span><span class="details">Opening drawer</span></li>\n              <li class="author-with-details"><span class="author">ARodLRU2018</span><span class="details">Shuffling cards, new deck</span></li>\n              <li class="author-with-details"><span class="author">Chris Conlee</span><span class="details">Room tone traffic</span></li>\n              <li class="author-with-details"><span class="author">Chris Douris</span><span class="details">Book open close, book turning pages</span></li>\n              <li class="author-with-details"><span class="author">Chris Warren</span><span class="details">EchoThief Impulse Response Library</span></li>\n              <li class="author-with-details"><span class="author">dark7string</span><span class="details">Magazine opening &amp; closing</span></li>\n              <li class="author-with-details"><span class="author">Dennis Johansson</span><span class="details">Floppy disk drive</span></li>\n              <li class="author-with-details"><span class="author">fbtz</span><span class="details">Small office</span></li>\n              <li class="author-with-details"><span class="author">fthgurdy</span><span class="details">Scissors cutting paper</span></li>\n              <li class="author-with-details"><span class="author">IENBA</span><span class="details">Page turn</span></li>\n              <li class="author-with-details"><span class="author">j1987</span><span class="details">Magazine drop</span></li>\n              <li class="author-with-details"><span class="author">Mari-Anna Lepasson</span><span class="details">Old cassettes</span></li>\n              <li class="author-with-details"><span class="author">sophiehall3535</span><span class="details">Turning pages of a magazine</span></li>\n              <li class="author-with-details"><span class="author">tim.kahn</span><span class="details">Yellowstone boiling mud</span></li>\n              <li class="author-with-details"><span class="author">ToddCircle</span><span class="details">Phone book drop on table and push</span></li>\n            </ul>\n            <h2>技术支持</h2>\n            <ul>\n              <li>Meteor</li>\n              <li>Blaze</li>\n              <li>three.js</li>\n              <li>ammo.js</li>\n              <li>Cordova</li>\n              <li>Electron</li>\n            </ul>\n            <h2>特色艺术家</h2>\n            <ul>\n              <li>Álvaro Farfán</li>\n              <li>Chris Taylor</li>\n              <li>Christina \'castpixel\' Neofotistou</li>\n              <li>Connor Halford</li>\n              <li>Daniel Müller</li>\n              <li>Eigen Lenk</li>\n              <li>ENDESGA</li>\n              <li>Gary Winnick</li>\n              <li>Hjalte Tagmose</li>\n              <li>Isabel \'Erien\' Armentero</li>\n              <li>Jay Ma</li>\n              <li>John L. Magee</li>\n              <li>Jon Keller</li>\n              <li>Locomalito</li>\n              <li>Mati Ernst</li>\n              <li>Miguel \'PixelArtM\' Sánchez</li>\n              <li>Noel Berry</li>\n              <li>Paul \'Pietepiet\' Veer</li>\n              <li>Phil Fish</li>\n              <li>Primož Vovk</li>\n              <li>Ra \'Valenberg\' Mei</li>\n              <li>Ricardo Oyón Rodríguez</li>\n              <li>Robin Poe</li>\n              <li>Roy Nathan de Groot</li>\n              <li>Simon Stafsnes \'Snake\' Andersen</li>\n              <li>Sir John Tenniel</li>\n              <li>Sophie Houlden</li>\n              <li>Susan Kare</li>\n              <li>Terry Cavanagh</li>\n              <li>Thomas van den Berg</li>\n              <li>Tristan Barona</li>\n              <li>Ub Iwerks</li>\n              <li>Weston Tracy</li>\n            </ul>\n            <h2>特色游戏</h2>\n            <ul>\n              <li>4-in-1 Fun Pak, Beam Software, 1992</li>\n              <li>720° (ZX Spectrum), Atari, 1987</li>\n              <li>Advance Wars, Intelligent Systems, 2001</li>\n              <li>Army and Navy, Rock-ola, 1934</li>\n              <li>Atic Atac, Ultimate Play The Game, 1983</li>\n              <li>Ballyhoo, Bally, 1932</li>\n              <li>Battle Chess, Interplay, 1988</li>\n              <li>Big Bank Nite, Rock-ola, 1936</li>\n              <li>Breakshot, Capcom, 1996</li>\n              <li>Bubble Bobble, Taito, 1986</li>\n              <li>Builder Upper, G. M. Laboratories, 1935</li>\n              <li>Bumper, Bally, 1936</li>\n              <li>Cannon Fire Jr., Shyvers, 1934</li>\n              <li>Champion, Bally, 1939</li>\n              <li>Chess – The Turk, James Hutchby, 1983</li>\n              <li>Chessmaster, Ubisoft, 2002</li>\n              <li>Chicago Express, Daval, 1935</li>\n              <li>Colossus Chess 4, CDS Software, 1985–1986</li>\n              <li>Colossus Chess X, CDS Software, 1988</li>\n              <li>Computer Chess, Atari, 1979</li>\n              <li>Cookie, Ultimate Play The Game, 1983</li>\n              <li>Count-Down, Gottlieb, 1979</li>\n              <li>Cyrus, Intelligent Software, 1982–1985</li>\n              <li>Cyrus II Chess, Intelligent Chess Software, 1985–1986</li>\n              <li>Day of the Tentacle, LucasArts, 1993</li>\n              <li>Dizzy, Code Masters, 1987</li>\n              <li>Double \'8\', Stoner, 1934</li>\n              <li>Dragon Quest, Chunsoft, 1986</li>\n              <li>Dynamite Dan, Mirrorsoft, 1985</li>\n              <li>Fast Food (ZX Spectrum), Codemasters, 1989</li>\n              <li>Favorite, Buckley, 1932</li>\n              <li>Fig Chess, Robert &amp; Trevor Figgins, 1985</li>\n              <li>Five Star Final, Gottlieb, 1932</li>\n              <li>Frogger (ColecoVision), Konami, 1983</li>\n              <li>Frogger (Dragon 32/64), Konami, 1983</li>\n              <li>Gold Star, Lindstrom, 1934</li>\n              <li>Good Luck, Genco, 1932</li>\n              <li>Green Beret, Imagine Software, 1986</li>\n              <li>Gridiron, Genco, 1934</li>\n              <li>Head over Heels, Ocean Software, 1987</li>\n              <li>Holywood, Rock-ola, 1936</li>\n              <li>I Ball II, Firebird Software, 1987</li>\n              <li>James Bond 007, Stern, 2022</li>\n              <li>Juggle Ball, Rock-ola, 1932</li>\n              <li>Kirby\'s Dream Land 2, HAL Laboratory, 1995</li>\n              <li>Learn Chess, Ian Cox, 1987</li>\n              <li>Lightning, Exhibit, 1934</li>\n              <li>Major League, PAMCO, 1934</li>\n              <li>Maniac Mansion, Lucasfilm Games, 1987</li>\n              <li>Mega Man 2, Capcom, 1988</li>\n              <li>Metal Slug 1st Mission, Ukiyotei, 1999</li>\n              <li>Microchess, Peter R. Jennings, 1978</li>\n              <li>Microchess 2.0, Micro-Ware, 1978–1981</li>\n              <li>Millionaire, Williams, 1987</li>\n              <li>Monkey Island 2: LeChuck\'s Revenge, LucasArts, 1991</li>\n              <li>Nip-It, Bally, 1973</li>\n              <li>Out Run (ZX Spectrum), Probe Software, 1987</li>\n              <li>OXO, Williams, 1973</li>\n              <li>PAC-MAN, Namco, 1980</li>\n              <li>Peerless, Bally, 1936</li>\n              <li>Peter Beardsley\'s International Football, Grandslam Entertainments, 1988</li>\n              <li>Pokémon Red Version, Game Freak, 1996</li>\n              <li>Psi Chess, Steven L. Watson, 1986</li>\n              <li>Rainbo, Keeney and Sons, 1932</li>\n              <li>Rambler, Bally, 1933</li>\n              <li>Rayman, Ubisoft, 1995</li>\n              <li>Relay, Gottlieb, 1934</li>\n              <li>Rick Dangerous, Firebird Software, 1989</li>\n              <li>Royal Ball, Royal Ball Mfg, 1930s</li>\n              <li>Sam &amp; Max Hit the Road, LucasArts, 1993</li>\n              <li>Sargon, Dan &amp; Kathleen \'Kathe\' Spracklen, 1978–1979</li>\n              <li>Sargon II, Dan &amp; Kathleen \'Kathe\' Spracklen, 1979</li>\n              <li>Sargon III, Dan &amp; Kathleen \'Kathe\' Spracklen, 1984–1988</li>\n              <li>Screwy, Bally, 1932</li>\n              <li>Sega Chess, Probe Software, 1991</li>\n              <li>Sensation, Chicago Coin, 1937</li>\n              <li>Shamrock, Universal Novelty, 1932</li>\n              <li>Signal, Bally, 1934</li>\n              <li>Sir Fred, Made in Spain, 1986</li>\n              <li>Skool Daze, Microsphere, 1984</li>\n              <li>Sky Ride, Genco, 1933</li>\n              <li>Sonic the Hedgehog, Sega, 1991</li>\n              <li>Sonic the Hedgehog 3, Sega, 1994</li>\n              <li>Space Invaders, Taito, 1978</li>\n              <li>Spin-A-Card, Gottlieb, 1969</li>\n              <li>Spit Fire, Genco, 1935</li>\n              <li>Sprint, Bally, 1937</li>\n              <li>Star Lite, Exhibit, 1935</li>\n              <li>Stop the Express, Sinclair Research, 1983</li>\n              <li>Super Mario Bros. 2, Nintendo, 1988</li>\n              <li>Super Mario Bros. 3, Nintendo, 1988</li>\n              <li>Supersonic, Bally, 1979</li>\n              <li>Tetris (Game Boy), Nintendo, 1989</li>\n              <li>The Chessmaster, The Software Toolworks, 1989–1997</li>\n              <li>The Chessmaster 2000, The Software Toolworks, 1986–1990</li>\n              <li>The Chessmaster 3000, The Software Toolworks, 1991</li>\n              <li>The Chessmaster 4000 Turbo, The Software Toolworks, 1993</li>\n              <li>The Legend of Zelda: Link\'s Awakening DX, Nintendo, 1998</li>\n              <li>The Pennant, Bally, 1933</li>\n              <li>The Software Toolworks\' Star Wars Chess, The Software Toolworks, 1993–1994</li>\n              <li>Underwurlde, Ultimate Play The Game, 1984</li>\n              <li>Video Chess, Atari, 1979</li>\n              <li>West Bound, Globe, 1935</li>\n              <li>Wings, Rock-ola, 1933</li>\n              <li>Xenon, Bally, 1980</li>\n              <li>Zaxxon, SEGA, 1982</li>\n              <li>Zelda II: The Adventure of Link, Nintendo, 1987</li>\n            </ul>\n            <h2>特色平台</h2>\n            <ul>\n              <li>Nintendo Entertainment System, Nintendo, 1985</li>\n              <li>PICO-8, Lexaloffle Games, 2015</li>\n              <li>Sega Genesis, Sega, 1989</li>\n              <li>Super Nintendo Entertainment System, Nintendo, 1991</li>\n            </ul>\n            <h2>参考资料</h2>\n            <ul>\n              <li>Codex Gamicus</li>\n              <li>Jeff Frick, History of Pinball</li>\n              <li>Jeff-Z</li>\n              <li>Poly Haven</li>\n              <li>The Sims 4, Maxis, 2014</li>\n              <li>VideoGameArt&amp;Tidbits</li>\n            </ul>\n            <ul>\n              <li class="author-with-details"><span class="author">AlMagno</span><span class="details">Maniac Mansion (Spain)</span></li>\n              <li class="author-with-details"><span class="author">Araon</span><span class="details">Umbrella</span></li>\n              <li class="author-with-details"><span class="author">Bernie Kelm</span><span class="details">Pacific Pinball Museum Panorama</span></li>\n              <li class="author-with-details"><span class="author">Branko Jan</span><span class="details">Rovinj</span></li>\n              <li class="author-with-details"><span class="author">blend.file</span><span class="details">palm tree</span></li>\n              <li class="author-with-details"><span class="author">Chris Ainsworth</span><span class="details">Count-Down pinball machine</span></li>\n              <li class="author-with-details"><span class="author">Cicero Moraes, Michael E. Habicht, Francesco M. Galassi, Elena Varotto, Thiago Beaini</span><span class="details">Pharaoh Tutankhamun reconstruction</span></li>\n              <li class="author-with-details"><span class="author">Claas Augner</span><span class="details">Tivoli game</span></li>\n              <li class="author-with-details"><span class="author">crosathorian</span><span class="details">Bumper pinball part</span></li>\n              <li class="author-with-details"><span class="author">David Broutian</span><span class="details">Alarm Clock</span></li>\n              <li class="author-with-details"><span class="author">denzquix</span><span class="details">Bubble Bobble</span></li>\n              <li class="author-with-details"><span class="author">Digibarn</span><span class="details">Microchess running on Radio Shack TRS-80 microcomputer</span></li>\n              <li class="author-with-details"><span class="author">Donald Bell</span><span class="details">Lucky JuJu Pinball Night</span></li>\n              <li class="author-with-details"><span class="author">EmreAlkan</span><span class="details">Spruce Tree</span></li>\n              <li class="author-with-details"><span class="author">Erica Fischer</span><span class="details">Bumper pinball machine</span></li>\n              <li class="author-with-details"><span class="author">Evan Amos</span><span class="details">NES and SNES controllers</span></li>\n              <li class="author-with-details"><span class="author">evilsarah</span><span class="details">Bumper pinball part</span></li>\n              <li class="author-with-details"><span class="author">Felipe Sanches</span><span class="details">Ball gate</span></li>\n              <li class="author-with-details"><span class="author">Ghazali \'virgodmonkey\' Omar</span><span class="details">Basic Scissors</span></li>\n              <li class="author-with-details"><span class="author">J. N. Squire</span><span class="details">Mickey Mouse Color Stock Poster</span></li>\n              <li class="author-with-details"><span class="author">Jack Delano</span><span class="details">Playing the pinball machine</span></li>\n              <li class="author-with-details"><span class="author">jahofker</span><span class="details">Bumper pinball part</span></li>\n              <li class="author-with-details"><span class="author">Janez J. Starc</span><span class="details">Macintosh 128K</span></li>\n              <li class="author-with-details"><span class="author">Jeff Dahl</span><span class="details">Chess Set</span></li>\n              <li class="author-with-details"><span class="author">KailoKyra</span><span class="details">Rayman - PC - Europe</span></li>\n              <li class="author-with-details"><span class="author">kreems</span><span class="details">Macintosh 128K</span></li>\n              <li class="author-with-details"><span class="author">Marko Tkalčič</span><span class="details">Macintosh 128K</span></li>\n              <li class="author-with-details"><span class="author">Marsel \'PRVXY\' Nadershin</span><span class="details">Panasonic S-XBS</span></li>\n              <li class="author-with-details"><span class="author">MaX3Dd</span><span class="details">Farm House</span></li>\n              <li class="author-with-details"><span class="author">Mike Pacak</span><span class="details">Peerless flyer</span></li>\n              <li class="author-with-details"><span class="author">mohamedhussien</span><span class="details">Potted Plant 04 4k</span></li>\n              <li class="author-with-details"><span class="author">No Swan So Fine</span><span class="details">James Bond pinball machine</span></li>\n              <li class="author-with-details"><span class="author">Patrick Nouhailler</span><span class="details">Sunset in mediterranean</span></li>\n              <li class="author-with-details"><span class="author">Peter R. Jennings</span><span class="details">Microchess</span></li>\n              <li class="author-with-details"><span class="author">Ramon Serrater</span><span class="details">Bicycle</span></li>\n              <li class="author-with-details"><span class="author">Rob Hawkins</span><span class="details">Big Bank Nite ad</span></li>\n              <li class="author-with-details"><span class="author">Ryan Somma</span><span class="details">Roanoke Pinball Museum</span></li>\n              <li class="author-with-details"><span class="author">SCHAAK-MUSEUM</span><span class="details">Selenus chess set</span></li>\n              <li class="author-with-details"><span class="author">Sketch the Cow</span><span class="details">Day Of The Tentacle hint book</span></li>\n              <li class="author-with-details"><span class="author">Studio Alijn</span><span class="details">Tetris, Game Boy</span></li>\n              <li class="author-with-details"><span class="author">Unicode, Inc.</span><span class="details">Miscellaneous Dingbats</span></li>\n              <li class="author-with-details"><span class="author">Wilfredo Rafael Rodriguez Hernandez</span><span class="details">Mickey Mouse svg, Genesis controller</span></li>\n              <li class="author-with-details"><span class="author">zhmdlmag</span><span class="details">Pizza Slice</span></li>\n            </ul>\n            <h2>特别鸣谢</h2>\n            <ul>\n              <li>Jeffrey Chang</li>\n              <li>Reuben Thiessen</li>\n              <li>Dušan Jan</li>\n              <li>Angela Watson</li>\n              <li>James Newnorth</li>\n              <li>S Tran</li>\n              <li>Lou Bagel</li>\n              <li>Brandon James Greer</li>\n              <li>Kickstarter 支持者</li>\n              <li>Patreon 支持者</li>\n              <li>Alpha 测试玩家</li>\n              <li>Steam 抢先体验玩家</li>\n              <li>我的朋友们</li>\n              <li>我的家人</li>\n              <li>Spelkollektivet</li>\n              <li>Stanford Graduate School of Education</li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    ');
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"locations":{"locations.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/locations/locations.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Locations = class Locations {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mainmenu":{"mainmenu.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/locations/mainmenu/mainmenu.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Locations.MainMenu = function () {
  class MainMenu extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.LearnMode.Locations.MainMenu';
    }
    static url() {
      return '';
    }
    static region() {
      return PAA.LearnMode.Region;
    }
    template() {
      return this.constructor.id();
    }
    static version() {
      return '0.0.1';
    }
    static fullName() {
      return "主菜单";
    }
    isLandingPage() {
      return true;
    }
    constructor() {
      super(...arguments);
      this.menuItems = new LM.Menu.Items({
        landingPage: true
      });
    }
    isLandingPage() {
      return true;
    }
    onCreated() {
      super.onCreated(...arguments);

      // Prevent default menu handling on escape.
      LOI.adventure.menu.customShowMenu(() => {}); // Nothing needs to happen as the menu is always displayed.
      return this.visible = new ReactiveField(false);
    }
    onRendered() {
      super.onRendered(...arguments);

      // Reactively resize elements.
      return this.autorun(computation => {
        return this.onResize();
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return LOI.adventure.menu.customShowMenu(null);
    }
    fadeOut() {
      return this.visible(false);
    }
    fadeIn() {
      return this.visible(true);
    }
    visibleClass() {
      if (this.visible()) {
        return 'visible';
      }
    }
    onResize(options) {
      var contentAreaSize, display, headerAreaHeight, menuAreaHeight, menuAreaTop, scale, viewport;
      display = LOI.adventure.interface.display;
      scale = display.scale();
      viewport = display.viewport();
      // The place for content is as wide as the safe area, but fills the full viewport height.
      contentAreaSize = viewport.viewportBounds.toDimensions();
      contentAreaSize.left += viewport.safeArea.x();
      contentAreaSize.width = viewport.safeArea.width();
      this.$('.pixelartacademy-learnmode-locations-mainmenu > .content-area').css(contentAreaSize);

      // Place menu in the center. We use a constant height that will accommodate the main menu and sub-menus.
      menuAreaHeight = 100;
      menuAreaTop = contentAreaSize.height / scale / 2 - menuAreaHeight / 2;
      this.$('.menu-area').css({
        top: "".concat(menuAreaTop, "rem"),
        height: "".concat(menuAreaHeight, "rem"),
        lineHeight: "".concat(menuAreaHeight, "rem")
      });

      // Place header in the top section above the menu
      headerAreaHeight = menuAreaTop;
      return this.$('.header-area').css({
        height: "".concat(headerAreaHeight, "rem"),
        lineHeight: "".concat(headerAreaHeight, "rem")
      });
    }
  }
  ;
  MainMenu.register(MainMenu.id());
  MainMenu.initialize();
  return MainMenu;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.mainmenu.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/locations/mainmenu/template.mainmenu.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.Locations.MainMenu");
Template["PixelArtAcademy.LearnMode.Locations.MainMenu"] = new Template("Template.PixelArtAcademy.LearnMode.Locations.MainMenu", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-learnmode-locations-mainmenu ", Spacebars.mustache(view.lookup("visibleClass")) ];
    }
  }, "\n  ", HTML.DIV({
    class: "content-area"
  }, "\n    ", HTML.DIV({
    class: "header-area"
  }, "\n      ", HTML.DIV({
    class: "header"
  }, HTML.Raw('\n        <h1 class="title">\n          <span class="pixel-art-academy">Pixel Art Academy</span>\n          <span class="learn-mode">学习模式</span>\n        </h1>\n        <div class="by">作者：Matej \'Retro\' Jan</div>\n        '), HTML.IMG({
    class: "retro",
    src: function() {
      return Spacebars.mustache(view.lookup("image"), "/pixelartacademy/landingpage/locations/retropolis/retro.png");
    }
  }), HTML.Raw('\n        <div class="divider">\n        </div>\n      ')), "\n      ", HTML.DIV({
    class: "menu-area"
  }, "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("menuItems"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      "), "\n    "), "\n  "), "\n");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"play":{"play.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/locations/play/play.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Locations.Play = function () {
  class Play extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.LearnMode.Locations.Play';
    }
    static url() {
      return 'play';
    }
    static region() {
      return PAA.LearnMode.Region;
    }
    static version() {
      return '0.0.1';
    }
    static fullName() {
      return "开始游戏";
    }
  }
  ;
  Play.initialize();
  return Play;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"pixelpad":{"pixelpad.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/pixelpad/pixelpad.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, LM, LOI, PAA;
AB = Artificial.Base;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.PixelPad = class PixelPad extends PAA.PixelPad {
  backButtonVisible() {
    return this.os.currentAppUrl();
  }
  backButtonCallback() {
    return () => {
      // If we have focused artworks, we need to close them.
      if (LOI.adventure.interface.focusedArtworks()) {
        LOI.adventure.interface.unfocusArtworks();
      } else if (this.backButtonVisible()) {
        this.os.backButtonCallback();
      } else {
        if (!LOI.adventure.menu.visible()) {
          // When the back button is not visible, we should open the menu (if it's not open already).
          LOI.adventure.menu.showMenu();
        }
      }
      return {
        // Instruct the back button to cancel closing (so it doesn't disappear).
        cancel: true
      };
    };
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"notifications":{"randomnotificationsprovider.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/notifications/randomnotificationsprovider.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.RandomNotificationsProvider = function () {
  class RandomNotificationsProvider extends PAA.PixelPad.Systems.Notifications.Provider {
    static id() {
      return "PixelArtAcademy.LearnMode.RandomNotificationsProvider";
    }
    static registerNotificationClass(notificationClass) {
      return this.notificationIds.push(notificationClass.id());
    }
    availableNotificationIds() {
      if (this._randomNotifications == null) {
        this._randomNotifications = _.shuffle(this.constructor.notificationIds).slice(0, 3);
      }
      return this._randomNotifications;
    }
  }
  ;
  RandomNotificationsProvider.initialize();
  RandomNotificationsProvider.notificationIds = [];
  return RandomNotificationsProvider;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"conditionalnotificationsprovider.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/notifications/conditionalnotificationsprovider.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.ConditionalNotificationsProvider = function () {
  class ConditionalNotificationsProvider extends PAA.PixelPad.Systems.Notifications.Provider {
    static id() {
      return "PixelArtAcademy.LearnMode.ConditionalNotificationsProvider";
    }
    static registerNotificationClass(notificationClass) {
      return this.notificationClasses.push(notificationClass);
    }
    availableNotificationIds() {
      var i, len, notificationClass, notificationIds, ref;
      notificationIds = [];
      ref = this.constructor.notificationClasses;
      for (i = 0, len = ref.length; i < len; i++) {
        notificationClass = ref[i];
        if (notificationClass.condition()) {
          notificationIds.push(notificationClass.id());
        }
      }
      return notificationIds;
    }
  }
  ;
  ConditionalNotificationsProvider.initialize();
  ConditionalNotificationsProvider.notificationClasses = [];
  ConditionalNotificationsProvider.ConditionalNotification = class ConditionalNotification extends PAA.PixelPad.Systems.Notifications.Notification {
    static condition() {
      throw new AE.NotImplementedException("A conditional notification must provide a condition when to display it.");
    }
  };
  return ConditionalNotificationsProvider;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tasknotificationsprovider.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/notifications/tasknotificationsprovider.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LM, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.TaskNotificationsProvider = function () {
  class TaskNotificationsProvider extends PAA.PixelPad.Systems.Notifications.Provider {
    static id() {
      return "PixelArtAcademy.LearnMode.TaskNotificationsProvider";
    }
    availableNotificationIds() {
      var chapter, i, j, len, len1, notificationIds, ref, ref1, task;
      notificationIds = [];
      ref = LOI.adventure.currentChapters();

      // See if any of the active tasks provides a notification.
      for (i = 0, len = ref.length; i < len; i++) {
        chapter = ref[i];
        ref1 = chapter.tasks;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          task = ref1[j];
          if (task.active() && task.activeNotificationId) {
            notificationIds.push(task.activeNotificationId());
          }
        }
      }
      return notificationIds;
    }
  }
  ;
  TaskNotificationsProvider.initialize();
  return TaskNotificationsProvider;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"notifications.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/notifications/notifications.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM, PAA;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
LM.Notifications = function () {
  var quote, quoteId, ref;
  class Notifications {}
  ;

  // Conditional notifications
  Notifications.MoreElementsOfArt = function () {
    class MoreElementsOfArt extends PAA.PixelPad.Systems.Notifications.Notification {
      static id() {
        return "PixelArtAcademy.LearnMode.Notifications.MoreElementsOfArt";
      }
      static message() {
        return "我计划在抢先体验期间添加更多艺术元素。\n\n在此之前，请专注于线条和形状。\n这将为您在处理更难的元素（如明暗和颜色）之前打下基础。";
      }
      static displayStyle() {
        return this.DisplayStyles.IfIdle;
      }
      static condition() {
        // Show when some of the Elements of art: line tasks are completed.
        return PAA.Tutorials.Drawing.ElementsOfArt.Line.completedAssetsCount() > 0;
      }
    }
    ;
    MoreElementsOfArt.initialize();
    LM.ConditionalNotificationsProvider.registerNotificationClass(MoreElementsOfArt);
    return MoreElementsOfArt;
  }.call(this);
  Notifications.ArtworksSection = function () {
    class ArtworksSection extends PAA.PixelPad.Systems.Notifications.Notification {
      static id() {
        return "PixelArtAcademy.LearnMode.Notifications.ArtworksSection";
      }
      static message() {
        return "您现在可以在绘画应用中创建自己的艺术作品。\n\n这个功能非常基础，并不是要取代专业的绘画软件。\n您可以用它来进一步探索像素艺术评估，但请注意，评估本身还处于实验阶段，\n目前仅适用于线条。";
      }
      static displayStyle() {
        return this.DisplayStyles.IfIdle;
      }
      static condition() {
        // Show when the player can create artworks.
        return PAA.PixelPad.Apps.Drawing.canCreateArtworks();
      }
    }
    ;
    ArtworksSection.initialize();
    LM.ConditionalNotificationsProvider.registerNotificationClass(ArtworksSection);
    return ArtworksSection;
  }.call(this);
  Notifications.NoTasks = function () {
    class NoTasks extends LM.ConditionalNotificationsProvider.ConditionalNotification {
      static id() {
        return "PixelArtAcademy.LearnMode.Notifications.NoTasks";
      }
      static message() {
        return "您的待办事项列表是空的！\n\n当您准备好实现新目标时，请使用学习计划应用。";
      }
      static priority() {
        return 3;
      }
      static displayStyle() {
        return this.DisplayStyles.Always;
      }
      static condition() {
        var activeTasks, availableTasks, tasks;
        // Show when no tasks are active, but some are available.
        tasks = LOI.adventure.currentTasks();
        activeTasks = _.filter(tasks, task => {
          return task.active();
        });
        availableTasks = _.filter(tasks, task => {
          return task.available();
        });
        return !activeTasks.length && availableTasks.length;
      }
    }
    ;
    NoTasks.initialize();
    LM.ConditionalNotificationsProvider.registerNotificationClass(NoTasks);
    return NoTasks;
  }.call(this);
  Notifications.TheEnd = function () {
    class TheEnd extends LM.ConditionalNotificationsProvider.ConditionalNotification {
      static id() {
        return "PixelArtAcademy.LearnMode.Notifications.TheEnd";
      }
      static message() {
        return "您已经完成了目前游戏中所有的任务。\n希望您玩得开心，并在此过程中学到一些东西！\n\n虽然游戏处于抢先体验阶段，但目标是不断添加新内容。\n请随时回来看一看。\n\n如果可以的话，请写一篇 Steam 评测，这将非常有帮助。\n非常感谢！";
      }
      static priority() {
        return 2;
      }
      static displayStyle() {
        return this.DisplayStyles.Always;
      }
      static condition() {
        var chapter, course, i, j, len, len1, ref, ref1;
        ref = LOI.adventure.currentChapters();
        // Show when all the courses are completed.
        for (i = 0, len = ref.length; i < len; i++) {
          chapter = ref[i];
          ref1 = chapter.courses;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            course = ref1[j];
            if (!course.completed()) {
              return;
            }
          }
        }
        return true;
      }
    }
    ;
    TheEnd.initialize();
    LM.ConditionalNotificationsProvider.registerNotificationClass(TheEnd);
    return TheEnd;
  }.call(this);

  // Quotes
  Notifications.quotes = {
    DaVinciKnowing: "达芬奇曾说：\"光知道是不够的，我们必须应用。光愿意是不够的，我们必须行动。\"",
    DaVinciBlackCanvas: "达芬奇曾说：\"画家应该用黑色洗刷每一块画布，因为自然界的一切都是黑暗的，除非被光线照亮。\"",
    DaVinciNoDesire: "达芬奇曾说：\"没有欲望的学习会破坏记忆，它什么也留不住。\"",
    DaVinciNeverFinished: "达芬奇曾说：\"艺术永远不会完成，只会被放弃。\"",
    DaVinciScienceArt: "达芬奇曾说：\"学习艺术的科学。学习科学的艺术。发展你的感官——特别是学会如何观察。认识到一切都相互关联。\"",
    ConfuciusDontStop: "孔子曾说：\"不怕慢，就怕站。\"",
    PicassoEveryChild: "毕加索曾说：\"每个孩子都是艺术家。问题是如何在长大后仍然保持艺术家的心。\"",
    PicassoWhyNot: "毕加索曾说：\"别人看到事物的本来面目，问为什么。我看到事物可能的样子，问为什么不。\"",
    PicassoLearnRules: "毕加索曾说：\"像专业人士一样学习规则，这样你才能像艺术家一样打破它们。\"",
    PicassoTomorrow: "毕加索曾说：\"只有那些你愿意死时仍未完成的事，才值得推迟到明天。\"",
    PicassoYoung: "毕加索曾说：\"变年轻需要很长很长的时间。\"",
    PicassoDoing: "毕加索曾说：\"我总是在做我不会做的事，这样我才能学会如何去做。\"",
    PicassoMeaning: "毕加索曾说：\"生命的意义在于发现你的天赋。生命的目的在于将其奉献出去。\"",
    AntoineDeSaintExuperyPerfeection: "圣埃克苏佩里曾说：\"完美不是无可添加，而是无可删减。\"",
    JessicaHischeProcrastinate: "杰西卡·希谢曾说：\"你在拖延时做的工作，可能就是你余生应该做的工作。\"",
    DaliInspires: "达利曾说：\"真正的艺术家不是被启发的人，而是启发他人的人。\"",
    EinsteinImaginationEncirclesTheWorld: "爱因斯坦曾说：\"我足够成为一位艺术家，可以自由地运用我的想象力。想象力比知识更重要。知识是有限的。想象力环绕世界。\"",
    EinsteinImaginationWillGetYouEverywhere: "爱因斯坦曾说：\"逻辑会带你从A到Z；想象力会带你去任何地方。\"",
    EinsteinKeepMoving: "爱因斯坦曾说：\"人生就像骑自行车。要保持平衡，就必须不断前进。\"",
    EinsteinMistake: "爱因斯坦曾说：\"从未犯过错的人，也从未尝试过新事物。\"",
    EinsteinPassion: "爱因斯坦曾说：\"我没有特别的才能。我只是充满好奇。\"",
    GandhiLearn: "甘地曾说：\"像明天就会死去那样生活。像会永远活着那样学习。\"",
    VanGoghPaint: "梵高曾说：\"如果你听到内心有个声音说你不会画画，那就一定要去画，那个声音就会消失。\"",
    TuringImpossible: "图灵曾说：\"那些能够想象任何事物的人，能够创造不可能。\"",
    BramStokerFailure: "布拉姆·斯托克曾说：\"我们从失败中学习，而不是从成功中！\"",
    RichardFeynmannStudy: "理查德·费曼曾说：\"以最不守规矩、最不恭敬、最原创的方式，努力学习你最感兴趣的东西。\"",
    RoyTBennettExperience: "罗伊·T·贝内特曾说：\"有些东西无法被教会；它们必须被体验。只有经历自己的旅程，你才能学到人生中最宝贵的课程。\"",
    SylviaPlathDoubt: "西尔维娅·普拉斯曾说：\"创造力最大的敌人是自我怀疑。\"",
    MayaAngelouCreativity: "玛雅·安杰洛曾说：\"创造力是用不完的。你用得越多，拥有的就越多。\"",
    KenRobinsonCuriosity: "肯·罗宾逊曾说：\"好奇心是成就的引擎。\"",
    HenriMatisseInspiration: "亨利·马蒂斯曾说：\"不要等待灵感。它会在工作时到来。\"",
    WaltDisneyDreams: "华特·迪士尼曾说：\"如果我们有勇气去追求，所有的梦想都能成真。\"",
    WaltDisneyDoing: "华特·迪士尼曾说：\"开始的方法就是停止空谈，开始行动。\"",
    WaltDisneyUnique: "华特·迪士尼曾说：\"你越喜欢自己，就越不像其他人，这让你变得独一无二。\"",
    JohnDeweyReflecting: "约翰·杜威曾说：\"我们不是从经验中学习……我们是从对经验的反思中学习。\"",
    JohnDeweyArt: "约翰·杜威曾说：\"艺术是现存最有效的沟通方式。\"",
    EdCatmullPerfect: "艾德·卡特姆曾说：\"不要等到完美才与他人分享。尽早展示，经常展示。到达终点时会很美，但沿途不会很美。\"",
    EdCatmullFailure: "艾德·卡特姆曾说：\"如果你没有经历失败，那你正在犯一个更严重的错误：你被避免失败的欲望所驱使。\"",
    EdCatmullUnexpected: "艾德·卡特姆曾说：\"如果你只坚持熟悉的事物，就永远不会偶然发现意外。\"",
    EdCatmullCreativity: "艾德·卡特姆曾说：\"我们人类喜欢知道我们要去哪里，但创造力要求我们走那些通向未知之地的道路。\"",
    AlanKayFuture: "艾伦·凯曾说：\"预测未来最好的方式就是创造它。\"",
    AlanWattsEngaged: "艾伦·瓦兹曾说：\"生活的真正秘诀在于——完全投入到你此时此刻正在做的事情中。不要称之为工作，要意识到它是游戏。\"",
    RoaldDahlPlay: "罗尔德·达尔曾说：\"如果你玩游戏，生活会更有趣。\"",
    GeorgeBernardShawPlaying: "萧伯纳曾说：\"我们不是因为变老才停止玩耍；我们是因为停止玩耍才变老。\"",
    BobRossMistakes: "鲍勃·罗斯曾说：\"我们不犯错误，只是有一些快乐的小意外。\"",
    BobRossTalent: "鲍勃·罗斯曾说：\"天赋就是追求的兴趣。任何你愿意练习的事情，你都能做到。\"",
    BobRossBelieving: "鲍勃·罗斯曾说：\"做任何事的秘诀就是相信你能做到。任何你足够相信你能做到的事，你都能做到。任何事。只要你相信。\"",
    ThichNhatHanhReflecting: "一行禅师曾说：\"如果学习之后没有反思和实践，那就不是真正的学习。\""
  };
  ref = Notifications.quotes;
  for (quoteId in ref) {
    quote = ref[quoteId];
    ((quoteId, quote) => {
      return Notifications[quoteId] = function () {
        var _Class;
        _Class = class extends PAA.PixelPad.Systems.Notifications.Notification {
          static id() {
            return "PixelArtAcademy.LearnMode.QuoteNotifications.".concat(quoteId);
          }
          static message() {
            return quote;
          }
          static priority() {
            return -1;
          }
          static retroClassesDisplayed() {
            return {
              face: PAA.PixelPad.Systems.Notifications.Retro.FaceClasses.Peaceful
            };
          }
        };
        _Class.initialize();
        LM.RandomNotificationsProvider.registerNotificationClass(_Class);
        return _Class;
      }.call(Notifications);
    })(quoteId, quote);
  }
  return Notifications;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"compositions":{"compositions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/compositions/compositions.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Compositions = class Compositions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"composition.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/compositions/composition.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc,
  AMe,
  LM,
  LOI,
  ref,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
AEc = Artificial.Echo;
AMe = Artificial.Melody;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
ref = LM.Compositions.Composition = class Composition extends AMe.Composition {
  constructor() {
    super(...arguments);
    this._homeScreenTransitionCondition = this._homeScreenTransitionCondition.bind(this);
    this._tutorialStartTransitionCondition = this._tutorialStartTransitionCondition.bind(this);
    this._tutorialMiddleTransitionCondition = this._tutorialMiddleTransitionCondition.bind(this);
    this._tutorialEndingTransitionCondition = this._tutorialEndingTransitionCondition.bind(this);
  }
  _homeScreenTransitionCondition() {
    var app;
    boundMethodCheck(this, ref);
    if (!(app = this._getCurrentApp())) {
      return;
    }
    return app instanceof PAA.PixelPad.Apps.HomeScreen;
  }
  _tutorialStartTransitionCondition() {
    var drawingAppInfo;
    boundMethodCheck(this, ref);
    if (!(drawingAppInfo = this._getDrawingAppInfo())) {
      return;
    }
    if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
      return;
    }
    return drawingAppInfo.groupProgress < 1 / 3;
  }
  _tutorialMiddleTransitionCondition() {
    var drawingAppInfo, ref1;
    boundMethodCheck(this, ref);
    if (!(drawingAppInfo = this._getDrawingAppInfo())) {
      return;
    }
    if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
      return;
    }
    return 1 / 3 <= (ref1 = drawingAppInfo.groupProgress) && ref1 < 2 / 3;
  }
  _tutorialEndingTransitionCondition() {
    var drawingAppInfo;
    boundMethodCheck(this, ref);
    if (!(drawingAppInfo = this._getDrawingAppInfo())) {
      return;
    }
    if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
      return;
    }
    return 2 / 3 <= drawingAppInfo.groupProgress;
  }
  _getCurrentApp() {
    var pixelPad;
    // When no app is opened, reset the music to default.
    if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
      return;
    }
    return pixelPad.os.currentApp();
  }
  _getDrawingAppInfo() {
    var activeAsset, activeAssetIndex, activeAssets, activeGroup, activeSection, currentApp, drawing, groupProgress, portfolio, ref1, unitIndex, unitsCount;
    if (!(currentApp = this._getCurrentApp())) {
      return;
    }

    // React to drawing app changes.
    if (!(currentApp instanceof PAA.PixelPad.Apps.Drawing)) {
      return;
    }
    drawing = currentApp;

    // Wait until an asset is activated.
    if (!(portfolio = drawing.portfolio())) {
      return;
    }
    if (!(activeAsset = portfolio.activeAsset())) {
      return;
    }

    // See which section we're in and how far along in the group.
    activeSection = portfolio.activeSection();
    activeGroup = _.last(portfolio.activeGroups());
    activeAssets = activeGroup.assets();
    activeAssetIndex = _.findIndex(activeAssets, asset => {
      return asset === activeAsset;
    });
    unitIndex = activeAssets.length - 1 - activeAssetIndex;
    unitsCount = (typeof activeGroup.content === "function" ? (ref1 = activeGroup.content()) != null ? ref1.progress.unitsCount() : void 0 : void 0) || 1;
    groupProgress = unitsCount > 1 ? unitIndex / (unitsCount - 1) : 0;
    return {
      activeAsset,
      activeSection,
      groupProgress
    };
  }
  _drawingCondition() {
    var currentApp, drawing, ref1;
    if (!(currentApp = this._getCurrentApp())) {
      return;
    }
    if (!(currentApp instanceof PAA.PixelPad.Apps.Drawing)) {
      return;
    }
    drawing = currentApp;
    return (ref1 = drawing.editor()) != null ? ref1.drawingActive() : void 0;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelarttools.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/compositions/pixelarttools.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AMe, LM, LOI;
AEc = Artificial.Echo;
AMe = Artificial.Melody;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Compositions.PixelArtTools = class PixelArtTools extends LM.Compositions.Composition {
  constructor() {
    var challengeEndingSection, challengeStartSection, homeScreenSection, introSection, projectSection, sectionA, sectionB, sectionNameA, sectionNameB, transitionConditions, transitioningSections, tutorialEndingSection, tutorialMiddleSection, tutorialStartSection;
    super(...arguments);

    // Intro
    introSection = new AMe.Section(this, {
      duration: 8
    });
    introSection.events = [new AMe.Event.Player(introSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/intro.mp3'
    })];
    this.sections.push(introSection);
    this.initialSection = introSection;

    // Home screen
    homeScreenSection = new AMe.Section(this, {
      duration: 40
    });
    homeScreenSection.events = [new AMe.Event.Player(homeScreenSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/homescreen.mp3'
    })];
    this.sections.push(homeScreenSection);

    // Tutorial start
    tutorialStartSection = new AMe.Section(this, {
      duration: 40
    });
    tutorialStartSection.events = [new AMe.Event.Player(tutorialStartSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/tutorial-start.mp3'
    })];
    this.sections.push(tutorialStartSection);

    // Tutorial middle
    tutorialMiddleSection = new AMe.Section(this, {
      duration: 40
    });
    tutorialMiddleSection.events = [new AMe.Event.Player(tutorialMiddleSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/tutorial-middle.mp3'
    })];
    this.sections.push(tutorialMiddleSection);

    // Tutorial ending
    tutorialEndingSection = new AMe.Section(this, {
      duration: 32
    });
    tutorialEndingSection.events = [new AMe.Event.Player(tutorialEndingSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/tutorial-ending.mp3'
    })];
    this.sections.push(tutorialEndingSection);

    // Challenge start
    challengeStartSection = new AMe.Section(this, {
      duration: 24
    });
    challengeStartSection.events = [new AMe.Event.Player(challengeStartSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/challenge-start.mp3'
    })];
    this.sections.push(challengeStartSection);

    // Challenge ending
    challengeEndingSection = new AMe.Section(this, {
      duration: 32
    });
    challengeEndingSection.events = [new AMe.Event.Player(challengeEndingSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/challenge-ending.mp3'
    })];
    this.sections.push(challengeEndingSection);

    // Project
    projectSection = new AMe.Section(this, {
      duration: 32
    });
    projectSection.events = [new AMe.Event.Player(projectSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/pixelarttools/project.mp3'
    })];
    this.sections.push(projectSection);

    // Create transitions.
    introSection.transitions.push(new AMe.Transition(introSection, {
      nextSection: homeScreenSection
    }));
    challengeStartSection.transitions.push(new AMe.Transition(challengeStartSection, {
      nextSection: challengeEndingSection
    }));
    transitioningSections = {
      intro: introSection,
      homeScreen: homeScreenSection,
      tutorialStart: tutorialStartSection,
      tutorialMiddle: tutorialMiddleSection,
      tutorialEnding: tutorialEndingSection,
      challengeStart: challengeStartSection,
      challengeEnding: challengeEndingSection,
      project: projectSection
    };
    transitionConditions = {
      homeScreen: this._homeScreenTransitionCondition,
      tutorialStart: this._tutorialStartTransitionCondition,
      tutorialMiddle: this._tutorialMiddleTransitionCondition,
      tutorialEnding: this._tutorialEndingTransitionCondition,
      challengeStart: () => {
        var drawingAppInfo;
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        return drawingAppInfo.activeSection.nameKey === PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Challenges;
      },
      project: () => {
        var drawingAppInfo;
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        return drawingAppInfo.activeSection.nameKey === PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Projects;
      }
    };
    for (sectionNameA in transitioningSections) {
      sectionA = transitioningSections[sectionNameA];
      if (sectionA !== challengeStartSection) {
        for (sectionNameB in transitioningSections) {
          sectionB = transitioningSections[sectionNameB];
          if (transitionConditions[sectionNameB]) {
            sectionA.transitions.push(new AMe.Transition(sectionA, {
              nextSection: sectionB,
              condition: transitionConditions[sectionNameB]
            }));
          }
        }
      }
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"elementsofart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/compositions/elementsofart.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc,
  AMe,
  LM,
  LOI,
  indexOf = [].indexOf;
AEc = Artificial.Echo;
AMe = Artificial.Melody;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Compositions.ElementsOfArt = class ElementsOfArt extends LM.Compositions.Composition {
  constructor() {
    var continueDrawingCondition, continueDrawingNotInTutorialsCondition, drawingEnding1Section, drawingEnding2Section, drawingEnding3Section, drawingEnding4Section, drawingEndingSection, drawingMiddleSection, drawingSections, drawingStartSection, homeScreenSection, i, j, k, l, len, len1, len2, len3, mustExitDrawingSection, portfolioNotInTutorialsOrOtherAppsCondition, ref, ref1, ref2, stopDrawingCondition, tutorialEnding1Section, tutorialEnding2Section, tutorialIntroSection, tutorialMiddleSection, tutorialSection, tutorialSections, tutorialStartSection;
    super(...arguments);

    // Home screen
    homeScreenSection = new AMe.Section(this, {
      name: 'Home screen',
      duration: 9.6
    });
    homeScreenSection.events = [new AMe.Event.Player(homeScreenSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/homescreen.mp3'
    })];
    this.sections.push(homeScreenSection);
    this.initialSection = homeScreenSection;

    // Tutorial intro
    tutorialIntroSection = new AMe.Section(this, {
      name: 'Tutorial intro',
      duration: 9.6
    });
    tutorialIntroSection.events = [new AMe.Event.Player(tutorialIntroSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/tutorial-intro.mp3'
    })];
    this.sections.push(tutorialIntroSection);

    // Tutorial start
    tutorialStartSection = new AMe.Section(this, {
      name: 'Tutorial start',
      duration: 19.2
    });
    tutorialStartSection.events = [new AMe.Event.Player(tutorialStartSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/tutorial-start.mp3'
    })];
    this.sections.push(tutorialStartSection);

    // Tutorial middle
    tutorialMiddleSection = new AMe.Section(this, {
      name: 'Tutorial middle',
      duration: 38.4
    });
    tutorialMiddleSection.events = [new AMe.Event.Player(tutorialMiddleSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/tutorial-middle.mp3'
    })];
    this.sections.push(tutorialMiddleSection);

    // Tutorial ending
    tutorialEnding1Section = new AMe.Section(this, {
      name: 'Tutorial ending 1',
      duration: 19.2
    });
    tutorialEnding1Section.events = [new AMe.Event.Player(tutorialEnding1Section, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/tutorial-ending-1.mp3'
    })];
    this.sections.push(tutorialEnding1Section);
    tutorialEnding2Section = new AMe.Section(this, {
      name: 'Tutorial ending 2',
      duration: 19.2
    });
    tutorialEnding2Section.events = [new AMe.Event.Player(tutorialEnding2Section, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/tutorial-ending-2.mp3'
    })];
    this.sections.push(tutorialEnding2Section);

    // Drawing start
    drawingStartSection = new AMe.Section(this, {
      name: 'Drawing start',
      duration: 19.2
    });
    drawingStartSection.events = [new AMe.Event.Player(drawingStartSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/drawing-start.mp3'
    })];
    this.sections.push(drawingStartSection);

    // Drawing middle
    drawingMiddleSection = new AMe.Section(this, {
      name: 'Drawing middle',
      duration: 38.4
    });
    drawingMiddleSection.events = [new AMe.Event.Player(drawingMiddleSection, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/drawing-middle.mp3'
    })];
    this.sections.push(drawingMiddleSection);

    // Drawing ending
    drawingEnding1Section = new AMe.Section(this, {
      name: 'Drawing ending 1',
      duration: 38.4
    });
    drawingEnding1Section.events = [new AMe.Event.Player(drawingEnding1Section, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/drawing-ending-1.mp3'
    })];
    this.sections.push(drawingEnding1Section);
    drawingEnding2Section = new AMe.Section(this, {
      name: 'Drawing ending 2',
      duration: 19.2
    });
    drawingEnding2Section.events = [new AMe.Event.Player(drawingEnding2Section, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/drawing-ending-2.mp3'
    })];
    this.sections.push(drawingEnding2Section);
    drawingEnding3Section = new AMe.Section(this, {
      name: 'Drawing ending 3',
      duration: 38.4
    });
    drawingEnding3Section.events = [new AMe.Event.Player(drawingEnding3Section, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/drawing-ending-3.mp3'
    })];
    this.sections.push(drawingEnding3Section);
    drawingEnding4Section = new AMe.Section(this, {
      name: 'Drawing ending 4',
      duration: 19.2
    });
    drawingEnding4Section.events = [new AMe.Event.Player(drawingEnding4Section, {
      audioUrl: '/pixelartacademy/learnmode/compositions/elementsofart/drawing-ending-4.mp3'
    })];
    this.sections.push(drawingEnding4Section);

    // Create transitions.

    // Transition to home screen.
    // any tutorial -> home screen
    tutorialSections = [tutorialIntroSection, tutorialStartSection, tutorialMiddleSection, tutorialEnding1Section, tutorialEnding2Section];
    for (i = 0, len = tutorialSections.length; i < len; i++) {
      tutorialSection = tutorialSections[i];
      tutorialSection.transitions.push(new AMe.Transition(tutorialSection, {
        nextSection: homeScreenSection,
        condition: this._homeScreenTransitionCondition
      }));
    }

    // Transition to tutorials.
    // home screen -> tutorial intro
    // tutorial intro -> tutorial start
    // tutorial start -> tutorial middle
    // tutorial middle -> tutorial ending 1
    // tutorial ending 1,2 -> tutorial start
    // tutorial ending 1,2 -> tutorial middle
    homeScreenSection.transitions.push(new AMe.Transition(homeScreenSection, {
      nextSection: tutorialIntroSection,
      condition: () => {
        return this._getCurrentApp() instanceof PAA.PixelPad.Apps.Drawing;
      }
    }));
    tutorialIntroSection.transitions.push(new AMe.Transition(tutorialIntroSection, {
      nextSection: tutorialStartSection,
      condition: () => {
        var drawingAppInfo;
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        return drawingAppInfo.activeSection.nameKey === PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials;
      }
    }));
    tutorialStartSection.transitions.push(new AMe.Transition(tutorialStartSection, {
      nextSection: tutorialMiddleSection,
      condition: () => {
        var drawingAppInfo;
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
          return;
        }
        return drawingAppInfo.groupProgress >= 1 / 3;
      }
    }));
    tutorialMiddleSection.transitions.push(new AMe.Transition(tutorialMiddleSection, {
      nextSection: tutorialEnding1Section,
      condition: () => {
        var drawingAppInfo;
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
          return;
        }
        return drawingAppInfo.groupProgress >= 2 / 3;
      }
    }));
    ref = [tutorialEnding1Section, tutorialEnding2Section];
    for (j = 0, len1 = ref.length; j < len1; j++) {
      tutorialSection = ref[j];
      tutorialSection.transitions.push(new AMe.Transition(tutorialSection, {
        nextSection: tutorialMiddleSection,
        condition: () => {
          var drawingAppInfo, ref1;
          if (!(drawingAppInfo = this._getDrawingAppInfo())) {
            return;
          }
          if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
            return;
          }
          return 1 / 3 <= (ref1 = drawingAppInfo.groupProgress) && ref1 < 2 / 3;
        }
      }));
    }
    ref1 = [tutorialEnding1Section, tutorialEnding2Section];
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      tutorialSection = ref1[k];
      tutorialSection.transitions.push(new AMe.Transition(tutorialSection, {
        nextSection: tutorialStartSection,
        condition: () => {
          var drawingAppInfo;
          if (!(drawingAppInfo = this._getDrawingAppInfo())) {
            return;
          }
          if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
            return;
          }
          return drawingAppInfo.groupProgress < 1 / 3;
        }
      }));
    }

    // Auto-advance the tutorial sections.
    // tutorial ending 1 -> tutorial ending 2
    // tutorial ending 2 -> tutorial ending 1
    tutorialEnding1Section.transitions.push(new AMe.Transition(tutorialEnding1Section, {
      nextSection: tutorialEnding2Section
    }));
    tutorialEnding2Section.transitions.push(new AMe.Transition(tutorialEnding2Section, {
      nextSection: tutorialEnding1Section
    }));

    // Transition to and from drawing sections.
    // Tutorial start -> drawing start (when < 1 / 3)
    // Tutorial middle -> drawing middle (when < 2 / 3)
    // Tutorial ending 2 -> drawing ending 1
    // Drawing start -> tutorial start
    // Drawing middle -> tutorial middle
    // Drawing ending 1 -> tutorial ending 1
    // Drawing ending 2 -> tutorial ending 1
    // Drawing ending 3 -> tutorial ending 1
    // Drawing ending 4 -> drawing intro
    drawingSections = [drawingStartSection, drawingMiddleSection, drawingEnding1Section, drawingEnding2Section, drawingEnding3Section, drawingEnding4Section];
    mustExitDrawingSection = new ReactiveField(false);
    this._mustExitDrawingSectionAutorun = Tracker.autorun(() => {
      var currentSection, dynamicSoundtrackPlayback;
      if (!(dynamicSoundtrackPlayback = LOI.adventure.interface.currentDynamicSoundtrackPlayback())) {
        return;
      }
      if (dynamicSoundtrackPlayback.composition !== this) {
        return;
      }
      currentSection = dynamicSoundtrackPlayback.currentSection();
      if (indexOf.call(drawingSections, currentSection) >= 0) {
        if (!this._drawingCondition()) {
          return mustExitDrawingSection(true);
        }
      } else {
        return mustExitDrawingSection(false);
      }
    });
    tutorialStartSection.transitions.push(new AMe.Transition(tutorialStartSection, {
      nextSection: drawingStartSection,
      condition: () => {
        var drawingAppInfo;
        if (!this._drawingCondition()) {
          return;
        }
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
          return;
        }
        return drawingAppInfo.groupProgress < 1 / 3;
      }
    }));
    tutorialMiddleSection.transitions.push(new AMe.Transition(tutorialMiddleSection, {
      nextSection: drawingMiddleSection,
      condition: () => {
        var drawingAppInfo;
        if (!this._drawingCondition()) {
          return;
        }
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
          return;
        }
        return drawingAppInfo.groupProgress < 2 / 3;
      }
    }));
    tutorialEnding2Section.transitions.push(new AMe.Transition(tutorialEnding2Section, {
      nextSection: drawingEnding1Section,
      condition: () => {
        return this._drawingCondition();
      }
    }));
    stopDrawingCondition = () => {
      return !this._drawingCondition() || mustExitDrawingSection();
    };
    drawingStartSection.transitions.push(new AMe.Transition(drawingStartSection, {
      nextSection: tutorialStartSection,
      condition: stopDrawingCondition
    }));
    drawingMiddleSection.transitions.push(new AMe.Transition(drawingMiddleSection, {
      nextSection: tutorialMiddleSection,
      condition: stopDrawingCondition
    }));
    ref2 = [drawingEnding1Section, drawingEnding2Section, drawingEnding3Section];
    for (l = 0, len3 = ref2.length; l < len3; l++) {
      drawingEndingSection = ref2[l];
      drawingEndingSection.transitions.push(new AMe.Transition(drawingEndingSection, {
        nextSection: tutorialEnding1Section,
        condition: stopDrawingCondition
      }));
    }
    drawingEnding4Section.transitions.push(new AMe.Transition(drawingEnding4Section, {
      nextSection: tutorialIntroSection,
      condition: stopDrawingCondition
    }));
    // Auto-advance the drawing sections until drawing has been exited.
    // drawing-start -> drawing-middle (when >= 1 / 3)
    // drawing-middle -> drawing-start
    // drawing-middle -> drawing-ending (when >= 2 / 3)
    // drawing-ending-1 -> drawing-ending-2
    // drawing-ending-2 -> drawing-ending-3
    // drawing-ending-3 -> drawing-ending-4
    // drawing-ending-4 -> drawing-start
    continueDrawingCondition = () => {
      return !mustExitDrawingSection();
    };
    drawingStartSection.transitions.push(new AMe.Transition(drawingStartSection, {
      nextSection: drawingMiddleSection,
      condition: () => {
        var drawingAppInfo;
        if (!continueDrawingCondition()) {
          return;
        }
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
          return;
        }
        return drawingAppInfo.groupProgress >= 1 / 3;
      }
    }));
    drawingMiddleSection.transitions.push(new AMe.Transition(drawingMiddleSection, {
      nextSection: drawingStartSection
    }));
    drawingMiddleSection.transitions.push(new AMe.Transition(drawingMiddleSection, {
      nextSection: drawingEnding1Section,
      condition: () => {
        var drawingAppInfo;
        if (!continueDrawingCondition()) {
          return;
        }
        if (!(drawingAppInfo = this._getDrawingAppInfo())) {
          return;
        }
        if (drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials) {
          return;
        }
        return drawingAppInfo.groupProgress >= 2 / 3;
      }
    }));
    drawingEnding1Section.transitions.push(new AMe.Transition(drawingEnding1Section, {
      nextSection: drawingEnding2Section,
      condition: continueDrawingCondition
    }));
    drawingEnding2Section.transitions.push(new AMe.Transition(drawingEnding2Section, {
      nextSection: drawingEnding3Section,
      condition: continueDrawingCondition
    }));
    drawingEnding3Section.transitions.push(new AMe.Transition(drawingEnding3Section, {
      nextSection: drawingEnding4Section,
      condition: continueDrawingCondition
    }));
    drawingEnding4Section.transitions.push(new AMe.Transition(drawingEnding4Section, {
      nextSection: drawingStartSection,
      condition: continueDrawingCondition
    }));
    // Temporarily reuse the song also for Pixel Art Fundamentals challenges and projects.
    // home screen -> tutorial intro
    // tutorial intro -> tutorial start
    // tutorial start -> tutorial middle
    // tutorial middle -> tutorial ending 1
    // tutorial ending 1 -> tutorial ending 2
    // tutorial ending 2 -> tutorial start
    // drawing-start -> drawing-middle
    // drawing-middle -> tutorial-middle
    portfolioNotInTutorialsOrOtherAppsCondition = () => {
      var currentApp, drawingAppInfo;
      if (drawingAppInfo = this._getDrawingAppInfo()) {
        return drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials;
      } else {
        if (!(currentApp = this._getCurrentApp())) {
          return;
        }
        return !(currentApp instanceof PAA.PixelPad.Apps.HomeScreen);
      }
    };
    homeScreenSection.transitions.push(new AMe.Transition(homeScreenSection, {
      nextSection: tutorialIntroSection,
      condition: portfolioNotInTutorialsOrOtherAppsCondition
    }));
    tutorialIntroSection.transitions.push(new AMe.Transition(tutorialIntroSection, {
      nextSection: tutorialStartSection,
      condition: portfolioNotInTutorialsOrOtherAppsCondition
    }));
    tutorialStartSection.transitions.push(new AMe.Transition(tutorialStartSection, {
      nextSection: tutorialMiddleSection,
      condition: portfolioNotInTutorialsOrOtherAppsCondition
    }));
    tutorialMiddleSection.transitions.push(new AMe.Transition(tutorialMiddleSection, {
      nextSection: tutorialEnding1Section,
      condition: portfolioNotInTutorialsOrOtherAppsCondition
    }));
    tutorialEnding1Section.transitions.push(new AMe.Transition(tutorialEnding1Section, {
      nextSection: tutorialEnding2Section,
      condition: portfolioNotInTutorialsOrOtherAppsCondition
    }));
    tutorialEnding2Section.transitions.push(new AMe.Transition(tutorialEnding2Section, {
      nextSection: tutorialStartSection,
      condition: () => {
        if (!portfolioNotInTutorialsOrOtherAppsCondition()) {
          return;
        }
        return !this._drawingCondition();
      }
    }));
    continueDrawingNotInTutorialsCondition = () => {
      var drawingAppInfo;
      if (!continueDrawingCondition()) {
        return;
      }
      if (!(drawingAppInfo = this._getDrawingAppInfo())) {
        return;
      }
      return drawingAppInfo.activeSection.nameKey !== PAA.PixelPad.Apps.Drawing.Portfolio.Sections.Tutorials;
    };
    drawingStartSection.transitions.push(new AMe.Transition(drawingStartSection, {
      nextSection: drawingMiddleSection,
      condition: continueDrawingNotInTutorialsCondition
    }));
    drawingMiddleSection.transitions.push(new AMe.Transition(drawingMiddleSection, {
      nextSection: tutorialMiddleSection,
      condition: continueDrawingNotInTutorialsCondition
    }));
  }
  destroy() {
    super.destroy(...arguments);
    return this._mustExitDrawingSectionAutorun.stop();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelartfundamentals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode/compositions/pixelartfundamentals.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AMe, LM, LOI;
AEc = Artificial.Echo;
AMe = Artificial.Melody;
LOI = LandsOfIllusions;
LM = PixelArtAcademy.LearnMode;
LM.Compositions.PixelArtFundamentals = class PixelArtFundamentals extends LM.Compositions.Composition {
  constructor() {
    var barDuration, beatDuration, beatsPerMinute, cleanupLessonCondition, createSection, i, j, k, l, len, len1, len10, len2, len3, len4, len5, len6, len7, len8, len9, loopSection, loopSectionIndex, m, n, notDrawingCondition, o, otherLoopSection, otherLoopSectionIndex, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, section, sectionBarCount, sectionBarCounts, sectionGroup, sectionGroupBarCounts, sectionGroupNumber, sectionSuffix, sections, sectionsToTransitionTo4, t;
    super(...arguments);
    beatsPerMinute = 155;
    beatDuration = 60 / beatsPerMinute;
    barDuration = 4 * beatDuration;

    // Create sections.
    sectionBarCounts = {
      1: {
        intro: 10,
        loops: {
          "2a": 16,
          "2b": 16,
          "3a": 16,
          "3b": 16,
          "3c": 16,
          "3d": 16
        }
      },
      2: {
        intro: 12
      },
      3: {
        intro: 4,
        loops: {
          "2": 8,
          "3": 8
        }
      },
      4: {
        intro: 5,
        loops: {
          "2": 12,
          "3": 12,
          "4": 12,
          "5": 12
        }
      }
    };
    createSection = (sectionBarCount, sectionGroupNumber, sectionSuffix) => {
      var section;
      section = new AMe.Section(this, {
        duration: sectionBarCount * barDuration,
        name: "".concat(sectionGroupNumber, "-").concat(sectionSuffix)
      });
      section.events = [new AMe.Event.Player(section, {
        audioUrl: "/pixelartacademy/learnmode/compositions/pixelartfundamentals/".concat(sectionGroupNumber, "-").concat(sectionSuffix, ".mp3")
      })];
      this.sections.push(section);
      return section;
    };
    sections = {};
    for (sectionGroupNumber in sectionBarCounts) {
      sectionGroupBarCounts = sectionBarCounts[sectionGroupNumber];
      sections[sectionGroupNumber] = {
        intro: createSection(sectionGroupBarCounts.intro, sectionGroupNumber, "1"),
        loops: function () {
          var ref, results;
          ref = sectionGroupBarCounts.loops;
          results = [];
          for (sectionSuffix in ref) {
            sectionBarCount = ref[sectionSuffix];
            results.push(createSection(sectionBarCount, sectionGroupNumber, sectionSuffix));
          }
          return results;
        }()
      };
    }
    this.initialSection = sections[1].intro;
    // Create transitions.

    // Transition from intro to loops.
    for (sectionGroupNumber in sections) {
      sectionGroup = sections[sectionGroupNumber];
      ref = sectionGroup.loops;
      for (loopSectionIndex = i = 0, len = ref.length; i < len; loopSectionIndex = ++i) {
        loopSection = ref[loopSectionIndex];
        sectionGroup.intro.transitions.push(new AMe.Transition(sectionGroup.intro, {
          nextSection: loopSection,
          // Prioritize the first loop section.
          priority: loopSectionIndex ? 0 : 1
        }));
      }
    }

    // Transition between loops.
    for (sectionGroupNumber in sections) {
      sectionGroup = sections[sectionGroupNumber];
      ref1 = sectionGroup.loops;
      for (loopSectionIndex = j = 0, len1 = ref1.length; j < len1; loopSectionIndex = ++j) {
        loopSection = ref1[loopSectionIndex];
        ref2 = sectionGroup.loops;
        for (otherLoopSectionIndex = k = 0, len2 = ref2.length; k < len2; otherLoopSectionIndex = ++k) {
          otherLoopSection = ref2[otherLoopSectionIndex];
          if (loopSection !== otherLoopSection) {
            loopSection.transitions.push(new AMe.Transition(loopSection, {
              nextSection: otherLoopSection,
              // Prioritize going to the next section and staying within the section group.
              priority: otherLoopSectionIndex === loopSectionIndex + 1 ? 1 : 0
            }));
          }
        }
      }
    }

    // Transition from 1 loops to 2, 3, and 4.
    for (sectionGroupNumber = l = 2; l <= 4; sectionGroupNumber = ++l) {
      ref3 = sections[1].loops;
      for (m = 0, len3 = ref3.length; m < len3; m++) {
        loopSection = ref3[m];
        loopSection.transitions.push(new AMe.Transition(loopSection, {
          nextSection: sections[sectionGroupNumber].intro
        }));
      }
    }
    // Transition from 2 to 3.
    sections[2].intro.transitions.push(new AMe.Transition(sections[2].intro, {
      nextSection: sections[3].intro,
      // Set a condition to trigger a condition-based decision.
      condition: () => {
        return true;
      }
    }));

    // Transition from 2 to 4 when drawing.
    sections[2].intro.transitions.push(new AMe.Transition(sections[2].intro, {
      nextSection: sections[4].intro,
      // Go to section 4 a third of the time when drawing.
      condition: () => {
        if (!this._drawingCondition()) {
          return;
        }
        return Math.random() < 0.33;
      }
    }));
    ref4 = [1, 4];

    // Transition from 3 loops to 1 and 4.
    for (n = 0, len4 = ref4.length; n < len4; n++) {
      sectionGroupNumber = ref4[n];
      ref5 = sections[3].loops;
      for (o = 0, len5 = ref5.length; o < len5; o++) {
        loopSection = ref5[o];
        loopSection.transitions.push(new AMe.Transition(loopSection, {
          nextSection: sections[sectionGroupNumber].intro
        }));
      }
    }
    ref6 = sections[4].loops;

    // Transition from 4 loops to 1.
    for (p = 0, len6 = ref6.length; p < len6; p++) {
      loopSection = ref6[p];
      loopSection.transitions.push(new AMe.Transition(loopSection, {
        nextSection: sections[1].intro
      }));
    }
    // Force a transition out of the loops when not drawing.
    notDrawingCondition = () => {
      return !this._drawingCondition();
    };
    ref7 = sections[1].loops;

    // Section 1 transitions to 2 when not drawing.
    for (q = 0, len7 = ref7.length; q < len7; q++) {
      loopSection = ref7[q];
      loopSection.transitions.push(new AMe.Transition(loopSection, {
        nextSection: sections[2].intro,
        condition: notDrawingCondition
      }));
    }
    ref8 = [3, 4];

    // Sections 3 and 4 transition to 1 when not drawing.
    for (r = 0, len8 = ref8.length; r < len8; r++) {
      sectionGroupNumber = ref8[r];
      ref9 = sections[sectionGroupNumber].loops;
      for (s = 0, len9 = ref9.length; s < len9; s++) {
        loopSection = ref9[s];
        loopSection.transitions.push(new AMe.Transition(loopSection, {
          nextSection: sections[1].intro,
          condition: notDrawingCondition
        }));
      }
    }
    // Force a transition to section 4 on cleanup lessons.
    cleanupLessonCondition = () => {
      var activeAsset, curvesCleanup, drawingAppInfo, linesCleanup;
      if (!(drawingAppInfo = this._getDrawingAppInfo())) {
        return;
      }
      activeAsset = drawingAppInfo.activeAsset;
      linesCleanup = activeAsset instanceof PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.LineArtCleanup;
      curvesCleanup = activeAsset instanceof PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.LineArtCleanup;
      return linesCleanup || curvesCleanup;
    };
    sectionsToTransitionTo4 = [sections[1].intro, ...sections[1].loops, sections[2].intro, sections[3].intro, ...sections[3].loops];
    for (t = 0, len10 = sectionsToTransitionTo4.length; t < len10; t++) {
      section = sectionsToTransitionTo4[t];
      section.transitions.push(new AMe.Transition(section, {
        nextSection: sections[4].intro,
        condition: cleanupLessonCondition
      }));
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-learnmode/learnmode.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/region.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/spacebars.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/adventure/adventure.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/chapter/chapter.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/interface/interface.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/interface/template.interface.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/interface/interface-music.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/interface/studio/studio.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/interface/studio/template.studio.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/content.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/goalcontent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/appcontent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/drawingtutorialcontent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/assetcontent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/futurecontent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/course.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/tags.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/progress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/manualprogress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/unitprogress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/contentprogress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/goalprogress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/taskprogress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/projectassetprogress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/content/progress/entry.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/menu.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/items/items.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/items/template.items.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/extras/extras.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/extras/template.extras.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/progress.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/template.progress.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/content/content.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/content/template.content.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/content/component.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/content/defaultcontent/defaultcontent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/content/defaultcontent/template.defaultcontent.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/content/appcontent/appcontent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/progress/content/appcontent/template.appcontent.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/credits/credits.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/menu/credits/template.credits.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/locations/locations.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/locations/mainmenu/mainmenu.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/locations/mainmenu/template.mainmenu.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/locations/play/play.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/pixelpad/pixelpad.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/notifications/randomnotificationsprovider.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/notifications/conditionalnotificationsprovider.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/notifications/tasknotificationsprovider.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/notifications/notifications.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/compositions/compositions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/compositions/composition.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/compositions/pixelarttools.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/compositions/elementsofart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode/compositions/pixelartfundamentals.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-learnmode", {
  PixelArtAcademy: PixelArtAcademy
});

})();
