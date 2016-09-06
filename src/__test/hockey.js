/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import hockey from "../hockey";

describe("hockey", () => {
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
  describe("uploadIOS", () => {
    it("should skip if no ios platform", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks/android:${process.env.PATH}`;
      hockey.uploadIOS(process.env)
        .then((result) => {
          assert.equal(result, "skipped");
          done();
        })
      ;
    });
    it("should call fastlane", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      hockey.uploadIOS(process.env)
        .then((result) => {
          assert.equal(result, "uploaded");
          done();
        })
      ;
    });
  });
  describe("uploadAndroid", () => {
    it("should do nothing if no android platform", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks/ios:${process.env.PATH}`;
      hockey.uploadAndroid(process.env)
        .then((result) => {
          assert.equal(result, "skipped");
          done();
        })
      ;
    });
    it("should curl hockey API", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      hockey.uploadAndroid(process.env)
        .then((result) => {
          assert.equal(result, "uploaded");
          done();
        })
      ;
    });
  });
});
