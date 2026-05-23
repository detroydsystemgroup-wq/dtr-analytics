import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') ?? ''

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', {
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, content-type' }
  })
  try {
    const { chat_id, text, parse_mode } = await req.json()
    const r = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, parse_mode: parse_mode || 'Markdown', disable_web_page_preview: true })
    })
    const data = await r.json()
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch(e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
})

