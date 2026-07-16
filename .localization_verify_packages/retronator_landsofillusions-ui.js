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
var LandsOfIllusions = Package['retronator:landsofillusions-assets'].LandsOfIllusions;
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
var __coffeescriptShare, command;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:landsofillusions-ui":{"interface":{"interface.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/interface.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  LOI,
  Nodes,
  ref,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
Nodes = LOI.Adventure.Script.Nodes;
ref = LOI.Interface = class Interface extends LOI.Component {
  constructor(options1) {
    super(...arguments);
    this.prepareForLocationChange = this.prepareForLocationChange.bind(this);
    this.options = options1;
    this.locationChangeReady = new ReactiveField(false);
  }
  onCreated() {
    super.onCreated(...arguments);
    // React to location changes.
    this.autorun(computation => {
      var location;
      // Wait to run until interface is fully operational.
      if (!this.isRendered()) {
        return;
      }
      // Find the location we're at.
      location = this.location();
      if (!location) {
        return;
      }
      // We only want to react to change of location.
      return Tracker.nonreactive(() => {
        var ref1;
        // Reset interface to not ready.
        this.locationChangeReady(false);
        // Mark stored current (previous) location as visited when location changes (in this user session).
        if (location.constructor !== this._previousLocationClass) {
          if ((ref1 = this._previousLocationClass) != null) {
            ref1.visited(true);
          }
          // Now store the new location as the
          this._previousLocationClass = location.constructor;
        }
        // Clear the current contexts.
        LOI.adventure.exitContext();
        LOI.adventure.clearAdvertisedContext();
        // Do any initialization needed after location change.
        return this.onLocationChanged();
      });
    });
    // Listen to the foreground script.
    this.autorun(computation => {
      var scriptNode;
      if (!this._readyToProcessScriptNodes()) {
        return;
      }
      if (!(scriptNode = LOI.adventure.director.foregroundScriptQueue.currentScriptNode())) {
        return;
      }
      if (LOI.debug) {
        console.log("Interface has detected a new foreground script node:", scriptNode);
      }
      return Tracker.nonreactive(() => {
        return this._handleNode(scriptNode);
      });
    });
    // Listen to the background scripts.
    this.autorun(computation => {
      var scriptNode;
      if (!this._readyToProcessScriptNodes()) {
        return;
      }
      if (!(scriptNode = LOI.adventure.director.backgroundScriptQueue.currentScriptNode())) {
        return;
      }
      if (LOI.debug) {
        console.log("Interface has detected new background script node:", scriptNode);
      }
      return Tracker.nonreactive(() => {
        return this._handleNode(scriptNode, {
          background: true
        });
      });
    });
    // Listen to the realtime scripts.
    return this.autorun(computation => {
      var scriptNode;
      // Realtime scripts execute all the time when the game is running.
      if (!(this.locationChangeReady() && !LOI.adventure.paused())) {
        return;
      }
      if (!(scriptNode = LOI.adventure.director.realtimeScriptQueue.currentScriptNode())) {
        return;
      }
      if (LOI.debug) {
        console.log("Interface has detected new realtime script node:", scriptNode);
      }
      return Tracker.nonreactive(() => {
        return this._handleNode(scriptNode, {
          background: true,
          realtime: true
        });
      });
    });
  }
  onRendered() {
    super.onRendered(...arguments);

    // Prevent the player from choosing a resolution that would exceed the safe area significantly.
    this.highestAvailableScale = new ComputedField(() => {
      var clientBounds, highestHorizontalScale, highestScale, highestVerticalScale, safeAreaHeight, safeAreaWidth, windowHeight, windowWidth;
      clientBounds = AM.Window.clientBounds();
      windowWidth = clientBounds.width();
      safeAreaWidth = this.display.safeAreaWidth();
      highestHorizontalScale = Math.floor(windowWidth / safeAreaWidth);
      windowHeight = clientBounds.height();
      safeAreaHeight = this.display.safeAreaHeight();
      highestVerticalScale = Math.floor(windowHeight / safeAreaHeight);
      highestScale = Math.min(highestHorizontalScale, highestVerticalScale);
      return Math.max(2, highestScale);
    });

    // Control the minimum scale so that display can scale down if necessary to show most of the UI.
    return this.autorun(computation => {
      var maximumScale, minimumScale;
      if (maximumScale = LOI.settings.graphics.maximumScale.value()) {
        minimumScale = _.clamp(this.highestAvailableScale(), 2, maximumScale);
      } else {
        minimumScale = 2;
      }
      return LOI.settings.graphics.minimumScale.value(minimumScale);
    });
  }
  _readyToProcessScriptNodes() {
    // We want to wait until the interface is ready after the location change has been initiated.
    if (!this.locationChangeReady()) {
      return;
    }
    // We also don't want to process new nodes while UI isn't active or it is waiting for user interaction.
    if (!this.active()) {
      return;
    }
    if (this.waitingKeypress()) {
      return;
    }
    return true;
  }
  location() {
    return LOI.adventure.currentLocation();
  }
  context() {
    return LOI.adventure.currentContext();
  }
  activeItems() {
    var activeItems, items;
    // Active items render their UI and can be any non-deactivated item in the inventory or at the location.
    items = _.filter(LOI.adventure.currentPhysicalThings(), thing => {
      return thing instanceof LOI.Adventure.Item;
    });
    activeItems = _.filter(items, item => {
      return !item.deactivated();
    });
    if (LOI.debug) {
      console.log("Interface is displaying active items", activeItems);
    }
    return activeItems;
  }
  inventoryItems() {
    var item, items;
    if (!(items = LOI.adventure.currentInventoryThings())) {
      return [];
    }
    items = function () {
      var i, len, results;
      results = [];
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if (item.displayInInventory()) {
          results.push(item);
        }
      }
      return results;
    }();
    if (LOI.debug) {
      console.log("Interface is displaying inventory items", items);
    }
    return items;
  }

  // Query this to see if the interface is listening to user commands.
  active() {
    // The text interface is inactive when adventure is paused.
    if (LOI.adventure.paused()) {
      return;
    }

    // It's inactive when there is an item active.
    if (LOI.adventure.activeItem()) {
      return;
    }
    return true;
  }
  prepareForLocationChange(newLocation, handler) {
    boundMethodCheck(this, ref);
    return handler(); // Override to prepare for location change. Call handler when done with preparations.
  }
  onLocationChanged(location) {} // Override to handle location changes. Call "@locationChangeReady true" when ready to start handling nodes.

  listeners() {
    // Override to provide global listeners of the interface.
    return [];
  }
  busy() {
    return false; // Override this to notify if the user is doing something with the interface.
  }
  ready() {
    return true; // Override to notify when the interface has finished preparing its resources.
  }
  resize() {} // Override to perform any adjustments when the UI is being resized.

  reset() {} // Override to get the interface to its default state.

  _handleNode(node) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var i, len, listener, ref1, results;
    if (!options.force) {
      if (node.handled) {
        return;
      }
    }
    // Mark node as handled to avoid double handling.
    node.handled = true;
    if (node instanceof Nodes.Script) {
      this._handleEmpty(node, options);
    }
    if (node instanceof Nodes.Label) {
      this._handleEmpty(node, options);
    }
    if (node instanceof Nodes.DialogueLine) {
      this._handleDialogueLine(node, options);
    }
    if (node instanceof Nodes.NarrativeLine) {
      this._handleNarrativeLine(node, options);
    }
    if (node instanceof Nodes.InterfaceLine) {
      this._handleInterfaceLine(node, options);
    }
    if (node instanceof Nodes.CommandLine) {
      this._handleCommandLine(node, options);
    }
    if (node instanceof Nodes.Code) {
      // Handle Code nodes, which includes Conditional nodes since they inherit from Code.
      this._handleEmpty(node, options);
    }
    if (node instanceof Nodes.Callback) {
      this._handleCallback(node, options);
    }
    if (node instanceof Nodes.Animation) {
      this._handleCallback(node, options);
    }
    if (node instanceof Nodes.Timeout) {
      this._handleTimeout(node, options);
    }
    ref1 = LOI.adventure.currentListeners();
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      listener = ref1[i];
      // Inform listeners that the node has been handled.
      results.push(listener.onScriptNodeHandled(node));
    }
    return results;
  }
  _handleEmpty(scriptNode, options) {
    // Simply end the node.
    return scriptNode.end();
  }
  _handleDialogueLine(dialogueLine, options) {
    return console.log("".concat(dialogueLine.actor.name, " says: \"").concat(dialogueLine.line, "\""));
  }
  _handleNarrativeLine(narrativeLine, options) {
    return console.log(narrativeLine.line);
  }
  _handleCallback(callback, options) {
    if (!callback.callback) {
      // No callback was set for this node. Give a warning and just skip it.
      console.warn("No callback is set for", callback.name);
      callback.end();
      return;
    }
    // Call the callback and pass it the completion function.
    callback.callback(() => {
      return callback.end();
    });
    // For realtime queue, immediately pause the node to allow other realtime scripts to continue.
    if (options.realtime) {
      return LOI.adventure.director.realtimeScriptQueue.pauseCurrentNode();
    }
  }
  _handleTimeout(timeout, options) {
    return Meteor.setTimeout(() => {
      return timeout.end();
    }, timeout.milliseconds);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"components":{"components.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/components/components.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI;
LOI = LandsOfIllusions;
LOI.Interface.Components = class Components {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"narrative.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/components/narrative.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Interface.Components.Narrative = function () {
  class Narrative {
    constructor(options1) {
      this.options = options1;
      this.text = new ReactiveField("");
    }
    lines() {
      var text;
      text = this.text();
      if (!text.length) {
        return [];
      }
      return text.split('\n');
    }
    linesCount() {
      return this.lines().length;
    }
    addText(newText) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var text;
      text = this.text();
      if (options.addNewLine == null) {
        options.addNewLine = true;
      }
      if (text.length > 0) {
        if (options.addNewLine) {
          text += "\n";
        }
      }
      // Make sure new text doesn't have any new lines itself. We consider every call to add text to be one unit.
      newText = newText.replace(/[\n\r]+/mg, '');
      // If the text is a background action, wrap it in the background class and don't scroll.
      if (options.background) {
        newText = "%%html<div class='in-background'>".concat(newText, "</div>html%%");
        options.scrollStyle = this.constructor.ScrollStyle.RetainBottom;
      }
      text += newText;
      this.text(text);
      return this.onTextUpdated(options);
    }
    onTextUpdated() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (options.scrollStyle !== this.constructor.ScrollStyle.None) {
        // Handle the style where we scroll to bottom only if we're already on bottom.
        if (options.scrollStyle === this.constructor.ScrollStyle.RetainBottom) {
          // Quit, so we don't scroll if we're not at bottom.
          if (!this.options.textInterface.isNarrativeScrolledToBottom()) {
            return;
          }
        }
        return Tracker.afterFlush(() => {
          this.options.textInterface.resize();
          return this.scroll({
            scrollStyle: options.scrollStyle
          });
        });
      }
    }
    removeLastCommand() {
      var lastCommandIndex, lines, newLines, newText;
      lines = this.lines();
      // Find the last line with the character '>' which signifies a command.
      lastCommandIndex = _.findLastIndex(lines, line => {
        return line[0] === '>';
      });
      newLines = lines.slice(0, lastCommandIndex);
      newText = newLines.join('\n');
      return this.text(newText);
    }
    clear() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.text("");
      return this.onTextUpdated(options);
    }
    scroll() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var $lastNarrativeLine, $textDisplayContent, $textInterface, $ui, displayContentHeight, hiddenNarrative, newTextTop, position, uiHeight;
      if (options.animate == null) {
        options.animate = true;
      }
      if (options.scrollMain == null) {
        options.scrollMain = true;
      }
      if (options.scrollStyle == null) {
        options.scrollStyle = this.constructor.ScrollStyle.Bottom;
      }
      $textInterface = $('.landsofillusions-adventure .landsofillusions-interface-text');
      if (!$textInterface.length) {
        return;
      }
      $textDisplayContent = $textInterface.find('.text-display-content');
      $ui = $textInterface.find('.ui');
      displayContentHeight = $textDisplayContent.height();
      uiHeight = options.height || $ui.height();
      // If UI doesn't have at least some height, it's probably not rendered correctly yet.
      if (!uiHeight) {
        return;
      }
      hiddenNarrative = Math.max(0, displayContentHeight - uiHeight);
      switch (options.scrollStyle) {
        case this.constructor.ScrollStyle.Bottom:
        case this.constructor.ScrollStyle.RetainBottom:
          // Make sure the latest narrative is visible by scrolling text display content to the bottom.
          newTextTop = -hiddenNarrative;
          break;
        case this.constructor.ScrollStyle.Top:
          // Make sure the latest narrative is visible by scrolling text display content to the top.
          $lastNarrativeLine = $textDisplayContent.find('.narrative-line').last();
          position = $lastNarrativeLine.position();
          newTextTop = Math.max(-position.top, -hiddenNarrative);
      }
      this.options.textInterface.animateElement({
        $element: $textDisplayContent,
        animate: options.animate,
        properties: {
          translateY: "".concat(newTextTop, "px")
        }
      });
      if (options.scrollMain) {
        return this.options.textInterface.scroll({
          position: this.options.textInterface.maxScrollTop(),
          animate: options.animate,
          slow: options.slow
        });
      }
    }
  }
  ;
  Narrative.ScrollStyle = {
    None: 'None',
    Top: 'Top',
    Bottom: 'Bottom',
    RetainBottom: 'RetainBottom'
  };
  return Narrative;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"commandinput.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/components/commandinput.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AM, LOI;
AC = Artificial.Control;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
LOI.Interface.Components.CommandInput = class CommandInput {
  constructor(options) {
    this.options = options;
    this.command = new ReactiveField("");
    // How long is the string before the caret position.
    this.caretPosition = new ReactiveField(0);
    this.storedCommandHistory = new ReactiveField([]);
    this.persistHistoryAutorun = AM.PersistentStorage.persist({
      storageKey: 'LandsOfIllusions.Interface.Components.CommandInput.commandHistory',
      field: this.storedCommandHistory,
      consentField: LOI.settings.persistCommandHistory.allowed
    });
    // Start with the stored history, but at a new index.
    this.commandHistory = this.storedCommandHistory();
    this.commandHistoryIndex = this.commandHistory.length;
    this.confirmedHistoryLength = this.commandHistory.length;
    this.updateHistoryAutorun = Tracker.autorun(computation => {
      var command;
      // React to command changes.
      if (!(command = this.command())) {
        return;
      }
      // Only ever update the command after confirmed commands.
      if (this.commandHistoryIndex < this.confirmedHistoryLength) {
        return;
      }
      return this.commandHistory[this.commandHistoryIndex] = command;
    });
    // Capture key events.
    $(document).on('keypress.commandInput', event => {
      return this.onKeyPress(event);
    });
    $(document).on('keydown.commandInput', event => {
      return this.onKeyDown(event);
    });
    if (LOI.debug) {
      console.log("Command input constructed.");
    }
    this.idle = new ReactiveField(true);
    this._resumeIdle = _.debounce(() => {
      return this.idle(true);
    }, 1000);
  }
  destroy() {
    if (LOI.debug) {
      console.log("Command input destroyed.");
    }
    // Remove key events.
    $(document).off('.commandInput');
    this.updateHistoryAutorun.stop();
    return this.persistHistoryAutorun.stop();
  }
  commandBeforeCaret() {
    return this.command().substring(0, this.caretPosition());
  }
  commandAfterCaret() {
    return this.command().substring(this.caretPosition());
  }
  clear() {
    this.command("");
    return this.caretPosition(0);
  }
  confirm(command) {
    var confirmedHistory;
    // Make sure the command to be stored into history matches what is in the command. 
    // It can be different if command is being set from hovering instead of typing.
    this.commandHistoryIndex = this.confirmedHistoryLength;
    this.commandHistory[this.commandHistoryIndex] = command;
    // Update store history.
    this.confirmedHistoryLength++;
    confirmedHistory = this.commandHistory.slice(0, this.confirmedHistoryLength);
    // Store only the last 10 commands.
    this.storedCommandHistory(confirmedHistory.slice(-10));
    // Start new history entry.
    this.commandHistoryIndex++;
    return this.clear();
  }
  replaceLastCommandInHistory(command) {
    var storedCommandHistory;
    command = _.toLower(command);
    this.commandHistory[this.commandHistory.length - 1] = command;
    storedCommandHistory = this.storedCommandHistory();
    storedCommandHistory[storedCommandHistory.length - 1] = command;
    return this.storedCommandHistory(storedCommandHistory);
  }
  addText(text) {
    var newCommand;
    newCommand = "".concat(this.commandBeforeCaret()).concat(text).concat(this.commandAfterCaret());
    this._updateCommand(newCommand);
    return this.caretPosition(this.caretPosition() + text.length);
  }
  _notIdle() {
    this.idle(false);
    return this._resumeIdle();
  }
  _interfaceBusy() {
    var busyConditions;
    // Don't process events when interface is not active (some other dialog
    // is blocking it) or when the interface itself is doing something else.
    busyConditions = [!this.options.interface.active(), this.options.interface.waitingKeypress(), this.options.interface.showDialogueSelection()];
    return _.some(busyConditions);
  }
  onKeyPress(event) {
    var addition, charCode, commandBeforeCaret, i, j, len, len1, newCommand, sayCommandPhrase, sayCommandPhrases;
    if (this._interfaceBusy()) {
      return;
    }
    // Ignore control characters.
    charCode = event.which;
    if (charCode <= AC.Keys.lastControlCharacter) {
      return;
    }
    // Ignore keyboard shortcuts.
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    addition = String.fromCharCode(charCode);
    // If space is pressed after the say command, auto-insert quotes.
    commandBeforeCaret = this.commandBeforeCaret();
    sayCommandPhrases = LOI.adventure.parser.vocabulary.getPhrases(LOI.Parser.Vocabulary.Keys.Verbs.Say);
    if (charCode === AC.Keys.space) {
      for (i = 0, len = sayCommandPhrases.length; i < len; i++) {
        sayCommandPhrase = sayCommandPhrases[i];
        if (commandBeforeCaret === sayCommandPhrase) {
          addition += '"';
          break;
        }
      }
    }
    // If quote is pressed directly after the say command, insert space in front of it.
    if (charCode === '"'.charCodeAt(0)) {
      for (j = 0, len1 = sayCommandPhrases.length; j < len1; j++) {
        sayCommandPhrase = sayCommandPhrases[j];
        if (commandBeforeCaret === sayCommandPhrase) {
          addition = " ".concat(addition);
          break;
        }
      }
    }
    // If the quote is pressed directly behind a quote, don't add it.
    if (addition === '"' && _.endsWith(commandBeforeCaret, '"')) {
      return;
    }
    newCommand = "".concat(commandBeforeCaret).concat(addition).concat(this.commandAfterCaret());
    this._updateCommand(newCommand);
    this.caretPosition(this.caretPosition() + addition.length);
    if (charCode === AC.Keys.space) {
      // Don't let space scroll.
      return false;
    }
  }
  _updateCommand(newCommand) {
    // Always update the new command.
    this.commandHistoryIndex = this.confirmedHistoryLength;
    this.command(newCommand);
    return this._notIdle();
  }
  onKeyDown(event) {
    var commandBeforeCaret, interfaceActive, keyCode, newCommand, ref, ref1;
    interfaceActive = this.options.interface.active();
    if (LOI.debug) {
      console.log("Command input detected a key down and is checking if interface is active:", interfaceActive);
    }
    // Don't capture events when interface is not active.
    if (!interfaceActive) {
      return;
    }
    keyCode = event.which;
    // We process some keys in any case.
    switch (keyCode) {
      case AC.Keys.enter:
        if ((ref = this.options) != null) {
          if (typeof ref.onEnter === "function") {
            ref.onEnter();
          }
        }
    }
    // History is processed only when no other part of the interface is active.
    if (!this._interfaceBusy()) {
      switch (keyCode) {
        case AC.Keys.backspace:
          event.preventDefault();
          commandBeforeCaret = this.commandBeforeCaret();
          if (!commandBeforeCaret.length) {
            return;
          }
          newCommand = "".concat(commandBeforeCaret.substring(0, commandBeforeCaret.length - 1)).concat(this.commandAfterCaret());
          this._updateCommand(newCommand);
          this.caretPosition(this.caretPosition() - 1);
          break;
        case AC.Keys.left:
          this.caretPosition(Math.max(0, this.caretPosition() - 1));
          this._notIdle();
          break;
        case AC.Keys.right:
          this.caretPosition(Math.min(this.command().length, this.caretPosition() + 1));
          this._notIdle();
          break;
        case AC.Keys.up:
          this._changeHistoryIndex(Math.max(0, this.commandHistoryIndex - 1));
          break;
        case AC.Keys.down:
          if (this.command().length) {
            // Don't allow to go further down than an empty string.
            this._changeHistoryIndex(this.commandHistoryIndex + 1);
          }
          break;
        case AC.Keys.v:
          if (event.metaKey || event.ctrlKey) {
            // This is a paste operation.
            this.options.interface.capturePaste(text => {
              return this.addText(text);
            });
          }
      }
    }
    // Trigger event for any key down.
    return (ref1 = this.options) != null ? typeof ref1.onKeyDown === "function" ? ref1.onKeyDown() : void 0 : void 0;
  }
  _changeHistoryIndex(newIndex) {
    var newCommand;
    if (this.commandHistoryIndex === newIndex) {
      return;
    }
    this.commandHistoryIndex = newIndex;
    newCommand = this.commandHistory[this.commandHistoryIndex] || "";
    this.command(newCommand);
    this.caretPosition(newCommand.length);
    return this._notIdle();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dialogueselection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/components/dialogueselection.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, Nodes;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
Nodes = LOI.Adventure.Script.Nodes;
LOI.Interface.Components.DialogueSelection = class DialogueSelection {
  constructor(options1) {
    this.options = options1;
    this.command = new ReactiveField("");
    this.selectedDialogueLine = new ReactiveField(null);
    this.selectedDialogueLineIndex = new ReactiveField(null);
    // Provide a list of options.
    this.choiceNode = new ComputedField(() => {
      var scriptNode;
      if (LOI.debug) {
        console.log("Dialog selection detected new script nodes.");
      }
      // Listen to current scripts until we find a choice node.
      if (LOI.adventure.currentLocation()) {
        scriptNode = LOI.adventure.director.foregroundScriptQueue.currentScriptNode();
        if (scriptNode instanceof Nodes.Choice) {
          return scriptNode;
        }
        if (scriptNode instanceof Nodes.ChoicePlaceholder) {
          return scriptNode;
        }
      }
      // No choice node was found, so also reset our selected node.
      this.selectedDialogueLine(null);
      this.selectedDialogueLineIndex(null);
      return null;
    });
    // Provide a list of dialog line options.
    this.dialogueLineOptions = new ComputedField(() => {
      var choiceNode, choiceNodes, i, len, result, results, scriptNode, selectIndex;
      scriptNode = this.choiceNode();
      if (!scriptNode) {
        return;
      }
      if (LOI.debug) {
        console.log("Dialog selection is generating dialog line options.", scriptNode);
      }
      choiceNodes = [];
      while (true) {
        // Let's see if we have another choice node.
        // Follow the next chain and collect choice nodes until you find a
        // non-choice node. Note that choice nodes can be wrapped in conditionals.
        if (scriptNode instanceof Nodes.Choice) {
          // Looks like we have a choice! Add it to our choices.
          choiceNodes.push(scriptNode);
        } else if (scriptNode instanceof Nodes.Conditional && scriptNode.node instanceof Nodes.Choice) {
          // We have a choice node inside a conditional, let's see if we should add it. We evaluate the
          // conditional, but we don't trigger reactive change to the state since we're doing this from a reactive
          // calculation itself (that might run many times). Thus dialog line conditionals are not a good place to put
          // state changes. We also don't run this in reactive context, because we don't want the selection to
          // recompute while we're showing it.
          result = Tracker.nonreactive(() => {
            return scriptNode.evaluate({
              triggerChange: false
            });
          });
          if (result) {
            // Add the embedded choice node to our list.
            choiceNodes.push(scriptNode.node);
          }
        } else if (scriptNode instanceof Nodes.ChoicePlaceholder) {
          // We have a choice placeholder. We need to update it so it will point its next node to any new nodes.
          scriptNode.update();
        } else {
          // We have gone over all the choice nodes in the line so we're done.
          break;
        }
        if (!(scriptNode = scriptNode.next)) {
          break;
        }
      }
      if (LOI.debug) {
        console.log("We have collected choice nodes", choiceNodes);
      }
      // Alright, we found all the choices. We select the choice at the
      // previous index to prevent selection changing on recomputations.
      selectIndex = _.clamp(this.selectedDialogueLineIndex() || 0, 0, choiceNodes.length - 1);
      this.selectedDialogueLine(choiceNodes[selectIndex].node);
      results = [];
      for (i = 0, len = choiceNodes.length; i < len; i++) {
        choiceNode = choiceNodes[i];
        // Return the embedded dialog nodes as the selection.
        results.push(choiceNode.node);
      }
      return results;
    });
    // Capture key events.
    $(document).on('keydown.dialogueSelection', event => {
      return this.onKeyDown(event);
    });

    // Use this to pause dialog selection handling.
    this.paused = new ReactiveField(false);
  }
  destroy() {
    // Remove key events.
    return $(document).off('.dialogueSelection');
  }
  selectDialogLineOption(option) {
    var index, options;
    options = this.dialogueLineOptions();
    index = _.indexOf(options, option);
    if (index < 0) {
      console.warn("Non-existent option tried to be selected.");
      return;
    }
    this.selectedDialogueLine(option);
    return this.selectedDialogueLineIndex(index);
  }
  confirm() {
    var selectedDialogueLine;
    selectedDialogueLine = this.selectedDialogueLine();
    if (!selectedDialogueLine) {
      return;
    }

    // Confirms the current selection and transitions the script from the choice to the selected dialog line.
    LOI.adventure.director.scriptTransition(this.choiceNode(), selectedDialogueLine);
    // Reset the selected index.
    return this.selectedDialogueLineIndex(null);
  }
  onKeyDown(event) {
    var ref;
    if (!(this.choiceNode() && !this.paused())) {
      return;
    }
    if (LOI.debug) {
      console.log("Key down is being processed in dialog selection.");
    }
    switch (event.which) {
      // Up
      case 38:
        event.preventDefault();
        return this._moveSelection(-1);

      // Down
      case 40:
        event.preventDefault();
        return this._moveSelection(1);
      // Enter
      case 13:
        return (ref = this.options) != null ? typeof ref.onEnter === "function" ? ref.onEnter() : void 0 : void 0;
    }
  }
  _moveSelection(offset) {
    var choices, index, newIndex;
    choices = this.dialogueLineOptions();
    index = _.indexOf(choices, this.selectedDialogueLine());
    newIndex = (index + offset + choices.length) % choices.length;
    this.selectedDialogueLine(choices[newIndex]);
    return this.selectedDialogueLineIndex(newIndex);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"audiomanager.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/components/audiomanager.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, LOI;
AE = Artificial.Everywhere;
AEc = Artificial.Echo;
AB = Artificial.Base;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Interface.Components.AudioManager = class AudioManager {
  constructor() {
    this.context = new ReactiveField(null);
    this.running = new ReactiveField(false);
    if (AB.ApplicationEnvironment.isBrowser) {
      // In the browser, we need to wait for user interaction before creating audio context.
      $(document).one('click', event => {
        return this._createContext();
      });
    } else {
      // Otherwise audio should be available from the start.
      this._createContext();
    }
    // Let others reactively know if audio is currently enabled.
    this.enabled = new ComputedField(() => {
      if (!this.context()) {
        return false;
      }
      switch (LOI.settings.audio.enabled.value()) {
        case LOI.Settings.Audio.Enabled.On:
          return true;
        case LOI.Settings.Audio.Enabled.Off:
          return false;
        case LOI.Settings.Audio.Enabled.Fullscreen:
          return AM.Window.isFullscreen();
      }
    });
    // Start and stop context based on enabled state.
    this._startStopAutorun = Tracker.autorun(computation => {
      var context, enabled;
      if (!(context = this.context())) {
        return;
      }
      enabled = this.enabled();
      if (context.state === 'suspended' && enabled) {
        return this._start();
      } else if (context.state === 'running' && !enabled) {
        return this._stop();
      }
    });
  }
  destroy() {
    return this._startStopAutorun.stop();
  }
  _createContext() {
    this.context(new AudioContext());
    return this.running(true);
  }
  async _start() {
    var context;
    if (!(context = this.context())) {
      return;
    }
    if (context.state !== 'suspended') {
      return;
    }
    if (this._resuming) {
      return;
    }
    this._resuming = true;
    await context.resume();
    this._resuming = false;
    return this.running(true);
  }
  async _stop() {
    var context;
    if (!(context = this.context())) {
      return;
    }
    if (context.state !== 'running') {
      return;
    }
    if (this._suspending) {
      return;
    }
    this._suspending = true;
    await context.suspend();
    this._suspending = false;
    return this.running(false);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"text":{"text.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/text.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, Vocabulary;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
Vocabulary = LOI.Parser.Vocabulary;
LOI.Interface.Text = function () {
  class Text extends LOI.Interface {
    world() {
      return LOI.adventure.world;
    }
    exitAvatarName() {
      var Back, backExit, exitAvatar, ref, ref1;
      exitAvatar = this.currentData();
      // Show the text for back instead of location name for that direction.
      Back = LOI.Parser.Vocabulary.Keys.Directions.Back;
      backExit = (ref = LOI.adventure.currentSituation()) != null ? ref.exits()[Back] : void 0;
      if (exitAvatar.thingClass.id() === (backExit != null ? backExit.id() : void 0)) {
        return (ref1 = this.parser.vocabulary.getPhrases(Back)) != null ? ref1[0] : void 0;
      }
      return exitAvatar.shortName();
    }
    things() {
      var hiddenThings, i, len, results, thing, things;
      if (!(things = LOI.adventure.currentLocationThings())) {
        return [];
      }
      // Remove any externally hidden things. We need to get instances in case classes were added to the array.
      hiddenThings = function () {
        var i, len, ref, results;
        ref = this.hiddenThings();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          thing = ref[i];
          results.push(LOI.adventure.getCurrentLocationThing(thing));
        }
        return results;
      }.call(this);
      things = _.difference(things, hiddenThings);
      results = [];
      for (i = 0, len = things.length; i < len; i++) {
        thing = things[i];
        if (thing.displayInLocation()) {
          results.push(thing);
        }
      }
      return results;
    }
    thingDescription() {
      var description, thing;
      // WARNING: The output of this function should be HTML escaped
      // since the results will be directly injected with triple braces.
      thing = this.currentData();
      // Look for a special description.
      description = thing.descriptiveName();
      // If that's not available, just use the full name formatted as a sentence.
      if (description == null) {
        description = "".concat(_.upperFirst(thing.fullName()), ".");
      }
      return this._formatOutput(description);
    }
    showCommandLine() {
      // Show command line unless we're displaying a dialog.
      return !this.showDialogueSelection();
    }
    showDialogueSelection() {
      var options;
      // Wait if we're paused.
      if (this.waitingKeypress()) {
        return;
      }
      // Show the dialog selection when we have some choices available.
      if (!(options = this.dialogueSelection.dialogueLineOptions())) {
        return;
      }
      // After the new choices are re-rendered, scroll down the narrative.
      Tracker.afterFlush(() => {
        return this.narrative.scroll();
      });
      return options;
    }
    activeDialogOptionClass() {
      var option;
      option = this.currentData();
      if (option === this.dialogueSelection.selectedDialogueLine()) {
        return 'active';
      }
    }
    showInventory() {
      return !this.inIntro() && this.inventoryItems().length;
    }
    showDescription(thing) {
      return this.narrative.addText(thing.description());
    }
    caretIdleClass() {
      if (this.commandInput.idle()) {
        return 'idle';
      }
    }
    waitingKeypress() {
      return this._pausedNode() || this.inIntro();
    }
    busy() {
      var busyConditions;
      busyConditions = [!LOI.adventure.interface.active(), LOI.adventure.interface.waitingKeypress(), LOI.adventure.interface.commandInput.command().length, LOI.adventure.interface.showDialogueSelection()];
      return _.some(busyConditions);
    }

    // Use to get back to the initial state with full location description.
    reset() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ref, ref1;
      if (options.resetIntroduction == null) {
        options.resetIntroduction = true;
      }
      // Clear the current context.
      LOI.adventure.exitContext();
      this._lastNode(null);
      this._pausedNode(null);
      if ((ref = this.narrative) != null) {
        ref.clear();
      }
      if (options.resetIntroduction) {
        if ((ref1 = this.location()) != null) {
          ref1.constructor.visited(false);
        }
        // Show intro again (scrolls to top as well).
        this.showIntro();
        this.initializeIntroductionFunction();
      }
      return Tracker.afterFlush(() => {
        return this.narrative.scroll();
      });
    }
    showIntro() {
      this.inIntro(true);
      // Scroll after intro has updated and other elements were hidden.
      return Tracker.afterFlush(() => {
        return this.narrative.scroll({
          animate: false
        });
      });
    }
    stopIntro() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ref;
      if (options.scroll == null) {
        options.scroll = true;
      }
      this.inIntro(false);
      // Mark location as visited after the intro of the location is done.
      if ((ref = this.location()) != null) {
        ref.state('visited', true);
      }
      return Tracker.afterFlush(() => {
        this.resize();
        if (options.scroll) {
          return this.scroll({
            position: this.maxScrollTop(),
            animate: true
          });
        }
      });
    }
    listeners() {
      return this.parser.listeners;
    }
    ready() {
      var avatar, conditions, exitAvatars, subscription;
      if (!(exitAvatars = this.exitAvatars())) {
        return;
      }
      conditions = _.flattenDeep([this.parser.ready(), function () {
        var i, len, results;
        results = [];
        for (i = 0, len = exitAvatars.length; i < len; i++) {
          avatar = exitAvatars[i];
          results.push(avatar.ready());
        }
        return results;
      }(), function () {
        var i, len, ref, results;
        ref = this._actionTranslationSubscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          subscription = ref[i];
          results.push(subscription.ready());
        }
        return results;
      }.call(this)]);
      return _.every(conditions);
    }
    commandBeforeCaret() {
      var commandBeforeCaret;
      // WARNING: The output of this function should be HTML escaped
      // since the results will be directly injected with triple braces.
      commandBeforeCaret = this.commandInput.commandBeforeCaret();
      return this._insertQuotedStringSpans(commandBeforeCaret);
    }
    commandAfterCaret() {
      var commandAfterCaret, commandBeforeCaret, hangingQuote, numberOfQuotesAfter, numberOfQuotesBefore;
      // WARNING: The output of this function should be HTML escaped
      // since the results will be directly injected with triple braces.
      commandBeforeCaret = this.commandInput.commandBeforeCaret();
      commandAfterCaret = this.commandInput.commandAfterCaret();
      // See if we have an odd number of quotes in the before part.
      numberOfQuotesBefore = _.sumBy(commandBeforeCaret, character => {
        if (character === '"') {
          return 1;
        } else {
          return 0;
        }
      });
      hangingQuote = numberOfQuotesBefore % 2;
      // Close the quotes if all together there are an odd number of quotes.
      numberOfQuotesAfter = _.sumBy(commandAfterCaret, character => {
        if (character === '"') {
          return 1;
        } else {
          return 0;
        }
      });
      if ((numberOfQuotesBefore + numberOfQuotesAfter) % 2) {
        commandAfterCaret += '"';
      }
      return this._insertQuotedStringSpans(commandAfterCaret, hangingQuote);
    }
    _insertQuotedStringSpans(string, hangingQuote) {
      var character, i, len, result;
      // NOTE: The output of this function is HTML escaped and can be used directly injected with triple braces.
      result = '';
      if (hangingQuote) {
        // Open span at the start since we need to return self-contained valid html.
        result += "<span class='quoted-string'>";
      }
      for (i = 0, len = string.length; i < len; i++) {
        character = string[i];
        if (character === '"') {
          if (hangingQuote) {
            // Close the hanging quote.
            result += "</span>&quot;";
          } else {
            // Open the quote span.
            result += "&quot;<span class='quoted-string'>";
          }
          hangingQuote = !hangingQuote;
        } else {
          result += AM.HtmlHelper.escapeText(character);
        }
      }
      if (hangingQuote) {
        // Close span at the end since we need to return self-contained valid html.
        result += "</span>";
      }
      return result;
    }
    capturePaste(handler) {
      this._pasteCaptureHandler = handler;
      this.$('.dummy-input').focus();
      // Remove it if it doesn't get immediately handled (for example, if dummy input was not focused).
      return Meteor.setTimeout(() => {
        return this._pasteCaptureHandler = null;
      }, 100);
    }
    events() {
      return super.events(...arguments).concat({
        'wheel': this.onWheel,
        'wheel .scrollable': this.onWheelScrollable,
        'mouseenter .command': this.onMouseEnterCommand,
        'mouseleave .command': this.onMouseLeaveCommand,
        'click .ui-area': this.onClickUIArea,
        'click .command': this.onClickCommand,
        'click .location': this.onClickLocation,
        'mouseenter .exits .exit .name': this.onMouseEnterExit,
        'mouseleave .exits .exit .name': this.onMouseLeaveExit,
        'click .exits .exit .name': this.onClickExit,
        'mouseenter .landsofillusions-interface-text': this.onMouseEnterTextInterface,
        'mouseleave .landsofillusions-interface-text': this.onMouseLeaveTextInterface,
        'input .dummy-input': this.onInputDummyInput,
        'mouseenter .dialog-selection .option': this.onMouseEnterDialogSelectionOption,
        'click .dialog-selection .option': this.onClickDialogSelectionOption
      });
    }
    onMouseEnterCommand(event) {
      return this.hoveredCommand($(event.target).attr('title'));
    }
    onMouseLeaveCommand(event) {
      return this.hoveredCommand(null);
    }
    onClickUIArea(event) {
      // When we're waiting for user interaction, clicking on the bottom UI part doubles for pressing enter.
      if (this.waitingKeypress()) {
        this.onCommandInputEnter();
        // Do not let others handle this event.
        return event.stopPropagation();
      }
    }
    onClickCommand(event) {
      if (this.waitingKeypress()) {
        return;
      }
      this._executeCommand(this.hoveredCommand());
      return this.hoveredCommand(null);
    }
    onClickLocation(event) {
      var characterId, cursorIntersectionPoints, situation, suggestedCommand, type;
      if (this.waitingKeypress()) {
        return;
      }
      // See if hovering pre-filled a command for us.
      if (suggestedCommand = this.suggestedCommand()) {
        this._executeCommand(suggestedCommand);
        return;
      }
      // No command was given. If we have a character and the click was inside the scene, we can move the character.
      if (!(characterId = LOI.characterId())) {
        return;
      }
      if (!(cursorIntersectionPoints = LOI.adventure.world.cursorIntersectionPoints())) {
        return;
      }
      if (!cursorIntersectionPoints.length) {
        return;
      }
      // Create move memory action.
      type = LOI.Memory.Actions.Move.type;
      situation = LOI.adventure.currentSituationParameters();
      return LOI.Memory.Action.do(type, characterId, situation, {
        coordinates: _.last(cursorIntersectionPoints).point.toObject()
      });
    }
    onMouseEnterExit(event) {
      var Back, backExit, command, exitAvatar;
      exitAvatar = this.currentData();
      // Show just "go back" instead of "go to back".
      Back = LOI.Parser.Vocabulary.Keys.Directions.Back;
      backExit = LOI.adventure.currentSituation().exits()[Back];
      if (exitAvatar.thingClass.id() === (backExit != null ? backExit.id() : void 0)) {
        command = "Go ".concat($(event.target).text());
      } else {
        command = "Go to ".concat($(event.target).text());
      }
      return this.hoveredCommand(command);
    }
    onMouseLeaveExit(event) {
      return this.hoveredCommand(null);
    }
    onClickExit(event) {
      if (this.waitingKeypress()) {
        return;
      }
      this._executeCommand(this.hoveredCommand());
      return this.hoveredCommand(null);
    }
    onMouseEnterTextInterface(event) {
      var $textInterface, cursorTimeFrame;
      // Make crosshair cursor animate.
      $textInterface = this.$('.landsofillusions-interface-text');
      cursorTimeFrame = 0;
      // Just to make sure, clear any leftover animations.
      Meteor.clearInterval(this._crossHairAnimation);
      // Start new animation.
      return this._crossHairAnimation = Meteor.setInterval(() => {
        var cursorFrame;
        // Advance cursor
        cursorTimeFrame++;
        if (cursorTimeFrame === 5) {
          cursorTimeFrame = 0;
        }
        if (cursorTimeFrame < 3) {
          cursorFrame = 1;
        }
        if (cursorTimeFrame === 3) {
          cursorFrame = 2;
        }
        if (cursorTimeFrame === 4) {
          cursorFrame = 3;
        }
        if (cursorFrame !== this._previousCursorFrame) {
          if ($textInterface != null) {
            $textInterface.addClass("cursor-frame-".concat(cursorFrame));
          }
          if ($textInterface != null) {
            $textInterface.removeClass("cursor-frame-".concat(this._previousCursorFrame));
          }
          return this._previousCursorFrame = cursorFrame;
        }
      }, 175);
    }
    onMouseLeaveTextInterface(event) {
      return Meteor.clearInterval(this._crossHairAnimation);
    }
    onInputDummyInput(event) {
      var $dummyInput, value;
      $dummyInput = $(event.target);
      value = $dummyInput.val();
      if (this._pasteCaptureHandler) {
        // Report the pasted text to the caller.
        this._pasteCaptureHandler(value);
        this._pasteCaptureHandler = null;
      }
      // Clear the content so we don't contaminate further pastes.
      return $dummyInput.val('');
    }
    onMouseEnterDialogSelectionOption(event) {
      var option;
      option = this.currentData();
      return this.dialogueSelection.selectDialogLineOption(option);
    }
    onClickDialogSelectionOption(event) {
      var option;
      option = this.currentData();
      this.dialogueSelection.selectDialogLineOption(option);
      return this.dialogueSelection.confirm();
    }
  }
  ;
  Text.register('LandsOfIllusions.Interface.Text');
  return Text;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.text.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/template.text.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Interface.Text");
Template["LandsOfIllusions.Interface.Text"] = new Template("Template.LandsOfIllusions.Interface.Text", (function() {
  var view = this;
  return [ HTML.STYLE("\n    html {\n      font-size: ", Blaze.View("lookup:display.scale", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("display"), "scale"));
  }), "px;\n    }\n  "), "\n  ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("display"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ", HTML.DIV({
    class: "landsofillusions-interface-text scrollable"
  }, "\n    ", HTML.DIV({
    class: "location"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("world"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("context"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("context"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      " ];
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("location"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      " ];
  }), HTML.Raw('\n      <div class="loading-cover">\n        <div class="caption">\n          Loading …\n        </div>\n      </div>\n    ')), "\n    ", HTML.DIV({
    class: "items"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("activeItems"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("."));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: "ui-area scrollable-content"
  }, HTML.Raw('\n      <div class="ui-background"></div>\n      '), HTML.DIV({
    class: "ui"
  }, "\n        ", HTML.DIV({
    class: "text-display scrollable"
  }, "\n          ", HTML.DIV({
    class: "text-display-content scrollable-content"
  }, "\n            ", HTML.DIV({
    class: "narrative"
  }, "\n              ", Blaze.If(function() {
    return Spacebars.call(view.lookup("introduction"));
  }, function() {
    return [ "\n                ", HTML.P({
      class: "introduction"
    }, Blaze.View("lookup:introduction", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("introduction")));
    })), "\n              " ];
  }), "\n              ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("inIntro"));
  }, function() {
    return [ "\n                ", HTML.P({
      class: "exits"
    }, Blaze._TemplateWith(function() {
      return "Possible exits are:";
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    }), "\n                  ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("exitAvatars"));
    }, function() {
      return [ "\n                    ", HTML.SPAN({
        class: "exit"
      }, HTML.SPAN({
        class: "name"
      }, Blaze.View("lookup:exitAvatarName", function() {
        return Spacebars.mustache(view.lookup("exitAvatarName"));
      }))), "\n                  " ];
    }, function() {
      return [ "\n                    ", HTML.SPAN({
        class: "exit"
      }, Blaze._TemplateWith(function() {
        return "None";
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      })), "\n                  " ];
    }), "\n                "), "\n                ", HTML.P({
      class: "things-sentence"
    }, Blaze._TemplateWith(function() {
      return "You see:";
    }, function() {
      return Spacebars.include(view.lookupTemplate("t10e"));
    })), "\n                ", HTML.UL({
      class: "things"
    }, "\n                  ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("things"));
    }, function() {
      return [ "\n                    ", HTML.LI({
        class: "thing"
      }, "\n                      ", Blaze.View("lookup:thingDescription", function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("thingDescription")));
      }), "\n                    "), "\n                  " ];
    }, function() {
      return [ "\n                    ", HTML.LI({
        class: "thing"
      }, Blaze._TemplateWith(function() {
        return "Nothing";
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      }), "."), "\n                  " ];
    }), "\n                "), "\n                ", Blaze.If(function() {
      return Spacebars.call(view.lookup("postscript"));
    }, function() {
      return [ "\n                  ", HTML.P({
        class: "postscript"
      }, Blaze.View("lookup:postscript", function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("postscript")));
      })), "\n                " ];
    }), "\n                ", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("narrative"), "lines"));
    }, function() {
      return [ "\n                  ", HTML.P({
        class: "narrative-line"
      }, Blaze.View("lookup:narrativeLine", function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("narrativeLine")));
      })), "\n                " ];
    }), "\n              " ];
  }), "\n            "), "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showCommandLine"));
  }, function() {
    return [ "\n              ", HTML.DIV({
      class: "command-line"
    }, "\n                ", Blaze.If(function() {
      return Spacebars.call(view.lookup("waitingKeypress"));
    }, function() {
      return HTML.Raw('\n                  … <span class="keypress-hint">Press enter to continue</span>\n                ');
    }, function() {
      return [ HTML.Raw("\n                  &gt;\n                  "), Blaze.If(function() {
        return Spacebars.call(view.lookup("suggestedCommand"));
      }, function() {
        return [ "\n                    ", Blaze.View("lookup:suggestedCommand", function() {
          return Spacebars.mustache(view.lookup("suggestedCommand"));
        }), "\n                  " ];
      }, function() {
        return [ "\n                    ", Blaze.View("lookup:commandBeforeCaret", function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("commandBeforeCaret")));
        }), HTML.SPAN({
          class: function() {
            return [ "caret ", Spacebars.mustache(view.lookup("caretIdleClass")) ];
          }
        }, "■"), Blaze.View("lookup:commandAfterCaret", function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("commandAfterCaret")));
        }), "\n                 " ];
      }), "\n                " ];
    }), HTML.Raw('\n                <input class="dummy-input" type="text">\n              ')), "\n            " ];
  }), "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showDialogueSelection"));
  }, function() {
    return [ "\n              ", HTML.DIV({
      class: "dialog-selection"
    }, "\n                ", HTML.UL({
      class: "options"
    }, "\n                  ", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("dialogueSelection"), "dialogueLineOptions"));
    }, function() {
      return [ "\n                    ", HTML.LI({
        class: function() {
          return [ "option ", Spacebars.mustache(view.lookup("activeDialogOptionClass")) ];
        }
      }, Blaze.View("lookup:dialogueSelectionLine", function() {
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("dialogueSelectionLine")));
      })), "\n                  " ];
    }), "\n                "), "\n              "), "\n            " ];
  }), "\n          "), "\n        "), "\n        ", HTML.DIV({
    class: "inventory scrollable"
  }, "\n          ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showInventory"));
  }, function() {
    return [ "\n            ", HTML.DIV({
      class: "inventory-content scrollable-content"
    }, "\n              ", HTML.P({
      class: "items-sentence"
    }, "\n                ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("currentCharacter"));
    }, function() {
      return [ "\n                  ", Blaze.View("lookup:avatar.fullName", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("avatar"), "fullName"));
      }), " ", Blaze._TemplateWith(function() {
        return "is carrying:";
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      }), "\n                " ];
    }, function() {
      return [ "\n                  ", Blaze._TemplateWith(function() {
        return "You are carrying:";
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      }), "\n                " ];
    }), "\n              "), "\n              ", HTML.UL({
      class: "items"
    }, "\n                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("inventoryItems"));
    }, function() {
      return [ "\n                  ", HTML.LI({
        class: "item"
      }, Blaze.View("lookup:fullName", function() {
        return Spacebars.mustache(view.lookup("fullName"));
      })), "\n                " ];
    }, function() {
      return [ "\n                  ", HTML.LI({
        class: "item"
      }, Blaze._TemplateWith(function() {
        return "Nothing";
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      })), "\n                " ];
    }), "\n              "), "\n            "), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"text-initialization.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/text-initialization.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Interface.Text = class Text extends LOI.Interface.Text {
  onCreated() {
    var actionType, actionTypes;
    super.onCreated(...arguments);
    if (LOI.debug) {
      console.log("Text interface is being created.");
    }
    // Create pixel scaling display.
    this.display = new AM.Display({
      safeAreaWidth: 320,
      safeAreaHeight: 240,
      maxDisplayWidth: 480,
      maxDisplayHeight: 640,
      minScale: LOI.settings.graphics.minimumScale.value,
      maxScale: LOI.settings.graphics.maximumScale.value,
      minAspectRatio: 1 / 2,
      maxAspectRatio: 2,
      debug: false
    });
    this.illustrationSize = new AE.Rectangle();
    this.narrative = new LOI.Interface.Components.Narrative({
      textInterface: this
    });
    this.commandInput = new LOI.Interface.Components.CommandInput({
      interface: this,
      onEnter: () => {
        return this.onCommandInputEnter();
      }
    });
    this.dialogueSelection = new LOI.Interface.Components.DialogueSelection({
      interface: this,
      onEnter: () => {
        return this.onDialogueSelectionEnter();
      }
    });
    this.hoveredCommand = new ReactiveField(null);
    this.suggestedCommand = new ComputedField(() => {
      var avatar, descriptiveName, hoveredCommand, match, target, thing;
      // If we're hovering a command in the narrative, show that.
      hoveredCommand = this.hoveredCommand();
      if (hoveredCommand) {
        return hoveredCommand;
      }
      // See if we're hovering an avatar in the world.
      if (!(avatar = LOI.adventure.world.avatarUnderCursor())) {
        return;
      }
      // See if the avatar belongs to a thing.
      thing = _.find(LOI.adventure.currentPhysicalThings(), thing => {
        return thing.avatar === avatar;
      });
      target = thing || avatar;
      // See if we have a descriptive name.
      if (descriptiveName = target.descriptiveName()) {
        // See if there is a command in the description.
        if (match = descriptiveName.match(/!\[(.*?)]\((.*?)\)/)) {
          // The second capture group contains the command.
          return match[2];
        }
      }
      // We couldn't get a full command so just write the avatar name.
      return target.fullName();
    });
    this.inIntro = new ReactiveField(false);
    this.uiInView = new ReactiveField(false);
    this.minimapSize = new ReactiveField(null);
    this.exitAvatars = new ComputedField(() => {
      var currentSituation, exit, exitId, ref, results;
      if (!(currentSituation = LOI.adventure.currentSituation())) {
        return;
      }
      ref = currentSituation.exitsById();
      results = [];
      for (exitId in ref) {
        exit = ref[exitId];
        results.push(LOI.adventure.getAvatar(exit));
      }
      return results;
    });
    // Allow to hide specific things from running scripts.
    this.hiddenThings = new ReactiveField([]);

    // Subscribe to all action translations.
    actionTypes = LOI.Memory.Action.getTypes();
    this._actionTranslationSubscriptions = function () {
      var i, len, results;
      results = [];
      for (i = 0, len = actionTypes.length; i < len; i++) {
        actionType = actionTypes[i];
        results.push(AB.subscribeNamespace(actionType));
      }
      return results;
    }();
    this.parser = new LOI.Parser();

    // Node handling must get initialized before handlers, since the latter depends on it.
    this.initializeNodeHandling();
    return this.initializeHandlers();
  }
  onRendered() {
    super.onRendered(...arguments);
    if (LOI.debug) {
      console.log("Rendering text interface.");
    }
    this.initializeScrolling();
    // Resize on viewport, fullscreen, and illustration changes.
    this._illustration = new ComputedField(() => {
      var ref;
      return (ref = LOI.adventure.currentSituation()) != null ? ref.illustration() : void 0;
    }, EJSON.equals);
    this.autorun(computation => {
      this.display.viewport();
      AM.Window.isFullscreen();
      this._illustration();
      return Tracker.afterFlush(() => {
        return this.resize();
      });
    });
    this.autorun(computation => {
      var hintDelayTime, lines, readTime, targetText;
      // Show the hint if the player needs to press enter.
      if (!this.waitingKeypress()) {
        return;
      }
      // Clear any previously set timeouts.
      Meteor.clearTimeout(this._keypressHintTimetout);
      // We need to manually add the hint visible class so that transition kicks in.

      // Hide hint if already present.
      this.$('.command-line .keypress-hint').removeClass('visible');
      // Show the hint after a delay, so that the player has time to read the text before they are prompted.
      lines = this.narrative.lines();
      if (lines.length) {
        targetText = _.last(lines);
      } else {
        targetText = this.introduction();
        // Wait some more if the introduction text hasn't been loaded yet.
        if (!targetText) {
          return;
        }
      }
      // Average reading time is about 1000 characters per minute, or 17 per second.
      readTime = targetText.length / 17;
      // We also add in a delay of 2s so we don't annoy the player.
      hintDelayTime = readTime + 2;
      return this._keypressHintTimetout = Meteor.setTimeout(() => {
        return this.$('.command-line .keypress-hint').addClass('visible');
      }, hintDelayTime * 1000);
    });
    // Prepare location loading cover.
    this.$locationLoadingCover = this.$('.location .loading-cover');
    this.$locationLoadingCover.css({
      height: '100%'
    });
    return this.$locationLoadingCaption = this.$locationLoadingCover.find('.caption');
  }
  onDestroyed() {
    var i, len, ref, results, subscription;
    super.onDestroyed(...arguments);
    if (LOI.debug) {
      console.log("Destroying text interface.");
    }
    this.commandInput.destroy();
    this.dialogueSelection.destroy();
    $(window).off('.landsofillusions-interface-text');
    // Clean up body height that was set from resizing.
    $('body').css({
      height: ''
    });
    // Clean up overflow hidden on html from scrolling wheel detection.
    $('html').css({
      overflow: ''
    });
    ref = this._actionTranslationSubscriptions;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      subscription = ref[i];
      results.push(subscription.stop());
    }
    return results;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"text-narrative.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/text-narrative.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Interface.Text = class Text extends LOI.Interface.Text {
  introduction() {
    var currentIntroductionFunction, fullName, introduction, location, situation;
    location = this.location();
    if (!location) {
      return;
    }
    if (currentIntroductionFunction = this._currentIntroductionFunction()) {
      if (introduction = currentIntroductionFunction()) {
        return this._formatOutput(introduction);
      }
    }
    if (location.constructor.visited() && !LOI.adventure.currentContext()) {
      fullName = location.avatar.fullName();
      if (!fullName) {
        return;
      }
      // We've already visited this location so simply return the full name.
      return "".concat(_.upperFirst(fullName), ".");
    } else {
      // It's the first time we're visiting this location in this session,
      // or we're in a context, so show the full description.
      situation = LOI.adventure.currentSituation();
      return this._formatOutput(situation.description.last());
    }
  }
  postscript() {
    var location, situation;
    location = this.location();
    if (!location) {
      return;
    }
    situation = LOI.adventure.currentSituation();
    return this._formatOutput(situation.postscript.last());
  }
  narrativeLine() {
    var lineText;
    // WARNING: The output of this function should be HTML escaped
    // since the results will be directly injected with triple braces.
    lineText = this.currentData();
    return this._formatOutput(lineText);
  }
  dialogueSelectionLine() {
    var dialogueLineOption, text;
    dialogueLineOption = this.currentData();
    text = this._evaluateLine(dialogueLineOption);
    return this._formatOutput(text);
  }
  _formatOutput(text) {
    var character, html, htmlPart, htmlParts, i, len, ref;
    // NOTE: The output of this function is HTML escaped and can be used directly injected with triple braces.
    if (!text) {
      return;
    }
    // We could have direct HTML in the text, so we need to collect it here, to replace it back instead of the escaped
    // versions. We have to trust that the provided HTML is already escaped and malicious free.
    htmlParts = text.match(/%%html.*?html%%/g);
    text = AM.HtmlHelper.escapeText(text);
    ref = htmlParts || [];
    // Replace back the html parts.
    for (i = 0, len = ref.length; i < len; i++) {
      htmlPart = ref[i];
      // Extract the html content with a capture group.
      html = htmlPart.match(/%%html(.*)html%%/)[1];
      // Because we don't use global match flag, replacements will happen one by one in order.
      text = text.replace(/%%html.*?html%%/, html);
    }
    // Create color spans.
    text = text.replace(/%%c(\d+)-([-\d]+)%(.*?)c%%/g, (match, hue, shade, text) => {
      var colorHexString, linkColor;
      hue = parseInt(hue);
      shade = parseInt(shade);
      colorHexString = LOI.Avatar.colorObject({
        hue,
        shade
      }).getHexString();
      // Link should be 2 shades lighter than the text.
      linkColor = LOI.Avatar.colorObject({
        hue: hue,
        shade: shade + 2
      });
      text = this._formatLinks(text, linkColor);
      return "<span style='color: #".concat(colorHexString, "' data-hue='").concat(hue, "' data-shade='").concat(shade, "'>").concat(text, "</span>");
    });
    // Create text transform spans.
    text = text.replace(/%%t([L|U])(.*?)t%%/g, (match, transformType, text) => {
      var transform;
      switch (transformType) {
        case 'L':
          transform = 'lowercase';
          break;
        case 'U':
          transform = 'uppercase';
      }
      return "<span style='text-transform: ".concat(transform, "'>").concat(text, "</span>");
    });
    // Extract commands from image notation.
    text = text.replace(/!\[(.*?)]\((.*?)\)/g, function (match, text, command) {
      if (!command.length) {
        command = text;
      }
      // Escape single quotes.
      command = command.replace(/'/g, '&#39;');
      return "<span class='command' title='".concat(command, "'>").concat(text, "<span class='underline'></span><span class='background'></span></span>");
    });
    // Replace character pronouns.
    if (character = LOI.character()) {
      text = LOI.Character.formatText(text, 'char', character);
    }
    Tracker.afterFlush(() => {
      var $command, colorHexString, colorParent, commands, element, hue, j, len1, results, shade;
      // Add colors to commands.
      commands = this.$('.narrative .command');
      if (!commands) {
        return;
      }
      results = [];
      for (j = 0, len1 = commands.length; j < len1; j++) {
        element = commands[j];
        $command = $(element);
        colorParent = $command.parent('*[data-hue]');
        if (colorParent.length) {
          hue = colorParent.data('hue');
          shade = colorParent.data('shade');
          colorHexString = LOI.Avatar.colorObject({
            hue: hue,
            shade: shade + 1
          }).getHexString();
          $command.css({
            color: "#".concat(colorHexString)
          });
          $command.find('.underline').css({
            borderBottomColor: "#".concat(colorHexString)
          });
          results.push($command.find('.background').css({
            backgroundColor: "#".concat(colorHexString)
          }));
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
    return text;
  }
  _formatLinks(escapedText, linkColor) {
    var formattedText, urlRegex;
    // Replace urls with links. The regex doesn't match links inside <a> tags.
    urlRegex = /(https?):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w#-;=?@^~]*[\w#-+\-\/-;=?@^~])?(?!(?:[^<]|<[^a])*\<\/\a\>)/g;
    formattedText = escapedText.replace(urlRegex, (url, protocol, domain, path) => {
      var styleTag, urlText;
      urlText = domain;
      if (path) {
        if (path.length > 10) {
          // Make sure the path is not longer than 10 characters.
          path = "/\u2026".concat(path.substring(path.length - 8));
        }
        // Add it to the domain.
        urlText = "".concat(urlText).concat(path);
      }
      styleTag = linkColor ? "style='color:#".concat(linkColor.getHexString(), ";'") : '';
      // We must unescape the URL that is used as the attribute.
      url = AM.HtmlHelper.unescapeText(url);
      return "<a href='".concat(url, "' target='_blank' ").concat(styleTag, ">").concat(urlText, "</a>");
    });
    return formattedText;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"text-handlers.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/text-handlers.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  AM,
  LOI,
  ref,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
ref = LOI.Interface.Text = class Text extends LOI.Interface.Text {
  constructor() {
    super(...arguments);
    this.prepareForLocationChange = this.prepareForLocationChange.bind(this);
    this._animateLoadingCover = this._animateLoadingCover.bind(this);
  }
  initializeHandlers() {
    // Listen for command input changes.
    this.autorun(computation => {
      this.commandInput.command();
      return this.onCommandInputChanged();
    });
    // Pause dialog selection when we're waiting for a key press ourselves.
    this.autorun(computation => {
      return this.dialogueSelection.paused(this.waitingKeypress());
    });
    return this._currentIntroductionFunction = new ReactiveField(null);
  }
  prepareForLocationChange(newLocation, complete) {
    boundMethodCheck(this, ref);
    return this._animateLoadingCover(100, complete);
  }
  _animateLoadingCover(heightPercentage, complete) {
    var illustrationHeight;
    boundMethodCheck(this, ref);
    illustrationHeight = this.illustrationSize.height();
    return this.$locationLoadingCover.velocity('stop').velocity({
      height: "".concat(heightPercentage, "%")
    }, {
      easing: 'easeInOutQuart',
      duration: Math.sqrt(illustrationHeight) * 40,
      complete: () => {
        return typeof complete === "function" ? complete() : void 0;
      }
    });
  }
  onLocationChanged() {
    var location;
    location = this.location();
    // Wait for narrative to be created and location to load.
    return this.autorun(computation => {
      if (!this.isCreated()) {
        return;
      }
      if (!location.ready()) {
        return;
      }
      computation.stop();
      // Initialize introduction function after location has changed and new listeners have been created.
      Tracker.nonreactive(() => {
        return this.initializeIntroductionFunction();
      });
      // If we've been here before, just start with a fresh narrative. This is the persistent visited, not the
      // per-session one, since we want to do the intro only when it's really the first time to see the location.
      if (location.state('visited')) {
        this.narrative.clear();
      } else {
        // We haven't been here yet, so completely reset the interface into intro mode.
        this.reset();
      }
      // We have cleared the interface so it can now start processing any scripts.
      this.locationChangeReady(true);
      // Wait one frame so that any script nodes are processed. Then we can
      // see if the interface is empty, or it is already paused on something.
      return Meteor.setTimeout(() => {
        if (!this.waitingKeypress()) {
          this.narrative.addText("What do you want to do?", {
            scrollStyle: LOI.Interface.Components.Narrative.ScrollStyle.None
          });
        }

        // All the texts have been loaded from the DB at this point.
        // Wait for all the reactivity to finish reflowing the page.
        return Meteor.setTimeout(() => {
          var scrollPosition;
          this.resize();
          // Set scroll position to reveal the top or the bottom of the UI.
          scrollPosition = location.constructor.visited() ? this.maxScrollTop() : 0;
          this.scroll({
            position: scrollPosition
          });
          // Show loading text if location loading takes too long.
          this._locationLoadingCaptionTimeout = Meteor.setTimeout(() => {
            return this.$locationLoadingCaption.css({
              display: 'block'
            }).addClass('visible');
          }, 1500);
          // Wait for location illustration to be ready.
          return Tracker.autorun(computation => {
            var ref1;
            if (!((ref1 = LOI.adventure.world.sceneManager()) != null ? ref1.sceneItemsReady() : void 0)) {
              return;
            }
            computation.stop();
            Meteor.clearTimeout(this._locationLoadingCaptionTimeout);
            this.$locationLoadingCaption.css({
              display: '无'
            }).removeClass('visible');
            return this._animateLoadingCover(0);
          });
        }, 0);
      }, 0);
    });
  }
  initializeIntroductionFunction() {
    // Wait for new enter responses.
    return Tracker.autorun(computation => {
      var i, introductionFunction, len, responseResults, result, results;
      if (!(responseResults = LOI.adventure.locationOnEnterResponseResults())) {
        return;
      }
      computation.stop();

      // Set the new introduction function, if it was set by any of the listeners.
      this._currentIntroductionFunction(null);
      results = [];
      for (i = 0, len = responseResults.length; i < len; i++) {
        result = responseResults[i];
        introductionFunction = result.enterResponse.introductionFunction();
        if (introductionFunction) {
          this._currentIntroductionFunction(introductionFunction);
          // Force user to read the custom introduction.
          results.push(this.showIntro());
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  }
  onCommandInputEnter() {
    var pausedLineNode;
    // Stop intro on enter.
    if (this.inIntro()) {
      this.stopIntro();
      return;
    }
    // After intro is stopped, enter resumes dialogs.
    if (pausedLineNode = this._pausedNode()) {
      // Clear the paused node and handle it. Use the force flag since the node has already been marked as handled.
      this._pausedNode(null);
      this._handleNode(pausedLineNode, {
        force: true
      });
      // Clear the command input in case it accumulated any text in the mean time.
      this.commandInput.clear();
      return;
    }
    // At this point, enter confirms the command that has been entered.
    this._executeCommand(this.hoveredCommand() || this.commandInput.command().trim());
    // Scroll to bottom on enter.
    return this.narrative.scroll();
  }
  _executeCommand(command) {
    var numberOfQuotes;
    if (!(command != null ? command.length : void 0)) {
      return;
    }
    // Add closing quote if needed.
    numberOfQuotes = _.sumBy(command, character => {
      if (character === '"') {
        return 1;
      } else {
        return 0;
      }
    });
    if (numberOfQuotes % 2) {
      command += '"';
    }
    this.narrative.addText("> ".concat(command.toUpperCase()));
    this.parser.parse(command);
    return this.commandInput.confirm(command);
  }
  onCommandInputChanged() {
    // Scroll to bottom to reveal new command.
    return this.narrative.scroll();
  }
  onDialogueSelectionEnter() {
    // Continue with the selection.
    return this.dialogueSelection.confirm();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"text-nodehandling.coffee":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/text-nodehandling.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
!function (module1) {
  var AE, AM, LOI, Nodes;
  AE = Artificial.Everywhere;
  AM = Artificial.Mirage;
  LOI = LandsOfIllusions;
  Nodes = LOI.Adventure.Script.Nodes;
  LOI.Interface.Text = class Text extends LOI.Interface.Text {
    initializeNodeHandling() {
      this._lastNode = new ReactiveField(null);
      this._pausedNode = new ReactiveField(null);
      // Reset last node when we're showing the dialog selection or taking command input.
      return this.autorun(computation => {
        if (this.showCommandLine() && !this.waitingKeypress()) {
          // A bit of a hack, but because waiting for keypress might kick back in after the other nodes are reactively
          // processed, we just wait a little bit and see if the conditions are still the same after the wait.
          return Meteor.setTimeout(() => {
            if (this.showCommandLine() && !this.waitingKeypress()) {
              return this._lastNode(null);
            }
          }, 1);
        }
      });
    }
    _waitForNode(node) {
      var lastNode;
      // If we're still displaying something, we shouldn't
      // immediately display the node, but instead wait for a key press.
      lastNode = this._lastNode();
      if (lastNode) {
        this._lastNode(null);
        // Wait for player's command to continue.
        this._pausedNode(node);
        // Return true to indicate not to handle this node yet.
        return true;
      } else {
        // We don't have a previous node (or it was cleared to continue), so no need to wait. Return false.
        return false;
      }
    }
    _nodeDisplayed(node) {
      this._lastNode(node);
      // Remove last node after the scripts have had the chance to advance.
      return Tracker.afterFlush(() => {
        return this._lastNode(null);
      });
    }
    _handleNode(node) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Text interface doesn't narrate background actions when the interface is busy, but it does execute animations.
      if (options.background && this.busy() && !(node instanceof Nodes.Animation)) {
        if (options.realtime) {
          // Realtime nodes silently continue.
          node.end();
        } else {
          // Background scripts get interrupted completely.
          node.cancel();
        }
        return;
      }
      super._handleNode(...arguments);
      // Realtime nodes don't need any extra handling.
      if (options.realtime) {
        return;
      }
      if (node instanceof Nodes.Choice || node instanceof Nodes.ChoicePlaceholder) {
        // We don't really have to handle choice node, because the dialog selection
        // module does that, but we still want to pause before we display it.
        this._waitForNode(node);
      }
      if (node instanceof Nodes.Pause) {
        return this._handlePause(node);
      }
    }
    _handlePause(pause) {
      // Just force a wait before going on.
      if (pause._activated) {
        pause._activated = false;
        return pause.end();
      } else {
        pause._activated = true;
        this._lastNode(null);
        return this._pausedNode(pause);
      }
    }
    _handleDialogueLine(dialogueLine, options) {
      var actorName, dialogueColor, end, start, text;
      if (!options.background && this._waitForNode(dialogueLine)) {
        return;
      }
      if (dialogueLine.command) {
        // This is a command to the interface. Add it to the narrative as if it was a typed command and finish.
        text = this._evaluateLine(dialogueLine);
        this.narrative.addText("> ".concat(text.toUpperCase()));
        dialogueLine.end();
        return;
      }
      if (!dialogueLine.actor) {
        // There is no actor, which means the player is saying this. Add it to the narrative as a command in quotes and finish.
        text = this._evaluateLine(dialogueLine);
        this.narrative.addText("> \"".concat(text.toUpperCase(), "\""));
        dialogueLine.end();
        return;
      }
      // If the actor is a string, we consider it as a straight-up name.
      if (_.isString(dialogueLine.actor)) {
        start = '';
        end = '';
      } else {
        // We have an actor that is saying this.
        dialogueColor = dialogueLine.actor.color();
        // Add a new paragraph to the narrative
        start = "%%c".concat(dialogueColor.hue, "-").concat(dialogueColor.shade, "%");
        end = 'c%%';
        // Add text transformation.
        switch (dialogueLine.actor.dialogTextTransform()) {
          case LOI.Avatar.DialogTextTransform.Lowercase:
            start = "%%tL".concat(start);
            end = "t%%".concat(end);
            break;
          case LOI.Avatar.DialogTextTransform.Uppercase:
            start = "%%tU".concat(start);
            end = "t%%".concat(end);
        }
      }
      text = this._evaluateLine(dialogueLine);
      // Add the intro line at the start.
      if (!this._inMultilineDialog) {
        if (_.isString(dialogueLine.actor)) {
          actorName = dialogueLine.actor;
        } else if (dialogueLine.actor.dialogueDeliveryType() === LOI.Avatar.DialogueDeliveryType.Saying) {
          actorName = dialogueLine.actor.shortName();
          if (dialogueLine.actor.nameNounType() === LOI.Avatar.NameNounType.Common) {
            // Capitalize common nouns.
            actorName = _.upperFirst(actorName);
          }
        }
        if (actorName) {
          start = "".concat(actorName, " says: ").concat(start, "\"");
        }
      }
      if (dialogueLine.next instanceof Nodes.DialogueLine && dialogueLine.next.actor === dialogueLine.actor) {
        // Next line is by the same actor.
        this._inMultilineDialog = true;
      } else {
        this._inMultilineDialog = false;
        // Add the closing quote at the end.
        if (_.isString(dialogueLine.actor) || dialogueLine.actor.dialogueDeliveryType() === LOI.Avatar.DialogueDeliveryType.Saying) {
          end = "\"".concat(end);
        }
      }
      // Present the text to the player.
      this.narrative.addText("".concat(start).concat(text).concat(end), options);
      if (!dialogueLine.immediate) {
        // This is a line node so set that we displayed it, unless we request immediate continuation without pause.
        this._nodeDisplayed(dialogueLine);
      }
      if (options.background) {
        return this._endAfterTextDelay(text, dialogueLine);
      } else {
        return dialogueLine.end();
      }
    }
    _handleNarrativeLine(narrativeLine, options) {
      var text;
      if (!options.background && this._waitForNode(narrativeLine)) {
        return;
      }
      // Simply output the line to the narrative.
      text = this._evaluateLine(narrativeLine);
      options.scrollStyle = narrativeLine.scrollStyle;
      this.narrative.addText(text, options);
      // This is a line node so set that we displayed it.
      this._nodeDisplayed(narrativeLine);
      if (options.background) {
        return this._endAfterTextDelay(text, narrativeLine);
      } else {
        return narrativeLine.end();
      }
    }
    _handleInterfaceLine(interfaceLine) {
      var text;
      if (this._waitForNode(interfaceLine)) {
        return;
      }
      // If the interface line is a silent one, it doesn't appear in the narrative.
      if (!interfaceLine.silent) {
        // Simply output the line to the narrative.
        text = this._evaluateLine(interfaceLine);
        this.narrative.addText(text);
      }
      // Interface nodes don't stop the narrative and just end.
      return interfaceLine.end();
    }
    _handleCommandLine(commandLine) {
      if (this._waitForNode(commandLine)) {
        return;
      }
      // If the command should replace the last command, we delete the previous lines.
      if (commandLine.replaceLastCommand) {
        this.narrative.removeLastCommand();
        // Also replace the command in the command input history.
        this.commandInput.replaceLastCommandInHistory(commandLine.line);
      }
      // If the command line is a silent one, it doesn't appear in the narrative.
      if (!commandLine.silent) {
        // We act as if the user entered this as a command.
        this.narrative.addText("> ".concat(_.toUpper(commandLine.line)));
      }
      // Command nodes don't stop the narrative and just end.
      return commandLine.end();
    }
    _evaluateLine(lineNode) {
      return lineNode.line.replace(/`(.*?)`/g, function (codeSection) {
        var codeNode, expression;
        expression = codeSection.match(/`(.*?)`/)[1];
        if (LOI.debug) {
          console.log("Evaluating embedded expression", expression, "from line", lineNode);
        }
        // Create a code node to evaluate the expression.
        codeNode = new LOI.Adventure.Script.Nodes.Code({
          expression: expression
        });
        codeNode.script = lineNode.script;
        // Evaluate the expression, but we don't allow (or at least react to) state changes within the expression.
        return codeNode.evaluate({
          triggerChange: false
        });
      });
    }
    _endAfterTextDelay(text, node) {
      var delay;
      // We assume reading at ~14 characters/second and include a 3 second buffer.
      delay = 3000 + text.length * 70;
      return Meteor.setTimeout(() => {
        return node.end();
      }, delay);
    }
  };
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"text-resizing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/text-resizing.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Interface.Text = class Text extends LOI.Interface.Text {
  resize() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var $textInterface, $ui, $uiBackground, fillUIHeight, gridSpacing, inventorySize, lineHeight, locationSize, neededUIHeight, ref, scale, sideMargin, sidebarWidth, situation, textDisplaySize, totalContentHeight, totalWidth, uiBackgroundSize, uiHeight, uiSize, uiWidth, viewport;
    if (!(situation = LOI.adventure.currentSituation())) {
      return;
    }
    viewport = this.display.viewport();
    scale = this.display.scale();
    gridSpacing = 8 * scale;
    sideMargin = gridSpacing;
    lineHeight = gridSpacing;
    // Illustration size is given in display pixels (rem units).
    this.illustrationSize.width(viewport.viewportBounds.width() / scale);
    this.illustrationSize.height(((ref = situation.illustration()) != null ? ref.height : void 0) || 0);
    $textInterface = $('.landsofillusions-adventure .landsofillusions-interface-text');
    $ui = $textInterface.find('.ui');
    $uiBackground = $textInterface.find('.ui-background');
    // Resize location. Here we use window pixels (px units).
    locationSize = new AE.Rectangle({
      x: viewport.viewportBounds.x(),
      y: viewport.viewportBounds.y(),
      width: viewport.viewportBounds.width(),
      height: this.illustrationSize.height() * scale
    });
    $textInterface.find('.location').eq(0).css(locationSize.toDimensions());
    // Resize user interface. We make sure the UI has at least the side margin, but make the inner content align with
    // location illustration if possible. We do that by seeing if we have empty room left/right from the viewport.
    totalWidth = viewport.viewportBounds.width() + viewport.viewportBounds.x() * 2;
    // The UI content would be aligned if it's bigger, since that'll be compensated by the margin.
    uiWidth = viewport.viewportBounds.width() + 2 * sideMargin;
    // However, make sure that it fits in the window (total width).
    uiWidth = Math.min(uiWidth, totalWidth);
    // For UI height, we fill the rest of the viewport that the location isn't using it.
    fillUIHeight = viewport.viewportBounds.height() - locationSize.height() - lineHeight;
    // Make sure that UI fills at least half the screen, if it needs to.
    totalContentHeight = $textInterface.find('.text-display-content').height();
    neededUIHeight = Math.min(totalContentHeight, viewport.viewportBounds.height() / 2);
    uiHeight = Math.max(neededUIHeight, fillUIHeight);
    // Make it a multiple of line height.
    uiHeight = Math.floor(uiHeight / lineHeight) * lineHeight;
    if (uiHeight < totalContentHeight) {
      // If not all content has been accommodated, remove a pixel since it otherwise bleeds at the top.
      uiHeight -= 1;
    }
    uiSize = new AE.Rectangle({
      x: viewport.viewportBounds.x() + viewport.viewportBounds.width() / 2 - uiWidth / 2,
      y: locationSize.bottom() + lineHeight,
      width: uiWidth,
      height: uiHeight
    });
    // Put double the side margin gap between text display and interface and side margin
    // on the outside (total 4 times the side margin). After that split them 70:30.
    textDisplaySize = new AE.Rectangle({
      x: sideMargin,
      y: 0,
      width: (uiWidth - 4 * sideMargin) * 0.7,
      height: uiHeight
    });
    sidebarWidth = (uiWidth - 4 * sideMargin) * 0.3;
    inventorySize = new AE.Rectangle({
      x: textDisplaySize.right() + 2 * sideMargin,
      y: 0,
      width: sidebarWidth,
      height: uiHeight
    });
    // Calculate minimap size for use by the Map item. It's relative to the viewport, not the UI.
    this.minimapSize(new AE.Rectangle({
      x: inventorySize.left() + uiSize.x(),
      y: viewport.viewportBounds.height() - sidebarWidth - 2 * lineHeight,
      width: sidebarWidth,
      height: sidebarWidth
    }));
    // Apply UI dimensions.
    $ui.css(uiSize.toDimensions());
    // Background adds an extra line border around the UI
    uiBackgroundSize = AE.Rectangle.extrude(uiSize, lineHeight);
    $uiBackground.css(uiBackgroundSize.toDimensions());
    $ui.find('.text-display').css(textDisplaySize.toDimensions()).height('100%');
    $ui.find('.text-display-content').width(textDisplaySize.width());
    $ui.find('.inventory').css(inventorySize.toDimensions()).height('100%');
    $ui.find('.inventory-content').width(inventorySize.width());
    // Set total interface height so that scrolling can use it in its calculations.
    $textInterface.find('.ui-area').add('body').height(uiSize.bottom());
    // Let the text interface handle its scrolling areas.
    return this.clampScrollableAreas();
  }
  animateElement(options) {
    var name, ref, value;
    if (options.duration == null) {
      options.duration = 150;
    }
    if (options.animate == null) {
      options.animate = true;
    }
    if (options.easing == null) {
      options.easing = 'ease-out';
    }
    // Cancel any previous animation.
    options.$element.velocity('stop');
    if (options.animate) {
      return options.$element.velocity(options.properties, {
        duration: options.duration,
        easing: options.easing,
        complete: options.complete,
        progress: options.progress
      });
    } else {
      ref = options.properties;
      for (name in ref) {
        value = ref[name];
        $.Velocity.hook(options.$element, name, value);
      }
      return typeof options.complete === "function" ? options.complete() : void 0;
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"text-scrolling.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/interface/text/text-scrolling.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Interface.Text = class Text extends LOI.Interface.Text {
  initializeScrolling() {
    // We try to detect scrolling with the wheel so that we can hide scroll bars (for example, when not on mobile).
    this.wheelDetected = false;
    this.$textInterface = $('.landsofillusions-interface-text');
    this.textInterfaceElement = this.$textInterface[0];
    this.$window = $(window);
    this.$uiArea = $('.ui-area');
    this.$ui = this.$textInterface.find('.ui');
    // Listen to scroll events so that we can sync transform-based scrolling to it.
    this.$window.on('scroll.landsofillusions-interface-text', () => {
      var scrollTop;
      if (this.wheelDetected) {
        return;
      }
      if (!this.active()) {
        return;
      }
      scrollTop = this.$window.scrollTop();
      return $.Velocity.hook(this.$uiArea, 'translateY', "".concat(-scrollTop, "px"));
    });
    // HACK: For some reason, we need at least around 200ms delay in changing the main slider, otherwise, even if we
    // pass in the correct position, the window just scrolls to 0. Could it have something to do with animateElement
    // routine that animates things in 150ms?
    return this.matchScrollbar = _.debounce(position => {
      return this.$window.scrollTop(position);
    }, 200);
  }

  // The current full height of the text interface (non-reactive).
  height() {
    return this.$uiArea.height();
  }

  // The position in the UI at which we've scrolled to the bottom of the UI.
  maxScrollTop() {
    var containerHeight;
    containerHeight = this.$textInterface.height();
    return Math.max(0, this.height() - containerHeight);
  }

  // Returns the current scroll position of the text interface.
  scrollTop() {
    return -parseInt($.Velocity.hook(this.$uiArea, 'translateY') || 0);
  }
  isNarrativeScrolledToBottom() {
    var $scrollable, $scrollableContent, amountHidden, top;
    $scrollable = this.$('.text-display');
    $scrollableContent = $scrollable.find('.scrollable-content').eq(0);
    amountHidden = Math.max(0, $scrollableContent.height() - $scrollable.height());
    top = parseInt($.Velocity.hook($scrollableContent, 'translateY') || 0);
    // We're at the bottom if the amount hidden is all above the top.
    return amountHidden === -top;
  }

  // Scroll the UI to put the position at the top of the viewport.
  scroll(options) {
    var currentTop, newTop;
    if (options.animate == null) {
      options.animate = false;
    }
    currentTop = -this.scrollTop();
    newTop = -options.position;
    if (options.duration == null) {
      options.duration = _.clamp(Math.abs(currentTop - newTop), 150, 700);
    }
    this.animateElement({
      $element: this.$uiArea,
      animate: options.animate,
      duration: options.duration,
      easing: options.easing,
      properties: {
        translateY: "".concat(newTop, "px"),
        tween: [newTop, currentTop]
      },
      progress: (elements, complete, remaining, start, tweenValue) => {
        if (tweenValue != null) {
          return this.onScroll(-tweenValue);
        }
      }
    });

    // If we're not animating, progress won't be called so handle scrollTop here.
    if (!options.animate) {
      return this.onScroll(options.position);
    }
  }
  onScroll(position) {
    var context, narrativeTop, ref, viewportBottom;
    // Let the world and location or context know we're scrolling 
    // so that they can do any super-smooth scrolling animations.
    LOI.adventure.world.onScroll(this.scrollTop());
    if (context = LOI.adventure.currentContext()) {
      if (typeof context.onScroll === "function") {
        context.onScroll(this.scrollTop());
      }
    } else {
      if ((ref = LOI.adventure.currentLocation()) != null) {
        if (typeof ref.onScroll === "function") {
          ref.onScroll();
        }
      }
    }
    if (!this.wheelDetected) {
      // Also scroll the main slider.
      this.matchScrollbar(position);
    }
    // See if narrative is in view.
    if (this.locationChangeReady()) {
      viewportBottom = this.scrollTop() + this.$window.height();
      narrativeTop = this.$ui.position().top;
      return this.uiInView(narrativeTop < viewportBottom);
    }
  }
  onWheel(event) {
    this.onWheelEvent();
    if (!this.active()) {
      return;
    }
    // If scrolling is locked to a container, don't let the native browser slider scroll.
    if (this._scrollLockTarget && this._scrollLockTarget !== event.currentTarget) {
      return event.preventDefault();
    }
  }
  onWheelScrollable(event) {
    var $scrollable, $scrollableContent, amountHidden, delta, newTop, top;
    this.onWheelEvent();
    if (!this.active()) {
      return;
    }
    $scrollable = $(event.currentTarget);
    // If scrolling is locked to a container, only continue if it's locked on us.
    if (this._scrollLockTarget && this._scrollLockTarget !== $scrollable[0]) {
      return;
    }
    $scrollableContent = $scrollable.find('.scrollable-content').eq(0);
    delta = event.originalEvent.deltaY;
    top = parseInt($.Velocity.hook($scrollableContent, 'translateY') || 0);
    newTop = top - delta;

    // Limit scrolling to the amount of content.
    amountHidden = Math.max(0, $scrollableContent.height() - $scrollable.height());
    newTop = _.clamp(newTop, -amountHidden, 0);
    // See if we need to do anything at all.
    if (newTop === top) {
      // If we scrolled to the bottom, immediately stop scroll lock. This makes scroll lock only work when scrolling up.
      if (newTop === -amountHidden) {
        this._scrollLockTarget = null;
      }
      return;
    }
    // We've scrolled in this container so lock scrolling to it.
    this._scrollLockTarget = $scrollable[0];
    event.preventDefault();
    if (this._unlockScrollAfterAWhile == null) {
      this._unlockScrollAfterAWhile = _.debounce(() => {
        return this._scrollLockTarget = null;
      }, 1000);
    }
    this._unlockScrollAfterAWhile();
    $.Velocity.hook($scrollableContent, 'translateY', "".concat(newTop, "px"));
    // When scrolling the main text LOI.adventure also trigger onScroll.
    if (event.currentTarget === this.textInterfaceElement) {
      return this.onScroll(-newTop);
    }
  }
  onWheelEvent() {
    if (this.wheelDetected) {
      return;
    }
    this.wheelDetected = true;
    // Disable non-wheel scrolling.
    return $('html').css({
      overflow: 'hidden'
    });
  }
  clampScrollableAreas() {
    // Clamp scrollable areas to content size.
    return this.$('.scrollable').each((index, element) => {
      var $scrollable, $scrollableContent, amountHidden, newTop, top;
      $scrollable = $(element);
      $scrollableContent = $scrollable.find('.scrollable-content').eq(0);
      top = parseInt($.Velocity.hook($scrollableContent, 'translateY') || 0);
      amountHidden = Math.max(0, $scrollableContent.height() - $scrollable.height());
      newTop = _.clamp(top, -amountHidden, 0);
      $.Velocity.hook($scrollableContent, 'translateY', "".concat(newTop, "px"));
      // When scrolling the main text LOI.adventure also trigger onScroll.
      if (element === this.textInterfaceElement) {
        return this.onScroll(-newTop);
      }
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"components":{"overlay":{"overlay.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/overlay/overlay.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.Overlay = function () {
  class Overlay extends AM.Component {
    onCreated() {
      super.onCreated(...arguments);
      this.active = new ReactiveField(false);
      return $('body').addClass('overlay-disable-scrolling');
    }
    onRendered() {
      var activatableParent;
      super.onRendered(...arguments);
      this._cropBarHeight = 0;
      // Reactively resize elements.
      this.autorun(computation => {
        return this.onResize();
      });
      // See if we're inside of a component with activatable state - if yes, we can listen to know when to deactivate.
      activatableParent = this.ancestorComponentWith('activatedState');
      if (activatableParent) {
        this.autorun(computation => {
          var activatedState;
          activatedState = activatableParent.callFirstWith(null, 'activatedState');
          switch (activatedState) {
            case LOI.Adventure.Item.ActivatedStates.Activating:
              return this.onActivating();
            case LOI.Adventure.Item.ActivatedStates.Deactivating:
              return this.onDeactivating();
            case LOI.Adventure.Item.ActivatedStates.Deactivated:
              return this.onDeactivated();
          }
        });
      }
      return this.onActivating();
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return $('body').removeClass('overlay-disable-scrolling');
    }
    onActivating() {
      this._cropBarHeight = 0;
      this.onResize({
        force: true
      });
      // Show transition cover.
      this.$('.transition-cover').addClass('visible');
      // Fade in.
      this.$('.landsofillusions-components-overlay').addClass('visible');
      Meteor.setTimeout(() => {
        return this.onActivated();
      }, 600);
      this.$('.crop-bar').height(0);
      return this.$('.crop-bar').velocity({
        height: [this._cropBarHeight, 0]
      }, {
        duration: 200,
        easing: 'easeOutQuint'
      });
    }
    onActivated() {
      if (!this.isRendered()) {
        return;
      }
      // Hide transition cover.
      this.$('.transition-cover').removeClass('visible');
      return this.active(true);
    }
    onDeactivating() {
      this.active(false);
      // Animate out.
      this.$('.landsofillusions-components-overlay').removeClass('visible');
      this.$('.transition-cover').addClass('visible');
      return this.$('.crop-bar').velocity({
        height: 0
      }, {
        duration: 200,
        delay: 300,
        easing: 'easeInQuint'
      });
    }
    onDeactivated() {
      var ref;
      // Hide transition cover.
      return (ref = this.$('.transition-cover')) != null ? ref.removeClass('visible') : void 0;
    }
    onResize(options) {
      var display, gapHeight, maxAreaSize, maxBoundsHeight, maxOverlayHeight, ref, safeAreaSize, scale, viewport, viewportAreaSize;
      // Don't resize during animations. The function will re-run when active changes at the end.
      if (!(this.active() || (options != null ? options.force : void 0))) {
        return;
      }
      // We allow use outside of adventure as well, in which case we just find the parent that holds the display.
      display = ((ref = LOI.adventure) != null ? ref.interface.display : void 0) || this.callAncestorWith('display');
      scale = display.scale();
      viewport = display.viewport();
      // Background can be at most 360px * scale high. Crop bars need to fill the rest when overlay is active.
      maxOverlayHeight = display.safeAreaHeight() * 1.5 * scale;
      maxBoundsHeight = viewport.maxBounds.height();
      gapHeight = (maxBoundsHeight - maxOverlayHeight) / 2;
      this._cropBarHeight = Math.max(0, viewport.maxBounds.top() + gapHeight);
      safeAreaSize = viewport.safeArea.toDimensions();
      safeAreaSize.left += viewport.viewportBounds.left();
      safeAreaSize.top += viewport.viewportBounds.top();
      this.$('.crop-bar').height(this._cropBarHeight);
      this.$('.landsofillusions-components-overlay > .safe-area').css(safeAreaSize);
      // Inside the background the template in the else block can add
      // .max-area .viewport-area and .safe-area divs for us to position.
      viewportAreaSize = viewport.viewportBounds.toDimensions();
      maxAreaSize = viewport.maxBounds.toDimensions();
      viewportAreaSize.top = Math.max(viewportAreaSize.top, this._cropBarHeight);
      viewportAreaSize.height = Math.min(viewportAreaSize.height, maxOverlayHeight);
      maxAreaSize.height = maxOverlayHeight;
      maxAreaSize.top = viewportAreaSize.top + (viewportAreaSize.height - maxAreaSize.height) * 0.5;
      this.$('.background .viewport-area').css(viewportAreaSize);
      this.$('.background .max-area').css(maxAreaSize);
      this.$('.background .safe-area').css(safeAreaSize);
      // Safe area content is not positioned absolutely so that it can grow container's content.
      // We use margins instead of positions to place it.
      this.$('.background .safe-area-content').css({
        marginLeft: safeAreaSize.left,
        marginTop: safeAreaSize.top,
        width: safeAreaSize.width,
        minHeight: safeAreaSize.height
      });
      // If the safe area appears inside the viewport area, we make it relative to the viewport.
      safeAreaSize.top -= viewportAreaSize.top;
      this.$('.background .viewport-area .safe-area').css({
        top: safeAreaSize.top
      });
      return this.$('.background .viewport-area .safe-area-content').css({
        marginTop: safeAreaSize.top
      });
    }
  }
  ;
  Overlay.register('LandsOfIllusions.Components.Overlay');
  return Overlay;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.overlay.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/overlay/template.overlay.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Overlay");
Template["LandsOfIllusions.Components.Overlay"] = new Template("Template.LandsOfIllusions.Components.Overlay", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-overlay"
  }, HTML.Raw('\n    <div class="transition-cover visible"></div>\n    <div class="top-crop-bar crop-bar"></div>\n    <div class="bottom-crop-bar crop-bar"></div>\n    '), HTML.DIV({
    class: "background"
  }, "\n      ", Blaze._InOuterTemplateScope(view, function() {
    return Spacebars.include(function() {
      return Spacebars.call(view.templateElseBlock);
    });
  }), "\n    "), "\n    ", HTML.DIV({
    class: "safe-area"
  }, "\n      ", Blaze._InOuterTemplateScope(view, function() {
    return Spacebars.include(function() {
      return Spacebars.call(view.templateContentBlock);
    });
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"backbutton":{"backbutton.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/backbutton/backbutton.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AC = Artificial.Control;
LOI = LandsOfIllusions;
LOI.Components.BackButton = function () {
  class BackButton extends AM.Component {
    constructor(onCloseCallback) {
      super(...arguments);
      this.onCloseCallback = onCloseCallback;
      this.closing = new ReactiveField(false);
    }
    onRendered() {
      var location, overlaid;
      super.onRendered(...arguments);
      this.$backButton = this.$('.landsofillusions-components-back-button');
      // Positioning depends on whether this is inside an overlaid (2nd layer) item or not (1st layer).
      overlaid = this.$backButton.closest('.overlaid').length;
      // Button inside location is already in the context of the safe area.
      location = this.$backButton.closest('.location').length;
      // Resize elements.
      this.autorun(computation => {
        var display, ref, scale, viewport;
        // We allow use outside of adventure as well, in which case we just find the parent that holds the display.
        display = ((ref = LOI.adventure) != null ? ref.interface.display : void 0) || this.callAncestorWith('display');
        scale = display.scale();
        viewport = display.viewport();
        if (overlaid) {
          // Place back button inside viewport bounds.
          return this.$backButton.css({
            top: viewport.safeArea.top(),
            left: viewport.safeArea.left()
          });
        } else if (location) {
          return this.$backButton.css({
            top: 10 * scale,
            left: 10 * scale
          });
        } else {
          return this.$backButton.css({
            top: viewport.viewportBounds.top() + 10 * scale,
            left: viewport.viewportBounds.left() + 10 * scale
          });
        }
      });

      // Handle the escape key, but allow for multiple instances of the
      // back button, so we need to selectively add/remove our event handler.
      this._onKeyDownHandler = event => {
        if (event.which !== AC.Keys.escape) {
          return;
        }
        if (typeof PixelArtAcademy !== "undefined" && PixelArtAcademy !== null) {
          PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.state('backButtonShortcutUsed', true);
        }
        return this.onClose(event);
      };
      this._onContextMenu = event => {
        this.onClose(event);
        return event.preventDefault();
      };
      $(document).on('keydown.landsofillusions-components-backbutton', null, this._onKeyDownHandler);
      return this.autorun(computation => {
        if (LOI.settings.controls.rightClick.value() === LOI.Settings.Controls.RightClick.BackButton) {
          return $(document).on('contextmenu.landsofillusions-components-backbutton', null, this._onContextMenu);
        } else {
          return $(document).off('contextmenu.landsofillusions-components-backbutton', null, this._onContextMenu);
        }
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      $(document).off('keydown.landsofillusions-components-backbutton', null, this._onKeyDownHandler);
      return $(document).off('contextmenu.landsofillusions-components-backbutton', null, this._onContextMenu);
    }
    closingClass() {
      if (this.closing()) {
        return 'closing';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .landsofillusions-components-back-button': this.onClick
      });
    }
    onClick(event) {
      return this.onClose(event);
    }
    onClose(event) {
      var deactivatableParent, result;
      if (this.onCloseCallback) {
        result = this.onCloseCallback(event);
        if (!(result != null ? result.cancel : void 0)) {
          return this.closing(true);
        }
      } else {
        this.closing(true);
        // By default the back button deactivates the component it appears in.
        deactivatableParent = this.ancestorComponentWith('deactivate');
        // If the component is also the main active item, deactivate it at the adventure level (which changes the url).
        // We allow used outside of adventure interface so we check for presence of adventure first.
        if (LOI.adventure && LOI.adventure.activeItemId() === (typeof deactivatableParent.id === "function" ? deactivatableParent.id() : void 0)) {
          return LOI.adventure.deactivateActiveItem();
        } else {
          return deactivatableParent != null ? deactivatableParent.callFirstWith(null, 'deactivate') : void 0;
        }
      }
    }
  }
  ;
  BackButton.register('LandsOfIllusions.Components.BackButton');
  return BackButton;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.backbutton.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/backbutton/template.backbutton.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.BackButton");
Template["LandsOfIllusions.Components.BackButton"] = new Template("Template.LandsOfIllusions.Components.BackButton", (function() {
  var view = this;
  return HTML.BUTTON({
    class: function() {
      return [ "landsofillusions-components-back-button ", Spacebars.mustache(view.lookup("closingClass")) ];
    }
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"signin":{"signin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/signin/signin.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.SignIn = function () {
  class SignIn extends AM.Component {
    static url() {
      return 'signin';
    }
    static version() {
      return '0.0.2';
    }
    constructor(options) {
      super(...arguments);
      this.options = options;
      this.activatable = new LOI.Components.Mixins.Activatable();
    }
    mixins() {
      return [this.activatable];
    }
    onCreated() {
      super.onCreated(...arguments);
      this.loginButtonsSession = Accounts._loginButtonsSession;
      // Keep login buttons always visible (we need to override its default dropdown behavior).
      return this.autorun(computation => {
        var dropdownVisible;
        dropdownVisible = this.loginButtonsSession.get('dropdownVisible');
        if (dropdownVisible) {
          return;
        }
        return this.loginButtonsSession.set('dropdownVisible', true);
      });
    }
    inChangePasswordFlow() {
      return this.loginButtonsSession.get('inChangePasswordFlow');
    }
    inMessageOnlyFlow() {
      return this.loginButtonsSession.get('inMessageOnlyFlow');
    }
    message() {
      return this.loginButtonsSession.get('infoMessage') || this.loginButtonsSession.get('errorMessage');
    }
    messageClass() {
      if (this.loginButtonsSession.get('infoMessage')) {
        return 'info';
      }
      if (this.loginButtonsSession.get('errorMessage')) {
        return 'error';
      }
    }
    onActivate(finishedActivatingCallback) {
      return Meteor.setTimeout(() => {
        return finishedActivatingCallback();
      }, 500);
    }
    onDeactivate(finishedDeactivatingCallback) {
      return Meteor.setTimeout(() => {
        return finishedDeactivatingCallback();
      }, 500);
    }
  }
  ;
  SignIn.register('LandsOfIllusions.Components.SignIn');
  return SignIn;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.signin.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/signin/template.signin.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.SignIn");
Template["LandsOfIllusions.Components.SignIn"] = new Template("Template.LandsOfIllusions.Components.SignIn", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("deactivated"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "landsofillusions-components-signin"
    }, "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
    }), "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
    }, function() {
      return [ "\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("currentUser"));
      }, function() {
        return [ "\n          ", Blaze.If(function() {
          return Spacebars.call(view.lookup("inMessageOnlyFlow"));
        }, function() {
          return [ "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n          " ];
        }, function() {
          return [ "\n            ", Blaze.If(function() {
            return Spacebars.call(view.lookup("inChangePasswordFlow"));
          }, function() {
            return [ "\n              ", Spacebars.include(view.lookupTemplate("_loginButtonsChangePassword")), "\n            " ];
          }), "\n          " ];
        }), "\n        " ];
      }, function() {
        return [ "\n          ", HTML.DIV({
          class: "title"
        }, Blaze._TemplateWith(function() {
          return "Choose your ID";
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        })), "\n          ", HTML.DIV({
          class: "wallet"
        }, "\n            ", HTML.IMG({
          class: "wallet-layer layer-0",
          src: function() {
            return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/signin/layer0.png");
          }
        }), "\n            ", HTML.IMG({
          class: "wallet-layer layer-1",
          src: function() {
            return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/signin/layer1.png");
          }
        }), "\n            ", HTML.IMG({
          class: "wallet-layer layer-2",
          src: function() {
            return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/signin/layer2.png");
          }
        }), "\n            ", HTML.IMG({
          class: "wallet-layer layer-3",
          src: function() {
            return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/signin/layer3.png");
          }
        }), "\n            ", HTML.IMG({
          class: "wallet-layer layer-4",
          src: function() {
            return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/signin/layer4.png");
          }
        }), "\n            ", HTML.IMG({
          class: "wallet-layer layer-5",
          src: function() {
            return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/signin/layer5.png");
          }
        }), "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n          "), "\n          ", HTML.DIV({
          class: "footer"
        }, "\n            ", Blaze.If(function() {
          return Spacebars.call(view.lookup("message"));
        }, function() {
          return [ "\n              ", HTML.SPAN({
            class: function() {
              return Spacebars.mustache(view.lookup("messageClass"));
            }
          }, "\n                ", Blaze.View("lookup:message", function() {
            return Spacebars.mustache(view.lookup("message"));
          }), ".\n              "), "\n            " ];
        }, function() {
          return [ "\n              By using this website you agree to the\n              ", HTML.A({
            href: function() {
              return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.LandingPage.Pages.Smallprint");
            },
            target: "_blank"
          }, "terms of service"), HTML.Raw(".<br>\n              We have an open-access data policy. Any content you create\n              while using the website will be publicly visible to other users.\n            ") ];
        }), "\n          "), "\n        " ];
      }), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"savegame":{"savegame.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/savegame/savegame.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AEc, AM, LOI, Persistence;
AB = Artificial.Babel;
AC = Artificial.Control;
AEc = Artificial.Echo;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
Persistence = Artificial.Mummification.Document.Persistence;
LOI.Components.SaveGame = function () {
  class SaveGame extends LOI.Component {
    static id() {
      return 'LandsOfIllusions.Components.SaveGame';
    }
    static url() {
      return 'savegame';
    }
    static version() {
      return '0.0.1';
    }
    constructor(options) {
      super(...arguments);
      this.options = options;
      this.activatable = new LOI.Components.Mixins.Activatable();
    }
    mixins() {
      return super.mixins(...arguments).concat(this.activatable);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.newSaveGameName = new ReactiveField(null);
      return this.savingActive = new ReactiveField(false);
    }
    show() {
      this.newSaveGameName(null);
      return LOI.adventure.showActivatableModalDialog({
        dialog: this,
        dontRender: true
      });
    }
    async onActivate(finishedActivatingCallback) {
      await _.waitForSeconds(0.5);
      return finishedActivatingCallback();
    }
    async onDeactivate(finishedDeactivatingCallback) {
      await _.waitForSeconds(0.5);
      this.savingActive(false);
      return finishedDeactivatingCallback();
    }
    saveGame() {
      return LOI.adventure.saveGame();
    }
    saveButtonVisibleClass() {
      if (this.newSaveGameName()) {
        return 'visible';
      }
    }
    savingActiveClass() {
      if (this.savingActive()) {
        return 'saving-active';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .save-button': this.onClickSaveButton
      });
    }
    async onClickSaveButton(event) {
      var profileId;
      this.audio.save(true);
      this.savingActive(true);
      this.saveGame();
      // Wait for animation of the floppy.
      await _.waitForSeconds(0.5);
      profileId = await LOI.adventure.profileId.waitForValue();
      Persistence.Profile.documents.update(profileId, {
        $set: this._createProfileFields()
      });
      return LOI.adventure.showDialogMessage("Your game will be automatically saving to this disk.", () => {
        this.audio.save(false);
        return this.callFirstWith(null, 'deactivate');
      });
    }
    _createProfileFields() {
      return {
        displayName: this.newSaveGameName(),
        lastEditTime: new Date()
      };
    }
  }
  ;
  SaveGame.register(SaveGame.id());
  SaveGame.initializeDataComponent();
  SaveGame.Audio = new LOI.Assets.Audio.Namespace(SaveGame.id(), {
    variables: {
      save: AEc.ValueTypes.Boolean
    }
  });

  // Components
  SaveGame.NewSaveGameName = function () {
    class NewSaveGameName extends SaveGame.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.TextArea;
        this.propertyName = 'newSaveGameName';
      }
      onRendered() {
        super.onRendered(...arguments);
        return this.$('textarea').focus();
      }
      placeholder() {
        return "Enter name";
      }
      customAttributes() {
        return {
          maxlength: 12 * 3
        };
      }
    }
    ;
    NewSaveGameName.register('LandsOfIllusions.Components.SaveGame.NewSaveGameName');
    return NewSaveGameName;
  }.call(this);
  return SaveGame;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.savegame.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/savegame/template.savegame.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.SaveGame");
Template["LandsOfIllusions.Components.SaveGame"] = new Template("Template.LandsOfIllusions.Components.SaveGame", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("deactivated"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "landsofillusions-components-savegame landsofillusions-components-savesystem"
    }, "\n      ", Blaze.Unless(function() {
      return Spacebars.call(view.lookup("savingActive"));
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
      }), "\n      " ];
    }), "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
    }, function() {
      return [ HTML.Raw('\n        <div class="title">Create a new save game</div>\n        '), HTML.DIV({
        class: "new-save-game"
      }, "\n          ", HTML.DIV({
        class: function() {
          return [ "floppy ", Spacebars.mustache(view.lookup("savingActiveClass")) ];
        }
      }, HTML.Raw('\n            <div class="shutter"></div>\n            '), HTML.DIV({
        class: "label"
      }, Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "SaveGame", "NewSaveGameName"));
      })), "\n          "), "\n        "), "\n        ", HTML.DIV({
        class: "controls"
      }, "\n          ", HTML.BUTTON({
        class: function() {
          return [ "save-button action-button ", Spacebars.mustache(view.lookup("saveButtonVisibleClass")) ];
        }
      }, "Save"), "\n        "), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"loadgame":{"loadgame.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/loadgame/loadgame.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AEc, AM, LOI, Persistence, profileWidth;
AB = Artificial.Babel;
AC = Artificial.Control;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
Persistence = Artificial.Mummification.Document.Persistence;
profileWidth = 80;
LOI.Components.LoadGame = function () {
  class LoadGame extends LOI.Component {
    static id() {
      return 'LandsOfIllusions.Components.LoadGame';
    }
    static url() {
      return 'loadgame';
    }
    static version() {
      return '0.0.1';
    }
    constructor(options) {
      super(...arguments);
      this.options = options;
      this.activatable = new LOI.Components.Mixins.Activatable();
      this.editEnabled = new ReactiveField(false);
      this.componentVisible = new ReactiveField(false);
      this.loadingVisible = new ReactiveField(false);
      this.loadingTextVisible = new ReactiveField(false);
      this.loadingProfileId = new ReactiveField(null);
      this.editingProfileId = new ReactiveField(null);
      this.autoLoadedProfileId = new ReactiveField(null);
      this.showProfileLoadingPercentage = new ReactiveField(false);

      // Which profile is shown left-most. Allows to scroll through options.
      this.firstProfileOffset = new ReactiveField(0);
    }
    mixins() {
      return super.mixins(...arguments).concat(this.activatable);
    }
    onCreated() {
      super.onCreated(...arguments);
      this.profiles = new ComputedField(() => {
        return Persistence.Profile.documents.fetch({
          syncedStorages: {
            $ne: {}
          }
        });
      });
      this.maxFirstProfileOffset = new ComputedField(() => {
        return this.profiles().length - 4;
      });

      // Adjust profile offset if it falls out of bounds.
      return this.autorun(computation => {
        var maxFirstProfileOffset;
        maxFirstProfileOffset = this.maxFirstProfileOffset();
        if (!(this.firstProfileOffset() > maxFirstProfileOffset)) {
          return;
        }
        return this.firstProfileOffset(maxFirstProfileOffset);
      });
    }
    show(autoLoadProfileId) {
      let componentVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.autoLoadedProfileId(autoLoadProfileId);
      this.componentVisible(componentVisible);
      this.firstProfileOffset(0);
      if (autoLoadProfileId) {
        LOI.adventure.addModalDialog({
          dialog: this,
          dontRender: true
        });

        // Wait for the dialog to be rendered before you activate it.
        Tracker.afterFlush(() => {
          if (this.isCreated()) {
            // In web apps, adventure and its UI is never created/rendered so don't try to activate it in that case.
            return this.activatable.activate();
          }
        });
        return new Promise((resolve, reject) => {
          return Tracker.autorun(computation => {
            // Wait until persistence is ready so we have the profiles loaded.
            if (!Persistence.ready()) {
              return;
            }
            computation.stop();
            if (Persistence.Profile.documents.findOne(autoLoadProfileId)) {
              return this.loadProfile(autoLoadProfileId, false, componentVisible).then(() => {
                LOI.adventure.removeModalDialog(this);
                return resolve();
              });
            } else {
              if (LOI.debug || LOI.Adventure.debugState) {
                console.log("Desired profile was not provided by any of the synced storages.");
              }
              LOI.adventure.removeModalDialog(this);
              if (this.isCreated()) {
                this.activatable.deactivate();
              }
              return reject();
            }
          });
        });
      } else {
        return LOI.adventure.showActivatableModalDialog({
          dialog: this,
          dontRender: true
        });
      }
    }
    async loadProfile(profileId) {
      let animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      let componentVisible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var loadPan, loadPromise;
      this.loadingProfileId(profileId);
      this.showProfileLoadingPercentage(false);
      loadPan = animate ? AEc.getPanForElement(this.$("[data-id=".concat(profileId, "]"))[0]) : 0;
      this.audio.loadPan(loadPan);
      this.audio.load(true);
      if (animate) {
        await _.waitForSeconds(0.5);
      }
      this.loadingVisible(true);
      if (animate) {
        await _.waitForSeconds(0.5);
      }
      this.loadingTextVisible(true);
      loadPromise = LOI.adventure.loadGame(profileId).catch(error => {
        if (LOI.adventure.loadingStoredProfile()) {
          LOI.adventure.showDialogMessage("Unfortunately, the last active save game was not able to be automatically loaded.\nThe game will now restart from the menu, but if the problem persists,\nthis info could be useful: ".concat(error.reason), () => {
            return this.activatable.deactivate();
          });
        } else {
          LOI.adventure.showDialogMessage("Unfortunately, the disk seems to be corrupt. It's almost certainly my fault, I'll need to fix this!\nBackup of your save should have been created so it should be possible to recover some of your progress.\nLet me know and I'll help. This info could also be useful: ".concat(error.reason));
        }
        this.loadingVisible(false);
        this.loadingTextVisible(false);
        this.loadingProfileId(null);
        return this.audio.load(false);
      });
      if (componentVisible) {
        // Now that the profile has started loading, see if you should show the loading
        // percentage if it seems the game will load for more than half a second.
        await _.waitForSeconds(0.5);
      }
      this.showProfileLoadingPercentage(Persistence.profileLoadingPercentage() < 100);
      if (componentVisible && LOI.adventure.audioManager.enabled()) {
        // When the audio is on, make loading last a while to hear the sweet floppy drive sounds.
        await _.waitForSeconds(2);
      }
      await loadPromise;
      this.loadingProfileId(null);
      this.audio.load(false);
      this.loadingTextVisible(false);
      if (LOI.adventure.profileId()) {
        return this.activatable.deactivate();
      }
    }
    async onActivate(finishedActivatingCallback) {
      await _.waitForSeconds(0.5);
      return finishedActivatingCallback();
    }
    async onDeactivate(finishedDeactivatingCallback) {
      await _.waitForSeconds(0.5);
      this.loadingVisible(false);
      return finishedDeactivatingCallback();
    }
    visibleClass() {
      if (this.componentVisible()) {
        return 'visible';
      }
    }
    editEnabledClass() {
      if (this.editEnabled()) {
        return 'edit-enabled';
      }
    }
    showBackButton() {
      return !(this.loadingVisible() || this.autoLoadedProfileId());
    }
    backButtonCallback() {
      return () => {
        if (this.editEnabled()) {
          this.editingProfileId(null);
          this.editEnabled(false);
          return {
            // Inform that we've handled the back button.
            cancel: true
          };
        } else {
          return this.activatable.deactivate();
        }
      };
    }
    profilesStyle() {
      var offset;
      offset = this.firstProfileOffset();
      return {
        left: "-".concat(offset * profileWidth, "rem")
      };
    }
    nextButtonDisabledAttribute() {
      if (this.firstProfileOffset() === this.maxFirstProfileOffset()) {
        return {
          disabled: true
        };
      }
    }
    previousButtonDisabledAttribute() {
      if (this.firstProfileOffset() === 0) {
        return {
          disabled: true
        };
      }
    }
    nextButtonVisibleClass() {
      if (this.maxFirstProfileOffset() > 0) {
        return 'visible';
      }
    }
    previousButtonVisibleClass() {
      if (this.maxFirstProfileOffset() > 0) {
        return 'visible';
      }
    }
    editButtonVisibleClass() {
      if (this.profiles().length) {
        return 'visible';
      }
    }
    profileActiveClass() {
      var profile;
      profile = this.currentData();
      if (this.editEnabled()) {
        if (this.editingProfileId() === profile._id) {
          return 'active';
        }
      } else {
        if (this.loadingProfileId() === profile._id || LOI.adventure.profileId() === profile._id) {
          return 'active';
        }
      }
    }
    progressOverlayVisibleClass() {
      if (this.loadingProfileId()) {
        return 'visible';
      }
    }
    loadingVisibleClass() {
      if (this.loadingVisible()) {
        return 'visible';
      }
    }
    loadingTextVisibleClass() {
      if (this.loadingTextVisible()) {
        return 'visible';
      }
    }
    profileLoadingPercentage() {
      return Math.floor(Persistence.profileLoadingPercentage());
    }
    events() {
      return super.events(...arguments).concat({
        'click .profile': this.onClickProfile,
        'click .previous-button': this.onClickPreviousButton,
        'click .next-button': this.onClickNextButton,
        'click .edit-button': this.onClickEditButton,
        'click .remove-button': this.onClickRemoveButton
      });
    }
    onClickProfile(event) {
      var profile;
      profile = this.currentData();
      if (this.editEnabled()) {
        return this.editingProfileId(profile._id);
      } else {
        return this.loadProfile(profile._id);
      }
    }
    onClickPreviousButton(event) {
      var newIndex;
      newIndex = Math.max(0, this.firstProfileOffset() - 4);
      return this.firstProfileOffset(newIndex);
    }
    onClickNextButton(event) {
      var newIndex;
      newIndex = Math.min(this.maxFirstProfileOffset(), this.firstProfileOffset() + 4);
      return this.firstProfileOffset(newIndex);
    }
    onClickEditButton(event) {
      return this.editEnabled(!this.editEnabled());
    }
    onClickRemoveButton(event) {
      var dialog, profile, profileName;
      profile = Persistence.Profile.documents.findOne(this.editingProfileId());
      profileName = profile.displayName || profile._id;
      dialog = new LOI.Components.Dialog({
        message: "Do you really want to remove the ".concat(profileName, " save game?"),
        buttons: [{
          text: "Remove",
          value: true
        }, {
          text: "Cancel"
        }]
      });
      return LOI.adventure.showActivatableModalDialog({
        dialog: dialog,
        callback: () => {
          if (!dialog.result) {
            return;
          }
          Persistence.removeProfile(profile._id);
          return this.editingProfileId(null);
        }
      });
    }
  }
  ;
  LoadGame.register(LoadGame.id());
  LoadGame.Audio = new LOI.Assets.Audio.Namespace(LoadGame.id(), {
    variables: {
      load: AEc.ValueTypes.Boolean,
      loadPan: AEc.ValueTypes.Number
    }
  });

  // Components
  LoadGame.SaveGameName = function () {
    class SaveGameName extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.TextArea;
        this.realtime = false;
        this.placeholder = "Enter name";
        this.customAttributes = {
          maxlength: 12 * 3
        };
      }
      load() {
        var profile;
        profile = this.currentData();
        return profile.displayName || profile._id;
      }
      save(value) {
        var profile;
        profile = this.currentData();
        return Persistence.renameProfile(profile._id, value);
      }
    }
    ;
    SaveGameName.register('LandsOfIllusions.Components.LoadGame.SaveGameName');
    return SaveGameName;
  }.call(this);
  return LoadGame;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.loadgame.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/loadgame/template.loadgame.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.LoadGame");
Template["LandsOfIllusions.Components.LoadGame"] = new Template("Template.LandsOfIllusions.Components.LoadGame", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("deactivated"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: function() {
        return [ "landsofillusions-components-loadgame landsofillusions-components-savesystem ", Spacebars.mustache(view.lookup("editEnabledClass")), " ", Spacebars.mustache(view.lookup("visibleClass")) ];
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
          return "\n              Choose a save game to edit\n            ";
        }, function() {
          return "\n              Choose a save game to load\n            ";
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
            return HTML.Raw('\n                <button class="remove-button action-button">Remove</button>\n              ');
          }), "\n            " ];
        }, function() {
          return [ "\n              ", HTML.BUTTON({
            class: function() {
              return [ "edit-button action-button ", Spacebars.mustache(view.lookup("editButtonVisibleClass")) ];
            }
          }, "Edit"), "\n            " ];
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
          return [ "loading progres ", Spacebars.mustache(view.lookup("loadingVisibleClass")) ];
        }
      }, "\n            ", HTML.DIV({
        class: function() {
          return [ "loading-text progress-text ", Spacebars.mustache(view.lookup("loadingTextVisibleClass")) ];
        }
      }, "\n              Loading …\n              ", Blaze.If(function() {
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

}},"storylinetitle":{"storylinetitle.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/storylinetitle/storylinetitle.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AC = Artificial.Control;
LOI = LandsOfIllusions;
LOI.Components.StorylineTitle = function () {
  class StorylineTitle extends AM.Component {
    static version() {
      return '0.0.1';
    }
    constructor(options) {
      super(...arguments);
      this.options = options;
      this.activatable = new LOI.Components.Mixins.Activatable();
    }
    mixins() {
      return [this.activatable];
    }
    onActivate(finishedActivatingCallback) {
      var base;
      if (typeof (base = this.options).onActivate === "function") {
        base.onActivate();
      }
      return Meteor.setTimeout(() => {
        var base1;
        // unless this is a to-be-continued title, let the chapter title end.
        if (!this.options.toBeContinued) {
          $(document).on('keydown.storylineTitle', event => {
            var keyCode;
            // Only process keys if we're the top-most dialog.
            if (LOI.adventure.modalDialogs()[0].dialog !== this) {
              return;
            }
            keyCode = event.which;
            if (keyCode === AC.Keys.enter) {
              return this.activatable.deactivate();
            }
          });
          // Automatically continue after 5 seconds.
          Meteor.setTimeout(() => {
            return this.activatable.deactivate();
          }, 5000);
        }
        if (typeof (base1 = this.options).onActivated === "function") {
          base1.onActivated();
        }
        return finishedActivatingCallback();
      }, 500);
    }
    onDeactivate(finishedDeactivatingCallback) {
      var base;
      $(document).off('.storylineTitle');
      if (typeof (base = this.options).onDeactivate === "function") {
        base.onDeactivate();
      }
      return Meteor.setTimeout(() => {
        var base1;
        if (typeof (base1 = this.options).onDeactivated === "function") {
          base1.onDeactivated();
        }
        return finishedDeactivatingCallback();
      }, 500);
    }
    chapter() {
      return this.options.chapter;
    }
    episode() {
      return this.options.episode;
    }
    toBeContinuedClass() {
      if (this.options.toBeContinued) {
        return 'to-be-continued';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click': this.onClick
      });
    }
    onClick(event) {
      // Don't hide it if this is a to-be-continued title.
      if (this.options.toBeContinued) {
        return;
      }
      return this.activatable.deactivate();
    }
  }
  ;
  StorylineTitle.register('LandsOfIllusions.Components.StorylineTitle');
  return StorylineTitle;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.storylinetitle.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/storylinetitle/template.storylinetitle.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.StorylineTitle");
Template["LandsOfIllusions.Components.StorylineTitle"] = new Template("Template.LandsOfIllusions.Components.StorylineTitle", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("deactivated"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: function() {
        return [ "landsofillusions-components-storylinetitle ", Spacebars.mustache(view.lookup("toBeContinuedClass")) ];
      }
    }, "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
    }, function() {
      return [ "\n        ", HTML.H1({
        class: "storyline-header"
      }, "\n          ", Blaze.If(function() {
        return Spacebars.call(view.lookup("chapter"));
      }, function() {
        return [ "\n            ", Blaze._TemplateWith(function() {
          return "episode";
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), ": ", Blaze.View("lookup:chapter.episode.fullName", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("chapter"), "episode", "fullName"));
        }), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("options"), "toBeContinued"));
      }, function() {
        return [ "\n            ", Blaze.Unless(function() {
          return Spacebars.call(view.lookup("chapter"));
        }, function() {
          return HTML.Raw('\n              <span class="pixel-art-academy">Pixel Art Academy</span>\n            ');
        }), "\n            ", HTML.SPAN({
          class: "to-be-continued"
        }, "\n              ", Blaze._TemplateWith(function() {
          return "to be continued in";
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), "\n            "), "\n          " ];
      }), "\n        "), "\n        ", HTML.DIV({
        class: "storyline-title-area"
      }, "\n          ", HTML.H2({
        class: "storyline-title"
      }, "\n            ", Spacebars.With(function() {
        return Spacebars.call(view.lookup("chapter"));
      }, function() {
        return [ "\n              ", HTML.SPAN({
          class: "heading"
        }, Blaze._TemplateWith(function() {
          return "Chapter";
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        })), "\n              ", HTML.SPAN({
          class: "title"
        }, Blaze.View("lookup:fullName", function() {
          return Spacebars.mustache(view.lookup("fullName"));
        })), "\n            " ];
      }), "\n            ", Spacebars.With(function() {
        return Spacebars.call(view.lookup("episode"));
      }, function() {
        return [ "\n              ", HTML.SPAN({
          class: "heading"
        }, Blaze._TemplateWith(function() {
          return "Episode";
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        })), "\n              ", HTML.SPAN({
          class: "title"
        }, Blaze.View("lookup:fullName", function() {
          return Spacebars.mustache(view.lookup("fullName"));
        })), "\n            " ];
      }), "\n          "), "\n        "), "\n        ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("options"), "toBeContinued"));
      }, function() {
        return [ "\n          ", HTML.DIV({
          class: "call-to-action"
        }, "\n            ", HTML.DIV({
          class: "coming-soon"
        }, Blaze._TemplateWith(function() {
          return "coming soon";
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        })), "\n            ", HTML.DIV({
          class: "follow"
        }, "\n              ", Blaze._TemplateWith(function() {
          return "Follow development on";
        }, function() {
          return Spacebars.include(view.lookupTemplate("t10e"));
        }), HTML.Raw('<br>\n              <a class="patreon" href="https://www.patreon.com/retro">\n                Patreon\n              </a>\n            ')), "\n          "), "\n        " ];
      }), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"hand":{"hand.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/hand/hand.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.Hand = function () {
  class Hand extends AM.Component {
    static id() {
      return 'LandsOfIllusions.Components.Hand';
    }
    static version() {
      return '0.1.0';
    }
    showHand() {
      return typeof LOI.characterId === "function" ? LOI.characterId() : void 0;
    }
    handStyle() {
      var character, data, shade, style, url;
      data = this.data();
      style = _.isString(data) ? data : 'normal';
      character = LOI.character();
      shade = _.clamp(character.avatar.body.properties.skin.shade(), 3, 8);
      url = "/landsofillusions/components/hand/".concat(style, "/shade").concat(shade, ".png");
      return {
        backgroundImage: "url('".concat(this.versionedUrl(url), "')")
      };
    }
  }
  ;
  Hand.register(Hand.id());
  return Hand;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.hand.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/hand/template.hand.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Hand");
Template["LandsOfIllusions.Components.Hand"] = new Template("Template.LandsOfIllusions.Components.Hand", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("showHand"));
  }, function() {
    return [ "\n    ", HTML.DIV(HTML.Attrs({
      class: "landsofillusions-components-hand"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("handStyle"));
    })), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"translationinput":{"translationinput.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/translationinput/translationinput.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.TranslationInput = function () {
  // Input control for editing translation values.
  class TranslationInput extends AM.Component {
    constructor(options) {
      super(...arguments);
      this.options = options;
    }
    onCreated() {
      super.onCreated(...arguments);
      // We create a translatable that is always editable.
      return this.translatable = new AB.Components.Translatable(_.extend({}, this.options, {
        editable: true
      }));
    }
    renderTranslatable() {
      // We need to manually render the translatable (instead using Render) because
      // we want to retain data context (the translation document coming from the parent).
      return this.translatable.renderComponent(this.currentComponent());
    }
  }
  ;
  TranslationInput.register('LandsOfIllusions.Components.TranslationInput');
  return TranslationInput;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.translationinput.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/translationinput/template.translationinput.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.TranslationInput");
Template["LandsOfIllusions.Components.TranslationInput"] = new Template("Template.LandsOfIllusions.Components.TranslationInput", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-translationinput"
  }, "\n    ", Spacebars.include(view.lookupTemplate("renderTranslatable")), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"menu":{"menu.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/menu/menu.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AC, AE, AM, LOI;
AB = Artificial.Base;
AC = Artificial.Control;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.Menu = function () {
  class Menu extends AM.Component {
    static id() {
      return 'LandsOfIllusions.Components.Menu';
    }
    static url() {
      return 'menu';
    }
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      super(...arguments);
      this.options = options;
      this.visible = new ReactiveField(false);
      this.items = new (this.options.itemsClass || this.constructor.Items)(this);
      if (this.options.extrasClass) {
        this.extras = new this.options.extrasClass();
      }
      this.signIn = new LOI.Components.SignIn();
      this.saveGame = new (this.options.saveGameClass || LOI.Components.SaveGame)();
      this.loadGame = new (this.options.loadGameClass || LOI.Components.LoadGame)();
      this.account = new LOI.Components.Account();
      this._transitionDuration = 200;
      // Set this variable to override show menu function.
      this.customShowMenu = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      return $(document).on('keydown.menu', event => {
        var customShowMenuHandler;
        if (!(LOI.adventure.interface.active() || this.visible())) {
          return;
        }
        if (LOI.adventure.currentContext()) {
          return;
        }

        // Make sure we're the active modal dialog.
        if (LOI.adventure.topModalDialog() !== this) {
          return;
        }
        // Toggle menu on escape.
        if (event.which === AC.Keys.escape) {
          // See if we should handle the menu change ourselves or to delegate.
          if (customShowMenuHandler = this.customShowMenu()) {
            return customShowMenuHandler();
          } else {
            if (this.visible()) {
              return this.hideMenu();
            } else {
              return this.showMenu();
            }
          }
        }
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return $(document).off('.menu');
    }
    showMenu() {
      // We add a new routing context to not interfere with main adventure routing.
      AB.Router.addRoutingContext(this.constructor.id());
      LOI.adventure.addModalDialog({
        dialog: this,
        // We already render the menu ourselves as it only becomes an active dialog when it's visible.
        dontRender: true
      });
      // Make menu visible and do the fade in.
      this.visible(true);
      return this.$('.menu-overlay').velocity('stop').velocity({
        opacity: [1, 0]
      }, {
        duration: this._transitionDuration
      });
    }
    hideMenu() {
      LOI.adventure.removeModalDialog(this);

      // We can return to main adventure routing.
      AB.Router.removeRoutingContext(this.constructor.id());
      // Fade out and then make menu not visible.
      return this.$('.menu-overlay').velocity('stop').velocity({
        opacity: [0, 1]
      }, {
        duration: this._transitionDuration,
        complete: () => {
          this.visible(false);

          // Move back to the main menu so that when we come back, we'll start fresh.
          return this.items.goToMainMenu();
        }
      });
    }
    display() {
      return LOI.adventure.interface.display;
    }
    visibleClass() {
      if (this.visible()) {
        return 'visible';
      }
    }
    toolbarVisible() {
      if (this.customShowMenu() || !this.visible()) {
        return 'visible';
      }
    }
    audioEnabledClass() {
      if (LOI.adventure.audioManager.enabled()) {
        return 'audio-enabled';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .menu-button': this.onClickMenuButton,
        'click .toggle-audio-button': this.onClickToggleAudioButton
      });
    }
    onClickMenuButton(event) {
      return this.showMenu();
    }
    onClickToggleAudioButton(event) {
      var value;
      if (LOI.adventure.audioManager.enabled()) {
        value = LOI.Settings.Audio.Enabled.Off;
      } else {
        value = LOI.Settings.Audio.Enabled.On;
      }
      return LOI.settings.audio.enabled.value(value);
    }
  }
  ;
  Menu.register(Menu.id());
  return Menu;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.menu.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/menu/template.menu.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Menu");
Template["LandsOfIllusions.Components.Menu"] = new Template("Template.LandsOfIllusions.Components.Menu", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "landsofillusions-components-menu"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), Spacebars.dot(view.lookup("display"), "viewport", "viewportBounds", "toDimensions"));
  }), "\n    ", HTML.DIV({
    class: function() {
      return [ "menu-overlay ", Spacebars.mustache(view.lookup("visibleClass")) ];
    }
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return [ "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("items"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("extras"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n      " ];
  }), "\n    "), "\n    ", HTML.DIV({
    class: function() {
      return [ "toolbar ", Spacebars.mustache(view.lookup("toolbarVisible")) ];
    }
  }, "\n      ", HTML.BUTTON({
    class: function() {
      return [ "toggle-audio-button ", Spacebars.mustache(view.lookup("audioEnabledClass")) ];
    }
  }), "\n      ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("customShowMenu"));
  }, function() {
    return HTML.Raw('\n        <button class="menu-button">菜单</button>\n      ');
  }), "\n    "), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("signIn"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("saveGame"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("loadGame"));
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
// packages/retronator_landsofillusions-ui/components/menu/items/items.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, LOI, Persistence;
AB = Artificial.Base;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
Persistence = Artificial.Mummification.Document.Persistence;
LOI.Components.Menu.Items = function () {
  class Items extends LOI.Component {
    static id() {
      return 'LandsOfIllusions.Components.Menu.Items';
    }
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      super(...arguments);
      this.options = options;
      this.currentScreen = new ReactiveField(this.constructor.Screens.MainMenu);
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.autorun(computation => {
        if (LOI.settings.controls.rightClick.value() === LOI.Settings.Controls.RightClick.BackButton) {
          return $(document).on('contextmenu.landsofillusions-components-menu-items', null, event => {
            return this.onContextMenu(event);
          });
        } else {
          return $(document).off('.landsofillusions-components-menu-items');
        }
      });
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return $(document).off('.landsofillusions-components-menu-items');
    }
    aboutVisible() {
      // About is visible on the landing page.
      return this.options.landingPage;
    }
    pressVisible() {
      // Same as about.
      return this.aboutVisible();
    }
    smallprintVisible() {
      // Always shown.
      return true;
    }
    newVisible() {
      // New game is visible only on the landing page.
      return this.options.landingPage;
    }
    continueVisible() {
      // Continue is visible when we're not on the landing page.
      return !this.options.landingPage;
    }
    loadVisible() {
      var ref;
      // Load game is visible if the profile hasn't been saved yet.
      return !((ref = LOI.adventure.profile()) != null ? ref.hasSyncing() : void 0);
    }
    saveVisible() {
      var ref;
      // Save game is visible when an unsaved profile isn't on the landing page.
      if ((ref = LOI.adventure.profile()) != null ? ref.hasSyncing() : void 0) {
        return;
      }
      return !this.options.landingPage;
    }
    accountVisible() {
      // Account is visible for logged in users.
      return Retronator.user();
    }
    quitVisible() {
      // Quit is visible when you are not on the landing page or if you're logged in.
      return !this.options.landingPage || Retronator.user();
    }
    inMainMenu() {
      return this.currentScreen() === this.constructor.Screens.MainMenu;
    }
    inSettings() {
      return this.currentScreen() === this.constructor.Screens.Settings;
    }
    inDisplay() {
      return this.currentScreen() === this.constructor.Screens.Display;
    }
    inAudio() {
      return this.currentScreen() === this.constructor.Screens.Audio;
    }
    inMusicEffectsSettings() {
      return this.currentScreen() === this.constructor.Screens.MusicEffectsSettings;
    }
    inAudioSubmenus() {
      return this.inAudio() || this.inMusicEffectsSettings();
    }
    inControls() {
      return this.currentScreen() === this.constructor.Screens.Controls;
    }
    inPermissions() {
      return this.currentScreen() === this.constructor.Screens.Permissions;
    }
    inExtras() {
      return this.currentScreen() === this.constructor.Screens.Extras;
    }
    goToMainMenu() {
      return this.currentScreen(this.constructor.Screens.MainMenu);
    }
    isFullscreen() {
      return AM.Window.isFullscreen();
    }
    audioEnabled() {
      return LOI.settings.audio.enabled.value();
    }
    mainVolume() {
      return LOI.settings.audio.mainVolume.value();
    }
    soundVolume() {
      return LOI.settings.audio.soundVolume.value();
    }
    ambientVolume() {
      return LOI.settings.audio.ambientVolume.value();
    }
    musicVolume() {
      return LOI.settings.audio.musicVolume.value();
    }
    crtEmulation() {
      return LOI.settings.graphics.crtEmulation.value();
    }
    slowCPUEmulation() {
      return LOI.settings.graphics.slowCPUEmulation.value();
    }
    smoothShading() {
      return LOI.settings.graphics.smoothShading.value();
    }
    graphicsMaximumScale() {
      return LOI.settings.graphics.maximumScale.value();
    }
    graphicsScale() {
      return Math.min(this.graphicsMaximumScale() || 2, LOI.adventure.interface.highestAvailableScale());
    }
    canIncreaseGraphicsScale() {
      return this.graphicsScale() < LOI.adventure.interface.highestAvailableScale();
    }
    rightClick() {
      return LOI.settings.controls.rightClick.value();
    }
    permissionsPersistSettings() {
      return this._permissionsValue(LOI.settings.persistSettings);
    }
    permissionsPersistGameState() {
      return this._permissionsValue(LOI.settings.persistGameState);
    }
    permissionsPersistCommandHistory() {
      return this._permissionsValue(LOI.settings.persistCommandHistory);
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
        'mouseenter .actionable': this.onMouseEnterActionable,
        'click .actionable': this.onClickActionable,
        'click .back-to-settings': this.onClickBackToSettings,
        // Main menu
        'click .main-menu .continue': this.onClickMainMenuContinue,
        'click .main-menu .new': this.onClickMainMenuNew,
        'click .main-menu .load': this.onClickMainMenuLoad,
        'click .main-menu .save': this.onClickMainMenuSave,
        'click .main-menu .account': this.onClickMainMenuAccount,
        'click .main-menu .fullscreen': this.onClickMainMenuFullscreen,
        'click .main-menu .settings': this.onClickMainMenuSettings,
        'click .main-menu .quit': this.onClickMainMenuQuit,
        // Settings
        'click .settings .display': this.onClickSettingsDisplay,
        'click .settings .audio': this.onClickSettingsAudio,
        'click .settings .controls': this.onClickSettingsControls,
        'click .settings .permissions': this.onClickSettingsPermissions,
        'click .settings .back-to-menu': this.onClickSettingsBackToMenu,
        // Display
        'click .display .graphics-scale .previous-button': this.onClickDisplayGraphicsScalePreviousButton,
        'click .display .graphics-scale .next-button': this.onClickDisplayGraphicsScaleNextButton,
        'click .display .crt-emulation': this.onClickDisplayCRTEmulation,
        'click .display .slow-cpu-emulation': this.onClickDisplaySlowCPUEmulation,
        'click .display .smooth-shading': this.onClickDisplaySmoothShading,
        // Audio
        'click .audio .enabled': this.onClickAudioEnabled,
        'input .audio .main-volume': this.onInputAudioMainVolume,
        'input .audio .sound-volume': this.onInputAudioSoundVolume,
        'input .audio .ambient-volume': this.onInputAudioAmbientVolume,
        'input .audio .music-volume': this.onInputAudioMusicVolume,
        // Controls
        'click .controls .right-click': this.onClickControlsRightClick,
        // Permissions
        'click .permissions .persist-settings': this.onClickPermissionsPersistSettings,
        'click .permissions .persist-game-state': this.onClickPermissionsPersistGameState,
        'click .permissions .persist-command-history': this.onClickPermissionsPersistCommandHistory,
        'click .permissions .persist-login': this.onClickPermissionsPersistLogin
      });
    }
    onContextMenu(event) {
      var topModalDialog;
      // We want to handle right click only if there are no other modal dialogs present.
      topModalDialog = LOI.adventure.topModalDialog();
      if (topModalDialog && !(topModalDialog instanceof LOI.Components.Menu)) {
        return;
      }
      event.preventDefault();
      switch (this.currentScreen()) {
        case this.constructor.Screens.MainMenu:
          if (!this.options.landingPage) {
            return this.onClickMainMenuContinue();
          }
          break;
        case this.constructor.Screens.Settings:
          return this.onClickSettingsBackToMenu();
        case this.constructor.Screens.Display:
          return this.onClickBackToSettings();
        case this.constructor.Screens.Audio:
          return this.onClickBackToSettings();
        case this.constructor.Screens.MusicEffectsSettings:
          return typeof this.onClickMusicEffectsSettingsBackToAudio === "function" ? this.onClickMusicEffectsSettingsBackToAudio() : void 0;
        case this.constructor.Screens.Controls:
          return this.onClickBackToSettings();
        case this.constructor.Screens.Permissions:
          return this.onClickBackToSettings();
        case this.constructor.Screens.Extras:
          return typeof this.onClickExtrasBackToMenu === "function" ? this.onClickExtrasBackToMenu() : void 0;
      }
    }
    onMouseEnterActionable(event) {
      if (!this._justClicked) {
        return this.audio.hover();
      }
    }
    onClickActionable(event) {
      this.audio.click();
      this._justClicked = true;
      return Meteor.setTimeout(() => {
        return this._justClicked = false;
      }, 100);
    }
    onClickBackToSettings(event) {
      return this.currentScreen(this.constructor.Screens.Settings);
    }
    onClickMainMenuContinue(event) {
      return LOI.adventure.menu.hideMenu();
    }
    onClickMainMenuNew(event) {
      // Scroll down to help the player understand they should scroll down to begin.
      return LOI.adventure.interface.narrative.scroll();
    }
    onClickMainMenuLoad(event) {
      var dialog;
      if (this.options.landingPage) {
        // On the landing page we can directly load.
        return this._loadGame();
      } else {
        // Warn user they will lose progress.
        dialog = new LOI.Components.Dialog({
          message: "You will lose current game progress if you load another game.",
          buttons: [{
            text: "Continue",
            value: true
          }, {
            text: "Cancel"
          }]
        });
        return LOI.adventure.showActivatableModalDialog({
          dialog: dialog,
          callback: () => {
            if (dialog.result) {
              return this._loadGame();
            }
          }
        });
      }
    }
    _loadGame() {
      return LOI.adventure.menu.loadGame.show();
    }
    onClickMainMenuSave(event) {
      return LOI.adventure.menu.saveGame.show();
    }
    onClickMainMenuAccount(event) {
      return LOI.adventure.menu.account.show();
    }
    onClickMainMenuFullscreen(event) {
      if (AM.Window.isFullscreen()) {
        AM.Window.exitFullscreen();
        return LOI.settings.graphics.preferFullscreen.value(false);
      } else {
        AM.Window.enterFullscreen();
        return LOI.settings.graphics.preferFullscreen.value(true);
      }
    }
    onClickMainMenuSettings(event) {
      this.currentScreen(this.constructor.Screens.Settings);
      // Store current state of settings.
      return this._oldSettings = LOI.settings.toObject();
    }
    onClickMainMenuQuit(event) {
      var dialog;
      if (Retronator.user()) {
        return LOI.adventure.quitGame();
      } else {
        // Notify the player that they will lose the current game state.
        dialog = new LOI.Components.Dialog({
          message: "You will lose current game progress if you quit.",
          buttons: [{
            text: "Quit",
            value: true
          }, {
            text: "Cancel"
          }]
        });
        return LOI.adventure.showActivatableModalDialog({
          dialog: dialog,
          callback: () => {
            if (dialog.result) {
              return LOI.adventure.quitGame();
            }
          }
        });
      }
    }
    onClickSettingsDisplay(event) {
      return this.currentScreen(this.constructor.Screens.Display);
    }
    onClickSettingsAudio(event) {
      return this.currentScreen(this.constructor.Screens.Audio);
    }
    onClickSettingsControls(event) {
      return this.currentScreen(this.constructor.Screens.Controls);
    }
    onClickAudioEnabled(event) {
      var value;
      switch (LOI.settings.audio.enabled.value()) {
        case LOI.Settings.Audio.Enabled.Off:
          // Fullscreen option is only available in the browser.
          if (AB.ApplicationEnvironment.isBrowser) {
            value = LOI.Settings.Audio.Enabled.Fullscreen;
          } else {
            value = LOI.Settings.Audio.Enabled.On;
          }
          break;
        case LOI.Settings.Audio.Enabled.Fullscreen:
          value = LOI.Settings.Audio.Enabled.On;
          break;
        case LOI.Settings.Audio.Enabled.On:
          value = LOI.Settings.Audio.Enabled.Off;
      }
      return LOI.settings.audio.enabled.value(value);
    }
    onInputAudioMainVolume(event) {
      return this._changeVolume('main', event);
    }
    onInputAudioSoundVolume(event) {
      this._changeVolume('sound', event);

      // Give audio feedback to indicate loudness of the sounds.
      return this.audio.click();
    }
    onInputAudioAmbientVolume(event) {
      return this._changeVolume('ambient', event);
    }
    onInputAudioMusicVolume(event) {
      return this._changeVolume('music', event);
    }
    _changeVolume(property, event) {
      var value;
      value = parseFloat($(event.target).val());
      return LOI.settings.audio["".concat(property, "Volume")].value(value);
    }
    onClickDisplayGraphicsScalePreviousButton(event) {
      var currentValue;
      currentValue = this.graphicsScale();
      currentValue--;
      if (currentValue < 2) {
        currentValue = null;
      }
      return LOI.settings.graphics.maximumScale.value(currentValue);
    }
    onClickDisplayGraphicsScaleNextButton(event) {
      var currentValue;
      currentValue = LOI.settings.graphics.maximumScale.value() ? this.graphicsScale() : 1;
      currentValue++;
      return LOI.settings.graphics.maximumScale.value(currentValue);
    }
    onClickDisplayCRTEmulation(event) {
      var crtEmulationValue;
      crtEmulationValue = LOI.settings.graphics.crtEmulation.value;
      return crtEmulationValue(!crtEmulationValue());
    }
    onClickDisplaySlowCPUEmulation(event) {
      var slowCPUEmulationValue;
      slowCPUEmulationValue = LOI.settings.graphics.slowCPUEmulation.value;
      return slowCPUEmulationValue(!slowCPUEmulationValue());
    }
    onClickDisplaySmoothShading(event) {
      var smoothShadingValue;
      smoothShadingValue = LOI.settings.graphics.smoothShading.value;
      return smoothShadingValue(!smoothShadingValue());
    }
    onClickControlsRightClick(event) {
      var value;
      switch (LOI.settings.controls.rightClick.value()) {
        case LOI.Settings.Controls.RightClick.None:
          value = LOI.Settings.Controls.RightClick.橡皮擦;
          break;
        case LOI.Settings.Controls.RightClick.Eraser:
          value = LOI.Settings.Controls.RightClick.BackButton;
          break;
        case LOI.Settings.Controls.RightClick.BackButton:
          value = LOI.Settings.Controls.RightClick.None;
      }
      return LOI.settings.controls.rightClick.value(value);
    }
    onClickSettingsPermissions(event) {
      return this.currentScreen(this.constructor.Screens.Permissions);
    }
    onClickSettingsBackToMenu(event) {
      var newSettings;
      if (LOI.settings.persistSettings.decided()) {
        // User already decided if they want to save settings so just return to menu.
        return this.goToMainMenu();
      } else {
        // See if settings have changed and ask to save.
        newSettings = LOI.settings.toObject();
        if (EJSON.equals(this._oldSettings, newSettings)) {
          // Settings haven't changed, so no need to save.
          return this.goToMainMenu();
        } else {
          // Settings have changed. Ask to save and return to menu when answered.
          return LOI.settings.persistSettings.showDialog(() => {
            return this.currentScreen(this.constructor.Screens.MainMenu);
          });
        }
      }
    }
    onClickPermissionsPersistSettings(event) {
      return this._onClickPermissions(LOI.settings.persistSettings);
    }
    onClickPermissionsPersistGameState(event) {
      return this._onClickPermissions(LOI.settings.persistGameState);
    }
    onClickPermissionsPersistCommandHistory(event) {
      return this._onClickPermissions(LOI.settings.persistCommandHistory);
    }
    onClickPermissionsPersistLogin(event) {
      if (LOI.settings.persistLogin.allowed()) {
        LOI.settings.persistLogin.disallow();
        // Also delete any login info.
        Accounts._autoLoginEnabled = false;
        return LOI.adventure.clearLoginInformation();
      } else {
        return LOI.settings.persistLogin.showDialog(value => {
          Accounts._autoLoginEnabled = value;
          if (value) {
            return Accounts._enableAutoLogin();
          }
        });
      }
    }
    _onClickPermissions(consentField) {
      if (consentField.allowed()) {
        return consentField.disallow();
      } else {
        return consentField.showDialog();
      }
    }
  }
  ;
  Items.register(Items.id());
  Items.Screens = {
    MainMenu: 'MainMenu',
    Settings: 'Settings',
    Display: 'Display',
    Audio: 'Audio',
    MusicEffectsSettings: 'MusicEffectsSettings',
    Controls: 'Controls',
    Permissions: 'Permissions',
    Extras: 'Extras'
  };
  Items.Audio = new LOI.Assets.Audio.Namespace(Items.id(), {
    variables: {
      hover: {
        valueType: AEc.ValueTypes.Trigger,
        throttle: 35
      },
      click: AEc.ValueTypes.Trigger
    }
  });
  return Items;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.items.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/menu/items/template.items.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Menu.Items");
Template["LandsOfIllusions.Components.Menu.Items"] = new Template("Template.LandsOfIllusions.Components.Menu.Items", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-menu-items"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inMainMenu"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "main-menu menu"
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("aboutVisible"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "menu-item"
      }, "\n            ", HTML.A({
        class: "about actionable",
        href: function() {
          return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.LandingPage.Pages.About");
        },
        target: "_blank"
      }, "\n              About\n            "), "\n          "), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("continueVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="continue actionable">Continue</span></li>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("newVisible"));
    }, function() {
      return [ HTML.Raw('\n          <li class="menu-item"><span class="new actionable">Play intro</span></li>\n          '), HTML.LI({
        class: "menu-item"
      }, "\n            ", HTML.A({
        class: "buy actionable",
        href: function() {
          return Spacebars.mustache(view.lookup("routerPath"), "Retronator.HQ.Adventure", Spacebars.kw({
            parameter2: "store"
          }));
        },
        target: "_blank"
      }, "\n              Pre-order\n            "), "\n          "), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("loadVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="load actionable">Load game</span></li>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("saveVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="save actionable">Save game</span></li>\n        ');
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("accountVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="account actionable">Account</span></li>\n        ');
    }), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Fullscreen"));
    }), HTML.Raw('\n        <li class="menu-item"><span class="settings actionable">Settings</span></li>\n        '), Blaze.If(function() {
      return Spacebars.call(view.lookup("pressVisible"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "menu-item"
      }, "\n            ", HTML.A({
        class: "press actionable",
        href: function() {
          return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.LandingPage.Pages.Press");
        },
        target: "_blank"
      }, "\n              Press page\n            "), "\n          "), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("smallprintVisible"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "menu-item"
      }, "\n            ", HTML.A({
        class: "smallprint actionable",
        href: function() {
          return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.LandingPage.Pages.Smallprint");
        },
        target: "_blank"
      }, "\n              Smallprint\n            "), "\n          "), "\n        " ];
    }), "\n        ", HTML.LI({
      class: "menu-item"
    }, "\n          ", HTML.A({
      class: "help actionable",
      href: function() {
        return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.LandingPage.Pages.Help");
      },
      target: "_blank"
    }, "\n            Help\n          "), "\n        "), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("quitVisible"));
    }, function() {
      return HTML.Raw('\n          <li class="menu-item"><span class="quit actionable">Quit game</span></li>\n        ');
    }), "\n      "), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inSettings"));
  }, function() {
    return HTML.Raw('\n      <ul class="settings menu">\n        \n        <li class="menu-item"><span class="actionable display">显示</span></li>\n        <li class="menu-item"><span class="actionable audio">音频</span></li>\n        <li class="menu-item"><span class="actionable controls">控制</span></li>\n        <li class="menu-item"><span class="actionable permissions">权限</span></li>\n        <li class="menu-item"><span class="back-to-menu actionable">返回</span></li>\n      </ul>\n    ');
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inDisplay"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "display menu"
    }, "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "GraphicsScale"));
    }), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "CRTEmulation"));
    }), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "SlowCPUEmulation"));
    }), "\n        ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "smooth-shading actionable"
    }, "\n          平滑着色：", Blaze.If(function() {
      return Spacebars.call(view.lookup("smoothShading"));
    }, function() {
      return "开";
    }, function() {
      return "关";
    }), "\n        ")), HTML.Raw('\n        <li class="menu-item"><span class="back-to-settings actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inAudio"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "audio menu"
    }, "\n        ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "enabled actionable"
    }, "\n          Audio:\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("audioEnabled"), "On");
    }, function() {
      return "开";
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("audioEnabled"), "Fullscreen");
    }, function() {
      return "when fullscreen";
    }), "\n          ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("audioEnabled"), "Off");
    }, function() {
      return "关";
    }), "\n        ")), "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "VolumeControls"));
    }), HTML.Raw('\n        <li class="menu-item"><span class="back-to-settings actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("inControls"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: "controls menu"
    }, "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "RightClick"));
    }), HTML.Raw('\n        <li class="menu-item"><span class="back-to-settings actionable">返回</span></li>\n      ')), "\n    " ];
  }), "\n\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permissions"));
  }), "\n  ");
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.Fullscreen");
Template["LandsOfIllusions.Components.Menu.Items.Fullscreen"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.Fullscreen", (function() {
  var view = this;
  return HTML.LI({
    class: "menu-item"
  }, HTML.SPAN({
    class: "fullscreen actionable"
  }, "\n    全屏：\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isFullscreen"));
  }, function() {
    return "\n      on\n    ";
  }, function() {
    return "\n      off\n    ";
  }), "\n  "));
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.GraphicsScale");
Template["LandsOfIllusions.Components.Menu.Items.GraphicsScale"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.GraphicsScale", (function() {
  var view = this;
  return HTML.LI({
    class: "graphics-scale menu-item"
  }, "\n    像素缩放：\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("graphicsMaximumScale"));
  }, function() {
    return HTML.Raw('\n      <button class="previous-button">◀</button>\n    ');
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("graphicsMaximumScale"));
  }, function() {
    return [ "\n      ", Blaze.View("lookup:graphicsScale", function() {
      return Spacebars.mustache(view.lookup("graphicsScale"));
    }), "x\n    " ];
  }, function() {
    return "\n      自动\n    ";
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("canIncreaseGraphicsScale"));
  }, function() {
    return HTML.Raw('\n      <button class="next-button">▶</button>\n    ');
  }), "\n  ");
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.CRTEmulation");
Template["LandsOfIllusions.Components.Menu.Items.CRTEmulation"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.CRTEmulation", (function() {
  var view = this;
  return HTML.LI({
    class: "menu-item"
  }, HTML.SPAN({
    class: "crt-emulation actionable"
  }, "\n    CRT 模拟：", Blaze.If(function() {
    return Spacebars.call(view.lookup("crtEmulation"));
  }, function() {
    return "开";
  }, function() {
    return "关";
  }), "\n  "));
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.SlowCPUEmulation");
Template["LandsOfIllusions.Components.Menu.Items.SlowCPUEmulation"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.SlowCPUEmulation", (function() {
  var view = this;
  return HTML.LI({
    class: "menu-item"
  }, HTML.SPAN({
    class: "slow-cpu-emulation actionable"
  }, "\n    慢速 CPU 模拟：", Blaze.If(function() {
    return Spacebars.call(view.lookup("slowCPUEmulation"));
  }, function() {
    return "开";
  }, function() {
    return "关";
  }), "\n  "));
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.VolumeControls");
Template["LandsOfIllusions.Components.Menu.Items.VolumeControls"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.VolumeControls", (function() {
  var view = this;
  return [ HTML.LI({
    class: "menu-item"
  }, "\n    主音量: ", HTML.INPUT({
    class: "main-volume",
    type: "range",
    min: "0",
    max: "1",
    step: "0.05",
    value: function() {
      return Spacebars.mustache(view.lookup("mainVolume"));
    }
  }), "\n  "), "\n  ", HTML.LI({
    class: "menu-item"
  }, "\n    音效: ", HTML.INPUT({
    class: "sound-volume",
    type: "range",
    min: "0",
    max: "1",
    step: "0.05",
    value: function() {
      return Spacebars.mustache(view.lookup("soundVolume"));
    }
  }), "\n  "), "\n  ", HTML.LI({
    class: "menu-item"
  }, "\n    环境音: ", HTML.INPUT({
    class: "ambient-volume",
    type: "range",
    min: "0",
    max: "1",
    step: "0.05",
    value: function() {
      return Spacebars.mustache(view.lookup("ambientVolume"));
    }
  }), "\n  "), "\n  ", HTML.LI({
    class: "menu-item"
  }, "\n    音乐: ", HTML.INPUT({
    class: "music-volume",
    type: "range",
    min: "0",
    max: "1",
    step: "0.05",
    value: function() {
      return Spacebars.mustache(view.lookup("musicVolume"));
    }
  }), "\n  ") ];
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.RightClick");
Template["LandsOfIllusions.Components.Menu.Items.RightClick"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.RightClick", (function() {
  var view = this;
  return HTML.LI({
    class: "menu-item"
  }, HTML.SPAN({
    class: "right-click actionable"
  }, "\n    右键点击:\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("rightClick"), "None");
  }, function() {
    return "none";
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("rightClick"), "Eraser");
  }, function() {
    return "Eraser";
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("rightClick"), "BackButton");
  }, function() {
    return "返回按钮";
  }), "\n  "));
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.Permissions");
Template["LandsOfIllusions.Components.Menu.Items.Permissions"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.Permissions", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("inPermissions"));
  }, function() {
    return [ "\n    ", HTML.UL({
      class: "permissions menu"
    }, "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "persist-settings actionable"
    }, "\n          Save settings: ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("permissionsPersistSettings"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permission"));
      });
    }), "\n        ")), "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "persist-game-state actionable"
    }, "\n          Save game state: ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("permissionsPersistGameState"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permission"));
      });
    }), "\n        ")), "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "persist-command-history actionable"
    }, "\n          Save command history: ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("permissionsPersistCommandHistory"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permission"));
      });
    }), "\n        ")), "\n      ", HTML.LI({
      class: "menu-item"
    }, HTML.SPAN({
      class: "persist-login actionable"
    }, "\n          Remember signed-in user: ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("permissionsPersistLogin"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Menu", "Items", "Permission"));
      });
    }), "\n        ")), HTML.Raw('\n      <li class="menu-item"><span class="back-to-settings actionable">Back</span></li>\n    ')), "\n  " ];
  });
}));

Template.__checkName("LandsOfIllusions.Components.Menu.Items.Permission");
Template["LandsOfIllusions.Components.Menu.Items.Permission"] = new Template("Template.LandsOfIllusions.Components.Menu.Items.Permission", (function() {
  var view = this;
  return HTML.SPAN({
    class: "landsofillusions-components-menu-items-permission"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("."), true);
  }, function() {
    return "\n      yes\n    ";
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), view.lookup("."), false);
    }, function() {
      return "\n        no\n      ";
    }, function() {
      return "\n        ask\n      ";
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"account":{"account.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/account.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI;
AB = Artificial.Base;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.Account = function () {
  class Account extends AM.Component {
    static url() {
      return 'account';
    }
    static version() {
      return '0.0.6';
    }
    mixins() {
      return [this.activatable];
    }
    constructor() {
      let options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var base, base1, i, index, len, page, ref;
      super(...arguments);
      this.options = options1;
      if ((base = this.options).dialogProvider == null) {
        base.dialogProvider = LOI.adventure;
      }
      if ((base1 = this.options).useUrlRouting == null) {
        base1.useUrlRouting = true;
      }
      this.activatable = new LOI.Components.Mixins.Activatable();
      this.lastTurnedPageNumber = 1;
      this.currentPageNumber = new ReactiveField(0);
      this.pages = [new this.constructor.Contents(this), new this.constructor.General(), new this.constructor.Services(), new this.constructor.Characters(), new this.constructor.Inventory(), new this.constructor.Transactions(), new this.constructor.PaymentMethods()];
      ref = this.pages;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        page = ref[index];
        page.pageNumber = index + 1;
        // Add ID to avoid re-creating the component in #each.
        page._id = Random.id();
      }
      if (this.options.useUrlRouting) {
        LOI.Adventure.registerDirectRoute("/".concat(this.constructor.url(), "/*"), () => {
          var j, len1, pageUrl, ref1, results;
          if (!_.find(LOI.adventure.modalDialogs(), modalDialog => {
            return modalDialog.dialog === this;
          })) {
            // Show the dialog if we need to.
            this.show();
          }
          if (!(pageUrl = AB.Router.getParameter('parameter2'))) {
            return;
          }
          ref1 = this.pages;
          results = [];
          for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
            page = ref1[index];
            if (page.constructor.url() === pageUrl) {
              results.push(this.currentPageNumber(index + 1));
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      }
      this.noBackground = new ReactiveField(false);
    }
    onRendered() {
      super.onRendered(...arguments);
      // Animate page turning.
      return this.autorun(computation => {
        var addingTurnedPages, currentPageNumber, firstPageToTurn, i, lastPageToTurn, pageNumber, ref, ref1;
        if (!this.activatable.activated()) {
          return;
        }
        // We need to add turned pages if new current page number is bigger than the last turned one.
        currentPageNumber = this.currentPageNumber();
        addingTurnedPages = currentPageNumber > this.lastTurnedPageNumber;
        if (addingTurnedPages) {
          firstPageToTurn = this.lastTurnedPageNumber;
          lastPageToTurn = currentPageNumber - 1;
        } else {
          firstPageToTurn = this.lastTurnedPageNumber - 1;
          lastPageToTurn = currentPageNumber;
        }
        for (pageNumber = i = ref = firstPageToTurn, ref1 = lastPageToTurn; ref <= ref1 ? i <= ref1 : i >= ref1; pageNumber = ref <= ref1 ? ++i : --i) {
          (pageNumber => {
            var $page, distanceToFirstPage;
            $page = this.$(".page-".concat(pageNumber));
            distanceToFirstPage = Math.abs(pageNumber - firstPageToTurn);
            return Meteor.setTimeout(() => {
              if (addingTurnedPages) {
                return $page.addClass('turned');
              } else {
                return $page.removeClass('turned');
              }
            }, distanceToFirstPage * 200);
          })(pageNumber);
        }
        return this.lastTurnedPageNumber = currentPageNumber;
      });
    }
    show() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var charactersPage;
      this.options.dialogProvider.showActivatableModalDialog({
        dialog: this,
        dontRender: true
      });
      this.noBackground(options.noBackground);
      if (options.page) {
        this.currentPageNumber(_.findIndex(this.pages, page => {
          return page instanceof options.page;
        }) + 1);
      }
      if (options.characterId) {
        charactersPage = _.find(this.pages, page => {
          return page instanceof this.constructor.Characters;
        });
        return charactersPage.selectedCharacterId(options.characterId);
      }
    }
    url() {
      var page, pageNumber, url;
      url = 'account';
      pageNumber = this.currentPageNumber();
      if (!pageNumber) {
        // Return the main URL while on the cover.
        return url;
      }
      // Return the URL for the page.
      page = this.pages[pageNumber - 1];
      return "".concat(url, "/").concat(page.constructor.url());
    }
    noBackgroundClass() {
      if (this.noBackground()) {
        return 'no-background';
      }
    }
    onCoverClass() {
      if (!this.currentPageNumber()) {
        return 'on-cover';
      }
    }
    pageClass() {
      var page;
      page = this.currentData();
      return "page-".concat(page.pageNumber);
    }
    coverClosedVisibleClass() {
      if (!this.currentPageNumber()) {
        return 'visible';
      }
    }
    coverOpenVisibleClass() {
      if (this.currentPageNumber()) {
        return 'visible';
      }
    }
    pageVisibleClass() {
      var page;
      page = this.currentData();
      if (this.currentPageNumber() <= page.pageNumber) {
        return 'visible';
      }
    }
    pageImageUrl() {
      var page;
      page = this.currentData();
      return "/landsofillusions/components/account/page-".concat(page.pageNumber, ".png");
    }
    currentTabClass() {
      var page;
      page = this.currentData();
      if (this.currentPageNumber() === page.pageNumber) {
        return 'current';
      }
    }
    tabName() {
      var page;
      page = this.currentData();
      return page.constructor.url();
    }
    previousPage() {
      return this.currentPageNumber(Math.max(1, this.currentPageNumber() - 1));
    }
    nextPage() {
      return this.currentPageNumber(Math.min(this.pages.length, this.currentPageNumber() + 1));
    }
    onActivate(finishedActivatingCallback) {
      return Meteor.setTimeout(() => {
        if (!this.currentPageNumber()) {
          // Flip to first page if we're on the cover (we might be coming directly from URL).
          this.currentPageNumber(1);
        }
        return finishedActivatingCallback();
      }, 750);
    }
    onDeactivate(finishedDeactivatingCallback) {
      return Meteor.setTimeout(() => {
        return finishedDeactivatingCallback();
      }, 500);
    }
    backButtonCallback() {
      return () => {
        var currentPageNumber;
        currentPageNumber = this.currentPageNumber();
        // Flip back to page 1.
        this.currentPageNumber(1);
        return Meteor.setTimeout(() => {
          // Now flip to cover.
          this.currentPageNumber(0);
          return Meteor.setTimeout(() => {
            return this.activatable.deactivate();
          }, 500);
        }, currentPageNumber > 1 ? currentPageNumber * 200 : 0);
      };
    }
    events() {
      return super.events(...arguments);
    }
  }
  ;
  Account.register('LandsOfIllusions.Components.Account');
  return Account;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.account.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/template.account.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account");
Template["LandsOfIllusions.Components.Account"] = new Template("Template.LandsOfIllusions.Components.Account", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("deactivated"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: function() {
        return [ "landsofillusions-components-account ", Spacebars.mustache(view.lookup("noBackgroundClass")) ];
      }
    }, "\n      ", Blaze._TemplateWith(function() {
      return Spacebars.dataMustache(view.lookup("args"), view.lookup("backButtonCallback"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
      });
    }), "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: function() {
          return [ "account-file ", Spacebars.mustache(view.lookup("onCoverClass")) ];
        }
      }, "\n          ", HTML.IMG({
        class: function() {
          return [ "account-file-layer cover-closed ", Spacebars.mustache(view.lookup("coverClosedVisibleClass")) ];
        },
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/cover-closed.png");
        }
      }), "\n          ", HTML.DIV({
        class: "pages"
      }, "\n            ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("pages"));
      }, function() {
        return [ "\n              ", HTML.DIV({
          class: function() {
            return [ "account-file-layer page ", Spacebars.mustache(view.lookup("pageClass")) ];
          }
        }, "\n                ", HTML.DIV({
          class: "page-content"
        }, "\n                  ", Blaze._TemplateWith(function() {
          return Spacebars.call(view.lookup("."));
        }, function() {
          return Spacebars.include(view.lookupTemplate("Render"));
        }), "\n                "), "\n                ", HTML.DIV({
          class: "page-number"
        }, Blaze.View("lookup:pageNumber", function() {
          return Spacebars.mustache(view.lookup("pageNumber"));
        })), "\n              "), "\n            " ];
      }), "\n          "), "\n          ", HTML.IMG({
        class: "account-file-layer papers-bottom",
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/papers-bottom.png");
        }
      }), "\n          ", HTML.IMG({
        class: function() {
          return [ "account-file-layer cover-open ", Spacebars.mustache(view.lookup("coverOpenVisibleClass")) ];
        },
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/cover-open.png");
        }
      }), "\n          ", HTML.IMG({
        class: "account-file-layer cover-back",
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/cover-back.png");
        }
      }), "\n        "), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"account-page.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/account-page.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, HQ, LOI, RA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
LOI.Components.Account.Page = function () {
  class Page extends AM.Component {
    static url() {
      throw new AE.NotImplementedException();
    }
    static displayName() {
      throw new AE.NotImplementedException();
    }
    static initialize() {
      var translationNamespace;
      translationNamespace = this.componentName();
      // On the server, create this avatar's translated names.
      if (Meteor.isServer) {
        return Document.startup(() => {
          var defaultText, results, translationKey;
          if (Meteor.settings.startEmpty) {
            return;
          }
          results = [];
          for (translationKey in this.translationKeys) {
            defaultText = _.propertyValue(this, translationKey);
            results.push(AB.createTranslation(translationNamespace, translationKey, defaultText));
          }
          return results;
        });
      }
    }
    url() {
      return this.constructor.url();
    }
    displayNameTranslation() {
      return this.translation(this.constructor.translationKeys.displayName);
    }
  }
  ;
  Page.translationKeys = {
    displayName: 'displayName'
  };
  return Page;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"contents":{"contents.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/contents/contents.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, HQ, LOI, RA;
AB = Artificial.Base;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
LOI.Components.Account.Contents = function () {
  class Contents extends LOI.Components.Account.Page {
    static url() {
      return 'contents';
    }
    static displayName() {
      return 'Contents';
    }
    constructor(account) {
      super(...arguments);
      this.account = account;
    }
    accountUrl() {
      // Return the root url of the account, since url points to
      // the current active url (depending on which page is active).
      return this.account.constructor.url();
    }
    currentPage() {
      var currentPage, page;
      page = this.currentData();
      currentPage = this.account.pages[this.account.currentPageNumber() - 1];
      return page === currentPage;
    }
    events() {
      return super.events(...arguments).concat({
        'click .page-link': this.onClickPageLink
      });
    }
    onClickPageLink(event) {
      var page, pageIndex;
      page = this.currentData();
      if (this.account.options.useUrlRouting) {
        return;
      }
      pageIndex = _.indexOf(this.account.pages, page);
      return this.account.currentPageNumber(pageIndex + 1);
    }
  }
  ;
  Contents.register('LandsOfIllusions.Components.Account.Contents');
  Contents.initialize();
  return Contents;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.contents.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/contents/template.contents.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account.Contents");
Template["LandsOfIllusions.Components.Account.Contents"] = new Template("Template.LandsOfIllusions.Components.Account.Contents", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-account-contents"
  }, HTML.Raw("\n    <h2>Account folder</h2>\n    <h3>Contents</h3>\n    "), HTML.OL({
    class: "contents"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("account"), "pages"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "content"
    }, "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("currentPage"));
    }, function() {
      return [ "\n            ", HTML.SPAN({
        class: "current-page"
      }, "\n              ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Contents", "PageLine"));
      }), "\n            "), "\n          " ];
    }, function() {
      return [ "\n            ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("account"), "options", "useUrlRouting"));
      }, function() {
        return [ "\n              ", HTML.A({
          class: "page-link",
          href: function() {
            return [ "/", Spacebars.mustache(view.lookup("accountUrl")), "/", Spacebars.mustache(Spacebars.dot(view.lookup("."), "url")) ];
          }
        }, "\n                ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Contents", "PageLine"));
        }), "\n              "), "\n            " ];
      }, function() {
        return [ "\n              ", HTML.SPAN({
          class: "page-link"
        }, "\n                ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Contents", "PageLine"));
        }), "\n              "), "\n            " ];
      }), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), HTML.Raw('\n    <p class="smallprint bottom">HINT: You can click and edit everything in this account file.</p>\n  '));
}));

Template.__checkName("LandsOfIllusions.Components.Account.Contents.PageLine");
Template["LandsOfIllusions.Components.Account.Contents.PageLine"] = new Template("Template.LandsOfIllusions.Components.Account.Contents.PageLine", (function() {
  var view = this;
  return HTML.SPAN({
    class: "page-line"
  }, "\n    ", HTML.SPAN({
    class: "page-name"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("."), "displayNameTranslation"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("t9n"));
  }), "\n    "), "\n    ", HTML.SPAN({
    class: "page-number"
  }, "\n      ", Blaze.View("lookup:..pageNumber", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("."), "pageNumber"));
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"general":{"general.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/general/general.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, HQ, LOI, RA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
LOI.Components.Account.General = function () {
  class General extends LOI.Components.Account.Page {
    static url() {
      return 'registration';
    }
    static displayName() {
      return 'Registration';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.subscribe(RA.User.registeredEmailsForCurrentUser);
      return this.subscribe(RA.User.contactEmailForCurrentUser);
    }
    user() {
      return Retronator.user({
        fields: {
          registered_emails: 1,
          contactEmail: 1
        }
      });
    }
    emailsCount() {
      var ref, ref1;
      return ((ref = this.user()) != null ? (ref1 = ref.registered_emails) != null ? ref1.length : void 0 : void 0) || 0;
    }
    emptyLines() {
      var emailsCount, i, j, ref, results;
      emailsCount = this.emailsCount();
      if (emailsCount >= 4) {
        return;
      }
      results = [];
      for (i = j = ref = emailsCount; ref <= 4 ? j < 4 : j > 4; i = ref <= 4 ? ++j : --j) {
        // Return an array with enough elements to pad the emails table to 5 rows (one is added for inserting new email).
        results.push('');
      }
      return results;
    }
    primaryCheckedAttribute() {
      var email;
      email = this.currentData();
      if (email.address === this.user().contactEmail) {
        return 'checked';
      }
    }
    hasUnverifiedEmails() {
      var unverifiedEmails;
      unverifiedEmails = _.filter(this.user().registered_emails, email => {
        return !email.verified;
      });
      return unverifiedEmails.length;
    }

    // Events
    events() {
      return super.events(...arguments).concat({
        'click .verify-email-button': this.onClickVerifyEmail,
        'change .address-input': this.onChangeAddressInput,
        'change .primary-input': this.onChangePrimaryInput
      });
    }
    onClickVerifyEmail(event) {
      var email;
      email = this.currentData();
      return Meteor.call(RA.User.sendVerificationEmail, email.address, error => {
        if (error) {
          console.error(error.message);
          return LOI.adventure.showDialogMessage("Something went wrong with sending the verification email (".concat(error.message, "). Please email me at hi@retronator.com to resolve this."));
        } else {
          return LOI.adventure.showDialogMessage("A verification email has been sent to ".concat(email.address, ". Click the link in the email to complete verification."));
        }
      });
    }
    onChangeAddressInput(event) {
      var email, newAddress, oldAddress;
      email = this.currentData();
      oldAddress = (email != null ? email.address : void 0) || null;
      newAddress = this.$(event.target).val();
      if (oldAddress) {
        Meteor.call(RA.User.removeEmail, oldAddress);
      }
      if (newAddress.length) {
        Meteor.call(RA.User.addEmail, newAddress, error => {
          var message;
          if (error) {
            message = "Something went wrong with adding the email. ".concat(error.message);
          } else {
            message = "Email added. Please verify it by clicking the red verified field next to it.";
          }
          return LOI.adventure.showActivatableModalDialog({
            dialog: new LOI.Components.Dialog({
              message: message,
              buttons: [{
                text: "OK"
              }]
            })
          });
        });
      }
      // Also clear new address input, since we've processed it (or it was already empty, so this is a nop).
      return this.$('.new-address-input').val('');
    }
    onChangePrimaryInput(event) {
      var primaryAddress;
      primaryAddress = this.$('.primary-input:checked').val();
      return Meteor.call(RA.User.setPrimaryEmail, primaryAddress);
    }
  }
  ;
  General.register('LandsOfIllusions.Components.Account.General');
  General.initialize();

  // Components
  General.Username = function () {
    class Username extends AM.DataInputComponent {
      onCreated() {
        super.onCreated(...arguments);
        return this._userBabelSubscription = AB.subscribeNamespace('Retronator.Accounts.User');
      }
      load() {
        var ref, user;
        user = RA.User.documents.findOne(Meteor.userId(), {
          fields: {
            'profile.name': 1
          }
        });
        return user != null ? (ref = user.profile) != null ? ref.name : void 0 : void 0;
      }
      save(value) {
        return Meteor.call("Retronator.Accounts.User.rename", value);
      }
      placeholder() {
        return AB.translate(this._userBabelSubscription, 'Anonymous').text;
      }
    }
    ;
    Username.register('LandsOfIllusions.Components.Account.General.Username');
    return Username;
  }.call(this);
  return General;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.general.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/general/template.general.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account.General");
Template["LandsOfIllusions.Components.Account.General"] = new Template("Template.LandsOfIllusions.Components.Account.General", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-account-general"
  }, HTML.Raw("\n    <h2>Registration</h2>\n    <h3>Name</h3>\n    "), HTML.DIV({
    class: "account-name"
  }, "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "General", "Username"));
  }), "\n    "), HTML.Raw("\n    <h3>Emails</h3>\n    "), HTML.TABLE({
    class: "emails"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("user"), "registered_emails"));
  }, function() {
    return [ "\n        ", HTML.TR({
      class: "email"
    }, "\n          ", HTML.TD({
      class: "address"
    }, "\n            ", HTML.INPUT({
      class: "address-input",
      type: "email",
      value: function() {
        return Spacebars.mustache(view.lookup("address"));
      }
    }), "\n          "), "\n          ", HTML.TD({
      class: "primary"
    }, "\n            ", HTML.LABEL({
      class: "primary-label"
    }, "\n              ", HTML.INPUT(HTML.Attrs({
      class: "primary-input",
      type: "radio",
      name: "primary",
      value: function() {
        return Spacebars.mustache(view.lookup("address"));
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("primaryCheckedAttribute"));
    })), HTML.IMG({
      class: "checkmark",
      src: function() {
        return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/general/primary-checkmark.png");
      }
    }), "\n            "), "\n          "), "\n          ", HTML.TD({
      class: "verified"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("verified"));
    }, function() {
      return [ "\n              ", HTML.IMG({
        class: "stamp",
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/general/verified-stamp.png");
        }
      }), "\n            " ];
    }, function() {
      return HTML.Raw('\n              <button class="verify-email-button"></button>\n            ');
    }), "\n          "), "\n        "), "\n      " ];
  }), "\n      ", HTML.TR({
    class: "email"
  }, "\n        ", HTML.TD({
    class: "address"
  }, "\n          ", HTML.INPUT({
    class: "address-input new-address-input",
    type: "email",
    placeholder: function() {
      return Spacebars.mustache(view.lookup("t7e"), "Write new email here");
    }
  }), "\n        "), HTML.Raw('\n        <td class="primary"></td>\n        <td class="verified"></td>\n      ')), "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("emptyLines"));
  }, function() {
    return [ "\n        ", HTML.TR({
      class: "email new-email"
    }, HTML.Raw('\n          <td class="address"></td>\n          <td class="primary"></td>\n          <td class="verified"></td>\n        ')), "\n      " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$lt"), view.lookup("emailsCount"), 5);
  }, function() {
    return [ HTML.Raw('\n      <p class="smallprint">Primary email is used for contacting you.</p>\n      '), Blaze.If(function() {
      return Spacebars.call(view.lookup("emailsCount"));
    }, function() {
      return [ "\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("hasUnverifiedEmails"));
      }, function() {
        return HTML.Raw('\n          <p class="smallprint">Verify your email by clicking on the red verified field.</p>\n        ');
      }), "\n      " ];
    }, function() {
      return HTML.Raw('\n        <p class="smallprint">For your purchases to be applied, email must be entered and verified.</p>\n      ');
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"services":{"services.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/services/services.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  HQ,
  LOI,
  RA,
  indexOf = [].indexOf;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
LOI.Components.Account.Services = function () {
  class Services extends LOI.Components.Account.Page {
    static url() {
      return 'services';
    }
    static displayName() {
      return 'Linked services';
    }
    onCreated() {
      super.onCreated(...arguments);
      return Retronator.Accounts.User.servicesForCurrentUser.subscribe();
    }
    loginServices() {
      return ['Password', 'Facebook', 'Twitter', 'Google'];
    }
    otherServices() {
      return ['Patreon'];
    }
    loginServiceEnabled() {
      var ref, serviceName, user;
      serviceName = this.currentData();
      user = Meteor.user();
      if ((user != null ? user.loginServices : void 0) == null) {
        return;
      }
      return ref = _.lowerCase(serviceName), indexOf.call(user.loginServices, ref) >= 0;
    }
    otherServiceEnabled() {
      var ref, serviceName, user;
      serviceName = this.currentData();
      user = Meteor.user();
      if ((user != null ? user.otherServices : void 0) == null) {
        return;
      }
      return ref = _.lowerCase(serviceName), indexOf.call(user.otherServices, ref) >= 0;
    }
    stampUrl() {
      var serviceName;
      serviceName = this.currentData();
      return "/landsofillusions/components/account/services/".concat(_.lowerCase(serviceName), ".png");
    }

    // Events
    events() {
      return super.events(...arguments).concat({
        'click .link-service-button': this.onClickLinkService,
        'click .stamp': this.onClickStamp
      });
    }
    onClickLinkService(event) {
      var serviceName;
      serviceName = this.currentData();
      switch (serviceName) {
        case 'Password':
          return Meteor.call(RA.User.sendPasswordResetEmail, function (error) {
            if (error) {
              LOI.adventure.showDialogMessage(error.message);
              return;
            }
            return LOI.adventure.showDialogMessage("We sent a password reset email to your contact email address.\nUse it to set the password for your account.");
          });
        default:
          return Meteor["linkWith".concat(serviceName)]();
      }
    }
    onClickStamp(event) {
      var buttons, dialog, loginServices, message, moreInfo, serviceName, user;
      serviceName = this.currentData();
      loginServices = this.loginServices();
      if (serviceName === 'Password') {
        message = "Do you want to change your password? We will send you an email with a link to reset your password.";
        buttons = [{
          text: "Send",
          value: true
        }, {
          text: "Cancel"
        }];
      } else if (indexOf.call(loginServices, serviceName) >= 0) {
        // Make sure the user doesn't have just one login service (so we don't allow removing it).
        user = Meteor.user();
        if (user.loginServices.length <= 1) {
          message = "This is your only way to sign in to your account. If you want to remove this service, please add another way to sign in first.";
          buttons = [{
            text: "OK"
          }];
        } else {
          message = "Do you want to remove this service? You will not be able to use this service to sign into this account anymore.";
          buttons = [{
            text: "Remove",
            value: true
          }, {
            text: "Cancel"
          }];
        }
      } else if (serviceName === 'Patreon') {
        message = "Do you want to remove the link to your Patreon membership? The rewards from you Patreon tier will\nbe removed, unless you also have your Patreon email added and confirmed on the Registration page.";
        moreInfo = "If you recently changed your pledge and you do not see your tier applied on the Purchases page,\nwe might not have updated our data yet. Click on the Refresh button to update now.";
        buttons = [{
          text: "Remove",
          value: true
        }, {
          text: "Refresh",
          value: 'refresh'
        }, {
          text: "Cancel"
        }];
      }
      dialog = new LOI.Components.Dialog({
        message,
        moreInfo,
        buttons
      });
      return LOI.adventure.showActivatableModalDialog({
        dialog: dialog,
        callback: () => {
          if (dialog.result === true) {
            if (serviceName === 'Password') {
              return Meteor.call(RA.User.sendPasswordResetEmail, function (error) {
                if (error) {
                  LOI.adventure.showDialogMessage(error.message);
                }
              });
            } else {
              return RA.User.unlinkService(serviceName, function (error) {
                if (error) {
                  LOI.adventure.showDialogMessage(error.message);
                }
              });
            }
          } else if (dialog.result === 'refresh') {
            RA.Patreon.updateCurrentPledge(function (error) {
              if (error) {
                LOI.adventure.showDialogMessage(error.message);
              }
            });
            return LOI.adventure.showDialogMessage("Pledge update might take a minute to complete.\nIf any changes are detected, you will see an update on the Purchases page.");
          }
        }
      });
    }
  }
  ;
  Services.register('LandsOfIllusions.Components.Account.Services');
  Services.initialize();
  return Services;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.services.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/services/template.services.js                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account.Services");
Template["LandsOfIllusions.Components.Account.Services"] = new Template("Template.LandsOfIllusions.Components.Account.Services", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-account-services"
  }, HTML.Raw("\n    <h2>Linked services</h2>\n    <h3>Sign-in methods</h3>\n    "), HTML.UL({
    class: "services"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("loginServices"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "service"
    }, "\n          ", HTML.SPAN({
      class: "name"
    }, Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("loginServiceEnabled"));
    }, function() {
      return [ "\n            ", HTML.IMG({
        class: function() {
          return [ "stamp ", Spacebars.mustache(view.lookup("toLower"), view.lookup(".")) ];
        },
        src: function() {
          return Spacebars.mustache(view.lookup("image"), view.lookup("stampUrl"));
        }
      }), "\n          " ];
    }, function() {
      return HTML.Raw('\n            <button class="link-service-button"></button>\n          ');
    }), "\n        "), "\n      " ];
  }), "\n    "), HTML.Raw("\n    <h3>Other connections</h3>\n    "), HTML.UL({
    class: "services"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("otherServices"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "service"
    }, HTML.Raw('\n          <span class="name">Patreon</span>\n          '), Blaze.If(function() {
      return Spacebars.call(view.lookup("otherServiceEnabled"));
    }, function() {
      return [ "\n            ", HTML.IMG({
        class: "stamp patreon",
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/services/patreon.png");
        }
      }), "\n          " ];
    }, function() {
      return HTML.Raw('\n            <button class="link-service-button patreon"></button>\n          ');
    }), "\n        "), "\n      " ];
  }), HTML.Raw('\n      <li class="service"></li>\n    ')), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"characters":{"characters.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/characters/characters.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, HQ, LOI, RA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
LOI.Components.Account.Characters = function () {
  class Characters extends LOI.Components.Account.Page {
    static url() {
      return 'characters';
    }
    static displayName() {
      return 'Characters';
    }
    constructor() {
      super(...arguments);
      // We want to be able to set the selected user even before the page gets rendered,
      // so that it's already displaying it when the account is turned to the characters page.
      this.selectedCharacterId = new ReactiveField(null);
    }
    onCreated() {
      super.onCreated(...arguments);
      LOI.Character.forCurrentUser.subscribe(this);
      this.selectedCharacter = new ComputedField(() => {
        return LOI.Character.documents.findOne(this.selectedCharacterId());
      });
      return this.fullNameInput = new this.constructor.CharacterNameTranslationInput({
        characterId: this.selectedCharacterId
      });
    }
    renderFullNameInput() {
      return this.fullNameInput.renderComponent(this.currentComponent());
    }
    characters() {
      var ref;
      return (ref = Retronator.user()) != null ? ref.characters : void 0;
    }
    emptyLines() {
      var charactersCount, i, j, ref, ref1, results;
      charactersCount = ((ref = this.characters()) != null ? ref.length : void 0) || 0;
      if (charactersCount >= 5) {
        return;
      }
      results = [];
      for (i = j = ref1 = charactersCount; ref1 <= 5 ? j < 5 : j > 5; i = ref1 <= 5 ? ++j : --j) {
        // Return an array with enough elements to pad the characters list to 5 rows.
        results.push('');
      }
      return results;
    }
    dialogPreviewStyle() {
      var character, color;
      // Set the color to character's color.
      character = this.currentData();
      color = LOI.Avatar.colorObject(character.avatar.color);
      return {
        color: "#".concat(color.getHexString())
      };
    }
    showLoadButtonClass() {
      var character;
      character = this.currentData();
      if (character._id !== LOI.characterId()) {
        // We need to show the load button unless this is the current character.
        return 'show-load-button';
      }
    }

    // Events
    events() {
      return super.events(...arguments).concat({
        'click .new-character': this.onClickNewCharacter,
        'click .load-character': this.onClickLoadCharacter,
        'click .unload-character': this.onClickUnloadCharacter
      });
    }
    onClickNewCharacter(event) {
      return Meteor.call('LandsOfIllusions.Character.insert', Meteor.userId());
    }
    onClickLoadCharacter(event) {
      var characterId;
      characterId = this.currentData()._id;
      return this.selectedCharacterId(characterId);
    }
    onClickUnloadCharacter(event) {
      return this.selectedCharacterId(null);
    }
  }
  ;
  Characters.register('LandsOfIllusions.Components.Account.Characters');
  Characters.initialize();
  Characters.CharacterNameTranslationInput = function () {
    class CharacterNameTranslationInput extends LOI.Components.TranslationInput {
      template() {
        return 'LandsOfIllusions.Components.TranslationInput';
      }
      constructor(options) {
        super(...arguments);
        // Note: We extend options directly since we want to refer to this
        // object in callbacks (@ could not be used inside a call to super).
        _.extend(this.options, {
          realtime: false,
          newTranslationLanguage: '',
          addTranslationText: () => {
            return this.translation("Add language variant");
          },
          removeTranslationText: () => {
            return this.translation("Remove language variant");
          },
          placeholderText: () => {
            return LOI.Character.Avatar.noNameTranslation();
          },
          placeholderInTargetLanguage: true,
          onTranslationInserted: (languageRegion, value) => {
            return LOI.Character.updateName(options.characterId(), languageRegion, value);
          },
          onTranslationUpdated: (languageRegion, value) => {
            LOI.Character.updateName(options.characterId(), languageRegion, value);
            // Return true to prevent the default update to be executed.
            return true;
          }
        });
      }
    }
    ;
    CharacterNameTranslationInput.register('LandsOfIllusions.Components.Account.Characters.CharacterNameTranslationInput');
    return CharacterNameTranslationInput;
  }.call(this);
  Characters.CharacterColorHue = function () {
    class CharacterColorHue extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = 'select';
      }
      options() {
        var j, len, palette, ramp, rampIndex, ref, results;
        if (!(palette = LOI.palette())) {
          return;
        }
        ref = palette.ramps;
        results = [];
        for (rampIndex = j = 0, len = ref.length; j < len; rampIndex = ++j) {
          ramp = ref[rampIndex];
          results.push({
            value: rampIndex,
            name: ramp.name
          });
        }
        return results;
      }
      load() {
        var ref, ref1, ref2;
        return ((ref = this.data()) != null ? (ref1 = ref.avatar) != null ? (ref2 = ref1.color) != null ? ref2.hue : void 0 : void 0 : void 0) || 0;
      }
      save(value) {
        // Change the hue part of color.
        return LOI.Character.updateColor(this.data()._id, parseInt(value));
      }
      placeholder() {
        var ref;
        return (ref = this.data()) != null ? ref.displayName() : void 0;
      }
    }
    ;
    CharacterColorHue.register('LandsOfIllusions.Components.Account.Characters.CharacterColorHue');
    return CharacterColorHue;
  }.call(this);
  Characters.CharacterColorShade = function () {
    class CharacterColorShade extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = 'select';
      }
      options() {
        var j, len, name, ref, results, shadeIndex;
        ref = ['darkest', 'darker', 'normal', 'lighter', 'lightest'];
        results = [];
        for (shadeIndex = j = 0, len = ref.length; j < len; shadeIndex = ++j) {
          name = ref[shadeIndex];
          results.push({
            value: shadeIndex - 2,
            name: name
          });
        }
        return results;
      }
      load() {
        var ref, ref1, ref2;
        return ((ref = this.data()) != null ? (ref1 = ref.avatar) != null ? (ref2 = ref1.color) != null ? ref2.shade : void 0 : void 0 : void 0) || 0;
      }
      save(value) {
        // Change the shade part of color.
        return LOI.Character.updateColor(this.data()._id, null, parseInt(value));
      }
      placeholder() {
        var ref;
        return (ref = this.data()) != null ? ref.displayName() : void 0;
      }
    }
    ;
    CharacterColorShade.register('LandsOfIllusions.Components.Account.Characters.CharacterColorShade');
    return CharacterColorShade;
  }.call(this);
  Characters.CharacterPronouns = function () {
    class CharacterPronouns extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.Select;
      }
      options() {
        var name, ref, results, value;
        ref = LOI.Avatar.Pronouns;
        results = [];
        for (value in ref) {
          name = ref[value];
          results.push({
            value,
            name
          });
        }
        return results;
      }
      load() {
        var character, ref;
        character = this.data();
        return ((ref = character.avatar) != null ? ref.pronouns : void 0) || LOI.Avatar.Pronouns.Neutral;
      }
      save(value) {
        var character;
        character = this.data();
        return LOI.Character.updatePronouns(character._id, value);
      }
    }
    ;
    CharacterPronouns.register('LandsOfIllusions.Components.Account.Characters.CharacterPronouns');
    return CharacterPronouns;
  }.call(this);
  return Characters;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.characters.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/characters/template.characters.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account.Characters");
Template["LandsOfIllusions.Components.Account.Characters"] = new Template("Template.LandsOfIllusions.Components.Account.Characters", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-account-characters"
  }, HTML.Raw("\n  <h2>Characters</h2>\n  <h3>Character selection</h3>\n  <p>Available characters are:</p>\n  "), HTML.UL({
    class: "characters"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("characters"));
  }, function() {
    return [ "\n      ", HTML.LI({
      class: "character"
    }, "\n        ", HTML.BUTTON({
      class: "load-character"
    }, "\n          ", Blaze.View("lookup:t7e", function() {
      return Spacebars.mustache(view.lookup("t7e"), Spacebars.dot(view.lookup("avatar"), "fullName"));
    }), "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("activated"));
    }, function() {
      return [ "\n            ", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("designApproved"));
      }, function() {
        return "\n              (design revoked)\n            ";
      }), "\n          " ];
    }, function() {
      return "\n            (draft)\n          ";
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("emptyLines"));
  }, function() {
    return HTML.Raw('\n      <li class="character"></li>\n    ');
  }), "\n  "), "\n  ", Blaze.Unless(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("characters"), "length"));
  }, function() {
    return HTML.Raw('\n    <p class="smallprint">\n      You do not have any characters.\n      Create them at the Cyborg Construction Center in the game.\n    </p>\n  ');
  }), "\n  ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("selectedCharacter"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "character-sheet"
    }, "\n      ", HTML.IMG({
      class: "paperclip",
      src: function() {
        return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/paperclip-right.png");
      }
    }), HTML.Raw('\n      <button class="unload-character"></button>\n      <h4 class="title">Character Sheet</h4>\n      '), HTML.DIV({
      class: "properties"
    }, "\n        ", HTML.DIV({
      class: "property name"
    }, "\n          ", HTML.LABEL({
      class: "label"
    }, HTML.Raw('\n            <span class="name">Name</span>\n            '), HTML.SPAN({
      class: "value"
    }, "\n              ", Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("avatar"), "fullName"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("renderFullNameInput"));
    }), "\n            "), "\n          "), "\n        "), "\n        ", HTML.DIV({
      class: "property pronouns"
    }, "\n          ", HTML.LABEL({
      class: "label"
    }, HTML.Raw('\n            <span class="name">Pronouns</span>\n            '), HTML.SPAN({
      class: "value"
    }, "\n              ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Characters", "CharacterPronouns"));
    }), "\n            "), "\n          "), "\n        "), "\n        ", HTML.DIV({
      class: "property dialog-color-hue"
    }, "\n          ", HTML.LABEL({
      class: "label"
    }, HTML.Raw('\n            <span class="name">Dialog color</span>\n            '), HTML.SPAN({
      class: "value"
    }, "\n              ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Characters", "CharacterColorHue"));
    }), "\n            "), "\n          "), "\n        "), "\n        ", HTML.DIV({
      class: "property dialog-color-shade"
    }, "\n          ", HTML.LABEL({
      class: "label"
    }, HTML.Raw('\n            <span class="name">Shade</span>\n            '), HTML.SPAN({
      class: "value"
    }, "\n              ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Characters", "CharacterColorShade"));
    }), "\n            "), "\n          "), "\n        "), "\n      "), HTML.Raw('\n      <p class="preview-caption">Preview</p>\n      '), HTML.DIV(HTML.Attrs({
      class: "dialog-preview"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("dialogPreviewStyle"));
    }), "\n        I'm not just saying this to be clever, I'm also saying it because it's true.\n      "), "\n    "), "\n  " ];
  }), "\n");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"inventory":{"inventory.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/inventory/inventory.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  AM,
  HQ,
  LOI,
  RA,
  RS,
  indexOf = [].indexOf;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
RS = Retronator.Store;
LOI.Components.Account.Inventory = function () {
  class Inventory extends LOI.Components.Account.Page {
    static url() {
      return 'inventory';
    }
    static displayName() {
      return 'Inventory';
    }
    renderRaw() {
      return true;
    }
    onCreated() {
      super.onCreated(...arguments);
      RS.Item.all.subscribe(this);
      // Subscribe to item names.
      this.autorun(computation => {
        var i, item, len, ref, results;
        ref = this.items();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          if (item.name) {
            results.push(AB.Translation.forId.subscribe(this, item.name._id, AB.languagePreference()));
          }
        }
        return results;
      });
      this.otherSide = new ReactiveField(false);
      // Split items between two pages.
      this.pageItems = new ComputedField(() => {
        var bracketIndex, firstPage, i, item, itemCount, items, j, len, len1, pageItemLimit, ref, secondPage, targetPage;
        firstPage = [[], [], []];
        secondPage = [[], [], []];
        pageItemLimit = 9;
        itemCount = 0;
        ref = [this.pixelArtAcademyItems(), this.rewardItems(), this.accessItems()];
        for (bracketIndex = i = 0, len = ref.length; i < len; bracketIndex = ++i) {
          items = ref[bracketIndex];
          for (j = 0, len1 = items.length; j < len1; j++) {
            item = items[j];
            targetPage = itemCount > pageItemLimit ? secondPage : firstPage;
            targetPage[bracketIndex].push(item);
            itemCount++;
          }
        }
        return [firstPage, secondPage];
      });
      return this.selectedItem = new ReactiveField(null);
    }
    items() {
      var i, item, items, len, ref;
      if (!(items = (ref = Retronator.user()) != null ? ref.items : void 0)) {
        return [];
      }
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        item.refresh();
      }
      return items;
    }
    pixelArtAcademyItems() {
      var addKeys, bundleKeys, i, item, items, j, k, len, len1, len2, pixelArtAcademyKeys, ref, ref1, ref2, selectedItems, value;
      items = this.items();
      selectedItems = [];
      // First add any bundle the user owns.
      bundleKeys = [];
      addKeys = bundles => {
        var i, len, ref, results, value;
        ref = _.values(bundles);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          value = ref[i];
          if (_.isObject(value)) {
            results.push(addKeys(value));
          } else {
            results.push(bundleKeys.push(value));
          }
        }
        return results;
      };
      addKeys(RS.Items.CatalogKeys.Bundles.PixelArtAcademy);
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if (ref = item.catalogKey, indexOf.call(bundleKeys, ref) >= 0) {
          selectedItems.push(item);
        }
      }
      // Add all the game items.
      pixelArtAcademyKeys = [];
      ref1 = _.values(RS.Items.CatalogKeys.PixelArtAcademy);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        value = ref1[j];
        if (_.isString(value)) {
          pixelArtAcademyKeys.push(value);
        }
      }
      // Add avatar keys.
      pixelArtAcademyKeys.push(RS.Items.CatalogKeys.LandsOfIllusions.Character.Avatar.AvatarEditor);
      // Now filter items to valid keys.
      for (k = 0, len2 = items.length; k < len2; k++) {
        item = items[k];
        if (ref2 = item.catalogKey, indexOf.call(pixelArtAcademyKeys, ref2) >= 0) {
          selectedItems.push(item);
        }
      }
      return selectedItems;
    }
    rewardItems() {
      var avatarKeys, i, item, items, len, patreonKeys, ref, rewardKeys, selectedItems;
      items = this.items();
      selectedItems = [];
      // Add all the kickstarter-exclusive items.
      rewardKeys = _.flatten([_.values(RS.Items.CatalogKeys.PixelArtAcademy.Kickstarter), _.values(RS.Items.CatalogKeys.PixelArtAcademy.Help)]);
      // Add avatar keys.
      avatarKeys = RS.Items.CatalogKeys.LandsOfIllusions.Character.Avatar;
      rewardKeys = rewardKeys.concat([avatarKeys.CustomItem, avatarKeys.UniqueItem, avatarKeys.UniqueCustomAvatar]);
      // Add Patreon keys.
      patreonKeys = RS.Items.CatalogKeys.Retronator.Patreon;
      rewardKeys = rewardKeys.concat([patreonKeys.PatreonKeycard, patreonKeys.EarlyBirdKeycard]);
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if (ref = item.catalogKey, indexOf.call(rewardKeys, ref) >= 0) {
          selectedItems.push(item);
        }
      }
      return selectedItems;
    }
    accessItems() {
      var accessKeys, i, item, items, len, ref, selectedItems;
      items = this.items();
      selectedItems = [];
      // Add all the kickstarter-exclusive items.
      accessKeys = _.values(RS.Items.CatalogKeys.Retropolis);
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if (ref = item.catalogKey, indexOf.call(accessKeys, ref) >= 0) {
          selectedItems.push(item);
        }
      }
      return selectedItems;
    }
    displayedPixelArtAcademyItems() {
      var pageIndex;
      pageIndex = this.otherSide() ? 1 : 0;
      return this.pageItems()[pageIndex][0];
    }
    displayedRewardItems() {
      var pageIndex;
      pageIndex = this.otherSide() ? 1 : 0;
      return this.pageItems()[pageIndex][1];
    }
    displayedAccessItems() {
      var pageIndex;
      pageIndex = this.otherSide() ? 1 : 0;
      return this.pageItems()[pageIndex][2];
    }
    showMoreRewards() {
      return !this.otherSide() && this.pageItems()[1][1].length;
    }
    showMoreAccess() {
      return !this.otherSide() && this.pageItems()[1][2].length;
    }
    name() {
      var item, name;
      item = this.currentData();
      if (!item.name) {
        return "";
      }
      item.name.refresh();
      if (!(name = AB.translate(item.name).text)) {
        return "";
      }
      name = name.replace("—", "-");
      return name;
    }
    pixelArtAcademyItemName() {
      var name;
      name = this.name();
      name = name.replace("Pixel Art Academy - ", "");
      name = name.replace("Pixel Art Academy ", "");
      name = name.replace("Lands of Illusions - ", "");
      return name;
    }
    keycardClass() {
      var keycardClass, keycardKey, keycards, kickstarterKeys, patreonKeys, user;
      if (!(user = Retronator.user())) {
        return;
      }
      kickstarterKeys = RS.Items.CatalogKeys.PixelArtAcademy.Kickstarter;
      keycards = {
        white: kickstarterKeys.WhiteKeycard,
        yellow: kickstarterKeys.YellowKeycard,
        cyan: kickstarterKeys.CyanKeycard,
        green: kickstarterKeys.GreenKeycard,
        magenta: kickstarterKeys.MagentaKeycard,
        red: kickstarterKeys.RedKeycard,
        blue: kickstarterKeys.BlueKeycard,
        black: kickstarterKeys.BlackKeycard,
        zx: kickstarterKeys.ZXBlackKeycard,
        nes: kickstarterKeys.NESBlackKeycard
      };
      for (keycardClass in keycards) {
        keycardKey = keycards[keycardClass];
        if (user.hasItem(keycardKey)) {
          return keycardClass;
        }
      }
      patreonKeys = RS.Items.CatalogKeys.Retronator.Patreon;
      if (user.hasItem(patreonKeys.EarlyBirdKeycard)) {
        return 'patreon-early';
      }
      if (user.hasItem(patreonKeys.PatreonKeycard)) {
        return 'patreon';
      }
      // Otherwise return the default player keycard.
      return 'default';
    }
    keycardImage() {
      return this.versionedUrl("/landsofillusions/components/account/inventory/keycards/".concat(this.keycardClass(), ".png"));
    }
    otherSideClass() {
      if (this.otherSide()) {
        return 'other-side';
      }
    }
    showTurn() {
      var group, pageItems;
      pageItems = this.pageItems()[1];
      return _.sum(function () {
        var i, len, results;
        results = [];
        for (i = 0, len = pageItems.length; i < len; i++) {
          group = pageItems[i];
          results.push(group.length);
        }
        return results;
      }());
    }
    events() {
      return super.events(...arguments).concat({
        'click .turn': this.onClickTurn,
        'click .item .name': this.onClickItemName,
        'click': this.onClick
      });
    }
    onClickTurn(event) {
      var $page;
      this.otherSide(!this.otherSide());
      this.selectedItem(null);
      $page = $(event.target).closest('.page');
      return $page.toggleClass('flipped');
    }
    onClickItemName(event) {
      var item;
      item = this.currentData();
      return this.selectedItem(item);
    }
    onClick(event) {
      if ($(event.target).closest('.item .name').length) {
        return;
      }
      return this.selectedItem(null);
    }
  }
  ;
  Inventory.register('LandsOfIllusions.Components.Account.Inventory');
  Inventory.initialize();
  return Inventory;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.inventory.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/inventory/template.inventory.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account.Inventory");
Template["LandsOfIllusions.Components.Account.Inventory"] = new Template("Template.LandsOfIllusions.Components.Account.Inventory", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "landsofillusions-components-account-inventory ", Spacebars.mustache(view.lookup("otherSideClass")) ];
    }
  }, "\n    ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("otherSide"));
  }, function() {
    return [ HTML.Raw("\n      <h2>Inventory</h2>\n      <p>You are the proud owner of:</p>\n      "), Blaze.Unless(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("items"), "length"));
    }, function() {
      return HTML.Raw('\n        <ul class="items">\n          <li class="item">This lonely access keycard. You can buy other things in Retronator HQ store in the game.</li>\n        </ul>\n        <p class="smallprint bottom">\n          Make sure you verified your email if you think you\'re missing purchases.\n        </p>\n      ');
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayedPixelArtAcademyItems"));
  }, function() {
    return [ HTML.Raw('\n      <p class="category">Pixel Art Academy</p>\n      '), HTML.UL({
      class: "items"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("displayedPixelArtAcademyItems"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Inventory", "item"));
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayedRewardItems"));
  }, function() {
    return [ HTML.Raw('\n      <p class="category">Rewards</p>\n      '), HTML.UL({
      class: "items"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("displayedRewardItems"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Inventory", "item"));
      }), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showMoreRewards"));
    }, function() {
      return HTML.Raw('\n          <li class="more">...</li>\n        ');
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("displayedAccessItems"));
  }, function() {
    return [ HTML.Raw('\n      <p class="category">Keycard access</p>\n      '), HTML.UL({
      class: "items"
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("displayedAccessItems"));
    }, function() {
      return [ "\n          ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Inventory", "item"));
      }), "\n        " ];
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("showMoreAccess"));
    }, function() {
      return HTML.Raw('\n          <li class="more">...</li>\n        ');
    }), "\n      "), "\n    " ];
  }), "\n    ", HTML.IMG({
    class: "clamp",
    src: function() {
      return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/wide-clamp-right.png");
    }
  }), "\n    ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("otherSide"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: function() {
        return [ "keycard ", Spacebars.mustache(view.lookup("keycardClass")) ];
      }
    }, "\n        ", HTML.DIV({
      class: "name"
    }, Blaze.View("lookup:currentUser.displayName", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "displayName"));
    })), "\n        ", HTML.IMG({
      class: "card",
      src: function() {
        return Spacebars.mustache(view.lookup("image"), view.lookup("keycardImage"));
      }
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showTurn"));
  }, function() {
    return [ "\n      ", HTML.BUTTON({
      class: "turn"
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("otherSide"));
    }, function() {
      return [ "\n          turn page ", HTML.IMG({
        class: "arrow",
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/next.png");
        }
      }), "\n        " ];
    }, function() {
      return [ "\n          ", HTML.IMG({
        class: "arrow",
        src: function() {
          return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/previous.png");
        }
      }), " turn page\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("selectedItem"));
  }, function() {
    return [ "\n      ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("selectedItem"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "selected-item"
      }, "\n          ", HTML.DIV({
        class: "content"
      }, HTML.Raw('\n            <div class="unload-info"></div>\n            '), HTML.P(Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("description"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t9n"));
      })), "\n          "), "\n        "), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("LandsOfIllusions.Components.Account.Inventory.item");
Template["LandsOfIllusions.Components.Account.Inventory.item"] = new Template("Template.LandsOfIllusions.Components.Account.Inventory.item", (function() {
  var view = this;
  return HTML.LI({
    class: "item"
  }, "\n    ", HTML.SPAN({
    class: "name"
  }, Blaze.View("lookup:pixelArtAcademyItemName", function() {
    return Spacebars.mustache(view.lookup("pixelArtAcademyItemName"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"transactions":{"transactions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/transactions/transactions.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, HQ, LOI, RA, RS;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
RS = Retronator.Store;
LOI.Components.Account.Transactions = function () {
  class Transactions extends LOI.Components.Account.Page {
    static url() {
      return 'purchases';
    }
    static displayName() {
      return 'Purchases';
    }
    onCreated() {
      super.onCreated(...arguments);
      RA.User.twitterScreenNameForCurrentUser.subscribe(this);
      this.subscribe(Retronator.Accounts.User.supportAmountForCurrentUser);
      this.subscribe(Retronator.Accounts.User.storeDataForCurrentUser);
      RS.Item.all.subscribe(this);
      this.subscribe(Retronator.Store.Transaction.forCurrentUser);
      Retronator.Store.Payment.forCurrentUser.subscribe(this);
      this.showCreditInfo = new ReactiveField(false);
      this.showAuthorizedPaymentsInfo = new ReactiveField(false);
      this.showPatreonInfo = new ReactiveField(false);
      return this.currentTransaction = new ReactiveField(null);
    }
    supportAmount() {
      var ref;
      return (ref = Retronator.user()) != null ? ref.supportAmount : void 0;
    }
    showSupporterName() {
      var ref, ref1;
      return (ref = Retronator.user()) != null ? (ref1 = ref.profile) != null ? ref1.showSupporterName : void 0 : void 0;
    }
    anonymousCheckboxAttributes() {
      if (!this.showSupporterName()) {
        return {
          checked: true
        };
      }
    }
    transactions() {
      var item, j, k, len, len1, ref, transaction, transactions;
      transactions = Retronator.Store.Transaction.findTransactionsForUser(Retronator.user());
      if (!transactions) {
        return;
      }
      transactions = transactions.fetch();
      // We only want to show transactions that were actual purchases (they have items).
      transactions = _.filter(transactions, transaction => {
        return transaction.items;
      });
      // Remove all patreon transactions.
      transactions = _.filter(transactions, transaction => {
        return !_.find(transaction.payments, function (payment) {
          return payment.type === RS.Payment.Types.PatreonPledge;
        });
      });
      // Refresh all items to get their names.
      for (j = 0, len = transactions.length; j < len; j++) {
        transaction = transactions[j];
        if (transaction.items) {
          ref = transaction.items;
          for (k = 0, len1 = ref.length; k < len1; k++) {
            item = ref[k];
            item.item.refresh();
          }
        }
      }
      return _.sortBy(transactions, 'time');
    }
    invalidClass() {
      var transactionOrPayment;
      transactionOrPayment = this.currentData();
      if (transactionOrPayment.invalid) {
        return 'invalid';
      }
    }
    payment() {
      var embeddedPayment;
      embeddedPayment = this.currentData();
      return RS.Payment.documents.findOne(embeddedPayment._id);
    }
    emptyLines() {
      var emptyLines, endingCount, endingMessages, i, j, linesCount, ref, ref1, results, transactionsCount;
      transactionsCount = ((ref = this.transactions()) != null ? ref.length : void 0) || 0;
      endingMessages = [this.showCurrentPatreonPledge(), this.showPositiveBalance(), this.showAuthorizedOnly()];
      // See how many ending messages we have, otherwise set it to one since we'll generate one (end listing).
      endingCount = Math.max(1, _.sumBy(endingMessages, function (messagePresent) {
        if (messagePresent) {
          return 1;
        } else {
          return 0;
        }
      }));
      if (!transactionsCount) {
        // If we don't have any transactions, the ending message is 5 lines long.
        endingCount += 5;
      }
      linesCount = transactionsCount + endingCount;
      // There should be at least one empty line and the total should be at least 5
      emptyLines = Math.max(1, 5 - linesCount);
      if ((linesCount + emptyLines) % 2 === 0) {
        // Make sure we have an odd number of lines.
        emptyLines++;
      }
      results = [];
      for (i = j = 0, ref1 = emptyLines; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
        // Return an array with an element for every empty line.
        results.push('');
      }
      return results;
    }
    showCurrentPatreonPledge() {
      var ref;
      return (ref = this.authorizedPaymentsAmount()) != null ? ref.PatreonPledge : void 0;
    }
    showPositiveBalance() {
      var ref, ref1;
      return (ref = Retronator.user()) != null ? (ref1 = ref.store) != null ? ref1.credit : void 0 : void 0;
    }
    showAuthorizedOnly() {
      var ref;
      return (ref = this.authorizedPaymentsAmount()) != null ? ref.StripePayment : void 0;
    }
    showEndListing() {
      // Only show end listing if no other messages will be present.
      return !_.some([this.showCurrentPatreonPledge(), this.showPositiveBalance(), this.showAuthorizedOnly()]);
    }
    dateText() {
      var languagePreference, transaction;
      transaction = this.currentData();
      languagePreference = AB.languagePreference();
      return transaction.time.toLocaleDateString(languagePreference, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
    }
    authorizedOnlyClass() {
      var transaction;
      transaction = this.currentData();
      if (_.find(transaction.payments, payment => {
        return payment.authorizedOnly;
      })) {
        return 'authorized-only';
      }
    }
    claimLink() {
      var item;
      item = this.currentData();
      return item.givenGift.keyCode;
    }
    paymentAmount() {
      var payment;
      payment = this.currentData();
      return payment.amount || payment.storeCreditAmount;
    }
    authorizedPaymentsAmount() {
      var ref;
      return (ref = Retronator.user()) != null ? ref.authorizedPaymentsAmount() : void 0;
    }

    // Events
    events() {
      return super.events(...arguments).concat({
        'change .anonymous-checkbox': this.onChangeAnonymousCheckbox,
        'click .load-credit-info': this.onClickLoadCreditInfo,
        'click .load-authorized-payments-info': this.onClickLoadAuthorizedPaymentsInfo,
        'click .load-patreon-info': this.onClickLoadPatreonInfo,
        'click .info-note': this.onClickInfoNote,
        'click .load-transaction': this.onClickLoadTransaction,
        'click': this.onClick
      });
    }
    onChangeAnonymousCheckbox(event) {
      return Meteor.call("Retronator.Accounts.User.setShowSupporterName", !event.target.checked);
    }
    onClickLoadCreditInfo(event) {
      this.showCreditInfo(true);
      this.showAuthorizedPaymentsInfo(false);
      this.currentTransaction(null);
      return this.showPatreonInfo(false);
    }
    onClickLoadPatreonInfo(event) {
      this.showPatreonInfo(true);
      this.showCreditInfo(false);
      this.showAuthorizedPaymentsInfo(false);
      return this.currentTransaction(null);
    }
    onClickLoadAuthorizedPaymentsInfo(event) {
      this.showCreditInfo(false);
      this.showAuthorizedPaymentsInfo(true);
      this.currentTransaction(null);
      return this.showPatreonInfo(false);
    }
    onClickInfoNote(event) {
      this.showCreditInfo(false);
      this.showAuthorizedPaymentsInfo(false);
      return this.showPatreonInfo(false);
    }
    onClickLoadTransaction(event) {
      var transaction;
      transaction = this.currentData();
      this.currentTransaction(transaction);
      this.showCreditInfo(false);
      this.showAuthorizedPaymentsInfo(false);
      return this.showPatreonInfo(false);
    }
    onClick(event) {
      if ($(event.target).closest('.load-transaction').length) {
        return;
      }
      return this.currentTransaction(null);
    }
  }
  ;
  Transactions.register('LandsOfIllusions.Components.Account.Transactions');
  Transactions.initialize();

  // Components
  Transactions.SupporterMessage = function () {
    class SupporterMessage extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.TextArea;
      }
      load() {
        var ref, user;
        user = RA.User.documents.findOne(Meteor.userId(), {
          fields: {
            'profile.supporterMessage': 1
          }
        });
        return user != null ? (ref = user.profile) != null ? ref.supporterMessage : void 0 : void 0;
      }
      save(value) {
        return Meteor.call("Retronator.Accounts.User.setSupporterMessage", value);
      }
      placeholder() {
        return this.translate('Add a message to supporters list').text;
      }
    }
    ;
    SupporterMessage.register('LandsOfIllusions.Components.Account.Transactions.SupporterMessage');
    return SupporterMessage;
  }.call(this);
  return Transactions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.transactions.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/transactions/template.transactions.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account.Transactions");
Template["LandsOfIllusions.Components.Account.Transactions"] = new Template("Template.LandsOfIllusions.Components.Account.Transactions", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-account-transactions"
  }, HTML.Raw("\n    <h2>Purchases</h2>\n    <h3>Your support</h3>\n    "), HTML.DIV({
    class: "support-area"
  }, "\n      ", HTML.P("Total contribution: ", HTML.SPAN({
    class: "support-amount"
  }, "$", Blaze.View("lookup:supportAmount", function() {
    return Spacebars.mustache(view.lookup("supportAmount"));
  })), "."), "\n      ", HTML.P("\n        ", HTML.LABEL({
    class: "anonymous-area"
  }, "\n          ", HTML.INPUT(HTML.Attrs({
    class: "anonymous-checkbox",
    type: "checkbox"
  }, function() {
    return Spacebars.attrMustache(view.lookup("anonymousCheckboxAttributes"));
  })), HTML.Raw('\n          <span class="label">show as anonymous</span>\n        ')), "\n      "), "\n      ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "Transactions", "SupporterMessage"));
  }), "\n    "), "\n    ", HTML.DIV({
    class: "purchase-history"
  }, "\n      ", HTML.IMG({
    class: "clamp",
    src: function() {
      return Spacebars.mustache(view.lookup("image"), "/landsofillusions/components/account/clamp-right.png");
    }
  }), HTML.Raw('\n      <h3 class="title">Purchase history</h3>\n      '), HTML.TABLE({
    class: "transactions"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("transactions"));
  }, function() {
    return [ "\n          ", HTML.TR({
      class: function() {
        return [ "transaction ", Spacebars.mustache(view.lookup("invalidClass")) ];
      }
    }, "\n            ", HTML.TD({
      class: "date"
    }, "\n              ", HTML.BUTTON({
      class: "action load-transaction"
    }, "\n                ", Blaze.View("lookup:dateText", function() {
      return Spacebars.mustache(view.lookup("dateText"));
    }), "\n              "), "\n            "), "\n            ", HTML.TD({
      class: function() {
        return [ "total ", Spacebars.mustache(view.lookup("authorizedOnlyClass")) ];
      }
    }, "$", Blaze.View("lookup:totalValue", function() {
      return Spacebars.mustache(view.lookup("totalValue"));
    })), "\n          "), "\n        " ];
  }), "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("emptyLines"));
  }, function() {
    return [ "\n          ", HTML.TR({
      class: "transaction"
    }, HTML.Raw('\n            <td class="description" colspan="2">\n            </td>\n          ')), "\n        " ];
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showEndListing"));
  }, function() {
    return [ "\n          ", HTML.TR({
      class: "transaction"
    }, HTML.Raw('\n            <td class="description" colspan="2">\n              end listing\n            </td>\n          ')), "\n        " ];
  }, function() {
    return [ "\n          ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("authorizedPaymentsAmount"), "StripePayment"));
    }, function() {
      return [ "\n            ", HTML.TR({
        class: "transaction"
      }, HTML.Raw('\n              <td class="description">\n                <button class="action load-authorized-payments-info">\n                  Total authorized\n                </button>\n              </td>\n              '), HTML.TD({
        class: "total"
      }, "$", Blaze.View("lookup:authorizedPaymentsAmount.StripePayment", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("authorizedPaymentsAmount"), "StripePayment"));
      })), "\n            "), "\n          " ];
    }), "\n          ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("currentUser"), "store", "credit"));
    }, function() {
      return [ "\n            ", HTML.TR({
        class: "transaction"
      }, HTML.Raw('\n              <td class="description">\n                <button class="action load-credit-info">\n                  Positive balance\n                </button>\n              </td>\n              '), HTML.TD({
        class: "total"
      }, "$", Blaze.View("lookup:currentUser.store.credit", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "store", "credit"));
      })), "\n            "), "\n          " ];
    }), "\n          ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("authorizedPaymentsAmount"), "PatreonPledge"));
    }, function() {
      return [ "\n            ", HTML.TR({
        class: "transaction"
      }, HTML.Raw('\n              <td class="description">\n                <button class="action load-patreon-info">\n                  Current Patreon pledge\n                </button>\n              </td>\n              '), HTML.TD({
        class: "total"
      }, "$", Blaze.View("lookup:authorizedPaymentsAmount.PatreonPledge", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("authorizedPaymentsAmount"), "PatreonPledge"));
      })), "\n            "), "\n          " ];
    }), "\n        " ];
  }), "\n      "), "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("transactions"), "length"));
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("authorizedPaymentsAmount"), "StripePayment"));
    }, function() {
      return HTML.Raw('\n          <p class="smallprint">Authorized only</p>\n        ');
    }), "\n      " ];
  }, function() {
    return HTML.Raw("\n        <p class=\"smallprint\">\n          You haven't made any purchases yet.\n          Make sure you verified your email if you think you're missing purchases.\n        </p>\n      ");
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showCreditInfo"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "info-note"
    }, "\n          ", HTML.DIV({
      class: "content"
    }, HTML.Raw('\n            <div class="unload-info"></div>\n            '), HTML.P("Your have a positive account balance of $", Blaze.View("lookup:currentUser.store.credit", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "store", "credit"));
    }), "."), HTML.Raw("\n            <p>You can use it to purchase items in the store.</p>\n          ")), "\n        "), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showAuthorizedPaymentsInfo"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "info-note"
    }, "\n          ", HTML.DIV({
      class: "content"
    }, HTML.Raw('\n            <div class="unload-info"></div>\n            '), HTML.P("You have authorized $", Blaze.View("lookup:authorizedPaymentsAmount.StripePayment", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("authorizedPaymentsAmount"), "StripePayment"));
    }), " of payments."), HTML.Raw("\n            <p>They will be collected when you get\n            access to the first gameplay chapter in 2017. You will be emailed beforehand in case you need to cancel\n            any purchase at that time.</p>\n          ")), "\n        "), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showPatreonInfo"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "info-note"
    }, "\n          ", HTML.DIV({
      class: "content"
    }, HTML.Raw('\n            <div class="unload-info"></div>\n            '), HTML.P("Your are currently pledging $", Blaze.View("lookup:authorizedPaymentsAmount.PatreonPledge", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("authorizedPaymentsAmount"), "PatreonPledge"));
    }), " on Patreon."), HTML.Raw("\n            <p>This will be converted into positive store balance at the end of the month when your pledge is processed.</p>\n          ")), "\n        "), "\n      " ];
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentTransaction"));
  }, function() {
    return [ "\n      ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("currentTransaction"));
    }, function() {
      return [ "\n        ", HTML.DIV({
        class: "receipt"
      }, HTML.Raw('\n          <button class="unload-transaction"></button>\n          <h3 class="receipt-title">Retronator<br>Store</h3>\n          '), HTML.DIV({
        class: "date"
      }, Blaze.View("lookup:dateText", function() {
        return Spacebars.mustache(view.lookup("dateText"));
      })), HTML.Raw("\n          <div>----------------------</div>\n          "), Blaze.If(function() {
        return Spacebars.call(view.lookup("items"));
      }, function() {
        return [ "\n            ", HTML.OL({
          class: "shopping-cart-items"
        }, "\n              ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("items"));
        }, function() {
          return [ "\n                ", HTML.LI({
            class: "cart-item"
          }, "\n                  ", HTML.SPAN({
            class: "name"
          }, "\n                    ", Blaze._TemplateWith(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("item"), "name"));
          }, function() {
            return Spacebars.include(view.lookupTemplate("t9n"));
          }), "\n                  "), "\n                  ", Blaze.If(function() {
            return Spacebars.call(view.lookup("price"));
          }, function() {
            return [ "\n                    ", HTML.SPAN({
              class: "price"
            }, "$", Blaze.View("lookup:price", function() {
              return Spacebars.mustache(view.lookup("price"));
            })), "\n                  " ];
          }), "\n                  ", Blaze.If(function() {
            return Spacebars.call(view.lookup("receivedGift"));
          }, function() {
            return [ "\n                    ", HTML.DIV({
              class: "gift"
            }, "\n                      ", HTML.P("Gift from ", Blaze.View("lookup:receivedGift.transaction.ownerDisplayName", function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("receivedGift"), "transaction", "ownerDisplayName"));
            })), "\n                    "), "\n                  " ];
          }), "\n                  ", Blaze.If(function() {
            return Spacebars.call(view.lookup("givenGift"));
          }, function() {
            return [ "\n                    ", HTML.DIV({
              class: "gift"
            }, "\n                      ", Blaze.If(function() {
              return Spacebars.call(Spacebars.dot(view.lookup("givenGift"), "transaction"));
            }, function() {
              return [ "\n                        ", HTML.P("Gift claimed by ", Blaze.View("lookup:givenGift.transaction.ownerDisplayName", function() {
                return Spacebars.mustache(Spacebars.dot(view.lookup("givenGift"), "transaction", "ownerDisplayName"));
              }), "."), "\n                      " ];
            }, function() {
              return [ HTML.Raw("\n                        <p>This item is a gift. Give this link to the recipient so they can claim it:</p>\n                        "), HTML.P("\n                          ", HTML.DIV({
                class: "gift-link"
              }, "\n                            ", HTML.A({
                href: function() {
                  return Spacebars.mustache(view.lookup("claimLink"));
                },
                target: "_blank"
              }, Blaze.View("lookup:claimLink", function() {
                return Spacebars.mustache(view.lookup("claimLink"));
              })), "\n                          "), "\n                        "), HTML.Raw("\n                        <p>* You can click the link to see what they will see.</p>\n                      ") ];
            }), "\n                    "), "\n                  " ];
          }), "\n                "), "\n              " ];
        }), "\n              ", Blaze.If(function() {
          return Spacebars.call(view.lookup("tip"));
        }, function() {
          return [ "\n                ", Blaze.If(function() {
            return Spacebars.call(Spacebars.dot(view.lookup("tip"), "amount"));
          }, function() {
            return [ "\n                  ", HTML.LI({
              class: "cart-item"
            }, "\n                      ", HTML.SPAN({
              class: "name"
            }, "\n                        ", Blaze.View("lookup:t7e", function() {
              return Spacebars.mustache(view.lookup("t7e"), "Tip");
            }), "\n                      "), "\n                    ", HTML.SPAN({
              class: "price"
            }, "$", Blaze.View("lookup:tip.amount", function() {
              return Spacebars.mustache(Spacebars.dot(view.lookup("tip"), "amount"));
            })), "\n                  "), "\n                " ];
          }), "\n              " ];
        }), "\n            "), HTML.Raw("\n            <div>----------------------</div>\n            "), HTML.OL({
          class: "receipt-items"
        }, "\n              ", HTML.LI({
          class: "receipt-item"
        }, HTML.Raw('\n                <span class="name">Total</span>\n                '), HTML.SPAN({
          class: "price"
        }, "$", Blaze.View("lookup:totalValue", function() {
          return Spacebars.mustache(view.lookup("totalValue"));
        })), "\n              "), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("tip"), "message"));
      }, function() {
        return [ "\n            ", HTML.DIV({
          class: "tip"
        }, HTML.Raw('\n              <p class="title">Tip message</p>\n              '), HTML.DIV({
          class: "message"
        }, "\n                ", Blaze.View("lookup:tip.message", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("tip"), "message"));
        }), "\n              "), "\n            "), "\n          " ];
      }), "\n          ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("payments"), "length"));
      }, function() {
        return [ "\n            ", HTML.DIV({
          class: "payment-area"
        }, HTML.Raw('\n              <p class="title">Payment</p>\n              '), HTML.UL({
          class: "payments"
        }, "\n                ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("payments"));
        }, function() {
          return [ "\n                  ", HTML.LI({
            class: function() {
              return [ "payment ", Spacebars.mustache(view.lookup("invalidClass")) ];
            }
          }, "\n                    ", Blaze.View("lookup:type", function() {
            return Spacebars.mustache(view.lookup("type"));
          }), " - $", Blaze.View("lookup:paymentAmount", function() {
            return Spacebars.mustache(view.lookup("paymentAmount"));
          }), "\n                    ", Blaze.If(function() {
            return Spacebars.call(view.lookup("authorizedOnly"));
          }, function() {
            return "\n                      (authorized only)\n                    ";
          }), "\n                    ", Blaze.If(function() {
            return Spacebars.call(view.lookup("invalid"));
          }, function() {
            return [ "\n                      ", Spacebars.With(function() {
              return Spacebars.call(view.lookup("payment"));
            }, function() {
              return [ "\n                        ", Blaze.If(function() {
                return Spacebars.call(Spacebars.dot(view.lookup("chargeError"), "failureMessage"));
              }, function() {
                return [ "\n                          ", HTML.P("\n                            ", Blaze.View("lookup:chargeError.failureMessage", function() {
                  return Spacebars.mustache(Spacebars.dot(view.lookup("chargeError"), "failureMessage"));
                }), "\n                          "), "\n                        " ];
              }), "\n                      " ];
            }), "\n                    " ];
          }), "\n                  "), "\n                " ];
        }), "\n              "), "\n            "), "\n          " ];
      }), HTML.Raw('\n          <p>======================</p>\n          <div class="receipt-bottom">\n            <p>Thank you for your support!</p>\n          </div>\n        ')), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"paymentmethods":{"paymentmethods.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/paymentmethods/paymentmethods.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, HQ, LOI, RA, RS;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
HQ = Retronator.HQ;
RA = Retronator.Accounts;
RS = Retronator.Store;
LOI.Components.Account.PaymentMethods = function () {
  class PaymentMethods extends LOI.Components.Account.Page {
    static url() {
      return 'payment-methods';
    }
    static displayName() {
      return 'Payment methods';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.stripeInitialized = new ReactiveField(false);
      this.stripeEnabled = false;
      return RS.PaymentMethod.forCurrentUser.subscribe(this);
    }
    onRendered() {
      var initializeStripeInterval, ref;
      super.onRendered(...arguments);
      if ((ref = Meteor.settings.public.stripe) != null ? ref.publishableKey : void 0) {
        this.stripeEnabled = true;
        return initializeStripeInterval = Meteor.setInterval(() => {
          // Wait until checkout is ready.
          if (typeof StripeCheckout === "undefined" || StripeCheckout === null) {
            return;
          }
          Meteor.clearInterval(initializeStripeInterval);
          this._stripeCheckout = StripeCheckout.configure({
            key: Meteor.settings.public.stripe.publishableKey,
            image: '/retronator/hq/items/receipt/stripe-marketplace-icon.png',
            name: 'Retronator',
            panelLabel: 'Add card',
            locale: 'auto',
            token: token => {
              return RS.PaymentMethod.insertStripe(token.id, token.email);
            }
          });
          return this.stripeInitialized(true);
        }, 100);
      } else {
        return console.warn("Set Stripe public and secret key in the settings file if you want to enable Stripe purchases.");
      }
    }
    paymentMethods() {
      return RS.PaymentMethod.documents.find();
    }
    moreThan2Class() {
      if (this.paymentMethods().count() > 2) {
        return 'more-than-2';
      }
    }
    events() {
      return super.events(...arguments).concat({
        'click .add-stripe-button': this.onClickAddStripeButton
      });
    }
    onClickAddStripeButton(event) {
      return this._stripeCheckout.open();
    }
  }
  ;
  PaymentMethods.register('LandsOfIllusions.Components.Account.PaymentMethods');
  PaymentMethods.initialize();
  PaymentMethods.Stripe = function () {
    class Stripe extends AM.Component {
      onCreated() {
        super.onCreated(...arguments);
        this.customerData = new ReactiveField(null);
        return this.loading = new ReactiveField(false);
      }
      openedClass() {
        if (this.customerData()) {
          return 'opened';
        }
      }
      loadingClass() {
        if (this.loading()) {
          return 'loading';
        }
      }
      events() {
        return super.events(...arguments).concat({
          'click .case': this.onClickCase,
          'click .remove-button': this.onClickRemoveButton
        });
      }
      onClickCase(event) {
        var paymentMethod;
        // Clear data if we're already showing it.
        if (this.customerData()) {
          this.customerData(null);
          return;
        }
        this.loading(true);
        paymentMethod = this.data();
        return RS.PaymentMethod.getStripeCustomerData(paymentMethod._id, (error, customerData) => {
          this.loading(false);
          if (error) {
            console.error(error);
            return;
          }
          return this.customerData(customerData);
        });
      }
      onClickRemoveButton(event) {
        var dialog, paymentMethod;
        paymentMethod = this.data();
        dialog = new LOI.Components.Dialog({
          message: "Do you really want to remove this payment method?",
          buttons: [{
            text: "Remove",
            value: true
          }, {
            text: "Cancel"
          }]
        });
        return LOI.adventure.showActivatableModalDialog({
          dialog: dialog,
          callback: () => {
            if (!dialog.result) {
              return;
            }
            return RS.PaymentMethod.removeStripe(paymentMethod._id);
          }
        });
      }
    }
    ;
    Stripe.register('LandsOfIllusions.Components.Account.PaymentMethods.Stripe');
    return Stripe;
  }.call(this);
  return PaymentMethods;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.paymentmethods.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/account/paymentmethods/template.paymentmethods.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Account.PaymentMethods");
Template["LandsOfIllusions.Components.Account.PaymentMethods"] = new Template("Template.LandsOfIllusions.Components.Account.PaymentMethods", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-account-paymentmethods"
  }, HTML.Raw("\n    <h2>Payment methods</h2>\n    <p>You have these payment methods stored for purchases:</p>\n    "), Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("paymentMethods"), "count"));
  }, function() {
    return [ "\n      ", HTML.UL({
      class: function() {
        return [ "payment-methods ", Spacebars.mustache(view.lookup("moreThan2Class")) ];
      }
    }, "\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("paymentMethods"));
    }, function() {
      return [ "\n          ", HTML.LI({
        class: "payment-method"
      }, "\n            ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("$is"), view.lookup("type"), "Stripe");
      }, function() {
        return [ "\n              ", Spacebars.include(function() {
          return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Account", "PaymentMethods", "Stripe"));
        }), "\n            " ];
      }), "\n          "), "\n        " ];
    }), "\n      "), "\n    " ];
  }, function() {
    return HTML.Raw("\n      <p>None</p>\n    ");
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("stripeInitialized"));
  }, function() {
    return HTML.Raw('\n      <div class="add-sheet">\n        <p class="instructions">Add new payment method:</p>\n        <button class="add-payment-method-button add-stripe-button">Credit card</button>\n      </div>\n    ');
  }), "\n    ", HTML.SCRIPT({
    src: "https://checkout.stripe.com/checkout.js"
  }), "\n  ");
}));

Template.__checkName("LandsOfIllusions.Components.Account.PaymentMethods.Stripe");
Template["LandsOfIllusions.Components.Account.PaymentMethods.Stripe"] = new Template("Template.LandsOfIllusions.Components.Account.PaymentMethods.Stripe", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-account-paymentmethods-stripe"
  }, "\n    ", HTML.DIV({
    class: "case-area"
  }, HTML.Raw('\n      <div class="tape">\n        <button class="remove-button">Remove</button>\n      </div>\n      '), HTML.DIV({
    class: function() {
      return [ "case ", Spacebars.mustache(view.lookup("loadingClass")), " ", Spacebars.mustache(view.lookup("openedClass")) ];
    }
  }, HTML.Raw('\n        <div class="label stripe"></div>\n        '), HTML.DIV({
    class: "card"
  }, "\n          ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("customerData"));
  }, function() {
    return [ "\n            ", HTML.DIV({
      class: "name"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n            ", HTML.DIV({
      class: "number"
    }, "XX-XX-XX-", Blaze.View("lookup:number", function() {
      return Spacebars.mustache(view.lookup("number"));
    })), "\n            ", HTML.DIV({
      class: "expiration"
    }, Blaze.View("lookup:expiration.month", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("expiration"), "month"));
    }), "/", Blaze.View("lookup:expiration.year", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("expiration"), "year"));
    })), "\n            ", HTML.DIV({
      class: "brand"
    }, Blaze.View("lookup:brand", function() {
      return Spacebars.mustache(view.lookup("brand"));
    })), "\n          " ];
  }, function() {
    return [ "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("loading"));
    }, function() {
      return HTML.Raw('\n                <div class="loading">Loading</div>\n              ');
    }, function() {
      return HTML.Raw('\n                <div class="view-details">View details</div>\n              ');
    }), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"dialogs":{"dialog.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/dialogs/dialog.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, AM, LOI;
AC = Artificial.Control;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.Dialog = function () {
  class Dialog extends AM.Component {
    constructor(options) {
      super(...arguments);
      this.options = options;
      this.activatable = new LOI.Components.Mixins.Activatable();
      this.result = null;
    }
    mixins() {
      return [this.activatable];
    }
    events() {
      return super.events(...arguments).concat({
        'click .button': this.onClickButton
      });
    }
    onClickButton(event) {
      var button;
      button = this.currentData();
      this.result = button.value;
      return this.activatable.deactivate();
    }
  }
  ;
  Dialog.register('LandsOfIllusions.Components.Dialog');
  return Dialog;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.dialog.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/dialogs/template.dialog.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Dialog");
Template["LandsOfIllusions.Components.Dialog"] = new Template("Template.LandsOfIllusions.Components.Dialog", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-dialog"
  }, "\n    ", HTML.DIV({
    class: "dialog-overlay"
  }, "\n      ", HTML.DIV({
    class: "dialog"
  }, "\n        ", HTML.DIV({
    class: "message"
  }, Spacebars.include(view.lookupTemplate("Markdown"), function() {
    return Blaze.View("lookup:options.message", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("options"), "message"));
    });
  })), "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("options"), "moreInfo"));
  }, function() {
    return [ "\n          ", HTML.DIV({
      class: "more-info"
    }, Spacebars.include(view.lookupTemplate("Markdown"), function() {
      return Blaze.View("lookup:options.moreInfo", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("options"), "moreInfo"));
      });
    })), "\n        " ];
  }), "\n        ", HTML.UL({
    class: "buttons"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("options"), "buttons"));
  }, function() {
    return [ "\n            ", HTML.BUTTON({
      class: "button"
    }, Blaze.View("lookup:text", function() {
      return Spacebars.mustache(view.lookup("text"));
    })), "\n          " ];
  }), "\n        "), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"sprite":{"sprite.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/sprite/sprite.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
LOI.Components.Sprite = function () {
  // Renders a sprite asset to a canvas.
  class Sprite extends AM.Component {
    onRendered() {
      var $canvas, canvas, context;
      super.onRendered(...arguments);
      $canvas = this.$('.landsofillusions-components-sprite');
      canvas = $canvas[0];
      context = canvas.getContext('2d');

      // Subscribe to this sprite's palette.
      this.autorun(computation => {
        var spriteData;
        spriteData = this.data();
        return LOI.Assets.Palette.forId.subscribeContent(this, spriteData.palette._id);
      });
      return this.autorun(computation => {
        var color, i, imageData, indexedColor, len, maxShade, palette, pixel, pixelIndex, ramp, ref, shade, spriteData, x, y;
        spriteData = this.data();
        if (!(spriteData != null ? spriteData.pixels.length : void 0)) {
          return;
        }
        palette = LOI.Assets.Palette.documents.findOne(spriteData.palette._id);
        if (!palette) {
          return;
        }
        canvas.width = spriteData.bounds.width;
        canvas.height = spriteData.bounds.height;
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        ref = spriteData.pixels;
        for (i = 0, len = ref.length; i < len; i++) {
          pixel = ref[i];
          x = pixel.x - spriteData.bounds.x;
          y = pixel.y - spriteData.bounds.y;
          pixelIndex = (x + y * canvas.width) * 4;
          indexedColor = spriteData.colorMap[pixel.colorIndex] || {
            ramp: 0,
            shade: 0
          };
          ramp = indexedColor.ramp;
          maxShade = palette.ramps[ramp].shades.length - 1;
          shade = THREE.MathUtils.clamp(indexedColor.shade + pixel.relativeShade, 0, maxShade);
          color = THREE.Color.fromObject(palette.ramps[ramp].shades[shade]);
          imageData.data[pixelIndex] = color.r * 255;
          imageData.data[pixelIndex + 1] = color.g * 255;
          imageData.data[pixelIndex + 2] = color.b * 255;
          imageData.data[pixelIndex + 3] = 255;
        }
        return context.putImageData(imageData, 0, 0);
      });
    }
  }
  ;
  Sprite.register('LandsOfIllusions.Components.Sprite');
  return Sprite;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.sprite.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/sprite/template.sprite.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Sprite");
Template["LandsOfIllusions.Components.Sprite"] = new Template("Template.LandsOfIllusions.Components.Sprite", (function() {
  var view = this;
  return HTML.Raw('<canvas class="landsofillusions-components-sprite"></canvas>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"computer":{"computer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/computer/computer.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Vocabulary;
LOI = LandsOfIllusions;
Vocabulary = LOI.Parser.Vocabulary;
LOI.Components.Computer = class Computer extends LOI.Adventure.Item {
  onDeactivate(finishedDeactivatingCallback) {
    return Meteor.setTimeout(() => {
      return finishedDeactivatingCallback();
    }, 500);
  }
  onCreated() {
    super.onCreated(...arguments);
    this.currentScreen = new ReactiveField(null);
    return this.activeDialog = new ReactiveField(null);
  }
  switchToScreen(screen) {
    return this.currentScreen(screen);
  }
  showDialog(dialog) {
    return this.activeDialog(dialog);
  }
  backButtonCallback() {
    return () => {
      var currentScreen;
      // See if the current screen wants to perform a different action for the back button.
      currentScreen = this.currentScreen();
      if (currentScreen.backButtonCallback) {
        return currentScreen.backButtonCallback();
      } else if (this.activeDialog()) {
        // We're showing a dialog, so just cancel it.
        return this.activeDialog(null);
      } else {
        // None of the special cases occurred, close the terminal as usual.
        return LOI.adventure.deactivateActiveItem();
      }
    };
  }
  events() {
    return super.events(...arguments).concat({
      'click .confirm-button': this.onClickConfirmButton,
      'click .cancel-button': this.onClickCancelButton
    });
  }
  onClickConfirmButton(event) {
    this.activeDialog().confirmAction();
    return this.activeDialog(null);
  }
  onClickCancelButton(event) {
    return this.activeDialog(null);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.computer.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/computer/template.computer.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.Computer");
Template["LandsOfIllusions.Components.Computer"] = new Template("Template.LandsOfIllusions.Components.Computer", (function() {
  var view = this;
  return HTML.DIV({
    class: "landsofillusions-components-computer"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.dataMustache(view.lookup("args"), view.lookup("backButtonCallback"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "BackButton"));
    });
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("LandsOfIllusions"), "Components", "Overlay"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "display"
    }, "\n        ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("currentScreen"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("activeDialog"));
    }, function() {
      return [ "\n          ", Spacebars.With(function() {
        return Spacebars.call(view.lookup("activeDialog"));
      }, function() {
        return [ "\n            ", HTML.DIV({
          class: "dialog-area"
        }, "\n              ", HTML.DIV({
          class: "dialog"
        }, "\n                ", HTML.DIV({
          class: "message"
        }, Blaze.View("lookup:message", function() {
          return Spacebars.mustache(view.lookup("message"));
        })), "\n                ", HTML.DIV({
          class: "actions"
        }, "\n                  ", Blaze.If(function() {
          return Spacebars.call(view.lookup("confirmButtonText"));
        }, function() {
          return [ "\n                    ", HTML.BUTTON({
            class: function() {
              return [ "action-button confirm-button ", Spacebars.mustache(view.lookup("confirmButtonClass")) ];
            }
          }, Blaze.View("lookup:confirmButtonText", function() {
            return Spacebars.mustache(view.lookup("confirmButtonText"));
          })), "\n                  " ];
        }), "\n                  ", Blaze.If(function() {
          return Spacebars.call(view.lookup("cancelButtonText"));
        }, function() {
          return [ "\n                    ", HTML.BUTTON({
            class: function() {
              return [ "action-button cancel-button ", Spacebars.mustache(view.lookup("cancelButtonClass")) ];
            }
          }, Blaze.View("lookup:cancelButtonText", function() {
            return Spacebars.mustache(view.lookup("cancelButtonText"));
          })), "\n                  " ];
        }), "\n                "), "\n              "), "\n            "), "\n          " ];
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"embeddedwebpage":{"embeddedwebpage.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/embeddedwebpage/embeddedwebpage.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI;
AM = Artificial.Mirage;
AB = Artificial.Base;
LOI = LandsOfIllusions;
LOI.Components.EmbeddedWebpage = class EmbeddedWebpage extends AM.Component {
  onCreated() {
    var adventure, ancestorWithUrl;
    super.onCreated(...arguments);
    adventure = this.ancestorComponentOfType(LOI.Adventure);
    if (adventure) {
      this.embedded = true;
    }
    if (this.embedded) {
      this.display = new this.constructor.Display(this, adventure.interface.display, {
        // Safe area size accommodates for embedded browser's header and scrollbar.
        safeAreaWidth: 310,
        safeAreaHeight: 180
      });
      ancestorWithUrl = this.ancestorComponentWith('url');
      return this.router = new this.constructor.Router(this, (value, options) => {
        return ancestorWithUrl.url(value, options);
      });
    } else {
      this.display = new AM.Display({
        safeAreaWidth: 320,
        safeAreaHeight: 240,
        minScale: LOI.settings.graphics.minimumScale.value,
        maxScale: LOI.settings.graphics.maximumScale.value
      });
      return this.router = AB.Router;
    }
  }
  onRendered() {
    super.onRendered(...arguments);
    if (this.embedded) {
      this.$root = $('.webpage-embed-root');
    } else {
      this.$root = $('html');
    }
    this.$root.addClass(this.rootClass());
    if (this.display instanceof this.constructor.Display) {
      return this.display.initialize();
    }
  }
  onDestroyed() {
    super.onDestroyed(...arguments);
    this.$root.removeClass(this.rootClass());
    if (this.display instanceof this.constructor.Display) {
      this.display.destroy();
    }
    if (this.router instanceof this.constructor.Router) {
      return this.router.destroy();
    }
  }
  rootClass() {
    // Override to style the root element.
    return '';
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.embeddedwebpage.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/embeddedwebpage/template.embeddedwebpage.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("LandsOfIllusions.Components.EmbeddedWebpage");
Template["LandsOfIllusions.Components.EmbeddedWebpage"] = new Template("Template.LandsOfIllusions.Components.EmbeddedWebpage", (function() {
  var view = this;
  return [ Blaze.Unless(function() {
    return Spacebars.call(view.lookup("embedded"));
  }, function() {
    return [ "\n    ", HTML.STYLE("\n      html {\n        font-size: ", Blaze.View("lookup:display.scale", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("display"), "scale"));
    }), "px;\n      }\n    "), "\n    ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("display"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("Render"));
    }), "\n  " ];
  }), "\n  ", HTML.DIV({
    class: "landsofillusions-components-embeddedwebpage"
  }, "\n    ", Blaze._InOuterTemplateScope(view, function() {
    return Spacebars.include(function() {
      return Spacebars.call(view.templateContentBlock);
    });
  }), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"display.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/embeddedwebpage/display.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
LOI.Components.EmbeddedWebpage.Display = class Display {
  constructor(embeddedWebpage, rootDisplay, options) {
    var createField;
    this.embeddedWebpage = embeddedWebpage;
    this.rootDisplay = rootDisplay;
    // We allow sending in our own reactive functions, but if they are not present, we create our own field.
    createField = function (name) {
      if (_.isFunction(options[name])) {
        return options[name];
      } else {
        return new ReactiveField(options[name]);
      }
    };
    this.safeAreaWidth = createField('safeAreaWidth');
    this.safeAreaHeight = createField('safeAreaHeight');
    this.viewport = new ReactiveField({
      viewportBounds: new AE.Rectangle(),
      maxBounds: new AE.Rectangle(),
      safeArea: new AE.Rectangle()
    });
  }
  initialize() {
    // Update viewport when page root changes.
    this._resizeObserver = new ResizeObserver(() => {
      return this._updateViewport();
    });
    return this._resizeObserver.observe(this.embeddedWebpage.$root[0]);
  }
  destroy() {
    return this._resizeObserver.disconnect();
  }
  scale() {
    return this.rootDisplay.scale();
  }
  _updateViewport() {
    var clientHeight, clientWidth, maxBounds, safeArea, safeAreaHeight, safeAreaWidth, scale, scaledSafeAreaHeight, scaledSafeAreaWidth, viewportBounds, viewportSize;
    scale = this.scale();
    safeAreaWidth = this.safeAreaWidth();
    safeAreaHeight = this.safeAreaHeight();
    clientWidth = this.embeddedWebpage.$root.outerWidth();
    clientHeight = this.embeddedWebpage.$root.outerHeight();
    // Calculate safe area size at decided scale level.
    scaledSafeAreaWidth = safeAreaWidth * scale;
    scaledSafeAreaHeight = safeAreaHeight * scale;
    // Calculate viewport size. Make sure it is not smaller than the safe area size.
    viewportSize = {
      width: Math.max(clientWidth, scaledSafeAreaWidth),
      height: Math.max(clientHeight, scaledSafeAreaHeight)
    };
    // Viewport bounds are the visible area of the embedded webpage root.
    viewportBounds = new AE.Rectangle({
      x: 0,
      y: 0,
      width: Math.round(viewportSize.width),
      height: Math.round(viewportSize.height)
    });
    // Maximum bounds are the same as viewport bounds since we currently don't support crop bars in embedded pages.
    maxBounds = viewportBounds.clone();
    // Safe area is relative to the viewport (it will always be contained within).
    safeArea = new AE.Rectangle({
      x: Math.round((viewportSize.width - scaledSafeAreaWidth) * 0.5),
      y: Math.round((viewportSize.height - scaledSafeAreaHeight) * 0.5),
      width: Math.round(scaledSafeAreaWidth),
      height: Math.round(scaledSafeAreaHeight)
    });
    return this.viewport({
      viewportBounds: viewportBounds,
      maxBounds: maxBounds,
      safeArea: safeArea
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_landsofillusions-ui/components/embeddedwebpage/router.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI;
AE = Artificial.Everywhere;
AB = Artificial.Base;
LOI = LandsOfIllusions;
LOI.Components.EmbeddedWebpage.Router = class Router {
  constructor(embeddedWebpage, urlField) {
    this.embeddedWebpage = embeddedWebpage;
    this.urlField = urlField;
    this.currentRouteData = new ReactiveField(null);
    // Minimize reactivity by isolating different parts of the route.
    this.currentParameters = new ComputedField(() => {
      var ref;
      return (ref = this.currentRouteData()) != null ? ref.parameters : void 0;
    }, EJSON.equals, true);
    this.currentRoute = new ComputedField(() => {
      var ref;
      return (ref = this.currentRouteData()) != null ? ref.route : void 0;
    }, (a, b) => {
      return a === b;
    }, true);
    this.currentRouteName = new ComputedField(() => {
      var ref;
      return (ref = this.currentRoute()) != null ? ref.name : void 0;
    }, true);
    this.currentRoutePath = new ComputedField(() => {
      var ref;
      return (ref = this.currentRouteData()) != null ? ref.path : void 0;
    }, true);
    // Update route data based on the URL.
    this._urlUpdateAutorun = Tracker.autorun(computation => {
      var currentRouteData, host, matchData, path, route, searchParameters, url;
      url = new URL(this.urlField());
      host = url.hostname;
      path = url.pathname;
      searchParameters = url.searchParams;
      ({
        route,
        matchData
      } = AB.Router.findRoute(host, path));
      if (matchData) {
        currentRouteData = _.extend({
          route,
          path,
          host,
          searchParameters
        }, matchData);
        return this.currentRouteData(currentRouteData);
      } else {
        return this.currentRouteData(null);
      }
    });
  }
  destroy() {
    this.currentParameters.stop();
    this.currentRoute.stop();
    this.currentRouteName.stop();
    this.currentRoutePath.stop();
    return this._urlUpdateAutorun.stop();
  }
  getParameter(parameter) {
    return this.currentParameters()[parameter];
  }
  changeParameter(parameter, value) {
    var parameters;
    // We need to clone the parameters before we change them, since otherwise we'd be
    // changing the original with which the computed field will compare the new array.
    parameters = _.clone(this.currentParameters());
    parameters[parameter] = value;
    return this.setParameters(parameters);
  }
  setParameters(parameters) {
    return this.goToRoute(this.currentRouteName(), parameters);
  }
  goToRoute(routeName, parameters) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var url;
    // Find the URL for this route.
    if (!(url = AB.Router.createUrl(routeName, parameters))) {
      return;
    }
    return this.goToUrl(url, options);
  }
  goToUrl(url) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.urlField(url, options);
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

require("/node_modules/meteor/retronator:landsofillusions-ui/interface/interface.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/components/components.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/components/narrative.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/components/commandinput.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/components/dialogueselection.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/components/audiomanager.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/text.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/template.text.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/text-initialization.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/text-narrative.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/text-handlers.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/text-nodehandling.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/text-resizing.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/interface/text/text-scrolling.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/overlay/overlay.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/overlay/template.overlay.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/backbutton/backbutton.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/backbutton/template.backbutton.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/signin/signin.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/signin/template.signin.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/savegame/savegame.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/savegame/template.savegame.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/loadgame/loadgame.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/loadgame/template.loadgame.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/storylinetitle/storylinetitle.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/storylinetitle/template.storylinetitle.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/hand/hand.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/hand/template.hand.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/translationinput/translationinput.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/translationinput/template.translationinput.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/menu/menu.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/menu/template.menu.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/menu/items/items.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/menu/items/template.items.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/account.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/template.account.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/account-page.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/contents/contents.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/contents/template.contents.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/general/general.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/general/template.general.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/services/services.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/services/template.services.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/characters/characters.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/characters/template.characters.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/inventory/inventory.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/inventory/template.inventory.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/transactions/transactions.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/transactions/template.transactions.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/paymentmethods/paymentmethods.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/account/paymentmethods/template.paymentmethods.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/dialogs/dialog.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/dialogs/template.dialog.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/sprite/sprite.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/sprite/template.sprite.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/computer/computer.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/computer/template.computer.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/embeddedwebpage/embeddedwebpage.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/embeddedwebpage/template.embeddedwebpage.js");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/embeddedwebpage/display.coffee");
require("/node_modules/meteor/retronator:landsofillusions-ui/components/embeddedwebpage/router.coffee");

/* Exports */
Package._define("retronator:landsofillusions-ui", {
  LandsOfIllusions: LandsOfIllusions
});

})();
