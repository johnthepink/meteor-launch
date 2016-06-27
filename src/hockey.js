import { execSync as ExecSync } from "child_process";

const uploadIOS = (env, cb) => {
  console.log("Uploading to Hockey...");

  ExecSync("fastlane ios hockey", {
    stdio: [0,1,2],
    env: env,
  });
  cb();
}

const uploadAndroid = (env, cb) => {
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

  cb();

}

export default {
  uploadIOS,
  uploadAndroid,
}
