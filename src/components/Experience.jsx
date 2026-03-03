import React, { useEffect, useRef } from 'react'
import { HiCalendar, HiLocationMarker, HiBriefcase } from 'react-icons/hi'
import { FaRobot, FaHeadset } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const experienceMeta = [
  { icon: <FaHeadset />, color: '#6C63FF', active: true },
  { icon: <FaRobot />,   color: '#F50057', active: false },
]

const Experience = () => {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 180)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div
        className="orb w-96 h-96 top-1/4 left-[-150px]"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <p className="text-secondary font-mono text-sm mb-2">{t.experience.tag}</p>
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-secondary via-primary to-transparent" />

          <div className="space-y-10">
            {t.experience.items.map((exp, i) => {
              const meta = experienceMeta[i] || { icon: null, color: '#6C63FF', active: false }
              return (
              <div key={i} className="reveal relative flex gap-5 sm:gap-8">
                {/* Dot + icon */}
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base z-10 flex-shrink-0 mt-1"
                    style={{ background: `${meta.color}22`, color: meta.color, border: `2px solid ${meta.color}50` }}
                  >
                    {meta.icon}
                  </div>
                  {meta.active && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ background: meta.color }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 pb-2 min-w-0">
                  <div
                    className={`glass-card p-5 sm:p-6 transition-all duration-300 hover:scale-[1.01] ${
                      meta.active ? 'shadow-lg' : 'hover:border-primary/30'
                    }`}
                    style={meta.active ? { borderColor: `${meta.color}40`, boxShadow: `0 0 30px ${meta.color}15` } : {}}
                  >
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: meta.color }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-mono flex-shrink-0"
                          style={{ background: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}30` }}
                        >
                          {exp.type}
                        </span>
                        {meta.active && (
                          <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                            {t.experience.current}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <HiCalendar className="text-primary" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="text-secondary" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full font-mono bg-white/5 text-slate-400 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
