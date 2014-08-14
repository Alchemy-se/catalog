_ = require('lodash')
marked = require('../../../lib/react-markdown')
React = require('react')
Frame = require('react-frame-component')
Card = require('../Card/Card')
CodeBlock = require('../CodeBlock/CodeBlock')
FramedCodeBlock = require('../CodeBlock/FramedCodeBlock')
{link} = React.DOM

seqKey = require('../../utils/seqKey')('cg-MarkdownRenderer')

MARKDOWN_CONFIG =
  gfm: true
  breaks: false
  sanitize: false
  smartLists: true
  smartypants: true

module.exports = (markdown, props) ->
  renderer = new marked.Renderer()
  renderer.heading = HeadingRenderer
  renderer.code = CodeRenderer(props)

  nodes = marked markdown, _.extend(renderer: renderer, MARKDOWN_CONFIG)

  nodes
    .reduce(splitIntoSections, [[]])
    .map(wrapSection)
    .concat(if props.iframe then [] else props.styles.map(createStyleElement))

CodeRenderer = (props) ->
  (code, modifiers = '') ->
    if props.iframe and modifiers isnt 'code'
      FramedCodeBlock
        key: seqKey()
        code: code
        modifiers: modifiers
        styles: props.styles
    else
      CodeBlock
        key: seqKey()
        code: code
        modifiers: modifiers

HeadingRenderer = (text, level) ->
  React.DOM["h#{level}"] {key: seqKey()}, text


#
# Functions
#

createStyleElement = (src) ->
  link {key: seqKey(), rel: 'stylesheet', type: 'text/css', href: src}

# Splits an array of DOM nodes into sections at each <h2>
# [h1, p, h2, p, p, h2, p] -> [[h1, p], [h2, p, p], [h2, p]]
splitIntoSections = (sections, node) ->
  if node.type.displayName is 'h2' # Caveat: this is a private React API call
    sections.push([node])          # Create a new section
  else
    _.last(sections).push(node)    # Append to current section
  sections

# Wraps all sections except the first in a Card component
wrapSection = (section, i) ->
  if i is 0 then section else Card(key: seqKey(), section)
