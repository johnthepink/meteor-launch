import { execSync as ExecSync } from "child_process";

function uploadTestFlight(env, cb) {
  console.log('Uploading to TestFlight...');

  ExecSync('fastlane ios beta', {
    stdio: [0,1,2],
    env: env,
  });
  cb();
}

function uploadAppStore(env, cb) {
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
