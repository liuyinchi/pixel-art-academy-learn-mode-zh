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
var PixelArtAcademy = Package['retronator:pixelartacademy'].PixelArtAcademy;
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

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-publication":{"publication.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/publication.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB,
  AM,
  PAA,
  indexOf = [].indexOf;
AB = Artificial.Base;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
PAA.Publication = function () {
  class Publication extends AM.Document {
    static id() {
      return 'PixelArtAcademy.Publication';
    }

    // Routing
    static initializeRouting() {
      Artificial.Pages.addAdminPage('/admin/publication', this.Pages.Admin);
      Artificial.Pages.addAdminPage('/admin/publication/parts/:documentId?', this.Pages.Admin.Parts);
      return Artificial.Pages.addAdminPage('/admin/publication/publications/:documentId?', this.Pages.Admin.Publications);
    }
    hasUnreadUnlockedContents(unlockedPartIds) {
      var content, i, len, partState, ref, ref1;
      ref = this.contents;
      // Check if any of the content parts that are unlocked aren't marked as read in the game state.
      for (i = 0, len = ref.length; i < len; i++) {
        content = ref[i];
        if (!(ref1 = content.part.referenceId, indexOf.call(unlockedPartIds, ref1) >= 0)) {
          continue;
        }
        partState = PAA.Publication.Part.getStateForReferenceId(content.part.referenceId);
        if (!partState('read')) {
          return true;
        }
      }
      return false;
    }
  }
  ;

  // lastEditTime: the time the document was last edited
  // referenceId: custom ID to be used when referencing the publication from code
  // coverPart: a publication part document that represents the cover or null if no cover
  //   _id
  //   referenceId
  // tableOfContentsPart: a publication part document that represents the table of contents or null if no contents
  //   _id
  //   referenceId
  // contents: an array of items that are in this book
  //   order: the position of this item in the contents
  //   part: a publication part document that represents this item
  //     _id
  //     referenceId
  // design: object with properties that define the publication's look
  //   size: the size at which to display the book at
  //     width: the width of the cover in pixels (max 300)
  //     height: the height of the cover in pixels (any size)
  //     offsetWidth: the amount by which to offset the content per page, if different than width
  //   spreadPagesCount: how many pages are visible at the same time
  //   class: string of the CSS class (or classes) that define the look
  //   [header]: array of delta operations for the content in the header
  Publication.Meta({
    name: Publication.id(),
    fields: () => {
      return {
        coverPart: Document.ReferenceField(Publication.Part, ['referenceId']),
        tableOfContentsPart: Document.ReferenceField(Publication.Part, ['referenceId']),
        contents: [{
          part: Document.ReferenceField(Publication.Part, ['referenceId'])
        }]
      };
    }
  });
  Publication.enableDatabaseContent();
  Publication.databaseContentInformationFields = {
    referenceId: 1
  };

  // Methods
  Publication.insert = Publication.method('insert');
  Publication.update = Publication.method('update');
  Publication.remove = Publication.method('remove');
  Publication.removeCover = Publication.method('removeCover');
  Publication.removeTableOfContents = Publication.method('removeTableOfContents');
  Publication.addContentItem = Publication.method('addContentItem');
  Publication.updateContentItem = Publication.method('updateContentItem');
  Publication.removeContentItem = Publication.method('removeContentItem');
  Publication.updateHeader = Publication.method('updateHeader');

  // Subscriptions
  Publication.all = Publication.subscription('all');
  Publication.forReferenceIds = Publication.subscription('forReferenceIds');
  return Publication;
}.call(this);
if (Meteor.isServer) {
  // Export all publications and parts.
  AM.DatabaseContent.addToExport(function () {
    return [...PAA.Publication.documents.fetch({
      referenceId: {
        $exists: true
      }
    }), ...PAA.Publication.Part.documents.fetch({
      referenceId: {
        $exists: true
      }
    })];
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/methods.coffee                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Delta, LOI, PAA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Delta = require('quill-delta');
PAA.Publication.insert.method(function () {
  LOI.Authorize.admin();
  // Create the new publication.
  return PAA.Publication.documents.insert({
    lastEditTime: new Date(),
    contents: []
  });
});
PAA.Publication.update.method(function (publicationId, data) {
  var publication;
  check(publicationId, Match.DocumentId);
  check(data, {
    referenceId: Match.OptionalOrNull(String),
    'coverPart._id': Match.OptionalOrNull(Match.DocumentId),
    'tableOfContentsPart._id': Match.OptionalOrNull(Match.DocumentId),
    'design.size.width': Match.OptionalOrNull(Match.IntegerMax(300)),
    'design.size.height': Match.OptionalOrNull(Match.Integer),
    'design.size.offsetWidth': Match.OptionalOrNull(Match.Integer),
    'design.spreadPagesCount': Match.OptionalOrNull(Match.PositiveInteger),
    'design.class': Match.OptionalOrNull(String),
    'position.groupIndex': Match.OptionalOrNull(Match.NonNegativeInteger),
    'position.groupOrder': Match.OptionalOrNull(Number)
  });
  LOI.Authorize.admin();
  publication = PAA.Publication.documents.findOne(publicationId);
  if (!publication) {
    throw new AE.ArgumentException("Publication does not exist.");
  }
  // Update the publication with new data.
  data.lastEditTime = new Date();
  return PAA.Publication.documents.update(publicationId, {
    $set: data
  });
});
PAA.Publication.removeCover.method(function (publicationId) {
  check(publicationId, Match.DocumentId);
  LOI.Authorize.admin();
  return PAA.Publication.documents.update(publicationId, {
    $set: {
      lastEditTime: new Date()
    },
    $unset: {
      coverPart: 1
    }
  });
});
PAA.Publication.removeTableOfContents.method(function (publicationId) {
  check(publicationId, Match.DocumentId);
  LOI.Authorize.admin();
  return PAA.Publication.documents.update(publicationId, {
    $set: {
      lastEditTime: new Date()
    },
    $unset: {
      tableOfContentsPart: 1
    }
  });
});
PAA.Publication.remove.method(function (publicationId) {
  var publication;
  check(publicationId, Match.DocumentId);
  LOI.Authorize.admin();
  publication = PAA.Publication.documents.findOne(publicationId);
  if (!publication) {
    throw new AE.ArgumentException("Publication does not exist.");
  }
  // Remove the publication.
  return PAA.Publication.documents.remove(publicationId);
});
PAA.Publication.addContentItem.method(function (publicationId, partId) {
  var activities, order, part, publication, ref;
  check(publicationId, Match.DocumentId);
  check(partId, Match.DocumentId);
  LOI.Authorize.admin();
  publication = PAA.Publication.documents.findOne(publicationId);
  if (!publication) {
    throw new AE.ArgumentException("Publication does not exist.");
  }
  activities = _.sortBy(publication.contents, 'order');
  order = ((ref = _.last(activities)) != null ? ref.order : void 0) || 0;
  part = PAA.Publication.Part.documents.findOne(partId);
  if (!part) {
    throw new AE.ArgumentException("Part does not exist.");
  }
  return PAA.Publication.documents.update(publicationId, {
    $set: {
      lastEditTime: new Date()
    },
    $push: {
      contents: {
        part: {
          _id: partId
        },
        order: order
      }
    }
  });
});
PAA.Publication.updateContentItem.method(function (publicationId, contentItemIndex, data) {
  var $set, part, partId, property, publication, value;
  check(publicationId, Match.DocumentId);
  check(contentItemIndex, Match.Integer);
  check(data, {
    order: Match.OptionalOrNull(Number),
    'part._id': Match.OptionalOrNull(Match.DocumentId)
  });
  LOI.Authorize.admin();
  publication = PAA.Publication.documents.findOne(publicationId);
  if (!publication) {
    throw new AE.ArgumentException("Publication does not exist.");
  }
  if (!publication.contents[contentItemIndex]) {
    throw new AE.ArgumentException("Content item does not exist.");
  }
  if (partId = data['part._id']) {
    part = PAA.Publication.Part.documents.findOne(partId);
    if (!part) {
      throw new AE.ArgumentException("Part does not exist.");
    }
  }
  // Prepend contents field to properties.
  $set = {
    lastEditTime: new Date()
  };
  for (property in data) {
    value = data[property];
    $set["contents.".concat(contentItemIndex, ".").concat(property)] = value;
  }
  return PAA.Publication.documents.update(publicationId, {
    $set
  });
});
PAA.Publication.removeContentItem.method(function (publicationId, contentItemIndex) {
  var publication;
  check(publicationId, Match.DocumentId);
  check(contentItemIndex, Match.Integer);
  LOI.Authorize.admin();
  publication = PAA.Publication.documents.findOne(publicationId);
  if (!publication) {
    throw new AE.ArgumentException("Publication does not exist.");
  }
  if (!publication.contents[contentItemIndex]) {
    throw new AE.ArgumentException("Content item does not exist.");
  }
  publication.contents.splice(contentItemIndex, 1);
  return PAA.Publication.documents.update(publicationId, {
    $set: {
      lastEditTime: new Date(),
      contents: publication.contents
    }
  });
});
PAA.Publication.updateHeader.method(function (publicationId, updateDeltaOperations) {
  var contentDelta, newContentDelta, publication, ref, updateDelta;
  check(publicationId, Match.DocumentId);
  check(updateDeltaOperations, Array);
  LOI.Authorize.admin();
  publication = PAA.Publication.documents.findOne(publicationId);
  if (!publication) {
    throw new AE.ArgumentException("Publication does not exist.");
  }
  contentDelta = new Delta(((ref = publication.design) != null ? ref.header : void 0) || [{
    insert: '\n'
  }]);
  updateDelta = new Delta(updateDeltaOperations);
  newContentDelta = contentDelta.compose(updateDelta);

  // Update the text.
  return PAA.Publication.getServerDocuments().update(publicationId, {
    $set: {
      'design.header': newContentDelta.ops,
      lastEditTime: new Date()
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscriptions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/subscriptions.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AB = Artificial.Base;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.all.publish(function () {
  return PAA.Publication.getPublishingDocuments().find();
});
PAA.Publication.forReferenceIds.publish(function (referenceIds) {
  return PAA.Publication.getPublishingDocuments().find({
    referenceId: {
      $in: referenceIds
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"location.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/location.coffee                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Location = function () {
  class Location extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.Publication.Location';
    }
  }
  ;
  Location.initialize();
  return Location;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"header.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/header.coffee                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Header = function () {
  class Header {}
  ;
  Header.quillFormats = ['bold', 'italic'];
  return Header;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"part":{"part.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/part/part.coffee                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mummification;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Part = function () {
  class Part extends AM.Document {
    static id() {
      return 'PixelArtAcademy.Publication.Part';
    }
    static getStateForReferenceId(referenceId) {
      var base;
      if ((base = this._partStates)[referenceId] == null) {
        base[referenceId] = new LOI.StateObject({
          address: this.stateAddress.child(referenceId)
        });
      }
      return this._partStates[referenceId];
    }
  }
  ;

  // lastEditTime: the time the document was last edited
  // referenceId: custom ID to be used when referencing the part from code
  // title: the title of the part (as it appears in the table of contents) or null if not named
  // design: object with properties that define the part's look
  //   class: string of the CSS class (or classes) that define the look
  // [article]: array of delta operations for the article of this publication part
  //   insert: string or object to be inserted
  //     figure: a collection of visual elements with a caption
  //       layout: array of numbers controlling how many elements per row to show
  //       caption: the text written under the figure
  //       class: string of the CSS class (or classes) that define the look of the figure
  //       [elements]: array of elements that make the figure
  //         artwork: an artwork from the pixel art database
  //           _id

  //         image: an image without any semantic information
  //           url
  //           credit: ad-hoc text crediting the image source

  //         video: a video without any semantic information
  //           url
  //           credit: ad-hoc text crediting the video source

  //   attributes: object with formatting directives
  Part.Meta({
    name: Part.id()
  });
  Part.enableDatabaseContent();

  // Methods
  Part.insert = Part.method('insert');
  Part.update = Part.method('update');
  Part.remove = Part.method('remove');
  Part.removeTitle = Part.method('removeTitle');
  Part.updateArticle = Part.method('updateArticle');

  // Subscriptions
  Part.all = Part.subscription('all');
  Part.forPublication = Part.subscription('forPublication');
  Part.articleForPart = Part.subscription('articleForPart');

  // We want a state for tracking player's interaction with publication parts.
  // publicationParts: an object with state for each publication part
  //   {referenceId}:
  //     read: boolean indicating if the part has been read
  Part.stateAddress = new LOI.StateAddress("publicationParts");
  Part.state = new LOI.StateObject({
    address: Part.stateAddress
  });
  Part._partStates = {};
  return Part;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/part/methods.coffee                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, Delta, LOI, PAA;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Delta = require('quill-delta');
PAA.Publication.Part.insert.method(function () {
  LOI.Authorize.admin();

  // Create the new part.
  return PAA.Publication.Part.documents.insert({
    lastEditTime: new Date()
  });
});
PAA.Publication.Part.update.method(function (partId, data) {
  var part;
  check(partId, Match.DocumentId);
  check(data, {
    referenceId: Match.OptionalOrNull(String),
    title: Match.OptionalOrNull(String),
    'design.class': Match.OptionalOrNull(String)
  });
  LOI.Authorize.admin();
  part = PAA.Publication.Part.documents.findOne(partId);
  if (!part) {
    throw new AE.ArgumentException("Part does not exist.");
  }
  // Update the part with new data.
  data.lastEditTime = new Date();
  return PAA.Publication.Part.documents.update(partId, {
    $set: data
  });
});
PAA.Publication.Part.remove.method(function (partId) {
  var part;
  check(partId, Match.DocumentId);
  LOI.Authorize.admin();
  part = PAA.Publication.Part.documents.findOne(partId);
  if (!part) {
    throw new AE.ArgumentException("Part does not exist.");
  }
  // Remove the part.
  return PAA.Publication.Part.documents.remove(partId);
});
PAA.Publication.Part.removeTitle.method(function (partId) {
  var part;
  check(partId, Match.DocumentId);
  LOI.Authorize.admin();
  part = PAA.Publication.Part.documents.findOne(partId);
  if (!part) {
    throw new AE.ArgumentException("Part does not exist.");
  }
  // Remove the title.
  return PAA.Publication.Part.documents.update(partId, {
    $set: {
      lastEditTime: new Date()
    },
    $unset: {
      title: true
    }
  });
});
PAA.Publication.Part.updateArticle.method(function (partId, updateDeltaOperations) {
  var contentDelta, newContentDelta, part, updateDelta;
  check(partId, Match.DocumentId);
  check(updateDeltaOperations, Array);
  LOI.Authorize.admin();
  part = PAA.Publication.Part.documents.findOne(partId);
  if (!part) {
    throw new AE.ArgumentException("Part does not exist.");
  }
  contentDelta = new Delta(part.article || [{
    insert: '\n'
  }]);
  updateDelta = new Delta(updateDeltaOperations);
  newContentDelta = contentDelta.compose(updateDelta);
  // Update the text.
  return PAA.Publication.Part.getServerDocuments().update(partId, {
    $set: {
      article: newContentDelta.ops,
      lastEditTime: new Date()
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscriptions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/part/subscriptions.coffee                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, LOI, PAA;
AB = Artificial.Base;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Part.all.publish(function () {
  return PAA.Publication.Part.getPublishingDocuments().find({}, {
    fields: {
      article: false
    }
  });
});
PAA.Publication.Part.forPublication.publish(function (publicationId) {
  var content, partIds, publication;
  check(publicationId, Match.DocumentId);
  if (!(publication = PAA.Publication.getQueryDocuments().findOne(publicationId))) {
    return;
  }

  // Wait until the publication document gets substituted with the fully populated one.
  if (!publication.contents) {
    return;
  }
  partIds = function () {
    var i, len, ref, results;
    ref = publication.contents;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      content = ref[i];
      results.push(content.part._id);
    }
    return results;
  }();
  if (publication.coverPart) {
    partIds.push(publication.coverPart._id);
  }
  if (publication.tableOfContentsPart) {
    partIds.push(publication.tableOfContentsPart._id);
  }
  return PAA.Publication.Part.getPublishingDocuments().find({
    _id: {
      $in: partIds
    }
  });
});
PAA.Publication.Part.articleForPart.publish(function (id) {
  check(id, Match.DocumentId);
  return PAA.Publication.Part.getPublishingDocuments().find(id, {
    fields: {
      article: true
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"location.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/part/location.coffee                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Part.Location = function () {
  class Location extends LOI.Adventure.Location {
    static id() {
      return 'PixelArtAcademy.Publication.Part.Location';
    }
  }
  ;
  Location.initialize();
  return Location;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"component":{"component.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/component/component.coffee                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AEc, AM, LOI, PAA;
AE = Artificial.Everywhere;
AEc = Artificial.Echo;
AM = Artificial.Mirage;
AB = Artificial.Babel;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Component = function () {
  class Component extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Publication.Component';
    }
    constructor(publicationId) {
      super(...arguments);
      this.publicationId = publicationId;
      this.enabled = new ReactiveField(false);
      this.opened = new ReactiveField(false);
      this.activePartId = new ReactiveField(null);
    }
    onCreated() {
      var parentWithDisplay;
      super.onCreated(...arguments);
      this.designConstants = {
        moveButtonExtraWidth: 10
      };
      parentWithDisplay = this.ancestorComponentWith('display');
      this.display = parentWithDisplay.display;
      this.autorun(computation => {
        PAA.Publication.Part.forPublication.subscribeContent(this, this.publicationId);
        return PAA.Publication.Part.forPublication.subscribe(this, this.publicationId);
      });
      this.leftPageIndex = new ReactiveField(0);
      this.visiblePageIndex = new ReactiveField(0);
      this.pagesCount = new ReactiveField(null);
      this.manualContentUpdatedDependency = new Tracker.Dependency();
      this.publication = new ComputedField(() => {
        return PAA.Publication.documents.findOne(this.publicationId);
      });
      this.coverPart = new ComputedField(() => {
        var publication, ref;
        if (!(publication = this.publication())) {
          return;
        }
        return PAA.Publication.Part.documents.findOne((ref = publication.coverPart) != null ? ref._id : void 0);
      });
      this.tableOfContentsPart = new ComputedField(() => {
        var publication, ref;
        if (!(publication = this.publication())) {
          return;
        }
        return PAA.Publication.Part.documents.findOne((ref = publication.tableOfContentsPart) != null ? ref._id : void 0);
      });
      this.spreadPagesCount = new ComputedField(() => {
        var ref, ref1;
        return ((ref = this.publication()) != null ? (ref1 = ref.design) != null ? ref1.spreadPagesCount : void 0 : void 0) || 1;
      });
      this.pageNumbers = new ComputedField(() => {
        var i, leftPageIndex, pagesCount, ref, results, spreadPageIndex, spreadPagesCount;
        spreadPagesCount = this.spreadPagesCount();
        leftPageIndex = this.leftPageIndex();
        pagesCount = this.pagesCount();
        results = [];
        for (spreadPageIndex = i = 0, ref = spreadPagesCount; 0 <= ref ? i < ref : i > ref; spreadPageIndex = 0 <= ref ? ++i : --i) {
          if (!pagesCount || leftPageIndex + spreadPageIndex < pagesCount) {
            results.push({
              spreadNumber: spreadPageIndex + 1,
              totalNumber: leftPageIndex + spreadPageIndex + 1
            });
          }
        }
        return results;
      });
      this.activePart = new ComputedField(() => {
        return PAA.Publication.Part.documents.findOne(this.activePartId());
      });

      // Automatically activate the only part if there is no cover.
      return this.autorun(computation => {
        var publication;
        if (!(publication = this.publication())) {
          return;
        }
        if (publication.contents.length !== 1) {
          return;
        }
        if (publication.coverPart) {
          return;
        }
        return this.activePartId(publication.contents[0].part._id);
      });
    }
    onRendered() {
      super.onRendered(...arguments);
      // Reactively update pages count.
      this.autorun(computation => {
        if (!this.publication()) {
          return;
        }
        if (!this.opened()) {
          return;
        }
        // Update when active content item or page index changes.
        this.activePart();
        this.visiblePageIndex();
        return this.updatePagesCount();
      });
      // React to active content item changes.
      return this.autorun(computation => {
        var activePart;
        activePart = this.activePart();
        if (activePart) {
          // If we're coming from the table of contents, go to first page of the article.
          if (!this._lastActivePart) {
            this.leftPageIndex(0);
            this.visiblePageIndex(0);
          }
        } else {
          // Remember which page on the table of contents we were.
          this._lastTableOfContentsVisiblePageIndex = this.visiblePageIndex();
        }
        return this._lastActivePart = activePart;
      });
    }
    enable() {
      return this.enabled(true);
    }
    disable() {
      this.enabled(false);
      this.opened(false);
      return this.scrollToTop();
    }
    open() {
      var publication;
      if (this.opened()) {
        return;
      }
      this.opened(true);
      if (!(publication = this.publication())) {
        return;
      }
      if (publication.tableOfContentsPart) {
        this.activePartId(null);
      } else {
        this.activePartId(publication.contents[0].part._id);
      }
      this.leftPageIndex(0);
      this.visiblePageIndex(0);
      this.scrollToTop();
      return this.audio.open();
    }
    close() {
      if (!this.opened()) {
        return;
      }
      this.opened(false);
      this.activePartId(null);
      this.leftPageIndex(0);
      this.visiblePageIndex(0);
      this.scrollToTop();
      return this.audio.close();
    }
    back() {
      var publication;
      // You can't go back if you're not opened.
      if (!this.opened()) {
        return;
      }
      // You can't go back if you're on a single part.
      if (!(publication = this.publication())) {
        return;
      }
      if (publication.contents.length === 1 && !publication.coverPart) {
        return;
      }

      // Return to the table of contents or close the publication.
      if (this.activePartId() && publication.tableOfContentsPart) {
        this.goToTableOfContents();
      } else {
        this.close();
      }

      // Inform that we could perform a back action.
      return true;
    }
    goToTableOfContents() {
      var spreadPagesCount;
      spreadPagesCount = this.spreadPagesCount();

      // Return to the page of the table of contents that we last saw.
      this.visiblePageIndex(this._lastTableOfContentsVisiblePageIndex);
      this.leftPageIndex(Math.floor(this._lastTableOfContentsVisiblePageIndex / spreadPagesCount) * spreadPagesCount);
      this.activePartId(null);
      this.scrollToTop();
      return this.audio.turnPages();
    }
    goToPart(partId) {
      var part, partState;
      this.activePartId(partId);

      // Mark part as read.
      part = PAA.Publication.Part.documents.findOne(partId);
      partState = PAA.Publication.Part.getStateForReferenceId(part.referenceId);
      partState('read', true);
      this.scrollToTop();
      return this.audio.turnPages();
    }
    canMoveLeft() {
      // We can move left if we're not on the first page.
      return this.visiblePageIndex();
    }
    canMoveRight() {
      // Are we on the last page of the section?
      return this.visiblePageIndex() + 1 < this.pagesCount();
    }
    previousPage() {
      var leftPageIndex, spreadPagesCount, visiblePageIndex;
      if (!this.canMoveLeft()) {
        return;
      }
      leftPageIndex = this.leftPageIndex();
      visiblePageIndex = this.visiblePageIndex();
      spreadPagesCount = this.spreadPagesCount();
      if (leftPageIndex === visiblePageIndex) {
        leftPageIndex -= spreadPagesCount;
        this.audio.turnPage();
      } else {
        this.audio.movePage();
      }
      visiblePageIndex--;
      this.leftPageIndex(leftPageIndex);
      this.visiblePageIndex(visiblePageIndex);
      return this.scrollToTop();
    }
    nextPage() {
      var leftPageIndex, spreadPagesCount, visiblePageIndex;
      if (!this.canMoveRight()) {
        return;
      }
      leftPageIndex = this.leftPageIndex();
      visiblePageIndex = this.visiblePageIndex();
      spreadPagesCount = this.spreadPagesCount();
      if (leftPageIndex !== visiblePageIndex) {
        leftPageIndex += spreadPagesCount;
        this.audio.turnPage();
      } else {
        this.audio.movePage();
      }
      visiblePageIndex++;
      this.leftPageIndex(leftPageIndex);
      this.visiblePageIndex(visiblePageIndex);
      return this.scrollToTop();
    }
    scrollToTop() {
      var currentScrollTop, scrollContainer, targetScrollTop;
      if (!this.isRendered()) {
        return;
      }
      scrollContainer = this.$(".scroll-container")[0];
      if (!(currentScrollTop = scrollContainer.scrollTop)) {
        return;
      }
      targetScrollTop = 0;
      return $(".pixelartacademy-publication-component").velocity('stop').velocity({
        tween: [targetScrollTop, currentScrollTop]
      }, {
        duration: 500,
        easing: 'ease-in-out',
        progress: (elements, complete, remaining, start, tweenValue) => {
          return scrollContainer.scrollTop = tweenValue;
        }
      });
    }
    contentUpdated() {
      return this.manualContentUpdatedDependency.changed();
    }
    updatePagesCount() {
      // Depend on manual update events.
      this.manualContentUpdatedDependency.depend();
      return this._updatePagesCountViaEndPage();
    }
    _updatePagesCountViaEndPage() {
      var pageWidth, publication, scale;
      if (!(publication = this.publication())) {
        return;
      }
      scale = this.display.scale();
      pageWidth = publication.design.size.width * scale;
      return Meteor.setTimeout(() => {
        var endPageLeft, pagesCount;
        // Search for the new end page.
        endPageLeft = this.$('.end-page').position().left;
        pagesCount = Math.ceil((endPageLeft + 1) / pageWidth);
        return this.pagesCount(pagesCount);
      }, 100);
    }
    enabledClass() {
      if (this.enabled()) {
        return 'enabled';
      }
    }
    canMoveLeft() {
      if (!this.opened()) {
        return;
      }
      return this.visiblePageIndex();
    }
    canMoveRight() {
      if (!(this.opened() && this.pagesCount())) {
        return;
      }
      return this.visiblePageIndex() + 1 < this.pagesCount();
    }
    moveButtonStyle() {
      var publication;
      if (!(publication = this.publication())) {
        return;
      }
      return {
        width: "calc(50% - ".concat(publication.design.size.width / 2 - this.designConstants.moveButtonExtraWidth, "rem)")
      };
    }
    pageClasses() {
      var mainClass;
      if (this.activePartId()) {
        mainClass = 'content-part';
      } else {
        if (this.opened()) {
          mainClass = 'table-of-contents';
        } else {
          mainClass = 'cover';
        }
      }
      return "".concat(mainClass, " page-").concat(this.leftPageIndex() + 1);
    }
    activeContentItem() {
      var activePart;
      if (activePart = this.activePart()) {
        return activePart;
      } else {
        if (this.opened()) {
          return this.tableOfContentsPart();
        } else {
          return this.coverPart();
        }
      }
    }
    publicationAreaStyle() {
      var left, publication;
      if (!(publication = this.publication())) {
        return;
      }
      if (this.opened() && this.leftPageIndex() === this.visiblePageIndex()) {
        left = publication.design.size.width;
      } else {
        left = 0;
      }
      return {
        left: "".concat(left, "rem"),
        width: "".concat(publication.design.size.width, "rem"),
        height: "".concat(publication.design.size.height, "rem")
      };
    }
    publicationStyle() {
      var publication;
      if (!(publication = this.publication())) {
        return;
      }
      return {
        left: "".concat(this.opened() ? -publication.design.size.width * (publication.design.spreadPagesCount - 1) : 0, "rem")
      };
    }
    contentsStyle() {
      var leftPageIndex, offset, offsetWidth, publication;
      if (!(publication = this.publication())) {
        return;
      }
      leftPageIndex = this.leftPageIndex();
      offsetWidth = publication.design.size.offsetWidth || publication.design.size.width;
      offset = -leftPageIndex * offsetWidth;
      return {
        transform: "translateX(".concat(offset, "rem)")
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .cover': this.onClickCover,
        'click .move-button.left': this.onClickMoveButtonLeft,
        'click .move-button.right': this.onClickMoveButtonRight
      });
    }
    onClickCover() {
      if (!this.enabled()) {
        return;
      }
      return this.open();
    }
    onClickMoveButtonLeft(event) {
      return this.previousPage();
    }
    onClickMoveButtonRight(event) {
      return this.nextPage();
    }
  }
  ;
  Component.register(Component.id());
  Component.Audio = new LOI.Assets.Audio.Namespace(Component.id(), {
    variables: {
      open: AEc.ValueTypes.Trigger,
      close: AEc.ValueTypes.Trigger,
      turnPages: AEc.ValueTypes.Trigger,
      turnPage: AEc.ValueTypes.Trigger,
      movePage: AEc.ValueTypes.Trigger
    }
  });
  return Component;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.component.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/component/template.component.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Component");
Template["PixelArtAcademy.Publication.Component"] = new Template("Template.PixelArtAcademy.Publication.Component", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-publication-component ", Spacebars.mustache(view.lookup("enabledClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: "scroll-container"
  }, "\n      ", HTML.DIV({
    class: "scroll-content"
  }, "\n        ", Blaze.If(function() {
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
  }), "\n        ", Spacebars.With(function() {
    return Spacebars.call(view.lookup("publication"));
  }, function() {
    return [ "\n          ", HTML.DIV(HTML.Attrs({
      class: "publication-area"
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("publicationAreaStyle"));
    }), "\n            ", HTML.DIV(HTML.Attrs({
      class: function() {
        return [ "publication ", Spacebars.mustache(view.lookup("pageClasses")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("design"), "class")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("activeContentItem"), "design", "class")) ];
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("style"), view.lookup("publicationStyle"));
    }), "\n              ", HTML.DIV({
      class: "running-header"
    }, "\n                ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Component", "Header"));
    }), "\n              "), "\n              ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("activeContentItem"));
    }, function() {
      return [ "\n                ", HTML.DIV({
        class: "read-only contents-area"
      }, "\n                  ", HTML.DIV(HTML.Attrs({
        class: "contents"
      }, function() {
        return Spacebars.attrMustache(view.lookup("style"), view.lookup("contentsStyle"));
      }), "\n                    ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Component", "Article"));
      }), HTML.Raw('\n                    <div class="end-page"></div>\n                  ')), "\n                "), "\n              " ];
    }), "\n              ", HTML.DIV({
      class: "running-footer"
    }, "\n                ", HTML.DIV({
      class: "page-numbers"
    }, "\n                  ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("pageNumbers"));
    }, function() {
      return [ "\n                    ", HTML.DIV({
        class: function() {
          return [ "page-number spread-page-", Spacebars.mustache(view.lookup("spreadNumber")) ];
        }
      }, Blaze.View("lookup:totalNumber", function() {
        return Spacebars.mustache(view.lookup("totalNumber"));
      }), Blaze.If(function() {
        return Spacebars.call(view.lookup("pagesCount"));
      }, function() {
        return [ "/", Blaze.View("lookup:pagesCount", function() {
          return Spacebars.mustache(view.lookup("pagesCount"));
        }) ];
      })), "\n                  " ];
    }), "\n                "), "\n              "), "\n            "), "\n          "), "\n        " ];
  }), "\n      "), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"article-client":{"article.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/component/article-client/article.coffee                             //
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
PAA.Publication.Component.Article = function () {
  class Article extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Publication.Component.Article';
    }
    static version() {
      return '0.1.0';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.publicationComponent = this.ancestorComponentOfType(PAA.Publication.Component);
      this.publication = new ComputedField(() => {
        return this.publicationComponent.publication();
      });
      this.quill = new AE.ReactiveWrapper(null);
      return this.constructor.BlotsAudio.load(LOI.adventure.audioManager);
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.constructor.BlotsAudio.unload();
    }
    onRendered() {
      var quill;
      super.onRendered(...arguments);
      // Initialize quill.
      quill = new Quill(this.$('.pixelartacademy-publication-article')[0], {
        formats: PAA.Publication.Article.quillFormats,
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
        var part;
        if (!(part = this.data())) {
          return;
        }
        return quill.setContents(part.article, Quill.sources.API);
      });
    }
    contentUpdated() {
      return this.publicationComponent.contentUpdated();
    }
  }
  ;
  Article.register(Article.id());

  // Handle the audio namespace for all blobs.
  Article.BlotsAudio = new LOI.Assets.Audio.Namespace('PixelArtAcademy.Publication.Article');
  return Article;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.article.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/component/article-client/template.article.js                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Component.Article");
Template["PixelArtAcademy.Publication.Component.Article"] = new Template("Template.PixelArtAcademy.Publication.Component.Article", (function() {
  var view = this;
  return HTML.Raw('<article class="pixelartacademy-publication-component-article">\n    <div class="pixelartacademy-publication-article"></div>\n  </article>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"header-client":{"header.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/component/header-client/header.coffee                               //
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
PAA.Publication.Component.Header = function () {
  class Header extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Publication.Component.Header';
    }
    static version() {
      return '0.1.0';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.publicationComponent = this.ancestorComponentOfType(PAA.Publication.Component);
      this.publication = new ComputedField(() => {
        return this.publicationComponent.publication();
      });
      return this.quill = new AE.ReactiveWrapper(null);
    }
    onRendered() {
      var quill;
      super.onRendered(...arguments);
      // Initialize quill.
      quill = new Quill(this.$('.pixelartacademy-publication-header')[0], {
        formats: PAA.Publication.Header.quillFormats,
        readOnly: true
      });
      this.quill(quill);
      // Update quill content.
      return this.autorun(computation => {
        var publication, ref;
        if (!(publication = this.data())) {
          return;
        }
        return quill.setContents((ref = publication.design) != null ? ref.header : void 0, Quill.sources.API);
      });
    }
  }
  ;
  Header.register(Header.id());
  return Header;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.header.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/component/header-client/template.header.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Component.Header");
Template["PixelArtAcademy.Publication.Component.Header"] = new Template("Template.PixelArtAcademy.Publication.Component.Header", (function() {
  var view = this;
  return HTML.Raw('<header class="pixelartacademy-publication-component-header">\n    <div class="pixelartacademy-publication-header"></div>\n  </header>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"article":{"article.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/article.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var LOI, PAA;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Article = function () {
  class Article {}
  ;
  Article.quillFormats = ['bold', 'italic', 'strike', 'underline', 'script', 'link', 'code', 'blockquote', 'header', 'list', 'code-block', 'small', 'image', 'video', 'publication-figure', 'publication-header-heading', 'publication-customclass', 'publication-tableofcontents'];
  return Article;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"blots-client":{"header":{"header.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/header/header.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Block, Container, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Block = AM.Quill.import('blots/block');
Container = AM.Quill.import('blots/container');
PAA.Publication.Article.Header = function () {
  class Header extends Container {}
  ;
  Header.blotName = 'publication-header';
  Header.tagName = 'header';
  Header.className = 'pixelartacademy-publication-article-header';
  Header.Heading = function () {
    class Heading extends Block {
      static formats(domNode) {
        return this.tagName.indexOf(domNode.tagName) + 1;
      }
    }
    ;
    Heading.blotName = 'publication-header-heading';
    Heading.tagName = ['H1', 'H2', 'H3'];
    Heading.className = 'pixelartacademy-publication-article-header-heading';
    return Heading;
  }.call(this);
  return Header;
}.call(this);
PAA.Publication.Article.Header.allowedChildren = [PAA.Publication.Article.Header.Heading];
PAA.Publication.Article.Header.Heading.requiredContainer = PAA.Publication.Article.Header;
AM.Quill.register(PAA.Publication.Article.Header);
AM.Quill.register(PAA.Publication.Article.Header.Heading);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"customclass":{"customclass.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/customclass/customclass.coffee                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, Block, Container, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
Block = AM.Quill.import('blots/block');
Container = AM.Quill.import('blots/container');
PAA.Publication.Article.CustomClass = function () {
  class CustomClass extends Block {
    static create(value) {
      var domNode;
      domNode = super.create(value);
      domNode.className = "".concat(this.className, " ").concat(value);
      return domNode;
    }
    static formats(domNode) {
      var classes, result;
      classes = _.without([...domNode.classList], this.className);
      result = classes.join(' ') || void 0;
      return result;
    }
    format(name, value) {
      if (name === this.constructor.blotName && value) {
        if (value) {
          return this.domNode.className = "".concat(this.constructor.className, " ").concat(value);
        } else {
          return this.domNode.className = this.constructor.className;
        }
      } else {
        return super.format(name, value);
      }
    }
    static registerClass(className) {
      return this._classes.push(className);
    }
    static getClasses() {
      return this._classes;
    }
  }
  ;
  CustomClass.blotName = 'publication-customclass';
  CustomClass.tagName = 'p';
  CustomClass.className = 'pixelartacademy-publication-article-customclass';
  CustomClass._classes = [];
  CustomClass.Container = function (superClass) {
    class Container extends superClass {}
    ;
    Container.blotName = 'publication-customclass-container';
    Container.tagName = 'div';
    Container.className = 'pixelartacademy-publication-article-customclass-container';
    return Container;
  }.call(this, Container);
  return CustomClass;
}.call(this);
PAA.Publication.Article.CustomClass.Container.allowedChildren = [PAA.Publication.Article.CustomClass];
PAA.Publication.Article.CustomClass.requiredContainer = PAA.Publication.Article.CustomClass.Container;
AM.Quill.register(PAA.Publication.Article.CustomClass.Container);
AM.Quill.register(PAA.Publication.Article.CustomClass);
PAA.Publication.Article.CustomClass.registerClass("column-break-before");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tableofcontents":{"tableofcontents.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/tableofcontents/tableofcontents.coffee         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.Publication.Article.TableOfContents = function () {
  class TableOfContents extends AM.Quill.BlotComponent {
    static id() {
      return 'PixelArtAcademy.Publication.Article.TableOfContents';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.publication = new ComputedField(() => {
        var ref;
        return (ref = this.quillComponent()) != null ? typeof ref.publication === "function" ? ref.publication() : void 0 : void 0;
      });
      this.contentItems = new ComputedField(() => {
        var publication;
        if (!(publication = this.publication())) {
          return;
        }
        return _.sortBy(publication.contents, 'order');
      });
      return this.unlockedParts = new ComputedField(() => {
        var currentSituation;
        if (!LOI.adventure) {
          return [];
        }
        currentSituation = new LOI.Adventure.Situation({
          location: PAA.Publication.Part.Location
        });
        return currentSituation.things();
      });
    }
    unlockedClass() {
      var contentItem, ref;
      contentItem = this.currentData();
      if (ref = contentItem.part.referenceId, indexOf.call(this.unlockedParts(), ref) >= 0) {
        return 'unlocked';
      }
    }
    unreadClass() {
      var contentItem, partState;
      contentItem = this.currentData();
      partState = PAA.Publication.Part.getStateForReferenceId(contentItem.part.referenceId);
      if (!partState('read')) {
        return 'unread';
      }
    }
    part() {
      var contentItem;
      contentItem = this.currentData();
      return PAA.Publication.Part.documents.findOne(contentItem.part._id);
    }
    events() {
      return super.events(...arguments).concat({
        'click .content-item': this.onClickContentItem
      });
    }
    onClickContentItem(event) {
      var contentItem, publicationComponent, ref;
      contentItem = this.currentData();
      if (ref = contentItem.part.referenceId, indexOf.call(this.unlockedParts(), ref) < 0) {
        return;
      }
      publicationComponent = this.quillComponent().publicationComponent;
      return publicationComponent.goToPart(contentItem.part._id);
    }
  }
  ;
  TableOfContents.register(TableOfContents.id());
  TableOfContents.registerBlot({
    name: 'publication-tableofcontents',
    tag: 'div',
    class: 'pixelartacademy-publication-article-tableofcontents'
  });
  return TableOfContents;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.tableofcontents.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/tableofcontents/template.tableofcontents.js    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Article.TableOfContents");
Template["PixelArtAcademy.Publication.Article.TableOfContents"] = new Template("Template.PixelArtAcademy.Publication.Article.TableOfContents", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("publication"));
  }, function() {
    return [ "\n    ", HTML.OL({
      class: "table-of-contents"
    }, "\n    ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("contentItems"));
    }, function() {
      return [ "\n      ", HTML.LI({
        class: function() {
          return [ "content-item ", Spacebars.mustache(view.lookup("unlockedClass")), " ", Spacebars.mustache(view.lookup("unreadClass")) ];
        }
      }, "\n        ", HTML.DIV({
        class: "title"
      }, "\n          ", Blaze.View("lookup:part.title", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("part"), "title"));
      }), "\n        "), "\n      "), "\n    " ];
    }), "\n    "), "\n  " ];
  }, function() {
    return "\n    目录\n  ";
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"figure":{"figure.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/figure/figure.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.Publication.Article.Figure = function () {
  class Figure extends AM.Quill.BlotComponent {
    static id() {
      return 'PixelArtAcademy.Publication.Article.Figure';
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
    updateElementProperty(index, property, value) {
      var element, elementType, figure;
      figure = this.getFigure();
      element = figure.elements[index];
      elementType = _.keys(element)[0];
      element[elementType][property] = value;
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
        'click .remove-element-button': this.onClickRemoveElementButton
      });
    }
    onClickAddElementButton(event) {
      var figure, i, len, url, urls;
      // Use the browser input dialog box to ask for URLs.
      urls = prompt('Insert comma-separated image URLs').split(',');
      // Insert new images to the figure.
      figure = this.getFigure();
      for (i = 0, len = urls.length; i < len; i++) {
        url = urls[i];
        figure.elements.push({
          image: {
            url
          }
        });
      }
      figure.layout.push(urls.length);
      return this.setFigure(figure);
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
    name: 'publication-figure',
    tag: 'figure',
    class: 'pixelartacademy-publication-article-figure'
  });
  Figure.Layout = function () {
    class Layout extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.realtime = false;
      }
      onCreated() {
        super.onCreated(...arguments);
        return this.figureComponent = this.ancestorComponentOfType(PAA.Publication.Article.Figure);
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
    Layout.register('PixelArtAcademy.Publication.Article.Figure.Layout');
    return Layout;
  }.call(this);
  Figure.Property = class Property extends AM.DataInputComponent {
    static property() {
      throw new AE.NotImplementedException("Property name must be provided.");
    }
    constructor() {
      super(...arguments);
      this.realtime = false;
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.figureComponent = this.ancestorComponentOfType(PAA.Publication.Article.Figure);
    }
    load() {
      var figure;
      figure = this.figureComponent.getFigure();
      return figure[this.constructor.property()];
    }
    save(value) {
      var figure;
      figure = this.figureComponent.value();
      figure[this.constructor.property()] = value;
      return this.figureComponent.setFigure(figure);
    }
  };
  Figure.Caption = function () {
    class Caption extends Figure.Property {
      static property() {
        return 'caption';
      }
      constructor() {
        super(...arguments);
        this.type = AM.DataInputComponent.Types.TextArea;
      }
    }
    ;
    Caption.register('PixelArtAcademy.Publication.Article.Figure.Caption');
    return Caption;
  }.call(this);
  Figure.StyleClass = function () {
    class StyleClass extends Figure.Property {
      static property() {
        return 'class';
      }
      constructor() {
        super(...arguments);
        this.inputClass = "style";
      }
    }
    ;
    StyleClass.register('PixelArtAcademy.Publication.Article.Figure.StyleClass');
    return StyleClass;
  }.call(this);
  return Figure;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.figure.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/figure/template.figure.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Article.Figure");
Template["PixelArtAcademy.Publication.Article.Figure"] = new Template("Template.PixelArtAcademy.Publication.Article.Figure", (function() {
  var view = this;
  return [ HTML.DIV({
    class: function() {
      return [ "elements ", Spacebars.mustache(Spacebars.dot(view.lookup("value"), "class")) ];
    }
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
          return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Article", "Figure", "Image"));
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
    return [ HTML.Raw('\n    <button class="add-element-button">+</button>\n    Layout: '), Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Article", "Figure", "Layout"));
    }), "\n    Style: ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Article", "Figure", "StyleClass"));
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
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Article", "Figure", "Caption"));
    }), "\n    "), "\n  " ];
  }) ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"image":{"image.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/figure/image/image.coffee                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Article.Figure.Image = function () {
  class Image extends LOI.Component {
    static id() {
      return 'PixelArtAcademy.Publication.Article.Figure.Image';
    }
    static version() {
      return '0.1.0';
    }
    template() {
      return this.constructor.id();
    }
    onCreated() {
      super.onCreated(...arguments);
      this.figure = this.ancestorComponentOfType(PAA.Publication.Article.Figure);
      this.bitmap = new ComputedField(() => {
        var asset, editor;
        if (!LOI.adventure) {
          return;
        }
        if (!(editor = PAA.PixelPad.Apps.Drawing.Editor.getEditor())) {
          return;
        }
        if (!(asset = editor.activeAsset())) {
          return;
        }
        if (!(asset instanceof PAA.Practice.Project.Asset.Bitmap)) {
          return;
        }
        return asset;
      });
      return this.addedToReferences = new ComputedField(() => {
        var bitmap, element, ref, references;
        if (!(bitmap = this.bitmap())) {
          return;
        }
        if (!(references = (ref = bitmap.bitmap()) != null ? ref.references : void 0)) {
          return;
        }
        element = this.data();
        return _.find(references, reference => {
          return reference.image.url === element.image.url;
        });
      });
    }
    addedToReferencesClass() {
      if (this.addedToReferences()) {
        return 'added-to-references';
      }
    }
    canCut() {
      return this.figure.readOnly() && this.bitmap();
    }
    imageSource() {
      var element;
      element = this.data();
      return element.image.url;
    }
    imageCredit() {
      var element;
      element = this.data();
      return element.image.credit;
    }
    events() {
      return super.events(...arguments).concat({
        'load img': this.onLoadImage,
        'click img': this.onClickImage,
        'click .cutout': this.onClickCutout,
        'click .added-to-references-info': this.onClickAddedToReferencesInfo
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
      var artworks;
      artworks = [{
        image: event.target
      }];
      return LOI.adventure.interface.focusArtworks(artworks);
    }
    onClickCutout(event) {
      var bitmap, document, element;
      element = this.data();
      bitmap = this.bitmap();
      document = bitmap.bitmap();
      document.executeAction(new LOI.Assets.VisualAsset.Actions.AddReferenceByUrl(this.constructor.id(), document, element.image.url, {
        position: {
          x: 100 * (Math.random() - 0.5),
          y: 100 * (Math.random() - 0.5)
        }
      }));
      this.audio.pan(AEc.getPanForPosition(event.screenX));
      return this.audio.cut();
    }
    onClickAddedToReferencesInfo(event) {
      var bitmap, document, element;
      element = this.data();
      bitmap = this.bitmap();
      document = bitmap.bitmap();
      document.executeAction(new LOI.Assets.VisualAsset.Actions.RemoveReferenceByUrl(this.constructor.id(), document, element.image.url));
      this.audio.pan(AEc.getPanForPosition(event.screenX));
      return this.audio.paste();
    }
  }
  ;
  Image.register(Image.id());
  Image.Audio = new LOI.Assets.Audio.Namespace(Image.id(), {
    subNamespace: true,
    variables: {
      cut: AEc.ValueTypes.Trigger,
      paste: AEc.ValueTypes.Trigger,
      pan: AEc.ValueTypes.Number
    }
  });
  Image.Property = class Property extends AM.DataInputComponent {
    static property() {
      throw new AE.NotImplementedException("Property name must be provided.");
    }
    constructor() {
      super(...arguments);
      this.realtime = false;
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.figure = this.ancestorComponentOfType(PAA.Publication.Article.Figure);
    }
    load() {
      var element;
      element = this.data();
      return element.image[this.constructor.property()];
    }
    save(value) {
      var element;
      element = this.data();
      return this.figure.updateElementProperty(element.index, this.constructor.property(), value);
    }
  };
  Image.Url = function () {
    class Url extends Image.Property {
      static property() {
        return 'url';
      }
    }
    ;
    Url.register('PixelArtAcademy.Publication.Article.Figure.Image.Url');
    return Url;
  }.call(this);
  Image.Credit = function () {
    class Credit extends Image.Property {
      static property() {
        return 'credit';
      }
    }
    ;
    Credit.register('PixelArtAcademy.Publication.Article.Figure.Image.Credit');
    return Credit;
  }.call(this);
  return Image;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.image.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/article/blots-client/figure/image/template.image.js                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Article.Figure.Image");
Template["PixelArtAcademy.Publication.Article.Figure.Image"] = new Template("Template.PixelArtAcademy.Publication.Article.Figure.Image", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-publication-article-figure-image ", Spacebars.mustache(view.lookup("addedToReferencesClass")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("imageSource"));
  }, function() {
    return [ "\n      ", HTML.IMG({
      class: "image",
      src: function() {
        return Spacebars.mustache(view.lookup("imageSource"));
      }
    }), "\n      ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("figure"), "readOnly"));
    }, function() {
      return [ "\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("imageCredit"));
      }, function() {
        return [ "\n          ", HTML.DIV({
          class: "credit"
        }, Blaze.View("lookup:imageCredit", function() {
          return Spacebars.mustache(view.lookup("imageCredit"));
        })), "\n        " ];
      }), "\n      " ];
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Article", "Figure", "Image", "Url"));
      }), "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Article", "Figure", "Image", "Credit"));
      }), "\n      " ];
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("canCut"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("addedToReferences"));
    }, function() {
      return HTML.Raw('\n        <div class="added-to-references-info">\n          已添加到参考\n        </div>\n      ');
    }, function() {
      return HTML.Raw('\n        <div class="cutout">\n          <div class="cut-icon"></div>\n        </div>\n      ');
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

}}}}},"pages":{"pages.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/pages.coffee                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var PAA;
PAA = PixelArtAcademy;
PAA.Publication.Pages = class Pages {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"admin":{"admin.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/admin.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, PAA;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.Publication.Pages.Admin = function () {
  class Admin extends AM.Component {}
  ;
  Admin.register('PixelArtAcademy.Publication.Pages.Admin');
  return Admin;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.admin.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/template.admin.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Pages.Admin");
Template["PixelArtAcademy.Publication.Pages.Admin"] = new Template("Template.PixelArtAcademy.Publication.Pages.Admin", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-publication-pages-admin"
  }, HTML.Raw("\n    <h1>Publication Administration</h1>\n    <p>Tools:</p>\n    "), HTML.UL("\n      ", HTML.LI(HTML.STRONG(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.Publication.Pages.Admin.Parts");
    }
  }, "Parts")), ":\n        Edit publication parts."), "\n      ", HTML.LI(HTML.STRONG(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("routerPath"), "PixelArtAcademy.Publication.Pages.Admin.Publications");
    }
  }, "Publications")), ":\n        Edit publications."), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"parts":{"parts.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/parts/parts.coffee                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, PAA;
AM = Artificial.Mirage;
AB = Artificial.Base;
PAA = PixelArtAcademy;
PAA.Publication.Pages.Admin.Parts = function () {
  class Parts extends Artificial.Mummification.Admin.Components.AdminPage {
    static id() {
      return 'PixelArtAcademy.Publication.Pages.Admin.Parts';
    }
    constructor() {
      super({
        documentClass: PAA.Publication.Part,
        adminComponentClass: PAA.Publication.Pages.Admin.Parts.Part,
        sortField: 'referenceId',
        nameFunction: part => {
          var parts, publicationsPartIndex;
          if (!part.referenceId) {
            return part._id;
          }
          parts = part.referenceId.split('.');
          publicationsPartIndex = _.indexOf(parts, 'Publications');
          return parts.slice(publicationsPartIndex + 1).join(' ');
        },
        singularName: 'publication part',
        pluralName: 'publication parts'
      });
    }
    events() {
      return super.events(...arguments).concat({
        'input .preview-classes': this.onInputPreviewClasses
      });
    }
    onInputPreviewClasses(event) {
      var ref;
      return this.$('.publication')[0].className = "publication ".concat(event.target.value, " ").concat(typeof document !== "undefined" && document !== null ? (ref = document.design) != null ? ref.class : void 0 : void 0);
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
// packages/retronator_pixelartacademy-publication/pages/admin/parts/template.parts.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Pages.Admin.Parts");
Template["PixelArtAcademy.Publication.Pages.Admin.Parts"] = new Template("Template.PixelArtAcademy.Publication.Pages.Admin.Parts", (function() {
  var view = this;
  return [ HTML.STYLE("\n    html {font-size: 2px;}\n  "), "\n  ", HTML.DIV({
    class: "pixelartacademy-publication-pages-admin-parts pixelartacademy-pages-admin-components-adminpage"
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
    }, HTML.Raw('\n        Preview classes: <input class="preview-classes">\n        '), Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("document"));
    }, function() {
      return Spacebars.include(view.lookupTemplate("documentPage"));
    }), "\n      "), "\n    " ];
  }), "\n  ") ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"part.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/parts/part.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AM, LOI, PAA;
AB = Artificial.Babel;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Pages.Admin.Parts.Part = function () {
  class Part extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Publication.Pages.Admin.Parts.Part';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.autorun(computation => {
        var part;
        part = this.data();
        return PAA.Publication.Part.articleForPart.subscribe(this, part._id);
      });
    }
    events() {
      return super.events(...arguments).concat({
        'click .remove-part-button': this.onClickRemovePartButton,
        'click .add-title-button': this.onClickAddTitleButton
      });
    }
    onClickRemovePartButton(event) {
      var part;
      part = this.data();
      if (!confirm("Remove part ".concat(part.goalId, "?"))) {
        return;
      }
      return PAA.Publication.Part.remove(part._id);
    }
    onClickAddTitleButton(event) {
      var part;
      part = this.data();
      return PAA.Publication.Part.addTitle(part._id);
    }
  }
  ;
  Part.register(Part.id());
  Part.ReferenceId = function () {
    class ReferenceId extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.realtime = false;
      }
      load() {
        var ref;
        return (ref = this.data()) != null ? ref.referenceId : void 0;
      }
      save(value) {
        var partId;
        partId = this.data()._id;
        return PAA.Publication.Part.update(partId, {
          "referenceId": value
        });
      }
    }
    ;
    ReferenceId.register('PixelArtAcademy.Publication.Pages.Admin.Parts.Part.ReferenceId');
    return ReferenceId;
  }.call(this);
  Part.Title = function () {
    class Title extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.realtime = false;
      }
      load() {
        var ref;
        return (ref = this.data()) != null ? ref.title : void 0;
      }
      save(value) {
        var partId;
        partId = this.data()._id;
        if (value) {
          return PAA.Publication.Part.update(partId, {
            "title": value
          });
        } else {
          return PAA.Publication.Part.removeTitle(partId);
        }
      }
    }
    ;
    Title.register('PixelArtAcademy.Publication.Pages.Admin.Parts.Part.Title');
    return Title;
  }.call(this);
  Part.Design = function () {
    class Design {}
    ;
    Design.Class = function () {
      class Class extends AM.DataInputComponent {
        constructor() {
          super(...arguments);
          this.realtime = false;
        }
        load() {
          var ref, ref1;
          return (ref = this.data()) != null ? (ref1 = ref.design) != null ? ref1.class : void 0 : void 0;
        }
        save(value) {
          var partId;
          partId = this.data()._id;
          return PAA.Publication.Part.update(partId, {
            "design.class": value
          });
        }
      }
      ;
      Class.register('PixelArtAcademy.Publication.Pages.Admin.Parts.Part.Design.Class');
      return Class;
    }.call(this);
    return Design;
  }.call(this);
  return Part;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.part.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/parts/template.part.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Pages.Admin.Parts.Part");
Template["PixelArtAcademy.Publication.Pages.Admin.Parts.Part"] = new Template("Template.PixelArtAcademy.Publication.Pages.Admin.Parts.Part", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-publication-pages-admin-parts-part"
  }, "\n    ", HTML.H2(Blaze.View("lookup:referenceId", function() {
    return Spacebars.mustache(view.lookup("referenceId"));
  })), "\n    ", HTML.LABEL({
    class: "reference-id"
  }, "Reference ID: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Parts", "Part", "ReferenceId"));
  })), "\n    ", HTML.LABEL({
    class: "title"
  }, "Title: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Parts", "Part", "Title"));
  })), "\n    ", HTML.DIV({
    class: "design section"
  }, "Design:\n      ", HTML.LABEL({
    class: "class"
  }, "Class: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Parts", "Part", "Design", "Class"));
  })), "\n    "), "\n    ", HTML.DIV({
    class: "article"
  }, "\n      Article: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Parts", "Part", "Article"));
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"article-client":{"article.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/parts/article-client/article.coffee                     //
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
icons['publication-figure'] = 'FG';
icons['publication-tableofcontents'] = 'ToC';
PAA.Publication.Pages.Admin.Parts.Part.Article = function () {
  class Article extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Publication.Pages.Admin.Parts.Part.Article';
    }
    static version() {
      return '0.1.0';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.partComponent = this.ancestorComponentOfType(PAA.Publication.Pages.Admin.Parts.Part);
      this.quill = new AE.ReactiveWrapper(null);
      this.article = new ComputedField(() => {
        return this.partComponent.data().article || [];
      });
      return this.displayScale = 2;
    }
    onRendered() {
      var className, customClassInput, i, len, noneOption, option, quill, ref, toolbarContainer;
      super.onRendered(...arguments);
      // Initialize quill.
      quill = new Quill(this.$('.pixelartacademy-publication-article')[0], {
        theme: 'snow',
        formats: PAA.Publication.Article.quillFormats,
        modules: {
          toolbar: {
            container: [[{
              'publication-header-heading': [1, 2, 3, false]
            }], [{
              'header': [1, 2, 3, 4, false]
            }], ['bold', 'italic', 'underline', 'strike', {
              'script': 'sub'
            }, {
              'script': 'super'
            }], ['link', 'code'], [{
              'list': 'ordered'
            }, {
              'list': 'bullet'
            }], ['blockquote', 'code-block', 'small'], ['image'], ['publication-tableofcontents'], ['clean']],
            handlers: {
              image: value => {
                return this.onQuillToolbarImageClick(value);
              },
              'publication-tableofcontents': value => {
                return this.onQuillToolbarPublicationTableOfContentsClick(value);
              }
            }
          }
        }
      });
      this.quill(quill);
      quill.on('text-change', (delta, oldDelta, source) => {
        var blot, i, len, part, ref, ref1;
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
          part = this.partComponent.data();
          return PAA.Publication.Part.updateArticle(part._id, delta.ops);
        }
      });
      quill.on('editor-change', () => {
        // Trigger reactive updates.
        return this.quill.updated();
      });

      // Add the custom class input.
      customClassInput = document.createElement('select');
      noneOption = document.createElement('option');
      noneOption.text = 'No class';
      noneOption.value = '';
      customClassInput.appendChild(noneOption);
      ref = PAA.Publication.Article.CustomClass.getClasses();
      for (i = 0, len = ref.length; i < len; i++) {
        className = ref[i];
        option = document.createElement('option');
        option.text = _.startCase(className);
        option.value = className;
        customClassInput.appendChild(option);
      }

      // Handle input changes.
      customClassInput.addEventListener('change', function (event) {
        var value;
        value = event.target.value.trim() || false;
        quill.focus();
        return quill.format('publication-customclass', value, Quill.sources.USER);
      });

      // Update custom class input based on the selected range.
      quill.on('editor-change', () => {
        var formats, range;
        [range] = quill.selection.getRange();
        formats = range != null ? quill.getFormat(range) : {};
        if (className = formats['publication-customclass']) {
          option = customClassInput.querySelector("option[value='".concat(className, "']"));
          if (!option) {
            option = document.createElement('option');
            option.text = _.startCase(className);
            option.value = className;
            customClassInput.appendChild(option);
          }
          return option.selected = true;
        } else {
          customClassInput.value = '';
          return customClassInput.selectedIndex = 0;
        }
      });

      // Add the input field to the toolbar.
      toolbarContainer = quill.container.previousSibling;
      toolbarContainer.appendChild(customClassInput);
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
      var figure, quill, range, url, urls;
      quill = this.quill();
      range = quill.getSelection();

      // Use the browser input dialog box to ask for a URL.
      urls = prompt('Insert comma-separated image URLs').split(',');
      // Insert a figure with the images in a row.
      figure = {
        layout: [urls.length],
        elements: function () {
          var i, len, results;
          results = [];
          for (i = 0, len = urls.length; i < len; i++) {
            url = urls[i];
            results.push({
              image: {
                url
              }
            });
          }
          return results;
        }()
      };
      return quill.insertEmbed(range.index, 'publication-figure', figure, Quill.sources.USER);
    }
    onQuillToolbarPublicationTableOfContentsClick() {
      var quill, range;
      quill = this.quill();
      range = quill.getSelection();
      return quill.insertEmbed(range.index, 'publication-tableofcontents', {}, Quill.sources.USER);
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
// packages/retronator_pixelartacademy-publication/pages/admin/parts/article-client/template.article.js                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Pages.Admin.Parts.Part.Article");
Template["PixelArtAcademy.Publication.Pages.Admin.Parts.Part.Article"] = new Template("Template.PixelArtAcademy.Publication.Pages.Admin.Parts.Part.Article", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-publication-pages-admin-parts-part-article">\n    <div class="publication">\n      <div class="contents-area">\n        <div class="contents">\n          <div class="pixelartacademy-publication-article"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <link rel="stylesheet" type="text/css" href="/artificial/mirage/quill/dist/quill.snow.css">');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"publications":{"publications.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/publications/publications.coffee                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM, LOI, PAA;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Publication.Pages.Admin.Publications = function () {
  class Publications extends Artificial.Mummification.Admin.Components.AdminPage {
    static id() {
      return 'PixelArtAcademy.Publication.Pages.Admin.Publications';
    }
    constructor() {
      super({
        documentClass: PAA.Publication,
        adminComponentClass: PAA.Publication.Pages.Admin.Publications.Publication,
        sortField: 'referenceId',
        nameFunction: publication => {
          var parts, publicationsPartIndex;
          if (!publication.referenceId) {
            return publication._id;
          }
          parts = publication.referenceId.split('.');
          publicationsPartIndex = _.indexOf(parts, 'Publications');
          return parts.slice(publicationsPartIndex + 1).join(' ');
        },
        singularName: 'publication',
        pluralName: 'publications'
      });
    }
    onCreated() {
      super.onCreated(...arguments);
      return PAA.Publication.Part.all.subscribe(this);
    }
  }
  ;
  Publications.register(Publications.id());
  return Publications;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.publications.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/publications/template.publications.js                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Pages.Admin.Publications");
Template["PixelArtAcademy.Publication.Pages.Admin.Publications"] = new Template("Template.PixelArtAcademy.Publication.Pages.Admin.Publications", (function() {
  var view = this;
  return [ HTML.STYLE("\n    html {font-size: 2px;}\n  "), "\n  ", HTML.DIV({
    class: "pixelartacademy-publication-pages-admin-publications pixelartacademy-pages-admin-components-adminpage"
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

},"publication.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/publications/publication.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AM,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
PAA = PixelArtAcademy;
PAA.Publication.Pages.Admin.Publications.Publication = function () {
  var Parent;
  class Publication extends Artificial.Mummification.Admin.Components.Document {
    static id() {
      return 'PixelArtAcademy.Publication.Pages.Admin.Publications.Publication';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.contentItems = new ComputedField(() => {
        var contentItem, contentItems, i, index, len, publication;
        publication = this.data();
        // Attach index to content items and sort them.
        contentItems = function () {
          var i, len, ref, results;
          ref = publication.contents;
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
      var contentItem, publication;
      contentItem = this.currentData();
      publication = this.data();
      return contentItem.sortedIndex < publication.contents.length - 1;
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
      var partId, publication;
      partId = this.$('.new-content-item select').val();
      publication = this.data();
      return PAA.Publication.addContentItem(publication._id, partId);
    }
    onClickContentItemsMoveUpButton(event) {
      var contentItem, contentItems, order, orderAbove, orderTwoAbove, publication, ref, ref1;
      contentItem = this.currentData();
      contentItems = this.contentItems();
      publication = this.data();
      // Place the item in between two items above.
      orderAbove = contentItems[contentItem.sortedIndex - 1].order;
      orderTwoAbove = (ref = (ref1 = contentItems[contentItem.sortedIndex - 2]) != null ? ref1.order : void 0) != null ? ref : orderAbove - 2;
      order = (orderAbove + orderTwoAbove) / 2;
      return PAA.Publication.updateContentItem(publication._id, contentItem.index, {
        order
      });
    }
    onClickContentItemsMoveDownButton(event) {
      var contentItem, contentItems, order, orderBelow, orderTwoBelow, publication, ref, ref1;
      contentItem = this.currentData();
      contentItems = this.contentItems();
      publication = this.data();
      // Place the item in between two items below.
      orderBelow = contentItems[contentItem.sortedIndex + 1].order;
      orderTwoBelow = (ref = (ref1 = contentItems[contentItem.sortedIndex + 2]) != null ? ref1.order : void 0) != null ? ref : orderBelow + 2;
      order = (orderBelow + orderTwoBelow) / 2;
      return PAA.Publication.updateContentItem(publication._id, contentItem.index, {
        order
      });
    }
    onClickContentItemsRemoveButton(event) {
      var contentItem, publication;
      contentItem = this.currentData();
      publication = this.data();
      return PAA.Publication.removeContentItem(publication._id, contentItem.index);
    }
  }
  ;
  Publication.register(Publication.id());
  Parent = Publication;
  Publication.ReferenceId = function () {
    class ReferenceId extends AM.DataInputComponent {
      constructor() {
        super(...arguments);
        this.realtime = false;
      }
      load() {
        var ref;
        return (ref = this.data()) != null ? ref.referenceId : void 0;
      }
      save(value) {
        var publicationId;
        publicationId = this.data()._id;
        return PAA.Publication.update(publicationId, {
          "referenceId": value
        });
      }
    }
    ;
    ReferenceId.register('PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.ReferenceId');
    return ReferenceId;
  }.call(this);
  Publication.PartSelect = class PartSelect extends AM.DataInputComponent {
    constructor() {
      super(...arguments);
      this.type = AM.DataInputComponent.Types.Select;
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.publicationComponent = this.ancestorComponentOfType(PAA.Publication.Pages.Admin.Publications.Publication);
    }
    options() {
      var i, len, part, parts, results;
      parts = PAA.Publication.Part.documents.fetch({}, {
        sort: {
          referenceId: 1
        }
      });
      results = [];
      for (i = 0, len = parts.length; i < len; i++) {
        part = parts[i];
        results.push({
          name: part.referenceId,
          value: part._id
        });
      }
      return results;
    }
  };
  Publication.MainPart = class MainPart extends Publication.PartSelect {
    static partPropertyName() {
      throw new AE.NotImplementedException("Main part selection needs to provide the property name.");
    }
    static removePartFunctionName() {
      throw new AE.NotImplementedException("Main part selection needs to provide the function name for removing the property.");
    }
    options() {
      var options;
      options = super.options(...arguments);
      options.unshift({
        name: '',
        value: null
      });
      return options;
    }
    load() {
      var ref, ref1;
      return (ref = this.data()) != null ? (ref1 = ref[this.constructor.partPropertyName()]) != null ? ref1._id : void 0 : void 0;
    }
    save(value) {
      var publicationId;
      publicationId = this.data()._id;
      if (value) {
        return PAA.Publication.update(publicationId, {
          ["".concat(this.constructor.partPropertyName(), "._id")]: value
        });
      } else {
        return PAA.Publication[this.constructor.removePartFunctionName()](publicationId);
      }
    }
  };
  Publication.CoverPart = function () {
    class CoverPart extends Publication.MainPart {
      static partPropertyName() {
        return 'coverPart';
      }
      static removePartFunctionName() {
        return 'removeCover';
      }
    }
    ;
    CoverPart.register("PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.CoverPart");
    return CoverPart;
  }.call(this);
  Publication.TableOfContentsPart = function () {
    class TableOfContentsPart extends Publication.MainPart {
      static partPropertyName() {
        return 'tableOfContentsPart';
      }
      static removePartFunctionName() {
        return 'removeTableOfContents';
      }
    }
    ;
    TableOfContentsPart.register("PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.TableOfContentsPart");
    return TableOfContentsPart;
  }.call(this);
  Publication.Design = function () {
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
          return (ref = this.data()) != null ? (ref1 = ref.design) != null ? (ref2 = ref1.size) != null ? ref2[this.property] : void 0 : void 0 : void 0;
        }
        save(value) {
          var publicationId;
          publicationId = this.data()._id;
          return PAA.Publication.update(publicationId, {
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
        Width.register('PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Design.Size.Width');
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
        Height.register('PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Design.Size.Height');
        return Height;
      }.call(this);
      Size.OffsetWidth = function () {
        class OffsetWidth extends Size.Property {
          constructor() {
            super(...arguments);
            this.property = 'offsetWidth';
          }
        }
        ;
        OffsetWidth.register('PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Design.Size.OffsetWidth');
        return OffsetWidth;
      }.call(this);
      return Size;
    }.call(this);
    Design.SpreadPagesCount = function () {
      class SpreadPagesCount extends AM.DataInputComponent {
        constructor() {
          super(...arguments);
          this.type = AM.DataInputComponent.Types.Number;
          this.realtime = false;
          this.customAttributes = {
            min: 1
          };
        }
        load() {
          var ref, ref1;
          return (ref = this.data()) != null ? (ref1 = ref.design) != null ? ref1.spreadPagesCount : void 0 : void 0;
        }
        save(value) {
          var publicationId;
          publicationId = this.data()._id;
          return PAA.Publication.update(publicationId, {
            "design.spreadPagesCount": value
          });
        }
      }
      ;
      SpreadPagesCount.register('PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Design.SpreadPagesCount');
      return SpreadPagesCount;
    }.call(this);
    Design.Class = function () {
      class Class extends AM.DataInputComponent {
        constructor() {
          super(...arguments);
          this.realtime = false;
        }
        load() {
          var ref, ref1;
          return (ref = this.data()) != null ? (ref1 = ref.design) != null ? ref1.class : void 0 : void 0;
        }
        save(value) {
          var publicationId;
          publicationId = this.data()._id;
          return PAA.Publication.update(publicationId, {
            "design.class": value
          });
        }
      }
      ;
      Class.register('PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Design.Class');
      return Class;
    }.call(this);
    Design.Part = function () {
      class Part extends Parent.PartSelect {
        load() {
          var contentItem;
          contentItem = this.data();
          return contentItem.part._id;
        }
        save(value) {
          var contentItem, publication;
          contentItem = this.data();
          publication = this.publicationComponent.data();
          return PAA.Publication.updateContentItem(publication._id, contentItem.index, {
            'part._id': value
          });
        }
      }
      ;
      Part.register("PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Part");
      return Part;
    }.call(this);
    Design.NewContentItemPart = function () {
      class NewContentItemPart extends Parent.PartSelect {
        options() {
          var contentItem, contents, existingPartIds, options;
          options = super.options(...arguments);
          contents = this.publicationComponent.data().contents;
          existingPartIds = function () {
            var i, len, results;
            results = [];
            for (i = 0, len = contents.length; i < len; i++) {
              contentItem = contents[i];
              results.push(contentItem.part._id);
            }
            return results;
          }();
          return _.filter(options, option => {
            var ref;
            return ref = option.value, indexOf.call(existingPartIds, ref) < 0;
          });
        }
        load() {
          return null;
        }
        save(value) {} // Empty since we only use this component for part selection.
      }
      ;
      NewContentItemPart.register("PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.NewContentItemPart");
      return NewContentItemPart;
    }.call(this);
    return Design;
  }.call(this);
  return Publication;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.publication.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/publications/template.publication.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Pages.Admin.Publications.Publication");
Template["PixelArtAcademy.Publication.Pages.Admin.Publications.Publication"] = new Template("Template.PixelArtAcademy.Publication.Pages.Admin.Publications.Publication", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-publication-pages-admin-publications-publication"
  }, "\n    ", HTML.H2(Blaze.View("lookup:referenceId", function() {
    return Spacebars.mustache(view.lookup("referenceId"));
  })), "\n    ", HTML.LABEL({
    class: "reference-id"
  }, "Reference ID: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "ReferenceId"));
  })), "\n    ", HTML.LABEL({
    class: "cover-part"
  }, "Cover: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "CoverPart"));
  })), "\n    ", HTML.LABEL({
    class: "table-of-contents-part"
  }, "Table of contents: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "TableOfContentsPart"));
  })), "\n    ", HTML.DIV({
    class: "design section"
  }, "Design:\n      ", HTML.DIV({
    class: "size"
  }, "Size:\n        ", HTML.LABEL({
    class: "width"
  }, "Width: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "Design", "Size", "Width"));
  }), "px (≤ 300)"), "\n        ", HTML.LABEL({
    class: "height"
  }, "Height: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "Design", "Size", "Height"));
  }), "px"), "\n        ", HTML.LABEL({
    class: "width"
  }, "Offset width: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "Design", "Size", "OffsetWidth"));
  }), "px"), "\n      "), "\n      ", HTML.LABEL({
    class: "spread-pages-count"
  }, "Pages per spread: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "Design", "SpreadPagesCount"));
  })), "\n      ", HTML.LABEL({
    class: "class"
  }, "Class: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "Design", "Class"));
  })), "\n      ", HTML.DIV({
    class: "header"
  }, "\n        Header: ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "Header"));
  }), "\n      "), "\n    "), "\n    ", HTML.DIV({
    class: "contents section"
  }, "Contents:\n      ", HTML.OL({
    class: "content-items"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("contentItems"));
  }, function() {
    return [ "\n          ", HTML.LI({
      class: "content-item"
    }, "\n            ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "Part"));
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
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Publication", "Pages", "Admin", "Publications", "Publication", "NewContentItemPart"));
  }), HTML.Raw('\n        <button class="add-content-item-button">添加</button>\n      ')), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"header-client":{"header.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/publications/header-client/header.coffee                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AE, AM, LOI, PAA, Quill;
AB = Artificial.Babel;
AE = Artificial.Everywhere;
AM = Artificial.Mirage;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
Quill = AM.Quill;
PAA.Publication.Pages.Admin.Publications.Publication.Header = function () {
  class Header extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Header';
    }
    static version() {
      return '0.1.0';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.publicationComponent = this.ancestorComponentOfType(PAA.Publication.Pages.Admin.Publications.Publication);
      this.quill = new AE.ReactiveWrapper(null);
      this.header = new ComputedField(() => {
        var ref;
        return ((ref = this.publicationComponent.data().design) != null ? ref.header : void 0) || [];
      });
      return this.displayScale = 2;
    }
    onRendered() {
      var quill;
      super.onRendered(...arguments);
      // Initialize quill.
      quill = new Quill(this.$('.pixelartacademy-publication-header')[0], {
        theme: 'snow',
        formats: PAA.Publication.Header.quillFormats,
        modules: {
          toolbar: {
            container: [['bold', 'italic'], ['clean']]
          }
        }
      });
      this.quill(quill);
      quill.on('text-change', (delta, oldDelta, source) => {
        var publication;
        if (this.constructor.debug) {
          console.log("Text change", delta, oldDelta, source);
        }
        // Update the header if this was a user update.
        if (source === Quill.sources.USER) {
          publication = this.publicationComponent.data();
          return PAA.Publication.updateHeader(publication._id, delta.ops);
        }
      });
      quill.on('editor-change', () => {
        // Trigger reactive updates.
        return this.quill.updated();
      });

      // Update quill content.
      return this.autorun(computation => {
        var currentHeader, header;
        if (!(header = this.header())) {
          return;
        }
        // See if we already have the correct content.
        currentHeader = quill.getContents().ops;
        if (this.constructor.debug) {
          console.log("Updating header from database", header, currentHeader);
        }
        if (EJSON.equals(header, currentHeader)) {
          if (this.constructor.debug) {
            console.log("Current content matches.");
          }
          return;
        }
        if (this.constructor.debug) {
          console.log("Updating content.");
        }
        // The content is new, update.
        return quill.setContents(header, Quill.sources.API);
      });
    }
    focus() {
      return this.quill().focus();
    }
  }
  ;
  Header.register(Header.id());
  Header.debug = false;
  return Header;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.header.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-publication/pages/admin/publications/header-client/template.header.js           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Header");
Template["PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Header"] = new Template("Template.PixelArtAcademy.Publication.Pages.Admin.Publications.Publication.Header", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-publication-pages-admin-publications-publication-header">\n    <div class="publication">\n      <div class="running-header">\n        <div class="pixelartacademy-publication-header"></div>\n      </div>\n    </div>\n  </div>\n  <link rel="stylesheet" type="text/css" href="/artificial/mirage/quill/dist/quill.snow.css">');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},"node_modules":{"quill-delta":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/quill-delta/package.json                    //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/quill-delta/dist/Delta.js                   //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/quill-delta/dist/AttributeMap.js            //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/quill-delta/dist/Op.js                      //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/quill-delta/dist/OpIterator.js              //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/fast-diff/package.json                      //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/fast-diff/diff.js                           //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/lodash.clonedeep/package.json               //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/lodash.clonedeep/index.js                   //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/lodash.isequal/package.json                 //
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
// node_modules/meteor/retronator_pixelartacademy-publication/node_modules/lodash.isequal/index.js                     //
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

require("/node_modules/meteor/retronator:pixelartacademy-publication/publication.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/methods.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/subscriptions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/location.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/header.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/part/part.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/part/methods.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/part/subscriptions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/part/location.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/component/component.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/component/template.component.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/component/article-client/article.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/component/article-client/template.article.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/component/header-client/header.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/component/header-client/template.header.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/article.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/header/header.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/customclass/customclass.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/tableofcontents/tableofcontents.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/tableofcontents/template.tableofcontents.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/figure/figure.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/figure/template.figure.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/figure/image/image.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/article/blots-client/figure/image/template.image.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/pages.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/admin.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/template.admin.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/parts/parts.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/parts/template.parts.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/parts/part.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/parts/template.part.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/parts/article-client/article.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/parts/article-client/template.article.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/publications/publications.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/publications/template.publications.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/publications/publication.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/publications/template.publication.js");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/publications/header-client/header.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-publication/pages/admin/publications/header-client/template.header.js");

/* Exports */
Package._define("retronator:pixelartacademy-publication", {
  PixelArtAcademy: PixelArtAcademy
});

})();
