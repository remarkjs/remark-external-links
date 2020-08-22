import unified = require('unified')
import externalLinks = require('remark-external-links')

unified().use(externalLinks)

unified().use(externalLinks, {})

unified().use(externalLinks, {target: false})
unified().use(externalLinks, {target: '_self'})

unified().use(externalLinks, {rel: 'nofollow'})
unified().use(externalLinks, {rel: ['nofollow', 'noopener', 'noreferrer']})

unified().use(externalLinks, {protocols: ['mailto']})

unified().use(externalLinks, {content: {type: 'text'}})
unified().use(externalLinks, {content: [{type: 'text'}]})

unified().use(externalLinks, {contentProperties: {title: 'span'}})
