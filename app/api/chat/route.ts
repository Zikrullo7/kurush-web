import { NextRequest, NextResponse } from 'next/server'
import { LAWS_DB_TEXT } from '@/lib/laws-data'

export const runtime = 'edge'
export const maxDuration = 30

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25000)
    try {
      const response = await fetch(url, { ...options, signal: controller.signal })
      clearTimeout(timeout)
      if (response.ok) return response
      // Non-2xx: log and retry (except 4xx client errors — no point retrying)
      const status = response.status
      if (status >= 400 && status < 500) return response
      if (i < retries - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)))
    } catch (e) {
      clearTimeout(timeout)
      if (i === retries - 1) throw e
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)))
    }
  }
  throw new Error('All retries exhausted')
}

export async function POST(req: NextRequest) {
  let lang = 'ru'
  try {
    const body = await req.json()
    const { message, history } = body
    lang = body.lang === 'tj' ? 'tj' : 'ru'

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        text: lang === 'tj'
          ? 'Калиди API танзим нашудааст.'
          : 'API ключ не настроен. Добавьте OPENROUTER_API_KEY.',
      })
    }

    const systemPrompt = lang === 'tj'
      ? `Ту KurushLex AI — ёрдамчии ҳуқуқии шаҳрвандони Тоҷикистон ҳастӣ.

ҚОИДАҲО:
1. ТАНҲО бо забони тоҷикӣ (кириллица) ҷавоб деҳ
2. Мухтасар ва возеҳ (на зиёда аз 250 калима)
3. Рақами моддаро ҳамеша нишон деҳ
4. Қадамҳои мушаххас бо рақам деҳ
5. Дар охир илова кун: "⚖️ Барои корҳои ҷиддӣ ба адвокат муроҷиат кунед"
6. Агар савол ҳуқуқӣ набошад — бо эҳтиром рад кун
7. Қонунҳои зерро истифода бар ва ихтироъ накун

БАЗАИ ҚОНУНҲОИ ТОҶИКИСТОН:
${LAWS_DB_TEXT}`
      : `Ты — KurushLex AI, юридический помощник граждан Таджикистана.

ПРАВИЛА:
1. Отвечай ТОЛЬКО на русском языке
2. Кратко и понятно (не более 250 слов)
3. Всегда указывай конкретный номер статьи закона
4. Давай пошаговые действия (нумерованный список)
5. В конце добавляй: "⚖️ Для серьёзных дел обратитесь к адвокату"
6. Если вопрос не юридический — вежливо отклони
7. Не выдумывай законы — используй только базу ниже

БАЗА ЗАКОНОВ ТАДЖИКИСТАНА:
${LAWS_DB_TEXT}`

    const response = await fetchWithRetry(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://kurushlex.tj',
          'X-Title': 'KurushLex',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          max_tokens: 500,
          messages: [
            { role: 'system', content: systemPrompt },
            ...(Array.isArray(history) ? history.slice(-10) : []),
            { role: 'user', content: message },
          ],
        }),
      }
    )

    if (!response.ok) {
      console.error('OpenRouter error:', response.status, await response.text())
      return NextResponse.json({
        text: lang === 'tj'
          ? 'Хатои сервер. Дубора санҷед.'
          : 'Ошибка сервера. Попробуйте ещё раз.',
      })
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content
      ?? (lang === 'tj' ? 'Ҷавоб гирифта нашуд.' : 'Не удалось получить ответ.')

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Chat API error:', error)
    const isAbort = error instanceof Error && error.name === 'AbortError'
    return NextResponse.json({
      text: lang === 'tj'
        ? isAbort
          ? 'Вақт тамом шуд. Дубора санҷед.'
          : 'Пайваст нест. Интернетро тафтиш кунед.'
        : isAbort
          ? 'Время ожидания истекло. Попробуйте ещё раз.'
          : 'Нет соединения. Проверьте интернет.',
    })
  }
}
