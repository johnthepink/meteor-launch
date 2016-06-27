import Path from "path";
import Fs from "fs";
import { execSync as ExecSync } from "child_process";

const init = (env, cb) => {
  const launchFile = Path.join(process.cwd(), "launch.json");

  try {
    ExecSync("which fastlane");
  }
  catch (e) {
    console.log("Installing fastlane...");
    ExecSync("sudo gem install fastlane");
  }

  Fs.stat(launchFile, (err, stats) => {

    // file not found
    if (err) {
      const exampleLaunchFile = Path.join(__dirname, "../assets/launch.json");
      const targetLaunchFile = Path.join(process.cwd(), "launch.json");

      let contents = Fs.readFileSync(exampleLaunchFile);

      Fs.writeFileSync(targetLaunchFile, contents)

      cb("launch.json created. Open it and fill out the vars");
    }

    // dont overwrite
    else {
      cb("launch.json already exists");
    }

  });
}

const launchFile = () => {
  // fail silently if trying to init
  if (process.argv[2] === "init") return;
  try {
    Fs.statSync(`${process.cwd()}/launch.json`);
  }
  catch (e) {
    console.log("launch.json not found. Please run: launch init");
    process.exit();
  }
  return true
}

const addFastfile = (env, cb) => {
  const fastfileLocation = Path.join(__dirname, "..", "fastlane", "Fastfile");
  const fastfileTarget = Path.join(process.cwd(), "Fastfile");

  let contents = Fs.readFileSync(fastfileLocation);

  Fs.writeFileSync(fastfileTarget, contents);
  cb("Fastfile written...");
}

const removeFastfile = (env, cb) => {
  const fastfileTarget = Path.join(process.cwd(), "Fastfile");

  Fs.unlinkSync(fastfileTarget);
  cb("Fastfile deleted...");
}

const importCerts = (env, cb) => {
  console.log("Importing certs...");

  ExecSync("fastlane import", {
    stdio: [0,1,2],
    env: env,
  });
  cb();

}

export default {
  launchFile,
  init,
  importCerts,
  addFastfile,
  removeFastfile,
}
