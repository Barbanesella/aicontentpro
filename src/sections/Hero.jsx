import React from 'react'

const s = {
  section: {
    minHeight: '100vh',
    display: 'flex', alignItems: 'center',
    padding: '120px 40px 80px',
    background: 'var(--paper)',
    position: 'relative', overflow: 'hidden',
  },
  bg: {
    position: 'absolute', inset: 0, zIndex: 0,
    background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(212,82,26,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  inner: {
    maxWidth: '1200px', margin: '0 auto', width: '100%',
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '80px', alignItems: 'center', position: 'relative', zIndex: 1,
  },
  tag: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    background: 'var(--green-light)', color: 'var(--green)',
    padding: '5px 12px', borderRadius: '20px',
    fontSize: '12px', fontWeight: 500, marginBottom: '24px',
    letterSpacing: '0.02em',
  },
  dot: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: 'var(--green)',
    animation: 'pulse 2s infinite',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(42px, 5vw, 64px)',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    color: 'var(--ink)',
    marginBottom: '24px',
  },
  em: { fontStyle: 'italic', color: 'var(--accent)' },
  sub: {
    fontSize: '18px', color: 'var(--ink-2)',
    lineHeight: 1.6, marginBottom: '40px',
    fontWeight: 300, maxWidth: '460px',
  },
  actions: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  btnPrimary: {
    background: 'var(--accent)', color: '#fff',
    padding: '14px 28px', borderRadius: '10px',
    fontSize: '15px', fontWeight: 500,
    border: 'none', cursor: 'pointer',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 2px 12px rgba(212,82,26,0.3)',
  },
  btnSecondary: {
    background: 'transparent', color: 'var(--ink)',
    padding: '14px 28px', borderRadius: '10px',
    fontSize: '15px', fontWeight: 400,
    border: '1.5px solid var(--paper-3)', cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  statsRow: {
    display: 'flex', gap: '32px', marginTop: '48px',
    paddingTop: '32px', borderTop: '1px solid var(--paper-3)',
  },
  stat: {},
  statNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '32px', color: 'var(--ink)',
    letterSpacing: '-0.02em',
  },
  statLabel: { fontSize: '13px', color: 'var(--ink-3)', marginTop: '2px' },
  card: {
    background: '#fff',
    border: '1px solid var(--paper-3)',
    borderRadius: '18px',
    padding: '32px',
    boxShadow: 'var(--shadow-lg)',
  },
  cardLabel: {
    fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
    color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '16px',
  },
  contentBlock: {
    background: 'var(--paper)',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '16px',
    fontSize: '14px',
    lineHeight: 1.7,
    color: 'var(--ink-2)',
    border: '1px solid var(--paper-3)',
  },
  contentTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '16px', color: 'var(--ink)',
    marginBottom: '8px',
    fontStyle: 'italic',
  },
  metaRow: {
    display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px',
  },
  metaTag: {
    background: 'var(--accent-light)', color: 'var(--accent)',
    padding: '3px 10px', borderRadius: '20px',
    fontSize: '11px', fontWeight: 500,
  },
  genBtn: {
    width: '100%', padding: '12px',
    background: 'var(--ink)', color: 'var(--paper)',
    border: 'none', borderRadius: '8px',
    fontSize: '14px', fontWeight: 500, cursor: 'pointer',
    marginTop: '8px',
  },
}

export default function Hero() {
  return (
    <section style={s.section}>
      <div style={s.bg} />
      <div style={s.inner}>
        <div>
          <div className="fade-up" style={s.tag}>
            <span style={s.dot} /> New: Brand Voice Engine v2.0
          </div>
          <h1 className="fade-up-2" style={s.h1}>
            Content that sounds <em style={s.em}>exactly</em> like you wrote it.
          </h1>
          <p className="fade-up-3" style={s.sub}>
            AI Content Pro learns your brand voice and generates SEO articles, LinkedIn posts, newsletters, and scripts — indistinguishable from your best team writing.
          </p>
          <div className="fade-up-4" style={s.actions}>
            <button style={s.btnPrimary} onClick={() => window.location.href = '/signup'}>Start free trial</button>
<button style={s.btnSecondary} onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}>See it in action →</button>
          </div>
          <div className="fade-up-4" style={s.statsRow}>
            <div style={s.stat}>
              <div style={s.statNum}>3×</div>
              <div style={s.statLabel}>avg. organic traffic lift</div>
            </div>
            <div style={s.stat}>
              <div style={s.statNum}>8 min</div>
              <div style={s.statLabel}>to first article</div>
            </div>
            <div style={s.stat}>
              <div style={s.statNum}>€50</div>
              <div style={s.statLabel}>per piece vs €600 agency</div>
            </div>
          </div>
        </div>

        <div className="fade-up-3" style={s.card}>
          <div style={s.cardLabel}>Generated just now</div>
          <div style={s.contentBlock}>
            <div style={s.contentTitle}>5 Ways B2B SaaS Teams Waste Their Content Budget</div>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.7 }}>
              Most B2B content teams confuse volume with value. After analysing 300+ SaaS blogs, we found that 74% of published articles drive zero organic traffic — not because the topics are wrong, but because the writing lacks the specificity that Google and readers reward...
            </p>
            <div style={s.metaRow}>
              <span style={s.metaTag}>SEO article</span>
              <span style={s.metaTag}>1,847 words</span>
              <span style={s.metaTag}>Brand voice: on</span>
            </div>
          </div>
          <button style={s.genBtn} onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}>Generate another →</button>
        </div>
      </div>
    </section>
  )
}
