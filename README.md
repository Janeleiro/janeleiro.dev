# janeleiro.dev

Site pessoal de **Jota Carvalho** (Janeleiro), full-stack developer em Conceição do Coité, Bahia.

Uma página só, estática, com visual de pixel art inspirado em RPGs, em português (inglês em breve).

## Stack

- [Astro](https://astro.build) gerando HTML estático, sem framework rodando no navegador
- CSS próprio e um script pequeno em TypeScript para animações, menu e preferências de exibição
- Fontes hospedadas no próprio site via [Fontsource](https://fontsource.org): Pixelify Sans, Atkinson Hyperlegible e VT323

Recursos da página: tema claro, escuro ou do sistema; tamanho do texto ajustável; reduzir animações;
alto contraste; modo leitura; e versão para impressão.

## Rodando

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # gera dist/
pnpm preview   # serve o build
```

`public/.htaccess` configura HTTPS, página 404, compressão e cache para hospedagem Apache/LiteSpeed.

## Onde editar

| O quê | Arquivo |
|---|---|
| Projetos do portfólio | `src/data/projects.ts` |
| Contatos e redes | `src/data/contact.ts` |
| Textos das seções | `src/pages/index.astro` |
| Cores, fontes e modos de exibição | `src/styles/global.css` |

## Assets em pixel art

Os scripts de `design/tools/` regeneram as imagens a partir das fontes em `design/`:

| Script | Gera |
|---|---|
| `pixelizar_logos.mjs` | `src/data/pixel-icons.ts`: logos em grade de 24 e 48 px a partir dos SVGs de `design/logos/svg/` |
| `gerar_imagens.py <avatar.png>` | avatar, favicon, ícone do iOS e imagem de compartilhamento |
| `gerar_mascotes.sh` | elePHPant e Gopher em pixel art |
| `gerar_instituicoes.sh` | ícones da UNEB e da UniCesumar |
| `pixelar_sprite.py` | reduz qualquer PNG com transparência a uma grade de pixels |
| `print_cdp.mjs` | prints de páginas com Chrome headless (usado nos cards de projetos) |

## Créditos

- **Gopher**: criado por [Renée French](https://reneefrench.blogspot.com/), licenciado sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). A versão em pixel art deste site é uma adaptação.
- **elePHPant**: mascote do PHP criado por Vincent Pontier.
- **Clawd**: mascote do Claude Code, da Anthropic, redesenhado a partir do logo em blocos do terminal.
- **Logos de tecnologias e redes**: [Simple Icons](https://simpleicons.org) (CC0), convertidas para pixel art. As marcas pertencem aos seus donos.
- **Logos da UNEB e da UniCesumar**: das próprias instituições, convertidas para pixel art, usadas só para identificar a formação.

## Licença

O **código** está sob a [licença MIT](LICENSE).

O **conteúdo** não está licenciado para reuso: textos, o avatar em pixel art, os prints de projetos
e as informações pessoais são © Jota Carvalho, todos os direitos reservados. Marcas e artes de
terceiros pertencem aos seus donos.
