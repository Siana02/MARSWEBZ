import './Footer.css'

const CAPABILITIES = [
  { label: 'Information Systems', page: 'explore' },
  { label: 'Brand Management',    page: 'brand-management' },
  { label: 'Digital Products',    page: 'websites-apps' },
  { label: 'AI & Automation',     page: 'automation-ai' },
]

const SERVICES = [
  'System Architecture Design',
  'Workflow & Process Optimization',
  'Brand Identity Design',
  'Brand Strategy',
  'Website Development',
  'UI/UX Design',
  'E-commerce Development',
  'SEO Optimization',
  'AI Integration',
  'Automation Systems',
  'Custom Web Applications',
  'Font & Digital Asset Creation',
]

const COMPANY = [
  { label: 'About',    page: 'about' },
  { label: 'Projects', page: 'projects' },
  { label: 'Insights', page: 'blog' },
  { label: 'Contact',  page: 'contact' },
]

const Footer = ({ onNavigate }) => {
  const nav = (page) => () => onNavigate && onNavigate(page)

  return (
    <footer className="site-footer" aria-label="Site footer">
      {/* Premium tagline divider */}
      <div className="site-footer__tagline-bar" aria-hidden="true">
        <span className="site-footer__tagline-line" />
        <span className="site-footer__tagline-text">Built with clarity. Designed for scale.</span>
        <span className="site-footer__tagline-line" />
      </div>

      {/* Main grid */}
      <div className="site-footer__grid">

        {/* Column 1 — Brand */}
        <div className="site-footer__col site-footer__col--brand">
          <button
            type="button"
            className="site-footer__logo"
            onClick={nav('home')}
            aria-label="MARSWEBZ — go to home"
          >
            MARSWEBZ
          </button>
          <p className="site-footer__brand-statement">
            We build digital systems, brands, and software solutions designed for clarity, performance, and scale — serving businesses globally.
          </p>
          <div className="site-footer__socials" aria-label="Social links">
            <a
              href="https://twitter.com/marswebz"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__social-link"
              aria-label="Twitter / X"
            >
              𝕏
            </a>
            <a
              href="https://www.linkedin.com/company/marswebz"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__social-link"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://github.com/marswebz"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__social-link"
              aria-label="GitHub"
            >
              gh
            </a>
          </div>
        </div>

        {/* Column 2 — Capabilities */}
        <div className="site-footer__col">
          <h3 className="site-footer__col-heading">Capabilities</h3>
          <ul className="site-footer__link-list" role="list">
            {CAPABILITIES.map(({ label, page }) => (
              <li key={label}>
                <button
                  type="button"
                  className="site-footer__link"
                  onClick={nav(page)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div className="site-footer__col site-footer__col--services">
          <h3 className="site-footer__col-heading">Services</h3>
          <ul className="site-footer__link-list site-footer__link-list--services" role="list">
            {SERVICES.map((s) => (
              <li key={s} className="site-footer__service-item">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Company */}
        <div className="site-footer__col">
          <h3 className="site-footer__col-heading">Company</h3>
          <ul className="site-footer__link-list" role="list">
            {COMPANY.map(({ label, page }) => (
              <li key={label}>
                <button
                  type="button"
                  className="site-footer__link"
                  onClick={nav(page)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5 — Get in Touch */}
        <div className="site-footer__col site-footer__col--contact">
          <h3 className="site-footer__col-heading">Get in Touch</h3>
          <a
            href="mailto:hello@marswebz.com"
            className="site-footer__contact-email"
          >
            hello@marswebz.com
          </a>
          <p className="site-footer__contact-location">Nairobi, Kenya</p>
          <p className="site-footer__contact-reach">
            Working with clients worldwide&nbsp;🌍
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <p className="site-footer__copyright">
          © 2026 MARSWEBZ. All rights reserved.
        </p>
        <div className="site-footer__legal-links">
          <button
            type="button"
            className="site-footer__legal-link"
            onClick={nav('privacy')}
          >
            Privacy Policy
          </button>
          <span className="site-footer__legal-sep" aria-hidden="true">·</span>
          <button
            type="button"
            className="site-footer__legal-link"
            onClick={nav('terms')}
          >
            Terms of Service
          </button>
          <span className="site-footer__legal-sep" aria-hidden="true">·</span>
          <button
            type="button"
            className="site-footer__legal-link"
            onClick={nav('privacy')}
          >
            Cookie Policy
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
