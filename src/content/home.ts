// Home page content — copy carried over from v1 index.astro.

export const hero = {
  title: 'The Scrap Pit',
  subtitle: 'Forget potential - bring the output',
  primary: { label: 'How to Join', to: '/contact' },
  image: '/images/hero-octagon-scrap.webp',
}

// NEW COPY (Phase 3) — short gateway into the Training route.
export const trainingGateway = {
  eyebrow: 'Training',
  title: 'Three paths. One pit.',
  cta: { label: 'Explore the Gauntlet', to: '/training' },
}

// Compact version of the v1 "Forged in Fire" philosophy header.
export const forgedInFireHome = {
  title: 'Set in Fire',
  subtitle: 'Our philosophy',
  body:
    "We don't just train fighters.",
  cta: { label: 'Read Our Story', to: '/about' },
}

export const becomeScrappyHome = {
  title: 'Become Scrappy',
  subtitle: 'And learn to fight',
  body:
    "Face your fears, push your limits, and discover who you truly are.",
  features: ['Unlimited training', 'Championship coaching', 'Brutal conditioning'],
  primary: { label: 'Start Free Trial', to: '/contact' },
  secondary: { label: 'View Pricing', to: '/training#pricing' },
}
