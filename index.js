import {visit} from 'unist-util-visit'
import {definitions} from 'mdast-util-definitions'
import {parse} from 'space-separated-tokens'
import absolute from 'is-absolute-url'
import extend from 'extend'

var defaultTarget = '_blank'
var defaultRel = ['nofollow', 'noopener', 'noreferrer']
var defaultProtocols = ['http', 'https']

export default function remarkExternalLinks(options) {
  var settings = options || {}
  var target = settings.target
  var rel = settings.rel
  var protocols = settings.protocols || defaultProtocols
  var content = settings.content
  var contentProperties = settings.contentProperties || {}

  if (typeof rel === 'string') {
    rel = parse(rel)
  }

  if (content && typeof content === 'object' && !('length' in content)) {
    content = [content]
  }

  return transform

  function transform(tree) {
    var definition = definitions(tree)

    visit(tree, ['link', 'linkReference'], visitor)

    function visitor(node) {
      var ctx = node.type === 'link' ? node : definition(node.identifier)
      var protocol
      var data
      var props

      // Undefined references can be injected into the tree by plugins.
      /* c8 ignore next */
      if (!ctx) return

      protocol = ctx.url.slice(0, ctx.url.indexOf(':'))

      if (absolute(ctx.url) && protocols.indexOf(protocol) !== -1) {
        data = node.data || (node.data = {})
        props = data.hProperties || (data.hProperties = {})

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
