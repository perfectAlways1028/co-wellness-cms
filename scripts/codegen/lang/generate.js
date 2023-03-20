// const path = require('path');
const fs = require('fs-extra');
const appRootDir = require('app-root-dir');
const compareVersions = require('compare-versions');
const { exec } = require('../utils');

const rootDir = appRootDir.get();

const currentDir = `${rootDir}/scripts/codegen/lang`;
const appDir = `${rootDir}/src`;

function bootstrapLang() {
  const packageJson = require(`${rootDir}/package.json`);

  if (compareVersions(packageJson.dependencies.react, '16.3.0')) {
    throw new Error('You must have React >= 16.3.0 installed!');
  }

  const shouldAddReactCookie = !Object.keys(packageJson.dependencies).includes('react-cookie');

  if (shouldAddReactCookie) {
    exec('yarn add react-cookie');
  }

  // TODO: configure append context
  // const contextFile = path.resolve(appDir, 'context/index.js');
  // const currentContext = fs.readFileSync(contextFile, { encoding: 'utf-8' });

  // copy the context
  fs.copyFileSync(`${currentDir}/context/_locale.js`, `${appDir}/context/locale.js`);

  // copy the hooks
  fs.copyFileSync(`${currentDir}/hooks/_useLang.js`, `${appDir}/hooks/useLang.js`);

  // copy the HOC
  fs.copyFileSync(`${currentDir}/HOC/_withLang.js`, `${appDir}/components/HOC/withLang.js`);
}

if (process.argv.length > 2 && process.argv[2] === 'exec') {
  bootstrapLang();
}

module.exports = bootstrapLang;
