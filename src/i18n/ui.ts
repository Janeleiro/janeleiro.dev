// Textos de interface por idioma. O inglês entra na fase 3.
export const languages = { pt: 'Português', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const ui = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.work': 'O que faço',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'nav.skip': 'Pular para o conteúdo',
    'role': 'Full-stack developer',
    'city': 'Conceição do Coité, BA',
    'xp.since': 'desde 2018',
    'press': 'Conheça meu trabalho',
    'footer': 'Feito com Astro e Claude Code',
  },
  en: {},
} as const;

export function t(lang: Lang, key: keyof (typeof ui)['pt']) {
  return (ui[lang] as Record<string, string>)[key] ?? ui.pt[key];
}
