import React, {Component, PropTypes} from 'react';
import {heading} from '../../styles/typography';

export default class PageHeader extends Component {
  render() {
    const {theme, margin, title, superTitle} = this.props;

    return (
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        height: theme.pageHeadingHeight,
        background: theme.pageHeadingBackground
      }} >
        <div style={{
          position: 'absolute',
          bottom: theme.sizeL,
          left: margin
        }} >
          <h2 style={{
            ...heading(theme, 1),
            color: theme.pageHeadingTextColor,
            opacity: 0.6,
            margin: 0
          }}>
            {superTitle}
          </h2>
          <h1 style={{
            ...heading(theme, 3),
            color: theme.pageHeadingTextColor,
            margin: 0
          }}>
            {title}
          </h1>
        </div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  theme: PropTypes.object.isRequired,
  margin: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  superTitle: PropTypes.string.isRequired
};
