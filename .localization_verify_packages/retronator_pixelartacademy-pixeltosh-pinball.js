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
var __coffeescriptShare, file, value;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixeltosh-pinball":{"pinball.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/pinball.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, FM, LM, PAA, _cursorRaycaster, _rayEnd;
AE = Artificial.Everywhere;
AB = Artificial.Base;
AM = Artificial.Mirage;
FM = FataMorgana;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
_cursorRaycaster = new THREE.Raycaster();
_rayEnd = new THREE.Vector3();
PAA.Pixeltosh.Programs.Pinball = function () {
  class Pinball extends PAA.Pixeltosh.Program {
    // cameraDisplayType: enum whether the camera should be perspective or orthographic
    // debugPhysics: boolean whether to show debug view of the playfield
    // slowMotion: boolean whether to progress the simulation in slow motion
    // displayWalls: boolean whether to display the walls part
    // ballTravelExtents: how far any ball has traveled, used for task completion
    //   x, y, z:
    //     min, max: the minimum and maximum value in the given axis
    // highScore: the highest amount of points scored in a single game
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball';
    }
    static version() {
      return '0.1.0';
    }
    static fullName() {
      return "弹球创作套件";
    }
    static description() {
      return "一个自己动手做的弹球游戏。";
    }
    static slug() {
      return 'pinball';
    }
    static resetBallExtents() {
      var ballExtents;
      ballExtents = {
        x: {
          min: Number.POSITIVE_INFINITY,
          max: Number.NEGATIVE_INFINITY
        },
        y: {
          min: Number.POSITIVE_INFINITY,
          max: Number.NEGATIVE_INFINITY
        },
        z: {
          min: Number.POSITIVE_INFINITY,
          max: Number.NEGATIVE_INFINITY
        }
      };
      this.state('ballTravelExtents', ballExtents);
      return ballExtents;
    }
    constructor() {
      super(...arguments);

      // Prepare all reactive fields.
      this.rendererManager = new ReactiveField(null);
      this.sceneManager = new ReactiveField(null);
      this.cameraManager = new ReactiveField(null);
      this.physicsManager = new ReactiveField(null);
      this.inputManager = new ReactiveField(null);
      this.gameManager = new ReactiveField(null);
      this.editorManager = new ReactiveField(null);
      this.audioManager = new ReactiveField(null);
      this.mouse = new ReactiveField(null);
      this.openedFile = new ReactiveField(null);
      this.projectId = new AE.LiveComputedField(() => {
        var file;
        if (!(file = this.openedFile())) {
          return;
        }
        return file.data();
      });

      // Try to load the project from content in case it's not the player's project.
      this.autorun(computation => {
        var projectId;
        if (!(projectId = this.projectId())) {
          return;
        }
        return PAA.Practice.Project.forId.subscribeContent(projectId);
      });
      this.autorun(computation => {
        var projectId;
        if (!(projectId = this.projectId())) {
          return;
        }
        if (!PAA.Practice.Project.documents.findOne(projectId)) {
          return;
        }
        return PAA.Practice.Project.assetsForProjectId.subscribeContent(projectId);
      });
      this.partsData = new AE.LiveComputedField(() => {
        var project, projectId;
        if (!(projectId = this.projectId())) {
          return;
        }
        if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
          return;
        }
        return project.playfield;
      });
      this.debugPhysics = this.state.field('debugPhysics', {
        default: false
      });
      this.slowMotion = this.state.field('slowMotion', {
        default: false
      });
      this.displayWalls = this.state.field('displayWalls', {
        default: true
      });
      this.showGrid = this.state.field('showGrid', {
        default: false
      });
      this.sceneImage = new ReactiveField(null);
    }
    destroy() {
      super.destroy(...arguments);
      this.partsData.stop();
      return this.projectId.stop();
    }
    getPartData(playfieldPartId) {
      var ref;
      return (ref = this.partsData()) != null ? ref[playfieldPartId] : void 0;
    }
    load(file) {
      var layouts;
      super.load(...arguments);

      // Reactively set the waiting cursor.
      this.autorun(computation => {
        var osCursor, ref;
        if (!(osCursor = this.os.cursor())) {
          return;
        }
        if (!(((ref = this.sceneManager()) != null ? ref.ready() : void 0) || !this.loaded())) {
          return osCursor.wait(this);
        } else {
          return osCursor.endWait(this);
        }
      });
      if (file == null) {
        file = new PAA.Pixeltosh.OS.FileSystem.File({
          id: "".concat(PAA.Pixeltosh.Programs.Pinball.id(), ".PinballMachine"),
          data: () => {
            return AB.Router.getParameter('projectId') || AB.Router.getParameter('parameter4') || this.constructor.Project.state('activeProjectId');
          }
        });
      }
      this.openFile(file);
      this.windowId = this.os.addWindow(this.constructor.Interface.createInterfaceData());
      this.app = this.os.ancestorComponentOfType(Artificial.Base.App);
      this.app.addComponent(this);

      // Initialize components.
      this.sceneManager(new this.constructor.SceneManager(this));
      this.cameraManager(new this.constructor.CameraManager(this));
      this.rendererManager(new this.constructor.RendererManager(this));
      this.physicsManager(new this.constructor.PhysicsManager(this));
      this.inputManager(new this.constructor.InputManager(this));
      this.gameManager(new this.constructor.GameManager(this));
      this.editorManager(new this.constructor.EditorManager(this));
      this.audioManager(new this.constructor.AudioManager(this));
      this.mouse(new this.constructor.Mouse(this));
      this.sceneImage(new AM.PixelImage({
        display: this.os.display,
        image: this.rendererManager().renderer.domElement
      }));

      // Reactively change the interface layout.
      layouts = this.constructor.Interface.createLayoutsData(this);
      this._layoutAutorun = this.autorun(computation => {
        var window;
        if (!(window = this.os.interface.getWindow(this.windowId))) {
          return;
        }
        return window.data().set('contentArea', layouts[this.constructor.Interface.determineLayout(this)]);
      });

      // Subscribe to the macintosh palette.
      this._macintoshPaletteSubscription = LOI.Assets.Palette.forName.subscribeContent(LOI.Assets.Palette.SystemPaletteNames.Macintosh);

      // Track how far the player has pushed the ball for progression purposes.
      if (!(this._ballTravelExtents = this.state('ballTravelExtents'))) {
        return this._ballTravelExtents = this.constructor.resetBallExtents();
      }
    }
    unload() {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
      super.unload(...arguments);
      this.app.removeComponent(this);
      if ((ref = this.sceneManager()) != null) {
        ref.destroy();
      }
      if ((ref1 = this.cameraManager()) != null) {
        ref1.destroy();
      }
      if ((ref2 = this.rendererManager()) != null) {
        ref2.destroy();
      }
      if ((ref3 = this.physicsManager()) != null) {
        ref3.destroy();
      }
      if ((ref4 = this.inputManager()) != null) {
        ref4.destroy();
      }
      if ((ref5 = this.gameManager()) != null) {
        ref5.destroy();
      }
      if ((ref6 = this.editorManager()) != null) {
        ref6.destroy();
      }
      this.sceneManager(null);
      this.cameraManager(null);
      this.rendererManager(null);
      this.physicsManager(null);
      this.inputManager(null);
      this.gameManager(null);
      this.editorManager(null);
      this.mouse(null);
      this.sceneImage(null);
      this._layoutAutorun.stop();
      this._macintoshPaletteSubscription.stop();
      if ((ref7 = this.os.cursor()) != null) {
        ref7.endWait();
      }
      return this.state('ballTravelExtents', this._ballTravelExtents);
    }
    openFile(file) {
      this.openedFile(file);

      // Progress gameplay.
      if (file.id() === "".concat(PAA.Pixeltosh.Programs.Pinball.id(), ".PinballMachine")) {
        return LM.PixelArtFundamentals.Fundamentals.state('openedPinballMachine', true);
      }
    }
    onBackButton() {
      var gameManager;
      // Pressing escape returns to edit mode if edit is unlocked.
      gameManager = this.gameManager();
      if (!gameManager.inEdit() && this.editModeUnlocked()) {
        gameManager.edit();

        // Inform that we've handled the back button.
        return true;
      }
    }
    editModeUnlocked() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawGobbleHole.getAdventureInstance().completed();
    }
    update(appTime) {
      var ball, ballRenderObject, camera, cameraManager, editorManager, entities, entity, gameManager, hoveredEntity, hoveredPart, i, j, k, len, len1, len2, physicsManager, ref, renderObject, results, sceneManager, shape, viewportCoordinates;
      // Update physics.
      if (!(physicsManager = this.physicsManager())) {
        return;
      }
      physicsManager.update(appTime);
      gameManager = this.gameManager();
      sceneManager = this.sceneManager();
      cameraManager = this.cameraManager();
      editorManager = this.editorManager();

      // Quantize position when in normal view.
      if (cameraManager.displayType() === Pinball.CameraManager.DisplayTypes.Orthographic && !this.debugPhysics()) {
        ref = sceneManager.renderObjects();
        for (i = 0, len = ref.length; i < len; i++) {
          renderObject = ref[i];
          if (!(shape = renderObject.entity.shape())) {
            continue;
          }
          if (!shape.positionSnapping()) {
            continue;
          }
          this.constructor.CameraManager.snapShapeToPixelPosition(shape, renderObject.position, renderObject.getRotationQuaternionForSnapping(), renderObject.lastPosition);
        }
      }

      // Update the hovered part.
      hoveredPart = null;
      if (viewportCoordinates = this.mouse().viewportCoordinates()) {
        camera = cameraManager.camera();
        // Update the raycaster.
        _cursorRaycaster.setFromCamera(viewportCoordinates, camera);
        _cursorRaycaster.ray.at(camera.far, _rayEnd);
        hoveredEntity = physicsManager.intersectObject(_cursorRaycaster.ray.origin, _rayEnd);
        if (hoveredEntity instanceof this.constructor.Part) {
          hoveredPart = hoveredEntity;
        }
      }
      editorManager.hoveredPart(hoveredPart);

      // Update the parts.
      entities = sceneManager.entities();
      for (j = 0, len1 = entities.length; j < len1; j++) {
        entity = entities[j];
        if (typeof entity.update === "function") {
          entity.update(appTime);
        }
      }

      // Update ball extents and kill balls that go outside the playfield.
      results = [];
      for (k = 0, len2 = entities.length; k < len2; k++) {
        entity = entities[k];
        if (!(entity instanceof Pinball.Ball)) {
          continue;
        }
        ball = entity;
        ballRenderObject = ball.getRenderObject();
        this._ballTravelExtents.x.min = Math.min(this._ballTravelExtents.x.min, ballRenderObject.position.x);
        this._ballTravelExtents.x.max = Math.max(this._ballTravelExtents.x.max, ballRenderObject.position.x);
        this._ballTravelExtents.y.min = Math.min(this._ballTravelExtents.y.min, ballRenderObject.position.y);
        this._ballTravelExtents.y.max = Math.max(this._ballTravelExtents.y.max, ballRenderObject.position.y);
        this._ballTravelExtents.z.min = Math.min(this._ballTravelExtents.z.min, ballRenderObject.position.z);
        this._ballTravelExtents.z.max = Math.max(this._ballTravelExtents.z.max, ballRenderObject.position.z);
        if (ballRenderObject.position.y < -1) {
          ball.die();
          results.push(gameManager.removeBall(ball));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
    fixedUpdate(elapsed) {
      var audioManager, entity, i, len, ref, sceneManager;
      sceneManager = this.sceneManager();
      ref = sceneManager.entities();
      for (i = 0, len = ref.length; i < len; i++) {
        entity = ref[i];
        if (typeof entity.fixedUpdate === "function") {
          entity.fixedUpdate(elapsed);
        }
      }
      audioManager = this.audioManager();
      return audioManager.fixedUpdate(elapsed);
    }
    draw(appTime) {
      var ref;
      return (ref = this.rendererManager()) != null ? ref.draw(appTime) : void 0;
    }
    menuItems() {
      return this.constructor.Interface.createMenuItems();
    }
    shortcuts() {
      return this.constructor.Interface.createShortcuts();
    }
  }
  ;
  Pinball.register(Pinball.id());
  Pinball.initialize();
  return Pinball;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assets.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/assets.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Assets = function () {
  class Assets {}
  ;
  Assets.Asset = class Asset extends PAA.Practice.Project.Asset.Bitmap {
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Macintosh;
    }
    static backgroundColor() {
      return new THREE.Color('#edddb5');
    }
    static availablePublications() {
      return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.PinballMagazine.Issue1'];
    }
  };
  Assets.Ball = function () {
    class Ball extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Ball';
      }
      static displayName() {
        return "Ball";
      }
      static description() {
        return "一个在弹球球场上弹跳的球。\n必须呈圆形，以表示可以滚动的球体。";
      }
      static fixedDimensions() {
        return {
          width: 7,
          height: 7
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/ball.png';
      }
    }
    ;
    Ball.initialize();
    return Ball;
  }.call(this);
  Assets.Plunger = function () {
    class Plunger extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Plunger';
      }
      static displayName() {
        return "Plunger";
      }
      static description() {
        return "一个弹簧杆，推动球沿发射道前进。";
      }
      static fixedDimensions() {
        return {
          width: 15,
          height: 30
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/plunger.png';
      }
    }
    ;
    Plunger.initialize();
    return Plunger;
  }.call(this);
  Assets.Playfield = function () {
    class Playfield extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Playfield';
      }
      static displayName() {
        return "Playfield";
      }
      static description() {
        return "带有墙壁和球导轨的弹球机表面。\n你画的着色部分（黑色或白色）会阻挡球，未着色（擦除）会让球自由滚动。";
      }
      static fixedDimensions() {
        return {
          width: 180,
          height: 200
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/ballguides.png';
      }
      static unlockedPublications() {
        return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.PinballMagazine.Issue1'];
      }
      static unlockedPublicationParts() {
        return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.PinballMagazine.Issue1.PrewarMachines'];
      }
    }
    ;
    Playfield.initialize();
    return Playfield;
  }.call(this);
  Assets.GobbleHole = function () {
    class GobbleHole extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.GobbleHole';
      }
      static displayName() {
        return "吞球洞";
      }
      static description() {
        return "球场上如果球落入其中就会得分的洞。\n使用黑色轮廓，里面用任何颜色。\n你可以做成任何形状，多大或多小都可以。";
      }
      static fixedDimensions() {
        return {
          width: 50,
          height: 50
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/gobblehole.png';
      }
      static unlockedPublicationParts() {
        return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.PinballMagazine.Issue1.GobbleHoles'];
      }
    }
    ;
    GobbleHole.initialize();
    return GobbleHole;
  }.call(this);
  Assets.BallTrough = function () {
    class BallTrough extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.BallTrough';
      }
      static displayName() {
        return "Drain";
      }
      static description() {
        return "结束球而不得分的洞。\n和吞噬洞一样，它可以任何形状。";
      }
      static fixedDimensions() {
        return {
          width: 100,
          height: 50
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/balltrough.png';
      }
    }
    ;
    BallTrough.initialize();
    return BallTrough;
  }.call(this);
  Assets.Bumper = function () {
    class Bumper extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Bumper';
      }
      static displayName() {
        return "弹射器";
      }
      static description() {
        return "画一个弹球的目标顶部。圆形效果最好。";
      }
      static fixedDimensions() {
        return {
          width: 30,
          height: 30
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/bumper.png';
      }
      static pixelArtEvaluation() {
        return true;
      }
      static unlockedPublicationParts() {
        return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.PinballMagazine.Issue1.Bumpers'];
      }
      static properties() {
        return {
          pixelArtScaling: true,
          pixelArtEvaluation: {}
        };
      }
    }
    ;
    Bumper.initialize();
    return Bumper;
  }.call(this);
  Assets.Gate = function () {
    class Gate extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Gate';
      }
      static displayName() {
        return "闸门";
      }
      static description() {
        return "一个绕顶部旋转的翻板门。\n从正面画，足够大以阻挡球。";
      }
      static fixedDimensions() {
        return {
          width: 20,
          height: 20
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/gate.png';
      }
      static unlockedPublicationParts() {
        return ['PixelArtAcademy.LearnMode.PixelArtFundamentals.Fundamentals.Publications.PinballMagazine.Issue1.Gates'];
      }
    }
    ;
    Gate.initialize();
    return Gate;
  }.call(this);
  Assets.Flipper = function () {
    class Flipper extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Flipper';
      }
      static displayName() {
        return "Flipper";
      }
      static description() {
        return "弹球最标志性的部分！画左挡板在静止状态。\n它将围绕从左上角对角线数的第7个像素旋转。";
      }
      static fixedDimensions() {
        return {
          width: 30,
          height: 30
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/flipper.png';
      }
    }
    ;
    Flipper.initialize();
    return Flipper;
  }.call(this);
  Assets.SpinningTarget = function () {
    class SpinningTarget extends Assets.Asset {
      static id() {
        return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.SpinningTarget';
      }
      static displayName() {
        return "Spinning target";
      }
      static description() {
        return "球通过时旋转的金属板。";
      }
      static fixedDimensions() {
        return {
          width: 20,
          height: 20
        };
      }
      static imageUrls() {
        return '/pixelartacademy/pixeltosh/programs/pinball/parts/spinningtarget.png';
      }
    }
    ;
    SpinningTarget.initialize();
    return SpinningTarget;
  }.call(this);
  return Assets;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/project.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Project = class Project extends PAA.Practice.Project.Thing {
  // activeProjectId: ID of the project that is currently active

  // Project document fields
  // playfield: an object with all the pinball parts on the playfield
  //   {playfieldPartId}: a random ID of this part instance
  //     type: the thing id of the pinball part
  //     position: the position of the part on the playfield in meters, (0, 0) is top-left
  //       x, y
  //     rotationAngle: the angle
  //     flipped: boolean whether the part mesh should be mirrored horizontally
  //     ...
  static id() {
    return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Project';
  }
  static fullName() {
    return "弹球";
  }
  static iconUrl() {
    return this.versionedUrl("/pixelartacademy/pixeltosh/programs/pinball/icon-project.png");
  }
  static program() {
    return Pinball;
  }
  constructor() {
    super(...arguments);
    this._assets = {};
    this._assetsUpdatedDependency = new Tracker.Dependency();
    this.autorun(computation => {
      var activeProjectId, asset, assetClass, assetId, i, len, project, ref, ref1;
      activeProjectId = PAA.Pixeltosh.Programs.Pinball.Project.state('activeProjectId');
      project = PAA.Practice.Project.documents.findOne(activeProjectId);
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
  content() {
    var chapter;
    if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
      return;
    }
    return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.Projects.Pinball);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"project-startend.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/project-startend.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Project = function () {
  class Project extends Pinball.Project {
    static start() {
      var creationTime, pixelSize, profileId, projectId;
      if (Pinball.Project.state('activeProjectId')) {
        // Make sure the player doesn't have an already active project.
        throw new AE.InvalidOperationException("Profile already has an active Pinball project.");
      }
      profileId = LOI.adventure.profileId();
      creationTime = new Date();
      // Create the project.
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      projectId = PAA.Practice.Project.documents.insert({
        startTime: creationTime,
        lastEditTime: creationTime,
        type: Pinball.Project.id(),
        profileId: profileId,
        assets: [],
        playfield: {
          ["".concat(Random.id())]: {
            type: Pinball.Parts.Playfield.id(),
            position: {
              x: 90 * pixelSize,
              z: 100 * pixelSize
            }
          },
          ["".concat(Random.id())]: {
            type: Pinball.Parts.Walls.id(),
            position: {
              x: 90 * pixelSize,
              z: 100 * pixelSize
            }
          },
          ["".concat(Random.id())]: {
            type: Pinball.Parts.WireBallGuides.id(),
            position: {
              x: 90 * pixelSize,
              z: 100 * pixelSize
            }
          },
          ["".concat(Random.id())]: {
            type: Pinball.Parts.Pins.id(),
            position: {
              x: 90 * pixelSize,
              z: 100 * pixelSize
            }
          },
          ["".concat(Random.id())]: {
            type: Pinball.Parts.BallSpawner.id(),
            position: {
              x: 173.5 * pixelSize,
              z: 156.5 * pixelSize
            }
          },
          ["".concat(Random.id())]: {
            type: Pinball.Parts.Plunger.id(),
            position: {
              x: 173.5 * pixelSize,
              z: 189.5 * pixelSize
            }
          }
        }
      });

      // Write the project ID into profile's game state.
      return Pinball.Project.state('activeProjectId', projectId);
    }
    static end() {
      var endTime, projectId;
      // Make sure the player has an active project.
      projectId = Pinball.Project.state('activeProjectId');
      if (!projectId) {
        throw new AE.InvalidOperationException("Profile does not have an active Pinball project.");
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
      return Pinball.Project.state('activeProjectId', null);
    }
  }
  ;
  Project.initialize();
  return Project;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/instructions.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  LOI,
  PAA,
  Pinball,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Instructions = function () {
  class Instructions {}
  ;
  Instructions.Instruction = class Instruction extends PAA.Pixeltosh.Instructions.Instruction {
    static getPinball() {
      var os, program;
      if (!(os = PAA.PixelPad.Apps.Pixeltosh.getOS())) {
        return;
      }
      program = os.activeProgram();
      if (!(program instanceof Pinball)) {
        return;
      }
      return program;
    }
  };
  Instructions.InvalidPlayfield = function () {
    class InvalidPlayfield extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Instructions.InvalidPlayfield";
      }
      static message() {
        return "哎呀，球场好像无效！你有重叠的洞吗？";
      }
      static activeConditions() {
        var pinball, playfield, ref, shape;
        if (!(pinball = this.getPinball())) {
          return;
        }

        // Show when the playfield doesn't have a valid shape.
        if (!(playfield = (ref = pinball.sceneManager()) != null ? ref.getPartOfType(Pinball.Parts.Playfield) : void 0)) {
          return;
        }
        if (!(shape = playfield.shape())) {
          return;
        }
        return !shape.geometryData.indexBufferArray.length;
      }
      faceClass() {
        return PAA.Pixeltosh.Instructions.FaceClasses.OhNo;
      }
    }
    ;
    InvalidPlayfield.initialize();
    return InvalidPlayfield;
  }.call(this);
  Instructions.FlatPlayfield = function () {
    class FlatPlayfield extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Instructions.FlatPlayfield";
      }
      static message() {
        return "哎呀，球场是平的！你必须在设置中将其倾斜超过0度。";
      }
      static activeConditions() {
        var pinball, playfield, ref;
        if (!(pinball = this.getPinball())) {
          return;
        }

        // Show when the playfield's angle is 0.
        if (!(playfield = (ref = pinball.sceneManager()) != null ? ref.getPartOfType(Pinball.Parts.Playfield) : void 0)) {
          return;
        }
        return playfield.data().angleDegrees === 0;
      }
      faceClass() {
        return PAA.Pixeltosh.Instructions.FaceClasses.OhNo;
      }
    }
    ;
    FlatPlayfield.initialize();
    return FlatPlayfield;
  }.call(this);
  Instructions.InvalidPartInstruction = class InvalidPartInstruction extends Instructions.Instruction {
    static invalidPart() {
      throw new AE.NotImplementedException("Invalid part instruction must determine the invalid part.");
    }
    static activeConditions() {
      return this.invalidPart();
    }
    faceClass() {
      return PAA.Pixeltosh.Instructions.FaceClasses.OhNo;
    }
    message() {
      var invalidPart, templateMessage;
      templateMessage = super.message(...arguments);
      if (!(invalidPart = this.constructor.invalidPart())) {
        return;
      }
      return templateMessage.replace("%%partName%%", invalidPart.fullName());
    }
  };
  Instructions.InvalidPartRequiringACore = function () {
    class InvalidPartRequiringACore extends Instructions.InvalidPartInstruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Instructions.InvalidPartRequiringACore";
      }
      static message() {
        return "哎呀，%%partName%%好像无效！它至少有3x3的区域着色吗？";
      }
      static invalidPart() {
        var i, j, k, len, len1, len2, part, partClass, partClassesRequiringACore, parts, partsView, pinball, ref, ref1, ref2, shape;
        if (!(pinball = this.getPinball())) {
          return;
        }
        partClassesRequiringACore = [Pinball.Parts.BallSpawner, Pinball.Parts.BallTrough, Pinball.Parts.Bumper, Pinball.Parts.Flipper, Pinball.Parts.Gate, Pinball.Parts.GobbleHole, Pinball.Parts.Plunger, Pinball.Parts.SpinningTarget];
        parts = [];

        // If the parts view is open, we can determine if the part is OK before it is placed on the playfield.
        if (partsView = pinball.os.interface.getView(Pinball.Interface.Parts)) {
          ref = partsView.parts;
          for (i = 0, len = ref.length; i < len; i++) {
            part = ref[i];
            if (ref1 = part.constructor, indexOf.call(partClassesRequiringACore, ref1) >= 0) {
              parts.push(part);
            }
          }
        }

        // Even if the parts view is not open, make sure all parts
        // have their shape (parts view might not even be unlocked yet).
        for (j = 0, len1 = partClassesRequiringACore.length; j < len1; j++) {
          partClass = partClassesRequiringACore[j];
          if (!(part = (ref2 = pinball.sceneManager()) != null ? ref2.getPartOfType(partClass) : void 0)) {
            continue;
          }
          parts.push(part);
        }
        for (k = 0, len2 = parts.length; k < len2; k++) {
          part = parts[k];
          if (!(shape = part.shape())) {
            continue;
          }
          if (shape instanceof Pinball.Part.Avatar.Box) {
            return part;
          }
        }
        return null;
      }
    }
    ;
    InvalidPartRequiringACore.initialize();
    return InvalidPartRequiringACore;
  }.call(this);
  Instructions.InvalidPart = function () {
    class InvalidPart extends Instructions.InvalidPartInstruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Instructions.InvalidPart";
      }
      static message() {
        return "哎呀，%%partName%%好像无效！你为它画了什么吗？";
      }
      static invalidPart() {
        var i, len, part, parts, partsView, pinball;
        if (!(pinball = this.getPinball())) {
          return;
        }
        parts = _.clone(pinball.sceneManager().parts());

        // If the parts view is open, we can determine if the part is OK before it is placed on the playfield.
        if (partsView = pinball.os.interface.getView(Pinball.Interface.Parts)) {
          parts.push(...partsView.parts);
        }
        for (i = 0, len = parts.length; i < len; i++) {
          part = parts[i];
          if (!part.pixelArtEvaluation()) {
            continue;
          }
          if (!part.shape()) {
            return part;
          }
        }
        return null;
      }
    }
    ;
    InvalidPart.initialize();
    return InvalidPart;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"scenemanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/scenemanager.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  AM,
  LOI,
  PAA,
  Pinball,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.SceneManager = function () {
  class SceneManager {
    constructor(pinball) {
      var defaultBallPositionY;
      this.pinball = pinball;
      this.scene = new THREE.Scene();
      this.scene.manager = this;
      // Create lighting.
      this.ambientLight = new THREE.AmbientLight();
      this.scene.add(this.ambientLight);
      this.debugAmbientLight = new THREE.AmbientLight();
      this.debugAmbientLight.intensity = 0.5;
      this.debugAmbientLight.layers.set(Pinball.RendererManager.RenderLayers.PhysicsDebug);
      this.scene.add(this.debugAmbientLight);
      this.debugDirectionalLight = new THREE.DirectionalLight();
      this.debugDirectionalLight.intensity = 0.5;
      this.debugDirectionalLight.position.set(-0.25, 1, -0.5);
      this.debugDirectionalLight.castShadow = true;
      this.debugDirectionalLight.shadow.normalBias = -0.0001;
      this.debugDirectionalLight.shadow.mapSize.x = 4096;
      this.debugDirectionalLight.shadow.mapSize.y = 4096;
      this.debugDirectionalLight.shadow.camera.left = -0.75;
      this.debugDirectionalLight.shadow.camera.right = 0.75;
      this.debugDirectionalLight.shadow.camera.top = 0.75;
      this.debugDirectionalLight.shadow.camera.bottom = -0.75;
      this.debugDirectionalLight.shadow.camera.near = 0.5;
      this.debugDirectionalLight.shadow.camera.far = 1.5;
      this.debugDirectionalLight.layers.set(Pinball.RendererManager.RenderLayers.PhysicsDebug);
      this.scene.add(this.debugDirectionalLight);
      this.debugPointLight = new THREE.PointLight();
      this.debugPointLight.intensity = 0.3;
      this.debugPointLight.position.set(this.constructor.playfieldWidth / 2, 0.3, this.constructor.shortPlayfieldDepth / 2);
      this.debugPointLight.layers.set(Pinball.RendererManager.RenderLayers.PhysicsDebug);
      this.scene.add(this.debugPointLight);
      this._parts = [];
      this.parts = new ReactiveField(this._parts);
      // Instantiate playfield parts based on the data.
      this._partsAutorun = this.pinball.autorun(() => {
        var i, len, newPartData, newPartsData, newPlayfieldPartId, part, remainingPlayfieldPartIds, results;
        remainingPlayfieldPartIds = function () {
          var i, len, ref, results;
          ref = this._parts;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            part = ref[i];
            results.push(part.playfieldPartId);
          }
          return results;
        }.call(this);
        if (!(newPartsData = this.pinball.partsData())) {
          return;
        }
        for (newPlayfieldPartId in newPartsData) {
          newPartData = newPartsData[newPlayfieldPartId];
          if (indexOf.call(remainingPlayfieldPartIds, newPlayfieldPartId) >= 0) {
            // Part has already been instantiated.
            _.pull(remainingPlayfieldPartIds, newPlayfieldPartId);
          } else {
            // This is a new part. Instantiate it and add it to the scene.
            Tracker.nonreactive(() => {
              return this._addPart(newPlayfieldPartId, newPartData);
            });
          }
        }
        // Any leftover remaining parts have been removed.
        results = [];
        for (i = 0, len = remainingPlayfieldPartIds.length; i < len; i++) {
          newPlayfieldPartId = remainingPlayfieldPartIds[i];
          results.push(Tracker.nonreactive(() => {
            return this._removePartWithId(newPlayfieldPartId);
          }));
        }
        return results;
      });
      this.entities = new AE.LiveComputedField(() => {
        var entities, gameManager, i, len, part, ref, simulationActive;
        if (!(gameManager = this.pinball.gameManager())) {
          return [];
        }
        simulationActive = gameManager.simulationActive();
        entities = [];
        ref = this.parts();
        for (i = 0, len = ref.length; i < len; i++) {
          part = ref[i];
          if (part instanceof Pinball.Parts.BallSpawner && simulationActive) {
            continue;
          }
          if (!(this.pinball.displayWalls() || simulationActive)) {
            if (part instanceof Pinball.Parts.Walls) {
              continue;
            }
            if (part instanceof Pinball.Parts.Playfield) {
              continue;
            }
          }
          entities.push(part);
        }
        if (simulationActive) {
          entities.push(...gameManager.balls());
        }
        return entities;
      });

      // Add render objects to the scene.
      this.renderObjects = new AE.ReactiveArray(() => {
        var entity, i, len, ref, renderObject, results;
        ref = this.entities();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          entity = ref[i];
          if (renderObject = entity.getRenderObject()) {
            results.push(renderObject);
          }
        }
        return results;
      }, {
        added: renderObject => {
          return this.scene.add(renderObject);
        },
        removed: renderObject => {
          return this.scene.remove(renderObject);
        }
      });

      // Detect ball Y coordinate.
      this._ballSpawner = new Pinball.Parts.BallSpawner(this.pinball);
      defaultBallPositionY = 0.0135;
      this.ballPositionY = new AE.LiveComputedField(() => {
        var bitmap, pixelArtEvaluation, shape;
        if (!(bitmap = this._ballSpawner.bitmap())) {
          return defaultBallPositionY;
        }
        pixelArtEvaluation = new PAA.Practice.PixelArtEvaluation(bitmap);
        shape = Pinball.Part.Avatar.Sphere.detectShape(pixelArtEvaluation, {});
        pixelArtEvaluation.destroy();
        return (shape != null ? shape.positionY() : void 0) || defaultBallPositionY;
      });
      this.ready = new AE.LiveComputedField(() => {
        var parts, partsData;
        parts = this.parts();
        if (!(partsData = this.pinball.partsData())) {
          return;
        }
        if (_.keys(partsData).length !== parts.length) {
          return;
        }
        return _.every(parts, part => {
          return part.ready();
        });
      });
    }
    destroy() {
      var i, len, part, ref;
      this._partsAutorun.stop();
      this.entities.stop();
      this.renderObjects.stop();
      ref = this._parts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.destroy();
      }
      this._ballSpawner.destroy();
      this.ballPositionY.stop();
      return this.ready.stop();
    }
    getPart(playfieldPartId) {
      return _.find(this.parts(), part => {
        return part.playfieldPartId === playfieldPartId;
      });
    }
    getPartOfType(partType) {
      return _.find(this.parts(), part => {
        return part instanceof partType;
      });
    }
    _addPart(playfieldPartId, partData) {
      var part, partClass;
      partClass = _.thingClass(partData.type);
      part = new partClass(this.pinball, playfieldPartId);
      // Do any extra initialization logic (after the avatar is created in the constructor).
      part.initialize();
      // Update parts array.
      this._parts.push(part);
      return this.parts(this._parts);
    }
    _removePartWithId(playfieldPartId) {
      var part;
      part = _.find(this._parts, part => {
        return part.playfieldPartId === playfieldPartId;
      });
      // Update parts array.
      _.pull(this._parts, part);
      this.parts(this._parts);
      return Tracker.afterFlush(() => {
        // Destroy the part.
        return part.destroy();
      });
    }
  }
  ;
  SceneManager.playfieldWidth = 1 / 2; // m

  SceneManager.shortPlayfieldDepth = 5 / 9; // m

  SceneManager.standardPlayfieldDepth = 1; // m

  SceneManager.playfieldHeight = 0.05; // m

  return SceneManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cameramanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/cameramanager.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA, Pinball, _translationToRotationOrigin;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_translationToRotationOrigin = new THREE.Vector3();
Pinball.CameraManager = function () {
  class CameraManager {
    static snapShapeToPixelPosition(shape, position, rotationQuaternion, lastPosition) {
      var bitmapRotationOriginX, bitmapRotationOriginY, pixelCenterScreenX, pixelCenterScreenY, rotationOriginScreenX, rotationOriginScreenY, rotationOriginX, rotationOriginZ;
      bitmapRotationOriginX = 0.5 + Math.floor(shape.bitmapOrigin.x);
      bitmapRotationOriginY = 0.5 + Math.floor(shape.bitmapOrigin.y);
      _translationToRotationOrigin.x = (bitmapRotationOriginX - shape.bitmapOrigin.x) * this.orthographicPixelSize;
      _translationToRotationOrigin.y = 0;
      _translationToRotationOrigin.z = (bitmapRotationOriginY - shape.bitmapOrigin.y) * this.orthographicPixelSize;
      _translationToRotationOrigin.applyQuaternion(rotationQuaternion);
      rotationOriginX = position.x + _translationToRotationOrigin.x;
      rotationOriginZ = position.z + _translationToRotationOrigin.z;
      rotationOriginScreenX = rotationOriginX / this.orthographicPixelSize;
      rotationOriginScreenY = rotationOriginZ / this.orthographicPixelSize;
      pixelCenterScreenX = Math.round(rotationOriginScreenX - 0.5) + 0.5;
      pixelCenterScreenY = Math.round(rotationOriginScreenY - 0.5) + 0.5;

      // If last (snapped) position is specified, make sure the change would
      // be significant enough, so we prevent alternating when at the edge of the pixels.
      if (lastPosition && Math.abs(lastPosition.x - position.x) < this.significantPositionDeviation) {
        position.x = lastPosition.x;
      } else {
        position.x += (pixelCenterScreenX - rotationOriginScreenX) * this.orthographicPixelSize;
      }
      if (lastPosition && Math.abs(lastPosition.z - position.z) < this.significantPositionDeviation) {
        return position.z = lastPosition.z;
      } else {
        return position.z += (pixelCenterScreenY - rotationOriginScreenY) * this.orthographicPixelSize;
      }
    }
    constructor(pinball) {
      var halfHeight, halfWidth;
      this.pinball = pinball;
      this.displayType = this.pinball.state.field('cameraDisplayType', {
        default: this.constructor.DisplayTypes.Orthographic
      });
      halfWidth = Pinball.SceneManager.playfieldWidth / 2;
      halfHeight = halfWidth / Pinball.RendererManager.orthographicAspectRatio;
      this._orthographicCamera = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, 0, 2);
      this._orthographicCamera.position.set(halfWidth, 1, halfHeight);
      this._orthographicCamera.rotation.set(-Math.PI / 2, 0, 0);
      this._perspectiveCamera = new THREE.PerspectiveCamera(60, Pinball.RendererManager.perspectiveAspectRatio, 0.01, 10);
      this.camera = new AE.ReactiveWrapper(null);
      this._cameraAutorun = this.pinball.autorun(() => {
        switch (this.displayType()) {
          case this.constructor.DisplayTypes.Orthographic:
            return this.camera(this._orthographicCamera);
          case this.constructor.DisplayTypes.Perspective:
            return this.camera(this._perspectiveCamera);
        }
      });

      // Update camera position when properties change.
      this._properties = new ReactiveField({
        azimuthalAngle: AR.Degrees(90),
        polarAngle: AR.Degrees(45),
        radialDistance: Pinball.SceneManager.shortPlayfieldDepth
      });
      this._cameraRotationAutorun = this.pinball.autorun(() => {
        var properties, r, ɸ, θ;
        properties = this._properties();
        r = properties.radialDistance;
        ɸ = properties.azimuthalAngle;
        θ = properties.polarAngle;
        this._perspectiveCamera.position.copy({
          x: r * Math.sin(θ) * Math.cos(ɸ) + Pinball.SceneManager.playfieldWidth / 2,
          y: r * Math.cos(θ),
          z: r * Math.sin(θ) * Math.sin(ɸ) + Pinball.SceneManager.shortPlayfieldDepth / 2
        });

        // Update rotation to look at the center.
        this._perspectiveCamera.rotation.set(-Math.PI / 2 + θ, Math.PI / 2 - ɸ, 0, 'YXZ');
        return this.camera.updated();
      });
      this.rotatingCamera = new ReactiveField(false);
      this._cameraPropertiesAutorun = this.pinball.autorun(() => {
        var dragDelta, newViewportCoordinates;
        if (!this.rotatingCamera()) {
          return;
        }
        if (!(newViewportCoordinates = this.pinball.mouse().viewportCoordinates())) {
          return;
        }
        dragDelta = {
          x: this._rotateCameraStartViewportCoordinates.x - newViewportCoordinates.x,
          y: this._rotateCameraStartViewportCoordinates.y - newViewportCoordinates.y
        };
        // Only react to mouse coordinate changes.
        return Tracker.nonreactive(() => {
          var newProperties, oldProperties;
          oldProperties = this._properties();
          newProperties = {
            azimuthalAngle: this._rotateCameraStartProperties.azimuthalAngle - dragDelta.x * Math.PI,
            polarAngle: _.clamp(this._rotateCameraStartProperties.polarAngle - dragDelta.y * Math.PI * 0.5, 0, Math.PI),
            radialDistance: oldProperties.radialDistance
          };
          return this._properties(newProperties);
        });
      });
    }
    destroy() {
      this._cameraAutorun.stop();
      this._cameraRotationAutorun.stop();
      return this._cameraPropertiesAutorun.stop();
    }
    startRotateCamera() {
      // Dragging of blueprint needs to be handled in display coordinates since the canvas ones should technically stay
      // the same (the whole point is for the same canvas coordinate to stay under the mouse as we move it around).
      this._rotateCameraStartViewportCoordinates = this.pinball.mouse().viewportCoordinates();
      this._rotateCameraStartProperties = this._properties();
      this.rotatingCamera(true);
      // Wire end of dragging on mouse up anywhere in the window.
      return $(document).on('pointerup.pixelartacademy-pixeltosh-programs-pinball-cameramanager', () => {
        $(document).off('.pixelartacademy-pixeltosh-programs-pinball-cameramanager');
        return this.rotatingCamera(false);
      });
    }
    changeDistanceByFactor(factor) {
      var properties;
      properties = this._properties();
      properties.radialDistance = _.clamp(properties.radialDistance * factor, 0.1, 10);
      return this._properties(properties);
    }
    transformWindowToPlayfield(windowCoordinates) {
      var scale;
      scale = this.pinball.os.display.scale();
      return {
        x: windowCoordinates.x / scale * this.constructor.orthographicPixelSize,
        z: windowCoordinates.y / scale * this.constructor.orthographicPixelSize
      };
    }
    transformPlayfieldToDisplay(playfieldCoordinates) {
      return {
        x: playfieldCoordinates.x / this.constructor.orthographicPixelSize,
        y: playfieldCoordinates.z / this.constructor.orthographicPixelSize
      };
    }
  }
  ;
  CameraManager.DisplayTypes = {
    Orthographic: 'Orthographic',
    Perspective: 'Perspective'
  };
  CameraManager.orthographicPixelSize = 0.5 / 180; // m/px

  CameraManager.significantPositionDeviation = CameraManager.orthographicPixelSize * 0.6;
  return CameraManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"renderermanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/renderermanager.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AS, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AS = Artificial.Spectrum;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.RendererManager = function () {
  class RendererManager {
    constructor(pinball) {
      this.pinball = pinball;
      this.skipFrame = false;
      this.renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance'
      });
      this.renderer.setClearColor(new THREE.Color(0xffffff));
      this._sizeAutorun = this.pinball.autorun(() => {
        var ref, scale;
        scale = this.pinball.debugPhysics() ? this.pinball.os.display.scale() * 2 : 1;
        switch ((ref = this.pinball.cameraManager()) != null ? ref.displayType() : void 0) {
          case Pinball.CameraManager.DisplayTypes.Orthographic:
            return this.renderer.setSize(this.constructor.orthographicWidth * scale, this.constructor.height * scale);
          case Pinball.CameraManager.DisplayTypes.Perspective:
            return this.renderer.setSize(this.constructor.perspectiveWidth * scale, this.constructor.height * scale);
        }
      });
    }
    destroy() {
      this._sizeAutorun.stop();
      return this.renderer.dispose();
    }
    draw(appTime) {
      var camera, scene;
      if (LOI.settings.graphics.slowCPUEmulation.value()) {
        this.skipFrame = !this.skipFrame;
        if (this.skipFrame) {
          return;
        }
      }
      scene = this.pinball.sceneManager().scene;
      camera = this.pinball.cameraManager().camera();
      camera.layers.set(this.constructor.RenderLayers.Main);
      if (this.pinball.debugPhysics()) {
        camera.layers.set(this.constructor.RenderLayers.PhysicsDebug);
      }
      return this.renderer.render(scene, camera);
    }
  }
  ;
  RendererManager.RenderLayers = {
    Main: 0,
    PhysicsDebug: 1
  };
  RendererManager.orthographicWidth = 180; // px

  RendererManager.perspectiveWidth = 320; // px

  RendererManager.height = 200; // px

  RendererManager.orthographicAspectRatio = RendererManager.orthographicWidth / RendererManager.height;
  RendererManager.perspectiveAspectRatio = RendererManager.perspectiveWidth / RendererManager.height;
  return RendererManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"physicsmanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/physicsmanager.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.PhysicsManager = function () {
  class PhysicsManager {
    constructor(pinball) {
      this.pinball = pinball;
      // Note, we create temporary Ammo objects in the constructor instead
      // of the file closure for compatibility with the desktop build.
      this._rayOrigin = new Ammo.btVector3();
      this._rayDestination = new Ammo.btVector3();
      this._closestRayResultCallback = new Ammo.ClosestRayResultCallback(this._rayOrigin, this._rayDestination);
      this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
      this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
      this.broadphase = new Ammo.btDbvtBroadphase();
      this.solver = new Ammo.btSequentialImpulseConstraintSolver();
      this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration);
      this._rigidBodyToEntity = [null];

      // Add safety walls.
      this.dynamicsWorld.addRigidBody(new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(0, new Ammo.btDefaultMotionState(new Ammo.btTransform(Ammo.btQuaternion.identity(), new Ammo.btVector3(-1, 0, 0))), new Ammo.btBoxShape(new Ammo.btVector3(1, 10, 10), 0))));
      this.dynamicsWorld.addRigidBody(new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(0, new Ammo.btDefaultMotionState(new Ammo.btTransform(Ammo.btQuaternion.identity(), new Ammo.btVector3(Pinball.SceneManager.playfieldWidth + 1, 0, 0))), new Ammo.btBoxShape(new Ammo.btVector3(1, 10, 10), 0))));
      this.dynamicsWorld.addRigidBody(new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(0, new Ammo.btDefaultMotionState(new Ammo.btTransform(Ammo.btQuaternion.identity(), new Ammo.btVector3(0, 0, -1))), new Ammo.btBoxShape(new Ammo.btVector3(10, 10, 1), 0))));

      // Add glass.
      this.dynamicsWorld.addRigidBody(new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(0, new Ammo.btDefaultMotionState(new Ammo.btTransform(Ammo.btQuaternion.identity(), new Ammo.btVector3(Pinball.SceneManager.playfieldWidth / 2, Pinball.SceneManager.playfieldHeight + 1, Pinball.SceneManager.shortPlayfieldDepth / 2))), new Ammo.btBoxShape(new Ammo.btVector3(Pinball.SceneManager.playfieldWidth / 2, 1, Pinball.SceneManager.shortPlayfieldDepth / 2), 0))));
      // Add playfield parts.
      this.physicsObjects = new AE.ReactiveArray(() => {
        var entity, i, len, physicsObject, ref, ref1, results;
        ref1 = (ref = this.pinball.sceneManager()) != null ? ref.entities() : void 0;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          entity = ref1[i];
          if (physicsObject = entity.getPhysicsObject()) {
            results.push(physicsObject);
          }
        }
        return results;
      }, {
        added: physicsObject => {
          var base, constants;
          // Add the part to the simulation.
          this.registerRigidBodyEntity(physicsObject.body, physicsObject.entity);
          constants = physicsObject.entity.constants();
          this.dynamicsWorld.addRigidBody(physicsObject.body, constants.collisionGroup, constants.collisionMask);
          return typeof (base = physicsObject.entity).onAddedToDynamicsWorld === "function" ? base.onAddedToDynamicsWorld(this) : void 0;
        },
        removed: physicsObject => {
          var base;
          this.unregisterRigidBody(physicsObject.body);
          this.dynamicsWorld.removeRigidBody(physicsObject.body);
          return typeof (base = physicsObject.entity).onRemovedFromDynamicsWorld === "function" ? base.onRemovedFromDynamicsWorld(this) : void 0;
        }
      });

      // Adjust gravity.
      this._gravityAutorun = this.pinball.autorun(computation => {
        var angleDegrees, gravity, playfield, ref;
        if (!(playfield = (ref = this.pinball.sceneManager()) != null ? ref.getPartOfType(Pinball.Parts.Playfield) : void 0)) {
          return;
        }
        angleDegrees = playfield.data().angleDegrees;
        gravity = new Ammo.btVector3(0, -9.81, 0);
        gravity = gravity.rotate(new Ammo.btVector3(1, 0, 0), AR.Conversions.degreesToRadians(-angleDegrees));
        return this.dynamicsWorld.setGravity(gravity);
      });
    }
    destroy() {
      this.physicsObjects.stop();
      this._gravityAutorun.stop();
      Ammo.destroy(this.dynamicsWorld);
      Ammo.destroy(this.solver);
      Ammo.destroy(this.broadphase);
      Ammo.destroy(this.dispatcher);
      return Ammo.destroy(this.collisionConfiguration);
    }
    registerRigidBodyEntity(rigidBody, entity) {
      var userIndex;
      userIndex = this._rigidBodyToEntity.length;
      rigidBody.setUserIndex(userIndex);
      return this._rigidBodyToEntity.push(entity);
    }
    unregisterRigidBody(rigidBody) {
      var userIndex;
      userIndex = rigidBody.getUserIndex();
      return this._rigidBodyToEntity[userIndex] = null;
    }
    getEntityForRigidBody(rigidBody) {
      return this._rigidBodyToEntity[rigidBody.getUserIndex()];
    }
    intersectObject(start, end) {
      var rayCallback, ref, rigidBody;
      rayCallback = Ammo.castObject(this._closestRayResultCallback, Ammo.RayResultCallback);
      rayCallback.set_m_closestHitFraction(1);
      rayCallback.set_m_collisionObject(null);
      this._rayOrigin.copy(start);
      this._rayDestination.copy(end);
      this._closestRayResultCallback.get_m_rayFromWorld().setValue(start.x, start.y, start.z);
      this._closestRayResultCallback.get_m_rayToWorld().setValue(end.x, end.y, end.z);
      this.dynamicsWorld.rayTest(this._rayOrigin, this._rayDestination, this._closestRayResultCallback);
      if (!this._closestRayResultCallback.hasHit()) {
        return;
      }
      rigidBody = Ammo.castObject(this._closestRayResultCallback.m_collisionObject, Ammo.btRigidBody);
      return (ref = rigidBody.physicsObject) != null ? ref.entity : void 0;
    }
    update(appTime) {
      var i, j, len, physicsObject, ref, ref1, renderObject, step, stepCount;
      if (!appTime.elapsedAppTime) {
        return;
      }
      stepCount = Math.min(this.constructor.maxSimulationStepsPerFrame, Math.ceil(appTime.elapsedAppTime / this.constructor.simulationTimestep));
      if (this.pinball.slowMotion()) {
        stepCount = Math.ceil(stepCount / 100);
      }
      for (step = i = 0, ref = stepCount; 0 <= ref ? i < ref : i > ref; step = 0 <= ref ? ++i : --i) {
        this.dynamicsWorld.stepSimulation(this.constructor.simulationTimestep, 1, this.constructor.simulationTimestep);
        this.pinball.fixedUpdate(this.constructor.simulationTimestep);
      }
      ref1 = this.physicsObjects();
      for (j = 0, len = ref1.length; j < len; j++) {
        physicsObject = ref1[j];
        if (!(renderObject = physicsObject.entity.getRenderObject())) {
          continue;
        }
        renderObject.updateFromPhysicsObject(physicsObject);
      }
    }
  }
  ;
  PhysicsManager.BallConstants = {
    Restitution: 0.6,
    Friction: 1,
    RollingFriction: 0
  };
  PhysicsManager.RestitutionConstants = {
    Rubber: 0.9 / PhysicsManager.BallConstants.Restitution,
    HardSurface: 0.6 / PhysicsManager.BallConstants.Restitution // steel ball bearing on concrete, golf ball on wood
  };
  PhysicsManager.FrictionConstants = {
    Rubber: 0.9,
    Wood: 0.4 / PhysicsManager.BallConstants.Friction,
    // steel-wood (0.2–0.6)
    Plastic: 0.2 / PhysicsManager.BallConstants.Friction,
    // plastic-metal (0.1–0.3)
    Metal: 0.3 / PhysicsManager.BallConstants.Friction // steel-steel (0.1–0.5)
  };
  PhysicsManager.RollingFrictionConstants = {
    Rubber: 0.05,
    Coarse: 0.02,
    // 1-inch steel bearing on P80 emery paper (0.01–0.02)
    Smooth: 0.01 // 1-inch steel bearing on P80 emery paper (0.005–0.01)
  };
  PhysicsManager.CollisionGroups = {
    Balls: 1,
    BallGuides: 2,
    Actuators: 4
  };
  PhysicsManager.simulationTimestep = 1 / 1000;
  PhysicsManager.maxSimulationStepsPerFrame = 0.1 / PhysicsManager.simulationTimestep;
  PhysicsManager.continuousCollisionDetectionThreshold = 1e-7;
  return PhysicsManager;
}.call(this);

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"inputmanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/inputmanager.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.InputManager = function () {
  class InputManager {
    constructor(pinball) {
      this.pinball = pinball;
      this.controlActive = {
        LeftFlipper: false,
        RightFlipper: false,
        Plunger: false
      };
      $(document).on('keydown.pixelartacademy-pixeltosh-programs-pinball-inputmanager', event => {
        var control, i, len, part, ref, results;
        if (this._ignoreKeys(event)) {
          return;
        }
        if (!(control = this._keyCodeToControl(event.code))) {
          return;
        }
        if (this.controlActive[control]) {
          return;
        }
        this.controlActive[control] = true;
        ref = this._getParts(control);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          part = ref[i];
          results.push(part.activate());
        }
        return results;
      });
      $(document).on('keyup.pixelartacademy-pixeltosh-programs-pinball-inputmanager', event => {
        var control, i, len, part, ref, results;
        if (this._ignoreKeys(event)) {
          return;
        }
        if (!(control = this._keyCodeToControl(event.code))) {
          return;
        }
        if (!this.controlActive[control]) {
          return;
        }
        this.controlActive[control] = false;
        ref = this._getParts(control);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          part = ref[i];
          results.push(part.deactivate());
        }
        return results;
      });
    }
    destroy() {
      return $(document).off('.pixelartacademy-pixeltosh-programs-pinball-inputmanager');
    }
    _ignoreKeys(event) {
      var ref;
      if (this.pinball.os.interface.inputFocused()) {
        // Ignore keys when input is focused.
        return true;
      }

      // Outside of edit mode, no ignoring is needed.
      if (!((ref = this.pinball.gameManager()) != null ? ref.inEdit() : void 0)) {
        return;
      }
      if (this.pinball.editorManager().editing()) {
        // Ignore keys while editing.
        return true;
      }

      // Ignore command/control keys to allow for shortcut presses.
      return event.metaKey || event.ctrlKey;
    }
    _keyCodeToControl(code) {
      switch (code) {
        case 'ShiftLeft':
        case 'ControlLeft':
        case 'ArrowLeft':
          return this.constructor.Controls.LeftFlipper;
        case 'ShiftRight':
        case 'ControlRight':
        case 'ArrowRight':
        case 'NumpadEnter':
          return this.constructor.Controls.RightFlipper;
        case 'ArrowDown':
        case 'Space':
        case 'Enter':
          return this.constructor.Controls.Plunger;
        default:
          return null;
      }
    }
    _getParts(control) {
      var parts;
      parts = this.pinball.sceneManager().parts();
      return _.filter(parts, part => {
        if (control === this.constructor.Controls.Plunger && part instanceof Pinball.Parts.Plunger) {
          return true;
        }
        if (control === this.constructor.Controls.LeftFlipper && part instanceof Pinball.Parts.Flipper && !part.data().flipped) {
          return true;
        }
        if (control === this.constructor.Controls.RightFlipper && part instanceof Pinball.Parts.Flipper && part.data().flipped) {
          return true;
        }
        return false;
      });
    }
  }
  ;
  InputManager.Controls = {
    LeftFlipper: 'LeftFlipper',
    RightFlipper: 'RightFlipper',
    Plunger: 'Plunger'
  };
  return InputManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"gamemanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/gamemanager.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.GameManager = function () {
  class GameManager {
    constructor(pinball) {
      this.pinball = pinball;
      this.mode = new ReactiveField(null);
      this.remainingBallsCount = new ReactiveField(0);
      this.ballNumber = new ReactiveField(0);
      this.score = new ReactiveField(0);
      this.balls = new ReactiveField([]);
      this.liveBalls = new AE.LiveComputedField(() => {
        return _.filter(this.balls(), ball => {
          return ball.state() === Pinball.Ball.States.Live;
        });
      });

      // Handle running out of live balls.
      this._ballsAutorun = this.pinball.autorun(() => {
        var remainingBallsCount;
        if (!this.simulationActive()) {
          return;
        }
        if (this.liveBalls().length) {
          return;
        }

        // See if we have any remaining balls.
        if (remainingBallsCount = this.remainingBallsCount()) {
          this.remainingBallsCount(remainingBallsCount - 1);
          return this.spawnBalls();
        } else if (this.mode() === this.constructor.Modes.Test) {
          // Test mode always spawns extra balls.
          return this.spawnBalls();
        } else {
          // No balls are left, game over.
          return this.onGameOver();
        }
      });
      if (this.pinball.editModeUnlocked()) {
        this.edit();
      } else {
        this.play();
      }
    }
    destroy() {
      this.liveBalls.stop();
      return this._ballsAutorun.stop();
    }
    inEdit() {
      return this.mode() === this.constructor.Modes.Edit;
    }
    inTest() {
      return this.mode() === this.constructor.Modes.Test;
    }
    inPlay() {
      return this.mode() === this.constructor.Modes.Play;
    }
    edit() {
      if (!this.startMode(this.constructor.Modes.Edit)) {}
    }
    test() {
      return this.startMode(this.constructor.Modes.Test);
    }
    play() {
      this.startMode(this.constructor.Modes.Play);

      // Reset any changes to the cursor from edit/test mode.
      return this.pinball.os.cursor().setClass(null);
    }
    startMode(mode) {
      if (this.mode() === mode) {
        return;
      }
      this.mode(mode);
      return this.reset();
    }
    reset() {
      // Wait for scene manager to be ready so that all parts are available.
      return Tracker.autorun(computation => {
        var i, len, part, playfield, ref, sceneManager;
        if (!(sceneManager = this.pinball.sceneManager())) {
          return;
        }
        if (!sceneManager.ready()) {
          return;
        }
        computation.stop();
        ref = sceneManager.parts();
        for (i = 0, len = ref.length; i < len; i++) {
          part = ref[i];
          part.reset();
        }
        switch (this.mode()) {
          case this.constructor.Modes.Edit:
            return this.endSimulation();
          case this.constructor.Modes.Test:
            this.remainingBallsCount(0);
            return this.startSimulation();
          case this.constructor.Modes.Play:
            playfield = this.pinball.sceneManager().getPartOfType(Pinball.Parts.Playfield);
            this.remainingBallsCount(playfield.data().ballsPerPlay - 1);
            this.score(0);
            return this.startSimulation();
        }
      });
    }
    startSimulation() {
      var i, len, part, ref, results;
      this._destroyBalls();
      this.spawnBalls(true);
      ref = this.pinball.sceneManager().parts();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        results.push(typeof part.onSimulationStarted === "function" ? part.onSimulationStarted() : void 0);
      }
      return results;
    }
    endSimulation() {
      var i, len, part, ref, results;
      this._destroyBalls();
      ref = this.pinball.sceneManager().parts();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        results.push(typeof part.onSimulationEnded === "function" ? part.onSimulationEnded() : void 0);
      }
      return results;
    }
    _destroyBalls() {
      var balls;
      balls = this.balls();
      this.balls([]);
      Tracker.afterFlush(() => {
        var ball, i, len, results;
        results = [];
        for (i = 0, len = balls.length; i < len; i++) {
          ball = balls[i];
          results.push(ball.destroy());
        }
        return results;
      });
      return this.ballNumber(0);
    }
    simulationActive() {
      var ref;
      return (ref = this.mode()) === this.constructor.Modes.Test || ref === this.constructor.Modes.Play;
    }
    spawnBalls(gameStart) {
      var ballSpawner, balls, i, len, part, ref;
      balls = this.balls();
      ref = this.pinball.sceneManager().parts();
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        if (!(part instanceof Pinball.Parts.BallSpawner)) {
          continue;
        }
        ballSpawner = part;
        if (ballSpawner.data().captive && !gameStart) {
          continue;
        }
        balls.push(ballSpawner.spawnBall());
      }
      this.balls(balls);
      this.ballNumber(this.ballNumber() + 1);
      return this.pinball.audioManager().start();
    }
    removeBall(ball) {
      var balls;
      balls = this.balls();
      _.pull(balls, ball);
      this.balls(balls);
      return Tracker.afterFlush(() => {
        return ball.destroy();
      });
    }
    isGameOver() {
      return this.remainingBallsCount() === 0 && this.liveBalls().length === 0;
    }
    addPoints(score) {
      return this.score(this.score() + score);
    }
    onGameOver() {
      var score;
      score = this.score();
      if (score <= Pinball.state('highScore')) {
        return;
      }
      return Pinball.state('highScore', score);
    }
  }
  ;
  GameManager.Modes = {
    Edit: 'Edit',
    Test: 'Test',
    Play: 'Play'
  };
  return GameManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"editormanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/editormanager.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.EditorManager = class EditorManager {
  constructor(pinball) {
    this.pinball = pinball;
    this.hoveredPart = new ReactiveField(null);
    this.selectedPart = new ReactiveField(null);
    this.draggingPart = new ReactiveField(null);
    this.rotatingPart = new ReactiveField(null);

    // Whenever a new project is loaded, clean up any previous editor errors.
    this.previousProjectId = new ReactiveField(null);
    this._projectChangeAutorun = Tracker.autorun(computation => {
      var projectId;
      if (!(projectId = this.pinball.projectId())) {
        return;
      }

      // Only clean up the currently active project.
      if (projectId !== Pinball.Project.state('activeProjectId')) {
        return;
      }
      return Tracker.nonreactive(() => {
        var previousProjectId;
        previousProjectId = this.previousProjectId();
        if (projectId === previousProjectId) {
          return;
        }
        return this._cleanupAutorun = Tracker.autorun(computation => {
          var PinballGoal, assetClass, assetId, assetsMissing, existingBitmap, fixedDimensions, i, j, len, len1, name, part, partId, pixelSize, plungerFound, project, ref, ref1, ref2, ref3, results, taskClass, taskIndex;
          if (!(project = PAA.Practice.Project.documents.findOne(projectId))) {
            return;
          }
          computation.stop();
          ref = project.playfield;

          // Remove any invalid parts.
          for (partId in ref) {
            part = ref[partId];
            if (Pinball.Part.getClassForId(part.type) && part.position) {
              // A valid part has a known type and position.
              continue;
            }
            this.removePartByPlayfieldId(partId);
          }

          // Add the plunger if it's missing and you can't edit the playfield yet.
          if (!this.pinball.editModeUnlocked()) {
            plungerFound = false;
            ref1 = project.playfield;
            for (partId in ref1) {
              part = ref1[partId];
              if (!(part.type === Pinball.Parts.Plunger.id())) {
                continue;
              }
              plungerFound = true;
              break;
            }
            if (!plungerFound) {
              pixelSize = Pinball.CameraManager.orthographicPixelSize;
              PAA.Practice.Project.documents.update(projectId, {
                $set: {
                  ["playfield.".concat(Random.id())]: {
                    type: Pinball.Parts.Plunger.id(),
                    position: {
                      x: 173.5 * pixelSize,
                      z: 189.5 * pixelSize
                    }
                  },
                  lastEditTime: new Date()
                }
              });
            }
          }

          // Re-link any missing assets up to the current task.
          PinballGoal = LM.PixelArtFundamentals.Fundamentals.Goals.Pinball;
          ref2 = PinballGoal.tasks();
          results = [];
          for (taskIndex = i = 0, len = ref2.length; i < len; taskIndex = ++i) {
            taskClass = ref2[taskIndex];
            if (taskClass.prototype instanceof PinballGoal.AssetsTask) {
              assetsMissing = false;
              ref3 = taskClass.unlockedAssets();
              for (j = 0, len1 = ref3.length; j < len1; j++) {
                assetClass = ref3[j];
                assetId = assetClass.id();
                if (_.find(project.assets, asset => {
                  return asset.id === assetId;
                })) {
                  continue;
                }
                console.warn("Missing pinball asset detected! Trying to find an existing one …", assetId);

                // See if there is a bitmap available with this asset's name.
                name = assetClass.displayName();
                fixedDimensions = assetClass.fixedDimensions();
                existingBitmap = LOI.Assets.Bitmap.documents.findOne({
                  name: name,
                  'bounds.width': fixedDimensions.width,
                  'bounds.height': fixedDimensions.height
                });
                if (existingBitmap) {
                  console.warn("Found it! Adding it to the project.", existingBitmap._id);
                  PAA.Practice.Project.documents.update(projectId, {
                    $push: {
                      assets: {
                        id: assetId,
                        type: 'Bitmap',
                        bitmapId: existingBitmap._id
                      }
                    },
                    $set: {
                      lastEditTime: new Date()
                    }
                  });
                } else {
                  console.warn("Could not found it.");
                  assetsMissing = true;
                }
              }
              if (assetsMissing) {
                // Some assets weren't found as existing bitmaps so we reactivate the task.
                console.warn("Some assets were not found. Reactivating asset creation.");
                taskClass.onActive();
              }
            }
            if (taskClass.getAdventureInstance().active()) {
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      });
    });
  }
  destroy() {
    var ref, ref1;
    this._projectChangeAutorun.stop();
    if ((ref = this._cleanupAutorun) != null) {
      ref.stop();
    }
    return (ref1 = this._addPartAutorun) != null ? ref1.stop() : void 0;
  }
  editing() {
    return this.draggingPart() || this.rotatingPart();
  }
  select() {
    var hoveredPart, selectedPart;
    selectedPart = null;
    if (hoveredPart = this.hoveredPart()) {
      if (_.find(Pinball.Part.getSelectablePartClasses(), partClass => {
        return hoveredPart instanceof partClass;
      })) {
        selectedPart = hoveredPart;
      }
    }
    return this.selectedPart(selectedPart);
  }
  addPart(options) {
    var $element, elementOffset, playfieldOffset, playfieldPartId, projectId, startPosition;
    // Calculate target element's position in the playfield.
    $element = $(options.element);
    elementOffset = $element.offset();
    playfieldOffset = $('.pixelartacademy-pixeltosh-programs-pinball-interface-playfield').offset();

    // Place the new part in the center of the element from the parts view.
    // TODO: Take into account that the origin is not always in the center of the element.
    startPosition = this.pinball.cameraManager().transformWindowToPlayfield({
      x: elementOffset.left - playfieldOffset.left + $element.outerWidth() / 2,
      y: elementOffset.top - playfieldOffset.top + $element.outerHeight() / 2
    });
    projectId = this.pinball.projectId();
    playfieldPartId = Random.id();
    PAA.Practice.Project.documents.update(projectId, {
      $set: {
        ["playfield.".concat(playfieldPartId)]: {
          type: options.type
        },
        lastEditTime: new Date()
      }
    });
    return this._addPartAutorun = Tracker.autorun(computation => {
      var part, ref, shape;
      if (!(part = (ref = this.pinball.sceneManager()) != null ? ref.getPart(playfieldPartId) : void 0)) {
        return;
      }
      if (!(shape = part.shape())) {
        return;
      }
      computation.stop();
      Pinball.CameraManager.snapShapeToPixelPosition(shape, startPosition, new THREE.Quaternion());
      this.startDrag(part, {
        startPosition
      });
      return this.selectedPart(part);
    });
  }
  updatePart(part, difference) {
    var partData, projectId;
    projectId = this.pinball.projectId();
    partData = _.cloneDeep(part.data());
    _.applyObjectDifference(partData, difference);
    return PAA.Practice.Project.documents.update(projectId, {
      $set: {
        ["playfield.".concat(part.playfieldPartId)]: partData,
        lastEditTime: new Date()
      }
    });
  }
  removePart(part) {
    return this.removePartByPlayfieldId(part.playfieldPartId);
  }
  removePartByPlayfieldId(playfieldPartId) {
    var projectId;
    projectId = this.pinball.projectId();
    return PAA.Practice.Project.documents.update(projectId, {
      $set: {
        lastEditTime: new Date()
      },
      $unset: {
        ["playfield.".concat(playfieldPartId)]: true
      }
    });
  }
  updateSelectedPart(difference) {
    return this.updatePart(this.selectedPart(), difference);
  }
  removeSelectedPart() {
    this.removePart(this.selectedPart());
    return this.selectedPart(null);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"editormanager-startdrag.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/editormanager-startdrag.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.EditorManager.prototype.startDrag = function (part, options) {
  var $document, $interface, bitmap, cursorClass, delay, largestDimension, osCursor, pixelSize, startCoordinates, startPosition;
  if (this.draggingPart()) {
    return;
  }
  this.draggingPart(part);
  osCursor = this.pinball.os.cursor();

  // Show the grabbing cursor or none if the part is smaller than the hand.
  bitmap = part.bitmap();
  largestDimension = Math.max(bitmap.bounds.width, bitmap.bounds.height);
  cursorClass = largestDimension > 15 ? 'grabbing' : 'none';
  osCursor.requestClass(cursorClass, this);
  startCoordinates = osCursor.coordinates();
  if (options != null ? options.startPosition : void 0) {
    startPosition = options.startPosition;

    // Immediately set the temporary position since the part's data won't have it yet.
    part.setTemporaryPosition(startPosition);
  } else {
    startPosition = part.data().position;
  }

  // Wire dragging handlers.
  $document = $(document);
  $interface = $('.pixelartacademy-pixeltosh-program-view').closest('.fatamorgana-interface');

  // Create a throttled delta update function to emulate a slow CPU.
  delay = LOI.settings.graphics.slowCPUEmulation.value() ? 75 : 0;
  pixelSize = Pinball.CameraManager.orthographicPixelSize;
  $interface.on('pointermove.pixelartacademy-pixeltosh-programs-pinball-editormanager', _.throttle(event => {
    var coordinates;
    if (!(coordinates = osCursor.coordinates())) {
      return;
    }
    return part.setTemporaryPosition({
      x: startPosition.x + (coordinates.x - startCoordinates.x) * pixelSize,
      z: startPosition.z + (coordinates.y - startCoordinates.y) * pixelSize
    });
  }, delay));
  // Wire end of dragging on pointer up anywhere in the window.
  return $document.on('pointerup.pixelartacademy-pixeltosh-programs-pinball-editormanager', () => {
    var newPosition, ref, ref1, rotationQuaternion;
    osCursor.endClassRequests(this);
    newPosition = part.position();

    // See if the new position is inside the playfield.
    if (newPosition && 0 < (ref = newPosition.x) && ref < Pinball.SceneManager.playfieldWidth && 0 < (ref1 = newPosition.z) && ref1 < Pinball.SceneManager.shortPlayfieldDepth) {
      // Snap new position to pixels.
      rotationQuaternion = part.rotationQuaternion();
      Pinball.CameraManager.snapShapeToPixelPosition(part.shape(), newPosition, rotationQuaternion);
      this.updatePart(part, {
        position: newPosition
      });

      // Wait until the new position has updated on the document, before removing the temporary override.
      Tracker.autorun(computation => {
        if (!EJSON.equals(part.data().position, newPosition)) {
          return;
        }
        computation.stop();
        return part.setTemporaryPosition(null);
      });
    } else {
      this.removePart(part);
      this.selectedPart(null);
    }
    $interface.off('.pixelartacademy-pixeltosh-programs-pinball-editormanager');
    $document.off('.pixelartacademy-pixeltosh-programs-pinball-editormanager');
    return this.draggingPart(null);
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"editormanager-startrotate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/editormanager-startrotate.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA, Pinball, _snappingAngles;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_snappingAngles = [-Math.PI, Math.atan2(-1, -2), Math.atan2(-1, -1), Math.atan2(-2, -1), -Math.PI / 2, Math.atan2(-2, 1), Math.atan2(-1, 1), Math.atan2(-1, 2), 0, Math.atan2(1, 2), Math.atan2(1, 1), Math.atan2(2, 1), Math.PI / 2, Math.atan2(2, -1), Math.atan2(1, -1), Math.atan2(1, -2), Math.PI];
Pinball.EditorManager.prototype.startRotate = function (part) {
  var $document, $interface, delay, osCursor, partShape, rotationAxis, startCoordinates, startCursorAngle, startPosition, startRotationAngle, updateAngle;
  if (this.rotatingPart()) {
    return;
  }
  this.rotatingPart(part);
  rotationAxis = this.pinball.cameraManager().transformPlayfieldToDisplay(part.position());
  // Adjust rotation axis by menu height to bring it to the OS coordinate system.
  rotationAxis.y += PAA.Pixeltosh.OS.Interface.menuHeight;
  osCursor = this.pinball.os.cursor();
  startCoordinates = osCursor.coordinates();
  startCursorAngle = Math.atan2(startCoordinates.y - rotationAxis.y, startCoordinates.x - rotationAxis.x);
  startRotationAngle = part.rotationAngle();
  startPosition = part.position();
  partShape = part.shape();

  // Wire rotating handlers.
  $document = $(document);
  $interface = $('.pixelartacademy-pixeltosh-program-view').closest('.fatamorgana-interface');
  updateAngle = event => {
    var angleDistance, coordinates, cursorAngle, cursorClass, i, len, minDistance, newAngle, newPosition, rotationQuaternion, snappedAngle, snappingAngle;
    if (!(coordinates = osCursor.coordinates())) {
      return;
    }
    cursorAngle = Math.atan2(coordinates.y - rotationAxis.y, coordinates.x - rotationAxis.x);
    cursorClass = function () {
      switch (false) {
        case !(-Math.PI * 3 / 4 < cursorAngle && cursorAngle > Math.PI * 3 / 4):
          return 'w-rotate';
        case !(cursorAngle > Math.PI / 4):
          return 's-rotate';
        case !(cursorAngle < -Math.PI / 4):
          return 'n-rotate';
        default:
          return 'e-rotate';
      }
    }();
    osCursor.requestClass(cursorClass, this);
    newAngle = _.normalizeAngle(startRotationAngle + (startCursorAngle - cursorAngle));

    // Apply angle snapping.
    if (!event.shiftKey) {
      minDistance = Number.POSITIVE_INFINITY;
      snappedAngle = null;
      for (i = 0, len = _snappingAngles.length; i < len; i++) {
        snappingAngle = _snappingAngles[i];
        angleDistance = _.angleDistance(newAngle, snappingAngle);
        if (angleDistance < minDistance) {
          minDistance = angleDistance;
          snappedAngle = snappingAngle;
        }
      }
      newAngle = snappedAngle;
    }

    // Snap position to pixels with the new rotation angle.
    newPosition = _.clone(startPosition);
    rotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, newAngle, 0));
    Pinball.CameraManager.snapShapeToPixelPosition(partShape, newPosition, rotationQuaternion);
    part.setTemporaryRotationAngle(newAngle);
    return part.setTemporaryPosition(newPosition);
  };

  // Create a throttled delta update function to emulate a slow CPU.
  delay = LOI.settings.graphics.slowCPUEmulation.value() ? 75 : 0;
  $interface.on('pointermove.pixelartacademy-pixeltosh-programs-pinball-editormanager', _.throttle(event => {
    return updateAngle(event);
  }, delay));
  $document.on('keydown.pixelartacademy-pixeltosh-programs-pinball-editormanager', event => {
    return updateAngle(event);
  });
  $document.on('keyup.pixelartacademy-pixeltosh-programs-pinball-editormanager', event => {
    return updateAngle(event);
  });
  // Wire end of rotating on pointer up anywhere in the window.
  return $document.on('pointerup.pixelartacademy-pixeltosh-programs-pinball-editormanager', () => {
    var newRotationAngle;
    osCursor.endClassRequests(this);
    newRotationAngle = part.rotationAngle();
    this.updatePart(part, {
      rotationAngle: newRotationAngle,
      position: part.position()
    });

    // Wait until the new position has updated on the document, before removing the temporary override.
    Tracker.autorun(computation => {
      if (!EJSON.equals(part.data().rotationAngle, newRotationAngle)) {
        return;
      }
      computation.stop();
      part.setTemporaryRotationAngle(null);
      return part.setTemporaryPosition(null);
    });
    $interface.off('.pixelartacademy-pixeltosh-programs-pinball-editormanager');
    $document.off('.pixelartacademy-pixeltosh-programs-pinball-editormanager');
    return this.rotatingPart(null);
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"audiomanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/audiomanager.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AEc, AR, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AEc = Artificial.Echo;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.AudioManager = function () {
  class AudioManager {
    constructor(pinball) {
      this.pinball = pinball;
      this.partCollisionSounds = {};
      this.partCollisionHits = {};
      this.partCollisionTimeouts = {};
      this.partCollisionVolumes = {};
      this._loadSoundsAutorun = Tracker.autorun(computation => {
        var audioOutputNode, context;
        if (!(context = LOI.adventure.audioManager.context())) {
          return;
        }
        audioOutputNode = AEc.Node.Mixer.getOutputNodeForName('location', context);
        this.startSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/start.wav', LOI.adventure.audioManager, audioOutputNode);
        this.partCollisionSounds[Pinball.Parts.Walls.id()] = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/wall.wav', LOI.adventure.audioManager, audioOutputNode);
        this.partCollisionSounds[Pinball.Parts.SpinningTarget.id()] = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/spinningtarget.wav', LOI.adventure.audioManager, audioOutputNode);
        this.partCollisionSounds[Pinball.Parts.Gate.id()] = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/gate.wav', LOI.adventure.audioManager, audioOutputNode);
        this.partCollisionSounds[Pinball.Parts.Plunger.id()] = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/plunger.wav', LOI.adventure.audioManager, audioOutputNode);
        this.partCollisionSounds[Pinball.Parts.Flipper.id()] = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/flipper.wav', LOI.adventure.audioManager, audioOutputNode);
        this.partCollisionVolumes[Pinball.Parts.Walls.id()] = 0.5;
        this.ballTroughSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/balltrough.wav', LOI.adventure.audioManager, audioOutputNode);
        this.gobbleHoleSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/gobblehole.wav', LOI.adventure.audioManager, audioOutputNode);
        this.flipperActivateSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/flipper-activate.wav', LOI.adventure.audioManager, audioOutputNode);
        this.flipperDeactivateSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/flipper-deactivate.wav', LOI.adventure.audioManager, audioOutputNode);
        this.plungerActivateSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/plunger-activate.wav', LOI.adventure.audioManager, audioOutputNode);
        this.bumperPassiveSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/bumper-passive.wav', LOI.adventure.audioManager, audioOutputNode);
        this.bumperActiveSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/pinball/parts/bumper-active.wav', LOI.adventure.audioManager, audioOutputNode);
        computation.stop();
        return this.initialized = true;
      });
    }
    destroy() {
      var partId, ref, sound;
      this._loadSoundsAutorun.stop();
      this.startSound.destroy();
      ref = this.partCollisionSounds;
      for (partId in ref) {
        sound = ref[partId];
        sound.destroy();
      }
      this.ballTroughSound.destroy();
      this.gobbleHoleSound.destroy();
      this.flipperActivateSound.destroy();
      this.flipperDeactivateSound.destroy();
      this.plungerActivateSound.destroy();
      this.bumperPassiveSound.destroy();
      return this.bumperActiveSound.destroy();
    }
    start() {
      var ref;
      return (ref = this.startSound) != null ? ref.play({
        volume: this.constructor.maxVolume * 0.75
      }) : void 0;
    }
    flipperActivate() {
      var ref;
      return (ref = this.flipperActivateSound) != null ? ref.play({
        volume: this.constructor.maxVolume * 0.75
      }) : void 0;
    }
    flipperDeactivate() {
      var ref;
      return (ref = this.flipperDeactivateSound) != null ? ref.play({
        volume: this.constructor.maxVolume * 0.5
      }) : void 0;
    }
    plungerStart() {
      var ref;
      return this._plungerSoundInstance = (ref = this.plungerActivateSound) != null ? ref.play({
        volume: this.constructor.maxVolume
      }) : void 0;
    }
    plungerEnd() {
      var ref;
      if ((ref = this._plungerSoundInstance) != null) {
        ref.stop();
      }
      return this._plungerSoundInstance = null;
    }
    spinningTargetRotation() {
      return this.partCollisionSounds[Pinball.Parts.SpinningTarget.id()].play({
        volume: this.constructor.maxVolume
      });
    }
    gobbleHole() {
      var ref;
      return (ref = this.gobbleHoleSound) != null ? ref.play({
        volume: this.constructor.maxVolume
      }) : void 0;
    }
    ballTrough() {
      var ref;
      return (ref = this.ballTroughSound) != null ? ref.play({
        volume: this.constructor.maxVolume
      }) : void 0;
    }
    bumper(active) {
      var sound;
      sound = active ? this.bumperActiveSound : this.bumperPassiveSound;
      return sound != null ? sound.play({
        volume: this.constructor.maxVolume * 0.75
      }) : void 0;
    }
    fixedUpdate(elapsed) {
      var ball, base, contactIndex, contactManifold, contactPoint, contactsCount, dispatcher, entity1, entity2, force, hit, i, impulse, j, manifoldIndex, manifoldsCount, partId, physicsManager, ref, ref1, ref2, results, target, targetId;
      if (!this.initialized) {
        return;
      }
      physicsManager = this.pinball.physicsManager();
      for (partId in this.partCollisionHits) {
        this.partCollisionHits[partId] = false;
        if ((base = this.partCollisionTimeouts)[partId] == null) {
          base[partId] = 0;
        }
        if (this.partCollisionTimeouts[partId]) {
          this.partCollisionTimeouts[partId] -= 1;
        }
      }
      dispatcher = physicsManager.dynamicsWorld.getDispatcher();
      manifoldsCount = dispatcher.getNumManifolds();
      for (manifoldIndex = i = 0, ref = manifoldsCount; 0 <= ref ? i < ref : i > ref; manifoldIndex = 0 <= ref ? ++i : --i) {
        contactManifold = dispatcher.getManifoldByIndexInternal(manifoldIndex);
        if (!(contactsCount = contactManifold.getNumContacts())) {
          continue;
        }
        entity1 = physicsManager.getEntityForRigidBody(contactManifold.getBody0());
        entity2 = physicsManager.getEntityForRigidBody(contactManifold.getBody1());
        if (entity1 instanceof Pinball.Ball) {
          ball = entity1;
          target = entity2;
        } else if (entity2 instanceof Pinball.Ball) {
          ball = entity2;
          target = entity1;
        } else {
          continue;
        }
        targetId = target != null ? typeof target.id === "function" ? target.id() : void 0 : void 0;
        if (!this.partCollisionSounds[targetId]) {
          targetId = Pinball.Parts.Walls.id();
        }
        if (this.partCollisionTimeouts[targetId]) {
          continue;
        }
        for (contactIndex = j = 0, ref1 = contactsCount; 0 <= ref1 ? j < ref1 : j > ref1; contactIndex = 0 <= ref1 ? ++j : --j) {
          contactPoint = contactManifold.getContactPoint(contactIndex);
          impulse = contactPoint.getAppliedImpulse();
          force = impulse / elapsed;
          switch (targetId) {
            case Pinball.Parts.SpinningTarget.id():
            case Pinball.Parts.Gate.id():
              this.partCollisionHits[targetId] = true;
              this.partCollisionTimeouts[targetId] = 100;
              break;
            case Pinball.Parts.Walls.id():
            case Pinball.Parts.Plunger.id():
            case Pinball.Parts.Flipper.id():
              if (force > 10) {
                this.partCollisionHits[targetId] = true;
                this.partCollisionTimeouts[targetId] = 100;
              }
          }
        }
      }
      ref2 = this.partCollisionHits;
      results = [];
      for (partId in ref2) {
        hit = ref2[partId];
        if (hit) {
          results.push(this.partCollisionSounds[partId].play({
            volume: this.constructor.maxVolume * (this.partCollisionVolumes[partId] || 1)
          }));
        }
      }
      return results;
    }
  }
  ;
  AudioManager.maxVolume = 0.3;
  return AudioManager;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mouse.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/mouse.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Mouse = class Mouse {
  constructor(pinball) {
    this.pinball = pinball;
    // The mouse coordinates relative to the playfield view in native window (browser) pixels.
    this.windowCoordinates = new ReactiveField(null, EJSON.equals);
    // The floating point value where the mouse is in viewport [-1, 1] coordinates.
    this.viewportCoordinates = new ReactiveField(null, EJSON.equals);
  }
  onMouseMove(event) {
    var $playfield, origin, viewportCoordinates, windowCoordinates;
    $playfield = this.pinball.os.$('.pixelartacademy-pixeltosh-programs-pinball-interface-playfield');
    origin = $playfield.offset();
    windowCoordinates = {
      x: event.pageX - origin.left,
      y: event.pageY - origin.top
    };
    this.windowCoordinates(windowCoordinates);
    viewportCoordinates = {
      x: windowCoordinates.x / $playfield.width() * 2 - 1,
      y: 1 - windowCoordinates.y / $playfield.height() * 2
    };
    return this.viewportCoordinates(viewportCoordinates);
  }
  onMouseLeave() {
    this.windowCoordinates(null);
    return this.viewportCoordinates(null);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ball.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/ball.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Ball = function () {
  class Ball {
    constructor(pinball, ballSpawner) {
      var spawnerPhysicsObject, spawnerRenderObject;
      this.pinball = pinball;
      this.ballSpawner = ballSpawner;
      spawnerRenderObject = this.ballSpawner.avatar.getRenderObject();
      spawnerPhysicsObject = this.ballSpawner.avatar.getPhysicsObject();
      this.physicsObject = new Pinball.Part.Avatar.PhysicsObject(this, spawnerPhysicsObject);
      this.physicsObject.reset();
      this.renderObject = new Pinball.Part.Avatar.RenderObject(this, spawnerRenderObject);
      this.renderObject.updateFromPhysicsObject(this.physicsObject);
      this.state = new ReactiveField(this.constructor.States.Live);
      Tracker.autorun(computation => {
        if (!this.physicsObject.ready()) {
          return;
        }
        computation.stop();
        return this.physicsObject.body.setActivationState(Ammo.btCollisionObject.ActivationStates.DisableDeactivation);
      });
    }
    destroy() {
      this.renderObject.destroy();
      return this.physicsObject.destroy();
    }
    getRenderObject() {
      return this.renderObject;
    }
    getPhysicsObject() {
      return this.physicsObject;
    }
    bitmap() {
      return this.ballSpawner.bitmap();
    }
    texture() {
      return this.ballSpawner.texture();
    }
    shape() {
      return this.ballSpawner.shape();
    }
    position() {
      return this.ballSpawner.position();
    }
    rotationQuaternion() {
      return this.ballSpawner.rotationQuaternion();
    }
    physicsProperties() {
      return this.ballSpawner.physicsProperties();
    }
    shapeProperties() {
      return this.ballSpawner.shapeProperties();
    }
    constants() {
      return _.extend({}, this.ballSpawner.constants(), {
        mass: 0.086 // kg
      });
    }
    die() {
      return this.state(this.constructor.States.Dead);
    }
  }
  ;
  Ball.States = {
    Live: 'Live',
    Captive: 'Captive',
    Dead: 'Dead'
  };
  return Ball;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"part":{"part.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/part.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AR, AS, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part = function () {
  class Part extends LOI.Adventure.Thing {
    static initialize() {
      super.initialize(...arguments);
      return this._partClasses[this.id()] = this;
    }
    static getPartClasses() {
      return _.values(this._partClasses);
    }
    static getSelectablePartClasses() {
      return _.filter(this.getPartClasses(), partClass => {
        return partClass.selectable();
      });
    }
    static getPlaceablePartClasses() {
      return _.filter(this.getPartClasses(), partClass => {
        return partClass.placeable();
      });
    }
    static getClassForId(id) {
      return this._partClasses[id];
    }
    static assetId() {} // Override if this part's asset comes from the project.

    static imageUrls() {} // Override if this part's asset comes from static images.

    static avatarShapes() {
      throw new AE.NotImplementedException("A playfield part must specify which shapes it can have in order of preference.");
    }
    static avatarClass() {
      return Pinball.Part.Avatar; // Override if the part requires a custom avatar.
    }
    static selectable() {
      return true; // Override if this part can't be selected.
    }
    static placeableRequiredTask() {
      return null; // Override if this part becomes placeable after completing a certain task.
    }
    static placeable() {
      var placeableRequiredTask, ref;
      if (!(placeableRequiredTask = this.placeableRequiredTask())) {
        return;
      }
      return (ref = placeableRequiredTask.getAdventureInstance()) != null ? ref.completed() : void 0;
    }
    constructor(pinball, playfieldPartId) {
      var assetId, imageUrls;
      super(...arguments);
      this.pinball = pinball;
      this.playfieldPartId = playfieldPartId;

      // Load the bitmap asset.
      this.bitmap = new ReactiveField(null, (a, b) => {
        return a === b;
      });
      if (imageUrls = this.constructor.imageUrls()) {
        if (!_.isArray(imageUrls)) {
          // Load static images and create a bitmap out of them.
          imageUrls = [imageUrls];
        }
        this._loadImageAssets(imageUrls);
      } else if (assetId = this.constructor.assetId()) {
        // Reactively load the bitmap asset.
        this.autorun(computation => {
          var asset, assetClass, project;
          if (!(project = PAA.Practice.Project.documents.findOne(this.pinball.projectId()))) {
            return;
          }
          if (asset = _.find(project.assets, asset => {
            return asset.id === assetId;
          })) {
            return this.bitmap(LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(asset != null ? asset.bitmapId : void 0, false));
          } else {
            // Asset hasn't been added to the project yet, fallback to the default images.
            assetClass = PAA.Practice.Project.Asset.getClassForId(assetId);
            imageUrls = assetClass.imageUrls();
            if (!_.isArray(imageUrls)) {
              imageUrls = [imageUrls];
            }
            return this._loadImageAssets(imageUrls);
          }
        });
      }
      // Create reactive data for the part.
      this.data = new AE.LiveComputedField(() => {
        var data, property, ref, setting;
        data = _.clone(this.pinball.getPartData(this.playfieldPartId) || {});
        ref = this.settings();
        for (property in ref) {
          setting = ref[property];
          if (setting.default != null) {
            if (data[property] == null) {
              data[property] = setting.default;
            }
          }
        }
        return _.defaults(data, this.defaultData());
      }, EJSON.equals);
      this.shapeProperties = new AE.LiveComputedField(() => {
        return _.defaults({}, _.pick(this.data(), this.shapeDataPropertyNames()), this.extraShapeProperties(), this.constants());
      }, EJSON.equals);
      this.physicsProperties = new AE.LiveComputedField(() => {
        return _.defaults({}, _.pick(this.data(), this.physicsDataPropertyNames()), this.extraPhysicsProperties(), this.constants());
      }, EJSON.equals);
      this._temporaryPosition = new ReactiveField(null);
      this._temporaryRotationAngle = new ReactiveField(null);

      // Reset the part whenever data changes.
      this.autorun(computation => {
        this.data();
        return this.reset();
      });
    }
    destroy() {
      super.destroy(...arguments);
      this.data.stop();
      this.shapeProperties.stop();
      return this.physicsProperties.stop();
    }
    shapeDataPropertyNames() {
      return ['flipped'];
    }
    physicsDataPropertyNames() {
      return ['restitution', 'friction', 'rollingFriction'];
    }
    ready() {
      return this.getRenderObject() && this.getPhysicsObject() && this.pixelArtEvaluation();
    }
    shape() {
      return this.avatar.shape();
    }
    texture() {
      return this.avatar.texture();
    }
    pixelArtEvaluation() {
      return this.avatar.pixelArtEvaluation();
    }
    setTemporaryPosition(position) {
      this._temporaryPosition(position);
      return this.avatar.reset();
    }
    position() {
      var ref;
      return this._temporaryPosition() || ((ref = this.data()) != null ? ref.position : void 0);
    }
    setTemporaryRotationAngle(angle) {
      this._temporaryRotationAngle(angle);
      return this.avatar.reset();
    }
    rotationAngle() {
      var ref, ref1, ref2;
      return (ref = (ref1 = this._temporaryRotationAngle()) != null ? ref1 : (ref2 = this.data()) != null ? ref2.rotationAngle : void 0) != null ? ref : 0;
    }
    rotationQuaternion() {
      return new THREE.Quaternion().setFromEuler(new THREE.Euler(0, this.rotationAngle(), 0));
    }
    createAvatar() {
      var avatarClass;
      avatarClass = this.constructor.avatarClass();
      return new avatarClass(this);
    }
    settings() {
      // Override to supply which settings the player can change for this part.
      return {};
    }
    defaultData() {
      // Override to supply defaults for the data (not defined through the settings).
      return {};
    }
    constants() {
      // Override to supply constant properties to the avatar.
      return {};
    }
    extraShapeProperties() {
      // Override to supply additional properties to the shape.
      return {};
    }
    extraPhysicsProperties() {
      // Override to supply additional properties to the physics object.
      return {};
    }
    getRenderObject() {
      return this.avatar.getRenderObject();
    }
    getPhysicsObject() {
      return this.avatar.getPhysicsObject();
    }
    playfieldHoleBoundaries() {
      // Override to return an array of polygon boundaries of this part if it creates holes in the playfield.
      return null;
    }
    initialize() {
      return this.avatar.initialize();
    }
    reset() {
      return this.avatar.reset();
    }
    async _loadImageAssets(imageUrls) {
      var imagePromises, imageUrl, macintoshPalette;
      // Load all the images.
      imagePromises = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = imageUrls.length; i < len; i++) {
          imageUrl = imageUrls[i];
          results.push(new Promise(resolve => {
            var image;
            image = new Image();
            image.addEventListener('load', () => {
              return resolve(image);
            }, false);

            // Initiate the loading.
            return image.src = Meteor.absoluteUrl(imageUrl);
          }));
        }
        return results;
      }.call(this);

      // Load the macintosh palette.
      macintoshPalette = await new Promise(resolve => {
        return Tracker.autorun(computation => {
          var palette;
          if (!(palette = LOI.Assets.Palette.documents.findOne({
            name: LOI.Assets.Palette.SystemPaletteNames.Macintosh
          }))) {
            return;
          }
          computation.stop();
          return resolve(palette);
        });
      });
      // Create a bitmap out of the images.
      return Promise.all(imagePromises).then(imageResults => {
        var bitmap, i, imageResult, layerIndex, len;
        bitmap = new LOI.Assets.Bitmap({
          palette: {
            _id: macintoshPalette._id,
            name: macintoshPalette.name
          },
          bounds: {
            fixed: true,
            left: 0,
            right: imageResults[0].width - 1,
            top: 0,
            bottom: imageResults[0].height - 1
          },
          pixelFormat: new LOI.Assets.Bitmap.PixelFormat('flags', 'paletteColor')
        });
        bitmap.initialize();
        for (layerIndex = i = 0, len = imageResults.length; i < len; layerIndex = ++i) {
          imageResult = imageResults[layerIndex];
          bitmap.addLayer();
          bitmap.layers[layerIndex].importImage(imageResult, macintoshPalette);
        }
        return this.bitmap(bitmap);
      });
    }
  }
  ;
  Part._partClasses = {};
  return Part;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"avatar":{"avatar.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/avatar.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar = function () {
  class Avatar extends LOI.Adventure.Thing.Avatar {
    constructor(part) {
      super(part.constructor);
      this.part = part;
      this.shape = new ReactiveField(null);
    }
    destroy() {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6;
      super.destroy(...arguments);
      if ((ref = this.texture) != null) {
        ref.stop();
      }
      if ((ref1 = this.pixelArtEvaluationInstance) != null) {
        ref1.stop();
      }
      if ((ref2 = this.pixelArtEvaluation) != null) {
        ref2.stop();
      }
      if ((ref3 = this._texture) != null) {
        ref3.dispose();
      }
      if ((ref4 = this._renderObject) != null) {
        ref4.destroy();
      }
      if ((ref5 = this._physicsObject) != null) {
        ref5.destroy();
      }
      return (ref6 = this._pixelArtEvaluation) != null ? ref6.destroy() : void 0;
    }

    // Note: We initialize the avatar separately since the construction happens
    // already in the thing's constructor and we don't have any extra fields available.
    initialize() {
      this._renderObject = new this.constructor.RenderObject(this.part);
      this._physicsObject = new this.constructor.PhysicsObject(this.part);

      // Create the upscaled texture.
      this.pixelImage = new LOI.Assets.Engine.PixelImage.Bitmap({
        asset: () => {
          return this.part.bitmap();
        }
      });
      this.texture = new AE.LiveComputedField(() => {
        var expandedCanvas, originalCanvas, ref, scaledCanvas;
        if (!(originalCanvas = this.pixelImage.getCanvas())) {
          return;
        }
        expandedCanvas = new AM.Canvas(originalCanvas.width + 2, originalCanvas.height + 2);
        expandedCanvas.context.drawImage(originalCanvas, 1, 1);
        scaledCanvas = AS.PixelArt.Upscaling.Hqx.scale(expandedCanvas, this.constructor.hqxScale, AS.PixelArt.Upscaling.Hqx.Modes.NoBlending, false, true);
        if ((ref = this._texture) != null) {
          ref.dispose();
        }
        this._texture = new THREE.CanvasTexture(scaledCanvas);
        this._texture.minFilter = THREE.NearestFilter;
        this._texture.magFilter = THREE.NearestFilter;
        return this._texture;
      });
      return this.initializeShape();
    }

    // Note: We separate shape initialization so we can call it when we only want to perform the shape analysis.
    initializeShape() {
      // Analyze pixel art.
      this.pixelArtEvaluationInstance = new AE.LiveComputedField(() => {
        var bitmap, ref;
        if (!(bitmap = this.part.bitmap())) {
          return;
        }
        if ((ref = this._pixelArtEvaluation) != null) {
          ref.destroy();
        }
        return this._pixelArtEvaluation = new PAA.Practice.PixelArtEvaluation(bitmap);
      });
      this.pixelArtEvaluation = new AE.LiveComputedField(() => {
        var pixelArtEvaluationInstance;
        if (!(pixelArtEvaluationInstance = this.pixelArtEvaluationInstance())) {
          return;
        }
        pixelArtEvaluationInstance.depend();
        return pixelArtEvaluationInstance;
      });
      return this.part.autorun(() => {
        var shape;
        shape = this._createShape();
        this.shape(shape);
        if (shape) {
          return Tracker.afterFlush(() => {
            return this.reset();
          });
        }
      });
    }
    _createShape() {
      var i, len, pixelArtEvaluation, ref, shape, shapeClass, shapeProperties;
      // Analyze the bitmap to determine the shape of the part.
      if (!(pixelArtEvaluation = this.pixelArtEvaluation())) {
        return;
      }
      shapeProperties = this.part.shapeProperties();
      ref = this.part.constructor.avatarShapes();
      for (i = 0, len = ref.length; i < len; i++) {
        shapeClass = ref[i];
        if (shape = shapeClass.detectShape(pixelArtEvaluation, shapeProperties)) {
          return shape;
        }
      }
      if (shape = Pinball.Part.Avatar.Box.detectShape(pixelArtEvaluation, shapeProperties)) {
        // No requested shape was able to be detected. Default to a box so that it has a physics presence and can be moved.
        return shape;
      }

      // Looks like the image is empty and no shape could have been created.
      return null;
    }
    getRenderObject() {
      var ref;
      if (!((ref = this._renderObject) != null ? ref.ready() : void 0)) {
        return;
      }
      return this._renderObject;
    }
    getPhysicsObject() {
      var ref;
      if (!((ref = this._physicsObject) != null ? ref.ready() : void 0)) {
        return;
      }
      return this._physicsObject;
    }
    reset() {
      var ref;
      if (!((ref = this._physicsObject) != null ? ref.ready() : void 0)) {
        return;
      }
      this._physicsObject.reset();
      return this._renderObject.updateFromPhysicsObject(this._physicsObject);
    }
    getBoundingRectangle() {
      var position, ref, shape;
      if (!(shape = this.shape())) {
        return;
      }
      // We want to rely only on the project position (to avoid recomputation during dragging).
      if (!(position = (ref = this.part.data()) != null ? ref.position : void 0)) {
        return;
      }
      return shape.getBoundingRectangle().getOffsetBoundingRectangle(position.x, position.z);
    }
    getHoleBoundaries() {
      var holeBoundaries, holeBoundary, i, j, len, len1, position, ref, ref1, ref2, ref3, rotationAngle, vertex, zero;
      if (!(holeBoundaries = (ref = this.shape()) != null ? ref.getHoleBoundaries() : void 0)) {
        return;
      }
      if (!(position = (ref1 = this.part.data()) != null ? ref1.position : void 0)) {
        return;
      }
      // We want to rely only on the project rotation (to avoid recomputation during rotating).
      rotationAngle = ((ref2 = this.part.data()) != null ? ref2.rotationAngle : void 0) || 0;
      zero = new THREE.Vector2();
      for (i = 0, len = holeBoundaries.length; i < len; i++) {
        holeBoundary = holeBoundaries[i];
        ref3 = holeBoundary.vertices;
        for (j = 0, len1 = ref3.length; j < len1; j++) {
          vertex = ref3[j];
          vertex.rotateAround(zero, -rotationAngle);
          vertex.x += position.x;
          vertex.y += position.z;
        }
      }
      return holeBoundaries;
    }
  }
  ;
  Avatar.hqxScale = 4;
  return Avatar;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"renderobject.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/renderobject.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AR, AS, LOI, PAA, PAE, Pinball, _rotationAngles, _rotationQuaternion;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_rotationQuaternion = new THREE.Quaternion();
_rotationAngles = new THREE.Euler();
Pinball.Part.Avatar.RenderObject = function () {
  class RenderObject extends AS.RenderObject {
    constructor(entity, existingResources) {
      var constants;
      super(...arguments);
      this.entity = entity;
      this.existingResources = existingResources;
      this.lastPosition = new THREE.Vector3();

      // Note, we create temporary Ammo objects in the constructor instead
      // of the file closure for compatibility with the desktop build.
      this._transform = new Ammo.btTransform();
      this.ready = new ReactiveField(false);
      constants = this.entity.constants();
      this.perpendicularRotationOrigin = new THREE.Object3D();
      this.add(this.perpendicularRotationOrigin);
      this.freeRotationOrigin = new THREE.Object3D();
      this.add(this.freeRotationOrigin);

      // Create the physics debug mesh.
      this.autorun(computation => {
        var ref, ref1, ref2, shape;
        if (!(shape = this.entity.shape())) {
          return;
        }
        if ((ref = this.physicsDebugGeometry) != null) {
          ref.dispose();
        }
        if (!(this.physicsDebugGeometry = ((ref1 = this.existingResources) != null ? ref1.physicsDebugGeometry : void 0) || shape.createPhysicsDebugGeometry())) {
          return;
        }
        if ((ref2 = this.physicsDebugMesh) != null) {
          ref2.removeFromParent();
        }
        this.physicsDebugMesh = new THREE.Mesh(this.physicsDebugGeometry, constants.physicsDebugMaterial || this.constructor.physicsDebugMaterial);
        this.physicsDebugMesh.layers.set(Pinball.RendererManager.RenderLayers.PhysicsDebug);
        this.physicsDebugMesh.receiveShadow = true;
        this.physicsDebugMesh.castShadow = true;
        return this.freeRotationOrigin.add(this.physicsDebugMesh);
      });
      if (this.entity.constants().hidden) {
        this.ready(true);
        return;
      }
      // Create the main mesh.
      this.flipped = new AE.LiveComputedField(() => {
        return this.entity.shapeProperties().flipped;
      });
      this.autorun(computation => {
        var bitmap, flipped, pixelSize, ref, ref1, ref2, ref3, ref4, ref5, ref6, shape, texture;
        if (!(shape = this.entity.shape())) {
          return;
        }
        if (!(bitmap = this.entity.bitmap())) {
          return;
        }
        if (!(texture = this.entity.texture())) {
          return;
        }
        if ((ref = this.existingResources) != null ? ref.material : void 0) {
          this.material = this.existingResources.material;
        } else {
          if ((ref1 = this.material) != null) {
            ref1.dispose();
          }
          this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            alphaTest: 0.5,
            side: THREE.DoubleSide,
            map: texture
          });
        }
        pixelSize = Pinball.CameraManager.orthographicPixelSize;
        // Note: Our texture has an extra padding of 1px around the bitmap so we need the plane to be 2px larger.
        if ((ref2 = this.existingResources) != null ? ref2.geometry : void 0) {
          this.geometry = (ref3 = this.existingResources) != null ? ref3.geometry : void 0;
        } else {
          if ((ref4 = this.geometry) != null) {
            ref4.dispose();
          }
          switch (shape.meshStyle()) {
            case Pinball.Part.Avatar.Shape.MeshStyles.Plane:
              this.geometry = new THREE.PlaneGeometry(pixelSize * (bitmap.bounds.width + 2), pixelSize * (bitmap.bounds.height + 2));
              break;
            case Pinball.Part.Avatar.Shape.MeshStyles.Extrusion:
              this.geometry = this.constructor._createExtrusionGeometry(texture, (ref5 = constants.meshHeight) != null ? ref5 : shape.height);
          }
        }
        flipped = this.flipped();
        this.bitmapMesh = new THREE.Mesh(this.geometry, this.material);
        this.bitmapMesh.rotation.x = -Math.PI / 2;
        if (flipped) {
          this.bitmapMesh.scale.x = -1;
        }
        this.bitmapMesh.receiveShadow = true;
        this.bitmapMesh.castShadow = true;
        this.bitmapMesh.layers.set(Pinball.RendererManager.RenderLayers.Main);

        // Offset the mesh so that the shape origin on the bitmap will appear at the render object's position.
        this.bitmapMesh.position.x = (bitmap.bounds.width / 2 - shape.bitmapOrigin.x) * pixelSize;
        if (flipped) {
          this.bitmapMesh.position.x *= -1;
        }
        this.bitmapMesh.position.z = (bitmap.bounds.height / 2 - shape.bitmapOrigin.y) * pixelSize;
        if ((ref6 = this.mesh) != null) {
          ref6.removeFromParent();
        }
        this.mesh = new THREE.Object3D();
        this.mesh.add(this.bitmapMesh);
        switch (shape.rotationStyle()) {
          case Pinball.Part.Avatar.Shape.RotationStyles.Fixed:
            this.add(this.mesh);
            break;
          case Pinball.Part.Avatar.Shape.RotationStyles.Perpendicular:
            this.perpendicularRotationOrigin.add(this.mesh);
            break;
          case Pinball.Part.Avatar.Shape.RotationStyles.Free:
            this.freeRotationOrigin.add(this.mesh);
        }
        return this.ready(true);
      });
    }
    destroy() {
      var ref, ref1, ref2, ref3;
      super.destroy(...arguments);
      if ((ref = this.flipped) != null) {
        ref.stop();
      }
      if (this.existingResources) {
        return;
      }
      if ((ref1 = this.physicsDebugGeometry) != null) {
        ref1.dispose();
      }
      if ((ref2 = this.material) != null) {
        ref2.dispose();
      }
      return (ref3 = this.geometry) != null ? ref3.dispose() : void 0;
    }
    clone() {
      return new this.constructor(this.part, this);
    }
    getRotationQuaternionForSnapping() {
      var shape;
      if (!(shape = this.entity.shape())) {
        return this.quaternion;
      }
      switch (shape.rotationStyle()) {
        case Pinball.Part.Avatar.Shape.RotationStyles.Fixed:
          return this.quaternion;
        case Pinball.Part.Avatar.Shape.RotationStyles.Perpendicular:
          return this.perpendicularRotationOrigin.quaternion;
        case Pinball.Part.Avatar.Shape.RotationStyles.Free:
          return this.freeRotationOrigin.quaternion;
      }
    }
    updateFromPhysicsObject(physicsObject) {
      var rotationQuaternion;
      this.lastPosition.copy(this.position);
      physicsObject.motionState.getWorldTransform(this._transform);
      this.position.setFromBulletVector3(this._transform.getOrigin());
      rotationQuaternion = this._transform.getRotation();
      this.freeRotationOrigin.quaternion.setFromBulletQuaternion(rotationQuaternion);

      // For the perpendicular rotation origin, rotate the object only around the Y axis.
      _rotationQuaternion.setFromBulletQuaternion(rotationQuaternion);
      _rotationAngles.setFromQuaternion(_rotationQuaternion);

      // Note: We divide by 1.9 so that when an object is resting at
      // 90 degrees, we don't flip between sides due to instabilities.
      if (Math.abs(_rotationAngles.z) > Math.PI / 1.9) {
        _rotationAngles.z = Math.sign(_rotationAngles.z) * Math.PI;
      } else {
        _rotationAngles.z = 0;
      }
      if (Math.abs(_rotationAngles.x) > Math.PI / 1.9) {
        _rotationAngles.x = Math.sign(_rotationAngles.x) * Math.PI;
      } else {
        _rotationAngles.x = 0;
      }
      return this.perpendicularRotationOrigin.quaternion.setFromEuler(_rotationAngles);
    }
    renderReflections(renderer, scene) {
      if (!this.cubeCamera) {
        this.cubeCameraRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
          format: THREE.RGBAFormat,
          type: THREE.FloatType,
          stencilBuffer: false
        });
        this.cubeCamera = new THREE.CubeCamera(0.001, 10, this.cubeCameraRenderTarget);
      }
      this.visible = false;
      this.cubeCamera.position.copy(this.position);
      renderer.outputEncoding = THREE.LinearEncoding;
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.shadowMap.needsUpdate = true;
      this.cubeCameraRenderTarget.clear(renderer);
      this.cubeCamera.update(renderer, scene);
      this.visible = true;
      return this.material.envMap = this.cubeCamera.renderTarget.texture;
    }
  }
  ;
  RenderObject.rotationAxis = new THREE.Vector3(0, -1, 0);
  RenderObject.physicsDebugMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444,
    wireframe: true
  });
  return RenderObject;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"renderobject-createextrusiongeometry.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/renderobject-createextrusiongeometry.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.RenderObject._createExtrusionGeometry = function (texture, depth) {
  var alpha, bottomLeft, bottomRight, corner, geometry, getVertexPair, i, imageData, indices, j, k, l, len, m, newAlpha, pixelOffset, pixelSize, ref, ref1, ref2, ref3, topLeft, topRight, uvBufferArray, vertexBufferArray, vertexPair, vertexPairIndex, vertexPairOffset, vertexPairs, vertexPairsMap, x, y;
  imageData = texture.image.getFullImageData();

  // The texture has been magnified with hqx so we have smaller pixels.
  pixelSize = Pinball.CameraManager.orthographicPixelSize / Pinball.Part.Avatar.hqxScale;
  corner = {
    x: imageData.width / 2 * pixelSize,
    y: imageData.height / 2 * pixelSize,
    z: depth / 2
  };
  vertexPairsMap = {};
  vertexPairs = [];
  indices = [];
  getVertexPair = function (x, y, offsetU, offsetV) {
    var base, base1, newVertexPair;
    if (vertexPairsMap[x] == null) {
      vertexPairsMap[x] = {};
    }
    if ((base = vertexPairsMap[x])[y] == null) {
      base[y] = {};
    }
    if ((base1 = vertexPairsMap[x][y])[offsetU] == null) {
      base1[offsetU] = {};
    }
    if (!vertexPairsMap[x][y][offsetU][offsetV]) {
      newVertexPair = {
        x: x,
        y: y,
        topIndex: vertexPairs.length * 2,
        bottomIndex: vertexPairs.length * 2 + 1,
        offsetU: offsetU,
        offsetV: offsetV
      };
      vertexPairsMap[x][y][offsetU][offsetV] = newVertexPair;
      vertexPairs.push(newVertexPair);
    }
    return vertexPairsMap[x][y][offsetU][offsetV];
  };
  for (x = i = 0, ref = imageData.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
    alpha = 0;
    topLeft = null;
    topRight = null;
    for (y = j = 0, ref1 = imageData.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
      pixelOffset = (x + y * imageData.width) * 4;
      newAlpha = imageData.data[pixelOffset + 3];
      if (newAlpha && !alpha) {
        // A new stripe starts.
        topLeft = getVertexPair(x, y, 1, 1);
        topRight = getVertexPair(x + 1, y, -1, 1);
        indices.push(topLeft.bottomIndex, topLeft.topIndex, topRight.topIndex, topLeft.bottomIndex, topRight.topIndex, topRight.bottomIndex);
      } else if (alpha && !newAlpha) {
        // The stripe ended.
        bottomLeft = getVertexPair(x, y, 1, -1);
        bottomRight = getVertexPair(x + 1, y, -1, -1);
        indices.push(bottomLeft.topIndex, bottomLeft.bottomIndex, bottomRight.bottomIndex, bottomRight.topIndex, bottomLeft.topIndex, bottomRight.bottomIndex);
        indices.push(topLeft.topIndex, bottomRight.topIndex, topRight.topIndex, topLeft.topIndex, bottomLeft.topIndex, bottomRight.topIndex);
        indices.push(bottomRight.bottomIndex, topLeft.bottomIndex, topRight.bottomIndex, bottomLeft.bottomIndex, topLeft.bottomIndex, bottomRight.bottomIndex);
      }
      alpha = newAlpha;
    }
  }
  for (y = k = 0, ref2 = imageData.height; 0 <= ref2 ? k < ref2 : k > ref2; y = 0 <= ref2 ? ++k : --k) {
    alpha = 0;
    for (x = l = 0, ref3 = imageData.width; 0 <= ref3 ? l < ref3 : l > ref3; x = 0 <= ref3 ? ++l : --l) {
      pixelOffset = (x + y * imageData.width) * 4;
      newAlpha = imageData.data[pixelOffset + 3];
      if (newAlpha && !alpha) {
        // A new stripe starts.
        topLeft = getVertexPair(x, y, 1, 1);
        bottomLeft = getVertexPair(x, y + 1, 1, -1);
        indices.push(topLeft.topIndex, topLeft.bottomIndex, bottomLeft.topIndex, topLeft.bottomIndex, bottomLeft.bottomIndex, bottomLeft.topIndex);
      } else if (alpha && !newAlpha) {
        // The stripe ended.
        topRight = getVertexPair(x, y, -1, 1);
        bottomRight = getVertexPair(x, y + 1, -1, -1);
        indices.push(topRight.bottomIndex, topRight.topIndex, bottomRight.bottomIndex, topRight.topIndex, bottomRight.topIndex, bottomRight.bottomIndex);
      }
      alpha = newAlpha;
    }
  }
  vertexBufferArray = new Float32Array(vertexPairs.length * 2 * 3);
  uvBufferArray = new Float32Array(vertexPairs.length * 2 * 2);
  for (vertexPairIndex = m = 0, len = vertexPairs.length; m < len; vertexPairIndex = ++m) {
    vertexPair = vertexPairs[vertexPairIndex];
    vertexPairOffset = vertexPairIndex * 6;
    vertexBufferArray[vertexPairOffset] = vertexPair.x * pixelSize - corner.x;
    vertexBufferArray[vertexPairOffset + 1] = corner.y - vertexPair.y * pixelSize;
    vertexBufferArray[vertexPairOffset + 2] = corner.z;
    vertexBufferArray[vertexPairOffset + 3] = vertexBufferArray[vertexPairOffset];
    vertexBufferArray[vertexPairOffset + 4] = vertexBufferArray[vertexPairOffset + 1];
    vertexBufferArray[vertexPairOffset + 5] = -corner.z;
    vertexPairOffset = vertexPairIndex * 4;
    uvBufferArray[vertexPairOffset] = (vertexPair.x + vertexPair.offsetU * 0.01) / imageData.width;
    uvBufferArray[vertexPairOffset + 1] = 1 - (vertexPair.y + vertexPair.offsetV * 0.01) / imageData.height;
    uvBufferArray[vertexPairOffset + 2] = uvBufferArray[vertexPairOffset];
    uvBufferArray[vertexPairOffset + 3] = uvBufferArray[vertexPairOffset + 1];
  }
  geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertexBufferArray, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvBufferArray, 2));
  geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  geometry.computeBoundingBox();
  return geometry;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"physicsobject.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/physicsobject.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.PhysicsObject = class PhysicsObject extends AR.PhysicsObject {
  constructor(entity, existingResources) {
    var constants;
    super(...arguments);
    this.entity = entity;
    this.existingResources = existingResources;
    this.ready = new ReactiveField(false);
    constants = this.entity.constants();

    // Create the body when the shape becomes available.
    this.autorun(computation => {
      var bodyInfo, ref, shape;
      if (!(shape = this.entity.shape())) {
        return;
      }
      computation.stop();
      this.mass = (ref = constants.mass) != null ? ref : 0;
      this.motionState = new Ammo.btDefaultMotionState(new Ammo.btTransform(Ammo.btQuaternion.identity(), Ammo.btVector3.zero()));
      this.localInertia = Ammo.btVector3.zero();
      this._createCollisionShape(shape);
      bodyInfo = new Ammo.btRigidBodyConstructionInfo(this.mass, this.motionState, this.collisionShape, this.localInertia);
      this.body = new Ammo.btRigidBody(bodyInfo);
      this.body.physicsObject = this;
      Ammo.destroy(bodyInfo);
      if (constants.continuousCollisionDetection && shape.continuousCollisionDetectionRadius) {
        this.body.setCcdSweptSphereRadius(shape.continuousCollisionDetectionRadius);
        this.body.setCcdMotionThreshold(Pinball.PhysicsManager.continuousCollisionDetectionThreshold);
      }
      Tracker.nonreactive(() => {
        return this.reset();
      });
      return this.ready(true);
    });

    // Update dynamic properties.
    this.autorun(computation => {
      var properties, ref, ref1, ref2;
      if (!this.ready()) {
        return;
      }
      properties = this.entity.physicsProperties();
      // Default body will be elastic and frictionless.
      this.body.setRestitution((ref = properties.restitution) != null ? ref : 1);
      this.body.setFriction((ref1 = properties.friction) != null ? ref1 : 0);
      return this.body.setRollingFriction((ref2 = properties.rollingFriction) != null ? ref2 : 0);
    });

    // Update shape.
    this.autorun(computation => {
      var shape;
      if (!(shape = this.entity.shape())) {
        return;
      }
      this._createCollisionShape(shape);
      this.body.setCollisionShape(this.collisionShape);
      this.body.setMassProps(this.mass, this.localInertia);
      return Tracker.nonreactive(() => {
        return this.reset();
      });
    });
  }
  destroy() {
    var ref;
    super.destroy(...arguments);
    if (this.body) {
      Ammo.destroy(this.body);
    }
    if (this.motionState) {
      Ammo.destroy(this.motionState);
    }
    if (this.collisionShape && !((ref = this.existingResources) != null ? ref.collisionShape : void 0)) {
      return Ammo.destroy(this.collisionShape);
    }
  }
  _createCollisionShape(shape) {
    var margin, ref;
    if ((ref = this.existingResources) != null ? ref.collisionShape : void 0) {
      this.collisionShape = this.existingResources.collisionShape;
    } else {
      if (this.collisionShape) {
        Ammo.destroy(this.collisionShape);
      }
      this.collisionShape = shape.createCollisionShape();
      margin = shape.collisionShapeMargin();
      if (margin != null) {
        this.collisionShape.setMargin(margin);
      }
    }
    return this.collisionShape.calculateLocalInertia(this.mass, this.localInertia);
  }
  reset() {
    var position, rotationQuaternion, shape;
    if (!(shape = this.entity.shape())) {
      return;
    }
    if (!(position = this.entity.position())) {
      return;
    }
    if (!(rotationQuaternion = this.entity.rotationQuaternion())) {
      return;
    }
    this.setPosition({
      x: position.x,
      y: position.y || shape.positionY(),
      z: position.z
    });
    this.setRotationQuaternion(rotationQuaternion);
    this.setLinearVelocity(new THREE.Vector3());
    return this.setAngularVelocity(new THREE.Quaternion());
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shape.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/shape.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AP = Artificial.Pyramid;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.Shape = function () {
  class Shape {
    static detectShape(pixelArtEvaluation, properties) {
      throw new AE.NotImplementedException("A part shape must create a shape instance if it can be detected.");
    }
    static _detectCircle(pixelArtEvaluation) {
      var allowInsidePoints, center, deviationsFromRadius, distanceFromCenter, distancesFromCenter, i, layer, len, line, point, points, radius;
      layer = pixelArtEvaluation.layers[0];
      // If we have no cores, try to detect if points themselves form a circle.
      if (layer.cores.length === 0) {
        points = layer.points;
        if (!points.length) {
          return;
        }
        allowInsidePoints = true;
      } else {
        // Otherwise, we must have only one core and line.
        if (!(layer.cores.length === 1 && layer.lines.length === 1)) {
          return;
        }

        // Some parts of the line must be curves.
        line = layer.lines[0];
        if (!_.some(line.pointPartIsCurve)) {
          return;
        }
        points = line.points;
      }

      // See if points form a circle.
      center = new THREE.Vector2();
      for (i = 0, len = points.length; i < len; i++) {
        point = points[i];
        center.add(point);
      }
      center.multiplyScalar(1 / points.length);
      distancesFromCenter = function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = points.length; j < len1; j++) {
          point = points[j];
          results.push(center.distanceTo(point));
        }
        return results;
      }();
      if (allowInsidePoints) {
        radius = _.max(distancesFromCenter);
      } else {
        radius = _.sum(distancesFromCenter) / distancesFromCenter.length;
      }
      deviationsFromRadius = function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = distancesFromCenter.length; j < len1; j++) {
          distanceFromCenter = distancesFromCenter[j];
          if (allowInsidePoints) {
            results.push(Math.max(0, distanceFromCenter - radius));
          } else {
            results.push(Math.abs(distanceFromCenter - radius));
          }
        }
        return results;
      }();

      // We allow for a half a pixel deviation from the radius (this makes a 5x5 square fall outside the range).
      if (_.max(deviationsFromRadius) > 0.5) {
        return;
      }
      center.x += 0.5;
      center.y += 0.5;
      radius += 0.5;
      return {
        position: center,
        radius: radius
      };
    }
    static _getBoundingRectangleOfPoints(points) {
      var bounds;
      bounds = {
        left: Number.POSITIVE_INFINITY,
        top: Number.POSITIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
        bottom: Number.NEGATIVE_INFINITY
      };
      bounds.left = Math.min(bounds.left, _.minBy(points, point => {
        return point.x;
      }).x);
      bounds.top = Math.min(bounds.top, _.minBy(points, point => {
        return point.y;
      }).y);
      bounds.right = Math.max(bounds.right, _.maxBy(points, point => {
        return point.x;
      }).x);
      bounds.bottom = Math.max(bounds.bottom, _.maxBy(points, point => {
        return point.y;
      }).y);
      return new AE.Rectangle(bounds);
    }
    static _calculateCenterOfMass(pixelArtEvaluation) {
      var center, i, len, pixel, pixels;
      pixels = pixelArtEvaluation.layers[0].pixels;
      center = new THREE.Vector2();
      for (i = 0, len = pixels.length; i < len; i++) {
        pixel = pixels[i];
        center.add(pixel);
      }
      center.multiplyScalar(1 / pixels.length);
      center.x += 0.5;
      center.y += 0.5;
      return center;
    }
    static _createExtrudedVerticesAndIndices(polygonBoundaries, bottomY, topY) {
      let flipped = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var bottomVertexIndex, boundaryStartVertexIndex, currentIndex, i, indexBufferArray, j, len, len1, nextBottomVertexIndex, nextTopVertexIndex, normalArray, normalSign, pixelSize, polygonBoundary, ref, topVertexIndex, vertex, vertexBufferArray, vertexCount, vertexIndex, x, y;
      vertexCount = _.sumBy(polygonBoundaries, polygonBoundary => {
        return polygonBoundary.vertices.length;
      });
      vertexBufferArray = new Float32Array(vertexCount * 6);
      normalArray = new Float32Array(vertexCount * 6);
      indexBufferArray = new Uint32Array(vertexCount * 6);
      boundaryStartVertexIndex = 0;
      currentIndex = 0;
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      normalSign = flipped ? -1 : 1;
      for (i = 0, len = polygonBoundaries.length; i < len; i++) {
        polygonBoundary = polygonBoundaries[i];
        bottomVertexIndex = boundaryStartVertexIndex;
        topVertexIndex = bottomVertexIndex + 1;
        ref = polygonBoundary.vertices;
        for (vertexIndex = j = 0, len1 = ref.length; j < len1; vertexIndex = ++j) {
          vertex = ref[vertexIndex];
          x = vertex.x * pixelSize;
          y = vertex.y * pixelSize;
          vertexBufferArray[bottomVertexIndex * 3] = x;
          vertexBufferArray[bottomVertexIndex * 3 + 1] = bottomY;
          vertexBufferArray[bottomVertexIndex * 3 + 2] = y;
          vertexBufferArray[topVertexIndex * 3] = x;
          vertexBufferArray[topVertexIndex * 3 + 1] = topY;
          vertexBufferArray[topVertexIndex * 3 + 2] = y;
          normalArray[bottomVertexIndex * 3] = -vertex.tangent.y * normalSign;
          normalArray[bottomVertexIndex * 3 + 2] = vertex.tangent.x * normalSign;
          normalArray[topVertexIndex * 3] = -vertex.tangent.y * normalSign;
          normalArray[topVertexIndex * 3 + 2] = vertex.tangent.x * normalSign;
          nextBottomVertexIndex = vertexIndex === polygonBoundary.vertices.length - 1 ? boundaryStartVertexIndex : bottomVertexIndex + 2;
          nextTopVertexIndex = nextBottomVertexIndex + 1;
          indexBufferArray[currentIndex] = nextBottomVertexIndex;
          indexBufferArray[currentIndex + 1] = bottomVertexIndex;
          indexBufferArray[currentIndex + 2] = nextTopVertexIndex;
          indexBufferArray[currentIndex + 3] = topVertexIndex;
          indexBufferArray[currentIndex + 4] = nextTopVertexIndex;
          indexBufferArray[currentIndex + 5] = bottomVertexIndex;
          bottomVertexIndex += 2;
          topVertexIndex += 2;
          currentIndex += 6;
        }
        boundaryStartVertexIndex += polygonBoundary.vertices.length * 2;
      }
      return {
        vertexBufferArray,
        normalArray,
        indexBufferArray
      };
    }
    static _createTaperedVerticesAndIndices(bottomPolygonBoundaries, topPolygonBoundaries, bottomY, topY) {
      let flipped = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var bottomPolygonBoundary, bottomVertex, bottomVertexIndex, boundaryStartVertexIndex, currentIndex, i, indexBufferArray, j, nextBottomVertexIndex, nextTopVertexIndex, normalArray, normalSign, pixelSize, polygonBoundaryIndex, ref, ref1, topPolygonBoundary, topVertex, topVertexIndex, vertexBufferArray, vertexCount, vertexIndex;
      vertexCount = _.sumBy(bottomPolygonBoundaries, polygonBoundary => {
        return polygonBoundary.vertices.length;
      });
      vertexBufferArray = new Float32Array(vertexCount * 6);
      normalArray = new Float32Array(vertexCount * 6);
      indexBufferArray = new Uint32Array(vertexCount * 6);
      boundaryStartVertexIndex = 0;
      currentIndex = 0;
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      normalSign = flipped ? -1 : 1;
      for (polygonBoundaryIndex = i = 0, ref = bottomPolygonBoundaries.length; 0 <= ref ? i < ref : i > ref; polygonBoundaryIndex = 0 <= ref ? ++i : --i) {
        bottomPolygonBoundary = bottomPolygonBoundaries[polygonBoundaryIndex];
        topPolygonBoundary = topPolygonBoundaries[polygonBoundaryIndex];
        bottomVertexIndex = boundaryStartVertexIndex;
        topVertexIndex = bottomVertexIndex + 1;
        for (vertexIndex = j = 0, ref1 = bottomPolygonBoundary.vertices.length; 0 <= ref1 ? j < ref1 : j > ref1; vertexIndex = 0 <= ref1 ? ++j : --j) {
          bottomVertex = bottomPolygonBoundary.vertices[vertexIndex];
          topVertex = topPolygonBoundary.vertices[vertexIndex];
          vertexBufferArray[bottomVertexIndex * 3] = bottomVertex.x * pixelSize;
          vertexBufferArray[bottomVertexIndex * 3 + 1] = bottomY;
          vertexBufferArray[bottomVertexIndex * 3 + 2] = bottomVertex.y * pixelSize;
          vertexBufferArray[topVertexIndex * 3] = topVertex.x * pixelSize;
          vertexBufferArray[topVertexIndex * 3 + 1] = topY;
          vertexBufferArray[topVertexIndex * 3 + 2] = topVertex.y * pixelSize;
          normalArray[bottomVertexIndex * 3] = -bottomVertex.tangent.y * normalSign;
          normalArray[bottomVertexIndex * 3 + 2] = bottomVertex.tangent.x * normalSign;
          normalArray[topVertexIndex * 3] = -topVertex.tangent.y * normalSign;
          normalArray[topVertexIndex * 3 + 2] = topVertex.tangent.x * normalSign;
          nextBottomVertexIndex = vertexIndex === bottomPolygonBoundary.vertices.length - 1 ? boundaryStartVertexIndex : bottomVertexIndex + 2;
          nextTopVertexIndex = nextBottomVertexIndex + 1;
          indexBufferArray[currentIndex] = nextBottomVertexIndex;
          indexBufferArray[currentIndex + 1] = bottomVertexIndex;
          indexBufferArray[currentIndex + 2] = nextTopVertexIndex;
          indexBufferArray[currentIndex + 3] = topVertexIndex;
          indexBufferArray[currentIndex + 4] = nextTopVertexIndex;
          indexBufferArray[currentIndex + 5] = bottomVertexIndex;
          bottomVertexIndex += 2;
          topVertexIndex += 2;
          currentIndex += 6;
        }
        boundaryStartVertexIndex += bottomPolygonBoundary.vertices.length * 2;
      }
      return {
        vertexBufferArray,
        normalArray,
        indexBufferArray
      };
    }
    static _createPolygonVerticesAndIndices(polygon, y, normalY) {
      var i, indexBufferArray, len, normalArray, offset, pixelSize, ref, vertex, vertexBufferArray, vertexIndex;
      vertexBufferArray = new Float32Array(polygon.vertices.length * 3);
      normalArray = new Float32Array(polygon.vertices.length * 3);
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      ref = polygon.vertices;
      for (vertexIndex = i = 0, len = ref.length; i < len; vertexIndex = ++i) {
        vertex = ref[vertexIndex];
        offset = vertexIndex * 3;
        vertexBufferArray[offset] = vertex.x * pixelSize;
        vertexBufferArray[offset + 1] = y;
        vertexBufferArray[offset + 2] = vertex.y * pixelSize;
        normalArray[offset + 1] = normalY;
      }
      indexBufferArray = polygon.triangulate(true);
      if (indexBufferArray.error) {
        console.warn("Shape was not able to be triangulated fully.", polygon);
      }
      if (!(normalY < 0)) {
        _.reverse(indexBufferArray);
      }
      return {
        vertexBufferArray,
        normalArray,
        indexBufferArray
      };
    }
    static _createLineVerticesAndIndices(points, radialSegmentsCount, joinDistance) {
      var binormal, binormals, circleRatio, circleRatioCos, circleRatioSin, currentIndex, currentVertexBufferOffset, currentVertexIndex, i, indexBufferArray, j, k, l, len, len1, m, normal, normalArray, normalX, normalY, normalZ, normals, point, position, position1, position2, positions, quadEndVertexIndexA, quadEndVertexIndexB, quadStartVertexIndexA, quadStartVertexIndexB, radialSegmentIndex, radialSegmentIndexA, radialSegmentIndexB, radii, radius, ref, ref1, ref2, segmentIndex, segmentStartVertexIndex, tangents, vertexBufferArray;
      positions = [];
      radii = [];
      tangents = [];
      normals = [];
      binormals = [];
      for (i = 0, len = points.length; i < len; i++) {
        point = points[i];
        if (point.outgoingTangent) {
          position1 = new THREE.Vector3().copy(point.tangent).multiplyScalar(-joinDistance).add(point.position);
          position2 = new THREE.Vector3().copy(point.outgoingTangent).multiplyScalar(joinDistance).add(point.position);
          positions.push(position1, position2);
          tangents.push(point.tangent, point.outgoingTangent);
          normals.push(point.normal, point.outgoingNormal || point.normal);
          binormals.push(new THREE.Vector3().crossVectors(point.tangent, point.normal), new THREE.Vector3().crossVectors(point.outgoingTangent, point.outgoingNormal || point.normal));
          radii.push(point.radius, point.radius);
        } else {
          positions.push(point.position);
          tangents.push(point.tangent);
          normals.push(point.normal);
          binormals.push(new THREE.Vector3().crossVectors(point.tangent, point.normal));
          radii.push(point.radius);
        }
      }
      vertexBufferArray = new Float32Array(positions.length * radialSegmentsCount * 3);
      normalArray = new Float32Array(positions.length * radialSegmentsCount * 3);
      currentVertexIndex = 0;
      currentVertexBufferOffset = 0;
      for (segmentIndex = j = 0, len1 = positions.length; j < len1; segmentIndex = ++j) {
        position = positions[segmentIndex];
        normal = normals[segmentIndex];
        binormal = binormals[segmentIndex];
        radius = radii[segmentIndex];
        for (radialSegmentIndex = k = 0, ref = radialSegmentsCount; 0 <= ref ? k < ref : k > ref; radialSegmentIndex = 0 <= ref ? ++k : --k) {
          circleRatio = radialSegmentIndex / radialSegmentsCount * Math.PI * 2;
          circleRatioSin = Math.sin(circleRatio);
          circleRatioCos = Math.cos(circleRatio);
          normalX = circleRatioCos * normal.x + circleRatioSin * binormal.x;
          normalY = circleRatioCos * normal.y + circleRatioSin * binormal.y;
          normalZ = circleRatioCos * normal.z + circleRatioSin * binormal.z;
          normalArray[currentVertexBufferOffset] = normalX;
          normalArray[currentVertexBufferOffset + 1] = normalY;
          normalArray[currentVertexBufferOffset + 2] = normalZ;
          vertexBufferArray[currentVertexBufferOffset] = position.x + radius * normalX;
          vertexBufferArray[currentVertexBufferOffset + 1] = position.y + radius * normalY;
          vertexBufferArray[currentVertexBufferOffset + 2] = position.z + radius * normalZ;
          currentVertexBufferOffset += 3;
          currentVertexIndex++;
        }
      }
      indexBufferArray = new Uint32Array((positions.length - 1) * radialSegmentsCount * 6);
      currentIndex = 0;
      for (segmentIndex = l = 0, ref1 = positions.length; 0 <= ref1 ? l < ref1 : l > ref1; segmentIndex = 0 <= ref1 ? ++l : --l) {
        segmentStartVertexIndex = segmentIndex * radialSegmentsCount;
        for (radialSegmentIndexA = m = 0, ref2 = radialSegmentsCount; 0 <= ref2 ? m < ref2 : m > ref2; radialSegmentIndexA = 0 <= ref2 ? ++m : --m) {
          radialSegmentIndexB = (radialSegmentIndexA + 1) % radialSegmentsCount;
          quadStartVertexIndexA = segmentStartVertexIndex + radialSegmentIndexA;
          quadStartVertexIndexB = segmentStartVertexIndex + radialSegmentIndexB;
          quadEndVertexIndexA = quadStartVertexIndexA + radialSegmentsCount;
          quadEndVertexIndexB = quadStartVertexIndexB + radialSegmentsCount;
          indexBufferArray[currentIndex] = quadEndVertexIndexA;
          indexBufferArray[currentIndex + 1] = quadStartVertexIndexA;
          indexBufferArray[currentIndex + 2] = quadStartVertexIndexB;
          indexBufferArray[currentIndex + 3] = quadEndVertexIndexA;
          indexBufferArray[currentIndex + 4] = quadStartVertexIndexB;
          indexBufferArray[currentIndex + 5] = quadEndVertexIndexB;
          currentIndex += 6;
        }
      }
      return {
        vertexBufferArray,
        normalArray,
        indexBufferArray
      };
    }
    static _mergeGeometryData(individualGeometryData) {
      var geometryData, globalVertexIndex, i, indexBufferArray, indexCount, indexOfIndex, indexOffset, j, k, len, len1, len2, localVertexIndex, normalArray, ref, ref1, vertexBufferArray, vertexBufferOffset, vertexCoordinate, vertexCoordinateIndex, vertexCount, vertexOffset;
      vertexCount = _.sumBy(individualGeometryData, geometryData => {
        return geometryData.vertexBufferArray.length;
      });
      indexCount = _.sumBy(individualGeometryData, geometryData => {
        return geometryData.indexBufferArray.length;
      });
      vertexBufferArray = new Float32Array(vertexCount);
      normalArray = new Float32Array(vertexCount);
      indexBufferArray = new Uint32Array(indexCount);
      vertexOffset = 0;
      indexOffset = 0;
      for (i = 0, len = individualGeometryData.length; i < len; i++) {
        geometryData = individualGeometryData[i];
        vertexBufferOffset = vertexOffset * 3;
        ref = geometryData.vertexBufferArray;
        for (vertexCoordinateIndex = j = 0, len1 = ref.length; j < len1; vertexCoordinateIndex = ++j) {
          vertexCoordinate = ref[vertexCoordinateIndex];
          vertexBufferArray[vertexBufferOffset + vertexCoordinateIndex] = vertexCoordinate;
          normalArray[vertexBufferOffset + vertexCoordinateIndex] = geometryData.normalArray[vertexCoordinateIndex];
        }
        ref1 = geometryData.indexBufferArray;
        for (indexOfIndex = k = 0, len2 = ref1.length; k < len2; indexOfIndex = ++k) {
          localVertexIndex = ref1[indexOfIndex];
          globalVertexIndex = localVertexIndex + vertexOffset;
          indexBufferArray[indexOffset + indexOfIndex] = globalVertexIndex;
        }
        vertexOffset += geometryData.vertexBufferArray.length / 3;
        indexOffset += geometryData.indexBufferArray.length;
      }
      return {
        vertexBufferArray,
        normalArray,
        indexBufferArray
      };
    }
    constructor(pixelArtEvaluation1, properties1) {
      var pixelSize;
      this.pixelArtEvaluation = pixelArtEvaluation1;
      this.properties = properties1;
      this.bitmapRectangle = this.constructor._getBoundingRectangleOfPoints(this.pixelArtEvaluation.layers[0].points).extrude(0, 1, 1, 0);
      this.bitmapOrigin = this.properties.bitmapOrigin || this.bitmapRectangle.center();
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      this.width = this.bitmapRectangle.width() * pixelSize;
      this.depth = this.bitmapRectangle.height() * pixelSize;
      this.height = this.properties.height || Math.min(this.width, this.depth);
    }
    _getLinePoints(line) {
      let removeLastClosedPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var addPoint, curvePointIndex, curvePointsCount, i, j, k, l, lastPoint, lastPointIndex, len, len1, parameter, part, point, pointIndex, points, position, previousPoint, radius, ref, ref1, ref2, ref3, samplePointIndex, tangent;
      points = [];
      addPoint = (coordinates, tangent, radius) => {
        coordinates = new THREE.Vector2(coordinates.x - this.bitmapOrigin.x + 0.5, coordinates.y - this.bitmapOrigin.y + 0.5);
        tangent = new THREE.Vector2().copy(tangent);
        return points.push(_.extend(coordinates, {
          tangent,
          radius
        }));
      };
      curvePointsCount = this.constructor.curveExtraPointsCount + 1;
      ref = line.parts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        if (part instanceof PAE.Line.Part.StraightLine) {
          tangent = new THREE.Vector2();
          part.displayLine2.delta(tangent);
          tangent.normalize();
          if (points.length) {
            lastPoint = _.last(points);
            if (!(Math.abs(tangent.x - lastPoint.tangent.x) < Number.EPSILON && Math.abs(tangent.y - lastPoint.tangent.y) < Number.EPSILON)) {
              lastPoint.outgoingTangent = tangent.clone();
            }
          } else {
            addPoint(part.displayLine2.start, tangent, part.points[0].radius);
          }
          addPoint(part.displayLine2.end, tangent, _.last(part.points).radius);
        }
        if (part instanceof PAE.Line.Part.Curve) {
          if (!points.length) {
            addPoint(part.displayPoints[0].position, part.displayPoints[0].tangent, part.points[0].radius);
          }
          previousPoint = part.displayPoints[0];
          lastPointIndex = part.displayPoints.length - (part.isClosed ? 0 : 1);
          for (pointIndex = j = 1, ref1 = lastPointIndex; 1 <= ref1 ? j <= ref1 : j >= ref1; pointIndex = 1 <= ref1 ? ++j : --j) {
            point = part.displayPoints[_.modulo(pointIndex, part.displayPoints.length)];
            for (curvePointIndex = k = 1, ref2 = curvePointsCount; 1 <= ref2 ? k <= ref2 : k >= ref2; curvePointIndex = 1 <= ref2 ? ++k : --k) {
              parameter = curvePointIndex / curvePointsCount;
              position = AP.BezierCurve.getPointOnCubicBezierCurve(previousPoint.position, previousPoint.controlPoints.after, point.controlPoints.before, point.position, parameter);
              tangent = new THREE.Vector2().lerpVectors(previousPoint.tangent, point.tangent, parameter);
              samplePointIndex = Math.round((part.points.length - 1) * parameter);
              radius = part.points[samplePointIndex].radius;
              addPoint(position, tangent, radius);
            }
            previousPoint = point;
          }
        }
      }
      if (line.isClosed && removeLastClosedPoint) {
        points.splice(points.length - 1, 1);
      }
      if (this.properties.flipped) {
        for (l = 0, len1 = points.length; l < len1; l++) {
          point = points[l];
          point.x *= -1;
          point.tangent.x *= -1;
          if ((ref3 = point.outgoingTangent) != null) {
            ref3.x *= -1;
          }
        }
      }
      return points;
    }
    positionSnapping() {
      return true; // Override if the shape prohibits snapping of position to pixels.
    }
    rotationStyle() {
      return this.constructor.RotationStyles.Perpendicular;
    }
    meshStyle() {
      return this.constructor.MeshStyles.Plane;
    }
    collisionShapeMargin() {
      return this.constructor.roughEdgeMargin;
    }
    createPhysicsDebugGeometry() {
      throw new AE.NotImplementedException("Part must provide a geometry for debugging physics.");
    }
    createCollisionShape() {
      throw new AE.NotImplementedException("Part must provide a collision shape.");
    }
    positionY() {
      return this.properties.positionY; // Override to determine the position from the shape itself.
    }
    getBoundingRectangle() {
      var bitmapBoundingRectangle, maxX, maxY, minX, minY, pixelSize;
      bitmapBoundingRectangle = this.bitmapRectangle.toObject();
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      minX = (bitmapBoundingRectangle.left - this.bitmapOrigin.x) * pixelSize;
      maxX = (bitmapBoundingRectangle.right - this.bitmapOrigin.x) * pixelSize;
      minY = (bitmapBoundingRectangle.top - this.bitmapOrigin.y) * pixelSize;
      maxY = (bitmapBoundingRectangle.bottom - this.bitmapOrigin.y) * pixelSize;
      return new AP.BoundingRectangle(minX, maxX, minY, maxY);
    }
    getHoleBoundaries() {
      var holeBoundary, i, len, pixelSize, ref, results, vertex, vertices;
      if (!this.holeBoundaries) {
        return;
      }
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      ref = this.holeBoundaries;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        holeBoundary = ref[i];
        vertices = function () {
          var j, len1, ref1, results1;
          ref1 = holeBoundary.vertices;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            vertex = ref1[j];
            results1.push(new THREE.Vector2().copy(vertex).multiplyScalar(pixelSize));
          }
          return results1;
        }();
        results.push(new AP.PolygonBoundary(vertices));
      }
      return results;
    }
  }
  ;
  Shape.RotationStyles = {
    Fixed: 'Fixed',
    Perpendicular: 'Perpendicular',
    Free: 'Free'
  };
  Shape.MeshStyles = {
    Plane: 'Plane',
    Extrusion: 'Extrusion'
  };
  Shape.roughEdgeMargin = 0.002; // m

  Shape.curveExtraPointsCount = 2;
  return Shape;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sphere.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/sphere.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, AS, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.Sphere = class Sphere extends Pinball.Part.Avatar.Shape {
  static detectShape(pixelArtEvaluation, properties) {
    var circle;
    // We can have a sphere shape if we detect a circle.
    if (!(circle = this._detectCircle(pixelArtEvaluation))) {
      return;
    }
    return new this(pixelArtEvaluation, properties, circle);
  }
  constructor(pixelArtEvaluation1, properties1, circle) {
    super(...arguments);
    this.pixelArtEvaluation = pixelArtEvaluation1;
    this.properties = properties1;
    this.bitmapOrigin = circle.position;
    this.radius = circle.radius * Pinball.CameraManager.orthographicPixelSize;
    this.continuousCollisionDetectionRadius = this.radius;
  }
  rotationStyle() {
    return this.constructor.RotationStyles.Fixed;
  }
  collisionShapeMargin() {
    return null;
  }
  createPhysicsDebugGeometry() {
    return new THREE.SphereGeometry(this.radius, 8, 4);
  }
  createCollisionShape() {
    return new Ammo.btSphereShape(this.radius);
  }
  positionY() {
    return this.properties.positionY || this.radius;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"box.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/box.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, AS, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.Box = class Box extends Pinball.Part.Avatar.Shape {
  static detectShape(pixelArtEvaluation, properties) {
    if (!pixelArtEvaluation.layers[0].points.length) {
      return;
    }
    return new this(pixelArtEvaluation, properties);
  }
  createPhysicsDebugGeometry() {
    return new THREE.BoxGeometry(this.width, this.height, this.depth);
  }
  createCollisionShape() {
    return new Ammo.btBoxShape(new Ammo.btVector3(this.width / 2, this.height / 2, this.depth / 2));
  }
  positionY() {
    return this.properties.positionY || this.height / 2;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cylinder.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/cylinder.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, AS, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.Cylinder = class Cylinder extends Pinball.Part.Avatar.Shape {
  static detectShape(pixelArtEvaluation, properties) {
    var circle;
    // We can have a cylinder shape if we detect a circle.
    if (!(circle = this._detectCircle(pixelArtEvaluation))) {
      return;
    }
    return new this(pixelArtEvaluation, properties, circle);
  }
  constructor(pixelArtEvaluation1, properties1, circle) {
    var ref;
    super(...arguments);
    this.pixelArtEvaluation = pixelArtEvaluation1;
    this.properties = properties1;
    this.bitmapOrigin = circle.position;
    this.radius = circle.radius * Pinball.CameraManager.orthographicPixelSize * ((ref = this.properties.radiusRatio) != null ? ref : 1);
    this.continuousCollisionDetectionRadius = this.radius;
  }
  rotationStyle() {
    return this.constructor.RotationStyles.Fixed;
  }
  collisionShapeMargin() {
    return null;
  }
  createPhysicsDebugGeometry() {
    return new THREE.CylinderGeometry(this.radius, this.radius, this.height);
  }
  createCollisionShape() {
    return new Ammo.btCylinderShape(new Ammo.btVector3(this.radius, this.height / 2, this.radius));
  }
  positionY() {
    return this.properties.positionY || this.height / 2;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"trianglemesh.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/trianglemesh.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.TriangleMesh = class TriangleMesh extends Pinball.Part.Avatar.Shape {
  createPhysicsDebugGeometry() {
    var geometry;
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.geometryData.vertexBufferArray, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(this.geometryData.normalArray, 3));
    geometry.setIndex(new THREE.BufferAttribute(this.geometryData.indexBufferArray, 1));
    geometry.computeBoundingBox();
    return geometry;
  }
  createCollisionShape() {
    var i, index, indexBufferArray, ref, triangleMesh, triangleVertices, vertexBufferArray, vertexCoordinateIndex, vertexIndex;
    if (!this.geometryData.vertexBufferArray.length) {
      return new Ammo.btCompoundShape();
    }
    triangleMesh = new Ammo.btTriangleMesh();
    vertexBufferArray = this.geometryData.vertexBufferArray;
    indexBufferArray = this.geometryData.indexBufferArray;
    for (index = i = 0, ref = indexBufferArray.length; i < ref; index = i += 3) {
      triangleVertices = function () {
        var j, results;
        results = [];
        for (vertexIndex = j = 0; j <= 2; vertexIndex = ++j) {
          vertexCoordinateIndex = indexBufferArray[index + vertexIndex] * 3;
          results.push(new Ammo.btVector3(vertexBufferArray[vertexCoordinateIndex], vertexBufferArray[vertexCoordinateIndex + 1], vertexBufferArray[vertexCoordinateIndex + 2]));
        }
        return results;
      }();
      triangleMesh.addTriangle(triangleVertices[0], triangleVertices[1], triangleVertices[2]);
    }
    return new Ammo.btBvhTriangleMeshShape(triangleMesh);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"extrusion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/extrusion.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.Extrusion = class Extrusion extends Pinball.Part.Avatar.TriangleMesh {
  static detectShape(pixelArtEvaluation, properties) {
    if (!pixelArtEvaluation.layers[0].cores.length) {
      return;
    }
    return new this(pixelArtEvaluation, properties);
  }
  constructor(pixelArtEvaluation1, properties1) {
    var boundaries, core, i, individualGeometryData, j, len, len1, line, points, polygon, polygonWithoutHoles, ref, ref1;
    super(...arguments);
    this.pixelArtEvaluation = pixelArtEvaluation1;
    this.properties = properties1;
    individualGeometryData = [];
    this.boundaries = [];
    ref = this.pixelArtEvaluation.layers[0].cores;
    for (i = 0, len = ref.length; i < len; i++) {
      core = ref[i];
      boundaries = [];
      ref1 = core.outlines;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        line = ref1[j];
        points = this._getLinePoints(line);
        boundaries.push(new AP.PolygonBoundary(points));
      }
      this.boundaries.push(...boundaries);
      polygon = new AP.PolygonWithHoles(boundaries);
      polygonWithoutHoles = polygon.getPolygonWithoutHoles();
      individualGeometryData.push(this.constructor._createExtrudedVerticesAndIndices(polygon.boundaries, -this.height, 0, this.properties.flipped));
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(polygonWithoutHoles, 0, 1));
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(polygonWithoutHoles, -this.height, -1));
    }
    this.geometryData = this.constructor._mergeGeometryData(individualGeometryData);
  }
  positionY() {
    return this.properties.positionY || this.height;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"taperedextrusion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/taperedextrusion.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.TaperedExtrusion = class TaperedExtrusion extends Pinball.Part.Avatar.TriangleMesh {
  static detectShape(pixelArtEvaluation, properties) {
    if (!pixelArtEvaluation.layers[0].cores.length) {
      return;
    }
    return new this(pixelArtEvaluation, properties);
  }
  constructor(pixelArtEvaluation1, properties1) {
    var bottomPolygon, bottomPolygonWithoutHoles, boundaries, boundary, boundaryIndex, core, error, i, individualGeometryData, j, k, l, len, len1, len2, len3, len4, len5, line, m, n, point, pointIndex, points, polygon, ref, ref1, ref2, ref3, ref4, taperDistanceBottom, taperDistanceTop, taperedBoundary, topPolygon, topPolygonWithoutHoles, vertex, vertexIndex;
    super(...arguments);
    this.pixelArtEvaluation = pixelArtEvaluation1;
    this.properties = properties1;
    individualGeometryData = [];
    taperDistanceTop = this.properties.taperDistanceTop / Pinball.CameraManager.orthographicPixelSize;
    taperDistanceBottom = this.properties.taperDistanceBottom / Pinball.CameraManager.orthographicPixelSize;
    this.boundaries = [];
    this.taperedBoundariesTop = [];
    this.taperedBoundariesBottom = [];
    ref = this.pixelArtEvaluation.layers[0].cores;
    for (i = 0, len = ref.length; i < len; i++) {
      core = ref[i];
      boundaries = [];
      ref1 = core.outlines;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        line = ref1[j];
        points = this._getLinePoints(line);
        boundary = new AP.PolygonBoundary(points);
        boundaries.push(boundary);
        for (pointIndex = k = 0, len2 = points.length; k < len2; pointIndex = ++k) {
          point = points[pointIndex];
          boundary.vertices[pointIndex].tangent = point.tangent;
        }
      }
      polygon = new AP.PolygonWithHoles(boundaries);
      topPolygon = polygon.getInsetPolygon(taperDistanceTop);
      bottomPolygon = polygon.getInsetPolygon(taperDistanceBottom);
      try {
        topPolygonWithoutHoles = topPolygon.getPolygonWithoutHoles();
        bottomPolygonWithoutHoles = bottomPolygon.getPolygonWithoutHoles();
      } catch (error1) {
        error = error1;
        // Looks like the holes weren't able to be removed, so try an inset with just the outer boundary.
        polygon = new AP.PolygonWithHoles(polygon.externalBoundary, []);
        topPolygon = polygon.getInsetPolygon(taperDistanceTop);
        bottomPolygon = polygon.getInsetPolygon(taperDistanceBottom);
        topPolygonWithoutHoles = topPolygon.getPolygonWithoutHoles();
        bottomPolygonWithoutHoles = bottomPolygon.getPolygonWithoutHoles();
      }
      ref2 = polygon.boundaries;
      for (boundaryIndex = l = 0, len3 = ref2.length; l < len3; boundaryIndex = ++l) {
        boundary = ref2[boundaryIndex];
        ref3 = boundary.vertices;
        for (vertexIndex = m = 0, len4 = ref3.length; m < len4; vertexIndex = ++m) {
          vertex = ref3[vertexIndex];
          ref4 = [topPolygon.boundaries[boundaryIndex], bottomPolygon.boundaries[boundaryIndex]];
          for (n = 0, len5 = ref4.length; n < len5; n++) {
            taperedBoundary = ref4[n];
            taperedBoundary.vertices[vertexIndex].tangent = vertex.tangent;
          }
        }
      }
      individualGeometryData.push(this.constructor._createTaperedVerticesAndIndices(bottomPolygon.boundaries, topPolygon.boundaries, -this.height, 0, this.properties.flipped));
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(topPolygonWithoutHoles, 0, 1));
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(bottomPolygonWithoutHoles, -this.height, -1));
      this.boundaries.push(...boundaries);
      this.taperedBoundariesTop.push(...topPolygon.boundaries);
      this.taperedBoundariesBottom.push(...bottomPolygon.boundaries);
    }
    this.geometryData = this.constructor._mergeGeometryData(individualGeometryData);
  }
  positionY() {
    return this.properties.positionY || this.height;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"convexextrusion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/convexextrusion.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.ConvexExtrusion = class ConvexExtrusion extends Pinball.Part.Avatar.Shape {
  static detectShape(pixelArtEvaluation, properties) {
    if (!pixelArtEvaluation.layers[0].cores.length) {
      return;
    }
    return new this(pixelArtEvaluation, properties);
  }
  constructor(pixelArtEvaluation1, properties1) {
    var boundaries, core, i, individualGeometryData, j, len, len1, line, points, polygon, polygonWithoutHoles, ref, ref1;
    super(...arguments);
    this.pixelArtEvaluation = pixelArtEvaluation1;
    this.properties = properties1;
    if (!this.properties.bitmapOrigin) {
      this.bitmapOrigin = this._calculateBitmapOrigin();
    }
    this.topY = this.height / 2;
    this.bottomY = -this.height / 2;
    this.boundaries = [];
    individualGeometryData = [];
    ref = this.pixelArtEvaluation.layers[0].cores;
    for (i = 0, len = ref.length; i < len; i++) {
      core = ref[i];
      boundaries = [];
      ref1 = core.outlines;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        line = ref1[j];
        points = this._getLinePoints(line);
        boundaries.push(new AP.PolygonBoundary(points));
      }
      this.boundaries.push(...boundaries);
      polygon = new AP.PolygonWithHoles(boundaries);
      polygonWithoutHoles = polygon.getPolygonWithoutHoles();
      individualGeometryData.push(this.constructor._createExtrudedVerticesAndIndices(polygon.boundaries, this.bottomY, this.topY, this.properties.flipped));
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(polygonWithoutHoles, this.bottomY, -1));
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(polygonWithoutHoles, this.topY, 1));
    }
    this.geometryData = this.constructor._mergeGeometryData(individualGeometryData);
  }
  _calculateBitmapOrigin() {
    return this.constructor._calculateCenterOfMass(this.pixelArtEvaluation);
  }
  createPhysicsDebugGeometry() {
    var geometry;
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.geometryData.vertexBufferArray, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(this.geometryData.normalArray, 3));
    geometry.setIndex(new THREE.BufferAttribute(this.geometryData.indexBufferArray, 1));
    geometry.computeBoundingBox();
    return geometry;
  }
  createCollisionShape() {
    var boundary, convexHullShape, hullPoint, i, j, len, len1, pixelSize, ref, ref1, vertex;
    convexHullShape = new Ammo.btConvexHullShape();
    hullPoint = Ammo.btVector3.zero();
    pixelSize = Pinball.CameraManager.orthographicPixelSize;
    ref = this.boundaries;
    for (i = 0, len = ref.length; i < len; i++) {
      boundary = ref[i];
      ref1 = boundary.vertices;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        vertex = ref1[j];
        hullPoint.setX(vertex.x * pixelSize);
        hullPoint.setY(this.topY);
        hullPoint.setZ(vertex.y * pixelSize);
        convexHullShape.addPoint(hullPoint, false);
        hullPoint.setY(this.bottomY);
        convexHullShape.addPoint(hullPoint, false);
      }
    }
    convexHullShape.recalcLocalAabb();
    return convexHullShape;
  }
  positionY() {
    return this.properties.positionY || -this.bottomY + 2 * this.collisionShapeMargin();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"depression.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/depression.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.Depression = class Depression extends Pinball.Part.Avatar.TriangleMesh {
  static detectShape(pixelArtEvaluation, properties) {
    if (!pixelArtEvaluation.layers[0].cores.length) {
      return;
    }
    return new this(pixelArtEvaluation, properties);
  }
  constructor(pixelArtEvaluation1, properties1) {
    var boundaries, boundary, core, i, individualGeometryData, internalBoundary, invertedBoundaries, j, k, len, len1, len2, line, points, polygon, polygonWithoutHoles, ref, ref1, ref2, topPolygon;
    super(...arguments);
    this.pixelArtEvaluation = pixelArtEvaluation1;
    this.properties = properties1;
    this.holeBoundaries = [];
    individualGeometryData = [];
    ref = this.pixelArtEvaluation.layers[0].cores;
    for (i = 0, len = ref.length; i < len; i++) {
      core = ref[i];
      boundaries = [];
      ref1 = core.outlines;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        line = ref1[j];
        points = this._getLinePoints(line);
        boundaries.push(new AP.PolygonBoundary(points));
      }
      polygon = new AP.PolygonWithHoles(boundaries);
      polygonWithoutHoles = polygon.getPolygonWithoutHoles();
      this.holeBoundaries.push(polygon.externalBoundary);
      // Depression walls are on the inside of the polygon so we have to invert them.
      invertedBoundaries = function () {
        var k, len2, ref2, results;
        ref2 = polygon.boundaries;
        results = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          boundary = ref2[k];
          results.push(boundary.getBoundaryWithInvertedOrientation());
        }
        return results;
      }();
      individualGeometryData.push(this.constructor._createExtrudedVerticesAndIndices(invertedBoundaries, 0, this.height, !this.properties.flipped));

      // Bottom of the hole is a normal polygon.
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(polygonWithoutHoles, 0, 1));
      ref2 = polygon.internalBoundaries;

      // All the internal islands creat top of the hole polygons.
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        internalBoundary = ref2[k];
        topPolygon = new AP.Polygon(internalBoundary);
        individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(topPolygon, this.height, 1));
      }
    }
    this.geometryData = this.constructor._mergeGeometryData(individualGeometryData);
  }
  positionY() {
    return this.properties.positionY || -this.height;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"silhouette.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/part/avatar/silhouette.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, AR, AS, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AS = Artificial.Spectrum;
AR = Artificial.Reality;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Part.Avatar.Silhouette = class Silhouette extends Pinball.Part.Avatar.TriangleMesh {
  static detectShape(pixelArtEvaluation, properties) {
    if (!pixelArtEvaluation.layers[0].cores.length) {
      return;
    }
    return new this(pixelArtEvaluation, properties);
  }
  constructor(pixelArtEvaluation1, properties1) {
    var boundaries, core, i, individualGeometryData, j, len, len1, line, polygon, ref, ref1;
    super(...arguments);
    this.pixelArtEvaluation = pixelArtEvaluation1;
    this.properties = properties1;
    individualGeometryData = [];
    ref = this.pixelArtEvaluation.layers[0].cores;
    for (i = 0, len = ref.length; i < len; i++) {
      core = ref[i];
      boundaries = [];
      ref1 = core.outlines;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        line = ref1[j];
        boundaries.push(new AP.PolygonBoundary(this._getLinePoints(line)));
      }
      polygon = new AP.PolygonWithHoles(boundaries).getPolygonWithoutHoles();
      individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(polygon, this.properties.yOffset || 0, 1));
    }
    this.geometryData = this.constructor._mergeGeometryData(individualGeometryData);
  }
  positionY() {
    return this.properties.positionY || 0;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"parts":{"parts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/parts.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA, Pinball;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts = class Parts {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ballspawner.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/ballspawner.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var CollisionGroups, LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
CollisionGroups = Pinball.PhysicsManager.CollisionGroups;
Pinball.Parts.BallSpawner = function () {
  class BallSpawner extends Pinball.Part {
    // captive: boolean whether the spawned ball is captive
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.BallSpawner';
    }
    static fullName() {
      return "球";
    }
    static description() {
      return "标记球将生成的位置。";
    }
    static assetId() {
      return Pinball.Assets.Ball.id();
    }
    static avatarShapes() {
      return [Pinball.Part.Avatar.Sphere, Pinball.Part.Avatar.ConvexExtrusion];
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawBall;
    }
    settings() {
      return {
        captive: {
          name: '禁闭球',
          type: Pinball.Interface.Settings.Boolean.id()
        }
      };
    }
    constants() {
      return {
        restitution: Pinball.PhysicsManager.BallConstants.Restitution,
        friction: Pinball.PhysicsManager.BallConstants.Friction,
        rollingFriction: Pinball.PhysicsManager.BallConstants.RollingFriction,
        collisionGroup: CollisionGroups.Balls,
        collisionMask: CollisionGroups.Balls | CollisionGroups.BallGuides | CollisionGroups.Actuators,
        continuousCollisionDetection: true
      };
    }
    spawnBall() {
      var ball;
      ball = new Pinball.Ball(this.pinball, this);
      if (this.data().captive) {
        ball.state(Pinball.Ball.States.Captive);
      }
      return ball;
    }
  }
  ;
  BallSpawner.initialize();
  return BallSpawner;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"walls.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/walls.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts.Walls = function () {
  class Walls extends Pinball.Part {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Walls';
    }
    static fullName() {
      return "墙壁";
    }
    static description() {
      return "球场的边缘。";
    }
    static assetId() {
      return Pinball.Assets.Playfield.id();
    }
    static avatarShapes() {
      return [Pinball.Part.Avatar.Extrusion];
    }
    constants() {
      return {
        height: Pinball.SceneManager.playfieldHeight,
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Wood,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Coarse,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls
      };
    }
  }
  ;
  Walls.initialize();
  return Walls;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wireballguides.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/wireballguides.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball, _down, _up;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_up = new THREE.Vector3(0, 1, 0);
_down = new THREE.Vector3(0, -1, 0);
Pinball.Parts.WireBallGuides = function () {
  class WireBallGuides extends Pinball.Part {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.WireBallGuides';
    }
    static fullName() {
      return "线球导轨";
    }
    static description() {
      return "引导球沿车道前进的细线。";
    }
    static assetId() {
      return Pinball.Assets.Playfield.id();
    }
    static avatarClass() {
      return this.Avatar;
    }
    constants() {
      return {
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Metal,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls,
        hidden: true
      };
    }
    extraShapeProperties() {
      var sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      return {
        height: sceneManager.ballPositionY() + this.constructor.Avatar.Shape.joinDistance
      };
    }
  }
  ;
  WireBallGuides.initialize();
  WireBallGuides.Avatar = function () {
    class Avatar extends Pinball.Part.Avatar {
      _createShape() {
        var lines, pixelArtEvaluation;
        if (!(pixelArtEvaluation = this.part.pixelArtEvaluation())) {
          return;
        }
        if (!pixelArtEvaluation.layers[0].points.length) {
          return;
        }
        lines = _.filter(pixelArtEvaluation.layers[0].lines, line => {
          return !line.core;
        });
        return new this.constructor.Shape(pixelArtEvaluation, this.part.shapeProperties(), lines);
      }
    }
    ;
    Avatar.Shape = function () {
      class Shape extends Pinball.Part.Avatar.TriangleMesh {
        constructor(pixelArtEvaluation1, properties, lines) {
          var firstLinePoint, i, individualGeometryData, lastLinePoint, len, line, linePoints, pixelSize, point, points;
          super(...arguments);
          this.pixelArtEvaluation = pixelArtEvaluation1;
          this.properties = properties;
          pixelSize = Pinball.CameraManager.orthographicPixelSize;
          individualGeometryData = [];
          for (i = 0, len = lines.length; i < len; i++) {
            line = lines[i];
            points = this._getLinePoints(line, false);
            linePoints = function () {
              var j, len1, results;
              results = [];
              for (j = 0, len1 = points.length; j < len1; j++) {
                point = points[j];
                results.push({
                  position: new THREE.Vector3(point.x * pixelSize, 0, point.y * pixelSize),
                  radius: this.constructor.wireRadius,
                  tangent: new THREE.Vector3(point.tangent.x, 0, point.tangent.y),
                  outgoingTangent: point.outgoingTangent ? new THREE.Vector3(point.outgoingTangent.x, 0, point.outgoingTangent.y) : null,
                  normal: _up
                });
              }
              return results;
            }.call(this);
            firstLinePoint = linePoints[0];
            firstLinePoint.outgoingNormal = firstLinePoint.normal;
            firstLinePoint.normal = firstLinePoint.tangent.clone().negate();
            firstLinePoint.outgoingTangent = firstLinePoint.tangent;
            firstLinePoint.tangent = _up;
            linePoints.unshift({
              position: new THREE.Vector3(firstLinePoint.position.x, -this.height, firstLinePoint.position.z),
              radius: this.constructor.wireRadius,
              tangent: firstLinePoint.tangent,
              normal: firstLinePoint.normal
            });
            lastLinePoint = _.last(linePoints);
            lastLinePoint.outgoingNormal = lastLinePoint.tangent;
            lastLinePoint.outgoingTangent = _down;
            linePoints.push({
              position: new THREE.Vector3(lastLinePoint.position.x, -this.height, lastLinePoint.position.z),
              radius: this.constructor.wireRadius,
              tangent: lastLinePoint.outgoingTangent,
              normal: lastLinePoint.outgoingNormal
            });
            individualGeometryData.push(this.constructor._createLineVerticesAndIndices(linePoints, 8, this.constructor.joinDistance));
          }
          this.geometryData = this.constructor._mergeGeometryData(individualGeometryData);
        }
        positionY() {
          return this.height;
        }
      }
      ;
      Shape.wireRadius = 0.001;
      Shape.joinDistance = 0.0015;
      return Shape;
    }.call(this);
    return Avatar;
  }.call(this);
  return WireBallGuides;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pins.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/pins.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts.Pins = function () {
  class Pins extends Pinball.Part {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Pins';
    }
    static fullName() {
      return "针";
    }
    static description() {
      return "弹球中的针，改变球轨迹的小金属针。";
    }
    static assetId() {
      return Pinball.Assets.Playfield.id();
    }
    static avatarClass() {
      return this.Avatar;
    }
    constants() {
      return {
        height: 0.03,
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Metal,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls,
        hidden: true
      };
    }
  }
  ;
  Pins.initialize();
  Pins.Avatar = function () {
    class Avatar extends Pinball.Part.Avatar {
      _createShape() {
        var pixelArtEvaluation, points;
        if (!(pixelArtEvaluation = this.part.pixelArtEvaluation())) {
          return;
        }
        if (!pixelArtEvaluation.layers[0].points.length) {
          return;
        }
        points = _.filter(pixelArtEvaluation.layers[0].points, point => {
          return !point.neighbors.length;
        });
        return new this.constructor.Shape(pixelArtEvaluation, this.part.shapeProperties(), points);
      }
    }
    ;
    Avatar.Shape = class Shape extends Pinball.Part.Avatar.Shape {
      constructor(pixelArtEvaluation1, properties, points) {
        var pixelSize, point;
        super(...arguments);
        this.pixelArtEvaluation = pixelArtEvaluation1;
        this.properties = properties;
        pixelSize = Pinball.CameraManager.orthographicPixelSize;
        this.pins = function () {
          var i, len, results;
          results = [];
          for (i = 0, len = points.length; i < len; i++) {
            point = points[i];
            results.push({
              x: (point.x + 0.5 - this.bitmapOrigin.x) * pixelSize,
              z: (point.y + 0.5 - this.bitmapOrigin.y) * pixelSize,
              radius: point.radius * pixelSize * Pinball.Parts.Pin.radiusRatio
            });
          }
          return results;
        }.call(this);
      }
      createPhysicsDebugGeometry() {
        var cylinder, cylinders, index, pin, positionAttribute;
        if (!this.pins.length) {
          return;
        }
        cylinders = function () {
          var i, j, len, ref, ref1, results;
          ref = this.pins;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            pin = ref[i];
            cylinder = new THREE.CylinderGeometry(pin.radius, pin.radius, this.height);
            positionAttribute = cylinder.getAttribute('position');
            for (index = j = 0, ref1 = positionAttribute.array.length; j < ref1; index = j += 3) {
              positionAttribute.array[index] += pin.x;
              positionAttribute.array[index + 2] += pin.z;
            }
            results.push(cylinder);
          }
          return results;
        }.call(this);
        return THREE.BufferGeometryUtils.mergeGeometries(cylinders);
      }
      createCollisionShape() {
        var collisionShape, cylinder, i, len, pin, ref, transform;
        collisionShape = new Ammo.btCompoundShape();
        ref = this.pins;
        for (i = 0, len = ref.length; i < len; i++) {
          pin = ref[i];
          cylinder = new Ammo.btCylinderShape(new Ammo.btVector3(pin.radius, this.height / 2, pin.radius));
          transform = new Ammo.btTransform(Ammo.btQuaternion.identity(), new Ammo.btVector3(pin.x, 0, pin.z));
          collisionShape.addChildShape(transform, cylinder);
        }
        return collisionShape;
      }
      positionY() {
        return this.height / 2;
      }
    };
    return Avatar;
  }.call(this);
  return Pins;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"plunger.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/plunger.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball, _displacedPosition;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_displacedPosition = new THREE.Vector3();
Pinball.Parts.Plunger = function () {
  class Plunger extends Pinball.Part {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Plunger';
    }
    static fullName() {
      return "发射器";
    }
    static description() {
      return "玩家控制的弹簧杆，允许玩家把球送入游戏中。";
    }
    static assetId() {
      return Pinball.Assets.Plunger.id();
    }
    static avatarShapes() {
      return [Pinball.Part.Avatar.Extrusion];
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawBall;
    }
    settings() {
      return {
        pullingSpeed: {
          name: '拉动速度',
          unit: "m/s",
          type: Pinball.Interface.Settings.Number.id(),
          min: 0.01,
          max: 0.5,
          step: 0.01,
          default: 0.05
        },
        releaseSpeed: {
          name: '释放速度',
          unit: "m/s",
          type: Pinball.Interface.Settings.Number.id(),
          min: 0.1,
          max: 5,
          step: 0.1,
          default: 1.5
        }
      };
    }
    constants() {
      return {
        height: 0.02,
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Plastic,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.Actuators,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls
      };
    }
    onAddedToDynamicsWorld(physicsManager) {
      var physicsObject;
      // Plunger is a player-controlled kinematic object.
      physicsObject = this.avatar.getPhysicsObject();
      this.origin = physicsObject.getPosition();
      physicsObject.body.setCollisionFlags(physicsObject.body.getCollisionFlags() | Ammo.btCollisionObject.CollisionFlags.KinematicObject);
      return physicsObject.body.setActivationState(Ammo.btCollisionObject.ActivationStates.DisableDeactivation);
    }
    reset() {
      var physicsObject;
      super.reset(...arguments);
      if (physicsObject = this.avatar.getPhysicsObject()) {
        this.origin = physicsObject.getPosition();
      }
      this.active = false;
      this.moving = false;
      return this.displacement = 0;
    }
    activate() {
      var physicsObject;
      this.active = true;
      this.moving = true;
      physicsObject = this.avatar.getPhysicsObject();
      this.displacement = physicsObject.getPosition().z - this.origin.z;
      return this.pinball.audioManager().plungerStart();
    }
    deactivate() {
      this.active = false;
      this._releaseSpeed = -this.data().releaseSpeed * this.displacement / this.shape().depth;
      return this.pinball.audioManager().plungerEnd();
    }
    fixedUpdate(elapsed) {
      var distance, maxDisplacement, physicsObject, speed;
      if (!this.moving) {
        return;
      }
      physicsObject = this.avatar.getPhysicsObject();
      maxDisplacement = this.shape().depth * this.constructor.maxDisplacementRatio;
      if (this.active) {
        if (this.displacement >= maxDisplacement) {
          // We reached maximum displacement, stop.
          this.displacement = maxDisplacement;
          speed = 0;
          this.pinball.audioManager().plungerEnd();
        } else {
          // Keep pulling the plunger.
          speed = this.data().pullingSpeed;
        }
      } else {
        if (this.displacement < 0) {
          // We reached the origin.
          this.moving = false;
          this.displacement = 0;
          speed = 0;
        } else {
          // Keep releasing the plunger.
          speed = this._releaseSpeed;
        }
      }
      distance = speed * elapsed;
      this.displacement += distance;
      _displacedPosition.copy(this.origin);
      _displacedPosition.z += this.displacement;
      return physicsObject.setPosition(_displacedPosition);
    }
  }
  ;
  Plunger.initialize();
  Plunger.maxDisplacementRatio = 0.8;
  return Plunger;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flipper.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/flipper.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA, Pinball, _rotationQuaternion;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_rotationQuaternion = new THREE.Quaternion();
Pinball.Parts.Flipper = function () {
  class Flipper extends Pinball.Part {
    // maxAngleDegrees: the amount the flipper displaces when engaged
    // angularSpeedDegrees: the amount of degrees per second the flipper rotates at
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Flipper';
    }
    static fullName() {
      return "挡板";
    }
    static description() {
      return "让玩家控制球的球棒。";
    }
    static assetId() {
      return Pinball.Assets.Flipper.id();
    }
    static avatarShapes() {
      return [Pinball.Part.Avatar.Extrusion];
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawFlipper;
    }
    constructor() {
      super(...arguments);
      this.active = false;
      this.moving = false;
      this.displacementAngle = 0;
    }
    settings() {
      return {
        maxAngleDegrees: {
          name: '角度范围',
          unit: "°",
          type: Pinball.Interface.Settings.Number.id(),
          min: 1,
          max: 180,
          step: 1,
          default: 45
        },
        angularSpeedDegrees: {
          name: '速度',
          unit: "°/s",
          type: Pinball.Interface.Settings.Number.id(),
          min: 100,
          max: 4000,
          step: 100,
          default: 2000
        }
      };
    }
    constants() {
      return {
        bitmapOrigin: {
          x: 6.5,
          y: 6.5
        },
        restitution: Pinball.PhysicsManager.RestitutionConstants.Rubber,
        friction: Pinball.PhysicsManager.FrictionConstants.Rubber,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Rubber,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.Actuators,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls
      };
    }
    extraShapeProperties() {
      var sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      return {
        height: sceneManager.ballPositionY() * 2
      };
    }
    onAddedToDynamicsWorld(physicsManager) {
      var physicsObject;
      // Flipper is a player-controlled kinematic object.
      physicsObject = this.avatar.getPhysicsObject();
      this.origin = physicsObject.getPosition();
      physicsObject.body.setCollisionFlags(physicsObject.body.getCollisionFlags() | Ammo.btCollisionObject.CollisionFlags.KinematicObject);
      return physicsObject.body.setActivationState(Ammo.btCollisionObject.ActivationStates.DisableDeactivation);
    }
    reset() {
      super.reset(...arguments);
      this.active = false;
      this.moving = false;
      return this.displacementAngle = 0;
    }
    activate() {
      var physicsObject, rotationAngles, rotationQuaternion;
      this.active = true;
      this.moving = true;
      physicsObject = this.avatar.getPhysicsObject();
      rotationQuaternion = THREE.Quaternion.fromObject(physicsObject.getRotationQuaternion());
      rotationAngles = new THREE.Euler().setFromQuaternion(rotationQuaternion);
      this.displacementAngle = rotationAngles.y;
      return this.pinball.audioManager().flipperActivate();
    }
    deactivate() {
      this.active = false;
      return this.pinball.audioManager().flipperDeactivate();
    }
    fixedUpdate(elapsed) {
      var angleChange, angularSpeed, data, displacementSign, maxDisplacement, physicsObject, positiveDisplacement;
      if (!this.moving) {
        return;
      }
      data = this.data();
      maxDisplacement = AR.Conversions.degreesToRadians(data.maxAngleDegrees);
      displacementSign = this.data().flipped ? -1 : 1;
      positiveDisplacement = this.displacementAngle * displacementSign;
      angularSpeed = AR.Conversions.degreesToRadians(data.angularSpeedDegrees);
      if (this.active) {
        if (positiveDisplacement >= maxDisplacement) {
          // We reached maximum displacement, stop.
          this.displacementAngle = maxDisplacement * displacementSign;
          angularSpeed = 0;
        } else {
          // Keep activating the flipper.
          angularSpeed = angularSpeed * displacementSign;
        }
      } else {
        if (positiveDisplacement < 0) {
          // We reached the origin.
          this.moving = false;
          this.displacementAngle = 0;
          angularSpeed = 0;
        } else {
          // Keep deactivating the flipper.
          angularSpeed = -angularSpeed * displacementSign;
        }
      }
      angleChange = angularSpeed * elapsed;
      this.displacementAngle += angleChange;
      _rotationQuaternion.setFromAxisAngle(this.constructor.rotationAxis, this.rotationAngle() + this.displacementAngle);
      physicsObject = this.avatar.getPhysicsObject();
      return physicsObject.setRotationQuaternion(_rotationQuaternion);
    }
  }
  ;
  Flipper.initialize();
  Flipper.rotationAxis = new THREE.Vector3(0, 1, 0);
  return Flipper;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hole.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/hole.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AR, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts.Hole = class Hole extends Pinball.Part {
  static avatarShapes() {
    return [Pinball.Part.Avatar.Depression];
  }
  static triggerPositionYRatio() {
    return 0.5; // Override to position the trigger elsewhere (1 is top, 0 is bottom).
  }
  constructor() {
    super(...arguments);
    this.trigger = new AR.Trigger({
      onEnter: rigidBody => {
        var ball, ref;
        if (!(((ref = rigidBody.physicsObject) != null ? ref.entity : void 0) instanceof Pinball.Ball)) {
          return;
        }
        ball = rigidBody.physicsObject.entity;
        if (ball.state() === Pinball.Ball.States.Dead) {
          return;
        }
        return this.onBallEnter(ball);
      }
    });
    this.triggerCollider = new AE.LiveComputedField(() => {
      var shape, triggerCollider, triggerShape;
      if (!(shape = this.avatar.shape())) {
        return;
      }
      triggerShape = Pinball.Part.Avatar.Silhouette.detectShape(shape.pixelArtEvaluation, {
        yOffset: shape.height * this.constructor.triggerPositionYRatio()
      });
      if (!triggerShape) {
        return;
      }
      triggerCollider = new Ammo.btGhostObject();
      triggerCollider.setCollisionShape(triggerShape.createCollisionShape());
      return triggerCollider;
    });
  }
  destroy() {
    super.destroy(...arguments);
    return this.triggerCollider.stop();
  }
  playfieldHoleBoundaries() {
    return this.avatar.getHoleBoundaries();
  }
  update() {
    var physicsObject, triggerCollider;
    if (!(physicsObject = this.avatar.getPhysicsObject())) {
      return;
    }
    if (!(triggerCollider = this.triggerCollider())) {
      return;
    }
    triggerCollider.setWorldTransform(physicsObject.body.getWorldTransform());
    return this.trigger.test(triggerCollider, this.pinball.physicsManager().dynamicsWorld);
  }
  onBallEnter(ball) {} // Override to perform any logic when the ball enters the hole.
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"gobblehole.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/gobblehole.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA, Pinball;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts.GobbleHole = function () {
  class GobbleHole extends Pinball.Parts.Hole {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.GobbleHole';
    }
    static fullName() {
      return "吞噬洞";
    }
    static description() {
      return "球场上结束当前球的洞。";
    }
    static assetId() {
      return Pinball.Assets.GobbleHole.id();
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawGobbleHole;
    }
    settings() {
      return {
        points: {
          name: '分数',
          type: Pinball.Interface.Settings.Number.id(),
          default: 1000
        }
      };
    }
    constants() {
      return {
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Wood,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Coarse,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls,
        physicsDebugMaterial: Pinball.Parts.Playfield.physicsDebugMaterial
      };
    }
    extraShapeProperties() {
      var sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      return {
        height: sceneManager.ballPositionY() * 4
      };
    }
    onBallEnter(ball) {
      var points;
      ball.die();
      this.pinball.audioManager().gobbleHole();
      if (!(points = this.data().points)) {
        return;
      }
      return this.pinball.gameManager().addPoints(points);
    }
  }
  ;
  GobbleHole.initialize();
  return GobbleHole;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"playfield.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/playfield.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, LOI, PAA, PAE, Pinball;
AE = Artificial.Everywhere;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts.Playfield = function () {
  class Playfield extends Pinball.Part {
    // angleDegrees: the tilt of the playfield affecting the direction of gravity
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Playfield';
    }
    static fullName() {
      return "球场";
    }
    static description() {
      return "弹球机的表面，不同部件放在上面。";
    }
    static assetId() {
      return Pinball.Assets.Playfield.id();
    }
    static avatarClass() {
      return this.Avatar;
    }
    settings() {
      return {
        angleDegrees: {
          name: "角度",
          unit: "°",
          type: Pinball.Interface.Settings.Number.id(),
          min: 0,
          max: 90,
          step: 0.5,
          default: 6.5
        },
        ballsPerPlay: {
          name: "每局球数",
          type: Pinball.Interface.Settings.Number.id(),
          min: 1,
          max: 10,
          step: 1,
          default: 3
        }
      };
    }
    constants() {
      return {
        height: 0.05,
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Wood,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Coarse,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls,
        physicsDebugMaterial: this.constructor.physicsDebugMaterial
      };
    }
  }
  ;
  Playfield.initialize();
  Playfield.physicsDebugMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  Playfield.Avatar = function () {
    class Avatar extends Pinball.Part.Avatar {
      destroy() {
        var ref, ref1;
        super.destroy(...arguments);
        if ((ref = this.playfieldPosition) != null) {
          ref.stop();
        }
        return (ref1 = this.playfieldBoundingRectangle) != null ? ref1.stop() : void 0;
      }
      initialize() {
        this.playfieldPosition = new AE.LiveComputedField(() => {
          var ref;
          return (ref = this.part.data()) != null ? ref.position : void 0;
        }, EJSON.equals);

        // Playfield should be slightly larger than all the parts so that it contains all parts as holes.
        this.playfieldBoundingRectangle = new AE.LiveComputedField(() => {
          var boundingRectangle, boundingRectangles, extrusion, i, len, part, playfieldBoundingRectangle, ref, sceneManager;
          if (!(sceneManager = this.part.pinball.sceneManager())) {
            return;
          }
          boundingRectangles = [];
          ref = sceneManager.parts();
          for (i = 0, len = ref.length; i < len; i++) {
            part = ref[i];
            if (part !== this.part) {
              if (boundingRectangle = part.avatar.getBoundingRectangle()) {
                boundingRectangles.push(boundingRectangle);
              }
            }
          }
          if (!boundingRectangles.length) {
            return;
          }
          playfieldBoundingRectangle = AP.BoundingRectangle.union(boundingRectangles);
          extrusion = 0.01;
          return playfieldBoundingRectangle.getExtrudedBoundingRectangle(extrusion, extrusion, extrusion, extrusion);
        }, EJSON.equals);
        return super.initialize(...arguments);
      }
      _createShape() {
        var holeBoundaries, i, len, part, partHoleBoundaries, pixelArtEvaluation, playfieldBoundary, playfieldPosition, ref, ref1;
        if (!(pixelArtEvaluation = this.part.pixelArtEvaluation())) {
          return;
        }
        if (!pixelArtEvaluation.layers[0].points.length) {
          return;
        }
        if (!(playfieldPosition = this.playfieldPosition())) {
          return;
        }
        if (!(playfieldBoundary = (ref = this.playfieldBoundingRectangle()) != null ? ref.getBoundary() : void 0)) {
          return;
        }

        // See which parts require holes in the playfield.
        holeBoundaries = [];
        ref1 = this.part.pinball.sceneManager().parts();
        for (i = 0, len = ref1.length; i < len; i++) {
          part = ref1[i];
          if (partHoleBoundaries = part.playfieldHoleBoundaries()) {
            holeBoundaries.push(...partHoleBoundaries);
          }
        }
        return new this.constructor.Shape(pixelArtEvaluation, this.part.shapeProperties(), playfieldPosition, playfieldBoundary, holeBoundaries);
      }
    }
    ;
    Avatar.Shape = class Shape extends Pinball.Part.Avatar.TriangleMesh {
      constructor(pixelArtEvaluation1, properties, playfieldPosition, playfieldBoundary, holeBoundaries) {
        var error, i, indexBufferArray, len, normalArray, offset, playfieldPolygon, ref, vertex, vertexBufferArray, vertexIndex;
        super(...arguments);
        this.pixelArtEvaluation = pixelArtEvaluation1;
        this.properties = properties;
        try {
          playfieldPolygon = new AP.PolygonWithHoles(playfieldBoundary, holeBoundaries);
          playfieldPolygon = playfieldPolygon.getPolygonWithoutHoles();
          vertexBufferArray = new Float32Array(playfieldPolygon.vertices.length * 3);
          normalArray = new Float32Array(playfieldPolygon.vertices.length * 3);
          ref = playfieldPolygon.vertices;
          for (vertexIndex = i = 0, len = ref.length; i < len; vertexIndex = ++i) {
            vertex = ref[vertexIndex];
            offset = vertexIndex * 3;
            vertexBufferArray[offset] = vertex.x - playfieldPosition.x;
            vertexBufferArray[offset + 1] = this.height;
            vertexBufferArray[offset + 2] = vertex.y - playfieldPosition.z;
            normalArray[offset + 1] = 1;
          }
          indexBufferArray = playfieldPolygon.triangulate();
          _.reverse(indexBufferArray);
        } catch (error1) {
          error = error1;
          console.warn(error);

          // Remove the playfield so that any corrections are easier to be made.
          vertexBufferArray = new Float32Array(0);
          normalArray = new Float32Array(0);
          indexBufferArray = new Uint32Array(0);
        }
        this.geometryData = {
          vertexBufferArray,
          normalArray,
          indexBufferArray
        };
      }
      positionY() {
        return -this.height;
      }
    };
    return Avatar;
  }.call(this);
  return Playfield;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"balltrough.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/balltrough.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA, Pinball;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts.BallTrough = function () {
  class BallTrough extends Pinball.Parts.Hole {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.BallTrough';
    }
    static fullName() {
      return "排水口";
    }
    static description() {
      return "球场上收集并结束当前球的洞。";
    }
    static assetId() {
      return Pinball.Assets.BallTrough.id();
    }
    static triggerPositionYRatio() {
      return 1;
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawBallTrough;
    }
    constants() {
      return {
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Wood,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Coarse,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls,
        physicsDebugMaterial: Pinball.Parts.Playfield.physicsDebugMaterial
      };
    }
    extraShapeProperties() {
      var sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      return {
        height: sceneManager.ballPositionY() * 4
      };
    }
    onBallEnter(ball) {
      ball.die();
      this.pinball.audioManager().ballTrough();
      return Meteor.setTimeout(() => {
        return this.pinball.gameManager().removeBall(ball);
      }, 1000);
    }
  }
  ;
  BallTrough.initialize();
  return BallTrough;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/pin.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA, Pinball;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Parts.Pin = function () {
  class Pin extends Pinball.Part {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Pin';
    }
    static fullName() {
      return "针";
    }
    static description() {
      return "弹球中的针，改变球轨迹的小金属针。";
    }
    static imageUrls() {
      return '/pixelartacademy/pixeltosh/programs/pinball/parts/pin.png';
    }
    static avatarShapes() {
      return [Pinball.Part.Avatar.Cylinder, Pinball.Part.Avatar.Extrusion];
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.PlayGobbleHole;
    }
    constants() {
      return {
        height: 0.03,
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Metal,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls,
        radiusRatio: this.constructor.radiusRatio
      };
    }
  }
  ;
  Pin.initialize();
  Pin.radiusRatio = 0.5;
  return Pin;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dynamicpart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/dynamicpart.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var CollisionGroups, LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
CollisionGroups = Pinball.PhysicsManager.CollisionGroups;
Pinball.Parts.DynamicPart = class DynamicPart extends Pinball.Part {
  onAddedToDynamicsWorld(physicsManager) {
    var physicsObject;
    physicsObject = this.avatar.getPhysicsObject();
    physicsObject.body.setActivationState(Ammo.btCollisionObject.ActivationStates.DisableDeactivation);
    this.defaultCollisionFlags = physicsObject.body.getCollisionFlags();
    return physicsObject.body.setCollisionFlags(this.defaultCollisionFlags | Ammo.btCollisionObject.CollisionFlags.KinematicObject);
  }
  onSimulationStarted() {
    var physicsObject;
    physicsObject = this.avatar.getPhysicsObject();
    return physicsObject.body.setCollisionFlags(this.defaultCollisionFlags);
  }
  onSimulationEnded() {
    var physicsObject;
    physicsObject = this.avatar.getPhysicsObject();
    return physicsObject.body.setCollisionFlags(this.defaultCollisionFlags | Ammo.btCollisionObject.CollisionFlags.KinematicObject);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"spinningtarget.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/spinningtarget.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var CollisionGroups, LOI, PAA, Pinball, _rotationAngles, _rotationQuaternion;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
CollisionGroups = Pinball.PhysicsManager.CollisionGroups;
_rotationQuaternion = new THREE.Quaternion();
_rotationAngles = new THREE.Euler();
Pinball.Parts.SpinningTarget = function () {
  class SpinningTarget extends Pinball.Parts.DynamicPart {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.SpinningTarget';
    }
    static fullName() {
      return "旋转靶";
    }
    static description() {
      return "球击中其下半部分时旋转的金属板。";
    }
    static assetId() {
      return Pinball.Assets.SpinningTarget.id();
    }
    static avatarShapes() {
      return [this.Shape];
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawSpinningTarget;
    }
    settings() {
      return {
        points: {
          name: '分数',
          type: Pinball.Interface.Settings.Number.id(),
          default: 100
        }
      };
    }
    constants() {
      return {
        mass: 0.0002,
        height: 0.001,
        meshHeight: Pinball.CameraManager.orthographicPixelSize,
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Metal,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
        collisionGroup: CollisionGroups.Actuators,
        collisionMask: CollisionGroups.Balls
      };
    }
    extraShapeProperties() {
      var sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      return {
        axisY: sceneManager.ballPositionY() * 2 + 0.002
      };
    }
    onAddedToDynamicsWorld(physicsManager1) {
      var physicsObject;
      this.physicsManager = physicsManager1;
      super.onAddedToDynamicsWorld(...arguments);
      physicsObject = this.avatar.getPhysicsObject();
      physicsObject.body.setDamping(0, 0.75);
      return this._createConstraint();
    }
    onRemovedFromDynamicsWorld(physicsManager) {
      physicsManager.dynamicsWorld.removeConstraint(this.constraint);
      return this.constraint = null;
    }
    reset() {
      super.reset(...arguments);
      if (this.constraint) {
        // Recreate the constraint if needed.
        this._createConstraint();
      }
      return this._toBaseRotationQuaternion = this.rotationQuaternion().invert();
    }
    _createConstraint() {
      var axisOffsetZ, axisY, massY, physicsObject, shape, transform;
      if (this.constraint) {
        this.physicsManager.dynamicsWorld.removeConstraint(this.constraint);
      }
      physicsObject = this.avatar.getPhysicsObject();
      shape = this.shape();
      axisY = shape.bitmapRectangle.center().y;
      massY = shape.bitmapOrigin.y;
      axisOffsetZ = (axisY - massY) * Pinball.CameraManager.orthographicPixelSize;
      transform = new Ammo.btTransform(Ammo.btQuaternion.identity(), new Ammo.btVector3(0, 0, axisOffsetZ));
      this.constraint = new Ammo.btGeneric6DofSpringConstraint(physicsObject.body, transform, true);
      this.constraint.setLinearLowerLimit(Ammo.btVector3.zero());
      this.constraint.setLinearUpperLimit(Ammo.btVector3.zero());
      this.constraint.setAngularLowerLimit(new Ammo.btVector3(-Math.PI, 0, 0));
      this.constraint.setAngularUpperLimit(new Ammo.btVector3(Math.PI, 0, 0));
      return this.physicsManager.dynamicsWorld.addConstraint(this.constraint);
    }
    update(elapsed) {
      var distanceFromTop, inScoringRegion, physicsObject, points;
      if (!(physicsObject = this.avatar.getPhysicsObject())) {
        return;
      }
      // Get rotation relative to the base.
      physicsObject.getRotationQuaternion(_rotationQuaternion);
      _rotationQuaternion.premultiply(this._toBaseRotationQuaternion);
      _rotationAngles.setFromQuaternion(_rotationQuaternion, 'YXZ');

      // See if we're in the scoring region (base of the spinner turned to top).
      distanceFromTop = Math.abs(_rotationAngles.x + Math.PI / 2);
      inScoringRegion = distanceFromTop < 0.5;
      // Add points when entering the scoring region.
      if (inScoringRegion && !this._wasInScoringRegion) {
        if (points = this.data().points) {
          this.pinball.gameManager().addPoints(points);
        }
        this.pinball.audioManager().spinningTargetRotation();
      }
      return this._wasInScoringRegion = inScoringRegion;
    }
  }
  ;
  SpinningTarget.initialize();
  SpinningTarget.Shape = class Shape extends Pinball.Part.Avatar.ConvexExtrusion {
    _calculateBitmapOrigin() {
      return {
        // Put all the weight at the bottom of the spinner.
        x: this.bitmapRectangle.x() + this.bitmapRectangle.width() * 0.5,
        y: this.bitmapRectangle.bottom() - 0.5
      };
    }
    positionY() {
      return this.properties.axisY;
    }
    collisionShapeMargin() {
      return this.height / 2;
    }
    positionSnapping() {
      return false;
    }
    rotationStyle() {
      return this.constructor.RotationStyles.Free;
    }
    meshStyle() {
      return this.constructor.MeshStyles.Extrusion;
    }
  };
  return SpinningTarget;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"gate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/gate.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var CollisionGroups, LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
CollisionGroups = Pinball.PhysicsManager.CollisionGroups;
Pinball.Parts.Gate = function () {
  class Gate extends Pinball.Parts.DynamicPart {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Gate';
    }
    static fullName() {
      return "门";
    }
    static description() {
      return "让球只能单向通过的旋转件。";
    }
    static assetId() {
      return Pinball.Assets.Gate.id();
    }
    static avatarShapes() {
      return [this.Shape];
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawGate;
    }
    constants() {
      return {
        mass: 0.0001,
        height: 0.001,
        meshHeight: Pinball.CameraManager.orthographicPixelSize * 2,
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Metal,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
        collisionGroup: CollisionGroups.Actuators,
        collisionMask: CollisionGroups.Balls
      };
    }
    extraShapeProperties() {
      var sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      return {
        axisY: sceneManager.ballPositionY() * 2.5
      };
    }
    onAddedToDynamicsWorld(physicsManager1) {
      var physicsObject;
      this.physicsManager = physicsManager1;
      super.onAddedToDynamicsWorld(...arguments);
      physicsObject = this.avatar.getPhysicsObject();
      physicsObject.body.setDamping(0, 0.75);
      return this._createConstraint();
    }
    onRemovedFromDynamicsWorld(physicsManager) {
      physicsManager.dynamicsWorld.removeConstraint(this.constraint);
      return this.constraint = null;
    }
    reset() {
      super.reset(...arguments);
      if (this.constraint) {
        // Recreate the constraint if needed.
        return this._createConstraint();
      }
    }
    _createConstraint() {
      var axisOffsetZ, axisY, massY, physicsObject, shape, transform;
      if (this.constraint) {
        this.physicsManager.dynamicsWorld.removeConstraint(this.constraint);
      }
      physicsObject = this.avatar.getPhysicsObject();
      shape = this.shape();
      axisY = shape.bitmapRectangle.top() + 1;
      massY = shape.bitmapOrigin.y;
      axisOffsetZ = (axisY - massY) * Pinball.CameraManager.orthographicPixelSize;
      transform = new Ammo.btTransform(Ammo.btQuaternion.identity(), new Ammo.btVector3(0, 0, axisOffsetZ));
      this.constraint = new Ammo.btGeneric6DofSpringConstraint(physicsObject.body, transform, true);
      this.constraint.setLinearLowerLimit(Ammo.btVector3.zero());
      this.constraint.setLinearUpperLimit(Ammo.btVector3.zero());
      this.constraint.setAngularLowerLimit(new Ammo.btVector3(-Math.PI / 2, 0, 0));
      this.constraint.setAngularUpperLimit(new Ammo.btVector3(0, 0, 0));
      return this.physicsManager.dynamicsWorld.addConstraint(this.constraint);
    }
  }
  ;
  Gate.initialize();
  Gate.Shape = class Shape extends Pinball.Part.Avatar.ConvexExtrusion {
    positionY() {
      return this.properties.axisY;
    }
    collisionShapeMargin() {
      return this.height / 2;
    }
    positionSnapping() {
      return false;
    }
    rotationStyle() {
      return this.constructor.RotationStyles.Free;
    }
    meshStyle() {
      return this.constructor.MeshStyles.Extrusion;
    }
  };
  return Gate;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bumper.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/parts/bumper.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AEc, AP, AR, LOI, PAA, Pinball, _displacedRingPosition;
AE = Artificial.Everywhere;
AEc = Artificial.Echo;
AR = Artificial.Reality;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_displacedRingPosition = new THREE.Vector3();
Pinball.Parts.Bumper = function () {
  class Bumper extends Pinball.Part {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Parts.Bumper';
    }
    static fullName() {
      return "保险杠";
    }
    static description() {
      return "击中时得分的靶子。";
    }
    static translations() {
      return {
        passiveActive: "A passive bumper just bounces away the ball, while an active one kicks it away with force."
      };
    }
    description() {
      var activeEnabled, description, translations;
      description = super.description(...arguments);
      activeEnabled = this.settings().active.enabledCondition(this.data());
      if (!activeEnabled) {
        return description;
      }
      if (!(translations = this.translations())) {
        return description;
      }
      return "".concat(description, " ").concat(translations.passiveActive);
    }
    static assetId() {
      return Pinball.Assets.Bumper.id();
    }
    static avatarShapes() {
      return [this.Shape];
    }
    static placeableRequiredTask() {
      return LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawBumper;
    }
    constructor() {
      super(...arguments);
      this.trigger = new AR.Trigger({
        onEnter: rigidBody => {
          var ref;
          if (!(((ref = rigidBody.physicsObject) != null ? ref.entity : void 0) instanceof Pinball.Ball)) {
            return;
          }
          return this.onBallEnter();
        }
      });

      // Add passive bumper trigger for gaining points.
      this.towerTriggerShape = new AE.LiveComputedField(() => {
        var ballPositionY, properties, sceneManager, shape;
        if (this.data().active) {
          return;
        }
        if (!(shape = this.avatar.shape())) {
          return;
        }
        if (!(sceneManager = this.pinball.sceneManager())) {
          return;
        }
        ballPositionY = sceneManager.ballPositionY();
        properties = this.extraShapeProperties();
        return Pinball.Part.Avatar.Extrusion.detectShape(shape.pixelArtEvaluation, {
          height: ballPositionY * 3,
          flipped: properties.flipped,
          positionY: ballPositionY * 3
        });
      });
      this.towerTriggerCollider = new AE.LiveComputedField(() => {
        var triggerCollider, triggerShape;
        if (this.data().active) {
          return;
        }
        if (!(triggerShape = this.towerTriggerShape())) {
          return;
        }
        triggerCollider = new Ammo.btGhostObject();
        triggerCollider.setCollisionShape(triggerShape.createCollisionShape());
        return triggerCollider;
      });

      // Add active bumper trigger for lowering the ring.
      this.ringTriggerShape = new AE.LiveComputedField(() => {
        var properties, shape;
        if (!this.data().active) {
          return;
        }
        if (!(shape = this.avatar.shape())) {
          return;
        }
        properties = this.extraShapeProperties();
        return Pinball.Part.Avatar.Silhouette.detectShape(shape.pixelArtEvaluation, {
          yOffset: -properties.positionY + 0.001
        });
      });
      this.ringTriggerCollider = new AE.LiveComputedField(() => {
        var triggerCollider, triggerShape;
        if (!this.data().active) {
          return;
        }
        if (!(triggerShape = this.ringTriggerShape())) {
          return;
        }
        triggerCollider = new Ammo.btGhostObject();
        triggerCollider.setCollisionShape(triggerShape.createCollisionShape());
        return triggerCollider;
      });
      this.ringTriggerPhysicsDebugMesh = new AE.LiveComputedField(computation => {
        var ref, ref1, renderObject, triggerShape;
        if ((ref = this._triggerPhysicsDebugGeometry) != null) {
          ref.dispose();
        }
        if ((ref1 = this._triggerPhysicsDebugMesh) != null) {
          ref1.removeFromParent();
        }
        if (!this.data().active) {
          return;
        }
        if (!(triggerShape = this.ringTriggerShape())) {
          return;
        }
        if (!(renderObject = this.getRenderObject())) {
          return;
        }
        this._triggerPhysicsDebugGeometry = triggerShape.createPhysicsDebugGeometry();
        this._triggerPhysicsDebugMesh = new THREE.Mesh(this._triggerPhysicsDebugGeometry, this.constructor.ringTriggerDebugMaterial);
        this._triggerPhysicsDebugMesh.layers.set(Pinball.RendererManager.RenderLayers.PhysicsDebug);
        this._triggerPhysicsDebugMesh.receiveShadow = true;
        this._triggerPhysicsDebugMesh.castShadow = true;
        renderObject.perpendicularRotationOrigin.add(this._triggerPhysicsDebugMesh);
        return this._triggerPhysicsDebugMesh;
      });
      // Add active bumper ring.
      this.ringShape = new AE.LiveComputedField(() => {
        var ballPositionY, properties, sceneManager, shape;
        if (!this.data().active) {
          return;
        }
        if (!(shape = this.avatar.shape())) {
          return;
        }
        if (!(sceneManager = this.pinball.sceneManager())) {
          return;
        }
        ballPositionY = sceneManager.ballPositionY();
        properties = this.extraShapeProperties();
        return Pinball.Part.Avatar.TaperedExtrusion.detectShape(shape.pixelArtEvaluation, {
          height: ballPositionY,
          taperDistanceTop: 0,
          taperDistanceBottom: ballPositionY,
          flipped: properties.flipped,
          positionY: ballPositionY * 3
        });
      });
      this.ringPhysicsDebugMesh = new AE.LiveComputedField(computation => {
        var ref, ref1, renderObject, ringShape;
        if ((ref = this._ringPhysicsDebugGeometry) != null) {
          ref.dispose();
        }
        if ((ref1 = this._ringPhysicsDebugMesh) != null) {
          ref1.removeFromParent();
        }
        if (!this.data().active) {
          return;
        }
        if (!(ringShape = this.ringShape())) {
          return;
        }
        if (!(renderObject = this.getRenderObject())) {
          return;
        }
        this._ringPhysicsDebugGeometry = ringShape.createPhysicsDebugGeometry();
        this._ringPhysicsDebugMesh = new THREE.Mesh(this._ringPhysicsDebugGeometry, this.constructor.ringDebugMaterial);
        this._ringPhysicsDebugMesh.layers.set(Pinball.RendererManager.RenderLayers.PhysicsDebug);
        this._ringPhysicsDebugMesh.receiveShadow = true;
        this._ringPhysicsDebugMesh.castShadow = true;
        renderObject.perpendicularRotationOrigin.add(this._ringPhysicsDebugMesh);
        return this._ringPhysicsDebugMesh;
      });
      this.ringPhysicsObject = new AE.LiveComputedField(computation => {
        var constants, ref, ringShape;
        if (this._ringPhysicsObject) {
          this._removeRingRigidBody();
          if ((ref = this._ringPhysicsObject) != null) {
            ref.destroy();
          }
          this._ringPhysicsObject = null;
        }
        if (!this.data().active) {
          return;
        }
        if (!(ringShape = this.ringShape())) {
          return;
        }
        constants = {
          restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
          friction: Pinball.PhysicsManager.FrictionConstants.Metal,
          rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
          collisionGroup: Pinball.PhysicsManager.CollisionGroups.Actuators,
          collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls
        };
        this._ringPhysicsObject = new Pinball.Part.Avatar.PhysicsObject({
          shape: () => {
            return ringShape;
          },
          constants: () => {
            return constants;
          },
          physicsProperties: () => {
            return constants;
          },
          position: () => {
            return this.position();
          },
          rotationQuaternion: () => {
            return this.rotationQuaternion();
          }
        });
        this._ringPhysicsObject.body.setCollisionFlags(this._ringPhysicsObject.body.getCollisionFlags() | Ammo.btCollisionObject.CollisionFlags.KinematicObject);
        this._ringPhysicsObject.body.setActivationState(Ammo.btCollisionObject.ActivationStates.DisableDeactivation);
        return this._ringPhysicsObject;
      });
    }
    destroy() {
      var ref, ref1, ref2, ref3;
      super.destroy(...arguments);
      this.towerTriggerShape.stop();
      this.towerTriggerCollider.stop();
      this.ringTriggerShape.stop();
      this.ringTriggerCollider.stop();
      this.ringTriggerPhysicsDebugMesh.stop();
      this.ringShape.stop();
      this.ringPhysicsDebugMesh.stop();
      this.ringPhysicsObject.stop();
      if ((ref = this._triggerPhysicsDebugGeometry) != null) {
        ref.dispose();
      }
      if ((ref1 = this._ringPhysicsDebugGeometry) != null) {
        ref1.dispose();
      }
      if ((ref2 = this._ringPhysicsObject) != null) {
        ref2.destroy();
      }
      if ((ref3 = this._activeBumperPartsAutorun) != null) {
        ref3.stop();
      }
      return this._removeRingRigidBody();
    }
    settings() {
      return {
        active: {
          name: '主动',
          type: Pinball.Interface.Settings.Boolean.id(),
          default: false,
          enabledCondition: data => {
            var ref;
            return (ref = LM.PixelArtFundamentals.Fundamentals.Goals.Pinball.DrawLowerThird.getAdventureInstance()) != null ? ref.completed() : void 0;
          }
        },
        passiveRestitution: {
          name: '弹力',
          type: Pinball.Interface.Settings.Number.id(),
          min: 0,
          max: 1,
          step: 0.1,
          default: 1,
          enabledCondition: data => {
            return !data.active;
          }
        },
        kickSpeed: {
          name: '弹出速度',
          unit: "m/s",
          type: Pinball.Interface.Settings.Number.id(),
          min: 0.1,
          max: 0.5,
          step: 0.01,
          default: 0.3,
          enabledCondition: data => {
            return data.active;
          }
        },
        points: {
          name: '分数',
          type: Pinball.Interface.Settings.Number.id(),
          default: 10
        }
      };
    }
    constants() {
      return {
        restitution: Pinball.PhysicsManager.RestitutionConstants.HardSurface,
        friction: Pinball.PhysicsManager.FrictionConstants.Plastic,
        rollingFriction: Pinball.PhysicsManager.RollingFrictionConstants.Smooth,
        collisionGroup: Pinball.PhysicsManager.CollisionGroups.BallGuides,
        collisionMask: Pinball.PhysicsManager.CollisionGroups.Balls
      };
    }
    shapeDataPropertyNames() {
      return super.shapeDataPropertyNames(...arguments).concat(['active']);
    }
    extraShapeProperties() {
      var ballPositionY, sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      ballPositionY = sceneManager.ballPositionY();
      return {
        positionY: ballPositionY * 4,
        ballPositionY: ballPositionY
      };
    }
    extraPhysicsProperties() {
      var constants, data;
      data = this.data();
      constants = this.constants();
      return {
        restitution: data.active ? constants.restitution : data.passiveRestitution / Pinball.PhysicsManager.BallConstants.Restitution
      };
    }
    getPhysicsObject() {
      if (this.data().active) {
        // To ensure the ring physics object is ready when the main
        // one is inserted to the dynamics world, we depend on it here.
        if (!this.ringPhysicsObject()) {
          return;
        }
      }
      return super.getPhysicsObject(...arguments);
    }
    onAddedToDynamicsWorld(physicsManager1) {
      this.physicsManager = physicsManager1;
      // Reactively add active bumper parts.
      return Tracker.nonreactive(() => {
        return this._activeBumperPartsAutorun = Tracker.autorun(() => {
          var constants, ringPhysicsObject;
          this._removeRingRigidBody();
          if (!(ringPhysicsObject = this.ringPhysicsObject())) {
            return;
          }
          this._ringRigidBody = ringPhysicsObject.body;
          constants = this.constants();
          this.physicsManager.dynamicsWorld.addRigidBody(this._ringRigidBody, constants.collisionGroup, constants.collisionMask);
          return this.physicsManager.registerRigidBodyEntity(this._ringRigidBody, this);
        });
      });
    }
    onRemovedFromDynamicsWorld(physicsManager) {
      var ref;
      if ((ref = this._activeBumperPartsAutorun) != null) {
        ref.stop();
      }
      this._activeBumperPartsAutorun = null;
      this._removeRingRigidBody();
      return this.physicsManager = null;
    }
    _removeRingRigidBody() {
      if (!(this._ringRigidBody && this.physicsManager)) {
        return;
      }
      this.physicsManager.dynamicsWorld.removeRigidBody(this._ringRigidBody);
      this.physicsManager.unregisterRigidBody(this._ringRigidBody);
      return this._ringRigidBody = null;
    }
    reset() {
      var ringPhysicsObject;
      super.reset(...arguments);
      if (ringPhysicsObject = typeof this.ringPhysicsObject === "function" ? this.ringPhysicsObject() : void 0) {
        ringPhysicsObject.reset();
        this.ringOrigin = ringPhysicsObject.getPosition();
      }
      this.moving = 0;
      return this.displacement = 0;
    }
    onBallEnter() {
      var data;
      data = this.data();
      if (data.active) {
        this.moving = 1;
      }
      this.pinball.audioManager().bumper(data.active);
      if (data.points) {
        return this.pinball.gameManager().addPoints(data.points);
      }
    }
    update() {
      var physicsObject, renderObject, ringPhysicsDebugMesh, ringPhysicsObject, triggerCollider;
      if (!(physicsObject = this.getPhysicsObject())) {
        return;
      }
      if (this.data().active) {
        if (!(triggerCollider = this.ringTriggerCollider())) {
          return;
        }

        // Align the ring's debug mesh to its physics object.
        if (!(ringPhysicsObject = this.ringPhysicsObject())) {
          return;
        }
        if (!(ringPhysicsDebugMesh = this.ringPhysicsDebugMesh())) {
          return;
        }
        renderObject = this.getRenderObject();
        ringPhysicsObject.getPosition(_displacedRingPosition);
        _displacedRingPosition.sub(renderObject.position);
        ringPhysicsDebugMesh.position.copy(_displacedRingPosition);
      } else {
        if (!(triggerCollider = this.towerTriggerCollider())) {
          return;
        }
      }

      // Query the trigger.
      triggerCollider.setWorldTransform(physicsObject.body.getWorldTransform());
      return this.trigger.test(triggerCollider, this.pinball.physicsManager().dynamicsWorld);
    }
    fixedUpdate(elapsed) {
      var distance, maxDisplacement, ringPhysicsObject, speed;
      if (!this.moving) {
        return;
      }
      if (!(ringPhysicsObject = this.ringPhysicsObject())) {
        return;
      }
      maxDisplacement = this.ringOrigin.y / 3;
      if (this.moving > 0) {
        if (this.displacement >= maxDisplacement) {
          // We reached maximum displacement, reverse direction.
          this.displacement = maxDisplacement;
          speed = 0;
          this.moving = -1;
        } else {
          // Keep lowering the ring.
          speed = this.data().kickSpeed;
        }
      } else {
        if (this.displacement < 0) {
          // We reached the origin.
          this.moving = 0;
          this.displacement = 0;
          speed = 0;
        } else {
          // Keep rising the ring.
          speed = -this.data().kickSpeed;
        }
      }
      distance = speed * elapsed;
      this.displacement += distance;
      _displacedRingPosition.copy(this.ringOrigin);
      _displacedRingPosition.y -= this.displacement;
      return ringPhysicsObject.setPosition(_displacedRingPosition);
    }
  }
  ;
  Bumper.initialize();
  Bumper.ringTriggerDebugMaterial = new THREE.MeshStandardMaterial({
    color: 0xaa6666
  });
  Bumper.ringDebugMaterial = new THREE.MeshStandardMaterial({
    color: 0x66aaaa
  });
  Bumper.Shape = class Shape extends Pinball.Part.Avatar.TriangleMesh {
    static detectShape(pixelArtEvaluation, properties) {
      if (!pixelArtEvaluation.layers[0].cores.length) {
        return;
      }
      return new this(pixelArtEvaluation, properties);
    }
    constructor(pixelArtEvaluation1, properties1) {
      var ballPositionY, ballRadiusBitmap, boundary, boundaryIndex, core, i, individualGeometryData, j, k, l, len, len1, len2, len3, line, points, ref, ref1, ref2, ref3, topBoundaries, topBoundary, topPolygon, topPolygonWithoutHoles, towerPolygon, towerTaperDistance, vertex, vertexIndex;
      super(...arguments);
      this.pixelArtEvaluation = pixelArtEvaluation1;
      this.properties = properties1;
      individualGeometryData = [];
      ballPositionY = this.properties.ballPositionY;
      ballRadiusBitmap = ballPositionY / Pinball.CameraManager.orthographicPixelSize;
      if (this.properties.active) {
        towerTaperDistance = 1.5 * ballRadiusBitmap;
      } else {
        towerTaperDistance = 0.5 * ballRadiusBitmap;
      }
      ref = this.pixelArtEvaluation.layers[0].cores;
      for (i = 0, len = ref.length; i < len; i++) {
        core = ref[i];
        topBoundaries = [];
        ref1 = core.outlines;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          line = ref1[j];
          points = this._getLinePoints(line);
          topBoundary = new AP.PolygonBoundary(points);
          topBoundaries.push(topBoundary);
        }
        topPolygon = new AP.PolygonWithHoles(topBoundaries);
        topPolygonWithoutHoles = topPolygon.getPolygonWithoutHoles();
        individualGeometryData.push(this.constructor._createExtrudedVerticesAndIndices(topPolygon.boundaries, -ballPositionY, 0, this.properties.flipped));
        individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(topPolygonWithoutHoles, 0, 1));
        individualGeometryData.push(this.constructor._createPolygonVerticesAndIndices(topPolygonWithoutHoles, -ballPositionY, -1));
        towerPolygon = topPolygon.getInsetPolygon(towerTaperDistance);
        ref2 = topPolygon.boundaries;
        for (boundaryIndex = k = 0, len2 = ref2.length; k < len2; boundaryIndex = ++k) {
          boundary = ref2[boundaryIndex];
          ref3 = boundary.vertices;
          for (vertexIndex = l = 0, len3 = ref3.length; l < len3; vertexIndex = ++l) {
            vertex = ref3[vertexIndex];
            towerPolygon.boundaries[boundaryIndex].vertices[vertexIndex].tangent = vertex.tangent;
          }
        }
        individualGeometryData.push(this.constructor._createExtrudedVerticesAndIndices(towerPolygon.boundaries, -ballPositionY * 4, -ballPositionY, this.properties.flipped));
      }
      this.geometryData = this.constructor._mergeGeometryData(individualGeometryData);
    }
    positionY() {
      return this.properties.positionY;
    }
  };
  return Bumper;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"interface":{"interface.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/interface.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, PAA, Pinball;
AC = Artificial.Control;
FM = FataMorgana;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface = function () {
  class Interface {
    static createMenuItems() {
      return [{
        caption: '',
        items: [Pinball.Interface.Actions.About.id()]
      }, {
        caption: '文件',
        items: [Pinball.Interface.Actions.Edit.id(), Pinball.Interface.Actions.Test.id(), Pinball.Interface.Actions.Play.id(), null, Pinball.Interface.Actions.Reset.id(), null, PAA.Pixeltosh.OS.Interface.Actions.Quit.id()]
      }, {
        caption: '编辑',
        items: [Pinball.Interface.Actions.Delete.id(), Pinball.Interface.Actions.Flip.id(), Pinball.Interface.Actions.RotateClockwise.id(), Pinball.Interface.Actions.RotateCounterClockwise.id()]
      }, {
        caption: '视图',
        items: [Pinball.Interface.Actions.ToggleGrid.id(), Pinball.Interface.Actions.ToggleDisplayWalls.id(), null, Pinball.Interface.Actions.OrthographicCamera.id(), Pinball.Interface.Actions.PerspectiveCamera.id(), null, Pinball.Interface.Actions.ToggleDebugPhysics.id(), Pinball.Interface.Actions.ToggleSlowMotion.id()]
      }];
    }
    static createShortcuts() {
      return {
        ["".concat(Pinball.Interface.Actions.Edit.id())]: {
          key: AC.Keys.e
        },
        ["".concat(Pinball.Interface.Actions.Test.id())]: {
          key: AC.Keys.t
        },
        ["".concat(Pinball.Interface.Actions.Play.id())]: {
          key: AC.Keys.p
        },
        ["".concat(Pinball.Interface.Actions.Reset.id())]: {
          key: AC.Keys.r
        },
        ["".concat(Pinball.Interface.Actions.Delete.id())]: [{
          key: AC.Keys.delete
        }, {
          key: AC.Keys.backspace
        }],
        ["".concat(Pinball.Interface.Actions.Flip.id())]: {
          commandOrControl: true,
          key: AC.Keys.f
        },
        ["".concat(Pinball.Interface.Actions.RotateClockwise.id())]: {
          commandOrControl: true,
          key: AC.Keys.r
        },
        ["".concat(Pinball.Interface.Actions.RotateCounterClockwise.id())]: {
          commandOrControl: true,
          shift: true,
          key: AC.Keys.r
        },
        ["".concat(Pinball.Interface.Actions.OrthographicCamera.id())]: {
          key: AC.Keys[2]
        },
        ["".concat(Pinball.Interface.Actions.PerspectiveCamera.id())]: {
          key: AC.Keys[3]
        },
        ["".concat(Pinball.Interface.Actions.ToggleDebugPhysics.id())]: {
          key: AC.Keys.d
        },
        ["".concat(Pinball.Interface.Actions.ToggleSlowMotion.id())]: {
          key: AC.Keys.s
        },
        ["".concat(Pinball.Interface.Actions.ToggleDisplayWalls.id())]: {
          shift: true,
          key: AC.Keys.w
        },
        ["".concat(Pinball.Interface.Actions.ToggleGrid.id())]: {
          shift: true,
          key: AC.Keys.g
        }
      };
    }
    static createInterfaceData() {
      return {
        type: PAA.Pixeltosh.Program.View.id(),
        programId: PAA.Pixeltosh.Programs.Pinball.id(),
        top: 14,
        left: 0,
        right: 0,
        bottom: 0
      };
    }
    static determineLayout(pinball) {
      var ref, ref1;
      switch ((ref = pinball.cameraManager()) != null ? ref.displayType() : void 0) {
        case Pinball.CameraManager.DisplayTypes.Orthographic:
          switch ((ref1 = pinball.gameManager()) != null ? ref1.mode() : void 0) {
            case Pinball.GameManager.Modes.Edit:
            case Pinball.GameManager.Modes.Test:
              return this.Layouts.Editor;
            case Pinball.GameManager.Modes.Play:
              return this.Layouts.OrthographicPlay;
          }
          break;
        case Pinball.CameraManager.DisplayTypes.Perspective:
          return this.Layouts.PerspectivePlay;
      }
    }
    static createLayoutsData() {
      return {
        ["".concat(this.Layouts.Editor)]: {
          type: FM.SplitView.id(),
          fixed: true,
          dockSide: FM.SplitView.DockSide.Left,
          mainArea: {
            contentComponentId: this.Playfield.id(),
            width: 180
          },
          remainingArea: {
            type: FM.TabbedView.id(),
            tabs: [{
              name: '部件',
              contentComponentId: this.Parts.id(),
              active: true
            }, {
              name: '设置',
              contentComponentId: this.Settings.id()
            }],
            allowClosing: false
          }
        },
        ["".concat(this.Layouts.OrthographicPlay)]: {
          type: FM.SplitView.id(),
          fixed: true,
          dockSide: FM.SplitView.DockSide.Left,
          mainArea: {
            contentComponentId: this.Playfield.id(),
            width: 180
          },
          remainingArea: {
            type: FM.SplitView.id(),
            fixed: true,
            dockSide: FM.SplitView.DockSide.Top,
            mainArea: {
              contentComponentId: this.Backbox.id(),
              height: 140
            },
            remainingArea: {
              contentComponentId: this.Instructions.id()
            }
          }
        },
        ["".concat(this.Layouts.PerspectivePlay)]: {
          contentComponentId: this.Playfield.id()
        }
      };
    }
  }
  ;
  Interface.Layouts = {
    Editor: 'Editor',
    OrthographicPlay: 'OrthographicPlay',
    PerspectivePlay: 'PerspectivePlay'
  };
  return Interface;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"playfield":{"playfield.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/playfield/playfield.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball, _boundingBox;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
_boundingBox = new THREE.Box3();
Pinball.Interface.Playfield = function () {
  class Playfield extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      this.pinball = this.os.getProgram(Pinball);
      this.selectedPart = new ComputedField(() => {
        var ref;
        return (ref = this.pinball.editorManager()) != null ? ref.selectedPart() : void 0;
      });
      this.selectedPartChanged = new Tracker.Dependency();
      return this.autorun(async computation => {
        var selectedPart;
        if (!(selectedPart = this.selectedPart())) {
          return;
        }
        if (!selectedPart.ready()) {
          return;
        }
        // Update when data or position change.
        selectedPart.data();
        selectedPart.position();

        // Let the physics engine update its bounding box.
        await _.waitForNextAnimationFrame();
        return this.selectedPartChanged.changed();
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.$('.pixelartacademy-pixeltosh-programs-pinball-interface-playfield').append(this.pinball.rendererManager().renderer.domElement);
    }
    showOverlay() {
      var ref;
      return !((ref = this.pinball.gameManager()) != null ? ref.inPlay() : void 0);
    }
    selectionVisibleClass() {
      var selectedPart;
      if (!(selectedPart = this.selectedPart())) {
        return;
      }
      if (selectedPart.constructor.placeable()) {
        return 'visible';
      }
    }
    selectionStyle() {
      var bottom, height, left, padding, physicsObject, pixelSize, right, selectedPart, top, width;
      // Depend on the selected part's changes.
      if (!(selectedPart = this.selectedPart())) {
        return;
      }
      this.selectedPartChanged.depend();
      // Get the bounding box from the physics object.
      if (!(physicsObject = selectedPart.avatar.getPhysicsObject())) {
        return;
      }
      physicsObject.getBoundingBox(_boundingBox);
      padding = 2;
      pixelSize = Pinball.CameraManager.orthographicPixelSize;
      left = Math.floor(_boundingBox.min.x / pixelSize) - padding;
      right = Math.ceil(_boundingBox.max.x / pixelSize) + padding;
      top = Math.floor(_boundingBox.min.z / pixelSize) - padding;
      bottom = Math.ceil(_boundingBox.max.z / pixelSize) + padding;
      width = right - left;
      height = bottom - top;
      if (width % 2) {
        width++;
      }
      if (height % 2) {
        height++;
      }
      if (width < this.constructor.minSelectionSize) {
        left += (width - this.constructor.minSelectionSize) / 2;
        width = this.constructor.minSelectionSize;
      }
      if (height < this.constructor.minSelectionSize) {
        top += (height - this.constructor.minSelectionSize) / 2;
        height = this.constructor.minSelectionSize;
      }
      return {
        left: "".concat(left, "rem"),
        top: "".concat(top, "rem"),
        width: "".concat(width, "rem"),
        height: "".concat(height, "rem")
      };
    }
    partVisibleClass() {
      var ref, selectedPart;
      // Only show selected part when dragging it over the parts.
      if (!(selectedPart = this.selectedPart())) {
        return;
      }
      if (((ref = selectedPart.position()) != null ? ref.x : void 0) > Pinball.SceneManager.playfieldWidth) {
        return 'visible';
      }
    }
    controlsVisibleClass() {
      var ref;
      if (!((ref = this.pinball.editorManager()) != null ? ref.editing() : void 0)) {
        return 'visible';
      }
    }
    selectedPartBitmapImageOptions() {
      return {
        bitmap: () => {
          var ref;
          return (ref = this.selectedPart()) != null ? ref.bitmap() : void 0;
        }
      };
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown canvas': this.onPointerDownCanvas,
        'pointermove': this.onPointerMove,
        'pointerleave .pixelartacademy-pixeltosh-programs-pinball-interface-playfield': this.onPointerLeavePlayfield,
        'wheel': this.onPointerWheel,
        'pointerdown .drag-area': this.onPointerDownDragArea,
        'pointerdown .rotate-area': this.onPointerDownRotateArea,
        'click .flip-button': this.onClickFlipButton
      });
    }
    onPointerDownCanvas(event) {
      var $document, cameraManager, editorManager, ref, selectedPart, stopListening;
      // Prevent browser select/dragging behavior.
      event.preventDefault();
      cameraManager = this.pinball.cameraManager();
      switch (cameraManager.displayType()) {
        case Pinball.CameraManager.DisplayTypes.Orthographic:
          // Prevent selection in play mode.
          if ((ref = this.pinball.gameManager()) != null ? ref.inPlay() : void 0) {
            return;
          }
          editorManager = this.pinball.editorManager();
          editorManager.select();
          selectedPart = editorManager.selectedPart();
          if (selectedPart != null ? selectedPart.constructor.placeable() : void 0) {
            // See if the player releases the mouse button, otherwise also start dragging.
            $document = $(document);
            stopListening = () => {
              return $document.off('.pixelartacademy-pixeltosh-programs-pinball-interface-playfield');
            };
            $document.on('pointerup.pixelartacademy-pixeltosh-programs-pinball-interface-playfield', () => {
              Meteor.clearTimeout(this._dragTimeout);
              return stopListening();
            });
            return $document.on('pointermove.pixelartacademy-pixeltosh-programs-pinball-interface-playfield', () => {
              Meteor.clearTimeout(this._dragTimeout);
              stopListening();
              return editorManager.startDrag(selectedPart);
            });
          }
          break;
        case Pinball.CameraManager.DisplayTypes.Perspective:
          return cameraManager.startRotateCamera(event.coordinates);
      }
    }
    onPointerMove(event) {
      var ref;
      return (ref = this.pinball.mouse()) != null ? ref.onMouseMove(event) : void 0;
    }
    onPointerLeavePlayfield(event) {
      var ref;
      return (ref = this.pinball.mouse()) != null ? ref.onMouseLeave(event) : void 0;
    }
    onPointerWheel(event) {
      return this.pinball.cameraManager().changeDistanceByFactor(Math.pow(1.005, event.originalEvent.deltaY));
    }
    onPointerDownDragArea(event) {
      return this.pinball.editorManager().startDrag(this.selectedPart());
    }
    onPointerDownRotateArea(event) {
      return this.pinball.editorManager().startRotate(this.selectedPart());
    }
    onClickFlipButton(event) {
      var flip;
      flip = this.interface.getOperator(Pinball.Interface.Actions.Flip);
      return flip.execute();
    }
  }
  ;
  Playfield.minSelectionSize = 16;
  return Playfield;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.playfield.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/playfield/template.playfield.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-pinball-interface-playfield"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showOverlay"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "overlay"
    }, "\n        ", HTML.DIV(HTML.Attrs({
      class: function() {
        return [ "selection ", Spacebars.mustache(view.lookup("selectionVisibleClass")) ];
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("selectionStyle"));
    }), "\n          ", HTML.DIV({
      class: function() {
        return [ "part ", Spacebars.mustache(view.lookup("partVisibleClass")) ];
      }
    }, "\n            ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("selectedPartBitmapImageOptions"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Assets", "Components", "BitmapImage"));
      });
    }), "\n          "), "\n          ", HTML.DIV({
      class: function() {
        return [ "controls ", Spacebars.mustache(view.lookup("controlsVisibleClass")) ];
      }
    }, HTML.Raw('\n            <div class="drag-area" data-cursor="grab"></div>\n            <div class="rotate-area left" data-cursor="w-rotate"></div>\n            <div class="rotate-area right" data-cursor="e-rotate"></div>\n            <button class="flip-button above" data-cursor="flip-horizontal"></button>\n            <button class="flip-button below" data-cursor="flip-horizontal"></button>\n          ')), "\n        "), HTML.Raw('\n        <div class="polygon-debug"></div>\n        '), Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "Pinball", "Interface", "Playfield", "Grid"));
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"playfield-polygondebug.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/playfield/playfield-polygondebug.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AM, AP, LOI, PAA, PAE, Pinball;
AC = Artificial.Control;
AM = Artificial.Mirage;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Playfield = function () {
  class Playfield extends Pinball.Interface.Playfield {
    onCreated() {
      super.onCreated(...arguments);
      if (!this.constructor.polygonDebug) {
        return;
      }
      this.polygonDebugCanvas = new AM.Canvas();
      this.polygonDebugTrianglesDrawCount = new ReactiveField(-1);
      return $(document).on('keydown.pixelartacademy-pixeltosh-programs-pinball-interface-playfield-polygondebug', event => {
        var delta;
        switch (event.which) {
          case AC.Keys.period:
            delta = 1;
            break;
          case AC.Keys.comma:
            delta = -1;
        }
        if (!delta) {
          return;
        }
        return this.polygonDebugTrianglesDrawCount(this.polygonDebugTrianglesDrawCount() + delta);
      });
    }
    onRendered() {
      var $polygonDebug, context;
      super.onRendered(...arguments);
      if (!this.constructor.polygonDebug) {
        return;
      }
      $polygonDebug = this.$('.polygon-debug');
      $polygonDebug.append(this.polygonDebugCanvas);
      context = this.polygonDebugCanvas.context;
      return this.autorun(() => {
        var boundary, boundaryIndex, bumper, color, curvePointsCount, displayHeight, displayWidth, drawLine, drawPoint, drawPolygon, holeBoundaries, holeBoundary, i, indexBufferArray, indexOfIndex, insetPolygonBoundary, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, len8, len9, line, m, n, o, p, part, partHoleBoundaries, parts, pixelSize, playfield, playfieldBoundary, playfieldPolygon, position, q, r, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, s, scale, shape, t, taperedBoundaryBottom, taperedBoundaryTop, taperedPolygon, taperedVertexBottom, taperedVertexTop, trianglesDrawCount, u, vertexIndex, walls, wallsPolygon, wireBallGuides;
        this.pinball.os.display.scale();
        this.polygonDebugCanvas.width = $polygonDebug.width() * devicePixelRatio;
        this.polygonDebugCanvas.height = $polygonDebug.height() * devicePixelRatio;
        parts = this.pinball.sceneManager().parts();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.polygonDebugCanvas.width, this.polygonDebugCanvas.height);
        pixelSize = Pinball.CameraManager.orthographicPixelSize;
        scale = 1;
        drawPolygon = (style, lineWidth, polygon, closed) => {
          var i, len, ref, startVertex, vertex;
          context.strokeStyle = style;
          context.lineWidth = lineWidth / scale;
          context.beginPath();
          if (closed) {
            startVertex = _.last(polygon.vertices);
          } else {
            startVertex = polygon.vertices[0];
          }
          context.moveTo(startVertex.x, startVertex.y);
          ref = polygon.vertices;
          for (i = 0, len = ref.length; i < len; i++) {
            vertex = ref[i];
            context.lineTo(vertex.x, vertex.y);
          }
          return context.stroke();
        };
        drawPoint = (point, radius, style) => {
          context.beginPath();
          context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
          context.fillStyle = style;
          return context.fill();
        };
        if (this.constructor.debugPlayfieldTriangulation) {
          scale = this.polygonDebugCanvas.width / 0.53;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.scale(scale, scale);
          context.translate(0.015, 0.015);
          if (!(playfield = _.find(parts, part => {
            return part instanceof Pinball.Parts.Playfield;
          }))) {
            return;
          }
          holeBoundaries = [];
          for (i = 0, len = parts.length; i < len; i++) {
            part = parts[i];
            if (partHoleBoundaries = part.playfieldHoleBoundaries()) {
              holeBoundaries.push(...partHoleBoundaries);
            }
          }
          for (j = 0, len1 = holeBoundaries.length; j < len1; j++) {
            holeBoundary = holeBoundaries[j];
            drawPolygon('yellow', 8, holeBoundary, true);
          }
          if (!playfield.avatar.shape()) {
            return;
          }
          if (!(playfieldBoundary = (ref = playfield.avatar.playfieldBoundingRectangle()) != null ? ref.getBoundary() : void 0)) {
            return;
          }
          playfieldPolygon = new AP.PolygonWithHoles(playfieldBoundary, holeBoundaries);
          playfieldPolygon = playfieldPolygon.getPolygonWithoutHoles();
          insetPolygonBoundary = playfieldPolygon.boundary.getInsetPolygonBoundary(0.002);
          drawPolygon('blue', 2, insetPolygonBoundary, true);
          indexBufferArray = playfieldPolygon.triangulate();
          trianglesDrawCount = this.polygonDebugTrianglesDrawCount();
          for (indexOfIndex = k = 0, ref1 = indexBufferArray.length; k < ref1; indexOfIndex = k += 3) {
            if (!trianglesDrawCount) {
              break;
            }
            trianglesDrawCount--;
            drawPolygon('green', 1, {
              vertices: [insetPolygonBoundary.vertices[indexBufferArray[indexOfIndex]], insetPolygonBoundary.vertices[indexBufferArray[indexOfIndex + 1]], insetPolygonBoundary.vertices[indexBufferArray[indexOfIndex + 2]]]
            }, true);
          }
        }
        if (this.constructor.debugWallsTriangulation) {
          if (!(walls = _.find(parts, part => {
            return part instanceof Pinball.Parts.Walls;
          }))) {
            return;
          }
          if (!(shape = walls.avatar.shape())) {
            return;
          }
          scale = this.polygonDebugCanvas.width / 180;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.scale(scale, scale);
          position = walls.position();
          context.translate(position.x / pixelSize, position.z / pixelSize);
          ref2 = shape.boundaries;
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            boundary = ref2[l];
            wallsPolygon = new AP.Polygon(boundary);
            indexBufferArray = wallsPolygon.triangulate(true);
            color = indexBufferArray.error ? 'red' : 'blue';
            drawPolygon(color, 8, boundary, true);
            trianglesDrawCount = this.polygonDebugTrianglesDrawCount();
            for (indexOfIndex = m = 0, ref3 = indexBufferArray.length; m < ref3; indexOfIndex = m += 3) {
              if (!trianglesDrawCount) {
                break;
              }
              trianglesDrawCount--;
              drawPolygon('gray', 1, {
                vertices: [wallsPolygon.vertices[indexBufferArray[indexOfIndex]], wallsPolygon.vertices[indexBufferArray[indexOfIndex + 1]], wallsPolygon.vertices[indexBufferArray[indexOfIndex + 2]]]
              }, true);
            }
          }
        }
        curvePointsCount = Pinball.Part.Avatar.Shape.curveExtraPointsCount + 1;
        drawLine = line => {
          var curvePointIndex, endPointIndex, len3, len4, linePart, n, o, p, point, pointIndex, points, previousPoint, q, ref4, ref5, ref6, results, vertices;
          ref4 = line.parts;
          results = [];
          for (n = 0, len3 = ref4.length; n < len3; n++) {
            linePart = ref4[n];
            if (linePart instanceof PAE.Line.Part.StraightLine) {
              drawPolygon('gold', 4, {
                vertices: [linePart.displayLine2.start, linePart.displayLine2.end]
              });
            }
            if (linePart instanceof PAE.Line.Part.Curve) {
              points = linePart.displayPoints;
              for (o = 0, len4 = points.length; o < len4; o++) {
                point = points[o];
                drawPoint(point, 0.5, 'limegreen');
              }
              previousPoint = points[0];
              vertices = [previousPoint.position];
              endPointIndex = points.length - (linePart.isClosed ? 0 : 1);
              for (pointIndex = p = 1, ref5 = endPointIndex; 1 <= ref5 ? p <= ref5 : p >= ref5; pointIndex = 1 <= ref5 ? ++p : --p) {
                point = points[_.modulo(pointIndex, points.length)];
                for (curvePointIndex = q = 1, ref6 = curvePointsCount; 1 <= ref6 ? q <= ref6 : q >= ref6; curvePointIndex = 1 <= ref6 ? ++q : --q) {
                  vertices.push(AP.BezierCurve.getPointOnCubicBezierCurve(previousPoint.position, previousPoint.controlPoints.after, point.controlPoints.before, point.position, curvePointIndex / curvePointsCount));
                }
                previousPoint = point;
              }
              results.push(drawPolygon('limegreen', 4, {
                vertices
              }));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
        if (this.constructor.debugExtrusionLines) {
          scale = this.polygonDebugCanvas.width / 180;
          for (n = 0, len3 = parts.length; n < len3; n++) {
            part = parts[n];
            if (!(shape = part.shape())) {
              continue;
            }
            if (!(shape instanceof Pinball.Part.Avatar.Extrusion)) {
              continue;
            }
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.scale(scale, scale);
            position = part.position();
            context.translate(position.x / pixelSize, position.z / pixelSize);
            if (shape.properties.flipped) {
              context.scale(-1, 1);
            }
            context.translate(-shape.bitmapOrigin.x + 0.5, -shape.bitmapOrigin.y + 0.5);
            ref4 = shape.pixelArtEvaluation.layers[0].lines;
            for (o = 0, len4 = ref4.length; o < len4; o++) {
              line = ref4[o];
              drawLine(line);
            }
          }
        }
        if (this.constructor.debugBumper) {
          if (!(bumper = _.find(parts, part => {
            return part instanceof Pinball.Parts.Bumper;
          }))) {
            return;
          }
          if (!(shape = bumper.ringShape())) {
            return;
          }
          displayWidth = shape.bitmapRectangle.width() * 1.5;
          displayHeight = displayWidth / 180 * 200;
          scale = this.polygonDebugCanvas.width / displayWidth;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.scale(scale, scale);
          if (shape.properties.flipped) {
            context.scale(-1, 1);
          }
          context.translate(displayWidth / 2, displayHeight / 2);
          ref5 = shape.taperedBoundariesTop;
          for (boundaryIndex = p = 0, len5 = ref5.length; p < len5; boundaryIndex = ++p) {
            taperedBoundaryTop = ref5[boundaryIndex];
            drawPolygon('green', 8, taperedBoundaryTop, true);
            taperedBoundaryBottom = shape.taperedBoundariesBottom[boundaryIndex];
            context.strokeStyle = 'purple';
            context.lineWidth = 4 / scale;
            context.beginPath();
            ref6 = taperedBoundaryTop.vertices;
            for (vertexIndex = q = 0, len6 = ref6.length; q < len6; vertexIndex = ++q) {
              taperedVertexTop = ref6[vertexIndex];
              taperedVertexBottom = taperedBoundaryBottom.vertices[vertexIndex];
              context.moveTo(taperedVertexTop.x, taperedVertexTop.y);
              context.lineTo(taperedVertexBottom.x, taperedVertexBottom.y);
            }
            context.stroke();
          }
          ref7 = shape.taperedBoundariesBottom;
          for (r = 0, len7 = ref7.length; r < len7; r++) {
            taperedBoundaryBottom = ref7[r];
            taperedPolygon = new AP.Polygon(taperedBoundaryBottom);
            indexBufferArray = taperedPolygon.triangulate(true);
            color = indexBufferArray.error ? 'red' : 'blue';
            drawPolygon(color, 8, taperedBoundaryBottom, true);
            trianglesDrawCount = this.polygonDebugTrianglesDrawCount();
            for (indexOfIndex = s = 0, ref8 = indexBufferArray.length; s < ref8; indexOfIndex = s += 3) {
              if (!trianglesDrawCount) {
                break;
              }
              trianglesDrawCount--;
              drawPolygon('gray', 1, {
                vertices: [taperedPolygon.vertices[indexBufferArray[indexOfIndex]], taperedPolygon.vertices[indexBufferArray[indexOfIndex + 1]], taperedPolygon.vertices[indexBufferArray[indexOfIndex + 2]]]
              }, true);
            }
          }
          context.translate(-shape.bitmapOrigin.x + 0.5, -shape.bitmapOrigin.y + 0.5);
          ref9 = shape.pixelArtEvaluation.layers[0].lines;
          for (t = 0, len8 = ref9.length; t < len8; t++) {
            line = ref9[t];
            drawLine(line);
          }
        }
        if (this.constructor.debugWireBallGuideLines) {
          if (!(wireBallGuides = _.find(parts, part => {
            return part instanceof Pinball.Parts.WireBallGuides;
          }))) {
            return;
          }
          if (!(shape = wireBallGuides.avatar.shape())) {
            return;
          }
          scale = this.polygonDebugCanvas.width / 180;
          curvePointsCount = Pinball.Part.Avatar.Shape.curveExtraPointsCount + 1;
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.scale(scale, scale);
          position = wireBallGuides.position();
          context.translate(position.x / pixelSize, position.z / pixelSize);
          context.translate(-shape.bitmapOrigin.x + 0.5, -shape.bitmapOrigin.y + 0.5);
          ref10 = shape.pixelArtEvaluation.layers[0].lines;
          results = [];
          for (u = 0, len9 = ref10.length; u < len9; u++) {
            line = ref10[u];
            if (!line.core) {
              results.push(drawLine(line));
            }
          }
          return results;
        }
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      if (!this.constructor.polygonDebug) {
        return;
      }
      return $(document).off('.pixelartacademy-pixeltosh-programs-pinball-interface-playfield-polygondebug');
    }
  }
  ;
  Playfield.register(Playfield.id());
  Playfield.polygonDebug = false;
  Playfield.debugPlayfieldTriangulation = false;
  Playfield.debugWallsTriangulation = false;
  Playfield.debugExtrusionLines = false;
  Playfield.debugBumper = false;
  Playfield.debugWireBallGuideLines = false;
  return Playfield;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"grid":{"grid.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/playfield/grid/grid.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AM, AP, LOI, PAA, PAE, Pinball;
AC = Artificial.Control;
AM = Artificial.Mirage;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Playfield.Grid = function () {
  class Grid extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield.Grid';
    }
    onCreated() {
      var context, i, j, x, y;
      super.onCreated(...arguments);
      this.playfield = this.ancestorComponentOfType(Pinball.Interface.Playfield);
      this.gridCanvas = new AM.Canvas(180, 200);
      context = this.gridCanvas.context;
      context.setLineDash([1, 1]);
      for (x = i = 10; i <= 170; x = i += 10) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, 200);
      }
      for (y = j = 10; j <= 190; y = j += 10) {
        context.moveTo(0, y + 0.5);
        context.lineTo(180, y + 0.5);
      }
      return context.stroke();
    }
    onRendered() {
      var $grid;
      super.onRendered(...arguments);
      $grid = this.$('.pixelartacademy-pixeltosh-programs-pinball-interface-playfield-grid');
      return $grid.append(this.gridCanvas);
    }
    visibleClass() {
      if (this.playfield.pinball.showGrid()) {
        return 'visible';
      }
    }
  }
  ;
  Grid.register(Grid.id());
  return Grid;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.grid.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/playfield/grid/template.grid.js                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield.Grid");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield.Grid"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Playfield.Grid", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixeltosh-programs-pinball-interface-playfield-grid ", Spacebars.mustache(view.lookup("visibleClass")) ];
    }
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"backbox":{"backbox.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/backbox/backbox.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Backbox = function () {
  class Backbox extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Backbox';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      return this.pinball = this.os.getProgram(Pinball);
    }
  }
  ;
  Backbox.register(Backbox.id());
  return Backbox;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.backbox.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/backbox/template.backbox.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Backbox");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Backbox"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Backbox", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-pinball-interface-backbox"
  }, "\n    ", Spacebars.With(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("pinball"), "gameManager"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isGameOver"));
    }, function() {
      return HTML.Raw("\n        <p>游戏结束</p>\n      ");
    }, function() {
      return [ "\n        ", HTML.P("球：", Blaze.View("lookup:ballNumber", function() {
        return Spacebars.mustache(view.lookup("ballNumber"));
      })), "\n      " ];
    }), "\n      ", HTML.P("得分：", Blaze.View("lookup:score", function() {
      return Spacebars.mustache(view.lookup("score"));
    })), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"instructions":{"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/instructions/instructions.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Instructions = function () {
  class Instructions extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Instructions';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      return this.pinball = this.os.getProgram(Pinball);
    }
    ballsPerPlay() {
      var playfield, ref;
      if (!(playfield = (ref = this.pinball.sceneManager()) != null ? ref.getPartOfType(Pinball.Parts.Playfield) : void 0)) {
        return;
      }
      return playfield.data().ballsPerPlay;
    }
    hasPlunger() {
      return this._hasPart(Pinball.Parts.Plunger);
    }
    hasFlipper() {
      return this._hasPart(Pinball.Parts.Flipper);
    }
    _hasPart(partClass) {
      var sceneManager;
      if (!(sceneManager = this.pinball.sceneManager())) {
        return;
      }
      return _.find(sceneManager.parts(), part => {
        return part instanceof partClass;
      });
    }
  }
  ;
  Instructions.register(Instructions.id());
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.instructions.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/instructions/template.instructions.js               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Instructions");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Instructions"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Instructions", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-pinball-interface-instructions"
  }, "\n    ", HTML.P(Blaze.View("lookup:ballsPerPlay", function() {
    return Spacebars.mustache(view.lookup("ballsPerPlay"));
  }), " 个球/局。"), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasPlunger"));
  }, function() {
    return HTML.Raw("\n      <p>发射器：回车、空格、下方向键</p>\n    ");
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasFlipper"));
  }, function() {
    return HTML.Raw("\n      <p>挡板：Ctrl、Shift、左/右方向键</p>\n    ");
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"parts":{"parts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/parts/parts.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Parts = function () {
  class Parts extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Parts';
    }
    onCreated() {
      var part, partClass;
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      this.pinball = this.os.getProgram(Pinball);
      return this.parts = function () {
        var i, len, ref, results;
        ref = Pinball.Part.getPlaceablePartClasses();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          partClass = ref[i];
          part = new partClass(this.pinball);
          part.avatar.initializeShape();
          results.push(part);
        }
        return results;
      }.call(this);
    }
    onDestroyed() {
      var i, len, part, ref, results;
      super.onDestroyed(...arguments);
      ref = this.parts;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        results.push(part.destroy());
      }
      return results;
    }
    bitmapImageOptions() {
      var part;
      part = this.currentData();
      return {
        bitmap: part.bitmap,
        autoCrop: true
      };
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown .part .image': this.onPointerDownPartImage
      });
    }
    onPointerDownPartImage(event) {
      var part;
      part = this.currentData();

      // Don't allow adding invalid parts.
      if (!part.shape()) {
        return;
      }
      return this.pinball.editorManager().addPart({
        type: part.id(),
        element: event.currentTarget
      });
    }
  }
  ;
  Parts.register(Parts.id());
  return Parts;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.parts.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/parts/template.parts.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Parts");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Parts"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Parts", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-pinball-interface-parts"
  }, "\n    ", HTML.DIV({
    class: "parts-area"
  }, "\n      ", HTML.UL({
    class: "parts"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("parts"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: "part"
    }, "\n            ", HTML.DIV({
      class: "image"
    }, "\n              ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("bitmapImageOptions"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Assets", "Components", "BitmapImage"));
      });
    }), "\n            "), "\n            ", HTML.DIV({
      class: "name"
    }, Blaze.View("lookup:fullName", function() {
      return Spacebars.mustache(view.lookup("fullName"));
    })), "\n            ", HTML.DIV({
      class: "description"
    }, Blaze.View("lookup:description", function() {
      return Spacebars.mustache(view.lookup("description"));
    })), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"settings":{"settings.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/settings/settings.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, Pinball;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Settings = function () {
  class Settings extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      this.pinball = this.os.getProgram(Pinball);
      this.selectedPart = new ReactiveField(null);
      this.autorun(computation => {
        var ref, ref1, ref2, selectedPart;
        selectedPart = ((ref = this.pinball.editorManager()) != null ? ref.selectedPart() : void 0) || ((ref1 = this.pinball.sceneManager()) != null ? ref1.getPartOfType(Pinball.Parts.Playfield) : void 0);

        // Blur the current editable input to save any edits before we render a different part.
        if ((ref2 = document.activeElement) != null) {
          ref2.blur();
        }
        return Meteor.setTimeout(() => {
          return this.selectedPart(selectedPart);
        });
      });
      return this.settings = new ComputedField(() => {
        var property, ref, results, selectedPart, setting;
        if (!(selectedPart = this.selectedPart())) {
          return;
        }
        ref = selectedPart.settings();
        results = [];
        for (property in ref) {
          setting = ref[property];
          results.push(((property, setting) => {
            return {
              setting: setting,
              load: () => {
                var ref1;
                return (ref1 = selectedPart.data()) != null ? ref1[property] : void 0;
              },
              save: value => {
                return this.pinball.editorManager().updatePart(selectedPart, {
                  ["".concat(property)]: value
                });
              }
            };
          })(property, setting));
        }
        return results;
      });
    }
    settingsDisplayed() {
      var data, setting;
      setting = this.currentData().setting;
      if (!setting.enabledCondition) {
        return true;
      }
      data = this.selectedPart().data();
      return setting.enabledCondition(data);
    }
  }
  ;
  Settings.register(Settings.id());
  return Settings;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.settings.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/settings/template.settings.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-pinball-interface-settings"
  }, "\n    ", HTML.DIV({
    class: "name"
  }, Blaze.View("lookup:selectedPart.fullName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("selectedPart"), "fullName"));
  })), "\n    ", HTML.DIV({
    class: "description"
  }, Blaze.View("lookup:selectedPart.description", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("selectedPart"), "description"));
  })), "\n    ", HTML.UL({
    class: "settings"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("settings"));
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("settingsDisplayed"));
    }, function() {
      return [ "\n        ", HTML.LI({
        class: "setting"
      }, "\n          ", HTML.DIV({
        class: "name"
      }, Blaze.View("lookup:setting.name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("setting"), "name"));
      })), "\n          ", Blaze._TemplateWith(function() {
        return {
          template: Spacebars.call(Spacebars.dot(view.lookup("setting"), "type"))
        };
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Template.__dynamic);
        });
      }), "\n        "), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"number":{"number.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/settings/number/number.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Settings.Number = function () {
  class Number extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Number';
    }
    onCreated() {
      var settingOptions;
      super.onCreated(...arguments);
      settingOptions = this.data();
      return this.input = new this.constructor.Input(settingOptions);
    }
    unit() {
      var settingOptions;
      settingOptions = this.data();
      return settingOptions.setting.unit;
    }
  }
  ;
  Number.register(Number.id());
  Number.Input = class Input extends AM.DataInputComponent {
    constructor(settingOptions1) {
      var i, len, property, ref;
      super(...arguments);
      this.settingOptions = settingOptions1;
      this.realtime = false;
      this.type = AM.DataInputComponent.Types.Number;
      this.setting = this.settingOptions.setting;
      this.customAttributes = {};
      ref = ['min', 'max', 'step'];
      for (i = 0, len = ref.length; i < len; i++) {
        property = ref[i];
        if (this.setting[property] != null) {
          this.customAttributes[property] = this.setting[property];
        }
      }
      this.placeholder = this.setting.default;
    }
    load() {
      return this.settingOptions.load();
    }
    save(value) {
      if (_.isNaN(value)) {
        value = null;
      }
      return this.settingOptions.save(value);
    }
  };
  return Number;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.number.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/settings/number/template.number.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Number");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Number"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Number", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-pinball-interface-settings-number"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("input"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", HTML.SPAN({
    class: "unit"
  }, Blaze.View("lookup:unit", function() {
    return Spacebars.mustache(view.lookup("unit"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"boolean":{"boolean.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/settings/boolean/boolean.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Settings.Boolean = function () {
  class Boolean extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Boolean';
    }
    onCreated() {
      var settingOptions;
      super.onCreated(...arguments);
      settingOptions = this.data();
      return this.input = new this.constructor.Input(settingOptions);
    }
  }
  ;
  Boolean.register(Boolean.id());
  Boolean.Input = class Input extends AM.DataInputComponent {
    constructor(settingOptions1) {
      super(...arguments);
      this.settingOptions = settingOptions1;
      this.type = AM.DataInputComponent.Types.Checkbox;
    }
    load() {
      return this.settingOptions.load();
    }
    save(value) {
      if (_.isNaN(value)) {
        value = null;
      }
      return this.settingOptions.save(value);
    }
  };
  return Boolean;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.boolean.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/settings/boolean/template.boolean.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Boolean");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Boolean"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Settings.Boolean", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-pinball-interface-settings-boolean"
  }, "\n    ", HTML.LABEL("\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("input"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), HTML.Raw('<span class="checkmark"></span>\n    ')), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"about":{"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/about/about.coffee                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, FM, LOI, PAA, Pinball;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.About = function () {
  class About extends FM.Dialog {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.About';
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
      return this.$('.pixelartacademy-pixeltosh-programs-pinball-interface-about').closest('.dialog-area').on('click', () => {
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
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/about/template.about.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.About");
Template["PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.About"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.About", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixeltosh-programs-pinball-interface-about pixelartacademy-pixeltosh-os-interface-rectanglearea">\n    <div class="title">弹球创作套件</div>\n    <p>灵感来自Bill Budge在1982年制作的《Pinball Construction Set》。</p>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"actions":{"actions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/actions.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA, Pinball;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions = class Actions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"action.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/action.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var FM, LOI, PAA, Pinball;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.Action = class Action extends PAA.Pixeltosh.OS.Interface.Actions.Action {
  constructor() {
    super(...arguments);
    this.pinball = this.os.getProgram(Pinball);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"camera.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/camera.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, CameraDisplayType, FM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
CameraDisplayType = class CameraDisplayType extends Pinball.Interface.Actions.Action {
  static cameraDisplayType() {
    throw new AE.NotImplementedException("Camera display type action must provide the display type it activates.");
  }
  enabled() {
    return true;
  }
  active() {
    var ref;
    return ((ref = this.pinball.cameraManager()) != null ? ref.displayType() : void 0) === this.constructor.cameraDisplayType();
  }
  execute() {
    return this.pinball.cameraManager().displayType(this.constructor.cameraDisplayType());
  }
};
Pinball.Interface.Actions.OrthographicCamera = function () {
  class OrthographicCamera extends CameraDisplayType {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.OrthographicCamera';
    }
    static displayName() {
      return "2D";
    }
    static cameraDisplayType() {
      return Pinball.CameraManager.DisplayTypes.Orthographic;
    }
  }
  ;
  OrthographicCamera.initialize();
  return OrthographicCamera;
}.call(this);
Pinball.Interface.Actions.PerspectiveCamera = function () {
  class PerspectiveCamera extends CameraDisplayType {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.PerspectiveCamera';
    }
    static displayName() {
      return "3D";
    }
    static cameraDisplayType() {
      return Pinball.CameraManager.DisplayTypes.Perspective;
    }
  }
  ;
  PerspectiveCamera.initialize();
  return PerspectiveCamera;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toggledebugphysics.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/toggledebugphysics.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA, Pinball;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.ToggleDebugPhysics = function () {
  class ToggleDebugPhysics extends Pinball.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.ToggleDebugPhysics';
    }
    static displayName() {
      return "调试物理";
    }
    enabled() {
      return true;
    }
    active() {
      return this.pinball.debugPhysics();
    }
    execute() {
      return this.pinball.debugPhysics(!this.pinball.debugPhysics());
    }
  }
  ;
  ToggleDebugPhysics.initialize();
  return ToggleDebugPhysics;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toggleslowmotion.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/toggleslowmotion.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA, Pinball;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.ToggleSlowMotion = function () {
  class ToggleSlowMotion extends Pinball.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.ToggleSlowMotion';
    }
    static displayName() {
      return "慢动作";
    }
    enabled() {
      return true;
    }
    active() {
      return this.pinball.slowMotion();
    }
    execute() {
      return this.pinball.slowMotion(!this.pinball.slowMotion());
    }
  }
  ;
  ToggleSlowMotion.initialize();
  return ToggleSlowMotion;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toggledisplaywalls.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/toggledisplaywalls.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA, Pinball;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.ToggleDisplayWalls = function () {
  class ToggleDisplayWalls extends Pinball.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.ToggleDisplayWalls';
    }
    static displayName() {
      return "显示墙壁";
    }
    enabled() {
      var ref;
      return !((ref = this.pinball.gameManager()) != null ? ref.inPlay() : void 0);
    }
    active() {
      return this.pinball.displayWalls();
    }
    execute() {
      return this.pinball.displayWalls(!this.pinball.displayWalls());
    }
  }
  ;
  ToggleDisplayWalls.initialize();
  return ToggleDisplayWalls;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"togglegrid.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/togglegrid.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, FM, LOI, PAA, Pinball;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.ToggleGrid = function () {
  class ToggleGrid extends Pinball.Interface.Actions.Action {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.ToggleGrid';
    }
    static displayName() {
      return "网格";
    }
    enabled() {
      var ref;
      return !((ref = this.pinball.gameManager()) != null ? ref.inPlay() : void 0);
    }
    active() {
      return this.pinball.showGrid();
    }
    execute() {
      return this.pinball.showGrid(!this.pinball.showGrid());
    }
  }
  ;
  ToggleGrid.initialize();
  return ToggleGrid;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/modes.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, FM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.Mode = class Mode extends Pinball.Interface.Actions.Action {
  static mode() {
    throw new AE.NotImplementedException("The mode action has to provide the mode it activates.");
  }
  static id() {
    return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.".concat(this.mode());
  }
  static displayName() {
    return {
      [Pinball.GameManager.Modes.Edit]: "编辑",
      [Pinball.GameManager.Modes.Test]: "测试",
      [Pinball.GameManager.Modes.Play]: "游玩"
    }[this.mode()] || this.mode();
  }
  enabled() {
    return true;
  }
  active() {
    var ref;
    return ((ref = this.pinball.gameManager()) != null ? ref.mode() : void 0) === this.constructor.mode();
  }
  execute() {
    return this.pinball.gameManager()[_.toLower(this.constructor.mode())]();
  }
};
Pinball.Interface.Actions.Edit = function () {
  class Edit extends Pinball.Interface.Actions.Mode {
    static mode() {
      return Pinball.GameManager.Modes.Edit;
    }
    enabled() {
      return this.pinball.editModeUnlocked();
    }
  }
  ;
  Edit.initialize();
  return Edit;
}.call(this);
Pinball.Interface.Actions.Test = function () {
  class Test extends Pinball.Interface.Actions.Mode {
    static mode() {
      return Pinball.GameManager.Modes.Test;
    }
    enabled() {
      return this.pinball.editModeUnlocked();
    }
  }
  ;
  Test.initialize();
  return Test;
}.call(this);
Pinball.Interface.Actions.Play = function () {
  class Play extends Pinball.Interface.Actions.Mode {
    static mode() {
      return Pinball.GameManager.Modes.Play;
    }
  }
  ;
  Play.initialize();
  return Play;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/reset.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, FM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.Reset = function () {
  class Reset extends Pinball.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.Reset";
    }
    static displayName() {
      return "重置";
    }
    enabled() {
      var ref;
      return !((ref = this.pinball.gameManager()) != null ? ref.inEdit() : void 0);
    }
    execute() {
      return this.pinball.gameManager().reset();
    }
  }
  ;
  Reset.initialize();
  return Reset;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flip.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/flip.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, FM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.Flip = function () {
  class Flip extends Pinball.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.Flip";
    }
    static displayName() {
      return "翻转";
    }
    enabled() {
      var ref, ref1;
      return (ref = this.pinball.editorManager()) != null ? (ref1 = ref.selectedPart()) != null ? ref1.constructor.placeable() : void 0 : void 0;
    }
    execute() {
      var editorManager, flipped, rotationAngle, selectedPart;
      editorManager = this.pinball.editorManager();
      selectedPart = editorManager.selectedPart();
      flipped = selectedPart.data().flipped;
      rotationAngle = selectedPart.rotationAngle();
      return editorManager.updateSelectedPart({
        flipped: !flipped,
        rotationAngle: -rotationAngle
      });
    }
  }
  ;
  Flip.initialize();
  return Flip;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rotate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/rotate.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, FM, LOI, PAA, Pinball, Rotate;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Rotate = function () {
  class Rotate extends Pinball.Interface.Actions.Action {
    static sign() {
      throw new AE.NotImplementedException("Rotate action has to specify the sign of rotation.");
    }
    enabled() {
      var ref, ref1;
      return (ref = this.pinball.editorManager()) != null ? (ref1 = ref.selectedPart()) != null ? ref1.constructor.placeable() : void 0 : void 0;
    }
    execute() {
      var editorManager, newPosition, newRotationAngle, rotationAngle, rotationQuaternion, selectedPart;
      editorManager = this.pinball.editorManager();
      selectedPart = editorManager.selectedPart();
      rotationAngle = selectedPart.rotationAngle();
      newRotationAngle = rotationAngle + this.constructor.rotationAmount * this.constructor.sign();
      newPosition = _.clone(selectedPart.position());
      rotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, newRotationAngle, 0));
      Pinball.CameraManager.snapShapeToPixelPosition(selectedPart.shape(), newPosition, rotationQuaternion);
      return editorManager.updateSelectedPart({
        rotationAngle: newRotationAngle,
        position: newPosition
      });
    }
  }
  ;
  Rotate.rotationAmount = Math.PI / 2; // 90 degrees

  return Rotate;
}.call(this);
Pinball.Interface.Actions.RotateClockwise = function () {
  class RotateClockwise extends Rotate {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.RotateClockwise";
    }
    static displayName() {
      return "顺时针旋转";
    }
    static sign() {
      return -1;
    }
  }
  ;
  RotateClockwise.initialize();
  return RotateClockwise;
}.call(this);
Pinball.Interface.Actions.RotateCounterClockwise = function () {
  class RotateCounterClockwise extends Rotate {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.RotateCounterClockwise";
    }
    static displayName() {
      return "逆时针旋转";
    }
    static sign() {
      return 1;
    }
  }
  ;
  RotateCounterClockwise.initialize();
  return RotateCounterClockwise;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"delete.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/delete.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, FM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.Delete = function () {
  class Delete extends Pinball.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.Delete";
    }
    static displayName() {
      return "删除";
    }
    enabled() {
      var ref, ref1;
      return (ref = this.pinball.editorManager()) != null ? (ref1 = ref.selectedPart()) != null ? ref1.constructor.placeable() : void 0 : void 0;
    }
    execute() {
      return this.pinball.editorManager().removeSelectedPart();
    }
  }
  ;
  Delete.initialize();
  return Delete;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-pinball/interface/actions/about.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, FM, LOI, PAA, Pinball;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Pinball = PAA.Pixeltosh.Programs.Pinball;
Pinball.Interface.Actions.About = function () {
  class About extends Pinball.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.Pinball.Interface.Actions.About";
    }
    static displayName() {
      return "关于弹球创作套件...";
    }
    execute() {
      return this.os.interface.displayDialog(Pinball.Interface.About.createInterfaceData());
    }
  }
  ;
  About.initialize();
  return About;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".styl",
    ".html"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/pinball.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/assets.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/project.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/project-startend.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/scenemanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/cameramanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/renderermanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/physicsmanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/inputmanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/gamemanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/editormanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/editormanager-startdrag.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/editormanager-startrotate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/audiomanager.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/mouse.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/ball.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/part.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/avatar.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/renderobject.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/renderobject-createextrusiongeometry.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/physicsobject.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/shape.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/sphere.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/box.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/cylinder.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/trianglemesh.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/extrusion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/taperedextrusion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/convexextrusion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/depression.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/part/avatar/silhouette.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/parts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/ballspawner.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/walls.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/wireballguides.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/pins.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/plunger.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/flipper.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/hole.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/gobblehole.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/playfield.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/balltrough.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/pin.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/dynamicpart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/spinningtarget.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/gate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/parts/bumper.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/interface.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/playfield/playfield.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/playfield/template.playfield.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/playfield/playfield-polygondebug.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/playfield/grid/grid.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/playfield/grid/template.grid.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/backbox/backbox.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/backbox/template.backbox.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/instructions/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/instructions/template.instructions.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/parts/parts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/parts/template.parts.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/settings/settings.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/settings/template.settings.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/settings/number/number.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/settings/number/template.number.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/settings/boolean/boolean.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/settings/boolean/template.boolean.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/about/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/about/template.about.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/action.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/camera.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/toggledebugphysics.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/toggleslowmotion.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/toggledisplaywalls.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/togglegrid.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/modes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/reset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/flip.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/rotate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/delete.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-pinball/interface/actions/about.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pixeltosh-pinball", {
  PixelArtAcademy: PixelArtAcademy
});

})();
