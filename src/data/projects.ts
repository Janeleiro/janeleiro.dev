// Portfólio. Imagens em public/img/projetos/<slug>-{480,960}.webp (prints feitos com design/tools/print_cdp.mjs).
import type { Lang } from '../i18n/ui';

export type Localized = Record<Lang, string>;
export type ProjectKind = 'cliente' | 'produto' | 'pessoal';

export interface Project {
  slug: string;
  // Nome próprio igual nos dois idiomas, ou traduzido quando é descritivo (ex.: Prefeitura)
  title: string | Localized;
  // Um projeto pode ser das duas coisas (ex.: Cavaleiros Troianos)
  kinds: ProjectKind[];
  url: string;
  // Período a partir do histórico dos repositórios no GitHub
  period: string;
  text: Localized;
  stack: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'visitecoite', title: 'Visite Coité', kinds: ['cliente'], url: 'https://visitecoite.com.br/', period: '2023–2026', featured: true,
    text: {
      pt: 'Portal de turismo de Conceição do Coité, com roteiros de 1 a 7 dias, agenda cultural e guias de onde comer e onde ficar, em português, inglês e espanhol.',
      en: 'Tourism portal for Conceição do Coité, with 1- to 7-day itineraries, a cultural events calendar and guides on where to eat and stay, in Portuguese, English and Spanish.',
    },
    stack: ['WordPress', 'PHP', 'Tema próprio'],
  },
  {
    slug: 'coitemmo', title: 'CoitéMMO', kinds: ['pessoal'], url: 'https://coitemmo.janeleiro.dev/', period: '2026', featured: true,
    text: {
      pt: 'O centro de Conceição do Coité recriado em pixel art e multiplayer: cada visitante ganha um avatar, conversa e disputa minigames em tempo real. Quem não quer se cadastrar entra como fantasma.',
      en: 'Downtown Conceição do Coité recreated as a multiplayer pixel art world: every visitor gets an avatar, chats and plays minigames in real time. Anyone who doesn’t want to sign up can join as a ghost.',
    },
    stack: ['Go', 'WebSocket', 'Phaser', 'TypeScript', 'PostgreSQL', 'Redis'],
  },
  {
    slug: 'simacult', title: 'Simacult', kinds: ['produto'], url: 'https://simacult.com.br/', period: '2023–2026', featured: true,
    text: {
      pt: 'Sistema de mapeamento cultural para prefeituras: artistas, grupos, espaços e eventos se cadastram, a Secretaria de Cultura modera e tudo vira um portal público. Cada município tem a sua instância, com dados isolados, trilha de auditoria e conformidade com a LGPD. Em uso em Conceição do Coité.',
      en: 'Cultural mapping system for city halls: artists, groups, venues and events sign up, the Culture Department moderates them, and everything becomes a public portal. Each city gets its own instance, with isolated data, an audit trail and compliance with LGPD, Brazil’s data protection law. In use in Conceição do Coité.',
    },
    stack: ['Laravel', 'Vue', 'Inertia', 'Tailwind CSS', 'Multi-tenant'],
  },
  {
    slug: 'cavaleiros', title: 'Cavaleiros Troianos', kinds: ['cliente'], url: 'https://cavaleirostroianos.com.br/', period: '2024–2026', featured: true,
    text: {
      pt: 'Site do grupo de teatro de Conceição do Coité, com trajetória, projetos e galeria, e um painel para gerenciar inscrições em oficinas, castings com ranking de resultados e álbuns de fotos.',
      en: 'Website for a theater group from Conceição do Coité, with its history, projects and gallery, plus a panel to manage workshop sign-ups, castings with ranked results and photo albums.',
    },
    stack: ['Laravel', 'Vue', 'Inertia', 'Tailwind CSS'],
  },
  {
    slug: 'prefeitura', title: { pt: 'Prefeitura de Conceição do Coité', en: 'Conceição do Coité City Hall' }, kinds: ['cliente'], url: 'https://conceicaodocoite.ba.gov.br/', period: '2025–2026',
    text: {
      pt: 'Portal da prefeitura, com transparência, serviços ao cidadão, secretarias, notícias e recursos de acessibilidade.',
      en: 'City hall portal with transparency data, citizen services, departments, news and accessibility features.',
    },
    stack: ['WordPress', 'PHP', 'Tema próprio'],
  },
  {
    slug: 'finanjota', title: 'Finanjota', kinds: ['pessoal'], url: 'https://finanjota.janeleiro.dev/', period: '2026',
    text: {
      pt: 'Controle financeiro pessoal: gastos recorrentes e parcelados, metas com alertas, relatórios e projeções.',
      en: 'Personal finance tracker: recurring and installment expenses, goals with alerts, reports and projections.',
    },
    stack: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'pixpoly', title: 'PixPoly', kinds: ['pessoal'], url: 'https://pixpoly.janeleiro.dev/', period: '2026',
    text: {
      pt: 'Banco Imobiliário sem dinheiro de papel: o banqueiro cria a sala, cada jogador entra pelo celular e as transferências viram Pix entre jogadores, sincronizadas em tempo real.',
      en: 'Monopoly without paper money: the banker creates a room, each player joins from their phone, and transfers become Pix payments (Brazil’s instant payment system) between players, synced in real time.',
    },
    stack: ['Go', 'Fiber', 'WebSocket', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    slug: 'valentim', title: 'Valentim Maker', kinds: ['cliente'], url: 'https://gabrielvalentim.com.br/', period: '2026',
    text: {
      pt: 'Site da produtora audiovisual, com portfólio de filmes de casamentos e eventos e pedido de orçamento pelo WhatsApp. Todo o conteúdo é gerenciado por um CMS próprio, feito em Go.',
      en: 'Website for an audiovisual production company, with a portfolio of wedding and event films and quote requests via WhatsApp. All the content is managed through a custom CMS built in Go.',
    },
    stack: ['React', 'TypeScript', 'Go'],
  },
  {
    slug: 'rafarte', title: 'Rafarte Marcenaria', kinds: ['cliente'], url: 'https://rafartemarcenaria.com.br/', period: '2026',
    text: {
      pt: 'Site da marcenaria de móveis sob medida, com galerias por ambiente e orçamento direto pelo WhatsApp.',
      en: 'Website for a custom furniture workshop, with galleries by room and quote requests straight through WhatsApp.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    slug: 'edione', title: 'Edione Carvalho', kinds: ['cliente'], url: 'https://edione.com.br/', period: '2019–2026',
    text: {
      pt: 'Landing page de esteticista em Barueri (SP): tratamentos, antes e depois, depoimentos e agendamento pelo WhatsApp.',
      en: 'Landing page for an esthetician in Barueri (São Paulo): treatments, before and after photos, testimonials and booking via WhatsApp.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
];


// Tags de stack que são palavras (e não nomes de tecnologia) e precisam de tradução
const stackEn: Record<string, string> = { 'Tema próprio': 'Custom theme' };
export const stackLabel = (item: string, lang: Lang) => (lang === 'en' ? stackEn[item] ?? item : item);
export const localized = (v: string | Localized, lang: Lang) => (typeof v === 'string' ? v : v[lang]);
