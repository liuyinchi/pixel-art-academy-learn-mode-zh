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
var PixelArtAcademy = Package['retronator:pixelartacademy-pixelpad'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad-notifications":{"notifications.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-notifications/notifications.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Systems.Notifications = function () {
  class Notifications extends PAA.PixelPad.System {
    static id() {
      return 'PixelArtAcademy.PixelPad.Systems.Notifications';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "通知";
    }
    static description() {
      return "一个不打扰人的通知系统。";
    }
    onCreated() {
      var providerClass;
      super.onCreated(...arguments);
      this.app = this.ancestorComponentOfType(Artificial.Base.App);
      this.app.addComponent(this);
      this.providers = function () {
        var i, len, ref, results;
        ref = PAA.PixelPad.Systems.Notifications.Provider.getClasses();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          providerClass = ref[i];
          results.push(new providerClass(this));
        }
        return results;
      }.call(this);
      this._notifications = {};
      this.availableNotifications = new ComputedField(() => {
        var availableNotifications, i, j, len, len1, notification, notificationClass, notificationId, provider, ref, ref1;
        availableNotifications = [];
        ref = this.providers;
        for (i = 0, len = ref.length; i < len; i++) {
          provider = ref[i];
          ref1 = provider.availableNotificationIds();
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            notificationId = ref1[j];
            if (!this._notifications[notificationId]) {
              notificationClass = PAA.PixelPad.Systems.Notifications.Notification.getClassForId(notificationId);
              this._notifications[notificationId] = new notificationClass();
            }
            notification = this._notifications[notificationId];
            if (indexOf.call(availableNotifications, notification) < 0) {
              availableNotifications.push(notification);
            }
          }
        }
        return availableNotifications;
      });
      this.unreadNotifications = new ReactiveField([]);
      this.displayedNotification = new ReactiveField(null);
      this.readNotifications = new ReactiveField([]);
      this.displayAlwaysNotifications = new ComputedField(() => {
        return _.filter(this.unreadNotifications(), notification => {
          return notification.displayStyle() === this.constructor.Notification.DisplayStyles.Always;
        });
      });
      this.retroClasses = new ReactiveField({
        head: null,
        face: null,
        body: null
      });
      this.retroEyesDirection = new ReactiveField('bottom-left');
      this.homeScreenActive = new ComputedField(() => {
        return !this.os.currentAppUrl() && !LOI.adventure.modalDialogs().length;
      });

      // Whenever available notifications change, add the new ones to unread.
      this.autorun(computation => {
        var availableNotifications;
        if (!this.homeScreenActive()) {
          return;
        }
        availableNotifications = this.availableNotifications();
        return Tracker.nonreactive(() => {
          var className, existingNotifications, existingRetroClasses, i, j, len, len1, notification, property, ref, retroClasses, sortedUnreadNotifications, unreadNotifications;
          unreadNotifications = this.unreadNotifications();
          existingNotifications = [...unreadNotifications, this.displayedNotification(), ...this.readNotifications()];
          for (i = 0, len = availableNotifications.length; i < len; i++) {
            notification = availableNotifications[i];
            if (indexOf.call(existingNotifications, notification) < 0) {
              unreadNotifications.push(notification);
            }
          }
          this.unreadNotifications(unreadNotifications);

          // Set initial retro classes from unread notifications.
          sortedUnreadNotifications = _.sortBy(unreadNotifications, notification => {
            return notification.priority();
          });
          existingRetroClasses = this.retroClasses();
          retroClasses = {};
          for (j = 0, len1 = sortedUnreadNotifications.length; j < len1; j++) {
            notification = sortedUnreadNotifications[j];
            ref = notification.retroClasses();
            for (property in ref) {
              className = ref[property];
              if (className) {
                retroClasses[property] = className;
              }
            }
          }
          for (property in existingRetroClasses) {
            className = existingRetroClasses[property];
            if (retroClasses[property] == null) {
              retroClasses[property] = className;
            }
          }
          if (!EJSON.equals(existingRetroClasses, retroClasses)) {
            return this.retroClasses(retroClasses);
          }
        });
      });

      // Listen for the home app to be displayed and display a notification.
      return this.autorun(computation => {
        if (!this.homeScreenActive()) {
          // Close existing notifications.
          Tracker.nonreactive(() => {
            return this.closeDisplayedNotification();
          });
          return;
        }
        return Meteor.setTimeout(async () => {
          var toDo;
          toDo = this.os.getSystem(PAA.PixelPad.Systems.ToDo);
          if (toDo.isActive()) {
            // To-do is active, wait until it's inactive and display any unread notifications that should always show.
            await toDo.waitUntilInactive();

            // Give a moment before the notification displays.
            await _.waitForSeconds(0.5);

            // Make sure we should still show the notification after waiting.
            if (!this._shouldDisplayNotification()) {
              return;
            }
            return this._displayUnreadNotificationWithDisplayStyle(this.constructor.Notification.DisplayStyles.Always);
          } else {
            // Give a moment before the notification displays.
            await _.waitForSeconds(1);

            // Make sure we should still show the notification after waiting.
            if (!this._shouldDisplayNotification()) {
              return;
            }

            // To-do didn't have the show, give idle unread notification a chance if there is no always ones.
            if (this._displayUnreadNotificationWithDisplayStyle(this.constructor.Notification.DisplayStyles.Always)) {
              return;
            }
            return this._displayUnreadNotificationWithDisplayStyle(this.constructor.Notification.DisplayStyles.IfIdle);
          }
        }, 500);
      });
    }
    _shouldDisplayNotification() {
      // Make sure we're still on the home screen.
      if (!this.homeScreenActive()) {
        return;
      }

      // Make sure a notification wasn't shown manually.
      if (this.displayedNotification()) {
        return;
      }
      return true;
    }
    onRendered() {
      var $faceOrigin;
      super.onRendered(...arguments);

      // Close the message when clicking.
      $(document).on('click.pixelartacademy-pixelpad-systems-notifications', event => {
        if ($(event.target).closest('.retro').length) {
          return;
        }

        // Prevent immediate closing.
        if (Date.now() - this._displayTimeMilliseconds < 1000) {
          return;
        }

        // Note: even though @closeDisplayedNotification checks for the notification to be displayed,
        // we need to check here as well so that we don't immediately display the next message.
        if (!this.displayedNotification()) {
          return;
        }
        this.closeDisplayedNotification();

        // Continue displaying any notifications that need to be shown immediately.
        return this._displayUnreadNotificationWithDisplayStyle(this.constructor.Notification.DisplayStyles.Always);
      });

      // Track eyes when active.
      $faceOrigin = this.$('.face-origin');
      return this.autorun(computation => {
        if (this.homeScreenActive()) {
          return $(document).on('pointermove.pixelartacademy-pixelpad-systems-notifications', event => {
            var faceOffset, horizontalClass, verticalClass;
            faceOffset = $faceOrigin.offset();
            verticalClass = event.pageY > faceOffset.top ? 'bottom' : 'top';
            horizontalClass = event.pageX > faceOffset.left ? 'right' : 'left';
            return this.retroEyesDirection("".concat(verticalClass, "-").concat(horizontalClass));
          });
        } else {
          return $(document).off('pointermove.pixelartacademy-pixelpad-systems-notifications');
        }
      });
    }
    onDestroyed() {
      var notification, notificationId, ref;
      super.onDestroyed(...arguments);
      ref = this._notifications;
      for (notificationId in ref) {
        notification = ref[notificationId];
        notification.destroy();
      }
      this.app.removeComponent(this);
      return $(document).off('.pixelartacademy-pixelpad-systems-notifications');
    }
    dontRender() {
      return true;
    }
    _displayUnreadNotificationWithDisplayStyle(displayStyle) {
      var sortedNotifications, topNotification, unreadNotifications, validNotifications;
      unreadNotifications = this.unreadNotifications();
      validNotifications = _.filter(unreadNotifications, notification => {
        return notification.displayStyle() === displayStyle;
      });
      // Choose the notification with top priority.
      sortedNotifications = _.sortBy(validNotifications, notification => {
        return notification.priority();
      });
      topNotification = _.last(sortedNotifications);
      if (!topNotification) {
        return false;
      }
      _.pull(unreadNotifications, topNotification);
      this.unreadNotifications(unreadNotifications);
      this._displayNotification(topNotification);
      return true;
    }
    _displayNotification(notification) {
      var className, newRetroClasses, property, retroClasses;
      this.displayedNotification(notification);
      this._displayTimeMilliseconds = Date.now();

      // Set new retro.
      retroClasses = this.retroClasses();
      newRetroClasses = notification.retroClasses();
      for (property in newRetroClasses) {
        className = newRetroClasses[property];
        if (className) {
          retroClasses[property] = className;
        }
      }
      if (!EJSON.equals(retroClasses, newRetroClasses)) {
        return this.retroClasses(retroClasses);
      }
    }
    async displayNewNotification() {
      var notificationWasDisplayed, oldestNotification, readNotifications, sortedNotifications, toDo;
      toDo = this.os.getSystem(PAA.PixelPad.Systems.ToDo);
      if (toDo.animating()) {
        return;
      }
      notificationWasDisplayed = this.displayedNotification();

      // Close existing notifications.
      this.closeDisplayedNotification();

      // Close to-do if active.
      if (toDo.isActive()) {
        toDo.close();
        await toDo.waitUntilInactive();
      }

      // Try to display any unread notifications, from most to least important.
      if (this._displayUnreadNotificationWithDisplayStyle(this.constructor.Notification.DisplayStyles.Always)) {
        return;
      }
      if (this._displayUnreadNotificationWithDisplayStyle(this.constructor.Notification.DisplayStyles.IfIdle)) {
        return;
      }
      if (this._displayUnreadNotificationWithDisplayStyle(this.constructor.Notification.DisplayStyles.OnDemand)) {
        return;
      }

      // No unread notifications were found, cycle through read ones.
      readNotifications = this.readNotifications();

      // If we only have read notifications and one was already displayed, don't reopen it again.
      if (notificationWasDisplayed && readNotifications.length === 1) {
        return;
      }
      sortedNotifications = _.sortBy(readNotifications, notification => {
        return notification.lastDisplayedTime();
      });
      oldestNotification = _.first(sortedNotifications);
      _.pull(readNotifications, oldestNotification);
      this.readNotifications(readNotifications);
      this._displayNotification(oldestNotification);
      return true;
    }
    closeDisplayedNotification() {
      var displayedNotification, readNotifications;
      if (!(displayedNotification = this.displayedNotification())) {
        return;
      }
      readNotifications = this.readNotifications();
      displayedNotification.updateLastDisplayedTime();
      this.displayedNotification(null);
      return readNotifications.push(displayedNotification);
    }
    retroMainClass() {
      if (this._tasksDisplayed()) {
        // Main class changes to lifted when a task's details are displayed.
        return 'lifted';
      }
    }
    retroCanTalkClass() {
      var toDo;
      toDo = this.os.getSystem(PAA.PixelPad.Systems.ToDo);
      if (!toDo.isRendered()) {
        return;
      }
      if (!toDo.animating()) {
        return 'can-talk';
      }
    }
    retroHeadClass() {
      var requestedHeadClass;
      if (requestedHeadClass = this._getRetroClass('head')) {
        return requestedHeadClass;
      }
      if (PAA.PixelPad.Systems.Music.state('playing')) {
        // If the music is playing, put on headphones.
        return 'headphones';
      }
    }
    retroFaceClass() {
      var importantNotifications, requestedFaceClass;
      if (requestedFaceClass = this._getRetroClass('face')) {
        // The face is as desired when a notification is displayed, or a smirk when not.
        return requestedFaceClass;
      }
      if (this.displayedNotification()) {
        return 'smirk';
      }
      // By default the face is peaceful if there are no unread notifications, smirk otherwise.
      importantNotifications = _.filter(this.unreadNotifications(), notification => {
        return notification.displayStyle() !== this.constructor.Notification.DisplayStyles.OnDemand;
      });
      if (importantNotifications.length) {
        return 'smirk';
      } else {
        return 'peaceful';
      }
    }
    retroEyesDirectionClass() {
      if (this.displayedNotification()) {
        // The eyes should be looking at the speech-balloon when a notification is displayed.
        return 'top-left';
      }
      return this.retroEyesDirection();
    }
    retroBodyClass() {
      return this._getRetroClass('body');
    }
    _getRetroClass(property) {
      var ref, ref1;
      return (ref = (ref1 = this.displayedNotification()) != null ? ref1.retroClassesDisplayed()[property] : void 0) != null ? ref : this.retroClasses()[property];
    }
    retroLegsClass() {
      if (this._tasksDisplayed()) {
        // Legs change to lifted when a task's details are displayed.
        return 'lifted';
      }
    }
    _tasksDisplayed() {
      var toDo;
      toDo = this.os.getSystem(PAA.PixelPad.Systems.ToDo);
      return toDo.isActive() && toDo.selectedTask();
    }
    speechBalloonOptions() {
      return {
        text: () => {
          var ref;
          return (ref = this.displayedNotification()) != null ? ref.message() : void 0;
        }
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .retro': this.onClickRetro
      });
    }
    onClickRetro(event) {
      return this.displayNewNotification();
    }
  }
  ;
  Notifications.register(Notifications.id());
  Notifications.initialize();
  Notifications.Retro = {
    HeadClasses: {
      Headphones: 'headphones',
      HardHat: 'hardhat',
      HardHatPuffed: 'hardhat-puffed'
    },
    FaceClasses: {
      Peaceful: 'peaceful',
      Smirk: 'smirk',
      Yikes: 'yikes'
    },
    BodyClasses: {
      Wrench: 'wrench',
      Walkman: 'walkman'
    }
  };
  return Notifications;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.notifications.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-notifications/template.notifications.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Systems.Notifications");
Template["PixelArtAcademy.PixelPad.Systems.Notifications"] = new Template("Template.PixelArtAcademy.PixelPad.Systems.Notifications", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-systems-notifications"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "retro ", Spacebars.mustache(view.lookup("retroMainClass")), " ", Spacebars.mustache(view.lookup("retroCanTalkClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: function() {
      return [ "head ", Spacebars.mustache(view.lookup("retroHeadClass")) ];
    }
  }, "\n        ", HTML.DIV({
    class: "face-origin"
  }, "\n          ", HTML.DIV({
    class: function() {
      return [ "face ", Spacebars.mustache(view.lookup("retroFaceClass")), " ", Spacebars.mustache(view.lookup("retroEyesDirectionClass")) ];
    }
  }), "\n        "), "\n      "), "\n      ", HTML.DIV({
    class: function() {
      return [ "body ", Spacebars.mustache(view.lookup("retroBodyClass")) ];
    }
  }), "\n      ", HTML.DIV({
    class: function() {
      return [ "legs ", Spacebars.mustache(view.lookup("retroLegsClass")) ];
    }
  }), "\n    "), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), view.lookup("speechBalloonOptions"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Components", "SpeechBalloon"));
    });
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"notification.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-notifications/notification.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.PixelPad.Systems.Notifications.Notification = function () {
  class Notification {
    static id() {
      throw new AE.NotImplementedException("You must specify notification's id.");
    }
    static getClassForId(id) {
      return this._notificationClassesById[id];
    }
    static message() {
      return null;
    }
    static retroClasses() {
      return {
        // Override to request different retro classes.
        head: null,
        face: null,
        body: null
      };
    }
    static retroClassesDisplayed() {
      return {
        // Override to request different retro classes when the notification is displayed.
        head: null,
        face: null,
        body: null
      };
    }
    static priority() {
      return 0;
    }
    static displayStyle() {
      // Override if you want the notification to display proactively.
      return this.DisplayStyles.OnDemand;
    }
    static initialize() {
      // Store notification class by ID.
      this._notificationClassesById[this.id()] = this;

      // On the server, after document observers are started, perform initialization.
      if (Meteor.isServer) {
        return Document.startup(() => {
          var i, len, property, ref, results, translationNamespace, value;
          if (Meteor.settings.startEmpty) {
            return;
          }
          // Create this notification's translated names.
          translationNamespace = this.id();
          ref = ['message'];
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
    constructor() {
      var translationNamespace;
      translationNamespace = this.id();
      this._translationSubscription = AB.subscribeNamespace(translationNamespace);
      this.lastDisplayedTime = new ReactiveField(null);
    }
    destroy() {
      return this._translationSubscription.stop();
    }
    id() {
      return this.constructor.id();
    }
    message() {
      return AB.translate(this._translationSubscription, 'message').text;
    }
    messageTranslation() {
      return AB.translation(this._translationSubscription, 'message');
    }
    retroClasses() {
      return this.constructor.retroClasses();
    }
    retroClassesDisplayed() {
      return this.constructor.retroClassesDisplayed();
    }
    priority() {
      return this.constructor.priority();
    }
    displayStyle() {
      return this.constructor.displayStyle();
    }
    updateLastDisplayedTime() {
      return this.lastDisplayedTime(new Date());
    }
  }
  ;
  Notification.DisplayStyles = {
    OnDemand: 'OnDemand',
    IfIdle: 'IfIdle',
    Always: 'Always'
  };
  Notification._notificationClassesById = {};
  return Notification;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"provider.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-notifications/provider.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.PixelPad.Systems.Notifications.Provider = function () {
  class Provider {
    static getClasses() {
      return _.values(this._providerClassesById);
    }
    static id() {
      throw new AE.NotImplementedException("You must specify provider's id.");
    }
    static initialize() {
      // Store provider class by ID.
      return this._providerClassesById[this.id()] = this;
    }
    availableNotificationIds() {
      return [];
    }
  }
  ;
  Provider._providerClassesById = {};
  return Provider;
}.call(this);

// Override to provide currently relevant notifications.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-notifications/notifications.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-notifications/template.notifications.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-notifications/notification.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-notifications/provider.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad-notifications", {
  PixelArtAcademy: PixelArtAcademy
});

})();
