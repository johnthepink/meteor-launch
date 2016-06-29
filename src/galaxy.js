import { execSync } from "child_process";

const deploy = (env) => (
  new Promise((resolve, reject) => {
    const meteorServer = process.argv[1];

    if (meteorServer === undefined) {
      return reject("Please provide a server as the second argument");
    }

    let deployCommand = `
      DEPLOY_HOSTNAME=$GALAXY_DEPLOY_HOSTNAME \
      METEOR_SESSION_FILE=$GALAXY_SESSION_FILE \
      meteor deploy ${meteorServer}`;
    if (process.argv[2]) {
      deployCommand += ` --settings ${process.argv[2]}`;
    }

    try {
      console.log("Deploying to Galaxy...");
      execSync(deployCommand, {
        stdio: [0, 1, 2],
        env,
      });
    } catch (error) {
      return reject(error);
    }

    return resolve();
  })
);

export default {
  deploy,
};
