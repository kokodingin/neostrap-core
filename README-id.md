[![ReadMeSupportPalestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/banner-project.svg)](https://github.com/Safouene1/support-palestine-banner/Markdown-pages/Support.md)

<div align="center" style="margin-bottom: 1rem">
  <a href="./README.md">Bahasa Inggris</a>
  <span style="margin-left: .5rem;margin-right: .5rem">•</span>
  <a href="./README-id.md"><strong>Indonesian</strong></a>
</div>

<h1 align="center">NeoStrap Template</h1>

![Screenshot](./screenshot.png)

<p align="center">Template Bootstrap 5 terbaru dengan gaya NeoBRUTALISM yang sangat simple, brutal dan ganas!</p>


<div align="center">

  [![All Contributors](https://img.shields.io/github/contributors/kokodingin/neostrap-core)](https://github.com/kokodingin/neostrap-core/graphs/contributors)
  ![GitHub last commit](https://img.shields.io/github/last-commit/kokodingin/neostrap-core.svg)
  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kokodingin/neostrap-core)
  [![License](https://img.shields.io/github/license/kokodingin/neostrap-core.svg)](LICENSE)
  
  <hr />

  <p>Proyek ini dibantu dan disponsori oleh:</p>

  <div style="text-align: center">
    <a href="https://www.facebook.com/groups/programmerhandal/">
      <img src="./logo-sponsor-imphnen-xxxhdpi.png" height="100px" />
    </a>
  </div>

  <p align="center">
    <a href="http://neostrap.kokodingin.id">Demo Page</a>
    <span style="margin-left: .5rem;margin-right: .5rem">•</span>
    <a href="./CONTRIBUTE.md">BACA PANDUAN PENGEMBANGAN!</a>
    <span style="margin-left: .5rem;margin-right: .5rem">•</span>
    <a href="./LICENSE">LISENSI</a>
  </p>
</div>

## ⚡ Quick Start

1. Download atau clone repository
```bash
git clone https://github.com/kokodingin/neostrap-core.git
```

2. Install dependencies
```bash
npm install
yarn install
pnpm install
bun install
```

3. Jalankan development server
```bash
npm run dev
yarn dev
pnpm run dev
bun run dev
```

### 📁 Struktur Folder
```
neostrap/
|   .editorconfig
|   .env
|   .gitignore
|   .prettierignore
|   .prettierrc
|   .tsconfig.json
|   LICENSE
|   logo-sponsor-imphnen-xxxhdpi.png
|   package.json
|   README.md
|   screenshot.png
|   vite.config.ts
|
+---.vscode
|       launch.json
|
+---src
|   |   404.html
|   |   500.html
|   |   503-cs.html
|   |   docs-component-index.html
|   |   index.html
|   |
|   +---assets
|   |   +---js
|   |   |       init-i18n.ts
|   |   |       init-theme.ts
|   |   |       neostrap.ts
|   |   |
|   |   +---scss
|   |   |   |   bootstrap.scss
|   |   |   |   neostrap.scss
|   |   |   |   _variables-dark.scss
|   |   |   |   _variables.scss
|   |   |   |
|   |   |   \---neobrutalism
|   |   |           core.scss
|   |   |           _alert.scss
|   |   |           _brutal-design.scss
|   |   |           _button.scss
|   |   |           _card.scss
|   |   |           _dropdown.scss
|   |   |           _input.scss
|   |   |           _navbar.scss
|   |   |           _root.scss
|   |   |
|   |   \---static
|   |       |   apple-touch-icon-114x114.png
|   |       |   apple-touch-icon-120x120.png
|   |       |   apple-touch-icon-144x144.png
|   |       |   apple-touch-icon-152x152.png
|   |       |   apple-touch-icon-57x57.png
|   |       |   apple-touch-icon-60x60.png
|   |       |   apple-touch-icon-72x72.png
|   |       |   apple-touch-icon-76x76.png
|   |       |   favicon-128.png
|   |       |   favicon-16x16.png
|   |       |   favicon-196x196.png
|   |       |   favicon-32x32.png
|   |       |   favicon-96x96.png
|   |       |   favicon.ico
|   |       |   mstile-144x144.png
|   |       |   mstile-150x150.png
|   |       |   mstile-310x150.png
|   |       |   mstile-310x310.png
|   |       |   mstile-70x70.png
|   |       |
|   |       +---images
|   |       |
|   |       \---js
|   |               all.js
|   |
|   \---layouts
|       |   single.html
|       |
|       \---partials
|           |   favicon.html
|           |   font.html
|           |
|           +---footer
|           |       single.html
|           |
|           \---navbars
|                   primary.html
|
\---types
    \---vite-env.d.ts
```

## 📁 Included Features
- ✅ Vite + TypeScript setup
- ✅ Bootstrap 5 terintegrasi
- ✅ SCSS/SASS support
- ✅ NeoBrutalism components & styles
- ✅ Hot reload
- ✅ Production-ready builds

## 📦 Production Build
```bash
npm run build
```

## 💻 Development
Mulai edit file di folder `src/` sesuai kebutuhan Anda. Semua komponen Bootstrap sudah tersedia dan dapat langsung digunakan.