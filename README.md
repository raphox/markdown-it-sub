# markdown-it-whatsapp

[![Build Status](https://img.shields.io/travis/markdown-it/markdown-it-whatsapp/master.svg?style=flat)](https://travis-ci.org/markdown-it/markdown-it-whatsapp)
[![NPM version](https://img.shields.io/npm/v/markdown-it-whatsapp.svg?style=flat)](https://www.npmjs.org/package/markdown-it-whatsapp)
[![Coverage Status](https://img.shields.io/coveralls/markdown-it/markdown-it-whatsapp/master.svg?style=flat)](https://coveralls.io/r/markdown-it/markdown-it-whatsapp?branch=master)

> Strikethrough (`<strike>`) tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

**v1.+ requires `markdown-it` v4.+, see changelog.**

`H~2~0` => `H<strike>2</strike>O`

Markup is based on [pandoc](http://johnmacfarlane.net/pandoc/README.html#superscripts-and-subscripts) definition. But nested markup is currently not supported.

## Install

node.js, browser:

```bash
npm install markdown-it-whatsapp --save
bower install markdown-it-whatsapp --save
```

## Use

```js
var md = require("markdown-it")().use(require("markdown-it-whatsapp"));

md.render("H~2~0"); // => '<p>H<strike>2</strike>O</p>'
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitWhatsapp`.

## License

[MIT](https://github.com/markdown-it/markdown-it-whatsapp/blob/master/LICENSE)
