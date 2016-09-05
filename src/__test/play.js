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
  describe("uploadPlayStore", () => {
    it("should do nothing if no android platform", () => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks/ios:${process.env.PATH}`;
      play.uploadPlayStore()
        .then((result) => {
          assert.equal(result, "skipped");
        });
    });
  });
});
