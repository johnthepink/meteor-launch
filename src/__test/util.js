import { execSync } from "child_process";

const cleanLaunchFile = () => {
  try {
    execSync("rm launch.json", {
      stdio: [0],
    });
  } catch (e) {
    // no launch file
  }
};

export default {
  cleanLaunchFile,
};
