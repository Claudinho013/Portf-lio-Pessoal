import React, { useEffect, useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaStar, FaBook } from 'react-icons/fa'
import { HiCode } from 'react-icons/hi'
import { projects, projectCategories } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

const ProjectCard = ({ project, index, t, title, description }) => {
  const tagColors = {
    React: '#61DAFB',
    JavaScript: '#F7DF1E',
    HTML: '#E34F26',
    CSS: '#1572B6',
    PHP: '#777BB4',
    Python: '#3776AB',
    SQL: '#336791',
    MySQL: '#4479A1',
    Excel: '#217346',
    VBA: '#217346',
    Pandas: '#150458',
    Matplotlib: '#11557c',
    'Análise de Dados': '#6C63FF',
    'Data Science': '#F50057',
    Node: '#339933',
    SUPABASE: '#3ECF8E',
  }

  const getColor = (tag) => tagColors[tag] || '#6C63FF'

  return (
    <div
      className="reveal glass-card shimmer-card group flex flex-col hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image / Placeholder */}
      <div
        className="h-44 w-full relative overflow-hidden flex items-center justify-center"
        style={{
          background: project.image
            ? `url(${project.image}) center/cover no-repeat`
            : `linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(245,0,87,0.1) 100%)`,
        }}
      >
        {!project.image && (
          <HiCode className="text-6xl text-primary/30 group-hover:text-primary/50 transition-all duration-300 group-hover:scale-110" />
        )}
        {project.featured && (
          <span className="absolute top-3 right-3 bg-secondary/90 text-white text-xs px-2 py-1 rounded-full font-mono flex items-center gap-1">
            <FaStar className="text-[10px]" /> {t.projects.featured}
          </span>
        )}
        <span className="absolute top-3 left-3 bg-dark/80 text-primary border border-primary/30 text-xs px-2 py-1 rounded-full font-mono">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white text-base mb-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full font-mono"
              style={{
                background: `${getColor(tag)}15`,
                border: `1px solid ${getColor(tag)}30`,
                color: getColor(tag),
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-border">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200 font-mono"
            >
              <FaGithub /> {t.projects.code}
            </a>
          )}
          {project.manual && project.manual !== '#' && (
            <a
              href={project.manual}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200 font-mono"
            >
              <FaBook /> {t.projects.manual}
            </a>
          )}
          {project.drivePage && project.drivePage !== '#' && (
            <a
              href={project.drivePage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:text-white transition-colors duration-200 font-mono"
            >
              <FaExternalLinkAlt /> {t.projects.drivePage}
            </a>
          )}
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:text-white transition-colors duration-200 font-mono"
            >
              <FaExternalLinkAlt /> {t.projects.liveDemo}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState(projectCategories[0])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered =
    filter === projectCategories[0] ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div
        className="orb w-96 h-96 top-1/3 right-[-150px]"
        style={{ background: 'radial-gradient(circle, rgba(245,0,87,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="orb w-72 h-72 bottom-1/4 left-[-100px]"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="reveal text-center mb-12">
          <p className="text-primary font-mono text-sm mb-2">{t.projects.tag}</p>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="reveal flex flex-wrap gap-2 justify-center mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'glass-card text-slate-400 hover:text-white hover:border-primary/30'
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-60">
                {cat === projectCategories[0]
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const origIndex = projects.findIndex((p) => p.id === project.id)
            const item = t.projects.items?.[origIndex] ?? {}
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                t={t}
                title={item.title ?? project.title}
                description={item.description ?? project.description}
              />
            )
          })}
        </div>

        {/* CTA to add more */}
        <div className="reveal mt-12 text-center">
          <div className="glass-card inline-flex flex-col items-center gap-3 px-4 sm:px-8 py-5 mx-auto max-w-full">
            <span className="text-slate-500 text-sm font-mono">
              {t.projects.addHint}
            </span>
            <code className="text-primary text-sm bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
              src/data/projects.js
            </code>
            <span className="text-slate-600 text-xs">
              {t.projects.addSub} <span className="text-secondary">projects</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
