'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/i18n'

const APK_URL = 'https://github.com/kurushlex/kurushlex-app/releases/latest/download/KurushLex.apk'

export default function DownloadPage() {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNotify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  const steps = [
    { icon: '⬇️', title: t(lang, 'download_step1_title'), desc: t(lang, 'download_step1') },
    { icon: '📂', title: t(lang, 'download_step2_title'), desc: t(lang, 'download_step2') },
    { icon: '⚙️', title: t(lang, 'download_step3_title'), desc: t(lang, 'download_step3_desc') },
    { icon: '✅', title: t(lang, 'download_step4_title'), desc: t(lang, 'download_step4_desc') },
  ]

  const features = [
    { icon: '📚', title: t(lang, 'download_f1'), desc: t(lang, 'download_f1_desc') },
    { icon: '🤖', title: t(lang, 'download_f2'), desc: t(lang, 'download_f2_desc') },
    { icon: '🧮', title: t(lang, 'download_f3'), desc: t(lang, 'download_f3_desc') },
    { icon: '📶', title: t(lang, 'download_f4'), desc: t(lang, 'download_f4_desc') },
    { icon: '🔍', title: t(lang, 'download_f5'), desc: t(lang, 'download_f5_desc') },
    { icon: '🌙', title: t(lang, 'download_f6'), desc: t(lang, 'download_f6_desc') },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header with mockup */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          {/* Phone mockup — intentionally kept dark (shows the actual app UI) */}
          <div style={{ display: 'inline-block', marginBottom: '32px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse at center, rgba(0,200,150,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ width: '200px', background: 'linear-gradient(160deg, #1a3a5c 0%, #0d2340 100%)', borderRadius: '36px', padding: '14px', border: '2px solid #1E3A5F', boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)', position: 'relative' }}>
              <div style={{ width: '60px', height: '6px', background: '#0A1628', borderRadius: '3px', margin: '0 auto 12px' }} />
              <div style={{ background: '#0A1628', borderRadius: '22px', padding: '14px', minHeight: '320px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px' }}>⚖️</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '12px' }}>KurushLex</span>
                  <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#00C896' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ background: '#112240', borderRadius: '10px 10px 10px 2px', padding: '8px 10px', maxWidth: '85%' }}>
                    <p style={{ color: '#FFFFFF', fontSize: '9px', lineHeight: 1.5 }}>
                      {lang === 'tj' ? 'Салом! Ман KurushLex AI 🤖' : 'Здравствуйте! Я KurushLex AI 🤖'}
                    </p>
                  </div>
                  <div style={{ background: 'rgba(0,200,150,0.15)', borderRadius: '10px 10px 2px 10px', padding: '8px 10px', maxWidth: '80%', alignSelf: 'flex-end' }}>
                    <p style={{ color: '#00C896', fontSize: '9px', lineHeight: 1.5 }}>
                      {lang === 'tj' ? 'Маош намедиҳанд — чӣ кор кунам?' : 'Не платят зарплату — что делать?'}
                    </p>
                  </div>
                  <div style={{ background: '#112240', borderRadius: '10px 10px 10px 2px', padding: '8px 10px', maxWidth: '90%' }}>
                    <p style={{ color: '#FFFFFF', fontSize: '8px', lineHeight: 1.6 }}>
                      {lang === 'tj' ? 'Тибқи м. 130 КМ ҶТ корфармо 0.1% товонпулӣ пардозад...' : 'По ст. 130 ТК РТ работодатель обязан выплатить 0.1%...'}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                  {(lang === 'tj' ? ['ҚРҲ', 'Меҳнат', 'Ҳуқуқ'] : ['ПДД', 'Труд', 'Права']).map(tag => (
                    <span key={tag} style={{ background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: '100px', padding: '2px 8px', fontSize: '8px', color: '#00C896' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ background: '#112240', borderRadius: '14px', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #1E3A5F' }}>
                  <span style={{ color: '#4A6080', fontSize: '8px', flex: 1 }}>
                    {lang === 'tj' ? 'Савол диҳед...' : 'Задать вопрос...'}
                  </span>
                  <div style={{ width: '16px', height: '16px', borderRadius: '6px', background: '#00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>➤</div>
                </div>
              </div>
              <div style={{ width: '48px', height: '4px', background: '#1E3A5F', borderRadius: '2px', margin: '10px auto 0' }} />
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--text)', marginBottom: '16px' }}>
            {t(lang, 'download_page_title')}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            {t(lang, 'download_page_subtitle')}
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {/* Android */}
          <div style={{ background: 'var(--bg-secondary)', border: '2px solid #00C896', borderRadius: '24px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,200,150,0.15)', border: '1px solid rgba(0,200,150,0.3)', borderRadius: '100px', padding: '4px 12px', fontSize: '12px', color: '#00C896', fontWeight: 700 }}>
              {t(lang, 'download_available')}
            </div>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>{t(lang, 'download_android')}</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>{t(lang, 'download_version')}</p>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '28px' }}>{t(lang, 'download_requirements')}</p>
            <a href={APK_URL} download style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#00C896', color: '#0A1628', padding: '16px', borderRadius: '14px', textDecoration: 'none', fontWeight: 800, fontSize: '16px', boxShadow: '0 4px 20px rgba(0,200,150,0.35)', marginBottom: '16px', width: '100%' }}>
              {t(lang, 'download_btn')}
            </a>
            <p style={{ color: 'var(--muted)', fontSize: '12px', textAlign: 'center' }}>{t(lang, 'download_direct_link')}</p>
          </div>

          {/* iOS */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '24px', padding: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(128,128,128,0.08)', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px', lineHeight: 1 }}>🍎</span>
              <div>
                <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '14px' }}>{t(lang, 'download_ios_badge')}</div>
                <div style={{ color: 'var(--muted)', fontSize: '11px' }}>{t(lang, 'download_ios_soon')}</div>
              </div>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>iOS</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>{t(lang, 'download_ios_soon')}</p>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '28px' }}>{t(lang, 'download_ios_year')}</p>
            {submitted ? (
              <div style={{ background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.3)', borderRadius: '14px', padding: '16px', textAlign: 'center', color: '#00C896', fontWeight: 600 }}>
                {t(lang, 'download_ios_notified')}
              </div>
            ) : (
              <form onSubmit={handleNotify}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 16px', color: 'var(--text)', fontSize: '15px', outline: 'none', marginBottom: '12px' }} />
                <button type="submit" style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', color: 'var(--text)', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
                  {t(lang, 'download_ios_notify')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Installation guide */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '32px', textAlign: 'center' }}>
            {t(lang, 'download_guide_title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: 'var(--bg)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,200,150,0.15)', border: '2px solid rgba(0,200,150,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', margin: '0 auto 16px' }}>
                  {s.icon}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>
                  {t(lang, 'download_step_label')} {i + 1}
                </div>
                <h3 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg) 100%)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '32px', textAlign: 'center' }}>
            {t(lang, 'download_features_title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {features.map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(128,128,128,0.05)', borderRadius: '12px', padding: '16px' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div>
                  <p style={{ color: 'var(--text)', fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{item.title}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '12px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Try online */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '16px' }}>{t(lang, 'download_try_online')}</p>
          <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00C896', textDecoration: 'none', fontWeight: 700, fontSize: '16px', border: '1px solid rgba(0,200,150,0.3)', padding: '12px 24px', borderRadius: '12px' }}>
            {t(lang, 'download_try_chat')}
          </Link>
        </div>
      </div>
    </div>
  )
}
