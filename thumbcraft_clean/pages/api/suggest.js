import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { title, style } = req.body
  if (!title) return res.status(400).json({ error: 'Kein Titel angegeben' })

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Du bist ein YouTube-Thumbnail-Texter. Gib mir für folgenden Titel 3 alternative, klickstärkere Versionen als kurze Liste. Stil: ${style}. Titel: "${title}". Antwort nur mit den 3 Alternativen, nummeriert, keine Erklärungen. Max 8 Wörter pro Variante.`,
        },
      ],
    })

    const suggestions = message.content[0].text
    res.status(200).json({ suggestions })
  } catch (error) {
    console.error('Anthropic error:', error)
    res.status(500).json({ error: 'KI-Fehler. Bitte erneut versuchen.' })
  }
}
