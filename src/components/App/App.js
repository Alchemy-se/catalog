import React, { Children } from "react";
import PropTypes from "prop-types";
import DocumentTitle from "react-document-title";
import { catalogShape } from "../../CatalogPropTypes";

import AppLayout from "./AppLayout";
import Menu from "../Menu/Menu";

const getDocumentTitle = ({ title, page }) =>
  title === page.superTitle
    ? `${page.superTitle} – ${page.title}`
    : `${title} – ${page.superTitle} – ${page.title}`;

const renderStyles = styles => {
  return styles.map((src, i) => (
    <link key={i} href={src} rel="stylesheet" type="text/css" />
  ));
};

class App extends React.Component {
  render() {
    const { catalog } = this.context;

    const {
      catalog: { globalStyles }
    } = this.context;

    console.log(globalStyles);

    return (
      <AppLayout {...catalog} sideNav={<Menu {...catalog} />}>
        <DocumentTitle title={getDocumentTitle(catalog)} />
        {Children.only(this.props.children)}
        {renderStyles(globalStyles)}
      </AppLayout>
    );
  }
}

App.contextTypes = {
  catalog: catalogShape.isRequired
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
