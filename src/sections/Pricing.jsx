import React, { useState } from 'react'

const NOWPAYMENTS_API_KEY = '1MSAHPS-0QXM1DX-GV63R38-82F7266'

const PLANS = [
  {
    name: 'Starter',
    price: { monthly: 149, annual: 119 },
    priceUSD: { monthly: 149, annual: 119 },
    desc: 'One decision, no CFO approval needed. Less than a single freelance article.',
    features: [
      '40 AI content generations/mo',
      '3 brand voice profiles',
      'SEO articles, posts, newsletters',
      '3 team seats (not per-seat)',
      'SEO optimisation included',
      'Email support',
    ],
    compare: 'vs Jasper: $39/seat + $89 Surfer SEO = $128+ for one person',
    highlight: false,
  },
  {
    name: 'Growth',
    price: { monthly: 399, annual: 319 },
    priceUSD: { monthly: 399, annual: 319 },
    desc: 'The plan most mid-market SaaS teams run on. Flat price, whole team included.',
    features: [
      '200 AI content generations/mo',
      'Unlimited brand voice profiles',
      'All content types',
      '10 team seats (not per-seat)',
      'SEO + GEO optimisation',
      'REST API (10k req/mo)',
      'Priority support',
    ],
    compare: 'vs Writer.com: $29/seat × 10 = $290 + no brand voice',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: { monthly: 899, annual: 719 },
    priceUSD: { monthly: 899, annual: 719 },
    desc: 'For content-led teams who need unlimited output and full API access.',
    features: [
      'Unlimited generations',
      'Unlimited seats & voices',
      'Full API + webhooks',
      'Analytics dashboard',
      'SSO & custom contracts',
      'Dedicated account manager',
    ],
    compare: 'vs Jasper Business: $250–350/mo + hidden costs',
    highlight: false,
  },
]

const s = {
  section: { padding: '100px 40px', background: 'var(--paper-2)' },
  inner: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '40px' },
  eyebrow: { fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '16px' },
  earlyBanner: { background: 'var(--green-light)', borderRadius: '12px', padding: '14px 20px', textAlign: 'center', marginBottom: '32px', fontSize: '14px', color: 'var(--green)', fontWeight: 500 },
  earlyLink: { textDecoration: 'underline', color: 'var(--green)', cursor: 'pointer' },
  toggle: { display: 'inline-flex', background: 'var(--paper-3)', borderRadius: '10px', padding: '4px', gap: '4px' },
  toggleBtn: (active) => ({ padding: '8px 20px', borderRadius: '7px', fontSize: '14px', fontWeight: 500, background: active ? '#fff' : 'transparent', color: active ? 'var(--ink)' : 'var(--ink-3)', border: 'none', cursor: 'pointer', boxShadow: active ? 'var(--shadow)' : 'none', transition: 'all 0.2s' }),
  saveBadge: { display: 'inline-block', marginLeft: '8px', background: 'var(--green-light)', color: 'var(--green)', fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  card: (h) => ({ background: h ? 'var(--ink)' : '#fff', borderRadius: '20px', padding: '36px 32px', border: `1.5px solid ${h ? 'var(--ink)' : 'var(--paper-3)'}`, position: 'relative', boxShadow: h ? 'var(--shadow-lg)' : 'none', transform: h ? 'scale(1.03)' : 'none' }),
  badge: { position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', fontSize: '11px', fontWeight: 500, padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap' },
  planName: (h) => ({ fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: h ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', marginBottom: '8px' }),
  price: (h) => ({ fontFamily: 'var(--font-display)', fontSize: '42px', letterSpacing: '-0.02em', color: h ? '#fff' : 'var(--ink)', lineHeight: 1 }),
  pricePer: (h) => ({ fontSize: '13px', color: h ? 'rgba(255,255,255,0.4)' : 'var(--ink-3)', marginLeft: '4px' }),
  planDesc: (h) => ({ fontSize: '14px', color: h ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', margin: '12px 0 24px', lineHeight: 1.5 }),
  divider: (h) => ({ height: '1px', background: h ? 'rgba(255,255,255,0.1)' : 'var(--paper-3)', margin: '20px 0' }),
  featureList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' },
  feature: (h) => ({ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: h ? 'rgba(255,255,255,0.75)' : 'var(--ink-2)' }),
  check: (h) => ({ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, background: h ? 'rgba(255,255,255,0.1)' : 'var(--green-light)', color: h ? 'rgba(255,255,255,0.7)' : 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }),
  ctaRow: { display: 'flex', flexDirection: 'column', gap: '8px' },
  cta: (h) => ({ width: '100%', padding: '14px', background: h ? 'var(--accent)' : 'var(--ink)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', transition: 'opacity 0.2s', boxShadow: h ? '0 2px 16px rgba(212,82,26,0.35)' : 'none' }),
  cryptoBtn: (h) => ({ width: '100%', padding: '11px', background: 'transparent', color: h ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)', border: `1.5px solid ${h ? 'rgba(255,255,255,0.15)' : 'var(--paper-3)'}`, borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }),
  compare: (h) => ({ textAlign: 'center', fontSize: '12px', color: h ? 'rgba(255,255,255,0.3)' : 'var(--ink-3)', marginTop: '12px' }),
  footer: { textAlign: 'center', marginTop: '36px', fontSize: '14px', color: 'var(--ink-3)' },
  modal: { position: 'fixed', inset: 0, background: 'rgba(15,14,12,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modalCard: { background: '#fff', borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  modalTitle: { fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--ink)', marginBottom: '8px', fontStyle: 'italic' },
  modalSub: { fontSize: '14px', color: 'var(--ink-3)', marginBottom: '24px' },
  modalAmount: { background: 'var(--paper-2)', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalAmountLabel: { fontSize: '13px', color: 'var(--ink-3)' },
  modalAmountNum: { fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--ink)', letterSpacing: '-0.02em' },
  payBtn: (loading) => ({ width: '100%', padding: '14px', background: loading ? 'rgba(212,82,26,0.5)' : 'var(--accent)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '12px', boxShadow: '0 2px 12px rgba(212,82,26,0.3)' }),
  cancelBtn: { width: '100%', padding: '12px', background: 'transparent', color: 'var(--ink-3)', border: '1.5px solid var(--paper-3)', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' },
  cryptoNote: { fontSize: '12px', color: 'var(--ink-3)', textAlign: 'center', marginTop: '16px', lineHeight: 1.6 },
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [payeerLoading, setPayeerLoading] = useState(false)
  const [email, setEmail] = useState('')

  const openCryptoModal = (plan) => {
    const displayAmount = annual ? plan.priceUSD.annual : plan.priceUSD.monthly
    const amount = Math.round(displayAmount / 1.013)
    setModal({ plan, amount, displayAmount })
  }

  const payWithPayeer = async (plan) => {
    const email_input = prompt('Enter your email to continue:')
    if (!email_input) return
    setPayeerLoading(true)
    try {
      const displayAmount = annual ? plan.priceUSD.annual : plan.priceUSD.monthly
      const res = await fetch('/api/payeer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: displayAmount.toFixed(2),
          plan: plan.name.toLowerCase(),
          email: email_input,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Payment error. Please try again.')
      }
    } catch {
      alert('Connection error. Please try again.')
    } finally {
      setPayeerLoading(false)
    }
  }

  const createPayment = async () => {
    if (!email) return alert('Please enter your email')
    setLoading(true)
    try {
      const res = await fetch('https://api.nowpayments.io/v1/invoice', {
        method: 'POST',
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_amount: modal.amount,
          price_currency: 'usd',
          pay_currency: 'usdttrc20',
          order_id: `${modal.plan.name.toLowerCase()}-${Date.now()}`,
          order_description: `AI Content Pro — ${modal.plan.name} Plan`,
          ipn_callback_url: 'https://aicontentpro.app/api/payment-callback',
          success_url: 'https://aicontentpro.app/dashboard',
          cancel_url: 'https://aicontentpro.app/#pricing',
          is_fixed_rate: true,
          is_fee_paid_by_user: false,
        }),
      })
      const data = await res.json()
      if (data.invoice_url) {
        window.location.href = data.invoice_url
      } else {
        alert('Payment error. Please try again.')
      }
    } catch (err) {
      alert('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" style={s.section}>
      <div style={s.inner}>
        <div style={s.header}>
          <p style={s.eyebrow}>Pricing</p>
          <h2 style={s.h2}>Predictable. Scalable.</h2>
          <div style={{ marginTop: '24px' }}>
            <div style={s.toggle}>
              <button style={s.toggleBtn(!annual)} onClick={() => setAnnual(false)}>Monthly</button>
              <button style={s.toggleBtn(annual)} onClick={() => setAnnual(true)}>
                Annual <span style={s.saveBadge}>Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        <div style={s.earlyBanner}>
          🎉 Early access: first 20 teams get <strong>50% off forever</strong> + a personal onboarding call.{' '}
          <a style={s.earlyLink}>Claim your spot →</a>
        </div>

        <div style={s.grid}>
          {PLANS.map(plan => (
            <div key={plan.name} style={s.card(plan.highlight)}>
              {plan.badge && <div style={s.badge}>{plan.badge}</div>}
              <div style={s.planName(plan.highlight)}>{plan.name}</div>
              <div>
                <span style={s.price(plan.highlight)}>
                  €{(annual ? plan.price.annual : plan.price.monthly).toLocaleString()}
                </span>
                <span style={s.pricePer(plan.highlight)}>/mo</span>
              </div>
              <p style={s.planDesc(plan.highlight)}>{plan.desc}</p>
              <div style={s.divider(plan.highlight)} />
              <ul style={s.featureList}>
                {plan.features.map(f => (
                  <li key={f} style={s.feature(plan.highlight)}>
                    <span style={s.check(plan.highlight)}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={s.ctaRow}>
                <button
                  style={s.cta(plan.highlight)}
                  onClick={() => window.location.href = '/signup'}
                >
                  Start free trial
                </button>
                <button
                  style={s.cryptoBtn(plan.highlight)}
                  onClick={() => openCryptoModal(plan)}
                >
                  ₮ Pay with USDT
                </button>
                <button
                  style={s.cryptoBtn(plan.highlight)}
                  onClick={() => payWithPayeer(plan)}
                  disabled={payeerLoading}
                >
                  💳 Pay with Payeer
                </button>
              </div>
              </div>
              <p style={s.compare(plan.highlight)}>{plan.compare}</p>
            </div>
          ))}
        </div>

        <p style={s.footer}>
          All plans include a 14-day free trial · No credit card required · Cancel anytime · Flat team pricing — never per-seat
        </p>
      </div>

      {modal && (
        <div style={s.modal} onClick={() => setModal(null)}>
          <div style={s.modalCard} onClick={e => e.stopPropagation()}>
            <div style={s.modalTitle}>Pay with USDT</div>
            <div style={s.modalSub}>
              AI Content Pro — {modal.plan.name} Plan · {annual ? 'Annual' : 'Monthly'}
            </div>

            <div style={s.modalAmount}>
              <span style={s.modalAmountLabel}>Total</span>
              <span style={s.modalAmountNum}>${modal.displayAmount}</span>
            </div>

            <div style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--paper-3)',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '20px',
              fontSize: '12px',
              color: 'var(--ink-3)',
              lineHeight: 1.6,
            }}>
              ✓ Exchange fee already included in the price above.<br />
              You pay exactly what you see — no hidden charges.
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                Your email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--paper-3)', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <button style={s.payBtn(loading)} onClick={createPayment} disabled={loading}>
              {loading ? 'Creating payment...' : `Pay $${modal.displayAmount} in USDT →`}
            </button>
            <button style={s.cancelBtn} onClick={() => setModal(null)}>Cancel</button>
            <p style={s.cryptoNote}>
              You'll be redirected to a secure payment page.<br />
              USDT · TRC-20 network · Powered by NOWPayments
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
