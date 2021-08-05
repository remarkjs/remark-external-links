/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast').Element['children'][number]} ElementChild
 *
 * @typedef Options
 *   Configuration.
 * @property {'_self'|'_blank'|'_parent'|'_top'|false} [target='_blank']
 *   How to display referenced documents (`string?`: `_self`, `_blank`,
 *   `_parent`, or `_top`, default: `_blank`).
 *   Pass `false` to not set `target`s on links.
 * @property {string[]|string|false} [rel=['nofollow', 'noopener', 'noreferrer']]
 *   Link types to hint about the referenced documents.
 *   Pass `false` to not set `rel`s on links.
 *
 *   > When using a `target`, add `noopener` and `noreferrer` to avoid
 *   > exploitation of the `window.opener` API.
 * @property {string[]} [protocols=['http', 'https']]
 *   Protocols to check, such as `mailto` or `tel`.
 * @property {ElementChild|ElementChild[]} [content]
 *   hast content to insert at the end of external links.
 *   Will be inserted in a `<span>` element.
 *
 *   Useful for improving accessibility by [giving users advanced warning when
 *   opening a new window.
 * @property {Properties} [contentProperties]
 *   `Properties` to add to the `span` wrapping `content`, when given.
 */

import {visit} from 'unist-util-visit'
import {definitions} from 'mdast-util-definitions'
import {parse} from 'space-separated-tokens'
import absolute from 'is-absolute-url'
import extend from 'extend'

const defaultTarget = '_blank'
const defaultRel = ['nofollow', 'noopener', 'noreferrer']
const defaultProtocols = ['http', 'https']

/**
 * Plugin to automatically add `target` and `rel` attributes to external links.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkExternalLinks(options = {}) {
  const target = options.target
  const rel = typeof options.rel === 'string' ? parse(options.rel) : options.rel
  const protocols = options.protocols || defaultProtocols
  const content =
    options.content && !Array.isArray(options.content)
      ? [options.content]
      : options.content
  const contentProperties = options.contentProperties || {}

  return (tree) => {
    const definition = definitions(tree)

    visit(tree, (node) => {
      if (node.type === 'link' || node.type === 'linkReference') {
        const ctx = node.type === 'link' ? node : definition(node.identifier)

        // Undefined references can be injected into the tree by plugins.
        /* c8 ignore next */
        if (!ctx) return

        const protocol = ctx.url.slice(0, ctx.url.indexOf(':'))

        if (absolute(ctx.url) && protocols.includes(protocol)) {
          const data = node.data || (node.data = {})
          const props = /** @type {Properties} */ (
            data.hProperties || (data.hProperties = {})
          )

          if (target !== false) {
            props.target = target || defaultTarget
          }

          if (rel !== false) {
            props.rel = (rel || defaultRel).concat()
          }

          if (content) {
            // `fragment` is not a known mdast node, but unknown nodes with
            // children are handled as elements by `mdast-util-to-hast`:
            // See: <https://github.com/syntax-tree/mdast-util-to-hast#notes>.
            node.children.push({
              // @ts-expect-error
              type: 'fragment',
              children: [],
              data: {
                hName: 'span',
                hProperties: extend(true, contentProperties),
                hChildren: extend(true, content)
              }
            })
          }
        }
      }
    })
  }
}
