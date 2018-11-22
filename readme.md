# remark-external-links

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]

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

[build]: https://travis-ci.org/remarkjs/remark-external-links

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-external-links.svg

[coverage]: https://codecov.io/github/remarkjs/remark-external-links

[downloads-badge]: https://img.shields.io/npm/dm/remark-external-links.svg

[downloads]: https://www.npmjs.com/package/remark-external-links

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[license]: license

[author]: https://xuopled.netlify.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md

[mdn-rel]: https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types

[mdn-a]: https://developer.mozilla.org/en/docs/Web/HTML/Element/a
