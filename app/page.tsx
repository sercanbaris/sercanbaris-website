'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SECRET = 'sifren' // 👈 buraya istediğin kelimeyi yaz

export default function LoginPage() {
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)

    if (val === SECRET) {
      setSuccess(true)
      document.cookie = 'auth=true; path=/; max-age=86400'
      setTimeout(() => router.push('/dashboard'), 600)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value !== SECRET) {
      setShake(true)
      setValue('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: 'white',
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          password
        </p>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: `1px solid ${success ? '#4ade80' : shake ? '#ef4444' : '#333'}`,
            outline: 'none',
            color: success ? '#4ade80' : '#e5e5e5',
            fontSize: '24px',
            textAlign: 'center',
            width: '200px',
            padding: '8px 0',
            letterSpacing: '8px',
            transition: 'border-color 0.2s, color 0.2s',
            animation: shake ? 'shake 0.4s ease' : 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </main>
  )
}