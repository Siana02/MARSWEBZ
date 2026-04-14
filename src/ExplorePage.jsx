import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, Zap, BarChart2, Bot, Layers } from 'lucide-react'
import './ExplorePage.css'

gsap.registerPlugin(ScrollTrigger)

/* ── STAT ITEM — data-* driven so GSAP can update the DOM directly ── */

function StatItem({ value, suffix, label, decimal }) {
  return (
    <div className="stat-item">
      <div className="stat-number">
        <span
          className="stat-value"
          data-target={value}
          data-decimal={decimal ? 'true' : 'false'}
        >0</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-rule" />
      <p className="stat-label">{label}</p>
    </div>
  )
}

/* ── NODE NETWORK SVG ── */

function NodeNetwork() {
  const cx = 220, cy = 170, r = 130
  const toRad = (deg) => (deg * Math.PI) / 180

  const nodeData = [
    { angle: 0,   label: 'CRM',       id: 'n0' },
    { angle: 45,  label: 'ERP',       id: 'n1' },
    { angle: 90,  label: 'CLOUD',     id: 'n2' },
    { angle: 135, label: 'HR',        id: 'n3' },
    { angle: 180, label: 'ANALYTICS', id: 'n4' },
    { angle: 225, label: 'FINANCE',   id: 'n5' },
    { angle: 270, label: 'DATA',      id: 'n6' },
    { angle: 315, label: 'OPS',       id: 'n7' },
  ].map(n => ({
    ...n,
    x: +(cx + r * Math.cos(toRad(n.angle))).toFixed(2),
    y: +(cy + r * Math.sin(toRad(n.angle))).toFixed(2),
  }))

  const crossPairs = [[0,1],[1,2],[2,3],[4,5],[5,6],[6,7]]

  return (
    <svg className="node-network" viewBox="0 0 440 340" aria-hidden="true">
      <defs>
        <filter id="nn-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hub-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hidden motion paths */}
      {nodeData.map(n => (
        <path key={`mp-${n.id}`} id={`mp-${n.id}`}
          d={`M ${cx} ${cy} L ${n.x} ${n.y}`} fill="none" stroke="none" />
      ))}

      {/* Cross-connections */}
      {crossPairs.map(([a, b]) => (
        <line key={`cross-${a}-${b}`}
          x1={nodeData[a].x} y1={nodeData[a].y}
          x2={nodeData[b].x} y2={nodeData[b].y}
          className="net-cross" />
      ))}

      {/* Hub → node spokes */}
      {nodeData.map((n, i) => (
        <line key={`spoke-${n.id}`}
          x1={cx} y1={cy} x2={n.x} y2={n.y}
          className="net-spoke"
          style={{ animationDelay: `${i * 0.22}s` }} />
      ))}

      {/* Outer nodes + labels */}
      {nodeData.map((n, i) => (
        <g key={`node-${n.id}`}>
          <circle cx={n.x} cy={n.y} r="8"
            className="net-node"
            filter="url(#nn-glow)"
            style={{ animationDelay: `${i * 0.3}s` }} />
          <text x={n.x} y={n.y + 20}
            className="net-label"
            textAnchor="middle">
            {n.label}
          </text>
          {/* Outbound packet */}
          <circle r="2.5" className="data-packet data-packet--out">
            <animateMotion dur={`${1.6 + i * 0.22}s`} repeatCount="indefinite"
              begin={`${i * 0.45}s`} calcMode="linear">
              <mpath href={`#mp-${n.id}`} />
            </animateMotion>
          </circle>
          {/* Inbound packet */}
          <circle r="2" className="data-packet data-packet--in">
            <animateMotion dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite"
              begin={`${i * 0.45 + 0.9}s`} calcMode="linear"
              keyPoints="1;0" keyTimes="0;1">
              <mpath href={`#mp-${n.id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* Center hub */}
      <circle cx={cx} cy={cy} r="44" className="hub-ring hub-ring--outer" />
      <circle cx={cx} cy={cy} r="32" className="hub-ring hub-ring--mid" />
      <circle cx={cx} cy={cy} r="20" className="hub-core" filter="url(#hub-glow)" />
      <text x={cx} y={cy + 4} className="hub-label" textAnchor="middle">HUB</text>
    </svg>
  )
}

/* ── MARQUEE ── */

const MARQUEE_TEXT = 'INFORMATION SYSTEMS — DATA INFRASTRUCTURE — BUSINESS INTELLIGENCE — PROCESS AUTOMATION — UNIFIED OPERATIONS — SMART INTEGRATION — '

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{MARQUEE_TEXT}</span>
        <span>{MARQUEE_TEXT}</span>
        <span>{MARQUEE_TEXT}</span>
      </div>
    </div>
  )
}

/* ── DATA ── */

const STATS = [
  { value: 74,  suffix: '%', label: 'of businesses report crippling data silos' },
  { value: 3.1, suffix: '×', label: 'faster decisions with unified systems', decimal: true },
  { value: 60,  suffix: '%', label: 'average reduction in operational costs' },
  { value: 240, suffix: '%', label: 'average ROI within the first 24 months' },
]

const BENEFITS = [
  { Icon: Zap,       title: 'UNIFIED DATA',      desc: 'Every tool, every department — connected. No more manual data transfers or version-mismatch chaos.' },
  { Icon: BarChart2, title: 'REAL-TIME INTEL',   desc: 'Live dashboards surface the signal in the noise, so you act on facts, not gut feeling.' },
  { Icon: Bot,       title: 'SMART AUTOMATION',  desc: 'Repetitive tasks disappear. Your team reclaims hours every week to focus on growth.' },
  { Icon: Layers,    title: 'BUILT TO SCALE',    desc: 'Infrastructure designed to grow from 10 to 10,000 employees without missing a beat.' },
]

const STEPS = [
  { num: '01', title: 'AUDIT',      desc: 'We map every system, tool, and workflow — exposing inefficiencies you never knew existed.' },
  { num: '02', title: 'ARCHITECT',  desc: 'A custom information blueprint tailored precisely to your business model and growth roadmap.' },
  { num: '03', title: 'INTEGRATE',  desc: 'Seamless connection of all platforms, zero downtime, full data migration included.' },
  { num: '04', title: 'OPTIMISE',   desc: 'Continuous monitoring and refinement so your systems evolve as fast as your ambitions.' },
]

/* ── MAIN COMPONENT ── */

export default function ExplorePage({ onNavigate }) {
  const containerRef = useRef(null)

  /* Prevent flash-of-unstyled-content for hero elements before GSAP runs */
  useLayoutEffect(() => {
    gsap.set([
      '.ex-hero .ex-overline',
      '.ex-word',
      '.ex-hero-sub',
      '.ex-scroll-hint',
    ], { autoAlpha: 0, y: 30 })
    gsap.set('.ex-word', { skewY: 3 })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO TIMELINE ── */
      const heroTl = gsap.timeline({ delay: 0.15 })
      heroTl
        .to('.ex-hero .ex-overline', {
          autoAlpha: 1, y: 0,
          duration: 0.55, ease: 'power2.out',
        })
        .to('.ex-word-1', {
          autoAlpha: 1, y: 0, skewY: 0,
          duration: 0.72, ease: 'power4.out',
        }, '-=0.1')
        .to('.ex-word-2', {
          autoAlpha: 1, y: 0, skewY: 0,
          duration: 0.72, ease: 'power4.out',
        }, '-=0.52')
        /* Electric flash on the accent word */
        .to('.ex-word-2', {
          textShadow: '0 0 70px rgba(124,164,255,0.95), 0 0 140px rgba(124,164,255,0.45)',
          duration: 0.18, ease: 'power2.in',
        }, '-=0.08')
        .to('.ex-word-2', {
          textShadow: '0 0 40px rgba(124,164,255,0.35), 0 0 80px rgba(124,164,255,0.15)',
          duration: 0.45, ease: 'power2.out',
        })
        .to('.ex-word-3', {
          autoAlpha: 1, y: 0, skewY: 0,
          duration: 0.72, ease: 'power4.out',
        }, '-=0.6')
        .to('.ex-hero-sub', {
          autoAlpha: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .to('.ex-scroll-hint', {
          autoAlpha: 1, y: 0,
          duration: 0.45, ease: 'power2.out',
        }, '-=0.1')

      /* ── CHALLENGE SECTION ── */
      const challengeTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ex-challenge',
          start: 'top 78%',
          once: true,
        },
      })
      challengeTl
        .from('.ex-challenge .ex-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.ex-challenge .ex-section-title', {
          autoAlpha: 0, x: -55, duration: 0.75, ease: 'power3.out',
        }, '-=0.2')
        .from('.ex-challenge .ex-section-body', {
          autoAlpha: 0, y: 22, stagger: 0.16, duration: 0.6, ease: 'power2.out',
        }, '-=0.35')
        .from('.ex-tag', {
          autoAlpha: 0, scale: 0.75, stagger: 0.09,
          duration: 0.4, ease: 'back.out(1.7)',
        }, '-=0.2')
        /* Node network powers on */
        .from('.node-network', {
          autoAlpha: 0, scale: 0.8, duration: 0.9, ease: 'power3.out',
        }, '-=0.85')
        .from('.net-spoke', {
          autoAlpha: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out',
        }, '-=0.65')
        .from('.net-node', {
          scale: 0, autoAlpha: 0, stagger: 0.07,
          duration: 0.45, ease: 'back.out(2)',
          transformOrigin: '50% 50%',
        }, '-=0.5')
        .from('.hub-core, .hub-ring', {
          scale: 0, autoAlpha: 0, duration: 0.55, ease: 'back.out(1.8)',
          transformOrigin: '50% 50%',
        }, '-=0.6')

      /* ── STATS SECTION ── */
      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ex-stats',
          start: 'top 78%',
          once: true,
        },
      })
      statsTl
        .from('.ex-stats .ex-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.ex-stats .ex-section-title', {
          autoAlpha: 0, y: 22, duration: 0.55, ease: 'power2.out',
        }, '-=0.2')
        .from('.stat-item', {
          autoAlpha: 0, y: 40, stagger: 0.14,
          duration: 0.7, ease: 'power3.out',
        }, '-=0.2')

      /* Count-up per stat value */
      gsap.utils.toArray('.stat-value').forEach((el) => {
        const target = parseFloat(el.dataset.target)
        const isDecimal = el.dataset.decimal === 'true'
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 2.3,
          ease: 'power3.out',
          onUpdate() {
            el.textContent = isDecimal
              ? counter.val.toFixed(1)
              : Math.round(counter.val)
          },
          scrollTrigger: {
            trigger: el.closest('.stat-item'),
            start: 'top 88%',
            once: true,
          },
        })
      })

      /* ── BENEFITS SECTION ── */
      const benefitsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ex-benefits',
          start: 'top 78%',
          once: true,
        },
      })
      benefitsTl
        .from('.ex-benefits .ex-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.ex-benefits .ex-section-title', {
          autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out',
        }, '-=0.2')
        .from('.benefit-card', {
          autoAlpha: 0,
          y: 55,
          rotationX: 18,
          transformPerspective: 900,
          stagger: 0.13,
          duration: 0.75,
          ease: 'power3.out',
        }, '-=0.2')

      /* ── PROCESS SECTION ── */
      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ex-process',
          start: 'top 78%',
          once: true,
        },
      })
      processTl
        .from('.ex-process .ex-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.ex-process .ex-section-title', {
          autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out',
        }, '-=0.2')
        /* Connecting line draws left → right */
        .from('.step-line', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.85,
          ease: 'power2.inOut',
        }, '-=0.1')
        /* Steps appear with stagger */
        .from('.ex-step', {
          autoAlpha: 0, y: 35, stagger: 0.15,
          duration: 0.65, ease: 'power3.out',
        }, '-=0.55')

      /* ── CTA SECTION ── */
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ex-cta',
          start: 'top 80%',
          once: true,
        },
      })
      ctaTl
        .from('.ex-cta .ex-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.ex-cta-title', {
          autoAlpha: 0, scale: 0.94, duration: 0.7, ease: 'power2.out',
        }, '-=0.2')
        /* Flash the accent span */
        .to('.ex-cta-accent', {
          textShadow: '0 0 60px rgba(124,164,255,0.9), 0 0 120px rgba(124,164,255,0.4)',
          duration: 0.22, ease: 'power2.in',
        }, '-=0.05')
        .to('.ex-cta-accent', {
          textShadow: '0 0 40px rgba(124,164,255,0.35)',
          duration: 0.5, ease: 'power2.out',
        })
        .from('.ex-cta-sub', {
          autoAlpha: 0, y: 18, duration: 0.55, ease: 'power2.out',
        }, '-=0.4')
        .from('.ex-cta-btn', {
          autoAlpha: 0, y: 22, duration: 0.5, ease: 'back.out(1.5)',
        }, '-=0.25')

    }, containerRef)

    return () => ctx.revert()
  }, [])

  /* Page-exit animation */
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
    <div className="explore" ref={containerRef}>

      {/* ── BACK NAV ── */}
      <div className="explore-back">
        <button
          type="button"
          className="back-btn"
          onClick={() => exitTo('home')}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>HOME</span>
        </button>
        <span className="back-label">EXPLORE / 01</span>
      </div>

      {/* ── HERO ── */}
      <section className="ex-hero" aria-label="Service introduction">
        <div className="ex-hero-scanlines" aria-hidden="true" />

        <p className="ex-overline">01 — INFORMATION SYSTEMS</p>

        <h1 className="ex-hero-title">
          <span className="ex-word ex-word-1">STREAMLINE.</span>
          <span className="ex-word ex-word-2">ACCELERATE.</span>
          <span className="ex-word ex-word-3">SCALE.</span>
        </h1>

        <p className="ex-hero-sub">
          Your business infrastructure, engineered for the future.
        </p>

        <div className="ex-scroll-hint" aria-hidden="true">
          <span>SCROLL</span>
          <div className="ex-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── THE CHALLENGE ── */}
      <section className="ex-section ex-challenge" aria-label="The challenge">
        <div className="ex-challenge-left">
          <p className="ex-overline">THE CHALLENGE</p>
          <h2 className="ex-section-title">
            Your data is working<br />
            <em>against</em> you.
          </h2>
          <p className="ex-section-body">
            Most businesses run on a patchwork of disconnected tools — CRMs that don't talk to finance, spreadsheets duplicating what your ERP already tracks, and decisions made on yesterday's numbers.
          </p>
          <p className="ex-section-body">
            Information systems streamlining fixes this at the root. We connect every layer of your business into one coherent, intelligent infrastructure.
          </p>
          <div className="ex-challenge-tags">
            {['Data Silos', 'Manual Errors', 'Slow Decisions', 'Wasted Hours'].map(t => (
              <span key={t} className="ex-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="ex-challenge-right">
          <NodeNetwork />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="ex-section ex-stats" aria-label="Statistics">
        <p className="ex-overline ex-overline--center">02 — BY THE NUMBERS</p>
        <h2 className="ex-section-title ex-section-title--center">The data doesn't lie.</h2>
        <div className="ex-stats-grid">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="ex-section ex-benefits" aria-label="Key benefits">
        <p className="ex-overline">03 — WHY IT MATTERS</p>
        <h2 className="ex-section-title">Four pillars that<br />change everything.</h2>
        <div className="ex-benefits-grid">
          {BENEFITS.map(({ Icon, title, desc }) => (
            <article key={title} className="benefit-card">
              <div className="benefit-icon-wrap" aria-hidden="true">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="benefit-title">{title}</h3>
              <p className="benefit-desc">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="ex-section ex-process" aria-label="Our process">
        <p className="ex-overline ex-overline--center">04 — HOW WE DO IT</p>
        <h2 className="ex-section-title ex-section-title--center">Four steps to transformation.</h2>
        <div className="ex-steps">
          {/* Connecting line — animated by GSAP scaleX */}
          <div className="step-line-wrap" aria-hidden="true">
            <div className="step-line" />
          </div>
          {STEPS.map((step, i) => (
            <div key={step.num} className="ex-step" style={{ '--i': i }}>
              <div className="step-num">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ex-section ex-cta" aria-label="Call to action">
        <p className="ex-overline ex-overline--center">05 — READY?</p>
        <h2 className="ex-cta-title">
          Transform your<br />
          <span className="ex-cta-accent">business infrastructure.</span>
        </h2>
        <p className="ex-cta-sub">
          Let's build the system your business deserves.
        </p>
        <button
          type="button"
          className="ex-cta-btn"
          onClick={() => exitTo('home')}
        >
          <span>Book a Discovery Call</span>
        </button>
      </section>

    </div>
  )
}
