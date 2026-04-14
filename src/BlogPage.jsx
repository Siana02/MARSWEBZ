import { useState, useEffect, useRef } from 'react'
import { Home, Menu, X } from 'lucide-react'
import './LandingPage.css'
import './BlogPage.css'

const NAV_ITEMS = ['Services', 'About', 'Contact', 'Privacy Policy']

const STATS = [
  {
    value: 3.1,
    suffix: 'T',
    prefix: '$',
    label: 'Lost annually to poor data quality across US businesses',
    source: 'IBM',
  },
  {
    value: 23,
    suffix: '×',
    prefix: '',
    label: 'More likely to acquire customers — data-driven organisations',
    source: 'McKinsey',
  },
  {
    value: 175,
    suffix: 'ZB',
    prefix: '',
    label: 'Projected global datasphere by 2025',
    source: 'IDC',
  },
  {
    value: 26,
    suffix: '%',
    prefix: '',
    label: 'More profitable — digitally mature companies vs peers',
    source: 'MIT Sloan CISR',
  },
]

const INDUSTRIES = [
  {
    name: 'Healthcare',
    detail:
      'Electronic Health Records reduce medication errors by up to 80% — lives saved directly through better information flow.',
  },
  {
    name: 'Retail',
    detail:
      'Inventory management systems at companies like Walmart process millions of data points daily, slashing stockouts and waste.',
  },
  {
    name: 'Agriculture',
    detail:
      'Precision farming platforms analyse soil, weather, and crop data — feeding billions more efficiently than ever before.',
  },
  {
    name: 'Education',
    detail:
      'Learning Management Systems have transformed how knowledge is delivered, tracked, and scaled to global audiences.',
  },
  {
    name: 'Finance',
    detail:
      'Real-time transaction processing systems handle trillions of dollars daily with microsecond-level accuracy and compliance.',
  },
  {
    name: 'Logistics',
    detail:
      'Supply chain IS enables companies like DHL and FedEx to track millions of parcels across 220+ countries simultaneously.',
  },
]

function useCountUp(target, duration, start) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start) return
    let startTime = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCurrent(progress * target)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [start, target, duration])

  return current
}

function StatCard({ value, suffix, prefix, label, source, animate }) {
  const count = useCountUp(value, 1800, animate)
  const display = Number.isInteger(value) ? Math.round(count) : count.toFixed(1)

  return (
    <div className="stat-card">
      <div className="stat-number">
        {prefix}{display}{suffix}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-source">— {source}</div>
    </div>
  )
}

export default function BlogPage({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const sectionsRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const nodes = sectionsRef.current.filter(Boolean)
    const observers = nodes.map((node) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.classList.add('section-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.08 }
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="blog-page">
      {/* Reading progress bar */}
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* ── HEADER (reused from LandingPage.css) ── */}
      <header className="header">
        <div
          className="header-logo"
          onClick={() => onNavigate('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          MARS<span className="logo-webz">WEBZ</span>
        </div>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Blog navigation">
          <button
            className="nav-btn blog-icon-btn"
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Back to home"
          >
            <Home size={13} aria-hidden="true" />
            <span>Home</span>
          </button>
          {NAV_ITEMS.map((item) => (
            <button key={item} className="nav-btn" type="button">
              <span>{item}</span>
            </button>
          ))}
        </nav>

        {/* Hamburger */}
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
        <nav className={`nav-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile blog navigation">
          <button
            className="nav-btn mobile blog-icon-btn"
            type="button"
            onClick={() => { onNavigate('home'); setMenuOpen(false) }}
          >
            <Home size={13} aria-hidden="true" />
            <span>Home</span>
          </button>
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
      <section className="blog-hero">
        <div className="blog-hero-orb blog-hero-orb--1" aria-hidden="true" />
        <div className="blog-hero-orb blog-hero-orb--2" aria-hidden="true" />
        <div className="blog-hero-orb blog-hero-orb--3" aria-hidden="true" />

        <div className="blog-hero-inner">
          <span className="blog-category">Information Systems · Technology · Business</span>

          <h1 className="blog-title">
            <span className="blog-title-line">The Architecture</span>
            <span className="blog-title-line blog-title-line--gradient">of Everything</span>
          </h1>

          <p className="blog-subtitle">
            How Information Systems Became the Silent Force Behind Every Thriving Business on Earth
          </p>

          <div className="blog-byline">
            <span className="blog-author">By Siana Anyango</span>
            <span className="blog-dot" aria-hidden="true">·</span>
            <time className="blog-date" dateTime="2025-04">April 2025</time>
            <span className="blog-dot" aria-hidden="true">·</span>
            <span className="blog-read-time">8 min read</span>
          </div>
        </div>

        <div className="blog-hero-scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section
        className="blog-section blog-intro"
        ref={(el) => { sectionsRef.current[0] = el }}
      >
        <div className="blog-section-inner">
          <p className="blog-lead">
            Before the first sale is made. Before the strategy deck is printed. Before the CEO takes the
            stage — there is a system. An invisible lattice of data, processes, and technology humming
            quietly in the background, holding everything together.
          </p>
          <p className="blog-body">
            It doesn't ask for credit. It rarely makes headlines. But strip it away, and every modern
            business collapses within hours. We are talking about Information Systems — and they may be
            the most important thing your organisation has ever taken for granted.
          </p>
          <p className="blog-body">
            An Information System (IS) is not merely software. It is not a database or a server rack. It
            is the <strong>integrated architecture</strong> of people, data, processes, and technology
            that an organisation uses to collect, process, store, and communicate information. From a
            hospital's patient records to a startup's CRM, from a bank's transaction ledger to a
            restaurant's supply chain tracker — IS is everywhere. It is, quite literally, everything.
          </p>
        </div>
      </section>

      {/* ── PULL QUOTE 1 ── */}
      <blockquote
        className="blog-pullquote"
        ref={(el) => { sectionsRef.current[1] = el }}
      >
        <p>
          "Strip away the logos and the culture decks, and what remains is a series of decisions
          made on data."
        </p>
      </blockquote>

      {/* ── STATS ── */}
      <section className="blog-section blog-stats-section" ref={statsRef}>
        <div className="blog-section-inner">
          <h2 className="blog-section-title">The Numbers That Should Stop You Cold</h2>
          <p className="blog-body blog-body--intro-stats">
            Data doesn't lie. And the data on Information Systems paints a staggering picture — one of
            trillion-dollar consequences and exponential competitive advantage.
          </p>
          <div className="blog-stats-grid">
            {STATS.map((stat, i) => (
              <StatCard key={i} {...stat} animate={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 01: The Skeleton ── */}
      <section
        className="blog-section"
        ref={(el) => { sectionsRef.current[2] = el }}
      >
        <div className="blog-section-inner">
          <div className="blog-section-number" aria-hidden="true">01</div>
          <h2 className="blog-section-title">The Skeleton Behind the Skin</h2>
          <p className="blog-body">
            Think about the last major decision your organisation made — hiring, launching a product,
            renegotiating a supplier contract. That decision was only possible because someone, somewhere,
            had access to the right information at the right time.
          </p>
          <p className="blog-body">
            Every business process — procurement, human resources, marketing, logistics, finance,
            customer service — is, at its core, an <em>information flow in disguise</em>. The orders that
            get fulfilled, the invoices that get paid, the customers who stay loyal — all of these
            outcomes are downstream of an information system working correctly.
          </p>
          <p className="blog-body">
            According to a landmark study by MIT professors Erik Brynjolfsson and Lorin Hitt, companies
            that adopted information-based management practices were <strong>4–6% more productive</strong>{' '}
            than their peers — a gap that compounds dramatically over years and decades. That is not a
            coincidence. It is architecture.
          </p>
          <div className="blog-highlight-box">
            <span className="blog-highlight-icon" aria-hidden="true">📊</span>
            <p>
              95% of Fortune 500 companies run their operations on Enterprise Resource Planning (ERP)
              systems — the most visible manifestation of organisational Information Systems.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: In Every Industry ── */}
      <section
        className="blog-section blog-section--alt"
        ref={(el) => { sectionsRef.current[3] = el }}
      >
        <div className="blog-section-inner">
          <div className="blog-section-number" aria-hidden="true">02</div>
          <h2 className="blog-section-title">In Every Industry, Every Room</h2>
          <p className="blog-body">
            One of the most persistent myths about Information Systems is that they belong to the tech
            sector. That IS is the domain of software companies, not retailers. Of Silicon Valley, not
            small businesses.
          </p>
          <p className="blog-body blog-body--emphasis">
            This is catastrophically wrong.
          </p>
          <div className="blog-industry-grid">
            {INDUSTRIES.map(({ name, detail }) => (
              <div className="blog-industry-card" key={name}>
                <h4 className="blog-industry-name">{name}</h4>
                <p className="blog-industry-detail">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE 2 ── */}
      <blockquote
        className="blog-pullquote blog-pullquote--purple"
        ref={(el) => { sectionsRef.current[4] = el }}
      >
        <p>
          "Data-driven organisations are not just more successful — they are 23× more likely to acquire
          customers and 19× more likely to be profitable."
        </p>
        <cite>— McKinsey Global Institute</cite>
      </blockquote>

      {/* ── SECTION 03: The Cost of Ignorance ── */}
      <section
        className="blog-section"
        ref={(el) => { sectionsRef.current[5] = el }}
      >
        <div className="blog-section-inner">
          <div className="blog-section-number" aria-hidden="true">03</div>
          <h2 className="blog-section-title">The Price of Ignorance</h2>
          <p className="blog-body">
            For every business that has invested in robust information systems, there is another that
            hasn't — and the consequences are measurable. IBM's research estimates that poor data quality
            costs US businesses approximately <strong>$3.1 trillion per year</strong>. That is not a
            typo. That is the price of flying blind.
          </p>
          <p className="blog-body">
            The failure modes are predictable: communication siloes that slow decisions, duplicated
            efforts that drain budgets, inconsistent customer data that breeds frustration, regulatory
            non-compliance that triggers fines. And yet, Gartner reports that{' '}
            <strong>87% of organisations</strong> have low business intelligence and analytics maturity —
            meaning the majority of businesses are making critical decisions on incomplete or unreliable
            information.
          </p>
          <p className="blog-body">
            The World Economic Forum has declared data the most valuable commodity of the 21st century —
            more valuable than oil. And just like oil, data is worthless unless you have the
            infrastructure to refine it. Information systems are that refinery.
          </p>
        </div>
      </section>

      {/* ── SECTION 04: The Horizon ── */}
      <section
        className="blog-section blog-section--alt"
        ref={(el) => { sectionsRef.current[6] = el }}
      >
        <div className="blog-section-inner">
          <div className="blog-section-number" aria-hidden="true">04</div>
          <h2 className="blog-section-title">The Horizon: What Comes Next</h2>
          <p className="blog-body">
            Every major technology revolution of the last two decades — artificial intelligence, machine
            learning, the Internet of Things, blockchain — is, at its foundation, an evolution of
            information systems. They are not replacements for IS. They are its next chapters.
          </p>
          <p className="blog-body">
            By 2025, IDC projects the global datasphere will reach <strong>175 zettabytes</strong>. To
            put that in perspective: if you stored that data on DVDs, the stack would circle Earth 222
            times. The businesses that will thrive in this environment are not necessarily the ones with
            the most data — they are the ones with the most capable information systems to make sense
            of it.
          </p>
          <p className="blog-body">
            MIT Sloan's Center for Information Systems Research found that digitally mature companies —
            those with sophisticated IS frameworks — are <strong>26% more profitable</strong> than their
            industry peers. This isn't technology for technology's sake. It is the compound interest of
            having the right information, in the right place, at the right time.
          </p>
          <div className="blog-highlight-box blog-highlight-box--amber">
            <span className="blog-highlight-icon" aria-hidden="true">🔮</span>
            <p>
              The next frontier isn't AI <em>replacing</em> Information Systems. It's AI becoming{' '}
              <em>embedded within</em> them — making every information flow smarter, faster, and more
              adaptive than anything previously possible.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section
        className="blog-section blog-closing"
        ref={(el) => { sectionsRef.current[7] = el }}
      >
        <div className="blog-section-inner">
          <h2 className="blog-closing-title">The Invisible Becomes Essential</h2>
          <p className="blog-body">
            There is a reason the best-run companies in the world invest so heavily in their information
            infrastructure. Not because it is exciting, or because it makes for good press releases. But
            because they understand something fundamental: every strategy, every product, every customer
            relationship, every dollar earned — is mediated by information. And the quality of that
            information, and the systems that manage it, determine whether a business survives or thrives.
          </p>
          <p className="blog-body">
            Information Systems are not a department. They are not a line item on an IT budget. They are
            the architecture of everything. The invisible engine. The silent backbone without which no
            business — not one — can function in the modern world.
          </p>
          <p className="blog-body blog-body--closing-line">
            So the next time someone asks why IS matters, the answer is simple:{' '}
            <strong>everything you see was built on something you can't.</strong>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <div className="blog-footer-author">
            <div className="blog-footer-name">Siana Anyango</div>
            <div className="blog-footer-bio">Software Engineer &amp; Web Designer · MARSWEBZ</div>
          </div>
          <button
            className="nav-btn blog-icon-btn blog-back-btn"
            type="button"
            onClick={() => onNavigate('home')}
          >
            <Home size={14} aria-hidden="true" />
            <span>Back to Home</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
