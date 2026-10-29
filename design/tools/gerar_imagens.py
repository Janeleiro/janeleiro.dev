"""Gera as imagens do site a partir do avatar escolhido.
Uso: python3 design/tools/gerar_imagens.py design/avatar/<avatar>.png
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
PUB = ROOT / "public"
IMG = PUB / "img"
IMG.mkdir(parents=True, exist_ok=True)

BG, PANEL, EDGE, FG, MUTED, ACCENT = "#111726", "#1a2235", "#3a4766", "#e7eaf2", "#8f98ad", "#f2b851"
FONTS = ROOT / "node_modules/@fontsource"

src = Image.open(sys.argv[1]).convert("RGB")
# Corta a moldura de ~1% que o modelo desenhou na borda
w, h = src.size
m = round(w * 0.012)
av = src.crop((m, m, w - m, h - m))

for size in (192, 256, 384, 512):
    av.resize((size, size), Image.LANCZOS).save(IMG / f"avatar-{size}.webp", "WEBP", quality=90)

# Favicon e apple-touch: recorte do rosto
fw, fh = av.size
face = av.crop((int(fw * .2), int(fh * .08), int(fw * .8), int(fh * .68)))
# 32 px com paleta reduzida: o favicon cai de ~8 KB para ~1 KB
face.resize((32, 32), Image.LANCZOS).quantize(64).save(PUB / "favicon.png", optimize=True)
face.resize((180, 180), Image.LANCZOS).save(IMG / "apple-touch-icon.png", optimize=True)

# Imagem de compartilhamento 1200x630
def font(pkg, weight, size):
    for f in (FONTS / pkg / "files").glob(f"*-latin-{weight}-normal.woff2"):
        try:
            return ImageFont.truetype(str(f), size)
        except OSError:
            pass
    return ImageFont.load_default(size)

og = Image.new("RGB", (1200, 630), BG)
d = ImageDraw.Draw(og)
d.rectangle((60, 120, 1140, 510), fill=PANEL, outline=EDGE, width=4)
og.paste(av.resize((300, 300), Image.LANCZOS), (105, 165))
d.rectangle((101, 161, 409, 469), outline=EDGE, width=4)
d.text((460, 200), "Jota Carvalho", font=font("pixelify-sans", 500, 76), fill=FG)
d.text((460, 300), "Full-stack developer", font=font("atkinson-hyperlegible", 400, 40), fill=MUTED)
d.text((460, 352), "PHP · Laravel · Vue · WordPress", font=font("atkinson-hyperlegible", 400, 34), fill=MUTED)
d.text((460, 420), "janeleiro.dev", font=font("pixelify-sans", 500, 40), fill=ACCENT)
og.save(IMG / "og.png", optimize=True)
print("ok")
