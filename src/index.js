#!/usr/bin/env node

import vorpal from "vorpal";
import {
  join,
  resolve,
} from "path";
import { extend } from "underscore";

import meteor from "./meteor";
import hockey from "./hockey";
import iTunes from "./iTunes";
import android from "./android";
import play from "./play";
import util from "./util";

const Launch = vorpal();

let launchFile;
let launchVars;
let otherVars;
let superEnv;

if (util.launchFile()) {
  launchFile = join(process.cwd(), "launch.json");
  // eslint-disable-next-line global-require
  launchVars = require(launchFile);
  otherVars = {
    SIGH_OUTPUT_PATH: process.cwd(),
    GYM_OUTPUT_DIRECTORY: process.cwd(),
    FL_REPORT_PATH: join(process.cwd(), ".build", "ios"),
    // convert relative paths to abslute
    XCODE_PROJECT: resolve(launchVars.XCODE_PROJECT),
  };
  superEnv = extend(launchVars, otherVars, process.env);
}

Launch
  .command("test", "test the thing")
  .action(() => {
    console.log("testing");
  });

Launch
  .command("init", "Generates launch.json file for environment vars")
  .action(() => {
    util.init(superEnv)
      .then(result => console.log(result))
      .catch(error => console.log(error.message));
  });

Launch
  .command("import", "Import certificates")
  .action(() => {
    util.importCerts(superEnv)
      .catch(error => console.log(error));
  });

Launch
  .command("build", "Builds the Meteor app in the .build folder")
  .action(() => {
    meteor.build(superEnv)
      .catch(error => console.log(error));
  });

Launch
  .command("hockey", "Deploy to Hockey")
  .action(() => {
    util.addFastfile()
      .then(() => android.prepareApk(superEnv))
      .then(() => hockey.uploadAndroid(superEnv))
      .then(() => hockey.uploadIOS(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("testflight", "Deploy to TestFlight")
  .action(() => {
    util.addFastfile()
      .then(() => iTunes.uploadTestFlight(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("appstore", "Deploy to iTunes App Store")
  .action(() => {
    util.addFastfile()
      .then(() => iTunes.uploadAppStore(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .command("playstore", "Deploy to Google Play Store")
  .action(() => {
    android.prepareApk(superEnv)
      .then(() => play.uploadPlayStore(superEnv))
      .catch(error => console.log(error.message));
  });

Launch
  .command("production", "Deploy to iTunes and Play")
  .action(() => {
    util.addFastfile()
      .then(() => android.prepareApk(superEnv))
      .then(() => play.uploadPlayStore(superEnv))
      .then(() => iTunes.uploadAppStore(superEnv))
      .then(() => util.removeFastfile())
      .catch(error => console.log(error.message));
  });

Launch
  .parse(process.argv);
