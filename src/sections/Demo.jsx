import React, { useState } from 'react'

const CONTENT_TYPES = [
  { id: 'seo', label: 'SEO Article', icon: '📄' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: '💼' },
  { id: 'newsletter', label: 'Newsletter', icon: '✉️' },
  { id: 'script', label: 'Video Script', icon: '🎬' },
]

const SAMPLES = {
  seo: {
    title: 'Why 83% of B2B SaaS Blogs Fail to Generate Leads (And How to Fix Yours)',
    body: `Most B2B content teams are playing a losing game. They publish consistently, cover the right topics, and still watch their organic traffic flatline.

The problem isn't effort. It's specificity.

After analysing 300+ SaaS blogs, we found one pattern separating high-traffic content from the forgotten middle: the best articles solve one problem so completely that readers bookmark them, share them, and return to them months later.

Here's the framework we use with our clients to turn generic "thought leadership" into content that actually ranks and converts...`,
    meta: ['2,100 words', 'Keyword density: 1.4%', 'Readability: 68'],
  },
  linkedin: {
    title: null,
    body: `We spent €18,000/month on a content agency for two years.

The articles were fine. Technically correct. Properly structured.

Completely forgettable.

Six months ago we switched to training AI on our own content archive. The difference was immediate — our Head of Content thought a senior writer had joined the team.

3 things that changed:
→ Content now sounds like us, not like "a blog post"
→ We publish 4x more without hiring
→ Organic leads up 60% in Q2

The insight: most AI content fails because it has no voice. Give it yours.

What's your experience with AI content tools? 👇`,
    meta: ['LinkedIn post', '187 words', 'Engagement-optimised'],
  },
  newsletter: {
    title: 'This week: the content strategy that 3x\'d our traffic',
    body: `Hey [First name],

Quick question: when did you last read a B2B blog post all the way to the end?

If you're like most people, the answer is "rarely." Not because the topics are wrong — but because the writing is forgettable.

This week I want to share the exact framework we use to fix that.

**The Core Insight**
Generic AI content fails for one reason: it has no point of view. It summarises, hedges, and plays it safe. Your audience can smell it immediately.

The fix is simpler than you think...`,
    meta: ['Newsletter', '320 words', 'Open rate: est. 38%'],
  },
  script: {
    title: 'Video Script: "Why Your Content Isn\'t Converting"',
    body: `[HOOK — 0:00–0:15]
You're publishing content every week. You have a strategy. You're doing everything right.
So why isn't it working?

[PROBLEM — 0:15–0:45]
Here's what nobody tells you about B2B content: volume isn't the problem. Voice is.
Most teams are producing technically correct, completely forgettable articles that rank nowhere and convert nobody.

[SOLUTION — 0:45–1:30]
The companies seeing 3x traffic growth aren't publishing more. They're publishing content that sounds unmistakably like them...`,
    meta: ['Video script', '~90 sec', 'Hook-optimised'],
  },
}

const s = {
  section: {
    padding: '100px 40px',
    background: 'var(--ink)',
    position: 'relative', overflow: 'hidden',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(212,82,26,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  inner: { maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 },
  header: { textAlign: 'center', marginBottom: '56px' },
  eyebrow: {
    fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--accent)',
    marginBottom: '16px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 4vw, 52px)',
    letterSpacing: '-0.02em', lineHeight: 1.1,
    color: '#fff', marginBottom: '16px',
  },
  sub: { fontSize: '17px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '32px', alignItems: 'start',
  },
  panel: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '18px', padding: '28px',
  },
  panelLabel: {
    fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
    marginBottom: '16px',
  },
  typeGrid: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' },
  typeBtn: (active) => ({
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '12px 16px', borderRadius: '10px',
    background: active ? 'rgba(212,82,26,0.15)' : 'transparent',
    border: `1px solid ${active ? 'rgba(212,82,26,0.4)' : 'rgba(255,255,255,0.06)'}`,
    cursor: 'pointer', transition: 'all 0.2s',
    color: active ? '#fff' : 'rgba(255,255,255,0.5)',
    fontSize: '14px', fontWeight: active ? 500 : 400,
    textAlign: 'left',
  }),
  input: {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#fff',
    fontSize: '14px', outline: 'none',
    marginBottom: '12px',
    fontFamily: 'var(--font-body)',
  },
  generateBtn: (loading) => ({
    width: '100%', padding: '14px',
    background: loading ? 'rgba(212,82,26,0.5)' : 'var(--accent)',
    color: '#fff', border: 'none', borderRadius: '10px',
    fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    boxShadow: loading ? 'none' : '0 2px 16px rgba(212,82,26,0.35)',
  }),
  output: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '18px', padding: '32px',
    minHeight: '400px',
  },
  outputTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px', color: '#fff',
    marginBottom: '16px', fontStyle: 'italic', lineHeight: 1.35,
  },
  outputBody: {
    fontSize: '14px', color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.85, whiteSpace: 'pre-line',
  },
  metaRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' },
  metaTag: {
    padding: '4px 10px', borderRadius: '20px',
    fontSize: '11px', fontWeight: 500,
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.5)',
  },
  placeholder: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    height: '300px', gap: '12px',
  },
  placeholderIcon: { fontSize: '40px', opacity: 0.2 },
  placeholderText: { color: 'rgba(255,255,255,0.25)', fontSize: '14px' },
  cursor: {
    display: 'inline-block', width: '2px', height: '16px',
    background: 'var(--accent)', marginLeft: '2px',
    animation: 'pulse 1s infinite',
    verticalAlign: 'middle',
  },
}

export default function Demo() {
  const [type, setType] = useState('seo')
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [typed, setTyped] = useState('')

  const generate = () => {
    if (loading) return
    setLoading(true)
    setResult(null)
    setTyped('')

    setTimeout(() => {
      setLoading(false)
      const sample = SAMPLES[type]
      setResult(sample)
      // Typewriter effect on body
      let i = 0
      const text = sample.body
      const interval = setInterval(() => {
        i += 3
        setTyped(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, 16)
    }, 1400)
  }

  const current = SAMPLES[type]

  return (
    <section id="demo" style={s.section}>
      <div style={s.bg} />
      <div style={s.inner}>
        <div style={s.header}>
          <p style={s.eyebrow}>Live demo</p>
          <h2 style={s.h2}>Try it right now.</h2>
          <p style={s.sub}>No signup. Pick a content type, enter a topic, see the output.</p>
        </div>

        <div style={s.grid}>
          <div style={s.panel}>
            <div style={s.panelLabel}>Content type</div>
            <div style={s.typeGrid}>
              {CONTENT_TYPES.map(ct => (
                <button key={ct.id} style={s.typeBtn(type === ct.id)} onClick={() => { setType(ct.id); setResult(null); setTyped('') }}>
                  <span>{ct.icon}</span>
                  <span>{ct.label}</span>
                </button>
              ))}
            </div>

            <div style={s.panelLabel}>Your topic</div>
            <input
              style={s.input}
              placeholder="e.g. why B2B content fails"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
            />

            <button style={s.generateBtn(loading)} onClick={generate} disabled={loading}>
              {loading ? 'Generating...' : 'Generate →'}
            </button>
          </div>

          <div style={s.output}>
            {!result && !loading && (
              <div style={s.placeholder}>
                <div style={s.placeholderIcon}>✦</div>
                <div style={s.placeholderText}>Your content will appear here</div>
              </div>
            )}

            {loading && (
              <div style={s.placeholder}>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                  Training brand voice... generating...
                </div>
              </div>
            )}

            {result && !loading && (
              <>
                {result.title && <div style={s.outputTitle}>{result.title}</div>}
                <div style={s.outputBody}>
                  {typed}
                  {typed.length < result.body.length && <span style={s.cursor} />}
                </div>
                <div style={s.metaRow}>
                  {result.meta.map(m => <span key={m} style={s.metaTag}>{m}</span>)}
                  <span style={{ ...s.metaTag, background: 'rgba(212,82,26,0.2)', color: 'var(--accent)' }}>Brand voice: active</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
