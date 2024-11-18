import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .init({
    fallbackLng: 'id',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })
  .catch(err => console.error('Error initializing i18next:', err));

/** Init translation */
i18n.on('initialized', () => {
  const needTranslateElements = document.querySelectorAll('[data-translate]');
  needTranslateElements.forEach((element) => {
    element.textContent = i18n.t(String(element.getAttribute('data-translate')))
  });
});
