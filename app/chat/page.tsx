'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/i18n'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const FREE_LIMIT = 5

function ChatContent() {
  const searchParams = useSearchParams()
  const { lang } = useLang()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Reset welcome message when lang changes
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: t(lang, 'chat_welcome'),
      timestamp: new Date(),
    }])
  }, [lang])

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setInput(decodeURIComponent(q))
  }, [searchParams])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const suggestions = t(lang, 'chat_suggestions') as unknown as string[]

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading || userMessageCount >= FREE_LIMIT) return

    const userMsg: Message = { role: 'user', content: trimmed, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setUserMessageCount((prev) => prev + 1)

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, lang }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: data.text || (lang === 'tj' ? 'Хато. Дубора санҷед.' : 'Ошибка. Попробуйте ещё раз.'),
        timestamp: new Date(),
      }])
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: lang === 'tj' ? '❌ Хатои пайваст. Интернетро санҷед.' : '❌ Ошибка соединения. Проверьте интернет.',
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  const limitReached = userMessageCount >= FREE_LIMIT

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', background: '#0A1628', maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
      {/* Header */}
      <div style={{ padding: '20px 0 16px', borderBottom: '1px solid #1E3A5F', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(0,200,150,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          🤖
        </div>
        <div>
          <h1 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '18px' }}>{t(lang, 'chat_title')}</h1>
          <p style={{ color: '#4A6080', fontSize: '12px' }}>{t(lang, 'chat_subtitle')}</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            background: '#112240', border: '1px solid #1E3A5F',
            borderRadius: '100px', padding: '4px 12px', fontSize: '12px',
            color: userMessageCount >= FREE_LIMIT - 1 ? '#FF6B6B' : '#4A6080',
          }}>
            {FREE_LIMIT - userMessageCount} / {FREE_LIMIT} {t(lang, 'chat_free_label')}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} className="animate-fade-in-up" style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}>
            {msg.role === 'assistant' && (
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,200,150,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>🤖</div>
            )}
            <div style={{
              maxWidth: '75%',
              background: msg.role === 'user' ? 'rgba(0,200,150,0.15)' : '#112240',
              border: `1px solid ${msg.role === 'user' ? 'rgba(0,200,150,0.3)' : '#1E3A5F'}`,
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
              padding: '12px 16px',
            }}>
              <p style={{ color: msg.role === 'user' ? '#00C896' : '#FFFFFF', fontSize: '15px', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {msg.content}
              </p>
              <span style={{ color: '#4A6080', fontSize: '11px', display: 'block', marginTop: '4px', textAlign: 'right' }}>
                {msg.timestamp.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,200,150,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🤖</div>
            <div style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: '4px 18px 18px 18px', padding: '14px 18px', display: 'flex', gap: '6px', alignItems: 'center' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="typing-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4A6080', animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Limit banner */}
        {limitReached && (
          <div style={{ background: 'linear-gradient(135deg, #112240 0%, #0A1628 100%)', border: '1px solid #00C896', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📱</div>
            <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>{t(lang, 'chat_limit_title')}</h3>
            <p style={{ color: '#4A6080', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{t(lang, 'chat_limit_desc')}</p>
            <Link href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#00C896', color: '#0A1628', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>
              {t(lang, 'chat_limit_btn')}
            </Link>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {messages.length <= 1 && !limitReached && Array.isArray(suggestions) && (
        <div style={{ padding: '12px 0', display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #1E3A5F' }}>
          {suggestions.map((q: string) => (
            <button key={q} onClick={() => sendMessage(q)} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: '100px', padding: '8px 16px', color: '#FFFFFF', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00C896'; e.currentTarget.style.color = '#00C896' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1E3A5F'; e.currentTarget.style.color = '#FFFFFF' }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '16px 0 20px', borderTop: messages.length > 1 ? '1px solid #1E3A5F' : 'none' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', background: '#112240', border: '1px solid #1E3A5F', borderRadius: '16px', padding: '12px' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={limitReached ? t(lang, 'chat_placeholder_limit') : t(lang, 'chat_placeholder')}
            disabled={loading || limitReached}
            rows={1}
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#FFFFFF', fontSize: '15px', outline: 'none', resize: 'none', maxHeight: '120px', lineHeight: 1.5, opacity: limitReached ? 0.5 : 1 }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading || limitReached}
            style={{ width: '40px', height: '40px', borderRadius: '10px', background: input.trim() && !loading && !limitReached ? '#00C896' : '#1E3A5F', border: 'none', cursor: input.trim() && !loading && !limitReached ? 'pointer' : 'not-allowed', fontSize: '18px', transition: 'background 0.2s', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ➤
          </button>
        </div>
        <p style={{ color: '#4A6080', fontSize: '11px', textAlign: 'center', marginTop: '8px' }}>
          {t(lang, 'chat_disclaimer')}
        </p>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0A1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A6080' }}>...</div>}>
      <ChatContent />
    </Suspense>
  )
}
