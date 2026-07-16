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
var Artificial = Package['retronator:artificialengines-steam'].Artificial;
var _ = Package['retronator:artificialengines']._;
var THREE = Package['retronator:artificialengines'].THREE;
var Ammo = Package['retronator:artificialengines'].Ammo;
var Retronator = Package['retronator:retronator-store'].Retronator;
var LandsOfIllusions = Package['retronator:landsofillusions-ui'].LandsOfIllusions;
var Illustrapedia = Package['retronator:illustrapedia'].Illustrapedia;
var PixelArtDatabase = Package['retronator:pixelartdatabase'].PixelArtDatabase;
var PixelArtAcademy = Package['retronator:pixelartacademy-learnmode-design'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-learnmode-app":{"app.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/app.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
AB = Artificial.Base;
PAA = PixelArtAcademy;
LM = PAA.LearnMode;
LOI = LandsOfIllusions;
LM.App = function () {
  // This is the web app that runs all Retronator websites.
  class App extends Artificial.Base.App {
    static id() {
      return 'PixelArtAcademy.LearnMode.App';
    }
    template() {
      return this.constructor.id();
    }
    static version() {
      return '0.40.2';
    }
    buildName() {
      return 'Learn Mode build';
    }

    // Routing helpers for default layouts
    static addPublicPage(url, pageClass) {
      return AB.Router.addRoute(url, LM.Layouts.PublicAccess, pageClass);
    }
    constructor() {
      super(...arguments);

      // Wire the main admin pages.
      Retronator.Admin.initialize();

      // Instantiate all app packages, which register router URLs.
      new Artificial.Pages();
      new LOI.Assets();
      new Illustrapedia();
      new PAA();
      new PAA.Pixeltosh();
      new PAA.Practice();
      new PAA.Publication();

      // Initialize other routes.
      PAA.Publication.initializeRouting();

      // We manually add the Learn Mode route without a domain to point to Learn Mode
      // so we can access it without etc.hosts modifications on standalone clients.
      LM.App.addPublicPage('/:parameter1?/:parameter2?/:parameter3?/:parameter4?/:parameter5?', LM.Adventure);
      AB.Router.initialize();
      if (Meteor.isDesktop) {
        // Listen for cheats.
        Desktop.on('menu', 'unlockPixelArtFundamentals', event => {
          return LM.PixelArtFundamentals.state('unlocked', true);
        });
        Desktop.on('menu', 'unlockPinball', event => {
          return LM.PixelArtFundamentals.state('pinballUnlocked', true);
        });
        Desktop.on('menu', 'unlockDrawQuickly', event => {
          return LM.PixelArtFundamentals.state('drawQuicklyUnlocked', true);
        });

        // Start in preferred fullscreen mode.
        Desktop.send('window', 'setFullscreen', LOI.settings.graphics.preferFullscreen.value());
      }
    }
    events() {
      return super.events(...arguments).concat({
        'pointerup': this.onPointerUp
      });
    }
    onPointerUp(event) {
      switch (event.button) {
        // Prevent default history-navigation behavior.
        case 3:
        case 4:
          return event.preventDefault();
      }
    }
  }
  ;
  App.register(App.id());
  return App;
}.call(this);

// On the server, the component will not be created through rendering so we simply instantiate it here.
if (Meteor.isServer) {
  Meteor.startup(function () {
    return new LM.App();
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.app.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/template.app.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.body.addContent((function() {
  var view = this;
  return Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "App"));
  });
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("PixelArtAcademy.LearnMode.App");
Template["PixelArtAcademy.LearnMode.App"] = new Template("Template.PixelArtAcademy.LearnMode.App", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-app"
  }, "\n    ", Spacebars.include(view.lookupTemplate("appRoot")), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layouts":{"layouts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/layouts/layouts.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Layouts = class Layouts {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publicaccess":{"publicaccess.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/layouts/publicaccess/publicaccess.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LM;
LM = PixelArtAcademy.LearnMode;
LM.Layouts.PublicAccess = function () {
  class PublicAccess extends BlazeComponent {}
  ;
  PublicAccess.register('PixelArtAcademy.LearnMode.App.Layouts.PublicAccess');
  return PublicAccess;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.publicaccess.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/layouts/publicaccess/template.publicaccess.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.App.Layouts.PublicAccess");
Template["PixelArtAcademy.LearnMode.App.Layouts.PublicAccess"] = new Template("Template.PixelArtAcademy.LearnMode.App.Layouts.PublicAccess", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("page"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"adventure":{"adventure.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/adventure/adventure.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AT, LM, LOI, PAA, Persistence;
AB = Artificial.Base;
AT = Artificial.Telepathy;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
LM.Adventure = function () {
  // Adventure overrides for stand-alone learn mode builds.
  class Adventure extends LM.Adventure {
    static rootUrl() {
      return '/';
    }
    static saveGameClass() {
      return LM.SaveGame;
    }
    static loadGameClass() {
      return LM.LoadGame;
    }
    getLocalSyncedStorage() {
      if (Meteor.isDesktop) {
        return new Persistence.SyncedStorages.FileSystem({
          relativeDirectoryPath: 'saves',
          relativeBackupDirectoryPath: 'save backups'
        });
      } else {
        return super.getLocalSyncedStorage(...arguments);
      }
    }
    registerSyncedStorages() {
      if (Meteor.isDesktop) {
        this.autorun(computation => {
          var steam;
          if (!AB.DistributionPlatform.type()) {
            return;
          }
          computation.stop();
          if (AB.DistributionPlatform.isSteam) {
            steam = AT.Steam.instance();
            this.steamCloudSyncedStorage = new Persistence.SyncedStorages.SteamCloud({
              relativeDirectoryPath: "".concat(this.constructor.fileSystemSavesDirectorySteamCloud, "/").concat(steam.player.steamId64),
              relativeBackupDirectoryPath: this.constructor.fileSystemSaveBackupsDirectory
            });
            return Persistence.registerSyncedStorage(this.steamCloudSyncedStorage);
          }
        });
        this.fileSystemSyncedStorage = new Persistence.SyncedStorages.FileSystem({
          relativeDirectoryPath: this.constructor.fileSystemSavesDirectory,
          relativeBackupDirectoryPath: this.constructor.fileSystemSaveBackupsDirectory
        });
        return Persistence.registerSyncedStorage(this.fileSystemSyncedStorage);
      } else {
        this.indexedDBSyncedStorage = new Persistence.SyncedStorages.IndexedDB({
          databaseName: this.constructor.indexedDBDatabaseName
        });
        return Persistence.registerSyncedStorage(this.indexedDBSyncedStorage);
      }
    }
    saveGame(options) {
      var syncedStorage;
      super.saveGame(...arguments);
      if (Meteor.isDesktop) {
        syncedStorage = options.steamCloud ? this.steamCloudSyncedStorage : this.fileSystemSyncedStorage;
      } else {
        syncedStorage = this.indexedDBSyncedStorage;
      }
      return Persistence.addSyncingToProfile(syncedStorage.id());
    }
    async loadGame() {
      var dialog, profile, steam, syncedStorageMigration;
      await super.loadGame(...arguments);
      await _.waitForFlush();
      // Offer the user to migrate to Steam Cloud.
      if (steam = AT.Steam.instance()) {
        profile = LOI.adventure.profile();
        if (!(profile.syncedStorages[Persistence.SyncedStorages.SteamCloud.id()] || profile.informedAboutSteamCloud)) {
          dialog = new LOI.Components.Dialog({
            message: "Steam 云存档现已可用！是否为此存档启用 Steam 云同步？\n          \n启用后，存档“".concat(profile.debugName(), "”将与 Steam 账户“").concat(steam.player.name, "”同步。您必须登录 Steam 才能看到此存档。"),
            buttons: [{
              text: "启用",
              value: true
            }, {
              text: "取消"
            }]
          });
          // Disable loading audio when deciding on a popup dialogs.
          LOI.adventure.menu.loadGame.audio.load(false);
          await LOI.adventure.showActivatableModalDialog({
            dialog: dialog,
            callback: () => {
              return Persistence.Profile.documents.update(profile._id, {
                $set: {
                  lastEditTime: new Date(),
                  informedAboutSteamCloud: true
                }
              });
            }
          });
          if (dialog.result) {
            syncedStorageMigration = new LM.SyncedStorageMigration(profile._id, Persistence.SyncedStorages.FileSystem.id(), Persistence.SyncedStorages.SteamCloud.id());
            return await LOI.adventure.showActivatableModalDialog({
              dialog: syncedStorageMigration
            });
          }
        }
      }
    }
    endRun() {
      if (Meteor.isDesktop) {
        return;
      }
      // Override to not perform any database flush behaviors since we don't
      // know if the OS will give us the time to perform the saves in time.
      return super.endRun(...arguments);
    }
  }
  ;
  Adventure.fileSystemSavesDirectory = 'saves';
  Adventure.fileSystemSavesDirectorySteamCloud = 'steam saves';
  Adventure.fileSystemSaveBackupsDirectory = 'save backups';
  Adventure.indexedDBDatabaseName = 'Retronator';
  return Adventure;
}.call(this);
if (Meteor.isDesktop) {
  Meteor.startup(async function () {
    var backupDirectoryPath;
    backupDirectoryPath = await Persistence.SyncedStorages.FileSystem.getUserDataPath(LM.Adventure.fileSystemSaveBackupsDirectory);
    return Desktop.call('filesystem', 'initializeProfileBackups', backupDirectoryPath, 10);
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"savegame":{"savegame.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/savegame/savegame.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AEc, AM, AT, LM, LOI, PAA, Persistence;
AB = Artificial.Base;
AC = Artificial.Control;
AEc = Artificial.Echo;
AM = Artificial.Mirage;
AT = Artificial.Telepathy;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PAA.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
LM.SaveGame = function () {
  class SaveGame extends LOI.Components.SaveGame {
    static id() {
      return 'PixelArtAcademy.LearnMode.SaveGame';
    }
    onCreated() {
      var steam, useSteamCloud;
      super.onCreated(...arguments);
      useSteamCloud = false;
      if (steam = AT.Steam.instance()) {
        if (steam.cloud.enabledForAccount) {
          useSteamCloud = steam.cloud.enabledForApp();
        }
      }
      return this.steamCloud = new ReactiveField(useSteamCloud);
    }
    saveGame() {
      return LOI.adventure.saveGame({
        steamCloud: this.steamCloud()
      });
    }
    optionsVisibleClass() {
      if (this.newSaveGameName()) {
        return 'visible';
      }
    }
    steamCloudClass() {
      if (this.steamCloud()) {
        return 'steam-cloud';
      }
    }
    _createProfileFields() {
      var profileFields;
      profileFields = super._createProfileFields(...arguments);
      if (AB.DistributionPlatform.isSteam) {
        profileFields.informedAboutSteamCloud = true;
      }
      return profileFields;
    }
  }
  ;
  SaveGame.register(SaveGame.id());
  SaveGame.initializeDataComponent();

  // Components
  SaveGame.SteamCloud = function () {
    class SteamCloud extends SaveGame.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Checkbox;
        this.propertyName = 'steamCloud';
      }
    }
    ;
    SteamCloud.register('PixelArtAcademy.LearnMode.SaveGame.SteamCloud');
    return SteamCloud;
  }.call(this);
  return SaveGame;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.savegame.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/savegame/template.savegame.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.SaveGame");
Template["PixelArtAcademy.LearnMode.SaveGame"] = new Template("Template.PixelArtAcademy.LearnMode.SaveGame", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("deactivated"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "pixelartacademy-learnmode-savegame landsofillusions-components-savegame landsofillusions-components-savesystem"
    }, "\n      ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("savingActive"));
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
      }), "\n      " ];
    }), "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
    }, function() {
      return [ HTML.Raw('\n        <div class="title">创建新存档</div>\n        '), HTML.DIV({
        class: "new-save-game"
      }, "\n          ", HTML.DIV({
        class: function() {
          return [ "floppy ", Spacebars.mustache(view.lookup("steamCloudClass")), " ", Spacebars.mustache(view.lookup("savingActiveClass")) ];
        }
      }, HTML.Raw('\n            <div class="shutter"></div>\n            '), HTML.DIV({
        class: "label"
      }, Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "SaveGame", "NewSaveGameName"));
      })), "\n          "), "\n        "), "\n        ", HTML.DIV({
        class: function() {
          return [ "options ", Spacebars.mustache(view.lookup("optionsVisibleClass")) ];
        }
      }, "\n          ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("steam"), "cloud", "enabledForAccount"));
      }, function() {
        return [ "\n            ", HTML.DIV({
          class: "steam-cloud"
        }, "\n              ", HTML.LABEL({
          class: "enable"
        }, "\n                ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "LearnMode", "SaveGame", "SteamCloud"));
        }), HTML.Raw('<span class="checkmark"></span> 使用 Steam 云存档\n              ')), "\n              ", HTML.DIV({
          class: "username"
        }, "\n                ", Blaze.View("lookup:steam.player.name", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("steam"), "player", "name"));
        }), "\n              "), "\n            "), "\n          " ];
      }), "\n        "), "\n        ", HTML.DIV({
        class: "controls"
      }, "\n          ", HTML.BUTTON({
        class: function() {
          return [ "save-button action-button ", Spacebars.mustache(view.lookup("saveButtonVisibleClass")) ];
        }
      }, "保存"), "\n        "), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"loadgame":{"loadgame.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/loadgame/loadgame.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AEc, AM, AT, LM, LOI, PAA, Persistence;
AB = Artificial.Babel;
AC = Artificial.Control;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
AT = Artificial.Telepathy;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PAA.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
LM.LoadGame = function () {
  class LoadGame extends LOI.Components.LoadGame {
    static id() {
      return 'PixelArtAcademy.LearnMode.LoadGame';
    }
    editingProfileHasSteamCloud() {
      var profile;
      profile = Persistence.Profile.documents.findOne(this.editingProfileId());
      return profile.syncedStorages[Persistence.SyncedStorages.SteamCloud.id()];
    }
    events() {
      return super.events(...arguments).concat({
        'click .enable-steam-cloud-button': this.onClickEnableSteamButton,
        'click .disable-steam-cloud-button': this.onClickDisableSteamButton
      });
    }
    onClickEnableSteamButton(event) {
      var dialog, profile, steam;
      profile = Persistence.Profile.documents.findOne(this.editingProfileId());
      steam = AT.Steam.instance();
      dialog = new LOI.Components.Dialog({
        message: "启用 Steam 云同步后，存档“".concat(profile.debugName(), "”将与 Steam 账户“").concat(steam.player.name, "”同步。您必须登录 Steam 才能看到此存档。"),
        buttons: [{
          text: "启用",
          value: true
        }, {
          text: "取消"
        }]
      });
      return LOI.adventure.showActivatableModalDialog({
        dialog: dialog,
        callback: () => {
          if (!dialog.result) {
            return;
          }
          return this._migrateSyncedStorage(profile._id, Persistence.SyncedStorages.FileSystem.id(), Persistence.SyncedStorages.SteamCloud.id());
        }
      });
    }
    onClickDisableSteamButton(event) {
      var dialog, profile;
      profile = Persistence.Profile.documents.findOne(this.editingProfileId());
      dialog = new LOI.Components.Dialog({
        message: "停用 Steam 云同步后，存档“".concat(profile.debugName(), "”将只能在此电脑本地使用。"),
        buttons: [{
          text: "停用",
          value: true
        }, {
          text: "取消"
        }]
      });
      return LOI.adventure.showActivatableModalDialog({
        dialog: dialog,
        callback: () => {
          if (!dialog.result) {
            return;
          }
          return this._migrateSyncedStorage(profile._id, Persistence.SyncedStorages.SteamCloud.id(), Persistence.SyncedStorages.FileSystem.id());
        }
      });
    }
    _migrateSyncedStorage(profileId, existingSyncedStorageId, newSyncedStorageId) {
      var syncedStorageMigration;
      Persistence.Profile.documents.update(profileId, {
        $set: {
          lastEditTime: new Date(),
          informedAboutSteamCloud: true
        }
      });
      syncedStorageMigration = new LM.SyncedStorageMigration(profileId, existingSyncedStorageId, newSyncedStorageId);
      return LOI.adventure.showActivatableModalDialog({
        dialog: syncedStorageMigration
      });
    }
  }
  ;
  LoadGame.register(LoadGame.id());
  return LoadGame;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.loadgame.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/loadgame/template.loadgame.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.LoadGame");
Template["PixelArtAcademy.LearnMode.LoadGame"] = new Template("Template.PixelArtAcademy.LearnMode.LoadGame", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("deactivated"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: function() {
        return [ "pixelartacademy-learnmode-loadgame landsofillusions-components-loadgame landsofillusions-components-savesystem ", Spacebars.mustache(view.lookup("editEnabledClass")), " ", Spacebars.mustache(view.lookup("visibleClass")) ];
      }
    }, "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showBackButton"));
    }, function() {
      return [ "\n        ", Blaze._TemplateWith(function() {
        return Spacebars.dataMustache(view.lookup("args"), view.lookup("backButtonCallback"));
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
        });
      }), "\n      " ];
    }), "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
    }, function() {
      return [ "\n        ", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("autoLoadedProfileId"));
      }, function() {
        return [ "\n          ", HTML.DIV({
          class: "title"
        }, "\n            ", Blaze.If(function() {
          return Spacebars.call(view.lookup("editEnabled"));
        }, function() {
          return "\n              选择要编辑的存档\n            ";
        }, function() {
          return "\n              选择要加载的存档\n            ";
        }), "\n          "), "\n          ", HTML.UL(HTML.Attrs({
          class: "profiles"
        }, function() {
          return Spacebars.attrMustache(view.lookup("style"), view.lookup("profilesStyle"));
        }), "\n            ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("profiles"));
        }, function() {
          return [ "\n              ", HTML.LI({
            class: function() {
              return [ "profile ", Spacebars.mustache(view.lookup("profileActiveClass")) ];
            },
            "data-id": function() {
              return Spacebars.mustache(view.lookup("_id"));
            }
          }, "\n                ", HTML.DIV({
            class: function() {
              return [ "floppy ", Spacebars.mustache(view.lookup("syncedStorageClasses")) ];
            }
          }, HTML.Raw('\n                  <div class="shutter"></div>\n                  '), HTML.DIV({
            class: "label"
          }, Blaze.If(function() {
            return Spacebars.call(view.lookup("editEnabled"));
          }, function() {
            return [ "\n                      ", Spacebars.include(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "LoadGame", "SaveGameName"));
            }), "\n                    " ];
          }, function() {
            return Blaze.View("lookup:debugName", function() {
              return Spacebars.mustache(view.lookup("debugName"));
            });
          })), "\n                "), "\n              "), "\n            " ];
        }), "\n          "), "\n          ", HTML.DIV({
          class: "controls"
        }, "\n            ", HTML.BUTTON(HTML.Attrs({
          class: function() {
            return [ "previous-button action-button ", Spacebars.mustache(view.lookup("previousButtonVisibleClass")) ];
          }
        }, function() {
          return Spacebars.attrMustache(view.lookup("previousButtonDisabledAttribute"));
        }), "←"), "\n            ", Blaze.If(function() {
          return Spacebars.call(view.lookup("editEnabled"));
        }, function() {
          return [ "\n              ", Blaze.If(function() {
            return Spacebars.call(view.lookup("editingProfileId"));
          }, function() {
            return [ "\n                ", Blaze.If(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("steam"), "cloud", "enabledForAccount"));
            }, function() {
              return [ "\n                  ", Blaze.If(function() {
                return Spacebars.call(view.lookup("editingProfileHasSteamCloud"));
              }, function() {
                return HTML.Raw('\n                    <button class="disable-steam-cloud-button action-button">停用 Steam 云存档</button>\n                  ');
              }, function() {
                return HTML.Raw('\n                    <button class="enable-steam-cloud-button action-button">启用 Steam 云存档</button>\n                  ');
              }), "\n                " ];
            }), HTML.Raw('\n                <button class="remove-button action-button">删除</button>\n              ') ];
          }), "\n            " ];
        }, function() {
          return [ "\n              ", HTML.BUTTON({
            class: function() {
              return [ "edit-button action-button ", Spacebars.mustache(view.lookup("editButtonVisibleClass")) ];
            }
          }, "编辑"), "\n            " ];
        }), "\n            ", HTML.BUTTON(HTML.Attrs({
          class: function() {
            return [ "next-button action-button ", Spacebars.mustache(view.lookup("nextButtonVisibleClass")) ];
          }
        }, function() {
          return Spacebars.attrMustache(view.lookup("nextButtonDisabledAttribute"));
        }), "→"), "\n          "), "\n        " ];
      }), "\n        ", HTML.DIV({
        class: function() {
          return [ "progress-overlay ", Spacebars.mustache(view.lookup("progressOverlayVisibleClass")) ];
        }
      }, "\n          ", HTML.DIV({
        class: function() {
          return [ "loading progress ", Spacebars.mustache(view.lookup("loadingVisibleClass")) ];
        }
      }, "\n            ", HTML.DIV({
        class: function() {
          return [ "loading-text progress-text ", Spacebars.mustache(view.lookup("loadingTextVisibleClass")) ];
        }
      }, "\n              正在加载……\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("showProfileLoadingPercentage"));
      }, function() {
        return [ "\n                ", Blaze.View("lookup:profileLoadingPercentage", function() {
          return Spacebars.mustache(view.lookup("profileLoadingPercentage"));
        }), "%\n              " ];
      }), "\n            "), "\n          "), "\n        "), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"syncedstoragemigration":{"syncedstoragemigration.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/syncedstoragemigration/syncedstoragemigration.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LM, LOI, PAA, Persistence;
AM = Artificial.Mirage;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PAA.LearnMode;
Persistence = Artificial.Mummification.Document.Persistence;
LM.SyncedStorageMigration = function () {
  class SyncedStorageMigration extends AM.Component {
    static id() {
      return 'PixelArtAcademy.LearnMode.SyncedStorageMigration';
    }
    mixins() {
      return [this.activatable];
    }
    constructor(profileId, existingSyncedStorageId, newSyncedStorageId) {
      super(...arguments);
      this.profileId = profileId;
      this.existingSyncedStorageId = existingSyncedStorageId;
      this.newSyncedStorageId = newSyncedStorageId;
      this.activatable = new LOI.Components.Mixins.Activatable();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.migratingTextVisible = new ReactiveField(false);
      this.showMigratingPercentage = new ReactiveField(false);
      return this.compressingStoragePercentage = new ReactiveField(0);
    }
    async onActivate(finishedActivatingCallback) {
      var error, loadedProfile, newSyncedStorage, profile;
      this.compressingStoragePercentage(0);
      LOI.adventure.menu.loadGame.audio.load(true);
      this.showMigratingPercentage(false);
      await _.waitForSeconds(0.5);
      finishedActivatingCallback();
      this.migratingTextVisible(true);
      profile = Persistence.Profile.documents.findOne(this.profileId);
      loadedProfile = LOI.adventure.profile();
      if (loadedProfile && loadedProfile._id !== this.profileId) {
        throw new AE.InvalidOperationException("Profile was already loaded while attempting to migrate a different profile's synced storage.");
      }
      try {
        if (!loadedProfile) {
          await Persistence.loadProfile(this.profileId);
        }
        this.showMigratingPercentage(true);
        if (Meteor.isDesktop) {
          if (!profile.syncedStorages[this.newSyncedStorageId]) {
            await Persistence.addSyncingToProfile(this.newSyncedStorageId);
          }
          if (profile.syncedStorages[this.existingSyncedStorageId]) {
            await Persistence.removeSyncingFromProfile(this.existingSyncedStorageId);
          }
          newSyncedStorage = Persistence.getSyncedStorage(this.newSyncedStorageId);
          await newSyncedStorage.compressStorage(this.profileId, {
            onProgress: progress => {
              return this.compressingStoragePercentage(progress * 100);
            }
          });
        } else {
          // Wait for browser testing purposes.
          await _.waitForSeconds(2);
        }
        if (!loadedProfile) {
          return Persistence.unloadProfile();
        }
      } catch (error1) {
        error = error1;
        return console.error(error);
      } finally {
        this.migratingTextVisible(false);
        LOI.adventure.menu.loadGame.audio.load(false);
        this.activatable.deactivate();
      }
    }
    onDeactivate(finishedDeactivatingCallback) {
      return Meteor.setTimeout(() => {
        return finishedDeactivatingCallback();
      }, 500);
    }
    migratingTextVisibleClass() {
      if (this.migratingTextVisible()) {
        return 'visible';
      }
    }
    migratingPercentage() {
      return Math.floor(Persistence.addingSyncingPercentage() * 0.9 + this.compressingStoragePercentage() * 0.1);
    }
  }
  ;
  SyncedStorageMigration.register(SyncedStorageMigration.id());
  return SyncedStorageMigration;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.syncedstoragemigration.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-learnmode-app/syncedstoragemigration/template.syncedstoragemigration.js         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.LearnMode.SyncedStorageMigration");
Template["PixelArtAcademy.LearnMode.SyncedStorageMigration"] = new Template("Template.PixelArtAcademy.LearnMode.SyncedStorageMigration", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-learnmode-syncedstoragemigration"
  }, "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "migrating-text ", Spacebars.mustache(view.lookup("migratingTextVisibleClass")) ];
      }
    }, "\n        Migrating …\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showMigratingPercentage"));
    }, function() {
      return [ "\n          ", Blaze.View("lookup:migratingPercentage", function() {
        return Spacebars.mustache(view.lookup("migratingPercentage"));
      }), "%\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  ");
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

require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/app.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/template.app.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/layouts/layouts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/layouts/publicaccess/publicaccess.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/layouts/publicaccess/template.publicaccess.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/adventure/adventure.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/savegame/savegame.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/savegame/template.savegame.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/loadgame/loadgame.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/loadgame/template.loadgame.js");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/syncedstoragemigration/syncedstoragemigration.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-learnmode-app/syncedstoragemigration/template.syncedstoragemigration.js");

/* Exports */
Package._define("retronator:pixelartacademy-learnmode-app", {
  PixelArtAcademy: PixelArtAcademy
});

})();
