export const colors = {
  ivory: '#faf7f2',
  ivoryDark: '#f0ebe3',
  blush: '#f2e6e0',
  gold: '#c9a84c',
  goldLight: '#d4b96a',
  goldMuted: 'rgba(185, 155, 74, 0.35)',
  burgundy: '#6b1d2a',
  burgundyDeep: '#4a1420',
  charcoal: '#2a2a2a',
  charcoalLight: '#5a5a52',
  warmWhite: '#fdfcfa',
} as const

export const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  body: "'Cormorant Garamond', Garamond, serif",
  sans: "'Inter', system-ui, sans-serif",
} as const

export const easing = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  cinematic: [0.77, 0, 0.175, 1] as const,
  gentle: [0.4, 0, 0.2, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
}

export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  cinematic: 1.5,
}