import {visit} from 'unist-util-visit'
import {definitions} from 'mdast-util-definitions'
import {parse} from 'space-separated-tokens'
import absolute from 'is-absolute-url'
import extend from 'extend'

const defaultTarget = '_blank'
const defaultRel = ['nofollow', 'noopener', 'noreferrer']
const defaultProtocols = ['http', 'https']

export default function remarkExternalLinks(options) {
  const settings = options || {}
  const target = settings.target
  let rel = settings.rel
  const protocols = settings.protocols || defaultProtocols
  let content = settings.content
  const contentProperties = settings.contentProperties || {}

  if (typeof rel === 'string') {
    rel = parse(rel)
  }

  if (content && typeof content === 'object' && !('length' in content)) {
    content = [content]
  }

  return transform

  function transform(tree) {
    const definition = definitions(tree)

    visit(tree, ['link', 'linkReference'], visitor)

    function visitor(node) {
      const ctx = node.type === 'link' ? node : definition(node.identifier)

      // Undefined references can be injected into the tree by plugins.
      /* c8 ignore next */
      if (!ctx) return

      const protocol = ctx.url.slice(0, ctx.url.indexOf(':'))

      if (absolute(ctx.url) && protocols.includes(protocol)) {
        const data = node.data || (node.data = {})
        const props = data.hProperties || (data.hProperties = {})

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
  }
}
