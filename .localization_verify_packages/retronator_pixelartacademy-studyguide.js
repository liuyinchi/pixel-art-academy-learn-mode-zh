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
var PixelArtAcademy = Package['retronator:pixelartacademy-learning'].PixelArtAcademy;
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
var __coffeescriptShare, newOp, priority, index, length;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-studyguide":{"studyguide.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/studyguide.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, PAA;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.StudyGuide = function () {
  class StudyGuide {
    constructor() {
      this.addStudyGuidePage('retropolis.city/academy-of-art/study-guide/:pageOrBook?/:activity?', this.constructor.Pages.Home);
      Retronator.App.addAdminPage('/admin/studyguide', this.constructor.Pages.Admin);
      Retronator.App.addAdminPage('/admin/studyguide/activities/:activityId?', this.constructor.Pages.Admin.Activities);
      Retronator.App.addAdminPage('/admin/studyguide/books/:documentId?', this.constructor.Pages.Admin.Books);
    }
    addStudyGuidePage(url, page) {
      return AB.Router.addRoute(url, this.constructor.Pages.Layout, page);
    }
  }
  ;
  StudyGuide.Goals = {};
  StudyGuide.Tasks = {};
  return StudyGuide;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"studyguide-goals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/studyguide-goals.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.StudyGuide.initializeGoal = function (goalId) {
  // Nothing to do if the goal has already been initialized.
  if (PAA.Learning.Goal.getClassForId(goalId)) {
    return;
  }
  return PAA.StudyGuide.Goals[goalId] = function () {
    var _Class;
    _Class = class extends PAA.Learning.Goal {
      static id() {
        return goalId;
      }

      // Study Guide goal's name will be edited in the database.
      static displayName() {
        return null;
      }

      // Study Guide goals are not tied to a chapter.
      static chapter() {
        return null;
      }
      static activity() {
        return PAA.StudyGuide.Activity.documents.findOne({
          goalId
        });
      }
      static tasks() {
        var activityTasks, i, len, ref, results, task;
        if (!(activityTasks = (ref = this.activity()) != null ? ref.tasks : void 0)) {
          return [];
        }
        results = [];
        for (i = 0, len = activityTasks.length; i < len; i++) {
          task = activityTasks[i];
          results.push(PAA.Learning.Task.getClassForId(task.id));
        }
        return results;
      }
      static finalTasks() {
        var finalTaskId, finalTasks, i, len, ref, results;
        if (!(finalTasks = (ref = this.activity()) != null ? ref.finalTasks : void 0)) {
          return [];
        }
        results = [];
        for (i = 0, len = finalTasks.length; i < len; i++) {
          finalTaskId = finalTasks[i];
          results.push(PAA.Learning.Task.getClassForId(finalTaskId));
        }
        return results;
      }
      static finalGroupNumber() {
        var ref;
        return ((ref = this.activity()) != null ? ref.finalGroupNumber : void 0) || super.finalGroupNumber(...arguments);
      }
      static requiredInterests() {
        var ref;
        return ((ref = this.activity()) != null ? ref.requiredInterests : void 0) || super.requiredInterests(...arguments);
      }
      slug() {
        var displayName, ref, ref1, ref2, ref3, translations;
        if (!(translations = (ref = this.displayNameTranslation()) != null ? ref.translations : void 0)) {
          return;
        }
        displayName = (translations != null ? (ref1 = translations.en) != null ? (ref2 = ref1.us) != null ? ref2.text : void 0 : void 0 : void 0) || (translations != null ? (ref3 = translations.best) != null ? ref3.text : void 0 : void 0) || null;
        return _.kebabCase(displayName);
      }
    };
    _Class.initialize();
    return _Class;
  }.call(this);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"studyguide-tasks.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/studyguide-tasks.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.StudyGuide.initializeTask = function (goalId, taskId, taskType) {
  var TaskClass, existingTask;
  // Nothing to do if the task has already been initialized and has a matching type.
  existingTask = PAA.Learning.Task.getClassForId(taskId);
  if ((existingTask != null ? existingTask.type() : void 0) === taskType) {
    return;
  }
  TaskClass = PAA.Learning.Task[taskType];
  return PAA.StudyGuide.Tasks[taskId] = function () {
    var _Class;
    _Class = class extends TaskClass {
      static id() {
        return taskId;
      }
      static goal() {
        return PAA.Learning.Goal.getClassForId(goalId);
      }

      // Study Guide task strings will be edited in the database.
      static directive() {
        return null;
      }
      static instructions() {
        return null;
      }
      static activity() {
        return PAA.StudyGuide.Activity.documents.findOne({
          goalId
        });
      }
      static taskDescription() {
        var activity;
        if (!(activity = this.activity())) {
          return;
        }
        return _.find(activity.tasks, task => {
          return task.id === taskId;
        });
      }
      static icon() {
        var ref;
        return ((ref = this.taskDescription()) != null ? ref.icon : void 0) || super.icon(...arguments);
      }
      static interests() {
        var ref;
        return ((ref = this.taskDescription()) != null ? ref.interests : void 0) || super.interests(...arguments);
      }
      static requiredInterests() {
        var ref;
        return ((ref = this.taskDescription()) != null ? ref.requiredInterests : void 0) || super.requiredInterests(...arguments);
      }
      static predecessors() {
        var i, len, predecessorTaskId, predecessors, ref, results;
        if (!(predecessors = (ref = this.taskDescription()) != null ? ref.predecessors : void 0)) {
          return [];
        }
        results = [];
        for (i = 0, len = predecessors.length; i < len; i++) {
          predecessorTaskId = predecessors[i];
          results.push(PAA.Learning.Task.getClassForId(predecessorTaskId));
        }
        return results;
      }
      static predecessorsCompleteType() {
        var ref;
        return ((ref = this.taskDescription()) != null ? ref.predecessorsCompleteType : void 0) || super.predecessorsCompleteType(...arguments);
      }
      static groupNumber() {
        var ref;
        return ((ref = this.taskDescription()) != null ? ref.groupNumber : void 0) || super.groupNumber(...arguments);
      }
      static questions() {
        // TODO: Provide questions for survey task.
        return [];
      }
    };
    _Class.initialize();
    return _Class;
  }.call(this);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"global.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/global.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Global = function () {
  class Global extends LOI.Adventure.Global {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Global';
    }
    constructor() {
      super(...arguments);
      // Globally subscribe to Study Guide activities. Note that we purposefully do not require the subscription to be
      // ready for this global class to be ready since we don't want the adventure to require waiting on activities to
      // arrive. They are only used from delayed interactions and we assume they will be initialized by the time such an
      // interaction is demanded.
      PAA.StudyGuide.Activity.initializeAll();
      this.goals = {};
      // Instantiate goals when they arrive.
      this.autorun(computation => {
        var goalClass, goalClasses, goalId, i, len, results;
        goalClasses = PAA.Learning.Goal.getClasses();
        results = [];
        for (i = 0, len = goalClasses.length; i < len; i++) {
          goalClass = goalClasses[i];
          goalId = goalClass.id();
          if (this.goals[goalId] || !PAA.StudyGuide.Goals[goalId]) {
            // Only instantiate goals from the Study Guide.
            continue;
          }
          results.push(this.goals[goalId] = new goalClass());
        }
        return results;
      });
    }
    tasks() {
      var goal, goalId;
      return _.flatten(function () {
        var ref, results;
        ref = this.goals;
        results = [];
        for (goalId in ref) {
          goal = ref[goalId];
          results.push(goal.tasks());
        }
        return results;
      }.call(this));
    }
  }
  ;
  Global.initialize();
  return Global;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"article":{"article.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/article.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Article = function () {
  class Article {}
  ;
  Article.quillFormats = ['bold', 'italic', 'strike', 'underline', 'script', 'link', 'code', 'blockquote', 'header', 'list', 'code-block', 'image', 'video', 'figure', 'studyguide-practicesection', 'studyguide-prerequisiteswarning', 'studyguide-task-reading', 'studyguide-task-upload'];
  Article.figureUploadContext = new LOI.Assets.Upload.Context({
    name: "PixelArtAcademy.StudyGuide.Article.figure",
    folder: 'studyguide',
    maxSize: 50 * 1024 * 1024,
    // 50 MB
    fileTypes: LOI.Assets.Upload.Context.FileTypes.Images,
    cacheControl: LOI.Assets.Upload.Context.CacheControl.RequireRevalidation
  });
  return Article;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"blots-client":{"figure":{"figure.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/figure/figure.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.StudyGuide.Article.Figure = function () {
  class Figure extends AM.Quill.BlotComponent {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Article.Figure';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.preventUpdatesCount = new ReactiveField(0);
      return this.elementRows = new ComputedField(() => {
        var createElement, currentRowOfElements, element, elementIndex, elementIndexInRow, elementRows, elementsPerRow, figure, i, j, k, len, processedElementsCount, ref, ref1, ref2, ref3;
        figure = this.value();
        elementRows = [];
        processedElementsCount = 0;
        createElement = elementIndex => {
          return _.extend({
            index: elementIndex
          }, figure.elements[elementIndex]);
        };
        ref = figure.layout;
        for (i = 0, len = ref.length; i < len; i++) {
          elementsPerRow = ref[i];
          currentRowOfElements = [];
          elementRows.push({
            elements: currentRowOfElements
          });
          for (elementIndexInRow = j = 0, ref1 = elementsPerRow; 0 <= ref1 ? j < ref1 : j > ref1; elementIndexInRow = 0 <= ref1 ? ++j : --j) {
            element = createElement(processedElementsCount);
            currentRowOfElements.push(element);
            processedElementsCount++;
          }
        }
        // Check if layout didn't account for all elements.
        if (processedElementsCount < figure.elements.length) {
          // Add any remaining elements.
          for (elementIndex = k = ref2 = processedElementsCount, ref3 = figure.elements.length; ref2 <= ref3 ? k < ref3 : k > ref3; elementIndex = ref2 <= ref3 ? ++k : --k) {
            elementRows.push({
              elements: [createElement(processedElementsCount)]
            });
          }
        }
        return elementRows;
      });
    }
    preventUpdates() {
      var preventUpdatesCount;
      // Cache the current figure so we can apply updates to it.
      preventUpdatesCount = this.preventUpdatesCount();
      if (!preventUpdatesCount) {
        this._updatedFigure = _.cloneDeep(this.value());
      }
      return Tracker.nonreactive(() => {
        return this.preventUpdatesCount(preventUpdatesCount + 1);
      });
    }
    allowUpdates() {
      var preventUpdatesCount;
      preventUpdatesCount = this.preventUpdatesCount() - 1;
      Tracker.nonreactive(() => {
        return this.preventUpdatesCount(preventUpdatesCount);
      });
      if (preventUpdatesCount) {
        return;
      }
      // No one is preventing updates anymore, so store the final updated figure.
      return this.setFigure(this._updatedFigure);
    }
    getFigure() {
      if (this.preventUpdatesCount()) {
        return this._updatedFigure;
      } else {
        return this.value();
      }
    }
    setFigure(figure) {
      if (this.preventUpdatesCount()) {
        return this._updatedFigure = figure;
      } else {
        return this.value(figure);
      }
    }
    updateElement(index, value) {
      var element, elementType, figure;
      figure = this.getFigure();
      element = figure.elements[index];
      elementType = _.keys(element)[0];
      element[elementType] = value;
      return this.setFigure(figure);
    }
    contentUpdated() {
      var ref;
      return (ref = this.quillComponent()) != null ? typeof ref.contentUpdated === "function" ? ref.contentUpdated() : void 0 : void 0;
    }
    canEditElements() {
      return !(this.readOnly() || this.preventUpdatesCount());
    }
    canMoveElementUp() {
      var element;
      element = this.currentData();
      return element.index;
    }
    canMoveElementDown() {
      var element, figure;
      element = this.currentData();
      figure = this.getFigure();
      return element.index < figure.elements.length - 1;
    }
    events() {
      return super.events(...arguments).concat({
        'click .add-element-button': this.onClickAddElementButton,
        'click .move-element-up-button': this.onClickMoveElementUpButton,
        'click .move-element-down-button': this.onClickMoveElementDownButton,
        'click .remove-element-button': this.onClickRemoveElementButton,
        'paste .caption': this.onPasteCaption
      });
    }
    onPasteCaption(event) {
      // Don't allow the Quill clipboard to hijack paste into the figure caption.
      return event.stopPropagation();
    }
    onClickAddElementButton(event) {
      var $fileInput;
      $fileInput = $('<input type="file" multiple/>');
      $fileInput.on('change', event => {
        var figure, file, files, i, len, ref;
        if (!(files = (ref = $fileInput[0]) != null ? ref.files : void 0)) {
          return;
        }
        // Insert a new image to the figure.
        figure = this.getFigure();
        for (i = 0, len = files.length; i < len; i++) {
          file = files[i];
          figure.elements.push({
            image: {
              file
            }
          });
        }
        figure.layout.push(files.length);
        return this.setFigure(figure);
      });
      return $fileInput.click();
    }
    onClickMoveElementUpButton(event) {
      var element, elementData, figure;
      elementData = this.currentData();
      figure = this.getFigure();
      [element] = figure.elements.splice(elementData.index, 1);
      figure.elements.splice(elementData.index - 1, 0, element);
      return this.setFigure(figure);
    }
    onClickMoveElementDownButton(event) {
      var element, elementData, figure;
      elementData = this.currentData();
      figure = this.getFigure();
      [element] = figure.elements.splice(elementData.index, 1);
      figure.elements.splice(elementData.index + 1, 0, element);
      return this.setFigure(figure);
    }
    onClickRemoveElementButton(event) {
      var element, elementsPerRow, elementsToSkip, figure, rowIndex;
      element = this.currentData();
      figure = this.getFigure();
      figure.elements.splice(element.index, 1);
      // Update layout.
      elementsToSkip = element.index;
      rowIndex = 0;
      // Find row where this element appeared.
      while (elementsToSkip > 0) {
        elementsPerRow = figure.layout[rowIndex];
        elementsToSkip -= elementsPerRow;
        if (elementsToSkip < 0) {
          break;
        }
        rowIndex++;
      }
      // See if there were multiple items in that row.
      if (figure.layout[rowIndex] > 1) {
        figure.layout[rowIndex]--;
      } else {
        figure.layout.splice(rowIndex, 1);
      }
      return this.setFigure(figure);
    }
  }
  ;
  Figure.register(Figure.id());
  Figure.registerBlot({
    name: 'figure',
    tag: 'figure',
    class: 'pixelartacademy-studyguide-article-figure'
  });
  Figure.Layout = function () {
    class Layout extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.realtime = false;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.figureComponent = this.ancestorComponentOfType(PAA.StudyGuide.Article.Figure);
      }
      load() {
        var elementsPerRow, figure, i, layoutText, len, ref;
        figure = this.figureComponent.getFigure();
        layoutText = "";
        ref = figure.layout;
        for (i = 0, len = ref.length; i < len; i++) {
          elementsPerRow = ref[i];
          layoutText += elementsPerRow;
        }
        return layoutText;
      }
      save(layoutText) {
        var figure, numberText;
        figure = this.figureComponent.value();
        figure.layout = function () {
          var i, len, results;
          results = [];
          for (i = 0, len = layoutText.length; i < len; i++) {
            numberText = layoutText[i];
            results.push(parseInt(numberText));
          }
          return results;
        }();
        return this.figureComponent.setFigure(figure);
      }
    }
    ;
    Layout.register('PixelArtAcademy.StudyGuide.Article.Figure.Layout');
    return Layout;
  }.call(this);
  Figure.Caption = function () {
    class Caption extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.TextArea;
        this.realtime = false;
        this.autoResizeTextarea = true;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.figureComponent = this.ancestorComponentOfType(PAA.StudyGuide.Article.Figure);
      }
      load() {
        var figure;
        figure = this.figureComponent.getFigure();
        return figure.caption;
      }
      save(value) {
        var figure;
        figure = this.figureComponent.value();
        figure.caption = value;
        return this.figureComponent.setFigure(figure);
      }
    }
    ;
    Caption.register('PixelArtAcademy.StudyGuide.Article.Figure.Caption');
    return Caption;
  }.call(this);
  return Figure;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.figure.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/figure/template.figure.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Article.Figure");
Template["PixelArtAcademy.StudyGuide.Article.Figure"] = new Template("Template.PixelArtAcademy.StudyGuide.Article.Figure", (function() {
  var view = this;
  return [ HTML.DIV({
    class: "elements"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("elementRows"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "elements-row"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("elements"));
    }, function() {
      return [ "\n          ", HTML.DIV({
        class: "element"
      }, "\n            ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("."), "image"));
      }, function() {
        return [ "\n              ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Article", "Figure", "Image"));
        }), "\n            " ];
      }), "\n            ", Blaze.If(function() {
        return Spacebars.call(view.lookup("canEditElements"));
      }, function() {
        return [ "\n              ", HTML.DIV({
          class: "actions"
        }, "\n                ", Blaze.If(function() {
          return Spacebars.call(view.lookup("canMoveElementUp"));
        }, function() {
          return HTML.Raw('<button class="move-element-up-button">↑</button>');
        }), "\n                ", Blaze.If(function() {
          return Spacebars.call(view.lookup("canMoveElementDown"));
        }, function() {
          return HTML.Raw('<button class="move-element-down-button">↓</button>');
        }), HTML.Raw('\n                <button class="remove-element-button">X</button>\n              ')), "\n            " ];
      }), "\n          "), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  "), "\n  ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("readOnly"));
  }, function() {
    return [ HTML.Raw('\n    <button class="add-element-button">+</button>\n    '), Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Article", "Figure", "Layout"));
    }), "\n  " ];
  }), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("readOnly"));
  }, function() {
    return [ "\n    ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("value"), "caption"));
    }, function() {
      return [ "\n      ", HTML.FIGCAPTION({
        class: "caption"
      }, "\n        ", Blaze.View("lookup:value.caption", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("value"), "caption"));
      }), "\n      "), "\n    " ];
    }), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.FIGCAPTION({
      class: "caption"
    }, "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Article", "Figure", "Caption"));
    }), "\n    "), "\n  " ];
  }) ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"image":{"image.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/figure/image/image.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.StudyGuide.Article.Figure.Image = function () {
  class Image extends AM.Component {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Article.Figure.Image';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.figure = this.ancestorComponentOfType(PAA.StudyGuide.Article.Figure);
      this.previewSource = new ReactiveField(null);
      this.upload = new ReactiveField(null);
      this.uploadError = new ReactiveField(null);
      // Handle preview and uploading.
      return this.autorun(computation => {
        var element, image;
        element = this.data();
        image = element.image;
        if (image.file instanceof Blob) {
          computation.stop();
          this._loadFilePreview(image.file);
          return this._uploadFile(image.file);
        }
      });
    }
    _loadFilePreview(file) {
      var reader;
      reader = new FileReader();
      reader.onload = event => {
        return this.previewSource(event.target.result);
      };
      return reader.readAsDataURL(file);
    }
    _uploadFile(file) {
      var endUploading, upload;
      // Prevent duplicate uploads.
      if (this.upload()) {
        return;
      }
      this.figure.preventUpdates();
      endUploading = () => {
        this.figure.allowUpdates();
        return this.upload(null);
      };
      upload = PAA.StudyGuide.Article.figureUploadContext.upload(file, imageUrl => {
        var element;
        // Replace the source of the picture.
        element = this.data();
        this.figure.updateElement(element.index, {
          url: imageUrl
        });
        return endUploading();
      }, error => {
        this.uploadError(error);
        return endUploading();
      });
      return this.upload(upload);
    }
    imageSource() {
      var element;
      element = this.data();
      return element.image.url || this.previewSource();
    }
    missingImageSource() {
      var element;
      element = this.data();
      // Image is missing if we have a file that isn't a blob and if there is no source.
      return !(element.image.file instanceof Blob) && !element.image.url;
    }
    uploadPercentage() {
      var progress, upload;
      if (!(upload = this.upload())) {
        return;
      }
      progress = upload.progress();
      if (_.isNaN(progress)) {
        progress = 0;
      }
      return "".concat(Math.round(progress * 100), "%");
    }
    events() {
      return super.events(...arguments).concat({
        'load img': this.onLoadImage,
        'click img': this.onClickImage
      });
    }
    onLoadImage(event) {
      var image;
      image = event.target;
      // Make image fit perfectly into the row.
      $(image).parents('.element').eq(0).css({
        flexGrow: image.naturalWidth / image.naturalHeight
      });
      // Inform figure that content has updated so that the surrounding article can recalculate the number of pages.
      return this.figure.contentUpdated();
    }
    onClickImage(event) {
      var article, artworks;
      artworks = [{
        image: event.target
      }];
      article = this.figure.quillComponent();
      return article.bookComponent.home.focusArtworks(artworks);
    }
  }
  ;
  Image.register(Image.id());
  return Image;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.image.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/figure/image/template.image.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Article.Figure.Image");
Template["PixelArtAcademy.StudyGuide.Article.Figure.Image"] = new Template("Template.PixelArtAcademy.StudyGuide.Article.Figure.Image", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-article-figure-image"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("imageSource"));
  }, function() {
    return [ "\n      ", HTML.IMG({
      class: "image",
      src: function() {
        return Spacebars.mustache(view.lookup("imageSource"));
      },
      crossorigin: "anonymous"
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$or"), view.lookup("upload"), view.lookup("uploadError"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "upload-info"
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("uploadError"));
    }, function() {
      return [ "\n          ", Blaze.View("lookup:uploadError.reason", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("uploadError"), "reason"));
      }), "\n        " ];
    }, function() {
      return [ "\n          ", Blaze.View("lookup:uploadPercentage", function() {
        return Spacebars.mustache(view.lookup("uploadPercentage"));
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("missingImageSource"));
  }, function() {
    return HTML.Raw('\n      <div class="missing-image">缺失图片</div>\n    ');
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"practicesection":{"practicesection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/practicesection/practicesection.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Block, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Block = AM.Quill.import('blots/block');
PAA.StudyGuide.Article.PracticeSection = function () {
  class PracticeSection extends Block {}
  ;
  PracticeSection.blotName = 'studyguide-practicesection';
  PracticeSection.tagName = 'div';
  PracticeSection.className = 'practicesection';
  return PracticeSection;
}.call(this);
AM.Quill.register(PAA.StudyGuide.Article.PracticeSection);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"task":{"task.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/task/task.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA, Quill;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Quill = AM.Quill;
PAA.StudyGuide.Article.Task = class Task extends AM.Quill.BlotComponent {
  onCreated() {
    var goalClass, taskClass, value;
    super.onCreated(...arguments);
    this.home = new ComputedField(() => {
      var ref;
      return (ref = this.quillComponent()) != null ? ref.ancestorComponentOfType(PAA.StudyGuide.Pages.Home) : void 0;
    });
    value = this.value();
    taskClass = PAA.Learning.Task.getClassForId(value.id);
    if (!taskClass) {
      console.warn("Unknown task with ID", value.id);
      return;
    }
    goalClass = taskClass.goal();
    this.goal = new goalClass();
    return this.task = _.find(this.goal.tasks(), task => {
      return task instanceof taskClass;
    });
  }
  onDestroyed() {
    var ref;
    super.onDestroyed(...arguments);
    return (ref = this.goal) != null ? ref.destroy() : void 0;
  }
  signedIn() {
    return Meteor.userId() != null;
  }
  ensureSignedIn(callback) {
    var dialog, home;
    // Simply perform the callback if signed in.
    if (this.signedIn()) {
      callback();
      return;
    }
    // Prompt the user to sign in.
    home = this.home();
    dialog = new LOI.Components.Dialog({
      message: "Tracking of completed tasks is only available with a Retronator account. Do you want to sign in?",
      buttons: [{
        text: "Sign in",
        value: true
      }, {
        text: "Cancel"
      }]
    });
    return home.layout.showActivatableModalDialog({
      dialog: dialog,
      callback: () => {
        if (!dialog.result) {
          return;
        }
        return home.signIn(() => {
          // See if sign in succeeded.
          if (!Retronator.user()) {
            return;
          }
          // User has signed in, so perform the callback.
          return callback();
        });
      }
    });
  }
  insertTaskEntry(taskId, data) {
    var characterId;
    if (characterId = LOI.characterId()) {
      return PAA.Learning.Task.Entry.insert(characterId, null, taskId, data);
    } else {
      return PAA.Learning.Task.Entry.insertForUser(taskId, data);
    }
  }
  attemptToRemoveTaskEntry(entry) {
    var dialog, home;
    // Prompt the user if they want to delete the task entry.
    home = this.home();
    dialog = new LOI.Components.Dialog({
      message: "Do you want to undo that you've completed this task?",
      buttons: [{
        text: "Undo",
        value: true
      }, {
        text: "Cancel"
      }]
    });
    return home.layout.showActivatableModalDialog({
      dialog: dialog,
      callback: () => {
        if (!dialog.result) {
          return;
        }
        if (LOI.characterId()) {
          return PAA.Learning.Task.Entry.remove(entry._id);
        } else {
          return PAA.Learning.Task.Entry.removeForUser(entry._id);
        }
      }
    });
  }
  confirmationEnabledClass() {
    if (this.task.active() || !Meteor.userId() || this.task.entry()) {
      // Allow the user to attempt to complete the task if it's active, completed, or
      // if the user is not signed in (in that case they will see the sign in popup).
      return 'enabled';
    }
  }
  completed() {
    // Task is completed if we have an entry.
    return this.task.entry();
  }
  completedClass() {
    if (this.completed()) {
      return 'completed';
    }
  }
  active() {
    return this.task.active(this.goal.tasks());
  }
  activeClass() {
    if (this.active()) {
      return 'active';
    }
  }
  prerequisitesAll() {
    return this.task.constructor.predecessorsCompleteType() === PAA.Learning.Task.PredecessorsCompleteTypes.All;
  }
  prerequisites() {
    var anyCompleted, i, len, predecessor, predecessorClass, prerequisites, ref, tasks;
    tasks = this.goal.tasks();
    prerequisites = [];
    // See if we only need one predecessor completed.
    anyCompleted = this.task.constructor.predecessorsCompleteType() === PAA.Learning.Task.PredecessorsCompleteTypes.Any;
    ref = this.task.predecessors();
    for (i = 0, len = ref.length; i < len; i++) {
      predecessorClass = ref[i];
      predecessor = _.find(tasks, task => {
        return task instanceof predecessorClass;
      });
      if (predecessor.completed()) {
        // We found a completed predecessor. If we only need to find one, there are no other prerequisites.
        if (anyCompleted) {
          return [];
        }
      } else {
        // Add this uncompleted task as a prerequisite.
        prerequisites.push(predecessor);
      }
    }
    return prerequisites;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"prerequisiteswarning":{"prerequisiteswarning.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/task/prerequisiteswarning/prerequisiteswarning. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA, Quill;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Quill = AM.Quill;
PAA.StudyGuide.Article.Task.PrerequisitesWarning = function () {
  class PrerequisitesWarning extends PAA.StudyGuide.Article.Task {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Article.PrerequisitesWarning';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
  }
  ;
  PrerequisitesWarning.register(PrerequisitesWarning.id());
  PrerequisitesWarning.registerBlot({
    name: 'studyguide-prerequisiteswarning',
    tag: 'div',
    class: 'pixelartacademy-studyguide-article-prerequisiteswarning'
  });
  return PrerequisitesWarning;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.prerequisiteswarning.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/task/prerequisiteswarning/template.prerequisite //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Article.PrerequisitesWarning");
Template["PixelArtAcademy.StudyGuide.Article.PrerequisitesWarning"] = new Template("Template.PixelArtAcademy.StudyGuide.Article.PrerequisitesWarning", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$and"), view.lookup("currentUser"), Spacebars.dot(view.lookup("prerequisites"), "length"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "prerequisites"
    }, "\n      在继续之前，您应该完成\n      ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("prerequisitesAll"));
    }, function() {
      return "其中一个";
    }), "之前的任务：\n      ", HTML.UL({
      class: "tasks"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("prerequisites"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "task"
      }, Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("directiveTranslation"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      })), "\n        " ];
    }), "\n      "), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"reading":{"reading.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/task/reading/reading.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA, Quill;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Quill = AM.Quill;
PAA.StudyGuide.Article.Task.Reading = function () {
  class Reading extends PAA.StudyGuide.Article.Task {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Article.Task.Reading';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    events() {
      return super.events(...arguments).concat({
        'click .enabled.confirmation': this.onClickConfirmation
      });
    }
    onClickConfirmation(event) {
      return this.ensureSignedIn(() => {
        var entry;
        // See if the task is active (the user is trying to complete it).
        if (this.task.active()) {
          return this.insertTaskEntry(this.task.id());
          // See if the task is completed (the user might want to undo it).
        } else if (entry = this.task.entry()) {
          return this.attemptToRemoveTaskEntry(entry);
        }
      });
    }
  }
  ;
  Reading.register(Reading.id());
  Reading.registerBlot({
    name: 'studyguide-task-reading',
    tag: 'div',
    class: 'pixelartacademy-studyguide-article-task-reading'
  });
  return Reading;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.reading.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/task/reading/template.reading.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Article.Task.Reading");
Template["PixelArtAcademy.StudyGuide.Article.Task.Reading"] = new Template("Template.PixelArtAcademy.StudyGuide.Article.Task.Reading", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "task ", Spacebars.mustache(view.lookup("completedClass")), " ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("readOnlyClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("prerequisites"), "length"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "prerequisites"
      }, "\n          在标记已阅读此部分之前，\n          您需要完成", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("prerequisitesAll"));
      }, function() {
        return "其中一个";
      }), "之前的任务：\n          ", HTML.UL({
        class: "tasks"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("prerequisites"));
      }, function() {
        return [ "\n              ", HTML.LI({
          class: "task"
        }, Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("directiveTranslation"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        })), "\n            " ];
      }), "\n          "), "\n        "), "\n      " ];
    }), "\n    " ];
  }, function() {
    return HTML.Raw('\n      <div class="prompt">\n        标记你已经读过这一节。\n      </div>\n    ');
  }), "\n    ", HTML.DIV({
    class: function() {
      return [ "confirmation ", Spacebars.mustache(view.lookup("confirmationEnabledClass")) ];
    },
    title: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("task"), "instructions"));
    }
  }, "\n      ", HTML.DIV({
    class: "directive"
  }, "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("task"), "directiveTranslation"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t10e"));
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"upload":{"upload.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/task/upload/upload.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA, Quill;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Quill = AM.Quill;
PAA.StudyGuide.Article.Task.Upload = function () {
  class Upload extends PAA.StudyGuide.Article.Task {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Article.Task.Upload';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    mixins() {
      return [PAA.Components.AutoScaledImageMixin];
    }
    onCreated() {
      super.onCreated(...arguments);
      this.submissionPreview = new ReactiveField(null);
      this.submissionUpload = new ReactiveField(null);
      this.examplesFigureValue = new ComputedField(() => {
        var ref;
        return (ref = this.value()) != null ? ref.examplesFigure : void 0;
      }, EJSON.equals);
      this.examplesFigure = new ReactiveField(null);
      return this.examplesHovered = new ReactiveField(false);
    }
    onRendered() {
      var $figureNode, examplesFigure, figureNode;
      super.onRendered(...arguments);
      $figureNode = this.$('.pixelartacademy-studyguide-article-figure');
      figureNode = $figureNode[0];
      examplesFigure = new PAA.StudyGuide.Article.Figure(figureNode, this.examplesFigureValue());
      this.examplesFigure(examplesFigure);

      // Reactively update the figure.
      this.autorun(computation => {
        if (!examplesFigure.isCreated()) {
          return;
        }
        return examplesFigure.value(this.examplesFigureValue());
      });
      // Reactively update the quill component.
      this.autorun(computation => {
        if (!examplesFigure.isCreated()) {
          return;
        }
        return examplesFigure.quillComponent(this.quillComponent());
      });
      // Listen for figure changes.
      return this.autorun(computation => {
        var currentExamplesFigureValue, newExamplesFigureValue;
        if (!examplesFigure.isCreated()) {
          return;
        }
        currentExamplesFigureValue = this.examplesFigureValue();
        newExamplesFigureValue = examplesFigure.value();
        if (EJSON.equals(currentExamplesFigureValue, newExamplesFigureValue)) {
          return;
        }
        return Tracker.nonreactive(() => {
          var value;
          value = this.value();
          value.examplesFigure = newExamplesFigureValue;
          return this.value(value);
        });
      });
    }
    autoScaledImageMaxHeight() {
      var article, book;
      // Uploaded images in the guide are limited to half the book height.
      if (!(article = this.quillComponent())) {
        return;
      }
      if (!(book = article.book())) {
        return;
      }
      return book.design.size.height / 2;
    }
    autoScaledImageDisplayScale() {
      var article;
      if (!(article = this.quillComponent())) {
        return;
      }
      return article.bookComponent.display.scale();
    }
    multipleExamples() {
      var ref, ref1;
      return ((ref = this.examplesFigureValue()) != null ? (ref1 = ref.elements) != null ? ref1.length : void 0 : void 0) > 1;
    }
    submissionPictureSource() {
      var ref, ref1;
      return ((ref = this.task.entry()) != null ? (ref1 = ref.upload) != null ? ref1.picture.url : void 0 : void 0) || this.submissionPreview();
    }
    submissionUploadingStyle() {
      var progress, submissionUpload;
      if (!(submissionUpload = this.submissionUpload())) {
        return;
      }
      progress = submissionUpload.progress();
      return {
        width: _.isNaN(progress) ? 0 : "".concat(progress * 46, "rem")
      };
    }
    submissionHiddenClass() {
      if (this.examplesHovered() && !this.submissionUpload()) {
        return 'hidden';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .enabled.confirmation': this.onClickConfirmation,
        'click .submission-upload-button': this.onClickSubmissionUploadButton,
        'click .remove-button': this.onClickRemoveButton,
        'click .submission .picture': this.onClickSubmissionPicture,
        'click .view-submissions-button': this.onClickViewSubmissionsButton,
        'mouseenter .examples': this.onMouseEnterExamples,
        'mouseleave .examples': this.onMouseLeaveExamples
      });
    }
    onClickConfirmation(event) {
      return this.ensureSignedIn(() => {
        var entry;
        // See if the task is active (the user is trying to complete it).
        if (this.task.active()) {
          return this._startSubmission();
          // See if the task is completed (the user might want to undo it).
        } else if (entry = this.task.entry()) {
          return this.attemptToRemoveTaskEntry(entry);
        }
      });
    }
    onClickSubmissionUploadButton(event) {
      return this.ensureSignedIn(() => {
        return this._startSubmission();
      });
    }
    _startSubmission() {
      var $fileInput;
      if (this.submissionUpload()) {
        return;
      }
      $fileInput = $('<input type="file"/>');
      $fileInput.on('change', event => {
        var file, reader, ref, upload;
        if (!(file = (ref = $fileInput[0]) != null ? ref.files[0] : void 0)) {
          return;
        }
        // Load submissionPreview file.
        reader = new FileReader();
        reader.onload = event => {
          return this.submissionPreview(event.target.result);
        };
        reader.readAsDataURL(file);
        // Upload file.
        upload = PAA.Practice.Journal.Entry.pictureUploadContext.upload(file, pictureUrl => {
          // Create the entry with this picture URL.
          this.insertTaskEntry(this.task.id(), {
            upload: {
              picture: {
                url: pictureUrl
              }
            }
          });
          this.submissionPreview(null);
          return this.submissionUpload(null);
        }, error => {
          console.error(error);
          this.submissionPreview(null);
          return this.submissionUpload(null);
        });
        return this.submissionUpload(upload);
      });
      return $fileInput.click();
    }
    onClickRemoveButton(event) {
      var entry;
      if (!(entry = this.task.entry())) {
        return;
      }
      return this.attemptToRemoveTaskEntry(entry);
    }
    onClickSubmissionPicture(event) {
      var article, artworks;
      artworks = [{
        image: event.target
      }];
      article = this.quillComponent();
      return article.bookComponent.home.focusArtworks(artworks);
    }
    onClickViewSubmissionsButton(event) {
      var article;
      article = this.quillComponent();
      return article.bookComponent.home.openSubmissions(this.task.id());
    }
    onMouseEnterExamples(event) {
      return this.examplesHovered(true);
    }
    onMouseLeaveExamples(event) {
      return this.examplesHovered(false);
    }
  }
  ;
  Upload.register(Upload.id());
  Upload.registerBlot({
    name: 'studyguide-task-upload',
    tag: 'div',
    class: 'pixelartacademy-studyguide-article-task-upload'
  });
  return Upload;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.upload.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/article/blots-client/task/upload/template.upload.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Article.Task.Upload");
Template["PixelArtAcademy.StudyGuide.Article.Task.Upload"] = new Template("Template.PixelArtAcademy.StudyGuide.Article.Task.Upload", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "task ", Spacebars.mustache(view.lookup("completedClass")), " ", Spacebars.mustache(view.lookup("activeClass")), " ", Spacebars.mustache(view.lookup("readOnlyClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "confirmation ", Spacebars.mustache(view.lookup("confirmationEnabledClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: "directive"
  }, "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("task"), "directiveTranslation"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t10e"));
  }), ":\n      "), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("instructionSteps"));
  }, function() {
    return [ "\n      ", HTML.OL({
      class: "instructions"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("instructionSteps"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "instructions-step"
      }, Blaze.View("lookup:.", function() {
        return Spacebars.mustache(view.lookup("."));
      })), "\n        " ];
    }), "\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "instructions"
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("task"), "instructionsTranslation"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("prerequisites"), "length"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "prerequisites"
      }, "\n          在提交此任务之前，\n          您需要完成", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("prerequisitesAll"));
      }, function() {
        return "其中一个";
      }), "之前的任务：\n          ", HTML.UL({
        class: "tasks"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("prerequisites"));
      }, function() {
        return [ "\n              ", HTML.LI({
          class: "task"
        }, Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("directiveTranslation"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        })), "\n            " ];
      }), "\n          "), "\n        "), "\n      " ];
    }), "\n    " ];
  }, function() {
    return [ "\n      ", Blaze.Unless(function() {
      return Spacebars.dataMustache(view.lookup("$or"), view.lookup("completed"), view.lookup("submissionPictureSource"));
    }, function() {
      return HTML.Raw('\n        <div class="prompt">\n          要完成这个任务， <button class="submission-upload-button">提交</button> 所需的图片。\n        </div>\n      ');
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("submissionPictureSource"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "submission"
    }, "\n        ", HTML.DIV(HTML.Attrs({
      class: "remove-area"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("submissionUploadingStyle"));
    }), "\n          ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("upload"));
    }, function() {
      return HTML.Raw('\n            <button class="remove-button">移除</button>\n          ');
    }), "\n        "), "\n        ", HTML.IMG(HTML.Attrs({
      class: "picture autoscaledimage",
      src: function() {
        return Spacebars.mustache(view.lookup("submissionPictureSource"));
      },
      crossorigin: "anonymous"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("autoScaledImageStyle"));
    })), "\n      "), "\n    " ];
  }), HTML.Raw("\n    <!-- Examples get hidden via CSS so that the figure node is persistent -->\n    "), HTML.DIV({
    class: "examples"
  }, "\n      Example result", Blaze.If(function() {
    return Spacebars.call(view.lookup("multipleExamples"));
  }, function() {
    return "s";
  }), ":\n      ", HTML.FIGURE({
    class: "pixelartacademy-studyguide-article-figure"
  }, "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("examplesFigure"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      "), "\n    "), HTML.Raw('\n    <div class="archive">\n      你可以在 <button class="view-submissions-button">档案</button>.\n    </div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},"activity":{"activity.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/activity/activity.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Activity = function () {
  // A Study Guide activity describes an auto-generated learning goal and its tasks.
  class Activity extends AM.Document {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Activity';
    }
  }
  ;

  // goalId: the ID that the auto-generated goal should have
  // tasks: array of learning task descriptions
  //   id: the ID that the auto-generated task should have
  //   type: the type that identifies the task class individual tasks inherit from
  //   icon: icon value that represents the kind of work done in this task
  //   interests: array of interests this task increases
  //   requiredInterests: array of interests required to attempt this task
  //   predecessors: array of task IDs leading to this task
  //   predecessorsCompleteType: whether you need to complete any or all predecessor tasks
  //   groupNumber: number at which group level the task appears
  // finalTasks: array of learning task IDs that complete this goal
  // finalGroupNumber: number at which group level the exit node appears, 0 when undefined
  // requiredInterests: array of interests directly required by the goal, not coming from the tasks
  // [article]: array of delta operations for the Study Guide article of this activity
  //   insert: string or object to be inserted
  //     figure: a collection of visual elements with a caption
  //       layout: array of numbers controlling how many elements per row to show
  //       caption: the text written under the figure
  //       [elements]: array of elements that make the figure
  //         artwork: an artwork from the pixel art database
  //           _id

  //         image: an image without any semantic information
  //           url

  //         video: a video without any semantic information
  //           url

  //     studyguide-prerequisiteswarning: a warning showing prerequisite tasks
  //       id: the id of the task for which to show prerequisites

  //     studyguide-task-reading: a checkbox to mark reading of a section complete
  //       id: the id of the manual task to be completed

  //     studyguide-task-upload: instructions for a task with the interface to upload an image
  //       id: the id of the upload task to be completed
  //       examplesFigure: same data structure as figure

  //   attributes: object with formatting directives
  //     studyguide-practicesection: a visually distinct section that includes practical learning tasks
  Activity.Meta({
    name: Activity.id()
  });

  // Methods
  Activity.insert = Activity.method('insert');
  Activity.update = Activity.method('update');
  Activity.remove = Activity.method('remove');
  Activity.renameGoalId = Activity.method('renameGoalId');
  Activity.insertTask = Activity.method('insertTask');
  Activity.updateTask = Activity.method('updateTask');
  Activity.removeTask = Activity.method('removeTask');
  Activity.renameTaskId = Activity.method('renameTaskId');
  Activity.changeTaskType = Activity.method('changeTaskType');
  Activity.updateArticle = Activity.method('updateArticle');

  // Subscriptions
  Activity.all = Activity.subscription('all');
  Activity.articleForActivityId = Activity.subscription('articleForActivityId');
  return Activity;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"activity-client.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/activity/activity-client.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Activity = function () {
  class Activity extends PAA.StudyGuide.Activity {
    static initializeAll(component) {
      var activitiesSubscription, autorunProvider, subscribeProvider;
      subscribeProvider = component || Meteor;
      autorunProvider = component || Tracker;
      // Subscribe to all activities.
      activitiesSubscription = this.all.subscribe(subscribeProvider);
      // Fetch all activities, which triggers their initialization.
      autorunProvider.autorun(() => {
        var activity, i, j, len, len1, ref, ref1, results, task;
        ref = this.documents.fetch();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          activity = ref[i];
          // Initialize activity tasks.
          if (activity.tasks) {
            ref1 = activity.tasks;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              task = ref1[j];
              PAA.StudyGuide.initializeTask(activity.goalId, task.id, task.type);
            }
          }
          // Initialize a goal based on this activity.
          results.push(PAA.StudyGuide.initializeGoal(activity.goalId));
        }
        return results;
      });
      // Return the subscription so that the caller can check if activities are ready.
      return activitiesSubscription;
    }
  }
  ;
  Activity.Meta({
    name: Activity.id(),
    replaceParent: true
  });
  return Activity;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/activity/methods.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  Delta,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Base;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Delta = require('quill-delta');
PAA.StudyGuide.Activity.insert.method(function (goalId) {
  check(goalId, String);
  LOI.Authorize.admin();
  // Create the new activity.
  PAA.StudyGuide.Activity.documents.insert({
    goalId
  });
  // Create the goal class.
  return PAA.StudyGuide.initializeGoal(goalId);
});
PAA.StudyGuide.Activity.update.method(function (activityId, data) {
  var activity, goalClass;
  check(activityId, Match.DocumentId);
  check(data, {
    finalTasks: Match.Optional([Match.OptionalOrNull(String)]),
    finalGroupNumber: Match.OptionalOrNull(Number),
    requiredInterests: Match.Optional([Match.OptionalOrNull(String)])
  });
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  // Update the activity with new data.
  PAA.StudyGuide.Activity.documents.update(activityId, {
    $set: data
  });
  // Reinitialize the goal.
  goalClass = PAA.Learning.Goal.getClassForId(activity.goalId);
  return goalClass.initialize();
});
PAA.StudyGuide.Activity.remove.method(function (activityId) {
  var activity, i, j, len, len1, task, tasks;
  check(activityId, Match.DocumentId);
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  // Clean up the translations.
  tasks = activity.tasks || [];
  Artificial.Babel.Translation.documents.remove({
    namespace: activity.goalId
  });
  for (i = 0, len = tasks.length; i < len; i++) {
    task = tasks[i];
    Artificial.Babel.Translation.documents.remove({
      namespace: task.id
    });
  }
  // Remove the goal and tasks from the registry.
  PAA.Learning.Goal.removeClassForId(activity.goalId);
  for (j = 0, len1 = tasks.length; j < len1; j++) {
    task = tasks[j];
    PAA.Learning.Task.removeClassForId(task.id);
  }
  // Remove the activity.
  return PAA.StudyGuide.Activity.documents.remove(activityId);
});
PAA.StudyGuide.Activity.renameGoalId.method(function (activityId, newGoalId) {
  var $set, activity, fieldGoalId, i, j, k, l, len, len1, len2, len3, len4, m, namespace, newFieldGoalId, newNamespace, newTasks, ref, rename, results, studyPlanGoalsField, task, taskId, taskIds, tasks;
  check(activityId, Match.DocumentId);
  check(newGoalId, String);
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  if (activity.goalId === newGoalId) {
    throw new AE.ArgumentException("Goal's ID is already ".concat(newGoalId, "."));
  }
  // Rename translation namespaces.
  tasks = activity.tasks || [];
  taskIds = function () {
    var i, len, results;
    results = [];
    for (i = 0, len = tasks.length; i < len; i++) {
      task = tasks[i];
      results.push(task.id);
    }
    return results;
  }();
  rename = id => {
    return id.replace(activity.goalId, newGoalId);
  };
  ref = [activity.goalId, ...taskIds];
  for (i = 0, len = ref.length; i < len; i++) {
    namespace = ref[i];
    newNamespace = rename(namespace);
    Artificial.Babel.Translation.documents.update({
      namespace
    }, {
      $set: {
        namespace: newNamespace
      }
    }, {
      multi: true
    });
  }
  // Update the activity with new goal ID.
  newTasks = _.cloneDeep(tasks);
  for (j = 0, len1 = newTasks.length; j < len1; j++) {
    task = newTasks[j];
    task.id = rename(task.id);
    if (task.predecessors) {
      _.transform(task.predecessors, rename);
    }
  }
  $set = {
    goalId: newGoalId,
    tasks: newTasks
  };
  if (activity.finalTasks) {
    $set.finalTasks = _.map(activity.finalTasks, rename);
  }
  PAA.StudyGuide.Activity.documents.update(activityId, {
    $set
  });
  // Remove the old goal and tasks from the registry.
  PAA.Learning.Goal.removeClassForId(activity.goalId);
  for (k = 0, len2 = tasks.length; k < len2; k++) {
    task = tasks[k];
    PAA.Learning.Task.removeClassForId(task.id);
  }
  for (l = 0, len3 = newTasks.length; l < len3; l++) {
    task = newTasks[l];
    // Create the new goal and task classed.
    PAA.StudyGuide.initializeTask(newGoalId, task.id, task.type);
  }
  PAA.StudyGuide.initializeGoal(newGoalId);
  // Rename goals in study plans.
  fieldGoalId = activity.goalId.replace(/\./g, '_');
  newFieldGoalId = newGoalId.replace(/\./g, '_');
  studyPlanGoalsField = 'state.things.PixelArtAcademy.PixelPad.Apps.StudyPlan.goals';
  LOI.GameState.documents.update({
    ["".concat(studyPlanGoalsField, ".").concat(fieldGoalId)]: {
      $exists: true
    }
  }, {
    $rename: {
      ["".concat(studyPlanGoalsField, ".").concat(fieldGoalId)]: "".concat(studyPlanGoalsField, ".").concat(newFieldGoalId)
    }
  }, {
    multi: true
  });
  // Rename tasks in task entries.
  results = [];
  for (m = 0, len4 = taskIds.length; m < len4; m++) {
    taskId = taskIds[m];
    results.push(PAA.Learning.Task.Entry.documents.update({
      taskId
    }, {
      $set: {
        taskId: rename(taskId)
      }
    }, {
      multi: true
    }));
  }
  return results;
});
PAA.StudyGuide.Activity.insertTask.method(function (activityId, taskId, taskType) {
  var activity;
  check(activityId, Match.DocumentId);
  check(taskId, String);
  check(taskType, Match.Where(value => {
    return indexOf.call(PAA.Learning.Task.getTypes(), value) >= 0;
  }));
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  // Make sure the task doesn't exist yet.
  if (_.find(activity.tasks, function (task) {
    return task.id === taskId;
  })) {
    throw new AE.ArgumentException("Task ".concat(taskId, " already exist for activity with goal ").concat(activity.goalId, "."));
  }
  // Add the task.
  PAA.StudyGuide.Activity.documents.update(activityId, {
    $push: {
      tasks: {
        id: taskId,
        type: taskType
      }
    }
  });
  // Create the task class.
  return PAA.StudyGuide.initializeTask(activity.goalId, taskId, taskType);
});
PAA.StudyGuide.Activity.updateTask.method(function (activityId, taskId, data) {
  var $set, activity, goalClass, property, taskClass, value;
  check(activityId, Match.DocumentId);
  check(taskId, String);
  check(data, {
    icon: Match.Optional(Match.Where(value => {
      return indexOf.call(_.values(PAA.Learning.Task.Icons), value) >= 0;
    })),
    interests: Match.Optional([Match.OptionalOrNull(String)]),
    requiredInterests: Match.Optional([Match.OptionalOrNull(String)]),
    predecessors: Match.Optional([Match.OptionalOrNull(String)]),
    predecessorsCompleteType: Match.Optional(Match.Where(value => {
      return indexOf.call(_.values(PAA.Learning.Task.PredecessorsCompleteType), value) >= 0;
    })),
    groupNumber: Match.Optional(Number)
  });
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  // Make sure the task exists.
  if (!_.find(activity.tasks, function (task) {
    return task.id === taskId;
  })) {
    throw new AE.ArgumentException("Task ".concat(taskId, " for activity with goal ").concat(activity.goalId, " does not exist."));
  }
  // Update the activity with new data.
  $set = {};
  for (property in data) {
    value = data[property];
    $set["tasks.$.".concat(property)] = value;
  }
  PAA.StudyGuide.Activity.documents.update({
    _id: activity._id,
    'tasks.id': taskId
  }, {
    $set
  });
  // Reinitialize the task and goal.
  taskClass = PAA.Learning.Task.getClassForId(taskId);
  taskClass.initialize();
  goalClass = PAA.Learning.Goal.getClassForId(activity.goalId);
  return goalClass.initialize();
});
PAA.StudyGuide.Activity.removeTask.method(function (activityId, taskId) {
  var activity, goalClass;
  check(activityId, Match.DocumentId);
  check(taskId, String);
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  // Make sure the task exists.
  if (!_.find(activity.tasks, function (task) {
    return task.id === taskId;
  })) {
    throw new AE.ArgumentException("Task ".concat(taskId, " for activity with goal ").concat(activity.goalId, " does not exist."));
  }
  // Remove the task.
  PAA.StudyGuide.Activity.documents.update(activityId, {
    $pull: {
      tasks: {
        id: taskId
      }
    }
  });
  // Clean up the translations.
  Artificial.Babel.Translation.documents.remove({
    namespace: taskId
  });
  // Reinitialize the goal.
  goalClass = PAA.Learning.Goal.getClassForId(activity.goalId);
  goalClass.initialize();
  // Remove the task from the registry.
  return PAA.Learning.Task.removeClassForId(taskId);
});
PAA.StudyGuide.Activity.renameTaskId.method(function (activityId, taskId, newTaskId) {
  var $set, activity, goalClass, i, len, newTasks, rename, task;
  check(activityId, Match.DocumentId);
  check(taskId, String);
  check(newTaskId, String);
  LOI.Authorize.admin();
  if (taskId === newTaskId) {
    throw new AE.ArgumentException("No renaming requested.");
  }
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  // Make sure the task exists.
  task = _.find(activity.tasks, function (task) {
    return task.id === taskId;
  });
  if (!task) {
    throw new AE.ArgumentException("Task ".concat(taskId, " for activity with goal ").concat(activity.goalId, " does not exist."));
  }
  // Rename translation namespaces.
  Artificial.Babel.Translation.documents.update({
    namespace: taskId
  }, {
    $set: {
      namespace: newTaskId
    }
  }, {
    multi: true
  });
  newTasks = _.cloneDeep(activity.tasks);
  rename = id => {
    if (id === taskId) {
      return newTaskId;
    } else {
      return id;
    }
  };
  for (i = 0, len = newTasks.length; i < len; i++) {
    task = newTasks[i];
    task.id = rename(task.id);
    if (task.predecessors) {
      _.transform(task.predecessors, rename);
    }
  }
  $set = {
    tasks: newTasks
  };
  if (activity.tasks) {
    $set.newFinalTasks = _.map(activity.tasks, rename);
  }
  // Update the activity with new task ID.
  PAA.StudyGuide.Activity.documents.update(activityId, {
    $set
  });
  // Remove the old task from the registry.
  PAA.Learning.Task.removeClassForId(taskId);
  // Reinitialize the task and goal.
  PAA.StudyGuide.initializeTask(activity.goalId, newTaskId, task.type);
  goalClass = PAA.Learning.Goal.getClassForId(activity.goalId);
  goalClass.initialize();
  // Rename task in task entries.
  return PAA.Learning.Task.Entry.documents.update({
    taskId
  }, {
    $set: {
      taskId: newTaskId
    }
  }, {
    multi: true
  });
});
PAA.StudyGuide.Activity.changeTaskType.method(function (activityId, taskId, newTaskType) {
  var activity, goalClass, task;
  check(activityId, Match.DocumentId);
  check(taskId, String);
  check(newTaskType, Match.Where(value => {
    return indexOf.call(PAA.Learning.Task.getTypes(), value) >= 0;
  }));
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  // Make sure the task exists.
  task = _.find(activity.tasks, function (task) {
    return task.id === taskId;
  });
  if (!task) {
    throw new AE.ArgumentException("Task ".concat(taskId, " for activity with goal ").concat(activity.goalId, " does not exist."));
  }
  if (task.type === newTaskType) {
    throw new AE.ArgumentException("No change requested.");
  }
  // Update task type.
  PAA.StudyGuide.Activity.documents.update({
    _id: activity._id,
    'tasks.id': taskId
  }, {
    $set: {
      "tasks.$.type": newTaskType
    }
  });
  // Remove the old task from the registry.
  PAA.Learning.Task.removeClassForId(taskId);
  // Reinitialize the task and goal.
  PAA.StudyGuide.initializeTask(activity.goalId, taskId, newTaskType);
  goalClass = PAA.Learning.Goal.getClassForId(activity.goalId);
  return goalClass.initialize();
});
PAA.StudyGuide.Activity.updateArticle.method(function (activityId, updateDeltaOperations) {
  var activity, contentDelta, newContentDelta, updateDelta;
  check(activityId, Match.DocumentId);
  check(updateDeltaOperations, Array);
  LOI.Authorize.admin();
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  contentDelta = new Delta(activity.article || [{
    insert: '\n'
  }]);
  updateDelta = new Delta(updateDeltaOperations);
  newContentDelta = contentDelta.compose(updateDelta);
  // Update the text.
  return PAA.StudyGuide.Activity.documents.update(activityId, {
    $set: {
      article: newContentDelta.ops
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"book":{"book.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/book/book.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Book = function () {
  // A Study Guide book is a collection of Study Guide activities.
  class Book extends AM.Document {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Book';
    }
  }
  ;

  // title: the title of the book
  //   _id
  //   translations
  // slug: auto-generated kebab-case of the en-US title
  // contents: an array of items that are in this book
  //   order: the position of this item in the contents
  //   activity: an activity document that represents this item
  //     _id
  //     goalId
  // design: object with properties that define the book's look
  //   size: the size at which to display the book at
  //     width: the width of the cover in pixels (max 320, the safe width)
  //     height: the height of the cover in pixels (any size)
  //     thickness: the thickness of the book in pixels (min 25)
  //   class: string of the CSS class (or classes) that define the look
  // position: where on the library desk does the book appear on
  //   groupIndex: which pile of books is it on, left to right
  //   groupOrder: where in the pile the book is, top to bottom
  Book.Meta({
    name: Book.id(),
    fields: () => {
      return {
        title: Document.ReferenceField(AB.Translation, ['translations'], false),
        slug: Document.GeneratedField('self', ['title'], function (book) {
          var ref, ref1, ref2, ref3, slug, translations;
          translations = (ref = book.title) != null ? ref.translations : void 0;
          slug = (translations != null ? (ref1 = translations.en) != null ? (ref2 = ref1.us) != null ? ref2.text : void 0 : void 0 : void 0) || (translations != null ? (ref3 = translations.best) != null ? ref3.text : void 0 : void 0) || null;
          if (slug) {
            slug = _.kebabCase(slug);
          }
          return [book._id, slug];
        }),
        contents: [{
          activity: Document.ReferenceField(PAA.StudyGuide.Activity, ['goalId'])
        }]
      };
    }
  });

  // Methods
  Book.insert = Book.method('insert');
  Book.update = Book.method('update');
  Book.remove = Book.method('remove');
  Book.addContentItem = Book.method('addContentItem');
  Book.updateContentItem = Book.method('updateContentItem');
  Book.removeContentItem = Book.method('removeContentItem');

  // Subscriptions
  Book.all = Book.subscription('all');
  return Book;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/book/methods.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Book.insert.method(function () {
  var titleTranslationId;
  LOI.Authorize.admin();
  // Create the translation for the book's title.
  titleTranslationId = AB.Translation.documents.insert({});
  // Create the new book.
  return PAA.StudyGuide.Book.documents.insert({
    title: {
      _id: titleTranslationId
    },
    contents: []
  });
});
PAA.StudyGuide.Book.update.method(function (bookId, data) {
  var book;
  check(bookId, Match.DocumentId);
  check(data, {
    'design.size.width': Match.OptionalOrNull(Match.IntegerMax(320)),
    'design.size.height': Match.OptionalOrNull(Match.Integer),
    'design.size.thickness': Match.OptionalOrNull(Match.IntegerMin(25)),
    'design.class': Match.OptionalOrNull(String),
    'position.groupIndex': Match.OptionalOrNull(Match.NonNegativeInteger),
    'position.groupOrder': Match.OptionalOrNull(Number)
  });
  LOI.Authorize.admin();
  book = PAA.StudyGuide.Book.documents.findOne(bookId);
  if (!book) {
    throw new AE.ArgumentException("Book does not exist.");
  }
  // Update the book with new data.
  return PAA.StudyGuide.Book.documents.update(bookId, {
    $set: data
  });
});
PAA.StudyGuide.Book.remove.method(function (bookId) {
  var book;
  check(bookId, Match.DocumentId);
  LOI.Authorize.admin();
  book = PAA.StudyGuide.Book.documents.findOne(bookId);
  if (!book) {
    throw new AE.ArgumentException("Book does not exist.");
  }
  // Remove the book.
  PAA.StudyGuide.Book.documents.remove(bookId);
  // Clean up the translations.
  return Artificial.Babel.Translation.documents.remove(book.title._id);
});
PAA.StudyGuide.Book.addContentItem.method(function (bookId, activityId) {
  var activities, activity, book, order, ref;
  check(bookId, Match.DocumentId);
  check(activityId, Match.DocumentId);
  LOI.Authorize.admin();
  book = PAA.StudyGuide.Book.documents.findOne(bookId);
  if (!book) {
    throw new AE.ArgumentException("Book does not exist.");
  }
  activities = _.sortBy(book.contents, 'order');
  order = ((ref = _.last(activities)) != null ? ref.order : void 0) || 0;
  activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
  if (!activity) {
    throw new AE.ArgumentException("Activity does not exist.");
  }
  return PAA.StudyGuide.Book.documents.update(bookId, {
    $push: {
      contents: {
        activity: {
          _id: activityId
        },
        order: order
      }
    }
  });
});
PAA.StudyGuide.Book.updateContentItem.method(function (bookId, contentItemIndex, data) {
  var $set, activity, activityId, book, property, value;
  check(bookId, Match.DocumentId);
  check(contentItemIndex, Match.Integer);
  check(data, {
    order: Match.OptionalOrNull(Number),
    'activity._id': Match.OptionalOrNull(Match.DocumentId)
  });
  LOI.Authorize.admin();
  book = PAA.StudyGuide.Book.documents.findOne(bookId);
  if (!book) {
    throw new AE.ArgumentException("Book does not exist.");
  }
  if (!book.contents[contentItemIndex]) {
    throw new AE.ArgumentException("Content item does not exist.");
  }
  if (activityId = data['activity._id']) {
    activity = PAA.StudyGuide.Activity.documents.findOne(activityId);
    if (!activity) {
      throw new AE.ArgumentException("Activity does not exist.");
    }
  }
  // Prepend contents field to properties.
  $set = {};
  for (property in data) {
    value = data[property];
    $set["contents.".concat(contentItemIndex, ".").concat(property)] = value;
  }
  return PAA.StudyGuide.Book.documents.update(bookId, {
    $set
  });
});
PAA.StudyGuide.Book.removeContentItem.method(function (bookId, contentItemIndex) {
  var book;
  check(bookId, Match.DocumentId);
  check(contentItemIndex, Match.Integer);
  LOI.Authorize.admin();
  book = PAA.StudyGuide.Book.documents.findOne(bookId);
  if (!book) {
    throw new AE.ArgumentException("Book does not exist.");
  }
  if (!book.contents[contentItemIndex]) {
    throw new AE.ArgumentException("Content item does not exist.");
  }
  book.contents.splice(contentItemIndex, 1);
  return PAA.StudyGuide.Book.documents.update(bookId, {
    $set: {
      contents: book.contents
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pages":{"pages.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/pages.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages = class Pages {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout":{"layout.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/layout/layout.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Layout = function () {
  class Layout extends LOI.Components.EmbeddedWebpage {
    static image(parameters) {
      return Meteor.absoluteUrl("retropolis/city/academyofart/link-image.png");
    }
    constructor() {
      super(...arguments);
      this._modalDialogs = [];
      this._modalDialogsDependency = new Tracker.Dependency();
    }
    rootClass() {
      return 'pixelartacademy-studyguide';
    }
    addModalDialog(dialogOptions) {
      if (this.embedded) {
        // Delegate dialog display to adventure if embedded.
        return LOI.adventure.addModalDialog(dialogOptions);
      }
      // We add _id so that #each won't re-render the dialogs.
      dialogOptions._id = Random.id();
      // We add new dialogs at the beginning so the first is the (assumed) top-most.
      this._modalDialogs.unshift(dialogOptions);
      return this._modalDialogsDependency.changed();
    }
    removeModalDialog(dialog) {
      var dialogIndex;
      if (this.embedded) {
        // Delegate dialog display to adventure if embedded.
        return LOI.adventure.removeModalDialog(dialogOptions);
      }
      dialogIndex = _.findIndex(this._modalDialogs, function (dialogOptions) {
        return dialogOptions.dialog === dialog;
      });
      this._modalDialogs.splice(dialogIndex, 1);
      return this._modalDialogsDependency.changed();
    }
    modalDialogs() {
      this._modalDialogsDependency.depend();
      return this._modalDialogs;
    }

    // Activates a dialog and waits for the player to complete interacting with it.
    showActivatableModalDialog(dialogOptions) {
      var dialogWasActivated;
      // Wait until dialog has been active and deactivated again.
      dialogWasActivated = false;
      this.addModalDialog(dialogOptions);
      // Wait for the dialog to be rendered.
      return Tracker.afterFlush(() => {
        dialogOptions.dialog.activatable.activate();
        return Tracker.autorun(computation => {
          if (dialogOptions.dialog.activatable.activated()) {
            return dialogWasActivated = true;
          } else if (dialogOptions.dialog.activatable.deactivated() && dialogWasActivated) {
            computation.stop();
            this.removeModalDialog(dialogOptions.dialog);
            // Call callback in nonreactive context in case the callback runs any of its own
            // autoruns (we don't want them to get invalidated when this autorun completes).
            return Tracker.nonreactive(() => {
              return typeof dialogOptions.callback === "function" ? dialogOptions.callback() : void 0;
            });
          }
        });
      });
    }
    showDialogMessage(message) {
      return this.showActivatableModalDialog({
        dialog: new LOI.Components.Dialog({
          message: message,
          buttons: [{
            text: "OK"
          }]
        })
      });
    }
  }
  ;
  Layout.register('PixelArtAcademy.StudyGuide.Pages.Layout');
  return Layout;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.layout.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/layout/template.layout.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Layout");
Template["PixelArtAcademy.StudyGuide.Pages.Layout"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Layout", (function() {
  var view = this;
  return Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "EmbeddedWebpage"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "pixelartacademy-studyguide-pages-layout"
    }, "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("page"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("embedded"));
    }, function() {
      return [ "\n        ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("modalDialogs"));
      }, function() {
        return [ "\n          ", Blaze.Unless(function() {
          return Spacebars.call(view.lookup("dontRender"));
        }, function() {
          return [ "\n            ", Blaze._TemplateWith(function() {
            return Spacebars.call(view.lookup("dialog"));
          }, function() {
            return Spacebars.include(view.lookupTemplate("Render"));
          }), "\n          " ];
        }), "\n        " ];
      }), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"home":{"home.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/home.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home = function () {
  class Home extends AM.Component {
    static title(options) {
      var title;
      title = "Retropolis艺术学院学习指南";
      if (Meteor.isServer) {
        // On the server we don't have access to route parameters.
        return title;
      }
      switch (AB.Router.getParameters().pageOrBook) {
        case this.Pages.StudyPlan:
          title = "Study Plan // ".concat(title);
          break;
        case this.Pages.About:
          title = "About // ".concat(title);
      }
      return title;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.layout = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Layout);
      this.menu = new this.constructor.Menu(this);
      this.activities = new this.constructor.Activities(this);
      this.studyPlan = new this.constructor.StudyPlan(this);
      this.about = new this.constructor.About(this);
      this.book = new this.constructor.Book(this);
      this.submissions = new this.constructor.Submissions(this);
      this.display = this.layout.display;
      // Create design properties.
      this.heightConstants = {
        title: 28,
        navigation: 16,
        header: 28 + 16 + 5,
        blueprintBottom: 79,
        tableSafeArea: 30
      };
      if (this.layout.embedded) {
        // When embedded, the table does not have to show.
        this.heightConstants.tableSafeArea = 5;
      }
      this.viewportHeight = new ComputedField(() => {
        var viewport;
        viewport = this.display.viewport();
        return viewport.viewportBounds.height() / this.display.scale();
      });
      this.safeHeight = new ComputedField(() => {
        var viewport;
        viewport = this.display.viewport();
        return viewport.safeArea.height() / this.display.scale();
      });
      this.contentSafeHeight = new ComputedField(() => {
        return this.safeHeight() - this.heightConstants.header;
      });
      this.safeHeightGap = new ComputedField(() => {
        return (this.viewportHeight() - this.heightConstants.header - this.contentSafeHeight()) / 2;
      });
      this.height = new ComputedField(() => {
        return this.viewportHeight() - this.heightConstants.navigation + this.heightConstants.blueprintBottom + this.safeHeightGap();
      });
      this.widthConstants = {
        innerGap: 40
      };
      this.viewportWidth = new ComputedField(() => {
        var viewport;
        viewport = this.display.viewport();
        return viewport.viewportBounds.width() / this.display.scale();
      });
      this.safeWidth = new ComputedField(() => {
        var viewport;
        viewport = this.display.viewport();
        return viewport.safeArea.width() / this.display.scale();
      });
      this.safeWidthGap = new ComputedField(() => {
        return (this.viewportWidth() - this.safeWidth()) / 2;
      });
      this.width = new ComputedField(() => {
        if (!this._componentsCreated()) {
          return;
        }
        return (this.safeWidthGap() + this.widthConstants.innerGap) * 2 + this.activities.width() + this.studyPlan.width() + this.about.width();
      });
      // Initialize Study Guide activities.
      PAA.StudyGuide.Activity.initializeAll(this);
      // Subscribe to task entries.
      this.autorun(computation => {
        var characterId;
        if (characterId = LOI.characterId()) {
          return PAA.Learning.Task.Entry.forCharacter.subscribe(this, characterId);
        } else {
          return PAA.Learning.Task.Entry.forCurrentUser.subscribe(this);
        }
      });
      // Allow for focusing artworks.
      return this.focusedArtworks = new ReactiveField(null);
    }
    _componentsCreated() {
      var component, i, len, ref;
      ref = [this.activities, this.studyPlan, this.about];
      for (i = 0, len = ref.length; i < len; i++) {
        component = ref[i];
        if (!component.isCreated()) {
          return false;
        }
      }
      return true;
    }
    signIn(callback) {
      var userAutorun;
      // Wait for the user to get signed in.
      userAutorun = Tracker.autorun(computation => {
        if (!Retronator.user()) {
          return;
        }
        computation.stop();
        // User has signed in. Close the sign-in dialog and return control.
        this.menu.signIn.activatable.deactivate();
        return typeof callback === "function" ? callback() : void 0;
      });
      return this.layout.showActivatableModalDialog({
        dialog: this.menu.signIn,
        dontRender: true,
        callback: () => {
          // User has manually closed the sign-in dialog. Stop waiting and return control.
          userAutorun.stop();
          return typeof callback === "function" ? callback() : void 0;
        }
      });
    }
    focusArtworks(artworks) {
      // Save scroll position.
      this._lastScrollTop = $(window).scrollTop();
      // Start display.
      this.focusedArtworks(artworks);
      // After the page has re-rendered, scroll to top.
      return Meteor.setTimeout(() => {
        return $(window).scrollTop(0);
      });
    }
    unfocusArtworks() {
      // Stop display.
      this.focusedArtworks(null);
      // After the page has re-rendered, restore scroll position.
      return Meteor.setTimeout(() => {
        return $(window).scrollTop(this._lastScrollTop);
      });
    }
    openSubmissions(taskId) {
      // Save scroll position.
      this._lastScrollTop = $(window).scrollTop();
      // Close the book and open submissions for the task.
      this.book.close();
      this.submissions.open(taskId);
      // After the book has closed, scroll to top.
      return Meteor.setTimeout(() => {
        return $(window).scrollTop(0);
      }, 500);
    }
    closeSubmissions() {
      // Close submissions and re-open the book.
      this.submissions.close();
      return Meteor.setTimeout(() => {
        this.book.open();
        // After the book became visible again, restore scroll position.
        return Meteor.setTimeout(() => {
          return $(window).scrollTop(this._lastScrollTop);
        });
      }, 600);
    }
    showBackButton() {
      if (!this.book.isCreated()) {
        return;
      }
      return this.book.book();
    }
    backButtonHiddenClass() {
      if (!this.book.isCreated()) {
        return;
      }
      if (this.focusedArtworks()) {
        return 'back-button-hidden';
      }
    }
    pageClass() {
      var Pages, pageClasses, pageOrBook;
      Pages = PAA.StudyGuide.Pages.Home.Pages;
      pageOrBook = this.layout.router.getParameters().pageOrBook;
      if (!pageOrBook) {
        // If first parameter is not defined, we're on activities.
        return Pages.Activities;
      }
      // Output the page slug if we're on one of the pages.
      pageClasses = _.values(Pages);
      if (indexOf.call(pageClasses, pageOrBook) >= 0) {
        return pageOrBook;
      }
      // We are on one of the books.
      return 'book';
    }
    backButtonCallback() {
      return () => {
        // We must return the callback function.
        // If we're focusing on an artwork, we close it.
        if (this.focusedArtworks()) {
          this.unfocusArtworks();
          return {
            // Don't hide the back button.
            cancel: true
          };
        }
        // If we're displaying submissions, close them and re-open the book.
        if (this.submissions.opened()) {
          this.closeSubmissions();
          return {
            // Don't hide the back button.
            cancel: true
          };
        }
        // If we're on an activity, return to table of contents.
        if (this.layout.router.getParameter('activity')) {
          this.book.goToTableOfContents();
          return {
            // Don't hide the back button.
            cancel: true
          };
        }
        // Otherwise we close the book.
        this.book.close();
        return Meteor.setTimeout(() => {
          return this.layout.router.changeParameter('pageOrBook', null);
        }, 500);
      };
    }
    studyPlanRouteOptions() {
      return {
        pageOrBook: PAA.StudyGuide.Pages.Home.Pages.StudyPlan
      };
    }
    aboutRouteOptions() {
      return {
        pageOrBook: PAA.StudyGuide.Pages.Home.Pages.About
      };
    }
    sceneStyle() {
      var backgroundBottom, backgroundHeight, backgroundTop, left, top;
      if (!this._componentsCreated()) {
        return;
      }
      switch (this.layout.router.getParameters().pageOrBook) {
        case this.constructor.Pages.StudyPlan:
          top = -this.heightConstants.navigation;
          left = this.studyPlan.left();
          break;
        case this.constructor.Pages.About:
          top = this.height() - this.viewportHeight();
          left = this.width() - this.viewportWidth();
          break;
        default:
          top = this.height() - this.viewportHeight();
          left = 0;
      }
      backgroundHeight = 396;
      backgroundBottom = this.safeHeightGap() - 50;
      backgroundTop = this.height() - backgroundBottom - backgroundHeight;
      return {
        height: "".concat(this.height(), "rem"),
        width: "".concat(this.width(), "rem"),
        top: "".concat(-top, "rem"),
        left: "".concat(-left, "rem"),
        backgroundPosition: "0 ".concat(backgroundTop, "rem")
      };
    }
    tableStyle() {
      var leftPartWidth, rightPartWidth, tableHeight;
      leftPartWidth = 178;
      rightPartWidth = 189;
      tableHeight = 50;
      return {
        bottom: "".concat(this.safeHeightGap() - (tableHeight - this.heightConstants.tableSafeArea), "rem"),
        left: "".concat(this.safeWidthGap() + leftPartWidth, "rem"),
        right: "".concat(this.safeWidthGap() + rightPartWidth, "rem")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .focusedartworks': this.onClickFocusedArtworks
      });
    }
    onClickFocusedArtworks(event) {
      return this.unfocusArtworks();
    }
  }
  ;
  Home.register('PixelArtAcademy.StudyGuide.Pages.Home');
  Home.Pages = {
    Activities: 'activities',
    StudyPlan: 'study-plan',
    About: 'about'
  };
  return Home;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.home.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/template.home.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home");
Template["PixelArtAcademy.StudyGuide.Pages.Home"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-studyguide-pages-home ", Spacebars.mustache(view.lookup("backButtonHiddenClass")), " ", Spacebars.mustache(view.lookup("pageClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showBackButton"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("backButtonCallback"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
      });
    }), "\n    " ];
  }), "\n    ", HTML.HEADER({
    class: "header"
  }, "\n      ", HTML.H1({
    class: "title"
  }, Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), "Retropolis Academy of Art Study Guide", "PixelArtAcademy.StudyGuide.Pages.Home");
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("Artificial"), "Base", "RouteLink"));
    });
  })), "\n      ", HTML.NAV({
    class: "navigation"
  }, "\n        ", HTML.UL({
    class: "pages"
  }, "\n          ", HTML.LI({
    class: "page"
  }, Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), "活动", "PixelArtAcademy.StudyGuide.Pages.Home");
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("Artificial"), "Base", "RouteLink"));
    });
  })), "\n          ", HTML.LI({
    class: "page"
  }, Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), "学习计划", "PixelArtAcademy.StudyGuide.Pages.Home", view.lookup("studyPlanRouteOptions"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("Artificial"), "Base", "RouteLink"));
    });
  })), "\n          ", HTML.LI({
    class: "page"
  }, Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), "关于", "PixelArtAcademy.StudyGuide.Pages.Home", view.lookup("aboutRouteOptions"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("Artificial"), "Base", "RouteLink"));
    });
  })), "\n        "), "\n      "), "\n    "), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("focusedArtworks"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "focusedartworks"
    }, "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtDatabase"), "Components", "Stream"));
    }), "\n      "), "\n    " ];
  }), "\n    ", HTML.DIV({
    class: "viewport"
  }, "\n      ", HTML.DIV(HTML.Attrs({
    class: "scene"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("sceneStyle"));
  }), "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("activities"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("studyPlan"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("about"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n        ", HTML.DIV(HTML.Attrs({
    class: "table"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("tableStyle"));
  }), HTML.Raw('\n          <div class="drawer"></div>\n        ')), "\n      "), "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("submissions"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    "), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("book"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze.Unless(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("layout"), "embedded"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("menu"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menu":{"menu.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/menu/menu.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, AM, LOI, PAA;
AC = Artificial.Control;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home.Menu = function () {
  class Menu extends AM.Component {
    constructor(home) {
      super(...arguments);
      this.home = home;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.menuVisible = new ReactiveField(false);
      this.menuItems = new this.constructor.Items(this);
      this.signIn = new LOI.Components.SignIn();
      this.account = new LOI.Components.Account({
        dialogProvider: this.home.layout,
        useUrlRouting: false
      });
      return this._transitionDuration = 200;
    }
    showMenu() {
      this.home.layout.addModalDialog({
        dialog: this,
        // We already render the menu ourselves as it only becomes an active dialog when it's visible.
        dontRender: true
      });
      // Make menu visible and do the fade in.
      this.menuVisible(true);
      return this.$('.menu-overlay').velocity('stop').velocity({
        opacity: [1, 0]
      }, {
        duration: this._transitionDuration
      });
    }
    hideMenu() {
      this.home.layout.removeModalDialog(this);
      // Fade out and then make menu not visible.
      return this.$('.menu-overlay').velocity('stop').velocity({
        opacity: [0, 1]
      }, {
        duration: this._transitionDuration,
        complete: () => {
          return this.menuVisible(false);
        }
      });
    }
    menuVisibleClass() {
      if (this.menuVisible()) {
        return 'visible';
      }
    }
    toolbarVisible() {
      if (!this.menuVisible()) {
        return 'visible';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .menu-button': this.onClickMenuButton
      });
    }
    onClickMenuButton(event) {
      return this.showMenu();
    }
  }
  ;
  Menu.register('PixelArtAcademy.StudyGuide.Pages.Home.Menu');
  return Menu;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.menu.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/menu/template.menu.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Menu");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Menu"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Menu", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-pages-home-menu"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "menu-overlay ", Spacebars.mustache(view.lookup("menuVisibleClass")) ];
    }
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("menuVisible"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("menuItems"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: function() {
      return [ "toolbar ", Spacebars.mustache(view.lookup("toolbarVisible")) ];
    }
  }, HTML.Raw('\n      <button class="menu-button">菜单</button>\n    ')), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("signIn"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("account"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"items":{"items.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/menu/items/items.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, RA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
RA = Retronator.Accounts;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home.Menu.Items = function () {
  class Items extends AM.Component {
    constructor(menu) {
      super(...arguments);
      this.menu = menu;
      this.currentScreen = new ReactiveField(this.constructor.Screens.MainMenu);
    }
    inMainMenu() {
      return this.currentScreen() === this.constructor.Screens.MainMenu;
    }
    inUserSelection() {
      return this.currentScreen() === this.constructor.Screens.UserSelection;
    }
    inSettings() {
      return this.currentScreen() === this.constructor.Screens.Settings;
    }
    isFullscreen() {
      return AM.Window.isFullscreen();
    }
    graphicsMaximumScale() {
      return LOI.settings.graphics.maximumScale.value();
    }
    inPermissions() {
      return this.currentScreen() === this.constructor.Screens.Permissions;
    }
    permissionsPersistSettings() {
      return this._permissionsValue(LOI.settings.persistSettings);
    }
    permissionsPersistGameState() {
      return this._permissionsValue(LOI.settings.persistGameState);
    }
    permissionsPersistLogin() {
      return this._permissionsValue(LOI.settings.persistLogin);
    }
    _permissionsValue(consentField) {
      if (consentField.decided()) {
        return consentField.allowed();
      } else {
        return null;
      }
    }
    events() {
      return super.events(...arguments).concat({
        // Main menu
        'click .continue': this.onClickContinue,
        'click .sign-in': this.onClickSignIn,
        'click .user-selection': this.onClickUserSelection,
        'click .account': this.onClickAccount,
        'click .fullscreen': this.onClickFullscreen,
        'click .settings': this.onClickSettings,
        'click .sign-out': this.onClickSignOut,
        // User selection
        'click .select-user': this.onClickSelectUser,
        'click .select-character': this.onClickSelectCharacter,
        'click .user-selection-back-to-menu': this.onClickUserSelectionBackToMenu,
        // Settings
        'click .graphics-scale .previous-button': this.onClickGraphicsScalePreviousButton,
        'click .graphics-scale .next-button': this.onClickGraphicsScaleNextButton,
        'click .permissions': this.onClickPermissions,
        'click .settings-back-to-menu': this.onClickSettingsBackToMenu,
        // Permissions
        'click .permissions-persist-settings': this.onClickPermissionsPersistSettings,
        'click .permissions-persist-game-state': this.onClickPermissionsPersistGameState,
        'click .permissions-persist-login': this.onClickPermissionsPersistLogin,
        'click .back-to-settings': this.onClickBackToSettings
      });
    }

    // Main menu
    onClickContinue(event) {
      return this.menu.hideMenu();
    }
    onClickSignIn(event) {
      return this.menu.home.signIn();
    }
    onClickUserSelection(event) {
      return this.currentScreen(this.constructor.Screens.UserSelection);
    }
    onClickAccount(event) {
      return this.menu.account.show();
    }
    onClickFullscreen(event) {
      if (AM.Window.isFullscreen()) {
        return AM.Window.exitFullscreen();
      } else {
        return AM.Window.enterFullscreen();
      }
    }
    onClickSettings(event) {
      this.currentScreen(this.constructor.Screens.Settings);
      // Store current state of settings.
      return this._oldSettings = LOI.settings.toObject();
    }
    onClickSignOut(event) {
      // Clear character selection. We use undefined to remove the fields from local storage.
      LOI.switchCharacter(void 0);
      // Log out the user.
      return Meteor.logout();
    }

    // User selection
    onClickSelectUser(event) {
      LOI.switchCharacter(void 0);
      return this.currentScreen(this.constructor.Screens.MainMenu);
    }
    onClickSelectCharacter(event) {
      var character;
      character = this.currentData();
      LOI.switchCharacter(character._id);
      return this.currentScreen(this.constructor.Screens.MainMenu);
    }
    onClickUserSelectionBackToMenu(event) {
      return this.currentScreen(this.constructor.Screens.MainMenu);
    }

    // Settings
    onClickGraphicsScalePreviousButton(event) {
      var currentValue;
      currentValue = LOI.settings.graphics.maximumScale.value();
      currentValue--;
      if (currentValue < 2) {
        currentValue = null;
      }
      LOI.settings.graphics.minimumScale.value(currentValue || 2);
      return LOI.settings.graphics.maximumScale.value(currentValue);
    }
    onClickGraphicsScaleNextButton(event) {
      var currentValue;
      currentValue = LOI.settings.graphics.maximumScale.value() || 1;
      currentValue++;
      LOI.settings.graphics.minimumScale.value(currentValue);
      return LOI.settings.graphics.maximumScale.value(currentValue);
    }
    onClickPermissions(event) {
      return this.currentScreen(this.constructor.Screens.Permissions);
    }
    onClickSettingsBackToMenu(event) {
      var newSettings, returnToMenu;
      returnToMenu = () => {
        return this.currentScreen(this.constructor.Screens.MainMenu);
      };
      if (LOI.settings.persistSettings.decided()) {
        // User already decided if they want to save settings so just return to menu.
        return returnToMenu();
      } else {
        // See if settings have changed and ask to save.
        newSettings = LOI.settings.toObject();
        if (EJSON.equals(this._oldSettings, newSettings)) {
          // Settings haven't changed, so no need to save.
          return returnToMenu();
        } else {
          // Settings have changed. Ask to save and return to menu when answered.
          return LOI.settings.persistSettings.showDialog({
            dialogProvider: this.menu.home.layout,
            callback: () => {
              return this.currentScreen(this.constructor.Screens.MainMenu);
            }
          });
        }
      }
    }

    // Permissions
    onClickPermissionsPersistSettings(event) {
      return this._onClickPermissions(LOI.settings.persistSettings);
    }
    onClickPermissionsPersistGameState(event) {
      return this._onClickPermissions(LOI.settings.persistGameState);
    }
    onClickPermissionsPersistLogin(event) {
      if (LOI.settings.persistLogin.allowed()) {
        LOI.settings.persistLogin.disallow();
        // Also delete any login info.
        Accounts._autoLoginEnabled = false;
        return RA.clearLoginInformation();
      } else {
        return LOI.settings.persistLogin.showDialog({
          dialogProvider: this.menu.home.layout,
          callback: value => {
            Accounts._autoLoginEnabled = value;
            if (value) {
              return Accounts._enableAutoLogin();
            }
          }
        });
      }
    }
    _onClickPermissions(consentField) {
      if (consentField.allowed()) {
        return consentField.disallow();
      } else {
        return consentField.showDialog({
          dialogProvider: this.menu.home.layout
        });
      }
    }
    onClickBackToSettings(event) {
      return this.currentScreen(this.constructor.Screens.Settings);
    }
  }
  ;
  Items.register('PixelArtAcademy.StudyGuide.Pages.Home.Menu.Items');
  Items.Screens = {
    MainMenu: 'MainMenu',
    UserSelection: 'UserSelection',
    Settings: 'Settings',
    Permissions: 'Permissions'
  };
  return Items;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.items.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/menu/items/template.items.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Menu.Items");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Menu.Items"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Menu.Items", (function() {
  var view = this;
  return HTML.UL({
    class: "pixelartacademy-studyguide-pages-home-menu-items"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inMainMenu"));
  }, function() {
    return [ HTML.Raw('\n      <li class="menu-item"><span class="continue actionable">继续</span></li>\n      '), Blaze.Unless(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return HTML.Raw('\n        <li class="menu-item"><span class="sign-in actionable">登录</span></li>\n      ');
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return [ "\n        ", HTML.LI({
        class: "menu-item",
        title: "选择追踪您自己的进度还是您的一个角色。"
      }, "\n          ", HTML.SPAN({
        class: "user-selection actionable"
      }, "\n            用户：\n            ", Blaze.If(function() {
        return Spacebars.call(view.lookup("currentCharacter"));
      }, function() {
        return [ "\n              ", Blaze.View("lookup:t7e", function() {
          return Spacebars.mustache(view.lookup("t7e"), Spacebars.dot(view.lookup("currentCharacter"), "avatar", "fullName"));
        }), "\n            " ];
      }, function() {
        return [ "\n              ", Blaze.View("lookup:currentUser.displayName", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "displayName"));
        }), "\n            " ];
      }), "\n          "), "\n        "), HTML.Raw('\n        <li class="menu-item"><span class="account actionable">账户</span></li>\n      ') ];
    }), "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "fullscreen actionable"
    }, "\n        全屏：\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isFullscreen"));
    }, function() {
      return "\n          开启\n        ";
    }, function() {
      return "\n          关闭\n        ";
    }), "\n      ")), HTML.Raw('\n      <li class="menu-item"><span class="settings actionable">设置</span></li>\n      '), HTML.LI({
      class: "menu-item"
    }, "\n        ", HTML.A({
      class: "smallprint actionable",
      href: function() {
        return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.LandingPage.Pages.Smallprint");
      },
      target: "_blank"
    }, "\n          小字条款\n        "), "\n      "), "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentUser"));
    }, function() {
      return HTML.Raw('\n        <li class="menu-item"><span class="sign-out actionable">登出</span></li>\n      ');
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inUserSelection"));
  }, function() {
    return [ "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "actionable select-user"
    }, Blaze.View("lookup:currentUser.displayName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "displayName"));
    }))), "\n      ", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("currentUser"), "playableCharacters"));
    }, function() {
      return [ "\n        ", HTML.LI({
        class: "menu-item"
      }, HTML.SPAN({
        class: "actionable select-character"
      }, Blaze.View("lookup:t7e", function() {
        return Spacebars.mustache(view.lookup("t7e"), Spacebars.dot(view.lookup("avatar"), "fullName"));
      }))), "\n      " ];
    }), HTML.Raw('\n      <li class="menu-item"><span class="user-selection-back-to-menu actionable">返回</span></li>\n    ') ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inSettings"));
  }, function() {
    return [ "\n      \n      ", HTML.LI({
      class: "graphics-scale menu-item"
    }, "\n        Pixel scale:\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("graphicsMaximumScale"));
    }, function() {
      return HTML.Raw('\n          <button class="previous-button">◀</button>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("graphicsMaximumScale"));
    }, function() {
      return [ "\n          ", Blaze.View("lookup:graphicsMaximumScale", function() {
        return Spacebars.mustache(view.lookup("graphicsMaximumScale"));
      }), "x\n        " ];
    }, function() {
      return "\n          Auto\n        ";
    }), HTML.Raw('\n        <button class="next-button">▶</button>\n      ')), HTML.Raw('\n      <li class="menu-item"><span class="actionable permissions">权限</span></li>\n      <li class="menu-item"><span class="settings-back-to-menu actionable">返回</span></li>\n    ') ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inPermissions"));
  }, function() {
    return [ "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "permissions-persist-settings actionable"
    }, "\n        保存设置：", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("permissionsPersistSettings"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permission"));
      });
    }), "\n      ")), "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "permissions-persist-game-state actionable"
    }, "\n        保存游戏状态：", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("permissionsPersistGameState"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permission"));
      });
    }), "\n      ")), "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "permissions-persist-login actionable"
    }, "\n        记住已登录用户：", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("permissionsPersistLogin"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permission"));
      });
    }), "\n      ")), HTML.Raw('\n      <li class="menu-item"><span class="back-to-settings actionable">返回</span></li>\n    ') ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"activities":{"activities.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/activities/activities.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home.Activities = function () {
  class Activities extends AM.Component {
    constructor(home) {
      super(...arguments);
      this.home = home;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.left = new ComputedField(() => {
        return this.home.safeWidthGap();
      });
      this.width = new ComputedField(() => {
        return 295;
      });
      PAA.StudyGuide.Book.all.subscribe(this);
      this.bookGroups = new ComputedField(() => {
        var book, bookGroup, bookGroups, books, groupIndex, i, j, len, len1, ref;
        bookGroups = [];
        books = PAA.StudyGuide.Book.documents.fetch({}, {
          fields: {
            contents: 0
          }
        });
        for (i = 0, len = books.length; i < len; i++) {
          book = books[i];
          groupIndex = ((ref = book.position) != null ? ref.groupIndex : void 0) || 0;
          if (bookGroups[groupIndex] == null) {
            bookGroups[groupIndex] = {
              books: []
            };
          }
          bookGroups[groupIndex].books.push(book);
        }
        for (j = 0, len1 = bookGroups.length; j < len1; j++) {
          bookGroup = bookGroups[j];
          bookGroup.books = _.sortBy(bookGroup.books, 'position.groupOrder');
        }
        return bookGroups;
      });
      return this.activeBookId = new ComputedField(() => {
        var book, slug;
        if (!(slug = this.home.layout.router.getParameter('pageOrBook'))) {
          return;
        }
        book = PAA.StudyGuide.Book.documents.findOne({
          slug
        });
        return book != null ? book._id : void 0;
      });
    }
    activitiesStyle() {
      return {
        left: "".concat(this.left(), "rem"),
        bottom: "".concat(this.home.safeHeightGap() + this.home.heightConstants.tableSafeArea, "rem"),
        width: "".concat(this.width(), "rem"),
        height: "".concat(this.home.contentSafeHeight() - this.home.heightConstants.tableSafeArea, "rem")
      };
    }
    bookActiveClass() {
      var book;
      book = this.currentData();
      if (book._id === this.activeBookId()) {
        return 'active';
      }
    }
    bookStyle() {
      var book, height, marginLeft, marginTop, ref, size, width;
      book = this.currentData();
      size = (ref = book.design) != null ? ref.size : void 0;
      width = Math.round(((size != null ? size.height : void 0) || 500) / 3.75);
      height = Math.round(((size != null ? size.thickness : void 0) || 25) / 3.75);
      marginTop = book._id === this.activeBookId() ? -height : 0;
      marginLeft = Math.floor(Math.random() * 10);
      return {
        width: "".concat(width, "rem"),
        height: "".concat(height, "rem"),
        marginTop: "".concat(marginTop, "rem"),
        marginLeft: "".concat(marginLeft, "rem"),
        lineHeight: "".concat(height, "rem")
      };
    }
    pagesStyle() {
      var book, ref, size;
      book = this.currentData();
      size = (ref = book.design) != null ? ref.size : void 0;
      return {
        width: "".concat(1 + Math.round(((size != null ? size.width : void 0) || 320) / 100), "rem")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .book': this.onClickBook
      });
    }
    onClickBook(event) {
      var book;
      book = this.currentData();
      return this.home.layout.router.changeParameter('pageOrBook', book.slug);
    }
  }
  ;
  Activities.register('PixelArtAcademy.StudyGuide.Pages.Home.Activities');
  return Activities;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.activities.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/activities/template.activities.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Activities");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Activities"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Activities", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-studyguide-pages-home-activities"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("activitiesStyle"));
  }), "\n      ", HTML.UL({
    class: "groups"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("bookGroups"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: "group"
    }, "\n            ", HTML.UL({
      class: "books"
    }, "\n              ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("books"));
    }, function() {
      return [ "\n                ", HTML.LI(HTML.Attrs({
        class: function() {
          return [ "book ", Spacebars.mustache(Spacebars.dot(view.lookup("design"), "class")), " ", Spacebars.mustache(view.lookup("bookActiveClass")) ];
        }
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("bookStyle"));
      }), "\n                  ", HTML.DIV({
        class: "spine"
      }, HTML.Raw('\n                    <div class="trim top"></div>\n                    '), HTML.DIV({
        class: "title"
      }, Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("title"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      })), HTML.Raw('\n                    <div class="trim bottom"></div>\n                  ')), "\n                  ", HTML.DIV(HTML.Attrs({
        class: "pages"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("pagesStyle"));
      })), "\n                "), "\n              " ];
    }), "\n            "), "\n          "), "\n        " ];
  }), "\n      "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"studyplan":{"studyplan.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/studyplan/studyplan.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AM = Artificial.Mirage;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home.StudyPlan = function () {
  class StudyPlan extends AM.Component {
    constructor(home) {
      super(...arguments);
      this.home = home;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.left = new ComputedField(() => {
        return this.home.activities.left() + this.home.activities.width() + this.home.widthConstants.innerGap;
      });
      return this.width = new ComputedField(() => {
        return this.home.viewportWidth();
      });
    }
    studyPlanStyle() {
      return {
        left: "".concat(this.left(), "rem"),
        top: "0rem",
        width: "".concat(this.width(), "rem"),
        height: "".concat(this.home.viewportHeight() - this.home.heightConstants.navigation, "rem")
      };
    }
  }
  ;
  StudyPlan.register('PixelArtAcademy.StudyGuide.Pages.Home.StudyPlan');
  return StudyPlan;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.studyplan.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/studyplan/template.studyplan.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.StudyPlan");
Template["PixelArtAcademy.StudyGuide.Pages.Home.StudyPlan"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.StudyPlan", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-studyguide-pages-home-study-plan"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("studyPlanStyle"));
  }), HTML.Raw('\n    <div class="board">\n      <div class="arm left"></div>\n      <div class="arm right"></div>\n      <div class="leg left"></div>\n      <div class="leg right"></div>\n    </div>\n    <div class="paper">\n      <div class="coming-soon">即将推出！</div>\n    </div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"about":{"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/about/about.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AM = Artificial.Mirage;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home.About = function () {
  class About extends AM.Component {
    constructor(home) {
      super(...arguments);
      this.home = home;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.left = new ComputedField(() => {
        return this.home.studyPlan.left() + this.home.studyPlan.width() + this.home.widthConstants.innerGap;
      });
      return this.width = new ComputedField(() => {
        return 200;
      });
    }
    aboutStyle() {
      return {
        left: "".concat(this.left(), "rem"),
        bottom: "".concat(this.home.safeHeightGap() + this.home.heightConstants.tableSafeArea, "rem"),
        width: "".concat(this.width(), "rem"),
        height: "".concat(this.home.contentSafeHeight(), "rem")
      };
    }
  }
  ;
  About.register('PixelArtAcademy.StudyGuide.Pages.Home.About');
  return About;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.about.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/about/template.about.js                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.About");
Template["PixelArtAcademy.StudyGuide.Pages.Home.About"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.About", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-studyguide-pages-home-about"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("aboutStyle"));
  }), "\n    ", HTML.DIV({
    class: "table-stand"
  }, "\n      ", HTML.DIV({
    class: "paper"
  }, "\n        ", HTML.P("\n          学习指南提供了我们在\n          ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "Retropolis.City.Pages.AcademyOfArt.Academy");
    }
  }, "Retropolis Academy of Art"), ".\n        "), HTML.Raw("\n        <p>\n          它整合了其他在线资源，并提供艺术领域的实践活动，包括游戏开发。这是一个正在进行中的工作，将会有更多卷册和活动推出。\n        </p>\n      ")), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"submissions":{"submissions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/submissions/submissions.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, ABs, AE, AM, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Babel;
ABs = Artificial.Base;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home.Submissions = function () {
  class Submissions extends AM.Component {
    constructor(home) {
      super(...arguments);
      this.home = home;
    }
    onCreated() {
      var parentWithDisplay;
      super.onCreated(...arguments);
      parentWithDisplay = this.ancestorComponentWith('display');
      this.display = parentWithDisplay.display;
      this.taskId = new ReactiveField(null);
      this.taskClass = new ComputedField(() => {
        var taskId;
        if (!(taskId = this.taskId())) {
          return;
        }
        return PAA.Learning.Task.getClassForId(taskId);
      });
      this.task = new ComputedField(() => {
        var taskClass;
        if (!(taskClass = this.taskClass())) {
          return;
        }
        return new taskClass();
      });
      this.entries = new ComputedField(() => {
        var taskId;
        if (!(taskId = this.taskId())) {
          return;
        }
        return PAA.Learning.Task.Entry.documents.fetch({
          taskId: taskId
        }, {
          sort: {
            time: 1
          }
        });
      });
      this.reversedEntries = new ComputedField(() => {
        var entries;
        if (!(entries = this.entries())) {
          return;
        }
        return _.reverse(_.clone(entries));
      });
      this.displayedEntries = new ComputedField(() => {
        var endIndex, entries, startIndex;
        if (!(entries = this.entries())) {
          return;
        }
        startIndex = this.entriesPerPage * this.currentPageIndex();
        endIndex = Math.min(startIndex + this.entriesPerPage - 1, entries.length);
        return entries.slice(startIndex, +endIndex + 1 || 9e9);
      });
      this.entriesPerPage = 14;
      this.currentPageIndex = new ReactiveField(0);
      this.hoveredEntry = new ReactiveField(null);
      this.setHoveredEntry = _.debounce(entry => {
        return this.hoveredEntry(entry);
      }, 50);
      this.pagesCount = new ComputedField(() => {
        var entries;
        if (!(entries = this.entries())) {
          return 1;
        }
        return Math.ceil(entries.length / this.entriesPerPage);
      });
      // Reactively subscribe to task submissions.
      this.submissionsSubscription = new ComputedField(() => {
        var taskId;
        if (!(taskId = this.taskId())) {
          return;
        }
        return PAA.Learning.Task.Entry.forTaskId.subscribe(this, taskId);
      });
      this.loaded = new ComputedField(() => {
        var ref;
        return (ref = this.submissionsSubscription()) != null ? ref.ready() : void 0;
      });
      this.displayed = new ReactiveField(false);
      this.opened = new ReactiveField(false);
      return this.entriesSheetDisplayed = new ReactiveField(false);
    }
    open(taskId) {
      this.taskId(taskId);
      // Wait for the book to move out of the way.
      return Meteor.setTimeout(() => {
        this.displayed(true);
        // After the submissions have loaded and the folder has finished animating, open the folder.
        return this.autorun(computation => {
          if (!this.loaded()) {
            return;
          }
          computation.stop();
          return Meteor.setTimeout(() => {
            this.opened(true);
            // After the folder has opened, display the entries sheet.
            return Meteor.setTimeout(() => {
              return this.entriesSheetDisplayed(true);
            }, 300);
          }, 600);
        });
      }, 300);
    }
    close() {
      // Store back the entries sheet.
      this.entriesSheetDisplayed(false);

      // After the sheet has been stored, close the cover.
      return Meteor.setTimeout(() => {
        this.opened(false);
        // After the cover has closed, hide the folder.
        return Meteor.setTimeout(() => {
          this.displayed(false);
          // After the folder was hidden, unload the task.
          return Meteor.setTimeout(() => {
            return this.taskId(null);
          }, 600);
        }, 300);
      }, 300);
    }
    loadedClass() {
      if (this.loaded()) {
        return 'loaded';
      }
    }
    openedClass() {
      if (this.opened()) {
        return 'opened';
      }
    }
    submissionsStyle() {
      var height, left, leftOffset, top, topOffset, width;
      width = 282;
      height = 189;
      // Calculate offsets withing the safe area.
      leftOffset = (this.home.safeWidth() - width) / 2;
      topOffset = (this.home.safeHeight() - height) / 2;
      left = this.home.safeWidthGap() + leftOffset;
      if (this.loaded() && this.displayed()) {
        top = this.home.safeHeightGap() + topOffset;
      } else {
        top = this.home.viewportHeight() + 1;
      }
      if (!this.opened()) {
        // Center when closed.
        left -= width / 4;
      }
      return {
        left: "".concat(left, "rem"),
        top: "".concat(top, "rem")
      };
    }
    entriesSheetDisplayedClass() {
      if (this.entriesSheetDisplayed()) {
        return 'displayed';
      }
    }
    emptyEntries() {
      var emptyEntry, entriesCount, i, ref, ref1, results;
      entriesCount = ((ref = this.displayedEntries()) != null ? ref.length : void 0) || 0;
      results = [];
      for (emptyEntry = i = 0, ref1 = this.entriesPerPage - entriesCount; 0 <= ref1 ? i < ref1 : i > ref1; emptyEntry = 0 <= ref1 ? ++i : --i) {
        results.push(null);
      }
      return results;
    }
    entryName() {
      var entry, name, ref;
      entry = this.currentData();
      if (entry.user) {
        name = entry.user.publicName;
      } else {
        name = (ref = entry.character.avatar) != null ? ref.fullName.translate().text : void 0;
      }
      return name || '匿名';
    }
    entryDateText() {
      var entry, languagePreference;
      entry = this.currentData();
      languagePreference = AB.languagePreference();
      return entry.time.toLocaleDateString(languagePreference, {
        dateStyle: 'short'
      });
    }
    currentPageNumber() {
      return this.currentPageIndex() + 1;
    }
    events() {
      return super.events(...arguments).concat({
        'mouseenter .entry': this.onMouseEnterEntry,
        'mouseleave .entry': this.onMouseLeaveEntry,
        'click .previous .page-button': this.onClickPreviousPageButton,
        'click .next .page-button': this.onClickNextPageButton,
        'click .entry': this.onClickEntry,
        'click .pictures': this.onClickPictures
      });
    }
    onMouseEnterEntry(event) {
      var entry;
      entry = this.currentData();
      return this.setHoveredEntry(entry);
    }
    onMouseLeaveEntry(event) {
      return this.setHoveredEntry(null);
    }
    onClickPreviousPageButton(event) {
      return this.currentPageIndex(this.currentPageIndex() - 1);
    }
    onClickNextPageButton(event) {
      return this.currentPageIndex(this.currentPageIndex() + 1);
    }
    onClickEntry(event) {
      var artworks, entry;
      entry = this.currentData();
      artworks = [{
        image: {
          url: entry.upload.picture.url
        }
      }];
      return this.home.focusArtworks(artworks);
    }
    onClickPictures(event) {
      var artworks, entries, entry;
      entries = this.displayedEntries();
      artworks = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = entries.length; i < len; i++) {
          entry = entries[i];
          results.push({
            image: {
              url: entry.upload.picture.url
            }
          });
        }
        return results;
      }();
      return this.home.focusArtworks(artworks);
    }
  }
  ;
  Submissions.register('PixelArtAcademy.StudyGuide.Pages.Home.Submissions');
  return Submissions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.submissions.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/submissions/template.submissions.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Submissions");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Submissions"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Submissions", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-studyguide-pages-home-submissions ", Spacebars.mustache(view.lookup("loadedClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("submissionsStyle"));
  }), "\n    ", HTML.DIV({
    class: function() {
      return [ "folder ", Spacebars.mustache(view.lookup("openedClass")) ];
    }
  }, HTML.Raw('\n      <div class="cover back"></div>\n      <div class="cover opened"></div>\n      '), HTML.DIV({
    class: function() {
      return [ "entries-sheet ", Spacebars.mustache(view.lookup("entriesSheetDisplayedClass")) ];
    }
  }, "\n        ", HTML.DIV({
    class: "title"
  }, "\n          任务：\n          ", HTML.DIV({
    class: "name"
  }, "\n            ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("task"), "directiveTranslation"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t10e"));
  }), "\n          "), "\n        "), "\n        ", HTML.TABLE({
    class: "entries"
  }, "\n          ", HTML.TR({
    class: "header"
  }, HTML.Raw('\n            <th class="name">名称：</th>\n            <th class="date">日期：</th>\n          ')), "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("displayedEntries"));
  }, function() {
    return [ "\n            ", HTML.TR({
      class: "entry"
    }, "\n              ", HTML.TD({
      class: "name"
    }, Blaze.View("lookup:entryName", function() {
      return Spacebars.mustache(view.lookup("entryName"));
    })), "\n              ", HTML.TD({
      class: "date"
    }, Blaze.View("lookup:entryDateText", function() {
      return Spacebars.mustache(view.lookup("entryDateText"));
    })), "\n            "), "\n          " ];
  }), "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("emptyEntries"));
  }, function() {
    return [ "\n            ", HTML.TR({
      class: "empty-row"
    }, HTML.Raw('\n              <td class="name"></td>\n              <td class="date"></td>\n            ')), "\n          " ];
  }), "\n        "), "\n        ", HTML.DIV({
    class: "pagination"
  }, "\n          ", HTML.DIV({
    class: "previous"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$gt"), view.lookup("currentPageNumber"), 1);
  }, function() {
    return HTML.Raw('\n              <button class="page-button">← 返回</button>\n            ');
  }), "\n          "), "\n          ", HTML.DIV({
    class: "counter"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("pagesCount"));
  }, function() {
    return [ "\n              ", Blaze.View("lookup:currentPageNumber", function() {
      return Spacebars.mustache(view.lookup("currentPageNumber"));
    }), "/", Blaze.View("lookup:pagesCount", function() {
      return Spacebars.mustache(view.lookup("pagesCount"));
    }), "\n            " ];
  }), "\n          "), "\n          ", HTML.DIV({
    class: "next"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$lt"), view.lookup("currentPageNumber"), view.lookup("pagesCount"));
  }, function() {
    return HTML.Raw('\n              <button class="page-button">下一个 →</button>\n            ');
  }), "\n          "), "\n        "), "\n      "), "\n      ", HTML.DIV({
    class: "pictures"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("reversedEntries"));
  }, function() {
    return [ "\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Home", "Submissions", "Picture"));
    }), "\n        " ];
  }), "\n      "), HTML.Raw('\n      <div class="pocket"></div>\n      '), HTML.DIV({
    class: "cover closed"
  }, "\n        ", HTML.DIV({
    class: "title"
  }, "\n          ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("task"), "directiveTranslation"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t10e"));
  }), "\n        "), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"picture":{"picture.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/submissions/picture/picture.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  PAA,
  Quill,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Quill = AM.Quill;
PAA.StudyGuide.Pages.Home.Submissions.Picture = function () {
  class Picture extends AM.Component {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Home.Submissions.Picture';
    }
    constructor() {
      super(...arguments);
      this.autoScaledImageMixin = new PAA.Components.AutoScaledImageMixin();
    }
    mixins() {
      return [this.autoScaledImageMixin];
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.submissions = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Home.Submissions);
    }
    autoScaledImageMaxHeight() {
      var imageInfo;
      // Images shouldn't be taller than half the page, but add some diversity.
      imageInfo = this.autoScaledImageMixin.imageInfo();
      return 90 - imageInfo.height % 7;
    }
    autoScaledImageMaxWidth() {
      var imageInfo;
      // Images shouldn't be wider than the folder, but add some diversity.
      imageInfo = this.autoScaledImageMixin.imageInfo();
      return 120 - imageInfo.width % 7;
    }
    autoScaledImageDisplayScale() {
      return this.submissions.display.scale();
    }
    loadedClass() {
      if (this.autoScaledImageMixin.imageInfo()) {
        return 'loaded';
      }
    }
    displayedClass() {
      var entries, entry;
      entry = this.data();
      if (!(entries = this.submissions.displayedEntries())) {
        return;
      }
      if (indexOf.call(entries, entry) >= 0) {
        return 'displayed';
      }
    }
    hoveredClass() {
      var entry;
      entry = this.data();
      if (entry === this.submissions.hoveredEntry()) {
        return 'hovered';
      }
    }
    componentStyle() {
      var imageInfo, right;
      if (!(imageInfo = this.autoScaledImageMixin.imageInfo())) {
        return;
      }
      // Randomize right position slightly.
      right = 3 + imageInfo.width % 5;
      return {
        right: "".concat(right, "rem")
      };
    }
  }
  ;
  Picture.register(Picture.id());
  return Picture;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.picture.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/submissions/picture/template.picture.js                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Submissions.Picture");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Submissions.Picture"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Submissions.Picture", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "pixelartacademy-studyguide-pages-home-submissions-picture ", Spacebars.mustache(view.lookup("loadedClass")), " ", Spacebars.mustache(view.lookup("displayedClass")), " ", Spacebars.mustache(view.lookup("hoveredClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("componentStyle"));
  }), "\n    ", HTML.IMG(HTML.Attrs({
    class: "picture autoscaledimage",
    src: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("upload"), "picture", "url"));
    },
    crossorigin: "anonymous"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("autoScaledImageStyle"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"book":{"book.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/book/book.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Home.Book = function () {
  class Book extends AM.Component {
    constructor(home) {
      super(...arguments);
      this.home = home;
    }
    onCreated() {
      var parentWithDisplay;
      super.onCreated(...arguments);
      parentWithDisplay = this.ancestorComponentWith('display');
      this.display = parentWithDisplay.display;
      // Visible tells if the book is anywhere in the viewport (even when transitioning).
      this.visible = new ReactiveField(false);
      // Opened tells if the book is open or transitioning to open.
      this.opened = new ReactiveField(false);
      this.leftPageIndex = new ReactiveField(0);
      this.visiblePageIndex = new ReactiveField(1);
      this.pagesCount = new ReactiveField(null);
      this.manualContentUpdatedDependency = new Tracker.Dependency();
      this.book = new ComputedField(() => {
        var book, bookId;
        if (!this.home.activities.isCreated()) {
          return;
        }
        bookId = this.home.activities.activeBookId();
        book = PAA.StudyGuide.Book.documents.findOne(bookId);
        if (book) {
          // Start on first page.
          this.leftPageIndex(0);
          this.visiblePageIndex(1);

          // Mark book as loaded for transitions to start.
          Meteor.setTimeout(() => {
            return this.visible(true);
          }, 100);
          // Make book visible after it has rendered and positioned outside the screen.
          Meteor.setTimeout(() => {
            return this.open();
          }, 500);
        } else {
          this.visible(false);
        }
        return book;
      });
      this._goals = {};
      this.contentItems = new ComputedField(() => {
        var base, book, goal, goalClass, goalId, i, item, len, results, slug, sortedContents;
        if (!(book = this.book())) {
          return [];
        }
        sortedContents = _.orderBy(book.contents, 'order');
        results = [];
        for (i = 0, len = sortedContents.length; i < len; i++) {
          item = sortedContents[i];
          // Create goal if needed.
          goalId = item.activity.goalId;
          goalClass = PAA.StudyGuide.Goals[goalId];
          if ((base = this._goals)[goalId] == null) {
            base[goalId] = new goalClass();
          }
          // Generate activity slug.
          goal = this._goals[goalId];
          slug = _.kebabCase(goal.displayName());
          results.push({
            activity: item.activity,
            goal: goal,
            slug: slug
          });
        }
        return results;
      });
      this.activeContentItem = new ComputedField(() => {
        var slug;
        slug = this.home.layout.router.getParameter('activity');
        return _.find(this.contentItems(), contentItem => {
          return contentItem.slug === slug;
        });
      });
      this.designConstants = {
        pageMargins: {
          left: 45,
          right: 25
        },
        moveButtonExtraWidth: 23,
        frontPageLeftOffset: 5
      };
      // Since the left and right borders are not equal, we need to additionally offset the book to focus on the center.
      return this.designConstants.focusOffset = (this.designConstants.pageMargins.right - this.designConstants.pageMargins.left) / 2;
    }
    onRendered() {
      super.onRendered(...arguments);
      // Reactively update pages count.
      this.autorun(computation => {
        if (!this.book()) {
          return;
        }
        if (!this.opened()) {
          return;
        }
        // Update when active content item or page index changes.
        this.activeContentItem();
        this.visiblePageIndex();
        return this.updatePagesCount();
      });
      // React to active content item changes.
      return this.autorun(computation => {
        var activeContentItem;
        activeContentItem = this.activeContentItem();
        if (activeContentItem) {
          // If we're coming from the table of contents, go to first page of the article.
          if (!this._lastActiveContentItem) {
            this.leftPageIndex(0);
            this.visiblePageIndex(0);
          }
        } else {
          // Remember which page on the table of contents we were.
          this._lastTableOfContentsVisiblePageIndex = this.visiblePageIndex();
        }
        return this._lastActiveContentItem = activeContentItem;
      });
    }
    onDestroyed() {
      var goal, i, len, ref, results;
      super.onDestroyed(...arguments);
      ref = this._goals;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        goal = ref[i];
        results.push(goal.destroy());
      }
      return results;
    }
    open() {
      // Mark book as visible for transitions to start.
      this.visible(true);
      // Make book opened after it has positioned outside the screen.
      return Meteor.setTimeout(() => {
        return this.opened(true);
      }, 100);
    }
    close() {
      this.opened(false);
      return Meteor.setTimeout(() => {
        return this.visible(false);
      }, 500);
    }
    goToTableOfContents() {
      // Return to the page of the table of contents that we last saw.
      this.visiblePageIndex(this._lastTableOfContentsVisiblePageIndex);
      this.leftPageIndex(Math.floor(this._lastTableOfContentsVisiblePageIndex / 2) * 2);
      this.home.layout.router.changeParameter('activity', null);
      return this.scrollToTop();
    }
    canMoveLeft() {
      if (this.activeContentItem()) {
        // On articles, we can move left if we're not on the first page.
        return this.visiblePageIndex();
      } else {
        // Table of contents starts on the right, so we can move back only on second spread.
        return this.leftPageIndex();
      }
    }
    canMoveRight() {
      // Are we on the last page of the section?
      if (this.activeContentItem()) {
        return this.visiblePageIndex() + 1 < this.pagesCount();
      } else {
        return this.visiblePageIndex() < this.pagesCount();
      }
    }
    previousPage() {
      var leftPageIndex, visiblePageIndex;
      if (!this.canMoveLeft()) {
        return;
      }
      leftPageIndex = this.leftPageIndex();
      visiblePageIndex = this.visiblePageIndex();
      if (leftPageIndex === visiblePageIndex) {
        leftPageIndex -= 2;
      }
      visiblePageIndex--;
      this.leftPageIndex(leftPageIndex);
      this.visiblePageIndex(visiblePageIndex);
      return this.scrollToTop();
    }
    nextPage() {
      var leftPageIndex, visiblePageIndex;
      if (!this.canMoveRight()) {
        return;
      }
      leftPageIndex = this.leftPageIndex();
      visiblePageIndex = this.visiblePageIndex();
      if (leftPageIndex !== visiblePageIndex) {
        leftPageIndex += 2;
      }
      visiblePageIndex++;
      this.leftPageIndex(leftPageIndex);
      this.visiblePageIndex(visiblePageIndex);
      return this.scrollToTop();
    }
    scrollToTop() {
      var currentScrollTop, html, targetScrollTop;
      html = $("html")[0];
      if (!(currentScrollTop = html.scrollTop)) {
        return;
      }
      targetScrollTop = 0;
      return $(".pixelartacademy-studyguide-pages-home-book").velocity({
        tween: [targetScrollTop, currentScrollTop]
      }, {
        duration: 500,
        easing: 'ease-in-out',
        progress: (elements, complete, remaining, start, tweenValue) => {
          return html.scrollTop = tweenValue;
        }
      });
    }
    contentUpdated() {
      return this.manualContentUpdatedDependency.changed();
    }
    updatePagesCount() {
      // Depend on manual update events.
      this.manualContentUpdatedDependency.depend();
      if (this.activeContentItem()) {
        return this._updatePagesCountActivity();
      } else {
        // Depend on content items.
        this.contentItems();
        return this._updatePagesCountTableOfContents();
      }
    }
    _updatePagesCountActivity() {
      return this._updatePagesCountViaEndPage();
    }
    _updatePagesCountTableOfContents() {
      return this._updatePagesCountViaEndPage();
    }
    _updatePagesCountViaEndPage() {
      var columnProperties, pageWidth, scale;
      if (!(columnProperties = this.columnProperties())) {
        return;
      }
      scale = this.display.scale();
      pageWidth = (columnProperties.columnWidth + columnProperties.columnGap) * scale;
      return Meteor.setTimeout(() => {
        var endPageLeft, pagesCount;
        // Search for the new end page.
        endPageLeft = this.$('.end-page').position().left;
        pagesCount = Math.ceil((endPageLeft + 1) / pageWidth);
        return this.pagesCount(pagesCount);
      }, 100);
    }
    visibleClass() {
      if (this.visible()) {
        return 'visible';
      }
    }
    componentStyle() {
      var book, bookWidth, fullWidth, horizontalGap, left, scale, verticalGap, viewport, viewportHeight, viewportWidth;
      if (!(book = this.book())) {
        return;
      }
      viewport = this.display.viewport();
      scale = this.display.scale();
      bookWidth = book.design.size.width;
      viewportWidth = viewport.viewportBounds.width() / scale;
      viewportHeight = viewport.viewportBounds.height() / scale;
      horizontalGap = (viewportWidth - bookWidth) / 2;
      verticalGap = (viewportHeight - viewport.safeArea.height() / scale) / 2;
      verticalGap = _.clamp(verticalGap, 10, 30);
      fullWidth = (bookWidth + horizontalGap) * 2;
      if (this.opened()) {
        if (this.leftPageIndex() === this.visiblePageIndex()) {
          left = this.designConstants.focusOffset;
        } else {
          left = viewportWidth - fullWidth - this.designConstants.focusOffset;
        }
      } else {
        left = horizontalGap - fullWidth - 1;
      }
      return {
        left: "".concat(Math.round(left), "rem"),
        padding: "".concat(Math.round(verticalGap), "rem ").concat(Math.round(horizontalGap), "rem")
      };
    }
    bookStyle() {
      var book;
      if (!(book = this.book())) {
        return;
      }
      return {
        width: "".concat(book.design.size.width * 2, "rem"),
        height: "".concat(book.design.size.height, "rem")
      };
    }
    _horizontalGap() {
      var book, bookWidth, scale, viewport, viewportWidth;
      if (!(book = this.book())) {
        return;
      }
      viewport = this.display.viewport();
      scale = this.display.scale();
      bookWidth = book.design.size.width;
      viewportWidth = viewport.viewportBounds.width() / scale;
      return (viewportWidth - bookWidth) / 2;
    }
    moveButtonStyle() {
      var horizontalGap, width;
      horizontalGap = this._horizontalGap();
      if (horizontalGap == null) {
        return;
      }
      width = horizontalGap + this.designConstants.moveButtonExtraWidth;
      return {
        width: "".concat(width, "rem")
      };
    }
    frontPageClass() {
      if (!(this.activeContentItem() || this.leftPageIndex())) {
        return 'front';
      }
    }
    rightPageHasContent() {
      return this.leftPageIndex() + 1 < this.pagesCount();
    }
    pageNumberLeft() {
      var pageNumber;
      pageNumber = this.leftPageIndex() + 1;
      if (!this.activeContentItem()) {
        pageNumber--;
      }
      return pageNumber;
    }
    showPageNumberRight() {
      return this.pageNumberRight() <= this.pagesCount();
    }
    pageNumberRight() {
      return this.pageNumberLeft() + 1;
    }
    columnProperties() {
      var book, margins;
      if (!(book = this.book())) {
        return;
      }
      margins = this.designConstants.pageMargins;
      return {
        columnWidth: book.design.size.width - margins.left - margins.right,
        columnGap: 2 * margins.right
      };
    }
    contentsStyle() {
      var columnProperties, left, leftPageIndex, onTableOfContents, pageIndex, pagesCount, width;
      if (!(columnProperties = this.columnProperties())) {
        return;
      }
      leftPageIndex = this.leftPageIndex();
      pageIndex = leftPageIndex;
      // Table of contents starts on the right.
      onTableOfContents = !this.activeContentItem();
      if (onTableOfContents) {
        pageIndex -= 1;
      }
      left = -pageIndex * (columnProperties.columnWidth + columnProperties.columnGap);
      pagesCount = 100;
      width = pagesCount * columnProperties.columnWidth + (pagesCount - 1) * columnProperties.columnGap;
      if (onTableOfContents && !leftPageIndex) {
        // On the front page, we have extra left offset.
        left += this.designConstants.frontPageLeftOffset;
      }
      return {
        left: "".concat(left, "rem"),
        width: "".concat(width, "rem"),
        columnWidth: "".concat(columnProperties.columnWidth, "rem"),
        columnGap: "".concat(columnProperties.columnGap, "rem")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .move-button.left': this.onClickMoveButtonLeft,
        'click .move-button.right': this.onClickMoveButtonRight
      });
    }
    onClickMoveButtonLeft(event) {
      return this.previousPage();
    }
    onClickMoveButtonRight(event) {
      return this.nextPage();
    }
  }
  ;
  Book.register('PixelArtAcademy.StudyGuide.Pages.Home.Book');
  Book.TableOfContentsItem = function () {
    class TableOfContentsItem extends AM.Component {
      onCreated() {
        super.onCreated(...arguments);
        this.bookComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Home.Book);
        return this.book = new ComputedField(() => {
          return this.bookComponent.book();
        });
      }
      started() {
        var goal, i, len, ref, task;
        ({
          goal
        } = this.data());
        ref = goal.tasks();
        for (i = 0, len = ref.length; i < len; i++) {
          task = ref[i];
          if (task.completed()) {
            // At least one task needs to be completed.
            return true;
          }
        }
        return false;
      }
      allTasksCompleted() {
        var goal, i, len, ref, task;
        ({
          goal
        } = this.data());
        ref = goal.tasks();
        // All tasks need to be completed.
        for (i = 0, len = ref.length; i < len; i++) {
          task = ref[i];
          if (!task.completed()) {
            return;
          }
        }
        return true;
      }
    }
    ;
    TableOfContentsItem.register("PixelArtAcademy.StudyGuide.Pages.Home.Book.TableOfContentsItem");
    return TableOfContentsItem;
  }.call(this);
  return Book;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.book.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/book/template.book.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Book");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Book"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Book", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.call(view.lookup("book"));
  }, function() {
    return [ "\n    ", HTML.DIV(HTML.Attrs({
      class: function() {
        return [ "pixelartacademy-studyguide-pages-home-book ", Spacebars.mustache(view.lookup("visibleClass")) ];
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("componentStyle"));
    }), "\n      ", HTML.DIV(HTML.Attrs({
      class: function() {
        return [ "book ", Spacebars.mustache(Spacebars.dot(view.lookup("design"), "class")) ];
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("bookStyle"));
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveLeft"));
    }, function() {
      return [ "\n          ", HTML.BUTTON(HTML.Attrs({
        class: "move-button left"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("moveButtonStyle"));
      })), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveRight"));
    }, function() {
      return [ "\n          ", HTML.BUTTON(HTML.Attrs({
        class: "move-button right"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("moveButtonStyle"));
      })), "\n        " ];
    }), "\n        ", HTML.DIV({
      class: function() {
        return [ "page left ", Spacebars.mustache(view.lookup("frontPageClass")) ];
      }
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("leftPageIndex"));
    }, function() {
      return [ "\n            ", Blaze.If(function() {
        return Spacebars.call(view.lookup("activeContentItem"));
      }, function() {
        return [ "\n              ", HTML.DIV({
          class: "header"
        }, "\n                ", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("title"));
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), "\n              "), "\n            " ];
      }, function() {
        return HTML.Raw('\n              <div class="header">\n                目录\n              </div>\n            ');
      }), "\n          " ];
    }), "\n          ", HTML.DIV({
      class: "footer"
    }, "\n            ", Blaze.View("lookup:pageNumberLeft", function() {
      return Spacebars.mustache(view.lookup("pageNumberLeft"));
    }), Blaze.If(function() {
      return Spacebars.call(view.lookup("pagesCount"));
    }, function() {
      return [ "/", Blaze.View("lookup:pagesCount", function() {
        return Spacebars.mustache(view.lookup("pagesCount"));
      }) ];
    }), "\n          "), "\n        "), "\n        ", HTML.DIV({
      class: function() {
        return [ "page right ", Spacebars.mustache(view.lookup("frontPageClass")) ];
      }
    }, "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$or"), view.lookup("activeContentItem"), view.lookup("leftPageIndex"));
    }, function() {
      return [ "\n            ", Blaze.If(function() {
        return Spacebars.call(view.lookup("rightPageHasContent"));
      }, function() {
        return [ "\n              ", HTML.DIV({
          class: "header"
        }, "\n                ", Spacebars.With(function() {
          return Spacebars.call(view.lookup("activeContentItem"));
        }, function() {
          return [ "\n                  ", Blaze.View("lookup:goal.displayName", function() {
            return Spacebars.mustache(Spacebars.dot(view.lookup("goal"), "displayName"));
          }), "\n                " ];
        }, function() {
          return [ "\n                  ", Blaze._TemplateWith(function() {
            return Spacebars.call(view.lookup("title"));
          }, function() {
            return Spacebars.include(view.lookupTemplate("t10e"));
          }), "\n                " ];
        }), "\n              "), "\n            " ];
      }), "\n          " ];
    }), "\n          ", HTML.DIV({
      class: "footer"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showPageNumberRight"));
    }, function() {
      return [ "\n              ", Blaze.View("lookup:pageNumberRight", function() {
        return Spacebars.mustache(view.lookup("pageNumberRight"));
      }), Blaze.If(function() {
        return Spacebars.call(view.lookup("pagesCount"));
      }, function() {
        return [ "/", Blaze.View("lookup:pagesCount", function() {
          return Spacebars.mustache(view.lookup("pagesCount"));
        }) ];
      }), "\n            " ];
    }), "\n          "), "\n        "), "\n        ", HTML.DIV({
      class: "contents-area"
    }, "\n          ", HTML.DIV(HTML.Attrs({
      class: "contents"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentsStyle"));
    }), "\n            ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("activeContentItem"));
    }, function() {
      return [ "\n              ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Home", "Book", "Article"));
      }), HTML.Raw('\n              <div class="end-page"></div>\n            ') ];
    }, function() {
      return [ "\n              ", HTML.DIV({
        class: "table-of-contents"
      }, "\n                ", HTML.H1(Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("title"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      })), HTML.Raw("\n                <h2>目录</h2>\n                "), HTML.OL({
        class: "activities"
      }, "\n                  ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("contentItems"));
      }, function() {
        return [ "\n                    ", HTML.LI({
          class: "activity"
        }, "\n                      ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Home", "Book", "TableOfContentsItem"));
        }), "\n                    "), "\n                  " ];
      }), "\n                "), HTML.Raw('\n                <div class="end-page"></div>\n              ')), "\n            " ];
    }), "\n          "), "\n        "), "\n      "), "\n    "), "\n  " ];
  });
}));

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Book.TableOfContentsItem");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Book.TableOfContentsItem"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Book.TableOfContentsItem", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-pages-home-book-tableofcontentsitem"
  }, "\n    ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.StudyGuide.Pages.Home", Spacebars.kw({
        pageOrBook: Spacebars.dot(view.lookup("book"), "slug"),
        activity: view.lookup("slug")
      }));
    }
  }, "\n      ", Blaze.View("lookup:goal.displayName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("goal"), "displayName"));
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("allTasksCompleted"));
  }, function() {
    return HTML.Raw('\n      <span class="all-tasks-completed indicator" title="你已完成所有可用活动。"></span>\n    ');
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("goal"), "completed"));
  }, function() {
    return HTML.Raw('\n      <span class="completed indicator" title="你已完成所有必修活动。还有一些可选活动。"></span>\n    ');
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("started"));
  }, function() {
    return HTML.Raw('\n      <span class="started indicator" title="你已完成部分活动。需要完成更多活动以完成本章节。"></span>\n    ');
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"article-client":{"article.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/book/article-client/article.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, Block, LOI, PAA, Quill;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Quill = AM.Quill;
Block = Quill.import('blots/block');
PAA.StudyGuide.Pages.Home.Book.Article = function () {
  class Article extends AM.Component {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Home.Book.Article';
    }
    static version() {
      return '0.1.0';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.bookComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Home.Book);
      this.book = new ComputedField(() => {
        return this.bookComponent.book();
      });
      this.activity = new ComputedField(() => {
        var contentItem;
        contentItem = this.data();
        contentItem.activity.refresh();
        return contentItem.activity;
      });
      this.goal = new ComputedField(() => {
        var contentItem;
        contentItem = this.data();
        return contentItem.goal;
      });
      this.quill = new AE.ReactiveWrapper(null);
      // Subscribe to the article.
      return this.autorun(computation => {
        return PAA.StudyGuide.Activity.articleForActivityId.subscribe(this, this.activity()._id);
      });
    }
    onRendered() {
      var quill;
      super.onRendered(...arguments);
      // Initialize quill.
      quill = new Quill(this.$('.contents')[0], {
        formats: PAA.StudyGuide.Article.quillFormats,
        readOnly: true
      });
      this.quill(quill);
      quill.on('text-change', (delta, oldDelta, source) => {
        var blot, i, len, ref, ref1, results;
        ref = this.quill().getLines();
        // Tell the blots they are part of this component.
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          blot = ref[i];
          results.push((ref1 = blot.domNode.component) != null ? ref1.quillComponent(this) : void 0);
        }
        return results;
      });
      // Update quill content.
      return this.autorun(computation => {
        var activity;
        if (!(activity = this.activity())) {
          return;
        }
        return quill.setContents(activity.article, Quill.sources.API);
      });
    }
    contentUpdated() {
      return this.bookComponent.contentUpdated();
    }
  }
  ;
  Article.register(Article.id());
  return Article;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.article.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/home/book/article-client/template.article.js                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Home.Book.Article");
Template["PixelArtAcademy.StudyGuide.Pages.Home.Book.Article"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Home.Book.Article", (function() {
  var view = this;
  return HTML.ARTICLE({
    class: "pixelartacademy-studyguide-pages-home-book-article"
  }, "\n    ", HTML.H1(Blaze.View("lookup:goal.displayName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("goal"), "displayName"));
  })), HTML.Raw('\n    <div class="contents pixelartacademy-studyguide-article"></div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"admin":{"admin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/admin.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Admin = function () {
  class Admin extends AM.Component {}
  ;
  Admin.register('PixelArtAcademy.StudyGuide.Pages.Admin');
  return Admin;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.admin.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/template.admin.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin");
Template["PixelArtAcademy.StudyGuide.Pages.Admin"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-pages-admin"
  }, HTML.Raw("\n    <h1>学习指南管理</h1>\n    <p>工具：</p>\n    "), HTML.UL("\n      ", HTML.LI(HTML.STRONG(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.StudyGuide.Pages.Admin.Activities");
    }
  }, "Activities")), ":\n        编辑活动目标和任务。"), "\n      ", HTML.LI(HTML.STRONG(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.StudyGuide.Pages.Admin.Books");
    }
  }, "Books")), ":\n        编辑活动书籍。"), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"activities":{"activities.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/activities.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AM = Artificial.Mirage;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Admin.Activities = function () {
  class Activities extends AM.Component {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Admin.Activities';
    }
    template() {
      return this.constructor.id();
    }
    onCreated() {
      var activitiesSubscription;
      super.onCreated(...arguments);
      Artificial.Babel.inTranslationMode(true);
      activitiesSubscription = PAA.StudyGuide.Activity.initializeAll(this);
      // Unselect the current activity if it gets deleted.
      return this.autorun(computation => {
        var activityId;
        if (!activitiesSubscription.ready()) {
          return;
        }
        activityId = AB.Router.getParameter('activityId');
        // Make sure the current document exists.
        if (activityId && PAA.StudyGuide.Activity.documents.findOne(activityId)) {
          return;
        }
        // Route back to index.
        return this.goToActivity(null);
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return Artificial.Babel.inTranslationMode(false);
    }
    activities() {
      return PAA.StudyGuide.Activity.documents.find({}, {
        sort: {
          goalId: 1
        }
      });
    }
    goToActivity(activityId) {
      // Switch to document, but don't create history so that it's easy to get back out from the admin page.
      return AB.Router.setParameters({
        activityId: activityId
      }, {
        createHistory: false
      });
    }
    activeClass() {
      if (this.currentData()._id === AB.Router.getParameter('activityId')) {
        return 'active';
      }
    }
    activity() {
      var id;
      id = AB.Router.getParameter('activityId');
      return PAA.StudyGuide.Activity.documents.findOne(id);
    }
    shortGoalId() {
      var activity;
      activity = this.currentData();
      return activity.goalId.substring('PixelArtAcademy.StudyGuide.'.length);
    }
    events() {
      return super.events(...arguments).concat({
        'click .add-activity-button': this.onClickAddActivityButton,
        'click .activity': this.onClickActivity
      });
    }
    onClickAddActivityButton() {
      var goalId, goalSuffix;
      goalSuffix = this.$('.new-activity-goalid').val();
      goalId = "PixelArtAcademy.StudyGuide.".concat(goalSuffix);
      return PAA.StudyGuide.Activity.insert(goalId, error => {
        if (error) {
          return console.error(error);
        }
      });
    }
    onClickActivity() {
      return this.goToActivity(this.currentData()._id);
    }
  }
  ;
  Activities.register(Activities.id());
  return Activities;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.activities.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/template.activities.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin.Activities");
Template["PixelArtAcademy.StudyGuide.Pages.Admin.Activities"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin.Activities", (function() {
  var view = this;
  return [ HTML.STYLE("\n    html {font-size: 2px;}\n  "), "\n  ", HTML.DIV({
    class: "pixelartacademy-studyguide-pages-admin-activities"
  }, HTML.Raw("\n    <h1>学习指南活动</h1>\n    "), HTML.DIV({
    class: "index"
  }, HTML.Raw('\n      <div class="actions">\n        PixelArtAcademy.StudyGuide.\n        <input class="new-activity-goalid">\n        <button class="add-activity-button">添加活动</button>\n      </div>\n      '), HTML.UL({
    class: "activities"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("activities"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: function() {
        return [ "activity ", Spacebars.mustache(view.lookup("activeClass")) ];
      }
    }, Blaze.View("lookup:shortGoalId", function() {
      return Spacebars.mustache(view.lookup("shortGoalId"));
    })), "\n        " ];
  }), "\n      "), "\n    "), "\n    ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("activity"));
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity"));
    }), "\n    " ];
  }), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"activity.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/activity.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, IL, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
PAA.StudyGuide.Pages.Admin.Activities.Activity = function () {
  class Activity extends AM.Component {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.renaming = new ReactiveField(false);
      this.autorun(computation => {
        var activity;
        activity = this.data();
        return PAA.StudyGuide.Activity.articleForActivityId.subscribe(this, activity._id);
      });
      return this.goalTranslationHandle = new ComputedField(() => {
        var activity, translationNamespace;
        activity = this.data();
        translationNamespace = activity.goalId;
        return AB.subscribeNamespace(translationNamespace);
      });
    }
    onDestroyed() {
      var ref;
      return (ref = this._renamingStopAutorun) != null ? ref.stop() : void 0;
    }
    taskTypes() {
      // Automatic tasks are not allowed in the journal.
      return _.without(PAA.Learning.Task.getTypes(), 'Automatic');
    }
    goalDisplayNameTranslation() {
      if (this.renaming()) {
        return;
      }
      return AB.translation(this.goalTranslationHandle(), 'displayName');
    }
    events() {
      return super.events(...arguments).concat({
        'click .rename-goal-button': this.onClickRenameGoalButton,
        'click .remove-activity-button': this.onClickRemoveActivityButton,
        'click .add-task-button': this.onClickAddTaskButton
      });
    }
    onClickRenameGoalButton(event) {
      var activity, newGoalId;
      activity = this.data();
      if (!(newGoalId = prompt("重命名目标为", activity.goalId))) {
        return;
      }
      if (activity.goalId === newGoalId) {
        return;
      }
      this._startRenaming(activity.goalId);
      return PAA.StudyGuide.Activity.renameGoalId(activity._id, newGoalId);
    }
    _startRenaming(oldGoalId) {
      this.renaming(true);
      // Wait for new document to come back to allow editing again.
      return this._renamingStopAutorun = Tracker.autorun(computation => {
        var activity;
        activity = this.data();
        if (activity.goalId === oldGoalId) {
          return;
        }
        this.renaming(false);
        return computation.stop();
      });
    }
    onClickRemoveActivityButton(event) {
      var activity;
      activity = this.data();
      if (!confirm("移除活动 ".concat(activity.goalId, "？"))) {
        return;
      }
      this._startRenaming(activity.goalId);
      return PAA.StudyGuide.Activity.remove(activity._id);
    }
    onClickAddTaskButton() {
      var activity, goalPrefix, taskId, taskSuffix, taskType;
      taskSuffix = this.$('.new-task-id').val();
      activity = this.data();
      goalPrefix = activity.goalId;
      taskId = "".concat(goalPrefix, ".").concat(taskSuffix);
      taskType = this.$('.new-task-type').val();
      PAA.StudyGuide.Activity.insertTask(activity._id, taskId, taskType, error => {
        if (error) {
          return console.error(error);
        }
      });
      return this.$('.new-task-id').val('');
    }
  }
  ;
  Activity.register(Activity.id());
  Activity.FinalGroupNumber = function () {
    class FinalGroupNumber extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Number;
      }
      placeholder() {
        return 0;
      }
      load() {
        var activity;
        activity = this.data();
        return activity.finalGroupNumber;
      }
      save(value) {
        var activity;
        activity = this.data();
        return PAA.StudyGuide.Activity.update(activity._id, {
          finalGroupNumber: value
        });
      }
    }
    ;
    FinalGroupNumber.register('PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.FinalGroupNumber');
    return FinalGroupNumber;
  }.call(this);
  Activity.StringList = class StringList extends AM.Component {
    template() {
      return 'PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.StringList';
    }
    constructor() {
      super(...arguments);
      this.newItemName = new ReactiveField('');
    }
    items() {
      var activity;
      activity = this.data();
      return activity[this.fieldName];
    }
    save(updatedFields) {
      var activity;
      activity = this.data();
      return PAA.StudyGuide.Activity.update(activity._id, updatedFields);
    }
    setNewItemName(newItemName) {
      this.$('.new-item-name').val(newItemName);
      return this.newItemName(newItemName);
    }
    addItem(item) {
      var newItems;
      newItems = _.union(this.items(), [item]);
      this.save({
        ["".concat(this.fieldName)]: newItems
      });
      return this.setNewItemName('');
    }
    events() {
      return super.events(...arguments).concat({
        'input .new-item-name': this.onInputNewItemName,
        'click .add-item-button': this.onClickAddItemButton,
        'click .remove-item-button': this.onClickRemoveItemButton,
        'click .autocomplete-items .item': this.onClickAutocompleteItemsItem
      });
    }
    onInputNewItemName(event) {
      var newItemName;
      newItemName = this.$(event.target).val();
      return this.newItemName(newItemName);
    }
    onClickAddItemButton(event) {
      return this.addItem(this.newItemName());
    }
    onClickRemoveItemButton(event) {
      var item, newItems;
      item = this.currentData();
      newItems = _.without(this.items(), item);
      return this.save({
        ["".concat(this.fieldName)]: newItems
      });
    }
    onClickAutocompleteItemsItem(event) {
      var item;
      item = this.currentData();
      return this.addItem(item);
    }
  };
  Activity.TasksList = class TasksList extends Activity.StringList {
    possibleItems() {
      var activity, i, len, ref, results, task;
      activity = this.data();
      if (!activity.tasks) {
        return [];
      }
      ref = activity.tasks;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        task = ref[i];
        results.push(task.id);
      }
      return results;
    }
  };
  Activity.FinalTasks = function () {
    class FinalTasks extends Activity.TasksList {
      constructor() {
        super(...arguments);
        this.fieldName = 'finalTasks';
      }
    }
    ;
    FinalTasks.register("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.FinalTasks");
    return FinalTasks;
  }.call(this);
  Activity.InterestsList = class InterestsList extends Activity.StringList {
    possibleItems() {
      var i, interest, len, ref, results, searchTerm;
      searchTerm = this.newItemName();
      if (!searchTerm.length) {
        return;
      }
      IL.Interest.forSearchTerm.subscribe(searchTerm);
      ref = IL.Interest.forSearchTerm.query(searchTerm).fetch();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        interest = ref[i];
        results.push(interest.name.translate().text);
      }
      return results;
    }
  };
  Activity.RequiredInterests = function () {
    class RequiredInterests extends Activity.InterestsList {
      constructor() {
        super(...arguments);
        this.fieldName = 'requiredInterests';
      }
    }
    ;
    RequiredInterests.register("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.RequiredInterests");
    return RequiredInterests;
  }.call(this);
  return Activity;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.activity.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/template.activity.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity");
Template["PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-pages-admin-activities-activity"
  }, "\n    ", HTML.H2(Blaze.View("lookup:goalId", function() {
    return Spacebars.mustache(view.lookup("goalId"));
  }), HTML.Raw(' <button class="rename-goal-button">R</button> <button class="remove-activity-button">X</button>')), "\n    ", HTML.LABEL({
    class: "property display-name"
  }, HTML.Raw('\n      <span class="name">目标名称：</span>\n      '), HTML.SPAN({
    class: "value"
  }, Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("goalDisplayNameTranslation"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "TranslationInput"));
    });
  })), "\n    "), "\n    ", HTML.DIV({
    class: "property tasks-area"
  }, HTML.Raw('\n      <div class="name">任务：</div>\n      '), HTML.DIV({
    class: "value"
  }, "\n        ", HTML.UL({
    class: "tasks"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("tasks"));
  }, function() {
    return [ "\n            ", HTML.LI({
      class: "task"
    }, "\n              ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task"));
    }), "\n            "), "\n          " ];
  }), "\n        "), "\n        ", HTML.DIV({
    class: "new-task"
  }, HTML.Raw('\n          <input class="new-task-id">\n          '), HTML.SELECT({
    class: "new-task-type"
  }, "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("taskTypes"));
  }, function() {
    return [ "\n              ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(view.lookup("."));
      }
    }, Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n            " ];
  }), "\n          "), HTML.Raw('\n          <button class="add-task-button">添加任务</button>\n        ')), "\n      "), "\n    "), "\n    ", HTML.DIV({
    class: "property final-tasks"
  }, HTML.Raw('\n      <div class="name">最终任务：</div>\n      '), HTML.DIV({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "FinalTasks"));
  })), "\n    "), "\n    ", HTML.LABEL({
    class: "property final-group-number"
  }, HTML.Raw('\n      <span class="name">最终组号：</span>\n      '), HTML.SPAN({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "FinalGroupNumber"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: "property required-interests"
  }, HTML.Raw('\n      <div class="name">所需兴趣：</div>\n      '), HTML.DIV({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "RequiredInterests"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: "property article"
  }, HTML.Raw('\n      <div class="name">文章：</div>\n      '), HTML.DIV({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Article"));
  })), "\n    "), "\n  ");
}));

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.StringList");
Template["PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.StringList"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.StringList", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-pages-admin-activities-activity-stringlist"
  }, "\n    ", HTML.UL({
    class: "items"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("items"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "item"
    }, Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    }), HTML.Raw(' <button class="remove-item-button">X</button>')), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: "add-item"
  }, HTML.Raw('\n      <input class="new-item-name"> <button class="add-item-button">添加</button>\n      '), Blaze.If(function() {
    return Spacebars.call(view.lookup("possibleItems"));
  }, function() {
    return [ "\n        ", HTML.UL({
      class: "autocomplete-items"
    }, "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("possibleItems"));
    }, function() {
      return [ "\n            ", HTML.LI({
        class: "item"
      }, Blaze.View("lookup:.", function() {
        return Spacebars.mustache(view.lookup("."));
      })), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"task.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/task.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, IL, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
IL = Illustrapedia;
PAA.StudyGuide.Pages.Admin.Activities.Activity.Task = function () {
  class Task extends AM.Component {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.renaming = new ReactiveField(false);
      this.activityComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Admin.Activities.Activity);
      return this.taskTranslationHandle = new ComputedField(() => {
        var task, translationNamespace;
        task = this.data();
        translationNamespace = task.id;
        return AB.subscribeNamespace(translationNamespace);
      });
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      return (ref = this._renamingStopAutorun) != null ? ref.stop() : void 0;
    }
    taskDirectiveTranslation() {
      if (this.renaming() || this.activityComponent.renaming()) {
        return;
      }
      return AB.translation(this.taskTranslationHandle(), 'directive');
    }
    taskInstructionsTranslation() {
      if (this.renaming() || this.activityComponent.renaming()) {
        return;
      }
      return AB.translation(this.taskTranslationHandle(), 'instructions');
    }
    taskInstructionsTranslationInputOptions() {
      return {
        type: AB.Components.Translatable.Types.TextArea
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .rename-task-button': this.onClickRenameTaskButton,
        'click .remove-task-button': this.onClickRemoveTaskButton
      });
    }
    onClickRenameTaskButton(event) {
      var activity, newTaskId, task;
      task = this.data();
      if (!(newTaskId = prompt("Rename task to", task.id))) {
        return;
      }
      if (task.id === newTaskId) {
        return;
      }
      this._startRenaming(task.id);
      activity = this.activityComponent.data();
      return PAA.StudyGuide.Activity.renameTaskId(activity._id, task.id, newTaskId);
    }
    _startRenaming(oldTaskId) {
      this.renaming(true);
      // Wait for new document to come back to allow editing again.
      return this._renamingStopAutorun = Tracker.autorun(computation => {
        var task;
        task = this.data();
        if (task.id === oldTaskId) {
          return;
        }
        this.renaming(false);
        return computation.stop();
      });
    }
    onClickRemoveTaskButton(event) {
      var activity, task;
      task = this.data();
      if (!confirm("Remove task ".concat(task.id, "?"))) {
        return;
      }
      this._startRenaming(task.id);
      activity = this.activityComponent.data();
      return PAA.StudyGuide.Activity.removeTask(activity._id, task.id);
    }
  }
  ;
  Task.register(Task.id());
  Task.Type = function () {
    class Type extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Select;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.activityComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Admin.Activities.Activity);
      }
      options() {
        var i, len, ref, results, type;
        ref = _.without(PAA.Learning.Task.getTypes(), PAA.Learning.Task.Automatic.type());
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          type = ref[i];
          results.push({
            name: type,
            value: type
          });
        }
        return results;
      }
      load() {
        var task;
        task = this.data();
        return task.type;
      }
      save(value) {
        var activity, task;
        task = this.data();
        activity = this.activityComponent.data();
        return PAA.StudyGuide.Activity.changeTaskType(activity._id, task.id, value);
      }
    }
    ;
    Type.register('PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task.Type');
    return Type;
  }.call(this);
  Task.StringList = class StringList extends PAA.StudyGuide.Pages.Admin.Activities.Activity.StringList {
    onCreated() {
      super.onCreated(...arguments);
      return this.activityComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Admin.Activities.Activity);
    }
    items() {
      var task;
      task = this.data();
      return task[this.fieldName];
    }
    save(updatedFields) {
      var activity, task;
      task = this.data();
      activity = this.activityComponent.data();
      return PAA.StudyGuide.Activity.updateTask(activity._id, task.id, updatedFields);
    }
  };
  Task.Property = class Property extends AM.DataInputComponent {
    onCreated() {
      super.onCreated(...arguments);
      return this.activityComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Admin.Activities.Activity);
    }
    load() {
      var task;
      task = this.data();
      return task[this.fieldName];
    }
    save(value) {
      var activity, task;
      task = this.data();
      activity = this.activityComponent.data();
      return PAA.StudyGuide.Activity.updateTask(activity._id, task.id, {
        ["".concat(this.fieldName)]: value
      });
    }
  };
  Task.Icon = function () {
    class Icon extends Task.Property {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Select;
        this.fieldName = 'icon';
      }
      load() {
        return super.load(...arguments) || PAA.Learning.Task.icon();
      }
      options() {
        var icon, results;
        results = [];
        for (icon in PAA.Learning.Task.Icons) {
          results.push({
            name: icon,
            value: icon
          });
        }
        return results;
      }
    }
    ;
    Icon.register('PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task.Icon');
    return Icon;
  }.call(this);
  Task.InterestsList = class InterestsList extends Task.StringList {
    possibleItems() {
      var i, interest, len, ref, results, searchTerm;
      searchTerm = this.newItemName();
      if (!searchTerm.length) {
        return;
      }
      IL.Interest.forSearchTerm.subscribe(searchTerm);
      ref = IL.Interest.forSearchTerm.query(searchTerm).fetch();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        interest = ref[i];
        results.push(interest.name.translate().text);
      }
      return results;
    }
  };
  Task.Interests = function () {
    class Interests extends Task.InterestsList {
      constructor() {
        super(...arguments);
        this.fieldName = 'interests';
      }
    }
    ;
    Interests.register("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task.Interests");
    return Interests;
  }.call(this);
  Task.RequiredInterests = function () {
    class RequiredInterests extends Task.InterestsList {
      constructor() {
        super(...arguments);
        this.fieldName = 'requiredInterests';
      }
    }
    ;
    RequiredInterests.register("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task.RequiredInterests");
    return RequiredInterests;
  }.call(this);
  Task.TasksList = class TasksList extends Task.StringList {
    possibleItems() {
      var activity, i, len, ref, results, task;
      activity = this.activityComponent.data();
      if (!activity.tasks) {
        return [];
      }
      ref = activity.tasks;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        task = ref[i];
        results.push(task.id);
      }
      return results;
    }
  };
  Task.Predecessors = function () {
    class Predecessors extends Task.TasksList {
      constructor() {
        super(...arguments);
        this.fieldName = 'predecessors';
      }
    }
    ;
    Predecessors.register("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task.Predecessors");
    return Predecessors;
  }.call(this);
  Task.PredecessorsCompleteType = function () {
    class PredecessorsCompleteType extends Task.Property {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Select;
        this.fieldName = 'predecessorsCompleteType';
      }
      load() {
        return super.load(...arguments) || PAA.Learning.Task.predecessorsCompleteType();
      }
      options() {
        var results, type;
        results = [];
        for (type in PAA.Learning.Task.PredecessorsCompleteType) {
          results.push({
            name: type,
            value: type
          });
        }
        return results;
      }
    }
    ;
    PredecessorsCompleteType.register('PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task.PredecessorsCompleteType');
    return PredecessorsCompleteType;
  }.call(this);
  Task.GroupNumber = function () {
    class GroupNumber extends Task.Property {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Number;
        this.fieldName = 'groupNumber';
      }
      placeholder() {
        return 0;
      }
    }
    ;
    GroupNumber.register('PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task.GroupNumber');
    return GroupNumber;
  }.call(this);
  return Task;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.task.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/template.task.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task");
Template["PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Task", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-pages-admin-activities-activity-task"
  }, "\n    ", HTML.H3(Blaze.View("lookup:id", function() {
    return Spacebars.mustache(view.lookup("id"));
  }), HTML.Raw(' <button class="rename-task-button">R</button> <button class="remove-task-button">X</button>')), "\n    ", HTML.LABEL({
    class: "property type"
  }, HTML.Raw('\n      <span class="name">类型：</span>\n      '), HTML.SPAN({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task", "Type"));
  })), "\n    "), "\n    ", HTML.LABEL({
    class: "property directive"
  }, HTML.Raw('\n      <span class="name">指令：</span>\n      '), HTML.SPAN({
    class: "value"
  }, Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("taskDirectiveTranslation"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "TranslationInput"));
    });
  })), "\n    "), "\n    ", HTML.LABEL({
    class: "property instructions"
  }, HTML.Raw('\n      <span class="name">说明：</span>\n      '), Spacebars.With(function() {
    return Spacebars.call(view.lookup("taskInstructionsTranslation"));
  }, function() {
    return [ "\n        ", HTML.SPAN({
      class: "value"
    }, "\n          ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("taskInstructionsTranslationInputOptions"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "TranslationInput"));
      });
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n    ", HTML.LABEL({
    class: "property icon"
  }, HTML.Raw('\n      <span class="name">图标：</span>\n      '), HTML.SPAN({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task", "Icon"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: "property interests"
  }, HTML.Raw('\n      <div class="name">兴趣：</div>\n      '), HTML.DIV({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task", "Interests"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: "property required-interests"
  }, HTML.Raw('\n      <div class="name">所需兴趣：</div>\n      '), HTML.DIV({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task", "RequiredInterests"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: "property predecessors"
  }, HTML.Raw('\n      <div class="name">前置条件：</div>\n      '), HTML.DIV({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task", "Predecessors"));
  })), "\n    "), "\n    ", HTML.LABEL({
    class: "property predecessors-complete-type"
  }, HTML.Raw('\n      <span class="name">前置条件完成类型：</span>\n      '), HTML.SPAN({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task", "PredecessorsCompleteType"));
  })), "\n    "), "\n    ", HTML.LABEL({
    class: "property group-number"
  }, HTML.Raw('\n      <span class="name">组号：</span>\n      '), HTML.SPAN({
    class: "value"
  }, Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Activities", "Activity", "Task", "GroupNumber"));
  })), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"article-client":{"article.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/article-client/article.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA, Quill, icons;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Quill = AM.Quill;
icons = Quill.import('ui/icons');
icons['studyguide-practicesection'] = 'PS';
icons['studyguide-prerequisiteswarning'] = 'PW';
icons['studyguide-task-reading'] = 'TR';
icons['studyguide-task-upload'] = 'TU';
PAA.StudyGuide.Pages.Admin.Activities.Activity.Article = function () {
  class Article extends AM.Component {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Article';
    }
    static version() {
      return '0.1.0';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.activityComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Admin.Activities.Activity);
      this.quill = new AE.ReactiveWrapper(null);
      this.article = new ComputedField(() => {
        return this.activityComponent.data().article || [];
      });
      return this.displayScale = 2;
    }
    onRendered() {
      var quill;
      super.onRendered(...arguments);
      this.$article = this.$('.pixelartacademy-pixelpad-apps-journal-journalview-article');
      // Initialize quill.
      quill = new Quill(this.$('.writing-area')[0], {
        theme: 'snow',
        formats: PAA.StudyGuide.Article.quillFormats,
        modules: {
          toolbar: {
            container: [[{
              'header': [1, 2, 3, 4, false]
            }], ['bold', 'italic', 'underline', 'strike', {
              'script': 'sub'
            }, {
              'script': 'super'
            }], ['link', 'code'], [{
              'list': 'ordered'
            }, {
              'list': 'bullet'
            }], ['blockquote', 'code-block'], ['image', 'video'], ['studyguide-practicesection', 'studyguide-prerequisiteswarning', 'studyguide-task-reading', 'studyguide-task-upload'], ['clean']],
            handlers: {
              image: value => {
                return this.onQuillToolbarImageClick(value);
              },
              'studyguide-prerequisiteswarning': value => {
                return this.onQuillToolbarPrerequisitesWarningClick(value);
              },
              'studyguide-task-reading': value => {
                return this.onQuillToolbarTaskReadingClick(value);
              },
              'studyguide-task-upload': value => {
                return this.onQuillToolbarTaskUploadClick(value);
              }
            }
          }
        }
      });
      this.quill(quill);
      quill.on('text-change', (delta, oldDelta, source) => {
        var activity, blot, i, len, ref, ref1;
        if (this.constructor.debug) {
          console.log("Text change", delta, oldDelta, source);
        }
        ref = this.quill().getLines();
        // Tell the blots they are part of this component.
        for (i = 0, len = ref.length; i < len; i++) {
          blot = ref[i];
          if ((ref1 = blot.domNode.component) != null) {
            ref1.quillComponent(this);
          }
        }
        // Update the article if this was a user update.
        if (source === Quill.sources.USER) {
          if (this.constructor.debug) {
            console.log("Updating article");
          }
          activity = this.activityComponent.data();
          return PAA.StudyGuide.Activity.updateArticle(activity._id, delta.ops);
        }
      });
      quill.on('editor-change', () => {
        // Trigger reactive updates.
        return this.quill.updated();
      });
      // Update quill content.
      return this.autorun(computation => {
        var article, currentArticle;
        if (!(article = this.article())) {
          return;
        }
        // See if we already have the correct content.
        currentArticle = quill.getContents().ops;
        if (this.constructor.debug) {
          console.log("Updating article from database", article, currentArticle);
        }
        if (EJSON.equals(article, currentArticle)) {
          if (this.constructor.debug) {
            console.log("Current content matches.");
          }
          return;
        }
        if (this.constructor.debug) {
          console.log("Updating content.");
        }
        // The content is new, update.
        return quill.setContents(article, Quill.sources.API);
      });
    }
    focus() {
      return this.quill().focus();
    }
    moveCursorToEnd() {
      var end;
      end = this.quill().getLength();
      return this.quill().setSelection(end, 0);
    }
    onQuillToolbarImageClick() {
      var $fileInput, quill, range;
      quill = this.quill();
      range = quill.getSelection();
      $fileInput = $('<input type="file" multiple/>');
      $fileInput.on('change', event => {
        var figure, file, files, ref;
        if (!(files = (ref = $fileInput[0]) != null ? ref.files : void 0)) {
          return;
        }
        // Insert a figure with the images in a row.
        figure = {
          layout: [files.length],
          elements: function () {
            var i, len, results;
            results = [];
            for (i = 0, len = files.length; i < len; i++) {
              file = files[i];
              results.push({
                image: {
                  file
                }
              });
            }
            return results;
          }()
        };
        return quill.insertEmbed(range.index, 'figure', figure, Quill.sources.USER);
      });
      return $fileInput.click();
    }
    onQuillToolbarPrerequisitesWarningClick(value) {
      var id, quill, range, task;
      quill = this.quill();
      range = quill.getSelection();
      if (!(id = prompt('插入任务ID'))) {
        return;
      }
      task = {
        id
      };
      return quill.insertEmbed(range.index, 'studyguide-prerequisiteswarning', task, Quill.sources.USER);
    }
    onQuillToolbarTaskReadingClick(value) {
      return this._insertEmbedTask('studyguide-task-reading');
    }
    onQuillToolbarTaskUploadClick(value) {
      return this._insertEmbedTask('studyguide-task-upload', {
        examplesFigure: {
          layout: [],
          elements: []
        }
      });
    }
    _insertEmbedTask(format) {
      let task = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var id, quill, range;
      quill = this.quill();
      range = quill.getSelection();
      if (!(id = prompt('插入任务ID'))) {
        return;
      }
      task.id = id;
      return quill.insertEmbed(range.index, format, task, Quill.sources.USER);
    }
  }
  ;
  Article.register(Article.id());
  Article.debug = false;
  return Article;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.article.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/activities/article-client/template.article.js            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Article");
Template["PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Article"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin.Activities.Activity.Article", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-studyguide-pages-admin-activities-activity-article">\n    <div class="writing-area pixelartacademy-studyguide-article"></div>\n  </div>\n  <link rel="stylesheet" type="text/css" href="/artificial/mirage/quill/dist/quill.snow.css">');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"books":{"books.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/books/books.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Admin.Books = function () {
  class Books extends Artificial.Mummification.Admin.Components.AdminPage {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Admin.Books';
    }
    constructor() {
      super({
        documentClass: PAA.StudyGuide.Book,
        adminComponentClass: PAA.StudyGuide.Pages.Admin.Books.Book,
        nameField: 'title',
        singularName: 'book',
        pluralName: 'books'
      });
    }
    onCreated() {
      super.onCreated(...arguments);
      return PAA.StudyGuide.Activity.initializeAll(this);
    }
  }
  ;
  Books.register(Books.id());
  return Books;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.books.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/books/template.books.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin.Books");
Template["PixelArtAcademy.StudyGuide.Pages.Admin.Books"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin.Books", (function() {
  var view = this;
  return [ HTML.STYLE("\n    html {font-size: 2px;}\n  "), "\n  ", HTML.DIV({
    class: "pixelartacademy-studyguide-pages-admin-books pixelartacademy-pages-admin-components-adminpage"
  }, "\n    ", HTML.H3(Blaze.View("lookup:capitalize", function() {
    return Spacebars.mustache(view.lookup("capitalize"), Spacebars.dot(view.lookup("options"), "pluralName"));
  })), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("scriptsComponent"));
  }, function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("scriptsComponent"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n    " ];
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), view.lookup("options"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("Artificial"), "Mummification", "Admin", "Components", "Index"));
    });
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("document"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "document-area"
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("document"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("documentPage"));
    }), "\n      "), "\n    " ];
  }), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"book.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/books/book.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.StudyGuide.Pages.Admin.Books.Book = function () {
  class Book extends Artificial.Mummification.Admin.Components.Document {
    static id() {
      return 'PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.contentItems = new ComputedField(() => {
        var book, contentItem, contentItems, i, index, len;
        book = this.data();
        // Attach index to content items and sort them.
        contentItems = function () {
          var i, len, ref, results;
          ref = book.contents;
          results = [];
          for (index = i = 0, len = ref.length; i < len; index = ++i) {
            contentItem = ref[index];
            results.push(_.extend({
              index
            }, contentItem));
          }
          return results;
        }();
        contentItems = _.sortBy(contentItems, 'order');
        // Attach sorted index.
        for (index = i = 0, len = contentItems.length; i < len; index = ++i) {
          contentItem = contentItems[index];
          contentItem.sortedIndex = index;
        }
        return contentItems;
      });
    }
    canMoveContentItemUp() {
      var contentItem;
      contentItem = this.currentData();
      return contentItem.sortedIndex > 0;
    }
    canMoveContentItemDown() {
      var book, contentItem;
      contentItem = this.currentData();
      book = this.data();
      return contentItem.sortedIndex < book.contents.length - 1;
    }
    events() {
      return super.events(...arguments).concat({
        'click .add-content-item-button': this.onClickAddContentItemButton,
        'click .content-items .move-up-button': this.onClickContentItemsMoveUpButton,
        'click .content-items .move-down-button': this.onClickContentItemsMoveDownButton,
        'click .content-items .remove-button': this.onClickContentItemsRemoveButton
      });
    }
    onClickAddContentItemButton(event) {
      var activityId, book;
      activityId = this.$('.new-content-item select').val();
      book = this.data();
      return PAA.StudyGuide.Book.addContentItem(book._id, activityId);
    }
    onClickContentItemsMoveUpButton(event) {
      var book, contentItem, contentItems, order, orderAbove, orderTwoAbove, ref;
      contentItem = this.currentData();
      contentItems = this.contentItems();
      book = this.data();
      // Place the item in between two items above.
      orderAbove = contentItems[contentItem.sortedIndex - 1].order;
      orderTwoAbove = ((ref = contentItems[contentItem.sortedIndex - 2]) != null ? ref.order : void 0) || orderAbove - 2;
      order = (orderAbove + orderTwoAbove) / 2;
      return PAA.StudyGuide.Book.updateContentItem(book._id, contentItem.index, {
        order
      });
    }
    onClickContentItemsMoveDownButton(event) {
      var book, contentItem, contentItems, order, orderBelow, orderTwoBelow, ref;
      contentItem = this.currentData();
      contentItems = this.contentItems();
      book = this.data();
      // Place the item in between two items below.
      orderBelow = contentItems[contentItem.sortedIndex + 1].order;
      orderTwoBelow = ((ref = contentItems[contentItem.sortedIndex + 2]) != null ? ref.order : void 0) || orderBelow + 2;
      order = (orderBelow + orderTwoBelow) / 2;
      return PAA.StudyGuide.Book.updateContentItem(book._id, contentItem.index, {
        order
      });
    }
    onClickContentItemsRemoveButton(event) {
      var book, contentItem;
      contentItem = this.currentData();
      book = this.data();
      return PAA.StudyGuide.Book.removeContentItem(book._id, contentItem.index);
    }
  }
  ;
  Book.register(Book.id());
  Book.Design = function () {
    class Design {}
    ;
    Design.Size = function () {
      class Size {}
      ;
      Size.Property = class Property extends AM.DataInputComponent {
        constructor() {
          super(...arguments);
          this.type = AM.DataInputComponent.Types.Number;
          this.realtime = false;
        }
        load() {
          var ref, ref1, ref2;
          return (ref = this.currentData()) != null ? (ref1 = ref.design) != null ? (ref2 = ref1.size) != null ? ref2[this.property] : void 0 : void 0 : void 0;
        }
        save(value) {
          var bookId;
          bookId = this.currentData()._id;
          return PAA.StudyGuide.Book.update(bookId, {
            ["design.size.".concat(this.property)]: value
          });
        }
      };
      Size.Width = function () {
        class Width extends Size.Property {
          constructor() {
            super(...arguments);
            this.property = 'width';
            this.customAttributes = {
              max: 320
            };
          }
        }
        ;
        Width.register('PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book.Design.Size.Width');
        return Width;
      }.call(this);
      Size.Height = function () {
        class Height extends Size.Property {
          constructor() {
            super(...arguments);
            this.property = 'height';
          }
        }
        ;
        Height.register('PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book.Design.Size.Height');
        return Height;
      }.call(this);
      Size.Thickness = function () {
        class Thickness extends Size.Property {
          constructor() {
            super(...arguments);
            this.property = 'thickness';
            this.customAttributes = {
              min: 25
            };
          }
        }
        ;
        Thickness.register('PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book.Design.Size.Thickness');
        return Thickness;
      }.call(this);
      return Size;
    }.call(this);
    Design.Class = function () {
      class Class extends AM.DataInputComponent {
        constructor() {
          super(...arguments);
          this.realtime = false;
        }
        load() {
          var ref, ref1;
          return (ref = this.currentData()) != null ? (ref1 = ref.design) != null ? ref1.class : void 0 : void 0;
        }
        save(value) {
          var bookId;
          bookId = this.currentData()._id;
          return PAA.StudyGuide.Book.update(bookId, {
            "design.class": value
          });
        }
      }
      ;
      Class.register('PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book.Design.Class');
      return Class;
    }.call(this);
    Design.ActivitySelect = class ActivitySelect extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Select;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.bookComponent = this.ancestorComponentOfType(PAA.StudyGuide.Pages.Admin.Books.Book);
      }
      options() {
        var goal, goalId, ref, results;
        ref = PAA.StudyGuide.Goals;
        results = [];
        for (goalId in ref) {
          goal = ref[goalId];
          results.push({
            name: goalId,
            value: goal.activity()._id
          });
        }
        return results;
      }
    };
    Design.Activity = function () {
      class Activity extends Design.ActivitySelect {
        load() {
          var contentItem;
          contentItem = this.data();
          return contentItem.activity._id;
        }
        save(value) {
          var book, contentItem;
          contentItem = this.data();
          book = this.bookComponent.data();
          return PAA.StudyGuide.Book.updateContentItem(book._id, contentItem.index, {
            'activity._id': value
          });
        }
      }
      ;
      Activity.register("PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book.Activity");
      return Activity;
    }.call(this);
    Design.NewContentItemActivity = function () {
      class NewContentItemActivity extends Design.ActivitySelect {
        options() {
          var contentItem, contents, existingActivityIds, options;
          options = super.options(...arguments);
          contents = this.bookComponent.data().contents;
          existingActivityIds = function () {
            var i, len, results;
            results = [];
            for (i = 0, len = contents.length; i < len; i++) {
              contentItem = contents[i];
              results.push(contentItem.activity._id);
            }
            return results;
          }();
          return _.filter(options, option => {
            var ref;
            return ref = option.value, indexOf.call(existingActivityIds, ref) < 0;
          });
        }
        load() {
          return null;
        }
        save(value) {} // Empty since we only use this component for activity selection.
      }
      ;
      NewContentItemActivity.register("PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book.NewContentItemActivity");
      return NewContentItemActivity;
    }.call(this);
    return Design;
  }.call(this);
  return Book;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.book.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-studyguide/pages/admin/books/template.book.js                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book");
Template["PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book"] = new Template("Template.PixelArtAcademy.StudyGuide.Pages.Admin.Books.Book", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-studyguide-pages-admin-books-book"
  }, "\n    ", HTML.H2(Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("title"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t10e"));
  })), "\n    ", HTML.LABEL({
    class: "title"
  }, "标题：", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("title"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "TranslationInput"));
    });
  })), "\n    ", HTML.DIV({
    class: "design section"
  }, "设计：\n      ", HTML.DIV({
    class: "size"
  }, "尺寸：\n        ", HTML.LABEL({
    class: "width"
  }, "宽度：", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Books", "Book", "Design", "Size", "Width"));
  }), "像素 (≤ 320)"), "\n        ", HTML.LABEL({
    class: "height"
  }, "高度：", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Books", "Book", "Design", "Size", "Height"));
  }), "px"), "\n        ", HTML.LABEL({
    class: "thickness"
  }, "厚度：", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Books", "Book", "Design", "Size", "Thickness"));
  }), "像素 (≥ 25)"), "\n      "), "\n      ", HTML.LABEL({
    class: "class"
  }, "类：", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Books", "Book", "Design", "Class"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: "contents section"
  }, "内容：\n      ", HTML.OL({
    class: "content-items"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("contentItems"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: "content-item"
    }, "\n            ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Books", "Book", "Activity"));
    }), "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveContentItemUp"));
    }, function() {
      return HTML.Raw('<button class="move-up-button">↑</button>');
    }), "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("canMoveContentItemDown"));
    }, function() {
      return HTML.Raw('<button class="move-down-button">↓</button>');
    }), HTML.Raw('\n            <button class="remove-button">x</button>\n          ')), "\n        " ];
  }), "\n      "), "\n      ", HTML.DIV({
    class: "new-content-item"
  }, "\n        ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "StudyGuide", "Pages", "Admin", "Books", "Book", "NewContentItemActivity"));
  }), HTML.Raw('\n        <button class="add-content-item-button">添加</button>\n      ')), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"node_modules":{"quill-delta":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/quill-delta/package.json                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "quill-delta",
  "version": "5.1.0",
  "main": "dist/Delta.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dist":{"Delta.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/quill-delta/dist/Delta.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeMap = exports.OpIterator = exports.Op = void 0;
const diff = require("fast-diff");
const cloneDeep = require("lodash.clonedeep");
const isEqual = require("lodash.isequal");
const AttributeMap_1 = require("./AttributeMap");
exports.AttributeMap = AttributeMap_1.default;
const Op_1 = require("./Op");
exports.Op = Op_1.default;
const OpIterator_1 = require("./OpIterator");
exports.OpIterator = OpIterator_1.default;
const NULL_CHARACTER = String.fromCharCode(0); // Placeholder char for embed in diff()
const getEmbedTypeAndData = (a, b) => {
    if (typeof a !== 'object' || a === null) {
        throw new Error(`cannot retain a ${typeof a}`);
    }
    if (typeof b !== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`);
    }
    const embedType = Object.keys(a)[0];
    if (!embedType || embedType !== Object.keys(b)[0]) {
        throw new Error(`embed types not matched: ${embedType} != ${Object.keys(b)[0]}`);
    }
    return [embedType, a[embedType], b[embedType]];
};
class Delta {
    constructor(ops) {
        // Assume we are given a well formed ops
        if (Array.isArray(ops)) {
            this.ops = ops;
        }
        else if (ops != null && Array.isArray(ops.ops)) {
            this.ops = ops.ops;
        }
        else {
            this.ops = [];
        }
    }
    static registerEmbed(embedType, handler) {
        this.handlers[embedType] = handler;
    }
    static unregisterEmbed(embedType) {
        delete this.handlers[embedType];
    }
    static getHandler(embedType) {
        const handler = this.handlers[embedType];
        if (!handler) {
            throw new Error(`no handlers for embed type "${embedType}"`);
        }
        return handler;
    }
    insert(arg, attributes) {
        const newOp = {};
        if (typeof arg === 'string' && arg.length === 0) {
            return this;
        }
        newOp.insert = arg;
        if (attributes != null &&
            typeof attributes === 'object' &&
            Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
        }
        return this.push(newOp);
    }
    delete(length) {
        if (length <= 0) {
            return this;
        }
        return this.push({ delete: length });
    }
    retain(length, attributes) {
        if (typeof length === 'number' && length <= 0) {
            return this;
        }
        const newOp = { retain: length };
        if (attributes != null &&
            typeof attributes === 'object' &&
            Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
        }
        return this.push(newOp);
    }
    push(newOp) {
        let index = this.ops.length;
        let lastOp = this.ops[index - 1];
        newOp = cloneDeep(newOp);
        if (typeof lastOp === 'object') {
            if (typeof newOp.delete === 'number' &&
                typeof lastOp.delete === 'number') {
                this.ops[index - 1] = { delete: lastOp.delete + newOp.delete };
                return this;
            }
            // Since it does not matter if we insert before or after deleting at the same index,
            // always prefer to insert first
            if (typeof lastOp.delete === 'number' && newOp.insert != null) {
                index -= 1;
                lastOp = this.ops[index - 1];
                if (typeof lastOp !== 'object') {
                    this.ops.unshift(newOp);
                    return this;
                }
            }
            if (isEqual(newOp.attributes, lastOp.attributes)) {
                if (typeof newOp.insert === 'string' &&
                    typeof lastOp.insert === 'string') {
                    this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
                    if (typeof newOp.attributes === 'object') {
                        this.ops[index - 1].attributes = newOp.attributes;
                    }
                    return this;
                }
                else if (typeof newOp.retain === 'number' &&
                    typeof lastOp.retain === 'number') {
                    this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
                    if (typeof newOp.attributes === 'object') {
                        this.ops[index - 1].attributes = newOp.attributes;
                    }
                    return this;
                }
            }
        }
        if (index === this.ops.length) {
            this.ops.push(newOp);
        }
        else {
            this.ops.splice(index, 0, newOp);
        }
        return this;
    }
    chop() {
        const lastOp = this.ops[this.ops.length - 1];
        if (lastOp && typeof lastOp.retain === 'number' && !lastOp.attributes) {
            this.ops.pop();
        }
        return this;
    }
    filter(predicate) {
        return this.ops.filter(predicate);
    }
    forEach(predicate) {
        this.ops.forEach(predicate);
    }
    map(predicate) {
        return this.ops.map(predicate);
    }
    partition(predicate) {
        const passed = [];
        const failed = [];
        this.forEach((op) => {
            const target = predicate(op) ? passed : failed;
            target.push(op);
        });
        return [passed, failed];
    }
    reduce(predicate, initialValue) {
        return this.ops.reduce(predicate, initialValue);
    }
    changeLength() {
        return this.reduce((length, elem) => {
            if (elem.insert) {
                return length + Op_1.default.length(elem);
            }
            else if (elem.delete) {
                return length - elem.delete;
            }
            return length;
        }, 0);
    }
    length() {
        return this.reduce((length, elem) => {
            return length + Op_1.default.length(elem);
        }, 0);
    }
    slice(start = 0, end = Infinity) {
        const ops = [];
        const iter = new OpIterator_1.default(this.ops);
        let index = 0;
        while (index < end && iter.hasNext()) {
            let nextOp;
            if (index < start) {
                nextOp = iter.next(start - index);
            }
            else {
                nextOp = iter.next(end - index);
                ops.push(nextOp);
            }
            index += Op_1.default.length(nextOp);
        }
        return new Delta(ops);
    }
    compose(other) {
        const thisIter = new OpIterator_1.default(this.ops);
        const otherIter = new OpIterator_1.default(other.ops);
        const ops = [];
        const firstOther = otherIter.peek();
        if (firstOther != null &&
            typeof firstOther.retain === 'number' &&
            firstOther.attributes == null) {
            let firstLeft = firstOther.retain;
            while (thisIter.peekType() === 'insert' &&
                thisIter.peekLength() <= firstLeft) {
                firstLeft -= thisIter.peekLength();
                ops.push(thisIter.next());
            }
            if (firstOther.retain - firstLeft > 0) {
                otherIter.next(firstOther.retain - firstLeft);
            }
        }
        const delta = new Delta(ops);
        while (thisIter.hasNext() || otherIter.hasNext()) {
            if (otherIter.peekType() === 'insert') {
                delta.push(otherIter.next());
            }
            else if (thisIter.peekType() === 'delete') {
                delta.push(thisIter.next());
            }
            else {
                const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
                const thisOp = thisIter.next(length);
                const otherOp = otherIter.next(length);
                if (otherOp.retain) {
                    const newOp = {};
                    if (typeof thisOp.retain === 'number') {
                        newOp.retain =
                            typeof otherOp.retain === 'number' ? length : otherOp.retain;
                    }
                    else {
                        if (typeof otherOp.retain === 'number') {
                            if (thisOp.retain == null) {
                                newOp.insert = thisOp.insert;
                            }
                            else {
                                newOp.retain = thisOp.retain;
                            }
                        }
                        else {
                            const action = thisOp.retain == null ? 'insert' : 'retain';
                            const [embedType, thisData, otherData] = getEmbedTypeAndData(thisOp[action], otherOp.retain);
                            const handler = Delta.getHandler(embedType);
                            newOp[action] = {
                                [embedType]: handler.compose(thisData, otherData, action === 'retain'),
                            };
                        }
                    }
                    // Preserve null when composing with a retain, otherwise remove it for inserts
                    const attributes = AttributeMap_1.default.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
                    if (attributes) {
                        newOp.attributes = attributes;
                    }
                    delta.push(newOp);
                    // Optimization if rest of other is just retain
                    if (!otherIter.hasNext() &&
                        isEqual(delta.ops[delta.ops.length - 1], newOp)) {
                        const rest = new Delta(thisIter.rest());
                        return delta.concat(rest).chop();
                    }
                    // Other op should be delete, we could be an insert or retain
                    // Insert + delete cancels out
                }
                else if (typeof otherOp.delete === 'number' &&
                    (typeof thisOp.retain === 'number' ||
                        (typeof thisOp.retain === 'object' && thisOp.retain !== null))) {
                    delta.push(otherOp);
                }
            }
        }
        return delta.chop();
    }
    concat(other) {
        const delta = new Delta(this.ops.slice());
        if (other.ops.length > 0) {
            delta.push(other.ops[0]);
            delta.ops = delta.ops.concat(other.ops.slice(1));
        }
        return delta;
    }
    diff(other, cursor) {
        if (this.ops === other.ops) {
            return new Delta();
        }
        const strings = [this, other].map((delta) => {
            return delta
                .map((op) => {
                if (op.insert != null) {
                    return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
                }
                const prep = delta === other ? 'on' : 'with';
                throw new Error('diff() called ' + prep + ' non-document');
            })
                .join('');
        });
        const retDelta = new Delta();
        const diffResult = diff(strings[0], strings[1], cursor, true);
        const thisIter = new OpIterator_1.default(this.ops);
        const otherIter = new OpIterator_1.default(other.ops);
        diffResult.forEach((component) => {
            let length = component[1].length;
            while (length > 0) {
                let opLength = 0;
                switch (component[0]) {
                    case diff.INSERT:
                        opLength = Math.min(otherIter.peekLength(), length);
                        retDelta.push(otherIter.next(opLength));
                        break;
                    case diff.DELETE:
                        opLength = Math.min(length, thisIter.peekLength());
                        thisIter.next(opLength);
                        retDelta.delete(opLength);
                        break;
                    case diff.EQUAL:
                        opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
                        const thisOp = thisIter.next(opLength);
                        const otherOp = otherIter.next(opLength);
                        if (isEqual(thisOp.insert, otherOp.insert)) {
                            retDelta.retain(opLength, AttributeMap_1.default.diff(thisOp.attributes, otherOp.attributes));
                        }
                        else {
                            retDelta.push(otherOp).delete(opLength);
                        }
                        break;
                }
                length -= opLength;
            }
        });
        return retDelta.chop();
    }
    eachLine(predicate, newline = '\n') {
        const iter = new OpIterator_1.default(this.ops);
        let line = new Delta();
        let i = 0;
        while (iter.hasNext()) {
            if (iter.peekType() !== 'insert') {
                return;
            }
            const thisOp = iter.peek();
            const start = Op_1.default.length(thisOp) - iter.peekLength();
            const index = typeof thisOp.insert === 'string'
                ? thisOp.insert.indexOf(newline, start) - start
                : -1;
            if (index < 0) {
                line.push(iter.next());
            }
            else if (index > 0) {
                line.push(iter.next(index));
            }
            else {
                if (predicate(line, iter.next(1).attributes || {}, i) === false) {
                    return;
                }
                i += 1;
                line = new Delta();
            }
        }
        if (line.length() > 0) {
            predicate(line, {}, i);
        }
    }
    invert(base) {
        const inverted = new Delta();
        this.reduce((baseIndex, op) => {
            if (op.insert) {
                inverted.delete(Op_1.default.length(op));
            }
            else if (typeof op.retain === 'number' && op.attributes == null) {
                inverted.retain(op.retain);
                return baseIndex + op.retain;
            }
            else if (op.delete || typeof op.retain === 'number') {
                const length = (op.delete || op.retain);
                const slice = base.slice(baseIndex, baseIndex + length);
                slice.forEach((baseOp) => {
                    if (op.delete) {
                        inverted.push(baseOp);
                    }
                    else if (op.retain && op.attributes) {
                        inverted.retain(Op_1.default.length(baseOp), AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                    }
                });
                return baseIndex + length;
            }
            else if (typeof op.retain === 'object' && op.retain !== null) {
                const slice = base.slice(baseIndex, baseIndex + 1);
                const baseOp = new OpIterator_1.default(slice.ops).next();
                const [embedType, opData, baseOpData] = getEmbedTypeAndData(op.retain, baseOp.insert);
                const handler = Delta.getHandler(embedType);
                inverted.retain({ [embedType]: handler.invert(opData, baseOpData) }, AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                return baseIndex + 1;
            }
            return baseIndex;
        }, 0);
        return inverted.chop();
    }
    transform(arg, priority = false) {
        priority = !!priority;
        if (typeof arg === 'number') {
            return this.transformPosition(arg, priority);
        }
        const other = arg;
        const thisIter = new OpIterator_1.default(this.ops);
        const otherIter = new OpIterator_1.default(other.ops);
        const delta = new Delta();
        while (thisIter.hasNext() || otherIter.hasNext()) {
            if (thisIter.peekType() === 'insert' &&
                (priority || otherIter.peekType() !== 'insert')) {
                delta.retain(Op_1.default.length(thisIter.next()));
            }
            else if (otherIter.peekType() === 'insert') {
                delta.push(otherIter.next());
            }
            else {
                const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
                const thisOp = thisIter.next(length);
                const otherOp = otherIter.next(length);
                if (thisOp.delete) {
                    // Our delete either makes their delete redundant or removes their retain
                    continue;
                }
                else if (otherOp.delete) {
                    delta.push(otherOp);
                }
                else {
                    const thisData = thisOp.retain;
                    const otherData = otherOp.retain;
                    let transformedData = typeof otherData === 'object' && otherData !== null
                        ? otherData
                        : length;
                    if (typeof thisData === 'object' &&
                        thisData !== null &&
                        typeof otherData === 'object' &&
                        otherData !== null) {
                        const embedType = Object.keys(thisData)[0];
                        if (embedType === Object.keys(otherData)[0]) {
                            const handler = Delta.getHandler(embedType);
                            if (handler) {
                                transformedData = {
                                    [embedType]: handler.transform(thisData[embedType], otherData[embedType], priority),
                                };
                            }
                        }
                    }
                    // We retain either their retain or insert
                    delta.retain(transformedData, AttributeMap_1.default.transform(thisOp.attributes, otherOp.attributes, priority));
                }
            }
        }
        return delta.chop();
    }
    transformPosition(index, priority = false) {
        priority = !!priority;
        const thisIter = new OpIterator_1.default(this.ops);
        let offset = 0;
        while (thisIter.hasNext() && offset <= index) {
            const length = thisIter.peekLength();
            const nextType = thisIter.peekType();
            thisIter.next();
            if (nextType === 'delete') {
                index -= Math.min(length, index - offset);
                continue;
            }
            else if (nextType === 'insert' && (offset < index || !priority)) {
                index += length;
            }
            offset += length;
        }
        return index;
    }
}
Delta.Op = Op_1.default;
Delta.OpIterator = OpIterator_1.default;
Delta.AttributeMap = AttributeMap_1.default;
Delta.handlers = {};
exports.default = Delta;
if (typeof module === 'object') {
    module.exports = Delta;
    module.exports.default = Delta;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AttributeMap.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/quill-delta/dist/AttributeMap.js             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloneDeep = require("lodash.clonedeep");
const isEqual = require("lodash.isequal");
var AttributeMap;
(function (AttributeMap) {
    function compose(a = {}, b = {}, keepNull = false) {
        if (typeof a !== 'object') {
            a = {};
        }
        if (typeof b !== 'object') {
            b = {};
        }
        let attributes = cloneDeep(b);
        if (!keepNull) {
            attributes = Object.keys(attributes).reduce((copy, key) => {
                if (attributes[key] != null) {
                    copy[key] = attributes[key];
                }
                return copy;
            }, {});
        }
        for (const key in a) {
            if (a[key] !== undefined && b[key] === undefined) {
                attributes[key] = a[key];
            }
        }
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.compose = compose;
    function diff(a = {}, b = {}) {
        if (typeof a !== 'object') {
            a = {};
        }
        if (typeof b !== 'object') {
            b = {};
        }
        const attributes = Object.keys(a)
            .concat(Object.keys(b))
            .reduce((attrs, key) => {
            if (!isEqual(a[key], b[key])) {
                attrs[key] = b[key] === undefined ? null : b[key];
            }
            return attrs;
        }, {});
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.diff = diff;
    function invert(attr = {}, base = {}) {
        attr = attr || {};
        const baseInverted = Object.keys(base).reduce((memo, key) => {
            if (base[key] !== attr[key] && attr[key] !== undefined) {
                memo[key] = base[key];
            }
            return memo;
        }, {});
        return Object.keys(attr).reduce((memo, key) => {
            if (attr[key] !== base[key] && base[key] === undefined) {
                memo[key] = null;
            }
            return memo;
        }, baseInverted);
    }
    AttributeMap.invert = invert;
    function transform(a, b, priority = false) {
        if (typeof a !== 'object') {
            return b;
        }
        if (typeof b !== 'object') {
            return undefined;
        }
        if (!priority) {
            return b; // b simply overwrites us without priority
        }
        const attributes = Object.keys(b).reduce((attrs, key) => {
            if (a[key] === undefined) {
                attrs[key] = b[key]; // null is a valid value
            }
            return attrs;
        }, {});
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.transform = transform;
})(AttributeMap || (AttributeMap = {}));
exports.default = AttributeMap;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Op.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/quill-delta/dist/Op.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Op;
(function (Op) {
    function length(op) {
        if (typeof op.delete === 'number') {
            return op.delete;
        }
        else if (typeof op.retain === 'number') {
            return op.retain;
        }
        else if (typeof op.retain === 'object' && op.retain !== null) {
            return 1;
        }
        else {
            return typeof op.insert === 'string' ? op.insert.length : 1;
        }
    }
    Op.length = length;
})(Op || (Op = {}));
exports.default = Op;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"OpIterator.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/quill-delta/dist/OpIterator.js               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Op_1 = require("./Op");
class Iterator {
    constructor(ops) {
        this.ops = ops;
        this.index = 0;
        this.offset = 0;
    }
    hasNext() {
        return this.peekLength() < Infinity;
    }
    next(length) {
        if (!length) {
            length = Infinity;
        }
        const nextOp = this.ops[this.index];
        if (nextOp) {
            const offset = this.offset;
            const opLength = Op_1.default.length(nextOp);
            if (length >= opLength - offset) {
                length = opLength - offset;
                this.index += 1;
                this.offset = 0;
            }
            else {
                this.offset += length;
            }
            if (typeof nextOp.delete === 'number') {
                return { delete: length };
            }
            else {
                const retOp = {};
                if (nextOp.attributes) {
                    retOp.attributes = nextOp.attributes;
                }
                if (typeof nextOp.retain === 'number') {
                    retOp.retain = length;
                }
                else if (typeof nextOp.retain === 'object' &&
                    nextOp.retain !== null) {
                    // offset should === 0, length should === 1
                    retOp.retain = nextOp.retain;
                }
                else if (typeof nextOp.insert === 'string') {
                    retOp.insert = nextOp.insert.substr(offset, length);
                }
                else {
                    // offset should === 0, length should === 1
                    retOp.insert = nextOp.insert;
                }
                return retOp;
            }
        }
        else {
            return { retain: Infinity };
        }
    }
    peek() {
        return this.ops[this.index];
    }
    peekLength() {
        if (this.ops[this.index]) {
            // Should never return 0 if our index is being managed correctly
            return Op_1.default.length(this.ops[this.index]) - this.offset;
        }
        else {
            return Infinity;
        }
    }
    peekType() {
        const op = this.ops[this.index];
        if (op) {
            if (typeof op.delete === 'number') {
                return 'delete';
            }
            else if (typeof op.retain === 'number' ||
                (typeof op.retain === 'object' && op.retain !== null)) {
                return 'retain';
            }
            else {
                return 'insert';
            }
        }
        return 'retain';
    }
    rest() {
        if (!this.hasNext()) {
            return [];
        }
        else if (this.offset === 0) {
            return this.ops.slice(this.index);
        }
        else {
            const offset = this.offset;
            const index = this.index;
            const next = this.next();
            const rest = this.ops.slice(this.index);
            this.offset = offset;
            this.index = index;
            return [next].concat(rest);
        }
    }
}
exports.default = Iterator;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"fast-diff":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/fast-diff/package.json                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "fast-diff",
  "version": "1.3.0",
  "main": "diff.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"diff.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/fast-diff/diff.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * This library modifies the diff-patch-match library by Neil Fraser
 * by removing the patch and match functionality and certain advanced
 * options in the diff function. The original license is as follows:
 *
 * ===
 *
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {Int|Object} [cursor_pos] Edit position in text1 or object with more info
 * @param {boolean} [cleanup] Apply semantic cleanup before returning.
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2, cursor_pos, cleanup, _fix_unicode) {
  // Check for equality
  if (text1 === text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (cursor_pos != null) {
    var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
    if (editdiff) {
      return editdiff;
    }
  }

  // Trim off common prefix (speedup).
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = diff_compute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs, _fix_unicode);
  if (cleanup) {
    diff_cleanupSemantic(diffs);
  }
  return diffs;
}

/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_compute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i !== -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [
      [DIFF_INSERT, longtext.substring(0, i)],
      [DIFF_EQUAL, shorttext],
      [DIFF_INSERT, longtext.substring(i + shorttext.length)],
    ];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length === 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [
      [DIFF_DELETE, text1],
      [DIFF_INSERT, text2],
    ];
  }

  // Check to see if the problem can be split in two.
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  return diff_bisect_(text1, text2);
}

/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 * @private
 */
function diff_bisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = delta % 2 !== 0;
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 === -d || (k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (
        x1 < text1_length &&
        y1 < text2_length &&
        text1.charAt(x1) === text2.charAt(y1)
      ) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 === -d || (k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (
        x2 < text1_length &&
        y2 < text2_length &&
        text1.charAt(text1_length - x2 - 1) ===
          text2.charAt(text2_length - y2 - 1)
      ) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [
    [DIFF_DELETE, text1],
    [DIFF_INSERT, text2],
  ];
}

/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @return {Array} Array of diff tuples.
 */
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);

  return diffs.concat(diffsb);
}

/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (
      text1.substring(pointerstart, pointermid) ==
      text2.substring(pointerstart, pointermid)
    ) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
    pointermid--;
  }

  return pointermid;
}

/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */
function diff_commonOverlap_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  // Eliminate the null case.
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  // Truncate the longer string.
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  // Quick check for the worst case.
  if (text1 == text2) {
    return text_length;
  }

  // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: http://neil.fraser.name/news/2010/11/04/
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (
      found == 0 ||
      text1.substring(text_length - length) == text2.substring(0, length)
    ) {
      best = length;
      length++;
    }
  }
}

/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (
      text1.substring(text1.length - pointermid, text1.length - pointerend) ==
      text2.substring(text2.length - pointermid, text2.length - pointerend)
    ) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
    pointermid--;
  }

  return pointermid;
}

/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 */
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null; // Pointless.
  }

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = "";
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
      var prefixLength = diff_commonPrefix(
        longtext.substring(i),
        shorttext.substring(j)
      );
      var suffixLength = diff_commonSuffix(
        longtext.substring(0, i),
        shorttext.substring(0, j)
      );
      if (best_common.length < suffixLength + prefixLength) {
        best_common =
          shorttext.substring(j - suffixLength, j) +
          shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [
        best_longtext_a,
        best_longtext_b,
        best_shorttext_a,
        best_shorttext_b,
        best_common,
      ];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 4)
  );
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 2)
  );
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
}

/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
function diff_cleanupSemantic(diffs) {
  var changes = false;
  var equalities = []; // Stack of indices where equalities are found.
  var equalitiesLength = 0; // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0; // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  // Number of characters that changed after the equality.
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {
      // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = diffs[pointer][1];
    } else {
      // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (
        lastequality &&
        lastequality.length <=
          Math.max(length_insertions1, length_deletions1) &&
        lastequality.length <= Math.max(length_insertions2, length_deletions2)
      ) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0, [
          DIFF_DELETE,
          lastequality,
        ]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0; // Reset the counters.
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    diff_cleanupMerge(diffs);
  }
  diff_cleanupSemanticLossless(diffs);

  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (
      diffs[pointer - 1][0] == DIFF_DELETE &&
      diffs[pointer][0] == DIFF_INSERT
    ) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (
          overlap_length1 >= deletion.length / 2 ||
          overlap_length1 >= insertion.length / 2
        ) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(pointer, 0, [
            DIFF_EQUAL,
            insertion.substring(0, overlap_length1),
          ]);
          diffs[pointer - 1][1] = deletion.substring(
            0,
            deletion.length - overlap_length1
          );
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (
          overlap_length2 >= deletion.length / 2 ||
          overlap_length2 >= insertion.length / 2
        ) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(pointer, 0, [
            DIFF_EQUAL,
            deletion.substring(0, overlap_length2),
          ]);
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] = insertion.substring(
            0,
            insertion.length - overlap_length2
          );
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] = deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
}

var nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
var whitespaceRegex_ = /\s/;
var linebreakRegex_ = /[\r\n]/;
var blanklineEndRegex_ = /\n\r?\n$/;
var blanklineStartRegex_ = /^\r?\n\r?\n/;

/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
function diff_cleanupSemanticLossless(diffs) {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_);
    var lineBreak1 = whitespace1 && char1.match(linebreakRegex_);
    var lineBreak2 = whitespace2 && char2.match(linebreakRegex_);
    var blankLine1 = lineBreak1 && one.match(blanklineEndRegex_);
    var blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (
      diffs[pointer - 1][0] == DIFF_EQUAL &&
      diffs[pointer + 1][0] == DIFF_EQUAL
    ) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      // First, shift the edit as far left as possible.
      var commonOffset = diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore =
        diff_cleanupSemanticScore_(equality1, edit) +
        diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score =
          diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
}

/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 * @param {boolean} fix_unicode Whether to normalize to a unicode-correct diff
 */
function diff_cleanupMerge(diffs, fix_unicode) {
  diffs.push([DIFF_EQUAL, ""]); // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = "";
  var text_insert = "";
  var commonlength;
  while (pointer < diffs.length) {
    if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
      diffs.splice(pointer, 1);
      continue;
    }
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        var previous_equality = pointer - count_insert - count_delete - 1;
        if (fix_unicode) {
          // prevent splitting of unicode surrogate pairs.  when fix_unicode is true,
          // we assume that the old and new text in the diff are complete and correct
          // unicode-encoded JS strings, but the tuple boundaries may fall between
          // surrogate pairs.  we fix this by shaving off stray surrogates from the end
          // of the previous equality and the beginning of this equality.  this may create
          // empty equalities or a common prefix or suffix.  for example, if AB and AC are
          // emojis, `[[0, 'A'], [-1, 'BA'], [0, 'C']]` would turn into deleting 'ABAC' and
          // inserting 'AC', and then the common suffix 'AC' will be eliminated.  in this
          // particular case, both equalities go away, we absorb any previous inequalities,
          // and we keep scanning for the next equality before rewriting the tuples.
          if (
            previous_equality >= 0 &&
            ends_with_pair_start(diffs[previous_equality][1])
          ) {
            var stray = diffs[previous_equality][1].slice(-1);
            diffs[previous_equality][1] = diffs[previous_equality][1].slice(
              0,
              -1
            );
            text_delete = stray + text_delete;
            text_insert = stray + text_insert;
            if (!diffs[previous_equality][1]) {
              // emptied out previous equality, so delete it and include previous delete/insert
              diffs.splice(previous_equality, 1);
              pointer--;
              var k = previous_equality - 1;
              if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                count_insert++;
                text_insert = diffs[k][1] + text_insert;
                k--;
              }
              if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                count_delete++;
                text_delete = diffs[k][1] + text_delete;
                k--;
              }
              previous_equality = k;
            }
          }
          if (starts_with_pair_end(diffs[pointer][1])) {
            var stray = diffs[pointer][1].charAt(0);
            diffs[pointer][1] = diffs[pointer][1].slice(1);
            text_delete += stray;
            text_insert += stray;
          }
        }
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          // for empty equality not at end, wait for next equality
          diffs.splice(pointer, 1);
          break;
        }
        if (text_delete.length > 0 || text_insert.length > 0) {
          // note that diff_commonPrefix and diff_commonSuffix are unicode-aware
          if (text_delete.length > 0 && text_insert.length > 0) {
            // Factor out any common prefixes.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if (previous_equality >= 0) {
                diffs[previous_equality][1] += text_insert.substring(
                  0,
                  commonlength
                );
              } else {
                diffs.splice(0, 0, [
                  DIFF_EQUAL,
                  text_insert.substring(0, commonlength),
                ]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixes.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] =
                text_insert.substring(text_insert.length - commonlength) +
                diffs[pointer][1];
              text_insert = text_insert.substring(
                0,
                text_insert.length - commonlength
              );
              text_delete = text_delete.substring(
                0,
                text_delete.length - commonlength
              );
            }
          }
          // Delete the offending records and add the merged ones.
          var n = count_insert + count_delete;
          if (text_delete.length === 0 && text_insert.length === 0) {
            diffs.splice(pointer - n, n);
            pointer = pointer - n;
          } else if (text_delete.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
            pointer = pointer - n + 1;
          } else if (text_insert.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
            pointer = pointer - n + 1;
          } else {
            diffs.splice(
              pointer - n,
              n,
              [DIFF_DELETE, text_delete],
              [DIFF_INSERT, text_insert]
            );
            pointer = pointer - n + 2;
          }
        }
        if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = "";
        text_insert = "";
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === "") {
    diffs.pop(); // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (
      diffs[pointer - 1][0] === DIFF_EQUAL &&
      diffs[pointer + 1][0] === DIFF_EQUAL
    ) {
      // This is a single edit surrounded by equalities.
      if (
        diffs[pointer][1].substring(
          diffs[pointer][1].length - diffs[pointer - 1][1].length
        ) === diffs[pointer - 1][1]
      ) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] =
          diffs[pointer - 1][1] +
          diffs[pointer][1].substring(
            0,
            diffs[pointer][1].length - diffs[pointer - 1][1].length
          );
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (
        diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
        diffs[pointer + 1][1]
      ) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
          diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
          diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs, fix_unicode);
  }
}

function is_surrogate_pair_start(charCode) {
  return charCode >= 0xd800 && charCode <= 0xdbff;
}

function is_surrogate_pair_end(charCode) {
  return charCode >= 0xdc00 && charCode <= 0xdfff;
}

function starts_with_pair_end(str) {
  return is_surrogate_pair_end(str.charCodeAt(0));
}

function ends_with_pair_start(str) {
  return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
}

function remove_empty_tuples(tuples) {
  var ret = [];
  for (var i = 0; i < tuples.length; i++) {
    if (tuples[i][1].length > 0) {
      ret.push(tuples[i]);
    }
  }
  return ret;
}

function make_edit_splice(before, oldMiddle, newMiddle, after) {
  if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
    return null;
  }
  return remove_empty_tuples([
    [DIFF_EQUAL, before],
    [DIFF_DELETE, oldMiddle],
    [DIFF_INSERT, newMiddle],
    [DIFF_EQUAL, after],
  ]);
}

function find_cursor_edit_diff(oldText, newText, cursor_pos) {
  // note: this runs after equality check has ruled out exact equality
  var oldRange =
    typeof cursor_pos === "number"
      ? { index: cursor_pos, length: 0 }
      : cursor_pos.oldRange;
  var newRange = typeof cursor_pos === "number" ? null : cursor_pos.newRange;
  // take into account the old and new selection to generate the best diff
  // possible for a text edit.  for example, a text change from "xxx" to "xx"
  // could be a delete or forwards-delete of any one of the x's, or the
  // result of selecting two of the x's and typing "x".
  var oldLength = oldText.length;
  var newLength = newText.length;
  if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
    // see if we have an insert or delete before or after cursor
    var oldCursor = oldRange.index;
    var oldBefore = oldText.slice(0, oldCursor);
    var oldAfter = oldText.slice(oldCursor);
    var maybeNewCursor = newRange ? newRange.index : null;
    editBefore: {
      // is this an insert or delete right before oldCursor?
      var newCursor = oldCursor + newLength - oldLength;
      if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
        break editBefore;
      }
      if (newCursor < 0 || newCursor > newLength) {
        break editBefore;
      }
      var newBefore = newText.slice(0, newCursor);
      var newAfter = newText.slice(newCursor);
      if (newAfter !== oldAfter) {
        break editBefore;
      }
      var prefixLength = Math.min(oldCursor, newCursor);
      var oldPrefix = oldBefore.slice(0, prefixLength);
      var newPrefix = newBefore.slice(0, prefixLength);
      if (oldPrefix !== newPrefix) {
        break editBefore;
      }
      var oldMiddle = oldBefore.slice(prefixLength);
      var newMiddle = newBefore.slice(prefixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
    }
    editAfter: {
      // is this an insert or delete right after oldCursor?
      if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
        break editAfter;
      }
      var cursor = oldCursor;
      var newBefore = newText.slice(0, cursor);
      var newAfter = newText.slice(cursor);
      if (newBefore !== oldBefore) {
        break editAfter;
      }
      var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
      var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
      var newSuffix = newAfter.slice(newAfter.length - suffixLength);
      if (oldSuffix !== newSuffix) {
        break editAfter;
      }
      var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
      var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
      return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
    }
  }
  if (oldRange.length > 0 && newRange && newRange.length === 0) {
    replaceRange: {
      // see if diff could be a splice of the old selection range
      var oldPrefix = oldText.slice(0, oldRange.index);
      var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
      var prefixLength = oldPrefix.length;
      var suffixLength = oldSuffix.length;
      if (newLength < prefixLength + suffixLength) {
        break replaceRange;
      }
      var newPrefix = newText.slice(0, prefixLength);
      var newSuffix = newText.slice(newLength - suffixLength);
      if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
        break replaceRange;
      }
      var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
      var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
    }
  }

  return null;
}

function diff(text1, text2, cursor_pos, cleanup) {
  // only pass fix_unicode=true at the top level, not when diff_main is
  // recursively invoked
  return diff_main(text1, text2, cursor_pos, cleanup, true);
}

diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;

module.exports = diff;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.clonedeep":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/lodash.clonedeep/package.json                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "lodash.clonedeep",
  "version": "4.5.0"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/lodash.clonedeep/index.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.isequal":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/lodash.isequal/package.json                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "lodash.isequal",
  "version": "4.5.0"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-studyguide/node_modules/lodash.isequal/index.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

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

require("/node_modules/meteor/retronator:pixelartacademy-studyguide/studyguide.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/studyguide-goals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/studyguide-tasks.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/global.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/article.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/figure/figure.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/figure/template.figure.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/figure/image/image.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/figure/image/template.image.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/practicesection/practicesection.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/task/task.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/task/prerequisiteswarning/prerequisiteswarning.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/task/prerequisiteswarning/template.prerequisiteswarning.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/task/reading/reading.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/task/reading/template.reading.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/task/upload/upload.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/article/blots-client/task/upload/template.upload.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/activity/activity.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/activity/activity-client.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/activity/methods.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/book/book.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/book/methods.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/pages.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/layout/layout.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/layout/template.layout.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/home.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/template.home.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/menu/menu.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/menu/template.menu.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/menu/items/items.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/menu/items/template.items.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/activities/activities.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/activities/template.activities.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/studyplan/studyplan.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/studyplan/template.studyplan.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/about/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/about/template.about.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/submissions/submissions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/submissions/template.submissions.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/submissions/picture/picture.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/submissions/picture/template.picture.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/book/book.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/book/template.book.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/book/article-client/article.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/home/book/article-client/template.article.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/admin.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/template.admin.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/activities.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/template.activities.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/activity.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/template.activity.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/task.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/template.task.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/article-client/article.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/activities/article-client/template.article.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/books/books.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/books/template.books.js");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/books/book.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-studyguide/pages/admin/books/template.book.js");

/* Exports */
Package._define("retronator:pixelartacademy-studyguide", {
  PixelArtAcademy: PixelArtAcademy
});

})();
