#!/usr/bin/env node

const program = require('commander');
const wpm = require('../build/index');

program.command('install <name>').action((name) => {
  wpm.default.install(name);
});

program.command('update <name>').action((name) => {
  wpm.default.update(name);
});

program.parse(process.argv);
