import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import configure from './configure';
import configureRoutes from './configureRoutes';

const start = (selector, config) => {
  ReactDOM.render(
    <Router history={createHistory()} routes={configureRoutes(configure(config))} />,
    document.querySelector(selector)
  );
};

export default {
  start
};
