"use strict";

var _path = require("path");

var _fs = require("fs");

var _chai = require("chai");

var _child_process = require("child_process");

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(function () {
  _util2.default.cleanLaunchFile();
}); /* global describe it beforeEach */

describe("init", function () {
  it("should error when no launch.json file", function () {
    var output = (0, _child_process.execSync)("launch build", {
      env: process.env
    });

    _chai.assert.equal(output.toString(), "launch.json not found. Please run: launch init\n");
  });

  it("should return launch message", function () {
    var output = (0, _child_process.execSync)("launch init", {
      env: process.env
    });

    _chai.assert.equal(output.toString(), "launch.json created. Open it and fill out the vars\n");
  });

  it("should add launch file", function () {
    (0, _child_process.execSync)("launch init", {
      env: process.env
    });
    var launchFile = (0, _path.join)(process.cwd(), "launch.json");

    (0, _fs.stat)(launchFile, function (err) {
      if (err) {
        _chai.assert.fail();
      } else {
        _chai.assert.isOk();
      }
    });
  });
});