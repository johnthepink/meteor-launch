import { execSync as ExecSync } from "child_process";

const uploadTestFlight = (env) => {
  return new Promise((resolve, reject) => {
    console.log('Uploading to TestFlight...');

    ExecSync('fastlane ios beta', {
      stdio: [0,1,2],
      env: env,
    });

    return resolve();
  });
}

const uploadAppStore = (env) => {
  return new Promise((resolve, reject) => {
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
