// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://janeleiro.dev',
  // A barra de ferramentas do dev cobria a navegação inferior do celular
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } } })],
});
