# Launch

`launch` is a command line tool that automates the build and deployment of Meteor Corova projects to [Galaxy](https://galaxy.meteor.com/), the [iOS App Store](http://www.apple.com/itunes/charts/free-apps/), [Google Play](https://play.google.com/store), and [Hockey](https://www.hockeyapp.net/features/). You won't even have to open Xcode! Set up `launch`, throw it on a [CI](https://travis-ci.org/NewSpring/launch-basic-example), and never worry about deployment again.

![see ya](http://i.giphy.com/8E1uPDT9gfhJK.gif)

### Sample

```shell
$ launch build myapp.com
$ launch galaxy myapp.com
$ launch testflight
```

## Getting Started

### install

First, let's get launch installed globally.

```shell
$ npm install -g meteor-launch
```

### init

Next, we need to create a `launch.json` file in your project. This is what `launch` uses in your project to set all your project-specific variables (API tokens, directories, etc.). `launch` has a command for that.

```shell
$ launch init
```

You should now see a `launch.json` file in your project with a bunch of blank variables. You can fill these in as necessary later on.

### .gitignore

There are a few things to add to your `.gitignore`, including the `launch.json` file, because it will end up containing sensitive information. [Here](https://github.com/NewSpring/launch-todos-example/blob/master/.gitignore) is an example from a sample project, your needs will likely be different.

```
node_modules
settings.json

.build
.fastlane
.keystore
google-auth.json
launch.json
deployment_token.json
secrets.tar
*.mobileprovision
*.app.dSYM.zip
*.ipa
*.p12
```

### next

It's time to launch some things! For each `launch` action, there are specific variables that you will need to fill out in your `launch.json` file. For information on each action, use the sidebar. Happy launching!
