import { useState, useEffect, useRef } from 'react'
import { Network, Eye, Monitor, Cpu, Menu, X, Compass, Flame, Target, Search, Layers, Zap, TrendingUp, Plus, Minus } from 'lucide-react'
import { PROJECTS, SERVICES } from './projectsData'
import turtleImg from './turtle.jpg'
import Footer from './Footer'
import { useSEO } from './useSEO'
import './LandingPage.css'

const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || 'https://formspree.io/f/xeolpnjj'

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

const PROCESS_STEPS = [
  {
    number:      '01',
    title:       'Discover',
    subtitle:    'Understand before building.',
    description: 'Every project starts with deep listening. We immerse ourselves in your business — your goals, your audience, your competitive landscape, and the gaps holding you back. No assumptions, no templates. We map the full picture before a single line of code is written, so every decision that follows is grounded in clarity rather than guesswork.',
    accentColor: '#7ca4ff',
    accentGlow:  'rgba(124,164,255,0.35)',
    icon: Search,
  },
  {
    number:      '02',
    title:       'Design',
    subtitle:    'Structure meets experience.',
    description: 'Great design is architecture, not decoration. We translate research into systems — information flows, user journeys, brand language, and interface logic. Every element is intentional. Visuals and functionality are designed together from the start, so what you see and what it does feel like one cohesive whole.',
    accentColor: '#ffc464',
    accentGlow:  'rgba(255,196,100,0.35)',
    icon: Layers,
  },
  {
    number:      '03',
    title:       'Build',
    subtitle:    'Where everything comes to life.',
    description: 'This is where design becomes reality. We engineer with precision — clean code, optimised performance, tested across every device and scenario. We move fast without cutting corners, keeping you updated at every milestone. What gets handed over isn\'t just built — it\'s production-ready, reliable, and built to perform from day one.',
    accentColor: '#ff2a7e',
    accentGlow:  'rgba(255,42,126,0.35)',
    icon: Zap,
  },
  {
    number:      '04',
    title:       'Scale',
    subtitle:    'Built to grow with you.',
    description: 'Launching is the beginning, not the end. We build with scalability baked in — systems that flex as your business grows, expand as your needs evolve, and stay fast as your audience multiplies. Whether that means adding features, integrating new tools, or automating emerging workflows, your digital infrastructure is ready for what comes next.',
    accentColor: '#b347ea',
    accentGlow:  'rgba(179,71,234,0.35)',
    icon: TrendingUp,
  },
]

const FAQ_ITEMS = [
  {
    q: 'What kind of businesses do you work with?',
    a: 'We work with startups finding their footing, growing businesses looking to scale their digital presence, and established companies ready to modernise. What they all share is ambition — a drive to compete at a higher level. Whether you\'re pre-launch or post-Series A, if you\'re serious about your digital infrastructure, we\'re the right fit.',
  },
  {
    q: 'Do you only design websites?',
    a: 'No — websites are one piece of a larger system. We engineer full digital ecosystems: brand identity, web applications, automation workflows, AI-powered tools, and information systems. Most clients come for a website and stay for the full stack.',
  },
  {
    q: 'How long does a project take?',
    a: 'Timelines vary depending on scope and complexity. A focused branding project may take 2–3 weeks. A full website build typically runs 4–8 weeks. Complex applications or integrated systems can take longer. After our discovery call, we\'ll give you a precise timeline tailored to your project.',
  },
  {
    q: 'What is your process?',
    a: 'Every project moves through four stages — Discover, Design, Build, and Scale. We research before we touch tools, design before we write code, build with precision, and deliver systems ready to grow with your business. This ensures nothing is rushed, nothing is missed, and everything we hand over actually works.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes. We offer retainer and maintenance packages for clients who want continued improvements, updates, or technical support after launch. Many of our clients stay on for ongoing collaboration long after the initial build is complete.',
  },
  {
    q: 'How do I get started?',
    a: 'Reach out through our contact page or email us directly. We\'ll schedule a discovery call to understand your goals and determine whether we\'re the right fit. From there, we put together a tailored proposal — no generic quotes, no unnecessary back-and-forth.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We work with clients globally. Our process is built to run entirely remotely — clear communication, structured checkpoints, and async workflows mean geography is never a barrier. Wherever you are, if we\'re the right team for your project, we\'ll make it work.',
  },
  {
    q: "What makes MARSWEBZ different?",
    a: 'Most agencies deliver deliverables. We engineer outcomes. The difference is in how we think — every project is treated as a system, not a collection of tasks. Brand, product, and automation working as one. We don\'t just build what you ask for; we build what your business actually needs to grow.',
  },
]

/* ─────────────────────────────────────────────
   SPIDER-WEB SVG CONTENT
   · 12 perfectly uniform spokes (30° each)
   · 10 slightly-concave bezier capture rings
   · outer frame with matching concave segments
   · hub circle + 3 mini inner rings
   · dewdrop nodes at key intersections
───────────────────────────────────────────── */
function RealisticSpiderWeb() {
  const cx = 400, cy = 400
  const N = 12
  const MAX_R = 362

  // Perfectly uniform spoke angles — exactly 30° apart
  const angles = Array.from({ length: N }, (_, i) =>
    (i / N) * Math.PI * 2 - Math.PI / 2
  )

  // Equal spoke tip coordinates
  const tips = angles.map(a => [
    cx + MAX_R * Math.cos(a),
    cy + MAX_R * Math.sin(a),
  ])

  // Point at radius r on spoke i — perfectly on the spoke, no sag
  const rpt = (i, r) => {
    const a = angles[i]
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }

  // Build a ring as slightly-concave quadratic bezier segments.
  // Each chord's control point is pulled inward by `inwardPct * r`,
  // giving the clean bowed look of real spider silk under tension.
  const ringPath = (r, inwardPct = 0.038) => {
    const pts = angles.map((_, i) => rpt(i, r))
    let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`
    for (let i = 0; i < N; i++) {
      const [x1, y1] = pts[i]
      const [x2, y2] = pts[(i + 1) % N]
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2
      const dx = mx - cx, dy = my - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const cpx = cx + (dx / dist) * (dist - r * inwardPct)
      const cpy = cy + (dy / dist) * (dist - r * inwardPct)
      d += ` Q${cpx.toFixed(2)},${cpy.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`
    }
    return d + ' Z'
  }

  // Outer frame path — same concave curvature as the rings
  const framePath = () => {
    let d = `M${tips[0][0].toFixed(2)},${tips[0][1].toFixed(2)}`
    for (let i = 0; i < N; i++) {
      const [x1, y1] = tips[i]
      const [x2, y2] = tips[(i + 1) % N]
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2
      const dx = mx - cx, dy = my - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const cpx = cx + (dx / dist) * (dist - MAX_R * 0.038)
      const cpy = cy + (dy / dist) * (dist - MAX_R * 0.038)
      d += ` Q${cpx.toFixed(2)},${cpy.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`
    }
    return d + ' Z'
  }

  // Ring radii — denser toward the outside like a real web
  const ringRadii = [28, 58, 92, 130, 170, 210, 250, 290, 325, 350]

  // Opacity fades outward for depth
  const ringOpacity = [0.40, 0.36, 0.32, 0.28, 0.25, 0.22, 0.19, 0.17, 0.15, 0.13]

  // Hub mini-ring radii
  const hubR = [10, 20, 30]

  // [ringIndex, spokeIndices] — dewdrop node positions
  const drops = [
    [1, [0, 2, 4, 6, 8, 10]],
    [3, [1, 3, 5, 7, 9, 11]],
    [5, [0, 3, 6, 9]],
    [7, [1, 5, 9]],
  ]

  return (
    <>
      {/* Hub center dot */}
      <circle cx={cx} cy={cy} r={3} fill="rgba(140,180,255,0.65)" />
      <circle cx={cx} cy={cy} r={7} fill="none" stroke="rgba(140,180,255,0.42)" strokeWidth="1" />

      {/* Hub mini rings */}
      {hubR.map((r, ri) => (
        <path key={`h${ri}`} d={ringPath(r, 0.02)} fill="none"
          stroke="rgba(140,180,255,0.32)" strokeWidth="0.7" />
      ))}

      {/* Radial spokes */}
      {angles.map((a, i) => (
        <line key={`s${i}`}
          x1={cx} y1={cy}
          x2={tips[i][0].toFixed(2)} y2={tips[i][1].toFixed(2)}
          stroke="rgba(140,180,255,0.22)" strokeWidth="1" />
      ))}

      {/* Outer frame */}
      <path d={framePath()} fill="none" stroke="rgba(140,180,255,0.30)" strokeWidth="1.2" />

      {/* Capture rings */}
      {ringRadii.map((r, ri) => (
        <path key={`r${ri}`} d={ringPath(r)} fill="none"
          stroke={`rgba(140,180,255,${ringOpacity[ri]})`}
          strokeWidth="0.9" />
      ))}

      {/* Dewdrop nodes */}
      {drops.flatMap(([ri, spokes]) =>
        spokes.map(si => {
          const [x, y] = rpt(si, ringRadii[ri])
          return (
            <circle key={`d${ri}-${si}`}
              cx={x.toFixed(2)} cy={y.toFixed(2)} r="1.8"
              fill="rgba(140,180,255,0.42)" />
          )
        })
      )}
    </>
  )
}

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
export default function LandingPage({ onNavigate, scrollToContact, onContactScrolled }) {
  useSEO({
    title: 'MARSWEBZ — Engineering Digital Systems',
    description: 'We build digital systems, brands, and software solutions designed for clarity, performance, and scale — serving businesses globally.',
  })

  const [menuOpen,      setMenuOpen]      = useState(false)
  const [titleVisible,  setTitleVisible]  = useState(false)
  const [manifestoVisible, setManifestoVisible] = useState([false, false, false])
  const [openFaq, setOpenFaq] = useState(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', budget: '', idea: '' })
  const [contactStatus, setContactStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const transitionRef     = useRef(null)
  const buildsRef         = useRef(null)
  const pillarRefs        = useRef([])
  const manifestoRefs     = useRef([])
  const existPillarRefs   = useRef([])
  const showcaseHeaderRef = useRef(null)
  const showcaseRefs      = useRef([])
  const serviceRefs       = useRef([])
  const [lightboxImg, setLightboxImg] = useState(null)

  useEffect(() => {
    if (!lightboxImg) return
    const onKey = (e) => { if (e.key === 'Escape') setLightboxImg(null) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [lightboxImg])
  const processRef        = useRef(null)
  const processStepRefs   = useRef([])
  const insightsRef       = useRef(null)
  const insightCardRefs   = useRef([])
  const miniAboutRef      = useRef(null)
  const csrRef            = useRef(null)
  const faqRef            = useRef(null)
  const contactRef        = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (scrollToContact) {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      if (onContactScrolled) onContactScrolled()
    }
  }, [scrollToContact, onContactScrolled])

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
      ...serviceRefs.current.filter(Boolean),
      processRef.current,
      ...processStepRefs.current.filter(Boolean),
      insightsRef.current,
      ...insightCardRefs.current.filter(Boolean),
      miniAboutRef.current,
      csrRef.current,
      faqRef.current,
      contactRef.current,
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

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setContactStatus('sending')
    const message = [
      `Name: ${contactForm.name}`,
      `Company / Project name: ${contactForm.company || 'Not provided'}`,
      `Estimated budget: ${contactForm.budget}`,
      '',
      'Project details:',
      contactForm.idea,
    ].join('\n')
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: contactForm.email,
          message,
        }),
      })
      if (res.ok) {
        setContactStatus('sent')
        setContactForm({ name: '', email: '', company: '', budget: '', idea: '' })
      } else {
        setContactStatus('error')
      }
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <div className="landing">

      {/* ── SPIDER-WEB BG: mask fades outward, slow rotation + pulse ── */}
      <div className="web-bg" aria-hidden="true">
        <div className="web-bg-rotate">
          <svg className="web-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <RealisticSpiderWeb />
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
                item==='Blog'           && onNavigate ? ()=>onNavigate('blog')     :
                item==='Services'       && onNavigate ? ()=>onNavigate('explore')  :
                item==='Featured'       && onNavigate ? ()=>onNavigate('projects') :
                item==='About'          && onNavigate ? ()=>onNavigate('about')    :
                item==='Contact'                      ? ()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}) :
                item==='Privacy Policy' && onNavigate ? ()=>onNavigate('privacy')  : undefined
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
                if(item==='Blog'           && onNavigate) onNavigate('blog')
                if(item==='Services'       && onNavigate) onNavigate('explore')
                if(item==='Featured'       && onNavigate) onNavigate('projects')
                if(item==='About'          && onNavigate) onNavigate('about')
                if(item==='Contact')       document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})
                if(item==='Privacy Policy' && onNavigate) onNavigate('privacy')
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
            {PROJECTS.map((project, i) => {
              const CardTag = project.liveUrl ? 'a' : 'article'
              return (
              <CardTag
                key={project.id}
                className={`showcase-card${i % 2 === 1 ? ' showcase-card--alt' : ''}`}
                ref={(el) => { showcaseRefs.current[i] = el }}
                style={{
                  '--sc-accent': project.accentColor,
                  '--sc-glow': project.accentGlow,
                  ...(project.liveUrl ? { textDecoration: 'none', color: 'inherit' } : {}),
                }}
                {...(project.liveUrl
                  ? {
                      href: project.liveUrl,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      'aria-label': `Open ${project.title} website`,
                    }
                  : {})}
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
              </CardTag>
            )})}
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

      {/* ── SERVICES SHOWCASE ── */}
      <section className="showcase-section" aria-label="Additional services — email marketing design">
        <div className="showcase-inner">
          <div className="showcase-header">
            <span className="showcase-eyebrow">ADDED SERVICES</span>
            <h2 className="showcase-title">
              Beyond the{' '}
              <span className="showcase-title--accent">Website</span>
            </h2>
            <p className="showcase-subtitle">
              Professional services that extend your brand across every channel.
            </p>
          </div>

          <div className="showcase-grid">
            {SERVICES.map((service, i) => (
              <article
                key={service.id}
                ref={(el) => { serviceRefs.current[i] = el }}
                className="showcase-card"
                style={{ '--sc-accent': service.accentColor, '--sc-glow': service.accentGlow }}
              >
                <div className="sc-content">
                  <span className="sc-tag">{service.tag}</span>
                  <h3 className="sc-title">{service.title}</h3>
                  <p className="sc-teaser">Your emails could look like this.</p>
                  <p className="sc-desc">{service.description}</p>
                  <div className="sc-badges">
                    {service.badges.map((b) => (
                      <span key={b} className="sc-badge">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="sc-visual">
                  <div className="sc-frame">
                    <div className="sc-frame-bar" aria-hidden="true">
                      <span className="sc-frame-dot" />
                      <span className="sc-frame-dot" />
                      <span className="sc-frame-dot" />
                      <div className="sc-frame-url" />
                    </div>
                    <div className="sc-frame-screen">
                      <button
                        type="button"
                        className="sc-zoom-btn"
                        onClick={() => setLightboxImg({ src: service.image, alt: service.alt })}
                        aria-label={`View ${service.title} example in fullscreen`}
                      >
                        <img src={service.image} alt={service.alt} className="sc-img" loading="lazy" />
                        <div className="sc-img-overlay" aria-hidden="true" />
                        <span className="sc-zoom-hint">Click to view fullscreen</span>
                      </button>
                    </div>
                  </div>
                  <div className="sc-glow-blob" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>

          <div className="showcase-cta-wrap">
            <p className="showcase-cta-label">Email template design from as low as $20.</p>
            <button
              type="button"
              className="showcase-cta-btn"
              onClick={() => onNavigate && onNavigate('contact')}
            >
              <span>Contact Us</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M9 4L13 8L9 12"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {lightboxImg && (
        <div
          className="sc-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image preview"
          onClick={() => setLightboxImg(null)}
        >
          <button type="button" className="sc-lightbox-close" aria-label="Close fullscreen view" onClick={() => setLightboxImg(null)}>
            <X size={24} />
          </button>
          <img src={lightboxImg.src} alt={lightboxImg.alt} className="sc-lightbox-img" onClick={(ev) => ev.stopPropagation()} />
        </div>
      )}

      {/* ── PROCESS ── */}
      <section className="process-section" aria-label="Our process — from idea to system">

        {/* Decorative spider-web SVG backdrop */}
        <div className="process-web-bg" aria-hidden="true">
          <svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" className="process-web-svg">
            {/* Spokes radiating from left-center anchor */}
            {Array.from({length: 12}, (_, i) => i * 30).map((deg) => {
              const rad = (deg * Math.PI) / 180
              return <line key={`spoke-${deg}`} x1="450" y1="250" x2={450 + 420 * Math.cos(rad)} y2={250 + 420 * Math.sin(rad)} stroke="rgba(124,164,255,0.06)" strokeWidth="1" />
            })}
            {/* Concentric rings */}
            {[80, 160, 240, 320, 400].map((r) => (
              <circle key={r} cx="450" cy="250" r={r} fill="none" stroke="rgba(124,164,255,0.05)" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="process-inner">

          {/* Section header */}
          <div className="process-header" ref={processRef}>
            <span className="process-eyebrow">HOW WE WORK</span>
            <h2 className="process-title">
              From Idea to{' '}
              <span className="process-title--web">System</span>
            </h2>
            <p className="process-subtitle">
              No guesswork. No shortcuts. Every project follows a disciplined four-stage process
              designed to deliver results you can measure and systems that actually last.
            </p>
          </div>

          {/* Web-threaded step flow */}
          <div className="process-flow">

            {/* Connector thread — spans across all nodes */}
            <div className="process-thread" aria-hidden="true">
              <svg className="process-thread-svg" viewBox="0 0 900 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main horizontal strand */}
                <line x1="80" y1="60" x2="820" y2="60" stroke="rgba(124,164,255,0.18)" strokeWidth="1.5" strokeDasharray="4 3" />
                {/* Cross-threads for web texture */}
                {[180, 360, 540, 720].map((x) => (
                  <g key={x}>
                    <line x1={x} y1="30" x2={x} y2="90" stroke="rgba(124,164,255,0.1)" strokeWidth="1" />
                    <line x1={x - 30} y1="20" x2={x + 30} y2="100" stroke="rgba(124,164,255,0.06)" strokeWidth="0.8" />
                    <line x1={x + 30} y1="20" x2={x - 30} y2="100" stroke="rgba(124,164,255,0.06)" strokeWidth="0.8" />
                    <circle cx={x} cy="60" r="5" fill="rgba(124,164,255,0.12)" stroke="rgba(124,164,255,0.3)" strokeWidth="1" />
                    <circle cx={x} cy="60" r="9" fill="none" stroke="rgba(124,164,255,0.12)" strokeWidth="0.8" />
                  </g>
                ))}
                {/* End anchors */}
                <circle cx="80" cy="60" r="3" fill="rgba(124,164,255,0.2)" />
                <circle cx="820" cy="60" r="3" fill="rgba(124,164,255,0.2)" />
              </svg>
            </div>

            {/* Steps */}
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="process-step"
                  ref={(el) => { processStepRefs.current[i] = el }}
                  style={{ '--ps-accent': step.accentColor, '--ps-glow': step.accentGlow }}
                >
                  {/* Node marker */}
                  <div className="process-node" aria-hidden="true">
                    <div className="process-node-ring" />
                    <div className="process-node-dot" />
                    <Icon className="process-node-icon" size={14} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="process-step-content">
                    <span className="process-step-num">{step.number}</span>
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-sub">{step.subtitle}</p>
                    <p className="process-step-desc">{step.description}</p>
                  </div>

                  {/* Vertical connector to content (mobile) */}
                  <div className="process-vert-line" aria-hidden="true" />
                </div>
              )
            })}
          </div>

        </div>

        {/* Ambient orbs */}
        <div className="process-orb process-orb--blue"   aria-hidden="true" />
        <div className="process-orb process-orb--violet" aria-hidden="true" />
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
                <svg className="insight-card-web insight-card-web--blue" viewBox="0 0 260 160" aria-hidden="true">
                  {/* 6-spoke hexagonal web */}
                  {[0,60,120,180,240,300].map((a, i) => {
                    const r = (a - 90) * Math.PI / 180;
                    return <line key={i} x1="130" y1="80" x2={(130 + 120 * Math.cos(r)).toFixed(1)} y2={(80 + 120 * Math.sin(r)).toFixed(1)} className="web-spoke" />;
                  })}
                  {[32,64,96].map((radius, ri) => (
                    <polygon key={ri} points={[0,60,120,180,240,300].map(a => {
                      const r = (a - 90) * Math.PI / 180;
                      return `${(130 + radius * Math.cos(r)).toFixed(1)},${(80 + radius * Math.sin(r)).toFixed(1)}`;
                    }).join(' ')} className="web-ring" />
                  ))}
                </svg>
                <span className="insight-card-num" aria-hidden="true">01</span>
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
              className="insight-card insight-card--pink"
              ref={(el) => { insightCardRefs.current[1] = el }}
              onClick={() => onNavigate && onNavigate('blog-2')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('blog-2')}
            >
              <div className="insight-card-visual insight-card-visual--pink">
                <div className="insight-card-orb insight-card-orb--pink" aria-hidden="true" />
                <svg className="insight-card-web insight-card-web--pink" viewBox="0 0 260 160" aria-hidden="true">
                  {/* 8-spoke circular web */}
                  {[0,45,90,135,180,225,270,315].map((a, i) => {
                    const r = (a - 90) * Math.PI / 180;
                    return <line key={i} x1="130" y1="80" x2={(130 + 120 * Math.cos(r)).toFixed(1)} y2={(80 + 120 * Math.sin(r)).toFixed(1)} className="web-spoke" />;
                  })}
                  {[28,56,84,112].map((radius, ri) => (
                    <polygon key={ri} points={[0,45,90,135,180,225,270,315].map(a => {
                      const r = (a - 90) * Math.PI / 180;
                      return `${(130 + radius * Math.cos(r)).toFixed(1)},${(80 + radius * Math.sin(r)).toFixed(1)}`;
                    }).join(' ')} className="web-ring" />
                  ))}
                </svg>
                <span className="insight-card-num" aria-hidden="true">02</span>
                <div className="insight-card-visual-bottom insight-card-visual-bottom--pink" aria-hidden="true" />
              </div>
              <div className="insight-card-body">
                <span className="insight-card-category insight-card-category--pink">
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
                    className="insight-card-btn insight-card-btn--pink"
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
                <svg className="insight-card-web insight-card-web--violet" viewBox="0 0 260 160" aria-hidden="true">
                  {/* 12-spoke dense web */}
                  {Array.from({length:12}, (_, i) => i * 30).map((a, i) => {
                    const r = (a - 90) * Math.PI / 180;
                    return <line key={i} x1="130" y1="80" x2={(130 + 120 * Math.cos(r)).toFixed(1)} y2={(80 + 120 * Math.sin(r)).toFixed(1)} className="web-spoke" />;
                  })}
                  {[36,72].map((radius, ri) => (
                    <polygon key={ri} points={Array.from({length:12}, (_, i) => i * 30).map(a => {
                      const r = (a - 90) * Math.PI / 180;
                      return `${(130 + radius * Math.cos(r)).toFixed(1)},${(80 + radius * Math.sin(r)).toFixed(1)}`;
                    }).join(' ')} className="web-ring" />
                  ))}
                </svg>
                <span className="insight-card-num" aria-hidden="true">03</span>
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
              className="insight-card insight-card--amber"
              ref={(el) => { insightCardRefs.current[3] = el }}
              onClick={() => onNavigate && onNavigate('blog-4')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('blog-4')}
            >
              <div className="insight-card-visual insight-card-visual--amber">
                <div className="insight-card-orb insight-card-orb--amber" aria-hidden="true" />
                <svg className="insight-card-web insight-card-web--amber" viewBox="0 0 260 160" aria-hidden="true">
                  {/* 9-spoke loose web */}
                  {Array.from({length:9}, (_, i) => i * 40).map((a, i) => {
                    const r = (a - 90) * Math.PI / 180;
                    return <line key={i} x1="130" y1="80" x2={(130 + 120 * Math.cos(r)).toFixed(1)} y2={(80 + 120 * Math.sin(r)).toFixed(1)} className="web-spoke" />;
                  })}
                  {[22,44,66,88,110].map((radius, ri) => (
                    <polygon key={ri} points={Array.from({length:9}, (_, i) => i * 40).map(a => {
                      const r = (a - 90) * Math.PI / 180;
                      return `${(130 + radius * Math.cos(r)).toFixed(1)},${(80 + radius * Math.sin(r)).toFixed(1)}`;
                    }).join(' ')} className="web-ring" />
                  ))}
                </svg>
                <span className="insight-card-num" aria-hidden="true">04</span>
                <div className="insight-card-visual-bottom insight-card-visual-bottom--amber" aria-hidden="true" />
              </div>
              <div className="insight-card-body">
                <span className="insight-card-category insight-card-category--amber">
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
                    className="insight-card-btn insight-card-btn--amber"
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
        <div className="insights-orb insights-orb--pink"   aria-hidden="true" />
      </section>

      {/* ── MINI ABOUT ── */}
      <section className="mini-about-section" aria-label="About MARSWEBZ">

        {/* Decorative web backdrop */}
        <div className="mini-about-web-bg" aria-hidden="true">
          <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="mini-about-web-svg">
            {Array.from({length: 10}, (_, i) => i * 36).map((deg) => {
              const rad = (deg * Math.PI) / 180
              return <line key={deg} x1="250" y1="250" x2={250 + 240 * Math.cos(rad)} y2={250 + 240 * Math.sin(rad)} stroke="rgba(124,164,255,0.07)" strokeWidth="1" />
            })}
            {[60, 120, 180, 240].map((r) => (
              <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="rgba(124,164,255,0.05)" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="mini-about-inner" ref={miniAboutRef}>

          {/* Text side */}
          <div className="mini-about-text">
            <span className="mini-about-eyebrow">WHO WE ARE</span>
            <h2 className="mini-about-title">
              Built With{' '}
              <span className="mini-about-title--web">Intention</span>
            </h2>
            <p className="mini-about-body">
              We&apos;re a digital systems studio focused on building businesses that work — not just look good.
            </p>
            <p className="mini-about-body">
              At MARSWEBZ, we combine strategy, design, and technology to create systems that are clear, scalable, and built for the future.
            </p>
            <p className="mini-about-body mini-about-body--muted">
              Every project we take on is approached with structure, purpose, and long-term thinking.
            </p>
            <button
              type="button"
              className="mini-about-btn"
              onClick={() => onNavigate && onNavigate('about')}
            >
              <span>Learn More</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Visual side */}
          <div className="mini-about-visual" aria-hidden="true">
            <div className="mini-about-glow" />
            <div className="mini-about-orb-ring mini-about-orb-ring--1" />
            <div className="mini-about-orb-ring mini-about-orb-ring--2" />
            <div className="mini-about-orb-ring mini-about-orb-ring--3" />
            <svg className="mini-about-web-art" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
              {Array.from({length: 12}, (_, i) => i * 30).map((deg) => {
                const rad = (deg * Math.PI) / 180
                return <line key={deg} x1="160" y1="160" x2={160 + 150 * Math.cos(rad)} y2={160 + 150 * Math.sin(rad)} stroke="rgba(124,164,255,0.18)" strokeWidth="1" />
              })}
              {[40, 80, 120].map((r) => (
                <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="rgba(124,164,255,0.12)" strokeWidth="1" />
              ))}
              <circle cx="160" cy="160" r="18" fill="rgba(124,164,255,0.08)" stroke="rgba(124,164,255,0.3)" strokeWidth="1.5" />
              <circle cx="160" cy="160" r="8" fill="rgba(124,164,255,0.35)" />
            </svg>
            <div className="mini-about-badge">
              <span className="mini-about-badge-num">∞</span>
              <span className="mini-about-badge-label">Systems thinking</span>
            </div>
          </div>

        </div>

        {/* Ambient orbs */}
        <div className="mini-about-amb-orb mini-about-amb-orb--blue"   aria-hidden="true" />
        <div className="mini-about-amb-orb mini-about-amb-orb--violet" aria-hidden="true" />
      </section>

      {/* ── BEYOND BUSINESS (CSR) ── */}
      <section className="csr-section" aria-label="Beyond Business — environmental commitment">

        <div className="csr-inner" ref={csrRef}>

          {/* Image side */}
          <div className="csr-visual">
            <div className="csr-img-wrap">
              <img
                src={turtleImg}
                alt="Sea turtle swimming in the ocean"
                className="csr-img"
                loading="lazy"
              />
              <div className="csr-img-overlay" aria-hidden="true" />
              <div className="csr-img-glow" aria-hidden="true" />
            </div>
            {/* Ripple rings */}
            <div className="csr-ripple csr-ripple--1" aria-hidden="true" />
            <div className="csr-ripple csr-ripple--2" aria-hidden="true" />
            <div className="csr-ripple csr-ripple--3" aria-hidden="true" />
          </div>

          {/* Text side */}
          <div className="csr-text">
            <span className="csr-eyebrow">OUR COMMITMENT</span>
            <h2 className="csr-title">
              Beyond{' '}
              <span className="csr-title--web">Business</span>
            </h2>
            <p className="csr-body">
              We believe building the future isn&apos;t just about technology — it&apos;s about responsibility.
            </p>
            <p className="csr-body">
              We&apos;re committed to supporting environmental initiatives and protecting our oceans for generations to come.
            </p>
            <div className="csr-wave-divider" aria-hidden="true">
              <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg" className="csr-wave-svg">
                <path d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10" fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" />
              </svg>
            </div>
            <a
              href="https://www.ocean.org/donate/"
              target="_blank"
              rel="noopener noreferrer"
              className="csr-btn"
            >
              <span>Support the Cause</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Ambient ocean orbs */}
        <div className="csr-orb csr-orb--teal"  aria-hidden="true" />
        <div className="csr-orb csr-orb--blue"  aria-hidden="true" />
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" aria-label="Frequently asked questions">

        {/* Decorative web backdrop */}
        <div className="faq-web-bg" aria-hidden="true">
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="faq-web-svg">
            {Array.from({length: 8}, (_, i) => i * 45).map((deg) => {
              const rad = (deg * Math.PI) / 180
              return <line key={deg} x1="300" y1="300" x2={300 + 280 * Math.cos(rad)} y2={300 + 280 * Math.sin(rad)} stroke="rgba(179,71,234,0.07)" strokeWidth="1" />
            })}
            {[70, 140, 210, 280].map((r) => (
              <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="rgba(179,71,234,0.05)" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="faq-inner">

          {/* Header */}
          <div className="faq-header" ref={faqRef}>
            <span className="faq-eyebrow">CLARITY FIRST</span>
            <h2 className="faq-title">
              Questions Worth{' '}
              <span className="faq-title--web">Asking</span>
            </h2>
            <p className="faq-subtitle">
              Everything you need to know before we start building together.
            </p>
          </div>

          {/* Accordion */}
          <div className="faq-list" role="list">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
                  role="listitem"
                >
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="faq-q">{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                    </span>
                  </button>
                  <div className="faq-body" aria-hidden={!isOpen}>
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* Ambient orbs */}
        <div className="faq-orb faq-orb--violet" aria-hidden="true" />
        <div className="faq-orb faq-orb--blue"   aria-hidden="true" />
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="contact-section" id="contact" aria-label="Contact — Let's build something together">

        {/* Decorative web backdrop */}
        <div className="contact-web-bg" aria-hidden="true">
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="contact-web-svg">
            {Array.from({length: 10}, (_, i) => i * 36).map((deg) => {
              const rad = (deg * Math.PI) / 180
              return <line key={deg} x1="300" y1="300" x2={300 + 290 * Math.cos(rad)} y2={300 + 290 * Math.sin(rad)} stroke="rgba(255,42,126,0.06)" strokeWidth="1" />
            })}
            {[60, 120, 185, 250].map((r) => (
              <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="rgba(255,42,126,0.04)" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="contact-inner" ref={contactRef}>

          {/* Header */}
          <div className="contact-header">
            <span className="contact-eyebrow">READY TO BEGIN?</span>
            <h2 className="contact-title">
              Let's Build Something{' '}
              <span className="contact-title--accent">Real</span>
            </h2>
            <div className="contact-invite">
              <p>♡ Let's build something amazing together ♡</p>
              <p>Reach out via the form below&nbsp;👇</p>
            </div>
          </div>

          {/* Form */}
          {contactStatus === 'sent' ? (
            <div className="contact-success" role="status">
              <span className="contact-success-icon" aria-hidden="true">✦</span>
              <h3 className="contact-success-title">Message received.</h3>
              <p className="contact-success-body">We review every submission personally. If there's a genuine fit, you'll hear from us within 48 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleContactSubmit}>

              <div className="contact-row contact-row--2">
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-name">Your name</label>
                  <input
                    id="cf-name"
                    className="contact-input"
                    type="text"
                    name="name"
                    placeholder="Jane Smith"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-email">Email address</label>
                  <input
                    id="cf-email"
                    className="contact-input"
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contact-row contact-row--2">
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-company">Company / Project name</label>
                  <input
                    id="cf-company"
                    className="contact-input"
                    type="text"
                    name="company"
                    placeholder="Acme Inc."
                    value={contactForm.company}
                    onChange={handleContactChange}
                    autoComplete="organization"
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-budget">Estimated budget</label>
                  <select
                    id="cf-budget"
                    className="contact-input contact-select"
                    name="budget"
                    value={contactForm.budget}
                    onChange={handleContactChange}
                    required
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="<$2k">Under $2,000</option>
                    <option value="$2k–$5k">$2,000 – $5,000</option>
                    <option value="$5k–$15k">$5,000 – $15,000</option>
                    <option value="$15k–$50k">$15,000 – $50,000</option>
                    <option value="$50k+">$50,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-idea">Tell us about your project</label>
                  <textarea
                    id="cf-idea"
                    className="contact-input contact-textarea"
                    name="idea"
                    placeholder="What are you building? What problem does it solve? What does success look like for you?"
                    value={contactForm.idea}
                    onChange={handleContactChange}
                    required
                    rows={5}
                  />
                </div>
              </div>

              {contactStatus === 'error' && (
                <p className="contact-error" role="alert">Message delivery failed. Please try again or email us directly.</p>
              )}

              <div className="contact-form-footer">
                <p className="contact-note">We work with founders, teams, and businesses ready to invest in quality. Every submission is reviewed by a real person.</p>
                <button
                  type="submit"
                  className="contact-btn"
                  disabled={contactStatus === 'sending'}
                >
                  {contactStatus === 'sending' ? 'Sending…' : 'Send your message →'}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Ambient orbs */}
        <div className="contact-orb contact-orb--pink"  aria-hidden="true" />
        <div className="contact-orb contact-orb--violet" aria-hidden="true" />
      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  )
}
