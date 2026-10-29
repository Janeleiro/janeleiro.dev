// Portfólio. Imagens em public/img/projetos/<slug>-{480,960}.webp (prints feitos com design/tools/print_cdp.mjs).
export type ProjectKind = 'cliente' | 'produto' | 'pessoal';

export interface Project {
  slug: string;
  title: string;
  // Um projeto pode ser das duas coisas (ex.: Cavaleiros Troianos)
  kinds: ProjectKind[];
  url: string;
  // Período a partir do histórico dos repositórios no GitHub
  period: string;
  text: string;
  stack: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'visitecoite', title: 'Visite Coité', kinds: ['cliente'], url: 'https://visitecoite.com.br/', period: '2023–2026', featured: true,
    text: 'Portal de turismo de Conceição do Coité, com roteiros de 1 a 7 dias, agenda cultural e guias de onde comer e onde ficar, em português, inglês e espanhol.',
    stack: ['WordPress', 'PHP', 'Tema próprio'],
  },
  {
    slug: 'coitemmo', title: 'CoitéMMO', kinds: ['pessoal'], url: 'https://coitemmo.janeleiro.dev/', period: '2026', featured: true,
    text: 'O centro de Conceição do Coité recriado em pixel art e multiplayer: cada visitante ganha um avatar, conversa e disputa minigames em tempo real. Quem não quer se cadastrar entra como fantasma.',
    stack: ['Go', 'WebSocket', 'Phaser', 'TypeScript', 'PostgreSQL', 'Redis'],
  },
  {
    slug: 'simacult', title: 'Simacult', kinds: ['produto'], url: 'https://simacult.com.br/', period: '2023–2026', featured: true,
    text: 'Sistema de mapeamento cultural para prefeituras: artistas, grupos, espaços e eventos se cadastram, a Secretaria de Cultura modera e tudo vira um portal público. Cada município tem a sua instância, com dados isolados, trilha de auditoria e conformidade com a LGPD. Em uso em Conceição do Coité.',
    stack: ['Laravel', 'Vue', 'Inertia', 'Tailwind CSS', 'Multi-tenant'],
  },
  {
    slug: 'cavaleiros', title: 'Cavaleiros Troianos', kinds: ['cliente'], url: 'https://cavaleirostroianos.com.br/', period: '2024–2026', featured: true,
    text: 'Site do grupo de teatro de Conceição do Coité, com trajetória, projetos e galeria, e um painel para gerenciar inscrições em oficinas, castings com ranking de resultados e álbuns de fotos.',
    stack: ['Laravel', 'Vue', 'Inertia', 'Tailwind CSS'],
  },
  {
    slug: 'prefeitura', title: 'Prefeitura de Conceição do Coité', kinds: ['cliente'], url: 'https://conceicaodocoite.ba.gov.br/', period: '2025–2026',
    text: 'Portal da prefeitura, com transparência, serviços ao cidadão, secretarias, notícias e recursos de acessibilidade.',
    stack: ['WordPress', 'PHP', 'Tema próprio'],
  },
  {
    slug: 'finanjota', title: 'Finanjota', kinds: ['pessoal'], url: 'https://finanjota.janeleiro.dev/', period: '2026',
    text: 'Controle financeiro pessoal: gastos recorrentes e parcelados, metas com alertas, relatórios e projeções.',
    stack: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'pixpoly', title: 'PixPoly', kinds: ['pessoal'], url: 'https://pixpoly.janeleiro.dev/', period: '2026',
    text: 'Banco Imobiliário sem dinheiro de papel: o banqueiro cria a sala, cada jogador entra pelo celular e as transferências viram Pix entre jogadores, sincronizadas em tempo real.',
    stack: ['Go', 'Fiber', 'WebSocket', 'React', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    slug: 'valentim', title: 'Valentim Maker', kinds: ['cliente'], url: 'https://gabrielvalentim.com.br/', period: '2026',
    text: 'Site da produtora audiovisual, com portfólio de filmes de casamentos e eventos e pedido de orçamento pelo WhatsApp. Todo o conteúdo é gerenciado por um CMS próprio, feito em Go.',
    stack: ['React', 'TypeScript', 'Go'],
  },
  {
    slug: 'rafarte', title: 'Rafarte Marcenaria', kinds: ['cliente'], url: 'https://rafartemarcenaria.com.br/', period: '2026',
    text: 'Site da marcenaria de móveis sob medida, com galerias por ambiente e orçamento direto pelo WhatsApp.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    slug: 'edione', title: 'Edione Carvalho', kinds: ['cliente'], url: 'https://edione.com.br/', period: '2019–2026',
    text: 'Landing page de esteticista em Barueri (SP): tratamentos, antes e depois, depoimentos e agendamento pelo WhatsApp.',
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
];

export const kindLabel: Record<ProjectKind, string> = { cliente: 'Cliente', produto: 'Produto', pessoal: 'Projeto pessoal' };
