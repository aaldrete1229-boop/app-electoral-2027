import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const environment = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const separator = line.indexOf('=')
      return [line.slice(0, separator), line.slice(separator + 1)]
    }),
)

const url = environment.VITE_SUPABASE_URL
const publishableKey = environment.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !publishableKey) {
  throw new Error('Completa VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en .env.local.')
}

mkdirSync('public', { recursive: true })
writeFileSync(
  'public/supabase-config.js',
  `window.SUPABASE_CONFIG = ${JSON.stringify({ url, publishableKey })}\n`,
  { mode: 0o600 },
)
