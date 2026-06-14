import crypto from 'crypto'

function signRequest(params, apiKey) {
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
  res.setHeader('Access-Control-Allow-Origin', 'https://aicontentpro.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { amount, plan, email } = req.body
  if (!amount || !plan || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const PAYEER_APP_ID = process.env.PAYEER_APP_ID
  const PAYEER_API_KEY = process.env.PAYEER_API_KEY

  if (!PAYEER_APP_ID || !PAYEER_API_KEY) {
    return res.status(500).json({ error: 'Payeer not configured' })
  }

  const clientOrderId = `${plan}-${Date.now()}`

  const params = {
    appid: PAYEER_APP_ID,
    clientip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '127.0.0.1',
    action: 'createorder',
    amount: parseFloat(amount),
    currency: 'USD',
    paymentMethod: 'select', // даём клиенту выбрать метод оплаты
    description: `AI Content Pro — ${plan} Plan`,
    customerEmail: email,
    clientOrderId,
    return_url: `https://aicontentpro.app/dashboard`,
    notify_url: `https://aicontentpro.app/api/payeer-webhook`,
  }

  params.sign = signRequest(params, PAYEER_API_KEY)
  params.sign_type = 'MD5'

  try {
    const response = await fetch('https://payeer.online/api/createorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      return res.status(500).json({ error: data.message || 'Payeer API error' })
    }

    const checkoutUrl = data.data?.redirectUrl || data.data?.selectUrl || `https://payeer.online/payment/${data.data?.paymentId}`

    return res.status(200).json({ url: checkoutUrl, orderId: clientOrderId })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
