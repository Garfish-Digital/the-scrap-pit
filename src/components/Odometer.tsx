import type { CSSProperties } from 'react'
import './Odometer.css'

type Props = {
  value: string
  /** Impressively high numbers roll up to their value; impressively low ones roll down. */
  direction?: 'up' | 'down'
  className?: string
}

// Every digit is a 0–9 strip; useRounds rolls `--odo-y` from the start digit
// to `--odo-final` when the enclosing section enters. Without JS or with
// reduced motion the strip rests on its final digit.
export function Odometer({ value, direction = 'up', className = '' }: Props) {
  return (
    <span className={`odo ${className}`.trim()} data-odometer={direction} aria-label={value}>
      {value.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="odo__digit" aria-hidden="true">
            <span className="odo__strip" style={{ '--odo-final': `${-Number(ch) * 10}%` } as CSSProperties}>
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className="odo__glyph" aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  )
}
