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
var PixelArtAcademy = Package['retronator:pixelartacademy-pixelpad-notifications'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixelpad-todo":{"todo.coffee":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/retronator_pixelartacademy-pixelpad-todo/todo.coffee                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.PixelPad.Systems.ToDo = function () {
  class ToDo extends PAA.PixelPad.System {
    static id() {
      return 'PixelArtAcademy.PixelPad.Systems.ToDo';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "待办";
    }
    static description() {
      return "任务追踪信息系统。";
    }
    constructor() {
      super(...arguments);
      this.bindingHeight = 14;
      this.hideTop = 40;
      this.waitBetweenAnimationsDuration = 0.1;
      this.animationStepDuration = 0.02;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.mouseHovering = new ReactiveField(false);
      this.openButtonHovering = new ReactiveField(false);
      this.selectedTask = new ReactiveField(null);
      this.contentHeight = new ReactiveField(0);
      this.previousContentHeight = new ReactiveField(0);
      this.manualDisplayState = new ReactiveField(null);
      this.defaultDisplayState = new ComputedField(() => {
        if (this.os.currentAppUrl()) {
          return this.constructor.DisplayState.Hidden;
        } else {
          return this.constructor.DisplayState.Closed;
        }
      });
      this.displayState = new ComputedField(() => {
        return this.manualDisplayState() || this.defaultDisplayState();
      });

      // Automatically hide if an app is loaded.
      this.autorun(computation => {
        if (this.os.currentAppUrl()) {
          return this.manualDisplayState(null);
        }
      });

      // Automatically deselect the task when not open.
      this.autorun(computation => {
        if (this.displayState() === this.constructor.DisplayState.Open) {
          return;
        }
        return this.selectedTask(null);
      });

      // Handle displayed tasks.
      this.tasks = new ComputedField(() => {
        return LOI.adventure.currentTasks();
      });
      this.activeTasks = new ComputedField(() => {
        return _.filter(this.tasks(), task => {
          return task.active();
        });
      });
      this.availableTasks = new ComputedField(() => {
        return _.filter(this.tasks(), task => {
          return task.available();
        });
      });
      this.activeTasksToBeDisplayed = new ReactiveField([]);
      this.displayedActiveTasks = new ReactiveField([]);
      this.completedTasks = new ReactiveField([]);
      return this.autorun(computation => {
        var activeTasks;
        activeTasks = this.activeTasks();
        return Tracker.nonreactive(() => {
          var activeTasksToBeDisplayed, completedTasks, deactivatedActiveTasks, deactivatedActiveTasksToBeDisplayed, displayedActiveTasks, j, k, l, len, len1, len2, len3, m, removeCount, removedTasks, results, task, tasksCount;
          activeTasksToBeDisplayed = this.activeTasksToBeDisplayed();
          displayedActiveTasks = this.displayedActiveTasks();
          completedTasks = this.completedTasks();
          for (j = 0, len = activeTasks.length; j < len; j++) {
            task = activeTasks[j];
            if (indexOf.call(activeTasksToBeDisplayed, task) < 0 && indexOf.call(displayedActiveTasks, task) < 0) {
              activeTasksToBeDisplayed.push(task);
            }
          }

          // Remove deactivated tasks.
          deactivatedActiveTasksToBeDisplayed = _.filter(activeTasksToBeDisplayed, task => {
            return !task.active();
          });
          for (k = 0, len1 = deactivatedActiveTasksToBeDisplayed.length; k < len1; k++) {
            task = deactivatedActiveTasksToBeDisplayed[k];
            _.pull(activeTasksToBeDisplayed, task);
          }
          deactivatedActiveTasks = _.filter(displayedActiveTasks, task => {
            return !task.active() && !task.completed();
          });
          for (l = 0, len2 = deactivatedActiveTasks.length; l < len2; l++) {
            task = deactivatedActiveTasks[l];
            _.pull(displayedActiveTasks, task);
            this.$("[data-task-id='".concat(task.id(), "']")).remove();
          }
          // Update active tasks.
          this.activeTasksToBeDisplayed(activeTasksToBeDisplayed);
          if (deactivatedActiveTasks.length) {
            this.displayedActiveTasks(displayedActiveTasks);
          }

          // Remove completed tasks so that the total shown tasks is not above 9 if possible.
          tasksCount = activeTasksToBeDisplayed.length + displayedActiveTasks.length + completedTasks.length;
          removeCount = tasksCount - 9;
          if (!(removeCount > 0)) {
            return;
          }
          removedTasks = completedTasks.splice(0, removeCount);
          this.completedTasks(completedTasks);

          // Also remove them from the displayed list.
          results = [];
          for (m = 0, len3 = removedTasks.length; m < len3; m++) {
            task = removedTasks[m];
            results.push(this.$("[data-task-id='".concat(task.id(), "']")).remove());
          }
          return results;
        });
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      this.$content = this.$('.page .content');
      this._resizeObserver = new ResizeObserver(() => {
        this.previousContentHeight(this.contentHeight());
        return this.contentHeight(this.$content.outerHeight());
      });
      this._resizeObserver.observe(this.$content[0]);
      this.animating = new ReactiveField(false);
      this.$displayedTasks = this.$('.displayed-tasks');
      this.autorun(computation => {
        var displayedActiveTasks, j, k, len, len1, ref, task;
        // Animate the next task if we're idle and visible.
        if (this.animating()) {
          return;
        }
        if (this.selectedTask()) {
          return;
        }
        if (this.displayState() === this.constructor.DisplayState.Hidden) {
          return;
        }
        if (LOI.adventure.modalDialogs().length) {
          return;
        }

        // Mark completed tasks.
        displayedActiveTasks = this.displayedActiveTasks();
        for (j = 0, len = displayedActiveTasks.length; j < len; j++) {
          task = displayedActiveTasks[j];
          if (task.completed()) {
            this._animateTaskCompleted(task);
            return;
          }
        }
        ref = this.activeTasksToBeDisplayed();

        // Add new tasks.
        for (k = 0, len1 = ref.length; k < len1; k++) {
          task = ref[k];
          this._animateTaskAdded(task);
          return;
        }

        // If there are no more active tasks, remove all completed ones.
        if (!this.activeTasks().length) {
          return Tracker.nonreactive(() => {
            var completedTasks, l, len2, results;
            completedTasks = this.completedTasks();
            this.completedTasks([]);

            // Also remove them from the displayed list.
            results = [];
            for (l = 0, len2 = completedTasks.length; l < len2; l++) {
              task = completedTasks[l];
              results.push(this.$("[data-task-id='".concat(task.id(), "']")).remove());
            }
            return results;
          });
        }
      });
      return Tracker.triggerOnDefinedChange(this.displayState, (displayState, previousDisplayState) => {
        // Make sure we're still being rendered.
        if (!this.isRendered()) {
          return;
        }
        this._updateNotepadPan();
        if (displayState === this.constructor.DisplayState.Open) {
          return this.audio.open();
        } else if (displayState === this.constructor.DisplayState.Closed && previousDisplayState === this.constructor.DisplayState.Open) {
          return this.audio.close();
        }
      });
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      if ((ref = this._resizeObserver) != null) {
        ref.disconnect();
      }

      // Disable any ongoing audio.
      this.audio.strikethrough(false);
      return this.audio.writing(false);
    }
    _animationAvailable() {
      var displayedActiveTasks, j, k, len, len1, ref, task;
      // If any of the displayed tasks have completed, we should animate.
      displayedActiveTasks = this.displayedActiveTasks();
      for (j = 0, len = displayedActiveTasks.length; j < len; j++) {
        task = displayedActiveTasks[j];
        if (task.completed()) {
          return true;
        }
      }
      ref = this.activeTasks();
      for (k = 0, len1 = ref.length; k < len1; k++) {
        task = ref[k];
        if (indexOf.call(displayedActiveTasks, task) < 0) {
          // If any of the active tasks is not displayed, we should animate.
          return true;
        }
      }
    }
    async _animateTaskCompleted(task) {
      var $taskListItem, completedTasks, directive, displayedActiveTasks, i, j, ref;
      if (!(await this._animateOpen())) {
        return;
      }
      $taskListItem = this.$("[data-task-id='".concat(task.id(), "']"));
      directive = task.directive();
      this.audio.strikethrough(true);
      for (i = j = 0, ref = directive.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        $taskListItem.html("<span class='directive'><span class='crossed-off'>".concat(directive.slice(0, +i + 1 || 9e9), "</span><span class='cursor'></span>").concat(directive.slice(i + 1), "</span>"));
        this._updateWritingPan();
        await _.waitForSeconds(this.animationStepDuration);
      }
      $taskListItem.removeClass('active').addClass('completed');
      this.audio.strikethrough(false);
      displayedActiveTasks = this.displayedActiveTasks();
      completedTasks = this.completedTasks();
      _.pull(displayedActiveTasks, task);
      completedTasks.push(task);
      this.displayedActiveTasks(displayedActiveTasks);
      this.completedTasks(completedTasks);
      await _.waitForSeconds(this.waitBetweenAnimationsDuration);
      await task.onCompletedDisplayed();
      return this._animateClose();
    }
    async _animateTaskAdded(task) {
      var $taskListItem, activeTasksToBeDisplayed, directive, displayedActiveTasks, i, j, ref;
      if (!(await this._animateOpen())) {
        return;
      }
      activeTasksToBeDisplayed = this.activeTasksToBeDisplayed();
      displayedActiveTasks = this.displayedActiveTasks();
      _.pull(activeTasksToBeDisplayed, task);
      displayedActiveTasks.push(task);
      this.activeTasksToBeDisplayed(activeTasksToBeDisplayed);
      this.displayedActiveTasks(displayedActiveTasks);
      $taskListItem = $("<li class='task' data-task-id='".concat(task.id(), "'>"));
      this.$displayedTasks.append($taskListItem);
      directive = task.directive();
      this.audio.writing(true);
      for (i = j = 0, ref = directive.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        $taskListItem.html("<span class='directive'>".concat(directive.slice(0, +i + 1 || 9e9), "<span class='cursor'></span><span style='visibility: hidden'>").concat(directive.slice(i + 1), "</span></span>"));
        this._updateWritingPan();
        await _.waitForSeconds(this.animationStepDuration);
      }
      $taskListItem.addClass('active');
      this.audio.writing(false);
      await _.waitForSeconds(this.waitBetweenAnimationsDuration);
      await task.onActiveDisplayed();
      return this._animateClose();
    }
    _updateWritingPan() {
      var cursor, ref;
      // Make sure the cursor is still rendered.
      if (!(cursor = (ref = this.$('.cursor')) != null ? ref[0] : void 0)) {
        return;
      }
      return this.audio.writingPan(AEc.getPanForElement(cursor));
    }
    async _animateOpen() {
      this.animating(true);
      this.selectedTask(null);
      if (this.displayState() !== this.constructor.DisplayState.Open) {
        // Give some time for the other UI animations to finish.
        await _.waitForSeconds(1);

        // Make sure we're still on the home screen (no app has been opened while we were waiting).
        if (this.os.currentAppUrl()) {
          this._animateEnd();
          return false;
        }
        this.manualDisplayState(this.constructor.DisplayState.Open);
        await _.waitForSeconds(0.35);
      }

      // Make sure we're still being rendered.
      if (!this.isRendered()) {
        this._animateEnd();
        return false;
      }
      return true;
    }
    _animateClose() {
      var closeDelay;
      this._animateEnd();
      Meteor.clearTimeout(this._animateCloseTimeout);

      // Determine how long to wait before closing the notebook.
      if (LM.Notifications.TheEnd.condition()) {
        closeDelay = 1500;
      } else if (!this.activeTasks().length) {
        // We don't have any more active tasks. Delay closing for longer so
        // that the player can see the instructions for adding new tasks.
        closeDelay = 4000;
      } else if (this.notifications().displayAlwaysNotifications().length && !LM.Notifications.TheEnd.condition()) {
        // There are notifications waiting to be displayed that will always be shown, so close quickly.
        closeDelay = 500;
      } else {
        closeDelay = 2000;
      }

      // Close after a second if no further animations are happening.
      return this._animateCloseTimeout = Meteor.setTimeout(() => {
        if (this.animating()) {
          return;
        }
        if (this.mouseHovering()) {
          return;
        }
        return this.manualDisplayState(null);
      }, closeDelay);
    }
    _animateEnd() {
      return this.animating(false);
    }
    allowsShortcutsTable() {
      return false;
    }
    onBackButton() {
      var goal, goalId, parameter1, ref, studyPlanData;
      // If we have an animation waiting to happen, we want any presses on the back button
      // to return us to the main menu so that the to-do tasks can be visually updated.
      if (!this._animationAvailable()) {
        return;
      }
      parameter1 = AB.Router.getParameter('parameter1');

      // If any of the goals were completed that haven't been revealed in the Study Plan yet, go there first.
      if (PAA.PixelPad.Apps.StudyPlan.used()) {
        studyPlanData = PAA.PixelPad.Apps.StudyPlan.state();
        if (studyPlanData.revealed.goalIds) {
          ref = studyPlanData.goals;
          for (goalId in ref) {
            goal = ref[goalId];
            if (!(PAA.Learning.Goal.getClassForId(goalId).completed() && indexOf.call(studyPlanData.revealed.goalIds, goalId) < 0)) {
              continue;
            }
            AB.Router.setParameters({
              parameter1,
              parameter2: PAA.PixelPad.Apps.StudyPlan.url()
            });

            // Inform that we've handled the back button.
            return true;
          }
        }
      }
      AB.Router.setParameters({
        parameter1
      });

      // Inform that we've handled the back button.
      return true;
    }
    isActive() {
      return this.isRendered() && this.animating() || this.displayState() === this.constructor.DisplayState.Open;
    }
    waitUntilInactive() {
      return new Promise((resolve, reject) => {
        return Tracker.autorun(computation => {
          if (this.isActive()) {
            return;
          }
          computation.stop();
          return resolve();
        });
      });
    }
    close() {
      return this.manualDisplayState(null);
    }
    notifications() {
      return this.os.getSystem(PAA.PixelPad.Systems.Notifications);
    }
    displayStateClass() {
      return _.kebabCase(this.displayState());
    }
    openButtonHoveredClass() {
      if (this.openButtonHovering()) {
        return 'open-button-hovered';
      }
    }
    selectedTaskVisibleClass() {
      if (this.selectedTask()) {
        return 'selected-task-visible';
      }
    }
    notepadStyle() {
      var top;
      switch (this.displayState()) {
        case this.constructor.DisplayState.Open:
          top = "calc(-".concat(this.contentHeight(), "px - ").concat(this.bindingHeight, "rem)");
          break;
        case this.constructor.DisplayState.Closed:
          top = "-".concat(this.bindingHeight + (this.openButtonHovering() ? 3 : -1), "rem");
          break;
        default:
          top = "".concat(this.hideTop, "rem");
      }
      return {
        top
      };
    }
    pageStyle() {
      var maxContentHeight;
      maxContentHeight = Math.max(this.contentHeight(), this.previousContentHeight());
      return {
        // Add 10% to account for the bounce animation.
        height: "".concat(maxContentHeight * 1.1, "px")
      };
    }
    showToDo() {
      return this.activeTasks().length || this.completedTasks().length || this.displayedActiveTasks().length;
    }
    hasAvailableTasks() {
      return this.availableTasks().length;
    }
    taskSelectedClass() {
      if (this.selectedTask()) {
        return 'task-selected';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click': this.onClick,
        'mouseenter .pixelartacademy-pixelpad-systems-todo': this.onMouseEnterToDo,
        'mouseleave .pixelartacademy-pixelpad-systems-todo': this.onMouseLeaveToDo,
        'mouseenter .open-button': this.onMouseEnterOpenButton,
        'mouseleave .open-button': this.onMouseLeaveOpenButton,
        'click .open-button': this.onClickOpenButton,
        'click .task': this.onClickTask,
        'click .back-button': this.onClickBackButton
      });
    }
    onClick(event) {
      return Meteor.clearTimeout(this._animateCloseTimeout);
    }
    onMouseEnterToDo(event) {
      return this.mouseHovering(true);
    }
    onMouseLeaveToDo(event) {
      return this.mouseHovering(false);
    }
    onMouseEnterOpenButton(event) {
      return this.openButtonHovering(true);
    }
    onMouseLeaveOpenButton(event) {
      return this.openButtonHovering(false);
    }
    onClickOpenButton() {
      var defaultDisplayState, targetDisplayState;
      defaultDisplayState = this.defaultDisplayState();
      if (defaultDisplayState === this.constructor.DisplayState.Hidden) {
        return this.manualDisplayState(null);
      } else {
        targetDisplayState = this.displayState() === this.constructor.DisplayState.Open ? this.constructor.DisplayState.Closed : this.constructor.DisplayState.Open;
        return this.manualDisplayState(targetDisplayState === defaultDisplayState ? null : targetDisplayState);
      }
    }
    onClickTask(event) {
      var taskId;
      taskId = $(event.target).closest('.task').data('taskId');
      this.selectedTask(_.find(this.tasks(), task => {
        return task.id() === taskId;
      }));
      return this._pageFlip();
    }
    onClickBackButton(event) {
      this.selectedTask(null);
      return this._pageFlip();
    }
    _pageFlip() {
      this._updateNotepadPan();
      return this.audio.pageFlip();
    }
    _updateNotepadPan() {
      return this.audio.notepadPan(AEc.getPanForElement(this.$('.notepad')[0]));
    }
  }
  ;
  ToDo.register(ToDo.id());
  ToDo.initialize();
  ToDo.DisplayState = {
    Open: 'Open',
    Closed: 'Closed',
    Hidden: 'Hidden'
  };
  ToDo.Audio = new LOI.Assets.Audio.Namespace(ToDo.id(), {
    variables: {
      open: AEc.ValueTypes.Trigger,
      close: AEc.ValueTypes.Trigger,
      pageFlip: AEc.ValueTypes.Trigger,
      notepadPan: AEc.ValueTypes.Number,
      writing: AEc.ValueTypes.Boolean,
      writingPan: AEc.ValueTypes.Number,
      strikethrough: AEc.ValueTypes.Boolean
    }
  });
  return ToDo;
}.call(this);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.todo.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/retronator_pixelartacademy-pixelpad-todo/template.todo.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //

Template.__checkName("PixelArtAcademy.PixelPad.Systems.ToDo");
Template["PixelArtAcademy.PixelPad.Systems.ToDo"] = new Template("Template.PixelArtAcademy.PixelPad.Systems.ToDo", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixelpad-systems-todo system ", Spacebars.mustache(view.lookup("taskSelectedClass")) ];
    }
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "notepad ", Spacebars.mustache(view.lookup("displayStateClass")), " ", Spacebars.mustache(view.lookup("openButtonHoveredClass")), " ", Spacebars.mustache(view.lookup("selectedTaskVisibleClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("notepadStyle"));
  }), "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("notifications"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), HTML.Raw('\n      <button class="open-button"></button>\n      <div class="binding">\n        <div class="close-hint">x</div>\n        <div class="turned-page"></div>\n      </div>\n      '), HTML.DIV(HTML.Attrs({
    class: "page"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("pageStyle"));
  }), HTML.Raw('\n        <div class="sideline"></div>\n        '), HTML.DIV({
    class: "content"
  }, "\n          ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("selectedTask"));
  }, function() {
    return [ "\n            ", HTML.DIV({
      class: "instructions"
    }, HTML.Raw('\n              <button class="back-button">←</button>\n              '), HTML.DIV({
      class: "goal-name"
    }, Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("goal"), "displayNameTranslation"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    })), "\n              ", Spacebars.include(view.lookupTemplate("Markdown"), function() {
      return Blaze.View("lookup:instructions", function() {
        return Spacebars.mustache(view.lookup("instructions"));
      });
    }), "\n            "), "\n          " ];
  }), "\n          ", HTML.DIV({
    class: "todo"
  }, "\n            ", HTML.DIV({
    class: "header"
  }, "\n              ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showToDo"));
  }, function() {
    return "\n                TO DO:\n              ";
  }, function() {
    return [ "\n                ", Blaze.If(function() {
      return Spacebars.call(view.lookup("hasAvailableTasks"));
    }, function() {
      return "\n                  在学习计划中添加新目标以获得更多任务。\n                ";
    }, function() {
      return "\n                  您已完成！\n                ";
    }), "\n              " ];
  }), "\n            "), "\n            ", HTML.DIV({
    class: "tasks-area"
  }, HTML.Raw('\n              <ul class="displayed-tasks">\n              </ul>\n              '), HTML.UL({
    class: "tasks"
  }, "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("completedTasks"));
  }, function() {
    return [ "\n                  ", HTML.LI({
      class: "task completed"
    }, HTML.SPAN({
      class: "directive"
    }, Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("directiveTranslation"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }))), "\n                " ];
  }), "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("displayedActiveTasks"));
  }, function() {
    return [ "\n                  ", HTML.LI({
      class: "task active"
    }, HTML.SPAN({
      class: "directive"
    }, Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("directiveTranslation"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }))), "\n                " ];
  }), "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("activeTasksToBeDisplayed"));
  }, function() {
    return [ "\n                  ", HTML.LI({
      class: "task active"
    }, HTML.SPAN({
      class: "directive"
    }, Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("directiveTranslation"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }))), "\n                " ];
  }), "\n              "), "\n            "), "\n          "), "\n        "), "\n      "), "\n    "), "\n  ");
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-todo/todo.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixelpad-todo/template.todo.js");

/* Exports */
Package._define("retronator:pixelartacademy-pixelpad-todo", {
  PixelArtAcademy: PixelArtAcademy
});

})();
