const { execSync } = require('child_process');
const { join } = require('path');
const { readdirSync, statSync } = require('fs');
const appRootDir = require('app-root-dir');

function exec(command) {
  execSync(command, { stdio: 'inherit', cwd: appRootDir.get() });
}

function dirs(path) {
  return readdirSync(path).filter(f => statSync(join(path, f)).isDirectory());
}

module.exports = {
  exec,
  dirs,
};
