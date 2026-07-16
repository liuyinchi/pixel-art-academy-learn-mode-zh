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
var PixelArtAcademy = Package['retronator:pixelartacademy'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixeltosh":{"pixeltosh.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/pixeltosh.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AM = Artificial.Mummification;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.Pixeltosh = class Pixeltosh {
  constructor() {
    AB.Router.addRoute('/pixeltosh/:programSlug?/:projectId?', PAA.LearnMode.Layouts.PublicAccess, this.constructor.Pages.Pixeltosh);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"adventure":{"adventure.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/adventure/adventure.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LM, LOI, PAA, Persistence;
AB = Artificial.Base;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
PAA.Pixeltosh.Adventure = class Adventure extends LOI.Adventure {
  constructor() {
    super(...arguments);

    // Set the global instance.
    LOI.adventure = this;

    // Provides support for autorun and subscribe calls even when component is not created.
    this._autorunHandles = [];
    this.interface = {
      listeners: () => {
        return [];
      },
      reset: () => {}
    };
    this._initializeAudio();
    this.director = new LOI.Director();
    this._initializeState();
    this._initializeMemories();
    this._initializeTimeline();
    this._initializeLocation();
    this._initializeContext();
    this._initializeActiveItem();
    this._initializeEpisodes();
    this._initializeInventory();
    this._initializeThings();
    this._initializeListeners();
    LOI.adventureInitialized(true);
  }
  destroy() {
    var handle, i, len, ref, results;
    ref = this._autorunHandles;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      handle = ref[i];
      results.push(handle.stop());
    }
    return results;
  }
  usesLocalState() {
    return true;
  }
  registerSyncedStorages() {
    this.indexedDBSyncedStorage = new Persistence.SyncedStorages.IndexedDB({
      databaseName: "Retronator"
    });
    return Persistence.registerSyncedStorage(this.indexedDBSyncedStorage);
  }
  startingPoint() {
    return {
      locationId: LM.Locations.Play.id(),
      timelineId: LOI.TimelineIds.RealLife
    };
  }

  // A variant of autorun that works even when the component isn't being rendered.
  autorun(handler) {
    var handle;
    handle = Tracker.autorun(handler);
    this._autorunHandles.push(handle);
    return handle;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"computer":{"computer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/computer/computer.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AEc, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AC = Artificial.Control;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Computer = function () {
  class Computer extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Computer';
    }
    static version() {
      return '0.1.0';
    }
    constructor(os) {
      super(...arguments);
      this.os = os;
    }
    crtEmulationClass() {
      if (LOI.settings.graphics.crtEmulation.value()) {
        return 'crt-emulation';
      }
    }
  }
  ;
  Computer.register(Computer.id());
  return Computer;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.computer.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/computer/template.computer.js                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Computer");
Template["PixelArtAcademy.Pixeltosh.Computer"] = new Template("Template.PixelArtAcademy.Pixeltosh.Computer", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-computer"
  }, HTML.Raw('\n    <div class="case"></div>\n    '), HTML.DIV({
    class: function() {
      return [ "screen ", Spacebars.mustache(view.lookup("crtEmulationClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: "os"
  }, "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("os"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"os":{"os.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/os.coffee                                                          //
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
PAA.Pixeltosh.OS = function () {
  class OS extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.programLocation = new PAA.Pixeltosh.Programs();
      this.currentProgramsSituation = new ComputedField(() => {
        var options;
        options = {
          timelineId: LOI.adventure.currentTimelineId(),
          location: this.programLocation
        };
        if (!(options.timelineId && options.location)) {
          return;
        }
        return new LOI.Adventure.Situation(options);
      });

      // We use caches to avoid reconstruction.
      this._programs = {};
      // Instantiates and returns all programs that are available to listen to commands.
      this.currentPrograms = new ComputedField(() => {
        var currentProgramsSituation, i, len, programClass, programClasses, results;
        // When running in the adventure interface, get programs from the situation.
        if (!(currentProgramsSituation = this.currentProgramsSituation())) {
          return;
        }
        programClasses = _.clone(currentProgramsSituation.things());

        // Finder is always available.
        programClasses.push(PAA.Pixeltosh.Programs.Finder);
        results = [];
        for (i = 0, len = programClasses.length; i < len; i++) {
          programClass = programClasses[i];
          results.push(this.getProgram(programClass));
        }
        return results;
      });
      this.loadedPrograms = new ReactiveField([]);
      this.autorun(computation => {
        var i, len, program, ref, results, shortcuts;
        ref = this.loadedPrograms();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          program = ref[i];
          if (!(shortcuts = program.shortcuts())) {
            continue;
          }
          results.push(this.interface.data.child('shortcuts').set(_.snakeCase(program.id()), {
            name: program.fullName(),
            mapping: shortcuts
          }));
        }
        return results;
      });
      this.activeWindowId = new ReactiveField(null);
      this.activeProgram = new ReactiveField(null, (a, b) => {
        return a === b;
      });
      this.display = this.callAncestorWith('display');
      this.interface = new this.constructor.Interface(this);
      this.cursor = new ComputedField(() => {
        return this.interface.getView(PAA.Pixeltosh.OS.Interface.Cursor);
      });
      return this.fileSystem = new this.constructor.FileSystem({
        os: this
      });
    }

    // Note: We perform the rest of initialization on rendered when the interface is already created.
    onRendered() {
      var programClass, programSlug;
      super.onRendered(...arguments);
      // Load the starting program.
      programSlug = AB.Router.getParameter('programSlug') || AB.Router.getParameter('parameter3') || PAA.Pixeltosh.Programs.Finder.slug();
      if (programClass = PAA.Pixeltosh.Program.getClassForSlug(programSlug)) {
        this.loadProgram(this.getProgram(programClass));
      }

      // Reactively load the menu of the active program.
      return this.autorun(computation => {
        var activeMenuItems, menuData, ref;
        activeMenuItems = (ref = this.activeProgram()) != null ? ref.menuItems() : void 0;
        menuData = this.interface.data.child("layouts.main.windows.".concat(this.constructor.Interface.menuId));
        menuData.set('height', activeMenuItems ? 14 : 0);
        return menuData.set('items', activeMenuItems || []);
      });
    }
    onDestroyed() {
      var i, len, program, programId, ref, ref1, ref2;
      super.onDestroyed(...arguments);
      ref = this.loadedPrograms();
      for (i = 0, len = ref.length; i < len; i++) {
        program = ref[i];
        program.unload();
      }
      ref1 = this._programs;
      for (programId in ref1) {
        program = ref1[programId];
        program.destroy();
      }
      return (ref2 = this.fileSystem) != null ? ref2.destroy() : void 0;
    }
    getProgram(programClassOrId) {
      var programClass, programId;
      [programId, programClass] = _.thingIdAndClass(programClassOrId);
      Tracker.nonreactive(() => {
        var base;
        return (base = this._programs)[programId] != null ? base[programId] : base[programId] = new programClass(this);
      });
      return this._programs[programId];
    }
    loadProgram(program, file) {
      return Tracker.nonreactive(() => {
        var loadedPrograms;
        loadedPrograms = this.loadedPrograms();
        loadedPrograms.push(program);
        this.loadedPrograms(loadedPrograms);
        program.load(file);
        return this.activateProgram(program);
      });
    }
    unloadProgram(program) {
      return Tracker.nonreactive(() => {
        var loadedPrograms, programId, window, windowId, windows;
        loadedPrograms = this.loadedPrograms();
        _.pull(loadedPrograms, program);
        this.loadedPrograms(loadedPrograms);
        if (this.activeProgram() === program && loadedPrograms.length) {
          this.activateProgram(_.last(loadedPrograms));
        }

        // Remove all the windows that belonged to this program.
        programId = program.id();
        windows = this.interface.currentLayoutData().get('windows');
        for (windowId in windows) {
          window = windows[windowId];
          if (window.programId === programId) {
            this.removeWindow(windowId);
          }
        }
        return program.unload();
      });
    }
    activateProgram(program) {
      this.activeProgram(program);
      return this.interface.currentShortcutsMappingId(_.snakeCase(program.id()));
    }
    throwError(options) {
      var dialog;
      dialog = this.constructor.Interface.ErrorDialog.createInterfaceData(options);
      return this.interface.displayDialog(dialog);
    }
    addWindow(windowData) {
      var windowId;
      windowId = this.interface.addWindow(_.extend({}, windowData, {
        order: this._getMaxWindowOrder() + 1
      }));
      this.activateWindow(windowId);

      // Return the window ID.
      return windowId;
    }
    removeWindow(windowId) {
      this.interface.removeWindow(windowId);
      if (this.activeWindowId() === windowId) {
        return this.activeWindowId(null);
      }
    }
    async activateWindow(windowId) {
      var program, programView;
      this.activeWindowId(windowId);

      // Activating a window also activates its program.
      this._lastActivatedWindowId = windowId;
      try {
        programView = await this.getProgramViewForWindowIdAsync(windowId);
      } catch (error) {
        return;
      }
      // Make sure we're not waiting to activate a different window by now.
      if (windowId !== this._lastActivatedWindowId) {
        return;
      }
      if (program = programView.program()) {
        // Make sure the data of this view is still there (or the program will be empty).
        this.activateProgram(program);
      }
      if (programView.activateBringsWindowToTop()) {
        // See if we should also bring the window to top.
        return this.bringWindowToTop(windowId);
      }
    }
    bringWindowToTop(windowId) {
      return this.interface.currentLayoutData().set("windows.".concat(windowId, ".order"), this._getMaxWindowOrder() + 1);
    }
    getProgramViewForWindowId(windowId) {
      var window;
      if (!(window = this.interface.getWindow(windowId))) {
        return;
      }
      return window.childComponentsOfType(PAA.Pixeltosh.Program.View)[0];
    }
    getProgramViewForWindowIdAsync(windowId) {
      return new Promise((resolve, reject) => {
        return Tracker.nonreactive(() => {
          var getViewAutorun, programView;
          programView = null;

          // Wait until the program view has been rendered.
          getViewAutorun = Tracker.autorun(computation => {
            programView = this.getProgramViewForWindowId(windowId);
            if (!programView) {
              return;
            }
            computation.stop();
            return resolve(programView);
          });

          // If the autorun stops before the view could be found, we report failure.
          return getViewAutorun.onStop(() => {
            if (!programView) {
              return reject();
            }
          });
        });
      });
    }
    _getMaxWindowOrder() {
      var normalWindows, ref, sortedWindows, windows;
      windows = this.interface.currentLayoutData().get('windows');
      normalWindows = _.filter(_.values(windows), window => {
        return !window.alwaysOnTop;
      });
      sortedWindows = _.sortBy(normalWindows, 'order');
      return ((ref = _.last(sortedWindows)) != null ? ref.order : void 0) || 0;
    }
    onBackButton() {
      var activeProgram, errorDialog, result;
      // Relay to the error dialog.
      if (errorDialog = this.interface.getView(PAA.Pixeltosh.OS.Interface.ErrorDialog)) {
        if (result = typeof errorDialog.onBackButton === "function" ? errorDialog.onBackButton() : void 0) {
          return result;
        }
      }

      // Relay to the active program.
      if (!(activeProgram = this.activeProgram())) {
        return;
      }
      if (result = typeof activeProgram.onBackButton === "function" ? activeProgram.onBackButton() : void 0) {
        return result;
      }

      // Allow Pixeltosh to close when we're in Finder.
      if (activeProgram instanceof PAA.Pixeltosh.Programs.Finder) {
        return;
      }

      // Close the program otherwise.
      this.unloadProgram(activeProgram);

      // Inform that we handled the back button.
      return true;
    }
    menuVisibleClass() {
      if (this.activeMenuItems()) {
        return 'menu-visible';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'pointermove .pixelartacademy-pixeltosh-os': this.onPointerMovePixeltoshOS,
        'pointerleave .pixelartacademy-pixeltosh-os': this.onPointerLeavePixeltoshOS,
        'pointerenter *[data-cursor]': this.onPointerEnterDataCursor,
        'pointerleave *[data-cursor]': this.onPointerLeaveDataCursor
      });
    }
    onPointerMovePixeltoshOS(event) {
      return this.cursor().updateCoordinates(event);
    }
    onPointerLeavePixeltoshOS(event) {
      return this.cursor().resetCoordinates();
    }
    onPointerEnterDataCursor(event) {
      return this.cursor().setClass($(event.target).data('cursor'));
    }
    onPointerLeaveDataCursor(event) {
      return this.cursor().setClass(null);
    }
  }
  ;
  OS.register(OS.id());
  OS.Audio = new LOI.Assets.Audio.Namespace(OS.id(), {
    variables: {
      startup: AEc.ValueTypes.Trigger
    }
  });
  return OS;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.os.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/template.os.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.OS");
Template["PixelArtAcademy.Pixeltosh.OS"] = new Template("Template.PixelArtAcademy.Pixeltosh.OS", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-os"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("interface"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interface":{"interface.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/interface.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AEc, AM, FM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AC = Artificial.Control;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
FM = FataMorgana;
PAA.Pixeltosh.OS.Interface = function () {
  class Interface extends FM.Interface {
    constructor(parent) {
      var active, activeToolId, components, cursor, layouts, localInterfaceDataField, menu, shortcuts;
      localInterfaceDataField = new ReactiveField(null);
      super(parent, {
        load: () => {
          return localInterfaceDataField();
        },
        save: (address, value, lazy) => {
          var localInterfaceData;
          localInterfaceData = localInterfaceDataField();
          _.nestedProperty(localInterfaceData, address, value);
          if (!lazy) {
            return localInterfaceDataField(localInterfaceData);
          }
        }
      });
      active = true;
      activeToolId = LOI.Assets.Editor.Tools.Arrow.id();
      components = {};
      menu = {
        id: this.constructor.menuId,
        type: FM.Menu.id(),
        left: 0,
        top: 0,
        right: 0,
        height: 0,
        order: 0,
        alwaysOnTop: true,
        items: []
      };
      cursor = {
        id: Random.id(),
        type: PAA.Pixeltosh.OS.Interface.Cursor.id()
      };
      layouts = {
        currentLayoutId: 'main',
        main: {
          name: 'Main',
          windows: {
            ["".concat(menu.id)]: menu
          },
          overlays: {
            ["".concat(cursor.id)]: cursor
          }
        }
      };
      shortcuts = {
        currentMappingId: 'default',
        default: {
          mapping: {}
        }
      };
      localInterfaceDataField({
        active,
        activeToolId,
        components,
        layouts,
        shortcuts
      });
    }
  }
  ;
  Interface.menuId = _.snakeCase('PixelArtAcademy.Pixeltosh.OS.Interface.Menu');
  Interface.menuHeight = 14;
  Interface.slowCPUEmulationSmallFrameDelay = 0.033;
  Interface.slowCPUEmulationLargeFrameDelay = 0.075;
  return Interface;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"errordialog":{"errordialog.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/errordialog/errordialog.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var FM, PAA;
FM = FataMorgana;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.ErrorDialog = function () {
  class ErrorDialog extends FM.Dialog {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.Interface.ErrorDialog';
    }
    static createInterfaceData(options) {
      return {
        contentComponentId: this.id(),
        contentComponentData: options,
        canDismiss: false,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
    }
    onBackButton() {
      var options;
      options = this.data();
      if (options.shutDownProgramId) {
        this.shutDown();
      }
      this.closeDialog();

      // Inform that we've handled the back button.
      return true;
    }
    shutDown() {
      var options, program;
      options = this.data();
      program = this.os.getProgram(options.shutDownProgramId);
      return this.os.unloadProgram(program);
    }
    events() {
      return super.events(...arguments).concat({
        'click .shut-down-button': this.onClickShutDownButton
      });
    }
    onClickShutDownButton(event) {
      this.shutDown();
      return this.closeDialog();
    }
  }
  ;
  ErrorDialog.register(ErrorDialog.id());
  return ErrorDialog;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.errordialog.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/errordialog/template.errordialog.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.OS.Interface.ErrorDialog");
Template["PixelArtAcademy.Pixeltosh.OS.Interface.ErrorDialog"] = new Template("Template.PixelArtAcademy.Pixeltosh.OS.Interface.ErrorDialog", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-os-interface-errordialog"
  }, "\n    ", HTML.DIV({
    class: "dialog pixelartacademy-pixeltosh-os-interface-rectanglearea"
  }, HTML.Raw('\n      <div class="bomb"></div>\n      '), HTML.DIV({
    class: "text"
  }, HTML.Raw('\n        <div class="error">Sorry, a system error occurred.</div>\n        '), HTML.DIV({
    class: "reason"
  }, Blaze.View("lookup:reason", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("reason")));
  })), "\n        ", HTML.DIV({
    class: "details"
  }, Blaze.View("lookup:details", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("details")));
  })), "\n      "), "\n      ", HTML.DIV({
    class: "actions"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("shutDownProgramId"));
  }, function() {
    return HTML.Raw('\n          <button class="shut-down-button pixelartacademy-pixeltosh-os-interface-button">Shut Down</button>\n        ');
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"cursor":{"cursor.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/cursor/cursor.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var FM, LOI, PAA;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.Cursor = function () {
  class Cursor extends FM.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.Interface.Cursor';
    }
    constructor() {
      super(...arguments);

      // The pixel coordinate is the display coordinate rounded to a whole integer.
      this.coordinates = new ReactiveField(null, EJSON.equals);
      this.desiredClasses = new ReactiveField([{
        className: null,
        requester: this
      }]);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.display = this.callAncestorWith('display');

      // Create a throttled coordinates update function to emulate a slow CPU.
      this.autorun(computation => {
        var delay;
        delay = LOI.settings.graphics.slowCPUEmulation.value() ? PAA.Pixeltosh.OS.Interface.slowCPUEmulationSmallFrameDelay : 0;
        return this._updateCoordinatesThrottled = _.throttle(coordinates => {
          return this.coordinates(coordinates);
        }, delay * 1000);
      });
      return this.class = new ComputedField(() => {
        return _.last(this.desiredClasses()).className;
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.$origin = this.$('.pixelartacademy-pixeltosh-os-interface-cursor');
    }
    setClass(className) {
      var desiredClasses;
      desiredClasses = Tracker.nonreactive(() => {
        return this.desiredClasses();
      });
      desiredClasses[0].className = className;
      return this.desiredClasses(desiredClasses);
    }
    requestClass(className, requester) {
      var desiredClasses;
      desiredClasses = Tracker.nonreactive(() => {
        return this.desiredClasses();
      });
      // Remove any existing requests for this class/requester and put the new one to the top.
      _.remove(desiredClasses, desiredClass => {
        return desiredClass.className === className && desiredClass.requester === requester;
      });
      desiredClasses.push({
        className,
        requester
      });
      return this.desiredClasses(desiredClasses);
    }
    endClassRequest(className, requester) {
      var desiredClasses;
      desiredClasses = Tracker.nonreactive(() => {
        return this.desiredClasses();
      });
      _.remove(desiredClasses, desiredClass => {
        return desiredClass.className === className && desiredClass.requester === requester;
      });
      return this.desiredClasses(desiredClasses);
    }
    endClassRequests(requester) {
      var desiredClasses;
      desiredClasses = Tracker.nonreactive(() => {
        return this.desiredClasses();
      });
      _.remove(desiredClasses, desiredClass => {
        return desiredClass.requester === requester;
      });
      return this.desiredClasses(desiredClasses);
    }
    wait(requester) {
      return this.requestClass('wait', requester);
    }
    endWait(requester) {
      return this.endClassRequest('wait', requester);
    }
    updateCoordinates(event) {
      var displayScale, originPosition;
      originPosition = this.$origin.offset();
      displayScale = this.display.scale();
      return this._updateCoordinatesThrottled({
        x: Math.floor((event.pageX - originPosition.left) / displayScale),
        y: Math.floor((event.pageY - originPosition.top) / displayScale)
      });
    }
    resetCoordinates() {
      this._updateCoordinatesThrottled.flush();
      return this.coordinates(null);
    }
    cursorStyle() {
      var coordinates;
      if (!(coordinates = this.coordinates())) {
        return {
          display: 'none'
        };
      }
      return {
        left: "".concat(coordinates.x, "rem"),
        top: "".concat(coordinates.y, "rem")
      };
    }
  }
  ;
  Cursor.register(Cursor.id());
  return Cursor;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.cursor.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/cursor/template.cursor.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.OS.Interface.Cursor");
Template["PixelArtAcademy.Pixeltosh.OS.Interface.Cursor"] = new Template("Template.PixelArtAcademy.Pixeltosh.OS.Interface.Cursor", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-os-interface-cursor"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "cursor ", Spacebars.mustache(view.lookup("class")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("cursorStyle"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"titlebar":{"titlebar.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/titlebar/titlebar.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var FM, LOI, PAA;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.TitleBar = function () {
  class TitleBar extends FM.View {
    // text: string to display in the title bar
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.Interface.TitleBar';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.os = this.interface.parent;
    }
    activeClass() {
      var view;
      view = this.ancestorComponentOfType(PAA.Pixeltosh.Program.View);
      if (view.active()) {
        return 'active';
      }
    }
  }
  ;
  TitleBar.register(TitleBar.id());
  return TitleBar;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.titlebar.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/titlebar/template.titlebar.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.OS.Interface.TitleBar");
Template["PixelArtAcademy.Pixeltosh.OS.Interface.TitleBar"] = new Template("Template.PixelArtAcademy.Pixeltosh.OS.Interface.TitleBar", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixeltosh-os-interface-titlebar ", Spacebars.mustache(view.lookup("activeClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: "contents"
  }, HTML.Raw('\n      <button class="close-button"></button>\n      '), HTML.DIV({
    class: "text-area"
  }, "\n        ", HTML.SPAN({
    class: "text"
  }, Blaze.View("lookup:get", function() {
    return Spacebars.mustache(view.lookup("get"), "text");
  })), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"window":{"window.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/window/window.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, FM, LOI, PAA;
AB = Artificial.Base;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.Window = function () {
  class Window extends FM.View {
    // title: information for the window's title bar
    // scrollbars: information about the window's scrollbars for ScrollableArea
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.Interface.Window';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;

      // Properties coming from the program view.
      this.programViewData = new ComputedField(() => {
        var programView;
        if (!(programView = this.ancestorComponentOfType(PAA.Pixeltosh.Program.View))) {
          return;
        }
        return programView.data();
      });
      this.windowSize = new ComputedField(() => {
        var programViewData;
        if (!(programViewData = this.programViewData())) {
          return;
        }
        return _.pick(programViewData.value(), ['width', 'height']);
      });

      // Create fields for indicating changes.
      this.windowMoveDelta = new ReactiveField(null);
      this.windowResizeDelta = new ReactiveField(null);
      // Allow folder to be informed when any of our settings changed so they can be saved.
      return this.changed = new AB.Event(this);
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this._endEvents();
    }
    _endEvents() {
      return $(document).off('.pixelartacademy-pixeltosh-os-interface-window');
    }
    scrollToElement(element, options) {
      var scrollableArea;
      scrollableArea = this.childComponentsOfType(PAA.Pixeltosh.OS.Interface.ScrollableArea)[0];
      return scrollableArea.scrollToElement(element, options);
    }
    programViewActive() {
      var programView;
      programView = this.ancestorComponentOfType(PAA.Pixeltosh.Program.View);
      return programView.active();
    }

    // Move indicator
    moveIndicatorVisibleClass() {
      if (this.windowMoveDelta() || this.windowResizeDelta()) {
        return 'visible';
      }
    }
    moveIndicatorDitherClasses() {
      var height, heightClass, inverseClass, left, moveDelta, programViewData, resizeDelta, top, width, widthClass;
      resizeDelta = this.windowResizeDelta();
      moveDelta = this.windowMoveDelta();
      programViewData = this.programViewData();
      left = programViewData.get('left') + ((moveDelta != null ? moveDelta.x : void 0) || 0);
      top = programViewData.get('top') + ((moveDelta != null ? moveDelta.y : void 0) || 0);
      width = this._roundToEven(programViewData.get('width') + ((resizeDelta != null ? resizeDelta.width : void 0) || 0));
      height = this._roundToEven(programViewData.get('height') + ((resizeDelta != null ? resizeDelta.height : void 0) || 0));
      widthClass = Math.floor(width / 2) % 2 ? 'dither-width-odd' : 'dither-width-even';
      heightClass = Math.floor(height / 2) % 2 ? 'dither-height-odd' : 'dither-height-even';
      inverseClass = _.modulo(left, 2) === _.modulo(top, 2) ? 'dither-inverse' : '';
      return "".concat(widthClass, " ").concat(heightClass, " ").concat(inverseClass);
    }
    moveIndicatorStyle() {
      var moveDelta, resizeDelta, windowSize;
      if (!(windowSize = this.windowSize())) {
        return;
      }
      moveDelta = this.windowMoveDelta();
      resizeDelta = this.windowResizeDelta();
      return {
        left: "".concat(((moveDelta != null ? moveDelta.x : void 0) || 0) - 1, "rem"),
        top: "".concat(((moveDelta != null ? moveDelta.y : void 0) || 0) - 1, "rem"),
        width: "".concat(this._roundToEven(windowSize.width + ((resizeDelta != null ? resizeDelta.width : void 0) || 0)), "rem"),
        height: "".concat(this._roundToEven(windowSize.height + ((resizeDelta != null ? resizeDelta.height : void 0) || 0)), "rem")
      };
    }
    _roundToEven(value) {
      return Math.round(value / 2) * 2;
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown .title-bar': this.onPointerDownTitleBar,
        'pointerdown .resize-control': this.onPointerDownResizeControl,
        'click .title-bar .close-button': this.onClickCloseButton
      });
    }

    // Moving the window
    onPointerDownTitleBar(event) {
      var $document, cursor, delay, dragStartCoordinates, minDeltaY, programViewData, throttledMove;
      // Don't activate if clicking on the close button.
      if (event.target === this.$('.title-bar .close-button')[0]) {
        return;
      }
      this.windowMoveDelta({
        x: 0,
        y: 0
      });
      // Remember starting position of drag.
      cursor = this.os.cursor();
      dragStartCoordinates = cursor.coordinates();

      // Calculate maximum Y offset (resulting top has to be 14 or more).
      programViewData = this.programViewData();
      minDeltaY = PAA.Pixeltosh.OS.Interface.menuHeight - programViewData.get('top');
      // Wire dragging handlers.
      $document = $(document);

      // Create a throttled delta update function to emulate a slow CPU.
      delay = 0;
      if (LOI.settings.graphics.slowCPUEmulation.value()) {
        delay = PAA.Pixeltosh.OS.Interface.slowCPUEmulationLargeFrameDelay * 1000;
      }
      $document.on('pointermove.pixelartacademy-pixeltosh-os-interface-window', throttledMove = _.throttle(event => {
        var coordinates;
        if (!(coordinates = cursor.coordinates())) {
          return;
        }
        return this.windowMoveDelta({
          x: Math.round(coordinates.x - dragStartCoordinates.x),
          y: Math.max(minDeltaY, Math.round(coordinates.y - dragStartCoordinates.y))
        });
      }, delay));
      return $document.on('pointerup.pixelartacademy-pixeltosh-os-interface-window', event => {
        var delta, newProperties;
        // End drag mode.
        this._endEvents();
        throttledMove.cancel();
        delta = this.windowMoveDelta();
        this.windowMoveDelta(null);
        programViewData = this.programViewData();
        newProperties = {
          left: programViewData.get('left') + delta.x,
          top: programViewData.get('top') + delta.y
        };
        programViewData.set('left', newProperties.left);
        programViewData.set('top', newProperties.top);
        return this.changed(newProperties);
      });
    }

    // Resizing the window
    onPointerDownResizeControl(event) {
      var $document, cursor, delay, dragStartCoordinates, minDeltaHeight, minDeltaWidth, programViewData;
      this.windowResizeDelta({
        width: 0,
        height: 0
      });
      // Remember starting position of drag.
      cursor = this.os.cursor();
      dragStartCoordinates = cursor.coordinates();

      // Calculate maximum Y offset (resulting top has to be 14 or more).
      programViewData = this.programViewData();
      minDeltaWidth = 60 - programViewData.get('width');
      minDeltaHeight = 75 - programViewData.get('height');
      // Wire dragging handlers.
      $document = $(document);

      // Create a throttled delta update function to emulate a slow CPU.
      delay = 0;
      if (LOI.settings.graphics.slowCPUEmulation.value()) {
        delay = PAA.Pixeltosh.OS.Interface.slowCPUEmulationLargeFrameDelay * 1000;
      }
      $document.on('pointermove.pixelartacademy-pixeltosh-os-interface-window', _.throttle(event => {
        var coordinates;
        if (!(coordinates = cursor.coordinates())) {
          return;
        }
        return this.windowResizeDelta({
          width: Math.max(minDeltaWidth, Math.round(coordinates.x - dragStartCoordinates.x)),
          height: Math.max(minDeltaHeight, Math.round(coordinates.y - dragStartCoordinates.y))
        });
      }, delay));
      return $document.on('pointerup.pixelartacademy-pixeltosh-os-interface-window', event => {
        var delta, newProperties;
        // End drag mode.
        this._endEvents();
        delta = this.windowResizeDelta();
        this.windowResizeDelta(null);
        programViewData = this.programViewData();
        newProperties = {
          width: programViewData.get('width') + delta.width,
          height: programViewData.get('height') + delta.height
        };
        programViewData.set('width', newProperties.width);
        programViewData.set('height', newProperties.height);
        return this.changed(newProperties);
      });
    }

    // Closing the window
    onClickCloseButton(event) {
      return this.interface.getOperator(PAA.Pixeltosh.OS.Interface.Actions.Close).execute();
    }

    // Forwarding scrollable area changes
    onScrollableAreaChanged(changes) {
      return this.changed(changes);
    }
  }
  ;
  Window.register(Window.id());
  return Window;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.window.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/window/template.window.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.OS.Interface.Window");
Template["PixelArtAcademy.Pixeltosh.OS.Interface.Window"] = new Template("Template.PixelArtAcademy.Pixeltosh.OS.Interface.Window", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-os-interface-window pixelartacademy-pixeltosh-os-interface-rectanglearea"
  }, "\n    ", HTML.DIV({
    class: "title-bar"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("child"), "title");
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "OS", "Interface", "TitleBar"));
    });
  }), "\n    "), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("get"), "scrollbars");
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "OS", "Interface", "ScrollableArea"));
    }, function() {
      return [ "\n      ", Blaze._TemplateWith(function() {
        return Spacebars.dataMustache(Spacebars.dot(view.lookup("data"), "child"), "contentArea");
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("FataMorgana"), "DockedArea"));
        });
      }), "\n    " ];
    });
  }), "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "move-indicator ", Spacebars.mustache(view.lookup("moveIndicatorVisibleClass")), " ", Spacebars.mustache(view.lookup("moveIndicatorDitherClasses")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("moveIndicatorStyle"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"scrollablearea":{"scrollablearea.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/scrollablearea/scrollablearea.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, scrollDelay, scrollDelta, scrollbarArrowSize, scrollbarPositionSize;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
scrollbarArrowSize = 10;
scrollbarPositionSize = 12;
scrollDelta = 10;
scrollDelay = 0.125;
PAA.Pixeltosh.OS.Interface.ScrollableArea = function () {
  class ScrollableArea extends AM.Component {
    // horizontal: controls horizontal scrolling
    //   enabled: boolean whether scrolling should be possible
    //   visible: boolean whether the scrollbar should be visible, even if not enabled
    // vertical: controls vertical scrolling
    //   enabled: boolean whether scrolling should be possible
    //   visible: boolean whether the scrollbar should be visible, even if not enabled
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.Interface.ScrollableArea';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.scrollableAreaChangedListener = this.ancestorComponentWith('onScrollableAreaChanged');

      // Properties coming from the program view.
      this.programViewData = new ComputedField(() => {
        var programView;
        if (!(programView = this.ancestorComponentOfType(PAA.Pixeltosh.Program.View))) {
          return;
        }
        return programView.data();
      });

      // Have scroll left and top as normal fields so we can change them without going through program view's reactivity.
      this.scrollTop = new ReactiveField(0);
      this.scrollLeft = new ReactiveField(0);
      // Load initial values from program view.
      this.autorun(computation => {
        var programViewData;
        if (!(programViewData = this.programViewData())) {
          return;
        }
        this.scrollTop(programViewData.value().scrollTop || 0);
        return this.scrollLeft(programViewData.value().scrollLeft || 0);
      });

      // Track size for calculating scrollbar dimensions.
      this.contentAreaSize = new ReactiveField({
        width: 0,
        height: 0
      });
      this.contentSize = new ReactiveField({
        width: 0,
        height: 0
      });
      this.maxScroll = new ComputedField(() => {
        var contentAreaSize, contentSize;
        contentAreaSize = this.contentAreaSize();
        contentSize = this.contentSize();
        return {
          left: Math.max(0, contentSize.width - contentAreaSize.width),
          top: Math.max(0, contentSize.height - contentAreaSize.height)
        };
      });

      // Create the field for indicating changes.
      return this.scrollbarMoveDelta = new ReactiveField(null);
    }
    onRendered() {
      var updateContentAreaSize, updateContentSize;
      super.onRendered(...arguments);

      // Observe content size.
      this.$contentArea = this.$('.content-area');
      updateContentAreaSize = () => {
        var scale;
        scale = this.os.display.scale();
        return this.contentAreaSize({
          width: this.$contentArea.outerWidth() / scale,
          height: this.$contentArea.outerHeight() / scale
        });
      };
      updateContentAreaSize();
      this._contentAreaResizeObserver = new ResizeObserver(updateContentAreaSize);
      this._contentAreaResizeObserver.observe(this.$contentArea[0]);
      this.$content = this.$('.content');
      updateContentSize = () => {
        var scale;
        scale = this.os.display.scale();
        return this.contentSize({
          width: this.$content.outerWidth() / scale,
          height: this.$content.outerHeight() / scale
        });
      };
      updateContentSize();
      this._contentResizeObserver = new ResizeObserver(updateContentSize);
      return this._contentResizeObserver.observe(this.$content[0]);
    }
    onDestroyed() {
      var ref, ref1;
      super.onDestroyed(...arguments);
      if ((ref = this._contentAreaResizeObserver) != null) {
        ref.disconnect();
      }
      if ((ref1 = this._contentResizeObserver) != null) {
        ref1.disconnect();
      }
      Meteor.clearInterval(this._scrollInterval);
      return this._endEvents();
    }
    _endEvents() {
      return $(document).off('.pixelartacademy-pixeltosh-os-interface-window');
    }
    programViewActive() {
      var programView;
      programView = this.ancestorComponentOfType(PAA.Pixeltosh.Program.View);
      return programView.active();
    }

    // Scrolling
    scrollInDirection(vertical, sign) {
      let factor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      if (vertical) {
        return this._setScrollTop(this._clampedScrollTop() + Math.sign(sign) * scrollDelta * factor);
      } else {
        return this._setScrollLeft(this._clampedScrollLeft() + Math.sign(sign) * scrollDelta * factor);
      }
    }
    scrollToElement(element) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var $element, contentAreaOffset, contentAreaSize, elementHeight, elementOffset, elementWidth, scale, scrollDownBy, scrollLeft, scrollLeftBy, scrollRightBy, scrollTop, scrollUpBy;
      if (options.padding == null) {
        options.padding = 20;
      }
      if (options.animate == null) {
        options.animate = false;
      }

      // Get positions relative to document
      scale = this.os.display.scale();
      $element = $(element);
      elementOffset = $element.offset();
      elementOffset.top /= scale;
      elementOffset.left /= scale;
      elementWidth = $element.outerWidth() / scale;
      elementHeight = $element.outerHeight() / scale;
      contentAreaOffset = this.$contentArea.offset();
      contentAreaOffset.top /= scale;
      contentAreaOffset.left /= scale;
      contentAreaSize = this.contentAreaSize();

      // Calculate where to scroll to.
      scrollTop = null;
      scrollLeft = null;
      if (elementOffset.top < contentAreaOffset.top + options.padding) {
        scrollDownBy = contentAreaOffset.top + options.padding - elementOffset.top;
        scrollTop = this._clampedScrollTop() - scrollDownBy;
      } else if (elementOffset.top + elementHeight > contentAreaOffset.top + contentAreaSize.height - options.padding) {
        scrollUpBy = elementOffset.top + elementHeight - (contentAreaOffset.top + contentAreaSize.height - options.padding);
        scrollTop = this._clampedScrollTop() + scrollUpBy;
      }
      if (elementOffset.left < contentAreaOffset.left + options.padding) {
        scrollRightBy = contentAreaOffset.left - elementOffset.left + options.padding;
        scrollLeft = this._clampedScrollLeft() - scrollRightBy;
      } else if (elementOffset.left + elementWidth > contentAreaOffset.left + contentAreaSize.width - options.padding) {
        scrollLeftBy = elementOffset.left + elementWidth - (contentAreaOffset.left + contentAreaSize.width - options.padding);
        scrollLeft = this._clampedScrollLeft() + scrollLeftBy;
      }

      // If we're not animating, simply set the values.
      if (!options.animate) {
        if (scrollTop != null) {
          this._setScrollTop(scrollTop);
        }
        if (scrollLeft != null) {
          this._setScrollLeft(scrollLeft);
        }
        return;
      }

      // Enable waiting for the end of animation.
      return new Promise(async (resolve, reject) => {
        var scrollHorizontalBy, scrollHorizontalFactor, scrollHorizontalTimes, scrollVerticalBy, scrollVerticalFactor, scrollVerticalTimes;
        if (scrollDownBy) {
          // Calculate how many times the scroll in direction should be called.
          scrollVerticalBy = -scrollDownBy;
        }
        if (scrollUpBy) {
          scrollVerticalBy = scrollUpBy;
        }
        if (scrollRightBy) {
          scrollHorizontalBy = -scrollRightBy;
        }
        if (scrollLeftBy) {
          scrollHorizontalBy = scrollLeftBy;
        }
        if (scrollVerticalBy) {
          scrollVerticalTimes = Math.ceil(Math.abs(scrollVerticalBy / scrollDelta));
        }
        if (scrollHorizontalBy) {
          scrollHorizontalTimes = Math.ceil(Math.abs(scrollHorizontalBy / scrollDelta));
        }

        // Allow maximum of 5 scrolls.
        if (scrollVerticalTimes > 5) {
          scrollVerticalFactor = scrollVerticalTimes / 5;
          scrollVerticalTimes = 5;
        }
        if (scrollHorizontalTimes > 5) {
          scrollHorizontalFactor = scrollHorizontalTimes / 5;
          scrollHorizontalTimes = 5;
        }

        // Perform the scrolls.
        while (scrollVerticalTimes || scrollHorizontalTimes) {
          if (typeof options.skipAnimation === "function" ? options.skipAnimation() : void 0) {
            break;
          }
          if (scrollVerticalTimes) {
            this.scrollInDirection(true, scrollVerticalBy, scrollVerticalFactor);
            scrollVerticalTimes--;
            if (!scrollVerticalTimes) {
              this._setScrollTop(scrollTop);
            }
          }
          if (scrollHorizontalTimes) {
            this.scrollInDirection(false, scrollHorizontalBy, scrollHorizontalFactor);
            scrollHorizontalTimes--;
            if (!scrollHorizontalTimes) {
              this._setScrollLeft(scrollLeft);
            }
          }
          if (scrollVerticalTimes || scrollHorizontalTimes) {
            await _.waitForSeconds(scrollDelay);
          }
        }
        if (scrollTop != null) {
          // Set final values again in case we skip animation.
          this._setScrollTop(scrollTop);
        }
        if (scrollLeft != null) {
          this._setScrollLeft(scrollLeft);
        }
        return resolve();
      });
    }
    scrollToBottom() {
      return this._setScrollTop(this.maxScroll().top);
    }
    _clampedScrollTop() {
      return _.clamp(this.scrollTop(), 0, this.maxScroll().top);
    }
    _clampedScrollLeft() {
      return _.clamp(this.scrollLeft(), 0, this.maxScroll().left);
    }
    _setScrollTop(scrollTop) {
      var ref, ref1;
      this.scrollTop(scrollTop);
      if ((ref = this.scrollableAreaChangedListener) != null) {
        ref.onScrollableAreaChanged({
          scrollTop
        });
      }

      // Perform a lazy set so that the interface doesn't rerender.
      return (ref1 = this.programViewData()) != null ? ref1.lazySet('scrollTop', this.scrollTop()) : void 0;
    }
    _setScrollLeft(scrollLeft) {
      var ref, ref1;
      this.scrollLeft(scrollLeft);
      if ((ref = this.scrollableAreaChangedListener) != null) {
        ref.onScrollableAreaChanged({
          scrollLeft
        });
      }

      // Perform a lazy set so that the interface doesn't rerender.
      return (ref1 = this.programViewData()) != null ? ref1.lazySet('scrollLeft', this.scrollLeft()) : void 0;
    }

    // Content and scrollbars
    contentStyle() {
      return {
        left: "-".concat(this._clampedScrollLeft(), "rem"),
        top: "-".concat(this._clampedScrollTop(), "rem")
      };
    }
    verticalScrollbarActive() {
      return this.contentSize().height > this.contentAreaSize().height;
    }
    horizontalScrollbarActive() {
      return this.contentSize().width > this.contentAreaSize().width;
    }
    verticalScrollbarActiveClass() {
      if (this.verticalScrollbarActive() && this.programViewActive()) {
        return 'active';
      }
    }
    horizontalScrollbarActiveClass() {
      if (this.horizontalScrollbarActive() && this.programViewActive()) {
        return 'active';
      }
    }
    verticalScrollbarDraggingClass() {
      var ref;
      if (((ref = this.scrollbarMoveDelta()) != null ? ref.top : void 0) != null) {
        return 'dragging';
      }
    }
    horizontalScrollbarDraggingClass() {
      var ref;
      if (((ref = this.scrollbarMoveDelta()) != null ? ref.left : void 0) != null) {
        return 'dragging';
      }
    }
    verticalScrollbarArrowDisabledAttribute() {
      if (!this.verticalScrollbarActive()) {
        return {
          disabled: true
        };
      }
    }
    horizontalScrollbarArrowDisabledAttribute() {
      if (!this.horizontalScrollbarActive()) {
        return {
          disabled: true
        };
      }
    }
    verticalScrollbarVisible() {
      var options, ref, ref1;
      options = this.data();
      return ((ref = options.vertical) != null ? ref.visible : void 0) || ((ref1 = options.vertical) != null ? ref1.enabled : void 0);
    }
    horizontalScrollbarVisible() {
      var options, ref, ref1;
      options = this.data();
      return ((ref = options.horizontal) != null ? ref.visible : void 0) || ((ref1 = options.horizontal) != null ? ref1.enabled : void 0);
    }
    resizeControlVisible() {
      return (this.verticalScrollbarVisible() || this.horizontalScrollbarVisible()) && this.programViewActive();
    }
    verticalScrollbarEnabled() {
      var options, ref;
      options = this.data();
      return ((ref = options.vertical) != null ? ref.enabled : void 0) && this.programViewActive();
    }
    horizontalScrollbarEnabled() {
      var options, ref;
      options = this.data();
      return ((ref = options.horizontal) != null ? ref.enabled : void 0) && this.programViewActive();
    }
    verticalScrollbarPositionStyle() {
      return this._verticalScrollbarPositionStyle(this.scrollTop());
    }
    verticalScrollbarPositionMoveIndicatorStyle() {
      var ref;
      return this._verticalScrollbarPositionStyle(this._clampedScrollTop() + ((ref = this.scrollbarMoveDelta()) != null ? ref.top : void 0) || 0);
    }
    _verticalScrollbarPositionStyle(scrollTop) {
      var contentSpan, scrollAreaSpan, scrollRatio;
      ({
        scrollAreaSpan,
        contentSpan
      } = this._verticalScrollbarDimensions());
      scrollRatio = _.clamp(scrollTop / contentSpan, 0, 1);
      return {
        top: "".concat(Math.round(scrollAreaSpan * scrollRatio + scrollbarArrowSize + 1), "rem")
      };
    }
    _verticalScrollbarDimensions() {
      var contentAreaSizeHeight, contentSpan, scrollAreaHeight, scrollAreaSpan;
      contentAreaSizeHeight = this.contentAreaSize().height;
      scrollAreaHeight = contentAreaSizeHeight - 2 * (scrollbarArrowSize + 1);
      scrollAreaSpan = scrollAreaHeight - scrollbarPositionSize;
      contentSpan = this.contentSize().height - contentAreaSizeHeight;
      return {
        scrollAreaSpan,
        contentSpan
      };
    }
    horizontalScrollbarPositionStyle() {
      return this._horizontalScrollbarPositionStyle(this.scrollLeft());
    }
    horizontalScrollbarPositionMoveIndicatorStyle() {
      var ref;
      return this._horizontalScrollbarPositionStyle(this._clampedScrollLeft() + ((ref = this.scrollbarMoveDelta()) != null ? ref.left : void 0) || 0);
    }
    _horizontalScrollbarPositionStyle(scrollLeft) {
      var contentSpan, scrollAreaSpan, scrollRatio;
      ({
        scrollAreaSpan,
        contentSpan
      } = this._horizontalScrollbarDimensions());
      scrollRatio = _.clamp(scrollLeft / contentSpan, 0, 1);
      return {
        left: "".concat(Math.round(scrollAreaSpan * scrollRatio + scrollbarArrowSize + 1), "rem")
      };
    }
    _horizontalScrollbarDimensions() {
      var contentAreaSizeWidth, contentSpan, scrollAreaSpan, scrollAreaWidth;
      contentAreaSizeWidth = this.contentAreaSize().width;
      scrollAreaWidth = contentAreaSizeWidth - 2 * (scrollbarArrowSize + 1);
      scrollAreaSpan = scrollAreaWidth - scrollbarPositionSize;
      contentSpan = this.contentSize().width - contentAreaSizeWidth;
      return {
        scrollAreaSpan,
        contentSpan
      };
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown .up.arrow': this.onPointerDownUpArrow,
        'pointerdown .down.arrow': this.onPointerDownDownArrow,
        'pointerdown .left.arrow': this.onPointerDownLeftArrow,
        'pointerdown .right.arrow': this.onPointerDownRightArrow,
        'pointerdown .vertical-scrollbar .position': this.onPointerDownVerticalScrollbarPosition,
        'pointerdown .horizontal-scrollbar .position': this.onPointerDownHorizontalScrollbarPosition,
        'wheel .content-area': this.onWheelContentArea
      });
    }

    // Scrolling with arrows
    onPointerDownUpArrow(event) {
      return this._startScrollingUntilPointerUp(true, -1);
    }
    onPointerDownDownArrow(event) {
      return this._startScrollingUntilPointerUp(true, 1);
    }
    onPointerDownLeftArrow(event) {
      return this._startScrollingUntilPointerUp(false, -1);
    }
    onPointerDownRightArrow(event) {
      return this._startScrollingUntilPointerUp(false, 1);
    }
    _startScrollingUntilPointerUp(vertical, sign) {
      var $document;
      this.scrollInDirection(vertical, sign);
      $document = $(document);
      Meteor.clearInterval(this._scrollInterval);
      this._scrollInterval = Meteor.setInterval(() => {
        return this.scrollInDirection(vertical, sign);
      }, scrollDelay * 1000);
      return $document.on('pointerup.pixelartacademy-pixeltosh-os-interface-window', event => {
        $document.off('.pixelartacademy-pixeltosh-os-interface-window');
        return Meteor.clearInterval(this._scrollInterval);
      });
    }

    // Scrolling by dragging the position indicator
    onPointerDownVerticalScrollbarPosition(event) {
      var $document, cursor, dragStartCoordinates;
      // Remember starting position of drag.
      cursor = this.os.cursor();
      dragStartCoordinates = cursor.coordinates();
      // Wire dragging handlers.
      $document = $(document);
      $document.on('pointermove.pixelartacademy-pixeltosh-os-interface-window', event => {
        var contentSpan, coordinates, scrollAreaDelta, scrollAreaSpan;
        if (!(coordinates = cursor.coordinates())) {
          return;
        }
        scrollAreaDelta = coordinates.y - dragStartCoordinates.y;
        ({
          scrollAreaSpan,
          contentSpan
        } = this._verticalScrollbarDimensions());
        return this.scrollbarMoveDelta({
          top: Math.round(scrollAreaDelta / scrollAreaSpan * contentSpan)
        });
      });
      return $document.on('pointerup.pixelartacademy-pixeltosh-os-interface-window', event => {
        var delta;
        // End drag mode.
        this._endEvents();
        delta = this.scrollbarMoveDelta();
        this.scrollbarMoveDelta(null);
        return this._setScrollTop(this._clampedScrollTop() + delta.top);
      });
    }
    onPointerDownHorizontalScrollbarPosition(event) {
      var $document, cursor, dragStartCoordinates;
      // Remember starting position of drag.
      cursor = this.os.cursor();
      dragStartCoordinates = cursor.coordinates();

      // Wire dragging handlers.
      $document = $(document);
      $document.on('pointermove.pixelartacademy-pixeltosh-os-interface-window', event => {
        var contentSpan, coordinates, scrollAreaDelta, scrollAreaSpan;
        if (!(coordinates = cursor.coordinates())) {
          return;
        }
        scrollAreaDelta = coordinates.x - dragStartCoordinates.x;
        ({
          scrollAreaSpan,
          contentSpan
        } = this._horizontalScrollbarDimensions());
        return this.scrollbarMoveDelta({
          left: Math.round(scrollAreaDelta / scrollAreaSpan * contentSpan)
        });
      });
      return $document.on('pointerup.pixelartacademy-pixeltosh-os-interface-window', event => {
        var delta;
        // End drag mode.
        this._endEvents();
        delta = this.scrollbarMoveDelta();
        this.scrollbarMoveDelta(null);
        return this._setScrollLeft(this._clampedScrollLeft() + delta.left);
      });
    }

    // Scrolling with the mouse wheel
    onWheelContentArea(event) {
      // Accumulate wheel deltas.
      if (this._accumulatedWheelDelta == null) {
        this._accumulatedWheelDelta = {
          x: 0,
          y: 0
        };
      }
      this._accumulatedWheelDelta.x += event.originalEvent.deltaX;
      this._accumulatedWheelDelta.y += event.originalEvent.deltaY;
      if (LOI.settings.graphics.slowCPUEmulation.value()) {
        // Throttle updates.
        if (this._throttledApply == null) {
          this._throttledApply = _.throttle(event => {
            return this._applyWheelDelta();
          }, PAA.Pixeltosh.OS.Interface.slowCPUEmulationLargeFrameDelay * 1000);
        }
        return this._throttledApply();
      } else {
        // Apply immediately.
        return this._applyWheelDelta();
      }
    }
    _applyWheelDelta() {
      var scale;
      scale = this.os.display.scale();
      this._setScrollLeft(Math.round(this._clampedScrollLeft() + this._accumulatedWheelDelta.x / scale));
      this._setScrollTop(Math.round(this._clampedScrollTop() + this._accumulatedWheelDelta.y / scale));
      this._accumulatedWheelDelta.x = 0;
      return this._accumulatedWheelDelta.y = 0;
    }
  }
  ;
  ScrollableArea.register(ScrollableArea.id());
  return ScrollableArea;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.scrollablearea.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/scrollablearea/template.scrollablearea.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.OS.Interface.ScrollableArea");
Template["PixelArtAcademy.Pixeltosh.OS.Interface.ScrollableArea"] = new Template("Template.PixelArtAcademy.Pixeltosh.OS.Interface.ScrollableArea", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-os-interface-scrollablearea"
  }, "\n    ", HTML.DIV({
    class: "content-area"
  }, "\n      ", HTML.DIV(HTML.Attrs({
    class: "content"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentStyle"));
  }), "\n        ", Blaze._InOuterTemplateScope(view, function() {
    return Spacebars.include(function() {
      return Spacebars.call(view.templateContentBlock);
    });
  }), "\n      "), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("verticalScrollbarVisible"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "vertical-scrollbar ", Spacebars.mustache(view.lookup("verticalScrollbarActiveClass")), " ", Spacebars.mustache(view.lookup("verticalScrollbarDraggingClass")) ];
      }
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("verticalScrollbarEnabled"));
    }, function() {
      return [ "\n          ", HTML.BUTTON(HTML.Attrs({
        class: "up arrow"
      }, function() {
        return Spacebars.attrMustache(view.lookup("verticalScrollbarArrowDisabledAttribute"));
      })), "\n          ", HTML.DIV(HTML.Attrs({
        class: "position"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("verticalScrollbarPositionStyle"));
      })), "\n          ", HTML.DIV(HTML.Attrs({
        class: "position-move-indicator"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("verticalScrollbarPositionMoveIndicatorStyle"));
      })), "\n          ", HTML.BUTTON(HTML.Attrs({
        class: "down arrow"
      }, function() {
        return Spacebars.attrMustache(view.lookup("verticalScrollbarArrowDisabledAttribute"));
      })), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("horizontalScrollbarVisible"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "horizontal-scrollbar ", Spacebars.mustache(view.lookup("horizontalScrollbarActiveClass")), " ", Spacebars.mustache(view.lookup("horizontalScrollbarDraggingClass")) ];
      }
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("horizontalScrollbarEnabled"));
    }, function() {
      return [ "\n          ", HTML.BUTTON(HTML.Attrs({
        class: "left arrow"
      }, function() {
        return Spacebars.attrMustache(view.lookup("horizontalScrollbarArrowDisabledAttribute"));
      })), "\n          ", HTML.DIV(HTML.Attrs({
        class: "position"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("horizontalScrollbarPositionStyle"));
      })), "\n          ", HTML.DIV(HTML.Attrs({
        class: "position-move-indicator"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("horizontalScrollbarPositionMoveIndicatorStyle"));
      })), "\n          ", HTML.BUTTON(HTML.Attrs({
        class: "right arrow"
      }, function() {
        return Spacebars.attrMustache(view.lookup("horizontalScrollbarArrowDisabledAttribute"));
      })), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("resizeControlVisible"));
  }, function() {
    return HTML.Raw('\n      <div class="resize-control"></div>\n    ');
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"actions":{"actions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/actions/actions.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.Actions = class Actions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"action.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/actions/action.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var FM, LOI, PAA;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.Actions.Action = class Action extends FM.Action {
  constructor() {
    super(...arguments);
    this.os = this.interface.parent;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"close.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/actions/close.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.Actions.Close = function () {
  class Close extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.Interface.Actions.Close';
    }
    static displayName() {
      return "关闭";
    }
    execute() {
      return this.os.removeWindow(this.os.activeWindowId());
    }
  }
  ;
  Close.initialize();
  return Close;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"quit.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/interface/actions/quit.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.Interface.Actions.Quit = function () {
  class Quit extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.Interface.Actions.Quit';
    }
    static displayName() {
      return "退出";
    }
    enabled() {
      // We can perform a quit action when we have an active program.
      return this.os.activeProgram();
    }
    execute() {
      return this.os.unloadProgram(this.os.activeProgram());
    }
  }
  ;
  Quit.initialize();
  return Quit;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"filesystem":{"filesystem.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/filesystem/filesystem.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.FileSystem = function () {
  class FileSystem extends LOI.Adventure.Location {
    // files: object with user-defined properties of files.
    //   {fileId}:
    //     position: visual position of this file in Finder
    //       x, y
    //     path: a string specifying the custom full path (path + filename) of this file
    // folders: object with user-defined properties of folders.
    //   {folderPath}:
    //     window: information about the folder representation in Finder
    //       left, top, width, height: dimensions of the window
    //       scrollLeft, scrollTop: how far the content is scrolled
    static id() {
      return 'PixelArtAcademy.Pixeltosh.OS.FileSystem';
    }
    constructor() {
      super(...arguments);
      this.os = this.options.os;

      // Prepare for loading available programs based on gameplay.
      this.currentFilesSituation = new AE.LiveComputedField(() => {
        var options;
        options = {
          timelineId: LOI.adventure.currentTimelineId(),
          location: this
        };
        if (!options.timelineId) {
          return;
        }
        return new LOI.Adventure.Situation(options);
      });
      this._folders = {};
    }
    destroy() {
      super.destroy(...arguments);
      return this.currentFilesSituation.stop();
    }
    files() {
      return this.currentFilesSituation().things();
    }
    getFileForPath(path) {
      var file, i, len, ref;
      ref = this.files();
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        if (file.path() === path) {
          // Try to find a file with this path.
          return file;
        }
      }

      // Return a folder instead.
      return this.getFolderForPath(path);
    }
    getFolderForPath(path) {
      var base;
      if ((base = this._folders)[path] == null) {
        base[path] = new PAA.Pixeltosh.OS.FileSystem.File({
          path: path,
          type: PAA.Pixeltosh.OS.FileSystem.FileTypes.Folder
        });
      }
      return this._folders[path];
    }
  }
  ;
  FileSystem.initialize();
  return FileSystem;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"file.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/filesystem/file.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.FileSystem.File = class File {
  constructor(options) {
    this.options = options;
  }
  id() {
    return this.options.id;
  }
  path() {
    var files, ref;
    files = PAA.Pixeltosh.OS.FileSystem.state('files') || {};
    return ((ref = files[this.id()]) != null ? ref.path : void 0) || this.options.path;
  }
  pathParts() {
    var filename, folders, fullPath, path, pathParts;
    fullPath = this.path();
    pathParts = fullPath.split('/');

    // Last part is always the filename, the rest is the path.
    filename = _.last(pathParts);
    folders = _.initial(pathParts);
    path = folders.join('/');
    return {
      path,
      folders,
      filename
    };
  }
  parentPath() {
    return this.pathParts().path;
  }
  name() {
    return this.pathParts().filename;
  }
  type() {
    return this.options.type;
  }
  iconUrl() {
    return this.type().iconUrl();
  }
  data() {
    var base;
    return typeof (base = this.options).data === "function" ? base.data() : void 0;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"filetypes":{"filetypes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/filesystem/filetypes/filetypes.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.FileSystem.FileTypes = class FileTypes {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"disk.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/filesystem/filetypes/disk.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.FileSystem.FileTypes.Disk = class Disk {
  static iconUrl() {
    return '/pixelartacademy/pixeltosh/os/filesystem/disk.png';
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"folder.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/os/filesystem/filetypes/folder.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.OS.FileSystem.FileTypes.Folder = class Folder {
  static iconUrl() {
    return '/pixelartacademy/pixeltosh/os/filesystem/folder.png';
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"program":{"program.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/program.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AB = Artificial.Base;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Program = function () {
  class Program extends LOI.Adventure.Thing {
    static getClassForSlug(slug) {
      return this._programClassesBySlug[slug];
    }
    static fullName() {
      throw new AE.NotImplementedException("A program must provide its name.");
    }
    static slug() {
      throw new AE.NotImplementedException("A program must provide the URL slug.");
    }
    static projectClass() {
      return null; // Override to provide the project class if this program can be modified.
    }
    static iconUrl() {
      return this.versionedUrl("/pixelartacademy/pixeltosh/programs/".concat(this.slug(), "/icon.png"));
    }
    static initialize() {
      super.initialize(...arguments);
      return this._programClassesBySlug[this.slug()] = this;
    }
    constructor(os) {
      var ref;
      super(...arguments);
      this.os = os;
      this.loaded = new ReactiveField();
      this.audio = (ref = this.constructor.Audio) != null ? ref.variables : void 0;
    }
    iconUrl() {
      return this.constructor.iconUrl();
    }
    load() {
      var ref, ref1;
      // Extend to perform any logic on startup.
      this.loaded(true);
      if ((ref = LOI.adventure) != null ? ref.audioManager : void 0) {
        return (ref1 = this.constructor.Audio) != null ? ref1.load(LOI.adventure.audioManager) : void 0;
      }
    }
    unload() {
      var ref;
      // Extend to perform any cleanup.
      this.loaded(false);
      return (ref = this.constructor.Audio) != null ? ref.unload() : void 0;
    }
    menuItems() {
      // Override to supply the data used to display the menu when this program is active.
      return [];
    }
    shortcuts() {
      // Override to supply shortcuts to use when this program is active.
      return {};
    }
  }
  ;
  Program._programClassesBySlug = {};
  return Program;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"view":{"view.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/view/view.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AEc, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Program.View = function () {
  class View extends LOI.View {
    // programId: ID of the program this view belongs to
    // activateBringsWindowToTop: boolean whether activating this view brings its window to top, true by default
    // activateProgramOnly: boolean whether interacting with this view only activates the program, not the window, false by default
    // contentArea: the component that is rendered in this view
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Program.View';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.os = this.interface.parent;
    }
    programId() {
      var viewData;
      if (!(viewData = this.data())) {
        return;
      }
      return viewData.get('programId');
    }
    program() {
      var programId;
      if (!(programId = this.programId())) {
        return;
      }
      return this.os.getProgram(programId);
    }
    programClass() {
      var ref;
      return (ref = this.program()) != null ? ref.constructor.slug() : void 0;
    }
    activateBringsWindowToTop() {
      var ref, viewData;
      if (!(viewData = this.data())) {
        return;
      }
      return (ref = viewData.get('activateBringsWindowToTop')) != null ? ref : true;
    }
    activateProgramOnly() {
      var ref, viewData;
      if (!(viewData = this.data())) {
        return;
      }
      return (ref = viewData.get('activateProgramOnly')) != null ? ref : false;
    }
    windowId() {
      var viewData;
      if (!(viewData = this.data())) {
        return;
      }
      return viewData.get('id');
    }
    window() {
      var windowId;
      if (!(windowId = this.windowId())) {
        return;
      }
      return this.os.interface.getWindow(windowId);
    }
    active() {
      return this.windowId() === this.os.activeWindowId();
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown': this.onPointerDown
      });
    }
    onPointerDown(event) {
      var windowId;
      // See if we need to only activate the program.
      if (this.activateProgramOnly()) {
        this.os.activateProgram(this.program());
        return;
      }

      // Activate the window (and program).
      windowId = this.windowId();
      if (this.os.activeWindowId() === windowId) {
        return;
      }
      return this.os.activateWindow(windowId);
    }
  }
  ;
  View.register(View.id());
  return View;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.view.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/view/template.view.js                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Program.View");
Template["PixelArtAcademy.Pixeltosh.Program.View"] = new Template("Template.PixelArtAcademy.Pixeltosh.Program.View", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixeltosh-program-view ", Spacebars.mustache(view.lookup("programClass")) ];
    }
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("child"), "contentArea");
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("FataMorgana"), "DockedArea"));
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"programs.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/programs.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs = function () {
  class Programs extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs';
    }
  }
  ;
  Programs.initialize();
  return Programs;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"finder":{"finder.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/finder.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder = function () {
  class Finder extends PAA.Pixeltosh.Program {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder';
    }
    static version() {
      return '0.1.0';
    }
    static fullName() {
      return "访达";
    }
    static description() {
      return "Pixeltosh的文件系统管理器。";
    }
    static slug() {
      return 'finder';
    }
    constructor() {
      super(...arguments);
      this.openFolders = {};
      this.selectedPath = new ReactiveField(null);
      this.selectedFile = new ComputedField(() => {
        var selectedPath;
        if (!(selectedPath = this.selectedPath())) {
          return;
        }
        return this.os.fileSystem.getFileForPath(selectedPath);
      });
    }
    load() {
      return this.os.addWindow(this.constructor.Desktop.createInterfaceData());
    }
    menuItems() {
      return [{
        caption: '',
        items: [PAA.Pixeltosh.Programs.Finder.Actions.About.id()]
      }, {
        caption: '文件',
        items: [PAA.Pixeltosh.Programs.Finder.Actions.Open.id(), null, PAA.Pixeltosh.Programs.Finder.Actions.Close.id(), PAA.Pixeltosh.Programs.Finder.Actions.CloseAll.id()]
      }];
    }
    openFolder(folderFile) {
      var openFolder, parentFolderView, parentPath, path;
      // See if this folder is already open and we can simply activate it.
      path = folderFile.path();
      if (openFolder = this.openFolders[path]) {
        this.os.activateWindow(openFolder.windowId);
        return;
      }
      parentPath = folderFile.parentPath();
      if (this.openFolders[parentPath]) {
        parentFolderView = this.os.interface.getWindow(this.openFolders[parentPath].windowId);
      }

      // We need to open the folder in a new window.
      return this.os.addWindow(PAA.Pixeltosh.Programs.Finder.Folder.createInterfaceData(folderFile, parentFolderView));
    }
    registerFolderWindow(path, windowId) {
      return this.openFolders[path] = {
        windowId
      };
    }
    deregisterFolderWindow(path) {
      return delete this.openFolders[path];
    }
    selectPath(path) {
      return this.selectedPath(path);
    }
    deselect() {
      return this.selectedPath(null);
    }
  }
  ;
  Finder.register(Finder.id());
  Finder.initialize();
  return Finder;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"files":{"files.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/files/files.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Files = function () {
  class Files extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.Files';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      return this.finder = this.os.getProgram(PAA.Pixeltosh.Programs.Finder);
    }
    selectedClass() {
      var file;
      file = this.currentData();
      if (this.finder.selectedPath() === file.path()) {
        return 'selected';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown .file-button': this.onPointerDownFileButton,
        'dblclick .file-button': this.onDoubleClickFileButton
      });
    }
    onPointerDownFileButton(event) {
      var file;
      file = this.currentData();
      return this.finder.selectPath(file.path());
    }
    onDoubleClickFileButton(event) {
      return this.os.interface.getOperator(PAA.Pixeltosh.Programs.Finder.Actions.Open).execute();
    }
  }
  ;
  Files.register(Files.id());
  return Files;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.files.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/files/template.files.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Finder.Files");
Template["PixelArtAcademy.Pixeltosh.Programs.Finder.Files"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Finder.Files", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-finder-files"
  }, "\n    ", HTML.UL({
    class: "files"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("."));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: function() {
        return [ "file ", Spacebars.mustache(view.lookup("selectedClass")) ];
      }
    }, "\n          ", HTML.BUTTON({
      class: "file-button"
    }, "\n            ", HTML.IMG({
      class: "icon",
      src: function() {
        return Spacebars.mustache(view.lookup("image"), view.lookup("iconUrl"));
      }
    }), "\n            ", HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n          "), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"desktop":{"desktop.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/desktop/desktop.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc,
  AM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Desktop = function () {
  class Desktop extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.Desktop';
    }
    static createInterfaceData() {
      return {
        type: PAA.Pixeltosh.Program.View.id(),
        programId: PAA.Pixeltosh.Programs.Finder.id(),
        activateBringsWindowToTop: false,
        activateProgramOnly: true,
        top: 14,
        left: 0,
        right: 0,
        bottom: 0,
        contentArea: {
          contentComponentId: this.id()
        }
      };
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      return this.finder = this.os.getProgram(PAA.Pixeltosh.Programs.Finder);
    }
    files() {
      var diskNames, file, files, i, len, pathParts, rootFiles, rootFolderName, rootFolderNames, rootFolders;
      // Show all files at the root folder.
      files = this.os.fileSystem.files();
      rootFiles = [];
      diskNames = [];
      rootFolderNames = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        pathParts = file.pathParts();
        if (!pathParts.path) {
          rootFiles.push(file);
          if (file.type() === PAA.Pixeltosh.OS.FileSystem.FileTypes.Disk) {
            diskNames.push(pathParts.filename);
          }
        }
        if (rootFolderName = _.first(pathParts.folders)) {
          if (!(indexOf.call(rootFolderNames, rootFolderName) >= 0 || indexOf.call(diskNames, rootFolderName) >= 0)) {
            rootFolderNames.push(rootFolderName);
          }
        }
      }
      rootFolders = function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = rootFolderNames.length; j < len1; j++) {
          rootFolderName = rootFolderNames[j];
          results.push(this.os.fileSystem.getFolderForPath(rootFolderName));
        }
        return results;
      }.call(this);
      return [...rootFiles, ...rootFolders];
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown .pixelartacademy-pixeltosh-programs-finder-desktop': this.onPointerDownDesktop
      });
    }
    onPointerDownDesktop(event) {
      if ($(event.target).closest('.file-button').length) {
        return;
      }
      return this.finder.deselect();
    }
  }
  ;
  Desktop.register(Desktop.id());
  return Desktop;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.desktop.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/desktop/template.desktop.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Finder.Desktop");
Template["PixelArtAcademy.Pixeltosh.Programs.Finder.Desktop"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Finder.Desktop", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-finder-desktop"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("files"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Finder", "Files"));
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"folder":{"folder.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/folder/folder.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc,
  AM,
  FM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Folder = function () {
  class Folder extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.Folder';
    }
    static createInterfaceData(folderFile, parentFolderView) {
      var folderPath, folders, parentData, ref, window;
      folderPath = folderFile.path();
      folders = PAA.Pixeltosh.OS.FileSystem.state('folders') || {};
      if (!(window = (ref = folders[folderPath]) != null ? ref.window : void 0)) {
        if (parentFolderView) {
          parentData = parentFolderView.data();
          window = {
            left: parentData.get('left') + 10,
            top: parentData.get('top') + 10
          };
        } else {
          window = {};
        }
      }
      _.defaults(window, {
        left: 50,
        top: 50,
        width: 200,
        height: 100,
        scrollLeft: 0,
        scrollTop: 0
      });
      return _.extend(window, {
        type: PAA.Pixeltosh.Program.View.id(),
        programId: PAA.Pixeltosh.Programs.Finder.id(),
        contentArea: {
          type: PAA.Pixeltosh.OS.Interface.Window.id(),
          title: {
            text: folderFile.name()
          },
          scrollbars: {
            vertical: {
              enabled: true
            },
            horizontal: {
              enabled: true
            }
          },
          contentArea: {
            type: this.id(),
            path: folderPath
          }
        }
      });
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      this.finder = this.os.getProgram(PAA.Pixeltosh.Programs.Finder);
      this.interfaceWindow = this.ancestorComponentOfType(PAA.Pixeltosh.OS.Interface.Window);
      this.interfaceWindow.changed.addHandler(this, this.onWindowChanged);
      this.folderPath = () => {
        var folderData;
        folderData = this.data();
        return folderData.get('path');
      };
      this.programView = this.ancestorComponentOfType(PAA.Pixeltosh.Program.View);
      this.windowId = this.programView.windowId();
      return this.autorun(computation => {
        if (this._currentFolderPath) {
          this.finder.deregisterFolderWindow(this._currentFolderPath);
        }
        if (this._currentFolderPath = this.folderPath()) {
          return this.finder.registerFolderWindow(this._currentFolderPath, this.windowId);
        }
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      if (this._currentFolderPath) {
        this.finder.deregisterFolderWindow(this._currentFolderPath);
      }
      return this.interfaceWindow.changed.removeHandler(this, this.onWindowChanged);
    }
    files() {
      var allFiles, file, files, folderName, folderNames, folderPath, folderPathFolders, folders, i, len, pathParts, subfolderName;
      folderPath = this.folderPath();
      folderPathFolders = folderPath.split('/');

      // Show all files at the given path.
      allFiles = this.os.fileSystem.files();
      files = [];
      folderNames = [];
      for (i = 0, len = allFiles.length; i < len; i++) {
        file = allFiles[i];
        pathParts = file.pathParts();
        if (!_.startsWith(pathParts.path, folderPath)) {
          continue;
        }
        if (pathParts.path === folderPath) {
          // This is a file in this folder
          files.push(file);
        } else {
          // This is a file deeper in this folder. Extract the subfolder name.
          subfolderName = pathParts.folders[folderPathFolders.length];
          if (indexOf.call(folderNames, subfolderName) < 0) {
            folderNames.push(subfolderName);
          }
        }
      }
      folders = function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = folderNames.length; j < len1; j++) {
          folderName = folderNames[j];
          results.push(this.os.fileSystem.getFolderForPath("".concat(folderPath, "/").concat(folderName)));
        }
        return results;
      }.call(this);
      return [...files, ...folders];
    }
    onWindowChanged(newProperties) {
      var folderPath, folders;
      // Store window properties.
      folderPath = this.folderPath();
      folders = PAA.Pixeltosh.OS.FileSystem.state('folders') || {};
      if (folders[folderPath] == null) {
        folders[folderPath] = {};
      }
      _.merge(folders[folderPath], {
        window: newProperties
      });
      return PAA.Pixeltosh.OS.FileSystem.state('folders', folders);
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown .pixelartacademy-pixeltosh-programs-finder-folder': this.onPointerDownFolder
      });
    }
    onPointerDownFolder(event) {
      if ($(event.target).closest('.file-button').length) {
        return;
      }
      return this.finder.selectPath(this.folderPath());
    }
  }
  ;
  Folder.register(Folder.id());
  return Folder;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.folder.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/folder/template.folder.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Finder.Folder");
Template["PixelArtAcademy.Pixeltosh.Programs.Finder.Folder"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Finder.Folder", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-finder-folder"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("files"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Finder", "Files"));
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"about":{"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/about/about.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.About = function () {
  class About extends FM.Dialog {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.About';
    }
    static createInterfaceData() {
      return {
        contentComponentId: this.id(),
        left: 60,
        top: 74,
        width: 200
      };
    }
    onRendered() {
      // Listen to click events on the parent dialog area.
      return this.$('.pixelartacademy-pixeltosh-programs-finder-about').closest('.dialog-area').on('click', () => {
        return this.closeDialog();
      });
    }
  }
  ;
  About.register(About.id());
  return About;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.about.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/about/template.about.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Finder.About");
Template["PixelArtAcademy.Pixeltosh.Programs.Finder.About"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Finder.About", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixeltosh-programs-finder-about pixelartacademy-pixeltosh-os-interface-rectanglearea">\n    <p>Pixeltosh Finder，版本1.0</p>\n    <p><span class="copyleft">©</span> 1984像素电脑</p>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"actions":{"actions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/actions/actions.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Actions = class Actions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/actions/about.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Actions.About = function () {
  class About extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.Actions.About';
    }
    static displayName() {
      return "关于访达...";
    }
    execute() {
      return this.os.interface.displayDialog(PAA.Pixeltosh.Programs.Finder.About.createInterfaceData());
    }
  }
  ;
  About.initialize();
  return About;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"open.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/actions/open.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Actions.Open = function () {
  class Open extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.Actions.Open';
    }
    static displayName() {
      return "打开";
    }
    constructor() {
      super(...arguments);
      this.finder = this.os.getProgram(PAA.Pixeltosh.Programs.Finder);
    }
    enabled() {
      // We can perform open when a file is selected.
      return this.finder.selectedFile();
    }
    execute() {
      var file, fileType, program, programClass;
      file = this.finder.selectedFile();
      fileType = file.type();
      if (fileType.prototype instanceof PAA.Pixeltosh.Program) {
        program = this.os.getProgram(fileType);
        return this.os.loadProgram(program);
      } else if (fileType === PAA.Pixeltosh.OS.FileSystem.FileTypes.Disk || fileType === PAA.Pixeltosh.OS.FileSystem.FileTypes.Folder) {
        return this.finder.openFolder(file);
      } else if (programClass = typeof fileType.program === "function" ? fileType.program() : void 0) {
        program = this.os.getProgram(programClass);
        return this.os.loadProgram(program, file);
      }
    }
  }
  ;
  Open.initialize();
  return Open;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"close.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/actions/close.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Actions.Close = function () {
  class Close extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.Actions.Close';
    }
    static displayName() {
      return "关闭";
    }
    enabled() {
      var activeWindow;
      // We can perform a close action when a folder is the active window.
      if (!(activeWindow = this.interface.getWindow(this.os.activeWindowId()))) {
        return;
      }
      return activeWindow.allChildComponentsOfType(PAA.Pixeltosh.Programs.Finder.Folder).length;
    }
    execute() {
      return this.os.removeWindow(this.os.activeWindowId());
    }
  }
  ;
  Close.initialize();
  return Close;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"closeall.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/program/finder/actions/closeall.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Finder.Actions.CloseAll = function () {
  class CloseAll extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Finder.Actions.CloseAll';
    }
    static displayName() {
      return "全部关闭";
    }
    enabled() {
      // We can perform a close all action when we have any folder windows open.
      return this.interface.allChildComponentsOfType(PAA.Pixeltosh.Programs.Finder.Folder).length;
    }
    execute() {
      var results, window, windowId, windows;
      windows = this.interface.currentLayoutData().get('windows');
      results = [];
      for (windowId in windows) {
        window = this.interface.getWindow(windowId);
        if (window.allChildComponentsOfType(PAA.Pixeltosh.Programs.Finder.Folder).length) {
          results.push(this.os.removeWindow(windowId));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  }
  ;
  CloseAll.initialize();
  return CloseAll;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"pages":{"pages.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/pages/pages.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Pages = class Pages {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixeltosh":{"pixeltosh.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/pages/pixeltosh/pixeltosh.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Pages.Pixeltosh = function () {
  class Pixeltosh extends AM.Component {
    static title() {
      return "Pixeltosh";
    }
    static webApp() {
      return true;
    }
    static viewport() {
      return 'user-scalable=no, width=640';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.display = new AM.Display({
        safeAreaWidth: 320,
        safeAreaHeight: 241,
        minScale: 2
      });
      this.adventure = new PAA.Pixeltosh.Adventure();
      return this.os = new PAA.Pixeltosh.OS();
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.adventure.destroy();
    }
  }
  ;
  Pixeltosh.register('PixelArtAcademy.Pixeltosh.Pages.Pixeltosh');
  return Pixeltosh;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.pixeltosh.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/pages/pixeltosh/template.pixeltosh.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Pages.Pixeltosh");
Template["PixelArtAcademy.Pixeltosh.Pages.Pixeltosh"] = new Template("Template.PixelArtAcademy.Pixeltosh.Pages.Pixeltosh", (function() {
  var view = this;
  return [ HTML.STYLE("\n    html {\n      background: black;\n      font-size: ", Blaze.View("lookup:display.scale", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("display"), "scale"));
  }), "px;\n    }\n  "), "\n  ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("display"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ", HTML.DIV({
    class: "pixelartacademy-pixeltosh-pages-pixeltosh"
  }, "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "pixeltosh-safe-area"
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("os"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Computer"));
      });
    }), "\n      "), "\n    " ];
  }), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"instructions":{"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/instructions/instructions.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Instructions = function () {
  class Instructions extends PAA.PixelPad.Systems.Instructions {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Instructions';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "Pixeltosh说明";
    }
    static description() {
      return "Pixeltosh应用中按需显示信息的系统。";
    }
    customClass() {
      var instruction;
      if (!(instruction = this.targetDisplayedInstruction())) {
        return;
      }
      return typeof instruction.customClass === "function" ? instruction.customClass() : void 0;
    }
    bodyClass() {
      var bodyClass, instruction;
      if (instruction = this.targetDisplayedInstruction()) {
        if (bodyClass = instruction.bodyClass()) {
          return bodyClass;
        }
      }
      return this.constructor.BodyClasses.Leaning;
    }
    faceClass() {
      var coordinates, faceClass, instruction, os, osCursor;
      if (instruction = this.targetDisplayedInstruction()) {
        if (faceClass = instruction.faceClass()) {
          return faceClass;
        }
      }
      if (!(os = PAA.PixelPad.Apps.Pixeltosh.getOS())) {
        return;
      }
      if (!os.isCreated()) {
        return;
      }
      if (!(osCursor = os.cursor())) {
        return;
      }
      if (!(coordinates = osCursor.coordinates())) {
        return;
      }
      if (coordinates.y < 180) {
        return 'smirk-up';
      } else {
        return 'smirk-down';
      }
    }
    speechBalloonOptions() {
      return {
        text: () => {
          var ref;
          return (ref = this.displayedInstruction()) != null ? ref.message() : void 0;
        }
      };
    }
  }
  ;
  Instructions.register(Instructions.id());
  Instructions.initialize();
  Instructions.BodyClasses = {
    Leaning: 'leaning',
    Exclamation: 'exclamation'
  };
  Instructions.FaceClasses = {
    Peaceful: 'peaceful',
    Smirk: 'smirk-up',
    OhNo: 'ohno',
    Thoughtful: 'thoughtful'
  };
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.instructions.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/instructions/template.instructions.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Instructions");
Template["PixelArtAcademy.Pixeltosh.Instructions"] = new Template("Template.PixelArtAcademy.Pixeltosh.Instructions", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixeltosh-instructions ", Spacebars.mustache(view.lookup("customClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "retro ", Spacebars.mustache(view.lookup("bodyClass")), " ", Spacebars.mustache(view.lookup("faceClass")) ];
    }
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), view.lookup("speechBalloonOptions"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Components", "SpeechBalloon"));
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh/instructions/instruction.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Instructions.Instruction = class Instruction extends PAA.PixelPad.Systems.Instructions.Instruction {
  bodyClass() {} // Override to make Mini Retro use a different body pose.

  faceClass() {} // Override to make Mini Retro use a specific face expression.
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

require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/pixeltosh.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/adventure/adventure.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/computer/computer.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/computer/template.computer.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/os.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/template.os.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/interface.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/errordialog/errordialog.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/errordialog/template.errordialog.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/cursor/cursor.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/cursor/template.cursor.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/titlebar/titlebar.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/titlebar/template.titlebar.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/window/window.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/window/template.window.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/scrollablearea/scrollablearea.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/scrollablearea/template.scrollablearea.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/actions/action.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/actions/close.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/interface/actions/quit.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/program.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/view/view.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/view/template.view.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/programs.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/finder.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/files/files.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/files/template.files.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/desktop/desktop.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/desktop/template.desktop.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/folder/folder.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/folder/template.folder.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/about/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/about/template.about.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/actions/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/actions/open.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/actions/close.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/program/finder/actions/closeall.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/filesystem/filesystem.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/filesystem/file.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/filesystem/filetypes/filetypes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/filesystem/filetypes/disk.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/os/filesystem/filetypes/folder.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/pages/pages.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/pages/pixeltosh/pixeltosh.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/pages/pixeltosh/template.pixeltosh.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/instructions/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/instructions/template.instructions.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh/instructions/instruction.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pixeltosh", {
  PixelArtAcademy: PixelArtAcademy
});

})();
