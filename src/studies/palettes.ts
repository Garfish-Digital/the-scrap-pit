// Color proposals. The brief: keep ghost white and the gradient surfaces,
// make the reds and golds richer, add a small neutral ramp so borders, muted
// text, and dark elevations stop being ad-hoc rgba() values.

export type Swatch = { name: string; hex: string; role: string }

export type Palette = {
  id: 'current' | 'proposed'
  name: string
  summary: string
  swatches: Swatch[]
  vars: Record<string, string>
}

export const palettes: Palette[] = [
  {
    id: 'current',
    name: 'Current (v1 tokens)',
    summary:
      'Four flat colors. Red #E00000 is a pure RGB red that reads neon on ghost white; gold #CC9900 sits close to mustard. Neutrals are improvised with rgba().',
    swatches: [
      { name: 'Ghost White', hex: '#F8F8FF', role: 'Base field' },
      { name: 'Iron Black', hex: '#1A1A1A', role: 'Text, dark surfaces' },
      { name: 'Blood Red', hex: '#E00000', role: 'Accent, CTA' },
      { name: 'Championship Gold', hex: '#CC9900', role: 'Victory, highlight' },
    ],
    vars: {
      '--p-bg': '#F8F8FF',
      '--p-ink': '#1A1A1A',
      '--p-ink-2': '#1A1A1A',
      '--p-muted': 'rgba(26,26,26,0.7)',
      '--p-muted-inv': 'rgba(248,248,255,0.72)',
      '--p-rule': 'rgba(26,26,26,0.15)',
      '--p-rule-inv': 'rgba(248,248,255,0.2)',
      '--p-red': '#E00000',
      '--p-red-deep': '#E00000',
      '--p-red-bright': '#E00000',
      '--p-gold': '#CC9900',
      '--p-gold-deep': '#CC9900',
      '--p-gold-bright': '#CC9900',
      '--p-grad-light': 'linear-gradient(135deg, rgba(26,26,26,0.05) 0%, rgba(224,0,0,0.05) 50%, rgba(204,153,0,0.05) 100%)',
      '--p-grad-dark': 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.8) 50%, rgba(26,26,26,0.95) 100%)',
    },
  },
  {
    id: 'proposed',
    name: 'Proposed',
    summary:
      'Same four ideas, deeper pigment. Red moves from neon to arterial (a classic sports red, with a deep pressed state and a bright cut for dark surfaces). Gold moves from mustard to old gold, with a deep value that passes as text on white and a bright value for dark fields. Ink gets a cool near-black plus a four-step steel ramp for rules, muted text, and elevated dark panels.',
    swatches: [
      { name: 'Ghost White', hex: '#F8F8FF', role: 'Base field (unchanged)' },
      { name: 'Ink', hex: '#121214', role: 'Text, deepest surface' },
      { name: 'Iron', hex: '#1E1E22', role: 'Elevated dark panels' },
      { name: 'Steel 700', hex: '#3A3A40', role: 'Secondary dark, rules on dark' },
      { name: 'Steel 500', hex: '#6E6E76', role: 'Muted text on white' },
      { name: 'Steel 300', hex: '#B4B4BC', role: 'Muted text on dark, disabled' },
      { name: 'Steel 100', hex: '#E4E4EA', role: 'Rules and dividers on white' },
      { name: 'Red 900', hex: '#8E0C1F', role: 'Pressed / hover on white' },
      { name: 'Red 600', hex: '#C8102E', role: 'Primary accent, CTA' },
      { name: 'Red 400', hex: '#E62C43', role: 'Accent on dark surfaces' },
      { name: 'Gold 800', hex: '#8F6F14', role: 'Gold as text on white' },
      { name: 'Gold 500', hex: '#C9A227', role: 'Primary gold, victory button' },
      { name: 'Gold 300', hex: '#E8C55A', role: 'Gold on dark surfaces' },
    ],
    vars: {
      '--p-bg': '#F8F8FF',
      '--p-ink': '#121214',
      '--p-ink-2': '#1E1E22',
      '--p-muted': '#6E6E76',
      '--p-muted-inv': '#B4B4BC',
      '--p-rule': '#E4E4EA',
      '--p-rule-inv': '#3A3A40',
      '--p-red': '#C8102E',
      '--p-red-deep': '#8E0C1F',
      '--p-red-bright': '#E62C43',
      '--p-gold': '#C9A227',
      '--p-gold-deep': '#8F6F14',
      '--p-gold-bright': '#E8C55A',
      '--p-grad-light': 'linear-gradient(135deg, rgba(18,18,20,0.05) 0%, rgba(200,16,46,0.06) 50%, rgba(201,162,39,0.07) 100%)',
      '--p-grad-dark': 'linear-gradient(135deg, #121214 0%, #26262b 50%, #121214 100%)',
    },
  },
]
