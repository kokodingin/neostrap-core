# Contribution Guide

Please read carefully to understand how to contribute to this project.

## How to Contribute

- Fork this repository (https://github.com/kokodingin/neostrap-core/fork).
- Create your feature branch (`git checkout -b my-new-feature`).
- Commit your changes (`git commit -am 'Add new feature'`).
- Push to the branch (`git push origin my-new-feature`).
- Create a new Pull Request.
- The admin will review your code before merging it.

## Notes

Ensure that you do not commit generated files from the `dist` folder.
All changes must be made in the source files located in the `src` folder and `vite.config.ts` file if necessary.

- Modify `scss` files to adjust styles.
- Edit `html` files based on Nunjucks or `json` files defining content to customize layout and content.
- Modify `js` and `ts` files to adjust application code.
- Add images if necessary when adding a feature.
- Add new packages if needed for your feature.
- Include any additional assets as required.
- ⚠️ Include [docblocks](https://swimm.io/learn/code-documentation/code-documentation-benefits-challenges-and-tips-for-success) to ensure clarity for future development!
- ❌ Do not remove or modify the basic folder structure without confirmation from the owner or admin!
- ❌ Do not delete core files! If you need to add to core files, create a separate file and import it into `main.ts` or `neostrap.scss` before pushing.

Always build and test your changes before committing.

