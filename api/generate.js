export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://aicontentpro.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { type, topic } = req.body

  if (!type || !topic) {
    return res.status(400).json({ error: 'Missing type or topic' })
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  // Промпты для каждого типа контента
  const prompts = {
    seo: `You are an expert B2B SaaS content writer with a sharp, direct voice. Write the opening 3 paragraphs of an SEO article about: "${topic}". 

Style: Conversational but authoritative. Start with a bold claim or surprising stat. Use short sentences. No corporate jargon. Sound like a practitioner, not a consultant.

Output only the article text, no titles or meta info.`,

    linkedin: `You are a B2B SaaS founder with a large LinkedIn following known for contrarian takes. Write a LinkedIn post about: "${topic}".

Style: Hook in first line (no "I" start). Short punchy lines. Personal insight. End with a question. 150-200 words max.

Output only the post text.`,

    newsletter: `You are writing a weekly newsletter for B2B SaaS marketers. Write the opening section (intro + first insight) of a newsletter about: "${topic}".

Style: Casual but smart. Like writing to a friend who's also a professional. Start with a personal observation. 200-250 words.

Output only the newsletter text.`,

    script: `You are a B2B video scriptwriter. Write a 60-90 second video script about: "${topic}".

Format: [HOOK 0:00-0:15], [PROBLEM 0:15-0:45], [SOLUTION 0:45-1:15]. Each section labeled. Conversational, no corporate speak.

Output only the script.`,
  }

  const prompt = prompts[type] || prompts.seo

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Anthropic API error' })
    }

    const text = data.content?.[0]?.text || ''
    return res.status(200).json({ content: text })

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
