import { useEffect } from 'react'

/**
 * Lightweight hook for updating per-page SEO meta tags in the React SPA.
 * Updates document title, meta description, and Open Graph / Twitter card tags.
 */
export function useSEO({ title, description }) {
  useEffect(() => {
    if (!title || !description) return

    document.title = title

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) {
        el.setAttribute(attr, value)
      } else if (process.env.NODE_ENV !== 'production') {
        console.warn(`[useSEO] Meta tag not found: ${selector}`)
      }
    }

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      const path = window.location.pathname.replace(/\/$/, '')
      canonical.setAttribute('href', `https://marswebz.com${path}${path ? '' : '/'}`)
    }

    setMeta('meta[name="description"]',         'content', description)
    setMeta('meta[property="og:title"]',         'content', title)
    setMeta('meta[property="og:description"]',   'content', description)
    setMeta('meta[name="twitter:title"]',        'content', title)
    setMeta('meta[name="twitter:description"]',  'content', description)
  }, [title, description])
}
