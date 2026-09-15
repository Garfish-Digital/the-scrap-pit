import type { CSSProperties } from 'react'
import './SlipImage.css'

type Props = {
  src: string
  alt: string
  ratio?: string // CSS aspect-ratio, e.g. '4 / 3'
  loading?: 'eager' | 'lazy'
  className?: string
}

// Cut & Slip (design/MOTION.md, owner decisions #5). The image is split on the
// rising diagonal into two halves. useSlips drives them: hover/focus on pointer
// devices, ScrollTrigger on touch. At rest the halves sit 1.5px off the cut and
// the image is mono; open, they slip 8px apart and colour snaps in.
export function SlipImage({ src, alt, ratio = '4 / 3', loading = 'lazy', className = '' }: Props) {
  return (
    <span className={`slip ${className}`.trim()} style={{ aspectRatio: ratio } as CSSProperties} data-slip>
      <span className="slip__half slip__half--upper">
        <img src={src} alt={alt} loading={loading} />
      </span>
      <span className="slip__half slip__half--lower" aria-hidden="true">
        <img src={src} alt="" loading={loading} />
      </span>
    </span>
  )
}
