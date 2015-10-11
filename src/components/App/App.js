import React, { PropTypes } from 'react';
import { RouteHandler } from 'react-router';

import AppLayout from './AppLayout';
import Menu from 'components/Menu/Menu';

class App extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
      path: PropTypes.string
    })).isRequired,
    pageNames: PropTypes.arrayOf(PropTypes.string),
    page: PropTypes.object.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string),
    scripts: PropTypes.arrayOf(PropTypes.string),
    theme: PropTypes.object.isRequired
  }
  static defaultProps = {
    styles: [],
    scripts: []
  }
  render() {
    const { theme, title, logoSrc, pages, page } = this.props;

    return (
      <AppLayout
        theme={theme}
        sideNav={<Menu title={title} logoSrc={logoSrc} pages={pages} theme={theme} />}
        pageNames={this.props.pageNames}
        pageList={this.props.pageList}
        currentPage={page.name}
      >
        <RouteHandler {...page} theme={theme} />
      </AppLayout>
    );
  }
}

export default App;
