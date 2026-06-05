import React, { useState, useEffect } from 'react'

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px', height: '64px',
    transition: 'background 0.3s, box-shadow 0.3s',
  },
  navScrolled: {
    background: 'rgba(250,249,246,0.92)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 1px 0 rgba(15,14,12,0.08)',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    color: 'var(--ink)',
    fontStyle: 'italic',
    letterSpacing: '-0.01em',
  },
  logoSpan: { color: 'var(--accent)', fontStyle: 'normal' },
  links: {
    display: 'flex', gap: '32px', alignItems: 'center',
    listStyle: 'none',
  },
  link: {
    fontSize: '14px', color: 'var(--ink-2)',
    fontWeight: 400, cursor: 'pointer',
    transition: 'color 0.2s',
  },
  cta: {
    background: 'var(--ink)', color: 'var(--paper)',
    padding: '9px 20px', borderRadius: '8px',
    fontSize: '14px', fontWeight: 500,
    cursor: 'pointer', border: 'none',
    transition: 'background 0.2s',
  },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
      <div style={styles.logo}>
        AI Content <span style={styles.logoSpan}>Pro</span>
      </div>
      <ul style={styles.links}>
        <li><a style={styles.link} href="#how-it-works">How it works</a></li>
        <li><a style={styles.link} href="#pricing">Pricing</a></li>
        <li><a style={styles.link} href="#demo">Try demo</a></li>
        <li>
          <button style={styles.cta} onClick={() => window.location.href='/signup'}>Get started</button>
        </li>
      </ul>
    </nav>
  )
}
