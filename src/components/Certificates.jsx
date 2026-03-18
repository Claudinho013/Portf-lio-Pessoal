import React, { useEffect, useRef, useState, useCallback } from 'react'
import { HiExternalLink, HiX, HiDownload } from 'react-icons/hi'
import { FaCertificate } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const tagColors = {
  Web:    '#6C63FF',
  Python: '#3776AB',
  Dados:  '#38bdf8',
  Data:   '#38bdf8',
  Datos:  '#38bdf8',
  SQL:    '#336791',
}

// ─── Modal ────────────────────────────────────────────────────────────────────
const CertModal = ({ cert, onClose }) => {
  const accent = cert.color || '#6C63FF'
  const [imgOk, setImgOk] = useState(!!(cert.image && cert.image !== '#'))

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const downloadFile = cert.pdf && cert.pdf !== '#'
    ? cert.pdf
    : cert.image && cert.image !== '#' ? cert.image : null

  return (
    <div
      className="cert-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0">
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-mono"
            style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}
          >
            {cert.tag}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <HiX />
          </button>
        </div>

        {/* Preview */}
        {imgOk ? (
          <img
            src={cert.image}
            alt={cert.name}
            className="cert-modal-preview mt-3"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="cert-modal-preview-placeholder mt-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
            >
              <FaCertificate style={{ color: accent }} className="text-3xl" />
            </div>
            <p className="text-xs text-slate-600 font-mono mt-2">
              Adicione a imagem em <span style={{ color: accent }}>public/certs/</span>
            </p>
          </div>
        )}

        {/* Info + Actions */}
        <div className="px-5 py-4">
          <h3 className="text-white font-bold text-base mb-1">{cert.name}</h3>
          <p className="text-slate-500 font-mono text-xs mb-0.5">{cert.issuer}</p>
          <p className="text-slate-600 font-mono text-xs">{cert.year}</p>

          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border">
            {downloadFile && (
              <a
                href={downloadFile}
                download
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${accent}, #F50057)` }}
              >
                <HiDownload /> Download
              </a>
            )}
            {cert.url && cert.url !== '#' && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                <HiExternalLink /> Verificar credencial
              </a>
            )}
            {!downloadFile && (!cert.url || cert.url === '#') && (
              <span className="text-xs text-slate-600 font-mono italic">Certificado concluído</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
const CertCard = ({ cert, index, onClick }) => {
  const accent   = cert.color || '#6C63FF'
  const tagColor = tagColors[cert.tag] || accent

  return (
    <button
      type="button"
      onClick={() => onClick(cert)}
      className="reveal glass-card shimmer-card group flex flex-col gap-4 p-5 text-left w-full
                 hover:border-primary/40 transition-all duration-300 hover:scale-[1.03]
                 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          <FaCertificate style={{ color: accent }} className="text-xl" />
        </div>
        <span
          className="text-[11px] px-2 py-0.5 rounded-full font-mono"
          style={{ background: `${tagColor}15`, border: `1px solid ${tagColor}30`, color: tagColor }}
        >
          {cert.tag}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-sm text-white mb-1 group-hover:text-primary transition-colors duration-200">
          {cert.cardName || cert.name}
        </h3>
        <p className="text-xs text-slate-500 font-mono">{cert.issuer}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-slate-600 font-mono">{cert.year}</span>
        <span
          className="flex items-center gap-1 text-xs font-mono group-hover:gap-2 transition-all duration-200"
          style={{ color: accent }}
        >
          Ver detalhes <HiExternalLink />
        </span>
      </div>
    </button>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
const Certificates = () => {
  const { t }      = useLanguage()
  const sectionRef = useRef(null)
  const [active, setActive] = useState(null)
  const handleClose = useCallback(() => setActive(null), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 90)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const certs = t.certificates?.items ?? []

  return (
    <>
      <section id="certificates" className="py-24 relative overflow-hidden" ref={sectionRef}>
        <div
          className="orb w-80 h-80 top-1/4 left-[-100px]"
          style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)' }}
        />
        <div
          className="orb w-72 h-72 bottom-1/4 right-[-80px]"
          style={{ background: 'radial-gradient(circle, rgba(245,0,87,0.08) 0%, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-12">
            <p className="text-primary font-mono text-sm mb-2">
              {t.certificates?.tag ?? '// certificados'}
            </p>
            <h2 className="section-title">{t.certificates?.title ?? 'Certificados'}</h2>
            <p className="section-subtitle">{t.certificates?.subtitle ?? 'Cursos e certificações concluídos'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((cert, i) => (
              <CertCard key={i} cert={cert} index={i} onClick={setActive} />
            ))}
          </div>
        </div>
      </section>

      {active && <CertModal cert={active} onClose={handleClose} />}
    </>
  )
}

export default Certificates
