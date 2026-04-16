import { useState, useEffect, useRef } from 'react'
import { Network, Eye, Monitor, Cpu, Menu, X, Compass, Flame, Target } from 'lucide-react'
import { PROJECTS } from './projectsData'
import './LandingPage.css'

const NAV_ITEMS = ['Services','Featured', 'Blog' , 'About', 'Contact', 'Privacy Policy']

const TITLE_TOKENS = [
  { text: 'ENGINEERING', custom: false },
  { text: 'DIGITAL',     custom: false },
  { text: 'SYSTEMS',     custom: true  },
]

const PILLARS = [
  {
    number:      '01',
    title:       'INFORMATION',
    titleAccent: 'SYSTEMS',
    tagline:     'Structure your business for scale.',
    description: 'We design systems that organize your operations, connect your tools, and eliminate inefficiencies.',
    accentColor: '#7ca4ff',
    accentGlow:  'rgba(124,164,255,0.4)',
    icon: Network,
  },
  {
    number:      '02',
    title:       'BRAND',
    titleAccent: 'IDENTITY',
    tagline:     'Be seen. Be remembered.',
    description: 'We craft brands that communicate clearly, resonate deeply, and stand out in competitive markets.',
    accentColor: '#ffc464',
    accentGlow:  'rgba(255,196,100,0.4)',
    icon: Eye,
  },
  {
    number:      '03',
    title:       'DIGITAL',
    titleAccent: 'PRODUCTS',
    tagline:     'Build experiences that convert.',
    description: 'Websites and applications engineered for performance, usability, and growth.',
    accentColor: '#ff2a7e',
    accentGlow:  'rgba(255,42,126,0.4)',
    icon: Monitor,
  },
  {
    number:      '04',
    title:       'AI &',
    titleAccent: 'AUTOMATION',
    tagline:     'Let your business run smarter.',
    description: 'Intelligent systems that automate workflows, reduce manual work, and scale effortlessly.',
    accentColor: '#b347ea',
    accentGlow:  'rgba(179,71,234,0.4)',
    icon: Cpu,
  },
]

const IDENTITY_POINTS = [
  {
    numeral:  'I',
    eyebrow:  'WHERE WE\'RE HEADED',
    title:    'The North Star',
    body:     'A world where every ambitious business — regardless of size — has the systems, presence, and intelligence to compete and win on the global digital stage.',
    accent:   '#ffd166',
    glow:     'rgba(255,209,102,0.35)',
    icon:     Compass,
  },
  {
    numeral:  'II',
    eyebrow:  'HOW WE OPERATE',
    title:    'The Way We Move',
    body:     'We engineer intelligent digital ecosystems — brand, product, and automation working as one — so your business compounds its advantage over time.',
    accent:   '#ff6b35',
    glow:     'rgba(255,107,53,0.35)',
    icon:     Flame,
  },
  {
    numeral:  'III',
    eyebrow:  'WHAT WE\'RE BUILDING TOWARD',
    title:    'The Standard We Hold',
    body:     'Not just deliverables — transformations. We measure success by businesses that grew, markets that shifted, and the futures we helped make real.',
    accent:   '#ff4d6d',
    glow:     'rgba(255,77,109,0.35)',
    icon:     Target,
  },
]

/* ─────────────────────────────────────────────
   3-D visual components — one per pillar
   All colours come from CSS custom properties
   (--pillar-accent / --pillar-glow) set on the
   nearest .pillar-wrapper ancestor.
───────────────────────────────────────────── */

/** 01 · SYSTEMS — rotating wireframe cube with pulsing node dots */
function CubeVisual() {
  return (
    <div className="vis3d-scene vis3d-cube-scene" aria-hidden="true">
      <div className="vis3d-glow-bg" />
      <div className="vis3d-cube-wrap">
        <div className="vis3d-cube">
          <div className="cube-face cube-face--front"  />
          <div className="cube-face cube-face--back"   />
          <div className="cube-face cube-face--right"  />
          <div className="cube-face cube-face--left"   />
          <div className="cube-face cube-face--top"    />
          <div className="cube-face cube-face--bottom" />
        </div>
        {/* Corner particles that orbit around the cube */}
        <div className="cube-particle cp--1" />
        <div className="cube-particle cp--2" />
        <div className="cube-particle cp--3" />
      </div>
    </div>
  )
}

/** 02 · IDENTITY — layered rotating diamond gem */
function GemVisual() {
  return (
    <div className="vis3d-scene vis3d-gem-scene" aria-hidden="true">
      <div className="vis3d-glow-bg" />
      <div className="vis3d-gem">
        <div className="gem-ring gem-ring--outer" />
        <div className="gem-ring gem-ring--mid"   />
        <div className="gem-ring gem-ring--inner" />
        <div className="gem-core" />
        <div className="gem-sparkle gs--1" />
        <div className="gem-sparkle gs--2" />
        <div className="gem-sparkle gs--3" />
        <div className="gem-sparkle gs--4" />
      </div>
    </div>
  )
}

/** 03 · PRODUCTS — floating stacked screen cards */
function ScreensVisual() {
  return (
    <div className="vis3d-scene vis3d-screens-scene" aria-hidden="true">
      <div className="vis3d-glow-bg" />
      <div className="vis3d-screens-wrap">
        {/* Back screen */}
        <div className="scr-card scr-card--back">
          <div className="scr-topbar" />
          <div className="scr-line" />
          <div className="scr-line scr-line--short" />
        </div>
        {/* Mid screen */}
        <div className="scr-card scr-card--mid">
          <div className="scr-topbar" />
          <div className="scr-line" />
          <div className="scr-line scr-line--short" />
          <div className="scr-btn" />
        </div>
        {/* Front screen — most detailed */}
        <div className="scr-card scr-card--front">
          <div className="scr-topbar">
            <div className="scr-dot" />
            <div className="scr-dot" />
            <div className="scr-dot" />
          </div>
          <div className="scr-headline" />
          <div className="scr-line" />
          <div className="scr-line scr-line--short" />
          <div className="scr-btn">
            <div className="scr-btn-label" />
          </div>
          <div className="scr-cursor" />
        </div>
      </div>
    </div>
  )
}

/** 04 · AUTOMATION — three-ring orbital atom */
function OrbitalVisual() {
  return (
    <div className="vis3d-scene vis3d-orbital-scene" aria-hidden="true">
      <div className="vis3d-glow-bg" />
      <div className="vis3d-orbital">
        <div className="orb-ring orb-ring--1"><div className="orb-dot" /></div>
        <div className="orb-ring orb-ring--2"><div className="orb-dot" /></div>
        <div className="orb-ring orb-ring--3"><div className="orb-dot" /></div>
        <div className="orb-core">
          <div className="orb-core-inner" />
        </div>
      </div>
    </div>
  )
}

const VISUALS = [CubeVisual, GemVisual, ScreensVisual, OrbitalVisual]

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function LandingPage({ onNavigate }) {
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [titleVisible,  setTitleVisible]  = useState(false)
  const [manifestoVisible, setManifestoVisible] = useState([false, false, false])
  const transitionRef     = useRef(null)
  const buildsRef         = useRef(null)
  const pillarRefs        = useRef([])
  const manifestoRefs     = useRef([])
  const existPillarRefs   = useRef([])
  const showcaseHeaderRef = useRef(null)
  const showcaseRefs      = useRef([])
  const insightsRef       = useRef(null)
  const insightCardRefs   = useRef([])

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) }
      }),
      { threshold: 0.15 }
    )
    const targets = [
      transitionRef.current,
      buildsRef.current,
      ...pillarRefs.current.filter(Boolean),
      ...existPillarRefs.current.filter(Boolean),
      showcaseHeaderRef.current,
      ...showcaseRefs.current.filter(Boolean),
      insightsRef.current,
      ...insightCardRefs.current.filter(Boolean),
    ]
    targets.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observers = manifestoRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setManifestoVisible((prev) => {
              const next = [...prev]
              next[i] = true
              return next
            })
            obs.disconnect()
          }
        },
        { threshold: 0.45 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs && obs.disconnect())
  }, [])

  return (
    <div className="landing">

      {/* ── SPIDER-WEB BG: mask fades outward, slow rotation + pulse ── */}
      <div className="web-bg" aria-hidden="true">
        <div className="web-bg-rotate">
          <svg className="web-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {[50,105,165,225,290,355,390].map((r) => (
              <circle key={r} cx="400" cy="400" r={r}
                fill="none" stroke="rgba(140,180,255,0.2)" strokeWidth="1.2" />
            ))}
            {Array.from({length:15},(_,i)=>i*24).map((deg) => {
              const rad=(deg*Math.PI)/180
              return <line key={deg} x1="400" y1="400"
                x2={400+390*Math.cos(rad)} y2={400+390*Math.sin(rad)}
                stroke="rgba(140,180,255,0.15)" strokeWidth="1" />
            })}
            {[105,165,225,290,355].map((r)=>
              Array.from({length:15},(_,i)=>i*24).map((deg) => {
                const r1=(deg*Math.PI)/180, r2=((deg+24)*Math.PI)/180
                return <line key={`${r}-${deg}`}
                  x1={400+r*Math.cos(r1)} y1={400+r*Math.sin(r1)}
                  x2={400+r*Math.cos(r2)} y2={400+r*Math.sin(r2)}
                  stroke="rgba(140,180,255,0.12)" strokeWidth="0.8" />
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
            <button key={item} className="nav-btn" type="button"
              onClick={
                item==='Blog'      && onNavigate ? ()=>onNavigate('blog')     :
                item==='Services'  && onNavigate ? ()=>onNavigate('explore')  :
                item==='Featured'  && onNavigate ? ()=>onNavigate('projects') : undefined
              }>
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <button className="hamburger" type="button" aria-label="Toggle menu"
          aria-expanded={menuOpen} onClick={()=>setMenuOpen(o=>!o)}>
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>

        <nav className={`nav-mobile${menuOpen?' open':''}`} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className="nav-btn mobile" type="button"
              onClick={()=>{
                setMenuOpen(false)
                if(item==='Blog'     && onNavigate) onNavigate('blog')
                if(item==='Services' && onNavigate) onNavigate('explore')
                if(item==='Featured' && onNavigate) onNavigate('projects')
              }}>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <h1 className="main-title" aria-label="Engineering Digital Systems">
          {TITLE_TOKENS.map((token,i) => (
            <span key={token.text}
              className={`title-word${token.custom?' title-word--web':''}${titleVisible?' title-word--visible':''}`}
              style={{animationDelay:`${i*0.18}s`}}>
              {token.text}
            </span>
          ))}
        </h1>

        <p className={`mini-title${titleVisible?' mini-title--visible':''}`}>
          Built to scale. Designed to perform.
        </p>

        <div className="cta-wrapper">
          <button type="button" className="cta-btn"
            onClick={()=>onNavigate&&onNavigate('explore')}>
            <span>Get Started</span>
          </button>
        </div>
      </section>

      {/* ── TRANSITION LINE ── */}
      <section className="transition-section" ref={transitionRef} aria-label="Mission statement">
        <div className="transition-rule" aria-hidden="true"/>
        <p className="transition-text">
          We design <span className="transition-text--accent">systems</span> that power modern businesses.
        </p>
        <div className="transition-rule" aria-hidden="true"/>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="builds-section" aria-label="What we build">
        <div className="builds-header" ref={buildsRef}>
          <span className="builds-eyebrow">What We Build</span>
          <h2 className="builds-title">
            Built for clarity,{' '}<em>designed for scale.</em>
          </h2>
        </div>

        <div className="pillars-track">
          {PILLARS.map((pillar,i) => {
            const Visual = VISUALS[i]
            return (
              <div key={pillar.number} className="pillar-wrapper"
                ref={(el)=>{pillarRefs.current[i]=el}}
                style={{'--pillar-accent':pillar.accentColor,'--pillar-glow':pillar.accentGlow}}>
                <article className="pillar-card">

                  {/* 3-D animated visual */}
                  <div className="pillar-visual">
                    <Visual />
                  </div>

                  <div className="pillar-content">
                    <div className="pillar-top-row">
                      <span className="pillar-number">{pillar.number}</span>
                      <div className="pillar-icon-wrap" aria-hidden="true">
                        <pillar.icon size={20} strokeWidth={1.5}/>
                      </div>
                    </div>

                    <h3 className="pillar-title">
                      {pillar.title}{' '}
                      <span className="pillar-title--web">{pillar.titleAccent}</span>
                    </h3>

                    <p className="pillar-tagline">{pillar.tagline}</p>
                    <p className="pillar-desc">{pillar.description}</p>
                  </div>

                  <div className="pillar-accent-bar" aria-hidden="true"/>
                </article>
              </div>
            )
          })}
        </div>

        <div className="builds-footer">
          <div className="pillars-scroll-hint" aria-hidden="true">
            <span>Scroll to explore</span>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path d="M1 5H19M15 1L19 5L15 9"
                stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <button type="button" className="builds-learn-more"
            onClick={()=>onNavigate&&onNavigate('explore')}>
            <span>Learn More</span>
          </button>
        </div>
      </section>

      {/* ── WHY WE EXIST ── */}
      <section className="exist-section" aria-label="Why MARSWEBZ exists">
        <div className="exist-inner">

          {/* Eyebrow + heading */}
          <div className="exist-heading-wrap">
            <span className="exist-eyebrow">THE DEEPER WHY</span>
            <h2 className="exist-heading">
              This is why{' '}
              <span className="exist-heading--brand">MARSWEBZ</span>
              {' '}exists.
            </h2>
          </div>

          {/* Progressive-reveal manifesto — each line triggers on its own scroll position */}
          <div className="exist-manifesto" aria-label="Our manifesto">
            <p
              ref={(el) => { manifestoRefs.current[0] = el }}
              className={`exist-line exist-line--1${manifestoVisible[0] ? ' exist-line--visible' : ''}`}
            >
              The world is drowning in digital noise.
            </p>
            <p
              ref={(el) => { manifestoRefs.current[1] = el }}
              className={`exist-line exist-line--2${manifestoVisible[1] ? ' exist-line--visible' : ''}`}
            >
              Most businesses are just&nbsp;<em>surviving</em>&nbsp;it.
            </p>
            <p
              ref={(el) => { manifestoRefs.current[2] = el }}
              className={`exist-line exist-line--3${manifestoVisible[2] ? ' exist-line--visible' : ''}`}
            >
              We built{' '}
              <span className="exist-line--brandname">MARSWEBZ</span>
              {' '}to help you{' '}
              <em className="exist-line--highlight">rise above it.</em>
            </p>
          </div>

          {/* 3 identity pillars — vision / mission / goals without those words */}
          <div className="exist-pillars">
            {IDENTITY_POINTS.map((point, i) => {
              const Icon = point.icon
              return (
                <div
                  key={point.numeral}
                  className="exist-pillar"
                  ref={(el) => { existPillarRefs.current[i] = el }}
                  style={{ '--exist-accent': point.accent, '--exist-glow': point.glow }}
                >
                  <div className="exist-pillar-top">
                    <div className="exist-pillar-icon-wrap" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className="exist-pillar-eyebrow">{point.eyebrow}</span>
                  </div>
                  <div className="exist-pillar-numeral" aria-hidden="true">{point.numeral}</div>
                  <h3 className="exist-pillar-title">{point.title}</h3>
                  <div className="exist-pillar-rule" aria-hidden="true" />
                  <p className="exist-pillar-body">{point.body}</p>
                </div>
              )
            })}
          </div>

        </div>

        {/* Decorative ambient orbs */}
        <div className="exist-orb exist-orb--blue" aria-hidden="true" />
        <div className="exist-orb exist-orb--indigo" aria-hidden="true" />
      </section>

      {/* ── SYSTEMS IN ACTION ── */}
      <section className="showcase-section" aria-label="Systems in action — featured projects">
        <div className="showcase-inner">

          {/* Section header */}
          <div className="showcase-header" ref={showcaseHeaderRef}>
            <span className="showcase-eyebrow">WHAT WE'VE BUILT</span>
            <h2 className="showcase-title">
              Systems in{' '}
              <span className="showcase-title--accent">Action</span>
            </h2>
            <p className="showcase-subtitle">
              Real-world concepts designed to explore the future of digital systems.
            </p>
          </div>

          {/* Project cards */}
          <div className="showcase-grid">
            {PROJECTS.map((project, i) => (
              <article
                key={project.id}
                className={`showcase-card${i % 2 === 1 ? ' showcase-card--alt' : ''}`}
                ref={(el) => { showcaseRefs.current[i] = el }}
                style={{ '--sc-accent': project.accentColor, '--sc-glow': project.accentGlow }}
              >
                {/* Text content */}
                <div className="sc-content">
                  <span className="sc-tag">{project.tag}</span>
                  <h3 className="sc-title">{project.title}</h3>
                  <p className="sc-desc">{project.description}</p>
                  <div className="sc-badges">
                    {project.badges.map((b) => (
                      <span key={b} className="sc-badge">{b}</span>
                    ))}
                  </div>
                </div>

                {/* Image frame */}
                <div className="sc-visual">
                  <div className="sc-frame">
                    <div className="sc-frame-bar" aria-hidden="true">
                      <span className="sc-frame-dot" />
                      <span className="sc-frame-dot" />
                      <span className="sc-frame-dot" />
                      <div className="sc-frame-url" />
                    </div>
                    <div className="sc-frame-screen">
                      <img
                        src={project.image}
                        alt={`${project.title} interface screenshot`}
                        className="sc-img"
                        loading="lazy"
                      />
                      <div className="sc-img-overlay" aria-hidden="true" />
                      <div className="sc-scanline" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="sc-glow-blob" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="showcase-cta-wrap">
            <p className="showcase-cta-label">More systems in the pipeline.</p>
            <button
              type="button"
              className="showcase-cta-btn"
              onClick={() => onNavigate && onNavigate('projects')}
            >
              <span>View All Projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M9 4L13 8L9 12"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>

        {/* Ambient orbs */}
        <div className="showcase-orb showcase-orb--cyan"   aria-hidden="true" />
        <div className="showcase-orb showcase-orb--violet" aria-hidden="true" />
      </section>

      {/* ── INSIGHTS ── */}
      <section className="insights-section" aria-label="Insights — articles and perspectives">
        <div className="insights-inner">

          {/* Section header */}
          <div className="insights-header" ref={insightsRef}>
            <span className="insights-eyebrow">PERSPECTIVES</span>
            <h2 className="insights-title">
              Insights That{' '}
              <span className="insights-title--accent">Move Business</span>
            </h2>
            <p className="insights-subtitle">
              Long-form thinking on the systems, strategies, and shifts that separate businesses that
              thrive from those that merely exist.
            </p>
          </div>

          {/* Article preview cards */}
          <div className="insights-grid">

            {/* Card 1 — The Architecture of Everything */}
            <article
              className="insight-card insight-card--blue"
              ref={(el) => { insightCardRefs.current[0] = el }}
              onClick={() => onNavigate && onNavigate('blog-1')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('blog-1')}
            >
              <div className="insight-card-visual insight-card-visual--blue">
                <div className="insight-card-orb insight-card-orb--blue" aria-hidden="true" />
                <div className="insight-card-lines" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="insight-card-line" style={{ animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
                <div className="insight-card-visual-bottom" aria-hidden="true" />
              </div>
              <div className="insight-card-body">
                <span className="insight-card-category insight-card-category--blue">
                  Information Systems · Technology · Business
                </span>
                <h3 className="insight-card-title">The Architecture of Everything</h3>
                <p className="insight-card-excerpt">
                  Before the first sale is made. Before the strategy deck is printed. Before the CEO takes
                  the stage — there is a system. An invisible lattice of data, processes, and technology
                  humming quietly in the background, holding everything together.
                </p>
                <div className="insight-card-footer">
                  <div className="insight-card-meta">
                    <span className="insight-card-readtime">8 min read</span>
                    <span className="insight-card-sep" aria-hidden="true">·</span>
                    <time className="insight-card-readtime">April 2025</time>
                  </div>
                  <button
                    type="button"
                    className="insight-card-btn insight-card-btn--blue"
                    onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('blog-1') }}
                    aria-label="Read: The Architecture of Everything"
                  >
                    <span>Read</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2 — Dead on Arrival */}
            <article
              className="insight-card insight-card--amber"
              ref={(el) => { insightCardRefs.current[1] = el }}
              onClick={() => onNavigate && onNavigate('blog-2')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('blog-2')}
            >
              <div className="insight-card-visual insight-card-visual--amber">
                <div className="insight-card-orb insight-card-orb--amber" aria-hidden="true" />
                <div className="insight-card-lines insight-card-lines--amber" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="insight-card-line" style={{ animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
                <div className="insight-card-visual-bottom insight-card-visual-bottom--amber" aria-hidden="true" />
              </div>
              <div className="insight-card-body">
                <span className="insight-card-category insight-card-category--amber">
                  Web Design · Conversion · Strategy
                </span>
                <h3 className="insight-card-title">Dead on Arrival</h3>
                <p className="insight-card-excerpt">
                  You paid for the domain. Hired the designer. Spent weeks on copy. And nothing happened.
                  A forensic breakdown of why most business websites don&apos;t convert — and the engineering
                  principles that fix it for good.
                </p>
                <div className="insight-card-footer">
                  <div className="insight-card-meta">
                    <span className="insight-card-readtime">10 min read</span>
                    <span className="insight-card-sep" aria-hidden="true">·</span>
                    <time className="insight-card-readtime">May 2025</time>
                  </div>
                  <button
                    type="button"
                    className="insight-card-btn insight-card-btn--amber"
                    onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('blog-2') }}
                    aria-label="Read: Dead on Arrival"
                  >
                    <span>Read</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 3 — The Rise of Intelligent Businesses */}
            <article
              className="insight-card insight-card--violet"
              ref={(el) => { insightCardRefs.current[2] = el }}
              onClick={() => onNavigate && onNavigate('blog-3')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('blog-3')}
            >
              <div className="insight-card-visual insight-card-visual--violet">
                <div className="insight-card-orb insight-card-orb--violet" aria-hidden="true" />
                <div className="insight-card-lines insight-card-lines--violet" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="insight-card-line" style={{ animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
                <div className="insight-card-visual-bottom insight-card-visual-bottom--violet" aria-hidden="true" />
              </div>
              <div className="insight-card-body">
                <span className="insight-card-category insight-card-category--violet">
                  AI · Automation · Business Strategy
                </span>
                <h3 className="insight-card-title">The Rise of Intelligent Businesses</h3>
                <p className="insight-card-excerpt">
                  The businesses pulling ahead of their competitors aren&apos;t working harder. They&apos;re
                  working smarter — through automation. A field report from the frontier of the intelligent
                  business revolution.
                </p>
                <div className="insight-card-footer">
                  <div className="insight-card-meta">
                    <span className="insight-card-readtime">10 min read</span>
                    <span className="insight-card-sep" aria-hidden="true">·</span>
                    <time className="insight-card-readtime">June 2025</time>
                  </div>
                  <button
                    type="button"
                    className="insight-card-btn insight-card-btn--violet"
                    onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('blog-3') }}
                    aria-label="Read: The Rise of Intelligent Businesses"
                  >
                    <span>Read</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 4 — Your Brand Isn't Just a Logo */}
            <article
              className="insight-card insight-card--rose"
              ref={(el) => { insightCardRefs.current[3] = el }}
              onClick={() => onNavigate && onNavigate('blog-4')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('blog-4')}
            >
              <div className="insight-card-visual insight-card-visual--rose">
                <div className="insight-card-orb insight-card-orb--rose" aria-hidden="true" />
                <div className="insight-card-lines insight-card-lines--rose" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="insight-card-line" style={{ animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
                <div className="insight-card-visual-bottom insight-card-visual-bottom--rose" aria-hidden="true" />
              </div>
              <div className="insight-card-body">
                <span className="insight-card-category insight-card-category--rose">
                  Brand Management · Marketing · Identity
                </span>
                <h3 className="insight-card-title">Your Brand Isn&apos;t Just a Logo</h3>
                <p className="insight-card-excerpt">
                  Most businesses treat their brand like a coat of paint. But the companies people
                  actually remember built something structural — a brand system built on authenticity,
                  uniqueness, and memorability.
                </p>
                <div className="insight-card-footer">
                  <div className="insight-card-meta">
                    <span className="insight-card-readtime">9 min read</span>
                    <span className="insight-card-sep" aria-hidden="true">·</span>
                    <time className="insight-card-readtime">July 2025</time>
                  </div>
                  <button
                    type="button"
                    className="insight-card-btn insight-card-btn--rose"
                    onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('blog-4') }}
                    aria-label="Read: Your Brand Isn't Just a Logo"
                  >
                    <span>Read</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>

          </div>

          {/* CTA to view all articles */}
          <div className="insights-cta-wrap">
            <p className="insights-cta-label">Four articles in the series. More in the pipeline.</p>
            <button
              type="button"
              className="insights-cta-btn"
              onClick={() => onNavigate && onNavigate('blog')}
            >
              <span>View All Articles</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>

        {/* Ambient orbs */}
        <div className="insights-orb insights-orb--blue"   aria-hidden="true" />
        <div className="insights-orb insights-orb--amber"  aria-hidden="true" />
        <div className="insights-orb insights-orb--violet" aria-hidden="true" />
        <div className="insights-orb insights-orb--rose"   aria-hidden="true" />
      </section>

    </div>
  )
}
