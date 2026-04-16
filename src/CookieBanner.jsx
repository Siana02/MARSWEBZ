import { useState, useEffect } from 'react'
import './CookieBanner.css'

const STORAGE_KEY = 'marswebz_cookie_consent'

export default function CookieBanner({ onNavigate }) {
  const [visible, setVisible] = useState(false)
  const [managing, setManaging] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, preferences: true })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Delay slightly to not flash on initial load
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: true, preferences: true, timestamp: Date.now() }))
    setVisible(false)
  }

  const rejectNonEssential = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: false, preferences: false, timestamp: Date.now() }))
    setVisible(false)
  }

  const savePrefs = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }))
    setVisible(false)
    setManaging(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        {!managing ? (
          <>
            <div className="cookie-banner-text">
              <span className="cookie-banner-icon" aria-hidden="true">🍪</span>
              <div>
                <p className="cookie-banner-title">We use cookies</p>
                <p className="cookie-banner-body">
                  We use cookies to improve your experience, analyse site traffic, and personalise content. Essential cookies are always active.{' '}
                  <button
                    type="button"
                    className="cookie-banner-learn"
                    onClick={() => { setVisible(false); onNavigate && onNavigate('privacy') }}
                  >
                    Learn more
                  </button>
                </p>
              </div>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="cookie-btn cookie-btn--manage" onClick={() => setManaging(true)}>
                Manage
              </button>
              <button type="button" className="cookie-btn cookie-btn--reject" onClick={rejectNonEssential}>
                Reject Non-Essential
              </button>
              <button type="button" className="cookie-btn cookie-btn--accept" onClick={accept}>
                Accept All
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-manage-header">
              <p className="cookie-banner-title">Manage Cookie Preferences</p>
              <p className="cookie-banner-body">Choose which cookies you allow. Essential cookies cannot be disabled as they are required for the site to function.</p>
            </div>
            <div className="cookie-manage-options">
              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-name">Essential Cookies</span>
                  <span className="cookie-option-desc">Required for core website functionality. Always active.</span>
                </div>
                <div className="cookie-toggle cookie-toggle--on cookie-toggle--disabled" aria-label="Essential cookies — always on" aria-disabled="true">
                  <div className="cookie-toggle-knob" />
                </div>
              </div>
              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-name">Analytics Cookies</span>
                  <span className="cookie-option-desc">Help us understand how visitors use our website (anonymised).</span>
                </div>
                <button
                  type="button"
                  className={`cookie-toggle${prefs.analytics ? ' cookie-toggle--on' : ''}`}
                  aria-label={`Analytics cookies — ${prefs.analytics ? 'on' : 'off'}`}
                  aria-pressed={prefs.analytics}
                  onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                >
                  <div className="cookie-toggle-knob" />
                </button>
              </div>
              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-name">Preference Cookies</span>
                  <span className="cookie-option-desc">Remember your settings and personalise your experience.</span>
                </div>
                <button
                  type="button"
                  className={`cookie-toggle${prefs.preferences ? ' cookie-toggle--on' : ''}`}
                  aria-label={`Preference cookies — ${prefs.preferences ? 'on' : 'off'}`}
                  aria-pressed={prefs.preferences}
                  onClick={() => setPrefs((p) => ({ ...p, preferences: !p.preferences }))}
                >
                  <div className="cookie-toggle-knob" />
                </button>
              </div>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="cookie-btn cookie-btn--manage" onClick={() => setManaging(false)}>
                Back
              </button>
              <button type="button" className="cookie-btn cookie-btn--accept" onClick={savePrefs}>
                Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
