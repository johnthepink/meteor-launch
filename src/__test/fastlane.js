/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";
import { statSync } from "fs";
import util from "../util";

describe("fastlane assets", () => {
  it("should add fastlane assets", (done) => {
    util.addFastfile()
      .then(() => {
        try {
          const result = statSync(`${process.cwd()}/.fastlane`);
          assert.isOk(result);
          done();
        } catch (e) {
          // should not get here because assets exist
          assert.fail();
          done();
        }
      });
  });
  it("should remove fastlane assets", (done) => {
    util.addFastfile()
      .then(() => util.removeFastfile())
      .then(() => {
        try {
          statSync(`${process.cwd()}/.fastlane`);
          // should not get here because assets don't exist
          assert.fail();
          done();
        } catch (e) {
          assert.isOk(e);
          done();
        }
      });
  });
});
