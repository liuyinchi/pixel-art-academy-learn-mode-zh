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
var PixelArtAcademy = Package['retronator:pixelartacademy-pico8'].PixelArtAcademy;
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
var __coffeescriptShare, appPath;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad":{"pixelpad.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/pixelpad.coffee                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, LOI, PAA, Vocabulary;
AB = Artificial.Base;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Vocabulary = LOI.Parser.Vocabulary;
PAA.PixelPad = function () {
  class PixelPad extends LOI.Adventure.Item {
    static id() {
      return 'PixelArtAcademy.PixelPad';
    }
    static url() {
      return 'pixelpad';
    }
    static version() {
      return '0.2.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "像素平板 2000";
    }
    static shortName() {
      return "像素平板";
    }
    static nameAutoCorrectStyle() {
      return LOI.Avatar.NameAutoCorrectStyle.Name;
    }
    static description() {
      return "这是您的变形手持电脑，最新的像素平板！";
    }
    static storeDescription() {
      return "The brains behind the Retropolis company Pixel have done it again. The latest in their PixelPad handheld series is a marvel of engineering with a flexible display surface that resizes to your needs. Change it from a tablet to a smartphone, or wear it like a watch, PixelPad 2000 is your new best friend in your digital lifestyle.";
    }
    constructor() {
      super(...arguments);
      // PixelPad is always active to keep running apps, but we can show it or hide it.
      this.activatedState(LOI.Adventure.Item.ActivatedStates.Activated);
      this.active = new ReactiveField(false);
      this.fullscreenOverlay = new ReactiveField(false);
      // We create the OS instance and send ourselves to it so it knows it's running embedded.
      this.os = new this.constructor.OS(this);
      // The desired current width and height of the physical device (measured as the inner screen/OS area).
      this.size = new ReactiveField({
        width: 0,
        height: 0
      }, EJSON.equals);
      this.fullscreen = new ReactiveField(false);
      // The actual width and height as animated by velocity.
      this.animatingSize = new ReactiveField({
        width: 0,
        height: 0
      }, EJSON.equals);
      this.resizing = new ReactiveField(false);
      this.startResizeX = new ReactiveField(null);
      this.startResizeY = new ReactiveField(null);
      this.startWidth = new ReactiveField(null);
      this.startHeight = new ReactiveField(null);
      this.endResizeX = new ReactiveField(null);
      this.endResizeY = new ReactiveField(null);
      this.positioningClass = new ReactiveField(null);
    }
    onRendered() {
      super.onRendered(...arguments);
      this.overlay = this.childComponentsOfType(LOI.Components.Overlay)[0];
      this.backButton = this.childComponentsOfType(LOI.Components.BackButton)[0];
      // Since we start activated, overlay will also be already activated, but it shouldn't be, so we deactivate it here.
      this.overlay.onDeactivating();
      this.$device = this.$('.device');
      $(document).on('mousemove.pixelartacademy-pixelpad', event => {
        return this.onMouseMove(event);
      });
      $(document).on('mouseup.pixelartacademy-pixelpad', event => {
        return this.onMouseUp(event);
      });
      $(document).on('keydown.pixelartacademy-pixelpad', event => {
        return this.onKeyDown(event);
      });
      // Reset scale to 0 to trigger direct setting of size.
      this._lastScale = 0;
      // Perform automatic resizing, based on current app desires.
      this.autorun(() => {
        var app, newHeight, newWidth, size;
        if (!(app = this.os.currentApp())) {
          return;
        }
        size = this.size();
        newWidth = size.width;
        newHeight = size.height;
        if (app.maxWidth()) {
          // Bound it to min/max size of the app.
          newWidth = Math.min(app.maxWidth(), newWidth);
        }
        if (app.minWidth()) {
          newWidth = Math.max(app.minWidth(), newWidth);
        }
        if (app.maxHeight()) {
          newHeight = Math.min(app.maxHeight(), newHeight);
        }
        if (app.minHeight()) {
          newHeight = Math.max(app.minHeight(), newHeight);
        }
        return Tracker.nonreactive(() => {
          // Set the new size values.
          return this.size({
            width: newWidth,
            height: newHeight
          });
        });
      });
      // Handle manual resizing from user input.
      this.autorun(() => {
        var heightFactor, newHeight, newWidth, scale;
        if (!this.resizing()) {
          return;
        }
        scale = LOI.adventure.interface.display.scale();
        heightFactor = this.positioningClass() === this.constructor.PositioningType.ScreenBottom ? 1 : 2;
        // Calculate desired state based on dragging.
        newWidth = this.startWidth() + (this.endResizeX() - this.startResizeX()) * 2 / scale;
        newHeight = this.startHeight() - (this.endResizeY() - this.startResizeY()) * heightFactor / scale;
        // Set the new size values.
        return this.size({
          width: newWidth,
          height: newHeight
        });
      });
      // Animate the size using velocity.
      this.autorun(() => {
        var scale, size, startSize;
        size = this.size();
        scale = LOI.adventure.interface.display.scale();
        // If scale has changed, directly set the new size without animations.
        if (scale !== this._lastScale) {
          this.$device.css({
            width: size.width * scale,
            height: size.height * scale
          });
          this.animatingSize(size);
          this._lastSize = size;
          this._lastScale = scale;
          return;
        }
        startSize = {
          width: this.$device.width() / scale,
          height: this.$device.height() / scale
        };
        return this.$device.velocity('stop', true).velocity({
          width: size.width * scale,
          height: size.height * scale,
          tween: 1
        }, {
          duration: this.resizing() ? 100 : 1000,
          easing: this.resizing() ? 'easeOutCirc' : 'easeInOutQuint',
          progress: (elements, complete, remaining, start, tweenValue) => {
            return this.animatingSize({
              width: startSize.width + (size.width - startSize.width) * tweenValue,
              height: startSize.height + (size.height - startSize.height) * tweenValue
            });
          },
          complete: () => {
            return this.animatingSize(size);
          }
        });
      });
      // Add resizing class to body to force cursor change no matter where we move.
      this.autorun(() => {
        if (this.resizing()) {
          return $('body').addClass('pixelartacademy-pixelpad-resizing');
        } else {
          return $('body').removeClass('pixelartacademy-pixelpad-resizing');
        }
      });
      return this.autorun(() => {
        var clientHeight, clientWidth, pixelPadHeightRequirement, scale, size, viewport;
        size = this.size();
        scale = LOI.adventure.interface.display.scale();
        viewport = LOI.adventure.interface.display.viewport();
        clientWidth = viewport.viewportBounds.width();
        clientHeight = viewport.viewportBounds.height();
        // Decide whether to center PixelPad or fix it to the bottom.
        pixelPadHeightRequirement = (size.height + 65 * 2) * scale;
        this.positioningClass(clientHeight < pixelPadHeightRequirement ? this.constructor.PositioningType.ScreenCenter : this.constructor.PositioningType.ScreenBottom);
        // Detect if size is covering the whole viewport width.
        return this.fullscreen(size.width * scale >= clientWidth);
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      $(document).off('.pixelartacademy-pixelpad');
      return $('body').removeClass('pixelartacademy-pixelpad-resizing');
    }
    backButtonVisible() {
      return true; // Override to control when the back button is available.
    }
    url() {
      return this.os.url();
    }
    open() {
      LOI.adventure.goToItem(this);
      this.fullscreenOverlay(true);
      // Wait until we're rendered.
      return Tracker.nonreactive(() => {
        return Tracker.autorun(computation => {
          if (!this.isRendered()) {
            return;
          }
          computation.stop();
          // We manually trigger overlay's transition since our active state is already activated.
          return this.overlay.onActivating();
        });
      });
    }
    onActivate(finishedDeactivatingCallback) {
      // Bring in the device.
      this.active(true);
      return finishedDeactivatingCallback();
    }
    onDeactivate(finishedDeactivatingCallback) {
      // Start hiding the device.
      this.active(false);
      return Meteor.setTimeout(() => {
        // Hide the fullscreen overlay, but leave the device active.
        this.fullscreenOverlay(false);
        this.activatedState(LOI.Adventure.Item.ActivatedStates.Activated);
        // We manually trigger overlay's transition since our active state is already activated.
        this.overlay.onDeactivated();
        // We also reset the back button.
        return this.backButton.closing(false);
      }, 500);
    }
    activeClass() {
      if (!this.isRendered()) {
        return;
      }
      if (this.active()) {
        return 'active';
      }
    }
    visibleClass() {
      if (this.fullscreenOverlay()) {
        // We need to show the content together with the fullscreen overlay.
        return 'visible';
      }
    }
    backButtonVisibleClass() {
      if (this.backButtonVisible()) {
        return 'visible';
      }
    }
    osStyle() {
      return {
        'pointer-events': this.resizing() ? 'none' : 'initial'
      };
    }
    resizable() {
      var base, ref;
      return typeof (base = this.os).currentApp === "function" ? (ref = base.currentApp()) != null ? ref.resizable() : void 0 : void 0;
    }
    resizableClass() {
      if (this.resizable()) {
        return 'resizable';
      }
    }
    fullscreenClass() {
      if (this.fullscreen()) {
        return 'fullscreen';
      }
    }
    backButtonCallback() {
      return () => {
        // We must return the callback function.
        return this.os.backButtonCallback();
      };
    }
    events() {
      return super.events(...arguments).concat({
        'mousedown .glass': this.onMouseDownGlass,
        'scroll .os': this.onScrollOS
      });
    }
    onMouseDownGlass(event) {
      var size;
      if (!this.resizable()) {
        return;
      }
      // Do not let text selection happen.
      event.preventDefault();
      // Get current x and y position.
      this.startResizeX(event.clientX);
      this.startResizeY(event.clientY);
      this.endResizeX(event.clientX);
      this.endResizeY(event.clientY);
      size = this.size();
      this.startWidth(size.width);
      this.startHeight(size.height);
      return this.resizing(true);
    }
    onMouseMove(event) {
      if (!this.resizing()) {
        return;
      }
      this.endResizeX(event.clientX);
      return this.endResizeY(event.clientY);
    }
    onMouseUp(event) {
      this.resizing(false);
    }

    // We need an explicit return, otherwise false would be returned from the call to resizing, which prevents bubbling.
    onKeyDown(event) {
      var keyCode;
      // Don't capture events when the interface is busy.
      if (LOI.adventure.interface.busy()) {
        return;
      }
      // Open the device with the alt key.
      if (this.active()) {
        return;
      }
      keyCode = event.which;
      if (keyCode !== AC.Keys.alt) {
        return;
      }
      return this.open();
    }
    onScrollOS(event) {
      // Prevent scrolling of the OS content. This can happen despite
      // overflow: hidden if the browser tries to focus on input elements.
      event.currentTarget.scrollLeft = 0;
      return event.currentTarget.scrollTop = 0;
    }

    // Listener
    onCommand(commandResponse) {
      var pixelPad;
      pixelPad = this.options.parent;
      return commandResponse.onPhrase({
        form: [[Vocabulary.Keys.Verbs.LookAt, Vocabulary.Keys.Verbs.Use], pixelPad.avatar],
        priority: 1,
        action: () => {
          return pixelPad.open();
        }
      });
    }
    static pixelPadRouteHandler() {
      var appParameter, appPath, appUrl;
      // HACK: Remember which app we're trying to open.
      appUrl = AB.Router.getParameter('parameter2');
      appPath = AB.Router.getParameter('parameter3');
      appParameter = AB.Router.getParameter('parameter4');
      // Show the item if we need to.
      if (LOI.adventure.activeItemId() !== PixelPad.id()) {
        return Tracker.autorun(computation => {
          var pixelPad;
          // Wait until the item is available.
          if (!(pixelPad = LOI.adventure.getCurrentThing(PixelPad))) {
            return;
          }
          computation.stop();
          // Show the item.
          pixelPad.open();

          // HACK: Force back the wanted app path.
          return AB.Router.setParameters({
            parameter1: PixelPad.url(),
            parameter2: appUrl,
            parameter3: appPath,
            parameter4: appParameter
          });
        });
      }
    }
  }
  ;
  PixelPad.register(PixelPad.id());
  PixelPad.initialize();
  PixelPad.PositioningType = {
    ScreenCenter: 'screen-center',
    ScreenBottom: 'screen-bottom'
  };

  // Routing
  LOI.Adventure.registerDirectRoute("/".concat(PixelPad.url(), "/*"), PixelPad.pixelPadRouteHandler);
  return PixelPad;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pixelpad.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/template.pixelpad.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("PixelArtAcademy.PixelPad");
Template["PixelArtAcademy.PixelPad"] = new Template("Template.PixelArtAcademy.PixelPad", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad ", Spacebars.mustache(view.lookup("visibleClass")), " ", Spacebars.mustache(view.lookup("fullscreenClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "back-button-area ", Spacebars.mustache(view.lookup("backButtonVisibleClass")) ];
    }
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), view.lookup("backButtonCallback"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
    });
  }), "\n    "), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
  }, function() {
    return "\n    ";
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "viewport-area"
    }, "\n        ", HTML.DIV({
      class: function() {
        return [ "device ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("positioningClass")) ];
      }
    }, "\n          ", HTML.DIV({
      class: function() {
        return [ "glass ", Spacebars.mustache(view.lookup("resizableClass")) ];
      }
    }), HTML.Raw('\n          <div class="screen"></div>\n          '), HTML.DIV(HTML.Attrs({
      class: "os"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("osStyle"));
    }), "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("os"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n          "), "\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Hand"));
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"app.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/app.coffee                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.App = function () {
  class App extends LOI.Adventure.Item {
    static getClassForUrl(url) {
      return this._appClassesByUrl[url];
    }
    static initialize() {
      var url;
      super.initialize(...arguments);
      url = this.url();
      if (url != null) {
        return this._appClassesByUrl[url] = this;
      }
    }
    static iconUrl() {
      return this.versionedUrl("/pixelartacademy/pixelpad/apps/".concat(this.url(), "/icon.png"));
    }
    iconUrl() {
      return this.constructor.iconUrl();
    }
    constructor(os) {
      super(...arguments);
      this.os = os;
      // Does this app lets the device resize?
      this.resizable = new ReactiveField(true);
      // The minimum size the device should be let to resize.
      this.minWidth = new ReactiveField(null);
      this.minHeight = new ReactiveField(null);
      // The maximum size the device should be let to resize.
      this.maxWidth = new ReactiveField(null);
      this.maxHeight = new ReactiveField(null);
    }
    allowsShortcutsTable() {
      // Override to display shortcuts table in the app.
      return false;
    }
    setDefaultPixelPadSize() {
      this.setMaximumPixelPadSize();
      this.minWidth(310);
      this.minHeight(230);
      return this.resizable(true);
    }
    setFixedPixelPadSize(width, height) {
      this.minWidth(width);
      this.minHeight(height);
      this.maxWidth(width);
      this.maxHeight(height);
      return this.resizable(false);
    }
    setMinimumPixelPadSize() {
      return this.setFixedPixelPadSize(310, 230);
    }
    getMaximumPixelPadSize() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var display, height, maxOverlayHeight, scale, viewport, width;
      display = LOI.adventure.interface.display;
      viewport = display.viewport();
      scale = display.scale();
      maxOverlayHeight = display.safeAreaHeight() * 1.5;
      width = viewport.viewportBounds.width() / scale;
      height = Math.min(maxOverlayHeight, viewport.viewportBounds.height() / scale);
      if (!options.fullscreen) {
        // Add gaps for the back button and top border
        width -= 100;
        height -= 20;
      }
      return {
        width,
        height
      };
    }
    setMaximumPixelPadSize() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var size;
      size = this.getMaximumPixelPadSize(options);
      return this.setFixedPixelPadSize(size.width, size.height);
    }
    maximize() {
      return this.os.pixelPad.size({
        width: this.maxWidth(),
        height: this.maxHeight()
      });
    }
  }
  ;
  App._appClassesByUrl = {};
  return App;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"system.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/system.coffee                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.System = class System extends LOI.Adventure.Item {
  constructor(os) {
    super(...arguments);
    this.os = os;
  }
  allowsShortcutsTable() {
    // Override if the system interferes with displaying the shortcuts table.
    return true;
  }
  dontRender() {
    // Override if the system will be rendered manually.
    return false;
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"components":{"components.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/components/components.coffee                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.PixelPad.Components = class Components {};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shortcutstable":{"shortcutstable.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/components/shortcutstable/shortcutstable.coffee                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.PixelPad.Components.ShortcutsTable = function () {
  class ShortcutsTable extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Components.ShortcutsTable';
    }
  }
  ;
  ShortcutsTable.register(ShortcutsTable.id());
  return ShortcutsTable;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.shortcutstable.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/components/shortcutstable/template.shortcutstable.js                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("PixelArtAcademy.PixelPad.Components.ShortcutsTable");
Template["PixelArtAcademy.PixelPad.Components.ShortcutsTable"] = new Template("Template.PixelArtAcademy.PixelPad.Components.ShortcutsTable", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixelpad-components-shortcutstable">\n  </div>');
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"speechballoon":{"speechballoon.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/components/speechballoon/speechballoon.coffee                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.PixelPad.Components.SpeechBalloon = function () {
  class SpeechBalloon extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Components.SpeechBalloon';
    }
    constructor(options) {
      super(...arguments);
      this.options = options;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.contentWidth = new ReactiveField(0);
      this.contentHeight = new ReactiveField(0);
      this.text = new ReactiveField(null);
      this.displayed = new ReactiveField(false);
      return this.autorun(computation => {
        // Depend on text changes.
        this.options.text();
        return Tracker.nonreactive(() => {
          var timeoutDuration;
          // Nothing to do if we've already scheduled a re-evaluation.
          if (this._displayTimeout) {
            return;
          }

          // Hide the currently displayed text in any case.
          if (this.displayed()) {
            this.displayed(false);
            timeoutDuration = 400;
          } else {
            timeoutDuration = 0;
          }

          // Schedule evaluation of the new text.
          return this._displayTimeout = Meteor.setTimeout(() => {
            var text;
            this._displayTimeout = null;
            if (!(text = this.options.text())) {
              return;
            }
            this.text(text);
            return this.displayed(true);
          }, timeoutDuration);
        });
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$contentMeasuring = this.$('.content-measuring');
      this._resizeObserver = new ResizeObserver(() => {
        this.contentWidth(this.$contentMeasuring.outerWidth());
        return this.contentHeight(this.$contentMeasuring.outerHeight());
      });
      return this._resizeObserver.observe(this.$contentMeasuring[0]);
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      return (ref = this._resizeObserver) != null ? ref.disconnect() : void 0;
    }
    displayedClass() {
      if (this.displayed()) {
        return 'displayed';
      }
    }
    contentAreaStyle() {
      var height, width;
      if (this.displayed()) {
        height = this.contentHeight();
        width = this.contentWidth();
      } else {
        width = 0;
        height = 0;
      }
      return {
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      };
    }
    contentStyle() {
      return {
        width: "".concat(this.contentWidth(), "px"),
        height: "".concat(this.contentHeight(), "px")
      };
    }
    contentMeasuringStyle() {
      var averageLetterWidth, characters, lineHeight, ref, widthCharacters, widthToHeightRatio;
      if (!(characters = (ref = this.options.text()) != null ? ref.length : void 0)) {
        return;
      }
      // Calculate how wide the content should be to be in a desired width to height ratio.
      widthToHeightRatio = 5;
      lineHeight = 9;
      averageLetterWidth = 4;
      widthCharacters = Math.round(Math.sqrt(widthToHeightRatio * characters * lineHeight / averageLetterWidth));
      return {
        minWidth: "".concat(Math.min(200, widthCharacters * averageLetterWidth), "rem")
      };
    }
  }
  ;
  SpeechBalloon.register(SpeechBalloon.id());
  return SpeechBalloon;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.speechballoon.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/components/speechballoon/template.speechballoon.js                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("PixelArtAcademy.PixelPad.Components.SpeechBalloon");
Template["PixelArtAcademy.PixelPad.Components.SpeechBalloon"] = new Template("Template.PixelArtAcademy.PixelPad.Components.SpeechBalloon", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-components-speechballoon"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "speech-balloon ", Spacebars.mustache(view.lookup("displayedClass")) ];
    }
  }, "\n      ", HTML.DIV(HTML.Attrs({
    class: "content-area"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentAreaStyle"));
  }), "\n        ", HTML.DIV(HTML.Attrs({
    class: "content"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentStyle"));
  }), "\n          ", Spacebars.include(view.lookupTemplate("Markdown"), function() {
    return Blaze.View("lookup:text", function() {
      return Spacebars.mustache(view.lookup("text"));
    });
  }), "\n        "), "\n      "), "\n    "), "\n    ", HTML.DIV(HTML.Attrs({
    class: "content-measuring"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentMeasuringStyle"));
  }), "\n      ", Spacebars.include(view.lookupTemplate("Markdown"), function() {
    return Blaze.View("lookup:options.text", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("options"), "text"));
    });
  }), "\n    "), "\n  ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"mixins":{"mixins.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/components/mixins/mixins.coffee                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.PixelPad.Components.Mixins = class Mixins {};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pageturner.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/components/mixins/pageturner.coffee                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.PixelPad.Components.Mixins.PageTurner = class PageTurner {
  events() {
    return [{
      'wheel': this.onMouseWheel
    }];
  }
  mixinParent(parent) {
    this.parent = parent;
  }
  onMouseWheel(event) {
    var base, base1, minimumScroll;
    event.preventDefault();
    if (this._scroll == null) {
      this._resetScroll();
    }
    this._scroll += event.originalEvent.deltaX;
    this._verticalScroll += event.originalEvent.deltaY;
    minimumScroll = 20;
    if (Math.abs(this._verticalScroll) > minimumScroll) {
      // Make sure we didn't move more vertically than horizontally, by resetting horizontal scroll when we do.
      this._resetScroll();
    }
    if (this._scroll > minimumScroll) {
      if (typeof (base = this.parent).nextPage === "function") {
        base.nextPage();
      }
    }
    if (this._scroll < -minimumScroll) {
      if (typeof (base1 = this.parent).previousPage === "function") {
        base1.previousPage();
      }
    }
    if (Math.abs(this._scroll) > minimumScroll) {
      // Reset scroll after page was turned.
      this._resetScroll();
    }
    // Also reset scroll after the user pauses scrolling.
    if (this._debouncedReset == null) {
      this._debouncedReset = _.debounce(() => {
        return this._resetScroll();
      }, 1000);
    }
    return this._debouncedReset();
  }
  _resetScroll() {
    this._scroll = 0;
    return this._verticalScroll = 0;
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"os":{"os.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/os/os.coffee                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.OS = function () {
  class OS extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.OS';
    }
    constructor(pixelPad) {
      super(...arguments);
      this.pixelPad = pixelPad;
      this.justOS = !this.pixelPad;
      this.appsLocation = new PAA.PixelPad.Apps();
      this.systemsLocation = new PAA.PixelPad.Systems();
      this.currentAppsSituation = new ComputedField(() => {
        var options;
        options = {
          timelineId: LOI.adventure.currentTimelineId(),
          location: this.appsLocation
        };
        if (!(options.timelineId && options.location)) {
          return;
        }
        return new LOI.Adventure.Situation(options);
      });
      this.currentSystemsSituation = new ComputedField(() => {
        var options;
        options = {
          timelineId: LOI.adventure.currentTimelineId(),
          location: this.systemsLocation
        };
        if (!(options.timelineId && options.location)) {
          return;
        }
        return new LOI.Adventure.Situation(options);
      });

      // We use caches to avoid reconstruction.
      this._apps = {};
      this._systems = {};
      // Instantiates and returns all apps that are available to listen to commands.
      this.currentApps = new ComputedField(() => {
        var appClass, appClasses, currentAppsSituation, i, len, results;
        if (!(currentAppsSituation = this.currentAppsSituation())) {
          return;
        }
        appClasses = currentAppsSituation.things();
        results = [];
        for (i = 0, len = appClasses.length; i < len; i++) {
          appClass = appClasses[i];
          // We create the instance in a non-reactive context so that
          // reruns of this autorun don't invalidate instance's autoruns.
          Tracker.nonreactive(() => {
            var base, name;
            return (base = this._apps)[name = appClass.id()] != null ? base[name] : base[name] = new appClass(this);
          });
          results.push(this._apps[appClass.id()]);
        }
        return results;
      });
      this.currentAppUrl = new ComputedField(() => {
        var appClass, appUrl;
        appUrl = AB.Router.getParameter('parameter2');
        appClass = PAA.PixelPad.App.getClassForUrl(appUrl);
        // Make sure this app exists.
        if (appClass) {
          return appUrl;
        } else {
          return null;
        }
      });
      this.currentAppPath = new ComputedField(() => {
        return AB.Router.getParameter('parameter3');
      });
      this.currentAppParameter = new ComputedField(() => {
        return AB.Router.getParameter('parameter4');
      });
      this.currentApp = new ReactiveField(null);
      // Instantiates and returns all systems that are active.
      this.currentSystems = new ComputedField(() => {
        var currentSystemsSituation, i, len, results, systemClass, systemClasses;
        if (!(currentSystemsSituation = this.currentSystemsSituation())) {
          return;
        }
        systemClasses = currentSystemsSituation.things();
        results = [];
        for (i = 0, len = systemClasses.length; i < len; i++) {
          systemClass = systemClasses[i];
          // We create the instance in a non-reactive context so that
          // reruns of this autorun don't invalidate instance's autoruns.
          Tracker.nonreactive(() => {
            var base, name;
            return (base = this._systems)[name = systemClass.id()] != null ? base[name] : base[name] = new systemClass(this);
          });
          results.push(this._systems[systemClass.id()]);
        }
        return results;
      });

      // Set currentApp based on url.
      this.appTransitioning = new ReactiveField(false);
      Tracker.autorun(computation => {
        var appClass, appUrl, currentApps;
        if (!this.isRendered()) {
          return;
        }

        // Don't route until apps are created.
        if (!(currentApps = this.currentApps())) {
          return;
        }

        // Don't route during transitions.
        if (this.appTransitioning()) {
          return;
        }
        appUrl = this.currentAppUrl();
        appClass = PAA.PixelPad.App.getClassForUrl(appUrl) || PAA.PixelPad.Apps.HomeScreen;
        return Tracker.nonreactive(() => {
          var currentApp, newApp, startNewApp;
          newApp = _.find(currentApps, app => {
            return app instanceof appClass;
          });
          currentApp = this.currentApp();
          if (newApp === currentApp) {
            return;
          }
          startNewApp = () => {
            if (!newApp) {
              return;
            }
            // Hide app area to prevent flickering before the transition starts.
            this.$appArea.css({
              opacity: 0
            });
            this.currentApp(newApp);
            newApp.activate();
            // Transition the new app in after it has rendered (and we have a new app wrapper).
            return Tracker.autorun(computation => {
              if (!newApp.isRendered()) {
                return;
              }
              computation.stop();
              return this.$appArea.velocity('transition.slideUpIn', {
                complete: () => {
                  return this.$appArea.css({
                    transform: ''
                  });
                }
              });
            });
          };
          if (currentApp) {
            this.appTransitioning(true);
            return currentApp.deactivate(() => {
              startNewApp();
              return this.appTransitioning(false);
            });
          } else {
            return startNewApp();
          }
        });
      });
      if (this.justOS) {
        // Create pixel scaling display.
        this.display = new Artificial.Mirage.Display({
          safeAreaWidth: 320,
          safeAreaHeight: 241,
          minScale: 2
        });
      } else {
        // Just take adventure's display.
        this.display = LOI.adventure.interface.display;
      }
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$root = this.justOS ? $('html') : this.$('.pixelartacademy-pixelpad-os').closest('.os');
      this.$root.addClass('pixelartacademy-pixelpad-os-root');
      return this.$appArea = this.$('.app-area');
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.$root.removeClass('pixelartacademy-pixelpad-os-root');
    }
    getSystem(systemClass) {
      return _.find(this.currentSystems(), system => {
        return system instanceof systemClass;
      });
    }
    url() {
      var appUrl, url;
      url = PAA.PixelPad.url();
      if (appUrl = this.currentAppUrl()) {
        url = "".concat(url, "/").concat(appUrl, "/*");
      }
      return url;
    }
    appPath(appUrl, appPath, appParameter) {
      if (appPath instanceof Spacebars.kw) {
        appPath = null;
      }
      if (this.justOS) {
        return AB.Router.createUrl('pixelPad', {
          app: appUrl,
          path: appPath,
          parameter: appParameter
        });
      } else {
        return AB.Router.createUrl(LOI.adventure, {
          parameter1: PAA.PixelPad.url(),
          parameter2: appUrl,
          parameter3: appPath,
          parameter4: appParameter
        });
      }
    }
    go(appUrl, appPath, appParameter) {
      return AB.Router.goToUrl(this.appPath(appUrl, appPath, appParameter));
    }
    shortcutsTableVisibleClass() {
      if (_.every([...this.currentSystems(), this.currentApp()], program => {
        return program.allowsShortcutsTable();
      })) {
        return 'visible';
      }
    }
    backButtonCallback() {
      var base, i, len, ref, system;
      if (typeof (base = this.currentApp()).onBackButton === "function" ? base.onBackButton() : void 0) {
        return {
          // See if the app can handle it.
          cancel: true
        };
      }
      ref = this.currentSystems();

      // See if any of the systems want to handle it.
      for (i = 0, len = ref.length; i < len; i++) {
        system = ref[i];
        if (typeof system.onBackButton === "function" ? system.onBackButton() : void 0) {
          return {
            cancel: true
          };
        }
      }
      // Clear one of the parameters.
      if (this.currentAppParameter()) {
        // We clear the parameter.
        AB.Router.changeParameter('parameter4', null);
      } else if (this.currentAppPath()) {
        // We return to main app screen.
        AB.Router.changeParameter('parameter3', null);
      } else if (this.currentAppUrl()) {
        // We return to home screen.
        AB.Router.changeParameter('parameter2', null);
      } else {
        // No app is open, we should actually close PixelPad.
        LOI.adventure.deactivateActiveItem();
        return;
      }
      return {
        // Instruct the back button to cancel closing (so it doesn't disappear).
        cancel: true
      };
    }
  }
  ;
  OS.register(OS.id());
  OS.Audio = new LOI.Assets.Audio.Namespace(OS.id(), {
    variables: {
      complete: AEc.ValueTypes.Trigger
    }
  });
  return OS;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.os.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/os/template.os.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("PixelArtAcademy.PixelPad.OS");
Template["PixelArtAcademy.PixelPad.OS"] = new Template("Template.PixelArtAcademy.PixelPad.OS", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("justOS"));
  }, function() {
    return [ "\n    ", HTML.STYLE("\n      html {\n        font-size: ", Blaze.View("lookup:display.scale", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("display"), "scale"));
    }), "px\n      }\n    "), "\n    ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("display"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n  " ];
  }), "\n  ", HTML.DIV({
    class: "pixelartacademy-pixelpad-os"
  }, "\n    ", HTML.DIV({
    class: "app-area"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentApp"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("currentApp"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: "systems"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("currentSystems"));
  }, function() {
    return [ "\n        ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("dontRender"));
    }, function() {
      return [ "\n          ", Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("."));
      }, function() {
        return Spacebars.include(view.lookupTemplate("Render"));
      }), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: function() {
      return [ "shortcuts-table ", Spacebars.mustache(view.lookup("shortcutsTableVisibleClass")) ];
    }
  }, "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Components", "ShortcutsTable"));
  }), "\n    "), "\n  ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"apps":{"apps.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/apps/apps.coffee                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps = function () {
  class Apps extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps';
    }
    things() {
      return [this.constructor.HomeScreen];
    }
  }
  ;
  Apps.initialize();
  return Apps;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"homescreen":{"homescreen.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/apps/homescreen/homescreen.coffee                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.HomeScreen = function () {
  class HomeScreen extends PAA.PixelPad.App {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.HomeScreen';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "主屏幕";
    }
    static description() {
      return "这是您可以在像素平板上启动应用的地方。";
    }
    template() {
      return this.id();
    }
    constructor() {
      super(...arguments);
      this.setMinimumPixelPadSize();
    }
    onCreated() {
      super.onCreated(...arguments);
      return $(document).on('visibilitychange.pixelartacademy-pixelpad-apps-homescreen', () => {
        if (document.visibilityState === 'hidden') {
          return this.audio.appHover(false);
        }
      });
    }
    onRendered() {
      super.onRendered(...arguments);

      // Run intro animation.
      this.$('.pixelartacademy-pixelpad-apps-homescreen').css({
        opacity: 1
      });
      return this.$('.apps .app').velocity('transition.slideUpIn', {
        stagger: 150
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return $(document).off('.pixelartacademy-pixelpad-apps-homescreen');
    }
    onDeactivate(finishedDeactivatingCallback) {
      var $app;
      this.audio.appHover(false);
      if ($app = this.$('.apps .app')) {
        return $app.velocity('transition.fadeOut', {
          complete: function () {
            return finishedDeactivatingCallback();
          },
          stagger: 150
        });
      } else {
        return finishedDeactivatingCallback();
      }
    }
    allowsShortcutsTable() {
      return true;
    }
    enabledClass() {
      if (!this.os.currentAppUrl()) {
        // Note: We have to check the URL since the app itself won't change until the transition.
        return 'enabled';
      }
    }
    apps() {
      // Show all apps except the home screen.
      return _.without(this.os.currentApps(), this);
    }
    events() {
      return super.events(...arguments).concat({
        'mouseenter .apps .app': this.onMouseEnterApp,
        'mouseleave .apps .app': this.onMouseLeaveApp,
        'click .apps .app .link': this.onClickLink
      });
    }
    onMouseEnterApp(event) {
      this.audio.appPan(AEc.getPanForElement(event.target));
      return this.audio.appHover(true);
    }
    onMouseLeaveApp(event) {
      return this.audio.appHover(false);
    }
    onClickLink(event) {
      this.audio.appHover(false);
      return this.audio.appLaunch();
    }
  }
  ;
  HomeScreen.register(HomeScreen.id());
  HomeScreen.initialize();
  HomeScreen.Audio = new LOI.Assets.Audio.Namespace(HomeScreen.id(), {
    // Allow for the launch sound to play out.
    unloadDelay: 1.7,
    variables: {
      appHover: AEc.ValueTypes.Boolean,
      appLaunch: AEc.ValueTypes.Trigger,
      appPan: AEc.ValueTypes.Number
    }
  });
  return HomeScreen;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.homescreen.js":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/apps/homescreen/template.homescreen.js                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.HomeScreen");
Template["PixelArtAcademy.PixelPad.Apps.HomeScreen"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.HomeScreen", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-homescreen app"
  }, "\n    ", HTML.UL({
    class: function() {
      return [ "apps ", Spacebars.mustache(view.lookup("enabledClass")) ];
    }
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("apps"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "app"
    }, "\n          ", HTML.A({
      class: "link",
      href: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("os"), "appPath"), Spacebars.dot(view.lookup("."), "url"));
      }
    }, "\n            ", HTML.IMG({
      src: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "iconUrl"));
      },
      class: "icon"
    }), "\n            ", HTML.SPAN({
      class: "name"
    }, "\n              ", Blaze.View("lookup:..fullName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "fullName"));
    }), "\n            "), "\n          "), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"systems":{"systems.coffee":function module(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/retronator_pixelartacademy-pixelpad/systems/systems.coffee                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Systems = function () {
  class Systems extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.PixelPad.Systems';
    }
    things() {
      return [];
    }
  }
  ;
  Systems.initialize();
  return Systems;
}.call(this);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/pixelpad.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/template.pixelpad.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/app.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/system.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/components/components.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/components/shortcutstable/shortcutstable.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/components/shortcutstable/template.shortcutstable.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/components/speechballoon/speechballoon.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/components/speechballoon/template.speechballoon.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/components/mixins/mixins.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/components/mixins/pageturner.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/os/os.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/os/template.os.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/apps/apps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/apps/homescreen/homescreen.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/apps/homescreen/template.homescreen.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad/systems/systems.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad", {
  PixelArtAcademy: PixelArtAcademy
});

})();
