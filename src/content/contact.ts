// Contact page content — copy carried over from v1 index.astro.

export const contactHero = {
  title: 'Contact the Pit',
  subtitle: 'Ready to start your journey?',
  body: "Tell us where you are. We'll tell you what comes next.",
}

export const form = {
  title: 'Get in Touch',
  interests: [
    'Striking (Boxing, Muay Thai)',
    'Grappling (BJJ, Wrestling)',
    'Conditioning',
    'All Training Types',
  ],
  messagePlaceholder: 'Tell us about your goals...',
  submit: 'Send Message',
  // NEW COPY (Phase 5) — on-page confirmation. The form does not transmit;
  // the copy no longer says so (owner decision: no "demo" language in the UI).
  confirmation: {
    title: 'Message received',
    body: 'Someone from the Pit will reach out within a day. Bring your questions, and bring the output.',
  },
}

export const findUs = { title: 'Find the Pit' }
