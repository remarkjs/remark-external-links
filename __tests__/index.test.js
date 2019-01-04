/* eslint-env jest */

var remark = require('remark')
var html = require('remark-html')
var externalLinks = require('..')

var input = [
  '[remark](https://github.com/remarkjs/remark)',
  '',
  '[relative link](./example.md) and [fragment link](#fragment)',
  '',
  '[missing][], [local][], and [external][].',
  '',
  '[current](.) [up](..) [relative link without ./](example.md)',
  '',
  '[local]: #local',
  '[external]: https://github.com/remarkjs/remark',
  '',
  '<mailto:test@example.com>'
].join('\n')

test('should add the defaults when without options', function() {
  expect(
    remark()
      .use(externalLinks)
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should do nothing if both are set to false', function() {
  expect(
    remark()
      .use(externalLinks, {target: false, rel: false})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should add a target', function() {
  expect(
    remark()
      .use(externalLinks, {target: '_blank', rel: false})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should add a rel', function() {
  expect(
    remark()
      .use(externalLinks, {target: false, rel: 'nofollow'})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should add both', function() {
  expect(
    remark()
      .use(externalLinks, {target: '_blank', rel: 'nofollow'})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should add default target or rel to mailto links', function() {
  expect(
    remark()
      .use(externalLinks, {protocols: ['http', 'https', 'mailto']})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})
