import React, { useState } from 'react'

const WITHOUT = {
  title: 'How to Use AI in Your Marketing Strategy',
  body: 'Artificial intelligence is transforming the marketing landscape. Companies that leverage AI tools can streamline their workflows and improve efficiency. In this article, we will explore the key ways that AI can help your marketing team achieve better results and drive more traffic to your website...',
  tags: ['Generic', 'No personality', 'Could be anyone'],
}

const WITH = {
  title: 'We Replaced Our Content Agency With AI. Here\'s What Actually Happened.',
  body: 'Six months ago, we were spending €18,000/month on a content agency. The articles were fine — technically correct, properly structured, completely forgettable. Then we trained AI Content Pro on three years of our best-performing posts. The first draft made our Head of Content ask who wrote it...',
  tags: ['Your voice', 'High engagement', 'Sounds like you'],
}

const s = {
  section: {
    padding: '100px 40px',
    background: 'var(--paper)',
  },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '64px' },
  eyebrow: {
    fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--accent)',
    marginBottom: '16px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 4vw, 52px)',
    letterSpacing: '-0.02em', lineHeight: 1.1,
    color: 'var(--ink)', marginBottom: '16px',
  },
  sub: { fontSize: '18px', color: 'var(--ink-2)', fontWeight: 300, maxWidth: '520px', margin: '0 auto' },
  toggle: {
    display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '4px',
    background: 'var(--paper-2)', borderRadius: '10px',
    padding: '4px', width: 'fit-content', margin: '0 auto 40px',
  },
  tab: (active) => ({
    padding: '10px 24px', borderRadius: '8px',
    fontSize: '14px', fontWeight: 500, cursor: 'pointer',
    border: 'none', transition: 'all 0.2s',
    background: active ? '#fff' : 'transparent',
    color: active ? 'var(--ink)' : 'var(--ink-3)',
    boxShadow: active ? 'var(--shadow)' : 'none',
  }),
  card: (active) => ({
    background: active ? '#fff' : 'var(--paper-2)',
    border: `1.5px solid ${active ? 'var(--accent)' : 'var(--paper-3)'}`,
    borderRadius: '18px', padding: '36px',
    flex: 1, transition: 'all 0.3s',
    boxShadow: active ? 'var(--shadow-lg)' : 'none',
  }),
  cardLabel: (active) => ({
    fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: active ? 'var(--accent)' : 'var(--ink-3)',
    marginBottom: '20px',
  }),
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px', color: 'var(--ink)', marginBottom: '12px',
    fontStyle: 'italic', lineHeight: 1.3,
  },
  cardBody: {
    fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.75,
    marginBottom: '20px',
  },
  tagRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  tag: (active) => ({
    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
    background: active ? 'var(--green-light)' : 'var(--paper-3)',
    color: active ? 'var(--green)' : 'var(--ink-3)',
  }),
  grid: { display: 'flex', gap: '24px' },
}

export default function BrandVoice() {
  const [active, setActive] = useState('with')

  return (
    <section style={s.section}>
      <div style={s.inner}>
        <div style={s.header}>
          <p style={s.eyebrow}>Brand Voice Engine</p>
          <h2 style={s.h2}>The difference is <em>unmistakable.</em></h2>
          <p style={s.sub}>Train once on your existing content. Every generation after that sounds like your best writer on their best day.</p>
        </div>

        <div style={s.toggle}>
          <button style={s.tab(active === 'without')} onClick={() => setActive('without')}>Without brand voice</button>
          <button style={s.tab(active === 'with')} onClick={() => setActive('with')}>With brand voice</button>
        </div>

        <div style={s.grid}>
          <div style={s.card(active === 'without')}>
            <div style={s.cardLabel(active === 'without')}>Generic AI output</div>
            <div style={s.cardTitle}>{WITHOUT.title}</div>
            <p style={s.cardBody}>{WITHOUT.body}</p>
            <div style={s.tagRow}>
              {WITHOUT.tags.map(t => <span key={t} style={s.tag(false)}>{t}</span>)}
            </div>
          </div>

          <div style={s.card(active === 'with')}>
            <div style={s.cardLabel(active === 'with')}>AI Content Pro output</div>
            <div style={s.cardTitle}>{WITH.title}</div>
            <p style={s.cardBody}>{WITH.body}</p>
            <div style={s.tagRow}>
              {WITH.tags.map(t => <span key={t} style={s.tag(true)}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
