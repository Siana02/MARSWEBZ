import { useState, useEffect, useRef } from 'react'
import { Network, Eye, Monitor, Cpu, Menu, X } from 'lucide-react'
import './LandingPage.css'

const NAV_ITEMS = ['Services', 'About', 'Contact', 'Privacy Policy', 'Blog']

// Title: ENGINEERING DIGITAL SYSTEMS — "SYSTEMS" uses the web font
const TITLE_TOKENS = [
  { text: 'ENGINEERING', custom: false },
  { text: 'DIGITAL', custom: false },
  { text: 'SYSTEMS', custom: true },
]

// Per-pillar data with highlight colours matching individual service pages
const PILLARS = [
  {
    number: '01',
    title: 'INFORMATION',
    titleAccent: 'SYSTEMS',
    tagline: 'Structure your business for scale.',
    description:
      'We design systems that organize your operations, connect your tools, and eliminate inefficiencies.',
    accentColor: '#7ca4ff',
    accentGlow: 'rgba(124,164,255,0.38)',
    icon: Network,
  },
  {
    number: '02',
    title: 'BRAND',
    titleAccent: 'IDENTITY',
    tagline: 'Be seen. Be remembered.',
    description:
      'We craft brands that communicate clearly, resonate deeply, and stand out in competitive markets.',
    accentColor: '#ffc464',
    accentGlow: 'rgba(255,196,100,0.38)',
    icon: Eye,
  },
  {
    number: '03',
    title: 'DIGITAL',
    titleAccent: 'PRODUCTS',
    tagline: 'Build experiences that convert.',
    description:
      'Websites and applications engineered for performance, usability, and growth.',
    accentColor: '#ff2a7e',
    accentGlow: 'rgba(255,42,126,0.38)',
    icon: Monitor,
  },
  {
    number: '04',
    title: 'AI &',
    titleAccent: 'AUTOMATION',
    tagline: 'Let your business run smarter.',
    description:
      'Intelligent systems that automate workflows, reduce manual work, and scale effortlessly.',
    accentColor: '#b347ea',
    accentGlow: 'rgba(179,71,234,0.38)',
    icon: Cpu,
  },
]

/* ── Unique SVG visual for each pillar ── */
function PillarVisual({ index, accent }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 220 150" className="pillar-visual-svg" aria-hidden="true">
        {/* Outer ring connections */}
        {[[36,30],[184,30],[36,120],[184,120]].map(([cx,cy], i) => (
          <line key={i} x1="110" y1="75" x2={cx} y2={cy}
            stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
        ))}
        {/* Perimeter links */}
        <line x1="36" y1="30" x2="184" y2="30" stroke={accent} strokeWidth="0.7" strokeOpacity="0.18" />
        <line x1="36" y1="120" x2="184" y2="120" stroke={accent} strokeWidth="0.7" strokeOpacity="0.18" />
        <line x1="36" y1="30" x2="36" y2="120" stroke={accent} strokeWidth="0.7" strokeOpacity="0.18" />
        <line x1="184" y1="30" x2="184" y2="120" stroke={accent} strokeWidth="0.7" strokeOpacity="0.18" />
        {/* Hub glow ring */}
        <circle cx="110" cy="75" r="20" fill={accent} fillOpacity="0.06"
          stroke={accent} strokeWidth="1.5" className="sys-hub-ring" />
        <circle cx="110" cy="75" r="7" fill={accent} fillOpacity="0.9" />
        {/* Satellite nodes */}
        {[[36,30],[184,30],[36,120],[184,120]].map(([cx,cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="8" fill={accent} fillOpacity="0.1"
            stroke={accent} strokeWidth="1.2" strokeOpacity="0.6" />
        ))}
        {/* Animated data packets */}
        <circle r="3" fill={accent} fillOpacity="0.95">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M110,75 L36,30" />
        </circle>
        <circle r="3" fill={accent} fillOpacity="0.95">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.6s" path="M110,75 L184,120" />
        </circle>
        <circle r="3" fill={accent} fillOpacity="0.95">
          <animateMotion dur="3.1s" repeatCount="indefinite" begin="1.4s" path="M36,30 L184,30" />
        </circle>
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 220 150" className="pillar-visual-svg" aria-hidden="true">
        {/* Outer diamond */}
        <polygon points="110,8 200,75 110,142 20,75"
          fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.2" />
        {/* Mid diamond — slow counter-rotation */}
        <polygon points="110,26 182,75 110,124 38,75"
          fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4"
          className="brand-ring-1" />
        {/* Inner diamond — slow rotation */}
        <polygon points="110,44 164,75 110,106 56,75"
          fill={accent} fillOpacity="0.06" stroke={accent}
          strokeWidth="1.5" strokeOpacity="0.65" className="brand-ring-2" />
        {/* Core diamond */}
        <polygon points="110,60 132,75 110,90 88,75"
          fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1.5" />
        {/* Corner accent dots */}
        {[[110,26],[182,75],[110,124],[38,75]].map(([cx,cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={accent} fillOpacity="0.75" />
        ))}
        <circle cx="110" cy="75" r="5" fill={accent} />
      </svg>
    )
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 220 150" className="pillar-visual-svg" aria-hidden="true">
        {/* Browser chrome */}
        <rect x="10" y="10" width="200" height="130" rx="10"
          fill="none" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
        <rect x="10" y="10" width="200" height="30" rx="10"
          fill={accent} fillOpacity="0.07" />
        <line x1="10" y1="40" x2="210" y2="40"
          stroke={accent} strokeWidth="0.8" strokeOpacity="0.28" />
        {/* Traffic lights */}
        <circle cx="26" cy="25" r="4.5" fill={accent} fillOpacity="0.5" />
        <circle cx="40" cy="25" r="4.5" fill={accent} fillOpacity="0.35" />
        <circle cx="54" cy="25" r="4.5" fill={accent} fillOpacity="0.2" />
        {/* URL bar */}
        <rect x="70" y="16" width="105" height="18" rx="5"
          fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Headline block */}
        <rect x="20" y="50" width="95" height="10" rx="3"
          fill={accent} fillOpacity="0.25" className="prod-headline" />
        {/* Body lines */}
        <rect x="20" y="66" width="140" height="7" rx="2" fill={accent} fillOpacity="0.13" />
        <rect x="20" y="78" width="120" height="7" rx="2" fill={accent} fillOpacity="0.1" />
        <rect x="20" y="90" width="85" height="7" rx="2" fill={accent} fillOpacity="0.1" />
        {/* CTA pill */}
        <rect x="20" y="106" width="58" height="20" rx="6"
          fill={accent} fillOpacity="0.2" stroke={accent}
          strokeWidth="0.9" strokeOpacity="0.55" className="prod-cta" />
        {/* Right image block */}
        <rect x="148" y="50" width="52" height="62" rx="7"
          fill={accent} fillOpacity="0.08" stroke={accent}
          strokeWidth="0.9" strokeOpacity="0.3" />
      </svg>
    )
  }

  if (index === 3) {
    return (
      <svg viewBox="0 0 220 150" className="pillar-visual-svg" aria-hidden="true">
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10"
            refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={accent} opacity="0.7" />
          </marker>
        </defs>
        {/* Flow nodes */}
        <rect x="6" y="52" width="52" height="46" rx="9"
          fill={accent} fillOpacity="0.1" stroke={accent}
          strokeWidth="1.2" strokeOpacity="0.55" />
        <rect x="84" y="52" width="52" height="46" rx="9"
          fill={accent} fillOpacity="0.1" stroke={accent}
          strokeWidth="1.2" strokeOpacity="0.55" />
        <rect x="162" y="52" width="52" height="46" rx="9"
          fill={accent} fillOpacity="0.1" stroke={accent}
          strokeWidth="1.2" strokeOpacity="0.55" />
        {/* Arrows */}
        <path d="M58 75 L84 75" stroke={accent}
          strokeWidth="1.6" strokeOpacity="0.6" markerEnd="url(#flow-arrow)" />
        <path d="M136 75 L162 75" stroke={accent}
          strokeWidth="1.6" strokeOpacity="0.6" markerEnd="url(#flow-arrow)" />
        {/* Node icons */}
        <circle cx="32" cy="75" r="9" fill={accent} fillOpacity="0.28"
          className="auto-pulse" />
        <rect x="96" y="64" width="28" height="22" rx="4"
          fill={accent} fillOpacity="0.22" className="auto-pulse"
          style={{ animationDelay: '0.4s' }} />
        <circle cx="188" cy="75" r="9" fill={accent} fillOpacity="0.28"
          className="auto-pulse" style={{ animationDelay: '0.8s' }} />
        {/* Sub-flow dashed line */}
        <path d="M84 110 L136 110" stroke={accent}
          strokeWidth="0.9" strokeOpacity="0.28" strokeDasharray="4,3" />
        <path d="M110 98 L110 110" stroke={accent}
          strokeWidth="0.9" strokeOpacity="0.28" strokeDasharray="4,3" />
        {/* Traveling packets */}
        <circle r="4" fill={accent} fillOpacity="0.9">
          <animateMotion dur="1.7s" repeatCount="indefinite" path="M6,75 L84,75" />
        </circle>
        <circle r="4" fill={accent} fillOpacity="0.9">
          <animateMotion dur="1.7s" repeatCount="indefinite" begin="0.85s" path="M84,75 L214,75" />
        </circle>
      </svg>
    )
  }

  return null
}

export default function LandingPage({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const transitionRef = useRef(null)
  const buildsRef = useRef(null)
  const pillarRefs = useRef([])

  // Trigger hero title animation
  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // IntersectionObserver — adds "in-view" to transition line, builds header, pillar wrappers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )
    const targets = [
      transitionRef.current,
      buildsRef.current,
      ...pillarRefs.current.filter(Boolean),
    ]
    targets.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="landing">

      {/* ── SPIDER-WEB BACKGROUND — fade-out mask + rotation + pulse ── */}
      <div className="web-bg" aria-hidden="true">
        <div className="web-bg-rotate">
          <svg className="web-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {[50, 105, 165, 225, 290, 355, 390].map((r) => (
              <circle key={r} cx="400" cy="400" r={r}
                fill="none" stroke="rgba(140,180,255,0.2)" strokeWidth="1.2" />
            ))}
            {Array.from({ length: 15 }, (_, i) => i * 24).map((deg) => {
              const rad = (deg * Math.PI) / 180
              return (
                <line key={deg}
                  x1="400" y1="400"
                  x2={400 + 390 * Math.cos(rad)}
                  y2={400 + 390 * Math.sin(rad)}
                  stroke="rgba(140,180,255,0.15)" strokeWidth="1" />
              )
            })}
            {[105, 165, 225, 290, 355].map((r) =>
              Array.from({ length: 15 }, (_, i) => i * 24).map((deg) => {
                const rad1 = (deg * Math.PI) / 180
                const rad2 = ((deg + 24) * Math.PI) / 180
                return (
                  <line key={`${r}-${deg}`}
                    x1={400 + r * Math.cos(rad1)} y1={400 + r * Math.sin(rad1)}
                    x2={400 + r * Math.cos(rad2)} y2={400 + r * Math.sin(rad2)}
                    stroke="rgba(140,180,255,0.12)" strokeWidth="0.8" />
                )
              })
            )}
          </svg>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-logo">MARS<span className="logo-webz">WEBZ</span></div>

        <nav className="nav-desktop" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className="nav-btn"
              type="button"
              onClick={
                item === 'Blog' && onNavigate ? () => onNavigate('blog') :
                item === 'Services' && onNavigate ? () => onNavigate('explore') : undefined
              }
            >
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <button
          className="hamburger"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className="nav-btn mobile"
              type="button"
              onClick={() => {
                setMenuOpen(false)
                if (item === 'Blog' && onNavigate) onNavigate('blog')
                if (item === 'Services' && onNavigate) onNavigate('explore')
              }}
            >
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <h1 className="main-title" aria-label="Engineering Digital Systems">
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

        <p className={`mini-title${titleVisible ? ' mini-title--visible' : ''}`}>
          Built to scale. Designed to perform.
        </p>

        <div className="cta-wrapper">
          <button
            type="button"
            className="cta-btn"
            onClick={() => onNavigate && onNavigate('explore')}
          >
            <span>Get Started</span>
          </button>
        </div>
      </section>

      {/* ── TRANSITION LINE ── */}
      <section className="transition-section" ref={transitionRef} aria-label="Mission statement">
        <div className="transition-rule" aria-hidden="true" />
        <p className="transition-text">
          We design <span className="transition-text--accent">systems</span> that power modern businesses.
        </p>
        <div className="transition-rule" aria-hidden="true" />
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="builds-section" aria-label="What we build">
        <div className="builds-header" ref={buildsRef}>
          <span className="builds-eyebrow">What We Build</span>
          <h2 className="builds-title">
            Built for clarity,{' '}
            <em>designed for scale.</em>
          </h2>
        </div>

        {/* Desktop: horizontal scroll track / Mobile: stacked slide-up cards */}
        <div className="pillars-track">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.number}
              className="pillar-wrapper"
              ref={(el) => { pillarRefs.current[i] = el }}
              style={{ '--pillar-accent': pillar.accentColor, '--pillar-glow': pillar.accentGlow }}
            >
              <article className="pillar-card">
                {/* Unique visual */}
                <div className="pillar-visual">
                  <PillarVisual index={i} accent={pillar.accentColor} />
                </div>

                {/* Content */}
                <div className="pillar-content">
                  <div className="pillar-top-row">
                    <span className="pillar-number">{pillar.number}</span>
                    <div className="pillar-icon-wrap" aria-hidden="true">
                      <pillar.icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="pillar-title">
                    {pillar.title}{' '}
                    <span className="pillar-title--web">{pillar.titleAccent}</span>
                  </h3>

                  <p className="pillar-tagline">{pillar.tagline}</p>
                  <p className="pillar-desc">{pillar.description}</p>
                </div>

                {/* Bottom accent bar */}
                <div className="pillar-accent-bar" aria-hidden="true" />
              </article>
            </div>
          ))}
        </div>

        {/* Scroll nudge (desktop only) */}
        <div className="pillars-scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M1 5H19M15 1L19 5L15 9"
              stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

    </div>
  )
}
