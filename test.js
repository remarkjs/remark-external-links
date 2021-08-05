import test from 'tape'
import {remark} from 'remark'
import html from 'remark-html'
import externalLinks from './index.js'

const input = [
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
  '<test@example.com>'
].join('\n')

test('remark-external-links', (t) => {
  t.equal(
    remark().use(externalLinks).use(html).processSync(input).toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">remark</a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">external</a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should add the defaults when without options'
  )

  t.equal(
    remark()
      .use(externalLinks, {target: false, rel: false})
      .use(html)
      .processSync(input)
      .toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark">remark</a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark">external</a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should do nothing if both are set to false'
  )

  t.equal(
    remark()
      .use(externalLinks, {target: '_blank', rel: false})
      .use(html)
      .processSync(input)
      .toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark" target="_blank">remark</a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark" target="_blank">external</a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should add a target'
  )

  t.equal(
    remark()
      .use(externalLinks, {target: false, rel: 'nofollow'})
      .use(html)
      .processSync(input)
      .toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark" rel="nofollow">remark</a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark" rel="nofollow">external</a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should add a rel'
  )

  t.equal(
    remark()
      .use(externalLinks, {target: '_blank', rel: 'nofollow'})
      .use(html)
      .processSync(input)
      .toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow">remark</a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow">external</a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should add both'
  )

  t.equal(
    remark()
      .use(externalLinks, {protocols: ['http', 'https', 'mailto']})
      .use(html)
      .processSync(input)
      .toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">remark</a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">external</a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com" target="_blank" rel="nofollow noopener noreferrer">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should add a target'
  )

  t.equal(
    remark()
      .use(externalLinks, {
        content: {type: 'text', value: ' (opens in a new window)'}
      })
      .use(html)
      .processSync(input)
      .toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">remark<span> (opens in a new window)</span></a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">external<span> (opens in a new window)</span></a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should add hast node as content'
  )

  t.equal(
    remark()
      .use(externalLinks, {
        content: [
          {type: 'text', value: ' ('},
          {
            type: 'element',
            tagName: 'em',
            properties: {},
            children: [{type: 'text', value: 'opens in a new window'}]
          },
          {type: 'text', value: ')'}
        ]
      })
      .use(html)
      .processSync(input)
      .toString(),
    [
      '<p><a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">remark<span> (<em>opens in a new window</em>)</span></a></p>',
      '<p><a href="./example.md">relative link</a> and <a href="#fragment">fragment link</a></p>',
      '<p>[missing][], <a href="#local">local</a>, and <a href="https://github.com/remarkjs/remark" target="_blank" rel="nofollow noopener noreferrer">external<span> (<em>opens in a new window</em>)</span></a>.</p>',
      '<p><a href=".">current</a> <a href="..">up</a> <a href="example.md">relative link without ./</a></p>',
      '<p><a href="mailto:test@example.com">test@example.com</a></p>',
      ''
    ].join('\n'),
    'should add hast children as content'
  )

  t.equal(
    remark()
      .use(externalLinks, {
        contentProperties: {className: ['alpha', 'bravo']},
        content: {type: 'text', value: ' (opens in a new window)'}
      })
      .use(html)
      .processSync('[a](https://example.com)')
      .toString(),
    [
      '<p><a href="https://example.com" target="_blank" rel="nofollow noopener noreferrer">a<span class="alpha bravo"> (opens in a new window)</span></a></p>',
      ''
    ].join('\n'),
    'should support `contentProperties`'
  )

  t.end()
})
