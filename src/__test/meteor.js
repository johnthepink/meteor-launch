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
});
