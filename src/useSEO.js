import { useEffect } from 'react'

/**
 * Keeps client-side navigation metadata aligned with the route-specific HTML
 * generated at build time by scripts/prerender-routes.js.
 */
export function useSEO({ title, description }) {
  useEffect(() => {
    if (!title || !description) return

    const path = window.location.pathname.replace(/\/+$/, '')
    const canonicalUrl = `https://marswebz.com${path || '/'}`

    document.title = title

    const setMeta = (selector, attr, value) => {
      const element = document.querySelector(selector)
      if (element) element.setAttribute(attr, value)
    }

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', canonicalUrl)

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description])
}
