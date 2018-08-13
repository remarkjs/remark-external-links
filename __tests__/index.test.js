/* eslint-env jest */

var remark = require('remark')
var html = require('remark-html')
var externalLinks = require('..')

var input = '[remark](https://github.com/remarkjs/remark)'

test('should add the defaults when without options', async () => {
  expect(
    remark()
      .use(externalLinks)
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should do nothing if both are set to false', async () => {
  expect(
    remark()
      .use(externalLinks, {target: false, rel: false})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should add a target', async () => {
  expect(
    remark()
      .use(externalLinks, {target: '_blank', rel: false})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should add a rel', async () => {
  expect(
    remark()
      .use(externalLinks, {target: false, rel: 'nofollow'})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})

test('should add both', async () => {
  expect(
    remark()
      .use(externalLinks, {target: '_blank', rel: 'nofollow'})
      .use(html)
      .processSync(input)
      .toString()
  ).toMatchSnapshot()
})
