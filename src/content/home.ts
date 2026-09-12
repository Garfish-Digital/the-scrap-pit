// Home page content — copy carried over from v1 index.astro.

export const hero = {
  title: 'The Scrap Pit',
  subtitle: 'Forget potential - bring the output',
  primary: { label: 'View Training', to: '/training' },
  secondary: { label: 'Meet the Fighters', to: '/fighters' },
  image: '/images/hero-octagon-scrap.webp',
}

// NEW COPY (Phase 3) — short gateway into the Training route.
export const trainingGateway = {
  eyebrow: 'Training',
  title: 'Three paths. One pit.',
  linkLabel: 'Explore the Gauntlet',
}

// Compact version of the v1 "Forged in Fire" philosophy header.
export const forgedInFireHome = {
  title: 'Forged in Fire',
  subtitle: 'The Scrap Pit philosophy',
  body:
    "We don't just train fighters. We build warriors who refuse to accept limits, who turn pain into power, and who emerge from every battle stronger than before.",
  linkLabel: 'Read our story',
}

export const becomeScrappyHome = {
  title: 'Become Scrappy',
  subtitle: 'And learn to fight',
  body:
    "Are you ready to step into the pit? To face your fears, push your limits, and discover what you're truly capable of? You already know this is for you.",
  features: ['Unlimited training', 'Championship coaching', 'Brutal conditioning'],
  primary: { label: 'Start Free Trial', to: '/contact' },
  secondary: { label: 'View Pricing', to: '/training#pricing' },
}
