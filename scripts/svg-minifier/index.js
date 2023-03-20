const readline = require('readline');
const chalk = require('chalk');
const minifier = require('./minifier');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  chalk.green.bold(`
>>>>> WELCOME TO SVG MINIFIER <<<<<`),
);
console.log(
  chalk.gray(`
Tip:
> You can pass array of paths using comma (,) separator

`),
);

rl.question(
  `Please type directory you want to scan? e.g: "src/assets"

> `,
  paths => {
    minifier(paths);
    rl.close();
  },
);
