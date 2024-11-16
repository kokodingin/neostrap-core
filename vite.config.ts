import { defineConfig, normalizePath, build } from 'vite';
import fs from 'fs';
import path, { extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import legacy from '@vitejs/plugin-legacy';

// TypeScript types
import { InlineConfig, UserConfigExport } from 'vite';

// Get current file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the root directory for Vite
const root = resolve(__dirname, 'src');

/**
* Retrieve HTML files from the source directory.
* @returns {Record<string, string>} An object where the keys are the filenames (without the extension) and the values are the full file paths.
*/
const getFiles = (): Record<string, string> => {
  const files: Record<string, string> = {};

  fs.readdirSync(root)
    .filter((filename) => filename.endsWith('.html'))
    .forEach((filename) => {
      files[filename.slice(0, -5)] = resolve(root, filename);
    });

  return files;
};

// Get all files to be used as input for Vite
const files = getFiles();

/**
* Prepare variables for Nunjucks templates.
* @param {string} mode The current build mode ('development' or 'production').
* @returns {Record<string, object>} An object containing variables for each HTML file.
*/
const getVariables = (mode: string): Record<string, object> => {
  const variables: Record<string, object> = {};
  Object.keys(files).forEach((filename) => {
    if (filename.includes('layouts')) filename = `layouts/${filename}`;
    variables[filename + '.html'] = {
      web_title: 'NeoStrap Dashboard',
      isDev: mode === 'development',
    };
  });
  return variables;
};

// Modules and extensions to copy
const modulesToCopy: Record<string, boolean> = {
  '@icon/dripicons': false,
  '@fortawesome/fontawesome-free': false,
  'rater-js': false,
  'bootstrap-icons': false,
  apexcharts: true,
  'perfect-scrollbar': true,
  flatpickr: true,
  filepond: true,
  'filepond-plugin-file-validate-size': true,
  'filepond-plugin-file-validate-type': true,
  'filepond-plugin-image-crop': true,
  'filepond-plugin-image-exif-orientation': true,
  'filepond-plugin-image-filter': true,
  'filepond-plugin-image-preview': true,
  'filepond-plugin-image-resize': true,
  'feather-icons': true,
  dragula: true,
  dayjs: false,
  'chart.js': true,
  'choices.js': false,
  parsleyjs: true,
  sweetalert2: true,
  summernote: true,
  jquery: true,
  quill: true,
  tinymce: false,
  'toastify-js': false,
  'datatables.net': false,
  'datatables.net-bs5': false,
  'simple-datatables': true,
  jsvectormap: true,
};

/**
* Prepare the list of modules to be copied.
* @returns {Array<{ src: string; dest: string; rename: string }>} An array of objects describing the modules to be copied.
*/
const copyModules = Object.keys(modulesToCopy).map((moduleName) => {
  const withDist = modulesToCopy[moduleName];
  return {
    src: normalizePath(resolve(__dirname, `./node_modules/${moduleName}${withDist ? '/dist' : ''}`)),
    dest: 'assets/extensions',
    rename: moduleName,
  };
});

/**
* Inline build configuration for Vite.
*/
const inlineBuildConfig: InlineConfig = {
  configFile: false,
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, 'dist/assets/compiled/js'),
    lib: {
      name: 'app',
      formats: ['umd'],
      fileName: 'app',
      entry: './src/assets/js/main.ts',
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
};

/**
* A Vite plugin that removes certain attributes from HTML files.
* @returns {import('vite').Plugin} The Vite plugin.
*/
const noAttr = (mode: string): import('vite').Plugin => {
  return {
    name: 'no-attribute',
    transformIndexHtml(html: string) {      
      function replaceMultiple(str: string, replacements: Array<Record<string, string>>): string {
        return replacements.reduce((acc, replacement) => {
          const [[oldStr, newStr]] = Object.entries(replacement);
          return acc.split(oldStr).join(newStr);
        }, str);
      }

      const result = replaceMultiple(html, [
        { 'type="module"': '' },
        { 'import.meta.url': '' },
        { crossorigin: '' },
      ]);

      return mode !== 'development' ? result : html;
    },
  };
};

// Start building with the inline configuration
build(inlineBuildConfig);

// Vite configuration export
const config: UserConfigExport = defineConfig((env) => ({
  publicDir: 'static',
  base: './',
  root,
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    noAttr(env.mode),
    nunjucks({
      templatesDir: root,
      variables: getVariables(env.mode),
      nunjucksEnvironment: {
        filters: {
          containString: (str: string, containStr: string): boolean => {
            if (!str.length) return false;
            return str.includes(containStr);
          },
          startsWith: (str: string, targetStr: string): boolean => {
            if (!str.length) return false;
            return str.startsWith(targetStr);
          },
        },
      },
    }),
    viteStaticCopy({
      targets: [
        { src: normalizePath(resolve(__dirname, './src/assets/static')), dest: 'assets' },
        { src: normalizePath(resolve(__dirname, './dist/assets/compiled/fonts')), dest: 'assets/compiled/css' },
        { src: normalizePath(resolve(__dirname, './node_modules/bootstrap-icons/bootstrap-icons.svg')), dest: 'assets/static/images' },
        ...copyModules,
      ],
      watch: {
        reloadPageOnChange: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': normalizePath(resolve(__dirname, 'src')),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
      '~perfect-scrollbar': resolve(__dirname, 'node_modules/perfect-scrollbar'),
      '~@fontsource': resolve(__dirname, 'node_modules/@fontsource'),
    },
  },
  build: {
    emptyOutDir: false,
    manifest: true,
    target: 'chrome58',
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: files,
      output: {
        entryFileNames: 'assets/compiled/js/[name].js',
        chunkFileNames: 'assets/compiled/js/[name].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0] || assetInfo?.name || 'default';
          const extension = extname(fileName).slice(1);
          let folder = extension ? `${extension}/` : '';

          if (['woff', 'woff2', 'ttf'].includes(extension)) {
            folder = 'fonts/';
          }

          return `assets/compiled/${folder}[name][extname]`;
        },
      },
    },
  },
}));

export default config;