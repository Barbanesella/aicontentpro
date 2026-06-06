import React from 'react'

const companies = ['Notion', 'Linear', 'Vercel', 'Stripe', 'Loom', 'Figma', 'Intercom']

const s = {
  section: {
    padding: '32px 40px',
    borderTop: '1px solid var(--paper-3)',
    borderBottom: '1px solid var(--paper-3)',
    background: 'var(--paper-2)',
  },
  inner: { maxWidth: '1200px', margin: '0 auto', textAlign: 'center' },
  label: {
    fontSize: '12px', color: 'var(--ink-3)', letterSpacing: '0.06em',
    textTransform: 'uppercase', marginBottom: '20px', fontWeight: 500,
  },
  logos: {
    display: 'flex', gap: '48px', alignItems: 'center',
    justifyContent: 'center', flexWrap: 'wrap',
  },
  logo: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px', fontWeight: 500,
    color: 'var(--ink-3)', letterSpacing: '-0.01em',
    opacity: 0.6,
  },
}

export default function LogoBar() {
  return (
    <section style={s.section}>
      <div style={s.inner}>
        <p style={s.label}>Content teams at fast-growing companies</p>
        <div style={s.logos}>
          {companies.map(c => (
            <span key={c} style={s.logo}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
