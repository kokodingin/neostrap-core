import {
  defineConfig,
  normalizePath,
  build,
  InlineConfig,
  UserConfigExport,
  Plugin,
} from 'vite';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import fs from 'fs';
import nunjucks from 'vite-plugin-nunjucks';
import path, { resolve } from 'path';
import { minify } from 'terser';
import CleanCSS from 'clean-css';
import SVGO from 'svgo';

/**
 * Current file and directory path configuration
 */
const CURRENT_FILENAME = fileURLToPath(import.meta.url);
const CURRENT_DIRNAME = path.dirname(CURRENT_FILENAME);
const SOURCE_ROOT = resolve(CURRENT_DIRNAME, 'src');

/**
 * Interface for template variables
 */
interface TemplateVariables {
  appName: string;
  isDev: boolean;
  year: number;
  bootstrapClasses: string[];
}

/**
 * Retrieves HTML files from the source directory
 * @returns {Record<string, string>} Object containing filename-path pairs
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
      year: new Date().getFullYear(),
      appName: 'NeoStrap Dashboard',
      isDev: buildMode === 'development',
      bootstrapClasses: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'link',
      ],
    };
  });

  return templateVars;
};

/**
 * Minifies assets (JS, CSS, SVG) in the given directory
 * @param {string} dir - Directory path
 */
const minifyAssets = async (dir: string) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file);

    if (fs.statSync(filePath).isDirectory()) {
      await minifyAssets(filePath); // Recursively minify subdirectories
    } else if (ext === '.js') {
      const code = fs.readFileSync(filePath, 'utf-8');
      const result = await minify(code);
      if (result.code) {
        fs.writeFileSync(filePath, result.code, 'utf-8');
      }
    } else if (ext === '.css') {
      const css = fs.readFileSync(filePath, 'utf-8');
      const minified = new CleanCSS().minify(css);
      fs.writeFileSync(filePath, minified.styles, 'utf-8');
    } else if (ext === '.svg') {
      const svg = fs.readFileSync(filePath, 'utf-8');
      const result = SVGO.optimize(svg);
      fs.writeFileSync(filePath, result.data, 'utf-8');
    }
  }
};


/**
 * Main Vite configuration
 */
const config: UserConfigExport = defineConfig((env) => {
  const buildMode = env.mode;

  return {
    publicDir: 'static',
    base: buildMode === 'production' ? './' : '/',
    root: SOURCE_ROOT,
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      cors: true,
    },
    plugins: [
      ViteMinifyPlugin({
        html5: true,
        minifyCSS: true,
        minifyJS: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
        noNewlinesBeforeTagClose: true,
        keepClosingSlash: true,
      }),
      nunjucks({
        templatesDir: SOURCE_ROOT,
        variables: prepareTemplateVariables(buildMode),
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
            dest: 'assets/static',
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': normalizePath(resolve(CURRENT_DIRNAME, 'src')),
        '~bootstrap': resolve(CURRENT_DIRNAME, 'node_modules/bootstrap'),
        '~bootstrap-icons': resolve(CURRENT_DIRNAME, 'node_modules/bootstrap-icons'),
      },
    },
    build: {
      emptyOutDir: true,
      manifest: true,
      copyPublicDir: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 2048,
      targets: 'es2015',
      outDir: resolve(CURRENT_DIRNAME, 'dist'),
      rollupOptions: {
        input: getHtmlFiles(),
        output: {
          format: 'es',
          entryFileNames: `assets/compiled/js/[name].js`,
          chunkFileNames: `assets/compiled/js/[name].js`,
          assetFileNames: ({ names }) => {
            const extname = names?.[0]?.split('.')?.pop();
            let folder = extname ? `${extname}/` : '';

            if (['woff', 'woff2', 'ttf'].includes(String(extname))) {
              folder = 'fonts/';
            }

            return `assets/compiled/${folder}[name][extname]`;
          },
        },
      },
    },
    buildEnd() {
      minifyAssets(resolve(CURRENT_DIRNAME, 'dist/assets/vendors'));
    },
  };
});

export default config;
