"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
  var launchFile = _path2.default.join(process.cwd(), "launch.json");

  return new Promise(function (resolve, reject) {

    try {
      (0, _child_process.execSync)("which fastlane");
    } catch (e) {
      console.log("Installing fastlane...");
      (0, _child_process.execSync)("sudo gem install fastlane");
    }

    _fs2.default.stat(launchFile, function (err, stats) {

      // file not found
      if (err) {
        var exampleLaunchFile = _path2.default.join(__dirname, "../assets/launch.json");
        var targetLaunchFile = _path2.default.join(process.cwd(), "launch.json");

        var contents = _fs2.default.readFileSync(exampleLaunchFile);

        _fs2.default.writeFileSync(targetLaunchFile, contents);

        return resolve("launch.json created. Open it and fill out the vars");
      }

      // dont overwrite
      else {
          return resolve("launch.json already exists");
        }
    });
  });
};

var launchFile = function launchFile() {
  // fail silently if trying to init
  if (process.argv[2] === "init") return false;
  try {
    _fs2.default.statSync(process.cwd() + "/launch.json");
  } catch (e) {
    console.log("launch.json not found. Please run: launch init");
    process.exit();
  }
  return true;
};

var addFastfile = function addFastfile() {
  return new Promise(function (resolve, reject) {
    var fastfileLocation = _path2.default.join(__dirname, "..", "fastlane", "Fastfile");
    var fastfileTarget = _path2.default.join(process.cwd(), ".fastlane");

    try {
      _fs2.default.mkdirSync(fastfileTarget);
    } catch (e) {}

    var contents = _fs2.default.readFileSync(fastfileLocation);

    _fs2.default.writeFileSync(fastfileTarget + "/Fastfile", contents);

    return resolve("Fastfile written...");
  });
};

var removeFastfile = function removeFastfile() {
  return new Promise(function (resolve, reject) {
    var fastfileTarget = _path2.default.join(process.cwd(), ".fastlane");

    _fs2.default.unlinkSync(fastfileTarget + "/Fastfile");
    _fs2.default.unlinkSync(fastfileTarget + "/README.md");
    _fs2.default.unlinkSync(fastfileTarget);

    return resolve("Fastfile deleted...");
  });
};

var importCerts = function importCerts(env) {
  console.log("Importing certs...");

  return new Promise(function (resolve, reject) {
    (0, _child_process.execSync)("fastlane import", {
      stdio: [0, 1, 2],
      env: env
    });
    return resolve();
  });
};

var hasPlatform = function hasPlatform(platform) {
  var platforms = (0, _child_process.execSync)("meteor list-platforms");
  return platforms.toString().indexOf(platform) > -1;
};

exports.default = {
  launchFile: launchFile,
  init: init,
  importCerts: importCerts,
  addFastfile: addFastfile,
  removeFastfile: removeFastfile,
  hasPlatform: hasPlatform
};