// Site-wide brand and business details.
// Business details are fictional demo content; see PLAN.md "Consistency sweep".

export const site = {
  name: 'The Scrap Pit',
  tagline: 'Forget potential - bring the output',
  description:
    'Forged in Fire. Tested in Battle. Raw, uncompromising combat sports training for fighters who refuse to settle.',
  footerLine: 'Fighter training - junkyard tough',
  url: 'https://the-scrap-pit.netlify.app',
  ogImage: '/og-image.jpg',
  founded: 2018,
  address: {
    street: '240 Industrial Blvd',
    city: 'Athens',
    state: 'GA',
    zip: '30601',
  },
  phoneDisplay: '(555) 321-SCRAP',
  phoneHref: 'tel:+15551234567', // v1 value; reconcile with the vanity number in Phase 5
  email: 'info@thescrappit.com',
  hours: [
    { days: 'Mon-Fri', time: '5:00 AM - 10:00 PM' },
    { days: 'Saturday', time: '6:00 AM - 8:00 PM' },
    { days: 'Sunday', time: '8:00 AM - 6:00 PM' },
  ],
}

export const routes = [
  { path: '/', label: 'Home', end: true },
  { path: '/training', label: 'Training' },
  { path: '/fighters', label: 'Fighters' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
] as const
