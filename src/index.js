#!/usr/bin/env node

import Vorpal from "vorpal";
import Path from "path";
import { extend } from "underscore";

import Meteor from "./meteor";
import Hockey from "./hockey";
import iTunes from "./iTunes";
import Android from "./android";
import Play from "./play";
import Util from "./util";

const Launch = Vorpal();

let launchFile, launchVars, otherVars, superEnv;

if (Util.launchFile()) {
  launchFile = Path.join(process.cwd(), "launch.json");
  launchVars = require(launchFile);
  otherVars = {
    SIGH_OUTPUT_PATH: process.cwd(),
    GYM_OUTPUT_DIRECTORY: process.cwd(),
    FL_REPORT_PATH: Path.join(process.cwd(), ".build", "ios")
  };
  superEnv = extend(launchVars, otherVars, process.env);
}

Launch
  .command("test", "test the thing")
  .action(function(args) {
    console.log("testing");
  });

Launch
  .command("init", "Generates launch.json file for environment vars")
  .action(function(args) {
    Util.init(superEnv, (result) => {
      console.log(result);
    })
  });

Launch
  .command("import", "Import certificates")
  .action(function(args) {
    Util.importCerts(superEnv, (result) => {
      return
    })
  });

Launch
  .command("build", "Builds the Meteor app in the .build folder")
  .action(function(args) {
    Meteor.build(superEnv, (result) => {
      return
    })
  });

Launch
  .command("hockey", "Build and deploy to Hockey")
  .action(function(args) {
    Util.addFastfile(superEnv, (result) => {
      Android.prepareApk(superEnv, (result) => {
        Hockey.uploadAndroid(superEnv, (result) => {
          Hockey.uploadIOS(superEnv, (result) => {
            return
          })
        })
      })
    })
  });

Launch
  .command("testflight", "Build and deploy to TestFlight")
  .action(function(args) {
    Util.addFastfile(superEnv, (result) => {
      iTunes.uploadTestFlight(superEnv, (result) => {
        return
      })
    })
  });

Launch
  .command("appstore", "Build and deploy to iTunes App Store")
  .action(function(args) {
    Util.addFastfile(superEnv, (result) => {
      iTunes.uploadAppStore(superEnv, (result) => {
        return
      })
    })
  });

Launch
  .command("playstore", "Build and deploy to Google Play Store")
  .action(function(args) {
    Android.prepareApk(superEnv, (result) => {
      Play.uploadPlayStore(superEnv, (result) => {
        return
      })
    })
  });

Launch
  .command("production", "Build and deploy to iTunes and Play")
  .action(function(args) {
    Util.addFastfile(superEnv, (result) => {
      Android.prepareApk(superEnv, (result) => {
        Play.uploadPlayStore(superEnv, (result) => {
          iTunes.uploadAppStore(superEnv, (result) => {
            return
          })
        })
      })
    })
  });

Launch
  .parse(process.argv);
