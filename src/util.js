import { join } from "path";
import {
  stat,
  readFileSync,
  writeFileSync,
  statSync,
  mkdirSync,
} from "fs";
import { execSync } from "child_process";
import rimraf from "rimraf";

const init = () => (
  new Promise((resolve) => {
    const launchFile = join(process.cwd(), "launch.json");
    try {
      execSync("which fastlane");
    } catch (e) {
      console.log("Installing fastlane...");
      execSync("sudo gem install fastlane");
    }

    stat(launchFile, (err) => {
      // file not found
      if (err) {
        const exampleLaunchFile = join(__dirname, "../assets/launch.json");
        const targetLaunchFile = join(process.cwd(), "launch.json");

        const contents = readFileSync(exampleLaunchFile);

        writeFileSync(targetLaunchFile, contents);

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
    statSync(`${process.cwd()}/launch.json`);
  } catch (e) {
    console.log("launch.json not found. Please run: launch init");
    process.exit();
  }
  return true;
};

const addFastfile = () => (
  new Promise((resolve) => {
    const fastfileLocation = join(__dirname, "..", "fastlane", "Fastfile");
    const fastfileTarget = join(process.cwd(), ".fastlane");

    try {
      mkdirSync(fastfileTarget);
    } catch (e) {
      // do nothing
    }

    const contents = readFileSync(fastfileLocation);

    writeFileSync(`${fastfileTarget}/Fastfile`, contents);

    return resolve("Fastfile written...");
  })
);

const removeFastfile = () => (
  new Promise((resolve) => {
    const fastfileTarget = join(process.cwd(), ".fastlane");

    rimraf.sync(fastfileTarget);

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
