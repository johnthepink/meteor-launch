#!/usr/bin/env node
"use strict";

const Vorpal = require('vorpal')(),
      Path = require('path'),
      _ = require('underscore');

const Meteor = require('./meteor'),
      Hockey = require('./hockey'),
      iTunes = require('./iTunes'),
      Android = require('./android'),
      Play = require('./play'),
      Util = require('./util');

let launchFile, launchVars, otherVars, superEnv;

if (Util.launchFile()) {
  launchFile = Path.join(process.cwd(), 'launch.json');
  launchVars = require(launchFile);
  otherVars = {
    SIGH_OUTPUT_PATH: process.cwd(),
    GYM_OUTPUT_DIRECTORY: process.cwd(),
    FL_REPORT_PATH: Path.join(process.cwd(), '.build', 'ios')
  };
  superEnv = _.extend(launchVars, otherVars, process.env);
}

Vorpal
  .command('test', 'test the thing')
  .action(function(args) {
    console.log('testing');
  });

Vorpal
  .command('init', 'Generates launch.json file for environment vars')
  .action(function(args) {
    Util.init(superEnv, (result) => {
      console.log(result);
    })
  });

Vorpal
  .command('import', 'Import certificates')
  .action(function(args) {
    Util.importCerts(superEnv, (result) => {
      return
    })
  });

Vorpal
  .command('build', 'Builds the Meteor app in the .build folder')
  .action(function(args) {
    Meteor.build(superEnv, (result) => {
      return
    })
  });

Vorpal
  .command('hockey', 'Build and deploy to Hockey')
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

Vorpal
  .command('testflight', 'Build and deploy to TestFlight')
  .action(function(args) {
    Util.addFastfile(superEnv, (result) => {
      iTunes.uploadTestFlight(superEnv, (result) => {
        return
      })
    })
  });

Vorpal
  .command('appstore', 'Build and deploy to iTunes App Store')
  .action(function(args) {
    Util.addFastfile(superEnv, (result) => {
      iTunes.uploadAppStore(superEnv, (result) => {
        return
      })
    })
  });

Vorpal
  .command('playstore', 'Build and deploy to Google Play Store')
  .action(function(args) {
    Android.prepareApk(superEnv, (result) => {
      Play.uploadPlayStore(superEnv, (result) => {
        return
      })
    })
  });

Vorpal
  .command('production', 'Build and deploy to iTunes and Play')
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

Vorpal
  .parse(process.argv);
