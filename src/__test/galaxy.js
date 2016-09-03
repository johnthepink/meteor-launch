/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import galaxy from "../galaxy";

describe("android", () => {
  describe("exported functions", () => {
    const exportedFunctions = [
      "deploy",
    ];
    exportedFunctions.map((exportedFunction) => (
      it(`should have ${exportedFunction}`, () => {
        assert.isOk(galaxy[exportedFunction]);
      })
    ));
  });
});
