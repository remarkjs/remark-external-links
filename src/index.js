import select from "unist-util-select"

const isRelativeUrlRegex = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/
const defaultTarget = "_blank"
const defaultRel = "nofollow noopener noreferrer"

function remarkExternalLinks(options = {}) {
  return (ast) => {
    select(ast, "link").forEach((node) => {
      if (!isRelativeUrlRegex.test(node.url)) {
        node.data = {
          hProperties: {
            ...options.target !== null &&
              {target: options.target || defaultTarget},
            ...options.rel !== null &&
              {rel: options.rel || defaultRel},
          },
        }
      }
    })
  }
}

export default remarkExternalLinks
