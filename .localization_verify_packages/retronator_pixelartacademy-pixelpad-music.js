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
var PixelArtAcademy = Package['retronator:pixelartacademy-music'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad-music":{"system":{"music.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/system/music.coffee                                              //
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
PAA.PixelPad.Systems.Music = function () {
  class Music extends PAA.PixelPad.System {
    // tapeId: the ID of the tape that is currently playing (or ready to be played)
    // sideIndex: the index of the active side the tape
    // trackIndex: the index of the active track on the active side
    // currentTime: lazily-updated number of seconds that the active track's playback is on
    // playing: boolean whether the music should be playing
    static id() {
      return 'PixelArtAcademy.PixelPad.Systems.Music';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "音乐";
    }
    static description() {
      return "用于播放游戏过程中收集的磁带的音乐系统。";
    }
    onCreated() {
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(AB.App);
      this.app.addComponent(this);

      // Subscribe to the tape from both the content (local tapes) and server (extra tapes).
      this.autorun(computation => {
        var tapeId;
        if (!(tapeId = this.state('tapeId'))) {
          return;
        }
        PAA.Music.Tape.forId.subscribeContent(this, tapeId);
        return PAA.Music.Tape.forId.subscribe(this, tapeId);
      });
      this.tape = new ComputedField(() => {
        var tapeId;
        if (!(tapeId = this.state('tapeId'))) {
          return;
        }
        return PAA.Music.Tape.documents.findOne(tapeId);
      });

      // Current time tracks the current song's progress in seconds. We use lazy updates to minimize state reactivity.
      this.sides = new ComputedField(() => {
        var ref;
        return (ref = this.tape()) != null ? ref.getSidesWithTapeProgress() : void 0;
      });

      // Tape progress tracks the dimensionless progress along this side of the tape.
      this.tapeProgress = new ReactiveField(0);
      this._currentTrack = null;

      // Create track based on current indices.
      this.autorun(computation => {
        var sideIndex, sides, tape, trackIndex;
        this._destroyCurrentTrack();
        Meteor.clearTimeout(this._musicStartTimeout);
        if (!LOI.adventure.music.enabled()) {
          return;
        }
        if (!(tape = this.tape())) {
          return;
        }
        if (!(sides = this.sides())) {
          return;
        }
        sideIndex = this.state('sideIndex');
        trackIndex = this.state('trackIndex');
        if (sideIndex == null) {
          return;
        }
        if (trackIndex == null) {
          return;
        }
        return Tracker.nonreactive(() => {
          var currentTime, trackInfo;
          trackInfo = tape.sides[sideIndex].tracks[trackIndex];
          this._currentTrack = new PAA.Music.Track(LOI.adventure.audioManager, trackInfo.title, tape.artist, trackInfo.url, tape.gain);
          currentTime = this.constructor.currentTime();
          if (currentTime) {
            this._currentTrack.setCurrentTime(currentTime);
          }
          this._startTime = sides[sideIndex].tracks[trackIndex].startTime;
          if (this.state('playing')) {
            // If the song was already playing and it's not at the start, we must fade into it after the starting delay.
            if (currentTime) {
              return this._musicStartTimeout = Meteor.setTimeout(() => {
                return LOI.adventure.music.startPlayback(this._currentTrack, PAA.Music.FadeDurations.PrePlayingMusicOnLoadFadeIn);
              }, PAA.Music.StartTimeoutDuration * 1000);
            } else {
              return LOI.adventure.music.startPlayback(this._currentTrack, 0, PAA.Music.FadeDurations.DynamicSoundtrackToMusicAppFadeOut);
            }
          }
        });
      });
      // Sync audio variables.
      return this.autorun(computation => {
        return this.audio.playing(this.state('playing'));
      });
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      this.app.removeComponent(this);
      if ((ref = this._currentTrack) != null) {
        ref.destroy();
      }
      Meteor.clearTimeout(this._musicStartTimeout);
      // Disable any ongoing audio.
      this.audio.playing(false);
      return this.audio.seeking(false);
    }
    _destroyCurrentTrack() {
      var ref;
      if ((ref = this._currentTrack) != null) {
        ref.destroy();
      }
      return this._currentTrack = null;
    }
    setTape(tape) {
      this._destroyCurrentTrack();
      return Tracker.nonreactive(() => {
        if (tape) {
          this.state('tapeId', tape._id);
          this.state('sideIndex', 0);
          this.state('trackIndex', 0);
          this.state('currentTime', 0);
          return this.tapeProgress(0);
        } else {
          this.stop();
          return this.state('tapeId', null);
        }
      });
    }
    setTrack(sideIndex, trackIndex) {
      return Tracker.nonreactive(() => {
        var ref;
        this.state('currentTime', 0);
        // If the track is already set, just reset the time.
        if (sideIndex === this.state('sideIndex') && trackIndex === this.state('trackIndex')) {
          if ((ref = this._currentTrack) != null) {
            ref.setCurrentTime(0);
          }
          return;
        }
        this._destroyCurrentTrack();
        this.state('sideIndex', sideIndex);
        return this.state('trackIndex', trackIndex);
      });
    }
    play() {
      return Tracker.nonreactive(() => {
        if (this.state('playing')) {
          return;
        }
        if (this._currentTrack) {
          LOI.adventure.music.startPlayback(this._currentTrack, 0, PAA.Music.FadeDurations.DynamicSoundtrackToMusicAppFadeOut);
        }
        return this.state('playing', true);
      });
    }
    stop() {
      return Tracker.nonreactive(() => {
        if (this._currentTrack && LOI.adventure.music.isPlayingPlayback(this._currentTrack)) {
          LOI.adventure.music.stopPlayback();
        }
        return this.state('playing', false);
      });
    }
    nextTrack() {
      return Tracker.nonreactive(() => {
        var sideIndex, sides, trackIndex;
        // Go to the next track if possible.
        sides = this.sides();
        sideIndex = this.state('sideIndex');
        trackIndex = this.state('trackIndex');
        trackIndex++;
        if (sides[sideIndex].tracks[trackIndex]) {
          return this.setTrack(sideIndex, trackIndex);
        } else {
          // Go to the next side if possible.
          sideIndex++;
          if (sides[sideIndex]) {
            return this.setTrack(sideIndex, 0);
          } else {
            // We reached the end of the tape, stop playing.
            return this.stop();
          }
        }
      });
    }
    rewindOrPreviousTrack() {
      return Tracker.nonreactive(() => {
        var currentTime, sideIndex, sides, trackIndex;
        // Rewind if possible.
        currentTime = this.state('currentTime');
        this.state('currentTime', 0);
        this._currentTrack.setCurrentTime(0);
        if (currentTime > 1) {
          return;
        }

        // Go to the previous track if possible.
        sides = this.sides();
        sideIndex = this.state('sideIndex');
        trackIndex = this.state('trackIndex');
        trackIndex--;
        if (sides[sideIndex].tracks[trackIndex]) {
          return this.setTrack(sideIndex, trackIndex);
        } else {
          // Go to the previous side if possible.
          sideIndex--;
          if (sides[sideIndex]) {
            return this.setTrack(sideIndex, sides[sideIndex].tracks.length - 1);
          }
        }
      });
    }
    update(appTime) {
      var currentTime, tapeProgressDuration;
      if (!this._currentTrack) {
        return;
      }
      if (!this.state('playing')) {
        return;
      }
      if (this._currentTrack.ended()) {
        return this.nextTrack();
      } else {
        currentTime = this._currentTrack.currentTime();
        this.constructor.currentTime(currentTime);
        tapeProgressDuration = this._startTime + currentTime;
        return this.tapeProgress(PAA.Music.Tape.durationToTapeProgress(tapeProgressDuration));
      }
    }
  }
  ;
  Music.register(Music.id());
  Music.initialize();
  Music.Audio = new LOI.Assets.Audio.Namespace(Music.id(), {
    variables: {
      playing: AEc.ValueTypes.Boolean,
      seeking: AEc.ValueTypes.Boolean
    }
  });
  Music.currentTime = Music.state.field('currentTime', {
    lazyUpdates: true
  });
  return Music;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.music.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/system/template.music.js                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Systems.Music");
Template["PixelArtAcademy.PixelPad.Systems.Music"] = new Template("Template.PixelArtAcademy.PixelPad.Systems.Music", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-systems-music system"
  }, "\n    Tape: ", Blaze.View("lookup:tape.title", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("tape"), "title"));
  }), HTML.Raw("<br>\n    Currently playing: "), Blaze.View("lookup:currentTrackInfo.title", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("currentTrackInfo"), "title"));
  }), HTML.Raw("<br>\n    Progress: "), Blaze.View("lookup:tapeProgress", function() {
    return Spacebars.mustache(view.lookup("tapeProgress"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"app":{"music.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/music.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, AMu, LM, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
LM = PixelArtAcademy.LearnMode;
PAA.PixelPad.Apps.Music = function () {
  class Music extends PAA.PixelPad.App {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Music';
    }
    static url() {
      return 'music';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "音乐";
    }
    static description() {
      return "播放磁带以获得额外的音乐！";
    }
    constructor() {
      super(...arguments);
      this.resizable(false);
      this.drawer = new ReactiveField(null);
      this.player = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(AB.App);
      this.app.addComponent(this);
      this.system = new ComputedField(() => {
        var musicSystem, pixelPad;
        if (!LOI.adventure.ready()) {
          return;
        }
        if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
          return;
        }
        if (!(musicSystem = _.find(pixelPad.os.currentSystems(), system => {
          return system instanceof PAA.PixelPad.Systems.Music;
        }))) {
          return;
        }
        if (!musicSystem.isCreated()) {
          return;
        }
        return musicSystem;
      });
      this.drawer(new this.constructor.Drawer(this));
      this.player(new this.constructor.Player(this));

      // Subscribe to all tapes, built-in and from the server.
      PAA.Music.Tape.all.subscribeContent(this);
      PAA.Music.Tape.all.subscribe(this);
      this.selectedTape = new ReactiveField(null);

      // Displayed tape is the same as selected, except it doesn't revert to null to allow for styled animations.
      this.displayedTape = new ReactiveField(null);
      this.loadedTape = new ComputedField(() => {
        var tapeId;
        if (!(tapeId = PAA.PixelPad.Systems.Music.state('tapeId'))) {
          return;
        }
        return PAA.Music.Tape.documents.findOne(tapeId);
      });

      // Change PixelPad size.
      this.pixelPadSizeToPlayer = new ReactiveField(PAA.PixelPad.Systems.Music.state('tapeId'));
      this.autorun(computation => {
        if (this.pixelPadSizeToPlayer()) {
          return this.setFixedPixelPadSize(330, 204);
        } else {
          return this.setFixedPixelPadSize(380, 260);
        }
      });

      // Set parameters if music system has an active tape.
      this.autorun(computation => {
        var tape, tapeId;
        if (!(tapeId = PAA.PixelPad.Systems.Music.state('tapeId'))) {
          return;
        }
        if (!(tape = PAA.Music.Tape.documents.findOne(tapeId))) {
          return;
        }
        AB.Router.changeParameters({
          parameter3: tape.slug,
          parameter4: 'play'
        });
        return this.loadedTape(tape);
      });

      // Select tape based on URL parameter.
      this.autorun(computation => {
        var tape, tapeParameter;
        tapeParameter = AB.Router.getParameter('parameter3');
        if (tapeParameter) {
          tape = PAA.Music.Tape.documents.findOne({
            slug: tapeParameter
          });
          if (!tape) {
            return;
          }
          this.selectedTape(tape);
          return this.displayedTape(tape);
        } else {
          return this.selectedTape(null);
        }
      });
      return this.animating = new ReactiveField(null);
    }
    onRendered() {
      var $playerTray;
      super.onRendered(...arguments);
      this.$origin = this.$('.origin');
      this.$case = this.$('.selected-tape .case');
      this.$cassette = this.$('.selected-tape .cassette');
      this.$cassetteSpoolLeft = this.$('.selected-tape .cassette .spool.left');
      this.$cassetteSpoolRight = this.$('.selected-tape .cassette .spool.right');
      this._resetSpoolRotation();

      // If we have a tape inserted, start at the player.
      this.autorun(computation => {
        if (!LOI.adventure.gameStateAvailable()) {
          return;
        }
        computation.stop();
        if (PAA.PixelPad.Systems.Music.state('tapeId')) {
          this.$origin.css({
            top: "".concat(this.constructor.TopPositions.Player, "rem")
          });
          this.$cassette.css({
            left: "".concat(this.constructor.CassettePositions.Left.Player, "rem"),
            top: "".concat(this.constructor.CassettePositions.Top.Player, "rem")
          });
          return this.$case.addClass('open');
        } else {
          // We're not at the player, animate the intro.
          this.$origin.css({
            top: "".concat(this.constructor.TopPositions.Drawer, "rem")
          });
          return this.$cassette.css({
            left: "".concat(this.constructor.CassettePositions.Left.Case, "rem"),
            top: "".concat(this.constructor.CassettePositions.Top.Case, "rem")
          });
        }
      });
      $playerTray = this.$('.player .tray');
      return this.audio.trayPan(AEc.getPanForElement($playerTray[0]));
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.app.removeComponent(this);
    }
    _resetSpoolRotation() {
      this.spoolRotationLeft = 0;
      this.spoolFrameIndexLeft = 0;
      this.spoolRotationRight = 3;
      this.spoolFrameIndexRight = 3;
      return this._updateSpoolFrames();
    }
    _updateSpoolFrames() {
      this._updateSpoolFrame(this.$cassetteSpoolLeft, this.spoolFrameIndexLeft);
      return this._updateSpoolFrame(this.$cassetteSpoolRight, this.spoolFrameIndexRight);
    }
    _updateSpoolFrame($spool, frameIndex) {
      return $spool.css({
        backgroundPositionX: "".concat(frameIndex * 14, "rem")
      });
    }
    async loadSelectedTape() {
      this.animating(true);
      this.audio.tapeLoad();
      this._resetSpoolRotation();
      this.$case.addClass('open');

      // Move the cassette tape outside the case, in front of the player, and slide it into the tray.
      this.$cassette.velocity({
        top: ["".concat(this.constructor.CassettePositions.Top.OutsideCase, "rem"), 'ease-in', "".concat(this.constructor.CassettePositions.Top.Case, "rem")]
      }, {
        duration: 200,
        delay: 300
      });
      this.$cassette.velocity({
        left: ["".concat(this.constructor.CassettePositions.Left.Player, "rem"), 'ease-out', "".concat(this.constructor.CassettePositions.Left.Drawer, "rem")],
        top: ["".concat(this.constructor.CassettePositions.Top.OutsidePlayer, "rem"), 'ease-out', "".concat(this.constructor.CassettePositions.Top.OutsideCase, "rem")]
      }, {
        duration: 800
      });
      this.$cassette.velocity({
        top: ["".concat(this.constructor.CassettePositions.Top.Player, "rem"), 'ease-in-out', "".concat(this.constructor.CassettePositions.Top.OutsidePlayer, "rem")]
      }, {
        duration: 800
      });

      // Move camera from drawer to player.
      this.$origin.velocity({
        top: "".concat(this.constructor.TopPositions.Player, "rem")
      }, {
        duration: 1000,
        delay: 300,
        easing: 'ease-in-out'
      });

      // During the transition, resize pixelPad.
      await _.waitForSeconds(0.4);
      this.pixelPadSizeToPlayer(true);
      await _.waitForSeconds(2);

      // Set the tape to complete the animation.
      AB.Router.changeParameter('parameter4', 'play');
      this.system().setTape(this.selectedTape());
      this.audio.trayClose();
      return this.animating(false);
    }
    async unloadTape() {
      this.animating(true);

      // Remove the tape, which opens the tray.
      this.system().setTape(null);
      this.audio.trayOpen();
      this.$case.addClass('unloading');
      await _.waitForSeconds(0.3);

      // Move cassette tape out of the player.
      this.audio.tapeUnload();
      this.$cassette.velocity({
        top: "".concat(this.constructor.CassettePositions.Top.OutsidePlayer, "rem")
      }, {
        duration: 500,
        delay: 200
      });

      // Move camera from player to drawer.
      this.$origin.velocity({
        top: "".concat(this.constructor.TopPositions.Drawer, "rem")
      }, {
        duration: 1000,
        delay: 400
      });

      // At the start of the transition, resize pixelPad.
      await _.waitForSeconds(0.4);
      this.pixelPadSizeToPlayer(false);
      await _.waitForSeconds(1);
      // Deselect the tape and reset CSS.
      this.drawer().deselectTape();
      // Note that deselectTape only resets the 3rd parameter and we need to disable play as well.
      // We need to change both at once however, since the change isn't yet propagated.
      AB.Router.changeParameters({
        parameter3: null,
        parameter4: null
      });
      await _.waitForSeconds(0.2);
      this.$case.removeClass('open');
      this.$cassette.css({
        left: "".concat(this.constructor.CassettePositions.Left.Case, "rem"),
        top: "".concat(this.constructor.CassettePositions.Top.Case, "rem")
      });
      this.$case.removeClass('unloading');
      return this.animating(false);
    }
    inGameMusicMode() {
      return LM.Interface.InGameMusicMode.Direct;
    }
    selectedTapeActiveClass() {
      if (this.selectedTape()) {
        return 'active';
      }
    }
    selectedTapeLoadedClass() {
      if (this.loadedTape()) {
        return 'loaded';
      }
    }
    cassetteSideLetter() {
      if ((PAA.PixelPad.Systems.Music.state('sideIndex') || 0) === 0) {
        return 'A';
      } else {
        return 'B';
      }
    }
    cassetteLabel() {
      var tape, title;
      if (!(tape = tape = this.displayedTape())) {
        return;
      }
      if (tape.title) {
        title = tape.title;
      } else {
        title = tape.sides[PAA.PixelPad.Systems.Music.state('sideIndex') || 0].title;
      }
      return "".concat(tape.artist, " - ").concat(title);
    }
    onBackButton() {
      // Fully close the app if going back from the player.
      if (!AB.Router.getParameter('parameter4')) {
        return;
      }
      AB.Router.changeParameters({
        parameter2: null,
        parameter3: null,
        parameter4: null
      });

      // Inform that we've handled the back button.
      return true;
    }
    update(appTime) {
      var newSpoolFrameIndexLeft, newSpoolFrameIndexRight;
      if (!LOI.adventure.music.enabled()) {
        return;
      }
      if (!PAA.PixelPad.Systems.Music.state('playing')) {
        return;
      }
      this.spoolRotationLeft += this.constructor.spoolRotationSpeedLeft * appTime.elapsedAppTime;
      newSpoolFrameIndexLeft = Math.floor(this.spoolRotationLeft) % 6;
      if (newSpoolFrameIndexLeft !== this.spoolFrameIndexLeft) {
        this.spoolFrameIndexLeft = newSpoolFrameIndexLeft;
        this._updateSpoolFrame(this.$cassetteSpoolLeft, this.spoolFrameIndexLeft);
      }
      this.spoolRotationRight += this.constructor.spoolRotationSpeedRight * appTime.elapsedAppTime;
      newSpoolFrameIndexRight = Math.floor(this.spoolRotationRight) % 6;
      if (newSpoolFrameIndexRight !== this.spoolFrameIndexRight) {
        this.spoolFrameIndexRight = newSpoolFrameIndexRight;
        return this._updateSpoolFrame(this.$cassetteSpoolRight, this.spoolFrameIndexRight);
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .selected-tape': this.onClickSelectedTape,
        'pointerenter .selected-tape .lid': this.onPointerEnterSelectedTapeLid,
        'pointerleave .selected-tape .lid': this.onPointerLeaveSelectedTapeLid
      });
    }
    onClickSelectedTape(event) {
      if (this.animating()) {
        return;
      }
      if (this.loadedTape()) {
        return;
      }
      return this.loadSelectedTape();
    }
    onPointerEnterSelectedTapeLid(event) {
      // Only do hover sounds when closed.
      if ($(event.target).closest('.case.open').length) {
        return;
      }
      return this.audio.caseOpen();
    }
    onPointerLeaveSelectedTapeLid(event) {
      // Only do hover sounds when closed.
      if ($(event.target).closest('.case.open').length) {
        return;
      }
      return this.audio.caseClose();
    }
  }
  ;
  Music.register(Music.id());
  Music.initialize();
  Music.TopPositions = {
    Drawer: 0,
    Player: 300
  };
  Music.CassettePositions = {
    Top: {
      Case: 0,
      OutsideCase: -30,
      OutsidePlayer: -170,
      Player: -255
    },
    Left: {
      Case: 0,
      Player: -78
    }
  };
  Music.spoolRotationSpeedLeft = 20; // frames / second

  Music.spoolRotationSpeedRight = 15; // frames / second

  Music.Audio = new LOI.Assets.Audio.Namespace(Music.id(), {
    variables: {
      caseOpen: AEc.ValueTypes.Trigger,
      caseClose: AEc.ValueTypes.Trigger,
      tapeLoad: AEc.ValueTypes.Trigger,
      tapeUnload: AEc.ValueTypes.Trigger,
      trayClose: AEc.ValueTypes.Trigger,
      trayOpen: AEc.ValueTypes.Trigger,
      trayPan: AEc.ValueTypes.Number
    }
  });
  return Music;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.music.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/template.music.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Music");
Template["PixelArtAcademy.PixelPad.Apps.Music"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Music", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-music app"
  }, "\n    ", HTML.DIV({
    class: "origin"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("drawer"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("player"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      ", HTML.DIV({
    class: function() {
      return [ "selected-tape ", Spacebars.mustache(view.lookup("selectedTapeActiveClass")), " ", Spacebars.mustache(view.lookup("selectedTapeLoadedClass")), " tape-design ", Spacebars.mustache(Spacebars.dot(view.lookup("displayedTape"), "styleClass")) ];
    }
  }, "\n        ", HTML.DIV({
    class: "case"
  }, HTML.Raw('\n          <div class="outer"></div>\n          '), HTML.DIV({
    class: "lid"
  }, "\n            ", HTML.DIV({
    class: "closed cover"
  }, "\n              ", HTML.DIV({
    class: "inlay"
  }, "\n                ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("displayedTape"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Music", "Inlay"));
    });
  }), "\n              "), "\n            "), "\n            ", HTML.DIV({
    class: "open"
  }, HTML.Raw('\n              <div class="under"></div>\n              '), HTML.DIV({
    class: "cassette"
  }, "\n                ", HTML.DIV({
    class: "shell"
  }, "\n                  ", HTML.DIV({
    class: "side"
  }, Blaze.View("lookup:cassetteSideLetter", function() {
    return Spacebars.mustache(view.lookup("cassetteSideLetter"));
  })), "\n                  ", HTML.DIV({
    class: "label"
  }, Blaze.View("lookup:cassetteLabel", function() {
    return Spacebars.mustache(view.lookup("cassetteLabel"));
  })), HTML.Raw('\n                  <div class="spools">\n                    <div class="left spool"></div>\n                    <div class="right spool"></div>\n                  </div>\n                ')), "\n              "), HTML.Raw('\n              <div class="over"></div>\n            ')), "\n          "), "\n        "), "\n      "), "\n    "), "\n  ");
}));

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Music.Inlay");
Template["PixelArtAcademy.PixelPad.Apps.Music.Inlay"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Music.Inlay", (function() {
  var view = this;
  return [ HTML.DIV({
    class: "title"
  }, Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n  ", HTML.OL({
    class: "sides"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("getSidesWithTapeProgress"));
  }, function() {
    return [ "\n      ", HTML.LI({
      class: "side"
    }, "\n        ", HTML.DIV({
      class: "title"
    }, Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    })), "\n        ", HTML.OL({
      class: "tracks"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("tracks"));
    }, function() {
      return [ "\n            ", HTML.LI({
        class: "track"
      }, "\n              ", HTML.DIV({
        class: "title"
      }, Blaze.View("lookup:title", function() {
        return Spacebars.mustache(view.lookup("title"));
      })), "\n              ", HTML.DIV({
        class: "tape-progress"
      }, Blaze.View("lookup:roundNumber", function() {
        return Spacebars.mustache(view.lookup("roundNumber"), view.lookup("tapeProgress"));
      })), "\n            "), "\n          " ];
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawer":{"drawer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/drawer/drawer.coffee                                         //
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
PAA.PixelPad.Apps.Music.Drawer = function () {
  class Drawer extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Music.Drawer';
    }
    constructor(music) {
      super(...arguments);
      this.music = music;
      this.opened = new ReactiveField(false);
      this.hoveredTape = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.tapes = new ComputedField(() => {
        var tapeSelector, tapeSelectors, tapes;
        tapeSelectors = LOI.adventure.currentTapeSelectors();
        tapes = function () {
          var i, len, results;
          results = [];
          for (i = 0, len = tapeSelectors.length; i < len; i++) {
            tapeSelector = tapeSelectors[i];
            results.push(PAA.Music.Tape.documents.findOne(tapeSelector));
          }
          return results;
        }();
        return _.without(tapes, void 0);
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      // Open the drawer on app launch.
      return Meteor.setTimeout(() => {
        this.opened(true);
        if (!PAA.PixelPad.Systems.Music.state('tapeId')) {
          // Don't play the sound if we're focused on the player.
          return this.audio.drawerOpen();
        }
      }, 500);
    }
    selectTape(tape) {
      AB.Router.changeParameter('parameter3', tape.slug);
      return this.audio.casePickUp();
    }
    deselectTape() {
      AB.Router.changeParameter('parameter3', null);
      this.audio.deselectedCasePan(this.audio.selectedCasePan.value());
      return this.audio.casePutDown();
    }
    openedClass() {
      if (this.opened()) {
        return 'opened';
      }
    }
    tapeSelectedClass() {
      var ref, tape;
      tape = this.currentData();
      if (tape._id === ((ref = this.music.selectedTape()) != null ? ref._id : void 0)) {
        return 'selected';
      }
    }
    tapeHoveredClass() {
      var ref, tape;
      tape = this.currentData();
      if (tape._id === ((ref = this.hoveredTape()) != null ? ref._id : void 0)) {
        return 'hovered';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click': this.onClick,
        'click .tape': this.onClickTape,
        'pointerenter .tape': this.onPointerEnterTape,
        'pointerleave .tape': this.onPointerLeaveTape
      });
    }
    onClick(event) {
      var $target;
      if (this.music.loadedTape()) {
        return;
      }
      if (!this.music.selectedTape()) {
        return;
      }
      $target = $(event.target);
      if ($target.closest('.selected-tape').length) {
        return;
      }
      if ($target.closest('.tape').length) {
        return;
      }
      return this.deselectTape();
    }
    async onClickTape(event) {
      var tape;
      tape = this.currentData();
      if (AB.Router.getParameter('parameter3')) {
        this.deselectTape();
        await _.waitForSeconds(0.2);
      }
      this.audio.selectedCasePan(AEc.getPanForElement(event.target));
      this.selectTape(tape);
      // Start tape on side A at the beginning.
      PAA.PixelPad.Systems.Music.state('sideIndex', 0);
      PAA.PixelPad.Systems.Music.state('trackIndex', 0);
      return PAA.PixelPad.Systems.Music.state('currentTime', 0);
    }
    onPointerEnterTape(event) {
      var tape;
      tape = this.currentData();
      this.audio.slideUpCasePan(AEc.getPanForElement(event.target));
      this.hoveredTape(tape);
      return this.audio.caseSlideUp();
    }
    onPointerLeaveTape(event) {
      this.hoveredTape(null);
      this.audio.slideDownCasePan(this.audio.slideUpCasePan.value());
      return this.audio.caseSlideDown();
    }
  }
  ;
  Drawer.register(Drawer.id());
  Drawer.Audio = new LOI.Assets.Audio.Namespace(Drawer.id(), {
    variables: {
      drawerOpen: AEc.ValueTypes.Trigger,
      casePickUp: AEc.ValueTypes.Trigger,
      casePutDown: AEc.ValueTypes.Trigger,
      caseSlideUp: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 200
      },
      caseSlideDown: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 200
      },
      selectedCasePan: {
        valueType: AEc.ValueTypes.Number
      },
      deselectedCasePan: {
        valueType: AEc.ValueTypes.Number
      },
      slideUpCasePan: {
        valueType: AEc.ValueTypes.Number
      },
      slideDownCasePan: {
        valueType: AEc.ValueTypes.Number
      }
    }
  });
  return Drawer;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.drawer.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/drawer/template.drawer.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Music.Drawer");
Template["PixelArtAcademy.PixelPad.Apps.Music.Drawer"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Music.Drawer", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-music-drawer"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "drawer ", Spacebars.mustache(view.lookup("openedClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: "contents"
  }, "\n        ", HTML.UL({
    class: "tapes"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("tapes"));
  }, function() {
    return [ "\n            ", HTML.LI({
      class: function() {
        return [ "tape ", Spacebars.mustache(view.lookup("tapeSelectedClass")), " ", Spacebars.mustache(view.lookup("styleClass")) ];
      }
    }, "\n              ", HTML.DIV({
      class: "case"
    }, "\n                ", HTML.DIV({
      class: "title"
    }, Blaze.View("lookup:artist", function() {
      return Spacebars.mustache(view.lookup("artist"));
    })), "\n              "), "\n            "), "\n          " ];
  }), "\n        "), "\n      "), "\n      ", HTML.DIV({
    class: "shadows"
  }, "\n        ", HTML.DIV({
    class: "tape-shadows"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("tapes"));
  }, function() {
    return [ "\n            ", HTML.DIV({
      class: function() {
        return [ "tape-shadow ", Spacebars.mustache(view.lookup("tapeHoveredClass")), " ", Spacebars.mustache(view.lookup("tapeSelectedClass")) ];
      }
    }, HTML.Raw('\n              <div class="top"></div>\n              <div class="bottom"></div>\n            ')), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), HTML.Raw('\n    <div class="table-top"></div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"player":{"player.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/player/player.coffee                                         //
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
PAA.PixelPad.Apps.Music.Player = function () {
  class Player extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Music.Player';
    }
    constructor(music) {
      super(...arguments);
      this.music = music;
    }
    onCreated() {
      super.onCreated(...arguments);

      // If the play button is pressed, make sure music can be heard.
      return this.autorun(computation => {
        var dialog, message;
        if (!PAA.PixelPad.Systems.Music.state('playing')) {
          return;
        }
        if (LOI.adventure.menu.visible()) {
          return;
        }
        if (LOI.settings.audio.enabled.value() === LOI.Settings.Audio.Enabled.Off) {
          message = "Audio is disabled. Would you like to enable it to play music?";
        } else if (LOI.settings.audio.mainVolume.value() === 0) {
          message = "The main volume is set to zero. Would you like to increase it to play music?";
        } else if (LOI.settings.audio.musicVolume.value() === 0) {
          message = "The music volume is set to zero. Would you like to increase it to play music?";
        } else {
          return;
        }
        dialog = new LOI.Components.Dialog({
          message: message,
          buttons: [{
            text: "Yes",
            value: true
          }, {
            text: "No"
          }]
        });
        return LOI.adventure.showActivatableModalDialog({
          dialog: dialog,
          callback: () => {
            return this._enableAudioOrStopPlay(dialog.result);
          }
        });
      });
    }
    _enableAudioOrStopPlay(enable) {
      if (enable) {
        if (LOI.settings.audio.enabled.value() === LOI.Settings.Audio.Enabled.Off) {
          LOI.settings.audio.enabled.value(LOI.Settings.Audio.Enabled.On);
        }
        if (LOI.settings.audio.mainVolume.value() === 0) {
          LOI.settings.audio.mainVolume.value(1);
        }
        if (LOI.settings.audio.musicVolume.value() === 0) {
          return LOI.settings.audio.musicVolume.value(1);
        }
      } else {
        return this.music.system().stop();
      }
    }
    trayOpenClass() {
      if (!this.music.loadedTape()) {
        return 'open';
      }
    }
    playActiveClass() {
      if (PAA.PixelPad.Systems.Music.state('playing')) {
        return 'active';
      }
    }
    tapeDisplayedClass() {
      if (this.music.loadedTape()) {
        return 'displayed';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'pointerdown .play.button': this.onPointerDownPlayButton,
        'pointerdown .stop.button': this.onPointerDownStopButton,
        'pointerdown .eject.button': this.onPointerDownEjectButton,
        'pointerdown .rewind.button': this.onPointerDownRewindButton,
        'pointerdown .fast-forward.button': this.onPointerDownFastForwardButton,
        'pointerup .stop.button': this.onPointerUpStopButton,
        'pointerup .rewind.button': this.onPointerUpRewindButton,
        'pointerup .fast-forward.button': this.onPointerUpFastForwardButton,
        'click .inlay .track': this.onClickInlayTrack
      });
    }
    onPointerDownPlayButton(event) {
      return this.music.system().play();
    }
    onPointerDownStopButton(event) {
      this.music.system().stop();
      if (!PAA.PixelPad.Systems.Music.state('playing')) {
        // If the music will stop and trigger its own audio, the press sound is not needed.
        return this._pressButtonAudio(event);
      }
    }
    onPointerDownEjectButton(event) {
      return this.music.unloadTape();
    }
    onPointerDownRewindButton(event) {
      this.music.system().rewindOrPreviousTrack();
      return this._pressButtonAudio(event);
    }
    onPointerDownFastForwardButton(event) {
      this.music.system().nextTrack();
      return this._pressButtonAudio(event);
    }
    _pressButtonAudio(event) {
      this.audio.buttonPan(AEc.getPanForElement(event.target));
      return this.audio.buttonPress();
    }
    onPointerUpStopButton(event) {
      return this._releaseButtonAudio();
    }
    onPointerUpRewindButton(event) {
      return this._releaseButtonAudio();
    }
    onPointerUpFastForwardButton(event) {
      return this._releaseButtonAudio();
    }
    _releaseButtonAudio() {
      return this.audio.buttonRelease();
    }
    onClickInlayTrack(event) {
      var i, len, ref, results, side, sideIndex, sideTrack, tape, track, trackIndex;
      track = this.currentData();
      tape = this.music.displayedTape();
      ref = tape.sides;
      results = [];
      for (sideIndex = i = 0, len = ref.length; i < len; sideIndex = ++i) {
        side = ref[sideIndex];
        results.push(function () {
          var j, len1, ref1, results1;
          ref1 = side.tracks;
          results1 = [];
          for (trackIndex = j = 0, len1 = ref1.length; j < len1; trackIndex = ++j) {
            sideTrack = ref1[trackIndex];
            if (track.url === sideTrack.url) {
              results1.push(this.music.system().setTrack(sideIndex, trackIndex));
            }
          }
          return results1;
        }.call(this));
      }
      return results;
    }
  }
  ;
  Player.register(Player.id());
  Player.Audio = new LOI.Assets.Audio.Namespace(Player.id(), {
    variables: {
      buttonPress: AEc.ValueTypes.Trigger,
      buttonRelease: AEc.ValueTypes.Trigger,
      buttonPan: AEc.ValueTypes.Number
    }
  });
  return Player;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.player.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/player/template.player.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Music.Player");
Template["PixelArtAcademy.PixelPad.Apps.Music.Player"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Music.Player", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-music-player"
  }, "\n    ", HTML.DIV({
    class: "player"
  }, "\n      ", HTML.DIV({
    class: "controls"
  }, "\n        ", HTML.DIV({
    class: "counter"
  }, "\n          ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Music", "Player", "Counter"));
  }), "\n        "), HTML.Raw('\n        <div class="label">磁带播放器</div>\n        '), HTML.DIV({
    class: "buttons"
  }, "\n          ", HTML.BUTTON({
    class: function() {
      return [ "rewind button ", Spacebars.mustache(view.lookup("rewindActiveClass")) ];
    }
  }, "Rwnd"), "\n          ", HTML.BUTTON({
    class: function() {
      return [ "fast-forward button ", Spacebars.mustache(view.lookup("fastForwardActiveClass")) ];
    }
  }, "FFwd"), "\n          ", HTML.BUTTON({
    class: function() {
      return [ "play button ", Spacebars.mustache(view.lookup("playActiveClass")) ];
    }
  }, "Play"), HTML.Raw('\n          <button class="stop button">停止</button>\n          <button class="eject button">弹出</button>\n        ')), "\n      "), "\n      ", HTML.DIV({
    class: function() {
      return [ "tray ", Spacebars.mustache(view.lookup("trayOpenClass")) ];
    }
  }, HTML.Raw('\n        <div class="auto-stop">自动停止</div>\n      ')), "\n    "), "\n    ", HTML.DIV({
    class: function() {
      return [ "tape-design ", Spacebars.mustache(view.lookup("tapeDisplayedClass")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("music"), "displayedTape", "styleClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: "case"
  }, HTML.Raw('\n        <div class="outer"></div>\n        '), HTML.DIV({
    class: "lid"
  }, "\n          ", HTML.DIV({
    class: "closed"
  }, "\n            ", HTML.DIV({
    class: "inlay"
  }, "\n              ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("music"), "displayedTape"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "Music", "Inlay"));
    });
  }), "\n            "), "\n          "), "\n        "), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"counter":{"counter.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/player/counter/counter.coffee                                //
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
PAA.PixelPad.Apps.Music.Player.Counter = function () {
  class Counter extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Music.Player.Counter';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.onesDigit = new this.constructor.Digit();
      this.tensDigit = new this.constructor.Digit();
      this.hundredsDigit = new this.constructor.Digit();
      this.musicApp = this.ancestorComponentOfType(PAA.PixelPad.Apps.Music);
      this.tapeSides = new ComputedField(() => {
        var ref, ref1;
        return (ref = this.musicApp.system()) != null ? (ref1 = ref.tape()) != null ? ref1.getSidesWithTapeProgress() : void 0 : void 0;
      });
      this.sideIndex = new ComputedField(() => {
        return PAA.PixelPad.Systems.Music.state('sideIndex');
      });
      this.trackIndex = new ComputedField(() => {
        return PAA.PixelPad.Systems.Music.state('trackIndex');
      });
      this.trackInfo = new ComputedField(() => {
        var sideIndex, tapeSides, trackIndex;
        if (!(tapeSides = this.tapeSides())) {
          return;
        }
        sideIndex = this.sideIndex();
        trackIndex = this.trackIndex();
        if (!(sideIndex != null && trackIndex != null)) {
          return;
        }
        return tapeSides[sideIndex].tracks[trackIndex];
      });
      return this.autorun(computation => {
        var currentTime, hundreds, ones, onesAndTens, tapeProgress, tens, trackInfo;
        if (!(trackInfo = this.trackInfo())) {
          return;
        }
        currentTime = PAA.PixelPad.Systems.Music.currentTime();
        if (currentTime == null) {
          return;
        }
        tapeProgress = PAA.Music.Tape.durationToTapeProgress(trackInfo.startTime + currentTime);
        ones = tapeProgress % 10;
        tens = Math.floor(tapeProgress / 10 % 10);
        if (ones > 9) {
          tens += ones - 9;
        }
        onesAndTens = tapeProgress % 100;
        hundreds = Math.floor(tapeProgress / 100 % 10);
        if (onesAndTens > 99) {
          hundreds += onesAndTens - 99;
        }
        this.onesDigit.showNumber(ones);
        this.tensDigit.showNumber(tens);
        return this.hundredsDigit.showNumber(hundreds);
      });
    }
  }
  ;
  Counter.register(Counter.id());
  return Counter;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.counter.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/player/counter/template.counter.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Music.Player.Counter");
Template["PixelArtAcademy.PixelPad.Apps.Music.Player.Counter"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Music.Player.Counter", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-music-player-counter"
  }, "\n    ", HTML.DIV({
    class: "digits"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("hundredsDigit"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("tensDigit"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("onesDigit"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    "), HTML.Raw('\n    <div class="title">磁带计数器</div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"digit":{"digit.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/player/counter/digit/digit.coffee                            //
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
PAA.PixelPad.Apps.Music.Player.Counter.Digit = function () {
  class Digit extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.Music.Player.Counter.Digit';
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$numbers = this.$('.numbers');
      return this.showNumber(this._currentNumber || 0);
    }
    showNumber(number) {
      this._currentNumber = number;
      if (!this.$numbers) {
        return;
      }
      return this.$numbers.css({
        top: "".concat(-this.constructor.numberHeight * number, "rem")
      });
    }
  }
  ;
  Digit.register(Digit.id());
  Digit.numberHeight = 7;
  return Digit;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.digit.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-music/app/player/counter/digit/template.digit.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.Music.Player.Counter.Digit");
Template["PixelArtAcademy.PixelPad.Apps.Music.Player.Counter.Digit"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.Music.Player.Counter.Digit", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixelpad-apps-music-player-counter-digit">\n    <ol class="numbers">\n      <li>0</li>\n      <li>1</li>\n      <li>2</li>\n      <li>3</li>\n      <li>4</li>\n      <li>5</li>\n      <li>6</li>\n      <li>7</li>\n      <li>8</li>\n      <li>9</li>\n      <li>0</li>\n    </ol>\n  </div>');
}));

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

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/system/music.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/system/template.music.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/music.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/template.music.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/drawer/drawer.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/drawer/template.drawer.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/player/player.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/player/template.player.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/player/counter/counter.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/player/counter/template.counter.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/player/counter/digit/digit.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-music/app/player/counter/digit/template.digit.js");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad-music", {
  PixelArtAcademy: PixelArtAcademy
});

})();
