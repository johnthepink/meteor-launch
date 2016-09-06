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
  describe("uploadTestFlight", () => {
    it("should do nothing if no ios platform", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks/android:${process.env.PATH}`;
      iTunes.uploadTestFlight()
        .then((result) => {
          assert.equal(result, "skipped");
          done();
        });
    });
    it("should call fastlane", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      iTunes.uploadTestFlight()
        .then((result) => {
          assert.equal(result, "uploaded");
          done();
        });
    });
  });
  describe("uploadAppStore", () => {
    it("should do nothing if no ios platform", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks/android:${process.env.PATH}`;
      iTunes.uploadAppStore()
        .then((result) => {
          assert.equal(result, "skipped");
          done();
        });
    });
    it("should call fastlane", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      iTunes.uploadAppStore()
        .then((result) => {
          assert.equal(result, "uploaded");
          done();
        });
    });
  });
});
