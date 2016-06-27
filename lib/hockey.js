"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadIOS = function uploadIOS(env, cb) {
  return new Promise(function (resolve, reject) {
    if (!_util2.default.hasPlatform("ios")) {
      console.log("Skipping iOS upload to Hockey...");
      return resolve();
    }

    console.log("Uploading iOS to Hockey...");

    (0, _child_process.execSync)("fastlane ios hockey", {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve();
  });
};

var uploadAndroid = function uploadAndroid(env, cb) {
  return new Promise(function (resolve, reject) {
    if (!_util2.default.hasPlatform("android")) {
      console.log("Skipping Android upload to Hockey...");
      return resolve();
    }

    console.log("Uploading Android to Hockey...");

    var uploadCommand = "\n      curl -F \"status=2\"         -F \"notify=0\"         -F \"ipa=@$ANDROID_BUILD_FOLDER/production.apk\"         -H \"X-HockeyAppToken: $ANDROID_HOCKEY_TOKEN\"         https://rink.hockeyapp.net/api/2/apps/" + env.ANDROID_HOCKEY_ID + "/app_versions/upload\n    ";
    (0, _child_process.execSync)(uploadCommand, {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve();
  });
};

exports.default = {
  uploadIOS: uploadIOS,
  uploadAndroid: uploadAndroid
};