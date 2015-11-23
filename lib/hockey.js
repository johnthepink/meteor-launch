"use strict";

const ExecSync = require('child_process').execSync,
      _ = require('underscore');

function upload(env, cb) {
  console.log('Uploading to Hockey...');

  env = _.extend(env, process.env);

  ExecSync('fastlane ios hockey', {
    stdio: [0,1,2],
    env: env
  });
  cb();
}

module.exports = {
  upload: upload
}
