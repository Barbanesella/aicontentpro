import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ihlcpvwbnlntgmxgjazs.supabase.co/rest/v1/'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobGNwdndibmxudGdteGdqYXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2Nzc3NzAsImV4cCI6MjA5NjI1Mzc3MH0.CyetHuMwQvQze8xunQb8gyKgF4ANxw7OVOa4cauuzX8'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const PLANS = {
  starter: { label: 'Starter', limit: 40 },
  growth: { label: 'Growth', limit: 200 },
  pro: { label: 'Pro', limit: 999999 },
  trial: { label: 'Free Trial', limit: 5 },
}

const CONTENT_TYPES = [
  { id: 'seo', label: 'SEO Article', icon: '📄' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: '💼' },
  { id: 'newsletter', label: 'Newsletter', icon: '✉️' },
  { id: 'script', label: 'Video Script', icon: '🎬' },
]

const s = {
  page: { minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-body)' },
  nav: { background: '#fff', borderBottom: '1px solid var(--paper-3)', padding: '0 40px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--ink)', fontStyle: 'italic', textDecoration: 'none' },
  logoSpan: { color: 'var(--accent)', fontStyle: 'normal' },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  planBadge: { background: 'var(--accent-light)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 },
  signOutBtn: { background: 'transparent', border: '1px solid var(--paper-3)', color: 'var(--ink-3)', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' },
  body: { maxWidth: '1200px', margin: '0 auto', padding: '40px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' },
  card: { background: '#fff', borderRadius: '16px', border: '1px solid var(--paper-3)', padding: '32px' },
  cardTitle: { fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--ink)', marginBottom: '24px', fontStyle: 'italic' },
  typeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' },
  typeBtn: (active) => ({ padding: '10px 14px', borderRadius: '10px', background: active ? 'var(--accent-light)' : 'var(--paper-2)', border: `1.5px solid ${active ? 'var(--accent)' : 'transparent'}`, cursor: 'pointer', fontSize: '13px', fontWeight: active ? 500 : 400, color: active ? 'var(--accent)' : 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', transition: 'all .2s' }),
  label: { fontSize: '13px', fontWeight: 500, color: 'var(--ink-2)', marginBottom: '6px', display: 'block' },
  input: { width: '100%', padding: '11px 14px', border: '1.5px solid var(--paper-3)', borderRadius: '10px', fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-body)', marginBottom: '16px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '11px 14px', border: '1.5px solid var(--paper-3)', borderRadius: '10px', fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-body)', marginBottom: '16px', boxSizing: 'border-box', minHeight: '80px', resize: 'vertical' },
  generateBtn: (loading) => ({ width: '100%', padding: '13px', background: loading ? 'rgba(212,82,26,.5)' : 'var(--accent)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', boxShadow: loading ? 'none' : '0 2px 12px rgba(212,82,26,.25)' }),
  outputBox: { marginTop: '24px', background: 'var(--paper)', borderRadius: '12px', padding: '20px', border: '1px solid var(--paper-3)', minHeight: '200px' },
  outputText: { fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.8, whiteSpace: 'pre-line' },
  copyBtn: { marginTop: '12px', padding: '8px 16px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '20px' },
  usageCard: { background: '#fff', borderRadius: '16px', border: '1px solid var(--paper-3)', padding: '24px' },
  usageTitle: { fontSize: '13px', fontWeight: 500, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' },
  usageNums: { fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '4px' },
  usageSub: { fontSize: '13px', color: 'var(--ink-3)', marginBottom: '14px' },
  bar: { height: '6px', background: 'var(--paper-3)', borderRadius: '3px', overflow: 'hidden' },
  barFill: (pct) => ({ height: '100%', width: `${Math.min(pct, 100)}%`, background: pct > 80 ? '#e53e3e' : 'var(--accent)', borderRadius: '3px', transition: 'width .5s' }),
  upgradeBtn: { width: '100%', marginTop: '16px', padding: '10px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' },
  historyCard: { background: '#fff', borderRadius: '16px', border: '1px solid var(--paper-3)', padding: '24px' },
  historyTitle: { fontSize: '13px', fontWeight: 500, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' },
  historyItem: { padding: '12px 0', borderBottom: '1px solid var(--paper-3)', cursor: 'pointer' },
  historyType: { fontSize: '11px', fontWeight: 500, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' },
  historyTopic: { fontSize: '13px', color: 'var(--ink-2)', marginBottom: '4px' },
  historyDate: { fontSize: '11px', color: 'var(--ink-3)' },
  emptyHistory: { fontSize: '13px', color: 'var(--ink-3)', textAlign: 'center', padding: '20px 0' },
  loadingScreen: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-body)', color: 'var(--ink-3)', fontSize: '15px' },
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState('seo')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])
  const [usageCount, setUsageCount] = useState(0)
  const [plan] = useState('trial')
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/signup'
        return
      }
      setUser(session.user)
      loadHistory(session.user.id)
      loadUsage(session.user.id)
      setLoading(false)
    })
  }, [])

  const loadHistory = async (userId) => {
    const saved = localStorage.getItem(`history_${userId}`)
    if (saved) setHistory(JSON.parse(saved))
  }

  const loadUsage = async (userId) => {
    const key = `usage_${userId}_${new Date().getMonth()}`
    const count = parseInt(localStorage.getItem(key) || '0')
    setUsageCount(count)
  }

  const saveGeneration = (userId, type, topic, content) => {
    const item = { id: Date.now(), type, topic, content, date: new Date().toISOString() }
    const saved = localStorage.getItem(`history_${userId}`)
    const arr = saved ? JSON.parse(saved) : []
    const updated = [item, ...arr].slice(0, 20)
    localStorage.setItem(`history_${userId}`, JSON.stringify(updated))
    setHistory(updated)

    const key = `usage_${userId}_${new Date().getMonth()}`
    const newCount = usageCount + 1
    localStorage.setItem(key, newCount.toString())
    setUsageCount(newCount)
  }

  const generate = async () => {
    if (generating) return
    if (!topic.trim()) return setError('Please enter a topic.')
    const limit = PLANS[plan].limit
    if (usageCount >= limit) return setError(`You've reached your ${limit} generation limit. Please upgrade.`)

    setGenerating(true)
    setResult('')
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, topic, tone }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || 'Something went wrong.')
        return
      }
      setResult(data.content)
      saveGeneration(user.id, type, topic, data.content)
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return <div style={s.loadingScreen}>Loading...</div>

  const planInfo = PLANS[plan]
  const usagePct = (usageCount / planInfo.limit) * 100

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <a href="/" style={s.logo}>AI Content <span style={s.logoSpan}>Pro</span></a>
        <div style={s.navRight}>
          <span style={s.planBadge}>{planInfo.label}</span>
          <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{user?.email}</span>
          <button style={s.signOutBtn} onClick={signOut}>Sign out</button>
        </div>
      </nav>

      <div style={s.body}>
        <div style={s.grid}>
          {/* Generator */}
          <div style={s.card}>
            <div style={s.cardTitle}>Generate content</div>

            <div style={s.typeGrid}>
              {CONTENT_TYPES.map(ct => (
                <button key={ct.id} style={s.typeBtn(type === ct.id)}
                  onClick={() => { setType(ct.id); setResult(''); setError('') }}>
                  <span>{ct.icon}</span>{ct.label}
                </button>
              ))}
            </div>

            <label style={s.label}>Topic or headline</label>
            <input
              style={s.input}
              placeholder="e.g. why B2B content fails to convert"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
            />

            <label style={s.label}>Brand tone (optional)</label>
            <input
              style={s.input}
              placeholder="e.g. direct, no corporate jargon, like a practitioner"
              value={tone}
              onChange={e => setTone(e.target.value)}
            />

            {error && (
              <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#c53030', marginBottom: '16px' }}>
                ⚠️ {error}
              </div>
            )}

            <button style={s.generateBtn(generating)} onClick={generate} disabled={generating}>
              {generating ? 'Generating...' : 'Generate →'}
            </button>

            {result && (
              <div style={s.outputBox}>
                <div style={s.outputText}>{result}</div>
                <button style={s.copyBtn} onClick={copy}>
                  {copied ? '✓ Copied!' : 'Copy text'}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={s.sidebar}>
            {/* Usage */}
            <div style={s.usageCard}>
              <div style={s.usageTitle}>Usage this month</div>
              <div style={s.usageNums}>{usageCount} <span style={{ fontSize: '20px', color: 'var(--ink-3)' }}>/ {planInfo.limit === 999999 ? '∞' : planInfo.limit}</span></div>
              <div style={s.usageSub}>generations used</div>
              <div style={s.bar}>
                <div style={s.barFill(usagePct)} />
              </div>
              {plan !== 'pro' && (
                <button style={s.upgradeBtn} onClick={() => window.location.href = '/#pricing'}>
                  Upgrade plan →
                </button>
              )}
            </div>

            {/* History */}
            <div style={s.historyCard}>
              <div style={s.historyTitle}>Recent generations</div>
              {history.length === 0 ? (
                <div style={s.emptyHistory}>No generations yet</div>
              ) : (
                history.slice(0, 8).map(item => (
                  <div key={item.id} style={s.historyItem} onClick={() => setResult(item.content)}>
                    <div style={s.historyType}>{item.type}</div>
                    <div style={s.historyTopic}>{item.topic}</div>
                    <div style={s.historyDate}>{new Date(item.date).toLocaleDateString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
