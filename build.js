const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

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

async function build() {
  try {
    console.log('Building for browser...');
    
    if (process.argv.includes('--dev')) {
      await esbuild.build({
        ...buildConfig,
        watch: true,
        minify: false,
      });
      console.log('Development build complete. Watching for changes...');
    } else {
      await esbuild.build({
        ...buildConfig,
        minify: true,
      });
      console.log('Production build complete.');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();


