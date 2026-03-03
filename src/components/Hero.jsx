import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { HiDownload, HiChevronDown } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

// ─── Para usar foto real: coloque seu arquivo em public/avatar.jpg ───────────
const AVATAR_SRC = '/avatar.jpg'

const HeroAvatar = () => {
  const [hasPhoto, setHasPhoto] = useState(true)
  return hasPhoto ? (
    <img
      src={AVATAR_SRC}
      alt="Claudio Santos"
      onError={() => setHasPhoto(false)}
      className="w-full h-full object-cover rounded-full"
      draggable={false}
    />
  ) : (
    <div className="text-center select-none">
      <div className="text-5xl font-black gradient-text" style={{ fontFamily: 'Inter, sans-serif' }}>
        CS
      </div>
      <div className="text-xs text-slate-400 mt-1 font-mono">Claudio Santos</div>
      <div className="text-xs text-slate-600 font-mono">7º sem. · SI</div>
    </div>
  )
}

const Hero = () => {
  const { t } = useLanguage()
  const [currentRole, setCurrentRole] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const roles = t.hero.roles

  // Reset typing effect when language changes
  useEffect(() => {
    setDisplayed('')
    setIsDeleting(false)
    setCurrentRole(0)
  }, [t])

  useEffect(() => {
    const role = roles[currentRole]
    let timeout

    if (!isDeleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 100)
    } else if (!isDeleting && displayed.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentRole])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Background Orbs */}
      <div
        className="orb w-96 h-96 top-[-100px] left-[-100px]"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="orb w-80 h-80 bottom-[-50px] right-[-50px]"
        style={{ background: 'radial-gradient(circle, rgba(245,0,87,0.3) 0%, transparent 70%)' }}
      />
      <div
        className="orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left animate-slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            <span className="text-white">{t.hero.greeting}</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight gradient-text">
            Claudio Santos
          </h2>

          {/* Typing Effect */}
          <div className="text-base sm:text-xl md:text-2xl text-slate-400 mb-8 min-h-7 font-mono">
            <span className="text-primary">&gt;</span>{' '}
            <span className="text-slate-200">{displayed}</span>
            <span className="typing-cursor" />
          </div>

          <p className="text-slate-400 text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            {t.hero.studentOf}{' '}
            <span className="text-primary font-semibold">{t.hero.course}</span> {t.hero.inThe}{' '}
            <span className="text-secondary font-semibold">{t.hero.semester}</span>{t.hero.semesterSuffix}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
            <Link to="projects" smooth duration={600} offset={-70} className="btn-primary cursor-pointer flex items-center gap-2">
              <span>{t.hero.btnProjects}</span>
            </Link>
            <Link to="contact" smooth duration={600} offset={-70} className="btn-outline cursor-pointer flex items-center gap-2">
              <span>{t.hero.btnContact}</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center lg:justify-start">
            {[
              { icon: <FaGithub />, href: 'https://github.com/claudinho013', label: 'GitHub' },
              { icon: <FaLinkedin />, href: 'https://br.linkedin.com/in/claudio-henrique-alves-dos-santos-8116a621a', label: 'LinkedIn' },
              { icon: <FaWhatsapp />, href: 'https://wa.me/5513991685375', label: 'WhatsApp' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Avatar / Illustration */}
        <div className="flex-1 flex justify-center items-center animate-fade-in">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80">
            {/* Rotating Ring */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, #6C63FF, #F50057, #6C63FF)',
                padding: '3px',
              }}
            >
              <div className="w-full h-full rounded-full bg-dark" />
            </div>

            {/* Inner glow */}
            <div
              className="absolute inset-3 rounded-full animate-glow"
              style={{ background: 'linear-gradient(135deg, #6C63FF33, #F5005733)' }}
            />

            {/* Avatar — troque /avatar.jpg pela sua foto em public/ */}
            <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a1a2e, #12121A)' }}
            >
              <HeroAvatar />
            </div>

            {/* Floating badges - hidden on very small, shown from sm up */}
            <div
              className="hidden sm:block absolute -top-4 -right-4 bg-card border border-primary/30 rounded-xl px-3 py-2 text-xs font-mono text-primary animate-float shadow-lg"
              style={{ animationDelay: '0s' }}
            >
              &lt;React /&gt;
            </div>
            <div
              className="hidden sm:block absolute -bottom-4 -left-4 bg-card border border-secondary/30 rounded-xl px-3 py-2 text-xs font-mono text-secondary animate-float shadow-lg"
              style={{ animationDelay: '2s' }}
            >
              Python 🐍
            </div>
            <div
              className="hidden md:block absolute top-1/2 -right-10 bg-card border border-primary/20 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 animate-float shadow-lg"
              style={{ animationDelay: '4s' }}
            >
              SQL 🗄️
            </div>
            <div
              className="hidden md:block absolute top-1/2 -left-10 bg-card border border-yellow-500/30 rounded-xl px-3 py-2 text-xs font-mono text-yellow-400 animate-float shadow-lg"
              style={{ animationDelay: '1s' }}
            >
              JS ⚡
            </div>
            <div
              className="hidden sm:block absolute -top-4 -left-4 bg-card border border-green-500/30 rounded-xl px-3 py-2 text-xs font-mono text-green-400 animate-float shadow-lg"
              style={{ animationDelay: '3s' }}
            >
              PHP 🐘
            </div>
            <div
              className="hidden sm:block absolute -bottom-4 -right-4 bg-card border border-orange-500/30 rounded-xl px-3 py-2 text-xs font-mono text-orange-400 animate-float shadow-lg"
              style={{ animationDelay: '5s' }}
            >
              HTML5 🌐
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow">
        <span className="text-xs text-slate-500 font-mono">{t.hero.scroll}</span>
        <HiChevronDown className="text-primary text-xl" />
      </div>
    </section>
  )
}

export default Hero
