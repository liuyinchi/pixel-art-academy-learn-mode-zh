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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad-pico8":{"pico8.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-pico8/pico8.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PAA.PixelPad.Apps.Pico8 = function () {
  class Pico8 extends PAA.PixelPad.App {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Pico8';
    }
    static url() {
      return 'pico8';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "PICO-8";
    }
    static description() {
      return "这是 Lexaloffle 的幻想游戏机！";
    }
    static storeName() {
      return "PICO-8 for PixelPad";
    }
    static storeDescription() {
      return "Retronator brings Lexallofle's fantasy console right to your fingertips with the app for PixelPad. The bright magenta case complements the playfulness of PICO-8 games and makes sure the fantasy becomes a reality.";
    }
    constructor() {
      super(...arguments);
      this.resizable(false);
      this.drawer = new ReactiveField(null);
      this.device = new ReactiveField(null);
      this.cartridge = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.drawer(new this.constructor.Drawer(this));

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
            var base;
            return typeof (base = this.cartridge()).onInputOutput === "function" ? base.onInputOutput(address, value) : void 0;
          },
          // Enable interface when the cartridge is in the device.
          enabled: () => {
            return this.cartridge();
          }
        }));
      });
      // Change PixelPad size.
      this.autorun(computation => {
        if (this.cartridge()) {
          return this.setFixedPixelPadSize(320, 157);
        } else {
          return this.setFixedPixelPadSize(380, 300);
        }
      });

      // Set/unset cartridge if in play.
      this.autorun(computation => {
        var cartridgeParameter, playParameter;
        // Depend only on parameters to minimize reactivity.
        cartridgeParameter = AB.Router.getParameter('parameter3');
        playParameter = AB.Router.getParameter('parameter4');
        return Tracker.autorun(computation => {
          var cartridge, delay, device, drawer;
          drawer = this.drawer();
          if (cartridgeParameter && playParameter) {
            if (!(cartridge = drawer.selectedCartridge())) {
              return;
            }
            computation.stop();
            return this.cartridge(cartridge);
          } else {
            computation.stop();
            // Turn off the device and deselect the cartridge when returning from play.
            if (this.cartridge()) {
              // Wait for the power off animation if needed.
              delay = 0;
              device = this.device();
              if (device.powerOn()) {
                device.powerStop();
                delay = 500;
              }
              return Meteor.setTimeout(() => {
                this.cartridge(null);
                return drawer.deselectCartridge();
              }, delay);
            }
          }
        });
      });

      // Start the device when we have the cartridge.
      return this.autorun(computation => {
        var cartridge, device;
        if (!(cartridge = this.cartridge())) {
          return;
        }
        if (!(device = this.device())) {
          return;
        }

        // Load the game non-reactively so that changing of the project ID won't
        // cause a restart (instead we're forcing the player to go out and back in).
        Tracker.nonreactive(() => {
          return device.loadGame(cartridge.game(), cartridge.projectId(), cartridge.startParameter());
        });
        Meteor.clearTimeout(this._deviceStartTimeout);
        return this._deviceStartTimeout = Meteor.setTimeout(() => {
          return device.powerStart();
        }, 1500);
      });
    }
    inGameMusicMode() {
      // Turn off music when viewing the device.
      if (AB.Router.getParameter('parameter4')) {
        return LM.Interface.InGameMusicMode.Off;
      } else {
        return LM.Interface.InGameMusicMode.Direct;
      }
    }
    cartridgeActiveClass() {
      if (this.cartridge()) {
        return 'cartridge-active';
      }
    }
  }
  ;
  Pico8.register(Pico8.id());
  Pico8.initialize();
  return Pico8;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pico8.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-pico8/template.pico8.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Pico8");
Template["PixelArtAcademy.PixelPad.Apps.Pico8"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Pico8", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-pico-8 app ", Spacebars.mustache(view.lookup("cartridgeActiveClass")) ];
    }
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("drawer"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("device"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawer":{"drawer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-pico8/drawer/drawer.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.Pico8.Drawer = function () {
  class Drawer extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Pico8.Drawer';
    }
    constructor(pico8) {
      super(...arguments);
      this.pico8 = pico8;
      this.opened = new ReactiveField(false);
      this.pannedLeft = new ReactiveField(false);
      this.selectedCartridge = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      // Create a random ID to prevent caching carts. We assume the art won't
      // change while in the app, to prevent constant calls to the server.
      this._runId = Random.id();
      this.cartridgesLocation = new PAA.Pico8.Cartridges();
      this.cartridgesSituation = new ComputedField(() => {
        var options;
        options = {
          timelineId: LOI.adventure.currentTimelineId(),
          location: this.cartridgesLocation
        };
        if (!options.timelineId) {
          return;
        }
        return new LOI.Adventure.Situation(options);
      });
      // We use a cache to avoid reconstruction.
      this._cartridges = {};
      this.cartridges = new ComputedField(() => {
        var cartridgeClass, cartridgeClasses, cartridgesSituation, i, len, results;
        if (!(cartridgesSituation = this.cartridgesSituation())) {
          return;
        }
        cartridgeClasses = cartridgesSituation.things();
        results = [];
        for (i = 0, len = cartridgeClasses.length; i < len; i++) {
          cartridgeClass = cartridgeClasses[i];
          // We create the instance in a non-reactive context so that
          // reruns of this autorun don't invalidate instance's autoruns.
          Tracker.nonreactive(() => {
            var base, name;
            return (base = this._cartridges)[name = cartridgeClass.id()] != null ? base[name] : base[name] = new cartridgeClass();
          });
          results.push(this._cartridges[cartridgeClass.id()]);
        }
        return results;
      });

      // Select cartridge based on URL parameter.
      return this.autorun(computation => {
        var gameSlug;
        if (gameSlug = AB.Router.getParameter('parameter3')) {
          return this.selectedCartridge(_.find(this.cartridges(), cartridge => {
            return cartridge.constructor.gameSlug() === gameSlug;
          }));
        } else {
          if (Tracker.nonreactive(() => {
            return this.selectedCartridge();
          })) {
            this.audio.caseClose();
          }
          return this.selectedCartridge(null);
        }
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      // Open the drawer on app launch.
      return Meteor.setTimeout(() => {
        this.opened(true);
        return this.audio.drawerOpen();
      }, 500);
    }
    onDestroyed() {
      var cartridge, gameSlug, ref, results;
      super.onDestroyed(...arguments);
      ref = this._cartridges;
      results = [];
      for (gameSlug in ref) {
        cartridge = ref[gameSlug];
        results.push(cartridge.destroy());
      }
      return results;
    }
    cartridgeImageUrl() {
      var cartridge, url;
      cartridge = this.currentData();
      if (!(url = cartridge.imageUrl())) {
        return;
      }
      // Don't cache local carts.
      if (url.indexOf('pico8/cartridge.png') > 0) {
        url += "&runId=".concat(this._runId);
      }
      return url;
    }
    deselectCartridge() {
      AB.Router.changeParameter('parameter3', null);
      return this.pannedLeft(false);
    }
    cartridgeShareUrl() {
      var cartridge;
      cartridge = this.currentData();
      return cartridge.shareUrl();
    }
    openedClass() {
      if (this.opened()) {
        return 'opened';
      }
    }
    coveredClass() {
      if (this.pico8.cartridge()) {
        return 'covered';
      }
    }
    activeClass() {
      if (this.selectedCartridge()) {
        return 'active';
      }
    }
    pannedLeftClass() {
      if (this.pannedLeft()) {
        return 'panned-left';
      }
    }
    selectedClass() {
      var cartridge;
      cartridge = this.currentData();
      if (cartridge === this.selectedCartridge()) {
        return 'selected';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click': this.onClick,
        'click .cartridge': this.onClickCartridge,
        'click .selected-cartridge .memory-card': this.onClickSelectedCartridgeMemoryCard,
        'click .selected-cartridge .case-top': this.onClickSelectedCartridgeCaseTop,
        'click .selected-cartridge .case-bottom': this.onClickSelectedCartridgeCaseBottom
      });
    }
    onClick(event) {
      var $target;
      if (!this.selectedCartridge()) {
        return;
      }
      $target = $(event.target);
      if ($target.closest('.selected-cartridge').length) {
        return;
      }
      return this.deselectCartridge();
    }
    onClickCartridge(event) {
      var cartridge;
      cartridge = this.currentData();
      AB.Router.changeParameter('parameter3', cartridge.constructor.gameSlug());
      return this.audio.caseOpen();
    }
    onClickSelectedCartridgeMemoryCard(event) {
      if (this.pannedLeft()) {
        this.pannedLeft(false);
        return;
      }
      AB.Router.changeParameter('parameter4', 'play');
      return this.audio.cartridgeSelect();
    }
    onClickSelectedCartridgeCaseTop(event) {}

    // TODO: Show case top only for online projects.
    // @pannedLeft true
    onClickSelectedCartridgeCaseBottom(event) {
      return this.pannedLeft(false);
    }
  }
  ;
  Drawer.register(Drawer.id());
  Drawer.Audio = new LOI.Assets.Audio.Namespace(Drawer.id(), {
    variables: {
      drawerOpen: AEc.ValueTypes.Trigger,
      caseOpen: AEc.ValueTypes.Trigger,
      caseClose: AEc.ValueTypes.Trigger,
      cartridgeSelect: AEc.ValueTypes.Trigger
    }
  });
  return Drawer;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.drawer.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-pico8/drawer/template.drawer.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Pico8.Drawer");
Template["PixelArtAcademy.PixelPad.Apps.Pico8.Drawer"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Pico8.Drawer", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-pico-8-drawer ", Spacebars.mustache(view.lookup("openedClass")), " ", Spacebars.mustache(view.lookup("coveredClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: "drawer"
  }, "\n      ", HTML.DIV({
    class: "contents"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("cartridges"), "length"));
  }, function() {
    return [ "\n          ", HTML.UL({
      class: "cartridges"
    }, "\n            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("cartridges"));
    }, function() {
      return [ "\n              ", HTML.LI({
        class: function() {
          return [ "cartridge ", Spacebars.mustache(view.lookup("selectedClass")) ];
        }
      }, HTML.Raw('\n                <div class="case-bottom"></div>\n                '), HTML.DIV({
        class: "memory-card"
      }, "\n                  ", HTML.IMG({
        class: "image",
        src: function() {
          return Spacebars.mustache(view.lookup("cartridgeImageUrl"));
        }
      }), "\n                "), HTML.Raw('\n                <div class="case-top"></div>\n              ')), "\n            " ];
    }), "\n          "), "\n        " ];
  }, function() {
    return HTML.Raw('\n          <div class="no-cartridges">\n            <div class="message">\n              待办：<br>\n              获取一些 PICO-8 卡带。\n            </div>\n          </div>\n        ');
  }), "\n      "), "\n    "), HTML.Raw('\n    <div class="table-top"></div>\n    '), HTML.DIV({
    class: function() {
      return [ "selected-cartridge ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("pannedLeftClass")) ];
    }
  }, HTML.Raw('\n      <div class="case-bottom"></div>\n      '), HTML.DIV({
    class: "memory-card"
  }, "\n        ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("selectedCartridge"));
  }, function() {
    return [ "\n          ", HTML.IMG({
      class: "image",
      src: function() {
        return Spacebars.mustache(view.lookup("cartridgeImageUrl"));
      }
    }), "\n        " ];
  }), "\n      "), HTML.Raw('\n      <div class="case-top">\n        <!-- TODO: Show case top only for online projects.\n          div class="share-area">\n          <p class="title">分享链接</p>\n          {{#with selectedCartridge}}\n            <p class="link"><a href="{{cartridgeShareUrl}}" target="_blank">{{cartridgeShareUrl}}</a></p>\n          {{/with}}\n        </div-->\n      </div>\n    ')), "\n  ");
}));

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

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-pico8/pico8.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-pico8/template.pico8.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-pico8/drawer/drawer.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-pico8/drawer/template.drawer.js");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad-pico8", {
  PixelArtAcademy: PixelArtAcademy
});

})();
