// About page content — copy carried over from v1 index.astro.

export const mission = {
  title: 'Hard like iron',
  subtitle: 'Our philosophy',
  body:
    "We don't just train fighters. We build warriors who emerge stronger than before.",
}

export const story = {
  title: 'Our Story',
  paragraphs: [
    'The Scrap Pit was born from a simple belief: authentic strength comes from authentic struggle. Founded in 2018 by former professional fighters who understood that training had become entertainment.',
    "In an era of hyper-sensitivity and safe spaces, The Scrap Pit stands as a place of uncompromising training.",
    "Every piece of equipment, every training method, every philosophy we embrace serves one purpose: to strip away everything and reveal what you're truly made of.",
  ],
}

export const numbers = {
  title: 'By the Numbers',
  stats: [
    { value: '2,500+', label: 'Fighters trained' },
    { value: '150+', label: 'Fight victories' },
    { value: '50,000+', label: 'Hours of training' },
    { value: '100%', label: 'Commitment required' },
  ],
}

export const code = {
  title: 'Our Code',
  values: [
    {
      title: 'No Participation Trophies',
      body:
        'Results are earned, not given. We measure success in sweat, determination, and the willingness to get back up after being knocked down.',
    },
    {
      title: 'Strength Through Struggle',
      body:
        'Comfort is the enemy of growth. We embrace discomfort as the price of transformation and the pathway to unbreakable mental toughness.',
    },
    {
      title: 'Brotherhood Through Battle',
      body:
        'The bonds forged in training are stronger than blood. When you suffer together, sweat together, and push each other to new limits, you become family.',
    },
    {
      title: 'Authenticity Over Everything',
      body:
        'No fake motivational quotes. No instagram filters. Just raw, honest training that disregards convenience and ensures a champion mentality.',
    },
  ],
}

export const readyCta = {
  title: 'Ready for the Pit?',
  body: "The door is open. What you do with it is yours.",
  primary: { label: 'Start Your Trial', to: '/contact' },
  secondary: { label: 'View Pricing', to: '/training#pricing' },
}
