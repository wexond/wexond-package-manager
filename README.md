# wexond-package-manager

`wexond-package-manager` package manager for [`Wexond`](https://github.com/wexond/wexond), which is written in TypeScript and Node.js. It uses [`easy-vm`](https://github.com/Sential/easy-vm) to run plugins' scripts.

# Installation

```bash
$ npm install -g wexond-package-manager
```

# Usage

```bash
$ wpm <command> <params>
```

List of commands:

* `install` - Installs plugin from a GitHub repository.

  * `name` string - name of the GitHub repo for example `wexond/wexond-example-plugin`

* `update` - Checks if there is newer version of a plugin and if there is, it installs newer version of the plugin
  * `name` string - name of the GitHub repo

# API

## Quick example

```javascript
const wpm = require("wexond-package-manager");

wpm
  .install("wexond-example-plugin", false)
  .then(() => {
    console.log("Installation completed successfully");
  })
  .catch(e => {
    console.error(e);
  });
```

## Methods

`wpm.install` - Installs plugin from a GitHub repository.

* `name` string - name of the GitHub repo
* Returns `Promise<void>`

`wpm.update` - Checks if there is newer version of a plugin and if there is, it installs newer version of the plugin

* `name` string - name of the GitHub repo
* Returns `Promise<void>`

`wpm.run` - Runs a plugin in Node's VM.

* `name` string - name of the GitHub repo
* Returns `Promise<any>`

`wpm.list` - Lists all installed plugins.

* Returns `Promise<Package[]>`
