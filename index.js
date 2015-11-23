#!/usr/bin/env node
"use strict";

const Vorpal = require('vorpal')(),
      Path = require('path'),
      _ = require('underscore');

const Meteor = require('./lib/meteor'),
      Hockey = require('./lib/hockey');

const launchFile = Path.join(process.cwd(), 'launch.json');
const launchVars = require(launchFile);
const superEnv = _.extend(env, process.env);

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
    Meteor.build(launchVars, (result) => {
      Hockey.upload(superEnv, (result) => {
        return
      })
    })
  });


Vorpal
  .parse(process.argv);

