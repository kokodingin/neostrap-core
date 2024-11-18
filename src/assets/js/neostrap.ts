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
import i18n from './init-i18next';

/** Importing core systems */
import featherIcons from 'feather-icons';
import * as bootstrap from 'bootstrap';
import jQuery from 'jquery'; // Comment it using "CTRL + /" if you desired to not use jquery

featherIcons.replace();

/** Init core system */
window.bootstrap = bootstrap;
window.$ = window.jQuery = jQuery; // Comment it using "CTRL + /" if you desired to not use jquery

/** Init translation */
i18n.on('initialized', () => {
  const needTranslateElements = document.querySelectorAll('[data-translate]');
  console.log(needTranslateElements)
  needTranslateElements.forEach((element) => {
    element.textContent = i18n.t(String(element.getAttribute('data-translate')))
  });
});