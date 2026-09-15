// Training page content — copy carried over from v1 index.astro.

export type Discipline = {
  id: 'striking' | 'grappling' | 'conditioning'
  title: string
  summary: string
  details: string[]
  image: string
  alt: string
}

export const disciplines: Discipline[] = [
  {
    id: 'striking',
    title: 'Striking',
    summary:
      'Master the art of controlled violence. Boxing, Muay Thai, and kickboxing fundamentals that make you precise under pressure.',
    details: ['45 min sessions', 'High intensity', 'Technique focus'],
    image: '/images/fighter-striking.webp',
    alt: 'Fighter throwing a strike during a striking session',
  },
  {
    id: 'grappling',
    title: 'Grappling',
    summary:
      'Control every outcome. Brazilian Jiu-Jitsu, wrestling, and submission techniques that make you dangerous at every range.',
    details: ['60 min sessions', 'Full tactical focus', 'Mental warfare'],
    image: '/images/fighters-grappling.webp',
    alt: 'Two fighters grappling on the mat',
  },
  {
    id: 'conditioning',
    title: 'Conditioning',
    summary:
      'Discover new ceilings. Brutal strength and conditioning sessions that build unbreakable mental and physical fortitude.',
    details: ['30 min sessions', 'Maximum intensity', 'Pain tolerance'],
    image: '/images/fighter-conditioning.webp',
    alt: 'Fighter mid-conditioning session',
  },
]

export const gauntlet = {
  title: 'The Gauntlet Stages',
  description:
    'Three paths to mastery. Each designed to break you down and build you back stronger.',
}

// Home and Training both carry "Become Scrappy". Home keeps the broad invitation
// from v1; this Training version is a short hinge between disciplines and plans.
// NEW COPY (Phase 3) — review before Phase 5.
export const becomeScrappyTraining = {
  title: 'Become Scrappy',
  subtitle: 'Pick a way to train',
  body:
    'Every fighter in the pit started with one discipline and a decision. Choose yours below, then choose how far you want to take it.',
}

export type Plan = {
  id: 'warrior' | 'champion' | 'legend'
  name: string
  subtitle: string
  price: number
  period: string
  popular?: boolean
  features: { text: string; included: boolean }[]
  cta: string
}

export const pricing = {
  title: 'Choose Your Training',
  subtitle: 'Pricing plans for every fighter',
  description:
    'From beginner to champion, we have a plan that fits your commitment level and goals.',
}

export const plans: Plan[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    subtitle: 'Where it starts',
    price: 89,
    period: '/month',
    features: [
      { text: '8 classes per month', included: true },
      { text: 'Basic locker access', included: true },
      { text: 'Open gym access', included: true },
      { text: 'Beginner workshops', included: true },
      { text: 'Personal training', included: false },
      { text: 'Advanced seminars', included: false },
    ],
    cta: 'Start Training',
  },
  {
    id: 'champion',
    name: 'Champion',
    subtitle: 'The full commitment',
    price: 149,
    period: '/month',
    popular: true,
    features: [
      { text: 'Unlimited classes', included: true },
      { text: 'Premium locker', included: true },
      { text: '24/7 gym access', included: true },
      { text: 'All workshops', included: true },
      { text: '2 personal training sessions/month', included: true },
      { text: 'Advanced seminars', included: true },
    ],
    cta: 'Become Champion',
  },
  {
    id: 'legend',
    name: 'Legend',
    subtitle: 'Unmatched experience',
    price: 249,
    period: '/month',
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'VIP locker room', included: true },
      { text: 'Private training area', included: true },
      { text: 'Priority class booking', included: true },
      { text: 'Unlimited personal training', included: true },
      { text: 'Exclusive events', included: true },
    ],
    cta: 'Join Elite',
  },
]

export const extras = {
  title: 'Additional Options',
  items: [
    { name: 'Day Pass', price: '$25', note: 'One session. See for yourself.' },
    { name: 'Weekly Pass', price: '$65', note: 'One week unlimited access' },
    { name: 'Personal Training', price: '$80/session', note: 'One-on-one expert coaching' },
    { name: 'Small Group (2-4)', price: '$45/person', note: 'Semi-private training' },
  ],
}

export const guarantee = {
  title: '30-Day Warrior Guarantee',
  days: '30', // rolls up as an odometer
  titleAfterDays: '-Day Warrior Guarantee',
  body:
    "Not satisfied with your training? Get a full refund within 30 days. We've never had to honor it.",
  cta: 'Start Risk-Free Trial',
}
