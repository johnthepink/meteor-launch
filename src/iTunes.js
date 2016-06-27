import { execSync as ExecSync } from "child_process";
import Util from "./util";

const uploadTestFlight = (env) => {
  return new Promise((resolve, reject) => {
    if (!Util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to TestFlight...");
      return resolve();
    }

    console.log('Uploading iOS to TestFlight...');

    ExecSync('fastlane ios beta', {
      stdio: [0,1,2],
      env: env,
    });

    return resolve();
  });
}

const uploadAppStore = (env) => {
  return new Promise((resolve, reject) => {
    if (!Util.hasPlatform("ios")) {
      console.log("Skipping iOS upload to iTunes...");
      return resolve();
    }

    console.log('Uploading to iTunes...');

    ExecSync('fastlane ios deploy', {
      stdio: [0,1,2],
      env: env,
    });

    return resolve();
  });
}

export default {
  uploadTestFlight,
  uploadAppStore,
}
