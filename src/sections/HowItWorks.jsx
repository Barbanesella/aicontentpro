import React from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Train your brand voice',
    body: 'Upload 5–10 of your best-performing articles, posts, or emails. The engine analyses your tone, vocabulary, sentence structure, and point of view. Takes 3 minutes.',
    detail: 'Works with: blog posts, LinkedIn content, newsletters, sales emails, documentation',
  },
  {
    num: '02',
    title: 'Generate on demand',
    body: 'Pick a content type, enter a topic or headline. The platform produces a full structured draft in under 60 seconds — in your voice, with your perspective, ready to publish.',
    detail: 'Output types: SEO articles, LinkedIn posts, email sequences, video scripts',
  },
  {
    num: '03',
    title: 'Publish or integrate',
    body: 'Copy directly to your CMS, export as Markdown or HTML, or pull via REST API into your own workflow. Full API access from the Growth plan.',
    detail: 'Integrations: WordPress, Webflow, HubSpot, Notion, custom via API',
  },
]

const s = {
  section: {
    padding: '100px 40px',
    background: 'var(--paper-2)',
  },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  header: { marginBottom: '64px' },
  eyebrow: {
    fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--accent)',
    marginBottom: '16px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 4vw, 52px)',
    letterSpacing: '-0.02em', lineHeight: 1.1,
    color: 'var(--ink)', maxWidth: '560px',
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
  },
  card: {
    background: '#fff', borderRadius: '18px',
    padding: '36px 32px',
    border: '1px solid var(--paper-3)',
    position: 'relative', overflow: 'hidden',
  },
  num: {
    fontFamily: 'var(--font-display)',
    fontSize: '72px', color: 'var(--paper-3)',
    position: 'absolute', top: '16px', right: '24px',
    lineHeight: 1, userSelect: 'none',
    fontStyle: 'italic',
  },
  stepNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '13px', color: 'var(--accent)',
    fontWeight: 500, marginBottom: '16px',
    letterSpacing: '0.04em',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px', color: 'var(--ink)',
    marginBottom: '14px', lineHeight: 1.2,
    fontStyle: 'italic',
  },
  cardBody: {
    fontSize: '15px', color: 'var(--ink-2)',
    lineHeight: 1.7, marginBottom: '20px',
  },
  detail: {
    fontSize: '12px', color: 'var(--ink-3)',
    lineHeight: 1.6, paddingTop: '16px',
    borderTop: '1px solid var(--paper-3)',
  },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={s.section}>
      <div style={s.inner}>
        <div style={s.header}>
          <p style={s.eyebrow}>How it works</p>
          <h2 style={s.h2}>Configure once. Generate forever.</h2>
        </div>
        <div style={s.grid}>
          {STEPS.map(step => (
            <div key={step.num} style={s.card}>
              <div style={s.num}>{step.num}</div>
              <div style={s.stepNum}>Step {step.num}</div>
              <div style={s.cardTitle}>{step.title}</div>
              <p style={s.cardBody}>{step.body}</p>
              <p style={s.detail}>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
