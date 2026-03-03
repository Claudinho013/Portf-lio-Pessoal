import React, { useEffect, useRef, useState } from 'react'
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPhp,
  FaReact,
  FaPython,
  FaDatabase,
  FaFileExcel,
  FaGlobe,
} from 'react-icons/fa'
import { useLanguage, SKILL_CATEGORIES, categoryLabel } from '../context/LanguageContext'

const skills = [
  {
    name: 'HTML5',
    icon: <FaHtml5 />,
    level: 90,
    color: '#E34F26',
    category: 'Frontend',
  },
  {
    name: 'CSS3',
    icon: <FaCss3Alt />,
    level: 90,
    color: '#1572B6',
    category: 'Frontend',
  },
  {
    name: 'JavaScript',
    icon: <FaJs />,
    level: 85,
    color: '#F7DF1E',
    category: 'Frontend',
  },
  {
    name: 'React',
    icon: <FaReact />,
    level: 70,
    color: '#61DAFB',
    category: 'Frontend',
  },
  {
    name: 'PHP',
    icon: <FaPhp />,
    level: 80,
    color: '#777BB4',
    category: 'Backend',
  },
  {
    name: 'Python',
    icon: <FaPython />,
    level: 50,
    color: '#3776AB',
    category: 'Backend',
  },
  { name: 'SQL',     icon: <FaDatabase />,  level: 90, color: '#336791', category: 'Data'      },
  { name: 'Excel',   icon: <FaFileExcel />, level: 90, color: '#217346', category: 'Tools'     },
  { name: 'Inglês',  icon: <FaGlobe />,     level: 35, color: '#6C63FF', category: 'Languages' },
]

const SkillCard = ({ skill, visible }) => {
  const { lang } = useLanguage()
  const catDisplay = categoryLabel[lang]?.[skill.category] ?? skill.category
  return (
    <div
      className="glass-card p-5 group hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
      style={{ borderColor: visible ? `${skill.color}22` : undefined }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
          style={{ background: `${skill.color}22`, color: skill.color }}
        >
          {skill.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-white text-sm">{skill.name}</span>
            <span className="text-xs font-mono text-slate-400">{skill.level}%</span>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full mt-0.5 inline-block font-mono"
            style={{ background: `${skill.color}22`, color: skill.color }}
          >
            {catDisplay}
          </span>
        </div>
      </div>

      <div className="skill-bar">
        <div
          className="skill-fill transition-all duration-1000"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
            transition: visible ? 'width 1.2s ease-out' : 'none',
          }}
        />
      </div>
    </div>
  )
}

const Skills = () => {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState('All')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = filter === 'All' ? skills : skills.filter((s) => s.category === filter)

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* BG orb */}
      <div
        className="orb w-80 h-80 bottom-0 left-[-100px]"
        style={{ background: 'radial-gradient(circle, rgba(245,0,87,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-12">
          <p className="text-secondary font-mono text-sm mb-2">{t.skills.tag}</p>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </div>

        {/* Filter Tabs */}
        <div className="reveal flex flex-wrap gap-2 justify-center mb-10 overflow-x-auto pb-1">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'glass-card text-slate-400 hover:text-white hover:border-primary/30'
              }`}
            >
              {categoryLabel[lang][cat]}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className="reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <SkillCard skill={skill} visible={visible} />
            </div>
          ))}
        </div>

        {/* Tech Cloud */}
        <div className="reveal mt-10 md:mt-16 glass-card p-5 md:p-8 text-center">
          <h3 className="text-white font-semibold mb-6 text-lg">
            <span className="gradient-text">{t.skills.stackTitle}</span>
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 hover:scale-110 cursor-default"
                style={{
                  background: `${skill.color}15`,
                  border: `1px solid ${skill.color}30`,
                  color: skill.color,
                }}
              >
                <span>{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
