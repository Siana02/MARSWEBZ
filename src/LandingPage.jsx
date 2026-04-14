import { useState, useEffect, useRef } from 'react'
import { Globe, Search, ShoppingCart, Menu, X } from 'lucide-react'
import './LandingPage.css'

const NAV_ITEMS = ['Services', 'About', 'Contact', 'Privacy Policy', 'UI/UX']

const CARDS = [
  {
    icon: Globe,
    title: 'WEB DESIGN',
    description:
      'We craft visually stunning, pixel-perfect websites tailored to your brand — blending creativity with cutting-edge technology.',
  },
  {
    icon: Search,
    title: 'SEO OPTIMIZATION',
    description:
      'Boost your visibility and climb the search rankings with our data-driven SEO strategies that drive real, lasting traffic.',
  },
  {
    icon: ShoppingCart,
    title: 'E-COMMERCE',
    description:
      'From storefront to checkout, we build seamless e-commerce experiences that convert visitors into loyal customers.',
  },
]

// Split "CRAFTING BRILLIANT WEB DESIGNS" into animated word tokens
const TITLE_TOKENS = [
  { text: 'CRAFTING', custom: false },
  { text: 'BRILLIANT', custom: false },
  { text: 'WEB', custom: true },
  { text: 'DESIGNS', custom: false },
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [isCtaClicked, setIsCtaClicked] = useState(false)
  const cardsRef = useRef(null)

  // Trigger title word animation shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Intersection observer for cards slide-in
  useEffect(() => {
    const node = cardsRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('cards-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="landing">
      {/* Spider-web background decoration */}
      <div className="web-bg" aria-hidden="true">
        <svg className="web-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          {/* Concentric rings */}
          {[45, 95, 150, 205, 265, 325, 385].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="rgba(140,180,255,0.18)" strokeWidth="1.2" />
          ))}
          {/* Radial spokes */}
          {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1="400"
                y1="400"
                x2={400 + 385 * Math.cos(rad)}
                y2={400 + 385 * Math.sin(rad)}
                stroke="rgba(140,180,255,0.15)"
                strokeWidth="1"
              />
            )
          })}
          {/* Cross-thread connectors between rings for a true web look */}
          {[95, 150, 205, 265, 325].map((r) =>
            [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => {
              const rad1 = (deg * Math.PI) / 180
              const rad2 = ((deg + 24) * Math.PI) / 180
              return (
                <line
                  key={`${r}-${deg}`}
                  x1={400 + r * Math.cos(rad1)}
                  y1={400 + r * Math.sin(rad1)}
                  x2={400 + r * Math.cos(rad2)}
                  y2={400 + r * Math.sin(rad2)}
                  stroke="rgba(140,180,255,0.12)"
                  strokeWidth="0.8"
                />
              )
            })
          )}
        </svg>
      </div>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-logo">MARS<span className="logo-webz">WEBZ</span></div>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className="nav-btn" type="button">
              <span>{item}</span>
            </button>
          ))}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile nav drawer */}
        <nav className={`nav-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className="nav-btn mobile"
              type="button"
              onClick={() => setMenuOpen(false)}
            >
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        {/* Main animated title */}
        <h1 className="main-title" aria-label="Crafting Brilliant Web Designs">
          {TITLE_TOKENS.map((token, i) => (
            <span
              key={token.text}
              className={`title-word${token.custom ? ' title-word--web' : ''}${titleVisible ? ' title-word--visible' : ''}`}
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              {token.text}
            </span>
          ))}
        </h1>

        {/* Mini title */}
        <p className={`mini-title${titleVisible ? ' mini-title--visible' : ''}`}>
          Your Vision, Our Expertise
        </p>

        {/* CTA */}
        <button
          type="button"
          className={`cta-btn${isCtaClicked ? ' cta-btn--active' : ''}`}
          onClick={() => setIsCtaClicked((a) => !a)}
        >
          <span>Get Started</span>
        </button>
      </section>

      {/* ── CARDS ── */}
      <section className="cards-section" ref={cardsRef} aria-label="Our services">
        {CARDS.map(({ icon: Icon, title, description }, i) => (
          <article
            key={title}
            className="card"
            style={{ animationDelay: `${i * 0.18}s` }}
          >
            <div className="card-icon-wrap" aria-hidden="true">
              <Icon size={38} strokeWidth={1.4} />
            </div>
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <p className="card-desc">{description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
