import type { PixelIconName } from './pixel-icons';

export const person = {
  name: 'Jota Carvalho',
  fullName: 'Carlos Alberto P. de Carvalho Júnior',
  handle: 'janeleiro',
  email: 'contato@janeleiro.dev',
  whatsapp: '5575991918555',
  whatsappLabel: '+55 75 99191-8555',
};

export interface ContactLink {
  name: string;
  icon: PixelIconName;
  handle: string;
  href: string;
}

export const workLinks: ContactLink[] = [
  { name: 'E-mail', icon: 'email', handle: person.email, href: `mailto:${person.email}` },
  { name: 'WhatsApp', icon: 'whatsapp', handle: person.whatsappLabel, href: `https://wa.me/${person.whatsapp}` },
  { name: 'LinkedIn', icon: 'linkedin', handle: '/in/janeleiro', href: 'https://www.linkedin.com/in/janeleiro/' },
  { name: 'GitHub', icon: 'github', handle: '@janeleiro', href: 'https://github.com/janeleiro' },
];

export const socialLinks: ContactLink[] = [
  { name: 'Instagram', icon: 'instagram', handle: '@janeleiro', href: 'https://www.instagram.com/janeleiro' },
  { name: 'Steam', icon: 'steam', handle: 'janeleiro', href: 'https://steamcommunity.com/id/janeleiro/' },
  { name: 'Discord', icon: 'discord', handle: 'janeleiro', href: 'https://discord.com/users/255487207110868994' },
];

// Perfis públicos, para o "sameAs" dos dados estruturados
export const profileUrls = [...workLinks, ...socialLinks]
  .map((l) => l.href)
  .filter((h) => h.startsWith('https://') && !h.includes('wa.me'));
