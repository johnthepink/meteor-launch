"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var cleanLaunchFile = function cleanLaunchFile() {
  try {
    (0, _child_process.execSync)("rm launch.json", {
      stdio: [0]
    });
  } catch (e) {
    // no launch file
  }
};

exports.default = {
  cleanLaunchFile: cleanLaunchFile
};