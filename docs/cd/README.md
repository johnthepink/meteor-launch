# Continuous Deployment

You can use `launch` on your local machine. But, its real power comes when you get it running on a CD server, such as [Travis](https://travis-ci.org/) or [CircleCI](https://circleci.com/). Then, you can have `launch` distribute your app automatically after merging a PR, or creating a GitHub release.

Since we don't want to commit our `launch.json` and other sensitive files to our git repo, you will need a different solution for getting those files on to your CD server.

## Travis

If you use Travis, you can use their command line tool to encrypt all of your sensitive files, and then commit the encrypted files to your git repo. Then, when Travis starts, it will decrypt the files using two environment variables that it keeps secret, and place them back in your project directory on the CD server. Super nice!

[Here](https://github.com/NewSpring/launch-basic-example) is an example from a sample project.

```shell
$ tar cvf secrets.tar launch.json .keystore deployment_token.json
$ travis encrypt-file secrets.tar .travis/secrets.tar.enc --add
```

First, this takes our sensitive files and creates a tar ball. Then, the Travis command line tool encrypts the tarball, and places it in the `.travis` directory. And, adding the `--add` flag automatically adds the decryption process to your `.travis.yml`.

## CircleCI

CircleCI doesn't have the same encryption tool that Travis has, but you could easily story the contents of your sensitive files in environment variables. Then, echo the contents of the files back in to your project directory when the build starts.

```
$ echo $LAUNCH_FILE > launch.json
```
