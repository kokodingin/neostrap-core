# How To Contribute Guide

Please read carefully how to contribute to this project.

## Contributing

- Fork it (https://github.com/kokodingin/neostrap-core/fork).
- Create your feature branch (`git checkout -b my-new-feature`).
- Commit your changes (`git commit -am 'Add some feature'`).
- Push to the branch (`git push origin my-new-feature`).
- Create a new Pull Request.
- Admin will check and review your code before merge it.

## Note

Make sure to not commit generated files from your dist folder.
All changes need to be made in the source files located in the `src` folder and `vite.config.ts` file if necessary.
- Change the `scss` files to adapt styles.
- Change the nunjucks based `html` files code or the content defining `json` files to adapt layout and content.
- Change the `js` and `ts` files to adapt the application code.
- Add more image if necessary if you wanna add it.
- Add more package if necessary if you wanna add it.
- Add more assets if necessary if you wanna add it.
- ❌ Do not delete or changing base folder structure before you confirming to owner or admin!
- ❌ Do not delete core files! If you wanna add into core file, please add into separated file and import into `main.ts` or `neostrap.scss` and then push it!.

Always run a build and test the results before committing.