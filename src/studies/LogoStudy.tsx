import aLockup from '../../design/logo/a-notch-lockup.svg?raw'
import aSymbol from '../../design/logo/a-notch-symbol.svg?raw'
import bLockup from '../../design/logo/b-scrap-s-lockup.svg?raw'
import bSymbol from '../../design/logo/b-scrap-s-symbol.svg?raw'
import cSymbol from '../../design/logo/c-cage-bar-symbol.svg?raw'
import cWordmark from '../../design/logo/c-cage-bar-wordmark.svg?raw'
import { routes } from '../content/site'
import './LogoStudy.css'

type Concept = {
  id: string
  name: string
  idea: string
  lockup: string
  symbol: string
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
    files: ['design/logo/a-notch-symbol.svg', 'design/logo/a-notch-lockup.svg'],
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
    files: ['design/logo/b-scrap-s-symbol.svg', 'design/logo/b-scrap-s-lockup.svg'],
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
    files: ['design/logo/c-cage-bar-wordmark.svg', 'design/logo/c-cage-bar-symbol.svg'],
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

function Svg({ markup, className }: { markup: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: markup }} />
}

export function LogoStudy() {
  return (
    <div className="study">
      <header className="study__head container">
        <span className="eyebrow">Phase 2 · Logo concepts</span>
        <h1>Three directions, editable SVG</h1>
        <p className="lede">
          Each concept ships as SVG under <code>design/logo/</code> with the geometry on an 8-unit grid and the
          wordmark left as live text, so it opens in Figma as editable layers. Bebas Neue is a stand-in for whichever
          display face wins the type study. Judge them on white, on ink, in the header, and at favicon size.
        </p>
      </header>

      <div className="container logo-concepts">
        {concepts.map((c) => (
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
              <div className="board board--light board--sizes">
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--96" />
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--32" />
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--16" />
                <span className="board__note">96 · 32 · 16</span>
              </div>
              <div className="board board--dark board--sizes">
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--96" />
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--32" />
                <Svg markup={c.symbol} className="logo-symbol logo-symbol--16" />
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
          <strong>C (Cage Bar)</strong> if the brief is “expensive”: it is typographic, it scales with the chosen display
          face, and the rail becomes a device the whole site can reuse. Pair it with the <strong>A</strong> notch as the
          favicon/social mark if the SP monogram proves too fussy at 16px. <strong>B</strong> is the most literal and the
          most fun; pick it if the brand should lean harder into “junkyard” than into “championship”.
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
