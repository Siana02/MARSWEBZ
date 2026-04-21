import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Zap, Search, Layers, Database } from 'lucide-react'
import Footer from './Footer'
import { useSEO } from './useSEO'
import './WebsitesAppsPage.css'

gsap.registerPlugin(ScrollTrigger)

/* ── STAT ITEM ── */

function StatItem({ value, suffix, label, decimal }) {
  return (
    <div className="wa-stat-item">
      <div className="wa-stat-number">
        <span
          className="wa-stat-value"
          data-target={value}
          data-decimal={decimal ? 'true' : 'false'}
        >0</span>
        <span className="wa-stat-suffix">{suffix}</span>
      </div>
      <div className="wa-stat-rule" />
      <p className="wa-stat-label">{label}</p>
    </div>
  )
}

/* ── BROWSER PORTAL SVG — the unique artistic centrepiece ── */

function BrowserPortal() {
  /* Browser frame geometry */
  const bx = 70, by = 60, bw = 340, bh = 220, br = 12
  const tbh = 32
  const cby = by + tbh          /* content area top */
  const cbh = bh - tbh          /* content area height */
  const midX = bx + bw / 2     /* browser horizontal centre */
  const midY = by + bh / 2     /* browser vertical centre */

  /* Satellite nodes orbiting the browser */
  const satellites = [
    { label: 'SEO',      x: 406, y: 22,  id: 'ws0', dur: 4.2 },
    { label: 'SPEED',    x: 454, y: 148, id: 'ws1', dur: 3.6 },
    { label: 'UX',       x: 406, y: 318, id: 'ws2', dur: 5.0 },
    { label: 'API',      x: 74,  y: 318, id: 'ws3', dur: 5.8 },
    { label: 'DB',       x: 26,  y: 148, id: 'ws4', dur: 4.6 },
    { label: 'APP',      x: 74,  y: 22,  id: 'ws5', dur: 3.9 },
  ]

  /* Code lines inside the browser */
  const codeLines = [
    { y: 18,  w: 260, accent: true  },
    { y: 36,  w: 180, accent: false },
    { y: 54,  w: 210, accent: false },
    { y: 72,  w: 140, accent: true  },
    { y: 90,  w: 195, accent: false },
    { y: 108, w: 160, accent: false },
    { y: 126, w: 230, accent: true  },
    { y: 144, w: 110, accent: false },
    { y: 162, w: 195, accent: false },
    { y: 180, w: 150, accent: true  },
  ]

  return (
    <svg className="wa-browser-portal" viewBox="0 0 480 380" aria-hidden="true">
      <defs>
        <filter id="wa-pink-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="wa-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="wa-glow-heavy" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="wa-content-clip">
          <rect x={bx + 1} y={cby} width={bw - 2} height={cbh - 1} />
        </clipPath>
        {/* Motion paths from browser mid-edge to each satellite */}
        {satellites.map(sat => (
          <path key={`mp-${sat.id}`} id={`mp-${sat.id}`}
            d={`M ${midX} ${midY} L ${sat.x} ${sat.y}`}
            fill="none" stroke="none" />
        ))}
      </defs>

      {/* ── Outer ambient rings ── */}
      <circle cx={midX} cy={midY} r={200}
        fill="none" stroke="rgba(255,42,126,0.04)" strokeWidth="1" strokeDasharray="2 10" />
      <circle cx={midX} cy={midY} r={220}
        fill="none" stroke="rgba(255,42,126,0.03)" strokeWidth="1" strokeDasharray="2 14" />

      {/* ── Connection spokes ── */}
      {satellites.map((sat, i) => (
        <line key={`spoke-${sat.id}`}
          x1={midX} y1={midY}
          x2={sat.x} y2={sat.y}
          stroke="rgba(255,42,126,0.18)"
          strokeWidth="0.8"
          strokeDasharray="4 10"
          className="wa-sat-spoke"
          style={{ animationDelay: `${i * 0.28}s` }} />
      ))}

      {/* ── Browser ambient glow ── */}
      <rect x={bx - 6} y={by - 6} width={bw + 12} height={bh + 12} rx={br + 4}
        fill="none" stroke="rgba(255,42,126,0.10)" strokeWidth="1"
        className="wa-browser-outer-ring" />

      {/* ── Browser window frame ── */}
      <rect x={bx} y={by} width={bw} height={bh} rx={br}
        fill="rgba(7,11,24,0.96)"
        stroke="rgba(255,42,126,0.55)" strokeWidth="1.5"
        filter="url(#wa-soft-glow)" />

      {/* ── Title bar ── */}
      <path
        d={`M ${bx + br} ${by} L ${bx + bw - br} ${by}
            Q ${bx + bw} ${by} ${bx + bw} ${by + br}
            L ${bx + bw} ${by + tbh}
            L ${bx} ${by + tbh}
            L ${bx} ${by + br}
            Q ${bx} ${by} ${bx + br} ${by} Z`}
        fill="rgba(255,42,126,0.09)" />
      <line x1={bx} y1={by + tbh} x2={bx + bw} y2={by + tbh}
        stroke="rgba(255,42,126,0.35)" strokeWidth="0.8" />

      {/* Traffic light dots */}
      <circle cx={bx + 14} cy={by + tbh / 2} r={5}
        fill="rgba(255,42,126,0.9)" filter="url(#wa-pink-glow)" className="wa-dot-pulse" />
      <circle cx={bx + 28} cy={by + tbh / 2} r={5}
        fill="rgba(255,42,126,0.45)" />
      <circle cx={bx + 42} cy={by + tbh / 2} r={5}
        fill="rgba(255,42,126,0.20)" />

      {/* URL bar */}
      <rect x={bx + 60} y={by + 8} width={200} height={16} rx={8}
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,42,126,0.25)" strokeWidth="0.8" />
      <text x={bx + 75} y={by + 20}
        fill="rgba(255,110,170,0.75)"
        fontSize="7.5" fontFamily="'Orbitron', monospace" letterSpacing="0.06em">
        marswebz.com
      </text>
      {/* Lock icon approximation */}
      <circle cx={bx + 68} cy={by + 16} r={3}
        fill="none" stroke="rgba(255,42,126,0.5)" strokeWidth="0.8" />
      <rect x={bx + 65} y={by + 17} width={6} height={4} rx={1}
        fill="rgba(255,42,126,0.4)" />

      {/* ── Content area ── */}
      <g clipPath="url(#wa-content-clip)">
        {/* Content background grid */}
        <rect x={bx} y={cby} width={bw} height={cbh}
          fill="rgba(255,42,126,0.015)" />
        {/* Horizontal content scan line */}
        <rect x={bx} y={cby} width={bw} height={2}
          fill="rgba(255,42,126,0.3)" className="wa-scan-bar" />

        {/* Code lines */}
        {codeLines.map((line, i) => (
          <g key={i}>
            {/* Indent dot */}
            <circle cx={bx + 12} cy={cby + line.y + 4} r={2}
              fill={line.accent ? 'rgba(255,42,126,0.6)' : 'rgba(255,42,126,0.2)'}
              className="wa-code-dot"
              style={{ animationDelay: `${i * 0.12}s` }} />
            <rect
              x={bx + 20}
              y={cby + line.y}
              width={line.w}
              height={8}
              rx={3}
              fill={line.accent ? 'rgba(255,42,126,0.22)' : 'rgba(255,42,126,0.08)'}
              className="wa-code-line"
              style={{ animationDelay: `${i * 0.12}s` }} />
          </g>
        ))}

        {/* Blinking cursor */}
        <rect x={bx + 20} y={cby + 18}
          width={2} height={8} rx={1}
          fill="rgba(255,42,126,0.95)"
          className="wa-cursor-blink" />
      </g>

      {/* ── Satellite nodes ── */}
      {satellites.map((sat, i) => (
        <g key={sat.id}>
          {/* Outer ring */}
          <circle cx={sat.x} cy={sat.y} r={22}
            fill="none"
            stroke="rgba(255,42,126,0.15)"
            strokeWidth="1"
            className="wa-sat-outer"
            style={{ animationDelay: `${i * 0.35}s` }} />
          {/* Node */}
          <circle cx={sat.x} cy={sat.y} r={16}
            fill="rgba(255,42,126,0.08)"
            stroke="rgba(255,42,126,0.55)"
            strokeWidth="1.2"
            filter="url(#wa-pink-glow)"
            className="wa-sat-node"
            style={{ animationDelay: `${i * 0.35}s` }} />
          {/* Label */}
          <text x={sat.x} y={sat.y + 4}
            textAnchor="middle"
            fill="rgba(255,150,200,0.92)"
            fontSize="7" fontFamily="'Orbitron', monospace"
            fontWeight="700" letterSpacing="0.06em">
            {sat.label}
          </text>

          {/* Outbound data packet */}
          <circle r="2.5" fill="rgba(255,80,160,0.9)" filter="url(#wa-pink-glow)">
            <animateMotion dur={`${sat.dur}s`} repeatCount="indefinite"
              begin={`${i * 0.5}s`} calcMode="linear">
              <mpath href={`#mp-${sat.id}`} />
            </animateMotion>
          </circle>
          {/* Inbound data packet */}
          <circle r="1.8" fill="rgba(255,42,126,0.55)">
            <animateMotion dur={`${sat.dur * 1.1}s`} repeatCount="indefinite"
              begin={`${i * 0.5 + sat.dur / 2}s`} calcMode="linear"
              keyPoints="1;0" keyTimes="0;1">
              <mpath href={`#mp-${sat.id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* ── Centre hub glow ── */}
      <circle cx={midX} cy={midY} r={55}
        fill="none" stroke="rgba(255,42,126,0.08)" strokeWidth="1"
        className="wa-hub-ring" />
      <circle cx={midX} cy={midY} r={38}
        fill="none" stroke="rgba(255,42,126,0.14)" strokeWidth="1"
        className="wa-hub-ring" style={{ animationDelay: '0.6s' }} />
    </svg>
  )
}

/* ── MARQUEE ── */

const WA_MARQUEE_TEXT = 'WEB DESIGN — APP DEVELOPMENT — SEO STRATEGY — CUSTOM UX SYSTEMS — SPEED OPTIMIZATION — DATABASE ARCHITECTURE — DIGITAL DEPLOYMENT — '

function WaMarquee() {
  return (
    <div className="wa-marquee" aria-hidden="true">
      <div className="wa-marquee-track">
        <span>{WA_MARQUEE_TEXT}</span>
        <span>{WA_MARQUEE_TEXT}</span>
        <span>{WA_MARQUEE_TEXT}</span>
      </div>
    </div>
  )
}

/* ── DATA ── */

const WA_STATS = [
  { value: 75,  suffix: '%', label: 'of users judge a business\'s credibility from its website alone' },
  { value: 53,  suffix: '%', label: 'of mobile users abandon sites that load in over 3 seconds' },
  { value: 200, suffix: '%', label: 'average organic traffic increase with technical SEO done right' },
  { value: 380, suffix: '%', label: 'average ROI from conversion-optimised web design' },
]

const WA_BENEFITS = [
  {
    Icon: Search,
    num: '01',
    title: 'SEO ARCHITECTURE',
    desc: 'We build search dominance into the foundation — structured data, Core Web Vitals, semantic markup. Rank before your competitors even know the game changed.',
  },
  {
    Icon: Layers,
    num: '02',
    title: 'BESPOKE UX SYSTEMS',
    desc: 'Custom design systems and exclusive typography — your digital identity can\'t be cloned. Users feel the difference the moment they land on your site.',
  },
  {
    Icon: Zap,
    num: '03',
    title: 'ZERO-COMPROMISE SPEED',
    desc: 'Sub-second load times through asset optimisation, edge caching, and lean code. Speed isn\'t a feature — it\'s the entire first impression.',
  },
  {
    Icon: Database,
    num: '04',
    title: 'SCALABLE ARCHITECTURE',
    desc: 'Cloud-native infrastructure, optimised databases, and API-first design. Your digital platform grows with your ambition — no replatform required.',
  },
]

const WA_STEPS = [
  { num: '01', side: 'left',  title: 'DISCOVER',  desc: 'Full digital audit — your current footprint, competitor gaps, audience behaviour, and SEO baseline. We map the battlefield before we fight.' },
  { num: '02', side: 'right', title: 'DESIGN',    desc: 'Pixel-perfect wireframes to production-ready visuals. Custom typography, unique design system, and a UX flow engineered to convert.' },
  { num: '03', side: 'left',  title: 'DEVELOP',   desc: 'Clean, tested, optimised code. Mobile-first, accessibility-compliant, and fast out of the gate — from database to deployment pipeline.' },
  { num: '04', side: 'right', title: 'DOMINATE',  desc: 'Live launch, SEO indexing, performance monitoring, and iterative growth. We don\'t disappear after deployment — we accelerate.' },
]

/* ── MAIN COMPONENT ── */

export default function WebsitesAppsPage({ onNavigate }) {
  useSEO({
    title: 'Websites & Apps — MARSWEBZ',
    description: 'High-performance websites and web applications engineered for usability, conversion, and growth — built by MARSWEBZ for businesses worldwide.',
  })

  const containerRef = useRef(null)

  /* Prevent FOUC */
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    gsap.set([
      '.wa-hero .wa-overline',
      '.wa-word',
      '.wa-hero-sub',
      '.wa-scroll-hint',
    ], { autoAlpha: 0 })
    gsap.set('.wa-word-1', { x: -80, skewX: -5 })
    gsap.set('.wa-word-2', { scale: 0.7, transformOrigin: '50% 50%' })
    gsap.set('.wa-word-3', { x: 80, skewX: 5 })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO ── */
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .to('.wa-hero .wa-overline', {
          autoAlpha: 1, duration: 0.55, ease: 'power2.out',
        })
        .to('.wa-word-1', {
          autoAlpha: 1, x: 0, skewX: 0,
          duration: 0.85, ease: 'power4.out',
        }, '-=0.1')
        .to('.wa-word-2', {
          autoAlpha: 1, scale: 1,
          duration: 0.7, ease: 'back.out(1.6)',
        }, '-=0.5')
        /* Neon pink flash on accent word */
        .to('.wa-word-2', {
          textShadow: '0 0 80px rgba(255,42,126,0.95), 0 0 160px rgba(255,42,126,0.5)',
          duration: 0.22, ease: 'power2.in',
        }, '-=0.04')
        .to('.wa-word-2', {
          textShadow: '0 0 40px rgba(255,42,126,0.45), 0 0 80px rgba(255,42,126,0.18)',
          duration: 0.55, ease: 'power2.out',
        })
        .to('.wa-word-3', {
          autoAlpha: 1, x: 0, skewX: 0,
          duration: 0.85, ease: 'power4.out',
        }, '-=0.65')
        .to('.wa-hero-sub', {
          autoAlpha: 1, duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .to('.wa-scroll-hint', {
          autoAlpha: 1, duration: 0.45, ease: 'power2.out',
        }, '-=0.1')

      /* ── CHALLENGE ── */
      const challengeTl = gsap.timeline({
        scrollTrigger: { trigger: '.wa-challenge', start: 'top 78%', once: true },
      })
      challengeTl
        .from('.wa-challenge .wa-overline', {
          autoAlpha: 0, x: -24, duration: 0.5, ease: 'power2.out',
        })
        .from('.wa-challenge .wa-section-title', {
          autoAlpha: 0, x: -55, duration: 0.75, ease: 'power3.out',
        }, '-=0.15')
        .from('.wa-challenge .wa-section-body', {
          autoAlpha: 0, y: 22, stagger: 0.16, duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .from('.wa-ch-tag', {
          autoAlpha: 0, scale: 0.75, stagger: 0.09,
          duration: 0.4, ease: 'back.out(1.7)',
        }, '-=0.2')
        .from('.wa-browser-portal', {
          autoAlpha: 0, scale: 0.82, duration: 1.0, ease: 'power3.out',
        }, '-=0.9')
        .from('.wa-sat-spoke', {
          autoAlpha: 0, stagger: 0.09, duration: 0.4, ease: 'power2.out',
        }, '-=0.7')
        .from('.wa-sat-node, .wa-sat-outer', {
          scale: 0, autoAlpha: 0, stagger: 0.08,
          duration: 0.45, ease: 'back.out(2)',
          transformOrigin: '50% 50%',
        }, '-=0.5')

      /* ── STATS ── */
      const statsTl = gsap.timeline({
        scrollTrigger: { trigger: '.wa-stats', start: 'top 78%', once: true },
      })
      statsTl
        .from('.wa-stats .wa-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.wa-stats .wa-section-title', {
          autoAlpha: 0, y: 22, duration: 0.55, ease: 'power2.out',
        }, '-=0.2')
        .from('.wa-stat-item', {
          autoAlpha: 0, y: 40, stagger: 0.14,
          duration: 0.7, ease: 'power3.out',
        }, '-=0.2')

      /* Count-up */
      gsap.utils.toArray('.wa-stat-value').forEach((el) => {
        const target = parseFloat(el.dataset.target)
        const isDecimal = el.dataset.decimal === 'true'
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate() {
            el.textContent = isDecimal
              ? counter.val.toFixed(1)
              : Math.round(counter.val)
          },
          scrollTrigger: {
            trigger: el.closest('.wa-stat-item'),
            start: 'top 88%',
            once: true,
          },
        })
      })

      /* ── BENEFITS ── */
      const benefitsTl = gsap.timeline({
        scrollTrigger: { trigger: '.wa-benefits', start: 'top 78%', once: true },
      })
      benefitsTl
        .from('.wa-benefits .wa-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.wa-benefits .wa-section-title', {
          autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out',
        }, '-=0.2')
        .from('.wa-benefit-card', {
          autoAlpha: 0,
          y: 60,
          rotationX: 20,
          transformPerspective: 900,
          stagger: 0.13,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.25')

      /* ── PROCESS ── */
      const processTl = gsap.timeline({
        scrollTrigger: { trigger: '.wa-process', start: 'top 78%', once: true },
      })
      processTl
        .from('.wa-process .wa-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.wa-process .wa-section-title', {
          autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out',
        }, '-=0.2')
        .from('.wa-spine-line', {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1.1, ease: 'power2.inOut',
        }, '-=0.15')
        .from('.wa-step', {
          autoAlpha: 0,
          x: (i) => (i % 2 === 0 ? -50 : 50),
          stagger: 0.18,
          duration: 0.72, ease: 'power3.out',
        }, '-=0.75')

      /* ── CTA ── */
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: '.wa-cta', start: 'top 80%', once: true },
      })
      ctaTl
        .from('.wa-cta .wa-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.wa-cta-title', {
          autoAlpha: 0, scale: 0.92, duration: 0.7, ease: 'power2.out',
        }, '-=0.2')
        .to('.wa-cta-accent', {
          textShadow: '0 0 70px rgba(255,42,126,0.95), 0 0 140px rgba(255,42,126,0.5)',
          duration: 0.22, ease: 'power2.in',
        }, '-=0.05')
        .to('.wa-cta-accent', {
          textShadow: '0 0 40px rgba(255,42,126,0.45), 0 0 80px rgba(255,42,126,0.18)',
          duration: 0.5, ease: 'power2.out',
        })
        .from('.wa-cta-sub', {
          autoAlpha: 0, y: 18, duration: 0.55, ease: 'power2.out',
        }, '-=0.4')
        .from('.wa-cta-btn', {
          autoAlpha: 0, y: 22, duration: 0.5, ease: 'back.out(1.5)',
        }, '-=0.25')
        .from('.wa-service-nav', {
          autoAlpha: 0, y: 28, duration: 0.55, ease: 'power2.out',
        }, '-=0.1')

    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const exitTo = (target) => {
    gsap.to(containerRef.current, {
      autoAlpha: 0,
      y: -25,
      duration: 0.38,
      ease: 'power2.in',
      onComplete: () => onNavigate && onNavigate(target),
    })
  }

  return (
    <div className="wa-page" ref={containerRef}>

      {/* ── BACK NAV ── */}
      <div className="wa-back-nav">
        <button
          type="button"
          className="wa-back-btn"
          onClick={() => exitTo('home')}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>HOME</span>
        </button>
        <div className="wa-header-logo" aria-label="MARSWEBZ">
          MARS<span className="wa-header-logo-webz">WEBZ</span>
        </div>
        <span className="wa-item-num">03</span>
      </div>

      {/* ── HERO ── */}
      <section className="wa-hero" aria-label="Websites & Apps introduction">
        {/* Animated background layers */}
        <div className="wa-hero-bg" aria-hidden="true">
          <div className="wa-hero-orb wa-hero-orb-1" />
          <div className="wa-hero-orb wa-hero-orb-2" />
          <div className="wa-hero-orb wa-hero-orb-3" />
          <div className="wa-hero-grid" />
          <div className="wa-hero-scan" />
        </div>

        <p className="wa-overline">03 — WEBSITES &amp; APPS</p>

        <h1 className="wa-hero-title">
          <span className="wa-word wa-word-1">DESIGN.</span>
          <span className="wa-word wa-word-2">CAPTIVATE.</span>
          <span className="wa-word wa-word-3">CONVERT.</span>
        </h1>

        <p className="wa-hero-sub">
          Otherworldly digital experiences, engineered to rank, retain, and revenue.
        </p>

        <div className="wa-scroll-hint" aria-hidden="true">
          <span>SCROLL</span>
          <div className="wa-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <WaMarquee />

      {/* ── THE CHALLENGE ── */}
      <section className="wa-section wa-challenge" aria-label="The challenge">
        <div className="wa-challenge-left">
          <p className="wa-overline">THE CHALLENGE</p>
          <h2 className="wa-section-title">
            Your website is<br />
            <em>invisible.</em>
          </h2>
          <p className="wa-section-body">
            90% of websites never appear on the first page of search results. Slow load times, generic design, and poor UX don't just lose visitors — they actively push potential customers to your competitors.
          </p>
          <p className="wa-section-body">
            We engineer digital presences that don't just exist — they command. Custom-built experiences that make users stop, engage, and convert from the very first pixel.
          </p>
          <div className="wa-ch-tags">
            {['Low Traffic', 'Poor UX', 'Slow Performance', 'No SEO Strategy'].map(t => (
              <span key={t} className="wa-ch-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="wa-challenge-right">
          <BrowserPortal />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="wa-section wa-stats" aria-label="Statistics">
        <p className="wa-overline wa-overline--center">02 — BY THE NUMBERS</p>
        <h2 className="wa-section-title wa-section-title--center">
          Your digital presence is your biggest sales tool.
        </h2>
        <div className="wa-stats-grid">
          {WA_STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="wa-section wa-benefits" aria-label="Key benefits">
        <p className="wa-overline">03 — WHY IT MATTERS</p>
        <h2 className="wa-section-title">
          Four forces that make<br />your digital world unstoppable.
        </h2>
        <div className="wa-benefits-grid">
          {WA_BENEFITS.map(({ Icon, num, title, desc }) => (
            <article key={title} className="wa-benefit-card">
              <div className="wa-benefit-card-left" aria-hidden="true">
                <span className="wa-benefit-card-num">{num}</span>
                <div className="wa-benefit-icon-circle">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
              </div>
              <div className="wa-benefit-card-divider" aria-hidden="true" />
              <div className="wa-benefit-card-right">
                <h3 className="wa-benefit-title">{title}</h3>
                <p className="wa-benefit-desc">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROCESS — zigzag vertical timeline ── */}
      <section className="wa-section wa-process" aria-label="Our process">
        <p className="wa-overline wa-overline--center">04 — HOW WE DO IT</p>
        <h2 className="wa-section-title wa-section-title--center">
          From concept to conquest.<br />
          <em>Four stages. Zero compromise.</em>
        </h2>
        <div className="wa-timeline">
          {/* Central vertical spine */}
          <div className="wa-spine-wrap" aria-hidden="true">
            <div className="wa-spine-line" />
          </div>
          {WA_STEPS.map((step) => (
            <div key={step.num} className={`wa-step wa-step--${step.side}`}>
              <div className="wa-step-connector" aria-hidden="true" />
              <div className="wa-step-dot" aria-hidden="true" />
              <div className="wa-step-card">
                <span className="wa-step-num">{step.num}</span>
                <h3 className="wa-step-title">{step.title}</h3>
                <p className="wa-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="wa-section wa-cta" aria-label="Call to action">
        <p className="wa-overline wa-overline--center">05 — READY TO DOMINATE?</p>
        <h2 className="wa-cta-title">
          Launch your<br />
          <span className="wa-cta-accent">digital empire.</span>
        </h2>
        <p className="wa-cta-sub">
          Let's build the digital experience your business deserves — and your competitors fear.
        </p>
        <button
          type="button"
          className="wa-cta-btn"
          onClick={() => exitTo('home')}
        >
          <span>Start Your Project</span>
        </button>

        <div className="wa-service-nav" aria-label="Service navigation">
          <div className="wa-service-nav-row">
            <button
              type="button"
              className="wa-service-nav-card wa-service-nav-card--prev"
              onClick={() => exitTo('brand-management')}
              aria-label="Previous: 02 — Brand Management"
            >
              <ArrowLeft className="wa-service-nav-arrow" size={22} strokeWidth={1.5} />
              <div className="wa-service-nav-body">
                <span className="wa-service-nav-title">BRAND MANAGEMENT</span>
                <span className="wa-service-nav-hint">Define · Elevate · Inspire</span>
              </div>
              <div className="wa-service-nav-meta">
                <span className="wa-service-nav-label">PREVIOUS</span>
                <span className="wa-service-nav-num">02</span>
              </div>
            </button>

            <div className="wa-service-dots" aria-label="Service 3 of 4" role="list">
              <span className="wa-service-dot" role="listitem" aria-label="01" />
              <span className="wa-service-dot" role="listitem" aria-label="02" />
              <span className="wa-service-dot wa-service-dot--active" role="listitem" aria-label="03 current" />
              <span className="wa-service-dot" role="listitem" aria-label="04" />
            </div>

            <button
              type="button"
              className="wa-service-nav-card wa-service-nav-card--next"
              onClick={() => exitTo('automation-ai')}
              aria-label="Next: 04 — Automation & AI"
            >
              <div className="wa-service-nav-meta">
                <span className="wa-service-nav-label">NEXT</span>
                <span className="wa-service-nav-num">04</span>
              </div>
              <div className="wa-service-nav-body">
                <span className="wa-service-nav-title">AUTOMATION &amp; AI</span>
                <span className="wa-service-nav-hint">Automate · Intelligently · Scale</span>
              </div>
              <ArrowRight className="wa-service-nav-arrow" size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  )
}
