/* global describe it */

import { assert } from "chai";
import { statSync } from "fs";
import util from "../util";

describe("fastlane assets", () => {
  it("should add fastlane assets", () => {
    util.addFastfile()
      .then(() => {
        try {
          const result = statSync(`${process.cwd()}/.fastlane`);
          assert.isOk(result);
        } catch (e) {
          // should not get here because assets exist
          assert.fail();
        }
      });
  });
  it("should remove fastlane assets", () => {
    util.addFastfile()
      .then(() => util.removeFastfile())
      .then(() => {
        try {
          statSync(`${process.cwd()}/.fastlane`);
          // should not get here because assets don't exist
          assert.fail();
        } catch (e) {
          assert.isOk(e);
        }
      });
  });
});
