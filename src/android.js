import { execSync } from "child_process";
import Util from "./util";

const prepareApk = (env) => (
  new Promise((resolve) => {
    if (!Util.hasPlatform("android")) {
      console.log("Skipping Android APK preparation...");
      return resolve();
    }

    console.log("Removing existing apk...");
    try {
      execSync("rm .build/android/production.apk", {
        stdio: [0, 1, 2],
        env,
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
    `;
    execSync(signCommand, {
      stdio: [0, 1, 2],
      env,
    });

    console.log("Aligning Android apk...");
    const alignCommand = `
      $ANDROID_ZIPALIGN 4 \
        .build/android/release-unsigned.apk \
        .build/android/production.apk
    `;
    execSync(alignCommand, {
      stdio: [0, 1, 2],
      env,
    });

    return resolve();
  })
);

export default {
  prepareApk,
};
