import React, { useState } from 'react'

const PLANS = [
  {
    name: 'Starter',
    price: { monthly: 149, annual: 119 },
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
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Growth',
    price: { monthly: 399, annual: 319 },
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
    cta: 'Start free trial',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: { monthly: 899, annual: 719 },
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
    cta: 'Start free trial',
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
  cta: (h) => ({ width: '100%', padding: '14px', background: h ? 'var(--accent)' : 'var(--ink)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', transition: 'opacity 0.2s', boxShadow: h ? '0 2px 16px rgba(212,82,26,0.35)' : 'none' }),
  compare: (h) => ({ textAlign: 'center', fontSize: '12px', color: h ? 'rgba(255,255,255,0.3)' : 'var(--ink-3)', marginTop: '12px' }),
  footer: { textAlign: 'center', marginTop: '36px', fontSize: '14px', color: 'var(--ink-3)' },
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

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
              <button style={s.cta(plan.highlight)}>{plan.cta}</button>
              <p style={s.compare(plan.highlight)}>{plan.compare}</p>
            </div>
          ))}
        </div>
        <p style={s.footer}>
          All plans include a 14-day free trial · No credit card required · Cancel anytime · Flat team pricing — never per-seat
        </p>
      </div>
    </section>
  )
}
