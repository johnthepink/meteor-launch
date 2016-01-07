"use strict";

const ExecSync = require('child_process').execSync;

function uploadTestFlight(env, cb) {
  console.log('Uploading to TestFlight...');

  ExecSync('./.notfastlane/bin/fastlane ios beta', {
    stdio: [0,1,2],
    env: env
  });
  cb();
}

function uploadAppStore(env, cb) {
  console.log('Uploading to iTunes...');

  ExecSync('fastlane ios deploy', {
    stdio: [0,1,2],
    env: env
  });
  cb();
}

module.exports = {
  uploadTestFlight: uploadTestFlight,
  uploadAppStore: uploadAppStore
}
