import { execSync } from "child_process";

const build = (env) => (
  new Promise((resolve, reject) => {
    const meteorServer = process.argv[1];

    if (meteorServer === undefined) {
      return reject("Please provide a server as the second argument");
    }

    let buildAction = `cd ${env.METEOR_INPUT_DIR} &&`;
    buildAction += ` meteor build ${env.METEOR_OUTPUT_DIR}`;
    buildAction += ` --architecture os.linux.x86_64 --server ${meteorServer}`;
    if (process.argv[2]) {
      buildAction += ` --mobile-settings ${process.argv[2]}`;
    }
    buildAction += ` && cd ${process.cwd()}`;

    try {
      console.log("Building meteor...");
      execSync(buildAction, {
        stdio: [0, 1, 2],
      });
    } catch (error) {
      return reject(error);
    }

    try {
      // opening xcode ensures the schemes exist for the project
      console.log("Opening Xcode :( ...");
      execSync("open $XCODE_PROJECT", {
        stdio: [0],
        env,
      });
      execSync("sleep 5");

      return resolve();
    } catch (error) {
      // fail silently if no xcode project
      return resolve();
    }
  })
);

export default {
  build,
};
