// Converte os SVGs do Simple Icons (CC0) em logos pixel art: rasteriza numa grade
// pequena, binariza o alfa e gera um path de retângulos (um "pixel" por célula).
// Saída: src/data/pixel-icons.ts e uma prancha de conferência em design/logos/prancha.png.
// Uso: node design/tools/pixelizar_logos.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url);
// sharp já vem com o Astro (dependência transitiva); não instalamos nada novo
const sharpDir = readdirSync(join(ROOT, 'node_modules/.pnpm')).find((d) => d.startsWith('sharp@'));
const sharp = require(join(ROOT, 'node_modules/.pnpm', sharpDir, 'node_modules/sharp'));

// Duas grades: 24 (ícones a 24 px) e 48 (ícones a 48 px, traço mais fino e forma mais fiel).
// O viewBox do Simple Icons é 24×24, então na grade 24 cada unidade vira 1 pixel.
const SVG_DIR = join(ROOT, 'design/logos/svg');
const PANEL = [0x1a, 0x22, 0x35];

const meta = {
  php: ['PHP', '777BB4'], laravel: ['Laravel', 'FF2D20'], vuedotjs: ['Vue', '4FC08D'],
  wordpress: ['WordPress', '21759B'], go: ['Go', '00ADD8'], javascript: ['JavaScript', 'F7DF1E'],
  typescript: ['TypeScript', '3178C6'], postgresql: ['PostgreSQL', '4169E1'], mysql: ['MySQL', '4479A1'],
  docker: ['Docker', '2496ED'], electron: ['Electron', '47848F'], amazonwebservices: ['AWS', 'FF9900'],
  database: ['SQL', '8FD3B6'], linkedin: ['LinkedIn', '0A66C2'], instagram: ['Instagram', 'FF0069'], github: ['GitHub', 'E7EAF2', '181717'], steam: ['Steam', 'C7D5E0', '171A21'], discord: ['Discord', '5865F2'],
  whatsapp: ['WhatsApp', '25D366'], email: ['E-mail', 'F2B851'], clawd: ['Claude Code', 'D97757'],
  home: ['Início', 'E7EAF2', '141A2B'], user: ['Sobre', 'E7EAF2', '141A2B'], briefcase: ['Trabalho', 'E7EAF2', '141A2B'], folder: ['Projetos', 'E7EAF2', '141A2B'],
  code: ['Código', 'F2B851'], chat: ['Comunicação', '8FD3B6'], globe: ['Remoto', '8FD3B6'], gear: ['Integrações', 'F2B851'],
};

// Ajusta a cor da marca para ter contraste ≥ 4.5:1 com o painel de cada tema:
// clareando no tema escuro e escurecendo no claro.
const lum = ([r, g, b]) => {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const hexToRgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbToHex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
function readable(hex, panel) {
  let c = hexToRgb(hex);
  const toward = lum(panel) < 0.5 ? 255 : 0;
  for (let i = 0; i < 30 && ratio(c, panel) < 4.5; i++) c = c.map((v) => v + (toward - v) * 0.12);
  return rgbToHex(c);
}
const LIGHT_PANEL = [0xff, 0xff, 0xff];

async function pixelize(file, GRID) {
  const svg = readFileSync(file);
  // Renderiza grande e reduz por média de área: cada célula vira a cobertura daquele pixel
  const { data } = await sharp(svg, { density: 72 * 16 })
    .resize(GRID, GRID, { kernel: 'cubic', fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const on = (x, y) => data[(y * GRID + x) * 4 + 3] > (GRID > 24 ? 110 : 80);
  // Junta pixels vizinhos da mesma linha num retângulo só
  let d = '';
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; ) {
      if (!on(x, y)) { x++; continue; }
      let w = 1;
      while (x + w < GRID && on(x + w, y)) w++;
      d += `M${x} ${y}h${w}v1h-${w}z`;
      x += w;
    }
  }
  return d;
}

const icons = {};
for (const f of readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg')).sort()) {
  const slug = f.replace('.svg', '');
  // 3º valor opcional: cor de base para o tema claro (quando a do escuro foi clareada à mão)
  const [title, hex, hexLight = hex] = meta[slug];
  icons[slug] = { title, color: readable(hex, PANEL), colorLight: readable(hexLight, LIGHT_PANEL), d: await pixelize(join(SVG_DIR, f), 24), d48: await pixelize(join(SVG_DIR, f), 48) };
}

writeFileSync(
  join(ROOT, 'src/data/pixel-icons.ts'),
  `// Gerado por design/tools/pixelizar_logos.mjs a partir do Simple Icons (CC0). Não editar à mão.\n` +
    `export const pixelIcons = ${JSON.stringify(icons, null, 2)} as const;\n` +
    `export type PixelIconName = keyof typeof pixelIcons;\n`,
);

// Prancha para conferir as formas
const cell = 120, cols = 5, rows = Math.ceil(Object.keys(icons).length / cols);
const items = Object.values(icons).map((ic, i) =>
  `<g transform="translate(${(i % cols) * cell + 12},${Math.floor(i / cols) * cell + 6}) scale(2)"><path fill="${ic.color}" d="${ic.d48}"/></g>` +
  `<text x="${(i % cols) * cell + 60}" y="${Math.floor(i / cols) * cell + 114}" fill="#8f98ad" font-size="12" font-family="sans-serif" text-anchor="middle">${ic.title}</text>`);
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * cell}" height="${rows * cell}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#1a2235"/>${items.join('')}</svg>`;
await sharp(Buffer.from(sheet)).png().toFile(join(ROOT, 'design/logos/prancha.png'));
console.log(Object.keys(icons).length, 'ícones');
