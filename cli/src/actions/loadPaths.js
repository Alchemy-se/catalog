// @flow
import {resolveAppPath, resolveOwnPath, nodePaths} from '../utils/paths';

export default async (catalogSrcDir: string = 'catalog', catalogBuildDir: string = 'catalog-build', options: Object) => ({

  unresolvedCatalogSrcDir: catalogSrcDir,
  catalogSrcDir: resolveAppPath(catalogSrcDir),
  catalogBuildDir: resolveAppPath(catalogBuildDir),
  catalogIndexJs: resolveAppPath(catalogSrcDir, 'index.js'),
  catalogIndexHtml: resolveAppPath(catalogSrcDir, 'index.html'),

  catalogSrcTemplateDir: resolveOwnPath('..', 'setup-template'),

  appPublic: resolveAppPath('public'),
  appRoot: resolveAppPath('.'),

  // TODO: Clean up
  appPackageJson: resolveAppPath('package.json'),
  appSrc: resolveAppPath('src'),
  yarnLockFile: resolveAppPath('yarn.lock'),
  babelrc: resolveAppPath('.babelrc'),
  appNodeModules: resolveAppPath('node_modules'),
  ownNodeModules: resolveAppPath('node_modules'),
  nodePaths: nodePaths
});
