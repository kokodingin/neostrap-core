import * as bootstrap from 'bootstrap';

declare global {
  interface Window {
    bootstrap: typeof bootstrap;
    $: typeof import('jquery');
    jQuery: typeof import('jquery');
  }
}

declare module 'feather-icons' {
  const content: {
    replace(): void;
  };
}