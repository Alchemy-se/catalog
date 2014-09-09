require('./FramedCodeBlock.scss')

React = require('react')
Frame = require('react-frame-component')
{div, section, style} = React.DOM

module.exports = React.createClass
  render: ->
    section
      className: "cg-CodeBlock #{if @props.modifiers then "cg-CodeBlock--#{@props.modifiers}" else ''}"
      Frame
        className: 'cg-Frame'
        head: [
          style(null, 'html,body{margin:0;padding:0}')
          # @props.styles.map(createStyleElement)
          # @props.scripts.map(createScriptElement)
        ]
        div
          dangerouslySetInnerHTML: {__html: @props.code}
