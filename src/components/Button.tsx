import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router'
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
// Everything on this site routes internally, so there is no external-href path.
export function Button(props: Props) {
  const classes = `btn btn--${props.variant ?? 'primary'} btn--${props.size ?? 'md'} ${props.className ?? ''}`.trim()

  if (props.to !== undefined) {
    const { variant: _v, size: _s, className: _c, ...rest } = props
    return <Link className={classes} {...rest} />
  }

  const { variant: _v, size: _s, className: _c, to: _t, ...rest } = props
  return <button className={classes} {...rest} />
}
