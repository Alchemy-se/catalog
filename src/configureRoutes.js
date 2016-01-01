import React from 'react';
import {Route} from 'react-router';
import configure from './configure';
import CatalogContext from './components/CatalogContext';
import PageContentLoader from './components/Page/PageContentLoader';
import PageRenderer from './components/Page/PageRenderer';

const wrapComponent = (Component) => {
  const WrappedComponent = () => <PageRenderer content={<Component />} />;
  return WrappedComponent;
};

const pageToRoute = ({path, component}) => ({
  component: component ? wrapComponent(component) : PageContentLoader,
  path
});

const pageToJSXRoute = ({path, component}) => <Route key={path} path={path} component={component ? wrapComponent(component) : PageContentLoader} />;

const autoConfigure = (config) => config.__catalogConfig ? config : configure(config);

export default (config) => {
  const finalConfig = autoConfigure(config);
  return {
    component: CatalogContext(finalConfig),
    childRoutes: finalConfig.pages.map(pageToRoute)
  };
};

export const configureJSXRoutes = (config) => {
  const finalConfig = autoConfigure(config);
  return (
    <Route component={CatalogContext(finalConfig)}>
      {finalConfig.pages.map(pageToJSXRoute)}
    </Route>
  );
};
