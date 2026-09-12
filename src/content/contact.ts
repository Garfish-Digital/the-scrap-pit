// Contact page content — copy carried over from v1 index.astro.

export const contactHero = {
  title: 'Contact the Pit',
  subtitle: 'Ready to start your journey?',
  body: "Step into our octagon. Tell us where you are. We'll tell you what comes next.",
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
  demoNote: 'Demo form: nothing is sent. Submitting shows a local confirmation only.',
  // NEW COPY (Phase 3) — on-page confirmation for the demo-only form.
  confirmation: {
    title: 'Message received (locally)',
    body:
      'This is a demo site, so your message was not sent anywhere. In a live build it would land in the gym inbox and someone would call you back within a day.',
  },
}

export const findUs = { title: 'Find the Pit' }
