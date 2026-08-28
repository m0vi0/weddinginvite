#!/usr/bin/env bash
# Generate elegant placeholder WebP images for the wedding invite.
# Palette: ivory #FAF7F2, blush #F2E6E0, gold #C9A84C, burgundy #6B1D2A, charcoal #2A2A2A
set -e
cd "$(dirname "$0")/.."
ROOT="public/images"
mkdir -p "$ROOT/couple" "$ROOT/venue" "$ROOT/gallery"

make_img () {
  # $1 = out path, $2 = w, $3 = h, $4 = base color, $5 = label, $6 = text color
  local out="$1" w="$2" h="$3" base="$4" label="$5" tc="$6"
  # soft radial vignette from a lighter center to the base color
  convert -size "${w}x${h}" \
    radial-gradient:"#fdfcfa"-"$base" \
    -gravity center \
    -pointsize $((w/12)) -font "Georgia" -fill "$tc" -annotate 0 "$label" \
    "$out.png"
  cwebp -quiet -q 82 "$out.png" -o "$out.webp"
  rm -f "$out.png"
}

# Couple portraits (3:4)
make_img "$ROOT/couple/amstel"   900 1200 "#6b1d2a" "A" "#c9a84c"
make_img "$ROOT/couple/lirisha"  900 1200 "#4a1420" "L" "#d4b96a"

# Venue
make_img "$ROOT/venue/leela-palace" 1600 1000 "#2a2a2a" "Udaipur" "#c9a84c"

# Gallery (varied)
make_img "$ROOT/gallery/01" 900 1200 "#6b1d2a" "01" "#c9a84c"
make_img "$ROOT/gallery/02" 1200 900  "#4a1420" "02" "#d4b96a"
make_img "$ROOT/gallery/03" 900 1200 "#6b1d2a" "03" "#c9a84c"
make_img "$ROOT/gallery/04" 1200 900  "#2a2a2a" "04" "#c9a84c"
make_img "$ROOT/gallery/05" 1000 1000 "#4a1420" "05" "#d4b96a"
make_img "$ROOT/gallery/06" 900 1200  "#6b1d2a" "06" "#c9a84c"
make_img "$ROOT/gallery/07" 1000 1000 "#2a2a2a" "07" "#c9a84c"
make_img "$ROOT/gallery/08" 1200 900  "#4a1420" "08" "#d4b96a"

# OG image (social share)
make_img "$ROOT/og-image" 1200 630 "#6b1d2a" "A & L" "#c9a84c"

echo "Generated placeholder images:"
find "$ROOT" -name '*.webp' | sort
