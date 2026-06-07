import crypto from 'crypto'

// Лимиты генераций по тарифу
const PLAN_LIMITS = {
  starter: 40,
  growth: 200,
  pro: 999999,
}

// Определяем тариф по сумме платежа
function getPlanByAmount(amount) {
  const usd = parseFloat(amount)
  if (usd >= 800) return 'pro'
  if (usd >= 350) return 'growth'
  if (usd >= 130) return 'starter'
  return 'trial'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const payload = req.body

    // Верификация подписи NOWPayments
    const nowpaymentsIpnSecret = process.env.NOWPAYMENTS_IPN_SECRET
    if (nowpaymentsIpnSecret) {
      const receivedSig = req.headers['x-nowpayments-sig']
      const sortedPayload = JSON.stringify(
        Object.keys(payload).sort().reduce((acc, key) => {
          acc[key] = payload[key]
          return acc
        }, {})
      )
      const expectedSig = crypto
        .createHmac('sha512', nowpaymentsIpnSecret)
        .update(sortedPayload)
        .digest('hex')

      if (receivedSig !== expectedSig) {
        return res.status(401).json({ error: 'Invalid signature' })
      }
    }

    const { payment_status, order_id, price_amount, payer_email } = payload

    // Обрабатываем только успешные платежи
    if (payment_status !== 'finished' && payment_status !== 'confirmed') {
      return res.status(200).json({ message: 'Payment not yet confirmed' })
    }

    // Определяем тариф
    const plan = getPlanByAmount(price_amount)
    const limit = PLAN_LIMITS[plan]

    // Обновляем подписку в Supabase
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Ищем пользователя по email
    const userRes = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?email=eq.${encodeURIComponent(payer_email)}&limit=1`,
      {
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const users = await userRes.json()

    if (users && users.length > 0) {
      // Обновляем существующую подписку
      await fetch(
        `${supabaseUrl}/rest/v1/subscriptions?email=eq.${encodeURIComponent(payer_email)}`,
        {
          method: 'PATCH',
          headers: {
            apikey: supabaseServiceKey,
            Authorization: `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            plan,
            status: 'active',
            generations_limit: limit,
            payment_id: payload.payment_id,
            order_id,
            amount: price_amount,
            updated_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }),
        }
      )
    } else {
      // Создаём новую подписку если пользователь не найден
      await fetch(`${supabaseUrl}/rest/v1/subscriptions`, {
        method: 'POST',
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: payer_email,
          plan,
          status: 'active',
          generations_limit: limit,
          payment_id: payload.payment_id,
          order_id,
          amount: price_amount,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      })
    }

    return res.status(200).json({ message: 'Subscription activated', plan })

  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
