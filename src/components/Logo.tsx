import { site } from '../content/site'
import './Logo.css'

// Concept D “Pit Frame”: a 64-unit frame with a 32-unit void, torn on the
// rising diagonal into two brackets. The lower bracket is currentColor, so the
// mark flips automatically on dark surfaces (see design/logo/d-split-*.svg).
export function PitMark({ className = '' }: { className?: string }) {
  return (
    <svg className={`pit-mark ${className}`.trim()} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path fill="var(--red-600)" d="M0 0H60L44 16H16V44L0 60Z" />
      <path fill="currentColor" d="M64 64H4L20 48H48V20L64 4Z" />
    </svg>
  )
}

// Horizontal lockup: mark + wordmark set in the display role so it tracks the
// live font rather than an outlined path.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`.trim()}>
      <PitMark />
      <span className="logo__wordmark display">{site.name}</span>
    </span>
  )
}
