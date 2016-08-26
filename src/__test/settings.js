/* global describe it */

import { assert } from "chai";
import { execSync } from "child_process";

import util from "../util";

describe("settings", () => {
  it("should pass through absolute zipalign path", () => {
    // eslint-disable-next-line
    execSync(`echo '{"ANDROID_ZIPALIGN": "/meow"}' > launch.json`);
    delete process.env.ANDROID_ZIPALIGN;
    const results = util.generateSettings(process.env);
    assert.equal(results.ANDROID_ZIPALIGN, "/meow");
  });
});
