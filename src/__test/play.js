/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import play from "../play";

describe("play", () => {
  describe("exported functions", () => {
    const exportedFunctions = [
      "uploadPlayStore",
    ];
    exportedFunctions.map((exportedFunction) => (
      it(`should have ${exportedFunction}`, () => {
        assert.isOk(play[exportedFunction]);
      })
    ));
  });
});
