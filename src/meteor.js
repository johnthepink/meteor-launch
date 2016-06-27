import { execSync as ExecSync } from "child_process";

const build = (env, cb) => {
  let meteorPath = process.cwd();
  let meteorServer = process.argv[1];

  if (meteorServer === undefined) {
    console.log("Please provide a server as the second argument");
    return;
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
  cb();
}

export default {
  build,
}
