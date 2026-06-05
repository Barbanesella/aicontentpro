import React from 'react'

const s = {
  footer: {
    background: 'var(--ink)',
    padding: '64px 40px 40px',
    color: 'rgba(255,255,255,0.5)',
  },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  top: {
    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '48px', marginBottom: '48px',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px', color: '#fff',
    fontStyle: 'italic', marginBottom: '16px',
  },
  logoSpan: { color: 'var(--accent)', fontStyle: 'normal' },
  tagline: {
    fontSize: '14px', lineHeight: 1.7,
    color: 'rgba(255,255,255,0.4)', maxWidth: '260px',
  },
  colTitle: {
    fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
    marginBottom: '16px',
  },
  links: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' },
  link: {
    fontSize: '14px', color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer', transition: 'color 0.2s',
  },
  divider: {
    height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '28px',
  },
  bottom: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: '12px',
  },
  copyright: { fontSize: '13px', color: 'rgba(255,255,255,0.3)' },
  legal: { display: 'flex', gap: '24px' },
  legalLink: { fontSize: '13px', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' },
}

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.top}>
          <div>
            <div style={s.logo}>AI Content <span style={s.logoSpan}>Pro</span></div>
            <p style={s.tagline}>AI content platform that learns your brand voice and generates content your team is proud to publish.</p>
          </div>
          <div>
            <div style={s.colTitle}>Product</div>
            <ul style={s.links}>
              {['How it works', 'Brand Voice Engine', 'API docs', 'Integrations', 'Changelog'].map(l => (
                <li key={l}><a style={s.link}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={s.colTitle}>Company</div>
            <ul style={s.links}>
              {['About', 'Blog', 'Careers', 'Press', 'Contact'].map(l => (
                <li key={l}><a style={s.link}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={s.colTitle}>Resources</div>
            <ul style={s.links}>
              {['Documentation', 'Templates', 'Case studies', 'Pricing', 'Status'].map(l => (
                <li key={l}><a style={s.link}>{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={s.divider} />
        <div style={s.bottom}>
          <span style={s.copyright}>© 2026 AI Content Pro. All rights reserved.</span>
          <div style={s.legal}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
              <a key={l} style={s.legalLink}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
