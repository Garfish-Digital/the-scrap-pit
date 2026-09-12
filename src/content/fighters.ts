// Fighters page content — copy carried over from v1 index.astro.

export type Fighter = {
  name: string
  title: string
  quote: string
  image: string
}

export const profiles = {
  title: 'Iron Will Profiles',
  description: 'Voices changed by the pit. Real fighters, real stories, real results.',
}

export const fighters: Fighter[] = [
  {
    name: 'Marcus Ortiz',
    title: 'Amateur Boxing Champion',
    quote:
      "The Scrap Pit didn't just teach me to fight. It taught me to conquer the voice in my head that says I can't.",
    image: '/images/fighter-profile-1.webp',
  },
  {
    name: 'Dominique Kern',
    title: 'MMA Fighter & Trainer',
    quote:
      "Every session breaks you down. Every session builds you back up. That's where real strength comes from.",
    image: '/images/fighter-profile-2.webp',
  },
  {
    name: 'James "Blackout" Thompson',
    title: 'Kickboxing Instructor',
    quote:
      "The pit strips away everything fake. What's left is who you really are and what you're capable of.",
    image: '/images/fighter-profile-3.webp',
  },
]

// Home and Fighters both carry "Forged in Fire". Home keeps the v1 philosophy
// statement; this Fighters version bridges fighter testimony to the coaches.
// NEW COPY (Phase 3) — review before Phase 5.
export const forgedInFireFighters = {
  title: 'Forged in Fire',
  subtitle: 'Nobody walks out the way they walked in',
  body:
    'The voices above are not testimonials. They are receipts. Each one was earned under the people below, one round at a time.',
}

export type Leader = {
  name: string
  role: string
  bio: string
  credentials: string[]
  image: string
}

export const leadersSection = { title: 'Hardened Leaders' }

export const leaders: Leader[] = [
  {
    name: '"Iron" Mike Rodriguez',
    role: 'Head Coach & Founder',
    bio:
      'Former professional boxer with 15 years in the ring. Believes that true strength comes from facing your fears head-on and never backing down.',
    credentials: ['25-3 professional record', 'Certified boxing coach'],
    image: '/images/leader-mike-rodriguez-coach-and-founder.webp',
  },
  {
    name: 'Sarah Chen',
    role: 'MMA Director',
    bio:
      'Black belt in Brazilian Jiu-Jitsu and former MMA competitor. Specializes in turning mental toughness into physical dominance.',
    credentials: ['BJJ black belt', 'MMA coach certification'],
    image: '/images/leader-sarah-chen-mma-director.webp',
  },
]

// NEW COPY (Phase 3) — the Fighters route closes with an invitation tied to its
// people, per PLAN.md, instead of the pricing guarantee.
export const fightersInvitation = {
  title: 'Come Meet the Pit',
  body:
    'Watch a session. Talk to Mike or Sarah. Then decide whether you belong here.',
  primary: { label: 'Book a Visit', to: '/contact' },
  secondary: { label: 'See the Training', to: '/training' },
}
