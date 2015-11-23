"use strict";

const ExecSync = require('child_process').execSync;

function build(env, cb) {
  let meteorPath = process.cwd();
  let meteorServer = process.argv[1];

  if (meteorServer === undefined) {
    console.log('Please provide a server as the second argument');
    return
  }

  console.log('Building meteor...');
  ExecSync(`meteor build .build --server ${meteorServer}`, {
    stdio: [0,1,2]
  });

  console.log('Opening Xcode :( ...');
  ExecSync('open $XCODE_PROJECT', {
    stdio: [0,1,2],
    env: env
  });
  ExecSync('sleep 5');
  cb();
}

module.exports = {
  build: build
}
