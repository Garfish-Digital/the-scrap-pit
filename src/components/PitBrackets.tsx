import './PitBrackets.css'

// The mark's two brackets at scene scale, framing a media pane from its
// top-left and bottom-right corners. Positioned by the parent (which must be
// position: relative); animated by the hero sequences via .pit-brackets__tl/br.
export function PitBrackets() {
  return (
    <>
      <svg className="pit-brackets__tl" viewBox="0 0 64 64" aria-hidden="true">
        <path fill="var(--red-600)" d="M0 0H60L44 16H16V44L0 60Z" />
      </svg>
      <svg className="pit-brackets__br" viewBox="0 0 64 64" aria-hidden="true">
        <path fill="var(--ghost-white)" d="M64 64H4L20 48H48V20L64 4Z" />
      </svg>
    </>
  )
}
