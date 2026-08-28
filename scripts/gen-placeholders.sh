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

# Richer venue hero with layered sky/sea/shore gradients + a horizon line,
# so the full-bleed section reads as a real coastal photograph placeholder
# (not a flat low-detail block). Label kept small and lower-third.
make_venue () {
  # $1 = out path, $2 = w, $3 = h
  local out="$1" w="$2" h="$3"
  local sky="$((h*55/100))" sea="$((h*82/100))"
  # sky: dusk gradient; sea: deeper teal; shore: warm sand
  convert -size "${w}x${h}" xc:none \
    \( -size "${w}x${sky}" gradient:"#caa86a"-"#7a3b3f" \) -gravity north -composite \
    \( -size "${w}x$((sea-sky))" gradient:"#3a5560"-"#1f3a44" \) -gravity north -geometry +0+"${sky}" -composite \
    \( -size "${w}x$((h-sea))" gradient:"#d9c39a"-"#b89e74" \) -gravity south -composite \
    \( -size "${w}x2" xc:"#fdfcfa" -alpha set -channel a -evaluate multiply 0.5 \) -gravity north -geometry +0+"${sea}" -composite \
    -gravity south -pointsize $((w/22)) -font "Georgia" -fill "#faf7f2" -annotate +0+40 "Mangalore" \
    "$out.png"
  cwebp -quiet -q 88 "$out.png" -o "$out.webp"
  rm -f "$out.png"
}

# Couple portraits (3:4)
make_img "$ROOT/couple/amstel"   900 1200 "#6b1d2a" "A" "#c9a84c"
make_img "$ROOT/couple/lirisha"  900 1200 "#4a1420" "L" "#d4b96a"

# Venue — Mangalore coastal hero (richer layered placeholder)
make_venue "$ROOT/venue/mangalore" 1600 1000

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
