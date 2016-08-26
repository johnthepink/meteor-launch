/* global describe it beforeEach */

import { assert } from "chai";
import { execSync } from "child_process";
import { resolve } from "path";

import util from "../util";

describe("settings", () => {
  it("should pass through absolute zipalign path", () => {
    // eslint-disable-next-line
    execSync(`echo '{"ANDROID_ZIPALIGN": "/nonsense"}' > launch.json`);
    delete process.env.ANDROID_ZIPALIGN;
    process.env.ANDROID_ZIPALIGN = "/meow";
    const results = util.generateSettings(process.env);
    assert.equal(results.ANDROID_ZIPALIGN, "/meow");
  });
  it("should resolve home zipalign path", () => {
    // eslint-disable-next-line
    execSync(`echo '{"ANDROID_ZIPALIGN": "/nonsense"}' > launch.json`);
    delete process.env.ANDROID_ZIPALIGN;
    process.env.ANDROID_ZIPALIGN = "~/meow";
    const results = util.generateSettings(process.env);
    assert.equal(results.ANDROID_ZIPALIGN, `${process.env.HOME}/meow`);
  });
  it("should resolve relative zipalign path", () => {
    // eslint-disable-next-line
    execSync(`echo '{"ANDROID_ZIPALIGN": "/nonsense"}' > launch.json`);
    delete process.env.ANDROID_ZIPALIGN;
    process.env.ANDROID_ZIPALIGN = "../meow";
    const results = util.generateSettings(process.env);
    assert.equal(
      results.ANDROID_ZIPALIGN,
      resolve(
        process.cwd(),
        "../meow"
      )
    );
  });
});
