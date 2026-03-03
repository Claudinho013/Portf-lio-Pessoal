import React, { useEffect, useRef, useState } from 'react'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqedvqpn'

const Contact = () => {
  const { lang, t } = useLanguage()
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const contactInfo = [
    {
      icon: <HiMail className="text-xl" />,
      label: 'Email',
      value: 'claudinhosantos10@icloud.com',
      href: 'mailto:claudinhosantos10@icloud.com',
      color: '#6C63FF',
    },
    {
      icon: <FaWhatsapp className="text-xl" />,
      label: 'WhatsApp',
      value: '+55 (13) 99168-5375',
      href: 'https://wa.me/5513991685375',
      color: '#25D366',
    },
    {
      icon: <HiLocationMarker className="text-xl" />,
      label: lang === 'pt' ? 'Localização' : lang === 'es' ? 'Ubicación' : 'Location',
      value: 'Brasil 🇧🇷',
      href: '#',
      color: '#F50057',
    },
  ]

  const socials = [
    { icon: <FaGithub />, href: 'https://github.com/claudinho013', label: 'GitHub', color: '#6e40c9' },
    { icon: <FaLinkedin />, href: 'https://br.linkedin.com/in/claudio-henrique-alves-dos-santos-8116a621a', label: 'LinkedIn', color: '#0A66C2' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/5513991685375', label: 'WhatsApp', color: '#25D366' },
  ]

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div
        className="orb w-96 h-96 bottom-[-100px] left-[-100px]"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-16">
          <p className="text-secondary font-mono text-sm mb-2">{t.contact.tag}</p>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Left: Info */}
          <div className="reveal space-y-6">
            <div className="glass-card p-5 md:p-8">
              <h3 className="text-white font-bold text-xl mb-2">{t.contact.cardTitle}</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
              {t.contact.cardText}
              </p>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 group"
                    style={{ background: `${info.color}10`, border: `1px solid ${info.color}20` }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ background: `${info.color}20`, color: info.color }}
                    >
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 font-mono">{info.label}</p>
                      <p className="text-white text-sm font-medium break-all">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-slate-500 mb-4">{t.contact.socials}</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                      style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            <div className="glass-card p-5 md:p-8">
              <h3 className="text-white font-bold text-xl mb-6">{t.contact.formTitle}</h3>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-mono flex items-center gap-2">
                  <span>✓</span> {t.contact.success}
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono flex items-center gap-2">
                  <span>✗</span> {t.contact.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-2 font-mono">{t.contact.name}</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.namePlaceholder}
                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2 font-mono">{t.contact.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2 font-mono">{t.contact.message}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`btn-primary w-full flex items-center justify-center gap-2 group transition-opacity ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.send}</span>
                      <HiPaperAirplane className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
