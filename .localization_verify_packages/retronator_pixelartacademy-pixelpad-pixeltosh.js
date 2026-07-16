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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad-pixeltosh":{"pixeltosh.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-pixeltosh/pixeltosh.coffee                             //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PAA.PixelPad.Apps.Pixeltosh = function () {
  class Pixeltosh extends PAA.PixelPad.App {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Pixeltosh';
    }
    static url() {
      return 'pixeltosh';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "Pixeltosh";
    }
    static description() {
      return "这是 Macintosh 128K 的迷你版本！";
    }
    static getOS() {
      var currentApp, os, pixelPad, pixeltosh;
      if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
        return;
      }
      if (!(currentApp = pixelPad.os.currentApp())) {
        return;
      }
      if (!(currentApp instanceof this)) {
        return;
      }
      pixeltosh = currentApp;
      if (!(os = pixeltosh.os())) {
        return;
      }
      if (!os.isRendered()) {
        return;
      }
      return os;
    }
    constructor() {
      super(...arguments);
      this.resizable(false);
      this.os = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os(new PAA.Pixeltosh.OS());

      // Make the PixelPad as big as possible.
      return this.autorun(computation => {
        var height, maximumSize, width;
        maximumSize = this.getMaximumPixelPadSize({
          fullscreen: true
        });
        width = _.clamp(maximumSize.width, 320, 444);
        height = maximumSize.height;
        return this.setFixedPixelPadSize(width, height);
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.os(null);
    }
    inGameMusicMode() {
      // Turn off music when using the Pixeltosh.
      return LM.Interface.InGameMusicMode.InLocation;
    }
    onBackButton() {
      // Relay to the OS.
      return this.os().onBackButton();
    }
  }
  ;
  Pixeltosh.register(Pixeltosh.id());
  Pixeltosh.initialize();
  return Pixeltosh;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pixeltosh.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-pixeltosh/template.pixeltosh.js                        //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Pixeltosh");
Template["PixelArtAcademy.PixelPad.Apps.Pixeltosh"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Pixeltosh", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-pixeltosh app"
  }, "\n    ", HTML.DIV({
    class: "pixeltosh-safe-area"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), view.lookup("os"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Computer"));
    });
  }), "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Instructions"));
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-pixeltosh/pixeltosh.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-pixeltosh/template.pixeltosh.js");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad-pixeltosh", {
  PixelArtAcademy: PixelArtAcademy
});

})();
