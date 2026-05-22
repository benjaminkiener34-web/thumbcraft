import { useRef, useState } from 'react'
import Head from 'next/head'

const STYLES = [
  { id: 'gaming', label: 'Gaming', emoji: '🎮', bg: ['#0f0c29', '#302b63', '#24243e'], textColor: '#ffffff', subColor: '#fbbf24' },
  { id: 'vlog',   label: 'Vlog',   emoji: '🎬', bg: ['#c0392b', '#ee5a24', '#ff6b6b'], textColor: '#ffffff', subColor: '#ffeaa7' },
  { id: 'tech',   label: 'Tech',   emoji: '💻', bg: ['#000428', '#004e92', '#00c9ff'], textColor: '#ffffff', subColor: '#00e5ff' },
  { id: 'motivation', label: 'Motivation', emoji: '💪', bg: ['#f7971e', '#ffd200', '#ff8c00'], textColor: '#1a1a2e', subColor: '#1a1a2e' },
  { id: 'food',   label: 'Food',   emoji: '🍕', bg: ['#134e5e', '#71b280', '#52b788'], textColor: '#ffffff', subColor: '#ffd60a' },
  { id: 'minimal',label: 'Minimal',emoji: '⬜', bg: ['#f8f9fa', '#e9ecef', '#dee2e6'], textColor: '#212529', subColor: '#6c757d' },
]

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''
  let lines = []
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      lines.push(line.trim())
      line = words[n] + ' '
    } else {
      line = testLine
    }
  }
  lines.push(line.trim())
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight))
  return lines.length
}

function drawThumbnail(canvas, { title, subtitle, channel, style, accent }) {
  const W = 1280, H = 720
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  const cfg = style

  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, cfg.bg[0])
  grad.addColorStop(0.5, cfg.bg[1])
  grad.addColorStop(1, cfg.bg[2])
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  if (cfg.id === 'gaming') {
    ctx.strokeStyle = accent + '60'
    ctx.lineWidth = 3
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(-50 + i * 40, H); ctx.lineTo(W / 2 + i * 80, 0); ctx.stroke()
    }
    const gc = ctx.createRadialGradient(W * 0.75, H * 0.5, 10, W * 0.75, H * 0.5, 300)
    gc.addColorStop(0, accent + '40'); gc.addColorStop(1, 'transparent')
    ctx.fillStyle = gc; ctx.fillRect(0, 0, W, H)
  } else if (cfg.id === 'tech') {
    ctx.strokeStyle = '#ffffff10'; ctx.lineWidth = 1
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
    for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    ctx.strokeStyle = accent + '80'; ctx.lineWidth = 2
    ctx.beginPath(); ctx.arc(W * 0.78, H * 0.5, 180, 0, Math.PI * 2); ctx.stroke()
  } else if (cfg.id === 'motivation') {
    ctx.save(); ctx.translate(W * 0.72, H * 0.5)
    ctx.strokeStyle = '#ffffff30'; ctx.lineWidth = 2
    for (let a = 0; a < 360; a += 18) {
      ctx.save(); ctx.rotate(a * Math.PI / 180)
      ctx.beginPath(); ctx.moveTo(80, 0); ctx.lineTo(400, 0); ctx.stroke(); ctx.restore()
    }
    ctx.restore()
  } else if (cfg.id === 'vlog') {
    ctx.strokeStyle = '#ffffff20'; ctx.lineWidth = 2
    ;[200, 300, 400].forEach(r => { ctx.beginPath(); ctx.arc(W * 0.8, H * 0.4, r, 0, Math.PI * 2); ctx.stroke() })
  } else if (cfg.id === 'food') {
    ctx.fillStyle = '#ffffff15'
    for (let x = 30; x < W; x += 50) for (let y = 30; y < H; y += 50) { ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill() }
  } else if (cfg.id === 'minimal') {
    ctx.strokeStyle = '#21252930'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, H - 80); ctx.lineTo(W, H - 80); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, 80); ctx.lineTo(W, 80); ctx.stroke()
  }

  const barGrad = ctx.createLinearGradient(0, 0, 0, H)
  barGrad.addColorStop(0, accent + 'ff'); barGrad.addColorStop(1, accent + '44')
  ctx.fillStyle = barGrad; ctx.fillRect(0, 0, 12, H)

  const titleFontSize = title.length > 25 ? 88 : title.length > 15 ? 104 : 120
  ctx.font = `900 ${titleFontSize}px Arial Black, sans-serif`
  ctx.textBaseline = 'middle'
  ctx.shadowColor = '#000000cc'; ctx.shadowBlur = 20; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 4
  ctx.fillStyle = cfg.textColor
  const titleY = subtitle ? H * 0.38 : H * 0.45
  const titleLines = wrapText(ctx, title.toUpperCase(), 80, titleY, W * 0.72, titleFontSize * 1.15)

  if (subtitle) {
    ctx.shadowBlur = 10
    ctx.font = `600 52px Arial, sans-serif`
    ctx.fillStyle = cfg.subColor
    wrapText(ctx, subtitle, 80, titleY + titleLines * titleFontSize * 1.15 + 30, W * 0.72, 64)
  }

  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0

  if (channel) {
    ctx.font = '500 28px Arial, sans-serif'
    const w = ctx.measureText(channel).width + 40
    ctx.fillStyle = '#000000aa'
    ctx.beginPath(); ctx.roundRect(60, H - 80, w, 44, 8); ctx.fill()
    ctx.fillStyle = '#ffffffcc'; ctx.textBaseline = 'middle'; ctx.fillText(channel, 80, H - 58)
  }

  ctx.fillStyle = accent + 'cc'
  ctx.beginPath(); ctx.roundRect(W - 160, 30, 120, 44, 22); ctx.fill()
  ctx.font = 'bold 22px Arial, sans-serif'; ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('NEU', W - 100, 52)
  ctx.textAlign = 'left'
}

export default function Home() {
  const canvasRef = useRef(null)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [channel, setChannel] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0])
  const [accent, setAccent] = useState('#9333ea')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [suggestions, setSuggestions] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Fehler beim Laden der Zahlungsseite.')
    }
    setCheckoutLoading(false)
  }

  const generate = async () => {
    if (!title.trim()) return alert('Bitte einen Titel eingeben!')
    setLoading(true)
    setSuggestions('')

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, style: selectedStyle.id }),
      })
      const data = await res.json()
      if (data.suggestions) setSuggestions(data.suggestions)
    } catch {}

    drawThumbnail(canvasRef.current, { title, subtitle, channel, style: selectedStyle, accent })
    setGenerated(true)
    setLoading(false)
  }

  const download = () => {
    if (!generated) return
    const link = document.createElement('a')
    link.download = 'thumbnail.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <>
      <Head>
        <title>ThumbCraft – KI Thumbnail Generator</title>
        <meta name="description" content="Professionelle YouTube-Thumbnails in Sekunden mit KI" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e8e6f0', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '1rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#1e1030', border: '1px solid #3b1f7a', borderRadius: 20, color: '#a78bfa', fontSize: 11, fontWeight: 500, padding: '4px 12px', marginBottom: '1.25rem', letterSpacing: '.05em' }}>
              ✦ KI-gestützt
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-.03em', background: 'linear-gradient(135deg, #c084fc, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '.25rem' }}>
              ThumbCraft
            </div>
            <div style={{ fontSize: '.85rem', color: '#6b7280', letterSpacing: '.08em', textTransform: 'uppercase' }}>
              Professionelle Thumbnails in Sekunden
            </div>
          </div>

          {/* Pro Banner */}
          <div style={{ background: '#13131a', border: '1px solid #2d1f5e', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '.2rem', color: '#e8e6f0' }}>✦ ThumbCraft Pro</div>
              <div style={{ fontSize: '.82rem', color: '#9ca3af' }}>Unbegrenzte Thumbnails + KI-Vorschläge — 52 DKK/Monat</div>
            </div>
            <button onClick={handleCheckout} disabled={checkoutLoading} style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontSize: '.85rem', fontWeight: 700, padding: '.6rem 1.25rem', opacity: checkoutLoading ? 0.6 : 1 }}>
              {checkoutLoading ? 'Laden...' : 'Pro holen →'}
            </button>
          </div>

          {/* Form */}
          <div style={{ background: '#13131a', border: '1px solid #1f1f2e', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '1rem' }}>📝 Inhalt</div>
            <input
              value={title} onChange={e => setTitle(e.target.value)}
              placeholder="Titel (z.B. 10 Tricks die PROs nicht zeigen)"
              maxLength={60}
              style={{ width: '100%', background: '#0d0d14', border: '1px solid #1f1f2e', borderRadius: 8, color: '#e8e6f0', fontFamily: 'DM Sans, sans-serif', fontSize: '.9rem', padding: '.6rem .9rem', marginBottom: '.75rem', outline: 'none' }}
            />
            <input
              value={subtitle} onChange={e => setSubtitle(e.target.value)}
              placeholder="Untertitel (optional)"
              maxLength={40}
              style={{ width: '100%', background: '#0d0d14', border: '1px solid #1f1f2e', borderRadius: 8, color: '#e8e6f0', fontFamily: 'DM Sans, sans-serif', fontSize: '.9rem', padding: '.6rem .9rem', outline: 'none' }}
            />
          </div>

          {/* Style */}
          <div style={{ background: '#13131a', border: '1px solid #1f1f2e', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '1rem' }}>🎨 Style</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {STYLES.map(s => (
                <button key={s.id} onClick={() => setSelectedStyle(s)} style={{
                  background: selectedStyle.id === s.id ? '#1e1030' : '#0d0d14',
                  border: `1px solid ${selectedStyle.id === s.id ? '#7c3aed' : '#1f1f2e'}`,
                  borderRadius: 10, color: selectedStyle.id === s.id ? '#c084fc' : '#9ca3af',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '.8rem',
                  padding: '.6rem .5rem', textAlign: 'center', transition: 'all .2s'
                }}>
                  <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: 3 }}>{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div style={{ background: '#13131a', border: '1px solid #1f1f2e', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '1rem' }}>⚙️ Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '.78rem', color: '#9ca3af', display: 'block', marginBottom: 6 }}>Hauptfarbe</label>
                <input type="color" value={accent} onChange={e => setAccent(e.target.value)}
                  style={{ width: '100%', height: 42, background: '#0d0d14', border: '1px solid #1f1f2e', borderRadius: 8, padding: 4, cursor: 'pointer' }} />
              </div>
              <div>
                <label style={{ fontSize: '.78rem', color: '#9ca3af', display: 'block', marginBottom: 6 }}>Kanal / Brand</label>
                <input value={channel} onChange={e => setChannel(e.target.value)} placeholder="@deinkanal"
                  style={{ width: '100%', background: '#0d0d14', border: '1px solid #1f1f2e', borderRadius: 8, color: '#e8e6f0', fontFamily: 'DM Sans, sans-serif', fontSize: '.9rem', padding: '.6rem .9rem', outline: 'none' }} />
              </div>
            </div>
          </div>

          {/* Generate button */}
          <button onClick={generate} disabled={loading} style={{
            width: '100%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', border: 'none',
            borderRadius: 12, color: 'white', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700,
            letterSpacing: '.03em', padding: '.9rem', transition: 'all .2s',
            opacity: loading ? 0.6 : 1, marginBottom: '1rem'
          }}>
            {loading ? '⏳ Generiert...' : '✦ Thumbnail generieren'}
          </button>

          {/* Preview */}
          <div style={{ background: '#13131a', border: '1px solid #1f1f2e', borderRadius: 16, padding: '1.5rem' }}>
            <div style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '1rem' }}>🖼️ Vorschau</div>
            <div style={{ background: '#0d0d14', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {!generated && !loading && (
                <div style={{ textAlign: 'center', color: '#3f3f5a' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🖼️</div>
                  <p style={{ fontSize: '.8rem' }}>Dein Thumbnail erscheint hier</p>
                </div>
              )}
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', display: generated ? 'block' : 'none' }} />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: '.75rem' }}>
              <button onClick={download} disabled={!generated} style={{
                flex: 1, background: '#13131a', border: '1px solid #1f1f2e', borderRadius: 8,
                color: generated ? '#e8e6f0' : '#3f3f5a', cursor: generated ? 'pointer' : 'not-allowed',
                fontFamily: 'DM Sans, sans-serif', fontSize: '.82rem', padding: '.55rem', transition: 'all .2s'
              }}>
                ⬇ Download PNG
              </button>
              <button onClick={generate} disabled={!generated || loading} style={{
                flex: 1, background: '#13131a', border: '1px solid #1f1f2e', borderRadius: 8,
                color: generated ? '#e8e6f0' : '#3f3f5a', cursor: generated ? 'pointer' : 'not-allowed',
                fontFamily: 'DM Sans, sans-serif', fontSize: '.82rem', padding: '.55rem', transition: 'all .2s'
              }}>
                ↻ Neu generieren
              </button>
            </div>

            {suggestions && (
              <div style={{ background: '#0d0d14', border: '1px solid #2d1f5e', borderRadius: 10, padding: '1rem', fontSize: '.8rem', color: '#a78bfa', lineHeight: 1.6, marginTop: '.75rem', whiteSpace: 'pre-wrap' }}>
                ✦ KI-Titelvorschläge:{'\n'}{suggestions}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
