import { execSync as ExecSync } from "child_process";

const build = (env) => {
  return new Promise((resolve, reject) => {

    let meteorPath = process.cwd();
    let meteorServer = process.argv[1];

    if (meteorServer === undefined) {
      return reject("Please provide a server as the second argument");
    }

    let buildAction = `meteor build .build --architecture os.linux.x86_64 --server ${meteorServer}`
    if (process.argv[2]) {
      buildAction += ` --mobile-settings ${process.argv[2]}`;
    }

    console.log("Building meteor...");
    ExecSync(buildAction, {
      stdio: [0,1,2],
    });

    console.log("Opening Xcode :( ...");
    ExecSync("open $XCODE_PROJECT", {
      stdio: [0,1,2],
      env: env,
    });
    ExecSync("sleep 5");

    return resolve();

  });
}

export default {
  build,
}
