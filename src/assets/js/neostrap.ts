/**
 * NeoStrap Bootstrap Template
 * By KoKoDingin Digital Nusantara (KoDiNus Group)
 * Copyright 2024 KoKoDingin Digital Nusantara (KoDiNus Group)
 */

// Importing FontAwesome Icon Font on all pages
import '@fortawesome/fontawesome-free/css/all.min.css';

// Feather icons are used on some pages
import featherIcons from 'feather-icons';
import * as bootstrap from 'bootstrap';
import jQuery from 'jquery';

// Replace() replaces [data-feather] elements with icons
featherIcons.replace();

/**
 * Bootstrap and jQuery global setup for jQuery lovers.
 * 
 * @package NeoStrap
 * @author KoKodingin Digital Nusantara
 * @email kokodingindigitalnusantara@gmail.com
 */
window.bootstrap = bootstrap;
window.$ = window.jQuery = jQuery;

export {};