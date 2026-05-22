import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Success() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Head>
        <title>Zahlung erfolgreich – ThumbCraft</title>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #c084fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>
            Willkommen bei Pro!
          </div>
          <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Dein ThumbCraft Pro Abo ist aktiv.<br />
            Du wirst in 5 Sekunden weitergeleitet...
          </p>
          <button
            onClick={() => router.push('/')}
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', border: 'none', borderRadius: 12, color: 'white', cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, padding: '.9rem 2rem' }}
          >
            Jetzt Thumbnails erstellen ✦
          </button>
        </div>
      </div>
    </>
  )
}
