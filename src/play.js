import { execSync } from "child_process";
import Util from "./util";

const uploadPlayStore = (env) => (
  new Promise((resolve) => {
    if (!Util.hasPlatform("android")) {
      console.log("Skipping Android upload to Play Store...");
      return resolve();
    }

    try {
      execSync("which playup");
    } catch (e) {
      console.log("Installing playup...");
      execSync("npm install -g playup");
    }

    console.log("Uploading to Google Play Store...");
    const playCommand = `
      playup \
        --auth $PLAY_AUTH_FILE \
        $ANDROID_BUILD_FOLDER/production.apk
    `;
    execSync(playCommand, {
      stdio: [0, 1, 2],
      env,
    });

    return resolve();
  })
);

export default {
  uploadPlayStore,
};
