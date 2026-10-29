"""Reduz um sprite (PNG com transparência) a uma grade pequena de pixels de verdade:
redimensiona por média, limita a paleta, binariza o alfa e desenha um contorno de 1 px.
Uso: python3 design/tools/pixelar_sprite.py entrada.png saida.png <largura> [cores] [cor_contorno | none] [x,y,RRGGBB ...]
Os últimos argumentos pintam pixels à mão (ex.: olhos), em coordenadas da imagem final.
"""
import sys
from PIL import Image

src, out, width = sys.argv[1], sys.argv[2], int(sys.argv[3])
colors = int(sys.argv[4]) if len(sys.argv) > 4 else 8
arg = sys.argv[5] if len(sys.argv) > 5 else '181c3a'
outline = None if arg == 'none' else tuple(int(arg[i:i + 2], 16) for i in (0, 2, 4))

im = Image.open(src).convert('RGBA')
im = im.crop(im.split()[3].point(lambda v: 255 if v > 128 else 0).getbbox())
h = round(im.height * width / im.width)
# Reduz em RGBa (pré-multiplicado): sem isso a borda mistura com o preto do fundo transparente
small = im.convert('RGBa').resize((width, h), Image.BOX).convert('RGBA')

alpha = small.split()[3].point(lambda v: 255 if v > 110 else 0)
# O fundo recebe a cor mais comum do desenho, para o preto não entrar na paleta à toa
opaque = [small.getpixel((x, y))[:3] for y in range(h) for x in range(width) if alpha.getpixel((x, y))]
base = max(set(opaque), key=opaque.count)
rgb = Image.new('RGB', small.size, base)
rgb.paste(small.convert('RGB'), mask=alpha)
rgb = rgb.quantize(colors=colors + 1, method=Image.Quantize.MEDIANCUT).convert('RGB')

# Margem de 1 px para o contorno caber
W, H = width + 2, h + 2
res = Image.new('RGBA', (W, H), (0, 0, 0, 0))
for y in range(h):
    for x in range(width):
        if alpha.getpixel((x, y)):
            res.putpixel((x + 1, y + 1), rgb.getpixel((x, y)) + (255,))
px = res.load()
solid = {(x, y) for y in range(H) for x in range(W) if px[x, y][3]}
for x, y in [] if outline is None else [(x, y) for y in range(H) for x in range(W) if (x, y) not in solid]:
    if any((x + dx, y + dy) in solid for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
        px[x, y] = outline + (255,)
for spec in sys.argv[6:]:
    x, y, c = spec.split(',')
    px[int(x), int(y)] = tuple(int(c[i:i + 2], 16) for i in (0, 2, 4)) + (255,)
res.save(out)
print(out, res.size)
