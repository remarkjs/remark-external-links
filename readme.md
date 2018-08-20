# remark-external-links [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Add target and rel attributes to external links with [**remark**][remark].

## Installation

[npm][]:

```bash
npm install remark-external-links
```

## Usage

Say we have the following file, `example.js`:

```js
var html = require('remark-html')
var remark = require('remark')
var externalLinks = require('remark-external-links')

remark()
  .use(externalLinks, {target: false, rel: ['nofollow']})
  .use(html)
  .process('[remark](https://github.com/remarkjs/remark)', function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<p><a href="https://github.com/remarkjs/remark" rel="nofollow">remark</a></p>
```

## API

### `remark.use(externalLinks[, options])`

Add target and rel attributes to external links.

###### `options.target`

How to display referenced documents (`string?`: `_self`, `_blank`, `_parent`,
or `_top`, default: `_blank`).
Pass `false` to not set `target`s on links.

###### `options.rel`

[Link types][mdn-rel] to hint about the referenced documents
(`Array.<string>` or `string`, default: `['nofollow', 'noopener', 'noreferrer']`).
Pass `false` to not set `rel`s on links.

> When using a `target`, add [`noopener` and `noreferrer`][mdn-a] to avoid
> exploitation of the `window.opener` API.

## Contribute

See [`contributing.md` in `remarkjs/remark`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Cédric Delpoux][author]

[build-badge]: https://img.shields.io/travis/remarkjs/remark-external-links.svg

[build-status]: https://travis-ci.org/remarkjs/remark-external-links

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-external-links.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-external-links

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: license

[author]: http://xuopled.netlify.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md

[mdn-rel]: https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types

[mdn-a]: https://developer.mozilla.org/en/docs/Web/HTML/Element/a
