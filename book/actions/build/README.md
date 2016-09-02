# build

```shell
$ launch build myapp.com path/to/optional/settings.json
```

The `build` action will build your Meteor project. This action is required prior to running most of the other actions. So, it's a good idea to set this up first.

What all it builds depends on what platforms you have added to your Meteor project. If you are wanting to build and deploy iOS or Android Cordova apps, make sure you have those [platforms]((https://www.meteor.com/tutorials/blaze/running-on-mobile)) added to your Meteor project.

`build` will place all of your built files in to the `.build` folder inside your Meteor project, unless you specify a `METEOR_OUTPUT_DIR`. Keep this in mind when filling out paths in your `launch.json`. If you do set `METEOR_OUTPUT_DIR`, be aware that it should either be outside your meteor project directory, or it should be a hidden directory.

#### iOS

If you are targeting the iOS platform, fill out these variables in your `launch.json` with the appropriate values. Some of these aren't used in the `build` action directly, but will be needed for most other actions.

```json
{
  "XCODE_SCHEME_NAME": "NameOfYourApp",
  "APP_IDENTIFIER": "com.example.app",
  "APPLE_ID": "appleid@email.com",
  "FASTLANE_PASSWORD": "appleIdPassword",
  "KEYCHAIN_PASSWORD": "randomPassword",
  "CERT_KEY_PATH": "./distribution.p12",
  "CERT_PASSWORD": "realPassword"
}
```

- `XCODE_SCHEME_NAME`: name of your app from `mobile-config.js`.
- `APP_IDENTIFIER`: this is your unique app identifier set as `id` in `mobile-config.js`.
- `APPLE_ID`: the email associated with your Apple Developer account.
- `FASTLANE_PASSWORD`: the password associated with your Apple Developer account (I know this doesn't make sense right now).
- `KEYCHAIN_PASSWORD`: this password will be used to create a temporary Keychain when run on a CI server. It can be anything, and can be changed at any time. But, I like to make it random and complicated just for fun ;)
- `CERT_KEY_PATH`: the path to your `.p12` certificate. You will likely need to generate this yourself using the Keychain app on your Mac. [Here](http://appfurnace.com/2015/01/how-do-i-make-a-p12-file/) is a guide to generating your `.p12` file.
- `CERT_KEY_PASSWORD`: this is the password you set when generating your `.p12` file.

#### Android

If you are targeting the Android platform, fill out these variables in your `launch.json` with the appropriate values. Some of these aren't used in the `build` action directly, but will be needed for most other actions.

```json
{
  "ANDROID_STORE_PASS": "password",
  "ANDROID_KEY": "name-of-key",
  "ANDROID_ZIPALIGN": "/path/to/android/sdk/build-tools/23.0.3/zipalign"
}
```

- `ANDROID_STORE_KEY`: the name of the key generated for signing your android app. To generate a key, run this command, replacing `your-app-name` with your app name:

```shell
$ keytool -genkey -alias your-app-name -keyalg RSA \
    -keysize 2048 -validity 10000
```

- `ANDROID_STORE_PASS`: password used when generating the store key
- `ANDROID_ZIPALIGN`: path to the zipalign tool in the Android sdks. This will likely be different on your local machine than on a CI server, so it may be best to leave this blank and just export the variable on the machine running `launch`:

```shell
$ export ANDROID_ZIPALIGN=~/Library/Android/sdk/build-tools/23.0.3/zipalign
```
