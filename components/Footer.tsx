'use client'

import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLang()

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '48px 24px 32px', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>⚖️</span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>
                Kurush<span style={{ color: '#00C896' }}>Lex</span>
              </span>
            </Link>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
              {t(lang, 'footer_desc')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>{t(lang, 'footer_nav')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: t(lang, 'footer_link_home') },
                { href: '/laws', label: t(lang, 'footer_link_laws') },
                { href: '/chat', label: t(lang, 'footer_link_chat') },
                { href: '/calculator', label: t(lang, 'footer_link_calc') },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#00C896')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* App */}
          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>{t(lang, 'footer_app')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/download', label: t(lang, 'footer_link_download') },
                { href: '/privacy', label: t(lang, 'footer_link_privacy') },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#00C896')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>{t(lang, 'footer_contact')}</h4>
            <a href="mailto:kurushlex@gmail.com" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00C896')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              📧 kurushlex@gmail.com
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: 'var(--muted)', fontSize: '13px' }}>{t(lang, 'footer_rights')}</p>
          <Link href="/privacy" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#00C896')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {t(lang, 'footer_privacy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
