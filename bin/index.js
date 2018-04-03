const program = require('commander');
const wpm = require('../build/index');

program.command('install <name>').action((name) => {
  wpm.default.install(name);
});

program.parse(process.argv);
