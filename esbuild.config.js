const esbuild = require('esbuild');
const path = require('path');

const buildConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  format: 'iife',
  globalName: 'UmaSkillTools',
  platform: 'browser',
  target: 'es2018',
  sourcemap: true,
  define: {
    'CC_GLOBAL': 'false'
  },
  external: ['fs', 'path', 'commander'],
  loader: {
    '.json': 'json'
  }
};

// Development build
if (process.argv.includes('--dev')) {
  esbuild.build({
    ...buildConfig,
    watch: true,
    minify: false,
  }).then(() => {
    console.log('Development build complete. Watching for changes...');
  }).catch(() => process.exit(1));
} else {
  // Production build
  esbuild.build({
    ...buildConfig,
    minify: true,
  }).then(() => {
    console.log('Production build complete.');
  }).catch(() => process.exit(1));
}


