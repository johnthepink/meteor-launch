/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import meteor from "../meteor";

describe("meteor", () => {
  describe("exported functions", () => {
    const exportedFunctions = [
      "build",
    ];
    exportedFunctions.map((exportedFunction) => (
      it(`should have ${exportedFunction}`, () => {
        assert.isOk(meteor[exportedFunction]);
      })
    ));
  });
  describe("build", () => {
    it("should reject if no server param", (done) => {
      process.argv = [];
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      meteor.build(process.env)
        .catch((error) => {
          assert.isOk(error);
          done();
        })
      ;
    });
    it("should reject if exec error", (done) => {
      process.argv = ["build", "example.com"];
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      process.env.METEOR_INPUT_DIR = "blahblah";
      meteor.build(process.env)
        .catch((error) => {
          assert.isOk(error);
          done();
        })
      ;
    });
    it("should call meteor", (done) => {
      process.argv = ["build", "example.com"];
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      process.env.METEOR_INPUT_DIR = ".";
      meteor.build(process.env)
        .then((result) => {
          assert.equal(result, "built");
          done();
        })
      ;
    });
    it("should call meteor with settings", (done) => {
      process.argv = ["build", "example.com", "path/to/settings.json"];
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      process.env.METEOR_INPUT_DIR = ".";
      meteor.build(process.env)
        .then((result) => {
          assert.equal(result, "built");
          done();
        })
      ;
    });
    // no arrow syntax to preserve `this`
    // eslint-disable-next-line func-names
    it("should try to open xcode and wait 5 seconds", function (done) {
      this.timeout(6000);
      process.argv = ["build", "example.com", "path/to/settings.json"];
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      process.env.METEOR_INPUT_DIR = ".";
      process.env.XCODE_PROJECT = ".";
      meteor.build(process.env)
        .then((result) => {
          assert.equal(result, "built");
          done();
        })
      ;
    });
  });
});
