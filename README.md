# [remark]-external-links [![Build Status](https://travis-ci.org/xuopled/remark-external-links.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/remark-external-links.svg)][npm]

> Automatically adds the target and rel attributes to external links.


## Install

### npm:

```
npm install remark-external-links --save
```

### yarn:

```
yarn add remark-external-links
```


## Example

remark-external-links is designed to work with
[remark-html][html].
It add the target and rel attributes to external links.

```js
var externalLinks = require("remark-external-links")
var html = require("remark-html")
var remark = require("remark")

// OR

import externalLinks from "remark-external-links"
import html from "remark-html"
import remark from "remark"

remark()
  .use(externalLinks, {
      target: null,
      rel: "nofollow",
  })
  .use(html)
  .process("[remark](https://github.com/gnab/remark)")

// yield
// <p><a href="https://github.com/gnab/remark" rel="nofollow">remark</a></p>
```

*Note that this module* ***must*** *be included before remark-html.*


## API

### remark.use(externalLinks, [options])

#### options

##### target

Type: `string`
Default: `_blank`

Specifies where to display the linked URL.
The value should be on of : `_self`, `_blank`, `_parent`, `_top`

*You can specify `null` to do not add the `target` attribute to your links*

##### rel

Type: `string`
Default: `nofollow noopener noreferrer`

Specifies the relationship of the target object to the link object.
The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).

*You can specify `null` to do not add the `rel` attribute to your links*

*[When using target, consider adding rel="noopener noreferrer" to avoid exploitation of the window.opener API.](https://developer.mozilla.org/en/docs/Web/HTML/Element/a)*


## Changelog

See [changelog](./CHANGELOG.md)


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## Development

### Clean `lib` folder

```js
npm run clean
```

### Build `lib` folder

```js
npm run build
```

### Lint `src` folder

```js
npm run lint
```

### Test `src` folder

```js
npm run test
```


## License

MIT


[ci]: https://travis-ci.org/xuopled/remark-external-links
[npm]: http://badge.fury.io/js/remark-external-links
[html]: https://github.com/wooorm/remark-html
[remark]: https://github.com/wooorm/remark
