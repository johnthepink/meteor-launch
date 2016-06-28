import Path from "path";
import Fs from "fs";
import { execSync } from "child_process";

const init = () => (
  new Promise((resolve) => {
    const launchFile = Path.join(process.cwd(), "launch.json");
    try {
      execSync("which fastlane");
    } catch (e) {
      console.log("Installing fastlane...");
      execSync("sudo gem install fastlane");
    }

    Fs.stat(launchFile, (err) => {
      // file not found
      if (err) {
        const exampleLaunchFile = Path.join(__dirname, "../assets/launch.json");
        const targetLaunchFile = Path.join(process.cwd(), "launch.json");

        const contents = Fs.readFileSync(exampleLaunchFile);

        Fs.writeFileSync(targetLaunchFile, contents);

        return resolve("launch.json created. Open it and fill out the vars");
      }

      // dont overwrite
      return resolve("launch.json already exists");
    });
  })
);

const launchFile = () => {
  // fail silently if trying to init
  if (
    process.argv[2] === "init" ||
    process.argv[2] === "help" ||
    typeof process.argv[2] === "undefined"
  ) return false;

  try {
    Fs.statSync(`${process.cwd()}/launch.json`);
  } catch (e) {
    console.log("launch.json not found. Please run: launch init");
    process.exit();
  }
  return true;
};

const addFastfile = () => (
  new Promise((resolve) => {
    const fastfileLocation = Path.join(__dirname, "..", "fastlane", "Fastfile");
    const fastfileTarget = Path.join(process.cwd(), ".fastlane");

    try {
      Fs.mkdirSync(fastfileTarget);
    } catch (e) {
      // do nothing
    }

    const contents = Fs.readFileSync(fastfileLocation);

    Fs.writeFileSync(`${fastfileTarget}/Fastfile`, contents);

    return resolve("Fastfile written...");
  })
);

const removeFastfile = () => (
  new Promise((resolve) => {
    const fastfileTarget = Path.join(process.cwd(), ".fastlane");

    Fs.unlinkSync(`${fastfileTarget}/Fastfile`);
    Fs.unlinkSync(`${fastfileTarget}/README.md`);
    Fs.unlinkSync(fastfileTarget);

    return resolve("Fastfile deleted...");
  })
);

const importCerts = (env) => (
  new Promise((resolve) => {
    console.log("Importing certs...");
    execSync("fastlane import", {
      stdio: [0, 1, 2],
      env,
    });
    return resolve();
  })
);

const hasPlatform = (platform) => {
  const platforms = execSync("meteor list-platforms");
  return platforms.toString().indexOf(platform) > -1;
};

export default {
  launchFile,
  init,
  importCerts,
  addFastfile,
  removeFastfile,
  hasPlatform,
};
