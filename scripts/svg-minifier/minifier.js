const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const SVGO = require('svgo/lib/svgo');
const appRootDir = require('app-root-dir');
const chalk = require('chalk');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getSvgFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async subdir => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getSvgFiles(res) : res;
    }),
  );

  return files.reduce((a, f) => a.concat(f), []);
}

function writeSvgFile(pathFile, content) {
  fs.writeFile(pathFile, content, () => {});
}

// read more: https://github.com/svg/svgo#what-it-can-do
const svgoInstance = new SVGO({
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: true,
    },
  ],
});

async function optimizeSvgFile({ path, root, isReplace, isLast }) {
  fs.readFile(path, 'utf8', function(err, contents) {
    if (!err) {
      svgoInstance
        .optimize(contents, {
          path: path,
        })
        .then(function(result) {
          let newFilePath = path;
          if (!isReplace) {
            newFilePath = path.replace('.svg', '-min.svg');
          }
          writeSvgFile(newFilePath, result.data);
          console.log(chalk.gray(`> Minify ${newFilePath.split(root)[1]}`));

          if (isLast) {
            setTimeout(() => {
              console.log(
                chalk.green.bold(`
>>>>> ALL DONE - SVG MINIFIER <<<<<
`),
              );
            }, 300);
          }
        })
        .catch(() => console.error(chalk.red('Error when minify svg file')));
    }
  });
}

module.exports = function(paths) {
  const dirsScan = paths.split(',');

  // eslint-disable-next-line array-callback-return
  dirsScan.map(item => {
    const dir = resolve(appRootDir.get(), item);
    getSvgFiles(dir)
      .then(files => {
        const svgFiles = files.filter(i => String(i).endsWith('.svg'));
        console.log(
          chalk.blue(`
> Info: found ${svgFiles.length} svg files
`),
        );
        svgFiles.map(async (filePath, i) => {
          await optimizeSvgFile({
            path: filePath,
            root: item,
            isReplace: true,
            isLast: i === svgFiles.length - 1,
          });
        });
      })
      .catch(e => {
        console.error(
          chalk.red(`> Error when reading directories
`),
          e,
        );
      });
  });
};
