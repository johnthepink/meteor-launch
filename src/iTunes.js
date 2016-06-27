import { execSync as ExecSync } from "child_process";

const uploadTestFlight = (env, cb) => {
  console.log('Uploading to TestFlight...');

  ExecSync('fastlane ios beta', {
    stdio: [0,1,2],
    env: env,
  });
  cb();
}

const uploadAppStore = (env, cb) => {
  console.log('Uploading to iTunes...');

  ExecSync('fastlane ios deploy', {
    stdio: [0,1,2],
    env: env,
  });
  cb();
}

export default {
  uploadTestFlight,
  uploadAppStore,
}
