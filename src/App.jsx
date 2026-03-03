import React, { useEffect, useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Scroll-to-top button
const ScrollTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(135deg, #6C63FF, #F50057)',
        boxShadow: '0 0 20px rgba(108,99,255,0.5)',
      }}
      aria-label="Voltar ao topo"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

const App = () => {
  const [loading, setLoading] = useState(true)

  return (
    <LanguageProvider>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <div className="relative bg-dark min-h-screen">
        <Particles />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certificates />
            <Contact />
          </main>
          <Footer />
        </div>
        <ScrollTop />
      </div>
    </LanguageProvider>
  )
}

export default App
