import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '../content/site'

type Props = {
  title?: string
  description?: string
  image?: string
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// Per-route document metadata. React 19 can hoist <title>/<meta> from
// components, but updating in an effect keeps the base tags in index.html as
// the crawlable defaults and avoids duplicates during route changes.
export function PageMeta({ title, description = site.description, image = site.ogImage }: Props) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — Combat Sports Training Gym`
    const url = `${site.url}${pathname}`
    const absImage = image.startsWith('http') ? image : `${site.url}${image}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:image"]', 'property', 'og:image', absImage)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absImage)
  }, [title, description, image, pathname])

  return null
}
