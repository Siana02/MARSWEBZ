import { useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import { PROJECTS as ALL_PROJECTS } from './projectsData'
import Footer from './Footer'
import './ProjectsPage.css'

export default function ProjectsPage({ onNavigate }) {
  const cardRefs  = useRef([])
  const headerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('pp-in-view'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    const targets = [headerRef.current, ...cardRefs.current.filter(Boolean)]
    targets.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pp-page">

      {/* Spider-web bg (same as landing) */}
      <div className="pp-web-bg" aria-hidden="true">
        <div className="pp-web-rotate">
          <svg className="pp-web-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
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
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="pp-header">
        <div className="pp-header-logo">MARS<span className="pp-logo-webz">WEBZ</span></div>
        <button
          type="button"
          className="pp-back-btn"
          onClick={() => onNavigate && onNavigate('home')}
        >
          <ArrowLeft size={15} strokeWidth={2}/>
          <span>Back to Home</span>
        </button>
      </header>

      {/* Content */}
      <main className="pp-main">

        {/* Page header */}
        <div className="pp-page-header" ref={headerRef}>
          <span className="pp-eyebrow">FEATURED WORK</span>
          <h1 className="pp-heading">
            Systems We've{' '}
            <span className="pp-heading--accent">Built</span>
          </h1>
          <p className="pp-subheading">
            Intentional. Strategic. High-level. Each system represents a real-world concept
            engineered to push digital experiences forward.
          </p>
        </div>

        {/* Projects grid */}
        <div className="pp-grid">
          {ALL_PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className="pp-card"
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                '--pp-accent': project.accentColor,
                '--pp-glow':   project.accentGlow,
                '--pp-delay':  `${i * 0.14}s`,
              }}
            >
              {/* Image frame */}
              <div className="pp-card-visual">
                <div className="pp-frame">
                  <div className="pp-frame-bar" aria-hidden="true">
                    <span className="pp-dot pp-dot--red"   />
                    <span className="pp-dot pp-dot--yellow"/>
                    <span className="pp-dot pp-dot--green" />
                    <div className="pp-url-bar" />
                  </div>
                  <div className="pp-frame-screen">
                    <img
                      src={project.image}
                      alt={`${project.title} interface`}
                      className="pp-img"
                      loading="lazy"
                    />
                    <div className="pp-img-overlay" aria-hidden="true" />
                    <div className="pp-scanline"   aria-hidden="true" />
                  </div>
                </div>
                <div className="pp-glow-blob" aria-hidden="true" />
              </div>

              {/* Text */}
              <div className="pp-card-content">
                <div className="pp-card-top">
                  <span className="pp-card-tag">{project.tag}</span>
                  <span className="pp-card-status">{project.status}</span>
                </div>
                <h2 className="pp-card-title">{project.title}</h2>
                <p className="pp-card-desc">{project.description}</p>
                <div className="pp-card-badges">
                  {project.badges.map((b) => (
                    <span key={b} className="pp-badge">{b}</span>
                  ))}
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="pp-accent-bar" aria-hidden="true" />
            </article>
          ))}

          {/* Coming-soon placeholder */}
          <div className="pp-coming-soon">
            <div className="pp-cs-inner">
              <div className="pp-cs-icon" aria-hidden="true">
                <span/>
                <span/>
                <span/>
              </div>
              <p className="pp-cs-label">More systems incoming</p>
              <p className="pp-cs-sub">Stay tuned as we build and release the next wave.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pp-cta-wrap">
          <p className="pp-cta-text">
            Interested in what we can build for your business?
          </p>
          <button
            type="button"
            className="pp-cta-btn"
            onClick={() => onNavigate && onNavigate('explore')}
          >
            <span>Explore Our Services</span>
          </button>
        </div>

      </main>

      {/* Ambient orbs */}
      <div className="pp-orb pp-orb--cyan"   aria-hidden="true" />
      <div className="pp-orb pp-orb--violet" aria-hidden="true" />

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
