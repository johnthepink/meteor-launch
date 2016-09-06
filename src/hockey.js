import { execSync } from "child_process";
import android from "./android";
import util from "./util";

const uploadIOS = (env) => (
  new Promise((resolve) => {
    if (!util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to Hockey...");
      return resolve("skipped");
    }

    console.log("Uploading iOS to Hockey...");

    execSync("fastlane ios hockey", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve("uploaded");
  })
);

const uploadAndroid = (env) => (
  new Promise((resolve) => {
    if (!util.hasPlatform("android")) {
      console.log("Skipping Android upload to Hockey...");
      return resolve("skipped");
    }

    const getCommand = (path) => (
      `
        curl -F "status=2" \
          -F "notify=0" \
          -F "ipa=@${path}" \
          -H "X-HockeyAppToken: $ANDROID_HOCKEY_TOKEN" \
          https://rink.hockeyapp.net/api/2/apps/${env.ANDROID_HOCKEY_ID}/app_versions/upload
      `
    );

    console.log("Uploading Android to Hockey...");

    const isCrosswalk = android.findCrosswalkApks();

    const commands = isCrosswalk ?
    [
      getCommand(android.signedApks.crosswalkArmv7),
      getCommand(android.signedApks.crosswalkX86),
    ] :
      [getCommand(android.signedApks.regular)]
    ;

    commands.map((command) => (
      execSync(command, {
        stdio: [0, 1, 2],
        env,
      })
    ));

    return resolve("uploaded");
  })
);

export default {
  uploadIOS,
  uploadAndroid,
};
