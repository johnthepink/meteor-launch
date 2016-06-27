import { execSync } from "child_process";
import Util from "./util";

const uploadIOS = (env) => (
  new Promise((resolve) => {
    if (!Util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to Hockey...");
      return resolve();
    }

    console.log("Uploading iOS to Hockey...");

    execSync("fastlane ios hockey", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve();
  })
);

const uploadAndroid = (env) => (
  new Promise((resolve) => {
    if (!Util.hasPlatform("android")) {
      console.log("Skipping Android upload to Hockey...");
      return resolve();
    }

    console.log("Uploading Android to Hockey...");

    const uploadCommand = `
      curl -F "status=2" \
        -F "notify=0" \
        -F "ipa=@$ANDROID_BUILD_FOLDER/production.apk" \
        -H "X-HockeyAppToken: $ANDROID_HOCKEY_TOKEN" \
        https://rink.hockeyapp.net/api/2/apps/${env.ANDROID_HOCKEY_ID}/app_versions/upload
    `;
    execSync(uploadCommand, {
      stdio: [0, 1, 2],
      env,
    });

    return resolve();
  })
);

export default {
  uploadIOS,
  uploadAndroid,
};
