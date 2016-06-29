# Meteor Launch

[![Build Status](https://travis-ci.org/NewSpring/meteor-launch.svg?branch=master)](https://travis-ci.org/NewSpring/meteor-launch)

Automating meteor builds to the AppStore, TestFlight, Hockey, Google Play, and more later.

## Before you build

### Android

Install the [Android SDK](https://developer.android.com/sdk/index.html), then set your `$ANDROID_HOME` in your `.bashrc` or `.zshrc`:

~~~
export ANDROID_HOME=xxx
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
~~~

This will generate a key to sign your Android builds, so they can go to Hockey and Google Play:

~~~
keytool -genkey -alias your-app-name -keyalg RSA \
    -keysize 2048 -validity 10000
~~~

_I want to add a task for this soon._

### mobile-config.js

Make sure you have a Meteor `mobile-config.js` file. More info [here](https://docs.meteor.com/api/mobile-config.html).

### init

Create a `launch.json` file, and install `fastlane` if you don't have it:

```
launch init
```

...then fill out the vars in `.launch.json`.

## Commands

*Before building, you should adjust your version and build number accordingly in `mobile-config.js`.*

### build

This will build your app:

```
launch build server.com path/to/settings.json
```

### hockey

This will deploy to Hockey based on the platforms you have added to Meteor. So if you have added `ios` and `android` through `meteor add-platform`, it will try to deploy to Hockey for each platform. If you have only added one, it will just deploy that one.

```
launch hockey
```

### testflight

This will deploy to TestFlight, if you have added the `ios` platform to Meteor.

```
launch testflight
```

### playstore

This will deploy to Google Play, if you have added the `android` platform to Meteor. It currently deploys to the alpha channel. Other channels will be added in the future.

```
launch playstore
```

### appstore

This will deploy straight to the iTunes App Store, bypassing TestFlight. It's probably smarter to do `launch testflight`, and then promote a build to the app store from iTunes Connect.

```
launch appstore
```

### galaxy

This will deploy your app to Galaxy:

```
launch galaxy server.com path/to/optional/settings.json
```
