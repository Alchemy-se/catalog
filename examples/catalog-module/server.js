#!/usr/bin/env node

/*eslint-disable*/

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var historyApiFallback = require('connect-history-api-fallback');
var portfinder = require('portfinder');
var clc = require('cli-color');
var webpackConfig = require('../../webpack.config');

webpackConfig.entry = [
  'webpack-hot-middleware/client',
  path.resolve(__dirname, './index')
];

webpackConfig.output.path = __dirname;
webpackConfig.module.loaders = [
  {test: /\.js$/, include: [__dirname, path.resolve(__dirname, '../../src')], loader: 'babel'},
  {test: /\.md$/, include: [__dirname], loaders: [path.resolve(__dirname, '../../src/loader'), 'raw']}
]
webpackConfig.output.filename = 'app.js';
// webpackConfig.resolveLoader = {
//   fallback: path.resolve(__dirname, '../../node_modules')
// };

var banner = [
  "         __                       ",
  "       /   )          /)          ",
  "_____ /   _  _/_ _   // _  ______.",
  "     /   (_(_(__(_(_(/_(_)(_/     ",
  "     \\___/               .-/—    ",
  "                        (_/       "
].join("\n");

function server(options, config) {
  var app = express();

  app.use(historyApiFallback());

  var compiler = webpack(config);

  app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      assets: true,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      timings: true,
      version: false
    }
  }));

  app.use(hotMiddleware(compiler, {log: false}));

  app.use(express.static('.'));

  app.listen(options.port, options.host, function (err, result) {
    if (err) { throw err };
    console.log(clc.erase.screen);
    console.log(clc.red(banner));
    console.log(clc.red('\nCatalog server running at ' + clc.underline('http://' + options.host + ':' + options.port)) + '\n');
  });
};

portfinder.getPort({port: 8080, host: '0.0.0.0'}, function(err, port) {
  if (err) { throw err; }
  server({port: port, host: '0.0.0.0'}, webpackConfig);
});
