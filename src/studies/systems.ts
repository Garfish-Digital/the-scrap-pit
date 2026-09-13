// Type systems under test. Each maps the four roles from PLAN.md (display,
// body, label, numerals) to a face + settings. Values become CSS custom
// properties on the specimen root, so the same markup renders every system.

export type Role = {
  family: string
  weight: number
  stretch?: string // font-stretch, for variable width axes
  tracking?: string
  transform?: 'uppercase' | 'none'
  features?: string // font-feature-settings
  lineHeight?: number
}

export type TypeSystem = {
  id: 'a' | 'b' | 'c'
  name: string
  thesis: string
  display: Role
  body: Role
  label: Role
  num: Role
  quote: Role
  roles: { role: string; face: string }[]
  strengths: string[]
  risks: string[]
  fonts: string // Google Fonts families param (study only; winner gets self-hosted)
}

export const systems: TypeSystem[] = [
  {
    id: 'a',
    name: 'A · Baseline, tuned',
    thesis:
      'Keep Bebas Neue and Space Mono, but fix the hierarchy: one scale, one label treatment, mono only where it earns its keep. Shows how far discipline alone gets us.',
    display: { family: "'Bebas Neue'", weight: 400, tracking: '0.02em', transform: 'uppercase', lineHeight: 0.9 },
    body: { family: "'Space Mono'", weight: 400, lineHeight: 1.6 },
    label: { family: "'Space Mono'", weight: 700, tracking: '0.12em', transform: 'uppercase' },
    num: { family: "'Bebas Neue'", weight: 400, tracking: '0.01em' },
    quote: { family: "'Bebas Neue'", weight: 400, lineHeight: 1.05 },
    roles: [
      { role: 'Display', face: 'Bebas Neue 400' },
      { role: 'Body', face: 'Space Mono 400' },
      { role: 'Labels / nav / CTA', face: 'Space Mono 700, tracked caps' },
      { role: 'Numerals', face: 'Bebas Neue 400' },
    ],
    strengths: ['Zero new assets', 'Strong caps voice already in the brand', 'Mono keeps the “technical, raw” note'],
    risks: [
      'Bebas Neue is the most-used condensed face on the web; hard to look expensive with it',
      'Space Mono at paragraph length is tiring; wide mono glyphs make measure short on phones',
      'No true bold or italic for emphasis in body copy',
    ],
    fonts: 'Bebas+Neue&family=Space+Mono:wght@400;700',
  },
  {
    id: 'b',
    name: 'B · Archivo (one family, many widths)',
    thesis:
      'A single variable grotesk with a width axis. Condensed black caps for the loudest statements, normal width for reading, semi-expanded bold for numerals. Everything shares one skeleton, which is what makes a system feel designed rather than assembled.',
    display: { family: "'Archivo'", weight: 800, stretch: '62%', tracking: '0', transform: 'uppercase', lineHeight: 0.92 },
    body: { family: "'Archivo'", weight: 400, stretch: '100%', lineHeight: 1.6 },
    label: { family: "'Archivo'", weight: 600, stretch: '100%', tracking: '0.1em', transform: 'uppercase' },
    num: { family: "'Archivo'", weight: 700, stretch: '112%', tracking: '-0.02em', features: "'tnum'" },
    quote: { family: "'Archivo'", weight: 500, stretch: '88%', lineHeight: 1.2 },
    roles: [
      { role: 'Display', face: 'Archivo 800, width 62' },
      { role: 'Body', face: 'Archivo 400, width 100' },
      { role: 'Labels / nav / CTA', face: 'Archivo 600, width 100, tracked caps' },
      { role: 'Numerals', face: 'Archivo 700, width 112, tabular' },
      { role: 'Quotes', face: 'Archivo 500, width 88, sentence case' },
    ],
    strengths: [
      'One file, one skeleton; width axis gives sport-poster condensed and calm text without a second face',
      'Real bold and italic for emphasis; tabular figures for pricing',
      'Reads current without reading trendy; not associated with a template look',
    ],
    risks: [
      'Loses the mono “raw” texture entirely; brand may feel cleaner than “junkyard tough”',
      'Variable font is ~150 KB per style axis set; subset carefully',
      'Condensed 62% caps at hero size need tracking checked per size',
    ],
    fonts: 'Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900',
  },
  {
    id: 'c',
    name: 'C · Big Shoulders + IBM Plex',
    thesis:
      'A distinctive industrial display face for headlines only, a humanist reading face for paragraphs, and Plex Mono for the small technical layer (eyebrows, details, numerals). Keeps a whisper of v1’s mono DNA where it looks intentional.',
    display: { family: "'Big Shoulders'", weight: 800, tracking: '0.01em', transform: 'uppercase', lineHeight: 0.9 },
    body: { family: "'IBM Plex Sans'", weight: 400, lineHeight: 1.6 },
    label: { family: "'IBM Plex Mono'", weight: 500, tracking: '0.1em', transform: 'uppercase' },
    num: { family: "'Big Shoulders'", weight: 700, tracking: '0' },
    quote: { family: "'IBM Plex Sans'", weight: 500, lineHeight: 1.25 },
    roles: [
      { role: 'Display', face: 'Big Shoulders 800 (optical size auto)' },
      { role: 'Body', face: 'IBM Plex Sans 400' },
      { role: 'Labels / nav / CTA', face: 'IBM Plex Mono 500, tracked caps' },
      { role: 'Numerals', face: 'Big Shoulders 700' },
      { role: 'Quotes', face: 'IBM Plex Sans 500 (italic available)' },
    ],
    strengths: [
      'Big Shoulders is condensed, industrial, and rarely seen on gym sites; strongest personality of the three',
      'Plex Sans/Mono are a matched pair, so the mono layer feels designed rather than leftover',
      'Clear three-voice hierarchy: loud, read, technical',
    ],
    risks: [
      'Three families to subset and manage',
      'Big Shoulders has quirky glyphs (R, S) at small sizes; keep it above ~28px',
      'Plex Sans is a well-known corporate face; body copy may feel neutral',
    ],
    fonts: 'Big+Shoulders:opsz,wght@10..72,100..900&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Mono:wght@400;500;600',
  },
]

export function roleVars(prefix: string, r: Role): Record<string, string> {
  return {
    [`--${prefix}-family`]: r.family,
    [`--${prefix}-weight`]: String(r.weight),
    [`--${prefix}-stretch`]: r.stretch ?? 'normal',
    [`--${prefix}-tracking`]: r.tracking ?? '0',
    [`--${prefix}-transform`]: r.transform ?? 'none',
    [`--${prefix}-features`]: r.features ?? 'normal',
    [`--${prefix}-lh`]: String(r.lineHeight ?? 1.2),
  }
}

export function systemVars(s: TypeSystem): Record<string, string> {
  return {
    ...roleVars('sd', s.display),
    ...roleVars('sb', s.body),
    ...roleVars('sl', s.label),
    ...roleVars('sn', s.num),
    ...roleVars('sq', s.quote),
  }
}
