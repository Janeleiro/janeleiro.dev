#!/bin/sh
# Regenera os ícones das instituições (Formação) em pixel art, exibidos em 1:1 no site.
# uneb-brasao.png é o brasão recortado de uneb-logo.svg (logo oficial do portal da UNEB);
# unicesumar-apple.png é o apple-touch-icon oficial da UniCesumar.
cd "$(dirname "$0")/../.."
python3 design/tools/pixelar_sprite.py design/logos/instituicoes/uneb-brasao.png public/img/inst/uneb.png 30 8 none
python3 design/tools/pixelar_sprite.py design/logos/instituicoes/unicesumar-apple.png public/img/inst/unicesumar.png 38 4 none
