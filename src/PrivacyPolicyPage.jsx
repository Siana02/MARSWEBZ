import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Footer from './Footer'
import { useSEO } from './useSEO'
import './PrivacyPolicyPage.css'

const NAV_ITEMS = ['Services', 'About', 'Blog', 'Contact', 'Terms of Service']

const PRIVACY_SECTIONS = [
  {
    id: 'overview',
    number: '01',
    title: 'Overview & Commitment',
    accent: '#7ca4ff',
    content: [
      {
        type: 'text',
        value: 'MARSWEBZ ("we," "us," or "our") is committed to protecting your privacy and handling your personal data with transparency, integrity, and respect. This Privacy Policy explains how we collect, use, store, protect, and share your information when you visit our website, enquire about our services, or engage with us professionally.',
      },
      {
        type: 'text',
        value: 'We believe privacy is a fundamental right. We collect only what we need, use it only for the purposes stated, and never sell your data to third parties. This policy applies to all users of our website and all clients who engage our services.',
      },
      {
        type: 'list',
        items: [
          'This policy applies to information collected via our website, contact forms, email communications, and project engagements.',
          'By using our website or engaging our services, you consent to the practices described in this policy.',
          'We review and update this policy periodically. The effective date at the top of this page indicates when the latest revision was made.',
          'If you do not agree with this policy, please do not use our website or provide us with your personal information.',
        ],
      },
    ],
  },
  {
    id: 'information-collected',
    number: '02',
    title: 'Information We Collect',
    accent: '#ffc464',
    content: [
      {
        type: 'text',
        value: 'We collect personal information in a limited and purposeful way. Below is a full account of the categories of information we may collect and how we obtain it:',
      },
      {
        type: 'heading',
        value: 'Information You Provide Directly',
      },
      {
        type: 'list',
        items: [
          'Full name — provided when you fill in our contact form or project enquiry.',
          'Email address — used to respond to your enquiry and to communicate about your project.',
          'Phone number — if voluntarily provided in your message or during onboarding.',
          'Company or business name — if applicable, when provided in the course of a project enquiry.',
          'Project details and requirements — information you share about your business needs, goals, and expectations.',
          'Messages and communications — all written correspondence you send to us via our contact form or email.',
        ],
      },
      {
        type: 'heading',
        value: 'Information Collected Automatically',
      },
      {
        type: 'list',
        items: [
          'IP address — collected automatically by our hosting provider for security and diagnostic purposes.',
          'Browser type and version — used to understand how visitors access our site.',
          'Device type — desktop, mobile, or tablet, used for optimising the user experience.',
          'Pages visited and time spent — collected through analytics tools to understand how users interact with our website.',
          'Referring URL — the website that directed you to our site.',
          'Cookie data — small text files stored on your device (see our Cookie Policy section for full details).',
        ],
      },
      {
        type: 'heading',
        value: 'Information We Do Not Collect',
      },
      {
        type: 'list',
        items: [
          'We do not collect payment card details or banking information directly. All payment processing is handled by third-party payment providers.',
          'We do not collect sensitive personal data such as racial or ethnic origin, political opinions, religious beliefs, health data, or biometric data.',
          'We do not knowingly collect personal data from individuals under the age of 18.',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    number: '03',
    title: 'How We Use Your Information',
    accent: '#ff2a7e',
    content: [
      {
        type: 'text',
        value: 'We use your personal information solely for legitimate business purposes, as follows:',
      },
      {
        type: 'list',
        items: [
          'Responding to enquiries — to reply to contact form submissions, project requests, and general questions.',
          'Delivering services — to communicate with you throughout your project, coordinate deliverables, and manage the professional relationship.',
          'Invoicing and payments — to issue invoices and process billing information in connection with our services.',
          'Improving our website — to understand how visitors use our site and to enhance the user experience.',
          'Analytics and performance — to measure the effectiveness of our website and marketing presence (using anonymised or aggregated data).',
          'Legal compliance — to comply with applicable legal obligations, resolve disputes, and enforce our agreements.',
          'Portfolio and case studies — with your knowledge or permission, to feature completed work in our portfolio (see Intellectual Property in our Terms of Service).',
          'Security — to detect, prevent, and investigate fraudulent or unauthorised activity on our website.',
        ],
      },
      {
        type: 'text',
        value: 'We do not use your personal information for automated decision-making or profiling that produces legal or similarly significant effects without your explicit consent.',
      },
    ],
  },
  {
    id: 'legal-basis',
    number: '04',
    title: 'Legal Basis for Processing',
    accent: '#b347ea',
    content: [
      {
        type: 'text',
        value: 'Where applicable data protection laws require a legal basis for processing your personal data, we rely on the following grounds:',
      },
      {
        type: 'list',
        items: [
          'Contractual necessity — processing required to enter into or perform a contract with you (e.g., delivering a project you have engaged us for).',
          'Legitimate interests — processing that is in our legitimate business interests, provided these interests do not override your rights (e.g., improving our website, portfolio showcasing).',
          'Consent — where you have provided explicit, freely given consent (e.g., subscribing to communications or accepting non-essential cookies).',
          'Legal obligation — processing required to comply with our legal obligations under applicable law.',
        ],
      },
    ],
  },
  {
    id: 'data-retention',
    number: '05',
    title: 'Data Retention',
    accent: '#38bdf8',
    content: [
      {
        type: 'text',
        value: 'We retain your personal data for as long as is necessary for the purposes for which it was collected, or as required by applicable law.',
      },
      {
        type: 'list',
        items: [
          'Contact form submissions and general enquiries — retained for up to 2 years from the date of submission.',
          'Client project data and communications — retained for the duration of the project plus 5 years, for legal and contractual record-keeping purposes.',
          'Invoice and payment records — retained for a minimum of 7 years, as required for financial and tax compliance.',
          'Website analytics data — retained in anonymised or aggregated form for up to 26 months.',
          'Data provided via cookies — retained in accordance with our Cookie Policy (see below).',
        ],
      },
      {
        type: 'text',
        value: 'Once data is no longer needed and the retention period has expired, we will securely delete or anonymise it. You may request early deletion of your data — see the "Your Rights" section below.',
      },
    ],
  },
  {
    id: 'data-protection',
    number: '06',
    title: 'Data Protection & Security',
    accent: '#4ade80',
    content: [
      {
        type: 'text',
        value: 'We take the security of your personal information seriously and have implemented appropriate technical and organisational measures to protect it from unauthorised access, loss, misuse, or disclosure.',
      },
      {
        type: 'list',
        items: [
          'Our website uses HTTPS encryption to protect data transmitted between your browser and our servers.',
          'Access to client data is restricted to authorised MARSWEBZ personnel on a need-to-know basis.',
          'We do not store sensitive financial information (e.g., full card numbers) on our systems.',
          'We regularly review our security practices and update them in response to emerging threats.',
          'Where third-party services process your data on our behalf, we ensure appropriate data processing agreements are in place.',
        ],
      },
      {
        type: 'text',
        value: 'Despite our best efforts, no method of data transmission or storage is 100% secure. If you believe your personal data has been compromised, please contact us immediately at hello@marswebz.com.',
      },
    ],
  },
  {
    id: 'third-parties',
    number: '07',
    title: 'Third-Party Services',
    accent: '#fb923c',
    content: [
      {
        type: 'text',
        value: 'To operate our website and deliver our services, we may engage trusted third-party service providers. We only share the minimum data necessary for them to perform their function, and we ensure appropriate safeguards are in place.',
      },
      {
        type: 'list',
        items: [
          'Web Hosting & Infrastructure — our website is hosted on a third-party cloud hosting provider. Your IP address and browsing data may be processed by this provider in the course of standard server operations.',
          'Analytics — we may use tools such as Google Analytics or similar services to understand website traffic and user behaviour. These tools collect anonymised data including pages visited, time on site, and device type.',
          'Email Services — we use professional email infrastructure to communicate with clients and respond to enquiries.',
          'Payment Processing — if applicable, we use third-party payment processors to handle financial transactions. We do not store your payment credentials.',
          'Project Management Tools — we may use professional tools to manage project timelines and deliverables. Only essential project-related data is stored in these tools.',
        ],
      },
      {
        type: 'text',
        value: 'We do not sell, rent, or trade your personal information with any third party for marketing or commercial purposes. Third parties engaged by MARSWEBZ are required to handle your data in accordance with applicable data protection laws.',
      },
    ],
  },
  {
    id: 'your-rights',
    number: '08',
    title: 'Your Rights',
    accent: '#7ca4ff',
    content: [
      {
        type: 'text',
        value: 'Subject to applicable law, you have the following rights regarding your personal data. To exercise any of these rights, please contact us at hello@marswebz.com with a clear description of your request.',
      },
      {
        type: 'list',
        items: [
          'Right of Access — you may request a copy of the personal data we hold about you.',
          'Right to Rectification — you may request that we correct any inaccurate or incomplete personal data.',
          'Right to Erasure ("Right to be Forgotten") — you may request the deletion of your personal data, subject to our legal obligations to retain certain records.',
          'Right to Restriction of Processing — you may request that we restrict the processing of your personal data in certain circumstances.',
          'Right to Data Portability — where technically feasible, you may request your data in a structured, commonly used, and machine-readable format.',
          'Right to Object — you may object to our processing of your personal data where we rely on legitimate interests as the legal basis.',
          'Right to Withdraw Consent — where we process your data based on your consent, you may withdraw that consent at any time.',
          'Right to Lodge a Complaint — you have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.',
        ],
      },
      {
        type: 'text',
        value: 'We will respond to valid requests within 30 days. We may need to verify your identity before processing your request. We will not discriminate against you for exercising your rights.',
      },
    ],
  },
  {
    id: 'international',
    number: '09',
    title: 'International Data Transfers',
    accent: '#ffc464',
    content: [
      {
        type: 'text',
        value: 'MARSWEBZ is based in Nairobi, Kenya, and operates with clients worldwide. When you interact with our website or engage our services, your data may be processed in Kenya or in other countries where our third-party service providers are located.',
      },
      {
        type: 'list',
        items: [
          'We take reasonable steps to ensure that any international transfers of your personal data are carried out in compliance with applicable data protection laws.',
          'Where data is transferred to countries that may not provide the same level of data protection as your home country, we implement appropriate safeguards such as standard contractual clauses.',
          'By using our website or engaging our services, you acknowledge and consent to the transfer of your data as described in this policy.',
        ],
      },
    ],
  },
  {
    id: 'updates',
    number: '10',
    title: 'Updates to This Policy',
    accent: '#ff2a7e',
    content: [
      {
        type: 'text',
        value: 'This Privacy Policy may be updated periodically to reflect changes in our practices, applicable law, or business operations.',
      },
      {
        type: 'list',
        items: [
          'The "Effective Date" at the top of this policy indicates when the most recent revision was made.',
          'We will notify active clients of significant changes via email where reasonably practicable.',
          'Continued use of our website or services following any update constitutes acceptance of the revised policy.',
          'We encourage you to review this policy periodically to stay informed about how we protect your information.',
        ],
      },
    ],
  },
]

const COOKIE_SECTIONS = [
  {
    id: 'what-are-cookies',
    number: '01',
    title: 'What Are Cookies?',
    accent: '#ffc464',
    content: [
      {
        type: 'text',
        value: 'Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work efficiently, to improve user experience, and to provide information to website operators.',
      },
      {
        type: 'text',
        value: 'Cookies do not contain viruses or malware. They cannot execute programmes or deliver malware to your device. However, they can be used to track your browsing behaviour across websites, which is why we are transparent about how we use them.',
      },
    ],
  },
  {
    id: 'cookies-we-use',
    number: '02',
    title: 'Cookies We Use',
    accent: '#7ca4ff',
    content: [
      {
        type: 'text',
        value: 'We use the following categories of cookies on our website:',
      },
      {
        type: 'heading',
        value: 'Essential Cookies (Always Active)',
      },
      {
        type: 'list',
        items: [
          'These cookies are strictly necessary for the website to function correctly.',
          'They enable core functionality such as security, network management, and accessibility.',
          'You cannot opt out of essential cookies as the website would not function without them.',
          'Examples include: session management cookies, security tokens, and load balancing cookies.',
        ],
      },
      {
        type: 'heading',
        value: 'Analytics & Performance Cookies',
      },
      {
        type: 'list',
        items: [
          'These cookies help us understand how visitors interact with our website.',
          'They collect anonymised information such as the number of visitors, which pages are most visited, and how users navigate the site.',
          'This information helps us improve the website\'s performance and usability.',
          'Examples include: Google Analytics cookies (_ga, _gid), which track page visits and session duration.',
        ],
      },
      {
        type: 'heading',
        value: 'Preference Cookies',
      },
      {
        type: 'list',
        items: [
          'These cookies remember your settings and preferences to personalise your experience.',
          'Examples include: remembering your cookie consent choice, language preferences, or display settings.',
        ],
      },
      {
        type: 'heading',
        value: 'Marketing & Tracking Cookies',
      },
      {
        type: 'list',
        items: [
          'We do not currently use marketing or advertising cookies that track you across other websites.',
          'If this changes in future, this policy will be updated accordingly and your consent will be sought before such cookies are placed.',
        ],
      },
    ],
  },
  {
    id: 'cookie-durations',
    number: '03',
    title: 'Cookie Duration',
    accent: '#b347ea',
    content: [
      {
        type: 'text',
        value: 'Cookies can be either session cookies or persistent cookies:',
      },
      {
        type: 'list',
        items: [
          'Session Cookies — these are temporary and are deleted automatically when you close your browser. They are used to maintain continuity during a single browsing session.',
          'Persistent Cookies — these remain on your device for a defined period (or until you delete them manually). They enable the website to recognise you on future visits.',
          'Our analytics cookies typically persist for up to 2 years from the date they are set.',
          'Preference cookies (e.g., your cookie consent choice) persist for up to 12 months.',
        ],
      },
    ],
  },
  {
    id: 'managing-cookies',
    number: '04',
    title: 'Managing Your Cookie Preferences',
    accent: '#38bdf8',
    content: [
      {
        type: 'text',
        value: 'You have full control over the non-essential cookies placed on your device. You can manage your preferences at any time through the following methods:',
      },
      {
        type: 'heading',
        value: 'Browser Settings',
      },
      {
        type: 'list',
        items: [
          'Most browsers allow you to view, manage, delete, and block cookies through their settings.',
          'Google Chrome: Settings → Privacy and Security → Cookies and other site data.',
          'Mozilla Firefox: Settings → Privacy & Security → Cookies and Site Data.',
          'Safari: Preferences → Privacy → Manage Website Data.',
          'Microsoft Edge: Settings → Cookies and site permissions → Cookies and site data.',
          'Note: Blocking all cookies may affect the functionality of this and other websites you visit.',
        ],
      },
      {
        type: 'heading',
        value: 'Google Analytics Opt-Out',
      },
      {
        type: 'list',
        items: [
          'To opt out of Google Analytics tracking specifically, you can install the Google Analytics Opt-Out Browser Add-on, available at: tools.google.com/dlpage/gaoptout',
          'This prevents the Google Analytics JavaScript from sharing information about your visit with Google.',
        ],
      },
      {
        type: 'heading',
        value: 'Cookie Banner',
      },
      {
        type: 'list',
        items: [
          'When you first visit our website, a cookie consent banner will appear allowing you to Accept All, Manage Preferences, or Reject Non-Essential cookies.',
          'You may update your preferences at any time by clearing your cookies and revisiting the site.',
        ],
      },
    ],
  },
  {
    id: 'third-party-cookies',
    number: '05',
    title: 'Third-Party Cookies',
    accent: '#4ade80',
    content: [
      {
        type: 'text',
        value: 'Some cookies on our website are set by third-party services that appear on our pages. We have no direct control over these cookies, but we aim to use only reputable third-party services with clear privacy practices.',
      },
      {
        type: 'list',
        items: [
          'Google Analytics — analytics and website performance tracking. Privacy Policy: policies.google.com/privacy',
          'Hosting Provider — may set technical cookies for server load balancing and security.',
          'We do not embed third-party social media tracking pixels that set cookies without your knowledge.',
        ],
      },
    ],
  },
]

export default function PrivacyPolicyPage({ onNavigate }) {
  useSEO({
    title: 'Privacy Policy — MARSWEBZ',
    description: "Read MARSWEBZ's privacy policy — how we collect, use, and protect your personal data with transparency and respect.",
  })

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('privacy')
  const heroRef = useRef(null)
  const sectionRefs = useRef([])
  const cookieSectionRefs = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    const targets = [
      heroRef.current,
      ...sectionRefs.current.filter(Boolean),
      ...cookieSectionRefs.current.filter(Boolean),
    ]
    targets.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [activeTab])

  const handleNav = (item) => () => {
    setMenuOpen(false)
    if (!onNavigate) return
    if (item === 'Services')           onNavigate('explore')
    else if (item === 'About')         onNavigate('about')
    else if (item === 'Blog')          onNavigate('blog')
    else if (item === 'Contact')       onNavigate('home')
    else if (item === 'Terms of Service') onNavigate('terms')
  }

  const renderBlock = (block, bi, secAccent, refs, index) => {
    if (block.type === 'text') {
      return <p key={bi} className="pp-body-text">{block.value}</p>
    }
    if (block.type === 'heading') {
      return <h3 key={bi} className="pp-sub-heading" style={{ color: secAccent }}>{block.value}</h3>
    }
    if (block.type === 'list') {
      return (
        <ul key={bi} className="pp-list">
          {block.items.map((item, ii) => (
            <li key={ii} className="pp-list-item">
              <span className="pp-list-dot" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    }
    return null
  }

  return (
    <div className="pp-page">

      {/* ── BG ── */}
      <div className="pp-bg" aria-hidden="true">
        <div className="pp-bg-rotate">
          <svg className="pp-bg-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {[50,105,165,225,290,355,390].map((r) => (
              <circle key={r} cx="400" cy="400" r={r}
                fill="none" stroke="rgba(140,180,255,0.12)" strokeWidth="1" />
            ))}
            {Array.from({length:15},(_,i)=>i*24).map((deg) => {
              const rad = (deg * Math.PI) / 180
              return <line key={deg} x1="400" y1="400"
                x2={400+390*Math.cos(rad)} y2={400+390*Math.sin(rad)}
                stroke="rgba(140,180,255,0.08)" strokeWidth="1" />
            })}
          </svg>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="pp-header">
        <div
          className="pp-header-logo"
          onClick={() => onNavigate && onNavigate('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('home')}
          aria-label="Go to home page"
        >
          MARS<span className="pp-logo-accent">WEBZ</span>
        </div>

        <nav className="pp-nav-desktop" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className="pp-nav-btn" type="button" onClick={handleNav(item)}>
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="pp-header-right">
          <button
            type="button"
            className="pp-back-btn"
            onClick={() => onNavigate && onNavigate('home')}
            aria-label="Back to home"
          >
            ← Home
          </button>
          <button
            className="pp-hamburger"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className={`pp-nav-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className="pp-nav-btn mobile" type="button" onClick={handleNav(item)}>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="pp-hero-inner" ref={heroRef}>
          <span className="pp-eyebrow">LEGAL DOCUMENT · EFFECTIVE DATE: JANUARY 1, 2025</span>
          <h1 className="pp-hero-title">
            Privacy & <span className="pp-hero-title--accent">COOKIE</span> Policy
          </h1>
          <p className="pp-hero-subtitle">
            Your privacy matters. This document explains exactly how MARSWEBZ collects, uses, protects, and respects your personal information — and how we use cookies on this website.
          </p>
          <div className="pp-hero-note">
            <span className="pp-hero-note-icon" aria-hidden="true">🔒</span>
            <span>We never sell your data. We collect only what we need. We protect what you share.</span>
          </div>
        </div>
        <div className="pp-hero-orb pp-hero-orb--blue" aria-hidden="true" />
        <div className="pp-hero-orb pp-hero-orb--violet" aria-hidden="true" />
      </section>

      {/* ── TABS ── */}
      <div className="pp-tabs" role="tablist" aria-label="Policy sections">
        <button
          className={`pp-tab${activeTab === 'privacy' ? ' active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'privacy'}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy Policy
        </button>
        <button
          className={`pp-tab${activeTab === 'cookies' ? ' active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'cookies'}
          onClick={() => setActiveTab('cookies')}
        >
          🍪 Cookie Policy
        </button>
      </div>

      {/* ── PRIVACY POLICY CONTENT ── */}
      {activeTab === 'privacy' && (
        <main className="pp-main" aria-label="Privacy Policy content">

          {/* TOC */}
          <div className="pp-toc-wrapper">
            <div className="pp-toc-inner">
              <h2 className="pp-toc-title">Quick Navigation</h2>
              <ol className="pp-toc-list">
                {PRIVACY_SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="pp-toc-link" style={{ '--toc-accent': s.accent }}>
                      <span className="pp-toc-num">{s.number}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {PRIVACY_SECTIONS.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="pp-section"
              ref={(el) => { sectionRefs.current[i] = el }}
              style={{ '--sec-accent': section.accent, transitionDelay: `${i * 0.04}s` }}
              aria-label={section.title}
            >
              <div className="pp-section-inner">
                <div className="pp-section-header">
                  <span className="pp-section-num">{section.number}</span>
                  <h2 className="pp-section-title">{section.title}</h2>
                  <div className="pp-section-line" aria-hidden="true" />
                </div>
                <div className="pp-section-body">
                  {section.content.map((block, bi) => renderBlock(block, bi, section.accent, sectionRefs, i))}
                </div>
              </div>
            </section>
          ))}
        </main>
      )}

      {/* ── COOKIE POLICY CONTENT ── */}
      {activeTab === 'cookies' && (
        <main className="pp-main" aria-label="Cookie Policy content">
          <div className="pp-cookie-intro">
            <div className="pp-cookie-intro-inner">
              <span className="pp-cookie-intro-icon" aria-hidden="true">🍪</span>
              <p className="pp-cookie-intro-text">
                This Cookie Policy explains how MARSWEBZ uses cookies and similar tracking technologies on our website. It should be read alongside our Privacy Policy above.
              </p>
            </div>
          </div>

          {/* TOC */}
          <div className="pp-toc-wrapper">
            <div className="pp-toc-inner">
              <h2 className="pp-toc-title">Quick Navigation</h2>
              <ol className="pp-toc-list">
                {COOKIE_SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#cookie-${s.id}`} className="pp-toc-link" style={{ '--toc-accent': s.accent }}>
                      <span className="pp-toc-num">{s.number}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {COOKIE_SECTIONS.map((section, i) => (
            <section
              key={section.id}
              id={`cookie-${section.id}`}
              className="pp-section"
              ref={(el) => { cookieSectionRefs.current[i] = el }}
              style={{ '--sec-accent': section.accent, transitionDelay: `${i * 0.04}s` }}
              aria-label={section.title}
            >
              <div className="pp-section-inner">
                <div className="pp-section-header">
                  <span className="pp-section-num">{section.number}</span>
                  <h2 className="pp-section-title">{section.title}</h2>
                  <div className="pp-section-line" aria-hidden="true" />
                </div>
                <div className="pp-section-body">
                  {section.content.map((block, bi) => renderBlock(block, bi, section.accent, cookieSectionRefs, i))}
                </div>
              </div>
            </section>
          ))}
        </main>
      )}

      {/* ── CLOSING ── */}
      <section className="pp-closing" aria-label="Contact and closing">
        <div className="pp-closing-inner">
          <span className="pp-eyebrow">QUESTIONS?</span>
          <h2 className="pp-closing-title">
            We&apos;re <span className="pp-closing-title--accent">TRANSPARENT</span>
          </h2>
          <p className="pp-closing-text">
            If you have any questions about our Privacy Policy, Cookie Policy, or how we handle your data, please contact our team. We are committed to responding within 30 days.
          </p>
          <a href="mailto:hello@marswebz.com" className="pp-closing-email">hello@marswebz.com</a>
          <div className="pp-closing-actions">
            <button type="button" className="pp-btn-primary" onClick={() => onNavigate && onNavigate('terms')}>
              <span>Terms of Service</span>
            </button>
            <button type="button" className="pp-btn-secondary" onClick={() => onNavigate && onNavigate('home')}>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
        <div className="pp-closing-orb" aria-hidden="true" />
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
