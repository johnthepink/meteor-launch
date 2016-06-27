#!/usr/bin/env node
"use strict";

var _vorpal = require("vorpal");

var _vorpal2 = _interopRequireDefault(_vorpal);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _underscore = require("underscore");

var _meteor = require("./meteor");

var _meteor2 = _interopRequireDefault(_meteor);

var _hockey = require("./hockey");

var _hockey2 = _interopRequireDefault(_hockey);

var _iTunes = require("./iTunes");

var _iTunes2 = _interopRequireDefault(_iTunes);

var _android = require("./android");

var _android2 = _interopRequireDefault(_android);

var _play = require("./play");

var _play2 = _interopRequireDefault(_play);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Launch = (0, _vorpal2.default)();

var launchFile = void 0;
var launchVars = void 0;
var otherVars = void 0;
var superEnv = void 0;

if (_util2.default.launchFile()) {
  launchFile = _path2.default.join(process.cwd(), "launch.json");
  // eslint-disable-next-line global-require
  launchVars = require(launchFile);
  otherVars = {
    SIGH_OUTPUT_PATH: process.cwd(),
    GYM_OUTPUT_DIRECTORY: process.cwd(),
    FL_REPORT_PATH: _path2.default.join(process.cwd(), ".build", "ios"),
    // convert relative paths to abslute
    XCODE_PROJECT: _path2.default.resolve(launchVars.XCODE_PROJECT)
  };
  superEnv = (0, _underscore.extend)(launchVars, otherVars, process.env);
}

Launch.command("test", "test the thing").action(function () {
  console.log("testing");
});

Launch.command("init", "Generates launch.json file for environment vars").action(function () {
  _util2.default.init(superEnv).then(function (result) {
    return console.log(result);
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("import", "Import certificates").action(function () {
  _util2.default.importCerts(superEnv).catch(function (error) {
    return console.log(error);
  });
});

Launch.command("build", "Builds the Meteor app in the .build folder").action(function () {
  _meteor2.default.build(superEnv).catch(function (error) {
    return console.log(error);
  });
});

Launch.command("hockey", "Build and deploy to Hockey").action(function () {
  _util2.default.addFastfile().then(function () {
    return _android2.default.prepareApk(superEnv);
  }).then(function () {
    return _hockey2.default.uploadAndroid(superEnv);
  }).then(function () {
    return _hockey2.default.uploadIOS(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("testflight", "Build and deploy to TestFlight").action(function () {
  _util2.default.addFastfile().then(function () {
    return _iTunes2.default.uploadTestFlight(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("appstore", "Build and deploy to iTunes App Store").action(function () {
  _util2.default.addFastfile().then(function () {
    return _iTunes2.default.uploadAppStore(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("playstore", "Build and deploy to Google Play Store").action(function () {
  _android2.default.prepareApk(superEnv).then(function () {
    return _play2.default.uploadPlayStore(superEnv);
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.command("production", "Build and deploy to iTunes and Play").action(function () {
  _util2.default.addFastfile().then(function () {
    return _android2.default.prepareApk(superEnv);
  }).then(function () {
    return _play2.default.uploadPlayStore(superEnv);
  }).then(function () {
    return _iTunes2.default.uploadAppStore(superEnv);
  }).then(function () {
    return _util2.default.removeFastfile();
  }).catch(function (error) {
    return console.log(error.message);
  });
});

Launch.parse(process.argv);