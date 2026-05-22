export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const secretKey = process.env.STRIPE_SECRET_KEY
  const priceId = process.env.STRIPE_PRICE_ID
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://thumbcraft-silk.vercel.app'

  if (!secretKey) return res.status(500).json({ error: 'Stripe key fehlt' })

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode: 'subscription',
        'payment_method_types[0]': 'card',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        success_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/`,
      }).toString(),
    })

    const session = await response.json()
    if (session.error) return res.status(400).json({ error: session.error.message })
    res.status(200).json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
