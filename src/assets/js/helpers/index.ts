/**
 * Core Helper File Loader
 * By KoKoDingin Digital Nusantara (KoDiNus Group)
 * Copyright 2024 KoKoDingin Digital Nusantara (KoDiNus Group)
 */
import { getElementPosition, scrollToElement } from './_window';

/** Function Implementation Here */
const elementNeedScrollToTarget = document.querySelectorAll('[data-scroll]');

elementNeedScrollToTarget.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    
    const rectNavbar = getElementPosition('#main-navbar', 'bottom') + 20;
    const scrollTarget = el.getAttribute('data-scroll');
    scrollToElement(scrollTarget as string, rectNavbar);
  })
});