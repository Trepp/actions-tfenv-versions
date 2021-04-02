# Display tfenv Version Files

This GitHub action will crawl a directory structure and create a report of the `.terraform-version` file and version numbers for each directory.

## Inputs

### `folder`

**Required** This is the starting folder to begin crawling. It should end with a trailing slash, ie: `./accounts/`.

## How to Use

This action will create a markdown file named `tfenv-versions.md` in a reports folder after the action complete. This can then be uploaded as an artifact to GitHub. For easy viewing the markdown data is also prinpted out to the console for easy viewing on GitHub.

```yaml
on: [push]

jobs:
  checkov-job:
    runs-on: ubuntu-latest
    name: tfenv-versions
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2
      - name: list-tfenv-versions
        uses: Trepp/actions-tfenv-versions@v1
        with:
          folder: './'
      - name: Archive tfenv-versions results
        uses: actions/upload-artifact@v2
        with:
          name: tfenv-versions
          path: reports/*.md
```

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
