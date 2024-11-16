/// <reference types="vite/client" />
/**
 * Declaring type for jquery
 * 
 * @package NeoStrap
 * @author KoKodingin Digital Nusantara
 * @email kokodingindigitalnusantara@gmail.com
 */
declare global {
  interface Window {
    $: typeof import('jquery');
    jQuery: typeof import('jquery');
  }
}

export {};