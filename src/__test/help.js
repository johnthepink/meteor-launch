/* global describe it before */

// eslint-disable-next-line
import { assert } from "chai";
import { execSync } from "child_process";

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
