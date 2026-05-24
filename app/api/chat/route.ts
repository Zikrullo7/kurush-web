import { NextRequest, NextResponse } from 'next/server'
import { LAWS_DB_TEXT } from '@/lib/laws-data'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  // Parse lang outside try so catch block can access it
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

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://kurushlex.tj',
        'X-Title': 'KurushLex',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        max_tokens: 500,
        messages: [
          { role: 'system', content: systemPrompt },
          ...(Array.isArray(history) ? history.slice(-10) : []),
          { role: 'user', content: message },
        ],
      }),
    })

    if (!response.ok) {
      console.error('OpenRouter error:', await response.text())
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
    return NextResponse.json({
      text: lang === 'tj'
        ? 'Хато рух дод. Интернетро санҷед.'
        : 'Произошла ошибка. Проверьте подключение к интернету.',
    })
  }
}
