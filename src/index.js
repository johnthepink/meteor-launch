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
    FL_REPORT_PATH: Path.join(process.cwd(), ".build", "ios"),
    // convert relative paths to abslute
    XCODE_PROJECT: Path.resolve(launchVars.XCODE_PROJECT),
  };
  superEnv = extend(launchVars, otherVars, process.env);
}

Launch
  .command("test", "test the thing")
  .action((args) => {
    console.log("testing");
  });

Launch
  .command("init", "Generates launch.json file for environment vars")
  .action((args) => {
    Util.init(superEnv)
      .then(result => console.log(result))
      .catch(error => console.log(error.message));
  });

Launch
  .command("import", "Import certificates")
  .action((args) => {
    Util.importCerts(superEnv)
      .catch(error => console.log(error));
  });

Launch
  .command("build", "Builds the Meteor app in the .build folder")
  .action((args) => {
    Meteor.build(superEnv)
      .catch(error => console.log(error));
  });

Launch
  .command("hockey", "Build and deploy to Hockey")
  .action((args) => {
    Util.addFastfile()
      .then(() => Android.prepareApk(superEnv))
      .then(() => Hockey.uploadAndroid(superEnv))
      .then(() => Hockey.uploadIOS(superEnv))
      .then(() => Util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("testflight", "Build and deploy to TestFlight")
  .action((args) => {
    Util.addFastfile()
      .then(() => iTunes.uploadTestFlight(superEnv))
      .then(() => Util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("appstore", "Build and deploy to iTunes App Store")
  .action((args) => {
    Util.addFastfile()
      .then(() => iTunes.uploadAppStore(superEnv))
      .then(() => Util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("playstore", "Build and deploy to Google Play Store")
  .action((args) => {
    Android.prepareApk(superEnv)
      .then(() => Play.uploadPlayStore(superEnv))
      .catch(error => console.log(error.message));
  });

Launch
  .command("production", "Build and deploy to iTunes and Play")
  .action((args) => {
    Util.addFastfile()
      .then(() => Android.prepareApk(superEnv))
      .then(() => Play.uploadPlayStore(superEnv))
      .then(() => iTunes.uploadAppStore(superEnv))
      .then(() => Util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .parse(process.argv);
