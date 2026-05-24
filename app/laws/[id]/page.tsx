import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLawById, getLawsByCategory, categories } from '@/lib/laws-data'
import ShareButton from '@/components/ShareButton'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LawDetailPage({ params }: Props) {
  const { id } = await params
  const law = getLawById(id)

  if (!law) notFound()

  const cat = categories.find((c) => c.id === law.category)
  const related = getLawsByCategory(law.category)
    .filter((l) => l.id !== law.id)
    .slice(0, 3)

  const chatUrl = `/chat?q=${encodeURIComponent(`Объясни мне ${law.article} — ${law.title}`)}`

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <Link href="/laws" style={{ color: '#4A6080', textDecoration: 'none', fontSize: '14px' }}>
            ← Библиотека законов
          </Link>
          <span style={{ color: '#1E3A5F' }}>/</span>
          <span style={{ color: '#4A6080', fontSize: '14px' }}>{cat?.name}</span>
        </div>

        {/* Law card */}
        <div style={{
          background: '#112240',
          border: '1px solid #1E3A5F',
          borderRadius: '20px',
          padding: '36px',
          marginBottom: '24px',
        }}>
          {/* Category badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `rgba(${hexToRgb(cat?.color || '#00C896')}, 0.15)`,
            border: `1px solid rgba(${hexToRgb(cat?.color || '#00C896')}, 0.3)`,
            borderRadius: '100px', padding: '6px 16px',
            marginBottom: '20px',
          }}>
            <span>{cat?.icon}</span>
            <span style={{ color: cat?.color || '#00C896', fontWeight: 600, fontSize: '14px' }}>
              {cat?.name} • {law.article}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.3 }}>
            {law.title}
          </h1>
          <p style={{ color: '#4A6080', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>
            {law.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            {law.tags.map((tag) => (
              <span key={tag} style={{
                background: '#0A1628',
                border: '1px solid #1E3A5F',
                borderRadius: '100px',
                padding: '4px 12px',
                fontSize: '12px',
                color: '#4A6080',
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#1E3A5F', marginBottom: '28px' }} />

          {/* Full text */}
          <div style={{
            background: '#0A1628',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #1E3A5F',
          }}>
            <h2 style={{ color: '#00C896', fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>
              📄 Полный текст
            </h2>
            <pre style={{
              color: '#FFFFFF',
              fontSize: '15px',
              lineHeight: 1.8,
              fontFamily: 'inherit',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {law.fullText}
            </pre>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <Link href={chatUrl} style={{
            flex: '1', minWidth: '200px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: '#00C896', color: '#0A1628',
            padding: '14px 24px', borderRadius: '12px',
            textDecoration: 'none', fontWeight: 700, fontSize: '15px',
            boxShadow: '0 4px 16px rgba(0,200,150,0.25)',
          }}>
            🤖 Спросить AI об этом законе
          </Link>
          <ShareButton title={law.title} article={law.article} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px' }}>
              Похожие законы
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {related.map((rel) => (
                <Link key={rel.id} href={`/laws/${rel.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#112240',
                    border: '1px solid #1E3A5F',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'border-color 0.2s',
                  }}
                  >
                    <div>
                      <span style={{ color: '#00C896', fontSize: '12px', fontWeight: 600 }}>{rel.article}</span>
                      <p style={{ color: '#FFFFFF', fontWeight: 600, marginTop: '2px' }}>{rel.title}</p>
                    </div>
                    <span style={{ color: '#4A6080', fontSize: '18px' }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export async function generateStaticParams() {
  const { laws } = await import('@/lib/laws-data')
  return laws.map((l) => ({ id: l.id }))
}
