/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import iTunes from "../iTunes";

describe("iTunes", () => {
  describe("exported functions", () => {
    const exportedFunctions = [
      "uploadTestFlight",
      "uploadAppStore",
    ];
    exportedFunctions.map((exportedFunction) => (
      it(`should have ${exportedFunction}`, () => {
        assert.isOk(iTunes[exportedFunction]);
      })
    ));
  });
});
