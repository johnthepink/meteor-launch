/* global describe it beforeEach */

import { join } from "path";
import { stat } from "fs";
import { assert } from "chai";
import { execSync } from "child_process";
import util from "./util";

beforeEach(() => {
  util.cleanLaunchFile();
});

describe("init", () => {
  it("should error when no launch.json file", () => {
    const output = execSync("launch build", {
      env: process.env,
    });

    assert.equal(
      output.toString(),
      "launch.json not found. Please run: launch init\n"
    );
  });

  it("should return launch message", () => {
    const output = execSync("launch init", {
      env: process.env,
    });

    assert.equal(
      output.toString(),
      "launch.json created. Open it and fill out the vars\n"
    );
  });

  it("should add launch file", () => {
    execSync("launch init", {
      env: process.env,
    });
    const launchFile = join(process.cwd(), "launch.json");

    stat(launchFile, (err) => {
      if (err) {
        assert.fail();
      } else {
        assert.isOk();
      }
    });
  });
});
