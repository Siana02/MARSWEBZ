import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Bot, Cpu, Brain, Eye, TrendingUp,
  Zap, Network, GitMerge, ScanLine, BarChart3, Layers,
} from 'lucide-react'
import Footer from './Footer'
import './AutomationAIPage.css'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════
   STAT ITEM
   ══════════════════════════════════════════════ */
function StatItem({ value, suffix, label, decimal }) {
  return (
    <div className="ai-stat-item">
      <div className="ai-stat-number">
        <span
          className="ai-stat-value"
          data-target={value}
          data-decimal={decimal ? 'true' : 'false'}
        >0</span>
        <span className="ai-stat-suffix">{suffix}</span>
      </div>
      <div className="ai-stat-rule" />
      <p className="ai-stat-label">{label}</p>
    </div>
  )
}

/* ══════════════════════════════════════════════
   NEURAL NETWORK SVG
   Multi-layer feedforward network — distinctly AI
   ══════════════════════════════════════════════ */
function NeuralNet() {
  const inputNodes  = [60, 120, 180, 240, 300].map(y => ({ x: 70,  y }))
  const hiddenNodes = [40, 100, 170, 240, 300].map(y => ({ x: 230, y }))
  const outputNodes = [100, 180, 260].map(y => ({ x: 390, y }))

  /* Motion paths from each input to each hidden node (subset for packets) */
  const pktPaths = [
    { from: inputNodes[0], to: hiddenNodes[2], id: 'p0', dur: 2.1 },
    { from: inputNodes[1], to: hiddenNodes[1], id: 'p1', dur: 2.6 },
    { from: inputNodes[2], to: hiddenNodes[3], id: 'p2', dur: 1.9 },
    { from: inputNodes[3], to: hiddenNodes[0], id: 'p3', dur: 2.4 },
    { from: inputNodes[4], to: hiddenNodes[4], id: 'p4', dur: 2.0 },
    { from: hiddenNodes[0], to: outputNodes[0], id: 'p5', dur: 1.7 },
    { from: hiddenNodes[2], to: outputNodes[1], id: 'p6', dur: 2.2 },
    { from: hiddenNodes[4], to: outputNodes[2], id: 'p7', dur: 1.8 },
  ]

  const inputLabels  = ['PROCESS', 'SCHEDULE', 'DATA', 'WORKFLOW', 'REQUEST']
  const outputLabels = ['AUTOMATE', 'OPTIMISE', 'PREDICT']

  return (
    <svg className="ai-neural-net" viewBox="0 0 460 340" aria-hidden="true">
      <defs>
        <filter id="ai-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ai-glow-lg" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Motion paths for packets */}
        {pktPaths.map(p => (
          <path key={`mp-${p.id}`} id={`mp-${p.id}`}
            d={`M ${p.from.x} ${p.from.y} L ${p.to.x} ${p.to.y}`}
            fill="none" stroke="none" />
        ))}
      </defs>

      {/* ── Layer labels ── */}
      <text x="70"  y="22" className="ai-nn-label" textAnchor="middle">INPUT</text>
      <text x="230" y="16" className="ai-nn-label" textAnchor="middle">HIDDEN</text>
      <text x="390" y="80" className="ai-nn-label" textAnchor="middle">OUTPUT</text>

      {/* ── Input → Hidden connections ── */}
      {inputNodes.map((inp, ii) =>
        hiddenNodes.map((hid, hi) => (
          <line key={`ih-${ii}-${hi}`}
            x1={inp.x} y1={inp.y} x2={hid.x} y2={hid.y}
            className="ai-nn-conn"
            style={{ animationDelay: `${(ii + hi) * 0.15}s` }} />
        ))
      )}

      {/* ── Hidden → Output connections ── */}
      {hiddenNodes.map((hid, hi) =>
        outputNodes.map((out, oi) => (
          <line key={`ho-${hi}-${oi}`}
            x1={hid.x} y1={hid.y} x2={out.x} y2={out.y}
            className="ai-nn-conn--active"
            style={{ animationDelay: `${(hi + oi) * 0.18}s` }} />
        ))
      )}

      {/* ── Input nodes ── */}
      {inputNodes.map((n, i) => (
        <g key={`in-${i}`}>
          <circle cx={n.x} cy={n.y} r={7}
            fill="rgba(179,71,234,0.65)"
            className="ai-nn-node"
            filter="url(#ai-glow-sm)"
            style={{ animationDelay: `${i * 0.25}s` }} />
          <text x={n.x - 16} y={n.y + 4}
            className="ai-nn-node-label"
            textAnchor="end">
            {inputLabels[i]}
          </text>
        </g>
      ))}

      {/* ── Hidden nodes ── */}
      {hiddenNodes.map((n, i) => (
        <g key={`hid-${i}`}>
          {/* Outer glow ring */}
          <circle cx={n.x} cy={n.y} r={14}
            fill="none"
            stroke="rgba(179,71,234,0.20)"
            strokeWidth="1"
            className="ai-nn-ring"
            style={{ animationDelay: `${i * 0.28}s` }} />
          <circle cx={n.x} cy={n.y} r={8}
            fill="rgba(122,30,196,0.80)"
            className="ai-nn-node--hidden"
            filter="url(#ai-glow-sm)"
            style={{ animationDelay: `${i * 0.28}s` }} />
        </g>
      ))}

      {/* ── Output nodes ── */}
      {outputNodes.map((n, i) => (
        <g key={`out-${i}`}>
          <circle cx={n.x} cy={n.y} r={18}
            fill="none"
            stroke="rgba(179,71,234,0.22)"
            strokeWidth="1"
            className="ai-nn-ring"
            style={{ animationDelay: `${i * 0.3}s` }} />
          <circle cx={n.x} cy={n.y} r={11}
            fill="rgba(179,71,234,0.80)"
            className="ai-nn-node"
            filter="url(#ai-glow-lg)"
            style={{ animationDelay: `${i * 0.3}s` }} />
          <text x={n.x + 22} y={n.y + 4}
            className="ai-nn-node-label"
            textAnchor="start">
            {outputLabels[i]}
          </text>
        </g>
      ))}

      {/* ── Animated data packets ── */}
      {pktPaths.map((p, i) => (
        <g key={p.id}>
          <circle r="2.5" className="ai-nn-pulse" filter="url(#ai-glow-sm)">
            <animateMotion dur={`${p.dur}s`} repeatCount="indefinite"
              begin={`${i * 0.55}s`} calcMode="linear">
              <mpath href={`#mp-${p.id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
    </svg>
  )
}

/* ══════════════════════════════════════════════
   HERO PARTICLES (CSS-only via inline styles)
   ══════════════════════════════════════════════ */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${4 + Math.random() * 92}%`,
  top: `${5 + Math.random() * 90}%`,
  dur: `${6 + Math.random() * 7}s`,
  delay: `${Math.random() * 6}s`,
  size: Math.random() > 0.7 ? 3 : 2,
}))

function HeroParticles() {
  return (
    <div className="ai-hero-particles" aria-hidden="true">
      {PARTICLES.map(p => (
        <span
          key={p.id}
          className="ai-particle"
          style={{
            left: p.left,
            top: p.top,
            '--dur': p.dur,
            '--delay': p.delay,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   MARQUEE
   ══════════════════════════════════════════════ */
const AI_MARQUEE = 'INTELLIGENT AUTOMATION — MACHINE LEARNING — AGENTIC AI — HYPERAUTOMATION — NEURAL NETWORKS — LLM INTEGRATION — PREDICTIVE ANALYTICS — COMPUTER VISION — AUTONOMOUS WORKFLOWS — '

function AiMarquee() {
  return (
    <div className="ai-marquee" aria-hidden="true">
      <div className="ai-marquee-track">
        <span>{AI_MARQUEE}</span>
        <span>{AI_MARQUEE}</span>
        <span>{AI_MARQUEE}</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */
const AI_STATS = [
  { value: 85,  suffix: '%', label: 'of business workflows contain automatable components' },
  { value: 4.2, suffix: '×', label: 'average efficiency gain from intelligent automation', decimal: true },
  { value: 40,  suffix: '%', label: 'average operational cost reduction' },
  { value: 320, suffix: '%', label: 'average ROI within 24 months of AI integration' },
]

const AI_BENEFITS = [
  {
    Icon: Bot,
    title: 'INTELLIGENT PROCESS AUTOMATION',
    desc: 'Eliminate bottlenecks with AI-powered workflows that execute, adapt, and improve — without human intervention. From invoice processing to customer onboarding, fully automated end-to-end.',
    badge: 'CORE ENGINE',
    wide: true,
    featured: true,
  },
  {
    Icon: TrendingUp,
    title: 'PREDICTIVE INTELLIGENCE',
    desc: 'Forecast demand, detect anomalies, and surface insights before problems occur. AI that thinks ahead so you always stay ahead.',
    badge: 'ML ANALYTICS',
    wide: false,
    featured: false,
  },
  {
    Icon: Cpu,
    title: 'AUTONOMOUS AI AGENTS',
    desc: 'Deploy agents that plan, decide, and act across complex multi-step tasks — CRM updates, emails, reporting — all handled autonomously.',
    badge: 'AGENTIC AI',
    wide: false,
    featured: false,
  },
  {
    Icon: Eye,
    title: 'COMPUTER VISION',
    desc: 'AI eyes that inspect products, process documents, and analyse visual data at machine speed with surgical precision.',
    badge: 'VISION AI',
    wide: false,
    featured: false,
  },
  {
    Icon: Zap,
    title: '24/7 AUTONOMOUS OPERATIONS',
    desc: 'AI systems that never sleep. Continuous monitoring, instant response, and self-correcting automation running round-the-clock — no burnout, no downtime.',
    badge: 'ALWAYS ON',
    wide: true,
    featured: false,
  },
]

const AI_TRENDS = [
  {
    Icon: Brain,
    num: '01',
    title: 'AGENTIC AI',
    desc: 'Autonomous agents that plan, reason, and execute complex multi-step tasks without human direction — reshaping how knowledge work gets done.',
    tag: 'EMERGING NOW',
  },
  {
    Icon: Network,
    num: '02',
    title: 'LLM INTEGRATION',
    desc: 'Large language models embedded directly into business logic for intelligent decision-making, document processing, and customer interaction.',
    tag: 'MAINSTREAM',
  },
  {
    Icon: Layers,
    num: '03',
    title: 'HYPERAUTOMATION',
    desc: 'Combining RPA, AI, machine learning, and process mining for end-to-end enterprise automation that spans every department.',
    tag: 'ENTERPRISE',
  },
  {
    Icon: GitMerge,
    num: '04',
    title: 'MLOPS & AUTOML',
    desc: 'Self-optimising models that continuously learn from new data — systems that improve over time without manual retraining cycles.',
    tag: 'SCALING FAST',
  },
  {
    Icon: BarChart3,
    num: '05',
    title: 'AI-AUGMENTED ANALYTICS',
    desc: 'Real-time predictive intelligence replacing reactive reporting. Decisions made before problems occur, not after dashboards are reviewed.',
    tag: 'HIGH IMPACT',
  },
  {
    Icon: ScanLine,
    num: '06',
    title: 'EDGE AI',
    desc: 'On-device inference delivering instant, privacy-first automation — AI that processes locally without cloud latency.',
    tag: 'NEXT FRONTIER',
  },
]

const AI_STEPS = [
  {
    num: '01',
    cmd: './ai_audit --scope full --detect-bottlenecks',
    statusParts: { plain: '> Scanning 847 manual touchpoints... done', highlight: null },
    title: 'AUDIT',
    desc: 'We dissect every workflow — identifying manual bottlenecks, repetitive tasks, and data choke-points ripe for automation. No assumption goes unvalidated.',
  },
  {
    num: '02',
    cmd: './ai_architect --model gpt-ops --output blueprint.json',
    statusParts: { plain: '> Architecture generated... 94% efficiency gain projected', highlight: null },
    title: 'ARCHITECT',
    desc: 'Design the AI automation blueprint — selecting the right models, tools, and integration points for your specific operations and scale targets.',
  },
  {
    num: '03',
    cmd: './ai_deploy --stack integrate --zero-downtime true',
    statusParts: { plain: '> Systems connected... ', highlight: '[████████████] 100% COMPLETE' },
    title: 'INTEGRATE',
    desc: 'Seamlessly deploy AI agents and automation layers across your entire tech stack. Zero downtime. Full data continuity. Instant operational uplift.',
  },
  {
    num: '04',
    cmd: './ai_evolve --monitor live --retrain auto --expand true',
    statusParts: { plain: '> Model accuracy: 98.7%  Throughput: +340%  Errors: -91%', highlight: null },
    title: 'EVOLVE',
    desc: 'Monitor performance, retrain models, and continuously expand automation coverage. Your AI systems grow more powerful as your business scales.',
  },
]

/* ══════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════ */
export default function AutomationAIPage({ onNavigate }) {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    gsap.set([
      '.ai-hero .ai-overline',
      '.ai-word',
      '.ai-hero-sub',
      '.ai-hero-tags',
      '.ai-scroll-hint',
    ], { autoAlpha: 0, y: 30 })
    gsap.set('.ai-word', { skewY: 3 })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO TIMELINE ── */
      const heroTl = gsap.timeline({ delay: 0.15 })
      heroTl
        .to('.ai-hero .ai-overline', {
          autoAlpha: 1, y: 0,
          duration: 0.55, ease: 'power2.out',
        })
        .to('.ai-word-1', {
          autoAlpha: 1, y: 0, skewY: 0,
          duration: 0.72, ease: 'power4.out',
        }, '-=0.1')
        .to('.ai-word-2', {
          autoAlpha: 1, y: 0, skewY: 0,
          duration: 0.72, ease: 'power4.out',
        }, '-=0.52')
        /* Electric purple flash */
        .to('.ai-word-2', {
          textShadow: '0 0 80px rgba(179,71,234,0.99), 0 0 160px rgba(179,71,234,0.55)',
          duration: 0.18, ease: 'power2.in',
        }, '-=0.08')
        .to('.ai-word-2', {
          textShadow: '0 0 40px rgba(179,71,234,0.38), 0 0 80px rgba(179,71,234,0.16)',
          duration: 0.5, ease: 'power2.out',
        })
        .to('.ai-word-3', {
          autoAlpha: 1, y: 0, skewY: 0,
          duration: 0.72, ease: 'power4.out',
        }, '-=0.6')
        .to('.ai-hero-sub', {
          autoAlpha: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .to('.ai-hero-tags', {
          autoAlpha: 1, y: 0,
          duration: 0.5, ease: 'power2.out',
        }, '-=0.2')
        .to('.ai-scroll-hint', {
          autoAlpha: 1, y: 0,
          duration: 0.45, ease: 'power2.out',
        }, '-=0.1')

      /* ── CHALLENGE SECTION ── */
      const challengeTl = gsap.timeline({
        scrollTrigger: { trigger: '.ai-challenge', start: 'top 78%', once: true },
      })
      challengeTl
        .from('.ai-challenge .ai-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.ai-challenge .ai-section-title', {
          autoAlpha: 0, x: -55, duration: 0.75, ease: 'power3.out',
        }, '-=0.2')
        .from('.ai-challenge .ai-section-body', {
          autoAlpha: 0, y: 22, stagger: 0.16, duration: 0.6, ease: 'power2.out',
        }, '-=0.35')
        .from('.ai-tag', {
          autoAlpha: 0, scale: 0.75, stagger: 0.09,
          duration: 0.4, ease: 'back.out(1.7)',
        }, '-=0.2')
        /* Neural net powers on */
        .from('.ai-neural-net', {
          autoAlpha: 0, scale: 0.8, duration: 1.0, ease: 'power3.out',
        }, '-=0.85')
        .from('.ai-nn-conn, .ai-nn-conn--active', {
          autoAlpha: 0, stagger: 0.025, duration: 0.3, ease: 'power2.out',
        }, '-=0.7')
        .from('.ai-nn-node, .ai-nn-node--hidden', {
          scale: 0, autoAlpha: 0, stagger: 0.07,
          duration: 0.45, ease: 'back.out(2)',
          transformOrigin: '50% 50%',
        }, '-=0.5')

      /* ── STATS ── */
      const statsTl = gsap.timeline({
        scrollTrigger: { trigger: '.ai-stats', start: 'top 78%', once: true },
      })
      statsTl
        .from('.ai-stats .ai-overline', { autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out' })
        .from('.ai-stats .ai-section-title', { autoAlpha: 0, y: 22, duration: 0.55, ease: 'power2.out' }, '-=0.2')
        .from('.ai-stat-item', { autoAlpha: 0, y: 40, stagger: 0.14, duration: 0.7, ease: 'power3.out' }, '-=0.2')

      gsap.utils.toArray('.ai-stat-value').forEach((el) => {
        const target = parseFloat(el.dataset.target)
        const isDecimal = el.dataset.decimal === 'true'
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 2.4,
          ease: 'power3.out',
          onUpdate() {
            el.textContent = isDecimal
              ? counter.val.toFixed(1)
              : Math.round(counter.val)
          },
          scrollTrigger: {
            trigger: el.closest('.ai-stat-item'),
            start: 'top 88%',
            once: true,
          },
        })
      })

      /* ── BENEFITS BENTO ── */
      const bentoTl = gsap.timeline({
        scrollTrigger: { trigger: '.ai-benefits', start: 'top 78%', once: true },
      })
      bentoTl
        .from('.ai-benefits .ai-overline', { autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out' })
        .from('.ai-benefits .ai-section-title', { autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .from('.ai-bento-card', {
          autoAlpha: 0,
          y: 60,
          scale: 0.95,
          stagger: { amount: 0.5 },
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.25')

      /* ── TRENDS ── */
      const trendsTl = gsap.timeline({
        scrollTrigger: { trigger: '.ai-trends', start: 'top 78%', once: true },
      })
      trendsTl
        .from('.ai-trends .ai-overline', { autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out' })
        .from('.ai-trends .ai-section-title', { autoAlpha: 0, y: 22, duration: 0.55, ease: 'power2.out' }, '-=0.2')
        .from('.ai-trend-card', {
          autoAlpha: 0,
          y: 45,
          rotationX: 12,
          transformPerspective: 900,
          stagger: 0.10,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.2')

      /* ── PROCESS ── */
      const processTl = gsap.timeline({
        scrollTrigger: { trigger: '.ai-process', start: 'top 78%', once: true },
      })
      processTl
        .from('.ai-process .ai-overline', { autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out' })
        .from('.ai-process .ai-section-title', { autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .from('.ai-terminal-card', {
          autoAlpha: 0,
          y: 45,
          stagger: 0.15,
          duration: 0.72,
          ease: 'power3.out',
        }, '-=0.2')

      /* Progress bars animate on scroll */
      gsap.utils.toArray('.ai-terminal-progress').forEach((bar, i) => {
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.8,
            ease: 'power2.inOut',
            delay: 0.4 + i * 0.15,
            scrollTrigger: {
              trigger: bar.closest('.ai-terminal-card'),
              start: 'top 88%',
              once: true,
            },
          },
        )
      })

      /* ── CTA ── */
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: '.ai-cta', start: 'top 80%', once: true },
      })
      ctaTl
        .from('.ai-cta .ai-overline', { autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out' })
        .from('.ai-cta-title', { autoAlpha: 0, scale: 0.93, duration: 0.7, ease: 'power2.out' }, '-=0.2')
        .to('.ai-cta-accent', {
          textShadow: '0 0 70px rgba(179,71,234,0.95), 0 0 140px rgba(179,71,234,0.45)',
          duration: 0.22, ease: 'power2.in',
        }, '-=0.05')
        .to('.ai-cta-accent', {
          textShadow: '0 0 40px rgba(179,71,234,0.38)',
          duration: 0.5, ease: 'power2.out',
        })
        .from('.ai-cta-sub', { autoAlpha: 0, y: 18, duration: 0.55, ease: 'power2.out' }, '-=0.4')
        .from('.ai-cta-btn', { autoAlpha: 0, y: 22, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.25')
        .from('.ai-service-nav', { autoAlpha: 0, y: 28, duration: 0.55, ease: 'power2.out' }, '-=0.15')

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
    <div className="ai-page" ref={containerRef}>

      {/* ── BACK NAV ── */}
      <div className="ai-back-nav">
        <button
          type="button"
          className="ai-back-btn"
          onClick={() => exitTo('home')}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>HOME</span>
        </button>
        <div className="ai-header-logo" aria-label="MARSWEBZ">
          MARS<span className="ai-header-logo-webz">WEBZ</span>
        </div>
        <span className="ai-item-num">04</span>
      </div>

      {/* ── HERO ── */}
      <section className="ai-hero" aria-label="Automation and AI introduction">
        <div className="ai-hero-bg" aria-hidden="true">
          <div className="ai-hero-orb ai-hero-orb-1" />
          <div className="ai-hero-orb ai-hero-orb-2" />
          <div className="ai-hero-orb ai-hero-orb-3" />
          <div className="ai-hero-grid" />
          <div className="ai-hero-scan" />
          <HeroParticles />
        </div>

        <p className="ai-overline">04 — AUTOMATION &amp; AI</p>

        <h1 className="ai-hero-title">
          <span className="ai-word ai-word-1">AUTOMATE.</span>
          <span className="ai-word ai-word-2">INTELLIGENTLY.</span>
          <span className="ai-word ai-word-3">SCALE.</span>
        </h1>

        <p className="ai-hero-sub">
          AI-powered automation that eliminates inefficiency, learns continuously,
          and runs your business 24/7 — without friction, without limits.
        </p>

        <div className="ai-hero-tags" aria-hidden="true">
          {['Agentic AI', 'LLM Workflows', 'Predictive ML', 'Computer Vision', 'Hyperautomation'].map(t => (
            <span key={t} className="ai-hero-tag">{t}</span>
          ))}
        </div>

        <div className="ai-scroll-hint" aria-hidden="true">
          <span>SCROLL</span>
          <div className="ai-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <AiMarquee />

      {/* ── CHALLENGE ── */}
      <section className="ai-section ai-challenge" aria-label="The challenge">
        <div className="ai-challenge-left">
          <p className="ai-overline">THE CHALLENGE</p>
          <h2 className="ai-section-title">
            Your business is leaking<br />
            time, money, and <em>growth.</em>
          </h2>
          <p className="ai-section-body">
            Manual processes breed inconsistency. Every time a human clicks through the same workflow,
            error risk accumulates, hours evaporate, and your competitors — already automated —
            pull further ahead.
          </p>
          <p className="ai-section-body">
            AI automation doesn't just speed up what you already do. It reimagines it —
            eliminating entire categories of human effort and replacing them with
            intelligent systems that scale infinitely and improve over time.
          </p>
          <div className="ai-challenge-tags">
            {['Manual Errors', 'Wasted Time', 'Scaling Limits', 'Rising Costs'].map(t => (
              <span key={t} className="ai-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="ai-challenge-right">
          <NeuralNet />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="ai-section ai-stats" aria-label="Statistics">
        <p className="ai-overline ai-overline--center">02 — BY THE NUMBERS</p>
        <h2 className="ai-section-title ai-section-title--center">
          The automation opportunity is enormous.
        </h2>
        <div className="ai-stats-grid">
          {AI_STATS.map(s => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── BENEFITS BENTO ── */}
      <section className="ai-section ai-benefits" aria-label="Key benefits">
        <p className="ai-overline">03 — WHY IT MATTERS</p>
        <h2 className="ai-section-title">
          Five forces reshaping<br />how business operates.
        </h2>

        <div className="ai-bento">
          {AI_BENEFITS.map(({ Icon, title, desc, badge, wide, featured }) => (
            <article
              key={title}
              className={[
                'ai-bento-card',
                wide     ? 'ai-bento-card--wide'     : '',
                featured ? 'ai-bento-card--featured' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="ai-bento-icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div className="ai-bento-badge" aria-hidden="true">
                <span className="ai-bento-badge-dot" />
                {badge}
              </div>
              <h3 className="ai-bento-title">{title}</h3>
              <p className="ai-bento-desc">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── EMERGING TRENDS ── */}
      <section className="ai-section ai-trends" aria-label="Emerging AI trends">
        <p className="ai-overline ai-overline--center">04 — EMERGING TRENDS</p>
        <h2 className="ai-section-title ai-section-title--center">
          The AI frontier.<br />
          <em>Where it's heading next.</em>
        </h2>

        <div className="ai-trends-grid">
          {AI_TRENDS.map(({ Icon, num, title, desc, tag }) => (
            <article key={title} className="ai-trend-card">
              <span className="ai-trend-num" aria-hidden="true">{num}</span>
              <div className="ai-trend-icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="ai-trend-title">{title}</h3>
              <p className="ai-trend-desc">{desc}</p>
              <span className="ai-trend-tag">{tag}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROCESS — Terminal style ── */}
      <section className="ai-section ai-process" aria-label="Our process">
        <p className="ai-overline ai-overline--center">05 — HOW WE DO IT</p>
        <h2 className="ai-section-title ai-section-title--center">
          From manual chaos<br />
          <em>to autonomous precision.</em>
        </h2>

        <div className="ai-terminal-grid">
          {AI_STEPS.map(step => (
            <div key={step.num} className="ai-terminal-card">
              {/* Terminal title bar */}
              <div className="ai-terminal-bar">
                <span className="ai-terminal-dot ai-terminal-dot--1" />
                <span className="ai-terminal-dot ai-terminal-dot--2" />
                <span className="ai-terminal-dot ai-terminal-dot--3" />
                <span className="ai-terminal-title-bar">MARSWEBZ_AI — STEP {step.num}</span>
              </div>
              {/* Terminal body */}
              <div className="ai-terminal-body">
                <div className="ai-terminal-cmd">
                  <span className="ai-terminal-prompt">$</span>
                  {step.cmd}
                </div>
                <div className="ai-terminal-progress-wrap">
                  <div className="ai-terminal-progress" />
                </div>
                <div className="ai-terminal-status">
                  {step.statusParts.plain}
                  {step.statusParts.highlight && (
                    <span className="ai-terminal-status-highlight">{step.statusParts.highlight}</span>
                  )}
                </div>
                <p className="ai-terminal-step-num">{step.num} — PHASE</p>
                <h3 className="ai-terminal-step-title">{step.title}</h3>
                <p className="ai-terminal-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ai-section ai-cta" aria-label="Call to action">
        {/* Pulsing rings */}
        <div className="ai-cta-rings" aria-hidden="true">
          <div className="ai-cta-ring" />
          <div className="ai-cta-ring" />
          <div className="ai-cta-ring" />
        </div>

        <p className="ai-overline ai-overline--center">06 — READY TO AUTOMATE?</p>
        <h2 className="ai-cta-title">
          Let AI run your business<br />
          <span className="ai-cta-accent">while you focus on growth.</span>
        </h2>
        <p className="ai-cta-sub">
          From first audit to full deployment — we build the AI-powered foundation
          your business needs to operate faster, leaner, and smarter than ever before.
        </p>
        <button
          type="button"
          className="ai-cta-btn"
          onClick={() => exitTo('home')}
        >
          <span>Build Your Automation Engine</span>
        </button>

        <div className="ai-service-nav" aria-label="Service navigation">
          <div className="ai-service-nav-row">
            <button
              type="button"
              className="ai-service-nav-card"
              onClick={() => exitTo('websites-apps')}
              aria-label="Previous: 03 — Websites & Apps"
            >
              <ArrowLeft className="ai-service-nav-arrow" size={22} strokeWidth={1.5} />
              <div className="ai-service-nav-body">
                <span className="ai-service-nav-title">WEBSITES &amp; APPS</span>
                <span className="ai-service-nav-hint">Design · Captivate · Convert</span>
              </div>
              <div className="ai-service-nav-meta">
                <span className="ai-service-nav-label">PREVIOUS</span>
                <span className="ai-service-nav-num">03</span>
              </div>
            </button>

            <div className="ai-service-dots" aria-label="Service 4 of 4" role="list">
              <span className="ai-service-dot" role="listitem" aria-label="01" />
              <span className="ai-service-dot" role="listitem" aria-label="02" />
              <span className="ai-service-dot" role="listitem" aria-label="03" />
              <span className="ai-service-dot ai-service-dot--active" role="listitem" aria-label="04 current" />
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  )
}
