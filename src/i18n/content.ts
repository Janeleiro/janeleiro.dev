// Conteúdo das seções da página, por idioma. Textos com HTML (ex.: <strong>) são renderizados com set:html.
import type { PixelIconName } from '../data/pixel-icons';
import type { Lang } from './ui';

type Item = { title: string; text: string; icon: PixelIconName };

const pt = {
  meta: {
    title: 'Jota Carvalho · Full-stack developer PHP, Laravel e Vue',
    description: 'Jota Carvalho (Carlos Alberto P. de Carvalho Júnior), o Janeleiro: full-stack developer em Conceição do Coité (BA). PHP, Laravel, Vue e WordPress.',
  },
  hero: {
    say: 'Olá! Eu sou o Jota, mas pela internet você me encontra como <strong>Janeleiro</strong>. Desde 2018 eu construo sistemas e sites com PHP, Laravel e Vue, trabalhando de forma remota a partir do interior da Bahia.',
    stats: [
      { k: 'Função', v: 'Full-stack developer' },
      { k: 'Região', v: 'Conceição do Coité, BA' },
      { k: 'Modo', v: 'Remoto' },
      { k: 'Idiomas', v: 'Português · Inglês' },
    ],
    stack: 'Stack principal',
  },
  about: {
    label: 'Sobre',
    title: 'Sobre mim',
    paragraphs: [
      'Faço sites e sistemas desde 2012, quando comecei estudando por conta própria e pegando pequenos freelas. Em 2018 isso virou a minha profissão em tempo integral. Hoje construo sistemas web de ponta a ponta, do banco de dados à interface, com PHP, Laravel e Vue, e estou aprendendo Go.',
      'Antes do código virar profissão, passei por sala de aula e por ilha de edição. Sou formado em Comunicação Social, e isso aparece no meu trabalho: gosto de entender quem vai usar o sistema e de explicar com clareza o que estou construindo.',
      'Fora do código, jogos são a minha paixão, e é de lá que vem o Janeleiro. Também desenho e atuo.',
    ],
    timelineTitle: 'Trajetória',
    timeline: [
      { year: '2012', text: 'Primeiros freelas e estudos em desenvolvimento web, por conta própria.' },
      { year: '2016', text: 'Dou aulas como instrutor de cursos.' },
      { year: '2018', text: 'Edição de vídeo, e os primeiros sistemas web como profissão.' },
      { year: '2021', text: 'Começo a trabalhar com desenvolvimento de software para produtos maiores.' },
      { year: 'hoje', text: 'Desenvolvimento back-end e full-stack, sempre remoto.' },
    ],
    techTitle: 'Outras tecnologias',
    learning: 'estudando',
    educationTitle: 'Formação',
    education: [
      { title: 'Tecnólogo em Sistemas para Internet', school: 'UniCesumar', logo: 'unicesumar', period: '2019–2021', status: 'concluído' },
      { title: 'Bacharelado em Comunicação Social · Rádio e TV', school: 'UNEB', logo: 'uneb', period: '2018–2024', status: 'concluído' },
      { title: 'Licenciatura em Ciências da Computação', school: 'UNEB', logo: 'uneb', period: 'desde 2026', status: 'em andamento', ongoing: true },
    ],
  },
  work: {
    label: 'O que eu faço',
    title: 'Do banco de dados à interface',
    services: [
      { title: 'Sistemas web e APIs', icon: 'laravel', text: 'Back-ends em Laravel e PHP: painéis administrativos, APIs REST e as regras de negócio por trás de um produto.' },
      { title: 'Interfaces com Vue', icon: 'vuedotjs', text: 'Telas rápidas e fáceis de usar, de formulários simples a aplicações completas no navegador.' },
      { title: 'Sites WordPress', icon: 'wordpress', text: 'Sites institucionais e temas sob medida, que o próprio cliente consegue atualizar depois.' },
      { title: 'Integrações e automações', icon: 'gear', text: 'Conectar sistemas e serviços de terceiros, e transformar trabalho manual repetitivo em rotina automática.' },
      { title: 'Manutenção e evolução', icon: 'php', text: 'Atualizar, corrigir e melhorar o desempenho de sistemas PHP que já estão em produção.' },
      { title: 'Infraestrutura e deploy', icon: 'docker', text: 'Docker, servidores e bancos PostgreSQL e MySQL, para colocar o sistema no ar e mantê-lo estável.' },
    ] as Item[],
    principlesTitle: 'Como eu trabalho',
    principles: [
      { title: 'Código que outra pessoa entende', icon: 'code', text: 'Prefiro o simples e legível ao esperto. Quem pegar o código depois de mim precisa conseguir mexer nele sem medo.' },
      { title: 'Comunicação clara', icon: 'chat', text: 'A formação em Comunicação pesa aqui: explico as decisões, aviso cedo quando algo vai atrasar e falo sem jargão com quem não é da área.' },
      { title: 'Remoto de verdade', icon: 'globe', text: 'Trabalho remoto há anos, com escrita organizada, comunicação assíncrona e horários combinados.' },
      { title: 'IA como ferramenta', icon: 'clawd', text: 'Uso o Claude Code no dia a dia para acelerar tarefas repetitivas, revisar código e explorar soluções. As decisões e a responsabilidade pelo código continuam sendo minhas.' },
    ] as Item[],
  },
  projects: {
    label: 'Projetos',
    title: 'Trabalhos para clientes, produtos e experimentos',
    intro: 'Uma seleção entre mais de 70 projetos que versionei desde 2019.',
    filterLabel: 'Filtrar projetos',
    all: 'Todos',
    clients: 'Clientes',
    own: 'Próprios',
    // {n} é trocado pela quantidade
    showing: 'Mostrando {n} projetos',
    tech: 'Tecnologias:',
    kinds: { cliente: 'Cliente', produto: 'Produto', pessoal: 'Projeto pessoal' },
    more: 'Os projetos pessoais são onde eu experimento tecnologias novas, como Go e jogos multiplayer no navegador.',
  },
  contact: {
    label: 'Contato',
    title: 'Vamos conversar',
    text: 'Para falar de trabalho, me mande um e-mail ou uma mensagem no WhatsApp. Nas redes e nos jogos, eu sou o <strong>Janeleiro</strong>.',
    work: 'Trabalho',
    social: 'Redes',
  },
};

export type Content = typeof pt;

const en: Content = {
  meta: {
    title: 'Jota Carvalho · Full-stack developer PHP, Laravel and Vue',
    description: 'Jota Carvalho (Carlos Alberto P. de Carvalho Júnior), aka Janeleiro: full-stack developer from Conceição do Coité, Bahia, Brazil. PHP, Laravel, Vue and WordPress.',
  },
  hero: {
    say: 'Hi! I’m Jota, but online you’ll find me as <strong>Janeleiro</strong>. Since 2018 I’ve been building systems and websites with PHP, Laravel and Vue, working remotely from the countryside of Bahia, Brazil.',
    stats: [
      { k: 'Role', v: 'Full-stack developer' },
      { k: 'Location', v: 'Conceição do Coité, Brazil' },
      { k: 'Work', v: 'Remote' },
      { k: 'Languages', v: 'Portuguese · English' },
    ],
    stack: 'Main stack',
  },
  about: {
    label: 'About',
    title: 'About me',
    paragraphs: [
      'I’ve been building websites and systems since 2012, when I started teaching myself and taking small freelance jobs. In 2018 it became my full-time profession. Today I build web systems end to end, from the database to the interface, with PHP, Laravel and Vue, and I’m learning Go.',
      'Before code became my job, I spent time in classrooms and editing rooms. I have a degree in Social Communication, and it shows in my work: I like to understand who will use the system and to explain clearly what I’m building.',
      'Outside of code, games are my passion, and that’s where the name Janeleiro comes from. I also draw and act.',
    ],
    timelineTitle: 'Journey',
    timeline: [
      { year: '2012', text: 'First freelance jobs and self-taught web development.' },
      { year: '2016', text: 'Teaching as a course instructor.' },
      { year: '2018', text: 'Video editing, and my first web systems as a profession.' },
      { year: '2021', text: 'Started working on software development for larger products.' },
      { year: 'now', text: 'Back-end and full-stack development, always remote.' },
    ],
    techTitle: 'Other technologies',
    learning: 'learning',
    educationTitle: 'Education',
    education: [
      { title: 'Associate degree in Internet Systems', school: 'UniCesumar', logo: 'unicesumar', period: '2019–2021', status: 'completed' },
      { title: 'Bachelor’s in Social Communication · Radio and TV', school: 'UNEB', logo: 'uneb', period: '2018–2024', status: 'completed' },
      { title: 'Teaching degree in Computer Science', school: 'UNEB', logo: 'uneb', period: 'since 2026', status: 'in progress', ongoing: true },
    ],
  },
  work: {
    label: 'What I do',
    title: 'From the database to the interface',
    services: [
      { title: 'Web systems and APIs', icon: 'laravel', text: 'Laravel and PHP back-ends: admin panels, REST APIs and the business rules behind a product.' },
      { title: 'Interfaces with Vue', icon: 'vuedotjs', text: 'Fast, easy-to-use screens, from simple forms to full applications in the browser.' },
      { title: 'WordPress sites', icon: 'wordpress', text: 'Institutional sites and custom themes that clients can update on their own.' },
      { title: 'Integrations and automation', icon: 'gear', text: 'Connecting systems and third-party services, and turning repetitive manual work into automated routines.' },
      { title: 'Maintenance and evolution', icon: 'php', text: 'Updating, fixing and speeding up PHP systems that are already in production.' },
      { title: 'Infrastructure and deployment', icon: 'docker', text: 'Docker, servers and PostgreSQL and MySQL databases, to get the system online and keep it stable.' },
    ],
    principlesTitle: 'How I work',
    principles: [
      { title: 'Code someone else can understand', icon: 'code', text: 'I prefer simple and readable over clever. Whoever picks up the code after me should be able to change it without fear.' },
      { title: 'Clear communication', icon: 'chat', text: 'My Communication degree matters here: I explain my decisions, flag delays early and skip the jargon with non-technical people.' },
      { title: 'Truly remote', icon: 'globe', text: 'I’ve worked remotely for years, with organized writing, asynchronous communication and agreed-upon hours.' },
      { title: 'AI as a tool', icon: 'clawd', text: 'I use Claude Code every day to speed up repetitive tasks, review code and explore solutions. The decisions and the responsibility for the code are still mine.' },
    ],
  },
  projects: {
    label: 'Projects',
    title: 'Client work, products and experiments',
    intro: 'A selection from more than 70 projects I’ve versioned since 2019.',
    filterLabel: 'Filter projects',
    all: 'All',
    clients: 'Clients',
    own: 'Own',
    showing: 'Showing {n} projects',
    tech: 'Technologies:',
    kinds: { cliente: 'Client', produto: 'Product', pessoal: 'Personal project' },
    more: 'Personal projects are where I try out new technologies, like Go and multiplayer browser games.',
  },
  contact: {
    label: 'Contact',
    title: 'Let’s talk',
    text: 'For work, send me an email or a WhatsApp message. On social media and in games, I’m <strong>Janeleiro</strong>.',
    work: 'Work',
    social: 'Social',
  },
};

export const content: Record<Lang, Content> = { pt, en };
