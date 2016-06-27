import Path from "path";
import Fs from "fs";
import { execSync as ExecSync } from "child_process";

const init = () => {
  const launchFile = Path.join(process.cwd(), "launch.json");

  return new Promise((resolve, reject) => {

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

        return resolve("launch.json created. Open it and fill out the vars");
      }

      // dont overwrite
      else {
        return resolve("launch.json already exists");
      }

    });

  });
}

const launchFile = () => {
  // fail silently if trying to init
  if (process.argv[2] === "init") return false;
  try {
    Fs.statSync(`${process.cwd()}/launch.json`);
  }
  catch (e) {
    console.log("launch.json not found. Please run: launch init");
    process.exit();
  }
  return true
}

const addFastfile = () => {
  return new Promise((resolve, reject) => {
    const fastfileLocation = Path.join(__dirname, "..", "fastlane", "Fastfile");
    const fastfileTarget = Path.join(process.cwd(), "Fastfile");

    let contents = Fs.readFileSync(fastfileLocation);

    Fs.writeFileSync(fastfileTarget, contents);

    return resolve("Fastfile written...");
  });
}

const removeFastfile = () => {
  return new Promise((resolve, reject) => {
    const fastfileTarget = Path.join(process.cwd(), "Fastfile");

    Fs.unlinkSync(fastfileTarget);

    return resolve("Fastfile deleted...");
  });
}

const importCerts = (env) => {
  console.log("Importing certs...");

  return new Promise((resolve, reject) => {
    ExecSync("fastlane import", {
      stdio: [0,1,2],
      env: env,
    });
    return resolve();
  });

}

export default {
  launchFile,
  init,
  importCerts,
  addFastfile,
  removeFastfile,
}
