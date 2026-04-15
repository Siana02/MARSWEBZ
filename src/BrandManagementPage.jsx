import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Eye, Megaphone, Compass, Award } from 'lucide-react'
import './BrandManagementPage.css'

gsap.registerPlugin(ScrollTrigger)

/* ── CSS 3D ROTATING BRAND PRISM ── */

function BrandPrism() {
  return (
    <div className="bm-prism-wrap" aria-hidden="true">
      <div className="bm-prism-scene">
        <div className="bm-prism">
          <div className="bm-face bm-face--front">IDENTITY</div>
          <div className="bm-face bm-face--back">STRATEGY</div>
          <div className="bm-face bm-face--right">VOICE</div>
          <div className="bm-face bm-face--left">VISUAL</div>
          <div className="bm-face bm-face--top">TRUST</div>
          <div className="bm-face bm-face--bottom">VALUE</div>
        </div>
      </div>
    </div>
  )
}

/* ── BRAND LAYERS — 3D-perspective stacked-layers art ── */

const LAYER_DATA = [
  { num: '01', label: 'BRAND STRATEGY',   sub: 'Purpose · Positioning · Promise' },
  { num: '02', label: 'VISUAL IDENTITY',  sub: 'Logo · Colour · Typography' },
  { num: '03', label: 'BRAND VOICE',      sub: 'Tone · Language · Messaging' },
  { num: '04', label: 'EXPERIENCE',       sub: 'Touch-points · Culture · Loyalty' },
]

function BrandLayers() {
  return (
    <div className="bm-layers-wrap" aria-label="Brand identity layers">
      <div className="bm-layers-3d">
        {LAYER_DATA.map((l, i) => (
          <div key={l.label} className="bm-layer" style={{ '--li': i }}>
            <div className="bm-layer-edge" />
            <div className="bm-layer-face">
              <span className="bm-layer-num">{l.num}</span>
              <div>
                <p className="bm-layer-label">{l.label}</p>
                <p className="bm-layer-sub">{l.sub}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Vertical connector */}
        <div className="bm-layers-spine" aria-hidden="true" />
      </div>
    </div>
  )
}

/* ── MARQUEE ── */

const BM_MARQUEE_TEXT = 'BRAND MANAGEMENT — VISUAL IDENTITY — BRAND VOICE — MARKET POSITIONING — DESIGN SYSTEMS — BRAND STRATEGY — AUDIENCE TRUST — '

function BmMarquee() {
  return (
    <div className="bm-marquee" aria-hidden="true">
      <div className="bm-marquee-track">
        <span>{BM_MARQUEE_TEXT}</span>
        <span>{BM_MARQUEE_TEXT}</span>
        <span>{BM_MARQUEE_TEXT}</span>
      </div>
    </div>
  )
}

/* ── DATA ── */

const BM_STATS = [
  { value: 89,  suffix: '%', label: 'of consumers stay loyal to brands they genuinely trust' },
  { value: 3,   suffix: '×', label: 'more revenue from consistent brand presentation' },
  { value: 7,   suffix: '',  label: 'average impressions before brand recognition sticks' },
  { value: 23,  suffix: '%', label: 'average revenue uplift from brand consistency alone' },
]

const BM_BENEFITS = [
  { Icon: Compass, title: 'BRAND STRATEGY',     desc: 'We decode your market, audience, and purpose — then build a positioning that makes competitors irrelevant.' },
  { Icon: Eye,     title: 'VISUAL IDENTITY',    desc: 'Logo, colour, typography, motion — every pixel engineered to trigger the right emotion at the right moment.' },
  { Icon: Megaphone, title: 'BRAND VOICE',      desc: 'The words you choose define you. We craft a voice so distinct, your audience knows it\u2019s you before the logo appears.' },
  { Icon: Award,   title: 'MARKET POSITIONING', desc: 'Own a specific place in the mind of your customer. We map the white space and plant your flag there.' },
]

const BM_STEPS = [
  { num: '01', side: 'left',  title: 'DISCOVER',  desc: 'Deep-dive audits of your current brand perception, competitor landscape, and target audience psychology.' },
  { num: '02', side: 'right', title: 'DEFINE',    desc: 'A precise brand blueprint — values, positioning, tone, visual direction — built to last a decade.' },
  { num: '03', side: 'left',  title: 'DESIGN',    desc: 'Full identity system creation: logo, palette, type, motion, templates. Every asset production-ready.' },
  { num: '04', side: 'right', title: 'DEPLOY',    desc: 'Seamless rollout across all channels with brand guidelines, team training, and ongoing governance.' },
]

/* ── MAIN COMPONENT ── */

export default function BrandManagementPage({ onNavigate }) {
  const containerRef = useRef(null)

  /* Prevent FOUC */
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    gsap.set([
      '.bm-hero .bm-overline',
      '.bm-word',
      '.bm-hero-sub',
      '.bm-scroll-hint',
    ], { autoAlpha: 0 })
    gsap.set('.bm-word-1', { x: -60, skewX: -4 })
    gsap.set('.bm-word-2', { y: 50, skewY: 3 })
    gsap.set('.bm-word-3', { x: 60, skewX: 4 })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO ── */
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .to('.bm-hero .bm-overline', {
          autoAlpha: 1, duration: 0.5, ease: 'power2.out',
        })
        .to('.bm-word-1', {
          autoAlpha: 1, x: 0, skewX: 0,
          duration: 0.8, ease: 'power4.out',
        }, '-=0.1')
        .to('.bm-word-2', {
          autoAlpha: 1, y: 0, skewY: 0,
          duration: 0.72, ease: 'power4.out',
        }, '-=0.55')
        /* Warm amber flash on accent word */
        .to('.bm-word-2', {
          textShadow: '0 0 70px rgba(255,196,100,0.9), 0 0 140px rgba(255,196,100,0.4)',
          duration: 0.2, ease: 'power2.in',
        }, '-=0.06')
        .to('.bm-word-2', {
          textShadow: '0 0 40px rgba(255,196,100,0.4), 0 0 80px rgba(255,196,100,0.15)',
          duration: 0.5, ease: 'power2.out',
        })
        .to('.bm-word-3', {
          autoAlpha: 1, x: 0, skewX: 0,
          duration: 0.8, ease: 'power4.out',
        }, '-=0.65')
        .to('.bm-hero-sub', {
          autoAlpha: 1, duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .to('.bm-scroll-hint', {
          autoAlpha: 1, duration: 0.45, ease: 'power2.out',
        }, '-=0.1')

      /* ── CHALLENGE ── */
      const challengeTl = gsap.timeline({
        scrollTrigger: { trigger: '.bm-challenge', start: 'top 78%', once: true },
      })
      challengeTl
        .from('.bm-challenge .bm-overline', {
          autoAlpha: 0, x: -24, duration: 0.5, ease: 'power2.out',
        })
        .from('.bm-challenge .bm-section-title', {
          autoAlpha: 0, x: -55, duration: 0.75, ease: 'power3.out',
        }, '-=0.15')
        .from('.bm-challenge .bm-section-body', {
          autoAlpha: 0, y: 22, stagger: 0.16, duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .from('.bm-ch-tag', {
          autoAlpha: 0, scale: 0.75, stagger: 0.09,
          duration: 0.4, ease: 'back.out(1.7)',
        }, '-=0.2')
        /* Layers build up from bottom */
        .from('.bm-layer', {
          autoAlpha: 0, y: 30, rotationX: -20,
          stagger: 0.15, duration: 0.7, ease: 'power3.out',
          transformOrigin: 'center bottom',
        }, '-=0.65')

      /* ── STATS ── */
      const statsTl = gsap.timeline({
        scrollTrigger: { trigger: '.bm-stats', start: 'top 78%', once: true },
      })
      statsTl
        .from('.bm-stats .bm-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.bm-stats .bm-section-title', {
          autoAlpha: 0, y: 22, duration: 0.55, ease: 'power2.out',
        }, '-=0.2')
        .from('.bm-stat-item', {
          autoAlpha: 0, y: 40, stagger: 0.14,
          duration: 0.7, ease: 'power3.out',
        }, '-=0.2')

      /* Count-up */
      gsap.utils.toArray('.bm-stat-value').forEach((el) => {
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
            trigger: el.closest('.bm-stat-item'),
            start: 'top 88%',
            once: true,
          },
        })
      })

      /* ── BENEFITS ── */
      const benefitsTl = gsap.timeline({
        scrollTrigger: { trigger: '.bm-benefits', start: 'top 78%', once: true },
      })
      benefitsTl
        .from('.bm-benefits .bm-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.bm-benefits .bm-section-title', {
          autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out',
        }, '-=0.2')
        .from('.bm-benefit-card', {
          autoAlpha: 0,
          x: (i) => (i % 2 === 0 ? -50 : 50),
          rotationY: (i) => (i % 2 === 0 ? -12 : 12),
          transformPerspective: 1000,
          stagger: 0.13,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.25')

      /* ── PROCESS ── */
      const processTl = gsap.timeline({
        scrollTrigger: { trigger: '.bm-process', start: 'top 78%', once: true },
      })
      processTl
        .from('.bm-process .bm-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.bm-process .bm-section-title', {
          autoAlpha: 0, y: 25, duration: 0.6, ease: 'power2.out',
        }, '-=0.2')
        .from('.bm-spine-line', {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1.0, ease: 'power2.inOut',
        }, '-=0.15')
        .from('.bm-step', {
          autoAlpha: 0,
          x: (i) => (i % 2 === 0 ? -45 : 45),
          stagger: 0.18,
          duration: 0.7, ease: 'power3.out',
        }, '-=0.7')

      /* ── CTA ── */
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: '.bm-cta', start: 'top 80%', once: true },
      })
      ctaTl
        .from('.bm-cta .bm-overline', {
          autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out',
        })
        .from('.bm-cta-title', {
          autoAlpha: 0, scale: 0.94, duration: 0.7, ease: 'power2.out',
        }, '-=0.2')
        .to('.bm-cta-accent', {
          textShadow: '0 0 60px rgba(255,196,100,0.9), 0 0 120px rgba(255,196,100,0.4)',
          duration: 0.22, ease: 'power2.in',
        }, '-=0.05')
        .to('.bm-cta-accent', {
          textShadow: '0 0 40px rgba(255,196,100,0.35)',
          duration: 0.5, ease: 'power2.out',
        })
        .from('.bm-cta-sub', {
          autoAlpha: 0, y: 18, duration: 0.55, ease: 'power2.out',
        }, '-=0.4')
        .from('.bm-cta-btn', {
          autoAlpha: 0, y: 22, duration: 0.5, ease: 'back.out(1.5)',
        }, '-=0.25')
        .from('.bm-service-nav', {
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
    <div className="bm-explore" ref={containerRef}>

      {/* ── BACK NAV ── */}
      <div className="bm-back-nav">
        <button
          type="button"
          className="bm-back-btn"
          onClick={() => exitTo('home')}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>HOME</span>
        </button>
        <div className="bm-header-logo" aria-label="MARSWEBZ">
          MARS<span className="bm-header-logo-webz">WEBZ</span>
        </div>
        <span className="bm-item-num">02</span>
      </div>

      {/* ── HERO ── */}
      <section className="bm-hero" aria-label="Brand Management introduction">
        <div className="bm-hero-bg" aria-hidden="true">
          <div className="bm-orb bm-orb-1" />
          <div className="bm-orb bm-orb-2" />
          <div className="bm-orb bm-orb-3" />
        </div>

        <BrandPrism />

        <p className="bm-overline">02 — BRAND MANAGEMENT</p>

        <h1 className="bm-hero-title">
          <span className="bm-word bm-word-1">DEFINE.</span>
          <span className="bm-word bm-word-2">ELEVATE.</span>
          <span className="bm-word bm-word-3">INSPIRE.</span>
        </h1>

        <p className="bm-hero-sub">
          Your brand, engineered for recognition and loyalty.
        </p>

        <div className="bm-scroll-hint" aria-hidden="true">
          <span>SCROLL</span>
          <div className="bm-scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <BmMarquee />

      {/* ── THE CHALLENGE ── */}
      <section className="bm-section bm-challenge" aria-label="The challenge">
        <div className="bm-challenge-left">
          <p className="bm-overline">THE CHALLENGE</p>
          <h2 className="bm-section-title">
            Your brand speaks.<br />
            But is anyone <em>listening?</em>
          </h2>
          <p className="bm-section-body">
            Most businesses have a logo — very few have a brand. Without a coherent identity system, every touchpoint sends a different signal, eroding trust before the first conversation even begins.
          </p>
          <p className="bm-section-body">
            Brand management fixes the invisible problem: the gap between what you mean to say and what the world actually hears. We close that gap with precision.
          </p>
          <div className="bm-ch-tags">
            {['Inconsistent Identity', 'Weak Positioning', 'Lost Trust', 'Low Recognition'].map(t => (
              <span key={t} className="bm-ch-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="bm-challenge-right">
          <BrandLayers />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bm-section bm-stats" aria-label="Statistics">
        <p className="bm-overline bm-overline--center">02 — BY THE NUMBERS</p>
        <h2 className="bm-section-title bm-section-title--center">Brand equity is real currency.</h2>
        <div className="bm-stats-grid">
          {BM_STATS.map((s) => (
            <div key={s.label} className="bm-stat-item">
              <div className="bm-stat-number">
                <span
                  className="bm-stat-value"
                  data-target={s.value}
                  data-decimal={s.decimal ? 'true' : 'false'}
                >0</span>
                <span className="bm-stat-suffix">{s.suffix}</span>
              </div>
              <div className="bm-stat-rule" />
              <p className="bm-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="bm-section bm-benefits" aria-label="Key benefits">
        <p className="bm-overline">03 — WHY IT MATTERS</p>
        <h2 className="bm-section-title">Four pillars that<br />define who you are.</h2>
        <div className="bm-benefits-grid">
          {BM_BENEFITS.map(({ Icon, title, desc }) => (
            <article key={title} className="bm-benefit-card">
              <div className="bm-card-accent-bar" aria-hidden="true" />
              <div className="bm-benefit-icon-wrap" aria-hidden="true">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="bm-benefit-title">{title}</h3>
              <p className="bm-benefit-desc">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROCESS — zigzag vertical timeline ── */}
      <section className="bm-section bm-process" aria-label="Our process">
        <p className="bm-overline bm-overline--center">04 — HOW WE DO IT</p>
        <h2 className="bm-section-title bm-section-title--center">Four stages to an unforgettable brand.</h2>
        <div className="bm-timeline">
          {/* Central vertical spine */}
          <div className="bm-spine-wrap" aria-hidden="true">
            <div className="bm-spine-line" />
          </div>
          {BM_STEPS.map((step) => (
            <div key={step.num} className={`bm-step bm-step--${step.side}`}>
              <div className="bm-step-connector" aria-hidden="true" />
              <div className="bm-step-dot" aria-hidden="true" />
              <div className="bm-step-card">
                <span className="bm-step-num">{step.num}</span>
                <h3 className="bm-step-title">{step.title}</h3>
                <p className="bm-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bm-section bm-cta" aria-label="Call to action">
        <p className="bm-overline bm-overline--center">05 — READY?</p>
        <h2 className="bm-cta-title">
          Build a brand<br />
          <span className="bm-cta-accent">people remember.</span>
        </h2>
        <p className="bm-cta-sub">
          Let's craft the identity your business deserves.
        </p>
        <button
          type="button"
          className="bm-cta-btn"
          onClick={() => exitTo('home')}
        >
          <span>Book a Brand Audit</span>
        </button>
        <div className="bm-service-nav" aria-label="Service navigation">
          <div className="bm-service-nav-row">
            <button
              type="button"
              className="bm-service-nav-card bm-service-nav-card--prev"
              onClick={() => exitTo('explore')}
              aria-label="Previous: 01 — Information Systems"
            >
              <ArrowLeft className="bm-service-nav-arrow" size={22} strokeWidth={1.5} />
              <div className="bm-service-nav-body">
                <span className="bm-service-nav-title">INFORMATION SYSTEMS</span>
                <span className="bm-service-nav-hint">Streamline · Accelerate · Scale</span>
              </div>
              <div className="bm-service-nav-meta">
                <span className="bm-service-nav-label">PREVIOUS</span>
                <span className="bm-service-nav-num">01</span>
              </div>
            </button>

            <div className="bm-service-dots" aria-label="Service 2 of 4" role="list">
              <span className="bm-service-dot" role="listitem" aria-label="01" />
              <span className="bm-service-dot bm-service-dot--active" role="listitem" aria-label="02 current" />
              <span className="bm-service-dot" role="listitem" aria-label="03" />
              <span className="bm-service-dot" role="listitem" aria-label="04" />
            </div>

            <button
              type="button"
              className="bm-service-nav-card bm-service-nav-card--next"
              onClick={() => exitTo('websites-apps')}
              aria-label="Next: 03 — Websites & Apps"
            >
              <div className="bm-service-nav-meta">
                <span className="bm-service-nav-label">NEXT</span>
                <span className="bm-service-nav-num">03</span>
              </div>
              <div className="bm-service-nav-body">
                <span className="bm-service-nav-title">WEBSITES &amp; APPS</span>
                <span className="bm-service-nav-hint">Design · Captivate · Convert</span>
              </div>
              <ArrowRight className="bm-service-nav-arrow" size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
