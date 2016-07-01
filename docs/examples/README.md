# Examples

## Basic

In this example, we are going to use Travis to:

1. Deploy server to Galaxy
2. Build an Android app
3. Distribute app through [Hockey](https://hockeyapp.net)

Here are all the finished items:

1. [Code on GitHub](https://github.com/NewSpring/launch-basic-example)
2. [Build on Travis](https://travis-ci.org/NewSpring/launch-basic-example)
3. [Site on Galaxy](https://launch-basic-example.meteorapp.com/)
4. [App download on Hockey](https://rink.hockeyapp.net/apps/9c21ad20059c4486baf98fb9ef472a9c)

#### Getting Started

```shell
$ meteor create launch-basic-example
$ meteor add-platform android
$ npm install -g launch
$ launch init
```

You should now have a working Meteor project with the Android platform added, as well as the launch tool and a `launch.json` file.

Now let's update your `.gitignore` file. If you decide to add more launch actions or platforms to this project, make sure to update this again.

```
node_modules
.build
.keystore
launch.json
deployment_token.json
secrets.tar
```

Add a `mobile-config.js` file in your project root with this info.

```javascript
App.info({
  id: 'cc.newspring.LaunchTodosExample',
  name: 'LaunchTodosExample',
  description: 'Example of using launch',
  author: 'NewSpring Church',
  email: 'web@newspring.cc',
  website: 'https://newspring.cc',
  version: '0.0.1',
  buildNumber: '1'
});
```

Let's start filling out our variables in the `launch.json` file. Below is what we will end up with. For information about these variables, and how to obtain them, please see the [build](/actions/build/README.md), [galaxy](/actions/galaxy/README.md), and [hockey](/actions/hockey/README.md) action pages of the docs, but we will also walk through it below.

```json
{
  "APP_IDENTIFIER": "cc.newspring.LaunchBasicExample",
  "ANDROID_KEY": "launch-basic-example",
  "ANDROID_STORE_PASS": "password",
  "ANDROID_HOCKEY_TOKEN": "215d3df4b2ba4090918115207c13d718",
  "ANDROID_HOCKEY_ID": "9c21ad20059c4486baf98fb9ef472a9c",
  "GALAXY_DEPLOY_HOSTNAME": "galaxy.meteor.com",
  "GALAXY_SESSION_FILE": "deployment_token.json"
}
```

`APP_IDENTIFIER` can be what you like, but is generally defined in the backwards domain style (com.example.app). Let's generate the `ANDROID_KEY` and `ANDROID_STORE_PASS`.

#### Android

```shell
$ keytool -genkey -alias launch-basic-example -keyalg RSA \
    -keysize 2048 -validity 10000
```

This creates a key named `launch-basic-example`. You will be prompted to enter a password, and that should be the value of `ANDROID_STORE_PASS`.

#### Hockey

If you don't already have a Hockey account, [create one](https://hockeyapp.net) and then click "New App" from the dashboard page.

![](http://i.imgur.com/OX8zlfX.png)

Click "Create the app manually", because we are going to upload using `launch`! Then, fill out the form and click "Save".

![](http://i.imgur.com/etph9CY.png)

The next page it takes you to has your "App ID" on it, that will be your `ANDROID_HOCKEY_ID`.

To get the `ANDROID_HOCKEY_TOKEN`, go to your "Account Settings", then click "API Tokens" in the sidebar, and create a token assigned to your app.

![](http://i.imgur.com/bN54OVr.png)

#### Galaxy

If you don't have a Galaxy account, you will need to create one.

`GALAXY_DEPLOY_HOSTNAME` will be the region of Galaxy that you wish to deploy to. "galaxy.meteor.com" will be the US East region.

`GALAXY_SESSION_FILE` is the path to a json file used to authenticate with Galaxy. That can be created like this.

```shell
$ METEOR_SESSION_FILE=deployment_token.json meteor login
```

#### Run Locally

At this point, you should be able to run `launch` locally to build the app, deploy to galaxy, and upload to Hockey.

```shell
$ launch build launch-basic-example.meteorapp.com
$ launch galaxy launch-basic-example.meteorapp.com
$ launch hockey
```

#### Travis

To run this on Travis, first create a `.travis.yml` file in your project root and add this.

```yaml
language: node_js
node_js:
- '4'
before_cache:
- rm -f $HOME/.gradle/caches/modules-2/modules-2.lock
cache:
  directories:
  - $HOME/.gradle/caches/
  - $HOME/.gradle/wrapper/
before_install:
- tar xvf secrets.tar
- cp .keystore ~/.keystore
install:
- curl https://install.meteor.com | /bin/sh
- npm install
- npm install -g meteor-launch
- wget https://dl.google.com/android/android-sdk_r24.4.1-linux.tgz
- tar zxvf android-sdk_r24.4.1-linux.tgz > /dev/null
- mv android-sdk-linux .android
- export ANDROID_HOME="$TRAVIS_BUILD_DIR/.android"
- echo y | .android/tools/android update sdk --no-ui --all --filter tools,platform-tools,build-tools-23.0.3,android-23
- export ANDROID_ZIPALIGN="$TRAVIS_BUILD_DIR/.android/build-tools/23.0.3/zipalign"
- sudo apt-get install lib32z1 libc6-i386 lib32stdc++6 lib32gcc1 lib32ncurses5
script:
- launch galaxy launch-basic-example.meteorapp.com
- launch build launch-basic-example.meteor.com
- launch hockey
```

This is going to install Meteor, launch, the Android SDK, and a bunch of other stuff.

We need to encrypt the files we need available on the Travis server. We can do this with the Travis CLI tool.

```shell
$ gem install travis
```

Let's copy the `.keystore` file you generated in your home directory when you created your Android key.

```shell
$ cp ~/.keystore ./.keystore
```

We can encrypt `launch.json`, `.keystore`, and `deployment_token.json` so that we can commit them to our repo.

```shell
$ tar cvf secrets.tar launch.json .keystore deployment_token.json
$ travis encrypt-file secrets.tar .travis/secrets.tar.enc --add
```

This will also add some keys to Travis's environment variables for decryption, and it will add a task to the `before_install` section of your `.travis.yml` for decrypting it during the build.

Finally, push your repo to GitHub, turn builds on for this project on Travis, and you have automated everything!

---

## Kitchen Sink

In this example, we are going to use Travis's build matrix to:

1. Deploy server to Galaxy
2. Build an Android app
3. Build an iOS app
4. Distribute Android app through Hockey
5. Distribute iOS app through Hockey
6. Distribute Android app through Google Play Store
7. Distribute iOS app through TestFlight (Beta App Store)

Here is what can be made available publicly of the finished example:

1. [Code on GitHub](https://github.com/NewSpring/launch-todos-example)
2. [Build on Travis](https://travis-ci.org/NewSpring/launch-todos-example)
3. [Site on Galaxy](https://launch-todos-example.meteorapp.com/)
4. [iOS app download on Hockey](https://rink.hockeyapp.net/apps/dc6361da5fdd4c42ba3aed76ef894f22)
5. [Android app download on Hockey](https://rink.hockeyapp.net/apps/a6221f3834f149599f8da90bd23fd147)

The Google Play and TestFlight uploads you will have to take my word for, but you can see that they are uploading in the Travis builds.

#### Getting Started

Step by step instructions to come.
