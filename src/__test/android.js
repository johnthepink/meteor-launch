/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import android from "../android";

describe("android", () => {
  describe("exported functions", () => {
    const exportedFunctions = [
      "prepareApk",
      "findCrosswalkApks",
      "signedApks",
    ];
    exportedFunctions.map((exportedFunction) => (
      it(`should have ${exportedFunction}`, () => {
        assert.isOk(android[exportedFunction]);
      })
    ));
  });
});
