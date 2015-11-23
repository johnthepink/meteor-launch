#!/usr/bin/env node
"use strict";

const Vorpal = require('vorpal')(),
      Path = require('path');

const Meteor = require('./lib/meteor'),
      Hockey = require('./lib/hockey');

const launchFile = Path.join(process.cwd(), 'launch.json');
const launchVars = require(launchFile);

Vorpal
  .command('build', 'Builds the Meteor app in the .build folder')
  .action(function(args) {
    Meteor.build(launchVars, (result) => {
      return
    })
  });

Vorpal
  .command('hockey', 'Build and deploy to Hockey')
  .action(function(args) {
    Meteor.build(launchVars, (result) => {
      Hockey.upload(launchVars, (result) => {
        return
      })
    })
  });


Vorpal
  .parse(process.argv);

