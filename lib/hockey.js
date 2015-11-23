"use strict";

const ExecSync = require('child_process').execSync;

function upload(env, cb) {
  console.log('Uploading to Hockey...');

  ExecSync('fastlane ios hockey', {
    stdio: [0,1,2],
    env: env
  });
  cb();
}

module.exports = {
  upload: upload
}
