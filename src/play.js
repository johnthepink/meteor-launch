"use strict";

const ExecSync = require('child_process').execSync;

function uploadPlayStore(env, cb) {

  console.log('Uploading to Google Play Store...');
  const playCommand = `
    playup \
      --auth $PLAY_API_KEY \
      $ANDROID_BUILD_FOLDER/production.apk
  `
  ExecSync(playCommand, {
    stdio: [0,1,2],
    env: env
  });

  cb();
}

module.exports = {
  uploadPlayStore: uploadPlayStore
}
