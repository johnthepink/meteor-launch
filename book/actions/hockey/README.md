# hockey

```shell
$ launch hockey
```

The `hockey` action will deploy your Cordova app to [Hockey](https://www.hockeyapp.net/features/). Hockey supports both iOS and Android app distribution, so this action can upload either one, or both, based on which platforms you have added to your Meteor project.

## Setup

First, make sure you have added the keys describe in the [build](/actions/build/README.md) action.

Make sure you have created an application on Hockey corresponding to the type(s) of application(s) you want to upload. If you will be uploading both iOS and Android apps, you will need two separate apps on Hockey.

#### iOS

Generate an API key for your iOS app on Hockey, and then add it to your `launch.json`.

```json
{
  "IOS_HOCKEY_TOKEN": "tokenhere"
}
```

#### Android

Generate an API key for your Android app on Hockey. You will also need the id of your application on Hockey for Android. Then, add it to your `launch.json`.

```json
{
  "ANDROID_HOCKEY_TOKEN": "tokenhere",
  "ANDROID_HOCKEY_ID": "idhere"
}
```
*Crosswalk*: If you use the Crosswalk webview, two different builds of your app are generated. Both of these will be uploaded to Hockey with different build numbers.

