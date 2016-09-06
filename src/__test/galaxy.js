/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";

import galaxy from "../galaxy";

describe("galaxy", () => {
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
  describe("deploy", () => {
    it("should reject if no server", (done) => {
      process.argv = [];
      galaxy.deploy()
        .then(() => {
          assert.fail();
          done();
        })
        .catch((error) => {
          assert.equal(error, "Please provide a server as the second argument");
          done();
        })
      ;
    });
    it("should reject if meteor CLI error", (done) => {
      process.argv = ["deploy", "example.com"];
      galaxy.deploy()
        .then(() => {
          assert.fail();
          done();
        })
        .catch((error) => {
          assert.isOk(error);
          done();
        })
      ;
    });
    it("should call meteor to deploy", (done) => {
      process.argv = ["deploy", "example.com"];
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      galaxy.deploy()
        .then((result) => {
          assert.equal(result, "deployed");
          done();
        })
        .catch(() => {
          assert.fail();
          done();
        })
      ;
    });
    it("should call meteor with settings", (done) => {
      process.argv = ["deploy", "example.com", "path/to/settting.json"];
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      galaxy.deploy()
        .then((result) => {
          assert.equal(result, "deployed");
          done();
        })
        .catch(() => {
          assert.fail();
          done();
        })
      ;
    });
  });
});
