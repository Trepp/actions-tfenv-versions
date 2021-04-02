# Display tfenv Version Files

This GitHub action will crawl a directory structure and create a report of the `.terraform-version` file and version numbers for each directory.

## Inputs

### `folder`

**Required** This is the starting folder to begin crawling. It should end with a trailing slash, ie: `./accounts/`.

## Publish New Version

Actions are run from GitHub repos so we will checkin the packed dist folder.

```bash
git checkout releases/v1
git merge main
npm run package
git add dist
git commit -a -m "chore: publish release"
git push origin releases/v1
```

[Create or update the v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action.

```bash
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

Your action is now published! :rocket:
