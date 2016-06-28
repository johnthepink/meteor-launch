/* global describe it */

import { assert } from "chai";
import { execSync } from "child_process";

describe("help", () => {
  it("should have output", () => {
    const output = execSync("launch help");
    assert.include(
      output.toString(),
      "Commands"
    );
  });
});
