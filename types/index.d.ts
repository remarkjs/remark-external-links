// TypeScript Version: 3.4

import {Plugin} from 'unified'
import {Node} from 'unist'

interface RemarkExternalLinksOptions {
  /**
   * How to display referenced documents (`string?`: `_self`, `_blank`, `_parent`,
   * or `_top`, default: `_blank`).
   * Pass `false` to not set `target`s on links.
   */
  target?: '_self' | '_blank' | '_parent' | '_top' | false
  /**
   * [Link types][mdn-rel] to hint about the referenced documents (`Array.<string>`
   * or `string`, default: `['nofollow', 'noopener', 'noreferrer']`).
   * Pass `false` to not set `rel`s on links.
   *
   * > When using a `target`, add [`noopener` and `noreferrer`][mdn-a] to avoid
   * > exploitation of the `window.opener` API.
   *
   * [mdn-rel]: https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
   *
   * @defaultValue ['nofollow', 'noopener', 'noreferrer']
   */
  rel?: string[] | string
  /**
   * Protocols to check, such as `mailto` or `tel` (`Array.<string>`, default:
   * `['http', 'https']`).
   */
  protocols?: string[]
  /**
   * [**hast**][hast] content to insert at the end of external links
   * ([**Node**][node] or [**Children**][children]).
   * Will be inserted in a `<span>` element.
   *
   * Useful for improving accessibility by [giving users advanced warning when
   * opening a new window][g201].
   *
   * [hast]: https://github.com/syntax-tree/hast
   * [node]: https://github.com/syntax-tree/hast#nodes
   * [children]: https://github.com/syntax-tree/unist#child
   * [g201]: https://www.w3.org/WAI/WCAG21/Techniques/general/G201
   */
  content?: Node | Node[]
  /**
   * [`Properties`][properties] to add to the `span` wrapping `content`, when
   * given.
   */
  contentProperties?: Record<string, string>
}

declare const remarkExternalLinks: Plugin<[RemarkExternalLinksOptions?]>

export = remarkExternalLinks
