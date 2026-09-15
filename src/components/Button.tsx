import { useRef, type ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router'
import { useImpact } from '../motion/useImpact'
import './Button.css'

type Variant = 'primary' | 'accent' | 'victory' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Common = {
  variant?: Variant
  size?: Size
  className?: string
}

type LinkProps = Common & { to: string } & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className'>
type ButtonProps = Common & { to?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'className'>

export type Props = LinkProps | ButtonProps

// Renders a router <Link> when `to` is given, otherwise a native <button>.
// Carries the Impact motion language (see src/motion/useImpact.ts): the inner
// layers are the hover slam, the press flash, and the shockwave ring.
export function Button(props: Props) {
  const ref = useRef<HTMLElement>(null)
  useImpact(ref)
  const classes = `btn btn--${props.variant ?? 'primary'} btn--${props.size ?? 'md'} ${props.className ?? ''}`.trim()
  const inner = (
    <>
      <span className="btn__white" aria-hidden="true" />
      <span className="btn__flash" aria-hidden="true" />
      <span className="btn__ring" aria-hidden="true" />
      <span className="btn__label">{props.children}</span>
    </>
  )

  if (props.to !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    return (
      <Link ref={ref as React.RefObject<HTMLAnchorElement>} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, to: _t, children: _ch, ...rest } = props
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} className={classes} {...rest}>
      {inner}
    </button>
  )
}
