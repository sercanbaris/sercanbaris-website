'use client'

import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'auth=; path=/; max-age=0'
    router.push('/')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#e5e5e5',
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ letterSpacing: '4px', fontSize: '14px', color: '#4ade80', marginBottom: '40px' }}>
          HOŞGELDİN ✦
        </h1>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid #333',
            color: '#555',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '10px 24px',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.borderColor = '#ef4444'
            ;(e.target as HTMLButtonElement).style.color = '#ef4444'
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.borderColor = '#333'
            ;(e.target as HTMLButtonElement).style.color = '#555'
          }}
        >
          çıkış
        </button>
      </div>
    </main>
  )
}