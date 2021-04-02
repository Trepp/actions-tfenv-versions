// import fs from "fs/promises"
const fs = require('fs').promises;
const core = require('@actions/core');

async function run() {
  const folder = core.getInput('folder', { required: true });
  const results = [];

  for await (const file of getFiles(folder, null)) {
    // const version = (await fs.readFile(file.path, 'utf8')).split('\n')[0];
    results.unshift({
      path: file.path,
      version: file.version,
      containsTfFile: file.containsTfFile,
    });
  }

  // TODO save as file and possibly upload as artifact
  console.log(JSON.stringify(results, null, 2));
}

/**
 * Recursive function to get a list of folders with the associated terraform-version
 *
 * @param {string} path The directory path to search
 * @param {string} parentVersion The tf version number from a preceding parent folder
 */
async function* getFiles(path, parentVersion) {
  const entries = await fs.readdir(path, { withFileTypes: true });
  let currentVersion = parentVersion;
  let foundTfFile = false;

  // check if current folder contains .terraform-version file
  try {
    const foundVersion = (await fs.readFile(`${path}.terraform-version`, 'utf8')).split('\n')[0];
    currentVersion = foundVersion;
    foundTfFile = true;
  } catch (err) {
    // no-op, folder doesn't contain file
  }

  for (let file of entries) {
    if (file.isDirectory() && file.name !== '.git' && file.name !== '.github') {
      yield* getFiles(`${path}${file.name}/`, currentVersion);
    }
  }
  yield { path: path, version: currentVersion, containsTfFile: foundTfFile };
}

run();
