const body: HTMLElement = document.body;
const theme: string | undefined | null = localStorage.getItem('theme')

if (theme) 
  document.documentElement.setAttribute('data-bs-theme', theme)
