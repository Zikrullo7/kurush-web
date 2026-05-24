'use client'

import Link from 'next/link'
import { categories } from '@/lib/laws-data'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/i18n'

const CAT_LABEL_KEYS = {
  traffic: 'cat_traffic',
  labor: 'cat_labor',
  detention: 'cat_detention',
  family: 'cat_family',
  housing: 'cat_housing',
  consumer: 'cat_consumer',
  criminal: 'cat_criminal',
  corruption: 'cat_corruption',
} as const

export default function HomePage() {
  const { lang } = useLang()

  const stats = [
    { value: t(lang, 'stat_laws'), label: t(lang, 'stat_laws_label') },
    { value: t(lang, 'stat_categories'), label: t(lang, 'stat_categories_label') },
    { value: t(lang, 'stat_ai'), label: t(lang, 'stat_ai_label') },
    { value: t(lang, 'stat_free'), label: t(lang, 'stat_free_label') },
  ]

  const features = [
    {
      title: t(lang, 'feature_ai_title'),
      desc: t(lang, 'feature_ai_desc'),
      href: '/chat',
      btn: t(lang, 'feature_ai_btn'),
    },
    {
      title: t(lang, 'feature_laws_title'),
      desc: t(lang, 'feature_laws_desc'),
      href: '/laws',
      btn: t(lang, 'feature_laws_btn'),
    },
    {
      title: t(lang, 'feature_calc_title'),
      desc: t(lang, 'feature_calc_desc'),
      href: '/calculator',
      btn: t(lang, 'feature_calc_btn'),
    },
  ]

  const downloadSteps = [
    t(lang, 'download_step1'),
    t(lang, 'download_step2'),
    t(lang, 'download_step3'),
    t(lang, 'download_step4'),
  ]

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #112240 50%, #0A1628 100%)',
        padding: '80px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,200,150,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.3)',
              borderRadius: '100px', padding: '6px 16px', marginBottom: '24px',
            }}>
              <span style={{ fontSize: '12px', color: '#00C896', fontWeight: 600 }}>{t(lang, 'hero_badge')}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', color: '#FFFFFF' }}>
              {t(lang, 'hero_title_1')}<br />
              <span style={{ color: '#00C896' }}>{t(lang, 'hero_title_2')}</span>
            </h1>

            <p style={{ fontSize: '18px', color: '#8BA0B8', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px', whiteSpace: 'pre-line' }}>
              {t(lang, 'hero_subtitle')}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/download" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#00C896', color: '#0A1628',
                padding: '14px 28px', borderRadius: '12px',
                textDecoration: 'none', fontWeight: 700, fontSize: '16px',
                boxShadow: '0 4px 20px rgba(0,200,150,0.3)',
              }}>
                {t(lang, 'hero_btn_download')}
              </Link>
              <Link href="/chat" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: '#FFFFFF',
                padding: '14px 28px', borderRadius: '12px',
                textDecoration: 'none', fontWeight: 600, fontSize: '16px',
                border: '1px solid #1E3A5F',
              }}>
                {t(lang, 'hero_btn_chat')}
              </Link>
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '260px', background: '#112240', borderRadius: '32px', padding: '16px', border: '2px solid #1E3A5F', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ width: '80px', height: '8px', background: '#0A1628', borderRadius: '4px', margin: '0 auto 16px' }} />
              <div style={{ background: '#0A1628', borderRadius: '20px', padding: '16px', minHeight: '380px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '20px' }}>⚖️</span>
                  <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '16px' }}>KurushLex</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: '#112240', borderRadius: '12px 12px 12px 2px', padding: '10px 12px', maxWidth: '85%' }}>
                    <p style={{ color: '#FFFFFF', fontSize: '11px', lineHeight: 1.5 }}>
                      {lang === 'tj' ? 'Салом! Ман KurushLex AI 🤖' : 'Здравствуйте! Я AI юрист KurushLex 🤖'}
                    </p>
                  </div>
                  <div style={{ background: 'rgba(0,200,150,0.15)', borderRadius: '12px 12px 2px 12px', padding: '10px 12px', maxWidth: '85%', alignSelf: 'flex-end' }}>
                    <p style={{ color: '#00C896', fontSize: '11px', lineHeight: 1.5 }}>
                      {lang === 'tj' ? 'Маош намедиҳанд — чӣ кор кунам?' : 'Не платят зарплату. Что делать?'}
                    </p>
                  </div>
                  <div style={{ background: '#112240', borderRadius: '12px 12px 12px 2px', padding: '10px 12px', maxWidth: '90%' }}>
                    <p style={{ color: '#FFFFFF', fontSize: '10px', lineHeight: 1.6 }}>
                      {lang === 'tj'
                        ? 'Тибқи м. 130 КМ ҶТ корфармо вазифадор аст товонпулии 0.1% барои ҳар рӯзи таъхир пардозад...'
                        : 'По ст. 130 ТК РТ работодатель обязан выплатить компенсацию 0.1% за каждый день просрочки...'}
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '16px', background: '#112240', borderRadius: '20px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #1E3A5F' }}>
                  <span style={{ color: '#4A6080', fontSize: '10px', flex: 1 }}>
                    {lang === 'tj' ? 'Савол диҳед...' : 'Задать вопрос...'}
                  </span>
                  <span style={{ fontSize: '14px' }}>➤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#112240', padding: '40px 24px', borderTop: '1px solid #1E3A5F', borderBottom: '1px solid #1E3A5F' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#00C896', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#4A6080', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#0A1628' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              {t(lang, 'features_title')}
            </h2>
            <p style={{ color: '#4A6080', fontSize: '18px' }}>{t(lang, 'features_subtitle')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: '20px', padding: '32px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ color: '#4A6080', lineHeight: 1.7, marginBottom: '24px' }}>{f.desc}</p>
                <Link href={f.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00C896', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
                  {f.btn} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 24px', background: '#112240' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              {t(lang, 'categories_title')}
            </h2>
            <p style={{ color: '#4A6080', fontSize: '16px' }}>{t(lang, 'categories_subtitle')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/laws?category=${cat.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '16px', padding: '24px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{cat.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.3 }}>
                    {t(lang, CAT_LABEL_KEYS[cat.id as keyof typeof CAT_LABEL_KEYS] ?? 'cat_traffic')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section style={{ background: 'linear-gradient(135deg, #112240 0%, #0A1628 100%)', padding: '80px 24px', borderTop: '1px solid #1E3A5F' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📱</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
            {t(lang, 'download_cta_title')}
          </h2>
          <p style={{ color: '#4A6080', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
            {t(lang, 'download_cta_subtitle')}<br />
            <strong style={{ color: '#00C896' }}>{t(lang, 'download_cta_unlimited')}</strong>
          </p>

          <Link href="/download" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: '#00C896', color: '#0A1628',
            padding: '16px 36px', borderRadius: '14px',
            textDecoration: 'none', fontWeight: 800, fontSize: '18px',
            boxShadow: '0 6px 30px rgba(0,200,150,0.35)',
            marginBottom: '48px',
          }}>
            {t(lang, 'download_cta_btn')}
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px', textAlign: 'left' }}>
            {downloadSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#112240', borderRadius: '12px', padding: '16px', border: '1px solid #1E3A5F' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#00C896', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <span style={{ color: '#FFFFFF', fontSize: '14px', lineHeight: 1.5, paddingTop: '3px' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
