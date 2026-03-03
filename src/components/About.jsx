import React, { useEffect, useRef, useState } from 'react'
import { FaCode, FaDatabase, FaGlobe, FaStar, FaCodeBranch, FaGithub } from 'react-icons/fa'
import { HiAcademicCap, HiLightBulb, HiCode } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'

// ─── GitHub Stats Widget (usa API pública do GitHub, sem bloqueio de CORS) ────
const GitHubStats = ({ username }) => {
  const [data, setData]   = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then((r) => r.json()),
    ])
      .then(([user, repoList]) => {
        setData(user)
        setRepos(Array.isArray(repoList) ? repoList : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [username])

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
  const totalForks = repos.reduce((acc, r) => acc + (r.forks_count     || 0), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!data || data.message) {
    return (
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors duration-200 font-mono"
      >
        <FaGithub /> github.com/{username}
      </a>
    )
  }

  const stats = [
    { label: 'Repositórios', value: data.public_repos ?? 0, color: '#6C63FF' },
    { label: 'Stars',         value: totalStars,              color: '#F59E0B' },
    { label: 'Forks',         value: totalForks,              color: '#F50057' },
    { label: 'Seguidores',    value: data.followers ?? 0,     color: '#10B981' },
  ]

  return (
    <div>
      {/* Avatar + name */}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 mb-4 group"
      >
        <img
          src={data.avatar_url}
          alt={username}
          className="w-9 h-9 rounded-full border border-primary/30 group-hover:border-primary transition-all duration-200"
        />
        <div>
          <p className="text-white text-xs font-semibold group-hover:text-primary transition-colors duration-200">
            {data.name || username}
          </p>
          <p className="text-slate-600 text-[11px] font-mono">@{username}</p>
        </div>
        <FaGithub className="ml-auto text-slate-600 group-hover:text-primary transition-colors duration-200" />
      </a>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-3 py-2.5 flex items-center gap-2"
            style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}
          >
            <span className="text-lg font-black" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[11px] text-slate-500 font-mono leading-tight">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Bio */}
      {data.bio && (
        <p className="text-xs text-slate-500 mt-3 leading-relaxed font-mono border-t border-border pt-3">
          {data.bio}
        </p>
      )}
    </div>
  )
}



const highlightMeta = [
  { icon: <HiCode className="text-2xl" />, color: 'primary' },
  { icon: <FaDatabase className="text-2xl" />, color: 'secondary' },
  { icon: <HiLightBulb className="text-2xl" />, color: 'primary' },
]

const statsMeta = [
  { icon: <HiAcademicCap /> },
  { icon: <FaCode /> },
  { icon: <HiLightBulb /> },
  { icon: <FaGlobe /> },
]

// Parses "7º" → { prefix:'', number:7, suffix:'º' }
// "9+"  → { prefix:'', number:9, suffix:'+' }
// "Básico" → null (no animation)
const parseValue = (val) => {
  const m = val.match(/^(\D*)(\d+)(\D*)$/)
  if (!m) return null
  return { prefix: m[1], number: parseInt(m[2], 10), suffix: m[3] }
}

const CountUp = ({ value, active }) => {
  const parsed = parseValue(value)
  const [count, setCount] = useState(0)
  const [popped, setPopped] = useState(false)

  useEffect(() => {
    if (!active || !parsed) return
    let current = 0
    const steps = 36
    const interval = 1200 / steps
    const inc = parsed.number / steps
    const timer = setInterval(() => {
      current = Math.min(current + inc, parsed.number)
      setCount(Math.round(current))
      if (current >= parsed.number) {
        clearInterval(timer)
        setPopped(true)
        setTimeout(() => setPopped(false), 400)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!parsed) return <>{value}</>
  return (
    <span className={popped ? 'stat-pop inline-block' : 'inline-block'}>
      {parsed.prefix}{active ? count : 0}{parsed.suffix}
    </span>
  )
}

const About = () => {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const statsRef   = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.5 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background orb */}
      <div
        className="orb w-96 h-96 top-1/2 right-[-150px]"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="reveal text-center mb-16">
          <p className="text-primary font-mono text-sm mb-2">{t.about.tag}</p>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <div className="space-y-5 text-slate-400 leading-relaxed text-base">
              {t.about.bio.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>

            <div ref={statsRef} className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
              {statsMeta.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-4 flex items-center gap-3 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-primary text-xl">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">
                      <CountUp value={t.about.statValues[i]} active={statsVisible} />
                    </div>
                    <div className="text-xs text-slate-500">{t.about.stats[i]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards + GitHub Stats */}
          <div className="space-y-4">
            {highlightMeta.map((meta, i) => (
              <div
                key={i}
                className="reveal glass-card p-6 flex gap-4 hover:border-primary/40 transition-all duration-300 group hover:scale-[1.02]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
                  style={{
                    background:
                      meta.color === 'primary'
                        ? 'rgba(108,99,255,0.15)'
                        : 'rgba(245,0,87,0.15)',
                    color: meta.color === 'primary' ? '#6C63FF' : '#F50057',
                  }}
                >
                  {meta.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{t.about.highlights[i].title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{t.about.highlights[i].description}</p>
                </div>
              </div>
            ))}

            {/* GitHub Stats */}
            <div className="reveal glass-card p-4 hover:border-primary/40 transition-all duration-300" style={{ transitionDelay: '300ms' }}>
              <p className="text-xs text-primary font-mono mb-3">// github activity</p>
              <GitHubStats username="claudinho013" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
