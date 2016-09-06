/* global describe it before after */

// eslint-disable-next-line
import { assert } from "chai";
import { execSync } from "child_process";
import { resolve } from "path";
import rimraf from "rimraf";

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
  describe("prepareApk", () => {
    it("should do nothing if no android platform", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks/ios:${process.env.PATH}`;
      android.prepareApk(process.env)
        .then((result) => {
          assert.equal(result, "skipped");
          done();
        })
      ;
    });
    it("should call jarsigner and align", (done) => {
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      process.env.ANDROID_ZIPALIGN = `${process.cwd()}/src/__test/mocks/align`;
      android.prepareApk(process.env)
        .then((result) => {
          assert.equal(result, "prepared");
          done();
        })
      ;
    });
    it("should handle crosswalk builds", (done) => {
      delete require.cache[
        `${process.cwd()}/launch.json`
      ];
      const crosswalkOutputPath = resolve(
        process.cwd(),
        ".build",
        "android",
        "project",
        "build",
        "outputs",
        "apk"
      );
      execSync(`mkdir -p ${crosswalkOutputPath}`);
      execSync(`touch ${crosswalkOutputPath}/android-armv7-release-unsigned.apk`);
      execSync(`touch ${crosswalkOutputPath}/android-x86-release-unsigned.apk`);

      // eslint-disable-next-line
      execSync(`echo '{}' > launch.json`);
      process.env.PATH = `${process.cwd()}/src/__test/mocks:${process.env.PATH}`;
      process.env.ANDROID_ZIPALIGN = `${process.cwd()}/src/__test/mocks/align`;
      android.prepareApk(process.env)
        .then((result) => {
          assert.equal(result, "prepared");
          done();
        })
      ;
    });
    after(() => {
      rimraf.sync(`${process.cwd()}/.build`);
      delete require.cache[
        `${process.cwd()}/launch.json`
      ];
    });
  });
});
