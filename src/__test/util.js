import rimraf from "rimraf";

const cleanLaunchFile = () => {
  rimraf.sync("launch.json");
};

export default {
  cleanLaunchFile,
};
