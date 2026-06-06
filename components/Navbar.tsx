'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { useTheme } from '@/lib/ThemeContext'
import { t } from '@/lib/i18n'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()

  const navLinks = [
    { href: '/', label: t(lang, 'nav_home') },
    { href: '/laws', label: t(lang, 'nav_laws') },
    { href: '/chat', label: t(lang, 'nav_chat') },
    { href: '/calculator', label: t(lang, 'nav_calculator') },
  ]

  return (
    <nav style={{
      background: 'rgba(var(--bg-rgb), 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontSize: '24px' }}>⚖️</span>
          <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>
            Kurush<span style={{ color: '#00C896' }}>Lex</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? '#00C896' : 'var(--text)',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: pathname === link.href ? 600 : 400,
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00C896')}
              onMouseLeave={(e) => (e.currentTarget.style.color = pathname === link.href ? '#00C896' : 'var(--text)')}
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            padding: '3px',
            flexShrink: 0,
          }}>
            {(['tj', 'ru'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '100px',
                  border: 'none',
                  background: lang === l ? '#00C896' : 'transparent',
                  color: lang === l ? 'var(--bg)' : 'var(--muted)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.03em',
                }}
                onMouseEnter={(e) => { if (lang !== l) e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={(e) => { if (lang !== l) e.currentTarget.style.color = 'var(--muted)' }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '17px',
              lineHeight: 1,
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00C896')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Download button */}
          <Link
            href="/download"
            style={{
              background: '#00C896',
              color: '#0A1628',
              padding: '8px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background 0.2s, transform 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00b387'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00C896'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {t(lang, 'nav_download_btn')}
          </Link>
        </div>

        {/* Right side mobile: theme + lang switcher + hamburger */}
        <div style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="mobile-right">
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '5px 8px',
              cursor: 'pointer',
              fontSize: '15px',
              lineHeight: 1,
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Mobile lang switcher */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            padding: '3px',
          }}>
            {(['tj', 'ru'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '100px',
                  border: 'none',
                  background: lang === l ? '#00C896' : 'transparent',
                  color: lang === l ? 'var(--bg)' : 'var(--muted)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Меню"
          >
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', borderRadius: '2px', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: pathname === link.href ? '#00C896' : 'var(--text)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: pathname === link.href ? 600 : 400,
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
                display: 'block',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setMenuOpen(false)}
            style={{
              background: '#00C896',
              color: '#0A1628',
              padding: '12px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 700,
              textAlign: 'center',
              marginTop: '12px',
              display: 'block',
            }}
          >
            {t(lang, 'nav_download_btn')}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .mobile-right { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
