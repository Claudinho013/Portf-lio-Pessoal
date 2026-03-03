import React from 'react'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="hero" smooth duration={600} className="cursor-pointer">
            <span className="font-mono text-xl font-bold">
              <span className="gradient-text">&lt;</span>
              <span className="text-white">Dev</span>
              <span className="gradient-text">/&gt;</span>
            </span>
          </Link>

          {/* Links */}
          <div className="hidden sm:flex flex-wrap justify-center gap-3 text-xs text-slate-500">
            {['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((id) => (
              <Link
                key={id}
                to={id}
                smooth
                duration={600}
                offset={-70}
                className="hover:text-primary cursor-pointer transition-colors capitalize"
              >
                {id === 'hero' ? t.nav.home : id === 'about' ? t.nav.about : id === 'skills' ? t.nav.skills : id === 'projects' ? t.nav.projects : id === 'experience' ? t.nav.experience : id === 'education' ? t.nav.education : t.nav.contact}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-slate-600">
          <p className="flex items-center justify-center gap-2">
            <span>© {year} {t.footer.madeWith}</span>
            <FaHeart className="text-secondary text-xs animate-pulse" />
            <span>{t.footer.using}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
