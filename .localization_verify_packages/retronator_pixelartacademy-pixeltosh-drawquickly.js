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
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"retronator:pixelartacademy-pixeltosh-drawquickly":{"drawquickly.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/drawquickly.coffee                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AB, AEc, AM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
AB = Artificial.Base;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
PAA.Pixeltosh.Programs.DrawQuickly = function () {
  class DrawQuickly extends PAA.Pixeltosh.Program {
    // symbolicDrawing: results of symbolic drawing mode
    //   bestScores: object with scores by difficulty
    //     {easy, medium, hard}: object with scores by speed
    //       {slow, medium, fast}: number of drawn things in time
    // realisticDrawing: results of realistic drawing mode
    //   things: an object of drawn things
    //     {thing}: name of the thing
    //       durations: array of results for the 3 durations
    //         drawingId: the ID of the drawing made for this duration
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly';
    }
    static version() {
      return '0.1.0';
    }
    static fullName() {
      return "快速绘画";
    }
    static description() {
      return "Pixeltosh的绘画游戏。";
    }
    static slug() {
      return 'drawquickly';
    }
    constructor() {
      super(...arguments);
      this._loadSoundsAutorun = Tracker.autorun(computation => {
        var audioOutputNode, context;
        if (!(context = LOI.adventure.audioManager.context())) {
          return;
        }
        audioOutputNode = AEc.Node.Mixer.getOutputNodeForName('location', context);
        this.timerSecondsSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/drawquickly/timer-seconds.wav', LOI.adventure.audioManager, audioOutputNode);
        this.timerEndSound = new AEc.Sound('/pixelartacademy/pixeltosh/programs/drawquickly/timer-end.wav', LOI.adventure.audioManager, audioOutputNode);
        return computation.stop();
      });
    }
    destroy() {
      var ref, ref1;
      this._loadSoundsAutorun.stop();
      if ((ref = this.timerSecondsSound) != null) {
        ref.destroy();
      }
      return (ref1 = this.timerEndSound) != null ? ref1.destroy() : void 0;
    }
    async load() {
      var classifier, classifierName, ref;
      super.load(...arguments);
      this.gameMode = this.constructor.GameModes.RealisticDrawing;
      this.symbolicDrawing = new this.constructor.SymbolicDrawing(this);
      this.realisticDrawing = new this.constructor.RealisticDrawing(this);
      this.windowId = this.os.addWindow(this.constructor.Interface.createInterfaceData());
      this.classifiers = {
        symbolic: new PAA.ImageClassification.SimpleClassifier.Symbolic(),
        realistic: new PAA.ImageClassification.SimpleClassifier.Realistic()
      };
      ref = this.classifiers;
      for (classifierName in ref) {
        classifier = ref[classifierName];
        await classifier.createInferenceSession();
      }
      this.app = this.os.ancestorComponentOfType(Artificial.Base.App);
      return this.app.addComponent(this);
    }
    unload() {
      super.unload(...arguments);
      this.app.removeComponent(this);
      this.symbolicDrawing.destroy();
      return this.realisticDrawing.destroy();
    }
    setGameMode(gameMode) {
      this.gameMode = gameMode;
    }
    menuItems() {
      return this.constructor.Interface.createMenuItems();
    }
    onBackButton() {
      var game;
      game = this.os.interface.getView(DrawQuickly.Interface.Game);
      return game.onBackButton();
    }
    playTimerSeconds() {
      return this.timerSecondsSound.play({
        volume: this.constructor.maxVolume
      });
    }
    playTimerEnd() {
      return this.timerEndSound.play({
        volume: this.constructor.maxVolume
      });
    }
    update(gameTime) {
      this.symbolicDrawing.update(gameTime);
      return this.realisticDrawing.update(gameTime);
    }
  }
  ;
  DrawQuickly.register(DrawQuickly.id());
  DrawQuickly.initialize();
  DrawQuickly.GameModes = {
    SymbolicDrawing: 'SymbolicDrawing',
    RealisticDrawing: 'RealisticDrawing'
  };
  DrawQuickly.maxVolume = 0.15;
  return DrawQuickly;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"drawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/drawing.coffee                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, AM, DrawQuickly, PAA;
AE = Artificial.Everywhere;
AM = Artificial.Mummification;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Drawing = function () {
  class Drawing extends AM.Document {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Drawing';
    }
    static save(strokes) {
      return this.documents.insert({
        profileId: LOI.adventure.profileId(),
        lastEditTime: new Date(),
        strokes: strokes
      });
    }
  }
  ;

  // profileId: the profile that completed the task
  // lastEditTime: the time when task was completed
  // strokes: array the strokes the player has drawn for this duration
  //   []: an array of coordinates in this stroke
  //     x, y: coordinates in the 100x100 source image
  Drawing.Meta({
    name: Drawing.id()
  });
  Drawing.enablePersistence();
  return Drawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"symbolicdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/symbolicdrawing.coffee                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE,
  DrawQuickly,
  PAA,
  indexOf = [].indexOf;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.SymbolicDrawing = function () {
  class SymbolicDrawing {
    static getBestScoreForDifficultyAndSpeed(difficulty, speed) {
      var ref, ref1, symbolicDrawingData;
      symbolicDrawingData = DrawQuickly.state('symbolicDrawing');
      return (symbolicDrawingData != null ? (ref = symbolicDrawingData.bestScores) != null ? (ref1 = ref[difficulty]) != null ? ref1[speed] : void 0 : void 0 : void 0) || 0;
    }
    static getBestScoreForDifficulty(difficulty) {
      var i, len, ref, score, speed;
      ref = ['fast', 'medium', 'slow'];
      for (i = 0, len = ref.length; i < len; i++) {
        speed = ref[i];
        if (score = this.getBestScoreForDifficultyAndSpeed(difficulty, speed)) {
          return {
            speed,
            score
          };
        }
      }
      return null;
    }
    static getBestScore() {
      var bestScore, difficulty, i, len, ref;
      ref = ['hard', 'medium', 'easy'];
      for (i = 0, len = ref.length; i < len; i++) {
        difficulty = ref[i];
        if (bestScore = this.getBestScoreForDifficulty(difficulty)) {
          if (bestScore.score) {
            bestScore.difficulty = difficulty;
            return bestScore;
          }
        }
      }
      return null;
    }
    static localizedThing(thing) {
      return {
        "alarm clock": "闹钟",
        "airplane": "飞机",
        "ant": "蚂蚁",
        "apple": "苹果",
        "axe": "斧头",
        "banana": "香蕉",
        "bat": "蝙蝠",
        "bear": "熊",
        "bee": "蜜蜂",
        "bench": "长椅",
        "bicycle": "自行车",
        "bottle": "瓶子",
        "bread": "面包",
        "butterfly": "蝴蝶",
        "camel": "骆驼",
        "candle": "蜡烛",
        "cannon": "大炮",
        "car": "汽车",
        "castle": "城堡",
        "cat": "猫",
        "chair": "椅子",
        "church": "教堂",
        "couch": "沙发",
        "cow": "奶牛",
        "crab": "螃蟹",
        "cup": "杯子",
        "dog": "狗",
        "dolphin": "海豚",
        "door": "门",
        "duck": "鸭子",
        "elephant": "大象",
        "eyeglasses": "眼镜",
        "fan": "风扇",
        "fish": "鱼",
        "flower": "花",
        "frog": "青蛙",
        "giraffe": "长颈鹿",
        "guitar": "吉他",
        "hamburger": "汉堡",
        "hammer": "锤子",
        "harp": "竖琴",
        "hat": "帽子",
        "hedgehog": "刺猬",
        "helicopter": "直升机",
        "horse": "马",
        "hot air balloon": "热气球",
        "hourglass": "沙漏",
        "kangaroo": "袋鼠",
        "knife": "刀",
        "lion": "狮子",
        "lobster": "龙虾",
        "mouse": "老鼠",
        "mushroom": "蘑菇",
        "owl": "猫头鹰",
        "parrot": "鹦鹉",
        "pear": "梨",
        "penguin": "企鹅",
        "piano": "钢琴",
        "pickup truck": "皮卡",
        "pig": "猪",
        "pineapple": "菠萝",
        "pizza": "披萨",
        "rabbit": "兔子",
        "raccoon": "浣熊",
        "rhinoceros": "犀牛",
        "rifle": "步枪",
        "sailboat": "帆船",
        "saw": "锯子",
        "saxophone": "萨克斯管",
        "scissors": "剪刀",
        "scorpion": "蝎子",
        "shark": "鲨鱼",
        "sheep": "绵羊",
        "shoe": "鞋",
        "skyscraper": "摩天楼",
        "snail": "蜗牛",
        "snake": "蛇",
        "spider": "蜘蛛",
        "spoon": "勺子",
        "squirrel": "松鼠",
        "strawberry": "草莓",
        "swan": "天鹅",
        "sword": "剑",
        "table": "桌子",
        "teapot": "茶壶",
        "teddy bear": "泰迪熊",
        "tiger": "老虎",
        "tree": "树",
        "trumpet": "小号",
        "turtle": "乌龟",
        "umbrella": "雨伞",
        "violin": "小提琴",
        "windmill": "风车",
        "zebra": "斑马"
      }[thing] || thing;
    }
    constructor(drawQuickly) {
      this.drawQuickly = drawQuickly;
      this.canvasText = new ReactiveField("");
      this.pixeltoshClass = new ReactiveField('');
      this.guessesText = new ReactiveField("");
      this.timer = new ReactiveField(null);
      this.canvas = new ReactiveField(null);
      this.thingsToDraw = new ReactiveField([]);
      this.thingsDrawn = new ReactiveField([]);
      this.thingsLeftToDraw = new AE.LiveComputedField(() => {
        return _.difference(this.thingsToDraw(), this.thingsDrawn());
      });

      // Set default values.
      this.difficulty = this.constructor.DifficultyProperties.Easy;
      this.speed = this.constructor.SpeedProperties.Slow;
      this.time = 0;
    }
    destroy() {
      this.stop();
      return this.thingsLeftToDraw.stop();
    }
    stop() {
      var ref, ref1;
      if ((ref = this._endTimerAutorun) != null) {
        ref.stop();
      }
      return (ref1 = this._evaluateAutorun) != null ? ref1.stop() : void 0;
    }
    setDifficulty(difficulty1) {
      this.difficulty = difficulty1;
      return this._setTime();
    }
    setSpeed(speed1) {
      this.speed = speed1;
      return this._setTime();
    }
    _setTime() {
      return this.time = this.constructor.timePerDifficulty[this.difficulty][this.speed];
    }
    reset() {
      this.stop();
      this.canvasText("");
      this.pixeltoshClass('');
      this.guessesText("");
      this.timer(null);
      this.canvas(null);
      this.thingsToDraw([]);
      return this.thingsDrawn([]);
    }
    start() {
      var canvas, difficultyFactor, timer;
      timer = new DrawQuickly.Timer(this.drawQuickly, this.time);
      timer.start();
      this.timer(timer);
      canvas = this.drawQuickly.os.interface.allChildComponentsOfType(DrawQuickly.Interface.Game.Draw.Canvas)[0];
      this.canvas(canvas);

      // End game when the timer runs out.
      this._endTimerAutorun = this.drawQuickly.autorun(computation => {
        if (timer.running()) {
          return;
        }
        if (timer.time()) {
          return;
        }
        computation.stop();
        canvas.endDrawing();
        this.canvasText("游戏结束");
        return this.end();
      });

      // Choose things to draw.
      difficultyFactor = this.constructor.difficultyFactors[this.difficulty];
      this.thingsToDraw(this._chooseThingsToDraw(this.constructor.thingsByDifficulty[this.difficulty]));
      this.drawings = {};

      // Evaluate what is drawn.
      return this._evaluateAutorun = this.drawQuickly.autorun(computation => {
        var inputData;
        if (!(inputData = canvas.classificationInputData())) {
          this.pixeltoshClass('');
          this.guessesText("");
          return;
        }
        return Tracker.nonreactive(async () => {
          var candidate, candidates, classificationPromises, classifier, classifierResult, classifierResults, classifierType, combinedLabelProbabilities, combinedLabelProbability, foundLabel, guess, guessStyle, guessTexts, i, j, k, l, label, labelProbabilities, labelProbability, len, len1, len2, len3, len4, m, possibleThingFactor, ref, ref1, ref2, ref3, requiredProbability, strokes, strokesCount, thingsLeftToDraw, top3Guesses;
          classificationPromises = function () {
            var ref, results;
            ref = this.drawQuickly.classifiers;
            results = [];
            for (classifierType in ref) {
              classifier = ref[classifierType];
              results.push(((classifierType, classifier) => {
                return new Promise(async (resolve, reject) => {
                  var labelProbabilities;
                  labelProbabilities = await classifier.classify(inputData);
                  return resolve({
                    classifierType,
                    labelProbabilities
                  });
                });
              })(classifierType, classifier));
            }
            return results;
          }.call(this);
          classifierResults = await Promise.all(classificationPromises);

          // Add together the results from all classifiers.
          combinedLabelProbabilities = {};
          ref = PAA.ImageClassification.SimpleClassifier.labels;
          for (i = 0, len = ref.length; i < len; i++) {
            label = ref[i];
            combinedLabelProbabilities[label] = {
              label: label
            };
          }
          for (j = 0, len1 = classifierResults.length; j < len1; j++) {
            classifierResult = classifierResults[j];
            ref1 = classifierResult.labelProbabilities;
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              labelProbability = ref1[k];
              combinedLabelProbability = combinedLabelProbabilities[labelProbability.label];
              combinedLabelProbability[classifierResult.classifierType] = labelProbability.probability;
            }
          }
          labelProbabilities = _.values(combinedLabelProbabilities);
          thingsLeftToDraw = this.thingsLeftToDraw();
          strokesCount = canvas.strokes().length;

          // possibleThingFactor = 1.25 + 0.25 * (1 - thingsLeftToDraw.length / 10) * difficultyFactor
          possibleThingFactor = 1 + (0.5 - 1 / (strokesCount / 2 + 1.5)) * difficultyFactor;
          for (l = 0, len3 = labelProbabilities.length; l < len3; l++) {
            labelProbability = labelProbabilities[l];
            labelProbability.easyProbability = Math.max(labelProbability.symbolic, labelProbability.realistic);
            labelProbability.hardProbability = labelProbability.symbolic + labelProbability.realistic;
            if (ref2 = labelProbability.label, indexOf.call(thingsLeftToDraw, ref2) >= 0) {
              labelProbability.hardProbability *= possibleThingFactor;
            }
            labelProbability.probability = THREE.MathUtils.lerp(labelProbability.easyProbability, labelProbability.hardProbability, difficultyFactor);
          }
          labelProbabilities.sort((a, b) => {
            return b.probability - a.probability;
          });
          top3Guesses = _.filter(labelProbabilities.slice(0, 3), labelProbability => {
            return labelProbability.probability > 0.01;
          });
          guessTexts = function () {
            var len4, m, results;
            results = [];
            for (m = 0, len4 = top3Guesses.length; m < len4; m++) {
              guess = top3Guesses[m];
              guessStyle = function () {
                switch (false) {
                  case !(guess.probability > 0.5):
                    return '?';
                  case !(guess.probability > 0.1):
                    return '??';
                  default:
                    return '???';
                }
              }();
              if (this.constructor.debug) {
                results.push("".concat(guess.label).concat(guessStyle, " ").concat(Math.round(guess.probability * 100), "% s:").concat(Math.round(guess.symbolic * 100), "% r:").concat(Math.round(guess.realistic * 100), "%"));
              } else {
                results.push("".concat(this.constructor.localizedThing(guess.label)).concat(guessStyle));
              }
            }
            return results;
          }.call(this);
          this.guessesText(guessTexts.join('<br/>'));
          this.pixeltoshClass('thinking');
          requiredProbability = THREE.MathUtils.lerp(0.95, 1, difficultyFactor);
          candidates = _.filter(labelProbabilities.slice(0, 3), labelProbability => {
            return labelProbability.probability > requiredProbability;
          });
          if (!candidates.length) {
            return;
          }
          foundLabel = null;
          for (m = 0, len4 = candidates.length; m < len4; m++) {
            candidate = candidates[m];
            if (ref3 = candidate.label, indexOf.call(thingsLeftToDraw, ref3) >= 0) {
              foundLabel = candidate.label;
              break;
            }
          }
          if (!foundLabel) {
            return;
          }
          if (!this.constructor.debug) {
            this.guessesText('');
          }
          this.pixeltoshClass('got-it');
          strokes = canvas.getPlainStrokes();
          this._addDrawnThing(foundLabel, strokes);
          this.canvasText("".concat(this.constructor.localizedThing(foundLabel), "!"));
          return Meteor.setTimeout(() => {
            this.canvasText("");
            return canvas.clear();
          }, this.constructor.debug ? 3000 : 500);
        });
      });
    }
    end() {
      var base, name, score, symbolicDrawingData;
      this.stop();
      this.timer().stop();
      score = this.thingsDrawn().length;
      symbolicDrawingData = this.drawQuickly.state('symbolicDrawing');
      if (symbolicDrawingData == null) {
        symbolicDrawingData = {
          bestScores: {}
        };
      }
      if ((base = symbolicDrawingData.bestScores)[name = this.difficulty] == null) {
        base[name] = {};
      }
      symbolicDrawingData.bestScores[this.difficulty][this.speed] = Math.max(score, symbolicDrawingData.bestScores[this.difficulty][this.speed] || 0);
      this.drawQuickly.state('symbolicDrawing', symbolicDrawingData);
      return Meteor.setTimeout(() => {
        var gameView;
        if (!(gameView = this.drawQuickly.os.interface.getView(DrawQuickly.Interface.Game))) {
          return;
        }
        return gameView.showResults();
      }, 500);
    }
    _chooseThingsToDraw(allThingsToDraw) {
      var tenThings;
      tenThings = _.shuffle(allThingsToDraw).slice(0, 10);
      tenThings.sort();
      return tenThings;
    }
    _addDrawnThing(thing, strokes) {
      var thingsDrawn;
      thingsDrawn = this.thingsDrawn();
      thingsDrawn.push(thing);
      this.thingsDrawn(thingsDrawn);
      this.drawings[thing] = strokes;
      if (thingsDrawn.length === 10) {
        return this.end();
      }
    }
    update(gameTime) {
      var timer;
      if (!(timer = this.timer())) {
        return;
      }
      return timer.update(gameTime);
    }
  }
  ;
  SymbolicDrawing.debug = false;
  SymbolicDrawing.DifficultyProperties = {
    Easy: 'easy',
    Medium: 'medium',
    Hard: 'hard'
  };
  SymbolicDrawing.SpeedProperties = {
    Slow: 'slow',
    Medium: 'medium',
    Fast: 'fast'
  };
  SymbolicDrawing.difficultyFactors = {
    easy: 0,
    medium: 0.2,
    hard: 1
  };
  SymbolicDrawing.timePerDifficulty = {
    easy: {
      slow: 90,
      medium: 60,
      fast: 30
    },
    medium: {
      slow: 135,
      medium: 90,
      fast: 45
    },
    hard: {
      slow: 180,
      medium: 120,
      fast: 60
    }
  };
  return SymbolicDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"symbolicdrawing-things.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/symbolicdrawing-things.coffee                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var DrawQuickly, PAA;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.SymbolicDrawing.thingsByDifficulty = {
  easy: ["apple", "banana", "chair", "door", "hot air balloon", "pear", "fish", "sailboat", "spoon", "sword", "umbrella", "candle", "cup", "eyeglasses", "flower", "hat", "knife", "mushroom", "spider", "scissors", "table", "tree", "bottle", "butterfly", "axe", "car", "skyscraper"],
  medium: ["airplane", "hamburger", "harp", "hourglass", "alarm clock", "bench", "bread", "fan", "piano", "pickup truck", "pineapple", "pizza", "rifle", "snake", "shoe", "snail", "sheep", "teapot", "teddy bear", "bicycle", "church", "couch", "saw", "strawberry", "trumpet", "windmill", "cannon", "rabbit", "mouse", "bee", "saxophone", "hammer"],
  hard: ["ant", "bat", "bear", "camel", "castle", "cat", "cow", "crab", "dog", "dolphin", "duck", "elephant", "frog", "giraffe", "guitar", "hedgehog", "helicopter", "horse", "kangaroo", "lion", "lobster", "owl", "parrot", "penguin", "pig", "raccoon", "rhinoceros", "scorpion", "turtle", "shark", "squirrel", "swan", "tiger", "violin", "zebra"]
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"realisticdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/realisticdrawing.coffee                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, DrawQuickly, PAA;
AE = Artificial.Everywhere;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.RealisticDrawing = function () {
  class RealisticDrawing {
    static getDrawnThings() {
      var realisticDrawingData, things;
      if (!(realisticDrawingData = DrawQuickly.state('realisticDrawing'))) {
        return [];
      }
      if (!(things = realisticDrawingData.things)) {
        return [];
      }
      return _.keys(things);
    }
    static getDrawnThingsForComplexity(complexity) {
      var allThings, drawnThings;
      drawnThings = this.getDrawnThings();
      allThings = this.thingsByComplexity[complexity];
      return _.intersection(drawnThings, allThings);
    }
    constructor(drawQuickly) {
      this.drawQuickly = drawQuickly;
      this.canvasText = new ReactiveField("");
      this.timer = new ReactiveField(null);
      this.canvas = new ReactiveField(null);
      this.durationIndex = new ReactiveField(0);
      this.complexity = this.constructor.ComplexityProperties.Simple;
      this.thingToDraw = '';
    }
    destroy() {
      return this.stop();
    }
    stop() {
      var ref, ref1;
      if ((ref = this._startTimerAutorun) != null) {
        ref.stop();
      }
      return (ref1 = this._endTimerAutorun) != null ? ref1.stop() : void 0;
    }
    setComplexity(complexity1) {
      this.complexity = complexity1;
    }
    setThingToDraw(thingToDraw) {
      this.thingToDraw = thingToDraw;
    }
    start() {
      this.canvas(this.drawQuickly.os.interface.allChildComponentsOfType(DrawQuickly.Interface.Game.Draw.Canvas)[0]);
      this.durationIndex(0);
      return this.startDuration();
    }
    startDuration() {
      var canvas, duration, durationIndex, timer;
      this.canvasText("");
      durationIndex = this.durationIndex();
      duration = this.constructor.durationsPerComplexity[this.complexity][durationIndex];
      timer = new DrawQuickly.Timer(this.drawQuickly, duration);
      this.timer(timer);
      canvas = this.canvas();
      canvas.reset();

      // Start timer when the player starts drawing.
      this._startTimerAutorun = this.drawQuickly.autorun(computation => {
        if (!canvas.drawingStarted()) {
          return;
        }
        computation.stop();
        return timer.start();
      });

      // End duration when the timer runs out.
      return this._endTimerAutorun = this.drawQuickly.autorun(computation => {
        if (timer.running()) {
          return;
        }
        if (timer.time()) {
          return;
        }
        computation.stop();
        this.canvas().endDrawing();
        this.canvasText("时间到！");
        return this.endDuration();
      });
    }
    endDuration() {
      var base, drawingId, durationIndex, name, realisticDrawingData;
      this.stop();
      drawingId = DrawQuickly.Drawing.save(this.canvas().getPlainStrokes());
      durationIndex = this.durationIndex();
      realisticDrawingData = this.drawQuickly.state('realisticDrawing');
      if (realisticDrawingData == null) {
        realisticDrawingData = {
          things: {}
        };
      }
      if ((base = realisticDrawingData.things)[name = this.thingToDraw] == null) {
        base[name] = {
          durations: []
        };
      }
      realisticDrawingData.things[this.thingToDraw].durations[durationIndex] = {
        drawingId
      };
      this.drawQuickly.state('realisticDrawing', realisticDrawingData);
      return Meteor.setTimeout(() => {
        var gameView;
        // Move forward.
        durationIndex++;
        if (durationIndex === this.constructor.durationsPerComplexity[this.complexity].length) {
          if (!(gameView = this.drawQuickly.os.interface.getView(DrawQuickly.Interface.Game))) {
            return;
          }
          return gameView.showResults();
        } else {
          // Switch to the next duration.
          this.durationIndex(durationIndex);
          return this.startDuration();
        }
      }, 2000);
    }
    update(gameTime) {
      var timer;
      if (!(timer = this.timer())) {
        return;
      }
      return timer.update(gameTime);
    }
  }
  ;
  RealisticDrawing.debug = false;
  RealisticDrawing.ComplexityProperties = {
    Simple: 'simple',
    Medium: 'medium',
    Complex: 'complex'
  };
  RealisticDrawing.durationsPerComplexity = {
    simple: [20, 10, 5],
    medium: [40, 20, 10],
    complex: [60, 30, 15]
  };
  return RealisticDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"realisticdrawing-things.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/realisticdrawing-things.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var DrawQuickly, PAA;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.RealisticDrawing.thingsByComplexity = {
  simple: ["apple", "axe", "banana", "bottle", "candle", "door", "dolphin", "eyeglasses", "hammer", "hat", "hot air balloon", "knife", "pear", "rifle", "saxophone", "saw", "scissors", "spoon", "sword", "strawberry"],
  medium: ["airplane", "bench", "bread", "couch", "cup", "dog", "fan", "flower", "guitar", "hamburger", "harp", "hedgehog", "helicopter", "mouse", "parrot", "pineapple", "pizza", "rhinoceros", "sailboat", "scorpion", "shark", "sheep", "shoe", "skyscraper", "snail", "snake", "spider", "swan", "table", "teapot", "tree", "trumpet", "turtle", "violin"],
  complex: ["alarm clock", "ant", "bat", "bear", "bee", "bicycle", "butterfly", "camel", "cannon", "car", "castle", "cat", "chair", "church", "cow", "crab", "duck", "elephant", "fish", "frog", "giraffe", "horse", "hourglass", "kangaroo", "lion", "lobster", "mushroom", "owl", "penguin", "piano", "pickup truck", "pig", "rabbit", "raccoon", "squirrel", "teddy bear", "tiger", "umbrella", "windmill", "zebra"]
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"timer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/timer.coffee                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Timer = class Timer {
  constructor(drawQuickly, time) {
    this.drawQuickly = drawQuickly;
    this.time = new ReactiveField(time);
    this.running = new ReactiveField(false);
  }
  start() {
    this.running(true);
    return this.nextBeepTime = 5;
  }
  stop() {
    return this.running(false);
  }
  update(appTime) {
    var time;
    if (!this.running()) {
      return;
    }
    time = this.time() - appTime.elapsedAppTime;
    if (time < 0) {
      time = 0;
      this.running(false);
      this.drawQuickly.playTimerEnd();
    } else if (time < this.nextBeepTime) {
      this.drawQuickly.playTimerSeconds();
      this.nextBeepTime = Math.floor(time);
    }
    return this.time(time);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/instructions.coffee                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AE, DrawQuickly, LOI, PAA;
AE = Artificial.Everywhere;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Instructions = function () {
  class Instructions {}
  ;
  Instructions.Instruction = class Instruction extends PAA.Pixeltosh.Instructions.Instruction {
    static getDrawQuickly() {
      var os, program;
      if (!(os = PAA.PixelPad.Apps.Pixeltosh.getOS())) {
        return;
      }
      program = os.activeProgram();
      if (!(program instanceof DrawQuickly)) {
        return;
      }
      return program;
    }
  };
  Instructions.RealisticModeTip = function () {
    class RealisticModeTip extends Instructions.Instruction {
      static id() {
        return "PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Instructions.RealisticModeTip";
      }
      static message() {
        return "尝试写实绘画模式来练习你不确定如何画的主题。";
      }
      static activeConditions() {
        var anyScore, bestScore, difficulty, difficultyProperty, drawQuickly, game, ref, ref1, ref2, ref3, score, speed, speedProperty, symbolicDrawingData;
        if (!(drawQuickly = this.getDrawQuickly())) {
          return;
        }

        // Show only on the splash screen.
        if (!(game = drawQuickly.os.interface.getView(DrawQuickly.Interface.Game))) {
          return;
        }
        if (game.currentScreen() !== DrawQuickly.Interface.Game.ScreenTypes.Splash) {
          return;
        }

        // Show when you don't have a score, but not a 10/10 on any of the symbolic difficulties.
        if (!(symbolicDrawingData = DrawQuickly.state('symbolicDrawing'))) {
          return;
        }
        ref = DrawQuickly.SymbolicDrawing.DifficultyProperties;
        for (difficulty in ref) {
          difficultyProperty = ref[difficulty];
          anyScore = false;
          bestScore = 0;
          ref1 = DrawQuickly.SymbolicDrawing.SpeedProperties;
          for (speed in ref1) {
            speedProperty = ref1[speed];
            score = (ref2 = symbolicDrawingData.bestScores) != null ? (ref3 = ref2[difficultyProperty]) != null ? ref3[speedProperty] : void 0 : void 0;
            if (score != null) {
              anyScore = true;
              bestScore = Math.max(bestScore, score);
            }
          }
          if (anyScore && bestScore < 10) {
            return true;
          }
        }
        return false;
      }
      faceClass() {
        return PAA.Pixeltosh.Instructions.FaceClasses.Smirk;
      }
      customClass() {
        return 'pixelartacademy-pixeltosh-programs-drawquickly-instructions';
      }
    }
    ;
    RealisticModeTip.initialize();
    return RealisticModeTip;
  }.call(this);
  return Instructions;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"interface":{"interface.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/interface.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, DrawQuickly, FM, PAA;
AC = Artificial.Control;
FM = FataMorgana;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface = class Interface {
  static createMenuItems() {
    return [{
      caption: '',
      items: [DrawQuickly.Interface.Actions.About.id()]
    }, {
      caption: '文件',
      items: [PAA.Pixeltosh.OS.Interface.Actions.Quit.id()]
    }, {
      caption: '游戏',
      items: [DrawQuickly.Interface.Actions.BackToSplash.id(), DrawQuickly.Interface.Actions.Restart.id()]
    }];
  }
  static createInterfaceData(documentFile) {
    return {
      type: PAA.Pixeltosh.Program.View.id(),
      programId: PAA.Pixeltosh.Programs.DrawQuickly.id(),
      top: 14,
      left: 0,
      right: 0,
      bottom: 0,
      contentArea: {
        type: DrawQuickly.Interface.Game.id()
      }
    };
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"actions":{"actions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/actions/actions.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var DrawQuickly, PAA;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Actions = class Actions {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/actions/about.coffee                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, DrawQuickly, FM, LOI, PAA;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Actions.About = function () {
  class About extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Actions.About";
    }
    static displayName() {
      return "关于快速绘画...";
    }
    execute() {
      return this.os.interface.displayDialog(DrawQuickly.Interface.About.createInterfaceData());
    }
  }
  ;
  About.initialize();
  return About;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"backtosplash.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/actions/backtosplash.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, DrawQuickly, FM, LOI, PAA;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Actions.BackToSplash = function () {
  class BackToSplash extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Actions.BackToSplash";
    }
    static displayName() {
      return "End";
    }
    enabled() {
      var game;
      game = this.interface.getView(DrawQuickly.Interface.Game);
      return game.currentScreen() === DrawQuickly.Interface.Game.ScreenTypes.Draw;
    }
    execute() {
      var game;
      game = this.interface.getView(DrawQuickly.Interface.Game);
      return game.backToSplash();
    }
  }
  ;
  BackToSplash.initialize();
  return BackToSplash;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"restart.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/actions/restart.coffee                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AC, AE, DrawQuickly, FM, LOI, PAA;
AE = Artificial.Everywhere;
AC = Artificial.Control;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Actions.Restart = function () {
  class Restart extends PAA.Pixeltosh.OS.Interface.Actions.Action {
    static id() {
      return "PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Actions.Restart";
    }
    static displayName() {
      return "Restart";
    }
    enabled() {
      var game, ref;
      game = this.interface.getView(DrawQuickly.Interface.Game);
      return (ref = game.currentScreen()) === DrawQuickly.Interface.Game.ScreenTypes.Draw || ref === DrawQuickly.Interface.Game.ScreenTypes.Results;
    }
    execute() {
      var game;
      game = this.interface.getView(DrawQuickly.Interface.Game);
      return game.showInstructions();
    }
  }
  ;
  Restart.initialize();
  return Restart;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"about":{"about.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/about/about.coffee                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.About = function () {
  class About extends FM.Dialog {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.About';
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
      return this.$('.pixelartacademy-pixeltosh-programs-drawquickly-interface-about').closest('.dialog-area').on('click', () => {
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
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/about/template.about.js                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.About");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.About"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.About", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixeltosh-programs-drawquickly-interface-about pixelartacademy-pixeltosh-os-interface-rectanglearea">\n    <p>Pixeltosh快速绘画，版本1.0</p>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"game":{"game.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/game.coffee                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game = function () {
  class Game extends LOI.View {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.interface.parent;
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.currentScreen = new ReactiveField(this.constructor.ScreenTypes.Splash);
    }
    onBackButton() {
      switch (this.currentScreen()) {
        case this.constructor.ScreenTypes.Mode:
          this.backToSplash();
          break;
        case this.constructor.ScreenTypes.Difficulty:
        case this.constructor.ScreenTypes.Complexity:
          this.chooseMode();
          break;
        case this.constructor.ScreenTypes.Speed:
          this.chooseDifficulty();
          break;
        case this.constructor.ScreenTypes.Thing:
          this.chooseComplexity();
          break;
        case this.constructor.ScreenTypes.Instructions:
        case this.constructor.ScreenTypes.Results:
          switch (this.drawQuickly.gameMode) {
            case DrawQuickly.GameModes.SymbolicDrawing:
              this.chooseSpeed();
              break;
            case DrawQuickly.GameModes.RealisticDrawing:
              this.chooseThing();
          }
          break;
        default:
          return;
      }

      // Inform that we've handled the back button.
      return true;
    }
    chooseMode() {
      return this.currentScreen(this.constructor.ScreenTypes.Mode);
    }
    chooseDifficulty() {
      return this.currentScreen(this.constructor.ScreenTypes.Difficulty);
    }
    chooseSpeed() {
      return this.currentScreen(this.constructor.ScreenTypes.Speed);
    }
    chooseComplexity() {
      return this.currentScreen(this.constructor.ScreenTypes.Complexity);
    }
    chooseThing() {
      return this.currentScreen(this.constructor.ScreenTypes.Thing);
    }
    showInstructions() {
      return this.currentScreen(this.constructor.ScreenTypes.Instructions);
    }
    startDrawing() {
      return this.currentScreen(this.constructor.ScreenTypes.Draw);
    }
    showResults() {
      return this.currentScreen(this.constructor.ScreenTypes.Results);
    }
    backToSplash() {
      return this.currentScreen(this.constructor.ScreenTypes.Splash);
    }
    showBackButton() {
      var ref;
      return (ref = this.currentScreen()) === this.constructor.ScreenTypes.Mode || ref === this.constructor.ScreenTypes.Difficulty || ref === this.constructor.ScreenTypes.Speed || ref === this.constructor.ScreenTypes.Complexity || ref === this.constructor.ScreenTypes.Thing || ref === this.constructor.ScreenTypes.Instructions;
    }
    events() {
      return super.events(...arguments).concat({
        'click .back-button': this.onClickBackButton
      });
    }
    onClickBackButton(event) {
      return this.onBackButton();
    }
  }
  ;
  Game.register(Game.id());
  Game.ScreenTypes = {
    Splash: 'Splash',
    Mode: 'Mode',
    Difficulty: 'Difficulty',
    Speed: 'Speed',
    Complexity: 'Complexity',
    Thing: 'Thing',
    Instructions: 'Instructions',
    Draw: 'Draw',
    Results: 'Results'
  };
  return Game;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.game.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/template.game.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game"
  }, "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Splash");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Splash"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Mode");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Mode"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Difficulty");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Difficulty"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Speed");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Speed"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Complexity");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Complexity"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Thing");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Thing"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Instructions");
  }, function() {
    return [ "\n      ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Instructions"));
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Draw");
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("drawQuickly"), "gameMode"), "SymbolicDrawing");
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "SymbolicDrawing"));
      }), "\n      " ];
    }), "\n      ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("drawQuickly"), "gameMode"), "RealisticDrawing");
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "RealisticDrawing"));
      }), "\n      " ];
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), view.lookup("currentScreen"), "Results");
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("drawQuickly"), "gameMode"), "SymbolicDrawing");
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Results", "SymbolicDrawing"));
      }), "\n      " ];
    }), "\n      ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("drawQuickly"), "gameMode"), "RealisticDrawing");
    }, function() {
      return [ "\n        ", Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Results", "RealisticDrawing"));
      }), "\n      " ];
    }), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showBackButton"));
  }, function() {
    return HTML.Raw('\n      <button class="back-button">返回</button>\n    ');
  }), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"splash":{"splash.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/splash/splash.coffee                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Splash = function () {
  class Splash extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Splash';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.game = this.parentComponent();
    }
    events() {
      return super.events(...arguments).concat({
        'click .play-button': this.onClickPlayButton,
        'click .quit-button': this.onClickQuitButton
      });
    }
    onClickPlayButton(event) {
      return this.game.chooseMode();
    }
    onClickQuitButton(event) {
      return this.os.unloadProgram(this.drawQuickly);
    }
  }
  ;
  Splash.register(Splash.id());
  return Splash;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.splash.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/splash/template.splash.js                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Splash");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Splash"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Splash", (function() {
  var view = this;
  return HTML.Raw('<div class="pixelartacademy-pixeltosh-programs-drawquickly-interface-game-splash">\n    <div class="menu">\n      <button class="play-button pixelartacademy-pixeltosh-os-interface-button">开始</button>\n      <button class="quit-button pixelartacademy-pixeltosh-os-interface-button">退出</button>\n    </div>\n  </div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"mode":{"mode.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/mode/mode.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Mode = function () {
  class Mode extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Mode';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.game = this.parentComponent();
    }
    events() {
      return super.events(...arguments).concat({
        'click .symbolic.mode-button': this.onClickSymbolicModeButton,
        'click .realistic.mode-button': this.onClickRealisticModeButton
      });
    }
    onClickSymbolicModeButton(event) {
      this.game.drawQuickly.setGameMode(DrawQuickly.GameModes.SymbolicDrawing);
      return this.game.chooseDifficulty();
    }
    async onClickRealisticModeButton(event) {
      await LOI.adventure.showDialogMessage("对新手来说，对着参考图自由绘画可能有点难，这部分训练会在后续开发中加入。\n\n如果你现在对结果还不满意，也没关系。");
      this.game.drawQuickly.setGameMode(DrawQuickly.GameModes.RealisticDrawing);
      return this.game.chooseComplexity();
    }
  }
  ;
  Mode.register(Mode.id());
  return Mode;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.mode.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/mode/template.mode.js                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Mode");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Mode"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Mode", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-mode"
  }, HTML.Raw('\n    <div class="title">选择绘画模式</div>\n    '), HTML.DIV({
    class: "button-area"
  }, "\n      ", HTML.DIV({
    class: "mode"
  }, "\n        ", HTML.IMG({
    class: "illustration",
    src: function() {
      return Spacebars.mustache(view.lookup("image"), "/pixelartacademy/pixeltosh/programs/drawquickly/mode-symbolic.png");
    }
  }), HTML.Raw('\n        <button class="symbolic mode-button pixelartacademy-pixeltosh-os-interface-button">符号</button>\n        <div class="description">尽可能从想象画出更多东西。</div>\n      ')), "\n      ", HTML.DIV({
    class: "mode"
  }, "\n        ", HTML.IMG({
    class: "illustration",
    src: function() {
      return Spacebars.mustache(view.lookup("image"), "/pixelartacademy/pixeltosh/programs/drawquickly/mode-realistic.png");
    }
  }), HTML.Raw('\n        <button class="realistic mode-button pixelartacademy-pixeltosh-os-interface-button">写实</button>\n        <div class="description">从参考图绘画时应用简化。</div>\n      ')), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"difficulty":{"difficulty.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/difficulty/difficulty.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Difficulty = function () {
  class Difficulty extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Difficulty';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.game = this.parentComponent();
    }
    difficultyOptions() {
      return _.values(DrawQuickly.SymbolicDrawing.DifficultyProperties);
    }
    imageUrl() {
      var difficulty;
      difficulty = this.currentData();
      return "/pixelartacademy/pixeltosh/programs/drawquickly/difficulty-".concat(difficulty, ".png");
    }
    bestScore() {
      var difficulty;
      difficulty = this.currentData();
      return DrawQuickly.SymbolicDrawing.getBestScoreForDifficulty(difficulty);
    }
    localizedDifficulty(difficulty) {
      return {
        easy: "简单",
        medium: "中等",
        hard: "困难"
      }[difficulty] || difficulty;
    }
    localizedSpeed(speed) {
      return {
        slow: "慢速",
        medium: "中速",
        fast: "快速"
      }[speed] || speed;
    }
    events() {
      return super.events(...arguments).concat({
        'click .difficulty-button': this.onClickDifficultyButton
      });
    }
    onClickDifficultyButton(event) {
      var difficulty;
      difficulty = this.currentData();
      this.game.drawQuickly.symbolicDrawing.setDifficulty(difficulty);
      return this.game.chooseSpeed();
    }
  }
  ;
  Difficulty.register(Difficulty.id());
  return Difficulty;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.difficulty.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/difficulty/template.difficulty.js          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Difficulty");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Difficulty"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Difficulty", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-difficulty"
  }, HTML.Raw('\n    <div class="title">选择难度</div>\n    '), HTML.DIV({
    class: "button-area"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("difficultyOptions"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "difficulty"
    }, "\n          ", HTML.IMG({
      class: "illustration",
      src: function() {
        return Spacebars.mustache(view.lookup("image"), view.lookup("imageUrl"));
      }
    }), "\n          ", HTML.BUTTON({
      class: "difficulty-button pixelartacademy-pixeltosh-os-interface-button"
    }, Blaze.View("lookup:localizedDifficulty", function() {
      return Spacebars.mustache(view.lookup("localizedDifficulty"), view.lookup("."));
    })), "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("bestScore"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: "best-score"
      }, "\n              最佳：", Blaze.View("lookup:bestScore.score", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("bestScore"), "score"));
      }), HTML.Raw("/10<br>\n              "), Blaze.View("lookup:localizedSpeed", function() {
        return Spacebars.mustache(view.lookup("localizedSpeed"), Spacebars.dot(view.lookup("bestScore"), "speed"));
      }), "\n            "), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"speed":{"speed.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/speed/speed.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Speed = function () {
  class Speed extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Speed';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.game = this.parentComponent();
    }
    difficultyOptions() {
      return ['slow', 'medium', 'fast'];
    }
    time() {
      var speed;
      speed = this.currentData();
      return this.getTimeForSpeed(speed);
    }
    getTimeForSpeed(speed) {
      return DrawQuickly.SymbolicDrawing.timePerDifficulty[this.drawQuickly.symbolicDrawing.difficulty][speed];
    }
    minutes() {
      return Math.floor(Math.ceil(this.time()) / 60);
    }
    seconds() {
      var seconds;
      seconds = Math.ceil(this.time()) % 60;
      return seconds.toString().padStart(2, '0');
    }
    bestScore() {
      var speed;
      speed = this.currentData();
      return DrawQuickly.SymbolicDrawing.getBestScoreForDifficultyAndSpeed(this.drawQuickly.symbolicDrawing.difficulty, speed);
    }
    localizedSpeed(speed) {
      return {
        slow: "慢速",
        medium: "中速",
        fast: "快速"
      }[speed] || speed;
    }
    events() {
      return super.events(...arguments).concat({
        'click .difficulty-button': this.onClickSpeedButton
      });
    }
    onClickSpeedButton(event) {
      var speed;
      speed = this.currentData();
      this.game.drawQuickly.symbolicDrawing.setSpeed(speed);
      return this.game.showInstructions();
    }
  }
  ;
  Speed.register(Speed.id());
  return Speed;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.speed.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/speed/template.speed.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Speed");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Speed"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Speed", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-speed"
  }, HTML.Raw('\n    <div class="title">选择速度</div>\n    '), HTML.DIV({
    class: "button-area"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("difficultyOptions"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "difficulty"
    }, "\n          ", HTML.DIV({
      class: "time"
    }, "\n            ", Blaze.View("lookup:minutes", function() {
      return Spacebars.mustache(view.lookup("minutes"));
    }), ":", Blaze.View("lookup:seconds", function() {
      return Spacebars.mustache(view.lookup("seconds"));
    }), "\n          "), "\n          ", HTML.BUTTON({
      class: "difficulty-button pixelartacademy-pixeltosh-os-interface-button"
    }, Blaze.View("lookup:localizedSpeed", function() {
      return Spacebars.mustache(view.lookup("localizedSpeed"), view.lookup("."));
    })), "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("bestScore"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: "best-score"
      }, "\n              最佳：", Blaze.View("lookup:bestScore", function() {
        return Spacebars.mustache(view.lookup("bestScore"));
      }), "/10\n            "), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"complexity":{"complexity.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/complexity/complexity.coffee               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Complexity = function () {
  class Complexity extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Complexity';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.game = this.parentComponent();
    }
    complexityOptions() {
      return _.values(DrawQuickly.RealisticDrawing.ComplexityProperties);
    }
    imageUrl() {
      var complexity;
      complexity = this.currentData();
      return "/pixelartacademy/pixeltosh/programs/drawquickly/complexity-".concat(complexity, ".png");
    }
    completedCount() {
      var complexity;
      complexity = this.currentData();
      return DrawQuickly.RealisticDrawing.getDrawnThingsForComplexity(complexity).length;
    }
    allCount() {
      var complexity;
      complexity = this.currentData();
      return DrawQuickly.RealisticDrawing.thingsByComplexity[complexity].length;
    }
    localizedComplexity(complexity) {
      return {
        simple: "简单",
        medium: "中等",
        complex: "复杂"
      }[complexity] || complexity;
    }
    events() {
      return super.events(...arguments).concat({
        'click .complexity-button': this.onClickComplexityButton
      });
    }
    onClickComplexityButton(event) {
      var complexity;
      complexity = this.currentData();
      this.game.drawQuickly.realisticDrawing.setComplexity(complexity);
      return this.game.chooseThing();
    }
  }
  ;
  Complexity.register(Complexity.id());
  return Complexity;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.complexity.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/complexity/template.complexity.js          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Complexity");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Complexity"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Complexity", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-complexity"
  }, HTML.Raw('\n    <div class="title">选择复杂度</div>\n    '), HTML.DIV({
    class: "button-area"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("complexityOptions"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "complexity"
    }, "\n          ", HTML.IMG({
      class: "illustration",
      src: function() {
        return Spacebars.mustache(view.lookup("image"), view.lookup("imageUrl"));
      }
    }), "\n          ", HTML.BUTTON({
      class: "complexity-button pixelartacademy-pixeltosh-os-interface-button"
    }, Blaze.View("lookup:localizedComplexity", function() {
      return Spacebars.mustache(view.lookup("localizedComplexity"), view.lookup("."));
    })), "\n          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("completedCount"));
    }, function() {
      return [ "\n            ", HTML.DIV({
        class: "completion"
      }, "\n              已完成：", Blaze.View("lookup:completedCount", function() {
        return Spacebars.mustache(view.lookup("completedCount"));
      }), "/", Blaze.View("lookup:allCount", function() {
        return Spacebars.mustache(view.lookup("allCount"));
      }), HTML.Raw("<br>\n            ")), "\n          " ];
    }), "\n        "), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"thing":{"thing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/thing/thing.coffee                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Thing = function () {
  class Thing extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Thing';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.game = this.parentComponent();
    }
    things() {
      return DrawQuickly.RealisticDrawing.thingsByComplexity[this.drawQuickly.realisticDrawing.complexity];
    }
    completedThing() {
      var realisticDrawingData, ref, thing;
      thing = this.currentData();
      if (!(realisticDrawingData = PAA.Pixeltosh.Programs.DrawQuickly.state('realisticDrawing'))) {
        return;
      }
      return (ref = realisticDrawingData.things) != null ? ref[thing] : void 0;
    }
    completedClass() {
      if (this.completedThing()) {
        return 'completed';
      }
    }
    localizedThing(thing) {
      return DrawQuickly.SymbolicDrawing.localizedThing(thing);
    }
    events() {
      return super.events(...arguments).concat({
        'click .thing-button': this.onClickThingButton
      });
    }
    onClickThingButton(event) {
      var thing;
      thing = this.currentData();
      this.drawQuickly.realisticDrawing.setThingToDraw(thing);
      if (this.completedThing()) {
        return this.game.showResults();
      } else {
        return this.game.showInstructions();
      }
    }
  }
  ;
  Thing.register(Thing.id());
  return Thing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.thing.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/thing/template.thing.js                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Thing");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Thing"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Thing", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-thing"
  }, HTML.Raw('\n    <div class="title">选择主题</div>\n    '), HTML.UL({
    class: "things"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("things"));
  }, function() {
    return [ "\n        ", HTML.BUTTON({
      class: function() {
        return [ "thing-button ", Spacebars.mustache(view.lookup("completedClass")) ];
      }
    }, Blaze.View("lookup:localizedThing", function() {
      return Spacebars.mustache(view.lookup("localizedThing"), view.lookup("."));
    })), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"instructions":{"instructions.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/instructions/instructions.coffee           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Instructions = function () {
  class Instructions extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Instructions';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.os = this.ancestorComponentOfType(PAA.Pixeltosh.OS);
      this.drawQuickly = this.os.getProgram(DrawQuickly);
      return this.game = this.parentComponent();
    }
    events() {
      return super.events(...arguments).concat({
        'click .start-button': this.onClickStartButton
      });
    }
    onClickStartButton(event) {
      return this.game.startDrawing();
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
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/instructions/template.instructions.js      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Instructions");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Instructions"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Instructions", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-instructions"
  }, "\n    ", HTML.DIV({
    class: "text"
  }, "\n      ", HTML.IMG({
    class: "pixeltosh",
    src: function() {
      return Spacebars.mustache(view.lookup("image"), "/pixelartacademy/pixeltosh/programs/drawquickly/pixeltosh-gotit.png");
    }
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("drawQuickly"), "gameMode"), "SymbolicDrawing");
  }, function() {
    return HTML.Raw("\n        <h1>符号绘画</h1>\n        <p>系统会给你一组 10 个物品。</p>\n        <p>你可以按任意顺序来画。</p>\n        <p>在时间结束前，尽可能多地画出来！</p>\n      ");
  }), "\n      ", Blaze.If(function() {
    return Spacebars.dataMustache(view.lookup("$is"), Spacebars.dot(view.lookup("drawQuickly"), "gameMode"), "RealisticDrawing");
  }, function() {
    return HTML.Raw("\n        <h1>写实绘画</h1>\n        <p>系统会给你一张参考图来临摹。</p>\n        <p>每一轮的绘画时间都会变短。</p>\n        <p>学会简化对象，才能按时完成！</p>\n      ");
  }), HTML.Raw('\n      <p class="button-area"><button class="start-button pixelartacademy-pixeltosh-os-interface-button">开始</button></p>\n    ')), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"draw":{"draw.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/draw.coffee                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Draw = class Draw extends AM.Component {
  constructor() {
    super(...arguments);
  }
  onCreated() {
    super.onCreated(...arguments);
    return this.game = this.ancestorComponentOfType(DrawQuickly.Interface.Game);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"symbolicdrawing":{"symbolicdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/symbolicdrawing.coffe //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Draw.SymbolicDrawing = function () {
  class SymbolicDrawing extends DrawQuickly.Interface.Game.Draw {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.symbolicDrawing = this.game.drawQuickly.symbolicDrawing;
      return this.symbolicDrawing.reset();
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.symbolicDrawing.start();
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.symbolicDrawing.stop();
    }
    showInstructions() {
      return !(this.symbolicDrawing.thingsDrawn().length || this.symbolicDrawing.guessesText().length);
    }
  }
  ;
  SymbolicDrawing.register(SymbolicDrawing.id());
  return SymbolicDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.symbolicdrawing.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/template.symbolicdraw //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-symbolicdrawing"
  }, "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("symbolicDrawing"), "timer"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "Timer"));
    });
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "Canvas"));
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "SymbolicDrawing", "Things"));
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("symbolicDrawing"), "canvasText"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "canvas-text",
      "data-cursor": ""
    }, Blaze.View("lookup:symbolicDrawing.canvasText", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("symbolicDrawing"), "canvasText"));
    })), "\n    " ];
  }), "\n    ", HTML.DIV({
    class: function() {
      return [ "pixeltosh ", Spacebars.mustache(Spacebars.dot(view.lookup("symbolicDrawing"), "pixeltoshClass")) ];
    }
  }), "\n    ", HTML.DIV({
    class: "pixeltosh-text"
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showInstructions"));
  }, function() {
    return HTML.Raw('\n        <div class="instructions">开始画，我来猜它是什么。</div>\n      ');
  }, function() {
    return [ "\n        ", Blaze.View("lookup:symbolicDrawing.guessesText", function() {
      return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("symbolicDrawing"), "guessesText")));
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"things":{"things.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/things/things.coffee  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc,
  AM,
  DrawQuickly,
  FM,
  LOI,
  PAA,
  indexOf = [].indexOf;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things = function () {
  class Things extends DrawQuickly.Interface.Game.Draw {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things';
    }
    onCreated() {
      super.onCreated(...arguments);
      this.game = this.ancestorComponentOfType(DrawQuickly.Interface.Game);
      return this.symbolicDrawing = this.game.drawQuickly.symbolicDrawing;
    }
  }
  ;
  Things.register(Things.id());
  Things.Thing = function () {
    class Thing extends AM.Component {
      onCreated() {
        super.onCreated(...arguments);
        this.game = this.ancestorComponentOfType(DrawQuickly.Interface.Game);
        return this.symbolicDrawing = this.game.drawQuickly.symbolicDrawing;
      }
      drawnClass() {
        var thingToDraw, thingsDrawn;
        thingToDraw = this.data();
        thingsDrawn = this.symbolicDrawing.thingsDrawn();
        if (indexOf.call(thingsDrawn, thingToDraw) >= 0) {
          return 'drawn';
        }
      }
      localizedThing(thing) {
        return DrawQuickly.SymbolicDrawing.localizedThing(thing);
      }
    }
    ;
    Thing.register('PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things.Thing');
    return Thing;
  }.call(this);
  return Things;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.things.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/things/template.thing //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-symbolicdrawing-things"
  }, "\n    ", HTML.UL({
    class: "things"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("symbolicDrawing"), "thingsToDraw"));
  }, function() {
    return [ "\n        ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "SymbolicDrawing", "Things", "Thing"));
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things.Thing");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things.Thing"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.SymbolicDrawing.Things.Thing", (function() {
  var view = this;
  return HTML.LI({
    class: function() {
      return [ "thing ", Spacebars.mustache(view.lookup("drawnClass")) ];
    }
  }, HTML.SPAN({
    class: "text"
  }, Blaze.View("lookup:localizedThing", function() {
    return Spacebars.mustache(view.lookup("localizedThing"), view.lookup("."));
  })));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"realisticdrawing":{"realisticdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/realisticdrawing/realisticdrawing.cof //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Draw.RealisticDrawing = function () {
  class RealisticDrawing extends DrawQuickly.Interface.Game.Draw {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.RealisticDrawing';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.realisticDrawing = this.game.drawQuickly.realisticDrawing;
    }
    onRendered() {
      super.onRendered(...arguments);
      return this.realisticDrawing.start();
    }
    onDestroyed() {
      super.onDestroyed(...arguments);
      return this.realisticDrawing.stop();
    }
    showInstructions() {
      var timer;
      if (!(timer = this.realisticDrawing.timer())) {
        return;
      }
      return timer.time() && !timer.running();
    }
    showInstructionsClass() {
      if (this.showInstructions()) {
        return 'show-instructions';
      }
    }
    roundNumber() {
      return this.realisticDrawing.durationIndex() + 1;
    }
    referenceUrl() {
      return "/pixelartacademy/pixeltosh/programs/drawquickly/references/".concat(_.fileCase(this.realisticDrawing.thingToDraw), ".png");
    }
  }
  ;
  RealisticDrawing.register(RealisticDrawing.id());
  return RealisticDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.realisticdrawing.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/realisticdrawing/template.realisticdr //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.RealisticDrawing");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.RealisticDrawing"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.RealisticDrawing", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-realisticdrawing ", Spacebars.mustache(view.lookup("showInstructionsClass")) ];
    }
  }, "\n    ", HTML.DIV({
    class: "round"
  }, "Round ", Blaze.View("lookup:roundNumber", function() {
    return Spacebars.mustache(view.lookup("roundNumber"));
  }), "/3"), "\n    ", Blaze._TemplateWith(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("realisticDrawing"), "timer"));
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "Timer"));
    });
  }), "\n    ", Spacebars.include(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Draw", "Canvas"));
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("realisticDrawing"), "canvasText"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      class: "canvas-text",
      "data-cursor": ""
    }, Blaze.View("lookup:realisticDrawing.canvasText", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("realisticDrawing"), "canvasText"));
    })), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showInstructions"));
  }, function() {
    return HTML.Raw('\n      <div class="pixeltosh"></div>\n      <div class="pixeltosh-text">\n          <div class="instructions">准备好后开始画。</div>\n      </div>\n    ');
  }), "\n    ", HTML.DIV({
    class: "reference"
  }, "\n      ", HTML.IMG({
    class: "image",
    src: function() {
      return Spacebars.mustache(view.lookup("image"), view.lookup("referenceUrl"));
    }
  }), "\n    "), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"canvas":{"canvas.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/canvas/canvas.coffee                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, AP, Bresenham, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
AP = Artificial.Pyramid;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
Bresenham = require('bresenham-zingl');
DrawQuickly.Interface.Game.Draw.Canvas = function () {
  class Canvas extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Canvas';
    }
    constructor() {
      super(...arguments);
      this.canDraw = new ReactiveField(true);
      this.drawingStarted = new ReactiveField(false);
      this.strokes = new ReactiveField([]);
      this.classificationInputData = new ReactiveField(null);
    }
    onCreated() {
      return super.onCreated(...arguments);
    }
    onRendered() {
      var _classificationInputData, inputSize;
      super.onRendered(...arguments);
      this.canvas = new AM.ReadableCanvas(100, 100);
      this.canvas.classList.add('canvas');
      this.$('.canvas-area').append(this.canvas);
      this.context = this.canvas.context;
      inputSize = PAA.ImageClassification.SimpleClassifier.inputSize;
      _classificationInputData = new Float32Array(inputSize * inputSize);
      return this.autorun(computation => {
        var strokes;
        strokes = this.strokes();
        if (!strokes.length) {
          this.classificationInputData(null);
          return;
        }
        PAA.ImageClassification.SimpleClassifier.convertStrokesToInputData(strokes, _classificationInputData);
        return this.classificationInputData(_classificationInputData);
      });
    }
    endDrawing() {
      this.canDraw(false);
      return this._endDraw();
    }
    reset() {
      this.clear();
      this.canDraw(true);
      return this.drawingStarted(false);
    }
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return this.strokes([]);
    }
    getPlainStrokes() {
      var i, len, ref, results, stroke, vertex;
      ref = this.strokes();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        stroke = ref[i];
        results.push(function () {
          var j, len1, ref1, results1;
          ref1 = stroke.vertices;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            vertex = ref1[j];
            results1.push(vertex.toObject());
          }
          return results1;
        }());
      }
      return results;
    }
    clearButtonDisabledAttribute() {
      if (!this.canDraw()) {
        return {
          disabled: true
        };
      }
    }
    events() {
      return super.events(...arguments).concat({
        'mousedown .canvas-area': this.onMouseDownCanvasArea,
        'click .clear-button': this.onClickClearButton
      });
    }
    onMouseDownCanvasArea(event) {
      event.preventDefault();
      if (!this.canDraw()) {
        return;
      }
      this.drawingStarted(true);
      this._previousX = null;
      this._previousY = null;
      this._stroke = new AP.PolygonalChain([]);
      this._draw(event);

      // Wire movement of the mouse anywhere in the window.
      $(document).on('pointermove.pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-canvas', event => {
        return this._draw(event);
      });

      // Wire end of dragging on pointer up anywhere in the window.
      return $(document).on('pointerup.pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-canvas', () => {
        return this._endDraw();
      });
    }
    _draw(event) {
      var imageData, rect, x, y;
      rect = this.canvas.getBoundingClientRect();
      x = Math.floor((event.clientX - rect.left) / rect.width * this.canvas.width);
      y = Math.floor((event.clientY - rect.top) / rect.height * this.canvas.height);
      this._stroke.vertices.push(new THREE.Vector2(x, y));
      if (this._previousX == null) {
        this._previousX = x;
      }
      if (this._previousY == null) {
        this._previousY = y;
      }
      imageData = this.canvas.getFullImageData();
      Bresenham.line(this._previousX, this._previousY, x, y, (bottomRightX, bottomRightY) => {
        var i, j, pixelX, pixelY, ref, ref1, ref2, ref3;
        for (pixelX = i = ref = bottomRightX - 1, ref1 = bottomRightX; ref <= ref1 ? i <= ref1 : i >= ref1; pixelX = ref <= ref1 ? ++i : --i) {
          if (pixelX >= 0 && pixelX < imageData.width) {
            for (pixelY = j = ref2 = bottomRightY - 1, ref3 = bottomRightY; ref2 <= ref3 ? j <= ref3 : j >= ref3; pixelY = ref2 <= ref3 ? ++j : --j) {
              if (pixelY >= 0 && pixelY < imageData.height) {
                imageData.data[(pixelX + pixelY * imageData.width) * 4 + 3] = 255;
              }
            }
          }
        }
      });

      // Explicit return to avoid result collection.
      this.canvas.putFullImageData(imageData);
      this._previousX = x;
      return this._previousY = y;
    }
    _endDraw() {
      var strokes;
      if (!this._stroke) {
        return;
      }
      $(document).off('.pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-canvas');
      strokes = this.strokes();
      strokes.push(this._stroke.getDecimatedPolygonalChain(1));
      this.strokes(strokes);
      return this._stroke = null;
    }
    onClickClearButton(event) {
      return this.clear();
    }
  }
  ;
  Canvas.register(Canvas.id());
  return Canvas;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.canvas.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/canvas/template.canvas.js             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Canvas");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Canvas"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Canvas", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-canvas"
  }, "\n    ", HTML.DIV({
    class: "button-area"
  }, "\n      ", HTML.BUTTON(HTML.Attrs({
    class: "clear-button pixelartacademy-pixeltosh-os-interface-button"
  }, function() {
    return Spacebars.attrMustache(view.lookup("clearButtonDisabledAttribute"));
  }), "清除"), "\n    "), HTML.Raw('\n    <div class="canvas-area" data-cursor="drawquickly-pencil"></div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"timer":{"timer.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/timer/timer.coffee                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Draw.Timer = function () {
  class Timer extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Timer';
    }
    time() {
      var timer;
      if (!(timer = this.data())) {
        return 0;
      }
      return timer.time();
    }
    minutes() {
      return Math.floor(Math.ceil(this.time()) / 60);
    }
    seconds() {
      var seconds;
      seconds = Math.ceil(this.time()) % 60;
      return seconds.toString().padStart(2, '0');
    }
  }
  ;
  Timer.register(Timer.id());
  return Timer;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.timer.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/draw/timer/template.timer.js               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Timer");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Timer"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Draw.Timer", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-drawquickly-interface-game-draw-timer"
  }, "\n    ", HTML.SPAN({
    class: "minutes"
  }, Blaze.View("lookup:minutes", function() {
    return Spacebars.mustache(view.lookup("minutes"));
  })), ":", HTML.SPAN({
    class: "seconds"
  }, Blaze.View("lookup:seconds", function() {
    return Spacebars.mustache(view.lookup("seconds"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"results":{"results.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/results/results.coffee                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Results = class Results extends AM.Component {
  constructor() {
    super(...arguments);
  }
  onCreated() {
    super.onCreated(...arguments);
    return this.game = this.ancestorComponentOfType(DrawQuickly.Interface.Game);
  }
  events() {
    return super.events(...arguments).concat({
      'click .done-button': this.onClickDoneButton,
      'click .restart-button': this.onClickRestartButton
    });
  }
  onClickDoneButton(event) {
    return this.game.backToSplash();
  }
  onClickRestartButton(event) {
    return this.game.showInstructions();
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"symbolicdrawing":{"symbolicdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/results/symbolicdrawing/symbolicdrawing.co //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Results.SymbolicDrawing = function () {
  class SymbolicDrawing extends DrawQuickly.Interface.Game.Results {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.SymbolicDrawing';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.symbolicDrawing = this.game.drawQuickly.symbolicDrawing;
    }
    drawings() {
      var label, ref, results, strokes;
      ref = this.symbolicDrawing.drawings;
      results = [];
      for (label in ref) {
        strokes = ref[label];
        results.push({
          label,
          strokes,
          size: 50
        });
      }
      return results;
    }
  }
  ;
  SymbolicDrawing.register(SymbolicDrawing.id());
  return SymbolicDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.symbolicdrawing.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/results/symbolicdrawing/template.symbolicd //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.SymbolicDrawing");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.SymbolicDrawing"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.SymbolicDrawing", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-resultsquickly-interface-game-results pixelartacademy-pixeltosh-programs-resultsquickly-interface-game-results-symbolicdrawing"
  }, "\n    ", HTML.DIV({
    class: "title"
  }, "得分：", Blaze.View("lookup:symbolicDrawing.thingsDrawn.length", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("symbolicDrawing"), "thingsDrawn", "length"));
  }), "/", Blaze.View("lookup:symbolicDrawing.thingsToDraw.length", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("symbolicDrawing"), "thingsToDraw", "length"));
  })), "\n    ", HTML.UL({
    class: "drawings"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("drawings"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "drawing"
    }, "\n          ", Spacebars.include(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Results", "Drawing"));
    }), "\n        "), "\n      " ];
  }), "\n    "), HTML.Raw('\n    <div class="buttons-area">\n      <button class="restart-button pixelartacademy-pixeltosh-os-interface-button">重新开始</button>\n      <button class="done-button pixelartacademy-pixeltosh-os-interface-button">完成</button>\n    </div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"realisticdrawing":{"realisticdrawing.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/results/realisticdrawing/realisticdrawing. //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
DrawQuickly.Interface.Game.Results.RealisticDrawing = function () {
  class RealisticDrawing extends DrawQuickly.Interface.Game.Results {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.RealisticDrawing';
    }
    onCreated() {
      super.onCreated(...arguments);
      return this.realisticDrawing = this.game.drawQuickly.realisticDrawing;
    }
    localizedThing(thing) {
      return DrawQuickly.SymbolicDrawing.localizedThing(thing);
    }
    durations() {
      var duration, i, index, len, realisticDrawingData, ref, results;
      realisticDrawingData = PAA.Pixeltosh.Programs.DrawQuickly.state('realisticDrawing');
      ref = realisticDrawingData.things[this.realisticDrawing.thingToDraw].durations;
      results = [];
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        duration = ref[index];
        results.push({
          duration,
          index
        });
      }
      return results;
    }
    drawingInfo() {
      var drawing, durationInfo, minutes, seconds, time;
      durationInfo = this.currentData();
      time = DrawQuickly.RealisticDrawing.durationsPerComplexity[this.realisticDrawing.complexity][durationInfo.index];
      minutes = Math.floor(Math.ceil(time) / 60);
      seconds = Math.ceil(time) % 60;
      drawing = DrawQuickly.Drawing.documents.findOne(durationInfo.duration.drawingId);
      return {
        strokes: drawing.strokes,
        label: "".concat(minutes, ":").concat(seconds.toString().padStart(2, '0')),
        size: 80,
        lineWidth: 2
      };
    }
    events() {
      return super.events(...arguments).concat({
        'click .thing-button': this.onClickThingButton
      });
    }
    onClickThingButton(event) {
      return this.game.chooseThing();
    }
  }
  ;
  RealisticDrawing.register(RealisticDrawing.id());
  return RealisticDrawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.realisticdrawing.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/results/realisticdrawing/template.realisti //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.RealisticDrawing");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.RealisticDrawing"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.RealisticDrawing", (function() {
  var view = this;
  return HTML.DIV({
    class: "pixelartacademy-pixeltosh-programs-resultsquickly-interface-game-results pixelartacademy-pixeltosh-programs-resultsquickly-interface-game-results-realisticdrawing"
  }, "\n    ", HTML.DIV({
    class: "title"
  }, Blaze.View("lookup:localizedThing", function() {
    return Spacebars.mustache(view.lookup("localizedThing"), Spacebars.dot(view.lookup("realisticDrawing"), "thingToDraw"));
  })), "\n    ", HTML.UL({
    class: "drawings"
  }, "\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("durations"));
  }, function() {
    return [ "\n        ", HTML.LI({
      class: "drawing"
    }, "\n          ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("drawingInfo"));
    }, function() {
      return Spacebars.include(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("PixelArtAcademy"), "Pixeltosh", "Programs", "DrawQuickly", "Interface", "Game", "Results", "Drawing"));
      });
    }), "\n        "), "\n      " ];
  }), "\n    "), HTML.Raw('\n    <div class="buttons-area">\n      <button class="restart-button pixelartacademy-pixeltosh-os-interface-button">重新开始</button>\n      <button class="thing-button pixelartacademy-pixeltosh-os-interface-button">新主题</button>\n      <button class="done-button pixelartacademy-pixeltosh-os-interface-button">完成</button>\n    </div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"drawing":{"drawing.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/results/drawing/drawing.coffee             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var AEc, AM, AP, Bresenham, DrawQuickly, FM, LOI, PAA;
AM = Artificial.Mirage;
AEc = Artificial.Echo;
AP = Artificial.Pyramid;
FM = FataMorgana;
LOI = LandsOfIllusions;
PAA = PixelArtAcademy;
DrawQuickly = PAA.Pixeltosh.Programs.DrawQuickly;
Bresenham = require('bresenham-zingl');
DrawQuickly.Interface.Game.Results.Drawing = function () {
  class Drawing extends AM.Component {
    static id() {
      return 'PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.Drawing';
    }
    onRendered() {
      var canvas, drawing, end, endX, endY, i, imageData, j, len, lineWidth, ref, ref1, scale, size, start, startX, startY, stroke, topRightOffset, vertexIndex;
      drawing = this.data();
      size = drawing.size;
      scale = size / 100;
      lineWidth = drawing.lineWidth || 1;
      topRightOffset = lineWidth - 1;
      canvas = new AM.ReadableCanvas(size, size);
      imageData = canvas.getFullImageData();
      ref = drawing.strokes;
      for (i = 0, len = ref.length; i < len; i++) {
        stroke = ref[i];
        for (vertexIndex = j = 0, ref1 = stroke.length - 1; 0 <= ref1 ? j < ref1 : j > ref1; vertexIndex = 0 <= ref1 ? ++j : --j) {
          start = stroke[vertexIndex];
          end = stroke[vertexIndex + 1];
          startX = Math.round(start.x * scale);
          startY = Math.round(start.y * scale);
          endX = Math.round(end.x * scale);
          endY = Math.round(end.y * scale);
          Bresenham.line(startX, startY, endX, endY, (bottomRightX, bottomRightY) => {
            var k, pixelX, pixelY, ref2, ref3, results;
            results = [];
            for (pixelX = k = ref2 = bottomRightX - topRightOffset, ref3 = bottomRightX; ref2 <= ref3 ? k <= ref3 : k >= ref3; pixelX = ref2 <= ref3 ? ++k : --k) {
              if (pixelX >= 0 && pixelX < imageData.width) {
                results.push(function () {
                  var l, ref4, ref5, results1;
                  results1 = [];
                  for (pixelY = l = ref4 = bottomRightY - topRightOffset, ref5 = bottomRightY; ref4 <= ref5 ? l <= ref5 : l >= ref5; pixelY = ref4 <= ref5 ? ++l : --l) {
                    if (pixelY >= 0 && pixelY < imageData.height) {
                      results1.push(imageData.data[(pixelX + pixelY * imageData.width) * 4 + 3] = 255);
                    }
                  }
                  return results1;
                }());
              }
            }
            return results;
          });
        }
      }
      canvas.putFullImageData(imageData);
      canvas.classList.add('canvas');
      return this.$('.canvas-area').append(canvas);
    }
    canvasAreaStyle() {
      var drawing;
      drawing = this.data();
      return {
        width: "".concat(drawing.size, "rem"),
        height: "".concat(drawing.size, "rem")
      };
    }
  }
  ;
  Drawing.register(Drawing.id());
  return Drawing;
}.call(this);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.drawing.js":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/retronator_pixelartacademy-pixeltosh-drawquickly/interface/game/results/drawing/template.drawing.js        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.Drawing");
Template["PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.Drawing"] = new Template("Template.PixelArtAcademy.Pixeltosh.Programs.DrawQuickly.Interface.Game.Results.Drawing", (function() {
  var view = this;
  return HTML.FIGURE({
    class: "pixelartacademy-pixeltosh-programs-resultsquickly-interface-game-results-drawing"
  }, "\n    ", HTML.DIV(HTML.Attrs({
    class: "canvas-area"
  }, function() {
    return Spacebars.attrMustache(view.lookup("style"), view.lookup("canvasAreaStyle"));
  })), "\n    ", HTML.FIGCAPTION({
    class: "caption"
  }, Blaze.View("lookup:label", function() {
    return Spacebars.mustache(view.lookup("label"));
  })), "\n  ");
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},"node_modules":{"bresenham-zingl":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-drawquickly/node_modules/bresenham-zingl/package.json      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "bresenham-zingl",
  "version": "0.2.0",
  "browser": "dist/index.js",
  "main": "dist/index.mjs",
  "module": "dist/index.mjs"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dist":{"index.mjs":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/retronator_pixelartacademy-pixeltosh-drawquickly/node_modules/bresenham-zingl/dist/index.mjs    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({circle:function(){return x},circleAA:function(){return aa},cubicBezier:function(){return ra},cubicBezierAA:function(){return oa},cubicBezierSegment:function(){return $},cubicBezierSegmentAA:function(){return m},ellipse:function(){return P},ellipseRect:function(){return _},line:function(){return T},lineAA:function(){return U},lineWidth:function(){return A},quadBezier:function(){return fa},quadBezierAA:function(){return ta},quadBezierSegment:function(){return N},quadBezierSegmentAA:function(){return O},quadRationalBezier:function(){return w},quadRationalBezierSegment:function(){return J},quadRationalBezierSegmentAA:function(){return X},rotatedEllipse:function(){return y},rotatedEllipseRect:function(){return Z}});function T(f, a, i, t, M) {
  const h = Math.abs(i - f), o = f < i ? 1 : -1, e = -Math.abs(t - a), l = a < t ? 1 : -1;
  let r = h + e, n;
  for (; ; ) {
    if (M(f, a), n = 2 * r, n >= e) {
      if (f === i) break;
      r += e, f += o;
    }
    if (n <= h) {
      if (a === t) break;
      r += h, a += l;
    }
  }
}
function U(f, a, i, t, M) {
  const h = f < i ? 1 : -1, o = a < t ? 1 : -1;
  let e, l = Math.abs(i - f), r = Math.abs(t - a), n = l * l + r * r, c = n == 0 ? 1 : 16777087 / Math.sqrt(n);
  for (l *= c, r *= c, n = l - r; ; ) {
    if (M(f, a, Math.abs(n - l + r) >> 16), c = n, e = f, 2 * c >= -l) {
      if (f == i) break;
      c + r < 16711680 && M(f, a + o, c + r >> 16), n -= r, f += h;
    }
    if (2 * c <= r) {
      if (a == t) break;
      l - c < 16711680 && M(e + h, a, l - c >> 16), n += l, a += o;
    }
  }
}
function A(f, a, i, t, M, h) {
  let o = Math.abs(i - f), e = f < i ? 1 : -1, l = Math.abs(t - a), r = a < t ? 1 : -1, n = o - l, c, v, d, b = o + l == 0 ? 1 : Math.sqrt(o * o + l * l);
  for (M = (M + 1) / 2; ; ) {
    if (h(
      f,
      a,
      Math.max(0, 255 * (Math.abs(n - o + l) / b - M + 1))
    ), c = n, v = f, 2 * c >= -o) {
      for (c += l, d = a; c < b * M && (t != d || o > l); c += o)
        h(
          f,
          d += r,
          Math.max(0, 255 * (Math.abs(c) / b - M + 1))
        );
      if (f == i) break;
      c = n, n -= l, f += e;
    }
    if (2 * c <= l) {
      for (c = o - c; c < b * M && (i != v || o < l); c += l)
        h(
          v += e,
          a,
          Math.max(0, 255 * (Math.abs(c) / b - M + 1))
        );
      if (a == t) break;
      n += o, a += r;
    }
  }
}
function K(f, a = "assert error") {
  if (!f) throw new Error(a);
}
function w(f, a, i, t, M, h, o, e) {
  var l = f - 2 * i + M, r = a - 2 * t + h, n = f - i, c = a - t, v, d, b;
  K(o >= 0, "width is negative"), n * (M - i) > 0 && (c * (h - t) > 0 && Math.abs(n * r) > Math.abs(c * l) && (f = M, M = n + i, a = h, h = c + t), f == M || o == 1 ? d = (f - i) / l : (b = Math.sqrt(4 * o * o * (f - i) * (M - i) + (M - f) * (M - f)), i < f && (b = -b), d = (2 * o * (f - i) - f + M + b) / (2 * (1 - o) * (M - f))), b = 1 / (2 * d * (1 - d) * (o - 1) + 1), n = (d * d * (f - 2 * o * i + M) + 2 * d * (o * i - f) + f) * b, c = (d * d * (a - 2 * o * t + h) + 2 * d * (o * t - a) + a) * b, v = d * (o - 1) + 1, v *= v * b, o = ((1 - d) * (o - 1) + 1) * Math.sqrt(b), l = Math.floor(n + 0.5), r = Math.floor(c + 0.5), c = (n - f) * (t - a) / (i - f) + a, J(
    f,
    a,
    l,
    Math.floor(c + 0.5),
    l,
    r,
    v,
    e
  ), c = (n - M) * (t - h) / (i - M) + h, t = Math.floor(c + 0.5), f = i = l, a = r), (a - t) * (h - t) > 0 && (a == h || o == 1 ? d = (a - t) / (a - 2 * t + h) : (b = Math.sqrt(4 * o * o * (a - t) * (h - t) + (h - a) * (h - a)), t < a && (b = -b), d = (2 * o * (a - t) - a + h + b) / (2 * (1 - o) * (h - a))), b = 1 / (2 * d * (1 - d) * (o - 1) + 1), n = (d * d * (f - 2 * o * i + M) + 2 * d * (o * i - f) + f) * b, c = (d * d * (a - 2 * o * t + h) + 2 * d * (o * t - a) + a) * b, v = d * (o - 1) + 1, v *= v * b, o = ((1 - d) * (o - 1) + 1) * Math.sqrt(b), l = Math.floor(n + 0.5), r = Math.floor(c + 0.5), n = (i - f) * (c - a) / (t - a) + f, J(
    f,
    a,
    Math.floor(n + 0.5),
    r,
    l,
    r,
    v,
    e
  ), n = (i - M) * (c - h) / (t - h) + M, i = Math.floor(n + 0.5), f = l, a = t = r), J(
    f,
    a,
    i,
    t,
    M,
    h,
    o * o,
    e
  );
}
function J(f, a, i, t, M, h, o, e) {
  var l = M - i, r = h - t, n = f - M, c = a - h, v = f - i, d = a - t, b = v * r + d * l, s = v * r - d * l, u;
  if (K(v * l <= 0 && d * r <= 0, "sign of gradient must not change"), s != 0 && o > 0) {
    if (l * l + r * r > v * v + d * d && (M = f, f -= n, h = a, a -= c, s = -s), v = 2 * (4 * o * l * v + n * n), d = 2 * (4 * o * r * d + c * c), l = f < M ? 1 : -1, r = a < h ? 1 : -1, b = -2 * l * r * (2 * o * b + n * c), s * l * r < 0 && (v = -v, d = -d, b = -b, s = -s), n = 4 * o * (i - f) * r * s + v / 2 + b, c = 4 * o * (a - t) * l * s + d / 2 + b, o < 0.5 && (c > b || n < b)) {
      s = (o + 1) / 2, o = Math.sqrt(o), b = 1 / (o + 1), l = Math.floor(
        (f + 2 * o * i + M) * b / 2 + 0.5
      ), r = Math.floor((a + 2 * o * t + h) * b / 2 + 0.5), n = Math.floor((o * i + f) * b + 0.5), c = Math.floor((t * o + a) * b + 0.5), J(
        f,
        a,
        n,
        c,
        l,
        r,
        s,
        e
      ), n = Math.floor((o * i + M) * b + 0.5), c = Math.floor((t * o + h) * b + 0.5), J(l, r, n, c, M, h, s, e);
      return;
    }
    u = n + c - b;
    do {
      if (e(f, a), f == M && a == h) return;
      i = 2 * u > c ? 1 : 0, t = 2 * (u + d) < -c ? 1 : 0, (2 * u < n || t) && (a += r, c += b, u += n += v), (2 * u > n || i) && (f += l, n += b, u += c += d);
    } while (c <= b && n >= b);
  }
  T(f, a, M, h, e);
}
function X(f, a, i, t, M, h, o, e) {
  var l = M - i, r = h - t, n = f - M, c = a - h, v = f - i, d = a - t, b = v * r + d * l, s = v * r - d * l, u, z, G;
  if (K(
    v * l <= 0 && d * r <= 0
  ), s != 0 && o > 0) {
    if (l * l + r * r > v * v + d * d && (M = f, f -= n, h = a, a -= c, s = -s), v = 2 * (4 * o * l * v + n * n), d = 2 * (4 * o * r * d + c * c), l = f < M ? 1 : -1, r = a < h ? 1 : -1, b = -2 * l * r * (2 * o * b + n * c), s * l * r < 0 && (v = -v, d = -d, s = -s, b = -b), n = 4 * o * (i - f) * r * s + v / 2 + b, c = 4 * o * (a - t) * l * s + d / 2 + b, o < 0.5 && c > n)
      return s = (o + 1) / 2, o = Math.sqrt(o), b = 1 / (o + 1), l = Math.floor(
        (f + 2 * o * i + M) * b / 2 + 0.5
      ), r = Math.floor((a + 2 * o * t + h) * b / 2 + 0.5), n = Math.floor((o * i + f) * b + 0.5), c = Math.floor((t * o + a) * b + 0.5), X(
        f,
        a,
        n,
        c,
        l,
        r,
        s,
        e
      ), n = Math.floor((o * i + M) * b + 0.5), c = Math.floor((t * o + h) * b + 0.5), X(
        l,
        r,
        n,
        c,
        M,
        h,
        s,
        e
      );
    u = n + c - b;
    do {
      if (s = Math.min(n - b, b - c), z = Math.max(n - b, b - c), z += 2 * z * s * s / (4 * z * z + s * s), i = 255 * Math.abs(u - n - c + b) / z, i < 256 && e(f, a, i), G = 2 * u + c < 0) {
        if (a == h) return;
        n - u < z && e(f + l, a, 255 * Math.abs(n - u) / z);
      }
      if (2 * u + n > 0) {
        if (f == M) return;
        u - c < z && e(f, a + r, 255 * Math.abs(u - c) / z), f += l, n += b, u += c += d;
      }
      G && (a += r, c += b, u += n += v);
    } while (c < n);
  }
  U(f, a, M, h, e);
}
function P(f, a, i, t, M) {
  let h = -i, o = 0, e = t * t, l = h * (2 * e + h) + e;
  do
    M(f - h, a + o), M(f + h, a + o), M(f + h, a - o), M(f - h, a - o), e = 2 * l, e >= (h * 2 + 1) * t * t && (l += (++h * 2 + 1) * t * t), e <= (o * 2 + 1) * i * i && (l += (++o * 2 + 1) * i * i);
  while (h <= 0);
  for (; o++ < t; )
    M(f, a + o), M(f, a - o);
}
function y(f, a, i, t, M, h) {
  let o = i * i, e = t * t;
  const l = Math.sin(M);
  let r = (o - e) * l;
  o = Math.sqrt(o - r * l), e = Math.sqrt(e + r * l), i = o + 0.5, t = e + 0.5, r = r * i * t / (o * e), Z(
    f - i,
    a - t,
    f + i,
    a + t,
    4 * r * Math.cos(M),
    h
  );
}
function Z(f, a, i, t, M, h) {
  let o = i - f, e = t - a, l = o * e;
  if (M === 0) return _(f, a, i, t, h);
  l !== 0 && (l = (l - M) / (l + l)), K(l <= 1 && l >= 0, "limit angle to |zd|<=xd*yd"), o = Math.floor(o * l + 0.5), e = Math.floor(e * l + 0.5), J(f, a + e, f, a, f + o, a, 1 - l, h), J(f, a + e, f, t, i - o, t, l, h), J(i, t - e, i, t, i - o, t, 1 - l, h), J(i, t - e, i, a, f + o, a, l, h);
}
function _(f, a, i, t, M) {
  let h = Math.abs(i - f), o = Math.abs(t - a), e = o & 1, l = 4 * (1 - h) * o * o, r = 4 * (e + 1) * h * h, n = l + r + e * h * h, c;
  f > i && (f = i, i += h), a > t && (a = t), a += (o + 1) / 2, t = a - e, h = 8 * h * h, e = 8 * o * o;
  do
    M(i, a), M(f, a), M(f, t), M(i, t), c = 2 * n, c <= r && (a++, t--, n += r += h), (c >= l || 2 * n > r) && (f++, i--, n += l += e);
  while (f <= i);
  for (; a - t <= o; )
    M(f - 1, a), M(i + 1, a++), M(f - 1, t), M(i + 1, t--);
}
function x(f, a, i, t) {
  var M = -i, h = 0, o = 2 - 2 * i;
  do
    t(f - M, a + h), t(f - h, a - M), t(f + M, a - h), t(f + h, a + M), i = o, i <= h && (o += ++h * 2 + 1), (i > M || o > h) && (o += ++M * 2 + 1);
  while (M < 0);
}
function aa(f, a, i, t) {
  var M = -i, h = 0, o, e, l, r = 2 - 2 * i;
  i = 1 - r;
  do
    o = 255 * Math.abs(r - 2 * (M + h) - 2) / i, t(f - M, a + h, o), t(f - h, a - M, o), t(f + M, a - h, o), t(f + h, a + M, o), l = r, e = M, r + h > 0 && (o = 255 * (r - 2 * M - 1) / i, o < 256 && (t(f - M, a + h + 1, o), t(f - h - 1, a - M, o), t(f + M, a - h - 1, o), t(f + h + 1, a + M, o)), r += ++M * 2 + 1), l + e <= 0 && (o = 255 * (2 * h + 3 - l) / i, o < 256 && (t(f - e - 1, a + h, o), t(f - h, a - e - 1, o), t(f + e + 1, a - h, o), t(f + h, a + e + 1, o)), r += ++h * 2 + 1);
  while (M < 0);
}
function fa(f, a, i, t, M, h, o) {
  var e = f - i, l = a - t, r = f - 2 * i + M, n;
  e * (M - i) > 0 && (l * (h - t) > 0 && Math.abs((a - 2 * t + h) / r * e) > Math.abs(l) && (f = M, M = e + i, a = h, h = l + t), r = (f - i) / r, n = (1 - r) * ((1 - r) * a + 2 * r * t) + r * r * h, r = (f * M - i * i) * r / (f - i), e = Math.floor(r + 0.5), l = Math.floor(n + 0.5), n = (t - a) * (r - f) / (i - f) + a, N(f, a, e, Math.floor(n + 0.5), e, l, o), n = (t - h) * (r - M) / (i - M) + h, f = i = e, a = l, t = Math.floor(n + 0.5)), (a - t) * (h - t) > 0 && (r = a - 2 * t + h, r = (a - t) / r, n = (1 - r) * ((1 - r) * f + 2 * r * i) + r * r * M, r = (a * h - t * t) * r / (a - t), e = Math.floor(n + 0.5), l = Math.floor(r + 0.5), n = (i - f) * (r - a) / (t - a) + f, N(f, a, Math.floor(n + 0.5), l, e, l, o), n = (i - M) * (r - h) / (t - h) + M, f = e, i = Math.floor(n + 0.5), a = t = l), N(f, a, i, t, M, h, o);
}
function N(f, a, i, t, M, h, o) {
  var e = M - i, l = h - t, r = f - i, n = a - t, c, v, d, b, s = r * l - n * e;
  if (K(r * e <= 0 && n * l <= 0, "sign of gradient must not change"), e * e + l * l > r * r + n * n && (M = f, f = e + i, h = a, a = l + t, s = -s), s != 0) {
    r += e, r *= e = f < M ? 1 : -1, n += l, n *= l = a < h ? 1 : -1, c = 2 * r * n, r *= r, n *= n, s * e * l < 0 && (r = -r, n = -n, c = -c, s = -s), v = 4 * l * s * (i - f) + r - c, d = 4 * e * s * (a - t) + n - c, r += r, n += n, b = v + d + c;
    do {
      if (o(f, a), f == M && a == h) return;
      t = 2 * b < v, 2 * b > d && (f += e, v -= c, b += d += n), t && (a += l, d -= c, b += v += r);
    } while (d < 0 && v > 0);
  }
  T(f, a, M, h, o);
}
function ta(f, a, i, t, M, h, o) {
  var e = f - i, l = a - t, r = f - 2 * i + M, n;
  e * (M - i) > 0 && (l * (h - t) > 0 && Math.abs((a - 2 * t + h) / r * e) > Math.abs(l) && (f = M, M = e + i, a = h, h = l + t), r = (f - i) / r, n = (1 - r) * ((1 - r) * a + 2 * r * t) + r * r * h, r = (f * M - i * i) * r / (f - i), e = Math.floor(r + 0.5), l = Math.floor(n + 0.5), n = (t - a) * (r - f) / (i - f) + a, O(f, a, e, Math.floor(n + 0.5), e, l, o), n = (t - h) * (r - M) / (i - M) + h, f = i = e, a = l, t = Math.floor(n + 0.5)), (a - t) * (h - t) > 0 && (r = a - 2 * t + h, r = (a - t) / r, n = (1 - r) * ((1 - r) * f + 2 * r * i) + r * r * M, r = (a * h - t * t) * r / (a - t), e = Math.floor(n + 0.5), l = Math.floor(r + 0.5), n = (i - f) * (r - a) / (t - a) + f, O(f, a, Math.floor(n + 0.5), l, e, l, o), n = (i - M) * (r - h) / (t - h) + M, f = e, i = Math.floor(n + 0.5), a = t = l), O(f, a, i, t, M, h, o);
}
function O(f, a, i, t, M, h, o) {
  var e = M - i, l = h - t, r = f - i, n = a - t, c, v, d, b, s, u = r * l - n * e;
  if (e * e + l * l > r * r + n * n && (M = f, f = e + i, h = a, a = l + t, u = -u), u != 0) {
    r += e, r *= e = f < M ? 1 : -1, n += l, n *= l = a < h ? 1 : -1, c = 2 * r * n, r *= r, n *= n, u * e * l < 0 && (r = -r, n = -n, c = -c, u = -u), v = 4 * l * (i - f) * u + r - c, d = 4 * e * (a - t) * u + n - c, r += r, n += n, b = v + d + c;
    do {
      if (u = Math.min(v + c, -c - d), s = Math.max(v + c, -c - d), s += 2 * s * u * u / (4 * s * s + u * u), o(f, a, 255 * Math.abs(b - v - d - c) / s), f == M || a == h) break;
      i = f, u = v - b, t = 2 * b + d < 0, 2 * b + v > 0 && (b - d < s && o(f, a + l, 255 * Math.abs(b - d) / s), f += e, v -= c, b += d += n), t && (u < s && o(i + e, a, 255 * Math.abs(u) / s), a += l, d -= c, b += v += r);
    } while (d < v);
  }
  U(f, a, M, h, o);
}
function $(f, a, i, t, M, h, o, e, l) {
  var r, n, c, v = 1;
  let d = f < o ? 1 : -1, b = a < e ? 1 : -1, s = -Math.abs(f + i - M - o), u = s - 4 * d * (i - M), z = d * (f - i - M + o), G = -Math.abs(a + t - h - e), B = G - 4 * b * (t - h), S = b * (a - t - h + e), W, k, j, R, C, E, D, q, g, p, I, H = 0.01;
  if (K(
    (i - f) * (M - o) < H && ((o - f) * (i - M) < H || z * z < u * s + H),
    "slope change"
  ), K(
    (t - a) * (h - e) < H && ((e - a) * (t - h) < H || S * S < B * G + H),
    "slope change"
  ), u == 0 && B == 0)
    return d = Math.floor((3 * i - f + 1) / 2), b = Math.floor((3 * t - a + 1) / 2), N(f, a, d, b, o, e, l);
  i = (i - f) * (i - f) + (t - a) * (t - a) + 1, M = (M - o) * (M - o) + (h - e) * (h - e) + 1;
  do {
    W = u * S - z * B, k = u * G - s * B, j = z * G - s * S, p = W * (W + k - 3 * j) + k * k, r = p > 0 ? 1 : Math.sqrt(1 + 1024 / i), W *= r, k *= r, j *= r, p *= r * r, E = 9 * (W + k + j) / 8, R = 8 * (u - B), q = 27 * (8 * W * (S * S - B * G) + p * (B + 2 * S + G)) / 64 - B * B * (E - B), g = 27 * (8 * W * (z * z - u * s) - p * (u + 2 * z + s)) / 64 - u * u * (E + u), C = 3 * (3 * W * (3 * S * S - B * B - 2 * B * G) - B * (3 * k * (B + S) + B * R)) / 4, D = 3 * (3 * W * (3 * z * z - u * u - 2 * u * s) - u * (3 * k * (u + z) + u * R)) / 4, E = u * B * (6 * W + 6 * k - 3 * j + R), k = B * B, R = u * u, E = 3 * (E + 9 * r * (R * S * G - z * s * k) - 18 * z * S * W) / 8, p < 0 && (q = -q, g = -g, C = -C, D = -D, E = -E, k = -k, R = -R), W = 6 * B * k, k = -6 * u * k, j = 6 * B * R, R = -6 * u * R, q += E, p = q + g, g += E;
    a: for (I = E, n = c = r; f != o && a != e; ) {
      l(f, a);
      do {
        if (q > I || g < I)
          break a;
        t = 2 * p - g, 2 * p >= q && (n--, p += q += C, g += E += k, D += j, C += W), t <= 0 && (c--, p += g += D, q += E += j, C += k, D += R);
      } while (n > 0 && c > 0);
      2 * n <= r && (f += d, n += r), 2 * c <= r && (a += b, c += r), I == E && q < 0 && g > 0 && (I = H);
    }
    C = f, f = o, o = C, d = -d, z = -z, D = a, a = e, e = D, b = -b, S = -S, i = M;
  } while (v--);
  T(
    f,
    a,
    o,
    e,
    l
  );
}
function m(f, a, i, t, M, h, o, e, l) {
  let r, n, c, v = 1, d = f < o ? 1 : -1, b = a < e ? 1 : -1, s = -Math.abs(f + i - M - o), u = s - 4 * d * (i - M), z = d * (f - i - M + o), G = -Math.abs(a + t - h - e), B = G - 4 * b * (t - h), S = b * (a - t - h + e), W, k, j, R, C, E, D, q, g, p, I, H, F, V;
  const L = 0.01;
  if (K(
    (i - f) * (M - o) < L && ((o - f) * (i - M) < L || z * z < u * s + L)
  ), K(
    (t - a) * (h - e) < L && ((e - a) * (t - h) < L || S * S < B * G + L)
  ), u === 0 && B === 0)
    return d = Math.floor((3 * i - f + 1) / 2), b = Math.floor((3 * t - a + 1) / 2), O(f, a, d, b, o, e, l);
  i = (i - f) * (i - f) + (t - a) * (t - a) + 1, M = (M - o) * (M - o) + (h - e) * (h - e) + 1;
  do {
    W = u * S - z * B, k = u * G - s * B, j = z * G - s * S, V = 4 * W * j - k * k, p = W * (W + k - 3 * j) + k * k, r = p > 0 ? 1 : Math.sqrt(1 + 1024 / i), W *= r, k *= r, j *= r, p *= r * r, E = 9 * (W + k + j) / 8, R = 8 * (u - B), q = 27 * (8 * W * (S * S - B * G) + p * (B + 2 * S + G)) / 64 - B * B * (E - B), g = 27 * (8 * W * (z * z - u * s) - p * (u + 2 * z + s)) / 64 - u * u * (E + u), C = 3 * (3 * W * (3 * S * S - B * B - 2 * B * G) - B * (3 * k * (B + S) + B * R)) / 4, D = 3 * (3 * W * (3 * z * z - u * u - 2 * u * s) - u * (3 * k * (u + z) + u * R)) / 4, E = u * B * (6 * W + 6 * k - 3 * j + R), k = B * B, R = u * u, E = 3 * (E + 9 * r * (R * S * G - z * s * k) - 18 * z * S * W) / 8, p < 0 && (q = -q, g = -g, C = -C, D = -D, E = -E, k = -k, R = -R), W = 6 * B * k, k = -6 * u * k, j = 6 * B * R, R = -6 * u * R, q += E, p = q + g, g += E;
    let Q = !1;
    a: for (n = c = r; f !== o && a !== e; ) {
      t = Math.min(Math.abs(E - q), Math.abs(g - E)), F = Math.max(Math.abs(E - q), Math.abs(g - E)), F = r * (F + 2 * F * t * t / (4 * F * F + t * t)), t = 255 * Math.abs(p - (r - n + 1) * q - (r - c + 1) * g + r * E) / F, t < 256 && l(f, a, t), I = Math.abs(p - (r - n + 1) * q + (c - 1) * g), H = Math.abs(p + (n - 1) * q - (r - c + 1) * g), h = a;
      do {
        if (V >= -L && (q + C > E || g + D < E)) {
          Q = !0;
          break a;
        }
        if (t = 2 * p + q, 2 * p + g > 0)
          n--, p += q += C, g += E += k, D += j, C += W;
        else if (t > 0) {
          Q = !0;
          break a;
        }
        t <= 0 && (c--, p += g += D, q += E += j, C += k, D += R);
      } while (n > 0 && c > 0);
      2 * c <= r && (H < F && l(f + d, a, 255 * H / F), a += b, c += r), 2 * n <= r && (I < F && l(f, h + b, 255 * I / F), f += d, n += r);
    }
    Q && (2 * p < g && 2 * c <= r + 2 && (H < F && l(f + d, a, 255 * H / F), a += b), 2 * p > q && 2 * n <= r + 2 && (I < F && l(f, h + b, 255 * I / F), f += d), C = f, f = o, o = C, d = -d, z = -z, D = a, a = e, e = D, b = -b, S = -S, i = M);
    break;
  } while (v--);
  U(f, a, o, e, l);
}
function Y(f, a, i, t, M, h, o, e, l, r) {
  let n = 0, c = 0, v = f + i - M - o, d = v - 4 * (i - M), b = f - i - M + o, s = b + 4 * (i + M), u = a + t - h - e, z = u - 4 * (t - h), G = a - t - h + e, B = G + 4 * (t + h);
  var S = f, W, k, j, R = a, C, E, D;
  let q = b * b - d * v, g;
  const p = [0, 0, 0, 0, 0];
  for (d == 0 ? Math.abs(v) < 2 * Math.abs(b) && (p[n++] = v / (2 * b)) : q > 0 && (g = Math.sqrt(q), q = (b - g) / d, Math.abs(q) < 1 && (p[n++] = q), q = (b + g) / d, Math.abs(q) < 1 && (p[n++] = q)), q = G * G - z * u, z == 0 ? Math.abs(u) < 2 * Math.abs(G) && (p[n++] = u / (2 * G)) : q > 0 && (g = Math.sqrt(q), q = (G - g) / z, Math.abs(q) < 1 && (p[n++] = q), q = (G + g) / z, Math.abs(q) < 1 && (p[n++] = q)), c = 1; c < n; c++)
    (q = p[c - 1]) > p[c] && (p[c - 1] = p[c], p[c] = q, c = 0);
  for (q = -1, p[n] = 1, c = 0; c <= n; c++)
    g = p[c], W = (q * (q * b - 2 * v) - g * (q * (q * d - 2 * b) + v) + s) / 8 - S, C = (q * (q * G - 2 * u) - g * (q * (q * z - 2 * G) + u) + B) / 8 - R, k = (g * (g * b - 2 * v) - q * (g * (g * d - 2 * b) + v) + s) / 8 - S, E = (g * (g * G - 2 * u) - q * (g * (g * z - 2 * G) + u) + B) / 8 - R, S -= j = (g * (g * (3 * b - g * d) - 3 * v) + s) / 8, R -= D = (g * (g * (3 * G - g * z) - 3 * u) + B) / 8, o = Math.floor(j + 0.5), e = Math.floor(D + 0.5), S != 0 && (W *= S = (f - o) / S, k *= S), R != 0 && (C *= R = (a - e) / R, E *= R), (f != o || a != e) && l(f, a, f + W, a + C, f + k, a + E, o, e, r), f = o, a = e, S = j, R = D, q = g;
}
function ra(f, a, i, t, M, h, o, e, l) {
  Y(
    f,
    a,
    i,
    t,
    M,
    h,
    o,
    e,
    $,
    l
  );
}
function oa(f, a, i, t, M, h, o, e, l) {
  Y(
    f,
    a,
    i,
    t,
    M,
    h,
    o,
    e,
    m,
    l
  );
}























/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee",
    ".styl",
    ".html"
  ]
});

require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/drawquickly.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/symbolicdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/symbolicdrawing-things.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/realisticdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/realisticdrawing-things.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/timer.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/interface.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/actions/actions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/actions/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/actions/backtosplash.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/actions/restart.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/about/about.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/about/template.about.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/game.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/template.game.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/splash/splash.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/splash/template.splash.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/mode/mode.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/mode/template.mode.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/difficulty/difficulty.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/difficulty/template.difficulty.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/speed/speed.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/speed/template.speed.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/complexity/complexity.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/complexity/template.complexity.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/thing/thing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/thing/template.thing.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/instructions/instructions.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/instructions/template.instructions.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/draw.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/symbolicdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/template.symbolicdrawing.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/things/things.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/symbolicdrawing/things/template.things.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/realisticdrawing/realisticdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/realisticdrawing/template.realisticdrawing.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/canvas/canvas.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/canvas/template.canvas.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/timer/timer.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/draw/timer/template.timer.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/results/results.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/results/symbolicdrawing/symbolicdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/results/symbolicdrawing/template.symbolicdrawing.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/results/realisticdrawing/realisticdrawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/results/realisticdrawing/template.realisticdrawing.js");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/results/drawing/drawing.coffee");
require("/node_modules/meteor/retronator:pixelartacademy-pixeltosh-drawquickly/interface/game/results/drawing/template.drawing.js");

/* Exports */
Package._define("retronator:pixelartacademy-pixeltosh-drawquickly", {
  PixelArtAcademy: PixelArtAcademy
});

})();
