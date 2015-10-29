import reqwest from 'reqwest';

import React from 'react';
import {actions} from 'core/Catalog';
import CatalogPropTypes from 'core/PropTypes';

import Loader from './Loader';
import PageRenderer from './PageRenderer';

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      content: null
    };
  }

  componentDidMount() {
    this.props.page.scripts.forEach(actions.runscript);
    this.fetchPageData();
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    } else if (this.state.content) {
      return <PageRenderer {...this.props} content={this.state.content} />;
    }
    return <Loader />;
  }

  fetchPageData() {
    reqwest({url: this.props.page.src, type: 'text'})
      .then((res) => this.setState({content: res.responseText}))
      .fail((res) => {
        return this.setState({
          error: res.statusText,
          content: null
        });
      });
  }
}

Page.propTypes = {
  page: CatalogPropTypes.page.isRequired
};

Page.defaultProps = {
  styles: [],
  scripts: []
};

export default Page;
