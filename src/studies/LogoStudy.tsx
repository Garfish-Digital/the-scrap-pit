import aLockup from '../../design/scrap-pit-design/logo/a-notch-lockup.svg?raw'
import aSymbol from '../../design/scrap-pit-design/logo/a-notch-symbol.svg?raw'
import bLockup from '../../design/scrap-pit-design/logo/b-scrap-s-lockup.svg?raw'
import bSymbol from '../../design/scrap-pit-design/logo/b-scrap-s-symbol.svg?raw'
import cSymbol from '../../design/scrap-pit-design/logo/c-cage-bar-symbol.svg?raw'
import cWordmark from '../../design/scrap-pit-design/logo/c-cage-bar-wordmark.svg?raw'
import dLockup from '../../design/scrap-pit-design/logo/d-split-lockup.svg?raw'
import dSymbol from '../../design/scrap-pit-design/logo/d-split-symbol.svg?raw'
import dSymbolDark from '../../design/scrap-pit-design/logo/d-split-symbol-dark.svg?raw'
import dV1 from '../../design/scrap-pit-design/logo/owner-v1-split.svg?raw'
import dV2 from '../../design/scrap-pit-design/logo/owner-v2-pit-frame.svg?raw'
import { routes } from '../content/site'
import './LogoStudy.css'

type Concept = {
  id: string
  name: string
  idea: string
  lockup: string
  symbol: string
  symbolDark?: string // separate dark-surface variant, when the mark needs one
  variants?: { label: string; markup: string; dark?: boolean }[]
  files: string[]
  construction: string[]
  strengths: string[]
  risks: string[]
}

const concepts: Concept[] = [
  {
    id: 'a',
    name: 'A · The Pit',
    idea:
      'A solid block with a square pit cut into it, a narrow slot for the way in, and an ember burning at the bottom. The gym is the ground you get thrown into; what is left burning is you. The symbol carries the whole idea, so the wordmark can stay plain.',
    lockup: aLockup,
    symbol: aSymbol,
    files: ['design/scrap-pit-design/logo/a-notch-symbol.svg', 'design/scrap-pit-design/logo/a-notch-lockup.svg'],
    construction: [
      '64-unit square. A 28-unit square pit (x 18–46, y 22–50) cut from the block, reached by an 8-unit slot from the top edge. One contour, no overlaps.',
      'Ember: 10-unit square rotated 45°, centred in the pit at (32,36). Red 600.',
      'Lockup: symbol height = wordmark cap height; gap = 20 units (≈ 1/3 symbol).',
      'Reduces to a single-colour cut-out (drop the ember) at 16px.',
    ],
    strengths: ['Owns a shape nobody else in the category uses', 'Reads at favicon size', 'Ember gives the red a job'],
    risks: ['Abstract; needs the wordmark nearby the first few times', 'Slot-and-pit silhouette is close to a keyhole; the ember and the wordmark keep it from reading as “security”'],
  },
  {
    id: 'b',
    name: 'B · Scrap S',
    idea:
      'A stencil-cut S torn along a 45° line, the lower piece in red — a piece of scrap metal that still reads as a letter. Junkyard tough, literally.',
    lockup: bLockup,
    symbol: bSymbol,
    files: ['design/scrap-pit-design/logo/b-scrap-s-symbol.svg', 'design/scrap-pit-design/logo/b-scrap-s-lockup.svg'],
    construction: [
      '8-unit grid, 12-unit stroke, 45° terminals top-right and bottom-left.',
      'Tear: 45° line through the middle bar with a 3-unit gap; lower piece takes Red 600.',
      'Single-colour version: both pieces in ink; the gap still says “scrap”.',
      'Monogram can extend to “SP” by mirroring the construction for a P.',
    ],
    strengths: ['Most literal to the name', 'Strong two-colour favicon', 'Angular terminals match condensed display type'],
    risks: ['Squared S can read as a 5 at very small sizes; test at 16px', 'Two-tone letters date faster than a mark plus wordmark'],
  },
  {
    id: 'c',
    name: 'C · Cage Bar',
    idea:
      'The wordmark is the logo. A red rail slices horizontally through SCRAP PIT at cap-midpoint — the top rail of the cage seen from inside the pit. The monogram “SP” carries the same cut.',
    lockup: cWordmark,
    symbol: cSymbol,
    files: ['design/scrap-pit-design/logo/c-cage-bar-wordmark.svg', 'design/scrap-pit-design/logo/c-cage-bar-symbol.svg'],
    construction: [
      'Type is live text in the SVG; outline it in Figma, boolean-subtract a band at cap midpoint.',
      'Band = ~9% of cap height; rail = band minus 1 unit of light on each side.',
      'Rail runs the full width of the letters’ box (S left edge to T right edge), never shorter, never past it.',
      '“THE” sits above the S in the label face, tracked to the S width.',
    ],
    strengths: ['Typographic; scales with whatever display face the type study picks', 'Rail becomes a reusable graphic device (section dividers, hover states)', 'Most “expensive” of the three'],
    risks: ['Depends on the display face; Bebas here is a stand-in', 'Stencil cut costs legibility below ~24px cap height; the monogram covers small sizes'],
  },
]

const conceptD: Concept = {
  id: 'd',
  name: 'D · Pit Frame (owner’s concept)',
  idea:
    'A square frame with a void at its centre, torn on a rising diagonal into two brackets: red above, ink below. The void is the pit; the brackets are two corners squaring off across it. Shown cleaned up — void and cut are transparent rather than ghost-white fills, so the mark holds on any ground — with the dark-surface variant.',
  lockup: dLockup,
  symbol: dSymbol,
  symbolDark: dSymbolDark,
  variants: [
    { label: 'v1 (design/scrap-pit-design/logo/owner-v1-split.svg)', markup: dV1 },
    { label: 'v2 (design/scrap-pit-design/logo/owner-v2-pit-frame.svg)', markup: dV2 },
    { label: 'Cleaned — light surfaces', markup: dSymbol },
    { label: 'Cleaned — dark surfaces', markup: dSymbolDark, dark: true },
  ],
  files: ['design/scrap-pit-design/logo/d-split-symbol.svg', 'design/scrap-pit-design/logo/d-split-symbol-dark.svg', 'design/scrap-pit-design/logo/d-split-lockup.svg'],
  construction: [
    '64-unit square frame, 16-unit walls, 32-unit void (x,y 16–48). Cut on the rising diagonal (0,64)→(64,0); each bracket steps back 4 units on both axes for a ≈5.7-unit gap (≈9%).',
    'Two closed polygons, no strokes: upper M0 0 H60 L44 16 H16 V44 L0 60 Z; lower M64 64 H4 L20 48 H48 V20 L64 4 Z.',
    'Light surfaces: Red 600 over Ink. Dark surfaces: Red 600 over Ghost White. Void and gap always transparent.',
    'Clear space: one wall width (16 units) on all sides. Below 24px consider widening the gap to 6 units so the tear survives.',
  ],
  strengths: [
    'Says “pit” without a letterform; two brackets facing off is combat-specific',
    'Two colours, transparent centre — sits on photography as well as flat fields',
    'The rising diagonal and the bracket become reusable devices (corner cuts, image frames, section edges)',
  ],
  risks: [
    'Frame-with-void marks exist in tech/finance; the tear and the red/ink split carry the difference',
    'Cut gets thin at 16px; test the favicon at 1× and 2× before finalising the gap',
    'Ship both light and dark files — the mark must never rely on ghost-white fills',
  ],
}

function Svg({ markup, className }: { markup: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: markup }} />
}

export function LogoStudy() {
  const all = [...concepts, conceptD]
  return (
    <div className="study">
      <header className="study__head container">
        <span className="eyebrow">Phase 2 · Logo concepts</span>
        <h1>Three directions, editable SVG</h1>
        <p className="lede">
          Each concept ships as SVG under <code>design/scrap-pit-design/logo/</code> with the geometry on an 8-unit grid and the
          wordmark left as live text, so it opens in Figma as editable layers. Wordmarks are set in Archivo 800 /
          width 62 (Archivo Condensed ExtraBold in Figma), the chosen type system. Judge them on white, on ink, in
          the header, and at favicon size.
        </p>
      </header>

      <div className="container logo-concepts">
        {all.map((c) => (
          <section key={c.id} className="logo-concept" aria-labelledby={`logo-${c.id}`}>
            <div className="logo-concept__intro">
              <h2 id={`logo-${c.id}`}>{c.name}</h2>
              <p>{c.idea}</p>
              <p className="logo-concept__files">
                {c.files.map((f) => (
                  <code key={f}>{f}</code>
                ))}
              </p>
            </div>

            <div className="logo-concept__boards">
              <div className="board board--light">
                <Svg markup={c.lockup} className="logo-lockup" />
              </div>
              <div className="board board--dark">
                <Svg markup={c.lockup} className="logo-lockup" />
              </div>
              {c.variants && (
                <div className="board board--light board--variants">
                  {c.variants.map((v) => (
                    <figure key={v.label} className={`variant ${v.dark ? 'variant--dark' : ''}`}>
                      <Svg markup={v.markup} className="logo-symbol logo-symbol--96" />
                      <figcaption>{v.label}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              <div className="board board--light board--sizes">
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--96" />
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--32" />
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--16" />
                <span className="board__note">96 · 32 · 16</span>
              </div>
              <div className="board board--dark board--sizes">
                <Svg markup={c.symbolDark ?? c.symbol} className="logo-symbol logo-symbol--96" />
                <Svg markup={c.symbolDark ?? c.symbol} className="logo-symbol logo-symbol--32" />
                <Svg markup={c.symbolDark ?? c.symbol} className="logo-symbol logo-symbol--16" />
                <span className="board__note">96 · 32 · 16</span>
              </div>

              {/* Header mockup: the real header proportions with the lockup in place */}
              <div className="board board--header">
                <div className="mock-header">
                  <Svg markup={c.lockup} className="mock-header__brand" />
                  <div className="mock-header__links">
                    {routes.map((r) => (
                      <span key={r.path} className={r.path === '/' ? 'is-active' : ''}>
                        {r.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mock-tab">
                  <Svg markup={c.symbol} className="mock-tab__icon" />
                  <span>The Scrap Pit — Combat Sports Training Gym</span>
                </div>
              </div>
            </div>

            <div className="logo-concept__notes">
              <h3>Construction</h3>
              <ol>
                {c.construction.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
              <h3>Strengths</h3>
              <ul>
                {c.strengths.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h3>Risks</h3>
              <ul>
                {c.risks.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <footer className="study__foot container">
        <h2>Recommendation</h2>
        <p>
          <strong>D (Pit Frame)</strong> is the direction. It names the place without a letterform, the two brackets
          read as opponents, and it stays quiet enough to let Archivo and the photography carry the personality. The
          rising diagonal and the bracket corner become the site’s reusable devices. <strong>C</strong> is retired: a
          typographic signature competes with the vision rather than serving it. <strong>A</strong> and <strong>B</strong>{' '}
          stay on record as the more illustrative explorations.
        </p>
        <p>
          Whichever direction wins, the next step is yours in Figma: outline the type in the chosen face, set the
          clear-space rule (suggest 1× symbol height), and export the header, favicon (SVG + 32px PNG), and 1200×630 OG
          versions. I will wire them in and retire the placeholder wordmark.
        </p>
      </footer>
    </div>
  )
}
