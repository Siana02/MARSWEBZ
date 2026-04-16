import { useState, useEffect, useRef } from 'react'
import { Home, Menu, X, ArrowRight, BookOpen } from 'lucide-react'
import './LandingPage.css'
import './BlogPage.css'

/* ─────────────────────────────────────────────
   SHARED CONSTANTS
───────────────────────────────────────────── */
const NAV_ITEMS = ['Services', 'About', 'Contact', 'Privacy Policy']

const ARTICLES_PREVIEW = [
  {
    id: '1',
    number: '01',
    category: 'Information Systems · Technology · Business',
    catColor: '#7ca4ff',
    title: 'The Architecture of Everything',
    subtitle: 'How Information Systems Became the Silent Force Behind Every Thriving Business',
    excerpt:
      'Before the first sale is made. Before the strategy deck is printed. Before the CEO takes the stage — there is a system. An invisible lattice of data, processes, and technology humming quietly in the background, holding everything together.',
    readTime: '8 min read',
    author: 'Siana Anyango',
    date: 'April 2025',
    accentColor: '#7ca4ff',
    accentGlow: 'rgba(124,164,255,0.35)',
  },
  {
    id: '2',
    number: '02',
    category: 'Web Design · Conversion · Strategy',
    catColor: '#f59e0b',
    title: 'Dead on Arrival',
    subtitle: "Why Your Business Website Isn't Converting — And What Actually Does",
    excerpt:
      "You paid for the domain. Hired the designer. Spent weeks on copy. Launched it to the world. And nothing happened. Not much, anyway. Your website is live — but is it alive? There's a difference. And that difference is measured in lost revenue.",
    readTime: '10 min read',
    author: 'Siana Anyango',
    date: 'May 2025',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245,158,11,0.35)',
  },
  {
    id: '3',
    number: '03',
    category: 'AI · Automation · Business Strategy',
    catColor: '#a855f7',
    title: 'The Rise of Intelligent Businesses',
    subtitle: 'Why Automation Is No Longer Optional',
    excerpt:
      "Something fundamental has shifted. Quietly. Incrementally. And now — undeniably. The businesses pulling ahead of their competitors aren't necessarily working harder. They're working smarter — through automation.",
    readTime: '10 min read',
    author: 'Siana Anyango',
    date: 'June 2025',
    accentColor: '#a855f7',
    accentGlow: 'rgba(168,85,247,0.35)',
  },
]

/* ─────────────────────────────────────────────
   SHARED HOOKS
───────────────────────────────────────────── */
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
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [start, target, duration])

  return current
}

function StatCard({ value, suffix, prefix, label, source, animate }) {
  const count = useCountUp(Math.abs(value), 1800, animate)
  const display = Number.isInteger(value) ? Math.round(count) : count.toFixed(1)
  return (
    <div className="stat-card">
      <div className="stat-number">{prefix}{display}{suffix}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-source">— {source}</div>
    </div>
  )
}

function useSectionReveal() {
  const refs = useRef([])
  useEffect(() => {
    const nodes = refs.current.filter(Boolean)
    const observers = nodes.map((node) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { node.classList.add('section-visible'); obs.disconnect() }
        },
        { threshold: 0.08 }
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])
  return refs
}

/* ─────────────────────────────────────────────
   SHARED: NEXT ARTICLE CTA
───────────────────────────────────────────── */
function NextArticleCTA({ nextId, nextTitle, onSelectArticle }) {
  return (
    <div className="next-article-cta">
      <span className="next-article-label">Continue Reading</span>
      <button
        type="button"
        className="next-article-btn"
        onClick={() => { window.scrollTo(0, 0); onSelectArticle(nextId) }}
      >
        <span className="next-article-title">{nextTitle}</span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   BLOG INDEX
───────────────────────────────────────────── */
function BlogIndex({ onSelectArticle }) {
  const cardRefs = useRef([])

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean)
    const observers = nodes.map((node) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { node.classList.add('index-card--visible'); obs.disconnect() }
        },
        { threshold: 0.1 }
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="blog-index">
      <section className="blog-index-hero">
        <div className="blog-hero-orb blog-hero-orb--1" aria-hidden="true" />
        <div className="blog-hero-orb blog-hero-orb--2" aria-hidden="true" />
        <div className="blog-index-hero-inner">
          <span className="blog-category">Insights · Strategy · Technology</span>
          <h1 className="blog-index-title">
            <span className="blog-title-line">Perspectives</span>
            <span className="blog-title-line blog-title-line--gradient">Worth Reading</span>
          </h1>
          <p className="blog-index-subtitle">
            Long-form thinking on digital systems, business growth, and the intelligence that separates
            companies that thrive from those that merely survive.
          </p>
        </div>
        <div className="blog-hero-scroll" aria-hidden="true"><span /></div>
      </section>

      <section className="blog-index-grid-section">
        <div className="blog-index-grid">
          {ARTICLES_PREVIEW.map((article, i) => (
            <article
              key={article.id}
              className="index-card"
              ref={(el) => { cardRefs.current[i] = el }}
              style={{ '--ic-accent': article.accentColor, '--ic-glow': article.accentGlow, animationDelay: `${i * 0.15}s` }}
              onClick={() => onSelectArticle(article.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectArticle(article.id)}
            >
              <div className="index-card-visual">
                <span className="index-card-number" aria-hidden="true">{article.number}</span>
                <div className="index-card-visual-glow" aria-hidden="true" />
              </div>
              <div className="index-card-body">
                <span className="index-card-category" style={{ color: article.catColor }}>
                  {article.category}
                </span>
                <h2 className="index-card-title">{article.title}</h2>
                <p className="index-card-subtitle">{article.subtitle}</p>
                <p className="index-card-excerpt">{article.excerpt}</p>
                <div className="index-card-footer">
                  <div className="index-card-meta">
                    <span className="index-card-author">{article.author}</span>
                    <span className="index-card-dot" aria-hidden="true">·</span>
                    <span className="index-card-readtime">{article.readTime}</span>
                    <span className="index-card-dot" aria-hidden="true">·</span>
                    <time className="index-card-date">{article.date}</time>
                  </div>
                  <button
                    type="button"
                    className="index-card-read-btn"
                    onClick={(e) => { e.stopPropagation(); onSelectArticle(article.id) }}
                    aria-label={`Read ${article.title}`}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ARTICLE 1 — THE ARCHITECTURE OF EVERYTHING
───────────────────────────────────────────── */
const A1_STATS = [
  { value: 3.1,  suffix: 'T',  prefix: '$', label: 'Lost annually to poor data quality across US businesses', source: 'IBM' },
  { value: 23,   suffix: '×',  prefix: '',  label: 'More likely to acquire customers — data-driven organisations', source: 'McKinsey' },
  { value: 175,  suffix: 'ZB', prefix: '',  label: 'Projected global datasphere by 2025', source: 'IDC' },
  { value: 26,   suffix: '%',  prefix: '',  label: 'More profitable — digitally mature companies vs peers', source: 'MIT Sloan CISR' },
]

const A1_INDUSTRIES = [
  { name: 'Healthcare',  detail: 'Electronic Health Records reduce medication errors by up to 80% — lives saved directly through better information flow.' },
  { name: 'Retail',      detail: 'Inventory management systems at companies like Walmart process millions of data points daily, slashing stockouts and waste.' },
  { name: 'Agriculture', detail: 'Precision farming platforms analyse soil, weather, and crop data — feeding billions more efficiently than ever before.' },
  { name: 'Education',   detail: 'Learning Management Systems have transformed how knowledge is delivered, tracked, and scaled to global audiences.' },
  { name: 'Finance',     detail: 'Real-time transaction processing systems handle trillions of dollars daily with microsecond-level accuracy and compliance.' },
  { name: 'Logistics',   detail: 'Supply chain IS enables companies like DHL and FedEx to track millions of parcels across 220+ countries simultaneously.' },
]

function Article1({ onSelectArticle }) {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const sectionsRef = useSectionReveal()

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="blog-article blog-article--1">
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
          <p className="blog-subtitle">How Information Systems Became the Silent Force Behind Every Thriving Business on Earth</p>
          <div className="blog-byline">
            <span className="blog-author">By Siana Anyango</span>
            <span className="blog-dot" aria-hidden="true">·</span>
            <time className="blog-date" dateTime="2025-04">April 2025</time>
            <span className="blog-dot" aria-hidden="true">·</span>
            <span className="blog-read-time">8 min read</span>
          </div>
        </div>
        <div className="blog-hero-scroll" aria-hidden="true"><span /></div>
      </section>

      <section className="blog-section blog-intro" ref={(el) => { sectionsRef.current[0] = el }}>
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

      <blockquote className="blog-pullquote" ref={(el) => { sectionsRef.current[1] = el }}>
        <p>"Strip away the logos and the culture decks, and what remains is a series of decisions made on data."</p>
      </blockquote>

      <section className="blog-section blog-stats-section" ref={statsRef}>
        <div className="blog-section-inner">
          <h2 className="blog-section-title">The Numbers That Should Stop You Cold</h2>
          <p className="blog-body blog-body--intro-stats">
            Data doesn't lie. And the data on Information Systems paints a staggering picture — one of
            trillion-dollar consequences and exponential competitive advantage.
          </p>
          <div className="blog-stats-grid">
            {A1_STATS.map((stat, i) => <StatCard key={i} {...stat} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      <section className="blog-section" ref={(el) => { sectionsRef.current[2] = el }}>
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
            <p>95% of Fortune 500 companies run their operations on Enterprise Resource Planning (ERP) systems — the most visible manifestation of organisational Information Systems.</p>
          </div>
        </div>
      </section>

      <section className="blog-section blog-section--alt" ref={(el) => { sectionsRef.current[3] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number" aria-hidden="true">02</div>
          <h2 className="blog-section-title">In Every Industry, Every Room</h2>
          <p className="blog-body">
            One of the most persistent myths about Information Systems is that they belong to the tech
            sector. That IS is the domain of software companies, not retailers. Of Silicon Valley, not
            small businesses.
          </p>
          <p className="blog-body blog-body--emphasis">This is catastrophically wrong.</p>
          <div className="blog-industry-grid">
            {A1_INDUSTRIES.map(({ name, detail }) => (
              <div className="blog-industry-card" key={name}>
                <h4 className="blog-industry-name">{name}</h4>
                <p className="blog-industry-detail">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <blockquote className="blog-pullquote blog-pullquote--purple" ref={(el) => { sectionsRef.current[4] = el }}>
        <p>"Data-driven organisations are not just more successful — they are 23× more likely to acquire customers and 19× more likely to be profitable."</p>
        <cite>— McKinsey Global Institute</cite>
      </blockquote>

      <section className="blog-section" ref={(el) => { sectionsRef.current[5] = el }}>
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

      <section className="blog-section blog-section--alt" ref={(el) => { sectionsRef.current[6] = el }}>
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
            the most data — they are the ones with the most capable information systems to make sense of it.
          </p>
          <p className="blog-body">
            MIT Sloan's Center for Information Systems Research found that digitally mature companies —
            those with sophisticated IS frameworks — are <strong>26% more profitable</strong> than their
            industry peers. This isn't technology for technology's sake. It is the compound interest of
            having the right information, in the right place, at the right time.
          </p>
          <div className="blog-highlight-box blog-highlight-box--amber">
            <span className="blog-highlight-icon" aria-hidden="true">🔮</span>
            <p>The next frontier isn't AI <em>replacing</em> Information Systems. It's AI becoming <em>embedded within</em> them — making every information flow smarter, faster, and more adaptive than anything previously possible.</p>
          </div>
        </div>
      </section>

      <section className="blog-section blog-closing" ref={(el) => { sectionsRef.current[7] = el }}>
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

      <NextArticleCTA
        nextId="2"
        nextTitle="Dead on Arrival: Why Your Business Website Isn't Converting"
        onSelectArticle={onSelectArticle}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   ARTICLE 2 — DEAD ON ARRIVAL
───────────────────────────────────────────── */
const A2_STATS = [
  { value: 96,  suffix: '%', prefix: '',  label: "of website visitors don't convert on their first visit", source: 'Marketo' },
  { value: 88,  suffix: '%', prefix: '',  label: "of users won't return after a bad website experience", source: 'Sweor' },
  { value: 7,   suffix: '%', prefix: '−', label: 'drop in conversions per extra second of page load time', source: 'Akamai' },
  { value: 202, suffix: '%', prefix: '+', label: 'more conversions from personalised CTAs vs generic ones', source: 'HubSpot' },
]

const A2_CTA_PRINCIPLES = [
  'Lead with the benefit, not the action ("Get My Free Audit" not "Submit")',
  'Use first-person framing — it creates ownership and reduces friction',
  'Place CTAs at peak motivation moments, not just at the top of the page',
  'Make the button visually dominant — contrast is a conversion tool',
  'One CTA per page section — multiple options create decision paralysis',
]

function Article2({ onSelectArticle }) {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const sectionsRef = useSectionReveal()

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="blog-article blog-article--2">
      <section className="blog-hero blog-hero--amber">
        <div className="blog-hero-orb blog-hero-orb--a1" aria-hidden="true" />
        <div className="blog-hero-orb blog-hero-orb--a2" aria-hidden="true" />
        <div className="blog-hero-orb blog-hero-orb--a3" aria-hidden="true" />
        <div className="blog-hero-inner">
          <span className="blog-category blog-category--amber">Web Design · Conversion · Strategy</span>
          <h1 className="blog-title">
            <span className="blog-title-line">Dead on Arrival</span>
            <span className="blog-title-line blog-title-line--amber-gradient">Why Yours Isn't Converting</span>
          </h1>
          <p className="blog-subtitle">
            And What Actually Does — A forensic breakdown of why most business websites are haemorrhaging
            visitors, and the engineering principles that fix it for good.
          </p>
          <div className="blog-byline">
            <span className="blog-author blog-author--amber">By Siana Anyango</span>
            <span className="blog-dot" aria-hidden="true">·</span>
            <time className="blog-date" dateTime="2025-05">May 2025</time>
            <span className="blog-dot" aria-hidden="true">·</span>
            <span className="blog-read-time">10 min read</span>
          </div>
        </div>
        <div className="blog-hero-scroll" aria-hidden="true"><span /></div>
      </section>

      <section className="blog-section blog-intro" ref={(el) => { sectionsRef.current[0] = el }}>
        <div className="blog-section-inner">
          <p className="blog-lead blog-lead--amber">
            You paid for the domain. Hired the designer. Spent weeks on copy. Launched it to the world.
            And nothing happened. Not much, anyway.
          </p>
          <p className="blog-body">
            Your website is live — but is it <em>alive</em>? There's a difference. And that difference is
            measured in lost revenue, missed enquiries, and visitors who left without ever coming back.
          </p>
          <p className="blog-body">
            The uncomfortable truth is that most business websites are built to <em>look good</em> rather
            than <em>perform</em>. They communicate brand personality while failing to answer the only
            question visitors actually care about: <strong> "Can this business solve my problem?"</strong>
          </p>
          <p className="blog-body">
            This is a forensic breakdown of where websites go wrong — and what it takes to build one that
            actually works.
          </p>
        </div>
      </section>

      <blockquote className="blog-pullquote blog-pullquote--amber" ref={(el) => { sectionsRef.current[1] = el }}>
        <p>"A beautiful website that doesn't convert is just an expensive business card. And nobody keeps business cards."</p>
      </blockquote>

      <section className="blog-section blog-stats-section blog-stats-section--amber" ref={statsRef}>
        <div className="blog-section-inner">
          <h2 className="blog-section-title">The Damage in Numbers</h2>
          <p className="blog-body blog-body--intro-stats">
            The data on website conversion is bleak — and most business owners have no idea how much money
            is walking out the door every single day.
          </p>
          <div className="blog-stats-grid blog-stats-grid--amber">
            {A2_STATS.map((stat, i) => <StatCard key={i} {...stat} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      <section className="blog-section" ref={(el) => { sectionsRef.current[2] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--amber" aria-hidden="true">01</div>
          <h2 className="blog-section-title">The Credibility Gap</h2>
          <p className="blog-body">
            Most business websites communicate distrust before they say a word. Tiny fonts. Stock photos
            everyone has seen a hundred times. No testimonials. No evidence. No reason to believe anything
            on the page.
          </p>
          <p className="blog-body">
            In a landmark study by Stanford University's Persuasive Technology Lab,{' '}
            <strong>75% of users admitted to judging a company's credibility based on its website
            design alone</strong>. Not the product. Not the price. The design. Your website isn't just a
            digital brochure — it's a first impression that happens in 0.05 seconds. Fifty milliseconds.
            Before your headline fully loads, a subconscious judgment has already been made.
          </p>
          <div className="blog-verdict-box">
            <span className="blog-verdict-label">VERDICT</span>
            <p>
              <strong>Poor design is not an aesthetic problem. It is a trust problem.</strong> And trust
              is the foundation of every conversion. Fix the credibility gap first.
            </p>
          </div>
        </div>
      </section>

      <section className="blog-section blog-section--alt" ref={(el) => { sectionsRef.current[3] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--amber" aria-hidden="true">02</div>
          <h2 className="blog-section-title">Speed Kills (Slowly)</h2>
          <p className="blog-body">
            Google's research shows that <strong>53% of mobile users abandon a site that takes more than
            3 seconds to load</strong>. Not 10. Not 8. Three seconds — and more than half your visitors
            are gone, permanently.
          </p>
          <p className="blog-body">
            Portent's 2021 study found that a website converting at 1% at a 1-second load time sees that
            rate drop to 0.6% at 3 seconds — a 40% reduction, purely from latency. Akamai's research
            confirms: <strong>a 1-second delay reduces conversions by 7%</strong>. For a business
            generating £10,000/month from its website, that's £700 lost every month to a fixable
            technical problem.
          </p>
          <p className="blog-body">
            This isn't a technical problem. It is a revenue problem. And it is entirely solvable.
          </p>
          <div className="blog-verdict-box">
            <span className="blog-verdict-label">VERDICT</span>
            <p>
              <strong>Every second your site takes to load costs you money.</strong> Performance is not
              a developer luxury — it's a conversion prerequisite. Speed before aesthetics, always.
            </p>
          </div>
        </div>
      </section>

      <blockquote className="blog-pullquote blog-pullquote--amber-soft" ref={(el) => { sectionsRef.current[4] = el }}>
        <p>"Users leave pages in 10–20 seconds unless they find clear, specific value."</p>
        <cite>— Nielsen Norman Group</cite>
      </blockquote>

      <section className="blog-section" ref={(el) => { sectionsRef.current[5] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--amber" aria-hidden="true">03</div>
          <h2 className="blog-section-title">The Homepage Lie</h2>
          <p className="blog-body">
            Most homepages try to do everything and end up doing nothing. They're packed with information
            about the company — history, values, team bios, vision statements — when the visitor is asking
            only one question: <em>"Can this business solve my problem?"</em>
          </p>
          <p className="blog-body">
            The best-converting websites lead with <strong>outcomes, not origins</strong>. They answer
            the visitor's core question within 5 seconds — through a headline, a sub-headline, and a
            single clear call to action. Nothing more. According to Nielsen Norman Group, users leave
            pages in just 10–20 seconds unless they find clear, specific value.
          </p>
          <p className="blog-body">
            Your homepage has one job. One. Answer the visitor's question before they ask it — and then
            make it effortless to take the next step.
          </p>
        </div>
      </section>

      <section className="blog-section blog-section--alt" ref={(el) => { sectionsRef.current[6] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--amber" aria-hidden="true">04</div>
          <h2 className="blog-section-title">CTAs That Mean Something</h2>
          <p className="blog-body">
            "Submit." "Click here." "Learn more." These are not calls to action — they are calls to
            confusion. Generic CTAs are one of the most consistent conversion killers in digital design.
          </p>
          <p className="blog-body">
            High-converting CTAs are <strong>specific</strong>, <strong>benefit-led</strong>, and create
            a sense of momentum. According to HubSpot research, personalised CTAs convert{' '}
            <strong>202% better</strong> than generic ones. The difference between "Get Started" and
            "Get My Free Website Audit" isn't just wording — it's the difference between a bounce and a
            business lead.
          </p>
          <div className="blog-checklist">
            <h4 className="blog-checklist-title">Five CTA Principles That Convert</h4>
            {A2_CTA_PRINCIPLES.map((item, i) => (
              <div className="blog-checklist-item" key={i}>
                <span className="blog-checklist-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section" ref={(el) => { sectionsRef.current[7] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--amber" aria-hidden="true">05</div>
          <h2 className="blog-section-title">The Mobile Problem Nobody Addresses</h2>
          <p className="blog-body">
            As of 2024, <strong>60% of all web traffic comes from mobile devices</strong> (Statista). Yet
            a significant proportion of small business websites still fail to meet basic mobile usability
            standards — with text too small to read, buttons too close to tap accurately, and layouts
            that break on anything smaller than a laptop.
          </p>
          <p className="blog-body">
            If your website isn't optimised for a phone, you are invisible to more than half your market.
            Mobile-first is not a trend. It is the current reality of how your customers find, evaluate,
            and decide whether to trust you.
          </p>
          <div className="blog-verdict-box">
            <span className="blog-verdict-label">VERDICT</span>
            <p>
              <strong>Design for the phone first.</strong> A great desktop site with a broken mobile
              experience is a business losing more than half its potential customers before they've even
              read a word.
            </p>
          </div>
          <div className="blog-section-closer">
            <h3 className="blog-section-closer-title">Where MARSWEBZ Comes In</h3>
            <p className="blog-body">
              Every website we build is engineered around one obsession: <strong>conversion</strong>. We
              don't design for aesthetic awards. We design for results — fast-loading, mobile-first,
              persuasively structured digital experiences that turn visitors into clients.
            </p>
          </div>
        </div>
      </section>

      <section className="blog-section blog-closing">
        <div className="blog-section-inner">
          <h2 className="blog-closing-title blog-closing-title--amber">The Fix Starts with Understanding</h2>
          <p className="blog-body">
            A website that doesn't convert isn't a design problem. It is a <em>systems</em> problem —
            one that starts with understanding your visitor: their fears, their questions, their hesitations.
            Every pixel needs a reason. Every word needs a job.
          </p>
          <p className="blog-body">
            The difference between a 1% conversion rate and a 5% conversion rate isn't luck or budget.
            It's engineering. It's the product of knowing exactly what your visitor needs to see, feel,
            and believe — and delivering that before they even think to ask.
          </p>
          <p className="blog-body blog-body--closing-line">
            That's the difference between a website and a <strong>weapon.</strong>
          </p>
        </div>
      </section>

      <NextArticleCTA
        nextId="3"
        nextTitle="The Rise of Intelligent Businesses: Why Automation Is No Longer Optional"
        onSelectArticle={onSelectArticle}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   ARTICLE 3 — THE RISE OF INTELLIGENT BUSINESSES
───────────────────────────────────────────── */
const A3_STATS = [
  { value: 45,  suffix: '%', prefix: '',  label: 'of paid work activities automatable with current technology', source: 'McKinsey' },
  { value: 78,  suffix: '%', prefix: '',  label: 'of early automation adopters reinvested time saved into growth', source: 'Deloitte' },
  { value: 451, suffix: '%', prefix: '+', label: 'more qualified leads for businesses using marketing automation', source: 'HBR' },
  { value: 40,  suffix: '%', prefix: '+', label: 'projected productivity increase from AI automation by 2035', source: 'Accenture' },
]

const A3_APPLICATIONS = [
  { title: 'Lead Capture & CRM', body: 'Never lose a prospect to a missed follow-up. Automated pipelines capture, score, and nurture leads around the clock — without a human lifting a finger.' },
  { title: 'Email & Customer Journeys', body: 'Personalised communication at scale. Behaviour-triggered sequences that feel human but run themselves, converting prospects into loyal customers.' },
  { title: 'Invoicing & Finance Admin', body: 'Automated billing, payment chasing, and contract management. Your finance team freed from the tyranny of admin and refocused on strategy.' },
  { title: 'Social & Content Scheduling', body: 'Consistent digital presence without constant manual effort. Scheduled, tested, and optimised — so the algorithm never catches you silent.' },
  { title: 'Reporting & Analytics', body: 'Real-time dashboards that update themselves. Anomalies flagged automatically. Decisions driven by data, not gut — without a data analyst on payroll.' },
  { title: 'Customer Support Workflows', body: 'Intelligent triage that routes, responds, and resolves. AI-assisted support that scales with demand and never has an off day.' },
]

function Article3({ onSelectArticle }) {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const sectionsRef = useSectionReveal()

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="blog-article blog-article--3">
      <section className="blog-hero blog-hero--violet">
        <div className="blog-hero-orb blog-hero-orb--v1" aria-hidden="true" />
        <div className="blog-hero-orb blog-hero-orb--v2" aria-hidden="true" />
        <div className="blog-hero-orb blog-hero-orb--v3" aria-hidden="true" />
        <div className="blog-hero-inner">
          <span className="blog-category blog-category--violet">AI · Automation · Business Strategy</span>
          <h1 className="blog-title">
            <span className="blog-title-line">The Rise of</span>
            <span className="blog-title-line blog-title-line--violet-gradient">Intelligent Businesses</span>
          </h1>
          <p className="blog-subtitle">
            Why Automation Is No Longer Optional — A field report from the frontier of how the most
            competitive businesses in the world are pulling permanently ahead.
          </p>
          <div className="blog-byline">
            <span className="blog-author blog-author--violet">By Siana Anyango</span>
            <span className="blog-dot" aria-hidden="true">·</span>
            <time className="blog-date" dateTime="2025-06">June 2025</time>
            <span className="blog-dot" aria-hidden="true">·</span>
            <span className="blog-read-time">10 min read</span>
          </div>
        </div>
        <div className="blog-hero-scroll" aria-hidden="true"><span /></div>
      </section>

      <section className="blog-section blog-intro" ref={(el) => { sectionsRef.current[0] = el }}>
        <div className="blog-section-inner">
          <p className="blog-lead blog-lead--violet">
            Something fundamental has shifted. Quietly. Incrementally. And now — undeniably. The
            businesses pulling ahead of their competitors aren't necessarily working harder.
            They're working smarter — through automation.
          </p>
          <p className="blog-body">
            And the gap between those who have embraced this and those who haven't is widening every
            single quarter.
          </p>
          <p className="blog-body">
            In 2020, automation was a competitive advantage. By 2025, it has become table stakes. The
            businesses that haven't begun automating their core workflows aren't just inefficient —
            they're haemorrhaging talent, time, and market share to competitors who have.
          </p>
        </div>
      </section>

      <div className="blog-signal-bar" role="note">
        <span className="blog-signal-icon" aria-hidden="true">◈</span>
        <p>McKinsey estimates that up to <strong>45% of all paid work activities</strong> could be automated with technology that already exists today. The barrier isn't capability. It's decision.</p>
      </div>

      <section className="blog-section blog-stats-section blog-stats-section--violet" ref={statsRef}>
        <div className="blog-section-inner">
          <h2 className="blog-section-title">The Competitive Intelligence</h2>
          <p className="blog-body blog-body--intro-stats">
            The research on automation is consistent across every major consultancy and research institution:
            the businesses that automate compound their advantage faster than those that don't.
          </p>
          <div className="blog-stats-grid blog-stats-grid--violet">
            {A3_STATS.map((stat, i) => <StatCard key={i} {...stat} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      <section className="blog-section" ref={(el) => { sectionsRef.current[2] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--violet" aria-hidden="true">01</div>
          <h2 className="blog-section-title">The New Competitive Divide</h2>
          <p className="blog-body">
            There are now two types of businesses in every industry: those that have automated their
            core workflows, and those that are still paying human beings to do what a machine could
            execute in seconds.
          </p>
          <p className="blog-body">
            This divide is not about industry. It's not about company size or available budget. It is
            about <strong>operational philosophy</strong> — and it is compounding. Every week that a
            manual process continues to run is a week of accumulated inefficiency relative to a
            competitor who automated it six months ago.
          </p>
          <p className="blog-body">
            A Deloitte Insights report found that <strong>78% of early automation adopters</strong> had
            already reinvested the time saved into growth activities — new markets, new products, new
            clients. The efficiency gain doesn't disappear. It gets redeployed.
          </p>
        </div>
      </section>

      <section className="blog-section blog-section--alt" ref={(el) => { sectionsRef.current[3] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--violet" aria-hidden="true">02</div>
          <h2 className="blog-section-title">What Automation Actually Means</h2>
          <p className="blog-body">
            Let us clear up the most pervasive misconception: automation is not about replacing people.
            It is about <em>removing the barriers that prevent your people from doing their best work.</em>
          </p>
          <p className="blog-body">
            When a sales representative spends three hours manually entering data into a CRM instead of
            talking to clients — that is not a people problem. It is a systems problem. When your
            marketing team manually segments email lists, uploads social posts one by one, and chases
            unread follow-ups — that is not effort. That is inefficiency wearing the costume of
            productivity.
          </p>
          <p className="blog-body">
            Automation reclaims those hours. And when your best people stop spending their time on
            low-value repetition and start spending it on high-value judgment — the business compounds.
          </p>
          <div className="blog-signal-box">
            <span className="blog-signal-label">SIGNAL</span>
            <p>
              The most dangerous automation myth is "we're not big enough for that yet." Small businesses
              that automate early don't grow into automation — they <strong>grow because of it.</strong>
            </p>
          </div>
        </div>
      </section>

      <blockquote className="blog-pullquote blog-pullquote--violet" ref={(el) => { sectionsRef.current[4] = el }}>
        <p>"Automation isn't the future. It's the present — and the gap between those who act and those who wait is measured in quarters, not decades."</p>
      </blockquote>

      <section className="blog-section" ref={(el) => { sectionsRef.current[5] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--violet" aria-hidden="true">03</div>
          <h2 className="blog-section-title">The Cost of Waiting</h2>
          <p className="blog-body">
            Every day without automation is a day your competitor gains ground. Consider the maths:
            if your business saves just two hours per employee per week through automation, a
            ten-person team gains <strong>1,040 hours per year</strong>. That is the equivalent of
            hiring a full-time employee — without the salary, the benefits, or the onboarding.
          </p>
          <p className="blog-body">
            McKinsey's research estimates that 60% of all occupations have at least 30% of their
            activities that are automatable with currently available technology. The tools already
            exist. The workflows are already mappable. The only variable is whether you choose to
            use them.
          </p>
        </div>
      </section>

      <section className="blog-section blog-section--alt" ref={(el) => { sectionsRef.current[6] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--violet" aria-hidden="true">04</div>
          <h2 className="blog-section-title">Real Business Applications</h2>
          <p className="blog-body">
            The scope of what can be automated today — with no-code, low-code, and AI-powered
            tooling — is remarkable. A Harvard Business Review study found that companies using
            marketing automation see <strong>451% more qualified leads</strong> than those relying
            on manual processes. Here is where the gains are most immediate:
          </p>
          <div className="blog-automation-grid">
            {A3_APPLICATIONS.map(({ title, body }) => (
              <div className="blog-automation-card" key={title}>
                <div className="blog-automation-card-dot" aria-hidden="true" />
                <h4 className="blog-automation-card-title">{title}</h4>
                <p className="blog-automation-card-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section" ref={(el) => { sectionsRef.current[7] = el }}>
        <div className="blog-section-inner">
          <div className="blog-section-number blog-section-number--violet" aria-hidden="true">05</div>
          <h2 className="blog-section-title">AI + Automation: The Compounding Advantage</h2>
          <p className="blog-body">
            Automation removes the manual. AI adds the intelligent. Together, they create systems
            that don't just <em>do</em> — they <em>learn</em>.
          </p>
          <p className="blog-body">
            An AI-powered CRM doesn't just log contact details. It predicts which leads are most
            likely to convert and surfaces them at the optimal moment. An intelligent chatbot doesn't
            just answer FAQs. It qualifies prospects, routes enquiries by urgency, and hands off
            warm leads to the right person at the right time.
          </p>
          <p className="blog-body">
            Accenture projects that AI-powered automation could increase business productivity by
            <strong> up to 40% by 2035</strong>. The businesses building these capabilities now are
            not preparing for the future. They are creating it.
          </p>
          <div className="blog-signal-box">
            <span className="blog-signal-label">SIGNAL</span>
            <p>
              When automation and AI converge, businesses stop <em>reacting</em> and start{' '}
              <em>anticipating</em>. That is the difference between keeping up and pulling ahead —
              permanently.
            </p>
          </div>
          <div className="blog-section-closer blog-section-closer--violet">
            <h3 className="blog-section-closer-title">How MARSWEBZ Builds Intelligent Systems</h3>
            <p className="blog-body">
              This is the frontier we operate in. We build AI and automation workflows that integrate
              into your existing operations — without the disruption of a full overhaul. We map your
              processes, identify your bottlenecks, and engineer solutions that multiply your output
              without multiplying your headcount.
            </p>
            <p className="blog-body">Because intelligent businesses don't wait for the future. They build it.</p>
          </div>
        </div>
      </section>

      <section className="blog-section blog-closing">
        <div className="blog-section-inner">
          <h2 className="blog-closing-title blog-closing-title--violet">The Decision Is Already Overdue</h2>
          <p className="blog-body">
            Automation isn't a trend to observe from a safe distance. It is a decision to make —
            and the cost of deferring it compounds against you every single quarter.
          </p>
          <p className="blog-body">
            The businesses that will dominate their industries in the next decade are not necessarily
            the biggest or the best-funded. They are the most <em>intelligent</em>. The ones that
            understood, early enough, that the future doesn't belong to those who work the hardest —
            but to those who build the <strong>smartest systems.</strong>
          </p>
          <p className="blog-body blog-body--closing-line">
            Every inefficiency you accept today is a competitive disadvantage compounding quietly
            against you. <strong>The question is no longer whether to automate. It's how fast.</strong>
          </p>
        </div>
      </section>

      <NextArticleCTA
        nextId="1"
        nextTitle="The Architecture of Everything: How Information Systems Power Every Business"
        onSelectArticle={onSelectArticle}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   BLOG PAGE — MAIN EXPORT
───────────────────────────────────────────── */
export default function BlogPage({ onNavigate, initialArticle = null }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentArticle, setCurrentArticle] = useState(initialArticle)

  useEffect(() => { window.scrollTo(0, 0) }, [currentArticle])

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const articleClass =
    currentArticle === '2' ? 'blog-page--article-2' :
    currentArticle === '3' ? 'blog-page--article-3' :
    currentArticle === '1' ? 'blog-page--article-1' :
    'blog-page--index'

  const progressClass =
    currentArticle === '2' ? 'reading-progress--amber' :
    currentArticle === '3' ? 'reading-progress--violet' : ''

  return (
    <div className={`blog-page ${articleClass}`}>
      <div
        className={`reading-progress ${progressClass}`}
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

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

        <nav className="nav-desktop" aria-label="Blog navigation">
          <button className="nav-btn blog-icon-btn" type="button" onClick={() => onNavigate('home')} aria-label="Back to home">
            <Home size={13} aria-hidden="true" />
            <span>Home</span>
          </button>
          {currentArticle && (
            <button className="nav-btn blog-icon-btn" type="button" onClick={() => setCurrentArticle(null)}>
              <BookOpen size={13} aria-hidden="true" />
              <span>All Articles</span>
            </button>
          )}
          {NAV_ITEMS.map((item) => (
            <button key={item} className="nav-btn" type="button"><span>{item}</span></button>
          ))}
        </nav>

        <button className="hamburger" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile blog navigation">
          <button className="nav-btn mobile blog-icon-btn" type="button" onClick={() => { onNavigate('home'); setMenuOpen(false) }}>
            <Home size={13} aria-hidden="true" />
            <span>Home</span>
          </button>
          {currentArticle && (
            <button className="nav-btn mobile blog-icon-btn" type="button" onClick={() => { setCurrentArticle(null); setMenuOpen(false) }}>
              <BookOpen size={13} aria-hidden="true" />
              <span>All Articles</span>
            </button>
          )}
          {NAV_ITEMS.map((item) => (
            <button key={item} className="nav-btn mobile" type="button" onClick={() => setMenuOpen(false)}>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {currentArticle === null && <BlogIndex onSelectArticle={setCurrentArticle} />}
      {currentArticle === '1'  && <Article1  onSelectArticle={setCurrentArticle} />}
      {currentArticle === '2'  && <Article2  onSelectArticle={setCurrentArticle} />}
      {currentArticle === '3'  && <Article3  onSelectArticle={setCurrentArticle} />}

      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <div className="blog-footer-author">
            <div className="blog-footer-name">Siana Anyango</div>
            <div className="blog-footer-bio">Software Engineer &amp; Web Designer · MARSWEBZ</div>
          </div>
          <div className="blog-footer-actions">
            {currentArticle && (
              <button className="nav-btn blog-icon-btn blog-back-btn" type="button" onClick={() => setCurrentArticle(null)}>
                <BookOpen size={14} aria-hidden="true" />
                <span>All Articles</span>
              </button>
            )}
            <button className="nav-btn blog-icon-btn blog-back-btn" type="button" onClick={() => onNavigate('home')}>
              <Home size={14} aria-hidden="true" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
