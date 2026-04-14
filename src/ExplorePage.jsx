import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Zap, BarChart2, Bot, Layers } from 'lucide-react'
import './ExplorePage.css'

/* ── HOOKS ── */

function useCountUp(target, duration = 2200, decimal = false) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(decimal
              ? Math.round(eased * target * 10) / 10
              : Math.round(eased * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration, decimal])

  return [count, nodeRef]
}

function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── STAT ITEM ── */

function StatItem({ value, suffix, label, decimal, delay }) {
  const [count, ref] = useCountUp(value, 2200, decimal)
  return (
    <div className="stat-item" ref={ref} style={{ '--delay': delay }}>
      <div className="stat-number">
        <span className="stat-value">{decimal ? count.toFixed(1) : count}</span>
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
    x: +(cx + r * Math.cos((n.angle * Math.PI) / 180)).toFixed(2),
    y: +(cy + r * Math.sin((n.angle * Math.PI) / 180)).toFixed(2),
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
  const [heroVisible, setHeroVisible] = useState(false)
  const [challengeRef, challengeVisible] = useScrollReveal()
  const [statsRef, statsVisible] = useScrollReveal()
  const [benefitsRef, benefitsVisible] = useScrollReveal()
  const [stepsRef, stepsVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="explore">

      {/* ── BACK NAV ── */}
      <div className="explore-back">
        <button
          type="button"
          className="back-btn"
          onClick={() => onNavigate && onNavigate('home')}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>HOME</span>
        </button>
        <span className="back-label">EXPLORE / 01</span>
      </div>

      {/* ── HERO ── */}
      <section className={`ex-hero${heroVisible ? ' ex-hero--visible' : ''}`} aria-label="Service introduction">
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
      <section
        className={`ex-section ex-challenge${challengeVisible ? ' ex-section--visible' : ''}`}
        ref={challengeRef}
        aria-label="The challenge"
      >
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
      <section
        className={`ex-section ex-stats${statsVisible ? ' ex-section--visible' : ''}`}
        ref={statsRef}
        aria-label="Statistics"
      >
        <p className="ex-overline ex-overline--center">02 — BY THE NUMBERS</p>
        <h2 className="ex-section-title ex-section-title--center">The data doesn't lie.</h2>
        <div className="ex-stats-grid">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} delay={`${i * 0.18}s`} />
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section
        className={`ex-section ex-benefits${benefitsVisible ? ' ex-section--visible' : ''}`}
        ref={benefitsRef}
        aria-label="Key benefits"
      >
        <p className="ex-overline">03 — WHY IT MATTERS</p>
        <h2 className="ex-section-title">Four pillars that<br />change everything.</h2>
        <div className="ex-benefits-grid">
          {BENEFITS.map(({ Icon, title, desc }, i) => (
            <article
              key={title}
              className="benefit-card"
              style={{ '--i': i }}
            >
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
      <section
        className={`ex-section ex-process${stepsVisible ? ' ex-section--visible' : ''}`}
        ref={stepsRef}
        aria-label="Our process"
      >
        <p className="ex-overline ex-overline--center">04 — HOW WE DO IT</p>
        <h2 className="ex-section-title ex-section-title--center">Four steps to transformation.</h2>
        <div className="ex-steps">
          {STEPS.map((step, i) => (
            <div key={step.num} className="ex-step" style={{ '--i': i }}>
              <div className="step-connector" aria-hidden="true" />
              <div className="step-num">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className={`ex-section ex-cta${ctaVisible ? ' ex-section--visible' : ''}`}
        ref={ctaRef}
        aria-label="Call to action"
      >
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
          onClick={() => onNavigate && onNavigate('home')}
        >
          <span>Book a Discovery Call</span>
        </button>
      </section>

    </div>
  )
}
