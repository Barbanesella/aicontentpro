import crypto from 'crypto'

function verifySign(params, apiKey) {
  const filtered = {}
  for (const [k, v] of Object.entries(params)) {
    if (k === 'sign' || k === 'sign_type') continue
    if (v === null || v === undefined) continue
    filtered[k] = v
  }
  const plain = Object.keys(filtered).sort()
    .map(k => `${k}=${filtered[k]}`)
    .join('&')
  return crypto.createHash('md5').update(plain + apiKey).digest('hex').toLowerCase()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const PAYEER_API_KEY = process.env.PAYEER_API_KEY
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  const payload = req.body
  const { paymentId, amount, currency, status_str, sign, customerEmail, clientOrderId } = payload

  // Верификация подписи
  const expectedSign = verifySign(payload, PAYEER_API_KEY)
  if (sign !== expectedSign) {
    return res.status(400).send('invalid sign')
  }

  // Обрабатываем только успешные платежи
  if (status_str !== 'paid') {
    return res.status(200).send('success')
  }

  // Определяем план по сумме
  const usd = parseFloat(amount)
  let plan = 'trial'
  let limit = 5
  if (usd >= 800) { plan = 'pro'; limit = 999999 }
  else if (usd >= 350) { plan = 'growth'; limit = 200 }
  else if (usd >= 130) { plan = 'starter'; limit = 40 }

  const payer_email = customerEmail

  try {
    const userRes = await fetch(
      `${SUPABASE_URL}/rest/v1/subscriptions?email=eq.${encodeURIComponent(payer_email)}&limit=1`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    )
    const users = await userRes.json()

    if (users && users.length > 0) {
      await fetch(
        `${SUPABASE_URL}/rest/v1/subscriptions?email=eq.${encodeURIComponent(payer_email)}`,
        {
          method: 'PATCH',
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            plan, status: 'active',
            generations_limit: limit,
            order_id: clientOrderId || paymentId,
            amount,
            updated_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }),
        }
      )
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/subscriptions`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: payer_email, plan, status: 'active',
          generations_limit: limit,
          order_id: clientOrderId || paymentId,
          amount,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      })
    }

    return res.status(200).send('success')
  } catch (err) {
    console.error('Payeer webhook error:', err)
    return res.status(500).send('error')
  }
}
