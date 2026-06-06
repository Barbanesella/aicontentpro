import React, { useState } from 'react'

const s = {
  section: {
    padding: '100px 40px',
    background: 'var(--paper)',
  },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center',
  },
  eyebrow: {
    fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--accent)',
    marginBottom: '16px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 4vw, 48px)',
    letterSpacing: '-0.02em', lineHeight: 1.1,
    color: 'var(--ink)', marginBottom: '20px',
  },
  body: {
    fontSize: '17px', color: 'var(--ink-2)',
    lineHeight: 1.7, fontWeight: 300, marginBottom: '32px',
  },
  quoteBlock: {
    borderLeft: '3px solid var(--accent)',
    paddingLeft: '20px', marginTop: '32px',
  },
  quote: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px', color: 'var(--ink)',
    fontStyle: 'italic', lineHeight: 1.5, marginBottom: '10px',
  },
  quoteAuthor: {
    fontSize: '13px', color: 'var(--ink-3)',
  },
  calc: {
    background: '#fff', borderRadius: '20px',
    padding: '40px', border: '1px solid var(--paper-3)',
    boxShadow: 'var(--shadow-lg)',
  },
  calcLabel: {
    fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--ink-3)',
    marginBottom: '20px',
  },
  sliderRow: { marginBottom: '28px' },
  sliderLabel: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '14px', color: 'var(--ink-2)', marginBottom: '10px',
  },
  sliderVal: { fontWeight: 500, color: 'var(--ink)' },
  slider: {
    width: '100%', accentColor: 'var(--accent)',
    height: '4px', cursor: 'pointer',
  },
  divider: {
    height: '1px', background: 'var(--paper-3)', margin: '24px 0',
  },
  compareRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px',
  },
  compareCard: (highlight) => ({
    padding: '20px', borderRadius: '12px',
    background: highlight ? 'var(--accent)' : 'var(--paper-2)',
    border: `1px solid ${highlight ? 'var(--accent)' : 'var(--paper-3)'}`,
  }),
  compareLabel: (highlight) => ({
    fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: highlight ? 'rgba(255,255,255,0.7)' : 'var(--ink-3)',
    marginBottom: '8px',
  }),
  compareNum: (highlight) => ({
    fontFamily: 'var(--font-display)',
    fontSize: '28px', letterSpacing: '-0.02em',
    color: highlight ? '#fff' : 'var(--ink)',
  }),
  compareSub: (highlight) => ({
    fontSize: '12px', marginTop: '4px',
    color: highlight ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)',
  }),
  savingsBox: {
    background: 'var(--green-light)', borderRadius: '12px',
    padding: '20px', textAlign: 'center',
  },
  savingsLabel: { fontSize: '13px', color: 'var(--green)', marginBottom: '6px' },
  savingsNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '36px', color: 'var(--green)',
    letterSpacing: '-0.02em',
  },
}

export default function ROI() {
  const [articles, setArticles] = useState(20)
  const agencyCost = articles * 600
  const ourCost = articles <= 50 ? 2500 : articles <= 200 ? 5000 : 10000
  const savings = agencyCost - ourCost

  return (
    <section style={s.section}>
      <div style={s.inner}>
        <div style={s.grid}>
          <div>
            <p style={s.eyebrow}>Return on investment</p>
            <h2 style={s.h2}>The math is simple.</h2>
            <p style={s.body}>
              A good B2B article from an agency costs €400–800. A freelancer charges €200–400. With AI Content Pro, the same quality costs €50 or less — and it sounds like you, not like a contractor who read your brief once.
            </p>
            <div style={s.quoteBlock}>
              <div style={s.quote}>"We cut our content spend by 70% and tripled our output in the first month."</div>
              <div style={s.quoteAuthor}>— Sarah K., VP Marketing at a Series B SaaS</div>
            </div>
          </div>

          <div style={s.calc}>
            <div style={s.calcLabel}>ROI calculator</div>

            <div style={s.sliderRow}>
              <div style={s.sliderLabel}>
                <span>Articles per month</span>
                <span style={s.sliderVal}>{articles}</span>
              </div>
              <input
                type="range" min="5" max="300" step="5"
                value={articles}
                onChange={e => setArticles(Number(e.target.value))}
                style={s.slider}
              />
            </div>

            <div style={s.divider} />

            <div style={s.compareRow}>
              <div style={s.compareCard(false)}>
                <div style={s.compareLabel(false)}>Agency cost</div>
                <div style={s.compareNum(false)}>€{agencyCost.toLocaleString()}</div>
                <div style={s.compareSub(false)}>at €600/article</div>
              </div>
              <div style={s.compareCard(true)}>
                <div style={s.compareLabel(true)}>AI Content Pro</div>
                <div style={s.compareNum(true)}>€{ourCost.toLocaleString()}</div>
                <div style={s.compareSub(true)}>flat monthly</div>
              </div>
            </div>

            <div style={s.savingsBox}>
              <div style={s.savingsLabel}>You save every month</div>
              <div style={s.savingsNum}>€{Math.max(0, savings).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
