/* global describe it */

// eslint-disable-next-line
import { assert } from "chai";
import launchFile from "../../assets/launch";

describe("launch.json", () => {
  it("has METEOR_INPUT_DIR", () => {
    assert.isTrue(Object.keys(launchFile).includes("METEOR_INPUT_DIR"));
  });
  it("has METEOR_OUTPUT_DIR", () => {
    assert.isTrue(Object.keys(launchFile).includes("METEOR_OUTPUT_DIR"));
  });
  it("has XCODE_SCHEME_NAME", () => {
    assert.isTrue(Object.keys(launchFile).includes("XCODE_SCHEME_NAME"));
  });
  it("has APP_IDENTIFIER", () => {
    assert.isTrue(Object.keys(launchFile).includes("APP_IDENTIFIER"));
  });
  it("has APPLE_ID", () => {
    assert.isTrue(Object.keys(launchFile).includes("APPLE_ID"));
  });
  it("has FASTLANE_PASSWORD", () => {
    assert.isTrue(Object.keys(launchFile).includes("FASTLANE_PASSWORD"));
  });
  it("has KEYCHAIN_PASSWORD", () => {
    assert.isTrue(Object.keys(launchFile).includes("KEYCHAIN_PASSWORD"));
  });
  it("has CERT_KEY_PATH", () => {
    assert.isTrue(Object.keys(launchFile).includes("CERT_KEY_PATH"));
  });
  it("has CERT_PASSWORD", () => {
    assert.isTrue(Object.keys(launchFile).includes("CERT_PASSWORD"));
  });
  it("has SLACK_URL", () => {
    assert.isTrue(Object.keys(launchFile).includes("SLACK_URL"));
  });
  it("has SLACK_ROOM", () => {
    assert.isTrue(Object.keys(launchFile).includes("SLACK_ROOM"));
  });
  it("has ANDROID_KEY", () => {
    assert.isTrue(Object.keys(launchFile).includes("ANDROID_KEY"));
  });
  it("has ANDROID_STORE_PASS", () => {
    assert.isTrue(Object.keys(launchFile).includes("ANDROID_STORE_PASS"));
  });
  it("has ANDROID_ZIPALIGN", () => {
    assert.isTrue(Object.keys(launchFile).includes("ANDROID_ZIPALIGN"));
  });
  it("has IOS_HOCKEY_TOKEN", () => {
    assert.isTrue(Object.keys(launchFile).includes("IOS_HOCKEY_TOKEN"));
  });
  it("has ANDROID_HOCKEY_TOKEN", () => {
    assert.isTrue(Object.keys(launchFile).includes("ANDROID_HOCKEY_TOKEN"));
  });
  it("has ANDROID_HOCKEY_ID", () => {
    assert.isTrue(Object.keys(launchFile).includes("ANDROID_HOCKEY_ID"));
  });
  it("has PLAY_AUTH_FILE", () => {
    assert.isTrue(Object.keys(launchFile).includes("PLAY_AUTH_FILE"));
  });
  it("has GALAXY_DEPLOY_HOSTNAME", () => {
    assert.isTrue(Object.keys(launchFile).includes("GALAXY_DEPLOY_HOSTNAME"));
  });
  it("has GALAXY_SESSION_FILE", () => {
    assert.isTrue(Object.keys(launchFile).includes("GALAXY_SESSION_FILE"));
  });
});
