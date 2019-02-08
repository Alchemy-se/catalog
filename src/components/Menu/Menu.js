import PropTypes from "prop-types";
import React from "react";
import { css } from "../../emotion";
import { pagesShape } from "../../CatalogPropTypes";
import { heading, text, getFontSize } from "../../styles/typography";
import Link from "../Link/Link";
import logo from "./catalog_logo.svg";

import ListItem from "./ListItem";

export function style(theme) {
  const logoBottomMargin = getFontSize(theme, 5);

  return {
    bar: {
      background: "#EDF1F6",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    h1: {
      boxSizing: "border-box",
      margin: 0,
      padding: "21px 38px",
      height: theme.pageHeadingHeight,
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      fontSize: "1em"
    },
    title: {
      ...heading(theme, 1),
      color: "black",
      fontWeight: 700,
      marginBottom: logoBottomMargin,
      marginTop: 0
    },
    logo: {
      width: "100%",
      marginBottom: logoBottomMargin,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 100%",
      flexGrow: 1
    },
    // Make it accessible to screen readers, hide visually, see http://webaim.org/techniques/css/invisiblecontent/#absolutepositioning
    logoTitle: {
      position: "absolute",
      left: "-10000px",
      top: "auto",
      width: "1px",
      height: "1px",
      overflow: "hidden"
    },
    list: {
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    listNested: {
      borderTop: "none",
      borderBottom: "none",
      padding: "0 0 15px 40px"
    },
    info: {
      ...text(theme, -1),
      padding: 20,
      color: "#1964A3"
    },
    link: {
      color: "#1964A3"
    }
  };
}

class Menu extends React.Component {
  render() {
    const { theme, pageTree, logoSrc, title, basePath } = this.props;

    const currentStyle = style(theme);

    const titleString = title ? title : "";

    return (
      <div className={css(currentStyle.bar)}>
        <div className={css({ flexGrow: 1 })}>
          <Link to={basePath} className={css({ textDecoration: "none" })}>
            <h1 className={css(currentStyle.h1)} />
          </Link>
          <ul className={css(currentStyle.list)}>
            {pageTree
              .filter(page => !page.hideFromMenu)
              .map(page => (
                <ListItem key={page.id} page={page} theme={theme} />
              ))}
          </ul>
        </div>
        <div className={css(currentStyle.info)}>
          <p>
            <a
              className={css(currentStyle.link)}
              href="https://www.github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </p>
          <p>
            <a
              className={css(currentStyle.link)}
              href="https://www.absctract.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abstract
            </a>
          </p>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  pageTree: pagesShape.isRequired,
  theme: PropTypes.object.isRequired,
  logoSrc: PropTypes.string,
  basePath: PropTypes.string,
  title: PropTypes.string
};

Menu.defaultProps = {
  styles: [],
  scripts: []
};

export default Menu;
