import { colors } from '../design-tokens'

export const couple = {
  partner1: {
    name: 'Amstel',
    fullName: 'Amstel Sharma',
    image: '/images/couple/amstel.webp',
    bio: 'A dreamer with an old soul who finds poetry in the quiet corners of everyday life, and a steady hand for every wild idea.',
  },
  partner2: {
    name: 'Priya',
    fullName: 'Priya Mehta',
    image: '/images/couple/priya.webp',
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
      'Under rain-washed skies in Udaipur, a question was asked and an answer given that turned two paths into one.',
  },
  {
    date: 'Spring · 2025',
    title: 'The Promise',
    description:
      'A ring, a family, and a lifetime of tomorrows. Every season since has been a quiet rehearsal for this day.',
  },
]

export const events = [
  {
    name: 'Mehendi',
    date: 'February 12, 2027',
    time: '4:00 PM onwards',
    venue: 'The Pool Lawn',
    dressCode: 'Festive Casual · Greens & Yellows',
    description:
      'An afternoon of henna artistry, folk music, and celebration beneath the open Udaipur sky.',
  },
  {
    name: 'Sangeet',
    date: 'February 13, 2027',
    time: '7:00 PM onwards',
    venue: 'The Grand Ballroom',
    dressCode: 'Cocktail · Jewel Tones',
    description:
      'A night of dance and unforgettable performances, where every family becomes one big dance floor.',
  },
  {
    name: 'Haldi',
    date: 'February 14, 2027',
    time: '10:00 AM',
    venue: 'The Garden Terrace',
    dressCode: 'Casual · Whites & Yellows',
    description:
      'A blessing of turmeric and joy — a golden morning with the ones we love the most.',
  },
  {
    name: 'Wedding Ceremony',
    date: 'February 14, 2027',
    time: '6:00 PM',
    venue: 'The Grand Mandap',
    dressCode: 'Traditional Indian Formal',
    description:
      'The sacred moment when two become one, surrounded by fire, flowers, and the people who made us.',
  },
  {
    name: 'Reception',
    date: 'February 15, 2027',
    time: '7:30 PM onwards',
    venue: 'The Crystal Hall',
    dressCode: 'Black Tie · Formal Indian',
    description:
      'An evening of feasting and dancing to celebrate the beginning of our forever.',
  },
]

export const venue = {
  name: 'The Leela Palace',
  city: 'Udaipur',
  address: 'Lake Pichola, Udaipur, Rajasthan 313001',
  mapUrl: 'https://maps.google.com/?q=Leela+Palace+Udaipur',
  image: '/images/venue/leela-palace.webp',
  description:
    'Nestled on the banks of Lake Pichola, where centuries of royal grandeur meet the calm of an evening lake — the perfect setting for a new beginning.',
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
  tagline: 'Two souls, one journey · Amstel & Priya',
  monogram: 'A & P',
}

export const petals = {
  // Colors sampled from the marigold/gold/blush palette so petals feel organic.
  colors: [colors.gold, colors.goldLight, colors.blush, colors.burgundy],
}