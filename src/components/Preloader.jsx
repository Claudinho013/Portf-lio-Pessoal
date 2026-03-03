import React, { useEffect, useState } from 'react'

const Preloader = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving]   = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      // Varied increments for a natural feel
      const inc = Math.random() * 14 + 6
      current = Math.min(current + inc, 100)
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setLeaving(true)
          setTimeout(onDone, 500)
        }, 250)
      }
    }, 70)

    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`preloader${leaving ? ' preloader-leave' : ''}`}>
      <div className="preloader-content">
        {/* Logo */}
        <span className="font-mono text-4xl font-black select-none">
          <span className="gradient-text">&lt;</span>
          <span className="text-white">Dev</span>
          <span className="gradient-text">/&gt;</span>
        </span>

        {/* Bar */}
        <div className="preloader-bar-track">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="text-slate-600 font-mono text-xs tracking-widest">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}

export default Preloader
