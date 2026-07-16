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
var Illustrapedia = Package['retronator:illustrapedia'].Illustrapedia;
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
var __coffeescriptShare, tileY;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad-studyplan":{"studyplan.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/studyplan.coffee                                             //
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
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Apps.StudyPlan = function () {
  class StudyPlan extends PAA.PixelPad.App {
    // goals: object of goals placed in the study plan
    //   {id}:
    //     markedComplete: boolean whether the player considers this goal complete
    //     connections: array of connections to required interests of other goals
    //       goalId: target goal of this connection
    //       direction: in which direction from this goal the connection is going
    //       sidewaysIndex: if the connection goes sideways, from which exit does it go
    //       interest: which of the required interests this connection ties into
    // revealed: object for storing which parts of the map have been revealed yet
    //   taskIds: an array of task IDs for which the player has seen their reveal animation
    //   goalIds: an array of goal IDs for which the player has seen their reveal animation
    // camera:
    //   origin: the position the center of the canvas displays
    //     x
    //     y
    //   scale: how big to display the elements on the canvas
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan';
    }
    static url() {
      return 'studyplan';
    }
    static version() {
      return '0.0.1';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "学习计划";
    }
    static description() {
      return "一个用于设计学习课程的应用。";
    }
    static hasGoal(goalOrGoalId) {
      var goalId, ref;
      goalId = _.thingId(goalOrGoalId);
      // Note: We return a boolean so we can use this from functions where undefined means 'not ready'.
      return ((ref = this.state('goals')) != null ? ref[goalId] : void 0) != null;
    }
    static hasActiveGoal(goalOrGoalId) {
      var goal, goalId, ref;
      goalId = _.thingId(goalOrGoalId);
      if (!(goal = (ref = this.state('goals')) != null ? ref[goalId] : void 0)) {
        return false;
      }
      return !goal.markedComplete;
    }
    static isGoalMarkedComplete(goalOrGoalId) {
      var goal, goalId, ref;
      goalId = _.thingId(goalOrGoalId);
      if (!(goal = (ref = this.state('goals')) != null ? ref[goalId] : void 0)) {
        return false;
      }
      return goal.markedComplete;
    }
    static isTaskRevealed(taskId) {
      var revealed;
      if (!(revealed = this.state('revealed'))) {
        return;
      }
      if (!revealed.taskIds) {
        return;
      }
      return indexOf.call(revealed.taskIds, taskId) >= 0;
    }
    static isGoalRevealed(goalId) {
      var revealed;
      if (!(revealed = this.state('revealed'))) {
        return;
      }
      if (!revealed.goalIds) {
        return;
      }
      return indexOf.call(revealed.goalIds, goalId) >= 0;
    }
    static getGoalType(goalOrGoalId) {
      var currentInterests, goal, goalId, i, len, ref, requiredInterests, task;
      goalId = _.thingId(goalOrGoalId);
      goal = PAA.Learning.Goal.getAdventureInstanceForId(goalId);
      currentInterests = LOI.adventure.currentInterests();
      ref = goal.initialTasks();

      // Short term goals must have an initial task that has all required interests.
      for (i = 0, len = ref.length; i < len; i++) {
        task = ref[i];
        requiredInterests = task.requiredInterests();
        if (_.intersection(requiredInterests, currentInterests).length === requiredInterests.length) {
          return this.GoalTypes.ShortTerm;
        }
      }
      return this.GoalTypes.MidTerm;
    }
    static canRemoveGoal(goalOrGoalId) {
      var goal, goalId, ref, ref1;
      goalId = _.thingId(goalOrGoalId);
      if (!(goal = (ref = this.state('goals')) != null ? ref[goalId] : void 0)) {
        return false;
      }
      return !((ref1 = goal.connections) != null ? ref1.length : void 0) > 0;
    }
    static reset() {
      return this.state.set({});
    }
    static used() {
      // When we've used the Study Plan, some tasks will be revealed.
      return this.state('revealed') != null;
    }
    static getApp() {
      var currentApp, pixelPad;
      if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
        return;
      }
      if (!(currentApp = pixelPad.os.currentApp())) {
        return;
      }
      if (!(currentApp instanceof PAA.PixelPad.Apps.StudyPlan)) {
        return;
      }
      return currentApp;
    }
    constructor() {
      super(...arguments);
      this.blueprint = new ReactiveField(null);
      this.addGoalComponent = new ReactiveField(null);
      this.goalSearch = new ReactiveField(null);
      this.activeGoals = new ReactiveField(null);
      this.interests = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.addGoalOptions = new ReactiveField(null);
      this.selectedGoalId = new ReactiveField(null);
      this.selectedTaskId = new ReactiveField(null);
      this.highlightedTaskId = new ReactiveField(null);

      // Instantiate all goals.
      this._goals = [];
      this.goals = new AE.LiveComputedField(() => {
        var goal, goalClass, i, len, ref;
        ref = this._goals;
        for (i = 0, len = ref.length; i < len; i++) {
          goal = ref[i];
          goal.destroy();
        }
        this._goals = function () {
          var j, len1, ref1, results;
          ref1 = PAA.Learning.Goal.getClasses();
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            goalClass = ref1[j];
            results.push(new goalClass());
          }
          return results;
        }();
        return this._goals;
      });
      this._goalNodeTemplates = {};
      this.blueprint(new this.constructor.Blueprint(this));
      this.addGoalComponent(new this.constructor.AddGoal(this));
      this.goalSearch(new this.constructor.GoalSearch(this));
      this.activeGoals(new this.constructor.ActiveGoals(this));
      this.interests(new this.constructor.Interests(this));
      // We set size in an autorun so that it adapts to window resizes.
      this.autorun(computation => {
        return this.setMaximumPixelPadSize({
          fullscreen: true
        });
      });
      // Maximize on run.
      return this.maximize();
    }
    onDestroyed() {
      var goal, goalId, goalNode, i, len, ref, ref1, results;
      super.onDestroyed(...arguments);
      ref = this._goals;
      for (i = 0, len = ref.length; i < len; i++) {
        goal = ref[i];
        goal.destroy();
      }
      ref1 = this._goalNodeTemplates;
      results = [];
      for (goalId in ref1) {
        goalNode = ref1[goalId];
        results.push(goalNode.destroy());
      }
      return results;
    }
    onBackButton() {
      if (!this.modalWindowDisplayed()) {
        return;
      }
      this.closeModalWindow();

      // Inform that we've handled the back button.
      return true;
    }
    createGoalNode(goalId, goalHierarchy) {
      if (!PAA.Learning.Goal.getClassForId(goalId)) {
        console.warn("Unrecognized goal requested.", goalId);
        return null;
      }
      if (!this._goalNodeTemplates[goalId]) {
        this._goalNodeTemplates[goalId] = new this.constructor.GoalNode();
        this._goalNodeTemplates[goalId].initialize(goalId);
      }
      return this._goalNodeTemplates[goalId].cloneTemplate(goalHierarchy);
    }
    hasGoal(goalId) {
      return this.constructor.hasGoal(goalId);
    }
    displayAddGoal(options) {
      this.addGoalOptions(options);
      return this.activeGoals().close();
    }
    closeAddGoal() {
      return this.addGoalOptions(null);
    }
    selectGoal(goalId) {
      this.selectedGoalId(goalId);

      // After the map bounds have recomputed, focus on the goal.
      return Tracker.afterFlush(() => {
        return this.blueprint().focusGoal(goalId);
      });
    }
    deselectGoal() {
      return this.selectedGoalId(null);
    }
    selectTask(taskId) {
      this.selectedTaskId(taskId);
      return this.blueprint().focusTask(taskId);
    }
    deselectTask() {
      return this.selectedTaskId(null);
    }
    highlightTask(taskId) {
      return this.highlightedTaskId(taskId);
    }
    stopHighlightingTask() {
      return this.highlightedTaskId(null);
    }
    addGoal(options) {
      var base, connection, goal, goalId, goals;
      _.defaults(options, this.addGoalOptions());
      goals = this.state('goals') || {};
      goalId = options.goal.id();
      // We can't add the goal that's already in the plan. Focus it in the blueprint instead.
      if (goals[goalId]) {
        this.blueprint().focusGoal(goalId);
        return;
      }
      // Add the new goal.
      goals[goalId] = {};
      goal = PAA.Learning.Goal.getClassForId(goalId);
      if (goal.allCompleted()) {
        goals[goalId].markedComplete = true;
      }
      if (options.sourceGoalId) {
        // Add connection from the source goal.
        connection = {
          goalId: goalId,
          direction: options.direction
        };
        if (options.sidewaysIndex != null) {
          connection.sidewaysIndex = options.sidewaysIndex;
        }
        if ((base = goals[options.sourceGoalId]).connections == null) {
          base.connections = [];
        }
        goals[options.sourceGoalId].connections.push(connection);
      }
      // Store and close the dialog.
      this.state('goals', goals);
      return this.closeAddGoal();
    }
    removeGoal(goalId) {
      var connectingGoal, connectingGoalId, goals;
      goals = this.state('goals') || {};
      delete goals[goalId];
      for (connectingGoalId in goals) {
        connectingGoal = goals[connectingGoalId];
        if (connectingGoal.connections) {
          _.remove(connectingGoal.connections, connection => {
            return connection.goalId === goalId;
          });
        }
      }
      return this.state('goals', goals);
    }
    modalWindowDisplayed() {
      return this.selectedTaskId() || this.selectedGoalId() || this.addGoalDisplayed();
    }
    displayModalWindowCover() {
      return this.addGoalDisplayed();
    }
    closeModalWindow() {
      if (this.selectedGoalId()) {
        this.deselectGoal();
      }
      if (this.selectedTaskId()) {
        this.deselectTask();
      }
      if (this.addGoalDisplayed()) {
        return this.closeAddGoal();
      }
    }
    addGoalDisplayed() {
      return this.addGoalOptions();
    }
    displayActiveGoals() {
      // Show active goals once the player can mark the Pixel Art Software goal complete.
      return PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.completed();
    }
    displayInterests() {
      // Show interests once the player has more than two.
      return LOI.adventure.currentInterests().length > 2;
    }
    events() {
      return super.events(...arguments).concat({
        'click .modal-window-cover': this.onClickModalWindowCover
      });
    }
    onClickModalWindowCover(event) {
      return this.closeModalWindow();
    }
  }
  ;
  StudyPlan.register(StudyPlan.id());
  StudyPlan.initialize();
  StudyPlan.GoalConnectionDirections = {
    Forward: 'Forward',
    Sideways: 'Sideways'
  };
  StudyPlan.GoalTypes = {
    ShortTerm: 'ShortTerm',
    MidTerm: 'MidTerm',
    LongTerm: 'LongTerm'
  };
  return StudyPlan;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.studyplan.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/template.studyplan.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan", (function() {
  var view = this;
  return [ HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-studyplan app"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("blueprint"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayModalWindowCover"));
  }, function() {
    return HTML.Raw('\n      <div class="modal-window-cover"></div>\n    ');
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "StudyPlan", "TaskInfo"));
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "StudyPlan", "GoalInfo"));
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("addGoalDisplayed"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("addGoalComponent"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayActiveGoals"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("activeGoals"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayInterests"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("interests"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n    " ];
  }), "\n  "), "\n\n  ", HTML.STYLE("\n    html.adventure .build-version {\n      opacity: 0 !important;\n      pointer-events: none;\n    }\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"connectionpoint.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/connectionpoint.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  IL,
  LOI,
  PAA,
  StudyPlan,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.ConnectionPoint = class ConnectionPoint {
  static createLocal(goalNode) {
    let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let name = arguments.length > 3 ? arguments[3] : undefined;
    var connectionPoint;
    connectionPoint = new this(name);
    connectionPoint.goalNode = goalNode;
    connectionPoint.localPosition.set(x, y);
    return connectionPoint;
  }
  static createGlobal(x, y, name) {
    var connectionPoint;
    connectionPoint = new this(name);
    connectionPoint.localPosition.set(x, y);
    connectionPoint.globalPosition.set(x, y);
    return connectionPoint;
  }
  constructor(name1) {
    this.name = name1;
    this.localPosition = new THREE.Vector2();
    this.globalPosition = new THREE.Vector2();
    this.requiredInterests = [];
    this.providedInterests = [];
    this.outgoingPathways = [];
    this.incomingPathways = [];
    this.potentialOutgoingPathways = [];
    this.potentialIncomingPathways = [];
  }
  clone() {
    var connectionPoint;
    connectionPoint = new this.constructor(this.name);
    connectionPoint.localPosition.copy(this.localPosition);
    connectionPoint.requiredInterests.push(...this.requiredInterests);
    connectionPoint.providedInterests.push(...this.providedInterests);
    return connectionPoint;
  }
  calculateGlobalPosition(origin) {
    return this.globalPosition.copy(this.localPosition).add(origin);
  }
  propagateInterests() {
    var i, interest, j, k, l, len, len1, len2, len3, len4, len5, m, n, pathway, ref, ref1, ref2, ref3, ref4, ref5, ref6, results;
    this.propagatedProvidedInterests = [];
    this.propagatedAvailableInterests = [];
    ref = this.incomingPathways;

    // To propagate interests we add all propagated interests from incoming pathways and add our own provided interests.
    for (i = 0, len = ref.length; i < len; i++) {
      pathway = ref[i];
      if (!pathway.startPoint.propagatedProvidedInterests) {
        pathway.startPoint.propagateInterests();
      }
      ref1 = pathway.startPoint.propagatedProvidedInterests;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        interest = ref1[j];
        if (indexOf.call(this.propagatedProvidedInterests, interest) < 0) {
          this.propagatedProvidedInterests.push(interest);
        }
      }
      ref2 = pathway.startPoint.propagatedAvailableInterests;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        interest = ref2[k];
        if (indexOf.call(this.propagatedAvailableInterests, interest) < 0) {
          this.propagatedAvailableInterests.push(interest);
        }
      }
    }
    ref3 = this.providedInterests;
    for (l = 0, len3 = ref3.length; l < len3; l++) {
      interest = ref3[l];
      if (indexOf.call(this.propagatedProvidedInterests, interest) < 0) {
        this.propagatedProvidedInterests.push(interest);
      }
    }
    if ((ref4 = this.task) != null ? ref4.completed() : void 0) {
      ref5 = this.providedInterests;
      for (m = 0, len4 = ref5.length; m < len4; m++) {
        interest = ref5[m];
        if (indexOf.call(this.propagatedAvailableInterests, interest) < 0) {
          this.propagatedAvailableInterests.push(interest);
        }
      }
    }
    ref6 = this.outgoingPathways;

    // Propagate forward to all outgoing pathways.
    results = [];
    for (n = 0, len5 = ref6.length; n < len5; n++) {
      pathway = ref6[n];
      results.push(pathway.endPoint.propagateInterests());
    }
    return results;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goalhierarchy.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/goalhierarchy.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
AP = Artificial.Program;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.GoalHierarchy = function () {
  class GoalHierarchy {
    constructor(blueprint, goalsData) {
      var addGlobalPathway, connect, goalData, goalId, goalsDataById, goalsDataList, i, len, ref, rootGoalData, rootGoalsData, taskId, taskPoint;
      this.blueprint = blueprint;
      this.goalNodesById = {};
      this.taskPointsById = {};
      goalsDataById = {};
      goalsDataList = [];
      for (goalId in goalsData) {
        goalData = goalsData[goalId];
        if (!PAA.Learning.Goal.getClassForId(goalId)) {
          console.warn("Unrecognized goal present in the hierarchy.", goalId);
          continue;
        }
        this.goalNodesById[goalId] = this.blueprint.studyPlan.createGoalNode(goalId, this);
        ref = this.goalNodesById[goalId].taskPointsById;
        for (taskId in ref) {
          taskPoint = ref[taskId];
          this.taskPointsById[taskId] = taskPoint;
        }
        goalData = _.extend({}, goalData, {
          id: goalId
        });
        goalsDataList.push(goalData);
        goalsDataById[goalId] = goalData;
      }

      // Roots are the goals that no-one is connected to.
      rootGoalsData = _.filter(goalsDataList, goalData => {
        var incomingConnection;
        incomingConnection = _.find(goalsDataList, otherGoalData => {
          return _.find(otherGoalData.connections, connection => {
            return connection.goalId === goalData.id;
          });
        });
        return !incomingConnection;
      });

      // Recursively connect goal nodes.
      connect = goalData => {
        var connectingGoalNodes, connection, goalClass, goalNode, i, len, otherGoalData, otherGoalNode, ref1, results;
        if (!goalData.connections) {
          return;
        }
        goalNode = this.goalNodesById[goalData.id];
        ref1 = goalData.connections;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          connection = ref1[i];
          if (!(otherGoalData = goalsDataById[connection.goalId])) {
            continue;
          }
          otherGoalNode = this.goalNodesById[otherGoalData.id];
          if (otherGoalNode.parent) {
            continue;
          }
          otherGoalNode.parent = goalNode;
          goalClass = PAA.Learning.Goal.getClassForId(goalData.id);
          if (connection.direction) {
            switch (connection.direction) {
              case StudyPlan.GoalConnectionDirections.Forward:
                connectingGoalNodes = goalNode.forwardGoalNodes;
                break;
              case StudyPlan.GoalConnectionDirections.Sideways:
                connectingGoalNodes = goalNode.sidewaysGoalNodes;
            }
          } else {
            if (goalClass.isInterestProvidedFromIndividuallyCompletedFinalTask(connection.interest)) {
              connectingGoalNodes = goalNode.forwardGoalNodes;
            } else {
              connectingGoalNodes = goalNode.sidewaysGoalNodes;
            }
          }
          connectingGoalNodes.push(otherGoalNode);
          results.push(connect(otherGoalData));
        }
        return results;
      };
      for (i = 0, len = rootGoalsData.length; i < len; i++) {
        rootGoalData = rootGoalsData[i];
        connect(rootGoalData);
      }
      this.rootGoalNodes = function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = rootGoalsData.length; j < len1; j++) {
          rootGoalData = rootGoalsData[j];
          results.push(this.goalNodesById[rootGoalData.id]);
        }
        return results;
      }.call(this);

      // Create global pathways.
      this.roadTileMap = new ReactiveField(null);
      this._globalPathways = [];
      addGlobalPathway = pathway => {
        return this._globalPathways.push(pathway);
      };
      this._recalculateAutorun = Tracker.autorun(computation => {
        var addPath, availableGoalIds, connectConnectionPoints, connection, connectionOptions, createGoalConnectionPoints, distributePossibleGoals, endGoal, endPoint, entryX, entryY, exitX, exitY, expansionPosition, expansionRoadPoint, goal, goalIslandXPosition, goalNode, i1, index, interest, interestProviders, j, k, l, lastSidewaysGoalNode, len1, len10, len11, len12, len13, len14, len15, len16, len2, len3, len4, len5, len6, len7, len8, len9, m, mergeHorizontalConnectionPoints, mergeVerticalConnectionPoints, n, o, p, path, paths, pathway, possibleGoals, q, r, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, requiredInterests, roadTileMap, rootGoalNode, s, sidewaysExpansionPossible, sidewaysPoint, startGoal, startPoint, t, task, u, unprovidedInterests, v, w, z;
        goalIslandXPosition = 0;
        ref1 = this.rootGoalNodes;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          rootGoalNode = ref1[j];
          rootGoalNode.calculateLocalPositions();
          rootGoalNode.globalPosition(new THREE.Vector2(goalIslandXPosition, 0));
          rootGoalNode.calculateGlobalPositions();
          goalIslandXPosition += rootGoalNode.width + this.constructor.goalIslandSpacing;
        }
        roadTileMap = new StudyPlan.TileMap();
        mergeHorizontalConnectionPoints = function (connectionPoints) {
          let topAligned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var connectionPoint, k, len2, point, results, y, yS;
          connectionPoints.sort((a, b) => {
            return a.globalPosition.x - b.globalPosition.x;
          });
          yS = function () {
            var k, len2, results;
            results = [];
            for (k = 0, len2 = connectionPoints.length; k < len2; k++) {
              point = connectionPoints[k];
              results.push(point.globalPosition.y);
            }
            return results;
          }();
          y = topAligned ? _.min(yS) : _.max(yS);
          results = [];
          for (k = 0, len2 = connectionPoints.length; k < len2; k++) {
            connectionPoint = connectionPoints[k];
            results.push(connectionPoint.globalPosition.y = y);
          }
          return results;
        };
        mergeVerticalConnectionPoints = function (connectionPoints) {
          let leftAligned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var connectionPoint, k, len2, point, results, x, xS;
          connectionPoints.sort((a, b) => {
            return a.globalPosition.y - b.globalPosition.y;
          });
          xS = function () {
            var k, len2, results;
            results = [];
            for (k = 0, len2 = connectionPoints.length; k < len2; k++) {
              point = connectionPoints[k];
              results.push(point.globalPosition.x);
            }
            return results;
          }();
          x = leftAligned ? _.min(xS) : _.max(xS);
          results = [];
          for (k = 0, len2 = connectionPoints.length; k < len2; k++) {
            connectionPoint = connectionPoints[k];
            results.push(connectionPoint.globalPosition.x = x);
          }
          return results;
        };
        ref2 = this._globalPathways;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          pathway = ref2[k];

          // Remove all existing global pathways for a new rewiring.
          pathway.remove();
        }
        this._globalPathways = [];
        connectConnectionPoints = connectionPoints => {
          var connectionPointA, connectionPointAIndex, connectionPointB, l, len3, ref3, results;
          ref3 = connectionPoints.slice(1);
          results = [];
          for (connectionPointAIndex = l = 0, len3 = ref3.length; l < len3; connectionPointAIndex = ++l) {
            connectionPointB = ref3[connectionPointAIndex];
            connectionPointA = connectionPoints[connectionPointAIndex];
            addGlobalPathway(new StudyPlan.Pathway(connectionPointA, connectionPointB, null, true));
            results.push(addGlobalPathway(new StudyPlan.Pathway(connectionPointB, connectionPointA, null, true)));
          }
          return results;
        };

        // Recursively create potential global road network.
        createGoalConnectionPoints = goalNode => {
          var accessHorizontalConnections, accessHorizontalEntryConnection, accessJunction, bottomExit, bottomRoadY, connectionName, entryConnection, entryVertical, entryX, exitConnection, exitX, extendedAccessHorizontalConnections, firstForwardGoalNode, forwardGoalAConnectionPoints, forwardGoalAIndex, forwardGoalBConnectionPoints, forwardGoalConnectionPoints, forwardGoalNode, forwardGoalsConnectionPoints, forwardHorizontalConnections, forwardHorizontalEntryConnection, forwardHorizontalY, goalConnectionPoints, goalGlobalPosition, l, len3, len4, len5, len6, m, mainHorizontalConnections, mainHorizontalEntryConnection, mainHorizontalY, mainJunction, mainVertical, n, o, ref3, ref4, sidewaysConnection, sidewaysConnections, sidewaysGoalAConnectionPoints, sidewaysGoalAIndex, sidewaysGoalBConnectionPoints, sidewaysGoalConnectionPoints, sidewaysGoalNode, sidewaysGoalsConnectionPoints, sidewaysHorizontalConnections, sidewaysHorizontalEntryConnection, sidewaysHorizontalExitConnection, sidewaysHorizontalY, sidewaysPoint, sidewaysPointIndex, topOfFirstForwardGoal, topRoadY;
          connectionName = function () {
            for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
              names[_key] = arguments[_key];
            }
            return "".concat(_.last(goalNode.goalId.split('.')), " ").concat(names.join(' '));
          };
          sidewaysGoalsConnectionPoints = function () {
            var l, len3, ref3, results;
            ref3 = goalNode.sidewaysGoalNodes;
            results = [];
            for (l = 0, len3 = ref3.length; l < len3; l++) {
              sidewaysGoalNode = ref3[l];
              results.push(createGoalConnectionPoints(sidewaysGoalNode));
            }
            return results;
          }();
          forwardGoalsConnectionPoints = function () {
            var l, len3, ref3, results;
            ref3 = goalNode.forwardGoalNodes;
            results = [];
            for (l = 0, len3 = ref3.length; l < len3; l++) {
              forwardGoalNode = ref3[l];
              results.push(createGoalConnectionPoints(forwardGoalNode));
            }
            return results;
          }();
          goalGlobalPosition = goalNode.globalPosition();
          entryX = goalNode.entryPoint.globalPosition.x - this.constructor.goalPadding.left;
          exitX = goalNode.exitPoint.globalPosition.x + this.constructor.goalPadding.right;
          topRoadY = goalGlobalPosition.y + goalNode.topRoadY;
          bottomRoadY = goalGlobalPosition.y + goalNode.bottomRoadY;
          entryConnection = StudyPlan.ConnectionPoint.createGlobal(entryX, goalNode.entryPoint.globalPosition.y, connectionName('entry'));
          addGlobalPathway(new StudyPlan.Pathway(entryConnection, goalNode.entryPoint, null, true));
          exitConnection = StudyPlan.ConnectionPoint.createGlobal(exitX, goalNode.exitPoint.globalPosition.y, connectionName('exit'));
          addGlobalPathway(new StudyPlan.Pathway(goalNode.exitPoint, exitConnection, null, true));
          sidewaysConnections = function () {
            var l, len3, ref3, results;
            ref3 = goalNode.sidewaysPoints;
            results = [];
            for (sidewaysPointIndex = l = 0, len3 = ref3.length; l < len3; sidewaysPointIndex = ++l) {
              sidewaysPoint = ref3[sidewaysPointIndex];
              sidewaysConnection = StudyPlan.ConnectionPoint.createGlobal(sidewaysPoint.globalPosition.x, topRoadY, connectionName('sideways', sidewaysPointIndex));
              addGlobalPathway(new StudyPlan.Pathway(sidewaysPoint, sidewaysConnection, null, true));
              addGlobalPathway(new StudyPlan.Pathway(sidewaysConnection, sidewaysPoint, null, true));
              results.push(sidewaysConnection);
            }
            return results;
          }();
          goalConnectionPoints = {
            left: [entryConnection],
            up: [],
            down: [],
            accessHorizontal: []
          };

          // Create access junction between the access horizontal and the vertical.
          accessJunction = StudyPlan.ConnectionPoint.createGlobal(exitX, topRoadY, connectionName('access junction'));

          // Create access horizontal if there are any sideways connections.
          if (sidewaysConnections.length) {
            // Create the access horizontal.
            accessHorizontalEntryConnection = StudyPlan.ConnectionPoint.createGlobal(entryX, topRoadY, connectionName('access horizontal entry'));
            goalConnectionPoints.left.push(accessHorizontalEntryConnection);
            accessHorizontalConnections = [accessHorizontalEntryConnection, accessJunction, ...sidewaysConnections];
            if (forwardGoalsConnectionPoints.length) {
              // Align the access horizontal with those of forward goals.
              extendedAccessHorizontalConnections = [...accessHorizontalConnections, ...forwardGoalsConnectionPoints[0].accessHorizontal];
              mergeHorizontalConnectionPoints(extendedAccessHorizontalConnections);
            }
            mergeHorizontalConnectionPoints(accessHorizontalConnections);
            connectConnectionPoints(accessHorizontalConnections);
            goalConnectionPoints.accessHorizontal.push(...accessHorizontalConnections);
          }

          // Create main vertical that connects the access junction and bottom of the goal.
          bottomExit = StudyPlan.ConnectionPoint.createGlobal(exitX, bottomRoadY);
          goalConnectionPoints.down.push(bottomExit);
          mainVertical = [accessJunction, exitConnection, bottomExit];
          // Handle forward goals.
          if (forwardGoalsConnectionPoints.length) {
            // All forward goals are left-aligned to the vertical.
            for (l = 0, len3 = forwardGoalsConnectionPoints.length; l < len3; l++) {
              forwardGoalConnectionPoints = forwardGoalsConnectionPoints[l];
              mainVertical.push(...forwardGoalConnectionPoints.left);
            }

            // The down connections of the last forward goal are the down connections of the combined goal.
            goalConnectionPoints.down.push(..._.last(forwardGoalsConnectionPoints).down);
            mergeHorizontalConnectionPoints(goalConnectionPoints.down, false);
            if (forwardGoalsConnectionPoints.length > 1) {
              ref3 = forwardGoalsConnectionPoints.slice(1);
              // Create intermediary horizontals.
              for (forwardGoalAIndex = m = 0, len4 = ref3.length; m < len4; forwardGoalAIndex = ++m) {
                forwardGoalBConnectionPoints = ref3[forwardGoalAIndex];
                forwardGoalAConnectionPoints = forwardGoalsConnectionPoints[forwardGoalAIndex];
                forwardHorizontalConnections = [...forwardGoalAConnectionPoints.down, ...forwardGoalBConnectionPoints.up];
                if (forwardHorizontalConnections.length) {
                  forwardHorizontalY = forwardHorizontalConnections[0].globalPosition.y;
                  forwardHorizontalEntryConnection = StudyPlan.ConnectionPoint.createGlobal(exitConnection.globalPosition.x, forwardHorizontalY, connectionName('forward horizontal entry', forwardGoalAIndex));
                  forwardHorizontalConnections.push(forwardHorizontalEntryConnection);
                  mainVertical.push(forwardHorizontalEntryConnection);
                  mergeHorizontalConnectionPoints(forwardHorizontalConnections);
                  connectConnectionPoints(forwardHorizontalConnections);
                }
              }
            }
          }

          // Handle sideways goals.
          if (sidewaysGoalsConnectionPoints.length === 0) {
            if (accessHorizontalConnections) {
              // There are no sideways goals above, so the access horizontal is also the top of the goal.
              goalConnectionPoints.up.push(...accessHorizontalConnections);
            }
          } else {
            // All sideways goals are left-aligned to this goal.
            for (n = 0, len5 = sidewaysGoalsConnectionPoints.length; n < len5; n++) {
              sidewaysGoalConnectionPoints = sidewaysGoalsConnectionPoints[n];
              goalConnectionPoints.left.push(...sidewaysGoalConnectionPoints.left);
            }

            // The up connections of the last sideways goal are the up connections of the combined goal.
            goalConnectionPoints.up.push(..._.last(sidewaysGoalsConnectionPoints).up);

            // We need a main horizontal that connect the bottom of the first sideways goal and the top of the first forward goal.
            mainHorizontalY = topRoadY;
            if (firstForwardGoalNode = goalNode.forwardGoalNodes[0]) {
              topOfFirstForwardGoal = firstForwardGoalNode.globalPosition().y + firstForwardGoalNode.minY;
              mainHorizontalY = Math.min(mainHorizontalY, topOfFirstForwardGoal);
            }

            // Create main junction between the main horizontal and the vertical.
            mainJunction = StudyPlan.ConnectionPoint.createGlobal(exitX, mainHorizontalY, connectionName('main junction'));
            mainVertical.push(mainJunction);

            // Create the main horizontal.
            mainHorizontalEntryConnection = StudyPlan.ConnectionPoint.createGlobal(entryX, mainHorizontalY, connectionName('main horizontal entry'));
            goalConnectionPoints.left.push(mainHorizontalEntryConnection);

            // First align the horizontal above the first forward goal and the main junction.
            mainHorizontalConnections = [mainHorizontalEntryConnection, mainJunction];
            if (forwardGoalsConnectionPoints.length) {
              mainHorizontalConnections.push(...forwardGoalsConnectionPoints[0].up);
            }
            mergeHorizontalConnectionPoints(mainHorizontalConnections);

            // Now align the first sideways goal down to the horizontal.
            mainHorizontalConnections.push(...sidewaysGoalsConnectionPoints[0].down);
            mergeHorizontalConnectionPoints(mainHorizontalConnections, false);
            connectConnectionPoints(mainHorizontalConnections);
            if (sidewaysGoalsConnectionPoints.length > 1) {
              ref4 = sidewaysGoalsConnectionPoints.slice(1);
              // Create intermediary horizontals.
              for (sidewaysGoalAIndex = o = 0, len6 = ref4.length; o < len6; sidewaysGoalAIndex = ++o) {
                sidewaysGoalBConnectionPoints = ref4[sidewaysGoalAIndex];
                sidewaysGoalAConnectionPoints = sidewaysGoalsConnectionPoints[sidewaysGoalAIndex];
                sidewaysHorizontalConnections = [...sidewaysGoalAConnectionPoints.up, ...sidewaysGoalBConnectionPoints.down];
                if (sidewaysHorizontalConnections.length) {
                  sidewaysHorizontalY = sidewaysHorizontalConnections[0].globalPosition.y;
                  sidewaysHorizontalEntryConnection = StudyPlan.ConnectionPoint.createGlobal(entryConnection.globalPosition.x, sidewaysHorizontalY, connectionName('sideways horizontal entry', sidewaysGoalAIndex));
                  sidewaysHorizontalConnections.push(sidewaysHorizontalEntryConnection);
                  goalConnectionPoints.left.push(sidewaysHorizontalEntryConnection);
                  sidewaysHorizontalExitConnection = StudyPlan.ConnectionPoint.createGlobal(exitConnection.globalPosition.x, sidewaysHorizontalY, connectionName('sideways horizontal exit', sidewaysGoalAIndex));
                  sidewaysHorizontalConnections.push(sidewaysHorizontalExitConnection);
                  mergeHorizontalConnectionPoints(sidewaysHorizontalConnections, false);
                  connectConnectionPoints(sidewaysHorizontalConnections);
                }
              }
            }
          }

          // Finalize the main vertical.
          mergeVerticalConnectionPoints(mainVertical);
          connectConnectionPoints(mainVertical);

          // Create entry vertical that connects all left connection points.
          entryVertical = [...goalConnectionPoints.left];
          mergeVerticalConnectionPoints(entryVertical);
          connectConnectionPoints(entryVertical);
          return goalConnectionPoints;
        };
        ref3 = this.rootGoalNodes;
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          rootGoalNode = ref3[l];
          createGoalConnectionPoints(rootGoalNode);
        }

        // Create pathways for all goal connections.
        paths = [];
        for (m = 0, len4 = goalsDataList.length; m < len4; m++) {
          goalData = goalsDataList[m];
          if (goalData.connections) {
            ref4 = goalData.connections;
            for (n = 0, len5 = ref4.length; n < len5; n++) {
              connection = ref4[n];
              startGoal = this.goalNodesById[goalData.id];
              if (!(endGoal = this.goalNodesById[connection.goalId])) {
                continue;
              }
              if (connection.direction) {
                switch (connection.direction) {
                  case StudyPlan.GoalConnectionDirections.Forward:
                    startPoint = startGoal.exitPoint;
                    break;
                  case StudyPlan.GoalConnectionDirections.Sideways:
                    startPoint = startGoal.sidewaysPoints[connection.sidewaysIndex || 0];
                }
                endPoint = endGoal.entryPoint;
              } else {
                startPoint = startGoal.getExitPointForInterest(connection.interest);
                endPoint = endGoal.entryPoint;
              }
              if (path = this.pathfind(startPoint, endPoint)) {
                paths.push(path);
              }
            }
          }
        }

        // Create needed paths from connections.
        addPath = path => {
          var globalWaypointPositions, len6, o;
          startPoint = path[0].startPoint;
          globalWaypointPositions = [];
          for (o = 0, len6 = path.length; o < len6; o++) {
            pathway = path[o];
            globalWaypointPositions.push(...pathway.globalWaypointPositions);
            globalWaypointPositions.push(pathway.endPoint.globalPosition);
          }
          globalWaypointPositions.pop();
          endPoint = _.last(path).endPoint;
          pathway = new StudyPlan.Pathway(startPoint, endPoint);
          pathway.globalWaypointPositions = globalWaypointPositions;
          addGlobalPathway(pathway);
          return roadTileMap.placeRoad(pathway, {
            useGlobalPositions: true
          });
        };
        for (o = 0, len6 = paths.length; o < len6; o++) {
          path = paths[o];
          addPath(path);
        }
        ref5 = this.rootGoalNodes;
        for (p = 0, len7 = ref5.length; p < len7; p++) {
          rootGoalNode = ref5[p];

          // Propagate interests.
          rootGoalNode.entryPoint.propagateInterests();
        }

        // Create pathways for missing required interests.
        interestProviders = {};
        ref6 = this.goalNodesById;
        for (goalId in ref6) {
          goalNode = ref6[goalId];
          ref7 = goalNode.taskPoints;
          for (q = 0, len8 = ref7.length; q < len8; q++) {
            taskPoint = ref7[q];
            ref8 = taskPoint.providedInterests;
            for (r = 0, len9 = ref8.length; r < len9; r++) {
              interest = ref8[r];
              if (!interestProviders[interest]) {
                interestProviders[interest] = taskPoint;
              }
            }
          }
        }
        ref9 = this.goalNodesById;
        for (goalId in ref9) {
          goalNode = ref9[goalId];
          ref10 = goalNode.taskPoints;
          for (s = 0, len10 = ref10.length; s < len10; s++) {
            taskPoint = ref10[s];
            unprovidedInterests = _.difference(taskPoint.entryPoint.requiredInterests, taskPoint.entryPoint.propagatedProvidedInterests);
            for (t = 0, len11 = unprovidedInterests.length; t < len11; t++) {
              interest = unprovidedInterests[t];
              if (!interestProviders[interest]) {
                continue;
              }
              startPoint = interestProviders[interest].goalNode.getExitPointForInterest(interest);
              endPoint = taskPoint.goalNode.entryPoint;
              if (path = this.pathfind(startPoint, endPoint)) {
                addPath(path);
              }
            }
          }
        }

        // Distribute possible goals.
        possibleGoals = [];
        ref11 = this.blueprint.studyPlan.goals();
        for (u = 0, len12 = ref11.length; u < len12; u++) {
          goal = ref11[u];
          // Calculate all required interests so we can remove them as we distribute the goals.
          requiredInterests = [];
          ref12 = goal.initialTasks();
          for (v = 0, len13 = ref12.length; v < len13; v++) {
            task = ref12[v];
            requiredInterests = _.union(requiredInterests, task.requiredInterests());
          }
          possibleGoals.push({
            goal,
            requiredInterests
          });
        }
        ref13 = this.goalNodesById;
        for (goalId in ref13) {
          goalNode = ref13[goalId];
          _.remove(possibleGoals, possibleGoal => {
            return possibleGoal.goal.id() === goalNode.goalId;
          });
          goalNode.possibleForwardGoalIds = [];
          goalNode.possibleSidewaysGoalIds = [];
        }
        availableGoalIds = interests => {
          var coveredInterests, goals, len14, len15, possibleGoal, results, w, z;
          goals = [];
          for (w = 0, len14 = possibleGoals.length; w < len14; w++) {
            possibleGoal = possibleGoals[w];
            coveredInterests = _.intersection(possibleGoal.requiredInterests, interests);
            if (coveredInterests.length || !possibleGoal.requiredInterests.length) {
              goals.push(possibleGoal.goal);

              // Mark that we've found a place based on the covered interests.
              _.pullAll(possibleGoal.requiredInterests, coveredInterests);
            }
          }

          // Goals without any more interests to be covered, can't be added anywhere else.
          _.remove(possibleGoals, possibleGoal => {
            return !possibleGoal.requiredInterests.length;
          });
          results = [];
          for (z = 0, len15 = goals.length; z < len15; z++) {
            goal = goals[z];
            results.push(goal.id());
          }
          return results;
        };
        distributePossibleGoals = (goalNode, interestsCollectionName) => {
          var base, i1, j1, len14, len15, len16, len17, outgoingPathway, ref14, ref15, ref16, ref17, ref18, results, sidewaysPoint, sidewaysPointIndex, w, z;
          ref14 = goalNode.sidewaysPoints;
          // Go across sideways expansion points first since those can be completed earliest.
          for (sidewaysPointIndex = w = 0, len14 = ref14.length; w < len14; sidewaysPointIndex = ++w) {
            sidewaysPoint = ref14[sidewaysPointIndex];
            if ((base = goalNode.possibleSidewaysGoalIds)[sidewaysPointIndex] == null) {
              base[sidewaysPointIndex] = [];
            }
            goalNode.possibleSidewaysGoalIds[sidewaysPointIndex].push(...availableGoalIds(sidewaysPoint[interestsCollectionName]));
          }
          ref15 = goalNode.sidewaysPoints;
          for (sidewaysPointIndex = z = 0, len15 = ref15.length; z < len15; sidewaysPointIndex = ++z) {
            sidewaysPoint = ref15[sidewaysPointIndex];
            ref16 = sidewaysPoint.outgoingPathways;
            for (i1 = 0, len16 = ref16.length; i1 < len16; i1++) {
              outgoingPathway = ref16[i1];
              if (outgoingPathway.endPoint === ((ref17 = outgoingPathway.endPoint.goalNode) != null ? ref17.entryPoint : void 0)) {
                distributePossibleGoals(outgoingPathway.endPoint.goalNode, interestsCollectionName);
              }
            }
          }

          // See if we can add any goals forward.
          goalNode.possibleForwardGoalIds.push(...availableGoalIds(goalNode.exitPoint[interestsCollectionName]));
          ref18 = goalNode.exitPoint.outgoingPathways;
          results = [];
          for (j1 = 0, len17 = ref18.length; j1 < len17; j1++) {
            outgoingPathway = ref18[j1];
            results.push(distributePossibleGoals(outgoingPathway.endPoint.goalNode, interestsCollectionName));
          }
          return results;
        };
        ref14 = this.rootGoalNodes;
        for (w = 0, len14 = ref14.length; w < len14; w++) {
          rootGoalNode = ref14[w];

          // Add short-term goals first.
          distributePossibleGoals(rootGoalNode, 'propagatedAvailableInterests');
        }
        // Allow adding mid-term goals after completing the intro.
        if (LM.Intro.Tutorial.Goals.Snake.completed()) {
          ref15 = this.rootGoalNodes;
          for (z = 0, len15 = ref15.length; z < len15; z++) {
            rootGoalNode = ref15[z];
            distributePossibleGoals(rootGoalNode, 'propagatedProvidedInterests');
          }
        }
        ref16 = this.goalNodesById;

        // Place expansion points.
        for (goalId in ref16) {
          goalNode = ref16[goalId];
          // If there are forward goal nodes, we have to expand down, otherwise forward.
          if (goalNode.possibleForwardGoalIds.length) {
            connectionOptions = {
              goalId,
              exit: true
            };
            expansionPosition = goalNode.exitPoint.globalPosition;
            if (goalNode.forwardGoalNodes.length) {
              exitX = expansionPosition.x + this.constructor.goalPadding.right;
              exitY = expansionPosition.y;
              while (roadTileMap.getTileType(exitX, exitY) === StudyPlan.TileMap.Tile.Types.Road) {
                exitY++;
              }
              expansionRoadPoint = StudyPlan.ConnectionPoint.createGlobal(exitX, exitY, 'expansion');
              pathway = new StudyPlan.Pathway(goalNode.exitPoint, expansionRoadPoint);
              pathway.globalWaypointPositions.push(new THREE.Vector2(exitX, goalNode.exitPoint.globalPosition.y));
              addGlobalPathway(pathway);
              roadTileMap.placeRoad(pathway, {
                useGlobalPositions: true
              });
              roadTileMap.placeExpansionPoint(exitX, exitY + 3, StudyPlan.TileMap.Tile.ExpansionDirections.ForwardDown, goalNode.possibleForwardGoalIds, connectionOptions);
            } else {
              exitX = expansionPosition.x;
              exitY = expansionPosition.y;
              while (roadTileMap.getTileType(exitX, exitY) === StudyPlan.TileMap.Tile.Types.Road) {
                exitX++;
              }
              expansionRoadPoint = StudyPlan.ConnectionPoint.createGlobal(exitX, exitY, 'expansion');
              pathway = new StudyPlan.Pathway(goalNode.exitPoint, expansionRoadPoint);
              addGlobalPathway(pathway);
              roadTileMap.placeRoad(pathway, {
                useGlobalPositions: true
              });
              roadTileMap.placeExpansionPoint(exitX + 2, exitY, StudyPlan.TileMap.Tile.ExpansionDirections.Forward, goalNode.possibleForwardGoalIds, connectionOptions);
            }
          }

          // We can expand sideways where there are no outgoing pathways.
          sidewaysExpansionPossible = false;
          ref17 = goalNode.sidewaysPoints;
          for (index = i1 = 0, len16 = ref17.length; i1 < len16; index = ++i1) {
            sidewaysPoint = ref17[index];
            if (!((ref18 = goalNode.possibleSidewaysGoalIds[index]) != null ? ref18.length : void 0)) {
              continue;
            }
            sidewaysExpansionPossible = true;
            if (sidewaysPoint.outgoingPathways.length) {
              continue;
            }
            expansionPosition = sidewaysPoint.globalPosition;

            // If there are sideways roads going past this expansion point, just connect the road.
            if (roadTileMap.getTileType(expansionPosition.x, expansionPosition.y - 2) === StudyPlan.TileMap.Tile.Types.Road) {
              expansionRoadPoint = StudyPlan.ConnectionPoint.createGlobal(expansionPosition.x, expansionPosition.y - 1, 'expansion');
              pathway = new StudyPlan.Pathway(sidewaysPoint, expansionRoadPoint);
              addGlobalPathway(pathway);
              roadTileMap.placeRoad(pathway, {
                useGlobalPositions: true
              });
            } else {
              roadTileMap.placeExpansionPoint(expansionPosition.x, expansionPosition.y - 2, StudyPlan.TileMap.Tile.ExpansionDirections.Sideways, goalNode.possibleSidewaysGoalIds[index], {
                goalId: goalId,
                sidewaysIndex: index
              });
            }
          }

          // Add the sideways expansion point at the top of the entry vertical.
          if (sidewaysExpansionPossible && goalNode.sidewaysGoalNodes.length) {
            entryX = goalNode.entryPoint.globalPosition.x - this.constructor.goalPadding.left;
            lastSidewaysGoalNode = _.last(goalNode.sidewaysGoalNodes);
            entryY = lastSidewaysGoalNode.globalPosition().y;
            expansionRoadPoint = StudyPlan.ConnectionPoint.createGlobal(entryX, entryY - 1, 'expansion');
            pathway = new StudyPlan.Pathway(lastSidewaysGoalNode.entryPoint, expansionRoadPoint);
            pathway.globalWaypointPositions.push(new THREE.Vector2(entryX, entryY));
            addGlobalPathway(pathway);
            roadTileMap.placeRoad(pathway, {
              useGlobalPositions: true
            });
            roadTileMap.placeExpansionPoint(entryX, entryY - 3, StudyPlan.TileMap.Tile.ExpansionDirections.Sideways, goalNode.possibleSidewaysGoalIds, {
              goalId: goalId
            });
          }

          // We can connect backwards if the goal has required interests, but there is no predecessor set.
          if (goalNode.goal.requiredInterests().length && !goalNode.parent) {
            expansionPosition = goalNode.entryPoint.globalPosition;
            roadTileMap.placeExpansionPoint(expansionPosition.x - 2, expansionPosition.y, StudyPlan.TileMap.Tile.ExpansionDirections.Backwards, [], {
              goalId: goalId,
              entry: true
            });
          }
        }

        // Place initial expansion point if there are no goals at all.
        if (!goalsDataList.length) {
          roadTileMap.placeExpansionPoint(0, 0, StudyPlan.TileMap.Tile.ExpansionDirections.Forward, availableGoalIds([]));
        }
        roadTileMap.finishConstruction();
        return this.roadTileMap(roadTileMap);
      });
    }
    destroy() {
      return this._recalculateAutorun.stop();
    }
    pathfind(startPoint, endPoint) {
      return AP.Search.Dijkstra.searchEdges({
        root: startPoint,
        isGoal: point => {
          return point === endPoint;
        },
        getEdgeStart: pathway => {
          return pathway.startPoint;
        },
        getEdgeEnd: pathway => {
          return pathway.endPoint;
        },
        getEdgeDistance: pathway => {
          return pathway.distance();
        },
        getDescendentEdges: point => {
          if (point.potentialOutgoingPathways.length) {
            return point.potentialOutgoingPathways;
          } else {
            return point.outgoingPathways;
          }
        }
      });
    }
  }
  ;
  GoalHierarchy.goalPadding = {
    left: 3,
    top: 2,
    right: 4,
    bottom: 4
  };
  GoalHierarchy.goalIslandSpacing = 10;
  return GoalHierarchy;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goalnode.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/goalnode.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  IL,
  LOI,
  PAA,
  StudyPlan,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.GoalNode = class GoalNode {
  constructor() {
    // Note: We add this first so it will appear in the object summary while debugging.
    this.goalId = null;
    this.entryPoint = null;
    this.exitPoint = null;
    this.endTaskPoint = null;
    this.sidewaysPoints = [];
    this.taskPoints = [];
    this.taskPointsById = {};
    this.taskPathways = [];
    this.forwardGoalNodes = [];
    this.sidewaysGoalNodes = [];
    this.parent = null;
    this.possibleForwardGoalIds = null;
    this.possibleSidewaysGoalIds = null;
    this.localPosition = new THREE.Vector2();
    this.globalPosition = new ReactiveField(new THREE.Vector2());
    this.width = 0;
    this.height = 0;
  }
  destroy() {
    var ref;
    return (ref = this.goal) != null ? ref.destroy() : void 0;
  }
  markedComplete() {
    var goalsData, ref;
    goalsData = PAA.PixelPad.Apps.StudyPlan.state('goals');
    return (ref = goalsData[this.goalId]) != null ? ref.markedComplete : void 0;
  }
  markComplete(value) {
    var goalsData;
    goalsData = PAA.PixelPad.Apps.StudyPlan.state('goals');
    goalsData[this.goalId].markedComplete = value;
    return PAA.PixelPad.Apps.StudyPlan.state('goals', goalsData);
  }
  initialize(goalId) {
    var _this = this;
    var addedNewTaskPoints, calculateLevel, connectionName, connectionPoint, currentMaxLevel, dummyTaskPoint, endLevel, entryTileX, exitRequired, exitTileX, goalTask, groupNumber, groupNumberInfo, i, i1, j, j1, k, k1, l, l1, lastGroupY, lastTaskPoint, leftGroundOffset, len, len1, len10, len11, len12, len13, len14, len15, len16, len17, len18, len19, len2, len20, len21, len3, len4, len5, len6, len7, len8, len9, level, levelIndex, m, m1, maxGroupNumberRequiringExit, missingLevel, n, n1, o, o1, p, p1, pathway, predecessor, predecessorTaskPoint, predecessors, q, q1, r, r1, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref28, ref29, ref3, ref30, ref31, ref32, ref33, ref4, ref5, ref6, ref7, ref8, ref9, s, s1, shiftY, spaceAfter, spaceBefore, startLevel, successor, successors, t, t1, task, taskId, taskPoint, taskWidth, tasks, tile, u, v, w, width, x, y, ySpacing, z;
    this.goalId = goalId;
    if (!(this.goalClass = PAA.Learning.Goal.getClassForId(this.goalId))) {
      console.warn("Unrecognized goal present in study plan.", this.goalId);
      return;
    }
    connectionName = function () {
      for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
      }
      return "".concat(_.last(_this.goalId.split('.')), " goal ").concat(names.join(' '));
    };
    this.goal = new this.goalClass();
    this.entryPoint = StudyPlan.ConnectionPoint.createLocal(this, 0, 0, connectionName('entry'));
    this.exitPoint = StudyPlan.ConnectionPoint.createLocal(this, 0, 0, connectionName('exit'));
    tasks = this.goal.tasks();

    // Create task points.
    for (i = 0, len = tasks.length; i < len; i++) {
      task = tasks[i];
      taskPoint = new StudyPlan.TaskPoint(connectionName(task.id()));
      taskPoint.initializeTask(task, this);
      this.taskPoints.push(taskPoint);
      this.taskPointsById[task.id()] = taskPoint;
    }

    // Create links between task points.
    for (j = 0, len1 = tasks.length; j < len1; j++) {
      task = tasks[j];
      taskPoint = this.taskPointsById[task.id()];
      predecessors = task.predecessors();
      if (predecessors.length) {
        for (k = 0, len2 = predecessors.length; k < len2; k++) {
          predecessor = predecessors[k];
          predecessorTaskPoint = this.taskPointsById[predecessor.id()];
          taskPoint.predecessors.push(predecessorTaskPoint);
        }
      }
    }

    // Create start task point.
    this.startTaskPoint = new StudyPlan.TaskPoint(connectionName('start task'));
    this.startTaskPoint.initializeDummyTask(this);
    this.startTaskPoint.groupNumber = 0;
    this.taskPoints.push(this.startTaskPoint);
    ref = this.goal.initialTasks();
    for (l = 0, len3 = ref.length; l < len3; l++) {
      task = ref[l];
      taskPoint = this.taskPointsById[task.id()];
      taskPoint.predecessors.push(this.startTaskPoint);
    }

    // Create end task point.
    this.endTaskPoint = new StudyPlan.TaskPoint(connectionName('end task'));
    this.endTaskPoint.initializeEndTask(this);
    this.endTaskPoint.groupNumber = this.goal.finalGroupNumber();
    this.taskPoints.push(this.endTaskPoint);
    ref1 = this.goal.finalTasks();
    for (m = 0, len4 = ref1.length; m < len4; m++) {
      task = ref1[m];
      taskPoint = this.taskPointsById[task.id()];
      this.endTaskPoint.predecessors.push(taskPoint);
    }

    // Calculate levels.
    calculateLevel = taskPoint => {
      var highestLevel;
      if (taskPoint.level != null) {
        // See if we've already calculated it.
        return taskPoint.level;
      }
      if (!taskPoint.predecessors.length) {
        // Set and return level 0 when there are no predecessors.
        return taskPoint.level = 0;
      }
      // If not, the level is one deeper than the highest predecessor.
      highestLevel = _.maxBy(taskPoint.predecessors, calculateLevel).level;
      // Set and return the calculated level.
      return taskPoint.level = highestLevel + 1;
    };
    while (true) {
      addedNewTaskPoints = false;
      ref2 = this.taskPoints;
      for (n = 0, len5 = ref2.length; n < len5; n++) {
        taskPoint = ref2[n];

        // (Re)calculate all levels.
        taskPoint.level = (ref3 = taskPoint.task) != null ? ref3.level() : void 0;
      }
      ref4 = this.taskPoints;
      for (o = 0, len6 = ref4.length; o < len6; o++) {
        taskPoint = ref4[o];
        calculateLevel(taskPoint);
      }
      // Put the end goal as the last level.
      this.endTaskPoint.level = 0;
      currentMaxLevel = _.max(_.map(this.taskPoints, 'level'));
      this.endTaskPoint.level = currentMaxLevel + 1;
      ref5 = this.taskPoints;
      // Create dummy goal tasks in missing levels.
      for (p = 0, len7 = ref5.length; p < len7; p++) {
        taskPoint = ref5[p];
        ref6 = _.clone(taskPoint.predecessors);
        // Go over the predecessors, but clone them since we'll be mutating the array.
        for (q = 0, len8 = ref6.length; q < len8; q++) {
          predecessor = ref6[q];
          if (!(predecessor.level < taskPoint.level - 1)) {
            continue;
          }
          // Find which nodes in the same group will need to be rewired.
          successors = _.filter(this.taskPoints, taskPoint => {
            return taskPoint.groupNumber === predecessor.groupNumber && indexOf.call(taskPoint.predecessors, predecessor) >= 0;
          });
          // The task point itself also needs to be rewired.
          successors.push(taskPoint);
          lastTaskPoint = predecessor;
          for (missingLevel = r = ref7 = predecessor.level + 1, ref8 = taskPoint.level; ref7 <= ref8 ? r < ref8 : r > ref8; missingLevel = ref7 <= ref8 ? ++r : --r) {
            // Create the dummy goal in the same group as the predecessor and link it to the previous missing level.
            dummyTaskPoint = new StudyPlan.TaskPoint();
            dummyTaskPoint.initializeDummyTask(this);
            dummyTaskPoint.level = missingLevel;
            dummyTaskPoint.groupNumber = predecessor.groupNumber;
            dummyTaskPoint.predecessors.push(lastTaskPoint);
            this.taskPoints.push(dummyTaskPoint);
            addedNewTaskPoints = true;
            lastTaskPoint = dummyTaskPoint;
          }
          // Rewire all successors to the missing level.
          for (s = 0, len9 = successors.length; s < len9; s++) {
            successor = successors[s];
            _.pull(successor.predecessors, predecessor);
            successor.predecessors.push(lastTaskPoint);
          }
        }
      }
      if (!addedNewTaskPoints) {
        // Continue relaxing the graph until we didn't introduce any new nodes.
        break;
      }
    }
    ref9 = this.taskPoints;

    // Create pathways between task points.
    for (t = 0, len10 = ref9.length; t < len10; t++) {
      taskPoint = ref9[t];
      if (taskPoint.predecessors.length) {
        ref10 = taskPoint.predecessors;
        for (u = 0, len11 = ref10.length; u < len11; u++) {
          predecessor = ref10[u];
          pathway = new StudyPlan.Pathway(predecessor.exitPoint, taskPoint.entryPoint, this);
          this.taskPathways.push(pathway);
        }
      } else {
        pathway = new StudyPlan.Pathway(this.entryPoint, taskPoint.entryPoint, this);
        this.taskPathways.push(pathway);
      }
    }
    pathway = new StudyPlan.Pathway(this.endTaskPoint.exitPoint, this.exitPoint, this);
    this.taskPathways.push(pathway);

    // Prepare for distributing the tasks on the tilemap.
    this.minGroupNumber = _.min(_.map(this.taskPoints, 'groupNumber'));
    this.maxGroupNumber = _.max(_.map(this.taskPoints, 'groupNumber'));
    this.maxLevel = _.max(_.map(this.taskPoints, 'level'));
    this.levelsCount = this.maxLevel + 1;
    this.groupsCount = this.maxGroupNumber - this.minGroupNumber + 1;

    // Distribute levels.
    entryTileX = 1;
    this.levels = [];
    for (levelIndex = v = 0, ref11 = this.maxLevel; 0 <= ref11 ? v <= ref11 : v >= ref11; levelIndex = 0 <= ref11 ? ++v : --v) {
      // Determine how many tiles are needed for this level.
      width = 0;
      exitRequired = false;
      maxGroupNumberRequiringExit = Number.NEGATIVE_INFINITY;
      ref12 = this.taskPoints;
      for (w = 0, len12 = ref12.length; w < len12; w++) {
        taskPoint = ref12[w];
        if (!(taskPoint.level === levelIndex)) {
          continue;
        }
        spaceBefore = 0;
        spaceAfter = 0;
        if (taskPoint.task) {
          // Required interests must have space for a gate.
          if (taskPoint.task.requiredInterests().length) {
            spaceBefore = 1;
          }

          // Tasks that are placed after access roads should have some space
          // before to make it clear we can't get to them from the access road.
          if (((ref13 = this.levels[levelIndex - 1]) != null ? ref13.sideExitPoint : void 0) && taskPoint.groupNumber < this.levels[levelIndex - 1].maxGroupNumberRequiringExit) {
            spaceBefore = 1;
          }

          // Provided interests must have space for an access road.
          if (taskPoint.task.interests().length) {
            spaceAfter = 1;
            exitRequired = true;
            maxGroupNumberRequiringExit = Math.max(maxGroupNumberRequiringExit, taskPoint.groupNumber);
          }

          // Tasks where the road curves up should have space to make the left turn clearer.
          if (_.find(this.taskPoints, otherTaskPoint => {
            return indexOf.call(otherTaskPoint.predecessors, taskPoint) >= 0 && otherTaskPoint.groupNumber < taskPoint.groupNumber;
          })) {
            spaceAfter = 1;
          }
        }
        taskPoint.setPositionX(entryTileX + 1 + spaceBefore);
        taskWidth = 1 + spaceBefore + spaceAfter;
        width = Math.max(width, taskWidth);
      }
      exitTileX = entryTileX + width + 1;
      level = {
        entryTileX,
        exitTileX,
        maxGroupNumberRequiringExit
      };
      if (exitRequired && (levelIndex < this.maxLevel - 1 || !this.goalClass.doesCompletingAnyFinalTaskCompleteTheGoal())) {
        level.sideExitPoint = StudyPlan.ConnectionPoint.createLocal(this, exitTileX, 0, connectionName('side exit', this.sidewaysPoints.length));
        this.sidewaysPoints.push(level.sideExitPoint);
      }
      this.levels.push(level);
      entryTileX = exitTileX;
    }
    this.exitPoint.localPosition.x = this.endTaskPoint.exitPoint.localPosition.x + 1;
    this.exitPoint.localPosition.y = this.endTaskPoint.exitPoint.localPosition.y;

    // Distribute groups.
    this.groupNumbers = {};
    lastGroupY = 0;
    for (groupNumber = z = ref14 = this.minGroupNumber, ref15 = this.maxGroupNumber; ref14 <= ref15 ? z <= ref15 : z >= ref15; groupNumber = ref14 <= ref15 ? ++z : --z) {
      groupNumberInfo = {
        levelFilled: []
      };
      this.groupNumbers[groupNumber] = groupNumberInfo;
      ySpacing = 2;
      ref16 = this.taskPoints;
      for (i1 = 0, len13 = ref16.length; i1 < len13; i1++) {
        goalTask = ref16[i1];
        if (!(goalTask.groupNumber === groupNumber && (goalTask.task || goalTask.endTask))) {
          continue;
        }
        if ((ref17 = this.groupNumbers[groupNumber - 1]) != null ? ref17.levelFilled[goalTask.level] : void 0) {
          // See if we need extra spacing from the level above.
          ySpacing = 4;
        }

        // Fill this spot.
        groupNumberInfo.levelFilled[goalTask.level] = true;
        ref18 = goalTask.predecessors;

        // Add roads in the same group as filled.
        for (j1 = 0, len14 = ref18.length; j1 < len14; j1++) {
          predecessor = ref18[j1];
          if (predecessor.groupNumber === groupNumber) {
            for (level = k1 = ref19 = predecessor.level, ref20 = goalTask.level; ref19 <= ref20 ? k1 < ref20 : k1 > ref20; level = ref19 <= ref20 ? ++k1 : --k1) {
              groupNumberInfo.levelFilled[level] = true;
              if ((ref21 = this.groupNumbers[groupNumber - 1]) != null ? ref21.levelFilled[level] : void 0) {
                // Add extra space above the road.
                ySpacing = Math.max(ySpacing, 3);
              }
            }
          }
        }
      }
      groupNumberInfo.y = lastGroupY + ySpacing;
      lastGroupY = groupNumberInfo.y;
    }

    // Shift Ys so group 0 is on 0.
    shiftY = -this.groupNumbers[0].y;
    ref22 = this.groupNumbers;
    for (groupNumber in ref22) {
      groupNumberInfo = ref22[groupNumber];
      groupNumberInfo.y += shiftY;
    }
    // Create the tile map.
    this.tileMap = new StudyPlan.TileMap();
    this.accessRoadStartY = this.groupNumbers[this.minGroupNumber].y - 4;
    ref23 = this.sidewaysPoints;
    for (l1 = 0, len15 = ref23.length; l1 < len15; l1++) {
      connectionPoint = ref23[l1];
      connectionPoint.localPosition.y = this.accessRoadStartY;
    }
    ref24 = this.taskPoints;

    // Place tasks.
    for (m1 = 0, len16 = ref24.length; m1 < len16; m1++) {
      taskPoint = ref24[m1];
      taskPoint.setPositionY(this.groupNumbers[taskPoint.groupNumber].y - 1);
      leftGroundOffset = 2;
      // If it's not a dummy task, also place a building.
      if (taskPoint.task) {
        taskId = taskPoint.task.id();
        tile = this.tileMap.placeTile(taskPoint.localPosition.x, taskPoint.localPosition.y, StudyPlan.TileMap.Tile.Types.Building);
        tile.building = taskPoint.task.studyPlanBuilding();
        tile.taskId = taskId;
        taskPoint.tiles.push(tile);
        if (taskPoint.task.requiredInterests().length) {
          tile = this.tileMap.placeTile(taskPoint.localPosition.x - 1, taskPoint.localPosition.y + 2, StudyPlan.TileMap.Tile.Types.Gate);
          tile.taskId = taskId;
          taskPoint.tiles.push(tile);
          leftGroundOffset = 4;
        }
      }
      if (taskPoint.endTask) {
        taskPoint.tiles.push(this.tileMap.placeTile(taskPoint.localPosition.x, taskPoint.localPosition.y, StudyPlan.TileMap.Tile.Types.Flag));
      }

      // Add ground.
      for (x = n1 = ref25 = taskPoint.localPosition.x - leftGroundOffset, ref26 = taskPoint.localPosition.x + 2; ref25 <= ref26 ? n1 <= ref26 : n1 >= ref26; x = ref25 <= ref26 ? ++n1 : --n1) {
        for (y = o1 = ref27 = taskPoint.localPosition.y - 3, ref28 = taskPoint.localPosition.y + 2; ref27 <= ref28 ? o1 <= ref28 : o1 >= ref28; y = ref27 <= ref28 ? ++o1 : --o1) {
          taskPoint.tiles.push(this.tileMap.placeTile(x, y, StudyPlan.TileMap.Tile.Types.Ground));
        }
      }
    }
    ref29 = this.taskPoints;

    // Add waypoints to pathways that change group numbers.
    for (p1 = 0, len17 = ref29.length; p1 < len17; p1++) {
      taskPoint = ref29[p1];
      ref30 = taskPoint.predecessors;
      for (q1 = 0, len18 = ref30.length; q1 < len18; q1++) {
        predecessor = ref30[q1];
        if (!(taskPoint.groupNumber !== predecessor.groupNumber)) {
          continue;
        }
        startLevel = this.levels[predecessor.level];
        endLevel = this.levels[taskPoint.level];
        pathway = _.find(taskPoint.entryPoint.incomingPathways, pathway => {
          return pathway.startPoint === predecessor.exitPoint;
        });
        pathway.localWaypointPositions.push(new THREE.Vector2(startLevel.exitTileX, pathway.startPoint.localPosition.y));
        pathway.localWaypointPositions.push(new THREE.Vector2(endLevel.entryTileX, pathway.endPoint.localPosition.y));
      }
    }
    ref31 = this.taskPoints;

    // Place roads
    for (r1 = 0, len19 = ref31.length; r1 < len19; r1++) {
      taskPoint = ref31[r1];
      this.tileMap.placeRoad(taskPoint.entryPoint.outgoingPathways[0], {
        solidLines: !taskPoint.endTask
      });
      ref32 = taskPoint.entryPoint.incomingPathways;
      for (s1 = 0, len20 = ref32.length; s1 < len20; s1++) {
        pathway = ref32[s1];
        this.tileMap.placeRoad(pathway, {
          solidLines: pathway.startPoint !== this.entryPoint
        });
      }
    }
    this.tileMap.placeRoad(this.endTaskPoint.exitPoint.outgoingPathways[0]);
    ref33 = this.taskPoints;

    // Create sideways points.
    for (t1 = 0, len21 = ref33.length; t1 < len21; t1++) {
      taskPoint = ref33[t1];
      if (!taskPoint.task) {
        continue;
      }
      level = this.levels[taskPoint.level];

      // Add exit roads if there are interests and it can't lead directly to the exit of the goal.
      if (taskPoint.task.interests().length && level.sideExitPoint) {
        pathway = new StudyPlan.Pathway(taskPoint.exitPoint, level.sideExitPoint, this);
        pathway.localWaypointPositions.push(new THREE.Vector2(level.exitTileX, pathway.startPoint.localPosition.y));
        this.taskPathways.push(pathway);
        this.tileMap.placeRoad(pathway, {
          accessRoad: true
        });
      }
    }
    return this.tileMap.finishConstruction();
  }
  cloneTemplate(goalHierarchy) {
    var clonedTaskPoint, connectionPointCloneMappings, getConnectionPointClone, goalNode, i, j, k, l, len, len1, len2, len3, len4, m, pathway, predecessor, ref, ref1, ref2, ref3, ref4, ref5, sidewaysPoint, taskId, taskPoint;
    goalNode = new this.constructor();
    goalNode.goalHierarchy = goalHierarchy;
    goalNode.goalId = this.goalId;
    goalNode.goalClass = this.goalClass;
    goalNode.goal = this.goal;
    connectionPointCloneMappings = [];
    getConnectionPointClone = function (connectionPoint) {
      var clonedConnectionPoint, connectionPointCloneMapping;
      connectionPointCloneMapping = _.find(connectionPointCloneMappings, function (mapping) {
        return mapping.from === connectionPoint;
      });
      if (connectionPointCloneMapping) {
        return connectionPointCloneMapping.to;
      }
      clonedConnectionPoint = connectionPoint.clone(goalNode, getConnectionPointClone);
      clonedConnectionPoint.goalNode = goalNode;
      connectionPointCloneMappings.push({
        from: connectionPoint,
        to: clonedConnectionPoint
      });
      return clonedConnectionPoint;
    };
    goalNode.entryPoint = getConnectionPointClone(this.entryPoint);
    goalNode.exitPoint = getConnectionPointClone(this.exitPoint);
    goalNode.endTaskPoint = getConnectionPointClone(this.endTaskPoint);
    ref = this.sidewaysPoints;
    for (i = 0, len = ref.length; i < len; i++) {
      sidewaysPoint = ref[i];
      goalNode.sidewaysPoints.push(getConnectionPointClone(sidewaysPoint));
    }
    ref1 = this.taskPoints;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      taskPoint = ref1[j];
      goalNode.taskPoints.push(getConnectionPointClone(taskPoint));
    }
    ref2 = this.taskPointsById;
    for (taskId in ref2) {
      taskPoint = ref2[taskId];
      goalNode.taskPointsById[taskId] = getConnectionPointClone(taskPoint);
    }
    ref3 = this.taskPoints;
    for (k = 0, len2 = ref3.length; k < len2; k++) {
      taskPoint = ref3[k];
      clonedTaskPoint = getConnectionPointClone(taskPoint);
      ref4 = taskPoint.predecessors;
      for (l = 0, len3 = ref4.length; l < len3; l++) {
        predecessor = ref4[l];
        clonedTaskPoint.predecessors.push(getConnectionPointClone(predecessor));
      }
    }
    ref5 = this.taskPathways;
    for (m = 0, len4 = ref5.length; m < len4; m++) {
      pathway = ref5[m];
      goalNode.taskPathways.push(pathway.clone(getConnectionPointClone(pathway.startPoint), getConnectionPointClone(pathway.endPoint), goalNode));
    }
    goalNode.tileMap = this.tileMap;
    goalNode.accessRoadStartY = this.accessRoadStartY;
    return goalNode;
  }
  calculateLocalPositions() {
    var bottomY, goalNode, i, j, leftX, len, len1, ref, ref1, rightX, topY;
    // The base size is where the surrounding roads would go.
    this.minX = this.entryPoint.localPosition.x - StudyPlan.GoalHierarchy.goalPadding.left;
    this.maxX = this.exitPoint.localPosition.x + StudyPlan.GoalHierarchy.goalPadding.right;
    this.minY = this.accessRoadStartY - StudyPlan.GoalHierarchy.goalPadding.top;
    this.maxY = this.tileMap.maxY + StudyPlan.GoalHierarchy.goalPadding.bottom + this.goalHierarchy.blueprint.getGoalNameTileHeight(this.goalId);
    this.topRoadY = this.minY;
    this.bottomRoadY = this.maxY;
    // Place forward goals to the right of this goal.
    topY = null;
    leftX = this.maxX;
    ref = this.forwardGoalNodes;
    for (i = 0, len = ref.length; i < len; i++) {
      goalNode = ref[i];
      goalNode.calculateLocalPositions();
      rightX = leftX + goalNode.width - 1;
      this.maxX = Math.max(this.maxX, rightX);
      if (topY == null) {
        topY = goalNode.minY;
      }
      this.minY = Math.min(this.minY, topY);
      bottomY = topY + goalNode.height - 1;
      this.maxY = Math.max(this.maxY, bottomY);
      goalNode.localPosition.set(leftX - goalNode.minX, topY - goalNode.minY);
      topY = bottomY;
    }

    // Place sideways goals above this goal.
    bottomY = this.minY;
    ref1 = this.sidewaysGoalNodes;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      goalNode = ref1[j];
      goalNode.calculateLocalPositions();
      topY = bottomY - goalNode.height + 1;
      this.minY = Math.min(this.minY, topY);
      this.maxX = Math.max(this.maxX, goalNode.maxX);
      goalNode.localPosition.set(0, topY - goalNode.minY);
      bottomY = topY;
    }
    this.width = this.maxX - this.minX + 1;
    return this.height = this.maxY - this.minY + 1;
  }
  calculateGlobalPositions() {
    var globalPosition, goalNode, i, j, k, l, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, results, sidewaysPoint, taskPathway, taskPoint;
    if (this.parent) {
      globalPosition = this.localPosition.clone().add(this.parent.globalPosition());
      this.globalPosition(globalPosition);
    } else {
      globalPosition = this.globalPosition();
    }
    this.entryPoint.calculateGlobalPosition(globalPosition);
    this.exitPoint.calculateGlobalPosition(globalPosition);
    ref = this.sidewaysPoints;
    for (i = 0, len = ref.length; i < len; i++) {
      sidewaysPoint = ref[i];
      sidewaysPoint.calculateGlobalPosition(globalPosition);
    }
    ref1 = this.taskPoints;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      taskPoint = ref1[j];
      taskPoint.calculateGlobalPosition(globalPosition);
    }
    ref2 = this.taskPathways;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      taskPathway = ref2[k];
      taskPathway.calculateGlobalPositions(globalPosition);
    }
    ref3 = this.sidewaysGoalNodes;
    for (l = 0, len3 = ref3.length; l < len3; l++) {
      goalNode = ref3[l];
      goalNode.calculateGlobalPositions();
    }
    ref4 = this.forwardGoalNodes;
    results = [];
    for (m = 0, len4 = ref4.length; m < len4; m++) {
      goalNode = ref4[m];
      results.push(goalNode.calculateGlobalPositions());
    }
    return results;
  }
  getExitPointForInterest(interest) {
    var sidewaysExitPathway, taskPoint;
    // Find the task that provides this interest.
    if (!(taskPoint = _.find(this.taskPoints, taskPoint => {
      return indexOf.call(taskPoint.providedInterests, interest) >= 0;
    }))) {
      return;
    }

    // The exit of this task will either lead to one of the sideways points or towards the exit.
    if (sidewaysExitPathway = _.find(taskPoint.exitPoint.outgoingPathways, pathway => {
      var ref;
      return ref = pathway.endPoint, indexOf.call(this.sidewaysPoints, ref) >= 0;
    })) {
      return sidewaysExitPathway.endPoint;
    }
    return this.exitPoint;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pathway.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/pathway.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Pathway = class Pathway {
  constructor(startPoint, endPoint, goalNode, potential) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.goalNode = goalNode;
    this.potential = potential;
    this.localWaypointPositions = [];
    this.globalWaypointPositions = [];
    if (_.find(this.startPoint.outgoingPathways, pathway => {
      return pathway.endPoint === this.endPoint;
    })) {
      // Don't add duplicate pathways.
      return this;
    }
    if (this.potential) {
      this.startPoint.potentialOutgoingPathways.push(this);
      this.endPoint.potentialIncomingPathways.push(this);
    } else {
      this.startPoint.outgoingPathways.push(this);
      this.endPoint.incomingPathways.push(this);
    }
  }
  remove() {
    if (this.potential) {
      _.pull(this.startPoint.potentialOutgoingPathways, this);
      return _.pull(this.endPoint.potentialIncomingPathways, this);
    } else {
      _.pull(this.startPoint.outgoingPathways, this);
      return _.pull(this.endPoint.incomingPathways, this);
    }
  }
  clone(newStartPoint, newEndPoint, newGoalNode) {
    var pathway;
    pathway = new StudyPlan.Pathway(newStartPoint, newEndPoint, newGoalNode);
    pathway.localWaypointPositions.push(...this.localWaypointPositions);
    return pathway;
  }
  calculateGlobalPositions(origin) {
    var localWaypointPosition;
    return this.globalWaypointPositions = function () {
      var i, len, ref, results;
      ref = this.localWaypointPositions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        localWaypointPosition = ref[i];
        results.push(localWaypointPosition.clone().add(origin));
      }
      return results;
    }.call(this);
  }
  distance() {
    var i, len, localWaypointPosition, ref, waypointIndex;
    if (this._distance != null) {
      return this._distance;
    }
    if (!this.localWaypointPositions.length) {
      this._distance = this.startPoint.localPosition.manhattanDistanceTo(this.endPoint.localPosition);
      return this._distance;
    }
    this._distance = this.startPoint.localPosition.manhattanDistanceTo(this.localWaypointPositions[0]);
    ref = this.localWaypointPositions;
    for (waypointIndex = i = 0, len = ref.length; i < len; waypointIndex = ++i) {
      localWaypointPosition = ref[waypointIndex];
      if (waypointIndex < this.localWaypointPositions.length - 1) {
        this._distance += localWaypointPosition.manhattanDistanceTo(this.localWaypointPositions[waypointIndex + 1]);
      }
    }
    return this._distance += this.localWaypointPositions[this.localWaypointPositions.length - 1].manhattanDistanceTo(this.endPoint.localPosition);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"taskpoint.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/taskpoint.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.TaskPoint = class TaskPoint extends StudyPlan.ConnectionPoint {
  constructor() {
    super(...arguments);
    this.level = null;
    this.groupNumber = null;
    this.predecessors = [];
    this.tiles = [];
  }
  initializeTask(task, goalNode) {
    this.task = task;
    this.goalNode = goalNode;
    this._createConnectionPoints();
    this.entryPoint.requiredInterests.push(...this.task.requiredInterests());
    this.providedInterests.push(...this.task.interests());
    if (this.providedInterests.length) {
      this.taskExitPoint = StudyPlan.ConnectionPoint.createLocal(this.goalNode);
      this.taskExitPoint.taskPoint = this;
      new StudyPlan.Pathway(this, this.taskExitPoint, this.goalNode);
      new StudyPlan.Pathway(this.taskExitPoint, this.exitPoint, this.goalNode);
    }
    this.groupNumber = this.task.groupNumber();
    return this.level = this.task.level();
  }
  initializeEndTask(goalNode) {
    this.goalNode = goalNode;
    this._createConnectionPoints();
    return this.endTask = true;
  }
  initializeDummyTask(goalNode) {
    this.goalNode = goalNode;
    return this._createConnectionPoints();
  }
  _createConnectionPoints() {
    this.entryPoint = StudyPlan.ConnectionPoint.createLocal(this.goalNode);
    this.entryPoint.taskPoint = this;
    this.exitPoint = StudyPlan.ConnectionPoint.createLocal(this.goalNode);
    this.exitPoint.taskPoint = this;
    return new StudyPlan.Pathway(this.entryPoint, this.exitPoint, this.goalNode);
  }
  setPositionX(x) {
    var ref;
    this.localPosition.x = x;
    this.entryPoint.localPosition.x = x - 1;
    if ((ref = this.taskExitPoint) != null) {
      ref.localPosition.x = x;
    }
    return this.exitPoint.localPosition.x = x + 1;
  }
  setPositionY(y) {
    var ref;
    this.localPosition.y = y;
    this.entryPoint.localPosition.y = y + 1;
    if ((ref = this.taskExitPoint) != null) {
      ref.localPosition.y = y + 1;
    }
    return this.exitPoint.localPosition.y = y + 1;
  }
  clone(newGoalNode, getConnectionPointClone) {
    var taskPoint;
    taskPoint = super.clone(...arguments);
    taskPoint.task = this.task;
    taskPoint.endTask = this.endTask;
    taskPoint.tiles = this.tiles;
    taskPoint.entryPoint = getConnectionPointClone(this.entryPoint);
    taskPoint.entryPoint.taskPoint = taskPoint;
    if (this.taskExitPoint) {
      taskPoint.taskExitPoint = getConnectionPointClone(this.taskExitPoint);
      taskPoint.taskExitPoint.taskPoint = taskPoint;
    }
    taskPoint.exitPoint = getConnectionPointClone(this.exitPoint);
    taskPoint.exitPoint.taskPoint = taskPoint;
    this.entryPoint.outgoingPathways[0].clone(taskPoint.entryPoint, taskPoint.exitPoint, newGoalNode);
    if (this.outgoingPathways[0]) {
      this.outgoingPathways[0].clone(taskPoint, taskPoint.taskExitPoint, newGoalNode);
      this.taskExitPoint.outgoingPathways[0].clone(taskPoint.taskExitPoint, taskPoint.exitPoint, newGoalNode);
    }
    return taskPoint;
  }
  calculateGlobalPosition(origin) {
    var ref;
    super.calculateGlobalPosition(...arguments);
    this.entryPoint.calculateGlobalPosition(origin);
    if ((ref = this.taskExitPoint) != null) {
      ref.calculateGlobalPosition(origin);
    }
    return this.exitPoint.calculateGlobalPosition(origin);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tilemap.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/tilemap.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  IL,
  LOI,
  PAA,
  StudyPlan,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.TileMap = class TileMap {
  constructor() {
    this.map = {};
    this.tiles = [];
    this.minX = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
    this.minY = Number.POSITIVE_INFINITY;
    this.maxY = Number.NEGATIVE_INFINITY;
  }
  getTile(x, y) {
    var base, ref, tile;
    if (!(tile = (ref = this.map[x]) != null ? ref[y] : void 0)) {
      tile = new this.constructor.Tile(x, y);
      if ((base = this.map)[x] == null) {
        base[x] = {};
      }
      this.map[x][y] = tile;
      this.tiles.push(tile);
      this.minX = Math.min(this.minX, x);
      this.maxX = Math.max(this.maxX, x);
      this.minY = Math.min(this.minY, y);
      this.maxY = Math.max(this.maxY, y);
    }
    return tile;
  }
  getTileType(x, y) {
    var ref;
    if (!((ref = this.map[x]) != null ? ref[y] : void 0)) {
      return;
    }
    return this.map[x][y].type;
  }
  tileFilled(x, y) {
    var ref;
    return ((ref = this.map[x]) != null ? ref[y] : void 0) != null && this.map[x][y].type !== this.constructor.Tile.Types.BlueprintEdge;
  }
  placeTile(x, y, type) {
    let horizontalBlueprintNeighbors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    let verticalBlueprintNeighbors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var bottomNeighbor, leftNeighbor, ref, rightNeighbor, tile, topNeighbor;
    tile = this.getTile(x, y);
    if ((ref = tile.type) === this.constructor.Tile.Types.Building || ref === this.constructor.Tile.Types.Flag || ref === this.constructor.Tile.Types.Gate || ref === this.constructor.Tile.Types.Sidewalk || ref === this.constructor.Tile.Types.Road) {
      // Don't replace structures and pathways.
      return tile;
    }

    // Placing a tile places that tile to the target and blueprints around it.
    tile.type = type;
    if (horizontalBlueprintNeighbors) {
      leftNeighbor = this.getTile(x - 1, y);
      if (leftNeighbor.type == null) {
        leftNeighbor.type = this.constructor.Tile.Types.Blueprint;
      }
      rightNeighbor = this.getTile(x + 1, y);
      if (rightNeighbor.type == null) {
        rightNeighbor.type = this.constructor.Tile.Types.Blueprint;
      }
    }
    if (verticalBlueprintNeighbors) {
      topNeighbor = this.getTile(x, y - 1);
      if (topNeighbor.type == null) {
        topNeighbor.type = this.constructor.Tile.Types.Blueprint;
      }
      bottomNeighbor = this.getTile(x, y + 1);
      if (bottomNeighbor.type == null) {
        bottomNeighbor.type = this.constructor.Tile.Types.Blueprint;
      }
    }
    return tile;
  }
  placeExpansionPoint(x, y, direction, goalIds, connectionPointOptions) {
    var tile;
    tile = this.getTile(x, y);
    tile.type = this.constructor.Tile.Types.ExpansionPoint;
    tile.expansionDirection = direction;
    tile.goalIds = goalIds;
    return tile.connectionPoint = connectionPointOptions;
  }
  placeRoad(pathway) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var coordinate, end, endCoordinate, i, j, k, len, offset, ref, ref1, ref2, ref3, start, startCoordinate, tile, type, vertical, waypointIndex, waypoints, x, y;
    if (options.useGlobalPositions) {
      waypoints = [pathway.startPoint.globalPosition, ...pathway.globalWaypointPositions, pathway.endPoint.globalPosition];
    } else {
      waypoints = [pathway.startPoint.localPosition, ...pathway.localWaypointPositions, pathway.endPoint.localPosition];
    }
    if (options.accessRoad) {
      waypoints = _.reverse(waypoints);
    }
    type = this.constructor.Tile.Types.Road;
    for (waypointIndex = i = 0, ref = waypoints.length - 1; 0 <= ref ? i < ref : i > ref; waypointIndex = 0 <= ref ? ++i : --i) {
      start = waypoints[waypointIndex];
      end = waypoints[waypointIndex + 1];
      if (start.x === end.x) {
        vertical = true;
        startCoordinate = start.y;
        endCoordinate = end.y;
      } else if (start.y === end.y) {
        vertical = false;
        startCoordinate = start.x;
        endCoordinate = end.x;
      } else {
        console.warn("Pathway has diagonal sections.", pathway, waypoints);
        continue;
      }
      for (coordinate = j = ref1 = startCoordinate, ref2 = endCoordinate; ref1 <= ref2 ? j <= ref2 : j >= ref2; coordinate = ref1 <= ref2 ? ++j : --j) {
        ref3 = [-1, 0, 1];
        for (k = 0, len = ref3.length; k < len; k++) {
          offset = ref3[k];
          x = vertical ? start.x + offset : coordinate;
          y = vertical ? coordinate : start.y + offset;
          if (offset === 0) {
            tile = this.getTile(x, y);
            if (options.accessRoad && tile.type === this.constructor.Tile.Types.Road) {
              type = this.constructor.Tile.Types.Sidewalk;
            }
            this.placeTile(x, y, type, vertical && !options.noBlueprint, !vertical && !options.noBlueprint);
            if (options.solidLines) {
              if (tile.roadMarkingStyles == null) {
                tile.roadMarkingStyles = [];
              }
              tile.roadMarkingStyles.push('solid-lines');
            }
          } else if (!options.noGround) {
            this.placeTile(x, y, this.constructor.Tile.Types.Ground, vertical && !options.noBlueprint, !vertical && !options.noBlueprint);
          }
        }
        if (coordinate === startCoordinate && waypointIndex && !options.noGround) {
          this.placeTile(start.x - 1, start.y - 1, this.constructor.Tile.Types.Ground);
          this.placeTile(start.x + 1, start.y - 1, this.constructor.Tile.Types.Ground);
          this.placeTile(start.x - 1, start.y + 1, this.constructor.Tile.Types.Ground);
          this.placeTile(start.x + 1, start.y + 1, this.constructor.Tile.Types.Ground);
        }
      }
    }
  }

  // Explicit return to avoid result collection.
  finishConstruction() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var down, downLeft, downRight, filledTile, filledTiles, i, j, k, l, left, len, len1, len2, len3, len4, m, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, right, tile, up, upLeft, upRight, x, xOffset, y, yOffset;
    ref = this.tiles;
    // Determine road neighbors.
    for (i = 0, len = ref.length; i < len; i++) {
      tile = ref[i];
      if (!(tile.type === this.constructor.Tile.Types.Road)) {
        continue;
      }
      x = tile.position.x;
      y = tile.position.y;
      left = ((ref1 = this.map[x - 1]) != null ? (ref2 = ref1[y]) != null ? ref2.type : void 0 : void 0) === this.constructor.Tile.Types.Road;
      right = ((ref3 = this.map[x + 1]) != null ? (ref4 = ref3[y]) != null ? ref4.type : void 0 : void 0) === this.constructor.Tile.Types.Road;
      up = ((ref5 = this.map[x]) != null ? (ref6 = ref5[y - 1]) != null ? ref6.type : void 0 : void 0) === this.constructor.Tile.Types.Road;
      down = ((ref7 = this.map[x]) != null ? (ref8 = ref7[y + 1]) != null ? ref8.type : void 0 : void 0) === this.constructor.Tile.Types.Road;
      tile.roadNeighbors = {
        left,
        right,
        up,
        down
      };
      tile.intersection = _.sumBy([left, right, up, down], neighbor => {
        if (neighbor) {
          return 1;
        } else {
          return 0;
        }
      }) > 2;
    }
    ref9 = this.tiles;

    // Add road marking styles.
    for (j = 0, len1 = ref9.length; j < len1; j++) {
      tile = ref9[j];
      if (!(tile.type === this.constructor.Tile.Types.Road)) {
        continue;
      }
      x = tile.position.x;
      y = tile.position.y;
      if (tile.roadMarkingStyles == null) {
        tile.roadMarkingStyles = [];
      }
      if (options.onlySolidRoadLines) {
        if (indexOf.call(tile.roadMarkingStyles, 'solid-lines') < 0) {
          tile.roadMarkingStyles.push('solid-lines');
        }
      } else {
        if ((tile.roadNeighbors.up || tile.roadNeighbors.down) && !tile.roadNeighbors.left && !tile.roadNeighbors.right) {
          tile.roadMarkingStyles.push("vertical-lines-".concat(_.modulo(tile.position.y, 3)));
        }
      }
      if (tile.intersection) {
        tile.roadMarkingStyles.push('intersection');
      }
      if (tile.roadNeighbors.left && this.map[x - 1][y].intersection) {
        tile.roadMarkingStyles.push('intersection-left');
      }
      if (tile.roadNeighbors.right && this.map[x + 1][y].intersection) {
        tile.roadMarkingStyles.push('intersection-right');
      }
      if (tile.roadNeighbors.up && this.map[x][y - 1].intersection) {
        tile.roadMarkingStyles.push('intersection-up');
      }
      if (tile.roadNeighbors.down && this.map[x][y + 1].intersection) {
        tile.roadMarkingStyles.push('intersection-down');
      }
    }
    // Place blueprint edges.
    if (options.noBlueprintEdges) {
      return;
    }
    filledTiles = _.clone(this.tiles);
    for (k = 0, len2 = filledTiles.length; k < len2; k++) {
      filledTile = filledTiles[k];
      ref10 = [-1, 0, 1];
      for (l = 0, len3 = ref10.length; l < len3; l++) {
        xOffset = ref10[l];
        ref11 = [-1, 0, 1];
        // Edges are those neighbors of filled tiles that are empty.
        for (m = 0, len4 = ref11.length; m < len4; m++) {
          yOffset = ref11[m];
          x = filledTile.position.x + xOffset;
          y = filledTile.position.y + yOffset;
          if (this.tileFilled(x, y)) {
            continue;
          }
          upLeft = this.tileFilled(x - 1, y - 1);
          up = this.tileFilled(x, y - 1);
          upRight = this.tileFilled(x + 1, y - 1);
          left = this.tileFilled(x - 1, y);
          right = this.tileFilled(x + 1, y);
          downLeft = this.tileFilled(x - 1, y + 1);
          down = this.tileFilled(x, y + 1);
          downRight = this.tileFilled(x + 1, y + 1);
          tile = this.getTile(x, y);
          tile.type = this.constructor.Tile.Types.BlueprintEdge;
          tile.edgeDirections = {
            left: upRight || right || downRight,
            right: upLeft || left || downLeft,
            up: downLeft || down || downRight,
            down: upLeft || up || upRight
          };

          // Opposite openings cancel each other.
          if (tile.edgeDirections.left && tile.edgeDirections.right) {
            tile.edgeDirections.left = false;
            tile.edgeDirections.right = false;
          }
          if (tile.edgeDirections.up && tile.edgeDirections.down) {
            tile.edgeDirections.up = false;
            tile.edgeDirections.down = false;
          }

          // If there are no edges left, we're inside of a hole and we should fill it.
          if (!(tile.edgeDirections.left || tile.edgeDirections.right || tile.edgeDirections.up || tile.edgeDirections.down)) {
            tile.type = left === this.constructor.Tile.Types.Ground && right === this.constructor.Tile.Types.Ground ? this.constructor.Tile.Types.Ground : this.constructor.Tile.Types.Blueprint;
            tile.edgeDirections = null;
          }
        }
      }
    }
  }
};

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tile.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/tile.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.TileMap.Tile = function () {
  class Tile {
    constructor(x, y) {
      this.position = new THREE.Vector2(x, y);
    }
  }
  ;
  Tile.Types = {
    BlueprintEdge: 'BlueprintEdge',
    Blueprint: 'Blueprint',
    Ground: 'Ground',
    Sidewalk: 'Sidewalk',
    Road: 'Road',
    Building: 'Building',
    Gate: 'Gate',
    Flag: 'Flag',
    ExpansionPoint: 'ExpansionPoint'
  };
  Tile.ExpansionDirections = {
    Forward: 'Forward',
    ForwardDown: 'ForwardDown',
    Backwards: 'Backwards',
    Sideways: 'Sideways'
  };
  return Tile;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interfacemarking.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/interfacemarking.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Atari2600, LOI, Markup, PAA, StudyPlan;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
Markup = PAA.Practice.Helpers.Drawing.Markup;
Atari2600 = LOI.Assets.Palette.Atari2600;
StudyPlan.InterfaceMarking = class InterfaceMarking {
  static defaultStyle() {
    var markupColor, palette;
    palette = LOI.palette();
    markupColor = palette.color(Atari2600.hues.aqua, 5);
    return "#".concat(markupColor.getHexString());
  }
  static textBase() {
    return {
      size: 5,
      lineHeight: 7,
      font: 'Small Print Retronator',
      style: this.defaultStyle(),
      align: Markup.TextAlign.Center
    };
  }
  static arrowBase() {
    return {
      arrow: {
        end: true,
        width: 6,
        length: 3
      },
      style: this.defaultStyle()
    };
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/instructions.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, IL, InstructionsSystem, InterfaceMarking, LOI, Markup, PAA, StudyPlan;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
InterfaceMarking = StudyPlan.InterfaceMarking;
StudyPlan.Instructions = function () {
  class Instructions {}
  ;
  Instructions.Instruction = class Instruction extends PAA.Tutorials.Planning.Instructions.Instruction {
    static activeDisplayState() {
      // We only have markup without a message.
      return InstructionsSystem.DisplayState.Hidden;
    }
    getBlueprintWhenNoInfoIsVisible() {
      var studyPlan;
      if (!(studyPlan = this.getStudyPlan())) {
        return;
      }
      if (!studyPlan.isCreated()) {
        return;
      }
      if (studyPlan.modalWindowDisplayed()) {
        return;
      }
      if (studyPlan.highlightedTaskId()) {
        return;
      }
      return this.getBlueprint();
    }
  };
  Instructions.Choices = function () {
    class Choices extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.PixelPad.Apps.StudyPlan.Instructions.Choices";
      }
      static delayDuration() {
        return 2;
      }
      activeConditions() {
        var blueprint;
        if (!(blueprint = this.getBlueprintWhenNoInfoIsVisible())) {
          return;
        }

        // Show when helpers and pixel art software challenge are not completed.
        if (PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.Helpers.completed() || PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.CopyReference.completed()) {
          return;
        }

        // Wait until the map is revealed.
        return blueprint.initialRevealCompleted();
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: "[data-goalid='".concat(PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.id(), "']"),
            trackTarget: true,
            bounds: {
              x: -60,
              y: -70,
              width: 300,
              height: 100
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                style: markupStyle,
                points: [{
                  x: 20,
                  y: -40
                }, {
                  bezierControlPoints: [{
                    x: 20,
                    y: -35
                  }, {
                    x: 25,
                    y: -27
                  }],
                  x: 30,
                  y: -22
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 20,
                  y: -45,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "完成可选教程",
                align: Markup.TextAlign.Center
              })
            }, {
              line: _.extend({}, arrowBase, {
                style: markupStyle,
                points: [{
                  x: 87,
                  y: -30
                }, {
                  bezierControlPoints: [{
                    x: 80,
                    y: -30
                  }, {
                    x: 72,
                    y: -23
                  }],
                  x: 72,
                  y: -13
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 90,
                  y: -30,
                  origin: Markup.TextOriginPosition.MiddleLeft
                },
                value: "Skip directly to the challenge",
                align: Markup.TextAlign.Left
              })
            }]
          }
        }];
      }
    }
    ;
    Choices.initialize();
    return Choices;
  }.call(this);
  Instructions.Completing = function () {
    class Completing extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.PixelPad.Apps.StudyPlan.Instructions.Completing";
      }
      static delayDuration() {
        return 2;
      }
      constructor() {
        super(...arguments);
        this.flagChangedCount = new ReactiveField(0);
        this._flagChangedAutorun = new Tracker.autorun(computation => {
          var flagRaised, flagTile;
          if (!(flagTile = this.getFlagTile())) {
            return;
          }
          if (!this.activeConditions()) {
            return;
          }
          flagRaised = flagTile.flagRaised();
          if (this._flagRaised == null) {
            this._flagRaised = flagRaised;
            return;
          }
          if (flagRaised === this._flagRaised) {
            return;
          }
          this._flagRaised = flagRaised;
          return this.flagChangedCount(this.flagChangedCount() + 1);
        });
      }
      destroy() {
        super.destroy(...arguments);
        return this._flagChangedAutorun.stop();
      }
      activeConditions() {
        var blueprint, flagTile, tiles;
        if (!(blueprint = this.getBlueprintWhenNoInfoIsVisible())) {
          return;
        }

        // Show after Pixel art software is completed and until the Elements of art goal is added.
        if (!PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.completed()) {
          return;
        }
        if (StudyPlan.hasGoal(LM.PixelArtFundamentals.Fundamentals.Goals.ElementsOfArt)) {
          return;
        }

        // If the Pixel art Software is fully completed and marked complete and the Snake goal is added,
        // don't show this anymore, so the instruction for adding the next goal kicks in.
        if (PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.allCompleted() && StudyPlan.isGoalMarkedComplete(PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware) && PAA.LearnMode.Intro.Tutorial.Goals.Snake.completed()) {
          return;
        }
        // Wait for the flag tile to be revealed.
        if (!(flagTile = this.getFlagTile())) {
          return;
        }
        if (!flagTile.revealed()) {
          return;
        }
        if (!StudyPlan.hasGoal(PAA.LearnMode.Intro.Tutorial.Goals.Snake)) {
          // Wait for the expansion tile to be placed.
          if (!blueprint.roadTileMapComponent.isCreated()) {
            return;
          }
          if (!(tiles = blueprint.roadTileMapComponent.nonBlueprintTiles())) {
            return;
          }
          if (!_.find(tiles, tile => {
            return tile.data.type === StudyPlan.TileMap.Tile.Types.ExpansionPoint;
          })) {
            return;
          }
        }
        return true;
      }
      getFlagTile() {
        var pixelArtSoftwareGoalComponent, tiles;
        if (!(pixelArtSoftwareGoalComponent = this.getGoalComponent(PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware))) {
          return;
        }
        if (!(tiles = pixelArtSoftwareGoalComponent.tileMapComponent.nonBlueprintTiles())) {
          return;
        }
        return _.find(tiles, tile => {
          return tile.data.type === StudyPlan.TileMap.Tile.Types.Flag;
        });
      }
      markup() {
        var arrowBase, flagText, markedComplete, markup, markupStyle, pixelArtSoftware, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        markup = [];

        // Add text for the flag.
        pixelArtSoftware = PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.getAdventureInstance();
        markedComplete = StudyPlan.isGoalMarkedComplete(pixelArtSoftware);
        if (this.flagChangedCount() < 2) {
          if (pixelArtSoftware.allCompleted()) {
            if (!markedComplete) {
              flagText = "Click on the flagpole to\nmark this goal complete";
            }
          } else {
            if (markedComplete) {
              flagText = "Click on the flag to\nshow tasks in the to-do list again";
            } else {
              flagText = "Click on the flagpole to\nremove optional tutorials from your to-do list";
            }
          }
          if (flagText) {
            markup.push({
              interface: {
                selector: "[data-goalid='".concat(PAA.LearnMode.Intro.Tutorial.Goals.PixelArtSoftware.id(), "'] .tile.flag.revealed"),
                trackTarget: true,
                bounds: {
                  x: -90,
                  y: -70,
                  width: 200,
                  height: 60
                },
                markings: [{
                  line: _.extend({}, arrowBase, {
                    style: markupStyle,
                    points: [{
                      x: 8,
                      y: -45
                    }, {
                      bezierControlPoints: [{
                        x: 5,
                        y: -35
                      }, {
                        x: 5,
                        y: -25
                      }],
                      x: 5,
                      y: -15
                    }]
                  }),
                  text: _.extend({}, textBase, {
                    position: {
                      x: 10,
                      y: -50,
                      origin: Markup.TextOriginPosition.BottomCenter
                    },
                    value: flagText,
                    align: Markup.TextAlign.Center
                  })
                }]
              }
            });
          }
        }

        // Add text for adding a goal.
        if (!(StudyPlan.hasGoal(PAA.LearnMode.Intro.Tutorial.Goals.Snake) || this.getStudyPlan().addGoalOptions())) {
          markup.push({
            interface: {
              selector: ".tile.expansion-point",
              trackTarget: true,
              bounds: {
                x: 0,
                y: -50,
                width: 120,
                height: 60
              },
              markings: [{
                line: _.extend({}, arrowBase, {
                  style: markupStyle,
                  points: [{
                    x: 60,
                    y: -15
                  }, {
                    bezierControlPoints: [{
                      x: 60,
                      y: -5
                    }, {
                      x: 40,
                      y: 0
                    }],
                    x: 28,
                    y: 0
                  }]
                }),
                text: _.extend({}, textBase, {
                  position: {
                    x: 60,
                    y: -20,
                    origin: Markup.TextOriginPosition.BottomCenter
                  },
                  value: "点击箭头\n继续下一个目标",
                  align: Markup.TextAlign.Center
                })
              }]
            }
          });
        }
        return markup;
      }
    }
    ;
    Completing.initialize();
    return Completing;
  }.call(this);
  Instructions.ExpansionPointInstruction = class ExpansionPointInstruction extends Instructions.Instruction {
    static delayDuration() {
      return this.defaultDelayDuration;
    }
    hasExpansionPointInDirectionWithGoalType(expansionDirection, goalType) {
      var blueprint, goalId, i, j, len, len1, ref, ref1, tile, tiles;
      if (!(blueprint = this.getBlueprintWhenNoInfoIsVisible())) {
        return;
      }

      // Show until add new goal is selected.
      if (this.getStudyPlan().addGoalOptions()) {
        return;
      }

      // Show after Snake goal is completed.
      if (!LM.Intro.Tutorial.Goals.Snake.completed()) {
        return;
      }

      // Wait for the expansion tile to be placed.
      if (!blueprint.roadTileMapComponent.isCreated()) {
        return;
      }
      if (!(tiles = blueprint.roadTileMapComponent.nonBlueprintTiles())) {
        return;
      }
      tiles = _.filter(tiles, tile => {
        return tile.data.type === StudyPlan.TileMap.Tile.Types.ExpansionPoint && tile.data.expansionDirection === expansionDirection;
      });
      for (i = 0, len = tiles.length; i < len; i++) {
        tile = tiles[i];
        if (!tile.data.connectionPoint) {
          continue;
        }
        if (StudyPlan.getGoalType((ref = tile.data.connectionPoint) != null ? ref.goalId : void 0) === StudyPlan.GoalTypes.MidTerm) {
          // Skip expansion points from mid-term goals.
          continue;
        }
        ref1 = _.flatten(tile.data.goalIds);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          goalId = ref1[j];
          if (StudyPlan.getGoalType(goalId) === goalType) {
            return true;
          }
        }
      }
      return false;
    }
  };
  Instructions.ForwardShortTerm = function () {
    class ForwardShortTerm extends Instructions.ExpansionPointInstruction {
      static id() {
        return "PixelArtAcademy.PixelPad.Apps.StudyPlan.Instructions.ForwardShortTerm";
      }
      activeConditions() {
        return this.hasExpansionPointInDirectionWithGoalType(StudyPlan.GoalConnectionDirections.Forward, StudyPlan.GoalTypes.ShortTerm);
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".expansion-point.forward.short-term",
            trackTarget: true,
            bounds: {
              x: 0,
              y: -50,
              width: 120,
              height: 60
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                style: markupStyle,
                points: [{
                  x: 60,
                  y: -12
                }, {
                  bezierControlPoints: [{
                    x: 60,
                    y: -2
                  }, {
                    x: 40,
                    y: 3
                  }],
                  x: 28,
                  y: 3
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 60,
                  y: -17,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "添加新目标\n以继续",
                align: Markup.TextAlign.Center
              })
            }]
          }
        }];
      }
    }
    ;
    ForwardShortTerm.initialize();
    return ForwardShortTerm;
  }.call(this);
  Instructions.SidewaysShortTerm = function () {
    class SidewaysShortTerm extends Instructions.ExpansionPointInstruction {
      static id() {
        return "PixelArtAcademy.PixelPad.Apps.StudyPlan.Instructions.SidewaysShortTerm";
      }
      activeConditions() {
        return this.hasExpansionPointInDirectionWithGoalType(StudyPlan.GoalConnectionDirections.Sideways, StudyPlan.GoalTypes.ShortTerm);
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".expansion-point.sideways.short-term",
            trackTarget: true,
            bounds: {
              x: -60,
              y: -50,
              width: 120,
              height: 60
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                style: markupStyle,
                points: [{
                  x: -15,
                  y: -30
                }, {
                  bezierControlPoints: [{
                    x: -15,
                    y: -25
                  }, {
                    x: -10,
                    y: -17
                  }],
                  x: -5,
                  y: -12
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: -15,
                  y: -35,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "You can now continue to\na new goal in parallel",
                align: Markup.TextAlign.Center
              })
            }]
          }
        }];
      }
    }
    ;
    SidewaysShortTerm.initialize();
    return SidewaysShortTerm;
  }.call(this);
  Instructions.ForwardMidTerm = function () {
    class ForwardMidTerm extends Instructions.ExpansionPointInstruction {
      static id() {
        return "PixelArtAcademy.PixelPad.Apps.StudyPlan.Instructions.ForwardMidTerm";
      }
      activeConditions() {
        return this.hasExpansionPointInDirectionWithGoalType(StudyPlan.GoalConnectionDirections.Forward, StudyPlan.GoalTypes.MidTerm);
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".expansion-point.forward.mid-term",
            trackTarget: true,
            bounds: {
              x: 0,
              y: -50,
              width: 120,
              height: 60
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                style: markupStyle,
                points: [{
                  x: 60,
                  y: -12
                }, {
                  bezierControlPoints: [{
                    x: 60,
                    y: -2
                  }, {
                    x: 40,
                    y: 3
                  }],
                  x: 28,
                  y: 3
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 60,
                  y: -17,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "See what goals you can\ncontinue to after",
                align: Markup.TextAlign.Center
              })
            }]
          }
        }];
      }
    }
    ;
    ForwardMidTerm.initialize();
    return ForwardMidTerm;
  }.call(this);
  Instructions.SidewaysMidTerm = function () {
    class SidewaysMidTerm extends Instructions.ExpansionPointInstruction {
      static id() {
        return "PixelArtAcademy.PixelPad.Apps.StudyPlan.Instructions.SidewaysMidTerm";
      }
      activeConditions() {
        return this.hasExpansionPointInDirectionWithGoalType(StudyPlan.GoalConnectionDirections.Sideways, StudyPlan.GoalTypes.MidTerm);
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".expansion-point.sideways.mid-term",
            trackTarget: true,
            bounds: {
              x: 0,
              y: -70,
              width: 120,
              height: 60
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                style: markupStyle,
                points: [{
                  x: 27,
                  y: -25
                }, {
                  bezierControlPoints: [{
                    x: 20,
                    y: -25
                  }, {
                    x: 15,
                    y: -20
                  }],
                  x: 10,
                  y: -15
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 30,
                  y: -25,
                  origin: Markup.TextOriginPosition.MiddleLeft
                },
                value: "You can plan ahead\nand add a goal in parallel",
                align: Markup.TextAlign.Left
              })
            }]
          }
        }];
      }
    }
    ;
    SidewaysMidTerm.initialize();
    return SidewaysMidTerm;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"addgoal":{"addgoal.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/addgoal/addgoal.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  AM,
  IL,
  LOI,
  PAA,
  StudyPlan,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.AddGoal = function () {
  class AddGoal extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.AddGoal';
    }
    constructor(studyPlan) {
      super(...arguments);
      this.studyPlan = studyPlan;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.availableGoals = new ComputedField(() => {
        var goalIds, ref;
        if (!(goalIds = (ref = this.studyPlan.addGoalOptions()) != null ? ref.goalIds : void 0)) {
          return;
        }

        // Sideways goals can be sent as an array per index.
        goalIds = _.flatten(goalIds);
        return _.filter(this.studyPlan.goals(), goal => {
          var ref1;
          return ref1 = goal.id(), indexOf.call(goalIds, ref1) >= 0;
        });
      });
      this.accomplishedGoals = new ComputedField(() => {
        return _.filter(this.availableGoals(), goal => {
          return goal.allCompleted();
        });
      });
      this.unacomplishedGoals = new ComputedField(() => {
        return _.difference(this.availableGoals(), this.accomplishedGoals());
      });
      this.shortTermGoals = new ComputedField(() => {
        return _.filter(this.unacomplishedGoals(), goal => {
          return StudyPlan.getGoalType(goal) === StudyPlan.GoalTypes.ShortTerm;
        });
      });
      return this.midTermGoals = new ComputedField(() => {
        return _.difference(this.unacomplishedGoals(), this.shortTermGoals());
      });
    }
    sourceGoalIsMidTerm() {
      var ref, sourceGoalId;
      if (!(sourceGoalId = (ref = this.studyPlan.addGoalOptions()) != null ? ref.sourceGoalId : void 0)) {
        return;
      }
      return StudyPlan.getGoalType(sourceGoalId) === StudyPlan.GoalTypes.MidTerm;
    }
    showAccomplishedGoals() {
      return this.accomplishedGoals().length;
    }
    showShortTermGoals() {
      return this.shortTermGoals().length;
    }
    showMidTermGoals() {
      return this.midTermGoals().length;
    }
    events() {
      return super.events(...arguments).concat({
        'click .goal': this.onClickGoal
      });
    }
    onClickGoal(event) {
      var addGoalOptions, goal, sidewaysIndex;
      goal = this.currentData();
      addGoalOptions = {
        goal
      };

      // If sideways goals are sent as an array per index, determine which index was chosen.
      sidewaysIndex = _.findIndex(this.studyPlan.addGoalOptions().goalIds, goalIdEntry => {
        var ref;
        return _.isArray(goalIdEntry) && (ref = goal.id(), indexOf.call(goalIdEntry, ref) >= 0);
      });
      if (sidewaysIndex >= 0) {
        addGoalOptions.sidewaysIndex = sidewaysIndex;
      }
      return this.studyPlan.addGoal(addGoalOptions);
    }
  }
  ;
  AddGoal.register(AddGoal.id());
  return AddGoal;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.addgoal.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/addgoal/template.addgoal.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.AddGoal");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.AddGoal"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.AddGoal", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-studyplan-addgoal"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("sourceGoalIsMidTerm"));
  }, function() {
    return HTML.Raw('\n      <p class="explanation">\n        先完成这个目标才能提前规划。\n      </p>\n    ');
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showAccomplishedGoals"));
    }, function() {
      return [ HTML.Raw('\n        <h1 class="header">\n          添加已完成的目标\n        </h1>\n        <p class="explanation">\n          已完成的目标是您已经全部完成的目标。\n        </p>\n        '), HTML.UL({
        class: "goals"
      }, "\n          ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("accomplishedGoals"));
      }, function() {
        return [ "\n            ", HTML.LI({
          class: "goal"
        }, "\n              ", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("displayNameTranslation"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), "\n            "), "\n          " ];
      }), "\n        "), "\n      " ];
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showShortTermGoals"));
    }, function() {
      return [ HTML.Raw('\n        <h1 class="header">\n          添加短期目标\n        </h1>\n        <p class="explanation">\n          短期目标是可以立即着手完成的目标。\n        </p>\n        '), HTML.UL({
        class: "goals"
      }, "\n          ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("shortTermGoals"));
      }, function() {
        return [ "\n            ", HTML.LI({
          class: "goal"
        }, "\n              ", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("displayNameTranslation"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), "\n            "), "\n          " ];
      }), "\n        "), "\n      " ];
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showMidTermGoals"));
    }, function() {
      return [ HTML.Raw('\n        <h1 class="header">\n          添加中期目标\n        </h1>\n        <p class="explanation">\n          中期目标是提前规划的目标。\n        </p>\n        '), HTML.UL({
        class: "goals"
      }, "\n          ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("midTermGoals"));
      }, function() {
        return [ "\n            ", HTML.LI({
          class: "goal"
        }, "\n              ", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("displayNameTranslation"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), "\n            "), "\n          " ];
      }), "\n        "), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"goalsearch":{"goalsearch.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/goalsearch/goalsearch.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AC,
  AM,
  IL,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Babel;
AC = Artificial.Control;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
PAA.PixelPad.Apps.StudyPlan.GoalSearch = function () {
  class GoalSearch extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalSearch';
    }
    constructor(studyPlan) {
      super(...arguments);
      this.studyPlan = studyPlan;
    }
    onCreated() {
      super.onCreated(...arguments);
      // Instantiate all goals.
      this._goals = [];
      this.goals = new ComputedField(() => {
        var goal, goalClass, i, len, ref;
        ref = this._goals;
        for (i = 0, len = ref.length; i < len; i++) {
          goal = ref[i];
          goal.destroy();
        }
        this._goals = function () {
          var j, len1, ref1, results;
          ref1 = PAA.Learning.Goal.getClasses();
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            goalClass = ref1[j];
            results.push(new goalClass());
          }
          return results;
        }();
        return this._goals;
      });
      this.interestSearchTerm = new ReactiveField('');
      this.goalsWithInterest = new ComputedField(() => {
        var searchTerm;
        if (!(searchTerm = _.lowerCase(this.interestSearchTerm()))) {
          return;
        }
        return _.filter(this.goals(), goal => {
          var i, interest, interestDocument, len, ref;
          ref = goal.interests();
          // See if any of goal's interests matches the searched interest.
          for (i = 0, len = ref.length; i < len; i++) {
            interest = ref[i];
            if (!(interestDocument = IL.Interest.find(interest))) {
              // Find the interest document and see if our search term matches its interests. If we can't find
              // the interest it's because the interest isn't matching the term so we're not subscribed to it.
              continue;
            }
            if (indexOf.call(interestDocument.searchTerms, searchTerm) >= 0) {
              return true;
            }
          }
          return false;
        });
      });
      // Subscribe to interests.
      this.autorun(computation => {
        var interestSearchTerm;
        interestSearchTerm = this.interestSearchTerm();
        IL.Interest.forSearchTerm.subscribeContent(this, interestSearchTerm);
        return IL.Interest.forSearchTerm.subscribe(this, interestSearchTerm);
      });
      this.autocompleteInterests = new ComputedField(() => {
        var ref;
        return (ref = IL.Interest.forSearchTerm.query(this.interestSearchTerm())) != null ? ref.fetch() : void 0;
      });
      this.activeAutocompleteInterest = new ReactiveField(null);
      return this.interestsSearchInputFocused = new ReactiveField(false);
    }
    onDestroyed() {
      var goal, i, len, ref, results;
      ref = this._goals;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        goal = ref[i];
        results.push(goal.destroy());
      }
      return results;
    }
    setInterest(interest) {
      var name;
      name = AB.translate(interest.name).text;
      this.interestSearchTerm(name);
      return this.$('.interests .search .input').blur();
    }
    autocompleteInterestActiveClass() {
      var interest;
      interest = this.currentData();
      if (interest === this.activeAutocompleteInterest()) {
        return 'active';
      }
    }
    showAutocompleteInterests() {
      var ref;
      // Show autocomplete when on search input and we have any results
      return this.interestsSearchInputFocused() && ((ref = this.autocompleteInterests()) != null ? ref.length : void 0);
    }
    goalExistingClass() {
      var goal;
      goal = this.currentData();
      if (this.studyPlan.hasGoal(goal.id())) {
        return 'existing';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'mousedown .pixelartacademy-pixelpad-apps-studyplan-goal': this.onMouseDownGoal,
        'input .interests .search .input': this.onInputInterestsSearchInput,
        'focus .interests .search .input': this.onFocusInterestsSearchInput,
        'blur .interests .search .input': this.onBlurInterestsSearchInput,
        'click .interests .search .clear-input-button': this.onInterestsSearchClickClearInputButton,
        'mousedown .interests .search .autocomplete .interest': this.onMouseDownInterestsSearchAutocompleteInterest,
        'mouseenter .interests .search .autocomplete .interest': this.onMouseEnterInterestsSearchAutocompleteInterest,
        'keydown': this.onKeyDown
      });
    }
    onMouseDownGoal(event) {
      var goal;
      goal = this.currentData();
      // Prevent browser select/dragging behavior
      event.preventDefault();
      // Add this goal to the canvas.
      this.studyPlan.addGoal({
        goal: goal,
        element: event.currentTarget,
        event: event
      });
      return this.interestSearchTerm('');
    }
    onInputInterestsSearchInput(event) {
      return this.interestSearchTerm($(event.target).val());
    }
    onFocusInterestsSearchInput(event) {
      return this.interestsSearchInputFocused(true);
    }
    onBlurInterestsSearchInput(event) {
      this.interestsSearchInputFocused(false);
      return this.activeAutocompleteInterest(null);
    }
    onInterestsSearchClickClearInputButton(event) {
      return this.interestSearchTerm('');
    }
    onMouseDownInterestsSearchAutocompleteInterest(event) {
      var interest;
      // We use mouse down because click won't happen since the autocomplete interface will already hide due to input blur.
      interest = this.currentData();
      return this.setInterest(interest);
    }
    onMouseEnterInterestsSearchAutocompleteInterest(event) {
      var interest;
      interest = this.currentData();
      return this.activeAutocompleteInterest(interest);
    }
    onKeyDown(event) {
      var currentActiveIndex, currentActiveInterest, delta, interests, newActiveIndex;
      currentActiveInterest = this.activeAutocompleteInterest();
      switch (event.which) {
        case AC.Keys.down:
          delta = 1;
          break;
        case AC.Keys.up:
          delta = -1;
          break;
        case AC.Keys.enter:
          if (currentActiveInterest) {
            this.setInterest(currentActiveInterest);
          }
          return;
        default:
          return;
      }
      if (!(interests = this.autocompleteInterests())) {
        return;
      }
      currentActiveIndex = _.indexOf(interests, currentActiveInterest);
      newActiveIndex = Math.max(-1, currentActiveIndex + delta);
      newActiveIndex = (newActiveIndex + interests.length) % interests.length;
      this.activeAutocompleteInterest(interests[newActiveIndex]);
      return event.preventDefault();
    }
  }
  ;
  GoalSearch.register(GoalSearch.id());
  return GoalSearch;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.goalsearch.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/goalsearch/template.goalsearch.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalSearch");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalSearch"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalSearch", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-studyplan-goalsearch"
  }, "\n    ", HTML.DIV({
    class: "interests"
  }, "\n      ", HTML.DIV({
    class: "search"
  }, "\n        ", HTML.INPUT({
    class: "input",
    placeholder: "search interests",
    value: function() {
      return Spacebars.mustache(view.lookup("interestSearchTerm"));
    }
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("interestSearchTerm"), "length"));
  }, function() {
    return HTML.Raw('\n          <button class="clear-input-button"></button>\n        ');
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showAutocompleteInterests"));
  }, function() {
    return [ "\n          ", HTML.UL({
      class: "autocomplete"
    }, "\n            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("autocompleteInterests"));
    }, function() {
      return [ "\n              ", HTML.LI({
        class: function() {
          return [ "interest ", Spacebars.mustache(view.lookup("autocompleteInterestActiveClass")) ];
        }
      }, Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("name"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t9n"));
      })), "\n            " ];
    }), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("goalsWithInterest"), "length"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "goals"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("goalsWithInterest"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: function() {
          return [ "goal ", Spacebars.mustache(view.lookup("goalExistingClass")) ];
        }
      }, "\n            ", Blaze._TemplateWith(function() {
        return Spacebars.dataMustache(view.lookup("args"), view.lookup("."));
      }, function() {
        return Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "StudyPlan", "Goal"));
        });
      }), "\n          "), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"goalinfo":{"goalinfo.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/goalinfo/goalinfo.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.GoalInfo = function () {
  class GoalInfo extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalInfo';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.studyPlan = this.ancestorComponentOfType(StudyPlan);
      this.goalId = new ReactiveField(null);
      this.goal = new ComputedField(() => {
        var goalId;
        if (!(goalId = this.goalId())) {
          return;
        }
        return PAA.Learning.Goal.getAdventureInstanceForId(goalId);
      });
      // Set goal ID, but don't unset it so that info can be present during fade out.
      return this.autorun(computation => {
        var goalId;
        if (!(goalId = this.studyPlan.selectedGoalId())) {
          return;
        }
        return this.goalId(goalId);
      });
    }
    visibleClass() {
      if (this.studyPlan.selectedGoalId()) {
        return 'visible';
      }
    }
    goalCompletedClass() {
      var ref;
      if ((ref = this.goal()) != null ? ref.completed() : void 0) {
        return 'goal-completed';
      }
    }
    markedComplete() {
      var goalId;
      if (!(goalId = this.goalId())) {
        return;
      }
      return StudyPlan.isGoalMarkedComplete(goalId);
    }
    goalComponent() {
      var blueprint, goalComponentsById, goalId;
      if (!(goalId = this.goalId())) {
        return;
      }
      blueprint = this.studyPlan.blueprint();
      goalComponentsById = blueprint.goalComponentsById();
      return goalComponentsById[goalId];
    }
    goalNode() {
      var goalComponent;
      if (!(goalComponent = this.goalComponent())) {
        return;
      }
      return goalComponent.data();
    }
    canRemove() {
      return StudyPlan.canRemoveGoal(this.goalId());
    }
    events() {
      return super.events(...arguments).concat({
        'click .close-button': this.onClickCloseButton,
        'click .remove-button': this.onClickRemoveButton
      });
    }
    onClickCloseButton(event) {
      return this.studyPlan.deselectGoal();
    }
    onClickRemoveButton(event) {
      this.studyPlan.removeGoal(this.goalId());
      return this.studyPlan.deselectGoal();
    }
  }
  ;
  GoalInfo.register(GoalInfo.id());
  GoalInfo.width = 120;
  GoalInfo.MarkedComplete = function () {
    class MarkedComplete extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Checkbox;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.goalInfo = this.ancestorComponentOfType(StudyPlan.GoalInfo);
      }
      customAttributes() {
        var ref;
        if (!((ref = this.goalInfo.goal()) != null ? ref.completed() : void 0)) {
          return {
            disabled: true
          };
        }
      }
      load() {
        var goalNode;
        if (!(goalNode = this.goalInfo.goalNode())) {
          return;
        }
        return goalNode.markedComplete();
      }
      save(value) {
        return this.goalInfo.goalComponent().markComplete(value);
      }
    }
    ;
    MarkedComplete.register('PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalInfo.MarkedComplete');
    return MarkedComplete;
  }.call(this);
  return GoalInfo;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.goalinfo.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/goalinfo/template.goalinfo.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalInfo");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalInfo"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.GoalInfo", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-studyplan-goalinfo ", Spacebars.mustache(view.lookup("visibleClass")), " ", Spacebars.mustache(view.lookup("goalCompletedClass")) ];
    }
  }, HTML.Raw('\n    <button class="close-button">✕</button>\n    '), HTML.DIV({
    class: "name"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("goal"), "displayNameTranslation"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t10e"));
  }), "\n    "), "\n    ", HTML.LABEL({
    class: "marked-complete"
  }, "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "StudyPlan", "GoalInfo", "MarkedComplete"));
  }), HTML.Raw('\n      <span class="checkmark"></span> 已完成\n    ')), "\n    ", HTML.P({
    class: "instructions"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("goal"), "allCompleted"));
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("markedComplete"));
    }, function() {
      return "\n          取消勾选可将此目标的教程从归档中恢复。\n        ";
    }, function() {
      return "\n          将目标标记为已完成，可把它的教程归档到绘画应用中。\n        ";
    }), "\n      " ];
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("goal"), "completed"));
    }, function() {
      return [ "\n          ", Blaze.If(function() {
        return Spacebars.call(view.lookup("markedComplete"));
      }, function() {
        return "\n            取消勾选可在待办列表中再次显示此目标的任务。\n          ";
      }, function() {
        return "\n            将目标标记为已完成，可从待办列表中移除此目标的任务。\n          ";
      }), "\n        " ];
    }, function() {
      return "\n          到达旗帜处才能将此目标标记为已完成。\n        ";
    }), "\n      " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("canRemove"));
  }, function() {
    return [ HTML.Raw('\n      <button class="action-button remove-button">移除</button>\n      '), HTML.P({
      class: "instructions"
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("goal"), "allCompleted"));
    }, function() {
      return "\n          如果您不满意目标的位置，请将其从学习计划中移除。\n        ";
    }, function() {
      return "\n          如果您不想再处理这个目标，请将其从学习计划中移除。\n        ";
    }), "\n        You can always add it back later.\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"taskinfo":{"taskinfo.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/taskinfo/taskinfo.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  IL,
  LOI,
  PAA,
  StudyPlan,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.TaskInfo = function () {
  class TaskInfo extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.TaskInfo';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.bounds = new AE.Rectangle();
      this.studyPlan = this.ancestorComponentOfType(StudyPlan);
      this.blueprint = new ComputedField(() => {
        return this.studyPlan.blueprint();
      });
      this.taskId = new ComputedField(() => {
        return this.studyPlan.selectedTaskId() || this.studyPlan.highlightedTaskId();
      });
      this.selected = new ReactiveField(false);
      this.task = new ReactiveField(null);
      this.wide = new ReactiveField(false);
      this.autorun(computation => {
        var taskId;
        if (!(taskId = this.taskId())) {
          return;
        }
        this.task(PAA.Learning.Task.getAdventureInstanceForId(taskId));
        this.wide(false);
        return this.selected(taskId === this.studyPlan.selectedTaskId());
      });
      return this.taskPosition = new ComputedField(() => {
        var goalComponent, goalComponentsById, ref, task;
        if (!(task = this.task())) {
          return;
        }
        if (!(goalComponentsById = (ref = this.blueprint()) != null ? ref.goalComponentsById() : void 0)) {
          return;
        }
        if (!(goalComponent = goalComponentsById[task.goal.id()])) {
          return;
        }
        return goalComponent.getMapPositionForTask(task.id());
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$taskInfo = this.$('.pixelartacademy-pixelpad-apps-studyplan-taskinfo');
      this._resizeObserver = new ResizeObserver(() => {
        var scale;
        scale = this.blueprint().display.scale();
        this.bounds.width(this.$taskInfo.outerWidth() / scale);
        return this.bounds.height(this.$taskInfo.outerHeight() / scale);
      });
      return this._resizeObserver.observe(this.$taskInfo[0]);
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      return (ref = this._resizeObserver) != null ? ref.disconnect() : void 0;
    }
    visibleClass() {
      if (this.taskId()) {
        return 'visible';
      }
    }
    wideClass() {
      if (this.wide()) {
        return 'wide';
      }
    }
    completedClass() {
      var task;
      if (!(task = this.task())) {
        return;
      }
      if (task.completed()) {
        return 'completed';
      }
    }
    selectedClass() {
      if (this.selected()) {
        return 'selected';
      }
    }
    taskInfoStyle() {
      var blueprint, bottom, centerX, centerY, displayCoordinates, infoHeight, infoWidth, left, maxScreenX, maxScreenY, minScreenX, minScreenY, right, scale, screenHeight, screenWidth, spaceAbove, spaceBelow, spaceToLeft, spaceToRight, taskPosition, top;
      if (!(taskPosition = this.taskPosition())) {
        return;
      }
      if (!(blueprint = this.blueprint())) {
        return;
      }
      displayCoordinates = blueprint.camera().transformCanvasToDisplay(taskPosition);
      infoWidth = this.bounds.width();
      infoHeight = this.bounds.height();
      scale = blueprint.display.scale();
      screenWidth = blueprint.bounds.width() / scale;
      screenHeight = blueprint.bounds.height() / scale;
      if (this.selected()) {
        if (infoHeight > screenHeight - this.constructor.edgePadding - this.constructor.backButtonPadding) {
          this.wide(true);
        }
        return {
          right: "".concat(this.constructor.edgePadding, "rem"),
          top: "".concat(this.constructor.backButtonPadding, "rem")
        };
      } else {
        if (infoHeight > screenHeight - 2 * this.constructor.edgePadding) {
          this.wide(true);
        }
        minScreenX = this.constructor.edgePadding;
        maxScreenX = screenWidth - this.constructor.edgePadding;
        minScreenY = this.constructor.edgePadding;
        maxScreenY = screenHeight - this.constructor.edgePadding;
        centerX = screenWidth / 2;
        centerY = screenHeight / 2;
        spaceBelow = maxScreenY - displayCoordinates.y - this.constructor.taskPadding.bottom;
        spaceAbove = displayCoordinates.y - this.constructor.taskPadding.top - this.constructor.edgePadding;
        spaceToLeft = displayCoordinates.x - this.constructor.taskPadding.left - this.constructor.edgePadding;
        spaceToRight = maxScreenX - displayCoordinates.x - this.constructor.taskPadding.right;
        if (spaceBelow >= infoHeight || spaceAbove >= infoHeight) {
          if (displayCoordinates.y < centerY && spaceBelow >= infoHeight || spaceAbove < infoHeight) {
            top = displayCoordinates.y + this.constructor.taskPadding.bottom;
          } else {
            bottom = screenHeight - displayCoordinates.y + this.constructor.taskPadding.top;
          }
          left = _.clamp(displayCoordinates.x - infoWidth / 2, minScreenX, maxScreenX - infoWidth);
          if (left < this.constructor.backButtonPadding && (top != null && top < this.constructor.backButtonPadding || screenHeight - bottom - infoHeight < this.constructor.backButtonPadding)) {
            left = this.constructor.backButtonPadding;
          }
        } else {
          if (displayCoordinates.x < centerX && spaceToRight >= infoWidth || spaceToLeft < infoWidth) {
            left = displayCoordinates.x + this.constructor.taskPadding.right;
          } else {
            right = screenWidth - displayCoordinates.x + this.constructor.taskPadding.left;
          }
          top = _.clamp(displayCoordinates.y - infoHeight / 2, minScreenY, maxScreenY - infoHeight);
          if (top < this.constructor.backButtonPadding && (left != null && left < this.constructor.backButtonPadding || screenWidth - right - infoWidth < this.constructor.backButtonPadding)) {
            top = this.constructor.backButtonPadding;
          }
        }
        return {
          left: left != null ? "".concat(left, "rem") : void 0,
          right: right != null ? "".concat(right, "rem") : void 0,
          top: top != null ? "".concat(top, "rem") : void 0,
          bottom: bottom != null ? "".concat(bottom, "rem") : void 0
        };
      }
    }
    interestDocument() {
      var interest;
      interest = this.currentData();
      return IL.Interest.find(interest);
    }
    acquiredInterestClass() {
      var interest, ref;
      interest = this.currentData();
      if (ref = interest.referenceName, indexOf.call(LOI.adventure.currentInterests(), ref) >= 0) {
        return 'acquired';
      }
    }
    localizedInterestName() {
      var interest, translations;
      interest = this.currentData();
      translations = StudyPlan.Interests.InterestNameTranslations || {};
      return translations[interest.referenceName] || interest.name.translate().text;
    }
  }
  ;
  TaskInfo.register(TaskInfo.id());
  TaskInfo.edgePadding = 5;
  TaskInfo.backButtonPadding = 40;
  TaskInfo.taskPadding = {
    left: 15,
    top: 10,
    bottom: 15,
    right: 30
  };
  return TaskInfo;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.taskinfo.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/taskinfo/template.taskinfo.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.TaskInfo");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.TaskInfo"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.TaskInfo", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-studyplan-taskinfo ", Spacebars.mustache(view.lookup("visibleClass")), " ", Spacebars.mustache(view.lookup("wideClass")), " ", Spacebars.mustache(view.lookup("completedClass")), " ", Spacebars.mustache(view.lookup("selectedClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("taskInfoStyle"));
  }), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("task"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "directive"
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("studyPlanDirectiveTranslation"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }), "\n      "), "\n      ", HTML.DIV({
      class: "instructions"
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("studyPlanInstructionsTranslation"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }), "\n      "), "\n      ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("requiredInterests"), "length"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "interests"
      }, HTML.Raw('\n          <div class="label">需要：</div>\n          '), HTML.UL({
        class: "list"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("requiredInterests"));
      }, function() {
        return [ "\n              ", Spacebars.With(function() {
          return Spacebars.call(view.lookup("interestDocument"));
        }, function() {
          return [ "\n                ", HTML.LI({
            class: function() {
              return [ "required interest ", Spacebars.mustache(view.lookup("acquiredInterestClass")) ];
            }
          }, Blaze.View("lookup:localizedInterestName", function() {
            return Spacebars.mustache(view.lookup("localizedInterestName"));
          })), "\n              " ];
        }), "\n            " ];
      }), "\n          "), "\n        "), "\n      " ];
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("interests"), "length"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "interests"
      }, HTML.Raw('\n          <div class="label">获得：</div>\n          '), HTML.UL({
        class: "list"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("interests"));
      }, function() {
        return [ "\n              ", Spacebars.With(function() {
          return Spacebars.call(view.lookup("interestDocument"));
        }, function() {
          return [ "\n                ", HTML.LI({
            class: function() {
              return [ "interest ", Spacebars.mustache(view.lookup("acquiredInterestClass")) ];
            }
          }, Blaze.View("lookup:localizedInterestName", function() {
            return Spacebars.mustache(view.lookup("localizedInterestName"));
          })), "\n              " ];
        }), "\n            " ];
      }), "\n          "), "\n        "), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"bottompanel":{"bottompanel.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/bottompanel/bottompanel.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.BottomPanel = class BottomPanel extends AM.Component {
  constructor(studyPlan) {
    super(...arguments);
    this.studyPlan = studyPlan;
    this.headerHeight = 15;
  }
  onCreated() {
    super.onCreated(...arguments);
    this.contentHeight = new ReactiveField(0);
    this.previousContentHeight = new ReactiveField(0);
    return this.opened = new ReactiveField(false);
  }
  onRendered() {
    super.onRendered(...arguments);
    this.$content = this.$('.content');
    this._resizeObserver = new ResizeObserver(() => {
      this.previousContentHeight(this.contentHeight());
      return this.contentHeight(this.$content.outerHeight());
    });
    return this._resizeObserver.observe(this.$content[0]);
  }
  onDestroyed() {
    var ref;
    super.onDestroyed(...arguments);
    return (ref = this._resizeObserver) != null ? ref.disconnect() : void 0;
  }
  open() {
    return this.opened(true);
  }
  close() {
    return this.opened(false);
  }
  containerStyle() {
    var maxContentHeight;
    maxContentHeight = Math.max(this.contentHeight(), this.previousContentHeight());
    return {
      height: "".concat(maxContentHeight, "px")
    };
  }
  panelStyle() {
    if (this.opened()) {
      return {
        bottom: "".concat(this.contentHeight(), "px")
      };
    } else {
      return {
        bottom: 0
      };
    }
  }
  events() {
    return super.events(...arguments).concat({
      'click .title': this.onClickTitle
    });
  }
  onClickTitle(event) {
    return this.opened(!this.opened());
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"activegoals":{"activegoals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/activegoals/activegoals.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.ActiveGoals = function () {
  class ActiveGoals extends StudyPlan.BottomPanel {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.ActiveGoals';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.activeAndAvailableGoals = new ComputedField(() => {
        var goal, goalData, goalId, goals, goalsData;
        if (!(goalsData = StudyPlan.state('goals'))) {
          return [];
        }
        goals = [];
        for (goalId in goalsData) {
          goalData = goalsData[goalId];
          if (!(goal = PAA.Learning.Goal.getAdventureInstanceForId(goalId))) {
            continue;
          }
          if (goal.activeAndAvailable()) {
            goals.push(goal);
          }
        }
        return _.sortBy(goals, goal => {
          return _.lowerCase(goal.displayName());
        });
      });
    }
    canRemove() {
      var goal;
      goal = this.currentData();
      return StudyPlan.canRemoveGoal(goal.id());
    }
    events() {
      return super.events(...arguments).concat({
        'click .goal .name': this.onClickGoalName
      });
    }
    onClickGoalName(event) {
      var goal;
      goal = this.currentData();
      return this.studyPlan.selectGoal(goal.id());
    }
  }
  ;
  ActiveGoals.register(ActiveGoals.id());
  return ActiveGoals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.activegoals.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/activegoals/template.activegoals.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.ActiveGoals");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.ActiveGoals"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.ActiveGoals", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-pixelpad-apps-studyplan-activegoals pixelartacademy-pixelpad-apps-studyplan-bottompanel"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("panelStyle"));
  }), "\n    ", HTML.DIV({
    class: "title"
  }, "\n      活跃目标\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("activeAndAvailableGoals"), "length"));
  }, function() {
    return [ "\n        (", Blaze.View("lookup:activeAndAvailableGoals.length", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("activeAndAvailableGoals"), "length"));
    }), ")\n      " ];
  }), "\n    "), "\n    ", HTML.DIV(HTML.Attrs({
    class: "container"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("containerStyle"));
  }), "\n      ", HTML.DIV({
    class: "content"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("activeAndAvailableGoals"), "length"));
  }, function() {
    return [ HTML.Raw('\n          <p class="explanation">\n            活动目标的任务会显示在您的待办列表中。\n          </p>\n          '), HTML.UL({
      class: "active-goals"
    }, "\n            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("activeAndAvailableGoals"));
    }, function() {
      return [ "\n              ", HTML.LI({
        class: "goal"
      }, "\n                ", HTML.SPAN({
        class: "name"
      }, "\n                  ", Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("displayNameTranslation"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      }), "\n                "), "\n              "), "\n            " ];
    }), "\n          "), "\n        " ];
  }, function() {
    return HTML.Raw('\n          <p class="explanation">\n            您目前没有进行中的目标。添加新的短期目标或取消已完成目标的复选标记以重新激活它们。\n          </p>\n        ');
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"interests":{"interests.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/interests/interests.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  IL,
  LOI,
  PAA,
  StudyPlan,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Interests = function () {
  class Interests extends StudyPlan.BottomPanel {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.Interests';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.autorun(computation => {
        var interests;
        interests = LOI.adventure.currentInterests();
        IL.Interest.forReferenceNames.subscribe(this, interests);
        return IL.Interest.forReferenceNames.subscribeContent(this, interests);
      });
      this.currentInterests = new ComputedField(() => {
        var interest, interests;
        interests = function () {
          var i, len, ref, results;
          ref = LOI.adventure.currentInterests();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            interest = ref[i];
            results.push(IL.Interest.find(interest));
          }
          return results;
        }();
        _.pull(interests, void 0);
        return _.sortBy(interests, interest => {
          return _.lowerCase(this.localizedInterestName(interest));
        });
      });
      return this.addedTaskClasses = new ComputedField(() => {
        var goalClass, goalId, goals;
        if (!(goals = StudyPlan.state('goals'))) {
          return;
        }
        return _.flatten(function () {
          var results;
          results = [];
          for (goalId in goals) {
            if (!(goalClass = PAA.Learning.Goal.getClassForId(goalId))) {
              continue;
            }
            results.push(goalClass.tasks());
          }
          return results;
        }());
      });
    }
    events() {
      return super.events(...arguments).concat({
        'click .interest': this.onClickInterest,
        'pointerleave .interest': this.onPointerLeaveInterest
      });
    }
    onClickInterest(event) {
      var index, interest, possibleTaskClasses, ref, taskClass, taskId;
      interest = this.currentData();
      possibleTaskClasses = _.filter(this.addedTaskClasses(), taskClass => {
        var ref;
        return (ref = interest.referenceName, indexOf.call(taskClass.interests(), ref) >= 0) && taskClass.completed();
      });
      if (!possibleTaskClasses.length) {
        return;
      }
      if (ref = this._lastFocusedTask, indexOf.call(possibleTaskClasses, ref) >= 0) {
        // Cycle through possible task classes.
        index = possibleTaskClasses.indexOf(this._lastFocusedTask);
        taskClass = possibleTaskClasses[(index + 1) % possibleTaskClasses.length];
      } else {
        taskClass = possibleTaskClasses[0];
      }
      this._lastFocusedTask = taskClass;
      taskId = this._lastFocusedTask.id();
      this.studyPlan.deselectGoal();
      this.studyPlan.deselectTask();
      this.studyPlan.highlightTask(taskId);
      return Tracker.afterFlush(() => {
        return this.studyPlan.blueprint().focusTask(taskId);
      });
    }
    onPointerLeaveInterest(event) {
      return this.studyPlan.stopHighlightingTask();
    }
    localizedInterestName(interest) {
      var translations;
      interest = interest || this.currentData();
      if (!interest) {
        return '';
      }
      translations = this.constructor.InterestNameTranslations || {};
      return translations[interest.referenceName] || interest.name.translate().text;
    }
  }
  ;
  Interests.register(Interests.id());
  Interests.InterestNameTranslations = {
    'Learn Mode tutorial project': '学习模式教程项目',
    'color': '颜色',
    'even diagonal (pixel art)': '均匀对角线（像素画）',
    'form': '形体',
    'future tech': '未来科技',
    'game design': '游戏设计',
    'jaggy': '锯齿',
    'lighting': '光照',
    'line': '线条',
    'line width (pixel art)': '线宽（像素画）',
    'pico-8': 'PICO-8',
    'pinball': '弹球',
    'pixel art software': '像素画软件',
    'pixel-perfect line': '像素完美线条',
    'scene': '场景',
    'shape': '形状',
    'shape language': '形状语言',
    'simplification': '简化',
    'size (pixel art)': '尺寸（像素画）',
    'sketching': '素描',
    'smooth curve (pixel art)': '平滑曲线（像素画）',
    'space': '空间',
    'texture': '纹理',
    'to-do tasks': '待办任务',
    'value': '明度',
    'video game': '电子游戏'
  };
  return Interests;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.interests.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/interests/template.interests.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.Interests");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.Interests"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.Interests", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-pixelpad-apps-studyplan-interests pixelartacademy-pixelpad-apps-studyplan-bottompanel"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("panelStyle"));
  }), "\n    ", HTML.DIV({
    class: "title"
  }, "\n      已获得兴趣 (", Blaze.View("lookup:currentInterests.length", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("currentInterests"), "length"));
  }), ")\n    "), "\n    ", HTML.DIV(HTML.Attrs({
    class: "container"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("containerStyle"));
  }), "\n      ", HTML.DIV({
    class: "content"
  }, HTML.Raw('\n        <p class="explanation">\n          兴趣是您在学习过程中获得的主题和技能。\n        </p>\n        '), HTML.UL({
    class: "current-interests"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("currentInterests"));
  }, function() {
    return [ "\n            ", HTML.LI({
      class: "interest"
    }, "\n              ", HTML.SPAN({
      class: "name"
    }, "\n                ", Blaze.View("lookup:localizedInterestName", function() {
      return Spacebars.mustache(view.lookup("localizedInterestName"));
    }), "\n              "), "\n            "), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"blueprint":{"blueprint.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/blueprint.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  IL,
  LOI,
  PAA,
  StudyPlan,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Blueprint = function () {
  class Blueprint extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint';
    }
    constructor(studyPlan) {
      super(...arguments);
      this.studyPlan = studyPlan;
      // Prepare all reactive fields.
      this.camera = new ReactiveField(null);
      this.mouse = new ReactiveField(null);
      this.bounds = new AE.Rectangle();
      this.mapBoundingRectangle = new AE.Rectangle();
      this.$blueprint = new ReactiveField(null);
      this.dragBlueprint = new ReactiveField(false);
      this._goalNameTileHeightsCache = {};
    }
    onCreated() {
      var goalHierarchy;
      super.onCreated(...arguments);
      this.display = LOI.adventure.interface.display;
      // Initialize components.
      this.camera(new this.constructor.Camera(this));
      this.mouse(new this.constructor.Mouse(this));

      // Update bounds of the blueprint.
      this.autorun(() => {
        var newSize, pixelPadSize, scale;
        // Depend on app's actual (animating) size.
        pixelPadSize = this.studyPlan.os.pixelPad.animatingSize();
        scale = this.display.scale();

        // Resize the back buffer to canvas element size, if it actually changed.
        newSize = {
          width: pixelPadSize.width * scale,
          height: pixelPadSize.height * scale
        };

        // Bounds are reported in window pixels as well.
        this.bounds.width(newSize.width);
        return this.bounds.height(newSize.height);
      });
      this.goalsData = new AE.LiveComputedField(() => {
        var goalData, goalId, goalsData, minimalGoalsData;
        if (!this.studyPlan.ready()) {
          return;
        }
        if (!(goalsData = this.studyPlan.state('goals'))) {
          return;
        }

        // We only care about connections to minimize reactivity.
        minimalGoalsData = {};
        for (goalId in goalsData) {
          goalData = goalsData[goalId];
          minimalGoalsData[goalId] = _.pick(goalData, ['connections']);
        }
        return minimalGoalsData;
      }, EJSON.equals);
      this.goalHierarchy = new AE.LiveComputedField(() => {
        var goalsData;
        if (!(goalsData = this.goalsData())) {
          return;
        }
        return Tracker.nonreactive(() => {
          return new StudyPlan.GoalHierarchy(this, goalsData);
        });
      });
      this.previewConnection = new ReactiveField(null);
      this.previewGoalHierarchy = new AE.LiveComputedField(() => {
        var goalHierarchy, previewConnection;
        if (!(goalHierarchy = this.goalHierarchy())) {
          return;
        }
        if (!(previewConnection = this.previewConnection())) {
          return;
        }
        return Tracker.nonreactive(() => {
          return goalHierarchy.getPreviewGoalHierarchy(previewConnection);
        });
      });
      this.roadTileMapComponent = new this.constructor.TileMap({
        noBlueprint: true
      });

      // Create goal components and connections.
      this._goalComponentsById = {};
      this.goalIds = new AE.LiveComputedField(() => {
        var goalIds, goalsData;
        if (!this.studyPlan.ready()) {
          return;
        }
        if (!(goalsData = this.studyPlan.state('goals'))) {
          return;
        }
        goalIds = _.keys(goalsData);
        goalIds.sort();
        return goalIds;
      }, EJSON.equals);
      this.goalComponentsById = new AE.LiveComputedField(() => {
        var goalComponent, goalId, i, j, len, len1, newGoalIds, previewConnection, previousGoalComponents, unusedGoalComponent;
        if (!(newGoalIds = this.goalIds())) {
          return;
        }
        previousGoalComponents = _.values(this._goalComponentsById);
        if (previewConnection = this.previewConnection()) {
          newGoalIds = _.union(newGoalIds, [previewConnection.startGoalId, previewConnection.endGoalId]);
        }
        for (i = 0, len = newGoalIds.length; i < len; i++) {
          goalId = newGoalIds[i];
          goalComponent = this._goalComponentsById[goalId];
          if (goalComponent) {
            _.pull(previousGoalComponents, goalComponent);
          } else {
            if (!PAA.Learning.Goal.getClassForId(goalId)) {
              console.warn("Unrecognized goal present in study plan.", goalId);
              continue;
            }
            goalComponent = new this.constructor.Goal(this, goalId);
            this._goalComponentsById[goalId] = goalComponent;
          }
        }
        // Destroy all components that aren't present any more.
        for (j = 0, len1 = previousGoalComponents.length; j < len1; j++) {
          unusedGoalComponent = previousGoalComponents[j];
          goalId = unusedGoalComponent.goalId;
          delete this._goalComponentsById[goalId];
        }
        return this._goalComponentsById;
      });

      // Support animating pathway reveal.
      this._animationRestarting = false;
      this._pendingAnimationsCount = new ReactiveField(0);
      this._animateTimeouts = [];
      this._revealedPathways = [];
      this.initialRevealCompleted = new ReactiveField(false);
      this.readyToAnimate = new ComputedField(() => {
        var goalComponent, goalComponentsById, goalId;
        if (!this.roadTileMapComponent.isRendered()) {
          return;
        }
        goalComponentsById = this.goalComponentsById();
        for (goalId in goalComponentsById) {
          goalComponent = goalComponentsById[goalId];
          if (!goalComponent.isRendered()) {
            return;
          }
        }
        return true;
      });

      // Reveal initial pathways.
      goalHierarchy = null;
      this.autorun(computation => {
        var i, len, ref, ref1, timeout;
        if (!this.readyToAnimate()) {
          return;
        }
        if (!(goalHierarchy = this.displayedGoalHierarchy())) {
          return;
        }
        goalHierarchy.roadTileMap();
        if (this._animationRestarting) {
          return;
        }

        // Restart all animations. Wait for the current ones to cancel.
        this._animationRestarting = true;
        ref = this._animateTimeouts;
        for (i = 0, len = ref.length; i < len; i++) {
          timeout = ref[i];
          Meteor.clearTimeout(timeout);
        }
        this._animateTimeouts = [];
        this._revealedPathways = [];
        this._pointsWaitingToBeRevealed = [];
        if ((ref1 = this.$blueprint()) != null) {
          ref1.removeClass('animating');
        }
        return Tracker.nonreactive(() => {
          return Tracker.autorun(computation => {
            if (this._pendingAnimationsCount()) {
              return;
            }
            computation.stop();
            this._animationRestarting = false;

            // Wait for the tilemap to be reset.
            return Tracker.afterFlush(() => {
              var j, len1, ref2, rootGoalNode;
              ref2 = goalHierarchy.rootGoalNodes;
              // Reveal the starting point.
              for (j = 0, len1 = ref2.length; j < len1; j++) {
                rootGoalNode = ref2[j];
                this.revealPoint(rootGoalNode.entryPoint);
              }

              // Animate unrevealed tasks and goals.
              return this._animateTimeouts.push(Meteor.setTimeout(async () => {
                var camera, k, len2, mapPosition, origin, point, ref3;
                this.$blueprint().addClass('animating');
                camera = this.camera();
                ref3 = this._pointsWaitingToBeRevealed;
                for (k = 0, len2 = ref3.length; k < len2; k++) {
                  point = ref3[k];
                  // Center camera slightly to the right of the point if we're not close enough.
                  mapPosition = this.constructor.TileMap.mapPosition(point.globalPosition);
                  mapPosition.x += 50;
                  origin = camera.origin();
                  if (Math.abs(mapPosition.x - origin.x) > 100 || Math.abs(mapPosition.y - origin.y) > 100) {
                    camera.setOrigin(mapPosition);
                  }
                  await this.revealPoint(point, true);
                }
                return this.initialRevealCompleted(true);
              }, this.initialRevealCompleted() ? 30 : 1000));
            });
          });
        });
      });
      // Calculate total bounding rectangle of the map.
      this.autorun(computation => {
        var goalComponent, goalComponentsById, goalId, mapBoundingRectangle, selectedGoalId;
        mapBoundingRectangle = new AE.Rectangle();
        if (goalComponentsById = this.goalComponentsById()) {
          if (selectedGoalId = this.studyPlan.selectedGoalId()) {
            mapBoundingRectangle = goalComponentsById[selectedGoalId].mapBoundingRectangle;
          } else {
            for (goalId in goalComponentsById) {
              goalComponent = goalComponentsById[goalId];
              mapBoundingRectangle.union(goalComponent.mapBoundingRectangle);
            }
          }
        }
        return this.mapBoundingRectangle.copy(mapBoundingRectangle);
      });
      // Handle blueprint dragging.
      return this.autorun(computation => {
        var cameraScale, dragDelta, newDisplayCoordinate;
        if (!this.dragBlueprint()) {
          return;
        }
        newDisplayCoordinate = this.mouse().displayCoordinate();
        cameraScale = this.camera().scale();
        dragDelta = {
          x: (this.dragStartDisplayCoordinate.x - newDisplayCoordinate.x) / cameraScale,
          y: (this.dragStartDisplayCoordinate.y - newDisplayCoordinate.y) / cameraScale
        };
        this.dragStartDisplayCoordinate = newDisplayCoordinate;
        return this.camera().offsetOrigin(dragDelta);
      });
    }
    onRendered() {
      var $blueprint;
      super.onRendered(...arguments);
      // DOM has been rendered, initialize.
      $blueprint = this.$('.pixelartacademy-pixelpad-apps-studyplan-blueprint');
      return this.$blueprint($blueprint);
    }
    onDestroyed() {
      var ref, ref1;
      super.onDestroyed(...arguments);
      this.goalsData.stop();
      this.goalIds.stop();
      this.goalComponentsById.stop();
      if ((ref = this.goalHierarchy()) != null) {
        ref.destroy();
      }
      this.goalHierarchy.stop();
      if ((ref1 = this.previewGoalHierarchy()) != null) {
        ref1.destroy();
      }
      return this.previewGoalHierarchy.stop();
    }
    getGoalNameTileHeight(goalId) {
      var goalComponent, goalComponentsById, height;
      if (!this.isRendered()) {
        return 1;
      }
      goalComponentsById = this.goalComponentsById();
      if (goalComponent = goalComponentsById[goalId]) {
        height = goalComponent.nameTileHeight();
        this._goalNameTileHeightsCache[goalId] = height;
      }
      return this._goalNameTileHeightsCache[goalId] || 1;
    }
    async revealPoint(point, animate) {
      var animationOptions, goalComponent, goalComponentsById, goalId, raiseFlag, revealed, taskPoint;
      // We need to check if we can reveal tasks.
      if ((taskPoint = point.taskPoint) && point === taskPoint.entryPoint) {
        animationOptions = {
          animate,
          stopAnimation: () => {
            return this._animationRestarting;
          }
        };
        goalComponentsById = this.goalComponentsById();
        goalComponent = goalComponentsById[point.goalNode.goalId];
        if (taskPoint.task) {
          // See if we need to open the gate.
          if (taskPoint.task.requiredInterests() && taskPoint.task.hasRequiredInterests()) {
            goalComponent.tileMapComponent.openGate(taskPoint.localPosition.x - 1, taskPoint.localPosition.y + 2);
          }

          // See if we need to activate the task.
          if (taskPoint.task.active()) {
            goalComponent.tileMapComponent.activateBuilding(taskPoint.localPosition.x, taskPoint.localPosition.y);
          }

          // See if we need to reveal task tiles.
          if (taskPoint.task.completed()) {
            // If we're not animating, don't continue to unrevealed tasks.
            if (!(StudyPlan.isTaskRevealed(taskPoint.task.id()) || animate)) {
              this._pointsWaitingToBeRevealed.push(point);
              return;
            }
            this._pendingAnimationsCount(this._pendingAnimationsCount() + 1);
            await goalComponent.tileMapComponent.revealTask(taskPoint, animationOptions);
            if (animate) {
              // Mark that the task was revealed.
              revealed = StudyPlan.state('revealed') || {};
              if (revealed.taskIds == null) {
                revealed.taskIds = [];
              }
              revealed.taskIds.push(taskPoint.task.id());
              StudyPlan.state('revealed', revealed);
            }
            this._pendingAnimationsCount(this._pendingAnimationsCount() - 1);
            if (this._animationRestarting) {
              return;
            }
          } else {
            return;
          }
          // We can't continue unless the task is completed.
        } else if (taskPoint.endTask) {
          goalId = taskPoint.goalNode.goalId;

          // See if we need to reveal the end task tiles.
          if (taskPoint.goalNode.goal.completed()) {
            // If we're not animating, don't continue to unrevealed goals.
            if (!(StudyPlan.isGoalRevealed(goalId) || animate)) {
              this._pointsWaitingToBeRevealed.push(point);
              return;
            }
            this._pendingAnimationsCount(this._pendingAnimationsCount() + 1);
            await goalComponent.tileMapComponent.revealTask(taskPoint, animationOptions);
            if (animate) {
              // Mark that the goal was revealed.
              revealed = StudyPlan.state('revealed') || {};
              if (revealed.goalIds == null) {
                revealed.goalIds = [];
              }
              revealed.goalIds.push(goalId);
              StudyPlan.state('revealed', revealed);
            }
            this._pendingAnimationsCount(this._pendingAnimationsCount() - 1);
            if (this._animationRestarting) {
              return;
            }

            // See if we need to raise a flag.
            if (taskPoint.goalNode.markedComplete()) {
              raiseFlag = true;
              // When revealing a goal that has all its tasks completed, automatically mark it as complete.
            } else if (animate && taskPoint.goalNode.goal.allCompleted()) {
              taskPoint.goalNode.markComplete(true);
              raiseFlag = true;
            }
            if (raiseFlag) {
              goalComponent.tileMapComponent.setFlag(taskPoint.localPosition.x, taskPoint.localPosition.y, true);
            }
          }
          if (!taskPoint.goalNode.goal.completed()) {
            return;
          }
        }
      }
      if (this._animationRestarting) {
        return;
      }
      return this._revealPathwaysFrom(point, animate);
    }
    _revealPathwaysFrom(origin, animate) {
      var i, len, outgoingPathways, pathway, revealPromises, taskPoint;
      if (animate) {
        revealPromises = [];
      }
      outgoingPathways = [...origin.outgoingPathways];
      if ((taskPoint = origin.taskPoint) && origin === taskPoint.entryPoint) {
        outgoingPathways.push(...origin.taskPoint.outgoingPathways);
      }
      for (i = 0, len = outgoingPathways.length; i < len; i++) {
        pathway = outgoingPathways[i];
        if (!(indexOf.call(this._revealedPathways, pathway) < 0)) {
          continue;
        }
        this._revealedPathways.push(pathway);
        if (animate) {
          (pathway => {
            return revealPromises.push(new Promise(resolve => {
              return this._animateTimeouts.push(Meteor.setTimeout(async () => {
                await this._revealPathway(pathway, true);
                return resolve();
              }));
            }));
          })(pathway);
        } else {
          this._revealPathway(pathway);
        }
      }
      if (animate) {
        return Promise.all(revealPromises);
      }
    }
    async _revealPathway(pathway, animate) {
      var animationOptions, goalComponent, goalComponentsById;
      this._pendingAnimationsCount(this._pendingAnimationsCount() + 1);
      animationOptions = {
        animate,
        stopAnimation: () => {
          return this._animationRestarting;
        }
      };
      if (pathway.goalNode) {
        goalComponentsById = this.goalComponentsById();
        goalComponent = goalComponentsById[pathway.goalNode.goalId];
        await goalComponent.tileMapComponent.revealPathway(pathway, animationOptions);
      } else {
        await this.roadTileMapComponent.revealPathway(pathway, _.extend({
          useGlobalPositions: true
        }, animationOptions));
      }
      this._pendingAnimationsCount(this._pendingAnimationsCount() - 1);
      if (this._animationRestarting) {
        return;
      }
      return this.revealPoint(pathway.endPoint, animate);
    }
    renderRoadTileMapComponent() {
      return this.roadTileMapComponent.renderComponent(this.currentComponent());
    }
    displayedGoalHierarchy() {
      return this.previewGoalHierarchy() || this.goalHierarchy();
    }
    goalComponents() {
      return _.values(this.goalComponentsById());
    }
    renderGoalComponent() {
      var goalComponent;
      goalComponent = Template.parentData();
      return goalComponent.renderComponent(this.currentComponent());
    }
    goalNodeForGoalComponent() {
      var goalComponent, goalHierarchy;
      goalComponent = this.currentData();
      if (!(goalHierarchy = this.displayedGoalHierarchy())) {
        return;
      }
      return goalHierarchy.goalNodesById[goalComponent.goalId];
    }
    originStyle() {
      var camera, originInWindow;
      camera = this.camera();
      originInWindow = camera.transformCanvasToWindow({
        x: 0,
        y: 0
      });
      return {
        transform: "translate3d(".concat(originInWindow.x, "px, ").concat(originInWindow.y, "px, 0)")
      };
    }
    startDragBlueprint() {
      // Dragging of blueprint needs to be handled in display coordinates since the canvas ones should technically stay
      // the same (the whole point is for the same canvas coordinate to stay under the mouse as we move it around).
      this.dragStartDisplayCoordinate = this.mouse().displayCoordinate();
      this.dragBlueprint(true);
      // Wire end of dragging on mouse up anywhere in the window.
      return $(document).on('mouseup.pixelartacademy-pixelpad-apps-studyplan-blueprint-drag-blueprint', () => {
        $(document).off('.pixelartacademy-pixelpad-apps-studyplan-blueprint-drag-blueprint');
        return this.dragBlueprint(false);
      });
    }
    animatingClass() {
      if (this.initialRevealCompleted()) {
        return 'animating';
      }
    }
    draggingClass() {
      if (this.dragBlueprint()) {
        return 'dragging';
      }
    }
    goalSelectedClass() {
      if (this.studyPlan.selectedGoalId()) {
        return 'goal-selected';
      }
    }
    taskSelectedClass() {
      if (this.studyPlan.selectedTaskId()) {
        return 'task-selected';
      }
    }
    focusGoal(goalId) {
      var camera, centerX, centerY, goalHierarchy, goalNode, goalPosition, mapPosition;
      goalHierarchy = this.displayedGoalHierarchy();
      goalNode = goalHierarchy.goalNodesById[goalId];
      goalPosition = goalNode.globalPosition();
      centerX = goalPosition.x + (goalNode.tileMap.minX + goalNode.tileMap.maxX) / 2;
      centerY = goalPosition.y + (goalNode.tileMap.minY + goalNode.tileMap.maxY) / 2;
      mapPosition = StudyPlan.Blueprint.TileMap.mapPosition(centerX, centerY);
      mapPosition.x += StudyPlan.GoalInfo.width / 2;
      camera = this.camera();
      return camera.setOrigin(mapPosition);
    }
    focusTask(taskId) {
      var camera, goalComponent, goalComponentsById, mapPosition, task;
      task = PAA.Learning.Task.getAdventureInstanceForId(taskId);
      goalComponentsById = this.goalComponentsById();
      goalComponent = goalComponentsById[task.goal.id()];
      mapPosition = goalComponent.getMapPositionForTask(taskId);
      camera = this.camera();
      return camera.setOrigin(mapPosition);
    }
    events() {
      return super.events(...arguments).concat({
        'mousedown': this.onMouseDown,
        'pointerenter .tile.building, pointerenter .tile.gate': this.onPointerEnterTask,
        'pointerleave .tile.building, pointerleave .tile.gate': this.onPointerLeaveTask
      });
    }
    onMouseDown(event) {
      var $target;
      $target = $(event.target);
      if ($target.closest('.flag.tile').length) {
        return;
      }
      if ($target.closest('.building.tile').length) {
        return;
      }
      if ($target.closest('.gate.tile').length) {
        return;
      }
      if ($target.closest('.goal-ui').length) {
        return;
      }
      if ($target.closest('.expansion-point').length) {
        return;
      }
      return this.startDragBlueprint();
    }
    onPointerEnterTask(event) {
      var tile;
      tile = this.currentData();
      return this.studyPlan.highlightTask(tile.data.taskId);
    }
    onPointerLeaveTask(event) {
      return this.studyPlan.stopHighlightingTask();
    }
  }
  ;
  Blueprint.register(Blueprint.id());
  return Blueprint;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.blueprint.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/template.blueprint.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-studyplan-blueprint ", Spacebars.mustache(view.lookup("animatingClass")), " ", Spacebars.mustache(view.lookup("draggingClass")), " ", Spacebars.mustache(view.lookup("goalSelectedClass")), " ", Spacebars.mustache(view.lookup("taskSelectedClass")) ];
    }
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: "origin"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("originStyle"));
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayedGoalHierarchy"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "road-tile-map"
    }, "\n          ", Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("displayedGoalHierarchy"), "roadTileMap"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("renderRoadTileMapComponent"));
    }), "\n        "), "\n      " ];
  }), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("goalComponents"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("goalNodeForGoalComponent"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("renderGoalComponent"));
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"camera.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/camera.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Blueprint.Camera = class Camera {
  constructor(blueprint) {
    this.blueprint = blueprint;
    this.state = new LOI.StateObject({
      address: this.blueprint.studyPlan.stateAddress.child('camera')
    });

    // At camera scale 1, a canvas pixel matches a display pixel (and not window pixel).
    // Scale is used to go from canvas pixels to display pixels. We use lazy updates to minimize state reactivity.
    this.scale = this.state.field('scale', {
      equalityFunction: EJSON.equals,
      lazyUpdates: true
    });
    if (!this.scale()) {
      this.scale(1);
    }
    // Effective scale includes the amount we're scaling our display pixels.
    // It is used to go from canvas pixels to window pixels.
    this.effectiveScale = new ComputedField(() => {
      var displayScale;
      displayScale = this.blueprint.display.scale();
      return this.scale() * displayScale;
    });
    // Origin tells which coordinate is at the center of the canvas. We use lazy updates to minimize state reactivity.
    this.origin = this.state.field('origin', {
      equalityFunction: EJSON.equals,
      lazyUpdates: true
    });
    if (!this.origin()) {
      this.origin({
        x: 0,
        y: 0
      });
    }
    this._preciseOrigin = this.origin();
    this.boundOrigin = new ComputedField(() => {
      return this._bindPosition(this.origin());
    });

    // Calculate viewport in canvas coordinates.
    this.viewportBounds = new AE.Rectangle();
    this.blueprint.autorun(() => {
      var effectiveScale, height, origin, width;
      effectiveScale = this.effectiveScale();
      origin = this.boundOrigin();
      // Calculate which part of the canvas is visible. Canvas bounds is in window pixels.
      width = this.blueprint.bounds.width() / effectiveScale;
      height = this.blueprint.bounds.height() / effectiveScale;
      this.viewportBounds.width(width);
      this.viewportBounds.height(height);
      this.viewportBounds.x(origin.x - width / 2);
      return this.viewportBounds.y(origin.y - height / 2);
    });
    // Enable panning with scrolling.

    // Wire up mouse wheel event once the sprite editor is rendered.
    this.blueprint.autorun(computation => {
      var $blueprint;
      $blueprint = this.blueprint.$blueprint();
      if (!$blueprint) {
        return;
      }
      computation.stop();
      return $blueprint.on('wheel', event => {
        var canvasDelta, effectiveScale, windowDelta;
        event.preventDefault();
        effectiveScale = this.effectiveScale();
        windowDelta = {
          x: event.originalEvent.deltaX,
          y: event.originalEvent.deltaY
        };
        canvasDelta = {
          x: windowDelta.x / effectiveScale,
          y: windowDelta.y / effectiveScale
        };
        return this.offsetOrigin(canvasDelta);
      });
    });
  }
  _bindPosition(position) {
    return {
      x: _.clamp(position.x, this.blueprint.mapBoundingRectangle.left(), this.blueprint.mapBoundingRectangle.right()),
      y: _.clamp(position.y, this.blueprint.mapBoundingRectangle.top(), this.blueprint.mapBoundingRectangle.bottom())
    };
  }
  setOrigin(origin) {
    this._preciseOrigin = this._bindPosition(origin);
    return this.origin({
      x: Math.floor(this._preciseOrigin.x),
      y: Math.floor(this._preciseOrigin.y)
    });
  }
  offsetOrigin(offset) {
    return this.setOrigin({
      x: this._preciseOrigin.x + offset.x,
      y: this._preciseOrigin.y + offset.y
    });
  }
  applyTransformToCanvas() {
    var context, effectiveScale, height, origin, width;
    context = this.blueprint.context();
    effectiveScale = this.effectiveScale();
    origin = this.boundOrigin();
    // Start from the identity.
    context.setTransform(1, 0, 0, 1, 0, 0);
    // Move to center of screen.
    width = this.blueprint.bounds.width();
    height = this.blueprint.bounds.height();
    context.translate(width / 2, height / 2);
    // Scale the canvas around the origin.
    context.scale(effectiveScale, effectiveScale);
    // Move to origin.
    return context.translate(-origin.x, -origin.y);
  }
  transformCanvasToWindow(canvasCoordinate) {
    var effectiveScale, height, origin, width, x, y;
    effectiveScale = this.effectiveScale();
    origin = this.boundOrigin();
    x = canvasCoordinate.x;
    y = canvasCoordinate.y;
    width = this.blueprint.bounds.width();
    height = this.blueprint.bounds.height();
    return {
      x: (x - origin.x) * effectiveScale + width / 2,
      y: (y - origin.y) * effectiveScale + height / 2
    };
  }
  transformCanvasToDisplay(canvasCoordinate) {
    var displayScale, windowCoordinate;
    windowCoordinate = this.transformCanvasToWindow(canvasCoordinate);
    displayScale = this.blueprint.display.scale();
    return {
      x: windowCoordinate.x / displayScale,
      y: windowCoordinate.y / displayScale
    };
  }
  transformWindowToCanvas(windowCoordinate) {
    var effectiveScale, height, origin, width, x, y;
    effectiveScale = this.effectiveScale();
    origin = this.boundOrigin();
    x = windowCoordinate.x;
    y = windowCoordinate.y;
    width = this.blueprint.bounds.width();
    height = this.blueprint.bounds.height();
    return {
      x: (x - width / 2) / effectiveScale + origin.x,
      y: (y - height / 2) / effectiveScale + origin.y
    };
  }
  transformDisplayToCanvas(displayCoordinate) {
    var displayScale, windowCoordinate;
    displayScale = this.blueprint.display.scale();
    windowCoordinate = {
      x: displayCoordinate.x * displayScale,
      y: displayCoordinate.y * displayScale
    };
    return this.transformWindowToCanvas(windowCoordinate);
  }
  roundCanvasToWindowPixel(canvasCoordinate) {
    let lineWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var pixelPerfectWindowCoordinate, windowCoordinate;
    windowCoordinate = this.transformCanvasToWindow(canvasCoordinate);
    pixelPerfectWindowCoordinate = {
      x: Math.floor(windowCoordinate.x) + lineWidth / 2,
      y: Math.floor(windowCoordinate.y) + lineWidth / 2
    };
    return this.transformWindowToCanvas(pixelPerfectWindowCoordinate);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"mouse.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/mouse.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, StudyPlan;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Blueprint.Mouse = class Mouse {
  constructor(blueprint) {
    this.blueprint = blueprint;
    // The mouse coordinate relative to sprite canvas in native window (browser) pixels.
    this.windowCoordinate = new ReactiveField(null, EJSON.equals);
    // The mouse coordinate relative to sprite canvas as measured in display pixels (as scaled by AM.Display).
    this.displayCoordinate = new ReactiveField(null, EJSON.equals);
    // The floating point value where the mouse is in canvas' coordinate system.
    this.canvasCoordinate = new ReactiveField(null, EJSON.equals);
    // Wire up mouse move and wheel events once the sprite editor is rendered.
    this.blueprint.autorun(computation => {
      var $blueprint;
      $blueprint = this.blueprint.$blueprint();
      if (!$blueprint) {
        return;
      }
      computation.stop();
      this.$blueprint = $blueprint;
      $blueprint.mousemove(event => {
        return this.updateCoordinates(event);
      });
      // Also react to viewport origin changes.
      return Tracker.nonreactive(() => {
        return this.blueprint.autorun(computation => {
          this.blueprint.camera().origin();
          return this.updateCoordinates();
        });
      });
    });
  }
  updateCoordinates(event) {
    var camera, canvasCoordinate, displayCoordinate, displayScale, origin, windowCoordinate;
    if (event) {
      this._lastPageX = event.pageX;
      this._lastPageY = event.pageY;
    }
    if (!(this._lastPageX && this._lastPageY)) {
      return;
    }
    origin = this.$blueprint.offset();
    displayScale = this.blueprint.display.scale();
    camera = this.blueprint.camera();
    windowCoordinate = {
      x: this._lastPageX - origin.left,
      y: this._lastPageY - origin.top
    };
    this.windowCoordinate(windowCoordinate);
    displayCoordinate = {
      x: windowCoordinate.x / displayScale,
      y: windowCoordinate.y / displayScale
    };
    this.displayCoordinate(displayCoordinate);
    canvasCoordinate = camera.transformDisplayToCanvas(displayCoordinate);
    return this.canvasCoordinate(canvasCoordinate);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"goal":{"goal.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/goal/goal.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Blueprint.Goal = function () {
  class Goal extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.Goal';
    }
    constructor(blueprint, goalId) {
      super(...arguments);
      this.blueprint = blueprint;
      this.goalId = goalId;
      this.nameTileHeight = new ReactiveField(1);
      this.nameWidth = new ReactiveField(0);
      this.mapBoundingRectangle = new AE.Rectangle();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.tileMapComponent = new StudyPlan.Blueprint.TileMap();
      // Subscribe to all interests of this goal.
      this.autorun(computation => {
        var goal, interests;
        if (!(goal = this.goal())) {
          return;
        }
        interests = _.union(goal.interests(), goal.requiredInterests(), goal.optionalInterests());
        IL.Interest.forReferenceNames.subscribeContent(interests);
        return IL.Interest.forReferenceNames.subscribe(interests);
      });
      return this.autorun(computation => {
        var bottomRight, globalPosition, goalNode, topLeft;
        if (!(goalNode = this.data())) {
          return;
        }
        globalPosition = goalNode.globalPosition();
        topLeft = StudyPlan.Blueprint.TileMap.mapPosition(globalPosition.x + goalNode.tileMap.minX, globalPosition.y + goalNode.tileMap.minY);
        bottomRight = StudyPlan.Blueprint.TileMap.mapPosition(globalPosition.x + goalNode.tileMap.maxX, globalPosition.y + goalNode.tileMap.maxY);
        return this.mapBoundingRectangle.copy({
          left: topLeft.x,
          top: topLeft.y,
          right: bottomRight.x,
          bottom: bottomRight.y
        });
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$nameArea = this.$('.name-area');
      this.$name = this.$('.name');
      this._nameAreaResizeObserver = new ResizeObserver(() => {
        var pixelHeight, tileHeight;
        pixelHeight = this.$nameArea.outerHeight() / this.blueprint.display.scale();
        tileHeight = Math.ceil(pixelHeight / StudyPlan.Blueprint.TileMap.tileHeight);
        this.nameTileHeight(tileHeight);
        return this.nameWidth(this.$name.outerWidth());
      });
      return this._nameAreaResizeObserver.observe(this.$nameArea[0]);
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      return (ref = this._nameAreaResizeObserver) != null ? ref.disconnect() : void 0;
    }
    markComplete(value) {
      var goalNode, i, j, len, len1, position, ref, ref1, ref2, results, results1, taskPoint;
      goalNode = this.data();
      goalNode.markComplete(value);
      position = goalNode.endTaskPoint.localPosition;
      this.tileMapComponent.setFlag(position.x, position.y, value);
      if (value) {
        ref = goalNode.taskPoints;
        // Goal is marked complete, deactivate all tasks.
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          taskPoint = ref[i];
          results.push(this.tileMapComponent.deactivateBuilding(taskPoint.localPosition.x, taskPoint.localPosition.y));
        }
        return results;
      } else {
        ref1 = goalNode.taskPoints;
        // Activate all available tasks.
        results1 = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          taskPoint = ref1[j];
          if ((ref2 = taskPoint.task) != null ? ref2.available() : void 0) {
            results1.push(this.tileMapComponent.activateBuilding(taskPoint.localPosition.x, taskPoint.localPosition.y));
          }
        }
        return results1;
      }
    }
    selectedClass() {
      if (this.blueprint.studyPlan.selectedGoalId() === this.goalId) {
        return 'selected';
      }
    }
    goalStyle() {
      var position;
      if (!(position = this.mapPosition())) {
        return;
      }
      return {
        left: "".concat(position.x, "rem"),
        top: "".concat(position.y, "rem")
      };
    }
    mapPosition() {
      var goalNode;
      if (!(goalNode = this.data())) {
        return;
      }
      return StudyPlan.Blueprint.TileMap.mapPosition(goalNode.globalPosition());
    }
    getMapPositionForTask(taskId) {
      var goalNode, goalPosition, taskPosition;
      if (!(goalNode = this.data())) {
        return;
      }
      goalPosition = goalNode.globalPosition();
      if (!(taskPosition = this.tileMapComponent.getPositionForTask(taskId))) {
        return;
      }
      return StudyPlan.Blueprint.TileMap.mapPosition(goalPosition.x + taskPosition.x, goalPosition.y + taskPosition.y);
    }
    markedCompleteClass() {
      var goalNode;
      if (!(goalNode = this.data())) {
        return;
      }
      if (goalNode.markedComplete()) {
        return 'marked-complete';
      }
    }
    nameStyle() {
      var bottomLeft, bottomRight, goalNode;
      if (!(goalNode = this.data())) {
        return;
      }
      bottomLeft = StudyPlan.Blueprint.TileMap.mapPosition(goalNode.tileMap.minX + 2, goalNode.tileMap.maxY + 2);
      bottomRight = StudyPlan.Blueprint.TileMap.mapPosition(goalNode.tileMap.maxX, goalNode.tileMap.maxY + 2);
      return {
        left: "".concat(bottomLeft.x, "rem"),
        right: "".concat(-bottomRight.x, "rem"),
        top: "".concat(bottomLeft.y - 5, "rem")
      };
    }
    goalUIStyle() {
      return {
        left: "calc(50% + ".concat(this.nameWidth() / 2, "px + 2rem)")
      };
    }
    goal() {
      var goalNode;
      if (!(goalNode = this.data())) {
        return;
      }
      return goalNode.goal;
    }
    renderTileMapComponent() {
      return this.tileMapComponent.renderComponent(this.currentComponent());
    }
    canRemove() {
      return StudyPlan.canRemoveGoal(this.goalId);
    }
    events() {
      return super.events(...arguments).concat({
        'click .name': this.onClickName,
        'click .remove-button': this.onClickRemoveButton
      });
    }
    onClickName(event) {
      return this.blueprint.studyPlan.selectGoal(this.goalId);
    }
    onClickRemoveButton(event) {
      return this.blueprint.studyPlan.removeGoal(this.goalId);
    }
  }
  ;
  Goal.register(Goal.id());
  Goal.MarkedComplete = function () {
    class MarkedComplete extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Checkbox;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.goal = this.ancestorComponentOfType(StudyPlan.Blueprint.Goal);
      }
      load() {
        var goalNode;
        goalNode = this.data();
        return goalNode.markedComplete();
      }
      save(value) {
        return this.goal.markComplete(value);
      }
    }
    ;
    MarkedComplete.register('PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.Goal.MarkedComplete');
    return MarkedComplete;
  }.call(this);
  return Goal;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.goal.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/goal/template.goal.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.Goal");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.Goal"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.Goal", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-pixelpad-apps-studyplan-blueprint-goal ", Spacebars.mustache(view.lookup("selectedClass")) ];
    },
    "data-goalid": function() {
      return Spacebars.mustache(view.lookup("goalId"));
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("goalStyle"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("tileMap"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("renderTileMapComponent"));
  }), "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "name-area ", Spacebars.mustache(view.lookup("markedCompleteClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("nameStyle"));
  }), "\n      ", HTML.DIV({
    class: "name"
  }, "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("goal"), "displayNameTranslation"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t10e"));
  }), "\n      "), "\n      ", HTML.DIV(HTML.Attrs({
    class: "goal-ui"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("goalUIStyle"));
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("goal"), "completed"));
  }, function() {
    return [ "\n          ", HTML.LABEL({
      class: "marked-complete"
    }, "\n            ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Apps", "StudyPlan", "Blueprint", "Goal", "MarkedComplete"));
    }), HTML.Raw('\n            <span class="checkmark">✓</span>\n          ')), "\n        " ];
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("canRemove"));
  }, function() {
    return HTML.Raw('\n          <button class="remove-button">✕</button>\n        ');
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tilemap":{"tilemap.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/tilemap/tilemap.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, IL, LOI, PAA, StudyPlan, TileTypes;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
TileTypes = StudyPlan.TileMap.Tile.Types;
StudyPlan.Blueprint.TileMap = function () {
  class TileMap extends AM.Component {
    static id() {
      return 'PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.TileMap';
    }
    static version() {
      return 0.1;
    }
    static mapPosition(positionOrTileX, tileY) {
      var tileX;
      if (_.isObject(positionOrTileX)) {
        tileX = positionOrTileX.x;
        tileY = positionOrTileX.y;
      } else {
        tileX = positionOrTileX;
      }
      return {
        x: tileX * this.tileWidth + tileY * this.tileHeight,
        y: tileY * this.tileHeight
      };
    }
    constructor() {
      let options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      super(...arguments);
      this.options = options1;
    }
    onCreated() {
      var blueprintTilesImage;
      super.onCreated(...arguments);
      this.blueprint = this.ancestorComponentOfType(StudyPlan.Blueprint);
      this.map = {};
      this.nonBlueprintTiles = new ComputedField(() => {
        var tile, tileMap, tiles;
        tileMap = this.data();
        tiles = function () {
          var i, len, ref, ref1, results;
          ref = tileMap.tiles;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            tile = ref[i];
            if ((ref1 = tile.type) !== TileTypes.BlueprintEdge && ref1 !== TileTypes.Blueprint) {
              results.push(this._getTileWithData(tile));
            }
          }
          return results;
        }.call(this);
        return _.orderBy(tiles, [tile => {
          return tile.data.position.y;
        }, tile => {
          return tile.data.position.x;
        }], ['asc', 'desc']);
      });
      if (!this.constructor._blueprintTilesImage) {
        this.constructor._blueprintTilesImage = new ReactiveField(false);
        blueprintTilesImage = new Image();
        blueprintTilesImage.onload = () => {
          return this.constructor._blueprintTilesImage(blueprintTilesImage);
        };
        return blueprintTilesImage.src = this.versionedUrl('/pixelartacademy/pixelpad/apps/studyplan/blueprint-tiles.png');
      }
    }
    onRendered() {
      super.onRendered(...arguments);
      if (this.options.noBlueprint) {
        return;
      }
      this.$blueprint = this.$('.blueprint');
      this.blueprintCanvas = this.$blueprint[0];
      this.blueprintContext = this.blueprintCanvas.getContext('2d');
      this._blueprintDrawnDependecy = new Tracker.Dependency();
      return this.autorun(computation => {
        var blueprintTilesImage, bottomRightPixel, i, len, position, ref, sourceX, sourceY, tile, tileMap, topLeftPixel;
        if (!(tileMap = this.data())) {
          return;
        }
        if (!(blueprintTilesImage = this.constructor._blueprintTilesImage())) {
          return;
        }
        topLeftPixel = this.constructor.mapPosition(tileMap.minX, tileMap.minY);
        bottomRightPixel = this.constructor.mapPosition(tileMap.maxX + 1, tileMap.maxY + 1);
        this.blueprintCanvas.width = bottomRightPixel.x - topLeftPixel.x + 1;
        this.blueprintCanvas.height = bottomRightPixel.y - topLeftPixel.y + 1;
        this.blueprintContext.save();
        this.blueprintContext.translate(-topLeftPixel.x, -topLeftPixel.y);
        ref = tileMap.tiles;
        for (i = 0, len = ref.length; i < len; i++) {
          tile = ref[i];
          if (tile.type === TileTypes.BlueprintEdge) {
            if (tile.edgeDirections.left) {
              sourceX = 1;
            } else if (tile.edgeDirections.right) {
              sourceX = 31;
            } else {
              sourceX = 16;
            }
            if (tile.edgeDirections.up) {
              sourceY = 0;
            } else if (tile.edgeDirections.down) {
              sourceY = 20;
            } else {
              sourceY = 10;
            }
          } else if (tile.type !== TileTypes.Road) {
            sourceX = 16;
            sourceY = 10;
          }
          position = this.constructor.mapPosition(tile.position);
          this.blueprintContext.drawImage(blueprintTilesImage, sourceX, sourceY, 13, 5, position.x, position.y, 13, 5);
        }
        this.blueprintContext.restore();
        return this._blueprintDrawnDependecy.changed();
      });
    }
    _getTile(x, y) {
      var base, ref, tile;
      if (!(tile = (ref = this.map[x]) != null ? ref[y] : void 0)) {
        tile = new this.constructor.Tile(x, y);
        if ((base = this.map)[x] == null) {
          base[x] = {};
        }
        this.map[x][y] = tile;
      }
      return tile;
    }
    _getTileWithData(tileData) {
      var tile;
      tile = this._getTile(tileData.position.x, tileData.position.y);
      tile.resetWithData(tileData);
      return tile;
    }
    getPositionForTask(taskId) {
      var tile;
      if (!(tile = _.find(this.nonBlueprintTiles(), tile => {
        return tile.data.type === TileTypes.Building && tile.data.taskId === taskId;
      }))) {
        return;
      }
      return tile.data.position;
    }
    async revealPathway(pathway) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var coordinate, end, endCoordinate, firstTile, firstTileOfStretch, i, j, k, lastTile, offset, ref, ref1, ref2, start, startCoordinate, vertical, waypointIndex, waypoints, x, y;
      if (options.useGlobalPositions) {
        waypoints = [pathway.startPoint.globalPosition, ...pathway.globalWaypointPositions, pathway.endPoint.globalPosition];
      } else {
        waypoints = [pathway.startPoint.localPosition, ...pathway.localWaypointPositions, pathway.endPoint.localPosition];
      }
      for (waypointIndex = i = 0, ref = waypoints.length - 1; 0 <= ref ? i < ref : i > ref; waypointIndex = 0 <= ref ? ++i : --i) {
        start = waypoints[waypointIndex];
        end = waypoints[waypointIndex + 1];
        if (start.x === end.x && start.y === end.y) {
          continue;
        }
        if (start.x === end.x) {
          vertical = true;
          startCoordinate = start.y;
          endCoordinate = end.y;
        } else if (start.y === end.y) {
          vertical = false;
          startCoordinate = start.x;
          endCoordinate = end.x;
        } else {
          console.warn("Pathway has diagonal sections.", pathway, waypoints);
          continue;
        }
        for (coordinate = j = ref1 = startCoordinate, ref2 = endCoordinate; ref1 <= ref2 ? j <= ref2 : j >= ref2; coordinate = ref1 <= ref2 ? ++j : --j) {
          for (offset = k = -1; k <= 1; offset = ++k) {
            x = vertical ? start.x + offset : coordinate;
            y = vertical ? coordinate : start.y + offset;
            if (offset === 0) {
              this._revealTile(x, y);
            } else {
              this._revealPathwaySideTile(x, y);
            }
          }
          if (coordinate === startCoordinate && waypointIndex) {
            this._revealPathwaySideTile(start.x - 1, start.y - 1);
            this._revealPathwaySideTile(start.x + 1, start.y - 1);
            this._revealPathwaySideTile(start.x - 1, start.y + 1);
            this._revealPathwaySideTile(start.x + 1, start.y + 1);
          }

          // Start and end waypoints are the same, so we don't need to wait on the start ones, except the first time.
          firstTile = waypointIndex === 0 && coordinate === startCoordinate;
          firstTileOfStretch = coordinate === startCoordinate;
          lastTile = waypointIndex === waypoints.length - 2 && coordinate === endCoordinate;
          if (!(firstTileOfStretch && !firstTile || lastTile)) {
            if (options.animate) {
              await this._waitForAnimation();
            }
          }
          if (options.stopAnimation()) {
            return;
          }
        }
      }
    }
    revealTask(taskPoint, options) {
      return Meteor.setTimeout(async () => {
        var i, j, k, len, maxX, minX, ref, ref1, ref2, ref3, results, revealed, revealingTiles, tile, x, xS;
        xS = function () {
          var i, len, ref, results;
          ref = taskPoint.tiles;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            tile = ref[i];
            results.push(tile.position.x);
          }
          return results;
        }();
        minX = _.min(xS);
        maxX = _.max(xS);

        // Don't reveal another task's tiles.
        for (x = i = ref = taskPoint.localPosition.x + 1, ref1 = maxX; ref <= ref1 ? i <= ref1 : i >= ref1; x = ref <= ref1 ? ++i : --i) {
          if (!_.find(taskPoint.tiles, tile => {
            return tile.position.x === x && tile.type === TileTypes.Building;
          })) {
            continue;
          }
          maxX = x - 1;
          break;
        }
        results = [];
        for (x = j = ref2 = minX, ref3 = maxX; ref2 <= ref3 ? j <= ref3 : j >= ref3; x = ref2 <= ref3 ? ++j : --j) {
          revealingTiles = _.filter(taskPoint.tiles, tile => {
            var ref4;
            return tile.position.x === x && (ref4 = tile.type) !== TileTypes.Sidewalk && ref4 !== TileTypes.Road;
          });
          revealed = false;
          for (k = 0, len = revealingTiles.length; k < len; k++) {
            tile = revealingTiles[k];
            if (!(this._getTile(x, tile.position.y).revealed() === false)) {
              continue;
            }
            this._revealTile(x, tile.position.y);
            revealed = true;
          }
          if (revealed && options.animate) {
            results.push(await this._waitForAnimation());
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
    }
    _waitForAnimation() {
      if (this.constructor.tileRevealDelay) {
        return _.waitForSeconds(this.constructor.tileRevealDelay);
      }
    }
    _revealTile(x, y) {
      var tile;
      tile = this._getTile(x, y);
      return tile.revealed(true);
    }
    _revealPathwaySideTile(x, y) {
      var ref, ref1, tile;
      tile = this._getTile(x, y);
      if ((ref = (ref1 = tile.data) != null ? ref1.type : void 0) === TileTypes.Building || ref === TileTypes.Road || ref === TileTypes.Sidewalk) {
        return;
      }
      return tile.revealed(true);
    }
    openGate(x, y) {
      var tile;
      tile = this._getTile(x, y);
      return tile.gateOpened(true);
    }
    setFlag(x, y, value) {
      var tile;
      tile = this._getTile(x, y);
      return tile.flagRaised(value);
    }
    activateBuilding(x, y) {
      var tile;
      tile = this._getTile(x, y);
      return tile.buildingActive(true);
    }
    deactivateBuilding(x, y) {
      var tile;
      tile = this._getTile(x, y);
      return tile.buildingActive(false);
    }
    blueprintStyle() {
      var tileMap, topLeftPixel;
      if (!(tileMap = this.data())) {
        return;
      }
      if (!this.isRendered()) {
        return;
      }
      this._blueprintDrawnDependecy.depend();
      topLeftPixel = this.constructor.mapPosition(tileMap.minX, tileMap.minY);
      return {
        left: "".concat(topLeftPixel.x, "rem"),
        top: "".concat(topLeftPixel.y, "rem"),
        width: "".concat(this.blueprintCanvas.width, "rem"),
        height: "".concat(this.blueprintCanvas.height, "rem")
      };
    }
    tileType() {
      var tile;
      tile = this.currentData();
      return tile.data.type;
    }
    tileTypeClass() {
      return _.kebabCase(this.tileType());
    }
    tileStyle() {
      var mapPosition, tile;
      tile = this.currentData();
      mapPosition = this.constructor.mapPosition(tile.data.position);
      return {
        left: "".concat(mapPosition.x, "rem"),
        top: "".concat(mapPosition.y, "rem")
      };
    }
    revealedClass() {
      var tile;
      tile = this.currentData();
      if (tile.revealed()) {
        return 'revealed';
      }
    }
    tileRevealed() {
      var tile;
      tile = this.currentData();
      return tile.revealed();
    }
    buildingClass() {
      var classes, tile;
      tile = this.currentData();
      classes = [_.kebabCase(tile.data.building)];
      if (this._buildingHeight() === 8) {
        classes.push('height-8');
      }
      return classes.join(' ');
    }
    buildingActiveClass() {
      var tile;
      tile = this.currentData();
      if (tile.buildingActive()) {
        return 'active';
      }
    }
    gateOpenedClass() {
      var tile;
      tile = this.currentData();
      if (tile.gateOpened()) {
        return 'opened';
      }
    }
    flagRaisedClass() {
      var tile;
      tile = this.currentData();
      if (tile.flagRaised()) {
        return 'raised';
      }
    }
    pathwayClasses() {
      var classes, neighborExists, ref, side, tile;
      tile = this.currentData();
      classes = [];
      switch (tile.data.type) {
        case TileTypes.Sidewalk:
          classes.push('sidewalk');
          break;
        case TileTypes.Road:
          classes.push('road', ...tile.data.roadMarkingStyles);
          ref = tile.data.roadNeighbors;
          for (side in ref) {
            neighborExists = ref[side];
            if (neighborExists) {
              classes.push(side);
            }
          }
      }
      if (!classes.length) {
        return;
      }
      return classes.join(' ');
    }
    taskHighlightedClass() {
      var tile;
      tile = this.currentData();
      if (this.blueprint.studyPlan.highlightedTaskId() === tile.data.taskId) {
        return 'task-highlighted';
      }
    }
    buildingBlueprintStyle() {
      var height;
      height = this._buildingHeight();
      return {
        height: "".concat(height, "rem"),
        top: "".concat(5 - height, "rem")
      };
    }
    _buildingHeight() {
      var height, tile;
      tile = this.currentData();
      height = this.constructor.buildings.heights[tile.data.building] || 10;
      if (height === 13 || height === 17 || height === 21) {
        height++;
      }
      return height;
    }
    expansionPointDirectionClass() {
      var tile;
      tile = this.currentData();
      return _.kebabCase(tile.data.expansionDirection);
    }
    expansionPointGoalTypeClass() {
      var goalId, goalType, goalTypes, sourceGoalType, tile;
      tile = this.currentData();
      if (!tile.data.connectionPoint) {
        return _.kebabCase(StudyPlan.GoalTypes.ShortTerm);
      }
      sourceGoalType = StudyPlan.getGoalType(tile.data.connectionPoint.goalId);
      if (sourceGoalType === StudyPlan.GoalTypes.MidTerm) {
        return 'future';
      }
      goalTypes = [];
      goalTypes = _.uniq(function () {
        var i, len, ref, results;
        ref = _.flatten(tile.data.goalIds);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          goalId = ref[i];
          results.push(StudyPlan.getGoalType(goalId));
        }
        return results;
      }());
      return function () {
        var i, len, results;
        results = [];
        for (i = 0, len = goalTypes.length; i < len; i++) {
          goalType = goalTypes[i];
          results.push(_.kebabCase(goalType));
        }
        return results;
      }().join(' ');
    }
    events() {
      return super.events(...arguments).concat({
        'click .flag .image': this.onClickFlagImage,
        'click .expansion-point': this.onClickExpansionPoint
      });
    }
    onClickFlagImage(event) {
      var goal, tile;
      tile = this.currentData();
      goal = this.ancestorComponentOfType(StudyPlan.Blueprint.Goal);
      return goal.markComplete(!tile.flagRaised());
    }
    onClickExpansionPoint(event) {
      var connectionDirection, connectionPoint, goalHierarchy, goalNode, ref, ref1, tile;
      tile = this.currentData();
      goalHierarchy = this.blueprint.goalHierarchy();
      connectionDirection = StudyPlan.GoalConnectionDirections.Forward;
      if (tile.data.connectionPoint) {
        goalNode = goalHierarchy.goalNodesById[tile.data.connectionPoint.goalId];
        if (tile.data.connectionPoint.entry) {
          connectionPoint = goalNode.entryPoint;
        } else if (tile.data.connectionPoint.exit) {
          connectionPoint = goalNode.exitPoint;
        } else {
          connectionPoint = goalNode.sidewaysPoints[tile.data.connectionPoint.sidewaysIndex];
          connectionDirection = StudyPlan.GoalConnectionDirections.Sideways;
        }
      }
      return this.blueprint.studyPlan.displayAddGoal({
        goalIds: tile.data.goalIds,
        sourceGoalId: (ref = tile.data.connectionPoint) != null ? ref.goalId : void 0,
        direction: connectionDirection,
        sidewaysIndex: (ref1 = tile.data.connectionPoint) != null ? ref1.sidewaysIndex : void 0
      });
    }
  }
  ;
  TileMap.register(TileMap.id());
  TileMap.tileWidth = 8;
  TileMap.tileHeight = 4;
  TileMap.tileRevealDelay = 0.05;
  return TileMap;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.tilemap.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/tilemap/template.tilemap.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.TileMap");
Template["PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.TileMap"] = new Template("Template.PixelArtAcademy.PixelPad.Apps.StudyPlan.Blueprint.TileMap", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixelpad-apps-studyplan-blueprint-tilemap"
  }, "\n    ", Blaze.Unless(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("options"), "noBlueprint"));
  }, function() {
    return [ "\n      ", HTML.CANVAS(HTML.Attrs({
      class: "blueprint"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("blueprintStyle"));
    })), "\n    " ];
  }), "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("nonBlueprintTiles"));
  }, function() {
    return [ "\n      ", HTML.DIV(HTML.Attrs({
      class: function() {
        return [ "tile ", Spacebars.mustache(view.lookup("tileTypeClass")), " ", Spacebars.mustache(view.lookup("revealedClass")), " ", Spacebars.mustache(view.lookup("groundClass")), " ", Spacebars.mustache(view.lookup("taskHighlightedClass")) ];
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("tileStyle"));
    }), "\n        ", Blaze.Unless(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("options"), "noGround"));
    }, function() {
      return [ "\n          ", Blaze.If(function() {
        return Spacebars.call(view.lookup("tileRevealed"));
      }, function() {
        return HTML.Raw('\n            <div class="ground"></div>\n          ');
      }), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("pathwayClasses"));
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: function() {
          return [ "pathway ", Spacebars.mustache(view.lookup("pathwayClasses")) ];
        }
      }, "\n            ", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("tileRevealed"));
      }, function() {
        return HTML.Raw('\n              <div class="blueprint"></div>\n            ');
      }), HTML.Raw('\n            <div class="image"></div>\n          ')), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("tileType"), "Building");
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: function() {
          return [ "building ", Spacebars.mustache(view.lookup("buildingClass")), " ", Spacebars.mustache(view.lookup("buildingActiveClass")) ];
        }
      }, "\n            ", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("tileRevealed"));
      }, function() {
        return [ "\n              ", HTML.DIV(HTML.Attrs({
          class: "blueprint"
        }, function() {
          return Spacebars.attrMustache(view.lookup("style"), view.lookup("buildingBlueprintStyle"));
        })), "\n            " ];
      }), HTML.Raw('\n            <div class="shadow"></div>\n            <div class="image"></div>\n          ')), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("tileType"), "Gate");
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: function() {
          return [ "gate ", Spacebars.mustache(view.lookup("gateOpenedClass")) ];
        }
      }, "\n            ", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("tileRevealed"));
      }, function() {
        return HTML.Raw('\n              <div class="blueprint"></div>\n            ');
      }), HTML.Raw('\n            <div class="shadow"></div>\n            <div class="image"></div>\n          ')), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("tileType"), "Flag");
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: function() {
          return [ "flag ", Spacebars.mustache(view.lookup("flagRaisedClass")) ];
        }
      }, "\n            ", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("tileRevealed"));
      }, function() {
        return HTML.Raw('\n              <div class="blueprint"></div>\n            ');
      }), HTML.Raw('\n            <div class="shadow"></div>\n            <div class="image"></div>\n          ')), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("tileType"), "ExpansionPoint");
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: function() {
          return [ "expansion-point ", Spacebars.mustache(view.lookup("expansionPointDirectionClass")), " ", Spacebars.mustache(view.lookup("expansionPointGoalTypeClass")) ];
        }
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tilemap-buildings.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/tilemap/tilemap-buildings.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, StudyPlan;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Blueprint.TileMap.buildings = {
  heights: {
    SimCityResidential1: 9,
    SimCityResidential2: 9,
    SimCityResidential3: 12,
    SimCityResidential4: 11,
    SimCityResidential5: 10,
    SimCityResidential6: 11,
    SimCityChurch: 15,
    SimCitySubway: 8,
    SimCityWaterPump: 8,
    SimCityPark: 8,
    SimCityCommercial1: 10,
    SimCityCommercial2: 8,
    SimCityCommercial3: 10,
    SimCityCommercial4: 10,
    SimCityIndustrial1: 9,
    SimCityIndustrial2: 10,
    SimCityIndustrial3: 13,
    SimCityIndustrial4: 14,
    SimCityWindTurbine: 14,
    SimCityOffice1: 15,
    SimCityOffice2: 21,
    SimCityOffice3: 19,
    TransportTycoonHouse1: 9,
    TransportTycoonCinema: 12,
    TransportTycoonHouse2: 8,
    TransportTycoonHouse3: 11,
    TransportTycoonHouse4: 10,
    TransportTycoonHouses1: 9,
    TransportTycoonHouses2: 10,
    TransportTycoonHouses3: 10,
    TransportTycoonHouses4: 9,
    TransportTycoonChurch: 13,
    TransportTycoonOffice1: 21,
    TransportTycoonOffice2: 19,
    TransportTycoonOffice3: 21,
    TransportTycoonOffice4: 20,
    TransportTycoonFlats1: 13,
    TransportTycoonFlats2: 15,
    TransportTycoonFlats3: 15,
    TransportTycoonFlats4: 12,
    TransportTycoonShops1: 13,
    TransportTycoonShops2: 15,
    TransportTycoonTheater: 15,
    TransportTycoonWarehouse: 12,
    TransportTycoonPark1: 10,
    TransportTycoonPark2: 9,
    TransportTycoonBusStation: 8,
    TransportTycoonDepot: 10,
    CountyLineSign: 9
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tile.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixelpad-studyplan/blueprint/tilemap/tile.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, IL, LOI, PAA, StudyPlan;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
StudyPlan = PAA.PixelPad.Apps.StudyPlan;
StudyPlan.Blueprint.TileMap.Tile = class Tile {
  constructor() {
    this.buildingActive = new ReactiveField(false);
    this.gateOpened = new ReactiveField(false);
    this.flagRaised = new ReactiveField(false);
    this.revealed = new ReactiveField(false);
  }
  resetWithData(data) {
    this.data = data;
    this.buildingActive(false);
    this.gateOpened(false);
    this.flagRaised(false);
    return this.revealed(false);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/studyplan.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/template.studyplan.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/connectionpoint.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/goalhierarchy.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/goalnode.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/pathway.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/taskpoint.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/tilemap.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/tile.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/interfacemarking.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/addgoal/addgoal.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/addgoal/template.addgoal.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/goalsearch/goalsearch.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/goalsearch/template.goalsearch.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/goalinfo/goalinfo.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/goalinfo/template.goalinfo.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/taskinfo/taskinfo.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/taskinfo/template.taskinfo.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/bottompanel/bottompanel.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/activegoals/activegoals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/activegoals/template.activegoals.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/interests/interests.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/interests/template.interests.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/blueprint.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/template.blueprint.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/camera.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/mouse.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/goal/goal.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/goal/template.goal.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/tilemap/tilemap.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/tilemap/template.tilemap.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/tilemap/tilemap-buildings.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-studyplan/blueprint/tilemap/tile.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad-studyplan", {
  PixelArtAcademy: PixelArtAcademy
});

})();
