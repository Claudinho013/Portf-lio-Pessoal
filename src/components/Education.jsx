import React, { useEffect, useRef } from 'react'
import { HiAcademicCap, HiCalendar, HiLocationMarker } from 'react-icons/hi'
import { FaCode, FaFileExcel, FaPython, FaJs, FaHtml5, FaDatabase } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const timelineMeta = [
  { icon: <HiAcademicCap />, active: true },
  { icon: <FaFileExcel />, active: false },
  { icon: <FaFileExcel />, active: false },
  { icon: <FaFileExcel />, active: false },
  { icon: <FaCode />, active: false },
  { icon: <FaPython />, active: false },
  { icon: <FaJs />, active: false },
  { icon: <FaHtml5 />, active: false },
  { icon: <FaDatabase />, active: false },
]

const Education = () => {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 200)
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
    <section id="education" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div
        className="orb w-96 h-96 top-0 right-[-100px]"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-16">
          <p className="text-primary font-mono text-sm mb-2">{t.education.tag}</p>
          <h2 className="section-title">{t.education.title}</h2>
          <p className="section-subtitle">{t.education.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — always left-aligned */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-8">
            {t.education.items.map((item, i) => {
              const meta = timelineMeta[i] || { icon: null, active: false }
              return (
              <div key={i} className="reveal relative flex gap-5 sm:gap-8">
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-dark z-10 flex items-center justify-center" style={{ color: '#6C63FF' }}>
                    {meta.active && (
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                    )}
                    <span className="text-base z-10 relative">{meta.icon}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 pb-2 min-w-0">
                  <div
                    className={`glass-card p-4 sm:p-5 transition-all duration-300 ${
                      meta.active ? 'border-primary/40 shadow-lg shadow-primary/10' : 'hover:border-primary/30 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm sm:text-base leading-snug">{item.title}</h3>
                      {meta.active && (
                        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-mono flex-shrink-0">
                          {t.education.ongoing}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1 min-w-0">
                        <HiAcademicCap className="text-primary flex-shrink-0" />
                        <span className="truncate">{item.institution}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <HiCalendar className="text-secondary flex-shrink-0" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="text-primary flex-shrink-0" />
                        {item.location}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono"
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

export default Education
