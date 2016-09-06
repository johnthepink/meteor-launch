/* global describe it before beforeEach */

// eslint-disable-next-line
import { assert } from "chai";
import { join } from "path";
import { stat } from "fs";
import { execSync } from "child_process";
import rimraf from "rimraf";

const commands = [
  "init",
  "import",
  "build",
  "prepare",
  "hockey",
  "testflight",
  "appstore",
  "playstore",
  "production",
  "galaxy",
];

describe("help", () => {
  let output;

  before(() => {
    const buffer = execSync("launch help");
    output = buffer.toString();
  });

  commands.map((command) => (
    it(`should have ${command}`, () => {
      assert.include(output, command);
    })
  ));
});

beforeEach(() => {
  rimraf.sync("launch.json");
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

    assert.include(
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
