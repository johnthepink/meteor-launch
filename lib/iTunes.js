"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadTestFlight = function uploadTestFlight(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("ios")) {
      console.log("Skipping iOS upload to TestFlight...");
      return resolve();
    }

    console.log("Uploading iOS to TestFlight...");

    (0, _child_process.execSync)("fastlane ios beta", {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve();
  });
};

var uploadAppStore = function uploadAppStore(env) {
  return new Promise(function (resolve) {
    if (!_util2.default.hasPlatform("ios")) {
      console.log("Skipping iOS upload to iTunes...");
      return resolve();
    }

    console.log("Uploading to iTunes...");

    (0, _child_process.execSync)("fastlane ios deploy", {
      stdio: [0, 1, 2],
      env: env
    });

    return resolve();
  });
};

exports.default = {
  uploadTestFlight: uploadTestFlight,
  uploadAppStore: uploadAppStore
};