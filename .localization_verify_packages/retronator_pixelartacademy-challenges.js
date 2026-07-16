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
var PixelArtAcademy = Package['retronator:pixelartacademy-pixelpad-drawing'].PixelArtAcademy;
var PixelArtDatabase = Package['retronator:pixelartdatabase'].PixelArtDatabase;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-challenges":{"challenges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/challenges.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges = class Challenges {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawing":{"drawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/drawing.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing = class Drawing {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"referenceselection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/referenceselection.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Babel;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.ReferenceSelection = class ReferenceSelection extends PAA.PixelPad.Apps.Drawing.Portfolio.Asset {
  static displayName() {
    throw new AE.NotImplementedException("Provide a name for the reference selection asset.");
  }
  static description() {
    throw new AE.NotImplementedException("Provide the description text explaining the context for the reference.");
  }
  static portfolioComponentClass() {
    throw new AE.NotImplementedException("Specify the component that shows up in the portfolio.");
  }
  static customComponentClass() {
    throw new AE.NotImplementedException("Specify the component that enables the selection of the reference.");
  }
  static initialize() {
    // On the server, create this asset's translated names.
    if (Meteor.isServer) {
      return Document.startup(() => {
        var i, len, property, ref, results, translationNamespace;
        if (Meteor.settings.startEmpty) {
          return;
        }
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
    var customComponentClass, portfolioComponentClass, translationNamespace;
    super(...arguments);

    // Subscribe to this asset's translations.
    translationNamespace = this.id();
    this._translationSubscription = AB.subscribeNamespace(translationNamespace);
    portfolioComponentClass = this.constructor.portfolioComponentClass();
    customComponentClass = this.constructor.customComponentClass();
    this.portfolioComponent = new portfolioComponentClass(this);
    this.customComponent = new customComponentClass(this);
  }
  id() {
    return this.constructor.id();
  }
  displayName() {
    return AB.translate(this._translationSubscription, 'displayName').text;
  }
  displayNameTranslation() {
    return AB.translation(this._translationSubscription, 'displayName');
  }
  description() {
    return AB.translate(this._translationSubscription, 'description').text;
  }
  descriptionTranslation() {
    return AB.translation(this._translationSubscription, 'description');
  }
  ready() {
    return true;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelartsoftware":{"pixelartsoftware.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/pixelartsoftware.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI,
  PAA,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtSoftware = function () {
  class PixelArtSoftware extends PAA.Practice.Project.Thing {
    // assets: array of assets that the player has chosen to complete for the Copy reference challenge
    //   id: unique asset identifier
    //   type: what kind of asset this is
    //   completed: auto-updated field if the player completed this asset
    //   uploaded: tells if the player used the upload action for this asset

    //   BITMAP
    //   bitmapId: ID of the bitmap representing this asset
    static id() {
      return 'PixelArtAcademy.Challenges.Drawing.PixelArtSoftware';
    }
    static fullName() {
      return "像素画软件";
    }
    static translations() {
      return {
        noAssetsInstructions: "To make sure you are ready to complete pixel art drawing assignments, this challenge requires you to copy an\nexisting game sprite in your editor of choice. First, go to the Retronator HQ Gallery and talk to Corinne to\nobtain a reference image and further instructions."
      };
    }
    static completed() {
      var assets;
      assets = this.state('assets');
      return _.find(assets, asset => {
        return asset.completed;
      });
    }
    static addCopyReferenceAsset(assetClassName) {
      var assets, id, insertionIndex, referenceSelection, referenceSelectionId;
      assets = this.state('assets');
      if (assets == null) {
        assets = [];
      }
      id = "PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.".concat(assetClassName);

      // Add the asset if it's not already added.
      if (!_.find(assets, asset => {
        return asset.id === id;
      })) {
        referenceSelectionId = PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.id();
        referenceSelection = _.find(assets, asset => {
          return asset.id === referenceSelectionId;
        });
        insertionIndex = referenceSelection ? 1 : 0;
        assets.splice(insertionIndex, 0, {
          id
        });
      }
      return this.state('assets', assets);
    }
    static remainingCopyReferenceClasses() {
      var addedAssets, addedReferenceClassIds, asset;
      addedAssets = this.state('assets') || [];
      addedReferenceClassIds = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = addedAssets.length; i < len; i++) {
          asset = addedAssets[i];
          results.push(asset.id);
        }
        return results;
      }();
      return _.filter(_.values(this.copyReferenceClasses), copyReferenceClass => {
        var ref;
        return ref = copyReferenceClass.id(), indexOf.call(addedReferenceClassIds, ref) < 0;
      });
    }
    constructor() {
      super(...arguments);

      // Listen to asset completed changes to determine if editor and upload options are granted.
      this._assetsCompletedAutorun = Tracker.autorun(() => {
        var asset, canEdit, canUpload, i, len, pixelArtSoftwareAssets;
        canEdit = false;
        canUpload = false;
        if (pixelArtSoftwareAssets = this.state('assets')) {
          for (i = 0, len = pixelArtSoftwareAssets.length; i < len; i++) {
            asset = pixelArtSoftwareAssets[i];
            if (asset.completed) {
              if (asset.uploaded) {
                canUpload = true;
              } else {
                canEdit = true;
              }
            }
          }
        }
        return Tracker.nonreactive(() => {
          var Bitmap;
          Bitmap = PAA.Practice.Project.Asset.Bitmap;
          if (canEdit !== Bitmap.state('canEdit')) {
            Bitmap.state('canEdit', canEdit);
          }
          if (canUpload !== Bitmap.state('canUpload')) {
            return Bitmap.state('canUpload', canUpload);
          }
        });
      });
    }
    destroy() {
      var asset, i, len, ref, results;
      this._assetsCompletedAutorun.stop();
      if (this._pixelArtSoftwareAssets) {
        ref = this._pixelArtSoftwareAssets;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          asset = ref[i];
          results.push(asset.destroy());
        }
        return results;
      }
    }
    noAssetsInstructions() {
      var ref;
      return (ref = this.translations()) != null ? ref.noAssetsInstructions : void 0;
    }
    assetsData() {
      if (!LOI.adventure.gameStateAvailable()) {
        return;
      }
      // We need to mimic a project, so we need to provide the data. If no state is
      // set, we send a dummy object to let the bitmap know we've loaded the state.
      return this.state('assets') || [];
    }
    assets() {
      var asset, assetClassName, assets, base, base1, i, len, name, name1, pixelArtSoftwareAssets;
      assets = [];
      if (this._pixelArtSoftwareAssets == null) {
        this._pixelArtSoftwareAssets = [];
      }
      if (pixelArtSoftwareAssets = this.state('assets')) {
        for (i = 0, len = pixelArtSoftwareAssets.length; i < len; i++) {
          asset = pixelArtSoftwareAssets[i];
          if (asset.id === PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.id()) {
            if ((base = this._pixelArtSoftwareAssets)[name = asset.id] == null) {
              base[name] = Tracker.nonreactive(() => {
                return new PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection(this);
              });
            }
          } else {
            assetClassName = _.last(asset.id.split('.'));
            if ((base1 = this._pixelArtSoftwareAssets)[name1 = asset.id] == null) {
              base1[name1] = Tracker.nonreactive(() => {
                return new PAA.Challenges.Drawing.PixelArtSoftware.CopyReference[assetClassName](this);
              });
            }
          }
          assets.push(this._pixelArtSoftwareAssets[asset.id]);
        }
      }
      return assets;
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.Intro.Tutorial))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.Intro.Tutorial.Content.DrawingChallenges.CopyReference);
    }
  }
  ;
  PixelArtSoftware.initialize();
  PixelArtSoftware.copyReferenceClasses = {};
  return PixelArtSoftware;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"copyreference.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/copyreference.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtSoftware.CopyReference = class CopyReference extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static displayName() {
    return "Copy the reference";
  }
  static description() {
    return "重新创建提供的参考图，以表明你会使用像素画软件。";
  }
  static bitmap() {
    return ""; // Empty bitmap
  }
  static goalImageUrl() {
    return "/pixelartacademy/challenges/drawing/pixelartsoftware/".concat(this.imageName(), ".png");
  }
  static imageName() {
    throw new AE.NotImplementedException("You must provide the image name for the asset.");
  }
  static references() {
    return [{
      image: {
        url: "/pixelartacademy/challenges/drawing/pixelartsoftware/".concat(this.imageName(), "-reference.png")
      },
      displayOptions: {
        imageOnly: true
      }
    }];
  }
  static customPaletteImageUrl() {
    if (this.restrictedPaletteName()) {
      return null;
    }
    return "/pixelartacademy/challenges/drawing/pixelartsoftware/".concat(this.imageName(), "-template.png");
  }
  static briefComponentClass() {
    return this.BriefComponent;
  }
  constructor() {
    super(...arguments);
    this.uploadMode = new ReactiveField(false);
    this._clipboardSecondPageComponent = new PAA.Challenges.Drawing.PixelArtSoftware.CopyReference.ClipboardSecondPageComponent(this);
  }
  initializeSteps() {
    super.initializeSteps(...arguments);

    // Make the pixels step only show drawn errors.
    return this.stepAreas()[0].steps()[0].options.drawHintsForGoalPixels = false;
  }
  editorOptions() {
    return {
      references: {
        upload: {
          enabled: false
        },
        storage: {
          enabled: false
        }
      }
    };
  }
  clipboardSecondPageComponent() {
    // We only show this page if we can upload.
    if (PAA.PixelPad.Apps.Drawing.state('externalSoftware') == null) {
      return;
    }
    return this._clipboardSecondPageComponent;
  }
  availableToolKeys() {
    // When we're in upload mode, don't show any tools in the editor.
    if (this.uploadMode()) {
      return [];
    }

    // Otherwise, show all basic tools.
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.ColorSwatches, PAA.Practice.Software.Tools.ToolKeys.ColorPicker, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.References];
  }
  templateUrl() {
    return "/pixelartacademy/challenges/drawing/pixelartsoftware/".concat(this.constructor.imageName(), "-template.png");
  }
  referenceUrl() {
    return this.constructor.references()[0].image.url;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assets.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/assets.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var CopyReference, LOI, PAA, PADB, asset, assetId, assets;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
CopyReference = PAA.Challenges.Drawing.PixelArtSoftware.CopyReference;
PADB = PixelArtDatabase;
assets = {
  MSHMNetherWorld: {
    dimensions: function () {
      return {
        width: 13,
        height: 16
      };
    },
    imageName: function () {
      return 'mshm-netherworld';
    },
    bitmapInfo: function () {
      return "Artwork from [NetherWorld](http://www.netherworldgame.com), WIP\n\nArtist: Isabel 'Erien' Armentero";
    },
    artist: {
      name: {
        first: 'Isabel',
        last: 'Armentero',
        nickname: 'Erien'
      }
    },
    artwork: {
      title: 'Medoo',
      completionDate: {
        year: 2017
      }
    }
  },
  MSHMDespotDungeons: {
    dimensions: function () {
      return {
        width: 12,
        height: 14
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#1e1e1e');
    },
    imageName: function () {
      return 'mshm-despotdungeons';
    },
    bitmapInfo: function () {
      return "Artwork from [Despot Dungeons](https://realfast.itch.io/despot-dungeons), 2017\n\nArtist: Hjalte Tagmose";
    },
    artist: {
      name: {
        first: 'Hjalte',
        last: 'Tagmose'
      }
    },
    artwork: {
      title: 'Disenfranchised frog',
      completionDate: {
        year: 2017
      }
    }
  },
  MSEMDespotDungeons: {
    dimensions: function () {
      return {
        width: 11,
        height: 14
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#1e1e1e');
    },
    imageName: function () {
      return 'msem-despotdungeons';
    },
    bitmapInfo: function () {
      return "Artwork from [Despot Dungeons](https://realfast.itch.io/despot-dungeons), 2017\n\nArtist: Hjalte Tagmose";
    },
    artist: {
      name: {
        first: 'Hjalte',
        last: 'Tagmose'
      }
    },
    artwork: {
      title: 'Ratman',
      completionDate: {
        year: 2017
      }
    }
  },
  MSEMLAbbayeDesMorts: {
    dimensions: function () {
      return {
        width: 15,
        height: 9
      };
    },
    restrictedPaletteName: function () {
      return LOI.Assets.Palette.SystemPaletteNames.ZXSpectrum;
    },
    backgroundColor: function () {
      return {
        paletteColor: {
          ramp: 0,
          shade: 0
        }
      };
    },
    imageName: function () {
      return 'msem-labbayedesmorts';
    },
    bitmapInfo: function () {
      return "Artwork from [l'Abbaye des Morts](https://www.locomalito.com/abbaye_des_morts.php), 2010\n\nArtist: Locomalito";
    },
    artist: {
      name: {
        first: 'Juan',
        middle: 'Antonio',
        last: 'Becerra'
      },
      pseudonym: 'Locomalito'
    },
    artwork: {
      title: 'Flying skull',
      completionDate: {
        year: 2010
      }
    }
  },
  MSVMLuftrauser: {
    dimensions: function () {
      return {
        width: 16,
        height: 14
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#e5dcae');
    },
    imageName: function () {
      return 'msvm-luftrauser';
    },
    bitmapInfo: function () {
      return "Artwork from [LUFTRAUSER](https://www.newgrounds.com/portal/view/573422), 2011\n\nArtist: Paul 'Pietepiet' Veer";
    },
    artist: {
      name: {
        first: 'Paul',
        last: 'Veer',
        nickname: 'Pietepiet'
      }
    },
    artwork: {
      title: 'Rauser',
      completionDate: {
        year: 2011
      }
    }
  },
  MSOMMidnightDungeon: {
    dimensions: function () {
      return {
        width: 6,
        height: 6
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#000');
    },
    imageName: function () {
      return 'msom-midnightdungeon';
    },
    bitmapInfo: function () {
      return "Artwork from [Midnight Dungeon](https://pixelartm.itch.io/midnight-dungeon), 2018\n\nArtist: Miguel 'PixelArtM' Sánchez";
    },
    artist: {
      name: {
        first: 'Miguel',
        last: 'Sánchez',
        nickname: 'PixelArtM'
      }
    },
    artwork: {
      title: 'Sword',
      completionDate: {
        year: 2018
      }
    }
  },
  MBHMLouBagelsWaffleBar: {
    dimensions: function () {
      return {
        width: 36,
        height: 49
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#a394d2');
    },
    imageName: function () {
      return 'mbhm-loubagelswafflebar';
    },
    bitmapInfo: function () {
      return "Artwork from [Lou Bagel's Waffle Bar](https://www.loubagel.com/arcade/), 2018\n\nArtist: Chris Taylor";
    },
    artist: {
      name: {
        first: 'Chris',
        last: 'Taylor'
      }
    },
    artwork: {
      title: 'Bagel chef',
      completionDate: {
        year: 2018
      }
    }
  },
  MBHMVVVVVV: {
    dimensions: function () {
      return {
        width: 10,
        height: 21
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#000');
    },
    imageName: function () {
      return 'mbhm-vvvvvv';
    },
    bitmapInfo: function () {
      return "Artwork from [VVVVVV](https://thelettervsixtim.es), 2010\n\nArtist: Terry Cavanagh";
    },
    artist: {
      name: {
        first: 'Terry',
        last: 'Cavanagh'
      }
    },
    artwork: {
      title: 'Captain Viridian',
      completionDate: {
        year: 2009
      }
    }
  },
  MBEMSaboteurSiO: {
    dimensions: function () {
      return {
        width: 32,
        height: 46
      };
    },
    restrictedPaletteName: function () {
      return LOI.Assets.Palette.SystemPaletteNames.ZXSpectrum;
    },
    imageName: function () {
      return 'mbem-saboteursio';
    },
    bitmapInfo: function () {
      return "Artwork from [Saboteur SiO](http://www.clivetownsend.com), WIP\n\nArtist: Ricardo Oyón Rodríguez";
    },
    artist: {
      name: {
        first: 'Ricardo',
        middle: 'Oyón',
        last: 'Rodríguez'
      }
    },
    artwork: {
      title: 'Bouncer',
      completionDate: {
        year: 2018
      }
    }
  },
  MBVMLuftrausers: {
    dimensions: function () {
      return {
        width: 59,
        height: 18
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#e5ddac');
    },
    imageName: function () {
      return 'mbvm-luftrausers';
    },
    bitmapInfo: function () {
      return "Artwork from [LUFTRAUSERS](http://luftrausers.com), 2014\n\nArtist: Roy Nathan de Groot";
    },
    artist: {
      name: {
        first: 'Roy',
        middle: 'Nathan',
        lastPrefix: 'de',
        last: 'Groot'
      }
    },
    artwork: {
      title: 'Boat',
      completionDate: {
        year: 2014
      }
    }
  },
  MBOMCityClickers: {
    dimensions: function () {
      return {
        width: 34,
        height: 22
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#e8cda8');
    },
    imageName: function () {
      return 'mbom-cityclickers';
    },
    bitmapInfo: function () {
      return "Artwork from [City Clickers](https://eigen.itch.io/city-clickers), 2017\n\nArtist: Eigen Lenk";
    },
    artist: {
      name: {
        first: 'Eigen',
        last: 'Lenk'
      }
    },
    artwork: {
      title: 'House',
      completionDate: {
        year: 2017
      }
    }
  },
  MBOMInventorious: {
    dimensions: function () {
      return {
        width: 19,
        height: 22
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#250936');
    },
    imageName: function () {
      return 'mbom-inventorious';
    },
    bitmapInfo: function () {
      return "Artwork from [Inventorious](https://placeholders.itch.io/inventorious), 2018\n\nArtist: Mati Ernst";
    },
    artist: {
      name: {
        first: 'Mati',
        last: 'Ernst'
      }
    },
    artwork: {
      title: 'Necklace',
      completionDate: {
        year: 2018
      }
    }
  },
  CSHMCeleste: {
    dimensions: function () {
      return {
        width: 9,
        height: 7
      };
    },
    restrictedPaletteName: function () {
      return LOI.Assets.Palette.SystemPaletteNames.Pico8;
    },
    backgroundColor: function () {
      return {
        paletteColor: {
          ramp: 0,
          shade: 0
        }
      };
    },
    imageName: function () {
      return 'cshm-celeste';
    },
    bitmapInfo: function () {
      return "Artwork from [Celeste Classic](https://mattmakesgames.itch.io/celesteclassic), 2015\n\nArtist: Noel Berry";
    },
    artist: {
      name: {
        first: 'Noel',
        last: 'Berry'
      }
    },
    artwork: {
      title: 'Madeline',
      completionDate: {
        year: 2015
      }
    }
  },
  CSEMHookLineAndThinker: {
    dimensions: function () {
      return {
        width: 7,
        height: 8
      };
    },
    restrictedPaletteName: function () {
      return LOI.Assets.Palette.SystemPaletteNames.Pico8;
    },
    backgroundColor: function () {
      return {
        paletteColor: {
          ramp: 1,
          shade: 0
        }
      };
    },
    imageName: function () {
      return 'csem-hooklineandthinker';
    },
    bitmapInfo: function () {
      return "Artwork from [Hook, Line and Thinker](https://rhythmlynx.itch.io/hook-line-and-thinker), 2016\n\nArtist: Connor Halford";
    },
    artist: {
      name: {
        first: 'Connor',
        last: 'Halford'
      }
    },
    artwork: {
      title: 'Crab',
      completionDate: {
        year: 2016
      }
    }
  },
  CSEMSuperCrateBox: {
    dimensions: function () {
      return {
        width: 8,
        height: 7
      };
    },
    imageName: function () {
      return 'csem-supercratebox';
    },
    bitmapInfo: function () {
      return "Artwork from [Super Crate Box](http://supercratebox.com), 2010\n\nArtist: Roy Nathan de Groot";
    },
    artist: {
      name: {
        first: 'Roy',
        middle: 'Nathan',
        lastPrefix: 'de',
        last: 'Groot'
      }
    },
    artwork: {
      title: 'Small flying skull',
      completionDate: {
        year: 2010
      }
    }
  },
  CSVMFroggi: {
    dimensions: function () {
      return {
        width: 16,
        height: 12
      };
    },
    restrictedPaletteName: function () {
      return LOI.Assets.Palette.SystemPaletteNames.Pico8;
    },
    backgroundColor: function () {
      return {
        paletteColor: {
          ramp: 0,
          shade: 0
        }
      };
    },
    imageName: function () {
      return 'csvm-froggi';
    },
    bitmapInfo: function () {
      return "Artwork from [Froggi](https://sophieh.itch.io/froggi), 2018\n\nArtist: Sophie Houlden";
    },
    artist: {
      name: {
        first: 'Sophie',
        last: 'Houlden'
      }
    },
    artwork: {
      title: 'Red sports car',
      completionDate: {
        year: 2018
      }
    }
  },
  CSOMTheWakingCloak: {
    dimensions: function () {
      return {
        width: 16,
        height: 16
      };
    },
    imageName: function () {
      return 'csom-thewakingcloak';
    },
    bitmapInfo: function () {
      return "Artwork from [The Waking Cloak](http://www.thewakingcloak.com), WIP\n\nArtist: Daniel Müller";
    },
    artist: {
      name: {
        first: 'Daniel',
        last: 'Müller'
      }
    },
    artwork: {
      title: 'Staff of Moonlight',
      completionDate: {
        year: 2018
      }
    }
  },
  CBHMFez: {
    dimensions: function () {
      return {
        width: 13,
        height: 18
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#251635');
    },
    imageName: function () {
      return 'cbhm-fez';
    },
    bitmapInfo: function () {
      return "Artwork from [FEZ](http://www.fezgame.com), 2012\n\nArtist: Phil Fish";
    },
    artist: {
      name: {
        first: 'Phil',
        last: 'Fish'
      }
    },
    artwork: {
      title: 'Gomez',
      completionDate: {
        year: 2009
      }
    }
  },
  CBHMOwlboy: {
    dimensions: function () {
      return {
        width: 19,
        height: 38
      };
    },
    imageName: function () {
      return 'cbhm-owlboy';
    },
    bitmapInfo: function () {
      return "Artwork from [Owlboy](http://www.owlboygame.com), 2016\n\nArtist: Simon Stafsnes 'Snake' Andersen";
    },
    artist: {
      name: {
        first: 'Simon',
        middle: 'Stafsnes',
        last: 'Andersen',
        nickname: 'Snake'
      }
    },
    artwork: {
      title: 'Otus',
      completionDate: {
        year: 2008
      }
    }
  },
  CBHMCourierOfTheCrypts: {
    dimensions: function () {
      return {
        width: 15,
        height: 19
      };
    },
    imageName: function () {
      return 'cbhm-courierofthecrypts';
    },
    bitmapInfo: function () {
      return "Artwork from [Courier of the Crypts](http://www.courierofthecrypts.com), 2019\n\nArtist: Primož Vovk";
    },
    artist: {
      name: {
        first: 'Primož',
        last: 'Vovk'
      }
    },
    artwork: {
      title: 'Courier',
      completionDate: {
        year: 2014
      }
    }
  },
  CBHMNYKRA: {
    dimensions: function () {
      return {
        width: 9,
        height: 23
      };
    },
    imageName: function () {
      return 'cbhm-nykra';
    },
    bitmapInfo: function () {
      return "Artwork from [NYKRA: Before](http://nykra.com), 2021\n\nArtist: ENDESGA";
    },
    artist: {
      name: {
        nickname: 'ENDESGA'
      }
    },
    artwork: {
      title: 'Keu',
      completionDate: {
        year: 2015
      }
    }
  },
  CBEMSuperCrateBox: {
    dimensions: function () {
      return {
        width: 19,
        height: 18
      };
    },
    imageName: function () {
      return 'cbem-supercratebox';
    },
    bitmapInfo: function () {
      return "Artwork from [Super Crate Box](http://supercratebox.com), 2010\n\nArtist: Roy Nathan de Groot";
    },
    artist: {
      name: {
        first: 'Roy',
        middle: 'Nathan',
        lastPrefix: 'de',
        last: 'Groot'
      }
    },
    artwork: {
      title: 'Big green skull',
      completionDate: {
        year: 2010
      }
    }
  },
  CBEMIntoTheRift: {
    dimensions: function () {
      return {
        width: 30,
        height: 32
      };
    },
    imageName: function () {
      return 'cbem-intotherift';
    },
    bitmapInfo: function () {
      return " Artwork from [Into The Rift](https://store.steampowered.com/app/1093810/Savior/), WIP\n\nArtist: Weston Tracy";
    },
    artist: {
      name: {
        first: 'Weston',
        last: 'Tracy'
      }
    },
    artwork: {
      title: 'Archer',
      completionDate: {
        year: 2015
      }
    }
  },
  CBEMKingdomNewLands: {
    dimensions: function () {
      return {
        width: 12,
        height: 21
      };
    },
    imageName: function () {
      return 'cbem-kingdomnewlands';
    },
    bitmapInfo: function () {
      return "Artwork from [Kingdom: New Lands](http://www.kingdomthegame.com), 2015\n\nArtist: Thomas van den Berg";
    },
    artist: {
      name: {
        first: 'Thomas',
        lastPrefix: 'van den',
        last: 'Berg'
      }
    },
    artwork: {
      title: 'Greedling',
      completionDate: {
        year: 2015
      }
    }
  },
  CBEMDontGiveUpACynicalTale: {
    dimensions: function () {
      return {
        width: 22,
        height: 25
      };
    },
    imageName: function () {
      return 'cbem-dontgiveupacynicaltale';
    },
    bitmapInfo: function () {
      return "Artwork from [DON'T GIVE UP: A Cynical Tale](https://trisbee.itch.io/dont-give-up-a-cynical-tale), WIP\n\nArtist: Tristan Barona";
    },
    artist: {
      name: {
        first: 'Tristan',
        last: 'Barona'
      }
    },
    artwork: {
      title: 'Ted Tantrums',
      completionDate: {
        year: 2017
      }
    }
  },
  CBVMIntoTheBreach: {
    dimensions: function () {
      return {
        width: 31,
        height: 31
      };
    },
    imageName: function () {
      return 'cbvm-intothebreach';
    },
    bitmapInfo: function () {
      return "Artwork from [Into The Breach](https://subsetgames.com/itb.html), 2018\n\nArtist: Jay Ma";
    },
    artist: {
      name: {
        first: 'Jay',
        last: 'Ma'
      }
    },
    artwork: {
      title: 'Rift Walkers Combat Mech',
      completionDate: {
        year: 2017
      }
    }
  },
  CBVMHydorah: {
    dimensions: function () {
      return {
        width: 23,
        height: 8
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#000');
    },
    imageName: function () {
      return 'cbvm-hydorah';
    },
    bitmapInfo: function () {
      return "Artwork from [Hydorah](https://www.locomalito.com/hydorah.php), 2010\n\nArtist: Locomalito";
    },
    artist: {
      name: {
        first: 'Juan',
        middle: 'Antonio',
        last: 'Becerra'
      },
      pseudonym: 'Locomalito'
    },
    artwork: {
      title: 'Spaceship',
      completionDate: {
        year: 2010
      }
    }
  },
  CBOMVirtuaVerse: {
    dimensions: function () {
      return {
        width: 31,
        height: 23
      };
    },
    imageName: function () {
      return 'cbom-virtuaverse';
    },
    bitmapInfo: function () {
      return "Artwork from [VirtuaVerse](https://www.facebook.com/virtuaversegame), 2020\n\nArtist: Ra 'Valenberg' Mei";
    },
    artist: {
      name: {
        first: 'Ra',
        last: 'Mei',
        nickname: 'Valenberg'
      }
    },
    artwork: {
      title: 'Pizza Amore',
      completionDate: {
        year: 2017
      }
    }
  },
  CBOMThimbleweedPark: {
    dimensions: function () {
      return {
        width: 32,
        height: 18
      };
    },
    backgroundColor: function () {
      return new THREE.Color('#001e51');
    },
    imageName: function () {
      return 'cbom-thimbleweedpark';
    },
    bitmapInfo: function () {
      return "Artwork from [Thimbleweed Park](https://thimbleweedpark.com), 2017\n\nArtist: Gary Winnick";
    },
    artist: {
      name: {
        first: 'Gary',
        last: 'Winnick'
      }
    },
    artwork: {
      title: 'Balloon animal',
      completionDate: {
        year: 2014
      }
    }
  }
};
for (assetId in assets) {
  asset = assets[assetId];
  (function (assetId, asset) {
    CopyReference[assetId] = function () {
      var _Class;
      _Class = class extends CopyReference {
        static id() {
          return "PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.".concat(assetId);
        }
      };
      _Class.fixedDimensions = asset.dimensions;
      _Class.backgroundColor = asset.backgroundColor || function () {
        return null;
      };

      // Note: we don't override restrictedPaletteName since we expect the function to exist.
      _Class.restrictedPaletteName = asset.restrictedPaletteName || function () {
        return null;
      };
      _Class.imageName = asset.imageName;
      _Class.bitmapInfo = asset.bitmapInfo;
      _Class.initialize();
      return _Class;
    }.call(this);
    PAA.Challenges.Drawing.PixelArtSoftware.copyReferenceClasses[assetId] = CopyReference[assetId];
    // On the server also create PADB entries.
    if (Meteor.isServer) {
      return Document.startup(() => {
        var artwork, referenceUrl;
        referenceUrl = "/pixelartacademy/challenges/drawing/pixelartsoftware/".concat(asset.imageName(), "-reference.png");
        if (!PADB.Artwork.forUrl.query(referenceUrl).count()) {
          artwork = _.extend({}, asset.artwork, {
            type: PADB.Artwork.Types.Image,
            image: {
              url: "/pixelartacademy/challenges/drawing/pixelartsoftware/".concat(asset.imageName(), ".png")
            },
            representations: [{
              type: PADB.Artwork.RepresentationTypes.Image,
              url: referenceUrl
            }]
          });
          return PADB.create({
            artist: asset.artist,
            artworks: [artwork]
          });
        }
      });
    }
  })(assetId, asset);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"briefcomponent":{"briefcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/briefcomponent/briefcomponent.coffee        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AM, LOI, PAA;
AC = Artificial.Control;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtSoftware.CopyReference.BriefComponent = function () {
  class BriefComponent extends PAA.Practice.Project.Asset.Bitmap.BriefComponent {
    canEdit() {
      return PAA.PixelPad.Apps.Drawing.state('editorId') != null;
    }
    canUpload() {
      return PAA.PixelPad.Apps.Drawing.state('externalSoftware') != null;
    }
    processUploadData(imageData) {
      var backgroundColor, bitmapData, editor, palette, pixelDrawDelay, pixels, replacePixel, scaleBitmap, updateBitmap;
      // Put the bitmap into upload mode.
      this.bitmap.uploadMode(true);
      // Clone current bitmap data so we can manipulate it directly.
      editor = this.parent.drawing.editor();
      bitmapData = _.cloneDeep(this.bitmap.bitmap());
      editor.manualBitmapData(bitmapData);
      this.bitmap.manualUserBitmapData(bitmapData);
      this.bitmap.hintsEngineComponents.overlaid.displayColorHelpUpToPixelCoordinates({
        x: -1,
        y: -1
      });
      // Open the editor and zoom in the bitmap as much as possible.
      editor.manuallyActivated(true);
      scaleBitmap = () => {
        var borderWidth, clipboardBitmapSize, heightScale, imageHeight, imageWidth, maxHeight, maxScale, maxWidth, pixelCanvas, scale, viewport, widthScale;
        scale = LOI.adventure.interface.display.scale();
        viewport = LOI.adventure.interface.display.viewport();
        clipboardBitmapSize = this.parent.assetSize();
        borderWidth = clipboardBitmapSize.borderWidth / clipboardBitmapSize.scale;
        maxWidth = viewport.viewportBounds.width() * 0.9;
        maxHeight = viewport.viewportBounds.height() * 0.9;
        imageWidth = imageData.width + 2 * borderWidth;
        imageHeight = imageData.height + 2 * borderWidth;
        widthScale = maxWidth / imageWidth / scale;
        heightScale = maxHeight / imageHeight / scale;
        maxScale = Math.min(widthScale, heightScale);
        scale = Math.floor(maxScale);
        pixelCanvas = editor.interface.getEditorForActiveFile();
        return pixelCanvas.camera().setScale(scale);
      };
      // Draw all pixels in 3 seconds.
      pixelDrawDelay = 3000 / (imageData.width * imageData.height);
      // Prepare colors.
      palette = bitmapData.customPalette || LOI.Assets.Palette.documents.findOne(bitmapData.palette._id);
      // See if we have a background color defined.
      backgroundColor = this.bitmap.constructor.backgroundColor();
      if (backgroundColor != null ? backgroundColor.paletteColor : void 0) {
        // Map palette color to a direct color so we can calculate distance to it.
        backgroundColor = palette.ramps[backgroundColor.paletteColor.ramp].shades[backgroundColor.paletteColor.shade];
      }
      // Create target pixels.
      pixels = this._createPixels(imageData, palette, backgroundColor);
      replacePixel = (x, y) => {
        var existingPixelIndex, newPixel;
        existingPixelIndex = _.findIndex(bitmapData.layers[0].pixels, pixel => {
          return pixel.x === x && pixel.y === y;
        });
        newPixel = _.find(pixels, pixel => {
          return pixel.x === x && pixel.y === y;
        });
        if (newPixel) {
          // This is a full pixel so color it.
          if (existingPixelIndex > -1) {
            // Replace data in existing pixel.
            bitmapData.layers[0].pixels[existingPixelIndex] = newPixel;
          } else {
            // Add new pixel.
            bitmapData.layers[0].pixels.push(newPixel);
          }
        } else if (existingPixelIndex > -1) {
          // This should be an empty pixel so remove it.
          bitmapData.layers[0].pixels.splice(existingPixelIndex, 1);
        }
        // Re-set bitmap data to force image refresh.
        editor.manualBitmapData(bitmapData);
        this.bitmap.manualUserBitmapData(bitmapData);
        this.bitmap.hintsEngineComponents.overlaid.displayColorHelpUpToPixelCoordinates({
          x,
          y
        });
        // Move to next pixel.
        x++;
        if (x === imageData.width) {
          x = 0;
          y++;
          if (y === imageData.height) {
            // We have reached the end.
            updateBitmap();
            return;
          }
        }
        return Meteor.setTimeout(() => {
          return replacePixel(x, y);
        }, pixelDrawDelay);
      };
      updateBitmap = () => {
        return LOI.Assets.Bitmap.replacePixels(this.bitmap.bitmapId(), 0, bitmapData.layers[0].pixels, error => {
          var asset, assets, bitmapId;
          if (error) {
            console.error(error);
            return;
          }
          editor.manualBitmapData(null);
          this.bitmap.manualUserBitmapData(null);
          // Mark this asset as uploaded.
          assets = this.bitmap.tutorial.state('assets');
          bitmapId = this.bitmap.id();
          if (!assets) {
            assets = [];
          }
          asset = _.find(assets, asset => {
            return asset.id === bitmapId;
          });
          if (!asset) {
            asset = {
              id: this.id()
            };
            assets.push(asset);
          }
          asset.uploaded = true;
          return this.bitmap.tutorial.state('assets', assets);
        });
      };
      return Meteor.setTimeout(() => {
        scaleBitmap();
        return Meteor.setTimeout(() => {
          return replacePixel(0, 0);
        }, 500);
      }, 1000);
    }
    onClickEditButton(event) {
      // Make sure bitmap is not in upload mode.
      this.bitmap.uploadMode(false);
      // Show hints for all pixels.
      this.bitmap.hintsEngineComponents.overlaid.displayColorHelpUpToPixelCoordinates(null);
      return super.onClickEditButton(...arguments);
    }
  }
  ;
  BriefComponent.register('PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.BriefComponent');
  return BriefComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.briefcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/briefcomponent/template.briefcomponent.js   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.BriefComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.BriefComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.BriefComponent", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.call(view.lookup("bitmap"));
  }, function() {
    return [ "\n    ", HTML.UL({
      class: "properties"
    }, "\n      ", HTML.LI({
      class: "property fixed-dimensions"
    }, HTML.Raw('\n        <span class="property-name">尺寸</span>:\n        '), Blaze.View("lookup:fixedDimensions.width", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("fixedDimensions"), "width"));
    }), "×", Blaze.View("lookup:fixedDimensions.height", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("fixedDimensions"), "height"));
    }), "\n      "), "\n      ", HTML.LI({
      class: "property restricted-palette"
    }, HTML.Raw('\n        <span class="property-name">调色板</span>:\n        '), Blaze.If(function() {
      return Spacebars.call(view.lookup("restrictedPalette"));
    }, function() {
      return [ "\n          ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("palette"), "lospecSlug"));
      }, function() {
        return [ "\n            ", HTML.A({
          href: function() {
            return [ "https://lospec.com/palette-list/", Spacebars.mustache(Spacebars.dot(view.lookup("palette"), "lospecSlug")) ];
          },
          target: "_blank"
        }, Blaze.View("lookup:restrictedPalette.name", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("restrictedPalette"), "name"));
        })), "\n          " ];
      }, function() {
        return [ "\n            ", Blaze.View("lookup:restrictedPalette.name", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("restrictedPalette"), "name"));
        }), "\n          " ];
      }), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("customPalette"));
    }, function() {
      return [ "\n          Custom, ", Blaze.View("lookup:customPaletteColorsString", function() {
        return Spacebars.mustache(view.lookup("customPaletteColorsString"));
      }), "\n        " ];
    }), "\n      "), "\n    "), "\n    ", HTML.UL({
      class: "actions"
    }, "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canEdit"));
    }, function() {
      return HTML.Raw('\n        <li class="action">\n          <button class="button edit-button">编辑</button>\n        </li>\n      ');
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canUpload"));
    }, function() {
      return HTML.Raw('\n        <li class="action">\n          <button class="button assets-button">素材</button>\n        </li>\n        <li class="action">\n          <button class="button upload-button">上传</button>\n        </li>\n      ');
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"clipboardsecondpagecomponent":{"clipboardsecondpagecomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/clipboardsecondpagecomponent/clipboardsecon //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtSoftware.CopyReference.ClipboardSecondPageComponent = function () {
  class ClipboardSecondPageComponent extends AM.Component {
    constructor(copyReference) {
      super(...arguments);
      this.copyReference = copyReference;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.parent = this.ancestorComponentWith('closeSecondPage');
      this.autorun(computation => {
        var palette, ref;
        if (!(palette = (ref = this.copyReference.bitmap()) != null ? ref.palette : void 0)) {
          return;
        }
        return LOI.Assets.Palette.forId.subscribeContent(this, palette._id);
      });
      return this.palette = new ComputedField(() => {
        var palette, ref;
        if (!(palette = (ref = this.copyReference.bitmap()) != null ? ref.palette : void 0)) {
          return;
        }
        return LOI.Assets.Palette.documents.findOne(palette._id);
      });
    }
    templateStyle() {
      var bottomMargin, dimensions, maxHeightScale, maxWidthScale, scale;
      dimensions = this.copyReference.constructor.fixedDimensions();
      // Max width is 90 rem, max height is 60 rem.
      maxWidthScale = 90 / dimensions.width;
      maxHeightScale = 60 / dimensions.height;
      scale = Math.min(maxWidthScale, maxHeightScale);
      // Fill the rest of the height with a margin.
      bottomMargin = 60 - dimensions.height * scale;
      return {
        width: "".concat(dimensions.width * scale, "rem"),
        height: "".concat(dimensions.height * scale, "rem"),
        marginBottom: "".concat(bottomMargin, "rem")
      };
    }
  }
  ;
  ClipboardSecondPageComponent.register('PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.ClipboardSecondPageComponent');
  return ClipboardSecondPageComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.clipboardsecondpagecomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/clipboardsecondpagecomponent/template.clipb //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.ClipboardSecondPageComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.ClipboardSecondPageComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.ClipboardSecondPageComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-challenges-drawing-pixelartsoftware-copyreference-clipboardsecondpagecomponent"
  }, "\n    ", HTML.DIV({
    class: "content"
  }, "\n      ", HTML.DIV({
    class: "template-area"
  }, HTML.Raw("\n        <h2>Template</h2>\n        "), HTML.A(HTML.Attrs({
    class: "template asset",
    href: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("copyReference"), "templateUrl"));
    },
    download: "template.png"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("templateStyle"));
  }), "\n          ", HTML.IMG({
    class: "image",
    src: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("copyReference"), "templateUrl"));
    }
  }), "\n        "), HTML.Raw("\n        <p>The template matches the size of the bitmap and includes all the required colors.</p>\n      ")), "\n      ", HTML.DIV({
    class: "reference-area"
  }, HTML.Raw("\n        <h2>Reference</h2>\n        "), HTML.A({
    class: "reference asset",
    href: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("copyReference"), "referenceUrl"));
    },
    download: "reference.png"
  }, "\n          ", HTML.IMG({
    class: "image",
    src: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("copyReference"), "referenceUrl"));
    }
  }), "\n        "), HTML.Raw("\n        <p>Reference card of the bitmap to be drawn.</p>\n      ")), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"referenceselection":{"referenceselection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/referenceselection.coffe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Babel;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection = function () {
  class ReferenceSelection extends PAA.Challenges.Drawing.ReferenceSelection {
    static id() {
      return "PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection";
    }
    static displayName() {
      return "Choose a sprite to copy";
    }
    static description() {
      return "为确保你准备好完成像素画绘画任务，这个挑战要求你复制一个现有的游戏精灵。";
    }
    static portfolioComponentClass() {
      return this.PortfolioComponent;
    }
    static customComponentClass() {
      return this.CustomComponent;
    }
    urlParameter() {
      return 'select-pixel-art-software-reference';
    }
    width() {
      return 31;
    }
    height() {
      return 48;
    }
  }
  ;
  ReferenceSelection.initialize();
  return ReferenceSelection;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/portfoliocomponent/portf //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {}
  ;
  PortfolioComponent.register('PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/portfoliocomponent/templ //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.PortfolioComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.PortfolioComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.PortfolioComponent", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-challenges-drawing-pixelartsoftware-referenceselection-portfoliocomponent"></div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"customcomponent":{"customcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/customcomponent/customco //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AEc,
  AM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.CustomComponent = function () {
  class CustomComponent extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.CustomComponent';
    }
    onCreated() {
      var cards, copyReferenceClass, id;
      super.onCreated(...arguments);
      this.cardsVisible = new ReactiveField(false);
      this._wasActive = false;
      this.active = new ReactiveField(false);
      this.drawingApp = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);

      // Create all the cards
      cards = function () {
        var ref, results;
        ref = PAA.Challenges.Drawing.PixelArtSoftware.copyReferenceClasses;
        results = [];
        for (id in ref) {
          copyReferenceClass = ref[id];
          results.push(new this.constructor.Card(id, copyReferenceClass));
        }
        return results;
      }.call(this);
      this.cards = new ReactiveField(cards);
      this.leftChoiceCards = new ReactiveField([]);
      this.rightChoiceCards = new ReactiveField([]);
      this.selectedCard = new ReactiveField(null);
      this.selectedCardRevealed = new ReactiveField(false);
      this.currentChoice = new ReactiveField(null);
      this.finalSelection = new ReactiveField(false);
      this.selectionFinished = new ReactiveField(false);
      return this._timeouts = [];
    }
    onRendered() {
      super.onRendered(...arguments);
      this.autorun(computation => {
        var active;
        active = this.drawingApp.activeAsset() != null;
        return Meteor.setTimeout(() => {
          return this.active(active);
        }, 0);
      });
      return this.autorun(computation => {
        var i, len, ref, shouldBeActive, timeout;
        shouldBeActive = this.active();
        if (shouldBeActive && !this._wasActive) {
          this.cardsVisible(shouldBeActive);
          Tracker.afterFlush(() => {
            this._initialize();
            return this.cardsVisible(shouldBeActive);
          });
        } else if (this._wasActive && !shouldBeActive) {
          this._moveOut();
          ref = this._timeouts;
          for (i = 0, len = ref.length; i < len; i++) {
            timeout = ref[i];
            Meteor.clearTimeout(timeout);
          }
          Meteor.setTimeout(() => {
            this.cardsVisible(shouldBeActive);
            this.audio.dealingCenter(false);
            this.audio.dealingLeft(false);
            return this.audio.dealingRight(false);
          }, 1000);
        }
        return this._wasActive = shouldBeActive;
      });
    }
    setPixelPadSize(drawingApp) {
      return drawingApp.setMaximumPixelPadSize({
        fullscreen: true
      });
    }
    onBackButton() {
      if (!this.selectedCard()) {
        return;
      }
      this._goToSelectedCard();

      // Inform that we've handled the back button.
      return true;
    }
    _initialize() {
      var card, cardThickness, cards, copyReferenceClass, i, index, len, ref, remainingReferenceClassIds;
      this.currentChoice(null);
      this.finalSelection(false);
      this.selectedCard(null);
      this.selectedCardRevealed(false);
      this.selectionFinished(false);
      this.choices = [];
      this._timeouts = [];
      this.nextChoice = this.constructor.Choices.MonochromeColor;
      remainingReferenceClassIds = function () {
        var i, len, ref, results;
        ref = PAA.Challenges.Drawing.PixelArtSoftware.remainingCopyReferenceClasses();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          copyReferenceClass = ref[i];
          results.push(copyReferenceClass.id());
        }
        return results;
      }();
      cards = this.cards();
      this.remainingCards = _.shuffle(_.filter(cards, card => {
        var ref;
        return ref = card.copyReferenceClass.id(), indexOf.call(remainingReferenceClassIds, ref) >= 0;
      }));
      cardThickness = this.constructor.cardThickness;
      for (index = i = 0, len = cards.length; i < len; index = ++i) {
        card = cards[index];
        if (ref = card.copyReferenceClass.id(), indexOf.call(remainingReferenceClassIds, ref) >= 0) {
          // Remaining cards get shuffled from the bottom-right.
          card.setPosition(this.constructor.boundary.x, this.constructor.boundary.y, this.remainingCards.length * cardThickness);
        } else {
          // Move cards that were already added to the top so they don't appear in closing transitions.
          card.setPosition(0, -this.constructor.boundary.y, 0);
        }
      }
      return Tracker.afterFlush(() => {
        var delay, j, len1, ref1;
        // Bring the cards in faster and faster.
        delay = 1000;
        this._timeouts.push(Meteor.setTimeout(() => {
          return this.audio.dealingCenter(true);
        }, delay + this.constructor.cardTransitionDelay));
        ref1 = this.remainingCards;
        for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
          card = ref1[index];
          ((card, index) => {
            this._timeouts.push(Meteor.setTimeout(() => {
              return card.setPosition(0, 0, index * cardThickness);
            }, delay));
            return delay += Math.max(50, this._gradualDelay(index));
          })(card, index);
        }
        this._timeouts.push(Meteor.setTimeout(() => {
          return this.audio.dealingCenter(false);
        }, delay + this.constructor.cardTransitionDelay));
        delay += 200;
        return this._timeouts.push(Meteor.setTimeout(() => {
          return this._presentChoice();
        }, delay));
      });
    }
    _presentChoice() {
      var card, cardSlideOffDeckDelay, cardThickness, cardsMoved, choice, choiceSide, delay, firstLeftCardDelay, firstRightCardDelay, i, lastLeftCardDelay, lastRightCardDelay, leftCards, ref, rightCards, sign, stackCount, stackOffset, stackPosition;
      // Do we even need to make a choice?
      if (this.remainingCards.length === 1) {
        // Automatically choose the card.
        this._revealSelectedCard();
        return;
      }
      while (true) {
        // Does this choice have cards on both sides?
        choice = this.nextChoice;
        leftCards = _.filter(this.remainingCards, card => {
          return choice.left.filter(card.id);
        });
        rightCards = _.filter(this.remainingCards, card => {
          return choice.right.filter(card.id);
        });
        if (leftCards.length && rightCards.length) {
          // Everything is OK if both stacks have some cards.
          break;
        }

        // Automatically move to the next choice.
        choiceSide = choice[leftCards.length ? 'left' : 'right'];
        if (choiceSide.locked && choiceSide.locked()) {
          // We should still show the choice if the only side is locked.
          break;
        }
        if (choiceSide.nextChoiceKey) {
          this.nextChoice = this.constructor.Choices[choiceSide.nextChoiceKey];
        } else {
          // No choices are left, but the final one.
          this._presentFinalSelection();
          return;
        }
      }
      this.leftChoiceCards(leftCards);
      this.rightChoiceCards(rightCards);

      // Separate the cards based on the choice filter.
      cardThickness = this.constructor.cardThickness;
      stackOffset = this.constructor.stackOffset;
      delay = 500;
      stackCount = {};
      stackCount[-1] = 0;
      stackCount[1] = 0;
      cardsMoved = 0;
      firstLeftCardDelay = null;
      firstRightCardDelay = null;
      lastLeftCardDelay = null;
      lastRightCardDelay = null;
      ref = this.remainingCards;
      for (i = ref.length - 1; i >= 0; i += -1) {
        card = ref[i];
        sign = 0;
        if (choice.left.filter(card.id)) {
          sign = -1;
        }
        if (choice.right.filter(card.id)) {
          sign = 1;
        }
        if (sign) {
          if (sign < 0) {
            if (firstLeftCardDelay == null) {
              firstLeftCardDelay = delay;
            }
            lastLeftCardDelay = delay;
          } else {
            if (firstRightCardDelay == null) {
              firstRightCardDelay = delay;
            }
            lastRightCardDelay = delay;
          }
          stackPosition = stackCount[sign];
          ((card, sign, stackPosition) => {
            return this._timeouts.push(Meteor.setTimeout(() => {
              return card.setPosition(stackOffset * sign, 0, stackPosition * cardThickness);
            }, delay));
          })(card, sign, stackPosition);
          delay += this._gradualDelay(cardsMoved);
          cardsMoved++;
          stackCount[sign]++;
        }
      }

      // We start shuffle sound earlier to simulate the noise of the card sliding off the deck.
      cardSlideOffDeckDelay = this.constructor.cardTransitionDelay / 2;
      if (firstLeftCardDelay) {
        this._timeouts.push(Meteor.setTimeout(() => {
          return this.audio.dealingLeft(true);
        }, firstLeftCardDelay + cardSlideOffDeckDelay));
        this._timeouts.push(Meteor.setTimeout(() => {
          return this.audio.dealingLeft(false);
        }, lastLeftCardDelay + this.constructor.cardTransitionDelay));
      }
      if (firstRightCardDelay) {
        this._timeouts.push(Meteor.setTimeout(() => {
          return this.audio.dealingRight(true);
        }, firstRightCardDelay + cardSlideOffDeckDelay));
        this._timeouts.push(Meteor.setTimeout(() => {
          return this.audio.dealingRight(false);
        }, lastRightCardDelay + this.constructor.cardTransitionDelay));
      }
      return this._timeouts.push(Meteor.setTimeout(() => {
        return this.currentChoice(choice);
      }, delay));
    }
    _presentFinalSelection() {
      var card, cardAreaWidth, i, index, ref;
      cardAreaWidth = 320 / this.remainingCards.length;
      ref = this.remainingCards;
      for (index = i = ref.length - 1; i >= 0; index = i += -1) {
        card = ref[index];
        card.setPosition(-160 + cardAreaWidth * (index + 0.5), 0, 0);
      }
      return this._timeouts.push(Meteor.setTimeout(() => {
        return this.finalSelection(true);
      }, 600));
    }
    _moveOut() {
      var card, cards, i, index, len, results;
      this.currentChoice(null);
      cards = this.cards();
      results = [];
      for (index = i = 0, len = cards.length; i < len; index = ++i) {
        card = cards[index];
        results.push(card.setPosition(0, -this.constructor.boundary.y, 10));
      }
      return results;
    }
    _gradualDelay(index) {
      return Math.pow(index + 1, -0.7) * 250;
    }
    _makeChoice(madeChoice) {
      var card, choice, i, len, newRemainingCards, nextChoiceKey, ref;
      choice = this.currentChoice();
      if (choice[madeChoice].locked) {
        if (choice[madeChoice].locked()) {
          return;
        }
      }
      this.currentChoice(null);
      this.audio.chooseSideFactor(madeChoice === 'left' ? -1 : 1);
      nextChoiceKey = choice[madeChoice].nextChoiceKey;
      // Move chosen cards to the center.
      newRemainingCards = [];
      ref = this.remainingCards;
      for (i = 0, len = ref.length; i < len; i++) {
        card = ref[i];
        if (choice[madeChoice].filter(card.id)) {
          card.setPosition(0);
          newRemainingCards.unshift(card);
        } else {
          card.setPosition(this.constructor.boundary.x * Math.sign(card.position.x));
        }
      }
      this.remainingCards = newRemainingCards;
      this._timeouts.push(Meteor.setTimeout(() => {
        if (this.remainingCards.length === 1) {
          // Automatically choose the card.
          return this._revealSelectedCard();
        } else {
          if (nextChoiceKey) {
            this.nextChoice = this.constructor.Choices[nextChoiceKey];
            return this._presentChoice();
          } else {
            // Present the final selection.
            return this._presentFinalSelection();
          }
        }
      }, this.remainingCards.length === 1 ? 600 : 200));
      if (this.remainingCards.length > 1) {
        // Slide the deck if there will be another choice after this.
        return this.audio.chooseSide();
      }
    }
    _makeFinalSelection(selection) {
      this.finalSelection(false);
      Tracker.afterFlush(() => {
        var card, i, len, ref, results;
        ref = this.remainingCards;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          card = ref[i];
          if (card === selection) {
            card.setPosition(0, 0, 1);
            results.push(this.remainingCards = [card]);
          } else {
            results.push(card.setPosition(0, -this.constructor.boundary.y, 0));
          }
        }
        return results;
      });
      return this._timeouts.push(Meteor.setTimeout(() => {
        return this._revealSelectedCard();
      }, 600));
    }
    _revealSelectedCard() {
      var selectedCard;
      this.audio.chooseCard();
      selectedCard = this.remainingCards[0];
      this.selectedCard(selectedCard);
      selectedCard.setPosition(0, 20, 20);
      return Tracker.afterFlush(() => {
        this.selectedCardRevealed(true);

        // Add the card to assets.
        PAA.Challenges.Drawing.PixelArtSoftware.addCopyReferenceAsset(selectedCard.id);
        return this._timeouts.push(Meteor.setTimeout(() => {
          return this.selectionFinished(true);
        }, 600));
      });
    }
    _goToSelectedCard() {
      var selectedCardId;
      selectedCardId = this.selectedCard().id;

      // Find out the asset ID.
      return Tracker.autorun(computation => {
        var assets, bitmapId, selectedAsset;
        if (!(assets = PAA.Challenges.Drawing.PixelArtSoftware.state('assets'))) {
          return;
        }
        if (!(selectedAsset = _.find(assets, function (asset) {
          return asset.id === "PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.CopyReference.".concat(selectedCardId);
        }))) {
          return;
        }
        if (!(bitmapId = selectedAsset.bitmapId)) {
          return;
        }
        computation.stop();
        return AB.Router.changeParameters({
          parameter3: bitmapId,
          parameter4: 'edit'
        });
      });
    }
    leftAvailableClass() {
      var base;
      if (this.leftChoiceCards().length && !(typeof (base = this.currentChoice().left).locked === "function" ? base.locked() : void 0)) {
        return 'available';
      }
    }
    rightAvailableClass() {
      var base;
      if (this.rightChoiceCards().length && !(typeof (base = this.currentChoice().right).locked === "function" ? base.locked() : void 0)) {
        return 'available';
      }
    }
    leftLockedClass() {
      var base;
      if (typeof (base = this.currentChoice().left).locked === "function" ? base.locked() : void 0) {
        return 'locked';
      }
    }
    rightLockedClass() {
      var base;
      if (typeof (base = this.currentChoice().right).locked === "function" ? base.locked() : void 0) {
        return 'locked';
      }
    }
    activeClass() {
      if (this.active()) {
        return 'active';
      }
    }
    finalSelectionClass() {
      if (this.finalSelection()) {
        return 'final-selection';
      }
    }
    selectionFinishedClass() {
      if (this.selectionFinished()) {
        return 'selection-finished';
      }
    }
    revealedClass() {
      var card;
      card = this.currentData();
      if (card === this.selectedCard() && this.selectedCardRevealed()) {
        return 'revealed';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .left.available.choice': this.onClickLeftAvailableChoice,
        'click .right.available.choice': this.onClickRightAvailableChoice,
        'click .card': this.onClickCard
      });
    }
    onClickLeftAvailableChoice(event) {
      return this._makeChoice('left');
    }
    onClickRightAvailableChoice(event) {
      return this._makeChoice('right');
    }
    onClickCard(event) {
      if (this.finalSelection()) {
        return this._makeFinalSelection(this.currentData());
      } else if (this.selectionFinished()) {
        return this._goToSelectedCard();
      }
    }
  }
  ;
  CustomComponent.register(CustomComponent.id());
  CustomComponent.cardSize = {
    width: 75,
    height: 113
  };
  CustomComponent.cardThickness = 0.5;
  CustomComponent.stackOffset = 85;
  CustomComponent.maxShadowWidth = 50;
  CustomComponent.boundary = {
    x: (480 + CustomComponent.cardSize.width) / 2 + CustomComponent.maxShadowWidth,
    y: (360 + CustomComponent.cardSize.height) / 2
  };

  // Audio needs to be delayed to accommodate card transition duration.
  CustomComponent.cardTransitionDuration = 0.6;
  CustomComponent.cardTransitionDelay = CustomComponent.cardTransitionDuration * 1000 - 50;
  CustomComponent.Choices = {
    MonochromeColor: {
      prompt: "单色还是多色？",
      left: {
        name: "单色",
        filter: function (id) {
          return id[0] === 'M';
        },
        nextChoiceKey: 'SmallBig'
      },
      right: {
        name: "多色",
        filter: function (id) {
          return id[0] === 'C';
        },
        nextChoiceKey: 'SmallBig',
        locked: function () {
          return !PAA.Tutorials.Drawing.PixelArtTools.Colors.completed();
        },
        unlockInstructions: function () {
          return "完成颜色教程以解锁彩色精灵。";
        }
      }
    },
    SmallBig: {
      prompt: "大还是小？",
      left: {
        name: "小",
        filter: function (id) {
          return id[1] === 'S';
        },
        nextChoiceKey: 'CharacterThing'
      },
      right: {
        name: "大",
        filter: function (id) {
          return id[1] === 'B';
        },
        nextChoiceKey: 'CharacterThing',
        locked: function () {
          return !PAA.Tutorials.Drawing.PixelArtTools.Helpers.completed();
        },
        unlockInstructions: function () {
          return "完成辅助工具教程以解锁大尺寸精灵。";
        }
      }
    },
    CharacterThing: {
      prompt: "你想画什么？",
      left: {
        name: "角色",
        filter: function (id) {
          var ref;
          return (ref = id[2]) === 'H' || ref === 'E';
        },
        nextChoiceKey: 'HeroEnemy'
      },
      right: {
        name: "其他东西",
        filter: function (id) {
          var ref;
          return (ref = id[2]) === 'V' || ref === 'O';
        },
        nextChoiceKey: 'VehicleOtherObject'
      }
    },
    HeroEnemy: {
      prompt: "好人还是坏人？",
      left: {
        name: "英雄",
        filter: function (id) {
          return id[2] === 'H';
        }
      },
      right: {
        name: "敌人",
        filter: function (id) {
          return id[2] === 'E';
        }
      }
    },
    VehicleOtherObject: {
      prompt: "载具还是其他物体？",
      left: {
        name: "载具",
        filter: function (id) {
          return id[2] === 'V';
        }
      },
      right: {
        name: "其他",
        filter: function (id) {
          return id[2] === 'O';
        }
      }
    }
  };
  CustomComponent.Audio = new LOI.Assets.Audio.Namespace(CustomComponent.id(), {
    variables: {
      dealingCenter: AEc.ValueTypes.Boolean,
      dealingLeft: AEc.ValueTypes.Boolean,
      dealingRight: AEc.ValueTypes.Boolean,
      dealOneLeft: AEc.ValueTypes.Trigger,
      dealOneRight: AEc.ValueTypes.Trigger,
      chooseSideFactor: AEc.ValueTypes.Number,
      chooseSide: AEc.ValueTypes.Trigger,
      chooseCard: AEc.ValueTypes.Trigger
    }
  });
  return CustomComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.customcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/customcomponent/template //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.CustomComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.CustomComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.CustomComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-challenges-drawing-pixelartsoftware-referenceselection-customcomponent ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("finalSelectionClass")), " ", Spacebars.mustache(view.lookup("selectionFinishedClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("cardsVisible"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "origin"
    }, "\n        ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("currentChoice"));
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: "prompt"
      }, Blaze.View("lookup:prompt", function() {
        return Spacebars.mustache(view.lookup("prompt"));
      })), "\n          ", HTML.DIV({
        class: function() {
          return [ "choice left ", Spacebars.mustache(view.lookup("leftAvailableClass")), " ", Spacebars.mustache(view.lookup("leftLockedClass")) ];
        }
      }, "\n            ", HTML.DIV({
        class: "name"
      }, Blaze.View("lookup:left.name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("left"), "name"));
      })), "\n          "), "\n          ", HTML.DIV({
        class: function() {
          return [ "choice right ", Spacebars.mustache(view.lookup("rightAvailableClass")), " ", Spacebars.mustache(view.lookup("rightLockedClass")) ];
        }
      }, "\n            ", HTML.DIV({
        class: "unlock-instructions"
      }, Blaze.View("lookup:right.unlockInstructions", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("right"), "unlockInstructions"));
      })), "\n            ", HTML.DIV({
        class: "name"
      }, Blaze.View("lookup:right.name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("right"), "name"));
      })), "\n          "), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("finalSelection"));
    }, function() {
      return HTML.Raw('\n          <div class="prompt">选择一张卡片</div>\n        ');
    }), "\n        ", HTML.UL({
      class: "cards"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("cards"));
    }, function() {
      return [ "\n            ", HTML.LI(HTML.Attrs({
        class: function() {
          return [ "card ", Spacebars.mustache(view.lookup("evenYClass")), " ", Spacebars.mustache(view.lookup("revealedClass")) ];
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("cardStyle"));
      }), "\n              ", HTML.IMG(HTML.Attrs({
        class: "reference",
        src: function() {
          return Spacebars.mustache(view.lookup("referenceUrl"));
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("referenceStyle"));
      })), "\n              ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("$is"), view.lookup("."), view.lookup("selectedCard"));
      }, function() {
        return [ "\n                ", HTML.IMG({
          class: "front",
          src: function() {
            return Spacebars.mustache(view.lookup("frontUrl"));
          }
        }), "\n              " ];
      }), "\n            "), "\n          " ];
    }), "\n        "), "\n        ", HTML.UL({
      class: "card-shadows"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("cards"));
    }, function() {
      return [ "\n            ", HTML.LI(HTML.Attrs({
        class: function() {
          return [ "card ", Spacebars.mustache(view.lookup("revealedClass")) ];
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("shadowStyle"));
      })), "\n          " ];
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"card.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/customcomponent/card.cof //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var CustomComponent, PAA;
PAA = PixelArtAcademy;
CustomComponent = PAA.Challenges.Drawing.PixelArtSoftware.ReferenceSelection.CustomComponent;
CustomComponent.Card = function () {
  class Card {
    constructor(id, copyReferenceClass) {
      this.id = id;
      this.copyReferenceClass = copyReferenceClass;
      this.position = new THREE.Vector3();
      this._updatedDependency = new Tracker.Dependency();
    }
    setPosition(x) {
      let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position.y;
      let z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.position.z;
      this.position.set(x, y, z);
      return this._updatedDependency.changed();
    }
    reveal() {
      return this.revealed(true);
    }
    cardStyle() {
      var displayPosition;
      this._updatedDependency.depend();
      displayPosition = this._displayPosition();
      return {
        left: "".concat(displayPosition.left, "rem"),
        top: "".concat(displayPosition.top, "rem"),
        zIndex: Math.floor(this.position.z / this.constructor.thickness)
      };
    }
    _displayPosition() {
      var size;
      size = this.constructor.size;
      return {
        left: Math.floor(this.position.x - size.width / 2),
        top: Math.floor(this.position.y - this.position.z - size.height / 2)
      };
    }
    shadowStyle() {
      var shadowDirection, size;
      this._updatedDependency.depend();
      size = this.constructor.size;
      shadowDirection = this.constructor.shadowDirection;
      return {
        left: "".concat(Math.floor(this.position.x + shadowDirection.x * this.position.z - size.width / 2 - 1), "rem"),
        top: "".concat(Math.floor(this.position.y + shadowDirection.y * this.position.z - size.height / 2), "rem")
      };
    }
    referenceStyle() {
      var dimensions, size;
      size = this.constructor.size;
      dimensions = this.copyReferenceClass.fixedDimensions();
      return {
        left: "".concat(Math.floor((size.width - dimensions.width) / 2), "rem"),
        top: "".concat(Math.floor((size.height - dimensions.height) / 2), "rem"),
        width: "".concat(dimensions.width, "rem"),
        height: "".concat(dimensions.height, "rem")
      };
    }
    referenceUrl() {
      return this.copyReferenceClass.goalImageUrl();
    }
    frontUrl() {
      return this.copyReferenceClass.references()[0].image.url;
    }
    evenYClass() {
      if (this._displayPosition().top % 2 === 0) {
        return 'even-y';
      }
    }
  }
  ;
  Card.size = CustomComponent.cardSize;
  Card.thickness = CustomComponent.cardThickness;
  Card.shadowDirection = {
    x: -4,
    y: 0.4
  };
  return Card;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"pixelartlineart":{"pixelartlineart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/pixelartlineart.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  LOI,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtLineArt = function () {
  class PixelArtLineArt extends PAA.Practice.Project.Thing {
    // assets: array of assets that the player has chosen to complete for the line art challenges
    //   id: unique asset identifier
    //   type: what kind of asset this is
    //   completed: auto-updated field if the player completed this asset

    //   BITMAP
    //   bitmapId: ID of the bitmap representing this asset
    static id() {
      return 'PixelArtAcademy.Challenges.Drawing.PixelArtLineArt';
    }
    static fullName() {
      return "像素画线稿";
    }
    static completed() {
      return _.every([this.completedPixelPerfectLines(), this.completedEvenDiagonals(), this.completedSmoothCurves()]);
    }
    static completedPixelPerfectLines() {
      var assets;
      assets = this.state('assets');
      return _.find(assets, asset => {
        var bitmap, pixelPerfectLines, ref, ref1;
        if (!(bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(asset.bitmapId))) {
          return;
        }
        if (!(pixelPerfectLines = (ref = bitmap.properties) != null ? (ref1 = ref.pixelArtEvaluation) != null ? ref1.pixelPerfectLines : void 0 : void 0)) {
          return;
        }
        return _.every([asset.completed, pixelPerfectLines.score >= 0.8, pixelPerfectLines.doubles != null, pixelPerfectLines.corners != null]);
      });
    }
    static completedEvenDiagonals() {
      var assets;
      assets = this.state('assets');
      return _.find(assets, asset => {
        var bitmap, evenDiagonals, ref, ref1, ref2, ref3;
        if (!(bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(asset.bitmapId))) {
          return;
        }
        if (!(evenDiagonals = (ref = bitmap.properties) != null ? (ref1 = ref.pixelArtEvaluation) != null ? ref1.evenDiagonals : void 0 : void 0)) {
          return;
        }
        return _.every([asset.completed, evenDiagonals.score >= 0.8, ((ref2 = evenDiagonals.segmentLengths) != null ? (ref3 = ref2.counts) != null ? ref3.even : void 0 : void 0) > 10]);
      });
    }
    static completedSmoothCurves() {
      var assets;
      assets = this.state('assets');
      return _.find(assets, asset => {
        var bitmap, ref, ref1, smoothCurves;
        if (!(bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(asset.bitmapId))) {
          return;
        }
        if (!(smoothCurves = (ref = bitmap.properties) != null ? (ref1 = ref.pixelArtEvaluation) != null ? ref1.smoothCurves : void 0 : void 0)) {
          return;
        }
        return _.every([asset.completed, smoothCurves.score >= 0.8, smoothCurves.abruptSegmentLengthChanges != null && smoothCurves.abruptSegmentLengthChanges.score >= 0.8, smoothCurves.straightParts != null && smoothCurves.straightParts.score >= 0.8, smoothCurves.inflectionPoints != null && smoothCurves.inflectionPoints.score >= 0.8]);
      });
    }
    static completedConsistentLineWidth() {
      var assets;
      assets = this.state('assets');
      return _.find(assets, asset => {
        var bitmap, consistentLineWidth, ref, ref1, ref2, ref3;
        if (!(bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(asset.bitmapId))) {
          return;
        }
        if (!(consistentLineWidth = (ref = bitmap.properties) != null ? (ref1 = ref.pixelArtEvaluation) != null ? ref1.consistentLineWidth : void 0 : void 0)) {
          return;
        }
        return _.every([asset.completed, ((ref2 = consistentLineWidth.individualConsistency) != null ? ref2.score : void 0) >= 0.8 || ((ref3 = consistentLineWidth.globalConsistency) != null ? ref3.score : void 0) >= 0.8]);
      });
    }
    static addDrawLineArtAsset(id) {
      var assets, insertionIndex, referenceSelection, referenceSelectionId;
      assets = this.state('assets');
      if (assets == null) {
        assets = [];
      }

      // Add the asset if it's not already added.
      if (!_.find(assets, asset => {
        return asset.id === id;
      })) {
        referenceSelectionId = PAA.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.id();
        referenceSelection = _.find(assets, asset => {
          return asset.id === referenceSelectionId;
        });
        insertionIndex = referenceSelection ? 1 : 0;
        assets.splice(insertionIndex, 0, {
          id
        });
      }
      return this.state('assets', assets);
    }
    static remainingDrawLineArtClasses() {
      var addedAssets, addedReferenceClassIds, asset;
      addedAssets = this.state('assets') || [];
      addedReferenceClassIds = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = addedAssets.length; i < len; i++) {
          asset = addedAssets[i];
          results.push(asset.id);
        }
        return results;
      }();
      return _.filter(_.values(this.drawLineArtClasses), drawLineArtClass => {
        var ref;
        return ref = drawLineArtClass.id(), indexOf.call(addedReferenceClassIds, ref) < 0;
      });
    }
    constructor() {
      var requiredTutorials;
      super(...arguments);

      // Listen to a change in completed tutorials to determine which pixel art evaluation criteria can be challenged.
      requiredTutorials = {
        PixelPerfectLines: PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines,
        EvenDiagonals: PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals,
        SmoothCurves: PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves,
        ConsistentLineWidth: PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth
      };
      this._unlockableCriteriaAutorun = Tracker.autorun(() => {
        var criterion, existingUnlockablePixelArtEvaluationCriteria, tutorial, unlockablePixelArtEvaluationCriteria;
        unlockablePixelArtEvaluationCriteria = [];
        for (criterion in requiredTutorials) {
          tutorial = requiredTutorials[criterion];
          if (tutorial.completed()) {
            unlockablePixelArtEvaluationCriteria.push(criterion);
          }
        }

        // See if the criteria actually changed.
        existingUnlockablePixelArtEvaluationCriteria = PAA.Practice.Project.Asset.Bitmap.state('unlockablePixelArtEvaluationCriteria');
        if (!_.xor(unlockablePixelArtEvaluationCriteria, existingUnlockablePixelArtEvaluationCriteria).length) {
          return;
        }
        return PAA.Practice.Project.Asset.Bitmap.state('unlockablePixelArtEvaluationCriteria', unlockablePixelArtEvaluationCriteria);
      });

      // Listen to a change in completed of assets to determine which pixel art evaluation criteria can be granted.
      this.completedChallenges = new AE.LiveComputedField(() => {
        return {
          PixelPerfectLines: Boolean(this.constructor.completedPixelPerfectLines()),
          EvenDiagonals: Boolean(this.constructor.completedEvenDiagonals()),
          SmoothCurves: Boolean(this.constructor.completedSmoothCurves()),
          ConsistentLineWidth: Boolean(this.constructor.completedConsistentLineWidth())
        };
      }, EJSON.equals);
      this._unlockedCriteriaAutorun = Tracker.autorun(() => {
        var completed, criterion, existingUnlockedPixelArtEvaluationCriteria, ref, unlockedPixelArtEvaluationCriteria;
        unlockedPixelArtEvaluationCriteria = [];
        ref = this.completedChallenges();
        for (criterion in ref) {
          completed = ref[criterion];
          if (completed) {
            unlockedPixelArtEvaluationCriteria.push(criterion);
          }
        }

        // See if the criteria actually changed.
        existingUnlockedPixelArtEvaluationCriteria = PAA.Practice.Project.Asset.Bitmap.state('unlockedPixelArtEvaluationCriteria');
        if (!_.xor(unlockedPixelArtEvaluationCriteria, existingUnlockedPixelArtEvaluationCriteria).length) {
          return;
        }
        return PAA.Practice.Project.Asset.Bitmap.state('unlockedPixelArtEvaluationCriteria', unlockedPixelArtEvaluationCriteria);
      });
    }
    destroy() {
      var asset, i, len, ref, results;
      this._unlockableCriteriaAutorun.stop();
      this.completedChallenges.stop();
      this._unlockedCriteriaAutorun.stop();
      if (this._pixelArtLineArtAssets) {
        ref = this._pixelArtLineArtAssets;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          asset = ref[i];
          results.push(asset.destroy());
        }
        return results;
      }
    }
    assetsData() {
      if (!LOI.adventure.gameStateAvailable()) {
        return;
      }
      // We need to mimic a project, so we need to provide the data. If no state is
      // set, we send a dummy object to let the bitmap know we've loaded the state.
      return this.state('assets') || [];
    }
    assets() {
      var asset, assetClassName, assets, base, base1, i, len, name, name1, pixelArtLineArtAssets;
      assets = [];
      if (this._pixelArtLineArtAssets == null) {
        this._pixelArtLineArtAssets = [];
      }
      if (pixelArtLineArtAssets = this.state('assets')) {
        for (i = 0, len = pixelArtLineArtAssets.length; i < len; i++) {
          asset = pixelArtLineArtAssets[i];
          if (asset.id === PAA.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.id()) {
            if ((base = this._pixelArtLineArtAssets)[name = asset.id] == null) {
              base[name] = Tracker.nonreactive(() => {
                return new PAA.Challenges.Drawing.PixelArtLineArt.ReferenceSelection(this);
              });
            }
          } else {
            assetClassName = _.last(asset.id.split('.'));
            if ((base1 = this._pixelArtLineArtAssets)[name1 = asset.id] == null) {
              base1[name1] = Tracker.nonreactive(() => {
                return new PAA.Challenges.Drawing.PixelArtLineArt.DrawLineArt[assetClassName](this);
              });
            }
          }
          assets.push(this._pixelArtLineArtAssets[asset.id]);
        }
      }
      return assets;
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtLineArt);
    }
  }
  ;
  PixelArtLineArt.initialize();
  PixelArtLineArt.drawLineArtClasses = {};
  return PixelArtLineArt;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawlineart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/drawlineart.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtLineArt.DrawLineArt = function () {
  class DrawLineArt extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static displayName() {
      return "Draw line art";
    }
    static description() {
      return "展示使用像素画规则来画线稿。";
    }
    static referenceImageUrl() {
      return "/pixelartacademy/challenges/drawing/pixelartlineart/".concat(this.imageName(), ".webp");
    }
    static resources() {
      return {
        solvePixels: new this.Resource.ImagePixels("/pixelartacademy/challenges/drawing/pixelartlineart/".concat(this.imageName(), ".png"))
      };
    }
    static imageName() {
      throw new AE.NotImplementedException("You must provide the image name for the asset.");
    }
    static references() {
      return [{
        image: {
          url: this.referenceImageUrl()
        },
        displayOptions: {
          imageOnly: true
        }
      }];
    }
    static binderScale() {
      // Override if the reference should appear smaller than filling the entire folder.
      return 1;
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static goalChoices() {
      return [{
        referenceUrl: this.referenceImageUrl(),
        svgUrl: "/pixelartacademy/challenges/drawing/pixelartlineart/".concat(this.imageName(), ".svg")
      }];
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          unlockable: true
        }
      };
    }
    constructor() {
      super(...arguments);
      this.uploadMode = new ReactiveField(false);
    }

    // Note: We have to override initializeStepsInAreaWithResources instead of initializeSteps since
    // this will be called when creating steps after reference selection.
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      var svgPaths;
      // Create a path step that has increased tolerance to allow for more freedom where you place the lines.
      svgPaths = stepResources.svgPaths.svgPaths();
      return new this.constructor.CustomSolutionPathStep(this, stepArea, {
        svgPaths: svgPaths,
        drawHintsAfterCompleted: false,
        tolerance: 2
      });
    }
    editorOptions() {
      return {
        references: {
          upload: {
            enabled: false
          },
          storage: {
            enabled: false
          }
        }
      };
    }
    availableToolKeys() {
      // When we're in upload mode, don't show any tools in the editor.
      if (this.uploadMode()) {
        return [];
      }
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.References];
    }
    templateUrl() {
      return "/pixelartacademy/challenges/drawing/pixelartsoftware/".concat(this.constructor.imageName(), "-template.png");
    }
    referenceUrl() {
      return this.constructor.references()[0].image.url;
    }
  }
  ;
  DrawLineArt.CustomSolutionPathStep = class CustomSolutionPathStep extends DrawLineArt.PathStep {
    solve() {
      var bitmap, pixels, strokeAction;
      bitmap = this.tutorialBitmap.bitmap();
      pixels = this.tutorialBitmap.resources.solvePixels.pixels();

      // Replace the layer pixels in this bitmap.
      strokeAction = new LOI.Assets.Bitmap.Actions.Stroke(this.tutorialBitmap.id(), bitmap, [0], pixels);
      return AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, strokeAction, new Date());
    }
  };
  return DrawLineArt;
}.call(this);

/*
  class @EnableEvaluation extends PAA.PixelPad.Systems.Instructions.Instruction
    @criterion: -> throw new AE.NotImplementedException "You must provide which pixel art evaluation criterion this challenge unlocks."

    @activeDisplayState: ->
 * We only want a pop-up without a normal instruction message.
PAA.PixelPad.Systems.Instructions.DisplayState.Hidden

    @activeConditions: ->
return unless asset = @getActiveAsset()

 * Show when the asset is completed.
asset.completed()

    @initialize()

    onActivate: ->
super arguments...

criterion = Asset.criterion()
criterionName = PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation.Overview.CriteriaNames[criterion]

dialog = new LOI.Components.Dialog
  message: """
      Well done! You now have access to evaluation #{_.toLower criterionName} in previous pixel art tutorials.
      Do you want to automatically turn it on for relevant lessons?
    """
  moreInfo: "You can come back to this challenge to enable it at a later point."
  buttons: [
    text: "Yes"
    value: true
  ,
    text: "No"
  ]

LOI.adventure.showActivatableModalDialog
  dialog: dialog
  callback: =>
    return unless dialog.result

    PAA.Tutorials.Drawing.PixelArtFundamentals.enablePixelArtEvaluation criterion

 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assets.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/assets.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var DrawLineArt, LOI, PAA, PADB, asset, assetId, assets;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawLineArt = PAA.Challenges.Drawing.PixelArtLineArt.DrawLineArt;
PADB = PixelArtDatabase;
assets = {
  MickeyMouseSoundCartoon: {
    dimensions: function () {
      return {
        width: 100,
        height: 120
      };
    },
    imageName: function () {
      return 'mickeymousesoundcartoon';
    },
    bitmapInfo: function () {
      return "Fan art study based on Mickey Mouse Sound Cartoon (Ub Iwerks, 1928).";
    }
  },
  SuperMarioBros3World5: {
    dimensions: function () {
      return {
        width: 100,
        height: 100
      };
    },
    imageName: function () {
      return 'supermariobros3world5';
    },
    bitmapInfo: function () {
      return "Fan art study based on Super Mario Bros. 3 (Nintendo Power Strategy Guide, vol. SG1/NP13, Nintendo, 1990).";
    }
  },
  SonicTheHedgehog3: {
    dimensions: function () {
      return {
        width: 80,
        height: 100
      };
    },
    imageName: function () {
      return 'sonicthehedgehog3';
    },
    bitmapInfo: function () {
      return "Fan art study based on Sonic the Hedgehog 3 (Sega, 1994).";
    }
  },
  Zaxxon: {
    dimensions: function () {
      return {
        width: 70,
        height: 45
      };
    },
    imageName: function () {
      return 'zaxxon';
    },
    bitmapInfo: function () {
      return "Fan art study based on Zaxxon (SEGA, 1982).";
    }
  },
  Rayman: {
    dimensions: function () {
      return {
        width: 65,
        height: 100
      };
    },
    imageName: function () {
      return 'rayman';
    },
    bitmapInfo: function () {
      return "Fan art study based on Rayman (Ubisoft, 1995).";
    }
  },
  ManiacMansion: {
    dimensions: function () {
      return {
        width: 200,
        height: 200
      };
    },
    imageName: function () {
      return 'maniacmansion';
    },
    bitmapInfo: function () {
      return "Fan art study based on Maniac Mansion (Ken Macklin, Lucasfilm Games, 1987).";
    }
  },
  BubbleBobble: {
    dimensions: function () {
      return {
        width: 80,
        height: 70
      };
    },
    imageName: function () {
      return 'bubblebobble';
    },
    bitmapInfo: function () {
      return "Fan art study based on Bubble Bobble (Taito, 1986).";
    }
  },
  ZeldaII: {
    dimensions: function () {
      return {
        width: 100,
        height: 100
      };
    },
    imageName: function () {
      return 'zeldaii';
    },
    bitmapInfo: function () {
      return "Fan art study based on Zelda II: The Adventure of Link (instruction booklet, Nintendo, 1987).";
    }
  },
  DayOfTheTentacle: {
    dimensions: function () {
      return {
        width: 60,
        height: 100
      };
    },
    imageName: function () {
      return 'dayofthetentacle';
    },
    bitmapInfo: function () {
      return "Fan art study based on Day of the Tentacle (Peter Chan, LucasArts, 1993).";
    }
  },
  TetrisGameBoy: {
    dimensions: function () {
      return {
        width: 180,
        height: 200
      };
    },
    imageName: function () {
      return 'tetrisgameboy';
    },
    bitmapInfo: function () {
      return "Fan art study based on Tetris (Game Boy, Nintendo, 1989).";
    },
    binderScale: 0.5
  }
};
for (assetId in assets) {
  asset = assets[assetId];
  (function (assetId, asset) {
    DrawLineArt[assetId] = function () {
      var _Class;
      _Class = class extends DrawLineArt {
        static id() {
          return "PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.DrawLineArt.".concat(assetId);
        }
        static backgroundColor() {
          return null;
        }
        static binderScale() {
          return asset.binderScale || super.binderScale(...arguments);
        }
      };
      _Class.fixedDimensions = asset.dimensions;
      _Class.imageName = asset.imageName;
      _Class.bitmapInfo = asset.bitmapInfo;
      _Class.initialize();
      return _Class;
    }.call(this);
    return PAA.Challenges.Drawing.PixelArtLineArt.drawLineArtClasses[assetId] = DrawLineArt[assetId];
  })(assetId, asset);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"referenceselection":{"referenceselection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/referenceselection.coffee //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Babel;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtLineArt.ReferenceSelection = function () {
  class ReferenceSelection extends PAA.Challenges.Drawing.ReferenceSelection {
    static id() {
      return "PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection";
    }
    static displayName() {
      return "Choose a reference to draw";
    }
    static description() {
      return "找一个最喜欢的角色来画同人画。";
    }
    static portfolioComponentClass() {
      return this.PortfolioComponent;
    }
    static customComponentClass() {
      return this.CustomComponent;
    }
    urlParameter() {
      return 'select-pixel-art-line-art-reference';
    }
    width() {
      return 63;
    }
    height() {
      return 81;
    }
  }
  ;
  ReferenceSelection.initialize();
  return ReferenceSelection;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/portfoliocomponent/portfo //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {
    references() {
      var binderScale, drawLineArtClass, i, ref, remainingDrawLineArtClasses, results;
      remainingDrawLineArtClasses = PAA.Challenges.Drawing.PixelArtLineArt.remainingDrawLineArtClasses();
      ref = remainingDrawLineArtClasses.slice(0, 3);
      results = [];
      for (i = ref.length - 1; i >= 0; i += -1) {
        drawLineArtClass = ref[i];
        binderScale = drawLineArtClass.binderScale();
        results.push((binderScale => {
          var height, offsetRangePercentage, scalePercentage, width;
          scalePercentage = binderScale * 100;
          offsetRangePercentage = 100 - scalePercentage;
          width = Math.floor(52 * binderScale);
          height = Math.floor(77 * binderScale);
          return {
            pixelImageOptions: {
              source: drawLineArtClass.referenceImageUrl(),
              imageSmoothingEnabled: true,
              targetSizeFit: AM.PixelImage.TargetSizeFitType.Contain,
              targetWidth: () => {
                return width;
              },
              targetHeight: () => {
                return height;
              }
            },
            style: {
              bottom: "".concat(2 + Math.floor(Math.random() * 2), "rem"),
              right: "calc(".concat(2 + Math.floor(Math.random() * 2), "rem + ").concat(Math.random() * offsetRangePercentage, "%)"),
              width: "".concat(width, "rem"),
              height: "".concat(height, "rem")
            }
          };
        })(binderScale));
      }
      return results;
    }
  }
  ;
  PortfolioComponent.register('PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/portfoliocomponent/templa //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.PortfolioComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.PortfolioComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.PortfolioComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-challenges-drawing-pixelartlineart-referenceselection-portfoliocomponent"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("references"));
  }, function() {
    return [ "\n      ", HTML.DIV(HTML.Attrs({
      class: "reference"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), Spacebars.dot(view.lookup("."), "style"));
    }), "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("pixelImageOptions"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("Artificial"), "Mirage", "PixelImage"));
      });
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"customcomponent":{"customcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/customcomponent/customcom //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent = function () {
  class CustomComponent extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent';
    }
    onCreated() {
      super.onCreated(...arguments);

      // Controls whether the binder is visible anywhere in the screen.
      this.binderVisible = new ReactiveField(false);

      // Controls whether the binder should be displayed in the center of the table.
      this.binderDisplayed = new ReactiveField(false);
      this._wasActive = false;
      this.active = new ReactiveField(false);
      this.drawingApp = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
      this.references = new ReactiveField([]);
      this.currentPage = new ReactiveField(0);
      this.currentReferenceIndex = new ComputedField(() => {
        return Math.max(0, this.currentPage() - 1);
      });
      this.referenceSelected = new ReactiveField(false);
      this.previousReferences = new ComputedField(() => {
        return this.references().slice(0, this.currentReferenceIndex());
      });
      return this.nextReferences = new ComputedField(() => {
        return _.reverse(this.references().slice(this.currentReferenceIndex()));
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.audio.binderDrag(false);
      return this.autorun(computation => {
        var shouldBeActive;
        shouldBeActive = this.drawingApp.activeAsset() != null;
        if (shouldBeActive && !this._wasActive) {
          this._initializeReferences();

          // Start rendering the binder in closed state.
          this.currentPage(0);
          this.binderVisible(true);
          this._resetActivateTimers();
          this._activeTimeout = Meteor.setTimeout(() => {
            // Fade in the component.
            this.active(true);
            // Move the binder to the center of the table.
            return this.binderDisplayed(true);
          }, 100);
          this._binderDragTimeout = Meteor.setTimeout(() => {
            return this.audio.binderDrag(true);
          }, 800);
        } else if (this._wasActive && !shouldBeActive) {
          // End any animation for selecting a reference.
          this.referenceSelected(false);
          Meteor.clearTimeout(this._switchToBitmapTimeout);
          Meteor.clearTimeout(this._closeBinderTimeout);
          // Close the binder and move it from the table.
          this.currentPage(0);
          this.binderDisplayed(false);
          this.audio.binderDrag(false);
          // Fade out the component.
          this._resetActivateTimers();
          this._deactivateTimeout = Meteor.setTimeout(() => {
            return this.active(false);
          }, 500);

          // Stop rendering the binder.
          this._hideTimeout = Meteor.setTimeout(() => {
            return this.binderVisible(false);
          }, 1000);
        }
        return this._wasActive = shouldBeActive;
      });
    }
    _resetActivateTimers() {
      Meteor.clearTimeout(this._activeTimeout);
      Meteor.clearTimeout(this._deactivateTimeout);
      Meteor.clearTimeout(this._binderDragTimeout);
      return Meteor.clearTimeout(this._hideTimeout);
    }
    setPixelPadSize(drawingApp) {
      return drawingApp.setMaximumPixelPadSize({
        fullscreen: true
      });
    }
    _initializeReferences() {
      var drawLineArtClass, index, offsetRangePercentage, references, scalePercentage;
      references = function () {
        var i, len, ref, results;
        ref = _.values(PAA.Challenges.Drawing.PixelArtLineArt.remainingDrawLineArtClasses());
        results = [];
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          drawLineArtClass = ref[index];
          scalePercentage = drawLineArtClass.binderScale() * 100;
          offsetRangePercentage = 100 - scalePercentage;
          results.push({
            id: drawLineArtClass.id(),
            index: index,
            imageUrl: drawLineArtClass.referenceImageUrl(),
            imageStyle: {
              top: "calc(".concat(5 + Math.floor(Math.random() * 5), "rem + ").concat(offsetRangePercentage, "%)"),
              left: "calc(".concat(5 + Math.floor(Math.random() * 5), "rem + ").concat(Math.random() * offsetRangePercentage, "%)"),
              width: "calc(".concat(scalePercentage, "% - 15rem)"),
              height: "calc(".concat(scalePercentage, "% - 15rem)")
            },
            referenceStyle: {
              width: "".concat(this.constructor.sheetWidth + 2 * index, "rem")
            }
          });
        }
        return results;
      }.call(this);
      this.references(references);
      return this.referenceSelected(false);
    }
    _selectReference() {
      var selectedReferenceId;
      selectedReferenceId = this.references()[this.currentReferenceIndex()].id;
      this.referenceSelected(true);
      this._switchToBitmapTimeout = Meteor.setTimeout(() => {
        PAA.Challenges.Drawing.PixelArtLineArt.addDrawLineArtAsset(selectedReferenceId);
        // Find out the bitmap ID.
        return Tracker.autorun(computation => {
          var assets, bitmapId, selectedAsset;
          if (!(assets = PAA.Challenges.Drawing.PixelArtLineArt.state('assets'))) {
            return;
          }
          if (!(selectedAsset = _.find(assets, function (asset) {
            return asset.id === selectedReferenceId;
          }))) {
            return;
          }
          if (!(bitmapId = selectedAsset.bitmapId)) {
            return;
          }
          computation.stop();
          return AB.Router.changeParameters({
            parameter3: bitmapId,
            parameter4: 'edit'
          });
        });
      }, 2500);
      return this._closeBinderTimeout = Meteor.setTimeout(() => {
        this.currentPage(0);
        this.binderDisplayed(false);
        this.audio.binderClose();
        return this.audio.binderDrag(false);
      }, 1500);
    }
    activeClass() {
      if (this.active()) {
        return 'active';
      }
    }
    binderDisplayedClass() {
      if (this.binderDisplayed()) {
        return 'displayed';
      }
    }
    binderOpenClass() {
      if (this.currentPage() > 0) {
        return 'open';
      }
    }
    canMoveBack() {
      if (this.referenceSelected()) {
        return;
      }
      return this.currentPage() > 0;
    }
    canMoveForward() {
      if (this.referenceSelected()) {
        return;
      }
      return this.nextReferences().length > 0;
    }
    binderReferenceSelectedClass() {
      if (this.referenceSelected()) {
        return 'selected';
      }
    }
    referenceSelectedClass() {
      var reference;
      reference = this.currentData();
      if (this.currentReferenceIndex() !== reference.index) {
        return;
      }
      if (this.referenceSelected()) {
        return 'selected';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .next-reference': this.onClickNextReference,
        'click .previous-reference': this.onClickPreviousReference,
        'click .reference': this.onClickReference
      });
    }
    onClickNextReference(event) {
      var currentPage;
      currentPage = this.currentPage();
      if (currentPage) {
        this.audio.turnSheet();
      } else {
        this.audio.binderOpen();
      }
      return this.currentPage(currentPage + 1);
    }
    onClickPreviousReference(event) {
      var currentPage;
      currentPage = this.currentPage();
      if (currentPage === 1) {
        this.audio.binderClose();
      } else {
        this.audio.turnSheet();
      }
      return this.currentPage(currentPage - 1);
    }
    onClickReference(event) {
      if (this.referenceSelected()) {
        return;
      }
      this.audio.selectReference();
      return this._selectReference();
    }
  }
  ;
  CustomComponent.register(CustomComponent.id());
  CustomComponent.sheetWidth = 139;
  CustomComponent.Audio = new LOI.Assets.Audio.Namespace(CustomComponent.id(), {
    variables: {
      binderDrag: AEc.ValueTypes.Boolean,
      binderOpen: AEc.ValueTypes.Trigger,
      binderClose: AEc.ValueTypes.Trigger,
      turnSheet: AEc.ValueTypes.Trigger,
      selectReference: AEc.ValueTypes.Trigger
    }
  });
  return CustomComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.customcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/customcomponent/template. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-challenges-drawing-pixelartlineart-referenceselection-customcomponent ", Spacebars.mustache(view.lookup("activeClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("binderVisible"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "prompt"
    }, Blaze._TemplateWith(function() {
      return "Choose a reference";
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    })), "\n      ", HTML.DIV({
      class: function() {
        return [ "binder-area ", Spacebars.mustache(view.lookup("binderDisplayedClass")), " ", Spacebars.mustache(view.lookup("binderOpenClass")) ];
      }
    }, "\n        ", HTML.DIV({
      class: "binder-closed"
    }, "\n          ", HTML.DIV({
      class: "label"
    }, Blaze._TemplateWith(function() {
      return "References";
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    })), "\n          ", HTML.DIV({
      class: "open-hint"
    }, Blaze._TemplateWith(function() {
      return "open here";
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    })), "\n        "), "\n        ", HTML.DIV({
      class: function() {
        return [ "binder-open ", Spacebars.mustache(view.lookup("binderReferenceSelectedClass")) ];
      }
    }, "\n          ", HTML.DIV({
      class: "references flipped"
    }, "\n            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("previousReferences"));
    }, function() {
      return [ "\n              ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtLineArt", "ReferenceSelection", "CustomComponent", "Reference"));
      }), "\n            " ];
    }), "\n          "), "\n          ", HTML.DIV({
      class: "references"
    }, "\n            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("nextReferences"));
    }, function() {
      return [ "\n              ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtLineArt", "ReferenceSelection", "CustomComponent", "Reference"));
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n      "), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveBack"));
    }, function() {
      return HTML.Raw('\n        <button class="navigation-button previous-reference"></button>\n      ');
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveForward"));
    }, function() {
      return HTML.Raw('\n        <button class="navigation-button next-reference"></button>\n      ');
    }), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent.Reference");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent.Reference"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtLineArt.ReferenceSelection.CustomComponent.Reference", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "reference ", Spacebars.mustache(view.lookup("referenceSelectedClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("referenceStyle"));
  }), "\n    ", HTML.IMG(HTML.Attrs({
    class: "image",
    src: function() {
      return Spacebars.mustache(view.lookup("imageUrl"));
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("imageStyle"));
  })), HTML.Raw('\n    <div class="cover"></div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"pixelartreadability":{"pixelartreadability.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/pixelartreadability.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtReadability = function () {
  class PixelArtReadability extends PAA.Practice.Project.Thing {
    // icons: object with the icons the player started drawing
    //   {label}: the name of the image classification label for this subject
    //     sizes:
    //       8/16/32: object with data for this size
    //         bitmapId: ID of the bitmap representing this subject size
    //         started: auto-updated field if the player started drawing this size for this subject
    //         completed: auto-updated field if the player completed this size for this subject
    // startedCounts:
    //    8/16/32: auto-updated integer count how many icons of this size have been started
    // completedCounts:
    //   8/16/32: auto-updated integer count how many icons of this size have been completed
    static id() {
      return 'PixelArtAcademy.Challenges.Drawing.PixelArtReadability';
    }
    static fullName() {
      return "像素画可读性";
    }
    static startedTotalCount() {
      var startedCounts;
      if (!(startedCounts = this.state('startedCounts'))) {
        return 0;
      }
      return startedCounts[8] + startedCounts[16] + startedCounts[32];
    }
    static async addIcon(label, size) {
      var bitmapId, icons;
      icons = this.state('icons');
      if (icons == null) {
        icons = {};
      }
      if (icons[label] == null) {
        icons[label] = {
          sizes: {}
        };
      }
      bitmapId = await this._createBitmap(label, size);
      icons[label].sizes[size] = {
        bitmapId
      };
      return this.state('icons', icons);
    }
    static _createBitmap(label, size) {
      return new Promise(async (resolve, reject) => {
        var bitmapData, blackPalette, creationTime;
        // Load the black palette.
        blackPalette = await new Promise(resolve => {
          return Tracker.autorun(computation => {
            var palette;
            LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Black);
            if (!(palette = LOI.Assets.Palette.documents.findOne({
              name: LOI.Assets.Palette.SystemPaletteNames.Black
            }))) {
              return;
            }
            computation.stop();
            return resolve(palette);
          });
        });

        // Create an empty bitmap.
        creationTime = new Date();
        bitmapData = {
          versioned: true,
          profileId: LOI.adventure.profileId(),
          creationTime: creationTime,
          lastEditTime: creationTime,
          name: "".concat(_.titleCase(label), " ").concat(size),
          bounds: {
            fixed: true,
            left: 0,
            right: size - 1,
            top: 0,
            bottom: size - 1
          },
          pixelFormat: new LOI.Assets.Bitmap.PixelFormat('flags', 'paletteColor'),
          palette: {
            _id: blackPalette._id
          },
          properties: {
            pixelArtScaling: true,
            readabilityAnalysis: {
              regions: [{
                targetLabel: label
              }]
            }
          }
        };
        return resolve(LOI.Assets.Bitmap.documents.insert(bitmapData));
      });
    }
    constructor() {
      super(...arguments);
      this._countsAutorun = Tracker.autorun(computation => {
        var icons;
        icons = this.state('icons');
        return Tracker.nonreactive(() => {
          var completedCounts, icon, label, labelEntry, newCompletedCounts, newStartedCounts, ref, size, startedCounts;
          startedCounts = this.state('startedCounts');
          completedCounts = this.state('completedCounts');
          newStartedCounts = {
            8: 0,
            16: 0,
            32: 0
          };
          newCompletedCounts = {
            8: 0,
            16: 0,
            32: 0
          };
          for (label in icons) {
            labelEntry = icons[label];
            ref = labelEntry.sizes;
            for (size in ref) {
              icon = ref[size];
              if (icon.started) {
                newStartedCounts[size]++;
              }
              if (icon.completed) {
                newCompletedCounts[size]++;
              }
            }
          }
          if (!EJSON.equals(startedCounts, newStartedCounts)) {
            this.state('startedCounts', newStartedCounts);
          }
          if (!EJSON.equals(completedCounts, newCompletedCounts)) {
            return this.state('completedCounts', newCompletedCounts);
          }
        });
      });
    }
    destroy() {
      var ref, ref1;
      super.destroy(...arguments);
      this._countsAutorun.stop();
      if ((ref = this._iconSelectionVolume1) != null) {
        ref.destroy();
      }
      return (ref1 = this._iconSelectionVolume2) != null ? ref1.destroy() : void 0;
    }
    assetsData() {
      return [];
    }
    assets() {
      if (this._iconSelectionVolume1 == null) {
        this._iconSelectionVolume1 = Tracker.nonreactive(() => {
          return new PAA.Challenges.Drawing.PixelArtReadability.IconSelection.Volume1(this);
        });
      }
      if (this._iconSelectionVolume2 == null) {
        this._iconSelectionVolume2 = Tracker.nonreactive(() => {
          return new PAA.Challenges.Drawing.PixelArtReadability.IconSelection.Volume2(this);
        });
      }
      return [this._iconSelectionVolume1, this._iconSelectionVolume2];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingChallenges.PixelArtReadability);
    }
  }
  ;
  PixelArtReadability.initialize();
  return PixelArtReadability;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iconselection":{"iconselection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/iconselection.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtReadability.IconSelection = class IconSelection extends PAA.Challenges.Drawing.ReferenceSelection {
  static volumeNumber() {
    throw new AE.NotImplementedException('Icon selection must specify which volume it is.');
  }
  static coverIconsCounts() {
    throw new AE.NotImplementedException('Icon selection must specify how many icons it has on the cover.');
  }
  static portfolioComponentClass() {
    return this.PortfolioComponent;
  }
  static customComponentClass() {
    return this.CustomComponent;
  }
  static getIconStatus(bitmap) {
    return {
      completed: bitmap.properties.readabilityAnalysis.passes,
      started: bitmap.properties.readabilityAnalysis.regions[0].labels != null
    };
  }
  constructor() {
    var iconEntry, iconNumber, label, pageNumber, part, partId, partNumber, ref;
    super(...arguments);

    // Calculate contents.
    partNumber = 0;
    iconNumber = 0;
    pageNumber = 3;
    this.contents = _.cloneDeep(this.constructor.parts);
    this.pages = [];
    ref = this.contents;
    for (partId in ref) {
      part = ref[partId];
      partNumber++;
      part.number = partNumber;
      if (!(pageNumber % 2)) {
        // Increase the page number for the category page on the right page of the spread.
        pageNumber++;
      }
      pageNumber++;
      part.titlePageNumber = pageNumber;
      this.pages[pageNumber] = part;

      // Create icon entries.
      part.iconEntries = function () {
        var i, len, ref1, results;
        ref1 = this.constructor.labels[partId];
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          label = ref1[i];
          iconNumber++;
          pageNumber++;
          iconEntry = {
            iconNumber,
            label,
            name: this.constructor.translatedLabels && this.constructor.translatedLabels[label] || _.titleCase(label),
            pageNumber
          };
          this.pages[pageNumber] = iconEntry;
          results.push(iconEntry);
        }
        return results;
      }.call(this);
    }

    // Provide the bitmap data to the editor. We need to keep it
    // persistent even after the URL is changed to allow for transitions.
    this._lastBitmapId = null;
    this.document = new AE.LiveComputedField(() => {
      var bitmapId;
      if (!(bitmapId = this._getBitmapId() || this._lastBitmapId)) {
        return;
      }
      this._lastBitmapId = bitmapId;
      return LOI.Assets.Bitmap.getDocumentForId(bitmapId);
    });
    this._updateIconStatusAutorun = Tracker.autorun(computation => {
      var bitmap, completedCorrect, iconData, iconStatus, icons, ref1, size, startedCorrect;
      // When an icon is being drawn, update its status in the state.
      if (!(bitmap = this.document())) {
        return;
      }
      if (!(icons = PAA.Challenges.Drawing.PixelArtReadability.state('icons'))) {
        return;
      }
      label = bitmap.properties.readabilityAnalysis.regions[0].targetLabel;
      size = bitmap.bounds.width;
      if (!(iconData = (ref1 = icons[label]) != null ? ref1.sizes[size] : void 0)) {
        return;
      }
      iconStatus = this.constructor.getIconStatus(bitmap);

      // Started and completed are stored as true and undefined.
      startedCorrect = iconStatus.started ? iconData.started : iconData.started == null;
      completedCorrect = iconStatus.completed ? iconData.completed : iconData.completed == null;
      if (startedCorrect && completedCorrect) {
        return;
      }
      if (!startedCorrect) {
        if (iconStatus.started) {
          iconData.started = true;
        } else {
          delete iconData.started;
        }
      }
      if (!completedCorrect) {
        if (iconStatus.completed) {
          iconData.completed = true;
        } else {
          delete iconData.completed;
        }
      }
      return PAA.Challenges.Drawing.PixelArtReadability.state('icons', icons);
    });
  }
  destroy() {
    this.document.stop();
    return this._updateIconStatusAutorun.stop();
  }
  urlParameter() {
    var bitmapId;
    if (bitmapId = this._getBitmapId()) {
      // Try to return the current bitmap ID if it's one of our icons.
      return bitmapId;
    }

    // No icon has been selected, so return the default URL.
    return this.constructor.defaultUrl();
  }
  _getBitmapId() {
    var icon, icons, label, labelEntry, parameter, ref, size;
    if (!(parameter = AB.Router.getParameter('parameter3'))) {
      return;
    }
    if (!(icons = PAA.Challenges.Drawing.PixelArtReadability.state('icons'))) {
      return;
    }
    for (label in icons) {
      labelEntry = icons[label];
      if (this._ownLabel(label)) {
        ref = labelEntry.sizes;
        for (size in ref) {
          icon = ref[size];
          if (icon.bitmapId === parameter) {
            return icon.bitmapId;
          }
        }
      }
    }
    return null;
  }
  _ownLabel(label) {
    var category, labels, ref;
    ref = this.constructor.labels;
    for (category in ref) {
      labels = ref[category];
      if (indexOf.call(labels, label) >= 0) {
        return true;
      }
    }
    return false;
  }
  completed() {
    var ref;
    return (ref = this._getIconStatusIfRevealedAnalysis()) != null ? ref.completed : void 0;
  }
  started() {
    var ref;
    return (ref = this._getIconStatusIfRevealedAnalysis()) != null ? ref.started : void 0;
  }
  _getIconStatusIfRevealedAnalysis() {
    var bitmap;
    if (!(bitmap = this.document())) {
      return;
    }
    if (!bitmap.properties.readabilityAnalysis.revealed) {
      return;
    }
    return this.constructor.getIconStatus(bitmap);
  }
  width() {
    return 56;
  }
  height() {
    return 82;
  }
  availableToolKeys() {
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.Line, PAA.Practice.Software.Tools.ToolKeys.Rectangle, PAA.Practice.Software.Tools.ToolKeys.Ellipse];
  }
  previewInfo() {
    var borderWidth, bounds, left, position, ref, scale, top;
    if (!(bounds = (ref = this.document()) != null ? ref.bounds : void 0)) {
      return;
    }
    scale = 128 / bounds.width;
    borderWidth = 12;
    left = "calc(50% - 76rem)";
    if (AB.Router.getParameter('parameter4') === 'edit') {
      top = "calc(50% - 76rem)";
    } else {
      // When the drawing is not being edited, move it above the top.
      top = "-152rem";
    }
    position = {
      left,
      top
    };
    return {
      borderWidth,
      scale,
      position
    };
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iconselection-volume1.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/iconselection-volume1.coff //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtReadability.IconSelection.Volume1 = function () {
  class Volume1 extends PAA.Challenges.Drawing.PixelArtReadability.IconSelection {
    static id() {
      return "PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.Volume1";
    }
    static displayName() {
      return "图标图形手册";
    }
    static description() {
      return "绘制不同尺寸的图标，练习在有限空间中创作像素画。";
    }
    static volumeNumber() {
      return 1;
    }
    static defaultUrl() {
      return 'the-graphics-book-of-icons';
    }
    static coverIconsCounts() {
      return {
        8: 5,
        16: 9,
        32: 2
      };
    }
  }
  ;
  Volume1.initialize();
  Volume1.parts = {
    transport: {
      title: '交通'
    },
    buildings: {
      title: '建筑'
    },
    toolsAndWeapons: {
      title: '工具与武器'
    },
    furniture: {
      title: '家具'
    },
    musicalInstruments: {
      title: '乐器'
    },
    householdItems: {
      title: '家居用品'
    },
    food: {
      title: '食物'
    }
  };
  Volume1.labels = {
    transport: ['airplane', 'bicycle', 'car', 'helicopter', 'hot air balloon', 'pickup truck', 'sailboat'],
    buildings: ['castle', 'church', 'skyscraper', 'windmill'],
    toolsAndWeapons: ['axe', 'cannon', 'hammer', 'knife', 'rifle', 'saw', 'scissors', 'sword'],
    furniture: ['bench', 'chair', 'couch', 'door', 'table'],
    musicalInstruments: ['guitar', 'harp', 'piano', 'saxophone', 'trumpet', 'violin'],
    householdItems: ['alarm clock', 'bottle', 'candle', 'cup', 'eyeglasses', 'fan', 'hat', 'hourglass', 'shoe', 'spoon', 'teapot', 'teddy bear', 'umbrella'],
    food: ['bread', 'hamburger', 'pizza']
  };
  Volume1.translatedLabels = {
    airplane: '飞机',
    bicycle: '自行车',
    car: '汽车',
    helicopter: '直升机',
    'hot air balloon': '热气球',
    'pickup truck': '皮卡车',
    sailboat: '帆船',
    castle: '城堡',
    church: '教堂',
    skyscraper: '摩天楼',
    windmill: '风车',
    axe: '斧头',
    cannon: '大炮',
    hammer: '锤子',
    knife: '刀',
    rifle: '步枪',
    saw: '锯子',
    scissors: '剪刀',
    sword: '剑',
    bench: '长椅',
    chair: '椅子',
    couch: '沙发',
    door: '门',
    table: '桌子',
    guitar: '吉他',
    harp: '竖琴',
    piano: '钢琴',
    saxophone: '萨克斯',
    trumpet: '小号',
    violin: '小提琴',
    'alarm clock': '闹钟',
    bottle: '瓶子',
    candle: '蜡烛',
    cup: '杯子',
    eyeglasses: '眼镜',
    fan: '风扇',
    hat: '帽子',
    hourglass: '沙漏',
    shoe: '鞋子',
    spoon: '勺子',
    teapot: '茶壶',
    'teddy bear': '泰迪熊',
    umbrella: '雨伞',
    bread: '面包',
    hamburger: '汉堡',
    pizza: '披萨'
  };
  return Volume1;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iconselection-volume2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/iconselection-volume2.coff //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Challenges.Drawing.PixelArtReadability.IconSelection.Volume2 = function () {
  class Volume2 extends PAA.Challenges.Drawing.PixelArtReadability.IconSelection {
    static id() {
      return "PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.Volume2";
    }
    static displayName() {
      return "图标图形手册 — 自然";
    }
    static description() {
      return "更多可供选择的图标，用来完成这个挑战。";
    }
    static volumeNumber() {
      return 2;
    }
    static defaultUrl() {
      return 'the-graphics-book-of-icons-nature';
    }
    static coverIconsCounts() {
      return {
        8: 3,
        16: 2,
        32: 1
      };
    }
  }
  ;
  Volume2.initialize();
  Volume2.parts = {
    farmAndPets: {
      title: "农场里"
    },
    forest: {
      title: "林间"
    },
    air: {
      title: "空中"
    },
    water: {
      title: "水边"
    },
    wilderness: {
      title: "荒野"
    },
    ground: {
      title: "地面上"
    },
    fruit: {
      title: "水果"
    },
    plants: {
      title: "植物"
    }
  };
  Volume2.labels = {
    farmAndPets: ['cat', 'cow', 'dog', 'duck', 'horse', 'mouse', 'pig', 'rabbit', 'sheep'],
    forest: ['bear', 'hedgehog', 'raccoon', 'squirrel'],
    air: ['bat', 'bee', 'butterfly', 'owl', 'parrot'],
    water: ['crab', 'dolphin', 'fish', 'frog', 'lobster', 'penguin', 'shark', 'swan', 'turtle'],
    wilderness: ['camel', 'elephant', 'giraffe', 'kangaroo', 'lion', 'rhinoceros', 'tiger', 'zebra'],
    ground: ['ant', 'scorpion', 'snail', 'snake', 'spider'],
    fruit: ['apple', 'banana', 'pear', 'pineapple', 'strawberry'],
    plants: ['flower', 'mushroom', 'tree']
  };
  Volume2.translatedLabels = {
    cat: '猫',
    cow: '奶牛',
    dog: '狗',
    duck: '鸭子',
    horse: '马',
    mouse: '老鼠',
    pig: '猪',
    rabbit: '兔子',
    sheep: '绵羊',
    bear: '熊',
    hedgehog: '刺猬',
    raccoon: '浣熊',
    squirrel: '松鼠',
    bat: '蝙蝠',
    bee: '蜜蜂',
    butterfly: '蝴蝶',
    owl: '猫头鹰',
    parrot: '鹦鹉',
    crab: '螃蟹',
    dolphin: '海豚',
    fish: '鱼',
    frog: '青蛙',
    lobster: '龙虾',
    penguin: '企鹅',
    shark: '鲨鱼',
    swan: '天鹅',
    turtle: '乌龟',
    camel: '骆驼',
    elephant: '大象',
    giraffe: '长颈鹿',
    kangaroo: '袋鼠',
    lion: '狮子',
    rhinoceros: '犀牛',
    tiger: '老虎',
    zebra: '斑马',
    ant: '蚂蚁',
    scorpion: '蝎子',
    snail: '蜗牛',
    snake: '蛇',
    spider: '蜘蛛',
    apple: '苹果',
    banana: '香蕉',
    pear: '梨',
    pineapple: '菠萝',
    strawberry: '草莓',
    flower: '花',
    mushroom: '蘑菇',
    tree: '树'
  };
  return Volume2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/portfoliocomponent/portfol //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtReadability.IconSelection.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {
    constructor(iconSelection) {
      super(...arguments);
      this.iconSelection = iconSelection;
    }
    volumeNumber() {
      return this.iconSelection.constructor.volumeNumber();
    }
  }
  ;
  PortfolioComponent.register('PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/portfoliocomponent/templat //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.PortfolioComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.PortfolioComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.PortfolioComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-challenges-drawing-pixelartreadability-iconselection-portfoliocomponent volume-", Spacebars.mustache(view.lookup("volumeNumber")) ];
    }
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"customcomponent":{"customcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/customcomp //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, IconSelection, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
IconSelection = PAA.Challenges.Drawing.PixelArtReadability.IconSelection;
IconSelection.CustomComponent = function () {
  class CustomComponent extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent';
    }
    constructor(iconSelection) {
      super(...arguments);
      this.iconSelection = iconSelection;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(Artificial.Base.App);
      this.app.addComponent(this);
      this._dragTimeLeft = 0;

      // Controls whether the book is visible anywhere in the screen.
      this.bookVisible = new ReactiveField(false);

      // Controls whether the book should be displayed in the center of the table.
      this.bookDisplayed = new ReactiveField(false);
      this._wasActive = false;
      this.active = new ReactiveField(false);
      this.drawingApp = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
      this.currentPage = new ReactiveField(0);

      // Go to the right page based on the current asset.
      this.activeLabel = new ComputedField(() => {
        var icon, icons, label, labelEntry, parameter, ref, size;
        if (!(parameter = AB.Router.getParameter('parameter3'))) {
          return;
        }
        if (parameter === this.iconSelection.constructor.defaultUrl()) {
          return;
        }
        if (!(icons = PAA.Challenges.Drawing.PixelArtReadability.state('icons'))) {
          return;
        }
        for (label in icons) {
          labelEntry = icons[label];
          ref = labelEntry.sizes;
          for (size in ref) {
            icon = ref[size];
            if (icon.bitmapId === parameter) {
              return label;
            }
          }
        }
        return null;
      });
      return this.autorun(computation => {
        var activeLabel, j, len, page, pages, ref, results;
        if (!(activeLabel = this.activeLabel())) {
          return;
        }

        // Find the right page number for this icon.
        if (!(pages = (ref = this.drawingApp.portfolio().activeAsset()) != null ? ref.asset.pages : void 0)) {
          return;
        }
        results = [];
        for (j = 0, len = pages.length; j < len; j++) {
          page = pages[j];
          if (page) {
            if (page.label === activeLabel) {
              results.push(this.goToPage(page.pageNumber));
            } else {
              results.push(void 0);
            }
          }
        }
        return results;
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.audio.bookDrag(false);
      this.autorun(computation => {
        if (this.bookVisible()) {
          return Tracker.afterFlush(() => {
            if (!this.isRendered()) {
              return;
            }
            return this._bookOpen = this.$('.book-open')[0];
          });
        } else {
          return this._bookOpen = null;
        }
      });

      // Note: We have to limit reactivity for the bookDrag to trigger
      // correctly, so we precalculate editorActive to a boolean.
      this.editorActive = new ComputedField(() => {
        var editor;
        if (!(editor = this.drawingApp.editor())) {
          return;
        }
        if (!editor.isCreated()) {
          return;
        }
        return editor.active();
      });
      return this.autorun(computation => {
        var ref, shouldBeActive;
        shouldBeActive = this.drawingApp.activeAsset() != null;
        if (shouldBeActive && !this._wasActive) {
          // Start rendering the book in closed state.
          this.currentPage(0);
          this.bookVisible(true);
          this._resetActivateTimers();
          this._activeTimeout = Meteor.setTimeout(() => {
            // Fade in the component.
            this.active(true);
            // Move the book to the center of the table.
            return this.bookDisplayed(true);
          }, 100);
          this._bookDragTimeout = Meteor.setTimeout(() => {
            var ref;
            this.audio.bookDrag(true);
            if ((ref = this._dragWhenActiveAutorun) != null) {
              ref.stop();
            }
            return this._dragWhenActiveAutorun = Tracker.autorun(computation => {
              var editorActive;
              editorActive = this.editorActive();
              return Tracker.nonreactive(() => {
                this.audio.bookDrag(!editorActive);
                return this._dragTimeLeft = 1.5;
              });
            });
          }, 600);
        } else if (this._wasActive && !shouldBeActive) {
          // Stop controlling the book drag variable.
          if ((ref = this._dragWhenActiveAutorun) != null) {
            ref.stop();
          }

          // End any animation for selecting a reference.
          Meteor.clearTimeout(this._switchToBitmapTimeout);
          Meteor.clearTimeout(this._closeBookTimeout);
          // Close the book and move it from the table.
          this.currentPage(0);
          this.bookDisplayed(false);
          this.audio.bookDrag(false);
          // Fade out the component.
          this._resetActivateTimers();
          this._deactivateTimeout = Meteor.setTimeout(() => {
            return this.active(false);
          }, 500);

          // Stop rendering the book.
          this._hideTimeout = Meteor.setTimeout(() => {
            return this.bookVisible(false);
          }, 1000);
        }
        return this._wasActive = shouldBeActive;
      });
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      this.app.removeComponent(this);
      return (ref = this._dragWhenActiveAutorun) != null ? ref.stop() : void 0;
    }
    _resetActivateTimers() {
      Meteor.clearTimeout(this._activeTimeout);
      Meteor.clearTimeout(this._deactivateTimeout);
      Meteor.clearTimeout(this._bookDragTimeout);
      return Meteor.clearTimeout(this._hideTimeout);
    }
    _selectIcon(label, size) {
      var bitmapId;
      // See if we need to create the bitmap for this icon.
      if (!(bitmapId = this._getBitmapIdForIcon(label, size))) {
        PAA.Challenges.Drawing.PixelArtReadability.addIcon(label, size);
      }

      // Find out the icon's bitmap ID and go to the asset.
      return Tracker.autorun(computation => {
        if (!(bitmapId = this._getBitmapIdForIcon(label, size))) {
          return;
        }
        computation.stop();
        // Select the correct bitmap.
        AB.Router.changeParameters({
          parameter3: bitmapId
        });

        // Enter the editor after preview asset scale has been applied. Flushing waits for recomputation of the property.
        return Tracker.afterFlush(() => {
          // Additionally wait for the URL to change before adding the edit parameter.
          return Meteor.setTimeout(() => {
            return AB.Router.changeParameters({
              parameter3: bitmapId,
              parameter4: 'edit'
            });
          });
        });
      });
    }
    setPixelPadSize(drawingApp) {
      return drawingApp.setMaximumPixelPadSize({
        fullscreen: true
      });
    }
    onBackButton() {
      var currentPage;
      // Remove selected icon if needed.
      if (this.activeLabel()) {
        AB.Router.changeParameters({
          parameter3: this.iconSelection.constructor.defaultUrl(),
          parameter4: null
        });

        // Inform that we've handled the back button.
        return true;
      }
      if (!(currentPage = this.currentPage())) {
        return;
      }
      this.goToPage(currentPage > 1 ? 1 : 0);
      // Inform that we've handled the back button.
      return true;
    }
    goToPage(pageNumber) {
      var newPageNumber, pagesTurned, previousPageNumber;
      previousPageNumber = this.currentPage();
      // Current page refers to the page number on the left spread (or 0 on the cover), so we need to round it down.
      newPageNumber = Math.max(0, Math.floor((pageNumber - 1) / 2) * 2 + 1);
      if (newPageNumber === previousPageNumber) {
        return;
      }
      this.currentPage(newPageNumber);
      if (previousPageNumber === 0 && pageNumber === 1) {
        return this.audio.bookOpen();
      } else if (previousPageNumber === 1 && pageNumber === 0) {
        return this.audio.bookClose();
      } else {
        pagesTurned = Math.abs(newPageNumber - previousPageNumber);
        if (pagesTurned > 2) {
          return this.audio.turnPages();
        } else {
          return this.audio.turnPage();
        }
      }
    }
    activeClass() {
      if (this.active()) {
        return 'active';
      }
    }
    editorActiveClass() {
      return this.drawingApp.editorActiveClass();
    }
    onCoverClass() {
      if (!this.currentPage()) {
        return 'on-cover';
      }
    }
    bookDisplayedClass() {
      if (this.bookDisplayed()) {
        return 'displayed';
      }
    }
    bookOpenClass() {
      if (this.currentPage() > 0) {
        return 'open';
      }
    }
    volumeNumber() {
      return this.iconSelection.constructor.volumeNumber();
    }
    icons8() {
      return this.icons(8);
    }
    icons16() {
      return this.icons(16);
    }
    icons32() {
      return this.icons(32);
    }
    icons(size) {
      var count, j, number, ref, results;
      count = this.iconSelection.constructor.coverIconsCounts()[size];
      results = [];
      for (number = j = 1, ref = count; 1 <= ref ? j <= ref : j >= ref; number = 1 <= ref ? ++j : --j) {
        results.push({
          number: number,
          imageUrl: this.versionedUrl("/pixelartacademy/challenges/drawing/pixelartreadability/book-icon-".concat(this.volumeNumber(), "-").concat(size, "-").concat(number, ".png"))
        });
      }
      return results;
    }
    onTableOfContents() {
      return this.currentPage() <= 3;
    }
    tableOfContentsFullSpreadClass() {
      if (this.currentPage() === 1) {
        return 'full-spread';
      }
    }
    tableOfContentsPagesStyle() {
      return {
        left: "".concat(-(145 + 18) * (this.currentPage() - 1), "rem")
      };
    }
    tableOfContentsParts() {
      var contents, ref;
      if (!(contents = (ref = this.drawingApp.portfolio().activeAsset()) != null ? ref.asset.contents : void 0)) {
        return;
      }
      return _.values(contents);
    }
    iconEntrySizes() {
      return [{
        size: 8
      }, {
        size: 16
      }, {
        size: 32
      }];
    }
    iconStatusClass() {
      var iconData, icons, label, ref, size;
      if (!(icons = PAA.Challenges.Drawing.PixelArtReadability.state('icons'))) {
        return;
      }
      ({
        label,
        size
      } = this._getLabelAndSize());
      if (!(iconData = (ref = icons[label]) != null ? ref.sizes[size] : void 0)) {
        return;
      }
      if (iconData.completed) {
        return 'completed';
      }
      if (iconData.started) {
        return 'started';
      }
    }
    pageDataLeft() {
      return this.pageData(this.pageNumberLeft());
    }
    pageDataRight() {
      return this.pageData(this.pageNumberRight());
    }
    pageData(pageNumber) {
      var pages, ref;
      if (!(pages = (ref = this.drawingApp.portfolio().activeAsset()) != null ? ref.asset.pages : void 0)) {
        return;
      }
      return pages[pageNumber];
    }
    onPartTitle() {
      var pageData;
      pageData = this.currentData();
      return pageData.number && pageData.title;
    }
    onIconEntry() {
      var pageData;
      pageData = this.currentData();
      return pageData.iconNumber;
    }
    iconSection8() {
      return this.iconSection(8);
    }
    iconSection16() {
      return this.iconSection(16);
    }
    iconSection32() {
      return this.iconSection(32);
    }
    iconSection(size) {
      return {
        size
      };
    }
    binaryData(joinWithNewLine) {
      var byte, bytes;
      bytes = function () {
        var j, len, ref, results;
        ref = this._getBytes();
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          byte = ref[j];
          results.push(byte.toString(2).padStart(8, '0'));
        }
        return results;
      }.call(this);
      return this._joinBytes(bytes, joinWithNewLine);
    }
    decimalData(joinWithNewLine) {
      return this._joinBytes(this._getBytes(), joinWithNewLine);
    }
    hexadecimalData(joinWithNewLine) {
      var byte, bytes;
      bytes = function () {
        var j, len, ref, results;
        ref = this._getBytes();
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          byte = ref[j];
          results.push(byte.toString(16).padStart(2, '0'));
        }
        return results;
      }.call(this);
      return this._joinBytes(bytes, joinWithNewLine);
    }
    _getBytes() {
      var bitmap, byte, byteIndex, bytes, bytesCount, bytesPerRow, i, j, k, l, m, ref, ref1, ref2, results, size, x, xOffset, xStart, y;
      if (bitmap = this._getBitmapForCurrentIcon()) {
        bytesPerRow = bitmap.bounds.width / 8;
        bytes = [];
        for (y = j = 0, ref = bitmap.bounds.height; 0 <= ref ? j < ref : j > ref; y = 0 <= ref ? ++j : --j) {
          for (byteIndex = k = 0, ref1 = bytesPerRow; 0 <= ref1 ? k < ref1 : k > ref1; byteIndex = 0 <= ref1 ? ++k : --k) {
            xStart = byteIndex * 8;
            byte = 0;
            for (xOffset = l = 0; l < 8; xOffset = ++l) {
              x = xStart + xOffset;
              if (bitmap.getPixelForLayerAtCoordinates(0, x, y)) {
                byte += Math.pow(2, 7 - xOffset);
              }
            }
            bytes.push(byte);
          }
        }
        return bytes;
      } else {
        ({
          size
        } = this._getLabelAndSize());
        bytesCount = Math.pow(size, 2) / 8;
        results = [];
        for (i = m = 0, ref2 = bytesCount; 0 <= ref2 ? m < ref2 : m > ref2; i = 0 <= ref2 ? ++m : --m) {
          results.push(0);
        }
        return results;
      }
    }
    _joinBytes(bytes, joinWithNewLine) {
      return bytes.join(joinWithNewLine ? '<br/>' : ',<wbr>');
    }
    _getBitmapForCurrentIcon() {
      var label, size;
      ({
        label,
        size
      } = this._getLabelAndSize());
      return this._getBitmapForIcon(label, size);
    }
    _getBitmapForIcon(label, size) {
      var bitmapId;
      if (!(bitmapId = this._getBitmapIdForIcon(label, size))) {
        return;
      }
      return LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId);
    }
    _getBitmapIdForIcon(label, size) {
      var icons, ref, ref1;
      if (!(icons = PAA.Challenges.Drawing.PixelArtReadability.state('icons'))) {
        return;
      }
      return (ref = icons[label]) != null ? (ref1 = ref.sizes[size]) != null ? ref1.bitmapId : void 0 : void 0;
    }
    _getLabelAndSize() {
      var iconEntry, iconSection;
      iconSection = this.currentData();
      iconEntry = this.parentDataWith('label');
      return {
        label: iconEntry.label,
        size: iconSection.size
      };
    }
    pageNumberLeft() {
      return this.currentPage();
    }
    pageNumberRight() {
      return this.currentPage() + 1;
    }
    canMoveBack() {
      return this.currentPage() > 0;
    }
    canMoveForward() {
      var pages, ref;
      if (!(pages = (ref = this.drawingApp.portfolio().activeAsset()) != null ? ref.asset.pages : void 0)) {
        return;
      }
      return this.currentPage() < pages.length - 1;
    }
    update(appTime) {
      if (!(this._bookOpen && this._dragTimeLeft > 0)) {
        return;
      }
      this._dragTimeLeft -= appTime.elapsedAppTime;
      return this.audio.bookPan(PAA.PixelPad.Apps.Drawing.Editor.Desktop.compressPan(AEc.getPanForElement(this._bookOpen)));
    }
    events() {
      return super.events(...arguments).concat({
        'click .book-closed': this.onClickBookClosed,
        'click .next-page': this.onClickNextPage,
        'click .previous-page': this.onClickPreviousPage,
        'click .contents-part .title': this.onClickContentsPartTitle,
        'click .icon-entry': this.onClickIconEntry,
        'click .icon-section': this.onClickIconSection
      });
    }
    onClickBookClosed(event) {
      return this.goToPage(1);
    }
    onClickNextPage(event) {
      var currentPage;
      currentPage = this.currentPage();
      return this.goToPage(currentPage ? currentPage + 2 : 1);
    }
    onClickPreviousPage(event) {
      var currentPage;
      currentPage = this.currentPage();
      return this.goToPage(currentPage === 1 ? 0 : currentPage - 2);
    }
    onClickContentsPartTitle(event) {
      var contentsPart;
      contentsPart = this.currentData();
      return this.goToPage(contentsPart.titlePageNumber);
    }
    onClickIconEntry(event) {
      var iconEntry;
      iconEntry = this.currentData();
      return this.goToPage(iconEntry.pageNumber);
    }
    onClickIconSection(event) {
      var label, size;
      if (this.drawingApp.editor().active()) {
        return;
      }
      ({
        label,
        size
      } = this._getLabelAndSize());
      return this._selectIcon(label, size);
    }
  }
  ;
  CustomComponent.register(CustomComponent.id());
  CustomComponent.Audio = new LOI.Assets.Audio.Namespace(CustomComponent.id(), {
    variables: {
      bookPan: AEc.ValueTypes.Number,
      bookDrag: AEc.ValueTypes.Boolean,
      bookOpen: AEc.ValueTypes.Trigger,
      bookClose: AEc.ValueTypes.Trigger,
      turnPage: AEc.ValueTypes.Trigger,
      turnPages: AEc.ValueTypes.Trigger
    }
  });
  return CustomComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.customcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/template.c //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent", (function() {
  var view = this;
  return [ HTML.STYLE("\n    /* We don't need the clipboard. */\n    .pixelartacademy-pixelpad-apps-drawing-clipboard {\n      visibility: hidden;\n    }\n  "), "\n  ", HTML.DIV({
    class: function() {
      return [ "pixelartacademy-challenges-drawing-pixelartreadability-iconselection-customcomponent ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("onCoverClass")), " ", Spacebars.mustache(view.lookup("editorActiveClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("bookVisible"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "book-area ", Spacebars.mustache(view.lookup("bookDisplayedClass")), " ", Spacebars.mustache(view.lookup("bookOpenClass")), " volume-", Spacebars.mustache(view.lookup("volumeNumber")) ];
      }
    }, "\n        ", HTML.DIV({
      class: "book-closed"
    }, "\n          ", HTML.DIV({
      class: "titles"
    }, HTML.Raw('\n            <div class="academy">Retropolis 艺术学院</div>\n            <div class="series">电脑艺术系列</div>\n            <div class="main-title">\n              <div class="line-1">像素</div>\n              <div class="line-2">\n                <div class="outline">图标图形</div>\n                <div class="gradient">图标图形</div>\n              </div>\n              <div class="line-3">手册</div>\n            </div>\n            '), Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("volumeNumber"), 1);
    }, function() {
      return HTML.Raw('\n              <div class="pixeltosh emphasized">Pixeltosh 及更多</div>\n            ');
    }), "\n            ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("volumeNumber"), 2);
    }, function() {
      return HTML.Raw('\n              <div class="nature-area">\n                <div class="nature">自然</div>\n              </div>\n              <div class="special-edition emphasized">特别版</div>\n            ');
    }), HTML.Raw('\n            <div class="tagline">家用电脑即用图标</div>\n          ')), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("volumeNumber"), 1);
    }, function() {
      return HTML.Raw('\n            <div class="pixeltosh"></div>\n          ');
    }), "\n          ", HTML.DIV({
      class: "icons-examples"
    }, "\n            ", HTML.DIV({
      class: "size-section size-8"
    }, HTML.Raw('\n              <div class="size-label">8X8</div>\n              '), HTML.UL({
      class: "icons"
    }, "\n                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("icons8"));
    }, function() {
      return [ "\n                  ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "Icon"));
      }), "\n                " ];
    }), "\n              "), "\n            "), "\n            ", HTML.DIV({
      class: "size-section size-16"
    }, HTML.Raw('\n              <div class="size-label">16X16</div>\n              '), HTML.UL({
      class: "icons"
    }, "\n                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("icons16"));
    }, function() {
      return [ "\n                  ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "Icon"));
      }), "\n                " ];
    }), "\n              "), "\n            "), "\n            ", HTML.DIV({
      class: "size-section size-32"
    }, HTML.Raw('\n              <div class="size-label">32X32</div>\n              '), HTML.UL({
      class: "icons"
    }, "\n                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("icons32"));
    }, function() {
      return [ "\n                  ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "Icon"));
      }), "\n                " ];
    }), "\n              "), "\n            "), "\n          "), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("volumeNumber"), 2);
    }, function() {
      return HTML.Raw('\n            <div class="corner">\n              <div class="animals-area">\n                <div class="number">40</div>\n                <div class="animals">动物</div>\n              </div>\n              <div class="extra">+ 5 种水果</div>\n              <div class="extra">+ 3 种植物</div>\n            </div>\n          ');
    }), "\n        "), "\n        ", HTML.DIV({
      class: "book-open"
    }, "\n          ", HTML.DIV({
      class: "page left"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("onTableOfContents"));
    }, function() {
      return [ "\n              ", HTML.DIV({
        class: function() {
          return [ "table-of-contents ", Spacebars.mustache(view.lookup("tableOfContentsFullSpreadClass")) ];
        }
      }, "\n                ", HTML.DIV(HTML.Attrs({
        class: "pages"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("tableOfContentsPagesStyle"));
      }), HTML.Raw('\n                  <hgroup class="title">\n                    <h1>目录</h1>\n                    <h2>图标图形手册</h2>\n                  </hgroup>\n                  '), Blaze.Each(function() {
        return Spacebars.call(view.lookup("tableOfContentsParts"));
      }, function() {
        return [ "\n                    ", HTML.DIV({
          class: "contents-part"
        }, "\n                      ", HTML.DIV({
          class: "title"
        }, "第", Blaze.View("lookup:number", function() {
          return Spacebars.mustache(view.lookup("number"));
        }), "部分 - ", Blaze.View("lookup:title", function() {
          return Spacebars.mustache(view.lookup("title"));
        })), "\n                      ", HTML.OL({
          class: "icon-entries"
        }, "\n                        ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("iconEntries"));
        }, function() {
          return [ "\n                          ", HTML.LI({
            class: "icon-entry"
          }, "\n                            ", HTML.DIV({
            class: "info-area"
          }, "\n                              ", HTML.DIV({
            class: "info"
          }, "\n                                ", HTML.DIV({
            class: "name"
          }, Blaze.View("lookup:name", function() {
            return Spacebars.mustache(view.lookup("name"));
          })), "\n                                ", HTML.UL({
            class: "sizes"
          }, "\n                                  ", Blaze.Each(function() {
            return Spacebars.call(view.lookup("iconEntrySizes"));
          }, function() {
            return [ "\n                                    ", HTML.LI({
              class: function() {
                return [ "size ", Spacebars.mustache(view.lookup("iconStatusClass")) ];
              }
            }, "✔"), "\n                                  " ];
          }), "\n                                "), "\n                                ", HTML.DIV({
            class: "page-number"
          }, Blaze.View("lookup:pageNumber", function() {
            return Spacebars.mustache(view.lookup("pageNumber"));
          })), "\n                              "), "\n                            "), "\n                          "), "\n                        " ];
        }), "\n                      "), "\n                    "), "\n                  " ];
      }), "\n                "), "\n              "), "\n            " ];
    }), "\n            ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("pageDataLeft"));
    }, function() {
      return [ "\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("onIconEntry"));
      }, function() {
        return [ "\n                ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "IconPage"));
        }), "\n              " ];
      }), "\n            " ];
    }), "\n          "), "\n          ", HTML.DIV({
      class: "page right"
    }, "\n            ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("pageDataRight"));
    }, function() {
      return [ "\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("onPartTitle"));
      }, function() {
        return [ "\n                ", HTML.DIV({
          class: "part-title"
        }, "\n                  ", HTML.DIV({
          class: "number"
        }, "第", Blaze.View("lookup:number", function() {
          return Spacebars.mustache(view.lookup("number"));
        })), "\n                  ", HTML.DIV({
          class: "title"
        }, Blaze.View("lookup:title", function() {
          return Spacebars.mustache(view.lookup("title"));
        })), "\n                  ", HTML.OL({
          class: "icon-entries"
        }, "\n                    ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("iconEntries"));
        }, function() {
          return [ "\n                      ", HTML.LI({
            class: "icon-entry"
          }, Blaze.View("lookup:name", function() {
            return Spacebars.mustache(view.lookup("name"));
          })), "\n                    " ];
        }), "\n                  "), "\n                "), "\n              " ];
      }), "\n              ", Blaze.If(function() {
        return Spacebars.call(view.lookup("onIconEntry"));
      }, function() {
        return [ "\n                ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "IconPage"));
        }), "\n              " ];
      }), "\n            " ];
    }), "\n          "), "\n          ", HTML.DIV({
      class: "footer"
    }, "\n            ", HTML.DIV({
      class: "page-number left"
    }, Blaze.View("lookup:pageNumberLeft", function() {
      return Spacebars.mustache(view.lookup("pageNumberLeft"));
    })), "\n            ", HTML.DIV({
      class: "page-number right"
    }, Blaze.View("lookup:pageNumberRight", function() {
      return Spacebars.mustache(view.lookup("pageNumberRight"));
    })), "\n          "), "\n        "), "\n      "), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveBack"));
    }, function() {
      return HTML.Raw('\n        <button class="navigation-button previous-page"></button>\n      ');
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveForward"));
    }, function() {
      return HTML.Raw('\n        <button class="navigation-button next-page"></button>\n      ');
    }), "\n    " ];
  }), "\n  ") ];
}));

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.Icon");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.Icon"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.Icon", (function() {
  var view = this;
  return HTML.LI({
    class: function() {
      return [ "icon icon-", Spacebars.mustache(view.lookup("number")) ];
    }
  }, "\n    ", HTML.IMG({
    class: "placeholder",
    src: function() {
      return Spacebars.mustache(view.lookup("imageUrl"));
    }
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconPage");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconPage"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconPage", (function() {
  var view = this;
  return HTML.DIV({
    class: "icon-page"
  }, "\n    ", HTML.DIV({
    class: "title"
  }, "\n      ", HTML.DIV({
    class: "number"
  }, Blaze.View("lookup:iconNumber", function() {
    return Spacebars.mustache(view.lookup("iconNumber"));
  })), "\n      ", HTML.DIV({
    class: "name"
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n    "), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("iconSection8"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "icon-section size-8 ", Spacebars.mustache(view.lookup("iconStatusClass")) ];
      }
    }, HTML.Raw('\n        <div class="title">\n          <div class="size">8X8</div>\n          <div class="bytes">每行1字节</div>\n        </div>\n        '), HTML.DIV({
      class: "icon-area"
    }, "\n          ", HTML.DIV({
      class: "icon"
    }, "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), 8);
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "IconCanvas"));
      });
    }), "\n          "), "\n          ", HTML.DIV({
      class: "binary data-area"
    }, HTML.Raw('\n            <div class="title">二进制</div>\n            '), HTML.DIV({
      class: "data"
    }, Blaze.View("lookup:binaryData", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("binaryData"), true));
    })), "\n          "), "\n          ", HTML.DIV({
      class: "decimal data-area"
    }, HTML.Raw('\n            <div class="title">十进制</div>\n            '), HTML.DIV({
      class: "data"
    }, Blaze.View("lookup:decimalData", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("decimalData"), true));
    })), "\n          "), "\n          ", HTML.DIV({
      class: "hexadecimal data-area"
    }, HTML.Raw('\n            <div class="title">十六进制</div>\n            '), HTML.DIV({
      class: "data"
    }, Blaze.View("lookup:hexadecimalData", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("hexadecimalData"), true));
    })), "\n          "), "\n        "), "\n      "), "\n    " ];
  }), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("iconSection16"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "icon-section size-16 ", Spacebars.mustache(view.lookup("iconStatusClass")) ];
      }
    }, HTML.Raw('\n        <div class="title">\n          <div class="size">16X16</div>\n          <div class="bytes">每行2字节</div>\n        </div>\n        '), HTML.DIV({
      class: "icon-area"
    }, "\n          ", HTML.DIV({
      class: "icon"
    }, "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), 16);
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "IconCanvas"));
      });
    }), "\n          "), "\n          ", HTML.DIV({
      class: "decimal data-area"
    }, HTML.Raw('\n            <div class="title">数据</div>\n            '), HTML.DIV({
      class: "data"
    }, Blaze.View("lookup:decimalData", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("decimalData")));
    })), "\n          "), "\n        "), "\n      "), "\n    " ];
  }), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("iconSection32"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "icon-section size-32 ", Spacebars.mustache(view.lookup("iconStatusClass")) ];
      }
    }, HTML.Raw('\n        <div class="title">\n          <div class="size">32X32</div>\n          <div class="bytes">每行4字节</div>\n        </div>\n        '), HTML.DIV({
      class: "icon-area"
    }, "\n          ", HTML.DIV({
      class: "icon"
    }, "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), 32);
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Challenges", "Drawing", "PixelArtReadability", "IconSelection", "CustomComponent", "IconCanvas"));
      });
    }), "\n          "), "\n          ", HTML.DIV({
      class: "decimal data-area"
    }, HTML.Raw('\n            <div class="title">数据</div>\n            '), HTML.DIV({
      class: "data"
    }, Blaze.View("lookup:decimalData", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("decimalData")));
    })), "\n          "), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"iconcanvas":{"iconcanvas.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/iconcanvas //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconCanvas = function () {
  class IconCanvas extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconCanvas';
    }
    constructor(size) {
      super(...arguments);
      this.size = size;
    }
    onRendered() {
      var $canvas, canvas, context, displaySize, gridOpacity, iconPixelScale;
      super.onRendered(...arguments);
      $canvas = this.$('.canvas');
      canvas = $canvas[0];
      context = canvas.getContext('2d');
      iconPixelScale = this.constructor.pixelScaleForSize[this.size];
      displaySize = this.size * iconPixelScale;
      gridOpacity = this.constructor.gridOpacityForSize[this.size];
      this.bitmap = new ComputedField(() => {
        var bitmapId, iconEntry, icons, ref, ref1;
        if (!(iconEntry = this.parentDataWith('label'))) {
          return;
        }
        if (!(icons = PAA.Challenges.Drawing.PixelArtReadability.state('icons'))) {
          return;
        }
        if (!(bitmapId = (ref = icons[iconEntry.label]) != null ? (ref1 = ref.sizes[this.size]) != null ? ref1.bitmapId : void 0 : void 0)) {
          return;
        }
        return LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId);
      });

      // Redraw the canvas.
      return this.autorun(computation => {
        var bitmap, canvasPixelSize, gridlineNumber, i, j, offset, ref, ref1, results, x, y;
        canvasPixelSize = displaySize;
        canvas.width = canvasPixelSize;
        canvas.height = canvasPixelSize;
        if (gridOpacity) {
          context.strokeStyle = "rgba(202, 202, 202, ".concat(gridOpacity, ")");
          context.beginPath();
          for (gridlineNumber = i = 1, ref = this.size; 1 <= ref ? i <= ref : i >= ref; gridlineNumber = 1 <= ref ? ++i : --i) {
            offset = gridlineNumber * iconPixelScale - 0.5;
            context.moveTo(offset, 0);
            context.lineTo(offset, canvasPixelSize);
            context.moveTo(0, offset);
            context.lineTo(canvasPixelSize, offset);
          }
          context.stroke();
        }
        if (!(bitmap = this.bitmap())) {
          return;
        }
        context.fillStyle = 'rgb(64, 64, 64)';
        results = [];
        for (y = j = 0, ref1 = this.size; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          results.push(function () {
            var k, ref2, results1;
            results1 = [];
            for (x = k = 0, ref2 = this.size; 0 <= ref2 ? k < ref2 : k > ref2; x = 0 <= ref2 ? ++k : --k) {
              if (bitmap.getPixelForLayerAtCoordinates(0, x, y)) {
                results1.push(context.fillRect(x * iconPixelScale, y * iconPixelScale, iconPixelScale, iconPixelScale));
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          }.call(this));
        }
        return results;
      });
    }
  }
  ;
  IconCanvas.register(IconCanvas.id());
  IconCanvas.pixelScaleForSize = {
    8: 5,
    16: 2,
    32: 1
  };
  IconCanvas.gridOpacityForSize = {
    8: 1,
    16: 0.5,
    32: 0
  };
  return IconCanvas;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.iconcanvas.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/iconcanvas //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconCanvas");
Template["PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconCanvas"] = new Template("Template.PixelArtAcademy.Challenges.Drawing.PixelArtReadability.IconSelection.CustomComponent.IconCanvas", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-challenges-drawing-pixelartreadability-iconselection-customcomponent-iconcanvas">\n    <canvas class="canvas"></canvas>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-challenges/challenges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/referenceselection.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/pixelartsoftware.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/copyreference.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/assets.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/briefcomponent/briefcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/briefcomponent/template.briefcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/clipboardsecondpagecomponent/clipboardsecondpagecomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/clipboardsecondpagecomponent/template.clipboardsecondpagecomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/referenceselection.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/customcomponent/customcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/customcomponent/template.customcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartsoftware/referenceselection/customcomponent/card.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/pixelartlineart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/drawlineart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/assets.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/referenceselection.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/customcomponent/customcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartlineart/referenceselection/customcomponent/template.customcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/pixelartreadability.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/iconselection.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/iconselection-volume1.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/iconselection-volume2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/customcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/template.customcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/iconcanvas/iconcanvas.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-challenges/drawing/pixelartreadability/iconselection/customcomponent/iconcanvas/template.iconcanvas.js");

/* Exports */
Package._define("retronator:pixelartacademy-challenges", {
  PixelArtAcademy: PixelArtAcademy
});

})();
