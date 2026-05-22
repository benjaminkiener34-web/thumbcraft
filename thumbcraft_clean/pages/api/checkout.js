export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
