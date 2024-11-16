/**
 * A type representing the theme options.
 * Can be either 'dark' or 'light'.
 */
type themeType = 'dark' | 'light';

/**
 * Reference to the <body> element of the document.
 * 
 * @param {HTMLElement}
 */
const body: HTMLElement = document.body;

/**
 * Retrieves the current theme from the browser's local storage.
 * This value could be a string representing the theme ('dark' or 'light'),
 * or it could be undefined or null if no theme is set.
 * 
 * @param {string | undefined | null}
 */
const theme: string | undefined | null = localStorage.getItem('theme');

/**
 * Changes the theme of the document by setting the `data-bs-theme` attribute
 * on the <html> element.
 * 
 * @param theme - The theme to be applied, either 'dark' or 'light'.
 */
const changeTheme = (theme: themeType) => document.documentElement.setAttribute('data-bs-theme', theme);

/**
 * If a theme is found in local storage, it is applied by calling `changeTheme`
 * with the retrieved value cast to `themeType`.
 */
if (theme) changeTheme(theme as themeType);
