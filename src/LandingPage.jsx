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
          {[60, 130, 200, 270, 340].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="rgba(140,180,255,0.07)" strokeWidth="1" />
          ))}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1="400"
                y1="400"
                x2={400 + 340 * Math.cos(rad)}
                y2={400 + 340 * Math.sin(rad)}
                stroke="rgba(140,180,255,0.07)"
                strokeWidth="1"
              />
            )
          })}
        </svg>
      </div>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-logo">MARSWEBZ</div>

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
