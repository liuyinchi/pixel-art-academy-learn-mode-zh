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
var PixelArtAcademy = Package['retronator:pixelartacademy-practice'].PixelArtAcademy;
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
var __coffeescriptShare, action, alpha;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixeltosh-chess":{"chess.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/chess.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, LOI, PAA;
AE = Artificial.Everywhere;
AEc = Artificial.Echo;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.Chess = function () {
  class Chess extends PAA.Pixeltosh.Program {
    // boardDisplayType: enum whether the camera should be 2D or 3D
    // displayBoardCoordinates: boolean whether to display the files and ranks along the border of the board
    // autoPromotion: boolean whether to automatically promote a pawn to a queen
    // autoFlipBoard: boolean whether to automatically orient the board for the human player on turn
    // audioBoard: boolean whether to play board interaction sounds
    // audioVoice: boolean whether Pixeltosh should make spoken announcements
    // projectId2D: the project ID of the currently chosen 2D chess set
    // TODO: projectId3D: the project ID of the currently chosen 3D chess set
    // currency: number of currency the player has
    // ownedPieceTypeCounts: how many pieces did the player purchase
    //   {pieceType}: number of pieces of this type the player owns
    // pendingRewards: array of rewards that the player has not yet received
    //   id: identifier of the reward
    //   data: any additional data needed to display the reward or calculate its value
    // playStarted: boolean whether a full game was ever initiated
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess';
    }
    static version() {
      return '0.1.0';
    }
    static fullName() {
      return "国际象棋学院";
    }
    static description() {
      return "学习如何下国际象棋。";
    }
    static slug() {
      return 'chess';
    }
    static projectId2D() {
      return this.state('projectId2D') || this.Project.TwoDimensional.state('activeProjectId');
    }
    static projectId3D() {
      return this.state('projectId3D') || this.Project.ThreeDimensional.state('activeProjectId');
    }
    static currentProjectId() {
      switch (this.boardDisplayType()) {
        case this.BoardDisplayTypes.TwoDimensional:
          return this.projectId2D();
        case this.BoardDisplayTypes.ThreeDimensional:
          return this.projectId3D();
      }
    }
    static currentProject() {
      var projectId;
      if (!(projectId = this.currentProjectId())) {
        return;
      }
      return PAA.Practice.Project.documents.findOne(projectId);
    }

    // Helpers
    static ownedPiecesCount(pieceType) {
      var counts;
      counts = this.ownedPieceTypeCounts();
      if (pieceType) {
        return counts[pieceType] || 0;
      } else {
        return _.sum(_.values(counts));
      }
    }
    static activeAssetIsDrawn(pieceType, color) {
      switch (this.state('boardDisplayType')) {
        case this.BoardDisplayTypes.TwoDimensional:
          return this._assetIsDrawn2D(pieceType, color);
        case this.BoardDisplayTypes.ThreeDimensional:
          return this._assetIsDrawn3D(pieceType, color);
      }
    }
    static assetIsDrawnInEitherDimension(pieceType, color) {
      return this._assetIsDrawn2D(pieceType, color) || this._assetIsDrawn3D(pieceType, color);
    }
    static _assetIsDrawn2D(pieceType, color) {
      var assetId, project;
      if (!(project = PAA.Practice.Project.documents.findOne(this.projectId2D()))) {
        return;
      }
      assetId = Chess.Assets.TwoDimensional[pieceType][color].id();
      return this._assetIsDrawnInProject(project, assetId);
    }
    static _assetIsDrawn3D(pieceType, color) {
      var assetId, project;
      if (!(project = PAA.Practice.Project.documents.findOne(this.projectId3D()))) {
        return;
      }
      assetId = Chess.Assets.ThreeDimensional[pieceType][color].id();
      return this._assetIsDrawnInProject(project, assetId);
    }
    static _assetIsDrawnInProject(project, assetId) {
      var asset, bitmap;
      if (!(asset = _.find(project.assets, asset => {
        return asset.id === assetId;
      }))) {
        return;
      }
      if (!(bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId))) {
        return;
      }
      return bitmap.historyPosition;
    }
    static pawnAssetMissing() {
      if (!this.ownedPiecesCount(Chess.Piece.Types.Pawn)) {
        return;
      }
      return !this.activeAssetIsDrawn(Chess.Piece.Types.Pawn, Chess.Piece.Colors.White);
    }
    constructor() {
      super(...arguments);
      this.ownedPieceTypeCounts = this.constructor.ownedPieceTypeCounts;
      this.currency = this.constructor.currency;
      this.pendingRewards = this.constructor.pendingRewards;

      // Prepare all reactive fields.
      this.interfaceManager = new ReactiveField(null);
      this.gameManager = new ReactiveField(null);
      this.lessonManager = new ReactiveField(null);
      this.rewardsManager = new ReactiveField(null);
      this.audioManager = new ReactiveField(null);
    }
    load() {
      super.load(...arguments);
      // Initialize components.
      this.interfaceManager(new this.constructor.InterfaceManager(this));
      this.gameManager(new this.constructor.GameManager(this));
      this.lessonManager(new this.constructor.LessonManager(this));
      this.rewardsManager(new this.constructor.RewardsManager(this));
      this.audioManager(new this.constructor.AudioManager(this));

      // Subscribe to the macintosh palette.
      return this._macintoshPaletteSubscription = LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Macintosh);
    }
    unload() {
      var ref, ref1, ref2, ref3, ref4;
      if ((ref = this.interfaceManager()) != null) {
        ref.destroy();
      }
      if ((ref1 = this.gameManager()) != null) {
        ref1.destroy();
      }
      if ((ref2 = this.lessonManager()) != null) {
        ref2.destroy();
      }
      if ((ref3 = this.rewardsManager()) != null) {
        ref3.destroy();
      }
      if ((ref4 = this.audioManager()) != null) {
        ref4.destroy();
      }
      this.interfaceManager(null);
      this.gameManager(null);
      this.lessonManager(null);
      this.rewardsManager(null);
      this.audioManager(null);
      return this._macintoshPaletteSubscription.stop();
    }
    onBackButton() {
      var interfaceManager;
      // Going back closes the shop.
      interfaceManager = this.interfaceManager();
      if (interfaceManager.shopIsOpen()) {
        interfaceManager.closeShop();
        // Inform that we've handled the back button.
        return true;
      }

      // Going back returns to the menu.
      if (!interfaceManager.inMenu()) {
        interfaceManager.enterScreen(this.constructor.InterfaceManager.Screens.Menu);

        // Inform that we've handled the back button.
        return true;
      }
    }
    menuItems() {
      return this.constructor.Interface.createMenuItems();
    }
    shortcuts() {
      return this.constructor.Interface.createShortcuts();
    }
  }
  ;
  Chess.register(Chess.id());
  Chess.initialize();

  // State fields
  Chess.BoardDisplayTypes = {
    TwoDimensional: 'TwoDimensional',
    ThreeDimensional: 'ThreeDimensional'
  };
  Chess.ChessboardThemes = {
    Newspaper: 'Newspaper',
    Light: 'Light',
    Contrast: 'Contrast',
    Dark: 'Dark'
  };
  Chess.InterfaceThemes = {
    Light: 'Light',
    Dark: 'Dark'
  };
  Chess.DrawTypes = {
    Stalemate: 'Stalemate',
    FiftyMoveRule: 'FiftyMoveRule',
    InsufficientMaterial: 'InsufficientMaterial',
    ThreefoldRepetition: 'ThreefoldRepetition'
  };
  Chess.boardDisplayType = Chess.state.field('boardDisplayType', {
    default: Chess.BoardDisplayTypes.TwoDimensional
  });
  Chess.displayBoardCoordinates = Chess.state.field('displayBoardCoordinates', {
    default: false
  });
  Chess.autoPromotion = Chess.state.field('autoPromotion', {
    default: false
  });
  Chess.autoFlipBoard = Chess.state.field('autoFlipBoard', {
    default: true
  });
  Chess.audioBoard = Chess.state.field('audioBoard', {
    default: true
  });
  Chess.audioVoice = Chess.state.field('audioVoice', {
    default: true
  });
  Chess.currency = Chess.state.field('currency', {
    default: 0
  });
  Chess.ownedPieceTypeCounts = Chess.state.field('ownedPieceTypeCounts', {
    default: {}
  });
  Chess.pendingRewards = Chess.state.field('pendingRewards', {
    default: []
  });
  Chess.Audio = new LOI.Assets.Audio.Namespace(Chess.id(), {
    variables: {
      pickUp: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      drop: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      capture: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      promote: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 100
      },
      enabled: AEc.ValueTypes.Boolean
    }
  });
  return Chess;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assets":{"assets.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/assets/assets.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, Chess, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
Chess.Assets = function () {
  class Assets {}
  ;
  Assets.Asset = class Asset extends PAA.Practice.Project.Asset.Bitmap {
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Macintosh;
    }
    static backgroundColor() {
      return new THREE.Color('#edddb5');
    }
    static briefComponentClass() {
      return Chess.Assets.BriefComponent;
    }
    static availablePublications() {
      return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard'];
    }
    static copySourceAssets() {
      // Override if you can copy this asset's art from another asset.
      return [];
    }
    static projectClass() {
      throw new AE.NotImplementedException("Asset must specify which project class it belongs to.");
    }
    static async addToProject(projectId) {
      var assetId, bitmapData, bitmapId, creationTime, dimensions, height, macintoshPalette, width;
      assetId = this.id();

      // Load the Macintosh palette.
      macintoshPalette = await new Promise(resolve => {
        return Tracker.autorun(computation => {
          var palette;
          LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Macintosh);
          if (!(palette = LOI.Assets.Palette.documents.findOne({
            name: LOI.Assets.Palette.SystemPaletteNames.Macintosh
          }))) {
            return;
          }
          computation.stop();
          return resolve(palette);
        });
      });

      // Create the bitmap.
      creationTime = new Date();
      dimensions = this.fixedDimensions();
      width = dimensions.width;
      height = dimensions.height;
      bitmapData = {
        versioned: true,
        profileId: LOI.adventure.profileId(),
        creationTime: creationTime,
        lastEditTime: creationTime,
        name: this.displayName(),
        bounds: {
          fixed: true,
          left: 0,
          right: width - 1,
          top: 0,
          bottom: height - 1
        },
        pixelFormat: new LOI.Assets.Bitmap.PixelFormat('flags', 'paletteColor'),
        palette: {
          _id: macintoshPalette._id
        }
      };
      bitmapId = LOI.Assets.Bitmap.documents.insert(bitmapData);

      // Add the bitmap to the project assets.
      return PAA.Practice.Project.documents.update(projectId, {
        $push: {
          assets: {
            id: assetId,
            type: this.type(),
            bitmapId: bitmapId
          }
        },
        $set: {
          lastEditTime: creationTime
        }
      });
    }
    async solve() {
      var imageFileName, imageUrl, pixels;
      // Load the default image.
      imageFileName = this.id().toLowerCase().split('.').slice(-2).join('-');
      imageUrl = "/pixelartacademy/pixeltosh/programs/chess/".concat(imageFileName, ".png");
      pixels = await new Promise(resolve => {
        var imagePixels;
        imagePixels = new TutorialBitmap.Resource.ImagePixels(imageUrl, {
          palette: () => {
            return LOI.Assets.Palette.documents.findOne({
              name: LOI.Assets.Palette.SystemPaletteNames.Macintosh
            });
          }
        });
        return Tracker.autorun(computation => {
          if (!imagePixels.ready()) {
            return;
          }
          computation.stop();
          return resolve(imagePixels.pixels());
        });
      });
      return this._setPixels(pixels);
    }
    _setPixels(pixels, action) {
      var addLayerAction, assetId, bitmap, layerAddress, strokeAction;
      assetId = this.id();
      bitmap = this.bitmap();
      layerAddress = [0];
      if (action == null) {
        action = new AM.Document.Versioning.Action(assetId);
      }
      if (!bitmap.getLayer([0])) {
        addLayerAction = new LOI.Assets.Bitmap.Actions.AddLayer(assetId, bitmap, []);
        AM.Document.Versioning.executePartialAction(bitmap, addLayerAction);
        action.append(addLayerAction);
      }
      strokeAction = new LOI.Assets.Bitmap.Actions.Stroke(assetId, bitmap, layerAddress, pixels);
      AM.Document.Versioning.executePartialAction(bitmap, strokeAction);
      action.append(strokeAction);
      return AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, action, new Date());
    }
  };
  Assets.TwoDimensional = function () {
    class TwoDimensional {}
    ;
    TwoDimensional.Asset = class Asset extends Assets.Asset {
      static fixedDimensions() {
        return {
          width: 20,
          height: 20
        };
      }
      static projectClass() {
        return Chess.Project.TwoDimensional;
      }
    };
    TwoDimensional.Pawn = function () {
      class Pawn {}
      ;
      Pawn.White = function () {
        class White extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Pawn.White';
          }
          static displayName() {
            return "White pawn";
          }
          static description() {
            return "最简单的国际象棋棋子。\n\n绘制时，请考虑它在棋盘白格和黑格上的显示效果。你可以在国际象棋学院的“主题”菜单中更改格子外观。";
          }
          static unlockedPublications() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard'];
          }
          static unlockedPublicationParts() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard.Print'];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Pawn.Black = function () {
        class Black extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Pawn.Black';
          }
          static displayName() {
            return "Black pawn";
          }
          static description() {
            return "兵棋子的黑色版本。\n\n你可以使用下方选项复制白兵图稿作为起点，然后改变颜色或明暗，使棋子呈现黑色。";
          }
          static copySourceAssets() {
            return [Pawn.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Pawn;
    }.call(this);
    TwoDimensional.Knight = function () {
      class Knight {}
      ;
      Knight.White = function () {
        class White extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Knight.White';
          }
          static displayName() {
            return "White knight";
          }
          static description() {
            return "走日字的棋子，通常以马的造型表示。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [TwoDimensional.Pawn.White, TwoDimensional.Bishop.White, TwoDimensional.Rook.White, TwoDimensional.Queen.White, TwoDimensional.King.White];
          }
          static unlockedPublicationParts() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard.ComputerChess'];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Knight.Black = function () {
        class Black extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Knight.Black';
          }
          static displayName() {
            return "Black knight";
          }
          static description() {
            return "马棋子的黑色版本。\n\n你可以使用下方选项复制白马的底稿。";
          }
          static copySourceAssets() {
            return [Knight.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Knight;
    }.call(this);
    TwoDimensional.Bishop = function () {
      class Bishop {}
      ;
      Bishop.White = function () {
        class White extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Bishop.White';
          }
          static displayName() {
            return "White bishop";
          }
          static description() {
            return "沿对角线移动的棋子，通常以尖顶作为特征。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [TwoDimensional.Pawn.White, TwoDimensional.Knight.White, TwoDimensional.Rook.White, TwoDimensional.Queen.White, TwoDimensional.King.White];
          }
          static unlockedPublicationParts() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard.ComputerChess'];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Bishop.Black = function () {
        class Black extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Bishop.Black';
          }
          static displayName() {
            return "Black bishop";
          }
          static description() {
            return "象棋子的黑色版本。\n\n你可以使用下方选项复制白象的底稿。";
          }
          static copySourceAssets() {
            return [Bishop.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Bishop;
    }.call(this);
    TwoDimensional.Rook = function () {
      class Rook {}
      ;
      Rook.White = function () {
        class White extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Rook.White';
          }
          static displayName() {
            return "White rook";
          }
          static description() {
            return "沿直线移动的棋子，通常描绘成塔楼。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [TwoDimensional.Pawn.White, TwoDimensional.Knight.White, TwoDimensional.Bishop.White, TwoDimensional.Queen.White, TwoDimensional.King.White];
          }
          static unlockedPublicationParts() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard.ComputerChess'];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Rook.Black = function () {
        class Black extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Rook.Black';
          }
          static displayName() {
            return "Black rook";
          }
          static description() {
            return "车棋子的黑色版本。\n\n你可以使用下方选项复制白车的底稿。";
          }
          static copySourceAssets() {
            return [Rook.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Rook;
    }.call(this);
    TwoDimensional.Queen = function () {
      class Queen {}
      ;
      Queen.White = function () {
        class White extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Queen.White';
          }
          static displayName() {
            return "White queen";
          }
          static description() {
            return "国际象棋中威力最强的棋子，通常以王冠造型表示。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [TwoDimensional.Pawn.White, TwoDimensional.Knight.White, TwoDimensional.Bishop.White, TwoDimensional.Rook.White, TwoDimensional.King.White];
          }
          static unlockedPublicationParts() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard.ComputerChess'];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Queen.Black = function () {
        class Black extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.Queen.Black';
          }
          static displayName() {
            return "Black queen";
          }
          static description() {
            return "后棋子的黑色版本。\n\n你可以使用下方选项复制白后的底稿。";
          }
          static copySourceAssets() {
            return [Queen.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Queen;
    }.call(this);
    TwoDimensional.King = function () {
      class King {}
      ;
      King.White = function () {
        class White extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.King.White';
          }
          static displayName() {
            return "White king";
          }
          static description() {
            return "需要避免被将死的棋子，最常见的特征是王冠上的十字。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [TwoDimensional.Pawn.White, TwoDimensional.Knight.White, TwoDimensional.Bishop.White, TwoDimensional.Rook.White, TwoDimensional.Queen.White];
          }
          static unlockedPublicationParts() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard.ComputerChess'];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      King.Black = function () {
        class Black extends TwoDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.TwoDimensional.King.Black';
          }
          static displayName() {
            return "Black king";
          }
          static description() {
            return "王棋子的黑色版本。\n\n你可以使用下方选项复制白王的底稿。";
          }
          static copySourceAssets() {
            return [King.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return King;
    }.call(this);
    return TwoDimensional;
  }.call(this);
  Assets.ThreeDimensional = function () {
    class ThreeDimensional {}
    ;
    ThreeDimensional.Asset = class Asset extends Assets.Asset {
      static fixedDimensions() {
        return {
          width: 16,
          height: 16
        };
      }
      static projectClass() {
        return Chess.Project.ThreeDimensional;
      }
    };
    ThreeDimensional.Pawn = function () {
      class Pawn {}
      ;
      Pawn.White = function () {
        class White extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Pawn.White';
          }
          static displayName() {
            return "White pawn";
          }
          static description() {
            return "最简单的国际象棋棋子。\n\n绘制时，请考虑它在棋盘白格和黑格上的显示效果。你可以在国际象棋学院的“主题”菜单中更改格子外观。";
          }
          static unlockedPublications() {
            return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.SixtyFourSquares.ArtOfTheBoard'];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Pawn.Black = function () {
        class Black extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Pawn.Black';
          }
          static displayName() {
            return "Black pawn";
          }
          static description() {
            return "兵棋子的黑色版本。\n\n你可以使用下方选项复制白兵图稿作为起点，然后改变颜色或明暗，使棋子呈现黑色。";
          }
          static copySourceAssets() {
            return [Pawn.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Pawn;
    }.call(this);
    ThreeDimensional.Knight = function () {
      class Knight {}
      ;
      Knight.White = function () {
        class White extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Knight.White';
          }
          static displayName() {
            return "White knight";
          }
          static description() {
            return "走日字的棋子，通常以马的造型表示。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [ThreeDimensional.Pawn.White, ThreeDimensional.Bishop.White, ThreeDimensional.Rook.White, ThreeDimensional.Queen.White, ThreeDimensional.King.White];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Knight.Black = function () {
        class Black extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Knight.Black';
          }
          static displayName() {
            return "Black knight";
          }
          static description() {
            return "马棋子的黑色版本。\n\n你可以使用下方选项复制白马的底稿。";
          }
          static copySourceAssets() {
            return [Knight.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Knight;
    }.call(this);
    ThreeDimensional.Bishop = function () {
      class Bishop {}
      ;
      Bishop.White = function () {
        class White extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Bishop.White';
          }
          static displayName() {
            return "White bishop";
          }
          static description() {
            return "沿对角线移动的棋子，通常以尖顶作为特征。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [ThreeDimensional.Pawn.White, ThreeDimensional.Knight.White, ThreeDimensional.Rook.White, ThreeDimensional.Queen.White, ThreeDimensional.King.White];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Bishop.Black = function () {
        class Black extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Bishop.Black';
          }
          static displayName() {
            return "Black bishop";
          }
          static description() {
            return "象棋子的黑色版本。\n\n你可以使用下方选项复制白象的底稿。";
          }
          static copySourceAssets() {
            return [Bishop.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Bishop;
    }.call(this);
    ThreeDimensional.Rook = function () {
      class Rook {}
      ;
      Rook.White = function () {
        class White extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Rook.White';
          }
          static displayName() {
            return "White rook";
          }
          static description() {
            return "沿直线移动的棋子，通常描绘成塔楼。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [ThreeDimensional.Pawn.White, ThreeDimensional.Knight.White, ThreeDimensional.Bishop.White, ThreeDimensional.Queen.White, ThreeDimensional.King.White];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Rook.Black = function () {
        class Black extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Rook.Black';
          }
          static displayName() {
            return "Black rook";
          }
          static description() {
            return "车棋子的黑色版本。\n\n你可以使用下方选项复制白车的底稿。";
          }
          static copySourceAssets() {
            return [Rook.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Rook;
    }.call(this);
    ThreeDimensional.Queen = function () {
      class Queen {}
      ;
      Queen.White = function () {
        class White extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Queen.White';
          }
          static displayName() {
            return "White queen";
          }
          static description() {
            return "国际象棋中威力最强的棋子，通常以王冠造型表示。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [ThreeDimensional.Pawn.White, ThreeDimensional.Knight.White, ThreeDimensional.Bishop.White, ThreeDimensional.Rook.White, ThreeDimensional.King.White];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      Queen.Black = function () {
        class Black extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.Queen.Black';
          }
          static displayName() {
            return "Black queen";
          }
          static description() {
            return "后棋子的黑色版本。\n\n你可以使用下方选项复制白后的底稿。";
          }
          static copySourceAssets() {
            return [Queen.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return Queen;
    }.call(this);
    ThreeDimensional.King = function () {
      class King {}
      ;
      King.White = function () {
        class White extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.King.White';
          }
          static displayName() {
            return "White king";
          }
          static description() {
            return "需要避免被将死的棋子，最常见的特征是王冠上的十字。\n\n你可以使用下方选项，从其他白色棋子复制底稿。";
          }
          static copySourceAssets() {
            return [ThreeDimensional.Pawn.White, ThreeDimensional.Knight.White, ThreeDimensional.Bishop.White, ThreeDimensional.Rook.White, ThreeDimensional.Queen.White];
          }
        }
        ;
        White.initialize();
        return White;
      }.call(this);
      King.Black = function () {
        class Black extends ThreeDimensional.Asset {
          static id() {
            return 'PixelArtAcademy.Pixeltosh.Programs.Chess.ThreeDimensional.King.Black';
          }
          static displayName() {
            return "Black king";
          }
          static description() {
            return "王棋子的黑色版本。\n\n你可以使用下方选项复制白王的底稿。";
          }
          static copySourceAssets() {
            return [King.White];
          }
        }
        ;
        Black.initialize();
        return Black;
      }.call(this);
      return King;
    }.call(this);
    return ThreeDimensional;
  }.call(this);
  return Assets;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"briefcomponent":{"briefcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/assets/briefcomponent/briefcomponent.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LOI, PAA;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Assets.BriefComponent = function () {
  class BriefComponent extends PAA.Practice.Project.Asset.Bitmap.BriefComponent {
    onCreated() {
      super.onCreated(...arguments);
      this.workbenchSituation = new ComputedField(() => {
        var options;
        options = {
          timelineId: LOI.adventure.currentTimelineId(),
          location: PAA.Practice.Project.Workbench
        };
        if (!options.timelineId) {
          return;
        }
        return new LOI.Adventure.Situation(options);
      });
      return this.projects = new ComputedField(() => {
        var workbenchSituation;
        if (!(workbenchSituation = this.workbenchSituation())) {
          return;
        }
        return workbenchSituation.things();
      });
    }
    copySourceAssets() {
      var project, projectClass, sourceAssetClasses;
      sourceAssetClasses = this.bitmap.constructor.copySourceAssets();
      if (!sourceAssetClasses.length) {
        return [];
      }
      projectClass = this.bitmap.constructor.projectClass();
      project = _.find(this.projects(), function (project) {
        return project instanceof projectClass;
      });
      return _.filter(project.assets(), asset => {
        return _.find(sourceAssetClasses, sourceAssetClass => {
          return asset instanceof sourceAssetClass;
        });
      });
    }
    events() {
      return super.events(...arguments).concat({
        'click .copy-button': this.onClickCopyButton
      });
    }
    onClickCopyButton(event) {
      var action, addReferenceAction, destinationBitmap, i, j, k, layer, len, pixels, ref, ref1, ref2, reference, sourceAsset, sourceBitmap, x, y;
      sourceAsset = this.currentData();
      sourceBitmap = sourceAsset.bitmap();
      layer = sourceBitmap.layers[0];
      destinationBitmap = this.bitmap.bitmap();
      action = new AM.Document.Versioning.Action(this.bitmap.id());
      if (sourceBitmap.references) {
        ref = sourceBitmap.references;
        for (i = 0, len = ref.length; i < len; i++) {
          reference = ref[i];
          if (_.find(destinationBitmap.references, existingReference => {
            return existingReference.image.url === reference.image.url;
          })) {
            continue;
          }
          addReferenceAction = new LOI.Assets.VisualAsset.Actions.AddReferenceByUrl(this.bitmap.id(), destinationBitmap, reference.image.url, reference);
          AM.Document.Versioning.executePartialAction(destinationBitmap, addReferenceAction);
          action.append(addReferenceAction);
        }
      }
      pixels = [];
      for (x = j = 0, ref1 = layer.width; 0 <= ref1 ? j < ref1 : j > ref1; x = 0 <= ref1 ? ++j : --j) {
        for (y = k = 0, ref2 = layer.height; 0 <= ref2 ? k < ref2 : k > ref2; y = 0 <= ref2 ? ++k : --k) {
          pixels.push(layer.getPixel(x, y) || {
            x,
            y
          });
        }
      }
      return this.bitmap._setPixels(pixels, action);
    }
  }
  ;
  BriefComponent.register('PixelArtAcademy.Pixeltosh.Programs.Chess.Assets.BriefComponent');
  return BriefComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.briefcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/assets/briefcomponent/template.briefcomponent.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Assets.BriefComponent");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Assets.BriefComponent"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Assets.BriefComponent", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.call(view.lookup("bitmap"));
  }, function() {
    return [ "\n    ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Practice", "Project", "Asset", "Bitmap", "BriefComponent", "Properties"));
    }), "\n    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("noActions"));
    }, function() {
      return [ "\n      ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Practice", "Project", "Asset", "Bitmap", "BriefComponent", "NoActions"));
      }), "\n    " ];
    }, function() {
      return [ "\n      ", HTML.UL({
        class: "actions"
      }, "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Practice", "Project", "Asset", "Bitmap", "BriefComponent", "DefaultActions"));
      }), "\n        ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("copySourceAssets"));
      }, function() {
        return [ "\n          ", HTML.LI({
          class: "action"
        }, "\n            ", HTML.BUTTON({
          class: "button copy-button"
        }, "Copy ", Blaze.View("lookup:displayName", function() {
          return Spacebars.mustache(view.lookup("displayName"));
        })), "\n          "), "\n        " ];
      }), "\n      "), "\n    " ];
    }), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"project.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/project.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, Chess, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Project = class Project extends PAA.Practice.Project.Thing {
  // Project document fields
  // interfaceTheme: enum, which theme to display the program interface in when this project is active
  // chessboardTheme: enum, which theme to display the chessboard in when this project is active
  static program() {
    return Chess;
  }
  constructor() {
    super(...arguments);
    this._assets = {};
    this._assetsUpdatedDependency = new Tracker.Dependency();
    this.autorun(computation => {
      var activeProjectId, asset, assetClass, assetId, i, len, project, ref, ref1;
      activeProjectId = this.constructor.state('activeProjectId');
      project = PAA.Practice.Project.documents.findOne(activeProjectId);
      if (!project) {
        return;
      }
      ref = project.assets;
      for (i = 0, len = ref.length; i < len; i++) {
        asset = ref[i];
        if (!!this._assets[asset.id]) {
          continue;
        }
        assetClass = PAA.Practice.Project.Asset.getClassForId(asset.id);
        this._assets[asset.id] = Tracker.nonreactive(() => {
          return new assetClass(this);
        });
      }
      ref1 = this._assets;
      for (assetId in ref1) {
        asset = ref1[assetId];
        if (!!_.find(project.assets, projectAsset => {
          return projectAsset.id === assetId;
        })) {
          continue;
        }
        asset.destroy();
        delete this._assets[assetId];
      }
      return this._assetsUpdatedDependency.changed();
    });
  }
  destroy() {
    var asset, assetId, ref, results;
    super.destroy(...arguments);
    ref = this._assets;
    results = [];
    for (assetId in ref) {
      asset = ref[assetId];
      results.push(asset.destroy());
    }
    return results;
  }
  assets() {
    this._assetsUpdatedDependency.depend();
    return _.values(this._assets);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project-startend.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/project-startend.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Chess, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Project = class Project extends Chess.Project {
  static start() {
    var creationTime, profileId, projectId;
    if (this.state('activeProjectId')) {
      // Make sure the player doesn't have an already active project.
      throw new AE.InvalidOperationException("Profile already has an active ".concat(this.fullName(), " project."));
    }
    profileId = LOI.adventure.profileId();
    creationTime = new Date();

    // Create the project with the six standard piece types.
    projectId = PAA.Practice.Project.documents.insert({
      startTime: creationTime,
      lastEditTime: creationTime,
      type: this.id(),
      profileId: profileId,
      assets: []
    });

    // Write the project ID into profile's game state.
    return this.state('activeProjectId', projectId);
  }
  static end() {
    var endTime, projectId;
    // Make sure the player has an active project.
    projectId = this.state('activeProjectId');
    if (!projectId) {
      throw new AE.InvalidOperationException("Profile does not have an active ".concat(this.fullName(), " project."));
    }

    // End the project.
    endTime = new Date();
    PAA.Practice.Project.documents.update(projectId, {
      $set: {
        endTime: endTime,
        lastEditTime: endTime
      }
    });

    // Remove project ID from profile's game state.
    return this.state('activeProjectId', null);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project-2d3d.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/project-2d3d.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, Chess, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Project.TwoDimensional = function () {
  class TwoDimensional extends Chess.Project {
    // activeProjectId: ID of the project that is currently active
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Project.TwoDimensional';
    }
    static fullName() {
      return "2D 国际象棋";
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.TwoDimensional);
    }
  }
  ;
  TwoDimensional.initialize();
  return TwoDimensional;
}.call(this);
Chess.Project.ThreeDimensional = function () {
  class ThreeDimensional extends Chess.Project {
    // activeProjectId: ID of the project that is currently active
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Project.ThreeDimensional';
    }
    static fullName() {
      return "3D 国际象棋";
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Chess.ThreeDimensional);
    }
  }
  ;
  ThreeDimensional.initialize();
  return ThreeDimensional;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"square.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/square.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA, fileIndex, i, j, rankIndex, square;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Square = function () {
  class Square {
    static getName(fileIndex, rankIndex) {
      return "".concat(this.FileLetters[fileIndex]).concat(this.RankNumbers[rankIndex]);
    }
    constructor(fileIndex1, rankIndex1) {
      this.fileIndex = fileIndex1;
      this.rankIndex = rankIndex1;
      this.name = this.constructor.getName(this.fileIndex, this.rankIndex);
      this.engineName = this.name.toUpperCase();
      this.color = (this.fileIndex + this.rankIndex) % 2 ? this.constructor.Colors.Light : this.constructor.Colors.Dark;
    }
    manhattanDistanceTo(square) {
      return Math.abs(this.fileIndex - square.fileIndex) + Math.abs(this.rankIndex - square.rankIndex);
    }
  }
  ;
  Square.FileLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  Square.RankNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  Square.Colors = {
    Light: 'Light',
    Dark: 'Dark'
  };
  return Square;
}.call(this);
for (fileIndex = i = 0; i < 8; fileIndex = ++i) {
  Chess.Square[fileIndex] = [];
  for (rankIndex = j = 0; j < 8; rankIndex = ++j) {
    square = new Chess.Square(fileIndex, rankIndex);
    Chess.Square[fileIndex][rankIndex] = square;
    Chess.Square[square.name] = square;
    Chess.Square[square.engineName] = square;
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"move.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/move.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Move = class Move {
  static fromEngine(engineMove) {
    var fromSquareName, toSquareName;
    for (fromSquareName in engineMove) {
      toSquareName = engineMove[fromSquareName];
      return new this(Chess.Square[fromSquareName], Chess.Square[toSquareName]);
    }
  }
  constructor(from, to, promotionPieceType) {
    this.from = from;
    this.to = to;
    this.promotionPieceType = promotionPieceType;
  }
  manhattanDistance() {
    return Math.abs(this.from.fileIndex - this.to.fileIndex) + Math.abs(this.from.rankIndex - this.to.rankIndex);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"piece.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/piece.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Piece = function () {
  class Piece {
    static fromLetter(letter) {
      var color, lowerCaseLetter, type;
      if (!letter) {
        return null;
      }
      lowerCaseLetter = letter.toLowerCase();
      color = letter === lowerCaseLetter ? this.Colors.Black : this.Colors.White;
      type = this.TypesForLetter[lowerCaseLetter];
      return new this(color, type);
    }
    static getLetter(color, type) {
      var letter;
      letter = this.TypeLetters[type];
      if (color === this.Colors.White) {
        letter = letter.toUpperCase();
      }
      return letter;
    }
    constructor(color1, type1) {
      this.color = color1;
      this.type = type1;
      this.letter = this.constructor.getLetter(this.color, this.type);
    }
  }
  ;
  Piece.Colors = {
    White: 'White',
    Black: 'Black'
  };
  Piece.AllColors = _.values(Piece.Colors);
  Piece.Types = {
    Pawn: 'Pawn',
    Knight: 'Knight',
    Bishop: 'Bishop',
    Rook: 'Rook',
    Queen: 'Queen',
    King: 'King'
  };
  Piece.AllTypes = _.values(Piece.Types);
  Piece.PromotionTypes = [Piece.Types.Knight, Piece.Types.Bishop, Piece.Types.Rook, Piece.Types.Queen];
  Piece.TypeLetters = {
    Pawn: 'p',
    Knight: 'n',
    Bishop: 'b',
    Rook: 'r',
    Queen: 'q',
    King: 'k'
  };
  Piece.TypesForLetter = {
    p: Piece.Types.Pawn,
    n: Piece.Types.Knight,
    b: Piece.Types.Bishop,
    r: Piece.Types.Rook,
    q: Piece.Types.Queen,
    k: Piece.Types.King
  };
  Piece.InfoForType = {
    Pawn: {
      value: 1,
      requiredCount: 8
    },
    Knight: {
      value: 3,
      requiredCount: 2
    },
    Bishop: {
      value: 3,
      requiredCount: 2
    },
    Rook: {
      value: 5,
      requiredCount: 2
    },
    Queen: {
      value: 9,
      requiredCount: 1
    },
    King: {
      value: 10,
      requiredCount: 1
    }
  };
  return Piece;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"gamestate.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/gamestate.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, ChessEngine, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
ChessEngine = require('js-chess-engine');
Chess.GameState = class GameState {
  static getEmptyData() {
    return {
      turn: 'white',
      pieces: {},
      castling: {},
      halfMove: 0,
      fullMove: 1
    };
  }
  static fromPosition(position) {
    var pieceLetter, pieces, squareName;
    pieces = {};
    for (squareName in position) {
      pieceLetter = position[squareName];
      pieces[squareName.toUpperCase()] = pieceLetter;
    }
    return new this(_.extend(this.getEmptyData(), {
      pieces
    }));
  }
  constructor(data1) {
    this.data = data1;
  }
  getPositionKey() {
    var castling, key, pieceLetter, pieces, ref, squareName, value;
    if (this._positionKey) {
      return this._positionKey;
    }
    pieces = function () {
      var ref, results;
      ref = this.data.pieces;
      results = [];
      for (squareName in ref) {
        pieceLetter = ref[squareName];
        results.push("".concat(squareName, ":").concat(pieceLetter));
      }
      return results;
    }.call(this);
    pieces.sort();
    castling = [];
    ref = this.data.castling;
    for (key in ref) {
      value = ref[key];
      castling.push("".concat(key, ":").concat(value));
    }
    castling.sort();
    return this._positionKey = [pieces.join(','), this.data.turn, castling.join(','), this.data.enPassant || ''].join('|');
  }
  turn() {
    if (this.data.turn === 'white') {
      return Chess.Piece.Colors.White;
    } else {
      return Chess.Piece.Colors.Black;
    }
  }
  setTurn(color) {
    this.data.turn = color.toLowerCase();
    return this._engineMoves = null;
  }
  check() {
    return this.data.check;
  }
  checkmate() {
    return this.data.checkMate;
  }
  stalemate() {
    return this.data.staleMate;
  }
  finished() {
    return this.data.isFinished;
  }
  halfMove() {
    return this.data.halfMove;
  }
  enPassantSquare() {
    if (this.data.enPassant) {
      return Chess.Square[this.data.enPassant];
    }
  }
  occupiedSquares() {
    var results, squareName;
    results = [];
    for (squareName in this.data.pieces) {
      results.push(Chess.Square[squareName]);
    }
    return results;
  }
  occupiedSquaresOfColor(color) {
    return _.filter(this.occupiedSquares(), square => {
      return this.getPieceAtSquare(square).color === color;
    });
  }
  occupiedSquaresByPiecesOfColor(pieceType, color) {
    return _.filter(this.occupiedSquares(), square => {
      var piece;
      piece = this.getPieceAtSquare(square);
      return piece.type === pieceType && piece.color === color;
    });
  }
  isSquareOccupied(square) {
    return this.data.pieces[square.engineName];
  }
  isSquareOccupiedByMe(square) {
    var piece;
    if (!(piece = this.getPieceAtSquare(square))) {
      return;
    }
    return piece.color === this.turn();
  }
  isSquareOccupiedByOpponent(square) {
    var opponentColor, piece;
    if (!(piece = this.getPieceAtSquare(square))) {
      return;
    }
    opponentColor = this.data.turn === 'white' ? Chess.Piece.Colors.Black : Chess.Piece.Colors.White;
    return piece.color === opponentColor;
  }
  getPieceAtSquare(square) {
    return Chess.Piece.fromLetter(this.data.pieces[square.engineName]);
  }
  hasPieceAtSquare(piece, square) {
    return this.data.pieces[square.engineName] === (piece != null ? piece.letter : void 0);
  }
  getPieces() {
    var pieceLetter, ref, results, squareName;
    ref = this.data.pieces;
    results = [];
    for (squareName in ref) {
      pieceLetter = ref[squareName];
      results.push(Chess.Piece.fromLetter(pieceLetter));
    }
    return results;
  }
  getPiecesOfColor(color) {
    return _.filter(this.getPieces(), piece => {
      return piece.color === color;
    });
  }
  getPiecesOfTypeAndColor(pieceType, color) {
    return _.filter(this.getPieces(), piece => {
      return piece.type === pieceType && piece.color === color;
    });
  }
  hasSamePiecePlacementAs(gameState) {
    return _.isEqual(this.data.pieces, gameState.data.pieces);
  }
  getLegalDestinationsFromSquare(square) {
    var engineMoves, i, len, piece, ref, results, squareName;
    if (engineMoves = this._getEngineMoves()) {
      if (!engineMoves[square.engineName]) {
        return [];
      }
      ref = engineMoves[square.engineName];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        squareName = ref[i];
        results.push(Chess.Square[squareName]);
      }
      return results;
    } else {
      // The state is not a valid chess position so we have to calculate the moves ourselves.
      if (!(piece = this.getPieceAtSquare(square))) {
        return [];
      }
      switch (piece.type) {
        case Chess.Piece.Types.Pawn:
          return this._getLegalPawnMovesFromSquare(square);
        case Chess.Piece.Types.Knight:
          return this._getLegalKnightMovesFromSquare(square);
        case Chess.Piece.Types.Bishop:
          return this._getLegalBishopMovesFromSquare(square);
        case Chess.Piece.Types.Rook:
          return this._getLegalRookMovesFromSquare(square);
        case Chess.Piece.Types.Queen:
          return this._getLegalQueenMovesFromSquare(square);
        case Chess.Piece.Types.King:
          return this._getLegalKingMovesFromSquare(square);
      }
    }
  }
  getLegalMoves() {
    var engineMoves, fromSquare, fromSquareName, i, j, k, len, len1, len2, ref, ref1, toSquare, toSquareName, toSquareNames;
    if (this._moves) {
      return this._moves;
    }
    this._moves = [];
    if (engineMoves = this._getEngineMoves()) {
      for (fromSquareName in engineMoves) {
        toSquareNames = engineMoves[fromSquareName];
        for (i = 0, len = toSquareNames.length; i < len; i++) {
          toSquareName = toSquareNames[i];
          this._moves.push(new Chess.Move(Chess.Square[fromSquareName], Chess.Square[toSquareName]));
        }
      }
    } else {
      ref = this.occupiedSquaresOfColor(this.turn());
      for (j = 0, len1 = ref.length; j < len1; j++) {
        fromSquare = ref[j];
        ref1 = this.getLegalDestinationsFromSquare(fromSquare);
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          toSquare = ref1[k];
          this._moves.push(new Chess.Move(fromSquare, toSquare));
        }
      }
    }
    return this._moves;
  }
  aiMove(level) {
    return Chess.Move.fromEngine(ChessEngine.aiMove(this.data, level));
  }
  _getEngineMoves() {
    var error;
    if (this._engineMoves != null) {
      return this._engineMoves;
    }
    try {
      return this._engineMoves = ChessEngine.moves(this.data);
    } catch (error1) {
      error = error1;
      return this._engineMoves = false;
    }
  }
  applyMove(move) {
    var capturedPawnSquare, data, enPassantRankIndex, piece, pieceType, ref;
    try {
      data = ChessEngine.move(this.data, move.from.engineName, move.to.engineName);
      // JS Chess Engine automatically promotes pawns to queens, so we have to override the piece.
      if (move.promotionPieceType) {
        piece = this.getPieceAtSquare(move.from);
        data.pieces[move.to.engineName] = Chess.Piece.getLetter(piece.color, move.promotionPieceType);
      }
      // Stateless call to move doesn't update checkmate and stalemate automatically, so we have to do it ourselves.
      if (!_.keys(ChessEngine.moves(data)).length) {
        if (data.check) {
          data.checkMate = true;
        } else {
          data.staleMate = true;
        }
        data.isFinished = true;
      }
      return new this.constructor(data);
    } catch (error1) {
      // The state is not a valid chess position so we have to calculate the new state ourselves.
      data = _.cloneDeep(this.data);
      piece = this.getPieceAtSquare(move.from);
      // Handle en passant capture.
      delete data.enPassant;
      if (piece.type === Chess.Piece.Types.Pawn && move.to === this.enPassantSquare()) {
        capturedPawnSquare = Chess.Square[move.to.fileIndex][move.from.rankIndex];
        delete data.pieces[capturedPawnSquare.engineName];
      }
      // Move the piece to the new square.
      if (piece.type === Chess.Piece.Types.Pawn && ((ref = move.to.rankIndex) === 0 || ref === 7)) {
        pieceType = move.promotionPieceType || Chess.Piece.Types.Queen;
        data.pieces[move.to.engineName] = Chess.Piece.getLetter(piece.color, pieceType);
      } else {
        data.pieces[move.to.engineName] = data.pieces[move.from.engineName];
      }
      delete data.pieces[move.from.engineName];
      // Add en passant possibility.
      if (piece.type === Chess.Piece.Types.Pawn && Math.abs(move.to.rankIndex - move.from.rankIndex) === 2) {
        enPassantRankIndex = (move.from.rankIndex + move.to.rankIndex) / 2;
        data.enPassant = Chess.Square[move.from.fileIndex][enPassantRankIndex].engineName;
      }
      // Change side.
      data.turn = data.turn === 'white' ? 'black' : 'white';
      return new this.constructor(data);
    }
  }
  startPromotion(move) {
    var data;
    // We create a simple copy with the pawn moved to the last rank.
    data = _.cloneDeep(this.data);
    data.pieces[move.to.engineName] = data.pieces[move.from.engineName];
    delete data.pieces[move.from.engineName];
    return new this.constructor(data);
  }
  hasInsufficientMaterial() {
    var color, i, j, k, l, len, len1, len2, len3, len4, len5, m, minorPieces, n, pieceType, pieces, ref, ref1, ref2, ref3, ref4, ref5, square;
    pieces = {};
    ref = Chess.Piece.AllColors;
    for (i = 0, len = ref.length; i < len; i++) {
      color = ref[i];
      pieces[color] = {};
      ref1 = Chess.Piece.AllTypes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        pieceType = ref1[j];
        pieces[color][pieceType] = this.occupiedSquaresByPiecesOfColor(pieceType, color);
      }
    }
    // Insufficient material only applies to legal positions with both kings on the board.
    if (!pieces[Chess.Piece.Colors.White][Chess.Piece.Types.King].length) {
      return;
    }
    if (!pieces[Chess.Piece.Colors.Black][Chess.Piece.Types.King].length) {
      return;
    }
    ref2 = Chess.Piece.AllColors;
    // Pawns, rooks, and queens can always provide mating material.
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      color = ref2[k];
      if (pieces[color][Chess.Piece.Types.Pawn].length) {
        return;
      }
      if (pieces[color][Chess.Piece.Types.Rook].length) {
        return;
      }
      if (pieces[color][Chess.Piece.Types.Queen].length) {
        return;
      }
    }
    minorPieces = [];
    ref3 = Chess.Piece.AllColors;
    for (l = 0, len3 = ref3.length; l < len3; l++) {
      color = ref3[l];
      ref4 = pieces[color][Chess.Piece.Types.Bishop];
      for (m = 0, len4 = ref4.length; m < len4; m++) {
        square = ref4[m];
        minorPieces.push({
          type: Chess.Piece.Types.Bishop,
          square
        });
      }
      ref5 = pieces[color][Chess.Piece.Types.Knight];
      for (n = 0, len5 = ref5.length; n < len5; n++) {
        square = ref5[n];
        minorPieces.push({
          type: Chess.Piece.Types.Knight
        });
      }
    }
    if (minorPieces.length <= 1) {
      // A single bishop or knight cannot force a checkmate.
      return true;
    }

    // Same-colored bishops cannot force a checkmate.
    if (minorPieces.length === 2 && minorPieces[0].type === Chess.Piece.Types.Bishop && minorPieces[1].type === Chess.Piece.Types.Bishop) {
      return minorPieces[0].square.color === minorPieces[1].square.color;
    }
    return false;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"gamestate-moves.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/gamestate-moves.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA, _allDirections, _diagonalDirections, _knightOffsets, _straightDirections;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
_knightOffsets = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
_diagonalDirections = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
_straightDirections = [[1, 0], [0, -1], [-1, 0], [0, 1]];
_allDirections = _diagonalDirections.concat(_straightDirections);
Chess.GameState = class GameState extends Chess.GameState {
  _getLegalPawnMovesFromSquare(square) {
    var direction, doubleSquare, enPassantSquare, homeRank, leftCaptureSquare, moves, nextSquare, piece, ref, ref1, rightCaptureSquare;
    piece = this.getPieceAtSquare(square);
    direction = piece.color === Chess.Piece.Colors.White ? 1 : -1;
    moves = [];
    nextSquare = Chess.Square[square.fileIndex][square.rankIndex + direction];
    if (nextSquare && !this.isSquareOccupied(nextSquare)) {
      moves.push(nextSquare);
      homeRank = piece.color === Chess.Piece.Colors.White ? 1 : 6;
      if (square.rankIndex === homeRank) {
        doubleSquare = Chess.Square[square.fileIndex][square.rankIndex + 2 * direction];
        if (doubleSquare && !this.isSquareOccupied(doubleSquare)) {
          moves.push(doubleSquare);
        }
      }
    }
    leftCaptureSquare = (ref = Chess.Square[square.fileIndex - 1]) != null ? ref[square.rankIndex + direction] : void 0;
    if (leftCaptureSquare && this.isSquareOccupiedByOpponent(leftCaptureSquare)) {
      moves.push(leftCaptureSquare);
    }
    rightCaptureSquare = (ref1 = Chess.Square[square.fileIndex + 1]) != null ? ref1[square.rankIndex + direction] : void 0;
    if (rightCaptureSquare && this.isSquareOccupiedByOpponent(rightCaptureSquare)) {
      moves.push(rightCaptureSquare);
    }
    if (enPassantSquare = this.enPassantSquare()) {
      if (enPassantSquare.rankIndex === square.rankIndex + direction && Math.abs(enPassantSquare.fileIndex - square.fileIndex) === 1) {
        moves.push(enPassantSquare);
      }
    }
    return moves;
  }
  _getLegalKnightMovesFromSquare(square) {
    var i, len, moves, offset, ref, targetSquare;
    moves = [];
    for (i = 0, len = _knightOffsets.length; i < len; i++) {
      offset = _knightOffsets[i];
      if (!(targetSquare = (ref = Chess.Square[square.fileIndex + offset[0]]) != null ? ref[square.rankIndex + offset[1]] : void 0)) {
        continue;
      }
      if (this.isSquareOccupiedByMe(targetSquare)) {
        continue;
      }
      moves.push(targetSquare);
    }
    return moves;
  }
  _getLegalBishopMovesFromSquare(square) {
    return this._getLegalSlidingPieceMovesFromSquare(square, _diagonalDirections);
  }
  _getLegalRookMovesFromSquare(square) {
    return this._getLegalSlidingPieceMovesFromSquare(square, _straightDirections);
  }
  _getLegalQueenMovesFromSquare(square) {
    return this._getLegalSlidingPieceMovesFromSquare(square, _allDirections);
  }
  _getLegalSlidingPieceMovesFromSquare(square, directions) {
    var direction, distance, i, len, moves, ref, targetSquare;
    moves = [];
    for (i = 0, len = directions.length; i < len; i++) {
      direction = directions[i];
      distance = 1;
      while (true) {
        targetSquare = (ref = Chess.Square[square.fileIndex + direction[0] * distance]) != null ? ref[square.rankIndex + direction[1] * distance] : void 0;
        if (!targetSquare) {
          break;
        }
        if (this.isSquareOccupiedByMe(targetSquare)) {
          break;
        }
        moves.push(targetSquare);
        if (this.isSquareOccupiedByOpponent(targetSquare)) {
          break;
        }
        distance++;
      }
    }
    return moves;
  }
  _getLegalKingMovesFromSquare(square) {
    var direction, i, len, moves, ref, targetSquare;
    moves = [];
    for (i = 0, len = _allDirections.length; i < len; i++) {
      direction = _allDirections[i];
      targetSquare = (ref = Chess.Square[square.fileIndex + direction[0]]) != null ? ref[square.rankIndex + direction[1]] : void 0;
      if (!targetSquare) {
        continue;
      }
      if (this.isSquareOccupiedByMe(targetSquare)) {
        continue;
      }
      moves.push(targetSquare);
    }
    return moves;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/instructions.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Chess, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Instructions = function () {
  class Instructions {}
  ;
  Instructions.Instruction = class Instruction extends PAA.Pixeltosh.Instructions.Instruction {
    static getChess() {
      var os, program;
      if (!(os = PAA.PixelPad.Apps.Pixeltosh.getOS())) {
        return;
      }
      program = os.activeProgram();
      if (!(program instanceof Chess)) {
        return;
      }
      return program;
    }
  };
  Instructions.UnavailableBoardDisplayType = class UnavailableBoardDisplayType extends Instructions.Instruction {
    static boardDisplayType() {
      throw new AE.NotImplementedException("You have to specify which board display type this instruction checks.");
    }
    static activeConditions() {
      var boardDisplayChoice, chess, ref;
      if (!(chess = this.getChess())) {
        return;
      }

      // Show when the board display choice is unavailable.
      if (!(boardDisplayChoice = (ref = chess.interfaceManager()) != null ? ref.getBoardDisplayChoice() : void 0)) {
        return;
      }
      if (boardDisplayChoice.choiceIsAvailable()) {
        return;
      }
      return boardDisplayChoice.choice() === this.boardDisplayType();
    }
    bodyClass() {
      return PAA.Pixeltosh.Instructions.BodyClasses.Exclamation;
    }
    faceClass() {
      return PAA.Pixeltosh.Instructions.FaceClasses.Thoughtful;
    }
  };
  Instructions.Unavailable2DBoardDisplayType = function () {
    class Unavailable2DBoardDisplayType extends Instructions.UnavailableBoardDisplayType {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Chess.Instructions.Unavailable2DBoardDisplayType";
      }
      static boardDisplayType() {
        return Chess.BoardDisplayTypes.TwoDimensional;
      }
      static message() {
        return "2D 棋盘尚未解锁。完成“像素艺术基础：尺寸”目标即可解锁。";
      }
    }
    ;
    Unavailable2DBoardDisplayType.initialize();
    return Unavailable2DBoardDisplayType;
  }.call(this);
  Instructions.Unavailable3DBoardDisplayType = function () {
    class Unavailable3DBoardDisplayType extends Instructions.UnavailableBoardDisplayType {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Chess.Instructions.Unavailable3DBoardDisplayType";
      }
      static boardDisplayType() {
        return Chess.BoardDisplayTypes.ThreeDimensional;
      }
      static message() {
        return "3D 棋盘目前尚未解锁。\n\n以后完成“艺术元素：形体”后即可解锁。";
      }
    }
    ;
    Unavailable3DBoardDisplayType.initialize();
    return Unavailable3DBoardDisplayType;
  }.call(this);
  Instructions.PawnAssetMissing = function () {
    class PawnAssetMissing extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Chess.Instructions.PawnAssetMissing";
      }
      static activeConditions() {
        var chess;
        if (!(chess = this.getChess())) {
          return;
        }
        return Chess.pawnAssetMissing();
      }
      static message() {
        return "糟糕！游戏缺少兵的精灵图！你可以在绘画应用中绘制它。";
      }
      static delayDuration() {
        return 2;
      }
      faceClass() {
        return PAA.Pixeltosh.Instructions.FaceClasses.OhNo;
      }
      customClass() {
        return 'pixelartacademy-pixeltosh-programs-chess-instructions-wide';
      }
    }
    ;
    PawnAssetMissing.initialize();
    return PawnAssetMissing;
  }.call(this);
  Instructions.RepeatLessons = function () {
    class RepeatLessons extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Chess.Instructions.RepeatLessons";
      }
      static message() {
        return "每节课程都可以重复一次，以获得更多货币。";
      }
      static activeConditions() {
        var categories, category, chess, currency, i, interfaceManager, j, len, len1, lesson, lessonManager, ownedCount, pieceInfo, pieceType, ref, requiredCount;
        if (!(chess = this.getChess())) {
          return;
        }
        if (!(interfaceManager = chess.interfaceManager())) {
          return;
        }
        if (!(interfaceManager.inMenu() && interfaceManager.shopIsOpen())) {
          return;
        }
        if (!(lessonManager = chess.lessonManager())) {
          return;
        }
        categories = lessonManager.availableCategories();
        // See if we have any available lessons that haven't been completed yet.
        for (i = 0, len = categories.length; i < len; i++) {
          category = categories[i];
          ref = category.lessons;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            lesson = ref[j];
            if (lesson.available() && !lesson.completedCount()) {
              return;
            }
          }
        }

        // See if we can afford to buy another piece.
        currency = Chess.currency();
        for (pieceType in Chess.Piece.Types) {
          ownedCount = Chess.ownedPiecesCount(pieceType);
          pieceInfo = Chess.Piece.InfoForType[pieceType];
          requiredCount = pieceInfo.requiredCount;
          if (ownedCount === requiredCount) {
            continue;
          }
          // This is the cheapest needed piece. Show instruction if we can't cover its value.
          return currency < pieceInfo.value;
        }
      }
      bodyClass() {
        return PAA.Pixeltosh.Instructions.BodyClasses.Exclamation;
      }
      faceClass() {
        return PAA.Pixeltosh.Instructions.FaceClasses.Thoughtful;
      }
      customClass() {
        return 'pixelartacademy-pixeltosh-programs-chess-instructions-narrow';
      }
    }
    ;
    RepeatLessons.initialize();
    return RepeatLessons;
  }.call(this);
  Instructions.ChangeTheme = function () {
    class ChangeTheme extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Chess.Instructions.ChangeTheme";
      }
      static message() {
        return "你可以在“主题”菜单中更改棋盘外观。";
      }
      static activeConditions() {
        var chess, interfaceManager, project;
        // Don't show if you've changed any of the themes.
        if (project = Chess.currentProject()) {
          if (project.interfaceTheme || project.chessboardTheme) {
            return;
          }
        }

        // Show in the menu when you've completed 3 pawn lessons.
        if (!(chess = this.getChess())) {
          return;
        }
        if (!(interfaceManager = chess.interfaceManager())) {
          return;
        }
        if (!interfaceManager.inMenu()) {
          return;
        }
        return Chess.Lessons.Categories.Pawn.completedLessonsCount() === 3;
      }
      static delayDuration() {
        return 1;
      }
      bodyClass() {
        return PAA.Pixeltosh.Instructions.BodyClasses.Exclamation;
      }
      faceClass() {
        return PAA.Pixeltosh.Instructions.FaceClasses.Thoughtful;
      }
    }
    ;
    ChangeTheme.initialize();
    return ChangeTheme;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reward.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/reward.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Chess, LOI, PAA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Reward = function () {
  class Reward {
    static getClasses() {
      return this._rewardClasses;
    }

    // ID string for this reward used to identify the reward in code.
    static id() {
      throw new AE.NotImplementedException("You must specify reward's id.");
    }

    // String to represent the reward in the UI. Note that we can't use
    // 'name' since it's an existing property holding the class name.
    static displayName() {
      throw new AE.NotImplementedException("You must specify the reward name.");
    }
    static value(data) {
      throw new AE.NotImplementedException("You must specify how much currency a reward earns.");
    }
    static initialize() {
      this._rewardClasses.push(this);
      this.stateAddress = new LOI.StateAddress("things.".concat(this.id()));
      this.state = new LOI.StateObject({
        address: this.stateAddress
      });

      // On the server, after document observers are started, perform initialization.
      if (Meteor.isServer) {
        return Document.startup(() => {
          var i, len, property, ref, results, translationNamespace;
          if (Meteor.settings.startEmpty) {
            return;
          }

          // Create this reward's translated names.
          translationNamespace = this.id();
          ref = ['displayName'];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            property = ref[i];
            results.push(AB.createTranslation(translationNamespace, property, this[property]()));
          }
          return results;
        });
      }
    }
    constructor(rewardsManager) {
      var translationNamespace;
      this.rewardsManager = rewardsManager;
      this.stateAddress = this.constructor.stateAddress;
      this.state = this.constructor.state;

      // Subscribe to this reward's translations.
      translationNamespace = this.id();
      this._translationSubscription = AB.subscribeNamespace(translationNamespace);
    }
    destroy() {
      return this._translationSubscription.stop();
    }
    id() {
      return this.constructor.id();
    }
    value(data) {
      return this.constructor.value();
    }
    displayName() {
      return AB.translate(this._translationSubscription, 'displayName').text;
    }
    displayNameTranslation() {
      return AB.translation(this._translationSubscription, 'displayName');
    }
    onLessonCompleted() {} // Override to perform any rewarding logic when a lesson is completed.

    reward(data) {
      var pendingRewards, reward;
      reward = {
        id: this.id()
      };
      if (data) {
        reward.data = data;
      }
      pendingRewards = Chess.pendingRewards();
      pendingRewards.push(reward);
      return Chess.pendingRewards(pendingRewards);
    }
  }
  ;
  Reward._rewardClasses = [];
  return Reward;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interfacemanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interfacemanager.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, Chess, LOI, PAA;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.InterfaceManager = function () {
  class InterfaceManager {
    constructor(chess) {
      var i, layouts, len, menuTabs, ref, tab;
      this.chess = chess;
      this.flippedBoard = new ReactiveField(false);
      this.screen = new ReactiveField(this.constructor.Screens.Menu);
      this.windowId = this.chess.os.addWindow(Chess.Interface.createInterfaceData());
      this._shopWindowId = new ReactiveField(null);
      this._boardDisplayChoiceWindowId = new ReactiveField(null);
      this._earningsWindowId = new ReactiveField(null);

      // Reactively change the interface layout.
      layouts = Chess.Interface.createLayoutsData(this);
      menuTabs = {};
      ref = layouts[Chess.Interface.Layouts.Menu].remainingArea.remainingArea.tabs;
      for (i = 0, len = ref.length; i < len; i++) {
        tab = ref[i];
        menuTabs[tab.name.toLowerCase()] = tab;
      }
      this.window = new AE.LiveComputedField(() => {
        return this.chess.os.interface.getWindow(this.windowId);
      }, (a, b) => {
        return a === b;
      });
      this._layoutAutorun = this.chess.autorun(computation => {
        var layout, ownedPiecesCount, tabs, window;
        if (!(window = this.window())) {
          return;
        }
        switch (this.screen()) {
          case this.constructor.Screens.Menu:
            ownedPiecesCount = Chess.ownedPiecesCount();
            if (ownedPiecesCount) {
              layout = layouts[Chess.Interface.Layouts.Menu];
              tabs = [_.cloneDeep(menuTabs.lessons)];

              // Play is available once you have 16 pieces and king lessons are completed.
              if (ownedPiecesCount === 16 && Chess.Lessons.Categories.King.completed()) {
                tabs.push(_.cloneDeep(menuTabs.play));
              }
              // Persist active tab across reflows.
              Tracker.nonreactive(() => {
                var activeIndex, currentLayout, ref1, ref2;
                currentLayout = window.data().get('contentArea');
                activeIndex = _.findIndex(currentLayout != null ? (ref1 = currentLayout.remainingArea) != null ? (ref2 = ref1.remainingArea) != null ? ref2.tabs : void 0 : void 0 : void 0, tab => {
                  return tab.active;
                });
                return tabs[activeIndex >= 0 ? activeIndex : 0].active = true;
              });
              layout.remainingArea.remainingArea.tabs = tabs;
            } else {
              layout = layouts[Chess.Interface.Layouts.MenuIntro];
            }
            break;
          case this.constructor.Screens.Lesson:
            layout = layouts[Chess.Interface.Layouts.Lesson];
            break;
          case this.constructor.Screens.Play:
            layout = layouts[Chess.Interface.Layouts.Play];
        }
        return Tracker.nonreactive(() => {
          return window.data().set('contentArea', layout);
        });
      });
      this._themeAutorun = this.chess.autorun(computation => {
        var layoutData, styleClass, windows;
        layoutData = this.chess.os.interface.currentLayoutData();
        windows = layoutData.get('windows');
        styleClass = "".concat(_.kebabCase(this.interfaceTheme()), "-interface");
        return Tracker.nonreactive(() => {
          var chessWindows, j, len1, window;
          chessWindows = _.filter(windows, window => {
            return window.programId === Chess.id();
          });
          for (j = 0, len1 = chessWindows.length; j < len1; j++) {
            window = chessWindows[j];
            window.styleClass = styleClass;
          }
          return layoutData.set('windows', windows);
        });
      });
      this._boardDisplayChoiceAutorun = this.chess.autorun(() => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        if (!this.window()) {
          return;
        }

        // Note: We want to compare to the raw state value to not take the default into account.
        if (Chess.state('boardDisplayType')) {
          return;
        }
        if (this._boardDisplayChoiceWindowId()) {
          return;
        }
        return this._boardDisplayChoiceWindowId(this.chess.os.addWindow(Chess.Interface.BoardDisplayChoice.createInterfaceData()));
      });
      this._autoFlipBoardAutorun = this.chess.autorun(() => {
        var flippedBoard, gameManager, gameState;
        if (!(gameManager = this.chess.gameManager())) {
          return;
        }
        if (!(gameState = gameManager.gameState())) {
          return;
        }
        flippedBoard = this.automaticBoardOrientationForGameState(gameState);
        if (flippedBoard == null) {
          return;
        }
        return this.flippedBoard(flippedBoard);
      });
      this._earningsAutorun = this.chess.autorun(() => {
        if (!this.window()) {
          return;
        }
        if (!this.inMenu()) {
          return;
        }
        if (!Chess.pendingRewards().length) {
          return;
        }
        if (this._earningsWindowId()) {
          return;
        }
        return this._earningsWindowId(this.chess.os.addWindow(Chess.Interface.Earnings.createInterfaceData()));
      });
      this._introAudioAutorun = this.chess.autorun(computation => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        if (!this.window()) {
          return;
        }
        if (Chess.ownedPiecesCount()) {
          computation.stop();
          return;
        }
        if (this._boardDisplayChoiceWindowId()) {
          return;
        }
        if (!this.chess.audioManager().introWhenReady()) {
          return;
        }
        return computation.stop();
      });
    }
    destroy() {
      this.window.stop();
      this._layoutAutorun.stop();
      this._themeAutorun.stop();
      this._boardDisplayChoiceAutorun.stop();
      this._autoFlipBoardAutorun.stop();
      this._earningsAutorun.stop();
      return this._introAudioAutorun.stop();
    }
    inMenu() {
      return this.screen() === this.constructor.Screens.Menu;
    }
    inLesson() {
      return this.screen() === this.constructor.Screens.Lesson;
    }
    inPlay() {
      return this.screen() === this.constructor.Screens.Play;
    }
    enterScreen(screen) {
      var chessboardData;
      if (this.screen() === screen) {
        return;
      }
      this.screen(screen);
      switch (screen) {
        case this.constructor.Screens.Menu:
          this.chess.gameManager().endGame();
          this.chess.lessonManager().endLesson();
      }

      // Reset temporary chessboard data.
      chessboardData = this.chess.os.interface.getComponentData(Chess.Interface.Chessboard);
      return chessboardData.value({});
    }
    openShop() {
      return this._shopWindowId(this.chess.os.addWindow(Chess.Interface.Shop.createInterfaceData()));
    }
    closeShop() {
      var shopWindowId;
      if (!(shopWindowId = this._shopWindowId())) {
        return;
      }
      this.chess.os.removeWindow(shopWindowId);
      this._shopWindowId(null);
      return this.chess.os.activateWindow(this.windowId);
    }
    shopIsOpen() {
      return this._shopWindowId();
    }
    closeBoardDisplayChoice() {
      var boardDisplayChoiceWindowId;
      if (!(boardDisplayChoiceWindowId = this._boardDisplayChoiceWindowId())) {
        return;
      }
      this.chess.os.removeWindow(boardDisplayChoiceWindowId);
      this._boardDisplayChoiceWindowId(null);
      return this.chess.os.activateWindow(this.windowId);
    }
    getBoardDisplayChoice() {
      var boardDisplayChoiceWindowId, window;
      if (!(boardDisplayChoiceWindowId = this._boardDisplayChoiceWindowId())) {
        return;
      }
      if (!(window = this.chess.os.interface.getWindow(boardDisplayChoiceWindowId))) {
        return;
      }
      return window.childComponentsOfType(Chess.Interface.BoardDisplayChoice)[0];
    }
    closeEarnings() {
      var earningsWindowId;
      if (!(earningsWindowId = this._earningsWindowId())) {
        return;
      }
      this.chess.os.removeWindow(earningsWindowId);
      this._earningsWindowId(null);
      return this.chess.os.activateWindow(this.windowId);
    }
    displayBoardCoordinates() {
      return Chess.displayBoardCoordinates() || this.inLesson();
    }
    interfaceTheme() {
      var ref;
      return ((ref = Chess.currentProject()) != null ? ref.interfaceTheme : void 0) || Chess.InterfaceThemes.Light;
    }
    chessboardTheme() {
      var ref;
      return ((ref = Chess.currentProject()) != null ? ref.chessboardTheme : void 0) || Chess.ChessboardThemes.Contrast;
    }
    autoPromotion() {
      return Chess.autoPromotion() && !this.inLesson();
    }
    automaticBoardOrientationForGameState(gameState) {
      var currentPlayer, gameManager, options;
      // Automatic orientation is only active for a human player at a live, unfinished position.
      if (!Chess.autoFlipBoard()) {
        return;
      }
      if (gameState.finished()) {
        return;
      }
      if (!(gameManager = this.chess.gameManager())) {
        return;
      }
      if (!gameManager.displayingLivePosition()) {
        return;
      }
      if (!(options = gameManager.gameOptions())) {
        return;
      }
      currentPlayer = gameState.turn() === Chess.Piece.Colors.White ? options.white : options.black;
      if (currentPlayer.type !== Chess.GameManager.PlayerTypes.Human) {
        return;
      }
      return gameState.turn() === Chess.Piece.Colors.Black;
    }
  }
  ;
  InterfaceManager.Screens = {
    Menu: 'Menu',
    Lesson: 'Lesson',
    Play: 'Play'
  };
  return InterfaceManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"gamemanager.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/gamemanager.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  Chess,
  ChessEngine,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
ChessEngine = require('js-chess-engine');
Chess.GameManager = function () {
  class GameManager {
    constructor(chess) {
      this.chess = chess;
      this.game = new AE.ReactiveWrapper(null);
      this.gameOptions = new ReactiveField(null);
      this.plyHistory = new ReactiveField([]);
      this.previewedHistoryPlyNumber = new ReactiveField(null);
      this.promotionGameState = new ReactiveField(null);
      this.gameState = new AE.LiveComputedField(() => {
        var boardConfig, game, previewedHistoryPlyNumber, promotionGameState, ref;
        if ((ref = this.chess.interfaceManager()) != null ? ref.inMenu() : void 0) {
          // In the menu, we show a special board with the purchased pieces.
          return this._generateMenuGameState();
        }

        // Show any historic state.
        previewedHistoryPlyNumber = this.previewedHistoryPlyNumber();
        if (previewedHistoryPlyNumber != null) {
          return this.plyHistory()[previewedHistoryPlyNumber].gameState;
        }
        if (promotionGameState = this.promotionGameState()) {
          // During promotion, we show the temporary state with the pawn on the last rank.
          return promotionGameState;
        }
        // Otherwise, read the state from the engine game.
        if (!(game = this.game.withUpdates())) {
          return;
        }
        boardConfig = game.exportJson();
        return new Chess.GameState(boardConfig);
      });
      this.draw = new AE.LiveComputedField(() => {
        var gameState, i, len, ply, positionCounts, positionKey, ref;
        if (!(gameState = this.gameState())) {
          return;
        }
        if (gameState.checkmate()) {
          return false;
        }
        if (gameState.stalemate()) {
          // Stale mate is a draw.
          return Chess.DrawTypes.Stalemate;
        }
        if (gameState.halfMove() >= 100) {
          // Check the fifty-move rule.
          return Chess.DrawTypes.FiftyMoveRule;
        }
        if (gameState.hasInsufficientMaterial()) {
          // Check if there is sufficient material.
          return Chess.DrawTypes.InsufficientMaterial;
        }

        // Check for threefold repetition.
        positionCounts = {};
        ref = this.plyHistory();
        for (i = 0, len = ref.length; i < len; i++) {
          ply = ref[i];
          positionKey = ply.gameState.getPositionKey();
          if (positionCounts[positionKey] == null) {
            positionCounts[positionKey] = 0;
          }
          positionCounts[positionKey]++;
          if (positionCounts[positionKey] === 3) {
            return Chess.DrawTypes.ThreefoldRepetition;
          }
        }
        return false;
      });
      // Give the player the first currency if they have no pieces.
      Tracker.autorun(computation => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        computation.stop();
        if (!(Chess.ownedPiecesCount() || Chess.currency())) {
          return Chess.currency(1);
        }
      });

      // Throw an error if a piece a player owns doesn't have a drawn asset in the current project.
      this._missingAssetsAutorun = this.chess.autorun(computation => {
        var count, ownedPieceTypes, pieceType;
        if (this.chess.os.interface.getView(PAA.Pixeltosh.OS.Interface.ErrorDialog)) {
          return;
        }
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        ownedPieceTypes = function () {
          var ref, results;
          ref = Chess.ownedPieceTypeCounts();
          results = [];
          for (pieceType in ref) {
            count = ref[pieceType];
            if (count) {
              results.push(pieceType);
            }
          }
          return results;
        }();
        return this.assertDrawnPieces(ownedPieceTypes, Chess.Piece.Colors.White);
      });
      this._playAutorun = this.chess.autorun(computation => {
        var state;
        if (!(state = this.gameState())) {
          return;
        }
        if (state.finished()) {
          return;
        }
        if (this.draw()) {
          return;
        }
        return Tracker.nonreactive(async () => {
          var aiAnswer, currentPlayer, elapsedTime, game, move, newState, osCursor, startTime;
          if (!(game = this.game())) {
            return;
          }
          if (!this.displayingLivePosition()) {
            return;
          }
          // Determine whether it's computer's turn.
          currentPlayer = this.currentPlayer();
          if (currentPlayer.type !== this.constructor.PlayerTypes.Computer) {
            return;
          }

          // Make a move, but simulate as if it took a second to calculate.
          osCursor = this.chess.os.cursor();
          osCursor.wait(this);
          startTime = Date.now();

          // Let animations run.
          await _.waitForSeconds(0.5);
          if (this._destroyed) {
            return;
          }
          aiAnswer = game.ai({
            level: currentPlayer.level
          });
          move = Chess.Move.fromEngine(aiAnswer.move);
          elapsedTime = (Date.now() - startTime) / 1000;
          await _.waitForSeconds(Math.max(0, 1 - elapsedTime));
          if (this._destroyed) {
            return;
          }
          osCursor.endWait(this);
          this.game.updated();
          this._recordMove(move);
          newState = new Chess.GameState(game.exportJson());
          return this.chess.audioManager().announceState(newState);
        });
      });
    }
    destroy() {
      this.gameState.stop();
      this.draw.stop();
      this._missingAssetsAutorun.stop();
      this._playAutorun.stop();
      return this._destroyed = true;
    }
    _generateMenuGameState() {
      var data, fileIndex, i, j, k, l, pieceIndex, ref, ref1, ref2, ref3;
      data = Chess.GameState.getEmptyData();
      for (fileIndex = i = 0, ref = Chess.ownedPiecesCount(Chess.Piece.Types.Pawn); 0 <= ref ? i < ref : i > ref; fileIndex = 0 <= ref ? ++i : --i) {
        data.pieces[Chess.Square[fileIndex][1].engineName] = Chess.Piece.getLetter(Chess.Piece.Colors.White, Chess.Piece.Types.Pawn);
      }
      for (pieceIndex = j = 0, ref1 = Chess.ownedPiecesCount(Chess.Piece.Types.Knight); 0 <= ref1 ? j < ref1 : j > ref1; pieceIndex = 0 <= ref1 ? ++j : --j) {
        data.pieces[Chess.Square[1 + pieceIndex * 5][0].engineName] = Chess.Piece.getLetter(Chess.Piece.Colors.White, Chess.Piece.Types.Knight);
      }
      for (pieceIndex = k = 0, ref2 = Chess.ownedPiecesCount(Chess.Piece.Types.Rook); 0 <= ref2 ? k < ref2 : k > ref2; pieceIndex = 0 <= ref2 ? ++k : --k) {
        data.pieces[Chess.Square[pieceIndex * 7][0].engineName] = Chess.Piece.getLetter(Chess.Piece.Colors.White, Chess.Piece.Types.Rook);
      }
      for (pieceIndex = l = 0, ref3 = Chess.ownedPiecesCount(Chess.Piece.Types.Bishop); 0 <= ref3 ? l < ref3 : l > ref3; pieceIndex = 0 <= ref3 ? ++l : --l) {
        data.pieces[Chess.Square[2 + pieceIndex * 3][0].engineName] = Chess.Piece.getLetter(Chess.Piece.Colors.White, Chess.Piece.Types.Bishop);
      }
      if (Chess.ownedPiecesCount(Chess.Piece.Types.Queen)) {
        data.pieces[Chess.Square[3][0].engineName] = Chess.Piece.getLetter(Chess.Piece.Colors.White, Chess.Piece.Types.Queen);
      }
      if (Chess.ownedPiecesCount(Chess.Piece.Types.King)) {
        data.pieces[Chess.Square[4][0].engineName] = Chess.Piece.getLetter(Chess.Piece.Colors.White, Chess.Piece.Types.King);
      }
      return new Chess.GameState(data);
    }
    assertDrawnPieces(pieceTypes, pieceColor) {
      var i, len, pieceType, throwError;
      throwError = (color, pieceType) => {
        this.chess.os.throwError({
          reason: "file not found",
          details: "".concat(color, " ").concat(pieceType.toLowerCase()),
          shutDownProgramId: this.chess.id()
        });
        // Reset any cursor changes since pointer leave will not fire once the error overlay is displayed.
        return this.chess.os.cursor().setClass(null);
      };
      for (i = 0, len = pieceTypes.length; i < len; i++) {
        pieceType = pieceTypes[i];
        if (pieceColor === Chess.Piece.Colors.White) {
          if (!Chess.activeAssetIsDrawn(pieceType, Chess.Piece.Colors.White)) {
            throwError('white', pieceType);
            return false;
          }
        }
        if (pieceColor === Chess.Piece.Colors.Black) {
          if (!Chess.activeAssetIsDrawn(pieceType, Chess.Piece.Colors.Black)) {
            throwError('black', pieceType);
            return false;
          }
        }
      }
      return true;
    }
    startGame(options) {
      var color, i, len, ref;
      ref = Chess.Piece.AllColors;
      for (i = 0, len = ref.length; i < len; i++) {
        color = ref[i];
        if (!this.assertDrawnPieces(Chess.Piece.AllTypes, color)) {
          return;
        }
      }
      this.gameOptions(options);
      this.plyHistory([]);
      this.previewedHistoryPlyNumber(null);
      this.promotionGameState(null);
      // Determine the starting board orientation.
      this.chess.interfaceManager().flippedBoard(options.white.type === this.constructor.PlayerTypes.Computer && options.black.type === this.constructor.PlayerTypes.Human);
      // Create a new game with white able to make an ambiguous knight move.
      this.game(new ChessEngine.Game());
      this.plyHistory([{
        number: 0,
        gameState: new Chess.GameState(EJSON.clone(this.game().exportJson()))
      }]);
      return Chess.state('playStarted', true);
    }
    endGame() {
      this.game(null);
      this.gameOptions(null);
      this.plyHistory([]);
      this.previewedHistoryPlyNumber(null);
      return this.promotionGameState(null);
    }
    getLegalDestinationsFromSquare(square) {
      var game, i, len, moves, ref, results, squareName;
      if (!(game = this.game())) {
        return [];
      }
      moves = game.moves(square.engineName);
      if (!moves[square.engineName]) {
        return [];
      }
      ref = moves[square.engineName];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        squareName = ref[i];
        results.push(Chess.Square[squareName]);
      }
      return results;
    }
    move(move) {
      var game, newState, piece, promotionPieceLetter, ref;
      if (!(game = this.game())) {
        console.warn("Tried to move when there was no game is active.");
        return;
      }
      if (!this.displayingLivePosition()) {
        console.warn("Tried to move when we weren't displaying the live position.");
        return;
      }
      if (!this.humanCanMove()) {
        console.warn("Tried to move when it wasn't the human's turn.");
        return;
      }
      if (ref = move.to, indexOf.call(this.getLegalDestinationsFromSquare(move.from), ref) < 0) {
        console.warn("Tried to move to an illegal square.");
        return;
      }
      game.move(move.from.engineName, move.to.engineName);
      if (this.promotionGameState()) {
        this.chess.audio.promote();
        if (move.promotionPieceType && move.promotionPieceType !== Chess.Piece.Types.Queen) {
          // JS Chess Engine automatically promotes pawns to queens, so we have to override the piece.
          piece = this.promotionGameState().getPieceAtSquare(move.to);
          promotionPieceLetter = Chess.Piece.getLetter(piece.color, move.promotionPieceType);
          game.setPiece(move.to.engineName, promotionPieceLetter);
        }
        this.promotionGameState(null);
      }
      newState = new Chess.GameState(game.exportJson());
      this.chess.audioManager().announceState(newState);
      this.game.updated();
      return this._recordMove(move);
    }
    _recordMove(move) {
      var plyHistory;
      plyHistory = this.plyHistory();
      plyHistory.push({
        number: plyHistory.length,
        move: move,
        gameState: new Chess.GameState(EJSON.clone(this.game().exportJson()))
      });
      return this.plyHistory(plyHistory);
    }
    startPromotion(move) {
      return this.promotionGameState(this.gameState().startPromotion(move));
    }
    cancelPromotion() {
      return this.promotionGameState(null);
    }
    displayPosition(plyNumber) {
      if (plyNumber === this.livePlyNumber()) {
        return this.previewedHistoryPlyNumber(null);
      } else {
        return this.previewedHistoryPlyNumber(plyNumber);
      }
    }
    displayPreviousPosition() {
      return this.displayPosition(this.currentDisplayedPlyNumber() - 1);
    }
    displayNextPosition() {
      return this.displayPosition(this.currentDisplayedPlyNumber() + 1);
    }
    currentPlayer() {
      var options, state;
      if (!(state = this.gameState())) {
        return;
      }
      if (!(options = this.gameOptions())) {
        return;
      }
      if (state.turn() === Chess.Piece.Colors.White) {
        return options.white;
      } else {
        return options.black;
      }
    }
    currentPlayerType() {
      var ref;
      return (ref = this.currentPlayer()) != null ? ref.type : void 0;
    }
    humanCanMove() {
      if (!this.displayingLivePosition()) {
        return;
      }
      if (this.draw()) {
        return;
      }
      return this.currentPlayerType() === this.constructor.PlayerTypes.Human;
    }
    currentDisplayedPlyNumber() {
      var ref;
      return (ref = this.previewedHistoryPlyNumber()) != null ? ref : this.livePlyNumber();
    }
    livePlyNumber() {
      return this.plyHistory().length - 1;
    }
    liveGameState() {
      var ref;
      return (ref = _.last(this.plyHistory())) != null ? ref.gameState : void 0;
    }
    displayingLivePosition() {
      return this.previewedHistoryPlyNumber() == null;
    }
    ownedPiecesCount(pieceType) {
      var counts;
      counts = Chess.ownedPieceTypeCounts();
      if (pieceType) {
        return counts[pieceType] || 0;
      } else {
        return _.sum(_.values(counts));
      }
    }
    bestOwnedPromotionPieceType() {
      var i, len, pieceType, ref;
      if (this._promotionTypesDescending == null) {
        this._promotionTypesDescending = _.reverse(_.clone(Chess.Piece.PromotionTypes));
      }
      ref = this._promotionTypesDescending;
      for (i = 0, len = ref.length; i < len; i++) {
        pieceType = ref[i];
        if (Chess.ownedPiecesCount(pieceType)) {
          return pieceType;
        }
      }
    }
  }
  ;
  GameManager.PlayerTypes = {
    Human: 'Human',
    Computer: 'Computer'
  };
  return GameManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lessonmanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessonmanager.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.LessonManager = class LessonManager {
  constructor(chess) {
    var categoryClass;
    this.chess = chess;
    // Instantiate all the lesson categories.
    this._lessonCategories = function () {
      var i, len, ref, results;
      ref = Chess.Lesson.Category.getClasses();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        categoryClass = ref[i];
        results.push(new categoryClass(this));
      }
      return results;
    }.call(this);
    this.lesson = new ReactiveField(null);
    this.gameState = new ReactiveField(null);
    this.rewinding = new ReactiveField(false);
    this.moving = new ReactiveField(false);
  }
  destroy() {
    var category, i, len, ref, results;
    Meteor.clearTimeout(this._rewindTimeout);
    ref = this._lessonCategories;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      category = ref[i];
      results.push(category.destroy());
    }
    return results;
  }
  availableCategories() {
    var availableCategories, category, i, len, orderedPieceCategories, otherCategories, piece, pieceCategories, pieceCategoriesByPiece;
    availableCategories = _.filter(this._lessonCategories, category => {
      return category.available();
    });
    pieceCategories = _.filter(availableCategories, category => {
      return category instanceof Chess.Lesson.PieceCategory;
    });
    otherCategories = _.difference(availableCategories, pieceCategories);

    // Order piece categories in purchase order.
    pieceCategoriesByPiece = {};
    for (i = 0, len = pieceCategories.length; i < len; i++) {
      category = pieceCategories[i];
      pieceCategoriesByPiece[category.pieceType()] = category;
    }
    orderedPieceCategories = function () {
      var results;
      results = [];
      for (piece in Chess.ownedPieceTypeCounts()) {
        results.push(pieceCategoriesByPiece[piece]);
      }
      return results;
    }();
    // Show piece categories first, then other categories.
    return [...orderedPieceCategories, ...otherCategories];
  }
  startLesson(lesson) {
    var i, len, piece, ref, startingGameState;
    this.lesson(lesson);
    startingGameState = lesson.startingGameState();
    this.gameState(startingGameState);
    ref = startingGameState.getPieces();
    for (i = 0, len = ref.length; i < len; i++) {
      piece = ref[i];
      if (!this.chess.gameManager().assertDrawnPieces([piece.type], piece.color)) {
        return;
      }
    }
    if (startingGameState.turn() === Chess.Piece.Colors.Black) {
      return this.aiMove();
    }
  }
  endLesson() {
    this.lesson(null);
    return this.gameState(null);
  }
  getLegalDestinationsFromSquare(square) {
    var ref;
    return (ref = this.gameState()) != null ? ref.getLegalDestinationsFromSquare(square) : void 0;
  }
  move(move) {
    return Tracker.nonreactive(() => {
      var newGameState;
      if (this._prePromotionGameState) {
        this.chess.audio.promote();
      }
      this._previousGameState = this._prePromotionGameState || this.gameState();
      this._prePromotionGameState = null;
      newGameState = this._previousGameState.applyMove(move);
      this.gameState(newGameState);
      this.chess.audioManager().announceState(newGameState);
      if (newGameState.finished()) {
        return;
      }
      return this.aiMove();
    });
  }
  async aiMove() {
    var aiMove, gameState, newGameState, osCursor;
    gameState = this.gameState();
    if (!(aiMove = this.lesson().aiMove())) {
      gameState.setTurn(Chess.Piece.Colors.White);
      this.gameState(gameState);
      return;
    }
    this.moving(true);
    osCursor = this.chess.os.cursor();
    osCursor.wait(this);
    await _.waitForSeconds(0.5);
    newGameState = gameState.applyMove(aiMove);
    this.gameState(newGameState);
    this.chess.audioManager().announceState(newGameState);
    osCursor.endWait(this);
    return this.moving(false);
  }
  startPromotion(move) {
    return Tracker.nonreactive(() => {
      var newGameState;
      this._prePromotionGameState = this._previousGameState = this.gameState();
      newGameState = this._prePromotionGameState.startPromotion(move);
      return this.gameState(newGameState);
    });
  }
  cancelPromotion() {
    this.gameState(this._prePromotionGameState);
    return this._prePromotionGameState = null;
  }
  rewind(gameState) {
    return Tracker.nonreactive(async () => {
      if (this.rewinding()) {
        return;
      }
      this.rewinding(true);
      await _.waitForSeconds(this.moving() ? 2 : 1);
      this.gameState(gameState || this._previousGameState);
      this.rewinding(false);
      await _.waitForSeconds(0.5);
      return this.chess.audioManager().tryAgain();
    });
  }
  humanCanMove() {
    var ref;
    // Prevent movement while rewinding.
    if (this.rewinding()) {
      return;
    }

    // In the lessons, the player is always white.
    return ((ref = this.gameState()) != null ? ref.turn() : void 0) === Chess.Piece.Colors.White;
  }
  getChessboard() {
    return this.chess.os.interface.getView(Chess.Interface.Chessboard.Component);
  }
  getLessonView() {
    return this.chess.os.interface.getView(Chess.Interface.Lesson);
  }
  markup() {
    var lessonView, ref;
    if (!(lessonView = this.getLessonView())) {
      return;
    }
    return (ref = lessonView.activeStep()) != null ? ref.markup() : void 0;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rewardsmanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/rewardsmanager.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.RewardsManager = class RewardsManager {
  constructor(chess) {
    var rewardClass;
    this.chess = chess;
    this._rewardsById = {};
    this._rewards = function () {
      var i, len, ref, results;
      ref = Chess.Reward.getClasses();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        rewardClass = ref[i];
        results.push(this._rewardsById[rewardClass.id()] = new rewardClass(this));
      }
      return results;
    }.call(this);
  }
  destroy() {
    var i, len, ref, results, reward;
    ref = this._rewards;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      reward = ref[i];
      results.push(reward.destroy());
    }
    return results;
  }
  getReward(rewardId) {
    return this._rewardsById[rewardId];
  }
  onLessonCompleted(completedCount) {
    var i, len, ref, results, reward;
    ref = this._rewards;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      reward = ref[i];
      results.push(reward.onLessonCompleted(completedCount));
    }
    return results;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"audiomanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/audiomanager.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, Chess, LOI, PAA;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.AudioManager = function () {
  class AudioManager {
    constructor(chess) {
      this.chess = chess;
      this._loadSoundsAutorun = Tracker.autorun(computation => {
        var audioOutputNode, context;
        if (!(context = LOI.adventure.audioManager.context())) {
          return;
        }
        audioOutputNode = AEc.Node.Mixer.getOutputNodeForName('location', context);
        this.checkSound = this._createSound('check.wav', audioOutputNode);
        this.checkmateSound = this._createSound('checkmate.wav', audioOutputNode);
        this.drawFiftyMoveRuleSound = this._createSound('draw-fiftymoverule.wav', audioOutputNode);
        this.drawInsufficientMaterialSound = this._createSound('draw-insufficientmaterial.wav', audioOutputNode);
        this.drawThreefoldRepetitionSound = this._createSound('draw-threefoldrepetition.wav', audioOutputNode);
        this.gameOverSound = this._createSound('gameover.wav', audioOutputNode);
        this.introSound = this._createSound('intro.wav', audioOutputNode);
        this.lessonCompleteSound = this._createSound('lessoncomplete.wav', audioOutputNode);
        this.stalemateSound = this._createSound('stalemate.wav', audioOutputNode);
        this.tryAgainSound = this._createSound('tryagain.wav', audioOutputNode);
        this.winBlackSound = this._createSound('win-black.wav', audioOutputNode);
        this.winWhiteSound = this._createSound('win-white.wav', audioOutputNode);
        this.youWinSound = this._createSound('youwin.wav', audioOutputNode);
        return computation.stop();
      });
      this._soundsEnabledAutorun = this.chess.autorun(() => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        return this.chess.audio.enabled(Chess.audioBoard());
      });
    }
    destroy() {
      var ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
      this._loadSoundsAutorun.stop();
      this._soundsEnabledAutorun.stop();
      if ((ref = this.checkSound) != null) {
        ref.destroy();
      }
      if ((ref1 = this.checkmateSound) != null) {
        ref1.destroy();
      }
      if ((ref2 = this.drawFiftyMoveRuleSound) != null) {
        ref2.destroy();
      }
      if ((ref3 = this.drawInsufficientMaterialSound) != null) {
        ref3.destroy();
      }
      if ((ref4 = this.drawThreefoldRepetitionSound) != null) {
        ref4.destroy();
      }
      if ((ref5 = this.gameOverSound) != null) {
        ref5.destroy();
      }
      if ((ref6 = this.introSound) != null) {
        ref6.destroy();
      }
      if ((ref7 = this.lessonCompleteSound) != null) {
        ref7.destroy();
      }
      if ((ref8 = this.stalemateSound) != null) {
        ref8.destroy();
      }
      if ((ref9 = this.tryAgainSound) != null) {
        ref9.destroy();
      }
      if ((ref10 = this.winBlackSound) != null) {
        ref10.destroy();
      }
      if ((ref11 = this.winWhiteSound) != null) {
        ref11.destroy();
      }
      return (ref12 = this.youWinSound) != null ? ref12.destroy() : void 0;
    }
    async announceState(state) {
      var draw, gameOptions, humanColor, ref, ref1;
      // Let the move animation complete.
      await _.waitForSeconds(0.5);
      if (state.checkmate()) {
        this._play(this.checkmateSound);
        if (gameOptions = (ref = this.chess.gameManager()) != null ? ref.gameOptions() : void 0) {
          await _.waitForSeconds(1.2);
          if (gameOptions.white.type === gameOptions.black.type) {
            if (state.turn() === Chess.Piece.Colors.White) {
              this._play(this.winBlackSound);
            } else {
              this._play(this.winWhiteSound);
            }
          } else {
            humanColor = gameOptions.white.type === Chess.GameManager.PlayerTypes.Human ? Chess.Piece.Colors.White : Chess.Piece.Colors.Black;
            if (state.turn() === humanColor) {
              this._play(this.gameOverSound);
            } else {
              this._play(this.youWinSound);
            }
          }
        }
      } else if (state.stalemate()) {
        this._play(this.stalemateSound);
      } else if (state.check()) {
        this._play(this.checkSound);
      }
      if (draw = (ref1 = this.chess.gameManager()) != null ? ref1.draw() : void 0) {
        switch (draw) {
          case Chess.DrawTypes.FiftyMoveRule:
            return this._play(this.drawFiftyMoveRuleSound);
          case Chess.DrawTypes.InsufficientMaterial:
            return this._play(this.drawInsufficientMaterialSound);
          case Chess.DrawTypes.ThreefoldRepetition:
            return this._play(this.drawThreefoldRepetitionSound);
        }
      }
    }
    introWhenReady() {
      if (!this.introSound.ready()) {
        return;
      }
      this._play(this.introSound);
      return true;
    }
    lessonComplete() {
      return this._play(this.lessonCompleteSound);
    }
    tryAgain() {
      return this._play(this.tryAgainSound);
    }
    _createSound(fileName, audioOutputNode) {
      return new AEc.Sound("".concat(this.constructor.soundsPath, "/").concat(fileName), LOI.adventure.audioManager, audioOutputNode);
    }
    _play(sound) {
      if (!Chess.audioVoice()) {
        return;
      }
      return sound != null ? sound.play({
        volume: this.constructor.maxVolume
      }) : void 0;
    }
  }
  ;
  AudioManager.maxVolume = 0.7;
  AudioManager.soundsPath = '/pixelartacademy/pixeltosh/programs/chess';
  return AudioManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interface":{"interface.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/interface.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, Chess, FM, PAA;
AC = Artificial.Control;
FM = FataMorgana;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface = function () {
  class Interface {
    static createMenuItems() {
      return [{
        caption: '',
        items: [Chess.Interface.Actions.About.id()]
      }, {
        caption: '文件',
        items: [Chess.Interface.Actions.BackToMenu.id(), null, PAA.Pixeltosh.OS.Interface.Actions.Quit.id()]
      }, {
        caption: '视图',
        items: [Chess.Interface.Actions.BoardDisplay2D.id(), Chess.Interface.Actions.BoardDisplay3D.id(), null, Chess.Interface.Actions.DisplayBoardCoordinates.id(), null, Chess.Interface.Actions.FlipBoard.id()]
      }, {
        caption: '音频',
        items: [Chess.Interface.Actions.AudioBoard.id(), Chess.Interface.Actions.AudioVoice.id()]
      }, {
        caption: '主题',
        items: [Chess.Interface.Actions.NewspaperChessboard.id(), Chess.Interface.Actions.LightChessboard.id(), Chess.Interface.Actions.ContrastChessboard.id(), Chess.Interface.Actions.DarkChessboard.id(), null, Chess.Interface.Actions.LightInterface.id(), Chess.Interface.Actions.DarkInterface.id()]
      }, {
        caption: '对弈',
        items: [Chess.Interface.Actions.AutoPromotion.id(), Chess.Interface.Actions.AutoFlipBoard.id(), null, Chess.Interface.Actions.HistoryBack.id(), Chess.Interface.Actions.HistoryForward.id()]
      }];
    }
    static createShortcuts() {
      return {
        ["".concat(Chess.Interface.Actions.FlipBoard.id())]: {
          key: AC.Keys.f
        },
        ["".concat(Chess.Interface.Actions.HistoryBack.id())]: {
          key: AC.Keys.left
        },
        ["".concat(Chess.Interface.Actions.HistoryForward.id())]: {
          key: AC.Keys.right
        }
      };
    }
    static createInterfaceData() {
      return {
        type: PAA.Pixeltosh.Program.View.id(),
        programId: PAA.Pixeltosh.Programs.Chess.id(),
        top: 14,
        left: 0,
        right: 0,
        bottom: 0
      };
    }
    static createLayoutsData() {
      return {
        ["".concat(this.Layouts.MenuIntro)]: {
          type: FM.SplitView.id(),
          fixed: true,
          dockSide: FM.SplitView.DockSide.Left,
          mainArea: {
            contentComponentId: this.Chessboard.id(),
            contentComponentData: this.Chessboard.Providers.GameManager,
            width: 199
          },
          remainingArea: {
            type: FM.SplitView.id(),
            fixed: true,
            dockSide: FM.SplitView.DockSide.Top,
            mainArea: {
              contentComponentId: this.Intro.id(),
              height: 152
            },
            remainingArea: {
              contentComponentId: this.PlayerStatus.id()
            }
          }
        },
        ["".concat(this.Layouts.Menu)]: {
          type: FM.SplitView.id(),
          fixed: true,
          dockSide: FM.SplitView.DockSide.Left,
          mainArea: {
            contentComponentId: this.Chessboard.id(),
            contentComponentData: this.Chessboard.Providers.GameManager,
            width: 199
          },
          remainingArea: {
            type: FM.SplitView.id(),
            fixed: true,
            dockSide: FM.SplitView.DockSide.Bottom,
            styleClass: 'pixelartacademy-pixeltosh-chess-interface-sidebar',
            mainArea: {
              contentComponentId: this.PlayerStatus.id(),
              height: 45
            },
            remainingArea: {
              type: FM.TabbedView.id(),
              tabs: [{
                name: '课程',
                contentComponentId: this.Lessons.id(),
                active: true
              }, {
                name: '谜题'
              }, {
                name: '对弈',
                contentComponentId: this.PlayStart.id()
              }],
              allowClosing: false
            }
          }
        },
        ["".concat(this.Layouts.Lesson)]: {
          type: FM.SplitView.id(),
          fixed: true,
          dockSide: FM.SplitView.DockSide.Left,
          mainArea: {
            contentComponentId: this.Chessboard.id(),
            contentComponentData: this.Chessboard.Providers.LessonManager,
            width: 199
          },
          remainingArea: {
            contentComponentId: this.Lesson.id()
          }
        },
        ["".concat(this.Layouts.Play)]: {
          type: FM.SplitView.id(),
          fixed: true,
          dockSide: FM.SplitView.DockSide.Left,
          mainArea: {
            contentComponentId: this.Chessboard.id(),
            contentComponentData: this.Chessboard.Providers.GameManager,
            width: 199
          },
          remainingArea: {
            contentComponentId: this.Play.id()
          }
        }
      };
    }
  }
  ;
  Interface.Layouts = {
    MenuIntro: 'MenuIntro',
    Menu: 'Menu',
    Lesson: 'Lesson',
    Play: 'Play'
  };
  return Interface;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"intro":{"intro.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/intro/intro.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Intro = function () {
  class Intro extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Intro';
    }
  }
  ;
  Intro.register(Intro.id());
  return Intro;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.intro.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/intro/template.intro.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Intro");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Intro"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Intro", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixeltosh-programs-chess-interface-intro">\n    <div class="pixeltosh"></div>\n    <div class="challenge">\n      你觉得能在国际象棋中击败我吗？\n    </div>\n    <div class="instructions">\n      不过，没有棋子可做不到！\n    </div>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"playerstatus":{"playerstatus.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/playerstatus/playerstatus.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.PlayerStatus = function () {
  class PlayerStatus extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayerStatus';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      return this.chess = this.os.getProgram(Chess);
    }
    ownedPiecesCount() {
      return Chess.ownedPiecesCount();
    }
    events() {
      return super.events(...arguments).concat({
        'click .buy-button': this.onClickBuyButton
      });
    }
    onClickBuyButton(event) {
      return this.chess.interfaceManager().openShop();
    }
  }
  ;
  PlayerStatus.register(PlayerStatus.id());
  return PlayerStatus;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.playerstatus.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/playerstatus/template.playerstatus.js                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayerStatus");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayerStatus"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayerStatus", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-playerstatus"
  }, "\n    ", HTML.DIV({
    class: "player-status"
  }, "\n      ", HTML.DIV({
    class: "currency-area"
  }, "Currency: ", HTML.SPAN({
    class: "currency"
  }, Blaze.View("lookup:chess.currency", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("chess"), "currency"));
  }))), "\n      ", HTML.DIV({
    class: "pieces"
  }, HTML.Raw('\n        <button class="buy-button pixelartacademy-pixeltosh-os-interface-button">购买</button>\n        '), HTML.SPAN({
    class: "pieces-count"
  }, Blaze.View("lookup:ownedPiecesCount", function() {
    return Spacebars.mustache(view.lookup("ownedPiecesCount"));
  }), "/16 pieces"), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lessons":{"lessons.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/lessons/lessons.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Lessons = function () {
  class Lessons extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lessons';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.chess = this.os.getProgram(Chess);
      return this.hoveredLesson = new ReactiveField(null);
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.$lessons = this.$('.pixelartacademy-pixeltosh-programs-chess-interface-lessons');
    }
    scrollbars() {
      return {
        vertical: {
          enabled: true
        }
      };
    }
    categories() {
      var ref;
      return (ref = this.chess.lessonManager()) != null ? ref.availableCategories() : void 0;
    }
    lessonLockedClass() {
      var lesson;
      lesson = this.currentData();
      if (!lesson.available()) {
        return 'locked';
      }
    }
    lessonCompletedClass() {
      var completedCount, lesson;
      lesson = this.currentData();
      completedCount = lesson.completedCount();
      if (completedCount === 1) {
        return 'completed';
      } else if (completedCount > 1) {
        return 'completed twice';
      }
    }
    lessonCursorAttribute() {
      var lesson;
      lesson = this.currentData();
      if (lesson.available()) {
        return {
          'data-cursor': 'pointer'
        };
      }
    }
    activeLesson() {
      var ref;
      return this.currentData() === ((ref = this.chess.gameManager()) != null ? ref.activeLesson() : void 0);
    }
    lockedLessonInfo() {
      var count, hoveredLesson, lesson, pieceType, requiredPieceTypes;
      if (!(hoveredLesson = this.hoveredLesson())) {
        return;
      }
      lesson = hoveredLesson.lesson;
      if (lesson.available()) {
        return;
      }
      requiredPieceTypes = function () {
        var ref, results;
        ref = lesson.requiredPieceTypeCounts();
        results = [];
        for (pieceType in ref) {
          count = ref[pieceType];
          results.push({
            type: pieceType,
            ownedCount: Chess.ownedPiecesCount(pieceType),
            requiredCount: count
          });
        }
        return results;
      }();
      _.remove(requiredPieceTypes, requiredPieceType => {
        return requiredPieceType.ownedCount >= requiredPieceType.requiredCount;
      });
      return {
        requiredPieceTypes: requiredPieceTypes,
        topStyle: {
          top: hoveredLesson.top
        }
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .lesson': this.onClickLesson,
        'pointerenter .lesson': this.onPointerEnterLesson,
        'pointerleave .lesson': this.onPointerLeaveLesson
      });
    }
    onClickLesson(event) {
      var lesson;
      lesson = this.currentData();
      if (!lesson.available()) {
        return;
      }
      this.chess.lessonManager().startLesson(lesson);
      return this.chess.interfaceManager().enterScreen(Chess.InterfaceManager.Screens.Lesson);
    }
    onPointerEnterLesson(event) {
      var lesson, top;
      // Note: When using escape to get back, this even can run sooner than onRendered, so we have to guard for it.
      if (!this.$lessons) {
        return;
      }
      lesson = this.currentData();

      // Calculate vertical offset between lesson element and scroll container
      top = $(event.currentTarget).offset().top - this.$lessons.offset().top;
      return this.hoveredLesson({
        lesson,
        top
      });
    }
    onPointerLeaveLesson(event) {
      return this.hoveredLesson(null);
    }
  }
  ;
  Lessons.register(Lessons.id());
  return Lessons;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.lessons.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/lessons/template.lessons.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lessons");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lessons"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lessons", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-lessons"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("scrollbars"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "OS", "Interface", "ScrollableArea"));
    }, function() {
      return [ "\n      ", HTML.OL({
        class: "categories"
      }, "\n        ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("categories"));
      }, function() {
        return [ "\n          ", HTML.LI({
          class: "category"
        }, "\n            ", HTML.DIV({
          class: "name"
        }, Blaze.View("lookup:displayName", function() {
          return Spacebars.mustache(view.lookup("displayName"));
        })), "\n            ", HTML.OL({
          class: "lessons"
        }, "\n              ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("lessons"));
        }, function() {
          return [ "\n                ", HTML.LI(HTML.Attrs({
            class: function() {
              return [ "lesson ", Spacebars.mustache(view.lookup("lessonLockedClass")), " ", Spacebars.mustache(view.lookup("lessonCompletedClass")) ];
            }
          }, function() {
            return Spacebars.attrMustache(view.lookup("lessonCursorAttribute"));
          }), "\n                  ", HTML.SPAN({
            class: "name"
          }, Blaze.View("lookup:displayName", function() {
            return Spacebars.mustache(view.lookup("displayName"));
          })), "\n                "), "\n              " ];
        }), "\n            "), "\n          "), "\n        " ];
      }), "\n      "), "\n    " ];
    });
  }), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("lockedLessonInfo"));
  }, function() {
    return [ "\n      ", HTML.DIV(HTML.Attrs({
      class: "locked-lesson-info pixelartacademy-pixeltosh-os-interface-rectanglearea"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("topStyle"));
    }), HTML.Raw('\n        <div class="requires">需要</div>\n        '), HTML.UL({
      class: "required-piece-types"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("requiredPieceTypes"));
    }, function() {
      return [ "\n            ", HTML.LI({
        class: "required-piece-type"
      }, "\n              ", HTML.SPAN({
        class: "name"
      }, Blaze.View("lookup:type", function() {
        return Spacebars.mustache(view.lookup("type"));
      })), "\n              ", HTML.SPAN({
        class: "owned"
      }, Blaze.View("lookup:ownedCount", function() {
        return Spacebars.mustache(view.lookup("ownedCount"));
      }), "/", Blaze.View("lookup:requiredCount", function() {
        return Spacebars.mustache(view.lookup("requiredCount"));
      })), "\n            "), "\n          " ];
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lesson":{"lesson.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/lesson/lesson.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Lesson = function () {
  class Lesson extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lesson';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.chess = this.os.getProgram(Chess);
      this.lesson = new ComputedField(() => {
        var ref;
        return (ref = this.chess.lessonManager()) != null ? ref.lesson() : void 0;
      });
      this.activeStepIndex = new ReactiveField(0);
      this.activeStep = new ComputedField(() => {
        var ref;
        // Note: We have to wait until we're actually rendered so the step doesn't get rendered twice due to reflows.
        if (!this.isRendered()) {
          return;
        }
        return (ref = this.lesson()) != null ? ref.steps[this.activeStepIndex()] : void 0;
      });
      return this.autorun(computation => {
        var activeStep, completedCount, lesson;
        if (!(lesson = this.lesson())) {
          return;
        }
        if (!(activeStep = this.activeStep())) {
          return;
        }
        if (activeStep.failed()) {
          this.chess.lessonManager().rewind(activeStep.retryGameState());
        }
        if (activeStep.completed()) {
          if (this.activeStepIndex() < lesson.steps.length - 1) {
            return this.activeStepIndex(this.activeStepIndex() + 1);
          } else if (!this._completedCountIncreased) {
            completedCount = (lesson.state('completedCount') || 0) + 1;
            lesson.state('completedCount', completedCount);
            this.chess.rewardsManager().onLessonCompleted(completedCount);
            return this._completedCountIncreased = true;
          }
        }
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      if (this._revertTimeout) {
        return Meteor.clearTimeout(this._revertTimeout);
      }
    }
  }
  ;
  Lesson.register(Lesson.id());
  return Lesson;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.lesson.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/lesson/template.lesson.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lesson");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lesson"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Lesson", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-lesson"
  }, HTML.Raw('\n    <div class="pixeltosh"></div>\n    '), HTML.DIV({
    class: "title"
  }, "\n      ", Blaze.View("lookup:lesson.displayName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("lesson"), "displayName"));
  }), "\n    "), "\n    ", HTML.DIV({
    class: "step"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("activeStep"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"playstart":{"playstart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/playstart/playstart.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.PlayStart = function () {
  class PlayStart extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayStart';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.chess = this.os.getProgram(Chess);
      this.players = this.data().child('players').value;
      if (!this.players()) {
        return this.players([{
          color: Chess.Piece.Colors.White,
          type: Chess.GameManager.PlayerTypes.Human,
          level: 1,
          index: 0
        }, {
          color: Chess.Piece.Colors.Black,
          type: Chess.GameManager.PlayerTypes.Computer,
          level: 1,
          index: 1
        }]);
      }
    }
    playerTypeOptions() {
      return _.values(Chess.GameManager.PlayerTypes);
    }
    playerTypeCheckedAttribute() {
      var player, playerType;
      playerType = this.currentData();
      player = Template.parentData();
      if (player.type === playerType) {
        return {
          checked: true
        };
      }
    }
    levels() {
      return [1, 2, 3, 4, 5];
    }
    levelSelectedClass() {
      var level, player;
      level = this.currentData();
      player = Template.parentData();
      if (player.level === level) {
        return 'selected';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'change .type-input': this.onChangeTypeInput,
        'click .level-button': this.onClickLevelButton,
        'click .play-button': this.onClickPlayButton
      });
    }
    onChangeTypeInput(event) {
      var player, playerType, players;
      playerType = event.target.value;
      player = Template.parentData();
      players = this.players();
      players[player.index].type = playerType;
      return this.players(players);
    }
    onClickLevelButton(event) {
      var level, player, players;
      level = this.currentData();
      player = Template.parentData();
      players = this.players();
      players[player.index].level = level;
      return this.players(players);
    }
    onClickPlayButton(event) {
      var players;
      players = this.players();
      this.chess.interfaceManager().enterScreen(Chess.InterfaceManager.Screens.Play);
      return this.chess.gameManager().startGame({
        white: players[0],
        black: players[1]
      });
    }
  }
  ;
  PlayStart.register(PlayStart.id());
  return PlayStart;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.playstart.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/playstart/template.playstart.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayStart");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayStart"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.PlayStart", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-playstart"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("players"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "player-options"
    }, "\n        ", HTML.DIV({
      class: "color"
    }, Blaze.View("lookup:color", function() {
      return Spacebars.mustache(view.lookup("color"));
    })), "\n        ", HTML.DIV({
      class: "types"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("playerTypeOptions"));
    }, function() {
      return [ "\n            ", HTML.LABEL({
        class: "type pixelartacademy-pixeltosh-os-interface-radio"
      }, "\n              ", HTML.INPUT(HTML.Attrs({
        class: "type-input",
        type: "radio",
        value: function() {
          return Spacebars.mustache(view.lookup("."));
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("playerTypeCheckedAttribute"));
      })), HTML.Raw('<span class="radio"></span>\n              '), Blaze.View("lookup:.", function() {
        return Spacebars.mustache(view.lookup("."));
      }), "\n            "), "\n          " ];
    }), "\n        "), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "Computer");
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: "levels-area"
      }, HTML.Raw('\n            <span class="label">等级</span>\n            '), HTML.DIV({
        class: "levels pixelartacademy-pixeltosh-os-interface-segmentedcontrol"
      }, "\n              ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("levels"));
      }, function() {
        return [ "\n                ", HTML.BUTTON({
          class: function() {
            return [ "level-button segment ", Spacebars.mustache(view.lookup("levelSelectedClass")) ];
          }
        }, Blaze.View("lookup:.", function() {
          return Spacebars.mustache(view.lookup("."));
        })), "\n              " ];
      }), "\n            "), "\n          "), "\n        " ];
    }), "\n      "), "\n    " ];
  }), HTML.Raw('\n    <div class="actions">\n      <button class="play-button pixelartacademy-pixeltosh-os-interface-button">对弈</button>\n    </div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"play":{"play.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/play/play.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Play = function () {
  class Play extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      return this.chess = this.os.getProgram(Chess);
    }
    topPlayerPosition() {
      return this.constructor.PlayerPositions.Top;
    }
    bottomPlayerPosition() {
      return this.constructor.PlayerPositions.Bottom;
    }
  }
  ;
  Play.register(Play.id());
  Play.PlayerPositions = {
    Top: 'top',
    Bottom: 'bottom'
  };
  return Play;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.play.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/play/template.play.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-play"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("topPlayerPosition"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Play", "PlayerCard"));
    });
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Play", "MovesHistory"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("bottomPlayerPosition"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Play", "PlayerCard"));
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"playercard":{"playercard.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/play/playercard/playercard.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LOI, PAA, PlayerPositions;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
PlayerPositions = Chess.Interface.Play.PlayerPositions;
Chess.Interface.Play.PlayerCard = function () {
  class PlayerCard extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.PlayerCard';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.play = this.ancestorComponentOfType(Chess.Interface.Play);
      this.chess = this.play.chess;
      this.color = new ComputedField(() => {
        var flipped, playerPosition, ref;
        playerPosition = this.data();
        flipped = (ref = this.chess.interfaceManager()) != null ? ref.flippedBoard() : void 0;
        // White is on the bottom if not flipped, black if interface is flipped.
        if (playerPosition === PlayerPositions.Bottom && !flipped || playerPosition === PlayerPositions.Top && flipped) {
          return Chess.Piece.Colors.White;
        } else {
          return Chess.Piece.Colors.Black;
        }
      });
      this.name = new ComputedField(() => {
        var gameOptions, player, ref;
        if (!(gameOptions = (ref = this.chess.gameManager()) != null ? ref.gameOptions() : void 0)) {
          return;
        }
        player = gameOptions[this.color().toLowerCase()];
        switch (player.type) {
          case Chess.GameManager.PlayerTypes.Human:
            return "Player";
          case Chess.GameManager.PlayerTypes.Computer:
            return "Pixeltosh";
        }
      });
      this.kingPiece = new ComputedField(() => {
        return new Chess.Piece(this.color(), Chess.Piece.Types.King);
      });
      this.capturedPieces = new ComputedField(() => {
        var color, differentCapturedPieceCount, i, j, len, opponentCapturedPieceCounts, opponentColor, piece, pieceIndex, pieceType, pieces, playerCapturedPieceCounts, ref, ref1;
        color = this.color();
        opponentColor = this._opponentColor(color);
        if (!(playerCapturedPieceCounts = this._capturedPieceCountsForColor(opponentColor))) {
          return;
        }
        if (!(opponentCapturedPieceCounts = this._capturedPieceCountsForColor(color))) {
          return;
        }
        pieces = [];
        ref = this.constructor.MaterialPieceTypes;
        for (i = 0, len = ref.length; i < len; i++) {
          pieceType = ref[i];
          differentCapturedPieceCount = Math.max(0, playerCapturedPieceCounts[pieceType] - opponentCapturedPieceCounts[pieceType]);
          for (pieceIndex = j = 0, ref1 = differentCapturedPieceCount; 0 <= ref1 ? j < ref1 : j > ref1; pieceIndex = 0 <= ref1 ? ++j : --j) {
            piece = new Chess.Piece(opponentColor, pieceType);
            pieces.push({
              piece: piece,
              style: this.capturedPieceStyle(piece)
            });
          }
        }
        return pieces;
      });
      return this.materialDifference = new ComputedField(() => {
        var color;
        color = this.color();
        return this._materialValueForColor(color) - this._materialValueForColor(this._opponentColor(color));
      });
    }
    materialDifferenceText() {
      var materialDifference;
      materialDifference = this.materialDifference();
      if (materialDifference > 0) {
        return "+".concat(materialDifference);
      }
    }
    capturedPieceStyle(piece) {
      var contentBounds;
      if (!(contentBounds = this._contentBoundsForPiece(piece))) {
        return;
      }
      return {
        width: "".concat(contentBounds.width, "rem"),
        left: "".concat(-contentBounds.x, "rem"),
        top: "".concat(20 - contentBounds.height - contentBounds.y, "rem")
      };
    }
    _opponentColor(color) {
      if (color === Chess.Piece.Colors.White) {
        return Chess.Piece.Colors.Black;
      } else {
        return Chess.Piece.Colors.White;
      }
    }
    _capturedPieceCountsForColor(color) {
      var capturedPieceCounts, gameState, i, len, pieceType, ref, ref1, remainingCount, startingCount;
      if (!(gameState = (ref = this.chess.gameManager()) != null ? ref.gameState() : void 0)) {
        return;
      }
      capturedPieceCounts = {};
      ref1 = this.constructor.MaterialPieceTypes;
      for (i = 0, len = ref1.length; i < len; i++) {
        pieceType = ref1[i];
        startingCount = Chess.Piece.InfoForType[pieceType].requiredCount;
        remainingCount = gameState.getPiecesOfTypeAndColor(pieceType, color).length;
        capturedPieceCounts[pieceType] = Math.max(0, startingCount - remainingCount);
      }
      return capturedPieceCounts;
    }
    _materialValueForColor(color) {
      var gameState, i, len, materialValue, piece, ref, ref1;
      if (!(gameState = (ref = this.chess.gameManager()) != null ? ref.gameState() : void 0)) {
        return 0;
      }
      materialValue = 0;
      ref1 = gameState.getPiecesOfColor(color);
      for (i = 0, len = ref1.length; i < len; i++) {
        piece = ref1[i];
        if (piece.type !== Chess.Piece.Types.King) {
          materialValue += Chess.Piece.InfoForType[piece.type].value;
        }
      }
      return materialValue;
    }
    _contentBoundsForPiece(piece) {
      var asset, assetId, bitmap, cacheItem, project;
      if (!(project = PAA.Practice.Project.documents.findOne(Chess.projectId2D()))) {
        return;
      }
      assetId = Chess.Assets.TwoDimensional[piece.type][piece.color].id();
      if (!(asset = _.find(project.assets, asset => {
        return asset.id === assetId;
      }))) {
        return;
      }
      bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(asset.bitmapId, false);
      cacheItem = this.constructor._pieceContentBoundsCache[asset.bitmapId];
      // Update cache if necessary.
      if ((cacheItem != null ? cacheItem.lastEditTime : void 0) !== bitmap.lastEditTime) {
        cacheItem = {
          lastEditTime: bitmap.lastEditTime,
          bounds: bitmap.getContentBounds()
        };
        this.constructor._pieceContentBoundsCache[asset.bitmapId] = cacheItem;
      }
      return cacheItem.bounds;
    }
  }
  ;
  PlayerCard.register(PlayerCard.id());
  PlayerCard.MaterialPieceTypes = [Chess.Piece.Types.Queen, Chess.Piece.Types.Rook, Chess.Piece.Types.Bishop, Chess.Piece.Types.Knight, Chess.Piece.Types.Pawn];
  PlayerCard._pieceContentBoundsCache = {};
  return PlayerCard;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.playercard.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/play/playercard/template.playercard.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.PlayerCard");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.PlayerCard"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.PlayerCard", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-play-playercard"
  }, "\n    ", HTML.DIV({
    class: "king"
  }, "\n      ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("kingPiece"));
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Piece"));
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: "details"
  }, "\n      ", HTML.DIV({
    class: "name"
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  })), "\n      ", HTML.DIV({
    class: "captured-pieces"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("capturedPieces"));
  }, function() {
    return [ "\n          ", HTML.DIV(HTML.Attrs({
      class: "captured-piece"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), Spacebars.dot(view.lookup("."), "style"));
    }), "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("piece"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Piece"));
      });
    }), "\n          "), "\n        " ];
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("materialDifferenceText"));
  }, function() {
    return [ "\n          ", HTML.SPAN({
      class: "material-difference"
    }, Blaze.View("lookup:materialDifferenceText", function() {
      return Spacebars.mustache(view.lookup("materialDifferenceText"));
    })), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"moveshistory":{"moveshistory.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/play/moveshistory/moveshistory.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  Chess,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Play.MovesHistory = function () {
  class MovesHistory extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.MovesHistory';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.play = this.ancestorComponentOfType(Chess.Interface.Play);
      return this.chess = this.play.chess;
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.autorun(() => {
        var gameManager, plyHistoryLength;
        if (!(gameManager = this.chess.gameManager())) {
          return;
        }
        plyHistoryLength = gameManager.plyHistory().length;
        if (this._previousPlyHistoryLength != null && plyHistoryLength > this._previousPlyHistoryLength) {
          Tracker.afterFlush(() => {
            return Meteor.setTimeout(() => {
              var scrollableArea;
              if (!(scrollableArea = this.childComponentsOfType(PAA.Pixeltosh.OS.Interface.ScrollableArea)[0])) {
                return;
              }
              return scrollableArea.scrollToBottom();
            }, 500);
          });
        }
        return this._previousPlyHistoryLength = plyHistoryLength;
      });
    }
    scrollbars() {
      return {
        vertical: {
          enabled: true
        }
      };
    }
    moves() {
      var blackPly, gameManager, i, plies, plyHistory, ref, results, whitePly, whitePlyNumber;
      if (!(gameManager = this.chess.gameManager())) {
        return;
      }
      plyHistory = gameManager.plyHistory();
      results = [];
      for (whitePlyNumber = i = 1, ref = plyHistory.length; i < ref; whitePlyNumber = i += 2) {
        whitePly = plyHistory[whitePlyNumber];
        plies = [{
          ply: whitePly,
          previousGameState: plyHistory[whitePlyNumber - 1].gameState,
          color: Chess.Piece.Colors.White
        }];
        if (blackPly = plyHistory[whitePlyNumber + 1]) {
          plies.push({
            ply: blackPly,
            previousGameState: whitePly.gameState,
            color: Chess.Piece.Colors.Black
          });
        }
        results.push({
          moveNumber: (whitePlyNumber + 1) / 2,
          plies: plies
        });
      }
      return results;
    }
    colorClass() {
      var plyInfo;
      plyInfo = this.currentData();
      return _.kebabCase(plyInfo.color);
    }
    activeClass() {
      var gameManager, plyInfo;
      if (!(gameManager = this.chess.gameManager())) {
        return;
      }
      plyInfo = this.currentData();
      if (plyInfo.ply.number === gameManager.currentDisplayedPlyNumber()) {
        return 'active';
      }
    }
    endingStatus() {
      var gameManager, gameState;
      if (!(gameManager = this.chess.gameManager())) {
        return;
      }
      if (!(gameState = gameManager.liveGameState())) {
        return;
      }
      if (gameState.checkmate()) {
        if (gameState.turn() === Chess.Piece.Colors.White) {
          return '0-1';
        } else {
          return '1-0';
        }
      } else if (gameManager.draw()) {
        return '½-½';
      }
    }
    moveText() {
      var capturedPiece, fromSquare, moveText, movingPiece, piece, ply, plyInfo, ref, ref1, ref2, toSquare;
      plyInfo = this.currentData();
      ply = plyInfo.ply;
      fromSquare = ply.move.from;
      toSquare = ply.move.to;
      piece = ply.gameState.getPieceAtSquare(toSquare);
      movingPiece = (ref = plyInfo.previousGameState) != null ? ref.getPieceAtSquare(fromSquare) : void 0;
      capturedPiece = (ref1 = plyInfo.previousGameState) != null ? ref1.getPieceAtSquare(toSquare) : void 0;
      if (movingPiece.type === Chess.Piece.Types.King && fromSquare.fileIndex === 4 && ((ref2 = toSquare.fileIndex) === 6 || ref2 === 2)) {
        moveText = toSquare.fileIndex === 6 ? '0-0' : '0-0-0';
      } else {
        moveText = this._normalMoveText(movingPiece, piece, ply.move, plyInfo.previousGameState, capturedPiece);
      }
      if (ply.gameState.checkmate()) {
        moveText += '#';
      } else if (ply.gameState.check()) {
        moveText += '+';
      }
      return moveText;
    }
    _normalMoveText(movingPiece, piece, move, previousGameState, capturedPiece) {
      var disambiguationText, moveText;
      if (movingPiece.type === Chess.Piece.Types.Pawn) {
        moveText = capturedPiece ? move.from.name[0].toLowerCase() : '';
      } else {
        disambiguationText = this._disambiguationText(movingPiece, move, previousGameState);
        moveText = "".concat(movingPiece.letter.toUpperCase()).concat(disambiguationText);
      }
      if (capturedPiece) {
        moveText += 'x';
      }
      moveText += move.to.name.toLowerCase();
      moveText += this._promotionText(movingPiece, piece);
      return moveText;
    }
    _promotionText(movingPiece, piece) {
      if (movingPiece.type !== Chess.Piece.Types.Pawn) {
        return '';
      }
      if (piece.type === Chess.Piece.Types.Pawn) {
        return '';
      }
      return "=".concat(piece.letter.toUpperCase());
    }
    _disambiguationText(piece, move, previousGameState) {
      var ambiguousFromSquares, fromSquare, fromSquareName, otherPiece, sameFile, sameRank;
      ambiguousFromSquares = function () {
        var i, len, ref, ref1, results;
        ref = previousGameState.occupiedSquares();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          fromSquare = ref[i];
          if (!(fromSquare !== move.from)) {
            continue;
          }
          otherPiece = previousGameState.getPieceAtSquare(fromSquare);
          if (!(otherPiece.color === piece.color && otherPiece.type === piece.type)) {
            continue;
          }
          if (ref1 = move.to, indexOf.call(previousGameState.getLegalDestinationsFromSquare(fromSquare), ref1) < 0) {
            continue;
          }
          results.push(fromSquare);
        }
        return results;
      }();
      if (!ambiguousFromSquares.length) {
        return '';
      }
      sameFile = _.find(ambiguousFromSquares, ambiguousFromSquare => {
        return ambiguousFromSquare.fileIndex === move.from.fileIndex;
      });
      sameRank = _.find(ambiguousFromSquares, ambiguousFromSquare => {
        return ambiguousFromSquare.rankIndex === move.from.rankIndex;
      });
      fromSquareName = move.from.name.toLowerCase();
      if (sameFile && sameRank) {
        return fromSquareName;
      } else if (sameFile) {
        return fromSquareName[1];
      } else {
        return fromSquareName[0];
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .ply': this.onClickPly
      });
    }
    onClickPly(event) {
      var ply, ref;
      if (!(ply = (ref = this.currentData()) != null ? ref.ply : void 0)) {
        return;
      }
      return this.chess.gameManager().displayPosition(ply.number);
    }
  }
  ;
  MovesHistory.register(MovesHistory.id());
  return MovesHistory;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.moveshistory.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/play/moveshistory/template.moveshistory.js            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.MovesHistory");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.MovesHistory"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Play.MovesHistory", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-play-moveshistory"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("scrollbars"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "OS", "Interface", "ScrollableArea"));
    }, function() {
      return [ "\n      ", HTML.OL({
        class: "moves"
      }, "\n        ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("moves"));
      }, function() {
        return [ "\n          ", HTML.LI({
          class: "move"
        }, "\n            ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("plies"));
        }, function() {
          return [ "\n              ", HTML.DIV({
            class: function() {
              return [ "ply ", Spacebars.mustache(view.lookup("colorClass")), " ", Spacebars.mustache(view.lookup("activeClass")) ];
            },
            "data-cursor": "pointer"
          }, Blaze.View("lookup:moveText", function() {
            return Spacebars.mustache(view.lookup("moveText"));
          })), "\n            " ];
        }), "\n          "), "\n        " ];
      }), "\n      "), "\n      ", Blaze.If(function() {
        return Spacebars.call(view.lookup("endingStatus"));
      }, function() {
        return [ "\n        ", HTML.DIV({
          class: "ending-status"
        }, Blaze.View("lookup:endingStatus", function() {
          return Spacebars.mustache(view.lookup("endingStatus"));
        })), "\n      " ];
      }), "\n    " ];
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"about":{"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/about/about.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, Chess, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.About = function () {
  class About extends FM.Dialog {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.About';
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
      return this.$('.pixelartacademy-pixeltosh-programs-chess-interface-about').closest('.dialog-area').on('click', () => {
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
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/about/template.about.js                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.About");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.About"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.About", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixeltosh-programs-chess-interface-about pixelartacademy-pixeltosh-os-interface-rectanglearea">\n    <div class="title">国际象棋学院</div>\n    <p>循序渐进地学习国际象棋。</p>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"shop":{"shop.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/shop/shop.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, FM, LOI, PAA;
AM = Artificial.Mirage;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Shop = function () {
  class Shop extends PAA.Pixeltosh.Program.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Shop';
    }
    static createInterfaceData() {
      return {
        contentComponentId: this.id(),
        programId: PAA.Pixeltosh.Programs.Chess.id(),
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      return this.chess = this.os.getProgram(Chess);
    }
    pieces() {
      var i, len, pieceData, pieceType, ref, results;
      ref = this.constructor.StorePieces;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        pieceType = ref[i];
        pieceData = Chess.Piece.InfoForType[pieceType];
        results.push(_.extend({
          type: pieceType
        }, pieceData));
      }
      return results;
    }
    ownedCount() {
      var piece;
      piece = this.currentData();
      return Chess.ownedPiecesCount(piece.type);
    }
    needsPiece() {
      var piece;
      piece = this.currentData();
      return Chess.ownedPiecesCount(piece.type) < piece.requiredCount;
    }
    buyButtonDisabledAttribute() {
      var piece;
      piece = this.currentData();
      if (Chess.currency() < piece.value) {
        return 'disabled';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .buy-button': this.onClickBuyButton,
        'click .close-button': this.onClickCloseButton
      });
    }
    onClickBuyButton(event) {
      var ownedPieceTypeCounts, piece;
      piece = this.currentData();
      Chess.currency(Chess.currency() - piece.value);
      ownedPieceTypeCounts = Chess.ownedPieceTypeCounts();
      ownedPieceTypeCounts[piece.type] = (ownedPieceTypeCounts[piece.type] || 0) + 1;
      return Chess.ownedPieceTypeCounts(ownedPieceTypeCounts);
    }
    onClickCloseButton(event) {
      return this.chess.interfaceManager().closeShop();
    }
  }
  ;
  Shop.register(Shop.id());
  Shop.StorePieces = [Chess.Piece.Types.Pawn, Chess.Piece.Types.Bishop, Chess.Piece.Types.Knight, Chess.Piece.Types.Rook, Chess.Piece.Types.Queen, Chess.Piece.Types.King];
  return Shop;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.shop.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/shop/template.shop.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Shop");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Shop"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Shop", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-shop pixelartacademy-pixeltosh-chess pixelartacademy-pixeltosh-os-interface-rectanglearea"
  }, "\n    ", HTML.OL({
    class: "pieces"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("pieces"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "piece"
    }, "\n          ", HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:type", function() {
      return Spacebars.mustache(view.lookup("type"));
    })), "\n          ", HTML.SPAN({
      class: "price"
    }, HTML.SPAN({
      class: "currency"
    }, Blaze.View("lookup:value", function() {
      return Spacebars.mustache(view.lookup("value"));
    }))), "\n          ", HTML.SPAN({
      class: "owned"
    }, "Owned: ", Blaze.View("lookup:ownedCount", function() {
      return Spacebars.mustache(view.lookup("ownedCount"));
    }), "/", Blaze.View("lookup:requiredCount", function() {
      return Spacebars.mustache(view.lookup("requiredCount"));
    })), "\n          ", HTML.SPAN({
      class: "purchase"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("needsPiece"));
    }, function() {
      return [ "\n              ", HTML.BUTTON(HTML.Attrs({
        class: "buy-button pixelartacademy-pixeltosh-os-interface-button"
      }, function() {
        return Spacebars.attrMustache(view.lookup("buyButtonDisabledAttribute"));
      }), "Buy"), "\n            " ];
    }), "\n          "), "\n        "), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: "player-status"
  }, HTML.Raw('\n      <div class="available">货币：</div>\n      '), HTML.SPAN({
    class: "currency"
  }, Blaze.View("lookup:chess.currency", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("chess"), "currency"));
  })), "\n    "), HTML.Raw('\n    <div class="actions">\n      <button class="close-button pixelartacademy-pixeltosh-os-interface-button">关闭</button>\n    </div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"boarddisplaychoice":{"boarddisplaychoice.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/boarddisplaychoice/boarddisplaychoice.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, FM, LOI, PAA;
AM = Artificial.Mirage;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.BoardDisplayChoice = function () {
  class BoardDisplayChoice extends PAA.Pixeltosh.Program.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.BoardDisplayChoice';
    }
    static createInterfaceData() {
      return {
        contentComponentId: this.id(),
        programId: PAA.Pixeltosh.Programs.Chess.id(),
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.chess = this.os.getProgram(Chess);
      this.choice = new ReactiveField(null);

      // Auto-close when the choice is made (through this UI or the program menu).
      return this.autorun(computation => {
        if (!Chess.state('boardDisplayType')) {
          return;
        }
        return this.chess.interfaceManager().closeBoardDisplayChoice();
      });
    }
    choiceIsAvailable() {
      // TODO: Change when 3D chess exists.
      return this.choice() === Chess.BoardDisplayTypes.TwoDimensional;
    }
    options() {
      return [{
        type: Chess.BoardDisplayTypes.TwoDimensional,
        label: '2D'
      }, {
        type: Chess.BoardDisplayTypes.ThreeDimensional,
        label: '3D'
      }];
    }
    boardDisplayTypeClass() {
      var option;
      option = this.currentData();
      return _.kebabCase(option.type);
    }
    activeClass() {
      var option;
      option = this.currentData();
      if (option.type === this.choice()) {
        return 'active';
      }
    }
    doneButtonDisabledAttribute() {
      if (!this.choiceIsAvailable()) {
        // Change when 3D chess exists.
        return 'disabled';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .option-button': this.onClickOptionButton,
        'click .done-button': this.onClickDoneButton
      });
    }
    onClickOptionButton(event) {
      var option;
      option = this.currentData();
      return this.choice(option.type);
    }
    onClickDoneButton(event) {
      return Chess.state('boardDisplayType', this.choice());
    }
  }
  ;
  BoardDisplayChoice.register(BoardDisplayChoice.id());
  return BoardDisplayChoice;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.boarddisplaychoice.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/boarddisplaychoice/template.boarddisplaychoice.js     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.BoardDisplayChoice");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.BoardDisplayChoice"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.BoardDisplayChoice", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-boarddisplaychoice"
  }, "\n    ", HTML.DIV({
    class: "window pixelartacademy-pixeltosh-chess pixelartacademy-pixeltosh-os-interface-rectanglearea"
  }, HTML.Raw('\n      <div class="title">选择棋盘样式</div>\n      '), HTML.DIV({
    class: "options"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("options"));
  }, function() {
    return [ "\n          ", HTML.DIV({
      class: function() {
        return [ "option ", Spacebars.mustache(view.lookup("boardDisplayTypeClass")), " ", Spacebars.mustache(view.lookup("activeClass")) ];
      }
    }, HTML.Raw('\n            <button class="option-button">\n              <span class="preview"></span>\n            </button>\n            '), HTML.SPAN({
      class: "label"
    }, Blaze.View("lookup:label", function() {
      return Spacebars.mustache(view.lookup("label"));
    })), "\n          "), "\n        " ];
  }), "\n      "), "\n      ", HTML.DIV({
    class: "actions"
  }, "\n        ", HTML.BUTTON(HTML.Attrs({
    class: "done-button pixelartacademy-pixeltosh-os-interface-button"
  }, function() {
    return Spacebars.attrMustache(view.lookup("doneButtonDisabledAttribute"));
  }), "Done"), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"earnings":{"earnings.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/earnings/earnings.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, FM, LOI, PAA;
AM = Artificial.Mirage;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Earnings = function () {
  class Earnings extends PAA.Pixeltosh.Program.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Earnings';
    }
    static createInterfaceData() {
      return {
        contentComponentId: this.id(),
        programId: PAA.Pixeltosh.Programs.Chess.id(),
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.chess = this.os.getProgram(Chess);
      return this.pendingRewards = Chess.pendingRewards();
    }
    async onRendered() {
      var $rewards, $value, delayPerReward, duration, easing, offset, reward, rewardIndex, rewardPromises, scale, slowCPUEmulation, sourceOffset, targetOffset;
      super.onRendered(...arguments);
      await _.waitForSeconds(1);
      targetOffset = $('.player-status .currency-area .currency').offset();
      scale = this.os.display.scale();

      // Determine the style of the animation.
      slowCPUEmulation = LOI.settings.graphics.slowCPUEmulation.value();
      duration = slowCPUEmulation ? 400 : 300;
      easing = slowCPUEmulation ? 'linear' : 'easeOutQuad';
      delayPerReward = 100;
      $rewards = this.$('.rewards');
      rewardPromises = function () {
        var i, len, ref, results;
        ref = _.reverse($rewards);
        results = [];
        for (rewardIndex = i = 0, len = ref.length; i < len; rewardIndex = ++i) {
          reward = ref[rewardIndex];
          $value = $(reward).find('.value');
          sourceOffset = $value.offset();
          offset = {
            left: (targetOffset.left - sourceOffset.left) / scale,
            top: (targetOffset.top - sourceOffset.top) / scale
          };
          results.push(new Promise(resolve => {
            return ((offset, $value) => {
              return $value.velocity({
                tween: 1
              }, {
                duration: duration,
                easing: easing,
                delay: delayPerReward * rewardIndex,
                progress: (elements, complete, remaining, start, tweenValue) => {
                  var currentFrameTime, lastFrameTime;
                  if (slowCPUEmulation) {
                    currentFrameTime = Date.now();
                    if (typeof lastFrameTime !== "undefined" && lastFrameTime !== null && currentFrameTime - lastFrameTime < frameDuration) {
                      return;
                    }
                    lastFrameTime = currentFrameTime;
                  }
                  return $value.css({
                    left: "".concat(Math.round(offset.left * tweenValue), "rem"),
                    top: "".concat(Math.round(offset.top * tweenValue), "rem")
                  });
                },
                complete: () => {
                  var pendingReward, ref1;
                  $value.css('visibility', 'hidden');
                  pendingReward = this.pendingRewards.pop();
                  Chess.pendingRewards(this.pendingRewards);
                  reward = (ref1 = this.chess.rewardsManager()) != null ? ref1.getReward(pendingReward.id) : void 0;
                  Chess.currency(Chess.currency() + reward.value(pendingReward.data));
                  return Tracker.afterFlush(() => {
                    return resolve();
                  });
                }
              });
            })(offset, $value);
          }));
        }
        return results;
      }.call(this);
      await Promise.all(rewardPromises);
      return this.chess.interfaceManager().closeEarnings();
    }
    reward() {
      var pendingReward, ref;
      pendingReward = this.currentData();
      return (ref = this.chess.rewardsManager()) != null ? ref.getReward(pendingReward.id) : void 0;
    }
  }
  ;
  Earnings.register(Earnings.id());
  return Earnings;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.earnings.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/earnings/template.earnings.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Earnings");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Earnings"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Earnings", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-earnings pixelartacademy-pixeltosh-chess pixelartacademy-pixeltosh-os-interface-rectanglearea"
  }, HTML.Raw('\n    <div class="title">已获得</div>\n    '), HTML.OL({
    class: "rewards"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("pendingRewards"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "reward"
    }, "\n          ", HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:reward.displayName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("reward"), "displayName"));
    })), "\n          ", HTML.SPAN({
      class: "value currency"
    }, Blaze.View("lookup:reward.value", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("reward"), "value"), view.lookup("data"));
    })), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"chessboard":{"chessboard.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/chessboard.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard = function () {
  class Chessboard extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      return this.chess = this.os.getProgram(Chess);
    }
    boardDisplayType() {
      return Chess.boardDisplayType();
    }
  }
  ;
  Chessboard.register(Chessboard.id());
  Chessboard.Providers = {
    GameManager: 'gameManager',
    LessonManager: 'lessonManager'
  };
  return Chessboard;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.chessboard.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/template.chessboard.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-chessboard"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("boardDisplayType"), "TwoDimensional");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional"));
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"component.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/component.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, FM, LOI, PAA;
AM = Artificial.Mirage;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.Component = class Component extends AM.Component {
  onCreated() {
    super.onCreated(...arguments);
    this.interface = this.ancestorComponentOfType(FM.Interface);
    this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
    return this.chess = this.os.getProgram(Chess);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"twodimensional":{"twodimensional.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/twodimensional.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess,
  LOI,
  PAA,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.TwoDimensional = function () {
  class TwoDimensional extends Chess.Interface.Chessboard.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional';
    }
    onCreated() {
      var chessboardData, file, fileIndex, i, rankIndex, results;
      super.onCreated(...arguments);
      chessboardData = this.interface.getComponentData(Chess.Interface.Chessboard);
      this.selectedSquare = chessboardData.child('selectedSquare').value;
      this.promotionInfo = chessboardData.child('promotionInfo').value;
      // Create board squares.
      this.squares = [];
      results = [];
      for (fileIndex = i = 0; i < 8; fileIndex = ++i) {
        file = [];
        this.squares.push(file);
        results.push(function () {
          var j, results1;
          results1 = [];
          for (rankIndex = j = 0; j < 8; rankIndex = ++j) {
            results1.push(file[rankIndex] = new this.constructor.Square(this, Chess.Square[fileIndex][rankIndex]));
          }
          return results1;
        }.call(this));
      }
      return results;
    }
    onRendered() {
      var file, i, j, len, len1, rank, ref, ref1, results;
      super.onRendered(...arguments);
      ref = Chess.Square.RankNumbers;
      for (i = 0, len = ref.length; i < len; i++) {
        rank = ref[i];
        this.$('.ranks .border').append("<div class='coordinate'>".concat(rank, "</div>"));
      }
      ref1 = Chess.Square.FileLetters;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        file = ref1[j];
        results.push(this.$('.files .border').append("<div class='coordinate'>".concat(file, "</div>")));
      }
      return results;
    }
    provider() {
      var providerName;
      providerName = this.data();
      return this.chess[providerName]();
    }
    legalMoveSquares() {
      var ref, selectedSquare;
      if (!((ref = this.provider()) != null ? ref.humanCanMove() : void 0)) {
        return [];
      }
      if (!(selectedSquare = this.selectedSquare())) {
        return [];
      }
      return this.provider().getLegalDestinationsFromSquare(selectedSquare);
    }
    humanCanMovePieceOnSquare(square) {
      var gameState, piece, provider;
      if (!(provider = this.provider())) {
        return;
      }
      if (!provider.humanCanMove()) {
        return;
      }
      gameState = provider.gameState();
      piece = gameState.getPieceAtSquare(square);
      return (piece != null ? piece.color : void 0) === gameState.turn() && provider.getLegalDestinationsFromSquare(square).length;
    }
    performMoveTo(square) {
      let moveWasDragged = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var automaticFlippedBoard, gameState, interfaceManager, move, piece, provider, ref, selectedSquare, showPromotion;
      selectedSquare = this.selectedSquare();
      provider = this.provider();
      gameState = provider.gameState();
      piece = gameState.getPieceAtSquare(selectedSquare);
      move = new Chess.Move(selectedSquare, square);
      showPromotion = piece.type === Chess.Piece.Types.Pawn && ((ref = move.to.rankIndex) === 0 || ref === 7) && !this.chess.interfaceManager().autoPromotion();
      if (moveWasDragged) {
        // Skip animating a dragged piece when promoting and when the board will not automatically flip.
        interfaceManager = this.chess.interfaceManager();
        automaticFlippedBoard = interfaceManager.automaticBoardOrientationForGameState(gameState.applyMove(move));
        if (showPromotion || automaticFlippedBoard == null) {
          this._skipMoveAnimationTo = square;
        }
      }
      this._skipPickUpSoundTo = square;
      if (showPromotion) {
        this.promotionInfo({
          move: move,
          color: piece.color
        });
        return provider.startPromotion(move);
      } else {
        this.performMove(move);
        if (moveWasDragged) {
          if (gameState.getPieceAtSquare(square)) {
            return this.chess.audio.capture();
          } else {
            return this.chess.audio.drop();
          }
        }
      }
    }
    performMove(move) {
      this.provider().move(move);
      this.selectedSquare(null);
      this.promotionInfo(null);

      // Reset the grabbing cursor since the piece element will be removed
      // and the pointer leave event will not handle the cursor change.
      return this.chess.os.cursor().setClass(null);
    }
    choosePromotion(pieceType) {
      var promotionInfo;
      promotionInfo = this.promotionInfo();
      promotionInfo.move.promotionPieceType = pieceType;
      return this.performMove(promotionInfo.move);
    }
    cancelPromotion() {
      this.promotionInfo(null);
      this.selectedSquare(null);
      return this.provider().cancelPromotion();
    }
    selectSquare(square) {
      return this.selectedSquare(square);
    }
    coordinatesVisibleClass() {
      var interfaceManager;
      if (!(interfaceManager = this.chess.interfaceManager())) {
        return;
      }
      if (interfaceManager.displayBoardCoordinates()) {
        return 'visible';
      }
    }
    flippedClass() {
      var ref;
      if ((ref = this.chess.interfaceManager()) != null ? ref.flippedBoard() : void 0) {
        return 'flipped';
      }
    }
    themeClass() {
      var interfaceManager;
      if (!(interfaceManager = this.chess.interfaceManager())) {
        return;
      }
      return _.kebabCase(interfaceManager.chessboardTheme());
    }
    onClickSquare(square) {
      var provider;
      if (this._ignoreNextClick) {
        this._ignoreNextClick = false;
        return;
      }
      if (!(provider = this.provider())) {
        return;
      }
      if (!provider.humanCanMove()) {
        return;
      }
      if (!this.selectedSquare()) {
        return;
      }

      // If the player clicked one of the legal destination squares, move the selected piece.
      if (indexOf.call(this.legalMoveSquares(), square) >= 0) {
        this.performMoveTo(square);
        return;
      }
      // Otherwise, we deselect the square.
      this.selectedSquare(null);
      return this.chess.audio.drop();
    }
  }
  ;
  TwoDimensional.Providers = {
    GameManager: 'gameManager',
    LessonManager: 'lessonManager'
  };
  return TwoDimensional;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.twodimensional.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/template.twodimensional.js  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "board ", Spacebars.mustache(view.lookup("themeClass")), " ", Spacebars.mustache(view.lookup("flippedClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: "squares"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("squares"));
  }, function() {
    return [ "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("."));
    }, function() {
      return [ "\n            ", Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("."));
      }, function() {
        return Spacebars.include(view.lookupTemplate("Render"));
      }), "\n          " ];
    }), "\n        " ];
  }), "\n      "), "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Markup"));
  }), "\n      ", HTML.DIV({
    class: function() {
      return [ "coordinates ", Spacebars.mustache(view.lookup("coordinatesVisibleClass")) ];
    }
  }, HTML.Raw('\n        <div class="files">\n          <div class="top border"></div>\n          <div class="bottom border"></div>\n        </div>\n        <div class="ranks">\n          <div class="left border"></div>\n          <div class="right border"></div>\n        </div>\n      ')), "\n    "), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("promotionInfo"));
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Promotion"));
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"twodimensional-animation.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/twodimensional-animation.co //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  Chess,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Base;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.TwoDimensional = class TwoDimensional extends Chess.Interface.Chessboard.TwoDimensional {
  onCreated() {
    super.onCreated(...arguments);
    this.pieceAnimation = new AB.Event(this);
    // Reactively prepare animation information when game state changes.
    return this.autorun(() => {
      var gameState, previousGameState, provider, soundCaptures;
      if (!(provider = this.provider())) {
        return;
      }
      gameState = provider.gameState();
      soundCaptures = !provider.displayingLivePosition || provider.displayingLivePosition();
      // Reset animations when we don't have a game state anymore.
      if (!gameState) {
        this._previousGameState = null;
        return;
      }
      if (!this._previousGameState) {
        this._previousGameState = gameState;
        return;
      }
      previousGameState = this._previousGameState;
      this._previousGameState = gameState;
      return this._animateGameStateChange(previousGameState, gameState, soundCaptures);
    });
  }
  _animateGameStateChange(previousGameState, nextGameState, soundCaptures) {
    var pieceAnimations;
    if (previousGameState.hasSamePiecePlacementAs(nextGameState)) {
      return;
    }
    pieceAnimations = this._createPieceAnimations(previousGameState, nextGameState, soundCaptures);
    this._skipMoveAnimationTo = null;
    this._skipPickUpSoundTo = null;
    if (!pieceAnimations.length) {
      return;
    }
    return Tracker.afterFlush(() => {
      var i, len, pieceAnimation, results;
      results = [];
      for (i = 0, len = pieceAnimations.length; i < len; i++) {
        pieceAnimation = pieceAnimations[i];
        results.push(this.pieceAnimation(pieceAnimation));
      }
      return results;
    });
  }
  _createPieceAnimations(previousGameState, nextGameState, soundCaptures) {
    var fromSquare, i, len, piece, pieceAnimations, ref, ref1, toSquare, usedPreviousSquares;
    usedPreviousSquares = {};
    pieceAnimations = [];
    ref = nextGameState.occupiedSquares();
    for (i = 0, len = ref.length; i < len; i++) {
      toSquare = ref[i];
      piece = nextGameState.getPieceAtSquare(toSquare);
      if (previousGameState.hasPieceAtSquare(piece, toSquare)) {
        continue;
      }
      fromSquare = this._findPreviousSquareForPiece(piece, previousGameState, nextGameState, usedPreviousSquares);
      if (fromSquare == null) {
        fromSquare = this._findPreviousSquareForPromotedPiece(piece, toSquare, previousGameState, nextGameState, usedPreviousSquares);
      }
      if (!fromSquare) {
        continue;
      }
      usedPreviousSquares[fromSquare.name] = true;
      if (toSquare === this._skipMoveAnimationTo) {
        continue;
      }
      pieceAnimations.push({
        move: new Chess.Move(fromSquare, toSquare),
        promotion: previousGameState.getPieceAtSquare(fromSquare).type === Chess.Piece.Types.Pawn && (ref1 = piece.type, indexOf.call(Chess.Piece.PromotionTypes, ref1) >= 0),
        skipPickUpSound: toSquare === this._skipPickUpSoundTo,
        capture: previousGameState.getPieceAtSquare(toSquare) && soundCaptures
      });
    }
    return pieceAnimations;
  }
  _findPreviousSquareForPiece(piece, previousGameState, nextGameState, usedPreviousSquares) {
    var fromSquare, i, len, ref;
    ref = previousGameState.occupiedSquares();
    for (i = 0, len = ref.length; i < len; i++) {
      fromSquare = ref[i];
      if (usedPreviousSquares[fromSquare.name]) {
        continue;
      }
      if (!previousGameState.hasPieceAtSquare(piece, fromSquare)) {
        continue;
      }
      if (nextGameState.hasPieceAtSquare(piece, fromSquare)) {
        continue;
      }
      return fromSquare;
    }
  }
  _findPreviousSquareForPromotedPiece(piece, toSquare, previousGameState, nextGameState, usedPreviousSquares) {
    var fromSquare, i, len, pawn, ref, ref1, ref2;
    if (ref = piece.type, indexOf.call(Chess.Piece.PromotionTypes, ref) < 0) {
      return;
    }
    if ((ref1 = toSquare.rankIndex) !== 0 && ref1 !== 7) {
      return;
    }
    pawn = new Chess.Piece(piece.color, Chess.Piece.Types.Pawn);
    ref2 = previousGameState.occupiedSquares();
    for (i = 0, len = ref2.length; i < len; i++) {
      fromSquare = ref2[i];
      if (usedPreviousSquares[fromSquare.name]) {
        continue;
      }
      if (!previousGameState.hasPieceAtSquare(pawn, fromSquare)) {
        continue;
      }
      if (nextGameState.hasPieceAtSquare(pawn, fromSquare)) {
        continue;
      }
      if (indexOf.call(previousGameState.getLegalDestinationsFromSquare(fromSquare), toSquare) < 0) {
        continue;
      }
      return fromSquare;
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"twodimensional-dragging.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/twodimensional-dragging.cof //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess,
  PAA,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.TwoDimensional = function () {
  class TwoDimensional extends Chess.Interface.Chessboard.TwoDimensional {
    onCreated() {
      super.onCreated(...arguments);
      return this.pieceDraggingInfo = new ReactiveField(null);
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this._endDraggingEvents();
    }
    _endDraggingEvents() {
      return $(document).off('.pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-dragging');
    }
    onPointerDownSquare(square, event) {
      var $destinationSquare, $document, cursor, displayScale, dragStartCoordinates, pieceDraggingInfo, previousSelectedSquare, squareCenterCoordinates, squareOffset;
      if (!this.humanCanMovePieceOnSquare(square)) {
        return;
      }
      previousSelectedSquare = this.selectedSquare();
      this.selectedSquare(square);
      if (square !== previousSelectedSquare) {
        this.chess.audio.pickUp();
      }
      this._endDraggingEvents();
      cursor = this.os.cursor();
      dragStartCoordinates = cursor.coordinates();
      if (!dragStartCoordinates) {
        return;
      }
      $destinationSquare = $(event.currentTarget);
      squareOffset = $destinationSquare.offset();
      displayScale = this.os.display.scale();
      squareCenterCoordinates = {
        x: dragStartCoordinates.x + ($destinationSquare.outerWidth() / 2 + squareOffset.left - event.pageX) / displayScale,
        y: dragStartCoordinates.y + ($destinationSquare.outerHeight() / 2 + squareOffset.top - event.pageY) / displayScale
      };
      // Prepare dragging info, but don't activate dragging yet since we'll wait for actual cursor movement.
      pieceDraggingInfo = {
        square: square,
        delta: {
          x: 0,
          y: 0
        },
        active: false
      };
      this.pieceDraggingInfo(pieceDraggingInfo);
      $document = $(document);
      cursor = this.os.cursor();
      $document.on('pointermove.pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-dragging', event => {
        var coordinates;
        if (!(coordinates = cursor.coordinates())) {
          return;
        }
        if (coordinates.x === dragStartCoordinates.x && coordinates.y === dragStartCoordinates.y) {
          return;
        }
        // Activate dragging only once the rounded cursor coordinates change while still down.
        pieceDraggingInfo.active = true;
        pieceDraggingInfo.delta = {
          x: coordinates.x - squareCenterCoordinates.x,
          y: coordinates.y - squareCenterCoordinates.y
        };
        this.selectedSquare(square);
        this.pieceDraggingInfo(_.extend({}, pieceDraggingInfo));
        return cursor.requestClass('grabbing', this);
      });
      return $document.on('pointerup.pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-dragging', event => {
        var destinationSquare, ref, wasDragging;
        this._endDraggingEvents();
        wasDragging = (ref = this.pieceDraggingInfo()) != null ? ref.active : void 0;
        this.pieceDraggingInfo(null);
        cursor.endClassRequests(this);
        if (wasDragging || previousSelectedSquare !== square) {
          this._ignoreNextClick = true;
          Meteor.setTimeout(() => {
            return this._ignoreNextClick = false;
          });
        }
        if (!wasDragging) {
          return;
        }
        $destinationSquare = $(event.target).closest('.pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-square');
        destinationSquare = Chess.Square[$destinationSquare.data('square-name')];
        if (indexOf.call(this.provider().getLegalDestinationsFromSquare(square), destinationSquare) >= 0) {
          this.performMoveTo(destinationSquare, true);
        } else {
          this.chess.audio.drop();
        }
        return this.selectedSquare(null);
      });
    }
  }
  ;
  TwoDimensional.register(TwoDimensional.id());
  return TwoDimensional;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"square":{"square.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/square/square.coffee        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  Chess,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.TwoDimensional.Square = function () {
  class Square extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Square';
    }
    constructor(chessboard, square) {
      super(...arguments);
      this.chessboard = chessboard;
      this.square = square;
      this.fileIndex = this.square.fileIndex;
      this.rankIndex = this.square.rankIndex;
    }
    legalMove() {
      var ref;
      return ref = this.square, indexOf.call(this.chessboard.legalMoveSquares(), ref) >= 0;
    }
    colorClass() {
      return _.kebabCase(this.square.color);
    }
    selectedClass() {
      if (this.chessboard.selectedSquare() === this.square) {
        return 'selected';
      }
    }
    legalMoveClass() {
      if (this.legalMove()) {
        return 'legal-move';
      }
    }
    movablePieceClass() {
      if (this.chessboard.humanCanMovePieceOnSquare(this.square)) {
        return 'movable-piece';
      }
    }
    cursorAttribute() {
      if (this.legalMove() || this.chessboard.humanCanMovePieceOnSquare(this.square)) {
        return {
          'data-cursor': 'grab'
        };
      }
    }
    pieceRenderData() {
      var ref, ref1;
      return (ref = this.chessboard.provider()) != null ? (ref1 = ref.gameState()) != null ? ref1.getPieceAtSquare(this.square) : void 0 : void 0;
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown': this.onPointerDown,
        'click': this.onClick
      });
    }
    onPointerDown(event) {
      return this.chessboard.onPointerDownSquare(this.square, event);
    }
    onClick(event) {
      return this.chessboard.onClickSquare(this.square);
    }
  }
  ;
  Square.register(Square.id());
  Square.Size = 21;
  return Square;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.square.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/square/template.square.js   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Square");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Square"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Square", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-square ", Spacebars.mustache(view.lookup("colorClass")), " ", Spacebars.mustache(view.lookup("selectedClass")), " ", Spacebars.mustache(view.lookup("legalMoveClass")), " ", Spacebars.mustache(view.lookup("movablePieceClass")) ];
    },
    "data-square-name": function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("square"), "name"));
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("cursorAttribute"));
  }), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("pieceRenderData"));
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Piece"));
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"piece":{"piece.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/piece/piece.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.TwoDimensional.Piece = function () {
  class Piece extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Piece';
    }
    onCreated() {
      var ref, ref1;
      super.onCreated(...arguments);
      this.square = (ref = this.ancestorComponentOfType(Chess.Interface.Chessboard.TwoDimensional.Square)) != null ? ref.square : void 0;
      this.chessboard = this.ancestorComponentOfType(Chess.Interface.Chessboard.TwoDimensional);
      // Listen for chessboard animations if we're rendered in the chessboard.
      if ((ref1 = this.chessboard) != null) {
        ref1.pieceAnimation.addHandler(this, this.onAnimation);
      }
      this.animating = new ReactiveField(false);
      this.promoting = new ReactiveField(false);
      this.bitmapId = new ComputedField(() => {
        var asset, assetId, piece, project, type;
        piece = this.data();
        type = this.promoting() ? Chess.Piece.Types.Pawn : piece.type;
        assetId = Chess.Assets.TwoDimensional[type][piece.color].id();
        if (!(project = PAA.Practice.Project.documents.findOne(Chess.projectId2D()))) {
          return;
        }
        if (!(asset = _.find(project.assets, asset => {
          return asset.id === assetId;
        }))) {
          return;
        }
        return asset.bitmapId;
      });
      return this.bitmap = new ComputedField(() => {
        var bitmapId;
        if (!(bitmapId = this.bitmapId())) {
          return;
        }
        return LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId, false);
      });
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      return (ref = this.chessboard) != null ? ref.pieceAnimation.removeHandlers(this) : void 0;
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$piece = this.$('.pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-piece');
      if (this._pendingPieceAnimation) {
        this._animatePieceAnimation(this._pendingPieceAnimation);
        return this._pendingPieceAnimation = null;
      }
    }
    bitmapImageOptions() {
      return {
        bitmap: () => {
          return this.bitmap();
        }
      };
    }
    draggedClass() {
      var pieceDraggingInfo, ref;
      if (!(pieceDraggingInfo = (ref = this.chessboard) != null ? ref.pieceDraggingInfo() : void 0)) {
        return;
      }
      if (!pieceDraggingInfo.active) {
        return;
      }
      if (pieceDraggingInfo.square === this.square) {
        return 'dragged';
      }
    }
    draggedStyle() {
      var pieceDraggingInfo, ref;
      if (!(pieceDraggingInfo = (ref = this.chessboard) != null ? ref.pieceDraggingInfo() : void 0)) {
        return;
      }
      if (!pieceDraggingInfo.active) {
        return;
      }
      if (pieceDraggingInfo.square !== this.square) {
        return;
      }
      return {
        left: "".concat(pieceDraggingInfo.delta.x, "rem"),
        top: "".concat(pieceDraggingInfo.delta.y, "rem")
      };
    }
    animatingClass() {
      if (this.animating()) {
        return 'animating';
      }
    }
    onAnimation(animation) {
      if (animation.move.to !== this.square) {
        return;
      }
      if (!this.$piece) {
        this._pendingPieceAnimation = animation;
        return;
      }
      return this._animatePieceAnimation(animation);
    }
    _animatePieceAnimation(animation) {
      var duration, easing, fileOffset, frameDuration, lastFrameTime, offset, rankOffset, ref, slowCPUEmulation;
      if (!animation.skipPickUpSound) {
        this.chessboard.chess.audio.pickUp();
      }
      if (animation.capture) {
        this.chessboard.chess.audio.capture();
      }
      if (animation.promotion) {
        this.promoting(true);
      }

      // Determine where we should animate from.
      if ((ref = this.chessboard.chess.interfaceManager()) != null ? ref.flippedBoard() : void 0) {
        fileOffset = animation.move.to.fileIndex - animation.move.from.fileIndex;
        rankOffset = animation.move.from.rankIndex - animation.move.to.rankIndex;
      } else {
        fileOffset = animation.move.from.fileIndex - animation.move.to.fileIndex;
        rankOffset = animation.move.to.rankIndex - animation.move.from.rankIndex;
      }
      offset = {
        x: fileOffset * this.chessboard.constructor.Square.Size,
        y: rankOffset * this.chessboard.constructor.Square.Size
      };

      // Determine the style of the animation.
      slowCPUEmulation = LOI.settings.graphics.slowCPUEmulation.value();
      duration = slowCPUEmulation ? 400 : 300;
      easing = slowCPUEmulation ? 'linear' : 'easeOutQuad';
      if (slowCPUEmulation) {
        frameDuration = PAA.Pixeltosh.OS.Interface.slowCPUEmulationSmallFrameDelay * 1000;
        lastFrameTime = null;
      }
      this.$piece.velocity('stop', true);
      this.animating(true);
      return this.$piece.velocity({
        tween: [0, 1]
      }, {
        duration: duration,
        easing: easing,
        progress: (elements, complete, remaining, start, tweenValue) => {
          var currentFrameTime;
          if (slowCPUEmulation) {
            currentFrameTime = Date.now();
            if (lastFrameTime != null && currentFrameTime - lastFrameTime < frameDuration) {
              return;
            }
            lastFrameTime = currentFrameTime;
          }
          return this.$piece.css({
            left: "".concat(Math.round(offset.x * tweenValue), "rem"),
            top: "".concat(Math.round(offset.y * tweenValue), "rem")
          });
        },
        complete: () => {
          this.$piece.css({
            left: 0,
            top: 0
          });
          this.promoting(false);
          this.animating(false);
          if (animation.promotion) {
            return this.chessboard.chess.audio.promote();
          } else {
            return this.chessboard.chess.audio.drop();
          }
        }
      });
    }
  }
  ;
  Piece.register(Piece.id());
  return Piece;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.piece.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/piece/template.piece.js     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Piece");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Piece"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Piece", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-piece ", Spacebars.mustache(view.lookup("draggedClass")), " ", Spacebars.mustache(view.lookup("animatingClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("draggedStyle"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), view.lookup("bitmapImageOptions"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Assets", "Components", "BitmapImage"));
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"markup":{"markup.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/markup/markup.coffee        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  Chess,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.TwoDimensional.Markup = function () {
  class Markup extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Markup';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.chessboard = this.ancestorComponentOfType(Chess.Interface.Chessboard.TwoDimensional);
    }
    markup() {
      var ref;
      return (ref = this.chessboard.provider()) != null ? typeof ref.markup === "function" ? ref.markup() : void 0 : void 0;
    }
    targetLegalMoveClass() {
      var ref, target;
      target = this.currentData();
      if (ref = target.position, indexOf.call(this.chessboard.legalMoveSquares(), ref) >= 0) {
        return 'legal-move';
      }
    }
    squarePosition(square) {
      var left, ref, top;
      left = square.fileIndex * 21;
      top = square.rankIndex * 21;
      if ((ref = this.chessboard.chess.interfaceManager()) != null ? ref.flippedBoard() : void 0) {
        left = 147 - left;
      } else {
        top = 147 - top;
      }
      return {
        left,
        top
      };
    }
    positionStyle(square) {
      var left, top;
      ({
        left,
        top
      } = this.squarePosition(square));
      return {
        left: "".concat(left, "rem"),
        top: "".concat(top, "rem")
      };
    }
    arrowStyle() {
      var arrow, fromPosition, height, left, leftDifference, leftDistance, rotate, scaleX, scaleY, toPosition, top, topDifference, topDistance, width;
      arrow = this.currentData();
      fromPosition = this.squarePosition(arrow.from);
      toPosition = this.squarePosition(arrow.to);
      left = toPosition.left + 10;
      top = toPosition.top + 10;
      scaleX = 1;
      scaleY = 1;
      rotate = 0;
      leftDifference = toPosition.left - fromPosition.left;
      leftDistance = Math.abs(leftDifference);
      topDifference = toPosition.top - fromPosition.top;
      topDistance = Math.abs(topDifference);
      if (leftDistance && topDistance && leftDistance > topDistance || !leftDistance) {
        // The arrow makes a longer horizontal move than vertical, so the arrow part will be vertical.
        width = leftDistance;
        height = topDistance;
        if (leftDifference > 0) {
          scaleX = -1;
        }
        if (topDifference > 0) {
          scaleY = -1;
        }
      } else {
        // The arrow will be horizontal, so we need to rotate 90 degrees.
        width = topDistance;
        height = leftDistance;
        rotate = 90;
        if (leftDifference < 0) {
          scaleX = -1;
        }
        if (topDifference > 0) {
          scaleY = -1;
        }
      }
      return {
        left: "".concat(left, "rem"),
        top: "".concat(top, "rem"),
        width: "".concat(width, "rem"),
        height: "".concat(height, "rem"),
        transform: "scale(".concat(scaleX, ", ").concat(scaleY, ") rotate(").concat(rotate, "deg)")
      };
    }
    straightArrowPart() {
      return !this.diagonalArrowPart();
    }
    orthogonalArrowPart() {
      var arrow;
      arrow = this.currentData();
      return (arrow.from.fileIndex !== arrow.to.fileIndex || arrow.from.rankIndex !== arrow.to.rankIndex) && !this.diagonalArrowPart();
    }
    diagonalArrowPart() {
      var arrow;
      arrow = this.currentData();
      return Math.abs(arrow.from.fileIndex - arrow.to.fileIndex) === Math.abs(arrow.from.rankIndex - arrow.to.rankIndex);
    }
    legalMovesSquares() {
      var ref, selectedSquare;
      if (!(selectedSquare = this.chessboard.selectedSquare())) {
        return;
      }
      return (ref = this.chessboard.provider()) != null ? ref.getLegalDestinationsFromSquare(selectedSquare) : void 0;
    }
  }
  ;
  Markup.register(Markup.id());
  return Markup;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.markup.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/markup/template.markup.js   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Markup");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Markup"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Markup", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-markup"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("markup"));
  }, function() {
    return [ "\n      ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("target"));
    }, function() {
      return [ "\n        ", HTML.DIV(HTML.Attrs({
        class: function() {
          return [ "target ", Spacebars.mustache(view.lookup("targetLegalMoveClass")) ];
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), Spacebars.dataMustache(view.lookup("positionStyle"), view.lookup("position")));
      })), "\n      " ];
    }), "\n      ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("arrow"));
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Markup", "Arrow"));
      }), "\n      " ];
    }), "\n      ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("arrows"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "arrows"
      }, "\n          ", HTML.DIV({
        class: "outline"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("."));
      }, function() {
        return [ "\n              ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Markup", "Arrow"));
        }), "\n            " ];
      }), "\n          "), "\n          ", HTML.DIV({
        class: "fill"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("."));
      }, function() {
        return [ "\n              ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Markup", "Arrow"));
        }), "\n            " ];
      }), "\n          "), "\n        "), "\n      " ];
    }), "\n      ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("legalMoves"));
    }, function() {
      return [ "\n        ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("legalMovesSquares"));
      }, function() {
        return [ "\n          ", HTML.DIV(HTML.Attrs({
          class: "legal-move-square"
        }, function() {
          return Spacebars.attrMustache(view.lookup("style"), Spacebars.dataMustache(view.lookup("positionStyle"), view.lookup(".")));
        })), "\n        " ];
      }), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Markup.Arrow");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Markup.Arrow"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Markup.Arrow", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "arrow"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("arrowStyle"));
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("straightArrowPart"));
  }, function() {
    return HTML.Raw('\n      <div class="straight"></div>\n    ');
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("orthogonalArrowPart"));
  }, function() {
    return HTML.Raw('\n      <div class="orthogonal"></div>\n    ');
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("diagonalArrowPart"));
  }, function() {
    return HTML.Raw('\n      <div class="diagonal"></div>\n    ');
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"promotion":{"promotion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/promotion/promotion.coffee  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Chess, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Chessboard.TwoDimensional.Promotion = function () {
  class Promotion extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Promotion';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.chessboard = this.ancestorComponentOfType(Chess.Interface.Chessboard.TwoDimensional);
      return this.chessboard.chess.gameManager().assertDrawnPieces(Chess.Piece.PromotionTypes, Chess.Piece.Colors.White);
    }
    pieces() {
      var i, len, promotionInfo, ref, results, type;
      promotionInfo = this.data();
      ref = Chess.Piece.PromotionTypes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        type = ref[i];
        results.push(new Chess.Piece(promotionInfo.color, type));
      }
      return results;
    }
    events() {
      return super.events(...arguments).concat({
        'click': this.onClick,
        'click .piece': this.onClickPiece
      });
    }
    onClick(event) {
      if ($(event.target).closest('.promotion').length) {
        return;
      }
      return this.chessboard.cancelPromotion();
    }
    onClickPiece(event) {
      var piece;
      piece = this.currentData();
      return this.chessboard.choosePromotion(piece.type);
    }
  }
  ;
  Promotion.register(Promotion.id());
  return Promotion;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.promotion.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/promotion/template.promotio //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Promotion");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Promotion"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Chessboard.TwoDimensional.Promotion", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-interface-chessboard-twodimensional-promotion",
    "data-cursor": "default"
  }, "\n    ", HTML.DIV({
    class: "promotion pixelartacademy-pixeltosh-os-interface-rectanglearea"
  }, HTML.Raw('\n      <div class="prompt">将兵升变为</div>\n      '), HTML.UL({
    class: "pieces"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("pieces"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: "piece"
    }, "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("."));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Chess", "Interface", "Chessboard", "TwoDimensional", "Piece"));
      });
    }), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"actions":{"actions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/actions.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions = class Actions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"action.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/action.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, FM, LOI, PAA;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.Action = class Action extends PAA.Pixeltosh.OS.Interface.Actions.Action {
  constructor() {
    super(...arguments);
    this.chess = this.os.getProgram(Chess);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/about.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, Chess, FM, LOI, PAA;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.About = function () {
  class About extends Chess.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.About";
    }
    static displayName() {
      return "关于国际象棋学院……";
    }
    execute() {
      return this.os.interface.displayDialog(Chess.Interface.About.createInterfaceData());
    }
  }
  ;
  About.initialize();
  return About;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"backtomenu.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/backtomenu.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, Chess, FM, LOI, PAA;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.BackToMenu = function () {
  class BackToMenu extends Chess.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.BackToMenu";
    }
    static displayName() {
      return "返回菜单";
    }
    enabled() {
      var ref;
      return !((ref = this.chess.interfaceManager()) != null ? ref.inMenu() : void 0);
    }
    execute() {
      return this.chess.interfaceManager().enterScreen(Chess.InterfaceManager.Screens.Menu);
    }
  }
  ;
  BackToMenu.initialize();
  return BackToMenu;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"displayboardcoordinates.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/displayboardcoordinates.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, Chess, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.DisplayBoardCoordinates = function () {
  class DisplayBoardCoordinates extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.DisplayBoardCoordinates';
    }
    static displayName() {
      return "棋盘坐标";
    }
    active() {
      var interfaceManager;
      if (!(interfaceManager = this.chess.interfaceManager())) {
        return;
      }
      return interfaceManager.displayBoardCoordinates();
    }
    enabled() {
      var interfaceManager;
      if (!(interfaceManager = this.chess.interfaceManager())) {
        return;
      }
      return !interfaceManager.inLesson();
    }
    execute() {
      return Chess.displayBoardCoordinates(!Chess.displayBoardCoordinates());
    }
  }
  ;
  DisplayBoardCoordinates.initialize();
  return DisplayBoardCoordinates;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flipboard.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/flipboard.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, Chess, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.FlipBoard = function () {
  class FlipBoard extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.FlipBoard';
    }
    static displayName() {
      return "翻转棋盘";
    }
    execute() {
      var interfaceManager;
      interfaceManager = this.chess.interfaceManager();
      return interfaceManager.flippedBoard(!interfaceManager.flippedBoard());
    }
  }
  ;
  FlipBoard.initialize();
  return FlipBoard;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"boarddisplaytype.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/boarddisplaytype.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, BoardDisplayType, Chess, FM, LOI, PAA;
AE = Artificial.Everywhere;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
BoardDisplayType = class BoardDisplayType extends Chess.Interface.Actions.Action {
  static boardDisplayType() {
    throw new AE.NotImplementedException("Board display type action must provide the display type it activates.");
  }
  active() {
    return Chess.state('boardDisplayType') === this.constructor.boardDisplayType();
  }
  execute() {
    return Chess.state('boardDisplayType', this.constructor.boardDisplayType());
  }
};
Chess.Interface.Actions.BoardDisplay2D = function () {
  class BoardDisplay2D extends BoardDisplayType {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.BoardDisplay2D';
    }
    static displayName() {
      return "2D";
    }
    static boardDisplayType() {
      return Chess.BoardDisplayTypes.TwoDimensional;
    }
  }
  ;
  BoardDisplay2D.initialize();
  return BoardDisplay2D;
}.call(this);
Chess.Interface.Actions.BoardDisplay3D = function () {
  class BoardDisplay3D extends BoardDisplayType {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.BoardDisplay3D';
    }
    static displayName() {
      return "3D";
    }
    static boardDisplayType() {
      return Chess.BoardDisplayTypes.ThreeDimensional;
    }
    enabled() {
      return false;
    }
  }
  ;
  BoardDisplay3D.initialize();
  return BoardDisplay3D;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"audio.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/audio.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.AudioBoard = function () {
  class AudioBoard extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.AudioBoard';
    }
    static displayName() {
      return "棋盘音效";
    }
    active() {
      return Chess.audioBoard();
    }
    execute() {
      return Chess.audioBoard(!Chess.audioBoard());
    }
  }
  ;
  AudioBoard.initialize();
  return AudioBoard;
}.call(this);
Chess.Interface.Actions.AudioVoice = function () {
  class AudioVoice extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.AudioVoice';
    }
    static displayName() {
      return "Pixeltosh 语音";
    }
    active() {
      return Chess.audioVoice();
    }
    execute() {
      return Chess.audioVoice(!Chess.audioVoice());
    }
  }
  ;
  AudioVoice.initialize();
  return AudioVoice;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interfacetheme.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/interfacetheme.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Chess, InterfaceTheme, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
InterfaceTheme = class InterfaceTheme extends Chess.Interface.Actions.Action {
  static interfaceTheme() {
    throw new AE.NotImplementedException("Interface theme action must provide the theme it activates.");
  }
  active() {
    var interfaceManager;
    if (!(interfaceManager = this.chess.interfaceManager())) {
      return;
    }
    return interfaceManager.interfaceTheme() === this.constructor.interfaceTheme();
  }
  execute() {
    var projectId;
    projectId = Chess.currentProjectId();
    return PAA.Practice.Project.documents.update(projectId, {
      $set: {
        interfaceTheme: this.constructor.interfaceTheme(),
        lastEditTime: new Date()
      }
    });
  }
};
Chess.Interface.Actions.LightInterface = function () {
  class LightInterface extends InterfaceTheme {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.LightInterface';
    }
    static displayName() {
      return "浅色界面";
    }
    static interfaceTheme() {
      return Chess.InterfaceThemes.Light;
    }
  }
  ;
  LightInterface.initialize();
  return LightInterface;
}.call(this);
Chess.Interface.Actions.DarkInterface = function () {
  class DarkInterface extends InterfaceTheme {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.DarkInterface';
    }
    static displayName() {
      return "深色界面";
    }
    static interfaceTheme() {
      return Chess.InterfaceThemes.Dark;
    }
  }
  ;
  DarkInterface.initialize();
  return DarkInterface;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chessboardtheme.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/chessboardtheme.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Chess, ChessboardTheme, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
ChessboardTheme = class ChessboardTheme extends Chess.Interface.Actions.Action {
  static chessboardTheme() {
    throw new AE.NotImplementedException("Chessboard theme action must provide the theme it activates.");
  }
  active() {
    var interfaceManager;
    if (!(interfaceManager = this.chess.interfaceManager())) {
      return;
    }
    return interfaceManager.chessboardTheme() === this.constructor.chessboardTheme();
  }
  execute() {
    var projectId;
    projectId = Chess.currentProjectId();
    return PAA.Practice.Project.documents.update(projectId, {
      $set: {
        chessboardTheme: this.constructor.chessboardTheme(),
        lastEditTime: new Date()
      }
    });
  }
};
Chess.Interface.Actions.NewspaperChessboard = function () {
  class NewspaperChessboard extends ChessboardTheme {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.NewspaperChessboard';
    }
    static displayName() {
      return "报纸棋盘";
    }
    static chessboardTheme() {
      return Chess.ChessboardThemes.Newspaper;
    }
  }
  ;
  NewspaperChessboard.initialize();
  return NewspaperChessboard;
}.call(this);
Chess.Interface.Actions.LightChessboard = function () {
  class LightChessboard extends ChessboardTheme {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.LightChessboard';
    }
    static displayName() {
      return "浅色棋盘";
    }
    static chessboardTheme() {
      return Chess.ChessboardThemes.Light;
    }
  }
  ;
  LightChessboard.initialize();
  return LightChessboard;
}.call(this);
Chess.Interface.Actions.ContrastChessboard = function () {
  class ContrastChessboard extends ChessboardTheme {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.ContrastChessboard';
    }
    static displayName() {
      return "高对比棋盘";
    }
    static chessboardTheme() {
      return Chess.ChessboardThemes.Contrast;
    }
  }
  ;
  ContrastChessboard.initialize();
  return ContrastChessboard;
}.call(this);
Chess.Interface.Actions.DarkChessboard = function () {
  class DarkChessboard extends ChessboardTheme {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.DarkChessboard';
    }
    static displayName() {
      return "深色棋盘";
    }
    static chessboardTheme() {
      return Chess.ChessboardThemes.Dark;
    }
  }
  ;
  DarkChessboard.initialize();
  return DarkChessboard;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"history.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/history.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, Chess, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.HistoryBack = function () {
  class HistoryBack extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.HistoryBack';
    }
    static displayName() {
      return "回看上一步";
    }
    enabled() {
      var ref;
      if (!((ref = this.chess.interfaceManager()) != null ? ref.inPlay() : void 0)) {
        return;
      }
      return this.chess.gameManager().currentDisplayedPlyNumber();
    }
    execute() {
      return this.chess.gameManager().displayPreviousPosition();
    }
  }
  ;
  HistoryBack.initialize();
  return HistoryBack;
}.call(this);
Chess.Interface.Actions.HistoryForward = function () {
  class HistoryForward extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.HistoryForward';
    }
    static displayName() {
      return "查看下一步";
    }
    enabled() {
      var ref;
      if (!((ref = this.chess.interfaceManager()) != null ? ref.inPlay() : void 0)) {
        return;
      }
      return !this.chess.gameManager().displayingLivePosition();
    }
    execute() {
      return this.chess.gameManager().displayNextPosition();
    }
  }
  ;
  HistoryForward.initialize();
  return HistoryForward;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"autopromotion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/autopromotion.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, Chess, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.AutoPromotion = function () {
  class AutoPromotion extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.AutoPromotion';
    }
    static displayName() {
      return "总是升变为后";
    }
    active() {
      var interfaceManager;
      if (!(interfaceManager = this.chess.interfaceManager())) {
        return;
      }
      return interfaceManager.autoPromotion();
    }
    enabled() {
      var interfaceManager;
      if (!(interfaceManager = this.chess.interfaceManager())) {
        return;
      }
      return !interfaceManager.inLesson();
    }
    execute() {
      return Chess.autoPromotion(!Chess.autoPromotion());
    }
  }
  ;
  AutoPromotion.initialize();
  return AutoPromotion;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"autoflipboard.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/interface/actions/autoflipboard.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, Chess, FM, LOI, PAA;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Interface.Actions.AutoFlipBoard = function () {
  class AutoFlipBoard extends Chess.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Interface.Actions.AutoFlipBoard';
    }
    static displayName() {
      return "自动翻转棋盘";
    }
    active() {
      return Chess.autoFlipBoard();
    }
    execute() {
      return Chess.autoFlipBoard(!Chess.autoFlipBoard());
    }
  }
  ;
  AutoFlipBoard.initialize();
  return AutoFlipBoard;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"lesson":{"lesson.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/lesson.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Chess, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lesson = function () {
  class Lesson {
    static getClassesForCategory(categoryId) {
      return _.filter(this._lessonClasses, lessonClass => {
        return lessonClass.category().id() === categoryId;
      });
    }

    // Id string for this lesson used to identify the lesson in code.
    static id() {
      throw new AE.NotImplementedException("You must specify lesson's id.");
    }

    // String to represent the lesson in the UI. Note that we can't use
    // 'name' since it's an existing property holding the class name.
    static displayName() {
      throw new AE.NotImplementedException("You must specify the lesson name.");
    }
    static category() {
      throw new AE.NotImplementedException("You must specify the lesson category.");
    }
    static startingPosition() {
      throw new AE.NotImplementedException("You must specify where the pieces start.");
    }
    static startingGameState() {
      return Chess.GameState.fromPosition(this.startingPosition());
    }
    static steps() {
      throw new AE.NotImplementedException("You must specify the lesson steps.");
    }
    static additionalRequiredPieces() {
      // Override if this lesson requires pieces that are not part of the starting game state.
      return [];
    }
    static initialize() {
      this._lessonClasses.push(this);
      this.stateAddress = new LOI.StateAddress("things.".concat(this.id()));
      this.state = new LOI.StateObject({
        address: this.stateAddress
      });

      // On the server, after document observers are started, perform initialization.
      if (Meteor.isServer) {
        return Document.startup(() => {
          var i, len, property, ref, results, translationNamespace;
          if (Meteor.settings.startEmpty) {
            return;
          }
          // Create this lesson's translated names.
          translationNamespace = this.id();
          ref = ['displayName'];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            property = ref[i];
            results.push(AB.createTranslation(translationNamespace, property, this[property]()));
          }
          return results;
        });
      }
    }
    constructor(lessonManager) {
      var stepClass, translationNamespace;
      this.lessonManager = lessonManager;
      this.stateAddress = this.constructor.stateAddress;
      this.state = this.constructor.state;

      // Subscribe to this lesson's translations.
      translationNamespace = this.id();
      this._translationSubscription = AB.subscribeNamespace(translationNamespace);

      // Initialize the steps.
      this.steps = function () {
        var i, len, ref, results;
        ref = this.constructor.steps();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          stepClass = ref[i];
          results.push(new stepClass(this));
        }
        return results;
      }.call(this);
    }
    destroy() {
      return this._translationSubscription.stop();
    }
    id() {
      return this.constructor.id();
    }
    startingGameState() {
      return this.constructor.startingGameState();
    }
    displayName() {
      return AB.translate(this._translationSubscription, 'displayName').text;
    }
    displayNameTranslation() {
      return AB.translation(this._translationSubscription, 'displayName');
    }
    completedCount() {
      return this.state('completedCount') || 0;
    }
    requiredPieceTypeCounts() {
      var blackPieces, i, j, len, len1, piece, pieceType, pieceTypeCounts, ref, whitePieces;
      // You need as many white pieces as there are in the tutorial.
      whitePieces = this.startingGameState().getPiecesOfColor(Chess.Piece.Colors.White);
      pieceTypeCounts = _.countBy(whitePieces, piece => {
        return piece.type;
      });

      // You need at least one of the pieces the opponent has, since otherwise we wouldn't have drawn that piece yet.
      blackPieces = this.startingGameState().getPiecesOfColor(Chess.Piece.Colors.Black);
      for (i = 0, len = blackPieces.length; i < len; i++) {
        piece = blackPieces[i];
        if (!pieceTypeCounts[piece.type]) {
          pieceTypeCounts[piece.type] = 1;
        }
      }
      ref = this.constructor.additionalRequiredPieces();
      // Add any extra pieces that can appear in the tutorial.
      for (j = 0, len1 = ref.length; j < len1; j++) {
        pieceType = ref[j];
        pieceTypeCounts[pieceType] = (pieceTypeCounts[pieceType] || 0) + 1;
      }
      return pieceTypeCounts;
    }
    available() {
      var count, pieceType, ref;
      ref = this.requiredPieceTypeCounts();
      for (pieceType in ref) {
        count = ref[pieceType];
        if (count > Chess.ownedPiecesCount(pieceType)) {
          return false;
        }
      }
      return true;
    }
    aiMove() {} // Override if this lesson is played against the computer.
  }
  ;

  // completedCount: integer, how many times the player completed a lesson.
  Lesson._lessonClasses = [];
  return Lesson;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lesson-ai.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/lesson-ai.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Chess, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lesson = class Lesson extends Chess.Lesson {
  randomAIMove() {
    return Random.choice(this._getBlackMoves());
  }
  randomAIMoveByPiece(pieceType) {
    return Random.choice(this._getBlackMovesForPiece(pieceType));
  }
  randomAICapture() {
    var captureMoves, gameState;
    gameState = this.lessonManager.gameState();
    captureMoves = _.filter(this._getBlackMoves(), move => {
      return gameState.isSquareOccupied(move.to);
    });
    if (!captureMoves.length) {
      return null;
    }
    return Random.choice(captureMoves);
  }
  shortestAIMove() {
    var moves;
    moves = this._getBlackMoves();
    return _.minBy(moves, move => {
      return move.manhattanDistance();
    });
  }
  longestAIMove() {
    var moves;
    moves = this._getBlackMoves();
    return _.maxBy(moves, move => {
      return move.manhattanDistance();
    });
  }
  _getBlackMoves() {
    var blackPieceSquares, gameState;
    gameState = this.lessonManager.gameState();
    blackPieceSquares = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.Black);
    return this._getBlackMovesFromSquares(blackPieceSquares);
  }
  _getBlackMovesForPiece(pieceType) {
    var blackPieceSquares, gameState;
    gameState = this.lessonManager.gameState();
    blackPieceSquares = gameState.occupiedSquaresByPiecesOfColor(pieceType, Chess.Piece.Colors.Black);
    return this._getBlackMovesFromSquares(blackPieceSquares);
  }
  _getBlackMovesFromSquares(fromSquares) {
    var fromSquare, gameState, i, j, len, len1, move, moves, piece, ref, ref1, toSquare;
    gameState = this.lessonManager.gameState();
    moves = [];
    for (i = 0, len = fromSquares.length; i < len; i++) {
      fromSquare = fromSquares[i];
      ref = gameState.getLegalDestinationsFromSquare(fromSquare);
      for (j = 0, len1 = ref.length; j < len1; j++) {
        toSquare = ref[j];
        move = new Chess.Move(fromSquare, toSquare);

        // For promotions, set it to the best piece the player owns.
        piece = gameState.getPieceAtSquare(move.from);
        if (piece.type === Chess.Piece.Types.Pawn && ((ref1 = move.to.rankIndex) === 0 || ref1 === 7)) {
          move.promotionPieceType = this.lessonManager.chess.gameManager().bestOwnedPromotionPieceType();
        }
        moves.push(move);
      }
    }
    return moves;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"category.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/category.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Chess, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lesson.Category = function () {
  class Category {
    static getClasses() {
      return this._categoryClasses;
    }

    // Id string for this category used to identify the category in code.
    static id() {
      throw new AE.NotImplementedException("You must specify lesson category's id.");
    }

    // String to represent the category in the UI. Note that we can't use
    // 'name' since it's an existing property holding the class name.
    static displayName() {
      throw new AE.NotImplementedException("You must specify the lesson category name.");
    }
    static initialize() {
      this._categoryClasses.push(this);

      // On the server, after document observers are started, perform initialization.
      if (Meteor.isServer) {
        return Document.startup(() => {
          var i, len, property, ref, results, translationNamespace;
          if (Meteor.settings.startEmpty) {
            return;
          }
          // Create this category's translated names.
          translationNamespace = this.id();
          ref = ['displayName'];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            property = ref[i];
            results.push(AB.createTranslation(translationNamespace, property, this[property]()));
          }
          return results;
        });
      }
    }
    static completed() {
      var i, len, lessonClass, ref;
      ref = Chess.Lesson.getClassesForCategory(this.id());
      for (i = 0, len = ref.length; i < len; i++) {
        lessonClass = ref[i];
        if (!lessonClass.state('completedCount')) {
          return;
        }
      }
      return true;
    }
    static completedLessonsCount() {
      return _.filter(Chess.Lesson.getClassesForCategory(this.id()), lessonClass => {
        return lessonClass.state('completedCount');
      }).length;
    }
    constructor(lessonManager) {
      var lessonClass, lessonClasses, translationNamespace;
      this.lessonManager = lessonManager;
      // Subscribe to this category's translations.
      translationNamespace = this.id();
      this._translationSubscription = AB.subscribeNamespace(translationNamespace);

      // Instantiate all lessons in this category.
      lessonClasses = Chess.Lesson.getClassesForCategory(this.id());
      this.lessons = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = lessonClasses.length; i < len; i++) {
          lessonClass = lessonClasses[i];
          results.push(new lessonClass(this.lessonManager));
        }
        return results;
      }.call(this);
    }
    destroy() {
      var i, len, lesson, ref, results;
      this._translationSubscription.stop();
      ref = this.lessons;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        lesson = ref[i];
        results.push(lesson.destroy());
      }
      return results;
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
    available() {
      throw new AE.NotImplementedException("You must specify whether this category is available.");
    }
  }
  ;
  Category._categoryClasses = [];
  return Category;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"piececategory.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/piececategory.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lesson.PieceCategory = class PieceCategory extends Chess.Lesson.Category {
  static pieceType() {
    throw new AE.NotImplementedException("You must specify which piece type unlocks this category.");
  }
  pieceType() {
    return this.constructor.pieceType();
  }
  available() {
    return Chess.ownedPiecesCount(this.pieceType());
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps":{"step.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/steps/step.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, Chess, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lesson.Step = class Step extends AM.Component {
  static message() {} // Override if the step displays an instruction message.

  static retryMessage() {} // Override if the step has a message for failed attempts.

  static retryPosition() {} // Override to retry from a specific position after failure.

  static retryGameState() {
    var retryPosition;
    if (!(retryPosition = this.retryPosition())) {
      return;
    }
    return Chess.GameState.fromPosition(retryPosition);
  }
  static initialize() {
    this.register(this.id());

    // On the server, after document observers are started, perform initialization.
    if (Meteor.isServer) {
      return Document.startup(() => {
        var i, len, property, ref, results, translationNamespace, value;
        if (Meteor.settings.startEmpty) {
          return;
        }

        // Create this instruction's translated names.
        translationNamespace = this.id();
        ref = ['message', 'retryMessage'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          property = ref[i];
          if (!(value = this[property]())) {
            continue;
          }
          results.push(AB.createTranslation(translationNamespace, property, value));
        }
        return results;
      });
    }
  }
  template() {
    return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.Step';
  }
  constructor(lesson) {
    super(...arguments);
    this.lesson = lesson;
    this._id = this.id();
  }
  onCreated() {
    super.onCreated(...arguments);
    this.retrying = new ReactiveField(false);
    return this.autorun(computation => {
      if (!this.failed()) {
        return;
      }
      computation.stop();
      return this.retrying(true);
    });
  }
  id() {
    return this.constructor.id();
  }
  retryGameState() {
    return this.constructor.retryGameState();
  }
  message() {
    if (this.messageTranslation()) {
      return this.translate('message').text;
    }
  }
  messageTranslation() {
    return this.translation('message');
  }
  retryMessage() {
    return this.translate('retryMessage').text;
  }
  retryMessageTranslation() {
    return this.translation('retryMessage');
  }
  completed() {
    throw new AE.NotImplementedException("A step must specify when it is completed.");
  }
  failed() {} // Override if it's possible to reach a failed state.

  markup() {} // Override to provide chessboard markup.

  gameState() {
    return this.lesson.lessonManager.gameState();
  }
  chessboard() {
    return this.lesson.lessonManager.getChessboard();
  }
  positionAchieved(position) {
    var gameState, pieceLetter, square, squareName;
    if (!(gameState = this.gameState())) {
      return;
    }
    for (squareName in position) {
      pieceLetter = position[squareName];
      square = Chess.Square[squareName];
      if (pieceLetter) {
        if (!gameState.hasPieceAtSquare(Chess.Piece.fromLetter(pieceLetter), square)) {
          return;
        }
      } else {
        if (gameState.isSquareOccupied(square)) {
          return;
        }
      }
    }
    return true;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.step.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/steps/template.step.js                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.Step");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.Step"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.Step", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-lesson-step"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("retrying"));
  }, function() {
    return [ "\n      ", Spacebars.include(view.lookupTemplate("Markdown"), function() {
      return Blaze.View("lookup:retryMessage", function() {
        return Spacebars.mustache(view.lookup("retryMessage"));
      });
    }), "\n    " ];
  }, function() {
    return [ "\n      ", Spacebars.include(view.lookupTemplate("Markdown"), function() {
      return Blaze.View("lookup:message", function() {
        return Spacebars.mustache(view.lookup("message"));
      });
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"positionstep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/steps/positionstep.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Chess, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lesson.PositionStep = class PositionStep extends Chess.Lesson.Step {
  static requiredPosition() {
    throw new AE.NotImplementedException("Position step must define the position that needs to be reached for completion.");
  }
  static failedPosition() {} // Override if there is a fail state.

  completed() {
    return this.positionAchieved(this.constructor.requiredPosition());
  }
  failed() {
    var failedPosition;
    if (!(failedPosition = this.constructor.failedPosition())) {
      return;
    }
    return this.positionAchieved(failedPosition);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"endstep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/steps/endstep.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lesson.EndStep = class EndStep extends Chess.Lesson.Step {
  template() {
    return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.EndStep';
  }
  onCreated() {
    super.onCreated(...arguments);
    this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
    return this.chess = this.os.getProgram(Chess);
  }
  completed() {
    return true;
  }
  events() {
    return super.events(...arguments).concat({
      'click .end-button': this.onClickEndButton
    });
  }
  onClickEndButton(event) {
    this.chess.audioManager().lessonComplete();
    return this.chess.interfaceManager().enterScreen(Chess.InterfaceManager.Screens.Menu);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.endstep.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lesson/steps/template.endstep.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.EndStep");
Template["PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.EndStep"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Chess.Lesson.EndStep", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-chess-lesson-step"
  }, "\n    ", Spacebars.include(view.lookupTemplate("Markdown"), function() {
    return Blaze.View("lookup:message", function() {
      return Spacebars.mustache(view.lookup("message"));
    });
  }), HTML.Raw('\n    <div class="actions">\n      <button class="end-button pixelartacademy-pixeltosh-os-interface-button">完成课程</button>\n    </div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"lessons":{"lessons.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/lessons.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess,
  PAA,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons = function () {
  class Lessons {}
  ;
  Lessons.DefaultEndStep = function () {
    class DefaultEndStep extends Chess.Lesson.EndStep {
      static id() {
        return "PAA.Pixeltosh.Programs.Chess.Lessons.DefaultEndStep";
      }
      static message() {
        return "做得好！";
      }
    }
    ;
    DefaultEndStep.initialize();
    return DefaultEndStep;
  }.call(this);
  Lessons.CapturePawn = class CapturePawn extends Chess.Lesson.Step {
    static retryMessage() {
      return "你错过了机会，那枚兵占了上风。\n\n趁还有机会，重新尝试并吃掉它。";
    }
    retryGameState() {
      return Chess.GameState.fromPosition(this.lesson.constructor.startingPosition());
    }
    completed() {
      return !this.gameState().occupiedSquaresOfColor(Chess.Piece.Colors.Black).length;
    }
    failed() {
      var blackPiece, blackSquare, gameState, whiteSquare;
      if (!(gameState = this.gameState())) {
        return;
      }
      if (!gameState.getPiecesOfColor(Chess.Piece.Colors.White).length) {
        return true;
      }
      if (!(blackPiece = gameState.getPiecesOfColor(Chess.Piece.Colors.Black)[0])) {
        return;
      }
      if (blackPiece.type === Chess.Piece.Types.Pawn) {
        return;
      }

      // Make sure white can't capture the piece in the next move.
      blackSquare = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.Black)[0];
      whiteSquare = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.White)[0];
      return indexOf.call(gameState.getLegalDestinationsFromSquare(whiteSquare), blackSquare) < 0;
    }
  };
  return Lessons;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pawnmovement.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/pawnmovement.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.PawnMovement = function () {
  var Lesson;
  class PawnMovement extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.PawnMovement';
    }
    static displayName() {
      return "Pawn movement";
    }
    static category() {
      return Chess.Lessons.Categories.Pawn;
    }
    static steps() {
      return [this.MoveExplanation, this.MoveTarget, this.End];
    }
    static startingPosition() {
      return {
        d4: 'P'
      };
    }
  }
  ;
  PawnMovement.initialize();
  Lesson = PawnMovement;
  PawnMovement.MoveExplanation = function () {
    class MoveExplanation extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveExplanation");
      }
      static message() {
        return "兵每次向前移动一格。\n\n把兵从 d4 移到 d5。";
      }
      static requiredPosition() {
        return {
          d5: 'P'
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d4);
      }
      markup() {
        return [{
          legalMoves: true,
          arrow: {
            from: Chess.Square.d4,
            to: Chess.Square.d5
          }
        }];
      }
    }
    ;
    MoveExplanation.initialize();
    return MoveExplanation;
  }.call(this);
  PawnMovement.MoveTarget = function () {
    class MoveTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveTarget");
      }
      static message() {
        return "继续推进兵，直到到达目标。";
      }
      static requiredPosition() {
        return {
          d7: 'P'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d7
          }
        }];
      }
    }
    ;
    MoveTarget.initialize();
    return MoveTarget;
  }.call(this);
  PawnMovement.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n兵还有几种特殊走法。请在其他课程中学习。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return PawnMovement;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pawndoublestep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/pawndoublestep.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.PawnDoubleStep = function () {
  var Lesson;
  class PawnDoubleStep extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.PawnDoubleStep';
    }
    static displayName() {
      return "Pawn double-step";
    }
    static category() {
      return Chess.Lessons.Categories.Pawn;
    }
    static steps() {
      return [this.DoubleStepExplanation, this.SingleStepAfterMoving, this.End];
    }
    static startingPosition() {
      return {
        d2: 'P'
      };
    }
  }
  ;
  PawnDoubleStep.initialize();
  Lesson = PawnDoubleStep;
  PawnDoubleStep.DoubleStepExplanation = function () {
    class DoubleStepExplanation extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".DoubleStepExplanation");
      }
      static message() {
        return "兵第一次移动时，可以前进一格或两格。\n\n把兵从 d2 移到 d4。";
      }
      static requiredPosition() {
        return {
          d4: 'P'
        };
      }
      static retryMessage() {
        return "前进一格始终合法，但你刚刚用掉了唯一一次跳跃机会，却只走了一半距离。\n\n回退并使用这步特殊走法：从 d2 直接走到 d4。";
      }
      static failedPosition() {
        return {
          d3: 'P'
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d2);
      }
      markup() {
        return [{
          legalMoves: true
        }];
      }
    }
    ;
    DoubleStepExplanation.initialize();
    return DoubleStepExplanation;
  }.call(this);
  PawnDoubleStep.SingleStepAfterMoving = function () {
    class SingleStepAfterMoving extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".SingleStepAfterMoving");
      }
      static message() {
        return "这枚兵移动过以后，每次只能前进一格。";
      }
      static requiredPosition() {
        return {
          d5: 'P'
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d4);
      }
      markup() {
        return [{
          legalMoves: true
        }];
      }
    }
    ;
    SingleStepAfterMoving.initialize();
    return SingleStepAfterMoving;
  }.call(this);
  PawnDoubleStep.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n一步前进两格的机会只有一次，而且只能从兵的初始格进行。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return PawnDoubleStep;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pawncapture.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/pawncapture.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.PawnCapture = function () {
  var Lesson;
  class PawnCapture extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.PawnCapture';
    }
    static displayName() {
      return "Pawn capture";
    }
    static category() {
      return Chess.Lessons.Categories.Pawn;
    }
    static steps() {
      return [this.CaptureDirections, this.CapturePawn, this.End];
    }
    static startingPosition() {
      return {
        e3: 'P',
        d6: 'p'
      };
    }
    aiMove() {
      return this.randomAIMove();
    }
  }
  ;
  PawnCapture.initialize();
  Lesson = PawnCapture;
  PawnCapture.CaptureDirections = function () {
    class CaptureDirections extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".CaptureDirections");
      }
      static message() {
        return "兵直线前进，却沿斜线吃子——向前一格的左右两侧。\n\n把你的兵推进到 e4。";
      }
      static requiredPosition() {
        return {
          e4: 'P'
        };
      }
      markup() {
        return [{
          arrows: [{
            from: Chess.Square.e3,
            to: Chess.Square.d4
          }, {
            from: Chess.Square.e3,
            to: Chess.Square.f4
          }]
        }];
      }
    }
    ;
    CaptureDirections.initialize();
    return CaptureDirections;
  }.call(this);
  PawnCapture.CapturePawn = function () {
    class CapturePawn extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".CapturePawn");
      }
      static message() {
        return "一枚黑兵走到了你的斜前方。吃掉它！\n\n在 d5 吃子。";
      }
      static requiredPosition() {
        return {
          d5: 'P'
        };
      }
      static failedPosition() {
        return {
          e5: 'P'
        };
      }
      static retryMessage() {
        return "兵沿斜线吃子，不能向正前方吃子。你已经错过了吃子的机会。\n\n回到 e4。这一次，吃掉 d5 的兵。";
      }
    }
    ;
    CapturePawn.initialize();
    return CapturePawn;
  }.call(this);
  PawnCapture.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n兵是唯一一种移动方式与吃子方式不同的棋子。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return PawnCapture;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stuckpawns.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/stuckpawns.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.StuckPawns = function () {
  var Lesson;
  class StuckPawns extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.StuckPawns';
    }
    static displayName() {
      return "Stuck pawns";
    }
    static category() {
      return Chess.Lessons.Categories.Pawn;
    }
    static steps() {
      return [this.AdvanceOneSquare, this.KeepGoing, this.PawnsStuck];
    }
    static startingPosition() {
      return {
        d2: 'P',
        d7: 'p'
      };
    }
    aiMove() {
      return this.shortestAIMove();
    }
  }
  ;
  StuckPawns.initialize();
  Lesson = StuckPawns;
  StuckPawns.AdvanceOneSquare = function () {
    class AdvanceOneSquare extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".AdvanceOneSquare");
      }
      static message() {
        return "把你的兵向棋盘另一端推进。";
      }
      static requiredPosition() {
        return {
          d2: null
        };
      }
    }
    ;
    AdvanceOneSquare.initialize();
    return AdvanceOneSquare;
  }.call(this);
  StuckPawns.KeepGoing = function () {
    class KeepGoing extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".KeepGoing");
      }
      static message() {
        return "继续前进。";
      }
      completed() {
        return !this.gameState().getLegalMoves().length;
      }
    }
    ;
    KeepGoing.initialize();
    return KeepGoing;
  }.call(this);
  StuckPawns.PawnsStuck = function () {
    class PawnsStuck extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".PawnsStuck");
      }
      static message() {
        return "现在两枚兵面对面站着，谁都无法移动！\n\n兵不能向正前方吃子，因此两枚兵迎面相遇时会完全锁住彼此。\n\n试着前进：已经无路可走。";
      }
    }
    ;
    PawnsStuck.initialize();
    return PawnsStuck;
  }.call(this);
  return StuckPawns;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"enpassant.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/enpassant.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.EnPassant = function () {
  var Lesson;
  class EnPassant extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.EnPassant';
    }
    static displayName() {
      return "En passant";
    }
    static category() {
      return Chess.Lessons.Categories.Pawn;
    }
    static steps() {
      return [this.AdvanceToFifthRank, this.CaptureInPassing, this.End];
    }
    static startingPosition() {
      return {
        d4: 'P',
        e7: 'p'
      };
    }
    aiMove() {
      return this.longestAIMove();
    }
  }
  ;
  EnPassant.initialize();
  Lesson = EnPassant;
  EnPassant.AdvanceToFifthRank = function () {
    class AdvanceToFifthRank extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".AdvanceToFifthRank");
      }
      static message() {
        return "把兵推进到黑方半场。\n\n前进到 d5。";
      }
      static requiredPosition() {
        return {
          d5: 'P'
        };
      }
    }
    ;
    AdvanceToFifthRank.initialize();
    return AdvanceToFifthRank;
  }.call(this);
  EnPassant.CaptureInPassing = function () {
    class CaptureInPassing extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".CaptureInPassing");
      }
      static message() {
        return "黑兵试图一步两格从你身旁冲过。你可以“在经过时”吃掉它，也就是吃过路兵，就像它只移动了一格。\n\n在 e6 吃子。";
      }
      static requiredPosition() {
        return {
          e6: 'P'
        };
      }
      static failedPosition() {
        return {
          d6: 'P'
        };
      }
      static retryMessage() {
        return "如果径直前进，机会就会消失——吃过路兵只有紧接着的一步棋可以进行。\n\n回退到 d5，并在 e6 吃掉过路兵。";
      }
    }
    ;
    CaptureInPassing.initialize();
    return CaptureInPassing;
  }.call(this);
  EnPassant.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n吃过路兵只能在对方兵一步前进两格后立即进行，所以放弃这次吃子机会前要三思。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return EnPassant;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pawnsstrongertogether.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/pawnsstrongertogether.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.PawnsStrongerTogether = function () {
  var Lesson;
  class PawnsStrongerTogether extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.PawnsStrongerTogether';
    }
    static displayName() {
      return "Pawns are stronger together";
    }
    static category() {
      return Chess.Lessons.Categories.Pawn;
    }
    static steps() {
      return [this.Start, this.Progress, this.End];
    }
    static startingPosition() {
      return {
        d3: 'P',
        e4: 'P',
        d6: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  PawnsStrongerTogether.initialize();
  Lesson = PawnsStrongerTogether;
  PawnsStrongerTogether.Start = function () {
    class Start extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".Start");
      }
      static message() {
        return "单独向前推进的兵很容易被阻挡，两枚并排的兵则不同。\n\n把 d 兵向前推进，从 d3 走到 d4。";
      }
      static retryMessage() {
        return "这样会让兵孤立无援地前进，黑方可以直接吃掉它。\n\n并排时，你的兵随时可以吃掉来到斜前方的棋子。\n\n回退，改为把 d3 的兵推进到 d4。";
      }
      static requiredPosition() {
        return {
          d4: 'P'
        };
      }
      static failedPosition() {
        return {
          e5: 'P'
        };
      }
    }
    ;
    Start.initialize();
    return Start;
  }.call(this);
  PawnsStrongerTogether.Progress = function () {
    class Progress extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".Progress");
      }
      static message() {
        return "你的 d 兵现在被正面挡住，但如果愿意，你有一枚进攻棋子可以解决它。\n\n用 e 兵吃掉黑兵，或者从它旁边走过。";
      }
      static requiredPosition() {
        return {
          e4: null
        };
      }
    }
    ;
    Progress.initialize();
    return Progress;
  }.call(this);
  PawnsStrongerTogether.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n单独一枚兵无法战胜位置良好的两枚兵。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return PawnsStrongerTogether;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pawnchains.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/pawnchains.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.PawnChains = function () {
  var Lesson;
  class PawnChains extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.PawnChains';
    }
    static displayName() {
      return "Pawn chains";
    }
    static category() {
      return Chess.Lessons.Categories.Pawn;
    }
    static steps() {
      return [this.BuildChain, this.RecaptureHead, this.End];
    }
    static startingPosition() {
      return {
        d3: 'P',
        e3: 'P',
        d5: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  PawnChains.initialize();
  Lesson = PawnChains;
  PawnChains.BuildChain = function () {
    class BuildChain extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".BuildChain");
      }
      static message() {
        return "你的兵可以沿对角线连接成兵链。这样它们即使遭到攻击，也能互相保护。\n\n把兵从 e3 推到 e4，引诱黑方吃子。";
      }
      static requiredPosition() {
        return {
          e4: 'P'
        };
      }
      static failedPosition() {
        return {
          d4: 'P'
        };
      }
      static retryMessage() {
        return "那会锁住 d 纵线，也无法在保护下推进到 e4。\n\n我们希望黑方攻击兵链前端，让底部的兵能够回吃。\n\n回退：改为把 e3 的兵推进到 e4。";
      }
    }
    ;
    BuildChain.initialize();
    return BuildChain;
  }.call(this);
  PawnChains.RecaptureHead = function () {
    class RecaptureHead extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".RecaptureHead");
      }
      static message() {
        return "黑方吃掉了兵链前端，但你的底兵正在保护它。把它吃回来。\n\n在 e4 回吃。";
      }
      static requiredPosition() {
        return {
          d3: null,
          d4: null
        };
      }
      static failedPosition() {
        return {
          d4: 'P'
        };
      }
      static retryMessage() {
        return "你让那枚兵逃走了。\n\n再试一次：在 e4 吃子。";
      }
    }
    ;
    RecaptureHead.initialize();
    return RecaptureHead;
  }.call(this);
  PawnChains.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n兵沿对角线互相保护，可以连接成任意长度的兵链，每枚兵都保护前方的一枚。只有最底部的兵不受保护。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return PawnChains;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"knightmovement.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/knightmovement.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KnightMovement = function () {
  var Lesson;
  class KnightMovement extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KnightMovement';
    }
    static displayName() {
      return "Knight movement";
    }
    static category() {
      return Chess.Lessons.Categories.Knight;
    }
    static steps() {
      return [this.MoveExplanation, this.MoveTarget, this.End];
    }
    static startingPosition() {
      return {
        d4: 'N'
      };
    }
  }
  ;
  KnightMovement.initialize();
  Lesson = KnightMovement;
  KnightMovement.MoveExplanation = function () {
    class MoveExplanation extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveExplanation");
      }
      static message() {
        return "马走日字：先向一个方向走两格，再向任一侧走一格。\n\n把马移动到任意一个合法格。";
      }
      static requiredPosition() {
        return {
          d4: null
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d4);
      }
      markup() {
        return [{
          legalMoves: true,
          arrow: {
            from: Chess.Square.d4,
            to: Chess.Square.e2
          }
        }];
      }
    }
    ;
    MoveExplanation.initialize();
    return MoveExplanation;
  }.call(this);
  KnightMovement.MoveTarget = function () {
    class MoveTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveTarget");
      }
      static message() {
        return "继续移动马，直到到达目标。";
      }
      static requiredPosition() {
        return {
          b2: 'N'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.b2
          }
        }];
      }
    }
    ;
    MoveTarget.initialize();
    return MoveTarget;
  }.call(this);
  KnightMovement.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n马是唯一不沿直线移动的棋子。它曲折的路线让人难以预判。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KnightMovement;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"knightscenicroute.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/knightscenicroute.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KnightScenicRoute = function () {
  var Lesson;
  class KnightScenicRoute extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KnightScenicRoute';
    }
    static displayName() {
      return "The knight's scenic route";
    }
    static category() {
      return Chess.Lessons.Categories.Knight;
    }
    static steps() {
      return [this.ReachNeighborSquare, this.End];
    }
    static startingPosition() {
      return {
        d4: 'N'
      };
    }
  }
  ;
  KnightScenicRoute.initialize();
  Lesson = KnightScenicRoute;
  KnightScenicRoute.ReachNeighborSquare = function () {
    class ReachNeighborSquare extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachNeighborSquare");
      }
      static message() {
        return "前方的格子看起来很近，却无法直接到达。马永远不能一步落到相邻格。\n\n绕远路，到达 d5。";
      }
      static requiredPosition() {
        return {
          d5: 'N'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d5
          }
        }];
      }
    }
    ;
    ReachNeighborSquare.initialize();
    return ReachNeighborSquare;
  }.call(this);
  KnightScenicRoute.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n马要走到相邻格需要三步。好好利用这三步：绕到正确位置的马往往非常值得。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KnightScenicRoute;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"knightjumps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/knightjumps.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KnightJumps = function () {
  var Lesson;
  class KnightJumps extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KnightJumps';
    }
    static displayName() {
      return "Knight jumps";
    }
    static category() {
      return Chess.Lessons.Categories.Knight;
    }
    static steps() {
      return [this.JumpOverPawns, this.End];
    }
    static startingPosition() {
      return {
        d4: 'N',
        c5: 'p',
        d5: 'p',
        e5: 'p'
      };
    }
  }
  ;
  KnightJumps.initialize();
  Lesson = KnightJumps;
  KnightJumps.JumpOverPawns = function () {
    class JumpOverPawns extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".JumpOverPawns");
      }
      static message() {
        return "马是唯一能越过其他棋子的棋子。兵墙也挡不住它。\n\n跳过兵，到达 c6 或 e6。";
      }
      completed() {
        return this.positionAchieved({
          c6: 'N'
        }) || this.positionAchieved({
          e6: 'N'
        });
      }
      failed() {
        return this.positionAchieved({
          d4: null
        }) && !this.completed();
      }
      static retryMessage() {
        return "这可不是马期待的那种跳跃。\n\n退回去，然后跳到 c6 或 e6。";
      }
      markup() {
        return [{
          arrows: [{
            from: Chess.Square.d4,
            to: Chess.Square.c6
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.e6
          }]
        }];
      }
    }
    ;
    JumpOverPawns.initialize();
    return JumpOverPawns;
  }.call(this);
  KnightJumps.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n其他棋子都无法这样跳跃——车、象和后都会被路径上的棋子挡住。马则能直接跃过挡路的任何棋子，不论敌我。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KnightJumps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"knightcapture.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/knightcapture.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KnightCapture = function () {
  var Lesson;
  class KnightCapture extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KnightCapture';
    }
    static displayName() {
      return "Knight capture";
    }
    static category() {
      return Chess.Lessons.Categories.Knight;
    }
    static steps() {
      return [this.CapturePawn, this.End];
    }
    static startingPosition() {
      return {
        d4: 'N',
        e6: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  KnightCapture.initialize();
  Lesson = KnightCapture;
  KnightCapture.CapturePawn = function () {
    class CapturePawn extends Chess.Lessons.CapturePawn {
      static id() {
        return "".concat(Lesson.id(), ".CapturePawn");
      }
      static message() {
        return "马落到敌方棋子所在的格子上即可将其吃掉。\n\n吃掉那枚兵。";
      }
    }
    ;
    CapturePawn.initialize();
    return CapturePawn;
  }.call(this);
  KnightCapture.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n因为马可以跳跃，所以没有棋子能阻挡它的攻击。唯一的防守方法是移走目标，或者准备另一枚棋子回吃这匹马。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KnightCapture;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"knightinpursuit.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/knightinpursuit.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KnightInPursuit = function () {
  var Lesson;
  class KnightInPursuit extends Chess.Lessons.KnightCapture {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KnightInPursuit';
    }
    static displayName() {
      return "A knight in pursuit";
    }
    static steps() {
      return [this.CapturePawn, this.End];
    }
    static startingPosition() {
      return {
        b3: 'N',
        g3: 'p'
      };
    }
  }
  ;
  KnightInPursuit.initialize();
  Lesson = KnightInPursuit;
  KnightInPursuit.CapturePawn = function () {
    class CapturePawn extends Chess.Lessons.KnightCapture.CapturePawn {
      static id() {
        return "".concat(Lesson.id(), ".CapturePawn");
      }
      static message() {
        return "这枚兵正冲向升变格。你需要提前思考几步，才能将它吃掉。\n\n规划路线并吃掉这枚兵。";
      }
      static retryMessage() {
        return "兵已经升变，并战胜了你的马。\n\n再试一次！马需要好几步才能穿越棋盘，因此要规划一条路线，让它及时到达能够控制升变格的位置。";
      }
      static retryPosition() {
        return Lesson.startingPosition();
      }
      markup() {
        var gameState;
        gameState = this.gameState();
        if (!gameState.getPiecesOfTypeAndColor(Chess.Piece.Types.Pawn, Chess.Piece.Colors.Black).length) {
          return;
        }
        return [{
          arrow: {
            from: Chess.Square.g3,
            to: Chess.Square.g1
          }
        }];
      }
    }
    ;
    CapturePawn.initialize();
    return CapturePawn;
  }.call(this);
  KnightInPursuit.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n马移动得不快，但可以提前占据正确的位置。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KnightInPursuit;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"knightonrim.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/knightonrim.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KnightOnRim = function () {
  var Lesson;
  class KnightOnRim extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KnightOnRim';
    }
    static displayName() {
      return "A knight on the rim";
    }
    static category() {
      return Chess.Lessons.Categories.Knight;
    }
    static steps() {
      return [this.SideReach, this.MoveToCenter, this.End];
    }
    static startingPosition() {
      return {
        a3: 'N'
      };
    }
  }
  ;
  KnightOnRim.initialize();
  Lesson = KnightOnRim;
  KnightOnRim.SideReach = function () {
    class SideReach extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".SideReach");
      }
      static message() {
        return "这匹马位于棋盘边缘，只能到达四个格子。\n\n把它移到能发挥更大作用的位置。";
      }
      static requiredPosition() {
        return {
          a3: null
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.a3);
      }
      markup() {
        return [{
          legalMoves: true
        }];
      }
    }
    ;
    SideReach.initialize();
    return SideReach;
  }.call(this);
  KnightOnRim.MoveToCenter = function () {
    class MoveToCenter extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".MoveToCenter");
      }
      static message() {
        return "继续前进，直到马能发挥全部活动范围。";
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(this.gameState().occupiedSquares()[0]);
      }
      completed() {
        return this.gameState().getLegalMoves().length === 8;
      }
      markup() {
        return [{
          legalMoves: true
        }];
      }
    }
    ;
    MoveToCenter.initialize();
    return MoveToCenter;
  }.call(this);
  KnightOnRim.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n处于活跃位置时，马能到达八个格子——是位于边缘时的两倍。\n\n有句话说：“马在边缘，处境堪忧。”";
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(this.gameState().occupiedSquares()[0]);
      }
      markup() {
        return [{
          legalMoves: true
        }];
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KnightOnRim;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bishopmovement.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/bishopmovement.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.BishopMovement = function () {
  var Lesson;
  class BishopMovement extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.BishopMovement';
    }
    static displayName() {
      return "Bishop movement";
    }
    static category() {
      return Chess.Lessons.Categories.Bishop;
    }
    static steps() {
      return [this.MoveExplanation, this.MoveTarget, this.End];
    }
    static startingPosition() {
      return {
        d4: 'B'
      };
    }
  }
  ;
  BishopMovement.initialize();
  Lesson = BishopMovement;
  BishopMovement.MoveExplanation = function () {
    class MoveExplanation extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveExplanation");
      }
      static message() {
        return "象沿对角线移动，每次可以移动任意格数。\n\n把象移动到任意一个合法格。";
      }
      static requiredPosition() {
        return {
          d4: null
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d4);
      }
      markup() {
        return [{
          legalMoves: true,
          arrows: [{
            from: Chess.Square.d4,
            to: Chess.Square.h8
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a7
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a1
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.g1
          }]
        }];
      }
    }
    ;
    MoveExplanation.initialize();
    return MoveExplanation;
  }.call(this);
  BishopMovement.MoveTarget = function () {
    class MoveTarget extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".MoveTarget");
      }
      static message() {
        return "继续移动象，直到到达目标。";
      }
      completed() {
        var bishopSquare, gameState, manhattanDistance;
        gameState = this.gameState();
        bishopSquare = gameState.occupiedSquares()[0];
        manhattanDistance = Math.abs(bishopSquare.fileIndex) + Math.abs(bishopSquare.rankIndex - 3);
        return manhattanDistance === 1;
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.a4
          }
        }];
      }
    }
    ;
    MoveTarget.initialize();
    return MoveTarget;
  }.call(this);
  BishopMovement.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "你可以看到，这枚象无法直接到达目标。它只能在黑格上移动，所以称为黑格象。\n\n每方开局时都有一枚白格象和一枚黑格象。只有两枚象配合，才能到达任意颜色的目标格。";
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.a4
          }
        }];
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return BishopMovement;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"blockedbishop.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/blockedbishop.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.BlockedBishop = function () {
  var Lesson;
  class BlockedBishop extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.BlockedBishop';
    }
    static displayName() {
      return "The blocked bishop";
    }
    static category() {
      return Chess.Lessons.Categories.Bishop;
    }
    static steps() {
      return [this.UnderstandBlock, this.ReachTarget, this.End];
    }
    static startingPosition() {
      return {
        d4: 'B',
        f6: 'P'
      };
    }
  }
  ;
  BlockedBishop.initialize();
  Lesson = BlockedBishop;
  BlockedBishop.UnderstandBlock = function () {
    class UnderstandBlock extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".UnderstandBlock");
      }
      static message() {
        return "象可以走任意距离，但不能越过其他棋子。\n\n要到达目标，你必须绕路，或者移动兵。";
      }
      completed() {
        var gameState;
        gameState = this.gameState();
        return !gameState.isSquareOccupied(Chess.Square.d4) || !gameState.isSquareOccupied(Chess.Square.f6);
      }
      markup() {
        return [{
          arrows: [{
            from: Chess.Square.d4,
            to: Chess.Square.e5
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a7
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a1
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.g1
          }],
          target: {
            position: Chess.Square.h8
          }
        }];
      }
    }
    ;
    UnderstandBlock.initialize();
    return UnderstandBlock;
  }.call(this);
  BlockedBishop.ReachTarget = function () {
    class ReachTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachTarget");
      }
      static message() {
        return "到达 h8 的目标。";
      }
      static requiredPosition() {
        return {
          h8: 'B'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.h8
          }
        }];
      }
    }
    ;
    ReachTarget.initialize();
    return ReachTarget;
  }.call(this);
  BlockedBishop.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n象不喜欢有大量兵被锁死在同色格上的封闭局面。它们更喜欢开阔、延伸很远的对角线。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return BlockedBishop;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"twobishopstwocolors.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/twobishopstwocolors.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.TwoBishopsTwoColors = function () {
  var Lesson;
  class TwoBishopsTwoColors extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.TwoBishopsTwoColors';
    }
    static displayName() {
      return "Two bishops, two colors";
    }
    static category() {
      return Chess.Lessons.Categories.Bishop;
    }
    static steps() {
      return [this.ReachLightSquare, this.ReachDarkSquare, this.ReachLightSquareAgain, this.End];
    }
    static startingPosition() {
      return {
        c1: 'B',
        f1: 'B'
      };
    }
  }
  ;
  TwoBishopsTwoColors.initialize();
  Lesson = TwoBishopsTwoColors;
  TwoBishopsTwoColors.ReachLightSquare = function () {
    class ReachLightSquare extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachLightSquare");
      }
      static message() {
        return "你的两枚象各自负责一半棋盘。一枚控制白格，另一枚控制黑格。\n\n目标位于白格。派能够到达它的那枚象过去。";
      }
      static requiredPosition() {
        return {
          c6: 'B'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.c6
          }
        }];
      }
    }
    ;
    ReachLightSquare.initialize();
    return ReachLightSquare;
  }.call(this);
  TwoBishopsTwoColors.ReachDarkSquare = function () {
    class ReachDarkSquare extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachDarkSquare");
      }
      static message() {
        return "e5 上出现了一个新目标。\n\n到达那里！";
      }
      static requiredPosition() {
        return {
          e5: 'B'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.e5
          }
        }];
      }
    }
    ;
    ReachDarkSquare.initialize();
    return ReachDarkSquare;
  }.call(this);
  TwoBishopsTwoColors.ReachLightSquareAgain = function () {
    class ReachLightSquareAgain extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachLightSquareAgain");
      }
      static message() {
        return "最后一个！\n\n到达 d3 的目标。";
      }
      static requiredPosition() {
        return {
          d3: 'B'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d3
          }
        }];
      }
    }
    ;
    ReachLightSquareAgain.initialize();
    return ReachLightSquareAgain;
  }.call(this);
  TwoBishopsTwoColors.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n每枚象只能覆盖棋盘上一半的格子。两枚象一起则不会遗漏任何格子，因此象对的价值超过单枚象的两倍。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return TwoBishopsTwoColors;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bishopcapture.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/bishopcapture.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.BishopCapture = function () {
  var Lesson;
  class BishopCapture extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.BishopCapture';
    }
    static displayName() {
      return "Bishop capture";
    }
    static category() {
      return Chess.Lessons.Categories.Bishop;
    }
    static steps() {
      return [this.CapturePawn, Chess.Lessons.DefaultEndStep];
    }
    static startingPosition() {
      return {
        d4: 'B',
        f6: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  BishopCapture.initialize();
  Lesson = BishopCapture;
  BishopCapture.CapturePawn = function () {
    class CapturePawn extends Chess.Lessons.CapturePawn {
      static id() {
        return "".concat(Lesson.id(), ".CapturePawn");
      }
      static message() {
        return "象可以吃掉它能够到达的任何敌方棋子。\n\n吃掉 f6 的兵。";
      }
    }
    ;
    CapturePawn.initialize();
    return CapturePawn;
  }.call(this);
  return BishopCapture;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rookmovement.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/rookmovement.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.RookMovement = function () {
  var Lesson;
  class RookMovement extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.RookMovement';
    }
    static displayName() {
      return "Rook movement";
    }
    static category() {
      return Chess.Lessons.Categories.Rook;
    }
    static steps() {
      return [this.MoveExplanation, this.MoveTarget, this.End];
    }
    static startingPosition() {
      return {
        d4: 'R'
      };
    }
  }
  ;
  RookMovement.initialize();
  Lesson = RookMovement;
  RookMovement.MoveExplanation = function () {
    class MoveExplanation extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveExplanation");
      }
      static message() {
        return "车沿横线（行）和纵线（列）直线移动，每次可以走任意格数。\n\n把车移动到任意一个合法格。";
      }
      static requiredPosition() {
        return {
          d4: null
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d4);
      }
      markup() {
        return [{
          legalMoves: true,
          arrows: [{
            from: Chess.Square.d4,
            to: Chess.Square.d8
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.h4
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a4
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.d1
          }]
        }];
      }
    }
    ;
    MoveExplanation.initialize();
    return MoveExplanation;
  }.call(this);
  RookMovement.MoveTarget = function () {
    class MoveTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveTarget");
      }
      static message() {
        return "继续移动车，直到到达目标。";
      }
      static requiredPosition() {
        return {
          a8: 'R'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.a8
          }
        }];
      }
    }
    ;
    MoveTarget.initialize();
    return MoveTarget;
  }.call(this);
  RookMovement.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n车是强大的远程棋子。在开放的横线（行）或纵线（列）上，它一步就能走遍整条棋盘。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return RookMovement;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rookcapture.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/rookcapture.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.RookCapture = function () {
  var Lesson;
  class RookCapture extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.RookCapture';
    }
    static displayName() {
      return "Rook capture";
    }
    static category() {
      return Chess.Lessons.Categories.Rook;
    }
    static steps() {
      return [this.CapturePawn, Chess.Lessons.DefaultEndStep];
    }
    static startingPosition() {
      return {
        d2: 'R',
        d6: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  RookCapture.initialize();
  Lesson = RookCapture;
  RookCapture.CapturePawn = function () {
    class CapturePawn extends Chess.Lessons.CapturePawn {
      static id() {
        return "".concat(Lesson.id(), ".CapturePawn");
      }
      static message() {
        return "车沿直线移动到路径上的敌方棋子所在格，即可将其吃掉。\n\n吃掉那枚兵。";
      }
    }
    ;
    CapturePawn.initialize();
    return CapturePawn;
  }.call(this);
  return RookCapture;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"blockedrook.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/blockedrook.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.BlockedRook = function () {
  var Lesson;
  class BlockedRook extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.BlockedRook';
    }
    static displayName() {
      return "The blocked rook";
    }
    static category() {
      return Chess.Lessons.Categories.Rook;
    }
    static steps() {
      return [this.SlideToBlocker, this.ReachTarget, this.End];
    }
    static startingPosition() {
      return {
        d2: 'R',
        d3: 'P'
      };
    }
  }
  ;
  BlockedRook.initialize();
  Lesson = BlockedRook;
  BlockedRook.SlideToBlocker = function () {
    class SlideToBlocker extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".SlideToBlocker");
      }
      static message() {
        return "你的兵挡住了去路，车无法越过它。\n\n你得绕过去。";
      }
      completed() {
        var gameState;
        gameState = this.gameState();
        return !gameState.isSquareOccupied(Chess.Square.d2) || !gameState.isSquareOccupied(Chess.Square.d3);
      }
      markup() {
        return [{
          arrows: [{
            from: Chess.Square.d2,
            to: Chess.Square.h2
          }, {
            from: Chess.Square.d2,
            to: Chess.Square.a2
          }, {
            from: Chess.Square.d2,
            to: Chess.Square.d1
          }],
          target: {
            position: Chess.Square.d8
          }
        }];
      }
    }
    ;
    SlideToBlocker.initialize();
    return SlideToBlocker;
  }.call(this);
  BlockedRook.ReachTarget = function () {
    class ReachTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachTarget");
      }
      static message() {
        return "到达 d8 的目标。";
      }
      static requiredPosition() {
        return {
          d8: 'R'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d8
          }
        }];
      }
    }
    ;
    ReachTarget.initialize();
    return ReachTarget;
  }.call(this);
  BlockedRook.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n车适合占据没有己方或双方兵阻挡的纵线（列）。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return BlockedRook;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"openingthefile.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/openingthefile.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.OpeningTheFile = function () {
  var Lesson;
  class OpeningTheFile extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.OpeningTheFile';
    }
    static displayName() {
      return "Opening the file";
    }
    static category() {
      return Chess.Lessons.Categories.Rook;
    }
    static steps() {
      return [this.CaptureBlocker, this.ReachTarget, this.End];
    }
    static startingPosition() {
      return {
        d2: 'R',
        d4: 'P',
        e5: 'p',
        f6: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  OpeningTheFile.initialize();
  Lesson = OpeningTheFile;
  OpeningTheFile.CaptureBlocker = function () {
    class CaptureBlocker extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".CaptureBlocker");
      }
      static message() {
        return "怎样才能用最少的步数到达目标？\n\n吃掉那枚兵，打开纵线（列）。";
      }
      static retryMessage() {
        return "这样到达目标需要更长时间。\n\n用你的兵进行交换，可以为车强大的活动范围清理道路。\n\n在 e5 吃子。";
      }
      completed() {
        return this.positionAchieved({
          e5: 'P'
        });
      }
      failed() {
        return this.positionAchieved({
          d5: 'P'
        }) || this.positionAchieved({
          d2: null
        });
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d8
          }
        }];
      }
    }
    ;
    CaptureBlocker.initialize();
    return CaptureBlocker;
  }.call(this);
  OpeningTheFile.ReachTarget = function () {
    class ReachTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachTarget");
      }
      static message() {
        return "纵线已经畅通。\n\n到达 d8。";
      }
      static retryMessage() {
        return "别丢掉你的车！\n\n越过那枚兵，前往 d8。";
      }
      static requiredPosition() {
        return {
          d8: 'R'
        };
      }
      failed() {
        var gameState;
        if (!(gameState = this.gameState())) {
          return;
        }
        return !gameState.getPiecesOfColor(Chess.Piece.Colors.White).length;
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d8
          }
        }];
      }
    }
    ;
    ReachTarget.initialize();
    return ReachTarget;
  }.call(this);
  OpeningTheFile.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n开放纵线就是车的高速通道。车占据开放纵线后，可以从棋盘一端控制到另一端。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return OpeningTheFile;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rooknevertires.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/rooknevertires.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.RookNeverTires = function () {
  var Lesson;
  class RookNeverTires extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.RookNeverTires';
    }
    static displayName() {
      return "The rook never tires";
    }
    static category() {
      return Chess.Lessons.Categories.Rook;
    }
    static steps() {
      return [this.ReachCenter, this.End];
    }
    static startingPosition() {
      return {
        e4: 'R'
      };
    }
  }
  ;
  RookNeverTires.initialize();
  Lesson = RookNeverTires;
  RookNeverTires.ReachCenter = function () {
    class ReachCenter extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachCenter");
      }
      static message() {
        return "还记得边缘的马处境堪忧吗？看看车是否也有同样的问题。\n\n位于中心时，你的车已经控制十四个格子，同时覆盖一整条横线和纵线。\n\n现在把它移到角落，送到 a1。";
      }
      static requiredPosition() {
        return {
          a1: 'R'
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.e4);
      }
      markup() {
        return [{
          legalMoves: this.positionAchieved({
            e4: 'R'
          }),
          target: {
            position: Chess.Square.a1
          }
        }];
      }
    }
    ;
    ReachCenter.initialize();
    return ReachCenter;
  }.call(this);
  RookNeverTires.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "仍然是十四格！\n\n马在角落只能到达两格，在中心则能到达八格。车无论站在哪里，都能到达相同的十四格。\n\n把车放在任意开放线路上，它就随时准备出击。";
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.a1);
      }
      markup() {
        return [{
          legalMoves: true
        }];
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return RookNeverTires;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queenmovement.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/queenmovement.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.QueenMovement = function () {
  var Lesson;
  class QueenMovement extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.QueenMovement';
    }
    static displayName() {
      return "Queen movement";
    }
    static category() {
      return Chess.Lessons.Categories.Queen;
    }
    static steps() {
      return [this.MoveExplanation, this.MoveTarget, this.End];
    }
    static startingPosition() {
      return {
        d4: 'Q'
      };
    }
  }
  ;
  QueenMovement.initialize();
  Lesson = QueenMovement;
  QueenMovement.MoveExplanation = function () {
    class MoveExplanation extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveExplanation");
      }
      static message() {
        return "后的走法兼具车与象：可以沿横线、纵线和对角线移动，每次走任意格数。\n\n把后移动到任意一个合法格。";
      }
      static requiredPosition() {
        return {
          d4: null
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d4);
      }
      markup() {
        return [{
          legalMoves: true,
          arrows: [{
            from: Chess.Square.d4,
            to: Chess.Square.d8
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.h8
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.h4
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.g1
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.d1
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a1
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a4
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.a7
          }]
        }];
      }
    }
    ;
    MoveExplanation.initialize();
    return MoveExplanation;
  }.call(this);
  QueenMovement.MoveTarget = function () {
    class MoveTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveTarget");
      }
      static message() {
        return "继续移动后，直到到达目标。";
      }
      static requiredPosition() {
        return {
          c2: 'Q'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.c2
          }
        }];
      }
    }
    ;
    MoveTarget.initialize();
    return MoveTarget;
  }.call(this);
  QueenMovement.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n后是棋盘上威力最强的棋子。位于中心时，她能到达二十七个格子，比任何其他棋子都多。\n\n不过，她也继承了车和象的共同弱点：无法越过其他棋子。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return QueenMovement;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queencapture.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/queencapture.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.QueenCapture = function () {
  var Lesson;
  class QueenCapture extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.QueenCapture';
    }
    static displayName() {
      return "Queen capture";
    }
    static category() {
      return Chess.Lessons.Categories.Queen;
    }
    static steps() {
      return [this.CapturePawn, Chess.Lessons.DefaultEndStep];
    }
    static startingPosition() {
      return {
        d4: 'Q',
        g7: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  QueenCapture.initialize();
  Lesson = QueenCapture;
  QueenCapture.CapturePawn = function () {
    class CapturePawn extends Chess.Lessons.CapturePawn {
      static id() {
        return "".concat(Lesson.id(), ".CapturePawn");
      }
      static message() {
        return "后可以沿任何直线或对角线吃子。\n\n吃掉那枚兵。";
      }
    }
    ;
    CapturePawn.initialize();
    return CapturePawn;
  }.call(this);
  return QueenCapture;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"respectthequeen.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/respectthequeen.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess,
  PAA,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.RespectTheQueen = function () {
  var Lesson;
  class RespectTheQueen extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.RespectTheQueen';
    }
    static displayName() {
      return "Respect the queen";
    }
    static category() {
      return Chess.Lessons.Categories.Queen;
    }
    static steps() {
      return [this.MoveToSafety, this.WinThePawns, this.End];
    }
    static startingPosition() {
      return {
        d5: 'Q',
        c6: 'p',
        b7: 'p'
      };
    }
    aiMove() {
      return this.randomAICapture() || this.randomAIMove();
    }
  }
  ;
  RespectTheQueen.initialize();
  Lesson = RespectTheQueen;
  RespectTheQueen.MoveToSafety = function () {
    class MoveToSafety extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".MoveToSafety");
      }
      static message() {
        return "你的后正受到 c6 兵的攻击。她可以吃掉它，但要小心！那枚兵有保护吗？\n\n你应该怎么做？";
      }
      static retryMessage() {
        return "你的后没了，只换到一枚兵。c6 的兵受到 b7 兵保护。\n\n吃子之前，务必先检查目标受到哪些棋子保护。回退，这一次把后带离危险。";
      }
      completed() {
        var gameState, queenLostWithoutTrade, queenSaved;
        gameState = this.gameState();
        queenSaved = gameState.getPiecesOfColor(Chess.Piece.Colors.White).length && gameState.turn() === Chess.Piece.Colors.White && this.positionAchieved({
          d5: null
        });
        queenLostWithoutTrade = !gameState.getPiecesOfColor(Chess.Piece.Colors.White).length && gameState.getPiecesOfColor(Chess.Piece.Colors.Black).length === 2;
        return queenSaved || queenLostWithoutTrade;
      }
      failed() {
        var gameState;
        if (!(gameState = this.gameState())) {
          return;
        }
        return !gameState.getPiecesOfColor(Chess.Piece.Colors.White).length && gameState.getPiecesOfColor(Chess.Piece.Colors.Black).length === 1;
      }
    }
    ;
    MoveToSafety.initialize();
    return MoveToSafety;
  }.call(this);
  RespectTheQueen.WinThePawns = function () {
    class WinThePawns extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".WinThePawns");
      }
      static message() {
        return "做得好。她可以留待以后继续战斗。\n\n怎样才能在不让后陷入危险的情况下吃掉这些兵？";
      }
      static retryMessage() {
        return "你的后没了，被一枚普通的兵算计了。\n\n吃子或走到某个格子之前，务必先检查那里受到哪些棋子保护。\n\n回退，并选择另一条路线吃掉这些兵。";
      }
      retryGameState() {
        return Chess.GameState.fromPosition(this.lesson.constructor.startingPosition());
      }
      completed() {
        return !this.gameState().occupiedSquaresOfColor(Chess.Piece.Colors.Black).length;
      }
      failed() {
        var attackedSquares, blackPiece, blackSquare, blackSquares, gameState, i, len, whiteSquare;
        if (!(gameState = this.gameState())) {
          return;
        }
        if (!(whiteSquare = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.White)[0])) {
          return true;
        }
        blackSquares = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.Black);
        if (!blackSquares.length) {
          return;
        }
        attackedSquares = gameState.getLegalDestinationsFromSquare(whiteSquare);
        for (i = 0, len = blackSquares.length; i < len; i++) {
          blackSquare = blackSquares[i];
          blackPiece = gameState.getPieceAtSquare(blackSquare);
          if (blackPiece.type === Chess.Piece.Types.Pawn) {
            continue;
          }
          if (indexOf.call(attackedSquares, blackSquare) < 0) {
            // Make sure white can't capture the piece in the next move.
            return true;
          }
        }
        return false;
      }
    }
    ;
    WinThePawns.initialize();
    return WinThePawns;
  }.call(this);
  RespectTheQueen.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n后的强大正是她如此珍贵的原因。没有充分理由，绝不要用后交换价值更低的棋子，也不要让她停在较弱棋子能够吃掉的位置。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return RespectTheQueen;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pawnpromotion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/pawnpromotion.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.PawnPromotion = function () {
  var Lesson;
  class PawnPromotion extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.PawnPromotion';
    }
    static displayName() {
      return "Pawn promotion";
    }
    static category() {
      return Chess.Lessons.Categories.Queen;
    }
    static steps() {
      return [this.AdvanceToLastRank, this.ChoosePromotion, this.End];
    }
    static startingPosition() {
      return {
        d7: 'P'
      };
    }
    static additionalRequiredPieces() {
      return Chess.Piece.PromotionTypes;
    }
  }
  ;
  PawnPromotion.initialize();
  Lesson = PawnPromotion;
  PawnPromotion.AdvanceToLastRank = function () {
    class AdvanceToLastRank extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".AdvanceToLastRank");
      }
      static message() {
        return "你的兵距离底线只差一步。看看它到达那里后会发生什么。\n\n前进到 d8。";
      }
      static requiredPosition() {
        return {
          d7: null
        };
      }
    }
    ;
    AdvanceToLastRank.initialize();
    return AdvanceToLastRank;
  }.call(this);
  PawnPromotion.ChoosePromotion = function () {
    class ChoosePromotion extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".ChoosePromotion");
      }
      static message() {
        return "兵到达最后一条横线后不会停下——它会升变为更强的棋子。\n\n选择你的兵要升变成什么。";
      }
      completed() {
        var piece;
        if (!(piece = this.gameState().getPieceAtSquare(Chess.Square.d8))) {
          return;
        }
        return piece.type !== Chess.Piece.Types.Pawn;
      }
      failed() {
        if (this.lesson.lessonManager.rewinding()) {
          return true;
        }
        if (this._failed) {
          return;
        }
        if (!this.positionAchieved({
          d7: 'P'
        })) {
          return;
        }
        return this._failed = true;
      }
      static retryMessage() {
        return "你没有选择棋子就关闭了菜单。\n\n再次前进到 d8，然后选择兵要升变成的棋子。";
      }
    }
    ;
    ChoosePromotion.initialize();
    return ChoosePromotion;
  }.call(this);
  PawnPromotion.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n到达底线能让最弱的棋子变成强大的战士，通常都会升变成新的后。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return PawnPromotion;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"kingmovement.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/kingmovement.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KingMovement = function () {
  var Lesson;
  class KingMovement extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KingMovement';
    }
    static displayName() {
      return "King movement";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.MoveExplanation, this.MoveTarget, this.End];
    }
    static startingPosition() {
      return {
        d4: 'K'
      };
    }
  }
  ;
  KingMovement.initialize();
  Lesson = KingMovement;
  KingMovement.MoveExplanation = function () {
    class MoveExplanation extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveExplanation");
      }
      static message() {
        return "王登场了！\n\n其他每一枚棋子——兵、马、象、车和后——都用于追猎敌王或保护己王。\n\n王可以向任意方向移动一格。把王移到任意一个合法格。";
      }
      static requiredPosition() {
        return {
          d4: null
        };
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.chessboard().selectSquare(Chess.Square.d4);
      }
      markup() {
        return [{
          legalMoves: true,
          arrows: [{
            from: Chess.Square.d4,
            to: Chess.Square.d5
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.e5
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.e4
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.e3
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.d3
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.c3
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.c4
          }, {
            from: Chess.Square.d4,
            to: Chess.Square.c5
          }]
        }];
      }
    }
    ;
    MoveExplanation.initialize();
    return MoveExplanation;
  }.call(this);
  KingMovement.MoveTarget = function () {
    class MoveTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".MoveTarget");
      }
      static message() {
        return "继续移动王，直到到达目标。";
      }
      static requiredPosition() {
        return {
          f7: 'K'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.f7
          }
        }];
      }
    }
    ;
    MoveTarget.initialize();
    return MoveTarget;
  }.call(this);
  KingMovement.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n王可以像后一样向各个方向移动，但每次只能走一格。因为王无法迅速逃跑，你必须提前思考，让它远离危险。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KingMovement;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"check.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/check.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Check = function () {
  var Lesson;
  class Check extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Check';
    }
    static displayName() {
      return "Check";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.RookMove, this.EscapeCheck, this.End];
    }
    static startingGameState() {
      var state;
      state = Chess.GameState.fromPosition({
        e4: 'K',
        h8: 'r',
        d8: 'k'
      });
      state.setTurn(Chess.Piece.Colors.Black);
      return state;
    }
    aiMove() {
      var gameState, ref;
      gameState = this.lessonManager.gameState();
      if (((ref = gameState.getPieceAtSquare(Chess.Square.h8)) != null ? ref.type : void 0) === Chess.Piece.Types.Rook) {
        return new Chess.Move(Chess.Square.h8, Chess.Square.e8);
      } else {
        return this.lessonManager.gameState().aiMove();
      }
    }
  }
  ;
  Check.initialize();
  Lesson = Check;
  Check.RookMove = function () {
    class RookMove extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".RookMove");
      }
      static requiredPosition() {
        return {
          e8: 'r'
        };
      }
    }
    ;
    RookMove.initialize();
    return RookMove;
  }.call(this);
  Check.EscapeCheck = function () {
    class EscapeCheck extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".EscapeCheck");
      }
      static message() {
        return "黑车沿纵线攻击你的王。对王的攻击有一个特殊名称：将军。你绝不能置之不理。\n\n把王移出这条纵线，脱离将军。";
      }
      constructor() {
        super(...arguments);
        this.showMarkup = new ReactiveField(false);
      }
      async onCreated() {
        super.onCreated(...arguments);
        await _.waitForSeconds(0.5);
        return this.showMarkup(true);
      }
      completed() {
        var gameState, kingSquare;
        gameState = this.gameState();
        kingSquare = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.White)[0];
        return kingSquare.fileIndex !== Chess.Square.e1.fileIndex;
      }
      markup() {
        if (!this.showMarkup()) {
          return;
        }
        return [{
          arrow: {
            from: Chess.Square.e8,
            to: Chess.Square.e5
          }
        }];
      }
    }
    ;
    EscapeCheck.initialize();
    return EscapeCheck;
  }.call(this);
  Check.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n将军是对王的直接威胁，每次将军都必须立即应对。移开王是一种方法。\n\n另外两种是阻挡和吃掉攻击者。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return Check;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"kingdanger.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/kingdanger.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KingDanger = function () {
  var Lesson;
  class KingDanger extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KingDanger';
    }
    static displayName() {
      return "The king can't walk into danger";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.ReachNearTarget, this.End];
    }
    static startingPosition() {
      return {
        h1: 'K',
        a4: 'r',
        a5: 'k'
      };
    }
    aiMove() {
      var gameState, kingSquare;
      gameState = this.lessonManager.gameState();
      kingSquare = gameState.occupiedSquaresByPiecesOfColor(Chess.Piece.Types.King, Chess.Piece.Colors.Black)[0];
      return new Chess.Move(kingSquare, Chess.Square[(kingSquare.fileIndex + 1) % 2][kingSquare.rankIndex]);
    }
  }
  ;
  KingDanger.initialize();
  Lesson = KingDanger;
  KingDanger.ReachNearTarget = function () {
    class ReachNearTarget extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".ReachNearTarget");
      }
      static message() {
        return "d4 上有一个目标。把你的王带过去。";
      }
      static requiredPosition() {
        return {
          d3: 'K'
        };
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d4
          }
        }];
      }
    }
    ;
    ReachNearTarget.initialize();
    return ReachNearTarget;
  }.call(this);
  KingDanger.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "近在咫尺，但你不能迈出最后一步。\n\n车控制着整条第四横线，也包括 d4。王绝不能走到敌方攻击的格子上，否则等于让自己被将军。你永远不能主动把王置于攻击之下。";
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.d4
          },
          arrow: {
            from: Chess.Square.a4,
            to: Chess.Square.h4
          }
        }];
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KingDanger;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"capturingattacker.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/capturingattacker.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.CapturingAttacker = function () {
  var Lesson;
  class CapturingAttacker extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.CapturingAttacker';
    }
    static displayName() {
      return "Capturing the attacker";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.RookMove, this.CaptureAttacker, this.End];
    }
    static startingGameState() {
      var state;
      state = Chess.GameState.fromPosition({
        e1: 'K',
        a2: 'r',
        e8: 'k'
      });
      state.setTurn(Chess.Piece.Colors.Black);
      return state;
    }
    aiMove() {
      var gameState, ref;
      gameState = this.lessonManager.gameState();
      if (((ref = gameState.getPieceAtSquare(Chess.Square.a2)) != null ? ref.type : void 0) === Chess.Piece.Types.Rook) {
        return new Chess.Move(Chess.Square.a2, Chess.Square.e2);
      } else {
        return this.lessonManager.gameState().aiMove();
      }
    }
  }
  ;
  CapturingAttacker.initialize();
  Lesson = CapturingAttacker;
  CapturingAttacker.RookMove = function () {
    class RookMove extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".RookMove");
      }
      static requiredPosition() {
        return {
          e2: 'r'
        };
      }
    }
    ;
    RookMove.initialize();
    return RookMove;
  }.call(this);
  Lesson = CapturingAttacker;
  CapturingAttacker.CaptureAttacker = function () {
    class CaptureAttacker extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".CaptureAttacker");
      }
      static message() {
        return "应对将军有三种方式：移动王、吃掉攻击者，或阻挡攻击。\n\n这个攻击者在你的王能够到达的位置，而且没有防守棋子阻止你吃掉它。\n\n吃掉 e2 的车。";
      }
      static requiredPosition() {
        return {
          e2: 'K'
        };
      }
      static failedPosition() {
        return {
          e2: 'r',
          e1: null
        };
      }
      static retryMessage() {
        return "这样也能应对将军，但攻击者没有保护且近在咫尺，你可以让它付出代价。\n\n这一次，吃掉 e2 的车。";
      }
    }
    ;
    CaptureAttacker.initialize();
    return CaptureAttacker;
  }.call(this);
  CapturingAttacker.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n注意，如果攻击者受到另一枚黑棋保护，王就不能吃掉它，因为那会让王走进将军。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return CapturingAttacker;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"blockingcheck.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/blockingcheck.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.BlockingCheck = function () {
  var Lesson;
  class BlockingCheck extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.BlockingCheck';
    }
    static displayName() {
      return "Blocking the check";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.RookMove, this.BlockAttack, this.End];
    }
    static startingGameState() {
      var state;
      state = Chess.GameState.fromPosition({
        e1: 'K',
        d2: 'R',
        a4: 'r',
        e8: 'k'
      });
      state.setTurn(Chess.Piece.Colors.Black);
      return state;
    }
    aiMove() {
      var gameState, ref;
      gameState = this.lessonManager.gameState();
      if (((ref = gameState.getPieceAtSquare(Chess.Square.a4)) != null ? ref.type : void 0) === Chess.Piece.Types.Rook) {
        return new Chess.Move(Chess.Square.a4, Chess.Square.e4);
      } else {
        return this.lessonManager.gameState().aiMove();
      }
    }
  }
  ;
  BlockingCheck.initialize();
  Lesson = BlockingCheck;
  BlockingCheck.RookMove = function () {
    class RookMove extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".RookMove");
      }
      static requiredPosition() {
        return {
          e4: 'r'
        };
      }
    }
    ;
    RookMove.initialize();
    return RookMove;
  }.call(this);
  BlockingCheck.BlockAttack = function () {
    class BlockAttack extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".BlockAttack");
      }
      static message() {
        return "除了移动王或吃掉攻击者，还有第三种应对将军的方式。\n\n阻挡将军：把车移到 e2，切断攻击路线。";
      }
      static requiredPosition() {
        return {
          e2: 'R'
        };
      }
      static failedPosition() {
        return {
          e1: null
        };
      }
      static retryMessage() {
        return "移动王也可以，但你有一枚棋子能够通过阻挡来应对。\n\n尝试阻挡攻击：把你的车放到王与敌方车之间的 e4。";
      }
    }
    ;
    BlockAttack.initialize();
    return BlockAttack;
  }.call(this);
  BlockingCheck.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n阻挡是用己方棋子保护王，切断攻击者的路线。\n它只对车、象和后有效，因为它们的攻击沿直线传播。\n马能越过棋子，因此马的将军永远无法被阻挡。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return BlockingCheck;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"checkmate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/checkmate.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Checkmate = function () {
  var Lesson;
  class Checkmate extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Checkmate';
    }
    static displayName() {
      return "Checkmate";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.DeliverCheckmate, this.End];
    }
    static startingPosition() {
      return {
        e1: 'K',
        a1: 'R',
        g8: 'k',
        f7: 'p',
        g7: 'p',
        h7: 'p'
      };
    }
    aiMove() {
      return this.randomAIMoveByPiece(Chess.Piece.Types.Pawn);
    }
  }
  ;
  Checkmate.initialize();
  Lesson = Checkmate;
  Checkmate.DeliverCheckmate = function () {
    class DeliverCheckmate extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".DeliverCheckmate");
      }
      static message() {
        return "黑王被自己的兵围住，面对潜在的将军无处可逃。你的车可以一步结束棋局。\n\n完成将死：让王无法逃脱的将军。";
      }
      static retryMessage() {
        return "黑方为王腾出了空间，因此一步将死的机会已经消失。\n\n回退，然后从 a8 强制将死。";
      }
      completed() {
        return this.gameState().checkmate();
      }
      failed() {
        return this.positionAchieved({
          f7: null
        }) || this.positionAchieved({
          g7: null
        }) || this.positionAchieved({
          h7: null
        });
      }
    }
    ;
    DeliverCheckmate.initialize();
    return DeliverCheckmate;
  }.call(this);
  Checkmate.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！这就是将死。\n\n黑方无处可走、无法阻挡，也无法吃掉攻击者。棋局结束。这就是每一盘国际象棋的目标。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return Checkmate;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stalemate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/stalemate.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Stalemate = function () {
  var Lesson;
  class Stalemate extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Stalemate';
    }
    static displayName() {
      return "Stalemate";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.WalkIntoStalemate, this.End];
    }
    static startingPosition() {
      return {
        f7: 'K',
        h8: 'k',
        g5: 'P'
      };
    }
    aiMove() {
      return this.lessonManager.gameState().aiMove();
    }
  }
  ;
  Stalemate.initialize();
  Lesson = Stalemate;
  Stalemate.WalkIntoStalemate = function () {
    class WalkIntoStalemate extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".WalkIntoStalemate");
      }
      static message() {
        return "单独一枚王无法完成将死，所以让我们把兵升变成后。\n\n向前推进兵。";
      }
      static requiredPosition() {
        return {
          g6: 'P'
        };
      }
      static failedPosition() {
        return {
          g5: 'P',
          f7: null
        };
      }
      static retryMessage() {
        return "这样做也有用，但我们还是推进兵，看看会发生什么。\n\n把兵移到 g6。";
      }
    }
    ;
    WalkIntoStalemate.initialize();
    return WalkIntoStalemate;
  }.call(this);
  Stalemate.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "这是个陷阱！\n\n你的王和兵控制了黑王周围的每个格子，但黑王本身并未被将军。黑方无棋可走，却也没有被击败。\n\n这就是逼和。棋局以和棋结束。";
      }
      markup() {
        return [{
          arrows: [{
            from: Chess.Square.g6,
            to: Chess.Square.h7
          }, {
            from: Chess.Square.g6,
            to: Chess.Square.f7
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.g8
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.g7
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.g6
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.f6
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.e6
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.e7
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.e8
          }, {
            from: Chess.Square.f7,
            to: Chess.Square.f8
          }]
        }];
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return Stalemate;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"castling.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/castling.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Castling = function () {
  var Lesson;
  class Castling extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Castling';
    }
    static displayName() {
      return "Castling";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.CastleKingside, this.End];
    }
    static startingPosition() {
      return {
        e1: 'K',
        h1: 'R',
        e8: 'k',
        f2: 'P',
        g2: 'P',
        h2: 'P'
      };
    }
    static startingGameState() {
      var pieceLetter, pieces, ref, squareName;
      pieces = {};
      ref = this.startingPosition();
      for (squareName in ref) {
        pieceLetter = ref[squareName];
        pieces[squareName.toUpperCase()] = pieceLetter;
      }
      return new Chess.GameState(_.extend(Chess.GameState.getEmptyData(), {
        pieces: pieces,
        castling: {
          whiteShort: true,
          whiteLong: false,
          blackShort: false,
          blackLong: false
        }
      }));
    }
  }
  ;
  Castling.initialize();
  Lesson = Castling;
  Castling.CastleKingside = function () {
    class CastleKingside extends Chess.Lesson.PositionStep {
      static id() {
        return "".concat(Lesson.id(), ".CastleKingside");
      }
      static message() {
        return "位于中央的王很快就会暴露在将军之下。一种特殊走法可以帮助防守：王车易位。在一步棋中，王朝车移动两格，然后车越过王。\n\n进行王车易位：把王移到 g1。";
      }
      static requiredPosition() {
        return {
          g1: 'K'
        };
      }
      static failedPosition() {
        return {
          f1: 'K'
        };
      }
      static retryMessage() {
        return "王车易位必须一次移动两格来发起，逐格移动无法完成。\n\n一步完成易位：把王直接移到 g1。";
      }
      markup() {
        return [{
          arrow: {
            from: Chess.Square.e1,
            to: Chess.Square.g1
          }
        }];
      }
    }
    ;
    CastleKingside.initialize();
    return CastleKingside;
  }.call(this);
  Castling.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n只有王和参与易位的车都从未移动过时，才能王车易位。王也不能正被将军，且不能经过受攻击的格子。\n\n你也可以向另一侧，也就是后翼车的方向易位。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return Castling;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"kingscanttouch.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/kingscanttouch.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KingsCantTouch = function () {
  var Lesson;
  class KingsCantTouch extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KingsCantTouch';
    }
    static displayName() {
      return "Kings can't touch";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.ApproachKing, this.End];
    }
    static startingPosition() {
      return {
        e1: 'K',
        e8: 'k'
      };
    }
    aiMove() {
      var blackKingSquare, gameState, kingDistanceToWhiteFile, kingDistanceToWhiteRank, movesAroundTarget, prioritizeRank, sortedMoves, targetSquare, whiteKingSquare;
      gameState = this.lessonManager.gameState();
      whiteKingSquare = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.White)[0];
      blackKingSquare = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.Black)[0];
      targetSquare = Chess.Square.e7;
      movesAroundTarget = _.filter(gameState.getLegalMoves(), move => {
        var distanceToTargetFile, distanceToTargetRank;
        distanceToTargetFile = Math.abs(move.to.fileIndex - targetSquare.fileIndex);
        distanceToTargetRank = Math.abs(move.to.rankIndex - targetSquare.rankIndex);
        return Math.max(distanceToTargetFile, distanceToTargetRank) === 1;
      });
      kingDistanceToWhiteFile = Math.abs(whiteKingSquare.fileIndex - blackKingSquare.fileIndex);
      kingDistanceToWhiteRank = Math.abs(whiteKingSquare.rankIndex - blackKingSquare.rankIndex);
      prioritizeRank = kingDistanceToWhiteRank >= kingDistanceToWhiteFile;
      sortedMoves = _.sortBy(movesAroundTarget, move => {
        var distanceToWhiteFile, distanceToWhiteRank;
        distanceToWhiteFile = Math.abs(whiteKingSquare.fileIndex - move.to.fileIndex);
        distanceToWhiteRank = Math.abs(whiteKingSquare.rankIndex - move.to.rankIndex);
        if (prioritizeRank) {
          return -distanceToWhiteRank * 10 + distanceToWhiteFile;
        } else {
          return -distanceToWhiteFile * 10 + distanceToWhiteRank;
        }
      });
      return sortedMoves[0];
    }
  }
  ;
  KingsCantTouch.initialize();
  Lesson = KingsCantTouch;
  KingsCantTouch.ApproachKing = function () {
    class ApproachKing extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".ApproachKing");
      }
      static message() {
        return "敌王独自站在棋盘远端。让你的王向前与它对峙。\n\n目标在 e7，就在敌王身旁。";
      }
      completed() {
        return this.gameState().occupiedSquaresOfColor(Chess.Piece.Colors.White)[0].manhattanDistanceTo(Chess.Square.e7) === 1;
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.e7
          }
        }];
      }
    }
    ;
    ApproachKing.initialize();
    return ApproachKing;
  }.call(this);
  KingsCantTouch.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "两王只能相隔一格，不能再靠近。走到 e7 会让你的王被将军，这是不允许的；黑方同样如此。\n\n这种对峙称为对王。在许多残局中，能迫使对方王让路的一方往往能够获胜。";
      }
      markup() {
        return [{
          target: {
            position: Chess.Square.e7
          }
        }];
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KingsCantTouch;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"kingjoinsfight.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/kingjoinsfight.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess,
  PAA,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.KingJoinsFight = function () {
  var Lesson;
  class KingJoinsFight extends Chess.Lesson {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.KingJoinsFight';
    }
    static displayName() {
      return "The king joins the fight";
    }
    static category() {
      return Chess.Lessons.Categories.King;
    }
    static steps() {
      return [this.CapturePawns, this.End];
    }
    static startingPosition() {
      return {
        e1: 'K',
        h8: 'k',
        a5: 'p',
        c3: 'p'
      };
    }
    aiMove() {
      return this.lessonManager.gameState().aiMove(1);
    }
  }
  ;
  KingJoinsFight.initialize();
  Lesson = KingJoinsFight;
  KingJoinsFight.CapturePawns = function () {
    class CapturePawns extends Chess.Lesson.Step {
      static id() {
        return "".concat(Lesson.id(), ".CapturePawns");
      }
      static message() {
        return "棋盘已经空旷下来。剩余棋子很少，王不易遭到将军，此时可以让王参与进攻。\n\n让王穿过棋盘，吃掉黑方的两枚兵。";
      }
      static retryMessage() {
        return "兵从你的王手中逃脱了。\n\n再试一次，并选择一条避开它们攻击格子的路线。";
      }
      retryGameState() {
        return Chess.GameState.fromPosition(this.lesson.constructor.startingPosition());
      }
      completed() {
        return this.gameState().occupiedSquaresOfColor(Chess.Piece.Colors.Black).length === 1;
      }
      failed() {
        var attackedSquares, blackPiece, blackSquare, blackSquares, gameState, i, len, whiteSquare;
        if (!(gameState = this.gameState())) {
          return;
        }
        whiteSquare = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.White)[0];
        blackSquares = gameState.occupiedSquaresOfColor(Chess.Piece.Colors.Black);
        attackedSquares = gameState.getLegalDestinationsFromSquare(whiteSquare);
        for (i = 0, len = blackSquares.length; i < len; i++) {
          blackSquare = blackSquares[i];
          blackPiece = gameState.getPieceAtSquare(blackSquare);
          if (blackPiece.type === Chess.Piece.Types.Pawn) {
            continue;
          }
          if (blackPiece.type === Chess.Piece.Types.King) {
            continue;
          }
          if (indexOf.call(attackedSquares, blackSquare) < 0) {
            // Make sure white can't capture the piece in the next move.
            return true;
          }
        }
        return false;
      }
    }
    ;
    CapturePawns.initialize();
    return CapturePawns;
  }.call(this);
  KingJoinsFight.End = function () {
    class End extends Chess.Lesson.EndStep {
      static id() {
        return "".concat(Lesson.id(), ".End");
      }
      static message() {
        return "做得好！\n\n开局时，你把王藏在兵后；残局时，你让王投入战斗。\n\n知道何时保护王、何时让王出击，是国际象棋策略的重要一环。";
      }
    }
    ;
    End.initialize();
    return End;
  }.call(this);
  return KingJoinsFight;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categories":{"categories.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/categories/categories.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Categories = class Categories {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pawn.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/categories/pawn.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Categories.Pawn = function () {
  class Pawn extends Chess.Lesson.PieceCategory {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Categories.Pawn';
    }
    static displayName() {
      return "Pawn";
    }
    static pieceType() {
      return Chess.Piece.Types.Pawn;
    }
  }
  ;
  Pawn.initialize();
  return Pawn;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"knight.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/categories/knight.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Categories.Knight = function () {
  class Knight extends Chess.Lesson.PieceCategory {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Categories.Knight';
    }
    static displayName() {
      return "Knight";
    }
    static pieceType() {
      return Chess.Piece.Types.Knight;
    }
  }
  ;
  Knight.initialize();
  return Knight;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bishop.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/categories/bishop.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Categories.Bishop = function () {
  class Bishop extends Chess.Lesson.PieceCategory {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Categories.Bishop';
    }
    static displayName() {
      return "Bishop";
    }
    static pieceType() {
      return Chess.Piece.Types.Bishop;
    }
  }
  ;
  Bishop.initialize();
  return Bishop;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rook.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/categories/rook.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Categories.Rook = function () {
  class Rook extends Chess.Lesson.PieceCategory {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Categories.Rook';
    }
    static displayName() {
      return "Rook";
    }
    static pieceType() {
      return Chess.Piece.Types.Rook;
    }
  }
  ;
  Rook.initialize();
  return Rook;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"queen.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/categories/queen.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Categories.Queen = function () {
  class Queen extends Chess.Lesson.PieceCategory {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Categories.Queen';
    }
    static displayName() {
      return "Queen";
    }
    static pieceType() {
      return Chess.Piece.Types.Queen;
    }
  }
  ;
  Queen.initialize();
  return Queen;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"king.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/lessons/categories/king.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Lessons.Categories.King = function () {
  class King extends Chess.Lesson.PieceCategory {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Lessons.Categories.King';
    }
    static displayName() {
      return "King";
    }
    static pieceType() {
      return Chess.Piece.Types.King;
    }
  }
  ;
  King.initialize();
  return King;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"rewards":{"rewards.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/rewards/rewards.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Rewards = class Rewards {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lessoncompleted.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/rewards/lessoncompleted.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Rewards.LessonCompleted = function () {
  class LessonCompleted extends Chess.Reward {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Rewards.LessonCompleted';
    }
    static displayName() {
      return "Lesson completed";
    }
    static value() {
      return 2;
    }
    onLessonCompleted(completedCount) {
      if (completedCount === 1) {
        return this.reward();
      }
    }
  }
  ;
  LessonCompleted.initialize();
  return LessonCompleted;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lessonrepeated.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-chess/rewards/lessonrepeated.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Chess, PAA;
PAA = PixelArtAcademy;
Chess = PAA.Pixeltosh.Programs.Chess;
Chess.Rewards.LessonRepeated = function () {
  class LessonRepeated extends Chess.Reward {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Chess.Rewards.LessonRepeated';
    }
    static displayName() {
      return "Lesson repeated";
    }
    static value() {
      return 1;
    }
    onLessonCompleted(completedCount) {
      if (completedCount === 2) {
        return this.reward();
      }
    }
  }
  ;
  LessonRepeated.initialize();
  return LessonRepeated;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node_modules":{"js-chess-engine":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/package.json            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "js-chess-engine",
  "version": "2.4.6",
  "main": "dist/index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dist":{"index.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/index.js           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * js-chess-engine v2
 *
 * Public API for chess game management
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
exports.moves = moves;
exports.status = status;
exports.getFen = getFen;
exports.move = move;
exports.aiMove = aiMove;
exports.ai = ai;
const Board_1 = require("./core/Board");
const MoveGenerator_1 = require("./core/MoveGenerator");
const AttackDetector_1 = require("./core/AttackDetector");
const fen_1 = require("./utils/fen");
const conversion_1 = require("./utils/conversion");
const TranspositionTable_1 = require("./ai/TranspositionTable");
const APIAdapter_1 = require("./adapters/APIAdapter");
const AIEngine_1 = require("./ai/AIEngine");
// Export types for TypeScript users
__exportStar(require("./types"), exports);
/**
 * Main Game class - manages chess game state and moves
 */
class Game {
    board;
    history = [];
    aiEngine;
    /**
     * Create a new game
     *
     * @param configuration - Optional board configuration (JSON object, FEN string, or undefined for new game)
     */
    constructor(configuration) {
        this.aiEngine = new AIEngine_1.AIEngine();
        if (!configuration) {
            // New game with standard starting position
            this.board = (0, Board_1.createStartingBoard)();
        }
        else if (typeof configuration === 'string') {
            // FEN string
            (0, fen_1.validateFEN)(configuration);
            this.board = (0, fen_1.parseFEN)(configuration);
        }
        else {
            // BoardConfig object
            this.board = (0, APIAdapter_1.configToBoard)(configuration);
        }
    }
    /**
     * Make a move
     *
     * @param from - From square (case-insensitive, e.g., 'E2' or 'e2')
     * @param to - To square (case-insensitive, e.g., 'E4' or 'e4')
     * @returns Board configuration after the move
     */
    move(from, to) {
        const fromNorm = (0, APIAdapter_1.normalizeSquare)(from);
        const toNorm = (0, APIAdapter_1.normalizeSquare)(to);
        const fromIndex = (0, conversion_1.squareToIndex)(fromNorm);
        const toIndex = (0, conversion_1.squareToIndex)(toNorm);
        // Find the matching legal move
        const legalMoves = (0, MoveGenerator_1.generateLegalMoves)(this.board);
        const move = legalMoves.find(m => m.from === fromIndex && m.to === toIndex);
        if (!move) {
            throw new Error(`Invalid move from ${fromNorm} to ${toNorm}`);
        }
        // Record move in history
        const historyEntry = { [fromNorm]: toNorm };
        this.history.push(historyEntry);
        // Apply the move
        (0, MoveGenerator_1.applyMoveComplete)(this.board, move);
        return (0, APIAdapter_1.boardToConfig)(this.board);
    }
    /**
     * Get all legal moves, optionally filtered by from-square
     *
     * @param from - Optional from square to filter moves
     * @returns Map of from-squares to array of to-squares
     */
    moves(from) {
        if (from) {
            const fromNorm = (0, APIAdapter_1.normalizeSquare)(from);
            const fromIndex = (0, conversion_1.squareToIndex)(fromNorm);
            const pieceMoves = (0, MoveGenerator_1.getMovesForPiece)(this.board, fromIndex);
            const toSquares = (0, APIAdapter_1.movesFromSquare)(pieceMoves, fromIndex);
            return { [fromNorm]: toSquares };
        }
        else {
            const allMoves = (0, MoveGenerator_1.generateLegalMoves)(this.board);
            return (0, APIAdapter_1.movesToMap)(allMoves);
        }
    }
    /**
     * Set a piece on a square
     *
     * @param square - Square to place piece (case-insensitive)
     * @param piece - Piece symbol (K, Q, R, B, N, P, k, q, r, b, n, p)
     */
    setPiece(square, piece) {
        const squareNorm = (0, APIAdapter_1.normalizeSquare)(square);
        const squareIndex = (0, conversion_1.squareToIndex)(squareNorm);
        const pieceEnum = (0, APIAdapter_1.symbolToPiece)(piece);
        (0, Board_1.setPiece)(this.board, squareIndex, pieceEnum);
    }
    /**
     * Remove a piece from a square
     *
     * @param square - Square to remove piece from (case-insensitive)
     */
    removePiece(square) {
        const squareNorm = (0, APIAdapter_1.normalizeSquare)(square);
        const squareIndex = (0, conversion_1.squareToIndex)(squareNorm);
        (0, Board_1.removePiece)(this.board, squareIndex);
    }
    /**
     * Get move history
     *
     * @returns Array of history entries with board state after each move
     */
    getHistory() {
        const result = [];
        // Replay all moves from the beginning
        const startingBoard = typeof this.board === 'string'
            ? (0, fen_1.parseFEN)(this.board)
            : (0, Board_1.createStartingBoard)();
        const tempBoard = (0, Board_1.copyBoard)(startingBoard);
        for (const move of this.history) {
            const [from, to] = Object.entries(move)[0];
            const fromIndex = (0, conversion_1.squareToIndex)(from);
            const toIndex = (0, conversion_1.squareToIndex)(to);
            const legalMoves = (0, MoveGenerator_1.generateLegalMoves)(tempBoard);
            const matchingMove = legalMoves.find(m => m.from === fromIndex && m.to === toIndex);
            if (matchingMove) {
                (0, MoveGenerator_1.applyMoveComplete)(tempBoard, matchingMove);
                const config = (0, APIAdapter_1.boardToConfig)(tempBoard);
                result.push({ ...config, move });
            }
        }
        return result;
    }
    /**
     * Export current board state as JSON configuration
     *
     * @returns Board configuration object
     */
    exportJson() {
        const cfg = (0, APIAdapter_1.boardToConfig)(this.board);
        this.updateConfigStatusFromBoard(this.board, cfg);
        return cfg;
    }
    /**
     * Export current board state as FEN string
     *
     * @returns FEN string
     */
    exportFEN() {
        return (0, fen_1.toFEN)(this.board);
    }
    /**
     * Print board to console (Unicode chess pieces)
     */
    printToConsole() {
        process.stdout.write('\n');
        for (let rank = 7; rank >= 0; rank--) {
            process.stdout.write(`${rank + 1}`);
            for (let file = 0; file < 8; file++) {
                const index = rank * 8 + file;
                const piece = this.board.mailbox[index];
                const isWhiteSquare = (rank + file) % 2 === 0;
                const symbol = pieceToUnicode(piece, isWhiteSquare);
                process.stdout.write(symbol);
            }
            process.stdout.write('\n');
        }
        process.stdout.write(' ABCDEFGH\n');
    }
    /**
     * Make an AI move (v1 compatible - returns only the move)
     *
     * @deprecated Use `ai()` instead. This method will be removed in v3.0.0.
     * @param level - AI level (1-5, default 3)
     * @returns The played move object (e.g., {"E2": "E4"})
     */
    aiMove(level = 3) {
        // Validate level
        if (level < 1 || level > 5) {
            throw new Error('AI level must be between 1 and 5');
        }
        // Use recommended TT size for the level (browser-safe defaults)
        const ttSizeMB = (0, TranspositionTable_1.getRecommendedTTSize)(level);
        // Find best move
        const bestMove = this.aiEngine.findBestMove(this.board, level, ttSizeMB);
        if (!bestMove) {
            // No legal moves available - game must be finished (checkmate or stalemate)
            throw new Error('Game is already finished');
        }
        // Record move in history
        const fromSquare = (0, conversion_1.indexToSquare)(bestMove.from);
        const toSquare = (0, conversion_1.indexToSquare)(bestMove.to);
        const historyEntry = { [fromSquare]: toSquare };
        this.history.push(historyEntry);
        // Apply the move
        (0, MoveGenerator_1.applyMoveComplete)(this.board, bestMove);
        return historyEntry;
    }
    /**
     * Make an AI move and return both move and board state
     *
     * @param options - Optional configuration object
     * @param options.level - AI difficulty level (1-5, default: 3). Values > 5 are clamped to 5.
     * @param options.play - Whether to apply the move to the game (default: true). If false, only returns the move without modifying game state.
     * @param options.ttSizeMB - Transposition table size in MB (0 to disable, min 0.25 MB). Default: auto-scaled by level (e.g., level 3: 2 MB Node.js, 1 MB browser)
     * @param options.randomness - Centipawn threshold for move variety. The engine picks randomly
     *   among all moves scoring within this many centipawns of the best move.
     *   Makes the engine less predictable without playing blunders.
     *   Default: 0 (fully deterministic). Set to a positive value for variety.
     *
     *   Reference values:
     *     0   – fully deterministic (default; same position always plays the same move)
     *     10  – very subtle (only nearly-identical moves ever swap)
     *     30  – slight variety (moves within ~½ pawn of best may vary)
     *     80  – noticeable (moves within ~1½ pawns of best may vary; fun casual play)
     *     200 – chaotic (may play obviously weaker moves; not recommended)
     * @returns Object containing the move and board configuration (current state if play=false, updated state if play=true)
     */
    ai(options = {}) {
        const requestedLevel = options.level ?? 3;
        const level = Math.max(1, Math.min(5, requestedLevel));
        const play = options.play ?? true;
        const analysis = options.analysis ?? false;
        // Allow 0 to disable TT, or >= 0.25 MB
        // Default: auto-scaled by AI level (lower levels use less memory, higher levels use more)
        const defaultSize = (0, TranspositionTable_1.getRecommendedTTSize)(level);
        const ttSizeMB = options.ttSizeMB === 0 ? 0 : Math.max(0.25, options.ttSizeMB ?? defaultSize);
        // Validate level (requested value)
        if (requestedLevel < 1 || requestedLevel > 5) {
            throw new Error('AI level must be between 1 and 5');
        }
        // Validate depth overrides
        if (options.depth) {
            const d = options.depth;
            if (d.base !== undefined && (!Number.isInteger(d.base) || d.base < 1)) {
                throw new Error('depth.base must be an integer > 0');
            }
            if (d.extended !== undefined && (!Number.isInteger(d.extended) || d.extended < 0 || d.extended > 3)) {
                throw new Error('depth.extended must be an integer between 0 and 3');
            }
            if (d.quiescence !== undefined && (!Number.isInteger(d.quiescence) || d.quiescence < 0)) {
                throw new Error('depth.quiescence must be an integer >= 0');
            }
            if (d.check !== undefined && typeof d.check !== 'boolean') {
                throw new Error('depth.check must be a boolean');
            }
        }
        // Validate randomness
        if (options.randomness !== undefined) {
            if (typeof options.randomness !== 'number' || !isFinite(options.randomness) || options.randomness < 0) {
                throw new Error('randomness must be a non-negative number');
            }
        }
        // Find best move (optionally with analysis)
        const searchResult = analysis
            ? this.aiEngine.findBestMoveDetailed(this.board, { level: level, ttSizeMB, depth: options.depth, analysis: true, randomness: options.randomness })
            : null;
        const bestMove = searchResult ? searchResult.move : this.aiEngine.findBestMove(this.board, level, ttSizeMB, options.depth, options.randomness);
        if (!bestMove) {
            // No legal moves available - game must be finished (checkmate or stalemate)
            throw new Error('Game is already finished');
        }
        // Create move entry
        const fromSquare = (0, conversion_1.indexToSquare)(bestMove.from);
        const toSquare = (0, conversion_1.indexToSquare)(bestMove.to);
        const historyEntry = { [fromSquare]: toSquare };
        const analysisFields = (analysis && searchResult?.scoredMoves)
            ? {
                analysis: searchResult.scoredMoves.map(({ move, score }) => {
                    const from = (0, conversion_1.indexToSquare)(move.from);
                    const to = (0, conversion_1.indexToSquare)(move.to);
                    const historyMove = { [from]: to };
                    return { move: historyMove, score };
                }),
                depth: searchResult.depth,
                nodesSearched: searchResult.nodesSearched,
                bestScore: searchResult.score,
            }
            : undefined;
        if (!play) {
            // Return move without applying it, with current board state.
            // Still return a consistent status snapshot.
            const cfg = (0, APIAdapter_1.boardToConfig)(this.board);
            this.updateConfigStatusFromBoard(this.board, cfg);
            return { move: historyEntry, board: cfg, ...(analysisFields ?? {}) };
        }
        // Record move in history and apply it
        this.history.push(historyEntry);
        (0, MoveGenerator_1.applyMoveComplete)(this.board, bestMove);
        const cfg = (0, APIAdapter_1.boardToConfig)(this.board);
        this.updateConfigStatusFromBoard(this.board, cfg);
        return {
            move: historyEntry,
            board: cfg,
            ...(analysisFields ?? {}),
        };
    }
    updateConfigStatusFromBoard(board, cfg) {
        // The internal engine doesn't always keep the public BoardConfig status fields
        // (check/checkMate/staleMate/isFinished) in sync after applying a move.
        // These flags are part of the public API and are used heavily in tests.
        const inCheck = (0, AttackDetector_1.isKingInCheck)(board);
        const moves = (0, MoveGenerator_1.generateLegalMoves)(board);
        const isMate = inCheck && moves.length === 0;
        const isStalemate = !inCheck && moves.length === 0;
        cfg.check = inCheck;
        cfg.checkMate = isMate;
        cfg.staleMate = isStalemate;
        cfg.isFinished = isMate || isStalemate;
    }
}
exports.Game = Game;
/**
 * Helper function to convert piece enum to Unicode symbol for printing
 */
function pieceToUnicode(piece, isWhiteSquare) {
    const symbols = {
        0: isWhiteSquare ? '\u2588' : '\u2591', // EMPTY - filled/light block
        1: '\u2659', // WHITE_PAWN ♙
        2: '\u2658', // WHITE_KNIGHT ♘
        3: '\u2657', // WHITE_BISHOP ♗
        4: '\u2656', // WHITE_ROOK ♖
        5: '\u2655', // WHITE_QUEEN ♕
        6: '\u2654', // WHITE_KING ♔
        7: '\u265F', // BLACK_PAWN ♟
        8: '\u265E', // BLACK_KNIGHT ♞
        9: '\u265D', // BLACK_BISHOP ♝
        10: '\u265C', // BLACK_ROOK ♜
        11: '\u265B', // BLACK_QUEEN ♛
        12: '\u265A', // BLACK_KING ♚
    };
    return symbols[piece] || (isWhiteSquare ? '\u2588' : '\u2591');
}
// ==================== Stateless Functions ====================
/**
 * Get all legal moves for a position
 *
 * @param config - Board configuration or FEN string
 * @returns Map of from-squares to array of to-squares
 */
function moves(config) {
    const game = new Game(config);
    return game.moves();
}
/**
 * Get board status
 *
 * @param config - Board configuration or FEN string
 * @returns Board configuration with current status
 */
function status(config) {
    const game = new Game(config);
    return game.exportJson();
}
/**
 * Get FEN string for a position
 *
 * @param config - Board configuration or FEN string
 * @returns FEN string
 */
function getFen(config) {
    const game = new Game(config);
    return game.exportFEN();
}
/**
 * Make a move on a board
 *
 * @param config - Board configuration or FEN string
 * @param from - From square
 * @param to - To square
 * @returns Board configuration after the move
 */
function move(config, from, to) {
    const game = new Game(config);
    return game.move(from, to);
}
/**
 * Make an AI move (v1 compatible - returns only the move)
 *
 * @deprecated Use `ai()` instead. This function will be removed in v3.0.0.
 * @param config - Board configuration or FEN string
 * @param level - AI level (1-5, default 3)
 * @returns The played move object (e.g., {"E2": "E4"})
 */
function aiMove(config, level = 3) {
    const game = new Game(config);
    return game.aiMove(level);
}
/**
 * Make an AI move and return both move and board state
 *
 * @param config - Board configuration or FEN string
 * @param options - Optional configuration object
 * @param options.level - AI difficulty level (1-5, default: 3)
 * @param options.play - Whether to apply the move to the game (default: true). If false, only returns the move without modifying game state.
 * @param options.ttSizeMB - Transposition table size in MB (0 to disable, min 0.25 MB). Default: auto-scaled by level (e.g., level 3: 2 MB Node.js, 1 MB browser)
 * @returns Object containing the move and board configuration (current state if play=false, updated state if play=true)
 */
function ai(config, options = {}) {
    const game = new Game(config);
    return game.ai(options);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core":{"Board.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/core/Board.js      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Internal board representation using hybrid bitboards + mailbox
 *
 * This module provides the core board state with:
 * - Bitboards for fast attack detection and piece locations
 * - Mailbox (Int8Array) for O(1) piece lookup by square
 * - Zobrist hashing for transposition table
 * - Efficient copying and comparison
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmptyBoard = createEmptyBoard;
exports.createStartingBoard = createStartingBoard;
exports.setPiece = setPiece;
exports.removePiece = removePiece;
exports.getPiece = getPiece;
exports.getBitboard = getBitboard;
exports.copyBoard = copyBoard;
exports.isPieceColor = isPieceColor;
exports.getPieceColor = getPieceColor;
exports.oppositeColor = oppositeColor;
exports.isSquareEmpty = isSquareEmpty;
exports.isSquareEnemy = isSquareEnemy;
exports.isSquareFriendly = isSquareFriendly;
const types_1 = require("../types");
const constants_1 = require("../utils/constants");
/**
 * Create a new empty internal board
 *
 * @returns Empty board with no pieces
 */
function createEmptyBoard() {
    return {
        // Mailbox (64 squares, each can hold a piece enum value)
        mailbox: new Int8Array(constants_1.TOTAL_SQUARES),
        // White piece bitboards
        whitePawns: 0n,
        whiteKnights: 0n,
        whiteBishops: 0n,
        whiteRooks: 0n,
        whiteQueens: 0n,
        whiteKing: 0n,
        // Black piece bitboards
        blackPawns: 0n,
        blackKnights: 0n,
        blackBishops: 0n,
        blackRooks: 0n,
        blackQueens: 0n,
        blackKing: 0n,
        // Composite bitboards
        whitePieces: 0n,
        blackPieces: 0n,
        allPieces: 0n,
        // Game state
        turn: types_1.InternalColor.WHITE,
        castlingRights: {
            whiteShort: true,
            blackShort: true,
            whiteLong: true,
            blackLong: true,
        },
        enPassantSquare: null,
        halfMoveClock: 0,
        fullMoveNumber: 1,
        // Zobrist hash (will be computed)
        zobristHash: 0n,
        // Game status
        isCheck: false,
        isCheckmate: false,
        isStalemate: false,
    };
}
/**
 * Create a new board for the starting position
 *
 * @returns Board set up for standard chess starting position
 */
function createStartingBoard() {
    const board = createEmptyBoard();
    // White pawns (rank 2, indices 8-15)
    for (let i = 8; i < 16; i++) {
        setPiece(board, i, types_1.Piece.WHITE_PAWN);
    }
    // Black pawns (rank 7, indices 48-55)
    for (let i = 48; i < 56; i++) {
        setPiece(board, i, types_1.Piece.BLACK_PAWN);
    }
    // White pieces (rank 1, indices 0-7)
    setPiece(board, 0, types_1.Piece.WHITE_ROOK); // A1
    setPiece(board, 1, types_1.Piece.WHITE_KNIGHT); // B1
    setPiece(board, 2, types_1.Piece.WHITE_BISHOP); // C1
    setPiece(board, 3, types_1.Piece.WHITE_QUEEN); // D1
    setPiece(board, 4, types_1.Piece.WHITE_KING); // E1
    setPiece(board, 5, types_1.Piece.WHITE_BISHOP); // F1
    setPiece(board, 6, types_1.Piece.WHITE_KNIGHT); // G1
    setPiece(board, 7, types_1.Piece.WHITE_ROOK); // H1
    // Black pieces (rank 8, indices 56-63)
    setPiece(board, 56, types_1.Piece.BLACK_ROOK); // A8
    setPiece(board, 57, types_1.Piece.BLACK_KNIGHT); // B8
    setPiece(board, 58, types_1.Piece.BLACK_BISHOP); // C8
    setPiece(board, 59, types_1.Piece.BLACK_QUEEN); // D8
    setPiece(board, 60, types_1.Piece.BLACK_KING); // E8
    setPiece(board, 61, types_1.Piece.BLACK_BISHOP); // F8
    setPiece(board, 62, types_1.Piece.BLACK_KNIGHT); // G8
    setPiece(board, 63, types_1.Piece.BLACK_ROOK); // H8
    // Enable castling rights for starting position
    board.castlingRights = {
        whiteShort: true,
        whiteLong: true,
        blackShort: true,
        blackLong: true,
    };
    return board;
}
/**
 * Set a piece on the board
 *
 * @param board - Board to modify
 * @param index - Square index (0-63)
 * @param piece - Piece to place
 */
function setPiece(board, index, piece) {
    // Remove any existing piece at this square first
    const existingPiece = board.mailbox[index];
    if (existingPiece !== types_1.Piece.EMPTY) {
        removePiece(board, index);
    }
    // Set piece in mailbox
    board.mailbox[index] = piece;
    if (piece === types_1.Piece.EMPTY) {
        return;
    }
    // Set bit in appropriate bitboard
    const bitboard = 1n << BigInt(index);
    switch (piece) {
        case types_1.Piece.WHITE_PAWN:
            board.whitePawns |= bitboard;
            board.whitePieces |= bitboard;
            break;
        case types_1.Piece.WHITE_KNIGHT:
            board.whiteKnights |= bitboard;
            board.whitePieces |= bitboard;
            break;
        case types_1.Piece.WHITE_BISHOP:
            board.whiteBishops |= bitboard;
            board.whitePieces |= bitboard;
            break;
        case types_1.Piece.WHITE_ROOK:
            board.whiteRooks |= bitboard;
            board.whitePieces |= bitboard;
            break;
        case types_1.Piece.WHITE_QUEEN:
            board.whiteQueens |= bitboard;
            board.whitePieces |= bitboard;
            break;
        case types_1.Piece.WHITE_KING:
            board.whiteKing |= bitboard;
            board.whitePieces |= bitboard;
            break;
        case types_1.Piece.BLACK_PAWN:
            board.blackPawns |= bitboard;
            board.blackPieces |= bitboard;
            break;
        case types_1.Piece.BLACK_KNIGHT:
            board.blackKnights |= bitboard;
            board.blackPieces |= bitboard;
            break;
        case types_1.Piece.BLACK_BISHOP:
            board.blackBishops |= bitboard;
            board.blackPieces |= bitboard;
            break;
        case types_1.Piece.BLACK_ROOK:
            board.blackRooks |= bitboard;
            board.blackPieces |= bitboard;
            break;
        case types_1.Piece.BLACK_QUEEN:
            board.blackQueens |= bitboard;
            board.blackPieces |= bitboard;
            break;
        case types_1.Piece.BLACK_KING:
            board.blackKing |= bitboard;
            board.blackPieces |= bitboard;
            break;
    }
    // Update composite bitboards
    board.allPieces = board.whitePieces | board.blackPieces;
}
/**
 * Remove a piece from the board
 *
 * @param board - Board to modify
 * @param index - Square index (0-63)
 */
function removePiece(board, index) {
    const piece = board.mailbox[index];
    if (piece === types_1.Piece.EMPTY) {
        return;
    }
    // Clear piece in mailbox
    board.mailbox[index] = types_1.Piece.EMPTY;
    // Clear bit in appropriate bitboard
    const bitboard = ~(1n << BigInt(index));
    switch (piece) {
        case types_1.Piece.WHITE_PAWN:
            board.whitePawns &= bitboard;
            board.whitePieces &= bitboard;
            break;
        case types_1.Piece.WHITE_KNIGHT:
            board.whiteKnights &= bitboard;
            board.whitePieces &= bitboard;
            break;
        case types_1.Piece.WHITE_BISHOP:
            board.whiteBishops &= bitboard;
            board.whitePieces &= bitboard;
            break;
        case types_1.Piece.WHITE_ROOK:
            board.whiteRooks &= bitboard;
            board.whitePieces &= bitboard;
            break;
        case types_1.Piece.WHITE_QUEEN:
            board.whiteQueens &= bitboard;
            board.whitePieces &= bitboard;
            break;
        case types_1.Piece.WHITE_KING:
            board.whiteKing &= bitboard;
            board.whitePieces &= bitboard;
            break;
        case types_1.Piece.BLACK_PAWN:
            board.blackPawns &= bitboard;
            board.blackPieces &= bitboard;
            break;
        case types_1.Piece.BLACK_KNIGHT:
            board.blackKnights &= bitboard;
            board.blackPieces &= bitboard;
            break;
        case types_1.Piece.BLACK_BISHOP:
            board.blackBishops &= bitboard;
            board.blackPieces &= bitboard;
            break;
        case types_1.Piece.BLACK_ROOK:
            board.blackRooks &= bitboard;
            board.blackPieces &= bitboard;
            break;
        case types_1.Piece.BLACK_QUEEN:
            board.blackQueens &= bitboard;
            board.blackPieces &= bitboard;
            break;
        case types_1.Piece.BLACK_KING:
            board.blackKing &= bitboard;
            board.blackPieces &= bitboard;
            break;
    }
    // Update composite bitboards
    board.allPieces = board.whitePieces | board.blackPieces;
}
/**
 * Get the piece at a square
 *
 * @param board - Board to query
 * @param index - Square index (0-63)
 * @returns Piece at the square
 */
function getPiece(board, index) {
    return board.mailbox[index];
}
/**
 * Get the bitboard for a specific piece type
 *
 * @param board - Board to query
 * @param piece - Piece type
 * @returns Bitboard with all pieces of this type
 */
function getBitboard(board, piece) {
    switch (piece) {
        case types_1.Piece.WHITE_PAWN: return board.whitePawns;
        case types_1.Piece.WHITE_KNIGHT: return board.whiteKnights;
        case types_1.Piece.WHITE_BISHOP: return board.whiteBishops;
        case types_1.Piece.WHITE_ROOK: return board.whiteRooks;
        case types_1.Piece.WHITE_QUEEN: return board.whiteQueens;
        case types_1.Piece.WHITE_KING: return board.whiteKing;
        case types_1.Piece.BLACK_PAWN: return board.blackPawns;
        case types_1.Piece.BLACK_KNIGHT: return board.blackKnights;
        case types_1.Piece.BLACK_BISHOP: return board.blackBishops;
        case types_1.Piece.BLACK_ROOK: return board.blackRooks;
        case types_1.Piece.BLACK_QUEEN: return board.blackQueens;
        case types_1.Piece.BLACK_KING: return board.blackKing;
        default: return 0n;
    }
}
/**
 * Copy a board (efficient struct copy)
 *
 * @param source - Source board
 * @returns New board with same state
 */
function copyBoard(source) {
    return {
        // Copy mailbox
        mailbox: new Int8Array(source.mailbox),
        // Copy bitboards (primitives, so direct copy)
        whitePawns: source.whitePawns,
        whiteKnights: source.whiteKnights,
        whiteBishops: source.whiteBishops,
        whiteRooks: source.whiteRooks,
        whiteQueens: source.whiteQueens,
        whiteKing: source.whiteKing,
        blackPawns: source.blackPawns,
        blackKnights: source.blackKnights,
        blackBishops: source.blackBishops,
        blackRooks: source.blackRooks,
        blackQueens: source.blackQueens,
        blackKing: source.blackKing,
        whitePieces: source.whitePieces,
        blackPieces: source.blackPieces,
        allPieces: source.allPieces,
        // Copy game state
        turn: source.turn,
        castlingRights: { ...source.castlingRights },
        enPassantSquare: source.enPassantSquare,
        halfMoveClock: source.halfMoveClock,
        fullMoveNumber: source.fullMoveNumber,
        zobristHash: source.zobristHash,
        isCheck: source.isCheck,
        isCheckmate: source.isCheckmate,
        isStalemate: source.isStalemate,
    };
}
/**
 * Check if a piece belongs to a specific color
 *
 * @param piece - Piece to check
 * @param color - Color to check
 * @returns true if piece is of the given color
 */
function isPieceColor(piece, color) {
    if (piece === types_1.Piece.EMPTY) {
        return false;
    }
    if (color === types_1.InternalColor.WHITE) {
        return piece >= types_1.Piece.WHITE_PAWN && piece <= types_1.Piece.WHITE_KING;
    }
    else {
        return piece >= types_1.Piece.BLACK_PAWN && piece <= types_1.Piece.BLACK_KING;
    }
}
/**
 * Get the color of a piece
 *
 * @param piece - Piece to check
 * @returns Color of the piece, or null if empty
 */
function getPieceColor(piece) {
    if (piece === types_1.Piece.EMPTY) {
        return null;
    }
    return piece >= types_1.Piece.WHITE_PAWN && piece <= types_1.Piece.WHITE_KING
        ? types_1.InternalColor.WHITE
        : types_1.InternalColor.BLACK;
}
/**
 * Get the opposite color
 *
 * @param color - Color
 * @returns Opposite color
 */
function oppositeColor(color) {
    return color === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
}
/**
 * Check if a square is empty
 *
 * @param board - Board to check
 * @param index - Square index
 * @returns true if square is empty
 */
function isSquareEmpty(board, index) {
    return board.mailbox[index] === types_1.Piece.EMPTY;
}
/**
 * Check if a square is occupied by an enemy piece
 *
 * @param board - Board to check
 * @param index - Square index
 * @param color - Our color
 * @returns true if square has enemy piece
 */
function isSquareEnemy(board, index, color) {
    const piece = board.mailbox[index];
    if (piece === types_1.Piece.EMPTY) {
        return false;
    }
    const pieceColor = getPieceColor(piece);
    return pieceColor !== null && pieceColor !== color;
}
/**
 * Check if a square is occupied by a friendly piece
 *
 * @param board - Board to check
 * @param index - Square index
 * @param color - Our color
 * @returns true if square has friendly piece
 */
function isSquareFriendly(board, index, color) {
    const piece = board.mailbox[index];
    if (piece === types_1.Piece.EMPTY) {
        return false;
    }
    return isPieceColor(piece, color);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MoveGenerator.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/core/MoveGenerator //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Move generation for all piece types
 *
 * This module generates all legal moves for a given position using
 * bitboard-based algorithms for performance.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLegalMoves = generateLegalMoves;
exports.generatePseudoLegalMoves = generatePseudoLegalMoves;
exports.getMovesForPiece = getMovesForPiece;
exports.isMoveLegal = isMoveLegal;
exports.applyMoveComplete = applyMoveComplete;
const types_1 = require("../types");
const Position_1 = require("./Position");
const AttackDetector_1 = require("./AttackDetector");
const conversion_1 = require("../utils/conversion");
const Board_1 = require("./Board");
const constants_1 = require("../utils/constants");
const zobrist_1 = require("./zobrist");
/**
 * Generate all legal moves for the current position
 *
 * @param board - Board state
 * @returns Array of legal moves
 */
function generateLegalMoves(board) {
    const pseudoLegalMoves = generatePseudoLegalMoves(board);
    const currentColor = board.turn;
    // Check if the current player has a king
    const ourKingBitboard = currentColor === types_1.InternalColor.WHITE ? board.whiteKing : board.blackKing;
    if (ourKingBitboard === 0n) {
        // No king - return all pseudo-legal moves (for test scenarios)
        return pseudoLegalMoves;
    }
    // Filter to only legal moves
    return pseudoLegalMoves.filter(move => {
        // Special handling for castling - already checked in generation
        if (move.flags & types_1.MoveFlag.CASTLING) {
            return true;
        }
        // Make the move on a temporary board copy to check if it's legal
        const testBoard = (0, Board_1.copyBoard)(board);
        const originalTurn = testBoard.turn;
        makeMove(testBoard, move);
        // After making the move, check if OUR king (the one that just moved) is in check
        // makeMove switches the turn, so we need to check the OPPOSITE color
        const kingBitboardAfter = originalTurn === types_1.InternalColor.WHITE ? testBoard.whiteKing : testBoard.blackKing;
        if (kingBitboardAfter === 0n) {
            return true; // King was captured (shouldn't happen in legal game)
        }
        const kingSquare = (0, conversion_1.getLowestSetBit)(kingBitboardAfter);
        const opponentColor = originalTurn === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
        // The move is legal if our king is NOT being attacked after the move
        return !(0, AttackDetector_1.isSquareAttacked)(testBoard, kingSquare, opponentColor);
    });
}
/**
 * Apply a move to a board (mutates the board)
 * Used internally for legal move checking
 *
 * @param board - Board to modify
 * @param move - Move to apply
 */
function makeMove(board, move) {
    // Handle castling specially
    if (move.flags & types_1.MoveFlag.CASTLING) {
        // Move the king
        (0, Board_1.removePiece)(board, move.from);
        (0, Board_1.setPiece)(board, move.to, move.piece);
        // Move the rook
        const color = board.turn;
        if (color === types_1.InternalColor.WHITE) {
            if (move.to === constants_1.CASTLING.WHITE_SHORT.kingTo) {
                // White short castling
                (0, Board_1.removePiece)(board, constants_1.CASTLING.WHITE_SHORT.rookFrom);
                (0, Board_1.setPiece)(board, constants_1.CASTLING.WHITE_SHORT.rookTo, types_1.Piece.WHITE_ROOK);
            }
            else {
                // White long castling
                (0, Board_1.removePiece)(board, constants_1.CASTLING.WHITE_LONG.rookFrom);
                (0, Board_1.setPiece)(board, constants_1.CASTLING.WHITE_LONG.rookTo, types_1.Piece.WHITE_ROOK);
            }
        }
        else {
            if (move.to === constants_1.CASTLING.BLACK_SHORT.kingTo) {
                // Black short castling
                (0, Board_1.removePiece)(board, constants_1.CASTLING.BLACK_SHORT.rookFrom);
                (0, Board_1.setPiece)(board, constants_1.CASTLING.BLACK_SHORT.rookTo, types_1.Piece.BLACK_ROOK);
            }
            else {
                // Black long castling
                (0, Board_1.removePiece)(board, constants_1.CASTLING.BLACK_LONG.rookFrom);
                (0, Board_1.setPiece)(board, constants_1.CASTLING.BLACK_LONG.rookTo, types_1.Piece.BLACK_ROOK);
            }
        }
    }
    else if (move.flags & types_1.MoveFlag.EN_PASSANT) {
        // En passant capture
        (0, Board_1.removePiece)(board, move.from);
        (0, Board_1.setPiece)(board, move.to, move.piece);
        // Remove the captured pawn (on different square than move.to)
        const capturedPawnSquare = board.turn === types_1.InternalColor.WHITE
            ? (move.to - 8) // Captured pawn is one rank below
            : (move.to + 8); // Captured pawn is one rank above
        (0, Board_1.removePiece)(board, capturedPawnSquare);
    }
    else if (move.flags & types_1.MoveFlag.PROMOTION) {
        // Promotion
        (0, Board_1.removePiece)(board, move.from);
        if (move.capturedPiece !== types_1.Piece.EMPTY) {
            (0, Board_1.removePiece)(board, move.to);
        }
        (0, Board_1.setPiece)(board, move.to, move.promotionPiece);
    }
    else {
        // Normal move or capture
        (0, Board_1.removePiece)(board, move.from);
        if (move.capturedPiece !== types_1.Piece.EMPTY) {
            (0, Board_1.removePiece)(board, move.to);
        }
        (0, Board_1.setPiece)(board, move.to, move.piece);
    }
    // Update en passant square
    if (move.flags & types_1.MoveFlag.PAWN_DOUBLE_PUSH) {
        const epSquare = board.turn === types_1.InternalColor.WHITE
            ? (move.from + 8)
            : (move.from - 8);
        board.enPassantSquare = epSquare;
    }
    else {
        board.enPassantSquare = null;
    }
    // Switch turn (needed for isKingInCheck to check the right king)
    board.turn = board.turn === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
}
/**
 * Generate all pseudo-legal moves (may leave king in check)
 *
 * @param board - Board state
 * @returns Array of pseudo-legal moves
 */
function generatePseudoLegalMoves(board) {
    const moves = [];
    const color = board.turn;
    const friendlyPieces = color === types_1.InternalColor.WHITE ? board.whitePieces : board.blackPieces;
    const enemyPieces = color === types_1.InternalColor.WHITE ? board.blackPieces : board.whitePieces;
    // Generate moves for each piece type
    generatePawnMoves(board, moves, color, friendlyPieces, enemyPieces);
    generateKnightMoves(board, moves, color, friendlyPieces);
    generateBishopMoves(board, moves, color, friendlyPieces);
    generateRookMoves(board, moves, color, friendlyPieces);
    generateQueenMoves(board, moves, color, friendlyPieces);
    generateKingMoves(board, moves, color, friendlyPieces);
    generateCastlingMoves(board, moves, color);
    return moves;
}
/**
 * Generate pawn moves (including promotions and en passant)
 */
function generatePawnMoves(board, moves, color, _friendlyPieces, enemyPieces) {
    const pawns = color === types_1.InternalColor.WHITE ? board.whitePawns : board.blackPawns;
    const pawnPiece = color === types_1.InternalColor.WHITE ? types_1.Piece.WHITE_PAWN : types_1.Piece.BLACK_PAWN;
    const promotionRank = color === types_1.InternalColor.WHITE ? 7 : 0;
    const empty = ~board.allPieces;
    if (color === types_1.InternalColor.WHITE) {
        // Single push
        let singlePushBB = (0, Position_1.shiftNorth)(pawns) & empty;
        while (singlePushBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(singlePushBB);
            singlePushBB &= singlePushBB - 1n;
            const from = (to - 8);
            const toRank = (0, conversion_1.getRankIndex)(to);
            // Check for promotion
            if (toRank === promotionRank) {
                // Add all promotion moves
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.WHITE_QUEEN));
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.WHITE_ROOK));
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.WHITE_BISHOP));
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.WHITE_KNIGHT));
            }
            else {
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.NONE));
            }
        }
        // Double push
        const doublePushSource = pawns & 0x000000000000ff00n; // Rank 2
        let doublePushBB = (0, Position_1.shiftNorth)((0, Position_1.shiftNorth)(doublePushSource) & empty) & empty;
        while (doublePushBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(doublePushBB);
            doublePushBB &= doublePushBB - 1n;
            const from = (to - 16);
            moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PAWN_DOUBLE_PUSH));
        }
        // Captures north-east
        let capturesNEBB = (0, Position_1.shiftNorthEast)(pawns) & enemyPieces;
        while (capturesNEBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(capturesNEBB);
            capturesNEBB &= capturesNEBB - 1n;
            const from = (to - 9);
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const toRank = (0, conversion_1.getRankIndex)(to);
            if (toRank === promotionRank) {
                // Promotion capture
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_QUEEN));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_ROOK));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_BISHOP));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_KNIGHT));
            }
            else {
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.CAPTURE));
            }
        }
        // Captures north-west
        let capturesNWBB = (0, Position_1.shiftNorthWest)(pawns) & enemyPieces;
        while (capturesNWBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(capturesNWBB);
            capturesNWBB &= capturesNWBB - 1n;
            const from = (to - 7);
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const toRank = (0, conversion_1.getRankIndex)(to);
            if (toRank === promotionRank) {
                // Promotion capture
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_QUEEN));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_ROOK));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_BISHOP));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.WHITE_KNIGHT));
            }
            else {
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.CAPTURE));
            }
        }
        // En passant
        if (board.enPassantSquare !== null) {
            const epSquare = board.enPassantSquare;
            const epTarget = 1n << BigInt(epSquare);
            // Check if any pawn can capture en passant
            const canCaptureEP = ((0, Position_1.shiftSouthWest)(epTarget) | (0, Position_1.shiftSouthEast)(epTarget)) & pawns;
            let epBB = canCaptureEP;
            while (epBB !== 0n) {
                const from = (0, conversion_1.getLowestSetBit)(epBB);
                epBB &= epBB - 1n;
                const capturedPiece = types_1.Piece.BLACK_PAWN;
                moves.push(createMove(from, epSquare, pawnPiece, capturedPiece, types_1.MoveFlag.EN_PASSANT | types_1.MoveFlag.CAPTURE));
            }
        }
    }
    else {
        // Black pawns (move south)
        // Single push
        let singlePushBB = (0, Position_1.shiftSouth)(pawns) & empty;
        while (singlePushBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(singlePushBB);
            singlePushBB &= singlePushBB - 1n;
            const from = (to + 8);
            const toRank = (0, conversion_1.getRankIndex)(to);
            // Check for promotion
            if (toRank === promotionRank) {
                // Add all promotion moves
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.BLACK_QUEEN));
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.BLACK_ROOK));
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.BLACK_BISHOP));
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PROMOTION, types_1.Piece.BLACK_KNIGHT));
            }
            else {
                moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.NONE));
            }
        }
        // Double push
        const doublePushSource = pawns & 0x00ff000000000000n; // Rank 7
        let doublePushBB = (0, Position_1.shiftSouth)((0, Position_1.shiftSouth)(doublePushSource) & empty) & empty;
        while (doublePushBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(doublePushBB);
            doublePushBB &= doublePushBB - 1n;
            const from = (to + 16);
            moves.push(createMove(from, to, pawnPiece, types_1.Piece.EMPTY, types_1.MoveFlag.PAWN_DOUBLE_PUSH));
        }
        // Captures south-east
        let capturesSEBB = (0, Position_1.shiftSouthEast)(pawns) & enemyPieces;
        while (capturesSEBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(capturesSEBB);
            capturesSEBB &= capturesSEBB - 1n;
            const from = (to + 7);
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const toRank = (0, conversion_1.getRankIndex)(to);
            if (toRank === promotionRank) {
                // Promotion capture
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_QUEEN));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_ROOK));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_BISHOP));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_KNIGHT));
            }
            else {
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.CAPTURE));
            }
        }
        // Captures south-west
        let capturesSWBB = (0, Position_1.shiftSouthWest)(pawns) & enemyPieces;
        while (capturesSWBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(capturesSWBB);
            capturesSWBB &= capturesSWBB - 1n;
            const from = (to + 9);
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const toRank = (0, conversion_1.getRankIndex)(to);
            if (toRank === promotionRank) {
                // Promotion capture
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_QUEEN));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_ROOK));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_BISHOP));
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.PROMOTION | types_1.MoveFlag.CAPTURE, types_1.Piece.BLACK_KNIGHT));
            }
            else {
                moves.push(createMove(from, to, pawnPiece, capturedPiece, types_1.MoveFlag.CAPTURE));
            }
        }
        // En passant
        if (board.enPassantSquare !== null) {
            const epSquare = board.enPassantSquare;
            const epTarget = 1n << BigInt(epSquare);
            // Check if any pawn can capture en passant
            const canCaptureEP = ((0, Position_1.shiftNorthWest)(epTarget) | (0, Position_1.shiftNorthEast)(epTarget)) & pawns;
            let epBB = canCaptureEP;
            while (epBB !== 0n) {
                const from = (0, conversion_1.getLowestSetBit)(epBB);
                epBB &= epBB - 1n;
                const capturedPiece = types_1.Piece.WHITE_PAWN;
                moves.push(createMove(from, epSquare, pawnPiece, capturedPiece, types_1.MoveFlag.EN_PASSANT | types_1.MoveFlag.CAPTURE));
            }
        }
    }
}
/**
 * Generate knight moves
 */
function generateKnightMoves(board, moves, color, friendlyPieces) {
    const knights = color === types_1.InternalColor.WHITE ? board.whiteKnights : board.blackKnights;
    const knightPiece = color === types_1.InternalColor.WHITE ? types_1.Piece.WHITE_KNIGHT : types_1.Piece.BLACK_KNIGHT;
    let knightsBB = knights;
    while (knightsBB !== 0n) {
        const from = (0, conversion_1.getLowestSetBit)(knightsBB);
        const attacks = (0, Position_1.getKnightAttacks)(from) & ~friendlyPieces;
        let attacksBB = attacks;
        while (attacksBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(attacksBB);
            attacksBB &= attacksBB - 1n;
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const flags = capturedPiece !== types_1.Piece.EMPTY ? types_1.MoveFlag.CAPTURE : types_1.MoveFlag.NONE;
            moves.push(createMove(from, to, knightPiece, capturedPiece, flags));
        }
        knightsBB &= knightsBB - 1n; // Clear lowest bit
    }
}
/**
 * Generate bishop moves
 */
function generateBishopMoves(board, moves, color, friendlyPieces) {
    const bishops = color === types_1.InternalColor.WHITE ? board.whiteBishops : board.blackBishops;
    const bishopPiece = color === types_1.InternalColor.WHITE ? types_1.Piece.WHITE_BISHOP : types_1.Piece.BLACK_BISHOP;
    let bishopsBB = bishops;
    while (bishopsBB !== 0n) {
        const from = (0, conversion_1.getLowestSetBit)(bishopsBB);
        const attacks = (0, Position_1.getBishopAttacks)(from, board.allPieces) & ~friendlyPieces;
        let attacksBB = attacks;
        while (attacksBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(attacksBB);
            attacksBB &= attacksBB - 1n;
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const flags = capturedPiece !== types_1.Piece.EMPTY ? types_1.MoveFlag.CAPTURE : types_1.MoveFlag.NONE;
            moves.push(createMove(from, to, bishopPiece, capturedPiece, flags));
        }
        bishopsBB &= bishopsBB - 1n;
    }
}
/**
 * Generate rook moves
 */
function generateRookMoves(board, moves, color, friendlyPieces) {
    const rooks = color === types_1.InternalColor.WHITE ? board.whiteRooks : board.blackRooks;
    const rookPiece = color === types_1.InternalColor.WHITE ? types_1.Piece.WHITE_ROOK : types_1.Piece.BLACK_ROOK;
    let rooksBB = rooks;
    while (rooksBB !== 0n) {
        const from = (0, conversion_1.getLowestSetBit)(rooksBB);
        const attacks = (0, Position_1.getRookAttacks)(from, board.allPieces) & ~friendlyPieces;
        let attacksBB = attacks;
        while (attacksBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(attacksBB);
            attacksBB &= attacksBB - 1n;
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const flags = capturedPiece !== types_1.Piece.EMPTY ? types_1.MoveFlag.CAPTURE : types_1.MoveFlag.NONE;
            moves.push(createMove(from, to, rookPiece, capturedPiece, flags));
        }
        rooksBB &= rooksBB - 1n;
    }
}
/**
 * Generate queen moves
 */
function generateQueenMoves(board, moves, color, friendlyPieces) {
    const queens = color === types_1.InternalColor.WHITE ? board.whiteQueens : board.blackQueens;
    const queenPiece = color === types_1.InternalColor.WHITE ? types_1.Piece.WHITE_QUEEN : types_1.Piece.BLACK_QUEEN;
    let queensBB = queens;
    while (queensBB !== 0n) {
        const from = (0, conversion_1.getLowestSetBit)(queensBB);
        const attacks = (0, Position_1.getQueenAttacks)(from, board.allPieces) & ~friendlyPieces;
        let attacksBB = attacks;
        while (attacksBB !== 0n) {
            const to = (0, conversion_1.getLowestSetBit)(attacksBB);
            attacksBB &= attacksBB - 1n;
            const capturedPiece = (0, Board_1.getPiece)(board, to);
            const flags = capturedPiece !== types_1.Piece.EMPTY ? types_1.MoveFlag.CAPTURE : types_1.MoveFlag.NONE;
            moves.push(createMove(from, to, queenPiece, capturedPiece, flags));
        }
        queensBB &= queensBB - 1n;
    }
}
/**
 * Generate king moves (excluding castling)
 */
function generateKingMoves(board, moves, color, friendlyPieces) {
    const king = color === types_1.InternalColor.WHITE ? board.whiteKing : board.blackKing;
    const kingPiece = color === types_1.InternalColor.WHITE ? types_1.Piece.WHITE_KING : types_1.Piece.BLACK_KING;
    if (king === 0n)
        return;
    const from = (0, conversion_1.getLowestSetBit)(king);
    const attacks = (0, Position_1.getKingAttacks)(from) & ~friendlyPieces;
    let attacksBB = attacks;
    while (attacksBB !== 0n) {
        const to = (0, conversion_1.getLowestSetBit)(attacksBB);
        attacksBB &= attacksBB - 1n;
        const capturedPiece = (0, Board_1.getPiece)(board, to);
        const flags = capturedPiece !== types_1.Piece.EMPTY ? types_1.MoveFlag.CAPTURE : types_1.MoveFlag.NONE;
        moves.push(createMove(from, to, kingPiece, capturedPiece, flags));
    }
}
/**
 * Generate castling moves
 */
function generateCastlingMoves(board, moves, color) {
    const opponentColor = color === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
    if (color === types_1.InternalColor.WHITE) {
        // White short castling (O-O)
        if (board.castlingRights.whiteShort &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.WHITE_SHORT.kingFrom) === types_1.Piece.WHITE_KING &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.WHITE_SHORT.rookFrom) === types_1.Piece.WHITE_ROOK &&
            (0, Board_1.isSquareEmpty)(board, 5) && // F1
            (0, Board_1.isSquareEmpty)(board, 6) && // G1
            !(0, AttackDetector_1.isSquareAttacked)(board, 4, opponentColor) && // E1 not in check
            !(0, AttackDetector_1.isSquareAttacked)(board, 5, opponentColor) && // F1 not attacked
            !(0, AttackDetector_1.isSquareAttacked)(board, 6, opponentColor) // G1 not attacked
        ) {
            moves.push(createMove(constants_1.CASTLING.WHITE_SHORT.kingFrom, constants_1.CASTLING.WHITE_SHORT.kingTo, types_1.Piece.WHITE_KING, types_1.Piece.EMPTY, types_1.MoveFlag.CASTLING));
        }
        // White long castling (O-O-O)
        if (board.castlingRights.whiteLong &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.WHITE_LONG.kingFrom) === types_1.Piece.WHITE_KING &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.WHITE_LONG.rookFrom) === types_1.Piece.WHITE_ROOK &&
            (0, Board_1.isSquareEmpty)(board, 1) && // B1
            (0, Board_1.isSquareEmpty)(board, 2) && // C1
            (0, Board_1.isSquareEmpty)(board, 3) && // D1
            !(0, AttackDetector_1.isSquareAttacked)(board, 4, opponentColor) && // E1 not in check
            !(0, AttackDetector_1.isSquareAttacked)(board, 3, opponentColor) && // D1 not attacked
            !(0, AttackDetector_1.isSquareAttacked)(board, 2, opponentColor) // C1 not attacked
        ) {
            moves.push(createMove(constants_1.CASTLING.WHITE_LONG.kingFrom, constants_1.CASTLING.WHITE_LONG.kingTo, types_1.Piece.WHITE_KING, types_1.Piece.EMPTY, types_1.MoveFlag.CASTLING));
        }
    }
    else {
        // Black short castling (O-O)
        if (board.castlingRights.blackShort &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.BLACK_SHORT.kingFrom) === types_1.Piece.BLACK_KING &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.BLACK_SHORT.rookFrom) === types_1.Piece.BLACK_ROOK &&
            (0, Board_1.isSquareEmpty)(board, 61) && // F8
            (0, Board_1.isSquareEmpty)(board, 62) && // G8
            !(0, AttackDetector_1.isSquareAttacked)(board, 60, opponentColor) && // E8 not in check
            !(0, AttackDetector_1.isSquareAttacked)(board, 61, opponentColor) && // F8 not attacked
            !(0, AttackDetector_1.isSquareAttacked)(board, 62, opponentColor) // G8 not attacked
        ) {
            moves.push(createMove(constants_1.CASTLING.BLACK_SHORT.kingFrom, constants_1.CASTLING.BLACK_SHORT.kingTo, types_1.Piece.BLACK_KING, types_1.Piece.EMPTY, types_1.MoveFlag.CASTLING));
        }
        // Black long castling (O-O-O)
        if (board.castlingRights.blackLong &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.BLACK_LONG.kingFrom) === types_1.Piece.BLACK_KING &&
            (0, Board_1.getPiece)(board, constants_1.CASTLING.BLACK_LONG.rookFrom) === types_1.Piece.BLACK_ROOK &&
            (0, Board_1.isSquareEmpty)(board, 57) && // B8
            (0, Board_1.isSquareEmpty)(board, 58) && // C8
            (0, Board_1.isSquareEmpty)(board, 59) && // D8
            !(0, AttackDetector_1.isSquareAttacked)(board, 60, opponentColor) && // E8 not in check
            !(0, AttackDetector_1.isSquareAttacked)(board, 59, opponentColor) && // D8 not attacked
            !(0, AttackDetector_1.isSquareAttacked)(board, 58, opponentColor) // C8 not attacked
        ) {
            moves.push(createMove(constants_1.CASTLING.BLACK_LONG.kingFrom, constants_1.CASTLING.BLACK_LONG.kingTo, types_1.Piece.BLACK_KING, types_1.Piece.EMPTY, types_1.MoveFlag.CASTLING));
        }
    }
}
/**
 * Helper to create a move object
 */
function createMove(from, to, piece, capturedPiece, flags, promotionPiece) {
    return {
        from,
        to,
        piece,
        capturedPiece,
        flags,
        promotionPiece,
    };
}
/**
 * Get all legal moves for a specific piece
 *
 * @param board - Board state
 * @param square - Square of the piece
 * @returns Array of legal moves for that piece
 */
function getMovesForPiece(board, square) {
    const allMoves = generateLegalMoves(board);
    return allMoves.filter(move => move.from === square);
}
/**
 * Check if a move is legal
 *
 * @param board - Board state
 * @param from - From square
 * @param to - To square
 * @returns true if move is legal
 */
function isMoveLegal(board, from, to) {
    const legalMoves = generateLegalMoves(board);
    return legalMoves.some(move => move.from === from && move.to === to);
}
/**
 * Apply a move to the board with full state updates (mutates the board)
 * Updates turn, castling rights, en passant, move counters, and game status
 *
 * @param board - Board state to modify
 * @param move - Move to apply
 * @returns The applied move
 */
function applyMoveComplete(board, move) {
    const { from, to, piece, capturedPiece, flags, promotionPiece } = move;
    // Snapshot state needed for incremental hash updates
    const oldEnPassant = board.enPassantSquare;
    const oldCastling = { ...board.castlingRights };
    // Reset en passant square (will be set if this is a double pawn push)
    board.enPassantSquare = null;
    // Handle captures (+hash)
    if (capturedPiece !== types_1.Piece.EMPTY) {
        // Remove captured piece from board and hash
        (0, Board_1.removePiece)(board, to);
        board.zobristHash = (0, zobrist_1.updateHashCapture)(board.zobristHash, capturedPiece, to);
        board.halfMoveClock = 0;
    }
    else {
        board.halfMoveClock++;
    }
    // Handle en passant capture (+hash)
    if (flags & types_1.MoveFlag.EN_PASSANT) {
        const captureSquare = board.turn === types_1.InternalColor.WHITE ? to - 8 : to + 8;
        const capturedPawn = board.turn === types_1.InternalColor.WHITE ? types_1.Piece.BLACK_PAWN : types_1.Piece.WHITE_PAWN;
        (0, Board_1.removePiece)(board, captureSquare);
        board.zobristHash = (0, zobrist_1.updateHashCapture)(board.zobristHash, capturedPawn, captureSquare);
        board.halfMoveClock = 0;
    }
    // Handle castling rook move (+hash)
    if (flags & types_1.MoveFlag.CASTLING) {
        if (to === constants_1.CASTLING.WHITE_SHORT.kingTo) {
            (0, Board_1.removePiece)(board, constants_1.CASTLING.WHITE_SHORT.rookFrom);
            (0, Board_1.setPiece)(board, constants_1.CASTLING.WHITE_SHORT.rookTo, types_1.Piece.WHITE_ROOK);
            board.zobristHash = (0, zobrist_1.updateHashMove)(board.zobristHash, types_1.Piece.WHITE_ROOK, constants_1.CASTLING.WHITE_SHORT.rookFrom, constants_1.CASTLING.WHITE_SHORT.rookTo);
        }
        else if (to === constants_1.CASTLING.WHITE_LONG.kingTo) {
            (0, Board_1.removePiece)(board, constants_1.CASTLING.WHITE_LONG.rookFrom);
            (0, Board_1.setPiece)(board, constants_1.CASTLING.WHITE_LONG.rookTo, types_1.Piece.WHITE_ROOK);
            board.zobristHash = (0, zobrist_1.updateHashMove)(board.zobristHash, types_1.Piece.WHITE_ROOK, constants_1.CASTLING.WHITE_LONG.rookFrom, constants_1.CASTLING.WHITE_LONG.rookTo);
        }
        else if (to === constants_1.CASTLING.BLACK_SHORT.kingTo) {
            (0, Board_1.removePiece)(board, constants_1.CASTLING.BLACK_SHORT.rookFrom);
            (0, Board_1.setPiece)(board, constants_1.CASTLING.BLACK_SHORT.rookTo, types_1.Piece.BLACK_ROOK);
            board.zobristHash = (0, zobrist_1.updateHashMove)(board.zobristHash, types_1.Piece.BLACK_ROOK, constants_1.CASTLING.BLACK_SHORT.rookFrom, constants_1.CASTLING.BLACK_SHORT.rookTo);
        }
        else if (to === constants_1.CASTLING.BLACK_LONG.kingTo) {
            (0, Board_1.removePiece)(board, constants_1.CASTLING.BLACK_LONG.rookFrom);
            (0, Board_1.setPiece)(board, constants_1.CASTLING.BLACK_LONG.rookTo, types_1.Piece.BLACK_ROOK);
            board.zobristHash = (0, zobrist_1.updateHashMove)(board.zobristHash, types_1.Piece.BLACK_ROOK, constants_1.CASTLING.BLACK_LONG.rookFrom, constants_1.CASTLING.BLACK_LONG.rookTo);
        }
    }
    // Move the piece (+hash)
    (0, Board_1.removePiece)(board, from);
    board.zobristHash = (0, zobrist_1.updateHashMove)(board.zobristHash, piece, from, to);
    // Handle promotion (piece identity at destination changes)
    if (flags & types_1.MoveFlag.PROMOTION && promotionPiece) {
        // updateHashMove added the pawn at `to`, swap it with promotion piece.
        board.zobristHash = (0, zobrist_1.removePieceFromHash)(board.zobristHash, piece, to);
        board.zobristHash = (0, zobrist_1.addPieceToHash)(board.zobristHash, promotionPiece, to);
        (0, Board_1.setPiece)(board, to, promotionPiece);
    }
    else {
        (0, Board_1.setPiece)(board, to, piece);
    }
    // Reset half-move clock on pawn moves
    if (piece === types_1.Piece.WHITE_PAWN || piece === types_1.Piece.BLACK_PAWN) {
        board.halfMoveClock = 0;
    }
    // Handle double pawn push (set en passant square)
    if (flags & types_1.MoveFlag.PAWN_DOUBLE_PUSH) {
        const enPassantSquare = board.turn === types_1.InternalColor.WHITE ? from + 8 : from - 8;
        board.enPassantSquare = enPassantSquare;
    }
    // Update castling rights
    updateCastlingRights(board, from, to, piece);
    // Update hash for castling/en-passant state
    board.zobristHash = (0, zobrist_1.updateHashEnPassant)(board.zobristHash, oldEnPassant, board.enPassantSquare);
    board.zobristHash = (0, zobrist_1.updateHashCastling)(board.zobristHash, oldCastling.whiteShort, board.castlingRights.whiteShort, oldCastling.whiteLong, board.castlingRights.whiteLong, oldCastling.blackShort, board.castlingRights.blackShort, oldCastling.blackLong, board.castlingRights.blackLong);
    // Switch turn (+hash)
    board.turn = board.turn === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
    board.zobristHash = (0, zobrist_1.toggleSide)(board.zobristHash);
    // Increment full move number after black's move
    if (board.turn === types_1.InternalColor.WHITE) {
        board.fullMoveNumber++;
    }
    // Update game status (check, checkmate, stalemate)
    updateGameStatus(board);
    return move;
}
/**
 * Update castling rights after a move
 *
 * @param board - Board state
 * @param from - From square
 * @param to - To square
 * @param piece - Piece that moved
 */
function updateCastlingRights(board, from, to, piece) {
    // If king moves, lose all castling rights for that color
    if (piece === types_1.Piece.WHITE_KING) {
        board.castlingRights.whiteShort = false;
        board.castlingRights.whiteLong = false;
    }
    else if (piece === types_1.Piece.BLACK_KING) {
        board.castlingRights.blackShort = false;
        board.castlingRights.blackLong = false;
    }
    // If rook moves from starting square, lose castling right for that side
    if (piece === types_1.Piece.WHITE_ROOK) {
        if (from === constants_1.CASTLING.WHITE_SHORT.rookFrom) {
            board.castlingRights.whiteShort = false;
        }
        else if (from === constants_1.CASTLING.WHITE_LONG.rookFrom) {
            board.castlingRights.whiteLong = false;
        }
    }
    else if (piece === types_1.Piece.BLACK_ROOK) {
        if (from === constants_1.CASTLING.BLACK_SHORT.rookFrom) {
            board.castlingRights.blackShort = false;
        }
        else if (from === constants_1.CASTLING.BLACK_LONG.rookFrom) {
            board.castlingRights.blackLong = false;
        }
    }
    // If rook is captured, lose castling right for that side
    if (to === constants_1.CASTLING.WHITE_SHORT.rookFrom) {
        board.castlingRights.whiteShort = false;
    }
    else if (to === constants_1.CASTLING.WHITE_LONG.rookFrom) {
        board.castlingRights.whiteLong = false;
    }
    else if (to === constants_1.CASTLING.BLACK_SHORT.rookFrom) {
        board.castlingRights.blackShort = false;
    }
    else if (to === constants_1.CASTLING.BLACK_LONG.rookFrom) {
        board.castlingRights.blackLong = false;
    }
}
/**
 * Update game status (check, checkmate, stalemate)
 *
 * @param board - Board state
 */
function updateGameStatus(board) {
    const currentColor = board.turn;
    const kingBitboard = currentColor === types_1.InternalColor.WHITE ? board.whiteKing : board.blackKing;
    if (kingBitboard === 0n) {
        board.isCheck = false;
        board.isCheckmate = false;
        board.isStalemate = false;
        return;
    }
    const kingSquare = (0, conversion_1.getLowestSetBit)(kingBitboard);
    // Check if the current player's king is attacked by the OPPONENT
    const opponentColor = currentColor === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
    const inCheck = (0, AttackDetector_1.isSquareAttacked)(board, kingSquare, opponentColor);
    // Fast status update — only sets isCheck.
    // IMPORTANT: isCheckmate and isStalemate are NOT set here to avoid recursive
    // generateLegalMoves() calls (applyMoveComplete -> updateGameStatus -> generateLegalMoves).
    // The search detects mate/stalemate via moves.length === 0.
    // The public API (Game class) patches these flags via updateConfigStatusFromBoard().
    board.isCheck = inCheck;
    board.isCheckmate = false;
    board.isStalemate = false;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Position.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/core/Position.js   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Advanced bitboard operations and position utilities
 *
 * This module provides fast bitboard manipulation for move generation
 * and attack detection.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNIGHT_ATTACKS = exports.KING_ATTACKS = exports.NOT_RANK_8 = exports.NOT_RANK_1 = exports.NOT_GH_FILE = exports.NOT_AB_FILE = exports.NOT_H_FILE = exports.NOT_A_FILE = exports.EDGE_MASK = exports.ANTI_DIAGONAL_MASKS = exports.DIAGONAL_MASKS = exports.RANK_MASKS = exports.FILE_MASKS = void 0;
exports.shiftNorth = shiftNorth;
exports.shiftSouth = shiftSouth;
exports.shiftEast = shiftEast;
exports.shiftWest = shiftWest;
exports.shiftNorthEast = shiftNorthEast;
exports.shiftNorthWest = shiftNorthWest;
exports.shiftSouthEast = shiftSouthEast;
exports.shiftSouthWest = shiftSouthWest;
exports.getFileMask = getFileMask;
exports.getRankMask = getRankMask;
exports.getDiagonalMask = getDiagonalMask;
exports.getAntiDiagonalMask = getAntiDiagonalMask;
exports.getRookAttacks = getRookAttacks;
exports.getBishopAttacks = getBishopAttacks;
exports.getQueenAttacks = getQueenAttacks;
exports.initializeAttackTables = initializeAttackTables;
exports.getKingAttacks = getKingAttacks;
exports.getKnightAttacks = getKnightAttacks;
exports.getWhitePawnAttacks = getWhitePawnAttacks;
exports.getBlackPawnAttacks = getBlackPawnAttacks;
exports.getWhitePawnsAttacks = getWhitePawnsAttacks;
exports.getBlackPawnsAttacks = getBlackPawnsAttacks;
const conversion_1 = require("../utils/conversion");
// ==================== Bitboard Masks ====================
/**
 * File masks (A-H files)
 */
exports.FILE_MASKS = [
    0x0101010101010101n, // A-file
    0x0202020202020202n, // B-file
    0x0404040404040404n, // C-file
    0x0808080808080808n, // D-file
    0x1010101010101010n, // E-file
    0x2020202020202020n, // F-file
    0x4040404040404040n, // G-file
    0x8080808080808080n, // H-file
];
/**
 * Rank masks (1-8 ranks)
 */
exports.RANK_MASKS = [
    0x00000000000000ffn, // Rank 1
    0x000000000000ff00n, // Rank 2
    0x0000000000ff0000n, // Rank 3
    0x00000000ff000000n, // Rank 4
    0x000000ff00000000n, // Rank 5
    0x0000ff0000000000n, // Rank 6
    0x00ff000000000000n, // Rank 7
    0xff00000000000000n, // Rank 8
];
/**
 * Diagonal masks (A1-H8 diagonals)
 */
exports.DIAGONAL_MASKS = [
    0x0000000000000001n,
    0x0000000000000102n,
    0x0000000000010204n,
    0x0000000001020408n,
    0x0000000102040810n,
    0x0000010204081020n,
    0x0001020408102040n,
    0x0102040810204080n,
    0x0204081020408000n,
    0x0408102040800000n,
    0x0810204080000000n,
    0x1020408000000000n,
    0x2040800000000000n,
    0x4080000000000000n,
    0x8000000000000000n,
];
/**
 * Anti-diagonal masks (H1-A8 diagonals)
 */
exports.ANTI_DIAGONAL_MASKS = [
    0x0000000000000080n,
    0x0000000000008040n,
    0x0000000000804020n,
    0x0000000080402010n,
    0x0000008040201008n,
    0x0000804020100804n,
    0x0080402010080402n,
    0x8040201008040201n,
    0x4020100804020100n,
    0x2010080402010000n,
    0x1008040201000000n,
    0x0804020100000000n,
    0x0402010000000000n,
    0x0201000000000000n,
    0x0100000000000000n,
];
/**
 * Edge masks
 */
exports.EDGE_MASK = 0xff818181818181ffn;
exports.NOT_A_FILE = 0xfefefefefefefefen;
exports.NOT_H_FILE = 0x7f7f7f7f7f7f7f7fn;
exports.NOT_AB_FILE = 0xfcfcfcfcfcfcfcfcn;
exports.NOT_GH_FILE = 0x3f3f3f3f3f3f3f3fn;
exports.NOT_RANK_1 = 0xffffffffffffff00n;
exports.NOT_RANK_8 = 0x00ffffffffffffffn;
// ==================== Bitboard Shifting ====================
/**
 * Shift bitboard north (towards rank 8)
 */
function shiftNorth(bb) {
    return (bb & exports.NOT_RANK_8) << 8n;
}
/**
 * Shift bitboard south (towards rank 1)
 */
function shiftSouth(bb) {
    return (bb & exports.NOT_RANK_1) >> 8n;
}
/**
 * Shift bitboard east (towards H-file)
 */
function shiftEast(bb) {
    return (bb & exports.NOT_H_FILE) << 1n;
}
/**
 * Shift bitboard west (towards A-file)
 */
function shiftWest(bb) {
    return (bb & exports.NOT_A_FILE) >> 1n;
}
/**
 * Shift bitboard north-east
 */
function shiftNorthEast(bb) {
    return (bb & exports.NOT_H_FILE & exports.NOT_RANK_8) << 9n;
}
/**
 * Shift bitboard north-west
 */
function shiftNorthWest(bb) {
    return (bb & exports.NOT_A_FILE & exports.NOT_RANK_8) << 7n;
}
/**
 * Shift bitboard south-east
 */
function shiftSouthEast(bb) {
    return (bb & exports.NOT_H_FILE & exports.NOT_RANK_1) >> 7n;
}
/**
 * Shift bitboard south-west
 */
function shiftSouthWest(bb) {
    return (bb & exports.NOT_A_FILE & exports.NOT_RANK_1) >> 9n;
}
// ==================== Square Bitboard Helpers ====================
/**
 * Get file mask for a square
 */
function getFileMask(index) {
    const file = (0, conversion_1.getFileIndex)(index);
    return exports.FILE_MASKS[file];
}
/**
 * Get rank mask for a square
 */
function getRankMask(index) {
    const rank = (0, conversion_1.getRankIndex)(index);
    return exports.RANK_MASKS[rank];
}
/**
 * Get diagonal mask for a square (A1-H8 direction)
 */
function getDiagonalMask(index) {
    const file = (0, conversion_1.getFileIndex)(index);
    const rank = (0, conversion_1.getRankIndex)(index);
    const diagonalIndex = 7 + rank - file;
    return exports.DIAGONAL_MASKS[diagonalIndex];
}
/**
 * Get anti-diagonal mask for a square (H1-A8 direction)
 */
function getAntiDiagonalMask(index) {
    const file = (0, conversion_1.getFileIndex)(index);
    const rank = (0, conversion_1.getRankIndex)(index);
    const antiDiagonalIndex = rank + file;
    return exports.ANTI_DIAGONAL_MASKS[antiDiagonalIndex];
}
// ==================== Precomputed Ray Tables ====================
// Direction indices: 0=North, 1=South, 2=East, 3=West, 4=NE, 5=NW, 6=SE, 7=SW
// "Positive" rays (toward higher bits): North(0), East(2), NE(4), NW(5)
// "Negative" rays (toward lower bits): South(1), West(3), SE(6), SW(7)
const RAY_TABLE = Array.from({ length: 8 }, () => new Array(64));
function initRayTables() {
    const directions = [8, -8, 1, -1, 9, 7, -7, -9];
    for (let dirIdx = 0; dirIdx < 8; dirIdx++) {
        const dir = directions[dirIdx];
        for (let sq = 0; sq < 64; sq++) {
            let attacks = 0n;
            let current = sq;
            while (true) {
                const next = current + dir;
                if (next < 0 || next > 63)
                    break;
                const cf = current % 8;
                const nf = next % 8;
                const fd = Math.abs(nf - cf);
                // Validate wrap: horizontal needs fd=1, vertical fd=0, diagonal fd=1
                if (dir === 1 || dir === -1) {
                    if (fd !== 1)
                        break;
                }
                else if (dir === 8 || dir === -8) {
                    if (fd !== 0)
                        break;
                }
                else {
                    if (fd !== 1)
                        break;
                }
                attacks |= 1n << BigInt(next);
                current = next;
            }
            RAY_TABLE[dirIdx][sq] = attacks;
        }
    }
}
initRayTables();
// Positive direction rays: first blocker = lowest set bit
// Negative direction rays: first blocker = highest set bit
function positiveRay(dirIdx, square, occupied) {
    const ray = RAY_TABLE[dirIdx][square];
    const blockers = ray & occupied;
    if (blockers === 0n)
        return ray;
    const first = (0, conversion_1.getLowestSetBit)(blockers);
    return ray ^ RAY_TABLE[dirIdx][first];
}
function negativeRay(dirIdx, square, occupied) {
    const ray = RAY_TABLE[dirIdx][square];
    const blockers = ray & occupied;
    if (blockers === 0n)
        return ray;
    const first = (0, conversion_1.getHighestSetBit)(blockers);
    return ray ^ RAY_TABLE[dirIdx][first];
}
function getRookAttacks(square, occupied) {
    return (positiveRay(0, square, occupied) | // North
        negativeRay(1, square, occupied) | // South
        positiveRay(2, square, occupied) | // East
        negativeRay(3, square, occupied) // West
    );
}
function getBishopAttacks(square, occupied) {
    return (positiveRay(4, square, occupied) | // NE
        positiveRay(5, square, occupied) | // NW
        negativeRay(6, square, occupied) | // SE
        negativeRay(7, square, occupied) // SW
    );
}
function getQueenAttacks(square, occupied) {
    return getRookAttacks(square, occupied) | getBishopAttacks(square, occupied);
}
// ==================== King and Knight Attacks ====================
/**
 * Pre-computed king attack bitboards for each square
 */
exports.KING_ATTACKS = new Array(64);
/**
 * Pre-computed knight attack bitboards for each square
 */
exports.KNIGHT_ATTACKS = new Array(64);
/**
 * Initialize pre-computed attack tables
 */
function initializeAttackTables() {
    // Initialize king attacks
    for (let sq = 0; sq < 64; sq++) {
        let attacks = 0n;
        const sqBit = 1n << BigInt(sq);
        // King can move one square in all 8 directions
        attacks |= shiftNorth(sqBit);
        attacks |= shiftSouth(sqBit);
        attacks |= shiftEast(sqBit);
        attacks |= shiftWest(sqBit);
        attacks |= shiftNorthEast(sqBit);
        attacks |= shiftNorthWest(sqBit);
        attacks |= shiftSouthEast(sqBit);
        attacks |= shiftSouthWest(sqBit);
        exports.KING_ATTACKS[sq] = attacks;
    }
    // Initialize knight attacks
    for (let sq = 0; sq < 64; sq++) {
        let attacks = 0n;
        const sqBit = 1n << BigInt(sq);
        // Knight moves in L-shape: 2 squares in one direction, 1 in perpendicular
        const nnw = shiftNorth(shiftNorth(shiftWest(sqBit)));
        const nne = shiftNorth(shiftNorth(shiftEast(sqBit)));
        const nee = shiftEast(shiftEast(shiftNorth(sqBit)));
        const see = shiftEast(shiftEast(shiftSouth(sqBit)));
        const sse = shiftSouth(shiftSouth(shiftEast(sqBit)));
        const ssw = shiftSouth(shiftSouth(shiftWest(sqBit)));
        const sww = shiftWest(shiftWest(shiftSouth(sqBit)));
        const nww = shiftWest(shiftWest(shiftNorth(sqBit)));
        attacks = nnw | nne | nee | see | sse | ssw | sww | nww;
        exports.KNIGHT_ATTACKS[sq] = attacks;
    }
}
// Initialize on module load
initializeAttackTables();
/**
 * Get king attacks for a square
 */
function getKingAttacks(square) {
    const attacks = exports.KING_ATTACKS[square];
    return attacks !== undefined ? attacks : 0n;
}
/**
 * Get knight attacks for a square
 */
function getKnightAttacks(square) {
    const attacks = exports.KNIGHT_ATTACKS[square];
    return attacks !== undefined ? attacks : 0n;
}
// ==================== Pawn Attacks ====================
/**
 * Get white pawn attacks for a square
 */
function getWhitePawnAttacks(square) {
    const sqBit = 1n << BigInt(square);
    return shiftNorthEast(sqBit) | shiftNorthWest(sqBit);
}
/**
 * Get black pawn attacks for a square
 */
function getBlackPawnAttacks(square) {
    const sqBit = 1n << BigInt(square);
    return shiftSouthEast(sqBit) | shiftSouthWest(sqBit);
}
/**
 * Get all white pawn attacks from a bitboard of white pawns
 */
function getWhitePawnsAttacks(pawns) {
    return shiftNorthEast(pawns) | shiftNorthWest(pawns);
}
/**
 * Get all black pawn attacks from a bitboard of black pawns
 */
function getBlackPawnsAttacks(pawns) {
    return shiftSouthEast(pawns) | shiftSouthWest(pawns);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AttackDetector.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/core/AttackDetecto //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Attack detection for chess positions
 *
 * This module provides fast attack detection using bitboards for:
 * - Checking if a square is under attack
 * - Detecting check and checkmate
 * - Generating attack bitboards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSquareAttacked = isSquareAttacked;
exports.isKingInCheck = isKingInCheck;
exports.getAttackedSquares = getAttackedSquares;
exports.getAttackers = getAttackers;
exports.wouldLeaveKingInCheck = wouldLeaveKingInCheck;
const types_1 = require("../types");
const Position_1 = require("./Position");
const conversion_1 = require("../utils/conversion");
/**
 * Check if a square is attacked by a specific color
 *
 * @param board - Board to check
 * @param square - Square index to check
 * @param attackerColor - Color of attacking pieces
 * @returns true if square is attacked by attackerColor
 */
function isSquareAttacked(board, square, attackerColor) {
    const attackers = attackerColor === types_1.InternalColor.WHITE ? board.whitePieces : board.blackPieces;
    // Check pawn attacks
    // IMPORTANT: `getWhitePawnAttacks(square)` returns the squares a *white pawn on `square`*
    // would attack (north-east/north-west). For attack detection we need the inverse mapping:
    // which pawn squares could attack `square`.
    // That means:
    //  - to see if `square` is attacked by WHITE pawns, look for WHITE pawns on the squares
    //    that a BLACK pawn from `square` would attack (south-east/south-west), i.e. potential
    //    white pawn origins.
    //  - to see if `square` is attacked by BLACK pawns, look for BLACK pawns on the squares
    //    that a WHITE pawn from `square` would attack (north-east/north-west), i.e. potential
    //    black pawn origins.
    const pawnAttackOrigins = attackerColor === types_1.InternalColor.WHITE
        ? (0, Position_1.getBlackPawnAttacks)(square)
        : (0, Position_1.getWhitePawnAttacks)(square);
    const pawns = attackerColor === types_1.InternalColor.WHITE ? board.whitePawns : board.blackPawns;
    if ((pawnAttackOrigins & pawns) !== 0n) {
        return true;
    }
    // Check knight attacks
    const knightAttacks = (0, Position_1.getKnightAttacks)(square);
    const knights = attackerColor === types_1.InternalColor.WHITE ? board.whiteKnights : board.blackKnights;
    if ((knightAttacks & knights) !== 0n) {
        return true;
    }
    // Check bishop and queen diagonal attacks
    const bishopAttacks = (0, Position_1.getBishopAttacks)(square, board.allPieces);
    const bishops = attackerColor === types_1.InternalColor.WHITE ? board.whiteBishops : board.blackBishops;
    const queens = attackerColor === types_1.InternalColor.WHITE ? board.whiteQueens : board.blackQueens;
    if ((bishopAttacks & (bishops | queens)) !== 0n) {
        return true;
    }
    // Check rook and queen straight attacks
    const rookAttacks = (0, Position_1.getRookAttacks)(square, board.allPieces);
    const rooks = attackerColor === types_1.InternalColor.WHITE ? board.whiteRooks : board.blackRooks;
    if ((rookAttacks & (rooks | queens)) !== 0n) {
        return true;
    }
    // Check king attacks
    const kingAttacks = (0, Position_1.getKingAttacks)(square);
    const king = attackerColor === types_1.InternalColor.WHITE ? board.whiteKing : board.blackKing;
    if ((kingAttacks & king) !== 0n) {
        return true;
    }
    return false;
}
/**
 * Check if the current player's king is in check
 *
 * @param board - Board to check
 * @returns true if king is in check
 */
function isKingInCheck(board) {
    const kingBitboard = board.turn === types_1.InternalColor.WHITE ? board.whiteKing : board.blackKing;
    if (kingBitboard === 0n) {
        return false; // No king (shouldn't happen in real game)
    }
    const kingSquare = (0, conversion_1.getLowestSetBit)(kingBitboard);
    const opponentColor = board.turn === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
    return isSquareAttacked(board, kingSquare, opponentColor);
}
/**
 * Get all squares attacked by a specific color
 *
 * @param board - Board to check
 * @param attackerColor - Color of attacking pieces
 * @returns Bitboard of all attacked squares
 */
function getAttackedSquares(board, attackerColor) {
    let attacked = 0n;
    // Pawn attacks
    const pawns = attackerColor === types_1.InternalColor.WHITE ? board.whitePawns : board.blackPawns;
    if (attackerColor === types_1.InternalColor.WHITE) {
        // White pawns attack north-east and north-west
        attacked |= ((pawns & 0xfefefefefefefefen) << 9n); // North-East (not on H-file)
        attacked |= ((pawns & 0x7f7f7f7f7f7f7f7fn) << 7n); // North-West (not on A-file)
    }
    else {
        // Black pawns attack south-east and south-west
        attacked |= ((pawns & 0xfefefefefefefefen) >> 7n); // South-East (not on H-file)
        attacked |= ((pawns & 0x7f7f7f7f7f7f7f7fn) >> 9n); // South-West (not on A-file)
    }
    // Knight attacks
    const knights = attackerColor === types_1.InternalColor.WHITE ? board.whiteKnights : board.blackKnights;
    let knightsBB = knights;
    while (knightsBB !== 0n) {
        const sq = (0, conversion_1.getLowestSetBit)(knightsBB);
        attacked |= (0, Position_1.getKnightAttacks)(sq);
        knightsBB &= knightsBB - 1n; // Clear lowest bit
    }
    // Bishop attacks
    const bishops = attackerColor === types_1.InternalColor.WHITE ? board.whiteBishops : board.blackBishops;
    let bishopsBB = bishops;
    while (bishopsBB !== 0n) {
        const sq = (0, conversion_1.getLowestSetBit)(bishopsBB);
        attacked |= (0, Position_1.getBishopAttacks)(sq, board.allPieces);
        bishopsBB &= bishopsBB - 1n;
    }
    // Rook attacks
    const rooks = attackerColor === types_1.InternalColor.WHITE ? board.whiteRooks : board.blackRooks;
    let rooksBB = rooks;
    while (rooksBB !== 0n) {
        const sq = (0, conversion_1.getLowestSetBit)(rooksBB);
        attacked |= (0, Position_1.getRookAttacks)(sq, board.allPieces);
        rooksBB &= rooksBB - 1n;
    }
    // Queen attacks
    const queens = attackerColor === types_1.InternalColor.WHITE ? board.whiteQueens : board.blackQueens;
    let queensBB = queens;
    while (queensBB !== 0n) {
        const sq = (0, conversion_1.getLowestSetBit)(queensBB);
        attacked |= (0, Position_1.getQueenAttacks)(sq, board.allPieces);
        queensBB &= queensBB - 1n;
    }
    // King attacks
    const king = attackerColor === types_1.InternalColor.WHITE ? board.whiteKing : board.blackKing;
    if (king !== 0n) {
        const kingSquare = (0, conversion_1.getLowestSetBit)(king);
        attacked |= (0, Position_1.getKingAttacks)(kingSquare);
    }
    return attacked;
}
/**
 * Get all pieces attacking a specific square
 *
 * @param board - Board to check
 * @param square - Square being attacked
 * @param attackerColor - Color of attacking pieces
 * @returns Bitboard of all pieces attacking the square
 */
function getAttackers(board, square, attackerColor) {
    let attackers = 0n;
    // Pawn attackers
    const pawnAttackOrigins = attackerColor === types_1.InternalColor.WHITE
        ? (0, Position_1.getBlackPawnAttacks)(square)
        : (0, Position_1.getWhitePawnAttacks)(square);
    const pawns = attackerColor === types_1.InternalColor.WHITE ? board.whitePawns : board.blackPawns;
    attackers |= pawnAttackOrigins & pawns;
    // Knight attackers
    const knightAttacks = (0, Position_1.getKnightAttacks)(square);
    const knights = attackerColor === types_1.InternalColor.WHITE ? board.whiteKnights : board.blackKnights;
    attackers |= knightAttacks & knights;
    // Bishop and queen diagonal attackers
    const bishopAttacks = (0, Position_1.getBishopAttacks)(square, board.allPieces);
    const bishops = attackerColor === types_1.InternalColor.WHITE ? board.whiteBishops : board.blackBishops;
    const queens = attackerColor === types_1.InternalColor.WHITE ? board.whiteQueens : board.blackQueens;
    attackers |= bishopAttacks & (bishops | queens);
    // Rook and queen straight attackers
    const rookAttacks = (0, Position_1.getRookAttacks)(square, board.allPieces);
    const rooks = attackerColor === types_1.InternalColor.WHITE ? board.whiteRooks : board.blackRooks;
    attackers |= rookAttacks & (rooks | queens);
    // King attackers
    const kingAttacks = (0, Position_1.getKingAttacks)(square);
    const king = attackerColor === types_1.InternalColor.WHITE ? board.whiteKing : board.blackKing;
    attackers |= kingAttacks & king;
    return attackers;
}
/**
 * Check if moving a piece would leave the king in check (pinned piece detection)
 *
 * @param board - Board state
 * @param from - Square piece is moving from
 * @param to - Square piece is moving to
 * @returns true if move would leave king in check
 */
function wouldLeaveKingInCheck(board, from, to) {
    const piece = board.mailbox[from];
    const capturedPiece = board.mailbox[to];
    const color = board.turn;
    // Make the move temporarily
    board.mailbox[from] = types_1.Piece.EMPTY;
    board.mailbox[to] = piece;
    // Update bitboards
    const fromBit = 1n << BigInt(from);
    const toBit = 1n << BigInt(to);
    const moveBits = fromBit | toBit;
    // Save original bitboard state
    let originalPieceBB;
    let originalCapturedBB = null;
    // Update piece bitboard
    switch (piece) {
        case types_1.Piece.WHITE_PAWN:
            originalPieceBB = board.whitePawns;
            board.whitePawns = (board.whitePawns & ~fromBit) | toBit;
            break;
        case types_1.Piece.WHITE_KNIGHT:
            originalPieceBB = board.whiteKnights;
            board.whiteKnights = (board.whiteKnights & ~fromBit) | toBit;
            break;
        case types_1.Piece.WHITE_BISHOP:
            originalPieceBB = board.whiteBishops;
            board.whiteBishops = (board.whiteBishops & ~fromBit) | toBit;
            break;
        case types_1.Piece.WHITE_ROOK:
            originalPieceBB = board.whiteRooks;
            board.whiteRooks = (board.whiteRooks & ~fromBit) | toBit;
            break;
        case types_1.Piece.WHITE_QUEEN:
            originalPieceBB = board.whiteQueens;
            board.whiteQueens = (board.whiteQueens & ~fromBit) | toBit;
            break;
        case types_1.Piece.WHITE_KING:
            originalPieceBB = board.whiteKing;
            board.whiteKing = (board.whiteKing & ~fromBit) | toBit;
            break;
        case types_1.Piece.BLACK_PAWN:
            originalPieceBB = board.blackPawns;
            board.blackPawns = (board.blackPawns & ~fromBit) | toBit;
            break;
        case types_1.Piece.BLACK_KNIGHT:
            originalPieceBB = board.blackKnights;
            board.blackKnights = (board.blackKnights & ~fromBit) | toBit;
            break;
        case types_1.Piece.BLACK_BISHOP:
            originalPieceBB = board.blackBishops;
            board.blackBishops = (board.blackBishops & ~fromBit) | toBit;
            break;
        case types_1.Piece.BLACK_ROOK:
            originalPieceBB = board.blackRooks;
            board.blackRooks = (board.blackRooks & ~fromBit) | toBit;
            break;
        case types_1.Piece.BLACK_QUEEN:
            originalPieceBB = board.blackQueens;
            board.blackQueens = (board.blackQueens & ~fromBit) | toBit;
            break;
        case types_1.Piece.BLACK_KING:
            originalPieceBB = board.blackKing;
            board.blackKing = (board.blackKing & ~fromBit) | toBit;
            break;
        default:
            originalPieceBB = 0n;
    }
    // Update captured piece bitboard if there's a capture
    if (capturedPiece !== types_1.Piece.EMPTY) {
        switch (capturedPiece) {
            case types_1.Piece.WHITE_PAWN:
                originalCapturedBB = board.whitePawns;
                board.whitePawns &= ~toBit;
                break;
            case types_1.Piece.WHITE_KNIGHT:
                originalCapturedBB = board.whiteKnights;
                board.whiteKnights &= ~toBit;
                break;
            case types_1.Piece.WHITE_BISHOP:
                originalCapturedBB = board.whiteBishops;
                board.whiteBishops &= ~toBit;
                break;
            case types_1.Piece.WHITE_ROOK:
                originalCapturedBB = board.whiteRooks;
                board.whiteRooks &= ~toBit;
                break;
            case types_1.Piece.WHITE_QUEEN:
                originalCapturedBB = board.whiteQueens;
                board.whiteQueens &= ~toBit;
                break;
            case types_1.Piece.BLACK_PAWN:
                originalCapturedBB = board.blackPawns;
                board.blackPawns &= ~toBit;
                break;
            case types_1.Piece.BLACK_KNIGHT:
                originalCapturedBB = board.blackKnights;
                board.blackKnights &= ~toBit;
                break;
            case types_1.Piece.BLACK_BISHOP:
                originalCapturedBB = board.blackBishops;
                board.blackBishops &= ~toBit;
                break;
            case types_1.Piece.BLACK_ROOK:
                originalCapturedBB = board.blackRooks;
                board.blackRooks &= ~toBit;
                break;
            case types_1.Piece.BLACK_QUEEN:
                originalCapturedBB = board.blackQueens;
                board.blackQueens &= ~toBit;
                break;
        }
    }
    // Update composite bitboards
    const originalWhitePieces = board.whitePieces;
    const originalBlackPieces = board.blackPieces;
    const originalAllPieces = board.allPieces;
    board.whitePieces = board.whitePawns | board.whiteKnights | board.whiteBishops |
        board.whiteRooks | board.whiteQueens | board.whiteKing;
    board.blackPieces = board.blackPawns | board.blackKnights | board.blackBishops |
        board.blackRooks | board.blackQueens | board.blackKing;
    board.allPieces = board.whitePieces | board.blackPieces;
    // Check if king is in check
    const inCheck = isKingInCheck(board);
    // Undo the move
    board.mailbox[from] = piece;
    board.mailbox[to] = capturedPiece;
    // Restore bitboards
    switch (piece) {
        case types_1.Piece.WHITE_PAWN:
            board.whitePawns = originalPieceBB;
            break;
        case types_1.Piece.WHITE_KNIGHT:
            board.whiteKnights = originalPieceBB;
            break;
        case types_1.Piece.WHITE_BISHOP:
            board.whiteBishops = originalPieceBB;
            break;
        case types_1.Piece.WHITE_ROOK:
            board.whiteRooks = originalPieceBB;
            break;
        case types_1.Piece.WHITE_QUEEN:
            board.whiteQueens = originalPieceBB;
            break;
        case types_1.Piece.WHITE_KING:
            board.whiteKing = originalPieceBB;
            break;
        case types_1.Piece.BLACK_PAWN:
            board.blackPawns = originalPieceBB;
            break;
        case types_1.Piece.BLACK_KNIGHT:
            board.blackKnights = originalPieceBB;
            break;
        case types_1.Piece.BLACK_BISHOP:
            board.blackBishops = originalPieceBB;
            break;
        case types_1.Piece.BLACK_ROOK:
            board.blackRooks = originalPieceBB;
            break;
        case types_1.Piece.BLACK_QUEEN:
            board.blackQueens = originalPieceBB;
            break;
        case types_1.Piece.BLACK_KING:
            board.blackKing = originalPieceBB;
            break;
    }
    if (originalCapturedBB !== null) {
        switch (capturedPiece) {
            case types_1.Piece.WHITE_PAWN:
                board.whitePawns = originalCapturedBB;
                break;
            case types_1.Piece.WHITE_KNIGHT:
                board.whiteKnights = originalCapturedBB;
                break;
            case types_1.Piece.WHITE_BISHOP:
                board.whiteBishops = originalCapturedBB;
                break;
            case types_1.Piece.WHITE_ROOK:
                board.whiteRooks = originalCapturedBB;
                break;
            case types_1.Piece.WHITE_QUEEN:
                board.whiteQueens = originalCapturedBB;
                break;
            case types_1.Piece.BLACK_PAWN:
                board.blackPawns = originalCapturedBB;
                break;
            case types_1.Piece.BLACK_KNIGHT:
                board.blackKnights = originalCapturedBB;
                break;
            case types_1.Piece.BLACK_BISHOP:
                board.blackBishops = originalCapturedBB;
                break;
            case types_1.Piece.BLACK_ROOK:
                board.blackRooks = originalCapturedBB;
                break;
            case types_1.Piece.BLACK_QUEEN:
                board.blackQueens = originalCapturedBB;
                break;
        }
    }
    board.whitePieces = originalWhitePieces;
    board.blackPieces = originalBlackPieces;
    board.allPieces = originalAllPieces;
    return inCheck;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"zobrist.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/core/zobrist.js    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Zobrist hashing for position identification
 *
 * Zobrist hashing provides a fast way to uniquely identify board positions
 * for use in the transposition table. Each piece on each square gets a random
 * 64-bit number, and the hash is the XOR of all piece positions plus state.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initZobrist = initZobrist;
exports.computeZobristHash = computeZobristHash;
exports.updateHashMove = updateHashMove;
exports.updateHashCapture = updateHashCapture;
exports.toggleSide = toggleSide;
exports.updateHashCastling = updateHashCastling;
exports.updateHashEnPassant = updateHashEnPassant;
exports.addPieceToHash = addPieceToHash;
exports.removePieceFromHash = removePieceFromHash;
const types_1 = require("../types");
const constants_1 = require("../utils/constants");
// ==================== Zobrist Key Tables ====================
/**
 * Random 64-bit numbers for Zobrist hashing
 * [piece][square] -> random bigint
 */
let pieceKeys = [];
/**
 * Random number for side to move (white)
 */
let sideKey = 0n;
/**
 * Random numbers for castling rights
 * [0] = white short, [1] = white long, [2] = black short, [3] = black long
 */
let castlingKeys = [];
/**
 * Random numbers for en passant file
 * [file] -> random bigint (8 files)
 */
let enPassantKeys = [];
// ==================== Initialization ====================
/**
 * Initialize Zobrist hash tables with random 64-bit numbers
 *
 * This should be called once at startup. Uses a simple PRNG seeded
 * with a fixed value for deterministic hashing.
 */
function initZobrist() {
    // Initialize pseudo-random number generator with seed
    let seed = 12345n;
    const rand64 = () => {
        // Simple XORShift64 PRNG
        seed ^= seed << 13n;
        seed ^= seed >> 7n;
        seed ^= seed << 17n;
        return seed;
    };
    // Initialize piece keys [piece type][square]
    pieceKeys = [];
    for (let piece = 0; piece <= 12; piece++) {
        pieceKeys[piece] = [];
        for (let square = 0; square < constants_1.TOTAL_SQUARES; square++) {
            pieceKeys[piece][square] = rand64();
        }
    }
    // Initialize side key (for white to move)
    sideKey = rand64();
    // Initialize castling keys
    castlingKeys = [
        rand64(), // white short
        rand64(), // white long
        rand64(), // black short
        rand64(), // black long
    ];
    // Initialize en passant keys (one per file)
    enPassantKeys = [];
    for (let file = 0; file < 8; file++) {
        enPassantKeys[file] = rand64();
    }
}
// ==================== Hash Computation ====================
/**
 * Compute the Zobrist hash for a board position
 *
 * @param board - Board to hash
 * @returns 64-bit Zobrist hash
 */
function computeZobristHash(board) {
    let hash = 0n;
    // XOR piece positions
    for (let square = 0; square < constants_1.TOTAL_SQUARES; square++) {
        const piece = board.mailbox[square];
        if (piece !== types_1.Piece.EMPTY) {
            hash ^= pieceKeys[piece][square];
        }
    }
    // XOR side to move (if white)
    if (board.turn === types_1.InternalColor.WHITE) {
        hash ^= sideKey;
    }
    // XOR castling rights
    if (board.castlingRights.whiteShort) {
        hash ^= castlingKeys[0];
    }
    if (board.castlingRights.whiteLong) {
        hash ^= castlingKeys[1];
    }
    if (board.castlingRights.blackShort) {
        hash ^= castlingKeys[2];
    }
    if (board.castlingRights.blackLong) {
        hash ^= castlingKeys[3];
    }
    // XOR en passant square
    if (board.enPassantSquare !== null) {
        const file = board.enPassantSquare % 8;
        hash ^= enPassantKeys[file];
    }
    return hash;
}
/**
 * Update hash after moving a piece
 *
 * This is more efficient than recomputing the entire hash.
 *
 * @param hash - Current hash
 * @param piece - Piece being moved
 * @param from - Source square
 * @param to - Destination square
 * @returns Updated hash
 */
function updateHashMove(hash, piece, from, to) {
    // Remove piece from old square
    hash ^= pieceKeys[piece][from];
    // Add piece to new square
    hash ^= pieceKeys[piece][to];
    return hash;
}
/**
 * Update hash after capturing a piece
 *
 * @param hash - Current hash
 * @param capturedPiece - Piece being captured
 * @param square - Square where capture occurred
 * @returns Updated hash
 */
function updateHashCapture(hash, capturedPiece, square) {
    // Remove captured piece
    hash ^= pieceKeys[capturedPiece][square];
    return hash;
}
/**
 * Toggle side to move in hash
 *
 * @param hash - Current hash
 * @returns Updated hash with toggled side
 */
function toggleSide(hash) {
    return hash ^ sideKey;
}
/**
 * Update hash for castling rights change
 *
 * @param hash - Current hash
 * @param whiteShortOld - Old white short castling right
 * @param whiteShortNew - New white short castling right
 * @param whiteLongOld - Old white long castling right
 * @param whiteLongNew - New white long castling right
 * @param blackShortOld - Old black short castling right
 * @param blackShortNew - New black short castling right
 * @param blackLongOld - Old black long castling right
 * @param blackLongNew - New black long castling right
 * @returns Updated hash
 */
function updateHashCastling(hash, whiteShortOld, whiteShortNew, whiteLongOld, whiteLongNew, blackShortOld, blackShortNew, blackLongOld, blackLongNew) {
    // XOR out old castling rights
    if (whiteShortOld)
        hash ^= castlingKeys[0];
    if (whiteLongOld)
        hash ^= castlingKeys[1];
    if (blackShortOld)
        hash ^= castlingKeys[2];
    if (blackLongOld)
        hash ^= castlingKeys[3];
    // XOR in new castling rights
    if (whiteShortNew)
        hash ^= castlingKeys[0];
    if (whiteLongNew)
        hash ^= castlingKeys[1];
    if (blackShortNew)
        hash ^= castlingKeys[2];
    if (blackLongNew)
        hash ^= castlingKeys[3];
    return hash;
}
/**
 * Update hash for en passant square change
 *
 * @param hash - Current hash
 * @param oldSquare - Old en passant square (or null)
 * @param newSquare - New en passant square (or null)
 * @returns Updated hash
 */
function updateHashEnPassant(hash, oldSquare, newSquare) {
    // XOR out old en passant
    if (oldSquare !== null) {
        const oldFile = oldSquare % 8;
        hash ^= enPassantKeys[oldFile];
    }
    // XOR in new en passant
    if (newSquare !== null) {
        const newFile = newSquare % 8;
        hash ^= enPassantKeys[newFile];
    }
    return hash;
}
/**
 * Add a piece to the hash
 *
 * @param hash - Current hash
 * @param piece - Piece to add
 * @param square - Square where piece is added
 * @returns Updated hash
 */
function addPieceToHash(hash, piece, square) {
    return hash ^ pieceKeys[piece][square];
}
/**
 * Remove a piece from the hash
 *
 * @param hash - Current hash
 * @param piece - Piece to remove
 * @param square - Square where piece is removed
 * @returns Updated hash
 */
function removePieceFromHash(hash, piece, square) {
    return hash ^ pieceKeys[piece][square];
}
// Initialize on module load
initZobrist();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"types":{"index.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/types/index.js     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Type definitions for js-chess-engine v2
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Export all board types
__exportStar(require("./board.types"), exports);
// Export all move types
__exportStar(require("./move.types"), exports);
// Export all AI types
__exportStar(require("./ai.types"), exports);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"board.types.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/types/board.types. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Board-related types for js-chess-engine
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalColor = exports.Piece = void 0;
/**
 * Internal piece representation
 */
var Piece;
(function (Piece) {
    Piece[Piece["EMPTY"] = 0] = "EMPTY";
    Piece[Piece["WHITE_PAWN"] = 1] = "WHITE_PAWN";
    Piece[Piece["WHITE_KNIGHT"] = 2] = "WHITE_KNIGHT";
    Piece[Piece["WHITE_BISHOP"] = 3] = "WHITE_BISHOP";
    Piece[Piece["WHITE_ROOK"] = 4] = "WHITE_ROOK";
    Piece[Piece["WHITE_QUEEN"] = 5] = "WHITE_QUEEN";
    Piece[Piece["WHITE_KING"] = 6] = "WHITE_KING";
    Piece[Piece["BLACK_PAWN"] = 7] = "BLACK_PAWN";
    Piece[Piece["BLACK_KNIGHT"] = 8] = "BLACK_KNIGHT";
    Piece[Piece["BLACK_BISHOP"] = 9] = "BLACK_BISHOP";
    Piece[Piece["BLACK_ROOK"] = 10] = "BLACK_ROOK";
    Piece[Piece["BLACK_QUEEN"] = 11] = "BLACK_QUEEN";
    Piece[Piece["BLACK_KING"] = 12] = "BLACK_KING";
})(Piece || (exports.Piece = Piece = {}));
/**
 * Internal color representation
 */
var InternalColor;
(function (InternalColor) {
    InternalColor[InternalColor["WHITE"] = 0] = "WHITE";
    InternalColor[InternalColor["BLACK"] = 1] = "BLACK";
})(InternalColor || (exports.InternalColor = InternalColor = {}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"move.types.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/types/move.types.j //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Move-related types for js-chess-engine
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveOrderType = exports.CastlingType = exports.PromotionPiece = exports.MoveFlag = void 0;
// ==================== Internal Types ====================
/**
 * Move flags for special moves
 */
var MoveFlag;
(function (MoveFlag) {
    MoveFlag[MoveFlag["NONE"] = 0] = "NONE";
    MoveFlag[MoveFlag["EN_PASSANT"] = 1] = "EN_PASSANT";
    MoveFlag[MoveFlag["CASTLING"] = 2] = "CASTLING";
    MoveFlag[MoveFlag["PROMOTION"] = 4] = "PROMOTION";
    MoveFlag[MoveFlag["PAWN_DOUBLE_PUSH"] = 8] = "PAWN_DOUBLE_PUSH";
    MoveFlag[MoveFlag["CAPTURE"] = 16] = "CAPTURE";
})(MoveFlag || (exports.MoveFlag = MoveFlag = {}));
/**
 * Promotion piece type
 */
var PromotionPiece;
(function (PromotionPiece) {
    PromotionPiece[PromotionPiece["QUEEN"] = 5] = "QUEEN";
    PromotionPiece[PromotionPiece["ROOK"] = 4] = "ROOK";
    PromotionPiece[PromotionPiece["BISHOP"] = 3] = "BISHOP";
    PromotionPiece[PromotionPiece["KNIGHT"] = 2] = "KNIGHT";
})(PromotionPiece || (exports.PromotionPiece = PromotionPiece = {}));
/**
 * Castling type
 */
var CastlingType;
(function (CastlingType) {
    CastlingType[CastlingType["NONE"] = 0] = "NONE";
    CastlingType[CastlingType["WHITE_SHORT"] = 1] = "WHITE_SHORT";
    CastlingType[CastlingType["WHITE_LONG"] = 2] = "WHITE_LONG";
    CastlingType[CastlingType["BLACK_SHORT"] = 3] = "BLACK_SHORT";
    CastlingType[CastlingType["BLACK_LONG"] = 4] = "BLACK_LONG";
})(CastlingType || (exports.CastlingType = CastlingType = {}));
/**
 * Move ordering types
 */
var MoveOrderType;
(function (MoveOrderType) {
    MoveOrderType[MoveOrderType["TT_MOVE"] = 1000000] = "TT_MOVE";
    MoveOrderType[MoveOrderType["WINNING_CAPTURE"] = 100000] = "WINNING_CAPTURE";
    MoveOrderType[MoveOrderType["KILLER_1"] = 90000] = "KILLER_1";
    MoveOrderType[MoveOrderType["KILLER_2"] = 80000] = "KILLER_2";
    MoveOrderType[MoveOrderType["HISTORY"] = 0] = "HISTORY";
    MoveOrderType[MoveOrderType["LOSING_CAPTURE"] = -10000] = "LOSING_CAPTURE";
})(MoveOrderType || (exports.MoveOrderType = MoveOrderType = {}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ai.types.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/types/ai.types.js  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * AI and search-related types for js-chess-engine
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTEntryType = void 0;
// ==================== Transposition Table Types ====================
/**
 * Transposition table entry type
 */
var TTEntryType;
(function (TTEntryType) {
    TTEntryType[TTEntryType["EXACT"] = 0] = "EXACT";
    TTEntryType[TTEntryType["LOWERBOUND"] = 1] = "LOWERBOUND";
    TTEntryType[TTEntryType["UPPERBOUND"] = 2] = "UPPERBOUND";
})(TTEntryType || (exports.TTEntryType = TTEntryType = {}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"utils":{"constants.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/utils/constants.js //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Constants for js-chess-engine v2
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CASTLING = exports.ROWS = exports.COLUMNS = exports.TOTAL_SQUARES = exports.BOARD_SIZE = void 0;
// ==================== Board Constants ====================
exports.BOARD_SIZE = 8;
exports.TOTAL_SQUARES = 64;
exports.COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
exports.ROWS = ['1', '2', '3', '4', '5', '6', '7', '8'];
// ==================== Castling Constants ====================
exports.CASTLING = {
    WHITE_SHORT: {
        kingFrom: 4, // E1
        kingTo: 6, // G1
        rookFrom: 7, // H1
        rookTo: 5, // F1
    },
    WHITE_LONG: {
        kingFrom: 4, // E1
        kingTo: 2, // C1
        rookFrom: 0, // A1
        rookTo: 3, // D1
    },
    BLACK_SHORT: {
        kingFrom: 60, // E8
        kingTo: 62, // G8
        rookFrom: 63, // H8
        rookTo: 61, // F8
    },
    BLACK_LONG: {
        kingFrom: 60, // E8
        kingTo: 58, // C8
        rookFrom: 56, // A8
        rookTo: 59, // D8
    },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"conversion.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/utils/conversion.j //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Conversion utilities between square notation and internal indices
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.squareToIndex = squareToIndex;
exports.indexToSquare = indexToSquare;
exports.getFileIndex = getFileIndex;
exports.getRankIndex = getRankIndex;
exports.getFile = getFile;
exports.getRank = getRank;
exports.fileRankToIndex = fileRankToIndex;
exports.isValidSquare = isValidSquare;
exports.isValidIndex = isValidIndex;
exports.indexToBitboard = indexToBitboard;
exports.squareToBitboard = squareToBitboard;
exports.bitboardToIndices = bitboardToIndices;
exports.getLowestSetBit = getLowestSetBit;
exports.getHighestSetBit = getHighestSetBit;
exports.popCount = popCount;
exports.manhattanDistance = manhattanDistance;
exports.chebyshevDistance = chebyshevDistance;
exports.isOnEdge = isOnEdge;
exports.isAFile = isAFile;
exports.isHFile = isHFile;
exports.isRank1 = isRank1;
exports.isRank8 = isRank8;
const constants_1 = require("./constants");
// ==================== Square ↔ Index Conversion ====================
/**
 * Convert square notation (e.g., "A1", "E4") to square index (0-63)
 *
 * Board layout:
 * 56 57 58 59 60 61 62 63  (Rank 8) - A8 to H8
 * 48 49 50 51 52 53 54 55  (Rank 7)
 * ...
 *  8  9 10 11 12 13 14 15  (Rank 2)
 *  0  1  2  3  4  5  6  7  (Rank 1) - A1 to H1
 *
 * @param square - Square notation (case-insensitive)
 * @returns Square index (0-63)
 * @throws Error if square notation is invalid
 */
function squareToIndex(square) {
    const normalized = square.toUpperCase();
    if (normalized.length !== 2) {
        throw new Error(`Invalid square notation: ${square}`);
    }
    const file = normalized[0];
    const rank = normalized[1];
    const fileIndex = constants_1.COLUMNS.indexOf(file);
    const rankIndex = constants_1.ROWS.indexOf(rank);
    if (fileIndex === -1 || rankIndex === -1) {
        throw new Error(`Invalid square notation: ${square}`);
    }
    return (rankIndex * 8 + fileIndex);
}
/**
 * Convert square index (0-63) to square notation (e.g., "A1", "E4")
 *
 * @param index - Square index (0-63)
 * @returns Square notation in uppercase
 * @throws Error if index is out of range
 */
function indexToSquare(index) {
    if (index < 0 || index > 63) {
        throw new Error(`Invalid square index: ${index}`);
    }
    const fileIndex = index % 8;
    const rankIndex = Math.floor(index / 8);
    return `${constants_1.COLUMNS[fileIndex]}${constants_1.ROWS[rankIndex]}`;
}
// ==================== File/Rank Conversion ====================
/**
 * Get file index (0-7) from square index
 *
 * @param index - Square index (0-63)
 * @returns File index (0=A, 1=B, ..., 7=H)
 */
function getFileIndex(index) {
    return (index % 8);
}
/**
 * Get rank index (0-7) from square index
 *
 * @param index - Square index (0-63)
 * @returns Rank index (0=1, 1=2, ..., 7=8)
 */
function getRankIndex(index) {
    return Math.floor(index / 8);
}
/**
 * Get file from square notation
 *
 * @param square - Square notation (case-insensitive)
 * @returns File index (0-7)
 */
function getFile(square) {
    const normalized = square.toUpperCase();
    const fileIndex = constants_1.COLUMNS.indexOf(normalized[0]);
    if (fileIndex === -1) {
        throw new Error(`Invalid square notation: ${square}`);
    }
    return fileIndex;
}
/**
 * Get rank from square notation
 *
 * @param square - Square notation (case-insensitive)
 * @returns Rank index (0-7)
 */
function getRank(square) {
    const normalized = square.toUpperCase();
    const rankIndex = constants_1.ROWS.indexOf(normalized[1]);
    if (rankIndex === -1) {
        throw new Error(`Invalid square notation: ${square}`);
    }
    return rankIndex;
}
/**
 * Create square index from file and rank indices
 *
 * @param file - File index (0-7)
 * @param rank - Rank index (0-7)
 * @returns Square index (0-63)
 */
function fileRankToIndex(file, rank) {
    return (rank * 8 + file);
}
// ==================== Validation ====================
/**
 * Check if square notation is valid
 *
 * @param square - Square notation
 * @returns true if valid
 */
function isValidSquare(square) {
    if (typeof square !== 'string' || square.length !== 2) {
        return false;
    }
    const normalized = square.toUpperCase();
    const file = normalized[0];
    const rank = normalized[1];
    return constants_1.COLUMNS.includes(file) && constants_1.ROWS.includes(rank);
}
/**
 * Check if square index is valid
 *
 * @param index - Square index
 * @returns true if valid (0-63)
 */
function isValidIndex(index) {
    return Number.isInteger(index) && index >= 0 && index <= 63;
}
// ==================== Bitboard Helpers ====================
/**
 * Convert square index to bitboard (single bit set)
 *
 * @param index - Square index (0-63)
 * @returns Bitboard with single bit set
 */
function indexToBitboard(index) {
    return 1n << BigInt(index);
}
/**
 * Convert square notation to bitboard
 *
 * @param square - Square notation
 * @returns Bitboard with single bit set
 */
function squareToBitboard(square) {
    return indexToBitboard(squareToIndex(square));
}
/**
 * Get all set bits (square indices) from a bitboard
 *
 * @param bitboard - Bitboard to extract indices from
 * @returns Array of square indices where bits are set
 */
function bitboardToIndices(bitboard) {
    const indices = [];
    let bb = bitboard;
    while (bb !== 0n) {
        const index = getLowestSetBit(bb);
        indices.push(index);
        bb &= bb - 1n; // Clear lowest set bit
    }
    return indices;
}
// De Bruijn constant and lookup table for O(1) bit scanning
const DE_BRUIJN_64 = 0x03f79d71b4cb0a89n;
const MASK_64 = 0xffffffffffffffffn;
const DE_BRUIJN_TABLE = new Int8Array(64);
for (let i = 0; i < 64; i++) {
    DE_BRUIJN_TABLE[Number((((1n << BigInt(i)) * DE_BRUIJN_64) & MASK_64) >> 58n)] = i;
}
/**
 * Get the index of the lowest set bit in a bitboard (O(1) via De Bruijn)
 */
function getLowestSetBit(bitboard) {
    if (bitboard === 0n)
        return -1;
    const isolated = bitboard & (-bitboard);
    return DE_BRUIJN_TABLE[Number(((isolated * DE_BRUIJN_64) & MASK_64) >> 58n)];
}
/**
 * Get the index of the highest set bit in a bitboard
 */
function getHighestSetBit(bitboard) {
    if (bitboard === 0n)
        return -1;
    let bb = bitboard;
    bb |= bb >> 1n;
    bb |= bb >> 2n;
    bb |= bb >> 4n;
    bb |= bb >> 8n;
    bb |= bb >> 16n;
    bb |= bb >> 32n;
    const msb = bb - (bb >> 1n);
    return DE_BRUIJN_TABLE[Number(((msb * DE_BRUIJN_64) & MASK_64) >> 58n)];
}
/**
 * Count the number of set bits in a bitboard (population count)
 *
 * @param bitboard - Bitboard
 * @returns Number of set bits
 */
function popCount(bitboard) {
    let count = 0;
    let bb = bitboard;
    while (bb !== 0n) {
        bb &= bb - 1n; // Clear lowest set bit
        count++;
    }
    return count;
}
// ==================== Distance Calculations ====================
/**
 * Calculate Manhattan distance between two squares
 *
 * @param from - Source square index
 * @param to - Target square index
 * @returns Manhattan distance
 */
function manhattanDistance(from, to) {
    const fromFile = getFileIndex(from);
    const fromRank = getRankIndex(from);
    const toFile = getFileIndex(to);
    const toRank = getRankIndex(to);
    return Math.abs(fromFile - toFile) + Math.abs(fromRank - toRank);
}
/**
 * Calculate Chebyshev distance between two squares (king moves)
 *
 * @param from - Source square index
 * @param to - Target square index
 * @returns Chebyshev distance
 */
function chebyshevDistance(from, to) {
    const fromFile = getFileIndex(from);
    const fromRank = getRankIndex(from);
    const toFile = getFileIndex(to);
    const toRank = getRankIndex(to);
    return Math.max(Math.abs(fromFile - toFile), Math.abs(fromRank - toRank));
}
// ==================== Board Boundaries ====================
/**
 * Check if a square is on the edge of the board
 *
 * @param index - Square index
 * @returns true if on edge
 */
function isOnEdge(index) {
    const file = getFileIndex(index);
    const rank = getRankIndex(index);
    return file === 0 || file === 7 || rank === 0 || rank === 7;
}
/**
 * Check if square is on A-file
 */
function isAFile(index) {
    return getFileIndex(index) === 0;
}
/**
 * Check if square is on H-file
 */
function isHFile(index) {
    return getFileIndex(index) === 7;
}
/**
 * Check if square is on rank 1
 */
function isRank1(index) {
    return getRankIndex(index) === 0;
}
/**
 * Check if square is on rank 8
 */
function isRank8(index) {
    return getRankIndex(index) === 7;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fen.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/utils/fen.js       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * FEN (Forsyth-Edwards Notation) parser and formatter
 *
 * FEN format: pieces turn castling enPassant halfMove fullMove
 * Example: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFEN = parseFEN;
exports.validateFEN = validateFEN;
exports.toFEN = toFEN;
exports.getStartingFEN = getStartingFEN;
const types_1 = require("../types");
const Board_1 = require("../core/Board");
const AttackDetector_1 = require("../core/AttackDetector");
const zobrist_1 = require("../core/zobrist");
const conversion_1 = require("./conversion");
const FEN_CASTLING_RE = /^(-|[KQkq]{1,4})$/;
const FEN_EN_PASSANT_RE = /^(-|[a-h][36])$/;
/**
 * Parse a FEN string into an internal board
 *
 * @param fen - FEN string
 * @returns Internal board representation
 */
function parseFEN(fen) {
    const parts = fen.trim().split(/\s+/);
    if (parts.length !== 6) {
        throw new Error(`Invalid FEN: expected 6 parts, got ${parts.length}`);
    }
    const [piecePlacement, activeColor, castling, enPassant, halfMove, fullMove] = parts;
    const board = (0, Board_1.createEmptyBoard)();
    // Parse piece placement (ranks 8 to 1, separated by /)
    const ranks = piecePlacement.split('/');
    if (ranks.length !== 8) {
        throw new Error(`Invalid FEN: expected 8 ranks, got ${ranks.length}`);
    }
    for (let rank = 0; rank < 8; rank++) {
        const rankStr = ranks[rank];
        let file = 0;
        for (const char of rankStr) {
            if (char >= '1' && char <= '8') {
                // Empty squares
                file += parseInt(char, 10);
            }
            else {
                // Piece
                const piece = fenCharToPiece(char);
                if (piece === null) {
                    throw new Error(`Invalid FEN: unknown piece character '${char}'`);
                }
                // Convert rank/file to square index
                // FEN ranks go from 8 to 1 (top to bottom)
                // Our indices go from 0 to 63 (bottom to top, left to right)
                const squareIndex = (7 - rank) * 8 + file;
                (0, Board_1.setPiece)(board, squareIndex, piece);
                file++;
            }
        }
        if (file !== 8) {
            throw new Error(`Invalid FEN: rank ${8 - rank} has ${file} files instead of 8`);
        }
    }
    // Validate piece placement has exactly one king of each color
    let whiteKings = 0;
    let blackKings = 0;
    for (const p of board.mailbox) {
        if (p === types_1.Piece.WHITE_KING)
            whiteKings++;
        if (p === types_1.Piece.BLACK_KING)
            blackKings++;
    }
    if (whiteKings !== 1 || blackKings !== 1) {
        throw new Error(`Invalid FEN: expected exactly one white king and one black king`);
    }
    // Parse active color
    if (activeColor === 'w') {
        board.turn = types_1.InternalColor.WHITE;
    }
    else if (activeColor === 'b') {
        board.turn = types_1.InternalColor.BLACK;
    }
    else {
        throw new Error(`Invalid FEN: unknown active color '${activeColor}'`);
    }
    // Validate castling rights string
    if (!FEN_CASTLING_RE.test(castling)) {
        throw new Error(`Invalid FEN: invalid castling rights '${castling}'`);
    }
    if (castling !== '-') {
        const unique = new Set(castling.split(''));
        if (unique.size !== castling.length) {
            throw new Error(`Invalid FEN: duplicate castling rights '${castling}'`);
        }
    }
    // Parse castling rights
    board.castlingRights.whiteShort = castling.includes('K');
    board.castlingRights.whiteLong = castling.includes('Q');
    board.castlingRights.blackShort = castling.includes('k');
    board.castlingRights.blackLong = castling.includes('q');
    // Parse en passant square
    if (!FEN_EN_PASSANT_RE.test(enPassant)) {
        throw new Error(`Invalid FEN: invalid en passant square '${enPassant}'`);
    }
    if (enPassant !== '-') {
        // enPassant is lowercase by regex; squareToIndex expects uppercase.
        board.enPassantSquare = (0, conversion_1.squareToIndex)(enPassant.toUpperCase());
    }
    // Parse half-move clock (for 50-move rule)
    board.halfMoveClock = parseInt(halfMove, 10);
    if (isNaN(board.halfMoveClock)) {
        throw new Error(`Invalid FEN: invalid half-move clock '${halfMove}'`);
    }
    if (board.halfMoveClock < 0) {
        throw new Error(`Invalid FEN: half-move clock must be >= 0`);
    }
    // Parse full move number
    board.fullMoveNumber = parseInt(fullMove, 10);
    if (isNaN(board.fullMoveNumber)) {
        throw new Error(`Invalid FEN: invalid full move number '${fullMove}'`);
    }
    if (board.fullMoveNumber < 1) {
        throw new Error(`Invalid FEN: full move number must be >= 1`);
    }
    // Keep zobristHash consistent for TT caching.
    board.zobristHash = (0, zobrist_1.computeZobristHash)(board);
    // Basic legality: it cannot be the case that the side who is NOT to move is in check.
    // Example: a FEN that has "w" to move while black is already in check is not a reachable
    // game state in standard chess.
    // (The side in check must be the side to move.)
    const notToMove = board.turn === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
    const originalTurn = board.turn;
    try {
        board.turn = notToMove;
        if ((0, AttackDetector_1.isKingInCheck)(board)) {
            const side = notToMove === types_1.InternalColor.WHITE ? 'white' : 'black';
            throw new Error(`Invalid FEN: ${side} is in check but it is not ${side}'s turn`);
        }
    }
    finally {
        board.turn = originalTurn;
    }
    return board;
}
/**
 * Validate a FEN string.
 *
 * This is intended for user-provided input. It throws with a descriptive message
 * when the FEN is invalid.
 */
function validateFEN(fen) {
    // parseFEN already performs full validation and throws on any error.
    parseFEN(fen);
}
/**
 * Convert an internal board to a FEN string
 *
 * @param board - Internal board
 * @returns FEN string
 */
function toFEN(board) {
    const parts = [];
    // 1. Piece placement (ranks 8 to 1)
    const rankStrings = [];
    for (let rank = 7; rank >= 0; rank--) {
        let rankStr = '';
        let emptyCount = 0;
        for (let file = 0; file < 8; file++) {
            const squareIndex = rank * 8 + file;
            const piece = board.mailbox[squareIndex];
            if (piece === types_1.Piece.EMPTY) {
                emptyCount++;
            }
            else {
                if (emptyCount > 0) {
                    rankStr += emptyCount.toString();
                    emptyCount = 0;
                }
                rankStr += pieceToFenChar(piece);
            }
        }
        if (emptyCount > 0) {
            rankStr += emptyCount.toString();
        }
        rankStrings.push(rankStr);
    }
    parts.push(rankStrings.join('/'));
    // 2. Active color
    parts.push(board.turn === types_1.InternalColor.WHITE ? 'w' : 'b');
    // 3. Castling rights
    let castling = '';
    if (board.castlingRights.whiteShort)
        castling += 'K';
    if (board.castlingRights.whiteLong)
        castling += 'Q';
    if (board.castlingRights.blackShort)
        castling += 'k';
    if (board.castlingRights.blackLong)
        castling += 'q';
    parts.push(castling || '-');
    // 4. En passant square
    if (board.enPassantSquare !== null) {
        parts.push((0, conversion_1.indexToSquare)(board.enPassantSquare).toLowerCase());
    }
    else {
        parts.push('-');
    }
    // 5. Half-move clock
    parts.push(board.halfMoveClock.toString());
    // 6. Full move number
    parts.push(board.fullMoveNumber.toString());
    return parts.join(' ');
}
/**
 * Convert a FEN character to a piece enum
 *
 * @param char - FEN character (K, Q, R, B, N, P, k, q, r, b, n, p)
 * @returns Piece enum value or null if invalid
 */
function fenCharToPiece(char) {
    switch (char) {
        case 'K': return types_1.Piece.WHITE_KING;
        case 'Q': return types_1.Piece.WHITE_QUEEN;
        case 'R': return types_1.Piece.WHITE_ROOK;
        case 'B': return types_1.Piece.WHITE_BISHOP;
        case 'N': return types_1.Piece.WHITE_KNIGHT;
        case 'P': return types_1.Piece.WHITE_PAWN;
        case 'k': return types_1.Piece.BLACK_KING;
        case 'q': return types_1.Piece.BLACK_QUEEN;
        case 'r': return types_1.Piece.BLACK_ROOK;
        case 'b': return types_1.Piece.BLACK_BISHOP;
        case 'n': return types_1.Piece.BLACK_KNIGHT;
        case 'p': return types_1.Piece.BLACK_PAWN;
        default: return null;
    }
}
/**
 * Convert a piece enum to a FEN character
 *
 * @param piece - Piece enum value
 * @returns FEN character
 */
function pieceToFenChar(piece) {
    switch (piece) {
        case types_1.Piece.WHITE_KING: return 'K';
        case types_1.Piece.WHITE_QUEEN: return 'Q';
        case types_1.Piece.WHITE_ROOK: return 'R';
        case types_1.Piece.WHITE_BISHOP: return 'B';
        case types_1.Piece.WHITE_KNIGHT: return 'N';
        case types_1.Piece.WHITE_PAWN: return 'P';
        case types_1.Piece.BLACK_KING: return 'k';
        case types_1.Piece.BLACK_QUEEN: return 'q';
        case types_1.Piece.BLACK_ROOK: return 'r';
        case types_1.Piece.BLACK_BISHOP: return 'b';
        case types_1.Piece.BLACK_KNIGHT: return 'n';
        case types_1.Piece.BLACK_PAWN: return 'p';
        default: return '';
    }
}
/**
 * Get FEN for starting position
 *
 * @returns FEN string for standard chess starting position
 */
function getStartingFEN() {
    return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"environment.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/utils/environment. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Environment detection utilities
 * Helps optimize memory usage based on runtime environment
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeEnvironment = isNodeEnvironment;
exports.isBrowserEnvironment = isBrowserEnvironment;
exports.getDefaultTTSize = getDefaultTTSize;
/**
 * Detect if code is running in Node.js environment
 *
 * @returns true if running in Node.js, false if in browser
 */
function isNodeEnvironment() {
    // Check for Node.js-specific globals
    return (typeof process !== 'undefined' &&
        process.versions != null &&
        process.versions.node != null);
}
/**
 * Detect if code is running in browser environment
 *
 * @returns true if running in browser, false if in Node.js
 */
function isBrowserEnvironment() {
    return !isNodeEnvironment();
}
/**
 * Get default transposition table size based on environment
 *
 * Node.js: 4 MB (level 3 default)
 * Browser: 2 MB (level 3 default)
 *
 * @returns Recommended TT size in MB
 */
function getDefaultTTSize() {
    return isNodeEnvironment() ? 4 : 2;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ai":{"TranspositionTable.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/ai/TranspositionTa //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Transposition Table for js-chess-engine v2
 *
 * Stores previously evaluated positions to avoid re-computation.
 * Uses Zobrist hashing for position identification.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranspositionTable = exports.TTEntryType = void 0;
exports.getRecommendedTTSize = getRecommendedTTSize;
const Evaluator_1 = require("./Evaluator");
const environment_1 = require("../utils/environment");
/** Threshold for detecting mate scores. */
const MATE_THRESHOLD = 500;
/**
 * Get recommended TT size for a given AI level and environment
 *
 * NOTE: TT size directly affects AI strength. Larger TT = better move ordering
 * and fewer re-searches, which improves play quality at higher depths.
 *
 * @param level - AI difficulty level (1-5)
 * @returns Recommended TT size in MB
 */
function getRecommendedTTSize(level) {
    if ((0, environment_1.isNodeEnvironment)()) {
        // Node.js - more generous memory allocation
        const nodeSizes = {
            1: 0.5, // Level 1: 0.5 MB
            2: 1, // Level 2: 1 MB
            3: 4, // Level 3: 4 MB (default)
            4: 16, // Level 4: 16 MB
            5: 40, // Level 5: 40 MB
        };
        return nodeSizes[level] ?? 4;
    }
    else {
        // Browser - modern-device-friendly allocation (reasonable for 2024+ devices)
        const browserSizes = {
            1: 0.25, // Level 1: 0.25 MB (ultra-lightweight)
            2: 0.5, // Level 2: 0.5 MB (mobile-friendly)
            3: 2, // Level 3: 2 MB (balanced default)
            4: 8, // Level 4: 8 MB (strong performance)
            5: 20, // Level 5: 20 MB (maximum strength)
        };
        return browserSizes[level] ?? 2;
    }
}
/**
 * Normalize a mate score for TT storage by removing the current ply component.
 * Mate scores use SCORE_MIN + ply (mated) or SCORE_MAX - ply (mating).
 * We store the distance-from-this-node instead.
 */
function adjustMateScoreForStorage(score, ply) {
    if (score > Evaluator_1.SCORE_MAX - MATE_THRESHOLD)
        return score + ply;
    if (score < Evaluator_1.SCORE_MIN + MATE_THRESHOLD)
        return score - ply;
    return score;
}
/**
 * Denormalize a mate score retrieved from TT by adding the current ply.
 */
function adjustMateScoreForRetrieval(score, ply) {
    if (score > Evaluator_1.SCORE_MAX - MATE_THRESHOLD)
        return score - ply;
    if (score < Evaluator_1.SCORE_MIN + MATE_THRESHOLD)
        return score + ply;
    return score;
}
/**
 * Types of transposition table entries
 */
var TTEntryType;
(function (TTEntryType) {
    TTEntryType[TTEntryType["EXACT"] = 0] = "EXACT";
    TTEntryType[TTEntryType["LOWER_BOUND"] = 1] = "LOWER_BOUND";
    TTEntryType[TTEntryType["UPPER_BOUND"] = 2] = "UPPER_BOUND";
})(TTEntryType || (exports.TTEntryType = TTEntryType = {}));
/**
 * Transposition Table
 *
 * Implements a hash table with replacement strategy for storing
 * previously evaluated positions.
 */
class TranspositionTable {
    table;
    size;
    currentAge = 0;
    hits = 0;
    misses = 0;
    /**
     * Create a new transposition table
     *
     * @param sizeMB - Size in megabytes (default: 16MB)
     */
    constructor(sizeMB = 16) {
        // Each entry is approximately 40 bytes
        const entrySize = 40;
        const bytesPerMB = 1024 * 1024;
        const totalBytes = sizeMB * bytesPerMB;
        // Use power of 2 for efficient modulo with bitwise AND
        this.size = Math.pow(2, Math.floor(Math.log2(totalBytes / entrySize)));
        this.table = new Array(this.size).fill(null);
    }
    /**
     * Store a position in the transposition table
     *
     * @param zobristHash - Position hash
     * @param depth - Search depth
     * @param score - Position score
     * @param type - Entry type
     * @param bestMove - Best move found
     */
    store(zobristHash, depth, score, type, bestMove, ply = 0) {
        const index = this.getIndex(zobristHash);
        const existingEntry = this.table[index];
        // Replacement strategy: always replace if:
        // 1. Slot is empty
        // 2. Same position (hash match)
        // 3. New entry has greater depth
        // 4. Entry is from previous search (old age)
        const shouldReplace = !existingEntry ||
            existingEntry.zobristHash === zobristHash ||
            depth >= existingEntry.depth ||
            existingEntry.age < this.currentAge;
        if (shouldReplace) {
            this.table[index] = {
                zobristHash,
                depth,
                score: adjustMateScoreForStorage(score, ply),
                type,
                bestMove,
                age: this.currentAge,
            };
        }
    }
    /**
     * Probe the transposition table
     *
     * @param zobristHash - Position hash
     * @param depth - Current search depth
     * @param alpha - Alpha bound
     * @param beta - Beta bound
     * @returns Entry if found and usable, null otherwise
     */
    probe(zobristHash, depth, alpha, beta, ply = 0) {
        const index = this.getIndex(zobristHash);
        const entry = this.table[index];
        // Check if entry exists and matches hash
        if (!entry || entry.zobristHash !== zobristHash) {
            this.misses++;
            return null;
        }
        // Entry must be from sufficient depth to be usable
        if (entry.depth < depth) {
            this.misses++;
            return null;
        }
        // Adjust mate scores for the current ply
        const adjustedScore = adjustMateScoreForRetrieval(entry.score, ply);
        // Count hits only when usable for pruning / exact score.
        switch (entry.type) {
            case TTEntryType.EXACT:
                this.hits++;
                return { ...entry, score: adjustedScore };
            case TTEntryType.LOWER_BOUND:
                // Fail-high (score >= beta)
                if (adjustedScore >= beta) {
                    this.hits++;
                    return { ...entry, score: adjustedScore };
                }
                break;
            case TTEntryType.UPPER_BOUND:
                // Fail-low (score <= alpha)
                if (adjustedScore <= alpha) {
                    this.hits++;
                    return { ...entry, score: adjustedScore };
                }
                break;
        }
        // Not usable for pruning, but still return for move ordering.
        return { ...entry, score: adjustedScore };
    }
    /**
     * Get best move from transposition table (for move ordering)
     *
     * @param zobristHash - Position hash
     * @returns Best move if found, null otherwise
     */
    getBestMove(zobristHash) {
        const index = this.getIndex(zobristHash);
        const entry = this.table[index];
        if (entry && entry.zobristHash === zobristHash) {
            return entry.bestMove;
        }
        return null;
    }
    /**
     * Clear the transposition table
     */
    clear() {
        this.table.fill(null);
        this.currentAge = 0;
        this.hits = 0;
        this.misses = 0;
    }
    /**
     * Increment search age (call at start of new search)
     */
    newSearch() {
        this.currentAge++;
    }
    /**
     * Get index for a hash value
     *
     * @param hash - Zobrist hash
     * @returns Table index
     */
    getIndex(hash) {
        // Use bitwise AND for fast modulo with power of 2
        return Number(hash & BigInt(this.size - 1));
    }
    /**
     * Get cache statistics
     *
     * @returns Statistics object
     */
    getStats() {
        const total = this.hits + this.misses;
        const hitRate = total > 0 ? this.hits / total : 0;
        return {
            hits: this.hits,
            misses: this.misses,
            hitRate,
            size: this.size,
        };
    }
}
exports.TranspositionTable = TranspositionTable;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Evaluator.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/ai/Evaluator.js    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Fast, deterministic evaluation.
 *
 * Design goals:
 * - Cheap (called at every leaf).
 * - Stable (no expensive strategic features).
 * - Returns a score from the perspective of `playerColor`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = exports.SCORE_MAX = exports.SCORE_MIN = void 0;
const types_1 = require("../types");
// Mate bounds used by search.
exports.SCORE_MIN = -1_000_000;
exports.SCORE_MAX = 1_000_000;
// Basic piece values (centipawns)
const V = {
    [types_1.Piece.EMPTY]: 0,
    [types_1.Piece.WHITE_PAWN]: 100,
    [types_1.Piece.BLACK_PAWN]: 100,
    [types_1.Piece.WHITE_KNIGHT]: 320,
    [types_1.Piece.BLACK_KNIGHT]: 320,
    [types_1.Piece.WHITE_BISHOP]: 320,
    [types_1.Piece.BLACK_BISHOP]: 320,
    [types_1.Piece.WHITE_ROOK]: 500,
    [types_1.Piece.BLACK_ROOK]: 500,
    [types_1.Piece.WHITE_QUEEN]: 900,
    [types_1.Piece.BLACK_QUEEN]: 900,
    [types_1.Piece.WHITE_KING]: 0,
    [types_1.Piece.BLACK_KING]: 0,
};
// Tiny PSTs (values from White perspective, A1..H8).
const PST_PAWN = new Int16Array([
    0, 0, 0, 0, 0, 0, 0, 0,
    10, 10, 10, 10, 10, 10, 10, 10,
    2, 2, 4, 6, 6, 4, 2, 2,
    1, 1, 2, 8, 8, 2, 1, 1,
    0, 0, 0, 6, 6, 0, 0, 0,
    1, 1, 1, -2, -2, 1, 1, 1,
    1, 1, 1, -4, -4, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0,
]);
const PST_KNIGHT = new Int16Array([
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 6, 6, 5, 0, -10,
    -10, 2, 6, 8, 8, 6, 2, -10,
    -10, 0, 6, 8, 8, 6, 0, -10,
    -10, 2, 4, 6, 6, 4, 2, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -10, -10, -10, -10, -20,
]);
const PST_BISHOP = new Int16Array([
    -10, -5, -5, -5, -5, -5, -5, -10,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 3, 5, 5, 3, 0, -5,
    -5, 2, 5, 7, 7, 5, 2, -5,
    -5, 0, 5, 7, 7, 5, 0, -5,
    -5, 2, 3, 5, 5, 3, 2, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -10, -5, -5, -5, -5, -5, -5, -10,
]);
const PST_ROOK = new Int16Array([
    0, 0, 2, 4, 4, 2, 0, 0,
    0, 0, 2, 4, 4, 2, 0, 0,
    0, 0, 2, 4, 4, 2, 0, 0,
    0, 0, 2, 4, 4, 2, 0, 0,
    0, 0, 2, 4, 4, 2, 0, 0,
    2, 2, 4, 6, 6, 4, 2, 2,
    5, 5, 5, 7, 7, 5, 5, 5,
    0, 0, 2, 4, 4, 2, 0, 0,
]);
const PST_QUEEN = new Int16Array([
    -10, -5, -5, -2, -2, -5, -5, -10,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 2, 2, 2, 2, 0, -5,
    -2, 0, 2, 3, 3, 2, 0, -2,
    -2, 0, 2, 3, 3, 2, 0, -2,
    -5, 0, 2, 2, 2, 2, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -10, -5, -5, -2, -2, -5, -5, -10,
]);
const PST_KING = new Int16Array([
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    10, 10, 0, 0, 0, 0, 10, 10,
    20, 30, 10, 0, 0, 10, 30, 20,
]);
function mirrorSquare(sq) {
    const rank = (sq / 8) | 0;
    const file = sq & 7;
    return (7 - rank) * 8 + file;
}
function pst(piece, square) {
    const isWhite = piece >= types_1.Piece.WHITE_PAWN && piece <= types_1.Piece.WHITE_KING;
    const sq = isWhite ? mirrorSquare(square) : square;
    switch (piece) {
        case types_1.Piece.WHITE_PAWN:
        case types_1.Piece.BLACK_PAWN:
            return PST_PAWN[sq];
        case types_1.Piece.WHITE_KNIGHT:
        case types_1.Piece.BLACK_KNIGHT:
            return PST_KNIGHT[sq];
        case types_1.Piece.WHITE_BISHOP:
        case types_1.Piece.BLACK_BISHOP:
            return PST_BISHOP[sq];
        case types_1.Piece.WHITE_ROOK:
        case types_1.Piece.BLACK_ROOK:
            return PST_ROOK[sq];
        case types_1.Piece.WHITE_QUEEN:
        case types_1.Piece.BLACK_QUEEN:
            return PST_QUEEN[sq];
        case types_1.Piece.WHITE_KING:
        case types_1.Piece.BLACK_KING:
            return PST_KING[sq];
        default:
            return 0;
    }
}
class Evaluator {
    static evaluate(board, playerColor, plyFromRoot = 0) {
        if (board.isCheckmate) {
            const losing = board.turn === playerColor;
            return losing ? (exports.SCORE_MIN + plyFromRoot) : (exports.SCORE_MAX - plyFromRoot);
        }
        if (board.isStalemate)
            return 0;
        let white = 0;
        let black = 0;
        const mb = board.mailbox;
        for (let sq = 0; sq < 64; sq++) {
            const p = mb[sq];
            if (!p)
                continue;
            const val = (V[p] ?? 0) + pst(p, sq);
            if (p <= types_1.Piece.WHITE_KING)
                white += val;
            else
                black += val;
        }
        const scoreFromWhite = white - black;
        return playerColor === types_1.InternalColor.WHITE ? scoreFromWhite : -scoreFromWhite;
    }
}
exports.Evaluator = Evaluator;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AIEngine.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/ai/AIEngine.js     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * AI Engine for js-chess-engine v2
 *
 * Orchestrates the AI search and provides level-based difficulty settings.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIEngine = void 0;
const Search_1 = require("./Search");
const MoveGenerator_1 = require("../core/MoveGenerator");
const types_1 = require("../types");
/**
 * AI level to depth mapping
 * Based on v1 behavior for compatibility
 */
const LEVEL_CONFIG = {
    // NOTE: Depth is the single biggest speed lever.
    // These values are intentionally conservative for browser-friendliness.
    // Tuning note (2026-02): lower levels intentionally omit tactical extensions
    // (check extensions + deep quiescence) so they're easier to beat.
    1: { baseDepth: 1, extendedDepth: 0, checkExtension: false, qMaxDepth: 0 }, // Beginner
    2: { baseDepth: 2, extendedDepth: 0, checkExtension: true, qMaxDepth: 0 }, // Easy
    3: { baseDepth: 2, extendedDepth: 1, checkExtension: true, qMaxDepth: 1 }, // Intermediate (default)
    4: { baseDepth: 3, extendedDepth: 2, checkExtension: true, qMaxDepth: 2 }, // Advanced
    5: { baseDepth: 4, extendedDepth: 3, checkExtension: true, qMaxDepth: 4 }, // Expert (unchanged)
};
/**
 * AI Engine class
 * Manages AI move selection and search
 */
class AIEngine {
    search;
    currentTTSize = 16;
    constructor() {
        this.search = new Search_1.Search(this.currentTTSize);
    }
    /**
     * Find the best move for the current position
     *
     * @param board - Current board state
    * @param level - AI difficulty level (1-5, default 3)
     * @param ttSizeMB - Transposition table size in MB (0 to disable, min 0.25 MB, auto-scaled by level)
     * @returns Best move found by the AI
     */
    findBestMove(board, level = 3, ttSizeMB = 16, depth, randomness) {
        const result = this.findBestMoveDetailed(board, { level, ttSizeMB, depth, analysis: false, randomness });
        return result ? result.move : null;
    }
    /**
     * Find the best move, including optional analysis (root move scores).
     *
     * Used by the public `ai(..., { analysis: true })` API.
     */
    findBestMoveDetailed(board, options = {}) {
        const level = options.level ?? 3;
        const ttSizeMB = options.ttSizeMB ?? 16;
        // Recreate search if TT size changed
        if (ttSizeMB !== this.currentTTSize) {
            this.currentTTSize = ttSizeMB;
            this.search = new Search_1.Search(ttSizeMB);
        }
        // Get depth configuration for this level, then apply overrides
        const config = LEVEL_CONFIG[level];
        const baseDepth = options.depth?.base ?? config.baseDepth;
        const extendedDepth = options.depth?.extended ?? config.extendedDepth;
        const qMaxDepth = options.depth?.quiescence ?? config.qMaxDepth;
        const checkExtension = options.depth?.check ?? config.checkExtension;
        // Pick an effective depth based on current position complexity.
        // This keeps early/midgame conservative, but lets endgames search deeper.
        const effectiveDepth = this.getAdaptiveDepth(board, baseDepth, extendedDepth);
        // On move 1 (both white and black), inject opening randomness so two AIs
        // never play the same game. All reasonable first moves score within this range.
        // Only applies when randomness was not explicitly set by the caller.
        const OPENING_RANDOMNESS = 5;
        const effectiveRandomness = options.randomness === undefined && board.fullMoveNumber === 1
            ? OPENING_RANDOMNESS
            : (options.randomness ?? 0);
        // Perform search
        return this.search.findBestMove(board, effectiveDepth, qMaxDepth, checkExtension, {
            analysis: options.analysis ?? false,
            randomness: effectiveRandomness,
        });
    }
    /**
    * Get the search depth for a given AI level
     *
    * @param level - AI level (1-5)
     * @returns Depth configuration
     */
    static getLevelDepth(level) {
        return LEVEL_CONFIG[level];
    }
    /**
     * Adaptive depth heuristic.
     *
     * Contract:
     * - Input: board + baseDepth (from level)
     * - Output: adjusted depth (>= 1)
     *
    * Heuristic goals:
    * - Never search shallower than the requested level depth.
    * - If there are very few root legal moves (tactical / constrained), allow +1.
    * - If the position is simplified (few pieces), allow +1 or +2.
     */
    getAdaptiveDepth(board, baseDepth, allowedExtendedDepth) {
        if (allowedExtendedDepth <= 0)
            return Math.max(1, baseDepth);
        // Root branching factor (legal moves only)
        const rootMoves = (0, MoveGenerator_1.generateLegalMoves)(board).length;
        // Material simplification proxy: count non-empty pieces.
        // (Mailbox is Int8Array, so iterating it is cheap.)
        let pieceCount = 0;
        for (const p of board.mailbox) {
            if (p !== types_1.Piece.EMPTY)
                pieceCount++;
        }
        let depth = baseDepth;
        // Simplified endgames: search deeper.
        // 32 pieces = starting position. Kings-only = 2.
        if (pieceCount <= 10)
            depth += 2;
        else if (pieceCount <= 18)
            depth += 1;
        // Constrained positions: deeper can be affordable and tactically valuable.
        if (rootMoves <= 12)
            depth += 1;
        // Safety rails
        if (depth < baseDepth)
            depth = baseDepth;
        if (depth < 1)
            depth = 1;
        const maxDepth = baseDepth + allowedExtendedDepth;
        if (depth > maxDepth)
            depth = maxDepth;
        return depth;
    }
}
exports.AIEngine = AIEngine;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Search.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/ai/Search.js       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Minimal, fast negamax alpha-beta search.
 *
 * Goals:
 * - Browser-friendly: bounded work, no expensive root guardrails.
 * - Deterministic.
 * - Uses TT + basic move ordering for practical strength.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const types_1 = require("../types");
const MoveGenerator_1 = require("../core/MoveGenerator");
const Board_1 = require("../core/Board");
const AttackDetector_1 = require("../core/AttackDetector");
const conversion_1 = require("../utils/conversion");
const Evaluator_1 = require("./Evaluator");
const TranspositionTable_1 = require("./TranspositionTable");
const MoveOrdering_1 = require("./MoveOrdering");
// Keep within evaluator bounds.
const INF = Evaluator_1.SCORE_MAX;
class Search {
    nodesSearched = 0;
    qMaxDepth = 4;
    checkExtension = true;
    transpositionTable;
    killerMoves;
    constructor(ttSizeMB = 16) {
        this.transpositionTable = ttSizeMB > 0 ? new TranspositionTable_1.TranspositionTable(ttSizeMB) : null;
        this.killerMoves = new MoveOrdering_1.KillerMoves();
    }
    clear() {
        this.transpositionTable?.clear();
        this.killerMoves.clear();
    }
    findBestMove(board, baseDepth, qMaxDepth = 4, checkExtension = true, options = {}) {
        this.qMaxDepth = qMaxDepth;
        this.checkExtension = checkExtension;
        this.nodesSearched = 0;
        this.transpositionTable?.newSearch();
        this.killerMoves.clear();
        const analysis = options.analysis ?? false;
        const randomness = options.randomness ?? 0;
        const moves = (0, MoveGenerator_1.generateLegalMoves)(board);
        if (moves.length === 0) {
            const inCheck = (0, AttackDetector_1.isKingInCheck)(board);
            const score = inCheck ? (Evaluator_1.SCORE_MIN + 0) : 0;
            return { move: null, score, depth: 0, nodesSearched: this.nodesSearched };
        }
        let bestMove = null;
        let bestScore = Evaluator_1.SCORE_MIN;
        let scoredMoves;
        // Iterative deepening: search depth 1..baseDepth.
        // Populates TT progressively for better move ordering at deeper levels.
        const ASPIRATION_DELTA = 25;
        for (let d = 1; d <= baseDepth; d++) {
            // Collect root scores at final depth: for analysis or randomness (both need accurate scores)
            const collectScores = (d === baseDepth) && (randomness > 0 || analysis);
            // Aspiration window: use previous iteration's score for d >= 4
            let alpha = Evaluator_1.SCORE_MIN;
            let beta = Evaluator_1.SCORE_MAX;
            let delta = ASPIRATION_DELTA;
            if (d >= 4 && bestScore > Evaluator_1.SCORE_MIN && bestScore < Evaluator_1.SCORE_MAX) {
                alpha = (bestScore - delta);
                beta = (bestScore + delta);
            }
            // Aspiration retry loop
            let iterBestMove = null;
            let iterBestScore = Evaluator_1.SCORE_MIN;
            let iterScoredMoves = null;
            while (true) {
                const pvMove = this.transpositionTable?.getBestMove(board.zobristHash) ?? null;
                const selector = new MoveOrdering_1.MoveSelector(moves, pvMove, this.killerMoves, 0);
                iterScoredMoves = collectScores ? [] : null;
                iterBestMove = null;
                iterBestScore = Evaluator_1.SCORE_MIN;
                let iterAlpha = alpha;
                let move;
                let moveIndex = 0;
                while ((move = selector.pickNext()) !== null) {
                    if ((move.flags & types_1.MoveFlag.PROMOTION) && move.promotionPiece) {
                        const isQueenPromotion = move.promotionPiece === types_1.Piece.WHITE_QUEEN ||
                            move.promotionPiece === types_1.Piece.BLACK_QUEEN;
                        if (!isQueenPromotion)
                            continue;
                    }
                    const child = (0, Board_1.copyBoard)(board);
                    (0, MoveGenerator_1.applyMoveComplete)(child, move);
                    const extension = (this.checkExtension && child.isCheck) ? 1 : 0;
                    let score;
                    if (moveIndex === 0) {
                        score = -this.negamax(child, d - 1 + extension, -beta, -iterAlpha, 1);
                    }
                    else {
                        // PVS: zero window search first
                        score = -this.negamax(child, d - 1 + extension, -iterAlpha - 1, -iterAlpha, 1);
                        // Re-search with full window if it beats alpha
                        if (score > iterAlpha && score < beta) {
                            score = -this.negamax(child, d - 1 + extension, -beta, -iterAlpha, 1);
                        }
                    }
                    moveIndex++;
                    if (iterScoredMoves) {
                        iterScoredMoves.push({ move, score });
                    }
                    if (score > iterBestScore || iterBestMove === null) {
                        iterBestScore = score;
                        iterBestMove = move;
                    }
                    if (score > iterAlpha)
                        iterAlpha = score;
                    if (iterAlpha >= beta)
                        break;
                }
                // Check aspiration window result
                if (d >= 4 && (alpha > Evaluator_1.SCORE_MIN || beta < Evaluator_1.SCORE_MAX)) {
                    if (iterBestScore <= alpha) {
                        // Fail low - widen alpha
                        delta *= 2;
                        alpha = (delta > 400) ? Evaluator_1.SCORE_MIN : Math.max(Evaluator_1.SCORE_MIN, alpha - delta);
                        continue;
                    }
                    if (iterBestScore >= beta) {
                        // Fail high - widen beta
                        delta *= 2;
                        beta = (delta > 400) ? Evaluator_1.SCORE_MAX : Math.min(Evaluator_1.SCORE_MAX, beta + delta);
                        continue;
                    }
                }
                break;
            }
            if (iterScoredMoves) {
                iterScoredMoves.sort((a, b) => b.score - a.score);
                scoredMoves = iterScoredMoves;
                // Derive best move from the sorted array — more reliable than iterBestMove
                // because iterAlpha shifts during the loop when disablePVS is true.
                if (iterScoredMoves.length > 0) {
                    bestMove = iterScoredMoves[0].move;
                    bestScore = iterScoredMoves[0].score;
                }
            }
            else if (iterBestMove) {
                bestMove = iterBestMove;
                bestScore = iterBestScore;
            }
        }
        // Apply randomness: pick randomly among moves within `randomness` cp of the best score.
        // Locked to the same quality tier as the best move: if the best move is a capture,
        // only randomize among captures — never pick a quiet move over a winning capture.
        if (randomness > 0 && scoredMoves && scoredMoves.length > 1) {
            const threshold = bestScore - randomness;
            let candidates = scoredMoves.filter(e => e.score >= threshold);
            if (candidates.length > 1) {
                const bestIsCapture = !!(scoredMoves[0].move.flags & types_1.MoveFlag.CAPTURE);
                if (bestIsCapture) {
                    const captureCandidates = candidates.filter(e => e.move.flags & types_1.MoveFlag.CAPTURE);
                    if (captureCandidates.length > 0)
                        candidates = captureCandidates;
                }
                bestMove = candidates[Math.floor(Math.random() * candidates.length)].move;
            }
        }
        return bestMove
            ? { move: bestMove, score: bestScore, depth: baseDepth, nodesSearched: this.nodesSearched, scoredMoves }
            : null;
    }
    negamax(board, depth, alpha, beta, ply) {
        this.nodesSearched++;
        if (depth <= 0) {
            return this.quiescence(board, alpha, beta, ply, 0);
        }
        // TT probe
        const tt = this.transpositionTable;
        const hash = board.zobristHash;
        let ttMove = null;
        if (tt) {
            const entry = tt.probe(hash, depth, alpha, beta, ply);
            if (entry) {
                ttMove = entry.bestMove;
                if (entry.type === TranspositionTable_1.TTEntryType.EXACT)
                    return entry.score;
                if (entry.type === TranspositionTable_1.TTEntryType.LOWER_BOUND && entry.score >= beta)
                    return entry.score;
                if (entry.type === TranspositionTable_1.TTEntryType.UPPER_BOUND && entry.score <= alpha)
                    return entry.score;
            }
        }
        const moves = (0, MoveGenerator_1.generatePseudoLegalMoves)(board);
        const selector = new MoveOrdering_1.MoveSelector(moves, ttMove, this.killerMoves, ply);
        const startAlpha = alpha;
        let bestScore = -INF;
        let bestMove = null;
        let legalMoveCount = 0;
        let move;
        while ((move = selector.pickNext()) !== null) {
            if ((move.flags & types_1.MoveFlag.PROMOTION) && move.promotionPiece) {
                const isQueenPromotion = move.promotionPiece === types_1.Piece.WHITE_QUEEN ||
                    move.promotionPiece === types_1.Piece.BLACK_QUEEN;
                if (!isQueenPromotion)
                    continue;
            }
            const child = (0, Board_1.copyBoard)(board);
            (0, MoveGenerator_1.applyMoveComplete)(child, move);
            // Skip illegal moves (own king left in check)
            if (this.isIllegalMove(child))
                continue;
            legalMoveCount++;
            const extension = (this.checkExtension && child.isCheck) ? 1 : 0;
            let score;
            if (legalMoveCount === 1) {
                // First move (PV move): search with full window
                score = -this.negamax(child, depth - 1 + extension, -beta, -alpha, ply + 1);
            }
            else {
                // PVS: search with zero window first
                score = -this.negamax(child, depth - 1 + extension, -alpha - 1, -alpha, ply + 1);
                // Re-search with full window if it beats alpha
                if (score > alpha && score < beta) {
                    score = -this.negamax(child, depth - 1 + extension, -beta, -alpha, ply + 1);
                }
            }
            if (score > bestScore || bestMove === null) {
                bestScore = score;
                bestMove = move;
            }
            if (score > alpha)
                alpha = score;
            if (alpha >= beta) {
                this.killerMoves.store(move, ply);
                break;
            }
        }
        // No legal moves: checkmate or stalemate
        if (legalMoveCount === 0) {
            if ((0, AttackDetector_1.isKingInCheck)(board))
                return Evaluator_1.SCORE_MIN + ply;
            return 0;
        }
        // TT store
        if (tt && bestMove) {
            let type = TranspositionTable_1.TTEntryType.EXACT;
            if (bestScore <= startAlpha)
                type = TranspositionTable_1.TTEntryType.UPPER_BOUND;
            else if (bestScore >= beta)
                type = TranspositionTable_1.TTEntryType.LOWER_BOUND;
            tt.store(hash, depth, bestScore, type, bestMove, ply);
        }
        return bestScore;
    }
    quiescence(board, alpha, beta, ply, qDepth) {
        this.nodesSearched++;
        // Stand-pat: evaluate before move generation
        const standPat = Evaluator_1.Evaluator.evaluate(board, board.turn, ply);
        if (standPat >= beta)
            return standPat;
        if (standPat > alpha)
            alpha = standPat;
        if (qDepth >= this.qMaxDepth)
            return standPat;
        // Generate pseudo-legal moves, collect forcing (captures + promotions)
        const allMoves = (0, MoveGenerator_1.generatePseudoLegalMoves)(board);
        const forcingMask = types_1.MoveFlag.CAPTURE | types_1.MoveFlag.PROMOTION;
        const forcing = [];
        for (let i = 0; i < allMoves.length; i++) {
            if (allMoves[i].flags & forcingMask)
                forcing.push(allMoves[i]);
        }
        const tt = this.transpositionTable;
        const ttMove = tt ? tt.getBestMove(board.zobristHash) : null;
        const selector = new MoveOrdering_1.MoveSelector(forcing, ttMove, this.killerMoves, ply);
        let bestScore = standPat;
        let legalForcingFound = false;
        let move;
        while ((move = selector.pickNext()) !== null) {
            if ((move.flags & types_1.MoveFlag.PROMOTION) && move.promotionPiece) {
                const isQueenPromotion = move.promotionPiece === types_1.Piece.WHITE_QUEEN ||
                    move.promotionPiece === types_1.Piece.BLACK_QUEEN;
                if (!isQueenPromotion)
                    continue;
            }
            const child = (0, Board_1.copyBoard)(board);
            (0, MoveGenerator_1.applyMoveComplete)(child, move);
            // Skip illegal moves
            if (this.isIllegalMove(child))
                continue;
            legalForcingFound = true;
            const score = -this.quiescence(child, -beta, -alpha, ply + 1, qDepth + 1);
            if (score > bestScore)
                bestScore = score;
            if (score >= beta)
                return score;
            if (score > alpha)
                alpha = score;
        }
        // Mate detection: if in check and no legal forcing move, check for any legal escape
        if (!legalForcingFound && (0, AttackDetector_1.isKingInCheck)(board)) {
            for (const m of allMoves) {
                // Skip forcing moves (already checked above)
                if ((m.flags & types_1.MoveFlag.CAPTURE) || (m.flags & types_1.MoveFlag.PROMOTION))
                    continue;
                const child = (0, Board_1.copyBoard)(board);
                (0, MoveGenerator_1.applyMoveComplete)(child, m);
                if (!this.isIllegalMove(child))
                    return standPat; // Has legal quiet escape
            }
            return Evaluator_1.SCORE_MIN + ply; // Checkmate
        }
        return bestScore;
    }
    /**
     * Check if a move was illegal (left own king in check) after applyMoveComplete.
     * After applyMoveComplete, board.turn has switched, so the "previous" side
     * is the opponent of board.turn.
     */
    isIllegalMove(child) {
        const prevColor = child.turn === types_1.InternalColor.WHITE ? types_1.InternalColor.BLACK : types_1.InternalColor.WHITE;
        const prevKingBB = prevColor === types_1.InternalColor.WHITE ? child.whiteKing : child.blackKing;
        if (prevKingBB === 0n)
            return false;
        const prevKingSq = (0, conversion_1.getLowestSetBit)(prevKingBB);
        return (0, AttackDetector_1.isSquareAttacked)(child, prevKingSq, child.turn);
    }
}
exports.Search = Search;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MoveOrdering.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/ai/MoveOrdering.js //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * Extremely small move ordering module.
 *
 * Goals:
 * - Be deterministic and fast.
 * - Provide “good enough” ordering for alpha-beta.
 * - Avoid expensive heuristics (SEE / legal-move regeneration / etc.).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveSelector = exports.KillerMoves = void 0;
const types_1 = require("../types");
const PIECE_VALUE = {
    [types_1.Piece.EMPTY]: 0,
    [types_1.Piece.WHITE_PAWN]: 100,
    [types_1.Piece.BLACK_PAWN]: 100,
    [types_1.Piece.WHITE_KNIGHT]: 320,
    [types_1.Piece.BLACK_KNIGHT]: 320,
    [types_1.Piece.WHITE_BISHOP]: 320,
    [types_1.Piece.BLACK_BISHOP]: 320,
    [types_1.Piece.WHITE_ROOK]: 500,
    [types_1.Piece.BLACK_ROOK]: 500,
    [types_1.Piece.WHITE_QUEEN]: 900,
    [types_1.Piece.BLACK_QUEEN]: 900,
    [types_1.Piece.WHITE_KING]: 20000,
    [types_1.Piece.BLACK_KING]: 20000,
};
class KillerMoves {
    killers;
    maxPly;
    constructor(maxPly = 64) {
        this.maxPly = maxPly;
        this.killers = Array.from({ length: maxPly }, () => [null, null]);
    }
    clear() {
        this.killers = Array.from({ length: this.maxPly }, () => [null, null]);
    }
    store(move, ply) {
        if (ply < 0 || ply >= this.maxPly)
            return;
        if (move.flags & types_1.MoveFlag.CAPTURE)
            return; // captures are ordered separately
        const k1 = this.killers[ply][0];
        if (k1 && k1.from === move.from && k1.to === move.to)
            return;
        this.killers[ply][1] = k1;
        this.killers[ply][0] = move;
    }
    isKiller(move, ply) {
        if (ply < 0 || ply >= this.maxPly)
            return false;
        const [k1, k2] = this.killers[ply];
        return !!((k1 && k1.from === move.from && k1.to === move.to) ||
            (k2 && k2.from === move.from && k2.to === move.to));
    }
}
exports.KillerMoves = KillerMoves;
function mvvLvaScore(move) {
    // MVV-LVA: prioritize winning captures.
    const victim = PIECE_VALUE[move.capturedPiece] ?? 0;
    const attacker = PIECE_VALUE[move.piece] ?? 0;
    return victim * 16 - attacker;
}
/**
 * Incremental move ordering via selection sort.
 * Scores all moves upfront, then picks the best remaining move on demand.
 * On beta cutoffs, the remaining unsorted moves are never touched.
 */
class MoveSelector {
    moves;
    scores;
    n;
    cursor = 0;
    constructor(moves, ttMove, killers, ply) {
        this.moves = moves;
        this.n = moves.length;
        const scores = new Int32Array(this.n);
        for (let i = 0; i < this.n; i++) {
            const m = moves[i];
            let score = 0;
            if (ttMove && m.from === ttMove.from && m.to === ttMove.to) {
                score += 10_000_000;
            }
            if ((m.flags & types_1.MoveFlag.PROMOTION) && (m.promotionPiece === types_1.Piece.WHITE_QUEEN || m.promotionPiece === types_1.Piece.BLACK_QUEEN)) {
                score += 9_000_000;
            }
            if (m.flags & types_1.MoveFlag.CAPTURE) {
                score += 5_000_000 + mvvLvaScore(m);
            }
            if (killers && killers.isKiller(m, ply)) {
                score += 3_000_000;
            }
            scores[i] = score;
        }
        this.scores = scores;
    }
    /** Return the next best move, or null when exhausted. */
    pickNext() {
        const { cursor, n, scores, moves } = this;
        if (cursor >= n)
            return null;
        // Find best in [cursor..n)
        let bestIdx = cursor;
        let bestScore = scores[cursor];
        for (let j = cursor + 1; j < n; j++) {
            if (scores[j] > bestScore) {
                bestScore = scores[j];
                bestIdx = j;
            }
        }
        // Swap to cursor position
        if (bestIdx !== cursor) {
            const tmpMove = moves[cursor];
            moves[cursor] = moves[bestIdx];
            moves[bestIdx] = tmpMove;
            scores[bestIdx] = scores[cursor];
        }
        this.cursor++;
        return moves[cursor];
    }
}
exports.MoveSelector = MoveSelector;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"adapters":{"APIAdapter.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-chess/node_modules/js-chess-engine/dist/adapters/APIAdapte //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
/**
 * API Adapter for converting between internal and external representations
 *
 * Internal format uses:
 * - Square indices (0-63)
 * - Piece enums
 * - InternalColor enum
 *
 * External format (v1 API) uses:
 * - Square strings (A1-H8)
 * - Piece symbols (K, Q, R, B, N, P, k, q, r, b, n, p)
 * - Color strings ('white', 'black')
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardToConfig = boardToConfig;
exports.configToBoard = configToBoard;
exports.configToFEN = configToFEN;
exports.movesToMap = movesToMap;
exports.movesFromSquare = movesFromSquare;
exports.pieceToSymbol = pieceToSymbol;
exports.symbolToPiece = symbolToPiece;
exports.colorToInternal = colorToInternal;
exports.internalToColor = internalToColor;
exports.normalizeSquare = normalizeSquare;
const types_1 = require("../types");
const conversion_1 = require("../utils/conversion");
/**
 * Convert internal board to public board configuration
 *
 * @param board - Internal board representation
 * @returns Public board configuration (v1 API format)
 */
function boardToConfig(board) {
    const pieces = {};
    // Convert mailbox to pieces object
    for (let i = 0; i < 64; i++) {
        const piece = board.mailbox[i];
        if (piece !== types_1.Piece.EMPTY) {
            const square = (0, conversion_1.indexToSquare)(i);
            const symbol = pieceToSymbol(piece);
            if (symbol) {
                pieces[square] = symbol;
            }
        }
    }
    return {
        pieces,
        turn: board.turn === types_1.InternalColor.WHITE ? 'white' : 'black',
        isFinished: board.isCheckmate || board.isStalemate,
        check: board.isCheck,
        checkMate: board.isCheckmate,
        staleMate: board.isStalemate,
        castling: { ...board.castlingRights },
        enPassant: board.enPassantSquare !== null ? (0, conversion_1.indexToSquare)(board.enPassantSquare) : null,
        halfMove: board.halfMoveClock,
        fullMove: board.fullMoveNumber,
    };
}
/**
 * Convert public board configuration to internal board
 *
 * @param config - Public board configuration
 * @returns Internal board representation
 */
function configToBoard(config) {
    // We'll use FEN conversion for this as it's more straightforward
    // First convert config to FEN, then parse FEN to internal board
    // However, for simplicity, we can also build it directly
    const { parseFEN } = require('../utils/fen');
    const fen = configToFEN(config);
    return parseFEN(fen);
}
/**
 * Convert board configuration to FEN string
 *
 * @param config - Public board configuration
 * @returns FEN string
 */
function configToFEN(config) {
    // Build piece placement string
    const ranks = [];
    for (let rank = 7; rank >= 0; rank--) {
        let rankStr = '';
        let emptyCount = 0;
        for (let file = 0; file < 8; file++) {
            const square = (0, conversion_1.indexToSquare)((rank * 8 + file));
            const piece = config.pieces[square];
            if (!piece) {
                emptyCount++;
            }
            else {
                if (emptyCount > 0) {
                    rankStr += emptyCount.toString();
                    emptyCount = 0;
                }
                rankStr += piece;
            }
        }
        if (emptyCount > 0) {
            rankStr += emptyCount.toString();
        }
        ranks.push(rankStr);
    }
    const piecePlacement = ranks.join('/');
    const activeColor = config.turn === 'white' ? 'w' : 'b';
    let castling = '';
    if (config.castling.whiteShort)
        castling += 'K';
    if (config.castling.whiteLong)
        castling += 'Q';
    if (config.castling.blackShort)
        castling += 'k';
    if (config.castling.blackLong)
        castling += 'q';
    if (!castling)
        castling = '-';
    const enPassant = config.enPassant ? config.enPassant.toLowerCase() : '-';
    const halfMove = config.halfMove.toString();
    const fullMove = config.fullMove.toString();
    return `${piecePlacement} ${activeColor} ${castling} ${enPassant} ${halfMove} ${fullMove}`;
}
/**
 * Convert internal moves to public moves map
 *
 * @param moves - Array of internal moves
 * @returns Public moves map (from-square -> [to-squares])
 */
function movesToMap(moves) {
    const movesMap = {};
    for (const move of moves) {
        const fromSquare = (0, conversion_1.indexToSquare)(move.from);
        const toSquare = (0, conversion_1.indexToSquare)(move.to);
        if (!movesMap[fromSquare]) {
            movesMap[fromSquare] = [];
        }
        movesMap[fromSquare].push(toSquare);
    }
    return movesMap;
}
/**
 * Convert internal moves from a specific square to array of to-squares
 *
 * @param moves - Array of internal moves
 * @param fromIndex - From square index
 * @returns Array of to-square strings
 */
function movesFromSquare(moves, fromIndex) {
    return moves
        .filter(move => move.from === fromIndex)
        .map(move => (0, conversion_1.indexToSquare)(move.to));
}
/**
 * Convert piece enum to piece symbol
 *
 * @param piece - Internal piece enum
 * @returns Piece symbol or null if empty
 */
function pieceToSymbol(piece) {
    switch (piece) {
        case types_1.Piece.WHITE_KING: return 'K';
        case types_1.Piece.WHITE_QUEEN: return 'Q';
        case types_1.Piece.WHITE_ROOK: return 'R';
        case types_1.Piece.WHITE_BISHOP: return 'B';
        case types_1.Piece.WHITE_KNIGHT: return 'N';
        case types_1.Piece.WHITE_PAWN: return 'P';
        case types_1.Piece.BLACK_KING: return 'k';
        case types_1.Piece.BLACK_QUEEN: return 'q';
        case types_1.Piece.BLACK_ROOK: return 'r';
        case types_1.Piece.BLACK_BISHOP: return 'b';
        case types_1.Piece.BLACK_KNIGHT: return 'n';
        case types_1.Piece.BLACK_PAWN: return 'p';
        default: return null;
    }
}
/**
 * Convert piece symbol to piece enum
 *
 * @param symbol - Piece symbol
 * @returns Internal piece enum
 */
function symbolToPiece(symbol) {
    switch (symbol) {
        case 'K': return types_1.Piece.WHITE_KING;
        case 'Q': return types_1.Piece.WHITE_QUEEN;
        case 'R': return types_1.Piece.WHITE_ROOK;
        case 'B': return types_1.Piece.WHITE_BISHOP;
        case 'N': return types_1.Piece.WHITE_KNIGHT;
        case 'P': return types_1.Piece.WHITE_PAWN;
        case 'k': return types_1.Piece.BLACK_KING;
        case 'q': return types_1.Piece.BLACK_QUEEN;
        case 'r': return types_1.Piece.BLACK_ROOK;
        case 'b': return types_1.Piece.BLACK_BISHOP;
        case 'n': return types_1.Piece.BLACK_KNIGHT;
        case 'p': return types_1.Piece.BLACK_PAWN;
    }
}
/**
 * Convert color string to internal color
 *
 * @param color - Color string
 * @returns Internal color enum
 */
function colorToInternal(color) {
    return color === 'white' ? types_1.InternalColor.WHITE : types_1.InternalColor.BLACK;
}
/**
 * Convert internal color to color string
 *
 * @param color - Internal color enum
 * @returns Color string
 */
function internalToColor(color) {
    return color === types_1.InternalColor.WHITE ? 'white' : 'black';
}
/**
 * Normalize square string to uppercase (A1-H8)
 * V1 API accepts case-insensitive input
 *
 * @param square - Square string (case-insensitive)
 * @returns Normalized uppercase square string
 */
function normalizeSquare(square) {
    return square.toUpperCase();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/chess.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/assets/assets.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/assets/briefcomponent/briefcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/assets/briefcomponent/template.briefcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/project.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/project-startend.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/project-2d3d.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/square.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/move.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/piece.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/gamestate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/gamestate-moves.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/reward.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interfacemanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/gamemanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessonmanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/rewardsmanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/audiomanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/interface.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/intro/intro.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/intro/template.intro.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/playerstatus/playerstatus.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/playerstatus/template.playerstatus.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/lessons/lessons.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/lessons/template.lessons.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/lesson/lesson.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/lesson/template.lesson.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/playstart/playstart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/playstart/template.playstart.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/play/play.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/play/template.play.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/play/playercard/playercard.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/play/playercard/template.playercard.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/play/moveshistory/moveshistory.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/play/moveshistory/template.moveshistory.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/about/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/about/template.about.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/shop/shop.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/shop/template.shop.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/boarddisplaychoice/boarddisplaychoice.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/boarddisplaychoice/template.boarddisplaychoice.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/earnings/earnings.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/earnings/template.earnings.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/chessboard.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/template.chessboard.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/component.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/twodimensional.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/template.twodimensional.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/twodimensional-animation.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/twodimensional-dragging.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/square/square.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/square/template.square.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/piece/piece.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/piece/template.piece.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/markup/markup.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/markup/template.markup.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/promotion/promotion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/chessboard/twodimensional/promotion/template.promotion.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/action.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/backtomenu.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/displayboardcoordinates.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/flipboard.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/boarddisplaytype.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/audio.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/interfacetheme.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/chessboardtheme.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/history.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/autopromotion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/interface/actions/autoflipboard.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/lesson.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/lesson-ai.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/category.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/piececategory.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/steps/step.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/steps/template.step.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/steps/positionstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/steps/endstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lesson/steps/template.endstep.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/lessons.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/pawnmovement.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/pawndoublestep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/pawncapture.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/stuckpawns.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/enpassant.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/pawnsstrongertogether.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/pawnchains.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/knightmovement.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/knightscenicroute.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/knightjumps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/knightcapture.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/knightinpursuit.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/knightonrim.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/bishopmovement.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/blockedbishop.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/twobishopstwocolors.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/bishopcapture.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/rookmovement.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/rookcapture.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/blockedrook.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/openingthefile.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/rooknevertires.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/queenmovement.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/queencapture.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/respectthequeen.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/pawnpromotion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/kingmovement.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/check.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/kingdanger.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/capturingattacker.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/blockingcheck.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/checkmate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/stalemate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/castling.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/kingscanttouch.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/kingjoinsfight.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/categories/categories.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/categories/pawn.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/categories/knight.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/categories/bishop.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/categories/rook.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/categories/queen.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/lessons/categories/king.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/rewards/rewards.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/rewards/lessoncompleted.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-chess/rewards/lessonrepeated.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pixeltosh-chess", {
  PixelArtAcademy: PixelArtAcademy
});

})();
