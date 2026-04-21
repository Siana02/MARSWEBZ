import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Footer from './Footer'
import { useSEO } from './useSEO'
import './TermsOfServicePage.css'

const NAV_ITEMS = ['Services', 'About', 'Blog', 'Contact', 'Privacy Policy']

const SECTIONS = [
  {
    id: 'introduction',
    number: '01',
    title: 'Introduction',
    accent: '#7ca4ff',
    content: [
      {
        type: 'text',
        value: 'These Terms of Service ("Terms") govern all services provided by MARSWEBZ ("we," "us," or "our") to clients ("you" or "Client"). By engaging our services, requesting a proposal, signing a project agreement, or making any payment, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.',
      },
      {
        type: 'text',
        value: 'These Terms constitute a legally binding contract between you and MARSWEBZ. If you do not agree to these Terms, you must not engage our services. MARSWEBZ reserves the right to update these Terms at any time; continued engagement of our services following any update constitutes acceptance of the revised Terms.',
      },
      {
        type: 'list',
        items: [
          'These Terms apply to all service engagements, regardless of how they are initiated.',
          'All project-specific details (scope, deliverables, pricing) will be set out in a separate Project Agreement or Statement of Work.',
          'In the event of a conflict between these Terms and a Project Agreement, the Project Agreement shall prevail for that specific engagement.',
          'All communications, agreements, and contracts with MARSWEBZ are conducted in English.',
        ],
      },
    ],
  },
  {
    id: 'services',
    number: '02',
    title: 'Services Provided',
    accent: '#ffc464',
    content: [
      {
        type: 'text',
        value: 'MARSWEBZ is a digital systems studio that provides a range of professional digital services. Our core offering encompasses, but is not limited to:',
      },
      {
        type: 'list',
        items: [
          'Information Systems & Architecture — strategic planning, system design, workflow architecture, and process optimisation.',
          'Web & Application Development — custom websites, web applications, e-commerce platforms, landing pages, and UI/UX design.',
          'Brand Management & Identity — brand strategy, visual identity systems, logo design, typography, and brand guidelines.',
          'AI & Automation Solutions — intelligent workflow automation, AI integration, custom automation systems, and operational efficiency consulting.',
          'Digital Asset Creation — custom font design, digital collateral, and brand asset production.',
          'SEO & Performance Optimisation — search engine optimisation, performance auditing, and ongoing digital growth strategies.',
        ],
      },
      {
        type: 'text',
        value: 'The specific services to be delivered in any engagement will be defined in the Project Agreement. MARSWEBZ reserves the right to decline any project at its sole discretion without providing a reason.',
      },
    ],
  },
  {
    id: 'scope',
    number: '03',
    title: 'Project Scope & Changes',
    accent: '#ff2a7e',
    content: [
      {
        type: 'text',
        value: 'All projects are governed by an agreed scope of work set out in the Project Agreement. This scope defines the deliverables, timelines, and total cost of the engagement. Strict scope management is essential to ensure quality outcomes and fair treatment of both parties.',
      },
      {
        type: 'list',
        items: [
          'Any work requested that falls outside the agreed scope constitutes a Change Request and must be formally agreed upon before work commences.',
          'Change Requests may require additional time, cost, or both. MARSWEBZ will provide a revised estimate before proceeding with out-of-scope work.',
          '"Just one small thing" requests that incrementally expand the project will be treated as Change Requests and billed accordingly.',
          'Verbal scope changes are not binding. All scope changes must be confirmed in writing (email, message, or signed amendment) to be valid.',
          'Repeated or significant scope changes may result in a full project re-scoping, revised timeline, and revised pricing.',
          'MARSWEBZ is not obligated to perform any work not explicitly defined in the agreed scope without a formal Change Request.',
        ],
      },
      {
        type: 'text',
        value: 'We encourage all clients to thoroughly review and confirm the scope of work prior to project commencement. Taking time to define requirements clearly upfront protects both parties and results in superior outcomes.',
      },
    ],
  },
  {
    id: 'payments',
    number: '04',
    title: 'Payments & Pricing',
    accent: '#b347ea',
    content: [
      {
        type: 'text',
        value: 'All pricing is agreed upon in writing prior to project commencement. MARSWEBZ requires financial commitment from clients before allocating resources, time, and expertise to any engagement.',
      },
      {
        type: 'list',
        items: [
          'A non-refundable deposit of no less than 50% of the total project value is required before any work begins.',
          'The remaining balance is due upon project completion, or in accordance with milestone payment schedules set out in the Project Agreement.',
          'For ongoing or retainer engagements, invoices are issued monthly and are due within 14 days of the invoice date.',
          'Late payments (exceeding the agreed due date) may result in project work being suspended until the outstanding balance is settled.',
          'Continued non-payment may result in permanent project cancellation, with all work completed up to that point compensated in full.',
          'All prices quoted are exclusive of any applicable taxes unless explicitly stated otherwise.',
          'International wire transfer fees, bank charges, or currency conversion costs are the responsibility of the client.',
          'MARSWEBZ reserves the right to charge a late payment fee of 5% of the outstanding invoice amount per month for invoices unpaid beyond 30 days.',
          'All quotes and proposals are valid for 14 days from the date of issue. After this period, pricing may be revised.',
        ],
      },
    ],
  },
  {
    id: 'timelines',
    number: '05',
    title: 'Timelines & Delivery',
    accent: '#38bdf8',
    content: [
      {
        type: 'text',
        value: 'MARSWEBZ is committed to delivering projects to the highest standard within agreed timelines. However, project delivery is inherently collaborative and depends on timely input and cooperation from both parties.',
      },
      {
        type: 'list',
        items: [
          'All timelines provided are estimates based on the agreed scope and are subject to change based on client responsiveness.',
          'Delays caused by late or incomplete client feedback, missing content, unapproved designs, or slow decision-making will result in corresponding timeline extensions.',
          'MARSWEBZ will communicate proactively when a timeline is at risk. Clients will be notified of any delays and the reasons therefor.',
          'If a client causes a delay of more than 14 consecutive days without communication, MARSWEBZ reserves the right to pause the project and re-schedule based on current availability.',
          'Rush or expedited delivery requests are subject to additional charges and must be agreed upon in writing.',
          'Force majeure events (including but not limited to power outages, natural disasters, or internet service interruptions) that affect delivery timelines are not the liability of MARSWEBZ.',
        ],
      },
    ],
  },
  {
    id: 'client-responsibilities',
    number: '06',
    title: 'Client Responsibilities',
    accent: '#4ade80',
    content: [
      {
        type: 'text',
        value: 'A successful project outcome is a shared responsibility. By engaging MARSWEBZ, the client commits to fulfilling the following obligations throughout the project lifecycle:',
      },
      {
        type: 'list',
        items: [
          'Provide all required content, assets, credentials, and information in a timely and complete manner as requested by MARSWEBZ.',
          'Designate a primary point of contact who is authorised to make decisions and approve work on behalf of the client.',
          'Respond to communications, requests for feedback, and approval requests within 3 business days unless otherwise agreed.',
          'Provide clear, constructive, and consolidated feedback. Contradictory or piecemeal feedback may result in additional revision charges.',
          'Ensure that all content, images, logos, and materials provided to MARSWEBZ are owned by the client or properly licensed for commercial use.',
          'Review and test deliverables thoroughly and within the timeframe provided. Approval of deliverables constitutes acceptance.',
          'Maintain confidentiality of any project-specific information, strategies, or systems developed exclusively for the client.',
          'Promptly notify MARSWEBZ of any changes to project requirements, business direction, or stakeholder decisions that may affect the project.',
        ],
      },
    ],
  },
  {
    id: 'revisions',
    number: '07',
    title: 'Revisions & Amendments',
    accent: '#fb923c',
    content: [
      {
        type: 'text',
        value: 'Revisions are an integral part of the creative and development process. MARSWEBZ includes a defined number of revision rounds within each project scope to allow for refinement and alignment.',
      },
      {
        type: 'list',
        items: [
          'The number of included revision rounds will be specified in the Project Agreement (typically 2–3 rounds per deliverable).',
          'A revision round is defined as one consolidated set of feedback submitted at one time. Multiple separate feedback submissions are counted as separate revision rounds.',
          'Revisions must be requested within 7 days of receiving the deliverable. Requests submitted after this period may be treated as new scope.',
          'Revisions that require fundamental redesigns, significant structural changes, or changes resulting from altered client requirements (not original brief) are not included in standard revisions.',
          'Additional revisions beyond the included rounds are billed at an agreed hourly or fixed rate.',
          'MARSWEBZ will not accept revision requests that contradict previously approved work without treating them as additional scope.',
        ],
      },
    ],
  },
  {
    id: 'intellectual-property',
    number: '08',
    title: 'Intellectual Property',
    accent: '#7ca4ff',
    content: [
      {
        type: 'text',
        value: 'Intellectual property rights are a critical aspect of all creative and development engagements. The following terms apply to all work produced by MARSWEBZ:',
      },
      {
        type: 'list',
        items: [
          'All final deliverables transfer to the client upon receipt of full and final payment. No IP transfer occurs until the total outstanding balance is settled.',
          'Until full payment is received, all work product — including designs, code, concepts, and strategies — remains the exclusive property of MARSWEBZ.',
          'MARSWEBZ retains the right to showcase all completed work in its portfolio, case studies, social media, and marketing materials unless a specific Non-Disclosure Agreement (NDA) is in place.',
          'MARSWEBZ retains ownership of all proprietary methodologies, frameworks, processes, tools, and pre-existing code libraries used in the delivery of services.',
          'The client warrants that all materials, content, trademarks, and assets provided to MARSWEBZ do not infringe on the intellectual property rights of any third party.',
          'In the event of non-payment, MARSWEBZ reserves the right to revoke any licence previously granted to the client for use of delivered work.',
          'Open-source components or third-party libraries incorporated into project deliverables remain subject to their respective licences.',
        ],
      },
    ],
  },
  {
    id: 'termination',
    number: '09',
    title: 'Termination',
    accent: '#ff2a7e',
    content: [
      {
        type: 'text',
        value: 'Either party may terminate a project engagement under specific conditions. Termination does not eliminate financial obligations incurred up to the point of termination.',
      },
      {
        type: 'list',
        items: [
          'Either party may terminate the engagement by providing 14 days\' written notice to the other party.',
          'MARSWEBZ may terminate the engagement immediately, without notice, in cases of: non-payment, breach of these Terms, abusive or threatening conduct, or fraudulent misrepresentation.',
          'The client may terminate the engagement upon written notice. However, all work completed up to the point of termination must be paid in full, including any work in progress.',
          'The initial deposit is non-refundable under all circumstances, as it compensates MARSWEBZ for resources allocated and opportunity costs incurred.',
          'No refunds will be issued for work already completed, approved, or delivered at the point of termination.',
          'Upon termination initiated by the client, MARSWEBZ will provide all completed deliverables in exchange for full payment of work done to date.',
          'In the event of dispute leading to termination, MARSWEBZ reserves the right to withhold final deliverables until the matter is fully resolved.',
          'Repeated project restarts, extended pauses initiated by the client, or abandonment followed by re-engagement may be treated as new projects requiring fresh deposits.',
        ],
      },
    ],
  },
  {
    id: 'liability',
    number: '10',
    title: 'Limitation of Liability',
    accent: '#ffc464',
    content: [
      {
        type: 'text',
        value: 'MARSWEBZ provides professional digital services to the highest standard. However, we operate in a complex digital environment, and the following limitations apply:',
      },
      {
        type: 'list',
        items: [
          'MARSWEBZ is not liable for any indirect, incidental, consequential, special, or punitive damages arising from the use or inability to use delivered products or services.',
          'MARSWEBZ\'s total liability in any circumstance shall not exceed the total amount paid by the client for the specific service giving rise to the claim.',
          'MARSWEBZ is not responsible for third-party services, platforms, APIs, or hosting environments and any downtime, errors, or data loss they may cause.',
          'MARSWEBZ does not guarantee specific business outcomes, revenue results, search engine rankings, or performance metrics from its services.',
          'The client is responsible for maintaining backups of their own data, content, and systems. MARSWEBZ is not liable for data loss unless caused directly by our negligence.',
          'MARSWEBZ is not liable for damages resulting from the client\'s misuse, modification, or improper implementation of delivered work.',
          'Nothing in these Terms shall limit MARSWEBZ\'s liability for gross negligence, fraud, or wilful misconduct.',
        ],
      },
    ],
  },
  {
    id: 'confidentiality',
    number: '11',
    title: 'Confidentiality',
    accent: '#b347ea',
    content: [
      {
        type: 'text',
        value: 'Both parties agree to treat sensitive and proprietary information shared during the course of an engagement with the utmost confidentiality.',
      },
      {
        type: 'list',
        items: [
          'Each party agrees not to disclose the other\'s confidential information to third parties without prior written consent.',
          'Confidential information includes, but is not limited to: business strategies, financial data, client lists, proprietary systems, and project-specific details.',
          'This obligation of confidentiality survives the termination or completion of the engagement.',
          'MARSWEBZ may, however, disclose client information if required by law, regulation, or court order.',
          'Portfolio rights reserved in Section 08 (Intellectual Property) are not restricted by this confidentiality clause, unless a separate NDA is in place.',
        ],
      },
    ],
  },
  {
    id: 'governing-law',
    number: '12',
    title: 'Governing Law & Disputes',
    accent: '#38bdf8',
    content: [
      {
        type: 'text',
        value: 'These Terms are governed by and construed in accordance with the laws of Kenya. In the event of any dispute, both parties agree to seek resolution through the following process:',
      },
      {
        type: 'list',
        items: [
          'Both parties shall first attempt to resolve any dispute through good-faith negotiation within 14 days of written notice of the dispute.',
          'If negotiation fails, both parties agree to submit to mediation before initiating formal legal proceedings.',
          'Formal legal disputes shall be subject to the jurisdiction of the courts of Kenya.',
          'The client waives the right to participate in class action or collective lawsuits against MARSWEBZ.',
          'The prevailing party in any formal legal proceeding shall be entitled to recover reasonable legal costs from the non-prevailing party.',
          'These Terms shall not be construed against MARSWEBZ as the drafting party.',
        ],
      },
    ],
  },
]

export default function TermsOfServicePage({ onNavigate }) {
  useSEO({
    title: 'Terms of Service — MARSWEBZ',
    description: "Read MARSWEBZ's terms of service governing the use of our website and professional services.",
  })

  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    const targets = [heroRef.current, ...sectionRefs.current.filter(Boolean)]
    targets.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNav = (item) => () => {
    setMenuOpen(false)
    if (!onNavigate) return
    if (item === 'Services')       onNavigate('explore')
    else if (item === 'About')     onNavigate('about')
    else if (item === 'Blog')      onNavigate('blog')
    else if (item === 'Contact')   onNavigate('home')
    else if (item === 'Privacy Policy') onNavigate('privacy')
  }

  return (
    <div className="tos-page">

      {/* ── BG ── */}
      <div className="tos-bg" aria-hidden="true">
        <div className="tos-bg-rotate">
          <svg className="tos-bg-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {[50,105,165,225,290,355,390].map((r) => (
              <circle key={r} cx="400" cy="400" r={r}
                fill="none" stroke="rgba(140,180,255,0.14)" strokeWidth="1" />
            ))}
            {Array.from({length:15},(_,i)=>i*24).map((deg) => {
              const rad = (deg * Math.PI) / 180
              return <line key={deg} x1="400" y1="400"
                x2={400+390*Math.cos(rad)} y2={400+390*Math.sin(rad)}
                stroke="rgba(140,180,255,0.1)" strokeWidth="1" />
            })}
          </svg>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="tos-header">
        <div
          className="tos-header-logo"
          onClick={() => onNavigate && onNavigate('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('home')}
          aria-label="Go to home page"
        >
          MARS<span className="tos-logo-accent">WEBZ</span>
        </div>

        <nav className="tos-nav-desktop" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className="tos-nav-btn" type="button" onClick={handleNav(item)}>
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="tos-header-right">
          <button
            type="button"
            className="tos-back-btn"
            onClick={() => onNavigate && onNavigate('home')}
            aria-label="Back to home"
          >
            ← Home
          </button>
          <button
            className="tos-hamburger"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className={`tos-nav-mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item} className="tos-nav-btn mobile" type="button" onClick={handleNav(item)}>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="tos-hero">
        <div className="tos-hero-inner" ref={heroRef}>
          <span className="tos-eyebrow">LEGAL DOCUMENT · EFFECTIVE DATE: JANUARY 1, 2025</span>
          <h1 className="tos-hero-title">
            Terms of <span className="tos-hero-title--accent">SERVICE</span>
          </h1>
          <p className="tos-hero-subtitle">
            These Terms govern your engagement with MARSWEBZ. Please read them carefully — they protect both you and us, and define the professional framework within which we operate.
          </p>
          <div className="tos-hero-note">
            <span className="tos-hero-note-icon" aria-hidden="true">⚖</span>
            <span>By engaging our services, you agree to these Terms in full. Last updated: January 2025.</span>
          </div>
        </div>
        <div className="tos-hero-orb tos-hero-orb--blue" aria-hidden="true" />
        <div className="tos-hero-orb tos-hero-orb--violet" aria-hidden="true" />
      </section>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="tos-toc-section" aria-label="Table of contents">
        <div className="tos-toc-inner">
          <h2 className="tos-toc-title">Table of Contents</h2>
          <ol className="tos-toc-list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="tos-toc-link" style={{ '--toc-accent': s.accent }}>
                  <span className="tos-toc-num">{s.number}</span>
                  <span className="tos-toc-label">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <main className="tos-main" aria-label="Terms of Service content">
        {SECTIONS.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className="tos-section"
            ref={(el) => { sectionRefs.current[i] = el }}
            style={{ '--sec-accent': section.accent, transitionDelay: `${i * 0.04}s` }}
            aria-label={section.title}
          >
            <div className="tos-section-inner">
              <div className="tos-section-header">
                <span className="tos-section-num">{section.number}</span>
                <h2 className="tos-section-title">{section.title}</h2>
                <div className="tos-section-line" aria-hidden="true" />
              </div>
              <div className="tos-section-body">
                {section.content.map((block, bi) => {
                  if (block.type === 'text') {
                    return <p key={bi} className="tos-body-text">{block.value}</p>
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={bi} className="tos-list">
                        {block.items.map((item, ii) => (
                          <li key={ii} className="tos-list-item">
                            <span className="tos-list-dot" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* ── CLOSING NOTE ── */}
      <section className="tos-closing" aria-label="Closing note">
        <div className="tos-closing-inner">
          <span className="tos-eyebrow">IMPORTANT NOTICE</span>
          <h2 className="tos-closing-title">
            Questions or <span className="tos-closing-title--accent">CONCERNS?</span>
          </h2>
          <p className="tos-closing-text">
            If you have any questions about these Terms of Service, require clarification on any clause, or wish to discuss a specific engagement, please contact us before proceeding.
          </p>
          <a href="mailto:hello@marswebz.com" className="tos-closing-email">hello@marswebz.com</a>
          <p className="tos-closing-disclaimer">
            <strong>Disclaimer:</strong> These Terms have been drafted to protect the professional interests of MARSWEBZ and its clients. While comprehensive, they are not a substitute for formal legal counsel. MARSWEBZ recommends that clients seek independent legal advice if they have specific concerns about any clause herein.
          </p>
          <div className="tos-closing-actions">
            <button type="button" className="tos-btn-primary" onClick={() => onNavigate && onNavigate('privacy')}>
              <span>Privacy Policy</span>
            </button>
            <button type="button" className="tos-btn-secondary" onClick={() => onNavigate && onNavigate('home')}>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
        <div className="tos-closing-orb" aria-hidden="true" />
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
