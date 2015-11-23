"user strict";

const ExecSync = require('child_process').execSync;

function prepareApk(env, cb) {
  console.log('Removing existing apk...');
  try {
    ExecSync('rm $ANDROID_BUILD/production.apk', {
      stdio: [0,1,2],
      env: env
    });
  } catch (error) {
    console.log('No apk to remove...');
  }

  console.log('Signing Android apk...');
  const signCommand = `
    jarsigner -verbose \
      -sigalg SHA1withRSA \
      -digestalg SHA1 \
      -storepass $ANDROID_STORE_PASS \
      $ANDROID_BUILD/release-unsigned.apk \
      $ANDROID_KEY
  `
  ExecSync(signCommand, {
    stdio: [0,1,2],
    env: env
  });

  console.log('Aligning Android apk...');
  const alignCommand = `
    $ANDROID_ZIPALIGN 4 \
      $ANDROID_BUILD/release-unsigned.apk \
      $ANDROID_BUILD/production.apk
  `
  ExecSync(alignCommand, {
    stdio: [0,1,2],
    env: env
  });

  cb();
}

module.exports = {
  prepareApk: prepareApk
}
