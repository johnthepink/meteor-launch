"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadPlayStore = function uploadPlayStore(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("android")) {
      console.log("Skipping Android upload to Play Store...");
      return resolve();
    }

    console.log("Uploading to Google Play Store...");
    var playCommand = "\n      playup         --auth $PLAY_API_KEY         $ANDROID_BUILD_FOLDER/production.apk\n    ";
    (0, _child_process.execSync)(playCommand, {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve();
  });
};

exports.default = {
  uploadPlayStore: uploadPlayStore
};