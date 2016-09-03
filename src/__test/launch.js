/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";
import launchFile from "../../assets/launch";

describe("launch.json", () => {
  it("has METEOR_INPUT_DIR", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("METEOR_INPUT_DIR") > -1);
  });
  it("has METEOR_OUTPUT_DIR", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("METEOR_OUTPUT_DIR") > -1);
  });
  it("has XCODE_SCHEME_NAME", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("XCODE_SCHEME_NAME") > -1);
  });
  it("has APP_IDENTIFIER", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("APP_IDENTIFIER") > -1);
  });
  it("has APPLE_ID", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("APPLE_ID") > -1);
  });
  it("has FASTLANE_PASSWORD", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("FASTLANE_PASSWORD") > -1);
  });
  it("has KEYCHAIN_PASSWORD", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("KEYCHAIN_PASSWORD") > -1);
  });
  it("has CERT_KEY_PATH", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("CERT_KEY_PATH") > -1);
  });
  it("has CERT_PASSWORD", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("CERT_PASSWORD") > -1);
  });
  it("has SLACK_URL", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("SLACK_URL") > -1);
  });
  it("has SLACK_ROOM", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("SLACK_ROOM") > -1);
  });
  it("has ANDROID_KEY", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("ANDROID_KEY") > -1);
  });
  it("has ANDROID_STORE_PASS", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("ANDROID_STORE_PASS") > -1);
  });
  it("has ANDROID_ZIPALIGN", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("ANDROID_ZIPALIGN") > -1);
  });
  it("has IOS_HOCKEY_TOKEN", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("IOS_HOCKEY_TOKEN") > -1);
  });
  it("has ANDROID_HOCKEY_TOKEN", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("ANDROID_HOCKEY_TOKEN") > -1);
  });
  it("has ANDROID_HOCKEY_ID", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("ANDROID_HOCKEY_ID") > -1);
  });
  it("has PLAY_AUTH_FILE", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("PLAY_AUTH_FILE") > -1);
  });
  it("has GALAXY_DEPLOY_HOSTNAME", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("GALAXY_DEPLOY_HOSTNAME") > -1);
  });
  it("has GALAXY_SESSION_FILE", () => {
    assert.isTrue(Object.keys(launchFile).indexOf("GALAXY_SESSION_FILE") > -1);
  });
});
