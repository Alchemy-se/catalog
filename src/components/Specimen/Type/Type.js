import React, { PropTypes } from 'react';

function getStyle(theme) {
  return {
    container: {
      background: theme.background,
      flexBasis: '100%',
      textRendering: 'initial',
      WebkitFontSmoothing: 'initial',
      MozOsxFontSmoothing: 'initial',
      marginTop: 10
    },
    wrapper: {
      padding: `${theme.sizeL}px`,
      maxWidth: `calc(100% - ${theme.sizeL * 2}px)`
    },
    title: {
      fontFamily: theme.fontMono,
      opacity: 0.4,
      margin: '10px 0'
    },
    heading: {
      maxWidth: '100%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    kerning: {
      textRendering: 'optimizeLegibility'
    },
    smoothing: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    },
    list: {
      listStyleType: 'none',
      paddingLeft: 0,
      marginLeft: 0
    }
  };
}

const lorem = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.`;
const kafka = `One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`;

class Type extends React.Component {
  render() {
    const {theme, entries, modifiers} = this.props;
    let styles = getStyle(theme);

    // check if a shorter paragraph should is demanded
    let truncate = modifiers.contains('shorter') ? 100 : null;
    // check if the modifier is set to em, otherwise assume px
    let unit = modifiers.contains('em') ? 'em' : 'px';
    // check if alternate dummy text is set
    let dummyText = modifiers.contains('kafka') ? kafka : lorem;
    // check if the modifier demands kerning
    let kerning = modifiers.contains('kern') ? styles.kerning : null;
    // check if the modifier demands font smoothing
    let smoothing = modifiers.contains('smoothen') ? styles.smoothing : null;
    // Use single word or sentence for headlines
    let headlineText = modifiers.contains('single') ? 'Hamburgefonstiv' : 'The quick brown fox jumps over the lazy dog';


    let type = entries.map( (entry, key) => {
      let fontColor = entry.color ? {color: entry.color} : null;
      let fontFamily = entry.font ? {fontFamily: entry.font} : null;
      let backgroundColor = entry.background ? {backgroundColor: entry.background} : null;
      let fontWeight = entry.weight ? {fontWeight: entry.weight} : null;
      let letterSpacing = entry.tracking ? {letterSpacing: entry.tracking + unit} : null;
      let backgroundImage = entry.image ? {backgroundImage: `url(${entry.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'} : null;


      let description = (
        <ul style={{...styles.title, ...styles.list, ...fontColor}}>
          {entry.color ? <li style={styles.list}>color: {entry.color + ';'}</li> : null}
          {entry.background ? <li style={styles.list}>background-color: {entry.background + ';'}</li> : null}
          {fontWeight ? <li style={styles.list}>font-weight: {entry.weight + ';'}</li> : null}
          {letterSpacing ? <li style={styles.list}>letter-spacing: {entry.tracking + unit + ';'}</li> : null}
        </ul>
        );

      let headings = entry.headings
        ? entry.headings.map( (heading, i) => {
          return (
            <div key={i}>
              <div style={{...styles.title, ...fontColor}}>h{i + 1} ({heading + unit})</div>
              <div style={{...styles.heading, ...fontFamily, ...fontWeight, ...letterSpacing, fontSize: `${heading + unit}`}}>{headlineText}</div>
            </div>
            );
        })
        : null;

      let paragraph = entry.paragraph
        ? (
          <div style={styles.paragraph}>
            <div style={{...styles.title, ...fontColor}}>
              Paragraph ({entry.paragraph.size + unit}/{entry.paragraph.line + unit})
            </div>
            <div style={{...fontFamily, ...fontWeight, ...letterSpacing, fontSize: `${entry.paragraph.size + unit}`, lineHeight: `${entry.paragraph.line + unit}`}}>
              {truncate ? `${dummyText.substring(0, 200)}…` : dummyText}
            </div>
          </div>
        )
        : null;

      return (
        <div key={key} style={{...styles.wrapper, ...kerning, ...smoothing, ...fontColor, ...backgroundColor, ...backgroundImage}}>
          {headings}
          {headings && paragraph ? <br/> : null}
          {paragraph}
          {description}
        </div>);
    });

    return (
        <section style={styles.container}>
          {type}
        </section>
      );
  }
}

Type.propTypes = {
  modifiers: PropTypes.array,
  entries: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default Type;
