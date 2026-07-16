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
var Retronator = Package['retronator:retronator-accounts'].Retronator;
var LandsOfIllusions = Package['retronator:landsofillusions'].LandsOfIllusions;
var PixelArtAcademy = Package['retronator:pixelartacademy-learning'].PixelArtAcademy;
var PixelArtDatabase = Package['retronator:pixelartdatabase'].PixelArtDatabase;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var CryptoJS = Package['jparker:crypto-core'].CryptoJS;
var Accounts = Package['accounts-base'].Accounts;
var Artificial = Package['retronator:artificialengines'].Artificial;
var _ = Package['retronator:artificialengines']._;
var THREE = Package['retronator:artificialengines'].THREE;
var Ammo = Package['retronator:artificialengines'].Ammo;
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
var Promise = Package.promise.Promise;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare, bounds, previousPoint, currentPoint, startPointIndex, endPointIndex;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-practice":{"practice.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/practice.coffee                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
PAA.Practice = class Practice {
  constructor() {
    Artificial.Pages.addAdminPage('/admin/practice', this.constructor.Pages.Admin);
    Artificial.Pages.addAdminPage('/admin/practice/scripts', this.constructor.Pages.Admin.Scripts);
    Artificial.Pages.addAdminPage('/admin/practice/projects', this.constructor.Pages.Admin.Projects);
  }
};
if (Meteor.isServer) {
  // Export all public projects.
  AM.DatabaseContent.addToExport(function () {
    return PAA.Practice.Project.documents.fetch({
      profileId: {
        $exists: false
      }
    });
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"journal":{"journal.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/journal/journal.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Journal = function () {
  class Journal extends AM.Document {
    static id() {
      return 'PixelArtAcademy.Practice.Journal';
    }
  }
  ;

  // character: character who owns the journal
  //   _id
  //   avatar
  //     fullName
  //     color
  // title: string of journal's title
  // defaultFont: string with the name of the font used by default (when no specific formatting is applied)
  // design: options that specify the look of the journal
  //   type: main template identifier
  //   size
  //   orientation
  //   bindingPosition
  //   writingSide
  //   paper
  //     type
  //     spacing
  //     color
  //       hue
  //       shade
  //   cover
  //     color
  //       hue
  //       shade
  //     art
  // archived: boolean whether the journal is put away in the archive pile
  // entries: reverse of entry.journal, mostly used to know how many entries there are in the journal
  //   _id
  Journal.Meta({
    name: Journal.id(),
    fields: () => {
      return {
        character: Document.ReferenceField(LOI.Character, ['avatar.fullName', 'avatar.color'], true)
      };
    }
  });

  // Methods
  Journal.insert = Journal.method('insert');
  Journal.remove = Journal.method('remove');
  Journal.updateTitle = Journal.method('updateTitle');
  Journal.updateDefaultFont = Journal.method('updateDefaultFont');
  Journal.updateDesign = Journal.method('updateDesign');
  Journal.updateArchived = Journal.method('updateArchived');
  Journal.updateOrder = Journal.method('updateOrder');

  // Subscriptions
  Journal.forId = Journal.subscription('forId');
  Journal.forCharacterId = Journal.subscription('forCharacterId');
  Journal.forCharacterIds = Journal.subscription('forCharacterIds');

  // Design enumerations
  Journal.Design = {
    Type: {
      Traditional: 'Traditional'
    },
    Size: {
      Small: 'Small',
      Medium: 'Medium',
      Large: 'Large'
    },
    Orientation: {
      Portrait: 'Portrait',
      Landscape: 'Landscape'
    },
    BindingPosition: {
      Top: 'Top',
      Left: 'Left'
    },
    WritingSides: {
      Single: 'Single',
      Double: 'Double'
    },
    PaperType: {
      Blank: 'Blank',
      Quad: 'Quad',
      Rule: 'Rule'
    }
  };
  return Journal;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/journal/methods.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  LOI,
  PAA,
  authorizeJournalAction,
  journalDesignPattern,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Journal.insert.method(function (characterId, design) {
  var journal, lastJournal, order;
  check(characterId, Match.DocumentId);
  check(design, journalDesignPattern);
  // Make sure the user can perform this character action.
  LOI.Authorize.characterAction(characterId);
  lastJournal = PAA.Practice.Journal.documents.findOne({
    'character._id': characterId
  }, {
    sort: {
      order: -1
    }
  });
  // Place it after the last entry (or at the start if it's the first journal).
  order = (lastJournal != null ? lastJournal.order : void 0) + 1 || 0;
  // We create a new check-in for the given character.
  journal = {
    design: design,
    order: order,
    character: {
      _id: characterId
    }
  };
  return PAA.Practice.Journal.documents.insert(journal);
});
PAA.Practice.Journal.remove.method(function (journalId) {
  check(journalId, Match.DocumentId);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(journalId);
  return PAA.Practice.Journal.documents.remove(journalId);
});
PAA.Practice.Journal.updateTitle.method(function (journalId, title) {
  check(journalId, Match.DocumentId);
  check(title, String);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(journalId);
  // Associate the artist with the character.
  return PAA.Practice.Journal.documents.update(journalId, {
    $set: {
      title
    }
  });
});
PAA.Practice.Journal.updateDefaultFont.method(function (journalId, defaultFont) {
  check(journalId, Match.DocumentId);
  check(defaultFont, String);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(journalId);
  // Associate the artist with the character.
  return PAA.Practice.Journal.documents.update(journalId, {
    $set: {
      defaultFont
    }
  });
});
PAA.Practice.Journal.updateDesign.method(function (journalId, design) {
  check(journalId, Match.DocumentId);
  check(design, journalDesignPattern);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(journalId);
  // Associate the artist with the character.
  return PAA.Practice.Journal.documents.update(journalId, {
    $set: {
      design
    }
  });
});
PAA.Practice.Journal.updateArchived.method(function (journalId, archived) {
  check(journalId, Match.DocumentId);
  check(archived, Boolean);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(journalId);
  // Associate the artist with the character.
  return PAA.Practice.Journal.documents.update(journalId, {
    $set: {
      archived
    }
  });
});
PAA.Practice.Journal.updateOrder.method(function (journalId, order) {
  check(journalId, Match.DocumentId);
  check(order, Number);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(journalId);
  // Associate the artist with the character.
  return PAA.Practice.Journal.documents.update(journalId, {
    $set: {
      order
    }
  });
});
authorizeJournalAction = function (journalId) {
  var journal;
  journal = PAA.Practice.Journal.documents.findOne(journalId);
  if (!journal) {
    throw new AE.ArgumentException("Journal not found.");
  }
  return LOI.Authorize.characterAction(journal.character._id);
};
journalDesignPattern = Match.ObjectIncluding({
  // We make all fields optional so we can use this structure for sparse updates.
  type: Match.Optional(Match.Where(value => {
    return indexOf.call(_.values(PAA.Practice.Journal.Design.Type), value) >= 0;
  })),
  size: Match.Optional(Match.Where(value => {
    return indexOf.call(_.values(PAA.Practice.Journal.Design.Size), value) >= 0;
  })),
  orientation: Match.Optional(Match.Where(value => {
    return indexOf.call(_.values(PAA.Practice.Journal.Design.Orientation), value) >= 0;
  })),
  bindingPosition: Match.Optional(Match.Where(value => {
    return indexOf.call(_.values(PAA.Practice.Journal.Design.BindingPosition), value) >= 0;
  })),
  writingSides: Match.Optional(Match.Where(value => {
    return indexOf.call(_.values(PAA.Practice.Journal.Design.WritingSides), value) >= 0;
  })),
  paper: Match.Optional({
    type: Match.Optional(Match.Where(value => {
      return indexOf.call(_.values(PAA.Practice.Journal.Design.PaperType), value) >= 0;
    })),
    spacing: Match.Optional(Match.PositiveInteger),
    color: Match.Optional({
      hue: Match.Optional(Match.Where(value => {
        return indexOf.call(_.values(LOI.Assets.Palette.Atari2600.hues), value) >= 0;
      })),
      shade: Match.IntegerRange(0, 7)
    })
  }),
  cover: Match.Optional({
    color: Match.Optional({
      hue: Match.Optional(Match.Where(value => {
        return indexOf.call(_.values(LOI.Assets.Palette.Atari2600.hues), value) >= 0;
      })),
      shade: Match.IntegerRange(0, 7)
    })
  })
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"entry":{"entry.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/journal/entry/entry.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA, PADB;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PADB = PixelArtDatabase;
PAA.Practice.Journal.Entry = function () {
  class Entry extends AM.Document {
    static id() {
      return 'PixelArtAcademy.Practice.Journal.Entry';
    }
  }
  ;

  // journal: the journal this entry appears in
  //   _id
  //   character
  //     _id
  //     avatar
  //       fullName
  //       color
  // time: the time when the entry was created
  // order: where this entry appears in the journal
  // [content]: array of delta operations
  //   insert: string or object to be inserted
  //     timestamp: a semantic time entry
  //       time: the time to be displayed
  //       timezoneOffset: the timezone used to display the time, in minutes UTC is ahead of this timezone
  //       language: language the time is written in

  //     artwork: an artwork from the pixel art database
  //       _id

  //     picture: an image without any semantic information
  //       url: the url of the image itself
  //       sourceWebsiteUrl: optional url from which the image was extracted, if it wasn't uploaded

  //     video: a video without any semantic information
  //       url

  //     task: a learning task
  //       id: the id of the task to be displayed
  //       entry: the specific entry that completes this task, or null if not completed
  //         _id
  //       data: any extra data not stored in the entry, for example temporary values before an entry is created

  //   attributes: object with formatting directives

  // action: the action representing editing of this entry (timed at last edit)
  //   _id
  // memories: list of memories revolving around this entry
  //   _id
  Entry.Meta({
    name: Entry.id(),
    fields: () => {
      return {
        journal: Document.ReferenceField(PAA.Practice.Journal, ['character'], true, 'entries', []),
        action: Document.ReferenceField(LOI.Memory.Action, [], true, 'content.journalEntry', ['journal']),
        memories: [Document.ReferenceField(LOI.Memory, [], true, 'journalEntry', ['journal'])]
      };
    }
  });
  Entry.pictureUploadContext = new LOI.Assets.Upload.Context({
    name: "".concat(Entry.id(), ".picture"),
    folder: 'check-ins',
    maxSize: 20 * 1024 * 1024,
    // 20 MB
    fileTypes: LOI.Assets.Upload.Context.FileTypes.Images,
    cacheControl: LOI.Assets.Upload.Context.CacheControl.RequireRevalidation
  });

  // Methods
  Entry.insert = Entry.method('insert');
  Entry.remove = Entry.method('remove');
  Entry.updateOrder = Entry.method('updateOrder');
  Entry.updateContent = Entry.method('updateContent');
  Entry.replaceContent = Entry.method('replaceContent');
  Entry.addMemory = Entry.method('addMemory');

  // Subscriptions
  Entry.forId = Entry.subscription('forId');
  Entry.forJournalId = Entry.subscription('forJournalId');
  Entry.activityForCharacter = Entry.subscription('activityForCharacter');
  Entry.memoriesForEntryId = Entry.subscription('memoriesForEntryId');
  return Entry;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/journal/entry/methods.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Delta, LOI, PAA, authorizeJournalAction, createAction;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Delta = require('quill-delta');
PAA.Practice.Journal.Entry.insert.method(function (entryId, journalId, contentDeltaOperations, order, situation) {
  var actionId, contentDelta, entry, journal, lastEntry;
  check(entryId, Match.DocumentId);
  check(journalId, Match.DocumentId);
  check(contentDeltaOperations, Array);
  check(order, Match.OptionalOrNull(Number));
  // Note that situation will be checked in the action do call.

  // Find the journal.
  journal = PAA.Practice.Journal.documents.findOne(journalId);
  if (!journal) {
    throw new AE.ArgumentException("Journal does not exist.");
  }

  // Make sure the user can perform this character action.
  LOI.Authorize.characterAction(journal.character._id);
  // Create the action of writing in this journal entry.
  actionId = createAction(journal.character._id, situation);
  // Create a delta object to catch any potential errors with the operations array.
  contentDelta = new Delta(contentDeltaOperations);

  // Place at the end of the journal if order is not specified.
  if (order == null) {
    lastEntry = PAA.Practice.Journal.Entry.documents.findOne({
      'journal._id': journalId
    }, {
      sort: {
        order: -1
      }
    });
    // Place it after the last entry (or at the start if it's the first entry).
    order = (lastEntry != null ? lastEntry.order : void 0) + 1 || 0;
  }
  // We create a new check-in for the given character.
  entry = {
    _id: entryId,
    journal: {
      _id: journalId
    },
    time: new Date(),
    order: order,
    content: contentDelta.ops,
    action: {
      _id: actionId
    }
  };
  return PAA.Practice.Journal.Entry.documents.insert(entry);
});
PAA.Practice.Journal.Entry.remove.method(function (entryId) {
  check(entryId, Match.DocumentId);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(entryId);
  return PAA.Practice.Journal.Entry.documents.remove(entryId);
});
PAA.Practice.Journal.Entry.updateOrder.method(function (entryId, order) {
  check(entryId, Match.DocumentId);
  check(order, Number);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(entryId);
  return PAA.Practice.Journal.Entry.documents.update(entryId, {
    $set: {
      order
    }
  });
});
PAA.Practice.Journal.Entry.updateContent.method(function (entryId, updateDeltaOperations, situation) {
  var actionId, contentDelta, entry, newContentDelta, setModifier, updateDelta;
  check(entryId, Match.DocumentId);
  check(updateDeltaOperations, Array);
  // Note that situation will be checked in the action update/do call.

  // Make sure the check-in belongs to the current user.
  entry = authorizeJournalAction(entryId);
  setModifier = {};
  // Update action time. Check if action exists, since a manually created journal entry might not have it yet.
  if (entry.action) {
    LOI.Memory.Action.updateTimeAndSituation(entry.action._id, null, situation);
  } else {
    // Create the action of writing in this journal entry.
    actionId = createAction(entry.journal.character._id, situation);
    setModifier.action = {
      _id: actionId
    };
  }
  contentDelta = new Delta(entry.content);
  updateDelta = new Delta(updateDeltaOperations);
  newContentDelta = contentDelta.compose(updateDelta);
  setModifier.content = newContentDelta.ops;
  // Update the text.
  return PAA.Practice.Journal.Entry.documents.update(entryId, {
    $set: setModifier
  });
});
PAA.Practice.Journal.Entry.replaceContent.method(function (entryId, contentDeltaOperations) {
  var contentDelta;
  check(entryId, Match.DocumentId);
  check(contentDeltaOperations, Array);
  // Make sure the check-in belongs to the current user.
  authorizeJournalAction(entryId);
  // Create a delta object to catch any potential errors with the operations array.
  contentDelta = new Delta(contentDeltaOperations);
  // Update the text.
  return PAA.Practice.Journal.Entry.documents.update(entryId, {
    $set: {
      content: contentDelta.ops
    }
  });
});
PAA.Practice.Journal.Entry.addMemory.method(function (entryId, memoryId) {
  var entry;
  check(entryId, Match.DocumentId);
  check(memoryId, Match.DocumentId);
  // Only players can add memories.
  LOI.Authorize.player();
  // Make sure the entry exists.
  entry = PAA.Practice.Journal.Entry.documents.findOne(entryId);
  if (!entry) {
    throw new AE.ArgumentException("Entry not found.");
  }
  // Associate the memory to this entry.
  return PAA.Practice.Journal.Entry.documents.update(entryId, {
    $addToSet: {
      memories: {
        _id: memoryId
      }
    }
  });
});
authorizeJournalAction = function (entryId) {
  var entry, journal;
  entry = PAA.Practice.Journal.Entry.documents.findOne(entryId);
  if (!entry) {
    throw new AE.ArgumentException("Entry does not exist.");
  }
  journal = PAA.Practice.Journal.documents.findOne(entry.journal._id);
  if (!journal) {
    throw new AE.ArgumentException("Journal does not exist.");
  }
  LOI.Authorize.characterAction(journal.character._id);
  // Return entry.
  return entry;
};
createAction = function (characterId, situation) {
  var content, type;
  type = PAA.Practice.Journal.Entry.Action.type;
  // Content is empty because it will be updated through the reverse field.
  content = {};
  return LOI.Memory.Action.do(type, characterId, situation, content);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"action.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/journal/entry/action.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, Nodes, PAA, PADB, Vocabulary;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PADB = PixelArtDatabase;
Nodes = LOI.Adventure.Script.Nodes;
Vocabulary = LOI.Parser.Vocabulary;
PAA.Practice.Journal.Entry.Action = function () {
  class Action extends LOI.Memory.Action {
    static isMemorable() {
      return true;
    }
    static startDescription() {
      return "_person_ starts writing in _their_ journal.";
    }
    static activeDescription() {
      return "_They_ _are_ writing in _their_ ![journal](read _person_'s journal).";
    }
    shouldSkipTransition(oldAction) {
      // Skip if we're transitioning from another entry action.
      return (oldAction != null ? oldAction.type : void 0) === this.type;
    }
  }
  ;

  // content: extra information defining what was done in this action, specified in inherited actions
  //   journalEntry: array with one journal entry this action created, reverse of Journal.Entry.action
  //     _id
  //     journal
  //       _id
  //       character
  //         _id
  //         avatar
  //           fullName
  //           color
  Action.type = 'PixelArtAcademy.Practice.Journal.Entry.Action';
  Action.registerType(Action.type, Action);
  return Action;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"avatar.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/journal/entry/avatar.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Journal.Entry.Avatar = function () {
  class Avatar {
    static id() {
      return 'PixelArtAcademy.Practice.Journal.Entry';
    }
    static fullName() {
      return "日记条目";
    }
  }
  ;
  LOI.Adventure.Thing.Avatar.initialize(Avatar);
  return Avatar;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"pages":{"pages.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/pages.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Practice.Pages = class Pages {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"admin":{"admin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/admin/admin.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.Practice.Pages.Admin = function () {
  class Admin extends AM.Component {
    constructor(app) {
      super(...arguments);
      this.app = app;
    }
  }
  ;
  Admin.register('PixelArtAcademy.Practice.Pages.Admin');
  return Admin;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.admin.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/admin/template.admin.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Pages.Admin");
Template["PixelArtAcademy.Practice.Pages.Admin"] = new Template("Template.PixelArtAcademy.Practice.Pages.Admin", (function() {
  var view = this;
  return HTML.DIV({
    class: "admin-page"
  }, HTML.Raw("\n    <h1>Pixel Art Academy Practice Administration</h1>\n    <p>Tools:</p>\n    "), HTML.UL("\n      ", HTML.LI(HTML.STRONG(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.Practice.Pages.Admin.Scripts");
    }
  }, "Scripts")), ":\n        Various maintenance scripts to run on the database."), "\n      ", HTML.LI(HTML.STRONG(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.Practice.Pages.Admin.Projects");
    }
  }, "Projects")), ":\n        Creation of public projects."), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"scripts":{"scripts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/admin/scripts/scripts.coffee                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.Practice.Pages.Admin.Scripts = function () {
  class Scripts extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Practice.Pages.Admin.Scripts';
    }
    events() {
      return super.events(...arguments).concat({
        'click .convert-check-ins': () => {
          return this.constructor.convertCheckIns();
        }
      });
    }
  }
  ;
  Scripts.register(Scripts.id());
  Scripts.convertCheckIns = new AB.Method({
    name: "".concat(Scripts.id(), ".convertCheckIns")
  });
  return Scripts;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.scripts.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/admin/scripts/template.scripts.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Pages.Admin.Scripts");
Template["PixelArtAcademy.Practice.Pages.Admin.Scripts"] = new Template("Template.PixelArtAcademy.Practice.Pages.Admin.Scripts", (function() {
  var view = this;
  return HTML.Raw('<h1>脚本</h1>\n  <p><button class="convert-check-ins">将签到转换为日记条目</button></p>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"projects":{"projects.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/admin/projects/projects.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA, Persistence;
AB = Artificial.Base;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Persistence = Artificial.Mummification.Document.Persistence;
PAA.Practice.Pages.Admin.Projects = function () {
  class Projects extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Practice.Pages.Admin.Projects';
    }
    onCreated() {
      super.onCreated(...arguments);
      PAA.Practice.Project.all.subscribe(this);
      if (!Persistence.hasSyncedStorage(Persistence.SyncedStorages.LocalStorage.id())) {
        return Persistence.registerSyncedStorage(new Persistence.SyncedStorages.LocalStorage({
          storageKey: "Retronator"
        }));
      }
    }
    profiles() {
      return Persistence.Profile.documents.fetch();
    }
    projects() {
      return PAA.Practice.Project.documents.fetch();
    }
    events() {
      return super.events(...arguments).concat({
        'click .load-profile-button': this.onClickLoadProfileButton,
        'click .create-public-copy-button': this.onClickCreatePublicCopyButton
      });
    }
    onClickLoadProfileButton(event) {
      var profile;
      profile = this.currentData();
      return Persistence.loadProfile(profile.profileId);
    }
    onClickCreatePublicCopyButton(event) {
      var asset, assets, bitmap, newAsset, project, projectName;
      project = _.cloneDeep(this.currentData());
      projectName = this.$('.public-project-name').val();
      assets = {};
      project._id = Random.id();
      project.name = projectName;
      project.assets = function () {
        var i, len, ref, results;
        ref = project.assets;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          asset = ref[i];
          newAsset = _.pick(asset, ['id', 'type']);
          if (asset.bitmapId) {
            bitmap = LOI.Assets.Bitmap.documents.findOne(asset.bitmapId);
            bitmap.name = "".concat(projectName, "/").concat(_.kebabCase(asset.id));
            bitmap._id = Random.id();
            delete bitmap.profileId;
            bitmap.historyPosition = 0;
            bitmap.history = [];
            assets[bitmap._id] = bitmap;
            newAsset.bitmapId = bitmap._id;
          }
          results.push(newAsset);
        }
        return results;
      }();
      return this.constructor.insertPublicProject(project, assets);
    }
  }
  ;
  Projects.register(Projects.id());
  Projects.insertPublicProject = new AB.Method({
    name: "".concat(Projects.id(), ".insertPublicProject")
  });
  return Projects;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.projects.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/admin/projects/template.projects.js                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Pages.Admin.Projects");
Template["PixelArtAcademy.Practice.Pages.Admin.Projects"] = new Template("Template.PixelArtAcademy.Practice.Pages.Admin.Projects", (function() {
  var view = this;
  return [ HTML.Raw("<h1>Projects</h1>\n  <h2>Local profiles</h2>\n  "), HTML.UL("\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("profiles"));
  }, function() {
    return [ "\n      ", HTML.LI(HTML.BUTTON({
      class: "load-profile-button"
    }, Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    }))), "\n    " ];
  }), "\n  "), HTML.Raw('\n  <h2>公开项目</h2>\n  输入项目公开的名称： <input class="public-project-name" placeholder="public/project/name">\n  '), HTML.UL("\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("projects"));
  }, function() {
    return [ "\n      ", HTML.LI(Blaze.View("lookup:_id", function() {
      return Spacebars.mustache(view.lookup("_id"));
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("profileId"));
    }, function() {
      return HTML.Raw('\n          <button class="create-public-copy-button">创建公开副本</button>\n        ');
    }), "\n      "), "\n    " ];
  }), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"extractimagesfromposts":{"extractimagesfromposts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/extractimagesfromposts/extractimagesfromposts.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Pages.ExtractImagesFromPosts = function () {
  class ExtractImagesFromPosts extends AM.Component {
    events() {
      return super.events(...arguments).concat({
        'click .process-button': this.onClickProcessButton
      });
    }
    onClickProcessButton(event) {
      return Meteor.call('PixelArtAcademy.Practice.CheckIn.extractImagesFromPosts');
    }
  }
  ;
  ExtractImagesFromPosts.register('PixelArtAcademy.Practice.Pages.ExtractImagesFromPosts');
  return ExtractImagesFromPosts;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.extractimagesfromposts.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/extractimagesfromposts/template.extractimagesfromposts.js        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Pages.ExtractImagesFromPosts");
Template["PixelArtAcademy.Practice.Pages.ExtractImagesFromPosts"] = new Template("Template.PixelArtAcademy.Practice.Pages.ExtractImagesFromPosts", (function() {
  var view = this;
  return HTML.Raw('<h1>从签到帖子网址提取图片</h1>\n  <div><button class="process-button">处理</button></div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"importcheckins":{"importcheckins.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/importcheckins/importcheckins.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Pages.ImportCheckIns = function () {
  class ImportCheckIns extends AM.Component {
    events() {
      return super.events(...arguments).concat({
        'submit .upload-form': this.onSubmitUploadForm
      });
    }
    onSubmitUploadForm(event) {
      var csvFile, passphrase, reader;
      event.preventDefault();
      csvFile = this.$('.csvFile')[0].files[0];
      passphrase = this.$('.passphrase').val();
      reader = new FileReader();
      reader.onload = function (event) {
        var data, encryptedData;
        data = "HEADER".concat(event.target.result);
        encryptedData = CryptoJS.AES.encrypt(data, passphrase).toString();
        return Meteor.call('PixelArtAcademy.Practice.importCheckIns', encryptedData);
      };
      return reader.readAsText(csvFile);
    }
  }
  ;
  ImportCheckIns.register('PixelArtAcademy.Practice.Pages.ImportCheckIns');
  return ImportCheckIns;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.importcheckins.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pages/importcheckins/template.importcheckins.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Pages.ImportCheckIns");
Template["PixelArtAcademy.Practice.Pages.ImportCheckIns"] = new Template("Template.PixelArtAcademy.Practice.Pages.ImportCheckIns", (function() {
  var view = this;
  return HTML.Raw('<h1>导入签到</h1>\n  <form class="upload-form">\n    <p>选择要导入的csv文件</p>\n    <input class="csvFile" type="file" accept="text/csv">\n    <p>输入上传密码</p>\n    <input class="passphrase" type="password">\n    <div><button>上传</button></div>\n  </form>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"checkin":{"checkin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/checkin/checkin.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.CheckIn = function () {
  class CheckIn extends AM.Document {
    static id() {
      return 'PixelArtAcademy.Practice.CheckIn';
    }
  }
  ;

  // time: the time when post was published
  // character: character that published the post
  //   _id
  //   avatar
  //     fullName
  //     color
  // post: (optional) the external post with the check-in data
  //   url
  // text: (optional) the text of the post
  // artwork: (optional) the artwork associated with the post
  //   _id
  //   image:
  //     url
  // image: (optional) the image associated with the post
  //   url
  // video: (optional) the video associated with the post
  //   url
  // memories: list of memories revolving around this check-in
  //   _id
  CheckIn.Meta({
    name: CheckIn.id(),
    fields: () => {
      return {
        character: Document.ReferenceField(LOI.Character, ['avatar.fullName', 'avatar.color'], true),
        memories: [Document.ReferenceField(LOI.Memory)]
      };
    }
  });

  // Methods
  CheckIn.insert = CheckIn.method('insert');
  CheckIn.remove = CheckIn.method('remove');
  CheckIn.updateTime = CheckIn.method('updateTime');
  CheckIn.updateText = CheckIn.method('updateText');
  CheckIn.updateUrl = CheckIn.method('updateUrl');
  CheckIn.newMemory = CheckIn.method('newMemory');

  // Server methods
  CheckIn.getExternalUrlImage = CheckIn.method('getExternalUrlImage');
  CheckIn.extractImagesFromPosts = CheckIn.method('extractImagesFromPosts');
  CheckIn.import = CheckIn.method('import');

  // Subscriptions
  CheckIn.forCharacterId = CheckIn.subscription('forCharacterId');
  CheckIn.forDateRange = CheckIn.subscription('forDateRange');
  CheckIn.memoriesForCheckInId = CheckIn.subscription('memoriesForCheckInId');
  return CheckIn;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/checkin/methods.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, authorizeCheckInAction;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.CheckIn.insert.method(function (characterId, time) {
  var checkIn;
  check(characterId, Match.DocumentId);
  check(time, Match.OptionalOrNull(Date));
  // Make sure the user can perform this character action.
  LOI.Authorize.characterAction(characterId);
  // We create a new check-in for the given character.
  checkIn = {
    time: time || new Date(),
    character: {
      _id: characterId
    }
  };
  return PAA.Practice.CheckIn.documents.insert(checkIn);
});
PAA.Practice.CheckIn.remove.method(function (checkInId) {
  check(checkInId, Match.DocumentId);
  // Make sure the check-in belongs to the current user.
  authorizeCheckInAction(checkInId);
  return PAA.Practice.CheckIn.documents.remove(checkInId);
});
PAA.Practice.CheckIn.updateTime.method(function (checkInId, time) {
  check(checkInId, Match.DocumentId);
  check(time, Date);
  // Make sure the check-in belongs to the current user.
  authorizeCheckInAction(checkInId);
  // Associate the artist with the character.
  return PAA.Practice.CheckIn.documents.update(checkInId, {
    $set: {
      time: time
    }
  });
});
PAA.Practice.CheckIn.updateText.method(function (checkInId, text) {
  check(checkInId, Match.DocumentId);
  check(text, String);
  // Make sure the check-in belongs to the current user.
  authorizeCheckInAction(checkInId);
  // Update the text.
  return PAA.Practice.CheckIn.documents.update(checkInId, {
    $set: {
      text: text
    }
  });
});
PAA.Practice.CheckIn.updateUrl.method(function (checkInId, url) {
  var contentType, exception, response, update;
  check(checkInId, Match.DocumentId);
  check(url, Match.OneOf(String, null));
  // Make sure the check-in belongs to the current user.
  authorizeCheckInAction(checkInId);
  update = {};
  if (url) {
    try {
      // See if url is already an image.
      response = HTTP.get(url);
      contentType = response.headers['content-type'];
      // Check if the url is pointing directly to an image.
      if (/image/.test(contentType)) {
        // Set the image directly as an image.
        _.merge(update, {
          $set: {
            image: {
              url
            }
          },
          $unset: {
            post: true,
            video: true,
            artwork: true
          }
        });
      } else {
        // We have a post so save the post url for possible linking.
        _.merge(update, {
          $set: {
            post: {
              url
            }
          },
          $unset: {
            video: true,
            artwork: true
          }
        });
        try {
          // Let's see if we can also extract an image from the url.
          _.merge(update, {
            $set: {
              image: {
                url: PAA.Practice.CheckIn.getExternalUrlImage(url)
              }
            }
          });
        } catch (error) {
          exception = error;
          _.merge(update, {
            $unset: {
              image: true
            }
          });
        }
      }
    } catch (error) {}
  } else {
    update.$unset = {
      post: true,
      image: true,
      video: true,
      artwork: true
    };
  }
  return PAA.Practice.CheckIn.documents.update(checkInId, update);
});
PAA.Practice.CheckIn.newMemory.method(function (checkInId, characterId, firstLineText) {
  var checkIn, memoryId;
  check(checkInId, Match.DocumentId);
  check(characterId, Match.DocumentId);
  check(firstLineText, Match.Optional(String));
  // Make sure the check-in exists.
  checkIn = PAA.Practice.CheckIn.documents.findOne(checkInId);
  if (!checkIn) {
    throw new AE.ArgumentException("Check-in not found.");
  }
  // Make sure the user controls the character that's starting the memory.
  LOI.Authorize.characterAction(characterId);
  // Create a new memory.
  memoryId = LOI.Memory.insert();
  // Associate the memory to this check-in.
  PAA.Practice.CheckIn.documents.update(checkInId, {
    $addToSet: {
      memories: {
        _id: memoryId
      }
    }
  });
  // Create the first action in memory.
  return LOI.Memory.Action.insert(LOI.Memory.Actions.Say.type, characterId, {
    timelineId: LandsOfIllusions.TimelineIds.Present,
    locationId: Retronator.HQ.Cafe.id()
  }, {
    say: {
      text: firstLineText
    }
  }, memoryId);
});
authorizeCheckInAction = function (checkInId) {
  var checkIn;
  checkIn = PAA.Practice.CheckIn.documents.findOne(checkInId);
  if (!checkIn) {
    throw new AE.ArgumentException("Check-in not found.");
  }
  return LOI.Authorize.characterAction(checkIn.character._id);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"migrations":{"0000-renamecollection.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/checkin/migrations/0000-renamecollection.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
PixelArtAcademy.Practice.CheckIn.renameCollectionMigration('PixelArtAcademyPracticeCheckIns', 'PixelArtAcademy.Practice.CheckIns');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"0001-characterreferencefieldsupdate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/checkin/migrations/0001-characterreferencefieldsupdate.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Migration, PAA;
PAA = PixelArtAcademy;
Migration = function () {
  class Migration extends Document.AddReferenceFieldsMigration {}
  ;
  Migration.prototype.name = "Character reference updated with new fields.";
  return Migration;
}.call(this);
PAA.Practice.CheckIn.addMigration(new Migration());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"0002-removecharacternamefield.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/checkin/migrations/0002-removecharacternamefield.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Migration,
  PAA,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
PAA = PixelArtAcademy;
Migration = function () {
  class Migration extends Document.MajorMigration {
    constructor() {
      super(...arguments);
      this.forward = this.forward.bind(this);
      this.backward = this.backward.bind(this);
    }
    forward(document, collection, currentSchema, newSchema) {
      var count, counts;
      boundMethodCheck(this, Migration);
      count = 0;
      collection.findEach({
        _schema: currentSchema
      }, document => {
        // Remove deprecated character reference field name.
        return count += collection.update({
          _id: document._id
        }, {
          $unset: {
            'character.name': 1
          }
        });
      });
      counts = super.forward(...arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    }
    backward(document, collection, currentSchema, oldSchema) {
      var count, counts;
      boundMethodCheck(this, Migration);
      count = 0;
      collection.findEach({
        _schema: currentSchema
      }, document => {
        // Set the character reference field name from the avatar full name.
        return count += collection.update({
          _id: document._id
        }, {
          $set: {
            'character.name': document.character.avatar.fullName.translations.best.text
          }
        });
      });
      counts = super.backward(...arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    }
  }
  ;
  Migration.prototype.name = "Remove character name field.";
  return Migration;
}.call(this);
PAA.Practice.CheckIn.addMigration(new Migration());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"0003-changetomemories.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/checkin/migrations/0003-changetomemories.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Migration,
  PAA,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
PAA = PixelArtAcademy;
Migration = function () {
  class Migration extends Document.MajorMigration {
    constructor() {
      super(...arguments);
      this.forward = this.forward.bind(this);
      this.backward = this.backward.bind(this);
    }
    forward(document, collection, currentSchema, newSchema) {
      var count, counts;
      boundMethodCheck(this, Migration);
      count = 0;
      collection.findEach({
        _schema: currentSchema,
        conversations: {
          $exists: true
        }
      }, document => {
        var conversationId, memories;
        // Change conversations to memories.
        memories = function () {
          var i, len, ref, results;
          ref = document.conversations;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            conversationId = ref[i];
            results.push({
              _id: conversationId
            });
          }
          return results;
        }();
        return count += collection.update({
          _id: document._id
        }, {
          $set: {
            memories
          },
          $unset: {
            conversations: true
          }
        });
      });
      counts = super.forward(...arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    }
    backward(document, collection, currentSchema, oldSchema) {
      var count, counts;
      boundMethodCheck(this, Migration);
      count = 0;
      collection.findEach({
        _schema: currentSchema,
        memories: {
          $exists: true
        }
      }, document => {
        var conversations, memory;
        // Change memories to conversations.
        conversations = function () {
          var i, len, ref, results;
          ref = document.memories;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            memory = ref[i];
            results.push(memory._id);
          }
          return results;
        }();
        return count += collection.update({
          _id: document._id
        }, {
          $set: {
            conversations
          },
          $unset: {
            memories: true
          }
        });
      });
      counts = super.backward(...arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    }
  }
  ;
  Migration.prototype.name = "Change to memories.";
  return Migration;
}.call(this);
PAA.Practice.CheckIn.addMigration(new Migration());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"importeddata":{"importeddata.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/importeddata/importeddata.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Practice.ImportedData = class ImportedData {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"helpers":{"helpers.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/helpers/helpers.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Practice.Helpers = class Helpers {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawing":{"drawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/helpers/drawing/drawing.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Practice.Helpers.Drawing = class Drawing {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"markup":{"markup.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/helpers/drawing/markup/markup.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600, LOI, PAA, _offsetDirection;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Atari2600 = LOI.Assets.Palette.Atari2600;
_offsetDirection = new THREE.Vector2();
PAA.Practice.Helpers.Drawing.Markup = function () {
  class Markup {
    static defaultStyle() {
      var markupColor, palette;
      palette = LOI.palette();
      markupColor = palette.color(Atari2600.hues.azure, 4);
      return "#".concat(markupColor.getHexString());
    }
    static betterStyle() {
      var lineColor, palette;
      palette = LOI.palette();
      lineColor = palette.color(Atari2600.hues.green, 4);
      return "#".concat(lineColor.getHexString());
    }
    static mediocreStyle() {
      var lineColor, palette;
      palette = LOI.palette();
      lineColor = palette.color(Atari2600.hues.yellow, 4);
      return "#".concat(lineColor.getHexString());
    }
    static worseStyle() {
      var lineColor, palette;
      palette = LOI.palette();
      lineColor = palette.color(Atari2600.hues.peach, 5);
      return "#".concat(lineColor.getHexString());
    }
    static errorStyle() {
      var errorColor, palette;
      palette = LOI.palette();
      errorColor = palette.color(Atari2600.hues.red, 3);
      return "#".concat(errorColor.getHexString());
    }
    static backgroundStyle() {
      var backgroundColor, palette;
      palette = LOI.palette();
      backgroundColor = palette.color(Atari2600.hues.gray, 7);
      return "#".concat(backgroundColor.getHexString());
    }
    static textBase() {
      return {
        size: 5,
        lineHeight: 7,
        font: 'Small Print Retronator',
        style: this.defaultStyle(),
        outline: {
          style: this.backgroundStyle()
        },
        align: this.TextAlign.Center
      };
    }
    static arrowBase() {
      return {
        arrow: {
          end: true
        },
        style: this.defaultStyle()
      };
    }
    static percentage(value) {
      if (value == null) {
        return "N/A";
      }
      return "".concat(Math.floor(value * 100), "%");
    }
    static offsetPoints(points, amount) {
      var i, len, nextOffsetPoint, nextPointForDirection, offsetPoint, offsetPoints, point, pointIndex, previousPointForDirection;
      offsetPoints = _.cloneDeep(points);
      for (pointIndex = i = 0, len = points.length; i < len; pointIndex = ++i) {
        point = points[pointIndex];
        previousPointForDirection = points[pointIndex - 1] || point;
        nextPointForDirection = points[pointIndex + 1] || point;
        _offsetDirection.x = previousPointForDirection.y - nextPointForDirection.y;
        _offsetDirection.y = nextPointForDirection.x - previousPointForDirection.x;
        _offsetDirection.normalize().multiplyScalar(amount);
        offsetPoint = offsetPoints[pointIndex];
        offsetPoint.x += _offsetDirection.x;
        offsetPoint.y += _offsetDirection.y;
        if (offsetPoint.bezierControlPoints) {
          offsetPoint.bezierControlPoints[1].x += _offsetDirection.x;
          offsetPoint.bezierControlPoints[1].y += _offsetDirection.y;
        }
        nextOffsetPoint = offsetPoints[pointIndex + 1];
        if (nextOffsetPoint != null ? nextOffsetPoint.bezierControlPoints : void 0) {
          nextOffsetPoint.bezierControlPoints[0].x += _offsetDirection.x;
          nextOffsetPoint.bezierControlPoints[0].y += _offsetDirection.y;
        }
      }
      return offsetPoints;
    }
  }
  ;
  Markup.TextOriginPosition = {
    TopLeft: 'TopLeft',
    TopCenter: 'TopCenter',
    TopRight: 'TopRight',
    MiddleLeft: 'MiddleLeft',
    MiddleCenter: 'MiddleCenter',
    MiddleRight: 'MiddleRight',
    BottomLeft: 'BottomLeft',
    BottomCenter: 'BottomCenter',
    BottomRight: 'BottomRight'
  };
  Markup.TextAlign = {
    Left: 'Left',
    Center: 'Center',
    Right: 'Right'
  };
  return Markup;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/helpers/drawing/markup/pixelart.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Atari2600,
  LOI,
  Markup,
  PAA,
  _centralPartCenter,
  _centralPartEnd,
  _centralPartStart,
  _end,
  _endPartCenter,
  _evaluationToCanvasOffset,
  _normal,
  _normalLeft,
  _normalRight,
  _start,
  _startPartCenter,
  _textPosition,
  indexOf = [].indexOf;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;

// Note: We don't have the PAE shorthand since helpers are included before pixel art evaluation.
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
_evaluationToCanvasOffset = new THREE.Vector2(0.5, 0.5);
_start = new THREE.Vector2();
_end = new THREE.Vector2();
_centralPartStart = new THREE.Vector2();
_centralPartEnd = new THREE.Vector2();
_normal = new THREE.Vector2();
_normalLeft = new THREE.Vector2();
_normalRight = new THREE.Vector2();
_startPartCenter = new THREE.Vector2();
_centralPartCenter = new THREE.Vector2();
_endPartCenter = new THREE.Vector2();
_textPosition = new THREE.Vector2();
Markup.PixelArt = function () {
  class PixelArt {
    static pixelPerfectLineErrors(line) {
      let doubles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      let corners = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      let pixelArtEvaluationProperty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var error, i, len, markup, pixelPerfectErrorBase, pixelPerfectLineErrors;
      markup = [];
      pixelPerfectLineErrors = [];
      if (doubles) {
        pixelPerfectLineErrors.push(...line.getDoubles(pixelArtEvaluationProperty));
      }
      if (corners) {
        pixelPerfectLineErrors.push(...line.getCorners(pixelArtEvaluationProperty));
      }
      pixelPerfectErrorBase = {
        style: Markup.errorStyle()
      };
      for (i = 0, len = pixelPerfectLineErrors.length; i < len; i++) {
        error = pixelPerfectLineErrors[i];
        markup.push({
          pixel: _.extend({}, pixelPerfectErrorBase, _.pick(error, 'x', 'y'))
        });
      }
      return markup;
    }
    static intendedLineBase() {
      var lineColor, palette;
      palette = LOI.palette();
      lineColor = palette.color(Atari2600.hues.gray, 4);
      return {
        style: "#".concat(lineColor.getHexString()),
        width: 0
      };
    }
    static perceivedLineBase() {
      var lineColor, palette;
      palette = LOI.palette();
      lineColor = palette.color(Atari2600.hues.azure, 5);
      return {
        style: "#".concat(lineColor.getHexString()),
        cap: 'round'
      };
    }
    static diagonalRatioText(straightLine) {
      var endPoint, evaluation, rightPoint, startPoint;
      evaluation = straightLine.evaluate();
      startPoint = _.first(straightLine.points);
      endPoint = _.last(straightLine.points);
      rightPoint = endPoint.x > startPoint.x ? endPoint : startPoint;
      return {
        text: _.extend(Markup.textBase(), {
          position: {
            x: rightPoint.x + 1.5,
            y: rightPoint.y,
            origin: Markup.TextOriginPosition.BottomLeft
          },
          value: "".concat(evaluation.diagonalRatio.numerator, ":").concat(evaluation.diagonalRatio.denominator)
        })
      };
    }
    static evaluatedDiagonalRatioText(straightLine) {
      var element;
      element = this.diagonalRatioText(straightLine);
      element.text.style = this.evaluatedSegmentLengthsStyle(straightLine);
      return element;
    }

    // This line connects corners of line segments to perfectly match the actual pixels.
    static segmentedPerceivedLine(line) {
      var edgeSegment, i, index, j, len, len1, point, points, ref, ref1, startToEndOffsetX, startToEndOffsetY;
      // Add points at the extents of each edge segments.
      points = [line.getPoint(line.edgeSegments[0].startPointIndex)];
      ref = line.edgeSegments;
      for (i = 0, len = ref.length; i < len; i++) {
        edgeSegment = ref[i];
        points.push(line.getPoint(edgeSegment.endPointIndex));
      }

      // Create modifiable points (offset to the center of the pixels).
      points = function () {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = points.length; j < len1; j++) {
          point = points[j];
          results.push({
            x: point.x + 0.5,
            y: point.y + 0.5
          });
        }
        return results;
      }();
      ref1 = line.edgeSegments;

      // Move points of diagonal segments to the segment corners.
      for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
        edgeSegment = ref1[index];
        if (!!edgeSegment.edge.isAxisAligned) {
          continue;
        }
        startToEndOffsetX = 0.5 * Math.sign(points[index + 1].x - points[index].x);
        startToEndOffsetY = 0.5 * Math.sign(points[index + 1].y - points[index].y);
        if (index > 0) {
          points[index].x += startToEndOffsetX;
          points[index].y += startToEndOffsetY;
        }
        if (index < line.edgeSegments.length - 1) {
          points[index + 1].x -= startToEndOffsetX;
          points[index + 1].y -= startToEndOffsetY;
        }
      }
      return {
        line: _.extend(this.perceivedLineBase(), {
          points
        })
      };
    }

    // This line is a smooth interpretation of the perceived line based on line parts.
    static perceivedLine(line) {
      var i, len, linePart, ref, results;
      ref = line.parts;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        linePart = ref[i];
        results.push(this.perceivedLinePart(linePart));
      }
      return results;
    }
    static perceivedLinePart(linePart) {
      switch (false) {
        case !(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine):
          return this.perceivedStraightLine(linePart);
        case !(linePart instanceof PAA.Practice.PixelArtEvaluation.Line.Part.Curve):
          return this.perceivedCurve(linePart);
        default:
          return null;
      }
    }
    static perceivedStraightLine(straightLine) {
      return {
        line: _.extend(this.perceivedLineBase(), {
          points: [{
            x: straightLine.displayLine2.start.x + 0.5,
            y: straightLine.displayLine2.start.y + 0.5
          }, {
            x: straightLine.displayLine2.end.x + 0.5,
            y: straightLine.displayLine2.end.y + 0.5
          }]
        })
      };
    }
    static perceivedCurve(curve) {
      var end, endIndex, getCurvePoint, i, pointIndex, points, ref, start, startPosition;
      startPosition = curve.displayPoints[0].position;
      points = [{
        x: startPosition.x + 0.5,
        y: startPosition.y + 0.5
      }];
      getCurvePoint = index => {
        if (curve.isClosed) {
          return curve.displayPoints[_.modulo(index, curve.displayPoints.length - 1)];
        } else {
          return curve.displayPoints[index];
        }
      };
      endIndex = curve.isClosed ? curve.displayPoints.length - 1 : curve.displayPoints.length - 2;
      for (pointIndex = i = 0, ref = endIndex; 0 <= ref ? i <= ref : i >= ref; pointIndex = 0 <= ref ? ++i : --i) {
        start = getCurvePoint(pointIndex);
        end = getCurvePoint(pointIndex + 1);
        points.push({
          x: end.position.x + 0.5,
          y: end.position.y + 0.5,
          bezierControlPoints: [{
            x: start.controlPoints.after.x + 0.5,
            y: start.controlPoints.after.y + 0.5
          }, {
            x: end.controlPoints.before.x + 0.5,
            y: end.controlPoints.before.y + 0.5
          }]
        });
      }
      return {
        line: _.extend(this.perceivedLineBase(), {
          points
        })
      };
    }
    static evaluatedPerceivedStraightLine(straightLine) {
      let pixelArtEvaluationProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var evaluateEnds, evaluation, markup, ref;
      this._prepareStraightLineParts(straightLine, pixelArtEvaluationProperty);
      evaluation = straightLine.evaluate();
      markup = [];
      evaluateEnds = pixelArtEvaluationProperty != null ? (ref = pixelArtEvaluationProperty.evenDiagonals) != null ? ref.endSegments : void 0 : void 0;
      if (straightLine.startPointSegmentLength) {
        markup.push({
          line: {
            points: [_start.clone(), _centralPartStart.clone()],
            style: evaluation.endSegments.startScore === 1 || !evaluateEnds ? Markup.betterStyle() : Markup.worseStyle()
          }
        });
      }
      if (straightLine.endPointSegmentLength) {
        markup.push({
          line: {
            points: [_centralPartEnd.clone(), _end.clone()],
            style: evaluation.endSegments.endScore === 1 || !evaluateEnds ? Markup.betterStyle() : Markup.worseStyle()
          }
        });
      }
      markup.push({
        line: {
          points: [_centralPartStart.clone(), _centralPartEnd.clone()],
          style: this.evaluatedSegmentLengthsStyle(straightLine)
        }
      });
      return markup;
    }
    static _prepareStraightLineParts(straightLine) {
      let pixelArtEvaluationProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var lineIsMoreHorizontal, ref;
      _start.copy(straightLine.displayLine2.start).add(_evaluationToCanvasOffset);
      _end.copy(straightLine.displayLine2.end).add(_evaluationToCanvasOffset);
      _centralPartStart.copy(_start);
      _centralPartEnd.copy(_end);
      _normal.subVectors(_end, _start);
      _normal.normalize();
      _normalRight.set(_normal.y, -_normal.x);
      _normalLeft.set(-_normal.y, _normal.x);
      lineIsMoreHorizontal = Math.abs(_normal.x) > Math.abs(_normal.y);
      if (pixelArtEvaluationProperty != null ? (ref = pixelArtEvaluationProperty.evenDiagonals) != null ? ref.endSegments : void 0 : void 0) {
        if (straightLine.startPointSegmentLength) {
          // Place the central start in the corner between the first and second segment.
          if (lineIsMoreHorizontal) {
            _centralPartStart.x += Math.sign(_normal.x) * straightLine.startPointSegmentLength;
            _centralPartStart.y += Math.sign(_normal.y);
          } else {
            _centralPartStart.x += Math.sign(_normal.x);
            _centralPartStart.y += Math.sign(_normal.y) * straightLine.startPointSegmentLength;
          }
        }
        if (straightLine.endPointSegmentLength) {
          if (lineIsMoreHorizontal) {
            _centralPartEnd.x -= Math.sign(_normal.x) * straightLine.endPointSegmentLength;
            _centralPartEnd.y -= Math.sign(_normal.y);
          } else {
            _centralPartEnd.x -= Math.sign(_normal.x);
            _centralPartEnd.y -= Math.sign(_normal.y) * straightLine.endPointSegmentLength;
          }
        }
      }
      _startPartCenter.addVectors(_start, _centralPartStart).multiplyScalar(0.5);
      _centralPartCenter.addVectors(_centralPartStart, _centralPartEnd).multiplyScalar(0.5);
      return _endPartCenter.addVectors(_centralPartEnd, _end).multiplyScalar(0.5);
    }
    static evaluatedSegmentCornerLines(straightLine) {
      var endStyle, evaluation, i, j, len, len1, markup, middleStyle, point, points, ref, segmentCorners, side, startStyle;
      evaluation = straightLine.evaluate();
      if (straightLine.startPointSegmentLength) {
        startStyle = evaluation.endSegments.startScore === 1 ? Markup.betterStyle() : Markup.worseStyle();
      }
      if (straightLine.endPointSegmentLength) {
        endStyle = evaluation.endSegments.endScore === 1 ? Markup.betterStyle() : Markup.worseStyle();
      }
      middleStyle = this.evaluatedSegmentLengthsStyle(straightLine);
      segmentCorners = straightLine.getSegmentCorners();
      markup = [];
      ref = ['left', 'right'];
      for (i = 0, len = ref.length; i < len; i++) {
        side = ref[i];
        points = segmentCorners[side];
        for (j = 0, len1 = points.length; j < len1; j++) {
          point = points[j];
          point.x += 0.5;
          point.y += 0.5;
        }
        if (startStyle) {
          markup.push({
            line: {
              points: points.slice(0, 2),
              style: startStyle
            }
          });
        }
        if (endStyle) {
          markup.push({
            line: {
              points: points.slice(points.length - 2, +(points.length - 1) + 1 || 9e9),
              style: endStyle
            }
          });
        }
        markup.push({
          line: {
            points: points.slice(startStyle ? 1 : 0, +(points.length - (endStyle ? 2 : 1)) + 1 || 9e9),
            style: middleStyle
          }
        });
      }
      return markup;
    }
    static evaluatedSegmentLengthsStyle(straightLine) {
      var SegmentLengths, evaluation;
      SegmentLengths = PAA.Practice.PixelArtEvaluation.Line.Part.StraightLine.SegmentLengths;
      evaluation = straightLine.evaluate();
      switch (evaluation.segmentLengths.type) {
        case SegmentLengths.Even:
          return Markup.betterStyle();
        case SegmentLengths.Alternating:
          return Markup.mediocreStyle();
        case SegmentLengths.Broken:
          return Markup.worseStyle();
      }
    }
    static pointSegmentLengthTexts(lineOrLinePart) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var AbruptSegmentLengthChanges, MajorAbruptSegmentLengthChanges, MinorAbruptSegmentLengthChanges, abruptChangesAtIndex, betterStyle, biggestAbruptChange, element, endPoint, endPointIndex, endSegmentIndex, i, index, j, k, l, len, len1, line, linePart, m, markup, mediocreStyle, n, nextIndex, nextOffsetDirection, nextText, nextTextIsInTheUpLeftArea, numberAppearsAboveSegment, point, pointIndex, pointSegmentIndex, pointSegmentLength, pointSegmentLengthChanges, position, previousIndex, previousOffsetDirection, previousText, previousTextIsInTheUpLeftArea, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, segment, segmentCenter, segmentIndex, startPoint, startPointIndex, startSegmentIndex, text, textBase, texts, worseStyle;
      textBase = Markup.textBase();
      texts = [];
      if (lineOrLinePart instanceof PAA.Practice.PixelArtEvaluation.Line) {
        line = lineOrLinePart;
        startSegmentIndex = 0;
        endSegmentIndex = line.edgeSegments.length - 1;
      } else {
        linePart = lineOrLinePart;
        line = linePart.line;
        startSegmentIndex = linePart.startSegmentIndex;
        endSegmentIndex = linePart.endSegmentIndex;
      }
      for (segmentIndex = i = ref = startSegmentIndex, ref1 = endSegmentIndex; ref <= ref1 ? i <= ref1 : i >= ref1; segmentIndex = ref <= ref1 ? ++i : --i) {
        segment = line.getEdgeSegment(segmentIndex);
        if (!segment.pointSegmentsCount) {
          continue;
        }
        startPointIndex = segment.pointSegmentsStartPointIndex;
        endPointIndex = segment.pointSegmentsEndPointIndex;
        if (linePart) {
          if (segmentIndex === startSegmentIndex) {
            startPointIndex = Math.max(startPointIndex, linePart.startPointIndex);
          }
          if (segmentIndex === endSegmentIndex) {
            endPointIndex = Math.min(endPointIndex, linePart.endPointIndex);
          }
          pointSegmentLength = segmentIndex === startSegmentIndex || segmentIndex === endSegmentIndex ? segment.externalPointSegmentLength : segment.pointSegmentLength;
        } else {
          pointSegmentLength = segment.pointSegmentLength;
        }
        if (pointSegmentLength > 1) {
          // We have one long segment.
          startPoint = line.getPoint(startPointIndex);
          endPoint = line.getPoint(endPointIndex);
          numberAppearsAboveSegment = endPoint.x !== startPoint.x;
          segmentCenter = {
            x: (startPoint.x + endPoint.x) / 2,
            y: (startPoint.y + endPoint.y) / 2
          };
          texts.push({
            segmentCenter: segmentCenter,
            number: pointSegmentLength,
            offsetDirection: numberAppearsAboveSegment ? this.OffsetDirections.Up : this.OffsetDirections.Left
          });
        } else {
          // We have multiple points.
          for (pointIndex = j = ref2 = startPointIndex, ref3 = endPointIndex; ref2 <= ref3 ? j <= ref3 : j >= ref3; pointIndex = ref2 <= ref3 ? ++j : --j) {
            point = line.getPoint(pointIndex);
            texts.push({
              segmentCenter: point,
              number: 1
            });
          }
        }
      }

      // Determine positions for single segments.
      for (index = k = 0, len = texts.length; k < len; index = ++k) {
        text = texts[index];
        if (!!text.offsetDirection) {
          continue;
        }
        previousOffsetDirection = null;
        nextOffsetDirection = null;
        for (previousIndex = l = ref4 = index - 1; l >= 0; previousIndex = l += -1) {
          if (previousOffsetDirection = texts[previousIndex].offsetDirection) {
            break;
          }
        }
        for (nextIndex = m = ref5 = index + 1, ref6 = texts.length; ref5 <= ref6 ? m < ref6 : m > ref6; nextIndex = ref5 <= ref6 ? ++m : --m) {
          if (nextOffsetDirection = texts[nextIndex].offsetDirection) {
            break;
          }
        }
        if (!(previousOffsetDirection || nextOffsetDirection)) {
          // We couldn't find any direction preference, default to up.
          text.offsetDirection = this.OffsetDirections.Up;
        } else if (previousOffsetDirection === nextOffsetDirection) {
          // Preserve direction in between segments with the same direction.
          text.offsetDirection = previousOffsetDirection;
        } else if (!(previousOffsetDirection && nextOffsetDirection)) {
          // Use the only provided direction or default to up when no direction is set at all.
          text.offsetDirection = previousOffsetDirection || nextOffsetDirection || this.OffsetDirections.Up;
        } else {
          // Use diagonal offset to transition between different orientations when there is empty space up-left.
          previousText = texts[index - 1];
          previousTextIsInTheUpLeftArea = previousText.segmentCenter.x < text.segmentCenter.x && previousText.segmentCenter.y < text.segmentCenter.y;
          nextText = texts[index + 1];
          nextTextIsInTheUpLeftArea = nextText.segmentCenter.x < text.segmentCenter.x && nextText.segmentCenter.y < text.segmentCenter.y;
          if (previousTextIsInTheUpLeftArea || nextTextIsInTheUpLeftArea) {
            text.offsetDirection = this.OffsetDirections.Up;
          } else {
            text.offsetDirection = this.OffsetDirections.UpLeft;
          }
        }
      }

      // Create markup for texts.
      markup = [];
      if (options.abruptEvaluation) {
        betterStyle = Markup.betterStyle();
        mediocreStyle = Markup.mediocreStyle();
        worseStyle = Markup.worseStyle();
        ({
          pointSegmentLengthChanges
        } = linePart.evaluate());
      }
      AbruptSegmentLengthChanges = PAA.Practice.PixelArtEvaluation.Subcriteria.SmoothCurves.AbruptSegmentLengthChanges;
      MajorAbruptSegmentLengthChanges = PAA.Practice.PixelArtEvaluation.Line.Part.Curve.AbruptSegmentLengthChanges.Major;
      MinorAbruptSegmentLengthChanges = PAA.Practice.PixelArtEvaluation.Line.Part.Curve.AbruptSegmentLengthChanges.Minor;
      for (pointSegmentIndex = n = 0, len1 = texts.length; n < len1; pointSegmentIndex = ++n) {
        text = texts[pointSegmentIndex];
        switch (text.offsetDirection) {
          case this.OffsetDirections.Up:
            position = {
              x: text.segmentCenter.x + 0.5,
              y: text.segmentCenter.y,
              origin: Markup.TextOriginPosition.BottomCenter
            };
            break;
          case this.OffsetDirections.UpLeft:
            position = {
              x: text.segmentCenter.x,
              y: text.segmentCenter.y,
              origin: Markup.TextOriginPosition.BottomRight
            };
            break;
          case this.OffsetDirections.Left:
            position = {
              x: text.segmentCenter.x,
              y: text.segmentCenter.y + 0.5,
              origin: Markup.TextOriginPosition.MiddleRight
            };
        }
        element = {
          position: position,
          value: "".concat(text.number)
        };
        if (options.abruptEvaluation) {
          element.style = betterStyle;
          abruptChangesAtIndex = _.filter(pointSegmentLengthChanges.abruptPointSegmentLengthChanges, change => {
            var ref7;
            return (ref7 = change.index) === pointSegmentIndex || ref7 === pointSegmentIndex - 1;
          });
          if (biggestAbruptChange = _.maxBy(abruptChangesAtIndex, change => {
            return change.abruptIncrease;
          })) {
            if (biggestAbruptChange.abruptIncrease >= PAA.Practice.PixelArtEvaluation.Line.Part.Curve.majorAbruptIncreaseThreshold) {
              if (options.abruptFilterValue && (ref7 = options.abruptFilterValue) !== AbruptSegmentLengthChanges && ref7 !== MajorAbruptSegmentLengthChanges) {
                // This is a major abrupt change.
                continue;
              }
              element.style = worseStyle;
            } else if (biggestAbruptChange.abruptIncrease) {
              if (options.abruptFilterValue && (ref8 = options.abruptFilterValue) !== AbruptSegmentLengthChanges && ref8 !== MinorAbruptSegmentLengthChanges) {
                // This is a minor abrupt change.
                continue;
              }
              element.style = mediocreStyle;
            }
          } else {
            if (options.abruptFilterValue) {
              continue;
            }
          }
        }
        markup.push({
          text: _.defaults(element, textBase)
        });
      }
      return markup;
    }
    static straightLineEvaluationPercentageTexts(straightLine) {
      let pixelArtEvaluationProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var distanceFromLine, evaluation, markup, normal, origin, position, ref, textBase;
      this._prepareStraightLineParts(straightLine, pixelArtEvaluationProperty);
      textBase = Markup.textBase();
      evaluation = straightLine.evaluate();
      markup = [];

      // Determine the direction of the offset from the line and text origin.
      if (Math.abs(straightLine.line2.end.x - straightLine.line2.start.x) < Math.abs(straightLine.line2.end.y - straightLine.line2.start.y)) {
        // We're on a vertical line. If we're going top to bottom, we have to offset to the left.
        normal = straightLine.line2.end.y > straightLine.line2.start.y ? _normalRight : _normalLeft;
      } else {
        // We're on a horizontal line. If we're going left to right, we have to offset to the right.
        normal = straightLine.line2.end.x > straightLine.line2.start.x ? _normalLeft : _normalRight;
      }
      if (normal.x > 0 === normal.y > 0) {
        // The offset is on the top-left to bottom-right diagonal. Since we never
        // go towards top-left, we can assume that's where the origin should be.
        origin = Markup.TextOriginPosition.TopLeft;
      } else {
        // The offset is on the top-right to bottom-left diagonal. See if we're going left or right.
        origin = normal.x > 0 ? Markup.TextOriginPosition.BottomLeft : Markup.TextOriginPosition.TopRight;
      }

      // Write percentages.
      distanceFromLine = 1;
      if (!(pixelArtEvaluationProperty && !((ref = pixelArtEvaluationProperty.evenDiagonals) != null ? ref.endSegments : void 0))) {
        if (straightLine.startPointSegmentLength) {
          _textPosition.copy(normal).multiplyScalar(distanceFromLine).add(_startPartCenter);
          position = _.extend(_textPosition.clone(), {
            origin
          });
          markup.push({
            text: _.extend({}, textBase, {
              position: position,
              value: Markup.percentage(evaluation.endSegments.startScore),
              style: evaluation.endSegments.startScore === 1 ? Markup.betterStyle() : Markup.worseStyle()
            })
          });
        }
        if (straightLine.endPointSegmentLength) {
          _textPosition.copy(normal).multiplyScalar(distanceFromLine).add(_endPartCenter);
          position = _.extend(_textPosition.clone(), {
            origin
          });
          markup.push({
            text: _.extend({}, textBase, {
              position: position,
              value: Markup.percentage(evaluation.endSegments.endScore),
              style: evaluation.endSegments.endScore === 1 ? Markup.betterStyle() : Markup.worseStyle()
            })
          });
        }
      }
      _textPosition.copy(normal).multiplyScalar(distanceFromLine).add(_centralPartCenter);
      position = _.extend(_textPosition.clone(), {
        origin
      });
      markup.push({
        text: _.extend({}, textBase, {
          position: position,
          value: Markup.percentage(evaluation.segmentLengths.score),
          style: this.evaluatedSegmentLengthsStyle(straightLine)
        })
      });
      return markup;
    }
    static straightLineBreakdown(straightLine) {
      let pixelArtEvaluationProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var markup;
      markup = [this.evaluatedDiagonalRatioText(straightLine), ...this.evaluatedPerceivedStraightLine(straightLine, pixelArtEvaluationProperty), ...this.pointSegmentLengthTexts(straightLine), ...this.straightLineEvaluationPercentageTexts(straightLine, pixelArtEvaluationProperty)];
      return markup;
    }
    static curveSmoothnessEvaluationPercentageTexts(line, subcriterions, pixelArtEvaluationProperty) {
      var curveSmoothness, markup, ref, ref1, rightMostPoint, score, subcriterion, subcriterionProperty, textBase, totalWeight, weight;
      textBase = Markup.textBase();
      if (!(curveSmoothness = (ref = line.evaluate(pixelArtEvaluationProperty)) != null ? ref.curveSmoothness : void 0)) {
        return [];
      }
      score = 0;
      totalWeight = 0;
      ref1 = PAA.Practice.PixelArtEvaluation.SubcriteriaWeights.SmoothCurves;
      for (subcriterion in ref1) {
        weight = ref1[subcriterion];
        if (!(!subcriterions || indexOf.call(subcriterions, subcriterion) >= 0)) {
          continue;
        }
        subcriterionProperty = _.lowerFirst(subcriterion);
        score += curveSmoothness[subcriterionProperty].score * weight;
        totalWeight += weight;
      }
      if (!totalWeight) {
        return [];
      }
      score /= totalWeight;
      markup = [];

      // Write the percentage to the right of the right-most pixel of the curve.
      rightMostPoint = line.getRightMostPoint();
      markup.push({
        text: _.extend({}, textBase, {
          position: {
            x: rightMostPoint.x + 1,
            y: rightMostPoint.y + 0.5,
            origin: Markup.TextOriginPosition.MiddleLeft
          },
          value: Markup.percentage(score),
          style: function () {
            switch (false) {
              case !(score >= 0.9):
                return Markup.betterStyle();
              case !(score >= 0.6):
                return Markup.mediocreStyle();
              default:
                return Markup.worseStyle();
            }
          }()
        })
      });
      return markup;
    }
  }
  ;
  PixelArt.OffsetDirections = {
    Up: 'Up',
    UpLeft: 'UpLeft',
    Left: 'Left'
  };
  return PixelArt;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"enginecomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/helpers/drawing/markup/enginecomponent.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, Markup, PAA, _normal;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Markup = PAA.Practice.Helpers.Drawing.Markup;
_normal = new THREE.Vector2();
Markup.EngineComponent = function () {
  class EngineComponent {
    static fontAvailable(font) {
      if (!this._fontsAvailable[font]) {
        this._fontsAvailable[font] = new ReactiveField(false);
        Tracker.nonreactive(async () => {
          await document.fonts.load(font);
          await document.fonts.ready;
          return this._fontsAvailable[font](true);
        });
      }
      return this._fontsAvailable[font]();
    }
    constructor() {
      this._bitmapPixelImages = [];
      this._urlImages = [];
    }
    drawMarkup(markup, context, properties) {
      var bitmap, bitmapCanvas, bitmapCanvases, bitmapPixelImage, circle, controlPoints, destinationHeight, destinationWidth, destinationX, destinationY, displayPixelSize, effectiveLineWidth, endAngle, endPoint, i, image, imageElement, j, k, l, len, len1, line, lineHeight, loadDependency, marking, minimumZoomPercentage, offsetX, offsetY, outlinePosition, outlineWidth, pixel, pixelSize, point, radius, rectangle, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, scaledDisplayPixelSize, sharpPixelOffset, sharpX, sharpY, source, sourceHeight, sourceWidth, sourceX, sourceY, startAngle, startPoint, text, textPosition, textSize, url, urlImage;
      // How big is an HTML canvas pixel relative to the unit of the context.
      pixelSize = properties.pixelSize;

      // How big is a game display pixel relative to the unit of the context.
      displayPixelSize = properties.displayPixelSize;
      minimumZoomPercentage = (ref = properties.minimumZoomPercentage) != null ? ref : this.constructor.minimumZoomPercentage;
      scaledDisplayPixelSize = Math.min(100 / minimumZoomPercentage, displayPixelSize);
      context.save();
      bitmapCanvases = [];
      for (i = 0, len = markup.length; i < len; i++) {
        marking = markup[i];
        if (pixel = marking.pixel) {
          context.fillStyle = pixel.style;
          context.fillRect(pixel.x, pixel.y, 1, 1);
        }
        if (point = marking.point) {
          radius = scaledDisplayPixelSize * (point.radius || 0.5);
          context.fillStyle = point.style;
          context.beginPath();
          context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
          context.fill();
        }
        if (circle = marking.circle) {
          radius = circle.radius || 0.5;
          context.fillStyle = circle.style;
          context.beginPath();
          context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
          context.fill();
        }
        if (line = marking.line) {
          context.strokeStyle = line.style;
          context.lineCap = line.cap;
          context.lineWidth = scaledDisplayPixelSize * (line.width || 1);
          if (line.width === 0) {
            // Allow for 'hairline' width (as small as possible).
            context.lineWidth = pixelSize;
          }
          if (line.absoluteWidth) {
            // Allow for width defined in absolute pixel units.
            context.lineWidth = line.absoluteWidth;
          }
          context.beginPath();
          if (line.points) {
            context.moveTo(line.points[0].x, line.points[0].y);
            ref1 = line.points.slice(1);
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              point = ref1[j];
              if (controlPoints = point.bezierControlPoints) {
                context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, point.x, point.y);
              } else {
                context.lineTo(point.x, point.y);
              }
            }
            context.stroke();
            if (line.arrow) {
              if (line.arrow.start) {
                endPoint = line.points[0];
                if (line.points[1].bezierControlPoints) {
                  startPoint = line.points[1].bezierControlPoints[0];
                } else {
                  startPoint = line.points[1];
                }
                this._drawArrow(context, startPoint, endPoint, line.arrow.width, line.arrow.length);
              }
              if (line.arrow.end) {
                endPoint = line.points[line.points.length - 1];
                if (endPoint.bezierControlPoints) {
                  startPoint = endPoint.bezierControlPoints[1];
                } else {
                  startPoint = line.points[line.points.length - 2];
                }
                this._drawArrow(context, startPoint, endPoint, line.arrow.width, line.arrow.length);
              }
            }
          }
          if (line.arc) {
            startAngle = line.arc.startAngle || 0;
            endAngle = line.arc.endAngle || Math.PI * 2;
            context.arc(line.arc.x, line.arc.y, line.arc.radius, startAngle, endAngle);
            context.stroke();
          }
        }
        if (rectangle = marking.rectangle) {
          if (rectangle.fillStyle) {
            context.fillStyle = rectangle.fillStyle;
            context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
          }
          if (rectangle.strokeStyle) {
            context.lineWidth = scaledDisplayPixelSize * (rectangle.strokeWidth || 1);
            context.strokeStyle = rectangle.strokeStyle;
            effectiveLineWidth = context.lineWidth / pixelSize;
            sharpPixelOffset = effectiveLineWidth % 2 === 1 ? 0.5 : 0;
            sharpX = (Math.floor(rectangle.x / pixelSize) + sharpPixelOffset) * pixelSize;
            sharpY = (Math.floor(rectangle.y / pixelSize) + sharpPixelOffset) * pixelSize;
            context.strokeRect(sharpX, sharpY, rectangle.width, rectangle.height);
          }
        }
        if (text = marking.text) {
          textSize = text.size * scaledDisplayPixelSize;
          context.font = "".concat(textSize, "px ").concat(text.font);
          if (this.constructor.fontAvailable(context.font)) {
            if (text.backgroundStyle) {
              context.fillStyle = text.backgroundStyle;
              this._drawTextBackground(context, text.value, text.position, lineHeight, text.backgroundPadding);
            }
            if (text.lineHeight) {
              lineHeight = text.lineHeight * scaledDisplayPixelSize;
            } else {
              lineHeight = textSize * 1.2;
            }
            textPosition = _.clone(text.position);

            // Adjust for right-based origin to have an extra pixel space.
            if (_.endsWith(textPosition.origin, 'Right')) {
              textPosition.x += scaledDisplayPixelSize;
            }
            if (text.outline) {
              // Adjust position to accommodate for the outline.
              if (_.endsWith(textPosition.origin, 'Left')) {
                textPosition.x += scaledDisplayPixelSize;
              }
              if (_.endsWith(textPosition.origin, 'Right')) {
                textPosition.x -= scaledDisplayPixelSize;
              }
              if (_.startsWith(textPosition.origin, 'Top')) {
                textPosition.y += scaledDisplayPixelSize;
              }
              if (_.startsWith(textPosition.origin, 'Bottom')) {
                textPosition.y -= scaledDisplayPixelSize;
              }
              context.fillStyle = text.outline.style;
              outlineWidth = text.outline.width || 1;
              outlinePosition = _.clone(textPosition);
              context.beginPath();
              for (offsetX = k = ref2 = -outlineWidth, ref3 = outlineWidth; ref2 <= ref3 ? k <= ref3 : k >= ref3; offsetX = ref2 <= ref3 ? ++k : --k) {
                for (offsetY = l = ref4 = -outlineWidth, ref5 = outlineWidth; ref4 <= ref5 ? l <= ref5 : l >= ref5; offsetY = ref4 <= ref5 ? ++l : --l) {
                  if (!(offsetX || offsetY)) {
                    continue;
                  }
                  outlinePosition.x = textPosition.x + offsetX * scaledDisplayPixelSize;
                  outlinePosition.y = textPosition.y + offsetY * scaledDisplayPixelSize;
                  this._drawText(context, text.value, outlinePosition, lineHeight, text.align);
                }
              }
              context.fill();
            }
            context.fillStyle = text.style;
            this._drawText(context, text.value, textPosition, lineHeight, text.align);
          }
        }
        if (image = marking.image) {
          if (bitmap = image.bitmap) {
            if (bitmapCanvas = _.find(bitmapCanvases, bitmapCanvas => {
              return bitmapCanvas.bitmap === bitmap;
            })) {
              source = bitmapCanvas.canvas;
            } else {
              if (!(bitmapPixelImage = _.find(this._bitmapPixelImages, bitmapPixelImage => {
                return bitmapPixelImage.bitmap === bitmap;
              }))) {
                bitmapPixelImage = {
                  bitmap: bitmap,
                  pixelImage: new LOI.Assets.Engine.PixelImage.Bitmap({
                    asset: () => {
                      return bitmap;
                    }
                  })
                };
                this._bitmapPixelImages.push(bitmapPixelImage);
              }
              if (source = bitmapPixelImage.pixelImage.getCanvas()) {
                bitmapCanvases.push({
                  bitmap: bitmap,
                  canvas: source
                });
              }
            }
          }
          if (url = image.url) {
            if (!(urlImage = this._urlImages[url])) {
              loadDependency = new Tracker.Dependency();
              imageElement = new Image();
              imageElement.onload = () => {
                return loadDependency.changed();
              };
              imageElement.src = url;
              urlImage = {
                image: imageElement,
                loadDependency
              };
              this._urlImages[url] = urlImage;
            }
            source = urlImage.image;
            urlImage.loadDependency.depend();
          }
          if (source) {
            sourceX = ((ref6 = image.source) != null ? ref6.position.x : void 0) || 0;
            sourceY = ((ref7 = image.source) != null ? ref7.position.y : void 0) || 0;
            sourceWidth = ((ref8 = image.source) != null ? ref8.width : void 0) || source.width;
            sourceHeight = ((ref9 = image.source) != null ? ref9.height : void 0) || source.height;
            destinationX = image.position.x;
            destinationY = image.position.y;
            destinationWidth = image.width || sourceWidth;
            destinationHeight = image.height || sourceHeight;
            context.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
          }
        }
      }
      return context.restore();
    }
    _drawArrow(context, start, end) {
      let width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      let length = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.5;
      _normal.subVectors(end, start);
      context.save();
      context.translate(end.x, end.y);
      context.rotate(_normal.angle() + Math.PI);
      context.moveTo(length, width / 2);
      context.lineTo(0, 0);
      context.lineTo(length, -width / 2);
      context.stroke();
      return context.restore();
    }
    _drawText(context, text, position, lineHeight, align) {
      var alignFactor, centerFactor, i, len, line, lines, maxWidth, middleFactor, originX, results, width, widths, x, y;
      lines = text.split('\n');
      widths = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = lines.length; i < len; i++) {
          line = lines[i];
          results.push(context.measureText(line).width);
        }
        return results;
      }();
      maxWidth = _.max(widths);
      context.textAlign = 'left';
      middleFactor = 0;
      context.textBaseline = 'top';
      if (_.startsWith(position.origin, 'Middle')) {
        middleFactor = 0.5;
        context.textBaseline = 'middle';
      }
      if (_.startsWith(position.origin, 'Bottom')) {
        middleFactor = 1;
        context.textBaseline = 'bottom';
      }
      centerFactor = 0;
      if (_.endsWith(position.origin, 'Center')) {
        centerFactor = 0.5;
      }
      if (_.endsWith(position.origin, 'Right')) {
        centerFactor = 1;
      }
      y = position.y - (lines.length - 1) * lineHeight * middleFactor;
      originX = position.x - maxWidth * centerFactor;
      alignFactor = 0;
      if (align === Markup.TextAlign.Center) {
        alignFactor = 0.5;
      }
      if (align === Markup.TextAlign.Right) {
        alignFactor = 1;
      }
      results = [];
      for (i = 0, len = lines.length; i < len; i++) {
        line = lines[i];
        width = context.measureText(line).width;
        x = originX + (maxWidth - width) * alignFactor;
        context.fillText(line, x, y);
        results.push(y += lineHeight);
      }
      return results;
    }
    _drawTextBackground(context, text, position, lineHeight) {
      let padding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var centerFactor, height, line, lines, verticalFactor, width, widths, x, y;
      lines = text.split('\n');
      widths = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = lines.length; i < len; i++) {
          line = lines[i];
          results.push(context.measureText(line).width);
        }
        return results;
      }();
      width = _.max(widths);
      height = lineHeight * lines.length;
      verticalFactor = 0;
      if (_.startsWith(position.origin, 'Middle')) {
        verticalFactor = 0.5;
      }
      if (_.startsWith(position.origin, 'Bottom')) {
        verticalFactor = 1;
      }
      centerFactor = 0;
      if (_.endsWith(position.origin, 'Center')) {
        centerFactor = 0.5;
      }
      if (_.endsWith(position.origin, 'Right')) {
        centerFactor = 1;
      }
      y = position.y - height * verticalFactor - padding;
      x = position.x - width * centerFactor - padding;
      return context.fillRect(x, y, width + 2 * padding, height + 2 * padding);
    }
  }
  ;

  // The minimum zoom level where markup pixels match display pixels
  // (markup pixels will be scaled down when zoomed out more than this).
  EngineComponent.minimumZoomPercentage = 400; // %

  EngineComponent._fontsAvailable = {};
  return EngineComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"project":{"project.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/project.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Project = function () {
  class Project extends AM.Document {
    static id() {
      return 'PixelArtAcademy.Practice.Project';
    }
  }
  ;

  // profileId: profile that created the project
  // name: text identifier for the project including the path, used for public projects
  // lastEditTime: the time the document was last edited
  // startTime: when the project was started
  // endTime: when the project was ended
  // type: project identifier that matches the project's thing ID
  // assets: array of assets that are part of this project
  //   id: unique asset identifier
  //   type: what kind of asset this is

  //   BITMAP
  //   bitmapId: ID of the bitmap representing this asset
  Project.Meta({
    name: Project.id()
  });
  Project.enablePersistence();
  Project.enableDatabaseContent();

  // Subscriptions
  Project.all = Project.subscription('all');
  Project.forId = Project.subscription('forId');
  Project.forCharacterId = Project.subscription('forCharacterId');
  Project.assetsForProjectId = Project.subscription('assetsForProjectId');
  return Project;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscriptions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/subscriptions.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, RA;
AE = Artificial.Everywhere;
RA = Retronator.Accounts;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;

// Get a specific project.
PAA.Practice.Project.forId.publish(function (projectId) {
  check(projectId, Match.DocumentId);
  return PAA.Practice.Project.getPublishingDocuments().find(projectId);
});

// Get all the assets for a project.
PAA.Practice.Project.assetsForProjectId.publish(function (projectId) {
  var asset, bitmapIds, project;
  check(projectId, Match.DocumentId);
  project = PAA.Practice.Project.documents.findOne(projectId);
  bitmapIds = function () {
    var i, len, ref, results;
    ref = project.assets;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      asset = ref[i];
      if (asset.bitmapId) {
        results.push(asset.bitmapId);
      }
    }
    return results;
  }();
  return LOI.Assets.Bitmap.getPublishingDocuments().find({
    _id: {
      $in: bitmapIds
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"thing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/thing.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Project.Thing = class Thing extends LOI.Adventure.Thing {
  constructor(projectId) {
    super(...arguments);
    this.projectId = projectId;
  }
  assetsData() {
    var ref;
    return (ref = PAA.Practice.Project.documents.findOne(this.projectId)) != null ? ref.assets : void 0;
  }
  assets() {
    throw AE.NotImplementedException("Project must provide an array of asset instances currently active in the project.");
  }
  getAsset(assetClassOrId) {
    var assetId, assets;
    assetId = _.thingId(assetClassOrId);
    assets = this.assets();
    return _.find(assets, asset => {
      return asset.id() === assetId;
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"workbench.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/workbench.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Project.Workbench = function () {
  class Workbench extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.Practice.Project.Workbench';
    }
  }
  ;
  Workbench.initialize();
  return Workbench;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"asset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/asset.coffee                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Project.Asset = function () {
  class Asset {
    static getClassForId(id) {
      return this._assetClassesById[id];
    }
    static getClasses() {
      return _.values(this._assetClassesById);
    }

    // Id string for this asset used to identify the asset in code.
    static id() {
      throw new AE.NotImplementedException("You must specify asset's id.");
    }

    // Type of this asset.
    static type() {
      throw new AE.NotImplementedException("You must specify asset's type.");
    }

    // String to represent the asset in the UI. Note that we can't use
    // 'name' since it's an existing property holding the class name.
    static displayName() {
      throw new AE.NotImplementedException("You must specify the asset name.");
    }

    // String with more information about what this asset represents.
    static description() {
      throw new AE.NotImplementedException("You must specify the asset's description.");
    }

    // Component to represent the asset in the portfolio.
    static portfolioComponentClass() {
      throw new AE.NotImplementedException("You must specify the portfolio component class.");
    }

    // Component to show for the asset on the clipboard.
    static clipboardComponentClass() {
      throw new AE.NotImplementedException("You must specify the clipboard component class.");
    }
    static initialize() {
      // Store asset class by ID.
      this._assetClassesById[this.id()] = this;
      // On the server, create this assets' translated names.
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
    constructor(project) {
      var clipboardComponentClass, portfolioComponentClass, translationNamespace;
      this.project = project;
      // Subscribe to this asset's translations.
      translationNamespace = this.id();
      this._translationSubscription = AB.subscribeNamespace(translationNamespace);
      this.data = new AE.LiveComputedField(() => {
        var assets;
        if (!(assets = this.project.assetsData())) {
          return;
        }
        return _.find(assets, asset => {
          return asset.id === this.id();
        });
      });
      portfolioComponentClass = this.constructor.portfolioComponentClass();
      this.portfolioComponent = new portfolioComponentClass(this);
      clipboardComponentClass = this.constructor.clipboardComponentClass();
      this.clipboardComponent = new clipboardComponentClass(this);

      // Provides support for autorun and subscribe calls.
      this._autorunHandles = [];
      this._subscriptionHandles = [];
    }
    destroy() {
      var handle, i, len, ref, results;
      this._translationSubscription.stop();
      this.data.stop();
      ref = [...this._autorunHandles, ...this._subscriptionHandles];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        handle = ref[i];
        results.push(handle.stop());
      }
      return results;
    }
    autorun(handler) {
      var handle;
      handle = Tracker.autorun(handler);
      this._autorunHandles.push(handle);
      return handle;
    }
    subscribe(subscriptionName) {
      var handle;
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      handle = Meteor.subscribe(subscriptionName, ...params);
      this._subscriptionHandles.push(handle);
      return handle;
    }
    subscribeContent(subscriptionName) {
      var handle;
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      handle = AM.DatabaseContent.subscribe(subscriptionName, ...params);
      this._subscriptionHandles.push(handle);
      return handle;
    }
    id() {
      return this.constructor.id();
    }
    urlParameter() {
      throw new AE.NotImplementedException("You must provide the parameter to be used in the URL to identify this asset.");
    }
    ready() {
      throw new AE.NotImplementedException("You must report when all asset's information is ready to be used.");
    }
    displayName() {
      var fallback, translated;
      translated = AB.translate(this._translationSubscription, 'displayName');
      if (translated.text === 'DISPLAYNAME' || translated.text === 'displayName') {
        try {
          fallback = this.constructor.displayName();
        } catch (error) {
          fallback = null;
        }
        if (fallback === 'DISPLAYNAME' || fallback === 'displayName') {
          return null;
        }
        return fallback;
      }
      return translated.text;
    }
    displayNameTranslation() {
      return AB.translation(this._translationSubscription, 'displayName');
    }
    description() {
      var fallback, translated;
      translated = AB.translate(this._translationSubscription, 'description');
      if (!translated.language || translated.text === 'description') {
        try {
          fallback = this.constructor.description();
        } catch (error) {
          fallback = null;
        }
        if (fallback === 'description') {
          return null;
        }
        return fallback;
      }
      return translated.text;
    }
    descriptionTranslation() {
      return AB.translation(this._translationSubscription, 'description');
    }
    styleClasses() {
      return ''; // Override to provide a string with class names for styling the asset.
    }
    editorStyleClasses() {
      return ''; // Override to provide a string with class names for styling the surrounding editor.
    }
    editorOptions() {
      return null; // Override to provide an object that is sent to the editor and relevant components.
    }
    referenceDefaults() {
      return null; // Override to provide an object mapping image urls to reference's default values.
    }
  }
  ;
  Asset.Types = {
    None: 'None',
    Bitmap: 'Bitmap',
    Photo: 'Photo'
  };
  Asset._assetClassesById = {};
  return Asset;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assets":{"bitmap":{"bitmap.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/bitmap.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Bitmap, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Babel;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Project.Asset.Bitmap = class Bitmap extends PAA.Practice.Project.Asset {
  // bitmapId: reference to a bitmap

  // Type of this asset.
  static type() {
    return this.Types.Bitmap;
  }

  // Override to provide an object with width and height to specify that this bitmap has predefined dimensions.
  static fixedDimensions() {
    return null;
  }

  // Override to provide an object with width and height to specify that this bitmap has a minimum size.
  static minDimensions() {
    return null;
  }

  // Override to provide an object with width and height to specify that this bitmap has a maximum size.
  static maxDimensions() {
    return null;
  }

  // Override to provide the name of the palette this bitmap must be created with.
  static restrictedPaletteName() {
    return null;
  }

  // Override to set which background color is used.
  static backgroundColor() {
    return null;
  }

  // Override to restrict the total number of colors used.
  static maxColorCount() {
    return null;
  }

  // Override to provide a string with more information related to the bitmap (e.g. author info in challenges).
  static bitmapInfo() {
    return null;
  }

  // Override to add a style class to bitmap info.
  static bitmapInfoClass() {
    return '';
  }
  static portfolioComponentClass() {
    return this.PortfolioComponent;
  }
  static clipboardComponentClass() {
    return this.ClipboardComponent;
  }
  static briefComponentClass() {
    // Override to provide a different brief component.
    return this.BriefComponent;
  }

  // Override if the asset requires a pixel art evaluation analysis.
  // You can return an object to be sent as options to the constructor.
  static pixelArtEvaluation() {
    return false;
  }

  // Override if the asset requires a readability analysis.
  static readabilityAnalysis() {
    return false;
  }
  static initialize() {
    super.initialize(...arguments);
    // On the server, create this asset's translated names.
    if (Meteor.isServer) {
      return Document.startup(() => {
        var i, len, property, ref, results, translationNamespace, value;
        if (Meteor.settings.startEmpty) {
          return;
        }
        translationNamespace = this.id();
        ref = ['bitmapInfo'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          property = ref[i];
          if (value = typeof this[property] === "function" ? this[property]() : void 0) {
            results.push(AB.createTranslation(translationNamespace, property, value));
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
    }
  }
  constructor() {
    var briefComponentClass, restrictedPaletteName;
    super(...arguments);
    this.bitmapId = new AE.LiveComputedField(() => {
      var ref;
      return (ref = this.data()) != null ? ref.bitmapId : void 0;
    });
    this.bitmap = new AE.LiveComputedField(() => {
      var bitmapId;
      if (!(bitmapId = this.bitmapId())) {
        return;
      }
      return LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId);
    });

    // Allow to get the versioned document in a non-reactive way.
    this.versionedBitmap = new AE.LiveComputedField(() => {
      var bitmapId;
      if (!(bitmapId = this.bitmapId())) {
        return;
      }
      return LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId, false);
    });

    // Alias for the drawing app.
    this.document = this.bitmap;
    // Allow palette access.
    // Note: We need this immediately so that background color can be calculated in the portfolio.
    this.palette = new AE.LiveComputedField(() => {
      return this.customPalette() || this.restrictedPalette();
    });
    briefComponentClass = this.constructor.briefComponentClass();
    this.briefComponent = new briefComponentClass(this);

    // Subscribe to the palette.
    if (restrictedPaletteName = this.constructor.restrictedPaletteName()) {
      this._restrictedPaletteSubscription = LOI.Assets.Palette.forName.subscribeContent(restrictedPaletteName);
    }
    // Prepare lazy initialization.
    this.initialized = new ReactiveField(false);
    // Allow derived classes to finish constructing.
    Meteor.setTimeout(() => {
      return this._initializingAutorun = Tracker.autorun(computation => {
        if (!this.initializingConditions()) {
          return;
        }
        computation.stop();
        return Tracker.nonreactive(() => {
          return this.initialize();
        });
      });
    });
  }
  destroy() {
    var ref, ref1, ref2, ref3;
    super.destroy(...arguments);
    this.bitmapId.stop();
    this.bitmap.stop();
    this.versionedBitmap.stop();
    this.palette.stop();
    if ((ref = this._restrictedPaletteSubscription) != null) {
      ref.stop();
    }
    if ((ref1 = this._initializingAutorun) != null) {
      ref1.stop();
    }
    if ((ref2 = this._pixelArtEvaluation) != null) {
      ref2.destroy();
    }
    return (ref3 = this._readabilityAnalysis) != null ? ref3.destroy() : void 0;
  }
  initializingConditions() {
    // Wait with initializing until we've selected the asset as the active one in the editor.
    return this._isActiveInEditor(false);
  }
  _isActiveInEditor(requiresDrawingActive) {
    var asset, editor;
    if (!(editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor())) {
      return;
    }
    if (!editor.isCreated()) {
      return;
    }
    if (!(asset = editor.activeAsset())) {
      return;
    }
    if (!(asset instanceof this.constructor)) {
      return;
    }
    if (requiresDrawingActive && !editor.drawingActive()) {
      return;
    }
    return true;
  }
  initialize() {
    if (this._initializing) {
      return;
    }
    this._initializing = true;
    return this._initialize();
  }

  // Override to provide extra initialization functionality.
  _initialize() {
    var pixelArtEvaluation, pixelArtEvaluationOptions, readabilityAnalysis, readabilityAnalysisOptions;
    // Create additional helpers.
    if (pixelArtEvaluation = this.constructor.pixelArtEvaluation()) {
      // Pixel art evaluation options can either come from the constructor or from the instance.
      // We check if the instance provides this options method, otherwise we take the static one.
      if (this.pixelArtEvalutionOptions) {
        pixelArtEvaluationOptions = this.pixelArtEvaluationOptions();
      } else {
        pixelArtEvaluationOptions = _.isObject(pixelArtEvaluation) ? pixelArtEvaluation : {};
      }
      this.pixelArtEvaluationInstance = new ComputedField(() => {
        var bitmap, ref;
        if (!(bitmap = this.versionedBitmap())) {
          return;
        }
        if ((ref = this._pixelArtEvaluation) != null) {
          ref.destroy();
        }
        return this._pixelArtEvaluation = new PAA.Practice.PixelArtEvaluation(bitmap, pixelArtEvaluationOptions);
      });
      this.pixelArtEvaluation = new ComputedField(() => {
        var pixelArtEvaluationInstance;
        if (!(pixelArtEvaluationInstance = this.pixelArtEvaluationInstance())) {
          return;
        }
        pixelArtEvaluationInstance.depend();
        return pixelArtEvaluationInstance;
      });
    }
    if (readabilityAnalysis = this.constructor.readabilityAnalysis()) {
      // Readability analysis options can either come from the constructor or from the instance.
      // We check if the instance provides this options method, otherwise we take the static one.
      if (this.readabilityAnalysisOptions) {
        readabilityAnalysisOptions = this.readabilityAnalysisOptions();
      } else {
        readabilityAnalysisOptions = _.isObject(readabilityAnalysis) ? readabilityAnalysis : {};
      }
      this.readabilityAnalysisInstance = new ComputedField(() => {
        var bitmap, ref;
        if (!(bitmap = this.versionedBitmap())) {
          return;
        }
        if ((ref = this._readabilityAnalysis) != null) {
          ref.destroy();
        }
        return this._readabilityAnalysis = new PAA.Practice.ReadabilityAnalysis(bitmap, readabilityAnalysisOptions);
      });
      this.readabilityAnalysis = new ComputedField(() => {
        var readabilityAnalysisInstance;
        if (!(readabilityAnalysisInstance = this.readabilityAnalysisInstance())) {
          return;
        }
        readabilityAnalysisInstance.depend();
        return readabilityAnalysisInstance;
      });
    }
    return Meteor.setTimeout(() => {
      return this.initialized(true);
    });
  }
  _afterInitialization(action) {
    this.initialize();
    return Tracker.autorun(computation => {
      if (!this.initialized()) {
        return;
      }
      computation.stop();
      return action();
    });
  }
  urlParameter() {
    return this.bitmapId();
  }
  ready() {
    // We're ready when the bitmap has been loaded.
    return this.bitmap();
  }
  width() {
    var ref;
    return (ref = this.bitmap()) != null ? ref.bounds.width : void 0;
  }
  height() {
    var ref;
    return (ref = this.bitmap()) != null ? ref.bounds.height : void 0;
  }
  pixelArtScaling() {
    return true;
  }
  portfolioBorderWidth() {
    return 6;
  }

  // Returns information about presenting the asset in the drawing app.
  // borderWidth: how thick the border should be
  // scale: what magnification the preview is using
  // position: where the top-left corner of the preview is
  //   top, left: CSS string for positioning the preview
  previewInfo() {
    if (!this.clipboardComponent.isCreated()) {
      return;
    }
    return this.clipboardComponent.callFirstWith(null, 'previewInfo');
  }
  fixedDimensions() {
    return this.constructor.fixedDimensions();
  }
  restrictedPalette() {
    var restrictedPaletteName;
    if (!(restrictedPaletteName = this.constructor.restrictedPaletteName())) {
      return;
    }
    return LOI.Assets.Palette.documents.findOne({
      name: restrictedPaletteName
    });
  }
  customPalette() {
    var customPalette, ref;
    if (customPalette = (ref = this.bitmap()) != null ? ref.customPalette : void 0) {
      return new LOI.Assets.Palette(customPalette);
    }
  }
  backgroundColor() {
    var backgroundColor, palette, paletteColor;
    if (!(backgroundColor = this.constructor.backgroundColor())) {
      return;
    }
    if (paletteColor = backgroundColor.paletteColor) {
      if (!(palette = this.palette())) {
        return;
      }
      return palette.color(paletteColor.ramp, paletteColor.shade);
    } else {
      // We assume the color is already a color instance.
      return backgroundColor;
    }
  }
  bitmapInfo() {
    var translation;
    translation = AB.translate(this._translationSubscription, 'bitmapInfo');
    if (translation.language) {
      return translation.text;
    } else {
      return null;
    }
  }
  bitmapInfoTranslation() {
    return AB.translation(this._translationSubscription, 'bitmapInfo');
  }
  bitmapInfoClass() {
    return this.constructor.bitmapInfoClass();
  }
  imageUrl() {
    var bitmapId;
    if (!(bitmapId = this.bitmapId())) {
      return;
    }
    return "/assets/bitmap.png?id=".concat(bitmapId);
  }

  // Override if you want to send options based on the bitmap instance (instead of the static options).
  pixelArtEvaluationOptions() {}
  readabilityAnalysisOptions() {}
};

// We want a generic state for bitmap assets so we create it outside of the constructor as inherited classes don't need it.
// canEdit: can the user edit the bitmaps with built-in editors
// canUpload: can the user upload bitmaps
// unlockedPixelArtEvaluationCriteria: array of pixel art evaluation criteria that the user can enable
Bitmap = PAA.Practice.Project.Asset.Bitmap;
Bitmap.stateAddress = new LOI.StateAddress("things.PixelArtAcademy.Practice.Project.Asset.Bitmap");
Bitmap.state = new LOI.StateObject({
  address: Bitmap.stateAddress
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/portfoliocomponent/portfoliocomponent.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Project.Asset.Bitmap.PortfolioComponent = function () {
  class PortfolioComponent extends AM.Component {
    constructor(bitmap) {
      super(...arguments);
      this.bitmap = bitmap;
    }
    bitmapStyle() {
      var assetData, backgroundColor, scale, style;
      assetData = this.parentDataWith('scale');
      scale = assetData.scale();
      style = {
        width: "".concat(this.bitmap.width() * scale, "rem"),
        height: "".concat(this.bitmap.height() * scale, "rem")
      };
      if (backgroundColor = this.bitmap.backgroundColor()) {
        style.backgroundColor = "#".concat(backgroundColor.getHexString());
        style.borderColor = style.backgroundColor;
      }
      return style;
    }
    bitmapImage() {
      var bitmapId;
      if (!(bitmapId = this.bitmap.bitmapId())) {
        return;
      }
      return new LOI.Assets.Components.BitmapImage({
        bitmapId: () => {
          return bitmapId;
        },
        loadPalette: true
      });
    }
  }
  ;
  PortfolioComponent.register('PixelArtAcademy.Practice.Project.Asset.Bitmap.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/portfoliocomponent/template.portfoliocomponent.j //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Project.Asset.Bitmap.PortfolioComponent");
Template["PixelArtAcademy.Practice.Project.Asset.Bitmap.PortfolioComponent"] = new Template("Template.PixelArtAcademy.Practice.Project.Asset.Bitmap.PortfolioComponent", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-practice-project-asset-bitmap-portfoliocomponent"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("bitmapStyle"));
  }), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("bitmapImage"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"clipboardcomponent":{"clipboardcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/clipboardcomponent/clipboardcomponent.coffee     //
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
PAA.Practice.Project.Asset.Bitmap.ClipboardComponent = function () {
  class ClipboardComponent extends AM.Component {
    constructor(asset) {
      super(...arguments);
      this.asset = asset;
      this.secondPageActive = new ReactiveField(false);
    }
    mixins() {
      return [PAA.Practice.Project.Asset.Bitmap.ClipboardComponent.PreviewInfoMixin];
    }
    onCreated() {
      super.onCreated(...arguments);
      this.drawing = this.ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
      // Calculate asset size.
      this.bitmapBounds = new ComputedField(() => {
        var ref;
        return (ref = this.asset.bitmap()) != null ? ref.bounds : void 0;
      }, EJSON.equals);
      this.assetScale = new ComputedField(() => {
        var ref;
        return (ref = this.drawing.portfolio().displayedAsset()) != null ? ref.scale() : void 0;
      });
      this.maxAssetHeight = new ReactiveField(null);
      return this.assetSize = new ComputedField(() => {
        var assetScale, base, base1, bitmapBounds, maxAssetHeight, maxScale, minScale, options;
        if (!(bitmapBounds = this.bitmapBounds())) {
          return;
        }
        if (!(assetScale = this.assetScale())) {
          return;
        }
        options = {
          border: true,
          pixelArtScaling: true,
          scaleLimits: {}
        };
        // Check if the asset provides a minimum or maximum scale.
        if (minScale = typeof (base = this.asset).minClipboardScale === "function" ? base.minClipboardScale() : void 0) {
          options.scaleLimits.min = minScale;
        }
        if (maxScale = typeof (base1 = this.asset).maxClipboardScale === "function" ? base1.maxClipboardScale() : void 0) {
          options.scaleLimits.max = maxScale;
        }
        if (maxAssetHeight = this.maxAssetHeight()) {
          options.fitToHeight = maxAssetHeight;
        }
        return PAA.PixelPad.Apps.Drawing.Clipboard.calculateAssetSize(assetScale, bitmapBounds, options);
      }, EJSON.equals);
    }
    onRendered() {
      super.onRendered(...arguments);

      // Recalculate how much space the asset has, both when the component content's resizes.
      this.$pageFirstContent = this.$('.page-first .content');
      this._resizeObserver = new ResizeObserver(() => {
        return this._updateMaxAssetHeight();
      });
      this._resizeObserver.observe(this.$pageFirstContent[0]);

      // Recalculate it reactively due to asset size changes.
      return this.autorun(computation => {
        return this._updateMaxAssetHeight();
      });
    }
    onDestroyed() {
      var ref;
      super.onDestroyed(...arguments);
      return (ref = this._resizeObserver) != null ? ref.disconnect() : void 0;
    }
    _updateMaxAssetHeight() {
      var assetSize, contentHeight, currentAssetHeight, displayScale, maxTotalHeight, nonAssetHeight;
      if (!(assetSize = this.assetSize())) {
        return;
      }
      displayScale = LOI.adventure.interface.display.scale();
      contentHeight = this.$pageFirstContent.outerHeight() / displayScale;
      maxTotalHeight = 260 - 24 - 10;
      currentAssetHeight = assetSize.contentHeight + 2 * assetSize.borderWidth;
      nonAssetHeight = contentHeight - currentAssetHeight;
      return this.maxAssetHeight(maxTotalHeight - nonAssetHeight);
    }
    onBackButton() {
      if (this.secondPageActive()) {
        this.closeSecondPage();

        // Inform that we've handled the back button.
        return true;
      }
    }
    editorActive() {
      return this.drawing.editor().active();
    }
    editAsset() {
      return AB.Router.changeParameter('parameter4', 'edit');
    }
    showSecondPage() {
      return this.secondPageActive(true);
    }
    closeSecondPage() {
      return this.secondPageActive(false);
    }
    assetPlaceholderStyle() {
      var assetSize;
      if (!(assetSize = this.assetSize())) {
        return;
      }
      return {
        width: "".concat(assetSize.contentWidth + 2 * assetSize.borderWidth, "rem"),
        height: "".concat(assetSize.contentHeight + 2 * assetSize.borderWidth, "rem")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .back-button': this.onClickBackButton
      });
    }
    onClickBackButton(event) {
      return this.closeSecondPage();
    }
  }
  ;
  ClipboardComponent.register('PixelArtAcademy.Practice.Project.Asset.Bitmap.ClipboardComponent');
  return ClipboardComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.clipboardcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/clipboardcomponent/template.clipboardcomponent.j //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Project.Asset.Bitmap.ClipboardComponent");
Template["PixelArtAcademy.Practice.Project.Asset.Bitmap.ClipboardComponent"] = new Template("Template.PixelArtAcademy.Practice.Project.Asset.Bitmap.ClipboardComponent", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-practice-project-asset-bitmap-clipboardcomponent ", Spacebars.mustache(view.lookup("activeAssetClass")), " ", Spacebars.mustache(view.lookup("editorActiveClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: "page-second"
  }, "\n      ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("asset"), "clipboardSecondPageComponent"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("secondPageActive"));
  }, function() {
    return HTML.Raw('\n      <button class="page-first-turned back-button"></button>\n    ');
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "page-first"
    }, "\n        ", HTML.DIV({
      class: "content"
    }, "\n          ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("asset"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: function() {
          return [ "asset-info ", Spacebars.mustache(view.lookup("styleClasses")) ];
        }
      }, "\n              ", HTML.DIV({
        class: "name"
      }, Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("displayNameTranslation"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("t10e"));
      })), "\n              ", HTML.DIV({
        class: "description"
      }, "\n                ", Spacebars.include(view.lookupTemplate("Markdown"), function() {
        return Blaze.View("lookup:description", function() {
          return Spacebars.mustache(view.lookup("description"));
        });
      }), "\n              "), "\n              ", Blaze._TemplateWith(function() {
        return Spacebars.call(view.lookup("briefComponent"));
      }, function() {
        return Spacebars.include(view.lookupTemplate("Render"));
      }), "\n            "), "\n          " ];
    }), "\n          ", HTML.DIV(HTML.Attrs({
      class: "asset-placeholder"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("assetPlaceholderStyle"));
    })), "\n          ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("asset"), "bitmapInfo"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: function() {
          return [ "bitmap-info ", Spacebars.mustache(Spacebars.dot(view.lookup("asset"), "bitmapInfoClass")) ];
        }
      }, Spacebars.include(view.lookupTemplate("Markdown"), function() {
        return Blaze.View("lookup:asset.bitmapInfo", function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("asset"), "bitmapInfo"));
        });
      })), "\n          " ];
    }), "\n        "), "\n      "), "\n    " ];
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"previewinfomixin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/clipboardcomponent/previewinfomixin.coffee       //
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
PAA.Practice.Project.Asset.Bitmap.ClipboardComponent.PreviewInfoMixin = class PreviewInfoMixin extends BlazeComponent {
  onCreated() {
    this.drawing = this.component().ancestorComponentOfType(PAA.PixelPad.Apps.Drawing);
    this.assetInfoChangedDependency = new Tracker.Dependency();
    this.isAssetActive = new ComputedField(() => {
      var editor;
      if (!(editor = this.drawing.editor())) {
        return;
      }
      if (!editor.isCreated()) {
        return;
      }
      return editor.activeAsset() != null;
    });
    this.previewPosition = new ReactiveField(null, EJSON.equals);
    return this.previewInfo = new ComputedField(() => {
      var assetSize, left, previewPosition, top;
      if (!(assetSize = this.component().assetSize())) {
        return;
      }
      if (!(previewPosition = this.previewPosition())) {
        return;
      }
      left = "calc(50% + ".concat(previewPosition.left, "rem)");
      if (this.isAssetActive()) {
        top = "calc(50% + ".concat(previewPosition.top, "rem)");
      } else {
        // When the asset is not active, the clipboard center is -145rem above the top of the screen.
        top = "".concat(previewPosition.top - 145, "rem");
      }
      return {
        scale: assetSize.scale,
        borderWidth: assetSize.borderWidth,
        position: {
          left,
          top
        }
      };
    }, EJSON.equals);
  }
  onRendered() {
    super.onRendered(...arguments);
    this.$clipboard = $('.pixelartacademy-pixelpad-apps-drawing-clipboard');

    // Recalculate the position of the placeholder.
    return this.autorun(computation => {
      // Don't measure when the second page is displayed.
      if (this.component().secondPageActive()) {
        return;
      }
      // Depend on the content above the placeholder.
      this.assetInfoChangedDependency.depend();
      return this._updatePreviewPosition();
    });
  }
  _updatePreviewPosition() {
    var $assetInfo, $assetPlaceholder, assetOffset, offsetOrigin, ref, scale;
    // Make sure we're still rendered.
    if (!this.isRendered()) {
      return;
    }

    // React to asset info changes.
    $assetInfo = this.$('.asset-info');

    // If the first page hasn't rendered yet (as when returning from the second page), wait until it does.
    if (!$assetInfo.length) {
      Tracker.afterFlush(() => {
        return this._updatePreviewPosition();
      });
      return;
    }
    if ($assetInfo[0] !== this.assetInfo) {
      this.assetInfo = $assetInfo[0];
      if ((ref = this._resizeObserver) != null) {
        ref.disconnect();
      }
      this._resizeObserver = new ResizeObserver(() => {
        return this.assetInfoChangedDependency.changed();
      });
      this._resizeObserver.observe(this.assetInfo);
    }
    $assetPlaceholder = this.$('.asset-placeholder');

    // Measure the placeholder relative to the center of the clipboard.
    assetOffset = $assetPlaceholder.offset();
    offsetOrigin = this.$clipboard.offset();
    offsetOrigin.left += this.$clipboard.width() / 2;
    offsetOrigin.top += this.$clipboard.height() / 2;
    scale = LOI.adventure.interface.display.scale();
    return this.previewPosition({
      left: (assetOffset.left - offsetOrigin.left) / scale,
      top: (assetOffset.top - offsetOrigin.top) / scale
    });
  }
  onDestroyed() {
    var ref;
    super.onDestroyed(...arguments);
    return (ref = this._resizeObserver) != null ? ref.disconnect() : void 0;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"briefcomponent":{"briefcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/briefcomponent/briefcomponent.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Project.Asset.Bitmap.BriefComponent = function () {
  class BriefComponent extends AM.Component {
    constructor(bitmap) {
      super(...arguments);
      this.bitmap = bitmap;
    }
    onCreated() {
      super.onCreated(...arguments);
      this.parent = this.ancestorComponentWith('editAsset');
      this.autorun(computation => {
        var palette, ref;
        if (!(palette = (ref = this.bitmap.bitmap()) != null ? ref.palette : void 0)) {
          return;
        }
        return LOI.Assets.Palette.forId.subscribeContent(this, palette._id);
      });
      return this.palette = new ComputedField(() => {
        var palette, ref;
        if (!(palette = (ref = this.bitmap.bitmap()) != null ? ref.palette : void 0)) {
          return;
        }
        return LOI.Assets.Palette.documents.findOne(palette._id);
      });
    }
    needsSettingsSelection() {
      return !(PAA.PixelPad.Apps.Drawing.state('editorId') || PAA.PixelPad.Apps.Drawing.state('externalSoftware'));
    }
    needsToolsChallenge() {
      return true;
    }
    noActions() {
      return !(this.canEdit() || this.canUpload());
    }
    canEdit() {
      return PAA.PixelPad.Apps.Drawing.canEdit();
    }
    canUpload() {
      return PAA.PixelPad.Apps.Drawing.canUpload();
    }
    customPaletteColorsString() {
      var count, i, len, ramp, ref;
      count = 0;
      ref = this.bitmap.customPalette().ramps;
      for (i = 0, len = ref.length; i < len; i++) {
        ramp = ref[i];
        count += ramp.shades.length;
      }
      return "".concat(count, " color").concat(count > 1 ? 's' : '');
    }
    bitmapImageFileName() {
      return _.kebabCase(this.bitmap.displayName());
    }
    events() {
      return super.events(...arguments).concat({
        'click .edit-button': this.onClickEditButton,
        'click .assets-button': this.onClickAssetsButton,
        'click .upload-button': this.onClickUploadButton
      });
    }
    onClickEditButton(event) {
      return this.parent.editAsset();
    }
    onClickAssetsButton(event) {
      return this.parent.showSecondPage();
    }
    onClickUploadButton(event) {
      var $fileInput;
      $fileInput = $('<input type="file"/>');
      $fileInput.on('change', event => {
        var file, reader, ref;
        if (!(file = (ref = $fileInput[0]) != null ? ref.files[0] : void 0)) {
          return;
        }
        // Load file.
        reader = new FileReader();
        reader.onload = event => {
          var image;
          image = new Image();
          image.onload = () => {
            var canvas, context, fixedDimensions, imageData;
            if (fixedDimensions = this.bitmap.fixedDimensions()) {
              // Make sure the dimensions match.
              if (!(image.width === fixedDimensions.width && image.height === fixedDimensions.height)) {
                // Report the mismatch to the player.
                LOI.adventure.showActivatableModalDialog({
                  dialog: new LOI.Components.Dialog({
                    message: "The size of the uploaded image (".concat(image.width, "\xD7").concat(image.height, ") does not match the required bitmap size (").concat(fixedDimensions.width, "\xD7").concat(fixedDimensions.height, ")."),
                    buttons: [{
                      text: "OK"
                    }]
                  })
                });
                return;
              }
            }
            canvas = $('<canvas>')[0];
            canvas.width = image.width;
            canvas.height = image.height;
            context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            return this.processUploadData(imageData);
          };
          return image.src = event.target.result;
        };
        return reader.readAsDataURL(file);
      });
      return $fileInput.click();
    }
    processUploadData(imageData) {
      var backgroundColor, bitmapData, palette, pixels;
      // Prepare for palette mapping.
      bitmapData = this.bitmap.bitmap();
      palette = bitmapData.customPalette || LOI.Assets.Palette.documents.findOne(bitmapData.palette._id);
      // See if we have a background color defined.
      backgroundColor = this.bitmap.constructor.backgroundColor();
      if (backgroundColor != null ? backgroundColor.paletteColor : void 0) {
        // Map palette color to a direct color so we can calculate distance to it.
        backgroundColor = palette.ramps[backgroundColor.paletteColor.ramp].shades[backgroundColor.paletteColor.shade];
      }
      pixels = this._createPixels(imageData, palette, backgroundColor);
      return LOI.Assets.Bitmap.replacePixels(this.bitmap.bitmapId(), 0, pixels);
    }
    _createPixels(imageData, palette, backgroundColor) {
      var a, b, g, i, j, paletteColor, pixel, pixelIndex, pixels, r, ref, ref1, x, y;
      pixels = [];
      for (x = i = 0, ref = imageData.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = imageData.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          pixelIndex = (x + y * imageData.width) * 4;
          // Skip transparent pixels.
          a = imageData.data[pixelIndex + 3];
          if (!a) {
            continue;
          }
          r = imageData.data[pixelIndex] / 255;
          g = imageData.data[pixelIndex + 1] / 255;
          b = imageData.data[pixelIndex + 2] / 255;
          pixel = null;

          // This is a full pixel. If we have a palette, find the closest palette color.
          if (palette) {
            paletteColor = palette.closestPaletteColorFromRGB(r, g, b, backgroundColor);

            // If we found a palette color, add the pixel.
            if (paletteColor) {
              pixel = {
                x,
                y,
                paletteColor
              };
            }
          } else {
            pixel = {
              x: x,
              y: y,
              directColor: {
                r,
                g,
                b
              }
            };
          }
          if (pixel) {
            pixels.push(pixel);
          }
        }
      }
      return pixels;
    }
  }
  ;
  BriefComponent.register('PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent');
  return BriefComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.briefcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/assets/bitmap/briefcomponent/template.briefcomponent.js        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent");
Template["PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent"] = new Template("Template.PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent", (function() {
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
      }), "\n      "), "\n    " ];
    }), "\n  " ];
  });
}));

Template.__checkName("PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.Properties");
Template["PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.Properties"] = new Template("Template.PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.Properties", (function() {
  var view = this;
  return HTML.UL({
    class: "properties"
  }, "\n    ", HTML.LI({
    class: "property fixed-dimensions"
  }, HTML.Raw('\n      <span class="property-name">尺寸</span>:\n      '), Blaze.View("lookup:fixedDimensions.width", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("fixedDimensions"), "width"));
  }), "×", Blaze.View("lookup:fixedDimensions.height", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("fixedDimensions"), "height"));
  }), "\n    "), "\n    ", HTML.LI({
    class: "property restricted-palette"
  }, HTML.Raw('\n      <span class="property-name">调色板</span>:\n      '), Blaze.If(function() {
    return Spacebars.call(view.lookup("restrictedPalette"));
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("palette"), "lospecSlug"));
    }, function() {
      return [ "\n          ", HTML.A({
        href: function() {
          return [ "https://lospec.com/palette-list/", Spacebars.mustache(Spacebars.dot(view.lookup("palette"), "lospecSlug")) ];
        },
        target: "_blank"
      }, Blaze.View("lookup:restrictedPalette.name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("restrictedPalette"), "name"));
      })), "\n        " ];
    }, function() {
      return [ "\n          ", Blaze.View("lookup:restrictedPalette.name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("restrictedPalette"), "name"));
      }), "\n        " ];
    }), "\n      " ];
  }), "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("customPalette"));
  }, function() {
    return [ "\n        Custom, ", Blaze.View("lookup:customPaletteColorsString", function() {
      return Spacebars.mustache(view.lookup("customPaletteColorsString"));
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

Template.__checkName("PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.NoActions");
Template["PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.NoActions"] = new Template("Template.PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.NoActions", (function() {
  var view = this;
  return HTML.DIV({
    class: "no-actions"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("needsSettingsSelection"));
  }, function() {
    return "\n      在设置中选择编辑器或外部软件来编辑素材。\n    ";
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("needsToolsChallenge"));
    }, function() {
      return "\n        完成像素画软件挑战后才能编辑素材。\n      ";
    }), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.DefaultActions");
Template["PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.DefaultActions"] = new Template("Template.PixelArtAcademy.Practice.Project.Asset.Bitmap.BriefComponent.DefaultActions", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("canEdit"));
  }, function() {
    return HTML.Raw('\n    <li class="action">\n      <button class="button edit-button">编辑</button>\n    </li>\n  ');
  }), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("canUpload"));
  }, function() {
    return [ "\n    ", HTML.LI({
      class: "action"
    }, "\n      ", HTML.A({
      class: "link download",
      href: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("bitmap"), "imageUrl"));
      },
      download: function() {
        return [ Spacebars.mustache(view.lookup("bitmapImageFileName")), ".png" ];
      }
    }, "Download"), "\n    "), HTML.Raw('\n    <li class="action">\n      <button class="button upload-button">上传</button>\n    </li>\n  ') ];
  }) ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"migrations":{"0000-projectthings.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/project/migrations/0000-projectthings.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Migration,
  PAA,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
PAA = PixelArtAcademy;
Migration = function () {
  class Migration extends Document.MajorMigration {
    constructor() {
      super(...arguments);
      this.forward = this.forward.bind(this);
    }
    forward(document, collection, currentSchema, newSchema) {
      var count, counts;
      boundMethodCheck(this, Migration);
      count = 0;
      collection.findEach({
        _schema: currentSchema,
        type: /^(?!.*\.Project$)/
      }, document => {
        var type;
        type = "".concat(document.type, ".Project");

        // Remove deprecated character reference field name.
        return count += collection.update({
          _id: document._id
        }, {
          $set: {
            type: type,
            _schema: newSchema
          }
        });
      });
      counts = super.forward(...arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    }
  }
  ;
  Migration.prototype.name = "Change Snake, Invasion, and Pinball project types.";
  return Migration;
}.call(this);
PAA.Practice.Project.addMigration(new Migration());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"challenges":{"challenges.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/challenges/challenges.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Challenges = class Challenges {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawing":{"drawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/challenges/drawing/drawing.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Challenges.Drawing = function () {
  class Drawing extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.Practice.Challenges.Drawing';
    }
  }
  ;
  Drawing.initialize();
  return Drawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"tutorials":{"tutorials.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/tutorials.coffee                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Tutorials = class Tutorials {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawing":{"drawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/drawing.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Tutorials.Drawing = function () {
  class Drawing extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.Practice.Tutorials.Drawing';
    }
  }
  ;
  Drawing.initialize();
  return Drawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tutorial.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/tutorial.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI,
  PAA,
  ref,
  indexOf = [].indexOf,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
ref = PAA.Practice.Tutorials.Drawing.Tutorial = class Tutorial extends PAA.Practice.Project.Thing {
  // assets: array of assets that are part of this tutorial
  //   id: unique asset identifier
  //   type: what kind of asset this is
  //   completed: auto-updated field if the player completed this asset

  //   BITMAP
  //   bitmapId: ID of the bitmap representing this asset
  static assets() {
    // Override to provide asset classes that are included in this tutorial.
    return [];
  }
  static assetsCount() {
    return this.assets().length;
  }
  static completedAssetsCount() {
    var asset, assets;
    // Due to changes in the curriculum, we have to filter assets to the ones that are currently enabled.
    if (this._assetIds == null) {
      this._assetIds = function () {
        var i, len, ref1, results;
        ref1 = this.assets();
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          asset = ref1[i];
          results.push(asset.id());
        }
        return results;
      }.call(this);
    }
    assets = _.filter(this.state('assets') || [], asset => {
      var ref1;
      return ref1 = asset.id, indexOf.call(this._assetIds, ref1) >= 0;
    });
    return _.sum(function () {
      var i, len, results;
      results = [];
      for (i = 0, len = assets.length; i < len; i++) {
        asset = assets[i];
        results.push(asset.completed ? 1 : 0);
      }
      return results;
    }());
  }
  static completedRatio() {
    return this.completedAssetsCount() / this.assetsCount();
  }

  // By default we have to complete all assets to complete the tutorial.
  static requiredAssetsCount() {
    return this.assetsCount();
  }
  static requiredCompletedAssetsCount() {
    return this.completedAssetsCount();
  }
  static requiredCompletedRatio() {
    return this.completedRatio();
  }
  static completed() {
    return this.requiredCompletedRatio() === 1;
  }
  static isAssetCompleted(assetClassOrId) {
    var asset, assetId, assets;
    if (!(assets = this.state('assets'))) {
      return;
    }
    assetId = _.thingId(assetClassOrId);
    if (!(asset = _.find(assets, asset => {
      return asset.id === assetId;
    }))) {
      return;
    }
    return asset.completed;
  }
  constructor() {
    super(...arguments);
    this._assetsComparison = this._assetsComparison.bind(this);
    this._assets = [];
    this.assets = new ComputedField(() => {
      var assetClass, assets, base, i, index, len, ref1;
      assets = [];
      ref1 = this.constructor.assets();
      for (index = i = 0, len = ref1.length; i < len; index = ++i) {
        assetClass = ref1[index];
        if ((base = this._assets)[index] == null) {
          base[index] = Tracker.nonreactive(() => {
            return new assetClass(this);
          });
        }
        assets.unshift(this._assets[index]);
        if (!this.isAssetCompleted(this._assets[index])) {
          break;
        }
      }
      return assets;
    }, this._assetsComparison, true);
  }
  destroy() {
    var asset, i, len, ref1;
    ref1 = this._assets;
    for (i = 0, len = ref1.length; i < len; i++) {
      asset = ref1[i];
      asset.destroy();
    }
    return this.assets.stop();
  }
  completed() {
    return this.constructor.completed();
  }
  isAssetCompleted(assetClassOrId) {
    return this.constructor.isAssetCompleted(assetClassOrId);
  }
  assetsData() {
    if (!LOI.adventure.gameStateAvailable()) {
      return;
    }
    // We need to mimic a project, so we need to provide the data. If no state is
    // set, we send a dummy object to let the bitmap know we've loaded the state.
    return this.state('assets') || [];
  }
  _assetsComparison(a, b) {
    var asset, i, index, len;
    boundMethodCheck(this, ref);
    // We consider assets have changed only when the array values differ.
    if (a.length !== b.length) {
      return;
    }
    for (index = i = 0, len = a.length; i < len; index = ++i) {
      asset = a[index];
      if (asset !== b[index]) {
        return;
      }
    }
    return true;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructionsmarkupenginecomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/instructionsmarkupenginecomponent.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Tutorials.Drawing.InstructionsMarkupEngineComponent = class InstructionsMarkupEngineComponent extends PAA.Practice.Helpers.Drawing.Markup.EngineComponent {
  constructor() {
    super(...arguments);
    this.markup = new ComputedField(() => {
      var instruction, instructions, pixelPad;
      if (!(pixelPad = LOI.adventure.getCurrentThing(PAA.PixelPad))) {
        return;
      }
      if (!(instructions = pixelPad.os.getSystem(PAA.PixelPad.Systems.Instructions))) {
        return;
      }
      if (!instructions.isCreated()) {
        return;
      }
      if (!(instruction = instructions.displayedInstruction())) {
        return;
      }
      return typeof instruction.markup === "function" ? instruction.markup() : void 0;
    });
  }
  drawToContext(context) {
    let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var markup;
    if (!(markup = this.markup())) {
      return;
    }
    return this.drawMarkup(markup, context, {
      pixelSize: 1 / renderOptions.camera.effectiveScale() * devicePixelRatio,
      displayPixelSize: 1 / renderOptions.camera.effectiveScale() * renderOptions.editor.display.scale()
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"assets":{"assets.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/assets.coffee                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Tutorials.Drawing.Assets = class Assets {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tutorialbitmap":{"tutorialbitmap.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Base;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap = class TutorialBitmap extends PAA.Practice.Project.Asset.Bitmap {
  // stepAreas: an array of areas that keep track of step progression
  //   activeStepIndex: the index of the currently active step
  //   referenceUrl: optional url of the reference chosen to be drawn in this step area

  // Id used for the source of versioning actions.
  static id() {
    return 'PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap';
  }
  static portfolioComponentClass() {
    return this.PortfolioComponent;
  }

  // Override to limit the scale at which the bitmap appears in the clipboard.
  static minClipboardScale() {
    return null;
  }
  static maxClipboardScale() {
    return null;
  }

  // Override to define a palette.
  static restrictedPaletteName() {
    return null;
  }
  static customPaletteImageUrl() {
    return null;
  }
  static customPalette() {
    return null;
  }

  // Override if the bitmap should have fixed dimensions.
  static fixedDimensions() {
    return null;
  }

  // Override if the asset requires display of markup.
  static markup() {
    return false;
  }

  // Override to provide bitmap properties that need to be set on the asset.
  static properties() {
    return null;
  }
  static initialize() {
    super.initialize(...arguments);
    return this.initializeReferences();
  }
  static _isPixelEmpty(pixel, backgroundColor, palette) {
    if (!pixel) {
      // We're empty if we don't have a pixel.
      return true;
    }
    if (!backgroundColor) {
      // We do have a pixel, so if there is no background color, it can't be empty.
      return false;
    }

    // We have a pixel and a background color, the pixel is empty if it matches it.
    return LOI.Assets.ColorHelper.areAssetColorsEqual(pixel, backgroundColor, palette);
  }
  constructor() {
    super(...arguments);
    this.tutorial = this.project;
    // Create bitmap automatically if it is not present.
    this._createBitmapAutorun = Tracker.autorun(computation => {
      var assets;
      // Note: We need to read the assets from the assetsData property instead of directly from the state since this
      // needs to work even when assets array is not even yet present in the state. The assetsData method ensures at
      // least an empty array is sent as soon as the state is ready.
      if (!(assets = this.tutorial.assetsData())) {
        return;
      }
      computation.stop();
      // All is good if we have the asset with a bitmap ID.
      if (_.find(assets, asset => {
        return asset.id === this.id() && asset.bitmapId;
      })) {
        return;
      }
      // We need to create the asset with the bitmap.
      return Tracker.nonreactive(() => {
        return this.constructor.create(this.tutorial);
      });
    });
    this.completed = new AE.LiveComputedField(() => {
      var asset, assets, i, len, stepArea, stepAreas, storedCompleted;
      // Read completed state from the stored assets field unless we're in the editor.
      if (!(assets = this.tutorial.state('assets'))) {
        return;
      }
      asset = _.find(assets, asset => {
        return asset.id === this.id();
      });
      storedCompleted = asset != null ? asset.completed : void 0;
      if (!(this._isActiveInEditor(true) && this.initialized())) {
        return storedCompleted;
      }
      stepAreas = this.stepAreas();
      if (!stepAreas.length) {
        return;
      }
      for (i = 0, len = stepAreas.length; i < len; i++) {
        stepArea = stepAreas[i];
        if (!stepArea.completed()) {
          return false;
        }
      }
      return true;
    });
    this.resetting = new ReactiveField(false);
  }
  destroy() {
    var i, len, ref, ref1, ref2, ref3, ref4, results, stepArea;
    super.destroy(...arguments);
    this._createBitmapAutorun.stop();
    this._initializingAutorun.stop();
    this.completed.stop();
    if ((ref = this.hasExtraPixels) != null) {
      ref.stop();
    }
    if ((ref1 = this.hasMissingPixels) != null) {
      ref1.stop();
    }
    if ((ref2 = this._completedAutorun) != null) {
      ref2.stop();
    }
    if ((ref3 = this._loadResourcesAutorun) != null) {
      ref3.stop();
    }
    if (this.stepAreas) {
      ref4 = this.stepAreas();
      results = [];
      for (i = 0, len = ref4.length; i < len; i++) {
        stepArea = ref4[i];
        results.push(stepArea.destroy());
      }
      return results;
    }
  }
  initializingConditions() {
    // Initialize uncompleted artworks immediately so their starting steps can place any pixels.
    // Otherwise wait till we've selected the asset as the active one in the editor.
    if (!this.tutorial.state('assets')) {
      return;
    }
    if (!this.completed()) {
      return true;
    }
    return super.initializingConditions(...arguments);
  }
  debugResourceLoading() {
    return false;
  }
  _initialize() {
    var resourcesReadyRecursive;
    super._initialize(...arguments);

    // Fetch palette.
    this.hasPalette = new ComputedField(() => {
      return this.constructor.customPalette() || this.constructor.customPaletteImageUrl() || this.constructor.restrictedPaletteName();
    });

    // Prepare steps.
    this.stepAreas = new ReactiveField([]);
    this.hasExtraPixels = new AE.LiveComputedField(() => {
      var i, len, ref, stepArea;
      ref = this.stepAreas();
      for (i = 0, len = ref.length; i < len; i++) {
        stepArea = ref[i];
        if (stepArea.hasExtraPixels()) {
          return true;
        }
      }
      return false;
    });
    this.hasMissingPixels = new AE.LiveComputedField(() => {
      var i, len, ref, stepArea;
      ref = this.stepAreas();
      for (i = 0, len = ref.length; i < len; i++) {
        stepArea = ref[i];
        if (stepArea.hasMissingPixels()) {
          return true;
        }
      }
      return false;
    });

    // Create engine components.
    this.hintsEngineComponents = {
      underlying: new this.constructor.HintsEngineComponent(this, 'drawUnderlyingHints'),
      overlaid: new this.constructor.HintsEngineComponent(this, 'drawOverlaidHints')
    };
    if (this.constructor.markup()) {
      this.instructionsMarkupEngineComponent = new PAA.Practice.Tutorials.Drawing.InstructionsMarkupEngineComponent();
    }

    // Save completed value to tutorial state.
    this._completedAutorun = Tracker.autorun(computation => {
      var asset, assets, completed, updated;
      // Make sure we have the game state loaded. This can become null when switching between characters.
      if (!LOI.adventure.gameStateAvailable()) {
        return;
      }
      // We expect completed to return true or false, and undefined if can't yet determine (loading).
      completed = this.completed();
      if (completed == null) {
        return;
      }
      assets = this.tutorial.state('assets');
      if (!assets) {
        assets = [];
        updated = true;
      }
      asset = _.find(assets, asset => {
        return asset.id === this.id();
      });
      if (!asset) {
        asset = {
          id: this.id()
        };
        assets.push(asset);
        updated = true;
      }
      if (asset.completed !== completed) {
        asset.completed = completed;
        updated = true;
      }
      if (updated) {
        return Tracker.nonreactive(() => {
          return this.tutorial.state('assets', assets);
        });
      }
    });

    // Create resources.
    this.resources = this.constructor.createResources();
    this.resourcesReady = new ReactiveField(false);
    resourcesReadyRecursive = resources => {
      var i, len, name, resource;
      if (this.debugResourceLoading()) {
        if (resources.ready) {
          console.log("Resource ready?", resources, resources.ready());
        }
      }
      if (resources.ready) {
        return resources.ready();
      }
      if (_.isArray(resources)) {
        for (i = 0, len = resources.length; i < len; i++) {
          resource = resources[i];
          if (!resourcesReadyRecursive(resource)) {
            return false;
          }
        }
      } else if (_.isObject(resources)) {
        for (name in resources) {
          resource = resources[name];
          if (!resourcesReadyRecursive(resource)) {
            return false;
          }
        }
      }
      return true;
    };
    return this._loadResourcesAutorun = Tracker.autorun(computation => {
      // Wait until all resources have loaded.
      if (!resourcesReadyRecursive(this.resources)) {
        return;
      }
      this.resourcesReady(true);

      // Wait until the declared palette (and default for background colors) have loaded.
      if (this.hasPalette() && !this.palette()) {
        return;
      }
      LOI.Assets.Palette.defaultPalette();

      // Wait until the bitmap document becomes available.
      if (!this.bitmap()) {
        return;
      }
      computation.stop();

      // Resources are loaded, create tutorial steps.
      return Tracker.nonreactive(() => {
        return this.initializeSteps();
      });
    });
  }
  getAssetData() {
    var assetId, assetsData;
    assetsData = this.tutorial.assetsData();
    assetId = this.id();
    return _.find(assetsData, assetData => {
      return assetData.id === assetId;
    });
  }
  setAssetData(assetData) {
    var assetDataIndex, assetId, assetsData;
    assetsData = this.tutorial.assetsData();
    assetId = this.id();
    assetDataIndex = _.findIndex(assetsData, assetData => {
      return assetData.id === assetId;
    });
    assetsData[assetDataIndex] = assetData;
    return this.tutorial.state('assets', assetsData);
  }
  addStepArea(stepArea) {
    var stepAreas;
    stepAreas = this.stepAreas();
    stepAreas.push(stepArea);
    this.stepAreas(stepAreas);

    // Return the step area index.
    return stepAreas.length - 1;
  }
  editorDrawComponents() {
    var components;
    if (!this.initialized()) {
      return [];
    }
    components = [{
      component: this.hintsEngineComponents.underlying,
      before: LOI.Assets.Engine.PixelImage.Bitmap
    }, {
      component: this.hintsEngineComponents.overlaid,
      before: LOI.Assets.SpriteEditor.PixelCanvas.OperationPreview
    }];
    if (this.instructionsMarkupEngineComponent) {
      components.push({
        component: this.instructionsMarkupEngineComponent,
        before: LOI.Assets.SpriteEditor.PixelCanvas.OperationPreview
      });
    }
    return components;
  }
  styleClasses() {
    var classes;
    classes = [this.completed() ? 'completed' : void 0];
    return _.without(classes, void 0).join(' ');
  }
  minClipboardScale() {
    var base;
    return typeof (base = this.constructor).minClipboardScale === "function" ? base.minClipboardScale() : void 0;
  }
  maxClipboardScale() {
    var base;
    return typeof (base = this.constructor).maxClipboardScale === "function" ? base.maxClipboardScale() : void 0;
  }
  solve() {
    return this._afterInitialization(() => {
      var i, len, ref, results, stepArea;
      ref = this.stepAreas();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        stepArea = ref[i];
        results.push(stepArea.solve());
      }
      return results;
    });
  }
  solveAndComplete() {
    return this._afterInitialization(() => {
      var asset, assets;
      this.solve();
      assets = this.tutorial.state('assets');
      asset = _.find(assets, asset => {
        return asset.id === this.id();
      });
      asset.completed = true;
      return this.tutorial.state('assets', assets);
    });
  }
  hasGoalPixel(x, y) {
    var i, len, ref, stepArea;
    if (!this.initialized()) {
      return;
    }
    ref = this.stepAreas();

    // Check if any of the step areas require a pixel at these absolute bitmap coordinates.
    for (i = 0, len = ref.length; i < len; i++) {
      stepArea = ref[i];
      if (stepArea.hasGoalPixel(x, y)) {
        return true;
      }
    }
    return false;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tutorialbitmap-steps.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-steps.coffee    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap = class TutorialBitmap extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  // Override to create a step for each path in the svg.
  static breakPathsIntoSteps() {
    return false;
  }

  // Override to set the default whether created steps draw hints after completion.
  static drawHintsAfterCompleted() {
    return null;
  }

  // Override to allow more tolerance when completing paths.
  static pathTolerance() {
    return 0;
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
    if (this.resources.goalPixels || this.resources.svgPaths || this.resources.steps) {
      stepArea = new this.constructor.StepArea(this, stepAreaBounds);
      return this.initializeStepsInAreaWithResources(stepArea, this.resources);
    }
  }
  initializeStepsInAreaWithResources(stepArea, stepResources) {
    var drawHintsAfterCompleted, i, index, j, len, len1, ref, results, step, svgPath, svgPaths, tolerance;
    drawHintsAfterCompleted = this.constructor.drawHintsAfterCompleted();
    if (stepResources.goalPixels) {
      new this.constructor.PixelsStep(this, stepArea, {
        startPixels: stepResources.startPixels,
        goalPixels: stepResources.goalPixels,
        drawHintsAfterCompleted: drawHintsAfterCompleted
      });
    }
    if (stepResources.svgPaths) {
      svgPaths = stepResources.svgPaths.svgPaths();
      tolerance = this.constructor.pathTolerance();
      if (this.constructor.breakPathsIntoSteps()) {
        for (index = i = 0, len = svgPaths.length; i < len; index = ++i) {
          svgPath = svgPaths[index];
          new this.constructor.PathStep(this, stepArea, {
            startPixels: index === 0 ? this.resources.startPixels : null,
            svgPaths: [svgPath],
            drawHintsAfterCompleted: drawHintsAfterCompleted,
            tolerance: tolerance
          });
        }
      } else {
        new this.constructor.PathStep(this, stepArea, {
          startPixels: this.resources.startPixels,
          svgPaths: svgPaths,
          drawHintsAfterCompleted: drawHintsAfterCompleted,
          tolerance: tolerance
        });
      }
    }
    if (stepResources.steps) {
      ref = stepResources.steps;
      results = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        step = ref[j];
        results.push(this.initializeStepsInAreaWithResources(stepArea, step));
      }
      return results;
    }
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tutorialbitmap-resources.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-resources.coffe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap = class TutorialBitmap extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  // Override to provide a map of resources that need to be loaded on the client for this asset.
  static resources() {
    return {};
  }

  // Override to provide a bitmap string describing the bitmap.
  static bitmapString() {
    return null;
  }
  static goalBitmapString() {
    return null;
  }

  // Override to provide an image URL to describing the bitmap.
  static imageUrl() {
    return null;
  }
  static goalImageUrl() {
    return null;
  }

  // Override to provide an SVG URL to describing the drawing.
  static svgUrl() {
    return null;
  }

  // Override to provide an array of steps to be completed in this tutorial asset.
  static steps() {
    return null;
  }

  // Override to provide an array of goals the player can choose to complete this tutorial bitmap.
  static goalChoices() {
    return null;
  }
  static createResources() {
    var explicitResources, goal, goalChoices, implicitResources, step, steps;
    // Combine explicitly specified resources with ones defined through class methods.
    explicitResources = this.resources();
    implicitResources = this._createResourcesObject(this);
    if (goalChoices = this.goalChoices()) {
      implicitResources.goalChoices = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = goalChoices.length; i < len; i++) {
          goal = goalChoices[i];
          results.push(this._createResourcesObject(goal, true));
        }
        return results;
      }.call(this);
    }
    if (steps = this.steps()) {
      implicitResources.steps = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = steps.length; i < len; i++) {
          step = steps[i];
          results.push(this._createResourcesObject(step));
        }
        return results;
      }.call(this);
    }
    return _.extend({}, explicitResources, implicitResources);
  }
  static _createResourcesObject(resourcesProvider, transferAllProperties) {
    var bitmapString, extension, goalBitmapString, goalImageUrl, imageUrl, information, resources, svgUrl;
    if (transferAllProperties) {
      resources = _.clone(resourcesProvider);
    } else {
      resources = {};
    }
    if (_.isObject(resourcesProvider)) {
      if (bitmapString = _.propertyValue(resourcesProvider, 'bitmapString')) {
        resources.startPixels = new this.Resource.BitmapStringPixels(bitmapString);
      }
      if (imageUrl = _.propertyValue(resourcesProvider, 'imageUrl')) {
        resources.startPixels = new this.Resource.ImagePixels(imageUrl);
      }
      if (goalBitmapString = _.propertyValue(resourcesProvider, 'goalBitmapString')) {
        resources.goalPixels = new this.Resource.BitmapStringPixels(goalBitmapString);
      }
      if (goalImageUrl = _.propertyValue(resourcesProvider, 'goalImageUrl')) {
        resources.goalPixels = new this.Resource.ImagePixels(goalImageUrl);
      }
      if (svgUrl = _.propertyValue(resourcesProvider, 'svgUrl')) {
        resources.svgPaths = new this.Resource.SvgPaths(svgUrl);
      }
      if (information = _.propertyValue(resourcesProvider, 'information')) {
        resources.information = information;
      }
    } else {
      extension = resourcesProvider.slice(resourcesProvider.lastIndexOf('.') + 1);
      if (extension === 'png') {
        resources.goalPixels = new this.Resource.ImagePixels(resourcesProvider);
      }
      if (extension === 'svg') {
        resources.svgPaths = new this.Resource.SvgPaths(resourcesProvider);
      }
    }
    return resources;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tutorialbitmap-references.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-references.coff //
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
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap = function () {
  class TutorialBitmap extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
    // Override to provide reference images that need to be added to the bitmap.
    static references() {
      return null;
    }

    // Override to specify how using multiple references should resize the canvas.
    static canvasExtensionDirection() {
      return this.CanvasExtensionDirection.Horizontal;
    }
    static initializeReferences() {
      var references;
      if (!(references = this.references())) {
        return;
      }

      // Create reference images on the server. They should be exported as database content.
      if (Meteor.isServer && !Meteor.settings.startEmpty) {
        return Document.startup(() => {
          var i, imageUrl, len, ref, reference, results;
          results = [];
          for (i = 0, len = references.length; i < len; i++) {
            reference = references[i];
            // Allow sending in just the reference URL.
            imageUrl = ((ref = reference.image) != null ? ref.url : void 0) || reference;
            if (!LOI.Assets.Image.documents.findOne({
              url: imageUrl
            })) {
              results.push(LOI.Assets.Image.documents.insert({
                url: imageUrl
              }));
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      }
    }
    getReferenceDataForUrl(url) {
      var bitmapReferences, data, defaultData, defaultReferencesData, ref;
      if (!(bitmapReferences = (ref = this.bitmap()) != null ? ref.references : void 0)) {
        return;
      }
      defaultReferencesData = this.constructor.references();
      if (!(data = _.find(bitmapReferences, reference => {
        return reference.image.url === url;
      }))) {
        return;
      }
      if (!(defaultData = _.find(defaultReferencesData, reference => {
        return reference.image.url === url;
      }))) {
        return;
      }
      return _.defaultsDeep({}, data, defaultData);
    }
    _initialize() {
      var goalChoice, goalChoices, referenceUrlChoices, references;
      super._initialize(...arguments);
      if (!(references = this.constructor.references())) {
        return;
      }
      if (!(goalChoices = this.resources.goalChoices)) {
        return;
      }
      referenceUrlChoices = function () {
        var i, len, results;
        results = [];
        for (i = 0, len = goalChoices.length; i < len; i++) {
          goalChoice = goalChoices[i];
          results.push(goalChoice.referenceUrl);
        }
        return results;
      }();
      this.displayedReferenceUrlChoices = new AE.LiveComputedField(() => {
        var bitmap, displayedReferences, i, len, reference, results;
        if (!(bitmap = this.bitmap())) {
          return;
        }
        if (!(references = bitmap.references)) {
          return;
        }
        displayedReferences = _.filter(references, reference => {
          var ref;
          return reference.displayed && (ref = reference.image.url, indexOf.call(referenceUrlChoices, ref) >= 0);
        });
        results = [];
        for (i = 0, len = displayedReferences.length; i < len; i++) {
          reference = displayedReferences[i];
          results.push(reference.image.url);
        }
        return results;
      }, EJSON.equals);

      // Update step areas and resize the bitmap accordingly if needed.
      return this._chosenReferencesAutorun = Tracker.autorun(computation => {
        var displayedReferenceUrlChoices;
        if (!(this.initialized() && this.resourcesReady())) {
          return;
        }
        if (!(displayedReferenceUrlChoices = this.displayedReferenceUrlChoices())) {
          return;
        }
        return Tracker.nonreactive(() => {
          return Tracker.afterFlush(() => {
            var assetData, bitmap, bitmapId, changeBounds, desiredHeight, desiredWidth, fixedDimensions, found, height, horizontalExtension, i, index, j, k, l, len, len1, len2, len3, m, n, o, ref, ref1, ref2, ref3, referenceUrl, removeNeeded, results, singleHeight, singleWidth, startX, startY, stepArea, stepAreaBounds, stepAreaInstance, stepAreaInstances, stepAreas, width, x, y;
            if (!(bitmapId = this.bitmapId())) {
              return;
            }
            if (!(bitmap = this.bitmap())) {
              return;
            }
            assetData = this.getAssetData();

            // Note: create a clone of step areas since the object gets compared for equality.
            stepAreas = assetData.stepAreas ? EJSON.clone(assetData.stepAreas) : [];

            // Remove references at the end that haven't been drawn on yet.
            fixedDimensions = this.constructor.fixedDimensions();
            singleWidth = fixedDimensions.width;
            singleHeight = fixedDimensions.height;
            horizontalExtension = this.constructor.canvasExtensionDirection() === this.constructor.CanvasExtensionDirection.Horizontal;
            removeNeeded = false;
            for (i = 0, len = stepAreas.length; i < len; i++) {
              stepArea = stepAreas[i];
              if (!(ref = stepArea.referenceUrl, indexOf.call(displayedReferenceUrlChoices, ref) < 0)) {
                continue;
              }
              removeNeeded = true;
              break;
            }
            if (removeNeeded) {
              for (index = j = stepAreas.length - 1; j >= 0; index = j += -1) {
                stepArea = stepAreas[index];
                startX = 0;
                startY = 0;
                if (horizontalExtension) {
                  startX = index * singleWidth;
                } else {
                  startY = index * singleHeight;
                }
                found = false;
                for (x = k = 0, ref1 = singleWidth; 0 <= ref1 ? k < ref1 : k > ref1; x = 0 <= ref1 ? ++k : --k) {
                  for (y = l = 0, ref2 = singleHeight; 0 <= ref2 ? l < ref2 : l > ref2; y = 0 <= ref2 ? ++l : --l) {
                    if (bitmap.findPixelAtAbsoluteCoordinates(startX + x, startY + y)) {
                      found = true;
                      break;
                    }
                  }
                  if (found) {
                    break;
                  }
                }
                if (found) {
                  // Stop removing unused references since the player has already drawn here.
                  break;
                }

                // The player hasn't drawn so far, so if we don't want the reference anymore, we can remove it.
                if (ref3 = stepArea.referenceUrl, indexOf.call(displayedReferenceUrlChoices, ref3) < 0) {
                  _.pull(stepAreas, stepArea);
                }
              }
            }

            // Add new step areas.
            for (m = 0, len1 = displayedReferenceUrlChoices.length; m < len1; m++) {
              referenceUrl = displayedReferenceUrlChoices[m];
              if (!_.find(stepAreas, stepArea => {
                return stepArea.referenceUrl === referenceUrl;
              })) {
                stepAreas.push({
                  referenceUrl
                });
              }
            }
            assetData.stepAreas = stepAreas;
            this.setAssetData(assetData);
            // If necessary, resize the bitmap to make space for all the chosen references.
            desiredWidth = singleWidth;
            desiredHeight = singleHeight;
            if (horizontalExtension) {
              desiredWidth = singleWidth * Math.max(1, stepAreas.length);
            } else {
              desiredHeight = singleHeight * Math.max(1, stepAreas.length);
            }
            bitmap = Tracker.nonreactive(() => {
              return LOI.Assets.Bitmap.documents.findOne(bitmapId, {
                fields: {
                  bounds: 1
                }
              });
            });
            width = bitmap.bounds.right - bitmap.bounds.left + 1;
            height = bitmap.bounds.bottom - bitmap.bounds.top + 1;
            if (!(desiredWidth === width && desiredHeight === height)) {
              bitmap = Tracker.nonreactive(() => {
                return LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId);
              });
              // Create a change bounds action.
              changeBounds = new LOI.Assets.Bitmap.Actions.ChangeBounds(this.id(), bitmap, {
                left: 0,
                top: 0,
                right: desiredWidth - 1,
                bottom: desiredHeight - 1,
                fixed: true
              });
              bitmap.executeAction(changeBounds, true);
            }
            // Change step area instances.
            stepAreaInstances = this.stepAreas();
            this.stepAreas([]);
            for (n = 0, len2 = stepAreaInstances.length; n < len2; n++) {
              stepAreaInstance = stepAreaInstances[n];
              stepAreaInstance.destroy();
            }
            results = [];
            for (index = o = 0, len3 = stepAreas.length; o < len3; index = ++o) {
              stepArea = stepAreas[index];
              stepAreaBounds = {
                x: 0,
                y: 0,
                width: singleWidth,
                height: singleHeight
              };
              if (horizontalExtension) {
                stepAreaBounds.x = index * singleWidth;
              } else {
                stepAreaBounds.y = index * singleHeight;
              }
              stepAreaInstance = new this.constructor.StepArea(this, stepAreaBounds);
              if (goalChoice = _.find(goalChoices, goalChoice => {
                return goalChoice.referenceUrl === stepArea.referenceUrl;
              })) {
                results.push(this.initializeStepsInAreaWithResources(stepAreaInstance, goalChoice));
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
      var ref, ref1, ref2, ref3;
      super.destroy(...arguments);
      if ((ref = this.displayedReferenceUrlChoices) != null) {
        ref.stop();
      }
      if ((ref1 = this.assetStepAreas) != null) {
        ref1.stop();
      }
      if ((ref2 = this._chosenReferencesAutorun) != null) {
        ref2.stop();
      }
      return (ref3 = this._referenceStepsAutorun) != null ? ref3.stop() : void 0;
    }
    referenceDefaults() {
      var defaults, i, len, reference, references;
      if (!(references = this.constructor.references())) {
        return {};
      }
      defaults = {};

      // Add reference data to defaults (make sure an object and not just an URL is given).
      for (i = 0, len = references.length; i < len; i++) {
        reference = references[i];
        if (_.isObject(reference)) {
          defaults[reference.image.url] = reference;
        }
      }
      return defaults;
    }
  }
  ;
  TutorialBitmap.CanvasExtensionDirection = {
    Horizontal: 'Horizontal',
    Vertical: 'Vertical'
  };
  return TutorialBitmap;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tutorialbitmap-create.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-create.coffee   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, AMu, LOI, PAA;
AE = Artificial.Everywhere;
AB = Artificial.Base;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap = class TutorialBitmap extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static create(tutorial) {
    return this._createBitmapData().then(bitmapData => {
      return this._setBitmapDataReferences(bitmapData);
    }).then(bitmapData => {
      return this._setBitmapDataPalette(bitmapData);
    }).then(bitmapData => {
      return this._insertBitmap(bitmapData);
    }).then(bitmapId => {
      return this._resetAndAddToTutorial(tutorial, bitmapId);
    }).catch(error => {
      console.error(error);
      throw new AE.InvalidOperationException("Could not create tutorial bitmap.");
    });
  }
  static _createBitmapData() {
    return new Promise((resolve, reject) => {
      var creationTime, size;
      size = this.fixedDimensions();
      creationTime = new Date();
      return resolve({
        versioned: true,
        profileId: LOI.adventure.profileId(),
        creationTime: creationTime,
        lastEditTime: creationTime,
        bounds: {
          left: 0,
          right: size.width - 1,
          top: 0,
          bottom: size.height - 1,
          fixed: true
        },
        name: this.displayName(),
        pixelFormat: new LOI.Assets.Bitmap.PixelFormat('flags', 'paletteColor', 'directColor'),
        layers: [],
        properties: this.properties()
      });
    });
  }
  static _setBitmapDataReferences(bitmapData) {
    return new Promise((resolve, reject) => {
      var i, imagePromises, imageUrl, len, reference, references;
      if (!(references = typeof this.references === "function" ? this.references() : void 0)) {
        resolve(bitmapData);
        return;
      }
      imagePromises = [];
      for (i = 0, len = references.length; i < len; i++) {
        reference = references[i];
        // Allow sending in just the reference URL.
        imageUrl = _.isString(reference) ? reference : reference.image.url;
        (imageUrl => {
          // Find the ID of the image with this URL.
          return imagePromises.push(new Promise((resolve, reject) => {
            return Tracker.autorun(function (computation) {
              var image;
              LOI.Assets.Image.forUrl.subscribe(imageUrl);
              LOI.Assets.Image.forUrl.subscribeContent(imageUrl);
              if (!(image = LOI.Assets.Image.documents.findOne({
                url: imageUrl
              }))) {
                return;
              }
              computation.stop();
              return resolve(image);
            });
          }));
        })(imageUrl);
      }
      return Promise.all(imagePromises).then(imageResults => {
        var index, j, len1;
        bitmapData.references = [];

        // Merge images into references
        for (index = j = 0, len1 = references.length; j < len1; index = ++j) {
          reference = references[index];
          if (_.isString(reference)) {
            // Allow sending in just the reference URL.
            reference = {};
          }
          bitmapData.references.push({
            image: _.pick(imageResults[index], ['_id', 'url'])
          });
        }
        return resolve(bitmapData);
      });
    });
  }
  static _setBitmapDataPalette(bitmapData) {
    return new Promise((resolve, reject) => {
      var customPalette, paletteImage, paletteImageUrl, paletteName;
      if (paletteName = this.restrictedPaletteName()) {
        return Tracker.autorun(computation => {
          var palette;
          LOI.Assets.Palette.forName.subscribeContent(paletteName);
          if (!(palette = LOI.Assets.Palette.documents.findOne({
            name: paletteName
          }))) {
            return;
          }
          computation.stop();
          bitmapData.palette = _.pick(palette, '_id');
          return resolve(bitmapData);
        });
      } else if (paletteImageUrl = this.customPaletteImageUrl()) {
        paletteImage = new Image();
        paletteImage.addEventListener('load', () => {
          var backgroundColorArray, i, imageData, isBackground, j, rampOffset, ramps, ref, ref1, ref2, shadeOffset, shades, x, y;
          imageData = new AM.ReadableCanvas(paletteImage).getFullImageData();
          ramps = [];
          backgroundColorArray = (ref = this.backgroundColor()) != null ? typeof ref.toByteArray === "function" ? ref.toByteArray() : void 0 : void 0;
          isBackground = function (pixelOffset) {
            var attributeOffset, i;
            if (!imageData.data[pixelOffset + 3]) {
              // Treat transparent pixels as background.
              return true;
            }

            // We're not transparent, so in case we don't have a background color, this can't be a background pixel.
            if (!backgroundColorArray) {
              return;
            }

            // Compare in case this pixel matches our background color.
            for (attributeOffset = i = 0; i <= 2; attributeOffset = ++i) {
              if (imageData.data[pixelOffset + attributeOffset] !== backgroundColorArray[attributeOffset]) {
                return;
              }
            }

            // The match was made, this pixel has background color.
            return true;
          };
          for (y = i = 0, ref1 = imageData.height; 0 <= ref1 ? i < ref1 : i > ref1; y = 0 <= ref1 ? ++i : --i) {
            rampOffset = y * imageData.width * 4;
            if (isBackground(rampOffset)) {
              // We have a ramp if the first pixel is not background.
              continue;
            }
            shades = [];
            for (x = j = 0, ref2 = imageData.width; 0 <= ref2 ? j < ref2 : j > ref2; x = 0 <= ref2 ? ++j : --j) {
              shadeOffset = rampOffset + x * 4;
              if (isBackground(shadeOffset)) {
                // We have no more shades after we reach a background pixel.
                break;
              }
              shades.push({
                r: imageData.data[shadeOffset] / 255,
                g: imageData.data[shadeOffset + 1] / 255,
                b: imageData.data[shadeOffset + 2] / 255
              });
            }
            ramps.push({
              shades: shades
            });
          }
          bitmapData.customPalette = {
            ramps: ramps
          };
          return resolve(bitmapData);
        });
        return paletteImage.src = Meteor.absoluteUrl(paletteImageUrl);
      } else if (customPalette = this.customPalette()) {
        bitmapData.customPalette = customPalette;
        return resolve(bitmapData);
      } else {
        return resolve(bitmapData);
      }
    });
  }
  static _insertBitmap(bitmapData) {
    return new Promise((resolve, reject) => {
      var bitmapId;
      bitmapId = LOI.Assets.Bitmap.documents.insert(bitmapData);
      return Tracker.autorun(computation => {
        var bitmap;
        if (!(bitmap = LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId))) {
          return;
        }
        computation.stop();
        this._initializeLayers(bitmap);
        return resolve(bitmapId);
      });
    });
  }
  static _initializeLayers(bitmap) {
    var addLayerAction;
    addLayerAction = new LOI.Assets.Bitmap.Actions.AddLayer(this.id(), bitmap);
    AMu.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, addLayerAction, new Date());
    return AMu.Document.Versioning.clearHistory(bitmap);
  }
  static _resetAndAddToTutorial(tutorial, bitmapId) {
    var asset, assetId, assets, tutorialBitmap;
    // Reset the asset instance.
    assetId = this.id();
    asset = tutorial.getAsset(this.id());
    asset.reset();

    // Add to tutorial.
    assets = tutorial.assetsData();
    if (!(tutorialBitmap = _.find(assets, asset => {
      return asset.id === assetId;
    }))) {
      tutorialBitmap = {
        id: assetId
      };
      assets.push(tutorialBitmap);
    }
    _.extend(tutorialBitmap, {
      type: this.type(),
      bitmapId: bitmapId
    });
    return tutorial.state('assets', assets);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tutorialbitmap-reset.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-reset.coffee    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, AMu, LOI, PAA;
AB = Artificial.Base;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap = class TutorialBitmap extends PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap {
  static reset(tutorial, bitmapId) {
    return this._createBitmapData().then(bitmapData => {
      return this._setBitmapDataReferences(bitmapData);
    }).then(bitmapData => {
      return this._setBitmapDataPalette(bitmapData);
    }).then(bitmapData => {
      return this._updateBitmap(tutorial, bitmapId, bitmapData);
    }).catch(error => {
      console.error(error);
      throw new AE.InvalidOperationException("Could not reset tutorial bitmap.");
    });
  }
  static _updateBitmap(tutorial, bitmapId, bitmapData) {
    var asset;
    LOI.Assets.Bitmap.documents.update(bitmapId, bitmapData);
    this._initializeLayers(LOI.Assets.Bitmap.versionedDocuments.getDocumentForId(bitmapId));

    // Trigger reactivity.
    LOI.Assets.Bitmap.versionedDocuments.reportNonVersionedChange(bitmapId);

    // Reset the asset instance.
    asset = tutorial.getAsset(this.id());
    return asset.reset();
  }
  reset() {
    var assetData, i, len, ref, stepArea;
    // Nothing to reset if we haven't initialized yet (resetting will be called when first creating the bitmap).
    if (!this.initialized()) {
      return;
    }

    // Prevent recomputation of completed states while resetting.
    this.resetting(true);
    ref = this.stepAreas();
    for (i = 0, len = ref.length; i < len; i++) {
      stepArea = ref[i];

      // Reset all steps.
      stepArea.reset();
    }

    // Remove any asset data.
    if (assetData = this.getAssetData()) {
      assetData.stepAreas = [];
      assetData.completed = false;
      this.setAssetData(assetData);
    }

    // Unlock recomputation after changes have been applied.
    return Tracker.afterFlush(() => {
      return this.resetting(false);
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hintsenginecomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/hintsenginecomponent.coffee    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.HintsEngineComponent = class HintsEngineComponent {
  constructor(tutorialBitmap, drawHintsFunctionName) {
    this.tutorialBitmap = tutorialBitmap;
    this.drawHintsFunctionName = drawHintsFunctionName;
    this.displayColorHelpUpToPixelCoordinates = new ReactiveField(null);
    this.displayAllColorErrors = new ReactiveField(false);
  }
  drawToContext(context) {
    let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var activeStepIndex, i, index, j, len, len1, ref, ref1, step, stepArea, steps;
    ref = this.tutorialBitmap.stepAreas();
    for (i = 0, len = ref.length; i < len; i++) {
      stepArea = ref[i];
      activeStepIndex = stepArea.activeStepIndex() || 0;
      steps = stepArea.steps();
      ref1 = steps.slice(0, +activeStepIndex + 1 || 9e9);
      for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
        step = ref1[index];
        if (!step.drawHintsAfterCompleted()) {
          if (index < activeStepIndex) {
            continue;
          } else {
            if (activeStepIndex === steps.length - 1 && stepArea.completed()) {
              // Don't draw hints at the end of the tutorial steps. We don't want to call completed on the
              // step since that would make it recompute. Step area instead has the last computation stored.
              continue;
            }
          }
        }
        step[this.drawHintsFunctionName](context, renderOptions);
      }
    }

    // Explicit return to avoid result collection.
    return null;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"portfoliocomponent":{"portfoliocomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/portfoliocomponent/portfolioco //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PortfolioComponent = function () {
  class PortfolioComponent extends PAA.Practice.Project.Asset.Bitmap.PortfolioComponent {
    constructor(tutorialBitmap) {
      super(...arguments);
      this.tutorialBitmap = tutorialBitmap;
    }
    letterGrade() {
      var pixelArtEvaluation, ref, ref1;
      if (!(pixelArtEvaluation = (ref = this.tutorialBitmap.bitmap()) != null ? (ref1 = ref.properties) != null ? ref1.pixelArtEvaluation : void 0 : void 0)) {
        return;
      }
      if (pixelArtEvaluation.displayed === false) {
        return;
      }
      if (pixelArtEvaluation.score == null) {
        return;
      }
      return PAA.Practice.PixelArtEvaluation.getLetterGrade(pixelArtEvaluation.score);
    }
  }
  ;
  PortfolioComponent.register('PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PortfolioComponent');
  return PortfolioComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.portfoliocomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/portfoliocomponent/template.po //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PortfolioComponent");
Template["PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PortfolioComponent"] = new Template("Template.PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.PortfolioComponent", (function() {
  var view = this;
  return HTML.DIV(HTML.Attrs({
    class: "pixelartacademy-practice-tutorials-drawing-assets-tutorialbitmap-portfoliocomponent pixelartacademy-practice-project-asset-bitmap-portfoliocomponent"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("bitmapStyle"));
  }), "\n    ", HTML.DIV({
    class: "evaluation"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("tutorialBitmap"), "completed"));
  }, function() {
    return [ "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("letterGrade"));
    }, function() {
      return [ "\n          ", HTML.SPAN({
        class: "grade"
      }, Blaze.View("lookup:letterGrade", function() {
        return Spacebars.mustache(view.lookup("letterGrade"));
      })), "\n        " ];
    }, function() {
      return HTML.Raw('\n          <span class="completed">✔︎</span>\n        ');
    }), "\n      " ];
  }), "\n    "), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(view.lookup("bitmapImage"));
  }, function() {
    return Spacebars.include(view.lookupTemplate("Render"));
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"briefcomponent":{"briefcomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/briefcomponent/briefcomponent. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AM, LOI, PAA;
AC = Artificial.Control;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap.BriefComponent = function () {
  class BriefComponent extends AM.Component {
    constructor(tutorialBitmap) {
      super(...arguments);
      this.tutorialBitmap = tutorialBitmap;
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.parent = this.ancestorComponentWith('editAsset');
    }
    started() {
      return this.tutorialBitmap.bitmap().historyPosition;
    }
    events() {
      return super.events(...arguments).concat({
        'click .start-button': this.onClickStartButton,
        'click .reset-button': this.onClickResetButton
      });
    }
    onClickStartButton(event) {
      return this.parent.editAsset();
    }
    onClickResetButton(event) {
      return this.tutorialBitmap.constructor.reset(this.tutorialBitmap.tutorial, this.tutorialBitmap.bitmapId());
    }
  }
  ;
  BriefComponent.register('PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.BriefComponent');
  return BriefComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.briefcomponent.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/briefcomponent/template.briefc //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.BriefComponent");
Template["PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.BriefComponent"] = new Template("Template.PixelArtAcademy.Practice.Tutorials.Drawing.Assets.TutorialBitmap.BriefComponent", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.call(view.lookup("tutorialBitmap"));
  }, function() {
    return [ "\n    ", HTML.UL({
      class: "actions"
    }, "\n      ", HTML.LI({
      class: "action"
    }, "\n        ", HTML.BUTTON({
      class: "button start-button"
    }, Blaze.If(function() {
      return Spacebars.call(view.lookup("started"));
    }, function() {
      return "编辑";
    }, function() {
      return "开始";
    })), "\n      "), HTML.Raw('\n      <li class="action">\n        <button class="button reset-button">重置</button>\n      </li>\n    ')), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"resource":{"resource.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/resource.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.Resource = class Resource {
  ready() {
    throw new AE.NotImplementedException("A resource has to notify when its data is ready.");
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixels.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/pixels.coffee         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.Resource.Pixels = class Pixels extends TutorialBitmap.Resource {
  pixels() {
    throw new AE.NotImplementedException("A pixels resource has to return a list of pixels.");
  }
  ready() {
    return this.pixels() != null;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bitmapstringpixels.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/bitmapstringpixels.co //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.Resource.BitmapStringPixels = class BitmapStringPixels extends TutorialBitmap.Resource.Pixels {
  constructor(bitmapString) {
    super(...arguments);
    this.bitmapString = bitmapString;
  }
  pixels() {
    var character, i, j, len, len1, line, lines, match, ramp, ref, regExp, x, y;
    if (this._pixels) {
      return this._pixels;
    }
    this._pixels = [];
    if (!((ref = this.bitmapString) != null ? ref.length : void 0)) {
      // We need to quit if we get an empty string since the regex would never quit on it.
      return this._pixels;
    }
    regExp = /^\|?(.*)/gm;
    lines = function () {
      var results;
      results = [];
      while (match = regExp.exec(this.bitmapString)) {
        results.push(match[1]);
      }
      return results;
    }.call(this);
    for (y = i = 0, len = lines.length; i < len; y = ++i) {
      line = lines[y];
      for (x = j = 0, len1 = line.length; j < len1; x = ++j) {
        character = line[x];
        if (character === ' ') {
          // Skip spaces (empty pixel).
          continue;
        }
        // We support up to 16 colors denoted in hex notation.
        ramp = parseInt(character, 16);
        this._pixels.push({
          x: x,
          y: y,
          paletteColor: {
            ramp: ramp,
            shade: 0
          }
        });
      }
    }
    return this._pixels;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"imagepixels.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/imagepixels.coffee    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.Resource.ImagePixels = class ImagePixels extends TutorialBitmap.Resource.Pixels {
  constructor(urlOrImage) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var image, url;
    super(...arguments);
    this.urlOrImage = urlOrImage;
    this.options = options;
    this._pixels = new ReactiveField(null);
    if (_.isString(this.urlOrImage)) {
      url = this.urlOrImage;

      // Load pixels directly from the source image.
      image = new Image();
      image.addEventListener('load', () => {
        return this._pixels(this._createPixelsFromImage(image));
      }, false);

      // Initiate the loading.
      image.src = Meteor.absoluteUrl(url);
    } else {
      image = this.urlOrImage;
      this._pixels(this._createPixelsFromImage(image));
    }
  }
  pixels() {
    return this._pixels();
  }
  _createPixelsFromImage(image) {
    var imageData;
    imageData = new AM.ReadableCanvas(image).getFullImageData();
    return this._createPixelsFromImageData(imageData);
  }
  _createPixelsFromImageData(imageData) {
    var b, base, g, i, j, palette, paletteColor, pixelOffset, pixels, r, ref, ref1, x, y;
    pixels = [];
    palette = typeof (base = this.options).palette === "function" ? base.palette() : void 0;
    for (x = i = 0, ref = imageData.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      for (y = j = 0, ref1 = imageData.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
        pixelOffset = (x + y * imageData.width) * 4;
        if (!imageData.data[pixelOffset + 3]) {
          // Skip transparent pixels.
          continue;
        }
        r = imageData.data[pixelOffset] / 255;
        g = imageData.data[pixelOffset + 1] / 255;
        b = imageData.data[pixelOffset + 2] / 255;

        // This is a full pixel. If we have a palette, find the closest palette color.
        if (palette) {
          paletteColor = palette.closestPaletteColorFromRGB(r, g, b);
          pixels.push({
            x,
            y,
            paletteColor
          });
        } else {
          pixels.push({
            x: x,
            y: y,
            directColor: {
              r,
              g,
              b
            }
          });
        }
      }
    }
    return pixels;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"svgpaths.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/svgpaths.coffee       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.Resource.SvgPaths = class SvgPaths extends TutorialBitmap.Resource {
  constructor(url) {
    super(...arguments);
    this.url = url;
    this.svgPaths = new ReactiveField(null);
    fetch(Meteor.absoluteUrl(this.url)).then(response => {
      return response.text();
    }).then(svgXml => {
      var parser, svgDocument;
      parser = new DOMParser();
      svgDocument = parser.parseFromString(svgXml, "image/svg+xml");
      return this.svgPaths(svgDocument.getElementsByTagName('path'));
    });
  }
  ready() {
    return this.svgPaths() != null;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"steps":{"steparea.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/steparea.coffee          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.StepArea = class StepArea {
  constructor(tutorialBitmap, bounds) {
    var ref, ref1, ref2;
    this.tutorialBitmap = tutorialBitmap;
    this.bounds = bounds;
    this.stepAreaIndex = this.tutorialBitmap.addStepArea(this);
    this.steps = new ReactiveField([]);
    this.data = new ReactiveField((ref = this.tutorialBitmap.getAssetData()) != null ? (ref1 = ref.stepAreas) != null ? ref1[this.stepAreaIndex] : void 0 : void 0);
    this.activeStepIndex = new ReactiveField((ref2 = this.data()) != null ? ref2.activeStepIndex : void 0);
    this.activeStep = new ReactiveField(null);
    this.hasExtraPixels = new ReactiveField(null);
    this.hasMissingPixels = new ReactiveField(null);
    this.completed = new ReactiveField(false);
    this._progressAutorun = Tracker.autorun(autorun => {
      var activeStepIndex, assetData, base, completedSteps, i, len, name, newActiveStep, newActiveStepIndex, ref3, step, stepAreaData, stepIndex, steps;
      // Don't recompute when loading/unloading.
      if (!(assetData = this.tutorialBitmap.getAssetData())) {
        return;
      }

      // Update current data.
      stepAreaData = (ref3 = assetData.stepAreas) != null ? ref3[this.stepAreaIndex] : void 0;
      this.data(stepAreaData);

      // Don't recompute when resetting.
      if (this.tutorialBitmap.resetting()) {
        return;
      }

      // Don't recompute until steps have been created.
      steps = this.steps();
      if (!steps.length) {
        return;
      }

      // Initialize active step from stored state.
      activeStepIndex = stepAreaData != null ? stepAreaData.activeStepIndex : void 0;
      this.activeStepIndex(activeStepIndex || 0);
      this.activeStep(steps[activeStepIndex || 0]);
      if (activeStepIndex == null) {
        // Activate the first step if we're starting fresh.
        this._activateStep(steps[0]);
      }

      // Update information about extra and missing pixels for this active step.
      this._updateExtraAndMissingPixelsFields();

      // Update current active step.
      completedSteps = 0;

      // For this step to be completed, this one and all previous steps have to be completed.
      for (stepIndex = i = 0, len = steps.length; i < len; stepIndex = ++i) {
        step = steps[stepIndex];
        if (step.preserveCompleted() && stepIndex < activeStepIndex || step.completed()) {
          completedSteps++;
          newActiveStepIndex = Math.min(completedSteps, steps.length - 1);
          // See if progress has happened.
          if (newActiveStepIndex > activeStepIndex || !activeStepIndex) {
            // Update the fields that steps rely on for calculating their completed state.
            this.activeStepIndex(newActiveStepIndex);
            newActiveStep = this.steps()[newActiveStepIndex];
            this.activeStep(newActiveStep);
            this._updateExtraAndMissingPixelsFields();

            // Activate the step.
            this._activateStep(newActiveStep);
          }
        } else {
          break;
        }
      }

      // The asset is completed if all steps are completed and we have no extra pixels.
      this.completed(completedSteps === steps.length && !this.hasExtraPixels());

      // See if we progressed (the active step index has changed).
      newActiveStepIndex = Math.min(completedSteps, steps.length - 1);
      if (activeStepIndex === newActiveStepIndex) {
        return;
      }

      // Update the index in the asset.
      if (assetData.stepAreas == null) {
        assetData.stepAreas = [];
      }
      if ((base = assetData.stepAreas)[name = this.stepAreaIndex] == null) {
        base[name] = {};
      }
      assetData.stepAreas[this.stepAreaIndex].activeStepIndex = newActiveStepIndex;
      return this.tutorialBitmap.setAssetData(assetData);
    });
  }
  destroy() {
    var i, len, ref, results, step;
    this._progressAutorun.stop();
    ref = this.steps();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      step = ref[i];
      results.push(step.destroy());
    }
    return results;
  }
  addStep(step, stepIndex) {
    var steps;
    steps = this.steps();
    if (stepIndex != null) {
      steps.splice(stepIndex, 0, step);
    } else {
      steps.push(step);
    }
    return this.steps(steps);
  }
  solve() {
    var i, len, ref, results, step;
    ref = this.steps();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      step = ref[i];
      results.push(step.solve());
    }
    return results;
  }
  reset() {
    var i, len, ref, results, step;
    ref = this.steps();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      step = ref[i];
      results.push(step.reset());
    }
    return results;
  }
  getInformation() {
    var data, goalChoice, referenceUrl;
    if (!(data = this.data())) {
      return;
    }
    if (referenceUrl = data.referenceUrl) {
      goalChoice = _.find(this.tutorialBitmap.resources.goalChoices, goalChoice => {
        return goalChoice.referenceUrl === referenceUrl;
      });
      return goalChoice.information;
    } else {
      return this.tutorialBitmap.resources.information;
    }
  }
  hasGoalPixel(absoluteX, absoluteY) {
    var i, len, ref, step;
    ref = this.steps();
    // Check if any of the steps require a pixel at these absolute bitmap coordinates.
    for (i = 0, len = ref.length; i < len; i++) {
      step = ref[i];
      if (step.hasPixel(absoluteX, absoluteY)) {
        return true;
      }
    }
    return false;
  }
  _updateExtraAndMissingPixelsFields() {
    var backgroundColor, bitmapLayer, hasExtraPixels, hasGoalPixel, hasMissingPixels, i, isPixelEmpty, j, palette, pixel, ref, ref1, ref2, ref3, ref4, x, y;
    if (!(bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0)) {
      return;
    }
    if (!(palette = this.tutorialBitmap.palette())) {
      return;
    }
    backgroundColor = this.tutorialBitmap.backgroundColor();
    hasExtraPixels = false;
    hasMissingPixels = false;
    for (x = i = ref1 = this.bounds.x, ref2 = this.bounds.x + this.bounds.width; ref1 <= ref2 ? i < ref2 : i > ref2; x = ref1 <= ref2 ? ++i : --i) {
      for (y = j = ref3 = this.bounds.y, ref4 = this.bounds.y + this.bounds.height; ref3 <= ref4 ? j < ref4 : j > ref4; y = ref3 <= ref4 ? ++j : --j) {
        pixel = bitmapLayer.getPixel(x, y);
        hasGoalPixel = this.hasGoalPixel(x, y);
        isPixelEmpty = TutorialBitmap._isPixelEmpty(pixel, backgroundColor, palette);

        // If still needed, see if there are any pixels in our area that don't belong to any step.
        if (!hasExtraPixels) {
          // Extra pixels can only exist where pixels are placed.
          if (pixel) {
            // Make sure the pixel doesn't match the background color.
            if (!isPixelEmpty) {
              if (!hasGoalPixel) {
                // If we don't find a step that requires this pixel, we have an extra.
                hasExtraPixels = true;
              }
            }
          }
        }

        // If still needed, see if there are any pixels missing in our area that still need to be covered.
        if (!hasMissingPixels) {
          // Missing pixels can only exist where there is a goal pixel.
          if (hasGoalPixel) {
            // If we don't have a pixel at all, it's definitely a missing one.
            if (!pixel) {
              hasMissingPixels = true;
              // Make sure the pixel doesn't match the background color.
            } else if (isPixelEmpty) {
              hasMissingPixels = true;
            }
          }
        }

        // If both test have passed, no need to keep going.
        if (hasExtraPixels && hasMissingPixels) {
          this.hasExtraPixels(true);
          this.hasMissingPixels(true);
          return;
        }
      }
    }
    this.hasExtraPixels(hasExtraPixels);
    return this.hasMissingPixels(hasMissingPixels);
  }
  _activateStep(step) {
    // Activate the step. To preserve steps completed before migration to step areas, only activate steps that
    // aren't completed. We assume that a step would not be returning true for completed if it hasn't been
    // activated yet.
    return Tracker.nonreactive(() => {
      if (!step.completed()) {
        return step.activate();
      }
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"step.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/step.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, TutorialBitmap, _bottomRightCorner, _darkLightColorErrorLuminosityThreshold, _darkRed, _darkRedRGBString, _darkRedSemiTransparent, _darkRedTransparent, _lightRed, _lightRedRGBString, _lightRedSemiTransparent, _lightRedTransparent, _topLeftCorner;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
_topLeftCorner = {
  x: 0,
  y: 0
};
_bottomRightCorner = {
  x: 0,
  y: 0
};
_darkRedRGBString = "158, 32, 32";
_lightRedRGBString = "254, 182, 182";
_darkLightColorErrorLuminosityThreshold = 60;
_darkRed = "rgb(".concat(_darkRedRGBString, ")");
_lightRed = "rgb(".concat(_lightRedRGBString, ")");
_darkRedSemiTransparent = "rgba(".concat(_darkRedRGBString, ", 1)");
_lightRedSemiTransparent = "rgba(".concat(_lightRedRGBString, ", 1)");
_darkRedTransparent = "rgba(".concat(_darkRedRGBString, ", 0)");
_lightRedTransparent = "rgba(".concat(_lightRedRGBString, ", 0)");
TutorialBitmap.Step = function () {
  class Step {
    // Override to true (or provide through options) if the step area should
    // remember the completed state of this step instead of asking to reconfirm it.
    static preserveCompleted() {
      return false;
    }

    // Override to true (or provide through options) if the hint drawing should be called after the step is completed.
    static drawHintsAfterCompleted() {
      return false;
    }

    // Override to true (or provide through options) if the step can be completed even if extra pixels are present.
    static canCompleteWithExtraPixels() {
      return false;
    }
    static getEditor() {
      return PAA.PixelPad.Apps.Drawing.Editor.getEditor();
    }
    constructor(tutorialBitmap, stepArea) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.tutorialBitmap = tutorialBitmap;
      this.stepArea = stepArea;
      this.options = options;
      this.stepArea.addStep(this, this.options.stepIndex);
    }
    destroy() {} // Override to do any cleanup.

    // Override to specify when the step's conditions are satisfied.
    completed() {
      // Don't allow to continue if drawing outside of bounds.
      if (this.stepArea.hasExtraPixels() && this.isActiveStepInArea() && !this.canCompleteWithExtraPixels()) {
        return;
      }
      return true;
    }

    // Override if the step requires pixels for its completion (so other steps don't consider them to be invalid).
    hasPixel(absoluteX, absoluteY) {
      return false;
    }
    solve() {
      throw new AE.NotImplementedException("A step has to provide a method to solve itself to a completed state.");
    }

    // Override if the step needs to reset any internal state when the asset is reset.
    reset() {}
    preserveCompleted() {
      if (this.options.preserveCompleted != null) {
        return this.options.preserveCompleted;
      } else {
        return this.constructor.preserveCompleted();
      }
    }
    drawHintsAfterCompleted() {
      if (this.options.drawHintsAfterCompleted != null) {
        return this.options.drawHintsAfterCompleted;
      } else {
        return this.constructor.drawHintsAfterCompleted();
      }
    }
    canCompleteWithExtraPixels() {
      if (this.options.canCompleteWithExtraPixels != null) {
        return this.options.canCompleteWithExtraPixels;
      } else {
        return this.constructor.canCompleteWithExtraPixels();
      }
    }
    getEditor() {
      return this.constructor.getEditor();
    }
    getIndexInArea() {
      return this.stepArea.steps().indexOf(this);
    }
    isActiveStepInArea() {
      return this.stepArea.activeStepIndex() === this.getIndexInArea();
    }
    activate() {
      var action, addLayerAction, appendToLastAction, bitmap, i, layer, layerIndex, layers, len, strokeAction;
      if (!this.options.startPixels) {
        return;
      }

      // Add start pixels.
      bitmap = this.tutorialBitmap.bitmap();
      if (this.options.startPixels instanceof TutorialBitmap.Resource.Pixels) {
        layers = [this.options.startPixels];
      } else {
        layers = this.options.startPixels;
      }
      action = new AM.Document.Versioning.Action(this.tutorialBitmap.id());
      for (layerIndex = i = 0, len = layers.length; i < len; layerIndex = ++i) {
        layer = layers[layerIndex];
        // Add layer if necessary.
        if (!bitmap.getLayer(layerIndex)) {
          addLayerAction = new LOI.Assets.Bitmap.Actions.AddLayer(this.tutorialBitmap.id(), bitmap);
          AM.Document.Versioning.executePartialAction(bitmap, addLayerAction);
          action.append(addLayerAction);
        }

        // Add the pixels.
        strokeAction = new LOI.Assets.Bitmap.Actions.Stroke(this.tutorialBitmap.id(), bitmap, [layerIndex], layer.pixels());
        AM.Document.Versioning.executePartialAction(bitmap, strokeAction);
        action.append(strokeAction);
      }

      // If this activation happened as part of a user action, append the new pixels to that action.
      appendToLastAction = bitmap.historyPosition > 0;
      AM.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, action, new Date(), appendToLastAction);
      if (!appendToLastAction) {
        // If this was the initial step, make it appear as if the bitmap started with these pixels.
        return AM.Document.Versioning.clearHistory(bitmap);
      }
    }
    drawUnderlyingHints(context) {
      let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    } // Override to draw hints under the bitmap.

    drawOverlaidHints(context) {
      let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    } // Override to draw hints over the bitmap.

    _prepareColorHelp(context, renderOptions) {
      var dotHintOffsetWindow, dotHintSizeWindow, pixelSize;
      // Hints are ideally 5x smaller dots in the middle of a pixel.
      pixelSize = renderOptions.camera.effectiveScale();
      dotHintSizeWindow = Math.ceil(pixelSize / 5);
      dotHintOffsetWindow = Math.floor((pixelSize - dotHintSizeWindow) / 2);

      // We need to store sizes relative to the pixel.
      this._dotHintSize = dotHintSizeWindow / pixelSize;
      this._dotHintOffset = dotHintOffsetWindow / pixelSize;
      this._pixelOutlineErrorOffset = 1.5 / pixelSize;
      this._pixelOutlineErrorWidth = 4 / pixelSize;
      this._ColorHelp = PAA.PixelPad.Apps.Drawing.Editor.ColorHelp;
      this._hintStyle = this._ColorHelp.hintStyle();
      this._errorStyle = this._ColorHelp.errorStyle();
      this._displayAllColorErrors = this.tutorialBitmap.hintsEngineComponents.overlaid.displayAllColorErrors();
      this._dotHintOutlineErrorSize = (dotHintSizeWindow + 4) / pixelSize;
      this._dotHintOutlineErrorOffset = (dotHintOffsetWindow - 2) / pixelSize;

      // If pixel is less than 2 big, we should lower the opacity of the hint to mimic less coverage.
      this._hintOpacity = pixelSize < 2 ? pixelSize / 5 : 1;
      context.font = '0.5px Adventure Retronator';
      context.textAlign = 'center';
      return context.textBaseline = 'middle';
    }
    _drawColorHelpForPixel(context, x, y, assetColor, palette, error, renderOptions) {
      var absoluteX, absoluteY, base, base1, color, colorLuminosity, errorColor, errorColorIsLight, height, hintGlowErrorGradient, i, len, name, name1, offset, ref, ref1, ref2, serialIndex, symbol, width;
      absoluteX = x + this.stepArea.bounds.x;
      absoluteY = y + this.stepArea.bounds.y;
      _topLeftCorner.x = absoluteX;
      _topLeftCorner.y = absoluteY;
      renderOptions.camera.roundCanvasToWindowPixel(_topLeftCorner, _topLeftCorner);
      _bottomRightCorner.x = absoluteX + 1;
      _bottomRightCorner.y = absoluteY + 1;
      renderOptions.camera.roundCanvasToWindowPixel(_bottomRightCorner, _bottomRightCorner);
      if (assetColor) {
        color = LOI.Assets.ColorHelper.resolveAssetColor(palette, assetColor);
      }
      if (color) {
        if (!(colorLuminosity = (ref = this.constructor._luminosityForRGB[color.r]) != null ? (ref1 = ref[color.g]) != null ? ref1[color.b] : void 0 : void 0)) {
          colorLuminosity = THREE.Color.fromObject(color).getLCh().l;
          if ((base = this.constructor._luminosityForRGB)[name = color.r] == null) {
            base[name] = {};
          }
          if ((base1 = this.constructor._luminosityForRGB[color.r])[name1 = color.g] == null) {
            base1[name1] = {};
          }
          this.constructor._luminosityForRGB[color.r][color.g][color.b] = colorLuminosity;
        }
        errorColorIsLight = colorLuminosity < _darkLightColorErrorLuminosityThreshold;
      } else {
        errorColorIsLight = true;
      }
      errorColor = errorColorIsLight ? _lightRed : _darkRed;
      if (error || this._displayAllColorErrors) {
        // Draw the error.
        if (this._errorStyle === this._ColorHelp.ErrorStyle.PixelOutline) {
          // Draw a pixel outline.
          context.strokeStyle = errorColor;
          context.lineWidth = this._pixelOutlineErrorWidth;
          width = _bottomRightCorner.x - _topLeftCorner.x - this._pixelOutlineErrorOffset * 2;
          height = _bottomRightCorner.y - _topLeftCorner.y - this._pixelOutlineErrorOffset * 2;
          if (width > 0 && height > 0) {
            context.strokeRect(_topLeftCorner.x + this._pixelOutlineErrorOffset, _topLeftCorner.y + this._pixelOutlineErrorOffset, width, height);
          }
        } else if (this._errorStyle === this._ColorHelp.ErrorStyle.HintOutline) {
          context.fillStyle = errorColor;
          if (this._hintStyle === this._ColorHelp.HintStyle.Dots || !assetColor) {
            // Draw a slightly bigger dot.
            context.fillRect(_topLeftCorner.x + this._dotHintOutlineErrorOffset, _topLeftCorner.y + this._dotHintOutlineErrorOffset, this._dotHintOutlineErrorSize, this._dotHintOutlineErrorSize);
          } else {
            // Draw the symbol offset to create an outline.
            serialIndex = LOI.Assets.ColorHelper.getSerialIndexForAssetColor(palette, assetColor);
            symbol = PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.symbols[serialIndex];
            ref2 = [-0.08, 0.08];
            for (i = 0, len = ref2.length; i < len; i++) {
              offset = ref2[i];
              context.fillText(symbol, absoluteX + 0.5 + offset, absoluteY + 0.5);
              context.fillText(symbol, absoluteX + 0.5, absoluteY + 0.5 + offset);
              context.fillText(symbol, absoluteX + 0.5 + offset, absoluteY + 0.5 + offset);
              context.fillText(symbol, absoluteX + 0.5 - offset, absoluteY + 0.5 + offset);
            }
          }
        } else if (this._errorStyle === this._ColorHelp.ErrorStyle.HintGlow || this._displayAllColorErrors && !this._errorStyle) {
          // Draw a radial gradient from the center of the pixel.
          hintGlowErrorGradient = context.createRadialGradient(absoluteX + 0.5, absoluteY + 0.5, 0, absoluteX + 0.5, absoluteY + 0.5, 0.7);
          hintGlowErrorGradient.addColorStop(0, errorColorIsLight ? _lightRedSemiTransparent : _darkRedSemiTransparent);
          hintGlowErrorGradient.addColorStop(1, errorColorIsLight ? _lightRedTransparent : _darkRedTransparent);
          context.fillStyle = hintGlowErrorGradient;
          context.fillRect(absoluteX, absoluteY, 1, 1);
        }
      }
      if (color) {
        context.fillStyle = "rgba(".concat(color.r * 255, ", ").concat(color.g * 255, ", ").concat(color.b * 255, ", ").concat(this._hintOpacity, ")");
      }
      if (this._hintStyle === this._ColorHelp.HintStyle.Dots || !assetColor) {
        // Draw the dot hint.
        if (color) {
          return context.fillRect(_topLeftCorner.x + this._dotHintOffset, _topLeftCorner.y + this._dotHintOffset, this._dotHintSize, this._dotHintSize);
        } else if (!(this._hintOpacity < 1)) {
          return context.clearRect(_topLeftCorner.x + this._dotHintOffset, _topLeftCorner.y + this._dotHintOffset, this._dotHintSize, this._dotHintSize);
        }
      } else {
        // Draw the symbol hint.
        serialIndex = LOI.Assets.ColorHelper.getSerialIndexForAssetColor(palette, assetColor);
        symbol = PAA.PixelPad.Apps.Drawing.Editor.ColorHelp.symbols[serialIndex];
        // Write the symbol in the center of the pixel.
        return context.fillText(symbol, absoluteX + 0.5, absoluteY + 0.5);
      }
    }
  }
  ;
  Step._luminosityForRGB = {};
  return Step;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelsstep.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pixelsstep.coffee        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.PixelsStep = class PixelsStep extends TutorialBitmap.Step {
  constructor() {
    var base, base1, base2, goalPixelsResource, i, len, name, pixel, ref;
    super(...arguments);
    if ((base = this.options).drawHintsForGoalPixels == null) {
      base.drawHintsForGoalPixels = true;
    }
    if ((base1 = this.options).hasPixelsWhenInactive == null) {
      base1.hasPixelsWhenInactive = true;
    }
    goalPixelsResource = this.options.goalPixels;
    this.goalPixels = goalPixelsResource.pixels();

    // We create a map representation for fast retrieval as well.
    this.goalPixelsMap = {};
    ref = this.goalPixels;
    for (i = 0, len = ref.length; i < len; i++) {
      pixel = ref[i];
      if ((base2 = this.goalPixelsMap)[name = pixel.x] == null) {
        base2[name] = {};
      }
      this.goalPixelsMap[pixel.x][pixel.y] = pixel;
    }
  }
  completed() {
    var backgroundColor, bitmapLayer, goalPixel, i, j, palette, pixel, ref, ref1, ref2, ref3, x, y;
    if (!super.completed(...arguments)) {
      return;
    }

    // If a step doesn't have pixels when inactive, we have to make sure this step can
    // first get active and report its pixels so that it can fail due to extra pixels.
    if (!(this.options.hasPixelsWhenInactive || this.stepArea.activeStepIndex() != null)) {
      return;
    }

    // Compare goal pixels with first bitmap layer.
    if (!(bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0)) {
      return;
    }
    if (!(palette = this.tutorialBitmap.palette())) {
      return;
    }
    backgroundColor = this.tutorialBitmap.backgroundColor();
    for (x = i = 0, ref1 = this.stepArea.bounds.width; 0 <= ref1 ? i < ref1 : i > ref1; x = 0 <= ref1 ? ++i : --i) {
      for (y = j = 0, ref2 = this.stepArea.bounds.height; 0 <= ref2 ? j < ref2 : j > ref2; y = 0 <= ref2 ? ++j : --j) {
        if (!(goalPixel = (ref3 = this.goalPixelsMap[x]) != null ? ref3[y] : void 0)) {
          // See if we require a pixel here.
          continue;
        }
        // We do require a pixel here so get it from the bitmap.
        // Note: We can't return false if the pixel is not found as the required color might be the background color.
        pixel = bitmapLayer.getPixel(this.stepArea.bounds.x + x, this.stepArea.bounds.y + y);
        if (!LOI.Assets.ColorHelper.areAssetColorsEqual(pixel, goalPixel, palette, backgroundColor)) {
          // Compare the RGB values the pixel resolves to.
          return false;
        }
      }
    }
    return true;
  }
  hasPixel(absoluteX, absoluteY) {
    var ref, relativeX, relativeY;
    if (!(this.options.hasPixelsWhenInactive || this.isActiveStepInArea())) {
      return;
    }
    relativeX = absoluteX - this.stepArea.bounds.x;
    relativeY = absoluteY - this.stepArea.bounds.y;
    return ((ref = this.goalPixelsMap[relativeX]) != null ? ref[relativeY] : void 0) != null;
  }
  hasCorrectPixelColor(absoluteX, absoluteY) {
    var backgroundColor, bitmap, goalPixel, palette, pixel, ref, relativeX, relativeY;
    relativeX = absoluteX - this.stepArea.bounds.x;
    relativeY = absoluteY - this.stepArea.bounds.y;

    // We can't determine correct pixel color if there is no goal pixel here.
    if (!(goalPixel = (ref = this.goalPixelsMap[relativeX]) != null ? ref[relativeY] : void 0)) {
      return;
    }

    // We can't determine correct pixel color if there is no pixel here.
    bitmap = this.tutorialBitmap.bitmap();
    if (!(pixel = bitmap.getPixelForLayerAtAbsoluteCoordinates(0, absoluteX, absoluteY))) {
      return;
    }
    backgroundColor = this.tutorialBitmap.backgroundColor();
    palette = this.tutorialBitmap.palette();
    return LOI.Assets.ColorHelper.areAssetColorsEqual(pixel, goalPixel, palette, backgroundColor);
  }
  solve() {
    var bitmap, i, j, pixel, pixels, ref, ref1, ref2, ref3, strokeAction, x, y;
    bitmap = this.tutorialBitmap.bitmap();
    pixels = [];
    for (x = i = 0, ref = this.stepArea.bounds.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      for (y = j = 0, ref1 = this.stepArea.bounds.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
        pixel = _.clone(((ref2 = this.goalPixelsMap[x]) != null ? ref2[y] : void 0) || {
          x,
          y
        });
        pixel.x += this.stepArea.bounds.x;
        pixel.y += this.stepArea.bounds.y;
        if (((ref3 = this.goalPixelsMap[x]) != null ? ref3[y] : void 0) || !this.stepArea.hasGoalPixel(this.stepArea.bounds.x + x, this.stepArea.bounds.y + y)) {
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
    var absoluteX, absoluteY, anyPixel, backgroundColor, bitmap, displayAllColorErrors, displayColorHelpUpToPixelCoordinates, drawHintsForGoalPixels, goalPixel, i, j, palette, pixel, ref, ref1, ref2, x, y;
    this._prepareColorHelp(context, renderOptions);
    displayColorHelpUpToPixelCoordinates = this.tutorialBitmap.hintsEngineComponents.overlaid.displayColorHelpUpToPixelCoordinates();
    displayAllColorErrors = this.tutorialBitmap.hintsEngineComponents.overlaid.displayAllColorErrors();
    bitmap = this.tutorialBitmap.bitmap();
    palette = this.tutorialBitmap.palette();
    backgroundColor = this.tutorialBitmap.backgroundColor();
    drawHintsForGoalPixels = this.options.drawHintsForGoalPixels || displayAllColorErrors;
    for (x = i = 0, ref = this.stepArea.bounds.width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
      for (y = j = 0, ref1 = this.stepArea.bounds.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
        if (displayColorHelpUpToPixelCoordinates && (y > displayColorHelpUpToPixelCoordinates.y || displayColorHelpUpToPixelCoordinates.y === y && x > displayColorHelpUpToPixelCoordinates.x)) {
          // Only display help to a certain point.
          continue;
        }

        // Do we have a pixel here?
        absoluteX = x + this.stepArea.bounds.x;
        absoluteY = y + this.stepArea.bounds.y;
        pixel = bitmap.getPixelForLayerAtAbsoluteCoordinates(0, absoluteX, absoluteY);
        if (backgroundColor && LOI.Assets.ColorHelper.areAssetColorsEqual(pixel, backgroundColor, palette)) {
          // Make sure the pixel is not the same as the background color, otherwise it's the same as not having it.
          pixel = null;
        }

        // Do we need a pixel here?
        goalPixel = (ref2 = this.goalPixelsMap[x]) != null ? ref2[y] : void 0;
        if (LOI.Assets.ColorHelper.areAssetColorsEqual(pixel, goalPixel, palette, backgroundColor)) {
          // Nothing to do if the two pixels are the same.
          continue;
        }

        // Clear hints at pixels that should be empty.
        anyPixel = this.stepArea.hasGoalPixel(absoluteX, absoluteY);
        if (pixel && !anyPixel) {
          this._drawColorHelpForPixel(context, x, y, null, null, true, renderOptions);

          // Draw hints on drawn goal pixels and optionally all goal pixels.
        } else if (goalPixel && (pixel || drawHintsForGoalPixels)) {
          this._drawColorHelpForPixel(context, x, y, goalPixel, palette, pixel, renderOptions);
        }
      }
    }
  }
};

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixelswithpathsstep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pixelswithpathsstep.coff //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.PixelsWithPathsStep = class PixelsWithPathsStep extends TutorialBitmap.PixelsStep {
  constructor() {
    var base, base1, base2, svgPath;
    super(...arguments);
    this.options.drawHintsForGoalPixels = false;
    if ((base = this.options).hintStrokeWidth == null) {
      base.hintStrokeWidth = 1;
    }
    if ((base1 = this.options).strokeStyle == null) {
      base1.strokeStyle = TutorialBitmap.PathStep.StrokeStyles.Solid;
    }
    if ((base2 = this.options).fillStyle == null) {
      base2.fillStyle = TutorialBitmap.PathStep.FillStyles.Dashed;
    }
    this.paths = function () {
      var i, len, ref, results;
      ref = this.options.svgPaths;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        svgPath = ref[i];
        results.push(new TutorialBitmap.PathStep.Path(this.tutorialBitmap, this, svgPath));
      }
      return results;
    }.call(this);
  }
  drawUnderlyingHints(context, renderOptions) {
    return TutorialBitmap.PathStep.drawPathFillHints(context, renderOptions, this.stepArea, this.paths);
  }
  drawOverlaidHints(context, renderOptions) {
    super.drawOverlaidHints(...arguments);
    return TutorialBitmap.PathStep.drawPathStrokeHints(context, renderOptions, this.stepArea, this.paths, this.options.hintStrokeWidth);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ephemeralstep.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/ephemeralstep.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.EphemeralStep = class EphemeralStep extends TutorialBitmap.Step {
  static preserveCompleted() {
    return true;
  }
  constructor() {
    super(...arguments);
    this._solved = new ReactiveField(false);
  }
  completed() {
    if (!super.completed(...arguments)) {
      return;
    }
    return this._solved();
  }
  solve() {
    return this._solved(true);
  }
  reset() {
    return this._solved(false);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pathstep":{"pathstep.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pathstep/pathstep.coffee //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AMu, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AMu = Artificial.Mummification;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
if (Meteor.isClient) {
  require('path-data-polyfill/path-data-polyfill.js');
}
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.PathStep = function () {
  class PathStep extends TutorialBitmap.Step {
    static drawPathStrokeHints(context, renderOptions, stepArea, paths) {
      let strokeWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var i, j, len, len1, path;
      // Draw path to step area.
      context.save();
      context.translate(stepArea.bounds.x, stepArea.bounds.y);
      if (this.debug) {
        // Draw the anti-aliased paths for debug purposes.
        context.globalAlpha = 0.5;
        context.imageSmoothingEnabled = false;
        for (i = 0, len = paths.length; i < len; i++) {
          path = paths[i];
          context.drawImage(path.canvas, 0, 0);
        }
        context.globalAlpha = 1;
      }
      for (j = 0, len1 = paths.length; j < len1; j++) {
        path = paths[j];
        // Draw all the paths' hints.
        path.drawStrokeHint(context, renderOptions, strokeWidth);
      }
      return context.restore();
    }
    static drawPathFillHints(context, renderOptions, stepArea, paths) {
      var i, len, path;
      // Draw path to step area.
      context.save();
      context.translate(stepArea.bounds.x, stepArea.bounds.y);
      for (i = 0, len = paths.length; i < len; i++) {
        path = paths[i];

        // Draw all the paths' hints.
        path.drawFillHint(context, renderOptions);
      }
      return context.restore();
    }

    // Note: We receive pure SVG paths through options since the SVG paths resource can be broken down into multiple steps.
    constructor() {
      var base, base1, base2, base3, base4;
      super(...arguments);
      if ((base = this.options).hasPixelsWhenInactive == null) {
        base.hasPixelsWhenInactive = true;
      }
      if ((base1 = this.options).tolerance == null) {
        base1.tolerance = 0;
      }
      if ((base2 = this.options).hintStrokeWidth == null) {
        base2.hintStrokeWidth = 1;
      }
      if ((base3 = this.options).strokeStyle == null) {
        base3.strokeStyle = this.constructor.StrokeStyles.Solid;
      }
      if ((base4 = this.options).fillStyle == null) {
        base4.fillStyle = this.constructor.FillStyles.Dashed;
      }
      this._pathsDependency = new Tracker.Dependency();
      if (_.isFunction(this.options.svgPaths)) {
        this._initializePathsAutorun = Tracker.autorun(() => {
          return this._initializePaths(this.options.svgPaths());
        });
      } else {
        this._initializePaths(this.options.svgPaths);
      }
    }
    destroy() {
      var ref;
      return (ref = this._initializePathsAutorun) != null ? ref.stop() : void 0;
    }

    // We separate the initialization part so we can reuse it in child implementations.
    _initializePaths(svgPaths) {
      var fillColorString, height, i, j, k, l, len, len1, len2, m, path, ref, ref1, ref2, ref3, style, svgPath, svgSubpath, svgSubpaths, width, x, y;
      this.paths = [];
      for (i = 0, len = svgPaths.length; i < len; i++) {
        svgPath = svgPaths[i];
        style = svgPath.getAttribute('style');
        fillColorString = (ref = style.match(/fill:(.*?);/)) != null ? ref[1] : void 0;
        if (!fillColorString || fillColorString === 'none') {
          // Further break down the SVG path into its separate parts.
          svgSubpaths = AM.SVGHelper.splitPath(svgPath);
          for (j = 0, len1 = svgSubpaths.length; j < len1; j++) {
            svgSubpath = svgSubpaths[j];
            this.paths.push(new this.constructor.Path(this.tutorialBitmap, this, svgSubpath));
          }
        } else {
          this.paths.push(new this.constructor.Path(this.tutorialBitmap, this, svgPath));
        }
      }
      this._pixelsMap = new Uint8Array(this.stepArea.bounds.width * this.stepArea.bounds.height);
      width = this.stepArea.bounds.width;
      height = this.stepArea.bounds.height;
      for (x = k = 0, ref1 = width; 0 <= ref1 ? k < ref1 : k > ref1; x = 0 <= ref1 ? ++k : --k) {
        for (y = l = 0, ref2 = height; 0 <= ref2 ? l < ref2 : l > ref2; y = 0 <= ref2 ? ++l : --l) {
          ref3 = this.paths;
          for (m = 0, len2 = ref3.length; m < len2; m++) {
            path = ref3[m];
            if (path.hasPixel(x, y)) {
              this._pixelsMap[x + y * width]++;
            }
          }
        }
      }
      return this._pathsDependency.changed();
    }
    _pathsReady() {
      var ref;
      this._pathsDependency.depend();
      return (ref = this.paths) != null ? ref.length : void 0;
    }
    completed() {
      var completed, i, len, path, ref;
      if (!this._pathsReady()) {
        return;
      }
      if (!super.completed(...arguments)) {
        return;
      }
      // Check that all paths have their pixels covered. We check all paths instead of
      // quitting early since paths also remember their completed state for drawing hints.
      completed = true;
      ref = this.paths;
      for (i = 0, len = ref.length; i < len; i++) {
        path = ref[i];
        if (!path.completed()) {
          completed = false;
        }
      }
      return completed;
    }
    hasPixel(absoluteX, absoluteY) {
      var relativeX, relativeY;
      if (!this._pathsReady()) {
        return;
      }
      if (!(this.options.hasPixelsWhenInactive || this.isActiveStepInArea())) {
        return;
      }
      relativeX = absoluteX - this.stepArea.bounds.x;
      relativeY = absoluteY - this.stepArea.bounds.y;
      return this._pixelsMap[relativeX + relativeY * this.stepArea.bounds.width] > 0;
    }
    multiplePathsHavePixel(relativeX, relativeY) {
      if (!this._pathsReady()) {
        return;
      }
      return this._pixelsMap[relativeX + relativeY * this.stepArea.bounds.width] > 1;
    }
    solve() {
      var bitmap, height, i, j, k, l, len, len1, palette, paletteColor, path, pixels, ref, ref1, ref2, ref3, strokeAction, width, x, y;
      bitmap = this.tutorialBitmap.bitmap();
      palette = this.tutorialBitmap.palette();
      pixels = [];
      width = this.stepArea.bounds.width;
      height = this.stepArea.bounds.height;
      for (x = i = 0, ref = width; 0 <= ref ? i < ref : i > ref; x = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          paletteColor = null;
          ref2 = this.paths;

          // Try fills first.
          for (k = 0, len = ref2.length; k < len; k++) {
            path = ref2[k];
            if (!(path.pixelExceedsSolutionThreshold(x, y) && path.pixelShouldBeFill(x, y))) {
              continue;
            }
            paletteColor = palette.exactPaletteColor(path.fillColor);
            break;
          }
          ref3 = this.paths;

          // Strokes override filles.
          for (l = 0, len1 = ref3.length; l < len1; l++) {
            path = ref3[l];
            if (!(path.pixelExceedsSolutionThreshold(x, y) && !path.pixelShouldBeFill(x, y))) {
              continue;
            }
            paletteColor = palette.exactPaletteColor(path.strokeColor);
            break;
          }
          if (paletteColor) {
            pixels.push({
              x: x + this.stepArea.bounds.x,
              y: y + this.stepArea.bounds.y,
              paletteColor: paletteColor
            });
          }
        }
      }

      // Replace the layer pixels in this bitmap.
      strokeAction = new LOI.Assets.Bitmap.Actions.Stroke(this.tutorialBitmap.id(), bitmap, [0], pixels);
      return AMu.Document.Versioning.executeAction(bitmap, bitmap.lastEditTime, strokeAction, new Date());
    }
    drawUnderlyingHints(context, renderOptions) {
      if (!this._pathsReady()) {
        return;
      }
      return this.constructor.drawPathFillHints(context, renderOptions, this.stepArea, this.paths);
    }
    drawOverlaidHints(context, renderOptions) {
      var absoluteX, absoluteY, backgroundColor, bitmapLayer, hintNeeded, i, j, k, l, len, len1, len2, m, palette, path, pixel, pixelCompleted, ref, ref1, ref2, ref3, ref4, ref5, x, y;
      if (!this._pathsReady()) {
        return;
      }
      this.constructor.drawPathStrokeHints(context, renderOptions, this.stepArea, this.paths, this.options.hintStrokeWidth);
      this._prepareColorHelp(context, renderOptions);
      bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0;
      palette = this.tutorialBitmap.palette();
      backgroundColor = this.tutorialBitmap.backgroundColor();
      for (x = i = 0, ref1 = this.stepArea.bounds.width; 0 <= ref1 ? i < ref1 : i > ref1; x = 0 <= ref1 ? ++i : --i) {
        for (y = j = 0, ref2 = this.stepArea.bounds.height; 0 <= ref2 ? j < ref2 : j > ref2; y = 0 <= ref2 ? ++j : --j) {
          absoluteX = x + this.stepArea.bounds.x;
          absoluteY = y + this.stepArea.bounds.y;
          if (!(pixel = bitmapLayer.getPixel(absoluteX, absoluteY))) {
            continue;
          }
          if (this.stepArea.hasGoalPixel(absoluteX, absoluteY)) {
            // Draw hints if no path completed the pixel.
            pixelCompleted = false;
            ref3 = this.paths;
            for (k = 0, len = ref3.length; k < len; k++) {
              path = ref3[k];
              if (path.pixelCompleted(x, y)) {
                pixelCompleted = true;
                break;
              }
            }
            if (pixelCompleted) {
              continue;
            }

            // Draw hints at path pixels with the correct color.
            hintNeeded = true;
            ref4 = this.paths;

            // In the first pass, try to draw only strokes.
            for (l = 0, len1 = ref4.length; l < len1; l++) {
              path = ref4[l];
              if (!(path.pixelExceedsColorHintThreshold(x, y) && path.pixelCanBeStroke(x, y))) {
                continue;
              }
              hintNeeded = false;
              if (LOI.Assets.ColorHelper.areAssetColorsEqual(pixel, path.strokeColor, palette, backgroundColor)) {
                // Nothing to do if the pixel already has the color of the path.
                break;
              }

              // Draw the hint for this stroke color.
              this._drawColorHelpForPixel(context, x, y, path.strokeAssetColor, palette, pixel, renderOptions);
              break;
            }
            if (hintNeeded) {
              ref5 = this.paths;
              // In the second pass, try to draw fill color hints.
              for (m = 0, len2 = ref5.length; m < len2; m++) {
                path = ref5[m];
                if (!(path.pixelExceedsColorHintThreshold(x, y) && path.pixelCanBeFill(x, y))) {
                  continue;
                }
                if (LOI.Assets.ColorHelper.areAssetColorsEqual(pixel, path.fillColor, palette, backgroundColor)) {
                  break;
                }
                this._drawColorHelpForPixel(context, x, y, path.fillAssetColor, palette, pixel, renderOptions);
                break;
              }
            }
          } else {
            // Erase dots at empty pixels.
            this._drawColorHelpForPixel(context, x, y, null, null, null, renderOptions);
          }
        }
      }
    }
  }
  ;
  PathStep.debug = false;
  PathStep.StrokeStyles = {
    Solid: 'Solid',
    None: 'None'
  };
  PathStep.FillStyles = {
    Solid: 'Solid',
    Dashed: 'Dashed'
  };
  return PathStep;
}.call(this);

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"path.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pathstep/path.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, LOI, PAA, TutorialBitmap;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
LOI = LandsOfIllusions;
if (Meteor.isClient) {
  require('path-data-polyfill/path-data-polyfill.js');
}
TutorialBitmap = PAA.Practice.Tutorials.Drawing.Assets.TutorialBitmap;
TutorialBitmap.PathStep.Path = function () {
  class Path {
    constructor(tutorialBitmap, pathStep, svgPath) {
      var addCorner, alpha, alphaIndex, channelOffset, cornerAlpha, cornerMaxOffset, currentCornersOfPart, fillColorString, i, j, k, l, len, m, pixelIndex, ref, ref1, ref2, ref3, ref4, ref5, ref6, segment, strokeColorString, style, x, y;
      this.tutorialBitmap = tutorialBitmap;
      this.pathStep = pathStep;
      this.canvas = new AM.ReadableCanvas(this.pathStep.stepArea.bounds.width, this.pathStep.stepArea.bounds.height);
      this.path = new Path2D(svgPath.getAttribute('d'));
      style = svgPath.getAttribute('style');
      strokeColorString = (ref = style.match(/stroke:(.*?);/)) != null ? ref[1] : void 0;
      if (strokeColorString !== 'none') {
        this.strokeColor = new THREE.Color(strokeColorString);
        this.strokeAssetColor = {
          directColor: this.strokeColor
        };
      }
      fillColorString = (ref1 = style.match(/fill:(.*?);/)) != null ? ref1[1] : void 0;
      if (fillColorString !== 'none') {
        this.fillColor = new THREE.Color(fillColorString);
        this.fillAssetColor = {
          directColor: this.fillColor
        };
      }

      // Rasterize the path to the canvas.
      this.canvas.context.lineCap = 'round';
      this.canvas.context.lineWidth = this.pathStep.options.tolerance * 2;
      if (this.fillColor) {
        this.canvas.context.fillStyle = "rgb(255 0 0)";
        this.canvas.context.fill(this.path);
        if (this.pathStep.options.tolerance && this.strokeColor) {
          // Reduce the size of the required filled area by the tolerance since the stroke itself will be slightly lighter.
          this.canvas.context.globalCompositeOperation = 'destination-out';
          this.canvas.context.stroke(this.path);
          this.canvas.context.globalCompositeOperation = 'source-over';
        }
      }
      if (this.strokeColor) {
        if (this.pathStep.options.tolerance) {
          // When we have tolerance, draw the lines slightly lighter than
          // required so that none of their pixels are directly required.
          this.canvas.context.strokeStyle = "rgb(0 0 0 / ".concat((this.constructor.minimumRequiredPixelAlpha - 10) / 255, ")");
        }
        this.canvas.context.stroke(this.path);
      }
      this._imageData = this.canvas.getFullImageData();
      this.pathBounds = {
        left: Number.POSITIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
        top: Number.POSITIVE_INFINITY,
        bottom: Number.NEGATIVE_INFINITY
      };
      for (x = i = 0, ref2 = this.canvas.width; 0 <= ref2 ? i < ref2 : i > ref2; x = 0 <= ref2 ? ++i : --i) {
        for (y = j = 0, ref3 = this.canvas.height; 0 <= ref3 ? j < ref3 : j > ref3; y = 0 <= ref3 ? ++j : --j) {
          pixelIndex = x + y * this._imageData.width;
          alpha = this._imageData.data[pixelIndex * 4 + 3];
          if (alpha < this.constructor.minimumAntiAliasingAlpha) {
            this._imageData.data[pixelIndex * 4 + 3] = 0;
          } else {
            this.pathBounds.left = Math.min(this.pathBounds.left, x);
            this.pathBounds.right = Math.max(this.pathBounds.right, x);
            this.pathBounds.top = Math.min(this.pathBounds.top, y);
            this.pathBounds.bottom = Math.max(this.pathBounds.bottom, y);

            // Turn anti-aliased pixels blue (pink inside) and required green (yellow inside) for debugging purposes.
            channelOffset = alpha >= this.constructor.minimumRequiredPixelAlpha ? 1 : 2;
            this._imageData.data[pixelIndex * 4 + channelOffset] = 128;

            // Make allowed pixels more visible, but don't change their
            // upper end since that's used for detecting required pixels.
            this._imageData.data[pixelIndex * 4 + 3] = Math.max(this.constructor.minimumSolutionPixelAlpha - 1, alpha);
          }
        }
      }
      this.pathBounds.width = this.pathBounds.right - this.pathBounds.left + 1;
      this.pathBounds.height = this.pathBounds.bottom - this.pathBounds.top + 1;

      // Calculate positions of corner points.
      this.cornersOfParts = [];
      this.pathData = svgPath.getPathData({
        normalize: true
      });
      currentCornersOfPart = null;
      cornerMaxOffset = this.pathStep.options.tolerance;
      cornerAlpha = this.pathStep.options.tolerance ? this.constructor.minimumRequiredPixelAlpha - 10 : 255;
      addCorner = (x, y) => {
        var dx, dy, k, l, ref4, ref5, ref6, ref7;
        x = Math.floor(x);
        y = Math.floor(y);
        currentCornersOfPart.push({
          x,
          y
        });
        // Turn corners lime (yellow for fill) for debugging purposes.
        for (dx = k = ref4 = -cornerMaxOffset, ref5 = cornerMaxOffset; ref4 <= ref5 ? k <= ref5 : k >= ref5; dx = ref4 <= ref5 ? ++k : --k) {
          for (dy = l = ref6 = -cornerMaxOffset, ref7 = cornerMaxOffset; ref6 <= ref7 ? l <= ref7 : l >= ref7; dy = ref6 <= ref7 ? ++l : --l) {
            pixelIndex = x + dx + (y + dy) * this._imageData.width;
            this._imageData.data[pixelIndex * 4 + 1] = 255;
            this._imageData.data[pixelIndex * 4 + 2] = 0;
          }
        }

        // HACK: Electron's Chrome produces different rasterization results that
        // sometimes leave ends unpainted, so we force them to have alpha here.
        return this._imageData.data[pixelIndex * 4 + 3] = cornerAlpha;
      };
      ref4 = this.pathData;
      for (k = 0, len = ref4.length; k < len; k++) {
        segment = ref4[k];
        if (segment.type === 'M') {
          if (currentCornersOfPart) {
            this.cornersOfParts.push(currentCornersOfPart);
          }
          currentCornersOfPart = [];
        }
        switch (segment.type) {
          case 'M':
          case 'L':
            addCorner(segment.values[0], segment.values[1]);
            break;
          case 'C':
            addCorner(segment.values[4], segment.values[5]);
            break;
          case 'Z':
            this.closed = true;
        }
      }
      this.cornersOfParts.push(currentCornersOfPart);
      this.canvas.putFullImageData(this._imageData);
      // Simple, closed, un-filled lines require that the interior is fully enclosed.
      if (this.closed && !this.fillColor && this.cornersOfParts.length === 1) {
        this.interiorCanvas = new AM.ReadableCanvas(this.pathStep.stepArea.bounds.width, this.pathStep.stepArea.bounds.height);
        this.interiorCanvas.context.fill(this.path);
        this.interiorCanvas.context.lineWidth = this.pathStep.options.tolerance * 2;
        this.interiorCanvas.context.globalCompositeOperation = 'destination-out';
        this.interiorCanvas.context.stroke(this.path);
        this.interiorCanvas.context.globalCompositeOperation = 'source-over';
        this._interiorImageData = this.interiorCanvas.getFullImageData();

        // Only make interior pixels the ones that are not aliased (100% are in the interior).
        for (x = l = 0, ref5 = this.interiorCanvas.width; 0 <= ref5 ? l < ref5 : l > ref5; x = 0 <= ref5 ? ++l : --l) {
          for (y = m = 0, ref6 = this.interiorCanvas.height; 0 <= ref6 ? m < ref6 : m > ref6; y = 0 <= ref6 ? ++m : --m) {
            alphaIndex = (x + y * this._interiorImageData.width) * 4 + 3;
            alpha = this._interiorImageData.data[alphaIndex];
            this._interiorImageData.data[alphaIndex] = alpha < 255 ? 0 : 255;
          }
        }
        this.interiorCanvas.putFullImageData(this._interiorImageData);
      }
    }
    _getPixelAlpha(x, y) {
      var pixelIndex;
      pixelIndex = x + y * this._imageData.width;
      return this._imageData.data[pixelIndex * 4 + 3];
    }
    hasPixel(x, y) {
      return this._getPixelAlpha(x, y);
    }
    pixelExceedsSolutionThreshold(x, y) {
      return this._getPixelAlpha(x, y) >= this.constructor.minimumSolutionPixelAlpha;
    }
    pixelExceedsColorHintThreshold(x, y) {
      return this._getPixelAlpha(x, y) >= this.constructor.minimumColorHintPixelAlpha;
    }
    pixelShouldBeFill(x, y) {
      var pixelIndex;
      pixelIndex = x + y * this._imageData.width;
      return this._imageData.data[pixelIndex * 4] > 128;
    }
    pixelCanBeFill(x, y) {
      var pixelIndex;
      pixelIndex = x + y * this._imageData.width;
      return this._imageData.data[pixelIndex * 4] > 0;
    }
    pixelCanBeStroke(x, y) {
      var pixelIndex;
      pixelIndex = x + y * this._imageData.width;
      return this._imageData.data[pixelIndex * 4] < 255;
    }
    pixelCompleted(x, y) {
      var absoluteX, absoluteY, backgroundColor, bitmapLayer, bounds, palette, pixel, ref;
      if (!this.hasPixel(x, y)) {
        return;
      }
      if (!(bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0)) {
        return;
      }
      if (!(palette = this.tutorialBitmap.palette())) {
        return;
      }
      bounds = this.pathStep.stepArea.bounds;
      absoluteX = bounds.x + x;
      absoluteY = bounds.y + y;
      pixel = bitmapLayer.getPixel(absoluteX, absoluteY);
      backgroundColor = this.tutorialBitmap.backgroundColor();
      if (this.pixelCanBeStroke(x, y)) {
        if (LOI.Assets.ColorHelper.areAssetColorsEqual(this.strokeAssetColor, pixel, palette, backgroundColor)) {
          return {
            stroke: true
          };
        }
      }
      if (this.pixelCanBeFill(x, y)) {
        if (LOI.Assets.ColorHelper.areAssetColorsEqual(this.fillAssetColor, pixel, palette, backgroundColor)) {
          return {
            fill: true
          };
        }
      }
      return false;
    }
    completed() {
      var absoluteX, absoluteY, backgroundColor, bitmapLayer, bounds, corner, cornersForPart, coverPixel, dx, dy, found, fringe, i, i1, interiorIndex, j, k, l, len, len1, len2, len3, len4, len5, m, markPixelInterior, maxOffset, n, neighborDx, neighborDy, neighborX, neighborY, o, p, palette, pixel, pixelAlpha, pixelCovered, pixelFlags, pixelInInterior, pixelMatchesColorOrOtherPathCompletesIt, pixelVisited, position, q, r, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, relativeX, relativeY, s, t, u, v, visitPixel, visitPixels, w, x, y, z;
      // Store completed locally to know whether to draw the hint.
      this._completed = false;

      // Make sure all corners are covered.
      if (!(bitmapLayer = (ref = this.tutorialBitmap.bitmap()) != null ? ref.layers[0] : void 0)) {
        return;
      }
      if (!(palette = this.tutorialBitmap.palette())) {
        return;
      }
      backgroundColor = this.tutorialBitmap.backgroundColor();
      bounds = this.pathStep.stepArea.bounds;
      pixelMatchesColorOrOtherPathCompletesIt = (pixel, x, y) => {
        var completion, i, len, path, ref1, stroke;
        if (this.pixelCanBeStroke(x, y)) {
          stroke = true;
          if (LOI.Assets.ColorHelper.areAssetColorsEqual(this.strokeAssetColor, pixel, palette, backgroundColor)) {
            return true;
          }
        }
        if (this.pixelCanBeFill(x, y)) {
          if (LOI.Assets.ColorHelper.areAssetColorsEqual(this.fillAssetColor, pixel, palette, backgroundColor)) {
            return true;
          }
        }
        if (!this.pathStep.multiplePathsHavePixel(x, y)) {
          return false;
        }
        ref1 = this.pathStep.paths;
        for (i = 0, len = ref1.length; i < len; i++) {
          path = ref1[i];
          if (!(path !== this)) {
            continue;
          }
          completion = path.pixelCompleted(x, y);
          if (stroke && (completion != null ? completion.stroke : void 0) || !stroke && completion) {
            return true;
          }
        }
        return false;
      };
      ref1 = this.cornersOfParts;
      for (i = 0, len = ref1.length; i < len; i++) {
        cornersForPart = ref1[i];
        for (j = 0, len1 = cornersForPart.length; j < len1; j++) {
          corner = cornersForPart[j];
          corner.foundCoveredPixelPositions = [];
          if (this.pathStep.options.tolerance) {
            // Try to find a pixel in increasing offset levels.
            for (maxOffset = k = 0, ref2 = this.pathStep.options.tolerance; 0 <= ref2 ? k <= ref2 : k >= ref2; maxOffset = 0 <= ref2 ? ++k : --k) {
              for (dx = l = ref3 = -maxOffset, ref4 = maxOffset; ref3 <= ref4 ? l <= ref4 : l >= ref4; dx = ref3 <= ref4 ? ++l : --l) {
                for (dy = m = ref5 = -maxOffset, ref6 = maxOffset; ref5 <= ref6 ? m <= ref6 : m >= ref6; dy = ref5 <= ref6 ? ++m : --m) {
                  x = corner.x + dx;
                  y = corner.y + dy;
                  absoluteX = bounds.x + x;
                  absoluteY = bounds.y + y;
                  if (this.hasPixel(x, y) && (pixel = bitmapLayer.getPixel(absoluteX, absoluteY))) {
                    if (pixelMatchesColorOrOtherPathCompletesIt(pixel, x, y)) {
                      corner.foundCoveredPixelPositions.push({
                        x,
                        y
                      });
                    }
                  }
                }
              }
            }
            if (!corner.foundCoveredPixelPositions.length) {
              return false;
            }
          } else {
            absoluteX = bounds.x + corner.x;
            absoluteY = bounds.y + corner.y;
            if (!(pixel = bitmapLayer.getPixel(absoluteX, absoluteY))) {
              return false;
            }
            if (pixelMatchesColorOrOtherPathCompletesIt(pixel, corner.x, corner.y)) {
              corner.foundCoveredPixelPositions = [corner];
            }
          }
        }
      }

      // Prepare a data structure for marking pixels as covered (painted
      // by the player) and visited (flood-filled to find connectivity).
      pixelFlags = new Uint8Array(bounds.width * bounds.height * 3);
      coverPixel = (x, y) => {
        var pixelIndex;
        pixelIndex = x + y * bounds.width;
        return pixelFlags[pixelIndex * 3] = 1;
      };
      pixelCovered = (x, y) => {
        var pixelIndex;
        pixelIndex = x + y * bounds.width;
        return pixelFlags[pixelIndex * 3] > 0;
      };
      visitPixel = (x, y) => {
        var pixelIndex;
        pixelIndex = x + y * bounds.width;
        return pixelFlags[pixelIndex * 3 + 1] = 1;
      };
      pixelVisited = (x, y) => {
        var pixelIndex;
        pixelIndex = x + y * bounds.width;
        return pixelFlags[pixelIndex * 3 + 1];
      };
      markPixelInterior = (x, y) => {
        var pixelIndex;
        pixelIndex = x + y * bounds.width;
        return pixelFlags[pixelIndex * 3 + 2] = 1;
      };
      pixelInInterior = (x, y) => {
        var pixelIndex;
        pixelIndex = x + y * bounds.width;
        return pixelFlags[pixelIndex * 3 + 2];
      };

      // See which pixels have been covered in the allowed area.
      for (x = n = 0, ref7 = bounds.width; 0 <= ref7 ? n < ref7 : n > ref7; x = 0 <= ref7 ? ++n : --n) {
        for (y = o = 0, ref8 = bounds.height; 0 <= ref8 ? o < ref8 : o > ref8; y = 0 <= ref8 ? ++o : --o) {
          if (!(pixelAlpha = this._getPixelAlpha(x, y))) {
            continue;
          }
          // Tolerance of 0 requires all required area to be drawn (at least in the vicinity for anti-aliased pixel).
          // Higher tolerances don't have this requirement to allow for own interpretation, but still require pixels in
          // fully-filled areas (above minimum alpha for required pixels).
          if (!(this.pathStep.options.tolerance && pixelAlpha < this.constructor.minimumRequiredPixelAlpha)) {
            found = false;

            // Allow anti-aliased pixels to be covered from immediate neighbors.
            maxOffset = pixelAlpha >= this.constructor.minimumRequiredPixelAlpha ? 0 : 1;
            for (dx = p = ref9 = -maxOffset, ref10 = maxOffset; ref9 <= ref10 ? p <= ref10 : p >= ref10; dx = ref9 <= ref10 ? ++p : --p) {
              for (dy = q = ref11 = -maxOffset, ref12 = maxOffset; ref11 <= ref12 ? q <= ref12 : q >= ref12; dy = ref11 <= ref12 ? ++q : --q) {
                relativeX = x + dx;
                relativeY = y + dy;
                absoluteX = bounds.x + relativeX;
                absoluteY = bounds.y + relativeY;
                if (this.hasPixel(relativeX, relativeY) && (pixel = bitmapLayer.getPixel(absoluteX, absoluteY))) {
                  if (pixelMatchesColorOrOtherPathCompletesIt(pixel, relativeX, relativeY)) {
                    found = true;
                    break;
                  }
                }
              }
              if (found) {
                break;
              }
            }
            if (!found) {
              return false;
            }
          }
          absoluteX = bounds.x + x;
          absoluteY = bounds.y + y;
          if (bitmapLayer.getPixel(absoluteX, absoluteY)) {
            coverPixel(x, y);
          }
        }
      }

      // Make sure all covered pixels of parts are connected together.
      visitPixels = (originX, originY) => {
        var fringe, neighborDx, neighborDy, neighborX, neighborY, r, s;
        // Visit all the pixels from this pixel.
        fringe = [{
          x: originX,
          y: originY
        }];

        // Mark that we've visited the origin.
        visitPixel(originX, originY);
        while (fringe.length) {
          pixel = fringe.pop();
          if (!pixelCovered(pixel.x, pixel.y)) {
            // Continue if this pixel wasn't covered.
            continue;
          }

          // Visit all neighbors.
          for (neighborDx = r = -1; r <= 1; neighborDx = ++r) {
            for (neighborDy = s = -1; s <= 1; neighborDy = ++s) {
              if (neighborDx === 0 && neighborDy === 0) {
                continue;
              }
              neighborX = pixel.x + neighborDx;
              neighborY = pixel.y + neighborDy;
              if (pixelVisited(neighborX, neighborY)) {
                // Continue if we've already visited this pixel.
                continue;
              }
              if (!this.hasPixel(neighborX, neighborY)) {
                // Make sure there is a neighbor here.
                continue;
              }
              fringe.push({
                x: neighborX,
                y: neighborY
              });

              // Mark that we've visited this pixel.
              visitPixel(neighborX, neighborY);
            }
          }
        }
      };
      ref13 = this.cornersOfParts;

      // Prevent collection of results from the loops.
      for (r = 0, len2 = ref13.length; r < len2; r++) {
        cornersForPart = ref13[r];
        ref14 = cornersForPart[0].foundCoveredPixelPositions;
        // Visit pixels from the initial corners.
        for (s = 0, len3 = ref14.length; s < len3; s++) {
          position = ref14[s];
          visitPixels(position.x, position.y);
        }
        for (t = 0, len4 = cornersForPart.length; t < len4; t++) {
          corner = cornersForPart[t];
          // Find at least one of the positions that is covered.
          found = false;
          ref15 = corner.foundCoveredPixelPositions;
          for (u = 0, len5 = ref15.length; u < len5; u++) {
            position = ref15[u];
            if (pixelVisited(position.x, position.y)) {
              found = true;
              break;
            }
          }
          if (!found) {
            return false;
          }
        }
      }

      // Simple, closed, un-filled lines require that if there is a hole in the concavity of the path, it is fully enclosed.
      if (this._interiorImageData) {
        for (x = v = ref16 = this.pathBounds.left, ref17 = this.pathBounds.right; ref16 <= ref17 ? v <= ref17 : v >= ref17; x = ref16 <= ref17 ? ++v : --v) {
          for (y = w = ref18 = this.pathBounds.top, ref19 = this.pathBounds.bottom; ref18 <= ref19 ? w <= ref19 : w >= ref19; y = ref18 <= ref19 ? ++w : --w) {
            interiorIndex = (x + y * this._interiorImageData.width) * 4 + 3;
            if (this._interiorImageData.data[interiorIndex] && !pixelInInterior(x, y)) {
              // We found a pixel that should be in the interior but isn't marked as such yet.
              // Flood-fill from this position and make sure we don't reach the edge of the bounds.
              markPixelInterior(x, y);
              fringe = [{
                x,
                y
              }];
              while (fringe.length) {
                pixel = fringe.pop();
                if (pixel.x < this.pathBounds.left || pixel.x > this.pathBounds.right || pixel.y < this.pathBounds.top || pixel.y > this.pathBounds.bottom) {
                  // The path is not closed if we've reached the border.
                  return false;
                }
                if (bitmapLayer.getPixel(bounds.x + pixel.x, bounds.y + pixel.y)) {
                  // Continue if this pixel was drawn.
                  continue;
                }

                // Visit all 4 direct neighbors.
                for (neighborDx = z = -1; z <= 1; neighborDx = ++z) {
                  for (neighborDy = i1 = -1; i1 <= 1; neighborDy = ++i1) {
                    if (neighborDx === 0 === (neighborDy === 0)) {
                      continue;
                    }
                    neighborX = pixel.x + neighborDx;
                    neighborY = pixel.y + neighborDy;
                    if (pixelInInterior(neighborX, neighborY)) {
                      // Continue if we've already marked this pixel as interior.
                      continue;
                    }
                    fringe.push({
                      x: neighborX,
                      y: neighborY
                    });

                    // Mark that this pixel is in the interior.
                    markPixelInterior(neighborX, neighborY);
                  }
                }
              }
            }
          }
        }
      }
      this._completed = true;
      return this._completed;
    }
    _hintVisible(renderOptions) {
      var visibleBoundsBottom, visibleBoundsHeight, visibleBoundsLeft, visibleBoundsRight, visibleBoundsTop, visibleBoundsWidth;
      // Determine if the path is even visible on the canvas.
      visibleBoundsLeft = Math.floor(Math.max(renderOptions.camera.viewportCanvasBounds.left(), this.pathBounds.left + this.pathStep.stepArea.bounds.x));
      visibleBoundsRight = Math.ceil(Math.min(renderOptions.camera.viewportCanvasBounds.right(), this.pathBounds.right + this.pathStep.stepArea.bounds.x));
      visibleBoundsTop = Math.floor(Math.max(renderOptions.camera.viewportCanvasBounds.top(), this.pathBounds.top + this.pathStep.stepArea.bounds.y));
      visibleBoundsBottom = Math.ceil(Math.min(renderOptions.camera.viewportCanvasBounds.bottom(), this.pathBounds.bottom + this.pathStep.stepArea.bounds.y));
      visibleBoundsWidth = visibleBoundsRight - visibleBoundsLeft + 1;
      visibleBoundsHeight = visibleBoundsBottom - visibleBoundsTop + 1;
      if (!(visibleBoundsWidth >= 0 && visibleBoundsHeight >= 0)) {
        // Note: We have to allow 0 width and height for vertical and horizontal lines at integer positions.
        return false;
      }
      return {
        visibleBoundsLeft,
        visibleBoundsRight,
        visibleBoundsTop,
        visibleBoundsBottom,
        visibleBoundsWidth,
        visibleBoundsHeight
      };
    }
    _getHintPathOpacity(renderOptions) {
      // Completed lines draw much fainter if we're not supposed to draw hints after completion.
      if (this._completed && !this.pathStep.options.drawHintsAfterCompleted) {
        return Math.min(0.25, renderOptions.camera.scale() / 32);
      } else {
        return Math.min(1, renderOptions.camera.scale() / 4);
      }
    }
    drawStrokeHint(context, renderOptions, strokeWidth) {
      var halfPixelSize, offset, pathOpacity, pixelSize;
      if (this.pathStep.options.strokeStyle === TutorialBitmap.PathStep.StrokeStyles.None) {
        return;
      }
      if (!this.strokeColor) {
        return;
      }
      if (!this._hintVisible(renderOptions)) {
        return;
      }
      pixelSize = 1 / renderOptions.camera.effectiveScale();
      halfPixelSize = pixelSize / 2;
      context.save();
      context.lineWidth = pixelSize * strokeWidth;
      pathOpacity = this._getHintPathOpacity(renderOptions);
      context.strokeStyle = "rgb(".concat(this.strokeColor.r * 255, " ").concat(this.strokeColor.g * 255, " ").concat(this.strokeColor.b * 255, " / ").concat(pathOpacity, ")");
      if (strokeWidth % 2) {
        context.translate(halfPixelSize, halfPixelSize);
      }
      context.stroke(this.path);

      // Draw a double outline for closed paths when debugging.
      if (TutorialBitmap.PathStep.debug && this.closed) {
        offset = 2 * strokeWidth * pixelSize;
        context.translate(offset, offset);
        context.stroke(this.path);
      }
      return context.restore();
    }
    drawFillHint(context, renderOptions) {
      var halfPixelSize, i, pathOpacity, pixelSize, ref, ref1, ref2, spacing, visibleBoundsHeight, visibleBoundsLeft, visibleBoundsRight, visibleBoundsTop, x;
      if (!this.fillColor) {
        return;
      }
      if (!({
        visibleBoundsLeft,
        visibleBoundsRight,
        visibleBoundsTop,
        visibleBoundsHeight
      } = this._hintVisible(renderOptions))) {
        return;
      }
      // Visible bounds are in absolute canvas space, but we're drawing in relative step area, so we need to adjust.
      visibleBoundsLeft -= this.pathStep.stepArea.bounds.x;
      visibleBoundsRight -= this.pathStep.stepArea.bounds.x;
      visibleBoundsTop -= this.pathStep.stepArea.bounds.y;
      context.save();
      pixelSize = 1 / renderOptions.camera.effectiveScale();
      halfPixelSize = pixelSize / 2;
      context.translate(halfPixelSize, halfPixelSize);
      pathOpacity = this._getHintPathOpacity(renderOptions);
      switch (this.pathStep.options.fillStyle) {
        case TutorialBitmap.PathStep.FillStyles.Solid:
          context.fillStyle = "rgb(".concat(this.fillColor.r * 255, " ").concat(this.fillColor.g * 255, " ").concat(this.fillColor.b * 255, ")");
          context.fill(this.path);
          break;
        case TutorialBitmap.PathStep.FillStyles.Dashed:
          context.clip(this.path);
          context.beginPath();
          spacing = Math.max(5 * pixelSize, 1 / 3);

          // Round spacing to a simple fraction.
          if (spacing > 1) {
            spacing = Math.round(spacing);
          } else {
            spacing = 1 / Math.round(1 / spacing);
          }
          for (x = i = ref = visibleBoundsLeft - visibleBoundsHeight, ref1 = visibleBoundsRight, ref2 = spacing; ref2 !== 0 && (ref2 > 0 ? i < ref1 : i > ref1); x = i += ref2) {
            context.moveTo(x, visibleBoundsTop);
            context.lineTo(x + visibleBoundsHeight, visibleBoundsTop + visibleBoundsHeight);
          }
          context.lineWidth = pixelSize;
          pathOpacity = this._getHintPathOpacity(renderOptions);
          context.strokeStyle = "rgb(".concat(this.fillColor.r * 255, " ").concat(this.fillColor.g * 255, " ").concat(this.fillColor.b * 255, " / ").concat(pathOpacity, ")");
          context.stroke();
      }
      return context.restore();
    }
  }
  ;
  Path.minimumAntiAliasingAlpha = 10;

  // Note: this value was chosen so that the minimum complete closed line will get colored to solve this step.
  Path.minimumSolutionPixelAlpha = 110;
  Path.minimumColorHintPixelAlpha = 128;
  Path.minimumRequiredPixelAlpha = 250;
  return Path;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},"software":{"software.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/software/software.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Practice.Software = class Software {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"tools.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/software/tools.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Practice.Software.Tools = function () {
  class Tools {}
  ;
  Tools.ToolKeys = {
    Pencil: 'Pencil',
    Brush: 'Brush',
    Eraser: 'Eraser',
    ColorFill: 'ColorFill',
    ColorPicker: 'ColorPicker',
    ColorSwatches: 'ColorSwatches',
    ClearColor: 'ClearColor',
    MoveCanvas: 'MoveCanvas',
    Zoom: 'Zoom',
    References: 'References',
    Undo: 'Undo',
    Redo: 'Redo',
    Line: 'Line',
    Rectangle: 'Rectangle',
    Ellipse: 'Ellipse'
  };
  return Tools;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"artworks":{"artworks.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/artworks/artworks.coffee                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, LOI, PAA, PADB;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PADB = PixelArtDatabase;
PAA.Practice.Artworks = function () {
  class Artworks {
    static id() {
      return 'PixelArtAcademy.Practice.Artworks';
    }
    static insert(artworkInfo) {
      var artist, artworkData, bitmapData, bitmapId, creationTime, profileId, ref;
      // Create the bitmap asset.
      creationTime = new Date();
      profileId = LOI.adventure.profileId();
      bitmapData = {
        versioned: true,
        profileId: profileId,
        creationTime: creationTime,
        lastEditTime: creationTime
      };
      if (artworkInfo.size) {
        bitmapData.bounds = {
          fixed: true,
          left: 0,
          top: 0,
          right: artworkInfo.size.width - 1,
          bottom: artworkInfo.size.height - 1
        };
      }
      if (artworkInfo.paletteId) {
        bitmapData.palette = {
          _id: artworkInfo.paletteId
        };
      }
      if (artworkInfo.properties) {
        bitmapData.properties = artworkInfo.properties;
      }
      bitmapData.pixelFormat = new LOI.Assets.Bitmap.PixelFormat('flags');
      bitmapData.pixelFormat.addAttribute(artworkInfo.paletteId ? 'paletteColor' : 'directColor');
      if (!artworkInfo.paletteId) {
        bitmapData.pixelFormat.addAttribute('alpha');
      }
      if ((ref = artworkInfo.properties) != null ? ref.normals : void 0) {
        bitmapData.pixelFormat.addAttribute('normal');
      }

      // Insert the document.
      bitmapId = LOI.Assets.Bitmap.documents.insert(bitmapData);

      // Create the artist if needed.
      artist = PADB.Artist.documents.findOne({
        profileId
      });
      if (!artist) {
        artist = PADB.Artist.create({
          profileId: profileId,
          lastEditTime: creationTime
        });
      }

      // Create the artwork.
      artworkData = {
        profileId: profileId,
        lastEditTime: creationTime,
        type: PADB.Artwork.Types.Image,
        title: artworkInfo.title,
        startDate: creationTime,
        wip: true,
        authors: [{
          _id: artist._id
        }],
        image: {
          url: "".concat(LOI.Assets.Bitmap.imageUrl(), "?id=").concat(bitmapId)
        },
        representations: [{
          url: "".concat(LOI.Assets.Bitmap.documentUrl(), "?id=").concat(bitmapId),
          type: PADB.Artwork.RepresentationTypes.Document
        }]
      };

      // Create the artwork and return the artwork.
      return PADB.Artwork.create(artworkData);
    }
    static remove(artwork) {
      var bitmapId;
      // Remove the bitmap.
      bitmapId = artwork.image.url.split('id=')[1];
      LOI.Assets.Bitmap.documents.remove(bitmapId);

      // Remove the artwork.
      return PADB.Artwork.documents.remove(artwork._id);
    }
  }
  ;
  Artworks.maxSize = 4096;
  return Artworks;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"pixelartevaluation":{"pixelartevaluation.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/pixelartevaluation.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
PAA.Practice.PixelArtEvaluation = function () {
  class PixelArtEvaluation {
    static nextId() {
      this._lastId++;
      return this._lastId;
    }
    static getLetterGrade(score) {
      let plusMinus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var letterBracket, letterGrade, scoreOutOf10, scoreRemainderOutOf100;
      scoreOutOf10 = score * 10;
      letterBracket = Math.min(9, Math.floor(scoreOutOf10));
      if (letterBracket < 6) {
        letterBracket = 4;
      }
      letterGrade = String.fromCharCode(65 + 9 - letterBracket);
      if (plusMinus && letterBracket > 4) {
        scoreRemainderOutOf100 = Math.round((scoreOutOf10 - letterBracket) * 10);
        if (scoreRemainderOutOf100 < 3) {
          letterGrade += '-';
        }
        if (scoreRemainderOutOf100 >= 7) {
          letterGrade += '+';
        }
      }
      return letterGrade;
    }
    static _getEvaluationOptions(pixelArtEvaluationProperty) {
      var options;
      options = {
        pixelPerfectLines: {
          doubles: {
            countAllLineWidthTypes: false,
            countPointsWithMultiplePixels: false
          },
          corners: {
            ignoreStraightLineCorners: true
          }
        },
        smoothCurves: {
          ignoreMostlyStraightLines: true
        }
      };
      return _.overrideDeep(options, pixelArtEvaluationProperty);
    }
    constructor(bitmap) {
      let options1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.bitmap = bitmap;
      this.options = options1;
      this.layers = [];
      this._evaluationDependency = new Tracker.Dependency();
      // Initialize by updating the full area of the bitmap.
      Tracker.nonreactive(() => {
        var i, layerIndex, ref, results;
        results = [];
        for (layerIndex = i = 0, ref = this.bitmap.layers.length; 0 <= ref ? i < ref : i > ref; layerIndex = 0 <= ref ? ++i : --i) {
          results.push(this._updateArea(layerIndex));
        }
        return results;
      });

      // Subscribe to changes.
      if (this.options.partialUpdates) {
        LOI.Assets.Bitmap.versionedDocuments.operationExecuted.addHandler(this, this.onOperationExecuted);
      } else {
        LOI.Assets.Bitmap.versionedDocuments.operationsExecuted.addHandler(this, this.onOperationsExecuted);
      }
    }
    destroy() {
      if (this.options.partialUpdates) {
        return LOI.Assets.Bitmap.versionedDocuments.operationExecuted.removeHandler(this, this.onOperationsExecuted);
      } else {
        return LOI.Assets.Bitmap.versionedDocuments.operationsExecuted.removeHandler(this, this.onOperationsExecuted);
      }
    }
    depend() {
      return this._evaluationDependency.depend();
    }
    getLinesAt(x, y) {
      var layer, lines;
      lines = function () {
        var i, len, ref, results;
        ref = this.layers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          layer = ref[i];
          results.push(layer.getLinesAt(x, y));
        }
        return results;
      }.call(this);
      return _.flatten(lines);
    }
    getLinesBetween() {
      for (var _len = arguments.length, points = new Array(_len), _key = 0; _key < _len; _key++) {
        points[_key] = arguments[_key];
      }
      var layer, lines;
      lines = function () {
        var i, len, ref, results;
        ref = this.layers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          layer = ref[i];
          results.push(layer.getLinesBetween(...points));
        }
        return results;
      }.call(this);
      return _.flatten(lines);
    }
    getLinePartsAt(x, y) {
      var layer, lineParts;
      lineParts = function () {
        var i, len, ref, results;
        ref = this.layers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          layer = ref[i];
          results.push(layer.getLinePartsAt(x, y));
        }
        return results;
      }.call(this);
      return _.flatten(lineParts);
    }
    getLinePartsBetween() {
      for (var _len2 = arguments.length, points = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        points[_key2] = arguments[_key2];
      }
      var layer, lineParts;
      lineParts = function () {
        var i, len, ref, results;
        ref = this.layers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          layer = ref[i];
          results.push(layer.getLinePartsBetween(...points));
        }
        return results;
      }.call(this);
      return _.flatten(lineParts);
    }
    getPointsAt(x, y) {
      var i, layer, len, pixel, point, points, ref;
      points = [];
      ref = this.layers;
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        if (pixel = layer.getPixel(x, y)) {
          if (point = layer.getPointOn(pixel)) {
            points.push(point);
          }
        }
      }
      return points;
    }
    _updateArea(layerIndex, bounds) {
      if (this.layers[layerIndex]) {
        // Update just the desired bounds.
        this.layers[layerIndex].updateArea(bounds);
      } else {
        // Create and update the whole layer when it's added.
        this.layers[layerIndex] = new this.constructor.Layer(this, [layerIndex]);
        this.layers[layerIndex].updateArea();
      }
      this._evaluation = {};
      return this._evaluationDependency.changed();
    }
    evaluate(pixelArtEvaluationProperty) {
      var category, criteriaCount, curveSmoothness, doubles, evaluation, finalScore, i, j, k, l, largestTypeCount, layer, len, len1, len2, len3, len4, len5, len6, len7, len8, len9, line, lineEvaluation, linePart, linePartCount, linePartEvaluation, m, n, o, outlinesCount, p, pixel, q, r, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, subcriterion, subcriterionProperty, totalWeight, weight, widthType;
      this._evaluationDependency.depend();
      evaluation = {};
      finalScore = 0;
      criteriaCount = 0;
      if (pixelArtEvaluationProperty.pixelPerfectLines) {
        // Compute evaluation if needed.
        if (!this._evaluation.pixelPerfectLines) {
          this._evaluation.pixelPerfectLines = {
            doubles: {
              score: 0,
              count: 0
            },
            corners: {
              score: 0,
              count: 0
            }
          };

          // Compute average score, weighted by line length.
          totalWeight = 0;
          doubles = [];
          ref = this.layers;
          for (i = 0, len = ref.length; i < len; i++) {
            layer = ref[i];
            ref1 = layer.lines;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              line = ref1[j];
              lineEvaluation = line.evaluate(pixelArtEvaluationProperty);
              ref2 = lineEvaluation.doubles.pixels;

              // We collect doubles separately so we can count them all at once to avoid them accounted multiple times.
              for (k = 0, len2 = ref2.length; k < len2; k++) {
                pixel = ref2[k];
                if (indexOf.call(doubles, pixel) < 0) {
                  doubles.push(pixel);
                }
              }

              // We use the square root of the length so that long lines can't hugely overtake the short ones.
              weight = Math.sqrt(line.points.length);
              totalWeight += weight;
              for (subcriterion in this.constructor.Subcriteria.PixelPerfectLines) {
                subcriterionProperty = _.lowerFirst(subcriterion);
                this._evaluation.pixelPerfectLines[subcriterionProperty].score += lineEvaluation[subcriterionProperty].score * weight;
                this._evaluation.pixelPerfectLines[subcriterionProperty].count += lineEvaluation[subcriterionProperty].count;
              }
            }
          }
          this._evaluation.pixelPerfectLines.doubles.count = doubles.length;
          for (subcriterion in this.constructor.Subcriteria.PixelPerfectLines) {
            subcriterionProperty = _.lowerFirst(subcriterion);
            if (totalWeight) {
              this._evaluation.pixelPerfectLines[subcriterionProperty].score /= totalWeight;
            } else {
              // There were no lines to be evaluated, so the category doesn't have a meaning.
              this._evaluation.pixelPerfectLines[subcriterionProperty].score = null;
            }
          }
        }
        evaluation.pixelPerfectLines = this._calculateWeightedEvaluation(this.constructor.Subcriteria.PixelPerfectLines, this.constructor.SubcriteriaWeights.PixelPerfectLines, pixelArtEvaluationProperty.pixelPerfectLines, this._evaluation.pixelPerfectLines);
        if (evaluation.pixelPerfectLines.score != null) {
          finalScore += evaluation.pixelPerfectLines.score;
          criteriaCount++;
        }
      }
      if (pixelArtEvaluationProperty.evenDiagonals) {
        // Compute evaluation if needed.
        if (!this._evaluation.evenDiagonals) {
          this._evaluation.evenDiagonals = {
            segmentLengths: {
              score: 0,
              counts: {
                even: 0,
                alternating: 0,
                broken: 0
              }
            },
            endSegments: {
              score: 0,
              counts: {
                matching: 0,
                shorter: 0
              }
            }
          };
          totalWeight = 0;
          ref3 = this.layers;
          for (l = 0, len3 = ref3.length; l < len3; l++) {
            layer = ref3[l];
            ref4 = layer.lines;
            for (m = 0, len4 = ref4.length; m < len4; m++) {
              line = ref4[m];
              ref5 = line.parts;
              for (n = 0, len5 = ref5.length; n < len5; n++) {
                linePart = ref5[n];
                if (!(linePart instanceof this.constructor.Line.Part.StraightLine)) {
                  continue;
                }
                // Count only diagonals.
                linePartEvaluation = linePart.evaluate();
                if (linePartEvaluation.type === this.constructor.Line.Part.StraightLine.Type.AxisAligned) {
                  continue;
                }
                weight = Math.sqrt(linePart.points.length);
                totalWeight += weight;
                for (subcriterion in this.constructor.Subcriteria.EvenDiagonals) {
                  subcriterionProperty = _.lowerFirst(subcriterion);
                  this._evaluation.evenDiagonals[subcriterionProperty].score += linePartEvaluation[subcriterionProperty].score * weight;
                  this._evaluation.evenDiagonals[subcriterionProperty].counts[_.lowerFirst(linePartEvaluation[subcriterionProperty].type)]++;
                }
              }
            }
          }
          for (subcriterion in this.constructor.Subcriteria.EvenDiagonals) {
            subcriterionProperty = _.lowerFirst(subcriterion);
            if (totalWeight) {
              this._evaluation.evenDiagonals[subcriterionProperty].score /= totalWeight;
            } else {
              // There were no lines to be evaluated, so the category doesn't have a meaning.
              this._evaluation.evenDiagonals[subcriterionProperty].score = null;
            }
          }
        }
        evaluation.evenDiagonals = this._calculateWeightedEvaluation(this.constructor.Subcriteria.EvenDiagonals, this.constructor.SubcriteriaWeights.EvenDiagonals, pixelArtEvaluationProperty.evenDiagonals, this._evaluation.evenDiagonals);
        if (evaluation.evenDiagonals.score != null) {
          finalScore += evaluation.evenDiagonals.score;
          criteriaCount++;
        }
      }
      if (pixelArtEvaluationProperty.smoothCurves) {
        // Compute evaluation if needed.
        if (!this._evaluation.smoothCurves) {
          this._evaluation.smoothCurves = {
            abruptSegmentLengthChanges: {
              score: 0,
              counts: {
                minor: 0,
                major: 0
              }
            },
            straightParts: {
              score: 0,
              counts: {
                middle: 0,
                end: 0
              }
            },
            inflectionPoints: {
              score: 0,
              counts: {
                isolated: 0,
                sparse: 0,
                dense: 0
              }
            }
          };

          // Compute average score, weighted by line length.
          totalWeight = 0;
          ref6 = this.layers;
          for (o = 0, len6 = ref6.length; o < len6; o++) {
            layer = ref6[o];
            ref7 = layer.lines;
            for (p = 0, len7 = ref7.length; p < len7; p++) {
              line = ref7[p];
              lineEvaluation = line.evaluate(pixelArtEvaluationProperty);
              if (!lineEvaluation.curveSmoothness) {
                continue;
              }

              // We use the square root of the length so that long lines can't hugely overtake the short ones.
              weight = Math.sqrt(line.points.length);
              totalWeight += weight;
              for (subcriterion in this.constructor.Subcriteria.SmoothCurves) {
                subcriterionProperty = _.lowerFirst(subcriterion);
                curveSmoothness = lineEvaluation.curveSmoothness[subcriterionProperty];
                this._evaluation.smoothCurves[subcriterionProperty].score += curveSmoothness.score * weight;
                ref8 = curveSmoothness.counts;
                for (category in ref8) {
                  linePartCount = ref8[category];
                  this._evaluation.smoothCurves[subcriterionProperty].counts[category] += linePartCount;
                }
              }
            }
          }
          for (subcriterion in this.constructor.Subcriteria.SmoothCurves) {
            subcriterionProperty = _.lowerFirst(subcriterion);
            if (totalWeight) {
              this._evaluation.smoothCurves[subcriterionProperty].score /= totalWeight;
            } else {
              // There were no curves to be evaluated, so the category doesn't have a meaning.
              this._evaluation.smoothCurves[subcriterionProperty].score = null;
            }
          }
        }
        evaluation.smoothCurves = this._calculateWeightedEvaluation(this.constructor.Subcriteria.SmoothCurves, this.constructor.SubcriteriaWeights.SmoothCurves, pixelArtEvaluationProperty.smoothCurves, this._evaluation.smoothCurves);
        if (evaluation.smoothCurves.score != null) {
          finalScore += evaluation.smoothCurves.score;
          criteriaCount++;
        }
      }
      if (pixelArtEvaluationProperty.consistentLineWidth) {
        // Compute evaluation if needed.
        if (!this._evaluation.consistentLineWidth) {
          this._evaluation.consistentLineWidth = {
            individualConsistency: {
              score: 0,
              counts: {
                consistent: 0,
                varying: 0
              }
            },
            globalConsistency: {
              counts: {
                thin: 0,
                thick: 0,
                wide: 0,
                varying: 0
              }
            }
          };
          totalWeight = 0;
          outlinesCount = 0;
          ref9 = this.layers;
          for (q = 0, len8 = ref9.length; q < len8; q++) {
            layer = ref9[q];
            ref10 = layer.lines;
            for (r = 0, len9 = ref10.length; r < len9; r++) {
              line = ref10[r];
              lineEvaluation = line.evaluate(pixelArtEvaluationProperty);
              widthType = lineEvaluation.width.type;
              weight = Math.sqrt(line.points.length);
              totalWeight += weight;
              this._evaluation.consistentLineWidth.individualConsistency.score += lineEvaluation.width.score * weight;
              this._evaluation.consistentLineWidth.individualConsistency.counts[widthType === this.constructor.Line.WidthType.Varying ? 'varying' : 'consistent']++;
              if (widthType === this.constructor.Line.WidthType.Outline) {
                outlinesCount++;
              } else {
                this._evaluation.consistentLineWidth.globalConsistency.counts[_.lowerFirst(lineEvaluation.width.type)]++;
              }
            }
          }
          if (totalWeight) {
            this._evaluation.consistentLineWidth.individualConsistency.score /= totalWeight;

            // Calculate global consistency score by using the share the most common type has.
            largestTypeCount = _.max(_.values(this._evaluation.consistentLineWidth.globalConsistency.counts));
            if (largestTypeCount) {
              this._evaluation.consistentLineWidth.globalConsistency.score = largestTypeCount / (layer.lines.length - outlinesCount);
            } else {
              this._evaluation.consistentLineWidth.globalConsistency.score = 1;
            }
          } else {
            // There were no lines to be evaluated, so the category doesn't have a meaning.
            this._evaluation.consistentLineWidth.individualConsistency.score = null;
            this._evaluation.consistentLineWidth.globalConsistency.score = null;
          }
        }
        evaluation.consistentLineWidth = this._calculateMaximumEvaluation(this.constructor.Subcriteria.ConsistentLineWidth, pixelArtEvaluationProperty.consistentLineWidth, this._evaluation.consistentLineWidth);
        if (evaluation.consistentLineWidth.score != null) {
          finalScore += evaluation.consistentLineWidth.score;
          criteriaCount++;
        }
      }
      if (criteriaCount) {
        finalScore /= criteriaCount;
      }
      evaluation.score = criteriaCount ? finalScore : null;
      return evaluation;
    }
    _calculateWeightedEvaluation(subcriteria, subcriteriaWeights, enabledProperties, evaluation) {
      var i, len, subcriteriaInfo, subcriterion, subcriterionInfo, subcriterionProperty, totalWeight, weight, weightedEvaluation;
      weightedEvaluation = {
        score: 0
      };

      // Choose only enabled subcriteria.
      totalWeight = 0;
      subcriteriaInfo = function () {
        var results;
        results = [];
        for (subcriterion in subcriteria) {
          subcriterionProperty = _.lowerFirst(subcriterion);
          if (!enabledProperties[subcriterionProperty]) {
            continue;
          }
          weight = evaluation[subcriterionProperty].score != null ? subcriteriaWeights[subcriterion] : 0;
          totalWeight += weight;
          results.push({
            property: subcriterionProperty,
            score: evaluation[subcriterionProperty].score || 0,
            weight: weight
          });
        }
        return results;
      }();
      for (i = 0, len = subcriteriaInfo.length; i < len; i++) {
        subcriterionInfo = subcriteriaInfo[i];
        weightedEvaluation[subcriterionInfo.property] = evaluation[subcriterionInfo.property];
        if (totalWeight) {
          weightedEvaluation.score += subcriterionInfo.score * subcriterionInfo.weight / totalWeight;
        }
      }
      if (!totalWeight) {
        weightedEvaluation.score = null;
      }
      return weightedEvaluation;
    }
    _calculateMaximumEvaluation(subcriteria, enabledProperties, evaluation) {
      var maximumEvaluation, scoreSet, subcriterion, subcriterionProperty;
      maximumEvaluation = {
        score: 0
      };
      scoreSet = false;

      // Choose only enabled subcriteria.
      for (subcriterion in subcriteria) {
        subcriterionProperty = _.lowerFirst(subcriterion);
        if (!enabledProperties[subcriterionProperty]) {
          continue;
        }
        maximumEvaluation[subcriterionProperty] = evaluation[subcriterionProperty];
        if (evaluation[subcriterionProperty].score) {
          maximumEvaluation.score = Math.max(maximumEvaluation.score, evaluation[subcriterionProperty].score);
          scoreSet = true;
        }
      }
      if (!scoreSet) {
        maximumEvaluation.score = null;
      }
      return maximumEvaluation;
    }
    onOperationExecuted(document, operation, changedFields) {
      if (document._id !== this.bitmap._id) {
        return;
      }
      if (!(operation instanceof LOI.Assets.Bitmap.Operations.ChangePixels)) {
        return;
      }
      return this._updateArea(operation.layerAddress[0], operation.bounds);
    }
    onOperationsExecuted(document, operations, changedFields) {
      var i, len, operation, results;
      if (document._id !== this.bitmap._id) {
        return;
      }
      results = [];
      for (i = 0, len = operations.length; i < len; i++) {
        operation = operations[i];
        if (operation instanceof LOI.Assets.Bitmap.Operations.ChangePixels) {
          results.push(this._updateArea(operation.layerAddress[0], operation.bounds));
        }
      }
      return results;
    }
  }
  ;

  // score: float between 0 and 1 for the final average score
  // pixelPerfectLines:
  //   score: float between 0 and 1 with this criterion evaluation
  //   doubles:
  //     score: float between 0 and 1 with this criterion evaluation
  //     count: how many pixels lie on axis-aligned side-steps or wide lines
  //     countAllLineWidthTypes: boolean whether doubles should be counted on all line width types, false by default
  //     countPointsWithMultiplePixels: boolean whether multi-pixel lines count as doubles, false by default
  //   corners:
  //     score: float between 0 and 1 with this criterion evaluation
  //     count: how many pixels have two or more direct neighbors
  //     ignoreStraightLineCorners: boolean whether to filter out corners appearing at edges of straight line parts, true by default
  // evenDiagonals
  //   score: float between 0 and 1 with this criterion's weighted average
  //   segmentLengths:
  //     score: float between 0 and 1 with this criterion evaluation
  //     counts: object with counts of line parts with a certain segment lengths type
  //       even, alternating, broken: how many line parts has this type
  //   endSegments:
  //     score: float between 0 and 1 with this criterion evaluation
  //     counts: object with counts of line parts with a certain end segments type
  //       matching, shorter: how many line parts has this type
  // smoothCurves: objects with different criteria evaluations
  //   score: float between 0 and 1 with this criterion evaluation
  //   ignoreMostlyStraightLines: boolean whether to filter out lines that have more straight than curved parts, true by default
  //   abruptSegmentLengthChanges:
  //     score: float between 0 and 1 with this criterion evaluation
  //     counts: object with counts of how many segment length changes are abrupt for each severity
  //       minor, major: how many segment length changes of this severity there are
  //   straightParts:
  //     score: float between 0 and 1 with this criterion evaluation
  //     counts: object with counts of line parts with a certain positioning in the curve
  //       middle, end: how many line parts of this type there are
  //   inflectionPoints:
  //     score: float between 0 and 1 with this criterion evaluation
  //     counts: object with counts of how many inflection points appear on curves
  //       isolated, sparse, dense: how many inflection points of this type there are
  // consistentLineWidth:
  //   score: float between 0 and 1 with this criterion evaluation
  //   individualConsistency: float between 0 and 1 telling how much lines have the same width within themselves
  //     score: float between 0 and 1 with this criterion evaluation
  //     counts: object with counts of how many lines have this width consistency
  //       consistent, varied: how many lines of this severity there are
  //   globalConsistency: float between 0 and 1 telling how much line types are consistent in the image
  //     score: float between 0 and 1 with this criterion evaluation
  //     counts: object with counts of lines with a certain width type
  //       thin, thick, wide, varied: how many lines have this type of line width
  PixelArtEvaluation.Criteria = {
    PixelPerfectLines: 'PixelPerfectLines',
    EvenDiagonals: 'EvenDiagonals',
    SmoothCurves: 'SmoothCurves',
    ConsistentLineWidth: 'ConsistentLineWidth'
  };
  PixelArtEvaluation.Subcriteria = {
    PixelPerfectLines: {
      Doubles: 'Doubles',
      Corners: 'Corners'
    },
    EvenDiagonals: {
      SegmentLengths: 'SegmentLengths',
      EndSegments: 'EndSegments'
    },
    SmoothCurves: {
      AbruptSegmentLengthChanges: 'AbruptSegmentLengthChanges',
      StraightParts: 'StraightParts',
      InflectionPoints: 'InflectionPoints'
    },
    ConsistentLineWidth: {
      IndividualConsistency: 'IndividualConsistency',
      GlobalConsistency: 'GlobalConsistency'
    }
  };
  PixelArtEvaluation.SubcriteriaWeights = {
    PixelPerfectLines: {
      Doubles: 0.75,
      Corners: 0.25
    },
    EvenDiagonals: {
      SegmentLengths: 0.75,
      EndSegments: 0.25
    },
    SmoothCurves: {
      AbruptSegmentLengthChanges: 0.34,
      StraightParts: 0.33,
      InflectionPoints: 0.33
    }
  };
  PixelArtEvaluation._lastId = 0;
  return PixelArtEvaluation;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/layer.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA,
  PAE,
  indexOf = [].indexOf;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Layer = class Layer {
  constructor(pixelArtEvaluation, layerAddress) {
    this.pixelArtEvaluation = pixelArtEvaluation;
    this.layerAddress = layerAddress;
    this.pixels = [];
    this.pixelsMap = {};
    this.cores = [];
    this.points = [];
    this.lines = [];
  }
  getPixel(x, y) {
    var ref;
    return (ref = this.pixelsMap[x]) != null ? ref[y] : void 0;
  }
  getPointOn() {
    var i, j, k, len, len1, len2, pixel, point, pointContainsAllPixels, ref, requiredPixel;
    for (var _len = arguments.length, pixels = new Array(_len), _key = 0; _key < _len; _key++) {
      pixels[_key] = arguments[_key];
    }
    for (i = 0, len = pixels.length; i < len; i++) {
      pixel = pixels[i];
      ref = pixel.points;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        point = ref[j];
        pointContainsAllPixels = true;
        for (k = 0, len2 = pixels.length; k < len2; k++) {
          requiredPixel = pixels[k];
          if (!(indexOf.call(point.pixels, requiredPixel) < 0)) {
            continue;
          }
          pointContainsAllPixels = false;
          break;
        }
        if (pointContainsAllPixels) {
          return point;
        }
      }
    }
    return null;
  }
  getLinesAt(x, y) {
    var pixel;
    if (!(pixel = this.getPixel(x, y))) {
      return [];
    }
    return pixel.lines;
  }
  getLinesBetween() {
    for (var _len2 = arguments.length, points = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      points[_key2] = arguments[_key2];
    }
    var linesForPoints, point;
    linesForPoints = function () {
      var i, len, results;
      results = [];
      for (i = 0, len = points.length; i < len; i++) {
        point = points[i];
        results.push(this.getLinesAt(point.x, point.y));
      }
      return results;
    }.call(this);
    return _.intersection(...linesForPoints);
  }
  getLinePartsAt(x, y) {
    var line, pixel;
    if (!(pixel = this.getPixel(x, y))) {
      return [];
    }
    return _.flatten(function () {
      var i, len, ref, results;
      ref = pixel.lines;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        results.push(line.getPartsForPixel(pixel));
      }
      return results;
    }());
  }
  getLinePartsBetween() {
    for (var _len3 = arguments.length, points = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      points[_key3] = arguments[_key3];
    }
    var linePartsForPoints, point;
    linePartsForPoints = function () {
      var i, len, results;
      results = [];
      for (i = 0, len = points.length; i < len; i++) {
        point = points[i];
        results.push(this.getLinePartsAt(point.x, point.y));
      }
      return results;
    }.call(this);
    return _.intersection(...linePartsForPoints);
  }
  mergeCoreInto(removingCore, enlargingCore) {
    var i, id, len, outline, outlinePoints, point, results;
    enlargingCore.mergeCore(removingCore);
    if (outline = removingCore.outline) {
      outlinePoints = _.clone(outline.points);
    }
    this._removeCore(removingCore);
    if (outline) {
      this._removeLine(outline);
      results = [];
      for (point = i = 0, len = outlinePoints.length; i < len; point = ++i) {
        id = outlinePoints[point];
        if (point.lines.length === 0) {
          results.push(this._removePoint(point));
        }
      }
      return results;
    }
  }
  updateArea(bounds) {
    var addAdditionalInvalidatedPixel, addInvalidatedPixel, addInvalidatingPixel, addedPixels, additionalInvalidatedPixelsMap, additionalInvalidatedPoints, bitmapPixel, core, corePoints, existingPixel, forEachInvalidatedPixel, i, i1, id, invalidatedCores, invalidatedLines, invalidatedPixelsMap, invalidatedPoints, invalidatingPixelsMap, j, j1, k, k1, l, l1, len, len1, len10, len11, len12, len13, len14, len15, len16, len17, len18, len19, len2, len20, len21, len22, len23, len24, len25, len3, len4, len5, len6, len7, len8, len9, line, lineFound, m, m1, n, n1, neighbor, newLines, newPixel, newPoints, o, o1, object, objects, outline, outlineCore, outlinePixel, p, p1, pixel, pixels, point, q, q1, r, r1, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref3, ref4, ref5, ref6, ref7, ref8, ref9, removedPixels, s, s1, t, t1, tooShortLines, u, v, w, x, y, z;
    ref = this.points;
    for (i = 0, len = ref.length; i < len; i++) {
      point = ref[i];
      // Mark all points as old so we can discern them from new ones during debugging.
      point.old = true;
    }

    // Detect added and removed pixels.
    if (bounds == null) {
      bounds = this.pixelArtEvaluation.bitmap.bounds;
    }
    addedPixels = [];
    removedPixels = [];
    for (x = j = ref1 = bounds.x, ref2 = bounds.x + bounds.width; ref1 <= ref2 ? j < ref2 : j > ref2; x = ref1 <= ref2 ? ++j : --j) {
      for (y = k = ref3 = bounds.y, ref4 = bounds.y + bounds.height; ref3 <= ref4 ? k < ref4 : k > ref4; y = ref3 <= ref4 ? ++k : --k) {
        existingPixel = (ref5 = this.pixelsMap[x]) != null ? ref5[y] : void 0;
        bitmapPixel = this.pixelArtEvaluation.bitmap.getPixelForLayerAtAbsoluteCoordinates(this.layerAddress, x, y);
        if (bitmapPixel && !existingPixel) {
          newPixel = this._addPixel(x, y);
          addedPixels.push(newPixel);
        } else if (existingPixel && !bitmapPixel) {
          this._removePixel(existingPixel);
          removedPixels.push(existingPixel);
        }
      }
    }

    // Removed pixels and neighbors of added and removed pixels invalidate lines, points, and cores they were part of.
    invalidatingPixelsMap = {};
    addInvalidatingPixel = pixel => {
      var name;
      if (!pixel) {
        return;
      }
      if (invalidatingPixelsMap[name = pixel.x] == null) {
        invalidatingPixelsMap[name] = {};
      }
      return invalidatingPixelsMap[pixel.x][pixel.y] = pixel;
    };
    for (l = 0, len1 = removedPixels.length; l < len1; l++) {
      pixel = removedPixels[l];
      // Note: For removed pixels we can't use pixel neighborhood because that
      // wouldn't include the removed pixels (since they no longer are on the layer).
      addInvalidatingPixel(pixel);
      pixel.forEachNeighbor(neighbor => {
        return addInvalidatingPixel(neighbor);
      });
    }
    for (m = 0, len2 = addedPixels.length; m < len2; m++) {
      pixel = addedPixels[m];
      pixel.forEachPixelInNeighborhood(neighborhoodPixel => {
        return addInvalidatingPixel(neighborhoodPixel);
      });
    }
    invalidatedLines = {};
    invalidatedPoints = {};
    invalidatedCores = {};

    // Invalidating pixels invalidate their lines, points, and cores.
    for (x in invalidatingPixelsMap) {
      pixels = invalidatingPixelsMap[x];
      for (y in pixels) {
        pixel = pixels[y];
        ref6 = pixel.lines;
        for (n = 0, len3 = ref6.length; n < len3; n++) {
          line = ref6[n];
          invalidatedLines[line.id] = line;
        }
        ref7 = pixel.points;
        for (o = 0, len4 = ref7.length; o < len4; o++) {
          point = ref7[o];
          invalidatedPoints[point.id] = point;
        }
        if (pixel.core) {
          invalidatedCores[pixel.core.id] = pixel.core;
        }
        ref8 = pixel.outlineCores;
        for (p = 0, len5 = ref8.length; p < len5; p++) {
          outlineCore = ref8[p];
          invalidatedCores[outlineCore.id] = outlineCore;
        }
      }
    }

    // Invalidated outlines invalidate their cores.
    for (id in invalidatedLines) {
      line = invalidatedLines[id];
      if (line.core) {
        invalidatedCores[line.core.id] = line.core;
      }
    }
    // Invalidated cores invalidate their outlines and outline points.
    for (id in invalidatedCores) {
      core = invalidatedCores[id];
      ref9 = core.outlines;
      for (q = 0, len6 = ref9.length; q < len6; q++) {
        outline = ref9[q];
        invalidatedLines[outline.id] = outline;
      }
      ref10 = core.outlinePixels;
      for (r = 0, len7 = ref10.length; r < len7; r++) {
        pixel = ref10[r];
        ref11 = pixel.points;
        for (s = 0, len8 = ref11.length; s < len8; s++) {
          point = ref11[s];
          ref12 = pixel.points;
          for (t = 0, len9 = ref12.length; t < len9; t++) {
            point = ref12[t];
            invalidatedPoints[point.id] = point;
          }
        }
      }
    }

    // Invalidated points invalidate the lines they are part of. We do this to extend the network of lines getting
    // removed since otherwise the points on the perimeter will not get removed as there are nearby lines connecting to
    // them. Essentially, we want to only leave end points of lines far enough from the changing area to be sure they are
    // not affecting the result.
    for (id in invalidatedPoints) {
      point = invalidatedPoints[id];
      ref13 = point.lines;
      for (u = 0, len10 = ref13.length; u < len10; u++) {
        line = ref13[u];
        invalidatedLines[line.id] = line;
      }
    }

    // Invalidated lines invalidate their points.
    for (id in invalidatedLines) {
      line = invalidatedLines[id];
      ref14 = line.points;
      for (v = 0, len11 = ref14.length; v < len11; v++) {
        point = ref14[v];
        invalidatedPoints[point.id] = point;
      }
    }

    // Collect invalidated pixels.
    invalidatedPixelsMap = {};
    addInvalidatedPixel = pixel => {
      var name;
      if (invalidatedPixelsMap[name = pixel.x] == null) {
        invalidatedPixelsMap[name] = {};
      }
      return invalidatedPixelsMap[pixel.x][pixel.y] = pixel;
    };
    ref15 = [invalidatedLines, invalidatedPoints, invalidatedCores];
    for (w = 0, len12 = ref15.length; w < len12; w++) {
      objects = ref15[w];
      for (id in objects) {
        object = objects[id];
        ref16 = object.pixels;
        for (z = 0, len13 = ref16.length; z < len13; z++) {
          pixel = ref16[z];
          if (indexOf.call(removedPixels, pixel) < 0) {
            addInvalidatedPixel(pixel);
          }
        }
      }
    }
    for (id in invalidatedLines) {
      line = invalidatedLines[id];

      // Remove invalidated objects.
      this._removeLine(line);
    }
    for (id in invalidatedPoints) {
      point = invalidatedPoints[id];
      if (point.lines.length === 0) {
        this._removePoint(point);
      }
    }
    for (id in invalidatedCores) {
      core = invalidatedCores[id];
      this._removeCore(core);
    }
    for (i1 = 0, len14 = addedPixels.length; i1 < len14; i1++) {
      pixel = addedPixels[i1];

      // Added pixels are invalidated by default.
      addInvalidatedPixel(pixel);
    }

    // Classify core pixels.
    forEachInvalidatedPixel = operation => {
      var results;
      results = [];
      for (x in invalidatedPixelsMap) {
        pixels = invalidatedPixelsMap[x];
        results.push(function () {
          var results1;
          results1 = [];
          for (y in pixels) {
            pixel = pixels[y];
            results1.push(operation(pixel));
          }
          return results1;
        }());
      }
      return results;
    };
    additionalInvalidatedPixelsMap = {};
    addAdditionalInvalidatedPixel = pixel => {
      var name;
      if (additionalInvalidatedPixelsMap[name = pixel.x] == null) {
        additionalInvalidatedPixelsMap[name] = {};
      }
      return additionalInvalidatedPixelsMap[pixel.x][pixel.y] = pixel;
    };
    forEachInvalidatedPixel(pixel => {
      pixel.classifyCore();
      if (!pixel.couldBeCore()) {
        return;
      }

      // Invalidate core pixel and neighbors (since they can fall on the outline).
      return pixel.forEachPixelInNeighborhood(neighbor => {
        return addAdditionalInvalidatedPixel(neighbor);
      });
    });

    // Assign cores to core pixels.
    forEachInvalidatedPixel(pixel => {
      var corePoints, j1, k1, l1, len15, len16, len17, ref17, ref18, results;
      if (pixel.isDeepCore && !pixel.core) {
        core = this._addCore();
        core.fillFromPixel(pixel);

        // Remove points from the new core, in case it absorbed any pixels/points outside the invalidated area.
        corePoints = [];
        ref17 = core.pixels;
        for (j1 = 0, len15 = ref17.length; j1 < len15; j1++) {
          pixel = ref17[j1];
          addAdditionalInvalidatedPixel(pixel);
          ref18 = pixel.points;
          for (k1 = 0, len16 = ref18.length; k1 < len16; k1++) {
            point = ref18[k1];
            if (indexOf.call(corePoints, point) < 0) {
              corePoints.push(point);
            }
          }
        }
        results = [];
        for (l1 = 0, len17 = corePoints.length; l1 < len17; l1++) {
          point = corePoints[l1];
          if (point.lines.length === 0) {
            results.push(function () {
              var len18, m1, ref19, results1;
              ref19 = point.pixels;
              results1 = [];
              for (m1 = 0, len18 = ref19.length; m1 < len18; m1++) {
                pixel = ref19[m1];
                results1.push(addAdditionalInvalidatedPixel(pixel));
              }
              return results1;
            }());
          }
        }
        return results;
      }
    });

    // Invalidate any additional points
    additionalInvalidatedPoints = {};
    for (x in additionalInvalidatedPixelsMap) {
      pixels = additionalInvalidatedPixelsMap[x];
      for (y in pixels) {
        pixel = pixels[y];
        addInvalidatedPixel(pixel);
        ref17 = pixel.points;
        for (j1 = 0, len15 = ref17.length; j1 < len15; j1++) {
          point = ref17[j1];
          if (point.lines.length === 0) {
            additionalInvalidatedPoints[point.id] = point;
          }
        }
      }
    }
    for (id in additionalInvalidatedPoints) {
      point = additionalInvalidatedPoints[id];
      if (point.lines.length === 0) {
        this._removePoint(point);
      }
    }

    // Assign pixels to core outline pixels.
    forEachInvalidatedPixel(pixel => {
      if (pixel.couldBeCore()) {
        return;
      }
      return pixel.forEachNeighbor(neighbor => {
        if (neighbor.core && indexOf.call(neighbor.core.outlinePixels, pixel) < 0) {
          // Become the part of the core's outline.
          neighbor.core.assignOutlinePixel(pixel);
          return pixel.assignOutlineCore(neighbor.core);
        }
      });
    });

    // Create core outlines points.
    newPoints = [];
    ref18 = this.cores;
    for (k1 = 0, len16 = ref18.length; k1 < len16; k1++) {
      core = ref18[k1];
      ref19 = core.outlinePixels;
      // Create points on the core outlines.
      for (l1 = 0, len17 = ref19.length; l1 < len17; l1++) {
        outlinePixel = ref19[l1];
        point = _.find(outlinePixel.points, point => {
          return point.pixels.length === 1;
        });
        if (!point) {
          if (point == null) {
            point = this._addPoint();
          }
          newPoints.push(point);
          point.addPixel(outlinePixel);
        }
      }
    }

    // Create double points outside of cores.
    forEachInvalidatedPixel(pixel => {
      var bottomNeighbor, bottomRightNeighbor, len18, m1, pointPixel, ref20, results, rightNeighbor;
      if (pixel.core) {
        return;
      }
      if (!(rightNeighbor = this.getPixel(pixel.x + 1, pixel.y))) {
        return;
      }
      if (rightNeighbor.core) {
        return;
      }
      if (!(bottomNeighbor = this.getPixel(pixel.x, pixel.y + 1))) {
        return;
      }
      if (bottomNeighbor.core) {
        return;
      }
      if (!(bottomRightNeighbor = this.getPixel(pixel.x + 1, pixel.y + 1))) {
        return;
      }
      if (bottomRightNeighbor.core) {
        return;
      }
      if (this.getPointOn(pixel, rightNeighbor, bottomNeighbor, bottomRightNeighbor)) {
        return;
      }
      point = this._addPoint();
      newPoints.push(point);
      ref20 = [pixel, rightNeighbor, bottomNeighbor, bottomRightNeighbor];
      results = [];
      for (m1 = 0, len18 = ref20.length; m1 < len18; m1++) {
        pointPixel = ref20[m1];
        results.push(point.addPixel(pointPixel));
      }
      return results;
    });

    // Create single points on all remaining non-core pixels.
    forEachInvalidatedPixel(pixel => {
      if (pixel.core || this.getPointOn(pixel)) {
        return;
      }
      point = this._addPoint();
      newPoints.push(point);
      return point.addPixel(pixel);
    });
    for (m1 = 0, len18 = newPoints.length; m1 < len18; m1++) {
      point = newPoints[m1];

      // Connect points.
      point.connectNeighbors();
    }
    PAE.Point.optimizeNeighbors(newPoints);

    // Now that we have point connections, finish creating outlines.
    newLines = [];
    ref20 = this.cores;
    for (n1 = 0, len19 = ref20.length; n1 < len19; n1++) {
      core = ref20[n1];
      ref21 = core.outlinePixels;
      for (o1 = 0, len20 = ref21.length; o1 < len20; o1++) {
        outlinePixel = ref21[o1];
        if (!!_.find(outlinePixel.lines, line => {
          return line.core === core;
        })) {
          continue;
        }
        outline = this._addLine();
        newLines.push(outline);
        core.assignOutline(outline);
        outline.assignCore(core);
        point = _.find(outlinePixel.points, function (point) {
          return point.pixels.length === 1;
        });
        outline.addOutlinePoints(core, point);
      }
    }
    ref22 = this.points;

    // Create remaining lines.
    for (p1 = 0, len21 = ref22.length; p1 < len21; p1++) {
      point = ref22[p1];
      ref23 = point.neighbors;
      for (q1 = 0, len22 = ref23.length; q1 < len22; q1++) {
        neighbor = ref23[q1];
        lineFound = false;
        ref24 = point.lines;
        for (r1 = 0, len23 = ref24.length; r1 < len23; r1++) {
          line = ref24[r1];
          if (indexOf.call(line.points, neighbor) >= 0) {
            lineFound = true;
            break;
          }
        }
        if (lineFound) {
          continue;
        }
        if ((1 === point.radius || 1 === neighbor.radius) && (point.getOutlines().length || neighbor.getOutlines().length)) {
          // Ignore lines that connect outlines to double points.
          continue;
        }

        // We need a line going from this point through the neighbor.
        line = this._addLine();
        newLines.push(line);
        line.fillFromPoints(point, neighbor);
      }
    }

    // Filter out lines that don't have any core pixels.
    tooShortLines = [];
    for (s1 = 0, len24 = newLines.length; s1 < len24; s1++) {
      line = newLines[s1];
      if (!(line.points.length === 2)) {
        continue;
      }
      corePoints = 2;
      if (line.points[0].lines.length > 1) {
        corePoints--;
      }
      if (line.points[1].lines.length > 1) {
        corePoints--;
      }
      if (corePoints) {
        continue;
      }
      this._removeLine(line);
    }
    _.pullAll(line, tooShortLines);
    for (t1 = 0, len25 = newLines.length; t1 < len25; t1++) {
      line = newLines[t1];

      // Classify lines.
      line.classifyLineParts();
    }
  }

  // Explicit return to avoid result collection.
  _addPixel(x, y) {
    var base, pixel;
    pixel = new PAE.Pixel(this, x, y);
    this.pixels.push(pixel);
    if ((base = this.pixelsMap)[x] == null) {
      base[x] = {};
    }
    this.pixelsMap[x][y] = pixel;
    return pixel;
  }
  _removePixel(pixel) {
    _.pull(this.pixels, pixel);
    return this.pixelsMap[pixel.x][pixel.y] = null;
  }
  _addLine() {
    var line;
    line = new PAE.Line(this);
    this.lines.push(line);
    return line;
  }
  _removeLine(line) {
    _.pull(this.lines, line);
    return line.destroy();
  }
  _addPoint() {
    var point;
    point = new PAE.Point(this);
    this.points.push(point);
    return point;
  }
  _removePoint(point) {
    _.pull(this.points, point);
    return point.destroy();
  }
  _addCore() {
    var core;
    core = new PAE.Core(this);
    this.cores.push(core);
    return core;
  }
  _removeCore(core) {
    _.pull(this.cores, core);
    return core.destroy();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"core.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/core.coffee                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Core = class Core {
  constructor(layer) {
    this.layer = layer;
    this.id = PAE.nextId();
    this.pixels = [];
    this._pixelsMap = {};
    this.outlinePixels = [];
    this.outlines = [];
  }
  destroy() {
    var i, j, k, len, len1, len2, outline, pixel, ref, ref1, ref2, results;
    ref = this.pixels;
    for (i = 0, len = ref.length; i < len; i++) {
      pixel = ref[i];
      pixel.unassignCore(this);
    }
    ref1 = this.outlinePixels;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      pixel = ref1[j];
      pixel.unassignOutlineCore(this);
    }
    ref2 = this.outlines;
    results = [];
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      outline = ref2[k];
      results.push(outline.unassignCore(this));
    }
    return results;
  }
  assignOutlinePixel(outlinePixel) {
    if (indexOf.call(this.outlinePixels, outlinePixel) >= 0) {
      throw new AE.ArgumentException("The outline pixel is already assigned to this core.", outlinePixel, this);
    }
    return this.outlinePixels.push(outlinePixel);
  }
  assignOutline(outline) {
    if (indexOf.call(this.outlines, outline) >= 0) {
      throw new AE.ArgumentException("The outline is already assigned to this core.", outline, this);
    }
    return this.outlines.push(outline);
  }
  unassignOutline(outline) {
    if (indexOf.call(this.outlines, outline) < 0) {
      throw new AE.ArgumentException("The outline is not assigned to this core.", outline, this);
    }
    return _.pull(this.outlines, outline);
  }
  fillFromPixel(initialPixel) {
    var core, fringe, fringeMap, id, pixel, touchedCores;
    touchedCores = {};
    fringe = [initialPixel];
    fringeMap = {};
    fringeMap[initialPixel.x] = {};
    fringeMap[initialPixel.x][initialPixel.y] = true;
    while (fringe.length) {
      pixel = fringe.pop();
      this._addPixel(pixel);
      pixel.forEachNeighbor(neighbor => {
        var name, ref, ref1;
        // Skip our own pixels (which were already added during the fill).
        if ((ref = this._pixelsMap[neighbor.x]) != null ? ref[neighbor.y] : void 0) {
          return;
        }

        // Skip surface pixels.
        if (!neighbor.couldBeCore()) {
          return;
        }

        // Did we reach another core?
        if (neighbor.core) {
          // Mark the core to be merged.
          return touchedCores[neighbor.core.id] = neighbor.core;
        } else {
          // Did we already add this neighbor to the fringe?
          if ((ref1 = fringeMap[neighbor.x]) != null ? ref1[neighbor.y] : void 0) {
            return;
          }
          // The neighbor should be filled.
          fringe.push(neighbor);
          if (fringeMap[name = neighbor.x] == null) {
            fringeMap[name] = {};
          }
          return fringeMap[neighbor.x][neighbor.y] = true;
        }
      });
    }

    // Merge any touched cores.
    for (id in touchedCores) {
      core = touchedCores[id];
      this.layer.mergeCoreInto(core, this);
    }
  }

  // Explicit return to avoid result collection.
  mergeCore(core) {
    var i, j, len, len1, pixel, ref, ref1;
    ref = _.clone(core.pixels);
    // Take over all pixels of the core.
    for (i = 0, len = ref.length; i < len; i++) {
      pixel = ref[i];
      core._removePixel(pixel);
      this._addPixel(pixel);
    }
    ref1 = _.clone(core.outlinePixels);
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      pixel = ref1[j];
      core._removeOutlinePixel(pixel);
      this._addOutlinePixel(pixel);
    }
  }

  // Explicit return to avoid result collection.
  _addPixel(pixel) {
    var base, name;
    if ((base = this._pixelsMap)[name = pixel.x] == null) {
      base[name] = {};
    }
    this._pixelsMap[pixel.x][pixel.y] = true;
    this.pixels.push(pixel);
    return pixel.assignCore(this);
  }
  _removePixel(pixel) {
    this._pixelsMap[pixel.x][pixel.y] = false;
    _.pull(this.pixels, pixel);
    return pixel.unassignCore(this);
  }
  _addOutlinePixel(pixel) {
    this.outlinePixels.push(pixel);
    return pixel.assignOutlineCore(this);
  }
  _removeOutlinePixel(pixel) {
    _.pull(this.outlinePixels, pixel);
    return pixel.unassignOutlineCore(this);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pixel.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/pixel.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Pixel = class Pixel {
  constructor(layer, x1, y1) {
    this.layer = layer;
    this.x = x1;
    this.y = y1;
    this.lines = [];
    this.points = [];
    this.core = null;
    this.outlineCores = [];
    this.isShallowCore = null;
    this.isDeepCore = null;
  }
  couldBeCore() {
    return this.isShallowCore || this.isDeepCore;
  }
  assignLine(line) {
    if (indexOf.call(this.lines, line) >= 0) {
      throw new AE.ArgumentException("The line is already assigned to this pixel.", line, this);
    }
    return this.lines.push(line);
  }
  assignPoint(point) {
    if (indexOf.call(this.points, point) >= 0) {
      throw new AE.ArgumentException("The point is already assigned to this pixel.", point, this);
    }
    return this.points.push(point);
  }
  assignCore(core) {
    if (this.core) {
      throw new AE.ArgumentException("A core is already assigned to this pixel.", core, this);
    }
    return this.core = core;
  }
  assignOutlineCore(core) {
    if (indexOf.call(this.outlineCores, core) >= 0) {
      throw new AE.ArgumentException("The outline core is already assigned to this pixel.", core, this);
    }
    return this.outlineCores.push(core);
  }
  unassignLine(line) {
    if (indexOf.call(this.lines, line) < 0) {
      throw new AE.ArgumentException("The line is not assigned to this pixel.", line, this);
    }
    return _.pull(this.lines, line);
  }
  unassignPoint(point) {
    if (indexOf.call(this.points, point) < 0) {
      throw new AE.ArgumentException("The point is not assigned to this pixel.", point, this);
    }
    return _.pull(this.points, point);
  }
  unassignCore(core) {
    if (core !== this.core) {
      throw new AE.ArgumentException("The core is not assigned to this pixel.", core, this);
    }
    return this.core = null;
  }
  unassignOutlineCore(core) {
    if (indexOf.call(this.outlineCores, core) < 0) {
      throw new AE.ArgumentException("The outline core is not assigned to this pixel.", core, this);
    }
    return _.pull(this.outlineCores, core);
  }
  classifyCore() {
    var diagonalNeighborsCount, directNeighborsCount;
    this.isDeepCore = false;
    this.isShallowCore = false;

    // Count number of neighbors.
    directNeighborsCount = 0;
    diagonalNeighborsCount = 0;
    this.forEachNeighbor(pixel => {
      if (pixel.x === this.x || pixel.y === this.y) {
        return directNeighborsCount++;
      } else {
        return diagonalNeighborsCount++;
      }
    });

    // Core pixels have all direct neighbors.
    if (directNeighborsCount !== 4) {
      return;
    }
    if (diagonalNeighborsCount === 4) {
      return this.isDeepCore = true;
    } else {
      return this.isShallowCore = true;
    }
  }
  forEachNeighbor(operation) {
    var i, j, pixel, ref, ref1, ref2, ref3, x, y;
    for (x = i = ref = this.x - 1, ref1 = this.x + 1; ref <= ref1 ? i <= ref1 : i >= ref1; x = ref <= ref1 ? ++i : --i) {
      for (y = j = ref2 = this.y - 1, ref3 = this.y + 1; ref2 <= ref3 ? j <= ref3 : j >= ref3; y = ref2 <= ref3 ? ++j : --j) {
        if (x !== this.x || y !== this.y) {
          if (pixel = this.layer.getPixel(x, y)) {
            operation(pixel);
          }
        }
      }
    }
  }

  // Explicit return to avoid result collection.
  forEachPixelInNeighborhood(operation) {
    var i, j, pixel, ref, ref1, ref2, ref3, x, y;
    for (x = i = ref = this.x - 1, ref1 = this.x + 1; ref <= ref1 ? i <= ref1 : i >= ref1; x = ref <= ref1 ? ++i : --i) {
      for (y = j = ref2 = this.y - 1, ref3 = this.y + 1; ref2 <= ref3 ? j <= ref3 : j >= ref3; y = ref2 <= ref3 ? ++j : --j) {
        if (pixel = this.layer.getPixel(x, y)) {
          operation(pixel);
        }
      }
    }
  }
};

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"point.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/point.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Point = class Point {
  static getSharedOutlineCore(pointA, pointB) {
    var i, len, outlineCore, outlinePixelA, outlinePixelB, ref;
    if (!(outlinePixelA = pointA.getOutlinePixel())) {
      return;
    }
    if (!(outlinePixelB = pointB.getOutlinePixel())) {
      return;
    }
    ref = outlinePixelA.outlineCores;
    for (i = 0, len = ref.length; i < len; i++) {
      outlineCore = ref[i];
      if (indexOf.call(outlinePixelB.outlineCores, outlineCore) >= 0) {
        return outlineCore;
      }
    }
    return null;
  }
  static setStraightLine(pointA, pointB, line) {
    if (pointA.x < pointB.x) {
      line.start.x = pointA.x - pointA.radius;
      line.end.x = pointB.x + pointB.radius;
    } else if (pointA.x === pointB.x) {
      line.start.x = pointA.x;
      line.end.x = pointB.x;
    } else {
      line.start.x = pointA.x + pointA.radius;
      line.end.x = pointB.x - pointB.radius;
    }
    if (pointA.y < pointB.y) {
      line.start.y = pointA.y - pointA.radius;
      return line.end.y = pointB.y + pointB.radius;
    } else if (pointA.y === pointB.y) {
      line.start.y = pointA.y;
      return line.end.y = pointB.y;
    } else {
      line.start.y = pointA.y + pointA.radius;
      return line.end.y = pointB.y - pointB.radius;
    }
  }
  constructor(layer) {
    this.layer = layer;
    this.id = PAE.nextId();
    this.neighbors = [];
    this.allNeighbors = [];
    this.lines = [];
    this.pixels = [];
    this.x = null;
    this.y = null;
    this.radius = null;
  }
  destroy() {
    var i, j, k, l, len, len1, len2, len3, line, neighbor, pixel, ref, ref1, ref2, ref3, results;
    ref = this.pixels;
    for (i = 0, len = ref.length; i < len; i++) {
      pixel = ref[i];
      pixel.unassignPoint(this);
    }
    ref1 = this.lines;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      line = ref1[j];
      line.unassignPoint(this);
    }
    ref2 = this.neighbors;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      neighbor = ref2[k];
      neighbor._disconnectNeighbor(this);
    }
    ref3 = this.allNeighbors;
    results = [];
    for (l = 0, len3 = ref3.length; l < len3; l++) {
      neighbor = ref3[l];
      results.push(neighbor._destroyNeighbor(this));
    }
    return results;
  }
  getOutlines() {
    var i, len, line, ref, results;
    ref = this.lines;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      line = ref[i];
      if (line.core) {
        results.push(line);
      }
    }
    return results;
  }
  getOutlinePixel() {
    if (!(this.pixels.length === 1 && this.pixels[0].outlineCores.length)) {
      return;
    }
    return this.pixels[0];
  }
  assignLine(line) {
    if (indexOf.call(this.lines, line) >= 0) {
      throw new AE.ArgumentException("The line is already assigned to this point.", line);
    }
    return this.lines.push(line);
  }
  unassignLine(line) {
    if (indexOf.call(this.lines, line) < 0) {
      throw new AE.ArgumentException("The line is not assigned to this point.", line);
    }
    return _.pull(this.lines, line);
  }
  addPixel(pixel) {
    this.pixels.push(pixel);
    pixel.assignPoint(this);
    return this._updateProperties();
  }
  _updateProperties() {
    var i, len, maxX, minX, pixel, ref, size;
    this.x = 0;
    this.y = 0;

    // We assume a symmetrical point for radius determination so only need to consider one axis.
    minX = Number.POSITIVE_INFINITY;
    maxX = Number.NEGATIVE_INFINITY;
    ref = this.pixels;
    for (i = 0, len = ref.length; i < len; i++) {
      pixel = ref[i];
      this.x += pixel.x;
      this.y += pixel.y;
      minX = Math.min(minX, pixel.x);
      maxX = Math.max(maxX, pixel.x);
    }
    this.x /= this.pixels.length;
    this.y /= this.pixels.length;
    size = maxX - minX + 1;
    return this.radius = size / 2;
  }
  connectNeighbors() {
    var i, len, pixel, ref, results;
    ref = this.pixels;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      pixel = ref[i];
      results.push(pixel.forEachNeighbor(neighborPixel => {
        var j, len1, point, ref1, results1;
        ref1 = neighborPixel.points;
        results1 = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          point = ref1[j];
          if (!(point !== this)) {
            continue;
          }
          this._connectNeighbor(point);
          results1.push(point._connectNeighbor(this));
        }
        return results1;
      }));
    }
    return results;
  }
  saveAllNeighbors() {
    var i, len, neighbor, ref, results;
    ref = this.neighbors;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      neighbor = ref[i];
      if (indexOf.call(this.allNeighbors, neighbor) < 0) {
        results.push(this.allNeighbors.push(neighbor));
      }
    }
    return results;
  }
  _connectNeighbor(neighbor) {
    if (indexOf.call(this.neighbors, neighbor) < 0) {
      return this.neighbors.push(neighbor);
    }
  }
  _disconnectNeighbor(neighbor) {
    return _.pull(this.neighbors, neighbor);
  }
  _destroyNeighbor(neighbor) {
    return _.pull(this.allNeighbors, neighbor);
  }
  _distanceSquaredTo(point) {
    return Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"point-optimizeneighbors.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/point-optimizeneighbors.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Point.optimizeNeighbors = function (points) {
  var diagonalPoint, diagonalPoints, distance, distanceAB, distanceRA, distanceRB, eliminated, eliminatedConnections, eliminatingPoint1, eliminatingPoint2, i, i1, index, j, j1, k, k1, l, l1, len, len1, len10, len11, len12, len13, len14, len15, len16, len17, len18, len19, len2, len20, len3, len4, len5, len6, len7, len8, len9, m, m1, n, n1, neighbor, neighborA, neighborB, neighborOutlinePixel, o, o1, outlineCore, outlineNeighbors, outlinePixel, outsidePixel, outsidePoint, p, p1, pixel, point, q, q1, r, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, rootNeighbor, rootPoint, s, sharedCorePixelFound, sharedNonClusterPixelFound, sharedOutlineCore, t, u, v, w, x, x1, x2, y, y1, y2, z;
  if (!points.length) {
    return;
  }

  // Remove all long connections that span over two short connections.
  for (i = 0, len = points.length; i < len; i++) {
    rootPoint = points[i];
    while (true) {
      eliminated = false;
      ref = rootPoint.neighbors;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        neighborA = ref[j];
        ref1 = rootPoint.neighbors;
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          neighborB = ref1[k];
          if (!(neighborB !== neighborA)) {
            continue;
          }
          if (rootPoint.x === (neighborA.x + neighborB.x) / 2 && rootPoint.y === (neighborA.y + neighborB.y) / 2) {
            eliminatingPoint1 = neighborA;
            eliminatingPoint2 = neighborB;
          } else if (neighborB.x === (rootPoint.x + neighborA.x) / 2 && neighborB.y === (rootPoint.y + neighborA.y) / 2) {
            eliminatingPoint1 = rootPoint;
            eliminatingPoint2 = neighborA;
          } else if (neighborA.x === (rootPoint.x + neighborB.x) / 2 && neighborA.y === (rootPoint.y + neighborB.y) / 2) {
            eliminatingPoint1 = rootPoint;
            eliminatingPoint2 = neighborB;
          } else {
            continue;
          }
          if (indexOf.call(eliminatingPoint2.neighbors, eliminatingPoint1) < 0) {
            // Make sure the eliminating points are directly connected.
            continue;
          }
          eliminatingPoint1._disconnectNeighbor(eliminatingPoint2);
          eliminatingPoint2._disconnectNeighbor(eliminatingPoint1);
          eliminated = true;
          break;
        }
        if (eliminated) {
          break;
        }
      }
      if (!eliminated) {
        break;
      }
    }
  }

  // Remove long diagonals that cross orthogonal connections.
  for (l = 0, len3 = points.length; l < len3; l++) {
    rootPoint = points[l];
    diagonalPoints = [];
    ref2 = rootPoint.neighbors;
    for (m = 0, len4 = ref2.length; m < len4; m++) {
      rootNeighbor = ref2[m];
      distance = rootPoint._distanceSquaredTo(rootNeighbor);
      if (distance !== 5) {
        continue;
      }
      if (Math.abs(rootPoint.x - rootNeighbor.x) === 2) {
        // Diagonal is more horizontal.
        x1 = x2 = (rootPoint.x + rootNeighbor.x) / 2;
        y1 = rootPoint.y;
        y2 = rootNeighbor.y;
      } else {
        // Diagonal is more vertical.
        x1 = rootPoint.x;
        x2 = rootNeighbor.x;
        y1 = y2 = (rootPoint.y + rootNeighbor.y) / 2;
      }
      if (!_.find(rootPoint.neighbors, neighbor => {
        return neighbor.x === x1 && neighbor.y === y1;
      })) {
        // If you can find both points, there will be a connection crossing this diagonal.
        continue;
      }
      if (!_.find(rootPoint.neighbors, neighbor => {
        return neighbor.x === x2 && neighbor.y === y2;
      })) {
        continue;
      }
      diagonalPoints.push(rootNeighbor);
    }
    for (n = 0, len5 = diagonalPoints.length; n < len5; n++) {
      diagonalPoint = diagonalPoints[n];
      rootPoint._disconnectNeighbor(diagonalPoint);
      diagonalPoint._disconnectNeighbor(rootPoint);
    }
  }
  for (o = 0, len6 = points.length; o < len6; o++) {
    rootPoint = points[o];
    while (true) {
      // Eliminate triangles by removing the longer sides.
      eliminated = false;
      ref3 = rootPoint.neighbors;
      for (p = 0, len7 = ref3.length; p < len7; p++) {
        neighborA = ref3[p];
        distanceRA = rootPoint._distanceSquaredTo(neighborA);
        ref4 = rootPoint.neighbors;
        for (q = 0, len8 = ref4.length; q < len8; q++) {
          neighborB = ref4[q];
          if (!(neighborB !== neighborA)) {
            continue;
          }
          // See if these two points are connected, either directly or over another point (as is the case with doubles).
          if (!(indexOf.call(neighborA.neighbors, neighborB) >= 0 || indexOf.call(neighborA.allNeighbors, neighborB) >= 0)) {
            if (rootPoint.radius === 1) {
              if (!_.find(neighborA.neighbors, neighbor => {
                if (neighbor === rootPoint) {
                  return;
                }
                if (indexOf.call(neighborB.neighbors, neighbor) < 0) {
                  return;
                }
                if (neighbor.x === (neighborA.x + neighborB.x) / 2 && neighbor.y === (neighborA.y + neighborB.y) / 2) {
                  // Make sure the neighbor is on a straight line between two other points.
                  return true;
                }
                if (neighborA.x === (rootPoint.x + neighbor.x) / 2 && neighborA.y === (rootPoint.y + neighbor.y) / 2) {
                  return true;
                }
                if (neighborB.x === (rootPoint.x + neighbor.x) / 2 && neighborB.y === (rootPoint.y + neighbor.y) / 2) {
                  return true;
                }
                return false;
              })) {
                continue;
              }
            } else {
              continue;
            }
          }
          distanceRB = rootPoint._distanceSquaredTo(neighborB);
          distanceAB = neighborA._distanceSquaredTo(neighborB);
          if (distanceAB > distanceRA && distanceAB > distanceRB) {
            eliminatingPoint1 = neighborA;
            eliminatingPoint2 = neighborB;
            outsidePoint = rootPoint;
          } else if (distanceRA > distanceRB && distanceRA > distanceAB) {
            eliminatingPoint1 = rootPoint;
            eliminatingPoint2 = neighborA;
            outsidePoint = neighborB;
          } else if (distanceRB > distanceRA && distanceRB > distanceAB) {
            eliminatingPoint1 = rootPoint;
            eliminatingPoint2 = neighborB;
            outsidePoint = neighborA;
          } else {
            continue;
          }
          if (indexOf.call(eliminatingPoint2.neighbors, eliminatingPoint1) < 0) {
            // Make sure the eliminating points are directly connected.
            continue;
          }

          // Do not remove outline edges if that would break the outline (the outside point is not on the outline).
          sharedOutlineCore = this.getSharedOutlineCore(eliminatingPoint1, eliminatingPoint2);
          outsidePixel = outsidePoint.getOutlinePixel();
          if (sharedOutlineCore && (!outsidePixel || indexOf.call(outsidePixel.outlineCores, sharedOutlineCore) < 0)) {
            continue;
          }
          eliminatingPoint1._disconnectNeighbor(eliminatingPoint2);
          eliminatingPoint2._disconnectNeighbor(eliminatingPoint1);
          eliminated = true;
          break;
        }
        if (eliminated) {
          break;
        }
      }
      if (!eliminated) {
        break;
      }
    }
  }
  ref5 = points[0].layer.points;
  for (r = 0, len9 = ref5.length; r < len9; r++) {
    point = ref5[r];

    // Store all neighbors for certain analyses that require full connectivity.
    point.saveAllNeighbors();
  }

  // Eliminate non-outline connections between junctions (3 or more neighbors), since it's hard to determine meaningful
  // connectivity in that case. We need to first collect all connections and not remove them as we go along since that
  // would change their number of neighbors.
  eliminatedConnections = [];
  for (s = 0, len10 = points.length; s < len10; s++) {
    rootPoint = points[s];
    if (rootPoint.neighbors.length >= 3) {
      ref6 = rootPoint.neighbors;
      for (t = 0, len11 = ref6.length; t < len11; t++) {
        neighbor = ref6[t];
        if (neighbor.allNeighbors.length >= 3 && !(rootPoint.getOutlinePixel() && neighbor.getOutlinePixel())) {
          eliminatedConnections.push([rootPoint, neighbor]);
        }
      }
    }
  }

  // Eliminate core extensions (short lines sticking out of cores, which should
  // be part of core outlines if we had better filtering when eliminating triangles).
  for (u = 0, len12 = points.length; u < len12; u++) {
    rootPoint = points[u];
    ref7 = rootPoint.neighbors;
    for (v = 0, len13 = ref7.length; v < len13; v++) {
      neighbor = ref7[v];
      if (rootPoint.getOutlinePixel() && neighbor.neighbors.length === 1 || neighbor.getOutlinePixel() && rootPoint.neighbors.length === 1) {
        eliminatedConnections.push([rootPoint, neighbor]);
      }
    }
  }
  for (w = 0, len14 = eliminatedConnections.length; w < len14; w++) {
    [neighborA, neighborB] = eliminatedConnections[w];
    neighborA._disconnectNeighbor(neighborB);
    neighborB._disconnectNeighbor(neighborA);
  }

  // On outlines, make sure there are exactly two neighbors for each outline.
  for (z = 0, len15 = points.length; z < len15; z++) {
    rootPoint = points[z];
    if (!(outlinePixel = rootPoint.getOutlinePixel())) {
      continue;
    }
    ref8 = outlinePixel.outlineCores;
    for (index = i1 = 0, len16 = ref8.length; i1 < len16; index = ++i1) {
      outlineCore = ref8[index];
      outlineNeighbors = _.filter(rootPoint.neighbors, neighbor => {
        var neighborOutlinePixel;
        if (!(neighborOutlinePixel = neighbor.getOutlinePixel())) {
          return;
        }
        return indexOf.call(neighborOutlinePixel.outlineCores, outlineCore) >= 0;
      });
      if (outlineNeighbors.length === 2) {
        continue;
      }
      if (outlineNeighbors.length < 2) {
        console.error("Outline point didn't have 2 neighbors.", rootPoint);
        continue;
      }
      if (rootPoint.pixels.length > 1) {
        console.error("Outline point has multiple pixels", rootPoint);
        continue;
      }

      // Remove outline bridge edges (outer lines connecting two parts of the outline on different
      // areas of the core). We do this first to prevent unnecessary inner edge removals.
      for (j1 = 0, len17 = outlineNeighbors.length; j1 < len17; j1++) {
        neighbor = outlineNeighbors[j1];
        // We must have at least one core pixel neighbor in common, otherwise this is a bridge.
        sharedCorePixelFound = false;
        if (neighbor.pixels.length > 1) {
          console.error("Neighboring outline point has multiple pixels", neighbor);
          continue;
        }
        neighborOutlinePixel = neighbor.pixels[0];
        for (x = k1 = ref9 = neighborOutlinePixel.x - 1, ref10 = neighborOutlinePixel.x + 1; ref9 <= ref10 ? k1 <= ref10 : k1 >= ref10; x = ref9 <= ref10 ? ++k1 : --k1) {
          if (!(outlinePixel.x - 1 <= x && x <= outlinePixel.x + 1)) {
            continue;
          }
          for (y = l1 = ref11 = neighborOutlinePixel.y - 1, ref12 = neighborOutlinePixel.y + 1; ref11 <= ref12 ? l1 <= ref12 : l1 >= ref12; y = ref11 <= ref12 ? ++l1 : --l1) {
            if (outlinePixel.y - 1 <= y && y <= outlinePixel.y + 1) {
              if ((ref13 = rootPoint.layer.getPixel(x, y)) != null ? ref13.core : void 0) {
                sharedCorePixelFound = true;
                break;
              }
            }
          }
          if (sharedCorePixelFound) {
            break;
          }
        }
        if (sharedCorePixelFound) {
          continue;
        }
        rootPoint._disconnectNeighbor(neighbor);
        neighbor._disconnectNeighbor(rootPoint);
      }
    }
  }
  for (m1 = 0, len18 = points.length; m1 < len18; m1++) {
    rootPoint = points[m1];
    if (!(outlinePixel = rootPoint.getOutlinePixel())) {
      // Test if we still have more than 2 neighbors on the same outline.
      continue;
    }
    ref14 = outlinePixel.outlineCores;
    for (index = n1 = 0, len19 = ref14.length; n1 < len19; index = ++n1) {
      outlineCore = ref14[index];
      outlineNeighbors = _.filter(rootPoint.neighbors, neighbor => {
        if (!(neighborOutlinePixel = neighbor.getOutlinePixel())) {
          return;
        }
        return indexOf.call(neighborOutlinePixel.outlineCores, outlineCore) >= 0;
      });
      if (outlineNeighbors.length === 2) {
        continue;
      }

      // Remove inner core edges (diagonals connecting two parts of the outline on different sides of the core).
      for (o1 = 0, len20 = outlineNeighbors.length; o1 < len20; o1++) {
        neighbor = outlineNeighbors[o1];
        // We must have at least one outside pixel neighbor in common, otherwise this is an inner edge.
        sharedNonClusterPixelFound = false;
        if (neighbor.pixels.length > 1) {
          console.error("Neighboring outline point has multiple pixels", neighbor);
          continue;
        }
        neighborOutlinePixel = neighbor.pixels[0];
        for (x = p1 = ref15 = neighborOutlinePixel.x - 1, ref16 = neighborOutlinePixel.x + 1; ref15 <= ref16 ? p1 <= ref16 : p1 >= ref16; x = ref15 <= ref16 ? ++p1 : --p1) {
          if (!(outlinePixel.x - 1 <= x && x <= outlinePixel.x + 1)) {
            continue;
          }
          for (y = q1 = ref17 = neighborOutlinePixel.y - 1, ref18 = neighborOutlinePixel.y + 1; ref17 <= ref18 ? q1 <= ref18 : q1 >= ref18; y = ref17 <= ref18 ? ++q1 : --q1) {
            if (outlinePixel.y - 1 <= y && y <= outlinePixel.y + 1) {
              if (pixel = rootPoint.layer.getPixel(x, y)) {
                if (!(pixel.core || indexOf.call(pixel.outlineCores, outlineCore) >= 0)) {
                  sharedNonClusterPixelFound = true;
                  break;
                }
              } else {
                sharedNonClusterPixelFound = true;
                break;
              }
            }
          }
          if (sharedNonClusterPixelFound) {
            break;
          }
        }
        if (sharedNonClusterPixelFound) {
          continue;
        }
        rootPoint._disconnectNeighbor(neighbor);
        neighbor._disconnectNeighbor(rootPoint);
      }
    }
  }
};

// Explicit return to avoid result collection.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line":{"line.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  AP,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AP = Artificial.Program;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line = function () {
  class Line {
    constructor(layer) {
      this.layer = layer;
      this.id = PAE.nextId();
      this.pixels = [];
      this.points = [];
      this.core = null;
      this.isClosed = false;
      this.edges = [];
      this.edgeSegments = [];
      // Potential parts are considered when determining whether a point on the line is part of a curve or a straight line.
      this.potentialParts = [];
      this.potentialStraightLineParts = [];
      this.potentialCurveParts = [];
      this.pointPartIsCurve = [];

      // Curvature curve parts are curve parts that connect the line between inflection points.
      this.curvatureCurveParts = [];
      this.inflectionPoints = [];
      this.parts = [];
    }
    destroy() {
      var i, j, len, len1, pixel, point, ref, ref1, ref2;
      ref = this.pixels;
      for (i = 0, len = ref.length; i < len; i++) {
        pixel = ref[i];
        pixel.unassignLine(this);
      }
      ref1 = this.points;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        point = ref1[j];
        point.unassignLine(this);
      }
      return (ref2 = this.core) != null ? ref2.unassignOutline(this) : void 0;
    }
    getPixelBounds() {
      var i, len, maxX, maxY, minX, minY, pixel, ref;
      if (this._pixelBounds) {
        return this._pixelBounds;
      }
      minX = Number.POSITIVE_INFINITY;
      maxX = Number.NEGATIVE_INFINITY;
      minY = Number.POSITIVE_INFINITY;
      maxY = Number.NEGATIVE_INFINITY;
      ref = this.pixels;
      for (i = 0, len = ref.length; i < len; i++) {
        pixel = ref[i];
        if (pixel.x < minX) {
          minX = pixel.x;
        }
        if (pixel.x > maxX) {
          maxX = pixel.x;
        }
        if (pixel.y < minY) {
          minY = pixel.y;
        }
        if (pixel.y > maxY) {
          maxY = pixel.y;
        }
      }
      return this._pixelBounds = {
        minX,
        maxX,
        minY,
        maxY
      };
    }
    getCornerPoints() {
      var i, len, nextPart, part, partIndex, ref;
      if (this._cornerPoints) {
        return this._cornerPoints;
      }
      this._cornerPoints = [];
      ref = this.parts.slice(0, this.parts.length);
      for (partIndex = i = 0, len = ref.length; i < len; partIndex = ++i) {
        part = ref[partIndex];
        nextPart = this.parts[partIndex + 1];
        if (!(part instanceof this.constructor.Part.StraightLine && nextPart instanceof this.constructor.Part.StraightLine)) {
          continue;
        }
        this._cornerPoints.push(this.getPoint(part.endPointIndex));
      }
      return this._cornerPoints;
    }
    getJaggies() {
      var cornerPoints, i, j, len, len1, pixel, point, points, ref;
      if (this._jaggies) {
        return this._jaggies;
      }
      this._jaggies = [];
      cornerPoints = this.getCornerPoints();

      // Ignore end points if the line is not closed.
      points = this.isClosed ? this.points : this.points.slice(1, this.points.length - 1);
      for (i = 0, len = points.length; i < len; i++) {
        point = points[i];
        if (indexOf.call(cornerPoints, point) < 0) {
          ref = point.pixels;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            pixel = ref[j];
            if (this._isJaggyInCorner(pixel, -1, -1) || this._isJaggyInCorner(pixel, -1, 1) || this._isJaggyInCorner(pixel, 1, -1) || this._isJaggyInCorner(pixel, 1, 1)) {
              if (indexOf.call(this._jaggies, pixel) < 0) {
                this._jaggies.push(pixel);
              }
            }
          }
        }
      }
      return this._jaggies;
    }
    _isJaggyInCorner(pixel, dx, dy) {
      // A jaggy will have a diagonal neighbor and its two direct neighbors empty.
      if (this.layer.getPixel(pixel.x + dx, pixel.y + dy)) {
        return;
      }
      if (this.layer.getPixel(pixel.x, pixel.y + dy)) {
        return;
      }
      if (this.layer.getPixel(pixel.x + dx, pixel.y)) {
        return;
      }
      return true;
    }
    getDoubles(pixelArtEvaluationProperty) {
      var edgeSegment, i, j, k, l, len, len1, len2, len3, options, optionsHash, pixel, point, pointIndex, ref, ref1, ref2, ref3, ref4, width;
      options = PAE._getEvaluationOptions(pixelArtEvaluationProperty).pixelPerfectLines.doubles;
      optionsHash = AP.HashFunctions.getObjectHash(options, AP.HashFunctions.circularShift5);
      if (this._doubles == null) {
        this._doubles = {};
      }
      if (this._doubles[optionsHash]) {
        return this._doubles[optionsHash];
      }
      this._doubles[optionsHash] = [];
      if (!options.countAllLineWidthTypes) {
        // We should only count doubles on lines with varying width.
        width = this._analyzeWidth(pixelArtEvaluationProperty);
        if (width.type !== this.constructor.WidthType.Varying) {
          return this._doubles[optionsHash];
        }
      }
      ref = this.edgeSegments;

      // Doubles are all pixels on single-width (thick line) axis-aligned side steps.
      for (i = 0, len = ref.length; i < len; i++) {
        edgeSegment = ref[i];
        if (edgeSegment.isSideStep && edgeSegment.edge.isAxisAligned) {
          ref1 = [edgeSegment.startPointIndex, edgeSegment.endPointIndex];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            pointIndex = ref1[j];
            point = this.getPoint(pointIndex);
            if (point.pixels.length !== 1) {
              continue;
            }
            if (ref2 = point.pixels[0], indexOf.call(this._doubles[optionsHash], ref2) < 0) {
              this._doubles[optionsHash].push(point.pixels[0]);
            }
          }
        }
      }
      if (options.countPointsWithMultiplePixels) {
        ref3 = this.points;
        // Doubles are all pixels on points with multiple pixels.
        for (k = 0, len2 = ref3.length; k < len2; k++) {
          point = ref3[k];
          if (point.pixels.length > 1) {
            ref4 = point.pixels;
            for (l = 0, len3 = ref4.length; l < len3; l++) {
              pixel = ref4[l];
              if (indexOf.call(this._doubles, pixel) < 0) {
                this._doubles[optionsHash].push(pixel);
              }
            }
          }
        }
      }
      return this._doubles[optionsHash];
    }
    getCorners(pixelArtEvaluationProperty) {
      var edgeSegment, edgeSegmentIndex, foundIntersection, i, j, k, len, len1, nextEdgeSegment, options, optionsHash, pixel, point, pointIndexOffset, ref, ref1;
      options = PAE._getEvaluationOptions(pixelArtEvaluationProperty).pixelPerfectLines.corners;
      optionsHash = AP.HashFunctions.getObjectHash(options, AP.HashFunctions.circularShift5);
      if (this._corners == null) {
        this._corners = {};
      }
      if (this._corners[optionsHash]) {
        return this._corners[optionsHash];
      }
      this._corners[optionsHash] = [];
      ref = this.edgeSegments;

      // Corners are pixels at the point between two consecutive axis-aligned edge segments that are not a side-step.
      for (edgeSegmentIndex = i = 0, len = ref.length; i < len; edgeSegmentIndex = ++i) {
        edgeSegment = ref[edgeSegmentIndex];
        if (!!edgeSegment.isSideStep) {
          continue;
        }
        if (!(nextEdgeSegment = this.getEdgeSegment(edgeSegmentIndex + 1))) {
          break;
        }
        if (nextEdgeSegment.isSideStep) {
          continue;
        }
        if (!(edgeSegment.edge.isAxisAligned && nextEdgeSegment.edge.isAxisAligned)) {
          continue;
        }
        if (edgeSegment.edge === nextEdgeSegment.edge) {
          continue;
        }

        // Ignore corners neighboring intersections with other lines.
        foundIntersection = false;
        for (pointIndexOffset = j = -1; j <= 1; pointIndexOffset = ++j) {
          point = this.getPoint(edgeSegment.endPointIndex + pointIndexOffset);
          // Note: We want to check for multiple neighbors and not lines
          // to catch places where double lines connect to outlines.
          if (point.allNeighbors.length > 2) {
            foundIntersection = true;
            break;
          }
        }
        if (foundIntersection) {
          continue;
        }
        if (options.ignoreStraightLineCorners) {
          if (!(this.isPointPartCurve(edgeSegment.endPointIndex) && this.isPointPartCurve(edgeSegment.endPointIndex - 1) && this.isPointPartCurve(edgeSegment.endPointIndex + 1))) {
            // Ignore corners between straight lines, we will assume they are intentional.
            continue;
          }
        }
        point = this.getPoint(edgeSegment.endPointIndex);
        ref1 = point.pixels;
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          pixel = ref1[k];
          if (indexOf.call(this._corners, pixel) < 0) {
            this._corners[optionsHash].push(pixel);
          }
        }
      }
      return this._corners[optionsHash];
    }
    getInnerPoints() {
      if (this._innerPoints) {
        return this._innerPoints;
      }
      this._innerPoints = _.filter(this.points, function (point) {
        return point.neighbors.length === 2;
      });
      return this._innerPoints;
    }
    getRightMostPoint() {
      var i, len, point, ref, rightMostPoint;
      rightMostPoint = this.points[0];
      ref = this.points.slice(1);
      for (i = 0, len = ref.length; i < len; i++) {
        point = ref[i];
        if (point.x > rightMostPoint.x) {
          rightMostPoint = point;
        }
      }
      return rightMostPoint;
    }
    getPartsForPixel(pixel) {
      var i, len, part, ref, results;
      ref = this.parts;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        if (part.hasPixel(pixel)) {
          results.push(part);
        }
      }
      return results;
    }
    getEdgeSegment(index) {
      if (this.isClosed) {
        return this.edgeSegments[_.modulo(index, this.edgeSegments.length)];
      } else {
        return this.edgeSegments[index];
      }
    }
    getPoint(index) {
      if (this.isClosed) {
        return this.points[_.modulo(index, this.points.length)];
      } else {
        return this.points[index];
      }
    }
    getPart(index) {
      if (this.isClosed) {
        return this.parts[_.modulo(index, this.parts.length)];
      } else {
        return this.parts[index];
      }
    }
    isPointPartCurve(index) {
      if (this.isClosed) {
        return this.pointPartIsCurve[_.modulo(index, this.points.length)];
      } else {
        return this.pointPartIsCurve[index];
      }
    }
    assignPoint(point) {
      let end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (indexOf.call(this.points, point) >= 0) {
        throw new AE.ArgumentException("The point is already assigned to this line.", point, this);
      }
      if (end) {
        this.points.push(point);
      } else {
        this.points.unshift(point);
      }
      return this._cornerPoints = null;
    }
    assignCore(core) {
      if (this.core) {
        throw new AE.ArgumentException("A core is already assigned to this line.", core, this);
      }
      return this.core = core;
    }
    unassignPoint(point) {
      if (indexOf.call(this.points, point) < 0) {
        throw new AE.ArgumentException("The point is not assigned to this line.", point, this);
      }
      return _.pull(this.points, point);
    }
    unassignCore(core) {
      if (core !== this.core) {
        throw new AE.ArgumentException("The core is not assigned to this line.", core, this);
      }
      return this.core = null;
    }
    addPixel(pixel) {
      this.pixels.push(pixel);
      pixel.assignLine(this);
      return this._jaggies = null;
    }
    fillFromPoints(pointA, pointB) {
      // Start the line with these two points.
      this._addExpansionPoint(pointA);
      this._addExpansionPoint(pointB);
      // Now expand in both directions as far as you can.
      this._expandLine(pointA, pointB, point => {
        return this._addExpansionPoint(point);
      });
      return this._expandLine(pointB, pointA, point => {
        return this._addExpansionPoint(point, false);
      });
    }
    _expandLine(previousPoint, currentPoint, operation) {
      var nextPoint;
      while (true) {
        // Stop when we get to end segments or junctions.
        if (currentPoint.neighbors.length !== 2) {
          return;
        }
        nextPoint = currentPoint.neighbors[0] === previousPoint ? currentPoint.neighbors[1] : currentPoint.neighbors[0];
        // Stop if we run into our own start/end, which makes for a closed line.
        if (nextPoint === this.points[0] || nextPoint === this.points[this.points.length - 1]) {
          this.isClosed = true;
          return;
        }
        operation(nextPoint);
        previousPoint = currentPoint;
        currentPoint = nextPoint;
      }
    }
    _addExpansionPoint(point, end) {
      var i, len, pixel, ref, results;
      this.assignPoint(point, end);
      point.assignLine(this);
      ref = point.pixels;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        pixel = ref[i];
        if (indexOf.call(this.pixels, pixel) < 0) {
          results.push(this.addPixel(pixel));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
    getCentralSegmentAveragePointIndex(startSegmentIndex) {
      let endSegmentIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : startSegmentIndex;
      var averageSegmentIndex, centralSegments;
      averageSegmentIndex = (startSegmentIndex + endSegmentIndex) / 2;
      centralSegments = [this.getEdgeSegment(Math.floor(averageSegmentIndex)), this.getEdgeSegment(Math.ceil(averageSegmentIndex))];
      return (centralSegments[0].endPointIndex + centralSegments[1].startPointIndex) / 2;
    }
    getCentralSegmentPosition(startSegmentIndex) {
      let endSegmentIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : startSegmentIndex;
      var averagePointIndex, centralPoints;
      averagePointIndex = this.getCentralSegmentAveragePointIndex(startSegmentIndex, endSegmentIndex);
      centralPoints = [this.getPoint(Math.floor(averagePointIndex)), this.getPoint(Math.ceil(averagePointIndex))];
      return {
        x: (centralPoints[0].x + centralPoints[1].x) / 2,
        y: (centralPoints[0].y + centralPoints[1].y) / 2
      };
    }
    isLineCurveBetweenEdgeSegments(startEdgeSegmentIndex, endEdgeSegmentIndex) {
      return this._isLineCurveBetweenEdgeSegmentsValue(startEdgeSegmentIndex, endEdgeSegmentIndex, true);
    }
    isLineStraightBetweenEdgeSegments(startEdgeSegmentIndex, endEdgeSegmentIndex) {
      return this._isLineCurveBetweenEdgeSegmentsValue(startEdgeSegmentIndex, endEdgeSegmentIndex, false);
    }
    _isLineCurveBetweenEdgeSegmentsValue(startEdgeSegmentIndex, endEdgeSegmentIndex, value) {
      var endEdgeSegment, endPointIndex, i, pointIndex, ref, ref1, startEdgeSegment, startPointIndex;
      startEdgeSegment = this.getEdgeSegment(startEdgeSegmentIndex);
      endEdgeSegment = this.getEdgeSegment(endEdgeSegmentIndex);
      startPointIndex = startEdgeSegment.startPointIndex;
      endPointIndex = endEdgeSegment.endPointIndex;
      for (pointIndex = i = ref = startPointIndex, ref1 = endPointIndex; ref <= ref1 ? i <= ref1 : i >= ref1; pointIndex = ref <= ref1 ? ++i : --i) {
        if (this.isPointPartCurve(pointIndex) !== value) {
          return false;
        }
      }
      return true;
    }
  }
  ;
  Line.WidthType = {
    Thin: 'Thin',
    Thick: 'Thick',
    Wide: 'Wide',
    Varying: 'Varying',
    Outline: 'Outline'
  };
  Line.WidthConsistency = {
    Consistent: 'Consistent',
    Varying: 'Varying'
  };
  return Line;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line-addoutlinepoints.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line-addoutlinepoints.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.prototype.addOutlinePoints = function (core, startingPoint) {
  var currentPoint, emptySpots, getEmptySpots, i, len, neighborsOnOutline, nextPoint, pixel, point, previousPoint, ref, results;
  this.assignPoint(startingPoint);
  startingPoint.assignLine(this);
  previousPoint = startingPoint;
  currentPoint = _.find(startingPoint.neighbors, point => {
    return point.pixels.length === 1 && indexOf.call(point.pixels[0].outlineCores, core) >= 0;
  });
  this.assignPoint(currentPoint);
  currentPoint.assignLine(this);
  this.isClosed = true;
  getEmptySpots = point => {
    var emptySpots;
    emptySpots = [];
    if (!this.layer.getPixel(point.x - 1, point.y)) {
      emptySpots.push({
        x: point.x - 1,
        y: point.y
      });
    }
    if (!this.layer.getPixel(point.x + 1, point.y)) {
      emptySpots.push({
        x: point.x + 1,
        y: point.y
      });
    }
    if (!this.layer.getPixel(point.x, point.y - 1)) {
      emptySpots.push({
        x: point.x,
        y: point.y - 1
      });
    }
    if (!this.layer.getPixel(point.x, point.y + 1)) {
      emptySpots.push({
        x: point.x,
        y: point.y + 1
      });
    }
    return emptySpots;
  };
  while (true) {
    if (startingPoint !== previousPoint && indexOf.call(currentPoint.neighbors, startingPoint) >= 0) {
      // Complete the line when we've reached the starting point again.
      break;
    }
    neighborsOnOutline = _.filter(currentPoint.neighbors, point => {
      var outlinePixel;
      // Only include points on the same outline.
      if (!(outlinePixel = point.getOutlinePixel())) {
        return;
      }
      return indexOf.call(outlinePixel.outlineCores, core) >= 0;
    });
    if (neighborsOnOutline.length > 2) {
      // There are multiple neighbors, so we should attempt to continue the outline around the previous nearby empty spot.
      emptySpots = getEmptySpots(previousPoint);
      _.remove(neighborsOnOutline, point => {
        var i, len, neighborEmptySpot, ref;
        ref = getEmptySpots(point);
        // For this point to be eligible, it needs to share an empty spot with the current point.
        for (i = 0, len = ref.length; i < len; i++) {
          neighborEmptySpot = ref[i];
          if (_.find(emptySpots, emptySpot => {
            return emptySpot.x === neighborEmptySpot.x && emptySpot.y === neighborEmptySpot.y;
          })) {
            return false;
          }
        }
        return true;
      });
      if (neighborsOnOutline.length > 2) {
        console.error("Couldn't find a single point that would continue the inner outline around the nearest empty spots.");
        this.isClosed = false;
        break;
      }
    }
    nextPoint = _.find(neighborsOnOutline, point => {
      return point !== previousPoint;
    });
    if (!nextPoint) {
      console.error("Could not find the next point and close the outline.", currentPoint, this);
      this.isClosed = false;
      break;
    }
    if (indexOf.call(this.points, nextPoint) < 0) {
      this.assignPoint(nextPoint);
    }
    if (indexOf.call(nextPoint.lines, this) < 0) {
      nextPoint.assignLine(this);
    }
    previousPoint = currentPoint;
    currentPoint = nextPoint;
  }
  ref = this.points;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    point = ref[i];
    results.push(function () {
      var j, len1, ref1, results1;
      ref1 = point.pixels;
      results1 = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        pixel = ref1[j];
        if (indexOf.call(this.pixels, pixel) < 0) {
          results1.push(this.addPixel(pixel));
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    }.call(this));
  }
  return results;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line-classifylineparts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line-classifylineparts.coffee                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, PAA, PAE, edgeSegmentMinPointLengthForCorner, edgeVectors, getEdgeVector;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
edgeVectors = {};
getEdgeVector = function (x, y) {
  if (edgeVectors[x] == null) {
    edgeVectors[x] = {};
  }
  if (!edgeVectors[x][y]) {
    edgeVectors[x][y] = new THREE.Vector2(x, y);
    edgeVectors[x][y].isAxisAligned = x === 0 || y === 0;
  }
  return edgeVectors[x][y];
};
edgeSegmentMinPointLengthForCorner = 3;
PAE.Line.prototype.classifyLineParts = function () {
  var angle, angleAfter, currentEdgeSegment, dx, dy, edge, edgeIndex, edgeSegment, edgeSegmentAfter, edgeSegmentAfter2, edgeSegmentAfterIsLong, edgeSegmentBefore, edgeSegmentIndex, edgeSegmentIsLong, endPointIndex, i, index, j, k, l, len, len1, len2, len3, len4, m, minPointLength, nextPoint, point, ref, ref1, ref2, ref3, ref4, startPointIndex;
  ref = this.points;
  // Create edges.
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    point = ref[index];
    nextPoint = this.points[index + 1];
    if (!nextPoint) {
      if (!this.isClosed) {
        break;
      }
      nextPoint = this.points[0];
    }
    dx = nextPoint.x - point.x;
    dy = nextPoint.y - point.y;
    this.edges.push(getEdgeVector(dx, dy));
  }

  // Shift points in closed lines to consolidate same edges at the ends.
  if (this.isClosed) {
    while (this.edges[0] === this.edges[this.edges.length - 1]) {
      this.points.push(this.points.shift());
      this.edges.push(this.edges.shift());
    }
  }

  // Create edge segments.
  currentEdgeSegment = null;
  ref1 = this.edges;
  for (edgeIndex = j = 0, len1 = ref1.length; j < len1; edgeIndex = ++j) {
    edge = ref1[edgeIndex];
    if (edge !== (currentEdgeSegment != null ? currentEdgeSegment.edge : void 0)) {
      if (currentEdgeSegment != null) {
        this.edgeSegments.push(currentEdgeSegment);
      }
      currentEdgeSegment = {
        edge: edge,
        count: 0,
        startPointIndex: edgeIndex,
        endPointIndex: edgeIndex,
        clockwise: {
          before: null,
          after: null
        },
        curveClockwise: {
          before: null,
          after: null
        },
        corner: {
          before: false,
          after: false
        }
      };
    }
    currentEdgeSegment.count++;
    currentEdgeSegment.endPointIndex++;
  }
  this.edgeSegments.push(currentEdgeSegment);
  ref2 = this.edgeSegments;

  // Analyze edge segments.
  for (edgeSegmentIndex = k = 0, len2 = ref2.length; k < len2; edgeSegmentIndex = ++k) {
    edgeSegment = ref2[edgeSegmentIndex];
    edgeSegmentBefore = this.getEdgeSegment(edgeSegmentIndex - 1);
    edgeSegmentAfter = this.getEdgeSegment(edgeSegmentIndex + 1);
    edgeSegment.hasPointSegment = {
      before: !edgeSegment.edge.isAxisAligned && !(edgeSegmentBefore != null ? edgeSegmentBefore.edge.isAxisAligned : void 0),
      on: edgeSegment.edge.isAxisAligned || edgeSegment.count > 1,
      after: !edgeSegment.edge.isAxisAligned && !(edgeSegmentAfter != null ? edgeSegmentAfter.edge.isAxisAligned : void 0)
    };
    startPointIndex = edgeSegment.startPointIndex;
    endPointIndex = edgeSegment.endPointIndex;
    if (edgeSegment.edge.isAxisAligned) {
      // Axis-aligned edge segments create 1 multiple-point segment.
      edgeSegment.pointSegmentsCount = 1;
      edgeSegment.pointSegmentLength = endPointIndex - startPointIndex + 1;
      // Store how long the segment is if we're not making it shorter because of pixel sharing.
      edgeSegment.externalPointSegmentLength = edgeSegment.pointSegmentLength;

      // If we're coming from an axis-aligned segment, don't count the same point twice.
      // We either need to let the previous segment count for our starting pixel or us take it away from them.
      if (edgeSegmentBefore != null ? edgeSegmentBefore.edge.isAxisAligned : void 0) {
        if (edgeSegmentBefore.pointSegmentLength === 1) {
          // Capture the single point of side-step segments.
          edgeSegmentBefore.pointSegmentsCount = 0;
          edgeSegmentBefore.hasPointSegment.on = false;
        } else {
          edgeSegment.pointSegmentLength--;
          startPointIndex++;
        }
      }
    } else {
      if (!edgeSegment.hasPointSegment.before) {
        // Diagonal edge segments create multiple 1-point segments.
        startPointIndex++;
      }
      if (!edgeSegment.hasPointSegment.after) {
        endPointIndex--;
      }
      if (startPointIndex > endPointIndex) {
        startPointIndex = null;
        endPointIndex = null;
      }
      edgeSegment.pointSegmentsCount = startPointIndex != null ? endPointIndex - startPointIndex + 1 : 0;
      edgeSegment.pointSegmentLength = 1;
      edgeSegment.externalPointSegmentLength = 1;
    }
    edgeSegment.pointSegmentsStartPointIndex = startPointIndex;
    edgeSegment.pointSegmentsEndPointIndex = endPointIndex;
    edgeSegment.pointsCount = edgeSegment.pointSegmentsCount * edgeSegment.pointSegmentLength;
    angle = edgeSegment.edge.angle();
    angleAfter = edgeSegmentAfter != null ? edgeSegmentAfter.edge.angle() : void 0;
    edgeSegment.clockwise.after = edgeSegmentAfter == null || edgeSegment.edge === edgeSegmentAfter.edge ? null : _.angleDifference(angle, angleAfter) < 0;
    if (edgeSegmentAfter != null) {
      edgeSegmentAfter.clockwise.before = edgeSegment.clockwise.after;
    }
    edgeSegment.curveClockwise.after = edgeSegment.clockwise.after;
    if (edgeSegmentAfter != null) {
      edgeSegmentAfter.curveClockwise.before = edgeSegmentAfter.clockwise.before;
    }
  }
  ref3 = this.edgeSegments;

  // Detect corners.
  for (edgeSegmentIndex = l = 0, len3 = ref3.length; l < len3; edgeSegmentIndex = ++l) {
    edgeSegment = ref3[edgeSegmentIndex];
    if (!(edgeSegmentAfter = this.getEdgeSegment(edgeSegmentIndex + 1))) {
      continue;
    }
    angle = edgeSegment.edge.angle();
    angleAfter = edgeSegmentAfter.edge.angle();
    if (_.angleDistance(angle, angleAfter) > 1) {
      edgeSegment.corner.after = true;
    } else {
      minPointLength = edgeSegmentMinPointLengthForCorner;
      edgeSegmentIsLong = edgeSegment.pointSegmentLength >= minPointLength || edgeSegment.pointSegmentsCount >= minPointLength;
      edgeSegmentAfterIsLong = edgeSegmentAfter.pointSegmentLength >= minPointLength || edgeSegmentAfter.pointSegmentsCount >= minPointLength;
      edgeSegment.corner.after = edgeSegmentIsLong && edgeSegmentAfterIsLong;
    }
    edgeSegmentAfter.corner.before = edgeSegment.corner.after;
  }
  if (!this.isClosed) {
    _.first(this.edgeSegments).corner.before = true;
    _.last(this.edgeSegments).corner.after = true;
  }
  ref4 = this.edgeSegments;

  // Detect side-step segments.
  for (edgeSegmentIndex = m = 0, len4 = ref4.length; m < len4; edgeSegmentIndex = ++m) {
    edgeSegment = ref4[edgeSegmentIndex];
    if (!edgeSegment.edge.isAxisAligned) {
      continue;
    }
    if (!(edgeSegmentAfter = this.getEdgeSegment(edgeSegmentIndex + 1))) {
      continue;
    }
    if (edgeSegmentAfter.count !== 1) {
      continue;
    }
    if (!(edgeSegmentAfter2 = this.getEdgeSegment(edgeSegmentIndex + 2))) {
      continue;
    }
    if (edgeSegmentAfter2.edge !== edgeSegment.edge) {
      continue;
    }
    edgeSegmentAfter.isSideStep = true;

    // We have two neighboring point segments in the same direction so the curvature direction is dependent on the change of repetition count.
    if (edgeSegmentAfter2.count === edgeSegment.count) {
      // This is a straight segment so no direction can be determined.
      edgeSegment.curveClockwise.after = null;
    } else if (edgeSegmentAfter2.count > edgeSegment.count) {
      // The repeating count is increasing so the curve curves in the direction towards the after segment.
      edgeSegment.curveClockwise.after = edgeSegmentAfter2.curveClockwise.before;
    }
    edgeSegmentAfter.curveClockwise.before = edgeSegment.curveClockwise.after;
    edgeSegmentAfter.curveClockwise.after = edgeSegment.curveClockwise.after;
    edgeSegmentAfter2.curveClockwise.before = edgeSegment.curveClockwise.after;

    // Side-step segments can't be corners.
    edgeSegment.corner.after = false;
    edgeSegmentAfter.corner.before = false;
    edgeSegmentAfter.corner.after = false;
    edgeSegmentAfter2.corner.before = false;
  }

  // Create line parts.
  this._detectStraightLineParts();
  this._detectCurveParts();
  this._createParts();

  // Analyze curvature.
  return this._analyzeCurvature();
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line-detectstraightlineparts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line-detectstraightlineparts.coffee            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, PAA, PAE;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.prototype._detectStraightLineParts = function () {
  var addStraightLinePart, determineExtraCount, edgeSegment, endSegmentIndex, endStraightLine, i, lastStraightLineEndSegmentIndex, lastStraightLineStartSegmentIndex, mainPointsCount1, mainPointsCount2, nextEdgeSegment, ref, ref1, results, secondNextEdgeSegment, sideEdgeClockwise, startEdgeSegment, startSegmentIndex;
  lastStraightLineStartSegmentIndex = null;
  lastStraightLineEndSegmentIndex = null;
  addStraightLinePart = (startSegmentIndex, endSegmentIndex) => {
    var straightLine;
    // Don't add a straight line that is already contained within the last straight line.
    if (lastStraightLineStartSegmentIndex != null && startSegmentIndex >= lastStraightLineStartSegmentIndex && endSegmentIndex <= lastStraightLineEndSegmentIndex) {
      return;
    }
    lastStraightLineStartSegmentIndex = startSegmentIndex;
    lastStraightLineEndSegmentIndex = endSegmentIndex;
    straightLine = new PAE.Line.Part.StraightLine(this, startSegmentIndex, endSegmentIndex);
    this.potentialParts.push(straightLine);
    return this.potentialStraightLineParts.push(straightLine);
  };
  results = [];
  for (startSegmentIndex = i = 0, ref = this.edgeSegments.length; 0 <= ref ? i < ref : i > ref; startSegmentIndex = 0 <= ref ? ++i : --i) {
    startEdgeSegment = this.edgeSegments[startSegmentIndex];
    if (!startEdgeSegment.pointsCount) {
      // Start on edge segments that introduce point segments.
      continue;
    }
    sideEdgeClockwise = startEdgeSegment.clockwise.after;
    // Straight lines are composed of equally sized segments, but allow for 1 count difference for intermediary lines,
    // so we need two possible main counts. Further, the starting and ending segment can be of any length shorter than
    // the main count.
    mainPointsCount1 = null;
    mainPointsCount2 = null;
    endSegmentIndex = startSegmentIndex;
    while (true) {
      edgeSegment = this.getEdgeSegment(endSegmentIndex);
      if (edgeSegment.corner.after) {
        // Stop if we reached a corner.
        break;
      }
      if (!(nextEdgeSegment = this.getEdgeSegment(endSegmentIndex + 1))) {
        // Find a side-step segment.
        break;
      }
      if (nextEdgeSegment.count !== 1) {
        // If we've started on a side-step segment, we can move on.
        if (endSegmentIndex === startSegmentIndex && edgeSegment.count === 1) {
          endSegmentIndex++;

          // Pretend as we're starting fresh from the next segment.
          startEdgeSegment = this.getEdgeSegment(endSegmentIndex);
          sideEdgeClockwise = !startEdgeSegment.clockwise.before;
          if (startEdgeSegment.clockwise.after !== sideEdgeClockwise) {
            break;
          }
          continue;
        }
        if (mainPointsCount1 === 1 && nextEdgeSegment.pointsCount === 2) {
          // The final segment can be a longer if it's not really a side-step as we were only on 1-length segments so far.
          endSegmentIndex++;
        }
        break;
      }
      if (!(startEdgeSegment.edge.isAxisAligned || nextEdgeSegment.edge.isAxisAligned)) {
        // Prevent diagonal to diagonal segments (most likely 90 degrees on a 45 degree diagonal).
        break;
      }
      // See if we have a next segment going into the right direction after this.
      endStraightLine = false;
      if (!(secondNextEdgeSegment = this.getEdgeSegment(endSegmentIndex + 2))) {
        endStraightLine = true;
      }
      if ((secondNextEdgeSegment != null ? secondNextEdgeSegment.edge : void 0) !== startEdgeSegment.edge) {
        endStraightLine = true;
      }
      if (endStraightLine) {
        if (nextEdgeSegment.pointSegmentsCount) {
          // Include the final side-step segment if it provides a point.
          endSegmentIndex++;
        }
        break;
      }

      // Determine how long the main (middle) parts of the diagonal are.
      determineExtraCount = false;
      if (!mainPointsCount1) {
        // We're determining the initial count.
        if (secondNextEdgeSegment.pointsCount > startEdgeSegment.pointsCount) {
          // The first element is shorter so we can consider it being the ending part.
          mainPointsCount1 = secondNextEdgeSegment.pointsCount;
        } else {
          mainPointsCount1 = startEdgeSegment.pointsCount;
          determineExtraCount = true;
        }
      } else if (!mainPointsCount2) {
        determineExtraCount = true;
      } else if ((ref1 = secondNextEdgeSegment.pointsCount) !== mainPointsCount1 && ref1 !== mainPointsCount2) {
        endStraightLine = true;
      }
      if (determineExtraCount) {
        if (secondNextEdgeSegment.pointsCount !== mainPointsCount1) {
          // The extra count can only differ by 1 from main count.
          if (Math.abs(mainPointsCount1 - secondNextEdgeSegment.pointsCount) === 1) {
            mainPointsCount2 = secondNextEdgeSegment.pointsCount;
          } else {
            endStraightLine = true;
          }
        }
      }
      if (endStraightLine) {
        // This segment is too much different than the main segment, but it could be the final part if it's shorter.
        if (secondNextEdgeSegment.pointsCount < mainPointsCount1) {
          // Allow this segment to be the end of the straight line.
          endSegmentIndex += 2;
        }
        break;
      }
      endSegmentIndex += 2;
      if (secondNextEdgeSegment.clockwise.after !== sideEdgeClockwise) {
        break;
      }
    }
    results.push(addStraightLinePart(startSegmentIndex, endSegmentIndex));
  }
  return results;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line-detectcurveparts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line-detectcurveparts.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, PAA, PAE;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.prototype._detectCurveParts = function () {
  var addCurvePart, clockwise, curve, edgeSegment, endSegmentIndex, i, j, k, len, len1, point, pointIndex, potentialCurvePart, ref, ref1, ref2, results, startEdgeSegment, startSegmentIndex;
  addCurvePart = (startSegmentIndex, endSegmentIndex) => {
    var curve, i, isClosed, len, part, ref;
    if (endSegmentIndex >= startSegmentIndex + this.edgeSegments.length) {
      endSegmentIndex = startSegmentIndex + this.edgeSegments.length - 1;
      isClosed = true;
    } else {
      isClosed = false;
      ref = this.potentialParts;

      // Don't add a curve that is already contained within another part.
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        if (startSegmentIndex >= part.startSegmentIndex && endSegmentIndex <= part.endSegmentIndex) {
          return;
        }
      }
    }
    curve = new PAE.Line.Part.Curve(this, startSegmentIndex, endSegmentIndex, null, null, isClosed);
    this.potentialParts.push(curve);
    this.potentialCurveParts.push(curve);
    return curve;
  };
  for (startSegmentIndex = i = 0, ref = this.edgeSegments.length; 0 <= ref ? i < ref : i > ref; startSegmentIndex = 0 <= ref ? ++i : --i) {
    startEdgeSegment = this.edgeSegments[startSegmentIndex];
    edgeSegment = startEdgeSegment;
    if (!edgeSegment.pointSegmentsCount) {
      // Start on edge segments that introduce point segments.
      continue;
    }
    clockwise = edgeSegment.curveClockwise.after;
    endSegmentIndex = startSegmentIndex;

    // Keep expanding until the turn of direction.
    while (clockwise === edgeSegment.curveClockwise.after || clockwise == null || edgeSegment.curveClockwise.after == null) {
      if (clockwise == null) {
        clockwise = edgeSegment.curveClockwise.after;
      }
      if (edgeSegment.corner.after) {
        // Stop if we reached a corner.
        break;
      }
      if (!(edgeSegment = this.getEdgeSegment(endSegmentIndex + 1))) {
        // Stop at the end, otherwise continue to next segment.
        break;
      }
      endSegmentIndex++;
      if (edgeSegment === startEdgeSegment) {
        break;
      }
    }
    if (clockwise == null) {
      continue;
    }
    curve = addCurvePart(startSegmentIndex, endSegmentIndex);
    if (curve != null ? curve.isClosed : void 0) {
      // No need to keep going if we found a closed curve.
      break;
    }
  }
  ref1 = this.potentialCurveParts;
  for (j = 0, len = ref1.length; j < len; j++) {
    potentialCurvePart = ref1[j];

    // Pick the most likely parts for each point.
    potentialCurvePart.calculatePointConfidence();
  }
  ref2 = this.points;
  results = [];
  for (pointIndex = k = 0, len1 = ref2.length; k < len1; pointIndex = ++k) {
    point = ref2[pointIndex];
    this.pointPartIsCurve[pointIndex] = false;
    results.push(function () {
      var l, len2, ref3, results1;
      ref3 = this.potentialCurveParts;
      results1 = [];
      for (l = 0, len2 = ref3.length; l < len2; l++) {
        potentialCurvePart = ref3[l];
        if (potentialCurvePart.pointConfidences[pointIndex]) {
          this.pointPartIsCurve[pointIndex] = true;
          break;
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    }.call(this));
  }
  return results;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line-createparts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line-createparts.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, PAA, PAE;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.prototype._createParts = function () {
  var edgeSegment, end, endPointIndex, endRangePointIndex, firstCurveStraightLineEdgePointIndex, i, j, k, l, len, len1, len2, len3, m, n, normalizedPointIndex, normalizedStartPointIndex, o, otherSegmentRangeIndex, overlayingPartIndex, p, part, partIndex, pointIndex, pointPartIsCurve, potentialStraightLinePartIndices, potentialStraightLineParts, potentialStraightLineSegmentRanges, ref, ref1, ref2, ref3, ref4, ref5, remove, results, segmentIndex, segmentRange, segmentRangeIndex, shiftIndex, start, startPointIndex, startRangePointIndex, startSegmentIndex;
  if (this.isClosed) {
    // For closed lines, first determine where the first edge between a curve and a straight line is.
    firstCurveStraightLineEdgePointIndex = null;
    for (pointIndex = i = 0, ref = this.points.length; 0 <= ref ? i < ref : i > ref; pointIndex = 0 <= ref ? ++i : --i) {
      if (this.isPointPartCurve(pointIndex) !== this.isPointPartCurve(pointIndex + 1)) {
        firstCurveStraightLineEdgePointIndex = pointIndex + 1;
        break;
      }
    }

    // If we didn't find an edge at all it means all parts are the same.
    if (firstCurveStraightLineEdgePointIndex === null) {
      if (this.isPointPartCurve(0)) {
        // For curves, we can create a closed one.
        this.parts.push(new PAE.Line.Part.Curve(this, 0, this.edgeSegments.length - 1, 0, this.points.length - 1, true));
        return;
      } else {
        // Straight polygons can be created from the start forward.
        if (firstCurveStraightLineEdgePointIndex == null) {
          firstCurveStraightLineEdgePointIndex = 0;
        }
      }
    }
  } else {
    // For open lines, we can simply start at the beginning since there will not be any wrap around.
    firstCurveStraightLineEdgePointIndex = 0;
  }
  pointPartIsCurve = null;
  startSegmentIndex = null;
  startPointIndex = null;
  normalizedStartPointIndex = null;
  segmentIndex = 0;
  edgeSegment = this.getEdgeSegment(0);
  startRangePointIndex = firstCurveStraightLineEdgePointIndex;
  endRangePointIndex = firstCurveStraightLineEdgePointIndex + this.points.length - 1;
  for (pointIndex = j = ref1 = startRangePointIndex, ref2 = endRangePointIndex; ref1 <= ref2 ? j <= ref2 : j >= ref2; pointIndex = ref1 <= ref2 ? ++j : --j) {
    normalizedPointIndex = pointIndex % this.points.length;
    while (normalizedPointIndex > edgeSegment.endPointIndex || normalizedPointIndex < edgeSegment.startPointIndex) {
      segmentIndex++;
      edgeSegment = this.getEdgeSegment(segmentIndex);
    }
    if (startSegmentIndex == null) {
      startSegmentIndex = segmentIndex;
    }
    if (startPointIndex == null) {
      startPointIndex = pointIndex;
    }
    if (normalizedStartPointIndex == null) {
      normalizedStartPointIndex = normalizedPointIndex;
    }
    if (pointPartIsCurve == null) {
      pointPartIsCurve = this.isPointPartCurve(pointIndex);
    }
    if (pointIndex !== endRangePointIndex && this.isPointPartCurve(pointIndex + 1) === pointPartIsCurve) {
      // Keep expanding if we'll be on the same type of a part.
      continue;
    }
    if (pointPartIsCurve) {
      this.parts.push(new PAE.Line.Part.Curve(this, startSegmentIndex, segmentIndex, normalizedStartPointIndex, normalizedPointIndex, false));
    } else {
      // Find which straight line parts overlay the segment.
      potentialStraightLinePartIndices = function () {
        var k, len, ref3, results;
        ref3 = this.potentialStraightLineParts;
        results = [];
        for (partIndex = k = 0, len = ref3.length; k < len; partIndex = ++k) {
          part = ref3[partIndex];
          if (part.overlaysPointRange(normalizedStartPointIndex, normalizedPointIndex)) {
            results.push(partIndex);
          }
        }
        return results;
      }.call(this);
      if (this.isClosed) {
        // Rotate the parts until the first one is the earliest one in the sequence.
        for (overlayingPartIndex = k = 1, ref3 = potentialStraightLinePartIndices.length; 1 <= ref3 ? k < ref3 : k > ref3; overlayingPartIndex = 1 <= ref3 ? ++k : --k) {
          if (potentialStraightLinePartIndices[overlayingPartIndex] !== potentialStraightLinePartIndices[overlayingPartIndex - 1] + 1) {
            // We found the gap, so this part must be the starting one.
            for (shiftIndex = l = 0, ref4 = overlayingPartIndex; 0 <= ref4 ? l < ref4 : l > ref4; shiftIndex = 0 <= ref4 ? ++l : --l) {
              potentialStraightLinePartIndices.push(potentialStraightLinePartIndices.shift());
            }
            break;
          }
        }
      }
      potentialStraightLineParts = function () {
        var len, m, results;
        results = [];
        for (m = 0, len = potentialStraightLinePartIndices.length; m < len; m++) {
          partIndex = potentialStraightLinePartIndices[m];
          results.push(this.potentialStraightLineParts[partIndex]);
        }
        return results;
      }.call(this);
      potentialStraightLineSegmentRanges = [];

      // Remove segments that aren't in the straight-line window.
      for (partIndex = m = 0, len = potentialStraightLineParts.length; m < len; partIndex = ++m) {
        part = potentialStraightLineParts[partIndex];
        if (part.endPointIndex > part.startPointIndex) {
          startPointIndex = _.modulo(Math.max(part.startPointIndex, normalizedStartPointIndex - 1), this.points.length);
        } else {
          startPointIndex = _.modulo(normalizedStartPointIndex - 1, this.points.length);
        }
        endPointIndex = _.modulo(Math.min(part.endPointIndex, normalizedPointIndex + 1), this.points.length);
        start = part.startSegmentIndex;
        end = part.endSegmentIndex;
        while (!this._edgeSegmentOverlaysPointRange(start, startPointIndex, endPointIndex)) {
          start++;
        }
        while (!this._edgeSegmentOverlaysPointRange(end, startPointIndex, endPointIndex)) {
          end--;
        }

        // Prevent the same segment range to be added twice due to wrap around in closed lines.
        if (start >= this.edgeSegments.length) {
          start %= this.edgeSegments.length;
          end %= this.edgeSegments.length;
        }
        if (_.find(potentialStraightLineSegmentRanges, segmentRange => {
          return segmentRange.start === start && segmentRange.end === end;
        })) {
          continue;
        }
        potentialStraightLineSegmentRanges.push({
          start,
          end
        });
      }

      // Remove lines that are included in other lines.
      segmentRangeIndex = 0;
      while (segmentRangeIndex < potentialStraightLineSegmentRanges.length) {
        remove = false;
        for (otherSegmentRangeIndex = n = 0, len1 = potentialStraightLineSegmentRanges.length; n < len1; otherSegmentRangeIndex = ++n) {
          segmentRange = potentialStraightLineSegmentRanges[otherSegmentRangeIndex];
          if (otherSegmentRangeIndex !== segmentRangeIndex) {
            if (this._segmentRangeIsIncludedInSegmentRange(potentialStraightLineSegmentRanges[segmentRangeIndex], segmentRange)) {
              remove = true;
              break;
            }
          }
        }
        if (remove) {
          potentialStraightLineSegmentRanges.splice(segmentRangeIndex, 1);
        } else {
          segmentRangeIndex++;
        }
      }
      for (o = 0, len2 = potentialStraightLineSegmentRanges.length; o < len2; o++) {
        segmentRange = potentialStraightLineSegmentRanges[o];
        this.parts.push(new PAE.Line.Part.StraightLine(this, segmentRange.start, segmentRange.end));
      }
    }
    startSegmentIndex = null;
    startPointIndex = null;
    normalizedStartPointIndex = null;
    pointPartIsCurve = null;
  }
  ref5 = this.parts;
  results = [];
  for (partIndex = p = 0, len3 = ref5.length; p < len3; partIndex = ++p) {
    part = ref5[partIndex];
    results.push(part.setNeighbors(this.getPart(partIndex - 1), this.getPart(partIndex + 1)));
  }
  return results;
};
PAE.Line.prototype._segmentRangeIsIncludedInSegmentRange = function (segmentRange, otherSegmentRange) {
  var i, len, otherSegmentRangeParts, segmentRangePart, segmentRangeParts;
  if (this.isClosed) {
    // Split segment ranges into parts that are before and after the wrap around.
    segmentRangeParts = this._wrapSegmentRangeIntoParts(segmentRange);
    otherSegmentRangeParts = this._wrapSegmentRangeIntoParts(otherSegmentRange);

    // For the segment range to be included in the other segment range, each of its
    // parts need to be included in one of the parts of the other segment range.
    for (i = 0, len = segmentRangeParts.length; i < len; i++) {
      segmentRangePart = segmentRangeParts[i];
      if (!_.find(otherSegmentRangeParts, otherSegmentRangePart => {
        return this._normalizedSegmentRangeIsIncludedInSegmentRange(segmentRangePart, otherSegmentRangePart);
      })) {
        return false;
      }
    }
    return true;
  } else {
    return this._normalizedSegmentRangeIsIncludedInSegmentRange(segmentRange, otherSegmentRange);
  }
};
PAE.Line.prototype._normalizedSegmentRangeIsIncludedInSegmentRange = function (segmentRange, otherSegmentRange) {
  return segmentRange.start >= otherSegmentRange.start && segmentRange.end <= otherSegmentRange.end;
};
PAE.Line.prototype._wrapSegmentRangeIntoParts = function (segmentRange) {
  if (segmentRange.end >= this.edgeSegments.length) {
    return [{
      start: segmentRange.start,
      end: this.edgeSegments.length - 1
    }, {
      start: 0,
      end: segmentRange.end - this.edgeSegments.length
    }];
  } else {
    return [segmentRange];
  }
};
PAE.Line.prototype._edgeSegmentOverlaysPointRange = function (segmentIndex, startPointIndex, endPointIndex) {
  var pointCount, segment;
  segment = this.getEdgeSegment(segmentIndex);
  if (!segment.pointSegmentsCount) {
    return false;
  }
  pointCount = this.points.length;
  startPointIndex = startPointIndex % pointCount;
  endPointIndex = endPointIndex % pointCount;
  if (endPointIndex >= startPointIndex) {
    return startPointIndex <= segment.endPointIndex && endPointIndex >= segment.startPointIndex;
  } else {
    return startPointIndex <= segment.endPointIndex || endPointIndex >= segment.startPointIndex;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line-analyzecurvature.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line-analyzecurvature.coffee                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, PAA, PAE;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.prototype._analyzeCurvature = function () {
  var addCurvatureCurvePart, clockwise, currentCurveClockwise, edgeSegment, edgeSegmentIndex, endPointIndex, endSegmentIndex, i, inflectionAreaEndEdgeSegmentIndex, inflectionAreaStartEdgeSegmentIndex, inflectionPoint, j, k, len, ref, ref1, ref2, segmentIndex, startPointIndex, startSegmentIndex;
  // Detect inflection points.
  currentCurveClockwise = null;
  inflectionAreaStartEdgeSegmentIndex = null;
  inflectionAreaEndEdgeSegmentIndex = null;
  for (edgeSegmentIndex = i = 0, ref = this.edgeSegments.length; 0 <= ref ? i < ref : i > ref; edgeSegmentIndex = 0 <= ref ? ++i : --i) {
    edgeSegment = this.getEdgeSegment(edgeSegmentIndex);

    // Set initial curvature.
    if (currentCurveClockwise == null) {
      currentCurveClockwise = edgeSegment.curveClockwise.after;
    }
    if (currentCurveClockwise == null) {
      continue;
    }
    if (edgeSegment.curveClockwise.after == null) {
      // Continue until curvature is defined.
      continue;
    }

    // Keep searching for the start of the inflection area if we're in the area of same curvature.
    if (edgeSegment.curveClockwise.after === currentCurveClockwise) {
      // The direction after is the same, push the start of the inflection area forward.
      inflectionAreaStartEdgeSegmentIndex = edgeSegmentIndex + 1;
      continue;
    }

    // We've reached a different curvature, this is the end of the inflection area.
    inflectionAreaEndEdgeSegmentIndex = edgeSegmentIndex;
    this.inflectionPoints.push({
      // Find the point in the center of the inflection area.
      position: this.getCentralSegmentPosition(inflectionAreaStartEdgeSegmentIndex, inflectionAreaEndEdgeSegmentIndex),
      averagePointIndex: this.getCentralSegmentAveragePointIndex(inflectionAreaStartEdgeSegmentIndex, inflectionAreaEndEdgeSegmentIndex),
      inflectionArea: {
        startEdgeSegmentIndex: inflectionAreaStartEdgeSegmentIndex,
        endEdgeSegmentIndex: inflectionAreaEndEdgeSegmentIndex,
        averageEdgeSegmentIndex: (inflectionAreaStartEdgeSegmentIndex + inflectionAreaEndEdgeSegmentIndex) / 2
      }
    });
    // Continue searching for the inflection area after the current curvature starts changing.
    currentCurveClockwise = edgeSegment.curveClockwise.after;
    inflectionAreaStartEdgeSegmentIndex = edgeSegmentIndex + 1;
  }

  // Detect curves for displaying curvature changes. First, find the initial curve direction.
  for (segmentIndex = j = 0, ref1 = this.edgeSegments.length; 0 <= ref1 ? j < ref1 : j > ref1; segmentIndex = 0 <= ref1 ? ++j : --j) {
    edgeSegment = this.edgeSegments[segmentIndex];

    // Curvature curves start at changes of curvature.
    clockwise = edgeSegment.curveClockwise.after;
    if (clockwise != null) {
      break;
    }
  }
  if (clockwise == null) {
    return;
  }

  // Create curve parts between inflection points.
  addCurvatureCurvePart = (startSegmentIndex, endSegmentIndex, startPointIndex, endPointIndex, clockwise) => {
    // Fully closed curves don't have a curvature.
    if (endSegmentIndex >= startSegmentIndex + this.edgeSegments.length) {
      return;
    }
    return this.curvatureCurveParts.push(new PAE.Line.Part.Curve(this, startSegmentIndex, endSegmentIndex, startPointIndex, endPointIndex, false, clockwise));
  };
  startSegmentIndex = 0;
  startPointIndex = 0;
  ref2 = this.inflectionPoints;
  for (k = 0, len = ref2.length; k < len; k++) {
    inflectionPoint = ref2[k];
    endSegmentIndex = Math.ceil(inflectionPoint.inflectionArea.averageEdgeSegmentIndex);
    endPointIndex = Math.ceil(inflectionPoint.averagePointIndex);
    addCurvatureCurvePart(startSegmentIndex, endSegmentIndex, startPointIndex, endPointIndex, clockwise);
    startSegmentIndex = Math.floor(inflectionPoint.inflectionArea.averageEdgeSegmentIndex);
    startPointIndex = Math.floor(inflectionPoint.averagePointIndex);
    clockwise = !clockwise;
  }
  endSegmentIndex = this.edgeSegments.length - 1;
  endPointIndex = this.points.length - 1;
  addCurvatureCurvePart(startSegmentIndex, endSegmentIndex, startPointIndex, endPointIndex, clockwise);

  // Remove inflection points that are in or bordering straight areas.
  return _.remove(this.inflectionPoints, inflectionPoint => {
    return !(this.pointPartIsCurve[Math.floor(inflectionPoint.averagePointIndex)] && this.pointPartIsCurve[Math.ceil(inflectionPoint.averagePointIndex)]);
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"line-evaluate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/line-evaluate.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, PAA, PAE;
AE = Artificial.Everywhere;
AP = Artificial.Program;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.prototype.evaluate = function (pixelArtEvaluationProperty) {
  var corners, curveSmoothness, doubles, options, optionsHash, width;
  options = PAE._getEvaluationOptions(pixelArtEvaluationProperty);
  optionsHash = AP.HashFunctions.getObjectHash(options, AP.HashFunctions.circularShift5);
  if (this._evaluation == null) {
    this._evaluation = {};
  }
  if (this._evaluation[optionsHash]) {
    return this._evaluation[optionsHash];
  }
  doubles = this._analyzeDoubles(pixelArtEvaluationProperty);
  corners = this._analyzeCorners(pixelArtEvaluationProperty);
  width = this._analyzeWidth(pixelArtEvaluationProperty);
  curveSmoothness = this._analyzeCurveSmoothness(pixelArtEvaluationProperty);
  this._evaluation[optionsHash] = {
    width,
    doubles,
    corners,
    curveSmoothness
  };
  return this._evaluation[optionsHash];
};
PAE.Line.prototype._analyzeDoubles = function (pixelArtEvaluationProperty) {
  var diagonalSideStepsCount, doubles, edgeSegment, i, len, ref, sideStepScore, sideStepsCount;
  doubles = this.getDoubles(pixelArtEvaluationProperty);
  if (!doubles.length) {
    return {
      // Nothing to do if there are no doubles (non-varying width lines).
      score: 1,
      count: 0,
      pixels: []
    };
  }

  // Side-steps need to be diagonals instead of axis-aligned.
  sideStepsCount = 0;
  diagonalSideStepsCount = 0;
  ref = this.edgeSegments;
  for (i = 0, len = ref.length; i < len; i++) {
    edgeSegment = ref[i];
    if (!edgeSegment.isSideStep) {
      continue;
    }
    sideStepsCount++;
    if (!edgeSegment.edge.isAxisAligned) {
      diagonalSideStepsCount++;
    }
  }
  sideStepScore = sideStepsCount ? diagonalSideStepsCount / sideStepsCount : 1;
  return {
    score: sideStepScore,
    count: doubles.length,
    pixels: doubles
  };
};
PAE.Line.prototype._analyzeCorners = function (pixelArtEvaluationProperty) {
  var corners, edgeSegment, edgeSegmentIndex, i, len, nextEdgeSegment, ref, transitionsCount;
  corners = this.getCorners(pixelArtEvaluationProperty);
  // Count how many total transitions there were on this line so we can compare how many of these are corners.
  transitionsCount = 0;
  ref = this.edgeSegments;
  for (edgeSegmentIndex = i = 0, len = ref.length; i < len; edgeSegmentIndex = ++i) {
    edgeSegment = ref[edgeSegmentIndex];
    if (!!edgeSegment.isSideStep) {
      continue;
    }
    if (!(nextEdgeSegment = this.getEdgeSegment(edgeSegmentIndex + 1))) {
      break;
    }
    if (nextEdgeSegment.isSideStep) {
      continue;
    }
    transitionsCount++;
  }
  return {
    score: transitionsCount ? 1 - corners.length / transitionsCount : 1,
    count: corners.length,
    pixels: corners
  };
};
PAE.Line.prototype._analyzeWidth = function (pixelArtEvaluationProperty) {
  var axisAlignedCount, doubleCount, radiusCounts, score, sideStepEdgeSegments, singleCount, thickCount, thinCount;
  // Outlines don't have a width.
  if (this.core) {
    return {
      type: this.constructor.WidthType.Outline,
      score: 1
    };
  }

  // Analyze single and double points.
  radiusCounts = _.countBy(this.getInnerPoints(), 'radius');
  singleCount = radiusCounts[0.5] || 0;
  doubleCount = radiusCounts[1] || 0;
  if (doubleCount && !singleCount) {
    return {
      type: this.constructor.WidthType.Wide,
      score: 1
    };
  }
  score = Math.abs(2 * singleCount / (singleCount + doubleCount) - 1);

  // We have some single points so we need to determine if those are thin or thick.
  sideStepEdgeSegments = _.filter(this.edgeSegments, edgeSegment => {
    return edgeSegment.isSideStep;
  });
  if (sideStepEdgeSegments.length) {
    axisAlignedCount = _.countBy(sideStepEdgeSegments, edgeSegment => {
      return edgeSegment.edge.isAxisAligned;
    });
    thinCount = axisAlignedCount[false] || 0;
    thickCount = axisAlignedCount[true] || 0;
    score *= Math.abs(2 * thinCount / (thinCount + thickCount) - 1);
  }
  if (thinCount && thickCount || singleCount && doubleCount) {
    return {
      // Varying width type should have the score of 0.9 (B) or less.
      type: this.constructor.WidthType.Varying,
      score: score * 0.9
    };
  }
  return {
    type: thickCount ? this.constructor.WidthType.Thick : this.constructor.WidthType.Thin,
    score: 1
  };
};
PAE.Line.prototype._analyzeCurveSmoothness = function (pixelArtEvaluationProperty) {
  var abruptPointSegmentLengthChange, abruptPointSegmentLengthChangesCounts, abruptPointSegmentLengthChangesScore, curvePart, curveParts, curvePartsLength, endPointsScore, i, inflectionPoint, inflectionPointCounts, inflectionPoints, inflectionPointsScore, j, k, l, len, len1, len2, len3, len4, m, middlePartEndPointIndex, middlePartStartPointIndex, middlePointsScore, n, o, options, p, part, pointIndex, pointSegmentLengthChanges, pointSegmentLengthChangesAbruptIncrease, pointSegmentLengthChangesCount, ref, ref1, ref2, ref3, ref4, ref5, straightPart, straightParts, straightPartsCounts, straightPartsLength, straightPartsScore, straightPointsCount, straightPointsCountEnd, straightPointsCountMiddle, straightPointsScore;
  options = PAE._getEvaluationOptions(pixelArtEvaluationProperty).smoothCurves;

  // Nothing to do if curved parts are in the minority.
  curvePartsLength = 0;
  straightPartsLength = 0;
  ref = this.parts;
  for (i = 0, len = ref.length; i < len; i++) {
    part = ref[i];
    if (part instanceof this.constructor.Part.Curve) {
      curvePartsLength += part.points.length;
    } else {
      straightPartsLength += part.points.length;
    }
  }
  if (options.ignoreMostlyStraightLines) {
    if (!(curvePartsLength > straightPartsLength)) {
      return;
    }
  }

  // Calculate abrupt segment length changes score.
  pointSegmentLengthChangesCount = 0;
  pointSegmentLengthChangesAbruptIncrease = 0;
  abruptPointSegmentLengthChangesCounts = {
    minor: 0,
    major: 0
  };
  curveParts = _.filter(this.parts, part => {
    return part instanceof this.constructor.Part.Curve;
  });
  for (j = 0, len1 = curveParts.length; j < len1; j++) {
    curvePart = curveParts[j];
    ({
      pointSegmentLengthChanges
    } = curvePart.evaluate());
    pointSegmentLengthChangesCount += pointSegmentLengthChanges.count;
    ref1 = pointSegmentLengthChanges.abruptPointSegmentLengthChanges;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      abruptPointSegmentLengthChange = ref1[k];
      // Apply a cap on how much the increase in abruptness affects the score.
      pointSegmentLengthChangesAbruptIncrease += Math.min(3, abruptPointSegmentLengthChange.abruptIncrease);
      if (abruptPointSegmentLengthChange.abruptIncrease >= PAE.Line.Part.Curve.majorAbruptIncreaseThreshold) {
        abruptPointSegmentLengthChangesCounts.major++;
      } else {
        abruptPointSegmentLengthChangesCounts.minor++;
      }
    }
  }
  abruptPointSegmentLengthChangesScore = 1;
  if (pointSegmentLengthChangesCount) {
    // We multiply the increase by 1.2 so that a single minor abrupt change (with 2 changes) gives a score of 0.6 (D grade).
    abruptPointSegmentLengthChangesScore -= pointSegmentLengthChangesAbruptIncrease * 1.2 / pointSegmentLengthChangesCount;
  }
  // Calculate straight parts score.
  straightParts = _.filter(this.parts, part => {
    return part instanceof this.constructor.Part.StraightLine;
  });
  straightPartsCounts = {
    middle: 0,
    end: 0
  };
  for (l = 0, len3 = straightParts.length; l < len3; l++) {
    straightPart = straightParts[l];
    // End straight lines are less problematic.
    if (straightPart.isAtTheEndOfCurvedPart()) {
      straightPartsCounts.end++;
    } else if (straightPart.isInTheMiddleOfACurvedPart()) {
      straightPartsCounts.middle++;
    }
  }
  // Count how many straight points there are on the line. Note that we can't do this by finding how many
  // points the straight line parts have since those reach into the areas that are overlapped by curves.
  straightPointsCountMiddle = 0;
  straightPointsCountEnd = 0;
  middlePartStartPointIndex = 0;
  middlePartEndPointIndex = this.points.length - 1;
  for (pointIndex = m = 0, ref2 = this.points.length - 1; 0 <= ref2 ? m <= ref2 : m >= ref2; pointIndex = 0 <= ref2 ? ++m : --m) {
    if (this.pointPartIsCurve[pointIndex]) {
      break;
    }
    straightPointsCountEnd++;
    middlePartStartPointIndex = pointIndex + 1;
  }
  for (pointIndex = n = ref3 = this.points.length - 1; n >= 0; pointIndex = n += -1) {
    if (this.pointPartIsCurve[pointIndex]) {
      break;
    }
    straightPointsCountEnd++;
    middlePartEndPointIndex = pointIndex - 1;
  }
  if (straightPointsCountEnd > this.points.length) {
    // This is a fully straight line.
    straightPointsCountEnd = this.points.length;
  } else {
    for (pointIndex = o = ref4 = middlePartStartPointIndex, ref5 = middlePartEndPointIndex; ref4 <= ref5 ? o <= ref5 : o >= ref5; pointIndex = ref4 <= ref5 ? ++o : --o) {
      if (!this.pointPartIsCurve[pointIndex]) {
        straightPointsCountMiddle++;
      }
    }
  }
  if (this.isClosed) {
    straightPointsCountMiddle += straightPointsCountEnd;
    straightPointsCountEnd = false;
  }

  // Straight parts are scored worse when they are at a 50:50 balance with curve parts.
  // As the straight parts start overtaking curved parts, they become less problematic again.
  straightPointsCount = straightPointsCountMiddle + straightPointsCountEnd;
  if (straightPointsCount) {
    straightPointsScore = 2 * Math.abs(0.5 - straightPointsCount / this.points.length);
    middlePointsScore = straightPointsScore;

    // We limit ending parts to only go to a 0.7 score (D) at 50% coverage.
    endPointsScore = 0.7 + 0.3 * straightPointsScore;
    straightPartsScore = THREE.MathUtils.lerp(endPointsScore, middlePointsScore, straightPointsCountMiddle / straightPointsCount);
  } else {
    straightPartsScore = 1;
  }

  // Calculate inflection points score.
  inflectionPoints = this._analyzeInflectionPoints(pixelArtEvaluationProperty);
  inflectionPointCounts = {
    isolated: 0,
    sparse: 0,
    dense: 0
  };
  if (inflectionPoints.length) {
    inflectionPointsScore = 0;
    for (p = 0, len4 = inflectionPoints.length; p < len4; p++) {
      inflectionPoint = inflectionPoints[p];
      inflectionPointsScore += inflectionPoint.spacingScore;
      if (inflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.dense) {
        inflectionPointCounts.dense++;
      } else if (inflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.sparse) {
        inflectionPointCounts.sparse++;
      } else {
        inflectionPointCounts.isolated++;
      }
    }
    inflectionPointsScore /= inflectionPoints.length;
  } else {
    inflectionPointsScore = 1;
  }
  return {
    abruptSegmentLengthChanges: {
      score: abruptPointSegmentLengthChangesScore,
      counts: abruptPointSegmentLengthChangesCounts
    },
    straightParts: {
      score: straightPartsScore,
      counts: straightPartsCounts
    },
    inflectionPoints: {
      score: inflectionPointsScore,
      counts: inflectionPointCounts,
      points: inflectionPoints
    }
  };
};
PAE.Line.prototype._analyzeInflectionPoints = function (pixelArtEvaluationProperty) {
  var i, inflectionPoint, inflectionPointIndex, inflectionPoints, len, nextInflectionPoint, previousInflectionPoint, ref, segmentDistanceFromClosestInflectionPoint, segmentDistanceFromNextInflectionPoint, segmentDistanceFromPreviousInflectionPoint;
  inflectionPoints = [];
  ref = this.inflectionPoints;
  for (inflectionPointIndex = i = 0, len = ref.length; i < len; inflectionPointIndex = ++i) {
    inflectionPoint = ref[inflectionPointIndex];
    previousInflectionPoint = this.inflectionPoints[inflectionPointIndex - 1];
    nextInflectionPoint = this.inflectionPoints[inflectionPointIndex + 1];

    // TODO: Add support for closed lines if points are not found.
    segmentDistanceFromPreviousInflectionPoint = Number.POSITIVE_INFINITY;
    segmentDistanceFromNextInflectionPoint = Number.POSITIVE_INFINITY;
    if (previousInflectionPoint) {
      segmentDistanceFromPreviousInflectionPoint = inflectionPoint.inflectionArea.averageEdgeSegmentIndex - previousInflectionPoint.inflectionArea.averageEdgeSegmentIndex;
    }
    if (nextInflectionPoint) {
      segmentDistanceFromNextInflectionPoint = nextInflectionPoint.inflectionArea.averageEdgeSegmentIndex - inflectionPoint.inflectionArea.averageEdgeSegmentIndex;
    }
    segmentDistanceFromClosestInflectionPoint = Math.min(segmentDistanceFromPreviousInflectionPoint, segmentDistanceFromNextInflectionPoint);
    inflectionPoints.push(_.extend({}, inflectionPoint, {
      // We add 0.5 to the distance so that a distance of 2 leads to a score of 0.6 (D).
      spacingScore: 1 - 1 / (0.5 + segmentDistanceFromClosestInflectionPoint)
    }));
  }
  return inflectionPoints;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"part":{"part.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/part/part.coffee                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.Part = class Part {
  constructor(line, startSegmentIndex, endSegmentIndex, startPointIndex1, endPointIndex1) {
    var endPointIndex, i, j, point, pointIndex, ref, ref1, ref2, ref3, segment, segmentIndex, startPointIndex;
    this.line = line;
    this.startSegmentIndex = startSegmentIndex;
    this.endSegmentIndex = endSegmentIndex;
    this.startPointIndex = startPointIndex1;
    this.endPointIndex = endPointIndex1;
    this.id = PAE.nextId();
    if (this.startPointIndex == null) {
      this.startPointIndex = this.line.getEdgeSegment(this.startSegmentIndex).startPointIndex;
    }
    if (this.endPointIndex == null) {
      this.endPointIndex = this.line.getEdgeSegment(this.endSegmentIndex).endPointIndex;
    }

    // Collect points.
    this.points = [];
    for (segmentIndex = i = ref = this.startSegmentIndex, ref1 = this.endSegmentIndex; ref <= ref1 ? i <= ref1 : i >= ref1; segmentIndex = ref <= ref1 ? ++i : --i) {
      segment = this.line.getEdgeSegment(segmentIndex);
      startPointIndex = segment.startPointIndex;
      endPointIndex = segment.endPointIndex;
      if (segmentIndex === this.startSegmentIndex) {
        startPointIndex = Math.max(startPointIndex, this.startPointIndex);
      }
      if (segmentIndex === this.endSegmentIndex) {
        endPointIndex = Math.min(endPointIndex, this.endPointIndex);
      }
      for (pointIndex = j = ref2 = startPointIndex, ref3 = endPointIndex; ref2 <= ref3 ? j <= ref3 : j >= ref3; pointIndex = ref2 <= ref3 ? ++j : --j) {
        point = this.line.getPoint(pointIndex);
        if (indexOf.call(this.points, point) < 0) {
          this.points.push(point);
        }
      }
    }
  }
  hasPixel(pixel) {
    var i, len, point, ref;
    ref = this.points;
    for (i = 0, len = ref.length; i < len; i++) {
      point = ref[i];
      if (indexOf.call(point.pixels, pixel) >= 0) {
        return true;
      }
    }
    return false;
  }
  overlaysPointRange(startPointIndex, endPointIndex) {
    var i, pointCount, ref, ref1, segment, segmentIndex;
    pointCount = this.line.points.length;
    startPointIndex = startPointIndex % pointCount;
    endPointIndex = endPointIndex % pointCount;
    for (segmentIndex = i = ref = this.startSegmentIndex, ref1 = this.endSegmentIndex; ref <= ref1 ? i <= ref1 : i >= ref1; segmentIndex = ref <= ref1 ? ++i : --i) {
      segment = this.line.getEdgeSegment(segmentIndex);
      if (endPointIndex >= startPointIndex) {
        if (startPointIndex <= segment.endPointIndex && endPointIndex >= segment.startPointIndex) {
          return true;
        }
      } else {
        if (startPointIndex <= segment.endPointIndex || endPointIndex >= segment.startPointIndex) {
          return true;
        }
      }

      // Special case for the segment that is closing an outline.
      if (segment.endPointIndex === pointCount) {
        if (endPointIndex >= startPointIndex) {
          if (startPointIndex === 0) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
    return false;
  }
  setNeighbors(previousPart, nextPart) {
    this.previousPart = previousPart;
    this.nextPart = nextPart;
  }

  // Extend to adjust display points.
  startsOnACorner() {
    var startSegment;
    startSegment = this.line.getEdgeSegment(this.startSegmentIndex);
    return startSegment.corner.before;
  }
  endsOnACorner() {
    var endSegment;
    endSegment = this.line.getEdgeSegment(this.endSegmentIndex);
    return endSegment.corner.after;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"straightline.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/part/straightline.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, PAA, PAE;
AE = Artificial.Everywhere;
AP = Artificial.Pyramid;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.Part.StraightLine = function () {
  class StraightLine extends PAE.Line.Part {
    constructor() {
      super(...arguments);
      this.line2 = new THREE.Line2();
      PAE.Point.setStraightLine(_.first(this.points), _.last(this.points), this.line2);
      this.displayLine2 = this.line2.clone();
    }
    setNeighbors() {
      super.setNeighbors(...arguments);
      if (this.previousPart) {
        if (this.previousPart instanceof this.constructor) {
          this.line2.intersect(this.previousPart.line2, this.displayLine2.start);
        } else {
          this.previousPart.projectToLine(this.previousPart.endPointIndex, this, this.displayLine2.start);
        }
      }
      if (this.nextPart) {
        if (this.nextPart instanceof this.constructor) {
          return this.line2.intersect(this.nextPart.line2, this.displayLine2.end);
        } else {
          return this.nextPart.projectToLine(this.nextPart.startPointIndex, this, this.displayLine2.end);
        }
      }
    }
    isBetweenStraightParts() {
      // Straight part is between other straight parts if it starts and ends on a corner.
      return this.startsOnACorner() && this.endsOnACorner();
    }
    isAtTheEndOfCurvedPart() {
      // Straight part is at the end if they start or end with a corner, but not both.
      return (this.startsOnACorner() || this.endsOnACorner()) && !this.isBetweenStraightParts();
    }
    isInTheMiddleOfACurvedPart() {
      // Straight parts are in the middle if they don't start or end on a corner.
      return !(this.startsOnACorner() || this.endsOnACorner());
    }
  }
  ;
  StraightLine.Type = {
    AxisAligned: 'AxisAligned',
    EvenDiagonal: 'EvenDiagonal',
    IntermediaryDiagonal: 'IntermediaryDiagonal'
  };
  StraightLine.SegmentLengths = {
    Even: 'Even',
    Alternating: 'Alternating',
    Broken: 'Broken'
  };
  StraightLine.EndSegments = {
    Matching: 'Matching',
    Shorter: 'Shorter'
  };
  return StraightLine;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"straightline-evaluate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/part/straightline-evaluate.coffee              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  AP,
  PAA,
  PAE,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
AP = Artificial.Pyramid;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.Part.StraightLine.prototype.evaluate = function () {
  var diagonalRatio, endSegments, segmentLengths, type;
  if (this._evaluation) {
    return this._evaluation;
  }
  this._analyzeSegments();
  diagonalRatio = this._analyzeDiagonalRatio();
  type = this._analyzeType(diagonalRatio);
  segmentLengths = this._analyzePointSegmentLengths();
  endSegments = this._analyzeEndPointSegmentLengths();
  this._evaluation = {
    type,
    diagonalRatio,
    segmentLengths,
    endSegments
  };
  return this._evaluation;
};
PAE.Line.Part.StraightLine.prototype._analyzeSegments = function () {
  var alternativeEndPointSegmentLength, alternativeStartPointSegmentLength, base, currentEndPointSegmentLength, currentStartPointSegmentLength, endPoint, endPointSegmentLength, endSegment, i, j, k, largestCentralPointSegmentLength, pointSegmentLength, ref, ref1, ref2, segment, segmentIndex, startPoint, startPointSegmentLength, startSegment, uniqueCentralPointSegmentLengths;
  if (this.pointSegmentLengths) {
    return;
  }
  this.pointSegmentLengths = [];
  this.pointSegmentLengthFrequency = [];
  for (segmentIndex = j = ref = this.startSegmentIndex, ref1 = this.endSegmentIndex; ref <= ref1 ? j <= ref1 : j >= ref1; segmentIndex = ref <= ref1 ? ++j : --j) {
    segment = this.line.getEdgeSegment(segmentIndex);
    if (segment.pointSegmentsCount && segment.pointSegmentLength) {
      pointSegmentLength = segmentIndex === this.startSegmentIndex || segmentIndex === this.endSegmentIndex ? segment.externalPointSegmentLength : segment.pointSegmentLength;
      for (i = k = 1, ref2 = segment.pointSegmentsCount; 1 <= ref2 ? k <= ref2 : k >= ref2; i = 1 <= ref2 ? ++k : --k) {
        this.pointSegmentLengths.push(pointSegmentLength);
      }
    }
    if ((base = this.pointSegmentLengthFrequency)[pointSegmentLength] == null) {
      base[pointSegmentLength] = 0;
    }
    this.pointSegmentLengthFrequency[pointSegmentLength] += segment.pointSegmentsCount;
  }

  // See if the end points are junctions and it would be better not to use them.
  startSegment = this.line.getEdgeSegment(this.startSegmentIndex);
  startPoint = this.line.getPoint(startSegment.startPointIndex);
  currentStartPointSegmentLength = startSegment.pointSegmentLength;
  if (currentStartPointSegmentLength > 1 && startPoint.allNeighbors.length > 2) {
    alternativeStartPointSegmentLength = currentStartPointSegmentLength - 1;
    if (this.pointSegmentLengthFrequency[alternativeStartPointSegmentLength] > this.pointSegmentLengthFrequency[currentStartPointSegmentLength]) {
      this.pointSegmentLengths[0] = alternativeStartPointSegmentLength;
      this.pointSegmentLengthFrequency[alternativeStartPointSegmentLength]++;
      this.pointSegmentLengthFrequency[currentStartPointSegmentLength]--;
      if (!this.pointSegmentLengthFrequency[alternativeStartPointSegmentLength]) {
        delete this.pointSegmentLengthFrequency[currentStartPointSegmentLength];
      }
    }
  }
  endSegment = this.line.getEdgeSegment(this.endSegmentIndex);
  endPoint = this.line.getPoint(endSegment.endPointIndex);
  currentEndPointSegmentLength = endSegment.pointSegmentLength;
  if (currentEndPointSegmentLength > 1 && endPoint.allNeighbors.length > 2) {
    alternativeEndPointSegmentLength = currentEndPointSegmentLength - 1;
    if (this.pointSegmentLengthFrequency[alternativeEndPointSegmentLength] > this.pointSegmentLengthFrequency[currentEndPointSegmentLength]) {
      this.pointSegmentLengths[this.pointSegmentLengths.length - 1] = alternativeEndPointSegmentLength;
      this.pointSegmentLengthFrequency[alternativeEndPointSegmentLength]++;
      this.pointSegmentLengthFrequency[currentEndPointSegmentLength]--;
      if (!this.pointSegmentLengthFrequency[currentEndPointSegmentLength]) {
        delete this.pointSegmentLengthFrequency[currentEndPointSegmentLength];
      }
    }
  }
  this.startPointSegmentLength = null;
  this.endPointSegmentLength = null;
  if (this.pointSegmentLengths.length < 3) {
    this.centralPointSegmentLengths = this.pointSegmentLengths;
  } else {
    this.centralPointSegmentLengths = this.pointSegmentLengths.slice(1, this.pointSegmentLengths.length - 1);
    uniqueCentralPointSegmentLengths = _.sortBy(_.uniq(this.centralPointSegmentLengths));
    startPointSegmentLength = _.first(this.pointSegmentLengths);
    endPointSegmentLength = _.last(this.pointSegmentLengths);
    largestCentralPointSegmentLength = _.last(uniqueCentralPointSegmentLengths);
    if (indexOf.call(uniqueCentralPointSegmentLengths, startPointSegmentLength) >= 0 || startPointSegmentLength > largestCentralPointSegmentLength) {
      this.centralPointSegmentLengths.unshift(startPointSegmentLength);
    } else {
      this.startPointSegmentLength = startPointSegmentLength;
    }
    if (indexOf.call(uniqueCentralPointSegmentLengths, endPointSegmentLength) >= 0 || endPointSegmentLength > largestCentralPointSegmentLength) {
      this.centralPointSegmentLengths.push(endPointSegmentLength);
    } else {
      this.endPointSegmentLength = endPointSegmentLength;
    }
  }
  this.uniqueCentralPointSegmentLengths = _.sortBy(_.uniq(this.centralPointSegmentLengths));
  return this.largestCentralPointSegmentLengths = this.uniqueCentralPointSegmentLengths.slice(this.uniqueCentralPointSegmentLengths.length - 2);
};
PAE.Line.Part.StraightLine.prototype._analyzeDiagonalRatio = function () {
  var end, frequenciesCount, height, largerPointSegmentFrequency, largerPointSegmentLength, ratio, smallerPointSegmentFrequency, smallerPointSegmentLength, start, totalLength, width;
  this._analyzeSegments();
  start = _.first(this.points);
  end = _.last(this.points);
  width = Math.max(start.x, end.x) - Math.min(start.x, end.x) + 1;
  height = Math.max(start.y, end.y) - Math.min(start.y, end.y) + 1;
  if (!(width > 1 && height > 1)) {
    if (height === 1) {
      return new AP.Fraction(0, width);
    } else {
      return new AP.Fraction(height, 0);
    }
  }
  if (this.largestCentralPointSegmentLengths.length === 1) {
    ratio = new AP.Fraction(1, this.largestCentralPointSegmentLengths[0]);
  } else {
    smallerPointSegmentLength = this.largestCentralPointSegmentLengths[0];
    largerPointSegmentLength = this.largestCentralPointSegmentLengths[1];
    smallerPointSegmentFrequency = this.pointSegmentLengthFrequency[smallerPointSegmentLength];
    largerPointSegmentFrequency = this.pointSegmentLengthFrequency[largerPointSegmentLength];
    if (Math.abs(smallerPointSegmentFrequency - largerPointSegmentFrequency) <= 1) {
      ratio = new AP.Fraction(2, smallerPointSegmentLength + largerPointSegmentLength);
    } else {
      frequenciesCount = largerPointSegmentFrequency + smallerPointSegmentFrequency;
      totalLength = largerPointSegmentFrequency * largerPointSegmentLength + smallerPointSegmentFrequency * smallerPointSegmentLength;
      ratio = new AP.Fraction(frequenciesCount, totalLength);
      ratio.simplify();
    }
  }
  if (height > width) {
    ratio.invert();
  }
  return ratio;
};
PAE.Line.Part.StraightLine.prototype._analyzeType = function (diagonalRatio) {
  var lowestNumber;
  lowestNumber = Math.min(diagonalRatio.numerator, diagonalRatio.denominator);
  switch (lowestNumber) {
    case 0:
      return this.constructor.Type.AxisAligned;
    case 1:
      return this.constructor.Type.EvenDiagonal;
    default:
      return this.constructor.Type.IntermediaryDiagonal;
  }
};
PAE.Line.Part.StraightLine.prototype._analyzePointSegmentLengths = function () {
  var alternatingScore, brokenScore, evenPointSegmentLength, j, largestPointSegmentsFrequency, largestPointSegmentsFrequencyRatio, largestPointSegmentsLengthRatio, oddPointSegmentLength, pointSegmentIndex, pointSegmentLength, ref;
  // If we have only one segment length, it's a perfect even diagonal.
  if (this.uniqueCentralPointSegmentLengths.length === 1) {
    return {
      type: this.constructor.SegmentLengths.Even,
      score: 1
    };
  }

  // The line is not perfect so we can calculate a ratio between its largest segments for scoring purposes.
  largestPointSegmentsLengthRatio = this.largestCentralPointSegmentLengths[0] / this.largestCentralPointSegmentLengths[1];
  // Alternating score can go from C (75%) at worst (1:2) to A at best (∞:∞).
  alternatingScore = THREE.MathUtils.mapLinear(largestPointSegmentsLengthRatio, 0.5, 1, 0.75, 1);
  oddPointSegmentLength = this.centralPointSegmentLengths[0];
  evenPointSegmentLength = this.centralPointSegmentLengths[1];
  for (pointSegmentIndex = j = 0, ref = this.centralPointSegmentLengths.length; j < ref; pointSegmentIndex = j += 2) {
    if (!(this.centralPointSegmentLengths[pointSegmentIndex] === oddPointSegmentLength && (this.centralPointSegmentLengths[pointSegmentIndex + 1] === evenPointSegmentLength || pointSegmentIndex > this.centralPointSegmentLengths.length - 2))) {
      // We found a break in the repetition. We want to see what's the ratio between the frequency of each possible segment.
      largestPointSegmentsFrequency = _.sortBy(function () {
        var k, len, ref1, results;
        ref1 = this.largestCentralPointSegmentLengths;
        results = [];
        for (k = 0, len = ref1.length; k < len; k++) {
          pointSegmentLength = ref1[k];
          results.push(this.pointSegmentLengthFrequency[pointSegmentLength]);
        }
        return results;
      }.call(this));
      largestPointSegmentsFrequencyRatio = largestPointSegmentsFrequency[0] / largestPointSegmentsFrequency[1];

      // Broken scores can go from F (50%) at worst (1:∞) to C (75%) at best (1:1).
      brokenScore = THREE.MathUtils.mapLinear(largestPointSegmentsFrequencyRatio, 0, 1, 0.5, 0.75);
      return {
        type: this.constructor.SegmentLengths.Broken,
        score: brokenScore
      };
    }
  }
  return {
    // There was no break in repetition so this is a nicely alternating diagonal.
    type: this.constructor.SegmentLengths.Alternating,
    score: alternatingScore
  };
};
PAE.Line.Part.StraightLine.prototype._analyzeEndPointSegmentLengths = function () {
  var comparisonLength, ref, ref1, result;
  result = {
    type: this.constructor.EndSegments.Matching,
    startScore: null,
    endScore: null,
    score: 1
  };
  if (!(this.startPointSegmentLength || this.endPointSegmentLength)) {
    return result;
  }
  comparisonLength = _.min(this.largestCentralPointSegmentLengths);
  if (this.startPointSegmentLength) {
    result.startScore = this.startPointSegmentLength / comparisonLength;
  }
  if (this.endPointSegmentLength) {
    result.endScore = this.endPointSegmentLength / comparisonLength;
  }
  result.score = (((ref = result.startScore) != null ? ref : 1) + ((ref1 = result.endScore) != null ? ref1 : 1)) / 2;
  result.type = this.constructor.EndSegments.Shorter;
  return result;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"straightline-getsegmentcorners.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/part/straightline-getsegmentcorners.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, PAA, PAE;
AE = Artificial.Everywhere;
AP = Artificial.Pyramid;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.Part.StraightLine.prototype.getSegmentCorners = function () {
  var deltaX, deltaY, endPoint, endPointIndex, i, left, leftDirectionX, leftDirectionY, leftPoint, len, mainDirectionX, mainDirectionY, pointSegmentLength, ref, right, rightPoint, segmentEndPoint, segmentStartPoint, startPoint, startPointIndex, verticalSegments;
  this._analyzeSegments();
  startPoint = _.first(this.points);
  endPoint = _.last(this.points);
  deltaX = endPoint.x - startPoint.x;
  deltaY = endPoint.y - startPoint.y;
  mainDirectionX = Math.sign(deltaX);
  mainDirectionY = Math.sign(endPoint.y - startPoint.y);
  if (mainDirectionX === 0) {
    leftDirectionX = mainDirectionY > 1 ? 1 : -1;
    return {
      left: [{
        x: startPoint.x + leftDirectionX * startPoint.radius,
        y: startPoint.y - mainDirectionY * startPoint.radius
      }, {
        x: endPoint.x + leftDirectionX * endPoint.radius,
        y: endPoint.y + mainDirectionY * endPoint.radius
      }],
      right: [{
        x: startPoint.x - leftDirectionX * startPoint.radius,
        y: startPoint.y - mainDirectionY * startPoint.radius
      }, {
        x: endPoint.x - leftDirectionX * endPoint.radius,
        y: endPoint.y + mainDirectionY * endPoint.radius
      }]
    };
  }
  if (mainDirectionY === 0) {
    leftDirectionY = mainDirectionX > 1 ? -1 : 1;
    return {
      left: [{
        x: startPoint.x - mainDirectionX * startPoint.radius,
        y: startPoint.y + leftDirectionY * startPoint.radius
      }, {
        x: endPoint.x + mainDirectionX * startPoint.radius,
        y: endPoint.y + leftDirectionY * startPoint.radius
      }],
      right: [{
        x: startPoint.x - mainDirectionX * startPoint.radius,
        y: startPoint.y - leftDirectionY * startPoint.radius
      }, {
        x: endPoint.x + mainDirectionX * endPoint.radius,
        y: endPoint.y - leftDirectionY * endPoint.radius
      }]
    };
  }
  if (mainDirectionX === mainDirectionY) {
    leftDirectionX = mainDirectionX;
    leftDirectionY = -mainDirectionY;
  } else {
    leftDirectionX = -mainDirectionX;
    leftDirectionY = mainDirectionY;
  }
  verticalSegments = Math.abs(deltaY) > Math.abs(deltaX);
  left = [];
  right = [];
  startPointIndex = 0;
  ref = this.pointSegmentLengths;
  for (i = 0, len = ref.length; i < len; i++) {
    pointSegmentLength = ref[i];
    endPointIndex = startPointIndex + pointSegmentLength - 1;
    segmentStartPoint = this.points[startPointIndex];
    segmentEndPoint = this.points[endPointIndex];
    if (!(segmentStartPoint && segmentEndPoint)) {
      // TODO: Remove this when point segments on thick lines are correctly calculated.
      continue;
    }
    leftPoint = mainDirectionX === mainDirectionY === verticalSegments ? segmentStartPoint : segmentEndPoint;
    rightPoint = mainDirectionX === mainDirectionY === verticalSegments ? segmentEndPoint : segmentStartPoint;
    left.push({
      x: leftPoint.x + leftDirectionX * leftPoint.radius,
      y: leftPoint.y + leftDirectionY * leftPoint.radius
    });
    right.push({
      x: rightPoint.x - leftDirectionX * rightPoint.radius,
      y: rightPoint.y - leftDirectionY * rightPoint.radius
    });
    startPointIndex += pointSegmentLength;
  }
  return {
    left,
    right
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"curve.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/part/curve.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, PAA, PAE, _point;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
_point = new THREE.Vector2();
PAE.Line.Part.Curve = function () {
  class Curve extends PAE.Line.Part {
    // Note: We must not use @ on the parameters that will be (re)assigned
    // in the parent since we'd otherwise overwrite their values.
    constructor(line, startSegmentIndex, endSegmentIndex, startPointIndex, endPointIndex, isClosed, clockwise) {
      var endPoint, i, ref, ref1, segment, segmentIndex, segmentParameter, startPoint;
      super(...arguments);
      this.isClosed = isClosed;
      this.clockwise = clockwise;
      // Create display points.
      this.displayPoints = [];
      segmentParameter = 0.5;
      for (segmentIndex = i = ref = this.startSegmentIndex, ref1 = this.endSegmentIndex; ref <= ref1 ? i <= ref1 : i >= ref1; segmentIndex = ref <= ref1 ? ++i : --i) {
        segment = this.line.getEdgeSegment(segmentIndex);
        if (!(segment.pointSegmentsCount || (segmentIndex === this.startSegmentIndex || segmentIndex === this.endSegmentIndex) && !this.isClosed)) {
          // Exclude side-step segments from generating curve points, except at end points.
          continue;
        }
        startPointIndex = segment.startPointIndex;
        endPointIndex = segment.endPointIndex;
        if (segmentIndex === this.startSegmentIndex) {
          startPointIndex = Math.max(startPointIndex, this.startPointIndex);
        }
        if (segmentIndex === this.endSegmentIndex) {
          endPointIndex = Math.min(endPointIndex, this.endPointIndex);
        }
        startPoint = this.line.getPoint(startPointIndex);
        endPoint = this.line.getPoint(endPointIndex);
        if (!this.isClosed) {
          segmentParameter = function () {
            switch (segmentIndex) {
              case this.startSegmentIndex:
                return 0;
              case this.endSegmentIndex:
                return 1;
              default:
                return 0.5;
            }
          }.call(this);
        }
        this.displayPoints.push(this._createDisplayPoint(new THREE.Vector2().lerpVectors(startPoint, endPoint, segmentParameter)));
      }
      if (this.displayPoints.length === 2) {
        this.displayPoints.splice(1, 0, this._createDisplayPoint(new THREE.Vector2().copy(this.line.getCentralSegmentPosition(this.startSegmentIndex, this.endSegmentIndex))));
      }
      if (this.displayPoints.length === 1) {
        this.displayPoints.push(this._createDisplayPoint(this.displayPoints[0].position.clone()));
      }
      this._calculateControlPoints(0, this.displayPoints.length - 1);
    }
    _createDisplayPoint(position) {
      return {
        position: position,
        tangent: new THREE.Vector2(),
        controlPoints: {
          before: new THREE.Vector2(),
          after: new THREE.Vector2()
        }
      };
    }
    _calculateControlPoints(displayPointStartIndex, displayPointEndIndex) {
      var distance, i, index, nextPoint, point, previousPoint, ref, ref1;
      for (index = i = ref = displayPointStartIndex, ref1 = displayPointEndIndex; ref <= ref1 ? i <= ref1 : i >= ref1; index = ref <= ref1 ? ++i : --i) {
        point = this.displayPoints[index];
        previousPoint = this.isClosed ? this.displayPoints[_.modulo(index - 1, this.displayPoints.length)] : this.displayPoints[index - 1];
        nextPoint = this.isClosed ? this.displayPoints[_.modulo(index + 1, this.displayPoints.length)] : this.displayPoints[index + 1];

        // Calculate the tangent.
        if (!previousPoint) {
          if (this.previousPart && !this.previousPart.endsOnACorner()) {
            this.previousPart.line2.delta(point.tangent);
          } else {
            point.tangent.subVectors(nextPoint.position, point.position);
          }
        } else if (!nextPoint) {
          if (this.nextPart && !this.nextPart.startsOnACorner()) {
            this.nextPart.line2.delta(point.tangent);
          } else {
            point.tangent.subVectors(point.position, previousPoint.position);
          }
        } else {
          point.tangent.subVectors(nextPoint.position, previousPoint.position);
        }
        point.tangent.normalize();

        // Calculate control points.
        if (previousPoint) {
          distance = point.position.distanceTo(previousPoint.position);
          point.controlPoints.before.copy(point.tangent).multiplyScalar(-distance / 3).add(point.position);
        }
        if (nextPoint) {
          distance = point.position.distanceTo(nextPoint.position);
          point.controlPoints.after.copy(point.tangent).multiplyScalar(distance / 3).add(point.position);
        }
      }

      // Explicit return to prevent result collection.
      return null;
    }
    setNeighbors() {
      super.setNeighbors(...arguments);
      if (this.displayPoints.length === 3) {
        // Remove the middle point in 3 point curves for a smoother transition.
        this.displayPoints.splice(1, 1);
      }
      if (this.previousPart) {
        this.projectToLine(this.startPointIndex, this.previousPart, this.displayPoints[0].position);
        this._calculateControlPoints(0, 1);
      }
      if (this.nextPart) {
        this.projectToLine(this.endPointIndex, this.nextPart, this.displayPoints[this.displayPoints.length - 1].position);
        return this._calculateControlPoints(this.displayPoints.length - 2, this.displayPoints.length - 1);
      }
    }
    projectToLine(pointIndex, straightLine, target) {
      _point.copy(this.line.getPoint(pointIndex));
      return straightLine.line2.closestPointToPoint(_point, false, target);
    }
    _getPointSegment(index) {
      if (this.isClosed) {
        return this.pointSegments[_.modulo(index, this.pointSegments.length)];
      } else {
        return this.pointSegments[index];
      }
    }
    _getEdgeSegment(index) {
      if (!(this.isClosed || this.startSegmentIndex <= index && index <= this.endSegmentIndex)) {
        return null;
      }
      return this.line.getEdgeSegment(index);
    }
  }
  ;
  Curve.AbruptSegmentLengthChanges = {
    Minor: 'Minor',
    Major: 'Major'
  };
  Curve.StraightParts = {
    End: 'End',
    Middle: 'Middle'
  };
  Curve.InflectionPoints = {
    Isolated: 'Isolated',
    Sparse: 'Sparse',
    Dense: 'Dense'
  };
  Curve.majorAbruptIncreaseThreshold = 2;
  Curve.inflectionPointSpacingThresholds = {
    dense: 0.6,
    // F
    sparse: 0.9 // E-B
  };
  return Curve;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"curve-evaluate.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/part/curve-evaluate.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AP, PAA, PAE;
AE = Artificial.Everywhere;
AP = Artificial.Pyramid;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAE.Line.Part.Curve.prototype.evaluate = function () {
  var pointSegmentLengthChanges;
  if (this._evaluation) {
    return this._evaluation;
  }
  this._analyzeSegments();
  pointSegmentLengthChanges = this._analyzePointSegmentLengthChanges();
  this._evaluation = {
    pointSegmentLengthChanges
  };
  return this._evaluation;
};
PAE.Line.Part.Curve.prototype._analyzeSegments = function () {
  var i, j, k, l, pointSegmentLength, pointSegmentLengthIndex, ref, ref1, ref2, ref3, results, segment, segmentIndex;
  if (this.pointSegmentLengths) {
    return;
  }
  this.pointSegmentLengths = [];
  for (segmentIndex = j = ref = this.startSegmentIndex, ref1 = this.endSegmentIndex; ref <= ref1 ? j <= ref1 : j >= ref1; segmentIndex = ref <= ref1 ? ++j : --j) {
    segment = this.line.getEdgeSegment(segmentIndex);
    if (segment.pointSegmentsCount && segment.pointSegmentLength) {
      pointSegmentLength = segmentIndex === this.startSegmentIndex || segmentIndex === this.endSegmentIndex ? segment.externalPointSegmentLength : segment.pointSegmentLength;
      for (i = k = 1, ref2 = segment.pointSegmentsCount; 1 <= ref2 ? k <= ref2 : k >= ref2; i = 1 <= ref2 ? ++k : --k) {
        this.pointSegmentLengths.push(pointSegmentLength);
      }
    }
  }
  this.pointSegmentLengthChanges = [];
  results = [];
  for (pointSegmentLengthIndex = l = 0, ref3 = this.pointSegmentLengths.length - 1; 0 <= ref3 ? l < ref3 : l > ref3; pointSegmentLengthIndex = 0 <= ref3 ? ++l : --l) {
    results.push(this.pointSegmentLengthChanges.push(Math.abs(this.pointSegmentLengths[pointSegmentLengthIndex + 1] - this.pointSegmentLengths[pointSegmentLengthIndex])));
  }
  return results;
};
PAE.Line.Part.Curve.prototype._analyzePointSegmentLengthChanges = function () {
  var abruptIncrease, abruptPointSegmentLengthChanges, changeIndex, j, k, len, len1, neighborIndex, neighborPointSegmentLengthChange, pointSegmentLength, pointSegmentLengthChange, ref, ref1;
  abruptPointSegmentLengthChanges = [];
  ref = this.pointSegmentLengthChanges;

  // Changes are abrupt when going from 0 change to a big change.
  for (changeIndex = j = 0, len = ref.length; j < len; changeIndex = ++j) {
    pointSegmentLengthChange = ref[changeIndex];
    if (!(pointSegmentLengthChange === 0)) {
      continue;
    }
    // Allow the neighboring segment length change to be as long as the segment itself.
    pointSegmentLength = this.pointSegmentLengths[changeIndex];
    ref1 = [changeIndex - 1, changeIndex + 1];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      neighborIndex = ref1[k];
      if (!(neighborPointSegmentLengthChange = this.pointSegmentLengthChanges[neighborIndex])) {
        continue;
      }
      if (!(abruptIncrease = Math.max(0, neighborPointSegmentLengthChange - pointSegmentLength))) {
        continue;
      }
      abruptPointSegmentLengthChanges.push({
        index: neighborIndex,
        abruptIncrease: abruptIncrease
      });
    }
  }
  return {
    // There was no break in repetition so this is a nicely alternating diagonal.
    abruptPointSegmentLengthChanges,
    count: this.pointSegmentLengthChanges.length
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"curve-calculatepointconfidence.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/line/part/curve-calculatepointconfidence.coffee     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, PAA, PAE, _point;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
_point = new THREE.Vector2();
PAE.Line.Part.Curve.prototype.calculatePointConfidence = function () {
  var angle, edgeSegment, endConfidentPointsCount, endEdgeSegment, endPointIndex, endSegmentIndex, i, j, k, l, lastSegment, len, len1, length, m, maxPointSegmentLength, n, nextAngle, nextPointSegment, o, pointIndex, pointSegment, pointSegmentIndex, previousAngle, previousPointSegment, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, startConfidentPointsCount, startPointIndex, startSegmentIndex, testSegmentIndex, unconfidentEndPointIndex, unconfidentStartPointIndex;
  // Create point segments.
  this.pointSegments = [];
  for (startSegmentIndex = i = ref = this.startSegmentIndex, ref1 = this.endSegmentIndex; ref <= ref1 ? i <= ref1 : i >= ref1; startSegmentIndex = ref <= ref1 ? ++i : --i) {
    edgeSegment = this._getEdgeSegment(startSegmentIndex);
    if (!edgeSegment.pointSegmentsCount) {
      continue;
    }
    startPointIndex = edgeSegment.startPointIndex;
    if (!(edgeSegment.edge.isAxisAligned || edgeSegment.hasPointSegment.before)) {
      startPointIndex++;
    }
    endSegmentIndex = startSegmentIndex;
    testSegmentIndex = startSegmentIndex;
    while (true) {
      if (!(edgeSegment = this._getEdgeSegment(testSegmentIndex))) {
        // Expand segment to as many segments with points while no curvature changes happen.
        break;
      }
      if (edgeSegment.pointSegmentsCount) {
        endSegmentIndex = testSegmentIndex;
      }
      if (edgeSegment.curveClockwise.after != null) {
        break;
      }
      testSegmentIndex++;
    }
    lastSegment = _.last(this.pointSegments);
    if (lastSegment && endSegmentIndex <= lastSegment.endSegmentIndex) {
      continue;
    }
    endEdgeSegment = this._getEdgeSegment(endSegmentIndex);
    endPointIndex = endEdgeSegment.endPointIndex;
    if (!(endEdgeSegment.edge.isAxisAligned || endEdgeSegment.hasPointSegment.after)) {
      endPointIndex--;
    }
    if (endPointIndex >= startPointIndex) {
      length = endPointIndex - startPointIndex + 1;
    } else {
      length = startPointIndex + 1 + this.line.points.length - endPointIndex;
    }
    this.pointSegments.push({
      startSegmentIndex,
      endSegmentIndex,
      startPointIndex,
      endPointIndex,
      length
    });
  }

  // Remove remaining side-step segments.
  pointSegmentIndex = 1;
  while (pointSegmentIndex < this.pointSegments.length) {
    previousPointSegment = this._getPointSegment(pointSegmentIndex - 1);
    pointSegment = this._getPointSegment(pointSegmentIndex);
    if (!(nextPointSegment = this._getPointSegment(pointSegmentIndex + 1))) {
      break;
    }
    if (pointSegment.length === 2 && pointSegment.startPointIndex === previousPointSegment.endPointIndex && pointSegment.endPointIndex === nextPointSegment.startPointIndex) {
      this.pointSegments.splice(pointSegmentIndex, 1);
      continue;
    }
    pointSegmentIndex++;
  }
  ref2 = this.pointSegments;

  // Shorten overlapping segments.
  for (pointSegmentIndex = j = 0, len = ref2.length; j < len; pointSegmentIndex = ++j) {
    pointSegment = ref2[pointSegmentIndex];
    if (!(previousPointSegment = this._getPointSegment(pointSegmentIndex - 1))) {
      continue;
    }
    if (pointSegment.startPointIndex !== previousPointSegment.endPointIndex) {
      continue;
    }
    pointSegment.startPointIndex++;
    pointSegment.length--;
  }
  // Calculate point confidences.
  this.pointConfidences = [];
  ref3 = this.pointSegments;
  results = [];
  for (pointSegmentIndex = k = 0, len1 = ref3.length; k < len1; pointSegmentIndex = ++k) {
    pointSegment = ref3[pointSegmentIndex];
    // Start by being confident in the points by default.
    if (pointSegment.endPointIndex >= pointSegment.startPointIndex) {
      for (pointIndex = l = ref4 = pointSegment.startPointIndex, ref5 = pointSegment.endPointIndex; ref4 <= ref5 ? l <= ref5 : l >= ref5; pointIndex = ref4 <= ref5 ? ++l : --l) {
        this.pointConfidences[pointIndex] = true;
      }
    } else {
      for (pointIndex = m = 0, ref6 = pointSegment.endPointIndex; 0 <= ref6 ? m <= ref6 : m >= ref6; pointIndex = 0 <= ref6 ? ++m : --m) {
        this.pointConfidences[pointIndex] = true;
      }
      for (pointIndex = n = ref7 = pointSegment.startPointIndex, ref8 = this.line.points.length; ref7 <= ref8 ? n < ref8 : n > ref8; pointIndex = ref7 <= ref8 ? ++n : --n) {
        this.pointConfidences[pointIndex] = true;
      }
    }

    // If we're on the longer segment than the two neighbors combined (+2), we need to break the curve.
    maxPointSegmentLength = 0;
    angle = this._getEdgeSegment(pointSegment.startSegmentIndex).edge.angle();
    if (previousPointSegment = this._getPointSegment(pointSegmentIndex - 1)) {
      previousAngle = this._getEdgeSegment(previousPointSegment.startSegmentIndex).edge.angle();
      if (_.angleDistance(angle, previousAngle) > 1) {
        startConfidentPointsCount = 1;
      } else {
        startConfidentPointsCount = previousPointSegment.length + 1;
      }
      maxPointSegmentLength += startConfidentPointsCount;
    }
    if (nextPointSegment = this._getPointSegment(pointSegmentIndex + 1)) {
      nextAngle = this._getEdgeSegment(nextPointSegment.startSegmentIndex).edge.angle();
      if (_.angleDistance(angle, nextAngle) > 1) {
        endConfidentPointsCount = 1;
      } else {
        endConfidentPointsCount = nextPointSegment.length + 1;
      }
      maxPointSegmentLength += endConfidentPointsCount;
    }
    if (pointSegment.length <= maxPointSegmentLength) {
      continue;
    }
    unconfidentStartPointIndex = pointSegment.startPointIndex;
    if (previousPointSegment) {
      unconfidentStartPointIndex += startConfidentPointsCount;
    }
    unconfidentEndPointIndex = pointSegment.endPointIndex;
    if (nextPointSegment) {
      unconfidentEndPointIndex -= endConfidentPointsCount;
    }
    unconfidentStartPointIndex = _.modulo(unconfidentStartPointIndex, this.line.points.length);
    unconfidentEndPointIndex = _.modulo(unconfidentEndPointIndex, this.line.points.length);
    if (unconfidentEndPointIndex >= unconfidentStartPointIndex) {
      results.push(function () {
        var o, ref10, ref9, results1;
        results1 = [];
        for (pointIndex = o = ref9 = unconfidentStartPointIndex, ref10 = unconfidentEndPointIndex; ref9 <= ref10 ? o <= ref10 : o >= ref10; pointIndex = ref9 <= ref10 ? ++o : --o) {
          results1.push(this.pointConfidences[pointIndex] = false);
        }
        return results1;
      }.call(this));
    } else {
      for (pointIndex = o = 0, ref9 = unconfidentEndPointIndex; 0 <= ref9 ? o <= ref9 : o >= ref9; pointIndex = 0 <= ref9 ? ++o : --o) {
        this.pointConfidences[pointIndex] = false;
      }
      results.push(function () {
        var p, ref10, ref11, results1;
        results1 = [];
        for (pointIndex = p = ref10 = unconfidentStartPointIndex, ref11 = this.line.points.length; ref10 <= ref11 ? p < ref11 : p > ref11; pointIndex = ref10 <= ref11 ? ++p : --p) {
          results1.push(this.pointConfidences[pointIndex] = false);
        }
        return results1;
      }.call(this));
    }
  }
  return results;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"enginecomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/enginecomponent.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  Atari2600,
  LOI,
  Markup,
  PAA,
  PAE,
  abruptSegmentLengthChangesFilterValues,
  abruptSegmentLengthChangesSubcriteria,
  inflectionPointsFilterValues,
  inflectionPointsSubcriteria,
  straightPartsFilterValues,
  straightPartsSubcriteria,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
abruptSegmentLengthChangesSubcriteria = _.keys(PAE.Line.Part.Curve.AbruptSegmentLengthChanges);
abruptSegmentLengthChangesFilterValues = [PAE.Subcriteria.SmoothCurves.AbruptSegmentLengthChanges, ...abruptSegmentLengthChangesSubcriteria];
straightPartsSubcriteria = _.keys(PAE.Line.Part.Curve.StraightParts);
straightPartsFilterValues = [PAE.Subcriteria.SmoothCurves.StraightParts, ...straightPartsSubcriteria];
inflectionPointsSubcriteria = _.keys(PAE.Line.Part.Curve.InflectionPoints);
inflectionPointsFilterValues = [PAE.Subcriteria.SmoothCurves.InflectionPoints, ...inflectionPointsSubcriteria];
PAE.EngineComponent = function () {
  class EngineComponent extends PAA.Practice.Helpers.Drawing.Markup.EngineComponent {
    constructor(options) {
      super(...arguments);
      this.options = options;
      this.ready = new ComputedField(() => {
        if (!this.options.pixelArtEvaluation()) {
          return;
        }
        if (!LOI.palette()) {
          return;
        }
        return true;
      });
    }
    drawToContext(context) {
      let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.ready()) {
        return;
      }
      this._pixelSize = 1 / renderOptions.camera.effectiveScale();
      return this._render(context, renderOptions);
    }
    _render(context, renderOptions) {
      var betterStyle, closestInflectionPoint, counts, curve, curveMarkup, curveSmoothness, displayedCriteria, drawCorners, drawDoubles, element, evaluatedSmoothCurvesSubcriterions, filterValue, focusedLineParts, focusedLines, focusedPixel, i, inflectionPoint, j, k, l, layer, len, len1, len10, len11, len12, len13, len14, len15, len2, len3, len4, len5, len6, len7, len8, len9, line, lineEvaluation, lineMarkup, linePart, lineParts, lines, m, markup, mediocreStyle, n, o, p, part, perceivedLineMarkup, pixelArtEvaluation, pixelArtEvaluationProperty, point, pointSegmentLengthTextsOptions, q, r, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref28, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, straightLineMarkup, style, t, u, v, w, widthType, worseStyle, x;
      pixelArtEvaluation = this.options.pixelArtEvaluation();
      pixelArtEvaluationProperty = this.options.pixelArtEvaluationProperty();
      displayedCriteria = this.options.displayedCriteria();
      filterValue = this.options.filterValue();
      focusedPixel = this.options.focusedPixel();
      betterStyle = Markup.betterStyle();
      mediocreStyle = Markup.mediocreStyle();
      worseStyle = Markup.worseStyle();
      markup = [];
      // Prepare lines and line parts for markup.
      focusedLines = focusedPixel ? pixelArtEvaluation.getLinesAt(focusedPixel.x, focusedPixel.y) : [];
      focusedLineParts = focusedPixel ? pixelArtEvaluation.getLinePartsAt(focusedPixel.x, focusedPixel.y) : [];
      lines = [];
      lineParts = [];
      ref = pixelArtEvaluation.layers;
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        ref1 = layer.lines;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          line = ref1[j];
          lines.push(line);
          ref2 = line.parts;
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            part = ref2[k];
            lineParts.push(part);
          }
        }
      }

      // Add markup for pixel-perfect lines.
      if (ref3 = PAE.Criteria.PixelPerfectLines, indexOf.call(displayedCriteria, ref3) >= 0) {
        for (l = 0, len3 = lines.length; l < len3; l++) {
          line = lines[l];
          if (focusedLines.length && indexOf.call(focusedLines, line) < 0) {
            continue;
          }

          // Draw doubles and corners. Make sure these are booleans since they
          // will otherwise default to true in the pixelPerfectLineErrors method.
          drawDoubles = filterValue ? filterValue === PAE.Subcriteria.PixelPerfectLines.Doubles : ((ref4 = pixelArtEvaluationProperty.pixelPerfectLines) != null ? ref4.doubles : void 0) != null;
          drawCorners = filterValue ? filterValue === PAE.Subcriteria.PixelPerfectLines.Corners : ((ref5 = pixelArtEvaluationProperty.pixelPerfectLines) != null ? ref5.corners : void 0) != null;
          markup.push(...Markup.PixelArt.pixelPerfectLineErrors(line, drawDoubles, drawCorners, pixelArtEvaluationProperty));
        }
      }

      // Add markup for even diagonals.
      if (ref6 = PAE.Criteria.EvenDiagonals, indexOf.call(displayedCriteria, ref6) >= 0) {
        for (m = 0, len4 = lineParts.length; m < len4; m++) {
          linePart = lineParts[m];
          if (!(linePart instanceof PAE.Line.Part.StraightLine)) {
            continue;
          }
          if ((filterValue != null ? filterValue.property : void 0) && linePart.evaluate()[filterValue.property].type !== filterValue.value) {
            // Filter to evaluated property if needed.
            continue;
          }
          if (indexOf.call(focusedLineParts, linePart) >= 0) {
            markup.push(...Markup.PixelArt.straightLineBreakdown(linePart, pixelArtEvaluationProperty));
          } else {
            markup.push(...Markup.PixelArt.evaluatedPerceivedStraightLine(linePart, pixelArtEvaluationProperty));
          }
        }

        // If we're not going to be drawing curves, draw a faint unevaluated
        // outline to indicate they were detected (when not focused).
        if (!((ref7 = PAE.Criteria.SmoothCurves, indexOf.call(displayedCriteria, ref7) >= 0) || filterValue)) {
          for (n = 0, len5 = lineParts.length; n < len5; n++) {
            linePart = lineParts[n];
            if (!(linePart instanceof PAE.Line.Part.Curve)) {
              continue;
            }
            curveMarkup = Markup.PixelArt.perceivedCurve(linePart);
            curveMarkup.line.width = 0;
            markup.push(curveMarkup);
          }
        }
      }

      // Add markup for smooth curves.
      if (ref8 = PAE.Criteria.SmoothCurves, indexOf.call(displayedCriteria, ref8) >= 0) {
        // Draw perceived lines.
        if (indexOf.call(inflectionPointsFilterValues, filterValue) >= 0) {
          // When focusing on inflection points, we draw just the curvature curve parts.
          for (o = 0, len6 = lines.length; o < len6; o++) {
            line = lines[o];
            // Ignore lines without curves.
            ({
              curveSmoothness
            } = line.evaluate(pixelArtEvaluationProperty));
            if (!(curveSmoothness != null ? curveSmoothness.inflectionPoints.points.length : void 0)) {
              continue;
            }
            ref9 = line.curvatureCurveParts;
            for (p = 0, len7 = ref9.length; p < len7; p++) {
              curve = ref9[p];
              perceivedLineMarkup = Markup.PixelArt.perceivedCurve(curve);
              perceivedLineMarkup.line.arrow = {
                end: true
              };
              perceivedLineMarkup.line.style = betterStyle;

              // Color the line according to the spacing score of the closest inflection point.
              closestInflectionPoint = _.minBy(curveSmoothness.inflectionPoints.points, point => {
                var distanceToEndSegment, distanceToStartSegment, ref10;
                // Constraint to points inside the curve bounds.
                if (curve.startSegmentIndex <= (ref10 = point.inflectionArea.averageEdgeSegmentIndex) && ref10 <= curve.endSegmentIndex) {
                  distanceToStartSegment = point.inflectionArea.averageEdgeSegmentIndex - curve.startSegmentIndex;
                  distanceToEndSegment = curve.endSegmentIndex - point.inflectionArea.averageEdgeSegmentIndex;
                  point._distanceToClosestInflectionPoint = Math.min(distanceToStartSegment, distanceToEndSegment);
                } else {
                  point._distanceToClosestInflectionPoint = Number.POSITIVE_INFINITY;
                }
                return point._distanceToClosestInflectionPoint;
              });
              if (closestInflectionPoint._distanceToClosestInflectionPoint === Number.POSITIVE_INFINITY) {
                // Skip lines that don't overlap an infliction point.
                continue;
              }
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

              // Apply filtering.
              if (PAE.Line.Part.Curve.InflectionPoints[filterValue]) {
                if (closestInflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.dense) {
                  if (filterValue !== PAE.Line.Part.Curve.InflectionPoints.Dense) {
                    continue;
                  }
                } else if (closestInflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.sparse) {
                  if (filterValue !== PAE.Line.Part.Curve.InflectionPoints.Sparse) {
                    continue;
                  }
                } else {
                  if (filterValue !== PAE.Line.Part.Curve.InflectionPoints.Isolated) {
                    continue;
                  }
                }
              }
              perceivedLineMarkup.line.points = Markup.offsetPoints(perceivedLineMarkup.line.points, curve.clockwise ? -1.5 : 1.5);
              markup.push(perceivedLineMarkup);
            }
          }

          // When focusing on abrupt changes, we don't draw curve lines, to focus better on the actual pixel lines.
        } else if (indexOf.call(abruptSegmentLengthChangesFilterValues, filterValue) < 0) {
          // Draw curved parts unless we're focusing on straight parts.
          if (indexOf.call(straightPartsFilterValues, filterValue) < 0) {
            betterStyle = Markup.betterStyle();
            for (q = 0, len8 = lineParts.length; q < len8; q++) {
              linePart = lineParts[q];
              if (!(linePart instanceof PAE.Line.Part.Curve)) {
                continue;
              }
              if (focusedLines.length && (ref10 = linePart.line, indexOf.call(focusedLines, ref10) < 0)) {
                // If we're focusing on a line, skip drawing others.
                continue;
              }
              perceivedLineMarkup = Markup.PixelArt.perceivedCurve(linePart);
              perceivedLineMarkup.line.style = betterStyle;
              markup.push(perceivedLineMarkup);
            }
          }

          // Draw straight parts unless they're already drawn.
          if (ref11 = PAE.Criteria.EvenDiagonals, indexOf.call(displayedCriteria, ref11) < 0) {
            for (r = 0, len9 = lineParts.length; r < len9; r++) {
              linePart = lineParts[r];
              if (!(linePart instanceof PAE.Line.Part.StraightLine)) {
                continue;
              }
              if (focusedLines.length && (ref12 = linePart.line, indexOf.call(focusedLines, ref12) < 0)) {
                // If we're focusing on a line, skip drawing others.
                continue;
              }

              // Draw lines without curves with minimal lines (when unfocused).
              ({
                curveSmoothness
              } = linePart.line.evaluate(pixelArtEvaluationProperty));
              if (!(curveSmoothness || filterValue)) {
                straightLineMarkup = Markup.PixelArt.perceivedStraightLine(linePart);
                straightLineMarkup.line.width = 0;
                markup.push(straightLineMarkup);
                continue;
              }
              perceivedLineMarkup = Markup.PixelArt.perceivedStraightLine(linePart);
              perceivedLineMarkup.line.style = betterStyle;

              // Change the style of straight lines if they are being evaluated.
              if (((ref13 = pixelArtEvaluationProperty.smoothCurves) != null ? ref13.straightParts : void 0) != null) {
                // Straight lines are less problematic when between corners.
                if (linePart.isBetweenStraightParts()) {
                  if (indexOf.call(straightPartsFilterValues, filterValue) >= 0) {
                    continue;
                  }
                }
                if (linePart.isAtTheEndOfCurvedPart()) {
                  perceivedLineMarkup.line.style = mediocreStyle;
                  if (filterValue === PAE.Line.Part.Curve.StraightParts.Middle) {
                    continue;
                  }
                } else if (linePart.isInTheMiddleOfACurvedPart()) {
                  perceivedLineMarkup.line.style = worseStyle;
                  if (filterValue === PAE.Line.Part.Curve.StraightParts.End) {
                    continue;
                  }
                }
              }
              markup.push(perceivedLineMarkup);
            }
          }
        }

        // Write point segment lengths.
        if (!(filterValue && indexOf.call(abruptSegmentLengthChangesFilterValues, filterValue) < 0 || ((ref14 = pixelArtEvaluationProperty.smoothCurves) != null ? ref14.abruptSegmentLengthChanges : void 0) == null)) {
          pointSegmentLengthTextsOptions = {
            abruptEvaluation: true
          };
          for (s = 0, len10 = lineParts.length; s < len10; s++) {
            linePart = lineParts[s];
            if (!(linePart instanceof PAE.Line.Part.Curve)) {
              continue;
            }
            if (focusedLineParts.length && indexOf.call(focusedLineParts, linePart) < 0) {
              // If a line part is focused on, don't draw point segment lengths on other parts.
              continue;
            }

            // If we're not focused on this line specifically, only show abrupt changes, except if focusing on abrupt changes as the category.
            if (filterValue === PAE.Subcriteria.SmoothCurves.AbruptSegmentLengthChanges) {
              pointSegmentLengthTextsOptions.abruptFilterValue = null;
            } else {
              pointSegmentLengthTextsOptions.abruptFilterValue = filterValue;
              if (ref15 = linePart.line, indexOf.call(focusedLines, ref15) < 0) {
                if (pointSegmentLengthTextsOptions.abruptFilterValue == null) {
                  pointSegmentLengthTextsOptions.abruptFilterValue = PAE.Subcriteria.SmoothCurves.AbruptSegmentLengthChanges;
                }
              }
            }
            markup.push(...Markup.PixelArt.pointSegmentLengthTexts(linePart, pointSegmentLengthTextsOptions));
          }
        }

        // Draw inflection points.
        if (!(filterValue && indexOf.call(inflectionPointsFilterValues, filterValue) < 0 || ((ref16 = pixelArtEvaluationProperty.smoothCurves) != null ? ref16.inflectionPoints : void 0) == null)) {
          for (t = 0, len11 = lines.length; t < len11; t++) {
            line = lines[t];
            if (focusedLines.length && indexOf.call(focusedLines, line) < 0) {
              // If we're focusing on a line, skip drawing others.
              continue;
            }
            ({
              curveSmoothness
            } = line.evaluate(pixelArtEvaluationProperty));
            if (!curveSmoothness) {
              // Ignore lines without curves.
              continue;
            }
            ref17 = curveSmoothness.inflectionPoints.points;
            for (u = 0, len12 = ref17.length; u < len12; u++) {
              inflectionPoint = ref17[u];
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

              // Apply filtering
              if (PAE.Line.Part.Curve.InflectionPoints[filterValue]) {
                if (inflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.dense) {
                  if (filterValue !== PAE.Line.Part.Curve.InflectionPoints.Dense) {
                    continue;
                  }
                } else if (inflectionPoint.spacingScore < PAE.Line.Part.Curve.inflectionPointSpacingThresholds.sparse) {
                  if (filterValue !== PAE.Line.Part.Curve.InflectionPoints.Sparse) {
                    continue;
                  }
                } else {
                  if (filterValue !== PAE.Line.Part.Curve.InflectionPoints.Isolated) {
                    continue;
                  }
                }
              }
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
          }
        }

        // Write percentages when analyzing smooth curves.
        if ((ref18 = PAE.Criteria.SmoothCurves, indexOf.call(displayedCriteria, ref18) >= 0) && (focusedLines.length || filterValue)) {
          evaluatedSmoothCurvesSubcriterions = [];
          if (filterValue ? indexOf.call(abruptSegmentLengthChangesFilterValues, filterValue) >= 0 : ((ref19 = pixelArtEvaluationProperty.smoothCurves) != null ? ref19.abruptSegmentLengthChanges : void 0) != null) {
            evaluatedSmoothCurvesSubcriterions.push(PAE.Subcriteria.SmoothCurves.AbruptSegmentLengthChanges);
          }
          if (filterValue ? indexOf.call(straightPartsFilterValues, filterValue) >= 0 : ((ref20 = pixelArtEvaluationProperty.smoothCurves) != null ? ref20.straightParts : void 0) != null) {
            evaluatedSmoothCurvesSubcriterions.push(PAE.Subcriteria.SmoothCurves.StraightParts);
          }
          if (filterValue ? indexOf.call(inflectionPointsFilterValues, filterValue) >= 0 : ((ref21 = pixelArtEvaluationProperty.smoothCurves) != null ? ref21.inflectionPoints : void 0) != null) {
            evaluatedSmoothCurvesSubcriterions.push(PAE.Subcriteria.SmoothCurves.InflectionPoints);
          }
          for (v = 0, len13 = lines.length; v < len13; v++) {
            line = lines[v];
            if (focusedLines.length && indexOf.call(focusedLines, line) < 0) {
              // Skip lines that we're not focused on.
              continue;
            }

            // If we're focusing on specific abrupt segment length changes, skip lines that don't have those changes.
            if (indexOf.call(abruptSegmentLengthChangesSubcriteria, filterValue) >= 0) {
              if (!(counts = (ref22 = line.evaluate()) != null ? (ref23 = ref22.curveSmoothness) != null ? ref23.abruptSegmentLengthChanges.counts : void 0 : void 0)) {
                continue;
              }
              switch (filterValue) {
                case PAE.Line.Part.Curve.AbruptSegmentLengthChanges.Major:
                  if (!counts.major) {
                    continue;
                  }
                  break;
                case PAE.Line.Part.Curve.AbruptSegmentLengthChanges.Minor:
                  if (!counts.minor) {
                    continue;
                  }
              }
            }

            // If we're focusing on specific straight parts, skip lines that don't have those parts.
            if (indexOf.call(straightPartsSubcriteria, filterValue) >= 0) {
              if (!(counts = (ref24 = line.evaluate()) != null ? (ref25 = ref24.curveSmoothness) != null ? ref25.straightParts.counts : void 0 : void 0)) {
                continue;
              }
              switch (filterValue) {
                case PAE.Line.Part.Curve.StraightParts.End:
                  if (!counts.end) {
                    continue;
                  }
                  break;
                case PAE.Line.Part.Curve.StraightParts.Middle:
                  if (!counts.middle) {
                    continue;
                  }
              }
            }

            // If we're focusing on specific inflection points, skip lines that don't have those points.
            if (indexOf.call(inflectionPointsSubcriteria, filterValue) >= 0) {
              if (!(counts = (ref26 = line.evaluate()) != null ? (ref27 = ref26.curveSmoothness) != null ? ref27.inflectionPoints.counts : void 0 : void 0)) {
                continue;
              }
              switch (filterValue) {
                case PAE.Line.Part.Curve.InflectionPoints.Isolated:
                  if (!counts.isolated) {
                    continue;
                  }
                  break;
                case PAE.Line.Part.Curve.InflectionPoints.Sparse:
                  if (!counts.sparse) {
                    continue;
                  }
                  break;
                case PAE.Line.Part.Curve.InflectionPoints.Dense:
                  if (!counts.dense) {
                    continue;
                  }
              }
            }
            markup.push(...Markup.PixelArt.curveSmoothnessEvaluationPercentageTexts(line, evaluatedSmoothCurvesSubcriterions, pixelArtEvaluationProperty));
          }
        }
      }
      if (ref28 = PAE.Criteria.ConsistentLineWidth, indexOf.call(displayedCriteria, ref28) >= 0) {
        for (w = 0, len14 = lines.length; w < len14; w++) {
          line = lines[w];
          if (focusedLines.length && indexOf.call(focusedLines, line) < 0) {
            continue;
          }
          lineEvaluation = line.evaluate(pixelArtEvaluationProperty);
          widthType = lineEvaluation.width.type;

          // Apply filtering.
          if (filterValue) {
            if (filterValue.criterion === PAE.Subcriteria.ConsistentLineWidth.GlobalConsistency) {
              if (widthType !== filterValue.value) {
                continue;
              }
            } else if (filterValue.criterion === PAE.Subcriteria.ConsistentLineWidth.IndividualConsistency) {
              if (filterValue.value === PAE.Line.WidthConsistency.Varying) {
                if (widthType !== PAE.Line.WidthType.Varying) {
                  continue;
                }
              } else {
                if (widthType === PAE.Line.WidthType.Varying) {
                  continue;
                }
              }
            }
          }

          // Draw the line with desired width and colored differently if it's varying.
          lineMarkup = Markup.PixelArt.perceivedLine(line);
          for (x = 0, len15 = lineMarkup.length; x < len15; x++) {
            element = lineMarkup[x];
            element.line.style = widthType === PAE.Line.WidthType.Varying ? mediocreStyle : betterStyle;
            element.line.width = this.constructor.LineWidths[widthType];
          }
          markup.push(...lineMarkup);
        }
      }
      return this.drawMarkup(markup, context, {
        pixelSize: 1 / renderOptions.camera.effectiveScale() * devicePixelRatio,
        displayPixelSize: 1 / renderOptions.camera.effectiveScale() * renderOptions.editor.display.scale()
      });
    }
  }
  ;
  EngineComponent.LineWidths = {
    Thin: 1,
    Thick: 2,
    Wide: 3,
    Varying: 2
  };
  return EngineComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"enginecomponent-debug.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/pixelartevaluation/enginecomponent-debug.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, PAA, PAE, curveColor, deepCoreColor, edgeColor, getStraightLineColor, oldPointColor, pointColor, potentialEdgeColor, segmentBoundaryColor, shallowCoreColor, straightLineColor;
AE = Artificial.Everywhere;
AC = Artificial.Control;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
deepCoreColor = "hsl(100deg 50% 50% / 50%)";
shallowCoreColor = "hsl(60deg 50% 50% / 40%)";
pointColor = "hsl(350deg 50% 50%)";
oldPointColor = "hsl(350deg 25% 50%)";
edgeColor = "hsl(200deg 50% 50% / 50%)";
potentialEdgeColor = "hsl(200deg 10% 10%)";
getStraightLineColor = function (opacity) {
  return "hsl(60deg 50% 50% / ".concat(opacity, ")");
};
straightLineColor = getStraightLineColor(1);
curveColor = "hsl(100deg 50% 50% / 100%)";
segmentBoundaryColor = "hsl(80deg 50% 50% / 100%)";
PAE.EngineComponent = function () {
  class EngineComponent extends PAE.EngineComponent {
    constructor(options) {
      super(...arguments);
      this.options = options;
      if (this.constructor.debug) {
        this.drawCore = new ReactiveField(false);
        this.drawPoints = new ReactiveField(false);
        this.drawLines = new ReactiveField(false);
        this.drawLineParts = new ReactiveField(false);
        this.drawPotentialParts = new ReactiveField(false);
        this.drawCurvatureCurveParts = new ReactiveField(false);
        this.drawSegmentCorners = new ReactiveField(false);
        $(document).on('keydown', event => {
          var field;
          switch (event.which) {
            case AC.Keys['1']:
              field = this.drawCore;
              break;
            case AC.Keys['2']:
              field = this.drawPoints;
              break;
            case AC.Keys['3']:
              field = this.drawLines;
              break;
            case AC.Keys['4']:
              field = this.drawLineParts;
              break;
            case AC.Keys['5']:
              field = this.drawPotentialParts;
              break;
            case AC.Keys['6']:
              field = this.drawCurvatureCurveParts;
              break;
            case AC.Keys['7']:
              field = this.drawSegmentCorners;
          }
          if (field) {
            return field(!field());
          }
        });
      }
    }
    _render(context) {
      var j, k, l, layer, len, len1, len10, len2, len3, len4, len5, len6, len7, len8, len9, line, linePartsProperty, m, n, neighbor, o, p, part, pixel, pixelArtEvaluation, point, q, r, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, t;
      super._render(...arguments);
      if (!this.constructor.debug) {
        return;
      }
      pixelArtEvaluation = this.options.pixelArtEvaluation();
      context.save();
      context.translate(0.5, 0.5);
      ref = pixelArtEvaluation.layers;
      for (j = 0, len = ref.length; j < len; j++) {
        layer = ref[j];
        if (this.drawCore()) {
          // Draw deep core pixels.
          context.beginPath();
          ref1 = layer.pixels;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            pixel = ref1[k];
            if (pixel.isDeepCore) {
              this._addPixelToPath(context, pixel);
            }
          }
          this._diagonalDash(context, pixelArtEvaluation.bitmap.bounds, deepCoreColor);

          // Draw shallow core pixels.
          context.beginPath();
          ref2 = layer.pixels;
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            pixel = ref2[l];
            if (pixel.isShallowCore) {
              this._addPixelToPath(context, pixel);
            }
          }
          this._diagonalDash(context, pixelArtEvaluation.bitmap.bounds, shallowCoreColor);
        }
        if (this.drawPoints()) {
          ref3 = layer.points;
          // Draw point network.
          for (m = 0, len3 = ref3.length; m < len3; m++) {
            point = ref3[m];
            ref4 = point.allNeighbors;
            for (n = 0, len4 = ref4.length; n < len4; n++) {
              neighbor = ref4[n];
              this._drawDebugEdge(context, point, neighbor, potentialEdgeColor);
            }
          }
          ref5 = layer.points;
          for (o = 0, len5 = ref5.length; o < len5; o++) {
            point = ref5[o];
            ref6 = point.neighbors;
            for (p = 0, len6 = ref6.length; p < len6; p++) {
              neighbor = ref6[p];
              this._drawDebugEdge(context, point, neighbor, edgeColor);
            }
          }
          ref7 = layer.points;
          for (q = 0, len7 = ref7.length; q < len7; q++) {
            point = ref7[q];

            // Draw points.
            this._drawDebugPoint(context, point);
          }
        }
        if (this.drawLines()) {
          ref8 = layer.lines;
          for (r = 0, len8 = ref8.length; r < len8; r++) {
            line = ref8[r];
            // Draw lines.
            this._drawDebugLine(context, line);
          }
        }
        if (this.drawLineParts()) {
          // Draw line parts.
          linePartsProperty = 'parts';
          if (typeof this.drawPotentialParts === "function" ? this.drawPotentialParts() : void 0) {
            linePartsProperty = 'potentialParts';
          }
          if (typeof this.drawCurvatureCurveParts === "function" ? this.drawCurvatureCurveParts() : void 0) {
            linePartsProperty = 'curvatureCurveParts';
          }
          ref9 = layer.lines;
          for (s = 0, len9 = ref9.length; s < len9; s++) {
            line = ref9[s];
            ref10 = line[linePartsProperty];
            for (t = 0, len10 = ref10.length; t < len10; t++) {
              part = ref10[t];
              if (part instanceof PAE.Line.Part.StraightLine) {
                this._drawDebugStraightLine(context, part);
              }
              if (part instanceof PAE.Line.Part.Curve) {
                this._drawDebugCurve(context, part, true);
              }
            }
          }
        }
      }
      return context.restore();
    }
    _drawDebugEdge(context, pointA, pointB, color) {
      context.strokeStyle = color;
      context.lineWidth = this._pixelSize * 2;
      context.beginPath();
      context.moveTo(pointA.x, pointA.y);
      context.lineTo(pointB.x, pointB.y);
      return context.stroke();
    }
    _drawDebugPoint(context, point) {
      context.beginPath();
      context.arc(point.x, point.y, this._pixelSize * 3, 0, 2 * Math.PI);
      context.fillStyle = point.old ? oldPointColor : pointColor;
      return context.fill();
    }
    _drawDebugLine(context, line) {
      var hueDegrees, i, j, points, ref;
      hueDegrees = line.id * 137.508 % 360;
      context.strokeStyle = "hsl(".concat(hueDegrees, "deg 50% 50%)");
      context.lineWidth = this._pixelSize * 2;
      context.beginPath();
      points = line.points;
      context.moveTo(points[0].x, points[0].y);
      for (i = j = 1, ref = points.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
        context.lineTo(points[i].x, points[i].y);
      }
      if (line.isClosed) {
        context.lineTo(points[0].x, points[0].y);
      }
      return context.stroke();
    }
    _drawDebugStraightLine(context, straightLine) {
      var j, k, len, len1, point, points, ref, ref1, results, segmentCorners, side;
      context.strokeStyle = straightLineColor;
      context.lineWidth = this._pixelSize * 3;
      context.beginPath();
      context.moveTo(straightLine.displayLine2.start.x, straightLine.displayLine2.start.y);
      context.lineTo(straightLine.displayLine2.end.x, straightLine.displayLine2.end.y);
      context.stroke();
      if (!this.drawSegmentCorners()) {
        return;
      }
      context.strokeStyle = segmentBoundaryColor;
      context.lineWidth = this._pixelSize * 2;
      segmentCorners = straightLine.getSegmentCorners();
      ref = ['left', 'right'];
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        side = ref[j];
        points = segmentCorners[side];
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        ref1 = points.slice(1);
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          point = ref1[k];
          context.lineTo(point.x, point.y);
        }
        results.push(context.stroke());
      }
      return results;
    }
    _drawDebugCurve(context, curve) {
      var end, endIndex, getPoint, j, k, len, point, pointIndex, points, ref, results, start;
      context.strokeStyle = curveColor;
      context.lineWidth = this._pixelSize * 3;
      context.beginPath();
      points = curve.displayPoints;
      getPoint = index => {
        if (curve.isClosed) {
          return points[_.modulo(index, points.length)];
        } else {
          return points[index];
        }
      };
      context.moveTo(points[0].position.x, points[0].position.y);
      endIndex = curve.isClosed ? points.length - 1 : points.length - 2;
      for (pointIndex = j = 0, ref = endIndex; 0 <= ref ? j <= ref : j >= ref; pointIndex = 0 <= ref ? ++j : --j) {
        start = getPoint(pointIndex);
        end = getPoint(pointIndex + 1);
        this._bezierCurve(context, start.controlPoints.after, end.controlPoints.before, end.position);
      }
      context.stroke();
      results = [];
      for (k = 0, len = points.length; k < len; k++) {
        point = points[k];
        results.push(this._drawDebugPoint(context, point.position));
      }
      return results;
    }
    _addPixelToPath(context, pixel) {
      return context.rect(pixel.x - 0.5, pixel.y - 0.5, 1, 1);
    }
    _diagonalDash(context, bounds, color) {
      var j, ref, ref1, ref2, x;
      context.save();
      context.clip();
      context.strokeStyle = color;
      context.lineWidth = this._pixelSize;
      context.beginPath();
      for (x = j = ref = -bounds.height, ref1 = bounds.width, ref2 = 5 * this._pixelSize; ref2 !== 0 && (ref2 > 0 ? j < ref1 : j > ref1); x = j += ref2) {
        context.moveTo(x, 0);
        context.lineTo(x + bounds.height, bounds.height);
      }
      context.stroke();
      return context.restore();
    }
    _bezierCurve(context, controlPoint1, controlPoint2, end) {
      return context.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, end.x, end.y);
    }
  }
  ;
  EngineComponent.debug = false;
  return EngineComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"readabilityanalysis":{"readabilityanalysis.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/readabilityanalysis/readabilityanalysis.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, AP, AS, PAA, PAE;
AE = Artificial.Everywhere;
AP = Artificial.Pyramid;
AS = Artificial.Spectrum;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAE = PAA.Practice.PixelArtEvaluation;
PAA.Practice.ReadabilityAnalysis = class ReadabilityAnalysis {
  // passes: boolean if all regions are readable
  // revealed: boolean if the analysis has been seen by the player, non-versioned
  // regions: an array of parts of the bitmap on which to do the analysis
  //   targetLabel: the label that the region should convey
  //   passes: boolean if the region is readable
  //   recognition:
  //     passes: boolean if the target label is recognized correctly
  //   bounds: the bounds of the region in the bitmap, if not covering the whole bitmap
  //     x, y, width, height
  //   labels: the analysis of which labels get recognized in the image
  //     symbolic, realistic: arrays of label probabilities sorted by probability descending (only labels with 1% and up probability stored in the asset)
  //       label: string with the name
  //       probability: number between 0 and 1 how likely this label is drawn, not stored in the asset
  //       probabilityPercentage: integer between 1 and 100
  static getStrokesFromPixelArtEvaluation(pixelArtEvaluation, bounds) {
    var end, endIndex, extraConnectionCreated, extraNeighbors, getPoint, i, j, k, l, layer, len, len1, len2, len3, len4, line, lineBounds, m, n, neighbor, neighborOutlines, o, part, point, pointIndex, pointOutlines, points, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, start, strokes, vertex, vertexCount, vertexIndex, vertices;
    strokes = [];
    ref = pixelArtEvaluation.layers;
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      ref1 = layer.lines;
      // Convert lines into polygonal chains.
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        line = ref1[j];
        if (bounds) {
          lineBounds = line.getPixelBounds();
          if (lineBounds.maxX < bounds.x) {
            // Skip line if it doesn't intersect with region bounds
            continue;
          }
          if (lineBounds.maxY < bounds.y) {
            continue;
          }
          if (lineBounds.minX >= bounds.x + bounds.width) {
            continue;
          }
          if (lineBounds.minY >= bounds.y + bounds.height) {
            continue;
          }
        }
        vertices = [];
        ref2 = line.parts;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          part = ref2[k];
          if (part instanceof PAE.Line.Part.StraightLine) {
            vertices.push(part.displayLine2.start, part.displayLine2.end);
          } else if (part instanceof PAE.Line.Part.Curve) {
            points = part.displayPoints;
            getPoint = index => {
              if (part.isClosed) {
                return points[_.modulo(index, points.length)];
              } else {
                return points[index];
              }
            };
            vertices.push(points[0].position);
            endIndex = part.isClosed ? points.length - 1 : points.length - 2;
            for (pointIndex = l = 0, ref3 = endIndex; 0 <= ref3 ? l <= ref3 : l >= ref3; pointIndex = 0 <= ref3 ? ++l : --l) {
              start = getPoint(pointIndex);
              end = getPoint(pointIndex + 1);
              vertexCount = 2 * Math.ceil(Math.max(2, Math.abs(start.position.x - end.position.x), Math.abs(start.position.y - end.position.y)));
              for (vertexIndex = m = 1, ref4 = vertexCount; 1 <= ref4 ? m < ref4 : m > ref4; vertexIndex = 1 <= ref4 ? ++m : --m) {
                vertices.push(AP.BezierCurve.getPointOnCubicBezierCurve(start.position, start.controlPoints.after, end.controlPoints.before, end.position, vertexIndex / (vertexCount - 1)));
              }
            }
          }
        }
        strokes.push(new AP.PolygonalChain(vertices));
      }
      ref5 = layer.points;

      // Add extra connections based on points.
      for (n = 0, len3 = ref5.length; n < len3; n++) {
        point = ref5[n];
        if (bounds) {
          if (!(0 <= (ref6 = point.x - bounds.x) && ref6 < bounds.width)) {
            // Skip point if it doesn't lie in region bounds
            continue;
          }
          if (!(0 <= (ref7 = point.y - bounds.y) && ref7 < bounds.width)) {
            continue;
          }
        }
        extraConnectionCreated = false;

        // Add lines between extra neighbors that haven't been connected with lines.
        extraNeighbors = _.difference(point.allNeighbors, point.neighbors);
        pointOutlines = point.getOutlines();
        for (o = 0, len4 = extraNeighbors.length; o < len4; o++) {
          neighbor = extraNeighbors[o];
          // Skip lines between outline points of the same outline.
          if (pointOutlines) {
            neighborOutlines = neighbor.getOutlines();
            if (_.intersection(pointOutlines, neighborOutlines).length > 0) {
              continue;
            }
          }
          strokes.push(new AP.PolygonalChain([new THREE.Vector2(point.x, point.y), new THREE.Vector2(neighbor.x, neighbor.y)]));
        }

        // Create a (dummy) line if no other connection was found.
        if (!(extraConnectionCreated || point.lines.length)) {
          vertex = new THREE.Vector2(point.x, point.y);
          strokes.push(new AP.PolygonalChain([vertex, vertex]));
        }
      }
    }
    return strokes;
  }
  constructor(bitmap1) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var base, inputSize;
    this.bitmap = bitmap1;
    this.options = options;
    if ((base = this.options).preserveNoisyFeatures == null) {
      base.preserveNoisyFeatures = true;
    }
    this.regions = null;
    this.pixelArtEvaluation = new PAE(this.bitmap, this.options);
    this.classifiers = {
      symbolic: new PAA.ImageClassification.SimpleClassifier.Symbolic(),
      realistic: new PAA.ImageClassification.SimpleClassifier.Realistic()
    };
    Meteor.setTimeout(async () => {
      var classifier, classifierName, ref, results;
      ref = this.classifiers;
      results = [];
      for (classifierName in ref) {
        classifier = ref[classifierName];
        results.push(await classifier.createInferenceSession());
      }
      return results;
    });
    this._classificationDependency = new Tracker.Dependency();
    inputSize = PAA.ImageClassification.SimpleClassifier.inputSize;
    this._classificationInputData = [];
    this._depixelizerSourceCanvas = new AM.ReadableCanvas(this.bitmap.bounds.width + 2, this.bitmap.bounds.height + 2);
    this.regionsOptions = new ReactiveField(this._extractRegionsOptions(this.bitmap), EJSON.equals);
    this.analyzing = new ReactiveField(false);
    this._classificationCounter = 0;
    this._classificationAutorun = Tracker.autorun(computation => {
      var classificationCounter, classifier, classifierName, ref, regionsOptions;
      ref = this.classifiers;
      for (classifierName in ref) {
        classifier = ref[classifierName];
        if (!classifier.ready()) {
          return;
        }
      }
      if (!(regionsOptions = this.regionsOptions())) {
        return;
      }
      // Re-run every time we get new lines and points from the pixel art evaluation.
      this.pixelArtEvaluation.depend();

      // Track which re-run this is so we can cancel previous runs that are still going.
      this._classificationCounter++;
      classificationCounter = this._classificationCounter;
      return (classificationCounter => {
        return Tracker.nonreactive(async () => {
          var base1, base2, base3, canvasX, canvasY, classificationPromises, classifierResult, classifierResults, classifierType, dataIndex, depixelizerClassifierResults, depixelizerResultIsBetter, depixelizerStrokes, i, imageData, j, k, l, len, len1, len2, m, maxTargetProbability, pixelArtEvaluationClassifierResults, pixelArtEvaluationStrokes, ref1, ref2, ref3, ref4, region, regionIndex, regionOptions, regions, spline, splines, x, y;
          this.analyzing(true);

          // Split the bitmap into regions.
          regions = [];
          for (regionIndex = i = 0, len = regionsOptions.length; i < len; regionIndex = ++i) {
            regionOptions = regionsOptions[regionIndex];
            if (classificationCounter !== this._classificationCounter) {
              return;
            }
            region = _.clone(regionOptions);
            regions.push(region);

            // Generate strokes from detected elements.
            pixelArtEvaluationStrokes = this.constructor.getStrokesFromPixelArtEvaluation(this.pixelArtEvaluation, region.bounds);
            if (!pixelArtEvaluationStrokes.length) {
              continue;
            }

            // Convert strokes into input data for the classifiers.
            if ((base1 = this._classificationInputData)[regionIndex] == null) {
              base1[regionIndex] = {};
            }
            if ((base2 = this._classificationInputData[regionIndex]).pixelArtEvaluation == null) {
              base2.pixelArtEvaluation = new Float32Array(inputSize * inputSize);
            }
            PAA.ImageClassification.SimpleClassifier.convertStrokesToInputData(pixelArtEvaluationStrokes, this._classificationInputData[regionIndex].pixelArtEvaluation);
            // Run classification.
            classificationPromises = function () {
              var ref1, results;
              ref1 = this.classifiers;
              results = [];
              for (classifierType in ref1) {
                classifier = ref1[classifierType];
                results.push(((classifierType, classifier) => {
                  return new Promise(async (resolve, reject) => {
                    var labelProbabilities;
                    labelProbabilities = await classifier.classify(this._classificationInputData[regionIndex].pixelArtEvaluation);
                    return resolve({
                      classifierType,
                      labelProbabilities
                    });
                  });
                })(classifierType, classifier));
              }
              return results;
            }.call(this);
            pixelArtEvaluationClassifierResults = await Promise.all(classificationPromises);
            if (classificationCounter !== this._classificationCounter) {
              return;
            }

            // Retry classification with depixelized strokes.
            depixelizerStrokes = [];
            imageData = this._depixelizerSourceCanvas.getFullImageData();
            for (x = j = ref1 = this.bitmap.bounds.left, ref2 = this.bitmap.bounds.right; ref1 <= ref2 ? j <= ref2 : j >= ref2; x = ref1 <= ref2 ? ++j : --j) {
              for (y = k = ref3 = this.bitmap.bounds.top, ref4 = this.bitmap.bounds.bottom; ref3 <= ref4 ? k <= ref4 : k >= ref4; y = ref3 <= ref4 ? ++k : --k) {
                canvasX = x - this.bitmap.bounds.left + 1;
                canvasY = y - this.bitmap.bounds.top + 1;
                dataIndex = (canvasX + canvasY * imageData.width) * 4 + 3;
                imageData.data[dataIndex] = 0;
                if (region.bounds) {
                  if (!(region.bounds.x <= x && x < region.bounds.x + region.bounds.width)) {
                    // Skip the pixel if it isn't in the region bounds.
                    continue;
                  }
                  if (!(region.bounds.y <= y && y < region.bounds.y + region.bounds.height)) {
                    continue;
                  }
                }
                if (this.bitmap.findPixelAtAbsoluteCoordinates(x, y)) {
                  imageData.data[dataIndex] = 255;
                }
              }
            }
            this._depixelizerSourceCanvas.putFullImageData(imageData);
            splines = AS.PixelArt.Upscaling.Depixelizer.getBSplines(this._depixelizerSourceCanvas);
            for (l = 0, len1 = splines.length; l < len1; l++) {
              spline = splines[l];
              depixelizerStrokes.push(spline.getPolygonalChain(4));
            }
            if ((base3 = this._classificationInputData[regionIndex]).depixelizer == null) {
              base3.depixelizer = new Float32Array(inputSize * inputSize);
            }
            PAA.ImageClassification.SimpleClassifier.convertStrokesToInputData(depixelizerStrokes, this._classificationInputData[regionIndex].depixelizer);
            // Run classification.
            classificationPromises = function () {
              var ref5, results;
              ref5 = this.classifiers;
              results = [];
              for (classifierType in ref5) {
                classifier = ref5[classifierType];
                results.push(((classifierType, classifier) => {
                  return new Promise(async (resolve, reject) => {
                    var labelProbabilities;
                    labelProbabilities = await classifier.classify(this._classificationInputData[regionIndex].depixelizer);
                    return resolve({
                      classifierType,
                      labelProbabilities
                    });
                  });
                })(classifierType, classifier));
              }
              return results;
            }.call(this);
            depixelizerClassifierResults = await Promise.all(classificationPromises);
            if (classificationCounter !== this._classificationCounter) {
              return;
            }
            maxTargetProbability = classifierResults => {
              var classifierResult, len2, m, targetLabelProbability, targetProbability;
              targetProbability = 0;
              for (m = 0, len2 = classifierResults.length; m < len2; m++) {
                classifierResult = classifierResults[m];
                targetLabelProbability = _.find(classifierResult.labelProbabilities, labelProbability => {
                  return labelProbability.label === region.targetLabel;
                });
                targetProbability = Math.max(targetProbability, targetLabelProbability.probability);
              }
              return targetProbability;
            };
            depixelizerResultIsBetter = maxTargetProbability(depixelizerClassifierResults) > maxTargetProbability(pixelArtEvaluationClassifierResults);
            if (depixelizerResultIsBetter) {
              classifierResults = depixelizerClassifierResults;
              this._classificationInputData[regionIndex].better = this._classificationInputData[regionIndex].depixelizer;
            } else {
              classifierResults = pixelArtEvaluationClassifierResults;
              this._classificationInputData[regionIndex].better = this._classificationInputData[regionIndex].pixelArtEvaluation;
            }

            // Store label probabilities into the region.
            region.labels = {};
            for (m = 0, len2 = classifierResults.length; m < len2; m++) {
              classifierResult = classifierResults[m];
              region.labels[classifierResult.classifierType] = classifierResult.labelProbabilities;
            }
          }

          // The analysis completed without being cancelled due to a re-run so save new results.
          this.regions = regions;
          this.analyzing(false);
          return this._classificationDependency.changed();
        });
      })(classificationCounter);
    });
    // Subscribe to changes of the readability property.
    LOI.Assets.Bitmap.versionedDocuments.operationsExecuted.addHandler(this, this.onOperationsExecuted);
  }
  destroy() {
    this._classificationAutorun.stop();
    this.pixelArtEvaluation.destroy();
    return LOI.Assets.Bitmap.versionedDocuments.operationsExecuted.removeHandler(this, this.onOperationsExecuted);
  }
  depend() {
    return this._classificationDependency.depend();
  }
  onOperationsExecuted(document, operations, changedFields) {
    var ref;
    if (document._id !== this.bitmap._id) {
      return;
    }
    if (!((ref = changedFields.properties) != null ? ref.readabilityAnalysis : void 0)) {
      return;
    }
    return this.regionsOptions(this._extractRegionsOptions(document));
  }
  _extractRegionsOptions(bitmap) {
    var i, len, ref, ref1, region, regions, results;
    if (!(regions = (ref = bitmap.properties) != null ? (ref1 = ref.readabilityAnalysis) != null ? ref1.regions : void 0 : void 0)) {
      return {};
    }
    results = [];
    for (i = 0, len = regions.length; i < len; i++) {
      region = regions[i];
      results.push(_.pick(region, 'targetLabel', 'bounds'));
    }
    return results;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"enginecomponent.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/readabilityanalysis/enginecomponent.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, Atari2600, LOI, Markup, PAA, PAE, RA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
RA = PAA.Practice.ReadabilityAnalysis;
PAE = PAA.Practice.PixelArtEvaluation;
Atari2600 = LOI.Assets.Palette.Atari2600;
Markup = PAA.Practice.Helpers.Drawing.Markup;
RA.EngineComponent = class EngineComponent extends PAA.Practice.Helpers.Drawing.Markup.EngineComponent {
  constructor(options) {
    super(...arguments);
    this.options = options;
    this.ready = new ComputedField(() => {
      var ref;
      if (!((ref = this.options.readabilityAnalysis()) != null ? ref.regions : void 0)) {
        return;
      }
      if (!LOI.palette()) {
        return;
      }
      return true;
    });
  }
  drawToContext(context) {
    let renderOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.ready()) {
      return;
    }
    this._pixelSize = 1 / renderOptions.camera.effectiveScale();
    return this._render(context, renderOptions);
  }
  _render(context, renderOptions) {}
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"enginecomponent-debug.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-practice/readabilityanalysis/enginecomponent-debug.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, AM, PAA, RA;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
AC = Artificial.Control;
PAA = PixelArtAcademy;
RA = PAA.Practice.ReadabilityAnalysis;
RA.EngineComponent = function () {
  class EngineComponent extends RA.EngineComponent {
    constructor(options) {
      var inputSize, toggleProperty;
      super(...arguments);
      this.options = options;
      if (this.constructor.debug) {
        this.drawInputProperty = new ReactiveField(null);
        toggleProperty = newProperty => {
          var existingProperty;
          existingProperty = this.drawInputProperty();
          if (newProperty === existingProperty) {
            return this.drawInputProperty(null);
          } else {
            return this.drawInputProperty(newProperty);
          }
        };
        $(document).on('keydown', event => {
          switch (event.which) {
            case AC.Keys['1']:
              return toggleProperty('better');
            case AC.Keys['2']:
              return toggleProperty('pixelArtEvaluation');
            case AC.Keys['3']:
              return toggleProperty('depixelizer');
          }
        });
        inputSize = PAA.ImageClassification.SimpleClassifier.inputSize;
        this.inputCanvas = new AM.ReadableCanvas(inputSize, inputSize);
        this.inputImageData = this.inputCanvas.getFullImageData();
        this.inputImageData.data.fill(100);
      }
    }
    _render(context, renderOptions) {
      var bounds, inputProperty, j, len, readabilityAnalysis, ref, region, regionIndex;
      if (!this.constructor.debug) {
        return;
      }
      readabilityAnalysis = this.options.readabilityAnalysis();
      context.save();
      if (inputProperty = this.drawInputProperty()) {
        ref = readabilityAnalysis.regions;
        for (regionIndex = j = 0, len = ref.length; j < len; regionIndex = ++j) {
          region = ref[regionIndex];
          if (!readabilityAnalysis._classificationInputData[regionIndex]) {
            continue;
          }
          bounds = region.bounds || readabilityAnalysis.bitmap.bounds;
          this._drawInput(context, readabilityAnalysis._classificationInputData[regionIndex][inputProperty], bounds);
        }
      }
      return context.restore();
    }
    _drawInput(context, inputData, bounds) {
      var i, j, ref;
      for (i = j = 0, ref = inputData.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        this.inputImageData.data[i * 4 + 3] = 50 + inputData[i] / 255 * 150;
      }
      this.inputCanvas.putFullImageData(this.inputImageData);
      return context.drawImage(this.inputCanvas, (bounds != null ? bounds.x : void 0) || 0, (bounds != null ? bounds.y : void 0) || 0, (bounds != null ? bounds.width : void 0) || this.inputCanvas.width, (bounds != null ? bounds.height : void 0) || this.inputCanvas.height);
    }
  }
  ;
  EngineComponent.debug = false;
  return EngineComponent;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node_modules":{"quill-delta":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/quill-delta/package.json                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "quill-delta",
  "version": "4.2.2",
  "main": "dist/Delta.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dist":{"Delta.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/quill-delta/dist/Delta.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fast_diff_1 = __importDefault(require("fast-diff"));
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
var AttributeMap_1 = __importDefault(require("./AttributeMap"));
var Op_1 = __importDefault(require("./Op"));
var NULL_CHARACTER = String.fromCharCode(0); // Placeholder char for embed in diff()
var Delta = /** @class */ (function () {
    function Delta(ops) {
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
    Delta.prototype.insert = function (arg, attributes) {
        var newOp = {};
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
    };
    Delta.prototype.delete = function (length) {
        if (length <= 0) {
            return this;
        }
        return this.push({ delete: length });
    };
    Delta.prototype.retain = function (length, attributes) {
        if (length <= 0) {
            return this;
        }
        var newOp = { retain: length };
        if (attributes != null &&
            typeof attributes === 'object' &&
            Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
        }
        return this.push(newOp);
    };
    Delta.prototype.push = function (newOp) {
        var index = this.ops.length;
        var lastOp = this.ops[index - 1];
        newOp = lodash_clonedeep_1.default(newOp);
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
            if (lodash_isequal_1.default(newOp.attributes, lastOp.attributes)) {
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
    };
    Delta.prototype.chop = function () {
        var lastOp = this.ops[this.ops.length - 1];
        if (lastOp && lastOp.retain && !lastOp.attributes) {
            this.ops.pop();
        }
        return this;
    };
    Delta.prototype.filter = function (predicate) {
        return this.ops.filter(predicate);
    };
    Delta.prototype.forEach = function (predicate) {
        this.ops.forEach(predicate);
    };
    Delta.prototype.map = function (predicate) {
        return this.ops.map(predicate);
    };
    Delta.prototype.partition = function (predicate) {
        var passed = [];
        var failed = [];
        this.forEach(function (op) {
            var target = predicate(op) ? passed : failed;
            target.push(op);
        });
        return [passed, failed];
    };
    Delta.prototype.reduce = function (predicate, initialValue) {
        return this.ops.reduce(predicate, initialValue);
    };
    Delta.prototype.changeLength = function () {
        return this.reduce(function (length, elem) {
            if (elem.insert) {
                return length + Op_1.default.length(elem);
            }
            else if (elem.delete) {
                return length - elem.delete;
            }
            return length;
        }, 0);
    };
    Delta.prototype.length = function () {
        return this.reduce(function (length, elem) {
            return length + Op_1.default.length(elem);
        }, 0);
    };
    Delta.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = Infinity; }
        var ops = [];
        var iter = Op_1.default.iterator(this.ops);
        var index = 0;
        while (index < end && iter.hasNext()) {
            var nextOp = void 0;
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
    };
    Delta.prototype.compose = function (other) {
        var thisIter = Op_1.default.iterator(this.ops);
        var otherIter = Op_1.default.iterator(other.ops);
        var ops = [];
        var firstOther = otherIter.peek();
        if (firstOther != null &&
            typeof firstOther.retain === 'number' &&
            firstOther.attributes == null) {
            var firstLeft = firstOther.retain;
            while (thisIter.peekType() === 'insert' &&
                thisIter.peekLength() <= firstLeft) {
                firstLeft -= thisIter.peekLength();
                ops.push(thisIter.next());
            }
            if (firstOther.retain - firstLeft > 0) {
                otherIter.next(firstOther.retain - firstLeft);
            }
        }
        var delta = new Delta(ops);
        while (thisIter.hasNext() || otherIter.hasNext()) {
            if (otherIter.peekType() === 'insert') {
                delta.push(otherIter.next());
            }
            else if (thisIter.peekType() === 'delete') {
                delta.push(thisIter.next());
            }
            else {
                var length_1 = Math.min(thisIter.peekLength(), otherIter.peekLength());
                var thisOp = thisIter.next(length_1);
                var otherOp = otherIter.next(length_1);
                if (typeof otherOp.retain === 'number') {
                    var newOp = {};
                    if (typeof thisOp.retain === 'number') {
                        newOp.retain = length_1;
                    }
                    else {
                        newOp.insert = thisOp.insert;
                    }
                    // Preserve null when composing with a retain, otherwise remove it for inserts
                    var attributes = AttributeMap_1.default.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
                    if (attributes) {
                        newOp.attributes = attributes;
                    }
                    delta.push(newOp);
                    // Optimization if rest of other is just retain
                    if (!otherIter.hasNext() &&
                        lodash_isequal_1.default(delta.ops[delta.ops.length - 1], newOp)) {
                        var rest = new Delta(thisIter.rest());
                        return delta.concat(rest).chop();
                    }
                    // Other op should be delete, we could be an insert or retain
                    // Insert + delete cancels out
                }
                else if (typeof otherOp.delete === 'number' &&
                    typeof thisOp.retain === 'number') {
                    delta.push(otherOp);
                }
            }
        }
        return delta.chop();
    };
    Delta.prototype.concat = function (other) {
        var delta = new Delta(this.ops.slice());
        if (other.ops.length > 0) {
            delta.push(other.ops[0]);
            delta.ops = delta.ops.concat(other.ops.slice(1));
        }
        return delta;
    };
    Delta.prototype.diff = function (other, cursor) {
        if (this.ops === other.ops) {
            return new Delta();
        }
        var strings = [this, other].map(function (delta) {
            return delta
                .map(function (op) {
                if (op.insert != null) {
                    return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
                }
                var prep = delta === other ? 'on' : 'with';
                throw new Error('diff() called ' + prep + ' non-document');
            })
                .join('');
        });
        var retDelta = new Delta();
        var diffResult = fast_diff_1.default(strings[0], strings[1], cursor);
        var thisIter = Op_1.default.iterator(this.ops);
        var otherIter = Op_1.default.iterator(other.ops);
        diffResult.forEach(function (component) {
            var length = component[1].length;
            while (length > 0) {
                var opLength = 0;
                switch (component[0]) {
                    case fast_diff_1.default.INSERT:
                        opLength = Math.min(otherIter.peekLength(), length);
                        retDelta.push(otherIter.next(opLength));
                        break;
                    case fast_diff_1.default.DELETE:
                        opLength = Math.min(length, thisIter.peekLength());
                        thisIter.next(opLength);
                        retDelta.delete(opLength);
                        break;
                    case fast_diff_1.default.EQUAL:
                        opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
                        var thisOp = thisIter.next(opLength);
                        var otherOp = otherIter.next(opLength);
                        if (lodash_isequal_1.default(thisOp.insert, otherOp.insert)) {
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
    };
    Delta.prototype.eachLine = function (predicate, newline) {
        if (newline === void 0) { newline = '\n'; }
        var iter = Op_1.default.iterator(this.ops);
        var line = new Delta();
        var i = 0;
        while (iter.hasNext()) {
            if (iter.peekType() !== 'insert') {
                return;
            }
            var thisOp = iter.peek();
            var start = Op_1.default.length(thisOp) - iter.peekLength();
            var index = typeof thisOp.insert === 'string'
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
    };
    Delta.prototype.invert = function (base) {
        var inverted = new Delta();
        this.reduce(function (baseIndex, op) {
            if (op.insert) {
                inverted.delete(Op_1.default.length(op));
            }
            else if (op.retain && op.attributes == null) {
                inverted.retain(op.retain);
                return baseIndex + op.retain;
            }
            else if (op.delete || (op.retain && op.attributes)) {
                var length_2 = (op.delete || op.retain);
                var slice = base.slice(baseIndex, baseIndex + length_2);
                slice.forEach(function (baseOp) {
                    if (op.delete) {
                        inverted.push(baseOp);
                    }
                    else if (op.retain && op.attributes) {
                        inverted.retain(Op_1.default.length(baseOp), AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
                    }
                });
                return baseIndex + length_2;
            }
            return baseIndex;
        }, 0);
        return inverted.chop();
    };
    Delta.prototype.transform = function (arg, priority) {
        if (priority === void 0) { priority = false; }
        priority = !!priority;
        if (typeof arg === 'number') {
            return this.transformPosition(arg, priority);
        }
        var other = arg;
        var thisIter = Op_1.default.iterator(this.ops);
        var otherIter = Op_1.default.iterator(other.ops);
        var delta = new Delta();
        while (thisIter.hasNext() || otherIter.hasNext()) {
            if (thisIter.peekType() === 'insert' &&
                (priority || otherIter.peekType() !== 'insert')) {
                delta.retain(Op_1.default.length(thisIter.next()));
            }
            else if (otherIter.peekType() === 'insert') {
                delta.push(otherIter.next());
            }
            else {
                var length_3 = Math.min(thisIter.peekLength(), otherIter.peekLength());
                var thisOp = thisIter.next(length_3);
                var otherOp = otherIter.next(length_3);
                if (thisOp.delete) {
                    // Our delete either makes their delete redundant or removes their retain
                    continue;
                }
                else if (otherOp.delete) {
                    delta.push(otherOp);
                }
                else {
                    // We retain either their retain or insert
                    delta.retain(length_3, AttributeMap_1.default.transform(thisOp.attributes, otherOp.attributes, priority));
                }
            }
        }
        return delta.chop();
    };
    Delta.prototype.transformPosition = function (index, priority) {
        if (priority === void 0) { priority = false; }
        priority = !!priority;
        var thisIter = Op_1.default.iterator(this.ops);
        var offset = 0;
        while (thisIter.hasNext() && offset <= index) {
            var length_4 = thisIter.peekLength();
            var nextType = thisIter.peekType();
            thisIter.next();
            if (nextType === 'delete') {
                index -= Math.min(length_4, index - offset);
                continue;
            }
            else if (nextType === 'insert' && (offset < index || !priority)) {
                index += length_4;
            }
            offset += length_4;
        }
        return index;
    };
    Delta.Op = Op_1.default;
    Delta.AttributeMap = AttributeMap_1.default;
    return Delta;
}());
module.exports = Delta;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"AttributeMap.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/quill-delta/dist/AttributeMap.js               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
var AttributeMap;
(function (AttributeMap) {
    function compose(a, b, keepNull) {
        if (a === void 0) { a = {}; }
        if (b === void 0) { b = {}; }
        if (typeof a !== 'object') {
            a = {};
        }
        if (typeof b !== 'object') {
            b = {};
        }
        var attributes = lodash_clonedeep_1.default(b);
        if (!keepNull) {
            attributes = Object.keys(attributes).reduce(function (copy, key) {
                if (attributes[key] != null) {
                    copy[key] = attributes[key];
                }
                return copy;
            }, {});
        }
        for (var key in a) {
            if (a[key] !== undefined && b[key] === undefined) {
                attributes[key] = a[key];
            }
        }
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.compose = compose;
    function diff(a, b) {
        if (a === void 0) { a = {}; }
        if (b === void 0) { b = {}; }
        if (typeof a !== 'object') {
            a = {};
        }
        if (typeof b !== 'object') {
            b = {};
        }
        var attributes = Object.keys(a)
            .concat(Object.keys(b))
            .reduce(function (attrs, key) {
            if (!lodash_isequal_1.default(a[key], b[key])) {
                attrs[key] = b[key] === undefined ? null : b[key];
            }
            return attrs;
        }, {});
        return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
    AttributeMap.diff = diff;
    function invert(attr, base) {
        if (attr === void 0) { attr = {}; }
        if (base === void 0) { base = {}; }
        attr = attr || {};
        var baseInverted = Object.keys(base).reduce(function (memo, key) {
            if (base[key] !== attr[key] && attr[key] !== undefined) {
                memo[key] = base[key];
            }
            return memo;
        }, {});
        return Object.keys(attr).reduce(function (memo, key) {
            if (attr[key] !== base[key] && base[key] === undefined) {
                memo[key] = null;
            }
            return memo;
        }, baseInverted);
    }
    AttributeMap.invert = invert;
    function transform(a, b, priority) {
        if (priority === void 0) { priority = false; }
        if (typeof a !== 'object') {
            return b;
        }
        if (typeof b !== 'object') {
            return undefined;
        }
        if (!priority) {
            return b; // b simply overwrites us without priority
        }
        var attributes = Object.keys(b).reduce(function (attrs, key) {
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
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/quill-delta/dist/Op.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Iterator_1 = __importDefault(require("./Iterator"));
var Op;
(function (Op) {
    function iterator(ops) {
        return new Iterator_1.default(ops);
    }
    Op.iterator = iterator;
    function length(op) {
        if (typeof op.delete === 'number') {
            return op.delete;
        }
        else if (typeof op.retain === 'number') {
            return op.retain;
        }
        else {
            return typeof op.insert === 'string' ? op.insert.length : 1;
        }
    }
    Op.length = length;
})(Op || (Op = {}));
exports.default = Op;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Iterator.js":function module(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/quill-delta/dist/Iterator.js                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Op_1 = __importDefault(require("./Op"));
var Iterator = /** @class */ (function () {
    function Iterator(ops) {
        this.ops = ops;
        this.index = 0;
        this.offset = 0;
    }
    Iterator.prototype.hasNext = function () {
        return this.peekLength() < Infinity;
    };
    Iterator.prototype.next = function (length) {
        if (!length) {
            length = Infinity;
        }
        var nextOp = this.ops[this.index];
        if (nextOp) {
            var offset = this.offset;
            var opLength = Op_1.default.length(nextOp);
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
                var retOp = {};
                if (nextOp.attributes) {
                    retOp.attributes = nextOp.attributes;
                }
                if (typeof nextOp.retain === 'number') {
                    retOp.retain = length;
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
    };
    Iterator.prototype.peek = function () {
        return this.ops[this.index];
    };
    Iterator.prototype.peekLength = function () {
        if (this.ops[this.index]) {
            // Should never return 0 if our index is being managed correctly
            return Op_1.default.length(this.ops[this.index]) - this.offset;
        }
        else {
            return Infinity;
        }
    };
    Iterator.prototype.peekType = function () {
        if (this.ops[this.index]) {
            if (typeof this.ops[this.index].delete === 'number') {
                return 'delete';
            }
            else if (typeof this.ops[this.index].retain === 'number') {
                return 'retain';
            }
            else {
                return 'insert';
            }
        }
        return 'retain';
    };
    Iterator.prototype.rest = function () {
        if (!this.hasNext()) {
            return [];
        }
        else if (this.offset === 0) {
            return this.ops.slice(this.index);
        }
        else {
            var offset = this.offset;
            var index = this.index;
            var next = this.next();
            var rest = this.ops.slice(this.index);
            this.offset = offset;
            this.index = index;
            return [next].concat(rest);
        }
    };
    return Iterator;
}());
exports.default = Iterator;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"fast-diff":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/fast-diff/package.json                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "fast-diff",
  "version": "1.2.0",
  "main": "diff.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"diff.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/fast-diff/diff.js                              //
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
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2, cursor_pos, _fix_unicode) {
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
  return diffs;
};


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
      [DIFF_INSERT, longtext.substring(i + shorttext.length)]
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
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
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
};


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
  var front = (delta % 2 !== 0);
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
        x1 < text1_length && y1 < text2_length &&
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
        x2 < text1_length && y2 < text2_length &&
        text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)
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
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


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
};


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
};


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
};


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
    return null;  // Pointless.
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
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
      var prefixLength = diff_commonPrefix(
        longtext.substring(i), shorttext.substring(j));
      var suffixLength = diff_commonSuffix(
        longtext.substring(0, i), shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(
          j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [
        best_longtext_a, best_longtext_b,
        best_shorttext_a, best_shorttext_b, best_common
      ];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
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
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 * @param {boolean} fix_unicode Whether to normalize to a unicode-correct diff
 */
function diff_cleanupMerge(diffs, fix_unicode) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
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
          if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
            var stray = diffs[previous_equality][1].slice(-1);
            diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1);
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
                diffs[previous_equality][1] += text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixes.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] =
                text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length - commonlength);
              text_delete = text_delete.substring(0, text_delete.length - commonlength);
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
            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
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
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] === DIFF_EQUAL &&
      diffs[pointer + 1][0] === DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
        diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
          diffs[pointer][1].substring(0, diffs[pointer][1].length -
            diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
        diffs[pointer + 1][1]) {
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
};

function is_surrogate_pair_start(charCode) {
  return charCode >= 0xD800 && charCode <= 0xDBFF;
}

function is_surrogate_pair_end(charCode) {
  return charCode >= 0xDC00 && charCode <= 0xDFFF;
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
    [DIFF_EQUAL, after]
  ]);
}

function find_cursor_edit_diff(oldText, newText, cursor_pos) {
  // note: this runs after equality check has ruled out exact equality
  var oldRange = typeof cursor_pos === 'number' ?
    { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
  var newRange = typeof cursor_pos === 'number' ?
    null : cursor_pos.newRange;
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

function diff(text1, text2, cursor_pos) {
  // only pass fix_unicode=true at the top level, not when diff_main is
  // recursively invoked
  return diff_main(text1, text2, cursor_pos, true);
}

diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;

module.exports = diff;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lodash.clonedeep":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/lodash.clonedeep/package.json                  //
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
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/lodash.clonedeep/index.js                      //
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
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/lodash.isequal/package.json                    //
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
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/lodash.isequal/index.js                        //
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

}},"path-data-polyfill":{"path-data-polyfill.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-practice/node_modules/path-data-polyfill/path-data-polyfill.js       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// @info
//   Polyfill for SVG getPathData() and setPathData() methods. Based on:
//   - SVGPathSeg polyfill by Philip Rogers (MIT License)
//     https://github.com/progers/pathseg
//   - SVGPathNormalizer by Tadahisa Motooka (MIT License)
//     https://github.com/motooka/SVGPathNormalizer/tree/master/src
//   - arcToCubicCurves() by Dmitry Baranovskiy (MIT License)
//     https://github.com/DmitryBaranovskiy/raphael/blob/v2.1.1/raphael.core.js#L1837
// @author
//   Jarosław Foksa
// @license
//   MIT License
(function() {
  var clonePathData = function(pathData) {
    return pathData.map( function(seg) {
      return {type: seg.type, values: Array.prototype.slice.call(seg.values)}
    });
  };

  // @info
  //   Takes any path data, returns path data that consists only from absolute commands.
  var absolutizePathData = function(pathData) {
    var absolutizedPathData = [];

    var currentX = null;
    var currentY = null;

    var subpathX = null;
    var subpathY = null;

    pathData.forEach( function(seg) {
      var type = seg.type;

      if (type === "M") {
        var x = seg.values[0];
        var y = seg.values[1];

        absolutizedPathData.push({type: "M", values: [x, y]});

        subpathX = x;
        subpathY = y;

        currentX = x;
        currentY = y;
      }

      else if (type === "m") {
        var x = currentX + seg.values[0];
        var y = currentY + seg.values[1];

        absolutizedPathData.push({type: "M", values: [x, y]});

        subpathX = x;
        subpathY = y;

        currentX = x;
        currentY = y;
      }

      else if (type === "L") {
        var x = seg.values[0];
        var y = seg.values[1];

        absolutizedPathData.push({type: "L", values: [x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "l") {
        var x = currentX + seg.values[0];
        var y = currentY + seg.values[1];

        absolutizedPathData.push({type: "L", values: [x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "C") {
        var x1 = seg.values[0];
        var y1 = seg.values[1];
        var x2 = seg.values[2];
        var y2 = seg.values[3];
        var x = seg.values[4];
        var y = seg.values[5];

        absolutizedPathData.push({type: "C", values: [x1, y1, x2, y2, x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "c") {
        var x1 = currentX + seg.values[0];
        var y1 = currentY + seg.values[1];
        var x2 = currentX + seg.values[2];
        var y2 = currentY + seg.values[3];
        var x = currentX + seg.values[4];
        var y = currentY + seg.values[5];

        absolutizedPathData.push({type: "C", values: [x1, y1, x2, y2, x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "Q") {
        var x1 = seg.values[0];
        var y1 = seg.values[1];
        var x = seg.values[2];
        var y = seg.values[3];

        absolutizedPathData.push({type: "Q", values: [x1, y1, x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "q") {
        var x1 = currentX + seg.values[0];
        var y1 = currentY + seg.values[1];
        var x = currentX + seg.values[2];
        var y = currentY + seg.values[3];

        absolutizedPathData.push({type: "Q", values: [x1, y1, x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "A") {
        var x = seg.values[5];
        var y = seg.values[6];

        absolutizedPathData.push({
          type: "A",
          values: [seg.values[0], seg.values[1], seg.values[2], seg.values[3], seg.values[4], x, y]
        });

        currentX = x;
        currentY = y;
      }

      else if (type === "a") {
        var x = currentX + seg.values[5];
        var y = currentY + seg.values[6];

        absolutizedPathData.push({
          type: "A",
          values: [seg.values[0], seg.values[1], seg.values[2], seg.values[3], seg.values[4], x, y]
        });

        currentX = x;
        currentY = y;
      }

      else if (type === "H") {
        var x = seg.values[0];
        absolutizedPathData.push({type: "H", values: [x]});
        currentX = x;
      }

      else if (type === "h") {
        var x = currentX + seg.values[0];
        absolutizedPathData.push({type: "H", values: [x]});
        currentX = x;
      }

      else if (type === "V") {
        var y = seg.values[0];
        absolutizedPathData.push({type: "V", values: [y]});
        currentY = y;
      }

      else if (type === "v") {
        var y = currentY + seg.values[0];
        absolutizedPathData.push({type: "V", values: [y]});
        currentY = y;
      }

      else if (type === "S") {
        var x2 = seg.values[0];
        var y2 = seg.values[1];
        var x = seg.values[2];
        var y = seg.values[3];

        absolutizedPathData.push({type: "S", values: [x2, y2, x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "s") {
        var x2 = currentX + seg.values[0];
        var y2 = currentY + seg.values[1];
        var x = currentX + seg.values[2];
        var y = currentY + seg.values[3];

        absolutizedPathData.push({type: "S", values: [x2, y2, x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "T") {
        var x = seg.values[0];
        var y = seg.values[1]

        absolutizedPathData.push({type: "T", values: [x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "t") {
        var x = currentX + seg.values[0];
        var y = currentY + seg.values[1]

        absolutizedPathData.push({type: "T", values: [x, y]});

        currentX = x;
        currentY = y;
      }

      else if (type === "Z" || type === "z") {
        absolutizedPathData.push({type: "Z", values: []});

        currentX = subpathX;
        currentY = subpathY;
      }
    });

    return absolutizedPathData;
  };

  // @info
  //   Takes path data that consists only from absolute commands, returns path data that consists only from
  //   "M", "L", "C" and "Z" commands.
  var reducePathData = function(pathData) {
    var reducedPathData = [];
    var lastType = null;

    var lastControlX = null;
    var lastControlY = null;

    var currentX = null;
    var currentY = null;

    var subpathX = null;
    var subpathY = null;

    pathData.forEach( function(seg) {
      if (seg.type === "M") {
        var x = seg.values[0];
        var y = seg.values[1];

        reducedPathData.push({type: "M", values: [x, y]});

        subpathX = x;
        subpathY = y;

        currentX = x;
        currentY = y;
      }

      else if (seg.type === "C") {
        var x1 = seg.values[0];
        var y1 = seg.values[1];
        var x2 = seg.values[2];
        var y2 = seg.values[3];
        var x = seg.values[4];
        var y = seg.values[5];

        reducedPathData.push({type: "C", values: [x1, y1, x2, y2, x, y]});

        lastControlX = x2;
        lastControlY = y2;

        currentX = x;
        currentY = y;
      }

      else if (seg.type === "L") {
        var x = seg.values[0];
        var y = seg.values[1];

        reducedPathData.push({type: "L", values: [x, y]});

        currentX = x;
        currentY = y;
      }

      else if (seg.type === "H") {
        var x = seg.values[0];

        reducedPathData.push({type: "L", values: [x, currentY]});

        currentX = x;
      }

      else if (seg.type === "V") {
        var y = seg.values[0];

        reducedPathData.push({type: "L", values: [currentX, y]});

        currentY = y;
      }

      else if (seg.type === "S") {
        var x2 = seg.values[0];
        var y2 = seg.values[1];
        var x = seg.values[2];
        var y = seg.values[3];

        var cx1, cy1;

        if (lastType === "C" || lastType === "S") {
          cx1 = currentX + (currentX - lastControlX);
          cy1 = currentY + (currentY - lastControlY);
        }
        else {
          cx1 = currentX;
          cy1 = currentY;
        }

        reducedPathData.push({type: "C", values: [cx1, cy1, x2, y2, x, y]});

        lastControlX = x2;
        lastControlY = y2;

        currentX = x;
        currentY = y;
      }

      else if (seg.type === "T") {
        var x = seg.values[0];
        var y = seg.values[1];

        var x1, y1;

        if (lastType === "Q" || lastType === "T") {
          x1 = currentX + (currentX - lastControlX);
          y1 = currentY + (currentY - lastControlY);
        }
        else {
          x1 = currentX;
          y1 = currentY;
        }

        var cx1 = currentX + 2 * (x1 - currentX) / 3;
        var cy1 = currentY + 2 * (y1 - currentY) / 3;
        var cx2 = x + 2 * (x1 - x) / 3;
        var cy2 = y + 2 * (y1 - y) / 3;

        reducedPathData.push({type: "C", values: [cx1, cy1, cx2, cy2, x, y]});

        lastControlX = x1;
        lastControlY = y1;

        currentX = x;
        currentY = y;
      }

      else if (seg.type === "Q") {
        var x1 = seg.values[0];
        var y1 = seg.values[1];
        var x = seg.values[2];
        var y = seg.values[3];

        var cx1 = currentX + 2 * (x1 - currentX) / 3;
        var cy1 = currentY + 2 * (y1 - currentY) / 3;
        var cx2 = x + 2 * (x1 - x) / 3;
        var cy2 = y + 2 * (y1 - y) / 3;

        reducedPathData.push({type: "C", values: [cx1, cy1, cx2, cy2, x, y]});

        lastControlX = x1;
        lastControlY = y1;

        currentX = x;
        currentY = y;
      }

      else if (seg.type === "A") {
        var r1 = Math.abs(seg.values[0]);
        var r2 = Math.abs(seg.values[1]);
        var angle = seg.values[2];
        var largeArcFlag = seg.values[3];
        var sweepFlag = seg.values[4];
        var x = seg.values[5];
        var y = seg.values[6];

        if (r1 === 0 || r2 === 0) {
          reducedPathData.push({type: "C", values: [currentX, currentY, x, y, x, y]});

          currentX = x;
          currentY = y;
        }
        else {
          if (currentX !== x || currentY !== y) {
            var curves = arcToCubicCurves(currentX, currentY, x, y, r1, r2, angle, largeArcFlag, sweepFlag);

            curves.forEach( function(curve) {
              reducedPathData.push({type: "C", values: curve});
            });

            currentX = x;
            currentY = y;
          }
        }
      }

      else if (seg.type === "Z") {
        reducedPathData.push(seg);

        currentX = subpathX;
        currentY = subpathY;
      }

      lastType = seg.type;
    });

    return reducedPathData;
  };

  // @info
  //   Get an array of corresponding cubic bezier curve parameters for given arc curve paramters.
  var arcToCubicCurves = function(x1, y1, x2, y2, r1, r2, angle, largeArcFlag, sweepFlag, _recursive) {
    var degToRad = function(degrees) {
      return (Math.PI * degrees) / 180;
    };

    var rotate = function(x, y, angleRad) {
      var X = x * Math.cos(angleRad) - y * Math.sin(angleRad);
      var Y = x * Math.sin(angleRad) + y * Math.cos(angleRad);
      return {x: X, y: Y};
    };

    var angleRad = degToRad(angle);
    var params = [];
    var f1, f2, cx, cy;

    if (_recursive) {
      f1 = _recursive[0];
      f2 = _recursive[1];
      cx = _recursive[2];
      cy = _recursive[3];
    }
    else {
      var p1 = rotate(x1, y1, -angleRad);
      x1 = p1.x;
      y1 = p1.y;

      var p2 = rotate(x2, y2, -angleRad);
      x2 = p2.x;
      y2 = p2.y;

      var x = (x1 - x2) / 2;
      var y = (y1 - y2) / 2;
      var h = (x * x) / (r1 * r1) + (y * y) / (r2 * r2);

      if (h > 1) {
        h = Math.sqrt(h);
        r1 = h * r1;
        r2 = h * r2;
      }

      var sign;

      if (largeArcFlag === sweepFlag) {
        sign = -1;
      }
      else {
        sign = 1;
      }

      var r1Pow = r1 * r1;
      var r2Pow = r2 * r2;

      var left = r1Pow * r2Pow - r1Pow * y * y - r2Pow * x * x;
      var right = r1Pow * y * y + r2Pow * x * x;

      var k = sign * Math.sqrt(Math.abs(left/right));

      cx = k * r1 * y / r2 + (x1 + x2) / 2;
      cy = k * -r2 * x / r1 + (y1 + y2) / 2;

      f1 = Math.asin(parseFloat(((y1 - cy) / r2).toFixed(9)));
      f2 = Math.asin(parseFloat(((y2 - cy) / r2).toFixed(9)));

      if (x1 < cx) {
        f1 = Math.PI - f1;
      }
      if (x2 < cx) {
        f2 = Math.PI - f2;
      }

      if (f1 < 0) {
        f1 = Math.PI * 2 + f1;
      }
      if (f2 < 0) {
        f2 = Math.PI * 2 + f2;
      }

      if (sweepFlag && f1 > f2) {
        f1 = f1 - Math.PI * 2;
      }
      if (!sweepFlag && f2 > f1) {
        f2 = f2 - Math.PI * 2;
      }
    }

    var df = f2 - f1;

    if (Math.abs(df) > (Math.PI * 120 / 180)) {
      var f2old = f2;
      var x2old = x2;
      var y2old = y2;

      if (sweepFlag && f2 > f1) {
        f2 = f1 + (Math.PI * 120 / 180) * (1);
      }
      else {
        f2 = f1 + (Math.PI * 120 / 180) * (-1);
      }

      x2 = cx + r1 * Math.cos(f2);
      y2 = cy + r2 * Math.sin(f2);
      params = arcToCubicCurves(x2, y2, x2old, y2old, r1, r2, angle, 0, sweepFlag, [f2, f2old, cx, cy]);
    }

    df = f2 - f1;

    var c1 = Math.cos(f1);
    var s1 = Math.sin(f1);
    var c2 = Math.cos(f2);
    var s2 = Math.sin(f2);
    var t = Math.tan(df / 4);
    var hx = 4 / 3 * r1 * t;
    var hy = 4 / 3 * r2 * t;

    var m1 = [x1, y1];
    var m2 = [x1 + hx * s1, y1 - hy * c1];
    var m3 = [x2 + hx * s2, y2 - hy * c2];
    var m4 = [x2, y2];

    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];

    if (_recursive) {
      return [m2, m3, m4].concat(params);
    }
    else {
      params = [m2, m3, m4].concat(params);

      var curves = [];

      for (var i = 0; i < params.length; i+=3) {
        var r1 = rotate(params[i][0], params[i][1], angleRad);
        var r2 = rotate(params[i+1][0], params[i+1][1], angleRad);
        var r3 = rotate(params[i+2][0], params[i+2][1], angleRad);
        curves.push([r1.x, r1.y, r2.x, r2.y, r3.x, r3.y]);
      }

      return curves;
    }
  };

  let isPathDataSupported = SVGPathElement.prototype.getPathData !== undefined &&
                            SVGPathElement.prototype.setPathData !== undefined;

  // Apply the polyfill if the native implementation of setPathData() accepts only SVGPathSegment instances
  // https://github.com/w3c/svgwg/issues/974
  // https://github.com/w3c/editing/issues/483
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1954044#c18
  if (isPathDataSupported) {
    try {
      document.createElementNS("http://www.w3.org/2000/svg", "path").setPathData([{type: "M", values: [0, 0]}]);
    }
    catch (error) {
      isPathDataSupported = false;
    }
  }

  if (isPathDataSupported === false) {
    var commandsMap = {
      "Z":"Z", "M":"M", "L":"L", "C":"C", "Q":"Q", "A":"A", "H":"H", "V":"V", "S":"S", "T":"T",
      "z":"Z", "m":"m", "l":"l", "c":"c", "q":"q", "a":"a", "h":"h", "v":"v", "s":"s", "t":"t"
    };

    var Source = function(string) {
      this._string = string;
      this._currentIndex = 0;
      this._endIndex = this._string.length;
      this._prevCommand = null;
      this._skipOptionalSpaces();
    };

    var isIE = window.navigator.userAgent.indexOf("MSIE ") !== -1;

    Source.prototype = {
      parseSegment: function() {
        var char = this._string[this._currentIndex];
        var command = commandsMap[char] ? commandsMap[char] : null;

        if (command === null) {
          // Possibly an implicit command. Not allowed if this is the first command.
          if (this._prevCommand === null) {
            return null;
          }

          // Check for remaining coordinates in the current command.
          if (
            (char === "+" || char === "-" || char === "." || (char >= "0" && char <= "9")) && this._prevCommand !== "Z"
          ) {
            if (this._prevCommand === "M") {
              command = "L";
            }
            else if (this._prevCommand === "m") {
              command = "l";
            }
            else {
              command = this._prevCommand;
            }
          }
          else {
            command = null;
          }

          if (command === null) {
            return null;
          }
        }
        else {
          this._currentIndex += 1;
        }

        this._prevCommand = command;

        var values = null;
        var cmd = command.toUpperCase();

        if (cmd === "H" || cmd === "V") {
          values = [this._parseNumber()];
        }
        else if (cmd === "M" || cmd === "L" || cmd === "T") {
          values = [this._parseNumber(), this._parseNumber()];
        }
        else if (cmd === "S" || cmd === "Q") {
          values = [this._parseNumber(), this._parseNumber(), this._parseNumber(), this._parseNumber()];
        }
        else if (cmd === "C") {
          values = [
            this._parseNumber(),
            this._parseNumber(),
            this._parseNumber(),
            this._parseNumber(),
            this._parseNumber(),
            this._parseNumber()
          ];
        }
        else if (cmd === "A") {
          values = [
            this._parseNumber(),
            this._parseNumber(),
            this._parseNumber(),
            this._parseArcFlag(),
            this._parseArcFlag(),
            this._parseNumber(),
            this._parseNumber()
          ];
        }
        else if (cmd === "Z") {
          this._skipOptionalSpaces();
          values = [];
        }

        if (values === null || values.indexOf(null) >= 0) {
          // Unknown command or known command with invalid values
          return null;
        }
        else {
          return {type: command, values: values};
        }
      },

      hasMoreData: function() {
        return this._currentIndex < this._endIndex;
      },

      peekSegmentType: function() {
        var char = this._string[this._currentIndex];
        return commandsMap[char] ? commandsMap[char] : null;
      },

      initialCommandIsMoveTo: function() {
        // If the path is empty it is still valid, so return true.
        if (!this.hasMoreData()) {
          return true;
        }

        var command = this.peekSegmentType();
        // Path must start with moveTo.
        return command === "M" || command === "m";
      },

      _isCurrentSpace: function() {
        var char = this._string[this._currentIndex];
        return char <= " " && (char === " " || char === "\n" || char === "\t" || char === "\r" || char === "\f");
      },

      _skipOptionalSpaces: function() {
        while (this._currentIndex < this._endIndex && this._isCurrentSpace()) {
          this._currentIndex += 1;
        }

        return this._currentIndex < this._endIndex;
      },

      _skipOptionalSpacesOrDelimiter: function() {
        if (
          this._currentIndex < this._endIndex &&
          !this._isCurrentSpace() &&
          this._string[this._currentIndex] !== ","
        ) {
          return false;
        }

        if (this._skipOptionalSpaces()) {
          if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ",") {
            this._currentIndex += 1;
            this._skipOptionalSpaces();
          }
        }
        return this._currentIndex < this._endIndex;
      },

      // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from
      // Source/core/svg/SVGParserUtilities.cpp.
      // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
      _parseNumber: function() {
        var exponent = 0;
        var integer = 0;
        var frac = 1;
        var decimal = 0;
        var sign = 1;
        var expsign = 1;
        var startIndex = this._currentIndex;

        this._skipOptionalSpaces();

        // Read the sign.
        if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "+") {
          this._currentIndex += 1;
        }
        else if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "-") {
          this._currentIndex += 1;
          sign = -1;
        }

        if (
          this._currentIndex === this._endIndex ||
          (
            (this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") &&
            this._string[this._currentIndex] !== "."
          )
        ) {
          // The first character of a number must be one of [0-9+-.].
          return null;
        }

        // Read the integer part, build right-to-left.
        var startIntPartIndex = this._currentIndex;

        while (
          this._currentIndex < this._endIndex &&
          this._string[this._currentIndex] >= "0" &&
          this._string[this._currentIndex] <= "9"
        ) {
          this._currentIndex += 1; // Advance to first non-digit.
        }

        if (this._currentIndex !== startIntPartIndex) {
          var scanIntPartIndex = this._currentIndex - 1;
          var multiplier = 1;

          while (scanIntPartIndex >= startIntPartIndex) {
            integer += multiplier * (this._string[scanIntPartIndex] - "0");
            scanIntPartIndex -= 1;
            multiplier *= 10;
          }
        }

        // Read the decimals.
        if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ".") {
          this._currentIndex += 1;

          // There must be a least one digit following the .
          if (
            this._currentIndex >= this._endIndex ||
            this._string[this._currentIndex] < "0" ||
            this._string[this._currentIndex] > "9"
          ) {
            return null;
          }

          while (
            this._currentIndex < this._endIndex &&
            this._string[this._currentIndex] >= "0" &&
            this._string[this._currentIndex] <= "9"
          ) {
            frac *= 10;
            decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
            this._currentIndex += 1;
          }
        }

        // Read the exponent part.
        if (
          this._currentIndex !== startIndex &&
          this._currentIndex + 1 < this._endIndex &&
          (this._string[this._currentIndex] === "e" || this._string[this._currentIndex] === "E") &&
          (this._string[this._currentIndex + 1] !== "x" && this._string[this._currentIndex + 1] !== "m")
        ) {
          this._currentIndex += 1;

          // Read the sign of the exponent.
          if (this._string[this._currentIndex] === "+") {
            this._currentIndex += 1;
          }
          else if (this._string[this._currentIndex] === "-") {
            this._currentIndex += 1;
            expsign = -1;
          }

          // There must be an exponent.
          if (
            this._currentIndex >= this._endIndex ||
            this._string[this._currentIndex] < "0" ||
            this._string[this._currentIndex] > "9"
          ) {
            return null;
          }

          while (
            this._currentIndex < this._endIndex &&
            this._string[this._currentIndex] >= "0" &&
            this._string[this._currentIndex] <= "9"
          ) {
            exponent *= 10;
            exponent += (this._string[this._currentIndex] - "0");
            this._currentIndex += 1;
          }
        }

        var number = integer + decimal;
        number *= sign;

        if (exponent) {
          number *= Math.pow(10, expsign * exponent);
        }

        if (startIndex === this._currentIndex) {
          return null;
        }

        this._skipOptionalSpacesOrDelimiter();

        return number;
      },

      _parseArcFlag: function() {
        if (this._currentIndex >= this._endIndex) {
          return null;
        }

        var flag = null;
        var flagChar = this._string[this._currentIndex];

        this._currentIndex += 1;

        if (flagChar === "0") {
          flag = 0;
        }
        else if (flagChar === "1") {
          flag = 1;
        }
        else {
          return null;
        }

        this._skipOptionalSpacesOrDelimiter();
        return flag;
      }
    };

    var parsePathDataString = function(string) {
      if (!string || string.length === 0) return [];

      var source = new Source(string);
      var pathData = [];

      if (source.initialCommandIsMoveTo()) {
        while (source.hasMoreData()) {
          var pathSeg = source.parseSegment();

          if (pathSeg === null) {
            break;
          }
          else {
            pathData.push(pathSeg);
          }
        }
      }

      return pathData;
    }

    var setAttribute = SVGPathElement.prototype.setAttribute;
    var setAttributeNS = SVGPathElement.prototype.setAttributeNS;
    var removeAttribute = SVGPathElement.prototype.removeAttribute;
    var removeAttributeNS = SVGPathElement.prototype.removeAttributeNS;

    var $cachedPathData = window.Symbol ? Symbol() : "__cachedPathData";
    var $cachedNormalizedPathData = window.Symbol ? Symbol() : "__cachedNormalizedPathData";

    SVGPathElement.prototype.setAttribute = function(name, value) {
      if (name === "d") {
        this[$cachedPathData] = null;
        this[$cachedNormalizedPathData] = null;
      }

      setAttribute.call(this, name, value);
    };

    SVGPathElement.prototype.setAttributeNS = function(namespace, name, value) {
      if (name === "d") {
        var namespaceURI = "http://www.w3.org/2000/svg";

        if (namespace) {
          for (var attribute of this.ownerSVGElement.attributes) {
            if (attribute.name === `xmlns:${namespace}`) {
              namespaceURI = attribute.value;
            }
          }
        }

        if (namespaceURI === "http://www.w3.org/2000/svg") {
          this[$cachedPathData] = null;
          this[$cachedNormalizedPathData] = null;
        }
      }

      setAttributeNS.call(this, namespace, name, value);
    };

    SVGPathElement.prototype.removeAttribute = function(name, value) {
      if (name === "d") {
        this[$cachedPathData] = null;
        this[$cachedNormalizedPathData] = null;
      }

      removeAttribute.call(this, name);
    };

    SVGPathElement.prototype.removeAttributeNS = function(namespace, name) {
      if (name === "d") {
        var namespaceURI = "http://www.w3.org/2000/svg";

        if (namespace) {
          for (var attribute of this.ownerSVGElement.attributes) {
            if (attribute.name === `xmlns:${namespace}`) {
              namespaceURI = attribute.value;
            }
          }
        }

        if (namespaceURI === "http://www.w3.org/2000/svg") {
          this[$cachedPathData] = null;
          this[$cachedNormalizedPathData] = null;
        }
      }

      removeAttributeNS.call(this, namespace, name);
    };

    SVGPathElement.prototype.getPathData = function(options) {
      if (options && options.normalize) {
        if (this[$cachedNormalizedPathData]) {
          return clonePathData(this[$cachedNormalizedPathData]);
        }
        else {
          var pathData;

          if (this[$cachedPathData]) {
            pathData = clonePathData(this[$cachedPathData]);
          }
          else {
            pathData = parsePathDataString(this.getAttribute("d") || "");
            this[$cachedPathData] = clonePathData(pathData);
          }

          var normalizedPathData = reducePathData(absolutizePathData(pathData));
          this[$cachedNormalizedPathData] = clonePathData(normalizedPathData);
          return normalizedPathData;
        }
      }
      else {
        if (this[$cachedPathData]) {
          return clonePathData(this[$cachedPathData]);
        }
        else {
          var pathData = parsePathDataString(this.getAttribute("d") || "");
          this[$cachedPathData] = clonePathData(pathData);
          return pathData;
        }
      }
    };

    SVGPathElement.prototype.setPathData = function(pathData) {
      if (pathData.length === 0) {
        if (isIE) {
          // @bugfix https://github.com/mbostock/d3/issues/1737
          this.setAttribute("d", "");
        }
        else {
          this.removeAttribute("d");
        }
      }
      else {
        var d = "";

        for (var i = 0, l = pathData.length; i < l; i += 1) {
          var seg = pathData[i];

          if (i > 0) {
            d += " ";
          }

          d += seg.type;

          if (seg.values && seg.values.length > 0) {
            d += " " + seg.values.join(" ");
          }
        }

        this.setAttribute("d", d);
      }
    };
  }

  if (!SVGRectElement.prototype.getPathData) {
    SVGRectElement.prototype.getPathData = function(options) {
      var x = this.x.baseVal.value;
      var y = this.y.baseVal.value;
      var width = this.width.baseVal.value;
      var height = this.height.baseVal.value;
      var rx = this.hasAttribute("rx") ? this.rx.baseVal.value : this.ry.baseVal.value;
      var ry = this.hasAttribute("ry") ? this.ry.baseVal.value : this.rx.baseVal.value;

      if (rx > width / 2) {
        rx = width / 2;
      }

      if (ry > height / 2) {
        ry = height / 2;
      }

      var pathData = [
        {type: "M", values: [x+rx, y]},
        {type: "H", values: [x+width-rx]},
        {type: "A", values: [rx, ry, 0, 0, 1, x+width, y+ry]},
        {type: "V", values: [y+height-ry]},
        {type: "A", values: [rx, ry, 0, 0, 1, x+width-rx, y+height]},
        {type: "H", values: [x+rx]},
        {type: "A", values: [rx, ry, 0, 0, 1, x, y+height-ry]},
        {type: "V", values: [y+ry]},
        {type: "A", values: [rx, ry, 0, 0, 1, x+rx, y]},
        {type: "Z", values: []}
      ];

      // Get rid of redundant "A" segs when either rx or ry is 0
      pathData = pathData.filter(function(s) {
        return s.type === "A" && (s.values[0] === 0 || s.values[1] === 0) ? false : true;
      });

      if (options && options.normalize === true) {
        pathData = reducePathData(pathData);
      }

      return pathData;
    };
  }

  if (!SVGCircleElement.prototype.getPathData) {
    SVGCircleElement.prototype.getPathData = function(options) {
      var cx = this.cx.baseVal.value;
      var cy = this.cy.baseVal.value;
      var r = this.r.baseVal.value;

      var pathData = [
        { type: "M",  values: [cx + r, cy] },
        { type: "A",  values: [r, r, 0, 0, 1, cx, cy+r] },
        { type: "A",  values: [r, r, 0, 0, 1, cx-r, cy] },
        { type: "A",  values: [r, r, 0, 0, 1, cx, cy-r] },
        { type: "A",  values: [r, r, 0, 0, 1, cx+r, cy] },
        { type: "Z",  values: [] }
      ];

      if (options && options.normalize === true) {
        pathData = reducePathData(pathData);
      }

      return pathData;
    };
  }

  if (!SVGEllipseElement.prototype.getPathData) {
    SVGEllipseElement.prototype.getPathData = function(options) {
      var cx = this.cx.baseVal.value;
      var cy = this.cy.baseVal.value;
      var rx = this.rx.baseVal.value;
      var ry = this.ry.baseVal.value;

      var pathData = [
        { type: "M",  values: [cx + rx, cy] },
        { type: "A",  values: [rx, ry, 0, 0, 1, cx, cy+ry] },
        { type: "A",  values: [rx, ry, 0, 0, 1, cx-rx, cy] },
        { type: "A",  values: [rx, ry, 0, 0, 1, cx, cy-ry] },
        { type: "A",  values: [rx, ry, 0, 0, 1, cx+rx, cy] },
        { type: "Z",  values: [] }
      ];

      if (options && options.normalize === true) {
        pathData = reducePathData(pathData);
      }

      return pathData;
    };
  }

  if (!SVGLineElement.prototype.getPathData) {
    SVGLineElement.prototype.getPathData = function() {
      return [
        { type: "M", values: [this.x1.baseVal.value, this.y1.baseVal.value] },
        { type: "L", values: [this.x2.baseVal.value, this.y2.baseVal.value] }
      ];
    };
  }

  if (!SVGPolylineElement.prototype.getPathData) {
    SVGPolylineElement.prototype.getPathData = function() {
      var pathData = [];

      for (var i = 0; i < this.points.numberOfItems; i += 1) {
        var point = this.points.getItem(i);

        pathData.push({
          type: (i === 0 ? "M" : "L"),
          values: [point.x, point.y]
        });
      }

      return pathData;
    };
  }

  if (!SVGPolygonElement.prototype.getPathData) {
    SVGPolygonElement.prototype.getPathData = function() {
      var pathData = [];

      for (var i = 0; i < this.points.numberOfItems; i += 1) {
        var point = this.points.getItem(i);

        pathData.push({
          type: (i === 0 ? "M" : "L"),
          values: [point.x, point.y]
        });
      }

      pathData.push({
        type: "Z",
        values: []
      });

      return pathData;
    };
  }
})();

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

require("/node_modules/meteor/retronator:pixelartacademy-practice/practice.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/journal/journal.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/journal/methods.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/journal/entry/entry.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/journal/entry/methods.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/journal/entry/action.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/journal/entry/avatar.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/pages.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/admin/admin.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/admin/template.admin.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/admin/scripts/scripts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/admin/scripts/template.scripts.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/admin/projects/projects.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/admin/projects/template.projects.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/checkin/checkin.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/checkin/methods.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/checkin/migrations/0000-renamecollection.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/checkin/migrations/0001-characterreferencefieldsupdate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/checkin/migrations/0002-removecharacternamefield.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/checkin/migrations/0003-changetomemories.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/importeddata/importeddata.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/extractimagesfromposts/extractimagesfromposts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/extractimagesfromposts/template.extractimagesfromposts.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/importcheckins/importcheckins.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pages/importcheckins/template.importcheckins.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/helpers/helpers.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/helpers/drawing/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/helpers/drawing/markup/markup.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/helpers/drawing/markup/pixelart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/helpers/drawing/markup/enginecomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/project.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/subscriptions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/thing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/workbench.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/asset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/bitmap.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/clipboardcomponent/clipboardcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/clipboardcomponent/template.clipboardcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/clipboardcomponent/previewinfomixin.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/briefcomponent/briefcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/assets/bitmap/briefcomponent/template.briefcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/project/migrations/0000-projectthings.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/challenges/challenges.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/challenges/drawing/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/tutorials.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/tutorial.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/instructionsmarkupenginecomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/assets.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-steps.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-resources.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-references.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-create.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/tutorialbitmap-reset.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/hintsenginecomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/portfoliocomponent/portfoliocomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/portfoliocomponent/template.portfoliocomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/briefcomponent/briefcomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/briefcomponent/template.briefcomponent.js");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/resource.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/pixels.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/bitmapstringpixels.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/imagepixels.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/resource/svgpaths.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/steparea.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/step.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pixelsstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pixelswithpathsstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/ephemeralstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pathstep/pathstep.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/tutorials/drawing/assets/tutorialbitmap/steps/pathstep/path.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/software/software.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/software/tools.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/artworks/artworks.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/pixelartevaluation.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/layer.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/core.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/pixel.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/point.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/point-optimizeneighbors.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line-addoutlinepoints.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line-classifylineparts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line-detectstraightlineparts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line-detectcurveparts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line-createparts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line-analyzecurvature.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/line-evaluate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/part/part.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/part/straightline.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/part/straightline-evaluate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/part/straightline-getsegmentcorners.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/part/curve.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/part/curve-evaluate.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/line/part/curve-calculatepointconfidence.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/enginecomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/pixelartevaluation/enginecomponent-debug.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/readabilityanalysis/readabilityanalysis.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/readabilityanalysis/enginecomponent.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-practice/readabilityanalysis/enginecomponent-debug.coffee");

/* Exports */
Package._define("retronator:pixelartacademy-practice", {
  PixelArtAcademy: PixelArtAcademy
});

})();
