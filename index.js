var visit = require('unist-util-visit')
var definitions = require('mdast-util-definitions')
var spaceSeparated = require('space-separated-tokens').parse
var isAbsoluteURL = require('is-absolute-url')

module.exports = externalLinks

var defaultTarget = '_blank'
var defaultRel = ['nofollow', 'noopener', 'noreferrer']
var defaultProtocols = ['http', 'https']

function externalLinks(options) {
  var opts = options || {}
  var target = opts.target
  var rel = opts.rel
  var protocols = opts.protocols || defaultProtocols

  if (typeof rel === 'string') {
    rel = spaceSeparated(rel)
  }

  return transform

  function transform(tree) {
    var definition = definitions(tree)

    visit(tree, ['link', 'linkReference'], visitor)

    function visitor(node) {
      var ctx = node.type === 'link' ? node : definition(node.identifier)

      if (!ctx) return

      var protocol = ctx.url.slice(0, ctx.url.indexOf(':'))
      var data
      var props

      if (isAbsoluteURL(ctx.url) && protocols.indexOf(protocol) !== -1) {
        data = node.data || (node.data = {})
        props = data.hProperties || (data.hProperties = {})

        if (target !== false) {
          props.target = target || defaultTarget
        }

        if (rel !== false) {
          props.rel = (rel || defaultRel).concat()
        }
      }
    }
  }
}
