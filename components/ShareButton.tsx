'use client'

interface ShareButtonProps {
  title: string
  article: string
}

export default function ShareButton({ title, article }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window === 'undefined') return
    if (navigator.share) {
      navigator.share({ title: `${article} — ${title}`, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Ссылка скопирована в буфер обмена!')
      })
    }
  }

  return (
    <button
      onClick={handleShare}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'transparent', color: '#FFFFFF',
        padding: '14px 24px', borderRadius: '12px',
        border: '1px solid #1E3A5F',
        cursor: 'pointer', fontWeight: 600, fontSize: '15px',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00C896')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1E3A5F')}
    >
      📤 Поделиться
    </button>
  )
}
