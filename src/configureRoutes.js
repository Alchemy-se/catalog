import React from 'react';
import {Route} from 'react-router';
import configure from './configure';
import warning from './utils/warning';
import CatalogContext from './components/CatalogContext';
import PageContentLoader from './components/Page/PageContentLoader';

const pageToRoute = ({path, component}) => ({
  component: component ? component : PageContentLoader,
  path
});

const pageToJSXRoute = ({path, component}) => <Route key={path} path={path} component={component ? component : PageContentLoader} />;

const autoConfigure = (config) => {
  warning(
    !config.__catalogConfig,
    'The `configure` function is deprecated; use `configureRoutes` or `configureJSXRoutes` directly.'
  );

  return config.__catalogConfig ? config : configure(config);
};

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
