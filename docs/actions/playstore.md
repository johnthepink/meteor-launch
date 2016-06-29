# playstore

```shell
$ launch playstore
```

The `playstore` action will compile your Cordova build for Android, sign the APK file, and upload it to the Google Play Store. Currently, it uploads to the alpha channel, but that can be changed.

## Setup

You will need to have created an application on the Google Play Store.

Then, you will need to generate an auth file to allow uploading. To do this, navigate to Settings -> API Access in your Google Play account, then create a service account. When asked, generate a JSON file for auth, and download it. Provide the path to this file in your `launch.json`.

```json
  "PLAY_AUTH_FILE": ""
```
