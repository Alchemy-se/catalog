import { inlineElements } from './typography';

function baseListStyle() {
  return {
    width: '100%',
    marginLeft: 0,
    paddingLeft: '2em'
  };
}

export function inlineUlist(theme, {selector, style = {}, level = 0}) {
  const nestedStyles = level < 3 ? inlineUlist(theme, {selector: `${selector} > li > ul`, style, level: level + 1}) : {};
  return {
    [selector]: {
      listStyle: 'disc',
      ...baseListStyle(),
      ...style
    },
    ...inlineElements(theme, {selector}),
    ...nestedStyles,
  };
}

export function inlineOlist(theme, {selector, style = {}, level = 0}) {
  const nestedStyles = level < 3 ? inlineOlist(theme, {selector: `${selector} > li > ol`, style, level: level + 1}) : {};
  return {
    [selector]: {
      listStyle: 'decimal',
      ...baseListStyle(),
      counterReset: 'item',
      ...style
    },
    ...inlineElements(theme, {selector}),
    ...nestedStyles,
  };
}
