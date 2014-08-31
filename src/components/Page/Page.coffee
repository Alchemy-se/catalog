_ = require('lodash')
reqwest = require('reqwest')
React = require('react')
Loader = require('./Loader')
MarkdownRenderer = require('../../MarkdownRenderer')

Card = require('../Card/Card')
Specimen = require('../Specimen/Specimen')

seqKey = require('../../utils/seqKey')('cg-Page')

{div, link} = React.DOM

module.exports = React.createClass
  propTypes:
    title:   React.PropTypes.string.isRequired
    name:    React.PropTypes.string.isRequired
    src:     React.PropTypes.string.isRequired
    styles:  React.PropTypes.arrayOf(React.PropTypes.string)
    scripts: React.PropTypes.arrayOf(React.PropTypes.string)
    iframe:  React.PropTypes.bool

  getDefaultProps: ->
    styles: []
    scripts: []
    iframe: false

  getInitialState: ->
    error: null
    content: null

  componentDidMount: ->
    @props.scripts.map(Catalog.actions.runscript)
    @fetchPageData()

  render: ->
    if @state.error?
      div {}, "Error: #{@state.error}"
    else if @state.content?
      Page
        content: @state.content
        styles: @props.styles
        iframe: @props.iframe
    else
      Loader()

  fetchPageData: ->
    reqwest(url: @props.src, type: 'text')
      .then((res) => @setState content: res.responseText)
      .fail (res) =>
        @setState
          error: res.statusText
          content: null


Page = React.createClass
  render: ->
    div {className: 'cg-Page'},
      @styleNodes()
      @contentNodes()

  styleNodes: ->
    @props.styles.map (src) ->
      link {key: seqKey(), rel: 'stylesheet', type: 'text/css', href: src}

  contentNodes: ->
    MarkdownRenderer
      text: @props.content
      section: (children) ->
        Card(key: seqKey(), children)
      renderer:
        code: (code, configStr) =>
          Specimen _.extend {key: seqKey(), code: code, iframe: @props.iframe, styles: @props.styles}, consumeConfigStr(configStr)
        heading: (text, level) ->
          React.DOM["h#{level}"] {key: seqKey()}, text


consumeConfigStr = (str = '') ->
  [specimen, optionsStr] = str.split('|')
  options = _.compact (optionsStr or '').split(',')

  specimen:  if _.isEmpty(specimen) then 'bg-light-pattern' else specimen
  runscript: _.include options, 'run-script'
  fullbleed: _.include options, 'fullbleed'
