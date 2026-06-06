'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import { t } from '@/lib/i18n'

const NISHON = 72

type CalcTab = 'converter' | 'traffic' | 'alimony' | 'salary'

const trafficFines = [
  { id: 'speed_10', article: 'Ст. 233', violation_tj: 'Суръатро 10-20 км/с зиёд кардан', violation_ru: 'Превышение скорости на 10-20 км/ч', min: 1, max: 1 },
  { id: 'speed_20', article: 'Ст. 233', violation_tj: 'Суръатро 20-40 км/с зиёд кардан', violation_ru: 'Превышение скорости на 20-40 км/ч', min: 2, max: 3 },
  { id: 'speed_40', article: 'Ст. 233', violation_tj: 'Суръатро аз 40 км/с зиёд кардан', violation_ru: 'Превышение скорости более 40 км/ч', min: 3, max: 5 },
  { id: 'no_doc', article: 'Ст. 236', violation_tj: 'Ҳуҷҷатҳо нест (иҷозатнома дар хона)', violation_ru: 'Нет документов (права дома)', min: 0.5, max: 0.5 },
  { id: 'no_license', article: 'Ст. 236', violation_tj: 'Иҷозатномаи ронандагӣ нест', violation_ru: 'Нет водительских прав', min: 5, max: 10 },
  { id: 'parking', article: 'Ст. 240', violation_tj: 'Вайронкунии қоидаҳои таваккуф', violation_ru: 'Нарушение правил парковки', min: 1, max: 2 },
  { id: 'red_light', article: 'Ст. 244', violation_tj: 'Аз чароғи сурх гузаштан', violation_ru: 'Проезд на красный свет', min: 2, max: 3 },
  { id: 'seatbelt', article: 'Ст. 248', violation_tj: 'Камарбанди бехатарӣ набастан', violation_ru: 'Непристёгнутый ремень', min: 0.5, max: 0.5 },
  { id: 'tint', article: 'Ст. 250', violation_tj: 'Вайронкунии талаботи тонировка', violation_ru: 'Нарушение тонировки', min: 1, max: 2 },
  { id: 'drunk', article: 'Ст. 242', violation_tj: 'Дар ҳолати мастӣ рондан', violation_ru: 'Езда в нетрезвом виде', min: 20, max: 30 },
]

export default function CalculatorPage() {
  const { lang } = useLang()
  const [tab, setTab] = useState<CalcTab>('converter')
  const [nishonValue, setNishonValue] = useState('')
  const [somoniValue, setSomoniValue] = useState('')
  const [selectedFine, setSelectedFine] = useState(trafficFines[0])
  const [salary, setSalary] = useState('')
  const [childCount, setChildCount] = useState(1)
  const [debtAmount, setDebtAmount] = useState('')
  const [delayDays, setDelayDays] = useState('')

  const tabs: { id: CalcTab; label: string }[] = [
    { id: 'converter', label: t(lang, 'calc_tab_converter') },
    { id: 'traffic', label: t(lang, 'calc_tab_traffic') },
    { id: 'alimony', label: t(lang, 'calc_tab_alimony') },
    { id: 'salary', label: t(lang, 'calc_tab_salary') },
  ]

  const handleNishonChange = (val: string) => {
    setNishonValue(val)
    const n = parseFloat(val)
    if (!isNaN(n)) setSomoniValue((n * NISHON).toFixed(2))
    else setSomoniValue('')
  }

  const handleSomoniChange = (val: string) => {
    setSomoniValue(val)
    const s = parseFloat(val)
    if (!isNaN(s)) setNishonValue((s / NISHON).toFixed(4))
    else setNishonValue('')
  }

  const alimonyPercent = childCount === 1 ? 25 : childCount === 2 ? 33 : 50
  const alimonyAmount = salary ? ((parseFloat(salary) * alimonyPercent) / 100).toFixed(2) : ''
  const salaryCompensation = debtAmount && delayDays
    ? (parseFloat(debtAmount) * 0.001 * parseFloat(delayDays)).toFixed(2)
    : ''

  const nishonLabel = lang === 'tj' ? 'нишондиҳанда' : 'нишондиханда'
  const somoniLabel = lang === 'tj' ? 'сомонӣ' : 'сомони'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--text)', marginBottom: '12px' }}>
            {t(lang, 'calc_title')}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
            1 {nishonLabel} = <span style={{ color: '#00C896', fontWeight: 700 }}>{NISHON} {somoniLabel}</span>
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {tabs.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)} style={{ padding: '10px 20px', borderRadius: '100px', border: `1px solid ${tab === tb.id ? '#00C896' : 'var(--border)'}`, background: tab === tb.id ? 'rgba(0,200,150,0.15)' : 'transparent', color: tab === tb.id ? '#00C896' : 'var(--muted)', cursor: 'pointer', fontSize: '14px', fontWeight: tab === tb.id ? 700 : 400, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {tb.label}
            </button>
          ))}
        </div>

        {/* CONVERTER */}
        {tab === 'converter' && (
          <CalcCard title={t(lang, 'calc_converter_title')} subtitle={t(lang, 'calc_converter_sub')}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
              <div>
                <label style={labelStyle}>{t(lang, 'calc_nishon_label')}</label>
                <input type="number" value={nishonValue} onChange={(e) => handleNishonChange(e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div style={{ textAlign: 'center', paddingTop: '24px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '24px' }}>⇄</span>
              </div>
              <div>
                <label style={labelStyle}>{t(lang, 'calc_somoni_label')}</label>
                <input type="number" value={somoniValue} onChange={(e) => handleSomoniChange(e.target.value)} placeholder="0" style={inputStyle} />
              </div>
            </div>
            {nishonValue && somoniValue && (
              <ResultBox>
                <span style={{ color: 'var(--muted)' }}>{nishonValue} {nishonLabel}</span>
                <span style={{ color: 'var(--text)', margin: '0 12px' }}>=</span>
                <span style={{ color: '#00C896', fontWeight: 800, fontSize: '24px' }}>{somoniValue} {somoniLabel}</span>
              </ResultBox>
            )}
            <div style={{ marginTop: '24px' }}>
              <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '12px' }}>{t(lang, 'calc_quick_label')}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                {[0.5, 1, 2, 3, 5, 10, 20, 50].map((n) => (
                  <button key={n} onClick={() => handleNishonChange(String(n))} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00C896')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div style={{ color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>{n} н.</div>
                    <div style={{ color: 'var(--muted)', fontSize: '11px' }}>{(n * NISHON).toFixed(0)} {somoniLabel}</div>
                  </button>
                ))}
              </div>
            </div>
          </CalcCard>
        )}

        {/* TRAFFIC */}
        {tab === 'traffic' && (
          <CalcCard title={t(lang, 'calc_traffic_title')} subtitle={t(lang, 'calc_traffic_sub')}>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>{t(lang, 'calc_violation_label')}</label>
              <select value={selectedFine.id} onChange={(e) => { const f = trafficFines.find((x) => x.id === e.target.value); if (f) setSelectedFine(f) }} style={{ ...inputStyle, cursor: 'pointer' }}>
                {trafficFines.map((f) => (
                  <option key={f.id} value={f.id} style={{ background: 'var(--bg-secondary)' }}>
                    {f.article} — {lang === 'tj' ? f.violation_tj : f.violation_ru}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ color: '#00C896', fontWeight: 600, fontSize: '14px' }}>{selectedFine.article}</span>
                <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: '17px', marginTop: '4px' }}>
                  {lang === 'tj' ? selectedFine.violation_tj : selectedFine.violation_ru}
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '6px' }}>{t(lang, 'calc_min')}</p>
                  <p style={{ color: 'var(--text)', fontSize: '22px', fontWeight: 800 }}>{selectedFine.min} н.</p>
                  <p style={{ color: '#00C896', fontSize: '14px', fontWeight: 600 }}>{(selectedFine.min * NISHON).toFixed(0)} {somoniLabel}</p>
                </div>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '6px' }}>{t(lang, 'calc_max')}</p>
                  <p style={{ color: 'var(--text)', fontSize: '22px', fontWeight: 800 }}>{selectedFine.max} н.</p>
                  <p style={{ color: '#FF6B6B', fontSize: '14px', fontWeight: 600 }}>{(selectedFine.max * NISHON).toFixed(0)} {somoniLabel}</p>
                </div>
              </div>
            </div>
            <Link href="/laws?category=traffic" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00C896', textDecoration: 'none', fontSize: '14px', marginTop: '16px' }}>
              {t(lang, 'calc_read_full')} {selectedFine.article} →
            </Link>
          </CalcCard>
        )}

        {/* ALIMONY */}
        {tab === 'alimony' && (
          <CalcCard title={t(lang, 'calc_alimony_title')} subtitle={t(lang, 'calc_alimony_sub')}>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>{t(lang, 'calc_salary_label')}</label>
              <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder={lang === 'tj' ? 'Масалан: 2000' : 'Например: 2000'} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>{t(lang, 'calc_children_label')}</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[1, 2, 3].map((n) => (
                  <button key={n} onClick={() => setChildCount(n)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: `1px solid ${childCount === n ? '#00C896' : 'var(--border)'}`, background: childCount === n ? 'rgba(0,200,150,0.15)' : 'transparent', color: childCount === n ? '#00C896' : 'var(--text)', cursor: 'pointer', fontSize: '15px', fontWeight: 700, transition: 'all 0.2s' }}>
                    {n === 3 ? '3+' : n}
                    <div style={{ fontSize: '11px', fontWeight: 400, color: 'var(--muted)', marginTop: '2px' }}>
                      {n === 1 ? '25%' : n === 2 ? '33%' : '50%'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {alimonyAmount && (
              <ResultBox>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '4px' }}>{t(lang, 'calc_monthly_alimony')}</p>
                  <p style={{ color: '#00C896', fontWeight: 800, fontSize: '36px' }}>{alimonyAmount} {somoniLabel}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>{alimonyPercent}% {lang === 'tj' ? 'аз маош' : 'от зарплаты'} {salary} {somoniLabel}</p>
                </div>
              </ResultBox>
            )}
            <InfoBox>
              <p style={{ fontWeight: 700, marginBottom: '8px' }}>{t(lang, 'calc_alimony_info_title')}</p>
              {t(lang, 'calc_alimony_info').split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </InfoBox>
          </CalcCard>
        )}

        {/* SALARY */}
        {tab === 'salary' && (
          <CalcCard title={t(lang, 'calc_salary_title')} subtitle={t(lang, 'calc_salary_sub')}>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>{t(lang, 'calc_debt_label')}</label>
              <input type="number" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} placeholder={lang === 'tj' ? 'Масалан: 3000' : 'Например: 3000'} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>{t(lang, 'calc_days_label')}</label>
              <input type="number" value={delayDays} onChange={(e) => setDelayDays(e.target.value)} placeholder={lang === 'tj' ? 'Масалан: 30' : 'Например: 30'} style={inputStyle} />
            </div>
            {salaryCompensation && (
              <ResultBox>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '4px' }}>{t(lang, 'calc_compensation')}</p>
                  <p style={{ color: '#00C896', fontWeight: 800, fontSize: '36px' }}>{salaryCompensation} {somoniLabel}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>{debtAmount} × 0.1% × {delayDays} {lang === 'tj' ? 'рӯз' : 'дней'}</p>
                  <div style={{ height: '1px', background: 'var(--border)', margin: '16px 0' }} />
                  <p style={{ color: 'var(--text)', fontSize: '16px' }}>
                    {t(lang, 'calc_total')}{' '}
                    <strong style={{ color: '#00C896' }}>
                      {(parseFloat(debtAmount || '0') + parseFloat(salaryCompensation)).toFixed(2)} {somoniLabel}
                    </strong>
                  </p>
                </div>
              </ResultBox>
            )}
            <InfoBox>
              <p style={{ fontWeight: 700, marginBottom: '8px' }}>{t(lang, 'calc_salary_info_title')}</p>
              {t(lang, 'calc_salary_info').split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </InfoBox>
          </CalcCard>
        )}

        {/* CTA */}
        <div style={{ marginTop: '32px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>{t(lang, 'calc_cta')}</p>
          <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00C896', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>
            {t(lang, 'calc_cta_btn')}
          </Link>
        </div>
      </div>
    </div>
  )
}

function CalcCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>{title}</h2>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px' }}>{subtitle}</p>
      {children}
    </div>
  )
}

function ResultBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.3)', borderRadius: '16px', padding: '24px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', marginTop: '16px', fontSize: '13px', color: 'var(--text)', lineHeight: 1.8 }}>
      {children}
    </div>
  )
}

const labelStyle: CSSProperties = {
  display: 'block', color: 'var(--muted)', fontSize: '13px', fontWeight: 600,
  marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em',
}

const inputStyle: CSSProperties = {
  width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
  borderRadius: '12px', padding: '12px 16px', color: 'var(--text)', fontSize: '16px', outline: 'none',
}
