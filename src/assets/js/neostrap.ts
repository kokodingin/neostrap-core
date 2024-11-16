/**
 * NeoStrap Bootstrap Template
 * By KoKoDingin Digital Nusantara (KoDiNus Group)
 * Copyright 2024 KoKoDingin Digital Nusantara (KoDiNus Group)
 */
// Importing FontAwesome Icon Font on all pages
import '@fortawesome/fontawesome-free/css/all.min.css';

// Feather icons are used on some pages
// Replace() replaces [data-feather] elements with icons
import featherIcons from 'feather-icons';
featherIcons.replace();

/**
 * Bootstrap and jQuery global setup for jQuery lovers.
 * 
 * @package NeoStrap
 * @author KoKodingin Digital Nusantara
 * @email kokodingindigitalnusantara@gmail.com
 */
import * as bootstrap from 'bootstrap';
import jQuery from 'jquery';

window.bootstrap = bootstrap;
window.$ = window.jQuery = jQuery;