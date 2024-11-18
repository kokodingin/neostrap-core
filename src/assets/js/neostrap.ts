/**
 * NeoStrap Bootstrap Template
 * By KoKoDingin Digital Nusantara (KoDiNus Group)
 * Copyright 2024 KoKoDingin Digital Nusantara (KoDiNus Group)
 * 
 * @package NeoStrap
 * @author KoKodingin Digital Nusantara
 * @email kokodingindigitalnusantara@gmail.com
 */

/** Importing FontAwesome Icon Font on all pages */
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'remixicon/fonts/remixicon.css';

/** Importing core systems */
import featherIcons from 'feather-icons';
import * as bootstrap from 'bootstrap';
import jQuery from 'jquery'; // Comment it using "CTRL + /" if you desired to not use jquery

featherIcons.replace();

/** Init core system */
window.bootstrap = bootstrap;
window.$ = window.jQuery = jQuery; // Comment it using "CTRL + /" if you desired to not use jquery