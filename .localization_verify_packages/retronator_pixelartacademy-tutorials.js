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
var PixelArtAcademy = Package['retronator:pixelartacademy-pixelpad-instructions'].PixelArtAcademy;
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
var __coffeescriptShare, stepNumber, svgPaths;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-tutorials":{"tutorials.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/tutorials.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials = class Tutorials {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawing":{"drawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/drawing.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing = class Drawing {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"markup.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/markup.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, InterfaceMarking, LOI, MarkupHelper, PAA, TextAlign, TextOriginPosition;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
MarkupHelper = PAA.Practice.Helpers.Drawing.Markup;
TextAlign = MarkupHelper.TextAlign;
TextOriginPosition = MarkupHelper.TextOriginPosition;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
PAA.Tutorials.Drawing.Markup = class Markup {
  static bottomRightClickHereMarkup(selector) {
    let xOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var arrowBase, markup, textBase;
    markup = [];
    arrowBase = InterfaceMarking.arrowBase();
    textBase = InterfaceMarking.textBase();
    markup.push({
      interface: {
        selector: selector,
        delay: 1,
        bounds: {
          x: -30 + xOffset,
          y: -40,
          width: 50,
          height: 40
        },
        markings: [{
          line: _.extend({}, arrowBase, {
            points: [{
              x: xOffset,
              y: -25
            }, {
              bezierControlPoints: [{
                x: xOffset,
                y: -12
              }, {
                x: 18 + xOffset,
                y: -20
              }],
              x: 18 + xOffset,
              y: -8
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: xOffset,
              y: -27,
              origin: TextOriginPosition.BottomCenter
            },
            value: "click here"
          })
        }]
      }
    });
    return markup;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions":{"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/instructions.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Instructions = class Instructions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/instruction.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Instructions.Instruction = function () {
  class Instruction extends PAA.PixelPad.Systems.Instructions.Instruction {
    static assetClass() {
      throw new AE.NotImplementedException("You must specify the asset class this instruction is for.");
    }
    static getEditor() {
      return PAA.PixelPad.Apps.Drawing.Editor.getEditor();
    }
    static getActiveAsset() {
      var asset, editor;
      // We must be in the editor on the provided asset.
      if (!(editor = this.getEditor())) {
        return;
      }
      if (!editor.drawingActive()) {
        return;
      }
      if (!(asset = editor.activeAsset())) {
        return;
      }
      if (!(asset instanceof this.assetClass())) {
        return;
      }
      if (!asset.initialized()) {
        return;
      }
      return asset;
    }
    static resetDelayOnOperationExecuted() {
      return false;
    }
    getEditor() {
      return this.constructor.getEditor();
    }
    getActiveAsset() {
      return this.constructor.getActiveAsset();
    }
    onActivate() {
      super.onActivate(...arguments);
      if (this.constructor.resetDelayOnOperationExecuted()) {
        // Start listening to actions done on the asset.
        this.bitmapId = this.constructor.getActiveAsset().bitmapId();
        return LOI.Assets.Bitmap.versionedDocuments.operationExecuted.addHandler(this, this.onOperationExecuted);
      }
    }
    onDeactivate() {
      super.onDeactivate(...arguments);
      if (this.constructor.resetDelayOnOperationExecuted()) {
        return LOI.Assets.Bitmap.versionedDocuments.operationExecuted.removeHandlers(this);
      }
    }
    onOperationExecuted(document, operation, changedFields) {
      if (document._id !== this.bitmapId) {
        return;
      }
      return this.resetDelay();
    }
  }
  ;

  // The default amount of time before we show instructions to the user to let them figure it out themselves.
  Instruction.defaultDelayDuration = 10;
  return Instruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"generalinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/generalinstruction.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;

// A general instruction that is displayed after a delay if the asset is not completed.
PAA.Tutorials.Drawing.Instructions.GeneralInstruction = class GeneralInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
  static activeConditions() {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return;
    }

    // Show until the asset is completed.
    return !asset.completed();
  }
  static delayDuration() {
    return this.defaultDelayDuration;
  }
  static resetDelayOnOperationExecuted() {
    return true;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"completedinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/completedinstruction.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;

// A general instruction that is displayed after a delay if the asset is not completed.
PAA.Tutorials.Drawing.Instructions.CompletedInstruction = class CompletedInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
  static activeConditions() {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return;
    }

    // Show when the asset is completed.
    return asset.completed();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stepinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/stepinstruction.coffee                           //
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

// A general instruction that is displayed after a delay if the asset is not completed at a specific active step.
PAA.Tutorials.Drawing.Instructions.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
  static stepNumber() {
    // Override if the instruction should appear in a single step.
    return null;
  }
  static stepNumbers() {
    // Override if the instruction should appear in multiple steps.
    return [this.stepNumber()];
  }
  static activeStepNumber() {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    return asset.stepAreas()[0].activeStepIndex() + 1;
  }
  static activeConditions() {
    var asset, ref;
    if (!(asset = this.getActiveAsset())) {
      return;
    }

    // Show with the correct step.
    if (ref = this.activeStepNumber(), indexOf.call(this.stepNumbers(), ref) < 0) {
      return;
    }

    // Show until the asset is completed.
    return !asset.completed();
  }
  static resetDelayOnOperationExecuted() {
    return this.delayDuration();
  }
  getTutorialStep(stepNumber) {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    if (stepNumber == null) {
      stepNumber = this.constructor.stepNumber();
    }
    return asset.stepAreas()[0].steps()[stepNumber - 1];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"referencestrayinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/referencestrayinstruction.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Instructions.ReferencesTrayInstruction = class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
  static assetClass() {
    throw new AE.NotImplementedException("References tray instruction must provide which assets to be displayed with.");
  }
  static firstAssetClass() {
    throw new AE.NotImplementedException("References tray instruction must provide which is the first of the assets.");
  }
  static activeConditions() {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return;
    }

    // Show until a step area is created.
    return !asset.stepAreas().length;
  }
  static delayDuration() {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return this.defaultDelayDuration;
    }

    // Only the first asset with references needs immediate instructions.
    if (asset instanceof this.firstAssetClass()) {
      return 0;
    } else {
      return this.defaultDelayDuration;
    }
  }
  static priority() {
    return 1;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"multiarea":{"multiarea.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/multiarea/multiarea.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Instructions.Multiarea = class Multiarea {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/multiarea/instruction.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, AMu, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;

// A general instruction that is displayed after a delay if the asset is not completed at a specific active step.
PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction = class Instruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
  static referenceUrl() {
    return null; // Override if this instruction is for a specific reference (otherwise it applies to all).
  }
  constructor() {
    super(...arguments);

    // Track the step area where the latest progress was made.
    this.activeStepAreaIndex = new ReactiveField(null);
    this._updateActiveStepAreaAutorun = Tracker.autorun(() => {
      var activeStepAreaIndex, asset, bitmap, centralPixel, fixedDimensions, i, lastAction, len, operation, operations, referenceUrl, results;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(bitmap = asset.bitmap())) {
        return;
      }

      // Look at the last operation.
      if (!(lastAction = AMu.Document.Versioning.ActionArchive.getLastActionForDocument(asset.bitmapId()))) {
        return;
      }
      operations = _.reverse(lastAction.forward);
      results = [];
      for (i = 0, len = operations.length; i < len; i++) {
        operation = operations[i];
        if (operation instanceof LOI.Assets.VisualAsset.Operations.UpdateReference) {
          // Find which reference was changed and which step area it corresponds to.
          referenceUrl = bitmap.references[operation.index].image.url;
          activeStepAreaIndex = _.findIndex(asset.stepAreas(), stepArea => {
            return stepArea.data().referenceUrl === referenceUrl;
          });
          this.activeStepAreaIndex(activeStepAreaIndex > -1 ? activeStepAreaIndex : null);
          break;
        }
        if (operation instanceof LOI.Assets.Bitmap.Operations.ChangePixels) {
          // Find which step area's pixels were changed.
          centralPixel = {
            x: operation.bounds.x + operation.bounds.width / 2,
            y: operation.bounds.y + operation.bounds.height / 2
          };
          fixedDimensions = asset.constructor.fixedDimensions();
          switch (asset.constructor.canvasExtensionDirection()) {
            case TutorialBitmap.CanvasExtensionDirection.Horizontal:
              results.push(this.activeStepAreaIndex(Math.floor(centralPixel.x / fixedDimensions.width)));
              break;
            case TutorialBitmap.CanvasExtensionDirection.Vertical:
              results.push(this.activeStepAreaIndex(Math.floor(centralPixel.y / fixedDimensions.height)));
              break;
            default:
              results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  }
  destroy() {
    super.destroy(...arguments);
    return this._updateActiveStepAreaAutorun.stop();
  }
  activeReferenceUrl() {
    var activeStepAreaIndex, asset, stepArea, stepAreas;
    activeStepAreaIndex = this.activeStepAreaIndex();
    if (activeStepAreaIndex == null) {
      return;
    }
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    if (!(stepAreas = asset.stepAreas())) {
      return;
    }
    if (!(stepArea = stepAreas[activeStepAreaIndex])) {
      return;
    }
    return stepArea.data().referenceUrl;
  }
  stepAreaActive() {
    var activeStepAreaIndex, asset, ref, specificReferenceUrl;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    activeStepAreaIndex = this.activeStepAreaIndex();
    if (activeStepAreaIndex == null) {
      return;
    }
    if (!(specificReferenceUrl = this.constructor.referenceUrl())) {
      return true;
    }
    return ((ref = asset.stepAreas()[activeStepAreaIndex]) != null ? ref.data().referenceUrl : void 0) === specificReferenceUrl;
  }
  getStepArea() {
    var asset, specificReferenceUrl;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    if (specificReferenceUrl = this.constructor.referenceUrl()) {
      return _.find(asset.stepAreas(), stepArea => {
        return stepArea.data().referenceUrl === specificReferenceUrl;
      });
    } else {
      // Since this instruction is not specific to one reference, it applies to any step area, including the current one.
      return asset.stepAreas()[this.activeStepAreaIndex()];
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"uncompletedinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/multiarea/uncompletedinstruction.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;

// An instruction that is displayed until the step area is completed.
PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction = class UncompletedInstruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
  activeConditions() {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    if (!this.stepAreaActive()) {
      return;
    }

    // Show until the asset is completed.
    return !asset.completed();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"generalinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/multiarea/generalinstruction.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;

// A general instruction that is displayed after a delay if the asset is not completed.
PAA.Tutorials.Drawing.Instructions.Multiarea.GeneralInstruction = class GeneralInstruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
  static delayDuration() {
    return this.defaultDelayDuration;
  }
  static resetDelayOnOperationExecuted() {
    return true;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"completedinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/multiarea/completedinstruction.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;

// A general instruction that is displayed after a delay if the asset is not completed.
PAA.Tutorials.Drawing.Instructions.Multiarea.CompletedInstruction = class CompletedInstruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
  activeConditions() {
    var asset;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    if (!this.stepAreaActive()) {
      return;
    }

    // Show when the asset is completed.
    return asset.completed();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stepinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/multiarea/stepinstruction.coffee                 //
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

// A general instruction that is displayed after a delay if the asset is not completed at a specific active step.
PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
  static stepNumber(referenceUrl) {
    // Override if the instruction should appear in a single step.
    return null;
  }
  static stepNumbers(referenceUrl) {
    // Override if the instruction should appear in multiple steps.
    return [this.stepNumber(referenceUrl)];
  }
  static resetDelayOnOperationExecuted() {
    return this.delayDuration();
  }
  activeStepNumber() {
    var activeStepAreaIndex, asset, stepArea;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    activeStepAreaIndex = this.activeStepAreaIndex();
    if (activeStepAreaIndex == null) {
      return;
    }
    if (!(stepArea = asset.stepAreas()[activeStepAreaIndex])) {
      return;
    }
    return stepArea.activeStepIndex() + 1;
  }
  activeConditions() {
    var ref;
    if (!this.stepAreaActive()) {
      return;
    }

    // Show with the correct step.
    if (ref = this.activeStepNumber(), indexOf.call(this.constructor.stepNumbers(this.activeReferenceUrl()), ref) < 0) {
      return;
    }

    // Show until the step area is completed.
    return !this.getStepArea().completed();
  }
  getTutorialStep(stepNumber) {
    var activeStepAreaIndex, asset, ref;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    activeStepAreaIndex = this.activeStepAreaIndex();
    if (activeStepAreaIndex == null) {
      return;
    }
    if (stepNumber == null) {
      stepNumber = this.constructor.stepNumber();
    }
    return (ref = asset.stepAreas()[activeStepAreaIndex]) != null ? ref.steps()[stepNumber - 1] : void 0;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"desktop":{"desktop.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/desktop/desktop.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Instructions.Desktop = function () {
  class Desktop extends PAA.PixelPad.Systems.Instructions {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.Instructions.Desktop';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "桌面编辑器绘图说明";
    }
    static description() {
      return "桌面编辑器绘图应用中按需显示信息的系统。";
    }
    constructor() {
      super(...arguments);
      this.headerHeight = 14;
      this.animationDuration = 0.35;
    }
    interactableClass() {
      var editor, ref;
      editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor();
      if (!(editor != null ? (ref = editor.interface.activeTool()) != null ? ref.isEngaged() : void 0 : void 0)) {
        return 'interactable';
      }
    }
    focusedModeClass() {}

    // TODO: Only apply focused mode when manually engaged. Right now entering the pixel art evaluation sheet triggers focused mode at which point we need to see instructions.
    // editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor()
    // 'focused-mode' if editor?.focusedMode()
    instructionsStyle() {
      var value;
      switch (this.displayState()) {
        case this.constructor.DisplayState.Open:
          value = "calc(-".concat(this.contentHeight(), "px - ").concat(this.headerHeight, "rem)");
          break;
        case this.constructor.DisplayState.Closed:
          value = "-".concat(this.headerHeight, "rem");
          break;
        default:
          value = "".concat(this.hideTop, "rem");
      }
      return {
        ["".concat(this.displaySide() === this.constructor.DisplaySide.Top ? 'bottom' : 'top')]: value
      };
    }
  }
  ;
  Desktop.register(Desktop.id());
  Desktop.initialize();
  return Desktop;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.desktop.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/instructions/desktop/template.desktop.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Tutorials.Drawing.Instructions.Desktop");
Template["PixelArtAcademy.Tutorials.Drawing.Instructions.Desktop"] = new Template("Template.PixelArtAcademy.Tutorials.Drawing.Instructions.Desktop", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-tutorials-drawing-instructions-desktop system ", Spacebars.mustache(view.lookup("interactableClass")), " ", Spacebars.mustache(view.lookup("focusedModeClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "instruction ", Spacebars.mustache(view.lookup("displaySideClass")) ];
    }
  }, "\n      ", HTML.DIV(HTML.Attrs({
    class: function() {
      return [ "paper ", Spacebars.mustache(view.lookup("displayStateClass")) ];
    }
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("instructionsStyle"));
  }), "\n        ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("displaySide"), "Bottom");
  }, function() {
    return HTML.Raw('\n          <div class="header">\n            <div class="close-hint">x</div>\n          </div>\n        ');
  }), "\n        ", HTML.DIV(HTML.Attrs({
    class: "container"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("containerStyle"));
  }), HTML.Raw('\n          <div class="gutter"></div>\n          '), HTML.DIV({
    class: "content"
  }, "\n            ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("displayedInstruction"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n          "), "\n        "), "\n        ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("displaySide"), "Top");
  }, function() {
    return HTML.Raw('\n          <div class="header">\n            <div class="close-hint">x</div>\n          </div>\n        ');
  }), "\n      "), "\n    "), "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("interfaceMarkings"));
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Systems", "Instructions", "InterfaceMarking"));
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"pixelarttools":{"pixelarttools.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/pixelarttools.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools = class PixelArtTools extends PAA.Practice.Tutorials.Drawing.Tutorial {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"basics":{"basics.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/basics.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics = function () {
  class Basics extends PAA.Tutorials.Drawing.PixelArtTools {
    // backButtonShortcutUsed: boolean whether the player has used the shortcut for using the back button
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics';
    }
    static fullName() {
      return "像素画工具：基础";
    }
    static assets() {
      return [this.Pencil, this.Eraser, this.ColorFill, this.ColorFill2, this.ColorFill3, this.BasicTools, this.Shortcuts, this.References];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.Intro.Tutorial))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.Intro.Tutorial.Content.DrawingTutorials.Basics);
    }
  }
  ;
  Basics.initialize();
  return Basics;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"backbuttonshortcutinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/backbuttonshortcutinstruction.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, Basics, InstructionsSystem, InterfaceMarking, LOI, Markup, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Basics = PAA.Tutorials.Drawing.PixelArtTools.Basics;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
Basics.BackButtonShortcutInstruction = function () {
  class BackButtonShortcutInstruction extends PAA.PixelPad.Systems.Instructions.Instruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.BackButtonShortcutInstruction";
    }
    static priority() {
      return 10;
    }
    static activeDisplayState() {
      // We only have markup without a message.
      return InstructionsSystem.DisplayState.Hidden;
    }
    activeConditions() {
      var activeAsset, editor, ref;
      // Show this until the player used the shortcut for the back button.
      if (PAA.Tutorials.Drawing.PixelArtTools.Basics.state('backButtonShortcutUsed')) {
        return;
      }

      // Show this only when we're on a completed color fill tutorial (1 or 2).
      if (!(editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor())) {
        return;
      }
      if (!(activeAsset = editor.activeAsset())) {
        return;
      }
      if ((ref = activeAsset.constructor) !== Basics.ColorFill && ref !== Basics.ColorFill2) {
        return;
      }
      if (!editor.drawingActive()) {
        return;
      }
      return typeof activeAsset.completed === "function" ? activeAsset.completed() : void 0;
    }
    markup() {
      var markupStyle, textBase;
      markupStyle = InterfaceMarking.defaultStyle();
      textBase = InterfaceMarking.textBase();
      return [{
        interface: {
          selector: ".landsofillusions-components-back-button",
          bounds: {
            x: -10,
            y: -10,
            width: 200,
            height: 40
          },
          markings: [{
            line: _.extend({}, {
              style: markupStyle,
              points: [{
                x: 16,
                y: -3
              }, {
                x: 0,
                y: 21,
                bezierControlPoints: [{
                  x: 3,
                  y: -7
                }, {
                  x: -11,
                  y: 10
                }]
              }, {
                x: 26,
                y: 5,
                bezierControlPoints: [{
                  x: 10,
                  y: 29
                }, {
                  x: 31,
                  y: 18
                }]
              }, {
                x: 14,
                y: 1,
                bezierControlPoints: [{
                  x: 24,
                  y: 1
                }, {
                  x: 18,
                  y: -3
                }]
              }]
            }),
            text: _.extend({}, textBase, {
              position: {
                x: 53,
                y: 10,
                origin: Markup.TextOriginPosition.MiddleLeft
              },
              value: "You can press escape\ninstead of using the back arrow.",
              align: Markup.TextAlign.Left
            })
          }]
        }
      }];
    }
  }
  ;
  BackButtonShortcutInstruction.initialize();
  return BackButtonShortcutInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pencil.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/pencil.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.Pencil = function () {
  var Asset;
  class Pencil extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.Pencil';
    }
    static displayName() {
      return "Pencil";
    }
    static description() {
      return "学习如何使用最基本的像素画工具：1像素铅笔。";
    }
    static fixedDimensions() {
      return {
        width: 8,
        height: 8
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static goalBitmapString() {
      return "|   00\n|  0000\n| 000000\n|00 00 00\n|00000000\n| 0 00 0\n|0      0\n| 0    0";
    }
    static bitmapInfo() {
      return "Artwork from Space Invaders, Taito, 1978";
    }
    constructor() {
      super(...arguments);
      this.unlockEraser = new ReactiveField(false);
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, this.unlockEraser() ? PAA.Practice.Software.Tools.ToolKeys.Eraser : void 0];
    }
  }
  ;
  Pencil.initialize();
  Asset = Pencil;
  Pencil.Tool = function () {
    class Tool extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tool");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "点击铅笔激活它。";
      }
      static activeConditions() {
        var asset, editor;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Don't show if we're already done.
        if (asset.completed()) {
          return;
        }

        // Show when pencil is not the active tool.
        editor = this.getEditor();
        return editor.interface.activeToolId() !== LOI.Assets.SpriteEditor.Tools.Pencil.id();
      }
    }
    ;
    Tool.initialize();
    return Tool;
  }.call(this);
  Pencil.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用铅笔填充中间带点的像素。";
      }
      static activeConditions() {
        var asset, editor;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when pencil is the active tool.
        editor = this.getEditor();
        if (editor.interface.activeToolId() !== LOI.Assets.SpriteEditor.Tools.Pencil.id()) {
          return;
        }

        // Show until the asset is completed.
        return !asset.completed();
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  Pencil.Error = function () {
    class Error extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Error");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "哎呀，你画出去了！使用左边的橡皮擦删除不需要的像素。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when there are any extra pixels present.
        return asset.hasExtraPixels();
      }
      static priority() {
        return 1;
      }
      onDisplayed() {
        var asset;
        // Unlock the eraser.
        asset = this.constructor.getActiveAsset();
        return asset.unlockEraser(true);
      }
    }
    ;
    Error.initialize();
    return Error;
  }.call(this);
  Pencil.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "太棒了！回到你的作品集找一个新精灵来画。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Pencil;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"eraser.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/eraser.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.Eraser = function () {
  var Asset;
  class Eraser extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.Eraser';
    }
    static displayName() {
      return "Eraser";
    }
    static description() {
      return "正如你所想，橡皮擦非常适合去除多余的像素。";
    }
    static fixedDimensions() {
      return {
        width: 8,
        height: 8
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static bitmapString() {
      return "00000000\n00000000\n00000000\n00000000\n00000000\n00000000\n00000000\n00000000";
    }
    static goalBitmapString() {
      return "|   00\n|  0000\n| 000000\n|00 00 00\n|00000000\n|  0  0\n| 0 00 0\n|0 0  0 0";
    }
    static bitmapInfo() {
      return "Artwork from Space Invaders, Taito, 1978";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser];
    }
  }
  ;
  Eraser.initialize();
  Asset = Eraser;
  Eraser.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用橡皮擦删除中间带点的像素。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when asset has extra pixels so that we don't display it when there are missing pixels.
        return asset.hasExtraPixels();
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  Eraser.Error = function () {
    class Error extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Error");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "你删得有点多了！用铅笔把像素画回来。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when there are any missing pixels present.
        return asset.hasMissingPixels();
      }
      static priority() {
        return 1;
      }
    }
    ;
    Error.initialize();
    return Error;
  }.call(this);
  Eraser.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "不错！继续完成剩余的精灵来完成基础教程。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Eraser;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorfill.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/colorfill.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.ColorFill = function () {
  var Asset;
  class ColorFill extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.ColorFill';
    }
    static displayName() {
      return "Color fill";
    }
    static description() {
      return "学习如何快速填充大面积颜色。";
    }
    static fixedDimensions() {
      return {
        width: 13,
        height: 9
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static bitmapString() {
      return "|      0\n|     0 0\n|     0 0\n|     0 0\n| 00000 00000\n|0           0\n|0           0\n|0           0\n|0000000000000";
    }
    static goalBitmapString() {
      return "|      0\n|     000\n|     000\n|     000\n| 00000000000\n|0000000000000\n|0000000000000\n|0000000000000\n|0000000000000";
    }
    static bitmapInfo() {
      return "Artwork from Space Invaders, Taito, 1978";
    }
    constructor() {
      super(...arguments);
      this.unlockUndo = new ReactiveField(false);
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.ColorFill, this.unlockUndo() ? PAA.Practice.Software.Tools.ToolKeys.Undo : void 0];
    }
  }
  ;
  ColorFill.initialize();
  Asset = ColorFill;
  ColorFill.Tool = function () {
    class Tool extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tool");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "点击油漆桶激活颜色填充工具。";
      }
      static activeConditions() {
        var editor;
        if (!this.getActiveAsset()) {
          return;
        }

        // Show when color fill is not the active tool.
        editor = this.getEditor();
        return editor.interface.activeToolId() !== LOI.Assets.SpriteEditor.Tools.ColorFill.id();
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
    }
    ;
    Tool.initialize();
    return Tool;
  }.call(this);
  ColorFill.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "点击画面，让你的颜色一直「流淌」到不同颜色的像素处。";
      }
      static activeConditions() {
        var asset, editor;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when color fill is the active tool.
        editor = this.getEditor();
        if (editor.interface.activeToolId() !== LOI.Assets.SpriteEditor.Tools.ColorFill.id()) {
          return;
        }

        // Show until the asset is completed.
        return super.activeConditions(...arguments);
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  ColorFill.Error = function () {
    class Error extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Error");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "哎呀，你把线条外面的区域也填充了！使用左边的撤销按钮回到正轨。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when there are any extra pixels present.
        return asset.hasExtraPixels();
      }
      static priority() {
        return 1;
      }
      onDisplayed() {
        var asset;
        // Unlock the undo.
        asset = this.constructor.getActiveAsset();
        return asset.unlockUndo(true);
      }
    }
    ;
    Error.initialize();
    return Error;
  }.call(this);
  return ColorFill;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorfill2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/colorfill2.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.ColorFill2 = function () {
  var Asset;
  class ColorFill2 extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.ColorFill2';
    }
    static displayName() {
      return "Color fill 2";
    }
    static description() {
      return "有时候填充过多像素然后再擦掉反而更快。";
    }
    static fixedDimensions() {
      return {
        width: 12,
        height: 8
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static bitmapString() {
      return "|    0000\n| 000    000\n|0          0\n|0          0\n|000      000\n|   00  00\n|  00 00 00\n|00        00";
    }
    static goalBitmapString() {
      return "|    0000\n| 0000000000\n|000000000000\n|000  00  000\n|000000000000\n|   00  00\n|  00 00 00\n|00        00";
    }
    static bitmapInfo() {
      return "Artwork from Space Invaders, Taito, 1978";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.Eraser];
    }
  }
  ;
  ColorFill2.initialize();
  Asset = ColorFill2;
  ColorFill2.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用颜色填充和橡皮擦完成这个侵略者。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return ColorFill2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorfill3.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/colorfill3.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.ColorFill3 = function () {
  var Asset;
  class ColorFill3 extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.ColorFill3';
    }
    static displayName() {
      return "Color fill 3";
    }
    static description() {
      return "使用颜色填充时，要注意轮廓的缺口。";
    }
    static fixedDimensions() {
      return {
        width: 24,
        height: 18
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static bitmapString() {
      return "|\n|     00000000000000\n|    0              0\n|   0                0\n|  0                  0\n| 0                    0\n| 0\n| 0                    0\n| 0                    0\n| 0                    0\n| 0                    0\n| 0                    0\n| 0      00 0000       0\n| 0     0       0      0\n| 0    0         0     0\n| 0   0           0    0\n| 00000           000000";
    }
    static goalBitmapString() {
      return "|\n|     00000000000000\n|    0000000000000000\n|   000000000000000000\n|  00000000000000000000\n| 0000000000000000000000\n| 0000000000000000000000\n| 0000000000000000000000\n| 0000000000000000000000\n| 0000000000000000000000\n| 0000000000000000000000\n| 0000000000000000000000\n| 0000000000000000000000\n| 0000000       00000000\n| 000000         0000000\n| 00000           000000\n| 00000           000000";
    }
    static bitmapInfo() {
      return "Artwork from Space Invaders, Taito, 1978";
    }
    constructor() {
      super(...arguments);
      this.unlockUndo = new ReactiveField(false);
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.Pencil, this.unlockUndo() ? PAA.Practice.Software.Tools.ToolKeys.Undo : void 0];
    }
  }
  ;
  ColorFill3.initialize();
  Asset = ColorFill3;
  ColorFill3.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "在使用颜色填充之前，用铅笔封闭轮廓上的缺口。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  ColorFill3.Error = class Error extends PAA.Tutorials.Drawing.Instructions.Instruction {
    static priority() {
      return 1;
    }
    static toolId() {
      throw new AE.NotImplementedException("You must provide which tool was required to produce this error.");
    }
    static activeConditions() {
      var asset, bitmap, lastAction;
      if (!(asset = this.getActiveAsset())) {
        return;
      }

      // Show when there are any extra pixels present and the last operation was a color fill.
      if (!asset.hasExtraPixels()) {
        return;
      }
      bitmap = asset.bitmap();
      if (!(lastAction = bitmap.partialAction || AM.Document.Versioning.getActionAtPosition(bitmap, bitmap.historyPosition - 1))) {
        return;
      }
      return lastAction.operatorId === this.toolId();
    }
    onDisplayed() {
      var asset;
      // Unlock the undo.
      asset = this.constructor.getActiveAsset();
      return asset.unlockUndo(true);
    }
  };
  ColorFill3.ColorFillError = function () {
    class ColorFillError extends ColorFill3.Error {
      static id() {
        return "".concat(Asset.id(), ".ColorFillError");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "哎呀，颜色溢出到精灵外面了！使用左边的撤销按钮回到正轨。";
      }
      static toolId() {
        return LOI.Assets.SpriteEditor.Tools.ColorFill.id();
      }
    }
    ;
    ColorFillError.initialize();
    return ColorFillError;
  }.call(this);
  ColorFill3.PencilError = function () {
    class PencilError extends ColorFill3.Error {
      static id() {
        return "".concat(Asset.id(), ".PencilError");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "你画得有点多了！使用左边的撤销按钮回到正轨。";
      }
      static toolId() {
        return LOI.Assets.SpriteEditor.Tools.Pencil.id();
      }
    }
    ;
    PencilError.initialize();
    return PencilError;
  }.call(this);
  return ColorFill3;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"basictools.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/basictools.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.BasicTools = function () {
  var Asset;
  class BasicTools extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.BasicTools';
    }
    static displayName() {
      return "Basic tools";
    }
    static description() {
      return "既然你已经了解了三个最基本的工具，试着结合使用它们来快速完成这个精灵。";
    }
    static fixedDimensions() {
      return {
        width: 16,
        height: 7
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static bitmapString() {
      return "|     000000\n|   00      00\n|  0          0\n| 0            0\n|0000000000000000";
    }
    static goalBitmapString() {
      return "|     000000\n|   0000000000\n|  000000000000\n| 00 00 00 00 00\n|0000000000000000\n|  000  00  000\n|   0        0";
    }
    static bitmapInfo() {
      return "Artwork from Space Invaders, Taito, 1978";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill];
    }
  }
  ;
  BasicTools.initialize();
  Asset = BasicTools;
  BasicTools.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用铅笔、颜色填充和橡皮擦来展示你对这三种基本绘图工具的使用。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return BasicTools;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shortcuts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/shortcuts.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.Shortcuts = function () {
  var Asset;
  class Shortcuts extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.Shortcuts';
    }
    static displayName() {
      return "Shortcuts";
    }
    static description() {
      return "高效的像素画家会学习快捷键来切换工具：\n\n- B：铅笔（画笔）\n- E：橡皮擦\n- G：颜色填充";
    }
    static fixedDimensions() {
      return {
        width: 12,
        height: 8
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static bitmapString() {
      return "|\n|\n|  00000000\n| 0        0\n|0          0\n|000000000000";
    }
    static goalBitmapString() {
      return "|  0      0\n|   0    0\n|  00000000\n| 00 0000 00\n|000000000000\n|0 00000000 0\n|0 0      0 0\n|   00  00";
    }
    static bitmapInfo() {
      return "Artwork from Space Invaders, Taito, 1978";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill];
    }
    editorStyleClasses() {
      return 'hidden-tools';
    }
  }
  ;
  Shortcuts.initialize();
  Asset = Shortcuts;
  Shortcuts.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "- B：铅笔\n- E：橡皮擦\n- G：颜色填充";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show until the asset is completed.
        return !asset.completed();
      }
      static activeDisplayState() {
        // Show this tip closed.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Closed;
      }
      static delayDuration() {
        return 3;
      }
      static resetDelayOnOperationExecuted() {
        return true;
      }
      onOperationExecuted(document, operation, changedFields) {
        if (document._id !== this.bitmapId) {
          return;
        }

        // Don't reset the delay anymore once it has ran out so that when shortcuts are shown they don't disappear anymore.
        if (!this.delayed()) {
          return;
        }
        return this.resetDelay();
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return Shortcuts;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"references.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/basics/references.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA, PADB;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PADB = PixelArtDatabase;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Basics.References = function () {
  var Asset;
  class References extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Basics.References';
    }
    static displayName() {
      return "References";
    }
    static description() {
      return "参考图片在你整个创作过程中都非常重要，可以帮助你画得更准确、更真实。";
    }
    static fixedDimensions() {
      return {
        width: 7,
        height: 16
      };
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 0.95,
            g: 0.30,
            b: 0.5
          }]
        }]
      });
    }
    static bitmapString() {
      return ""; // Empty bitmap
    }
    static goalBitmapString() {
      return "|   0\n|  0 0\n|  0 0\n|  0 0\n|  0 0\n|  0 0\n|  0 0\n| 0   0\n|0     0\n|0000000\n|0     0\n|0000000\n|0 0 0 0\n|0 0 000\n|0 00000\n|0000000";
    }
    static references() {
      return ['/pixelartacademy/tutorials/drawing/pixelarttools/basics/susankare-brush.jpg'];
    }
    static bitmapInfo() {
      return "Artwork by Susan Kare, 1982\n\n(used with permission)";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.References];
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
    editorDrawComponents() {
      return [];
    }
  }
  ;
  References.initialize();

  // We send an empty array so we don't show the on-canvas reference.
  Asset = References;
  References.Tray = function () {
    class Tray extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tray");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "打开参考图片栏，把图片拖到你的桌面上。";
      }
      static activeConditions() {
        var asset, bitmap;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show until the image has a displayed reference.
        bitmap = asset.bitmap();
        return !bitmap.references[0].displayed;
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
    }
    ;
    Tray.initialize();
    return Tray;
  }.call(this);
  References.Resize = function () {
    class Resize extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Resize");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "你可以通过拖拽边缘来调整参考图片的大小。";
      }
      static activeConditions() {
        var action, asset, bitmap, history, i, j, len, len1, operation, ref, scaleOperationsCount;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show after the image has a reference, until a reference resize step has been added.
        bitmap = asset.bitmap();
        if (!bitmap.references[0].displayed) {
          return;
        }
        scaleOperationsCount = 0;

        // Fetch history from the action archives if using them.
        if (!(history = bitmap.history)) {
          history = AM.Document.Versioning.ActionArchive.getHistoryForDocument(bitmap._id);
        }
        for (i = 0, len = history.length; i < len; i++) {
          action = history[i];
          ref = action.forward;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            operation = ref[j];
            if (operation instanceof LOI.Assets.VisualAsset.Operations.UpdateReference && operation.changes.scale) {
              scaleOperationsCount++;
            }
          }
        }

        // We need at least 2 scale operations since displaying the reference will automatically create one.
        return scaleOperationsCount < 2;
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
    }
    ;
    Resize.initialize();
    return Resize;
  }.call(this);
  return References;
}.call(this);
if (Meteor.isServer) {
  Document.startup(function () {
    if (Meteor.settings.startEmpty) {
      return;
    }
    return PADB.create({
      artist: {
        name: {
          first: 'Susan',
          last: 'Kare'
        }
      },
      artworks: [{
        type: PADB.Artwork.Types.Physical,
        name: 'Brush',
        completionDate: {
          year: 1982
        },
        image: {
          url: '/pixelartacademy/tutorials/drawing/pixelarttools/helpers/susankare-brush.jpg'
        }
      }]
    });
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"colors":{"colors.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/colors/colors.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  InterfaceMarking,
  LOI,
  Markup,
  PAA,
  TutorialBitmap,
  indexOf = [].indexOf;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAA.Tutorials.Drawing.PixelArtTools.Colors = function () {
  class Colors extends PAA.Tutorials.Drawing.PixelArtTools {
    // colorHelpOpenedWhenIncorrect: boolean whether the color help was opened when the color was incorrect
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Colors';
    }
    static fullName() {
      return "像素画工具：颜色";
    }
    static assets() {
      return [this.ColorSwatches, this.ColorPicking, this.QuickColorPicking];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.Intro.Tutorial))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.Intro.Tutorial.Content.DrawingTutorials.Colors);
    }
  }
  ;
  Colors.initialize();
  Colors.pacManPaletteName = 'PAC-MAN';
  Colors.ColorHelpInstruction = function () {
    class ColorHelpInstruction extends PAA.PixelPad.Systems.Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Colors.ColorHelpInstruction";
      }
      static message() {
        return "你选择了错误的颜色。如果需要帮助判断颜色，\n按调色板上的帮助按钮查看不同的辅助选项。";
      }
      static priority() {
        return 10;
      }
      constructor() {
        super(...arguments);
        this.incorrectPixels = new ReactiveField(false);
        this._listenToColorChangesAutorun = Tracker.autorun(() => {
          if (PAA.Tutorials.Drawing.PixelArtTools.Colors.state('colorHelpOpenedWhenIncorrect')) {
            return this._stopListening();
          } else {
            return this._startListening();
          }
        });
      }
      destroy() {
        super.destroy(...arguments);
        this._listenToColorChangesAutorun.stop();
        return this._stopListening();
      }
      _startListening() {
        this._listening = true;
        LOI.Assets.Bitmap.versionedDocuments.operationExecuted.addHandler(this, this.onOperationExecuted);

        // Complete this instruction when the color help is opened.
        return this._colorHelpOpenedAutorun = Tracker.autorun(() => {
          var editor, palette;
          if (!this.incorrectPixels()) {
            return;
          }
          if (!(editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor())) {
            return;
          }
          if (!(palette = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.Palette))) {
            return;
          }
          if (!palette.colorHelp.visible()) {
            return;
          }
          return PAA.Tutorials.Drawing.PixelArtTools.Colors.state('colorHelpOpenedWhenIncorrect', true);
        });
      }
      _stopListening() {
        if (!this._listening) {
          return;
        }
        LOI.Assets.Bitmap.versionedDocuments.operationExecuted.removeHandler(this, this.onOperationExecuted);
        return this._colorHelpOpenedAutorun.stop();
      }
      activeConditions() {
        // Show this until the color help was opened when the color was incorrect.
        if (PAA.Tutorials.Drawing.PixelArtTools.Colors.state('colorHelpOpenedWhenIncorrect')) {
          return;
        }

        // Wait until our constructor has created the incorrect pixels field.
        if (!this.instructions.isRendered()) {
          return;
        }
        return this.incorrectPixels();
      }
      onOperationExecuted(document, operation, changedFields) {
        var absoluteX, absoluteY, activeStep, asset, availableKeys, changeArea, editor, i, j, k, len, pixelFormat, ref, ref1, ref2, ref3, sourceAreaOperationMaskAttribute, sourceX, sourceY, stepArea;
        // Only react to change pixels operations.
        if (!(operation instanceof LOI.Assets.Bitmap.Operations.ChangePixels)) {
          return;
        }

        // Only show this when the color swatches are available.
        if (!(editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor())) {
          return;
        }
        if (!editor.drawingActive()) {
          return;
        }
        if (!(asset = editor.activeAsset())) {
          return;
        }
        if (!(asset instanceof PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap)) {
          return;
        }
        if (availableKeys = typeof asset.availableToolKeys === "function" ? asset.availableToolKeys() : void 0) {
          if (ref = PAA.Practice.Software.Tools.ToolKeys.ColorSwatches, indexOf.call(availableKeys, ref) < 0) {
            return;
          }
        }

        // Go over each of the source pixels and set them in the destination area where the operation mask is set.
        pixelFormat = new LOI.Assets.Bitmap.PixelFormat(LOI.Assets.Bitmap.Attribute.OperationMask.id, ...document.pixelFormat.attributeIds);
        changeArea = new LOI.Assets.Bitmap.Area(operation.bounds.width, operation.bounds.height, pixelFormat, operation._pixelsData || operation.compressedPixelsData, !operation._pixelsData);
        sourceAreaOperationMaskAttribute = changeArea.attributes[LOI.Assets.Bitmap.Attribute.OperationMask.id];
        for (sourceY = i = 0, ref1 = operation.bounds.height; 0 <= ref1 ? i < ref1 : i > ref1; sourceY = 0 <= ref1 ? ++i : --i) {
          absoluteY = operation.bounds.y + sourceY;
          for (sourceX = j = 0, ref2 = operation.bounds.width; 0 <= ref2 ? j < ref2 : j > ref2; sourceX = 0 <= ref2 ? ++j : --j) {
            absoluteX = operation.bounds.x + sourceX;
            if (sourceAreaOperationMaskAttribute && !sourceAreaOperationMaskAttribute.pixelWasChanged(sourceX, sourceY)) {
              // See if the pixel was changed at this location.
              continue;
            }
            ref3 = asset.stepAreas();

            // See if the changed pixel created any incorrect colors.
            for (k = 0, len = ref3.length; k < len; k++) {
              stepArea = ref3[k];
              activeStep = stepArea.activeStep();
              if (!(activeStep instanceof TutorialBitmap.PixelsStep)) {
                continue;
              }
              // Note: we have to compare to false since the method can return
              // undefined if the actual and goal colors are not set for this pixel.
              if (activeStep.hasCorrectPixelColor(absoluteX, absoluteY) === false) {
                this.incorrectPixels(true);
                return;
              }
            }
          }
        }
        return this.incorrectPixels(false);
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".color-help-button",
            delay: 1,
            bounds: {
              x: -50,
              y: -35,
              width: 100,
              height: 55
            },
            markings: [{
              rectangle: {
                strokeStyle: markupStyle,
                x: 1,
                y: 0,
                width: 38,
                height: 8
              },
              line: _.extend({}, arrowBase, {
                points: [{
                  x: -22,
                  y: -9
                }, {
                  x: -5,
                  y: 4,
                  bezierControlPoints: [{
                    x: -22,
                    y: 3
                  }, {
                    x: -15,
                    y: 4
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: -22,
                  y: -11,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "click\nhere"
              })
            }]
          }
        }];
      }
    }
    ;
    ColorHelpInstruction.initialize();
    return ColorHelpInstruction;
  }.call(this);
  return Colors;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorswatches.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/colors/colorswatches.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Colors.ColorSwatches = function () {
  var Asset;
  class ColorSwatches extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Colors.ColorSwatches';
    }
    static displayName() {
      return "Color swatches";
    }
    static description() {
      return "画一个有多重颜色的精灵。";
    }
    static fixedDimensions() {
      return {
        width: 14,
        height: 14
      };
    }
    static restrictedPaletteName() {
      return PAA.Tutorials.Drawing.PixelArtTools.Colors.pacManPaletteName;
    }
    static backgroundColor() {
      var ref;
      return (ref = LOI.Assets.Palette.defaultPalette()) != null ? ref.color(LOI.Assets.Palette.Atari2600.hues.gray, 2) : void 0;
    }
    static goalBitmapString() {
      return "|     4444\n|   44444444\n|  4444444444\n| 444cc4444cc4\n| 44cccc44cccc\n| 44cc8844cc88\n|444cc8844cc884\n|4444cc4444cc44\n|44444444444444\n|44444444444444\n|44444444444444\n|44444444444444\n|4444 4444 4444\n| 44   44   44";
    }
    static bitmapInfo() {
      return "Artwork from PAC-MAN, Namco, 1980";
    }
    availableToolKeys() {
      var Helpers;
      Helpers = PAA.Tutorials.Drawing.PixelArtTools.Helpers;
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.ColorSwatches, Helpers.isAssetCompleted(Helpers.Zoom) ? PAA.Practice.Software.Tools.ToolKeys.Zoom : void 0, Helpers.isAssetCompleted(Helpers.MoveCanvas) ? PAA.Practice.Software.Tools.ToolKeys.MoveCanvas : void 0, Helpers.isAssetCompleted(Helpers.UndoRedo) ? PAA.Practice.Software.Tools.ToolKeys.Undo : void 0, Helpers.isAssetCompleted(Helpers.UndoRedo) ? PAA.Practice.Software.Tools.ToolKeys.Redo : void 0];
    }
  }
  ;
  ColorSwatches.initialize();
  Asset = ColorSwatches;
  ColorSwatches.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "使用色板来切换颜色。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return ColorSwatches;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorpickingwithundo.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/colors/colorpickingwithundo.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Colors.ColorPickingWithUndo = function () {
  class ColorPickingWithUndo extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    constructor() {
      super(...arguments);
      this.unlockUndo = new ReactiveField(false);
    }
  }
  ;
  ColorPickingWithUndo.Error = class Error extends PAA.Tutorials.Drawing.Instructions.Instruction {
    static id() {
      return "".concat(Asset.id(), ".Error");
    }
    static assetClass() {
      return Asset;
    }
    static message() {
      return "你覆盖了正确的颜色，无法再完成课程了。使用撤销按钮回到正轨。";
    }
    static priority() {
      return 1;
    }
    constructor() {
      super(...arguments);
      this.amountOfColors = new AE.LiveComputedField(() => {
        var asset, bitmapLayer, color, colorFound, colors, i, j, k, len, pixel, ref, ref1, ref2, ref3, ref4, x, y;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(bitmapLayer = (ref = asset.bitmap()) != null ? ref.layers[0] : void 0)) {
          return;
        }
        colors = [];

        // Find unique colors in the bitmap.
        for (x = i = ref1 = bitmapLayer.bounds.x, ref2 = bitmapLayer.bounds.x + bitmapLayer.bounds.width; ref1 <= ref2 ? i < ref2 : i > ref2; x = ref1 <= ref2 ? ++i : --i) {
          for (y = j = ref3 = bitmapLayer.bounds.y, ref4 = bitmapLayer.bounds.y + bitmapLayer.bounds.height; ref3 <= ref4 ? j < ref4 : j > ref4; y = ref3 <= ref4 ? ++j : --j) {
            if (!(pixel = bitmapLayer.getPixel(x, y))) {
              continue;
            }
            colorFound = false;
            for (k = 0, len = colors.length; k < len; k++) {
              color = colors[k];
              if (EJSON.equals(color, pixel.paletteColor)) {
                colorFound = true;
                break;
              }
            }
            if (!colorFound) {
              colors.push(pixel.paletteColor);
            }
          }
        }
        return colors.length;
      });
      this.initialAmountOfColors = new ReactiveField(0);
      this._updateInitialAmountOfColorsAutorun = Tracker.autorun(computation => {
        var amountOfColors;
        amountOfColors = this.amountOfColors() || 0;
        return Tracker.nonreactive(() => {
          return this.initialAmountOfColors(Math.max(this.initialAmountOfColors(), amountOfColors));
        });
      });
    }
    destroy() {
      super.destroy(...arguments);
      this.amountOfColors.stop();
      return this._updateInitialAmountOfColorsAutorun.stop();
    }
    activeConditions() {
      if (!this.getActiveAsset()) {
        return;
      }

      // Show when you don't have all the initial colors available anymore.
      return this.amountOfColors() < this.initialAmountOfColors();
    }
    onDisplayed() {
      var asset;
      // Unlock the undo.
      asset = this.constructor.getActiveAsset();
      return asset.unlockUndo(true);
    }
  };
  return ColorPickingWithUndo;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"colorpicking.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/colors/colorpicking.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Colors.ColorPicking = function () {
  var Asset;
  class ColorPicking extends PAA.Tutorials.Drawing.PixelArtTools.Colors.ColorPickingWithUndo {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Colors.ColorPicking';
    }
    static displayName() {
      return "Color picking";
    }
    static description() {
      return "要更快地切换颜色，可以直接从画布上取色。\n\n快捷键：I（取色器）";
    }
    static fixedDimensions() {
      return {
        width: 12,
        height: 12
      };
    }
    static restrictedPaletteName() {
      return PAA.Tutorials.Drawing.PixelArtTools.Colors.pacManPaletteName;
    }
    static backgroundColor() {
      var ref;
      return (ref = LOI.Assets.Palette.defaultPalette()) != null ? ref.color(LOI.Assets.Palette.Atari2600.hues.gray, 2) : void 0;
    }
    static bitmapString() {
      return "|\n|\n|\n|\n| 1112\n|111211\n|11111\n|1c11\n|11c1\n| 111\n|\n|";
    }
    static goalBitmapString() {
      return "|          22\n|        2222\n|      22 2\n|     2   2\n| 1112   2\n|111211 2\n|11111 1211\n|1c11 112111\n|11c1 111111\n| 111 1c1111\n|     11c111\n|      1111";
    }
    static bitmapInfo() {
      return "Artwork from PAC-MAN, Namco, 1980";
    }
    availableToolKeys() {
      var Helpers;
      Helpers = PAA.Tutorials.Drawing.PixelArtTools.Helpers;
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.ColorPicker, Helpers.isAssetCompleted(Helpers.Zoom) ? PAA.Practice.Software.Tools.ToolKeys.Zoom : void 0, Helpers.isAssetCompleted(Helpers.MoveCanvas) ? PAA.Practice.Software.Tools.ToolKeys.MoveCanvas : void 0, this.unlockUndo() || Helpers.isAssetCompleted(Helpers.UndoRedo) ? PAA.Practice.Software.Tools.ToolKeys.Undo : void 0, Helpers.isAssetCompleted(Helpers.UndoRedo) ? PAA.Practice.Software.Tools.ToolKeys.Redo : void 0];
    }
  }
  ;
  ColorPicking.initialize();
  Asset = ColorPicking;
  ColorPicking.Tool = function () {
    class Tool extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tool");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "点击取色器激活颜色拾取工具。\n\n快捷键：I（取色器）";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        return !asset.completed();
      }
      static completedConditions() {
        var editor;
        // Color picker has to be the active tool.
        editor = this.getEditor();
        return editor.interface.activeToolId() === LOI.Assets.SpriteEditor.Tools.ColorPicker.id();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
    }
    ;
    Tool.initialize();
    return Tool;
  }.call(this);
  ColorPicking.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "点击画面上的任意位置来选取那个颜色。";
      }
      static activeConditions() {
        var asset, editor;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (asset.completed()) {
          return;
        }

        // Show when color picker is the active tool.
        editor = this.getEditor();
        return editor.interface.activeToolId() === LOI.Assets.SpriteEditor.Tools.ColorPicker.id();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
      onActivate() {
        var editor, paintHelper;
        super.onActivate(...arguments);
        editor = this.getEditor();
        paintHelper = editor.interface.getHelperForActiveFile(LOI.Assets.SpriteEditor.Helpers.Paint);
        return this._initialColorRamp = paintHelper.paletteColor().ramp;
      }
      completedConditions() {
        var editor, paintHelper;
        editor = this.getEditor();
        paintHelper = editor.interface.getHelperForActiveFile(LOI.Assets.SpriteEditor.Helpers.Paint);
        return this._initialColorRamp !== paintHelper.paletteColor().ramp;
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  ColorPicking.Error = function () {
    class Error extends PAA.Tutorials.Drawing.PixelArtTools.Colors.ColorPickingWithUndo.Error {
      static id() {
        return "".concat(Asset.id(), ".Error");
      }
      static assetClass() {
        return Asset;
      }
    }
    ;
    Error.initialize();
    return Error;
  }.call(this);
  return ColorPicking;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"quickcolorpicking.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/colors/quickcolorpicking.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Colors.QuickColorPicking = function () {
  var Asset;
  class QuickColorPicking extends PAA.Tutorials.Drawing.PixelArtTools.Colors.ColorPickingWithUndo {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Colors.QuickColorPicking';
    }
    static displayName() {
      return "Quick color picking";
    }
    static description() {
      return "学习如何在使用铅笔时快速取色。\n\n快捷键：Alt/option";
    }
    static fixedDimensions() {
      return {
        width: 11,
        height: 12
      };
    }
    static restrictedPaletteName() {
      return PAA.Tutorials.Drawing.PixelArtTools.Colors.pacManPaletteName;
    }
    static backgroundColor() {
      var ref;
      return (ref = LOI.Assets.Palette.defaultPalette()) != null ? ref.color(LOI.Assets.Palette.Atari2600.hues.gray, 2) : void 0;
    }
    static bitmapString() {
      return "|\n|  999\n| 1199\n|11111\n|1c111\n|111c1\n|11111\n| 1c11\n| 1111\n|  11c\n|   11";
    }
    static goalBitmapString() {
      return "|     c\n|  999c999\n| 119999911\n|111119111c1\n|1c11111c111\n|111c1c11111\n|11111111c11\n| 1c11c1111\n| 111111111\n|  11c11c\n|   11111\n|     1";
    }
    static bitmapInfo() {
      return "Artwork from PAC-MAN, Namco, 1980";
    }
    availableToolKeys() {
      var Helpers;
      Helpers = PAA.Tutorials.Drawing.PixelArtTools.Helpers;
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.ColorPicker, Helpers.isAssetCompleted(Helpers.Zoom) ? PAA.Practice.Software.Tools.ToolKeys.Zoom : void 0, Helpers.isAssetCompleted(Helpers.MoveCanvas) ? PAA.Practice.Software.Tools.ToolKeys.MoveCanvas : void 0, this.unlockUndo() || Helpers.isAssetCompleted(Helpers.UndoRedo) ? PAA.Practice.Software.Tools.ToolKeys.Undo : void 0, Helpers.isAssetCompleted(Helpers.UndoRedo) ? PAA.Practice.Software.Tools.ToolKeys.Redo : void 0];
    }
    editorStyleClasses() {
      return 'hidden-color-picker';
    }
  }
  ;
  QuickColorPicking.initialize();
  Asset = QuickColorPicking;
  QuickColorPicking.Tool = function () {
    class Tool extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tool");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "选择铅笔开始像往常一样绘画。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        return !asset.completed();
      }
      static completedConditions() {
        var editor;
        editor = this.getEditor();
        return editor.interface.activeToolId() === LOI.Assets.SpriteEditor.Tools.Pencil.id();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
      static priority() {
        return 1;
      }
    }
    ;
    Tool.initialize();
    return Tool;
  }.call(this);
  QuickColorPicking.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "按住 alt/option 键临时切换到取色器，松开键后恢复。";
      }
      static activeConditions() {
        var asset, editor, ref;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (asset.completed()) {
          return;
        }

        // Show when the pencil or the color picker are the active tool.
        editor = this.getEditor();
        return (ref = editor.interface.activeToolId()) === LOI.Assets.SpriteEditor.Tools.Pencil.id() || ref === LOI.Assets.SpriteEditor.Tools.ColorPicker.id();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
      onActivate() {
        var editor, paintHelper;
        super.onActivate(...arguments);
        editor = this.getEditor();
        paintHelper = editor.interface.getHelperForActiveFile(LOI.Assets.SpriteEditor.Helpers.Paint);
        return this._initialColorRamp = paintHelper.paletteColor().ramp;
      }
      completedConditions() {
        var editor, paintHelper;
        editor = this.getEditor();
        paintHelper = editor.interface.getHelperForActiveFile(LOI.Assets.SpriteEditor.Helpers.Paint);
        return this._initialColorRamp !== paintHelper.paletteColor().ramp;
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  QuickColorPicking.Error = function () {
    class Error extends PAA.Tutorials.Drawing.PixelArtTools.Colors.ColorPickingWithUndo.Error {
      static id() {
        return "".concat(Asset.id(), ".Error");
      }
      static assetClass() {
        return Asset;
      }
    }
    ;
    Error.initialize();
    return Error;
  }.call(this);
  return QuickColorPicking;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"helpers":{"helpers.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/helpers/helpers.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Helpers = function () {
  class Helpers extends PAA.Tutorials.Drawing.PixelArtTools {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Helpers';
    }
    static fullName() {
      return "像素画工具：辅助工具";
    }
    static assets() {
      return [this.Zoom, this.Lines, this.MoveCanvas, this.UndoRedo];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.Intro.Tutorial))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.Intro.Tutorial.Content.DrawingTutorials.Helpers);
    }
  }
  ;
  Helpers.initialize();
  return Helpers;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"zoom.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/helpers/zoom.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Helpers.Zoom = function () {
  var Asset;
  class Zoom extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Helpers.Zoom';
    }
    static displayName() {
      return "Zoom";
    }
    static description() {
      return "处理更大的图片需要放大和缩小来方便绘画。\n\n快捷键：鼠标滚轮或 Cmd/ctrl 配合 +/-";
    }
    static fixedDimensions() {
      return {
        width: 64,
        height: 40
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static bitmapString() {
      return "|                    0000\n|                   000 000 0 000000000000000000\n|                 000 00 0000000000000    00000000\n|      00000     00000000 0     00  0    0 0    000    00000\n|     0    00   0 000000 00  0      0    0  0    0 0  00    0\n|     0    00000 0 000000 0  00000000 0     0     0 0000    0\n|      0000000 000 000 0 00        0 0    0 0     0000000000\n|             00    000000         0 0    0  0     0 0\n|             00    000000         00  0  00 0     00 0\n|            00      0 00           0  0  000       00 0\n|           0000 0000000000000       000000        000000\n|         00  0 0 0000000000  00 0 00 0000 00  000000 0 000\n|       00     0  00000000000  00 0  0    0  00 0 0      0 0\n|    000    0 0000             00000000000000000 0 0    0 0 0\n|  00    0 0 0000 0 0 0 0 0 0 0 0 0 0 0 0 000000  0 0        00\n| 0   0 0 0 0000000000000000000000000000000000000  0 0 0 0     0\n|0       0 0                                                    0\n|0  0 0 0 0 0   0 0     0               0 0 0   0 0 0 0 0 0 0 0 0\n|0 0 0 0 0 0 0 0 0 0 0 0                 0 0 0 0 0 0 0 0 0 0 0000\n|000000000000000000000000               000000000000000000000000\n|  0 0 0 0    00000000000               000000000000    0 0 0 000\n|  00 0 00    00000000000               000000000000    00 0 0 00\n| 00000000000000000000000               0000000000000000000000000\n| 00 0 0 0 0 000000000000               0000000000000 0 0 0 0 0 0\n| 00000000000000000000000               0000000000000000000000000\n|0                     0                                       00\n|0    0 0 0 0 0 0 0 0 0 0               0 0 0 0 0 0 0 0 0 0 0 0 0\n|0 0           0 0 0 0 00               00 0 0 0 0 0 0 0 0 0 0 00\n|00 0 0 0 0 0   0   0 0 0               0 0 0     0     0 0 0 0 0\n|0       0 0 0000 0000000               000000 0000 00 0000000000\n|00 0 0 0 0  000000000000               000000000000000 0 0 0 0 0\n| 0  0 0 0 00000000000000               0000000000000000000000000\n| 0 0 0 0 0 00000000000000000000000000000000000000000 0 0 0 0 00\n| 00 0 000000000000000000000000000000000000000000000000000000000\n| 00000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 000000\n| 00000000000000000000000000000000000000000000000000000000000000\n| 00 00000000000000000000000000000000000000000000000000000000000\n| 0 00000000000  00000000000000000000000000000000 00000000000000\n| 00 0 00000000                                   00000000000000\n|  00000000000                                     000000000000";
    }
    static goalBitmapString() {
      return "|                    0000\n|                   000 000 0 000000000000000000\n|                 000 00 0000000000000    00000000\n|      00000     00000000 0     00  0    0 0    000    00000\n|     0    00   0 000000 00  0      0    0  0    0 0  00    0\n|     0    00000 0 000000 0  00000000 0     0     0 0000    0\n|      0000000 000 000 0 00        0 0    0 0     0000000000\n|             00    000000         0 0    0  0     0 0\n|             00    000000         00  0  00 0     00 0\n|            00      0 00           0  0  000       00 0\n|           0000 0000000000000       000000        000000\n|         00  0 0 0000000000  00 0 00 0000 00  000000 0 000\n|       00     0  00000000000  00 0  0    0  00 0 0      0 0\n|    000    0 0000             00000000000000000 0 0    0 0 0\n|  00    0 0 0000 0 0 0 0 0 0 0 0 0 0 0 0 000000  0 0        00\n| 0   0 0 0 0000000000000000000000000000000000000  0 0 0 0     0\n|0       0 0                                                    0\n|0  0 0 0 0 0   0 0     0   0 0 0 0 0 0 0 0 0   0 0 0 0 0 0 0 0 0\n|0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 000 0 0 0 0 0 0 0 0 0 0 0 0 0 0000\n|000000000000000000000000000000  0000000000000000000000000000000\n|  0 0 0 0    0000000000000000 0  000000000000000000    0 0 0 000\n|  00 0 00    000000000000000000 0000000000000000000    00 0 0 00\n| 0000000000000000000000000000    0 00000000000000000000000000000\n| 00 0 0 0 0 00000000000000000 0   000000000000000000 0 0 0 0 0 0\n| 00000000000000000000000000000 0 0000000000000000000000000000000\n|0                     0   0   0 000   0                       00\n|0    0 0 0 0 0 0 0 0 0 00000000000000000 0 0 0 0 0 0 0 0 0 0 0 0\n|0 0           0 0 0 0 00  0  0  0 0    00 0 0 0 0 0 0 0 0 0 0 00\n|00 0 0 0 0 0   0   0 0 0    0    0 0   0 0 0     0     0 0 0 0 0\n|0       0 0 0000 0000000  0      0     000000 0000 00 0000000000\n|00 0 0 0 0  000000000000   0 00  0 0   000000000000000 0 0 0 0 0\n| 0  0 0 0 00000000000000               0000000000000000000000000\n| 0 0 0 0 0 00000000000000000000000000000000000000000 0 0 0 0 00\n| 00 0 000000000000000000000000000000000000000000000000000000000\n| 00000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 000000\n| 00000000000000000000000000000000000000000000000000000000000000\n| 00 00000000000000000000000000000000000000000000000000000000000\n| 0 00000000000  00000000000000000000000000000000 00000000000000\n| 00 0 00000000                                   00000000000000\n|  00000000000                                     000000000000";
    }
    static bitmapInfo() {
      return "Artwork from Out Run (ZX Spectrum), Probe Software, 1987";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas];
    }
  }
  ;
  Zoom.initialize();
  Asset = Zoom;
  Zoom.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "使用计算器上的加号和减号按钮来放大和缩小。\n\n快捷键：鼠标滚轮或 Cmd/ctrl 配合 +/-";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        return !asset.completed();
      }
      onActivate() {
        var drawingEditor, pixelCanvasEditor;
        super.onActivate(...arguments);
        drawingEditor = this.getEditor();
        pixelCanvasEditor = drawingEditor.interface.getEditorForActiveFile();
        return this._initialScale = pixelCanvasEditor.camera().scale();
      }
      completedConditions() {
        var drawingEditor, pixelCanvasEditor;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        pixelCanvasEditor = drawingEditor.interface.getEditorForActiveFile();
        return this._initialScale !== pixelCanvasEditor.camera().scale();
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return Zoom;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"movecanvas.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/helpers/movecanvas.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Helpers.MoveCanvas = function () {
  var Asset;
  class MoveCanvas extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Helpers.MoveCanvas';
    }
    static displayName() {
      return "Move image";
    }
    static description() {
      return "处理更大的作品时，你需要移动它来聚焦不同的细节。\n\n快捷键：H（抓手）\n\n快速快捷键：空格键或鼠标中键";
    }
    static fixedDimensions() {
      return {
        width: 256,
        height: 32
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static minClipboardScale() {
      return 1;
    }
    static imageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelarttools/helpers/outrun-hills.png";
    }
    static goalImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelarttools/helpers/outrun-hills-goal.png";
    }
    static bitmapInfo() {
      return "Artwork from Out Run (ZX Spectrum), Probe Software, 1987";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas];
    }
  }
  ;
  MoveCanvas.initialize();
  Asset = MoveCanvas;
  MoveCanvas.Tool = function () {
    class Tool extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tool");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "按住空格键或鼠标中键临时切换到抓手光标。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        return !asset.completed();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
      completedConditions() {
        // Don't show this instruction after the move was made.
        return this.instructions.getInstruction(Asset.Instruction).completed();
      }
    }
    ;
    Tool.initialize();
    return Tool;
  }.call(this);
  MoveCanvas.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "点击并拖动在桌面上移动图片。";
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
      static priority() {
        return 1;
      }
      onActivate() {
        var drawingEditor, pixelCanvasEditor;
        super.onActivate(...arguments);
        drawingEditor = this.getEditor();
        pixelCanvasEditor = drawingEditor.interface.getEditorForActiveFile();
        return this._initialOrigin = pixelCanvasEditor.camera().origin();
      }
      activeConditions() {
        var asset, drawingEditor, pixelCanvasEditor;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (asset.completed()) {
          return;
        }
        drawingEditor = this.getEditor();

        // If the origin has been changed, the instruction needs to keep being active so it can
        // be completed even if the tool changes (like it does when activated via the hold button).
        if (this._initialOrigin) {
          pixelCanvasEditor = drawingEditor.interface.getEditorForActiveFile();
          if (!EJSON.equals(this._initialOrigin, pixelCanvasEditor.camera().origin())) {
            return true;
          }
        }
        return drawingEditor.interface.activeToolId() === PAA.PixelPad.Apps.Drawing.Editor.Desktop.Tools.MoveCanvas.id();
      }
      completedConditions() {
        var drawingEditor, moveCanvas, pixelCanvasEditor;
        // Wait until the origin has been changed.
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        pixelCanvasEditor = drawingEditor.interface.getEditorForActiveFile();
        if (EJSON.equals(this._initialOrigin, pixelCanvasEditor.camera().origin())) {
          return;
        }

        // Wait until the move has finished so the text doesn't disappear immediately.
        if (drawingEditor.interface.activeToolId() === PAA.PixelPad.Apps.Drawing.Editor.Desktop.Tools.MoveCanvas.id()) {
          moveCanvas = drawingEditor.interface.activeTool();
          return !moveCanvas.moving();
        } else {
          return true;
        }
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return MoveCanvas;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"undoredo.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/helpers/undoredo.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtTools.Helpers.UndoRedo = function () {
  var Asset;
  class UndoRedo extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Helpers.UndoRedo';
    }
    static displayName() {
      return "Undo/redo";
    }
    static description() {
      return "数字绘画最大的优势之一就是能够撤销我们的操作。\n\n快捷键：\n- Cmd/ctrl + Z：撤销\n- Cmd/ctrl + Y：重做\n- Cmd/ctrl + shift + Z：重做";
    }
    static fixedDimensions() {
      return {
        width: 59,
        height: 59
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static imageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelarttools/helpers/codemasters.png";
    }
    static goalImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelarttools/helpers/codemasters-goal.png";
    }
    static bitmapInfo() {
      return "CodeMasters logo from the loading screen of Fast Food (ZX Spectrum), 1989";
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo];
    }
  }
  ;
  UndoRedo.initialize();
  Asset = UndoRedo;
  UndoRedo.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "完成 CodeMasters 标志上的抖动图案。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  UndoRedo.Error = function () {
    class Error extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Error");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "哎呀！使用铅笔下方的撤销按钮回到正轨。\n\n快捷键：\n- Cmd/ctrl + Z：撤销\n- Cmd/ctrl + Y：重做\n- Cmd/ctrl + shift + Z：重做";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when there are any extra pixels present.
        return asset.hasExtraPixels();
      }
      static priority() {
        return 1;
      }
    }
    ;
    Error.initialize();
    return Error;
  }.call(this);
  return UndoRedo;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelarttools/helpers/lines.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA, TextOriginPosition;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TextOriginPosition = PAA.Practice.Helpers.Drawing.Markup.TextOriginPosition;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtTools.Helpers.Lines = function () {
  var Asset;
  class Lines extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtTools.Helpers.Lines';
    }
    static displayName() {
      return "Lines";
    }
    static description() {
      return "学习如何用铅笔工具快速画线。";
    }
    static fixedDimensions() {
      return {
        width: 57,
        height: 32
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 5; step = ++i) {
        results.push({
          goalImageUrl: "/pixelartacademy/tutorials/drawing/pixelarttools/helpers/720-".concat(step, ".png"),
          imageUrl: step === 1 ? "/pixelartacademy/tutorials/drawing/pixelarttools/helpers/720.png" : void 0
        });
      }
      return results;
    }
    static bitmapInfo() {
      return "Artwork from 720° (ZX Spectrum), Atari, 1987";
    }
    static markup() {
      return true;
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas];
    }
    initializeSteps() {
      var i, len, ref, results, step, stepArea, stepIndex;
      super.initializeSteps(...arguments);

      // Allow steps to complete with extra pixels so that we can show only line ends, but continue with a line drawn.
      stepArea = this.stepAreas()[0];
      ref = stepArea.steps();
      results = [];
      for (stepIndex = i = 0, len = ref.length; i < len; stepIndex = ++i) {
        step = ref[stepIndex];
        if (stepIndex === 1 || stepIndex === 2) {
          results.push(step.options.canCompleteWithExtraPixels = true);
        }
      }
      return results;
    }
  }
  ;
  Lines.initialize();
  Asset = Lines;
  Lines.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
    static stepNumber() {
      throw new AE.NotImplementedException("Instruction step must provide the step number.");
    }
    static assetClass() {
      return Asset;
    }
    static activeConditions() {
      var asset;
      if (!(asset = this.getActiveAsset())) {
        return;
      }

      // Show with the correct step.
      return asset.stepAreas()[0].activeStepIndex() === this.stepNumber() - 1;
    }
  };
  Lines.Tool = function () {
    class Tool extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tool");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "选择铅笔开始像往常一样绘画。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        return !asset.completed();
      }
      static completedConditions() {
        var editor;
        editor = this.getEditor();
        return editor.interface.activeToolId() === LOI.Assets.SpriteEditor.Tools.Pencil.id();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
    }
    ;
    Tool.initialize();
    return Tool;
  }.call(this);
  Lines.LineStart = function () {
    class LineStart extends Lines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LineStart");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "点击指示的像素开始画一条新线。";
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = Markup.defaultStyle();
        arrowBase = {
          arrow: {
            end: true
          },
          style: markupStyle
        };
        textBase = Markup.textBase();
        return [{
          line: _.extend({}, arrowBase, {
            points: [{
              x: 4,
              y: 20.5
            }, {
              x: 5.5,
              y: 23.5,
              bezierControlPoints: [{
                x: 4,
                y: 22
              }, {
                x: 5.25,
                y: 23.25
              }]
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 4,
              y: 20,
              origin: TextOriginPosition.BottomCenter
            },
            value: "start\nhere"
          })
        }];
      }
    }
    ;
    LineStart.initialize();
    return LineStart;
  }.call(this);
  Lines.LineEnd = function () {
    class LineEnd extends Lines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LineEnd");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "按住 shift 键并点击终点像素来画出这条线。";
      }
    }
    ;
    LineEnd.initialize();
    return LineEnd;
  }.call(this);
  Lines.LineSequence = function () {
    class LineSequence extends Lines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LineSequence");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "你可以一直按住 shift 键来连续连接多条线。";
      }
    }
    ;
    LineSequence.initialize();
    return LineSequence;
  }.call(this);
  Lines.SeparateLines = function () {
    class SeparateLines extends Lines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".SeparateLines");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "任何时候想开始画一条独立的线时就松开 shift 键。";
      }
    }
    ;
    SeparateLines.initialize();
    return SeparateLines;
  }.call(this);
  return Lines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"elementsofart":{"elementsofart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/elementsofart.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt = class ElementsOfArt extends PAA.Practice.Tutorials.Drawing.Tutorial {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"errorinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/errorinstruction.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.ErrorInstruction = class ErrorInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
  static assetClass() {
    throw new AE.NotImplementedException("Error instruction must provide which assets to be displayed with.");
  }
  static activeConditions() {
    var activeTool, asset, editor, pencil;
    if (!(asset = this.getActiveAsset())) {
      return;
    }

    // Show when there are any extra pixels present.
    if (!asset.hasExtraPixels()) {
      return;
    }

    // Wait for the stroke to have finished.
    editor = this.getEditor();
    activeTool = editor.interface.activeTool();
    if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Pencil)) {
      return true;
    }
    pencil = activeTool;
    return !pencil.strokeActive();
  }
  static priority() {
    return 1;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line":{"line.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/line.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line = function () {
  class Line extends PAA.Tutorials.Drawing.ElementsOfArt {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Line';
    }
    static fullName() {
      return "艺术元素：线条";
    }
    static assets() {
      return [this.StraightLines, this.CurvedLines, this.BrokenLines, this.BrokenLines2, this.Outlines, this.Outlines2, this.Edges, this.Patterns];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Line);
    }
  }
  ;
  Line.initialize();
  return Line;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/asset.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.Asset = class Asset extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static id() {
    return "PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Line.".concat(_.pascalCase(this.displayName()));
  }
  static restrictedPaletteName() {
    return LOI.Assets.Palette.SystemPaletteNames.Black;
  }
  static svgUrl() {
    return "/pixelartacademy/tutorials/drawing/elementsofart/line/".concat(_.fileCase(this.displayName()), ".svg");
  }
  static breakPathsIntoSteps() {
    return true;
  }
  static minClipboardScale() {
    return 2;
  }
  availableToolKeys() {
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetwithreferences.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/assetwithreferences.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.AssetWithReferences = class AssetWithReferences extends PAA.Tutorials.Drawing.ElementsOfArt.Line.Asset {
  static referenceNames() {
    throw new AE.NotImplementedException("Asset with references must provide reference names.");
  }
  static svgUrl() {
    return null;
  }
  static goalChoices() {
    var i, len, name, ref, results;
    ref = this.referenceNames();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      results.push({
        referenceUrl: "/pixelartacademy/tutorials/drawing/elementsofart/line/".concat(name, ".jpg"),
        svgUrl: "/pixelartacademy/tutorials/drawing/elementsofart/line/".concat(name, ".svg")
      });
    }
    return results;
  }
  static references() {
    var i, len, name, ref, results;
    ref = this.referenceNames();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      results.push("/pixelartacademy/tutorials/drawing/elementsofart/line/".concat(name, ".jpg"));
    }
    return results;
  }
  static breakPathsIntoSteps() {
    return false;
  }
  availableToolKeys() {
    return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.References]);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"straightlines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/straightlines.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.StraightLines = function () {
  var Asset;
  class StraightLines extends PAA.Tutorials.Drawing.ElementsOfArt.Line.Asset {
    static displayName() {
      return "Straight lines";
    }
    static description() {
      return "最直接的线条！如果你熟悉你的工具，按 shift 点击就能轻松画出来。";
    }
    static fixedDimensions() {
      return {
        width: 28,
        height: 28
      };
    }
  }
  ;
  StraightLines.initialize();
  Asset = StraightLines;
  StraightLines.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用铅笔画这条线。你可以用以下方式：\n\n- 点击线条经过的各个像素。\n- 沿线条点击并拖动，一笔画完。\n- 点击起始像素，然后 shift 点击终点像素。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return StraightLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"curvedlines.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/curvedlines.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.CurvedLines = function () {
  var Asset;
  class CurvedLines extends PAA.Tutorials.Drawing.ElementsOfArt.Line.Asset {
    static displayName() {
      return "Curved lines";
    }
    static description() {
      return "曲线更复杂，需要更多练习，但在像素画中修复它们总是很容易的。";
    }
    static fixedDimensions() {
      return {
        width: 38,
        height: 35
      };
    }
  }
  ;
  CurvedLines.initialize();
  Asset = CurvedLines;
  CurvedLines.FirstWay = function () {
    class FirstWay extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".FirstWay");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "用铅笔画曲线有多种方法。最难但最自然的方式是：\n1. 沿线条点击并拖动，一笔画完。";
      }
    }
    ;
    FirstWay.initialize();
    return FirstWay;
  }.call(this);
  CurvedLines.SecondWay = function () {
    class SecondWay extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".SecondWay");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "别担心线条看起来歪歪扭扭的，你以后会学到如何清理它。现在尝试一个能确保1像素宽度的方法：\n2. 点击起始像素。按住 shift 键。小步沿线条点击，用许多直线段画出一条曲线。";
      }
    }
    ;
    SecondWay.initialize();
    return SecondWay;
  }.call(this);
  CurvedLines.ThirdWay = function () {
    class ThirdWay extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".ThirdWay");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "最后一种技术最慢，但提供最多的控制：\n3. 放大并点击线条最清晰经过的像素。";
      }
    }
    ;
    ThirdWay.initialize();
    return ThirdWay;
  }.call(this);
  CurvedLines.AnyWay = function () {
    class AnyWay extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".AnyWay");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "用你喜欢的方式完成最后的曲线。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show until the asset is completed.
        if (asset.completed()) {
          return;
        }
        return super.activeConditions(...arguments);
      }
    }
    ;
    AnyWay.initialize();
    return AnyWay;
  }.call(this);
  CurvedLines.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "你做到了！\n\n别担心如果还不满意外观。你很快就会学到像素画曲线的规则。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return CurvedLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"brokenlines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/brokenlines.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.BrokenLines = function () {
  var Asset;
  class BrokenLines extends PAA.Tutorials.Drawing.ElementsOfArt.Line.Asset {
    static displayName() {
      return "Broken lines";
    }
    static description() {
      return "线条经常在角落改变方向来创造更复杂的设计。";
    }
    static fixedDimensions() {
      return {
        width: 65,
        height: 27
      };
    }
  }
  ;
  BrokenLines.initialize();
  Asset = BrokenLines;
  BrokenLines.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "把直线和曲线从角落连接到角落。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return BrokenLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"brokenlines2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/brokenlines2.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.BrokenLines2 = function () {
  var Asset;
  class BrokenLines2 extends PAA.Tutorials.Drawing.ElementsOfArt.Line.Asset {
    static displayName() {
      return "Broken lines 2";
    }
    static description() {
      return "即使你没有意识到，你写一辈子的字其实一直在练习画断线。";
    }
    static fixedDimensions() {
      return {
        width: 54,
        height: 21
      };
    }
  }
  ;
  BrokenLines2.initialize();
  Asset = BrokenLines2;
  BrokenLines2.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "结合你画直线和曲线的技能来画出所有数字。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return BrokenLines2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"outlines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/outlines.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.Outlines = function () {
  var Asset;
  class Outlines extends PAA.Tutorials.Drawing.ElementsOfArt.Line.AssetWithReferences {
    static displayName() {
      return "Outlines";
    }
    static description() {
      return "如果把线条连接起来，你可以画出物体的轮廓。";
    }
    static fixedDimensions() {
      return {
        width: 25,
        height: 25
      };
    }
    static referenceNames() {
      return ['outlines-banana', 'outlines-orange', 'outlines-apple'];
    }
  }
  ;
  Outlines.initialize();
  Asset = Outlines;
  Outlines.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "通过结合直线、曲线和断线来画出物体的轮廓。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return Outlines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"outlines2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/outlines2.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.Outlines2 = function () {
  var Asset;
  class Outlines2 extends PAA.Tutorials.Drawing.ElementsOfArt.Line.AssetWithReferences {
    static displayName() {
      return "Outlines 2";
    }
    static description() {
      return "有些物体可以用更风格化的方式绘制。";
    }
    static fixedDimensions() {
      return {
        width: 29,
        height: 39
      };
    }
    static referenceNames() {
      return ['outlines-palmtree', 'outlines-sprucetree'];
    }
  }
  ;
  Outlines2.initialize();
  Asset = Outlines2;
  Outlines2.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "通过结合直线、曲线和断线来画出物体的轮廓。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return Outlines2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"edges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/edges.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.Edges = function () {
  var Asset;
  class Edges extends PAA.Tutorials.Drawing.ElementsOfArt.Line.AssetWithReferences {
    static displayName() {
      return "Edges";
    }
    static description() {
      return "线条也可以用来画物体的内部边缘。";
    }
    static fixedDimensions() {
      return {
        width: 33,
        height: 33
      };
    }
    static referenceNames() {
      return ['edges-cube', 'edges-pottedplant'];
    }
  }
  ;
  Edges.initialize();
  Asset = Edges;
  Edges.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "通过结合直线、曲线和断线来画这个物体。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return Edges;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"patterns.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/patterns.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.Patterns = function () {
  var Asset;
  class Patterns extends PAA.Tutorials.Drawing.ElementsOfArt.Line.AssetWithReferences {
    static displayName() {
      return "Patterns";
    }
    static description() {
      return "我们可以把线条排列成图案来表示细节、纹理或阴影。";
    }
    static fixedDimensions() {
      return {
        width: 29,
        height: 29
      };
    }
    static referenceNames() {
      return ['patterns-bamboo', 'patterns-sunset'];
    }
  }
  ;
  Patterns.initialize();
  Asset = Patterns;
  Patterns.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "通过结合直线、曲线和断线详细地画出这个物体。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return Patterns;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"errorinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/errorinstruction.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.ErrorInstruction = function () {
  class ErrorInstruction extends PAA.Tutorials.Drawing.ElementsOfArt.ErrorInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Line.ErrorInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.ElementsOfArt.Line.Asset;
    }
    static message() {
      return "你离线条太远了，但别担心。用橡皮擦很容易修复。";
    }
  }
  ;
  ErrorInstruction.initialize();
  return ErrorInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"referencestrayinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/line/referencestrayinstruction.coffee           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Line.ReferencesTrayInstruction = function () {
  class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.Instructions.ReferencesTrayInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Line.ReferencesTrayInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.ElementsOfArt.Line.AssetWithReferences;
    }
    static firstAssetClass() {
      return PAA.Tutorials.Drawing.ElementsOfArt.Line.Outlines;
    }
    static message() {
      return "打开参考图片栏，选择一个你想画的物体。";
    }
  }
  ;
  ReferencesTrayInstruction.initialize();
  return ReferencesTrayInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"shape":{"shape.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/shape.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape = function () {
  class Shape extends PAA.Tutorials.Drawing.ElementsOfArt {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Shape';
    }
    static fullName() {
      return "艺术元素：形状";
    }
    static assets() {
      return [this.BasicShapes, this.CombiningBasicShapes, this.TransformedBasicShapes, this.BasicShapesBreakdown, this.Detailing, this.SolidShapes, this.OrganicShapes, this.OrganicShapes2];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.ElementsOfArt.Shape);
    }
  }
  ;
  Shape.initialize();
  return Shape;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/asset.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.Asset = class Asset extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static id() {
    return "PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Shape.".concat(_.pascalCase(this.displayName()));
  }
  static restrictedPaletteName() {
    return LOI.Assets.Palette.SystemPaletteNames.Black;
  }
  static svgUrl() {
    return "/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(_.fileCase(this.displayName()), ".svg");
  }
  static breakPathsIntoSteps() {
    return true;
  }
  availableToolKeys() {
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.Line, PAA.Practice.Software.Tools.ToolKeys.Rectangle, PAA.Practice.Software.Tools.ToolKeys.Ellipse];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetwithreferences.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/assetwithreferences.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.AssetWithReferences = class AssetWithReferences extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.Asset {
  static referenceNames() {
    throw new AE.NotImplementedException("Asset with references must provide reference names.");
  }
  static svgUrl() {
    return null;
  }
  static goalChoices() {
    var i, len, name, ref, results;
    ref = this.referenceNames();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      results.push({
        referenceUrl: "/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, ".jpg"),
        svgUrl: "/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, ".svg")
      });
    }
    return results;
  }
  static references() {
    var i, len, name, ref, results;
    ref = this.referenceNames();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      results.push("/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, ".jpg"));
    }
    return results;
  }
  availableToolKeys() {
    return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.References]);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cleanconstructionlinesstep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/cleanconstructionlinesstep.coffee         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA, TutorialBitmap;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.CleanConstructionLinesStep = class CleanConstructionLinesStep extends TutorialBitmap.Step {
  completed() {
    var bitmapLayer, i, j, pixel, ref, ref1, ref2, ref3, x, y;
    if (!super.completed(...arguments)) {
      return;
    }

    // Make sure all pixels are the first ramp.
    if (!(bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0)) {
      return;
    }
    for (x = i = 0, ref1 = this.stepArea.bounds.width; 0 <= ref1 ? i < ref1 : i > ref1; x = 0 <= ref1 ? ++i : --i) {
      for (y = j = 0, ref2 = this.stepArea.bounds.height; 0 <= ref2 ? j < ref2 : j > ref2; y = 0 <= ref2 ? ++j : --j) {
        if (!(pixel = bitmapLayer.getPixel(this.stepArea.bounds.x + x, this.stepArea.bounds.y + y))) {
          continue;
        }
        if ((ref3 = pixel.paletteColor) != null ? ref3.ramp : void 0) {
          return false;
        }
      }
    }
    return true;
  }
  solve() {
    var absoluteX, absoluteY, bitmap, bitmapLayer, i, j, pixel, pixels, ref, ref1, ref2, strokeAction, x, y;
    bitmap = this.tutorialBitmap.bitmap();
    bitmapLayer = bitmap.layers[0];
    pixels = [];
    for (x = i = 0, ref = this.stepArea.bounds.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      for (y = j = 0, ref1 = this.stepArea.bounds.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
        absoluteX = this.stepArea.bounds.x + x;
        absoluteY = this.stepArea.bounds.y + y;
        if (!(pixel = bitmapLayer.getPixel(absoluteX, absoluteY))) {
          continue;
        }
        if (!((ref2 = pixel.paletteColor) != null ? ref2.ramp : void 0)) {
          continue;
        }
        pixels.push({
          x: absoluteX,
          y: absoluteY
        });
      }
    }

    // Replace the layer pixels in this bitmap.
    strokeAction = new LOI.Assets.Bitmap.Actions.Stroke(this.tutorialBitmap.id(), bitmap, [0], pixels);
    return AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, strokeAction, new Date());
  }
  drawOverlaidHints(context, renderOptions) {
    var bitmapLayer, i, j, pixel, ref, ref1, ref2, ref3, x, y;
    this._prepareColorHelp(context, renderOptions);
    bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0;
    for (x = i = 0, ref1 = this.stepArea.bounds.width; 0 <= ref1 ? i < ref1 : i > ref1; x = 0 <= ref1 ? ++i : --i) {
      for (y = j = 0, ref2 = this.stepArea.bounds.height; 0 <= ref2 ? j < ref2 : j > ref2; y = 0 <= ref2 ? ++j : --j) {
        if (!(pixel = bitmapLayer.getPixel(this.stepArea.bounds.x + x, this.stepArea.bounds.y + y))) {
          continue;
        }
        if (!((ref3 = pixel.paletteColor) != null ? ref3.ramp : void 0)) {
          continue;
        }
        this._drawColorHelpForPixel(context, x, y, null, null, true, renderOptions);
      }
    }
  }
};

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"errorinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/errorinstruction.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.ErrorInstruction = function () {
  class ErrorInstruction extends PAA.Tutorials.Drawing.ElementsOfArt.ErrorInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Shape.ErrorInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.ElementsOfArt.Shape.Asset;
    }
    static message() {
      return "你离线条有点远了。";
    }
  }
  ;
  ErrorInstruction.initialize();
  return ErrorInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"referencestrayinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/referencestrayinstruction.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.ReferencesTrayInstruction = function () {
  class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.Instructions.ReferencesTrayInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Shape.ReferencesTrayInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.ElementsOfArt.Shape.AssetWithReferences;
    }
    static firstAssetClass() {
      return PAA.Tutorials.Drawing.ElementsOfArt.Shape.BasicShapesBreakdown;
    }
    static message() {
      return "打开参考图片栏，选择一个你想画的场景。";
    }
  }
  ;
  ReferencesTrayInstruction.initialize();
  return ReferencesTrayInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cleanupconstructionlinesinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/cleanupconstructionlinesinstruction.coffe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.CleanUpConstructionLinesInstruction = function () {
  class CleanUpConstructionLinesInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.ElementsOfArt.Shape.CleanUpConstructionLinesInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.ElementsOfArt.Shape.AssetWithReferences;
    }
    static message() {
      return "删除蓝色来清理线稿。";
    }
    static activeConditions() {
      var activeStep, asset, i, len, ref, stepArea;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      ref = asset.stepAreas();

      // Show if any of the active steps are cleanup steps.
      for (i = 0, len = ref.length; i < len; i++) {
        stepArea = ref[i];
        if (!!stepArea.completed()) {
          continue;
        }
        if (!(activeStep = stepArea.activeStep())) {
          continue;
        }
        if (activeStep instanceof PAA.Tutorials.Drawing.ElementsOfArt.Shape.CleanConstructionLinesStep) {
          return true;
        }
      }
      return false;
    }
    static delayOnActivate() {
      return false;
    }
    static priority() {
      return 3;
    }
  }
  ;
  CleanUpConstructionLinesInstruction.initialize();
  return CleanUpConstructionLinesInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"requiredrampinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/requiredrampinstruction.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.RequiredRampInstruction = class RequiredRampInstruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
  static requiredRamp() {
    throw new AE.NotImplementedException("Required ramp instruction must specify a required ramp.");
  }
  static requiredStepPropertyName() {
    throw new AE.NotImplementedException("Required ramp instruction must specify what property to check to be the correct step.");
  }
  static activeConditions() {
    var activeStep, asset, i, len, ref, requiredStepPropertyName, stepArea;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    requiredStepPropertyName = this.requiredStepPropertyName();
    ref = asset.stepAreas();

    // Show if any of the active steps has the required options property.
    for (i = 0, len = ref.length; i < len; i++) {
      stepArea = ref[i];
      if (!(activeStep = stepArea.activeStep())) {
        continue;
      }
      if (activeStep.options[requiredStepPropertyName]) {
        return true;
      }
    }
    return false;
  }
  delayDuration() {
    var asset, bitmap, bitmapLayer, defaultDelayDuration, i, j, pixel, ref, ref1, ref2, requiredRamp, x, y;
    defaultDelayDuration = super.delayDuration(...arguments);
    if (!(asset = this.getActiveAsset())) {
      return defaultDelayDuration;
    }
    if (!(bitmap = asset.bitmap())) {
      // Display immediately if there are no pixels of the required ramp.
      return defaultDelayDuration;
    }
    bitmapLayer = bitmap.layers[0];
    requiredRamp = this.constructor.requiredRamp();
    for (x = i = 0, ref = bitmap.bounds.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      for (y = j = 0, ref1 = bitmap.bounds.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
        if (!(pixel = bitmapLayer.getPixel(x, y))) {
          continue;
        }
        if (((ref2 = pixel.paletteColor) != null ? ref2.ramp : void 0) === requiredRamp) {
          return defaultDelayDuration;
        }
      }
    }
    return 0;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"basicshapes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/basicshapes.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, InterfaceMarking, LOI, Markup, PAA;
AC = Artificial.Control;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.BasicShapes = function () {
  var Asset;
  class BasicShapes extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.Asset {
    static displayName() {
      return "Basic shapes";
    }
    static description() {
      return "开始学习绘画，你只需要会画3种基本形状。";
    }
    static fixedDimensions() {
      return {
        width: 109,
        height: 46
      };
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.Line, PAA.Practice.Software.Tools.ToolKeys.Rectangle, PAA.Practice.Software.Tools.ToolKeys.Ellipse];
    }
  }
  ;
  BasicShapes.initialize();
  Asset = BasicShapes;
  BasicShapes.Ruler1 = function () {
    class Ruler1 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Ruler1");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "用尺子画一个矩形。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when rectangle tool is not active.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        return !(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Rectangle);
      }
      markup() {
        var arrowBase, textBase;
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".fatamorgana-toolbox .tool.rectangle",
            bounds: {
              x: 0,
              y: 20,
              width: 50,
              height: 35
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                points: [{
                  x: 25,
                  y: 46
                }, {
                  x: 16,
                  y: 26,
                  bezierControlPoints: [{
                    x: 20,
                    y: 41
                  }, {
                    x: 16,
                    y: 36
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 25,
                  y: 48,
                  origin: Markup.TextOriginPosition.TopCenter
                },
                value: "click here"
              })
            }]
          }
        }];
      }
    }
    ;
    Ruler1.initialize();
    return Ruler1;
  }.call(this);
  BasicShapes.Draw1 = function () {
    class Draw1 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Draw1");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "从角落点击并拖动开始画。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when we're using the rectangle.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        return activeTool instanceof LOI.Assets.SpriteEditor.Tools.Rectangle;
      }
      static completedConditions() {
        var activeTool, editor;
        // Only show until we've tried drawing.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Rectangle)) {
          return;
        }
        return activeTool.drawingActive();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
    }
    ;
    Draw1.initialize();
    return Draw1;
  }.call(this);
  BasicShapes.Ruler2 = function () {
    class Ruler2 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Ruler2");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "用尺子的边缘来画三角形的边。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when rectangle tool is not active.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        return !(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Line);
      }
      markup() {
        var arrowBase, textBase;
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".fatamorgana-toolbox .tool.line",
            bounds: {
              x: -10,
              y: 20,
              width: 50,
              height: 45
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                points: [{
                  x: 15,
                  y: 57
                }, {
                  x: 5,
                  y: 38,
                  bezierControlPoints: [{
                    x: 10,
                    y: 52
                  }, {
                    x: 5,
                    y: 48
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 15,
                  y: 59,
                  origin: Markup.TextOriginPosition.TopCenter
                },
                value: "click here"
              })
            }]
          }
        }];
      }
    }
    ;
    Ruler2.initialize();
    return Ruler2;
  }.call(this);
  BasicShapes.Draw2 = function () {
    class Draw2 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Draw2");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "点击并拖动来画一条线。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when using the line tool.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        return activeTool instanceof LOI.Assets.SpriteEditor.Tools.Line;
      }
      static completedConditions() {
        var activeTool, editor;
        // Only show until we've tried drawing.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Line)) {
          return;
        }
        return activeTool.drawingActive();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
    }
    ;
    Draw2.initialize();
    return Draw2;
  }.call(this);
  BasicShapes.Ruler3 = function () {
    class Ruler3 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Ruler3");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "用尺子画一个椭圆。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when ellipse tool is not active.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        return !(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Ellipse);
      }
      markup() {
        var arrowBase, textBase;
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".fatamorgana-toolbox .tool.ellipse",
            bounds: {
              x: 0,
              y: 20,
              width: 50,
              height: 35
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                points: [{
                  x: 25,
                  y: 46
                }, {
                  x: 16,
                  y: 26,
                  bezierControlPoints: [{
                    x: 20,
                    y: 41
                  }, {
                    x: 16,
                    y: 36
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 25,
                  y: 48,
                  origin: Markup.TextOriginPosition.TopCenter
                },
                value: "click here"
              })
            }]
          }
        }];
      }
    }
    ;
    Ruler3.initialize();
    return Ruler3;
  }.call(this);
  BasicShapes.Draw3 = function () {
    class Draw3 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Draw3");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "点击并拖动开始画。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when we're using the ellipse.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        return activeTool instanceof LOI.Assets.SpriteEditor.Tools.Ellipse;
      }
      static completedConditions() {
        var activeTool, editor;
        // Only show until we've tried drawing.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Ellipse)) {
          return;
        }
        return activeTool.drawingActive();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
    }
    ;
    Draw3.initialize();
    return Draw3;
  }.call(this);
  BasicShapes.Movement = function () {
    class Movement extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Movement");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "按住空格键重新定位形状。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when we're using the ellipse.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Ellipse)) {
          return;
        }
        return activeTool.drawingActive();
      }
      static completedConditions() {
        var activeTool, editor;
        // Only show until we've tried moving.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Ellipse)) {
          return;
        }
        return activeTool.movementActive();
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
    }
    ;
    Movement.initialize();
    return Movement;
  }.call(this);
  BasicShapes.Constrain = function () {
    class Constrain extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Constrain");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "按住 shift 键将其限制为圆形。";
      }
      static activeConditions() {
        var activeTool, editor;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show when we're using the ellipse.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Ellipse)) {
          return;
        }
        if (activeTool.movementActive()) {
          return;
        }
        return activeTool.drawingActive();
      }
      static completedConditions() {
        var activeTool, editor, keyboardState;
        // Only show until we've tried moving.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (!(activeTool instanceof LOI.Assets.SpriteEditor.Tools.Ellipse)) {
          return;
        }
        if (!activeTool.drawingActive()) {
          return;
        }
        keyboardState = AC.Keyboard.getState();
        return keyboardState.isKeyDown(AC.Keys.shift);
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
    }
    ;
    Constrain.initialize();
    return Constrain;
  }.call(this);
  return BasicShapes;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"combiningbasicshapes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/combiningbasicshapes.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.CombiningBasicShapes = function () {
  var Asset;
  class CombiningBasicShapes extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.Asset {
    static displayName() {
      return "Combining basic shapes";
    }
    static description() {
      return "许多物体都可以由基本形状创建。";
    }
    static fixedDimensions() {
      return {
        width: 274,
        height: 85
      };
    }
    static imageUrl() {
      return "/pixelartacademy/tutorials/drawing/elementsofart/shape/combiningbasicshapes.png";
    }
    static markup() {
      return true;
    }
  }
  ;
  CombiningBasicShapes.initialize();
  Asset = CombiningBasicShapes;
  CombiningBasicShapes.Objects = function () {
    class Objects extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Objects");
      }
      static assetClass() {
        return Asset;
      }
      static activeConditions() {
        return this.getActiveAsset();
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
      static priority() {
        return -1;
      }
      markup() {
        var activeStepIndex, asset, markup, textBase, textTop;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        activeStepIndex = asset.stepAreas()[0].activeStepIndex();
        markup = [];
        textBase = Markup.textBase();
        textBase.size *= 2;
        textBase.lineHeight *= 2;
        textTop = 73;
        if (activeStepIndex > 5) {
          markup.push({
            text: _.extend({}, textBase, {
              value: "tree",
              position: {
                x: 43,
                y: textTop,
                origin: Markup.TextOriginPosition.TopCenter
              }
            })
          });
        }
        if (activeStepIndex > 7) {
          markup.push({
            text: _.extend({}, textBase, {
              value: "pine\ntree",
              position: {
                x: 81.5,
                y: textTop,
                origin: Markup.TextOriginPosition.TopCenter
              }
            })
          });
        }
        if (activeStepIndex > 9) {
          markup.push({
            text: _.extend({}, textBase, {
              value: "palm\ntree",
              position: {
                x: 118,
                y: textTop,
                origin: Markup.TextOriginPosition.TopCenter
              }
            })
          });
        }
        if (activeStepIndex > 11) {
          markup.push({
            text: _.extend({}, textBase, {
              value: "house",
              position: {
                x: 155.5,
                y: textTop,
                origin: Markup.TextOriginPosition.TopCenter
              }
            })
          });
        }
        if (activeStepIndex > 17) {
          markup.push({
            text: _.extend({}, textBase, {
              value: "temple",
              position: {
                x: 205.5,
                y: textTop,
                origin: Markup.TextOriginPosition.TopCenter
              }
            })
          });
        }
        if (asset.completed()) {
          markup.push({
            text: _.extend({}, textBase, {
              value: "lookout\ntower",
              position: {
                x: 242.5,
                y: textTop,
                origin: Markup.TextOriginPosition.TopCenter
              }
            })
          });
        }
        return markup;
      }
    }
    ;
    Objects.initialize();
    return Objects;
  }.call(this);
  CombiningBasicShapes.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "画出指示的形状来构建简单的物体。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return CombiningBasicShapes;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"transformedbasicshapes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/transformedbasicshapes.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.TransformedBasicShapes = function () {
  var Asset;
  class TransformedBasicShapes extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.Asset {
    static displayName() {
      return "Transformed basic shapes";
    }
    static description() {
      return "基本形状并不总是以默认方向出现。";
    }
    static fixedDimensions() {
      return {
        width: 100,
        height: 60
      };
    }
  }
  ;
  TransformedBasicShapes.initialize();
  Asset = TransformedBasicShapes;
  TransformedBasicShapes.Default = function () {
    class Default extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Default");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "只有一些物体能恰好放进正方形和圆形里。";
      }
    }
    ;
    Default.initialize();
    return Default;
  }.call(this);
  TransformedBasicShapes.Scaled = function () {
    class Scaled extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Scaled");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "你可能需要水平或垂直调整形状的大小，使用矩形和椭圆。";
      }
    }
    ;
    Scaled.initialize();
    return Scaled;
  }.call(this);
  TransformedBasicShapes.Rotated = function () {
    class Rotated extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Rotated");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "有时你甚至需要旋转形状。\n矩形和椭圆工具在这里帮不了太多忙，所以你必须用线条并手动画出曲线的像素。";
      }
    }
    ;
    Rotated.initialize();
    return Rotated;
  }.call(this);
  TransformedBasicShapes.Skewed = function () {
    class Skewed extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Skewed");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "最后，形状可以以各种方式倾斜，通常是为了达到透视效果。";
      }
    }
    ;
    Skewed.initialize();
    return Skewed;
  }.call(this);
  return TransformedBasicShapes;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"basicshapesbreakdown.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/basicshapesbreakdown.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.BasicShapesBreakdown = function () {
  var Asset;
  class BasicShapesBreakdown extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.AssetWithReferences {
    static displayName() {
      return "Basic shapes breakdown";
    }
    static description() {
      return "画一个场景时，你可以先把物体简化为基本形状。";
    }
    static fixedDimensions() {
      return {
        width: 160,
        height: 70
      };
    }
    static referenceNames() {
      return ['basicshapesbreakdown-island', 'basicshapesbreakdown-rangerstation'];
    }
    static canvasExtensionDirection() {
      return this.CanvasExtensionDirection.Vertical;
    }
  }
  ;
  BasicShapesBreakdown.initialize();
  Asset = BasicShapesBreakdown;
  BasicShapesBreakdown.Instruction = function () {
    class Instruction extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Instruction");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "按指示画线条和形状，根据参考图构建场景。";
      }
    }
    ;
    Instruction.initialize();
    return Instruction;
  }.call(this);
  return BasicShapesBreakdown;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"solidshapes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/solidshapes.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var InterfaceMarking, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.SolidShapes = function () {
  var Asset;
  class SolidShapes extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.Asset {
    static displayName() {
      return "Solid shapes";
    }
    static description() {
      return "形状可以填充颜色。";
    }
    static fixedDimensions() {
      return {
        width: 88,
        height: 42
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Pico8;
    }
    static backgroundColor() {
      return {
        paletteColor: {
          ramp: 13,
          shade: 0
        }
      };
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorPicker, PAA.Practice.Software.Tools.ToolKeys.ColorSwatches, PAA.Practice.Software.Tools.ToolKeys.ColorFill]);
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      var hintStrokeWidths, i, len, pathStep, pathsPerStep, pathsPerSteps, results, startIndex, stepIndex, svgPaths;
      svgPaths = Array.from(stepResources.svgPaths.svgPaths());
      pathsPerSteps = [1, 1, 1, 3, 8];
      hintStrokeWidths = [1, 1, 1, 1, 5];
      startIndex = 0;
      results = [];
      for (stepIndex = i = 0, len = pathsPerSteps.length; i < len; stepIndex = ++i) {
        pathsPerStep = pathsPerSteps[stepIndex];
        pathStep = new PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PathStep(this, stepArea, {
          svgPaths: svgPaths.slice(startIndex, startIndex + pathsPerStep),
          hintStrokeWidth: hintStrokeWidths[stepIndex]
        });
        startIndex += pathsPerStep;
        results.push(pathStep);
      }
      return results;
    }
  }
  ;
  SolidShapes.initialize();
  Asset = SolidShapes;
  SolidShapes.Lines = function () {
    class Lines extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Lines");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "线条通过围合空间来创建形状。";
      }
    }
    ;
    Lines.initialize();
    return Lines;
  }.call(this);
  SolidShapes.Fill = function () {
    class Fill extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Fill");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "可以通过填充封闭空间来使形状变成实体。";
      }
      constructor() {
        super(...arguments);
        this.filledRectangleCompleted = new ReactiveField(false);
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.filledRectangleCompleted(false);
      }
      markup() {
        var activeTool, arrowBase, editor, rectangleTool, textBase;
        if (this.filledRectangleCompleted()) {
          return;
        }
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();

        // Show when we're not on the filled rectangle.
        editor = this.getEditor();
        activeTool = editor.interface.activeTool();
        if (activeTool instanceof LOI.Assets.SpriteEditor.Tools.Rectangle) {
          rectangleTool = activeTool;
        }
        if (rectangleTool != null ? rectangleTool.data.get('filled') : void 0) {
          this.filledRectangleCompleted(true);
          return;
        }
        return [{
          interface: {
            selector: ".fatamorgana-toolbox .tool.rectangle",
            bounds: {
              x: 0,
              y: 20,
              width: 50,
              height: 50
            },
            markings: [{
              line: _.extend({}, arrowBase, {
                points: [{
                  x: 25,
                  y: 46
                }, {
                  x: 16,
                  y: 26,
                  bezierControlPoints: [{
                    x: 20,
                    y: 41
                  }, {
                    x: 16,
                    y: 36
                  }]
                }]
              })
            }, {
              text: _.extend({}, textBase, {
                position: {
                  x: 25,
                  y: 48,
                  origin: Markup.TextOriginPosition.TopCenter
                },
                value: rectangleTool ? "select again\nto fill" : "select\nrectangle"
              })
            }]
          }
        }];
      }
    }
    ;
    Fill.initialize();
    return Fill;
  }.call(this);
  SolidShapes.Combine = function () {
    class Combine extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Combine");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "实体形状可以组合起来创建复杂形状。";
      }
    }
    ;
    Combine.initialize();
    return Combine;
  }.call(this);
  SolidShapes.Colors = function () {
    class Colors extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Colors");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "通过使用多种颜色，我们可以为物体的每个部分创建形状。";
      }
    }
    ;
    Colors.initialize();
    return Colors;
  }.call(this);
  SolidShapes.LineColors = function () {
    class LineColors extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LineColors");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "轮廓也可以使用不同的颜色。";
      }
    }
    ;
    LineColors.initialize();
    return LineColors;
  }.call(this);
  return SolidShapes;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"organicshapes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/organicshapes.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.OrganicShapes = function () {
  var Asset;
  class OrganicShapes extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.AssetWithReferences {
    static displayName() {
      return "Organic shapes";
    }
    static description() {
      return "用较浅的颜色画基本形状可以作为放置指南。";
    }
    static fixedDimensions() {
      return {
        width: 80,
        height: 80
      };
    }
    static backgroundColor() {
      return new THREE.Color('#dedec4');
    }
    static restrictedPaletteName() {
      return null;
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 0,
            g: 0,
            b: 0
          }]
        }, {
          shades: [{
            r: 0,
            g: 0.6,
            b: 1
          }]
        }]
      });
    }
    static referenceNames() {
      return ['organicshapes-tree', 'organicshapes-plants'];
    }
    static detailingStepsCount() {
      return {
        'organicshapes-tree': 8,
        'organicshapes-plants': 13
      };
    }
    static goalChoices() {
      return null;
    }
    static resources() {
      var name, number;
      return {
        goalChoices: function () {
          var i, len, ref, results;
          ref = this.referenceNames();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            name = ref[i];
            results.push({
              referenceUrl: "/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, ".jpg"),
              svgPaths: new this.Resource.SvgPaths("/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, ".svg")),
              goalPixels: function () {
                var j, ref1, results1;
                results1 = [];
                for (number = j = 1, ref1 = this.detailingStepsCount()[name]; 1 <= ref1 ? j <= ref1 : j >= ref1; number = 1 <= ref1 ? ++j : --j) {
                  results1.push(new this.Resource.ImagePixels("/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, "-").concat(number, ".png")));
                }
                return results1;
              }.call(this)
            });
          }
          return results;
        }.call(this)
      };
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorPicker, PAA.Practice.Software.Tools.ToolKeys.ColorSwatches, PAA.Practice.Software.Tools.ToolKeys.ColorFill]);
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      var goalPixels, i, len, ref, steps, svgPath, svgPaths;
      svgPaths = stepResources.svgPaths.svgPaths();

      // Create basic shape steps.
      steps = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = svgPaths.length; i < len; i++) {
          svgPath = svgPaths[i];
          results.push(new PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PathStep(this, stepArea, {
            svgPaths: [svgPath],
            preserveCompleted: true,
            constructionStep: true
          }));
        }
        return results;
      }.call(this);
      ref = stepResources.goalPixels;

      // Add detailing steps.
      for (i = 0, len = ref.length; i < len; i++) {
        goalPixels = ref[i];
        steps.push(new PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PixelsStep(this, stepArea, {
          goalPixels: goalPixels,
          lineArtStep: true
        }));
      }

      // Add cleanup step.
      steps.push(new PAA.Tutorials.Drawing.ElementsOfArt.Shape.CleanConstructionLinesStep(this, stepArea));
      return steps;
    }
  }
  ;
  OrganicShapes.initialize();
  Asset = OrganicShapes;
  OrganicShapes.ConstructionShapes = function () {
    class ConstructionShapes extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.RequiredRampInstruction {
      static id() {
        return "".concat(Asset.id(), ".ConstructionShapes");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用蓝色大致标出物体较大部位在画面中的位置。";
      }
      static requiredStepPropertyName() {
        return 'constructionStep';
      }
      static requiredRamp() {
        return 1;
      }
      static priority() {
        return 1;
      }
    }
    ;
    ConstructionShapes.initialize();
    return ConstructionShapes;
  }.call(this);
  OrganicShapes.FinalShape = function () {
    class FinalShape extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.RequiredRampInstruction {
      static id() {
        return "".concat(Asset.id(), ".FinalShape");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用黑色画出物体的最终形状。";
      }
      static requiredStepPropertyName() {
        return 'lineArtStep';
      }
      static requiredRamp() {
        return 0;
      }
      static priority() {
        return 2;
      }
    }
    ;
    FinalShape.initialize();
    return FinalShape;
  }.call(this);
  return OrganicShapes;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"organicshapes2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/organicshapes2.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.OrganicShapes2 = function () {
  var Asset;
  class OrganicShapes2 extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.AssetWithReferences {
    static displayName() {
      return "Organic shapes 2";
    }
    static description() {
      return "画角色也通常从基本形状开始。";
    }
    static fixedDimensions() {
      return {
        width: 90,
        height: 90
      };
    }
    static backgroundColor() {
      return new THREE.Color('#e8cfb7');
    }
    static restrictedPaletteName() {
      return null;
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 0,
            g: 0,
            b: 0
          }]
        }, {
          shades: [{
            r: 0,
            g: 0.6,
            b: 1
          }]
        }]
      });
    }
    static referenceNames() {
      return ['organicshapes2-mickey', 'organicshapes2-cheshirecat'];
    }
    static bitmapInfoTexts() {
      return {
        'organicshapes2-mickey': "The Karnival Kid (Ub Iwerks, 1929)",
        'organicshapes2-cheshirecat': "Cheshire Cat in the Tree Above Alice (Sir John Tenniel, 1889)"
      };
    }
    bitmapInfo() {
      var assetData, i, len, ref, ref1, referenceKey, stepArea, texts;
      assetData = this.getAssetData();
      if (!((ref = assetData.stepAreas) != null ? ref.length : void 0)) {
        return;
      }
      texts = [];
      ref1 = assetData.stepAreas;
      for (i = 0, len = ref1.length; i < len; i++) {
        stepArea = ref1[i];
        if (!stepArea.referenceUrl) {
          continue;
        }
        referenceKey = stepArea.referenceUrl.match(/\/([^\/]*)\./)[1];
        texts.push(this.constructor.bitmapInfoTexts()[referenceKey]);
      }
      if (!texts.length) {
        return;
      }
      return "Fan art study based on ".concat(AB.Rules.English.createNounSeries(texts), ".");
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorPicker, PAA.Practice.Software.Tools.ToolKeys.ColorSwatches, PAA.Practice.Software.Tools.ToolKeys.ColorFill]);
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      var i, index, len, pathStep, steps;
      super.initializeStepsInAreaWithResources(...arguments);
      steps = stepArea.steps();

      // Mark construction and line art steps.
      for (index = i = 0, len = steps.length; i < len; index = ++i) {
        pathStep = steps[index];
        if (pathStep.paths[0].strokeColor.b) {
          pathStep.options.constructionStep = true;
          pathStep.options.preserveCompleted = true;
        } else {
          pathStep.options.lineArtStep = true;
        }
      }

      // Add cleanup step.
      steps.push(new PAA.Tutorials.Drawing.ElementsOfArt.Shape.CleanConstructionLinesStep(this, stepArea));
      return steps;
    }
  }
  ;
  OrganicShapes2.initialize();
  Asset = OrganicShapes2;
  OrganicShapes2.ReferencesTrayInstruction = function () {
    class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.ReferencesTrayInstruction {
      static id() {
        return "".concat(Asset.id(), ".ReferencesTrayInstruction");
      }
      static assetClass() {
        return PAA.Tutorials.Drawing.ElementsOfArt.Shape.OrganicShapes2;
      }
      static firstAssetClass() {
        return PAA.Tutorials.Drawing.ElementsOfArt.Shape.BasicShapesBreakdown;
      }
      static message() {
        return "打开参考图片栏，选择一个你想画的角色。";
      }
      static priority() {
        return 2;
      }
    }
    ;
    ReferencesTrayInstruction.initialize();
    return ReferencesTrayInstruction;
  }.call(this);
  OrganicShapes2.ConstructionShapes = function () {
    class ConstructionShapes extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.RequiredRampInstruction {
      static id() {
        return "".concat(Asset.id(), ".ConstructionShapes");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用蓝色画出角色的基本形状。";
      }
      static requiredStepPropertyName() {
        return 'constructionStep';
      }
      static requiredRamp() {
        return 1;
      }
      static priority() {
        return 1;
      }
    }
    ;
    ConstructionShapes.initialize();
    return ConstructionShapes;
  }.call(this);
  OrganicShapes2.FinalShape = function () {
    class FinalShape extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.RequiredRampInstruction {
      static id() {
        return "".concat(Asset.id(), ".FinalShape");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "用黑色画出角色的最终形状。";
      }
      static requiredStepPropertyName() {
        return 'lineArtStep';
      }
      static requiredRamp() {
        return 0;
      }
      static priority() {
        return 2;
      }
    }
    ;
    FinalShape.initialize();
    return FinalShape;
  }.call(this);
  return OrganicShapes2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"detailing":{"detailing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/detailing/detailing.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.ElementsOfArt.Shape.Detailing = function () {
  var Asset;
  class Detailing extends PAA.Tutorials.Drawing.ElementsOfArt.Shape.AssetWithReferences {
    static displayName() {
      return "Detailing";
    }
    static description() {
      return "基本形状是创建更复杂形状和添加细节的基础。";
    }
    static fixedDimensions() {
      return {
        width: 140,
        height: 140
      };
    }
    static referenceNames() {
      return ['detailing-church', 'detailing-temple'];
    }
    static detailingStepsCount() {
      return {
        'detailing-church': 3,
        'detailing-temple': 11
      };
    }
    static goalChoices() {
      return null;
    }
    static resources() {
      var name, number;
      return {
        goalChoices: function () {
          var i, len, ref, results;
          ref = this.referenceNames();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            name = ref[i];
            results.push({
              referenceUrl: "/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, ".jpg"),
              svgPaths: new this.Resource.SvgPaths("/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, ".svg")),
              goalPixels: function () {
                var j, ref1, results1;
                results1 = [];
                for (number = j = 1, ref1 = this.detailingStepsCount()[name]; 1 <= ref1 ? j <= ref1 : j >= ref1; number = 1 <= ref1 ? ++j : --j) {
                  results1.push(new this.Resource.ImagePixels("/pixelartacademy/tutorials/drawing/elementsofart/shape/".concat(name, "-").concat(number, ".png")));
                }
                return results1;
              }.call(this)
            });
          }
          return results;
        }.call(this)
      };
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      var goalPixels, i, len, ref, steps, svgPath, svgPaths;
      svgPaths = stepResources.svgPaths.svgPaths();
      // Create basic shape steps.
      steps = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = svgPaths.length; i < len; i++) {
          svgPath = svgPaths[i];
          results.push(new this.constructor.PathStep(this, stepArea, {
            svgPaths: [svgPath],
            preserveCompleted: true
          }));
        }
        return results;
      }.call(this);
      ref = stepResources.goalPixels;

      // Add detailing step.
      for (i = 0, len = ref.length; i < len; i++) {
        goalPixels = ref[i];
        steps.push(new this.constructor.DetailingStep(this, stepArea, {
          goalPixels: goalPixels,
          preserveCompleted: true
        }));
      }
      return steps;
    }
  }
  ;
  Detailing.initialize();
  Asset = Detailing;
  Detailing.BasicShapes = function () {
    class BasicShapes extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".BasicShapes");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "按指示画形状，根据参考图构建场景";
      }
      static activeConditions() {
        var activeStep, asset, i, len, ref, stepArea;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        ref = asset.stepAreas();

        // Show if any of the active steps are path steps.
        for (i = 0, len = ref.length; i < len; i++) {
          stepArea = ref[i];
          if (!!stepArea.completed()) {
            continue;
          }
          if (!(activeStep = stepArea.activeStep())) {
            continue;
          }
          if (activeStep instanceof PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PathStep) {
            return true;
          }
        }
        return false;
      }
      static priority() {
        return 1;
      }
    }
    ;
    BasicShapes.initialize();
    return BasicShapes;
  }.call(this);
  Detailing.Details = function () {
    class Details extends PAA.Tutorials.Drawing.Instructions.GeneralInstruction {
      static id() {
        return "".concat(Asset.id(), ".Details");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "添加细节并清理不需要的线条来完成绘画。";
      }
      static activeConditions() {
        var activeStep, asset, i, len, ref, stepArea;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        ref = asset.stepAreas();
        // Show if any of the active steps are pixel steps.
        for (i = 0, len = ref.length; i < len; i++) {
          stepArea = ref[i];
          if (!!stepArea.completed()) {
            continue;
          }
          if (!(activeStep = stepArea.activeStep())) {
            continue;
          }
          if (activeStep instanceof PAA.Tutorials.Drawing.ElementsOfArt.Shape.Detailing.DetailingStep) {
            return true;
          }
        }
        return false;
      }
      static delayOnActivate() {
        return false;
      }
      static priority() {
        return 2;
      }
    }
    ;
    Details.initialize();
    return Details;
  }.call(this);
  return Detailing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"detailingstep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/elementsofart/shape/detailing/detailingstep.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA, _blackAssetColor;
AB = Artificial.Babel;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
_blackAssetColor = {
  paletteColor: {
    ramp: 0,
    shade: 0
  }
};
PAA.Tutorials.Drawing.ElementsOfArt.Shape.Detailing.DetailingStep = class DetailingStep extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.Step {
  constructor() {
    var base, goalPixelsResource, i, len, name, pixel, ref;
    super(...arguments);
    goalPixelsResource = this.options.goalPixels;
    this.goalPixels = goalPixelsResource.pixels();

    // We create a map representation for fast retrieval as well.
    this.goalPixelsMap = {};
    ref = this.goalPixels;
    for (i = 0, len = ref.length; i < len; i++) {
      pixel = ref[i];
      if ((base = this.goalPixelsMap)[name = pixel.x] == null) {
        base[name] = {};
      }
      this.goalPixelsMap[pixel.x][pixel.y] = pixel.directColor.r === 0;
    }
  }
  completed() {
    var bitmapLayer, goalPixel, i, j, pixel, ref, ref1, ref2, ref3, x, y;
    if (!super.completed(...arguments)) {
      return;
    }

    // We have to make sure this step can first get active and report its pixels so that it can fail due to extra pixels.
    if (this.stepArea.activeStepIndex() == null) {
      return;
    }

    // Compare goal pixels with first bitmap layer.
    if (!(bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0)) {
      return;
    }
    for (x = i = 0, ref1 = this.stepArea.bounds.width; 0 <= ref1 ? i < ref1 : i > ref1; x = 0 <= ref1 ? ++i : --i) {
      for (y = j = 0, ref2 = this.stepArea.bounds.height; 0 <= ref2 ? j < ref2 : j > ref2; y = 0 <= ref2 ? ++j : --j) {
        // See if we specify whether a pixel must or must not be here.
        goalPixel = (ref3 = this.goalPixelsMap[x]) != null ? ref3[y] : void 0;
        if (goalPixel == null) {
          continue;
        }

        // See if this location matches the goal.
        pixel = bitmapLayer.getPixel(this.stepArea.bounds.x + x, this.stepArea.bounds.y + y);
        if (goalPixel !== (pixel != null)) {
          return false;
        }
      }
    }
    return true;
  }
  hasPixel(absoluteX, absoluteY) {
    var ref, relativeX, relativeY;
    if (!this.isActiveStepInArea()) {
      return;
    }
    relativeX = absoluteX - this.stepArea.bounds.x;
    relativeY = absoluteY - this.stepArea.bounds.y;
    return ((ref = this.goalPixelsMap[relativeX]) != null ? ref[relativeY] : void 0) != null;
  }
  solve() {
    var bitmap, i, j, pixel, pixels, ref, ref1, strokeAction, x, y;
    bitmap = this.tutorialBitmap.bitmap();
    pixels = [];
    for (x = i = 0, ref = this.stepArea.bounds.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      if (this.goalPixelsMap[x]) {
        for (y = j = 0, ref1 = this.stepArea.bounds.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          if (!(this.goalPixelsMap[x][y] != null)) {
            continue;
          }
          pixel = {
            x: x + this.stepArea.bounds.x,
            y: y + this.stepArea.bounds.y
          };
          if (this.goalPixelsMap[x][y]) {
            pixel.paletteColor = {
              ramp: 0,
              shade: 0
            };
          }
          pixels.push(pixel);
        }
      }
    }

    // Replace the layer pixels in this bitmap.
    strokeAction = new LOI.Assets.Bitmap.Actions.Stroke(this.tutorialBitmap.id(), bitmap, [0], pixels);
    return AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, strokeAction, new Date());
  }
  drawOverlaidHints(context) {
    let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var absoluteX, absoluteY, anyPixel, bitmap, goalPixel, i, j, palette, pixel, ref, ref1, ref2, x, y;
    this._prepareColorHelp(context, renderOptions);
    bitmap = this.tutorialBitmap.bitmap();
    palette = this.tutorialBitmap.palette();
    for (x = i = 0, ref = this.stepArea.bounds.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      for (y = j = 0, ref1 = this.stepArea.bounds.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
        // Do we have a pixel here?
        absoluteX = x + this.stepArea.bounds.x;
        absoluteY = y + this.stepArea.bounds.y;
        pixel = bitmap.getPixelForLayerAtAbsoluteCoordinates(0, absoluteX, absoluteY);
        goalPixel = (ref2 = this.goalPixelsMap[x]) != null ? ref2[y] : void 0;
        anyPixel = this.stepArea.hasGoalPixel(absoluteX, absoluteY);
        if (pixel && (goalPixel === false || !anyPixel)) {
          this._drawColorHelpForPixel(context, x, y, null, null, true, renderOptions);

          // Draw hints on drawn goal pixels and optionally all goal pixels.
        } else if (goalPixel && !pixel) {
          this._drawColorHelpForPixel(context, x, y, _blackAssetColor, palette, true, renderOptions);
        }
      }
    }
  }
};

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"pixelartfundamentals":{"pixelartfundamentals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/pixelartfundamentals.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, Markup, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals = function () {
  class PixelArtFundamentals extends PAA.Practice.Tutorials.Drawing.Tutorial {
    static enablePixelArtEvaluation(criterion, enableCriterion) {}
    static movePixelMarkup(asset, x, y, dx, dy) {
      var bitmap, movePixelArrowLength;
      bitmap = asset.bitmap();
      if (bitmap.findPixelAtAbsoluteCoordinates(x + dx, y + dy)) {
        return [];
      }
      movePixelArrowLength = this.movePixelArrowLength;
      return [{
        line: {
          arrow: {
            end: true,
            width: 0.5,
            length: 0.25
          },
          style: Markup.errorStyle(),
          points: [{
            x: x + 0.5,
            y: y + 0.5
          }, {
            x: x + 0.5 + movePixelArrowLength * dx,
            y: y + 0.5 + movePixelArrowLength * dy
          }]
        }
      }];
    }
  }
  ;

  // The length of the arrow to indicate a pixel move.
  PixelArtFundamentals.movePixelArrowLength = 1.2;
  PixelArtFundamentals.OpenEvaluationPaper = class OpenEvaluationPaper extends TutorialBitmap.EphemeralStep {
    completed() {
      var drawingEditor, pixelArtEvaluationView;
      if (super.completed(...arguments)) {
        return true;
      }

      // Pixel art evaluation paper needs to be open.
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluationView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      return pixelArtEvaluationView.active();
    }
  };
  PixelArtFundamentals.OpenEvaluationCriterion = class OpenEvaluationCriterion extends TutorialBitmap.EphemeralStep {
    completed() {
      var drawingEditor, pixelArtEvaluation;
      if (super.completed(...arguments)) {
        return true;
      }
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      return pixelArtEvaluation.activeCriterion() === this.options.criterion;
    }
  };
  PixelArtFundamentals.CloseEvaluationPaper = class CloseEvaluationPaper extends TutorialBitmap.EphemeralStep {
    completed() {
      var active, drawingEditor, pixelArtEvaluation;
      if (super.completed(...arguments)) {
        return true;
      }
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      active = pixelArtEvaluation.active();
      if (this._wasActive && !active) {
        return true;
      }
      this._wasActive = active;
      return false;
    }
  };
  return PixelArtFundamentals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"jaggies":{"jaggies.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/jaggies.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, InterfaceMarking, LOI, Markup, PAA, TutorialBitmap;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies = function () {
  class Jaggies extends PAA.Tutorials.Drawing.PixelArtFundamentals {
    static pixelArtEvaluationClickHereMarkup() {
      return PAA.Tutorials.Drawing.Markup.bottomRightClickHereMarkup('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation', -6);
    }
    static pixelArtEvaluationClickHereCriterionMarkup(criterionSelector) {
      var arrowBase, markupStyle, textBase;
      markupStyle = InterfaceMarking.defaultStyle();
      arrowBase = InterfaceMarking.arrowBase();
      textBase = InterfaceMarking.textBase();
      return [{
        interface: {
          selector: ".pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation ".concat(criterionSelector),
          delay: 1,
          bounds: {
            x: -50,
            y: -35,
            width: 260,
            height: 55
          },
          markings: [{
            rectangle: {
              strokeStyle: markupStyle,
              x: -2.5,
              y: 2,
              width: 199,
              height: 13
            },
            line: _.extend({}, arrowBase, {
              points: [{
                x: -32,
                y: -9
              }, {
                x: -5,
                y: 8,
                bezierControlPoints: [{
                  x: -32,
                  y: 3
                }, {
                  x: -15,
                  y: 8
                }]
              }]
            }),
            text: _.extend({}, textBase, {
              position: {
                x: -32,
                y: -11,
                origin: Markup.TextOriginPosition.BottomCenter
              },
              value: "click here"
            })
          }]
        }
      }];
    }
    static pixelArtEvaluationClickHereCriterionWithRequiredMarkup(criterionSelector) {
      var arrowBase, markupStyle, textBase;
      markupStyle = InterfaceMarking.defaultStyle();
      arrowBase = InterfaceMarking.arrowBase();
      textBase = InterfaceMarking.textBase();
      return [{
        interface: {
          selector: ".pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation ".concat(criterionSelector),
          delay: 1,
          bounds: {
            x: 0,
            y: -35,
            width: 260,
            height: 55
          },
          markings: [{
            rectangle: {
              strokeStyle: markupStyle,
              x: 20,
              y: 2,
              width: 176.5,
              height: 13
            },
            line: _.extend({}, arrowBase, {
              points: [{
                x: 230,
                y: -9
              }, {
                x: 199,
                y: 8,
                bezierControlPoints: [{
                  x: 230,
                  y: 3
                }, {
                  x: 209,
                  y: 8
                }]
              }]
            }),
            text: _.extend({}, textBase, {
              position: {
                x: 230,
                y: -11,
                origin: Markup.TextOriginPosition.BottomCenter
              },
              value: "click here"
            })
          }]
        }
      }];
    }
  }
  ;
  Jaggies.FixLineStep = class FixLineStep extends TutorialBitmap.PixelsStep {
    constructor() {
      var base, i, len, name, pixel, previousPixelsResource, ref;
      super(...arguments);
      previousPixelsResource = this.options.previousPixels;
      this.previousPixels = previousPixelsResource.pixels();

      // We create a map representation for fast retrieval as well.
      this.previousPixelsMap = {};
      ref = this.previousPixels;
      for (i = 0, len = ref.length; i < len; i++) {
        pixel = ref[i];
        if ((base = this.previousPixelsMap)[name = pixel.x] == null) {
          base[name] = {};
        }
        this.previousPixelsMap[pixel.x][pixel.y] = pixel;
      }
    }
    drawOverlaidHints(context) {
      let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var absoluteX, absoluteY, bitmap, goalPixel, i, j, palette, pixel, previousPixel, ref, ref1, ref2, ref3, ref4, x, y;
      this._prepareColorHelp(context, renderOptions);
      bitmap = this.tutorialBitmap.bitmap();
      palette = this.tutorialBitmap.palette();
      for (x = i = 0, ref = this.stepArea.bounds.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = this.stepArea.bounds.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          // If there is a difference between previous and goal pixels, don't draw the hint.
          previousPixel = (ref2 = this.previousPixelsMap[x]) != null ? ref2[y] : void 0;
          goalPixel = (ref3 = this.goalPixelsMap[x]) != null ? ref3[y] : void 0;
          if (previousPixel != null !== (goalPixel != null)) {
            continue;
          }

          // Do we have a pixel here?
          absoluteX = x + this.stepArea.bounds.x;
          absoluteY = y + this.stepArea.bounds.y;
          pixel = bitmap.getPixelForLayerAtAbsoluteCoordinates(0, absoluteX, absoluteY);

          // Do we need a pixel here?
          goalPixel = (ref4 = this.goalPixelsMap[x]) != null ? ref4[y] : void 0;

          // Clear hints at pixels that should be empty.
          if (pixel && !goalPixel) {
            this._drawColorHelpForPixel(context, x, y, null, null, true, renderOptions);

            // Draw hints on drawn goal pixels.
          } else if (goalPixel && !pixel) {
            this._drawColorHelpForPixel(context, x, y, {
              color: palette.ramps[0].shades[0]
            }, palette, false, renderOptions);
          }
        }
      }
    }
  };
  return Jaggies;
}.call(this);

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/asset.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset = class Asset extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static restrictedPaletteName() {
    return LOI.Assets.Palette.SystemPaletteNames.Black;
  }
  static minClipboardScale() {
    return 2;
  }
  availableToolKeys() {
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lines":{"lines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lines.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines = function () {
  class Lines extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines';
    }
    static fullName() {
      return "像素画线条";
    }
    static assets() {
      return [this.IntendedAndPerceivedLines, this.Jaggies, this.Jaggies2, this.LineArtCleanup, this.Corners];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Lines);
    }
  }
  ;
  Lines.initialize();
  return Lines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"intendedandperceivedlines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/intendedandperceivedlines. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA, TextOriginPosition;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TextOriginPosition = PAA.Practice.Helpers.Drawing.Markup.TextOriginPosition;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.IntendedAndPerceivedLines = function () {
  var Asset;
  class IntendedAndPerceivedLines extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.IntendedAndPerceivedLines";
    }
    static displayName() {
      return "Intended and perceived lines";
    }
    static description() {
      return "艺术家想要画的内容与观众感知到的内容并不总是与画布上的实际内容一致。";
    }
    static fixedDimensions() {
      return {
        width: 90,
        height: 50
      };
    }
    static svgUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/lines/Intendedandperceivedlines.svg";
    }
    static breakPathsIntoSteps() {
      return true;
    }
    static pathTolerance() {
      return 1;
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return {
        partialUpdates: true
      };
    }
  }
  ;
  IntendedAndPerceivedLines.initialize();
  Asset = IntendedAndPerceivedLines;
  IntendedAndPerceivedLines.Horizontal = function () {
    class Horizontal extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Horizontal");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "像素画是在光栅网格上绘制的。当我们画与网格对齐的线条时，结果与预期的形状完全匹配。";
      }
    }
    ;
    Horizontal.initialize();
    return Horizontal;
  }.call(this);
  IntendedAndPerceivedLines.Diagonal = function () {
    class Diagonal extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Diagonal");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "当线条不与网格对齐时，结果形状不会完全匹配。\n我们最终会得到多个与网格对齐的矩形，而不是一条倾斜的线。";
      }
    }
    ;
    Diagonal.initialize();
    return Diagonal;
  }.call(this);
  IntendedAndPerceivedLines.Curve = function () {
    class Curve extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Curve");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "然而，由于像素的连接方式，观众仍然将结果感知为对角线或曲线。";
      }
      markup() {
        var asset, i, len, line, markup, pixelArtEvaluation, ref;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = [];
        ref = pixelArtEvaluation.layers[0].lines;
        for (i = 0, len = ref.length; i < len; i++) {
          line = ref[i];
          markup.push(...Markup.PixelArt.perceivedLine(line));
        }
        return markup;
      }
    }
    ;
    Curve.initialize();
    return Curve;
  }.call(this);
  IntendedAndPerceivedLines.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
      markup() {
        var asset, bezierControlPoint, element, i, intendedLineBase, intendedLineColor, intendedLineStyle, intendedLines, j, k, l, len, len1, len2, len3, len4, line, m, markup, offsetPerceivedLineMarkup, palette, pixelArtEvaluation, pixelColor, pixelStyle, point, ref, ref1, ref2, textBase, thickIntendedLines, titleBase;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = [];
        textBase = Markup.textBase();
        palette = LOI.palette();
        pixelColor = palette.color(Atari2600.hues.gray, 0);
        pixelStyle = "#".concat(pixelColor.getHexString());
        intendedLineColor = palette.color(Atari2600.hues.gray, 3);
        intendedLineStyle = "#".concat(intendedLineColor.getHexString());

        // Add titles.
        titleBase = _.extend({}, textBase, {
          size: 8,
          lineHeight: 10
        });
        markup.push({
          text: _.extend({}, titleBase, {
            value: "INTENDED\nLINES",
            position: {
              x: 17,
              y: 6,
              origin: TextOriginPosition.MiddleCenter
            },
            style: intendedLineStyle
          })
        }, {
          text: _.extend({}, textBase, {
            value: "What the artist wants\nto communicate",
            position: {
              x: 17,
              y: 44,
              origin: TextOriginPosition.MiddleCenter
            },
            style: intendedLineStyle
          })
        }, {
          text: _.extend({}, titleBase, {
            value: "ACTUAL\nLINES",
            position: {
              x: 45,
              y: 6,
              origin: TextOriginPosition.MiddleCenter
            },
            style: pixelStyle
          })
        }, {
          text: _.extend({}, textBase, {
            value: "What is on the canvas",
            position: {
              x: 45,
              y: 44,
              origin: TextOriginPosition.MiddleCenter
            },
            style: pixelStyle
          })
        }, {
          text: _.extend({}, titleBase, {
            value: "PERCEIVED\nLINES",
            position: {
              x: 73,
              y: 6,
              origin: TextOriginPosition.MiddleCenter
            }
          })
        }, {
          text: _.extend({}, textBase, {
            value: "What the viewer\ninterprets",
            position: {
              x: 73,
              y: 44,
              origin: TextOriginPosition.MiddleCenter
            }
          })
        });

        // Add intended lines.
        intendedLineBase = {
          style: intendedLineStyle,
          width: 0
        };
        intendedLines = [{
          line: _.extend({}, intendedLineBase, {
            points: [{
              x: 6.5,
              y: 12.5
            }, {
              x: 27.5,
              y: 12.5
            }]
          })
        }, {
          line: _.extend({}, intendedLineBase, {
            points: [{
              x: 6.5,
              y: 27.75
            }, {
              x: 27.5,
              y: 17.25
            }]
          })
        }, {
          line: _.extend({}, intendedLineBase, {
            points: [{
              x: 6.5,
              y: 34.5
            }, {
              x: 11.5,
              y: 32.5,
              bezierControlPoints: [{
                x: 7.25,
                y: 33.5
              }, {
                x: 10,
                y: 32.5
              }]
            }, {
              x: 22.5,
              y: 37.5,
              bezierControlPoints: [{
                x: 17,
                y: 32.5
              }, {
                x: 17,
                y: 37.5
              }]
            }, {
              x: 27.5,
              y: 35.5,
              bezierControlPoints: [{
                x: 24,
                y: 37.5
              }, {
                x: 26.75,
                y: 36.5
              }]
            }]
          })
        }];
        thickIntendedLines = _.cloneDeep(intendedLines);
        for (i = 0, len = thickIntendedLines.length; i < len; i++) {
          line = thickIntendedLines[i];
          _.extend(line.line, {
            style: pixelStyle,
            absoluteWidth: 1,
            cap: 'square'
          });
        }
        markup.push(...thickIntendedLines);
        markup.push(...intendedLines);
        ref = pixelArtEvaluation.layers[0].lines;

        // Add perceived lines.
        for (j = 0, len1 = ref.length; j < len1; j++) {
          line = ref[j];
          offsetPerceivedLineMarkup = Markup.PixelArt.perceivedLine(line);
          markup.push(...offsetPerceivedLineMarkup);
          for (k = 0, len2 = offsetPerceivedLineMarkup.length; k < len2; k++) {
            element = offsetPerceivedLineMarkup[k];
            element.line.width = 2;
            ref1 = element.line.points;
            for (l = 0, len3 = ref1.length; l < len3; l++) {
              point = ref1[l];
              point.x += 28;
              if (point.bezierControlPoints) {
                ref2 = point.bezierControlPoints;
                for (m = 0, len4 = ref2.length; m < len4; m++) {
                  bezierControlPoint = ref2[m];
                  bezierControlPoint.x += 28;
                }
              }
            }
          }
        }
        return markup;
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return IntendedAndPerceivedLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"jaggies.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA, TextOriginPosition;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TextOriginPosition = PAA.Practice.Helpers.Drawing.Markup.TextOriginPosition;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Jaggies = function () {
  var Asset;
  class Jaggies extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Jaggies";
    }
    static displayName() {
      return "Jaggies";
    }
    static description() {
      return "了解像素画的主要风格特征。";
    }
    static fixedDimensions() {
      return {
        width: 41,
        height: 21
      };
    }
    static svgUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies.svg";
    }
    static breakPathsIntoSteps() {
      return true;
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
  }
  ;
  Jaggies.initialize();
  Asset = Jaggies;
  Jaggies.Aligned = function () {
    class Aligned extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Aligned");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "你画中的许多东西都会与网格对齐。像素可以完美匹配这些形状。";
      }
    }
    ;
    Aligned.initialize();
    return Aligned;
  }.call(this);
  Jaggies.NonAligned = function () {
    class NonAligned extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".NonAligned");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "对于对角线和曲线，应该是直线和平滑的却显得参差不齐——尖锐和锯齿状。\n这些阶梯状的变形（意外的锯齿边）被称为「锯齿」，是像素画块状外观的组成部分。";
      }
    }
    ;
    NonAligned.initialize();
    return NonAligned;
  }.call(this);
  Jaggies.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
      markup() {
        var arrowBase, asset, handrailLine, i, j, jaggy, jaggyBase, lampLine, len, len1, line, lineColor, markup, markupStyle, palette, perceivedLineBase, pixelArtEvaluation, ref, ref1, ref2, ref3, ref4, textBase, trashCanLine;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = [];

        // Add jaggies.
        palette = LOI.palette();
        lineColor = palette.color(Atari2600.hues.green, 3);
        jaggyBase = {
          style: "#".concat(lineColor.getHexString())
        };
        if (!(trashCanLine = (ref = pixelArtEvaluation.getLinesAt(6, 12)) != null ? ref[0] : void 0)) {
          return;
        }
        if (!(lampLine = (ref1 = pixelArtEvaluation.getLinesAt(13, 6)) != null ? ref1[0] : void 0)) {
          return;
        }
        if (!(handrailLine = (ref2 = pixelArtEvaluation.getLinesAt(17, 12)) != null ? ref2[0] : void 0)) {
          return;
        }
        ref3 = [trashCanLine, lampLine, handrailLine];
        for (i = 0, len = ref3.length; i < len; i++) {
          line = ref3[i];
          ref4 = line.getJaggies();
          for (j = 0, len1 = ref4.length; j < len1; j++) {
            jaggy = ref4[j];
            markup.push({
              pixel: _.extend({}, jaggyBase, {
                x: jaggy.x,
                y: jaggy.y
              })
            });
          }
        }

        // Add jaggy arrows.
        markupStyle = Markup.defaultStyle();
        arrowBase = {
          arrow: {
            end: true
          },
          style: markupStyle
        };
        textBase = Markup.textBase();
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 28.5,
              y: 16.5
            }, {
              x: 25.5,
              y: 14.5,
              bezierControlPoints: [{
                x: 26.5,
                y: 16.5
              }, {
                x: 26,
                y: 15
              }]
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 28.5,
              y: 16.5,
              origin: TextOriginPosition.TopLeft
            },
            value: "not jaggies\n(actual stairs)"
          })
        });
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 20.5,
              y: 6.5
            }, {
              x: 20.5,
              y: 9.5,
              bezierControlPoints: [{
                x: 19,
                y: 8
              }, {
                x: 20,
                y: 9
              }]
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 21,
              y: 6.5,
              origin: TextOriginPosition.BottomLeft
            },
            value: "jaggies\n(diagonal)"
          })
        });
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 11,
              y: 4
            }, {
              x: 12.5,
              y: 5,
              bezierControlPoints: [{
                x: 11,
                y: 5
              }, {
                x: 12,
                y: 5
              }]
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 11,
              y: 3.5,
              origin: TextOriginPosition.BottomCenter
            },
            value: "jaggies\n(curve)"
          })
        });
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 4.5,
              y: 10
            }, {
              x: 5.5,
              y: 11.5,
              bezierControlPoints: [{
                x: 4.5,
                y: 11
              }, {
                x: 5.25,
                y: 11.25
              }]
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 4.5,
              y: 9.5,
              origin: TextOriginPosition.BottomCenter
            },
            value: "not a jaggy\n(sharp corner)"
          })
        });

        // Add perceived lines.
        perceivedLineBase = Markup.PixelArt.perceivedLineBase();
        markup.push({
          line: _.extend({}, perceivedLineBase, {
            points: [{
              x: 18.5,
              y: 16.5
            }, {
              x: 18.5,
              y: 15.5
            }, {
              x: 20.5,
              y: 15.5
            }, {
              x: 20.5,
              y: 14.5
            }, {
              x: 22.5,
              y: 14.5
            }, {
              x: 22.5,
              y: 13.5
            }, {
              x: 24.5,
              y: 13.5
            }, {
              x: 24.5,
              y: 12.5
            }, {
              x: 26.5,
              y: 12.5
            }]
          })
        });
        markup.push({
          line: _.extend({}, perceivedLineBase, {
            points: [{
              x: 16.5,
              y: 14.5
            }, {
              x: 17.5,
              y: 12.75,
              bezierControlPoints: [{
                x: 16.5,
                y: 13.5
              }, {
                x: 17,
                y: 13
              }]
            }, {
              x: 23.25,
              y: 9.875
            }, {
              x: 25.125,
              y: 10.125,
              bezierControlPoints: [{
                x: 23.75,
                y: 9.625
              }, {
                x: 24.625,
                y: 9.625
              }]
            }, {
              x: 25.5,
              y: 11.125,
              bezierControlPoints: [{
                x: 25.325,
                y: 10.325
              }, {
                x: 25.5,
                y: 10.625
              }]
            }]
          })
        });
        markup.push({
          line: _.extend({}, perceivedLineBase, {
            points: [{
              x: 13.5,
              y: 6.25
            }, {
              x: 15.25,
              y: 4.5,
              bezierControlPoints: [{
                x: 13.5,
                y: 5.25
              }, {
                x: 14.26,
                y: 4.5
              }]
            }]
          })
        });
        markup.push({
          line: _.extend({}, perceivedLineBase, {
            points: [{
              x: 7.5,
              y: 16
            }, {
              x: 6.625,
              y: 12.5
            }, {
              x: 10.375,
              y: 12.5
            }, {
              x: 9.5,
              y: 16
            }]
          })
        });
        return markup;
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Jaggies;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"corners.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/corners.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, InstructionsSystem, InterfaceMarking, LOI, Markup, PAA, PAE, TutorialBitmap;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Corners = function () {
  var Asset;
  class Corners extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Corners";
    }
    static displayName() {
      return "Corners";
    }
    static description() {
      return "尖锐的边缘可以有意识地使用。";
    }
    static fixedDimensions() {
      return {
        width: 55,
        height: 28
      };
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 0,
            g: 0,
            b: 0
          }]
        }, {
          shades: [{
            r: 1,
            g: 0.8,
            b: 0.2
          }]
        }]
      });
    }
    static resources() {
      var imagePixelsOptions, step;
      imagePixelsOptions = {
        palette: () => {
          return this.customPalette();
        }
      };
      return {
        steps: function () {
          var i, results;
          results = [];
          for (step = i = 1; i <= 2; step = ++i) {
            results.push({
              startPixels: new this.Resource.ImagePixels("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/lines/corners-".concat(step, ".png"), imagePixelsOptions),
              goalPixels: new this.Resource.ImagePixels("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/lines/corners-".concat(step, "-goal.png"), imagePixelsOptions)
            });
          }
          return results;
        }.call(this)
      };
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          editable: true,
          allowedCriteria: [PAE.Criteria.PixelPerfectLines],
          pixelPerfectLines: {
            doubles: {},
            corners: {
              ignoreStraightLineCorners: false
            }
          }
        }
      };
    }
    initializeSteps() {
      var stepArea, steps;
      super.initializeSteps(...arguments);
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();

      // The first step should not show goal pixels.
      steps[0].options.drawHintsForGoalPixels = false;
      // Add step for disabling the corners criterion.
      return new this.constructor.DisableCornersEvaluation(this, stepArea);
    }
  }
  ;
  Corners.initialize();
  Asset = Corners;
  Corners.DisableCornersEvaluation = class DisableCornersEvaluation extends TutorialBitmap.Step {
    completed() {
      var ref;
      return !((ref = this.tutorialBitmap.bitmap().properties.pixelArtEvaluation.pixelPerfectLines) != null ? ref.corners : void 0);
    }
    solve() {
      var bitmap, pixelArtEvaluation, updatePropertyAction;
      // Disable pixel art evaluation.
      bitmap = this.tutorialBitmap.bitmap();
      pixelArtEvaluation = bitmap.properties.pixelArtEvaluation;
      delete pixelArtEvaluation.pixelPerfectLines.corners;
      updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.tutorialBitmap.id(), bitmap, 'pixelArtEvaluation', pixelArtEvaluation);
      return AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, updatePropertyAction, new Date());
    }
  };
  Corners.Outline1 = function () {
    class Outline1 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Outline1");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "按照到目前为止讨论的规则（在角落仅相接触的行和列像素）在星星外面添加黑色轮廓。";
      }
    }
    ;
    Outline1.initialize();
    return Outline1;
  }.call(this);
  Corners.Outline2 = function () {
    class Outline2 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Outline2");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "使用这些规则会产生圆角，如果你想要更柔和的外观，这很好。然而，如果需要尖角，使用更尖锐的线条艺术也可以。";
      }
    }
    ;
    Outline2.initialize();
    return Outline2;
  }.call(this);
  Corners.OpenEvaluation = function () {
    class OpenEvaluation extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".OpenEvaluation");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "打开像素画评估纸，查看角落分析。";
      }
      static completedConditions() {
        var editor, pixelArtEvaluation;
        editor = this.getEditor();
        pixelArtEvaluation = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
        return pixelArtEvaluation.active();
      }
      static resetCompletedConditions() {
        var editor, pixelArtEvaluation;
        if (!this.getActiveAsset()) {
          return true;
        }
        editor = this.getEditor();
        pixelArtEvaluation = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
        return !pixelArtEvaluation.active();
      }
      static priority() {
        return 2;
      }
    }
    ;
    OpenEvaluation.initialize();
    return OpenEvaluation;
  }.call(this);
  Corners.SelectCriterion = function () {
    class SelectCriterion extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".SelectCriterion");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "像素完美线条的定义不允许有角落，所以它们被标记为错误。\n然而，评估不理解上下文。\n\n打开像素完美线条分解以继续。";
      }
      static completedConditions() {
        var editor, pixelArtEvaluation;
        editor = this.getEditor();
        pixelArtEvaluation = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
        return pixelArtEvaluation.active() && pixelArtEvaluation.activeCriterion() === PAE.Criteria.PixelPerfectLines;
      }
      static resetCompletedConditions() {
        var editor, pixelArtEvaluation;
        if (!this.getActiveAsset()) {
          return true;
        }
        editor = this.getEditor();
        pixelArtEvaluation = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
        return !pixelArtEvaluation.active() || pixelArtEvaluation.activeCriterion() !== PAE.Criteria.PixelPerfectLines;
      }
      static priority() {
        return 1;
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      onDisplayed() {
        var camera, drawingEditor, pixelCanvas;
        super.onDisplayed(...arguments);
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo({
          x: 27,
          y: 12
        }, 1);
        return camera.scaleTo(4, 1);
      }
      markup() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionWithRequiredMarkup('.pixel-perfect-lines');
      }
    }
    ;
    SelectCriterion.initialize();
    return SelectCriterion;
  }.call(this);
  Corners.TurnOff = function () {
    class TurnOff extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".TurnOff");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "评估纸只能显示潜在的问题。别担心有意的角落。\n你甚至可以完全关闭单个标准。\n\n现在通过取消角落标准旁的勾选来做到这一点。";
      }
      static displaySide() {
        return PAA.PixelPad.Systems.Instructions.DisplaySide.Top;
      }
      markup() {
        var arrowBase, markupStyle, textBase;
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        return [{
          interface: {
            selector: ".pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation .corners .checkmark-area",
            delay: 1,
            bounds: {
              x: -50,
              y: -35,
              width: 70,
              height: 55
            },
            markings: [{
              rectangle: {
                strokeStyle: markupStyle,
                x: 2,
                y: 1.5,
                width: 13,
                height: 11.5
              },
              line: _.extend({}, arrowBase, {
                points: [{
                  x: -32,
                  y: -9
                }, {
                  x: -2,
                  y: 7,
                  bezierControlPoints: [{
                    x: -32,
                    y: 3
                  }, {
                    x: -15,
                    y: 7
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: -32,
                  y: -11,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "click here"
              })
            }]
          }
        }];
      }
    }
    ;
    TurnOff.initialize();
    return TurnOff;
  }.call(this);
  Corners.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "太棒了！只把评估作为双重检查工作的工具，不要盲目遵循。\n它会犯错，不知道你的意图，所以对它的评分要持保留态度。";
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Corners;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lineartcleanup":{"lineartcleanup.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lineartcleanup/lineartclea //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, PAE;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.LineArtCleanup = function () {
  class LineArtCleanup extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.LineArtCleanup";
    }
    static displayName() {
      return "Line art cleanup";
    }
    static description() {
      return "练习清理重复像素和角落。";
    }
    static fixedDimensions() {
      return {
        width: 40,
        height: 30
      };
    }
    static resources() {
      return {
        requiredPath: new this.Resource.SvgPaths("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/lines/lineartcleanup.svg")
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds, svgPaths;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);

      // Step 1 requires you to connect all the required pixels.
      svgPaths = this.resources.requiredPath.svgPaths();
      new this.constructor.Steps.DrawLine(this, stepArea, {
        svgPaths
      });

      // Step 2 requires you to open the evaluation paper.
      new this.constructor.Steps.OpenEvaluationPaper(this, stepArea);

      // Step 3 requires you to open the pixel-perfect lines details page.
      new this.constructor.Steps.OpenPixelPerfectLines(this, stepArea);

      // Step 4 requires you to hover over doubles or corners.
      new this.constructor.Steps.HoverOverCriterion(this, stepArea);

      // Step 5 requires you to close the evaluation paper.
      new PAA.Tutorials.Drawing.PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Step 6 requires you to clean up the line of all doubles.
      return new this.constructor.Steps.CleanLine(this, stepArea, {
        svgPaths
      });
    }
  }
  ;
  LineArtCleanup.initialize();
  return LineArtCleanup;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lineartcleanup/steps.coffe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, LineArtCleanup, PAA, PAE, TutorialBitmap;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
LineArtCleanup = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.LineArtCleanup;
LineArtCleanup.Steps = function () {
  class Steps {}
  ;
  Steps.DrawLine = class DrawLine extends TutorialBitmap.PathStep {
    static preserveCompleted() {
      return true;
    }
    constructor(tutorialBitmap, stepArea) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options.tolerance = 2;
      super(tutorialBitmap, stepArea, options);
    }
    completed() {
      var pixelArtEvaluation;
      if (!super.completed(...arguments)) {
        return;
      }

      // Wait until the line has stopped drawing, otherwise adding pixel art
      // evaluation properties will happen in-between the stroke and get lost.
      if (this.tutorialBitmap.bitmap().partialAction) {
        return;
      }

      // There needs to be a line present.
      if (!(pixelArtEvaluation = this.tutorialBitmap.pixelArtEvaluation())) {
        return;
      }
      return pixelArtEvaluation.layers[0].lines.length;
    }
  };
  Steps.OpenEvaluationPaper = class OpenEvaluationPaper extends PAA.Tutorials.Drawing.PixelArtFundamentals.OpenEvaluationPaper {
    activate() {
      var bitmap, pixelArtEvaluation, updatePropertyAction;
      super.activate(...arguments);
      bitmap = this.tutorialBitmap.bitmap();
      pixelArtEvaluation = {
        allowedCriteria: [PAE.Criteria.PixelPerfectLines],
        pixelPerfectLines: {
          doubles: {
            countAllLineWidthTypes: true,
            countPointsWithMultiplePixels: true
          },
          corners: {
            ignoreStraightLineCorners: false
          }
        }
      };
      updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.tutorialBitmap.constructor.id(), bitmap, 'pixelArtEvaluation', pixelArtEvaluation);
      return bitmap.executeAction(updatePropertyAction);
    }
  };
  Steps.OpenPixelPerfectLines = class OpenPixelPerfectLines extends TutorialBitmap.EphemeralStep {
    completed() {
      var drawingEditor, pixelArtEvaluation;
      if (super.completed(...arguments)) {
        return true;
      }
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      return pixelArtEvaluation.activeCriterion() === PAE.Criteria.PixelPerfectLines;
    }
  };
  Steps.HoverOverCriterion = function () {
    class HoverOverCriterion extends TutorialBitmap.EphemeralStep {
      completed() {
        var bitmap, drawingEditor, pixelArtEvaluationView;
        if (super.completed(...arguments)) {
          return true;
        }
        if (!(bitmap = this.tutorialBitmap.bitmap())) {
          // We don't require this step if there are no doubles.
          return this.stopCountingTime();
        }
        if (!bitmap.properties.pixelArtEvaluation.pixelPerfectLines.corners.count) {
          return true;
        }
        if (!(drawingEditor = this.getEditor())) {
          return this.stopCountingTime();
        }
        if (!(pixelArtEvaluationView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return this.stopCountingTime();
        }
        if (!pixelArtEvaluationView.hoveredFilterValue()) {
          return this.stopCountingTime();
        }
        this.countTime();

        // We return false since we'll complete this step by solving it which will resolve in the base completed.
        return false;
      }
      stopCountingTime() {
        this.timeHovered = 0;
        return Meteor.clearTimeout(this._countTimeout);
      }
      countTime() {
        Meteor.clearTimeout(this._countTimeout);
        return this._countTimeout = Meteor.setTimeout(() => {
          this.timeHovered += 0.1;
          if (this.timeHovered >= this.constructor.timeToHover) {
            return this.solve();
          } else {
            return this.countTime();
          }
        }, 100);
      }
    }
    ;
    HoverOverCriterion.timeToHover = 0.5;
    return HoverOverCriterion;
  }.call(this);
  Steps.CleanLine = class CleanLine extends Steps.DrawLine {
    completed() {
      var i, len, line, lineEvaluation, pixelArtEvaluation, pixelArtEvaluationProperty, ref;
      if (!super.completed(...arguments)) {
        return;
      }

      // The lines must not have any doubles or corners.
      if (!(pixelArtEvaluation = this.tutorialBitmap.pixelArtEvaluation())) {
        return;
      }
      pixelArtEvaluationProperty = this.tutorialBitmap.bitmap().properties.pixelArtEvaluation;
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        lineEvaluation = line.evaluate(pixelArtEvaluationProperty);
        if (lineEvaluation.doubles.count || lineEvaluation.corners.count) {
          return;
        }
      }
      return true;
    }
  };
  return Steps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lineartcleanup/instruction //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, InstructionsSystem, InterfaceMarking, LOI, LineArtCleanup, Markup, PAA, PAE;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
Atari2600 = LOI.Assets.Palette.Atari2600;

// Note: We can't call this Instructions since we introduce a namespace class called that below.
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
LineArtCleanup = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.LineArtCleanup;
LineArtCleanup.Instructions = function () {
  class Instructions {}
  ;
  Instructions.StepInstruction = function () {
    class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static assetClass() {
        return LineArtCleanup;
      }
    }
    ;

    // The amount of time before we show instructions to the user after a new UI element is introduced.
    StepInstruction.uiRevealDelayDuration = 3;
    return StepInstruction;
  }.call(this);
  Instructions.DrawCurve = function () {
    class DrawCurve extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".DrawCurve");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "不好的重复像素是徒手画线时的问题。\n对于这节课，用一笔徒手笔画画这条曲线。";
      }
    }
    ;
    DrawCurve.initialize();
    return DrawCurve;
  }.call(this);
  Instructions.DrawCurveFreehand = function () {
    class DrawCurveFreehand extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".DrawCurveFreehand");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "等等！\n\n请用徒手笔画来完成这一步。\n点击线条的起点，沿路径流畅地拖动。";
      }
      static activeConditions() {
        var asset, bitmap;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if you've already done a stroke and you're still in the first step.
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(bitmap = asset.bitmap())) {
          return;
        }
        return bitmap.historyPosition;
      }
      static priority() {
        return 1;
      }
    }
    ;
    DrawCurveFreehand.initialize();
    return DrawCurveFreehand;
  }.call(this);
  Instructions.OpenEvaluationPaper = function () {
    class OpenEvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".OpenEvaluationPaper");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "现在你可以在右下角打开像素画评估纸来获取你的线条分析。";
      }
      markup() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereMarkup();
      }
    }
    ;
    OpenEvaluationPaper.initialize();
    return OpenEvaluationPaper;
  }.call(this);
  Instructions.ReopenEvaluationPaper = function () {
    class ReopenEvaluationPaper extends Instructions.OpenEvaluationPaper {
      static id() {
        return "".concat(LineArtCleanup.id(), ".ReopenEvaluationPaper");
      }
      static stepNumbers() {
        return [3, 4];
      }
      static message() {
        return "在右下角打开像素画评估纸以继续。";
      }
      static activeConditions() {
        var drawingEditor, pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not open.
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        return !pixelArtEvaluation.active();
      }
      static priority() {
        return 1;
      }
    }
    ;
    ReopenEvaluationPaper.initialize();
    return ReopenEvaluationPaper;
  }.call(this);
  Instructions.OpenPixelPerfectLines = function () {
    class OpenPixelPerfectLines extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".OpenPixelPerfectLines");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "当线条没有任何重复像素或其他角落时，被认为是「像素完美」的。\n\n点击下方的像素完美线条标准来查看各个问题。";
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      markup() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionMarkup('.pixel-perfect-lines');
      }
    }
    ;
    OpenPixelPerfectLines.initialize();
    return OpenPixelPerfectLines;
  }.call(this);
  Instructions.ReopenPixelPerfectLines = function () {
    class ReopenPixelPerfectLines extends Instructions.OpenPixelPerfectLines {
      static id() {
        return "".concat(LineArtCleanup.id(), ".ReopenPixelPerfectLines");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "点击下方的像素完美线条标准以继续。";
      }
      static delayDuration() {
        return 0;
      }
      static activeConditions() {
        var drawingEditor, pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not on the pixel-perfect lines criterion.
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (!pixelArtEvaluation.active()) {
          return;
        }
        return pixelArtEvaluation.activeCriterion() !== PAE.Criteria.PixelPerfectLines;
      }
      static priority() {
        return 1;
      }
    }
    ;
    ReopenPixelPerfectLines.initialize();
    return ReopenPixelPerfectLines;
  }.call(this);
  Instructions.HoverOverCriterion = function () {
    class HoverOverCriterion extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".HoverOverCriterion");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "在这个详细视图中，你可以悬停在计数列中的数字上，以仅显示分析中的那些像素。";
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      markup() {
        var arrowBase, markup, markupStyle, textBase;
        markup = [];
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        markup.push({
          interface: {
            selector: '.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation',
            delay: 1,
            bounds: {
              x: 170,
              y: 0,
              width: 80,
              height: 70
            },
            markings: [{
              rectangle: {
                strokeStyle: markupStyle,
                x: 181.5,
                y: 29,
                width: 20,
                height: 22
              },
              line: _.extend({}, arrowBase, {
                points: [{
                  x: 235,
                  y: 25
                }, {
                  x: 205,
                  y: 42,
                  bezierControlPoints: [{
                    x: 235,
                    y: 37
                  }, {
                    x: 215,
                    y: 42
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 235,
                  y: 23,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "hover\nhere"
              })
            }]
          }
        });
        return markup;
      }
    }
    ;
    HoverOverCriterion.initialize();
    return HoverOverCriterion;
  }.call(this);
  Instructions.CloseEvaluationPaper = function () {
    class CloseEvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".CloseEvaluationPaper");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "关闭评估纸，消除所有重复像素和角落。";
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
    }
    ;
    CloseEvaluationPaper.initialize();
    return CloseEvaluationPaper;
  }.call(this);
  Instructions.CloseEvaluationPaperWithoutCorners = function () {
    class CloseEvaluationPaperWithoutCorners extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".CloseEvaluationPaperWithoutCorners");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "在这个详细视图中，你可以悬停在计数列中的数字上，以仅显示分析中的那些像素。\n现在你没有角落，所以这没有用，但以后会有。\n\n关闭评估纸并消除所有重复像素。";
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      static activeConditions() {
        var asset, bitmap;
        if (!super.activeConditions(...arguments)) {
          return;
        }
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(bitmap = asset.bitmap())) {
          return;
        }
        if (bitmap.properties.pixelArtEvaluation.pixelPerfectLines.corners.count) {
          return;
        }
        return true;
      }
      static priority() {
        return 1;
      }
    }
    ;
    CloseEvaluationPaperWithoutCorners.initialize();
    return CloseEvaluationPaperWithoutCorners;
  }.call(this);
  Instructions.CloseEvaluationPaperWithPixelPerfectLine = function () {
    class CloseEvaluationPaperWithPixelPerfectLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".CloseEvaluationPaperWithPixelPerfectLine");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "在这个详细视图中，你可以悬停在计数列中的数字上，以仅显示分析中的那些像素。\n你已经让你的线条像素完美了，所以这没有用，但以后会有。\n\n关闭评估纸来完成课程。";
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      static activeConditions() {
        var asset, bitmap;
        if (!super.activeConditions(...arguments)) {
          return;
        }
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(bitmap = asset.bitmap())) {
          return;
        }
        if (bitmap.properties.pixelArtEvaluation.pixelPerfectLines.doubles.count) {
          return;
        }
        if (bitmap.properties.pixelArtEvaluation.pixelPerfectLines.corners.count) {
          return;
        }
        return true;
      }
      static priority() {
        return 2;
      }
    }
    ;
    CloseEvaluationPaperWithPixelPerfectLine.initialize();
    return CloseEvaluationPaperWithPixelPerfectLine;
  }.call(this);
  Instructions.CleanDoubles = function () {
    class CleanDoubles extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".CleanDoubles");
      }
      static stepNumber() {
        return 6;
      }
      static message() {
        return "在每个重复像素中删除一个像素，并平滑角落来创建像素完美的线条。";
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          // Note: In case the user undoes the steps to where the pixel art evaluation property is not present anymore, the
          // view will not display anymore, so we just show this instruction at the bottom even without the view being
          // present.
          return InstructionsSystem.DisplaySide.Bottom;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;
    CleanDoubles.initialize();
    return CleanDoubles;
  }.call(this);
  Instructions.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".Complete");
      }
      static assetClass() {
        return LineArtCleanup;
      }
      static message() {
        return "做得好！像素画软件通常包含铅笔的像素完美选项，可以避免创建重复像素和尖锐角落，但重要的是也要知道如何手工清理线条。";
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return InstructionsSystem.DisplaySide.Bottom;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"jaggies2":{"jaggies2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies2/jaggies2.coffee   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Jaggies2 = function () {
  class Jaggies2 extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Jaggies2";
    }
    static displayName() {
      return "Jaggies 2";
    }
    static description() {
      return "有些锯齿比其他更不理想。";
    }
    static fixedDimensions() {
      return {
        width: 37,
        height: 22
      };
    }
    static resources() {
      var path;
      path = '/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies2';
      return {
        line1: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-1-goal.png"))
        },
        line2a: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-2.png"))
        },
        line2b: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-2-goal.png"))
        },
        line3a: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-3.png"))
        },
        line3b: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-3-goal.png"))
        },
        line4a: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-4.png"))
        },
        line4b: {
          hintPixels: new this.Resource.ImagePixels("".concat(path, "-4-hints.png")),
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-4-goal.png"))
        },
        line5a: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-5.png"))
        },
        line5b: {
          hintPixels: new this.Resource.ImagePixels("".concat(path, "-5-hints.png")),
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-5-goal.png"))
        }
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return {
        partialUpdates: true
      };
    }
    static properties() {
      return {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          displayed: false,
          pixelPerfectLines: {
            doubles: {
              countAllLineWidthTypes: true
            }
          }
        }
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);

      // Line 1: Step 1 simply requires you to draw its goal pixels.
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line1.goalPixels
      });

      // Line 2: You draw the line yourself in step 2 and then remove the doubles in step 3.
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line2a.goalPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });
      new this.constructor.Steps.LineWithoutDoublesStep(this, stepArea, {
        allowedPixels: this.resources.line2a.goalPixels,
        goalPixels: this.resources.line2b.goalPixels
      });
      // Line 3: You draw the line yourself in step 4 and then remove the doubles in step 5.
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line3a.goalPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });
      new this.constructor.Steps.LineWithoutDoublesStep(this, stepArea, {
        allowedPixels: this.resources.line3a.goalPixels,
        goalPixels: this.resources.line3b.goalPixels
      });
      // Line 4: You draw the line yourself in step 6 and then move the pixel in step 7.
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line4a.goalPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });
      new this.constructor.Steps.FixStep(this, stepArea, {
        hintPixels: this.resources.line4b.hintPixels,
        goalPixels: this.resources.line4b.goalPixels
      });
      // Line 5: You draw the line yourself in step 8 and then move the pixels in step 9.
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line5a.goalPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });
      return new this.constructor.Steps.FixStep(this, stepArea, {
        hintPixels: this.resources.line5b.hintPixels,
        goalPixels: this.resources.line5b.goalPixels
      });
    }
  }
  ;
  Jaggies2.initialize();
  return Jaggies2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies2/steps.coffee      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Jaggies2, LOI, PAA, PAE, TutorialBitmap;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAE = PAA.Practice.PixelArtEvaluation;
Jaggies2 = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Jaggies2;
Jaggies2.Steps = function () {
  class Steps {}
  ;
  Steps.LineWithoutDoublesStep = class LineWithoutDoublesStep extends TutorialBitmap.PixelsStep {
    constructor() {
      var allowedPixelsResource, base, i, len, name, pixel, ref;
      super(...arguments);
      allowedPixelsResource = this.options.allowedPixels;
      this.allowedPixels = allowedPixelsResource.pixels();

      // We create a map representation for fast retrieval as well.
      this.allowedPixelsMap = {};
      ref = this.allowedPixels;
      for (i = 0, len = ref.length; i < len; i++) {
        pixel = ref[i];
        if ((base = this.allowedPixelsMap)[name = pixel.x] == null) {
          base[name] = {};
        }
        this.allowedPixelsMap[pixel.x][pixel.y] = true;
      }
    }
    hasPixel(x, y) {
      var ref;
      return ((ref = this.allowedPixelsMap[this.stepArea.bounds.x + x]) != null ? ref[this.stepArea.bounds.y + y] : void 0) != null;
    }
    completed() {
      var evaluation, line, pixelArtEvaluation;
      if (!super.completed(...arguments)) {
        return;
      }

      // There needs to be a line that goes through all goal pixels.
      if (!(pixelArtEvaluation = this.tutorialBitmap.pixelArtEvaluation())) {
        return;
      }
      if (!(line = pixelArtEvaluation.getLinesBetween(...this.goalPixels)[0])) {
        return;
      }

      // The line has to have a thin width (no doubles).
      evaluation = line.evaluate();
      return evaluation.width.type === PAE.Line.WidthType.Thin;
    }
  };
  Steps.FixStep = class FixStep extends TutorialBitmap.PixelsStep {
    constructor() {
      var hintPixelsResource;
      super(...arguments);
      hintPixelsResource = this.options.hintPixels;
      this.hintPixels = hintPixelsResource.pixels();
    }
    drawOverlaidHints(context) {
      let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var hintPixel, i, len, palette, ref, results;
      // Draw hints only for the provided pixels.
      this._prepareColorHelp(context, renderOptions);
      palette = this.tutorialBitmap.palette();
      ref = this.hintPixels;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        hintPixel = ref[i];
        results.push(this._drawColorHelpForPixel(context, hintPixel.x, hintPixel.y, hintPixel, palette, false, renderOptions));
      }
      return results;
    }
  };
  return Steps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies2/instructions.coff //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Jaggies2,
  LOI,
  Markup,
  PAA,
  PAE,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAE = PAA.Practice.PixelArtEvaluation;
Jaggies2 = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Lines.Jaggies2;
Jaggies2.Instructions = function () {
  class Instructions {}
  ;
  Instructions.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Jaggies2;
    }
    static resetCompletedConditions() {
      return !this.getActiveAsset();
    }
    static getPixelArtEvaluation() {
      var drawingEditor;
      drawingEditor = this.getEditor();
      return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
    }
    perceivedLineMarkupForStep(asset, pixelArtEvaluation, stepNumber) {
      var i, j, k, len, len1, len2, line, lines, markup, point, ref, ref1, step;
      markup = [];
      lines = [];
      step = asset.stepAreas()[0].steps()[stepNumber - 1];
      ref = step.goalPixels;
      for (i = 0, len = ref.length; i < len; i++) {
        point = ref[i];
        ref1 = pixelArtEvaluation.getLinesAt(point.x, point.y);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          line = ref1[j];
          if (indexOf.call(lines, line) < 0) {
            lines.push(line);
          }
        }
      }
      for (k = 0, len2 = lines.length; k < len2; k++) {
        line = lines[k];
        markup.push(Markup.PixelArt.segmentedPerceivedLine(line));
      }
      return markup;
    }
    doublesMarkup(pixelArtEvaluation, point) {
      var asset, i, len, line, lines, markup, pixelArtEvaluationProperty;
      markup = [];
      lines = pixelArtEvaluation.getLinesAt(point.x, point.y);
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      pixelArtEvaluationProperty = asset.bitmap().properties.pixelArtEvaluation;
      for (i = 0, len = lines.length; i < len; i++) {
        line = lines[i];
        markup.push(...Markup.PixelArt.pixelPerfectLineErrors(line, true, true, pixelArtEvaluationProperty));
      }
      return markup;
    }
  };
  Instructions.Line1 = function () {
    class Line1 extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line1");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "像素画线条由多行（或列）像素构成，通常只在角落相接。";
      }
    }
    ;
    Line1.initialize();
    return Line1;
  }.call(this);
  Instructions.Line2Draw = function () {
    class Line2Draw extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line2Draw");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "然而，当我们徒手画线时，我们经常在行连接的地方无意中跨越多个相邻像素。";
      }
    }
    ;
    Line2Draw.initialize();
    return Line2Draw;
  }.call(this);
  Instructions.Line2Fix = function () {
    class Line2Fix extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line2Fix");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "这些无意的像素也被称为「重复像素」，因为对于最小化的线条我们只需要其中一个。\n在每个重复像素中删除一个像素。";
      }
      markup() {
        var asset, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        return this.doublesMarkup(pixelArtEvaluation, {
          x: 3,
          y: 9
        });
      }
    }
    ;
    Line2Fix.initialize();
    return Line2Fix;
  }.call(this);
  Instructions.Line3Draw = function () {
    class Line3Draw extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line3Draw");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "重复像素在感知线条中产生锯齿，破坏线条艺术的流畅流动。";
      }
      markup() {
        var asset, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        return this.perceivedLineMarkupForStep(asset, pixelArtEvaluation, 4);
      }
    }
    ;
    Line3Draw.initialize();
    return Line3Draw;
  }.call(this);
  Instructions.Line3Fix = function () {
    class Line3Fix extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line3Fix");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "在这里也删除一个重复像素。";
      }
      markup() {
        var asset, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        return [...this.doublesMarkup(pixelArtEvaluation, {
          x: 3,
          y: 14
        }), ...this.perceivedLineMarkupForStep(asset, pixelArtEvaluation, 4)];
      }
    }
    ;
    Line3Fix.initialize();
    return Line3Fix;
  }.call(this);
  Instructions.Line4Draw = function () {
    class Line4Draw extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line4Draw");
      }
      static stepNumber() {
        return 6;
      }
      static message() {
        return "即使没有重复像素，某些线段模式也会在感知线条中导致锯齿。\n现在的像素艺术家大多用锯齿这个词来描述这些不需要的像素。";
      }
      markup() {
        var asset, markup, pixelArtEvaluation, stepNumber;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = function () {
          var i, len, ref, results;
          ref = [4, 6];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            stepNumber = ref[i];
            results.push(this.perceivedLineMarkupForStep(asset, pixelArtEvaluation, stepNumber));
          }
          return results;
        }.call(this);
        return _.flatten(markup);
      }
    }
    ;
    Line4Draw.initialize();
    return Line4Draw;
  }.call(this);
  Instructions.Line4Fix = function () {
    class Line4Fix extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line4Fix");
      }
      static stepNumber() {
        return 7;
      }
      static message() {
        return "移动像素来消除问题。我们将在像素画曲线的教程中进一步展开。";
      }
      markup() {
        var asset, markup, pixelArtEvaluation, stepNumber;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = function () {
          var i, len, ref, results;
          ref = [4, 6];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            stepNumber = ref[i];
            results.push(this.perceivedLineMarkupForStep(asset, pixelArtEvaluation, stepNumber));
          }
          return results;
        }.call(this);
        markup = _.flatten(markup);
        markup.push(...PAA.Tutorials.Drawing.PixelArtFundamentals.movePixelMarkup(asset, 25, 7, 0, -1));
        return markup;
      }
    }
    ;
    Line4Fix.initialize();
    return Line4Fix;
  }.call(this);
  Instructions.Line5Draw = function () {
    class Line5Draw extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line5Draw");
      }
      static stepNumber() {
        return 8;
      }
      static message() {
        return "同样，不需要 的锯齿会干扰对角线的流动。";
      }
      markup() {
        var asset, markup, pixelArtEvaluation, stepNumber;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = function () {
          var i, len, ref, results;
          ref = [4, 6, 8];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            stepNumber = ref[i];
            results.push(this.perceivedLineMarkupForStep(asset, pixelArtEvaluation, stepNumber));
          }
          return results;
        }.call(this);
        return _.flatten(markup);
      }
    }
    ;
    Line5Draw.initialize();
    return Line5Draw;
  }.call(this);
  Instructions.Line5Fix = function () {
    class Line5Fix extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Line5Fix");
      }
      static stepNumber() {
        return 9;
      }
      static message() {
        return "也在这里移动像素。\n你会得到一条不同的线，但艺术家经常调整角度来制作具有理想锯齿的线条。\n这将在对角线教程中探讨。";
      }
      markup() {
        var arrowBase, arrowData, asset, bitmap, i, len, markup, markupStyle, pixelArtEvaluation, ref, stepNumber;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = function () {
          var i, len, ref, results;
          ref = [4, 6, 8];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            stepNumber = ref[i];
            results.push(this.perceivedLineMarkupForStep(asset, pixelArtEvaluation, stepNumber));
          }
          return results;
        }.call(this);
        markup = _.flatten(markup);
        markupStyle = Markup.errorStyle();
        arrowBase = {
          arrow: {
            end: true,
            width: 0.5,
            length: 0.25
          },
          style: markupStyle
        };
        bitmap = asset.bitmap();
        ref = [{
          x: 23.5,
          y: 17.5,
          sign: 1
        }, {
          x: 24.5,
          y: 16.5,
          sign: 1
        }, {
          x: 32.5,
          y: 10.5,
          sign: -1
        }, {
          x: 33.5,
          y: 9.5,
          sign: -1
        }];
        for (i = 0, len = ref.length; i < len; i++) {
          arrowData = ref[i];
          if (!bitmap.findPixelAtAbsoluteCoordinates(Math.floor(arrowData.x + arrowData.sign), Math.floor(arrowData.y))) {
            markup.push({
              line: _.extend({}, arrowBase, {
                points: [{
                  x: arrowData.x,
                  y: arrowData.y
                }, {
                  x: arrowData.x + arrowData.sign * PAA.Tutorials.Drawing.PixelArtFundamentals.movePixelArrowLength,
                  y: arrowData.y
                }]
              })
            });
          }
        }
        return markup;
      }
    }
    ;
    Line5Fix.initialize();
    return Line5Fix;
  }.call(this);
  Instructions.Complete = function () {
    class Complete extends Instructions.StepInstruction {
      static id() {
        return "".concat(Jaggies2.id(), ".Complete");
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
      markup() {
        var asset, markup, pixelArtEvaluation, stepNumber;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = function () {
          var i, len, ref, results;
          ref = [4, 6, 8];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            stepNumber = ref[i];
            results.push(this.perceivedLineMarkupForStep(asset, pixelArtEvaluation, stepNumber));
          }
          return results;
        }.call(this);
        return _.flatten(markup);
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"diagonals":{"diagonals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/diagonals.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals = function () {
  class Diagonals extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals';
    }
    static fullName() {
      return "像素画对角线";
    }
    static assets() {
      return [this.EvenDiagonals, this.ConstrainingAngles, this.UnevenDiagonals, this.SegmentLengths, this.EndSegments, this.UnevenDiagonalsArtStyle];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Diagonals);
    }
  }
  ;
  Diagonals.initialize();
  return Diagonals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"evendiagonals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/evendiagonals.coffee   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI,
  Markup,
  PAA,
  StraightLine,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
StraightLine = PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.EvenDiagonals = function () {
  var Asset;
  class EvenDiagonals extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.EvenDiagonals";
    }
    static displayName() {
      return "Even diagonals";
    }
    static description() {
      return "并非所有锯齿都一样，也并非所有对角线都有相同的美感。";
    }
    static fixedDimensions() {
      return {
        width: 26,
        height: 26
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 4; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/diagonals/evendiagonals-".concat(step, ".png"));
      }
      return results;
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
  }
  ;
  EvenDiagonals.initialize();
  Asset = EvenDiagonals;
  EvenDiagonals.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
    markup() {
      var asset, i, len, line, lineEvaluation, linePart, markup, pixelArtEvaluation, ref;
      // Write diagonal ratios next to lines.
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return;
      }
      markup = [];
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        if (line.parts.length !== 1) {
          // Draw this only for lines that are recognized as straight lines.
          continue;
        }
        linePart = line.parts[0];
        if (!(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine)) {
          continue;
        }
        lineEvaluation = linePart.evaluate();
        if (lineEvaluation.type !== StraightLine.Type.AxisAligned) {
          markup.push(Markup.PixelArt.diagonalRatioText(linePart));
        }
      }
      return markup;
    }
  };
  EvenDiagonals.StepInstructionWithSegmentLines = class StepInstructionWithSegmentLines extends EvenDiagonals.StepInstruction {
    markup() {
      var asset, i, len, line, linePart, markup, pixelArtEvaluation, ref;
      markup = super.markup(...arguments);
      if (!(asset = this.getActiveAsset())) {
        return markup;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return markup;
      }
      ref = pixelArtEvaluation.layers[0].lines;

      // Add perceived lines for straight lines.
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        if (line.parts.length !== 1) {
          continue;
        }
        linePart = line.parts[0];
        if (!(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine)) {
          continue;
        }
        markup.push(Markup.PixelArt.perceivedStraightLine(linePart));
      }
      return markup;
    }
  };
  EvenDiagonals.Horizontal = function () {
    class Horizontal extends EvenDiagonals.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Aligned");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "像素画中的垂直和水平线不会产生锯齿。因此某些角度（如0°和90°）比其它更常用。";
      }
    }
    ;
    Horizontal.initialize();
    return Horizontal;
  }.call(this);
  EvenDiagonals.OneToOne = function () {
    class OneToOne extends EvenDiagonals.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".OneToOne");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "尽管45°对角线产生锯齿，但线条遵循统一的模式，每向前移动一个像素就上升一个像素。我们称之为1:1对角线。";
      }
    }
    ;
    OneToOne.initialize();
    return OneToOne;
  }.call(this);
  EvenDiagonals.OneToTwo = function () {
    class OneToTwo extends EvenDiagonals.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".OneToTwo");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "如果线段是2像素长，我们就得到1:2和2:1对角线。";
      }
    }
    ;
    OneToTwo.initialize();
    return OneToTwo;
  }.call(this);
  EvenDiagonals.Even = function () {
    class Even extends EvenDiagonals.StepInstructionWithSegmentLines {
      static id() {
        return "".concat(Asset.id(), ".Even");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "每当我们在每个线段使用相同数量的像素时，我们就创建了偶数或「完美」对角线。\n这些角度在像素画中被认为是完美的，因为线段的角落正好跟随感知线条。";
      }

      // Note: We want this instruction to appear also when the asset
      // is completed, which is why we're overriding this method.
      static activeConditions() {
        var ref;
        // Show with the correct step.
        if (ref = this.activeStepNumber(), indexOf.call(this.stepNumbers(), ref) < 0) {
          return;
        }
        return true;
      }
    }
    ;
    Even.initialize();
    return Even;
  }.call(this);
  return EvenDiagonals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"constrainingangles.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/constrainingangles.cof //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA, StraightLine;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
StraightLine = PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.ConstrainingAngles = function () {
  var Asset;
  class ConstrainingAngles extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.ConstrainingAngles";
    }
    static displayName() {
      return "Constraining line angles";
    }
    static description() {
      return "加快画偶数对角线的速度。";
    }
    static fixedDimensions() {
      return {
        width: 23,
        height: 15
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 5; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/diagonals/constrainingangles-".concat(step, ".png"));
      }
      return results;
    }
    static markup() {
      return true;
    }
    initializeSteps() {
      var stepArea, steps;
      super.initializeSteps(...arguments);

      // Allow steps to complete with extra pixels so that we can show only line ends, but continue with a line drawn.
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();
      return steps[0].options.canCompleteWithExtraPixels = true;
    }
  }
  ;
  ConstrainingAngles.initialize();
  Asset = ConstrainingAngles;
  ConstrainingAngles.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
    markup() {
      var asset, bitmap, i, j, markup, ref, ref1, ref2, ref3, unevenPixelBase, x, y;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(bitmap = asset.bitmap())) {
        return;
      }
      markup = [];

      // Highlight uneven pixels.
      unevenPixelBase = {
        style: Markup.errorStyle()
      };
      for (x = i = ref = bitmap.bounds.left, ref1 = bitmap.bounds.right; ref <= ref1 ? i <= ref1 : i >= ref1; x = ref <= ref1 ? ++i : --i) {
        for (y = j = ref2 = bitmap.bounds.top, ref3 = bitmap.bounds.bottom; ref2 <= ref3 ? j <= ref3 : j >= ref3; y = ref2 <= ref3 ? ++j : --j) {
          if (!bitmap.findPixelAtAbsoluteCoordinates(x, y)) {
            // Uneven pixels can only exist where pixels are placed.
            continue;
          }
          if (asset.hasGoalPixel(x, y)) {
            // If we don't need a pixel here, it's uneven.
            continue;
          }
          markup.push({
            pixel: _.extend({
              x,
              y
            }, unevenPixelBase)
          });
        }
      }
      return markup;
    }
  };
  ConstrainingAngles.DrawLine = function () {
    class DrawLine extends ConstrainingAngles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".DrawLine");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "用铅笔的画线功能（shift + 点击）连接两个点。";
      }
    }
    ;
    DrawLine.initialize();
    return DrawLine;
  }.call(this);
  ConstrainingAngles.Cleanup = function () {
    class Cleanup extends ConstrainingAngles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Cleanup");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "光栅艺术中用于画线的最常见算法（Bresenham 直线算法）不会创建偶数对角线，因为它试图使起点和终点线段更短（以便能够在一行中连接多条线）。你必须手动清理这样的线条。";
      }
    }
    ;
    Cleanup.initialize();
    return Cleanup;
  }.call(this);
  ConstrainingAngles.ConstrainAngle = function () {
    class ConstrainAngle extends ConstrainingAngles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".ConstrainAngle");
      }
      static stepNumbers() {
        return [3, 4];
      }
      static message() {
        return "为了更高效，当按住 shift 画线时，你也可以按住 cmd/ctrl 来将角度限制为偶数对角线。";
      }
    }
    ;
    ConstrainAngle.initialize();
    return ConstrainAngle;
  }.call(this);
  return ConstrainingAngles;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unevendiagonals.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/unevendiagonals.coffee //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA, StraightLine;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
StraightLine = PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.UnevenDiagonals = function () {
  var Asset;
  class UnevenDiagonals extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.UnevenDiagonals";
    }
    static displayName() {
      return "Uneven diagonals";
    }
    static description() {
      return "为了达到所有可能的角 度，我们需要具有不均匀线段长度的对角线。";
    }
    static fixedDimensions() {
      return {
        width: 39,
        height: 36
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 4; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/diagonals/unevendiagonals-".concat(step, ".png"));
      }
      return results;
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
  }
  ;
  UnevenDiagonals.initialize();
  Asset = UnevenDiagonals;
  UnevenDiagonals.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
    markup() {
      var asset, i, len, line, linePart, markup, pixelArtEvaluation, ref;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return;
      }
      markup = [];
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        if (line.parts.length !== 1) {
          continue;
        }
        linePart = line.parts[0];
        if (!(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine)) {
          continue;
        }

        // Add the perceived line.
        markup.push(Markup.PixelArt.perceivedStraightLine(linePart));
      }
      return markup;
    }
  };
  UnevenDiagonals.StepInstructionWithDiagonalRatios = class StepInstructionWithDiagonalRatios extends UnevenDiagonals.StepInstruction {
    markup() {
      var asset, diagonalRatioText, i, len, line, lineEvaluation, linePart, markup, pixelArtEvaluation, ref;
      markup = super.markup(...arguments);
      if (!(asset = this.getActiveAsset())) {
        // Write diagonal ratios next to lines.
        return markup;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return markup;
      }
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        if (line.parts.length !== 1) {
          // Draw this only for lines that are recognized as straight lines.
          continue;
        }
        linePart = line.parts[0];
        if (!(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine)) {
          continue;
        }
        lineEvaluation = linePart.evaluate();
        if (lineEvaluation.type !== StraightLine.Type.AxisAligned) {
          diagonalRatioText = Markup.PixelArt.diagonalRatioText(linePart);
          diagonalRatioText.text.style = this._getLineStyle(lineEvaluation);
          markup.push(diagonalRatioText);
        }
      }
      return markup;
    }
    _getLineStyle(lineEvaluation) {
      var ref;
      if ((ref = lineEvaluation.type) === StraightLine.Type.AxisAligned || ref === StraightLine.Type.EvenDiagonal) {
        return Markup.betterStyle();
      } else if (lineEvaluation.pointSegmentLengths === StraightLine.SegmentLengths.Alternating) {
        return Markup.mediocreStyle();
      } else {
        return Markup.worseStyle();
      }
    }
  };
  UnevenDiagonals.StepInstructionWithSegmentLines = class StepInstructionWithSegmentLines extends UnevenDiagonals.StepInstructionWithDiagonalRatios {
    markup() {
      var asset, i, j, k, len, len1, len2, line, lineEvaluation, linePart, markup, pixelArtEvaluation, point, ref, ref1, ref2, segmentCorners, segmentCornersLineBase, side;
      markup = super.markup(...arguments);
      if (!(asset = this.getActiveAsset())) {
        return markup;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return markup;
      }
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        if (line.parts.length !== 1) {
          continue;
        }
        linePart = line.parts[0];
        if (!(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine)) {
          continue;
        }

        // Add segment corner lines.
        lineEvaluation = linePart.evaluate();
        segmentCornersLineBase = Markup.PixelArt.perceivedLineBase();
        segmentCornersLineBase.style = this._getLineStyle(lineEvaluation);
        segmentCorners = linePart.getSegmentCorners();
        ref1 = ['left', 'right'];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          side = ref1[j];
          ref2 = segmentCorners[side];
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            point = ref2[k];
            point.x += 0.5;
            point.y += 0.5;
          }
          markup.push({
            line: _.extend({}, segmentCornersLineBase, {
              points: segmentCorners[side]
            })
          });
        }
      }
      return markup;
    }
  };
  UnevenDiagonals.ShallowAngles = function () {
    class ShallowAngles extends UnevenDiagonals.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".ShallowAngles");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "对于接近水平和垂直的角度，我们可以轻松找到偶数对角线。";
      }
    }
    ;
    ShallowAngles.initialize();
    return ShallowAngles;
  }.call(this);
  UnevenDiagonals.OneToTwo = function () {
    class OneToTwo extends UnevenDiagonals.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".OneToTwo");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "当我们从1:3到1:2对角线时，角度差距变大。";
      }
    }
    ;
    OneToTwo.initialize();
    return OneToTwo;
  }.call(this);
  UnevenDiagonals.OneToOne = function () {
    class OneToOne extends UnevenDiagonals.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".OneToOne");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "1:2和1:1对角线之间的差距最大。在那个范围内没有偶数线条。";
      }
    }
    ;
    OneToOne.initialize();
    return OneToOne;
  }.call(this);
  UnevenDiagonals.Intermediary = function () {
    class Intermediary extends UnevenDiagonals.StepInstructionWithDiagonalRatios {
      static id() {
        return "".concat(Asset.id(), ".Intermediary");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "为了缩小差距，我们必须使用中间对角线，它们在不同线段长度之间交替。";
      }
    }
    ;
    Intermediary.initialize();
    return Intermediary;
  }.call(this);
  UnevenDiagonals.Complete = function () {
    class Complete extends UnevenDiagonals.StepInstructionWithSegmentLines {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "由于不均匀线条的线段长度会变化，这会导致锯齿不能完美对齐预期方向。\n\n由于这个原因，这些角度有时被认为不太美观，如果可能的话会避免使用，取决于艺术品的需求和选择的艺术风格。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return UnevenDiagonals;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unevendiagonalsartstyle.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/unevendiagonalsartstyl //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, Markup, PAA, PAE, TutorialBitmap;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.UnevenDiagonalsArtStyle = function () {
  var Asset;
  class UnevenDiagonalsArtStyle extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.UnevenDiagonalsArtStyle";
    }
    static displayName() {
      return "Uneven diagonals as an art style";
    }
    static description() {
      return "重要的是要知道，在艺术中遵循任何规则都是一种选择。";
    }
    static bitmapInfo() {
      return "Artwork from [Into The Breach](https://subsetgames.com/itb.html), 2018\n\nArtist: Jay Ma";
    }
    static fixedDimensions() {
      return {
        width: 56,
        height: 86
      };
    }
    static minClipboardScale() {
      return 1;
    }
    static resources() {
      var i, layer, resources;
      resources = {
        layers: []
      };
      for (layer = i = 1; i <= 4; layer = ++i) {
        resources.layers.push(new this.Resource.ImagePixels("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/diagonals/unevendiagonalsartstyle-".concat(layer, ".png")));
      }
      return resources;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static markup() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          editable: true,
          allowedCriteria: [PAE.Criteria.EvenDiagonals],
          evenDiagonals: {
            segmentLengths: {}
          }
        }
      };
    }
    availableToolKeys() {
      return [PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas];
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds;
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);
      return new this.constructor.DisableEvenDiagonalsEvaluation(this, stepArea, {
        startPixels: this.resources.layers
      });
    }
  }
  ;
  UnevenDiagonalsArtStyle.initialize();
  Asset = UnevenDiagonalsArtStyle;
  UnevenDiagonalsArtStyle.DisableEvenDiagonalsEvaluation = class DisableEvenDiagonalsEvaluation extends TutorialBitmap.Step {
    completed() {
      return !this.tutorialBitmap.bitmap().properties.pixelArtEvaluation.evenDiagonals;
    }
    solve() {
      var bitmap, pixelArtEvaluation, updatePropertyAction;
      // Disable pixel art evaluation.
      bitmap = this.tutorialBitmap.bitmap();
      pixelArtEvaluation = bitmap.properties.pixelArtEvaluation;
      delete pixelArtEvaluation.evenDiagonals;
      updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.tutorialBitmap.id(), bitmap, 'pixelArtEvaluation', pixelArtEvaluation);
      return AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, updatePropertyAction, new Date());
    }
    hasPixel(x, y) {
      // We simply require pixels everywhere we have them.
      return this.tutorialBitmap.bitmap().findPixelAtAbsoluteCoordinates(x, y);
    }
  };
  UnevenDiagonalsArtStyle.Convention = function () {
    class Convention extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Convention");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "偶数对角线是一种惯例，你可以像在《Into the Breach》的作品中看到的那样，无论是否使用它们都能做出很棒的艺术。\n高视角有助于游戏板的可读性，并创造独特、突出的风格。\n\n打开评估纸以继续。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        return !asset.completed();
      }
      static completedConditions() {
        var editor, pixelArtEvaluation;
        editor = this.getEditor();
        pixelArtEvaluation = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
        return pixelArtEvaluation.active();
      }
      static resetCompletedConditions() {
        var editor, pixelArtEvaluation;
        if (!this.getActiveAsset()) {
          return true;
        }
        editor = this.getEditor();
        pixelArtEvaluation = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
        return !pixelArtEvaluation.active();
      }
      static priority() {
        return 1;
      }
    }
    ;
    Convention.initialize();
    return Convention;
  }.call(this);
  UnevenDiagonalsArtStyle.TurnOff = function () {
    class TurnOff extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".TurnOff");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "在这里使用不均匀、断开的对角线是一个深思熟虑的选择。\n你也可以这样选择，所以要完成这节课，通过取消所需的勾选来关闭偶数对角线评估。";
      }
      static displaySide() {
        return PAA.PixelPad.Systems.Instructions.DisplaySide.Top;
      }
      static activeConditions() {
        var asset, editor, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (asset.completed()) {
          return;
        }

        // Note: We have to activate only when the evaluation paper is open, so that the onActivate animation
        // happens immediately, even before the previous instruction hides and displays this one.
        if (!(editor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = editor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        return pixelArtEvaluation.active();
      }
      onActivate() {
        var camera, drawingEditor, pixelCanvas;
        super.onActivate(...arguments);
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo({
          x: 28,
          y: 16
        }, 1);
        return camera.scaleTo(5, 1);
      }
      markup() {
        var asset, linePart, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return [];
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return [];
        }
        linePart = pixelArtEvaluation.getLinePartsAt(40, 21)[0];
        return Markup.PixelArt.straightLineBreakdown(linePart);
      }
    }
    ;
    TurnOff.initialize();
    return TurnOff;
  }.call(this);
  return UnevenDiagonalsArtStyle;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"segmentlengths":{"segmentlengths.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/segmentlengths/segment //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA, PAE, PixelArtFundamentals, StraightLine, TutorialBitmap;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAE = PAA.Practice.PixelArtEvaluation;
StraightLine = PAE.Line.Part.StraightLine;
PixelArtFundamentals = PAA.Tutorials.Drawing.PixelArtFundamentals;
PixelArtFundamentals.Jaggies.Diagonals.SegmentLengths = function () {
  class SegmentLengths extends PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.SegmentLengths";
    }
    static displayName() {
      return "Alternating and broken segment lengths";
    }
    static description() {
      return "学习像素画评估纸如何帮助你识别对角线类型。";
    }
    static fixedDimensions() {
      return {
        width: 31,
        height: 53
      };
    }
    static resources() {
      var path;
      path = '/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/diagonals/segmentlengths';
      return {
        firstLinesPixels: new this.Resource.ImagePixels("".concat(path, ".png")),
        paths: new this.Resource.SvgPaths("".concat(path, ".svg"))
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds, svgPaths;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);
      svgPaths = this.resources.paths.svgPaths();

      // First lines: Step 1 requires you to draw the goal pixels based on the first 3 paths.
      new this.constructor.Steps.DrawLine(this, stepArea, {
        goalPixels: this.resources.firstLinesPixels,
        svgPaths: [svgPaths[0], svgPaths[1], svgPaths[2]],
        preserveCompleted: true
      });

      // Step 2 requires you to open the evaluation paper.
      new this.constructor.Steps.OpenEvaluationPaper(this, stepArea);

      // Step 3 requires you to open the even diagonals breakdown.
      new PixelArtFundamentals.OpenEvaluationCriterion(this, stepArea, {
        criterion: PAE.Criteria.EvenDiagonals
      });

      // Step 4 requires you to hover over the 3 diagonals.
      new this.constructor.Steps.HoverOverTheDiagonals(this, stepArea);

      // Step 5 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Line 2:5: Step 6 requires you to draw the next line.
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: [svgPaths[3]],
        preserveCompleted: true
      });
      // Step 7 requires to fix the line to be alternating.
      new this.constructor.Steps.AlternatingLine(this, stepArea, {
        svgPaths: [svgPaths[3]]
      });

      // Step 8 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Line 2:9: Step 9 requires you to draw the next line.
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: [svgPaths[4]],
        preserveCompleted: true
      });

      // Step 10 requires this to be an alternating line.
      new this.constructor.Steps.AlternatingLine(this, stepArea, {
        svgPaths: [svgPaths[4]]
      });

      // Step 11 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Line 1:5: Step 12 requires you to draw the next line.
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: [svgPaths[5]],
        preserveCompleted: true
      });

      // Step 13 requires this to be an even line.
      return new this.constructor.Steps.EvenLine(this, stepArea, {
        svgPaths: [svgPaths[5]]
      });
    }
  }
  ;
  SegmentLengths.initialize();
  return SegmentLengths;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/segmentlengths/steps.c //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI,
  PAA,
  PAE,
  SegmentLengths,
  StraightLine,
  TutorialBitmap,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAE = PAA.Practice.PixelArtEvaluation;
StraightLine = PAE.Line.Part.StraightLine;
SegmentLengths = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.SegmentLengths;
SegmentLengths.Steps = function () {
  class Steps {}
  ;
  Steps.DrawLine = class DrawLine extends TutorialBitmap.PixelsWithPathsStep {
    completed() {
      if (!super.completed(...arguments)) {
        return;
      }

      // Wait until the line has stopped drawing, otherwise adding pixel art
      // evaluation properties will happen in-between the stroke and get lost.
      return !this.tutorialBitmap.bitmap().partialAction;
    }
  };
  Steps.OpenEvaluationPaper = class OpenEvaluationPaper extends PAA.Tutorials.Drawing.PixelArtFundamentals.OpenEvaluationPaper {
    activate() {
      var bitmap, pixelArtEvaluation, updatePropertyAction;
      super.activate(...arguments);
      bitmap = this.tutorialBitmap.bitmap();
      pixelArtEvaluation = {
        allowedCriteria: [PAE.Criteria.EvenDiagonals],
        evenDiagonals: {
          segmentLengths: {}
        }
      };
      updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.tutorialBitmap.constructor.id(), bitmap, 'pixelArtEvaluation', pixelArtEvaluation);
      return bitmap.executeAction(updatePropertyAction);
    }
  };
  Steps.HoverOverTheDiagonals = class HoverOverTheDiagonals extends TutorialBitmap.EphemeralStep {
    constructor() {
      super(...arguments);
      this.lineStartYsHoveredOver = new ReactiveField([]);
    }
    reset() {
      super.reset(...arguments);
      return this.lineStartYsHoveredOver([]);
    }
    completed() {
      var drawingEditor, hoveredLine, hoveredPixel, lineStartYsHoveredOver, pixelArtEvaluation, pixelArtEvaluationView, startY;
      if (super.completed(...arguments)) {
        return true;
      }
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluationView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      if (pixelArtEvaluationView.activeCriterion() !== PAE.Criteria.EvenDiagonals) {
        return;
      }
      if (!(hoveredPixel = pixelArtEvaluationView.hoveredPixel())) {
        return;
      }
      pixelArtEvaluation = pixelArtEvaluationView.pixelArtEvaluation();
      if (!(hoveredLine = pixelArtEvaluation.getLinesAt(hoveredPixel.x, hoveredPixel.y)[0])) {
        return;
      }
      startY = hoveredLine.pixels[0].y;
      lineStartYsHoveredOver = this.lineStartYsHoveredOver();
      if (indexOf.call(lineStartYsHoveredOver, startY) < 0) {
        lineStartYsHoveredOver.push(startY);
        this.lineStartYsHoveredOver(lineStartYsHoveredOver);
        if (lineStartYsHoveredOver.length === 3) {
          this.solve();
          return true;
        }
      }
      return false;
    }
  };
  Steps.LineEvaluationStep = class LineEvaluationStep extends TutorialBitmap.PathStep {
    getLineEvaluation() {
      var corner, cornersForPart, linePart, linePartsAtAllCorners, linePartsAtCorners, pixelArtEvaluation;
      if (!(pixelArtEvaluation = this.tutorialBitmap.pixelArtEvaluation())) {
        return;
      }
      linePartsAtCorners = function () {
        var i, len, ref, results;
        ref = this.paths[0].cornersOfParts;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          cornersForPart = ref[i];
          results.push(function () {
            var j, len1, results1;
            results1 = [];
            for (j = 0, len1 = cornersForPart.length; j < len1; j++) {
              corner = cornersForPart[j];
              results1.push(pixelArtEvaluation.getLinePartsAt(corner.x, corner.y));
            }
            return results1;
          }());
        }
        return results;
      }.call(this);
      linePartsAtCorners = _.flatten(linePartsAtCorners);
      linePartsAtAllCorners = _.intersection(...linePartsAtCorners);
      if (!(linePart = linePartsAtAllCorners[0])) {
        return;
      }
      if (!(linePart instanceof StraightLine)) {
        return;
      }
      return linePart.evaluate();
    }
  };
  Steps.LineOfType = class LineOfType extends Steps.LineEvaluationStep {
    static type() {
      throw new AE.NotImplementedException("A line of type step must provide the type needed for completion.");
    }

    // Prevent new doubles to backtrack steps.
    static preserveCompleted() {
      return true;
    }
    completed() {
      var i, len, line, lineEvaluation, pixelArtEvaluation, ref;
      // Make sure no doubles are in the lines.
      if (!(pixelArtEvaluation = this.tutorialBitmap.pixelArtEvaluation())) {
        return;
      }
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        // The line must not have any doubles.
        lineEvaluation = line.evaluate();
        if (lineEvaluation.doubles.count) {
          return false;
        }
      }

      // Ensure ideal results by also requiring matching ends.
      if (!(lineEvaluation = this.getLineEvaluation())) {
        return;
      }
      if (lineEvaluation.endSegments.type !== StraightLine.EndSegments.Matching) {
        return;
      }
      return lineEvaluation.segmentLengths.type === this.constructor.type();
    }
  };
  Steps.AlternatingLine = class AlternatingLine extends Steps.LineOfType {
    static type() {
      return StraightLine.SegmentLengths.Alternating;
    }
  };
  Steps.EvenLine = class EvenLine extends Steps.LineOfType {
    static type() {
      return StraightLine.SegmentLengths.Even;
    }
  };
  return Steps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/segmentlengths/instruc //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var InstructionsSystem,
  LOI,
  Markup,
  PAA,
  PAE,
  SegmentLengths,
  StraightLine,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAE = PAA.Practice.PixelArtEvaluation;
StraightLine = PAE.Line.Part.StraightLine;

// Note: We can't call this Instructions since we introduce a namespace class called that below.
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
SegmentLengths = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.SegmentLengths;
SegmentLengths.Instructions = function () {
  class Instructions {}
  ;
  Instructions.PixelPerfectInstruction = function () {
    class PixelPerfectInstruction extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".PixelPerfectInstruction");
      }
      static assetClass() {
        return SegmentLengths;
      }
      static message() {
        return "确保你的线条是像素完美的（它们不应该有重复像素）。";
      }
      static getPixelArtEvaluation() {
        var drawingEditor;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      }
      static activeConditions() {
        var asset, i, len, line, lineEvaluation, pixelArtEvaluation, pixelArtEvaluationView, ref;
        // Only show this tip when the evaluation paper is open.
        if (!(pixelArtEvaluationView = this.getPixelArtEvaluation())) {
          return;
        }
        if (!pixelArtEvaluationView.active()) {
          return;
        }
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        ref = pixelArtEvaluation.layers[0].lines;
        for (i = 0, len = ref.length; i < len; i++) {
          line = ref[i];
          // The line must not have any doubles.
          lineEvaluation = line.evaluate(this._pixelPerfectLinesEvaluationProperty);
          if (lineEvaluation.doubles.count) {
            return true;
          }
        }
        return false;
      }
      static priority() {
        return 1;
      }
      displaySide() {
        var pixelArtEvaluation;
        pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;
    PixelPerfectInstruction._pixelPerfectLinesEvaluationProperty = {
      pixelPerfectLines: {
        doubles: {
          countAllLineWidthTypes: true,
          countPointsWithMultiplePixels: true
        }
      }
    };
    PixelPerfectInstruction.initialize();
    return PixelPerfectInstruction;
  }.call(this);
  Instructions.StepInstruction = function () {
    class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static assetClass() {
        return SegmentLengths;
      }
      static closeOutsideEvaluationPaper() {
        return false;
      }
      static resetCompletedConditions() {
        return !this.getActiveAsset();
      }
      static getPixelArtEvaluation() {
        var drawingEditor;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      }
      static activeDisplayState() {
        var pixelArtEvaluation;
        if (!this.closeOutsideEvaluationPaper()) {
          return PAA.PixelPad.Systems.Instructions.DisplayState.Open;
        }
        pixelArtEvaluation = this.getPixelArtEvaluation();
        if (pixelArtEvaluation.active()) {
          return PAA.PixelPad.Systems.Instructions.DisplayState.Open;
        } else {
          return PAA.PixelPad.Systems.Instructions.DisplayState.Closed;
        }
      }
      displaySide() {
        var pixelArtEvaluation;
        pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
      openEvaluationPaper(focusPoint, scale) {
        var camera, drawingEditor, pixelArtEvaluation, pixelCanvas;
        pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
        pixelArtEvaluation.activate(PAE.Criteria.EvenDiagonals);
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo(focusPoint, 1);
        return camera.scaleTo(scale, 1);
      }
      centerFocus() {
        var camera, drawingEditor, pixelCanvas;
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        return camera.translateTo({
          x: 15,
          y: 26
        }, 1);
      }
      getLinePartForStep(stepNumber) {
        var asset, corners, linePart, pixelArtEvaluation, step;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        if (!(step = this.getTutorialStep(stepNumber))) {
          return;
        }
        corners = _.flatten(step.paths[0].cornersOfParts);
        if (!(linePart = pixelArtEvaluation.getLinePartsBetween(...corners)[0])) {
          return;
        }
        if (!(linePart instanceof StraightLine)) {
          return;
        }
        return linePart;
      }
      getLineBreakdownMarkup(stepNumber) {
        var linePart;
        if (!(linePart = this.getLinePartForStep(stepNumber))) {
          return [];
        }
        return Markup.PixelArt.straightLineBreakdown(linePart);
      }
    }
    ;

    // The amount of time before we show instructions to the user after a new UI element is introduced.
    StepInstruction.uiRevealDelayDuration = 3;

    // The amount of time before we show instructions when a new line is introduced.
    StepInstruction.newLineDelayDuration = 5;
    return StepInstruction;
  }.call(this);
  Instructions.DrawDiagonals = function () {
    class DrawDiagonals extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".DrawDiagonals");
      }
      static stepNumber() {
        return 1;
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
      static message() {
        return "用铅笔的画线功能（shift + 点击）画三条对角线。";
      }
    }
    ;
    DrawDiagonals.initialize();
    return DrawDiagonals;
  }.call(this);
  Instructions.EvaluationPaper = function () {
    class EvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".EvaluationPaper");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "现在你可以打开像素画评估纸来分析对角线。";
      }
      markup() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereMarkup();
      }
    }
    ;
    EvaluationPaper.initialize();
    return EvaluationPaper;
  }.call(this);
  Instructions.ReopenEvaluationPaper = function () {
    class ReopenEvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".ReopenEvaluationPaper");
      }
      static stepNumbers() {
        return [3, 4];
      }
      static message() {
        return "打开像素画评估纸以继续。";
      }
      static activeConditions() {
        var pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not open.
        if (!(pixelArtEvaluation = this.getPixelArtEvaluation())) {
          return;
        }
        return !pixelArtEvaluation.active();
      }
      static priority() {
        return 2;
      }
    }
    ;
    ReopenEvaluationPaper.initialize();
    return ReopenEvaluationPaper;
  }.call(this);
  Instructions.Criterion = function () {
    class Criterion extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".Criterion");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "对角线可以根据其均匀程度进行评估。点击偶数对角线标准以继续。";
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      markup() {
        var pixelArtEvaluation;
        // Show only on the pixel art evaluation overview.
        if (!(pixelArtEvaluation = this.constructor.getPixelArtEvaluation())) {
          return;
        }
        if (pixelArtEvaluation.activeCriterion()) {
          return;
        }
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionMarkup('.even-diagonals');
      }
    }
    ;
    Criterion.initialize();
    return Criterion;
  }.call(this);
  Instructions.ReopenCriterion = function () {
    class ReopenCriterion extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".ReopenCriterion");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "点击偶数对角线标准以继续。";
      }
      static activeConditions() {
        var pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not on the even diagonals page.
        if (!(pixelArtEvaluation = this.getPixelArtEvaluation())) {
          return;
        }
        if (!pixelArtEvaluation.active()) {
          return;
        }
        return pixelArtEvaluation.activeCriterion() !== PAE.Criteria.EvenDiagonals;
      }
      static priority() {
        return 2;
      }
    }
    ;
    ReopenCriterion.initialize();
    return ReopenCriterion;
  }.call(this);
  Instructions.TypesMarkup = class TypesMarkup extends Instructions.StepInstruction {
    markup() {
      var arrowBase, lineStartYsHoveredOver, markup, pixelArtEvaluationView, step, textBase;
      // Show if the pixel art evaluation paper is on the even diagonals page.
      if (!(pixelArtEvaluationView = this.constructor.getPixelArtEvaluation())) {
        return [];
      }
      if (pixelArtEvaluationView.activeCriterion() !== PAE.Criteria.EvenDiagonals) {
        return [];
      }
      markup = [];
      arrowBase = Markup.arrowBase();
      textBase = Markup.textBase();
      step = this.getTutorialStep(4);
      lineStartYsHoveredOver = step.lineStartYsHoveredOver();
      if (indexOf.call(lineStartYsHoveredOver, 32) < 0) {
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 30,
              y: 32
            }, {
              x: 24,
              y: 26.5,
              bezierControlPoints: [{
                x: 30,
                y: 28.5
              }, {
                x: 27,
                y: 27
              }]
            }]
          })
        });
      }
      if (indexOf.call(lineStartYsHoveredOver, 41) < 0) {
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 27,
              y: 34
            }, {
              x: 24,
              y: 33.5,
              bezierControlPoints: [{
                x: 25,
                y: 34
              }, {
                x: 26,
                y: 33.5
              }]
            }]
          })
        });
      }
      if (indexOf.call(lineStartYsHoveredOver, 49) < 0) {
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 30,
              y: 36
            }, {
              x: 23,
              y: 41.5,
              bezierControlPoints: [{
                x: 30,
                y: 39.5
              }, {
                x: 27,
                y: 41
              }]
            }]
          })
        });
      }
      if (lineStartYsHoveredOver.length !== 3) {
        markup.push({
          text: _.extend({}, textBase, {
            position: {
              x: 30,
              y: 34,
              origin: Markup.TextOriginPosition.MiddleCenter
            },
            value: "hover\nhere"
          })
        });
      }
      markup.push({
        text: _.extend({}, textBase, {
          position: {
            x: 4,
            y: 29.5,
            origin: Markup.TextOriginPosition.MiddleCenter
          },
          value: "EVEN"
        })
      });
      markup.push({
        text: _.extend({}, textBase, {
          position: {
            x: 4,
            y: 38.5,
            origin: Markup.TextOriginPosition.MiddleCenter
          },
          value: "UNEVEN\nALTERNATING"
        })
      });
      markup.push({
        text: _.extend({}, textBase, {
          position: {
            x: 4,
            y: 46.5,
            origin: Markup.TextOriginPosition.MiddleCenter
          },
          value: "UNEVEN\nBROKEN"
        })
      });
      return markup;
    }
  };
  Instructions.Hover = function () {
    class Hover extends Instructions.TypesMarkup {
      static id() {
        return "".concat(SegmentLengths.id(), ".Hover");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "悬停在对角线上分析它们的线段长度有多均匀。";
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      static activeConditions() {
        var pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is on the even diagonals page.
        if (!(pixelArtEvaluation = this.getPixelArtEvaluation())) {
          return;
        }
        return pixelArtEvaluation.activeCriterion() === PAE.Criteria.EvenDiagonals;
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 15,
          y: 38
        }, 4);
      }
    }
    ;
    Hover.initialize();
    return Hover;
  }.call(this);
  Instructions.DiagonalOfType = class DiagonalOfType extends Instructions.TypesMarkup {
    static type() {
      throw new AE.NotImplementedException("A line of type step must provide the type needed for completion.");
    }
    static stepNumbers() {
      return [4, 5];
    }
    static priority() {
      return 1;
    }
    static activeConditions() {
      var hoveredLinePart, hoveredPixel, lineEvaluation, pixelArtEvaluation, pixelArtEvaluationView;
      if (!super.activeConditions(...arguments)) {
        return;
      }

      // Show if the pixel art evaluation paper is on the even diagonals page.
      if (!(pixelArtEvaluationView = this.getPixelArtEvaluation())) {
        return;
      }
      if (pixelArtEvaluationView.activeCriterion() !== PAE.Criteria.EvenDiagonals) {
        return;
      }
      if (!(hoveredPixel = pixelArtEvaluationView.hoveredPixel())) {
        return;
      }
      pixelArtEvaluation = pixelArtEvaluationView.pixelArtEvaluation();
      if (!(hoveredLinePart = pixelArtEvaluation.getLinePartsAt(hoveredPixel.x, hoveredPixel.y)[0])) {
        return;
      }
      lineEvaluation = hoveredLinePart.evaluate();
      return lineEvaluation.segmentLengths.type === this.type();
    }
  };
  Instructions.EvenDiagonal = function () {
    class EvenDiagonal extends Instructions.DiagonalOfType {
      static id() {
        return "".concat(SegmentLengths.id(), ".EvenDiagonal");
      }
      static type() {
        return StraightLine.SegmentLengths.Even;
      }
      static message() {
        return "1:2对角线是偶数的，因为它只有长度为2的线段。";
      }
    }
    ;
    EvenDiagonal.initialize();
    return EvenDiagonal;
  }.call(this);
  Instructions.AlternatingDiagonal = function () {
    class AlternatingDiagonal extends Instructions.DiagonalOfType {
      static id() {
        return "".concat(SegmentLengths.id(), ".AlternatingDiagonal");
      }
      static type() {
        return StraightLine.SegmentLengths.Alternating;
      }
      static message() {
        return "2:3对角线有完美交替的1和2线段（1-2-1-2模式），这对于不均匀对角线来说已经是最好的了。";
      }
    }
    ;
    AlternatingDiagonal.initialize();
    return AlternatingDiagonal;
  }.call(this);
  Instructions.BrokenDiagonal = function () {
    class BrokenDiagonal extends Instructions.DiagonalOfType {
      static id() {
        return "".concat(SegmentLengths.id(), ".BrokenDiagonal");
      }
      static type() {
        return StraightLine.SegmentLengths.Broken;
      }
      static message() {
        return "这个不均匀的线段被分成多个重复的1和单个2的组（1-1-1-2模式），使其在视觉上也是断开的。";
      }
    }
    ;
    BrokenDiagonal.initialize();
    return BrokenDiagonal;
  }.call(this);
  Instructions.CloseEvaluationPaper = function () {
    class CloseEvaluationPaper extends Instructions.TypesMarkup {
      static id() {
        return "".concat(SegmentLengths.id(), ".CloseEvaluationPaper");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "关闭评估纸来画下一条线。";
      }
    }
    ;
    CloseEvaluationPaper.initialize();
    return CloseEvaluationPaper;
  }.call(this);
  Instructions.ContinueLine2 = function () {
    class ContinueLine2 extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".ContinueLine2");
      }
      static stepNumber() {
        return 6;
      }
      static message() {
        return "用铅笔的画线功能（shift + 点击）画新的对角线。";
      }
      static delayDuration() {
        return this.newLineDelayDuration;
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.centerFocus();
      }
    }
    ;
    ContinueLine2.initialize();
    return ContinueLine2;
  }.call(this);
  Instructions.Alternating25 = function () {
    class Alternating25 extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".Alternating25");
      }
      static stepNumber() {
        return 7;
      }
      static message() {
        return "这条对角线由长度为2和3的线段组成。\n然而，它们不必要地被分成组（3-3和2-2）而不是交替。\n\n看看你能否通过使用2-3-2-3-2-…模式来修复这个问题。";
      }
      static closeOutsideEvaluationPaper() {
        return true;
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 15,
          y: 20
        }, 4);
      }
      markup() {
        var pixelArtEvaluation;
        pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
        if (!pixelArtEvaluation.active()) {
          return [];
        }
        return this.getLineBreakdownMarkup(7);
      }
    }
    ;
    Alternating25.initialize();
    return Alternating25;
  }.call(this);
  Instructions.Alternating25Fixed = function () {
    class Alternating25Fixed extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".Alternating25Fixed");
      }
      static stepNumber() {
        return 8;
      }
      static message() {
        return "不错！这条对角线现在每横跨5像素就稳定上升2像素，使其成为理想的2:5对角线。\n\n继续用交替的线段长度画下一条线。";
      }
      static closeOutsideEvaluationPaper() {
        return true;
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 15,
          y: 20
        }, 4);
      }
      markup() {
        var pixelArtEvaluation;
        pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
        if (!pixelArtEvaluation.active()) {
          return [];
        }
        return this.getLineBreakdownMarkup(6);
      }
    }
    ;
    Alternating25Fixed.initialize();
    return Alternating25Fixed;
  }.call(this);
  Instructions.ContinueLine3 = function () {
    class ContinueLine3 extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".ContinueLine3");
      }
      static stepNumber() {
        return 9;
      }
      static message() {
        return "继续用交替的线段长度画下一条线。";
      }
      static delayDuration() {
        return this.newLineDelayDuration;
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.centerFocus();
      }
    }
    ;
    ContinueLine3.initialize();
    return ContinueLine3;
  }.call(this);
  Instructions.Line3AlternatingHint = function () {
    class Line3AlternatingHint extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".Line3AlternatingHint");
      }
      static stepNumber() {
        return 10;
      }
      static message() {
        return "用4-5-4-5-4的线段长度模式画这条线。";
      }
      static delayDuration() {
        return this.newLineDelayDuration;
      }
    }
    ;
    Line3AlternatingHint.initialize();
    return Line3AlternatingHint;
  }.call(this);
  Instructions.Alternating29 = function () {
    class Alternating29 extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".Alternating29");
      }
      static stepNumber() {
        return 11;
      }
      static message() {
        return "这条线的百分比分数（90%）高于前一条（83%），因为线段更长，使交替不那么明显。\n\n通过画一条偶数1:5对角线来结束以进行比较。";
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 15,
          y: 14
        }, 4);
      }
      markup() {
        return [...this.getLineBreakdownMarkup(6), ...this.getLineBreakdownMarkup(9)];
      }
    }
    ;
    Alternating29.initialize();
    return Alternating29;
  }.call(this);
  Instructions.EvenUnevenComparison = function () {
    class EvenUnevenComparison extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".EvenUnevenComparison");
      }
      static message() {
        return "随着线段变长，不均匀和偶数对角线之间的差异变得可以忽略不计。做得好！";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 15,
          y: 12
        }, 4);
      }
      markup() {
        return [...this.getLineBreakdownMarkup(9), ...this.getLineBreakdownMarkup(12)];
      }
    }
    ;
    EvenUnevenComparison.initialize();
    return EvenUnevenComparison;
  }.call(this);
  Instructions.Complete = function () {
    class Complete extends Instructions.StepInstruction {
      static id() {
        return "".concat(SegmentLengths.id(), ".Complete");
      }
      static message() {
        return "请注意，你无法进一步提高这节课的百分比分数，因为你的评分是基于偶数对角线的，而图像也需要不均匀的对角线。\n记住，当艺术品看起来是你想要的样子时，分数并不重要。";
      }
      static activeDisplayState() {
        var pixelArtEvaluation;
        pixelArtEvaluation = this.getPixelArtEvaluation();
        if (pixelArtEvaluation.active()) {
          return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
        } else {
          return PAA.PixelPad.Systems.Instructions.DisplayState.Open;
        }
      }
      static activeConditions() {
        var asset, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed and evaluation paper is closed.
        if (!asset.completed()) {
          return;
        }
        pixelArtEvaluation = this.getPixelArtEvaluation();
        return !pixelArtEvaluation.active();
      }
      static priority() {
        return 1;
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"endsegments":{"endsegments.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/endsegments/endsegment //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, PAE, PixelArtFundamentals;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PixelArtFundamentals = PAA.Tutorials.Drawing.PixelArtFundamentals;
PixelArtFundamentals.Jaggies.Diagonals.EndSegments = function () {
  class EndSegments extends PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Diagonals.EndSegments";
    }
    static displayName() {
      return "Matching end segments";
    }
    static description() {
      return "对于更长的线条，另一个需要考虑的是端线段的长度。";
    }
    static fixedDimensions() {
      return {
        width: 63,
        height: 19
      };
    }
    static resources() {
      var path;
      path = '/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/diagonals/endsegments';
      return {
        line1: {
          endPixels: new this.Resource.ImagePixels("".concat(path, "-1.png")),
          bresenhamPixels: new this.Resource.ImagePixels("".concat(path, "-2.png")),
          alternatingPixels: new this.Resource.ImagePixels("".concat(path, "-3.png"))
        },
        line2: {
          endPixels: new this.Resource.ImagePixels("".concat(path, "-4.png")),
          bresenhamPixels: new this.Resource.ImagePixels("".concat(path, "-5.png")),
          extensionPixels: new this.Resource.ImagePixels("".concat(path, "-6.png"))
        }
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          allowedCriteria: [PAE.Criteria.EvenDiagonals],
          evenDiagonals: {
            segmentLengths: {},
            endSegments: {}
          }
        }
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);

      // Steps 1 and 2 require you to draw a Bresenham line between the dots.
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line1.endPixels,
        canCompleteWithExtraPixels: true
      });
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line1.bresenhamPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 3 requires you to open the even diagonals breakdown.
      new PixelArtFundamentals.OpenEvaluationCriterion(this, stepArea, {
        criterion: PAE.Criteria.EvenDiagonals
      });

      // Step 4 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Step 5 requires you to fix the line
      new PixelArtFundamentals.Jaggies.FixLineStep(this, stepArea, {
        previousPixels: this.resources.line1.bresenhamPixels,
        goalPixels: this.resources.line1.alternatingPixels
      });

      // Step 6 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);
      // Steps 7 and 8 require you to draw a Bresenham line between the dots.
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line2.endPixels,
        canCompleteWithExtraPixels: true
      });
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line2.bresenhamPixels,
        preserveCompleted: true
      });

      // Step 9 requires you to extend the line
      return new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.line2.extensionPixels
      });
    }
  }
  ;
  EndSegments.initialize();
  return EndSegments;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/endsegments/instructio //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var EndSegments, InstructionsSystem, InterfaceMarking, LOI, Markup, PAA, PAE, PixelArtFundamentals, StraightLine;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;

// Note: We can't call this Instructions since we introduce a namespace class called that below.
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
PixelArtFundamentals = PAA.Tutorials.Drawing.PixelArtFundamentals;
EndSegments = PixelArtFundamentals.Jaggies.Diagonals.EndSegments;
Markup = PAA.Practice.Helpers.Drawing.Markup;
StraightLine = PAE.Line.Part.StraightLine;
EndSegments.Instructions = function () {
  class Instructions {}
  ;
  Instructions.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return EndSegments;
    }
    static getPixelArtEvaluation() {
      var drawingEditor;
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
    }
    displaySide() {
      var pixelArtEvaluation;
      if (!(pixelArtEvaluation = this.constructor.getPixelArtEvaluation())) {
        return;
      }
      if (pixelArtEvaluation.active()) {
        return InstructionsSystem.DisplaySide.Top;
      } else {
        return InstructionsSystem.DisplaySide.Bottom;
      }
    }
    openEvaluationPaper(focusPoint, scale, criterion) {
      var camera, drawingEditor, pixelArtEvaluation, pixelCanvas;
      pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
      pixelArtEvaluation.activate(criterion);
      drawingEditor = this.getEditor();
      pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
      camera = pixelCanvas.camera();
      camera.translateTo(focusPoint, 1);
      return camera.scaleTo(scale, 1);
    }
  };
  Instructions.DrawLine = function () {
    class DrawLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".DrawLine");
      }
      static stepNumbers() {
        return [1, 2];
      }
      static message() {
        return "用默认的Bresenham算法连接两个点（shift + 点击，不使用偶数对角线选项）。";
      }
    }
    ;
    DrawLine.initialize();
    return DrawLine;
  }.call(this);
  Instructions.OpenEvaluationPaper = function () {
    class OpenEvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".OpenEvaluationPaper");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "打开像素画评估纸以继续。";
      }
      static priority() {
        return 1;
      }
      static activeConditions() {
        var pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not open.
        if (!(pixelArtEvaluation = this.getPixelArtEvaluation())) {
          return;
        }
        return !pixelArtEvaluation.active();
      }
    }
    ;
    OpenEvaluationPaper.initialize();
    return OpenEvaluationPaper;
  }.call(this);
  Instructions.OpenEvenDiagonals = function () {
    class OpenEvenDiagonals extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".OpenEvenDiagonals");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "这条线中间有偶数线段，但较短的端点出现在稍微不同的角度。\n\n打开偶数对角线标准来分析评分。";
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 31,
          y: 5
        }, 4);
      }
      markup() {
        var markup, pixelArtEvaluation;
        // Show only on the pixel art evaluation overview.
        if (!(pixelArtEvaluation = this.constructor.getPixelArtEvaluation())) {
          return [];
        }
        if (pixelArtEvaluation.activeCriterion()) {
          return [];
        }
        markup = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionMarkup('.even-diagonals');
        markup[0].interface.delay = 5;
        return markup;
      }
    }
    ;
    OpenEvenDiagonals.initialize();
    return OpenEvenDiagonals;
  }.call(this);
  Instructions.EndSegmentsCriterion = function () {
    class EndSegmentsCriterion extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".EndSegmentsCriterion");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "端线段标准因为有较短的端点而给线条扣分。\n\n通过延长端点和缩短中间线段来使线段匹配。";
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 31,
          y: 5
        }, 4, PAE.Criteria.EvenDiagonals);
      }
      markup() {
        var asset, linePart, markup, markupStyle, pixelArtEvaluation, ref;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        linePart = pixelArtEvaluation.getLinePartsAt(3, 7)[0];
        markup = Markup.PixelArt.straightLineBreakdown(linePart, asset.bitmap().properties.pixelArtEvaluation);
        markupStyle = InterfaceMarking.defaultStyle();
        if (((ref = this.constructor.getPixelArtEvaluation()) != null ? ref.activeCriterion() : void 0) === PAE.Criteria.EvenDiagonals) {
          markup.push({
            interface: {
              selector: ".pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation .end-segments",
              delay: 1,
              bounds: {
                x: -10,
                y: -10,
                width: 210,
                height: 50
              },
              markings: [{
                rectangle: {
                  strokeStyle: markupStyle,
                  x: -2.5,
                  y: 3,
                  width: 199,
                  height: 25
                }
              }]
            }
          });
        }
        return markup;
      }
    }
    ;
    EndSegmentsCriterion.initialize();
    return EndSegmentsCriterion;
  }.call(this);
  Instructions.FixLine = function () {
    class FixLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".FixLine");
      }
      static stepNumber() {
        return 5;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return InstructionsSystem.DisplayState.Hidden;
      }
      movePixelMarkup(x, y, dx, dy) {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return [];
        }
        return PixelArtFundamentals.movePixelMarkup(asset, x, y, dx, dy);
      }
      markup() {
        var i, j, k, markup, x;
        markup = [];
        for (x = i = 11; i <= 13; x = ++i) {
          markup.push(...this.movePixelMarkup(x, 6, 0, 1));
        }
        markup.push(...this.movePixelMarkup(25, 5, 0, 1));
        for (x = j = 37; j <= 38; x = ++j) {
          markup.push(...this.movePixelMarkup(x, 5, 0, -1));
        }
        for (x = k = 49; k <= 52; x = ++k) {
          markup.push(...this.movePixelMarkup(x, 4, 0, -1));
        }
        return markup;
      }
    }
    ;
    FixLine.initialize();
    return FixLine;
  }.call(this);
  Instructions.NewScore = function () {
    class NewScore extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".NewScore");
      }
      static stepNumber() {
        return 6;
      }
      static message() {
        return "虽然这条线现在有交替的线段，但它们足够长，以至于不如有匹配的端点那么重要。\n\n关闭评估纸以继续。";
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper({
          x: 31,
          y: 5
        }, 4, PAE.Criteria.EvenDiagonals);
      }
      markup() {
        var asset, linePart, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        linePart = pixelArtEvaluation.getLinePartsAt(3, 7)[0];
        return Markup.PixelArt.straightLineBreakdown(linePart, asset.bitmap().properties.pixelArtEvaluation);
      }
    }
    ;
    NewScore.initialize();
    return NewScore;
  }.call(this);
  Instructions.DrawLineTrick = function () {
    class DrawLineTrick extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".DrawLineTrick");
      }
      static stepNumbers() {
        return [7, 8];
      }
      static message() {
        return "用通常的画线算法画长对角线的一个小技巧是从更靠里的地方开始。连接两个点。";
      }
      onActivate() {
        var camera, drawingEditor, pixelCanvas;
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        return camera.translateTo({
          x: 31,
          y: 19
        }, 1);
      }
    }
    ;
    DrawLineTrick.initialize();
    return DrawLineTrick;
  }.call(this);
  Instructions.DrawLineExtension = function () {
    class DrawLineExtension extends Instructions.StepInstruction {
      static id() {
        return "".concat(EndSegments.id(), ".DrawLineExtension");
      }
      static stepNumber() {
        return 9;
      }
      static message() {
        return "现在你可以延伸端线段来达到同样的线条。";
      }
    }
    ;
    DrawLineExtension.initialize();
    return DrawLineExtension;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"curves":{"curves.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/curves.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves = function () {
  class Curves extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves';
    }
    static fullName() {
      return "像素画曲线";
    }
    static assets() {
      return [this.SmoothCurves, this.AbruptSegmentLengthChanges, this.StraightParts, this.InflectionPoints, this.LineArtCleanup, this.Circles, this.LongCurves];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Curves);
    }
  }
  ;
  Curves.initialize();
  return Curves;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"smoothcurves.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/smoothcurves.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA, PAE;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.SmoothCurves = function () {
  var Asset;
  class SmoothCurves extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.SmoothCurves";
    }
    static displayName() {
      return "Smooth curves";
    }
    static description() {
      return "学习如何计算像素以确保你的曲线尽可能平滑。";
    }
    static fixedDimensions() {
      return {
        width: 52,
        height: 40
      };
    }
    static steps() {
      var path;
      path = '/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/curves/smoothcurves';
      return [{
        goalImageUrl: "".concat(path, "-1-goal.png")
      }, {
        goalImageUrl: "".concat(path, "-2.png")
      }, {
        goalImageUrl: "".concat(path, "-2-goal.png")
      }, {
        goalImageUrl: "".concat(path, "-3-goal.png")
      }, {
        imageUrl: "".concat(path, "-4.png"),
        goalImageUrl: "".concat(path, "-4-goal.png")
      }];
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    initializeSteps() {
      var stepArea, steps;
      super.initializeSteps(...arguments);
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();

      // Step 2 and 5 introduce extra pixels, so we must allow other steps before them to complete with them present.
      steps[0].options.canCompleteWithExtraPixels = true;
      steps[3].options.canCompleteWithExtraPixels = true;

      // Step 2 needs to behave like a temporary step.
      steps[1].options.preserveCompleted = true;
      return steps[1].options.hasPixelsWhenInactive = false;
    }
  }
  ;
  SmoothCurves.initialize();
  Asset = SmoothCurves;
  SmoothCurves.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
    markup() {
      var asset, i, len, line, markup, pixelArtEvaluation, ref;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return;
      }
      markup = [];
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        // Write segment lengths next to lines.
        markup.push(...Markup.PixelArt.pointSegmentLengthTexts(line));
      }
      return markup;
    }
  };
  SmoothCurves.Curve1 = function () {
    class Curve1 extends SmoothCurves.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Curve1");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "当单个线段的长度均匀变化时，像素画曲线看起来是平滑的。";
      }
    }
    ;
    Curve1.initialize();
    return Curve1;
  }.call(this);
  SmoothCurves.Curve2Draw = function () {
    class Curve2Draw extends SmoothCurves.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Curve2Draw");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "如果长度在增加和减少之间交替，线条看起来会更锯齿状。";
      }
    }
    ;
    Curve2Draw.initialize();
    return Curve2Draw;
  }.call(this);
  SmoothCurves.Curve2Fix = function () {
    class Curve2Fix extends SmoothCurves.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Curve2Fix");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "移动像素使长度永不减少（如果长度重复或增加超过1是可以的）。";
      }
      markup() {
        var arrow, arrowBase, arrows, asset, bitmap, fromPosition, i, len, markup, markupStyle, movePixelArrowLength, toPosition;
        markup = super.markup(...arguments);
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        bitmap = asset.bitmap();
        arrows = [{
          direction: {
            x: 0,
            y: -1
          },
          targetPixel: {
            x: 11,
            y: 14
          }
        }, {
          direction: {
            x: 0,
            y: -1
          },
          targetPixel: {
            x: 15,
            y: 12
          }
        }, {
          direction: {
            x: 0,
            y: 1
          },
          targetPixel: {
            x: 20,
            y: 11
          }
        }, {
          direction: {
            x: 0,
            y: 1
          },
          targetPixel: {
            x: 24,
            y: 10
          }
        }];
        markupStyle = Markup.errorStyle();
        arrowBase = {
          arrow: {
            end: true,
            width: 0.5,
            length: 0.25
          },
          style: markupStyle
        };
        movePixelArrowLength = PAA.Tutorials.Drawing.PixelArtFundamentals.movePixelArrowLength;
        for (i = 0, len = arrows.length; i < len; i++) {
          arrow = arrows[i];
          if (!!bitmap.findPixelAtAbsoluteCoordinates(arrow.targetPixel.x, arrow.targetPixel.y)) {
            continue;
          }
          fromPosition = {
            x: arrow.targetPixel.x - arrow.direction.x + 0.5,
            y: arrow.targetPixel.y - arrow.direction.y + 0.5
          };
          toPosition = {
            x: fromPosition.x + arrow.direction.x * movePixelArrowLength,
            y: fromPosition.y + arrow.direction.y * movePixelArrowLength
          };
          markup.push({
            line: _.extend({}, arrowBase, {
              points: [fromPosition, toPosition]
            })
          });
        }
        return markup;
      }
    }
    ;
    Curve2Fix.initialize();
    return Curve2Fix;
  }.call(this);
  SmoothCurves.Curve3 = function () {
    class Curve3 extends SmoothCurves.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Curve3");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "较长的曲线会在增加和减少的长度之间变化，但会尽可能少地变化。";
      }
    }
    ;
    Curve3.initialize();
    return Curve3;
  }.call(this);
  SmoothCurves.Curve4 = function () {
    class Curve4 extends SmoothCurves.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Curve4");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "徒手曲线通常有正确的大致位置，但需要改进其线段长度以获得更平滑的结果。";
      }
    }
    ;
    Curve4.initialize();
    return Curve4;
  }.call(this);
  SmoothCurves.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
      markup() {
        var asset, i, j, len, len1, line, linePart, markup, pixelArtEvaluation, ref, ref1;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = [];
        ref = pixelArtEvaluation.layers[0].lines;
        for (i = 0, len = ref.length; i < len; i++) {
          line = ref[i];
          // Write segment lengths next to lines.
          markup.push(...Markup.PixelArt.pointSegmentLengthTexts(line));
          ref1 = line.parts;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            linePart = ref1[j];
            if (linePart instanceof PAE.Line.Part.Curve) {
              // Draw perceived curves.
              markup.push(Markup.PixelArt.perceivedCurve(linePart));
            }
          }
        }
        return markup;
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return SmoothCurves;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"circles.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/circles.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.Circles = function () {
  var Asset;
  class Circles extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.Circles";
    }
    static displayName() {
      return "Circles";
    }
    static description() {
      return "最圆润的形状在像素画中呈现出相当大的挑战并不令人惊讶。";
    }
    static fixedDimensions() {
      return {
        width: 205,
        height: 98
      };
    }
    static minClipboardScale() {
      return 1;
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 11; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/curves/circles-".concat(step, ".png"));
      }
      return results;
    }
    static markup() {
      return true;
    }
  }
  ;
  Circles.initialize();
  Asset = Circles;
  Circles.StepInstruction = function () {
    class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static assetClass() {
        return Asset;
      }
      static maxSizeNumber() {
        throw new AE.NotImplementedException("Step needs to specify up to which number to draw the sizes on top.");
      }
      markup() {
        var i, markup, number, ref, textBase;
        markup = [];
        textBase = _.extend({}, Markup.textBase(), {
          size: 8,
          lineHeight: 10
        });
        for (number = i = 1, ref = this.constructor.maxSizeNumber(); 1 <= ref ? i <= ref : i >= ref; number = 1 <= ref ? ++i : --i) {
          markup.push({
            text: _.extend({}, textBase, {
              position: {
                x: this.constructor.sizeNumberXCoordinates[number - 1],
                y: -1,
                origin: Markup.TextOriginPosition.BottomCenter
              },
              value: "".concat(number)
            })
          });
        }
        return markup;
      }
      _addCircle(markup, x, y, radius) {
        return markup.push({
          line: _.extend({}, Markup.PixelArt.intendedLineBase(), {
            arc: {
              x,
              y,
              radius
            }
          })
        });
      }
    }
    ;
    StepInstruction.sizeNumberXCoordinates = [4.5, 10, 16.5, 24, 32.5, 42, 52.5, 64, 76.5, 90, 104.5, 120, 136.5, 154, 172.5, 192];
    return StepInstruction;
  }.call(this);
  Circles.Size1 = function () {
    class Size1 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Size1");
      }
      static stepNumber() {
        return 1;
      }
      static maxSizeNumber() {
        return 1;
      }
      static message() {
        return "我们能画的最小圆就是一个像素。";
      }
      markup() {
        var arrowBase, markup, markupStyle, textBase;
        markup = super.markup(...arguments);
        markupStyle = Markup.defaultStyle();
        arrowBase = {
          arrow: {
            end: true
          },
          style: markupStyle
        };
        textBase = Markup.textBase();
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 8.5,
              y: 7
            }, {
              x: 5.5,
              y: 5.5,
              bezierControlPoints: [{
                x: 7,
                y: 7
              }, {
                x: 5.75,
                y: 5.75
              }]
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 9.5,
              y: 7,
              origin: Markup.TextOriginPosition.MiddleLeft
            },
            value: "start\nhere"
          })
        });
        return markup;
      }
    }
    ;
    Size1.initialize();
    return Size1;
  }.call(this);
  Circles.Size2 = function () {
    class Size2 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Size2");
      }
      static stepNumber() {
        return 2;
      }
      static maxSizeNumber() {
        return 2;
      }
      static message() {
        return "就像1像素圆一样，2像素的也很容易看起来像正方形。\n如果出现在合适的上下文中（例如，代表汽车的轮子），观众仍然可以看到一个圆。";
      }
    }
    ;
    Size2.initialize();
    return Size2;
  }.call(this);
  Circles.Size3 = function () {
    class Size3 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Size3");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static maxSizeNumber() {
        return 3;
      }
      static message() {
        return "3像素圆看起来更像正方形。";
      }
    }
    ;
    Size3.initialize();
    return Size3;
  }.call(this);
  Circles.Size3Alternative = function () {
    class Size3Alternative extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Size3Alternative");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static maxSizeNumber() {
        return 3;
      }
      static message() {
        return "现在我们有足够的空间来移除外部角落。";
      }
      markup() {
        var markup;
        markup = super.markup(...arguments);
        this._addCircle(markup, 4.5, 4.5, 0.25);
        this._addCircle(markup, 10, 5, 0.5);
        this._addCircle(markup, 16.5, 5.5, 1);
        return markup;
      }
    }
    ;
    Size3Alternative.initialize();
    return Size3Alternative;
  }.call(this);
  Circles.Sizes4To6 = function () {
    class Sizes4To6 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Sizes4To6");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 5;
      }
      static maxSizeNumber() {
        return 6;
      }
      static message() {
        return "当我们用这个形状画更大的圆时，它开始慢慢变得像一个带圆角的正方形。";
      }
    }
    ;
    Sizes4To6.initialize();
    return Sizes4To6;
  }.call(this);
  Circles.Size6Alternative = function () {
    class Size6Alternative extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Size6Alternative");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 6;
      }
      static maxSizeNumber() {
        return 6;
      }
      static message() {
        return "有这么多空间，我们可以引入一个像素来分隔较长的线段。";
      }
      markup() {
        var markup;
        markup = super.markup(...arguments);
        this._addCircle(markup, 16.5, 10.5, 1);
        this._addCircle(markup, 24, 11, 1.5);
        this._addCircle(markup, 32.5, 11.5, 2);
        this._addCircle(markup, 42, 12, 2.5);
        return markup;
      }
    }
    ;
    Size6Alternative.initialize();
    return Size6Alternative;
  }.call(this);
  Circles.Sizes7To10 = function () {
    class Sizes7To10 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Sizes7To10");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 7;
      }
      static maxSizeNumber() {
        return 10;
      }
      static message() {
        return "当我们进一步增大尺寸时，圆再次开始看起来像带圆角的正方形。";
      }
    }
    ;
    Sizes7To10.initialize();
    return Sizes7To10;
  }.call(this);
  Circles.Sizes9To11 = function () {
    class Sizes9To11 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Sizes9To11");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 8;
      }
      static maxSizeNumber() {
        return 11;
      }
      static message() {
        return "我们可以再引入一个像素来连接外部线段，但由于2像素创建了45°对角线，这最终看起来更像八边形。";
      }
      markup() {
        var markup;
        markup = super.markup(...arguments);
        this._addCircle(markup, 42, 20, 2.5);
        this._addCircle(markup, 52.5, 20.5, 3);
        this._addCircle(markup, 64, 21, 3.5);
        this._addCircle(markup, 76.5, 21.5, 4);
        this._addCircle(markup, 90, 22, 4.5);
        return markup;
      }
    }
    ;
    Sizes9To11.initialize();
    return Sizes9To11;
  }.call(this);
  Circles.Sizes10To14 = function () {
    class Sizes10To14 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Sizes10To14");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 9;
      }
      static maxSizeNumber() {
        return 14;
      }
      static message() {
        return "为了帮助打破对角线，我们可以将像素延伸到长度2。";
      }
      markup() {
        var markup;
        markup = super.markup(...arguments);
        this._addCircle(markup, 76.5, 33.5, 4);
        this._addCircle(markup, 90, 34, 4.5);
        this._addCircle(markup, 104.5, 34.5, 5);
        this._addCircle(markup, 120, 35, 5.5);
        return markup;
      }
    }
    ;
    Sizes10To14.initialize();
    return Sizes10To14;
  }.call(this);
  Circles.Sizes13To16 = function () {
    class Sizes13To16 extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Sizes13To16");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 10;
      }
      static maxSizeNumber() {
        return 16;
      }
      static message() {
        return "有足够的空间，我们现在可以在角度线段之间引入一个像素。";
      }
      markup() {
        var markup;
        markup = super.markup(...arguments);
        this._addCircle(markup, 90, 48, 4.5);
        this._addCircle(markup, 104.5, 48.5, 5);
        this._addCircle(markup, 120, 49, 5.5);
        this._addCircle(markup, 136.5, 49.5, 6);
        this._addCircle(markup, 154, 50, 6.5);
        return markup;
      }
    }
    ;
    Sizes13To16.initialize();
    return Sizes13To16;
  }.call(this);
  Circles.Size16Alternative = function () {
    class Size16Alternative extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Size16Alternative");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 11;
      }
      static maxSizeNumber() {
        return 16;
      }
      static message() {
        return "最后，16像素圆在斜对角处可以有两个中间像素。";
      }
      markup() {
        var markup;
        markup = super.markup(...arguments);
        this._addCircle(markup, 120, 65, 5.5);
        this._addCircle(markup, 136.5, 65.5, 6);
        this._addCircle(markup, 154, 66, 6.5);
        this._addCircle(markup, 172.5, 66.5, 7);
        this._addCircle(markup, 192, 67, 7.5);
        return markup;
      }
    }
    ;
    Size16Alternative.initialize();
    return Size16Alternative;
  }.call(this);
  Circles.Complete = function () {
    class Complete extends Circles.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static maxSizeNumber() {
        return 16;
      }
      static message() {
        return "用椭圆工具画更大的圆更容易，但对于较小的尺寸，手动绘制通常比算法产生的形状给出更美观的结果。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Circles;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"longcurves.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/longcurves.coffee         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
Atari2600 = LOI.Assets.Palette.Atari2600;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.LongCurves = function () {
  var Asset;
  class LongCurves extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.LongCurves";
    }
    static displayName() {
      return "Long curves";
    }
    static description() {
      return "大圆和其他慢慢改变方向的长曲线会遇到与不均匀对角线相同的问题。";
    }
    static fixedDimensions() {
      return {
        width: 67,
        height: 35
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 2; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/curves/longcurves-".concat(step, ".png"));
      }
      return results;
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
  }
  ;
  LongCurves.initialize();
  Asset = LongCurves;
  LongCurves.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
    markup() {
      var asset, i, len, line, markup, pixelArtEvaluation, ref;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return;
      }
      markup = [];
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        // Write segment lengths next to lines.
        markup.push(...Markup.PixelArt.pointSegmentLengthTexts(line));
      }
      return markup;
    }
  };
  LongCurves.Uneven = function () {
    class Uneven extends LongCurves.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Uneven");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "当一个圆足够大时，其弧线的较长部分将位于1:2和1:1角度之间。\n如果我们试图紧密跟随曲线，我们就不能只有单调变化的线段长度。";
      }
      markup() {
        var markup;
        markup = super.markup(...arguments);
        markup.push({
          line: {
            style: "rgb(0 0 0 / 0.25)",
            width: 0,
            arc: {
              x: 32,
              y: 32,
              radius: 28.5,
              startAngle: Math.PI,
              endAngle: Math.PI * 1.5
            }
          }
        });
        return markup;
      }
    }
    ;
    Uneven.initialize();
    return Uneven;
  }.call(this);
  LongCurves.Even = function () {
    class Even extends LongCurves.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Even");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "一些艺术家容忍这种不完美（就像不均匀对角线一样），而其他人只使用偶数对角线来构建曲线，以曲线看起来更「角形」为代价。";
      }
    }
    ;
    Even.initialize();
    return Even;
  }.call(this);
  LongCurves.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "在实践中，这些选择是艺术过程的一部分，并导致不同类型的风格化。";
      }
      constructor() {
        super(...arguments);
        this.markupType = new ReactiveField(this.constructor.MarkupType.None);
      }
      onActivate() {
        super.onActivate(...arguments);
        this.markupType(this.constructor.MarkupType.None);
        return this._changeMarkupTypeInterval = Meteor.setInterval(() => {
          var currentMarkupTypeIndex, markupTypes;
          markupTypes = _.keys(this.constructor.MarkupType);
          currentMarkupTypeIndex = markupTypes.indexOf(this.markupType());
          return this.markupType(markupTypes[(currentMarkupTypeIndex + 1) % 4]);
        }, 2000);
      }
      onDeactivate() {
        super.onDeactivate(...arguments);
        return Meteor.clearInterval(this._changeMarkupTypeInterval);
      }
      markup() {
        var asset, curve, i, j, k, l, len, len1, len2, len3, line, lineBase, markup, markupType, perceivedLineMarkup, pixelArtEvaluation, ref, ref1, ref2, ref3, x;
        markupType = this.markupType();
        if (markupType === this.constructor.MarkupType.None) {
          return;
        }
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = [];
        switch (markupType) {
          case this.constructor.MarkupType.IntendedLine:
            lineBase = Markup.PixelArt.perceivedLineBase();
            ref = [32, 64];
            for (i = 0, len = ref.length; i < len; i++) {
              x = ref[i];
              markup.push({
                line: _.extend({}, lineBase, {
                  arc: {
                    x: x,
                    y: 32,
                    radius: 28.5,
                    startAngle: Math.PI,
                    endAngle: Math.PI * 1.5
                  }
                })
              });
            }
            break;
          case this.constructor.MarkupType.PerceivedLine:
            ref1 = pixelArtEvaluation.layers[0].lines;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              line = ref1[j];
              markup.push(Markup.PixelArt.segmentedPerceivedLine(line));
            }
            break;
          case this.constructor.MarkupType.Curvature:
            ref2 = pixelArtEvaluation.layers[0].lines;
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              line = ref2[k];
              ref3 = line.curvatureCurveParts;
              for (l = 0, len3 = ref3.length; l < len3; l++) {
                curve = ref3[l];
                perceivedLineMarkup = Markup.PixelArt.perceivedCurve(curve);
                perceivedLineMarkup.line.arrow = {
                  start: true
                };
                perceivedLineMarkup.line.points = Markup.offsetPoints(perceivedLineMarkup.line.points, curve.clockwise ? -2 : 2);
                markup.push(perceivedLineMarkup);
              }
            }
        }
        return markup;
      }
    }
    ;
    Complete.initialize();
    Complete.MarkupType = {
      None: 'None',
      IntendedLine: 'IntendedLine',
      PerceivedLine: 'PerceivedLine',
      Curvature: 'Curvature'
    };
    return Complete;
  }.call(this);
  return LongCurves;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"abruptsegmentlengthchanges":{"abruptsegmentlengthchanges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/abruptsegmentlengthchange //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, PAE, PixelArtFundamentals;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PixelArtFundamentals = PAA.Tutorials.Drawing.PixelArtFundamentals;
PixelArtFundamentals.Jaggies.Curves.AbruptSegmentLengthChanges = function () {
  class AbruptSegmentLengthChanges extends PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.AbruptSegmentLengthChanges";
    }
    static displayName() {
      return "Abrupt segment length changes";
    }
    static description() {
      return "使用像素画评估来分析曲线线段长度何时变化太快。";
    }
    static fixedDimensions() {
      return {
        width: 30,
        height: 25
      };
    }
    static resources() {
      var path;
      path = '/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/curves/abruptsegmentlengthchanges';
      return {
        line1: {
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-1-goal.png"))
        },
        line2: {
          pixels: new this.Resource.ImagePixels("".concat(path, "-2.png")),
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-2-goal.png"))
        },
        line3: {
          pixels: new this.Resource.ImagePixels("".concat(path, "-3.png")),
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-3-goal.png"))
        },
        paths: new this.Resource.SvgPaths("".concat(path, ".svg"))
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds, svgPaths;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);
      svgPaths = this.resources.paths.svgPaths();

      // Line 1: Step 1 requires you to draw the goal pixels based on the first path.
      new this.constructor.Steps.DrawLine(this, stepArea, {
        goalPixels: this.resources.line1.goalPixels,
        svgPaths: [svgPaths[2]],
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 2 requires you to open the evaluation paper.
      new this.constructor.Steps.OpenEvaluationPaper(this, stepArea);

      // Step 3 requires you to hover over the curve.
      new this.constructor.Steps.HoverOverTheCurve(this, stepArea);

      // Step 4 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);
      // Line 2: Step 5 requires you to draw the second path.
      new this.constructor.PixelsWithPathsStep(this, stepArea, {
        goalPixels: this.resources.line2.pixels,
        svgPaths: [svgPaths[1]],
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 6 requires you to open the evaluation paper.
      new PixelArtFundamentals.OpenEvaluationPaper(this, stepArea);

      // Step 7 requires you to open the smooth curves breakdown.
      new PixelArtFundamentals.OpenEvaluationCriterion(this, stepArea, {
        criterion: PAE.Criteria.SmoothCurves
      });

      // Step 8 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Step 9 requires you to fix the line.
      new PixelArtFundamentals.Jaggies.FixLineStep(this, stepArea, {
        previousPixels: this.resources.line2.pixels,
        goalPixels: this.resources.line2.goalPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Line 3: Step 10 requires you to draw the third path.
      new this.constructor.PixelsWithPathsStep(this, stepArea, {
        goalPixels: this.resources.line3.pixels,
        svgPaths: [svgPaths[0]],
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 11 requires you to open the evaluation paper.
      new PixelArtFundamentals.OpenEvaluationPaper(this, stepArea);

      // Step 12 requires you to open the smooth curves breakdown.
      new PixelArtFundamentals.OpenEvaluationCriterion(this, stepArea, {
        criterion: PAE.Criteria.SmoothCurves
      });

      // Step 13 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Step 14 requires you to fix the line.
      return new PixelArtFundamentals.Jaggies.FixLineStep(this, stepArea, {
        previousPixels: this.resources.line3.pixels,
        goalPixels: this.resources.line3.goalPixels,
        hasPixelsWhenInactive: false
      });
    }
  }
  ;
  AbruptSegmentLengthChanges.initialize();
  return AbruptSegmentLengthChanges;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/abruptsegmentlengthchange //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AbruptSegmentLengthChanges, LOI, PAA, PAE, TutorialBitmap;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
AbruptSegmentLengthChanges = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.AbruptSegmentLengthChanges;
AbruptSegmentLengthChanges.Steps = function () {
  class Steps {}
  ;
  Steps.DrawLine = class DrawLine extends TutorialBitmap.PixelsWithPathsStep {
    completed() {
      if (!super.completed(...arguments)) {
        return;
      }

      // Wait until the line has stopped drawing, otherwise adding pixel art
      // evaluation properties will happen in-between the stroke and get lost.
      return !this.tutorialBitmap.bitmap().partialAction;
    }
  };
  Steps.OpenEvaluationPaper = class OpenEvaluationPaper extends PAA.Tutorials.Drawing.PixelArtFundamentals.OpenEvaluationPaper {
    activate() {
      var bitmap, pixelArtEvaluation, updatePropertyAction;
      super.activate(...arguments);
      bitmap = this.tutorialBitmap.bitmap();
      pixelArtEvaluation = {
        allowedCriteria: [PAE.Criteria.SmoothCurves],
        smoothCurves: {
          abruptSegmentLengthChanges: {}
        }
      };
      updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.tutorialBitmap.constructor.id(), bitmap, 'pixelArtEvaluation', pixelArtEvaluation);
      return bitmap.executeAction(updatePropertyAction);
    }
  };
  Steps.HoverOverTheCurve = function () {
    class HoverOverTheCurve extends TutorialBitmap.EphemeralStep {
      constructor() {
        super(...arguments);
        this.timeHovered = 0;
      }
      completed() {
        var drawingEditor, hoveredPixel, pixelArtEvaluation, pixelArtEvaluationView;
        if (this._solved()) {
          // Note: we can't rely on the parent implementation since it will fail due to there being extra pixels.
          return true;
        }
        if (!(drawingEditor = this.getEditor())) {
          return this.stopCountingTime();
        }
        if (!(pixelArtEvaluationView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return this.stopCountingTime();
        }
        if (!(hoveredPixel = pixelArtEvaluationView.hoveredPixel())) {
          return this.stopCountingTime();
        }
        pixelArtEvaluation = pixelArtEvaluationView.pixelArtEvaluation();
        if (!pixelArtEvaluation.getLinePartsAt(hoveredPixel.x, hoveredPixel.y).length) {
          return this.stopCountingTime();
        }
        this.countTime();

        // We return false since we'll complete this step by solving it which will resolve in the base completed.
        return false;
      }
      stopCountingTime() {
        this.timeHovered = 0;
        return Meteor.clearTimeout(this._countTimeout);
      }
      countTime() {
        Meteor.clearTimeout(this._countTimeout);
        return this._countTimeout = Meteor.setTimeout(() => {
          this.timeHovered += 0.1;
          if (this.timeHovered >= this.constructor.timeToHover) {
            return this.solve();
          } else {
            return this.countTime();
          }
        }, 100);
      }
    }
    ;
    HoverOverTheCurve.timeToHover = 1.2;
    return HoverOverTheCurve;
  }.call(this);
  return Steps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/abruptsegmentlengthchange //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AbruptSegmentLengthChanges, InstructionsSystem, InterfaceMarking, LOI, Markup, PAA, PAE;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;

// Note: We can't call this Instructions since we introduce a namespace class called that below.
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
AbruptSegmentLengthChanges = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.AbruptSegmentLengthChanges;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
AbruptSegmentLengthChanges.Instructions = function () {
  class Instructions {}
  ;
  Instructions.StepInstruction = function () {
    class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static assetClass() {
        return AbruptSegmentLengthChanges;
      }
      static getPixelArtEvaluation() {
        var drawingEditor;
        drawingEditor = this.getEditor();
        return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      }
      movePixelMarkup(x, y) {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return [];
        }
        return PAA.Tutorials.Drawing.PixelArtFundamentals.movePixelMarkup(asset, x, y, 0, 1);
      }
      moveFirstPixelMarkup() {
        return this.movePixelMarkup(9, 11);
      }
      moveSecondPixelMarkup() {
        return this.movePixelMarkup(11, 4);
      }
      categoryMarkup(category) {
        var markupStyle;
        markupStyle = InterfaceMarking.defaultStyle();
        return [{
          interface: {
            selector: ".pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation .category.".concat(category),
            delay: 1,
            bounds: {
              x: -5,
              y: -5,
              width: 220,
              height: 30
            },
            markings: [{
              rectangle: {
                strokeStyle: markupStyle,
                x: -2.5,
                y: -0.5,
                width: 199,
                height: 9
              }
            }]
          }
        }];
      }
    }
    ;

    // The amount of time before we show instructions to the user after a new UI element is introduced.
    StepInstruction.uiRevealDelayDuration = 3;

    // The amount of time before we show instructions when a new line is introduced.
    StepInstruction.newLineDelayDuration = 5;
    return StepInstruction;
  }.call(this);
  Instructions.DrawLine = function () {
    class DrawLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".DrawLine");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "紧密跟随预期线条画曲线。使其像素完美。";
      }
    }
    ;
    DrawLine.initialize();
    return DrawLine;
  }.call(this);
  Instructions.OpenEvaluationPaper = function () {
    class OpenEvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".OpenEvaluationPaper");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "现在你可以打开像素画评估纸来分析曲线。";
      }
      markup() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereMarkup();
      }
    }
    ;
    OpenEvaluationPaper.initialize();
    return OpenEvaluationPaper;
  }.call(this);
  Instructions.ReopenEvaluationPaper = function () {
    class ReopenEvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".ReopenEvaluationPaper");
      }
      static stepNumbers() {
        return [3, 7, 8, 12];
      }
      static message() {
        return "打开像素画评估纸以继续。";
      }
      static activeConditions() {
        var drawingEditor, pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not open.
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        return !pixelArtEvaluation.active();
      }
      static priority() {
        return 2;
      }
    }
    ;
    ReopenEvaluationPaper.initialize();
    return ReopenEvaluationPaper;
  }.call(this);
  Instructions.AnalyzeTheCurve = function () {
    class AnalyzeTheCurve extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".AnalyzeTheCurve");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "要查看曲线线段的长度，悬停在线条上。";
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      onActivate() {
        var camera, drawingEditor, pixelCanvas;
        super.onActivate(...arguments);
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo({
          x: 15,
          y: 20
        }, 1);
        return camera.scaleTo(8, 1);
      }
      markup() {
        var arrowBase, markup, textBase;
        markup = [];
        arrowBase = Markup.arrowBase();
        textBase = Markup.textBase();
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 19.5,
              y: 16.5
            }, {
              x: 18.5,
              y: 18.5,
              bezierControlPoints: [{
                x: 19.5,
                y: 18
              }, {
                x: 18.75,
                y: 18.25
              }]
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 19.5,
              y: 16,
              origin: Markup.TextOriginPosition.BottomCenter
            },
            value: "hover here"
          })
        });
        return markup;
      }
    }
    ;
    AnalyzeTheCurve.initialize();
    return AnalyzeTheCurve;
  }.call(this);
  Instructions.FirstLineAnalysis = function () {
    class FirstLineAnalysis extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".FirstLineAnalysis");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "这条曲线的线段长度逐渐增加和减少，产生平滑的外观。\n\n关闭评估纸并画下一条线。";
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
    }
    ;
    FirstLineAnalysis.initialize();
    return FirstLineAnalysis;
  }.call(this);
  Instructions.DrawSecondLine = function () {
    class DrawSecondLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".DrawSecondLine");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "画一条紧密跟随预期线条的像素完美线条。";
      }
      static delayDuration() {
        return this.newLineDelayDuration;
      }
    }
    ;
    DrawSecondLine.initialize();
    return DrawSecondLine;
  }.call(this);
  Instructions.OpenEvaluationPaperSecondLine = function () {
    class OpenEvaluationPaperSecondLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".OpenEvaluationPaperSecondLine");
      }
      static stepNumbers() {
        return [6, 11];
      }
      static message() {
        return "打开评估纸并分析线段长度。";
      }
    }
    ;
    OpenEvaluationPaperSecondLine.initialize();
    return OpenEvaluationPaperSecondLine;
  }.call(this);
  Instructions.OpenSmoothCurves = class OpenSmoothCurves extends Instructions.StepInstruction {
    static displaySide() {
      return InstructionsSystem.DisplaySide.Top;
    }
    static delayDuration() {
      return this.uiRevealDelayDuration;
    }
    static activeConditions() {
      var drawingEditor, pixelArtEvaluation;
      if (!super.activeConditions(...arguments)) {
        return;
      }

      // Show if the pixel art evaluation paper is not on the smooth curves criterion.
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      if (!pixelArtEvaluation.active()) {
        return;
      }
      return pixelArtEvaluation.activeCriterion() !== PAE.Criteria.SmoothCurves;
    }
    markup() {
      return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionMarkup('.smooth-curves');
    }
  };
  Instructions.OpenSmoothCurvesSecondLine = function () {
    class OpenSmoothCurvesSecondLine extends Instructions.OpenSmoothCurves {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".OpenSmoothCurvesSecondLine");
      }
      static stepNumber() {
        return 7;
      }
      static message() {
        return "这条曲线的线段可以改进。\n\n点击平滑曲线标准以继续。";
      }
      onActivate() {
        var camera, drawingEditor, pixelCanvas;
        super.onActivate(...arguments);
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo({
          x: 15,
          y: 12
        }, 1);
        return camera.scaleTo(8, 1);
      }
    }
    ;
    OpenSmoothCurvesSecondLine.initialize();
    return OpenSmoothCurvesSecondLine;
  }.call(this);
  Instructions.ReopenSmoothCurves = function () {
    class ReopenSmoothCurves extends Instructions.OpenSmoothCurves {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".ReopenSmoothCurves");
      }
      static stepNumbers() {
        return [8, 13];
      }
      static message() {
        return "点击平滑曲线标准以继续。";
      }
      static priority() {
        return 1;
      }
    }
    ;
    ReopenSmoothCurves.initialize();
    return ReopenSmoothCurves;
  }.call(this);
  Instructions.MajorAbruptSegmentLengthChange = function () {
    class MajorAbruptSegmentLengthChange extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".MajorAbruptSegmentLengthChange");
      }
      static stepNumber() {
        return 8;
      }
      static activeDisplayState() {
        return InstructionsSystem.DisplayState.Open;
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      static message() {
        return "线段长度有从2→6的突变，因为之前有重复的2（2-2-6）。\n大的跳跃总是可以通过将像素从较长的线段转移到较短的线段来改进（2-3-5）。\n\n关闭评估纸并平滑曲线。";
      }
      static priority() {
        return 1;
      }
      markup() {
        var asset, linePart, markup, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        if (!(linePart = pixelArtEvaluation.getLinePartsAt(3, 15)[0])) {
          return;
        }
        markup = [];
        markup.push(...this.moveFirstPixelMarkup());
        markup.push(...Markup.PixelArt.pointSegmentLengthTexts(linePart));
        return markup;
      }
    }
    ;
    MajorAbruptSegmentLengthChange.initialize();
    return MajorAbruptSegmentLengthChange;
  }.call(this);
  Instructions.SecondCurveFix = function () {
    class SecondCurveFix extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".SecondCurveFix");
      }
      static stepNumber() {
        return 9;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return InstructionsSystem.DisplayState.Hidden;
      }
      markup() {
        if (!this.getActiveAsset()) {
          return;
        }
        return this.moveFirstPixelMarkup();
      }
    }
    ;
    SecondCurveFix.initialize();
    return SecondCurveFix;
  }.call(this);
  Instructions.OpenSmoothCurvesThirdLine = function () {
    class OpenSmoothCurvesThirdLine extends Instructions.OpenSmoothCurves {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".OpenSmoothCurvesThirdLine");
      }
      static stepNumber() {
        return 12;
      }
      static message() {
        return "点击平滑曲线标准以继续。";
      }
      onActivate() {
        var camera, drawingEditor, pixelCanvas;
        super.onActivate(...arguments);
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo({
          x: 15,
          y: 5
        }, 1);
        return camera.scaleTo(8, 1);
      }
    }
    ;
    OpenSmoothCurvesThirdLine.initialize();
    return OpenSmoothCurvesThirdLine;
  }.call(this);
  Instructions.MinorAbruptSegmentLengthChange = function () {
    class MinorAbruptSegmentLengthChange extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".MinorAbruptSegmentLengthChange");
      }
      static stepNumber() {
        return 13;
      }
      static displaySide() {
        return InstructionsSystem.DisplaySide.Top;
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      static message() {
        return "对于较长的线段和较小的长度变化，这只是个小问题。\n它仍然可以用同样的方式改进。\n\n关闭评估纸并平滑曲线。";
      }
      markup() {
        var asset, linePart, markup, pixelArtEvaluation;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        if (!(linePart = pixelArtEvaluation.getLinePartsAt(3, 7)[0])) {
          return;
        }
        markup = [];
        markup.push(...this.moveSecondPixelMarkup());
        markup.push(...Markup.PixelArt.pointSegmentLengthTexts(linePart));
        return markup;
      }
    }
    ;
    MinorAbruptSegmentLengthChange.initialize();
    return MinorAbruptSegmentLengthChange;
  }.call(this);
  Instructions.ThirdCurveFix = function () {
    class ThirdCurveFix extends Instructions.StepInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".ThirdCurveFix");
      }
      static stepNumber() {
        return 14;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return InstructionsSystem.DisplayState.Hidden;
      }
      markup() {
        return this.moveSecondPixelMarkup();
      }
    }
    ;
    ThirdCurveFix.initialize();
    return ThirdCurveFix;
  }.call(this);
  Instructions.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(AbruptSegmentLengthChanges.id(), ".Complete");
      }
      static assetClass() {
        return AbruptSegmentLengthChanges;
      }
      static message() {
        return "做得好！这些曲线已经尽可能平滑了，但要知道如果遵循精确的形状或放置更重要的话，拥有尽可能平滑的曲线可能是不必要的。\n用你的艺术感觉来选择评估是否适合所需的曲线。";
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"straightparts":{"straightparts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/straightparts/straightpar //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, PAE;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.StraightParts = function () {
  class StraightParts extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.StraightParts";
    }
    static displayName() {
      return "Straight parts";
    }
    static description() {
      return "画长曲线时，有些部分可能变得比必要的更直。";
    }
    static fixedDimensions() {
      return {
        width: 40,
        height: 28
      };
    }
    static resources() {
      var path;
      path = '/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/curves/straightparts';
      return {
        line1: {
          pixels: new this.Resource.ImagePixels("".concat(path, "-1.png")),
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-1-goal.png"))
        },
        line2: {
          pixels: new this.Resource.ImagePixels("".concat(path, "-2.png")),
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-2-goal.png"))
        },
        line3: {
          pixels: new this.Resource.ImagePixels("".concat(path, "-3.png")),
          goalPixels: new this.Resource.ImagePixels("".concat(path, "-3-goal.png"))
        },
        paths: new this.Resource.SvgPaths("".concat(path, ".svg"))
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          allowedCriteria: [PAE.Criteria.SmoothCurves],
          smoothCurves: {
            ignoreMostlyStraightLines: false,
            straightParts: {}
          }
        }
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds, svgPaths;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);
      svgPaths = this.resources.paths.svgPaths();

      // Step 1 requires you to draw the first path and open the smooth curves breakdown.
      new this.constructor.Steps.DrawAndAnalyze(this, stepArea, {
        goalPixels: this.resources.line1.pixels,
        svgPaths: [svgPaths[0]],
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 2 requires you to close the evaluation paper.
      new PAA.Tutorials.Drawing.PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Step 3 requires you to fix the line.
      new PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.FixLineStep(this, stepArea, {
        previousPixels: this.resources.line1.pixels,
        goalPixels: this.resources.line1.goalPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 4 requires you to draw the second path.
      new this.constructor.PixelsWithPathsStep(this, stepArea, {
        goalPixels: this.resources.line2.pixels,
        svgPaths: [svgPaths[1]],
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 5 requires you to fix the line.
      new PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.FixLineStep(this, stepArea, {
        previousPixels: this.resources.line2.pixels,
        goalPixels: this.resources.line2.goalPixels,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 6 requires you to draw the third and fourth paths and open the smooth curves breakdown.
      new this.constructor.PixelsWithPathsStep(this, stepArea, {
        goalPixels: this.resources.line3.pixels,
        svgPaths: [svgPaths[2], svgPaths[3]],
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 13 requires you to close the evaluation paper.
      new PAA.Tutorials.Drawing.PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Step 14 requires you to fix the line.
      return new PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.FixLineStep(this, stepArea, {
        previousPixels: this.resources.line3.pixels,
        goalPixels: this.resources.line3.goalPixels,
        hasPixelsWhenInactive: false
      });
    }
  }
  ;
  StraightParts.initialize();
  return StraightParts;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/straightparts/steps.coffe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, PAE, StraightParts, TutorialBitmap;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
StraightParts = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.StraightParts;
StraightParts.Steps = function () {
  class Steps {}
  ;
  Steps.DrawAndAnalyze = class DrawAndAnalyze extends TutorialBitmap.PixelsWithPathsStep {
    completed() {
      var drawingEditor, pixelArtEvaluation;
      if (!super.completed(...arguments)) {
        return;
      }
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      return pixelArtEvaluation.activeCriterion() === PAE.Criteria.SmoothCurves;
    }
  };
  return Steps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/straightparts/instruction //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, InstructionsSystem, LOI, Markup, PAA, PAE, StraightParts, TextOriginPosition;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;

// Note: We can't call this Instructions since we introduce a namespace class called that below.
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
StraightParts = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.StraightParts;
TextOriginPosition = PAA.Practice.Helpers.Drawing.Markup.TextOriginPosition;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
StraightParts.Instructions = function () {
  class Instructions {}
  ;
  Instructions.StepInstruction = function () {
    class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static assetClass() {
        return StraightParts;
      }
      static getPixelArtEvaluation() {
        var drawingEditor;
        drawingEditor = this.getEditor();
        return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      }
      translateAndScaleTo(x, y, scale) {
        var camera, drawingEditor, pixelCanvas;
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo({
          x,
          y
        }, 1);
        return camera.scaleTo(scale, 1);
      }
      openEvaluationPaper(x, y, scale) {
        var pixelArtEvaluation;
        pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
        pixelArtEvaluation.activate(PAE.Criteria.SmoothCurves);
        return this.translateAndScaleTo(x, y, scale);
      }
      movePixelMarkup(x, y, dx, dy) {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return [];
        }
        return PAA.Tutorials.Drawing.PixelArtFundamentals.movePixelMarkup(asset, x, y, dx, dy);
      }
      perceivedLinesMarkup() {
        var asset, bezierControlPoint, element, i, j, k, l, len, len1, len2, len3, line, markup, offsetPerceivedLineMarkup, pixelArtEvaluation, point, ref, ref1, ref2;
        if (!(asset = this.getActiveAsset())) {
          return [];
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return [];
        }
        markup = [];
        ref = pixelArtEvaluation.layers[0].lines;

        // Add perceived lines.
        for (i = 0, len = ref.length; i < len; i++) {
          line = ref[i];
          offsetPerceivedLineMarkup = Markup.PixelArt.perceivedLine(line);
          markup.push(...offsetPerceivedLineMarkup);
          for (j = 0, len1 = offsetPerceivedLineMarkup.length; j < len1; j++) {
            element = offsetPerceivedLineMarkup[j];
            element.line.width = 2;
            ref1 = element.line.points;
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              point = ref1[k];
              point.x += 12;
              if (point.bezierControlPoints) {
                ref2 = point.bezierControlPoints;
                for (l = 0, len3 = ref2.length; l < len3; l++) {
                  bezierControlPoint = ref2[l];
                  bezierControlPoint.x += 12;
                }
              }
            }
          }
        }
        return markup;
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;

    // The amount of time before we show instructions to the user after a new UI element is introduced.
    StepInstruction.uiRevealDelayDuration = 3;

    // The amount of time before we show instructions when a new line is introduced.
    StepInstruction.newLineDelayDuration = 5;
    return StepInstruction;
  }.call(this);
  Instructions.DrawFirstLine = function () {
    class DrawFirstLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".DrawFirstLine");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "紧密跟随预期线条画曲线，完成后打开平滑曲线分解。";
      }
      markup() {
        var pixelArtEvaluation;
        // Show only on the pixel art evaluation overview.
        if (!(pixelArtEvaluation = this.constructor.getPixelArtEvaluation())) {
          return [];
        }
        if (!pixelArtEvaluation.active()) {
          return [];
        }
        if (pixelArtEvaluation.activeCriterion()) {
          return [];
        }
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionMarkup('.smooth-curves');
      }
    }
    ;
    DrawFirstLine.initialize();
    return DrawFirstLine;
  }.call(this);
  Instructions.AnalyzeFirstLine = function () {
    class AnalyzeFirstLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".AnalyzeFirstLine");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "直线部分是画平滑曲线时要考虑的另一个标准。\n\n关闭评估纸看看为什么。";
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.translateAndScaleTo(20, 14, 4);
      }
    }
    ;
    AnalyzeFirstLine.initialize();
    return AnalyzeFirstLine;
  }.call(this);
  Instructions.FixFirstLine = function () {
    class FixFirstLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".FixFirstLine");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "预期线条和感知线条之间有差异。\n由于中间线段的长度，像素画线条在中间显得平坦。\n我们可以向外推动像素来修复这个问题。";
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.translateAndScaleTo(20, 20, 5);
      }
      markup() {
        var asset, i, intendedLine, intendedLineColor, intendedLineStyle, markup, palette, pixelArtEvaluation, pixelColor, pixelStyle, textBase, thickIntendedLine, y;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        markup = [];
        for (y = i = 10; i <= 17; y = ++i) {
          markup.push(...this.movePixelMarkup(18, y, -1, 0));
        }
        textBase = Markup.textBase();
        palette = LOI.palette();
        pixelColor = palette.color(Atari2600.hues.gray, 0);
        pixelStyle = "#".concat(pixelColor.getHexString());
        intendedLineColor = palette.color(Atari2600.hues.gray, 3);
        intendedLineStyle = "#".concat(intendedLineColor.getHexString());

        // Add titles.
        markup.push({
          text: _.extend({}, textBase, {
            value: "INTENDED",
            position: {
              x: 8,
              y: 1,
              origin: TextOriginPosition.BottomCenter
            },
            style: intendedLineStyle
          })
        }, {
          text: _.extend({}, textBase, {
            value: "ACTUAL",
            position: {
              x: 20,
              y: 1,
              origin: TextOriginPosition.BottomCenter
            },
            style: pixelStyle
          })
        }, {
          text: _.extend({}, textBase, {
            value: "PERCEIVED",
            position: {
              x: 32,
              y: 1,
              origin: TextOriginPosition.BottomCenter
            }
          })
        });

        // Add intended lines.
        intendedLine = {
          line: {
            points: [{
              x: 11,
              y: 3
            }, {
              x: 6,
              y: 14,
              bezierControlPoints: [{
                x: 8,
                y: 4
              }, {
                x: 6,
                y: 6
              }]
            }, {
              x: 11,
              y: 25,
              bezierControlPoints: [{
                x: 6,
                y: 22
              }, {
                x: 8,
                y: 24
              }]
            }]
          }
        };
        thickIntendedLine = _.cloneDeep(intendedLine);
        _.extend(intendedLine.line, {
          style: intendedLineStyle,
          width: 0
        });
        _.extend(thickIntendedLine.line, {
          style: pixelStyle,
          absoluteWidth: 1,
          cap: 'square'
        });
        markup.push(thickIntendedLine);
        markup.push(intendedLine);

        // Add perceived lines.
        markup.push(...this.perceivedLinesMarkup());
        return markup;
      }
    }
    ;
    FixFirstLine.initialize();
    return FixFirstLine;
  }.call(this);
  Instructions.DrawSecondLine = function () {
    class DrawSecondLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".DrawSecondLine");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "紧密跟随预期线条画左边的曲线。";
      }
    }
    ;
    DrawSecondLine.initialize();
    return DrawSecondLine;
  }.call(this);
  Instructions.FixSecondLine = function () {
    class FixSecondLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".FixSecondLine");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "这次我们可以通过缩短末端的 长线段来平滑线条。";
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper(20, 14, 4);
      }
      markup() {
        var markup;
        markup = [];
        markup.push(...this.movePixelMarkup(9, 6, 1, 0));
        markup.push(...this.movePixelMarkup(8, 8, 1, 0));
        markup.push(...this.movePixelMarkup(8, 9, 1, 0));
        markup.push(...this.movePixelMarkup(8, 18, -1, 0));
        markup.push(...this.movePixelMarkup(8, 19, -1, 0));
        markup.push(...this.movePixelMarkup(7, 21, -1, 0));
        return markup;
      }
    }
    ;
    FixSecondLine.initialize();
    return FixSecondLine;
  }.call(this);
  Instructions.DrawThirdLine = function () {
    class DrawThirdLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".DrawThirdLine");
      }
      static stepNumber() {
        return 6;
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
      static message() {
        return "画最后的曲线。";
      }
    }
    ;
    DrawThirdLine.initialize();
    return DrawThirdLine;
  }.call(this);
  Instructions.AnalyzeThirdLine = function () {
    class AnalyzeThirdLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".AnalyzeThirdLine");
      }
      static stepNumber() {
        return 7;
      }
      static message() {
        return "线条也可能以太长或太多重复的线段结束。\n这很少是个问题，但可以用类似的方式处理。";
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.openEvaluationPaper(20, 14, 4);
      }
    }
    ;
    AnalyzeThirdLine.initialize();
    return AnalyzeThirdLine;
  }.call(this);
  Instructions.FixThirdLine = function () {
    class FixThirdLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".FixThirdLine");
      }
      static stepNumber() {
        return 8;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return InstructionsSystem.DisplayState.Hidden;
      }
      markup() {
        var markup;
        markup = [];
        markup.push(...this.movePixelMarkup(31, 6, 1, 0));
        markup.push(...this.movePixelMarkup(32, 8, 1, 0));
        markup.push(...this.movePixelMarkup(28, 18, 1, 0));
        markup.push(...this.movePixelMarkup(28, 19, 1, 0));
        markup.push(...this.movePixelMarkup(29, 21, 1, 0));
        return markup;
      }
    }
    ;
    FixThirdLine.initialize();
    return FixThirdLine;
  }.call(this);
  Instructions.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(StraightParts.id(), ".Complete");
      }
      static assetClass() {
        return StraightParts;
      }
      static message() {
        return "这些线条现在流畅了。\n然而，当预期线条确实包含直线部分时，应该忽略直线部分标准。\n关键是要捕捉原始意图。";
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"inflectionpoints":{"inflectionpoints.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/inflectionpoints/inflecti //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, PAE, PixelArtFundamentals;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PixelArtFundamentals = PAA.Tutorials.Drawing.PixelArtFundamentals;
PixelArtFundamentals.Jaggies.Curves.InflectionPoints = function () {
  class InflectionPoints extends PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.InflectionPoints";
    }
    static displayName() {
      return "Inflection points";
    }
    static description() {
      return "分析曲线改变方向的点。";
    }
    static fixedDimensions() {
      return {
        width: 42,
        height: 30
      };
    }
    static resources() {
      var path;
      path = '/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/curves/inflectionpoints';
      return {
        start: new this.Resource.ImagePixels("".concat(path, "-1.png")),
        pixelPerfect: new this.Resource.ImagePixels("".concat(path, "-2.png")),
        smooth: new this.Resource.ImagePixels("".concat(path, "-3.png"))
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true,
        pixelArtEvaluation: {
          allowedCriteria: [PAE.Criteria.SmoothCurves],
          smoothCurves: {
            inflectionPoints: {}
          }
        }
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);

      // Step 1 requires you to clean the doubles.
      new this.constructor.PixelsStep(this, stepArea, {
        startPixels: this.resources.start,
        goalPixels: this.resources.pixelPerfect,
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });

      // Step 2 requires you to open the smooth curves breakdown.
      new PixelArtFundamentals.OpenEvaluationCriterion(this, stepArea, {
        criterion: PAE.Criteria.SmoothCurves
      });

      // Step 3 requires you to clean the doubles and open the Smooth curves breakdown.
      new this.constructor.Steps.AnalyzeInflectionPoints(this, stepArea);

      // Step 4 requires you to close the evaluation paper.
      new PixelArtFundamentals.CloseEvaluationPaper(this, stepArea);

      // Step 5 requires you to fix the line.
      return new PixelArtFundamentals.Jaggies.FixLineStep(this, stepArea, {
        previousPixels: this.resources.pixelPerfect,
        goalPixels: this.resources.smooth,
        hasPixelsWhenInactive: false
      });
    }
  }
  ;
  InflectionPoints.initialize();
  return InflectionPoints;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/inflectionpoints/steps.co //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var InflectionPoints, LOI, PAA, PAE, TutorialBitmap;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
InflectionPoints = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.InflectionPoints;
InflectionPoints.Steps = function () {
  class Steps {}
  ;
  Steps.AnalyzeInflectionPoints = function () {
    class AnalyzeInflectionPoints extends TutorialBitmap.EphemeralStep {
      completed() {
        var drawingEditor, pixelArtEvaluationView;
        if (this._solved()) {
          // Note: we can't rely on the parent implementation since it will fail due to there being extra pixels.
          return true;
        }
        if (!(drawingEditor = this.getEditor())) {
          return this.stopCountingTime();
        }
        if (!(pixelArtEvaluationView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return this.stopCountingTime();
        }
        if (pixelArtEvaluationView.hoveredFilterValue() !== PAE.Subcriteria.SmoothCurves.InflectionPoints) {
          return this.stopCountingTime();
        }
        this.countTime();

        // We return false since we'll complete this step by solving it which will resolve in the base completed.
        return false;
      }
      stopCountingTime() {
        this.timeHovered = 0;
        return Meteor.clearTimeout(this._countTimeout);
      }
      countTime() {
        Meteor.clearTimeout(this._countTimeout);
        return this._countTimeout = Meteor.setTimeout(() => {
          this.timeHovered += 0.1;
          if (this.timeHovered >= this.constructor.timeToHover) {
            return this.solve();
          } else {
            return this.countTime();
          }
        }, 100);
      }
    }
    ;
    AnalyzeInflectionPoints.timeToHover = 1.2;
    return AnalyzeInflectionPoints;
  }.call(this);
  return Steps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/inflectionpoints/instruct //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, InflectionPoints, InstructionsSystem, InterfaceMarking, LOI, Markup, PAA, PAE, TextOriginPosition;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;

// Note: We can't call this Instructions since we introduce a namespace class called that below.
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
InflectionPoints = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.InflectionPoints;
TextOriginPosition = PAA.Practice.Helpers.Drawing.Markup.TextOriginPosition;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
InflectionPoints.Instructions = function () {
  class Instructions {}
  ;
  Instructions.StepInstruction = function () {
    class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static assetClass() {
        return InflectionPoints;
      }
      static getPixelArtEvaluation() {
        var drawingEditor;
        drawingEditor = this.getEditor();
        return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      }
      translateAndScaleTo(x, y, scale) {
        var camera, drawingEditor, pixelCanvas;
        drawingEditor = this.getEditor();
        pixelCanvas = drawingEditor.interface.getEditorForActiveFile();
        camera = pixelCanvas.camera();
        camera.translateTo({
          x,
          y
        }, 1);
        return camera.scaleTo(scale, 1);
      }
      movePixelMarkup(x, y, dx, dy) {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return [];
        }
        return PAA.Tutorials.Drawing.PixelArtFundamentals.movePixelMarkup(asset, x, y, dx, dy);
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;

    // The amount of time before we show instructions to the user after a new UI element is introduced.
    StepInstruction.uiRevealDelayDuration = 3;
    return StepInstruction;
  }.call(this);
  Instructions.RemoveDoubles = function () {
    class RemoveDoubles extends Instructions.StepInstruction {
      static id() {
        return "".concat(InflectionPoints.id(), ".RemoveDoubles");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "当我们徒手画曲线时，大致位置是正确的，但线条可能会变得弯曲。\n\n按指示删除重复像素。";
      }
    }
    ;
    RemoveDoubles.initialize();
    return RemoveDoubles;
  }.call(this);
  Instructions.OpenSmoothCurves = function () {
    class OpenSmoothCurves extends Instructions.StepInstruction {
      static id() {
        return "".concat(InflectionPoints.id(), ".OpenSmoothCurves");
      }
      static stepNumbers() {
        return [2, 3];
      }
      static message() {
        return "打开平滑曲线分解来分析拐点。";
      }
      static priority() {
        return 1;
      }
      static activeConditions() {
        var drawingEditor, pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not on the smooth curves criterion.
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (!pixelArtEvaluation.active()) {
          return true;
        }
        return pixelArtEvaluation.activeCriterion() !== PAE.Criteria.SmoothCurves;
      }
      markup() {
        var pixelArtEvaluation;
        // Show only on the pixel art evaluation overview.
        if (!(pixelArtEvaluation = this.constructor.getPixelArtEvaluation())) {
          return [];
        }
        if (!pixelArtEvaluation.active()) {
          return [];
        }
        if (pixelArtEvaluation.activeCriterion()) {
          return [];
        }
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionMarkup('.smooth-curves');
      }
    }
    ;
    OpenSmoothCurves.initialize();
    return OpenSmoothCurves;
  }.call(this);
  Instructions.HoverInflectionPointsScore = function () {
    class HoverInflectionPointsScore extends Instructions.StepInstruction {
      static id() {
        return "".concat(InflectionPoints.id(), ".HoverInflectionPointsScore");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "悬停在拐点分数上，看看曲线在拐点处如何改变方向。";
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      onActivate() {
        super.onActivate(...arguments);
        return this.translateAndScaleTo(21, 14, 4);
      }
      markup() {
        var arrowBase, markup, markupStyle, textBase;
        markup = [];
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        markup.push({
          interface: {
            selector: '.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation',
            delay: 1,
            bounds: {
              x: 170,
              y: 0,
              width: 80,
              height: 120
            },
            markings: [{
              rectangle: {
                strokeStyle: markupStyle,
                x: 181.5,
                y: 29,
                width: 20,
                height: 8.5
              },
              line: _.extend({}, arrowBase, {
                points: [{
                  x: 235,
                  y: 19
                }, {
                  x: 205,
                  y: 36,
                  bezierControlPoints: [{
                    x: 235,
                    y: 31
                  }, {
                    x: 215,
                    y: 36
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 235,
                  y: 17,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "hover\nhere"
              })
            }]
          }
        });
        return markup;
      }
    }
    ;
    HoverInflectionPointsScore.initialize();
    return HoverInflectionPointsScore;
  }.call(this);
  Instructions.InflectionPointsExplanation = function () {
    class InflectionPointsExplanation extends Instructions.StepInstruction {
      static id() {
        return "".concat(InflectionPoints.id(), ".InflectionPointsExplanation");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "弯曲的线条不断改变方向，最终会有许多拐点挤在一起。\n\n关闭评估纸并改进曲线，使其只有几个孤立的拐点。";
      }
    }
    ;
    InflectionPointsExplanation.initialize();
    return InflectionPointsExplanation;
  }.call(this);
  Instructions.InflectionPointsMarkup = class InflectionPointsMarkup extends Instructions.StepInstruction {
    markup() {
      var asset, betterStyle, closestInflectionPoint, curve, curveSmoothness, i, inflectionPoint, j, k, len, len1, len2, line, markup, mediocreStyle, perceivedLineMarkup, pixelArtEvaluation, point, ref, ref1, ref2, style, worseStyle;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return;
      }
      markup = [];
      markup.push(...this.movePixelMarkup(13, 5, 0, -1));
      markup.push(...this.movePixelMarkup(13, 14, 0, 1));
      markup.push(...this.movePixelMarkup(15, 24, 0, 1));
      markup.push(...this.movePixelMarkup(32, 22, 0, -1));
      betterStyle = Markup.betterStyle();
      mediocreStyle = Markup.mediocreStyle();
      worseStyle = Markup.worseStyle();
      ref = pixelArtEvaluation.layers[0].lines;
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        ({
          curveSmoothness
        } = line.evaluate());
        if (!curveSmoothness) {
          // Ignore lines without curves.
          continue;
        }
        ref1 = curveSmoothness.inflectionPoints.points;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          inflectionPoint = ref1[j];
          style = function () {
            switch (false) {
              case !(inflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.dense):
                return worseStyle;
              case !(inflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.sparse):
                return mediocreStyle;
              default:
                return betterStyle;
            }
          }();
          point = {
            x: inflectionPoint.position.x + 0.5,
            y: inflectionPoint.position.y + 0.5,
            style: style,
            radius: 2
          };
          markup.push({
            point
          });
        }
        ref2 = line.curvatureCurveParts;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          curve = ref2[k];
          perceivedLineMarkup = Markup.PixelArt.perceivedCurve(curve);
          perceivedLineMarkup.line.arrow = {
            end: true
          };
          perceivedLineMarkup.line.style = betterStyle;
          if (curveSmoothness.inflectionPoints.points.length) {
            // Color the line according to the spacing score of the closest inflection point.
            closestInflectionPoint = _.minBy(curveSmoothness.inflectionPoints.points, point => {
              var distanceToEndSegment, distanceToStartSegment, ref3;
              // Constraint to points inside the curve bounds.
              if (curve.startSegmentIndex <= (ref3 = point.inflectionArea.averageEdgeSegmentIndex) && ref3 <= curve.endSegmentIndex) {
                distanceToStartSegment = point.inflectionArea.averageEdgeSegmentIndex - curve.startSegmentIndex;
                distanceToEndSegment = curve.endSegmentIndex - point.inflectionArea.averageEdgeSegmentIndex;
                return Math.min(distanceToStartSegment, distanceToEndSegment);
              } else {
                return Number.POSITIVE_INFINITY;
              }
            });
            perceivedLineMarkup.line.style = function () {
              switch (false) {
                case !(closestInflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.dense):
                  return worseStyle;
                case !(closestInflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.sparse):
                  return mediocreStyle;
                default:
                  return betterStyle;
              }
            }();
          }
          perceivedLineMarkup.line.points = Markup.offsetPoints(perceivedLineMarkup.line.points, curve.clockwise ? -2.5 : 2.5);
          markup.push(perceivedLineMarkup);
        }
      }
      return markup;
    }
  };
  Instructions.FixLine = function () {
    class FixLine extends Instructions.InflectionPointsMarkup {
      static id() {
        return "".concat(InflectionPoints.id(), ".FixLine");
      }
      static stepNumber() {
        return 5;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return InstructionsSystem.DisplayState.Hidden;
      }
    }
    ;
    FixLine.initialize();
    return FixLine;
  }.call(this);
  Instructions.Complete = function () {
    class Complete extends Instructions.InflectionPointsMarkup {
      static id() {
        return "".concat(InflectionPoints.id(), ".Complete");
      }
      static message() {
        return "做得好！和往常一样，当方向改变是刻意的时候，孤立点不是问题，即使它们靠得很近（例如，画海浪）。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
      displaySide() {
        var drawingEditor, pixelArtEvaluation;
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lineartcleanup":{"lineartcleanup.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/lineartcleanup/lineartcle //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, PAE;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.LineArtCleanup = function () {
  class LineArtCleanup extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.LineArtCleanup";
    }
    static displayName() {
      return "Line art cleanup";
    }
    static description() {
      return "练习平滑你的曲线。";
    }
    static fixedDimensions() {
      return {
        width: 40,
        height: 30
      };
    }
    static resources() {
      return {
        requiredPixels: new this.Resource.ImagePixels("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/curves/lineartcleanup.png")
      };
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true
      };
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds;
      super.initializeSteps(...arguments);
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);

      // Step 1 requires you to connect all the required pixels and open the evaluation paper.
      new this.constructor.Steps.DrawLine(this, stepArea, {
        goalPixels: this.resources.requiredPixels
      });

      // Step 2 requires you to open the evaluation paper.
      new this.constructor.Steps.OpenEvaluationPaper(this, stepArea);

      // Step 3 requires you to open the smooth curves details page.
      new this.constructor.Steps.OpenSmoothCurves(this, stepArea);

      // Step 4 requires you to analyze the curve.
      new this.constructor.Steps.AnalyzeTheCurve(this, stepArea);

      // Step 5 requires you to smoothen the curve.
      return new this.constructor.Steps.SmoothenTheCurve(this, stepArea, {
        goalPixels: this.resources.requiredPixels
      });
    }
  }
  ;
  LineArtCleanup.initialize();
  LineArtCleanup._pixelPerfectLinesEvaluationProperty = {
    pixelPerfectLines: {
      doubles: {
        countAllLineWidthTypes: true,
        countPointsWithMultiplePixels: true
      },
      corners: {
        ignoreStraightLineCorners: false
      }
    }
  };
  return LineArtCleanup;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"steps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/lineartcleanup/steps.coff //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI,
  LineArtCleanup,
  PAA,
  PAE,
  TutorialBitmap,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
LineArtCleanup = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.LineArtCleanup;
LineArtCleanup.Steps = function () {
  class Steps {}
  ;
  Steps.DrawLine = class DrawLine extends TutorialBitmap.PixelsStep {
    static preserveCompleted() {
      return true;
    }
    hasPixel() {
      // Allow drawing everywhere.
      return true;
    }
    completed() {
      var bitmap, i, len, line, lineEvaluation, pixelArtEvaluation, ref;
      if (!super.completed(...arguments)) {
        return;
      }

      // Wait until the current stroke action has completed.
      bitmap = this.tutorialBitmap.bitmap();
      if (bitmap.partialAction) {
        return;
      }

      // There needs to be a line that goes through all goal pixels.
      if (!(pixelArtEvaluation = this.tutorialBitmap.pixelArtEvaluation())) {
        return;
      }
      if (!pixelArtEvaluation.getLinesBetween(...this.goalPixels)[0]) {
        return;
      }
      ref = pixelArtEvaluation.layers[0].lines;

      // The lines must not have any doubles or corners.
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        lineEvaluation = line.evaluate(LineArtCleanup._pixelPerfectLinesEvaluationProperty);
        if (lineEvaluation.doubles.count || lineEvaluation.corners.count) {
          return;
        }
      }
      return true;
    }
  };
  Steps.OpenEvaluationPaper = class OpenEvaluationPaper extends PAA.Tutorials.Drawing.PixelArtFundamentals.OpenEvaluationPaper {
    activate() {
      var bitmap, pixelArtEvaluation, updatePropertyAction;
      super.activate(...arguments);
      bitmap = this.tutorialBitmap.bitmap();
      pixelArtEvaluation = {
        allowedCriteria: [PAE.Criteria.SmoothCurves],
        smoothCurves: {
          ignoreMostlyStraightLines: false,
          abruptSegmentLengthChanges: {},
          straightParts: {},
          inflectionPoints: {}
        }
      };
      updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.tutorialBitmap.constructor.id(), bitmap, 'pixelArtEvaluation', pixelArtEvaluation);
      return bitmap.executeAction(updatePropertyAction);
    }
  };
  Steps.OpenSmoothCurves = class OpenSmoothCurves extends TutorialBitmap.EphemeralStep {
    completed() {
      var drawingEditor, pixelArtEvaluation;
      if (super.completed(...arguments)) {
        return true;
      }
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
        return;
      }
      return pixelArtEvaluation.activeCriterion() === PAE.Criteria.SmoothCurves;
    }
  };
  Steps.AnalyzeTheCurve = function () {
    class AnalyzeTheCurve extends TutorialBitmap.EphemeralStep {
      constructor() {
        super(...arguments);
        this.timeHovered = 0;
        this.analysesPerformed = [];
      }
      completed() {
        var drawingEditor, pixelArtEvaluationView;
        if (super.completed(...arguments)) {
          return true;
        }
        if (!(drawingEditor = this.getEditor())) {
          return this.stopCountingTime();
        }
        if (!(pixelArtEvaluationView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return this.stopCountingTime();
        }
        if (!(this.currentAnalysisType = pixelArtEvaluationView.hoveredFilterValue())) {
          return this.stopCountingTime();
        }
        this.countTime();

        // We return false since we'll complete this step by solving it which will resolve in the base completed.
        return false;
      }
      stopCountingTime() {
        this.timeHovered = 0;
        return Meteor.clearTimeout(this._countTimeout);
      }
      countTime() {
        Meteor.clearTimeout(this._countTimeout);
        return this._countTimeout = Meteor.setTimeout(() => {
          var ref;
          this.timeHovered += 0.1;
          if (this.timeHovered >= this.constructor.timeToHover) {
            if (ref = this.currentAnalysisType, indexOf.call(this.analysesPerformed, ref) < 0) {
              this.analysesPerformed.push(this.currentAnalysisType);
            }
            if (this.analysesPerformed.length >= this.constructor.requiredAnalysisPerformed) {
              return this.solve();
            }
          } else {
            return this.countTime();
          }
        }, 100);
      }
    }
    ;
    AnalyzeTheCurve.timeToHover = 1;
    AnalyzeTheCurve.requiredAnalysisPerformed = 2;
    return AnalyzeTheCurve;
  }.call(this);
  Steps.SmoothenTheCurve = class SmoothenTheCurve extends TutorialBitmap.PixelsStep {
    completed() {
      var bitmap, categoryEvaluation, categoryName, line, lineEvaluation, pixelArtEvaluation, ref;
      if (!super.completed(...arguments)) {
        return;
      }

      // There needs to be a line that goes through all goal pixels.
      if (!(pixelArtEvaluation = this.tutorialBitmap.pixelArtEvaluation())) {
        return;
      }
      if (!(line = pixelArtEvaluation.getLinesBetween(...this.goalPixels)[0])) {
        return;
      }

      // All smooth curves criteria need to be at 0.9 or more (A level).
      bitmap = this.tutorialBitmap.bitmap();
      lineEvaluation = line.evaluate(bitmap.properties.pixelArtEvaluation);
      ref = lineEvaluation.curveSmoothness;
      for (categoryName in ref) {
        categoryEvaluation = ref[categoryName];
        if (!(categoryEvaluation.score >= 0.9)) {
          return;
        }
      }
      return true;
    }
  };
  return Steps;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/lineartcleanup/instructio //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var InstructionsSystem, InterfaceMarking, LOI, LineArtCleanup, Markup, PAA, PAE;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;

// Note: We can't call this Instructions since we introduce a namespace class called that below.
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
LineArtCleanup = PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Curves.LineArtCleanup;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InterfaceMarking = PAA.PixelPad.Systems.Instructions.InterfaceMarking;
LineArtCleanup.Instructions = function () {
  class Instructions {}
  ;
  Instructions.StepInstruction = function () {
    class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static assetClass() {
        return LineArtCleanup;
      }
      static getPixelArtEvaluation() {
        var drawingEditor;
        drawingEditor = this.getEditor();
        return drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation);
      }
      displaySide() {
        var pixelArtEvaluation;
        pixelArtEvaluation = this.constructor.getPixelArtEvaluation();
        if (pixelArtEvaluation.active()) {
          return InstructionsSystem.DisplaySide.Top;
        } else {
          return InstructionsSystem.DisplaySide.Bottom;
        }
      }
    }
    ;

    // The amount of time before we show instructions to the user after a new UI element is introduced.
    StepInstruction.uiRevealDelayDuration = 3;
    return StepInstruction;
  }.call(this);
  Instructions.DrawLine = function () {
    class DrawLine extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".DrawLine");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "通过画一条穿过所有像素的单一像素完美曲线来连接它们。";
      }
    }
    ;
    DrawLine.initialize();
    return DrawLine;
  }.call(this);
  Instructions.CleanDoubleAndCorners = function () {
    class CleanDoubleAndCorners extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".CleanDoubleAndCorners");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "使线条像素完美（删除所有重复像素和角落）。";
      }
      static priority() {
        return 2;
      }
      activeConditions() {
        var asset, bitmap, i, j, len, len1, line, lineEvaluation, pixel, pixelArtEvaluation, ref, ref1, step1;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if there are corners and doubles and all dots are covered.
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        if (!(step1 = this.getTutorialStep(1))) {
          return;
        }
        bitmap = asset.bitmap();
        ref = step1.goalPixels;
        for (i = 0, len = ref.length; i < len; i++) {
          pixel = ref[i];
          if (!bitmap.getPixelForLayerAtCoordinates(0, pixel.x, pixel.y)) {
            return;
          }
        }
        ref1 = pixelArtEvaluation.layers[0].lines;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          line = ref1[j];
          lineEvaluation = line.evaluate(LineArtCleanup._pixelPerfectLinesEvaluationProperty);
          if (lineEvaluation.doubles.count || lineEvaluation.corners.count) {
            return true;
          }
        }
        return false;
      }
    }
    ;
    CleanDoubleAndCorners.initialize();
    return CleanDoubleAndCorners;
  }.call(this);
  Instructions.OpenEvaluationPaper = function () {
    class OpenEvaluationPaper extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".OpenEvaluationPaper");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "现在你可以打开像素画评估纸来获取你的曲线分析。";
      }
    }
    ;
    OpenEvaluationPaper.initialize();
    return OpenEvaluationPaper;
  }.call(this);
  Instructions.ReopenEvaluationPaper = function () {
    class ReopenEvaluationPaper extends Instructions.OpenEvaluationPaper {
      static id() {
        return "".concat(LineArtCleanup.id(), ".ReopenEvaluationPaper");
      }
      static stepNumbers() {
        return [2, 3, 4];
      }
      static message() {
        return "打开像素画评估纸以继续。";
      }
      static activeConditions() {
        var drawingEditor, pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not open.
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        return !pixelArtEvaluation.active();
      }
      static priority() {
        return 2;
      }
    }
    ;
    ReopenEvaluationPaper.initialize();
    return ReopenEvaluationPaper;
  }.call(this);
  Instructions.OpenSmoothCurves = function () {
    class OpenSmoothCurves extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".OpenSmoothCurves");
      }
      static stepNumbers() {
        return [3, 4];
      }
      static message() {
        return "点击平滑曲线标准以继续。";
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      static activeConditions() {
        var drawingEditor, pixelArtEvaluation;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show if the pixel art evaluation paper is not on the smooth curves criterion.
        if (!(drawingEditor = this.getEditor())) {
          return;
        }
        if (!(pixelArtEvaluation = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.PixelArtEvaluation))) {
          return;
        }
        if (!pixelArtEvaluation.active()) {
          return;
        }
        return pixelArtEvaluation.activeCriterion() !== PAE.Criteria.SmoothCurves;
      }
      static priority() {
        return 1;
      }
      markup() {
        return PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.pixelArtEvaluationClickHereCriterionMarkup('.smooth-curves');
      }
    }
    ;
    OpenSmoothCurves.initialize();
    return OpenSmoothCurves;
  }.call(this);
  Instructions.AnalyzeTheCurve = function () {
    class AnalyzeTheCurve extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".AnalyzeTheCurve");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "平滑曲线不会有突然的长度变化、直线部分或频繁的拐点。\n\n悬停在评估纸的各个部分来分析你的曲线。";
      }
      static delayDuration() {
        return this.uiRevealDelayDuration;
      }
      markup() {
        var arrowBase, markup, markupStyle, textBase;
        markup = [];
        markupStyle = InterfaceMarking.defaultStyle();
        arrowBase = InterfaceMarking.arrowBase();
        textBase = InterfaceMarking.textBase();
        markup.push({
          interface: {
            selector: '.pixelartacademy-pixelpad-apps-drawing-editor-desktop-pixelartevaluation',
            delay: 1,
            bounds: {
              x: 170,
              y: 0,
              width: 80,
              height: 120
            },
            markings: [{
              rectangle: {
                strokeStyle: markupStyle,
                x: 181.5,
                y: 29,
                width: 20,
                height: 80
              },
              line: _.extend({}, arrowBase, {
                points: [{
                  x: 235,
                  y: 49
                }, {
                  x: 205,
                  y: 66,
                  bezierControlPoints: [{
                    x: 235,
                    y: 61
                  }, {
                    x: 215,
                    y: 66
                  }]
                }]
              }),
              text: _.extend({}, textBase, {
                position: {
                  x: 235,
                  y: 47,
                  origin: Markup.TextOriginPosition.BottomCenter
                },
                value: "hover\nhere"
              })
            }]
          }
        });
        return markup;
      }
    }
    ;
    AnalyzeTheCurve.initialize();
    return AnalyzeTheCurve;
  }.call(this);
  Instructions.SmoothenTheCurve = function () {
    class SmoothenTheCurve extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".SmoothenTheCurve");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "清理你的线条，直到所有平滑曲线标准都提高到90%以上。";
      }
      static delayDuration() {
        return this.defaultDelayDuration;
      }
    }
    ;
    SmoothenTheCurve.initialize();
    return SmoothenTheCurve;
  }.call(this);
  Instructions.DrawOneCurve = function () {
    class DrawOneCurve extends Instructions.StepInstruction {
      static id() {
        return "".concat(LineArtCleanup.id(), ".DrawOneCurve");
      }
      static assetClass() {
        return LineArtCleanup;
      }
      static message() {
        return "确保只有一条曲线连接所有需要的像素。";
      }
      static activeConditions() {
        var asset, pixelArtEvaluation;
        // Show if there are multiple lines present.
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
          return;
        }
        return pixelArtEvaluation.layers[0].lines.length > 1;
      }
      static priority() {
        return 1;
      }
    }
    ;
    DrawOneCurve.initialize();
    return DrawOneCurve;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"linewidth":{"linewidth.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/linewidth.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth = function () {
  class LineWidth extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth';
    }
    static fullName() {
      return "像素画线条宽度";
    }
    static assets() {
      return [this.LineWidth, this.ThinLines, this.ThickLines, this.WideLines, this.VaryingLineWidth];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.LineWidth);
    }
  }
  ;
  LineWidth.initialize();
  return LineWidth;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"linewidthasset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/linewidthasset.coffee  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
Atari2600 = LOI.Assets.Palette.Atari2600;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.LineWidth = function () {
  var Asset;
  class LineWidth extends PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.Asset {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.LineWidth";
    }
    static displayName() {
      return "Line width";
    }
    static description() {
      return "线条的宽度可以通过使用重复像素来改变。";
    }
    static fixedDimensions() {
      return {
        width: 45,
        height: 45
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 5; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/linewidth-".concat(step, ".png"));
      }
      return results;
    }
    static markup() {
      return true;
    }
    static pixelArtEvaluation() {
      return true;
    }
  }
  ;
  LineWidth.initialize();
  Asset = LineWidth;
  LineWidth.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
    markup() {
      var arrowBase, asset, endOffset, endOffsetZeroWidth, i, len, line, linePart, markup, markupStyle, pixelArtEvaluation, ref, ref1, startOffset, startOffsetVertical, textBase, width0XY, width1X;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(pixelArtEvaluation = asset.pixelArtEvaluation())) {
        return;
      }
      markup = [];

      // Add perceived lines for straight lines during the lesson.
      if (!asset.completed()) {
        ref = pixelArtEvaluation.layers[0].lines;
        for (i = 0, len = ref.length; i < len; i++) {
          line = ref[i];
          if (line.parts.length !== 1) {
            continue;
          }
          linePart = line.parts[0];
          if (!(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine)) {
            continue;
          }
          markup.push(Markup.PixelArt.perceivedStraightLine(linePart));
        }
      }

      // Add titles.
      textBase = Markup.textBase();
      if (this.constructor.stepNumber() >= 1) {
        markup.push({
          text: _.extend({}, textBase, {
            position: {
              x: 0.5,
              y: 0.5,
              origin: Markup.TextOriginPosition.TopLeft
            },
            value: "Thin (1-pixel) lines"
          })
        });
      }
      if (this.constructor.stepNumber() >= 3) {
        markup.push({
          text: _.extend({}, textBase, {
            position: {
              x: 44.5,
              y: 0.5,
              origin: Markup.TextOriginPosition.TopRight
            },
            value: "Thick (1-pixel) lines"
          })
        });
      }
      if (this.constructor.stepNumber() >= 4) {
        markup.push({
          text: _.extend({}, textBase, {
            position: {
              x: 44.5,
              y: 44.5,
              origin: Markup.TextOriginPosition.BottomRight
            },
            value: "Wide (2-pixel) lines"
          })
        });
      }

      // Add widths.
      markupStyle = Markup.defaultStyle();
      arrowBase = {
        arrow: {
          end: true
        },
        style: markupStyle
      };
      textBase = Markup.textBase();
      width1X = 3.5;
      width0XY = 11;
      endOffset = 0.1;
      endOffsetZeroWidth = 0.2;
      startOffset = 1.2;
      startOffsetVertical = 1.6;
      if (1 <= (ref1 = this.constructor.stepNumber()) && ref1 <= 2 && pixelArtEvaluation.getLinesBetween({
        x: 3,
        y: 22
      }, {
        x: 14,
        y: 22
      }).length) {
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: width1X,
              y: 23 + startOffsetVertical
            }, {
              x: width1X,
              y: 23 + endOffset
            }]
          })
        }, {
          line: _.extend({}, arrowBase, {
            points: [{
              x: width1X,
              y: 22 - startOffsetVertical
            }, {
              x: width1X,
              y: 22 - endOffset
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: width1X,
              y: 22 - startOffsetVertical,
              origin: Markup.TextOriginPosition.BottomCenter
            },
            value: "1"
          })
        });
      }
      if (this.constructor.stepNumber() === 2 && pixelArtEvaluation.getLinesBetween({
        x: 8,
        y: 8
      }, {
        x: 17,
        y: 17
      }).length) {
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 8 - startOffset,
              y: 9 + startOffset
            }, {
              x: 8 - endOffset,
              y: 9 + endOffset
            }]
          })
        }, {
          line: _.extend({}, arrowBase, {
            points: [{
              x: 9 + startOffset,
              y: 8 - startOffset
            }, {
              x: 9 + endOffset,
              y: 8 - endOffset
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 9 + startOffset,
              y: 8 - startOffset,
              origin: Markup.TextOriginPosition.BottomLeft
            },
            value: "1.4"
          })
        }, {
          line: _.extend({}, arrowBase, {
            points: [{
              x: width0XY - startOffset,
              y: width0XY + startOffset
            }, {
              x: width0XY - endOffsetZeroWidth,
              y: width0XY + endOffsetZeroWidth
            }]
          })
        }, {
          line: _.extend({}, arrowBase, {
            points: [{
              x: width0XY + startOffset,
              y: width0XY - startOffset
            }, {
              x: width0XY + endOffsetZeroWidth,
              y: width0XY - endOffsetZeroWidth
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: width0XY + startOffset,
              y: width0XY - startOffset,
              origin: Markup.TextOriginPosition.BottomLeft
            },
            value: "0"
          })
        });
      }
      return markup;
    }
  };
  LineWidth.Width1 = function () {
    class Width1 extends LineWidth.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Width1");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "像素画中典型的线条是1像素宽，但我们只能在水平和垂直线上完美实现。";
      }
    }
    ;
    Width1.initialize();
    return Width1;
  }.call(this);
  LineWidth.Width1Thin = function () {
    class Width1Thin extends LineWidth.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Width1Thin");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "对于对角线，由于锯齿，沿线条的宽度会变化。\n细的1像素线条在其最宽处从1.4像素交替变化到锯齿角落处的0像素。";
      }
    }
    ;
    Width1Thin.initialize();
    return Width1Thin;
  }.call(this);
  LineWidth.Width1Thick = function () {
    class Width1Thick extends LineWidth.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Width1Thick");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "如果我们想要线条清晰连接并确保它至少有1像素宽，我们需要添加重复像素来实现粗的1像素线条。";
      }
    }
    ;
    Width1Thick.initialize();
    return Width1Thick;
  }.call(this);
  LineWidth.Width2 = function () {
    class Width2 extends LineWidth.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Width2");
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "虽然不太常见，但有足够空间的话，2像素线条也会出现。\n使用 +/- 键或 ctrl + 鼠标滚轮来增加或减小画笔大小。";
      }
    }
    ;
    Width2.initialize();
    return Width2;
  }.call(this);
  LineWidth.Width2ThinThick = function () {
    class Width2ThinThick extends LineWidth.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Width2ThinThick");
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "在这里我们也可以选择细或粗的2像素对角线的变化。";
      }
    }
    ;
    Width2ThinThick.initialize();
    return Width2ThinThick;
  }.call(this);
  LineWidth.Complete = function () {
    class Complete extends LineWidth.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static stepNumber() {
        return 6;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return LineWidth;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"thinlines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thinlines.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
Atari2600 = LOI.Assets.Palette.Atari2600;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.ThinLines = function () {
  var Asset;
  class ThinLines extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.ThinLines";
    }
    static displayName() {
      return "Thin lines";
    }
    static description() {
      return "像素画中最常见的线条占用最少的空间。";
    }
    static bitmapInfo() {
      return "Artwork from [Sheep Lad](https://store.steampowered.com/app/2231820/Sheep_Lad), WIP\n\nArtist: Robin Poe";
    }
    static fixedDimensions() {
      return {
        width: 58,
        height: 36
      };
    }
    static backgroundColor() {
      return new THREE.Color('#665d5b');
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 3; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thinlines-".concat(step, ".png"));
      }
      return results;
    }
    static customPaletteImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thinlines-template.png";
    }
    static markup() {
      return true;
    }
    initializeSteps() {
      var stepArea, steps;
      super.initializeSteps(...arguments);

      // The steps should show invalid pixels even where the colors will add them later.
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();
      steps[0].options.canCompleteWithExtraPixels = true;
      steps[1].options.hasPixelsWhenInactive = false;
      steps[1].options.canCompleteWithExtraPixels = true;
      steps[2].options.hasPixelsWhenInactive = false;

      // Once you complete the steps, don't return to it if you accidentally recolor some of its pixels later.
      steps[0].options.preserveCompleted = true;
      return steps[1].options.preserveCompleted = true;
    }
  }
  ;
  ThinLines.initialize();
  Asset = ThinLines;
  ThinLines.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
  };
  ThinLines.StepInstructionWithBleed = class StepInstructionWithBleed extends ThinLines.StepInstruction {
    markup() {
      var addBleedArrow, asset, bitmap, bleedColor, markup, palette;
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(bitmap = asset.bitmap())) {
        return;
      }
      markup = [];
      palette = LOI.palette();
      bleedColor = palette.color(Atari2600.hues.gray, 6);
      addBleedArrow = function (x1, y1, x2, y2) {
        var extension, extensionX, extensionY;
        if (bitmap.findPixelAtAbsoluteCoordinates(x1, y1)) {
          return;
        }
        if (bitmap.findPixelAtAbsoluteCoordinates(x2, y2)) {
          return;
        }
        extension = 0.2;
        extensionX = extension * Math.sign(x2 - x1);
        extensionY = extension * Math.sign(y2 - y1);
        return markup.push({
          line: {
            style: "#".concat(bleedColor.getHexString()),
            width: 0,
            arrow: {
              start: true,
              end: true,
              width: 0.8,
              length: 0.4
            },
            points: [{
              x: x1 + 0.5 - extensionX,
              y: y1 + 0.5 - extensionY
            }, {
              x: x2 + 0.5 + extensionX,
              y: y2 + 0.5 + extensionY
            }]
          }
        });
      };
      addBleedArrow(26, 26, 27, 25);
      addBleedArrow(29, 23, 30, 22);
      addBleedArrow(36, 22, 37, 23);
      return markup;
    }
  };
  ThinLines.LineArt = function () {
    class LineArt extends ThinLines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LineArt");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "由于精灵尺寸通常很小，像素画倾向于使用细的1像素线条，尽可能为表面颜色和其他细节留下空间。\n除了紧凑之外，细线条还能帮助眼睛顺畅地沿着像素移动。";
      }
    }
    ;
    LineArt.initialize();
    return LineArt;
  }.call(this);
  ThinLines.Colors = function () {
    class Colors extends ThinLines.StepInstructionWithBleed {
      static id() {
        return "".concat(Asset.id(), ".Colors");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "由于在角落处为0像素宽，细的线条艺术不能清晰分离相邻的对角形状，让空间相互「渗透」。\n颜色的差异有助于缓解这个问题。";
      }
    }
    ;
    Colors.initialize();
    return Colors;
  }.call(this);
  ThinLines.MoreColors = function () {
    class MoreColors extends ThinLines.StepInstructionWithBleed {
      static id() {
        return "".concat(Asset.id(), ".MoreColors");
      }
      static stepNumber() {
        return 3;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
    }
    ;
    MoreColors.initialize();
    return MoreColors;
  }.call(this);
  return ThinLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"thicklines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thicklines.coffee      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
Atari2600 = LOI.Assets.Palette.Atari2600;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.ThickLines = function () {
  var Asset;
  class ThickLines extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.ThickLines";
    }
    static displayName() {
      return "Thick lines";
    }
    static description() {
      return "粗线条有助于清晰分离形状，但代价是占用更多空间。";
    }
    static bitmapInfo() {
      return "Artwork from [64x64 rpg](https://castpixel.artstation.com/projects/0XOaE8), 2019\n\nArtist: Christina 'castpixel' Neofotistou";
    }
    static fixedDimensions() {
      return {
        width: 36,
        height: 53
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 2; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thicklines-".concat(step, ".png"));
      }
      return results;
    }
    static customPaletteImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thicklines-template.png";
    }
    initializeSteps() {
      var stepArea, steps;
      super.initializeSteps(...arguments);

      // The first step should show invalid pixels even where the colors will add them later.
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();
      steps[0].options.canCompleteWithExtraPixels = true;
      steps[1].options.hasPixelsWhenInactive = false;

      // Once you complete the first step, don't return to it if you accidentally recolor some of its pixels later.
      return steps[0].options.preserveCompleted = true;
    }
  }
  ;
  ThickLines.initialize();
  Asset = ThickLines;
  ThickLines.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
  };
  ThickLines.LineArt = function () {
    class LineArt extends ThickLines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LineArt");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "粗的1像素线条确保两侧形状之间始终至少有1像素。\n这使区域在其定义和重叠处清晰，但需要更多空间和更大胆的外观。";
      }
    }
    ;
    LineArt.initialize();
    return LineArt;
  }.call(this);
  return ThickLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"widelines.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/widelines.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
Atari2600 = LOI.Assets.Palette.Atari2600;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.WideLines = function () {
  var Asset;
  class WideLines extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.WideLines";
    }
    static displayName() {
      return "Wide lines";
    }
    static description() {
      return "2像素线条提供更大的形状清晰度。";
    }
    static bitmapInfo() {
      return "Artwork from [Die in the Dungeon](https://store.steampowered.com/app/2026820/Die_in_the_Dungeon/), WIP\n\nArtist: Álvaro Farfán";
    }
    static fixedDimensions() {
      return {
        width: 33,
        height: 51
      };
    }
    static backgroundColor() {
      return new THREE.Color('#b09d87');
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 2; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/widelines-".concat(step, ".png"));
      }
      return results;
    }
    static customPaletteImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/widelines-template.png";
    }
    initializeSteps() {
      var stepArea, steps;
      super.initializeSteps(...arguments);

      // The first step should show invalid pixels even where the colors will add them later.
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();
      steps[0].options.canCompleteWithExtraPixels = true;
      steps[1].options.hasPixelsWhenInactive = false;

      // Second step changes the lineart colors of the first step.
      return steps[0].options.preserveCompleted = true;
    }
  }
  ;
  WideLines.initialize();
  Asset = WideLines;
  WideLines.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    static assetClass() {
      return Asset;
    }
  };
  WideLines.LineArt = function () {
    class LineArt extends WideLines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LineArt");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "有足够空间的话，2像素线条给《Die in the Dungeon》的精灵一种突出的卡通外观。\n额外的宽度给线条呼吸的空间，共享细线条的柔和外观。";
      }
    }
    ;
    LineArt.initialize();
    return LineArt;
  }.call(this);
  WideLines.ColoredLines = function () {
    class ColoredLines extends WideLines.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".ColoredLines");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "《Die in the Dungeon》的艺术风格也使用带阴影的轮廓，这将在艺术方向课程中进一步探讨。\n按要求重新着色轮廓。";
      }
    }
    ;
    ColoredLines.initialize();
    return ColoredLines;
  }.call(this);
  return WideLines;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"varyinglinewidth.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/varyinglinewidth.coffe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
Atari2600 = LOI.Assets.Palette.Atari2600;
PAA.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.VaryingLineWidth = function () {
  var Asset;
  class VaryingLineWidth extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Jaggies.LineWidth.VaryingLineWidth";
    }
    static displayName() {
      return "Varying line width";
    }
    static description() {
      return "线条根本不需要固定的宽度。";
    }
    static bitmapInfo() {
      return "Artwork from [Arclands](https://arclands.de), WIP\n\nArtist: Jon Keller";
    }
    static fixedDimensions() {
      return {
        width: 48,
        height: 55
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 2; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/varyinglinewidth-".concat(step, ".png"));
      }
      return results;
    }
    static customPaletteImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/jaggies/linewidth/varyinglinewidth-template.png";
    }
    initializeSteps() {
      var stepArea, steps;
      super.initializeSteps(...arguments);

      // The first step should show invalid pixels even where the colors will add them later.
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();
      steps[0].options.canCompleteWithExtraPixels = true;
      steps[1].options.hasPixelsWhenInactive = false;

      // Second step changes the lineart colors of the first step.
      return steps[0].options.preserveCompleted = true;
    }
  }
  ;
  VaryingLineWidth.initialize();
  Asset = VaryingLineWidth;
  VaryingLineWidth.LineArt = function () {
    class LineArt extends PAA.Tutorials.Drawing.Instructions.Instruction {
      static id() {
        return "".concat(Asset.id(), ".LineArt");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "出于艺术方向的原因，有很多理由可以改变线条宽度。\n现在不深入探讨这个话题，观察Arclands如何使用2像素线条进行深度分离，但在末端逐渐变细，同时在内部使用1像素细节。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show until the asset is completed.
        return !asset.completed();
      }
    }
    ;
    LineArt.initialize();
    return LineArt;
  }.call(this);
  return VaryingLineWidth;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"size":{"size.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/size/size.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Size = function () {
  class Size extends PAA.Tutorials.Drawing.PixelArtFundamentals {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Size';
    }
    static fullName() {
      return "像素画尺寸";
    }
    static assets() {
      return [this.DisplayResolution, this.PerceivedResolution, this.SmallestDetails, this.SmallestRecognizableSize, this.ReadabilityAnalysis];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.PixelArt.Size);
    }
  }
  ;
  Size.initialize();
  return Size;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetwithreferences.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/size/assetwithreferences.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Size.AssetWithReferences = class AssetWithReferences extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  availableToolKeys() {
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.Line, PAA.Practice.Software.Tools.ToolKeys.Rectangle, PAA.Practice.Software.Tools.ToolKeys.Ellipse, PAA.Practice.Software.Tools.ToolKeys.References];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"displayresolution.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/size/displayresolution.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Size.DisplayResolution = function () {
  var Asset;
  class DisplayResolution extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Size.DisplayResolution";
    }
    static displayName() {
      return "Display resolution";
    }
    static description() {
      return "像素画图像的尺寸源自旧电脑和游戏机的显示分辨率。";
    }
    static bitmapInfo() {
      return "Artwork from Frogger (Dragon 32/64, ColecoVision), Konami, 1983";
    }
    static fixedDimensions() {
      return {
        width: 350,
        height: 200
      };
    }
    static backgroundColorStyle() {
      return '#1c209e';
    }
    static backgroundColor() {
      return new THREE.Color(this.backgroundColorStyle());
    }
    static markupColorStyle() {
      return "#7d76fc";
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 8; step = ++i) {
        results.push({
          goalImageUrl: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/displayresolution-".concat(step, ".png"),
          imageUrl: step === 1 ? "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/displayresolution.png" : void 0
        });
      }
      return results;
    }
    static customPaletteImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/displayresolution-palette.png";
    }
    static markup() {
      return true;
    }
  }
  ;
  DisplayResolution.initialize();
  Asset = DisplayResolution;
  DisplayResolution.Instruction = class Instruction extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    markup() {
      var asset, bitmap, colecoVisionEndFroggerSource, colecoVisionFroggerSource, colecoVisionLogSource, colecoVisionTurtleSource, dragon32EndFroggerSource, dragon32FroggerSource, dragon32LogSource, dragon32TurtleSource, froggerIndex, i, j, k, l, logIndex, m, markup, n, o, p, q, r, s, textBase, textScale, turtleGroupIndex, turtleIndex;
      if (!(asset = this.getActiveAsset())) {
        return [];
      }
      if (!(bitmap = asset.bitmap())) {
        return [];
      }
      textScale = 6;
      textBase = Markup.textBase();
      textBase.size *= textScale;
      textBase.lineHeight *= textScale;
      textBase.style = Asset.markupColorStyle();
      textBase.outline = {
        style: Asset.backgroundColorStyle(),
        width: textScale
      };
      textBase.position = {
        y: 20,
        origin: Markup.TextOriginPosition.BottomCenter
      };
      dragon32FroggerSource = {
        position: {
          x: 68,
          y: 170
        },
        width: 6,
        height: 6
      };
      dragon32EndFroggerSource = {
        position: {
          x: 77,
          y: 171
        },
        width: 6,
        height: 5
      };
      dragon32TurtleSource = {
        position: {
          x: 86,
          y: 171
        },
        width: 7,
        height: 5
      };
      dragon32LogSource = {
        position: {
          x: 96,
          y: 171
        },
        width: 24,
        height: 5
      };
      colecoVisionFroggerSource = {
        position: {
          x: 206,
          y: 168
        },
        width: 12,
        height: 12
      };
      colecoVisionEndFroggerSource = {
        position: {
          x: 222,
          y: 168
        },
        width: 16,
        height: 12
      };
      colecoVisionTurtleSource = {
        position: {
          x: 242,
          y: 166
        },
        width: 16,
        height: 15
      };
      colecoVisionLogSource = {
        position: {
          x: 262,
          y: 168
        },
        width: 48,
        height: 11
      };
      markup = [{
        text: _.merge({}, textBase, {
          position: {
            x: 93
          },
          value: "Dragon 32"
        })
      }, {
        text: _.merge({}, textBase, {
          position: {
            x: 257
          },
          value: "ColecoVision"
        })
      }, {
        image: {
          bitmap: bitmap,
          position: {
            x: 91,
            y: 130
          },
          source: dragon32FroggerSource
        }
      }, {
        image: {
          bitmap: bitmap,
          position: {
            x: 29,
            y: 70
          },
          source: dragon32TurtleSource
        }
      }, {
        image: {
          bitmap: bitmap,
          position: {
            x: 45,
            y: 82
          },
          source: dragon32LogSource
        }
      }, {
        image: {
          bitmap: bitmap,
          position: {
            x: 86,
            y: 82
          },
          source: dragon32LogSource
        }
      }, {
        image: {
          bitmap: bitmap,
          position: {
            x: 131,
            y: 82
          },
          source: dragon32LogSource
        }
      }, {
        image: {
          bitmap: bitmap,
          position: {
            x: 500 / 2,
            y: 243 / 2
          },
          width: colecoVisionFroggerSource.width / 2,
          height: colecoVisionFroggerSource.height / 2,
          source: colecoVisionFroggerSource
        }
      }];
      for (froggerIndex = i = 0; i < 3; froggerIndex = ++i) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: 33 + 12 * froggerIndex,
              y: 137
            },
            source: dragon32FroggerSource
          }
        });
      }
      for (froggerIndex = j = 0; j < 2; froggerIndex = ++j) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: 62 + 28 * froggerIndex,
              y: 59
            },
            source: dragon32EndFroggerSource
          }
        });
      }
      for (turtleIndex = k = 0; k < 2; turtleIndex = ++k) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: 124 + 9 * turtleIndex,
              y: 70
            },
            source: dragon32TurtleSource
          }
        });
      }
      for (turtleIndex = l = 0; l < 3; turtleIndex = ++l) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: 33 + 9 * turtleIndex,
              y: 88
            },
            source: dragon32TurtleSource
          }
        });
      }
      for (turtleIndex = m = 0; m < 3; turtleIndex = ++m) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: 121 + 9 * turtleIndex,
              y: 88
            },
            source: dragon32TurtleSource
          }
        });
      }
      for (froggerIndex = n = 0; n < 2; froggerIndex = ++n) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: (510 + 96 * froggerIndex) / 2,
              y: 102 / 2
            },
            width: colecoVisionEndFroggerSource.width / 2,
            height: colecoVisionEndFroggerSource.height / 2,
            source: colecoVisionEndFroggerSource
          }
        });
      }
      for (turtleGroupIndex = o = 0; o < 3; turtleGroupIndex = ++o) {
        for (turtleIndex = p = 0; p < 2; turtleIndex = ++p) {
          markup.push({
            image: {
              bitmap: bitmap,
              position: {
                x: (416 + 64 * turtleGroupIndex + 24 * turtleIndex) / 2,
                y: 130 / 2
              },
              width: colecoVisionTurtleSource.width / 2,
              height: colecoVisionTurtleSource.height / 2,
              source: colecoVisionTurtleSource
            }
          });
        }
      }
      for (turtleIndex = q = 0; q < 3; turtleIndex = ++q) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: (418 + 24 * turtleIndex) / 2,
              y: 178 / 2
            },
            width: colecoVisionTurtleSource.width / 2,
            height: colecoVisionTurtleSource.height / 2,
            source: colecoVisionTurtleSource
          }
        });
      }
      for (turtleIndex = r = 0; r < 2; turtleIndex = ++r) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: (514 + 24 * turtleIndex) / 2,
              y: 178 / 2
            },
            width: colecoVisionTurtleSource.width / 2,
            height: colecoVisionTurtleSource.height / 2,
            source: colecoVisionTurtleSource
          }
        });
      }
      for (logIndex = s = 0; s < 2; logIndex = ++s) {
        markup.push({
          image: {
            bitmap: bitmap,
            position: {
              x: (414 + 72 * logIndex) / 2,
              y: 164 / 2
            },
            width: colecoVisionLogSource.width / 2,
            height: colecoVisionLogSource.height / 2,
            source: colecoVisionLogSource
          }
        });
      }
      return markup;
    }
  };
  DisplayResolution.LimitedMemory = function () {
    class LimitedMemory extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".LimitedMemory");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "旧的电脑，如配备Motorola MC6847视频芯片的Dragon 32，内存非常有限。";
      }
      markup() {
        var arrowBase, markup, markupScale, textBase;
        markup = super.markup(...arguments);
        markupScale = 4;
        textBase = Markup.textBase();
        textBase.size *= markupScale;
        textBase.lineHeight *= markupScale;
        textBase.style = Asset.markupColorStyle();
        textBase.outline = {
          style: Asset.backgroundColorStyle(),
          width: markupScale
        };
        textBase.position = {
          y: 20,
          origin: Markup.TextOriginPosition.BottomCenter
        };
        arrowBase = {
          width: markupScale,
          arrow: {
            end: true,
            width: markupScale,
            length: markupScale / 2
          },
          style: Asset.markupColorStyle()
        };
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 40,
              y: 190
            }, {
              bezierControlPoints: [{
                x: 40,
                y: 180
              }, {
                x: 50,
                y: 173
              }],
              x: 63,
              y: 173
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 40,
              y: 195,
              origin: Markup.TextOriginPosition.TopCenter
            },
            value: "draw here"
          })
        });
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 145,
              y: 190
            }, {
              bezierControlPoints: [{
                x: 145,
                y: 170
              }, {
                x: 122,
                y: 133
              }],
              x: 102,
              y: 133
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 145,
              y: 195,
              origin: Markup.TextOriginPosition.TopCenter
            },
            value: "preview here"
          })
        });
        return markup;
      }
    }
    ;
    LimitedMemory.initialize();
    return LimitedMemory;
  }.call(this);
  DisplayResolution.Tradeoff = function () {
    class Tradeoff extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Tradeoff");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "显示分辨率（屏幕显示多少像素）和可使用的颜色数量之间经常存在权衡。";
      }
    }
    ;
    Tradeoff.initialize();
    return Tradeoff;
  }.call(this);
  DisplayResolution.FroggerDragon = function () {
    class FroggerDragon extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".FroggerDragon");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "《Frogger》游戏选择了更低的显示分辨率（128×96像素）但使用更多颜色（4种）。";
      }
    }
    ;
    FroggerDragon.initialize();
    return FroggerDragon;
  }.call(this);
  DisplayResolution.BigPixels = function () {
    class BigPixels extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".BigPixels");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "这导致了大的像素，成为早期像素画风格的定义特征。";
      }
    }
    ;
    BigPixels.initialize();
    return BigPixels;
  }.call(this);
  DisplayResolution.ColecoVision = function () {
    class ColecoVision extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".ColecoVision");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "游戏机，如配备德州仪器TMS9918视频芯片的ColecoVision，\n开始拥有专用视频内存，以接近街机游戏的图形。";
      }
    }
    ;
    ColecoVision.initialize();
    return ColecoVision;
  }.call(this);
  DisplayResolution.HigherResolution = function () {
    class HigherResolution extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".HigherResolution");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 6;
      }
      static message() {
        return "游戏机可以比竞争的家庭电脑产生更高分辨率和更多颜色。";
      }
    }
    ;
    HigherResolution.initialize();
    return HigherResolution;
  }.call(this);
  DisplayResolution.FroggerColecoVision = function () {
    class FroggerColecoVision extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".FroggerColecoVision");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 7;
      }
      static message() {
        return "ColecoVision上的《Frogger》在256×192像素的显示分辨率下使用了15种可用颜色中的9种。";
      }
    }
    ;
    FroggerColecoVision.initialize();
    return FroggerColecoVision;
  }.call(this);
  DisplayResolution.SmallerPixels = function () {
    class SmallerPixels extends DisplayResolution.Instruction {
      static id() {
        return "".concat(Asset.id(), ".SmallerPixels");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 8;
      }
      static message() {
        return "更高的分辨率意味着更小的显示像素，定义了越来越现代的像素画风格。";
      }
    }
    ;
    SmallerPixels.initialize();
    return SmallerPixels;
  }.call(this);
  DisplayResolution.Completed = function () {
    class Completed extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Completed");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "今天，我们不再受硬件限制。\n像素画尺寸的选择取决于我们想要传达的美学。\n更大的像素需要更多的简化，更小的像素允许更多的细节和表现力。";
      }
      markup() {
        var bottomTextBase, textBase, textScale, topTextBase;
        textScale = 6;
        textBase = Markup.textBase();
        textBase.size *= textScale;
        textBase.lineHeight *= textScale;
        textBase.style = Asset.markupColorStyle();
        textBase.outline = {
          style: Asset.backgroundColorStyle(),
          width: textScale
        };
        topTextBase = _.merge({}, textBase, {
          position: {
            y: 20,
            origin: Markup.TextOriginPosition.BottomCenter
          }
        });
        bottomTextBase = _.merge({}, textBase, {
          position: {
            y: 190,
            origin: Markup.TextOriginPosition.TopCenter
          }
        });
        return [{
          text: _.merge({}, topTextBase, {
            position: {
              x: 93
            },
            value: "lower resolution (128×96)\nbigger pixels\nmore simplification"
          })
        }, {
          text: _.merge({}, topTextBase, {
            position: {
              x: 257
            },
            value: "higher resolution (256×192)\nsmaller pixels\nmore details"
          })
        }, {
          text: _.merge({}, bottomTextBase, {
            position: {
              x: 93
            },
            value: "smaller sprites\n(5–6 px tall)"
          })
        }, {
          text: _.merge({}, bottomTextBase, {
            position: {
              x: 257
            },
            value: "bigger sprites\n(11–15 px tall)"
          })
        }, {
          image: {
            url: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/displayresolution-dragon32.png",
            position: {
              x: 25,
              y: 45
            }
          }
        }, {
          image: {
            url: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/displayresolution-colecovision.png",
            position: {
              x: 189,
              y: 45
            },
            width: 136,
            height: 104
          }
        }];
      }
    }
    ;
    Completed.initialize();
    return Completed;
  }.call(this);
  return DisplayResolution;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"perceivedresolution.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/size/perceivedresolution.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Size.PerceivedResolution = function () {
  var Asset;
  class PerceivedResolution extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Size.PerceivedResolution";
    }
    static displayName() {
      return "Perceived resolution";
    }
    static description() {
      return "像素画尺寸不仅取决于画布大小。";
    }
    static fixedDimensions() {
      return {
        width: 232,
        height: 163
      };
    }
    static backgroundColorStyle() {
      return '#1c209e';
    }
    static backgroundColor() {
      return new THREE.Color(this.backgroundColorStyle());
    }
    static markupColorStyle() {
      return "#407bec";
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 26; step = ++i) {
        results.push({
          goalImageUrl: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/perceivedresolution-".concat(step, ".png"),
          imageUrl: step === 3 ? "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/perceivedresolution-".concat(step, "-start.png") : void 0
        });
      }
      return results;
    }
    static customPaletteImageUrl() {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/perceivedresolution-palette.png";
    }
    static markup() {
      return true;
    }
    initializeSteps() {
      var i, len, step, stepArea, steps;
      super.initializeSteps(...arguments);
      stepArea = this.stepAreas()[0];
      steps = stepArea.steps();
      for (i = 0, len = steps.length; i < len; i++) {
        step = steps[i];
        // Pixels from previous steps get repainted, so they have to be preserved.
        step.options.preserveCompleted = true;

        // Allow extra pixels since markup images cover the canvas and you can accidentally paint in that area.
        step.options.canCompleteWithExtraPixels = true;
      }
      return new this.constructor.FinalStep(this, stepArea, {
        goalPixels: _.last(steps).options.goalPixels
      });
    }
    _initialize() {
      var enabledColorsByStep;
      super._initialize(...arguments);
      enabledColorsByStep = [[{
        ramp: 0,
        shade: 0
      }], [], [], [], [{
        ramp: 1,
        shade: 0
      }, {
        ramp: 2,
        shade: 0
      }], [{
        ramp: 0,
        shade: 1
      }], [{
        ramp: 0,
        shade: 2
      }], [{
        ramp: 0,
        shade: 3
      }], [{
        ramp: 0,
        shade: 4
      }], [{
        ramp: 1,
        shade: 1
      }], [{
        ramp: 1,
        shade: 2
      }], [{
        ramp: 1,
        shade: 3
      }], [{
        ramp: 1,
        shade: 4
      }], [{
        ramp: 1,
        shade: 5
      }], [{
        ramp: 1,
        shade: 6
      }], [{
        ramp: 1,
        shade: 7
      }], [{
        ramp: 3,
        shade: 0
      }], [{
        ramp: 3,
        shade: 1
      }], [{
        ramp: 3,
        shade: 2
      }], [{
        ramp: 3,
        shade: 3
      }], [{
        ramp: 2,
        shade: 1
      }], [{
        ramp: 2,
        shade: 2
      }], [{
        ramp: 2,
        shade: 3
      }], [{
        ramp: 4,
        shade: 0
      }], [{
        ramp: 4,
        shade: 1
      }], [{
        ramp: 4,
        shade: 2
      }]];

      // Enable ramp shades as the steps progress.
      return this._setPaletteColorsAutorun = Tracker.autorun(computation => {
        var activeStepIndex, bitmapData, bitmapId, stepAreas;
        if (!(this.initialized() && this.resourcesReady())) {
          return;
        }
        if (!(bitmapId = this.bitmapId())) {
          return;
        }
        if (!(bitmapData = LOI.Assets.Bitmap.documents.findOne(bitmapId, {
          fields: {
            customPalette: 1
          }
        }))) {
          return;
        }
        if (!(stepAreas = this.stepAreas())) {
          return;
        }
        if (!stepAreas.length) {
          return;
        }
        activeStepIndex = stepAreas[0].activeStepIndex();
        return Tracker.nonreactive(() => {
          var base, color, customPalette, enabledColors, i, j, len, len1, name, ref;
          customPalette = {
            allRamps: bitmapData.customPalette.allRamps || _.clone(bitmapData.customPalette.ramps),
            ramps: []
          };
          ref = enabledColorsByStep.slice(0, +activeStepIndex + 1 || 9e9);
          for (i = 0, len = ref.length; i < len; i++) {
            enabledColors = ref[i];
            for (j = 0, len1 = enabledColors.length; j < len1; j++) {
              color = enabledColors[j];
              if ((base = customPalette.ramps)[name = color.ramp] == null) {
                base[name] = {
                  shades: []
                };
              }
              customPalette.ramps[color.ramp].shades[color.shade] = customPalette.allRamps[color.ramp].shades[color.shade];
            }
          }
          if (EJSON.equals(customPalette, bitmapData.customPalette)) {
            return;
          }
          // Wait for stroke to be saved fully.
          return Tracker.autorun(computation => {
            var bitmap;
            bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId);
            if (bitmap.partialAction) {
              return;
            }
            computation.stop();

            // Update persistent document.
            LOI.Assets.Bitmap.documents.update(bitmapId, {
              $set: {
                customPalette,
                lastEditTime: new Date()
              }
            });

            // Trigger reactivity.
            return LOI.Assets.Bitmap.versionedDocuments.reportNonVersionedChange(bitmapId);
          });
        });
      });
    }
    destroy() {
      var ref;
      super.destroy(...arguments);
      return (ref = this._setPaletteColorsAutorun) != null ? ref.stop() : void 0;
    }
  }
  ;
  PerceivedResolution.initialize();
  Asset = PerceivedResolution;
  PerceivedResolution.FinalStep = class FinalStep extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PixelsStep {
    hasPixel(x, y) {
      if (super.hasPixel(...arguments)) {
        return true;
      }
      if (9 <= x && x < 9 + 32 && 52 <= y && y < 52 + 18) {
        // Allow extra pixels since markup images cover the canvas and you can accidentally paint in that area.
        return true;
      }
      if (61 <= x && x < 61 + 160 && 11 <= y && y < 11 + 90) {
        return true;
      }
      return false;
    }
  };
  PerceivedResolution.Context = function () {
    class Context extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Context");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "创作艺术品时，考虑它将显示的上下文可能很有用。";
      }
    }
    ;
    Context.initialize();
    return Context;
  }.call(this);
  PerceivedResolution.SocialMedia = function () {
    class SocialMedia extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".SocialMedia");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "在社交媒体动态中显示的大艺术品可能像素太小，以至于失去像素画的感觉。";
      }
      markup() {
        return [{
          image: {
            url: '/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/perceivedresolution-hapunui.png',
            position: {
              x: 9,
              y: 52
            },
            width: 32,
            height: 18
          }
        }];
      }
    }
    ;
    SocialMedia.initialize();
    return SocialMedia;
  }.call(this);
  PerceivedResolution.Wallpaper = function () {
    class Wallpaper extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Wallpaper");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "作为桌面壁纸显示的小艺术品可能像素太大，以至于难以看清场景。";
      }
      markup() {
        return [{
          image: {
            url: '/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/perceivedresolution-hapunui.png',
            position: {
              x: 9,
              y: 52
            },
            width: 32,
            height: 18
          }
        }, {
          image: {
            url: '/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/perceivedresolution-minilandscape.png',
            position: {
              x: 61,
              y: 11
            },
            width: 160,
            height: 90
          }
        }];
      }
    }
    ;
    Wallpaper.initialize();
    return Wallpaper;
  }.call(this);
  PerceivedResolution.InstructionsWithBitmaps = class InstructionsWithBitmaps extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
    markup() {
      var asset, bitmap, landscapeSource;
      if (!(asset = this.getActiveAsset())) {
        return [];
      }
      if (!(bitmap = asset.bitmap())) {
        return [];
      }
      landscapeSource = {
        position: {
          x: 84,
          y: 122
        },
        width: 64,
        height: 36
      };
      return [{
        image: {
          bitmap: bitmap,
          position: {
            x: 9,
            y: 52
          },
          width: 32,
          height: 18,
          source: landscapeSource
        }
      }, {
        image: {
          bitmap: bitmap,
          position: {
            x: 61,
            y: 11
          },
          width: 160,
          height: 90,
          source: landscapeSource
        }
      }];
    }
  };
  PerceivedResolution.PerceivedPixelSize = function () {
    class PerceivedPixelSize extends PerceivedResolution.InstructionsWithBitmaps {
      static id() {
        return "".concat(Asset.id(), ".PerceivedPixelSize");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers() {
        return function () {
          var results = [];
          for (var i = 4; i <= 28; i++) {
            results.push(i);
          }
          return results;
        }.apply(this);
      }
      static message() {
        return "这意味着同一张图片在小显示时可能被认为更详细（更高分辨率），\n在大显示时显得更块状（更低分辨率）。";
      }
      markup() {
        var arrowBase, markup, markupScale, textBase;
        markup = super.markup(...arguments);
        markupScale = 4;
        textBase = Markup.textBase();
        textBase.size *= markupScale;
        textBase.lineHeight *= markupScale;
        textBase.style = Asset.markupColorStyle();
        textBase.outline = {
          style: Asset.backgroundColorStyle(),
          width: markupScale
        };
        textBase.position = {
          y: 20,
          origin: Markup.TextOriginPosition.BottomCenter
        };
        arrowBase = {
          width: markupScale,
          arrow: {
            end: true,
            width: markupScale,
            length: markupScale / 2
          },
          style: Asset.markupColorStyle()
        };
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 45,
              y: 150
            }, {
              bezierControlPoints: [{
                x: 45,
                y: 130
              }, {
                x: 25,
                y: 120
              }],
              x: 25,
              y: 100
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 47,
              y: 152,
              origin: Markup.TextOriginPosition.TopCenter
            },
            value: "preview here"
          })
        });
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 45,
              y: 150
            }, {
              bezierControlPoints: [{
                x: 45,
                y: 130
              }, {
                x: 55,
                y: 133
              }],
              x: 60,
              y: 123
            }]
          })
        });
        markup.push({
          line: _.extend({}, arrowBase, {
            points: [{
              x: 185,
              y: 150
            }, {
              bezierControlPoints: [{
                x: 185,
                y: 140
              }, {
                x: 170,
                y: 140
              }],
              x: 160,
              y: 140
            }]
          }),
          text: _.extend({}, textBase, {
            position: {
              x: 185,
              y: 152,
              origin: Markup.TextOriginPosition.TopCenter
            },
            value: "draw here"
          })
        });
        return markup;
      }
    }
    ;
    PerceivedPixelSize.initialize();
    return PerceivedPixelSize;
  }.call(this);
  PerceivedResolution.Completed = function () {
    class Completed extends PerceivedResolution.InstructionsWithBitmaps {
      static id() {
        return "".concat(Asset.id(), ".Completed");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "请注意，我们经常希望在同一艺术品发布在多个地方，无法控制像素看起来有多大。\n人们会在不同设备上看到它，可以放大查看。\n在这种情况下，其他因素，如我们有空 间代表哪些细节，对于选择画布大小可能变得更重要。";
      }
      static activeConditions() {
        var asset;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show when the asset is completed.
        return asset.completed();
      }
    }
    ;
    Completed.initialize();
    return Completed;
  }.call(this);
  return PerceivedResolution;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"smallestdetails.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/size/smallestdetails.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.PixelArtFundamentals.Size.SmallestDetails = function () {
  var Asset;
  class SmallestDetails extends PAA.Tutorials.Drawing.PixelArtFundamentals.Size.AssetWithReferences {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Size.SmallestDetails";
    }
    static displayName() {
      return "Smallest details";
    }
    static description() {
      return "当想要的像素尺寸不那么重要时，我们可以选择像素画尺寸来适应主题的细节。";
    }
    static fixedDimensions() {
      return {
        width: 81,
        height: 80
      };
    }
    static backgroundColor() {
      return new THREE.Color('#1c209e');
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 1,
            g: 1,
            b: 1
          }]
        }]
      });
    }
    static referenceNames() {
      return ['genesis', 'snes', 'nes'];
    }
    static references() {
      var i, len, name, ref, results;
      ref = this.referenceNames();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/smallestdetails-".concat(name, ".jpg"));
      }
      return results;
    }
    static stepsCount() {
      return {
        nes: 16,
        snes: 25,
        genesis: 22
      };
    }
    static resources() {
      var name, number;
      return {
        goalChoices: function () {
          var i, len, ref, results;
          ref = this.referenceNames();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            name = ref[i];
            results.push({
              referenceUrl: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/smallestdetails-".concat(name, ".jpg"),
              steps: function () {
                var j, ref1, results1;
                results1 = [];
                for (number = j = 1, ref1 = this.stepsCount()[name]; 1 <= ref1 ? j <= ref1 : j >= ref1; number = 1 <= ref1 ? ++j : --j) {
                  results1.push({
                    goalPixels: new this.Resource.ImagePixels("/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/smallestdetails-".concat(name, "-").concat(number, ".png"))
                  });
                }
                return results1;
              }.call(this)
            });
          }
          return results;
        }.call(this)
      };
    }
  }
  ;
  SmallestDetails.initialize();
  Asset = SmallestDetails;
  SmallestDetails.ReferencesTrayInstruction = function () {
    class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.Instructions.ReferencesTrayInstruction {
      static id() {
        return "".concat(Asset.id(), ".ReferencesTrayInstruction");
      }
      static assetClass() {
        return Asset;
      }
      static firstAssetClass() {
        return Asset;
      }
      static message() {
        return "打开参考图片栏，选择一个你想画的手柄。";
      }
    }
    ;
    ReferencesTrayInstruction.initialize();
    return ReferencesTrayInstruction;
  }.call(this);
  SmallestDetails.StepInstruction = class StepInstruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction {
    static referenceUrlForName(referenceName) {
      return "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/smallestdetails-".concat(referenceName, ".jpg");
    }
  };
  SmallestDetails.FirstDetailChoice = function () {
    class FirstDetailChoice extends SmallestDetails.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".FirstDetailChoice");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "画参考图时，我们可以决定想要传达的最小细节。\n让我们选择方向键内的圆，用几个像素来表示它的形状。";
      }
    }
    ;
    FirstDetailChoice.initialize();
    return FirstDetailChoice;
  }.call(this);
  SmallestDetails.Outline = function () {
    class Outline extends SmallestDetails.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Outline");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "在它周围画方向键的轮廓。";
      }
    }
    ;
    Outline.initialize();
    return Outline;
  }.call(this);
  SmallestDetails.TheRest = function () {
    class TheRest extends SmallestDetails.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".TheRest");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "画的其余部分从这个选择出发，以达到所需的比例。";
      }
    }
    ;
    TheRest.initialize();
    return TheRest;
  }.call(this);
  SmallestDetails.SecondDetailChoice = function () {
    class SecondDetailChoice extends SmallestDetails.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".SecondDetailChoice");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber(referenceUrl) {
        switch (referenceUrl) {
          case this.referenceUrlForName('nes'):
            return 9;
          case this.referenceUrlForName('snes'):
            return 17;
          case this.referenceUrlForName('genesis'):
            return 14;
        }
      }
      static message() {
        return "如果我们做出不同的选择，我们可以达到更小尺寸并有更多简化。\n让我们用一个简单的十字来表示方向键。";
      }
    }
    ;
    SecondDetailChoice.initialize();
    return SecondDetailChoice;
  }.call(this);
  SmallestDetails.LessImportant = function () {
    class LessImportant extends SmallestDetails.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".LessImportant");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers(referenceUrl) {
        switch (referenceUrl) {
          case this.referenceUrlForName('nes'):
            return [11];
          case this.referenceUrlForName('snes'):
            return [21];
          case this.referenceUrlForName('genesis'):
            return [17, 18];
        }
      }
      static message() {
        return "我们必须开始跳过或不那么重要的细节。";
      }
    }
    ;
    LessImportant.initialize();
    return LessImportant;
  }.call(this);
  SmallestDetails.Context = function () {
    class Context extends SmallestDetails.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Context");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber(referenceUrl) {
        switch (referenceUrl) {
          case this.referenceUrlForName('nes'):
            return 12;
          case this.referenceUrlForName('snes'):
            return 22;
          case this.referenceUrlForName('genesis'):
            return 19;
        }
      }
      static message() {
        return "减少到单个或两个像素的细节仍然可以辨认，如果我们可以从上下文中识别它们的话。";
      }
    }
    ;
    Context.initialize();
    return Context;
  }.call(this);
  SmallestDetails.ThirdDetailChoice = function () {
    class ThirdDetailChoice extends SmallestDetails.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".ThirdDetailChoice");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber(referenceUrl) {
        switch (referenceUrl) {
          case this.referenceUrlForName('nes'):
            return 14;
          case this.referenceUrlForName('snes'):
            return 23;
          case this.referenceUrlForName('genesis'):
            return 20;
        }
      }
      static message() {
        return "这个过程可以继续达到更低的细节水平。\n让我们把方向键变成一个像素，这是它能有的最小尺寸。";
      }
    }
    ;
    ThirdDetailChoice.initialize();
    return ThirdDetailChoice;
  }.call(this);
  return SmallestDetails;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"smallestrecognizablesize.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/size/smallestrecognizablesize.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.PixelArtFundamentals.Size.SmallestRecognizableSize = function () {
  var Asset;
  class SmallestRecognizableSize extends PAA.Tutorials.Drawing.PixelArtFundamentals.Size.AssetWithReferences {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Size.SmallestRecognizableSize";
    }
    static displayName() {
      return "Smallest recognizable size";
    }
    static description() {
      return "要使主题可识别，它们的尺寸需要能够表现其特征外观。";
    }
    static fixedDimensions() {
      return {
        width: 78,
        height: 51
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Pico8;
    }
    static backgroundColor() {
      return {
        paletteColor: {
          ramp: 3,
          shade: 0
        }
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 10; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/smallestrecognizablesize-".concat(step, ".png"));
      }
      return results;
    }
    static references() {
      return [{
        image: {
          url: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/smallestrecognizablesize-jungle.png"
        },
        displayOptions: {
          imageOnly: true
        }
      }];
    }
    initializeSteps() {
      var stepArea;
      super.initializeSteps(...arguments);
      stepArea = this.stepAreas()[0];
      return new this.constructor.GetReference(this, stepArea, {
        stepIndex: 0
      });
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorPicker, PAA.Practice.Software.Tools.ToolKeys.ColorSwatches, PAA.Practice.Software.Tools.ToolKeys.ColorFill]);
    }
  }
  ;
  SmallestRecognizableSize.initialize();
  Asset = SmallestRecognizableSize;
  SmallestRecognizableSize.GetReference = class GetReference extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.EphemeralStep {
    completed() {
      var bitmap;
      // Wait until the image has a displayed reference.
      bitmap = this.tutorialBitmap.bitmap();
      return bitmap.references[0].displayed;
    }
  };
  SmallestRecognizableSize.Reference = function () {
    class Reference extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Reference");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "想象你在画中国棋盘游戏「斗兽棋」。\n从参考图片栏获取棋盘，看到你需要表现的8种动物。";
      }
    }
    ;
    Reference.initialize();
    return Reference;
  }.call(this);
  SmallestRecognizableSize.Rat = function () {
    class Rat extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Rat");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "当我们决定把精灵做多大时，我们需要最小的那个仍然可辨认。\n我们从老鼠开始应用简化，达到可以传达它的最少细节：特征性的弯曲身体和尾巴。";
      }
    }
    ;
    Rat.initialize();
    return Rat;
  }.call(this);
  SmallestRecognizableSize.Cat = function () {
    class Cat extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Cat");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "猫有特征性的头部形状，耳朵相对较大。\n为了让耳朵明显，我们需要头部至少有3像素宽。";
      }
    }
    ;
    Cat.initialize();
    return Cat;
  }.call(this);
  SmallestRecognizableSize.Cat2 = function () {
    class Cat2 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Cat2");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "我们给猫画一个有条纹的身体和较浅的肚子，这是家猫的可识别图案。";
      }
    }
    ;
    Cat2.initialize();
    return Cat2;
  }.call(this);
  SmallestRecognizableSize.Dog = function () {
    class Dog extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Dog");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "狗可以高1个像素来与猫区分。\n下垂的耳朵和更长的鼻子是特征性细节。";
      }
    }
    ;
    Dog.initialize();
    return Dog;
  }.call(this);
  SmallestRecognizableSize.Wolf = function () {
    class Wolf extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Wolf");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 6;
      }
      static message() {
        return "狼有更长的身体和典型的灰棕色毛皮。\n我们像画猫一样画耳朵，但我们把鼻子放在侧面来表现更长的鼻子。";
      }
    }
    ;
    Wolf.initialize();
    return Wolf;
  }.call(this);
  SmallestRecognizableSize.Leopard = function () {
    class Leopard extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Leopard");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 7;
      }
      static message() {
        return "对于豹子，我们结合猫的形状语言和狼的尺寸。\n我们使用交替（抖动）图案来表现它毛皮上的斑点。";
      }
    }
    ;
    Leopard.initialize();
    return Leopard;
  }.call(this);
  SmallestRecognizableSize.Tigers = function () {
    class Tigers extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Tigers");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 8;
      }
      static message() {
        return "老虎是更大的猫，这给了我们足够的空间来描绘它特征性的黑色条纹。";
      }
    }
    ;
    Tigers.initialize();
    return Tigers;
  }.call(this);
  SmallestRecognizableSize.Lion = function () {
    class Lion extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Lion");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 9;
      }
      static message() {
        return "狮子以鬃毛闻名，所以我们给它一个突出的位置。\n庄严的坐姿传达它作为百兽之王的地位。";
      }
    }
    ;
    Lion.initialize();
    return Lion;
  }.call(this);
  SmallestRecognizableSize.Elephant = function () {
    class Elephant extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Elephant");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 10;
      }
      static message() {
        return "最后，大象需要突出的鼻子和象牙，配合它的大耳朵和最大的尺寸。";
      }
    }
    ;
    Elephant.initialize();
    return Elephant;
  }.call(this);
  SmallestRecognizableSize.Smaller = function () {
    class Smaller extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Smaller");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 11;
      }
      static message() {
        return "如果我们试图做得比这更小，我们就必须开始依赖上下文让观众仍然能识别它们。";
      }
    }
    ;
    Smaller.initialize();
    return Smaller;
  }.call(this);
  SmallestRecognizableSize.Completed = function () {
    class Completed extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Completed");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "既然我们先看到了较大的精灵，我们可以将较小的与较大的对应起来。\n但例如老鼠的两个像素本身是看不清的。";
      }
    }
    ;
    Completed.initialize();
    return Completed;
  }.call(this);
  return SmallestRecognizableSize;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"readabilityanalysis.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/pixelartfundamentals/size/readabilityanalysis.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AR, Atari2600, InstructionsSystem, LOI, Markup, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
InstructionsSystem = PAA.PixelPad.Systems.Instructions;
PAA.Tutorials.Drawing.PixelArtFundamentals.Size.ReadabilityAnalysis = function () {
  var Asset;
  class ReadabilityAnalysis extends PAA.Tutorials.Drawing.PixelArtFundamentals.Size.AssetWithReferences {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.PixelArtFundamentals.Size.ReadabilityAnalysis";
    }
    static displayName() {
      return "Readability analysis";
    }
    static description() {
      return "用可读性分析测试电脑是否能识别你的像素画。";
    }
    static fixedDimensions() {
      return {
        width: 32,
        height: 32
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Black;
    }
    static references() {
      return [{
        image: {
          url: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/readabilityanalysis-alarmclock.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            rotate: true
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_08_1k.hdr"
          },
          camera: {
            fieldOfView: 40,
            radialDistance: 0.3,
            azimuthalAngle: AR.Degrees(-20),
            polarAngle: AR.Degrees(70),
            zNear: 0.1,
            zFar: 0.5
          },
          exposureValue: -0.5
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/readabilityanalysis-bicycle.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            rotate: true
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_08_1k.hdr"
          },
          camera: {
            fieldOfView: 40,
            radialDistance: 2.8,
            azimuthalAngle: AR.Degrees(-60),
            polarAngle: AR.Degrees(70),
            zNear: 0.1,
            zFar: 5
          },
          exposureValue: -0.5
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/readabilityanalysis-umbrella.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            rotate: true
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_08_1k.hdr"
          },
          camera: {
            fieldOfView: 40,
            radialDistance: 2.5,
            azimuthalAngle: AR.Degrees(80),
            polarAngle: AR.Degrees(110),
            zNear: 0.1,
            zFar: 5
          },
          exposureValue: -0.5
        }
      }];
    }
    static labels() {
      return ['alarm clock', 'bicycle', 'umbrella'];
    }
    static goalChoices() {
      var i, label, len, ref, results;
      ref = this.labels();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        label = ref[i];
        results.push({
          referenceUrl: "/pixelartacademy/tutorials/drawing/pixelartfundamentals/size/readabilityanalysis-".concat(_.fileCase(label), ".glb"),
          information: {
            label
          }
        });
      }
      return results;
    }
    static readabilityAnalysis() {
      return true;
    }
    static properties() {
      return {
        pixelArtScaling: true,
        readabilityAnalysis: {}
      };
    }
    static markup() {
      return true;
    }
    destroy() {
      var ref, ref1;
      super.destroy(...arguments);
      if ((ref = this.regions) != null) {
        ref.stop();
      }
      return (ref1 = this._readabilityAnalysisRegionsAutorun) != null ? ref1.stop() : void 0;
    }
    _initialize() {
      super._initialize(...arguments);

      // Update readability analysis regions based on the reference.
      this.regions = new AE.LiveComputedField(() => {
        var fixedDimensions, height, i, len, ref, ref1, region, results, stepArea, width, x;
        if (!this.initialized()) {
          return;
        }
        fixedDimensions = this.constructor.fixedDimensions();
        width = fixedDimensions.width;
        height = fixedDimensions.height;

        // Create areas with target labels from step areas.
        x = 0;
        ref = this.stepAreas();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          stepArea = ref[i];
          region = {
            bounds: {
              x,
              y: 0,
              width,
              height
            },
            targetLabel: (ref1 = stepArea.getInformation()) != null ? ref1.label : void 0
          };
          x += width;
          results.push(region);
        }
        return results;
      }, EJSON.equals);
      return this._readabilityAnalysisRegionsAutorun = Tracker.autorun(computation => {
        var bitmap, regions;
        if (!(regions = this.regions())) {
          return;
        }
        if (!(bitmap = this.bitmap())) {
          return;
        }
        return Tracker.nonreactive(() => {
          var currentRegionsCount, historyLength, readabilityAnalysisProperty, ref, ref1, updatePropertyAction;
          // Nothing to do if the regions are the same.
          if (regions.length) {
            currentRegionsCount = ((ref = bitmap.properties.readabilityAnalysis.regions) != null ? ref.length : void 0) || 0;
            if (regions.length === currentRegionsCount && _.objectContains(bitmap.properties.readabilityAnalysis.regions, regions)) {
              return;
            }
          } else {
            if (!bitmap.properties.readabilityAnalysis.regions) {
              return;
            }
          }

          // Only update analysis when we're at the end of history to prevent recalculation when undoing/redoing
          // (in case we change analysis and this would cause new values—history is more important).
          historyLength = ((ref1 = bitmap.history) != null ? ref1.length : void 0) || AM.Document.Versioning.ActionArchive.getHistoryLengthForDocument(bitmap._id);
          if (bitmap.historyPosition !== historyLength) {
            return;
          }
          readabilityAnalysisProperty = {};
          if (regions.length) {
            readabilityAnalysisProperty.regions = regions;
          }
          updatePropertyAction = new LOI.Assets.VisualAsset.Actions.UpdateProperty(this.constructor.id(), bitmap, 'readabilityAnalysis', readabilityAnalysisProperty);
          return bitmap.executeAction(updatePropertyAction, true);
        });
      });
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      new this.constructor.DrawSomethingStep(this, stepArea);
      new this.constructor.OpenReadabilityAnalysisStep(this, stepArea);
      return new this.constructor.PassReadabilityStep(this, stepArea);
    }
  }
  ;
  ReadabilityAnalysis.initialize();
  Asset = ReadabilityAnalysis;
  ReadabilityAnalysis.DrawSomethingStep = class DrawSomethingStep extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.Step {
    // Any pixels are valid to draw.
    hasPixel() {
      return true;
    }
    completed() {
      var bitmap, i, j, ref, ref1, ref2, ref3, x, y;
      if (!(bitmap = this.stepArea.tutorialBitmap.bitmap())) {
        return;
      }
      for (x = i = ref = this.stepArea.bounds.x, ref1 = this.stepArea.bounds.x + this.stepArea.bounds.width; ref <= ref1 ? i < ref1 : i > ref1; x = ref <= ref1 ? ++i : --i) {
        for (y = j = ref2 = this.stepArea.bounds.y, ref3 = this.stepArea.bounds.y + this.stepArea.bounds.height; ref2 <= ref3 ? j < ref3 : j > ref3; y = ref2 <= ref3 ? ++j : --j) {
          if (bitmap.findPixelAtAbsoluteCoordinates(x, y)) {
            return true;
          }
        }
      }
      return false;
    }
  };
  ReadabilityAnalysis.OpenReadabilityAnalysisStep = class OpenReadabilityAnalysisStep extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.EphemeralStep {
    completed() {
      var drawingEditor, readabilityAnalysisView;
      if (super.completed(...arguments)) {
        return true;
      }

      // Readability analysis needs to be open.
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(readabilityAnalysisView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis))) {
        return;
      }
      return readabilityAnalysisView.active();
    }
  };
  ReadabilityAnalysis.PassReadabilityStep = class PassReadabilityStep extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.Step {
    completed() {
      var ref;
      return (ref = this.stepArea.tutorialBitmap.bitmap()) != null ? ref.properties.readabilityAnalysis.passes : void 0;
    }
  };
  ReadabilityAnalysis.ReferencesTrayInstruction = function () {
    class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.Instructions.ReferencesTrayInstruction {
      static id() {
        return "".concat(Asset.id(), ".ReferencesTrayInstruction");
      }
      static assetClass() {
        return Asset;
      }
      static firstAssetClass() {
        return Asset;
      }
      static message() {
        return "打开参考图片栏，选择一个你想画的物体。";
      }
    }
    ;
    ReferencesTrayInstruction.initialize();
    return ReferencesTrayInstruction;
  }.call(this);
  ReadabilityAnalysis.Drawing = class Drawing extends PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction {
    activeConditions() {
      var drawingEditor, readabilityAnalysisView;
      if (!super.activeConditions(...arguments)) {
        return;
      }

      // Show when the readability analysis is closed.
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(readabilityAnalysisView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis))) {
        return;
      }
      return !readabilityAnalysisView.active();
    }
    markup() {
      var asset, divisionX, i, information, len, lineBase, markup, stepArea, stepAreaIndex, stepAreas, style, textBase;
      if (!(asset = this.getActiveAsset())) {
        return [];
      }
      if (!(stepAreas = asset.stepAreas())) {
        return [];
      }
      if (!(stepAreas.length > 1)) {
        return [];
      }
      markup = [];
      style = "#aaa";
      lineBase = {
        style: style,
        width: 0
      };
      textBase = _.extend({}, Markup.textBase(), {
        style
      });
      for (stepAreaIndex = i = 0, len = stepAreas.length; i < len; stepAreaIndex = ++i) {
        stepArea = stepAreas[stepAreaIndex];
        if (information = stepArea.getInformation()) {
          markup.push({
            text: _.extend({}, textBase, {
              position: {
                x: stepAreaIndex * 32 + 16,
                y: -0.5,
                origin: Markup.TextOriginPosition.BottomCenter
              },
              value: information.label
            })
          });
        }
        if (stepAreaIndex) {
          divisionX = stepAreaIndex * 32;
          markup.push({
            line: _.extend({}, lineBase, {
              points: [{
                x: divisionX,
                y: 0
              }, {
                x: divisionX,
                y: 32
              }]
            })
          });
        }
      }
      return markup;
    }
  };
  ReadabilityAnalysis.Rotate = function () {
    class Rotate extends ReadabilityAnalysis.Drawing {
      static id() {
        return "".concat(Asset.id(), ".Rotate");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "用任何你想要的方式传达这个物体。你可以旋转参考图来观察它，但不必在绘画中遵循它。";
      }
    }
    ;
    Rotate.initialize();
    return Rotate;
  }.call(this);
  ReadabilityAnalysis.OpenReadabilityAnalysis = function () {
    class OpenReadabilityAnalysis extends ReadabilityAnalysis.Drawing {
      static id() {
        return "".concat(Asset.id(), ".OpenReadabilityAnalysis");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "当你的画作准备好时打开可读性分析。";
      }
      markup() {
        var clickHereMarkup, markup;
        markup = super.markup(...arguments);
        clickHereMarkup = PAA.Tutorials.Drawing.Markup.bottomRightClickHereMarkup('.pixelartacademy-pixelpad-apps-drawing-editor-desktop-readabilityanalysis', 10);
        markup.push(...clickHereMarkup);
        return markup;
      }
    }
    ;
    OpenReadabilityAnalysis.initialize();
    return OpenReadabilityAnalysis;
  }.call(this);
  ReadabilityAnalysis.Dividers = function () {
    class Dividers extends ReadabilityAnalysis.Drawing {
      static id() {
        return "".concat(Asset.id(), ".Dividers");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static priority() {
        return -1;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
    }
    ;
    Dividers.initialize();
    return Dividers;
  }.call(this);
  ReadabilityAnalysis.ReadabilityAnalysisDescription = class ReadabilityAnalysisDescription extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
    static passes() {
      throw new AE.NotImplementedException("Readability analysis description must say whether it should be displayed when passed or not.");
    }
    static assetClass() {
      return Asset;
    }
    static displaySide() {
      return InstructionsSystem.DisplaySide.Top;
    }
    static delayDuration() {
      return 3;
    }
    activeConditions() {
      var asset, drawingEditor, readabilityAnalysisView, ref;
      // Show when the readability analysis is open.
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(readabilityAnalysisView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.ReadabilityAnalysis))) {
        return;
      }
      if (!readabilityAnalysisView.active()) {
        return;
      }

      // Show when the readability analysis has the correct passes state.
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      return ((ref = asset.bitmap()) != null ? ref.properties.readabilityAnalysis.passes : void 0) === this.constructor.passes();
    }
  };
  ReadabilityAnalysis.ReadabilityAnalysisFail = function () {
    class ReadabilityAnalysisFail extends ReadabilityAnalysis.ReadabilityAnalysisDescription {
      static id() {
        return "".concat(Asset.id(), ".ReadabilityAnalysisFail");
      }
      static passes() {
        return false;
      }
      static message() {
        return "Pixeltosh已经对它能看到的东西进行了分析。\n由于它是一台旧电脑，它不太擅长像人类一样看东西。\n别把它的评估太当回事。\n\n不过，你可以提高你的画的清晰度，使其与其他可能性区分开来。";
      }
    }
    ;
    ReadabilityAnalysisFail.initialize();
    return ReadabilityAnalysisFail;
  }.call(this);
  ReadabilityAnalysis.ReadabilityAnalysisPass = function () {
    class ReadabilityAnalysisPass extends ReadabilityAnalysis.ReadabilityAnalysisDescription {
      static id() {
        return "".concat(Asset.id(), ".ReadabilityAnalysisPass");
      }
      static passes() {
        return true;
      }
      static message() {
        return "Pixeltosh已经对它能看到的东西进行了分析。\n由于它是一台旧电脑，它不太擅长像人类一样看东西。\n别把它的评估太当回事。\n\n不过，你的画足够清晰，它能够正确检测到主题。";
      }
    }
    ;
    ReadabilityAnalysisPass.initialize();
    return ReadabilityAnalysisPass;
  }.call(this);
  return ReadabilityAnalysis;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"simplification":{"simplification.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/simplification.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Simplification = function () {
  class Simplification extends PAA.Practice.Tutorials.Drawing.Tutorial {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.Simplification';
    }
    static fullName() {
      return "简化";
    }
    static assets() {
      return [this.Symbols, this.SymbolicAndRealisticDrawing, this.Silhouette, this.DefiningFeatures, this.StylizedProportions, this.BasicShapes, this.IntentionalSimplification];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.PixelArtFundamentals.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.PixelArtFundamentals.Fundamentals.Content.DrawingTutorials.Simplification);
    }
  }
  ;
  Simplification.initialize();
  return Simplification;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/asset.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Simplification.Asset = class Asset extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static id() {
    return "PixelArtAcademy.Tutorials.Drawing.Simplification.".concat(_.pascalCase(this.displayName()));
  }
  static restrictedPaletteName() {
    return LOI.Assets.Palette.SystemPaletteNames.Black;
  }
  static minClipboardScale() {
    return 2;
  }
  availableToolKeys() {
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.Line, PAA.Practice.Software.Tools.ToolKeys.Rectangle, PAA.Practice.Software.Tools.ToolKeys.Ellipse];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetwithreferences.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/assetwithreferences.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Simplification.AssetWithReferences = class AssetWithReferences extends PAA.Tutorials.Drawing.Simplification.Asset {
  availableToolKeys() {
    return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.References]);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/instructions.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Simplification.ReferencesTrayInstruction = function () {
  class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.Instructions.ReferencesTrayInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.Simplification.ReferencesTrayInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.Simplification.AssetWithReferences;
    }
    static firstAssetClass() {
      return PAA.Tutorials.Drawing.Simplification.Silhouette;
    }
    static message() {
      return "打开参考图片栏，选择一个物体来画。";
    }
  }
  ;
  ReferencesTrayInstruction.initialize();
  return ReferencesTrayInstruction;
}.call(this);
PAA.Tutorials.Drawing.Simplification.MeshMorphingInstruction = class MeshMorphingInstruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
  getMeshMorphing() {
    var asset, bitmapReferences, ref, ref1, ref2, referenceData, stepAreaData;
    if (!(stepAreaData = (ref = this.getStepArea()) != null ? ref.data() : void 0)) {
      return;
    }
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    if (!(bitmapReferences = (ref1 = asset.bitmap()) != null ? ref1.references : void 0)) {
      return;
    }
    if (!(referenceData = _.find(bitmapReferences, reference => {
      return reference.image.url === stepAreaData.referenceUrl;
    }))) {
      return;
    }
    return (ref2 = referenceData.displayOptions) != null ? ref2.meshMorphing : void 0;
  }
  activeConditions() {
    var asset, ref, ref1, referenceData, stepAreaData;
    if (!(asset = this.getActiveAsset())) {
      return;
    }
    if (asset.completed()) {
      return;
    }
    if (!asset.constructor.meshMorphingInstructions) {
      return;
    }
    if (!this.stepAreaActive()) {
      return;
    }
    if (!this.getMeshMorphing()) {
      return;
    }

    // Show modification instructions while input is active on the reference.
    if (!(stepAreaData = (ref = this.getStepArea()) != null ? ref.data() : void 0)) {
      return;
    }
    if (!(referenceData = asset.getReferenceDataForUrl(stepAreaData.referenceUrl))) {
      return;
    }
    return (ref1 = referenceData.displayOptions) != null ? ref1.input : void 0;
  }
};
this.DrawLinesInstruction = function () {
  class DrawLinesInstruction extends PAA.Tutorials.Drawing.Simplification.MeshMorphingInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.Simplification.DrawLinesInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.Simplification.AssetWithReferences;
    }
    static message() {
      return "当你对物体的外观满意时，画出线条。";
    }
    activeConditions() {
      if (!super.activeConditions(...arguments)) {
        return;
      }
      return !this.getStepArea().steps()[0].options.fill;
    }
  }
  ;
  DrawLinesInstruction.initialize();
  return DrawLinesInstruction;
}.call(this);
this.FillSilhouette = function () {
  class FillSilhouette extends PAA.Tutorials.Drawing.Simplification.MeshMorphingInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.Simplification.FillSilhouette";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.Simplification.AssetWithReferences;
    }
    static message() {
      return "当你对物体的外观满意时，填充剪影。";
    }
    activeConditions() {
      if (!super.activeConditions(...arguments)) {
        return;
      }
      return this.getStepArea().steps()[0].options.fill;
    }
  }
  ;
  FillSilhouette.initialize();
  return FillSilhouette;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modelstep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/modelstep.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, AP, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mummification;
AP = Artificial.Pyramid;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Simplification.ModelStep = class ModelStep extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PathStep {
  // Override to select specific meshes from the model.
  static meshSelector(object) {
    return object instanceof THREE.Mesh;
  }

  // Override to define the style of the generated paths.
  static style(fill) {
    return "opacity:1;fill:".concat(fill ? '#000000' : 'none', ";stroke:#000000;stroke-width:0.1;stroke-linecap:square;stroke-linejoin:bevel");
  }
  constructor() {
    super(...arguments);
    this._referenceUrl = new AE.LiveComputedField(() => {
      var stepAreaData;
      if (!(stepAreaData = this.stepArea.data())) {
        return;
      }
      return stepAreaData.referenceUrl;
    });
    this._startedDrawingAutorun = Tracker.autorun(() => {
      var bitmap, hasPixel, historyLength, i, input, j, ref, ref1, ref2, ref3, ref4, ref5, reference, referenceComponent, referenceUrl, x, y;
      if (!this.isActiveStepInArea()) {
        return;
      }
      if (!(referenceComponent = this.referenceComponent())) {
        return;
      }
      if (!(referenceUrl = this._referenceUrl())) {
        return;
      }

      // Only change input if we're at the end of the bitmap history (so we can undo/redo normally).
      bitmap = LOI.Assets.Bitmap.documents.findOne(this.tutorialBitmap.bitmapId());
      historyLength = AM.Document.Versioning.ActionArchive.getHistoryLengthForDocument(bitmap._id);
      if (bitmap.historyPosition !== historyLength) {
        return;
      }
      if (!(reference = _.find(bitmap.references, reference => {
        return reference.image.url === referenceUrl;
      }))) {
        return;
      }
      bitmap.initialize();
      hasPixel = false;
      for (x = i = ref = this.stepArea.bounds.x, ref1 = this.stepArea.bounds.x + this.stepArea.bounds.width; ref <= ref1 ? i < ref1 : i > ref1; x = ref <= ref1 ? ++i : --i) {
        for (y = j = ref2 = this.stepArea.bounds.y, ref3 = this.stepArea.bounds.y + this.stepArea.bounds.height; ref2 <= ref3 ? j < ref3 : j > ref3; y = ref2 <= ref3 ? ++j : --j) {
          if (bitmap.findPixelAtAbsoluteCoordinates(x, y)) {
            hasPixel = true;
            break;
          }
        }
        if (hasPixel) {
          break;
        }
      }
      input = (ref4 = (ref5 = reference.displayOptions) != null ? ref5.input : void 0) != null ? ref4 : true;

      // If any pixels were drawn in this step's area, input should be disabled.
      if (hasPixel && input) {
        return referenceComponent.changeDisplayOptions({
          input: false
        }, true);
      } else if (!(hasPixel || input)) {
        return referenceComponent.changeDisplayOptions({
          input: {}
        }, true);
      }
    });
  }
  destroy() {
    var ref, ref1;
    super.destroy(...arguments);
    this._referenceUrl.stop();
    this._startedDrawingAutorun.stop();
    if ((ref = this.referenceComponent) != null) {
      ref.stop();
    }
    return (ref1 = this.cameraProperties) != null ? ref1.stop() : void 0;
  }
  _initializePaths(svgPaths) {
    var baseCoordinates, camera, cameraManager, i, j, k, len, len1, len2, mesh, meshes, morphTargetIndex, pathElement, polygonalChain, polygonalChains, ref, ref1, referenceComponent, scene, sceneManager, svgPathDStrings, targets, vertex, weight;
    Tracker.nonreactive(() => {
      if (this.referenceComponent == null) {
        this.referenceComponent = new AE.LiveComputedField(() => {
          var drawingEditor, referencesView, stepAreaData;
          if (!(stepAreaData = this.stepArea.data())) {
            return;
          }
          if (!(drawingEditor = this.getEditor())) {
            return;
          }
          if (!(referencesView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.References))) {
            return;
          }
          return referencesView.displayComponent.getReferenceComponentForUrl(stepAreaData.referenceUrl);
        }, (a, b) => {
          return a === b;
        });
      }
      return this.cameraProperties != null ? this.cameraProperties : this.cameraProperties = new AE.LiveComputedField(() => {
        var referenceData, stepAreaData;
        if (!(stepAreaData = this.stepArea.data())) {
          return;
        }
        if (!(referenceData = this.tutorialBitmap.getReferenceDataForUrl(stepAreaData.referenceUrl))) {
          return;
        }
        return referenceData.displayOptions.camera;
      }, EJSON.equals);
    });
    if (!this.isActiveStepInArea()) {
      return;
    }

    // We need a model reference to read its camera and mesh data.
    if (!(referenceComponent = this.referenceComponent())) {
      return;
    }
    if (!(sceneManager = referenceComponent.sceneManager())) {
      return;
    }
    if (!(cameraManager = referenceComponent.cameraManager())) {
      return;
    }

    // Depend on camera properties in the reference so we recalculate only when the camera stops moving.
    this.cameraProperties();
    scene = sceneManager.scene.withUpdates();
    camera = cameraManager.camera.withUpdates();

    // Find all mesh objects in the scene.
    meshes = [];
    scene.traverse(object => {
      if (this.constructor.meshSelector(object)) {
        return meshes.push(object);
      }
    });

    // Create SVG paths from the meshes.
    svgPaths = [];
    for (i = 0, len = meshes.length; i < len; i++) {
      mesh = meshes[i];
      if (!mesh.triangulatedSurface) {
        // Prepare triangulated surface.
        mesh.uniqueVertexIndices = [];
        mesh.triangulatedSurface = AP.TriangulatedSurface.fromBufferGeometry(mesh.geometry, {
          uniqueVertexIndices: mesh.uniqueVertexIndices
        });
      }
      if ((ref = mesh.morphTargetInfluences) != null ? ref.length : void 0) {
        baseCoordinates = mesh.geometry.attributes.position.array;
        targets = function () {
          var j, len1, ref1, results;
          ref1 = mesh.morphTargetInfluences;
          results = [];
          for (morphTargetIndex = j = 0, len1 = ref1.length; j < len1; morphTargetIndex = ++j) {
            weight = ref1[morphTargetIndex];
            results.push({
              coordinates: mesh.geometry.morphAttributes.position[morphTargetIndex].array,
              weight: weight
            });
          }
          return results;
        }();
        mesh.triangulatedSurface.morphVertices(baseCoordinates, targets, mesh.uniqueVertexIndices);
      }

      // Get its silhouette for the current camera and object transform.
      polygonalChains = mesh.triangulatedSurface.getSilhouette(mesh.matrixWorld, camera);
      svgPathDStrings = [];
      for (j = 0, len1 = polygonalChains.length; j < len1; j++) {
        polygonalChain = polygonalChains[j];
        if (!polygonalChain.isClosed()) {
          continue;
        }
        ref1 = polygonalChain.vertices;
        // Transform to step area space.
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          vertex = ref1[k];
          vertex.x = (vertex.x / 2 + 0.5) * this.stepArea.bounds.width;
          vertex.y = (-vertex.y / 2 + 0.5) * this.stepArea.bounds.height;
        }
        svgPathDStrings.push(polygonalChain.getSVGPathDString());
      }
      if (!svgPathDStrings.length) {
        continue;
      }
      pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElement.setAttribute('d', svgPathDStrings.join(' '));
      pathElement.setAttribute('style', this.constructor.style(this.options.fill));
      svgPaths.push(pathElement);
    }
    return super._initializePaths(svgPaths);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"symbols.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/symbols.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Simplification.Symbols = function () {
  var Asset;
  class Symbols extends PAA.Tutorials.Drawing.Simplification.Asset {
    static displayName() {
      return "Symbols";
    }
    static description() {
      return "当我们看世界时，眼睛看到形状，但心里看到的是概念。";
    }
    static fixedDimensions() {
      return {
        width: 157,
        height: 33
      };
    }
    static svgUrl() {
      return "/pixelartacademy/tutorials/drawing/simplification/symbols.svg";
    }
    static breakPathsIntoSteps() {
      return true;
    }
    static pathTolerance() {
      return 1;
    }
  }
  ;
  Symbols.initialize();
  Asset = Symbols;
  Symbols.House = function () {
    class House extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".House");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "作为孩子，我们的画代表了我们生活中的物体和发生的事情。";
      }
    }
    ;
    House.initialize();
    return House;
  }.call(this);
  Symbols.Face = function () {
    class Face extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Face");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "它们不是对我们所看到的事物的真实描绘，而是代表那些事物的简单标记。它们是符号。";
      }
    }
    ;
    Face.initialize();
    return Face;
  }.call(this);
  Symbols.Heart = function () {
    class Heart extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Heart");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "它们捕捉了我们心灵用来组织周围复杂世界的概念。";
      }
    }
    ;
    Heart.initialize();
    return Heart;
  }.call(this);
  Symbols.Sun = function () {
    class Sun extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Sun");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "我们创造和学习这些符号，作为周围事物的约定表示。";
      }
    }
    ;
    Sun.initialize();
    return Sun;
  }.call(this);
  Symbols.Cloud = function () {
    class Cloud extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Cloud");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "如果被要求画什么，我们会复制这些符号，而不是事物实际的样子。";
      }
    }
    ;
    Cloud.initialize();
    return Cloud;
  }.call(this);
  Symbols.Person = function () {
    class Person extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Person");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 6;
      }
      static message() {
        return "如果不发展我们的绘画技能来捕捉眼睛真正看到的东西，我们就会停留在符号绘画的层面。";
      }
    }
    ;
    Person.initialize();
    return Person;
  }.call(this);
  return Symbols;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"symbolicandrealisticdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/symbolicandrealisticdrawing.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA, TutorialBitmap;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAA.Tutorials.Drawing.Simplification.SymbolicAndRealisticDrawing = function () {
  var Asset;
  class SymbolicAndRealisticDrawing extends PAA.Tutorials.Drawing.Simplification.Asset {
    static displayName() {
      return "Symbolic and realistic drawing";
    }
    static description() {
      return "写实绘画和简化绘画都有好处。";
    }
    static fixedDimensions() {
      return {
        width: 107,
        height: 40
      };
    }
    static svgUrl() {
      return "/pixelartacademy/tutorials/drawing/simplification/symbolicandrealisticdrawing.svg";
    }
    static breakPathsIntoSteps() {
      return true;
    }
    static references() {
      return ['/pixelartacademy/tutorials/drawing/simplification/tutankhamun.jpg'];
    }
    initializeSteps() {
      var stepArea;
      super.initializeSteps(...arguments);
      stepArea = this.stepAreas()[0];
      return new this.constructor.GetReference(this, stepArea, {
        stepIndex: 4
      });
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.References]);
    }
  }
  ;
  SymbolicAndRealisticDrawing.initialize();
  Asset = SymbolicAndRealisticDrawing;
  SymbolicAndRealisticDrawing.GetReference = class GetReference extends TutorialBitmap.EphemeralStep {
    completed() {
      var bitmap;
      // Wait until the image has a displayed reference.
      bitmap = this.tutorialBitmap.bitmap();
      return bitmap.references[0].displayed;
    }
  };
  SymbolicAndRealisticDrawing.Hieroglyph = function () {
    class Hieroglyph extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Hieroglyph");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers() {
        return [1, 2, 3, 4];
      }
      static message() {
        return "古埃及象形文字中的「脸」使用简化的形状——符号——来表现面部特征。";
      }
    }
    ;
    Hieroglyph.initialize();
    return Hieroglyph;
  }.call(this);
  SymbolicAndRealisticDrawing.Reference = function () {
    class Reference extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Reference");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "打开参考图片栏，获取可能描绘法老图坦卡蒙实际样子的图片。";
      }
    }
    ;
    Reference.initialize();
    return Reference;
  }.call(this);
  SymbolicAndRealisticDrawing.Real = function () {
    class Real extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Real");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers() {
        return [6, 7, 8, 9];
      }
      static message() {
        return "要画得准确，我们需要看到并捕捉形状和线条的实际样子。";
      }
    }
    ;
    Real.initialize();
    return Real;
  }.call(this);
  SymbolicAndRealisticDrawing.Smiley = function () {
    class Smiley extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Smiley");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers() {
        return [10, 11, 12];
      }
      static message() {
        return "另一方面，简化的脸有能力代表任何人。";
      }
    }
    ;
    Smiley.initialize();
    return Smiley;
  }.call(this);
  return SymbolicAndRealisticDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"intentionalsimplification.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/intentionalsimplification.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.Simplification.IntentionalSimplification = function () {
  var Asset;
  class IntentionalSimplification extends PAA.Tutorials.Drawing.Simplification.Asset {
    static displayName() {
      return "Intentional simplification";
    }
    static description() {
      return "当我们能够写实绘画并应用简化时，我们可以控制如何以及在多大程度上风格化我们的绘画。";
    }
    static fixedDimensions() {
      return {
        width: 168,
        height: 88
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.ZXSpectrum;
    }
    static backgroundColor() {
      return {
        paletteColor: {
          ramp: 0,
          shade: 0
        }
      };
    }
    static steps() {
      var i, results, step;
      results = [];
      for (step = i = 1; i <= 5; step = ++i) {
        results.push("/pixelartacademy/tutorials/drawing/simplification/intentionalsimplification-".concat(step, ".png"));
      }
      return results;
    }
    static markup() {
      return true;
    }
    static bitmapInfo() {
      return "Artwork from games published by Code Masters, Firebird, Grandslam, Imagine, Made in Spain, Microsphere,\nMirrorsoft, Ocean, Sinclair Research, and Ultimate Play The Game.";
    }
    static bitmapInfoClass() {
      return 'small-print';
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.ColorPicker, PAA.Practice.Software.Tools.ToolKeys.ColorSwatches]);
    }
  }
  ;
  IntentionalSimplification.initialize();
  Asset = IntentionalSimplification;
  IntentionalSimplification.Spectrum = function () {
    class Spectrum extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Spectrum");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "艺术存在于写实和符号表示之间的光谱上。";
      }
    }
    ;
    Spectrum.initialize();
    return Spectrum;
  }.call(this);
  IntentionalSimplification.Stylization = function () {
    class Stylization extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Stylization");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "简化的程度导致了不同的艺术风格——风格化——每种都有自己的情感表达优势。";
      }
    }
    ;
    Stylization.initialize();
    return Stylization;
  }.call(this);
  IntentionalSimplification.Details = function () {
    class Details extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Details");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "艺术家选择包含或省略细节，以清晰传达他们的信息。";
      }
    }
    ;
    Details.initialize();
    return Details;
  }.call(this);
  IntentionalSimplification.Shapes = function () {
    class Shapes extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Shapes");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "他们扭曲或平滑形状来唤起他们想要的情感。";
      }
    }
    ;
    Shapes.initialize();
    return Shapes;
  }.call(this);
  IntentionalSimplification.Simple = function () {
    class Simple extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Simple");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 5;
      }
      static message() {
        return "简单的艺术风格不是因为缺乏技能，而通常是故意的选择，有时甚至需要更多的技能来实现。";
      }
    }
    ;
    Simple.initialize();
    return Simple;
  }.call(this);
  IntentionalSimplification.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static activeDisplayState() {
        // We only have markup without a message.
        return PAA.PixelPad.Systems.Instructions.DisplayState.Hidden;
      }
      markup() {
        var asset, gameIndex, i, markup, palette, textBase, textColor;
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        markup = [];
        textBase = _.extend(Markup.textBase(), {
          size: 10,
          lineHeight: 12,
          outline: null
        });
        palette = asset.palette();
        for (gameIndex = i = 0; i <= 12; gameIndex = ++i) {
          textColor = palette.color(this.constructor.gameNames.colors[gameIndex], 1);
          markup.push({
            text: _.extend({}, textBase, {
              value: this.constructor.gameNames.texts[gameIndex],
              style: "#".concat(textColor.getHexString()),
              position: {
                x: this.constructor.gameNames.xs[gameIndex],
                y: this.constructor.gameNames.ys[gameIndex % 2],
                origin: this.constructor.gameNames.textOriginPositions[gameIndex % 2]
              }
            })
          });
        }
        return markup;
      }
    }
    ;
    Complete.initialize();
    Complete.gameNames = {
      texts: ["Green\nBeret", "Peter\nBeardsley's\nInternational\nFootball", "Dizzy", "I Ball II", "Dynamite\nDan", "Skool\nDaze", "Sir\nFred", "Underwurlde", "Rick\nDangerous", "Head\nover\nHeels", "Stop\nthe\nExpress", "Atic\nAtac", "Cookie"],
      colors: [5, 7, 7, 7, 5, 6, 6, 7, 4, 6, 4, 7, 7],
      xs: [17, 29, 151, 140, 39, 49, 59, 70, 81, 93, 105, 118, 127],
      ys: [76, 12],
      textOriginPositions: [Markup.TextOriginPosition.TopCenter, Markup.TextOriginPosition.BottomCenter]
    };
    return Complete;
  }.call(this);
  return IntentionalSimplification;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"definingfeatures.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/definingfeatures.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Simplification.DefiningFeatures = function () {
  var Asset;
  class DefiningFeatures extends PAA.Tutorials.Drawing.Simplification.AssetWithReferences {
    static displayName() {
      return "Defining features";
    }
    static description() {
      return "简化时，选择物体最重要、最具标志性的部分来画。";
    }
    static fixedDimensions() {
      return {
        width: 50,
        height: 50
      };
    }
    static references() {
      return [{
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/definingfeatures-pizza.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshVisibility: true
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_08_1k.hdr"
          },
          camera: {
            frustum: {
              width: 0.2,
              height: 0.2
            }
          },
          meshVisibility: {
            amountVisible: 1,
            sizePreference: 0.5,
            sizeMeasurementAxes: {
              x: true,
              z: true
            }
          }
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/definingfeatures-house.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshVisibility: true
          },
          background: {
            color: "#92c1e3"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/symmetrical_garden_1k.hdr"
          },
          camera: {
            frustum: {
              width: 110,
              height: 110
            },
            zNear: 1,
            zFar: 1000,
            radialDistance: 100,
            polarAngle: AR.Degrees(90),
            azimuthalAngle: -AR.Degrees(90)
          },
          meshVisibility: {
            amountVisible: 1,
            sizePreference: 0.5,
            sizeMeasurementAxes: {
              y: true,
              z: true
            }
          }
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/definingfeatures-boombox.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshVisibility: true
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_08_1k.hdr"
          },
          camera: {
            frustum: {
              width: 1,
              height: 1
            },
            polarAngle: AR.Degrees(90),
            radialDistance: 2
          },
          exposureValue: 0.5,
          meshVisibility: {
            amountVisible: 1,
            sizePreference: 0.5,
            sizeMeasurementAxes: {
              x: true,
              y: true
            }
          }
        }
      }];
    }
    static goalChoices() {
      return [{
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/definingfeatures-pizza.glb"
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/definingfeatures-house.glb"
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/definingfeatures-boombox.glb"
      }];
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      // Create line art drawing step.
      return new this.constructor.LineArtStep(this, stepArea, {
        drawHintsAfterCompleted: false,
        tolerance: 1,
        svgPaths: () => {} // Dummy function to trigger reactive path generation.
      });
    }
  }
  ;
  DefiningFeatures.initialize();
  Asset = DefiningFeatures;
  DefiningFeatures.LineArtStep = class LineArtStep extends PAA.Tutorials.Drawing.Simplification.ModelStep {
    static meshSelector(object) {
      return object instanceof THREE.Mesh && object.visible;
    }
  };
  DefiningFeatures.Instruction = class Instruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
    getMeshVisibility() {
      var asset, bitmapReferences, ref, ref1, ref2, referenceData, stepAreaData;
      if (!(stepAreaData = (ref = this.getStepArea()) != null ? ref.data() : void 0)) {
        return;
      }
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(bitmapReferences = (ref1 = asset.bitmap()) != null ? ref1.references : void 0)) {
        return;
      }
      if (!(referenceData = _.find(bitmapReferences, reference => {
        return reference.image.url === stepAreaData.referenceUrl;
      }))) {
        return;
      }
      return (ref2 = referenceData.displayOptions) != null ? ref2.meshVisibility : void 0;
    }
    getLiveMeshVisibility() {
      var drawingEditor, ref, referenceComponent, referencesView, sceneManager, stepAreaData;
      if (!(stepAreaData = (ref = this.getStepArea()) != null ? ref.data() : void 0)) {
        return;
      }
      if (!(drawingEditor = this.getEditor())) {
        return;
      }
      if (!(referencesView = drawingEditor.interface.getView(PAA.PixelPad.Apps.Drawing.Editor.Desktop.References))) {
        return;
      }
      if (!(referenceComponent = referencesView.displayComponent.getReferenceComponentForUrl(stepAreaData.referenceUrl))) {
        return;
      }
      if (!(sceneManager = referenceComponent.sceneManager())) {
        return;
      }
      return sceneManager.meshVisibilityProperties();
    }
    activeConditions() {
      var asset, ref, ref1, referenceData, stepAreaData;
      // Show modification instructions while input is active on the reference.
      if (!this.stepAreaActive()) {
        return;
      }
      if (!(stepAreaData = (ref = this.getStepArea()) != null ? ref.data() : void 0)) {
        return;
      }
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(referenceData = asset.getReferenceDataForUrl(stepAreaData.referenceUrl))) {
        return;
      }
      return (ref1 = referenceData.displayOptions) != null ? ref1.input : void 0;
    }
    static resetCompletedConditions() {
      return !this.getActiveAsset();
    }
  };
  DefiningFeatures.AdjustAmount = function () {
    class AdjustAmount extends DefiningFeatures.Instruction {
      static id() {
        return "".concat(Asset.id(), ".AdjustAmount");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "悬停在参考图片的中心，左右拖动来改变物体有多少部分可见。";
      }
      static priority() {
        return 2;
      }
      completedConditions() {
        if (!this.stepAreaActive()) {
          return;
        }
        return this.getMeshVisibility();
      }
    }
    ;
    AdjustAmount.initialize();
    return AdjustAmount;
  }.call(this);
  DefiningFeatures.AdjustSizePreference = function () {
    class AdjustSizePreference extends DefiningFeatures.Instruction {
      static id() {
        return "".concat(Asset.id(), ".AdjustSizePreference");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "在参考图上上下拖动来改变哪些细节被移除。";
      }
      static priority() {
        return 1;
      }
      completedConditions() {
        var meshVisibility, ref;
        if (!this.stepAreaActive()) {
          return;
        }
        if (!(meshVisibility = this.getLiveMeshVisibility())) {
          return;
        }
        return (ref = meshVisibility.sizePreference) === 0 || ref === 1;
      }
    }
    ;
    AdjustSizePreference.initialize();
    return AdjustSizePreference;
  }.call(this);
  DefiningFeatures.Draw = function () {
    class Draw extends DefiningFeatures.Instruction {
      static id() {
        return "".concat(Asset.id(), ".Draw");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "当你对物体的外观满意时，画出线条。";
      }
    }
    ;
    Draw.initialize();
    return Draw;
  }.call(this);
  return DefiningFeatures;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stylizedproportions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/stylizedproportions.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA, TutorialBitmap;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAA.Tutorials.Drawing.Simplification.StylizedProportions = function () {
  var Asset;
  class StylizedProportions extends PAA.Tutorials.Drawing.Simplification.AssetWithReferences {
    static displayName() {
      return "Stylized proportions";
    }
    static description() {
      return "你可以改变物体部分的大小来获得更清晰的表达。";
    }
    static fixedDimensions() {
      return {
        width: 50,
        height: 50
      };
    }
    static references() {
      return [{
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/stylizedproportions-scissors.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshMorphing: {
              horizontal: "Key 1"
            }
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_03_1k.hdr"
          },
          camera: {
            fieldOfView: 40,
            radialDistance: 0.3,
            azimuthalAngle: AR.Degrees(-90)
          },
          exposureValue: -1.5,
          meshMorphing: {
            "Key 1": 0
          }
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/stylizedproportions-house.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshMorphing: {
              horizontal: "Key 1"
            }
          },
          background: {
            color: "#92c1e3"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/symmetrical_garden_1k.hdr"
          },
          camera: {
            frustum: {
              width: 105,
              height: 105
            },
            zNear: 1,
            zFar: 1000,
            radialDistance: 100,
            polarAngle: AR.Degrees(90),
            azimuthalAngle: -AR.Degrees(90)
          },
          meshMorphing: {
            "Key 1": 0
          }
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/stylizedproportions-clock.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshMorphing: {
              horizontal: "Key 1"
            }
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_03_1k.hdr"
          },
          camera: {
            frustum: {
              width: 0.18,
              height: 0.18
            },
            polarAngle: AR.Degrees(90)
          },
          exposureValue: -0.5,
          meshMorphing: {
            "Key 1": 0
          }
        }
      }];
    }
    static goalChoices() {
      return [{
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/stylizedproportions-scissors.glb",
        information: {
          fill: true
        }
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/stylizedproportions-house.glb"
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/stylizedproportions-clock.glb"
      }];
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      var ref, ref1;
      // Create line art drawing step.
      return new PAA.Tutorials.Drawing.Simplification.ModelStep(this, stepArea, {
        fill: (ref = stepResources.information) != null ? ref.fill : void 0,
        drawHintsAfterCompleted: false,
        tolerance: 1,
        strokeStyle: ((ref1 = stepResources.information) != null ? ref1.fill : void 0) ? TutorialBitmap.PathStep.StrokeStyles.None : TutorialBitmap.PathStep.StrokeStyles.Solid,
        svgPaths: () => {} // Dummy function to trigger reactive path generation.
      });
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorFill]);
    }
  }
  ;
  StylizedProportions.meshMorphingInstructions = true;
  StylizedProportions.initialize();
  Asset = StylizedProportions;
  StylizedProportions.AdjustAmount = function () {
    class AdjustAmount extends PAA.Tutorials.Drawing.Simplification.MeshMorphingInstruction {
      static id() {
        return "".concat(Asset.id(), ".AdjustAmount");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "悬停在参考图片的中心，拖动来简化物体的比例。";
      }
      activeConditions() {
        if (!this.stepAreaActive()) {
          return;
        }
        return !this.getMeshMorphing();
      }
    }
    ;
    AdjustAmount.initialize();
    return AdjustAmount;
  }.call(this);
  return StylizedProportions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"basicshapes.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/basicshapes.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA, TutorialBitmap;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAA.Tutorials.Drawing.Simplification.BasicShapes = function () {
  var Asset;
  class BasicShapes extends PAA.Tutorials.Drawing.Simplification.AssetWithReferences {
    static displayName() {
      return "Basic shapes";
    }
    static description() {
      return "将形状简化为基本对应物，以获得简洁、易读或风格化的外观。";
    }
    static fixedDimensions() {
      return {
        width: 50,
        height: 50
      };
    }
    static references() {
      return [{
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/basicshapes-scissors.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshMorphing: {
              horizontal: "Key 1"
            }
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_03_1k.hdr"
          },
          camera: {
            fieldOfView: 40,
            radialDistance: 0.3,
            azimuthalAngle: AR.Degrees(-90)
          },
          exposureValue: -1.5,
          meshMorphing: {
            "Key 1": 0
          }
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/basicshapes-house.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshMorphing: {
              horizontal: "Key 1"
            }
          },
          background: {
            color: "#92c1e3"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/symmetrical_garden_1k.hdr"
          },
          camera: {
            frustum: {
              width: 105,
              height: 105
            },
            zNear: 1,
            zFar: 1000,
            radialDistance: 100,
            polarAngle: AR.Degrees(90),
            azimuthalAngle: -AR.Degrees(90)
          },
          meshMorphing: {
            "Key 1": 0
          }
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/basicshapes-sword.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            meshMorphing: {
              horizontal: "Key 1"
            }
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_03_1k.hdr"
          },
          camera: {
            frustum: {
              width: 1,
              height: 1
            },
            polarAngle: AR.Degrees(90)
          },
          exposureValue: -2,
          meshMorphing: {
            "Key 1": 0
          }
        }
      }];
    }
    static goalChoices() {
      return [{
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/basicshapes-scissors.glb",
        information: {
          fill: true
        }
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/basicshapes-house.glb"
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/basicshapes-sword.glb"
      }];
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      var ref, ref1;
      // Create line art drawing step.
      return new PAA.Tutorials.Drawing.Simplification.ModelStep(this, stepArea, {
        fill: (ref = stepResources.information) != null ? ref.fill : void 0,
        drawHintsAfterCompleted: false,
        tolerance: 1,
        strokeStyle: ((ref1 = stepResources.information) != null ? ref1.fill : void 0) ? TutorialBitmap.PathStep.StrokeStyles.None : TutorialBitmap.PathStep.StrokeStyles.Solid,
        svgPaths: () => {} // Dummy function to trigger reactive path generation.
      });
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorFill]);
    }
  }
  ;
  BasicShapes.initialize();
  BasicShapes.meshMorphingInstructions = true;
  Asset = BasicShapes;
  BasicShapes.SilhouetteStep = class SilhouetteStep extends PAA.Tutorials.Drawing.Simplification.ModelStep {
    static style() {
      return 'opacity:1;fill:#000000;stroke:#000000;stroke-width:0.1;stroke-linecap:square;stroke-linejoin:bevel';
    }
  };
  BasicShapes.Instruction = class Instruction extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
    getMeshMorphing() {
      var asset, bitmapReferences, ref, ref1, ref2, referenceData, stepAreaData;
      if (!(stepAreaData = (ref = this.getStepArea()) != null ? ref.data() : void 0)) {
        return;
      }
      if (!(asset = this.getActiveAsset())) {
        return;
      }
      if (!(bitmapReferences = (ref1 = asset.bitmap()) != null ? ref1.references : void 0)) {
        return;
      }
      if (!(referenceData = _.find(bitmapReferences, reference => {
        return reference.image.url === stepAreaData.referenceUrl;
      }))) {
        return;
      }
      return (ref2 = referenceData.displayOptions) != null ? ref2.meshMorphing : void 0;
    }
  };
  BasicShapes.AdjustAmount = function () {
    class AdjustAmount extends BasicShapes.Instruction {
      static id() {
        return "".concat(Asset.id(), ".AdjustAmount");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "悬停在参考图片的中心，拖动来简化物体的形状。";
      }
      activeConditions() {
        if (!this.stepAreaActive()) {
          return;
        }
        return !this.getMeshMorphing();
      }
    }
    ;
    AdjustAmount.initialize();
    return AdjustAmount;
  }.call(this);
  return BasicShapes;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"silhouette":{"silhouette.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/silhouette/silhouette.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AR, LOI, PAA, TutorialBitmap;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
PAA.Tutorials.Drawing.Simplification.Silhouette = function () {
  var Asset;
  class Silhouette extends PAA.Tutorials.Drawing.Simplification.AssetWithReferences {
    static displayName() {
      return "Silhouette";
    }
    static description() {
      return "开始简化的地方之一是画出物体最可识别的形状。";
    }
    static fixedDimensions() {
      return {
        width: 50,
        height: 50
      };
    }
    static references() {
      return [{
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/silhouette-scissors.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            rotate: true
          },
          background: {
            color: "#808080"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/studio_small_03_1k.hdr"
          },
          camera: {
            fieldOfView: 40,
            radialDistance: 0.25,
            polarAngle: AR.Degrees(90)
          },
          exposureValue: -1.5
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/silhouette-house.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            rotate: true
          },
          background: {
            color: "#92c1e3"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/symmetrical_garden_1k.hdr"
          },
          camera: {
            frustum: {
              width: 150,
              height: 150
            },
            zNear: 1,
            zFar: 1000,
            radialDistance: 100
          }
        }
      }, {
        image: {
          url: "/pixelartacademy/tutorials/drawing/simplification/silhouette-ship.glb"
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.Model,
          input: {
            rotate: true
          },
          background: {
            color: "#92c1e3"
          },
          environment: {
            url: "/artificial/spectrum/environments/polyhaven/qwantani_noon_puresky_1k.hdr"
          },
          camera: {
            frustum: {
              width: 45,
              height: 45
            },
            zNear: 1,
            zFar: 1000,
            radialDistance: 100
          },
          exposureValue: -0.5
        }
      }];
    }
    static goalChoices() {
      return [{
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/silhouette-scissors.glb",
        information: {
          goalRotation: {
            azimuthalAngle: AR.Degrees(0),
            polarAngle: AR.Degrees(0),
            angleTolerance: AR.Degrees(30)
          }
        }
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/silhouette-house.glb",
        information: {
          goalRotation: {
            azimuthalAngle: AR.Degrees(90),
            polarAngle: AR.Degrees(90),
            angleTolerance: AR.Degrees(15)
          }
        }
      }, {
        referenceUrl: "/pixelartacademy/tutorials/drawing/simplification/silhouette-ship.glb",
        information: {
          goalRotation: {
            azimuthalAngle: AR.Degrees(90),
            polarAngle: AR.Degrees(90),
            angleTolerance: AR.Degrees(30)
          }
        }
      }];
    }
    initializeStepsInAreaWithResources(stepArea, stepResources) {
      // Create reference rotation step.
      new this.constructor.RotateStep(this, stepArea, {
        fill: true,
        goalRotation: stepResources.information.goalRotation,
        strokeStyle: TutorialBitmap.PathStep.StrokeStyles.None,
        fillStyle: TutorialBitmap.PathStep.FillStyles.Solid,
        svgPaths: () => {} // Dummy function to trigger reactive path generation.
      });

      // Create silhouette drawing step.
      return new PAA.Tutorials.Drawing.Simplification.ModelStep(this, stepArea, {
        fill: true,
        drawHintsAfterCompleted: false,
        tolerance: 1,
        strokeStyle: TutorialBitmap.PathStep.StrokeStyles.None,
        svgPaths: () => {} // Dummy function to trigger reactive path generation.
      });
    }
    availableToolKeys() {
      return super.availableToolKeys(...arguments).concat([PAA.Practice.Software.Tools.ToolKeys.ColorFill]);
    }
  }
  ;
  Silhouette.initialize();
  Asset = Silhouette;
  Silhouette.Adjust = function () {
    class Adjust extends PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Adjust");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "悬停在参考图片的中心，拖动来旋转物体。选择一个仅从轮廓就能清晰描述物体的旋转角度。";
      }
    }
    ;
    Adjust.initialize();
    return Adjust;
  }.call(this);
  Silhouette.Draw = function () {
    class Draw extends PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Draw");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "填充物体的剪影来表现这个物体。";
      }
      activeConditions() {
        var asset, ref, ref1, referenceData, stepAreaData;
        if (!super.activeConditions(...arguments)) {
          return;
        }

        // Show instruction while input is active on the reference.
        if (!(stepAreaData = (ref = this.getStepArea()) != null ? ref.data() : void 0)) {
          return;
        }
        if (!(asset = this.getActiveAsset())) {
          return;
        }
        if (!(referenceData = asset.getReferenceDataForUrl(stepAreaData.referenceUrl))) {
          return;
        }
        return (ref1 = referenceData.displayOptions) != null ? ref1.input : void 0;
      }
    }
    ;
    Draw.initialize();
    return Draw;
  }.call(this);
  Silhouette.Complete = function () {
    class Complete extends PAA.Tutorials.Drawing.Instructions.Multiarea.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Complete");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "有了清晰的剪影，我们甚至不需要添加内部细节，物体就可以被识别。";
      }
    }
    ;
    Complete.initialize();
    return Complete;
  }.call(this);
  return Silhouette;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rotatestep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/simplification/silhouette/rotatestep.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AR, LOI, PAA, TutorialBitmap, _currentAxis;
AB = Artificial.Babel;
AM = Artificial.Mummification;
AR = Artificial.Reality;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
_currentAxis = new THREE.Vector3();
PAA.Tutorials.Drawing.Simplification.Silhouette.RotateStep = class RotateStep extends PAA.Tutorials.Drawing.Simplification.ModelStep {
  constructor() {
    super(...arguments);
    this.goalAxis = new THREE.Vector3().setFromSphericalCoords(1, this.options.goalRotation.polarAngle, this.options.goalRotation.azimuthalAngle);
    this.goalCosineTolerance = Math.cos(this.options.goalRotation.angleTolerance);
  }
  completed() {
    var camera, cosineDifference, referenceData, stepAreaData;
    // Skip PathStep's completed implementation and go straight to the Step parent.
    if (!TutorialBitmap.Step.prototype.completed.apply(this, ...arguments)) {
      return;
    }
    if (!(stepAreaData = this.stepArea.data())) {
      return;
    }
    if (!(referenceData = this.tutorialBitmap.getReferenceDataForUrl(stepAreaData.referenceUrl))) {
      return;
    }
    camera = referenceData.displayOptions.camera;
    _currentAxis.setFromSphericalCoords(1, camera.polarAngle || 0, camera.azimuthalAngle || 0);

    // Cosine difference is the better the closest to 1 it is.
    cosineDifference = Math.abs(this.goalAxis.dot(_currentAxis));
    return cosineDifference >= this.goalCosineTolerance;
  }
  solve() {
    var asset, reference, stepAreaData, updateReferenceAction;
    stepAreaData = this.stepArea.data();
    asset = this.tutorialBitmap.getAssetData();
    reference = _.find(asset.references, function (reference) {
      return reference.url === stepAreaData.referenceUrl;
    });
    // Update the camera rotation to the goal values.
    updateReferenceAction = new LOI.Assets.VisualAsset.Actions.UpdateReference(this.tutorialBitmap.id(), bitmap, reference.image._id, {
      displayOptions: {
        camera: {
          azimuthalAngle: this.options.goalRotation.azimuthalAngle,
          polarAngle: this.options.goalRotation.polarAngle
        }
      }
    });
    return AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, updateReferenceAction, new Date());
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"design":{"design.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/design.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design = class Design extends PAA.Practice.Tutorials.Drawing.Tutorial {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shapelanguage":{"shapelanguage.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/shapelanguage.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage = function () {
  class ShapeLanguage extends PAA.Tutorials.Drawing.Design {
    static id() {
      return 'PixelArtAcademy.Tutorials.Drawing.Design.ShapeLanguage';
    }
    static fullName() {
      return "形状语言";
    }
    static assets() {
      return [this.ShapesInNature, this.Circle, this.Circle2, this.Square, this.Square2, this.Triangle, this.Triangle2, this.ShapeCombinations, this.BreakingTheRules];
    }
    content() {
      var chapter;
      if (!(chapter = LOI.adventure.getCurrentChapter(PAA.LearnMode.Design.Fundamentals))) {
        return;
      }
      return chapter.getContent(PAA.LearnMode.Design.Fundamentals.Content.DrawingTutorials.ShapeLanguage);
    }
  }
  ;
  ShapeLanguage.initialize();
  return ShapeLanguage;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/asset.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage.Asset = class Asset extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static id() {
    return "PixelArtAcademy.Tutorials.Drawing.Design.ShapeLanguage.".concat(_.pascalCase(this.displayName()));
  }
  static lessonFileName() {
    return _.toLower(_.pascalCase(this.displayName()));
  }
  static createResourceUrl(fileName) {
    return "/pixelartacademy/tutorials/drawing/design/shapelanguage/".concat(fileName);
  }
  static createLessonResourceUrl(fileName) {
    return this.createResourceUrl("".concat(this.lessonFileName(), "-").concat(fileName));
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shapesasset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/shapesasset.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage.ShapesAsset = class ShapesAsset extends PAA.Tutorials.Drawing.Design.ShapeLanguage.Asset {
  static svgUrl() {
    return "/pixelartacademy/tutorials/drawing/design/shapelanguage/".concat(_.fileCase(this.displayName()), ".svg");
  }
  static breakPathsIntoSteps() {
    return true;
  }
  availableToolKeys() {
    return [PAA.Practice.Software.Tools.ToolKeys.Pencil, PAA.Practice.Software.Tools.ToolKeys.Eraser, PAA.Practice.Software.Tools.ToolKeys.ColorFill, PAA.Practice.Software.Tools.ToolKeys.Zoom, PAA.Practice.Software.Tools.ToolKeys.MoveCanvas, PAA.Practice.Software.Tools.ToolKeys.Undo, PAA.Practice.Software.Tools.ToolKeys.Redo, PAA.Practice.Software.Tools.ToolKeys.Line, PAA.Practice.Software.Tools.ToolKeys.Rectangle, PAA.Practice.Software.Tools.ToolKeys.Ellipse];
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assetwithreferences.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/assetwithreferences.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AE,
  LOI,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences = class AssetWithReferences extends PAA.Tutorials.Drawing.Design.ShapeLanguage.Asset {
  static referenceNames() {
    throw new AE.NotImplementedException("Asset with references must provide reference names.");
  }
  static bitmapInfoTextsForReferences() {
    throw new AE.NotImplementedException("Asset with references must provide info texts.");
  }
  static cartridgeTypesForReferences() {
    throw new AE.NotImplementedException("Asset with references must provide cartridge types.");
  }
  static rampsCountForReferences() {
    var i, len, name, ref, results;
    ref = this.referenceNames();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      // Override if references have more than one ramp.
      results.push(1);
    }
    return results;
  }
  static rampIndicesForReferenceUrls() {
    var currentIndex, i, len, name, rampIndicesForReferenceUrls, rampsCountForReference, rampsCountForReferences, ref, ref1, referenceIndex;
    rampsCountForReferences = this.rampsCountForReferences();
    rampIndicesForReferenceUrls = {};
    currentIndex = 0;
    ref = this.referenceNames();
    for (referenceIndex = i = 0, len = ref.length; i < len; referenceIndex = ++i) {
      name = ref[referenceIndex];
      rampsCountForReference = rampsCountForReferences[referenceIndex];
      rampIndicesForReferenceUrls[this.createReferenceUrl(name)] = function () {
        var results = [];
        for (var j = currentIndex, ref1 = currentIndex + rampsCountForReference; currentIndex <= ref1 ? j < ref1 : j > ref1; currentIndex <= ref1 ? j++ : j--) {
          results.push(j);
        }
        return results;
      }.apply(this);
      currentIndex += rampsCountForReference;
    }
    return rampIndicesForReferenceUrls;
  }
  static createReferenceUrl(fileName) {
    return this.createResourceUrl("".concat(fileName, ".png"));
  }
  static customPaletteImageUrl() {
    return this.createLessonResourceUrl("template.png");
  }
  static references() {
    var cartridgeType, cartridgeTypesForReferences, i, len, name, ref, referenceIndex, results;
    cartridgeTypesForReferences = this.cartridgeTypesForReferences();
    ref = this.referenceNames();
    results = [];
    for (referenceIndex = i = 0, len = ref.length; i < len; referenceIndex = ++i) {
      name = ref[referenceIndex];
      cartridgeType = cartridgeTypesForReferences[referenceIndex];
      results.push({
        image: {
          url: this.createReferenceUrl(name)
        },
        displayOptions: {
          type: PAA.PixelPad.Apps.Drawing.Editor.ReferenceDisplayTypes.SceneObject,
          styleClass: "cartridge cartridge-".concat(_.toLower(cartridgeType)),
          scale: 0.25
        }
      });
    }
    return results;
  }
  static resources() {
    var name;
    return {
      goalChoices: function () {
        var i, len, ref, results;
        ref = this.referenceNames();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          name = ref[i];
          results.push({
            referenceUrl: this.createReferenceUrl(name),
            step1: new this.Resource.SvgPaths(this.createLessonResourceUrl("".concat(name, ".svg"))),
            step2: new this.Resource.ImagePixels(this.createLessonResourceUrl("".concat(name, "-1.png"))),
            step3: new this.Resource.ImagePixels(this.createLessonResourceUrl("".concat(name, "-2.png")))
          });
        }
        return results;
      }.call(this)
    };
  }
  _initialize() {
    var rampIndicesForReferenceUrls;
    super._initialize(...arguments);
    rampIndicesForReferenceUrls = this.constructor.rampIndicesForReferenceUrls();

    // Disable and enable ramp shades depending if the reference has been chosen.
    this.enabledPaletteRampIndices = new AE.LiveComputedField(() => {
      var assetData, enabledPaletteRampIndices, i, len, stepArea, stepAreas;
      if (!(assetData = this.getAssetData())) {
        return [];
      }
      enabledPaletteRampIndices = [];
      if (stepAreas = assetData.stepAreas) {
        for (i = 0, len = stepAreas.length; i < len; i++) {
          stepArea = stepAreas[i];
          if (stepArea.referenceUrl) {
            enabledPaletteRampIndices.push(...rampIndicesForReferenceUrls[stepArea.referenceUrl]);
          }
        }
      }
      return enabledPaletteRampIndices;
    }, EJSON.equals);
    return this._enabledPaletteRampsAutorun = Tracker.autorun(computation => {
      var bitmapData, bitmapId, enabledPaletteRampIndices;
      if (!(this.initialized() && this.resourcesReady())) {
        return;
      }
      if (!(bitmapId = this.bitmapId())) {
        return;
      }
      if (!(bitmapData = LOI.Assets.Bitmap.documents.findOne(bitmapId, {
        fields: {
          customPalette: 1
        }
      }))) {
        return;
      }
      enabledPaletteRampIndices = this.enabledPaletteRampIndices();
      return Tracker.nonreactive(() => {
        var changed, i, len, ramp, rampIndex, ref;
        changed = false;
        ref = bitmapData.customPalette.ramps;
        for (rampIndex = i = 0, len = ref.length; i < len; rampIndex = ++i) {
          ramp = ref[rampIndex];
          if (indexOf.call(enabledPaletteRampIndices, rampIndex) >= 0 && !ramp.shades.length) {
            changed = true;
            ramp.shades = ramp.disabledShades;
          }
          if (ramp.shades.length && indexOf.call(enabledPaletteRampIndices, rampIndex) < 0) {
            changed = true;
            ramp.disabledShades = ramp.shades;
            ramp.shades = [];
          }
        }
        if (!changed) {
          return;
        }

        // Update persistent document.
        bitmapData.lastEditTime = new Date();
        LOI.Assets.Bitmap.documents.update(bitmapId, {
          $set: bitmapData
        });

        // Trigger reactivity.
        return LOI.Assets.Bitmap.versionedDocuments.reportNonVersionedChange(bitmapId);
      });
    });
  }
  destroy() {
    var ref, ref1;
    super.destroy(...arguments);
    if ((ref = this.enabledPaletteRampIndices) != null) {
      ref.stop();
    }
    return (ref1 = this._enabledPaletteRampsAutorun) != null ? ref1.stop() : void 0;
  }
  initializeStepsInAreaWithResources(stepArea, stepResources) {
    // Create shapes step.
    new this.constructor.PathStep(this, stepArea, {
      svgPaths: stepResources.step1.svgPaths(),
      preserveCompleted: true,
      hasPixelsWhenInactive: false
    });

    // Create silhouette step.
    new this.constructor.PixelsStep(this, stepArea, {
      goalPixels: stepResources.step2,
      preserveCompleted: true,
      hasPixelsWhenInactive: false
    });

    // Create colors step.
    return new this.constructor.PixelsStep(this, stepArea, {
      goalPixels: stepResources.step3,
      hasPixelsWhenInactive: false
    });
  }
  bitmapInfo() {
    var assetData, bitmapInfoTextsForReferences, i, len, ref, ref1, referenceIndex, references, stepArea, texts;
    assetData = this.getAssetData();
    if (!((ref = assetData.stepAreas) != null ? ref.length : void 0)) {
      return;
    }
    references = this.constructor.references();
    bitmapInfoTextsForReferences = this.constructor.bitmapInfoTextsForReferences();
    texts = [];
    ref1 = assetData.stepAreas;
    for (i = 0, len = ref1.length; i < len; i++) {
      stepArea = ref1[i];
      if (!stepArea.referenceUrl) {
        continue;
      }
      referenceIndex = _.findIndex(references, reference => {
        return reference.image.url === stepArea.referenceUrl;
      });
      texts.push(bitmapInfoTextsForReferences[referenceIndex]);
    }
    if (!texts.length) {
      return;
    }
    return "Artwork from ".concat(AB.Rules.English.createNounSeries(texts), ".");
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"referencestrayinstruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/referencestrayinstruction.coffee         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage.ReferencesTrayInstruction = function () {
  class ReferencesTrayInstruction extends PAA.Tutorials.Drawing.Instructions.ReferencesTrayInstruction {
    static id() {
      return "PixelArtAcademy.Tutorials.Drawing.Design.ShapeLanguage.ReferencesTrayInstruction";
    }
    static assetClass() {
      return PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences;
    }
    static firstAssetClass() {
      return PAA.Tutorials.Drawing.Design.ShapeLanguage.Circle2;
    }
    static message() {
      return "打开参考图片栏，选择一个你想学习的游戏。";
    }
  }
  ;
  ReferencesTrayInstruction.initialize();
  ReferencesTrayInstruction.More = function () {
    class More extends PAA.Tutorials.Drawing.Instructions.Multiarea.Instruction {
      static id() {
        return "PixelArtAcademy.Tutorials.Drawing.Design.ShapeLanguage.ReferencesTrayInstruction.More";
      }
      static assetClass() {
        return PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences;
      }
      static message() {
        return "选择另一个参考来学习更多，或回到作品集来完成课程。";
      }
      static priority() {
        return -1;
      }
      activeConditions() {
        var activeStepAreaIndex, asset, bitmap, ref;
        if (!(asset = this.getActiveAsset())) {
          return;
        }

        // Show once the active area is completed.
        activeStepAreaIndex = this.activeStepAreaIndex();
        if (activeStepAreaIndex == null) {
          return;
        }
        if (!((ref = asset.stepAreas()[activeStepAreaIndex]) != null ? ref.completed() : void 0)) {
          return;
        }

        // Show if there are any references left to be drawn.
        bitmap = asset.bitmap();
        return bitmap.references.length > asset.stepAreas().length;
      }
    }
    ;
    More.initialize();
    return More;
  }.call(this);
  return ReferencesTrayInstruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shapesinnature.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/shapesinnature.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, Markup, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
PAA.Tutorials.Drawing.Design.ShapeLanguage.ShapesInNature = function () {
  var Asset;
  class ShapesInNature extends PAA.Tutorials.Drawing.Design.ShapeLanguage.Asset {
    static displayName() {
      return "Shapes in nature";
    }
    static description() {
      return "我们在世界上看到的形状给我们情感。";
    }
    static fixedDimensions() {
      return {
        width: 131,
        height: 63
      };
    }
    static restrictedPaletteName() {
      return LOI.Assets.Palette.SystemPaletteNames.Pico8;
    }
    static backgroundColor() {
      return {
        paletteColor: {
          ramp: 7,
          shade: 0
        }
      };
    }
    static resources() {
      return {
        paths: new this.Resource.SvgPaths(this.createResourceUrl("".concat(this.lessonFileName(), ".svg"))),
        circles: new this.Resource.ImagePixels(this.createLessonResourceUrl("1.png")),
        squares: new this.Resource.ImagePixels(this.createLessonResourceUrl("2.png")),
        triangles: new this.Resource.ImagePixels(this.createLessonResourceUrl("3.png"))
      };
    }
    static markup() {
      return true;
    }
    initializeSteps() {
      var fixedDimensions, stepArea, stepAreaBounds, svgPaths;
      fixedDimensions = this.constructor.fixedDimensions();
      stepAreaBounds = {
        x: 0,
        y: 0,
        width: fixedDimensions.width,
        height: fixedDimensions.height
      };
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);
      svgPaths = Array.from(this.resources.paths.svgPaths());

      // Circle
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: [svgPaths[0]]
      });
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: svgPaths.slice(1, 3),
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.circles
      });

      // Square
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: [svgPaths[3]]
      });
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: svgPaths.slice(4, 6),
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });
      new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.squares
      });

      // Triangle
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: [svgPaths[6]]
      });
      new this.constructor.PathStep(this, stepArea, {
        svgPaths: svgPaths.slice(7, 9),
        preserveCompleted: true,
        hasPixelsWhenInactive: false
      });
      return new this.constructor.PixelsStep(this, stepArea, {
        goalPixels: this.resources.triangles
      });
    }
  }
  ;
  ShapesInNature.initialize();
  Asset = ShapesInNature;
  ShapesInNature.Circle = function () {
    class Circle extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Circle");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "圆是最友好的基本形状。没有角落，它是柔软的、Q弹的、易于接近的。";
      }
    }
    ;
    Circle.initialize();
    return Circle;
  }.call(this);
  ShapesInNature.Circle2 = function () {
    class Circle2 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Circle2");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers() {
        return [2, 3];
      }
      static message() {
        return "营养丰富的水果或幼小动物通常有圆润的形状，唤起幸福和纯真。";
      }
    }
    ;
    Circle2.initialize();
    return Circle2;
  }.call(this);
  ShapesInNature.Square = function () {
    class Square extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Square");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 4;
      }
      static message() {
        return "正方形显得稳固和踏实，提供稳定性和支持。";
      }
    }
    ;
    Square.initialize();
    return Square;
  }.call(this);
  ShapesInNature.Square2 = function () {
    class Square2 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Square2");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers() {
        return [5, 6];
      }
      static message() {
        return "悬崖和台地等岩层给予永恒和安全的感觉。";
      }
    }
    ;
    Square2.initialize();
    return Square2;
  }.call(this);
  ShapesInNature.Triangle = function () {
    class Triangle extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Triangle");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 7;
      }
      static message() {
        return "三角形是尖锐和紧张的。";
      }
    }
    ;
    Triangle.initialize();
    return Triangle;
  }.call(this);
  ShapesInNature.Triangle2 = function () {
    class Triangle2 extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Triangle2");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumbers() {
        return [8, 9];
      }
      static message() {
        return "尖牙、角、刺和荆棘用于攻击和防御，表示力量和危险。";
      }
    }
    ;
    Triangle2.initialize();
    return Triangle2;
  }.call(this);
  ShapesInNature.Completed = function () {
    class Completed extends PAA.Tutorials.Drawing.Instructions.CompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Completed");
      }
      static assetClass() {
        return Asset;
      }
      static message() {
        return "这就是形状如何直观地传达意义和情感。";
      }
      markup() {
        var textBase;
        textBase = Markup.textBase();
        textBase.size *= 2;
        textBase.lineHeight *= 2;
        textBase.position = {
          y: 43,
          origin: Markup.TextOriginPosition.TopCenter
        };
        textBase.outline = {
          style: "#fff1e8"
        };
        return [{
          text: _.merge({}, textBase, {
            position: {
              x: 20
            },
            value: "friendly\nplayful\nsoft\nlight\nsquishy"
          })
        }, {
          text: _.merge({}, textBase, {
            position: {
              x: 65
            },
            value: "strong\nstable\nreliable\nsupportive\nrigid"
          })
        }, {
          text: _.merge({}, textBase, {
            position: {
              x: 110
            },
            value: "sharp\ndangerous\ndynamic\nunpredictable\ntense"
          })
        }];
      }
    }
    ;
    Completed.initialize();
    return Completed;
  }.call(this);
  return ShapesInNature;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"circle.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/circle.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage.Circle = function () {
  var Asset;
  class Circle extends PAA.Tutorials.Drawing.Design.ShapeLanguage.ShapesAsset {
    static displayName() {
      return "Circle";
    }
    static description() {
      return "一种唤起安全、联系、和谐、活泼和温暖的形状。";
    }
    static fixedDimensions() {
      return {
        width: 72,
        height: 33
      };
    }
    static backgroundColor() {
      return new THREE.Color('#a6e2fe');
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 0,
            g: 128 / 255,
            b: 136 / 255
          }]
        }]
      });
    }
  }
  ;
  Circle.initialize();
  Asset = Circle;
  Circle.Circle = function () {
    class Circle extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Circle");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "圆没有边，没有上或下，没有左或右。这可以象征统一和完整。";
      }
    }
    ;
    Circle.initialize();
    return Circle;
  }.call(this);
  Circle.Ellipse = function () {
    class Ellipse extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Ellipse");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "圆润的形状以诱人的方式引导我们的眼睛。";
      }
    }
    ;
    Ellipse.initialize();
    return Ellipse;
  }.call(this);
  Circle.Blob = function () {
    class Blob extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Blob");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "弯曲的表面显得多变和无害。";
      }
    }
    ;
    Blob.initialize();
    return Blob;
  }.call(this);
  return Circle;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"circle2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/circle2.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, CartridgeTypes, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
CartridgeTypes = PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject.Cartridge.Types;
PAA.Tutorials.Drawing.Design.ShapeLanguage.Circle2 = function () {
  var Asset;
  class Circle2 extends PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences {
    static displayName() {
      return "Circle 2";
    }
    static description() {
      return "圆的形状语言常用于设计主角和其他友好或可爱的角色。";
    }
    static fixedDimensions() {
      return {
        width: 29,
        height: 32
      };
    }
    static backgroundColor() {
      return new THREE.Color('#a6e2fe');
    }
    static referenceNames() {
      return ['dragonwarrior', 'kirbysdreamland2', 'supermariobros2'];
    }
    static bitmapInfoTextsForReferences() {
      return ["Dragon Quest (Chunsoft, 1986)", "Kirby's Dream Land 2 (HAL Laboratory, 1995)", "Super Mario Bros. 2 (Nintendo, 1988)"];
    }
    static cartridgeTypesForReferences() {
      return [CartridgeTypes.NES, CartridgeTypes.GameBoy, CartridgeTypes.NES];
    }
  }
  ;
  Circle2.initialize();
  Asset = Circle2;
  Circle2.DragonWarrior = class DragonWarrior extends PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction {
    static assetClass() {
      return Asset;
    }
    static referenceUrl() {
      return Asset.createReferenceUrl('dragonwarrior');
    }
  };
  Circle2.DragonWarrior1 = function () {
    class DragonWarrior1 extends Circle2.DragonWarrior {
      static id() {
        return "".concat(Asset.id(), ".DragonWarrior1");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "《勇者斗恶龙》（又名《龙战士》）中最具标志性的角色之一是史莱姆敌人，\n以其基于圆形形状语言的可爱外观而闻名。";
      }
    }
    ;
    DragonWarrior1.initialize();
    return DragonWarrior1;
  }.call(this);
  Circle2.DragonWarrior2 = function () {
    class DragonWarrior2 extends Circle2.DragonWarrior {
      static id() {
        return "".concat(Asset.id(), ".DragonWarrior2");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "《勇者斗恶龙》创作者Yuji Horii最初把它画成一堆威胁性的不规则粘液，\n但艺术家鸟山明（《龙珠》作者）把它变成了我们今天所知的标志性水滴形状。";
      }
    }
    ;
    DragonWarrior2.initialize();
    return DragonWarrior2;
  }.call(this);
  Circle2.DragonWarrior3 = function () {
    class DragonWarrior3 extends Circle2.DragonWarrior {
      static id() {
        return "".concat(Asset.id(), ".DragonWarrior3");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "圆润的外观和它的微笑成功传达了它是最弱的、实际上无害的敌人。";
      }
    }
    ;
    DragonWarrior3.initialize();
    return DragonWarrior3;
  }.call(this);
  Circle2.Kirby = class Kirby extends PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction {
    static assetClass() {
      return Asset;
    }
    static referenceUrl() {
      return Asset.createReferenceUrl('kirbysdreamland2');
    }
  };
  Circle2.Kirby1 = function () {
    class Kirby1 extends Circle2.Kirby {
      static id() {
        return "".concat(Asset.id(), ".Kirby1");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "卡比德的圆形设计在开发过程中最初只是一个简单的占位符，\n但结果比之前计划的设计更适合游戏。";
      }
    }
    ;
    Kirby1.initialize();
    return Kirby1;
  }.call(this);
  Circle2.Kirby2 = function () {
    class Kirby2 extends Circle2.Kirby {
      static id() {
        return "".concat(Asset.id(), ".Kirby2");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "设计师樱井政博想要创造「一个每个人都会喜欢的可爱主角」。";
      }
    }
    ;
    Kirby2.initialize();
    return Kirby2;
  }.call(this);
  Circle2.Kirby3 = function () {
    class Kirby3 extends Circle2.Kirby {
      static id() {
        return "".concat(Asset.id(), ".Kirby3");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "当时的程序员、后来的任天堂总裁岩田聪补充说，他们「给了卡比一个简单的圆形设计，这样任何人都可以画他」。";
      }
    }
    ;
    Kirby3.initialize();
    return Kirby3;
  }.call(this);
  Circle2.Mario = class Mario extends PAA.Tutorials.Drawing.Instructions.Multiarea.StepInstruction {
    static assetClass() {
      return Asset;
    }
    static referenceUrl() {
      return Asset.createReferenceUrl('supermariobros2');
    }
  };
  Circle2.Mario1 = function () {
    class Mario1 extends Circle2.Mario {
      static id() {
        return "".concat(Asset.id(), ".Mario1");
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "马里奥友好、卡通的设计——通过圆形形状语言实现——与任天堂将游戏定位为家庭活动的理念紧密一致。";
      }
    }
    ;
    Mario1.initialize();
    return Mario1;
  }.call(this);
  Circle2.Mario2 = function () {
    class Mario2 extends Circle2.Mario {
      static id() {
        return "".concat(Asset.id(), ".Mario2");
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "角色设计师宫本茂描述道：\n「我认为马里奥的魅力之一在于他是一个非常容易理解的角色。\n他是个好人。他是你想成为的人。」";
      }
    }
    ;
    Mario2.initialize();
    return Mario2;
  }.call(this);
  Circle2.Mario3 = function () {
    class Mario3 extends Circle2.Mario {
      static id() {
        return "".concat(Asset.id(), ".Mario3");
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "观察一切是如何用曲线画的，从头和身体等大形状到手脚和鼻子等小形状。";
      }
    }
    ;
    Mario3.initialize();
    return Mario3;
  }.call(this);
  return Circle2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"square.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/square.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage.Square = function () {
  var Asset;
  class Square extends PAA.Tutorials.Drawing.Design.ShapeLanguage.ShapesAsset {
    static displayName() {
      return "Square";
    }
    static description() {
      return "一种看起来强大、稳重、严肃的形状。";
    }
    static fixedDimensions() {
      return {
        width: 73,
        height: 33
      };
    }
    static backgroundColor() {
      return new THREE.Color('#6c6c6c');
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 248 / 255,
            g: 246 / 255,
            b: 248 / 255
          }]
        }]
      });
    }
  }
  ;
  Square.initialize();
  Asset = Square;
  Square.Square = function () {
    class Square extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Square");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "正方形是一个可靠的结构块，可以承受压力。";
      }
    }
    ;
    Square.initialize();
    return Square;
  }.call(this);
  Square.Horizontal = function () {
    class Horizontal extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Horizontal");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "矩形可以给我们提供庇护或作为功能表面，传达信任或严肃。";
      }
    }
    ;
    Horizontal.initialize();
    return Horizontal;
  }.call(this);
  Square.Vertical = function () {
    class Vertical extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Vertical");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "当它们高耸时，它们显得强大、不可动摇或僵硬。";
      }
    }
    ;
    Vertical.initialize();
    return Vertical;
  }.call(this);
  return Square;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"square2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/square2.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, CartridgeTypes, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
CartridgeTypes = PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject.Cartridge.Types;
PAA.Tutorials.Drawing.Design.ShapeLanguage.Square2 = function () {
  var Asset;
  class Square2 extends PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences {
    static displayName() {
      return "Square 2";
    }
    static description() {
      return "正方形形状语言可用于设计强大或严肃的角色。";
    }
    static fixedDimensions() {
      return {
        width: 26,
        height: 28
      };
    }
    static backgroundColor() {
      return new THREE.Color('#6c6c6c');
    }
    static referenceNames() {
      return ['thelegendofzeldalinksawakeningdx', 'metalslug1stmission', 'advancewars'];
    }
    static bitmapInfoTextsForReferences() {
      return ["The Legend of Zelda: Link's Awakening DX (Nintendo, 1998)", "Metal Slug 1st Mission (Ukiyotei, 1999)", "Advance Wars (Intelligent Systems, 2001)"];
    }
    static cartridgeTypesForReferences() {
      return [CartridgeTypes.GameBoy, CartridgeTypes.NeoGeoPocket, CartridgeTypes.GameBoyAdvance];
    }
    static rampsCountForReferences() {
      return [1, 1, 2];
    }
  }
  ;
  Square2.initialize();
  Asset = Square2;
  Square2.Zelda = function () {
    class Zelda extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Zelda");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('thelegendofzeldalinksawakeningdx');
      }
      static message() {
        return "《塞尔达传说》系列的黑暗骑士是重甲骑士。\n正方形的外观强化了他们作为游戏中 formidable 的对手形象。";
      }
    }
    ;
    Zelda.initialize();
    return Zelda;
  }.call(this);
  Square2.MetalSlug = function () {
    class MetalSlug extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".MetalSlug");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('metalslug1stmission');
      }
      static message() {
        return "《合金弹头》系列的马尔科·罗西，像许多动作游戏主角一样，\n展现他肌肉发达的长方形身材，确立他为游戏的主要英雄。";
      }
    }
    ;
    MetalSlug.initialize();
    return MetalSlug;
  }.call(this);
  Square2.AdvanceWars = function () {
    class AdvanceWars extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".AdvanceWars");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('advancewars');
      }
      static message() {
        return "《高级战争》中的中型坦克是所有单位中最方块的，\n表明它对大多数其他单位具有 superior 防御能力。";
      }
    }
    ;
    AdvanceWars.initialize();
    return AdvanceWars;
  }.call(this);
  return Square2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"triangle.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/triangle.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Drawing.Design.ShapeLanguage.Triangle = function () {
  var Asset;
  class Triangle extends PAA.Tutorials.Drawing.Design.ShapeLanguage.ShapesAsset {
    static displayName() {
      return "Triangle";
    }
    static description() {
      return "一种从动态到危险的通用形状。";
    }
    static fixedDimensions() {
      return {
        width: 65,
        height: 31
      };
    }
    static backgroundColor() {
      return new THREE.Color('#febe96');
    }
    static customPalette() {
      return new LOI.Assets.Palette({
        ramps: [{
          shades: [{
            r: 156 / 255,
            g: 66 / 255,
            b: 132 / 255
          }]
        }]
      });
    }
  }
  ;
  Triangle.initialize();
  Asset = Triangle;
  Triangle.Up = function () {
    class Up extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Up");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 1;
      }
      static message() {
        return "正三角形给人平衡和神圣的感觉。";
      }
    }
    ;
    Up.initialize();
    return Up;
  }.call(this);
  Triangle.Right = function () {
    class Right extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Right");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 2;
      }
      static message() {
        return "横向三角形有方向性，可以传达动作或行动。";
      }
    }
    ;
    Right.initialize();
    return Right;
  }.call(this);
  Triangle.Down = function () {
    class Down extends PAA.Tutorials.Drawing.Instructions.StepInstruction {
      static id() {
        return "".concat(Asset.id(), ".Down");
      }
      static assetClass() {
        return Asset;
      }
      static stepNumber() {
        return 3;
      }
      static message() {
        return "倒三角形给人强大的感觉，但也难以预测。";
      }
    }
    ;
    Down.initialize();
    return Down;
  }.call(this);
  return Triangle;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"triangle2.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/triangle2.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, CartridgeTypes, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
CartridgeTypes = PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject.Cartridge.Types;
PAA.Tutorials.Drawing.Design.ShapeLanguage.Triangle2 = function () {
  var Asset;
  class Triangle2 extends PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences {
    static displayName() {
      return "Triangle 2";
    }
    static description() {
      return "三角形形状语言在反派和积极或强大的角色中很受欢迎。";
    }
    static fixedDimensions() {
      return {
        width: 60,
        height: 62
      };
    }
    static backgroundColor() {
      return new THREE.Color('#febe96');
    }
    static referenceNames() {
      return ['dragonwarrior', 'pokemonredversion', 'dayofthetentacle'];
    }
    static bitmapInfoTextsForReferences() {
      return ["Dragon Quest (Chunsoft, 1986)", "Pokémon Red Version (Game Freak, 1996)", "Day of the Tentacle (LucasArts, 1993)"];
    }
    static cartridgeTypesForReferences() {
      return [CartridgeTypes.NES, CartridgeTypes.GameBoy, CartridgeTypes.CD];
    }
  }
  ;
  Triangle2.initialize();
  Asset = Triangle2;
  Triangle2.DragonWarrior = function () {
    class DragonWarrior extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".DragonWarrior");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('dragonwarrior');
      }
      static message() {
        return "《勇者斗恶龙》中的龙是强大的敌人，旨在向玩家灌输恐惧。\n遇到它们标志着一个难度飙升，你从与普通怪物战斗变成与传奇对手战斗。";
      }
    }
    ;
    DragonWarrior.initialize();
    return DragonWarrior;
  }.call(this);
  Triangle2.Pokemon = function () {
    class Pokemon extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Pokemon");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('pokemonredversion');
      }
      static message() {
        return "据说胡iba基基的IQ为5000，使其成为最终的精神战胜物质的宝可梦。\n它的三角形设计传达了它智力敏锐，让它强大而不需要身体强壮。";
      }
    }
    ;
    Pokemon.initialize();
    return Pokemon;
  }.call(this);
  Triangle2.DayOfTheTentacle = function () {
    class DayOfTheTentacle extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".DayOfTheTentacle");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('dayofthetentacle');
      }
      static message() {
        return "尽管《Tentacle的Day》中的紫色触手没有使用倒三角形作为身体，\n向下指的愤怒眉毛明确地标志他是反派。";
      }
    }
    ;
    DayOfTheTentacle.initialize();
    return DayOfTheTentacle;
  }.call(this);
  return Triangle2;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"shapecombinations.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/shapecombinations.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, CartridgeTypes, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
CartridgeTypes = PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject.Cartridge.Types;
PAA.Tutorials.Drawing.Design.ShapeLanguage.ShapeCombinations = function () {
  var Asset;
  class ShapeCombinations extends PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences {
    static displayName() {
      return "Shape combinations";
    }
    static description() {
      return "角色通常用不同的形状设计，\n以传达他们多维的性格，或者只是实现其他审美或功能目标。";
    }
    static fixedDimensions() {
      return {
        width: 38,
        height: 45
      };
    }
    static backgroundColor() {
      return new THREE.Color('#fee28e');
    }
    static referenceNames() {
      return ['sonicthehedgehog', 'metalslug1stmission', 'megaman2'];
    }
    static bitmapInfoTextsForReferences() {
      return ["Sonic the Hedgehog (1991, SEGA)", "Metal Slug 1st Mission (Ukiyotei, 1999)", "Mega Man 2 (Capcom, 1988)"];
    }
    static cartridgeTypesForReferences() {
      return [CartridgeTypes.Genesis, CartridgeTypes.NeoGeoPocket, CartridgeTypes.NES];
    }
    static rampsCountForReferences() {
      return [4, 1, 1];
    }
  }
  ;
  ShapeCombinations.initialize();
  Asset = ShapeCombinations;
  ShapeCombinations.Sonic = function () {
    class Sonic extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Sonic");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('sonicthehedgehog');
      }
      static message() {
        return "索尼克的剪影是卡通圆和空气动力学三角形的完美结合。\n他大的、三角形的脚进一步强调了他对速度的关注。";
      }
    }
    ;
    Sonic.initialize();
    return Sonic;
  }.call(this);
  ShapeCombinations.MetalSlug = function () {
    class MetalSlug extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".MetalSlug");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('metalslug1stmission');
      }
      static message() {
        return "同名超级坦克《Metal Slug》远非缓慢、不可摧毁的坦克。\n凭借其敏捷性甚至跳跃能力，它的形状更适合三角形而不是矩形。\n然而，整体三角形由多个圆组成，与该系列幽默、轻松的艺术风格相匹配。";
      }
    }
    ;
    MetalSlug.initialize();
    return MetalSlug;
  }.call(this);
  ShapeCombinations.MegaMan = function () {
    class MegaMan extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".MegaMan");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('megaman2');
      }
      static message() {
        return "《Mega Man 2》的木头人像树干一样，取决于视角既是正方形又是圆形。\n他的木制盔甲坚固而有弹性，但容易被火和刀刃伤害。\n这个形式在视觉上匹配他保护自然的坚定立场。";
      }
    }
    ;
    MegaMan.initialize();
    return MegaMan;
  }.call(this);
  return ShapeCombinations;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"breakingtherules.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/drawing/design/shapelanguage/breakingtherules.coffee                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, CartridgeTypes, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
CartridgeTypes = PAA.PixelPad.Apps.Drawing.Editor.Desktop.References.DisplayComponent.Reference.SceneObject.Cartridge.Types;
PAA.Tutorials.Drawing.Design.ShapeLanguage.BreakingTheRules = function () {
  var Asset;
  class BreakingTheRules extends PAA.Tutorials.Drawing.Design.ShapeLanguage.AssetWithReferences {
    static displayName() {
      return "Breaking the rules";
    }
    static description() {
      return "使用具有对立意义的形状可以掩盖角色的本质并创造有趣的对比。";
    }
    static fixedDimensions() {
      return {
        width: 44,
        height: 58
      };
    }
    static backgroundColor() {
      return new THREE.Color('#783ca6');
    }
    static referenceNames() {
      return ['sonicthehedgehog', 'samandmaxhittheroad', 'monkeyisland2'];
    }
    static bitmapInfoTextsForReferences() {
      return ["Sonic the Hedgehog (Sega, 1991)", "Sam & Max Hit the Road (LucasArts, 1993)", "Monkey Island 2: LeChuck's Revenge (LucasArts, 1991)"];
    }
    static cartridgeTypesForReferences() {
      return [CartridgeTypes.Genesis, CartridgeTypes.FloppyDisk, CartridgeTypes.FloppyDisk];
    }
    static rampsCountForReferences() {
      return [4, 1, 4];
    }
  }
  ;
  BreakingTheRules.initialize();
  Asset = BreakingTheRules;
  BreakingTheRules.Eggman = function () {
    class Eggman extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Eggman");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('sonicthehedgehog');
      }
      static message() {
        return "并非每个反派都是三角形。「蛋人」博士 Robotnik 使用圆圈使他成为一个更愚蠢和自大的卡通反派，而不是威胁或可怕。";
      }
    }
    ;
    Eggman.initialize();
    return Eggman;
  }.call(this);
  BreakingTheRules.Max = function () {
    class Max extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Max");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('samandmaxhittheroad');
      }
      static message() {
        return "马克斯混乱性格在他可爱、圆形外表上的唯一暗示是他尖锐牙齿的露齿笑。";
      }
    }
    ;
    Max.initialize();
    return Max;
  }.call(this);
  BreakingTheRules.Guybrush = function () {
    class Guybrush extends PAA.Tutorials.Drawing.Instructions.Multiarea.UncompletedInstruction {
      static id() {
        return "".concat(Asset.id(), ".Guybrush");
      }
      static assetClass() {
        return Asset;
      }
      static referenceUrl() {
        return Asset.createReferenceUrl('monkeyisland2');
      }
      static message() {
        return "Guybrush Threepwood的严肃姿态，配上巨大戏剧性的海盗外套，\n展示了Guybrush在《Monkey Island 2: LeChuck's Revenge》中如何认为自己是真正的海盗。\n然而在下面，他仍然是我们认识和喜欢的笨蛋。";
      }
    }
    ;
    Guybrush.initialize();
    return Guybrush;
  }.call(this);
  return BreakingTheRules;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"planning":{"planning.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/planning/planning.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Planning = class Planning {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions":{"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/planning/instructions/instructions.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Planning.Instructions = class Instructions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instruction.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/planning/instructions/instruction.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Planning.Instructions.Instruction = function () {
  class Instruction extends PAA.PixelPad.Systems.Instructions.Instruction {
    static getStudyPlan() {
      return PAA.PixelPad.Apps.StudyPlan.getApp();
    }
    static getBlueprint() {
      var blueprint, ref;
      if (!(blueprint = (ref = this.getStudyPlan()) != null ? ref.blueprint() : void 0)) {
        return;
      }
      if (!blueprint.isCreated()) {
        return;
      }
      return blueprint;
    }
    static getGoalComponent(goalOrGoalId) {
      var blueprint, goalComponent, goalComponentsById, goalId;
      goalId = _.thingId(goalOrGoalId);
      if (!(blueprint = this.getBlueprint())) {
        return;
      }
      if (!(goalComponentsById = blueprint.goalComponentsById())) {
        return;
      }
      if (!(goalComponent = goalComponentsById[goalId])) {
        return;
      }
      if (!goalComponent.isCreated()) {
        return;
      }
      return goalComponent;
    }
    getStudyPlan() {
      return this.constructor.getStudyPlan();
    }
    getBlueprint() {
      return this.constructor.getBlueprint();
    }
    getGoalComponent() {
      return this.constructor.getGoalComponent(...arguments);
    }
  }
  ;

  // The default amount of time before we show instructions to the user to let them figure it out themselves.
  Instruction.defaultDelayDuration = 3;
  return Instruction;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"studyplan":{"studyplan.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/planning/instructions/studyplan/studyplan.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Tutorials.Planning.Instructions.StudyPlan = function () {
  class StudyPlan extends PAA.PixelPad.Systems.Instructions {
    static id() {
      return 'PixelArtAcademy.Tutorials.Planning.Instructions.StudyPlan';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    static fullName() {
      return "学习计划说明";
    }
    static description() {
      return "学习计划应用中按需显示信息的系统。";
    }
  }
  ;
  StudyPlan.register(StudyPlan.id());
  StudyPlan.initialize();
  return StudyPlan;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.studyplan.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-tutorials/planning/instructions/studyplan/template.studyplan.js                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Tutorials.Planning.Instructions.StudyPlan");
Template["PixelArtAcademy.Tutorials.Planning.Instructions.StudyPlan"] = new Template("Template.PixelArtAcademy.Tutorials.Planning.Instructions.StudyPlan", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-tutorials-planning-instructions-studyplan system"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "instruction ", Spacebars.mustache(view.lookup("displaySideClass")) ];
    }
  }, "\n      ", HTML.DIV({
    class: "content"
  }, "\n        ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("displayedInstruction"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n      "), "\n    "), "\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("interfaceMarkings"));
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "PixelPad", "Systems", "Instructions", "InterfaceMarking"));
    }), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".html",
    ".styl"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-tutorials/tutorials.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/markup.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/instruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/generalinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/completedinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/stepinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/referencestrayinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/multiarea/multiarea.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/multiarea/instruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/multiarea/uncompletedinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/multiarea/generalinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/multiarea/completedinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/multiarea/stepinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/desktop/desktop.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/instructions/desktop/template.desktop.js");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/pixelarttools.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/basics.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/backbuttonshortcutinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/pencil.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/eraser.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/colorfill.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/colorfill2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/colorfill3.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/basictools.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/shortcuts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/basics/references.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/colors/colors.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/colors/colorswatches.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/colors/colorpickingwithundo.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/colors/colorpicking.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/colors/quickcolorpicking.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/helpers/helpers.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/helpers/zoom.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/helpers/movecanvas.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/helpers/undoredo.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelarttools/helpers/lines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/elementsofart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/errorinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/line.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/assetwithreferences.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/straightlines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/curvedlines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/brokenlines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/brokenlines2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/outlines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/outlines2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/edges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/patterns.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/errorinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/line/referencestrayinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/shape.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/assetwithreferences.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/cleanconstructionlinesstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/errorinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/referencestrayinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/cleanupconstructionlinesinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/requiredrampinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/basicshapes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/combiningbasicshapes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/transformedbasicshapes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/basicshapesbreakdown.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/solidshapes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/organicshapes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/organicshapes2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/detailing/detailing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/elementsofart/shape/detailing/detailingstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/pixelartfundamentals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/jaggies.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/intendedandperceivedlines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/corners.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lineartcleanup/lineartcleanup.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lineartcleanup/steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/lineartcleanup/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies2/jaggies2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies2/steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/lines/jaggies2/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/diagonals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/evendiagonals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/constrainingangles.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/unevendiagonals.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/unevendiagonalsartstyle.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/segmentlengths/segmentlengths.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/segmentlengths/steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/segmentlengths/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/endsegments/endsegments.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/diagonals/endsegments/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/curves.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/smoothcurves.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/circles.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/longcurves.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/abruptsegmentlengthchanges/abruptsegmentlengthchanges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/abruptsegmentlengthchanges/steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/abruptsegmentlengthchanges/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/straightparts/straightparts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/straightparts/steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/straightparts/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/inflectionpoints/inflectionpoints.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/inflectionpoints/steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/inflectionpoints/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/lineartcleanup/lineartcleanup.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/lineartcleanup/steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/curves/lineartcleanup/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/linewidth.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/linewidthasset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thinlines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/thicklines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/widelines.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/jaggies/linewidth/varyinglinewidth.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/size/size.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/size/assetwithreferences.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/size/displayresolution.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/size/perceivedresolution.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/size/smallestdetails.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/size/smallestrecognizablesize.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/pixelartfundamentals/size/readabilityanalysis.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/simplification.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/assetwithreferences.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/modelstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/symbols.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/symbolicandrealisticdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/intentionalsimplification.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/definingfeatures.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/stylizedproportions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/basicshapes.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/silhouette/silhouette.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/simplification/silhouette/rotatestep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/design.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/shapelanguage.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/shapesasset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/assetwithreferences.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/referencestrayinstruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/shapesinnature.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/circle.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/circle2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/square.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/square2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/triangle.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/triangle2.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/shapecombinations.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/drawing/design/shapelanguage/breakingtherules.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/planning/planning.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/planning/instructions/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/planning/instructions/instruction.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/planning/instructions/studyplan/studyplan.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-tutorials/planning/instructions/studyplan/template.studyplan.js");

/* Exports */
Package._define("retronator:pixelartacademy-tutorials", {
  PixelArtAcademy: PixelArtAcademy
});

})();
