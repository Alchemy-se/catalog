// @flow
import webpack from 'webpack';
import {errorMessage} from '../utils/format';
import {rimraf} from 'sander';

// Print out errors
function printErrors(summary, errors) {
  console.log(errorMessage(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

export default async (config: Object, paths: Object) => {
  const compiler = webpack(config);
  await rimraf(paths.catalogBuildDir);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        printErrors('Failed to compile.', [err]);
        process.exit(1);
      }

      if (stats.compilation.errors.length) {
        printErrors('Failed to compile.', stats.compilation.errors);
        process.exit(1);
      }

      if (process.env.CI && stats.compilation.warnings.length) {
        printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', stats.compilation.warnings);
        process.exit(1);
      }

      resolve(true);
    });
  });
};
