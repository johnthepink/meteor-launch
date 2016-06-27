import { execSync as ExecSync } from "child_process";
import Util from "./util";

const prepareApk = (env, cb) => {
  return new Promise((resolve, reject) => {
    if (!Util.hasPlatform("android")) {
      console.log("Skipping Android APK preparation...");
      return resolve();
    }

    console.log("Removing existing apk...");
    try {
      ExecSync("rm .build/android/production.apk", {
        stdio: [0,1,2],
        env: env,
      });
    } catch (error) {
      console.log("No apk to remove...");
    }

    console.log("Signing Android apk...");
    const signCommand = `
      jarsigner -verbose \
        -sigalg SHA1withRSA \
        -digestalg SHA1 \
        -storepass $ANDROID_STORE_PASS \
        .build/android/release-unsigned.apk \
        $ANDROID_KEY
    `
    ExecSync(signCommand, {
      stdio: [0,1,2],
      env: env,
    });

    console.log("Aligning Android apk...");
    const alignCommand = `
      $ANDROID_ZIPALIGN 4 \
        .build/android/release-unsigned.apk \
        .build/android/production.apk
    `
    ExecSync(alignCommand, {
      stdio: [0,1,2],
      env: env,
    });

    return resolve();

  });
}

export default {
  prepareApk,
}
