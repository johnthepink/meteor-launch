"use strict";

var _chai = require("chai");

var _child_process = require("child_process");

/* global describe it */

describe("help", function () {
  it("should have output", function () {
    var output = (0, _child_process.execSync)("launch help");
    _chai.assert.include(output.toString(), "Commands");
  });
});