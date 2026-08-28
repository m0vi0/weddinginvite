import { colors } from '../design-tokens'

export const music = {
  src: '/audio/wedding-theme.mp3',
  // Swap in your real song by replacing public/audio/wedding-theme.mp3
  // or changing this path. Keep it short/loopable for background playback.
}

export const couple = {
  partner1: {
    name: 'Amstel',
    fullName: "Amstel D'Cruz",
    image: '/images/couple/amstel.webp',
    bio: 'A dreamer with an old soul who finds poetry in the quiet corners of everyday life, and a steady hand for every wild idea.',
  },
  partner2: {
    name: 'Lirisha',
    fullName: 'Lirisha Dsouza',
    image: '/images/couple/lirisha.webp',
    bio: 'An adventurer at heart who turns every ordinary moment into a story worth telling, and fills every room with light.',
  },
}

export const weddingDate = new Date('2027-02-14T18:00:00+05:30')

export const story = [
  {
    date: 'Summer · 2022',
    title: 'First Meeting',
    description:
      'It began with a conversation neither of us wanted to end — seared paneer, shared laughter, and the discovery that home is a person.',
  },
  {
    date: 'Winter · 2023',
    title: 'First Adventure',
    description:
      'A spontaneous road trip into the hills became the first of many. We learned that the best maps are the ones drawn together.',
  },
  {
    date: 'Monsoon · 2024',
    title: 'The Question',
    description:
      'Under rain-washed skies in Mangalore, a question was asked and an answer given that turned two paths into one.',
  },
  {
    date: 'Spring · 2025',
    title: 'The Promise',
    description:
      'A ring, a family, and a lifetime of tomorrows. Every season since has been a quiet rehearsal for this day.',
  },
]

// Christian wedding celebrations (no Mehendi / Haldi / Sangeet).
// Replace venues, dates, and dress codes with your real details.
export const events = [
  {
    name: 'Engagement',
    date: 'December 20, 2026',
    time: '6:30 PM',
    venue: 'The Family Estate',
    dressCode: 'Semi-Formal · Pastels',
    description:
      'The evening we promised forever — rings exchanged among family, laughter, and the first glimpse of all that is to come.',
  },
  {
    name: 'Wedding Ceremony',
    date: 'February 14, 2027',
    time: '10:00 AM',
    venue: 'Milagres Church, Mangalore',
    dressCode: 'Church Formal · Whites & Creams',
    description:
      'Before God and our loved ones, we exchange our vows and begin the covenant of marriage.',
  },
  {
    name: 'Reception',
    date: 'February 14, 2027',
    time: '7:00 PM onwards',
    venue: 'The Ocean Pearl, Mangalore',
    dressCode: 'Black Tie / Formal',
    description:
      'An evening of feasting, toasts, and dancing as we celebrate the start of our life together.',
  },
]

export const venue = {
  name: 'The Ocean Pearl',
  city: 'Mangalore',
  address: 'Mangalore, Karnataka 575001',
  mapUrl: 'https://maps.google.com/?q=The+Ocean+Pearl+Mangalore',
  image: '/images/venue/mangalore.webp',
  description:
    'Where the Arabian Sea meets the Mangalore coast, and centuries of warmth meet the calm of an evening shore — the perfect setting for a new beginning.',
}

export const galleryImages = [
  { src: '/images/gallery/01.webp', alt: 'Portrait over the lake', aspect: 'portrait' as const },
  { src: '/images/gallery/02.webp', alt: 'The engagement ceremony', aspect: 'landscape' as const },
  { src: '/images/gallery/03.webp', alt: 'Pre-wedding shoot in the hills', aspect: 'portrait' as const },
  { src: '/images/gallery/04.webp', alt: 'Walking together at dusk', aspect: 'landscape' as const },
  { src: '/images/gallery/05.webp', alt: 'A candid stolen laugh', aspect: 'square' as const },
  { src: '/images/gallery/06.webp', alt: 'Celebration with family', aspect: 'portrait' as const },
  { src: '/images/gallery/07.webp', alt: 'The first dance rehearsal', aspect: 'square' as const },
  { src: '/images/gallery/08.webp', alt: 'Golden hour portrait', aspect: 'landscape' as const },
]

export const closing = {
  message: "We can't wait to celebrate with you.",
  tagline: 'Two souls, one journey · Amstel & Lirisha',
  monogram: 'A & L',
}

export const petals = {
  // Colors sampled from the marigold/gold/blush palette so petals feel organic.
  colors: [colors.gold, colors.goldLight, colors.blush, colors.burgundy],
}