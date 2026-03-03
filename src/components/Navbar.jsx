import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'

const NAV_IDS  = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact']
const NAV_KEYS = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']

const Navbar = () => {
  const { lang, setLang, t, translations } = useLanguage()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [langOpen, setLangOpen]   = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const langs = Object.values(translations).map((l) => ({ code: l.code, flag: l.flag, label: l.label }))

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/90 backdrop-blur-xl border-b border-primary/20 py-3 shadow-lg shadow-primary/10'
          : 'bg-transparent py-5'
      }`}
    >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <span className="font-mono text-xl font-bold">
            <span className="gradient-text">&lt;</span>
            <span className="text-white">Dev</span>
            <span className="gradient-text">/&gt;</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_IDS.map((id, i) => (
            <li key={id}>
              <Link
                to={id}
                smooth
                duration={600}
                offset={-70}
                className="nav-link text-slate-300 hover:text-white cursor-pointer text-sm font-medium transition-colors duration-200"
                activeClass="active text-white"
                spy
              >
                {t.nav[NAV_KEYS[i]]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Language Switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-card text-sm text-slate-300 hover:text-white hover:border-primary/40 transition-all duration-200"
            >
              <span>{translations[lang].flag}</span>
              <span className="font-mono text-xs">{lang.toUpperCase()}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-xl shadow-black/40 min-w-[140px] z-50">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 hover:bg-primary/10 hover:text-white ${
                      lang === l.code ? 'text-primary bg-primary/5' : 'text-slate-400'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span className="font-medium">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link
            to="contact"
            smooth
            duration={600}
            className="btn-primary text-sm cursor-pointer"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-0 px-6 py-4 bg-dark/95 backdrop-blur-xl border-t border-primary/10">
          {NAV_IDS.map((id, i) => (
            <li key={id}>
              <Link
                to={id}
                smooth
                duration={600}
                offset={-70}
                className="text-slate-300 hover:text-white cursor-pointer text-sm font-medium block py-3 border-b border-border/30 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[NAV_KEYS[i]]}
              </Link>
            </li>
          ))}
          {/* Language Switcher — mobile */}
          <li className="pt-3 flex gap-2">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setMenuOpen(false) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  lang === l.code
                    ? 'bg-primary/20 text-primary border border-primary/40'
                    : 'glass-card text-slate-400 hover:text-white'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.code.toUpperCase()}</span>
              </button>
            ))}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
