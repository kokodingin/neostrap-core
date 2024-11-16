import {
  defineConfig,
  normalizePath,
  build,
  InlineConfig,
  UserConfigExport,
  Plugin,
} from 'vite';
import fs from 'fs';
import path, { extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import legacy from '@vitejs/plugin-legacy';

/**
 * Current file and directory path configuration
 */
const CURRENT_FILENAME = fileURLToPath(import.meta.url);
const CURRENT_DIRNAME = path.dirname(CURRENT_FILENAME);
const SOURCE_ROOT = resolve(CURRENT_DIRNAME, 'src');

/**
 * Interface for module copy configuration
 */
interface ModuleCopyConfig {
  [key: string]: boolean;
}

/**
 * Interface for template variables
 */
interface TemplateVariables {
  web_title: string;
  isDev: boolean;
}

/**
 * Retrieves HTML files from the source directory
 * @returns {Record<string, string>} Object containing filename-path pairs
 * @description Scans the source directory for HTML files and creates a mapping of
 * filenames (without extension) to their full file paths
 */
const getHtmlFiles = (): Record<string, string> => {
  const htmlFiles: Record<string, string> = {};

  fs.readdirSync(SOURCE_ROOT)
    .filter((filename) => filename.endsWith('.html'))
    .forEach((filename) => {
      const baseFilename = filename.slice(0, -5);
      htmlFiles[baseFilename] = resolve(SOURCE_ROOT, filename);
    });

  return htmlFiles;
};

/**
 * Prepares template variables for Nunjucks rendering
 * @param {string} buildMode - Current build mode ('development' or 'production')
 * @returns {Record<string, TemplateVariables>} Variables object for each HTML file
 */
const prepareTemplateVariables = (
  buildMode: string,
): Record<string, TemplateVariables> => {
  const templateVars: Record<string, TemplateVariables> = {};
  const htmlFiles = getHtmlFiles();

  Object.keys(htmlFiles).forEach((filename) => {
    const templatePath = filename.includes('layouts')
      ? `layouts/${filename}`
      : filename;
    templateVars[`${templatePath}.html`] = {
      web_title: 'NeoStrap Dashboard',
      isDev: buildMode === 'development',
    };
  });

  return templateVars;
};

/**
 * Configuration for vendor modules to be copied
 */
const VENDOR_MODULES: ModuleCopyConfig = {
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
 * Prepares module copy configurations for the build process
 * @returns {Array<{src: string; dest: string; rename: string}>} Array of copy configurations
 */
const prepareModuleCopyConfig = () => {
  return Object.entries(VENDOR_MODULES).map(([moduleName, hasDistFolder]) => ({
    src: normalizePath(
      resolve(
        CURRENT_DIRNAME,
        `./node_modules/${moduleName}${hasDistFolder ? '/dist' : ''}`,
      ),
    ),
    dest: 'assets/vendors',
    rename: moduleName,
  }));
};

/**
 * Inline build configuration for application bundling
 */
const INLINE_BUILD_CONFIG: InlineConfig = {
  configFile: false,
  build: {
    emptyOutDir: false,
    outDir: resolve(CURRENT_DIRNAME, 'dist/assets/bundled/js'),
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
 * Creates a Vite plugin to handle HTML attribute cleaning
 * @param {string} buildMode - Current build mode
 * @returns {Plugin} Configured Vite plugin
 */
const createAttributeCleanerPlugin = (buildMode: string): Plugin => {
  return {
    name: 'attribute-cleaner',
    transformIndexHtml(html: string) {
      const attributeReplacements = [
        { 'type="module"': '' },
        { 'import.meta.url': '' },
        { crossorigin: '' },
      ];

      const cleanHtml = attributeReplacements.reduce((result, replacement) => {
        const [[oldValue, newValue]] = Object.entries(replacement);
        return result.split(oldValue).join(newValue);
      }, html);

      return buildMode !== 'development' ? cleanHtml : html;
    },
  };
};

build(INLINE_BUILD_CONFIG);

/**
 * Main Vite configuration
 */
const config: UserConfigExport = defineConfig((env) => ({
  publicDir: 'static',
  base: './',
  root: SOURCE_ROOT,
  plugins: [
    createAttributeCleanerPlugin(env.mode),
    nunjucks({
      templatesDir: SOURCE_ROOT,
      variables: prepareTemplateVariables(env.mode),
      nunjucksEnvironment: {
        filters: {
          containString: (str: string, searchStr: string): boolean => {
            return str.length > 0 && str.includes(searchStr);
          },
          startsWith: (str: string, prefix: string): boolean => {
            return str.length > 0 && str.startsWith(prefix);
          },
        },
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(CURRENT_DIRNAME, './src/assets/static')),
          dest: 'assets',
        },
        {
          src: normalizePath(
            resolve(
              CURRENT_DIRNAME,
              './node_modules/bootstrap-icons/bootstrap-icons.svg',
            ),
          ),
          dest: 'assets/static/images',
        },
        ...prepareModuleCopyConfig(),
      ],
      watch: {
        reloadPageOnChange: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': normalizePath(resolve(CURRENT_DIRNAME, 'src')),
      '~bootstrap': resolve(CURRENT_DIRNAME, 'node_modules/bootstrap'),
      '~bootstrap-icons': resolve(
        CURRENT_DIRNAME,
        'node_modules/bootstrap-icons',
      ),
      '~perfect-scrollbar': resolve(
        CURRENT_DIRNAME,
        'node_modules/perfect-scrollbar',
      ),
      '~@fontsource': resolve(CURRENT_DIRNAME, 'node_modules/@fontsource'),
    },
  },
  build: {
    emptyOutDir: true,
    manifest: true,
    target: 'chrome58',
    outDir: resolve(CURRENT_DIRNAME, 'dist'),
    rollupOptions: {
      input: getHtmlFiles(),
      output: {
        entryFileNames: 'assets/bundled/js/[name].js',
        chunkFileNames: 'assets/bundled/js/[name].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0] || assetInfo?.name || 'default';
          const extension = extname(fileName).slice(1);

          let assetFolder = extension ? `${extension}/` : '';

          if (['woff', 'woff2', 'ttf'].includes(extension)) {
            assetFolder = 'fonts/';
          }

          if (
            ['jpg', 'gif', 'svg', 'jpeg', 'webp', 'png'].includes(extension)
          ) {
            assetFolder = 'images/';
          }

          return `assets/bundled/${assetFolder}[name][extname]`;
        },
      },
    },
  },
}));

export default config;
