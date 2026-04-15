import { useState, useEffect, useRef } from 'react'
import './PreloadScreen.css'

const ANIMATION_DURATION_MS = 5100
const SLIDE_DELAY_MS = 250
const SLIDE_DURATION_MS = 1100

// Stable star field — generated once at module level with golden-angle distribution
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  left: `${((i * 137.508) % 100).toFixed(2)}%`,
  top:  `${((i * 61.803)  % 100).toFixed(2)}%`,
  size: 0.6 + (i % 5) * 0.35,
  delay:    `${((i * 0.41) % 4).toFixed(2)}s`,
  duration: `${(2.2 + (i % 7)  * 0.4).toFixed(2)}s`,
}))

// Ring geometry
const RING_R   = 74
const RING_CX  = 84
const RING_CY  = 84
const RING_SIZE = RING_CX * 2
const CIRCUMFERENCE = +(2 * Math.PI * RING_R).toFixed(2)

function PreloadScreen({ onComplete }) {
  const [sliding, setSliding] = useState(false)
  const [hidden, setHidden] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    let slideTimer, doneTimer
    slideTimer = setTimeout(() => {
      setSliding(true)
      doneTimer = setTimeout(() => {
        setHidden(true)
        onCompleteRef.current?.()
      }, SLIDE_DURATION_MS)
    }, ANIMATION_DURATION_MS + SLIDE_DELAY_MS)
    return () => {
      clearTimeout(slideTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`preload-screen${sliding ? ' sliding' : ''}`}>

      {/* ── Nebula atmosphere ── */}
      <div className="preload-nebula" aria-hidden="true" />

      {/* ── Star field ── */}
      <div className="preload-stars" aria-hidden="true">
        {STARS.map(s => (
          <span
            key={s.id}
            className="preload-star"
            style={{
              left:               s.left,
              top:                s.top,
              width:              `${s.size}px`,
              height:             `${s.size}px`,
              animationDelay:     s.delay,
              animationDuration:  s.duration,
            }}
          />
        ))}
      </div>

      {/* ── Centred logo + progress ring ── */}
      <div className="preload-inner">
        <div className="preload-logo-wrap">

          {/* Ambient glow behind logo */}
          <div className="preload-logo-glow" aria-hidden="true" />

          {/* SVG progress ring */}
          <svg
            className="preload-ring"
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#7C7E9D" />
                <stop offset="50%"  stopColor="#7ca4ff" />
                <stop offset="100%" stopColor="#b347ea" />
              </linearGradient>
            </defs>
            {/* Faint track */}
            <circle
              className="ring-track"
              cx={RING_CX} cy={RING_CY} r={RING_R}
            />
            {/* Animated fill arc */}
            <circle
              className="ring-progress"
              cx={RING_CX} cy={RING_CY} r={RING_R}
              style={{ '--circumference': CIRCUMFERENCE }}
            />
          </svg>

          <div className="preload-letter">M</div>
        </div>

        <div className="preload-text">MARSWEBZ</div>
      </div>
    </div>
  )
}

export default PreloadScreen
