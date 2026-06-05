# AI Content Pro

B2B AI content platform landing page.

## Stack
- React 18
- Vite
- Plain CSS (no Tailwind needed)

## Local development
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import from GitHub
3. Vercel auto-detects Vite — just click Deploy

## Analytics (PostHog)
1. Sign up at app.posthog.com (free up to 1M events)
2. Copy your Project API Key
3. Replace `YOUR_POSTHOG_KEY` in `src/analytics.js`
