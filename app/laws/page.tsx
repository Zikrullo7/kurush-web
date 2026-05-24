'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { laws, categories, searchLaws, getLawsByCategory } from '@/lib/laws-data'
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

function hexToRgb(hex: string): string {
  return `${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}`
}

function LawsContent() {
  const searchParams = useSearchParams()
  const { lang } = useLang()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const displayedLaws = (() => {
    if (query.trim().length > 1) return searchLaws(query)
    if (activeCategory !== 'all') return getLawsByCategory(activeCategory)
    return laws
  })()

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            {t(lang, 'laws_title')}
          </h1>
          <p style={{ color: '#4A6080', fontSize: '16px' }}>
            {laws.length} {t(lang, 'laws_subtitle_count')}
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
          <input
            type="text"
            placeholder={t(lang, 'laws_search_placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', background: '#112240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '14px 16px 14px 48px', color: '#FFFFFF', fontSize: '16px', outline: 'none' }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#4A6080', fontSize: '18px' }}>
              {t(lang, 'laws_clear')}
            </button>
          )}
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button
            onClick={() => { setActiveCategory('all'); setQuery('') }}
            style={{ padding: '8px 18px', borderRadius: '100px', border: `1px solid ${activeCategory === 'all' ? '#00C896' : '#1E3A5F'}`, background: activeCategory === 'all' ? 'rgba(0,200,150,0.15)' : 'transparent', color: activeCategory === 'all' ? '#00C896' : '#4A6080', cursor: 'pointer', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}
          >
            {t(lang, 'laws_all')} ({laws.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setQuery('') }}
              style={{ padding: '8px 18px', borderRadius: '100px', border: `1px solid ${activeCategory === cat.id ? cat.color : '#1E3A5F'}`, background: activeCategory === cat.id ? `rgba(${hexToRgb(cat.color)}, 0.15)` : 'transparent', color: activeCategory === cat.id ? cat.color : '#4A6080', cursor: 'pointer', fontSize: '14px', fontWeight: activeCategory === cat.id ? 600 : 400, transition: 'all 0.2s' }}
            >
              {cat.icon} {t(lang, CAT_LABEL_KEYS[cat.id as keyof typeof CAT_LABEL_KEYS] ?? 'cat_traffic')}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(query || activeCategory !== 'all') && (
          <p style={{ color: '#4A6080', fontSize: '14px', marginBottom: '20px' }}>
            {t(lang, 'laws_found')}: {displayedLaws.length}
          </p>
        )}

        {/* Categories grid (when no search/filter) */}
        {!query && activeCategory === 'all' && (
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px' }}>
              {t(lang, 'laws_categories_title')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {categories.map((cat) => {
                const count = laws.filter((l) => l.category === cat.id).length
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: '16px', padding: '24px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1E3A5F'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>{cat.icon}</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                      {t(lang, CAT_LABEL_KEYS[cat.id as keyof typeof CAT_LABEL_KEYS] ?? 'cat_traffic')}
                    </div>
                    <div style={{ color: '#4A6080', fontSize: '13px' }}>{count} {t(lang, 'laws_articles')}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Laws grid */}
        <div>
          {!query && activeCategory === 'all' && (
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px' }}>
              {t(lang, 'laws_all_laws')}
            </h2>
          )}
          {displayedLaws.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#4A6080' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p style={{ fontSize: '18px' }}>{t(lang, 'laws_no_results')}</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>{t(lang, 'laws_no_results_sub')}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {displayedLaws.map((law) => {
                const cat = categories.find((c) => c.id === law.category)
                return (
                  <Link key={law.id} href={`/laws/${law.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: '16px', padding: '24px', height: '100%', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = cat?.color || '#00C896'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1E3A5F'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: `rgba(${hexToRgb(cat?.color || '#00C896')}, 0.15)`, border: `1px solid rgba(${hexToRgb(cat?.color || '#00C896')}, 0.3)`, borderRadius: '100px', padding: '4px 12px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px' }}>{cat?.icon}</span>
                        <span style={{ fontSize: '12px', color: cat?.color || '#00C896', fontWeight: 600 }}>{law.article}</span>
                      </div>
                      <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', marginBottom: '8px', lineHeight: 1.4 }}>{law.title}</h3>
                      <p style={{ color: '#4A6080', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>{law.description}</p>
                      <span style={{ color: '#00C896', fontSize: '13px', fontWeight: 600 }}>{t(lang, 'laws_read_more')}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LawsPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0A1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A6080' }}>...</div>}>
      <LawsContent />
    </Suspense>
  )
}
