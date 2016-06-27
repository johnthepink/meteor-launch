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

Install [playup](https://github.com/jeduan/playup) for deploying to Google Play Store.

~~~
npm install -g playup
~~~

### mobile-config.js

Make sure you have a proper Meteor `mobile-config.js` file.

### init

Create a `launch.json` file, and install `fastlane` if you don't have it:

```
launch init
```

...then fill out the vars in `.launch.json`.

## Commands

*Before building, you should adjust your version and build number accordingly in `mobile-config.js`.*

### build

This will just build your app:

```
launch build server.com
```

### hockey

This will build and deploy to Hockey:

```
launch hockey server.com
```

### testflight

This will build and deploy to TestFlight:

```
launch testflight server.com
```

### appstore

This will build and deploy to iTunes:

```
launch appstore server.com
```

### playstore

This will build and deploy to Google Play:

```
launch playstore server.com
```

### production

This will build and deploy to iTunes and Google Play:

```
launch production server.com
```
