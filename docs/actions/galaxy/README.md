# galaxy

```shell
$ launch galaxy myapp.com path/to/optional/settings.json
```

The `galaxy` action will deploy your app to [Galaxy](https://galaxy.meteor.com/). You will need to have a galaxy account to use this feature. You will also need to add two variables to `launch.json`.

```json
{
  "GALAXY_DEPLOY_HOSTNAME": "galaxy.meteor.com",
  "GALAXY_SESSION_FILE": "path/to/deployment_token.json"
}
```

- `GALAXY_DEPLAY_HOSTNAME`: the region in galaxy you wish to deploy to.
- `GALAXY_SESSION_FILE`: the path to the deployment taken used to authenticate with Galaxy. You can generate this by running:

```shell
$ METEOR_SESSION_FILE=deployment_token.json meteor login
```
