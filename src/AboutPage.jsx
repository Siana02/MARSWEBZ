import { useEffect, useRef, useState } from 'react'
import { Menu, X, Layers, Target, Zap, Users, Globe, Heart } from 'lucide-react'
import Footer from './Footer'
import './AboutPage.css'

const NAV_ITEMS = ['Services', 'Featured', 'Blog', 'About', 'Contact', 'Privacy Policy']

const VALUES = [
  {
    icon: Layers,
    title: 'Systems Thinking',
    body: 'We don\'t build in pieces. Every component — brand, product, automation — is designed to work as one cohesive system that compounds your competitive advantage over time.',
    accent: '#7ca4ff',
    glow: 'rgba(124,164,255,0.35)',
  },
  {
    icon: Target,
    title: 'Purposeful Precision',
    body: 'Guesswork has no place here. Every decision is grounded in research, strategy, and a clear understanding of what your business actually needs — not what looks impressive in a proposal.',
    accent: '#ffc464',
    glow: 'rgba(255,196,100,0.35)',
  },
  {
    icon: Zap,
    title: 'Built to Last',
    body: 'Trends fade. We build infrastructure — scalable systems, resilient brands, and intelligent automation that remain relevant and powerful as your business evolves and markets shift.',
    accent: '#ff2a7e',
    glow: 'rgba(255,42,126,0.35)',
  },
  {
    icon: Globe,
    title: 'Global Ambition',
    body: 'We design for the world stage. From day one, your systems are built to operate across borders, scale without friction, and compete at the highest level — regardless of where you start.',
    accent: '#b347ea',
    glow: 'rgba(179,71,234,0.35)',
  },
  {
    icon: Users,
    title: 'Long-Term Partnership',
    body: 'We\'re not here to hand over a file and disappear. The businesses we work with become long-term partners — because real growth is an ongoing journey, not a single project.',
    accent: '#38bdf8',
    glow: 'rgba(56,189,248,0.35)',
  },
  {
    icon: Heart,
    title: 'Responsibility Beyond Revenue',
    body: 'We believe the most powerful companies are the ones that operate with conscience. Building for the future means caring about the world it unfolds in — and acting accordingly.',
    accent: '#4ade80',
    glow: 'rgba(74,222,128,0.35)',
  },
]

const MILESTONES = [
  {
    year: '2022',
    title: 'The Idea Takes Shape',
    body: 'Born from frustration with agencies that prioritised deliverables over outcomes, MARSWEBZ was conceived as something different — a studio that treats every business like a living system.',
    accent: '#7ca4ff',
  },
  {
    year: '2023',
    title: 'First Systems Built',
    body: 'We delivered our first integrated digital ecosystems — combining brand identity, web platforms, and automation workflows into single, unified systems that grew with our clients.',
    accent: '#ffc464',
  },
  {
    year: '2024',
    title: 'The Standard Elevates',
    body: 'AI-driven automation became central to our offering. We began building intelligent workflows that reduced operational overhead for clients by up to 60%, freeing them to focus on what matters.',
    accent: '#ff2a7e',
  },
  {
    year: '2025',
    title: 'Building Toward the Future',
    body: 'Today, we\'re expanding our capacity, refining our process, and deepening our commitment — to our clients, to the quality of our work, and to the world we\'re all building together.',
    accent: '#b347ea',
  },
]

export default function AboutPage({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef       = useRef(null)
  const missionRef    = useRef(null)
  const thinkRef      = useRef(null)
  const valuesRef     = useRef(null)
  const valueRefs     = useRef([])
  const timelineRef   = useRef(null)
  const milestoneRefs = useRef([])
  const closingRef    = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    const targets = [
      heroRef.current,
      missionRef.current,
      thinkRef.current,
      valuesRef.current,
      ...valueRefs.current.filter(Boolean),
      timelineRef.current,
      ...milestoneRefs.current.filter(Boolean),
      closingRef.current,
    ]
    targets.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-page">

      {/* ── SPIDER-WEB BG ── */}
      <div className="about-web-bg" aria-hidden="true">
        <div className="about-web-rotate">
          <svg className="about-web-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {[50,105,165,225,290,355,390].map((r) => (
              <circle key={r} cx="400" cy="400" r={r}
                fill="none" stroke="rgba(140,180,255,0.18)" strokeWidth="1.1" />
            ))}
            {Array.from({length:15},(_,i)=>i*24).map((deg) => {
              const rad=(deg*Math.PI)/180
              return <line key={deg} x1="400" y1="400"
                x2={400+390*Math.cos(rad)} y2={400+390*Math.sin(rad)}
                stroke="rgba(140,180,255,0.13)" strokeWidth="1" />
            })}
          </svg>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="about-header">
        <div className="about-header-logo" onClick={() => onNavigate && onNavigate('home')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('home')} aria-label="Go to home page">
          MARS<span className="about-logo-webz">WEBZ</span>
        </div>

        <nav className="about-nav-desktop" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className={`about-nav-btn${item === 'About' ? ' active' : ''}`} type="button"
              onClick={
                item === 'Blog'           && onNavigate ? () => onNavigate('blog')     :
                item === 'Services'       && onNavigate ? () => onNavigate('explore')  :
                item === 'Featured'       && onNavigate ? () => onNavigate('projects') :
                item === 'About'          && onNavigate ? () => onNavigate('about')    :
                item === 'Contact'        && onNavigate ? () => onNavigate('home')     :
                item === 'Privacy Policy' && onNavigate ? () => onNavigate('privacy')  : undefined
              }>
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <button className="about-hamburger" type="button" aria-label="Toggle menu"
          aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`about-nav-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className="about-nav-btn mobile" type="button"
              onClick={() => {
                setMenuOpen(false)
                if (item === 'Blog'           && onNavigate) onNavigate('blog')
                if (item === 'Services'       && onNavigate) onNavigate('explore')
                if (item === 'Featured'       && onNavigate) onNavigate('projects')
                if (item === 'About'          && onNavigate) onNavigate('about')
                if (item === 'Contact'        && onNavigate) onNavigate('home')
                if (item === 'Privacy Policy' && onNavigate) onNavigate('privacy')
              }}>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ══════════════════════════════
          HERO
         ══════════════════════════════ */}
      <section className="about-hero" ref={heroRef}>
        <div className="about-hero-inner">
          <span className="about-hero-eyebrow">ABOUT MARSWEBZ</span>
          <h1 className="about-hero-title">
            Built With{' '}
            <span className="about-hero-title--web">Intention</span>
          </h1>
          <p className="about-hero-subtitle">
            We&apos;re a digital systems studio on a mission to build businesses that don&apos;t just survive the modern landscape — they dominate it.
          </p>
        </div>
        <div className="about-hero-orb about-hero-orb--blue"   aria-hidden="true" />
        <div className="about-hero-orb about-hero-orb--violet" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════
          MISSION / WHO WE ARE
         ══════════════════════════════ */}
      <section className="about-mission" aria-label="Our mission">
        <div className="about-mission-inner" ref={missionRef}>

          <div className="about-mission-text">
            <span className="about-section-eyebrow">OUR MISSION</span>
            <h2 className="about-section-title">
              More Than an{' '}
              <span className="about-title--accent">Agency</span>
            </h2>
            <p className="about-body-text">
              MARSWEBZ was built on a simple but radical belief: every ambitious business — regardless of its size or starting point — deserves the systems, presence, and intelligence to compete and win on the global digital stage.
            </p>
            <p className="about-body-text">
              We&apos;re not a design shop. We&apos;re not a development house. We&apos;re a digital systems studio — a team of strategists, designers, engineers, and thinkers who approach every project as a system, not a collection of tasks.
            </p>
            <p className="about-body-text">
              When you work with MARSWEBZ, you&apos;re not just getting a website or a logo. You&apos;re getting a carefully engineered ecosystem — brand, product, and automation — working together as one.
            </p>
          </div>

          <div className="about-mission-stats">
            {[
              { num: '100%', label: 'Systems-first approach' },
              { num: '4',    label: 'Disciplines under one roof' },
              { num: '∞',    label: 'Scalability built in' },
            ].map((stat) => (
              <div key={stat.label} className="about-stat-card">
                <span className="about-stat-num">{stat.num}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
        <div className="about-mission-orb" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════
          HOW WE THINK
         ══════════════════════════════ */}
      <section className="about-think" aria-label="How we think">
        <div className="about-think-inner">
          <div className="about-think-header" ref={thinkRef}>
            <span className="about-section-eyebrow">HOW WE THINK</span>
            <h2 className="about-section-title">
              Strategy Before{' '}
              <span className="about-title--accent-pink">Execution</span>
            </h2>
          </div>
          <div className="about-think-content">
            <p className="about-body-text about-body-text--large">
              Most agencies start with tools. We start with questions.
            </p>
            <p className="about-body-text">
              Before any design is touched or a line of code is written, we spend real time understanding your business — where it is, where it needs to go, and what&apos;s actually holding it back. We map your competitive landscape, study your audience, and identify the gaps that exist between where you are and where you could be.
            </p>
            <p className="about-body-text">
              Then we build a system that closes those gaps — systematically, deliberately, and with long-term scalability in mind from the very first decision.
            </p>
            <p className="about-body-text">
              This isn&apos;t a slower process. It&apos;s a smarter one — because every hour invested in strategy saves ten hours of rebuilding later. The businesses that come to us and commit to this process don&apos;t just get better results — they get results that compound over time.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          OUR VALUES
         ══════════════════════════════ */}
      <section className="about-values" aria-label="Our values">
        <div className="about-values-inner">
          <div className="about-values-header" ref={valuesRef}>
            <span className="about-section-eyebrow">WHAT WE STAND FOR</span>
            <h2 className="about-section-title">
              The Principles That{' '}
              <span className="about-title--accent">Guide Us</span>
            </h2>
            <p className="about-section-subtitle">
              These aren&apos;t company values written for a pitch deck. They&apos;re the beliefs that shape every decision we make — for our business and yours.
            </p>
          </div>

          <div className="about-values-grid">
            {VALUES.map((val, i) => {
              const Icon = val.icon
              return (
                <div
                  key={val.title}
                  className="about-value-card"
                  ref={(el) => { valueRefs.current[i] = el }}
                  style={{ '--val-accent': val.accent, '--val-glow': val.glow, transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="about-value-icon-wrap" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="about-value-title">{val.title}</h3>
                  <p className="about-value-body">{val.body}</p>
                  <div className="about-value-accent-bar" aria-hidden="true" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="about-values-orb about-values-orb--blue"   aria-hidden="true" />
        <div className="about-values-orb about-values-orb--violet" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════
          TIMELINE / STORY
         ══════════════════════════════ */}
      <section className="about-timeline" aria-label="Our journey">
        <div className="about-timeline-inner">

          <div className="about-timeline-header" ref={timelineRef}>
            <span className="about-section-eyebrow">OUR JOURNEY</span>
            <h2 className="about-section-title">
              The Story So{' '}
              <span className="about-title--accent-amber">Far</span>
            </h2>
            <p className="about-section-subtitle">
              Every great system has an origin. Ours started with a question: why do so many businesses invest heavily in digital and still feel stuck?
            </p>
          </div>

          <div className="about-timeline-track">
            {/* Vertical connector line */}
            <div className="about-timeline-line" aria-hidden="true" />

            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`about-milestone${i % 2 === 1 ? ' about-milestone--right' : ''}`}
                ref={(el) => { milestoneRefs.current[i] = el }}
                style={{ '--ms-accent': m.accent, transitionDelay: `${i * 0.12}s` }}
              >
                <div className="about-milestone-node" aria-hidden="true">
                  <div className="about-milestone-node-ring" />
                  <div className="about-milestone-node-dot" />
                </div>
                <div className="about-milestone-card">
                  <span className="about-milestone-year">{m.year}</span>
                  <h3 className="about-milestone-title">{m.title}</h3>
                  <p className="about-milestone-body">{m.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="about-timeline-orb" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════
          BEYOND BUSINESS (CSR CALLOUT)
         ══════════════════════════════ */}
      <section className="about-csr" aria-label="Our environmental commitment">
        <div className="about-csr-inner" ref={closingRef}>
          <div className="about-csr-icon-wrap" aria-hidden="true">
            <Heart size={28} strokeWidth={1.5} />
          </div>
          <span className="about-section-eyebrow">BEYOND BUSINESS</span>
          <h2 className="about-csr-title">
            Responsible by{' '}
            <span className="about-csr-title--web">Design</span>
          </h2>
          <p className="about-csr-body">
            Building digital systems is what we do. But we believe the businesses of tomorrow have a responsibility that goes beyond their bottom line.
          </p>
          <p className="about-csr-body">
            We&apos;re committed to supporting environmental initiatives — with a particular focus on ocean conservation. Our oceans regulate the planet&apos;s climate, sustain half of all life, and represent a future we all share. Protecting them isn&apos;t a side project. It&apos;s part of who we are.
          </p>
          <p className="about-csr-body">
            A portion of every project we complete goes toward supporting verified ocean conservation and environmental organisations. When you build with MARSWEBZ, you&apos;re building with a team that believes the future of business and the future of the planet are inseparable.
          </p>
          <a
            href="https://www.ocean.org/donate/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-csr-btn"
          >
            <span>Support the Cause</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="about-csr-orb about-csr-orb--teal"  aria-hidden="true" />
        <div className="about-csr-orb about-csr-orb--blue"  aria-hidden="true" />
      </section>

      {/* ══════════════════════════════
          FINAL CTA
         ══════════════════════════════ */}
      <section className="about-cta" aria-label="Get started">
        <div className="about-cta-inner">
          <h2 className="about-cta-title">
            Ready to Build{' '}
            <span className="about-cta-title--web">With Us?</span>
          </h2>
          <p className="about-cta-subtitle">
            Let&apos;s talk about your business, your goals, and what a system that actually works could look like for you.
          </p>
          <div className="about-cta-buttons">
            <button
              type="button"
              className="about-cta-btn--primary"
              onClick={() => onNavigate && onNavigate('explore')}
            >
              <span>Explore Our Services</span>
            </button>
            <button
              type="button"
              className="about-cta-btn--secondary"
              onClick={() => onNavigate && onNavigate('home')}
            >
              <span>Back to Home</span>
            </button>
          </div>
        </div>
        <div className="about-cta-orb" aria-hidden="true" />
      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  )
}
