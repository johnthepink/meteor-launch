import { execSync } from "child_process";
import android from "./android";
import util from "./util";

const uploadPlayStore = (env) => (
  new Promise((resolve) => {
    if (!util.hasPlatform("android")) {
      console.log("Skipping Android upload to Play Store...");
      return resolve();
    }

    try {
      execSync("which playup");
    } catch (e) {
      console.log("Installing playup...");
      execSync("npm install -g playup");
    }

    const getCommand = (path) => (
      `
        playup \
          --auth $PLAY_AUTH_FILE \
          ${path}
      `
    );

    console.log("Uploading to Google Play Store...");

    const isCrosswalk = android.findCrosswalkApks();

    const commands = isCrosswalk ?
    [
      getCommand(android.signedApks.crosswalkArmv7),
      getCommand(android.signedApks.crosswalkX86),
    ] :
      [getCommand(android.signedApks.regular)]
    ;

    commands.map((command) => {
      execSync(command, {
        stdio: [0, 1, 2],
        env,
      });
    });

    return resolve();
  })
);

export default {
  uploadPlayStore,
};
