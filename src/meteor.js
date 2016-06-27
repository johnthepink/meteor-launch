import { execSync } from "child_process";

const build = (env) => (
  new Promise((resolve, reject) => {
    const meteorServer = process.argv[1];

    if (meteorServer === undefined) {
      return reject("Please provide a server as the second argument");
    }

    let buildAction = `meteor build .build --architecture os.linux.x86_64 --server ${meteorServer}`;
    if (process.argv[2]) {
      buildAction += ` --mobile-settings ${process.argv[2]}`;
    }

    try {
      console.log("Building meteor...");
      execSync(buildAction, {
        stdio: [0, 1, 2],
      });

      // opening xcode ensures the schemes exist for the project
      console.log("Opening Xcode :( ...");
      execSync("open $XCODE_PROJECT", {
        stdio: [0, 1, 2],
        env,
      });
      execSync("sleep 5");

      return resolve();
    } catch (error) {
      return reject(error);
    }
  })
);

export default {
  build,
};
