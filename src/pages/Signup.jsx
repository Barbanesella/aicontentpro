import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Замени на свои данные из app.supabase.com → Project Settings → API
const SUPABASE_URL = 'https://ihlcpvwbnlntgmxgjazs.supabase.co/'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobGNwdndibmxudGdteGdqYXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2Nzc3NzAsImV4cCI6MjA5NjI1Mzc3MH0.CyetHuMwQvQze8xunQb8gyKgF4ANxw7OVOa4cauuzX8'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const s = {
  page: {
    minHeight: '100vh',
    background: 'var(--paper)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    position: 'relative',
  },
  bg: {
    position: 'fixed', inset: 0, zIndex: 0,
    background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,82,26,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '48px 44px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 2px 8px rgba(15,14,12,.08),0 16px 48px rgba(15,14,12,.12)',
    border: '1px solid var(--paper-3)',
    position: 'relative', zIndex: 1,
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px', color: 'var(--ink)',
    fontStyle: 'italic', textAlign: 'center',
    marginBottom: '8px',
    display: 'block',
    textDecoration: 'none',
  },
  logoSpan: { color: 'var(--accent)', fontStyle: 'normal' },
  tabs: {
    display: 'flex', background: 'var(--paper-2)',
    borderRadius: '10px', padding: '4px', gap: '4px',
    marginBottom: '32px', marginTop: '28px',
  },
  tab: (active) => ({
    flex: 1, padding: '10px', borderRadius: '8px',
    fontSize: '14px', fontWeight: 500,
    background: active ? '#fff' : 'transparent',
    color: active ? 'var(--ink)' : 'var(--ink-3)',
    border: 'none', cursor: 'pointer',
    boxShadow: active ? '0 1px 3px rgba(15,14,12,.08)' : 'none',
    transition: 'all 0.2s', fontFamily: 'var(--font-body)',
  }),
  label: {
    display: 'block', fontSize: '13px',
    fontWeight: 500, color: 'var(--ink-2)',
    marginBottom: '6px',
  },
  input: {
    width: '100%', padding: '12px 14px',
    background: 'var(--paper)',
    border: '1.5px solid var(--paper-3)',
    borderRadius: '10px', fontSize: '15px',
    color: 'var(--ink)', outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    marginBottom: '16px',
    boxSizing: 'border-box',
  },
  btn: (loading) => ({
    width: '100%', padding: '14px',
    background: loading ? 'rgba(212,82,26,0.6)' : 'var(--accent)',
    color: '#fff', border: 'none', borderRadius: '10px',
    fontSize: '15px', fontWeight: 500,
    cursor: loading ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-body)',
    boxShadow: loading ? 'none' : '0 2px 12px rgba(212,82,26,0.3)',
    transition: 'all 0.2s', marginTop: '4px',
  }),
  divider: {
    display: 'flex', alignItems: 'center', gap: '12px',
    margin: '20px 0', color: 'var(--ink-3)', fontSize: '13px',
  },
  dividerLine: { flex: 1, height: '1px', background: 'var(--paper-3)' },
  googleBtn: {
    width: '100%', padding: '12px',
    background: '#fff', color: 'var(--ink)',
    border: '1.5px solid var(--paper-3)', borderRadius: '10px',
    fontSize: '14px', fontWeight: 500, cursor: 'pointer',
    fontFamily: 'var(--font-body)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', gap: '10px',
    transition: 'border-color 0.2s',
  },
  error: {
    background: '#fff5f5', border: '1px solid #fed7d7',
    borderRadius: '8px', padding: '12px 14px',
    fontSize: '13px', color: '#c53030', marginBottom: '16px',
  },
  success: {
    background: 'var(--green-light)', border: '1px solid #c6f6d5',
    borderRadius: '8px', padding: '12px 14px',
    fontSize: '13px', color: 'var(--green)', marginBottom: '16px',
  },
  terms: {
    fontSize: '12px', color: 'var(--ink-3)',
    textAlign: 'center', marginTop: '20px', lineHeight: 1.6,
  },
  termsLink: { color: 'var(--accent)', cursor: 'pointer' },
}

export default function Signup() {
  const [mode, setMode] = useState('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async () => {
    setError(''); setSuccess('')
    if (!email || !password) return setError('Please fill in all fields.')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name } },
        })
        if (err) throw err
        setSuccess('Account created! Check your email to confirm.')
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
        setSuccess('Signed in! Redirecting...')
        setTimeout(() => window.location.href = '/dashboard', 1200)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/dashboard' },
    })
  }

  return (
    <div style={s.page}>
      <div style={s.bg} />
      <div style={s.card}>
        <a href="/" style={s.logo}>
          AI Content <span style={s.logoSpan}>Pro</span>
        </a>

        <div style={s.tabs}>
          <button style={s.tab(mode === 'signup')} onClick={() => { setMode('signup'); setError(''); setSuccess('') }}>
            Create account
          </button>
          <button style={s.tab(mode === 'login')} onClick={() => { setMode('login'); setError(''); setSuccess('') }}>
            Sign in
          </button>
        </div>

        {error && <div style={s.error}>⚠️ {error}</div>}
        {success && <div style={s.success}>✓ {success}</div>}

        {mode === 'signup' && (
          <>
            <label style={s.label}>Full name</label>
            <input
              style={s.input}
              type="text"
              placeholder="Sarah Johnson"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </>
        )}

        <label style={s.label}>Work email</label>
        <input
          style={s.input}
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />

        <label style={s.label}>Password</label>
        <input
          style={s.input}
          type="password"
          placeholder={mode === 'signup' ? 'Min. 8 characters' : 'Your password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />

        <button style={s.btn(loading)} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : mode === 'signup' ? 'Create free account →' : 'Sign in →'}
        </button>

        <div style={s.divider}>
          <div style={s.dividerLine} />
          <span>or</span>
          <div style={s.dividerLine} />
        </div>

        <button style={s.googleBtn} onClick={handleGoogle}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.8 13.3l7.8 6C12.5 13 17.9 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
            <path fill="#FBBC05" d="M10.6 28.7A14.9 14.9 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.1-6.1z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.1 0-11.3-4.1-13.2-9.7l-8 6.1C6.5 42.5 14.6 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        {mode === 'signup' && (
          <p style={s.terms}>
            By creating an account you agree to our{' '}
            <span style={s.termsLink}>Terms of Service</span> and{' '}
            <span style={s.termsLink}>Privacy Policy</span>.
            <br />14-day free trial · No credit card required.
          </p>
        )}
      </div>
    </div>
  )
}
