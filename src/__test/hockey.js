/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import hockey from "../hockey";

describe("android", () => {
  describe("exported functions", () => {
    const exportedFunctions = [
      "uploadIOS",
      "uploadAndroid",
    ];
    exportedFunctions.map((exportedFunction) => (
      it(`should have ${exportedFunction}`, () => {
        assert.isOk(hockey[exportedFunction]);
      })
    ));
  });
});
