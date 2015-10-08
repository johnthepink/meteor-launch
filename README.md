# Meteor Fastlane

How to use [fastlane](https://github.com/KrauseFx/fastlane) with [meteor](https://github.com/meteor/meteor) to automate iOS builds to TestFlight, the AppStore, Hockey, and whatever else. Read fastlane's documentation for me.

## Before you build

First, clone all these files in to your meteor project. The fastlane files are in the `.fastlane` directory, so meteor will ignore them.

### Fastlane

Install fastlane:

~~~
sudo gem install fastlane
~~~

### mobile-config.js

Open `mobile-config.js` and fill out all your info.

### Environment Variables

Copy and set all your environment variables:

~~~
cp .fastlane/.env.example .fastlane/.env
~~~

### cordova-ios-requires-fullscreen

iOS9 introduced the split screen stuff for iPad, which means we either have to specify how to handle that or require fullscreen. You can fix this with [cordova-ui-requires-fullscreen](https://www.npmjs.com/package/cordova-ios-requires-fullscreen)

~~~
meteor add cordova:cordova-ui-requires-fullscreen@0.0.2
~~~

## Deploying

### Version/Build

*Before building, you should adjust your version and build number accordingly in `mobile-config.js`.*

### Metadata

You can use the files in the `.fastlane/metadata` folder to edit the data that will be uploaded to iTunesConnect.

### TestFlight

This command will:

- build meteor
- build app archive
- generate screenshots
- install provisioning profile
- upload to TestFlight
- take forever
- ping hipchat
- alert testers

~~~
./deploy.sh beta servername.com
~~~

### Hockey

This command will:

- build meteor
- build app archive
- generate screenshots
- install provisioning profile
- upload to Hockey
- ping hipchat
- alert testers

~~~
./deploy.sh hockey servername.com
~~~

### AppStore

This command will:

- build meteor
- build app archive
- generate screenshots
- install provisioning profile
- upload screenshots
- upload to AppStore
- take forever
- ping hipchat
- alert testers

~~~
./deploy.sh deploy servername.com
~~~
