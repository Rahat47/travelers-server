
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_API_KEY)


export const stripeGateway = async (req, res) => {
    const tour = req.body
    const CLIENT = `http://localhost:3000/checkout/${tour._id}`

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: tour.name,
                        images: [tour.imageCover],
                    },
                    unit_amount: tour.price * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${CLIENT}?success=true`,
        cancel_url: `${CLIENT}?canceled=true`,
    });


    res.json({ id: session.id });
}

