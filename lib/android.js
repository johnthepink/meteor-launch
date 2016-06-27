"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareApk = function prepareApk(env, cb) {
  return new Promise(function (resolve, reject) {
    if (!_util2.default.hasPlatform("android")) {
      console.log("Skipping Android APK preparation...");
      return resolve();
    }

    console.log("Removing existing apk...");
    try {
      (0, _child_process.execSync)("rm .build/android/production.apk", {
        stdio: [0, 1, 2],
        env: env
      });
    } catch (error) {
      console.log("No apk to remove...");
    }

    console.log("Signing Android apk...");
    var signCommand = "\n      jarsigner -verbose         -sigalg SHA1withRSA         -digestalg SHA1         -storepass $ANDROID_STORE_PASS         .build/android/release-unsigned.apk         $ANDROID_KEY\n    ";
    (0, _child_process.execSync)(signCommand, {
      stdio: [0, 1, 2],
      env: env
    });

    console.log("Aligning Android apk...");
    var alignCommand = "\n      $ANDROID_ZIPALIGN 4         .build/android/release-unsigned.apk         .build/android/production.apk\n    ";
    (0, _child_process.execSync)(alignCommand, {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve();
  });
};

exports.default = {
  prepareApk: prepareApk
};