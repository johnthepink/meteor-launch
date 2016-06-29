import { execSync } from "child_process";
import util from "./util";

const uploadTestFlight = (env) => (
  new Promise((resolve) => {
    if (!util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to TestFlight...");
      return resolve();
    }

    console.log("Uploading iOS to TestFlight...");

    execSync("fastlane ios beta", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve();
  })
);

const uploadAppStore = (env) => (
  new Promise((resolve) => {
    if (!util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to iTunes...");
      return resolve();
    }

    console.log("Uploading to iTunes...");

    execSync("fastlane ios deploy", {
      stdio: [0, 1, 2],
      env,
    });

    return resolve();
  })
);

export default {
  uploadTestFlight,
  uploadAppStore,
};
