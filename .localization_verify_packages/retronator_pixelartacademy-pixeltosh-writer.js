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
var PixelArtAcademy = Package['retronator:pixelartacademy-pixeltosh'].PixelArtAcademy;
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
var __coffeescriptShare, file;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixeltosh-writer":{"writer.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/writer.coffee                                        //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Writer = function () {
  class Writer extends PAA.Pixeltosh.Program {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Writer';
    }
    static version() {
      return '0.1.0';
    }
    static fullName() {
      return "写作器";
    }
    static description() {
      return "Pixeltosh的文本文档编辑器。";
    }
    static slug() {
      return 'writer';
    }
    constructor() {
      super(...arguments);
      this.file = new ReactiveField(null);
    }
    load(file) {
      super.load(...arguments);
      if (file == null) {
        file = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pico8.Cartridges.Invasion, ".DesignDocument"),
          path: '文档',
          data: () => {
            return {
              documentComponentId: PAA.Pico8.Cartridges.Invasion.DesignDocument.id(),
              projectId: AB.Router.getParameter('projectId') || AB.Router.getParameter('parameter4') || PAA.Pico8.Cartridges.Invasion.Project.state('activeProjectId')
            };
          }
        });
      }
      this.file(file);
      return this.windowId = this.os.addWindow(this.constructor.Interface.createInterfaceData(file));
    }
    menuItems() {
      return this.constructor.Interface.createMenuItems();
    }
  }
  ;
  Writer.register(Writer.id());
  Writer.initialize();
  return Writer;
}.call(this);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"textdocument.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/textdocument.coffee                                  //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Writer.TextDocument = class TextDocument {
  static iconUrl() {
    return '/pixelartacademy/pixeltosh/os/filesystem/textdocument.png';
  }
  static program() {
    return PAA.Pixeltosh.Programs.Writer;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interface":{"interface.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/interface/interface.coffee                           //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, PAA, Writer;
AC = Artificial.Control;
FM = FataMorgana;
PAA = PixelArtAcademy;
Writer = PAA.Pixeltosh.Programs.Writer;
Writer.Interface = class Interface {
  static createMenuItems() {
    return [{
      caption: '',
      items: [Writer.Interface.Actions.About.id()]
    }, {
      caption: '文件',
      items: [PAA.Pixeltosh.OS.Interface.Actions.Quit.id()]
    }];
  }
  static createInterfaceData(documentFile) {
    return {
      type: PAA.Pixeltosh.Program.View.id(),
      programId: PAA.Pixeltosh.Programs.Writer.id(),
      top: 16,
      left: 2,
      width: 320 - 5,
      height: 200 - 5,
      contentArea: {
        type: PAA.Pixeltosh.OS.Interface.Window.id(),
        title: {
          text: documentFile.name()
        },
        scrollbars: {
          vertical: {
            enabled: true
          },
          horizontal: {
            visible: true
          }
        },
        contentArea: {
          type: Writer.Interface.Editor.id()
        }
      }
    };
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"actions":{"actions.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/interface/actions/actions.coffee                     //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA, Writer;
PAA = PixelArtAcademy;
Writer = PAA.Pixeltosh.Programs.Writer;
Writer.Interface.Actions = class Actions {};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"about.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/interface/actions/about.coffee                       //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, FM, LOI, PAA, Writer;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Writer = PAA.Pixeltosh.Programs.Writer;
Writer.Interface.Actions.About = function () {
  class About extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.Actions.About";
    }
    static displayName() {
      return "关于写作器...";
    }
    execute() {
      return this.os.interface.displayDialog(Writer.Interface.About.createInterfaceData());
    }
  }
  ;
  About.initialize();
  return About;
}.call(this);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"about":{"about.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/interface/about/about.coffee                         //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, PAA, Writer;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Writer = PAA.Pixeltosh.Programs.Writer;
Writer.Interface.About = function () {
  class About extends FM.Dialog {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.About';
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
      return this.$('.pixelartacademy-pixeltosh-programs-writer-interface-about').closest('.dialog-area').on('click', () => {
        return this.closeDialog();
      });
    }
  }
  ;
  About.register(About.id());
  return About;
}.call(this);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.about.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/interface/about/template.about.js                    //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.About");
Template["PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.About"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.About", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixeltosh-programs-writer-interface-about pixelartacademy-pixeltosh-os-interface-rectanglearea">\n    <p>Pixeltosh写作器，版本1.0</p>\n  </div>');
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"editor":{"editor.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/interface/editor/editor.coffee                       //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, PAA, Writer;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Writer = PAA.Pixeltosh.Programs.Writer;
Writer.Interface.Editor = function () {
  class Editor extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.Editor';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      return this.writer = this.os.getProgram(Writer);
    }
  }
  ;
  Editor.register(Editor.id());
  return Editor;
}.call(this);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.editor.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/retronator_pixelartacademy-pixeltosh-writer/interface/editor/template.editor.js                  //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.Editor");
Template["PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.Editor"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Writer.Interface.Editor", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-writer-interface-editor"
  }, "\n    ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(Spacebars.dot(view.lookup("writer"), "file", "data", "documentComponentId")),
      data: Spacebars.call(Spacebars.dot(view.lookup("writer"), "file", "data"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n  ");
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/writer.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/textdocument.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/interface/interface.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/interface/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/interface/actions/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/interface/about/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/interface/about/template.about.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/interface/editor/editor.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-writer/interface/editor/template.editor.js");

/* Exports */
Package._define("retronator:pixelartacademy-pixeltosh-writer", {
  PixelArtAcademy: PixelArtAcademy
});

})();
