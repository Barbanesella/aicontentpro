import React, { useState } from 'react'

const CONTENT_TYPES = [
  { id: 'seo', label: 'SEO Article', icon: '📄' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: '💼' },
  { id: 'newsletter', label: 'Newsletter', icon: '✉️' },
  { id: 'script', label: 'Video Script', icon: '🎬' },
]

const META = {
  seo: ['SEO article', 'Brand voice: on', 'Claude AI'],
  linkedin: ['LinkedIn post', 'Engagement-optimised', 'Claude AI'],
  newsletter: ['Newsletter', 'Open rate optimised', 'Claude AI'],
  script: ['Video script', '~90 sec', 'Claude AI'],
}

const s = {
  section: { padding: '100px 40px', background: 'var(--ink)', position: 'relative', overflow: 'hidden' },
  bg: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 30% 50%,rgba(212,82,26,.12) 0%,transparent 70%)', pointerEvents: 'none' },
  inner: { maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 },
  header: { textAlign: 'center', marginBottom: '56px' },
  eyebrow: { fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff', marginBottom: '16px' },
  sub: { fontSize: '17px', color: 'rgba(255,255,255,.45)', fontWeight: 300 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '32px', alignItems: 'start' },
  panel: { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '18px', padding: '28px' },
  panelLabel: { fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: '16px' },
  typeGrid: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' },
  typeBtn: (active) => ({ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', background: active ? 'rgba(212,82,26,.15)' : 'transparent', border: `1px solid ${active ? 'rgba(212,82,26,.4)' : 'rgba(255,255,255,.06)'}`, cursor: 'pointer', color: active ? '#fff' : 'rgba(255,255,255,.5)', fontSize: '14px', fontWeight: active ? 500 : 400, textAlign: 'left', fontFamily: 'var(--font-body)', width: '100%', transition: 'all .2s' }),
  input: { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', marginBottom: '12px', fontFamily: 'var(--font-body)', boxSizing: 'border-box' },
  generateBtn: (loading) => ({ width: '100%', padding: '14px', background: loading ? 'rgba(212,82,26,.5)' : 'var(--accent)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all .2s', boxShadow: loading ? 'none' : '0 2px 16px rgba(212,82,26,.35)', fontFamily: 'var(--font-body)' }),
  output: { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '18px', padding: '32px', minHeight: '400px' },
  outputBody: { fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.85, whiteSpace: 'pre-line' },
  metaRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' },
  metaTag: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 500, background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.45)' },
  metaTagAccent: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 500, background: 'rgba(212,82,26,.2)', color: 'var(--accent)' },
  placeholder: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '12px' },
  placeholderIcon: { fontSize: '36px', opacity: .15 },
  placeholderText: { color: 'rgba(255,255,255,.2)', fontSize: '14px' },
  error: { color: '#ff6b6b', fontSize: '14px', textAlign: 'center', padding: '20px' },
}

export default function Demo() {
  const [type, setType] = useState('seo')
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [typed, setTyped] = useState('')

  const generate = async () => {
    if (loading) return
    if (!topic.trim()) {
      setError('Please enter a topic first.')
      return
    }
    setLoading(true)
    setResult(null)
    setTyped('')
    setError(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, topic }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setResult(data.content)
      // Typewriter effect
      let i = 0
      const text = data.content
      const interval = setInterval(() => {
        i += 5
        setTyped(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, 16)

    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" style={s.section}>
      <div style={s.bg} />
      <div style={s.inner}>
        <div style={s.header}>
          <p style={s.eyebrow}>Live demo</p>
          <h2 style={s.h2}>Try it right now.</h2>
          <p style={s.sub}>No signup. Pick a content type, enter a topic, see real AI output.</p>
        </div>

        <div style={s.grid}>
          <div style={s.panel}>
            <div style={s.panelLabel}>Content type</div>
            <div style={s.typeGrid}>
              {CONTENT_TYPES.map(ct => (
                <button key={ct.id} style={s.typeBtn(type === ct.id)}
                  onClick={() => { setType(ct.id); setResult(null); setTyped(''); setError(null) }}>
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
            {!result && !loading && !error && (
              <div style={s.placeholder}>
                <div style={s.placeholderIcon}>✦</div>
                <div style={s.placeholderText}>Your content will appear here</div>
              </div>
            )}
            {loading && (
              <div style={s.placeholder}>
                <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '14px' }}>
                  Generating with Claude AI...
                </div>
              </div>
            )}
            {error && <div style={s.error}>⚠️ {error}</div>}
            {result && !loading && (
              <>
                <div style={s.outputBody}>{typed}</div>
                <div style={s.metaRow}>
                  {META[type].map(m => <span key={m} style={s.metaTag}>{m}</span>)}
                  <span style={s.metaTagAccent}>Brand voice: active</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

