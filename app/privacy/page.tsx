import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — KurushLex',
  description: 'Политика конфиденциальности приложения KurushLex',
}

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Какие данные мы собираем',
      content: [
        '**Номер телефона** — используется для авторизации через Firebase Authentication',
        '**История запросов** — хранится локально на вашем устройстве, не передаётся на серверы',
        '**Технические данные** — версия Android, модель устройства (для диагностики ошибок)',
      ],
    },
    {
      title: '2. Как мы используем данные',
      content: [
        'Авторизация пользователей в приложении',
        'Улучшение качества ответов AI-юриста',
        'Техническая поддержка и устранение ошибок',
        'Статистика использования (анонимно)',
      ],
    },
    {
      title: '3. Третьи стороны',
      content: [
        '**Firebase (Google)** — авторизация и аналитика. Политика: firebase.google.com/support/privacy',
        '**OpenRouter** — обработка запросов к AI. Политика: openrouter.ai/privacy',
        'Мы НЕ продаём ваши данные третьим лицам',
        'Мы НЕ используем данные для рекламы',
      ],
    },
    {
      title: '4. Хранение данных',
      content: [
        'История чатов хранится только на вашем устройстве',
        'При удалении приложения все локальные данные удаляются',
        'Серверные данные (авторизация) хранятся в Firebase',
        'Вы можете запросить удаление аккаунта в любое время',
      ],
    },
    {
      title: '5. Безопасность',
      content: [
        'Все соединения зашифрованы (HTTPS/TLS)',
        'Пароли не хранятся — используется Firebase OTP (SMS)',
        'Данные не передаются в страны с низким уровнем защиты данных',
      ],
    },
    {
      title: '6. Ваши права',
      content: [
        'Право на доступ к вашим данным',
        'Право на исправление неточных данных',
        'Право на удаление данных (запрос на курushlex@gmail.com)',
        'Право на ограничение обработки',
      ],
    },
    {
      title: '7. Изменения политики',
      content: [
        'Мы можем обновлять данную политику',
        'О существенных изменениях уведомляем через приложение',
        'Продолжение использования = согласие с обновлённой политикой',
      ],
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', padding: '40px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/" style={{ color: '#4A6080', textDecoration: 'none', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← На главную
          </Link>

          <div style={{
            display: 'inline-block',
            background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.3)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '16px',
          }}>
            <span style={{ color: '#00C896', fontSize: '12px', fontWeight: 600 }}>
              🔒 Последнее обновление: 2026 год
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
            Политика конфиденциальности
          </h1>
          <p style={{ color: '#4A6080', fontSize: '16px', lineHeight: 1.7 }}>
            KurushLex серьёзно относится к защите ваших данных. Этот документ объясняет,
            какие данные мы собираем и как их используем.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          {sections.map((section) => (
            <div key={section.title} style={{
              background: '#112240',
              border: '1px solid #1E3A5F',
              borderRadius: '16px',
              padding: '28px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
                {section.title}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.content.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#00C896', flexShrink: 0, marginTop: '2px' }}>•</span>
                    <span
                      style={{ color: '#8BA0B8', fontSize: '15px', lineHeight: 1.6 }}
                      dangerouslySetInnerHTML={{
                        __html: item.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#FFFFFF">$1</strong>'),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,200,150,0.08) 0%, transparent 100%)',
          border: '1px solid rgba(0,200,150,0.2)',
          borderRadius: '20px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
          <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
            Вопросы по конфиденциальности
          </h3>
          <p style={{ color: '#4A6080', marginBottom: '16px', fontSize: '14px' }}>
            По любым вопросам, связанным с вашими данными, пишите нам:
          </p>
          <a href="mailto:kurushlex@gmail.com" style={{
            color: '#00C896', textDecoration: 'none',
            fontWeight: 700, fontSize: '18px',
          }}>
            kurushlex@gmail.com
          </a>
          <p style={{ color: '#4A6080', fontSize: '13px', marginTop: '16px' }}>
            © 2026 KurushLex. Таджикистан 🇹🇯
          </p>
        </div>
      </div>
    </div>
  )
}
