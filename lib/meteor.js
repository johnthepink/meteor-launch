"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require("child_process");

var build = function build(env) {
  return new Promise(function (resolve, reject) {

    var meteorPath = process.cwd();
    var meteorServer = process.argv[1];

    if (meteorServer === undefined) {
      return reject("Please provide a server as the second argument");
    }

    var buildAction = "meteor build .build --architecture os.linux.x86_64 --server " + meteorServer;
    if (process.argv[2]) {
      buildAction += " --mobile-settings " + process.argv[2];
    }

    try {
      console.log("Building meteor...");
      (0, _child_process.execSync)(buildAction, {
        stdio: [0, 1, 2]
      });

      // opening xcode ensures the schemes exist for the project
      console.log("Opening Xcode :( ...");
      (0, _child_process.execSync)("open $XCODE_PROJECT", {
        stdio: [0, 1, 2],
        env: env
      });
      (0, _child_process.execSync)("sleep 5");

      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

exports.default = {
  build: build
};