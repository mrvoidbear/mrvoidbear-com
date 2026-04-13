#!/usr/bin/env bash
# Regenerate `public/` favicons + header logo from authored assets (requires ImageMagick `magick`).
# Sources: assets/favicon-32.png (master), assets/logo-64.png (top bar).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets"
OUT="$ROOT/public"

# Favicon set: 32×32 master → 16×16 (nearest neighbor), .ico, Apple touch
magick "$SRC/favicon-32.png" -strip "$OUT/favicon-32.png"
magick "$OUT/favicon-32.png" -sample 16x16 -strip "$OUT/favicon-16.png"
magick "$OUT/favicon-16.png" "$OUT/favicon-32.png" -alpha on "$OUT/favicon.ico"
magick "$OUT/favicon-32.png" -filter point -resize 180x180 -strip "$OUT/apple-touch-icon.png"

# Top bar logo (64×64)
magick "$SRC/logo-64.png" -strip "$OUT/images/logo-header.png"

echo "Wrote $OUT/favicon-*.png, $OUT/favicon.ico, $OUT/apple-touch-icon.png, $OUT/images/logo-header.png"
