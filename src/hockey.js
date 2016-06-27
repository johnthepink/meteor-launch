import { execSync as ExecSync } from "child_process";

const uploadIOS = (env, cb) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading to Hockey...");

    ExecSync("fastlane ios hockey", {
      stdio: [0,1,2],
      env: env,
    });

    return resolve();
  });
}

const uploadAndroid = (env, cb) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading to Hockey");

    const uploadCommand = `
      curl -F "status=2" \
        -F "notify=0" \
        -F "ipa=@$ANDROID_BUILD_FOLDER/production.apk" \
        -H "X-HockeyAppToken: $ANDROID_HOCKEY_TOKEN" \
        https://rink.hockeyapp.net/api/2/apps/${env.ANDROID_HOCKEY_ID}/app_versions/upload
    `
    ExecSync(uploadCommand, {
      stdio: [0,1,2],
      env: env,
    });

    return resolve();

  });

}

export default {
  uploadIOS,
  uploadAndroid,
}
